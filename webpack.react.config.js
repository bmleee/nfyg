var path = require('path');
var webpack = require('webpack');
var environments = require('gulp-environments');

var babelParams = {
	cacheDirectory: true,
	presets: ['es2015', 'stage-0', 'react'],
}

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
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.NoErrorsPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	DefinePlugin
];

module.exports = {
	// configure for react.app
	entry: [
		'babel-polyfill',
		'./src/react/index.js',
	],

	output: {
		path: path.join(__dirname, '/public'),
		filename: 'react-app.js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loaders: ['babel-loader?' + JSON.stringify(babelParams)],
			},
			// masonry
			{
				test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
				loader: 'imports?define=>false&this=>window'
			},
			// from react-rte/webpack.config.js
			{
				test: /\.css$/,
				exclude: /(\.global|plugin)\.css$/,
				loaders: [
					// 'isomorphic-style-loader?sourceMap',
					// 'style-loader?sourceMap',
					'style?sourceMap',
					// 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
					'css?modules&importLoaders=1&localIdentName=[name]__[local]',
				],
			},
			{ test: /\.global\.css$/, loader: 'style!raw' },
			// from draft-js plugins
			{
				test: /plugin\.css$/,
				// loaders: [
				// 	'style', 'css'
				// ],
				loaders: [
					'style?sourceMap',
					// 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
					'css?modules&importLoaders=1&localIdentName=[local]',
				],

			},
			{ test: /\.svg$/, loader: 'babel!react-svg' },
			// react-notifications
			{ test: /\.(png|woff(2)?|eot|ttf)(\?[a-z0-9=.]+)?$/, loader: 'url-loader?limit=100000' },
			{ test: /\.svg\?[a-z0-9=.]+$/, loader: 'url-loader?limit=100000' },
		]
	},
	resolveLoader: { fallback: __dirname + "/node_modules" },


	debug: environments.development(),
	plugins: plugins
}
