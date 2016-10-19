var webpack = require('webpack');
var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
	compress: {
		warnings: false
	}
})

module.exports = {
	// configure for web browser
	entry: './src/assets/js/main.js',

	output: {
		path: __dirname + '/public/js',
		filename: 'main.js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					cacheDirectory: true,
					presets: ['es2015', 'stage-2', 'react']
				}
			}
		]
	},
	plugins: [
		// UglifyJsPlugin
	]
}
