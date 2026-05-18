import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ToolCard from "@/components/ToolCard";
import ToolListClient from "./ToolListClient";
import AdSense from "@/components/AdSense";

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
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          AI 工具库 / AI Tools
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          共 {total} 个工具 / {total} tools found
        </p>
      </div>

      {/* Top Ad */}
      <div className="mb-8 flex justify-center">
        <AdSense adSlot="1234567890" adFormat="horizontal" className="max-w-full" />
      </div>

      <ToolListClient
        categories={categories}
        tags={tags}
        currentCategory={searchParams.category || ""}
        currentTag={searchParams.tag || ""}
        currentSearch={searchParams.search || ""}
        currentPricingModel={searchParams.pricingModel || ""}
      />

      {/* Tool Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool as any} />
        ))}
      </div>

      {tools.length === 0 && (
        <div className="mt-16 rounded-xl border border-gray-200 bg-white p-12 text-center text-gray-400 dark:border-gray-700 dark:bg-gray-800">
          <p className="text-lg">没有找到匹配的工具</p>
          <p className="mt-2 text-sm">No tools found matching your criteria</p>
          <Link
            href="/tools"
            className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            清除筛选 / Clear Filters
          </Link>
        </div>
      )}

      {/* Middle Ad */}
      {tools.length > 6 && (
        <div className="my-8 flex justify-center">
          <AdSense adSlot="0987654321" adFormat="auto" className="max-w-full" />
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={{
                pathname: "/tools",
                query: { ...searchParams, page: String(page - 1) },
              }}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              ← 上一页
            </Link>
          )}
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {page} / {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={{
                pathname: "/tools",
                query: { ...searchParams, page: String(page + 1) },
              }}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              下一页 →
            </Link>
          )}
        </div>
      )}

      {/* Bottom Ad */}
      <div className="mt-8 flex justify-center">
        <AdSense adSlot="1122334455" adFormat="auto" className="max-w-full" />
      </div>
    </div>
  );
}
