import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ArticleDetailContent from "./ArticleDetailContent";

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = await prisma.articles.findUnique({
    where: { slug: params.slug },
  });

  if (!article || article.status !== "published") {
    notFound();
  }

  // Increment view count
  await prisma.articles.update({
    where: { id: article.id },
    data: { viewCount: { increment: 1 } },
  });

  // Get related articles
  const relatedArticles = await prisma.articles.findMany({
    where: {
      status: "published",
      id: { not: article.id },
      category: article.category,
    },
    orderBy: { publishDate: "desc" },
    take: 3,
  });

  return <ArticleDetailContent article={article} relatedArticles={relatedArticles} />;
}
