import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ToolForm } from "@/components/ToolForm";

export default async function EditToolPage({
  params,
}: {
  params: { id: string };
}) {
  const tool = await prisma.tools.findUnique({
    where: { id: params.id },
  });

  if (!tool) notFound();

  const categories = await prisma.categories.findMany();

  return <ToolForm tool={tool} categories={categories} isEdit={true} />;
}