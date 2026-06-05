'use client';

import { useLanguage } from '@/lib/LanguageContext';
import Link from 'next/link';

type HomePageContentProps = {
  categories: any[];
  toolCount: number;
  toolsToShow: any[];
  articles?: any[];
};

export default function HomePageContent({ categories, toolCount, toolsToShow, articles = [] }: HomePageContentProps) {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 text-center dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950">
        <div className="mx-auto max-w-[1200px] px-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white md:text-6xl">
            {isZh ? '发现最佳 AI 工具' : 'Discover the Best AI Tools'}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-500 dark:text-gray-400">
            {isZh
              ? '深度评测、详细对比和实时价格，助你找到最适合的 AI 工具。'
              : 'In-depth reviews, detailed comparisons and real-time pricing to help you find the perfect AI tool.'}
          </p>

          {/* Search Bar */}
          <div className="mx-auto mt-10 max-w-2xl">
            <a
              href="/tools"
              className="flex overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-shadow hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-center px-6">
                <svg
                  className="h-6 w-6 text-gray-400"
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
                placeholder={isZh ? '搜索 AI 工具、评测、教程...' : 'Search AI tools, reviews, guides...'}
                className="flex-1 bg-transparent py-5 text-base text-gray-900 outline-none dark:text-white"
                readOnly
              />
              <div className="rounded-r-2xl bg-indigo-600 px-8 py-5 text-base font-semibold text-white transition-colors hover:bg-indigo-700">
                {isZh ? '搜索' : 'Search'}
              </div>
            </a>
          </div>

          {/* Popular Tags */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-gray-400">{isZh ? '热门：' : 'Popular:'}</span>
            {['ChatGPT', 'Midjourney', 'Claude', 'Cursor', 'Sora'].map((tag) => (
              <a
                key={tag}
                href={`/tools?search=${encodeURIComponent(tag)}`}
                className="cursor-pointer rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-600 hover:border-indigo-600 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-gray-200 bg-white py-10 dark:border-gray-700 dark:bg-gray-800/50">
        <div className="mx-auto flex max-w-[1200px] items-center justify-center gap-12 px-6">
          <a
            href="/tools"
            className="text-center transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {toolCount}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {isZh ? 'AI 工具' : 'AI Tools'}
            </div>
          </a>
          <a
            href="/categories"
            className="text-center transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {categories.length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {isZh ? '分类' : 'Categories'}
            </div>
          </a>
          <a
            href="/articles"
            className="text-center transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <div className="text-3xl font-bold text-indigo-600">{articles.length > 0 ? articles.length : '10+'}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {isZh ? '评测文章' : 'Reviews'}
            </div>
          </a>
          <a
            href="/tools?pricingModel=free"
            className="text-center transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <div className="text-3xl font-bold text-green-600">Free</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {isZh ? '免费可用' : 'Free Tier'}
            </div>
          </a>
        </div>
      </section>

      {/* Featured Articles */}
      {articles.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {isZh ? '最新评测与教程' : 'Latest Reviews & Guides'}
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {isZh
                  ? '深度分析、详细对比，帮助你做出明智选择'
                  : 'In-depth analysis, detailed comparisons to help you make informed decisions'}
              </p>
            </div>
            <Link
              href="/articles"
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              {isZh ? '查看全部 →' : 'View All →'}
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {articles.slice(0, 3).map((article: any) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-indigo-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-600"
              >
                {article.coverImage && (
                  <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <img src={article.coverImage} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                )}
                <div className="p-5">
                  <span className="mb-2 inline-block rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                    {isZh
                      ? ({ review: '评测', comparison: '对比', guide: '教程', news: '资讯' } as any)[article.category] || article.category
                      : ({ review: 'Review', comparison: 'Comparison', guide: 'Guide', news: 'News' } as any)[article.category] || article.category}
                  </span>
                  <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                    {isZh && article.titleZh ? article.titleZh : article.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                    {isZh && article.excerptZh ? article.excerptZh : article.excerpt}
                  </p>
                  <div className="mt-3 text-xs text-gray-400">
                    {new Date(article.publishDate).toLocaleDateString(isZh ? 'zh-CN' : 'en-US')}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Categories Grid */}
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {isZh ? '浏览分类' : 'Browse Categories'}
          </h2>
          <a
            href="/categories"
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            {isZh ? '查看全部 →' : 'View All →'}
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {categories.slice(0, 10).map((cat: any) => (
            <a
              key={cat.id}
              href={`/tools?category=${cat.id}`}
              className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-indigo-300 hover:bg-indigo-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <span className="text-3xl">{cat.icon || '📁'}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {isZh && cat.nameZh ? cat.nameZh : cat.name}
              </span>
              <span className="text-xs text-gray-400">
                {cat._count.tools} {isZh ? '个工具' : 'tools'}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      {toolsToShow.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {isZh ? '热门工具' : 'Featured Tools'}
            </h2>
            <a
              href="/tools"
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              {isZh ? '查看全部 →' : 'View All →'}
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {toolsToShow.map((tool: any) => (
              <div key={tool.id} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <a href={`/tools/${tool.slug}`} className="block">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                      {tool.logoUrl ? (
                        <img src={tool.logoUrl} alt={tool.name} className="h-8 w-8 rounded object-contain" />
                      ) : (
                        <span className="text-xl">🤖</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                        {isZh && tool.nameZh ? tool.nameZh : tool.name}
                      </h3>
                      <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                        {isZh && tool.descriptionZh ? tool.descriptionZh : tool.description}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="border-y border-gray-200 bg-gray-50 py-16 dark:border-gray-700 dark:bg-gray-800/50">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 dark:text-white">
            {isZh ? '为什么选择 AIToolHub？' : 'Why Choose AIToolHub?'}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-3xl dark:bg-indigo-900/30">
                🔍
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                {isZh ? '深度评测' : 'In-Depth Reviews'}
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {isZh
                  ? '每款工具都经过实际测试，提供客观的优缺点分析和适用场景建议。'
                  : 'Every tool is tested in practice, with objective pros/cons analysis and use case recommendations.'}
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-3xl dark:bg-green-900/30">
                💰
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                {isZh ? '价格对比' : 'Price Comparison'}
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {isZh
                  ? '实时追踪价格变化，提供优惠码和历史价格，帮你找到最划算的方案。'
                  : 'Track price changes in real-time, with promo codes and price history to find the best deal.'}
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-3xl dark:bg-purple-900/30">
                ⚖️
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                {isZh ? '工具对比' : 'Tool Comparison'}
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {isZh
                  ? '多维度对比同类工具，功能、价格、用户体验一目了然，轻松做出选择。'
                  : 'Multi-dimensional comparison of similar tools - features, pricing, UX at a glance.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center text-white md:p-12">
            <h2 className="text-2xl font-bold md:text-3xl">
              {isZh ? '有好用的 AI 工具？' : 'Found a great AI tool?'}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-indigo-100">
              {isZh
                ? '分享给我们，帮助更多人发现它！我们的编辑团队会进行深度评测。'
                : 'Share it with us and help others discover it! Our editorial team will do an in-depth review.'}
            </p>
            <a
              href="/submit"
              className="mt-6 inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-50"
            >
              {isZh ? '提交工具' : 'Submit Tool'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
