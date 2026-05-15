import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ToolCard from "@/components/ToolCard";

export default async function HomePage() {
  const [categories, toolCount, featuredTools, recentTools] = await Promise.all([
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
  ]);

  const toolsToShow =
    featuredTools.length >= 4 ? featuredTools : [...featuredTools, ...recentTools].slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white py-20 text-center dark:bg-gray-900">
        <div className="mx-auto max-w-[1200px] px-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            发现最佳 AI 工具
            <br />
            <span className="text-indigo-600">Discover the Best AI Tools</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
            AI 工具发现与导航平台，支持价格对比与优惠聚合。
            <br />
            Discover, compare, and find the best AI tools with transparent pricing.
          </p>

          {/* Search Bar */}
          <div className="mx-auto mt-8 max-w-2xl">
            <Link
              href="/tools"
              className="flex overflow-hidden rounded-xl border border-gray-200 bg-gray-50 hover:border-indigo-400 dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-center px-4">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="搜索 AI 工具... / Search AI tools..."
                className="flex-1 bg-transparent py-4 text-sm text-gray-900 outline-none dark:text-white"
                readOnly
              />
              <div className="rounded-r-xl bg-indigo-600 px-6 py-4 text-sm font-semibold text-white hover:bg-indigo-700">
                搜索 / Search
              </div>
            </Link>
          </div>

          {/* Popular Tags */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-gray-400">热门：</span>
            {["ChatGPT", "Midjourney", "Claude", "Cursor", "Sora"].map((tag) => (
              <Link
                key={tag}
                href={`/tools?search=${encodeURIComponent(tag)}`}
                className="cursor-pointer rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-600 hover:border-indigo-600 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-gray-200 bg-gray-50 py-8 dark:border-gray-700 dark:bg-gray-800/50">
        <div className="mx-auto flex max-w-[1200px] items-center justify-center gap-12 px-6">
          <Link
            href="/tools"
            className="text-center hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {toolCount}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              工具数量 / Tools
            </div>
          </Link>
          <Link
            href="/categories"
            className="text-center hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {categories.length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              分类 / Categories
            </div>
          </Link>
          <Link
            href="/tools?pricingModel=free"
            className="text-center hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <div className="text-2xl font-bold text-indigo-600">Free</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              免费 / Free Tier
            </div>
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            浏览分类 / Browse Categories
          </h2>
          <Link
            href="/categories"
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            查看全部 / View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {categories.slice(0, 10).map((cat) => (
            <Link
              key={cat.id}
              href={`/tools?category=${cat.id}`}
              className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-indigo-300 hover:bg-indigo-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <span className="text-3xl">{cat.icon || "📁"}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {cat.name}
              </span>
              <span className="text-xs text-gray-400">
                {cat._count.tools} tools
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      {toolsToShow.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              热门工具 / Featured Tools
            </h2>
            <Link
              href="/tools"
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              查看全部 / View All →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {toolsToShow.map((tool) => (
              <ToolCard key={tool.id} tool={tool as any} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="border-t border-gray-200 bg-gray-50 py-16 dark:border-gray-700 dark:bg-gray-800/50">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            有好用的 AI 工具？ / Found a great AI tool?
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            分享给我们，帮助更多人发现它！
            <br />
            Share it with us and help others discover it!
          </p>
          <Link
            href="/submit"
            className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            提交工具 / Submit Tool
          </Link>
        </div>
      </section>
    </div>
  );
}