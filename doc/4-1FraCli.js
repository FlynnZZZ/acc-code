'Command Line Interface for batch scripting'cli: 命令行界面
--------------------------------------------------------------------------------
'vue-cli'官方提供的脚手架工具,用于初始化一个Vue项目 
  PS: 成熟的Vue项目架构设计;热加载本地测试服务器;集成打包上线方案;  
    使用要求 : NodeJS大于'4.0'版本; 安装Git,用于下载代码 
'.vue'文件 
  PS: 使用一个'.vue'格式文件将'HTML''CSS''JS'组装起来,方便开发,也方便复用和维护;
    一个'.vue'文件就是一个组件;
    组件的通信方式同样使用'props'和'event' 
    单文件组件的写法需要编译工具才能最终在浏览器端工作;
  Example: 
    <template>
      <div class="my-component">
        <h2>Hello from {{ msg }}</h2>
        <other-component></other-component>
      </div>
    </template>
    <script>
      // 遵循 ES6 模块格式
      import otherComponent from './other-component';
      // 导出组件定义
      export default {
        data: function () {
          return {
            msg: 'vue-loader'
          }
        },
        components: {
          'other-component': otherComponent
        }
      }
      
      // CommonJS 模块格式
      // var otherComponent = require('./other-component');
      // 导出组件定义
      // module.exports = {
      //   data: function () {
      //     return {
      //       msg: 'vue-loader'
      //     }
      //   },
      //   components: {
      //     'other-component': otherComponent
      //   }
      // }
    </script>
    <style>
      ...
    </style>
  <style scoped></style>  保证组件内的CSS只对该组件起作用 
  lang="" 使用预处理器 
    在'.vue'文件中使用其他预处理器[需安装对应的loader] 
    当使用 lang="less" 即使用Less,需安装如下依赖
    npm i -g css-loader less less-loader --save-dev
    <template lang="jade">
      div.my-component
      h2 Hello from {{msg}}
    </template>
    <script lang="babel">
      // 利用 Babel 编译 ES2015
      export default {
        data () {
          return {
            msg: 'Hello from Babel!'
          }
        }
      }
    </script>
    <style lang="less">
      .my-component{
        background-color : bule;
        .child{
          background-color:green;
        }
      }
    </style>
使用步骤 
  ◆工具安装[初始安装一次即可] 
  npm i -g webpack      全局安装webpack 
  npm i -g vue-cli      全局安装vue-cli 
    vue --version 或 vue -V // 查看Vue版本 
    vue list  // 查看官方提供的模版方案 
      browserify         
      browserify-simple  
      pwa               
      simple            
      webpack           
      webpack-simple    
  npm i -g vue          全局安装vue 
  ◆初始化项目 
  vue init <模版名> <项目名>      创建Vue项目  
  cd  projectName  进入新创建的项目文件夹 
    文件夹中的 index.html 为项目的入口,且默认使用src下的 main.js  
    后续的开发都在该文件夹下的'src'文件夹下进行[且主要为 App.vue 文件]
  npm init   npm初始化[创建'package.json'文件] 
  npm i      安装依赖: 根据存在的'package.json'文件配置安装依赖文件 
  npm i vue-router vue-resource --S  安装路由模块和网络请求模块
  ◆启动项目/构建发布  
  npm run dev     启动测试服务器  
  npm run build   运行构建,生成生产环境可发布的代码 
vue目录结构 
  vue-project  项目目录
    index.html  骨架html
    package.json       npm配置文件
    webpack.config.js  webpack配置文件
    .babelrc      babel配置文件
    .gitignore    忽略无需git控制的文件,比如node_modules 
    README.md     说明文件 
    src         源码存放目录 
      main.js    入口js
      App.vue    根组件   
      pages      页面目录 
      cpts       组件目录 
      assets     静态资源 
    dist        编译打包生成的文件存放的目录
    node_modules  npm包存放的目录,自动生成
'vue-loader'插件 
  在Webpack的'loader API'基础上开发,可用'.vue'单文件格式来写Vue组件 
  VueJS支持对组件的异步加载,配合Webpack的分块打包功能,可轻松实现组件的异步按需加载;
项目目录文件说明 
  ├── build                           编译任务执行的配置 
  │   ├── build.js
    require('./check-versions')() // 检查 Node 和 npm 版本
    require('shelljs/global')     // 使用 shelljs 插件,可在node环境中使用 shell 
    env.NODE_ENV = 'production'
    
    var path = require('path') // 不再赘述
    var config = require('../config') // 加载 config.js
    var ora = require('ora')  //  loading 插件
    var webpack = require('webpack') // 加载 webpack
    var webpackConfig = require('./webpack.prod.conf') // 加载 webpack.prod.conf
    
    console.log( //  输出提示信息 ～ 提示用户请在 http 服务下查看本页面,否则为空白页
      '  Tip:\n' +
      '  Built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    )
    
    var spinner = ora('building for production...') // 使用 ora 打印出 loading + log
    spinner.start() // 开始 loading 动画
    
    /* 拼接编译输出文件路径 */
    var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory) 
    /* 删除这个文件夹 （递归删除） */
    rm('-rf', assetsPath)
    /* 创建此文件夹 */ 
    mkdir('-p', assetsPath)
    /* 复制 static 文件夹到我们的编译输出目录 */
    cp('-R', 'static/*', assetsPath)
    
    //  开始 webpack 的编译
    webpack(webpackConfig, function (err, stats) {
      // 编译成功的回调函数
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n')
    })        
  │   ├── check-versions.js
  │   ├── dev-client.js
  │   ├── dev-server.js 
    require('./check-versions')() // 检查 Node 和 npm 版本
    var config = require('../config') // 获取 config/index.js 的默认配置
    
    /* 
    ** 若 Node 的环境无法判断当前是 dev / product 环境
    ** 使用 config.dev.env.NODE_ENV 作为当前的环境
    */
    
    if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
    var path = require('path') // 使用 NodeJS 自带的文件路径工具
    var express = require('express') // 使用 express
    var webpack = require('webpack') // 使用 webpack
    var opn = require('opn') // 一个可以强制打开浏览器并跳转到指定 url 的插件
    var proxyMiddleware = require('http-proxy-middleware') // 使用 proxyTable 
    var webpackConfig = require('./webpack.dev.conf') // 使用 dev 环境的 webpack 配置
    
    /* 若没有指定运行端口,使用 config.dev.port 作为运行端口 */
    var port = process.env.PORT || config.dev.port
    
    /* 使用 config.dev.proxyTable 的配置作为 proxyTable 的代理配置 */
    /* 项目参考 https://github.com/chimurai/http-proxy-middleware */
    var proxyTable = config.dev.proxyTable
    
    /* 使用 express 启动一个服务 */
    var app = express()
    var compiler = webpack(webpackConfig) // 启动 webpack 进行编译
    
    /* 启动 webpack-dev-middleware,将 编译后的文件暂存到内存中 */
    var devMiddleware = require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
        chunks: false
      }
    })
    
    /* 启动 webpack-hot-middleware,也就是我们常说的 Hot-reload */
    var hotMiddleware = require('webpack-hot-middleware')(compiler)
    
    /* 当 html-webpack-plugin 模板更新的时候强制刷新页面 */
    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
      })
    })
    
    // 将 proxyTable 中的请求配置挂在到启动的 express 服务上
    Object.keys(proxyTable).forEach(function (context) {
      var options = proxyTable[context]
      if (typeof options === 'string') {
        options = { target: options }
      }
      app.use(proxyMiddleware(context, options))
    })
    
    // 使用 connect-history-api-fallback 匹配资源,若不匹配就可以重定向到指定地址
    app.use(require('connect-history-api-fallback')())
    
    // 将暂存到内存中的 webpack 编译后的文件挂在到 express 服务上
    app.use(devMiddleware)
    
    // 将 Hot-reload 挂在到 express 服务上并且输出相关的状态、错误
    app.use(hotMiddleware)
    
    // 拼接 static 文件夹的静态资源路径
    var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
    // 为静态资源提供响应服务
    app.use(staticPath, express.static('./static'))
    
    // 让我们这个 express 服务监听 port 的请求,并且将此服务作为 dev-server.js 的接口暴露
    module.exports = app.listen(port, function (err) {
      if (err) {
        console.log(err)
        return
      }
      var uri = 'http://localhost:' + port
      console.log('Listening at ' + uri + '\n')
      
      // 若不是测试环境,自动打开浏览器并跳到我们的开发地址
      if (process.env.NODE_ENV !== 'testing') {
        opn(uri)
      }
    })
  │   ├── utils.js
  │   ├── webpack.base.conf.js        webpack 基础配置
    var path = require('path') // 使用 NodeJS 自带的文件路径插件
    var config = require('../config') // 引入 config/index.js
    var utils = require('./utils') // 引入一些小工具
    var projectRoot = path.resolve(__dirname, '../') // 拼接我们的工作区路径为一个绝对路径
    
    /* 将 NodeJS 环境作为我们的编译环境 */
    var env = process.env.NODE_ENV
    /* 是否在 dev 环境下开启 cssSourceMap ,在 config/index.js 中可配置 */
    var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
    /* 是否在 production 环境下开启 cssSourceMap ,在 config/index.js 中可配置 */
    var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
    /* 最终是否使用 cssSourceMap */
    var useCssSourceMap = cssSourceMapDev || cssSourceMapProd
    
    module.exports = {
      entry: {
        app: './src/main.js' // 编译文件入口
      },
      output: {
        path: config.build.assetsRoot, // 编译输出的静态资源根路径
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath, // 正式发布环境下编译输出的上线路径的根路径
        filename: '[name].js' // 编译输出的文件名
      },
      resolve: {
        // 自动补全的扩展名
        extensions: ['', '.js', '.vue'],
        // 不进行自动补全或处理的文件或者文件夹
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
        // 默认路径代理,例如 import Vue from 'vue',会自动到 'vue/dist/vue.common.js'中寻找
          'vue$': 'vue/dist/vue.common.js',
          'src': path.resolve(__dirname, '../src'),
          'assets': path.resolve(__dirname, '../src/assets'),
          'components': path.resolve(__dirname, '../src/components')
        }
      },
      resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
      },
      module: {
        preLoaders: [
          // 预处理的文件及使用的 loader
          {
            test: /\.vue$/,
            loader: 'eslint',
            include: projectRoot,
            exclude: /node_modules/
          },
          {
            test: /\.js$/,
            loader: 'eslint',
            include: projectRoot,
            exclude: /node_modules/
          }
        ],
        loaders: [
          // 需要处理的文件及使用的 loader
          {
            test: /\.vue$/,
            loader: 'vue'
          },
          {
            test: /\.js$/,
            loader: 'babel',
            include: projectRoot,
            exclude: /node_modules/
          },
          {
            test: /\.json$/,
            loader: 'json'
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            query: {
              limit: 10000,
              name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
              limit: 10000,
              name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
          }
        ]
      },
      eslint: {
        // eslint 代码检查配置工具
        formatter: require('eslint-friendly-formatter')
      },
      vue: {
        // .vue 文件配置 loader 及工具 (autoprefixer)
        loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
        postcss: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ]
      }
    }        
  │   ├── webpack.dev.conf.js 
    var config = require('../config') // 同样的使用了 config/index.js
    var webpack = require('webpack') // 使用 webpack
    var merge = require('webpack-merge') // 使用 webpack 配置合并插件
    var utils = require('./utils') // 使用一些小工具
    var baseWebpackConfig = require('./webpack.base.conf') // 加载 webpack.base.conf
    /* 使用 html-webpack-plugin 插件,这个插件可以帮我们自动生成 html 并且注入到 .html 文件中 */
    var HtmlWebpackPlugin = require('html-webpack-plugin') 
    
    // 将 Hol-reload 相对路径添加到 webpack.base.conf 的 对应 entry 前
    Object.keys(baseWebpackConfig.entry).forEach(function (name) {
      baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
    })
    
    /* 将我们 webpack.dev.conf.js 的配置和 webpack.base.conf.js 的配置合并 */
    module.exports = merge(baseWebpackConfig, {
      module: {
        // 使用 styleLoaders
        loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
      },
      // 使用 #eval-source-map 模式作为开发工具,此配置可参考 DDFE 往期文章详细了解
      devtool: '#eval-source-map',
      plugins: [
        /* definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串 */
        new webpack.DefinePlugin({
          'process.env': config.dev.env
        }),
        // 参考项目 https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.optimize.OccurenceOrderPlugin(),
        /* HotModule 插件在页面进行变更的时候只会重回对应的页面模块,不会重绘整个 html 文件 */
        new webpack.HotModuleReplacementPlugin(),
        /* 使用了 NoErrorsPlugin 后页面中的报错不会阻塞,但是会在编译结束后报错 */
        new webpack.NoErrorsPlugin(),
        // 参考项目 https://github.com/ampedandwired/html-webpack-plugin
        /* 将 index.html 作为入口,注入 html 代码后生成 index.html文件 */
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'index.html',
          inject: true
        })
      ]
    })      
  │   └── webpack.prod.conf.js
    var path = require('path') 
    var config = require('../config') // 加载 confi.index.js
    var utils = require('./utils') // 使用一些小工具
    var webpack = require('webpack') // 加载 webpack
    var merge = require('webpack-merge') // 加载 webpack 配置合并工具
    var baseWebpackConfig = require('./webpack.base.conf') // 加载 webpack.base.conf.js
    /* 一个 webpack 扩展,可以提取一些代码并且将它们和文件分离开 */ 
    /* 若我们想将 webpack 打包成一个文件 css js 分离开,那我们需要这个插件 */
    var ExtractTextPlugin = require('extract-text-webpack-plugin')
    /* 一个可以插入 html 并且创建新的 .html 文件的插件 */
    var HtmlWebpackPlugin = require('html-webpack-plugin')
    var env = config.build.env
    
    /* 合并 webpack.base.conf.js */
    var webpackConfig = merge(baseWebpackConfig, {
      module: {
        /* 使用的 loader */
        loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
      },
      /* 是否使用 #source-map 开发工具,更多信息可以查看 DDFE 往期文章 */
      devtool: config.build.productionSourceMap ? '#source-map' : false,
      output: {
        /* 编译输出目录 */
        path: config.build.assetsRoot,
        /* 编译输出文件名 */
        filename: utils.assetsPath('js/[name].[chunkhash].js'), // 我们可以在 hash 后加 :6 决定使用几位 hash 值
        // 没有指定输出名的文件输出的文件名
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
      },
      vue: {
        /* 编译 .vue 文件时使用的 loader */
        loaders: utils.cssLoaders({
          sourceMap: config.build.productionSourceMap,
          extract: true
        })
      },
      plugins: [
        /* 使用的插件 */
        /* definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串 */
        new webpack.DefinePlugin({
          'process.env': env
        }),
        /* 压缩 js (同样可以压缩 css) */
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        /* 将 css 文件分离出来 */
        new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
        /* 构建要输出的 index.html 文件, HtmlWebpackPlugin 可以生成一个 html 并且在其中插入你构建生成的资源 */
        new HtmlWebpackPlugin({
          filename: config.build.index, // 生成的 html 文件名
          template: 'index.html', // 使用的模板
          inject: true, // 是否注入 html (有多重注入方式,可以选择注入的位置)
          minify: { // 压缩的方式
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
            // 更多参数可查看 https://github.com/kangax/html-minifier#options-quick-reference
          },
          chunksSortMode: 'dependency'
        }),
        
        // 此处增加 @OYsun 童鞋补充
        // CommonsChunkPlugin用于生成在入口点之间共享的公共模块（比如jquery,vue）的块并将它们分成独立的包而为什么要new两次这个插件,这是一个很经典的bug的解决方案,在webpack的一个issues有过深入的讨论webpack/webpack#1315 .----为了将项目中的第三方依赖代码抽离出来,官方文档上推荐使用这个插件,当我们在项目里实际使用之后,发现一旦更改了 app.js 内的代码,vendor.js 的 hash 也会改变,那么下次上线时,用户仍然需要重新下载 vendor.js 与 app.js
        
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks: function (module, count) {
            // 依赖的 node_modules 文件会被提取到 vendor 中
            return (
              module.resource &&
              /\.js$/.test(module.resource) &&
              module.resource.indexOf(
                path.join(__dirname, '../node_modules')
              ) === 0
            )
          }
        }),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'manifest',
          chunks: ['vendor']
        })
        
      ]
    })
    
    /* 开启 gzip 的情况下使用下方的配置 */
    if (config.build.productionGzip) {
      /* 加载 compression-webpack-plugin 插件 */
      var CompressionWebpackPlugin = require('compression-webpack-plugin')
      /* 向webpackconfig.plugins中加入下方的插件 */
      webpackConfig.plugins.push(
        /* 使用 compression-webpack-plugin 插件进行压缩 */
        new CompressionWebpackPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
            '\\.(' +
            config.build.productionGzipExtensions.join('|') +
            ')$'
          ),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
    
    // split vendor js into its own file
     /* 没有指定输出文件名的文件输出的静态文件名 */
   new webpack.optimize.CommonsChunkPlugin({
         name: 'vendor',
         minChunks: function (module, count) {
           // any required modules inside node_modules are extracted to vendor
           return (
             module.resource &&
             /\.js$/.test(module.resource) &&
             module.resource.indexOf(
               path.join(__dirname, '../node_modules')
             ) === 0
           )
         }
       }),
       // extract webpack runtime and module manifest to its own file in order to
       // prevent vendor hash from being updated whenever app bundle is updated
       /* 没有指定输出文件名的文件输出的静态文件名 */
       new webpack.optimize.CommonsChunkPlugin({
         name: 'manifest',
         chunks: ['vendor']
       })
   CommonsChunkPlugin用于生成在入口点之间共享的公共模块（比如jquery,vue）的块并将它们分成独立的包而为什么要new两次这个插件,这是一个很经典的bug的解决方案,在webpack的一个issues有过深入的讨论webpack/webpack#1315 .----为了将项目中的第三方依赖代码抽离出来,官方文档上推荐使用这个插件,当我们在项目里实际使用之后,发现一旦更改了 app.js 内的代码,vendor.js 的 hash 也会改变,那么下次上线时,用户仍然需要重新下载 vendor.js 与 app.js——这样就失去了缓存的意义了所以第二次new就是解决这个问题的,请你好好看vue-cli那个英文原注释
   
   // extract webpack runtime and module manifest to its own file in order to
   // prevent vendor hash from being updated whenever app bundle is updated        
    
    module.exports = webpackConfig        
  ├── config                          webpack 的配置文件
  │   ├── dev.env.js
  │   ├── index.js
    index.js 中有 dev 和 production 两种环境的配置
    
    var path = require('path')
    
    module.exports = {
      build: { // production 环境
        env: require('./prod.env'), // 使用 config/prod.env.js 中定义的编译环境
        index: path.resolve(__dirname, '../dist/index.html'), // 编译输入的 index.html 文件
        assetsRoot: path.resolve(__dirname, '../dist'), // 编译输出的静态资源路径
        assetsSubDirectory: 'static', // 编译输出的二级目录
        assetsPublicPath: '/', // 编译发布的根目录,可配置为资源服务器域名或 CDN 域名
        productionSourceMap: true, // 是否开启 cssSourceMap
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false, // 是否开启 gzip
        productionGzipExtensions: ['js', 'css'] // 需要使用 gzip 压缩的文件扩展名
      },
      dev: { // dev 环境
        env: require('./dev.env'), // 使用 config/dev.env.js 中定义的编译环境
        port: 8080, // 运行测试页面的端口
        assetsSubDirectory: 'static', // 编译输出的二级目录
        assetsPublicPath: '/', // 编译发布的根目录,可配置为资源服务器域名或 CDN 域名
        proxyTable: {}, // 需要 proxyTable 代理的接口（可跨域）
        cssSourceMap: false // 是否开启 cssSourceMap(因为一些 bug 此选项默认关闭,详情可参考 https://github.com/webpack/css-loader#sourcemaps)
      }
    }        

    
  项目基本目录结构 
    bulid            构建的配置文件
    config           
    dist             打包构建好的代码
      static 
      index.html 
    node_modules     
    src              开发目录 
      assets         静态资源目录 
      components     组件目录 
      App.vue        主入口视图文件 
      main.js        主入口JS文件 
    static 
    index.html 
    package.json 
    ...
Coding 
  xx.vue 中 
    import Vue form "vue";  // 引入Vue 
--------------------------------------------------------------------------------
'Angular CLI'Angular2的构建工具 
  PS: 可以创建项目、添加文件以及执行一大堆开发任务,比如测试、打包和发布 
相关命令 
  npm install -g @angular/cli   全局安装 
    ng version   查看版本信息 
  ng new my-app [-skip-install]    创建项目 
    -skip-install 阻止安装依赖,后续通过 cnpm install 来进行安装 
  cd my-app         进入项目目录,并启动服务器 
  ng serve --open   启动开发服务器,监听文件变化,在修改文件时重新构建应用 
    --open [或-o] 参数可以自动打开浏览器并访问 
目录结构 
--------------------------------------------------------------------------------

