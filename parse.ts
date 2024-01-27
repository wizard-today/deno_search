import cheerio from 'npm:cheerio'
import { SearchPage } from './types.ts'

export const parseGoogleSearchLinks = (html: string): SearchPage[] => {
  const $ = cheerio.load(html)

  const titles: string[] = []
  $('.g .yuRUbf h3').each((i, el) => {
    titles.push($(el).text())
  })

  const links: string[] = []
  $('.yuRUbf a').each((i, el) => {
    links.push($(el).attr('href'))
  })

  const snippets: string[] = []
  $('.g .VwiC3b ').each((i, el) => {
    snippets.push($(el).text())
  })

  return titles.map<SearchPage>((title, i) => ({
    title,
    link: links[i],
    snippet: snippets[i],
  }))
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
