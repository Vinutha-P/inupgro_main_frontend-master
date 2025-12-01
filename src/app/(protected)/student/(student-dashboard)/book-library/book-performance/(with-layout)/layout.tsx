"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface LayoutProps {
  children: React.ReactNode;
}

export default function BookPerformanceLayout({ children }: LayoutProps) {
  const router = useRouter();
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("bookData");
    if (data) {
      setBook(JSON.parse(data));
    }
  }, []);

  return (
    <main className="max-w-full w-full mx-auto py-5">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Sidebar - exact book cover design */}
        <aside className="xl:col-span-3">
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
            <div className="mb-6">
              <div className="relative w-full aspect-[3/4] bg-transparent rounded-lg overflow-hidden shadow-lg">
                <Image src={book?.coverImageUrl || "/placeholder/image"} alt="book" fill />
              </div>
            </div>

            {/* Action Buttons - exact styling */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  sessionStorage.setItem("bookData", JSON.stringify(book));
                  router.push(`/student/book-library/book-performance/${book?.id}`);
                }}
                className="block text-center w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-sm"
              >
                Continue Reading
              </button>
              <button className="w-full border border-[#D1D5DB] hover:border-[#9CA3AF] hover:bg-[#F9FAFB] text-[#374151] font-medium py-3 px-4 rounded-lg transition-all duration-200 bg-white">
                Chapter
              </button>
              <button className="w-full border border-[#D1D5DB] hover:border-[#9CA3AF] hover:bg-[#F9FAFB] text-[#374151] font-medium py-3 px-4 rounded-lg transition-all duration-200 bg-white">
                Take Test
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="xl:col-span-9 space-y-8 py-6 px-[30px] bg-white rounded-[10px] overflow-hidden">
          {children}
        </section>
      </div>
    </main>
  );
}