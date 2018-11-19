# react-manage(更新中)
## 前端技术

### 本地必须要有[node](https://nodejs.org/en/download/)和[git](https://git-scm.com/)环境

- webpack 4
- bootstrap + ace
- react 16
- react-router 4
- redux 3
- babel
- promise
- async +  await

----------------------------

# 项目开始

先在对应的git先创建git仓库，比如：XX管理后台 `demo` 项目，然后 `git clone`  到本来的开发环境，进入当前项目目录，代码如入：

```
git clone ssh://git@github.com:cansolve/react-manage.git
cd demo
```

或者

```
cd demo
git remote add origin ssh://git@github.com:cansolve/react-manage.git
```

这时，通过git来添加前端开发初始化的工程目录，代码如下：

```
git remote add base ssh://git@github.com:cansolve/react-manage.git
git pull base master --allow-unrelated-histories
```

目录结构如下：

```
demo //项目名
  -- dist  //预编译，自动构建之后会生成的文件，默认初始化是没有当前这个文件
  -- asserts  //静态资源目录，css,font,image
  -- public  //html模板文件
  -- webpack  //webpack配置文件
    -- webpack.base.config.js  //公用
    -- webpack.dev.config.js  //开发环境
    -- webpack.prod.config.js  //生产环境
  -- src  //js编写文件
      -- index.js  // 初始化js
      -- module  // 基础UI模块目录
      -- tools   // js方法工具库目录
      -- action     // action 目录
      -- component  // 对应的模块 目录
      -- dispatch   // dispatch 目录
      -- reducers   // reducers 目录
      -- index.js   // 前端渲染
      -- router.js  // 前端路由
      -- store.js   // store 文件 
  -- .babelr   //babel的校验文件
  -- .eslintrc  //js编写校验配置文件
  -- .gitignore  //git过滤文件
  -- package.json  //node 安装包文件
  -- README.md   //readme 文件
 
```

然后可以推送到开发项目上面去，代码如下：

```
git add .
git commit -m '前端项目初始化'
git push origin demo
```

到此，你的 `demo` 项目前端搭建和初始化已完毕，接下来你就可以开始 前端开发 了

------------------------------------

### 前端开发

#### 开始
先安装编译第三方的依赖包
```
npm install
```

```
//如果开发之前本地没有对应的server服务器，也可以用node搭个server服务器，默认是8080端口:127.0.0.1:8080,如果有的话，直接跳过这一步
npm install -g http-server
http-server -c-1
```
#### 生产开发
生产环境中开发监听对应的文件修改
```
npm start
```

### 前端发布部署

压缩生产对应的线上文件，生产 `html`  `css`  `image`  `font`  `js`  文件
```
npm build
```

-----------------------------

### 前端的升级和更新

后续当前项目的前端库升级，bug修复，版本更新，直接可以通过命令来实现

```
git pull base master
```

如有改动跟本地开发的导致冲突，请手动处理冲突文件，然后push到对应项目中去。
