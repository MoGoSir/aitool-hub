import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ScraperSource {
  name: string;
  url: string;
  category?: string;
}

const SOURCES: ScraperSource[] = [
  { name: 'theresanaiforthat', url: 'https://theresanaiforthat.com', category: 'general' },
  { name: 'aitoolsfortasks', url: 'https://aitools.fyi', category: 'general' },
];

interface AITool {
  name: string;
  description: string;
  websiteUrl: string;
  logoUrl?: string;
  category?: string;
  pricing?: string;
  tags?: string[];
  developer?: string;
  rating?: number;
  reviewCount?: number;
}

async function fetchWithRetry(url: string, retries = 3): Promise<string | null> {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        return await response.text();
      }
    } catch (error) {
      console.log(`Retry ${i + 1}/${retries} for ${url}`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  return null;
}

function parseToolDescription(html: string, source: string): AITool[] {
  const tools: AITool[] = [];
  const $ = cheerio.load(html);

  if (source === 'theresanaiforthat') {
    $('a[href*="/tool/"]').each((_, el) => {
      const $el = $(el);
      const name = $el.find('h3, h2, .tool-name').text().trim();
      const description = $el.find('p, .description, .tagline').text().trim();
      const href = $el.attr('href');

      if (name && description && href) {
        tools.push({
          name,
          description,
          websiteUrl: href.startsWith('http') ? href : `https://theresanaiforthat.com${href}`,
        });
      }
    });
  }

  return tools.slice(0, 20);
}

export async function scrapeAITools(): Promise<AITool[]> {
  const allTools: AITool[] = [];

  console.log('🔍 Starting AI tool scraping...\n');

  for (const source of SOURCES) {
    console.log(`📡 Scraping from ${source.name}...`);
    const html = await fetchWithRetry(source.url);

    if (html) {
      const tools = parseToolDescription(html, source.name);
      console.log(`   Found ${tools.length} tools`);
      allTools.push(...tools);
    } else {
      console.log(`   ❌ Failed to fetch`);
    }
  }

  console.log(`\n📊 Total tools scraped: ${allTools.length}`);
  return allTools;
}

export async function saveToolsToDatabase(tools: AITool[]): Promise<number> {
  let saved = 0;

  const category = await prisma.categories.upsert({
    where: { slug: 'general' },
    update: {},
    create: {
      id: 'general',
      name: 'General',
      nameZh: '通用',
      slug: 'general',
      icon: '🔧',
    },
  });

  for (const tool of tools) {
    try {
      const slug = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      await prisma.tools.upsert({
        where: { slug },
        update: {
          description: tool.description,
          descriptionZh: tool.description,
          websiteUrl: tool.websiteUrl,
          logoUrl: tool.logoUrl,
          developer: tool.developer,
          sourceType: 'scraped',
          updatedAt: new Date(),
        },
        create: {
          id: slug,
          name: tool.name,
          slug,
          description: tool.description,
          descriptionZh: tool.description,
          websiteUrl: tool.websiteUrl,
          logoUrl: tool.logoUrl,
          developer: tool.developer || 'Unknown',
          categoryId: category.id,
          pricingModel: tool.pricing || 'freemium',
          minPrice: 0,
          rating: tool.rating || 0,
          reviewCount: tool.reviewCount || 0,
          viewCount: 0,
          sourceType: 'scraped',
          isVerified: false,
          isFeatured: false,
          updatedAt: new Date(),
        },
      });
      saved++;
    } catch (error) {
      console.log(`   ⚠️  Failed to save: ${tool.name}`);
    }
  }

  return saved;
}

scrapeAITools()
  .then(async (tools) => {
    if (tools.length > 0) {
      const saved = await saveToolsToDatabase(tools);
      console.log(`\n✅ Successfully saved ${saved} tools to database`);
    } else {
      console.log('\n⚠️  No tools scraped, using fallback data');
    }
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('❌ Scraper error:', error.message);
    await prisma.$disconnect();
    process.exit(1);
  });