"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();
  const isZh = language === "zh";

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
              {isZh
                ? "发现最适合的 AI 工具，支持价格对比与优惠聚合。"
                : "Discover, compare, and find the best AI tools."}
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              {isZh ? "分类" : "Categories"}
            </h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/categories" className="hover:text-indigo-600">{isZh ? "写作与内容" : "Writing & Content"}</Link></li>
              <li><Link href="/categories" className="hover:text-indigo-600">{isZh ? "图像生成" : "Image Generation"}</Link></li>
              <li><Link href="/categories" className="hover:text-indigo-600">{isZh ? "编程开发" : "Development"}</Link></li>
              <li><Link href="/categories" className="hover:text-indigo-600">{isZh ? "效率工具" : "Productivity"}</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              {isZh ? "资源" : "Resources"}
            </h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/articles" className="hover:text-indigo-600">{isZh ? "评测文章" : "Reviews"}</Link></li>
              <li><a href="#" className="hover:text-indigo-600">{isZh ? "API 文档" : "API Docs"}</a></li>
              <li><Link href="/submit" className="hover:text-indigo-600">{isZh ? "提交工具" : "Submit Tool"}</Link></li>
              <li><a href="#" className="hover:text-indigo-600">{isZh ? "广告合作" : "Advertise"}</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              {isZh ? "关于" : "Company"}
            </h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/about" className="hover:text-indigo-600">{isZh ? "关于我们" : "About Us"}</Link></li>
              <li><Link href="/privacy" className="hover:text-indigo-600">{isZh ? "隐私政策" : "Privacy Policy"}</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-600">{isZh ? "服务条款" : "Terms of Service"}</Link></li>
              <li><Link href="/about" className="hover:text-indigo-600">{isZh ? "联系我们" : "Contact Us"}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-400 dark:border-gray-700">
          © 2026 AIToolHub. {isZh ? "版权所有" : "All rights reserved"}.
        </div>
      </div>
    </footer>
  );
}
