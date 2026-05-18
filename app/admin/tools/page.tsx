"use client";

import { useState } from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AdminLayoutWrapper from "../AdminLayoutWrapper";

interface Tool {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  minPrice: number | null;
  isFeatured: boolean;
  isVerified: boolean;
  categories: { name: string };
}

async function fetchTools(): Promise<Tool[]> {
  const res = await fetch("/api/admin/tools");
  return res.json();
}

export default function AdminToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useState(() => {
    fetchTools().then((data) => {
      setTools(data);
      setLoading(false);
    });
  });

  const handleDelete = async (id: string, name: string) => {
    setDeletingId(id);
    
    try {
      const res = await fetch(`/api/admin/tools/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTools(tools.filter((tool) => tool.id !== id));
      } else {
        console.error("Failed to delete tool");
      }
    } catch (error) {
      console.error("Error deleting tool:", error);
    } finally {
      setDeletingId(null);
      setConfirmDelete(null);
    }
  };

  if (loading) {
    return (
      <AdminLayoutWrapper>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
      </AdminLayoutWrapper>
    );
  }

  return (
    <AdminLayoutWrapper>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              工具管理
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              管理所有AI工具
            </p>
          </div>
          <Link
            href="/admin/tools/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
          >
            + 添加工具
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    工具
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    分类
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    价格
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    状态
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr
                    key={tool.id}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-xl">
                          {tool.logoUrl ? (
                            <img
                              src={tool.logoUrl}
                              alt={tool.name}
                              className="h-6 w-6 object-contain"
                            />
                          ) : (
                            "🤖"
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {tool.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {tool.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">
                      {tool.categories.name}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">
                      {tool.minPrice === 0
                        ? "免费"
                        : tool.minPrice
                        ? `$${tool.minPrice}+`
                        : "-"}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {tool.isFeatured && (
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                            精选
                          </span>
                        )}
                        {tool.isVerified && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            已验证
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/tools/${tool.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 text-sm"
                        >
                          编辑
                        </Link>
                        <Link
                          href={`/tools/${tool.slug}`}
                          target="_blank"
                          className="text-gray-500 hover:text-gray-600 dark:text-gray-400 text-sm"
                        >
                          预览
                        </Link>
                        {confirmDelete === tool.id ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDelete(tool.id, tool.name)}
                              disabled={deletingId === tool.id}
                              className="text-red-600 hover:text-red-700 dark:text-red-400 text-sm disabled:opacity-50"
                            >
                              {deletingId === tool.id ? "删除中..." : "确认"}
                            </button>
                            <button
                              onClick={() => setConfirmDelete(null)}
                              className="text-gray-500 hover:text-gray-600 dark:text-gray-400 text-sm"
                            >
                              取消
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDelete(tool.id)}
                            className="text-red-500 hover:text-red-600 dark:text-red-400 text-sm"
                          >
                            删除
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}