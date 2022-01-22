const mix = require('laravel-mix')

mix.setPublicPath('/')


if (!mix.inProduction()) {
    mix.js('examples/test.js', 'examples/test.min.js')
}
mix
	.webpackConfig({
		output: {
			library: 'E',
			libraryTarget: 'umd',
			umdNamedDefine: true
		}
	})
	.js('src/e.js', 'dist/e.min.js')

