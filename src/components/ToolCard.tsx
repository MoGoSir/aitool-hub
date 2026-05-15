"use client";

import Link from "next/link";
import { useState } from "react";

interface ToolCardProps {
  tool: {
    id: string;
    name: string;
    nameZh?: string | null;
    slug: string;
    description: string;
    descriptionZh?: string | null;
    logoUrl?: string | null;
    pricingModel: string;
    minPrice?: number | null;
    isFeatured?: boolean;
    isVerified?: boolean;
    categories: { icon?: string | null; name: string };
    pricing_plans?: Array<{
      name: string;
      price: number;
      billingCycle: string;
      isPopular?: boolean;
    }>;
  };
}

export default function ToolCard({ tool }: ToolCardProps) {
  const [logoError, setLogoError] = useState(false);

  const pricingModelLabel: Record<string, string> = {
    free: "Free",
    freemium: "Freemium",
    paid: "Paid",
    enterprise: "Enterprise",
  };

  const displayName = tool.name;
  const displayDescription = tool.description;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-indigo-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-600"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50 text-2xl dark:bg-gray-700">
          {tool.logoUrl && !logoError ? (
            <img
              src={tool.logoUrl}
              alt={displayName}
              className="h-8 w-8 rounded object-contain"
              onError={() => setLogoError(true)}
            />
          ) : (
            "🤖"
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
              {displayName}
            </h3>
            {tool.isVerified && (
              <span className="flex-shrink-0 rounded-full bg-green-100 px-1.5 py-0.5 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">
                ✓
              </span>
            )}
            {tool.isFeatured && (
              <span className="flex-shrink-0 rounded-full bg-indigo-100 px-1.5 py-0.5 text-xs text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                ★
              </span>
            )}
          </div>
          <p className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
            {displayDescription}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {tool.categories.icon && (
            <span className="text-sm">{tool.categories.icon}</span>
          )}
          <span className="text-xs text-gray-400">
            {tool.categories.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {pricingModelLabel[tool.pricingModel] || tool.pricingModel}
          </span>
          {tool.minPrice !== null && tool.minPrice !== undefined && (
            tool.minPrice > 0 ? (
              <span className="text-xs text-gray-500">
                ${tool.minPrice}+
              </span>
            ) : (
              <span className="text-xs text-green-600 dark:text-green-400">
                Free
              </span>
            )
          )}
        </div>
      </div>
    </Link>
  );
}