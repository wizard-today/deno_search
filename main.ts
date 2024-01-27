import { parsePageContent, parseGoogleSearchLinks } from './parse.ts'
import { Input, Output, Page } from './types.ts'

const loadHtml = async (link: string): Promise<string> => {
  const response = await fetch(link, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0'
    }
  })
  return response.text()
}

const search = async (input: Input): Promise<Output> => {
  const q = encodeURIComponent(input.search)
  const location = encodeURIComponent(input.location ?? 'us')
  const lang = encodeURIComponent(input.lang ?? 'en')
  const searchHtml = await loadHtml(`https://www.google.com/search?q=${q}&gl=${location}&hl=${lang}`)
  const links = parseGoogleSearchLinks(searchHtml)
  return Promise.all(
    links.slice(0, input.pages).map<Promise<Page>>(
      async link => {
        const html = await loadHtml(link)
        const page = parsePageContent(html)
        return {
          link,
          ...page
        }
      }
    )
  )
}

export const main = async (request: Record<string, string>) => {
  return search({
    search: request['search'],
    in: request['in'] as 'google',
    pages: Number(request['pages']) || undefined
  })
}
