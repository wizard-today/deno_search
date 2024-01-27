// /browse

export type BrowseInput = {
  link: string
}

export type BrowseOutput = {
  title: string
  content: string
}

// /search

export type SearchInput = {
  search: string
  in: 'google'
  pages?: number
  location?: string
  lang?: string
}

export type SearchPage = {
  title: string
  link: string
  snippet: string
}

export type SearchOutput = SearchPage[]
