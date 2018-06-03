const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackBar = require('webpackbar');

module.exports = {
	entry: {
		tumn: path.resolve(__dirname, 'app', 'src', 'index.js'),
		apply: path.resolve(__dirname, 'app', 'src', 'ui', 'apply.js'),
		extension: path.resolve(__dirname, 'app', 'src', 'ui', 'extension.js'),
		settings: path.resolve(__dirname, 'app', 'src', 'ui', 'settings.js')
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
		filename: '[name].bundle.js'
	},

	mode: process.env.NODE_ENV || 'development',

	module: {
		rules: [
			{
				test:/\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						'less': ExtractTextPlugin.extract({
							use: [
								{
									loader: 'css-loader',
									options: {
										importLoaders: 1
									}
								},

								'less-loader'
							],
							fallback: 'vue-style-loader'
						}),

						'css': ExtractTextPlugin.extract({
							use: [{
								loader: 'css-loader',
								options: {
									importLoaders: 1
								}
							}],
							fallback: 'vue-style-loader'
						}),

						'js': {
							loader: 'babel-loader'
						}
					}
				}
			},

			{
				test: /\.(?:hook|inject)\.js$/,
				loader: 'raw-loader',
				exclude: /node_modules/
			},

			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: [
					/node_modules/,
					/\.(?:hook|inject)\.js$/
				]
			},

			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1
							}
						},

						'less-loader'
					],
					fallback: 'vue-style-loader'
				})
			},

			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					use: {
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					fallback: 'vue-style-loader'
				})
			},

			{
				test: /\.(png|jpe?g|gif|woff2?|otf|wav|ttf|eot|svg)(\?|\#.*)?$/,
				loader: 'file-loader',
				options: {
					name: 'files/[name].[ext]?[hash]'
				}
			}
		]
	},

	plugins: [
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'development'
		}),
		new ExtractTextPlugin('[name].bundle.css'),
		new WebpackBar({
			profile: true
		})
	],

	devtool: '#eval-source-map'
};

if(process.env.NODE_ENV === 'production'){
	module.exports.devtool = '#source-map';
	module.exports.optimization = {
		minimize: true
	};
}
