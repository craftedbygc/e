const mix = require('laravel-mix')

mix.setPublicPath('/')


if (mix.inProduction() === false) {
    mix.webpackConfig({
          devtool: 'source-map'
      })
      .sourceMaps()
      .js('src/e.js', 'dist/e.js')
      .js('examples/test.js', 'examples/test.min.js')
} else {
    mix.js('src/e.js', 'dist/e.min.js')
}
