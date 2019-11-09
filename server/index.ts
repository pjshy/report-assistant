import * as Koa from 'koa'
import * as config from 'config'

const env = config.get('env') || 'development'
const port = config.get('port') || 3000

async function startApp () {
  const app = new Koa()

  const isDev = env === 'development'

  if (isDev) {
    // todo
  }

  app.use( async (context) => {
    context.body = 'hello world'
  })

  app.listen(port, () => {
    console.info('app is start!')
  })
}

startApp()