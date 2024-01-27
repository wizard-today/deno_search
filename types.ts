export type Input = {
  search: string
  in: 'google'
  pages?: number
  location?: string
  lang?: string
}

export type Page = {
  link: string
  title: string
  content: string
}

export type Output = Page[]
