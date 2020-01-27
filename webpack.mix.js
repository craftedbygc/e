const mix = require('laravel-mix')

mix.setPublicPath('/')


if (mix.inProduction() === false) {
    mix.js('examples/test.js', 'examples/test.min.js')
} else {
    mix.webpackConfig({
        devtool: 'source-map'
        })
        .sourceMaps()
        .js('vanilla.js', 'dist/e.min.js')
}
