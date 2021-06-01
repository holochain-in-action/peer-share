const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        publicPath: "/dist/",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    devtool: false,
    devServer: {
        contentBase: "./dist",
        watchContentBase: true,
    },
};
