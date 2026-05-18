import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import AdSense from "@/components/AdSense";

export default async function ToolDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const tool = await prisma.tools.findUnique({
    where: { slug: params.slug },
    include: {
      categories: true,
      tag_on_tool: { include: { tags: true } },
      pricing_plans: { orderBy: { price: "asc" } },
      promo_codes: { where: { isVerified: true } },
    },
  });

  if (!tool) notFound();

  await prisma.tools.update({
    where: { id: tool.id },
    data: { viewCount: { increment: 1 } },
  });

  const relatedTools = await prisma.tools.findMany({
    where: { categoryId: tool.categoryId, id: { not: tool.id } },
    take: 4,
    include: {
      categories: true,
      tag_on_tool: { include: { tags: true } },
      pricing_plans: { where: { isPopular: true }, take: 1 },
    },
    orderBy: { viewCount: "desc" },
  });

  const pricingModelLabel: Record<string, string> = {
    free: "Free",
    freemium: "Freemium",
    paid: "Paid",
    enterprise: "Enterprise",
  };

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/tools"
          className="hover:text-gray-600 dark:hover:text-gray-300"
        >
          Tools
        </Link>
        <span>/</span>
        <span className="text-gray-600 dark:text-gray-300">{tool.name}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        {/* Logo */}
        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-5xl dark:border-gray-700 dark:bg-gray-800">
          {tool.logoUrl ? (
            <img
              src={tool.logoUrl}
              alt={tool.name}
              className="h-16 w-16 rounded object-contain"
            />
          ) : (
            "🤖"
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-start gap-3">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {tool.name}
              {tool.nameZh && tool.nameZh !== tool.name && (
                <span className="ml-3 text-xl text-gray-500 dark:text-gray-400">
                  {tool.nameZh}
                </span>
              )}
            </h1>
            {tool.isVerified && (
              <span className="mt-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                Verified
              </span>
            )}
            {tool.isFeatured && (
              <span className="mt-1 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                Featured
              </span>
            )}
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {tool.description}
          </p>
          {tool.descriptionZh && tool.descriptionZh !== tool.description && (
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {tool.descriptionZh}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {/* Category */}
            <Link
              href={`/tools?category=${tool.categoryId}`}
              className="rounded-lg bg-indigo-50 px-3 py-1.5 text-sm text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
            >
              {tool.categories.icon} {tool.categories.name}
            </Link>

            {/* Pricing model */}
            <span className="rounded-lg bg-green-50 px-3 py-1.5 text-sm text-green-600 dark:bg-green-900/30 dark:text-green-400">
              {pricingModelLabel[tool.pricingModel] || tool.pricingModel}
            </span>

            {/* Tags */}
            {tool.tag_on_tool.map((t) => (
              <Link
                key={t.tagId}
                href={`/tools?tag=${t.tagId}`}
                className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
              >
                {t.tags.name}
              </Link>
            ))}
          </div>

          {/* Meta info */}
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            {tool.developer && (
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Developer:
                </span>{" "}
                {tool.developer}
              </div>
            )}
            {tool.founded && (
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Founded:
                </span>{" "}
                {tool.founded}
              </div>
            )}
            {tool.platforms && (
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Platforms:
                </span>{" "}
                {tool.platforms}
              </div>
            )}
            {tool.viewCount > 0 && (
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Views:
                </span>{" "}
                {tool.viewCount.toLocaleString()}
              </div>
            )}
            {tool.monthlyVisits && (
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Monthly Visits:
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
              访问官网 / Visit Website →
            </a>
            <Link
              href="/submit"
              className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              推荐给朋友 / Recommend to Friend
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
            定价方案 / Pricing Plans
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tool.pricing_plans.map((plan) => {
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
                      Popular
                    </span>
                  )}
                  <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {plan.price === 0 ? "Free" : `$${plan.price}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-sm text-gray-400">
                        /{plan.billingCycle === "annual" ? "year" : "month"}
                      </span>
                    )}
                  </div>
                  <ul className="mt-4 space-y-2">
                    {features.map((f: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                      >
                        <svg
                          className="h-4 w-4 text-green-500 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
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
                    Get Started
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
            优惠码 / Promo Codes
          </h2>
          <div className="mt-4 space-y-3">
            {tool.promo_codes.map((promo) => (
              <div
                key={promo.id}
                className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20"
              >
                <div className="flex items-center gap-4">
                  <code className="rounded bg-green-100 px-3 py-1 text-sm font-bold text-green-700 dark:bg-green-800 dark:text-green-300">
                    {promo.code}
                  </code>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {promo.discount}
                  </span>
                </div>
                {promo.expiresAt && (
                  <span className="text-xs text-gray-400">
                    Expires: {promo.expiresAt.toLocaleDateString()}
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

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            相关工具 / Related Tools
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedTools.map((t) => (
              <ToolCard key={t.id} tool={t as any} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}