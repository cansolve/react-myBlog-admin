const webpack = require('webpack');
const path = require('path');
require('babel-polyfill');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
                    loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0',
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
                use: ExtractTextPlugin.extract({
                    // 注意 1
                    fallback: {
                        loader: "style-loader"
                    },
                    use: [{
                            loader: "css-loader",
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                })

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
        }]),
        new ExtractTextPlugin({
            filename: "[name].min.css",
            allChunks: false // 注意 2
        })
    ]
}