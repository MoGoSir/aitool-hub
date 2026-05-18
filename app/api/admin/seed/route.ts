import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    // 清空现有数据
    await prisma.tool_submissions.deleteMany();
    await prisma.promo_codes.deleteMany();
    await prisma.price_history.deleteMany();
    await prisma.pricing_plans.deleteMany();
    await prisma.tag_on_tool.deleteMany();
    await prisma.tools.deleteMany();
    await prisma.categories.deleteMany();
    await prisma.tags.deleteMany();

    // 分类数据
    const categories = [
      { name: "Writing", nameZh: "写作与内容", slug: "writing", icon: "️" },
      { name: "Coding", nameZh: "编程与开发", slug: "coding", icon: "💻" },
      { name: "Image Generation", nameZh: "图像生成", slug: "image-gen", icon: "🎨" },
      { name: "Video & Animation", nameZh: "视频与动画", slug: "video", icon: "🎬" },
      { name: "Audio & Voice", nameZh: "音频与语音", slug: "audio", icon: "🎤" },
      { name: "Productivity", nameZh: "生产力与效率", slug: "productivity", icon: "⚡" },
      { name: "Marketing & SEO", nameZh: "营销与SEO", slug: "marketing", icon: "📈" },
      { name: "Data Analysis", nameZh: "数据分析", slug: "data-analysis", icon: "📊" },
      { name: "Education", nameZh: "教育与学习", slug: "education", icon: "🎓" },
      { name: "Design & UI/UX", nameZh: "设计与UI/UX", slug: "design", icon: "🖌️" },
    ];

    const catMap: Record<string, string> = {};
    for (const c of categories) {
      const created = await prisma.categories.create({
        data: { ...c, id: `cat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` },
      });
      catMap[c.slug] = created.id;
    }

    // 标签数据
    const tags = [
      { name: "writing", nameZh: "写作" },
      { name: "chat-bot", nameZh: "聊天机器人" },
      { name: "coding", nameZh: "编程" },
      { name: "image-gen", nameZh: "图像生成" },
      { name: "video-gen", nameZh: "视频生成" },
      { name: "audio-gen", nameZh: "音频生成" },
      { name: "productivity", nameZh: "效率" },
      { name: "marketing", nameZh: "营销" },
      { name: "data-analysis", nameZh: "数据分析" },
      { name: "education", nameZh: "教育" },
      { name: "design", nameZh: "设计" },
      { name: "api", nameZh: "API" },
      { name: "open-source", nameZh: "开源" },
      { name: "enterprise", nameZh: "企业级" },
      { name: "free-tier", nameZh: "免费版" },
    ];

    const tagMap: Record<string, string> = {};
    for (const t of tags) {
      const created = await prisma.tags.create({
        data: { ...t, id: `tag-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` },
      });
      tagMap[t.name] = created.id;
    }

    // 核心工具数据（精选工具）
    const tools = [
      {
        name: "ChatGPT", nameZh: "ChatGPT", slug: "chatgpt",
        description: "Advanced AI chatbot with GPT-4o, used for writing, coding, and more.",
        descriptionZh: "基于 GPT-4o 的先进 AI 聊天机器人，用于写作、编程等。",
        websiteUrl: "https://chat.openai.com", logoUrl: "",
        developer: "OpenAI", founded: "2022", platforms: "Web,iOS,Android",
        categorySlug: "writing", tagNames: ["writing", "chat-bot"],
        pricingModel: "freemium", minPrice: 20, isFeatured: true,
        plans: [
          { name: "Free", nameZh: "免费版", price: 0, billingCycle: "monthly", features: ["GPT-3.5", "标准速度"] },
          { name: "Plus", nameZh: "Plus", price: 20, billingCycle: "monthly", isPopular: true, features: ["GPT-4o", "更快速度", "DALL-E"] },
        ],
      },
      {
        name: "Claude", nameZh: "Claude", slug: "claude",
        description: "Constitutional AI assistant by Anthropic, excels at writing and analysis.",
        descriptionZh: "Anthropic 推出的 constitutional AI 助手，擅长写作与分析。",
        websiteUrl: "https://claude.ai", logoUrl: "",
        developer: "Anthropic", founded: "2023", platforms: "Web,iOS",
        categorySlug: "writing", tagNames: ["writing", "chat-bot"],
        pricingModel: "freemium", minPrice: 20, isFeatured: true,
        plans: [
          { name: "Free", nameZh: "免费版", price: 0, billingCycle: "monthly", features: ["Claude 3.5 Sonnet", "有限次数"] },
          { name: "Pro", nameZh: "Pro", price: 20, billingCycle: "monthly", isPopular: true, features: ["Claude 3.7 Sonnet", "优先访问", "更大上下文"] },
        ],
      },
      {
        name: "Midjourney", nameZh: "Midjourney", slug: "midjourney",
        description: "AI image generation tool known for high-quality artistic outputs.",
        descriptionZh: "以高质量艺术输出闻名的 AI 图像生成工具。",
        websiteUrl: "https://www.midjourney.com", logoUrl: "",
        developer: "Midjourney Inc.", founded: "2022", platforms: "Discord,Web",
        categorySlug: "image-gen", tagNames: ["image-gen", "design"],
        pricingModel: "paid", minPrice: 10, isFeatured: true,
        plans: [
          { name: "Basic", nameZh: "基础版", price: 10, billingCycle: "monthly", features: ["3.3小时/月", "标准商用"] },
          { name: "Standard", nameZh: "标准版", price: 30, billingCycle: "monthly", isPopular: true, features: ["15小时/月", "无限放松模式"] },
        ],
      },
      {
        name: "GitHub Copilot", nameZh: "GitHub Copilot", slug: "github-copilot",
        description: "AI pair programmer that suggests code and whole functions in real-time.",
        descriptionZh: "AI 结对编程助手，实时建议代码和完整函数。",
        websiteUrl: "https://github.com/features/copilot", logoUrl: "",
        developer: "GitHub (Microsoft)", founded: "2022", platforms: "VS Code,JetBrains,Neovim,Web",
        categorySlug: "coding", tagNames: ["coding", "productivity"],
        pricingModel: "freemium", minPrice: 10, isFeatured: true,
        plans: [
          { name: "Free", nameZh: "免费版", price: 0, billingCycle: "monthly", features: ["学生/维护者免费", "有限补全"] },
          { name: "Pro", nameZh: "Pro", price: 10, billingCycle: "monthly", isPopular: true, features: ["无限补全", "Chat", "CLI"] },
        ],
      },
      {
        name: "Cursor", nameZh: "Cursor", slug: "cursor",
        description: "AI-first code editor with GPT-4 and Claude built in.",
        descriptionZh: "内置 GPT-4 和 Claude 的 AI 优先代码编辑器。",
        websiteUrl: "https://cursor.sh", logoUrl: "",
        developer: "Cursor Inc.", founded: "2023", platforms: "Web,VS Code Extension",
        categorySlug: "coding", tagNames: ["coding", "open-source"],
        pricingModel: "freemium", minPrice: 20, isFeatured: true,
        plans: [
          { name: "Free", nameZh: "免费版", price: 0, billingCycle: "monthly", features: ["每月2000次补全", "50次聊天"] },
          { name: "Pro", nameZh: "Pro", price: 20, billingCycle: "monthly", isPopular: true, features: ["无限补全", "无限聊天", "GPT-4o"] },
        ],
      },
    ];

    let count = 0;
    for (const t of tools) {
      const toolData: any = {
        id: `tool-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: t.name,
        nameZh: t.nameZh,
        slug: t.slug,
        description: t.description,
        descriptionZh: t.descriptionZh,
        websiteUrl: t.websiteUrl,
        logoUrl: t.logoUrl,
        developer: t.developer,
        founded: t.founded,
        platforms: t.platforms,
        pricingModel: t.pricingModel,
        minPrice: t.minPrice,
        isFeatured: t.isFeatured || false,
        categoryId: catMap[t.categorySlug],
        updatedAt: new Date(),
      };

      const createdTool = await prisma.tools.create({ data: toolData });

      // 创建标签关联
      for (const tagName of t.tagNames || []) {
        if (tagMap[tagName]) {
          await prisma.tag_on_tool.create({
            data: { toolId: createdTool.id, tagId: tagMap[tagName] },
          });
        }
      }

      // 创建定价方案
      if (t.plans && t.plans.length > 0) {
        for (const p of t.plans as any[]) {
          await prisma.pricing_plans.create({
            data: {
              id: `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              toolId: createdTool.id,
              name: p.name,
              price: p.price,
              billingCycle: p.billingCycle,
              isPopular: p.isPopular || false,
              featuresJson: JSON.stringify(p.features || []),
            },
          });
        }
      }
      count++;
    }

    return NextResponse.json({
      success: true,
      message: "Seed completed!",
      data: {
        categories: categories.length,
        tags: tags.length,
        tools: count,
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Seed failed", details: error }, { status: 500 });
  }
}
