/**
 * 插件函数
 */
const static = require("koa-static");
function serverStaticPlugin({ app, root }) {
  app.use(static(root)); // 实现端口访问到当前路径映射
}

module.exports = serverStaticPlugin;
