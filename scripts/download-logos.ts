import fetch from 'node-fetch';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const LOGO_DIR = path.join(__dirname, '../public/logos');

interface LogoSource {
  name: string;
  url: (domain: string) => string;
  priority: number;
}

const LOGO_SOURCES: LogoSource[] = [
  {
    name: 'Google Favicon',
    url: (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    priority: 1,
  },
  {
    name: 'Clearbit',
    url: (domain) => `https://logo.clearbit.com/${domain}`,
    priority: 2,
  },
  {
    name: 'Icon Horse',
    url: (domain) => `https://icon.horse/icon/${domain}`,
    priority: 3,
  },
  {
    name: 'Logo API',
    url: (domain) => `https://logoapi.org/logo?url=${domain}`,
    priority: 4,
  },
];

function extractDomain(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace('www.', '');
  } catch {
    return url;
  }
}

async function downloadLogo(url: string, filePath: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return false;
    }

    const buffer = await response.buffer();
    
    if (buffer.length < 100) {
      return false;
    }

    await fs.promises.writeFile(filePath, buffer);
    return true;
  } catch {
    return false;
  }
}

async function getLogoForTool(toolName: string, websiteUrl: string): Promise<string | null> {
  if (!websiteUrl) {
    return null;
  }

  const domain = extractDomain(websiteUrl);
  const filename = `${toolName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}.png`;
  const filePath = path.join(LOGO_DIR, filename);

  if (fs.existsSync(filePath)) {
    console.log(`   ✅ Logo already exists: ${filename}`);
    return `/logos/${filename}`;
  }

  console.log(`   🔍 Trying to download logo for ${toolName} (${domain})...`);

  for (const source of LOGO_SOURCES) {
    try {
      const logoUrl = source.url(domain);
      console.log(`      Trying ${source.name}: ${logoUrl}`);
      
      if (await downloadLogo(logoUrl, filePath)) {
        console.log(`      ✅ Successfully downloaded from ${source.name}`);
        return `/logos/${filename}`;
      }
    } catch (error) {
      console.log(`      ❌ ${source.name} failed`);
    }
  }

  console.log(`   ⚠️  Failed to download logo for ${toolName}`);
  return null;
}

async function main() {
  console.log('🚀 Starting logo download script...\n');

  if (!fs.existsSync(LOGO_DIR)) {
    fs.mkdirSync(LOGO_DIR, { recursive: true });
    console.log(`📁 Created logo directory: ${LOGO_DIR}\n`);
  }

  const tools = await prisma.tools.findMany({
    where: {
      OR: [
        { logoUrl: null },
        { logoUrl: '' },
        { logoUrl: { contains: 'clearbit' } },
      ],
    },
    select: {
      id: true,
      name: true,
      websiteUrl: true,
      logoUrl: true,
    },
  });

  console.log(`📊 Found ${tools.length} tools to process\n`);

  let successCount = 0;
  let failCount = 0;

  for (const tool of tools) {
    console.log(`🔄 Processing: ${tool.name}`);
    
    const newLogoUrl = await getLogoForTool(tool.name, tool.websiteUrl);
    
    if (newLogoUrl) {
      await prisma.tools.update({
        where: { id: tool.id },
        data: { logoUrl: newLogoUrl },
      });
      successCount++;
      console.log(`   ✅ Updated logo: ${newLogoUrl}\n`);
    } else {
      failCount++;
      console.log(`   ❌ No logo found\n`);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n📈 Results:`);
  console.log(`   ✅ Successfully downloaded: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);

  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error('❌ Script error:', error.message);
  await prisma.$disconnect();
  process.exit(1);
});