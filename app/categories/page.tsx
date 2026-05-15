import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CategoriesPage() {
  const categories = await prisma.categories.findMany({
    include: {
      _count: { select: { tools: true } },
      tools: { take: 1, select: { logoUrl: true } },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        浏览分类 / Browse Categories
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        按类别发现 AI 工具 / Discover AI tools by category
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/tools?category=${cat.id}`}
            className="group flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-indigo-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-600"
          >
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-3xl dark:bg-indigo-900/30">
              {cat.icon || "📁"}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                {cat.name}
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {cat._count.tools} tools
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400">
                查看全部
                <svg className="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
