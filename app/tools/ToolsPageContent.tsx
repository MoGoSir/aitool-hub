'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import ToolCard from '@/components/ToolCard';
import ToolListClient from './ToolListClient';
import AdSense from '@/components/AdSense';

type ToolsPageContentProps = {
  tools: any[];
  total: number;
  categories: any[];
  tags: any[];
  searchParams: any;
  page: number;
  totalPages: number;
};

export default function ToolsPageContent({
  tools,
  total,
  categories,
  tags,
  searchParams,
  page,
  totalPages,
}: ToolsPageContentProps) {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {isZh ? 'AI 工具库' : 'AI Tools'}
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {isZh ? `共 ${total} 个工具` : `${total} tools found`}
        </p>
      </div>

      {/* Top Ad */}
      <div className="mb-8 flex justify-center">
        <AdSense adSlot="1234567890" adFormat="horizontal" className="max-w-full" />
      </div>

      <ToolListClient
        categories={categories}
        tags={tags}
        currentCategory={searchParams.category || ''}
        currentTag={searchParams.tag || ''}
        currentSearch={searchParams.search || ''}
        currentPricingModel={searchParams.pricingModel || ''}
      />

      {/* Tool Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool as any} />
        ))}
      </div>

      {tools.length === 0 && (
        <div className="mt-16 rounded-xl border border-gray-200 bg-white p-12 text-center text-gray-400 dark:border-gray-700 dark:bg-gray-800">
          <p className="text-lg">{isZh ? '没有找到匹配的工具' : 'No tools found'}</p>
          <p className="mt-2 text-sm">{isZh ? '没有找到匹配的工具' : 'No tools found matching your criteria'}</p>
          <Link
            href="/tools"
            className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            {isZh ? '清除筛选' : 'Clear Filters'}
          </Link>
        </div>
      )}

      {/* Middle Ad */}
      {tools.length > 6 && (
        <div className="my-8 flex justify-center">
          <AdSense adSlot="0987654321" adFormat="auto" className="max-w-full" />
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={{
                pathname: '/tools',
                query: { ...searchParams, page: String(page - 1) },
              }}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {isZh ? '← 上一页' : '← Previous'}
            </Link>
          )}
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {page} / {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={{
                pathname: '/tools',
                query: { ...searchParams, page: String(page + 1) },
              }}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {isZh ? '下一页 →' : 'Next →'}
            </Link>
          )}
        </div>
      )}

      {/* Bottom Ad */}
      <div className="mt-8 flex justify-center">
        <AdSense adSlot="1122334455" adFormat="auto" className="max-w-full" />
      </div>
    </div>
  );
}
