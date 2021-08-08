/**
 * 插件函数
 */
const fs = require("fs").promises;
const path = require("path");

let reg = /^\/@modules\//;
function serverModuleResolve({ app, root }) {
  app.use(async (ctx, next) => {
    if (!reg.test(ctx.path)) {
      return next();
    }

    const id = ctx.path.replace(reg, "");
    ctx.type = "js";

    // let mapping = {
    //   vue: path.resolve(
    //     root,
    //     "vite-vue/node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js"
    //   ),
    //   "@vue/runtime-core": path.resolve(
    //     root,
    //     "vite-vue/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js"
    //   ),
    //   "@vue/shared": path.resolve(
    //     root,
    //     "vite-vue/node_modules/@vue/shared/dist/shared.esm-bundler.js"
    //   ),
    // };

    let url = "";

    if (id === "vue") {
      url = path.resolve(
        root,
        "vite-vue/node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js"
      );
    } else if (id.indexOf("@vue") !== -1) {
      let pkg = id.split("/")[1];
      url = path.resolve(
        root,
        `vite-vue/node_modules/@vue/${pkg}/dist/${pkg}.esm-bundler.js`
      );
    }

    let res = await fs.readFile(url, {
      encoding: "utf8",
    });
    ctx.body = res;
  });
}

module.exports = serverModuleResolve;
