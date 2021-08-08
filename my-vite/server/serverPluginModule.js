/**
 * 插件函数
 */
const static = require("koa-static");
const path = require("path");
let { readBody } = require("./utils");

function serverStaticPlugin({ app, root }) {
  app.use(async (ctx, next) => {
    await next();

    // 默认等待下一个中间件执行的结果返回，洋葱模型
    // 然后接着执行，拿到内层中间件的返回结果 （存放到ctx中）

    // 流转化成字符串, 只处理js
    if (ctx.body && ctx.response.is("js")) {
      // console.log(ctx.body);
      let res = await readBody(ctx.body);
      console.log(res);
    }
  });
}

module.exports = serverStaticPlugin;
