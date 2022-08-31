const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
    // asyncChunks: true,
    // chunkFilename: '[id].js',
    // devtoolModuleFilenameTemplate: 'webpack://[namespace]/[resource-path]?[loaders]',
    // chunkLoading: 'async-node',
  },
  resolve: {
    alias: {
        src: path.resolve(__dirname, ".", "src")
      },
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            }
          },
        ],
       type: 'javascript/auto'
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: false,
    chunkIds: 'named',
    moduleIds: 'deterministic',
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
  ],
};