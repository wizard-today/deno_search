import { Action, GetRequestInput } from '../server/types.ts'
import { fetchHtml } from '../lib/fetch_html.ts'
import { Parser } from '../lib/parser.ts'

type Input = {
  query: string
  location?: string
  lang?: string
}

type Page = {
  title: string
  link: string
  snippet: string
  content?: string
}

type Output = Page[]

const parseInput = (input: GetRequestInput): Input => ({
  query: input['query'],
  location: input['location'],
  lang: input['lang'],
})

const parseLinks = (html: string): Page[] => {
  const $ = new Parser(html)

  const titles = $.elements('.g .yuRUbf h3')
  const links = $.elements('.yuRUbf a', link => link.attr('href') ?? '')
  const snippets = $.elements('.g .VwiC3b')

  return titles.map<Page>((title, i) => ({
    title,
    link: links[i],
    snippet: snippets[i],
  }))
}

export const search_on_google: Action<Output> = async input => {
  const { query, location, lang } = parseInput(input)
  const q = encodeURIComponent(query)
  const searchHtml = await fetchHtml(
    `https://www.google.com/search?q=${q}&gl=${location ?? 'us'}&hl=${lang ?? 'en'}`
  )
  return parseLinks(searchHtml)
}
