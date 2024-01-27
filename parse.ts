import cheerio from 'npm:cheerio'
import { SearchPage } from './types.ts'

export const parseGoogleSearchLinks = (html: string): SearchPage[] => {
  const $ = cheerio.load(html)

  const pages: Partial<SearchPage>[] = []

  $('.g .yuRUbf h3').each((i, el) => {
    pages[i] = {}
    pages[i].title = $(el).text()
  })

  $('.yuRUbf a').each((i, el) => {
    pages[i].link = $(el).attr('href')
  })

  $('.g .VwiC3b ').each((i, el) => {
    pages[i].snippet = $(el).text()
  })

  return pages as SearchPage[]
}

export const parsePageContent = (html: string): string => {
  const $ = cheerio.load(html)
  $('body script').remove()
  $('body style').remove()

  $('img').each(function () {
    const image = $(this)
    const alt = image.attr('alt')
    image.replaceWith(alt ? `[${alt.trim()}]` : '')
  })

  return (
    $('head title').text() +
    ' | ' +
    $('body').text().replace(/\s+/g, ' ')
  )
}
