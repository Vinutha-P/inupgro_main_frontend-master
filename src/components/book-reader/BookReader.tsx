"use client";

import type React from "react";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import * as pdfjs from "pdfjs-dist";
import {
  FiSearch,
  FiX,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiZoomIn,
  FiZoomOut,
  FiDownload,
  FiMaximize,
  FiMinimize,
  FiHome,
  FiMenu,
  FiMove,
  FiVolume2,
  FiVolumeX,
  FiBookOpen,
  FiLayers,
  FiMoreHorizontal,
  FiSettings,
  FiGrid,
  FiCopy,
  FiArrowRight,
} from "react-icons/fi";
import { getAllBooks } from "../../utils/data/books/book-data";
import { usePathname } from "next/navigation";
import Image from "next/image";
import HTMLFlipBook from "react-pageflip";

// Set the PDF.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

// Book content structure
interface BookPage {
  id: number;
  pageNumber: number;
  title?: string;
}

interface Chapter {
  id: string;
  title: string;
  pages: number[];
  subChapters?: Chapter[];
  expanded?: boolean;
}

interface Book {
  title: string;
  subtitle: string;
  standard: string;
  coverPage: BookPage;
  coverImageUrl: string;
  pdfUrl: string;
  chapters: Chapter[];
  totalPages: number;
}

export default function EnhancedBookReader() {
  const books = getAllBooks();

  // Get last segment from Next.js router pathname
  const pathname = usePathname();
  const getLastPathSegment = (url: string) => {
    const segments = url.split("/").filter(Boolean);
    return segments[segments.length - 1] || "";
  };
  const lastSegment = getLastPathSegment(pathname || "");

  const foundBook = books.find((b: any) => {
    return b.id == lastSegment;
  });

  const [book, setBook] = useState<any>(foundBook);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [chapters, setChapters] = useState(book?.chapters);
  const [isAnimating, setIsAnimating] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showTOC, setShowTOC] = useState(true);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev" | null>(
    null
  );
  const [pdfDocument, setPdfDocument] = useState<pdfjs.PDFDocumentProxy | null>(
    null
  );
  const [totalPdfPages, setTotalPdfPages] = useState(0);
  const [currentSubject, setCurrentSubject] = useState("Mathematics");
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isGrabMode, setIsGrabMode] = useState(false);
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [forceRerender, setForceRerender] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [flipBookKey, setFlipBookKey] = useState(0); // Key to force re-render flipbook

  // Enhanced state for text selection and search
  const [selectedText, setSelectedText] = useState("");
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [searchResults, setSearchResults] = useState<
    { page: number; text: string; context: string }[]
  >([]);
  const [isSearching, setIsSearching] = useState(false);
  const [pageTextContent, setPageTextContent] = useState<Map<number, string>>(
    new Map()
  );
  const [textSelectionActive, setTextSelectionActive] = useState(false);
  const [renderedPages, setRenderedPages] = useState<Set<number>>(new Set());

  const bookRef = useRef<HTMLDivElement>(null);
  const canvasLeftRef = useRef<HTMLCanvasElement>(null);
  const canvasRightRef = useRef<HTMLCanvasElement>(null);
  const textLayerLeftRef = useRef<HTMLDivElement>(null);
  const textLayerRightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bookContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const flipBookRef = useRef<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("bookData");
    if (data) {
      setBook(JSON.parse(data));
    }
  }, []);

  const subjectPdfs = [{
    subject: book.title || "",
    url: book.pdfUrl || "",
    icon: "📖",
  }];

  // Enhanced responsive breakpoints
  const useResponsiveSize = () => {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
  };

  const { width: windowWidth, height: windowHeight } = useResponsiveSize();

  // Smart responsive logic
  const responsiveConfig = useMemo(() => {
    const isMobile = windowWidth < 640;
    const isTablet = windowWidth >= 640 && windowWidth < 1024;
    const isLaptop = windowWidth >= 1024 && windowWidth < 1440;
    const isDesktop = windowWidth >= 1440;

    const shouldShowTOC = isFullscreen ? showTOC : showTOC;
    const sidebarWidth = shouldShowTOC
      ? isMobile
        ? 280
        : isTablet
        ? 300
        : 320
      : 0;

    return {
      isMobile,
      isTablet,
      isLaptop,
      isDesktop,
      shouldShowTOC,
      sidebarWidth,
    };
  }, [windowWidth, windowHeight, showTOC, isFullscreen]);

  // Sound effect for page turn
  const playPageTurnSound = useCallback(() => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.src = "/sounds/page-turn.wav";
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, [soundEnabled]);

  // Calculate book thickness based on current page
  const getBookThickness = useCallback(() => {
    const progress = currentPage / Math.max(book?.totalPages, 1);
    const maxThickness = responsiveConfig.isMobile
      ? 12
      : responsiveConfig.isTablet
      ? 18
      : 25;
    return {
      left: Math.max(2, progress * maxThickness),
      right: Math.max(2, (1 - progress) * maxThickness),
    };
  }, [currentPage, book?.totalPages, responsiveConfig]);

  // UTILITY FUNCTION TO ESCAPE REGEX SPECIAL CHARACTERS
  const escapeRegExp = useCallback((string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }, []);

  // ADVANCED TEXT SELECTION HANDLER WITH BETTER ACCURACY
  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }

    const selectedText = selection.toString().trim();
    if (!selectedText) {
      return;
    }

    // Check if selection is from our text layers with better detection
    let isFromPdfTextLayer = false;
    let selectionFromCorrectLayer = false;

    for (let i = 0; i < selection.rangeCount; i++) {
      const range = selection.getRangeAt(i);
      const container = range.commonAncestorContainer;

      // More precise detection of PDF text layer
      let node: Node | null = container;
      while (node) {
        if (
          node === textLayerLeftRef.current ||
          node === textLayerRightRef.current ||
          (node.nodeType === Node.ELEMENT_NODE &&
            ((node as Element).classList.contains("textLayer") ||
              (node as Element).classList.contains("pdf-text-layer-accurate") ||
              (node as Element).closest(".textLayer") ||
              (node as Element).closest(".pdf-text-layer-accurate")))
        ) {
          isFromPdfTextLayer = true;
          selectionFromCorrectLayer = true;
          break;
        }
        node = node.parentNode;
      }
    }

    if (
      isFromPdfTextLayer &&
      selectionFromCorrectLayer &&
      selectedText.length > 0
    ) {
      console.log("✅ Accurate text selected from PDF:", selectedText);
      setSelectedText(selectedText);
      setSearchTerm(selectedText);

      // Auto-open search panel
      if (!showSearchPanel) {
        setShowSearchPanel(true);
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }

      // Show visual feedback
      setTextSelectionActive(true);
      setTimeout(() => setTextSelectionActive(false), 2000);
    }
  }, [showSearchPanel]);

  // Text selection event listeners with debouncing
  useEffect(() => {
    let selectionTimeout: NodeJS.Timeout;

    const handleSelectionChange = () => {
      clearTimeout(selectionTimeout);
      selectionTimeout = setTimeout(handleTextSelection, 50);
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      clearTimeout(selectionTimeout);
    };
  }, [handleTextSelection]);

  // ADVANCED PDF RENDERING WITH PRECISE TEXT LAYER USING PDF.js TextLayerBuilder
  const renderPage = useCallback(
    async (
      pageNumber: number,
      canvas: HTMLCanvasElement | null,
      textLayerDiv: HTMLDivElement | null
    ) => {
      if (
        !pdfDocument ||
        !canvas ||
        pageNumber < 1 ||
        pageNumber > totalPdfPages
      ) {
        return;
      }

      try {
        const page = await pdfDocument.getPage(pageNumber);
        const containerWidth = canvas.parentElement?.clientWidth || 400;
        const containerHeight = canvas.parentElement?.clientHeight || 600;

        const pageViewport = page.getViewport({ scale: 1 });
        const scaleX = containerWidth / pageViewport.width;
        const scaleY = containerHeight / pageViewport.height;
        const scale = Math.min(scaleX, scaleY, 2) * zoomLevel;

        const viewport = page.getViewport({ scale });

        // Set canvas dimensions
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        const context = canvas.getContext("2d")!;
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        // Clear and render PDF
        context.clearRect(0, 0, canvas.width, canvas.height);
        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        // Mark this page as rendered
        setRenderedPages((prev) => new Set(prev).add(pageNumber));
      } catch (error) {
        console.error(`Error rendering page ${pageNumber}:`, error);
      }
    },
    [pdfDocument, totalPdfPages, zoomLevel]
  );

  // Function to render a page if not already rendered
  const ensurePageRendered = useCallback(
    async (pageNumber: number) => {
      if (!renderedPages.has(pageNumber)) {
        const isLeftPage = pageNumber % 2 === 1; // Odd pages are left pages
        await renderPage(
          pageNumber,
          isLeftPage ? canvasLeftRef.current : canvasRightRef.current,
          isLeftPage ? textLayerLeftRef.current : textLayerRightRef.current
        );
      }
    },
    [renderPage, renderedPages]
  );

  // Handle page changes in the flipbook
  const handlePageFlip = useCallback(
    async (e: { data: number }) => {
      const newPage = e.data * 2 + 1; // Convert to 1-based page number
      if (newPage !== currentPage) {
        setCurrentPage(newPage);
        playPageTurnSound();

        // Pre-render adjacent pages for smoother flipping
        await ensurePageRendered(newPage);
        if (newPage < totalPdfPages) {
          await ensurePageRendered(newPage + 1);
        }
        if (newPage > 1) {
          await ensurePageRendered(newPage - 1);
        }
      }
    },
    [currentPage, totalPdfPages, playPageTurnSound, ensurePageRendered]
  );

  // Flipbook page component
  const Page = useCallback(
    ({ pageNum }: { pageNum: number }) => {
      const pdfPageNum = pageNum + 1; // Convert to 1-based index
      const isLeftPage = pageNum % 2 === 0;
      const canvasRef = isLeftPage ? canvasLeftRef : canvasRightRef;
      const textLayerRef = isLeftPage ? textLayerLeftRef : textLayerRightRef;

      useEffect(() => {
        if (pdfPageNum <= totalPdfPages) {
          renderPage(pdfPageNum, canvasRef.current, textLayerRef.current);
        }
      }, [pdfPageNum, totalPdfPages, renderPage]);

      return (
        <div
          className={`relative w-full h-full flex items-center justify-center ${
            isLeftPage
              ? "bg-gradient-to-br from-white via-gray-50 to-white"
              : "bg-gradient-to-bl from-white via-gray-50 to-white"
          }`}
          style={{
            boxShadow: isLeftPage
              ? "inset -6px 0 12px -6px rgba(0,0,0,0.15), inset -2px 0 4px -2px rgba(0,0,0,0.05)"
              : "inset 6px 0 12px -6px rgba(0,0,0,0.15), inset 2px 0 4px -2px rgba(0,0,0,0.05)",
          }}
        >
          <div className="relative w-full h-full flex justify-center items-center p-4">
            <canvas
              ref={canvasRef}
              className="!w-full !h-full object-contain rounded"
              style={{
                filter: `
                  drop-shadow(0 20px 50px rgba(0,0,0,0.8))
                  contrast(1.05)
                  brightness(1.02)
                `,
              }}
            />
            <div
              ref={textLayerRef}
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-medium bg-white px-2 py-1 rounded shadow-lg border border-gray-200 transition-all duration-300 z-20">
            {pdfPageNum <= totalPdfPages ? pdfPageNum : ""}
          </div>
        </div>
      );
    },
    [totalPdfPages, renderPage]
  );

  // Load PDF document
  useEffect(() => {
    const loadPdf = async () => {
      setIsLoading(true);
      try {
        const currentPdf =
          subjectPdfs.find((pdf) => pdf.subject === currentSubject) ||
          subjectPdfs[0];

        setBook((prev:any) => ({
          ...prev,
          pdfUrl: currentPdf.url,
        }));

        const loadingTask = pdfjs.getDocument({
          url: currentPdf.url,
          cMapUrl: "/cmaps/",
          cMapPacked: true,
        });
        const pdf = await loadingTask.promise;

        setPdfDocument(pdf);
        setTotalPdfPages(pdf.numPages);

        setBook((prev:any) => ({
          ...prev,
          totalPages: pdf.numPages,
        }));

        console.log(`📚 PDF loaded: ${pdf.numPages} pages`);
      } catch (error) {
        console.error("❌ Error loading PDF:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPdf();
  }, [currentSubject]);

  // Enhanced page rendering
  useEffect(() => {
    if (!pdfDocument || isLoading) return;

    const renderPages = async () => {
      if (currentPage === 0) {
        // Clear for cover page
        if (canvasLeftRef.current) {
          const context = canvasLeftRef.current.getContext("2d");
          if (context) {
            context.clearRect(
              0,
              0,
              canvasLeftRef.current.width,
              canvasLeftRef.current.height
            );
          }
        }
        if (canvasRightRef.current) {
          const context = canvasRightRef.current.getContext("2d");
          if (context) {
            context.clearRect(
              0,
              0,
              canvasRightRef.current.width,
              canvasRightRef.current.height
            );
          }
        }
        if (textLayerLeftRef.current) {
          textLayerLeftRef.current.innerHTML = "";
        }
        if (textLayerRightRef.current) {
          textLayerRightRef.current.innerHTML = "";
        }
      } else {
        const delay = isTransitioning ? 300 : 100;
        setTimeout(async () => {
          console.log(
            `🔄 Rendering pages: ${currentPage} and ${currentPage + 1}`
          );
          await renderPage(
            currentPage,
            canvasLeftRef.current,
            textLayerLeftRef.current
          );
          if (currentPage < totalPdfPages) {
            await renderPage(
              currentPage + 1,
              canvasRightRef.current,
              textLayerRightRef.current
            );
          }
          setIsTransitioning(false);
        }, delay);
      }
    };

    renderPages();
  }, [
    currentPage,
    pdfDocument,
    isLoading,
    totalPdfPages,
    renderPage,
    isFullscreen,
    forceRerender,
    isTransitioning,
  ]);

  // ENHANCED SEARCH WITH PROPER REGEX ESCAPING
  const handleSearch = useCallback(async () => {
    if (!searchTerm || !pdfDocument) return;

    setIsSearching(true);
    const results: { page: number; text: string; context: string }[] = [];

    try {
      // Escape special regex characters to prevent syntax errors
      const escapedSearchTerm = escapeRegExp(searchTerm);

      // Search through all available page content
      for (const [pageNum, content] of pageTextContent.entries()) {
        if (content.toLowerCase().includes(searchTerm.toLowerCase())) {
          const index = content.toLowerCase().indexOf(searchTerm.toLowerCase());
          const start = Math.max(0, index - 50);
          const end = Math.min(content.length, index + searchTerm.length + 50);
          const context = content.substring(start, end);

          results.push({
            page: pageNum,
            text: searchTerm,
            context: context,
          });
        }
      }

      // If we don't have enough results, search more pages
      if (results.length < 10) {
        const pagesToSearch = Math.min(20, totalPdfPages);
        for (let i = 1; i <= pagesToSearch; i++) {
          if (pageTextContent.has(i)) continue;

          try {
            const page = await pdfDocument.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
              .map((item: any) => item.str)
              .join(" ")
              .replace(/\s+/g, " ")
              .trim();

            setPageTextContent((prev) => new Map(prev).set(i, pageText));

            if (pageText.toLowerCase().includes(searchTerm.toLowerCase())) {
              const index = pageText
                .toLowerCase()
                .indexOf(searchTerm.toLowerCase());
              const start = Math.max(0, index - 50);
              const end = Math.min(
                pageText.length,
                index + searchTerm.length + 50
              );
              const context = pageText.substring(start, end);

              results.push({
                page: i,
                text: searchTerm,
                context: context,
              });
            }

            if (results.length >= 10) break;
          } catch (error) {
            console.error(`Error searching page ${i}:`, error);
          }
        }
      }

      setSearchResults(results);
    } catch (error) {
      console.error("Error during search:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [searchTerm, pdfDocument, totalPdfPages, pageTextContent, escapeRegExp]);

  // Trigger search when search term changes
  useEffect(() => {
    if (searchTerm) {
      const debounceTimer = setTimeout(() => {
        handleSearch();
      }, 300);
      return () => clearTimeout(debounceTimer);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, handleSearch]);

  // Enhanced mouse/touch handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (zoomLevel > 1 || isGrabMode) {
        setIsDragging(true);
        setDragStart({
          x: e.clientX - panOffset.x,
          y: e.clientY - panOffset.y,
        });
        e.preventDefault();
      }
    },
    [zoomLevel, panOffset, isGrabMode]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging && (zoomLevel > 1 || isGrabMode)) {
        setPanOffset({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
        e.preventDefault();
      }
    },
    [isDragging, dragStart, zoomLevel, isGrabMode]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Fullscreen handlers
  const enterFullscreen = useCallback(async () => {
    try {
      setIsTransitioning(true);
      if (containerRef.current && containerRef.current.requestFullscreen) {
        await containerRef.current.requestFullscreen();
      }
    } catch (error) {
      console.error("Error entering fullscreen:", error);
      setIsTransitioning(false);
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    try {
      setIsTransitioning(true);
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Error exiting fullscreen:", error);
      setIsTransitioning(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;

      if (!isCurrentlyFullscreen && isFullscreen) {
        setIsFullscreen(false);
        setIsTransitioning(true);
        setTimeout(() => {
          setForceRerender((prev) => prev + 1);
          setTimeout(() => {
            setForceRerender((prev) => prev + 1);
          }, 100);
        }, 150);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [isFullscreen]);

  const changeSubject = (subject: string) => {
    setCurrentSubject(subject);
    setCurrentPage(0);
    setPanOffset({ x: 0, y: 0 });
    setZoomLevel(1);
    setPageTextContent(new Map());
    setSearchResults([]);
    setSelectedText("");
    setSearchTerm("");
  };

  const toggleChapter = (chapterId: string) => {
    setChapters((prev:any) =>
      prev.map((chapter:any) =>
        chapter.id === chapterId
          ? { ...chapter, expanded: !chapter.expanded }
          : chapter
      )
    );
  };

  const goToPage = useCallback(
    (pageNumber: number, direction: "next" | "prev" | null = null) => {
      if (pageNumber >= 0 && pageNumber <= book?.totalPages && !isAnimating) {
        setIsAnimating(true);
        setFlipDirection(direction);
        playPageTurnSound();
        setCurrentPage(pageNumber);

        // Update flipbook page if it exists
        if (flipBookRef.current && pageNumber > 0) {
          const flipBookPage = Math.floor((pageNumber - 1) / 2);
          flipBookRef.current
            .pageFlip()
            .flip(flipBookPage, direction === "prev" ? "back" : "forward");
        }

        setTimeout(() => {
          setIsAnimating(false);
          setFlipDirection(null);
        }, 400);
      }
    },
    [book?.totalPages, isAnimating, playPageTurnSound]
  );

  const nextPage = useCallback(() => {
    if (currentPage < book?.totalPages - 1) {
      goToPage(currentPage + 2, "next");
    }
  }, [currentPage, book?.totalPages, goToPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 2, "prev");
    } else if (currentPage === 1) {
      goToPage(0, "prev");
    }
  }, [currentPage, goToPage]);

  const toggleFullscreen = useCallback(async () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      if (currentPage === 0) {
        setCurrentPage(1);
      }
      await enterFullscreen();
      setTimeout(() => {
        setForceRerender((prev) => prev + 1);
      }, 300);
    } else {
      setIsFullscreen(false);
      await exitFullscreen();
    }
  }, [isFullscreen, currentPage, enterFullscreen, exitFullscreen]);

  const zoomIn = useCallback(() => {
    setZoomLevel((prev) => {
      const newZoom = Math.min(prev + 0.25, 2.5);
      if (newZoom > 1) {
        setIsGrabMode(true);
      }
      return newZoom;
    });
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevel((prev) => {
      const newZoom = Math.max(prev - 0.25, 0.75);
      if (newZoom <= 1) {
        setIsGrabMode(false);
        setPanOffset({ x: 0, y: 0 });
      }
      return newZoom;
    });
  }, []);

  const goToChapterPage = (pageNumber: number) => {
    goToPage(pageNumber);
  };

  const downloadPdf = () => {
    const link = document.createElement("a");
    link.href = book?.pdfUrl;
    link.download = `${currentSubject.toLowerCase()}-textbook.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copySelectedText = async () => {
    if (selectedText) {
      try {
        await navigator.clipboard.writeText(selectedText);

        // Show success notification
        const notification = document.createElement("div");
        notification.textContent = "✅ Text copied to clipboard!";
        notification.style.cssText = `
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(34, 197, 94, 0.9);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          z-index: 9999;
          font-weight: 500;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          animation: slideUp 0.3s ease-out;
        `;

        document.body.appendChild(notification);
        setTimeout(() => {
          notification.style.animation = "slideDown 0.3s ease-in";
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 300);
        }, 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  const goToSearchResult = (pageNumber: number) => {
    goToPage(pageNumber);
    setShowSearchPanel(false);
  };

  // SAFE HIGHLIGHT FUNCTION WITH PROPER REGEX ESCAPING
  const highlightSearchTerm = useCallback(
    (text: string, searchTerm: string) => {
      if (!searchTerm) return text;

      try {
        const escapedSearchTerm = escapeRegExp(searchTerm);
        const regex = new RegExp(`(${escapedSearchTerm})`, "gi");

        return text.split(regex).map((part, i) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <mark
              key={i}
              className="bg-yellow-200 dark:bg-yellow-600 px-1 rounded"
            >
              {part}
            </mark>
          ) : (
            part
          )
        );
      } catch (error) {
        console.error("Error highlighting search term:", error);
        return text;
      }
    },
    [escapeRegExp]
  );

  const thickness = getBookThickness();

  // Flipbook page renderer
  const renderFlipBookPage = (pageNum: number) => {
    const isLeftPage = pageNum % 2 === 0;
    const pdfPageNum = pageNum + 1; // Convert to 1-based index

    return (
      <div
        className={`relative w-full h-full flex items-center justify-center ${
          isLeftPage
            ? "bg-gradient-to-br from-white via-gray-50 to-white"
            : "bg-gradient-to-bl from-white via-gray-50 to-white"
        }`}
        style={{
          boxShadow: isLeftPage
            ? "inset -6px 0 12px -6px rgba(0,0,0,0.15), inset -2px 0 4px -2px rgba(0,0,0,0.05)"
            : "inset 6px 0 12px -6px rgba(0,0,0,0.15), inset 2px 0 4px -2px rgba(0,0,0,0.05)",
        }}
      >
        <div className="relative w-full h-full flex justify-center items-center p-4">
          <canvas
            ref={isLeftPage ? canvasLeftRef : canvasRightRef}
            className="w-full h-full object-contain rounded-lg"
            style={{
              filter: `
                drop-shadow(0 4px 8px rgba(0,0,0,0.1))
                contrast(1.05)
                brightness(1.02)
              `,
            }}
          />
          <div
            ref={isLeftPage ? textLayerLeftRef : textLayerRightRef}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-medium bg-white px-2 py-1 rounded shadow-lg border border-gray-200 transition-all duration-300 z-20">
          {pdfPageNum <= book?.totalPages ? pdfPageNum : ""}
        </div>
      </div>
    );
  };

  // Show loading spinner
  if (!books || books.length === 0 || !book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-blue-100">
        <div className="flex items-center gap-4">
          <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-pink-500"></div>
          <div className="text-2xl font-bold text-pink-700 animate-pulse">
            Loading book data...
          </div>
        </div>
        <div className="mt-4 text-gray-500 text-sm">
          Please wait while we fetch your book and chapters.
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`w-full h-screen overflow-hidden transition-all duration-500 ease-in-out ${
        isFullscreen
          ? "bg-gray-900 fixed inset-0 z-50"
          : "bg-[#666666] rounded-xl"
      }`}
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} preload="auto" />

      {/* Text Selection Notification */}
      {textSelectionActive && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 bg-green rounded-lg shadow-lg z-50 animate-bounce">
          ✅ Text selected! "{selectedText.substring(0, 30)}..." → Check search
          panel
        </div>
      )}

      {/* Fixed Top Toolbar for Fullscreen Mode */}
      {isFullscreen && (
        <div className="fixed top-0 left-0 right-0 bg-gray-800/95 backdrop-blur-sm text-white p-3 flex items-center justify-between border-b border-gray-600 h-16 z-40 transition-all duration-300">
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
              onClick={() => goToPage(0)}
            >
              <FiHome size={16} />
              {!responsiveConfig.isMobile && (
                <span className="text-sm">Home</span>
              )}
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
              onClick={() => setShowTOC(!showTOC)}
            >
              <FiMenu size={16} />
              {!responsiveConfig.isMobile && (
                <span className="text-sm">Contents</span>
              )}
            </button>
            {!responsiveConfig.isMobile && (
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? (
                  <FiVolume2 size={16} />
                ) : (
                  <FiVolumeX size={16} />
                )}
                <span className="text-sm">Sound</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              className="p-2 rounded-lg hover:bg-gray-700 transition-all duration-300 disabled:opacity-50"
              onClick={() => goToPage(0)}
              disabled={currentPage === 0}
            >
              <FiChevronsLeft size={16} />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gray-700 transition-all duration-300 disabled:opacity-50"
              onClick={prevPage}
              disabled={currentPage <= 0}
            >
              <FiChevronLeft size={16} />
            </button>

            <div className="bg-white text-gray-900 px-3 py-1 rounded-lg font-medium text-sm min-w-[100px] text-center mx-2 transition-all duration-300">
              {currentPage === 0
                ? "Cover"
                : `${currentPage}-${Math.min(
                    currentPage + 1,
                    book?.totalPages
                  )} / ${book?.totalPages}`}
            </div>

            <button
              className="p-2 rounded-lg hover:bg-gray-700 transition-all duration-300 disabled:opacity-50"
              onClick={nextPage}
              disabled={currentPage >= book?.totalPages - 1}
            >
              <FiChevronRight size={16} />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gray-700 transition-all duration-300 disabled:opacity-50"
              onClick={() => goToPage(book?.totalPages - 1)}
              disabled={currentPage >= book?.totalPages - 1}
            >
              <FiChevronsRight size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {responsiveConfig.isMobile || responsiveConfig.isTablet ? (
              <div className="relative">
                <button
                  className="p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                  onClick={() => setShowToolsDropdown(!showToolsDropdown)}
                >
                  <FiMoreHorizontal size={16} />
                </button>
                {showToolsDropdown && (
                  <div className="absolute right-0 top-12 bg-gray-800 border border-gray-600 rounded-lg shadow-xl p-2 min-w-[200px] z-50">
                    <div className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded transition-all duration-200">
                      <button onClick={zoomOut} disabled={zoomLevel <= 0.75}>
                        <FiZoomOut size={16} />
                      </button>
                      <span className="text-sm flex-1 text-center">
                        {Math.round(zoomLevel * 100)}%
                      </span>
                      <button onClick={zoomIn} disabled={zoomLevel >= 2.5}>
                        <FiZoomIn size={16} />
                      </button>
                    </div>
                    <button
                      className="w-full flex items-center gap-2 p-2 hover:bg-gray-700 rounded text-sm transition-all duration-200"
                      onClick={() => setSoundEnabled(!soundEnabled)}
                    >
                      {soundEnabled ? (
                        <FiVolume2 size={16} />
                      ) : (
                        <FiVolumeX size={16} />
                      )}
                      Sound
                    </button>
                    <button
                      className="w-full flex items-center gap-2 p-2 hover:bg-gray-700 rounded text-sm transition-all duration-200"
                      onClick={toggleFullscreen}
                    >
                      <FiMinimize size={16} />
                      Exit Fullscreen
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="flex items-center gap-1 bg-gray-700 rounded-lg p-1 transition-all duration-300">
                  <button
                    className="p-2 rounded hover:bg-gray-600 transition-all duration-300 disabled:opacity-50"
                    onClick={zoomOut}
                    disabled={zoomLevel <= 0.75}
                  >
                    <FiZoomOut size={16} />
                  </button>
                  <span className="text-sm font-medium px-2 min-w-[50px] text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    className="p-2 rounded hover:bg-gray-600 transition-all duration-300 disabled:opacity-50"
                    onClick={zoomIn}
                    disabled={zoomLevel >= 2.5}
                  >
                    <FiZoomIn size={16} />
                  </button>
                </div>
                <button
                  className="p-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
                  onClick={toggleFullscreen}
                >
                  <FiMinimize size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main container */}
      <div
        className="w-full h-full flex flex-col transition-all duration-500 ease-in-out"
        style={{
          paddingTop: isFullscreen ? "64px" : "0",
        }}
      >
        {/* Content area with sidebar */}
        <div className="flex-1 flex w-full overflow-hidden">
          {/* Enhanced Sidebar */}
          <div
            className={`transition-all duration-700 ease-in-out overflow-hidden ${
              !showTOC ? "w-0 opacity-0" : ""
            } ${
              responsiveConfig.shouldShowTOC
                ? "w-80 opacity-100"
                : "w-0 opacity-0"
            } ${
              isFullscreen
                ? "bg-gray-800/95 backdrop-blur-sm border-r border-gray-600 text-white"
                : "bg-white/95 backdrop-blur-sm border-r border-gray-200 text-gray-800"
            } shadow-xl rounded-xl flex-shrink-0`}
            style={{
              margin: isFullscreen
                ? "30px 30px 35px 30px"
                : "30px 30px 35px 30px",
              transform: responsiveConfig.shouldShowTOC
                ? "translateX(0)"
                : "translateX(-100%)",
            }}
          >
            {/* Sidebar Header */}
            <div
              className={`flex items-center justify-between p-4 border-b ${
                isFullscreen ? "border-gray-600" : "border-gray-200"
              } rounded-t-xl flex-shrink-0 transition-all duration-300`}
            >
              <div className="flex items-center gap-3">
                <div className="grid grid-cols-3 gap-1">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        isFullscreen ? "bg-white" : "bg-blue-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-lg">Contents</span>
              </div>
              <button
                className={`${
                  isFullscreen ? "hidden" : ""
                } p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                  isFullscreen
                    ? "hover:bg-gray-700 text-white"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
                onClick={() => setShowTOC(false)}
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Search */}
            <div
              className={`p-4 border-b ${
                isFullscreen ? "border-gray-600" : "border-gray-200"
              } flex-shrink-0 transition-all duration-300`}
            >
              <div className="relative">
                <FiSearch
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                    isFullscreen ? "text-gray-400" : "text-gray-500"
                  }`}
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search chapters..."
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:scale-105 ${
                    isFullscreen
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-white"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
                  }`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Navigation - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <button
                className={`w-full text-left p-3 rounded-xl transition-all duration-300 font-medium flex items-center gap-3 transform hover:scale-105 ${
                  isFullscreen
                    ? "hover:bg-gray-700 text-white"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
                onClick={() => goToPage(0)}
              >
                <FiBookOpen size={16} />
                Start Reading
              </button>

              {chapters?.map((chapter:any) => (
                <div key={chapter.id} className="space-y-1">
                  <button
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 font-medium transform hover:scale-105 ${
                      isFullscreen
                        ? "hover:bg-gray-700 text-white"
                        : "hover:bg-gray-100 text-gray-800"
                    }`}
                    onClick={() => toggleChapter(chapter.id)}
                  >
                    <span className="text-sm">{chapter.title}</span>
                    <div
                      className={`transition-transform duration-300 ${
                        chapter.expanded ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <FiChevronDown size={16} />
                    </div>
                  </button>

                  <div
                    className={`ml-4 space-y-1 transition-all duration-500 ease-in-out overflow-hidden ${
                      chapter.expanded
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {chapter.subChapters?.map((subChapter:any) => (
                      <button
                        key={subChapter.id}
                        className={`w-full text-left p-2 rounded-lg text-sm transition-all duration-300 flex items-center gap-2 transform hover:scale-105 ${
                          isFullscreen
                            ? "hover:bg-gray-700 text-gray-300"
                            : "hover:bg-gray-50 text-gray-600"
                        }`}
                        onClick={() =>
                          goToChapterPage(subChapter.pages[0] || 1)
                        }
                      >
                        <span className="w-2 h-2 rounded-full bg-current opacity-50"></span>
                        {subChapter.title}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Toggle TOC Button */}
          <button
            className={`absolute z-30 p-3 rounded-xl shadow-lg transition-all duration-500 hover:scale-110 ${
              isFullscreen ? "top-20" : "top-4"
            } ${responsiveConfig.shouldShowTOC ? "left-[332px]" : "left-4"} ${
              isFullscreen
                ? "bg-gray-800 text-white border border-gray-600"
                : "bg-white text-gray-800 border border-gray-200"
            }`}
            onClick={() => setShowTOC(!showTOC)}
          >
            <div
              className={`transition-transform duration-300 ${
                showTOC ? "rotate-180" : "rotate-0"
              }`}
            >
              {showTOC ? <FiX size={20} /> : <FiMenu size={20} />}
            </div>
          </button>

          {/* Book Content Container */}
          <div className="flex-1 flex flex-col w-full pt-[30px] pb-[30px]">
            {/* Book Display Area */}
            <div
              ref={bookContainerRef}
              className="flex-1 w-full flex items-center justify-center p-2 transition-all duration-500"
              style={{
                marginBottom: isFullscreen ? "0" : "",
              }}
            >
              <div
                className={`w-full h-full flex items-center justify-center transition-all duration-500 ease-in-out ${
                  isGrabMode ? "cursor-grab" : "cursor-default"
                } ${isDragging ? "cursor-grabbing" : ""}`}
                style={{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                  transformOrigin: "center center",
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {isLoading ? (
                  <div
                    className={`flex items-center justify-center h-full text-xl transition-all duration-500 ${
                      isFullscreen ? "text-white" : "text-gray-600"
                    }`}
                  >
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-current mr-4"></div>
                    Loading PDF...
                  </div>
                ) : (
                  // Enhanced Book Spread with FlipBook
                  <div
                    ref={bookRef}
                    className={`w-full h-full ${
                      isFullscreen ? "!max-w-[1320px]" : "!max-w-7xl"
                    } max-h-full relative  flex items-center justify-center transform-gpu transition-all duration-700 ease-in-out `}
                    style={{
                      padding: isFullscreen ? "10px" : "10px",
                      maxWidth: "1200px", // Optional max-width constraint
                      margin: "0 auto",
                      aspectRatio: "4/3",
                    }}
                  >
                    <div
                      className="w-full h-full flex justify-center items-center "
                      style={{ aspectRatio: "4/3" }}
                    >
                      <HTMLFlipBook
                        key={`flipbook-${flipBookKey}`}
                        ref={flipBookRef}
                        width={windowWidth * 0.9} // 90% of parent width
                        height={windowWidth * 0.9 * (4 / 3)} // Height based on 4:3 aspect ratio
                        size="stretch"
                        minWidth={300}
                        maxWidth={1200}
                        minHeight={400}
                        maxHeight={1600}
                        maxShadowOpacity={0.5}
                        showCover={true}
                        mobileScrollSupport={true}
                        showPageCorners={true}
                        className="w-full h-full relative"
                        style={{
                          background: "transparent",
                          width: "100%",
                          height: "100%",
                        }}
                        onFlip={handlePageFlip}
                        startPage={Math.floor((currentPage - 1) / 2)}
                        drawShadow={true}
                        flippingTime={600}
                        usePortrait={true}
                        startZIndex={0}
                        autoSize={true}
                        clickEventForward={true}
                        useMouseEvents={true}
                        swipeDistance={30}
                        disableFlipByClick={false}
                      >
                        {/* Custom Cover Page */}
                        <div
                          key="cover"
                          className={`w-full h-full flex items-center justify-center bg-white xl:translate-x-[-50%] `}
                        >
                          <Image
                            src={book?.coverImageUrl}
                            alt={`${book?.title} Book Cover`}
                            fill
                            className="object-cover rounded-lg"
                            quality={100}
                            priority
                          />
                          {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-lg font-bold text-gray-900 bg-white/80 px-4 py-2 rounded shadow">
                            {book?.title}
                          </div> */}
                        </div>
                        {/* Book Pages */}
                        {Array.from(
                          { length: (book?.totalPages || 0) - 1 },
                          (_, i) => (
                            <div
                              key={i + 1}
                              className="demoPage w-full h-full mx-auto"
                            >
                              <Page pageNum={i + 1} />
                            </div>
                          )
                        )}
                      </HTMLFlipBook>
                    </div>

                    {/* Book Shadow */}
                    <div
                      className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] h-[15px] bg-black rounded-full opacity-20 blur-md transition-all duration-500"
                      style={{
                        transform:
                          "translateX(-50%) rotateX(75deg) translateZ(-15px)",
                        background:
                          "radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div
          className={`max-w-full p-3 sm:p-4 flex items-center justify-between transition-all duration-500 ${
            isFullscreen
              ? "hidden bg-gray-800 border-gray-600 text-white"
              : "bg-[#000000] text-white"
          } shadow-lg`}
          style={{
            position: isFullscreen ? "relative" : "relative",
            bottom: isFullscreen ? "auto" : "0",
            left: isFullscreen ? "auto" : "0",
            right: isFullscreen ? "auto" : "0",
            zIndex: 20,
            height: "64px",
          }}
        >
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="font-medium flex items-center gap-2 transition-all duration-300">
              <span className="text-lg">📚</span>
              <span className="hidden sm:inline">
                Class 9th - {currentSubject} Part-1
              </span>
              <span className="sm:hidden text-sm">{currentSubject}</span>
            </div>
            {zoomLevel > 1 && (
              <div className="hidden sm:flex items-center gap-2 text-sm transition-all duration-300">
                <FiMove size={16} />
                <span>Drag to pan</span>
              </div>
            )}
          </div>

          {/* Page Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
                isFullscreen ? "hover:bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={() => goToPage(0)}
              disabled={currentPage === 0}
            >
              <FiChevronsLeft size={responsiveConfig.isMobile ? 16 : 18} />
            </button>
            <button
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
                isFullscreen ? "hover:bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={prevPage}
              disabled={currentPage === 0}
            >
              <FiChevronLeft size={responsiveConfig.isMobile ? 16 : 18} />
            </button>

            <div
              className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full font-medium text-center text-sm transition-all duration-300 ${
                isFullscreen ? "bg-white text-gray-900" : "bg-white text-black"
              }`}
              style={{
                minWidth: responsiveConfig.isMobile ? "80px" : "120px",
              }}
            >
              {currentPage === 0
                ? "Cover"
                : `${currentPage}-${Math.min(
                    currentPage + 1,
                    book?.totalPages
                  )} / ${book?.totalPages}`}
            </div>

            <button
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
                isFullscreen ? "hover:bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={nextPage}
              disabled={currentPage >= book?.totalPages - 1}
            >
              <FiChevronRight size={responsiveConfig.isMobile ? 16 : 18} />
            </button>
            <button
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
                isFullscreen ? "hover:bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={() => goToPage(book?.totalPages - 1)}
              disabled={currentPage >= book?.totalPages - 1}
            >
              <FiChevronsRight size={responsiveConfig.isMobile ? 16 : 18} />
            </button>
          </div>

          {/* Action Controls */}
          {responsiveConfig.isMobile ? (
            <div className="relative">
              <button
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isFullscreen
                    ? "hover:bg-gray-700 text-white"
                    : "hover:bg-gray-800 text-white"
                }`}
                onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
              >
                <FiSettings size={18} />
              </button>
              {showSettingsDropdown && (
                <div className="absolute right-0 bottom-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-2 min-w-[150px] z-50">
                  <button
                    className="w-full flex items-center gap-2 p-2 hover:bg-gray-800 dark:hover:bg-gray-700 rounded text-sm transition-all duration-200"
                    onClick={zoomIn}
                  >
                    <FiZoomIn size={16} />
                    Zoom In
                  </button>
                  <button
                    className="w-full flex items-center gap-2 p-2 hover:bg-gray-800 dark:hover:bg-gray-700 rounded text-sm transition-all duration-200"
                    onClick={zoomOut}
                  >
                    <FiZoomOut size={16} />
                    Zoom Out
                  </button>
                  <button
                    className="w-full flex items-center gap-2 p-2 hover:bg-gray-800 dark:hover:bg-gray-700 rounded text-sm transition-all duration-200"
                    onClick={toggleFullscreen}
                  >
                    {isFullscreen ? (
                      <FiMinimize size={16} />
                    ) : (
                      <FiMaximize size={16} />
                    )}
                    {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  isFullscreen ? "hover:bg-gray-700" : "hover:bg-gray-800"
                }`}
                onClick={zoomIn}
                title="Zoom In"
              >
                <FiZoomIn size={18} />
              </button>
              <button
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  isFullscreen ? "hover:bg-gray-700" : "hover:bg-gray-800"
                }`}
                onClick={zoomOut}
                title="Zoom Out"
              >
                <FiZoomOut size={18} />
              </button>
              <button
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                  isFullscreen ? "hover:bg-gray-700" : "hover:bg-gray-800"
                }`}
                onClick={() => setShowTOC(!showTOC)}
                title="Table of Contents"
              >
                <FiGrid size={18} />
              </button>
              <button
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  isFullscreen ? "hover:bg-gray-700" : "hover:bg-gray-800"
                }`}
                onClick={toggleFullscreen}
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? (
                  <FiMinimize size={18} />
                ) : (
                  <FiMaximize size={18} />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Text Selection Search Panel */}
      <div
        className={`fixed right-0 top-1/2 transform -translate-y-1/2 transition-all duration-300 z-50 ${
          showSearchPanel ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-white dark:bg-gray-800 rounded-l-xl shadow-xl border border-gray-200 dark:border-gray-700 w-80 max-h-[70vh] flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <FiSearch size={16} />
              PDF Text Search
            </h3>
            <button
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              onClick={() => setShowSearchPanel(false)}
            >
              <FiX size={18} />
            </button>
          </div>

          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search in PDF..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>

            {selectedText && (
              <div className="mt-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center justify-between">
                  <span>Selected Text:</span>
                  <span className="text-green-600 dark:text-green-400">
                    ✓ Ready to search
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="flex-1 text-sm bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-3 rounded-lg max-h-20 overflow-y-auto">
                    <span className="font-medium text-blue-800 dark:text-blue-200">
                      {selectedText}
                    </span>
                  </div>
                  <button
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
                    onClick={copySelectedText}
                    title="Copy to clipboard"
                  >
                    <FiCopy size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">
                Search Results
              </h4>
              {isSearching && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                  Searching...
                </div>
              )}
            </div>

            {searchResults.length > 0 ? (
              <div className="space-y-3">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded">
                        Page {result.page}
                      </div>
                      <button
                        className="text-xs flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        onClick={() => goToSearchResult(result.page)}
                      >
                        Go to page <FiArrowRight size={12} />
                      </button>
                    </div>
                    <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                      {highlightSearchTerm(result.context, searchTerm)}
                    </div>
                  </div>
                ))}
              </div>
            ) : searchTerm && !isSearching ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <FiSearch size={32} className="mx-auto" />
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  No results found for "{searchTerm}"
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Try different keywords or check spelling
                </div>
              </div>
            ) : !searchTerm ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <FiBookOpen size={32} className="mx-auto" />
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  Select text from PDF to search
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Or type keywords to search manually
                </div>
              </div>
            ) : null}
          </div>

          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center flex items-center justify-center gap-2">
              <span>💡</span>
              <span>
                Select any text from the PDF pages to search instantly
              </span>
            </div>
          </div>
        </div>

        {/* Toggle button when panel is closed */}
        <button
          className={`absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-l-lg shadow-lg transition-all duration-300 ${
            showSearchPanel ? "hidden" : "block"
          }`}
          onClick={() => setShowSearchPanel(true)}
        >
          <FiSearch size={20} />
        </button>
      </div>

      {/* Click outside to close dropdowns */}
      {(showToolsDropdown || showSettingsDropdown) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setShowToolsDropdown(false);
            setShowSettingsDropdown(false);
          }}
        />
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateX(-50%) translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
          to {
            transform: translateX(-50%) translateY(20px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
