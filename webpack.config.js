const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.join(__dirname, "/build"),
    filename: "index.bundle.js",
  },
  devServer: {
    port: 3010,
    static: path.resolve(__dirname, "dist"),
    open: true,
    historyApiFallback: true, // solve react-router urls don't work when refreshing the page
  },
  // mode: process.env.NODE_ENV || "development",
  // resolve: { modules: [path.resolve(__dirname, "src"), "node_modules"] },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJs
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: {
              webpackImporter: false,
              sassOptions: {
                includePaths: ["node_modules"],
              },
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     title: "SG Stock Webapp",
  //     template: path.join(__dirname, "dist", "index.html"),
  //   }),
  // ],
  // plugins: [new MiniCssExtractPlugin()],
};

// module.exports = () => {
//     if (isProduction) {
//       config.mode = 'production';
//     } else {
//       config.mode = 'development';
//     }
//     return config;
// };