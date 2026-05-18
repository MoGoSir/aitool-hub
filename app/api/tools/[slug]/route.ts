import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const tool = await prisma.tools.findUnique({
    where: { slug: params.slug },
    include: {
      categories: true,
      tag_on_tool: { include: { tags: true } },
      pricing_plans: { orderBy: { price: "asc" } },
      promo_codes: { where: { isVerified: true } },
    },
  });

  if (!tool) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Related tools: same category, excluding current
  const related = await prisma.tools.findMany({
    where: { categoryId: tool.categoryId, id: { not: tool.id } },
    take: 4,
    include: { categories: true, tag_on_tool: { include: { tags: true } }, pricing_plans: { where: { isPopular: true }, take: 1 } },
  });

  return NextResponse.json({ tool, related });
}
