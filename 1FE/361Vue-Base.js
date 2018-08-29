VueJS: 数据驱动、组件化开发模式的渐进式前端类MVVM框架[IE9+] 
  PS: 压缩版无错误提示和警告;
    API设计受AngularJS、KnockoutJS、RactiveJS和RivetsJS影响;
    Vue受MVVM启发,但未完全遵循;
  DefDec:  
    标签属性、标签名、事件名不区分大小写 
--------------------------------------------------------------------------------
安装&启动 
<script>标签引入: 'Vue'被注册为一个全局变量   
  异步组件 
    在不使用脚手架的情况下将一个个组件分别独立成一个个html文件,
    再去引用注册它们,也是可以实现的,但一般不推荐这样做
    vue.js 可以将异步组件定义为一个工厂函数
    Example: 
      // head.html 
      <div> 这是头部  </div>
      // index.html 中异步引入 head.html 作为组件
      <div id="app1">
        <head-com></head-com>
      </div>
      Vue.component('head-com',function (rs,rj) {
        http.get("./head.html")
        .then(function (res) {
          rs({ template: res })
        });
      });
      var app1 = new Vue({
        el: '#app1'
      });
npm安装 
  $ npm i -S vue // 安装最新稳定版本 
--------------------------------------------------------------------------------
'vue-cli'为单页面应用快速搭建的脚手架 
  为现代前端工作流提供了'batteries-included'的构建设置
  带有热重载、保存时'lint'校验,及生产环境可用的构建版本 
  使用要求: NodeJS大于'4.0'版本; 安装Git,用于下载代码  
项目创建及开发使用步骤 
◆工具安装[仅安装一次即可] 
  $ npm i -g webpack  // 全局安装webpack 
  $ npm i -g vue-cli  // 全局安装vue-cli 
    $ vue -V    // 查看 vue-cli 版本 
◆初始化项目 
  $ vue list  // 查看官方提供的'template'模版方案 
    browserify         
    browserify-simple  
    pwa               
    simple            
    webpack           
    webpack-simple    
  $ vue init <模版方案> <项目文件夹名称>  // 创建Vue项目  
  $ npm i     // 根据'package.json'安装依赖 
  ★可选
  $ npm i -S vue-router vuex axios  // 安装相关插件 
    vue-resource
  $ npm i -D less less-loader       // 安装相关插件 
◆启动项目/构建发布  
  $ npm run build   // 运行构建,生成生产环境可发布的代码 
  $ npm run dev     // 启动测试服务器  
    在'dev'命令中增加 --open --watch 选项,及时打开网页并启用实时监控 
webpack模版项目目录及文件说明‹2017.11›:  
  PS: 进行了部分更改 
  build         // 构建的配置文件 
    build.js 
      'use strict'
      require('./check-versions')()  
      process.env.NODE_ENV = 'production'
      
      const ora = require('ora') //  loading 插件
      const rm = require('rimraf')
      const path = require('path')
      const chalk = require('chalk')
      const webpack = require('webpack')
      const config = require('../config')
      const webpackConfig = require('./webpack.prod.conf')
      
      const spinner = ora('building for production...') // 使用 ora 打印出 loading + log
      spinner.start() // 开始 loading 动画
      
      // 删除原文件后再打包 
      rm(
        path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
        ,err => {
          if (err) throw err
          //  开始 webpack 的编译
          webpack(
            webpackConfig
            ,function (err, stats) {
              spinner.stop()
              if (err) throw err
              process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
              }) + '\n\n')
            
              if (stats.hasErrors()) {
                console.log(chalk.red('  Build failed with errors.\n'))
                process.exit(1)
              }
            
              console.log(chalk.cyan('  Build complete.\n'))
              console.log(chalk.yellow(
                '  Tip: built files are meant to be served over an HTTP server.\n' +
                '  Opening index.html over file:// won\'t work.\n'
              ))
            }
          )
        }
      )
    check-versions.js  // 检查 Node 和 npm 版本 
      'use strict'
      const chalk = require('chalk')
      const semver = require('semver')
      const packageConfig = require('../package.json')
      const shell = require('shelljs')
      function exec (cmd) {
        return require('child_process').execSync(cmd).toString().trim()
      }
      
      const versionRequirements = [{
        name: 'node'
        ,currentVersion: semver.clean(process.version)
        ,versionRequirement: packageConfig.engines.node
      }]
      
      if (shell.which('npm')) {
        versionRequirements.push({
          name: 'npm',
          currentVersion: exec('npm --version'),
          versionRequirement: packageConfig.engines.npm
        })
      }
      
      module.exports = function () {
        const warnings = []
        for (let i = 0; i < versionRequirements.length; i++) {
          const mod = versionRequirements[i]
          if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
            warnings.push(
              mod.name + ': ' +
              chalk.red(mod.currentVersion) + ' should be ' +
              chalk.green(mod.versionRequirement)
            )
          }
        }
        
        if (warnings.length) {
          console.log('')
          console.log(chalk.yellow('To use this template, you must update following to modules:'))
          console.log()
          for (let i = 0; i < warnings.length; i++) {
            const warning = warnings[i]
            console.log('  ' + warning)
          }
          console.log()
          process.exit(1)
        }
      }
    utils.js 
      'use strict'
      const path = require('path')
      const config = require('../config')
      const ExtractTextPlugin = require('extract-text-webpack-plugin')
      const pkg = require('../package.json')

      exports.assetsPath = function (_path) {
        const assetsSubDirectory = 
        process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory
        return path.posix.join(assetsSubDirectory, _path)
      }

      exports.cssLoaders = function (options) {
        options = options || {}

        const cssLoader = {
          loader: 'css-loader',
          options: { sourceMap: options.sourceMap }
        }

        var postcssLoader = {
          loader: 'postcss-loader',
          options: { sourceMap: options.sourceMap }
        }

        // generate loader string to be used with extract text plugin
        function generateLoaders (loader, loaderOptions) {
          const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
          if (loader) {
            loaders.push({
              loader: loader + '-loader',
              options: Object.assign({}, loaderOptions, {
                sourceMap: options.sourceMap
              })
            })
          }

          // Extract CSS when that option is specified
          // (which is the case during production build)
          if (options.extract) {
            return ExtractTextPlugin.extract({
              use: loaders,
              fallback: 'vue-style-loader'
            })
          } 
          else {
            return ['vue-style-loader'].concat(loaders)
          }
        }

        // https://vue-loader.vuejs.org/en/configurations/extract-css.html
        return {
          css: generateLoaders()
          ,postcss: generateLoaders()
          ,less: generateLoaders('less')
          ,sass: generateLoaders('sass', { indentedSyntax: true })
          ,scss: generateLoaders('sass')
          ,stylus: generateLoaders('stylus')
          ,styl: generateLoaders('stylus')
        }
      }

      // Generate loaders for standalone style files (outside of .vue)
      exports.styleLoaders = function (options) {
        const output = []
        const loaders = exports.cssLoaders(options)
        for (const extension in loaders) {
          const loader = loaders[extension]
          output.push({
            test: new RegExp('\\.' + extension + '$')
            ,use: loader
          })
        }
        return output
      }

      exports.createNotifierCallback = function () {
        const notifier = require('node-notifier')

        return (severity, errors) => {
          if (severity !== 'error') {
            return
          }
          const error = errors[0]

          const filename = error.file && error.file.split('!').pop()
          notifier.notify({
            title: pkg.name
            ,message: severity + ': ' + error.name
            ,subtitle: filename || ''
            ,icon: path.join(__dirname, 'logo.png')
          })
        }
      }
    vue-loader.conf.js 
      'use strict'
      const utils = require('./utils')
      const config = require('../config')
      const isProduction = process.env.NODE_ENV === 'production'
      const sourceMapEnabled = isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap
      
      module.exports = {
        loaders: utils.cssLoaders({
          sourceMap: sourceMapEnabled
          ,extract: isProduction
        })
        ,cssSourceMap: sourceMapEnabled
        ,cacheBusting: config.dev.cacheBusting
        ,transformToRequire: {
          video: 'src'
          ,source: 'src'
          ,img: 'src'
          ,image: 'xlink:href'
        }
      }
    webpack.base.conf.js  //  webpack 基础配置 
      'use strict'
      const path = require('path')        // 使用 NodeJS 自带的文件路径插件
      const utils = require('./utils')    // 一些小工具
      const config = require('../config') // config/index.js
      const vueLoaderConfig = require('./vue-loader.conf')
      
      function resolve (dir) { // 拼接工作区路径为一个绝对路径 
        return path.join(__dirname, '..', dir)
      }
      
      module.exports = {
        context: path.resolve(__dirname, '../')
        ,entry: {
          app: './src/main.js',
        }
        ,output: {
          // 编译输出的静态资源根路径
          path: config.build.assetsRoot
          // 编译输出的文件名
          ,filename: '[name].js'
          // 正式发布环境下编译输出的上线路径的根路径
          ,publicPath: process.env.NODE_ENV === 'production'
          ? config.build.assetsPublicPath
          : config.dev.assetsPublicPath
        }
        ,resolve: {
          // 自动补全的扩展名
          extensions: ['.js', '.vue', '.json']
          ,alias: {
            // 默认路径代理,例如 import Vue from 'vue',会自动到 'vue/dist/vue.common.js'中寻找
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
          }
        }
        ,module: {
          rules: [
            { test: /\.vue$/
              ,loader: 'vue-loader'
              ,options: vueLoaderConfig
            }
            ,{ test: /\.js$/
              ,loader: 'babel-loader'
              ,include: [
                resolve('src')
                ,resolve('test')
              ]
            }
            ,{ test: /\.(png|jpe?g|gif|svg)(\?.*)?$/
              ,loader: 'url-loader'
              ,options: {
                limit: 10000
                ,name: utils.assetsPath('img/[name].[hash:7].[ext]')
              }
            }
            ,{ test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/
              ,loader: 'url-loader'
              ,options: {
                limit: 10000
                ,name: utils.assetsPath('media/[name].[hash:7].[ext]')
              }
            }
            ,{ test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/
              ,loader: 'url-loader'
              ,options: {
                limit: 10000
                ,name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
              }
            }
            // 自定义添加,使用 less  ___ 
            ,{ test: /\.less$/
              ,loader: 'less-loader'
            }
          ]
        }
        // 自定义设置 ___  可选方案  
        ,plugins: [ 
          new webpack.ProvidePlugin({
            // JS中 import $ from 'jquery'不再需要,'$''jQuery'可直接使用  
            '$': "jquery"
            ,'jQuery': "jquery"
          })
        ]
      }
    webpack.dev.conf.js   // 开发环境配置 
      'use strict'
      const utils = require('./utils')
      const webpack = require('webpack')
      const config = require('../config')
      const merge = require('webpack-merge') // 使用 webpack 配置合并插件
      const baseWebpackConfig = require('./webpack.base.conf')
      // 自动生成 html 并且注入到 .html 文件中 
      const HtmlWebpackPlugin = require('html-webpack-plugin')
      const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
      const portfinder = require('portfinder')
      
      // 将 webpack.dev.conf.js 的配置和 webpack.base.conf.js 的配置合并 
      const devWebpackConfig = merge(baseWebpackConfig, {
        module: {
          rules: utils.styleLoaders({ 
            sourceMap: config.dev.cssSourceMap
            ,usePostCSS: true 
          })
        }
        // cheap-module-eval-source-map is faster for development
        ,devtool: config.dev.devtool
        // these devServer options should be customized in /config/index.js
        ,devServer: {
          clientLogLevel: 'warning'
          ,historyApiFallback: true
          ,hot: true
          ,compress: true
          ,host: process.env.HOST || config.dev.host
          ,port: process.env.PORT || config.dev.port
          ,open: config.dev.autoOpenBrowser
          ,overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false
          ,publicPath: config.dev.assetsPublicPath
          ,proxy: config.dev.proxyTable
          ,quiet: true // necessary for FriendlyErrorsPlugin
          ,watchOptions: { poll: config.dev.poll }
        }
        ,plugins: [
          /* definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串 */
          new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
          })
          /* HotModule 插件在页面进行变更的时候只会重回对应的页面模块,不会重绘整个 html 文件 */
          ,new webpack.HotModuleReplacementPlugin()
          ,new webpack.NamedModulesPlugin() // HMR shows correct file names in console on update.
          ,new webpack.NoEmitOnErrorsPlugin()
          // https://github.com/ampedandwired/html-webpack-plugin
          /* 将 index.html 作为入口,注入 html 代码后生成 index.html文件 */
          ,new HtmlWebpackPlugin({
            filename: 'index.html'
            ,template: 'index.html'
            ,inject: true
          })
        ]
      })
      
      module.exports = new Promise((resolve, reject) => {
        portfinder.basePort = process.env.PORT || config.dev.port
        portfinder.getPort((err, port) => {
          if (err) { reject(err) } 
          else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
            // add port to devServer config
            devWebpackConfig.devServer.port = port
            
            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
              compilationSuccessInfo: {
                messages: [`Your application is running here: http://${config.dev.host}:${port}`]
              }
              ,onErrors: config.dev.notifyOnErrors
              ? utils.createNotifierCallback()
              : undefined
            }))
            
            resolve(devWebpackConfig)
          }
        })
      })
    webpack.prod.conf.js  // 生产环境配置 
      'use strict'
      const path = require('path')
      const utils = require('./utils')
      const webpack = require('webpack')
      const config = require('../config')
      const merge = require('webpack-merge')
      const baseWebpackConfig = require('./webpack.base.conf')
      const CopyWebpackPlugin = require('copy-webpack-plugin')
      const HtmlWebpackPlugin = require('html-webpack-plugin')
      /* 可提取一些代码并且将它们和文件分离开 */ 
      const ExtractTextPlugin = require('extract-text-webpack-plugin')
      const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
      
      const env = require('../config/prod.env')
      
      /* 合并 webpack.base.conf.js */
      const webpackConfig = merge(baseWebpackConfig, {
        module: {
          rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap
            ,extract: true
            ,usePostCSS: true
          })
        }
        ,devtool: config.build.productionSourceMap ? config.build.devtool : false
        ,output: {
          path: config.build.assetsRoot
          /* 编译输出文件名 */
          // 可在 hash 后加 :6 决定使用几位 hash 值
          ,filename: utils.assetsPath('js/[name].[chunkhash].js')
          // 没有指定输出名的文件输出的文件名
          ,chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
        }
        ,plugins: [
          // http://vuejs.github.io/vue-loader/en/workflow/production.html
          new webpack.DefinePlugin({
            'process.env': env
          })
          // UglifyJs do not support ES6+, you can also use babel-minify for better treeshaking: https://github.com/babel/minify
          ,new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
            ,sourceMap: config.build.productionSourceMap
            ,parallel: true
          })
          // 将css文件分离出来 
          ,new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
            // set the following option to `true` if you want to extract CSS from
            // codesplit chunks into this main css file as well.
            // This will result in *all* of your app's CSS being loaded upfront.
            ,allChunks: false
          })
          // Compress extracted CSS. We are using this plugin so that possible
          // duplicated CSS from different components can be deduped.
          ,new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.productionSourceMap
            ? { safe: true, map: { inline: false } }
            : { safe: true }
          })
          // generate dist index.html with correct asset hash for caching.
          // you can customize output by editing /index.html
          // see https://github.com/ampedandwired/html-webpack-plugin
          ,new HtmlWebpackPlugin({
            filename: config.build.index
            ,template: 'index.html'
            ,inject: true // 是否注入 html (有多重注入方式,可以选择注入的位置) 
            ,minify: {
              removeComments: true
              ,collapseWhitespace: true
              ,removeAttributeQuotes: true
              // more options:
              // https://github.com/kangax/html-minifier#options-quick-reference
            }
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            ,chunksSortMode: 'dependency'
          })
          // keep module.id stable when vender modules does not change
          ,new webpack.HashedModuleIdsPlugin()
          // enable scope hoisting
          ,new webpack.optimize.ModuleConcatenationPlugin()
          // split vendor js into its own file
          ,new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
            ,minChunks: function (module) {
              // any required modules inside node_modules are extracted to vendor
              return (
                module.resource && /\.js$/.test(module.resource) 
                && module.resource.indexOf(
                  path.join(__dirname, '../node_modules')
                ) === 0
              )
            }
          })
          // extract webpack runtime and module manifest to its own file in order to
          // prevent vendor hash from being updated whenever app bundle is updated
          ,new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
            ,minChunks: Infinity
          })
          // This instance extracts shared chunks from code splitted chunks and bundles them
          // in a separate chunk, similar to the vendor chunk
          // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
          ,new webpack.optimize.CommonsChunkPlugin({
            name: 'app'
            ,async: 'vendor-async'
            ,children: true
            ,minChunks: 3
          })
          
          // copy custom static assets
          ,new CopyWebpackPlugin([ {
            from: path.resolve(__dirname, '../static')
            ,to: config.build.assetsSubDirectory
            ,ignore: ['.*']
          }])
        ]
      })
      
      // 开启 gzip 的情况下使用下方的配置 
      if (config.build.productionGzip) {
        const CompressionWebpackPlugin = require('compression-webpack-plugin')
        
        /* 向webpackconfig.plugins中加入下方的插件 */
        /* 使用 compression-webpack-plugin 插件进行压缩 */
        webpackConfig.plugins.push( new CompressionWebpackPlugin({
          asset: '[path].gz[query]'
          ,algorithm: 'gzip'
          ,test: new RegExp( 
            '\\.(' 
            + config.build.productionGzipExtensions.join('|') 
            + ')$' 
          )
          ,threshold: 10240
          ,minRatio: 0.8
        }))
      }
      
      if (config.build.bundleAnalyzerReport) {
        const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
        webpackConfig.plugins.push(new BundleAnalyzerPlugin())
      }
      
      module.exports = webpackConfig
  config        // webpack 的配置文件
    dev.env.js 
      'use strict'
      const merge = require('webpack-merge')
      const prodEnv = require('./prod.env')
      
      module.exports = merge(prodEnv, {
        NODE_ENV: '"development"'
      })
    index.js 
      'use strict'
      // Template version: 1.2.4
      // see http://vuejs-templates.github.io/webpack for documentation.

      const path = require('path')

      module.exports = {
        dev: { // 开发环境 
          // Paths
          assetsSubDirectory: 'static', // 编译输出的二级目录
          assetsPublicPath: '/', // 编译发布的根目录,可配置为资源服务器域名或 CDN 域名
          proxyTable: {}, // 代理设置 
            // '/api/': 'http://localhost:8081' // 即访问'/api'则相当于访问后面指定的地址 

          // Various Dev Server settings
          host: 'localhost', // can be overwritten by process.env.HOST
          // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
          port: 8080,  // 运行测试页面的端口
          autoOpenBrowser: false,
          errorOverlay: true,
          notifyOnErrors: true,
          poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

          // Use Eslint Loader?
          // If true, your code will be linted during bundling and
          // linting errors and warnings will be shown in the console.
          useEslint: true,
          // If true, eslint errors and warnings will also be shown in the error overlay
          // in the browser.
          showEslintErrorsInOverlay: false,

          /**
           * Source Maps
           */

          // https://webpack.js.org/configuration/devtool/#development
          devtool: 'eval-source-map',

          // If you have problems debugging vue-files in devtools,
          // set this to false - it *may* help
          // https://vue-loader.vuejs.org/en/options.html#cachebusting
          cacheBusting: true,

          // CSS Sourcemaps off by default because relative paths are "buggy"
          // with this option, according to the CSS-Loader README
          // (https://github.com/webpack/css-loader#sourcemaps)
          // In our experience, they generally work as expected,
          // just be aware of this issue when enabling this option.
          cssSourceMap: false, // 是否开启 cssSourceMap(因为bug,此选项默认关闭) 
        },
        build: { // 生产环境 
          // Template for index.html
          index: path.resolve(__dirname, '../dist/index.html'),

          // Paths
          // 编译输出的静态资源路径
          assetsRoot: path.resolve(__dirname, '../dist'),
          // 编译输出的二级目录
          assetsSubDirectory: 'static',
          // 编译发布的根目录,可配置为资源服务器域名或 CDN 域名
          assetsPublicPath: '/',

          /**
           * Source Maps
           */

          productionSourceMap: true,
          // https://webpack.js.org/configuration/devtool/#production
          devtool: '#source-map',

          // Gzip off by default as many popular static hosts such as
          // Surge or Netlify already gzip all static assets for you.
          // Before setting to `true`, make sure to:
          // npm install --save-dev compression-webpack-plugin
          productionGzip: false, // 是否开启 gzip
          // 需要使用 gzip 压缩的文件扩展名
          productionGzipExtensions: ['js', 'css'],

          // Run the build command with an extra argument to
          // View the bundle analyzer report after build finishes:
          // `npm run build --report`
          // Set to `true` or `false` to always turn it on or off
          bundleAnalyzerReport: process.env.npm_config_report
        }
      }
    prod.env.js 
      'use strict'
      module.exports = {
        NODE_ENV: '"production"'
      }
  dist          // 打包构建好的代码 
    static 
    index.html 
  node_modules  // node模块
  src           // 开发目录 
    assets    // 资源目录  
      imgs 
      data 
      plugs 
      scripts 
      styles 
    cpts      // 公用组件 
      xx.vue 
      ... 
    pages     // 页面划分 
      member 
        access.vue
        xxx.vue 
        ...
      news   
        access.vue
        xxx.vue 
        ...
      ..
    router    // 路由
    scripts   // 自定义脚本 
    store     // 状态管理中心 
    styles    // 自定义样式 
    App.vue   // 根组件   
    main.js        // 入口JS 
  static        // 静态文件夹 
    src目录下的资源只能import或require,
    而该文件夹下的文件可直接在HTML中引入,
    最终打包到'dist/static'目录下 
  .babelrc      // babel配置文件 
    {
      "presets": [
        ["env", {
          "modules": false
        }]
        ,"stage-2"
      ]
      ,"plugins": ["transform-runtime"]
    }
  .editorconfig // 编辑器代码风格 
    root = true
    [*]
    charset = utf-8
    indent_style = space
    indent_size = 2
    end_of_line = lf
    insert_final_newline = true
    trim_trailing_whitespace = true
  .gitignore    // 忽略无需git控制的文件,比如node_modules 
    .DS_Store
    node_modules/
    /dist/
    npm-debug.log*
    yarn-debug.log*
    yarn-error.log*
    
    # Editor directories and files
    .idea
    .vscode
    *.suo
    *.ntvs*
    *.njsproj
    *.sln
  .postcssrc.js // 
    // https://github.com/michael-ciniawsky/postcss-load-config
    module.exports = {
      "plugins": {
        // to edit target browsers: use "browserslist" field in package.json
        "postcss-import": {}
        ,"autoprefixer": {}
      }
    }
  index.html    // 
  package-lock.json // 
  package.json      // 
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
-----------------------------------------------------------
Question: 
  如何将自定义的工具JS引入到全局可用,类似引入jQuery[使用Webpack插件] 
    自我决解办法: 将工具函数暴露到全局window对象中 
  当刷新SPA后,如何维持通过之前操作获取的状态? 
    通过 localStorage sessionStorage [Self]
    Vue的Webpack模版 
  不同的路由对应不同的网页标题 
    方法一: 将 <title></title> 标签放置到 app.vue 组件中,通过动态绑定来改变 
      1 组件通信 
      2 vuex 
自我总结: 
  在Vue实例中,所有能通过 this.xx 访问的值,都可在插值中使用 {{xx}},可以该值进行watch 
  对依赖于其他值的值x进行修改 
    如修改用户名,初始值依赖于vuex中的数据,后续需进行修改后提交 
    方法一: 通过设置computed的set来改变x依赖值
    方法二: 将x改为依赖于默认为false的备用值和初始依赖值的并集,通过set来改变备用值 
    方法三: 将x作为data中的值,通过watch初始依赖值来初始化x 
  为原始类型值赋相同值时,'watch'值的变化无响应,改为对象的形式解决  
    data: {
      aoo: 1
    }
    ,watch: {
      aoo: function(){
        console.log('修改了');
      }
    }
    ,methods: {
      foo: function(){
        this.aoo = 1
      }
    }
    改为对象形式: 
    data: {
      aoo: { val: 1 }
    }
    ,watch: {
      aoo: function(){
        console.log('修改了');
      }
    }
    ,methods: {
      foo: function(){
        this.aoo = {val: 1}
      }
    }
---------------------------------------------------------------------以下待整理  



