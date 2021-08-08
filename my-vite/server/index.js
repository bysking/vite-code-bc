console.log("vite-server");
const Koa = require("koa");

function createServer() {
  let app = new Koa({});

  return app;
}

createServer().listen(6000, () => {
  console.log("服务端正在监听3000端口");
});
