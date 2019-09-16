const mix = require('laravel-mix');

mix.setPublicPath('/');


mix.js('src/e.js', 'dist/e.min.js')
    .js('src/test.js', 'dist/test.js')
    .webpackConfig({
        devtool: 'source-map'
    })
    .sourceMaps();