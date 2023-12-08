import { createApp } from '../src/framework'
import { showRoutes } from 'hono/dev'

const app = createApp()

showRoutes(app)

export default app
