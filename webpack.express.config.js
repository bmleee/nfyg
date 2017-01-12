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
		'babel-polyfill',
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
					'babel-loader?' + JSON.stringify(babelParams)
				],
				exclude: /node_modules/,
			},
			{ test:  /\.json$/, loader: 'json-loader', exclude: /nodemailer/ },
			// from react-rte/webpack.config.js
			{
				test: /\.css$/,
				exclude: /(\.global|plugin)|(react-draft-wysiwyg)\.css$/,
				loaders: [
					'isomorphic-style-loader?sourceMap',
					// 'style-loader?sourceMap',
					'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
				],
			},
			{ test: /(\.global)|(react-draft-wysiwyg)\.css$/, loader: 'isomorphic-style-loader!raw' },
			// from draft-js plugins
			{
				test: /plugin\.css$/,
				// loaders: [
				// 	'isomorphic-style-loader', 'raw', 'css-loader'
				// ],
				loaders: [
					'isomorphic-style-loader?sourceMap',
					// 'style-loader?sourceMap',
					'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
				],
			},
			{ test: /\.svg$/, loader: 'babel!react-svg' },
			// react-notifications
			{ test: /\.(png|woff(2)?|eot|ttf|gif|jpg|jpeg)(\?[a-z0-9=.]+)?$/, loader: 'url-loader?limit=100000' },
			{ test: /\.svg\?[a-z0-9=.]+$/, loader: 'url-loader?limit=100000' },
		]
	},

	resolveLoader: { fallback: path.resolve(__dirname, "/node_modules") },

	debug: environments.development(),
	plugins: plugins
}
