"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import ToolCard from "@/components/ToolCard";
import AdSense from "@/components/AdSense";

type ToolDetailPageContentProps = {
  tool: any;
  relatedTools: any[];
};

export default function ToolDetailPageContent({ tool, relatedTools }: ToolDetailPageContentProps) {
  const { language } = useLanguage();
  const isZh = language === "zh";

  const pricingModelLabel: Record<string, string> = isZh
    ? { free: "免费", freemium: "免费增值", paid: "付费", enterprise: "企业版" }
    : { free: "Free", freemium: "Freemium", paid: "Paid", enterprise: "Enterprise" };

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">
          {isZh ? "首页" : "Home"}
        </Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-gray-600 dark:hover:text-gray-300">
          {isZh ? "工具库" : "Tools"}
        </Link>
        <span>/</span>
        <span className="text-gray-600 dark:text-gray-300">
          {isZh && tool.nameZh ? tool.nameZh : tool.name}
        </span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        {/* Logo */}
        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-5xl dark:border-gray-700 dark:bg-gray-800">
          {tool.logoUrl ? (
            <img src={tool.logoUrl} alt={tool.name} className="h-16 w-16 rounded object-contain" />
          ) : (
            "🤖"
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-start gap-3">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isZh && tool.nameZh ? tool.nameZh : tool.name}
            </h1>
            {tool.isVerified && (
              <span className="mt-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                {isZh ? "已认证" : "Verified"}
              </span>
            )}
            {tool.isFeatured && (
              <span className="mt-1 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                {isZh ? "推荐" : "Featured"}
              </span>
            )}
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {isZh && tool.descriptionZh ? tool.descriptionZh : tool.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {/* Category */}
            <Link
              href={`/tools?category=${tool.categoryId}`}
              className="rounded-lg bg-indigo-50 px-3 py-1.5 text-sm text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
            >
              {tool.categories.icon}{" "}
              {isZh && tool.categories.nameZh ? tool.categories.nameZh : tool.categories.name}
            </Link>

            {/* Pricing model */}
            <span className="rounded-lg bg-green-50 px-3 py-1.5 text-sm text-green-600 dark:bg-green-900/30 dark:text-green-400">
              {pricingModelLabel[tool.pricingModel] || tool.pricingModel}
            </span>

            {/* Tags */}
            {tool.tag_on_tool.map((t: any) => (
              <Link
                key={t.tagId}
                href={`/tools?tag=${t.tagId}`}
                className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
              >
                {isZh && t.tags.nameZh ? t.tags.nameZh : t.tags.name}
              </Link>
            ))}
          </div>

          {/* Meta info */}
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            {tool.developer && (
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {isZh ? "开发者" : "Developer"}:
                </span>{" "}
                {tool.developer}
              </div>
            )}
            {tool.founded && (
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {isZh ? "成立" : "Founded"}:
                </span>{" "}
                {tool.founded}
              </div>
            )}
            {tool.platforms && (
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {isZh ? "平台" : "Platforms"}:
                </span>{" "}
                {tool.platforms}
              </div>
            )}
            {tool.viewCount > 0 && (
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {isZh ? "浏览量" : "Views"}:
                </span>{" "}
                {tool.viewCount.toLocaleString()}
              </div>
            )}
            {tool.monthlyVisits && (
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {isZh ? "月访问量" : "Monthly Visits"}:
                </span>{" "}
                {tool.monthlyVisits}
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-6 flex gap-3">
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              {isZh ? "访问官网 →" : "Visit Website →"}
            </a>
            <Link
              href="/submit"
              className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {isZh ? "推荐给朋友" : "Recommend to Friend"}
            </Link>
          </div>
        </div>
      </div>

      {/* Ad After Tool Header */}
      <div className="mt-8 flex justify-center">
        <AdSense adSlot="TOOL_DETAIL_AD_SLOT_1" adFormat="horizontal" className="max-w-full" />
      </div>

      {/* Pricing Plans */}
      {tool.pricing_plans.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {isZh ? "定价方案" : "Pricing Plans"}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tool.pricing_plans.map((plan: any) => {
              const features = JSON.parse(plan.featuresJson || "[]");
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-xl border p-6 ${
                    plan.isPopular
                      ? "border-indigo-300 bg-indigo-50 dark:border-indigo-600 dark:bg-indigo-900/20"
                      : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                  }`}
                >
                  {plan.isPopular && (
                    <span className="absolute -top-3 left-4 rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-medium text-white">
                      {isZh ? "热门" : "Popular"}
                    </span>
                  )}
                  <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {isZh && plan.nameZh ? plan.nameZh : plan.name}
                  </h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {plan.price === 0
                        ? isZh
                          ? "免费"
                          : "Free"
                        : `$${plan.price}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-sm text-gray-400">
                        /{plan.billingCycle === "annual" ? (isZh ? "年" : "year") : isZh ? "月" : "month"}
                      </span>
                    )}
                  </div>
                  <ul className="mt-4 space-y-2">
                    {features.map((f: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <svg className="h-4 w-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={tool.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 block w-full rounded-lg px-4 py-2 text-center text-sm font-medium ${
                      plan.isPopular
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "border border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    {isZh ? "开始使用" : "Get Started"}
                  </a>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Promo Codes */}
      {tool.promo_codes.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {isZh ? "优惠码" : "Promo Codes"}
          </h2>
          <div className="mt-4 space-y-3">
            {tool.promo_codes.map((promo: any) => (
              <div
                key={promo.id}
                className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20"
              >
                <div className="flex items-center gap-4">
                  <code className="rounded bg-green-100 px-3 py-1 text-sm font-bold text-green-700 dark:bg-green-800 dark:text-green-300">
                    {promo.code}
                  </code>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{promo.discount}</span>
                </div>
                {promo.expiresAt && (
                  <span className="text-xs text-gray-400">
                    {isZh ? "过期" : "Expires"}: {promo.expiresAt.toLocaleDateString()}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Ad Before Related Tools */}
      <div className="my-8 flex justify-center">
        <AdSense adSlot="TOOL_DETAIL_AD_SLOT_2" adFormat="auto" className="max-w-full" />
      </div>

      {/* Pros and Cons */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {isZh ? "优缺点分析" : "Pros & Cons"}
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Pros */}
          <div className="rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/20">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-green-700 dark:text-green-400">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              {isZh ? "优点" : "Pros"}
            </h3>
            <ul className="mt-4 space-y-2">
              {(() => {
                try {
                  const pros = JSON.parse(isZh && tool.prosZh && tool.prosZh !== "[]" ? tool.prosZh : (tool.pros || "[]"));
                  return pros.map((p: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="mt-1 text-green-500">✓</span>
                      {p}
                    </li>
                  ));
                } catch { return null; }
              })()}
            </ul>
          </div>
          {/* Cons */}
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-red-700 dark:text-red-400">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
              {isZh ? "缺点" : "Cons"}
            </h3>
            <ul className="mt-4 space-y-2">
              {(() => {
                try {
                  const cons = JSON.parse(isZh && tool.consZh && tool.consZh !== "[]" ? tool.consZh : (tool.cons || "[]"));
                  return cons.map((c: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="mt-1 text-red-500">✗</span>
                      {c}
                    </li>
                  ));
                } catch { return null; }
              })()}
            </ul>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      {(() => {
        try {
          const useCases = JSON.parse(isZh ? (tool.useCasesZh || "[]") : (tool.useCases || "[]"));
          if (useCases.length === 0) return null;
          return (
            <section className="mt-16">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {isZh ? "适用场景" : "Use Cases"}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {useCases.map((uc: string, i: number) => (
                  <div key={i} className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{uc}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        } catch { return null; }
      })()}

      {/* FAQ */}
      {(() => {
        try {
          const faq = JSON.parse(isZh ? (tool.faqZh || "[]") : (tool.faq || "[]"));
          if (!Array.isArray(faq) || faq.length === 0) return null;
          return (
            <section className="mt-16">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {isZh ? "常见问题" : "FAQ"}
              </h2>
              <div className="mt-6 space-y-4">
                {faq.map((item: any, i: number) => (
                  <details key={i} className="group rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                    <summary className="cursor-pointer list-none p-4 font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
                      {item.question}
                      <span className="float-right transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          );
        } catch { return null; }
      })()}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {isZh ? "相关工具" : "Related Tools"}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedTools.map((t: any) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
