exports.stats = {
  // 将资源显示在 stats 中的情况排除
  // 这可以通过 String, RegExp, 获取 assetName 的函数来实现
  // 并返回一个布尔值或如下所述的数组。
  excludeAssets: (assetName) => {
    return assetName.startsWith('image') || assetName.startsWith('pdfviewer')
  },
  // 将模块显示在 stats 中的情况排除
  // 这可以通过 String, RegExp, 获取 moduleSource 的函数来实现
  // 并返回一个布尔值或如下所述的数组。
  excludeModules: (moduleSource) => {
    return true
  },
  // 不要输出 extract-text-webpack-plugin 相关的控制台信息
  // https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/35
  children: false
}

exports.getDevServer = (argv) => {
  return {
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: true,
    hot: false,
    host: '0.0.0.0',
    disableHostCheck: true,
    port: argv.port,
    stats: exports.stats
  }
}
