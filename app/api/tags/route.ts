import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const tags = await prisma.tags.findMany({
    include: { _count: { select: { tag_on_tool: true } } },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(tags);
}
