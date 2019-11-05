const _ = require('lodash')

exports.getDevTool = (argv) => {
  let devtool = 'nosources-source-map'

  if (_.isString(argv.sourcemap)) {
    devtool = argv.sourcemap
  }

  return devtool
}
