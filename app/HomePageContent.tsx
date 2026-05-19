'use client';

import { useLanguage } from '@/lib/LanguageContext';

type HomePageContentProps = {
  categories: any[];
  toolCount: number;
  toolsToShow: any[];
};

export default function HomePageContent({ categories, toolCount, toolsToShow }: HomePageContentProps) {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white py-20 text-center dark:bg-gray-900">
        <div className="mx-auto max-w-[1200px] px-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            {isZh ? '发现最佳 AI 工具' : 'Discover the Best AI Tools'}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
            {isZh
              ? 'AI 工具发现与导航平台，支持价格对比与优惠聚合。'
              : 'AI tool discovery and navigation platform with price comparison and deal aggregation.'}
          </p>

          {/* Search Bar */}
          <div className="mx-auto mt-8 max-w-2xl">
            <a
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
                placeholder={isZh ? '搜索 AI 工具...' : 'Search AI tools...'}
                className="flex-1 bg-transparent py-4 text-sm text-gray-900 outline-none dark:text-white"
                readOnly
              />
              <div className="rounded-r-xl bg-indigo-600 px-6 py-4 text-sm font-semibold text-white hover:bg-indigo-700">
                {isZh ? '搜索' : 'Search'}
              </div>
            </a>
          </div>

          {/* Popular Tags */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-gray-400">{isZh ? '热门：' : 'Popular:'}</span>
            {['ChatGPT', 'Midjourney', 'Claude', 'Cursor', 'Sora'].map((tag) => (
              <a
                key={tag}
                href={`/tools?search=${encodeURIComponent(tag)}`}
                className="cursor-pointer rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-600 hover:border-indigo-600 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-gray-200 bg-gray-50 py-8 dark:border-gray-700 dark:bg-gray-800/50">
        <div className="mx-auto flex max-w-[1200px] items-center justify-center gap-12 px-6">
          <a
            href="/tools"
            className="text-center hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {toolCount}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {isZh ? '工具数量' : 'Tools'}
            </div>
          </a>
          <a
            href="/categories"
            className="text-center hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {categories.length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {isZh ? '分类' : 'Categories'}
            </div>
          </a>
          <a
            href="/tools?pricingModel=free"
            className="text-center hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <div className="text-2xl font-bold text-indigo-600">Free</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {isZh ? '免费工具' : 'Free Tier'}
            </div>
          </a>
        </div>
      </section>

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

      {/* CTA Section */}
      <section className="border-t border-gray-200 bg-gray-50 py-16 dark:border-gray-700 dark:bg-gray-800/50">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isZh ? '有好用的 AI 工具？' : 'Found a great AI tool?'}
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {isZh ? '分享给我们，帮助更多人发现它！' : 'Share it with us and help others discover it!'}
          </p>
          <a
            href="/submit"
            className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            {isZh ? '提交工具' : 'Submit Tool'}
          </a>
        </div>
      </section>
    </div>
  );
}
