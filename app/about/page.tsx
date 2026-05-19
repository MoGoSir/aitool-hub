"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function AboutPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  return (
    <div className="mx-auto max-w-[1000px] px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        {isZh ? "关于我们" : "About Us"}
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        {isZh
          ? "发现最佳 AI 工具，支持价格对比与优惠聚合。"
          : "Discover, compare, and find the best AI tools with transparent pricing."}
      </p>

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {isZh ? "我们的使命" : "Our Mission"}
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            {isZh
              ? "AIToolHub 致力于成为最全面、最值得信赖的 AI 工具发现平台。我们的目标是帮助每一个人找到最适合自己的 AI 工具，无论是个人使用还是企业应用。"
              : "AIToolHub aims to be the most comprehensive and trusted AI tool discovery platform. Our goal is to help everyone find the best AI tools for their needs, whether for personal use or enterprise applications."}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {isZh ? "我们提供" : "What We Offer"}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "",
                title: isZh ? "全面收录" : "Comprehensive Database",
                desc: isZh ? "收录 100+ 优秀 AI 工具，覆盖各种类别" : "100+ curated AI tools across categories",
              },
              {
                icon: "💰",
                title: isZh ? "价格透明" : "Transparent Pricing",
                desc: isZh ? "清晰的定价信息，让你做出明智选择" : "Clear pricing info for informed decisions",
              },
              {
                icon: "🎉",
                title: isZh ? "优惠聚合" : "Promo Aggregation",
                desc: isZh ? "收集最新优惠，帮你省钱" : "Latest deals and discounts to help you save",
              },
              {
                icon: "📊",
                title: isZh ? "价格历史" : "Price History",
                desc: isZh ? "查看价格走势，把握最佳购买时机" : "View price trends and find the best time to buy",
              },
              {
                icon: "🔄",
                title: isZh ? "工具对比" : "Tool Comparison",
                desc: isZh ? "轻松比较不同工具的功能和价格" : "Easily compare features and prices",
              },
              {
                icon: "⭐",
                title: isZh ? "用户评价" : "User Reviews",
                desc: isZh ? "真实用户反馈，帮助你找到最佳工具" : "Real user feedback to find the best tools",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {isZh ? "联系我们" : "Contact Us"}
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            {isZh ? "有任何问题或建议？欢迎联系我们！" : "Have any questions or suggestions? We'd love to hear from you!"}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <a
              href="mailto:hello@aitoolhub.com"
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 text-gray-600 hover:border-indigo-500 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-indigo-400"
            >
              <span className="text-2xl">✉️</span>
              <span>hello@aitoolhub.com</span>
            </a>
            <a
              href="https://twitter.com/aitoolhub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 text-gray-600 hover:border-indigo-500 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-indigo-400"
            >
              <span className="text-2xl">🐦</span>
              <span>@aitoolhub</span>
            </a>
            <a
              href="https://github.com/aitoolhub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 text-gray-600 hover:border-indigo-500 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-indigo-400"
            >
              <span className="text-2xl">💻</span>
              <span>GitHub</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
