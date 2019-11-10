const path = require('path')
const { getArgv } = require('./argv')
const { getDevTool } = require('./devtool')
const { getOutput } = require('./output')
const { getPlugins } = require('./plugins')
const { getOptimization } = require('./optimization')
const { getRules } = require('./rules')
const { getDevServer, stats } = require('./dev-server')

const { resolvePath } = require('./tool')

module.exports = (env) => {
  const argv = getArgv(env || {})

  return {
    mode: argv.dev ? 'development' : 'production',
    devtool: getDevTool(argv),
    devServer: getDevServer(argv),
    entry: {
      app: argv.paths.app
    },
    output: getOutput(argv),
    module: {
      noParse: [
        /node_modules\/sinon/
      ],
      rules: getRules(argv)
    },
    resolve: {
      extensions: [
        '.ts',
        '.tsx',
        '.js'
      ],
      modules: [
        'node_modules',
        resolvePath('src')
      ],
      alias: {
        config: path.resolve(process.cwd(), 'src/config')
      }
    },
    stats: argv.dev ? undefined : stats,
    optimization: getOptimization(argv),
    plugins: getPlugins(argv)
  }
}
