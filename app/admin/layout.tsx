// 这是根级别的 admin 布局，不做认证检查
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}