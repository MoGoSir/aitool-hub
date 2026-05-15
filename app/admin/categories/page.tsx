import { prisma } from "@/lib/prisma";
import AdminLayoutWrapper from "../AdminLayoutWrapper";

export default async function AdminCategoriesPage() {
  const categories = await prisma.categories.findMany({
    include: { _count: { select: { tools: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <AdminLayoutWrapper>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            分类管理
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            管理所有工具分类
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    图标
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    名称
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    工具数
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Slug
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="border-b border-gray-100 dark:border-gray-700"
                  >
                    <td className="py-4 px-4">
                      <span className="text-2xl">{cat.icon || "📁"}</span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900 dark:text-white font-medium">
                      {cat.name}
                      {cat.nameZh && cat.nameZh !== cat.name && (
                        <span className="text-gray-500 dark:text-gray-400 ml-2">
                          {cat.nameZh}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">
                      {cat._count.tools}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500 dark:text-gray-400">
                      {cat.slug}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}