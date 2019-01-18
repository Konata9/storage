const path = require("path");

const outPutPath = {
  prod: { path: path.resolve(__dirname, "./dist"), filename: "index.js" },
  test: { path: path.resolve(__dirname, "./test"), filename: "storage.test.js" }
};

module.exports = env => {
  console.log(`Now in ENV: ${env.NODE_ENV}.`);

  return {
    mode: "development",
    entry: "./index.js",
    output: {
      path: outPutPath[env.NODE_ENV].path,
      filename: outPutPath[env.NODE_ENV].filename
      // libraryExport: "default",
      // libraryTarget: "commonjs2"
    },
    devtool: "source-map",
    module: {
      rules: [
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
};
