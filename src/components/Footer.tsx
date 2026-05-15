import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-12 dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                AIToolHub
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              发现最适合的 AI 工具，支持价格对比与优惠聚合。
              <br />
              Discover, compare, and find the best AI tools.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              分类 / Categories
            </h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/categories" className="hover:text-indigo-600">写作与内容</Link></li>
              <li><Link href="/categories" className="hover:text-indigo-600">图像生成</Link></li>
              <li><Link href="/categories" className="hover:text-indigo-600">编程开发</Link></li>
              <li><Link href="/categories" className="hover:text-indigo-600">效率工具</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              资源 / Resources
            </h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-indigo-600">博客 / Blog</a></li>
              <li><a href="#" className="hover:text-indigo-600">API 文档</a></li>
              <li><Link href="/submit" className="hover:text-indigo-600">提交工具</Link></li>
              <li><a href="#" className="hover:text-indigo-600">广告合作</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              关于 / Company
            </h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="/about.html" className="hover:text-indigo-600">关于我们</a></li>
              <li><a href="#" className="hover:text-indigo-600">隐私政策</a></li>
              <li><a href="#" className="hover:text-indigo-600">服务条款</a></li>
              <li><a href="#" className="hover:text-indigo-600">联系我们</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-400 dark:border-gray-700">
          © 2026 AIToolHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
