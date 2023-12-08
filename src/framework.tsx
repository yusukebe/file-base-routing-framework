import { Hono } from 'hono'
import type { H, MiddlewareHandler } from 'hono/types'

const METHODS = ['GET', 'POST', 'PUT', 'DELETE'] as const

type RouteFile = {
  default?: Function
} & { [M in (typeof METHODS)[number]]?: H[] }

type RendererFile = {
  default: MiddlewareHandler
}

const filePathToPath = (filePath: string) => {
  filePath = filePath
    .replace(/\.tsx?$/g, '')
    .replace(/^\/?index/, '/') // `/index`
    .replace(/\/index/, '') // `/about/index`
    .replace(/\[\.{3}.+\]/, '*')
    .replace(/\[(.+)\]/, ':$1')
  return /^\//.test(filePath) ? filePath : '/' + filePath
}

const pathToDirPath = (path: string) => {
  const dirPath = path.replace(/[^\/]+$/, '')
  return dirPath
}

const RENDERERS = import.meta.glob<RendererFile>('/app/routes/**/_renderer.tsx', {
  eager: true
})

const ROUTES = import.meta.glob<RouteFile>('/app/routes/**/[a-z0-9[-][a-z0-9[_-]*.(ts|tsx)', {
  eager: true
})

export const createApp = () => {
  const app = new Hono()

  for (const [key, routes] of Object.entries(RENDERERS)) {
    const dirPath = pathToDirPath(key)
    const path = dirPath.replace(/^\/app\/routes/, '')
    const renderer = routes.default
    app.get(`${path}*`, renderer)
  }

  for (const [key, route] of Object.entries(ROUTES)) {
    const path = filePathToPath(key.replace(/^\/app\/routes/, ''))

    for (const m of METHODS) {
      const handlers = route[m]
      if (handlers) {
        app.on(m, path, ...handlers)
      }
    }

    app.get(path, (c) => {
      if (route.default) {
        return c.render(route.default(c))
      }
      return c.notFound()
    })
  }

  return app
}
