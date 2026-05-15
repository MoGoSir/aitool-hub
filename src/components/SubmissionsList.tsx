"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayoutWrapper from "../../app/admin/AdminLayoutWrapper";

interface Submission {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  categoryName: string;
  status: string;
  createdAt: string;
}

interface SubmissionsListProps {
  submissions: Submission[];
}

function SubmissionsList({ submissions }: SubmissionsListProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    if (!confirm("确定要通过这个工具吗？")) return;

    setLoading(id);
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "POST",
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (err) {
      console.error("Error approving:", err);
    } finally {
      setLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm("确定要拒绝这个工具吗？")) return;

    setLoading(id);
    try {
      await fetch(`/api/admin/submissions/${id}`, {
        method: "PUT",
      });
      router.refresh();
    } catch (err) {
      console.error("Error rejecting:", err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <AdminLayoutWrapper>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            提交审核
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            审核用户提交的工具
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          {submissions.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {submissions.map((sub) => (
                <div key={sub.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {sub.name}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            sub.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : sub.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {sub.status === "pending"
                            ? "待审核"
                            : sub.status === "approved"
                            ? "已通过"
                            : "已拒绝"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {sub.description}
                      </p>
                      <div className="mt-3 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>{sub.categoryName}</span>
                        <a
                          href={sub.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                        >
                          {sub.websiteUrl}
                        </a>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">
                        {new Date(sub.createdAt).toLocaleString()}
                      </p>
                      {sub.status === "pending" && (
                        <div className="mt-2 flex gap-2">
                          <button
                            onClick={() => handleApprove(sub.id)}
                            disabled={loading === sub.id}
                            className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                          >
                            {loading === sub.id ? "处理中..." : "通过"}
                          </button>
                          <button
                            onClick={() => handleReject(sub.id)}
                            disabled={loading === sub.id}
                            className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                          >
                            拒绝
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500 dark:text-gray-400">
              暂无提交
            </div>
          )}
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}

export default SubmissionsList;