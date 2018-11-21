const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const webpackConfigBase = require("./webpack.base.config");
const openBrowserPlugin = require('open-browser-webpack-plugin');

const webpackConfigDev = {
    mode: 'development',
    plugins: [
        // new openBrowserPlugin({ url: "http://localhost:8088" })
    ],
    devServer: {
        contentBase: path.join(__dirname, "../public"),
        hot: true,
        host: '0.0.0.0',
        inline: true,
        port: 8088,
    }
}
module.exports = merge(webpackConfigBase, webpackConfigDev);