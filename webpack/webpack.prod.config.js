const webpack = require("webpack");
const path = require("path");
const webpackConfigBase = require("./webpack.base.config");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const webpackConfigProd = {
    mode: "production",
    plugins: [
        new CleanWebpackPlugin(["dist"], {
            root: path.join(__dirname, "../")
        })
    ]
};
module.exports = merge(webpackConfigBase, webpackConfigProd);