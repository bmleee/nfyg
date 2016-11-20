// http://stackoverflow.com/questions/31102035/how-can-i-use-webpack-with-express

var webpack = require('webpack');
var environments = require('gulp-environments');

var babelParams = {
	cacheDirectory: true,
	presets: ['es2015', 'stage-0', 'react'],
}

var path = require('path');
var fs = require('fs');
var nodeModules = {};

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

fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });

module.exports = {
	// configure for express.js
	name: 'server',
	target: 'node',

	node: {
		__dirname: false
	},

	entry: [
		'./src/express/app.js',
	],
	output: {
		path: __dirname + '/bin',
		filename: 'express-server.js'
	},
	externals: nodeModules,
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: [
					// 'imports?document=this',

					// 'react-hot',
					'babel-loader?' + JSON.stringify(babelParams)
				],
				exclude: /node_modules/,
			},
			{ test:  /\.json$/, loader: 'json-loader' },
			// from react-rte/webpack.config.js
			{
				test: /\.css$/,
				exclude: /\.global\.css$/,
				loaders: [
					'style?sourceMap',
					'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
				],
			},
			{ test: /\.global\.css$/, loader: 'style!raw' },
			{ test: /\.svg$/, loader: 'babel!react-svg' },
		]
	},
	plugins: plugins
}
