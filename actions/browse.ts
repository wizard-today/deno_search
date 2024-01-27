import { Action, GetRequestInput } from '../server/types.ts'
import { fetchHtml } from '../lib/fetch_html.ts'
import { Parser } from '../lib/parser.ts'
import { cutToGPTsAcceptableLimits } from '../lib/gpt.ts'

type Input = {
  link: string
  offset?: number
}

const parseInput = (input: GetRequestInput): Input => ({
  link: input['link'],
  offset: Number(input['offset'] ?? ''),
})

const trimPageContent = (html: string): string => {
  const $ = new Parser(html)

  $.remove('body script')
  $.remove('body style')

  $.replace('img', img => {
    const alt = img.attr('alt')
    return alt ? `[${alt.trim()}]` : ''
  })

  return $.element('body').replace(/\s+/g, ' ')
}

export const browse: Action<string> = async input => {
  const { link, offset } = parseInput(input)

  const content = trimPageContent(
    await fetchHtml(link)
  )

  return cutToGPTsAcceptableLimits(content, { offset })
}
