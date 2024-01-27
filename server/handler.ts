import { Actions } from './types.ts'
import { InputError, NotFoundError } from './errors.ts'

export const handler = (actions: Actions) => async (request: Request): Promise<Response> => {
  try {
    if (request.method === 'GET') {
      const url = new URL(request.url)
      const action = url.pathname.slice(1)
      const input = Object.fromEntries(url.searchParams)

      const run_action = actions[action]

      if (!run_action) {
        throw new NotFoundError(action)
      }

      const result = await run_action(input)

      const output = (
        typeof result === 'string'
          ? result
          : JSON.stringify(result)
      )

      return new Response(output, {
        headers: {
          'Content-Type': (
            typeof result === 'string'
              ? 'text/plain'
              : 'application/json'
          )
        }
      })
    }
  } catch (error) {
    if (InputError.is(error)) {
      return new Response(null, { status: 400 })
    }
    if (NotFoundError.is(error)) {
      return new Response(null, { status: 404 })
    }
    console.error(error)
    return new Response(null, { status: 500 })
  }
  return new Response(null, { status: 404 })
}
