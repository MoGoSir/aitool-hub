import { prisma } from "@/lib/prisma";
import SubmissionsList from "../../../src/components/SubmissionsList";

export default async function AdminSubmissionsPage() {
  const submissions = await prisma.tool_submissions.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <SubmissionsList submissions={submissions} />;
}