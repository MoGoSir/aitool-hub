import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const category = searchParams.get("category") || "";
  const tag = searchParams.get("tag") || "";
  const search = searchParams.get("search") || "";
  const pricingModel = searchParams.get("pricingModel") || "";

  const skip = (page - 1) * limit;

  const where: any = {};
  if (category) where.categoryId = category;
  if (pricingModel) where.pricingModel = pricingModel;
  if (tag) where.tag_on_tool = { some: { tagId: tag } };
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { nameZh: { contains: search } },
      { description: { contains: search } },
      { descriptionZh: { contains: search } },
    ];
  }

  const [tools, total] = await Promise.all([
    prisma.tools.findMany({
      where,
      skip,
      take: limit,
      include: {
        categories: true,
        tag_on_tool: { include: { tags: true } },
        pricing_plans: { where: { isPopular: true }, take: 1 },
      },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    }),
    prisma.tools.count({ where }),
  ]);

  return NextResponse.json({
    tools,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    let category = await prisma.categories.findFirst({
      where: { name: body.categoryName },
    });

    if (!category) {
      category = await prisma.categories.create({
        data: {
          id: `cat_${Date.now()}`,
          name: body.categoryName,
          nameZh: body.categoryName,
          slug: body.categoryName.toLowerCase().replace(/\s+/g, "-"),
          icon: "📁",
        },
      });
    }

    const submission = await prisma.tool_submissions.create({
      data: {
        id: `sub_${Date.now()}`,
        name: body.name,
        nameZh: body.nameZh,
        description: body.description,
        descriptionZh: body.descriptionZh,
        websiteUrl: body.websiteUrl,
        logoUrl: body.logoUrl,
        categoryName: body.categoryName,
        pricingModel: body.pricingModel,
        minPrice: body.minPrice,
        status: "pending",
      },
    });

    return NextResponse.json({ success: true, submission });
  } catch (error) {
    console.error("Error creating tool submission:", error);
    return NextResponse.json(
      { error: "Failed to create submission" },
      { status: 500 }
    );
  }
}