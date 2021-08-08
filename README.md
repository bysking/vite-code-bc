# 手撕 vite 实现原理

> 为什么要有 vite?

- 因为 webpack 打包太慢了，我们的青春经不起等待。。。，vite 基于 vue 实现按需编译，快速启动的“非打包开发服务器”。
- webpack 需要进行先编译，放到内存
- vite 基于现代浏览器的原声模块系统 esmodule 实现

> vite 脚手架

1. 方案 1 （使用现有的）

```js
// 如果create-vite-app不存在，需要先安装脚手架包
yarn add create-vite-app -g

// 项目初始化
create-vite-app vite-app
```

1. 方案 2 (每次基于最新脚手架初始化项目)

```js

// 依次执行命令
npm init vite-app vite-vue
cd vite-vue
yarn
yarn install
```

不出意外的话，我们将会在控制台看到这个，ctrl+单击鼠标左键---->vite 项目就打开了

```
  Dev server running at:
  > Network:  http://192.168.1.5:3000/
  > Local:    http://localhost:3000/

```

查看控制台，我们可以看到，项目正常启动，请求资源加载的是单个的文件

> 接下来实现我们自己的 vite

- 新建项目文件夹 my-vite
- cd my--vite 进入文件夹,然后初始化 yarn init -y
- koa 安装

> 让我们的包能关联响应控制台命令

- bin 目录存在
- bin 下面有执行文件
