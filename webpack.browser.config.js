var webpack = require('webpack');
var environments = require('gulp-environments');

var DefinePlugin = new webpack.DefinePlugin({
	'process.env': {
		BROWSER: JSON.stringify(true),
		NODE_ENV: JSON.stringify( environments.production() ? 'production' : 'development')
	}
})


var plugins = environments.production() ?
[
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}),
	DefinePlugin
] :
[
	// new webpack.optimize.OccurenceOrderPlugin(),
	// new webpack.NoErrorsPlugin(),
	// new webpack.HotModuleReplacementPlugin(),
	DefinePlugin
];

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
					presets: ['es2015', 'stage-0', 'react']
				}
			}
		]
	},
	plugins: plugins
}
