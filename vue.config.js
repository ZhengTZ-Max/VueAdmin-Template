const path = require("path");
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        style: path.resolve(__dirname, "src/style"),
      },
    },
  },
  // <svg-icon :icon-class="t.icon"></svg-icon>
  chainWebpack(config) {
    // 移除 preload 插件
    config.plugins.delete("preload");
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(path.resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(path.resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
  devServer: {
    port: 8000, // 端口号，如果端口号被占用，会自动加1
    host: "0.0.0.0", //主机名， 127.0.0.1，  真机 0.0.0.0
    https: false, //协议
    open: false, //启动服务时自动打开浏览器访问
    proxy: {
      "/proxy": {
        target: "http://erp.373huaxin.com:88",
        // target: "http://192.168.108.201:88",
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/proxy": "/",
        },
      },
      "/api": {
        target: "http://192.168.1.15:88",
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },

  lintOnSave: false, // 默认true，警告会被输出到命令行，但不会使得编译失败。如果为false，则不输出警告
  outputDir: "dist", // 打包之后所在目录， 默认值 dist
  assetsDir: "assets", // 静态资源打包之后 存放路径 ，（相对于outputDir指定的路径）, 默认值 ''
  //   indexPath: "out/index.html", // index.html 主页面打包之后存放的目录（相对于outputDir指定的路径），默认值 index.html
  productionSourceMap: false, // 打包时不会生成 .map 文件，加快打包速度
  // filenameHashing: false, 打包时，静态文件不会生成hash值，一般不要这个
};