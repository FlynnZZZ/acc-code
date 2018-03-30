'vue-cli'官方提供的脚手架工具,用于初始化一个Vue项目 
  'vue-cli'使用的优点:
    成熟的Vue项目架构设计;
    热加载本地测试服务器;
    集成打包上线方案;  
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
--------------------------------------------------------------------------------
'vue-router'前端路由 
  PS: 'vue-router2.x'只适用于'Vue2.x'版本 
  原理: 将组件'components'映射到路由'routes',然后指定组件的渲染位置 
  术语&概念: 
    路由记录: 路由映射表'routes'数组中成员的副本[包括children数组的成员]
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
  routes: [ // 路由映射表 
    {   // 一个路由对象,也叫一个路由记录 
      path: str  // 定义地址URL  
        PS: 当同一个路径匹配多个路由时,则先定义的优先级高 
        '/path/:param'  动态路由匹配,配任意的'/path/xx' 
          PS: '/xx'必须存在否则匹配不到 
          动态参数可从 vm.$route.params 中获取 
          响应路由参数的变化 
            当使用路由参数时,在不同参数的动态路由间跳转,组件声明周期钩子不会被调用 
              如从'/user/foo'导航到'user/bar',原来的组件实例会被复用 
              比起销毁再创建,复用则更加高效
            解决复用组件时,响应路由参数的变化
            方式一: 'watch'观察$route对象 
              const User = {
                template: '...',
                watch: {
                  '$route' (to, from) {
                    // 对路由变化作出响应...
                  }
                }
              }
            方式二: beforeRouteUpdate 
              const User = {
                template: '...',
                beforeRouteUpdate (to, from, next) {
                  // react to route changes...
                  // don't forget to call next()
                }
              }
          支持类似正则匹配的高级模式  [moIn 文档] 
            如：可选的动态路径参数、匹配零个或多个、一个或多个,甚至是自定义正则匹配 
            *  任意字符 
              path: '/aoo/*'  // 匹配'/aoo'下的任意路径 
            ?  存在最多一个 
              path: '/aoo/:foo?'  // 可匹配'/aoo'、'/aoo/xxx' 
              path: '/aoo/(foo/)?bar' // 可匹配'/aoo/bar'、'/aoo/foo/bar' 
            \d 数字 
              path: '/aoo/:id(\\d+)'  // ':id'需为纯数字时才会匹配 
      ,name: str        // 可选,命名路由,通过名称来标识路由 
        <router-link to=""> 或 router.push(location) 中指定 
        Example: 
        导航到'/user/123' 
        <router-link :to="{name: 'user',params: {userId: 123}}">User</router-link>
        router.push({name: 'user',params: {userId: 123}})
      // 组件在上一级组件中通过<router-view>指定 
      ,component: cptA  // 可选,展示单组件  
        component: () => import('')  // 懒加载 
      ,components: {    // 可选,具名组件,展示多组件,与component互斥  
        default: cptA
        ,<viewname>: cptB // 命名视图,通过名称来标识视图组件 
          <router-view name="viewname">'name'属性中指定  
        ...
      }
      ,children: [      // 可选,嵌套路由,子路由   
        PS: 被路由加载的组件同样可包含自己的<router-view> 
        {  // 子路由记录 
          path: 'aa',     // 相对于当前路由记录的路径 
            PS: 以'/'开头的路径将从根路径开始  
          component: cptA, // 子路由,在上级路由组件中通过<router-view>指定    
        }
        ,{ path: 'bb', component: cptB }
        // 空字符串,当未匹配到子路由时,使用的子路由 
        ,{ path: '', component: cptX }
        ...
      ]   
      ,redirect: str/obj/foo // 可选,重定向,当前路由最终定位到的路由 
        PS: 如当访问'/a'时,URL将会被替换成'/b',且匹配路由也为'/b' 
        str  具体的路径 
          redirect: '/b'
        obj  通过对象指定一具名的路由 
          redirect: { name: 'foo' } 
        foo  动态返回重定向目标 
          redirect: function(to){  
            // to  目标路由 
            return   ; // 重定向的字符串路径/路径对象
          },
      ,alias: str/strArr     // 可选,别名 
        即该路由视图增加一个对应的路径‹一份视图对应两个路径› 
        '/a'的别名是'/b',即访问'/b'时,URL保持为'/b',但路由匹配为'/a',就像访问'/a' 
      ,props: bol/obj/foo    // 可选,向视图组件传递信息 
        bol  如果props被设置为true,route.params 将会被设置为组件属性 
          const User = {
            props: ['id'],
            template: '<div>User {{ id }}</div>'
          }
          const router = new VueRouter({
            routes: [
              { path: '/user/:id', component: User, props: true }
              
              // 对于包含命名视图的路由,你必须分别为每个命名视图添加props选项：
              {
                path: '/user/:id',
                components: { 
                  default: User, 
                  sidebar: Sidebar 
                },
                props: { 
                  default: true, 
                  sidebar: false 
                }
              }
            ]
          })
        obj  按原样设置为组件属性,当props是静态的时候有用 
          const router = new VueRouter({
            routes: [
              { 
                path: '/promotion/from-newsletter', 
                component: Promotion, 
                props: { newsletterPopup: false } 
              }
            ]
          })
        foo  通过函数返回props的值,可将将静态值与基于路由的值结合 
          const router = new VueRouter({
            routes: [
              { 
                path: '/search', 
                component: SearchUser, 
                props: function(route){
                  return { query: route.query.q };
                }
              }
            ]
          })
          Url: /search?key1=val1 会将 {key1: "val1"} 作为属性传递给SearchUser组件 
      ,meta: any  // 可选,路由元信息  
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
            } 
            else {
              next()
            }
          } 
          else {
            next() // 确保一定要调用 next()
          }
        })      
      ,caseSensitive: bol;       // 可选,匹配规则是否大小写敏感,默认:false '2.6.0+'
      ,pathToRegexpOptions: obj; // 可选,编译正则的选项 '2.6.0+' 
      ,beforeEnter: (to,from,next) => {  // 可选,路由守卫  
        PS: 通过调用 next() 可控制路由是否导航 
      } 
    }
    ... 
  ]
  ,mode: kw // 模式 
    'hash'      默认值,使用URL的hash来模拟一个完整的URL 
      利用当hash改变时,页面不会重新加载的特性  
      支持所有浏览器,包括不支持 HTML5 History Api 的浏览器。
    'history'   利用'history.pushState'API来完成URL跳转而无须重新加载页面 
      依赖 HTML5 History API 和服务器配置 
      在服务端增加一个覆盖所有情况的候选资源: 
      如果 URL 匹配不到任何静态资源,则应该返回同一个 index.html 页面,
      这个页面就是你 app 依赖的页面
    "abstract"  支持所有JS运行环境,如NodeJS服务器端 
      若发现无浏览器的 API,路由会自动强制进入这个模式 
  ,base: str  // 应用的基路径,默认:"/" 
    若整个单页应用服务在'/app/'下,则应设为"/app/" 
  ,linkActiveClass: str // 全局配置<router-link>的默认激活class类名 
    默认值:"router-link-active"
  ,linkExactActiveClass: str // 全局配置<router-link>精确激活的默认的class '2.5.0+'
    默认:"router-link-exact-active"
  ,fallback: bol // 当浏览器不支持history.pushState控制路由是否回退到hash模式 '2.6.0+'
    默认:true
    IE9中,设置为 false 会使得每个 router-link 导航都触发整页刷新 
    它可用于工作在 IE9 下的服务端渲染应用,因为一个 hash 模式的 URL 并不支持服务端渲染 
  ,scrollBehavior: function(to,from,pos){ // 滚动行为及位置 
    PS: 控制导航路由后的滚动位置,仅在'history'模式下可用 
    to   导航到路由信息对象 
    from 离开的路由信息对象 
    pos  之前路由滚动的位置,不一定存在 
      当且仅当'popstate'导航[通过浏览器的 前进/后退 按钮触发]时才可用 
      格式: { x: num, y: num } 
    return { x: num, y: num } | { selector: str } | {};  // 期望滚动的位置对象 
      若返回一个假的布尔值,或者是一个空对象,则不会发生滚动 
      { x: num, y: num }  到具体位置 
        scrollBehavior (to, from, pos) {
          if (pos) {
            return pos
          } 
          else {
            return { x: 0, y: 0 }
          }
        }
      { selector: str,offset?: { x: num, y: num } }   模拟滚动到锚点的行为 
        offset   '2.6.0+'
        scrollBehavior (to, from, pos) {
          if (to.hash) {
            return {
              selector: to.hash
            }
          }
        }
  }
  ,parseQuery: function(){ // 提供自定义查询字符串的解析函数 '2.4.0+' 
    PS: 用于覆盖默认行为 
  }
  ,stringifyQuery: function(){ // 提供自定义查询字符串的反解析函数 '2.4.0+'
    PS: 用于覆盖默认行为 
  }
})  
标签 
  <router-view> // 渲染路径匹配到的视图组件 
    PS: 在挂载点范围内都可以 [?] 
    name="str"  // 渲染对应的路由配置中components下的相应组件,默认:"default"  
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
    to="str/obj"  // 表示目标路由的链接 
      PS: 当被点击后,内部会立刻把 to 的值传到 router.push()
      str   一个字符串
        "aoo"    // 相当于'./aoo' 
        "/aoo"   // 相对于根目录  
        <router-link to="home">Home</router-link>
        <router-link :to="'home'">Home</router-link>
      obj   描述目标位置的对象‹需在动态绑定状态下使用› 
        {
          path: <str>    // 可选,指定跳转的路径 
            <router-link :to="{ path: 'home' }">Home</router-link>
          ,name: <str>   // 可选,指定命名的路由 
            <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
          ,params: <obj> // 可选, 
          ,query: <obj>  // 可选,带查询参数 
            // <!-- 带查询参数,下面的结果为 /register?plan=private -->
            <router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>
        }
    tag="str"   //指定<router-link>渲染成的标签,默认:'a' 
      其他的如如'div'、'li'等 
    replace="bol"  // 导航后是否留下history记录,默认:false  
      设置replace后,当点击时,会调用 router.replace() 而不是 router.push(),
      导航后不会留下 history 记录 
      <router-link :to="{ path: '/abc'}" replace></router-link>
    append="bol"   // 是否在当前跳转前加上该页路径,默认:false  
      从'/a'导航到一个相对路径'b',若未配置append,则路径为'/b',若配了,则为'/a/b' 
    exact="bol"    // 激活类和路径是否使用精确匹配 
      默认:false,激活使用全包含匹配 
      当为true时,若路径为'/',所有的激活类将被匹配到 
    active-class="str"        // 路径匹配时使用的CSS类名 
      默认: "router-link-active" 
        对应的路由匹配成功,"router-link-active"class将自动添加  
      默认值可通过路由的构造选项 linkActiveClass 来全局配置 
    exact-active-class="str"  // 路径精确匹配时使用的CSS类名 ['2.5.0+'] 
      默认值: "router-link-exact-active"
      默认值可通过路由构造函数选项 linkExactActiveClass 进行全局配置 
    event="str/strArr"  // 声明可用来触发导航的事件,默认:'click' '2.1.0+'
  ◆配合使用的组件 
  <transition></transition> 实现过渡动画效果 
  <keep-alive></keep-alive> 缓存,加快路由切换速度 
API 
  ◆对组件注入的属性/方法  
  vm.$router // router实例对象  
    .app   obj,挂载路由的Vue根实例 
    .mode  str,路由使用的模式 
    .currentRoute  Route,当前路由对应的路由信息对象 
    .getMatchedComponents(location?)    // 返回目标位置或当前路由匹配的组件数组 
      是数组的定义/构造类,不是实例,
      通常在服务端渲染的数据预加载时时候。
    .resolve(location,current?,append?) // 解析目标位置,返回对象形式的信息  '2.1.0+'
      PS: 解析目标位置[格式同<router-link>的'to'] 
      current 当前默认的路由 
      append  允许在 current 路由上附加路径,如同 router-link 
      返回包含如下属性的对象： {
        location: Location;
        route: Route;
        href: string;
      }
    .addRoutes(routes)  // 动态添加更多的路由规则 '2.2.0+' 
      参数必须是一个符合 routes 选项要求的数组。
    .onReady(callback,errorCallback?)  //  '2.2.0+'
      此方法通常用于等待异步的导航钩子完成,比如在进行服务端渲染的时候。
      该方法把一个回调排队,在路由完成初始导航时调用,
      这意味着它可以解析所有的异步进入钩子和路由初始化相关联的异步组件。
      这可以有效确保服务端渲染时服务端和客户端输出的一致。
      第二个参数 errorCallback 只在 2.4+ 支持。
      它会在初始化路由解析运行出错 (比如解析一个异步组件失败) 时被调用。
    .onError(callback) // 路由导航过程中出错时被调用 '2.4.0+'
      被调用的错误必须是下列情形中的一种：
      错误在一个路由守卫函数中被同步抛出；
      错误在一个路由守卫函数中通过调用 next(err) 的方式异步捕获并处理；
      渲染一个路由的过程中,需要尝试解析一个异步组件时发生错误。
    ★编程式的导航: 对应<router-link>的导航方式,通过JS代码来实现 
      PS: vue-router的导航方法'push''replace''go'效仿 window.history API 
        但其在各类路由模式 history、 hash 和 abstract 下表现一致
        window.history.pushState、 
        window.history.replaceState 
        window.history.go
    .push(location,onComplete?,onAbort?)  // 相当于<router-link :to=""> 
      PS: 向history栈添加一新的记录,并跳转,浏览器后退按钮,则回到之前的URL 
        当点击<router-link>时,这个方法会在内部调用 
      location    str/obj,路径 
        str,跳转字符串路径 
        obj,描述地址的对象 
          同时使用'path'和'params','params'不生效 
            同样的规则也适用于 <router-link> 组件的 to 属性 
            // 这里的 params 不生效
            router.push({ path: '/user', params: { userId: 123 }}) 
            方法一: 提供路由的'name'来代替使用'path' 
              router.push({ name: 'user', params: { userId:123 }}) 
            方法二: 提供完整的带有参数的'path'  
              router.push({ path: `/user/${userId}` }) // -> /user/123
      onComplete = function(){ // 可选,导航成功完成触发 ' 2.2.0+' 
        PS: 所有的异步钩子被解析之后触发 
      }
      onAbort = function(){    // 可选,导航终止时触发 ' 2.2.0+' 
        PS: 导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由触发  
      }
    .replace(location,onComplete?,onAbort?) // 相当于 <router-link :to="" replace> 
      PS: 替换掉当前的history记录  
    .go(<num>) // 类似 window.history.go(num) 
      PS: 在history记录中向前多少步 
      num  整数,可为负数  
      当history记录不够用时,则不会操作 
        routerMap.go(-100) 
        routerMap.go(100)  
      Example:
      routerMap.go(1)    // 在浏览器记录中前进一步,等同于 history.forward()
      routerMap.go(-1)   // 后退一步记录,等同于 history.back()
      routerMap.go(3)    // 前进 3 步记录
    .back()    
    .forward()  // 动态的导航到一个新url 
    ★全局守卫/钩子 
    .beforeEach(function(to,from,next){  // 全局导航前置守卫 
      PS: 路由跳转时,调用全局前置守卫,在所有守卫 resolve 完前,路由导航一直处于等待中 
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
        next(error)  '2.4.0+' 
          若参数为一 Error 实例,则导航会被终止
          且该错误会被传递给 router.onError() 注册过的回调 
      参数或查询的改变并不会触发导航守卫,需使用'beforeRouteUpdate'或watch $route 
    }) 
    .beforeResolve(function(to,from,next){  // 全局导航解析守卫 '2.5.0+' 
      PS: 导航被确认前,所有组件内守卫和异步路由组件被解析后调用 
        此时异步组件已经加载完成  
    })
    .afterEach(function(to,from){  // 全局后置钩子 
      // 不会接受 next 函数也不会改变导航本身 
    }) 
  vm.$route  // 路由信息对象,当前激活的路由的状态信息  
    PS: 不可变的'immutable',每次成功的导航后都会产生一个新的对象 
    .name      str,当前路由的名称,如果有的话    
    .fullPath  str,完成解析后的URL,包含查询参数和hash的完整路径 
    .path      str,对应当前路由的路径,总是解析为绝对路径,如 "/foo/bar" 
    .hash      str,当前路由的hash值[包括"#"],若无hash值,则为空字符串 
    .params   obj,动态路由匹配的参数信息对象,如果无路由参数,则为空对象  
      包含了'动态片段'和'全匹配片段', 
      在HTML中可直接使用 {{$route.params.xx}} 来取匹配到的地址参数 
      在一个路由中设置多段路径参数 
        模式              匹配路径         $route.params
        '/a/:aoo'         '/a/bar'        { aoo: 'bar' }
        '/a/:aoo/b/:boo'  '/a/bar/b/123'  { aoo: 'bar', boo: 123 }
    .query    obj,查询参数信息对象,若无查询参数,则为空对象 
    .matched  arr,包含当前路由的所有嵌套路径片段的路由记录 
      PS: 路由记录就是 routes 配置数组中的对象副本,还有在 children 数组 
    .meta     obj,
  ◆路由组件新增配置 
    PS: 在路由配置中引入的组件才有 
  ,beforeRouteEnter (to,from,next) {  // 路由被确认前调用 
    该回调中不能访问 this,因为回调在导航确认前被调用 
    可通过传一个回调给 next来访问组件实例 
      在导航被确认的时候执行回调,并且把组件实例作为回调方法的参数。
      beforeRouteEnter (to, from, next) {
        next(vm => {
          // 通过 `vm` 访问组件实例
        })
      }
  }
  ,beforeRouteLeave (to,from,next) {  // 离开路由时调用 
    PS: 通常用于禁止用户在还未保存修改前突然离开  
    可访问组件实例 `this`
  }
  ,beforeRouteUpdate (to,from,next) { // 当前路由改变且该组件被复用时调用 '2.2+'  
    PS: 可以访问组件实例`this`
    适用场景: 
      动态参数路径 
        如/foo/1 跳转到 /foo/2 时 
      查询字符串变化 
        如 /prod?id=1 跳转到 /prod?id=2 时 
  }
路由懒加载 
  PS: 把不同路由对应的组件分割成不同的代码块,当路由被访问的时候才加载对应组件 
    结合Vue的'异步组件'和Webpack的'code splitting feature'实现路由组件的懒加载 
  定义一个能够被webpack自动代码分割的异步组件
    一: 将异步组件定义为返回一个 Promise 的工厂函数 
      const aoo = () => Promise.resolve({ /*  组件定义对象 */ }) 
    二: 在webpack2中,使用动态import语法来定义代码分块点'split point' 
      import('./aoo.vue') // returns a Promise 
    三: 在路由配置中像往常一样使用 
      在vue-cli的Webpack模版中已满足一、二  
      const aoo = () => import('./aoo.vue') 
    const router = new VueRouter({
      routes: [
        { 
          path: '/foo'
          ,component: aoo 
            或 ,component: () => import('./aoo.vue')  
        }
      ]
    })
  把组件按组分块 
    有时候想把某个路由下的所有组件都打包在同个异步块(chunk)中。
    需要使用命名 chunk,一个特殊的注释语法来提供'chunk name' ['webpack2.4+'] 
    const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
    const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
    const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
    webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中 
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
    在Vue之后引入vuex会进行自动安装 ‹不必使用 Vue.use()› 
    <script src="/path/to/vue.js"></script> 
    <script src="/path/to/vuex.js"></script> 
  npm安装 
    $ npm i -S vuex     // 下载并写入配置    
    // main.js 中引入、安装
    import Vuex from 'vuex'   // 引入vuex 
    Vue.use(Vuex)             // 安装    
使用 
  let store = new Vuex.Store({ // 实例化数据中心store 
  }) 
  new Vue({  // 顶层组件实例 
    el: ''
    ,store: store // 把store实例注入所有的子组件,使用 vm.$store 获取    
  });
store = new Vuex.Store({ // 实例化数据中心'store'  
  state: {  // 状态,用于储存数据  
    stateData1: val1 
    // .. 
  }
  ,mutations: { // 函数集,一般用于直接操作'state'中的数据 
    foo1: function(state,data){  // 不可执行异步操作 
      state  储存数据的state对象 
        vue-cli 中,不可使用 {xxx} 将对象解构  
      data   可选,.commit()传入的数据 
    }
    ,foo2: function(state,data){   
    }
    ...
  }
  ,getters: { // 相当于 store 的计算属性 
    // PS: 相当于'computed',对'state'的处理返回
    getData1: function(state,getters){
      // state   储存数据的state对象 
      // getters 当前getters对象 
      return state.xx;
    }
    // 通过让getter返回一函数,来实现getter传参 
    ,getData2: function({ stateData1, stateData2 }, getters){
      // 传参调用: store.getters.getData2(2)  
      return function(id){
        return state.todos.find(todo => todo.id === id)
      };
    }
    // .. 
  }
  ,actions: {   // 函数集,执行'mutations'中的方法  
    goo: function(context,data){ // 不能直接更改'state',常和后端API交互[异步操作]
      context  实例'store'对象 
        可执行'mutations'中的函数,context.commit('foo',data1) 
        也可通过 context.state 和 context.getters 来获取'state'和'getters' 
      data     可选,.dispatch()传入的数据 
      context.commit(foo,{}) 
      
    }
    ,goo1: function({commit},data){ //  使用参数解构来简化书写  
      commit(foo,{})
    }
    ...
  }
  ,modules: { // 分块管理,见'模块化管理' 
  }
  ,strict: bol // 严格模式,默认:false 
    在严格模式下,无论何时发生了状态变更且不是由 mutation 函数引起的,将会抛出错误。
    这能保证所有的状态变更都能被调试工具跟踪到。
    不要在发布环境下启用严格模式！
    严格模式会深度监测状态树来检测不合规的状态变更,影响性能 
    
    类似于插件,我们可以让构建工具来处理这种情况：
    const store = new Vuex.Store({
      // ...
      strict: process.env.NODE_ENV !== 'production'
    })
})  
API 
  ◆组件注入的属性/方法 
  vm.$store  // 数据中心对象‹可在所有组件中使用›  
    PS: 组件中: 一般通过'computed'属性来承接 this.$store.state 中的数据   
    .state.xx   // 使用数据 
    .getters.xx // 使用数据 
    .commit('foo',data?)   // 执行'mutations'中的方法 
    .dispatch('goo',data?) // 执行'actions'中的方法 
  mapState(obj/arr)   绑定函数,简化'state.xx'的获取  
    import {mapState} from "vuex"; // 引入方法 
    export default {
      // ...
      ,computed: { // 使用方法一: 
        ...mapState({ // 使用对象展开运算符将其成员合并到计算属性中 
          key1: function(state,getters){ // 返回值形式 
            return state.xxx;  // 获取state数据 
            // 相当于 this.$store.state.xxx  
          }
          ,key2: (state,getters) => getters.xxx  // 获取getters数据 
            相当于 this.$store.getters.xxx   
          ,key3: 'axx.bxx'  // 字符串形式,获取state数据 
            相当于 this.$store.state.axx.bxx  
        })
        ,aoo: function(){
          return this.xxx;
        }
      }
      ,computed: mapState({ // 使用方法二: 
        // PS: 直接覆盖所有计算属性,不能再添加其他计算属性,否则采用第一种  
      })
      ,computed: mapState([ // 使用方法三: 简写方式 
        // PS: 当键名与state中相同时可使用  
        'aoo'
        ,'boo'
        ,.. 
      ]) 
    }
  mapGetters(obj/arr) 绑定函数,简化'getters.xx'的获取 
    import { mapGetters } from 'vuex' // 引入方法 
    export default {
      // ... 
      ,computed: {
        ...mapGetters({
          key1: 'aoo'  // 只有字符串形式,无函数返回值的形式 
        })
      }
    }
  mapMutations(arr/obj) 绑定函数,简化'store.commit("xxx",data)'操作 
    import { mapMutations } from 'vuex' // 引入方法 
    export default {
      // ...
      ,methods: {
        ...mapMutations([ 
          'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
          // `mapMutations` 也支持载荷：
          'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
        ])
        ,...mapMutations({ 
          add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
        })
      }
    }
  mapActions(arr/obj)   绑定函数,简化'store.dispatch("xxx",data)'操作  
    import { mapActions } from 'vuex' 
    export default {
      // ...
      ,methods: {
        ...mapActions([
          'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
          
          // `mapActions` 也支持载荷：
          'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
        ])
        ,...mapActions({
          add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
        })
      }
    }
  在函数中间接访问vue实例 
    通过'mutations'或'actions'函数将vue实例作为参数传递  
    若保存到'state'中,则整个store‹'mutations'、'getters'、'actions'函数›都可访问到该实例  
模块化管理: 每个模块维护一套状态,然后合并到一总数据中心中 
  PS: 默认情况下,模块内的'getter'、'mutation'和'action'都是注册在全局命名空间的 
    namespaced: true,成为命名空间模块,模块具有更高的封装度和复用性 
    所有 'getter'、'mutation'及'action'都会自动根据模块注册的路径调整命名 
  Example: 
    const store = new Vuex.Store({
      modules: {
        account: {
          namespaced: true,
          
          // 模块内容（module assets）
          state: { ... }, // 模块内的状态已经是嵌套的了,使用 `namespaced` 属性不会对其产生影响
          getters: {
            isAdmin () { ... } // -> getters['account/isAdmin']
          },
          mutations: {
            login () { ... } // -> commit('account/login')
          },
          actions: {
            login () { ... } // -> dispatch('account/login')
          },
          
          // 嵌套模块
          modules: {
            // 继承父模块的命名空间
            myPage: {
              state: { ... },
              getters: {
                profile () { ... } // -> getters['account/profile']
              }
            },
            
            // 进一步嵌套命名空间
            posts: {
              namespaced: true,
              
              state: { ... },
              getters: {
                popular () { ... } // -> getters['account/posts/popular']
              }
            }
          }
        }
      }
    })
  Feature: 
    模块化,但模块中'namespaced'为'false'时  
      PS: 'state'进行命名空间区分,'getters'、'mutations'及'actions'则不区分<混合到一起>
      const moduleA = {
        state: {}
        ,mutations: {
          foo: function(state){
            state 模块的局部状态对象 
          }
        }
        ,getters: {
          geter1: function(state,getters,rootState){
            state     模块的局部状态对象 
            getters   模块的局部计算对象 
            rootState 根节点状态对象
          }
        }
        ,actions: {
          goo: function(context){
            context.state      模块的局部状态对象 
            context.rootState  根节点状态对象 
          }
        }
        ,namespaced: bol // 命名空间,默认:false 
      }
      const moduleB = {
        state: {}
        ,mutations: {}
        ,getters: {}
        ,actions: {}
      }
      const store = new Vuex.Store({
        modules : {
          aoo: moduleA
          ,boo: moduleB
        }
        ,mutations: {  // 公用的 mutations 
          // 
        }
        ...
      })
      读取/执行分块中的数据/方法  
      vm.$store.state.aoo.xx       // 有命名空间区分 
      vm.$store.getters.xx         // 混合到了一起 
      $store.commit('foo',data)    // 混合到了一起 
      $store.dispatch('goo',data)  // 混合到了一起 
    模块化,且'namespaced'为'true'时  
      PS: 'state'、'getters'、'mutations'及'actions'均存在命名空间 
    'Global Assets'在命名空间模块内访问全局内容 
      modules: {
        foo: {
          namespaced: true,
          
          // 全局内容'rootState'和'rootGetter'将作为第三、四个参数传入 
          getters: {
            // 在这个模块的 getter 中,`getters` 被局部化了
            // 你可以使用 getter 的第四个参数来调用 `rootGetters`
            someGetter (state, getters, rootState, rootGetters) {
              getters.someOtherGetter // -> 'foo/someOtherGetter'
              rootGetters.someOtherGetter // -> 'someOtherGetter'
            }
            ,someOtherGetter: state => { ... } 
          },
          // 全局内容'rootState'通过第三个参数传入 <?>
          mutations: {
            someMutation (state, data, rootState) { }
            ,someMutation1: state => { ... }
          },
          // 全局内容通过context对象的属性传入  
          actions: {
            // 在这个模块中, dispatch 和 commit 也被局部化了
            // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
            someAction ({ dispatch,commit,state,getters,rootState,rootGetters }) {
              getters.someGetter // -> 'foo/someGetter'
              rootGetters.someGetter // -> 'someGetter'
              
              dispatch('someOtherAction') // -> 'foo/someOtherAction'
              dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'
              
              commit('someMutation') // -> 'foo/someMutation'
              commit('someMutation', null, { root: true }) // -> 'someMutation'
            }
            ,someOtherAction (ctx, payload) { ... }
          }
        }
      }
      全局命名空间内触发'action'或'mutation',使用{root:true}作为'dispatch'或'commit'的第三个参数 
    带命名空间的绑定函数 
      当使用 'mapState', 'mapGetters', 'mapActions' 和 'mapMutations' 来绑定命名空间模块时,
      写起来可能比较繁琐：
        computed: {
          ...mapState({
            a: state => state.some.nested.module.a,
            b: state => state.some.nested.module.b
          })
        },
        methods: {
          ...mapActions([
            'some/nested/module/foo',
            'some/nested/module/bar'
          ])
        }
      简化方法: 
        将模块的空间名称字符串作为第一个参数传递给上述函数,
        这样所有绑定都会自动将该模块作为上下文,
        computed: {
          ...mapState('some/nested/module', {
            a: state => state.a,
            b: state => state.b
          })
        },
        methods: {
          ...mapActions('some/nested/module', [
            'foo',
            'bar'
          ])
        }
      创建基于某个命名空间绑定函数 
        通过使用 createNamespacedHelpers 创建基于某个命名空间绑定函数。
        它返回一个对象,对象里有新的绑定在给定命名空间值上的组件绑定绑定函数：
        import { createNamespacedHelpers } from 'vuex'
        const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')
        export default {
          computed: {
            // 在 `some/nested/module` 中查找
            ...mapState({
              a: state => state.a,
              b: state => state.b
            })
          },
          methods: {
            // 在 `some/nested/module` 中查找
            ...mapActions([
              'foo',
              'bar'
            ])
          }
        }
    模块动态注册 
      在 store 创建之后,你可以使用 store.registerModule 方法注册模块：
      
      // 注册模块 `myModule`
      store.registerModule('myModule', {
        // ...
      })
      // 注册嵌套模块 `nested/myModule`
      store.registerModule(['nested', 'myModule'], {
        // ...
      })
      之后就可以通过 store.state.myModule 和 store.state.nested.myModule 访问模块的状态。
      
      模块动态注册功能使得其他 Vue 插件可以通过在 store 中附加新模块的方式来使用 Vuex 管理状态。
      例如,vuex-router-sync 插件就是通过动态注册模块将 vue-router 和 vuex 结合在一起,实现应用的路由状态管理。
      
      你也可以使用 store.unregisterModule(moduleName) 来动态卸载模块。
      注意,你不能使用此方法卸载静态模块（即创建 store 时声明的模块）。
      
      在注册一个新 module 时,你很有可能想保留过去的 state,例如从一个服务端渲染的应用保留 state。
      你可以通过 preserveState 选项将其归档：
      store.registerModule('a', module, { preserveState: true })。
    模块重用 
      有时我们可能需要创建一个模块的多个实例,例如：
      
      创建多个 store,他们公用同一个模块 (例如当 runInNewContext 选项是 false 或 'once' 时,
      为了在服务端渲染中避免有状态的单例)
      在一个 store 中多次注册同一个模块
      如果我们使用一个纯对象来声明模块的状态,那么这个状态对象会通过引用被共享,
      导致状态对象被修改时 store 或模块间数据互相污染的问题。
      
      实际上这和 Vue 组件内的 data 是同样的问题。
      因此解决办法也是相同的——使用一个函数来声明模块状态（仅 2.3.0+ 支持）：
      
      const MyReusableModule = {
        state () {
          return {
            foo: 'bar'
          }
        },
        // mutation, action 和 getter 等等...
      }
    表单处理 
      当在严格模式中使用 Vuex 时,在属于 Vuex 的 state 上使用 v-model 会比较棘手：
        <input v-model="obj.message">
        假设这里的 obj 是在计算属性中返回的一个属于 Vuex store 的对象,
        在用户输入时,v-model 会试图直接修改 obj.message。
        在严格模式中,由于这个修改不是在 mutation 函数中执行的, 这里会抛出一个错误。
      用“Vuex 的思维”去解决这个问题的方法是：
        给 <input> 中绑定 value,然后侦听 input 或者 change 事件,在事件回调中调用 action:
        <input :value="message" @input="updateMessage">
        // ...
        computed: {
          ...mapState({
            message: state => state.obj.message
          })
        },
        methods: {
          updateMessage (e) {
            this.$store.commit('updateMessage', e.target.value)
          }
        }
        下面是 mutation 函数：
        
        // ...
        mutations: {
          updateMessage (state, message) {
            state.obj.message = message
          }
        }
      双向绑定的计算属性 
        必须承认,这样做比简单地使用“v-model + 局部状态”要啰嗦得多,
        并且也损失了一些 v-model 中很有用的特性。
        另一个方法是使用带有 setter 的双向绑定计算属性：
        <input v-model="message">
        // ...
        computed: {
          message: {
            get () {
              return this.$store.state.obj.message
            },
            set (value) {
              this.$store.commit('updateMessage', value)
            }
          }
        }
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
--------------------------------------------------------------------------------
'axios'基于Promise的HTTP库,可用在浏览器和NodeJS中 
  PS: 类似'vue-resource'的插件,'vue2.0+'推荐使用axios 
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
  // axios并非vue插件,不能使用Vue.use(),所以只能在每个需要发送请求的组件中即时引入
  // 但可在引入axios后,通过手动修改原型链,来更方便的使用 
  var qs = require('qs'); // 用于序列化请求数据 
  Vue.prototype.$http = axios.create({
    baseURL: 'http://democode.likecto.hkbao.com/'
    ,withCredentials: true  // 携带cookies 
    ,headers: { 
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" // 避免预检请求 
    }
    ,transformRequest: [ // 序列化请求数据 
      function(data){
        return qs.stringify(data)
      }
    ]
  }) 
API 
  ◆请求方法: 
  axios({   // 通用方法 
    url: 'url'
    ,baseURL: 'https://some-domain.com/api/' // 将被添加到`url`前面,除非`url`是绝对的 
    ,params: {  // 与请求一起发送的URL参数
      // 须是纯对象或URLSearchParams对象
      ID: 12345
    }
    ,paramsSerializer: function(params) { // 序列化`params` 
      return Qs.stringify(params, {arrayFormat: 'brackets'})
    }
    ,data: {    // 作为请求主体发送的数据,仅适用于'PUT','POST'和'PATCH'
      // 当无`transformRequest`选项时,则数据类型需为以下之一: 
      // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
      // - Browser only: FormData, File, Blob
      // - Node only: Stream, Buffer
      key1: val1
      ,key2: val2
    }
    ,transformRequest: [ // 在请求数据发送到服务器之前对其进行更改 
      // 只适用于请求方法'PUT','POST'和'PATCH'
      function (data) { 
        // 数组中的最后一个函数必须返回一个字符串,一个 ArrayBuffer或一个 Stream
        return data;
      }
      ..
    ]
    ,method: 'post' // 默认get 
    ,headers: { // 自定义 headers
      'X-Requested-With': 'XMLHttpRequest'
    }
    ,timeout: <num> // 请求超时设置,单位:ms  
    ,withCredentials: false // 指示是否跨站点访问控制请求 
    ,transformResponse: [ // 允许在 then / catch之前对响应数据进行更改
      function (data) { 
        return data;
      }
    ]
    ,auth: { // 使用HTTP基本认证,并提供凭据 
      // 将设置一个`Authorization'头,覆盖任何现有的`Authorization'自定义头,使用`headers`设置 
      username: 'janedoe',
      password: 's00pers3cret'
    },
    ,responseType: 'json', // 表示服务器将响应的数据类型 
      'json' 默认, 
      'text'
      'document'
      'blob'
      'arraybuffer'
      'stream'
    ,adapter: function (config) { // 自定义处理请求,返回一个promise并提供一个有效的响应 
      /* ... */
    }
    ,onUploadProgress: function (progressEvent) { // 处理上传的进度事件 
      // 使用本地 progress 事件做任何你想要做的
    }
    ,onDownloadProgress: function (progressEvent) { // 处理下载的进度事件 
      // 
    }
    ,maxContentLength: 2000 // 定义允许的http响应内容的最大大小
    ,xsrfCookieName: 'XSRF-TOKEN' // 用作 xsrf 令牌的值的cookie的名称
    ,xsrfHeaderName: 'X-XSRF-TOKEN' // 携带xsrf令牌值的http头的名称
    ,validateStatus: function (status) { // 定义是否解析或拒绝给定的promise 
      return status >= 200 && status < 300; // default
      // HTTP响应状态码
      // 如果`validateStatus`返回`true`或被设置为`null` promise将被解析;
      // 否则,promise将被拒绝 
    }
    ,maxRedirects: 5 // 定义在node.js中要遵循的重定向的最大数量
      如果设置为0,则不会遵循重定向 
    // 在node.js中分别执行http和https请求时使用的自定义代理 
      // 允许配置类似`keepAlive`的选项, 默认情况下不启用。
    ,httpAgent: new http.Agent({ // node.js中,执行http请求时使用的自定义代理  
      keepAlive: true 
    })
    ,httpsAgent: new https.Agent({ // node.js中,执行https请求时使用的自定义代理  
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
  axios.request(config)
  axios.get('url',{
    // 可选,配置参数
    params: {  // 查询参数 
      key1: val1
      ..
    } 
  })
  axios.post('url',{
    // 可选,请求参数  
  } ,{  /* 可选,配置 */ })
  axios.delete(url[, config])
  axios.put(url[, data[, config]])
  axios.patch(url[, data[, config]])
  axios.head(url[, config])
  axios.options(url[, config])
  ◆
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
    .request  obj, 
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
'vue-validator'表单验证 
'vue-touch'移动端 


