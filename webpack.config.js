const path = require("path");

const entryFile = {
  prod: "./src/storage.js",
  test: "./test/storage.test.js"
};
const outPutPath = {
  prod: {path: path.resolve(__dirname, "./dist"), filename: "index.js"},
  test: {
    path: path.resolve(__dirname, "./test"),
    filename: "storage.test.bundle.js"
  }
};

module.exports = (env) => {
  const currentEnv = env.NODE_ENV;
  console.log(`Now in ENV: ${currentEnv}.`);

  return {
    mode: "development",
    entry: entryFile[currentEnv],
    output: {
      path: outPutPath[currentEnv].path,
      filename: outPutPath[currentEnv].filename,
      library: "Storage",
      libraryTarget: "umd"
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
