import { start } from './bootstrap/dev'

start()
  .then((app) => {
    app.listen(3000, () => console.info('hello world'))
  })