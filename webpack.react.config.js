var webpack = require('webpack');
var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
	compress: {
		warnings: false
	}
})

module.exports = {
	// configure for express.js
	entry: './src/react/App.js',

	output: {
		path: __dirname + '/public',
		filename: 'react-app.js'
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
			},
			{
				test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
				loader: 'imports?define=>false&this=>window'
			}
		]
	},
	plugins: [
		// UglifyJsPlugin
	]
}
