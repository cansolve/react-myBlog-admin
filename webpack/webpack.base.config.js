const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        main: path.join(__dirname, "../src/index.js"),
        common: ['react', 'react-dom']
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "./src/[name].js",

    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css', '.less', 'sass', 'scss']
    },
    performance: {
        hints: false
    },
    module: {
        rules: [{
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: { minimize: true }
                }]
            }, {
                test: /\.(js|jsx)?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true //缓存  
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]

            },

            {
                test: /\.(ico)$/,
                use: "raw-loader",
            },
            {
                test: /\.(gif|png|jpg|woff|svg|ttf|eot)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // limit: 30,
                        // outputPath: './assets/images/',
                        // name: '[name].[ext]?[hash]',
                    }
                }]
            },
            {
                test: /\.(woff2?|otf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 50,
                        outputPath: './assets/font',
                        publicPath: '../font'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(__dirname, "../public/index.html")
        }),
        new MiniCssExtractPlugin({
            filename: "./assets/css/[name].css",
            chunkFilename: "[id].css"
        }),
        new CopyWebpackPlugin([{
            from: "./assets/images/",
            to: "./assets/images/"
        }])
    ]
}