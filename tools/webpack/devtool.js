exports.getDevTool = (argv) => {
  let devtool = 'nosources-source-map'

  if (argv.dev) {
    devtool = 'source-map'
  }

  if (argv.sourcemap && typeof argv.sourcemap === 'string') {
    devtool = argv.sourcemap
  }

  return devtool
}
