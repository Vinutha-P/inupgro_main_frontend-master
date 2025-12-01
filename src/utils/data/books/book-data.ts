import type { Book } from "@/types";
import book1 from "@/assets/book1.png";
import book2 from "@/assets/book2.png";
import book3 from "@/assets/book3.png";
import book4 from "@/assets/book4.png";
import book5 from "@/assets/book5.png";

export interface ChapterMeta {
  id: string;
  title: string;
  startPage: number;
  endPage: number;
  subChapters?: any;
  expanded?: boolean;
}

export interface BookMeta {
  id: string;
  title: string;
  subtitle?: string;
  standard?: string;
  pdfUrl: string;
  coverImageUrl?: string;
  chapters: any;
  coverPage: any;
}

export const booksData: Record<string, any> = {
  mathematics: {
    id: "mathematics",
    title: "MATHEMATICS",
    subtitle: "Advanced Concepts",
    standard: "GRADE 10",
    pdfUrl: "/pdfs/sample1.pdf",
    coverImageUrl: book1?.src,
    coverPage: {
      id: 0,
      pageNumber: 0,
      title: "Cover Page",
    },
    chapters: [
      {
        id: "chapter01",
        title: "Chapter 01 - Number System",
        pages: [1, 2],
        subChapters: [
          { id: "number-system", title: "Real Numbers", pages: [1, 2] },
          {
            id: "irrational-numbers",
            title: "Irrational Numbers",
            pages: [3, 4],
          },
        ],
        expanded: true,
      },
      {
        id: "chapter02",
        title: "Chapter 02 - Polynomials",
        pages: [5, 6],
        subChapters: [
          {
            id: "polynomials-intro",
            title: "Introduction to Polynomials",
            pages: [5],
          },
          {
            id: "polynomials-operations",
            title: "Operations on Polynomials",
            pages: [6],
          },
        ],
        expanded: true,
      },
      {
        id: "chapter03",
        title: "Chapter 03 - Coordinate Geometry",
        pages: [7, 8],
        subChapters: [
          {
            id: "coordinate-geometry",
            title: "Cartesian System",
            pages: [7, 8],
          },
        ],
        expanded: false,
      },
      {
        id: "chapter04",
        title: "Chapter 04 - Linear Equations",
        pages: [9, 10],
        subChapters: [
          {
            id: "linear-equations",
            title: "Linear Equations in Two Variables",
            pages: [9, 10],
          },
        ],
        expanded: false,
      },
    ],
    totalPages: 50,
  },


  science: {
    id: "science",
    title: "GENERAL SCIENCE",
    subtitle: "Explorations & Discoveries",
    standard: "GRADE 9",
    pdfUrl: "/pdfs/science.pdf",
    coverImageUrl: book2?.src,
   chapters: [
      {
        id: "chapter01",
        title: "Chapter 01 - Number System",
        pages: [1, 2],
        subChapters: [
          { id: "number-system", title: "Real Numbers", pages: [1, 2] },
          {
            id: "irrational-numbers",
            title: "Irrational Numbers",
            pages: [3, 4],
          },
        ],
        expanded: true,
      },
      {
        id: "chapter02",
        title: "Chapter 02 - Polynomials",
        pages: [5, 6],
        subChapters: [
          {
            id: "polynomials-intro",
            title: "Introduction to Polynomials",
            pages: [5],
          },
          {
            id: "polynomials-operations",
            title: "Operations on Polynomials",
            pages: [6],
          },
        ],
        expanded: true,
      },
      {
        id: "chapter03",
        title: "Chapter 03 - Coordinate Geometry",
        pages: [7, 8],
        subChapters: [
          {
            id: "coordinate-geometry",
            title: "Cartesian System",
            pages: [7, 8],
          },
        ],
        expanded: false,
      },
      {
        id: "chapter04",
        title: "Chapter 04 - Linear Equations",
        pages: [9, 10],
        subChapters: [
          {
            id: "linear-equations",
            title: "Linear Equations in Two Variables",
            pages: [9, 10],
          },
        ],
        expanded: false,
      },
    ],
    totalPages: 50,
  },
  english: {
    id: "english",
    title: "ENGLISH LITERATURE",
    subtitle: "Classic Short Stories",
    standard: "GRADE 11",
    pdfUrl: "/pdfs/english.pdf",
    coverImageUrl: book3?.src,
    chapters: [
      {
        id: "eng-ch01",
        title: "The Gift of the Magi",
        startPage: 1,
        endPage: 8,
        expanded: true,
      },
      {
        id: "eng-ch02",
        title: "The Tell-Tale Heart",
        startPage: 9,
        endPage: 15,
        expanded: false,
      },
    ],
  },
  history: {
    id: "history",
    title: "WORLD HISTORY",
    subtitle: "Ancient Civilizations",
    standard: "GRADE 8",
    pdfUrl: "/pdfs/physics.pdf",
    coverImageUrl: book4?.src,
    chapters: [
      {
        id: "hist-ch01",
        title: "Early Humans",
        startPage: 1,
        endPage: 12,
        expanded: true,
      },
    ],
  },
  politics: {
    id: "politics",
    title: "WORLD POLITICS",
    subtitle: "Ancient Politics",
    standard: "GRADE 8",
    pdfUrl: "/pdfs/economics.pdf",
    coverImageUrl: book5?.src,
    chapters: [
      {
        id: "pol-ch01",
        title: "Early Governance",
        startPage: 1,
        endPage: 12,
        expanded: true,
      },
    ],
  },
};

export const getBookById = (id: string): BookMeta | undefined => {
  return booksData[id];
};

export const getAllBooks = (): BookMeta[] => {
  return Object.values(booksData);
};

//  const playPageTurnSound = useCallback(() => {
//     if (soundEnabled && audioRef.current) {
//       audioRef.current.src = "/sounds/page-turn.wav"
//       audioRef.current.currentTime = 0
//       audioRef.current.play().catch(() => {
//       })
//     }
//   }, [soundEnabled])

// // Sample book data
// const sampleBook: Book = {
//   title: "MATHEMATICS",
//   subtitle: "Part-I",
//   standard: "STANDARD NINE",
//   coverPage: {
//     id: 0,
//     pageNumber: 0,
//     title: "Cover Page",
//   },
//   pdfUrl: "/pdfs/sample1.pdf",
//   chapters: [
//     {
//       id: "chapter01",
//       title: "Chapter 01 - Number System",
//       pages: [1, 2],
//       subChapters: [
//         { id: "number-system", title: "Real Numbers", pages: [1, 2] },
//         {
//           id: "irrational-numbers",
//           title: "Irrational Numbers",
//           pages: [3, 4],
//         },
//       ],
//       expanded: true,
//     },
//     {
//       id: "chapter02",
//       title: "Chapter 02 - Polynomials",
//       pages: [5, 6],
//       subChapters: [
//         {
//           id: "polynomials-intro",
//           title: "Introduction to Polynomials",
//           pages: [5],
//         },
//         {
//           id: "polynomials-operations",
//           title: "Operations on Polynomials",
//           pages: [6],
//         },
//       ],
//       expanded: true,
//     },
//     {
//       id: "chapter03",
//       title: "Chapter 03 - Coordinate Geometry",
//       pages: [7, 8],
//       subChapters: [
//         { id: "coordinate-geometry", title: "Cartesian System", pages: [7, 8] },
//       ],
//       expanded: false,
//     },
//     {
//       id: "chapter04",
//       title: "Chapter 04 - Linear Equations",
//       pages: [9, 10],
//       subChapters: [
//         {
//           id: "linear-equations",
//           title: "Linear Equations in Two Variables",
//           pages: [9, 10],
//         },
//       ],
//       expanded: false,
//     },
//   ],
//   totalPages: 100,
// };
