"use client";
import React, { useState } from "react";
import SectionHeader from "@/components/student/SectionHeader";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import Link from "next/link";
// import { availableBooks } from "@/utils/data/books/sampleBooks1";
import { Book } from "@/types";
import { useRouter } from "next/navigation";
import { getAllBooks } from "../../../../../utils/data/books/book-data";

export default function StudentDashboard() {
  const router = useRouter();
  // const [books] = useState<Book[]>(availableBooks);
  const books = getAllBooks();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % books.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + books.length) % books.length);
  };

  return (
    <div>
      <SectionHeader
        title="9th Class"
        subtitle=""
        actionText="+ Add New Book"
      />

      <div className="min-h-[calc(100vh-230px)] flex flex-col items-center justify-between rounded-xl bg-[#ffffff] p-6">
        {/* Header */}
        <div className="w-full flex items-center justify-self-end self-start justify-between mb-16 lg:px-4">
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#1C315E]">
            Explore Your Book Library
          </h1>

          <div className="flex items-center gap-4 mt-1">
            <div className="relative w-[120px] lg:w-[140px]">
              <select className="block appearance-none w-full bg-[#B2DDFF] border border-[#2E90FA] text-[#2E90FA] text-sm lg:text-base font-semibold py-1.5 lg:py-2 px-4 lg:px-5 pr-8 rounded-lg leading-tight focus:outline-none">
                <option>9th Class</option>
                <option>10th Class</option>
                <option>11th Class</option>
                <option>12th Class</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="#2E90FA"
                  className="w-4 lg:w-5 h-4 lg:h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <button className="w-[120px] lg:w-[162px] px-2 py-2 text-nowrap flex items-center justify-center gap-1 bg-[#2e90fa] hover:bg-[#2e90fa]/90 text-white text-xs lg:text-base font-semibold rounded-lg">
              <FaPlus className="w-2.5 h-2.5" />
              Add New Book
            </button>
          </div>
        </div>

        {/* Book Carousel */}
        <div className="relative top-10 w-full flex items-center justify-center">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={prevSlide}
            className="group absolute -left-2 lg:left-0 2xl:left-2 z-20 flex justify-center items-center bg-white hover:bg-[#2E90FA] shadow-lg rounded-full size-[30px] lg:size-[35px] xl:size-[37px] 2xl:size-[44px]"
          >
            <FaChevronLeft className="size-3.5 2xl:size-4 text-[#344054] group-hover:text-[#fff]" />
          </button>

          {/* Books Container */}
          <div className="relative right-2 flex items-center justify-center space-x-4 perspective-1000">
            {books?.map((book: any, index) => {
              const position =
                (index - currentIndex + books.length) % books.length;
              let transform = "";
              let zIndex = 0;
              let scale = 1;
              let opacity = 1;

              if (position === 0) {
                // Center book
                transform = "translateX(0) rotateY(0deg)";
                zIndex = 30;
                scale = 1.1;
              } else if (position === 1) {
                // Right book
                transform = "translateX(90%) rotateY(-25deg)";
                zIndex = 20;
                scale = 1;
                opacity = 1;
              } else if (position === books.length - 1) {
                // Left book
                transform = "translateX(-90%) rotateY(25deg)";
                zIndex = 20;
                scale = 0.9;
                opacity = 1;
              } else if (position === 2) {
                // Far right
                transform = "translateX(150%) rotateY(-45deg)";
                zIndex = 10;
                scale = 0.8;
                opacity = 1;
              } else if (position === books.length - 2) {
                // Far left
                transform = "translateX(-150%) rotateY(45deg)";
                zIndex = 10;
                scale = 0.7;
                opacity = 1;
              } else {
                // Hidden books
                transform = "translateX(300px) rotateY(-60deg)";
                zIndex = 0;
                scale = 0.5;
                opacity = 1;
              }

              return (
                <div
                  // href={"/student/book-library/book-performance"}
                  onClick={() => {
                    if (position === 0) {
                      sessionStorage.setItem("bookData", JSON.stringify(book));
                      router.push("/student/book-library/book-performance");
                    }
                  }}
                  key={index}
                  className={`block absolute ${
                    position === 0 ? "cursor-pointer" : ""
                  } transition-all duration-500 ease-in-out`}
                  style={{
                    transform: `${transform} scale(${scale})`,
                    zIndex,
                    opacity,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative h-[180px] w-[20vw] md:h-[300px] lg:w-[22vw] lg:h-[360px] 2xl:w-[18vw] 2xl:h-[450px] rounded-lg overflow-hidden shadow-2xl">
                    <Image
                      src={book.coverImageUrl || "/placeholder.svg"}
                      alt={book.title}
                      fill
                      className="object-fill"
                    />
                    <div className="absolute inset-0 " />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold text-sm line-clamp-2">
                        {book.subject}
                      </h3>
                      <p className="text-white/80 text-xs">{book.class}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="group absolute -right-2 lg:right-0 2xl:right-2 z-10 flex justify-center items-center bg-white hover:bg-[#2E90FA] shadow-lg rounded-full size-[30px] lg:size-[35px] xl:size-[37px] 2xl:size-[44px]"
          >
            <FaChevronRight className="size-3.5 2xl:size-4 text-[#344054] group-hover:text-[#fff]" />
          </button>
        </div>

        {/* Spacer for layout */}
        <div className="h-32" />
      </div>
    </div>
  );
}
