import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sc",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "AIToolHub - 发现最佳 AI 工具 | Discover the Best AI Tools",
    template: "%s | AIToolHub",
  },
  description:
    "发现最适合的 AI 工具，支持价格对比与优惠聚合。Discover, compare, and find the best AI tools with transparent pricing.",
  keywords: [
    "AI工具",
    "人工智能",
    "AI软件",
    "ChatGPT",
    "Midjourney",
    "Claude",
    "AI工具导航",
    "AI工具集",
    "AI产品",
    "AI评测",
    "AI comparison",
    "AI tools",
    "artificial intelligence",
    "AI software",
  ],
  authors: [{ name: "AIToolHub Team" }],
  creator: "AIToolHub",
  publisher: "AIToolHub",
  metadataBase: new URL("https://aitoolhub.com"),
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
    siteName: "AIToolHub",
    title: "AIToolHub - 发现最佳 AI 工具",
    description: "发现最适合的 AI 工具，支持价格对比与优惠聚合",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AIToolHub - AI Tools Discovery Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIToolHub - 发现最佳 AI 工具",
    description: "发现最适合的 AI 工具，支持价格对比与优惠聚合",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7461264481827321"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${inter.variable} ${notoSansSC.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
