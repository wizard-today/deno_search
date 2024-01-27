import cheerio from 'npm:cheerio'
import { Page } from './types.ts'

export const parseGoogleSearchLinks = (html: string): string[] => {
  const $ = cheerio.load(html)
  const links: string[] = []

  $('.yuRUbf a').each((i, el) => {
    links[i] = $(el).attr('href')
  })

  return links
}

export const parsePageContent = (html: string): Omit<Page, 'link'> => {
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
