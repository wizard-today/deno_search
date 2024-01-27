import { Actions } from './types.ts'
import { handler } from './handler.ts'

declare const Deno: any

export const startServer = (run_action: Actions) => {
  Deno.serve({ port: 8080 }, handler(run_action))
  console.log('Server started!')
}
