import cheerio from 'npm:cheerio'

export const parseLinks = (html: string): string[] => {
  const $ = cheerio.load(html)
  const links: string[] = []

  $('.yuRUbf a').each((i, el) => {
    links[i] = $(el).attr('href')
  })

  return links
}

export const parseContent = (html: string): string => {
  const $ = cheerio.load(html)
  $('body script').remove()
  $('body style').remove()
  return $('body').text().replace(/(\s+|\\n)/g, ' ')
}
