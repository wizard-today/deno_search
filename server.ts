import { main } from './main.ts'

const port = 8080

const handler = async (request: Request): Promise<Response> => {
  try {
    // if (request.method == 'POST') {
    //   const input = await request.text()
    //   const result = await main(JSON.parse(input))
    //   const output = JSON.stringify(result)
    //   return new Response(output)
    // }
    // if (request.method === 'GET') {
    //   const url = new URL(request.url)
    //   const params = url.searchParams
    //   const inputObj = Object.fromEntries(params)
    //   const result = await main(inputObj)
    //   const output = JSON.stringify(result)
    //   return new Response(output)
    // }
    if (request.method === 'GET') {
      const url = new URL(request.url)
      const params = url.searchParams
      const inputObj = Object.fromEntries(params)

      const result = await main(url.pathname, inputObj)
      const output = JSON.stringify(result)

      return new Response(output, {
        headers: { 'Content-Type': 'application/json' }
      })
    }
  } catch (error) {
    console.error(error)
    return new Response(null, { status: 500 })
  }
  return new Response(null, { status: 404 })
}

declare const Deno: any
Deno.serve({ port }, handler)
console.log('Server started!')
