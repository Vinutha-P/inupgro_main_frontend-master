"use client";

import Image from "next/image";
import { ReactNode } from "react";
import searchIcn from "@/assets/search.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function StudentDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathName = usePathname();

  // Split and remove empty segments
  const pathSegments = pathName.split("/").filter(Boolean);

  // Remove the first segment (e.g., "student")
  const filteredSegments = pathSegments.slice(1);

  const generateHref = (index: number) => {
    // Add back the leading slash and prefix with "student" to keep routing intact
    return (
      "/" + [pathSegments[0], ...filteredSegments.slice(0, index + 1)].join("/")
    );
  };

  return (
    <div>
      <main className={`px-3 lg:px-20 border-2`}>
        <div className={`px-1.5 flex justify-center mx-auto max-w-[95rem]`}>
          <div className="w-full">
            <div className="flex gap-6 pb-12 pt-6">
              <div className="flex-1">
                {pathName !== "/student/book-library" && (
                  <header className="py-2.5">
                    <div className="max-w-full w-full mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                      <div className="space-y-8">
                        <nav className="flex text-[15px] text-grayMedium font-medium">
                          {filteredSegments?.map(
                            (segment: any, index: number) => {
                              const href = generateHref(index);
                              const label = segment
                                .replace(/-/g, " ") // replace dashes with spaces
                                .replace(/\b\w/g, (c: any) => c.toUpperCase()); // capitalize words

                              const isLast =
                                index === filteredSegments.length - 1;

                              return (
                                <span key={href} className="flex items-center">
                                  {!isLast ? (
                                    <Link
                                      href={href}
                                      className="hover:text-[#374151] cursor-pointer transition-colors capitalize"
                                    >
                                      {label}
                                    </Link>
                                  ) : (
                                    <span className="hover:text-[#374151] cursor-pointer transition-colors capitalize">
                                      {label}
                                    </span>
                                  )}
                                  {!isLast && <span className="mx-0.5">/</span>}
                                </span>
                              );
                            }
                          )}
                          {/* <span className="hover:text-[#374151] cursor-pointer transition-colors">
                            Book Library
                          </span>
                          <span className="mx-1">/</span>
                          <span className="hover:text-[#374151] cursor-pointer transition-colors">
                            Book Performance
                          </span> */}
                        </nav>
                        <h1 className="text-2xl font-semibold text-darkText tracking-tight">
                          Mathematics
                        </h1>
                      </div>

                      {pathName == "/student/book-library" || pathName == "/student/book-library/book-performance/" && (
                        <div className="py-2 px-[18px] max-w-[314px] flex w-full bg-white rounded-lg overflow-hidden border border-[#C4C4C4]">
                          <Image
                            src={searchIcn}
                            width={18}
                            height={18}
                            alt="search"
                          />
                          <input
                            type="text"
                            className="pl-3 w-full h-full text-base outline-none"
                            placeholder="Search"
                          />
                        </div>
                      )}
                    </div>
                  </header>
                )}
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
