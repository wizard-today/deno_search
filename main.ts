import { cutToAcceptableLimits, freeTokensLimit, tokens } from './gpt.ts'
import { parsePageContent, parseGoogleSearchLinks } from './parse.ts'
import { BrowseInput, SearchInput, SearchOutput } from './types.ts'

const loadHtml = async (link: string): Promise<string> => {
  const response = await fetch(link, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0'
    }
  })
  return response.text()
}

const browse = async (input: BrowseInput): Promise<string> => (
  parsePageContent(
    await loadHtml(input.link)
  )
)

const search = async (input: SearchInput): Promise<SearchOutput> => {
  const q = encodeURIComponent(input.search)
  const location = encodeURIComponent(input.location ?? 'us')
  const lang = encodeURIComponent(input.lang ?? 'en')
  const searchHtml = await loadHtml(`https://www.google.com/search?q=${q}&gl=${location}&hl=${lang}`)
  const output = parseGoogleSearchLinks(searchHtml)

  const freeTokens = freeTokensLimit(JSON.stringify(output))

  if (freeTokens) {
    for (let i = 0; i < 10; i++) {
      const content = await browse(output[i])
      if (tokens(content) >= freeTokens) {
        output[i].content = cutToAcceptableLimits(content, freeTokens - 10)
        break
      }
    }
  }

  return output
}

export const main = async (action: string, request: Record<string, string>) => {
  switch (action) {
    case '/browse': return browse({
      link: request['link'],
    })
    case '/search': return search({
      search: request['search'],
      in: request['in'] as SearchInput['in'],
      pages: Number(request['pages']) || undefined,
    })
  }
  return null
}
