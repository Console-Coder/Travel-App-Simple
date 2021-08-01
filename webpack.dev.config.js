const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/client/js/index.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "js/Bundled.js"
    },
    devServer: {
		contentBase: path.join(__dirname, 'dist'),
		openPage: 'views',
		open: true
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: ['style-loader','css-loader','sass-loader'],
                exclude: /node_modules/
            },

            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: path.join(__dirname, 'src/client/views/index.html'),
        filename: 'views/index.html'}),
        new CleanWebpackPlugin({protectWebpackAssets: false }),
		new WorkboxPlugin.GenerateSW({
       clientsClaim: true,
       skipWaiting: true,
	   swDest: path.join(__dirname, 'dist/service-worker.js')})
    ]

};