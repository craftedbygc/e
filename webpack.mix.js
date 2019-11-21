const mix = require('laravel-mix')

mix.setPublicPath('/')

mix.webpackConfig({
      devtool: 'source-map'
  })
  .sourceMaps()

if (mix.inProduction() === false) {
    mix.js('src/e.js', 'dist/e.js')
      .js('examples/test.js', 'examples/test.min.js')
} else {
    mix.webpackConfig({
        output: {
            library: 'e',
            libraryTarget: 'umd',
            umdNamedDefine: true
        }
    })

    mix.js('src/e.js', 'dist/e.min.js')
}
