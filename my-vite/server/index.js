let serverPlugin = require("./serverPluginStatic.js");
let serverPluginModule = require("./serverPluginModule.js");
let serverPluginModuleResolve = require("./serverPluginModuleResolve.js");
let vuePlugin = require("./vuePlugin.js");

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
    serverPluginModuleResolve, // 为什么放在这里是因为需要在重写之前处理所有的请求资源，结合洋葱模型进行类似于递归处理
    vuePlugin,
    serverPlugin,
  ];
  resolvePlugins.forEach((plugin) => plugin(context));

  return app;
}

createServer().listen(4000, () => {
  console.log("服务端正在监听4000端口");
});
