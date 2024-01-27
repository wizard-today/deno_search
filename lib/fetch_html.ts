export const fetchHtml = async (link: string): Promise<string> => {
  const response = await fetch(link, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0'
    }
  })
  return response.text()
}
