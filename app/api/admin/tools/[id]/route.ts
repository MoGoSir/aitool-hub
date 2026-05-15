import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    
    const tool = await prisma.tools.update({
      where: { id: params.id },
      data: {
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
    console.error("Error updating tool:", error);
    return NextResponse.json(
      { error: "Failed to update tool" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.tools.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting tool:", error);
    return NextResponse.json(
      { error: "Failed to delete tool" },
      { status: 500 }
    );
  }
}