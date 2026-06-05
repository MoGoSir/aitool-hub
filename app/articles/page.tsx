import { prisma } from "@/lib/prisma";
import ArticleListContent from "./ArticleListContent";

export default async function ArticleListPage() {
  const articles = await prisma.articles.findMany({
    where: { status: "published" },
    orderBy: { publishDate: "desc" },
    take: 50,
  });

  const categories = [
    { id: "review", name: "评测", nameEn: "Reviews", count: 0 },
    { id: "comparison", name: "对比", nameEn: "Comparisons", count: 0 },
    { id: "guide", name: "教程", nameEn: "Guides", count: 0 },
    { id: "news", name: "资讯", nameEn: "News", count: 0 },
  ];

  // Count articles per category
  for (const cat of categories) {
    cat.count = await prisma.articles.count({
      where: { status: "published", category: cat.id },
    });
  }

  return <ArticleListContent articles={articles} categories={categories} />;
}
