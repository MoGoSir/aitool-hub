import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AdminLayoutWrapper from "./AdminLayoutWrapper";

export default async function AdminDashboard() {
  const [totalTools, totalCategories, pendingSubmissions, featuredTools] =
    await Promise.all([
      prisma.tools.count(),
      prisma.categories.count(),
      prisma.tool_submissions.count({
        where: { status: "pending" },
      }),
      prisma.tools.count({
        where: { isFeatured: true },
      }),
    ]);

  const recentTools = await prisma.tools.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { categories: true },
  });

  const stats = [
    {
      label: "总工具数",
      value: totalTools,
      icon: "🛠️",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      label: "分类数",
      value: totalCategories,
      icon: "📁",
      color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      label: "待审核",
      value: pendingSubmissions,
      icon: "⏳",
      color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
    },
    {
      label: "精选工具",
      value: featuredTools,
      icon: "⭐",
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    },
  ];

  return (
    <AdminLayoutWrapper>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            管理后台
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            欢迎回来！
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Tools */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              最近添加
            </h2>
            <Link
              href="/admin/tools"
              className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
            >
              查看全部 →
            </Link>
          </div>
          <div className="p-6">
            {recentTools.length > 0 ? (
              <div className="space-y-4">
                {recentTools.map((tool: any) => (
                  <div
                    key={tool.id}
                    className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-xl">
                        {tool.logoUrl ? (
                          <img
                            src={tool.logoUrl}
                            alt={tool.name}
                            className="h-6 w-6 object-contain"
                          />
                        ) : (
                          "🤖"
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {tool.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {tool.categories.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(tool.createdAt).toLocaleDateString()}
                      </p>
                      {tool.isFeatured && (
                        <span className="text-xs text-yellow-600 dark:text-yellow-400">
                          ⭐ 精选
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                暂无工具
              </p>
            )}
          </div>
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}