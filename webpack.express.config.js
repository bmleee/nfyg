// http://stackoverflow.com/questions/31102035/how-can-i-use-webpack-with-express

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nodeModules = {};

var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
	compress: {
		warnings: false
	}
})
var DefinePlugin = new webpack.DefinePlugin({
	'process.env.NODE_ENV': process.env.NODE_ENV && 'development',
	'process.env.BROWSER': JSON.stringify(false)
})

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

	entry: './src/express/app.js',
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
					'babel-loader'
					//,'jsx-loader'
				],
				exclude: /node_modules/,
			},
			{ test:  /\.json$/, loader: 'json-loader' },
		]
	},
	plugins: [
		// UglifyJsPlugin
		DefinePlugin
	]

}
