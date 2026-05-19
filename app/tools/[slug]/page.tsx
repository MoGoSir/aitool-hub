import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ToolDetailPageContent from "./ToolDetailPageContent";

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

  return <ToolDetailPageContent tool={tool} relatedTools={relatedTools} />;
}
