const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const stylesHandler = "style-loader";

const config = {
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[hash][ext][query]",
  },
  devServer: {
    open: true,
    port: 3333,
    host: "localhost",
    hot: true,
    static: path.join(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "./public/manifest.json",
          to: "manifest.json",
        },
        {
          from: "./public/robots.txt",
          to: "robots.txt",
        },
        {
          from: "./public/favicon.ico",
          to: "favicon.ico",
        },
        {
          from: "./public/favicon-16x16.png",
          to: "favicon-16x16.png",
        },
        {
          from: "./public/favicon-32x32.png",
          to: "favicon-32x32.png",
        },
        {
          from: "./public/apple-touch-icon.png",
          to: "apple-touch-icon.png",
        },
        {
          from: "./public/apple-touch-icon.png",
          to: "apple-touch-icon.png",
        },
        {
          from: "./public/android-chrome-192x192.png",
          to: "android-chrome-192x192.png",
        },
        {
          from: "./public/android-chrome-512x512.png",
          to: "android-chrome-512x512.png",
        },
      ],
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  target: "web",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "",
            },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
};

if (!isProduction) {
  config.plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    // config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};
