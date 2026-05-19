"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

interface Category {
  id: string;
  name: string;
  nameZh: string | null;
  icon: string | null;
}

interface Tag {
  id: string;
  name: string;
  nameZh: string | null;
}

export default function ToolListClient({
  categories,
  tags,
  currentCategory,
  currentTag,
  currentSearch,
  currentPricingModel,
}: {
  categories: Category[];
  tags: Tag[];
  currentCategory: string;
  currentTag: string;
  currentSearch: string;
  currentPricingModel: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [search, setSearch] = useState(currentSearch);

  const pricingModels = isZh
    ? [
        { value: "", label: "全部定价" },
        { value: "free", label: "免费" },
        { value: "freemium", label: "免费增值" },
        { value: "paid", label: "付费" },
        { value: "enterprise", label: "企业版" },
      ]
    : [
        { value: "", label: "All Pricing" },
        { value: "free", label: "Free" },
        { value: "freemium", label: "Freemium" },
        { value: "paid", label: "Paid" },
        { value: "enterprise", label: "Enterprise" },
      ];

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`/tools?${params.toString()}`);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateParams("search", search);
  }

  return (
    <div className="mt-6 space-y-4">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={isZh ? '搜索工具...' : 'Search tools...'}
          className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {isZh ? '搜索' : 'Search'}
        </button>
      </form>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Category filter */}
        <select
          value={currentCategory}
          onChange={(e) => updateParams("category", e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          <option value="">{isZh ? '全部分类' : 'All Categories'}</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {isZh && cat.nameZh ? cat.nameZh : cat.name}
            </option>
          ))}
        </select>

        {/* Pricing model filter */}
        <select
          value={currentPricingModel}
          onChange={(e) => updateParams("pricingModel", e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          {pricingModels.map((pm) => (
            <option key={pm.value} value={pm.value}>
              {pm.label}
            </option>
          ))}
        </select>

        {/* Tag filter */}
        <select
          value={currentTag}
          onChange={(e) => updateParams("tag", e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          <option value="">{isZh ? '全部标签' : 'All Tags'}</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {isZh && tag.nameZh ? tag.nameZh : tag.name}
            </option>
          ))}
        </select>

        {/* Clear filters */}
        {(currentCategory || currentTag || currentSearch || currentPricingModel) && (
          <button
            onClick={() => router.push("/tools")}
            className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            {isZh ? '清除筛选' : 'Clear'}
          </button>
        )}
      </div>
    </div>
  );
}
