/**
 * 插件函数
 */
const static = require("koa-static");
const path = require("path");
function serverStaticPlugin({ app, root }) {
  app.use(static(root)); // 实现端口访问到当前路径映射
  app.use(static(path.resolve(root, "public"))); // 实现端口访问到当前路径映射
}

module.exports = serverStaticPlugin;
