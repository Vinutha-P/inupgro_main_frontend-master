export interface BookPage {
  id: number
  content: string
  title?: string
  leftContent?: string
  rightContent?: string
}

export interface Chapter {
  id: string
  title: string
  pages: number[]
  subChapters?: Chapter[]
  expanded?: boolean
}

export interface Book {
  id: string
  title: string
  subjectName?:any
  subtitle?: string
  standard?: string
  author?: string
  publisher?: string
  cover?:any
  coverPage: BookPage
  pages: BookPage[]
  chapters: Chapter[]
  totalPages: number
  metadata?: {
    edition?: string
    year?: string
    isbn?: string
    language?: string
  }
}

export interface BookReaderState {
  currentPage: number
  isFullscreen: boolean
  zoomLevel: number
  isAnimating: boolean
  flipDirection: "next" | "prev" | null
  animationProgress: number
  turnedPages: Set<number>
  showTOC: boolean
  searchTerm: string
}

export interface AnimationConfig {
  duration: number
  easing: string
  physics: {
    resistance: number
    momentum: number
    damping: number
  }
}
