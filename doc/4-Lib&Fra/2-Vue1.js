'vue-cli'官方提供的脚手架工具,用于初始化一个Vue项目 
  'vue-cli'使用的优点:
    成熟的Vue项目架构设计;
    热加载本地测试服务器;
    集成打包上线方案;  
  使用要求: NodeJS大于'4.0'版本; 安装Git,用于下载代码 
  ◆工具安装[初始安装一次即可] 
  // $ npm i -g webpack // 全局安装webpack 
  $ npm i -g vue-cli    // 全局安装vue-cli 
    $ vue -V    // 查看 vue-cli 版本 
  ◆初始化项目 
  $ vue list  // 查看官方提供的'template'模版方案 
    browserify         
    browserify-simple  
    pwa               
    simple            
    webpack           
    webpack-simple    
  $ vue init <template> <path>  // 创建Vue项目  
  $ npm i     // 根据'package.json'文件配置安装依赖文件 
  $ npm i --S vue-router vuex axios vue-resource // 安装相关插件 
  ◆启动项目/构建发布  
  $ npm run dev     // 启动测试服务器  
  $ npm run build   // 运行构建,生成生产环境可发布的代码 
项目目录、文件说明 
  PS: 进行了部分更改 
  build         // 构建的配置文件 
    build.js 
      require('./check-versions')()  
      require('shelljs/global')   // 引入'shelljs'插件,可在node代码中使用shell命令  
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
    check-versions.js  // 检查 Node 和 npm 版本 
    dev-client.js
    dev-server.js 
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
    utils.js
    webpack.base.conf.js        webpack 基础配置 
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
    webpack.dev.conf.js 
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
    webpack.prod.conf.js 
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
  config        // webpack 的配置文件
    dev.env.js
    index.js 
      PS: 配置了开发和生产两种环境 
      var path = require('path'); 
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
        dev: {   // dev 环境
          env: require('./dev.env') // 使用 config/dev.env.js 中定义的编译环境
          ,port: 8080 // 运行测试页面的端口
          ,assetsSubDirectory: 'static' // 编译输出的二级目录
          ,assetsPublicPath: '/' // 编译发布的根目录,可配置为资源服务器域名或 CDN 域名
          ,proxyTable: { // 代理设置 
            '/api/': 'http://localhost:8081' // 即访问'/api'则相当于访问后面指定的地址 
          }
          ,cssSourceMap: false 
            // 是否开启 cssSourceMap(因为一些 bug 此选项默认关闭,详情可参考 https://github.com/webpack/css-loader#sourcemaps)
        }
      }        
  dist          // 打包构建好的代码 
    static 
    index.html 
  node_modules  // node模块
  src           // 开发目录 
    assets         // 资源目录  
      imgs 
      data 
      plugs 
      scripts 
      styles 
    components     // 公用组件 
      xx.vue 
      ... 
    pages          // 页面划分 
      member 
        access.vue
        xxx.vue 
        ...
      news   
        access.vue
        xxx.vue 
        ...
      ..
    main.js        // 入口JS 
  static        // 静态文件夹 
    src目录下的资源只能import或require,
    而该文件夹下的文件可直接在HTML中引入,最终打包到'dist/static'中 
  .babelrc      // babel配置文件
  .gitignore    // 忽略无需git控制的文件,比如node_modules 
  index.html 
  package.json  // 
    "scripts": {
      "dev": "node build/dev-server.js",
      "build": "node build/build.js"
    }
    "dependencies": {
      "vue": "^2.4.2",
      "vue-resource": "^1.3.4",
      "vue-router": "^2.7.0",
      "vuex": "^2.4.0",
      "jquery": "^3.2.1"
    },
  README.md     // 说明文件 
  ...
Question: 
  如何将自定义的工具JS引入到全局可用,类似引入jQuery[使用Webpack插件] 
    自我决解办法: 将工具函数暴露到全局window对象中 
  当刷新SPA后,如何维持通过之前操作获取的状态? 
    通过 localStorage sessionStorage [Self]
    Vue的Webpack模版 
--------------------------------------------------------------------------------
'vue-resource'HTTP请求封装插件 
  PS: 通过'XMLHttpRequest'或'JSONP'发起请求并处理响应 
引入安装   
  通过<script>引入 
    在vue后引入后引入vue-resource 
    默认安装了 
  通过npm下载引入 
    $ npm i --S vue-resource  // 下载并写入依赖 
    // main.js 中引入、安装   
    import VueResource from 'vue-resource' // 引入 vue-resource 
    Vue.use(VueResource)  // 安装 vue-resource   
API 
  ◆组件注入属性/方法 vm.$http 
    PS: 回调函数中的 this 仍指向Vue实例 
  ★http请求方法 
    请求方法返回值为 Promise 对象,可使用以下方法 
    .then(function(data1 ){ // 成功的回调 
      // data1,response对象,进行了Vue封装 
    }
    ,function(data2 ){ // 失败的回调 
      // data2,response对象,进行了Vue封装 
    })  
    .catch(function(data){
      // 
    })
  vm.$http.get('url',{    // GET请求  
    // 可选,请求的参数 
  })
  vm.$http.post('url',{   // POST请求
    // 可选参数
  })
  vm.$http.delete(url[,options]) 
  vm.$http.put(url[,body][,options]) 
  ...
  vm.$http.jsonp('url',{  // JSONP请求  
    // 可选参数 
  }) 
  vm.$http({  // 通用写法 
    url: 'url'
    ,method: 'GET'
    ,data: { 
      key1: val1 
      ,key2: val2
    }
    ,headers: {"X-Requested-With": "XMLHttpRequest"}
    ,emulateJSON: true
  })
  ★其他方法 
  vm.$http.head(url, [options]) 
  vm.$http.patch(url, [body], [options]) 
  ★response响应对象
    .ok     bol,响应的HTTP状态码在 200-299 该属性为 true,其余为 false
    .status num,响应的HTTP状态码 
    .statusText str,响应的状态文本
    .headers  obj,响应头
    .body       接口响应的数据 
    .bodyText   未经转义的响应数据 
    .headers    相关的头信息 
    .ok         bol,是否请求成功 
    .status     状态码 
    .statusText 状态描述 
    .url        请求的地址  
    .text() str,以字符串形式返回response body
    .json() obj,以JSON对象形式返回response body
    .blob() Blob,以二进制形式返回response body
  ◆Vue.http.xx 
    PS: 和 vm.$http 等价 
    Vue.http.options.xhr = { withCredentials: true } ? 
    Vue.http.options.emulateJSON = true 
    ★Vue.http.options 对象 
    .url     str,请求的URL 
    .method  str,请求的HTTP方法,如'GET','POST'或其他HTTP方法 
    .body    obj,FormData string request body 
    .params  obj,请求的URL参数对象 
    .headers obj,request header 
    .timeout num,请求超时时间,单位ms[0 表示无超时时间] 
    .before    foo,请求发送前的处理函数,类似于jQuery的beforeSend函数
    .progress  foo,ProgressEvent回调处理函数
    .credentials bol,表示跨域请求时是否需要使用凭证
    .emulateHTTP bol,发送PUT,PATCH,DELETE请求时以HTTP POST的方式发送 
      若Web服务器无法处理PUT,PATCH和DELETE这种REST风格的请求,可启用enulateHTTP选项。
      启用该选项后,请求会以普通的POST方法发出,
      并且HTTP头信息的X-HTTP-Method-Override属性会设置为实际的HTTP方法。
      Vue.http.options.emulateHTTP = true;
    .emulateJSON bok,将request body以application/x-www-form-urlencoded content type发送 
      如果Web服务器无法处理编码为application/json的请求,可启用emulateJSON选项。
      启用后,请求会以'application/x-www-form-urlencoded'作为MIME type,就像普通的HTML表单一样 
      Vue.http.options.emulateJSON = true;
'axios'基于Promise的HTTP库,可用在浏览器和NodeJS中 
  PS: 类似'vue-resource'的插件,'vue2.0+'不再对vue-resource更新,而推荐使用axios 
    基于 Promise 的 HTTP 请求客户端,可同时在浏览器和 NodeJS 中使用 
功能特性 
  在浏览器中发送 XMLHttpRequests 请求
  在NodeJS中发送 http请求
  支持 Promise API
  拦截请求和响应
  转换请求和响应数据
  取消请求
  自动转换 JSON 数据
  客户端支持保护安全免受 CSRF/XSRF 攻击
使用 
  $ npm i -S axios // 安装 axios
  // 入口 main.js 中 
  import axios from 'axios' // 引入axios 
  // 使用全局对象 axios 进行http请求 
API 
  axios.get('url',{
    // 可选,配置参数
    params: {  // 查询参数 
      key1: val1
      ..
    } 
  })
  axios.post('url',{
    // 可选,请求参数  
  })
  axios.delete() 
  axios.put() 
  axios.patch() 
  axios.head() 
  ...
  axios.request(config)
  axios({   // 通用方法 
    url: 'url'
    ,baseURL: 'https://some-domain.com/api/' // 将被添加到`url`前面,除非`url`是绝对的 
    ,params: {  // 与请求一起发送的URL参数,必须是纯对象或URLSearchParams对象
      ID: 12345
    }
    ,paramsSerializer: function(params) { // 序列化`params` 
      return Qs.stringify(params, {arrayFormat: 'brackets'})
    }
    ,data: {    // 作为请求主体发送的数据,仅适用于'PUT','POST'和'PATCH'
      key1: val1
      ,key2: val2
    }
    ,transformRequest: [ // 在请求数据发送到服务器之前对其进行更改 
      // 只适用于请求方法'PUT','POST'和'PATCH'
      function (data) { 
        return data;
        // 数组中的最后一个函数必须返回一个字符串,一个 ArrayBuffer或一个 Stream
      }
      ..
    ]
    ,method: 'post' // 默认get 
    ,headers: { // 自定义 headers
      'X-Requested-With': 'XMLHttpRequest'
    }
    ,timeout: 1000 // 指定请求超时之前的毫秒数,超过请求将被中止 
    ,withCredentials: false // 指示是否跨站点访问控制请求 
    ,transformResponse: [ // 允许在 then / catch之前对响应数据进行更改
      function (data) { 
        return data;
      }
    ]
    ,auth: { // 表示应该使用 HTTP 基本认证,并提供凭据 
      // 这将设置一个`Authorization'头,覆盖任何现有的`Authorization'自定义头,使用`headers`设置。
      username: 'janedoe',
      password: 's00pers3cret'
    },
    ,responseType: 'json', // 表示服务器将响应的数据类型
      // 'json'
      // 'text'
      // 'document'
      // 'blob'
      // 'arraybuffer'
      // 'stream'
    ,adapter: function (config) { // 自定义处理请求,返回一个promise并提供一个有效的响应 
      /* ... */
    }
    ,onUploadProgress: function (progressEvent) { // 处理上传的进度事件
      // 使用本地 progress 事件做任何你想要做的
    }
    ,onDownloadProgress: function (progressEvent) { // 处理下载的进度事件
      // 
    }
    ,xsrfCookieName: 'XSRF-TOKEN' // 用作 xsrf 令牌的值的cookie的名称
    ,xsrfHeaderName: 'X-XSRF-TOKEN' // 携带xsrf令牌值的http头的名称
    ,maxContentLength: 2000 // 定义允许的http响应内容的最大大小
    ,validateStatus: function (status) { // 定义是否解析或拒绝给定的promise
      return status >= 200 && status < 300; // default
      // HTTP响应状态码。
      // 如果`validateStatus`返回`true`或被设置为`null` promise将被解析;否则,promise将被拒绝 
    }
    ,maxRedirects: 5 // 定义在node.js中要遵循的重定向的最大数量,如果设置为0,则不会遵循重定向 
    // `httpAgent`和`httpsAgent`用于定义在node.js中分别执行http和https请求时使用的自定义代理。
      // 允许配置类似`keepAlive`的选项, 默认情况下不启用。
    ,httpAgent: new http.Agent({ 
      keepAlive: true 
    })
    ,httpsAgent: new https.Agent({ 
      keepAlive: true 
    })
    ,proxy: { // 定义代理服务器的主机名和端口
      // 将设置一个`Proxy-Authorization` header,
      // 覆盖任何使用`headers`设置的现有的`Proxy-Authorization` 自定义 headers。
      host: '127.0.0.1',
      port: 9000,
      auth: { // 表示HTTP Basic auth应该用于连接到代理,并提供credentials 
        username: 'mikeymike',
        password: 'rapunz3l'
      }
    }
    ,cancelToken: new CancelToken(function (cancel) { // 指定可用于取消请求的取消令牌
      // 
    })
  })
  axios.all([  // 所有请求完毕  
    axios.get()
    ..
  ])   
  .then(axios.spread(function(acct,perms){
    // 
  }))
  response响应 
    .status      num,
    .statusText  str, 
    .data     obj,
    .headers  obj,
    .config   obj,
  axios.defaults.xx,全局axios默认值 
    .baseURL = 'url';
    .headers.common['Authorization'] = AUTH_TOKEN;
    .headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.interceptors,拦截器,可截取请求或响应在被'then'或'catch'处理之前 
    var tmp = axios.interceptors.request.use(function(config){   //添加请求拦截器
      //在发送请求之前做某事
      return config;
    }
    ,function(error){
      //请求错误时做些事
      return Promise.reject(error);
    });
    var tmp = axios.interceptors.response.use(function(response){ //添加响应拦截器
      //对响应数据做些事
      return response;
    }
    ,function(error){
      //请求错误时做些事
      return Promise.reject(error);
    });
    axios.interceptors.request.eject(tmp) // 删除拦截器 
  处理错误 
    axios.get('/ user / 12345')
    .catch(function(error){
      if(error.response){ //请求已发出,但状态代码落在2xx的范围外  
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } 
      else { // 在设置触发错误的请求时发生了错误 
        console.log('Error',error.message);
      }}
      console.log(error.config);
    });
    可使用'validateStatus'配置选项定义自定义HTTP状态码错误范围 
    axios.get('/ user / 12345',{
      validateStatus：function(status){
        return status < 500; // 仅当状态代码大于或等于500时拒绝
      }}
    })
  使用取消令牌取消请求 
    axios cancel token API基于可取消的promise提议,目前处于阶段1
    可使用 CancelToken.source 工厂创建一个取消令牌,如下所示：
    var CancelToken = axios.CancelToken;
    var source = CancelToken.source();
    
    axios.get('/user/12345', {
      cancelToken: source.token
    })
    .catch(function(thrown) {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      } 
      else {
        // 处理错误
      }
    });

    //取消请求(消息参数是可选的)
    source.cancel('操作被用户取消。');

    还可通过将执行器函数传递给CancelToken构造函数来创建取消令牌：
    var CancelToken = axios.CancelToken;
    var cancel;
    
    axios.get('/ user / 12345',{
      cancelToken：new CancelToken(function executor(c){
        //一个执行器函数接收一个取消函数作为参数
        cancel = c;
      })
    });
    
    // 取消请求
    clear();

    注意：您可以使用相同的取消令牌取消几个请求。
    使用application / x-www-form-urlencoded格式
    默认情况下,axios将JavaScript对象序列化为JSON。 要以应用程序/ x-www-form-urlencoded格式发送数据,您可以使用以下选项之一。
  浏览器 
    在浏览器中,您可以使用 URLSearchParams API,如下所示：
    var params = new URLSearchParams();
    params.append('param1', 'value1');
    params.append('param2', 'value2');
    axios.post('/foo', params);
    请注意,所有浏览器都不支持URLSearchParams,但是有一个 polyfill 可用[确保polyfill全局环境] 
    或可以使用qs库对数据进行编码：
    var qs = require('qs');
    axios.post('/foo', qs.stringify({ 'bar': 123 });
  NodeJS 
    在NOdeJS中,可使用querystring模块,如下所示：
    var querystring = require('querystring');
    axios.post('http://something.com/', querystring.stringify({ foo: 'bar' });
  TypeScript 
    axios包括TypeScript定义。
    import axios from 'axios';
    axios.get('/user?ID=12345');
    axios在很大程度上受到Angular提供的$http服务的启发 
  自定义axios实例 
    var instance = axios.create({   // 使用自定义配置创建axios的新实例 
      baseURL: 'url'
      ,timeout: 1000
      ,headers: {'X-Custom-Header': 'foobar'}
    }) 
    //在实例创建后改变默认值
    instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    // 自定义实例添加拦截器 
    instance.interceptors.request.use(function () {
      // 
    });
--------------------------------------------------------------------------------
'vue-router'前端路由 
  PS: 'vue-router2.x'只适用于'Vue2.x'版本 
引入安装路由 
  <script>引入 
    在Vue后面加载'vue-router',默认自动安装的
    <script src="/path/to/vue.js"></script>
    <script src="/path/to/vue-router.js"></script>
  npm下载安装  
    $ npm i -S vue-router    // npm下载并写入生产依赖 
    // main.js 中引入、安装    
    import VueRouter from "vue-router"; // 引入 vue-router 
    Vue.use(VueRouter); // 安装路由,<script>引入的默认安装了 
配置使用路由 
  // 组件,可从其他文件'import'进来 
  // const Foo = { template: '<div>foo</div>' }  // 组件配置对象
  // const Bar = { template: '<div>bar</div>' }  
  const routerMap = new VueRouter({  // 配置路由Map  
    // .. 
  }) 
  const app = new Vue({ // 在Vue根实例中注册,从而让整个应用都有路由功能   
    el : '#app'  // 挂载点方式1 
    ,router : routerMap    // 注册 
    
  }) // .$mount('#app') // 挂载点方式2 
router = new VueRouter({  // 路由实例'router instance'  
  routes: [ // 映射表 
    {   // 一个路由对象,也叫一个路由记录 
      path: '/boo'         // 定义地址URL  
        PS: 当同一个路径匹配多个路由时,则先定义的路由优先级高 
        '/path/:param' 动态路径参数路由,配任意的'/path/xx'[类似于于地址中的查询字符串] 
          PS: '/xx'必须存在否则匹配不到? 
          this.$route.params 在组件内获取当前的具体的路径的对象 
            在HTML中可直接使用 {{$route.params.xx}} 来取匹配到的地址参数 
            在一个路由中设置多段路径参数 
              模式             匹配路径       $route.params
              /a/:aoo         /a/bar         { aoo: 'bar' }
              /a/:aoo/b/:boo  /a/bar/b/123   { aoo: 'bar', boo: 123 }
          this.$route.query  [若URL中有查询参数]获取查询参数 
            对于路径 /foo?user=1,则有 $route.query.user == 1,若没有查询参数,则是个空对象 
          this.$route.hash   当前路由的hash值,若无hash,则为空字符串 
          this.$route.path  
          响应路由参数的变化 
            当使用路由参数时,例如从 /user/foo 导航到 user/bar,原来的组件实例会被复用 
            因为两个路由都渲染同个组件,比起销毁再创建,复用则显得更加高效。
            不过,这也意味着组件的生命周期钩子不会再被调用。
            复用组件时,想对路由参数的变化作出响应的话,你可以简单地 watch[监测变化]$route对象 
            const User = {
              template: '...',
              watch: {
                '$route' (to, from) {
                  // 对路由变化作出响应...
                }
              }
            }
      ,name: 'routername'  // 命名路由,在<router-link>中指定  
        通过名称来标识路由显得更方便 
        Example: 
        通过给<router-link>的'to'属性传一对象来链接到一个命名路由
        <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
        这跟代码调用 router.push() 是一回事:
        router.push({ name: 'user', params: { userId: 123 }})
        这两种方式都会把路由导航到 /user/123 路径 
      ,component: cptA  // 当只有一个组件时可直接使用组件名  
      ,components: {    // 展示的组件 
        default: cptA,
        <viewname> : cptB, // 命名视图,在<router-view name="viewname">中指定  
        // ..
      }
      ,children: [   // 路由嵌套,子路由 
        // PS: 被路由加载的组件同样可包含自己的<router-view> 
        {  // 子路由记录 
          path: 'aa',     // 相对于当前路由记录的路径 
          component: cptA,
        }
        ,{
          path: 'bb',
          component: cptB,
        }
        ...
        Example: 
          const User = {
            template: `
            <div class="user">
            <h2>User {{ $route.params.id }}</h2>
            <router-view></router-view>
            </div>
            `
          }
          const router = new VueRouter({
            routes: [
              { 
                path: '/user/:id', 
                component: User, // 需在该组件的HTML中定义<router-view>
                children: [ 
                  {
                    // 当 /user/:id/profile 匹配成功,
                    // UserProfile 会被渲染在 User 的 <router-view> 中
                    path: 'profile',
                    component: UserProfile
                  },
                  {
                    // 当 /user/:id/posts 匹配成功
                    // UserPosts 会被渲染在 User 的 <router-view> 中
                    path: 'posts',
                    component: UserPosts
                  }
                ]
              }
            ]
          })  
          基于上面的配置,访问'/user/foo'时,User的出口是不会渲染任何东西,
          因为没有匹配到合适的子路由,若想要渲染点什么,可以提供一个空的子路由: 
          const router = new VueRouter({
            routes: [
              {
                path: '/user/:id', 
                component: User,
                children: [
                  // 当 /user/:id 匹配成功,
                  // UserHome 会被渲染在 User 的 <router-view> 中
                  { path: '', component: UserHome },
                  
                  // ... 其他子路由 
                ]
              }
            ]
          })
      ]   
      ,redirect: '/coo' // 重定向,地址和内容都变化 
        PS: 如当访问'/a'时,URL将会被替换成'/b',且匹配路由也为'/b' 
        redirect: {  // 使用对象进行配置 
           name: 'foo' // 重定向的目标也可以是一个命名的路由 : 
         }
        redirect: function(to){ // 使用方法,动态返回重定向目标 
          // to  目标路由
          return   ;// 重定向的字符串路径/路径对象
        },
      ,alias: '/b'      // 别名,地址不变内容变化   
        可自由地将UI结构映射到任意的URL,而不受限于配置的嵌套路由结构 
        若'/a'的别名是'/b',即访问'/b'时,URL保持为'/b',但路由匹配为'/a',就像访问'/a'
      ,meta: {}  // 路由元信息  
        {
          requiresAuth: true 
        }
        一个路由匹配到的所有路由记录会暴露为 $route.matched 数组,
        通过遍历 $route.matched 来检查路由记录中的 meta 字段。
        下面例子展示在全局导航钩子中检查 meta 字段：
        router.beforeEach((to, from, next) => {
          if (to.matched.some(record => record.meta.requiresAuth)) {
            // this route requires auth, check if logged in
            // if not, redirect to login page.
            if (!auth.loggedIn()) {
              next({
                path: '/login',
                query: { redirect: to.fullPath }
              })
            } else {
              next()
            }
          } else {
            next() // 确保一定要调用 next()
          }
        })      
      ,beforeEnter: (to, from, next) => {  // 路由钩子 
        // 与全局 before 钩子的方法参数是一样 
      } 
    }
    ... 
  ]
  ,mode: '' // 模式 
    'hash'      默认值,使用URL的hash来模拟一个完整的URL 
      利用当hash改变时,页面不会重新加载的特性  
    'history'   利用'history.pushState'API来完成URL跳转而无须重新加载页面 
    "abstract"  支持所有JS运行环境,如NodeJS服务器端 
      若发现无浏览器的 API,路由会自动强制进入这个模式 
  ,base: str  // 应用的基路径,默认为"/" 
    如果整个单页应用服务在 /app/ 下,然后 base 就应该设为 "/app/"。
  ,linkActiveClass: str // 全局配置<router-link>的默认激活class类名
    默认值:"router-link-active"
  ,scrollBehavior: function(to,from,savedPosition){ // 滚动行为及位置 
    // PS:  只在'history'模式下可用
    // to   路由对象
    // from 路由对象
    // savedPosition  当且仅当'popstate'导航[通过浏览器的 前进/后退 按钮触发]时才可用 
    return obj;  // 期望滚动的位置对象 
      若返回一个假的布尔值,或者是一个空对象,那么不会发生滚动 
      { x: num, y: num }  到具体位置 
        scrollBehavior (to, from, savedPosition) {
          if (savedPosition) {
            return savedPosition
          } else {
            return { x: 0, y: 0 }
          }
        }
      { selector: str }   模拟滚动到锚点的行为 
        scrollBehavior (to, from, savedPosition) {
          if (to.hash) {
            return {
              selector: to.hash
            }
          }
        }
  }
})  
标签 
  <router-view> // 渲染路径匹配到的视图组件 
    PS: 在挂载点范围内都可以 [?] 
    name="viewname"   具名视图,对应路由实例中路由名,默认值"default"  
    配合<transition></transition>进行视图过渡效果 
    配合<keep-alive></keep-alive>进行缓存 
    如果两个结合一起用,要确保在内层使用<keep-alive> 
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
  <router-link> // 路由导航: 在页面中指定跳转的链接 
    PS: <router-link>默认会被渲染成一个<a>标签 
    to=""   指定链接地址 
      to="pathStr"   // 指定路径 
        to="aoo"    // 相当于'./aoo' 
        to="/aoo"   // 相对于根目录  
      :to="val"      // 动态绑定 
        :to={        // 传入对象 
          name: 'aoo'   // 具名路由   
          ,path: 'aoo'  // 跳转路径,与具名路由互斥 
          ,param: {     // 路由参数 
            key1 : val1
            ...
          }
        }  
        :to="'aoo'"  
    tag='name'  指定<router-link>渲染成的标签,如'div'、'li'等 
    replace="bol"  导航后是否留下history记录 
    append="bol"   是否在当前跳转前加上该页路径 
      从'/a'导航到一个相对路径'b',若未配置append,则路径为'/b',若配了,则为'/a/b' 
    active-class="aoo"   设置链接激活时的CSS类名 
      PS: 当<router-link>被激活时会被添加一个class,默认为"router-link-active" 
        对应的路由匹配成功,"router-link-active"class将自动添加  
        可通过此项来自定义class名称 
      默认值可以通过路由的构造选项 linkActiveClass 来全局配置
    exact="bol"     是否激活 
    event="str/arr"  声明可以用来触发导航的事件,默认值'click' 
  ◆配合使用的组件 
  <transition></transition> 实现跳转动画 
    基于路由的动态过渡: 基于当前路由与目标路由的变化关系,动态设置过渡效果 
      <!-- 使用动态的 transition name -->
      <transition :name="transitionName">
      <router-view></router-view>
      </transition>
      // 接着在父组件内
      // watch $route 决定使用哪种过渡
      watch: {
        '$route' (to, from) {
          const toDepth = to.path.split('/').length
          const fromDepth = from.path.split('/').length
          this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
      }
  <keep-alive></keep-alive> 缓存,加快路由切换速度 
API 
  ◆Router实例的属性/方法  
    router.app   配置了router的Vue根实例 
    router.mode  str,路由使用的模式 
    router.currentRoute  当前路由对应的路由信息对象 
    router.beforeResolve(guard) 此时异步组件已经加载完成 '2.5.0+' 
    router.getMatchedComponents(location?)  返回目标位置或是当前路由匹配的组件数组
      是数组的定义/构造类,不是实例,通常在服务端渲染的数据预加载时时候。
    router.resolve(location, current?, append?)   '2.1.0+'
      解析目标位置(格式和 <router-link> 的 to 属性一样),返回包含如下属性的对象：
      {
        location: Location;
        route: Route;
        href: string;
      }
    router.addRoutes(routes) 动态添加更多的路由规则 '2.2.0+' 
      参数必须是一个符合 routes 选项要求的数组。
    router.onReady(callback)  添加一个会在第一次路由跳转完成时被调用的回调函数 '2.2.0+'
      此方法通常用于等待异步的导航钩子完成,比如在进行服务端渲染的时候。
    ★导航钩子 
      PS: '导航'表示路由正在发生改变;导航钩子主要用来拦截导航,让它完成跳转或取消 
    router.beforeEach(function(to, from, next){  // 注册全局before钩子 
      PS: 当一个导航触发时,全局的 before 钩子按照创建顺序调用。
        钩子是异步解析执行,此时导航在所有钩子 resolve 完之前一直处于 等待中。
      to     obj,即将要进入的目标 
      from   obj,当前导航正要离开的路由
      next   foo,需调用该方法来'resolve'该钩子,执行效果依赖'next'方法的调用参数 
        确保要调用'next'方法,否则钩子就不会被'resolved' 
        next()  进行管道中的下一个钩子
          如果全部钩子执行完了,则导航的状态就是'confirmed'确认的 
        next(false)  中断当前的导航
          如果浏览器的URL改变了[可能是用户手动或者浏览器后退按钮],
          那么URL地址会重置到'from'路由对应的地址 
        next('/') / next({ path: '/' }) 跳转到一个不同的地址
          当前的导航被中断,然后进行一个新的导航 
    }) 
    router.afterEach(function(route){  // 注册全局after钩子 
      // after钩子没有next方法,不能改变导航 
    })
    ★编程式的导航 
      PS: 除了使用<router-link>创建<a>标签来定义导航链接,
        还可以借助router的实例方法,通过编写代码来实现。
        vue-router的导航方法'push''replace''go'是效仿 window.history API 
        window.history.pushState、 
        window.history.replaceState 
        window.history.go
        但其在各类路由模式 history、 hash 和 abstract 下表现一致
    router.push(location, onComplete?, onAbort?) 向history栈添加一新的记录,并跳转 
      PS: 当用户点击浏览器后退按钮时,则回到之前的URL 
        当点击<router-link>时,这个方法会在内部调用,
        点击 <router-link :to="..."> 等同于调用 router.push(...) 
      location   字符串路径/描述地址的对象 
        <router-link :to="..."> router.push(...)
      routerMap.push('home') // 字符串
      routerMap.push({ path: 'home' }) // 对象
      routerMap.push({ name: 'user', params: { userId: 123 }}) // 命名的路由
      routerMap.push({ path: 'register', query: { plan: 'private' }})
      // 带查询参数,变成 /register?plan=private
    router.replace(location, onComplete?, onAbort?) 替换掉当前的history记录
      相当于 <router-link :to="..." replace>  
    router.go(<num>) 在history记录中向前多少步,类似 window.history.go(num) 
      Example:
      routerMap.go(1)    // 在浏览器记录中前进一步,等同于 history.forward()
      routerMap.go(-1)   // 后退一步记录,等同于 history.back()
      routerMap.go(3)    // 前进 3 步记录
      routerMap.go(-100)
      routerMap.go(100) // 若history记录不够用,不操作 
    router.back()
    router.forward()  动态的导航到一个新url 
  ◆对组件注入的属性/方法  
  vm.$router // router实例 
  vm.$route  // 当前路由信息对象,可获取当前激活的路由的状态信息  
    PS: 不可变的'immutable',每次成功的导航后都会产生一个新的对象 
    ★出现的位置 
    vm.$route 和 vm.$route watcher 回调,监测变化处理 
    router.match(location) 的返回值 
    导航钩子的参数：
      router.beforeEach((to, from, next) => {
        // to 和 from 都是 路由信息对象
      })
    scrollBehavior 方法的参数:
      scrollBehavior (to, from, savedPosition) {
        // to 和 from 都是 路由信息对象
      }
    ★属性 
    .path   str,对应当前路由的路径,总是解析为绝对路径,如 "/foo/bar"。
    .params obj,包含了 动态片段 和 全匹配片段,如果没有路由参数,就是一个空对象 
    .query  obj,表示URL查询参数,若无查询参数,则为空对象 
    .hash   str,当前路由的hash值,若无hash值,则为空字符串 
    .fullPath  str,完成解析后的URL,包含查询参数和hash的完整路径 
    .matched  arr,包含当前路由的所有嵌套路径片段的路由记录的数组
    .name     当前路由的名称,如果有的话    
  ◆组件新增配置  
  ,beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前,组件实例还没被创建
    beforeRouteEnter 钩子 不能 访问 this,因为钩子在导航确认前被调用,因此即将登场的新组件还没被创建。
    不过,你可以通过传一个回调给 next来访问组件实例。
    在导航被确认的时候执行回调,并且把组件实例作为回调方法的参数。
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
      })
    }
  }
  ,beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    你可以 在 beforeRouteLeave 中直接访问 this。
    这个 leave 钩子通常用来禁止用户在还未保存修改前突然离开。可以通过 next(false) 来取消导航。
  }
  ,beforeRouteUpdate (to, from, next) { // '2.2+' 
    // 在当前路由改变,但是该组件被复用时调用 
    // 举例来说,对于一个带有动态参数的路径 /foo/:id,在 /foo/1 和 /foo/2 之间跳转的时候,
    // 由于会渲染同样的 Foo 组件,因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  }
路由懒加载 
  PS: 把不同路由对应的组件分割成不同的代码块,当路由被访问的时候才加载对应组件 
    结合Vue的'异步组件'和Webpack的'code splitting feature'实现路由组件的懒加载 
  定义一个能够被webpack自动代码分割的异步组件
    一: 将异步组件定义为返回一个 Promise 的工厂函数[该函数返回的Promise应该 resolve 组件本身] 
      const aoo = () => Promise.resolve({ /*  组件定义对象 */ })
    二: 在webpack2中,使用动态import语法来定义代码分块点'split point' 
      import('./aoo.vue') // returns a Promise 
      如果使用的是babel,需添加'syntax-dynamic-import'插件,才能使babel可以正确地解析语法
    由一、二得到: const aoo = () => import('./aoo.vue')
    三: 在路由配置中像往常一样使用 
    const router = new VueRouter({
      routes: [
        { 
          path: '/foo'
          ,component: aoo 
        }
      ]
    })
  把组件按组分块
    有时候想把某个路由下的所有组件都打包在同个异步块(chunk)中。
    需要使用命名 chunk,一个特殊的注释语法来提供'chunk name' ['webpack2.4+'] 
    const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
    const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
    const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
    webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。
异步组件 ['vue-router2.4.0+'] 
  const AsyncComp = () => ({  
    component: import('./MyComp.vue') // 需加载的组件,应是一 Promise 
    ,loading: LoadingComp // loading 时应当渲染的组件
    ,error: ErrorComp // 出错时渲染的组件
    ,delay: 200 // 渲染 loading 组件前的等待时间,默认200ms 
    ,timeout: 3000 // 最长等待时间 
      // 超出此时间则渲染 error 组件。默认：Infinity
  })
  const routes = [
    { 
      path: '/test', 
      component: (resolve) => require(['./components/test.vue'], resolve) 
    },
    { 
      path: '/index', 
      component: (resolve) => require(['./components/index.vue'], resolve) 
    }
  ];
--------------------------------------------------------------------------------
'Vuex'状态管理 
引入安装 
  <script>引入 
    在Vue之后引入vuex会进行自动安装 
    <script src="/path/to/vue.js"></script> 
    <script src="/path/to/vuex.js"></script> 
  npm安装 
    $ npm i -S vuex     // 下载并写入配置    
    // main.js 中引入、安装
    import Vuex from 'vuex'   // 引入vuex 
    Vue.use(Vuex)             // 安装    
使用  
  let store = new Vuex.store({}) // 实例化数据中心store 
  new Vue({  // 顶层组件实例 
    el: ''
    ,store: store // 组件中注册,
    // store实例会注入到根组件下的所有子组件中 
    // 子组件中使用 vm.$store 进行操作   
  });
store = new Vuex.store({ // 实例化数据中心'store'  
  state: {  // 状态,用于储存数据  
    stateData1: val1 
    // .. 
  }
  ,mutations: { // 函数集,一般用于直接操作'state'中的数据 
    foo: function(state[,data]){  // 不可执行异步操作 
      // state 储存数据的state对象 
      // data  commit()传入的数据 
    }
    // ..
  }
  ,getters: { // 在组件中使用以获得'state'中的数据 
    // PS: 相当于'computed',对'state'的处理返回
    getData1: function(state,getters){
      // state   储存数据的state对象 
      // getters 当前getters对象 
      return state.xx;
    }
    // 可通过让 getter 返回一个函数,来实现给 getter 传参 
    // store.getters.getData2(2) 传参调用 
    ,getData2: function(state, getters){
      return function(id){
        return state.todos.find(todo => todo.id === id)
      };
    }
    // .. 
  }
  ,actions: {   // 函数集,执行'mutations'中的方法  
    goo: function(context[,data]){ // 不能直接更改'state',常和后端API交互[异步操作]
      // context 表示该实例'store' 
        // 可执行'mutations'中的函数,context.commit('foo',data1) 
        // 也可通过 context.state 和 context.getters 来获取 state 和 getters
      // data    dispatch()传入的数据 
    }
    // ..
  }
})  
API 
  ◆组件注入的属性/方法 
  ★this.$store  // 数据中心对象 
    PS: 组件中: 一般通过'computed'属性来承接 this.$store.state 中的数据   
  this.$store.state.xx   // 使用数据 
  this.$store.getters.xx // 使用数据 
  thi.$store.commit('foo'[,data])   // 执行'mutations'中的方法 
  thi.$store.dispatch('goo'[,data]) // 执行'actions'中的方法 
采用模块的状态管理: 每个模块维护一套状态,然后合并到一总数据中心中 
  const moduleA = {
    state : {}
    ,getters : {}
    ,actions : {}
    ,mutations : {}
  }
  const moduleB = {
    state : {}
    ,getters : {}
    ,actions : {}
    ,mutations : {}
  }
  const store = new Vuex.store({
    modules : {
      aoo: moduleA
      ,boo: moduleB
    }
    ,mutations: {  // 公用的 mutations 
      // 
    }
    ...
  })
  // store.state.aoo  moduleA中的state对象 
  // store.state.boo  moduleB中的state对象 
--------------------------------------------------------------------------------
'vue-validator'表单验证 
'vue-touch'移动端 


