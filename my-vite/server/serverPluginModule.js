/**
 * 插件函数
 */
const static = require("koa-static");
const path = require("path");
let { readBody } = require("./utils");
const { parse } = require("es-module-lexer");
const MagicString = require("magic-string");

function rewriteImports(source) {
  let imports = parse(source)[0];
  let msg = new MagicString(source);
  imports.forEach((importItem) => {
    let { s, e } = importItem;
    let importStr = source.slice(s, e);

    let reg = /^[^\/\.]/;
    if (reg.test(importStr)) {
      importStr = `/@modules/${importStr}`;
      msg.overwrite(s, e, importStr);
    }
  });
  return msg.toString();
}

function serverStaticPlugin({ app, root }) {
  app.use(async (ctx, next) => {
    await next();

    // 默认等待下一个中间件执行的结果返回，洋葱模型
    // 然后接着执行，拿到内层中间件的返回结果 （存放到ctx中）

    // 流转化成字符串, 只处理js
    if (ctx.body && ctx.response.is("js")) {
      let res = await readBody(ctx.body);
      res = rewriteImports(res); // 重写库文件导入路径
      ctx.body = res;
    }
  });
}

module.exports = serverStaticPlugin;
