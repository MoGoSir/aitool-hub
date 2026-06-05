import { prisma } from "@/lib/prisma";
import HomePageContent from "./HomePageContent";

export default async function HomePage() {
  const [categories, toolCount, featuredTools, recentTools, articles] = await Promise.all([
    prisma.categories.findMany({
      include: { _count: { select: { tools: true } } },
      orderBy: { name: "asc" },
    }),
    prisma.tools.count(),
    prisma.tools.findMany({
      where: { isFeatured: true },
      take: 8,
      include: {
        categories: true,
        tag_on_tool: { include: { tags: true } },
        pricing_plans: { where: { isPopular: true }, take: 1 },
      },
      orderBy: { viewCount: "desc" },
    }),
    prisma.tools.findMany({
      take: 4,
      include: {
        categories: true,
        tag_on_tool: { include: { tags: true } },
        pricing_plans: { where: { isPopular: true }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.articles.findMany({
      where: { status: "published" },
      orderBy: { publishDate: "desc" },
      take: 6,
    }),
  ]);

  const toolsToShow =
    featuredTools.length >= 4 ? featuredTools : [...featuredTools, ...recentTools].slice(0, 8);

  return <HomePageContent categories={categories} toolCount={toolCount} toolsToShow={toolsToShow} articles={articles} />;
}
