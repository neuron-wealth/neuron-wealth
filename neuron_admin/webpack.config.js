const path = require("path");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (_env, argv) => {
  const isProd = argv.mode === "production";

  return {
    entry: path.resolve(__dirname, "src/main.jsx"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProd ? "assets/[name].[contenthash:8].js" : "assets/[name].js",
      publicPath: process.env.PUBLIC_PATH || (isProd ? "/admin/" : "/"),
      clean: true,
    },
    resolve: { extensions: [".js", ".jsx"] },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.css$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
          ],
        },
      ],
    },
    plugins: [
      new DefinePlugin({
        // Public website address used for the Live Site link, image thumbnails and the page preview.
        "process.env.SITE_URL": JSON.stringify((process.env.SITE_URL || (isProd ? "https://neuronwealth.com" : "http://localhost:3000")).replace(/\/$/, "")),
        "process.env.ROUTER_BASENAME": JSON.stringify(process.env.ROUTER_BASENAME || (isProd ? "/admin" : "")),
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
      }),
      ...(isProd ? [new MiniCssExtractPlugin({ filename: "assets/[name].[contenthash:8].css" })] : []),
    ],
    devServer: {
      static: { directory: path.resolve(__dirname, "public") },
      historyApiFallback: true,
      port: Number(process.env.ADMIN_PORT) || 3001,
      hot: true,
      open: false,
      proxy: [
        {
          context: ["/api"],
          target: process.env.API_PROXY_TARGET || "http://localhost:5000",
        },
      ],
    },
    devtool: isProd ? "source-map" : "eval-cheap-module-source-map",
    performance: { hints: false },
  };
};
