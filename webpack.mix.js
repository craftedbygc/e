const mix = require('laravel-mix');

mix.setPublicPath('/');


mix.js('src/e.js', 'dist/e.min.js')
    .js('examples/test.js', 'examples/test.min.js')
    .webpackConfig({
        devtool: 'source-map'
    })
    .sourceMaps();