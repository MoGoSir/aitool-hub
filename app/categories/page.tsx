import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CategoriesPageContent from "./CategoriesPageContent";

export default async function CategoriesPage() {
  const categories = await prisma.categories.findMany({
    include: {
      _count: { select: { tools: true } },
      tools: { take: 1, select: { logoUrl: true } },
    },
    orderBy: { name: "asc" },
  });

  return <CategoriesPageContent categories={categories} />;
}
