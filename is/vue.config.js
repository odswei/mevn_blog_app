const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "^/": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  outputDir: path.resolve(__dirname, "../public"),
};
