import { parseContent, parseLinks } from './parse.ts'
import { validateInput, SearchInput, Output, SearchOutput } from './types.ts'

const loadHtml = async (link: string): Promise<string> => {
  const response = await fetch(link, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0'
    }
  })
  return response.text()
}

const search = async (input: SearchInput): Promise<SearchOutput[]> => {
  const q = encodeURIComponent(input.search)
  const location = encodeURIComponent(input.location ?? 'us')
  const lang = encodeURIComponent(input.lang ?? 'en')
  const searchHtml = await loadHtml(`https://www.google.com/search?q=${q}&gl=${location}&hl=${lang}`)
  const links = parseLinks(searchHtml)
  return Promise.all(
    links.map<Promise<SearchOutput>>(
      async link => {
        const html = await loadHtml(link)
        return {
          link,
          html: parseContent(html),
        }
      }
    )
  )
}

export const main = async (input: unknown): Promise<Output> => (
  Promise.all(
    validateInput(input).pages.map(async input => {
      try {
        return (
          typeof input === 'string'
            ? loadHtml(input)
            : search(input)
        )
      } catch {
        return null
      }
    })
  )
)
