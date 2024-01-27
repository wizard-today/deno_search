import cheerio from 'npm:cheerio'
import { BrowseOutput, SearchPage } from './types.ts'

export const parseGoogleSearchLinks = (html: string): SearchPage[] => {
  const $ = cheerio.load(html)

  const pages: Partial<SearchPage>[] = []

  $(".g .yuRUbf h3").each((i, el) => {
    pages[i] = {}
    pages[i].title = $(el).text()
  })

  $('.yuRUbf a').each((i, el) => {
    pages[i].link = $(el).attr('href')
  })

  $(".g .VwiC3b ").each((i, el) => {
    pages[i].snippet = $(el).text()
  })

  return pages as SearchPage[]
}

export const parsePageContent = (html: string): BrowseOutput => {
  const $ = cheerio.load(html)
  $('body script').remove()
  $('body style').remove()


  $('a').each(function () {
    const link = $(this)
    const href = link.attr('href') ?? ''
    const text = link.text() ?? ''
    link.replaceWith(`[${text.trim()}](${href.trim()})`)
  })

  $('img').each(function () {
    const image = $(this)
    const src = image.attr('src') ?? ''
    const alt = image.attr('alt') ?? ''
    image.replaceWith(`![${alt.trim()}](${src.trim()})`)
  })

  return {
    title: $('head title').text(),
    content: $('body').text().replace(/\s+/g, ' '),
  }
}
