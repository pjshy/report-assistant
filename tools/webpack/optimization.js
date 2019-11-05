/**
 * https://webpack.js.org/plugins/split-chunks-plugin/
 * https://webpack.js.org/plugins/uglifyjs-webpack-plugin
 */
const _ = require('lodash')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const { pickByCondition } = require('./tool')

exports.getMinimizer = (argv) => {
  return _.compact([
    pickByCondition(argv.uglify, new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        output: { comments: false }
      },
      sourceMap: !!argv.sourcemap
    })),

    pickByCondition(argv.uglify, new OptimizeCSSAssetsPlugin())
  ])
}

exports.getOptimization = (argv) => {
  return {
    runtimeChunk: { name: 'manifest' },
    minimizer: exports.getMinimizer(argv),
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendor',
          enforce: true,
          reuseExistingChunk: true,
          test (module) {
            if (!module.nameForCondition) {
              return false
            }
            const modulePath = module.nameForCondition()
            const whiteList = ['normalize-css']
            if (_.findIndex(whiteList, (moduleName) => modulePath.includes(moduleName)) >= 0) {
              return false
            } else {
              return /[\\/]node_modules[\\/]/.test(modulePath)
            }
          },
          priority: 90
        }
      }
    }
  }
}
