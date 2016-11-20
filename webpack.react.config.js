var path = require('path');
var webpack = require('webpack');
var environments = require('gulp-environments');

var babelParams = {
	cacheDirectory: true,
	presets: ['es2015', 'stage-0', 'react'],
}

var plugins = environments.production() ? [
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}),
	new webpack.DefinePlugin({
		'process.env': {
			BROWSER: JSON.stringify(true),
			NODE_ENV: JSON.stringify('production')
		}
	})
] : [
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.NoErrorsPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	DefinePlugin
];

module.exports = {
	// configure for react.app
	entry: [
		'./src/react/App.js',
	],

	output: {
		path: path.join(__dirname, '/public'),
		publicPath: path.join(__dirname, '/public'),
		filename: 'react-app.js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loaders: ['babel-loader?' + JSON.stringify(babelParams), 'webpack-module-hot-accept'],
			},
			// masonry
			{
				test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
				loader: 'imports?define=>false&this=>window'
			},
			// from react-rte/webpack.config.js
			{
				test: /\.css$/,
				exclude: /\.global\.css$/,
				loaders: [
					'style?sourceMap',
					'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
				],
			},
			{test: /\.global\.css$/, loader: 'style!raw'},
			{ test: /\.svg$/, loader: 'babel!react-svg' }
		]
	},

	debug: environments.development(),
	plugins: plugins
}
