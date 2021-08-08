/**
 * vue文件解析
 */
const path = require("path");
const fs = require("fs").promises;

function vuePlugin({ app, root }) {
  app.use(async (ctx, next) => {
    //

    if (!ctx.path.endsWith(".vue")) {
      return await next();
    }

    const filePath = path.join(root, ctx.path);
    const content = await fs.readFile(filePath, {
      encoding: "utf8",
    });

    const { compileTemplate, parse } = require(path.resolve(
      root,
      "vite-vue/node_modules/@vue/compiler-sfc/dist/compiler-sfc.cjs.js"
    ));

    let {
      descriptor: { template, script, source },
    } = parse(content);

    if (!ctx.query.type) {
      // type属性不存在说明处理的是App.vue

      let code = "";

      if (script) {
        let { content } = script;
        code += content.replace(
          /((?:^|\n)\s*)export default/,
          "$1const __script = "
        );
      }

      if (template) {
        const requestPath = ctx.path + "?type=template"; // src/App.vue?type=template

        code += `\nimport { render as __render } from "${requestPath}"`;
        code += `\n__script.render = __render`;
      }

      code += `\nexport default __script`;

      ctx.type = "js";
      ctx.body = code;
    }

    if (ctx.query.type === "template") {
      ctx.type = "js";
      let content = template.content;
      const { code } = compileTemplate({ source: content }); // 将app.vue中的模板转化成render函数
      ctx.body = code;
    }
  });
}
module.exports = vuePlugin;
