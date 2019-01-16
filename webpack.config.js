const path = require("path");

module.exports = {
  mode: "devlopment",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js",
    libraryExport: "default",
    libraryTarget: "commonjs2"
  },
  devtool: "source-map",
  module: {
    reules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "./src")],
        exclude: [path.resolve(__dirname, "./node_modules")],
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  }
};
