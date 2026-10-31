const path = require("path");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (_env, argv) => {
  const isProd = argv.mode === "production";

  return {
    entry: path.resolve(__dirname, "src/main.jsx"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProd ? "assets/[name].[contenthash:8].js" : "assets/[name].js",
      assetModuleFilename: "assets/[name].[contenthash:8][ext]",
      publicPath: "/",
      clean: true,
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              // Root-relative URLs (e.g. /images/...) are served from public/, not bundled.
              options: { url: { filter: (url) => !url.startsWith("/") } },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.css$/i,
          include: /node_modules/,
          use: [isProd ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp|avif|woff2?|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new DefinePlugin({
        // Admin app origin(s) allowed to drive the /cms-preview page, comma separated.
        "process.env.ADMIN_ORIGIN": JSON.stringify(process.env.ADMIN_ORIGIN || "https://neuronwealth.com,http://localhost:3001"),
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "public"),
            to: ".",
            globOptions: { ignore: ["**/index.html"] },
          },
        ],
      }),
      ...(isProd
        ? [
            new MiniCssExtractPlugin({
              filename: "assets/[name].[contenthash:8].css",
            }),
          ]
        : []),
    ],
    devServer: {
      static: path.resolve(__dirname, "public"),
      // The admin (another port) shows website images as CMS thumbnails.
      headers: (req) => (req.url.startsWith("/images/") ? { "Cross-Origin-Resource-Policy": "cross-origin" } : {}),
      historyApiFallback: true,
      port: Number(process.env.FRONTEND_PORT) || 3000,
      hot: true,
      open: false,
      proxy: [
        {
          context: ["/api"],
          target: process.env.API_PROXY_TARGET || "http://localhost:5000",
        },
      ],
    },
    // No source maps in production builds: they would publish the full original source code.
    devtool: isProd ? false : "eval-cheap-module-source-map",
    performance: {
      hints: isProd ? "warning" : false,
    },
  };
};
