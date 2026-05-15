"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminSidebar() {
  const router = useRouter();

  const adminLinks = [
    { href: "/admin", label: "仪表盘", icon: "📊" },
    { href: "/admin/tools", label: "工具管理", icon: "🛠️" },
    { href: "/admin/categories", label: "分类管理", icon: "📁" },
    { href: "/admin/submissions", label: "提交审核", icon: "✅" },
  ];

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 min-h-screen border-r border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <span className="text-2xl">🤖</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            AIToolHub
          </span>
        </Link>

        <nav className="space-y-2">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <span className="text-lg">{link.icon}</span>
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <span className="text-lg">🏠</span>
            <span>返回前台</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white w-full text-left"
          >
            <span className="text-lg">🚪</span>
            <span>退出登录</span>
          </button>
        </div>
      </div>
    </aside>
  );
}