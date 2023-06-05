import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "clip-path editor",
  description: "clip-path css maker, create your own clip-path with ease",
  keywords: [
    "clip-path",
    "css",
    "clip-path maker",
    "clip-path editor",
    "clip-path generator",
    "clip-path css",
    "clip-path css maker",
    "clip-path css editor",
    "clip-path css generator",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
