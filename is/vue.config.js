const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  // devServer: {
  //   proxy: {
  //     "/": {
  //       target: "http://localhost:3000",
  //       changeOrigin: false,
  //       secure: false,
  //       pathRewrite: {
  //         "/": "",
  //       },
  //     },
  //   },
  // },
  outputDir: path.resolve(__dirname, "../public"),
};
