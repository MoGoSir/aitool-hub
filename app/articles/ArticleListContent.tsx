"use client";

import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";
import { useState } from "react";

type ArticleListContentProps = {
  articles: any[];
  categories: any[];
};

export default function ArticleListContent({ articles, categories }: ArticleListContentProps) {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredArticles =
    activeCategory === "all"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const getCategoryLabel = (cat: string) => {
    const c = categories.find((c) => c.id === cat);
    if (!c) return cat;
    return isZh ? c.name : c.nameEn;
  };

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      review: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      comparison: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      guide: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      news: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    };
    return colors[cat] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {isZh ? "AI 工具评测与教程" : "AI Tool Reviews & Guides"}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
          {isZh
            ? "深度评测、详细对比和实用教程，帮助你选择最适合的 AI 工具。"
            : "In-depth reviews, detailed comparisons and practical guides to help you choose the right AI tools."}
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setActiveCategory("all")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeCategory === "all"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          {isZh ? "全部" : "All"}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {getCategoryLabel(cat.id)} ({cat.count})
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-indigo-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-600"
            >
              {article.coverImage && (
                <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={article.coverImage}
                    alt={isZh && article.titleZh ? article.titleZh : article.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getCategoryColor(article.category)}`}>
                    {getCategoryLabel(article.category)}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(article.publishDate).toLocaleDateString(isZh ? "zh-CN" : "en-US")}
                  </span>
                </div>
                <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                  {isZh && article.titleZh ? article.titleZh : article.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                  {isZh && article.excerptZh ? article.excerptZh : article.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{article.author}</span>
                  <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700 dark:text-indigo-400">
                    {isZh ? "阅读全文 →" : "Read More →"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="text-6xl">📝</div>
          <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
            {isZh ? "文章即将上线" : "Articles Coming Soon"}
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {isZh
              ? "我们正在撰写深度评测和教程，敬请期待！"
              : "We're writing in-depth reviews and guides, stay tuned!"}
          </p>
        </div>
      )}
    </div>
  );
}
