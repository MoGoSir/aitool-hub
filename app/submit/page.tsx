"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function SubmitPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      nameZh: formData.get("nameZh") as string,
      description: formData.get("description") as string,
      descriptionZh: formData.get("descriptionZh") as string,
      websiteUrl: formData.get("websiteUrl") as string,
      logoUrl: formData.get("logoUrl") as string,
      categoryName: formData.get("categoryName") as string,
      pricingModel: formData.get("pricingModel") as string,
      minPrice: parseFloat(formData.get("minPrice") as string) || null,
    };

    try {
      await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting tool:", error);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="rounded-xl border border-green-200 bg-green-50 p-12 text-center dark:border-green-800 dark:bg-green-900/20">
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">
            {isZh ? "提交成功！" : "Submitted Successfully!"}
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            {isZh ? "感谢您提交工具，我们会尽快审核！" : "Thank you for submitting your tool, we'll review it soon!"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[800px] px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {isZh ? "提交工具" : "Submit a Tool"}
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        {isZh ? "分享您发现的优秀 AI 工具" : "Share your favorite AI tool"}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {isZh ? "工具名称 (英文)" : "Tool Name (English)"} *
            </label>
            <input
              name="name"
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="e.g., ChatGPT"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {isZh ? "工具名称 (中文)" : "Tool Name (Chinese)"}
            </label>
            <input
              name="nameZh"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="e.g., 聊天GPT"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {isZh ? "网站地址" : "Website URL"} *
          </label>
          <input
            name="websiteUrl"
            required
            type="url"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {isZh ? "Logo 地址" : "Logo URL"}
          </label>
          <input
            name="logoUrl"
            type="url"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {isZh ? "描述 (英文)" : "Description (English)"} *
          </label>
          <textarea
            name="description"
            required
            rows={3}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder={isZh ? "Describe what this tool does..." : "Describe what this tool does..."}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {isZh ? "描述 (中文)" : "Description (Chinese)"} *
          </label>
          <textarea
            name="descriptionZh"
            required
            rows={3}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder={isZh ? "描述这个工具的功能..." : "What does this tool do?"}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {isZh ? "分类" : "Category"} *
            </label>
            <select
              name="categoryName"
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="">{isZh ? "选择分类" : "Select category"}</option>
              <option value="Writing">{isZh ? "写作与内容" : "Writing"}</option>
              <option value="Coding">{isZh ? "编程与开发" : "Coding"}</option>
              <option value="Image Generation">{isZh ? "图像生成" : "Image Generation"}</option>
              <option value="Video & Animation">{isZh ? "视频与动画" : "Video & Animation"}</option>
              <option value="Audio & Voice">{isZh ? "音频与语音" : "Audio & Voice"}</option>
              <option value="Productivity">{isZh ? "生产力" : "Productivity"}</option>
              <option value="Marketing & SEO">{isZh ? "营销与SEO" : "Marketing & SEO"}</option>
              <option value="Data Analysis">{isZh ? "数据分析" : "Data Analysis"}</option>
              <option value="Education">{isZh ? "教育与学习" : "Education"}</option>
              <option value="Design & UI/UX">{isZh ? "设计与UI" : "Design & UI/UX"}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {isZh ? "定价模式" : "Pricing Model"} *
            </label>
            <select
              name="pricingModel"
              required
              defaultValue="freemium"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="free">{isZh ? "免费" : "Free"}</option>
              <option value="freemium">{isZh ? "免费增值" : "Freemium"}</option>
              <option value="paid">{isZh ? "付费" : "Paid"}</option>
              <option value="enterprise">{isZh ? "企业版" : "Enterprise"}</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {isZh ? "最低价格 (可选)" : "Minimum Price (Optional)"}
          </label>
          <input
            name="minPrice"
            type="number"
            min="0"
            step="0.01"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder={isZh ? "例如：10 (美元/月)" : "e.g., 10 (in USD/month)"}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {submitting ? (isZh ? "提交中..." : "Submitting...") : (isZh ? "提交工具" : "Submit Tool")}
        </button>
      </form>
    </div>
  );
}