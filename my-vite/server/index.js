let serverPlugin = require("./serverPluginStatic.js");
let serverPluginModule = require("./serverPluginModule.js");

const Koa = require("koa");

function createServer() {
  let app = new Koa({});

  let context = {
    app,
    root: process.cwd(), // 进程当前所在的目录
  };

  // 插件技巧
  const resolvePlugins = [
    serverPluginModule, // 重写请求路径，基于koa的洋葱模型，重写后浏览器会发送新的请求
    serverPlugin,
  ];
  resolvePlugins.forEach((plugin) => plugin(context));

  return app;
}

createServer().listen(4000, () => {
  console.log("服务端正在监听4000端口");
});
