const { resolvePath } = require('./tool')

const getPaths = (env) => {
  let hash = ''
  let chunkhash = ''
  if (env.hash) {
    hash = '.[hash:8]'
    chunkhash = '.[chunkhash:8]'
  }

  return {
    app: resolvePath('src/app.tsx'),
    output: resolvePath('dist'),
    template: resolvePath('tools/webpack/template/index.html'),
    jsName: `js/[name]${chunkhash}.js`,
    cssName: `css/[name]${chunkhash}.css`,
    imageName: `images/[name]${hash}.[ext]`,
    fontName: `fonts/[name]${hash}.[ext]`,
    analyseReport: resolvePath('temp/report.html')
  }
}

exports.getArgv = (env) => {
  const defaultArgv = {
    localhost: '0.0.0.0',
    port: 8080,
    hash: false,
    dev: false,
    uglify: false,
    coverage: false,
    analyse: false,
    sourcemap: '',
    main: ''
  }

  const paths = getPaths(env)

  return Object.assign({}, defaultArgv, env, { paths })
}
