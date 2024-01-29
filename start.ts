import { startServer } from './server/start_server.ts'

import { browse } from './actions/browse.ts'
import { search_on_google } from './actions/search_on_google.ts'

startServer({
  browse,
  search_on_google,
})
