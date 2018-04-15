const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackBar = require('webpackbar');

module.exports = {
	entry: path.resolve(__dirname, 'app', 'index.js'),

	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
		filename: 'tumn.bundle.js'
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
							loader: 'babel-loader',
							options: {
								presets: ['env']
							}
						}
					}
				}
			},

			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					presets: ['env']
				},
				exclude: /node_modules/
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
		new ExtractTextPlugin('tumn.bundle.css'),
		new WebpackBar()
	],

	devtool: '#eval-source-map'
};

if(process.env.NODE_ENV === 'production'){
	module.exports.devtool = '#source-map';
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]);
}
