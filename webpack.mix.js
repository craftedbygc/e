const mix = require('laravel-mix')

mix.setPublicPath('/')

if (process.env.BUILD === 'vanilla') {
    mix.js('src/vanilla.js', 'dist/e.js')
} else if (process.env.BUILD === 'umd') {
    mix
      .webpackConfig({
          output: {
              library: 'e',
              libraryTarget: 'umd',
              umdNamedDefine: true
          }
      })
      .js('src/es5.js', 'dist/es5.js')
} else if (mix.inProduction() === false) {
    mix.js('examples/test.js', 'examples/test.min.js')
}
