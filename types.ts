// /browse

export type BrowseInput = {
  link: string
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
  content?: string
}

export type SearchOutput = SearchPage[]
