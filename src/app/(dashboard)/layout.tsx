import { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "POS System",
  description: "A simple POS system built with Next.js",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <h1 className="text-xl font-bold">POS System</h1>
              </div>
              <nav className="ml-6 flex items-center space-x-4">
                <Link
                  href="/"
                  className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Dashboard
                </Link>
                <Link
                  href="/products"
                  className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Products
                </Link>
                <Link
                  href="/sales"
                  className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  Sales
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
