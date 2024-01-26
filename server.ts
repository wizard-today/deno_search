import { main } from './main.ts'

const port = 8080

// const handler = async (request: Request): Promise<Response> => {
//   try {
//     if (request.method == 'POST') {
//       const input = await request.text()
//       const result = await main(JSON.parse(input))
//       const output = JSON.stringify(result)
//       console.log(input, output)
//       return new Response(output)
//     }
//   } catch (error) {
//     console.error(error)
//     return new Response(null, { status: 500 })
//   }
//   return new Response(null, { status: 404 })
// }

const handler = async (request: Request): Promise<Response> => {
  return new Response('Surprise!!!', { status: 200 })
}

declare const Deno: any
Deno.serve({ port }, handler)
console.log('Server started!')
