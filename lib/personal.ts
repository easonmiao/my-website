export interface Experience {
  company: string
  companyEn: string
  role: string
  roleEn?: string
  from: number
  to?: number
  url?: string
}

export interface Record_ {
  artist: string
  album: string
  year: number
  genre: string
  spineColor: string
  spineInk: string
  url?: string
  art?: string
}

export interface Book {
  title: string
  author: string
  year: number
  category: string
  spineTitle?: string
  spineAuthor?: string
  spineColor: string
  spineInk: string
  art?: string
  coverWidth?: number
  coverHeight?: number
  spine?: number
  url?: string
}

// Empty until HooMee Coffee supplies public profile content.
export const experience: Experience[] = []
export const records: Record_[] = []
export const books: Book[] = []

