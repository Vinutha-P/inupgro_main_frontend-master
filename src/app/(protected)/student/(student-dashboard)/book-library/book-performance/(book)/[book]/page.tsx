// "use client";

// import { useState, useCallback, useEffect, Suspense } from "react";
// import { use } from "react";
// import {
//   FiSearch,
//   FiX,
//   FiChevronDown,
//   FiChevronUp,
//   FiChevronLeft,
//   FiChevronRight,
//   FiChevronsLeft,
//   FiChevronsRight,
//   FiZoomIn,
//   FiZoomOut,
//   FiMaximize,
//   FiMinimize,
//   FiHome,
//   FiMenu,
// } from "react-icons/fi";
// import { ErrorBoundary } from "react-error-boundary";
// import { getBookById, BookMeta, ChapterMeta } from "@/utils/data/books/book-data";
// import PdfViewer from "@/components/book-reader/PdfViewer";
// import { debounce } from "lodash";
// import dynamic from "next/dynamic";

// // Dynamically import react-pageflip to avoid SSR issues
// const PageFlip = dynamic(() => import("react-pageflip"), { ssr: false });

// // Error fallback component
// const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
//   return (
//     <div className="error-container">
//       <h2>Error Loading Book</h2>
//       <p>{error.message || "Something went wrong. Please try again."}</p>
//       <button onClick={resetErrorBoundary} className="retry-btn">
//         Retry
//       </button>
//       <style jsx>{`
//         .error-container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           height: 100vh;
//           background: #f5f5f5;
//           color: #333;
//           text-align: center;
//           padding: 20px;
//         }
//         h2 {
//           font-size: 24px;
//           margin-bottom: 10px;
//         }
//         p {
//           font-size: 16px;
//           margin-bottom: 20px;
//         }
//         .retry-btn {
//           background: #007bff;
//           color: #fff;
//           border: none;
//           padding: 10px 20px;
//           border-radius: 4px;
//           cursor: pointer;
//           font-size: 16px;
//         }
//         .retry-btn:hover {
//           background: #0056b3;
//         }
//       `}</style>
//     </div>
//   );
// };

// interface BookPage {
//   id: number;
//   content: string;
//   title?: string;
// }

// interface Book {
//   title: string;
//   subtitle: string;
//   standard: string;
//   coverPage: BookPage;
//   chapters: ChapterMeta[];
//   totalPages: number;
//   pdfUrl: string;
// }

// interface RealisticPageTurnerProps {
//   params: Promise<{ book: string }>;
// }

// const generateCoverPage = (book: BookMeta): BookPage => ({
//   id: 0,
//   content: "cover",
//   title: "Cover Page",
// });

// export default function RealisticPageTurner({ params }: RealisticPageTurnerProps) {
//   const resolvedParams = use(params);
//   const bookData = getBookById(resolvedParams.book);

//   if (!bookData) {
//     return (
//       <div className="error-container">
//         <h2>Book Not Found</h2>
//         <p>The requested book could not be found.</p>
//         <a href="/student/book-library" className="retry-btn">
//           Back to Library
//         </a>
//         <style jsx>{`
//           .error-container {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             height: 100vh;
//             background: #f5f5f5;
//             color: #333;
//             text-align: center;
//             padding: 20px;
//           }
//           h2 {
//             font-size: 24px;
//             margin-bottom: 10px;
//           }
//           p {
//             font-size: 16px;
//             margin-bottom: 20px;
//           }
//           .retry-btn {
//             background: #007bff;
//             color: #fff;
//             border: none;
//             padding: 10px 20px;
//             border-radius: 4px;
//             text-decoration: none;
//             font-size: 16px;
//           }
//           .retry-btn:hover {
//             background: #0056b3;
//           }
//         `}</style>
//       </div>
//     );
//   }

//   // State
//   const [book] = useState<Book>({
//     title: bookData.title,
//     subtitle: bookData.subtitle || "",
//     standard: bookData.standard || "",
//     coverPage: generateCoverPage(bookData),
//     chapters: bookData.chapters,
//     totalPages: Math.max(...bookData.chapters.map((ch) => ch.endPage)),
//     pdfUrl: bookData.pdfUrl,
//   });
//   const [currentPage, setCurrentPage] = useState(0);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [chapters, setChapters] = useState(book.chapters);
//   const [zoomLevel, setZoomLevel] = useState(1);
//   const [showTOC, setShowTOC] = useState(true);
//   const [showToolbar, setShowToolbar] = useState(false);
//   const [dimensions, setDimensions] = useState({ width: 400, height: 600 });

//   // Audio for page turn
//   const pageTurnSound = typeof Audio !== "undefined" ? new Audio("/sounds/page-turn.mp3") : null;

//   // Calculate responsive dimensions
//   const updateDimensions = useCallback(() => {
//     if (typeof window === "undefined") return;
//     const vw = window.innerWidth;
//     const vh = window.innerHeight;
//     const aspectRatio = 2 / 3; // Page width:height ratio
//     let pageWidth = vw * 0.9; // 90% of viewport width for single page
//     let pageHeight = pageWidth / aspectRatio;
//     if (pageHeight > vh * 0.9) {
//       pageHeight = vh * 0.9;
//       pageWidth = pageHeight * aspectRatio;
//     }
//     if (isFullscreen) {
//       pageWidth = Math.min(vw / 2, pageWidth); // Two pages in fullscreen
//     }
//     setDimensions({ width: Math.round(pageWidth), height: Math.round(pageHeight) });
//   }, [isFullscreen]);

//   // Handle window resize
//   useEffect(() => {
//     updateDimensions();
//     const handleResize = debounce(updateDimensions, 100);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [updateDimensions]);

//   // Handle fullscreen toggle
//   const toggleFullscreen = useCallback(() => {
//     if (!isFullscreen) {
//       document.documentElement.requestFullscreen().catch((err) => console.error("Fullscreen error:", err));
//       setIsFullscreen(true);
//       setShowTOC(false);
//       setShowToolbar(false);
//       if (currentPage === 0) setCurrentPage(1);
//       // Disable scroll
//       document.body.style.overflow = "hidden";
//     } else {
//       document.exitFullscreen().catch((err) => console.error("Exit fullscreen error:", err));
//       setIsFullscreen(false);
//       setShowToolbar(false);
//       // Re-enable scroll
//       document.body.style.overflow = "";
//     }
//     updateDimensions();
//   }, [isFullscreen, currentPage, updateDimensions]);

//   // Sync fullscreen state with browser
//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       if (!document.fullscreenElement) {
//         setIsFullscreen(false);
//         setShowToolbar(false);
//         document.body.style.overflow = "";
//       }
//     };
//     document.addEventListener("fullscreenchange", handleFullscreenChange);
//     return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
//   }, []);

//   // Toggle chapter
//   const toggleChapter = useCallback((chapterId: string) => {
//     setChapters((prev) =>
//       prev.map((chapter) =>
//         chapter.id === chapterId ? { ...chapter, expanded: !chapter.expanded } : chapter
//       )
//     );
//   }, []);

//   // Navigation handlers
//   const goToPage = useCallback(
//     debounce((pageNumber: number) => {
//       if (pageNumber >= 0 && pageNumber <= book.totalPages) {
//         setCurrentPage(pageNumber);
//         if (pageTurnSound) {
//           pageTurnSound.play().catch((err) => console.error("Audio play error:", err));
//         }
//       }
//     }, 100),
//     [book.totalPages, pageTurnSound]
//   );

//   const nextPage = useCallback(() => {
//     if (isFullscreen) {
//       if (currentPage < book.totalPages - 1) {
//         goToPage(currentPage + 2);
//       }
//     } else {
//       if (currentPage < book.totalPages) {
//         goToPage(currentPage + 1);
//       }
//     }
//   }, [isFullscreen, currentPage, book.totalPages, goToPage]);

//   const prevPage = useCallback(() => {
//     if (isFullscreen) {
//       if (currentPage > 1) {
//         goToPage(currentPage - 2);
//       }
//     } else {
//       if (currentPage > 0) {
//         goToPage(currentPage - 1);
//       }
//     }
//   }, [isFullscreen, currentPage, goToPage]);

//   const zoomIn = useCallback(() => {
//     setZoomLevel((prev) => Math.min(prev + 0.25, 3));
//   }, []);

//   const zoomOut = useCallback(() => {
//     setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
//   }, []);

//   const goToChapterPage = useCallback(
//     (pageNumber: number) => {
//       goToPage(pageNumber);
//     },
//     [goToPage]
//   );

//   // Handle PageFlip page change
//   const handlePageFlip = (e: { data: number }) => {
//     setCurrentPage(e.data);
//     if (pageTurnSound) {
//       pageTurnSound.play().catch((err) => console.error("Audio play error:", err));
//     }
//   };

//   return (
//     <ErrorBoundary FallbackComponent={ErrorFallback}>
//       <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
//         <div className={`book-reader ${isFullscreen ? "fullscreen dark-theme" : ""}`}>
//           {!isFullscreen && (
//             <button
//               className="toggle-toc-btn"
//               onClick={() => setShowTOC(!showTOC)}
//               aria-label="Toggle table of contents"
//             >
//               {showTOC ? <FiX size={20} /> : <FiMenu size={20} />}
//             </button>
//           )}

//           {!isFullscreen && showTOC && (
//             <div className="sidebar">
//               <div className="sidebar-header">
//                 <h2 className="sidebar-title">Table of Contents</h2>
//                 <button
//                   className="close-btn"
//                   onClick={() => setShowTOC(false)}
//                   aria-label="Close sidebar"
//                 >
//                   <FiX size={20} />
//                 </button>
//               </div>
//               <div className="search-container">
//                 <FiSearch size={18} className="search-icon" />
//                 <input
//                   type="text"
//                   placeholder="Search chapters..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="search-input"
//                   aria-label="Search chapters"
//                 />
//               </div>
//               <div className="navigation">
//                 <div
//                   className="nav-item"
//                   onClick={() => goToPage(0)}
//                   role="button"
//                   tabIndex={0}
//                   onKeyDown={(e) => e.key === "Enter" && goToPage(0)}
//                   aria-label="Go to cover page"
//                 >
//                   Cover Page
//                 </div>
//                 {chapters.map((chapter) => (
//                   <div key={chapter.id} className="chapter-item">
//                     <button
//                       className="chapter-header"
//                       onClick={() => toggleChapter(chapter.id)}
//                       aria-label={`Toggle chapter ${chapter.title}`}
//                       aria-expanded={chapter.expanded}
//                     >
//                       <span>{chapter.title}</span>
//                       {chapter.expanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
//                     </button>
//                     {chapter.expanded && chapter.subChapters && (
//                       <div className="sub-chapters">
//                         {chapter.subChapters.map((subChapter) => (
//                           <div
//                             key={subChapter.id}
//                             className="sub-chapter"
//                             onClick={() => goToChapterPage(subChapter.startPage)}
//                             role="button"
//                             tabIndex={0}
//                             onKeyDown={(e) => e.key === "Enter" && goToChapterPage(subChapter.startPage)}
//                             aria-label={`Go to ${subChapter.title}`}
//                           >
//                             {subChapter.title}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="main-content">
//             {isFullscreen && (
//               <div
//                 className={`toolbar ${showToolbar ? "visible" : ""}`}
//                 onMouseEnter={() => setShowToolbar(true)}
//                 onMouseLeave={() => setShowToolbar(false)}
//               >
//                 <div className="toolbar-left">
//                   <button
//                     className="toolbar-btn"
//                     onClick={() => goToPage(0)}
//                     aria-label="Go to home"
//                   >
//                     <FiHome size={18} />
//                   </button>
//                   <button
//                     className="toolbar-btn"
//                     onClick={() => setShowTOC(true)}
//                     aria-label="Toggle sidebar"
//                   >
//                     <FiMenu size={18} />
//                   </button>
//                 </div>
//                 <div className="toolbar-center">
//                   <button
//                     className="nav-btn"
//                     onClick={() => goToPage(0)}
//                     disabled={currentPage === 0}
//                     aria-label="Go to first page"
//                   >
//                     <FiChevronsLeft size={18} />
//                   </button>
//                   <button
//                     className="nav-btn"
//                     onClick={prevPage}
//                     disabled={currentPage <= 1}
//                     aria-label="Previous page"
//                   >
//                     <FiChevronLeft size={18} />
//                   </button>
//                   <div className="page-info">
//                     Page {currentPage} of {book.totalPages}
//                   </div>
//                   <button
//                     className="nav-btn"
//                     onClick={nextPage}
//                     disabled={currentPage >= book.totalPages - 1}
//                     aria-label="Next page"
//                   >
//                     <FiChevronRight size={18} />
//                   </button>
//                   <button
//                     className="nav-btn"
//                     onClick={() => goToPage(book.totalPages)}
//                     disabled={currentPage >= book.totalPages - 1}
//                     aria-label="Go to last page"
//                   >
//                     <FiChevronsRight size={18} />
//                   </button>
//                 </div>
//                 <div className="toolbar-right">
//                   <div className="zoom-controls">
//                     <button
//                       className="toolbar-btn"
//                       onClick={zoomOut}
//                       disabled={zoomLevel <= 0.5}
//                       aria-label="Zoom out"
//                     >
//                       <FiZoomOut size={18} />
//                     </button>
//                     <div className="zoom-level">{Math.round(zoomLevel * 100)}%</div>
//                     <button
//                       className="toolbar-btn"
//                       onClick={zoomIn}
//                       disabled={zoomLevel >= 3}
//                       aria-label="Zoom in"
//                     >
//                       <FiZoomIn size={18} />
//                     </button>
//                   </div>
//                   <button
//                     className="toolbar-btn"
//                     onClick={toggleFullscreen}
//                     aria-label="Exit fullscreen"
//                   >
//                     <FiMinimize size={18} />
//                   </button>
//                 </div>
//               </div>
//             )}

//             <div className="content-area" onClick={() => isFullscreen && setShowToolbar(!showToolbar)}>
//               <div className="book-container">
//                 {!isFullscreen ? (
//                   <div className="single-page">
//                     {currentPage === 0 ? (
//                       <div className="cover-page">
//                         <h1>{book.title}</h1>
//                         {book.subtitle && <h2>{book.subtitle}</h2>}
//                         {book.standard && <p>{book.standard}</p>}
//                         <button
//                           className="fullscreen-btn"
//                           onClick={toggleFullscreen}
//                           aria-label="Enter fullscreen"
//                         >
//                           <FiMaximize size={18} /> Fullscreen
//                         </button>
//                       </div>
//                     ) : (
//                       <Suspense fallback={<div className="loading">Loading page...</div>}>
//                         <ErrorBoundary FallbackComponent={ErrorFallback}>
//                           <PdfViewer
//                             pdfUrl={book.pdfUrl}
//                             pageNumber={currentPage}
//                             width={dimensions.width * zoomLevel}
//                           />
//                         </ErrorBoundary>
//                       </Suspense>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="realistic-book">
//                     <PageFlip
//                       width={dimensions.width}
//                       height={dimensions.height}
//                       size="fixed"
//                       minWidth={200}
//                       maxWidth={dimensions.width}
//                       minHeight={300}
//                       maxHeight={dimensions.height}
//                       showCover={true}
//                       mobileScrollSupport={false}
//                       flippingTime={600}
//                       onFlip={handlePageFlip}
//                       page={currentPage}
//                       style={{ margin: "0 auto" }}
//                     >
//                       {Array.from({ length: book.totalPages + 1 }, (_, index) => (
//                         <div key={index} className="page-content">
//                           {index === 0 ? (
//                             <div className="cover-page">
//                               <h1>{book.title}</h1>
//                               {book.subtitle && <h2>{book.subtitle}</h2>}
//                               {book.standard && <p>{book.standard}</p>}
//                             </div>
//                           ) : (
//                             <Suspense fallback={<div className="loading">Loading page...</div>}>
//                               <ErrorBoundary FallbackComponent={ErrorFallback}>
//                                 <PdfViewer
//                                   pdfUrl={book.pdfUrl}
//                                   pageNumber={index}
//                                   width={dimensions.width * zoomLevel}
//                                 />
//                               </ErrorBoundary>
//                             </Suspense>
//                           )}
//                         </div>
//                       ))}
//                     </PageFlip>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {!isFullscreen && (
//               <div className="bottom-nav">
//                 <div className="book-info">
//                   {book.title} - Page {currentPage} of {book.totalPages}
//                 </div>
//                 <div className="nav-controls">
//                   <button
//                     className="nav-btn"
//                     onClick={() => goToPage(0)}
//                     disabled={currentPage === 0}
//                     aria-label="Go to first page"
//                   >
//                     <FiChevronsLeft size={18} />
//                   </button>
//                   <button
//                     className="nav-btn"
//                     onClick={prevPage}
//                     disabled={currentPage === 0}
//                     aria-label="Previous page"
//                   >
//                     <FiChevronLeft size={18} />
//                   </button>
//                   <button
//                     className="nav-btn"
//                     onClick={nextPage}
//                     disabled={currentPage >= book.totalPages}
//                     aria-label="Next page"
//                   >
//                     <FiChevronRight size={18} />
//                   </button>
//                   <button
//                     className="nav-btn"
//                     onClick={() => goToPage(book.totalPages)}
//                     disabled={currentPage >= book.totalPages}
//                     aria-label="Go to last page"
//                   >
//                     <FiChevronsRight size={18} />
//                   </button>
//                 </div>
//                 <div className="action-controls">
//                   <button
//                     className="nav-btn"
//                     onClick={zoomIn}
//                     disabled={zoomLevel >= 3}
//                     aria-label="Zoom in"
//                   >
//                     <FiZoomIn size={18} />
//                   </button>
//                   <button
//                     className="nav-btn"
//                     onClick={zoomOut}
//                     disabled={zoomLevel <= 0.5}
//                     aria-label="Zoom out"
//                   >
//                     <FiZoomOut size={18} />
//                   </button>
//                   <button
//                     className="nav-btn"
//                     onClick={toggleFullscreen}
//                     aria-label="Enter fullscreen"
//                   >
//                     <FiMaximize size={18} />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           <style jsx>{`
//             .book-reader {
//               display: flex;
//               height: 100vh;
//               background: #f5f5f5;
//               font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//             }
//             .book-reader.fullscreen {
//               background: #1a1a1a;
//             }
//             .book-reader.fullscreen .main-content {
//               margin-left: 0 !important;
//             }
//             .toggle-toc-btn {
//               position: fixed;
//               top: 20px;
//               left: 20px;
//               z-index: 20;
//               background: #fff;
//               border: 1px solid #ddd;
//               border-radius: 4px;
//               padding: 8px;
//               cursor: pointer;
//             }
//             .toggle-toc-btn:hover {
//               background: #f0f0f0;
//             }
//             .sidebar {
//               width: 250px;
//               background: #fff;
//               border-right: 1px solid #ddd;
//               display: flex;
//               flex-direction: column;
//               transition: transform 0.3s ease;
//               transform: translateX(${showTOC ? '0' : '-100%'});
//               z-index: 10;
//             }
//             .sidebar-header {
//               display: flex;
//               justify-content: space-between;
//               align-items: center;
//               padding: 15px;
//               border-bottom: 1px solid #ddd;
//             }
//             .sidebar-title {
//               font-size: 18px;
//               font-weight: 600;
//               color: #333;
//             }
//             .close-btn {
//               background: none;
//               border: none;
//               cursor: pointer;
//               padding: 5px;
//             }
//             .search-container {
//               padding: 15px;
//               border-bottom: 1px solid #ddd;
//               position: relative;
//             }
//             .search-input {
//               width: 100%;
//               padding: 8px 8px 8px 30px;
//               border: 1px solid #ddd;
//               border-radius: 4px;
//               font-size: 14px;
//             }
//             .search-icon {
//               position: absolute;
//               left: 25px;
//               top: 50%;
//               transform: translateY(-50%);
//               color: #666;
//             }
//             .navigation {
//               flex: 1;
//               overflow-y: auto;
//               padding: 15px;
//             }
//             .nav-item {
//               padding: 10px;
//               cursor: pointer;
//               border-radius: 4px;
//             }
//             .nav-item:hover {
//               background: #f0f0f0;
//             }
//             .chapter-item {
//               margin-bottom: 10px;
//             }
//             .chapter-header {
//               width: 100%;
//               display: flex;
//               justify-content: space-between;
//               padding: 10px;
//               background: none;
//               border: none;
//               cursor: pointer;
//               border-radius: 4px;
//             }
//             .chapter-header:hover {
//               background: #f0f0f0;
//             }
//             .sub-chapters {
//               padding-left: 20px;
//             }
//             .sub-chapter {
//               padding: 8px;
//               cursor: pointer;
//               border-radius: 4px;
//             }
//             .sub-chapter:hover {
//               background: #f0f0f0;
//             }
//             .main-content {
//               flex: 1;
//               display: flex;
//               flex-direction: column;
//               margin-left: ${showTOC && !isFullscreen ? '250px' : '0'};
//               transition: margin-left 0.3s ease;
//             }
//             .toolbar {
//               display: flex;
//               justify-content: space-between;
//               align-items: center;
//               background: rgba(40, 40, 40, 0.9);
//               color: #fff;
//               padding: 10px;
//               border-bottom: 1px solid #444;
//               position: absolute;
//               top: 0;
//               left: 0;
//               right: 0;
//               opacity: 0;
//               transform: translateY(-100%);
//               transition: opacity 0.3s, transform 0.3s;
//               z-index: 10;
//             }
//             .toolbar.visible {
//               opacity: 1;
//               transform: translateY(0);
//             }
//             .toolbar-left,
//             .toolbar-center,
//             .toolbar-right {
//               display: flex;
//               align-items: center;
//               gap: 10px;
//             }
//             .toolbar-btn,
//             .nav-btn {
//               background: none;
//               border: none;
//               padding: 8px;
//               cursor: pointer;
//               border-radius: 4px;
//               color: #fff;
//             }
//             .toolbar-btn:hover,
//             .nav-btn:hover:not(:disabled) {
//               background: rgba(255, 255, 255, 0.1);
//             }
//             .toolbar-btn:disabled,
//             .nav-btn:disabled {
//               color: #666;
//               cursor: not-allowed;
//             }
//             .zoom-controls {
//               display: flex;
//               align-items: center;
//               gap: 5px;
//             }
//             .zoom-level {
//               font-size: 14px;
//               color: #fff;
//               width: 40px;
//               text-align: center;
//             }
//             .page-info {
//               font-size: 14px;
//               color: #fff;
//             }
//             .content-area {
//               flex: 1;
//               display: flex;
//               justify-content: center;
//               align-items: center;
//               background: ${isFullscreen ? '#1a1a1a' : '#e0e0e0'};
//               overflow: hidden;
//             }
//             .book-container {
//               width: 100%;
//               height: 100%;
//               display: flex;
//               justify-content: center;
//               align-items: center;
//             }
//             .single-page {
//               background: #fff;
//               border: 1px solid #ddd;
//               border-radius: 4px;
//               width: ${dimensions.width}px;
//               height: ${dimensions.height}px;
//               margin: 0 auto;
//               display: flex;
//               justify-content: center;
//               align-items: center;
//             }
//             .cover-page {
//               text-align: center;
//               padding: 20px;
//               width: 100%;
//               height: 100%;
//               display: flex;
//               flex-direction: column;
//               justify-content: center;
//               color: ${isFullscreen ? '#fff' : '#333'};
//             }
//             .cover-page h1 {
//               font-size: 24px;
//               margin-bottom: 10px;
//             }
//             .cover-page h2 {
//               font-size: 18px;
//               color: ${isFullscreen ? '#ccc' : '#666'};
//               margin-bottom: 10px;
//             }
//             .cover-page p {
//               font-size: 16px;
//               color: ${isFullscreen ? '#fff' : '#333'};
//               margin-bottom: 20px;
//             }
//             .fullscreen-btn {
//               background: #007bff;
//               color: #fff;
//               border: none;
//               padding: 10px 20px;
//               border-radius: 4px;
//               cursor: pointer;
//               display: flex;
//               align-items: center;
//               gap: 5px;
//             }
//             .fullscreen-btn:hover {
//               background: #0056b3;
//             }
//             .realistic-book {
//               width: 100%;
//               height: 100%;
//               display: flex;
//               justify-content: center;
//               align-items: center;
//             }
//             .page-content {
//               background: #fff;
//               border: 1px solid #ddd;
//               width: ${dimensions.width}px;
//               height: ${dimensions.height}px;
//               overflow: hidden;
//             }
//             .bottom-nav {
//               display: flex;
//               justify-content: space-between;
//               align-items: center;
//               background: #fff;
//               padding: 10px;
//               border-top: 1px solid #ddd;
//             }
//             .book-info {
//               font-size: 14px;
//               color: #333;
//             }
//             .nav-controls,
//             .action-controls {
//               display: flex;
//               gap: 10px;
//             }
//             .loading-spinner,
//             .loading {
//               display: flex;
//               justify-content: center;
//               align-items: center;
//               height: 100%;
//               font-size: 16px;
//               color: ${isFullscreen ? '#fff' : '#666'};
//             }
//           `}</style>
//         </div>
//       </Suspense>
//     </ErrorBoundary>
//   );
// }

// "use client"

// import React, { useState, useEffect, useRef, useCallback } from "react"
// import HTMLFlipBook from "react-pageflip"
// import { Document, Page, pdfjs } from "react-pdf"
// import {
//   FiArrowLeft,
//   FiChevronLeft,
//   FiChevronRight,
//   FiZoomIn,
//   FiZoomOut,
//   FiMaximize,
//   FiBookmark,
//   FiSkipBack,
//   FiSkipForward,
//   FiMinimize,
//   FiBook,
//   FiFileText,
//   FiChevronDown,
//   FiEye,
//   FiList,
// } from "react-icons/fi"
// import { BiBookOpen } from "react-icons/bi"
// import { AiOutlineLoading3Quarters } from "react-icons/ai"
// import { GiBookshelf } from "react-icons/gi"
// import { IoLibraryOutline } from "react-icons/io5"

// // Set up PDF.js worker
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

// // Types
// interface ChapterMeta {
//   id: string
//   title: string
//   startPage: number
//   endPage: number
//   subChapters?: ChapterMeta[]
//   expanded?: boolean
// }

// interface BookMeta {
//   id: string
//   title: string
//   subtitle?: string
//   standard?: string
//   pdfUrl: string
//   coverImageUrl?: string
//   chapters: ChapterMeta[]
//   totalPages?: number
//   color?: string
// }

// interface SubjectBinder {
//   id: string
//   title: string
//   books: BookMeta[]
//   coverImageUrl?: string
//   color?: string
// }

// // Book Data
// const mathBinder: SubjectBinder = {
//   id: "mathematics",
//   title: "MATHEMATICS",
//   color: "#E74C3C",
//   coverImageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=420&fit=crop",
//   books: [
//     {
//       id: "math-algebra",
//       title: "Algebra Fundamentals",
//       subtitle: "Basic Concepts & Equations",
//       standard: "GRADE 10",
//       pdfUrl: "/pdfs/sample1.pdf",
//       coverImageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=420&fit=crop",
//       totalPages: 24,
//       color: "#E74C3C",
//       chapters: [
//         {
//           id: "math-ch01",
//           title: "Chapter 1: Variables & Expressions",
//           startPage: 1,
//           endPage: 8,
//           subChapters: [
//             { id: "math-s0101", title: "1.1 Introduction to Variables", startPage: 1, endPage: 4 },
//             { id: "math-s0102", title: "1.2 Algebraic Expressions", startPage: 5, endPage: 8 },
//           ],
//           expanded: true,
//         },
//         {
//           id: "math-ch02",
//           title: "Chapter 2: Solving Equations",
//           startPage: 9,
//           endPage: 16,
//           expanded: false,
//         },
//         {
//           id: "math-ch03",
//           title: "Chapter 3: Inequalities",
//           startPage: 17,
//           endPage: 24,
//           expanded: false,
//         },
//       ],
//     },
//     {
//       id: "math-geometry",
//       title: "Geometry Basics",
//       subtitle: "Shapes & Measurements",
//       standard: "GRADE 10",
//       pdfUrl: "/pdfs/sample2.pdf",
//       coverImageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=420&fit=crop",
//       totalPages: 20,
//       color: "#3498DB",
//       chapters: [
//         {
//           id: "geo-ch01",
//           title: "Chapter 1: Points & Lines",
//           startPage: 1,
//           endPage: 6,
//           expanded: true,
//         },
//         {
//           id: "geo-ch02",
//           title: "Chapter 2: Triangles",
//           startPage: 7,
//           endPage: 14,
//           expanded: false,
//         },
//         {
//           id: "geo-ch03",
//           title: "Chapter 3: Circles",
//           startPage: 15,
//           endPage: 20,
//           expanded: false,
//         },
//       ],
//     },
//     {
//       id: "math-trigonometry",
//       title: "Trigonometry",
//       subtitle: "Angles & Functions",
//       standard: "GRADE 10",
//       pdfUrl: "/pdfs/sample3.pdf",
//       coverImageUrl: "https://images.unsplash.com/photo-1635070041544-40d35b9d22e7?w=300&h=420&fit=crop",
//       totalPages: 18,
//       color: "#9B59B6",
//       chapters: [
//         {
//           id: "trig-ch01",
//           title: "Chapter 1: Angles & Triangles",
//           startPage: 1,
//           endPage: 6,
//           expanded: true,
//         },
//         {
//           id: "trig-ch02",
//           title: "Chapter 2: Sine & Cosine",
//           startPage: 7,
//           endPage: 12,
//           expanded: false,
//         },
//         {
//           id: "trig-ch03",
//           title: "Chapter 3: Applications",
//           startPage: 13,
//           endPage: 18,
//           expanded: false,
//         },
//       ],
//     },
//     {
//       id: "math-calculus",
//       title: "Calculus Introduction",
//       subtitle: "Limits & Derivatives",
//       standard: "GRADE 11",
//       pdfUrl: "/pdfs/sample4.pdf",
//       coverImageUrl: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?w=300&h=420&fit=crop",
//       totalPages: 22,
//       color: "#27AE60",
//       chapters: [
//         {
//           id: "calc-ch01",
//           title: "Chapter 1: Limits",
//           startPage: 1,
//           endPage: 8,
//           expanded: true,
//         },
//         {
//           id: "calc-ch02",
//           title: "Chapter 2: Derivatives",
//           startPage: 9,
//           endPage: 16,
//           expanded: false,
//         },
//         {
//           id: "calc-ch03",
//           title: "Chapter 3: Applications",
//           startPage: 17,
//           endPage: 22,
//           expanded: false,
//         },
//       ],
//     },
//     {
//       id: "math-statistics",
//       title: "Statistics & Probability",
//       subtitle: "Data Analysis",
//       standard: "GRADE 10",
//       pdfUrl: "/pdfs/sample5.pdf",
//       coverImageUrl: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=300&h=420&fit=crop",
//       totalPages: 16,
//       color: "#F39C12",
//       chapters: [
//         {
//           id: "stat-ch01",
//           title: "Chapter 1: Data Collection",
//           startPage: 1,
//           endPage: 5,
//           expanded: true,
//         },
//         {
//           id: "stat-ch02",
//           title: "Chapter 2: Probability",
//           startPage: 6,
//           endPage: 10,
//           expanded: false,
//         },
//         {
//           id: "stat-ch03",
//           title: "Chapter 3: Statistical Analysis",
//           startPage: 11,
//           endPage: 16,
//           expanded: false,
//         },
//       ],
//     },
//   ],
// }

// // Custom Components
// const Button = ({
//   children,
//   onClick,
//   disabled = false,
//   variant = "default",
//   size = "md",
//   className = "",
// }: {
//   children: React.ReactNode
//   onClick?: () => void
//   disabled?: boolean
//   variant?: "default" | "ghost" | "primary" | "secondary"
//   size?: "sm" | "md" | "lg"
//   className?: string
// }) => {
//   const baseClasses =
//     "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"

//   const variants = {
//     default: "bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500",
//     ghost: "bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900",
//     primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
//     secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
//   }

//   const sizes = {
//     sm: "px-3 py-1.5 text-sm",
//     md: "px-4 py-2 text-sm",
//     lg: "px-6 py-3 text-base",
//   }

//   const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"

//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
//     >
//       {children}
//     </button>
//   )
// }

// const Input = ({
//   value,
//   onChange,
//   placeholder,
//   className = "",
//   type = "text",
//   disabled = false,
// }: {
//   value: string
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
//   placeholder?: string
//   className?: string
//   type?: string
//   disabled?: boolean
// }) => {
//   return (
//     <input
//       type={type}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       disabled={disabled}
//       className={`px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
//         disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
//       } ${className}`}
//     />
//   )
// }

// const Slider = ({
//   value,
//   onChange,
//   min = 0,
//   max = 100,
//   step = 1,
//   className = "",
// }: {
//   value: number
//   onChange: (value: number) => void
//   min?: number
//   max?: number
//   step?: number
//   className?: string
// }) => {
//   return (
//     <input
//       type="range"
//       min={min}
//       max={max}
//       step={step}
//       value={value}
//       onChange={(e) => onChange(Number(e.target.value))}
//       className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider ${className}`}
//       style={{
//         background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`,
//       }}
//     />
//   )
// }

// const Badge = ({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "secondary" }) => {
//   const variants = {
//     default: "bg-blue-100 text-blue-800",
//     secondary: "bg-gray-100 text-gray-800",
//   }

//   return (
//     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
//       {children}
//     </span>
//   )
// }

// // Book Page Component
// const BookPage = React.forwardRef(
//   (
//     {
//       pageNumber,
//       pdfUrl,
//       isEven,
//       width,
//       height,
//     }: {
//       pageNumber: number
//       pdfUrl: string
//       isEven: boolean
//       width: number
//       height: number
//     },
//     ref: React.ForwardedRef<HTMLDivElement>,
//   ) => {
//     return (
//       <div
//         ref={ref}
//         className={`page ${isEven ? "page-even" : "page-odd"}`}
//         style={{ width: `${width}px`, height: `${height}px` }}
//       >
//         <div className="page-content">
//           <Document file={pdfUrl} loading={<div className="page-loading">Loading...</div>}>
//             <Page
//               pageNumber={pageNumber}
//               width={width - 20}
//               height={height - 20}
//               renderTextLayer={false}
//               renderAnnotationLayer={false}
//               loading={
//                 <div className="flex items-center justify-center h-full">
//                   <AiOutlineLoading3Quarters className="animate-spin text-gray-400 h-8 w-8" />
//                 </div>
//               }
//             />
//           </Document>
//           <div className="page-number">{pageNumber}</div>
//         </div>
//       </div>
//     )
//   },
// )

// BookPage.displayName = "BookPage"

// // Cover Page Component
// const CoverPage = React.forwardRef(
//   (
//     {
//       book,
//       width,
//       height,
//       isFront = true,
//     }: {
//       book: BookMeta
//       width: number
//       height: number
//       isFront?: boolean
//     },
//     ref: React.ForwardedRef<HTMLDivElement>,
//   ) => {
//     return (
//       <div
//         ref={ref}
//         className={`page ${isFront ? "page-cover-front" : "page-cover-back"}`}
//         style={{ width: `${width}px`, height: `${height}px` }}
//       >
//         <div
//           className="page-content cover-content"
//           style={{
//             backgroundColor: book.color || "#3498DB",
//             backgroundImage: isFront ? `url(${book.coverImageUrl})` : "none",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           {isFront ? (
//             <div className="cover-overlay">
//               <h1 className="cover-title">{book.title}</h1>
//               {book.subtitle && <h2 className="cover-subtitle">{book.subtitle}</h2>}
//               {book.standard && <div className="cover-grade">{book.standard}</div>}
//             </div>
//           ) : (
//             <div className="back-cover-content">
//               <div className="back-cover-logo">
//                 <BiBookOpen size={40} />
//               </div>
//               <p className="back-cover-text">End of Book</p>
//             </div>
//           )}
//         </div>
//       </div>
//     )
//   },
// )

// CoverPage.displayName = "CoverPage"

// // Main Component
// export default function RealisticBookReader() {
//   // State Management
//   const [view, setView] = useState<"library" | "bookshelf" | "reader">("library")
//   const [selectedBinder, setSelectedBinder] = useState<SubjectBinder | null>(null)
//   const [selectedBook, setSelectedBook] = useState<BookMeta | null>(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [currentPage, setCurrentPage] = useState(0) // 0 is cover
//   const [numPages, setNumPages] = useState(0)
//   const [scale, setScale] = useState(1)
//   const [isFullscreen, setIsFullscreen] = useState(false)
//   const [showTOC, setShowTOC] = useState(false)
//   const [bookmarks, setBookmarks] = useState<number[]>([])
//   const [pageInput, setPageInput] = useState("1")
//   const [isLoading, setIsLoading] = useState(false)
//   const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set())
//   const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })

//   // Refs
//   const readerRef = useRef<HTMLDivElement>(null)
//   const bookRef = useRef<any>(null)

//   // Calculate book dimensions based on window size
//   const getBookDimensions = () => {
//     const aspectRatio = 1.4 // Height/Width ratio for the book
//     const maxWidth = windowSize.width * 0.85
//     const maxHeight = windowSize.height * 0.8

//     let width = maxWidth
//     let height = width * aspectRatio

//     if (height > maxHeight) {
//       height = maxHeight
//       width = height / aspectRatio
//     }

//     // Each page is half the book width
//     return {
//       bookWidth: width,
//       bookHeight: height,
//       pageWidth: width / 2,
//       pageHeight: height,
//     }
//   }

//   const { bookWidth, bookHeight, pageWidth, pageHeight } = getBookDimensions()

//   // Effects
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       })
//     }

//     window.addEventListener("resize", handleResize)
//     handleResize()

//     return () => window.removeEventListener("resize", handleResize)
//   }, [])

//   useEffect(() => {
//     if (selectedBook) {
//       setNumPages(selectedBook.totalPages || 0)
//       setCurrentPage(0) // Reset to cover
//       setPageInput("1")
//       const expanded = new Set(selectedBook.chapters.filter((ch) => ch.expanded).map((ch) => ch.id))
//       setExpandedChapters(expanded)
//     }
//   }, [selectedBook])

//   // Handlers
//   const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
//     setNumPages(numPages)
//     setIsLoading(false)
//   }, [])

//   const handlePageChange = useCallback(
//     (newPageNumber: number) => {
//       if (newPageNumber >= 0 && newPageNumber <= numPages + 1) {
//         // +1 for back cover
//         setCurrentPage(newPageNumber)
//         setPageInput(newPageNumber === 0 ? "Cover" : newPageNumber.toString())

//         // Flip to the page in the book
//         if (bookRef.current) {
//           // For even pages, we need to go to page/2 rounded up
//           // For odd pages, we need to go to (page+1)/2 rounded down
//           const flipToPage = Math.floor((newPageNumber + 1) / 2)
//           bookRef.current.pageFlip().turnToPage(flipToPage)
//         }
//       }
//     },
//     [numPages],
//   )

//   const handlePageInputSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (pageInput.toLowerCase() === "cover") {
//       handlePageChange(0)
//     } else {
//       const page = Number.parseInt(pageInput)
//       if (!isNaN(page)) {
//         handlePageChange(page)
//       }
//     }
//   }

//   const toggleBookmark = () => {
//     setBookmarks((prev) =>
//       prev.includes(currentPage) ? prev.filter((p) => p !== currentPage) : [...prev, currentPage],
//     )
//   }

//   const toggleFullscreen = () => {
//     if (!document.fullscreenElement) {
//       readerRef.current?.requestFullscreen()
//       setIsFullscreen(true)
//     } else {
//       document.exitFullscreen()
//       setIsFullscreen(false)
//     }
//   }

//   const toggleChapter = (chapterId: string) => {
//     setExpandedChapters((prev) => {
//       const newSet = new Set(prev)
//       if (newSet.has(chapterId)) {
//         newSet.delete(chapterId)
//       } else {
//         newSet.add(chapterId)
//       }
//       return newSet
//     })
//   }

//   const isCurrentChapter = (chapter: ChapterMeta) => {
//     return currentPage >= chapter.startPage && currentPage <= chapter.endPage
//   }

//   const handleFlip = (e: any) => {
//     // e.data contains the page number (0-based)
//     // We need to convert it to our page numbering system
//     // Page 0 is cover, pages 1-N are content
//     const flipPage = e.data
//     if (flipPage === 0) {
//       setCurrentPage(0) // Cover
//       setPageInput("Cover")
//     } else {
//       // Each flip has 2 pages (left and right)
//       const leftPage = flipPage * 2 - 1
//       setCurrentPage(leftPage)
//       setPageInput(leftPage.toString())
//     }
//   }

//   // Library View
//   if (view === "library") {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//         <div className="container mx-auto px-6 py-12">
//           {/* Header */}
//           <div className="text-center mb-16">
//             <div className="flex items-center justify-center mb-6">
//               <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-2xl">
//                 <IoLibraryOutline className="text-4xl text-white" />
//               </div>
//             </div>
//             <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
//               Digital Library
//             </h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//               Experience reading like a real physical book with page turning animations and realistic book design
//             </p>
//           </div>

//           {/* Subject Binders */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             <div
//               className="cursor-pointer transition-all duration-500 hover:scale-105"
//               onClick={() => {
//                 setSelectedBinder(mathBinder)
//                 setView("bookshelf")
//               }}
//             >
//               <div className="relative h-96 rounded-2xl shadow-xl overflow-hidden group">
//                 {/* Binder Cover */}
//                 <div
//                   className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700"
//                   style={{ backgroundImage: "url('/textures/leather-texture.png')", backgroundBlendMode: "multiply" }}
//                 >
//                   <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
//                     <GiBookshelf className="text-6xl mb-6" />
//                     <h2 className="text-4xl font-bold text-center mb-2">MATHEMATICS</h2>
//                     <p className="text-xl opacity-90 mb-4">Complete Collection</p>
//                     <div className="text-sm opacity-75">Contains 5 Books</div>

//                     {/* Spine Detail */}
//                     <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-red-900 to-red-700 flex items-center justify-center">
//                       <div className="transform -rotate-90 whitespace-nowrap text-sm font-bold tracking-widest opacity-80">
//                         MATHEMATICS
//                       </div>
//                     </div>

//                     {/* Book Thickness */}
//                     <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-red-900 to-red-800">
//                       {Array.from({ length: 20 }).map((_, i) => (
//                         <div
//                           key={i}
//                           className="h-1 w-full bg-red-200 opacity-10 mt-1"
//                           style={{ marginTop: `${i * 4 + 10}px` }}
//                         ></div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Hover Overlay */}
//                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
//                   <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
//                     <Button variant="primary" size="lg" className="shadow-lg">
//                       <FiEye className="mr-2" /> Open Bookshelf
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-4 text-center">
//                 <h3 className="text-xl font-bold text-gray-800">Mathematics Collection</h3>
//                 <p className="text-gray-600">Grade 10 Complete Series</p>
//               </div>
//             </div>

//             {/* More subject binders would go here */}
//             <div className="cursor-not-allowed opacity-60">
//               <div className="relative h-96 rounded-2xl shadow-xl overflow-hidden">
//                 {/* Binder Cover */}
//                 <div
//                   className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700"
//                   style={{ backgroundImage: "url('/textures/leather-texture.png')", backgroundBlendMode: "multiply" }}
//                 >
//                   <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
//                     <GiBookshelf className="text-6xl mb-6" />
//                     <h2 className="text-4xl font-bold text-center mb-2">SCIENCE</h2>
//                     <p className="text-xl opacity-90 mb-4">Complete Collection</p>
//                     <div className="text-sm opacity-75">Contains 4 Books</div>

//                     {/* Spine Detail */}
//                     <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center">
//                       <div className="transform -rotate-90 whitespace-nowrap text-sm font-bold tracking-widest opacity-80">
//                         SCIENCE
//                       </div>
//                     </div>

//                     {/* Book Thickness */}
//                     <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-blue-900 to-blue-800">
//                       {Array.from({ length: 15 }).map((_, i) => (
//                         <div
//                           key={i}
//                           className="h-1 w-full bg-blue-200 opacity-10 mt-1"
//                           style={{ marginTop: `${i * 4 + 10}px` }}
//                         ></div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-4 text-center">
//                 <h3 className="text-xl font-bold text-gray-800">Science Collection</h3>
//                 <p className="text-gray-600">Coming Soon</p>
//               </div>
//             </div>

//             <div className="cursor-not-allowed opacity-60">
//               <div className="relative h-96 rounded-2xl shadow-xl overflow-hidden">
//                 {/* Binder Cover */}
//                 <div
//                   className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-700"
//                   style={{ backgroundImage: "url('/textures/leather-texture.png')", backgroundBlendMode: "multiply" }}
//                 >
//                   <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
//                     <GiBookshelf className="text-6xl mb-6" />
//                     <h2 className="text-4xl font-bold text-center mb-2">ENGLISH</h2>
//                     <p className="text-xl opacity-90 mb-4">Complete Collection</p>
//                     <div className="text-sm opacity-75">Contains 3 Books</div>

//                     {/* Spine Detail */}
//                     <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-green-900 to-green-700 flex items-center justify-center">
//                       <div className="transform -rotate-90 whitespace-nowrap text-sm font-bold tracking-widest opacity-80">
//                         ENGLISH
//                       </div>
//                     </div>

//                     {/* Book Thickness */}
//                     <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-green-900 to-green-800">
//                       {Array.from({ length: 12 }).map((_, i) => (
//                         <div
//                           key={i}
//                           className="h-1 w-full bg-green-200 opacity-10 mt-1"
//                           style={{ marginTop: `${i * 4 + 10}px` }}
//                         ></div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-4 text-center">
//                 <h3 className="text-xl font-bold text-gray-800">English Collection</h3>
//                 <p className="text-gray-600">Coming Soon</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Bookshelf View
//   if (view === "bookshelf" && selectedBinder) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
//         <div className="container mx-auto px-6 py-8">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-10">
//             <Button
//               variant="ghost"
//               onClick={() => setView("library")}
//               className="flex items-center text-gray-700 hover:text-gray-900"
//             >
//               <FiArrowLeft className="mr-2" /> Back to Library
//             </Button>
//             <h1 className="text-3xl font-bold text-center text-gray-800">{selectedBinder.title} Bookshelf</h1>
//             <div className="w-24"></div> {/* Spacer for centering */}
//           </div>

//           {/* Bookshelf */}
//           <div className="relative">
//             {/* Shelf Background */}
//             <div className="absolute inset-x-0 top-[85%] h-8 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-md shadow-lg"></div>

//             {/* Books */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
//               {selectedBinder.books.map((book) => (
//                 <div
//                   key={book.id}
//                   className="cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-2"
//                   onClick={() => {
//                     setSelectedBook(book)
//                     setView("reader")
//                   }}
//                 >
//                   <div className="relative">
//                     {/* Book */}
//                     <div
//                       className="relative h-80 rounded-r-md rounded-b-md shadow-xl overflow-hidden book-on-shelf"
//                       style={{
//                         backgroundColor: book.color || "#3498DB",
//                         backgroundImage: `url(${book.coverImageUrl})`,
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                       }}
//                     >
//                       {/* Book Spine */}
//                       <div
//                         className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r"
//                         style={{
//                           backgroundImage: `linear-gradient(to right, ${book.color}99, ${book.color})`,
//                         }}
//                       >
//                         <div className="h-full flex items-center justify-center">
//                           <div
//                             className="transform -rotate-90 whitespace-nowrap text-sm font-bold tracking-wider text-white"
//                             style={{ width: "200px", textAlign: "center" }}
//                           >
//                             {book.title}
//                           </div>
//                         </div>
//                       </div>

//                       {/* Book Cover Overlay */}
//                       <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent">
//                         <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
//                           <h3 className="text-xl font-bold mb-1 drop-shadow-md">{book.title}</h3>
//                           {book.subtitle && <p className="text-sm opacity-90 drop-shadow-md">{book.subtitle}</p>}
//                         </div>
//                       </div>

//                       {/* Book Thickness */}
//                       <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-gray-800 to-gray-600">
//                         {Array.from({ length: book.totalPages || 10 }).map((_, i) => (
//                           <div
//                             key={i}
//                             className="h-0.5 w-full bg-gray-300 opacity-20"
//                             style={{ marginTop: `${i * 3 + 5}px` }}
//                           ></div>
//                         ))}
//                       </div>

//                       {/* Book Grade Badge */}
//                       {book.standard && (
//                         <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-bold text-gray-800">
//                           {book.standard}
//                         </div>
//                       )}
//                     </div>

//                     {/* Book Shadow */}
//                     <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/20 to-transparent rounded-b-md"></div>
//                   </div>

//                   {/* Book Info */}
//                   <div className="mt-4 text-center">
//                     <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
//                     <p className="text-gray-600 text-sm">{book.chapters.length} chapters</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Additional Shelves */}
//             <div className="absolute inset-x-0 top-[calc(85%+120px)] h-8 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-md shadow-lg opacity-60"></div>
//             <div className="absolute inset-x-0 top-[calc(85%+240px)] h-8 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-md shadow-lg opacity-40"></div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Book Reader View
//   if (view === "reader" && selectedBook) {
//     // Calculate total pages including covers
//     const totalPages = selectedBook.totalPages || 0
//     const totalPagesWithCovers = totalPages + 2 // Front and back cover

//     // Generate array of pages for the book
//     const pages = []

//     // Add front cover
//     pages.push(<CoverPage key="front-cover" book={selectedBook} width={pageWidth} height={pageHeight} isFront={true} />)

//     // Add content pages
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(
//         <BookPage
//           key={`page-${i}`}
//           pageNumber={i}
//           pdfUrl={selectedBook.pdfUrl}
//           isEven={i % 2 === 0}
//           width={pageWidth}
//           height={pageHeight}
//         />,
//       )
//     }

//     // Add back cover
//     pages.push(<CoverPage key="back-cover" book={selectedBook} width={pageWidth} height={pageHeight} isFront={false} />)

//     return (
//       <div ref={readerRef} className="min-h-screen bg-[#f0ead6] flex flex-col">
//         {/* Header */}
//         <div className="bg-[#2c3e50] text-white px-6 py-3 flex items-center justify-between shadow-lg">
//           <div className="flex items-center space-x-4">
//             <Button
//               variant="ghost"
//               onClick={() => setView("bookshelf")}
//               className="text-white hover:bg-[#34495e] flex items-center space-x-2"
//             >
//               <FiArrowLeft className="h-4 w-4" />
//               <span>Bookshelf</span>
//             </Button>
//             <Button
//               variant="ghost"
//               onClick={() => setShowTOC(!showTOC)}
//               className="text-white hover:bg-[#34495e] flex items-center space-x-2"
//             >
//               <FiList className="h-4 w-4" />
//               <span>Contents</span>
//             </Button>
//           </div>

//           <div className="flex-1 max-w-md mx-6 text-center">
//             <h1 className="text-lg font-bold truncate">{selectedBook.title}</h1>
//             {selectedBook.subtitle && <p className="text-sm text-gray-300 truncate">{selectedBook.subtitle}</p>}
//           </div>

//           <div className="flex items-center space-x-3">
//             <Button
//               variant="ghost"
//               onClick={toggleBookmark}
//               className={`text-white hover:bg-[#34495e] ${bookmarks.includes(currentPage) ? "text-yellow-400" : ""}`}
//             >
//               <FiBookmark className="h-4 w-4" />
//             </Button>
//             <Button variant="ghost" onClick={toggleFullscreen} className="text-white hover:bg-[#34495e]">
//               {isFullscreen ? <FiMinimize className="h-4 w-4" /> : <FiMaximize className="h-4 w-4" />}
//             </Button>
//           </div>
//         </div>

//         <div className="flex flex-1 overflow-hidden">
//           {/* Table of Contents Sidebar */}
//           {showTOC && (
//             <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto shadow-xl">
//               <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#2c3e50] to-[#34495e] text-white">
//                 <h2 className="font-bold text-xl mb-2 flex items-center">
//                   <FiFileText className="h-5 w-5 mr-2" />
//                   Table of Contents
//                 </h2>
//                 <p className="text-sm opacity-90">{selectedBook.title}</p>
//                 {selectedBook.standard && <p className="text-xs opacity-75 mt-1">{selectedBook.standard}</p>}
//               </div>

//               <div className="p-4">
//                 <div className="space-y-2">
//                   {selectedBook.chapters.map((chapter) => (
//                     <div key={chapter.id} className="space-y-1">
//                       <div
//                         className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 ${
//                           isCurrentChapter(chapter)
//                             ? "bg-[#ecf0f1] text-[#2c3e50] shadow-md border border-[#bdc3c7]"
//                             : "hover:bg-gray-100 text-gray-700 hover:shadow-sm"
//                         }`}
//                         onClick={() => handlePageChange(chapter.startPage)}
//                       >
//                         <div className="flex items-center flex-1 min-w-0">
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             className="p-0 h-auto mr-3 hover:bg-transparent"
//                             onClick={(e) => {
//                               e?.stopPropagation()
//                               toggleChapter(chapter.id)
//                             }}
//                           >
//                             {chapter.subChapters && chapter.subChapters.length > 0 ? (
//                               expandedChapters.has(chapter.id) ? (
//                                 <FiChevronDown className="h-4 w-4" />
//                               ) : (
//                                 <FiChevronRight className="h-4 w-4" />
//                               )
//                             ) : (
//                               <FiBook className="h-4 w-4" />
//                             )}
//                           </Button>
//                           <span className="text-sm font-medium truncate">{chapter.title}</span>
//                         </div>
//                         <span className="text-xs opacity-75 ml-2 bg-black/10 px-2 py-1 rounded-lg">
//                           {chapter.startPage}-{chapter.endPage}
//                         </span>
//                       </div>

//                       {/* Sub-chapters */}
//                       {chapter.subChapters && expandedChapters.has(chapter.id) && (
//                         <div className="ml-6 space-y-1">
//                           {chapter.subChapters.map((subChapter) => (
//                             <div
//                               key={subChapter.id}
//                               className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200 ${
//                                 currentPage >= subChapter.startPage && currentPage <= subChapter.endPage
//                                   ? "bg-[#edf3f6] text-[#2c3e50] shadow-sm"
//                                   : "hover:bg-gray-50 text-gray-600"
//                               }`}
//                               onClick={() => handlePageChange(subChapter.startPage)}
//                             >
//                               <div className="flex items-center flex-1 min-w-0">
//                                 <FiBook className="h-3 w-3 mr-2 opacity-60" />
//                                 <span className="text-xs truncate">{subChapter.title}</span>
//                               </div>
//                               <span className="text-xs opacity-60 ml-2 bg-black/10 px-1 py-0.5 rounded">
//                                 {subChapter.startPage}-{subChapter.endPage}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="p-4 border-t border-gray-200 bg-gray-50">
//                 <div className="text-xs text-gray-600 space-y-2">
//                   <div className="flex justify-between items-center">
//                     <span>Current Page:</span>
//                     <span className="font-semibold text-[#2c3e50]">
//                       {currentPage === 0 ? "Cover" : currentPage.toString()}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span>Total Pages:</span>
//                     <span className="font-semibold text-[#2c3e50]">{totalPages}</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span>Bookmarks:</span>
//                     <span className="font-semibold text-[#2c3e50]">{bookmarks.length}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Main Content - Book */}
//           <div className="flex-1 flex flex-col">
//             {/* Book Container */}
//             <div className="flex-1 overflow-auto bg-[#e8e0d0] flex items-center justify-center p-6">
//               <div
//                 className="book-container"
//                 style={{
//                   transform: `scale(${scale})`,
//                   transition: "transform 0.3s ease",
//                 }}
//               >
//                 {/* Book with page flip */}
//                 <HTMLFlipBook
//                   width={pageWidth}
//                   height={pageHeight}
//                   size="stretch"
//                   minWidth={pageWidth * 0.5}
//                   maxWidth={pageWidth * 1.5}
//                   minHeight={pageHeight * 0.5}
//                   maxHeight={pageHeight * 1.5}
//                   maxShadowOpacity={0.5}
//                   showCover={true}
//                   mobileScrollSupport={true}
//                   onFlip={handleFlip}
//                   className="book"
//                   ref={bookRef}
//                   style={{ boxShadow: "0 30px 50px rgba(0,0,0,0.3)" }}
//                 >
//                   {pages}
//                 </HTMLFlipBook>

//                 {/* Book Shadow */}
//                 <div
//                   className="book-shadow"
//                   style={{
//                     width: `${bookWidth * 0.9}px`,
//                     height: `${bookHeight * 0.05}px`,
//                     borderRadius: "50%",
//                     background: "rgba(0,0,0,0.3)",
//                     position: "absolute",
//                     bottom: "-30px",
//                     left: "50%",
//                     transform: "translateX(-50%)",
//                     filter: "blur(15px)",
//                   }}
//                 ></div>
//               </div>
//             </div>

//             {/* Bottom Controls */}
//             <div className="bg-[#2c3e50] text-white px-6 py-3 border-t border-[#34495e]">
//               <div className="flex items-center justify-between">
//                 {/* Left Controls */}
//                 <div className="flex items-center space-x-2">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => handlePageChange(0)}
//                     disabled={currentPage === 0}
//                     className="text-white hover:bg-[#34495e] disabled:opacity-50"
//                   >
//                     <FiSkipBack className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
//                     disabled={currentPage === 0}
//                     className="text-white hover:bg-[#34495e] disabled:opacity-50"
//                   >
//                     <FiChevronLeft className="h-4 w-4" />
//                   </Button>
//                 </div>

//                 {/* Center - Page Navigation */}
//                 <div className="flex items-center space-x-4">
//                   <form onSubmit={handlePageInputSubmit} className="flex items-center space-x-2">
//                     <Input
//                       value={pageInput}
//                       onChange={(e) => setPageInput(e.target.value)}
//                       className="w-20 h-9 text-center bg-[#34495e] border-[#4a6278] text-white text-sm"
//                     />
//                     <span className="text-sm text-gray-300">/ {totalPages}</span>
//                   </form>
//                 </div>

//                 {/* Right Controls */}
//                 <div className="flex items-center space-x-2">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => handlePageChange(Math.min(totalPagesWithCovers - 1, currentPage + 1))}
//                     disabled={currentPage === totalPagesWithCovers - 1}
//                     className="text-white hover:bg-[#34495e] disabled:opacity-50"
//                   >
//                     <FiChevronRight className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => handlePageChange(totalPagesWithCovers - 1)}
//                     disabled={currentPage === totalPagesWithCovers - 1}
//                     className="text-white hover:bg-[#34495e] disabled:opacity-50"
//                   >
//                     <FiSkipForward className="h-4 w-4" />
//                   </Button>

//                   <div className="w-px h-6 bg-[#4a6278] mx-3" />

//                   {/* Zoom Controls */}
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setScale(Math.max(0.5, scale - 0.1))}
//                     className="text-white hover:bg-[#34495e]"
//                   >
//                     <FiZoomOut className="h-4 w-4" />
//                   </Button>
//                   <div className="w-24">
//                     <Slider value={scale} onChange={setScale} min={0.5} max={1.5} step={0.1} className="w-full" />
//                   </div>
//                   <span className="text-xs text-gray-300 w-12">{Math.round(scale * 100)}%</span>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setScale(Math.min(1.5, scale + 0.1))}
//                     className="text-white hover:bg-[#34495e]"
//                   >
//                     <FiZoomIn className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Fallback
//   return <div>Loading...</div>
// }

import BookReader from "../../../../../../../../components/book-reader/BookReader";

export default function Page() {
  return (
    <div className="w-full h-full pt-5">
      <BookReader />
      
    </div>
  );
}
