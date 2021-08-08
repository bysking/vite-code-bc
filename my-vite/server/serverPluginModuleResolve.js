/**
 * 插件函数
 */
const fs = require("fs");
const path = require("path");

let reg = /^\/@modules\//;
function serverModuleResolve({ app, root }) {
  app.use(async (ctx, next) => {
    console.log(ctx.path);
    if (!reg.test(ctx.path)) {
      return next();
    }

    const id = ctx.path.replace(reg, "");
    ctx.type = "js";

    let mapping = {
      vue: path.resolve(
        root,
        "vite-vue/node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js"
      ),
    };

    let res = await fs.readFileSync(mapping[id], {
      encoding: "utf8",
    });
    ctx.body = res;
  });
}

module.exports = serverModuleResolve;
