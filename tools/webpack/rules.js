const path = require('path')
const _ = require('lodash')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { pickByCondition } = require('./tool')

function getScriptRules () {
  return [
    {
      test: /\.(t|j)sx?$/,
      exclude: /node_modules/,
      loader: 'happypack/loader?id=ts'
    }
  ]
}

const getStylusLoader = (argv, isModules = true) => {
  return [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: isModules,
        localIdentName: '[local]__[hash:base64:4]',
        sourceMap: !!argv.sourcemap
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: !!argv.sourcemap
      }
    },
    {
      loader: 'stylus-loader',
      options: {
        import: pickByCondition(isModules, [
          '~ui/style/mixin.styl',
          '~ui/style/variables.styl'
        ]),
        sourceMap: !!argv.sourcemap
      }
    }
  ]
}

const getStyleRules = (argv) => {
  return [
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: !!argv.sourcemap
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: !!argv.sourcemap
          }
        }
      ]
    },
    {
      test: /\.styl$/,
      use: getStylusLoader(argv, true)
    }
  ]
}

const getSvgRules = (argv) => {
  return [
    {
      test: /\.svg$/i,
      include: argv.paths.svgComponentDirs,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        },
        {
          loader: 'react-svg-loader',
          options: {
            svgo: path.join(__dirname, './svgo.json')
          }
        }
      ]
    }
  ]
}

const getFileRules = (argv) => {
  return [
    {
      test: /\.(gif|png|jpe?g)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          name: argv.paths.imageName,
          limit: 2 * 1024
        }
      }]
    },
    {
      test: /\.woff((\?|#)[?#\w\d_-]+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 100,
          minetype: 'application/font-woff',
          name: argv.paths.fontName
        }
      }]
    },
    {
      test: /\.woff2((\?|#)[?#\w\d_-]+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 100,
          minetype: 'application/font-woff2',
          name: argv.paths.fontName
        }
      }]
    },
    {
      test: /\.ttf((\?|#)[?#\w\d_-]+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 100,
          minetype: 'application/octet-stream',
          name: argv.paths.fontName
        }
      }]
    },
    {
      test: /\.eot((\?|#)[?#\w\d_-]+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 100,
          name: argv.paths.fontName
        }
      }]
    }
  ]
}

exports.getRules = (argv) => {
  return _.concat(
    getScriptRules(argv),
    getStyleRules(argv),
    getFileRules(argv),
    getSvgRules(argv),
  )
}
