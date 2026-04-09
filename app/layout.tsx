import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RAE Scale — Modular Type Scale Calculator",
  description:
    "Calculate modular type scales with single or dual bases, pixel rounding, and export to CSS, SCSS, Tailwind, or JSON.",
  openGraph: {
    title: "RAE Scale — Modular Type Scale Calculator",
    description:
      "Calculate modular type scales with single or dual bases, pixel rounding, and export to CSS, SCSS, Tailwind, or JSON.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NuqsAdapter>
          <TooltipProvider>{children}</TooltipProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
