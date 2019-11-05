const os = require('os')
const _ = require('lodash')
const webpack = require('webpack')
const path = require('path')

const HappyPack = require('happypack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CircularDependencyPlugin = require('circular-dependency-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const DefinePlugin = webpack.DefinePlugin

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const { pickByCondition } = require('./tool')
const pkg = require('../../package.json')

exports.getPlugins = (argv) => {
  const paths = argv.paths

  return _.compact([
    new DefinePlugin({
      'process.env.VERSION': JSON.stringify(pkg.version)
    }),

    new HappyPack({
      id: 'ts',
      threadPool: happyThreadPool,
      loaders: ['babel-loader']
    }),

    /**
     * https://github.com/ampedandwired/html-webpack-plugin
     *
     * Simplifies creation of HTML files to serve your webpack bundles
     */
    new HtmlWebpackPlugin({
      cache: !argv.uglify,
      inject: true,
      minify: pickByCondition(argv.uglify, {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        sortAttributes: true,
        useShortDoctype: true
      }),
      showErrors: true,
      template: paths.template
    }),

    /**
     * https://github.com/darrenscerri/duplicate-package-checker-webpack-plugin
     * Webpack plugin that warns you when multiple versions of the same package exist in a build.
     */
    new DuplicatePackageCheckerPlugin(),

    /**
     * https://github.com/aackerman/circular-dependency-plugin
     * Detect circular dependencies in modules compiled with Webpack
     */
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /node_modules/,
      // 非开发模式下面，直接报错退出
      failOnError: !argv.dev
    }),

    /**
     * https://github.com/kossnocorp/assets-webpack-plugin
     * Webpack plugin that emits a json file with assets paths
     */
    pickByCondition(!argv.dev, new AssetsPlugin({
      // name for the created json file.
      filename: 'assets.json',
      // path where to save the created JSON file
      path: paths.output,
      // whether to format the JSON output for readability
      prettyPrint: true
    })),

    pickByCondition(argv.dev, new HardSourceWebpackPlugin({
      cacheDirectory: path.resolve(__dirname, '../../.cache-modules/[confighash]'),
      cachePrune: {
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14天
        sizeThreshold: 50 * 1024 * 1024 // 50MB
      }
    })),

    pickByCondition(argv.analyse, new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: paths.analyseReport
    })),

    /**
     * This plugin extracts CSS into separate files.
     * It creates a CSS file per JS file which contains CSS.
     * https://github.com/webpack-contrib/mini-css-extract-plugin
     */
    new MiniCssExtractPlugin({
      filename: paths.cssName
    })
  ])
}
