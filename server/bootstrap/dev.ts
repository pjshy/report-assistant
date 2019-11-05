import * as Koa from 'koa'
import * as koaWebpack from 'koa-webpack'

export async function start () {
  const app = new Koa()

  const webpackMiddleware = await koaWebpack()

  app.use(webpackMiddleware)

  return app
}