import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "MacroMind",
  description: "AI-powered nutrition tracking made simple.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <div className="lg:grid lg:grid-row-2">
        <div className="w-full max-auto flex justify-center items-center bg-slate-900/80 backdrop-blur border border-slate-800 ">
          <Link href="/">
           <Image 
           src="/macromind-logo2.svg"
           width={150}
           height={150}
           alt="MacroMind"
           className="object contain scale-(1.5) zoom-image cursor-pointer"
           />
          </Link>
        </div>
        {/* 🔝 Top Navigation */}
        <div className="w-full mx-auto mb-2">
          <div className="flex justify-between items-center
                          bg-slate-900/80 backdrop-blur
                          border border-slate-800
                          rounded-b-2xl p-2 lg:p-3">

            <Link
              href="/macros/goals"
              className="px-4 py-2 text-sm font-medium
                        text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              🎯 Goal
            </Link>

            <Link
              href="/macros/today"
              className="px-4 py-2 text-sm font-medium
                        text-slate-300 hover:text-white hover:bg-slate-800 hover:rounded-lg hover:ring transition"
            >
              📊 Today
            </Link>

            <Link
              href="/macros/month"
              className="px-4 py-2 text-sm font-medium
                        text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              📅 Month
            </Link>

            <Link
              href="/macros/new"
              className="px-6 py-2 rounded-lg text-sm font-medium
                        bg-blue-600 text-white hover:bg-blue-500 transition lg:text-lg lg:pr-5 lg:mr-5 lg:ring lg:w-30 lg:text-center"
            >
               New
            </Link>
          </div>
        </div>
        </div>
        <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
