export type SearchInput = {
  search: string
  in: 'google'
  pages?: number
  location?: string
  lang?: string
}

export type Input = {
  pages: (SearchInput | string)[]
}

export type SearchOutput = {
  link: string
  html: string
}

export type Output = (SearchOutput[] | string | null)[]

const isValidPagesProperty = (pages: number | undefined) => (
  typeof pages === 'number'
  && Number.isInteger(pages)
  && pages >= 1
  && pages <= 10
)

export const validateInput = (input: unknown): Input => {
  if (
    !!input
    && typeof input === 'object'
    && !!(input as Input).pages
    && typeof (input as Input).pages === 'object'
    && Array.isArray((input as Input).pages)
    && (input as Input).pages.length > 0
    && (input as Input).pages.every(item => (
      !!item
      && (
        typeof item === 'string'
        || (
          typeof item === 'object'
          && typeof (item as SearchInput).search === 'string'
          && (item as SearchInput).in === 'google'
          && (
            typeof (item as SearchInput).pages === 'undefined'
            || isValidPagesProperty((item as SearchInput).pages)
          )
          && (
            typeof (item as SearchInput).location === 'undefined'
            || typeof (item as SearchInput).location === 'string'
          )
          && (
            typeof (item as SearchInput).lang === 'undefined'
            || typeof (item as SearchInput).lang === 'string'
          )
        )
      )
    ))
  ) {
    return input as Input
  }
  throw new Error(`Input parse error: ${JSON.stringify(input)}`)
}
