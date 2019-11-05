exports.getOutput = (argv) => {
  const paths = argv.paths
  const publicPath = argv.dev ? `http://localhost:${argv.port}/` : '/'

  return {
    chunkFilename: paths.jsName,
    filename: paths.jsName,
    path: paths.output,
    pathinfo: true,
    publicPath,
    sourceMapFilename: paths.sourceMapName
  }
}
