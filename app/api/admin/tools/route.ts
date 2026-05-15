import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const tool = await prisma.tools.create({
      data: {
        id: `tool_${Date.now()}`,
        name: data.name,
        nameZh: data.nameZh || null,
        slug: data.slug,
        description: data.description,
        descriptionZh: data.descriptionZh,
        websiteUrl: data.websiteUrl,
        logoUrl: data.logoUrl || null,
        developer: data.developer || null,
        founded: data.founded || null,
        platforms: data.platforms || null,
        categoryId: data.categoryId,
        pricingModel: data.pricingModel,
        minPrice: data.minPrice,
        isFeatured: data.isFeatured || false,
        isVerified: data.isVerified || false,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(tool);
  } catch (error) {
    console.error("Error creating tool:", error);
    return NextResponse.json(
      { error: "Failed to create tool" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const tools = await prisma.tools.findMany({
    include: { categories: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(tools);
}