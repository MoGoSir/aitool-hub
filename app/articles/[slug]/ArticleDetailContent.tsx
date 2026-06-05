"use client";

import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";
import AdSense from "@/components/AdSense";

type ArticleDetailContentProps = {
  article: any;
  relatedArticles: any[];
};

export default function ArticleDetailContent({ article, relatedArticles }: ArticleDetailContentProps) {
  const { language } = useLanguage();
  const isZh = language === "zh";

  const title = isZh && article.titleZh ? article.titleZh : article.title;
  const content = isZh && article.contentZh ? article.contentZh : article.content;
  const excerpt = isZh && article.excerptZh ? article.excerptZh : article.excerpt;

  const categoryLabels: Record<string, string> = isZh
    ? { review: "评测", comparison: "对比", guide: "教程", news: "资讯" }
    : { review: "Review", comparison: "Comparison", guide: "Guide", news: "News" };

  return (
    <article className="mx-auto max-w-[800px] px-6 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">
          {isZh ? "首页" : "Home"}
        </Link>
        <span>/</span>
        <Link href="/articles" className="hover:text-gray-600 dark:hover:text-gray-300">
          {isZh ? "文章" : "Articles"}
        </Link>
        <span>/</span>
        <span className="text-gray-600 dark:text-gray-300">{title}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
            {categoryLabels[article.category] || article.category}
          </span>
          <span className="text-sm text-gray-400">
            {new Date(article.publishDate).toLocaleDateString(isZh ? "zh-CN" : "en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="text-sm text-gray-400">
            {isZh ? "阅读" : "Views"}: {article.viewCount.toLocaleString()}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">{title}</h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">{excerpt}</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
            {article.author.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">{article.author}</div>
            <div className="text-xs text-gray-400">
              {isZh ? "AIToolHub 编辑团队" : "AIToolHub Editorial Team"}
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {article.coverImage && (
        <div className="mb-8 overflow-hidden rounded-xl">
          <img src={article.coverImage} alt={title} className="w-full object-cover" />
        </div>
      )}

      {/* Ad Before Content */}
      <div className="mb-8 flex justify-center">
        <AdSense adSlot="ARTICLE_AD_SLOT_1" adFormat="horizontal" className="max-w-full" />
      </div>

      {/* Content */}
      <div
        className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-indigo-600 dark:prose-a:text-indigo-400"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Ad After Content */}
      <div className="my-8 flex justify-center">
        <AdSense adSlot="ARTICLE_AD_SLOT_2" adFormat="horizontal" className="max-w-full" />
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            {isZh ? "相关文章" : "Related Articles"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((a: any) => (
              <Link
                key={a.id}
                href={`/articles/${a.slug}`}
                className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-indigo-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-600"
              >
                <h3 className="line-clamp-2 font-semibold text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400">
                  {isZh && a.titleZh ? a.titleZh : a.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                  {isZh && a.excerptZh ? a.excerptZh : a.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
