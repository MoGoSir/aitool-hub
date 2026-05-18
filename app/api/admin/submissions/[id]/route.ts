import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const submission = await prisma.tool_submissions.findUnique({
      where: { id: params.id },
    });

    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    // Update submission status
    const updatedSubmission = await prisma.tool_submissions.update({
      where: { id: params.id },
      data: { status: "approved" },
    });

    // Create new tool
    const category = await prisma.categories.findFirst({
      where: {
        OR: [
          { name: submission.categoryName },
          { nameZh: submission.categoryName },
        ],
      },
    });

    const defaultCategory = await prisma.categories.findFirst();

    const tool = await prisma.tools.create({
      data: {
        id: `tool_${Date.now()}`,
        name: submission.name,
        nameZh: submission.name,
        slug: submission.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: submission.description,
        descriptionZh: submission.description,
        websiteUrl: submission.websiteUrl,
        categoryId: category?.id || defaultCategory?.id || "",
        pricingModel: "freemium",
        isFeatured: false,
        isVerified: false,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ tool });
  } catch (error) {
    console.error("Error approving submission:", error);
    return NextResponse.json(
      { error: "Failed to approve submission" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updatedSubmission = await prisma.tool_submissions.update({
      where: { id: params.id },
      data: { status: "rejected" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error rejecting submission:", error);
    return NextResponse.json(
      { error: "Failed to reject submission" },
      { status: 500 }
    );
  }
}