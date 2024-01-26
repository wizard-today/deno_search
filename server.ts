import { main } from './main.ts'

const port = 8080

const handler = async (request: Request): Promise<Response> => {
  try {
    if (request.method == 'POST') {
      const body = await request.text()
      const result = await main(JSON.parse(body))
      return new Response(JSON.stringify(result))
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
