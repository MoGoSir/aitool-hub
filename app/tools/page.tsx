import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ToolCard from "@/components/ToolCard";
import ToolListClient from "./ToolListClient";
import AdSense from "@/components/AdSense";
import ToolsPageContent from "./ToolsPageContent";

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: { category?: string; tag?: string; search?: string; page?: string; pricingModel?: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const limit = 12;
  const skip = (page - 1) * limit;

  const where: any = {};
  if (searchParams.category) where.categoryId = searchParams.category;
  if (searchParams.pricingModel) where.pricingModel = searchParams.pricingModel;
  if (searchParams.tag) {
    where.tag_on_tool = { some: { tagId: searchParams.tag } };
  }
  if (searchParams.search) {
    const searchTerm = searchParams.search;
    where.OR = [
      { name: { contains: searchTerm } },
      { nameZh: { contains: searchTerm } },
      { description: { contains: searchTerm } },
      { descriptionZh: { contains: searchTerm } },
    ];
  }

  const [tools, total, categories, tags] = await Promise.all([
    prisma.tools.findMany({
      where,
      skip,
      take: limit,
      include: {
        categories: true,
        tag_on_tool: { include: { tags: true } },
        pricing_plans: { where: { isPopular: true }, take: 1 },
      },
      orderBy: [{ isFeatured: "desc" }, { viewCount: "desc" }],
    }),
    prisma.tools.count({ where }),
    prisma.categories.findMany({ orderBy: { name: "asc" } }),
    prisma.tags.findMany({
      where: { tag_on_tool: { some: {} } },
      orderBy: { name: "asc" },
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <ToolsPageContent
      tools={tools}
      total={total}
      categories={categories}
      tags={tags}
      searchParams={searchParams}
      page={page}
      totalPages={totalPages}
    />
  );
}
