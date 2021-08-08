let serverPlugin = require("./serverPluginStatic.js");

const Koa = require("koa");
console.log(serverPlugin);

function createServer() {
  let app = new Koa({});

  let context = {
    app,
    root: process.cwd(), // 进程当前所在的目录
  };

  console.log(context);

  // 插件技巧
  const resolvePlugins = [serverPlugin];
  resolvePlugins.forEach((plugin) => plugin(context));

  return app;
}

createServer().listen(4000, () => {
  console.log("服务端正在监听4000端口");
});
