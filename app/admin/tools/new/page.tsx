import { prisma } from "@/lib/prisma";
import { ToolForm } from "@/components/ToolForm";

export default async function NewToolPage() {
  const categories = await prisma.categories.findMany();

  return <ToolForm categories={categories} />;
}