const mix = require('laravel-mix')

mix.setPublicPath('/')


mix.js('examples/test.js', 'examples/test.min.js')
