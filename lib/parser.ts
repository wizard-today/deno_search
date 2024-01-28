import cheerio from 'npm:cheerio'

export interface Element {
  attr(name: string): string | undefined
  text(): string
}

export class Parser {
  private html: any
  constructor(html: string) {
    this.html = cheerio.load(html)
  }

  remove(selector: string) {
    this.html(selector).remove()
  }

  replace(selector, map: (element: Element) => string) {
    this.html(selector).each((_, el) => {
      this.html(el).replaceWith(map(this.html(el)))
    })
  }

  element(selector: string, map?: (element: Element) => string) {
    return (
      map
        ? map(this.html(selector))
        : this.html(selector).text()
    )
  }

  elements(selector: string, map?: (element: Element) => string) {
    const array: string[] = []
    this.html(selector).each((_, el) => {
      array.push(
        map
          ? map(this.html(el))
          : this.html(el).text()
      )
    })
    return array
  }
}
