'Webpack'JS模块打包器'module bundler'
  介绍 
    运行在NodeJS环境中;支持'AMD'、'commonJS'、'ES6Moudle'三种引入方式; 
    基于JS,包括四大核心'Entry''Output''Loaders'和'Plugins'; 
    把各种资源,如JS、coffee、less、sass、图片等都作为模块来使用和处理; 
    '预编译'模块方案,根据模块的依赖进行静态分析,使用JS作为载体将所有静态资源打包在一起 
  原理: 
    webpack模块能够以以下方式表达依赖关系,如: 
      CSS中的'@import'语句 
      CSS中的'url(...)'样式 
      HTML中<img src=...>的图片链接 
      ES2015'import'语句 
      CommonJS'require'语句 
      AMD'define'和'require'语句
      即: Webpack会识别HTML及CSS中的路径、JS中的模块引入,将他们进行转换、打包, 
      [但不会识别JS中的path,因为无法区分是字符串还是路径] 
    把所有的非js资源都转换成js, 
    如把一个'css'文件转换成'创建一个style标签并把它插入document'的脚本、 
    把图片转换成一个图片地址的js变量或base64编码等, 
    然后用CommonJS、AMD或ES6模块化的机制管理; 
    执行过程:  
      从'context'目录开始,寻找'entry'内的文件,读取内容
      每当遇到'import'或者require()依赖项时,解析这些代码,并且打包到最终构建里;
      接着它会不断递归搜索实际需要的依赖项,直到它到达了“树”的底部。
      从上一步接着,Webpack把所有东西打包到'output.path'的文件夹里,
      并使用'output.filename'命名
  说明 : 
    从'2.0'版本开始,支持用'ES6module'规范[import/export]去进行模块打包 
    'chunk'块,被entry所依赖的额外的代码块 
相关命令 
  ◆安装相关 
  $ npm i -g webpack  // 全局安装Webpack的cli环境  
  $ npm init  // npm初始化,创建'package.json'文件 
  $ npm i -D webpack  在项目中安装webpack并写入依赖配置文件  
  ◆安装后可用的其他相关命令  
  $ webpack <option>  Webpack自身可用命令 
    -v        查看版本号 
    -h        查看版本信息及可用的指令 
  ◆打包相关  
  $ webpack aoo.js aoo.boudle.js [<options>]   将'aoo.js'打包成'aoo.boudle.js' 
    ◆<options>   可选,表示配置参数,可同时使用多个 
    --watch           当文件更改时,自动打包
    --progress        打包时显示进度
    --display-modules 打包完后显示依赖的模块 
    --display-reasons 显示打包的原因 
  $ webpack [<option>]   打包时的配置项,可多选     
    -w   提供watch方法,实时进行打包更新 
    -d   提供SourceMaps,方便调试
    -p   表示'生产'模式,输出文件会被uglifies/minifies 
    --colors  输出结果带彩色,比如:会用红色显示耗时较长的步骤
    --profile 输出性能数据,可以看到每一步的耗时 
      将打包数据输出到JSON文件中,可通过'webpack.github.io/analyse'等站点进行分析 
      $ webpack --profile --json > statis.json 
    --display-module  显示打包的模块 
    --display-reason  显示打包的原因 
    --display-error-details  打印错误详情 
  $ webpack --config xx.js 自定义配置文件[可不再是默认的'webpack.config.js'] 
'webpack.config.js'默认的配置文件: 默认通过该配置进行打包 
  PS: 需手动创建该文件;是一个NodeJS模块,返回一json格式的配置信息对象[?] 
  配置详情 
  let webpack = require('webpack'); // 引入Webpack 
  let path = require('path'); // 引入path模块 
  //定义了一些文件夹的路径
  let rootPath = path.resolve(__dirname);
  let srcPath = path.resolve(rootPath, 'src');
  let distPath = path.resolve(rootPath, 'dist');
  module.exports = {  // commonjs模块化输出 
    context: path.resolve(__dirname,"src"), // webpack上下文: 入口文件所处的目录的绝对路径 
      // process.cwd() 默认值,NodeJS的启动目录 
    entry: str/arr/obj, // 入口,可认为app第一个启动文件 
      // PS: 一般的每个HTML页面都有一个入口起点 
      //   一般单页应用[SPA]:一个入口起点;多页应用[MPA]:多个入口起点
      { // 适用于多入口的情况,最可扩展的方式  
        // key 映射到 [name] 中
        key1: './src/index.js'
        key3: ['./entry1.js','entry2.js'], // 将被打包到一起 
        vendor: ['vue','vue-router','vue-resource','vuex'], // 将第三方库进行单独打包 
          // 一般使用'vendor',也可以是其他任意字符串 
      },
      ['./entry1.js','entry2.js'], // 将多个文件打包在一起
      './src/index.js', // 指定单一的入口文件 
    output: {  // 指定打包后的文件的输出 
      path: path.resolve(__dirname,'dist'),  // 指定输出目录,需用绝对路径   
      // 打包后的文件的名称 
      filename: './bundle.js',      // 也可包含路径,会接着path后 
        // PS: 可使用占位符输出多文件 
        //   [hash]和[chunkhash]等占位符长度可以使用[hash:16]来指定,默认为20
        // [name]      对应'entry.key'
        // [hash]      对应打包时生成的hash值
        // [chunkhash] 对应chunk的hash值,相当于文件的MD5值 
        // [id]        对应内部 chunk id
      hashDigestLength: num,  // [hash]和[chunkhash]的使用长度 
      // 一般用于服务器配置,输出解析文件的目录,默认空字符串 
      // 选项的值是以'runtime'运行时或'loader'载入时所创建的每个URL的前缀 
      // 'webpack-dev-server'也会默认从 publicPath 为基准
      // 在'compile time'编译时无法知道输出文件的'publicPath'的情况下,可留空,
      // 然后在'entry file'入口文件处使用'free variable'自由变量'__webpack_public_path__',
      // 以便在运行时(runtime)进行动态设置 
      //  __webpack_public_path__ = myRuntimePublicPath
      publicPath: "https://cdn.example.com/", // 如如何加载图片 
      // 决定非入口'chunk'的名称,即动态导入的文件被打包后的名称 
      // 文件名需在'runtime'根据'chunk'发送的请求去生成 
      chunkFilename: 'js/[name].asyncChunk.js?'+new Date().getTime(), 
      chunkLoadTimeout: 120000, // chunk请求到期之前的毫秒数,单位ms,默认120000 ['2.6.0+']
      library: "MyLibrary", // 'exported library'导出库的名称 
      libraryTarget: "umd", // 通用模块定义,导出库'exported library'的类型 
      hashFunction: str, // 散列算法,默认'md5'
      sourceMapFilename: str, // 在'devtool'启用了'SourceMap'选项时才生效 
        // 可使用的占位符:
        // [name]、[id]、[hash]、[chunkhash] 
        // [file]     模块文件名称
        // [filebase] 模块 basename
    }, 
    
    module: {},  // 决定了如何处理项目中的不同类型的模块 [详见'Loaders']
    plugins: [], // 插件 [详见'Plugins'] 
    devServer: { // 'webpack-dev-server'配置 [详见'webpack-dev-server'] 
      // PS: webpack2.0新增,用于集中处理'webpack-dev-server'的相关配置 
      port: 8000
      ,host: '0.0.0.0'
      ,overlay: {
        errors: true // 编译错误时,显示在网页上 
      }
      ,open: true   // 是否自动打开浏览器 
      ,historyFallback: {  // 将不识别的地址映射到指定地址 
        
      }
      ,hot: true // 是否热更新 
    }, 
    devtool: 'source-map', // 浏览器调试用的选项  
      'source-map'  // 牺牲构建速度的'source-map'是最详细的 
      "cheap-module-source-map" // 调试时只能寻找到对应的行,不能对应到具体符号 
      "eval-source-map"   // 用于开发环境  
      "eval"         // 没有模块映射,而是命名模块,以牺牲细节达到最快 
      "inline-source-map" // 嵌入到源文件中
      "hidden-source-map" // 'SourceMap'不在源文件中引用
      'null'        // 无'source-map'
    
    resolve: { // 解析模块请求的选项,用来配置要被打包的模块解析的处理细节  
      modules: [  // 用于查找模块的目录  
        path.resolve(__dirname, 'src'),
        'node_modules'
      ],
      root: [path.join(__dirname,'src')], // 查找module的路径,需是绝对路径 
      extensions: ['','.js',".css",'.vue','.jsx','.ts'], // 使用的扩展名 
        // 当省略后缀时,会按数组属性来匹配 
      alias: {   // 路径别名列表 
        'aoo': '../asserts/aoo.js',
        "module$": "new-module", // "module/path/file"但不匹配"new-module/path/file"
        'src': path.resolve(__dirname, './src'),
      },
      fallback: path.join(__dirname, "node_modules"),
      // 当出现 Node.js 模块依赖查找失败的时候,
      // 可尝试设置 resolve.fallback 和 resolveLoader.fallback 来解决问题
    },
    watch: true, // 监控文件改变,动态更新 
    sourceMapFilename: "[file].map", // 'source map'位置的文件名模板
      "sourcemaps/[file].map" 
    devtoolModuleFilenameTemplate: "webpack:///[resource-path]", // 'devtool'中模块的文件名模板 
    // 'devtool'中模块的文件名模板[用于冲突]     
    devtoolFallbackModuleFilenameTemplate: "webpack:///[resource-path]?[hash]",
    performance: { // 检测模块的相关信息 
      hints: 'warning'/'error', // 提示级别 
      maxEntrypointSize: num, // 单位为bytes,打包后的文件的最大体积限制
      maxAssetSize: num, // 单位bytes,图片或CSS的最大体积限制  
    }
    resolveLoader:{ // 用来配置loader模块解析的处理细节 
      fallback: path.join(__dirname, "node_modules"),
    }, 
    libraryTarget: "umd", // 导出库'exported library'的类型,通用模块定义 
      "umd2", // 通用模块定义
      "commonjs2", // exported with module.exports
      "commonjs-module", // 使用 module.exports 导出
      "commonjs", // 作为 exports 的属性导出
      "amd", // 使用 AMD 定义方法来定义
      "this", // 在 this 上设置属性
      "var", // 变量定义于根作用域下
      "assign", // 盲分配(blind assignment)
      "window", // 在 window 对象上设置属性
      "global", // property set to global object
      "jsonp", // jsonp wrapper
    chunkFilename: "[id].js", // 附加分块'additional chunk'的文件名模板  
      "[chunkhash].js"   // 长效缓存(/guides/caching)
    crossOriginLoading: "use-credentials", // 指定运行时如何发出跨域请求问题        
      "anonymous"  
      false 
  } 
'Loaders'解释器: 用于编译解释指定类型的文件,在打包之前进行预处理 
  PS: Webpack本身只能处理JS模块,使用loader可处理其他类型的文件,
    html,css,images等各种资源都有相应的loader来做依赖管理和打包;
    通过文件扩展名[或正则表达式]绑定给不同类型的文件
    Loader可以同步或异步执行,可接受参数,以此来传递配置项给loader
  相关命令 
    npm i <loaderName> -D   安装loader 
      npm i css-loader style-loader -D  同时安装多个loader 
    // 命令行中编译时指定使用的loader 
    webpack aoo.js boo.js --module-bind 'css=style-loader!css-loader' 
  通过管道方式链式调用 
    多个loader之间使用'!'连接,类似于Linux的pipe命令,
    每个loader可以把资源转换成任意格式并传递给下一个loader,
    但是最后一个loader必须返回JavaScript;
  'webpack.config.js'配置文件  
    'module': {    
      loaders: [  // '1.x'版本写法,loader可简写省略'-loader' 
        { test: /\.css$/, 
          // loader : 'style!css',
          loader : 'style-loader!css-loader?importLoader=1!postcss-loader', 
          // importLoader=1 表示该Loader后的1个loader来处理css中import的css
          // 或 loaders: ["style-loader","css-loader"."postcss-loader"]
          // 使用postcss-loader的autoprefixer功能将css属性添加前缀
          // 需安装postcss-loader和autoprefixer 
        },
        { test : /\.(png|jpg|gif|svg)$/i, 
          loaders : [  // 指定多个loader
            'url-loader?limit=1000&name=assets/[name]-[hash:5].[ext]',
            'image-webpack', // 用于压缩图片,按照逆序会先执行压缩
          ],
          // 当使用 require('../img.png') 时,将使用url-loader进行处理 
        },
        { test : /\.(png|jpg|gif|svg)$/i, // 用于处理图片的[相对]路径
          // HTML、CSS中图片的相对路径会被替换
          // 组件模版中HTML内需如此使用 <img src="${require(../a.png)}"/>
          loader : 'file',
          query : {
            name :'assets/[name]-[hash:5].[ext]' , // 用于定义图片的路径
          }
        },
      ],
      // 创建'module'模块时,匹配请求的规则数组 
      rules: [    // '2.x'版本写法,`-loader`后缀在webpack2不可省略  
        { test: regp, // 可选,匹配特定条件,正则表达式或正则表达式的数组  
          use: str/obj/arr,  // 配置loaders 
            "aoo-loader", // 使用单个loader,简写方式
            {             // 使用单个loader
              loader: 'aoo-loader',
              options: { // 配置,或使用'?key1=val1&key2=val2'的形式  
              },
            },
            [ // 使用多个loader,成员为前两种形式  
              "boo-loader", 
              {},
              ...
            ],
          exclude: str|strArr, // 可选,排除特定条件 
          include: str|strArr, // 可选,匹配特定条件 
          and: [], // 必须匹配数组中的所有条件 
          or: [],  // 匹配数组中任何一个条件
          not: [], // 必须排除这个条件
          oneOf: [ /* rules */ ], // 当规则匹配时,只使用第一个匹配规则 
            // {
            //   test: /.css$/,
            //   oneOf: [
            //     {
            //       resourceQuery: /inline/, // foo.css?inline
            //       use: 'url-loader'
            //     },
            //     {
            //       resourceQuery: /external/, // foo.css?external
            //       use: 'file-loader'
            //     }
            //   ]
            // }
          rules: [ /* rules */ ], // 使用所有这些嵌套规则[合并可用条件] 
        },
      ],
      // 防止'webpack'解析那些任何与给定正则表达式相匹配的文件
      // 忽略的文件中不应该含有'import','require','define'的调用,或任何其他导入机制。
      // 忽略大型的'library'可以提高构建性能 
      noParse: RegExp|[RegExp]|foo,
        noParse: /jquery|lodash/,
        noParse: function(content) { // "3.0.0+" 
          return /jquery|lodash/.test(content);
        },
    }
  其他 
    require()时指定使用的loader  
      Example:require("loaderName!./xx/fileName.xx");  
      使用'!'隔离,表示引用前指定由 loaderName 来处理 .xx 文件,
      可同时使用多个,如 require("style-loader!css-loader!./style.css");
    'Query Parameters'loader的配置参数 
      在'webpack.config.js'文件中进行配置 
        在loader后配置参数 
        {
          test: /\.png$/,
          loader : 'url-loader?mimetype=image/png'
        }
        或 使用'options'选项 
        {
          test : /\.png$/,
          loader : 'url-loader',
          options : {
            mimetype : "image/png"
          }
        }
      在'require'时配置 
        require("url-loader?mimetype=img/png!./file.png");
        require("style-loader!css-loader!./css/css.css");
      在命令行中进行配置 
        webpack a.js b.js --module-bind "css=style-loader!css-loader"   
  ◆loader枚举 
  raw-loader     
    { 
      test: /\.html$/,
      use: "raw-loader"
    },
  css-loader    使webpack具备处理'.css'文件的能力 
    能够使用'@import'和'url(./image.png)'实现'require()'的功能 
  style-loader  用于将引入的样式插入到HTML中 
    //main.js
    import './style.css';//使用require导入css文件
    {
      test: /\.css$/,
      use: [
        'style-loader', 
        { 
          loader: 'css-loader',
          options: {
            modules: true  // 开启模块化,即样式不会互相影响 
              // 若需要有全局的样式则在CSS中  :global(selector){...}
          }
        }
      ]
    },
  less-loader   '.less'文件处理 
    less-loader会自动将'@import'引入的css属性增加浏览器前缀 
  sass-loader   '.sass'文件处理 
    { 
      test: /\.scss$/,
      use: 'style-loader!css-loader!sass-loader'
    },
  file-loader   接收并加载任何文件,然后将其输出到构建目录  
    import iconSrc from './my-image.png'
    var myIcon = new Image();
    myIcon.src = iconSrc;
    { 
      test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/, // 处理字体文件
      use: 'file-loader'
    },
  url-loader    在JS中处理引入的图片文件 
    { 
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: { 
        loader: 'url-loader',
        options: {
          limit: 8192, // 限制图片大小 8192B,否则转换为 base64格式
          name: 'images/[name]-[hash].[ext]' // 超出限制,创建的文件  
        }
      }
    },
  vue-loader    把'.vue'文件转换成webpack包,和整个打包过程融合起来 
    在Webpack的'loader API'基础上开发,可用'.vue'单文件格式来写Vue组件 
    VueJS支持对组件的异步加载,配合Webpack的分块打包功能,可轻松实现组件的异步按需加载;
    默认情况,vue-loader是自动用css-loader 
    { 
      test: /\.vue$/,
      use: 'vue-loader',    
      options: {
        loaders: {
          // <style lang="less">
          less: 'vue-style-loader!css-loader!less-loader',               
          // <style lang="scss">
          scss: 'vue-style-loader!css-loader!sass-loader',               
          // <style lang="sass">
          sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax', 
        },
      },
    },
  xml-loader    处理'.xml'文件 
  json-loader   处理'.json'文件 [webpack2+已内置,无需再安装] 
    var aoo = require('./aoo.json');  
  ★单独的平台
  babel        允许使用ES6及JSX语法 
    $ npm i -D babel-loader babel-core babel-preset-env 
      babel-loader     用于让webpack知道如何运行babel 
      babel-core       做编译器,如何解析代码 
      babel-preset-env 可根据环境的不同转换代码 
    ".babelrc"babel的专属配置文件 
      PS: Babel其实可以完全在'webpack.config.js'中进行配置
        webpack会自动调用'.babelrc'里的babel配置选项 
      {
        "presets": ["react", "es2015"]
      }
    { 
      test: /(\.jsx|\.js)$/,
      use: 'babel-loader',
      exclude: /node_modules/, // 不包括路径
      options: {
        presets: ['latest',"es2015","react"], // 指定将会编译的版本 
          // 采用query的形式: loader: 'babel-loader?presets[]=es2015&presets[]=react',
        plugins: ['syntax-dynamic-import'],
        cacheDirectory: true,    // 缓存结果
        // 可在npm的 package.json 中 指定
        // "babel" : { "presets" : ["latest"] }
        // 从而取消在此处指定'options'项
      }
    }
  postcss      处理CSS文件 
    $ npm i -D postcss-loader autoprefixer 
    'postcss.config.js'postcss配置文件 
      module.exports = {
        plugins: [
          require('autoprefixer')
        ]
      }
    { 
      test: /\.css$/,
      use: "postcss-loader",
    } 
'Plugins'插件: 扩展webpack的功能 
  PS: 目的在于解决'loader'无法实现的其他事,可能会配合'loaders'来使用  
    可在一个配置文件中因不同目的而多次使用同一插件 
  'webpack.config.js'中的'plugins'配置 
    var webpack = require('webpack'); // 用于访问内置的插件 
    var htmlWebpackPlugin = require("html-webpack-plugin"); // 引入插件 
    ...
    'plugins': [ //webpack3.0的范围提升 
      new webpack.optimize.UglifyJsPlugin(),
      new htmlWebpackPlugin({
        ...
      }),
    ],
  ◆内建插件
  webpack.ProvidePlugin   把一全局变量导入所有的代码中[只有使用时才会被加载进来]  
    new webpack.ProvidePlugin({
      '$': "jquery",
      'jQuery': "jquery",
      // JS中 import $ from 'jquery'不再需要,'$''jQuery'可直接使用  
    })
    [module, child, ...children?]数组形式,从模块中导出具体属性方法 
      // 从'TypeScript'的'tslib package'包中导入函数' __assign'
      '__assign': ['tslib', '__assign'],
  webpack.HashedModuleIdsPlugin    构建后的公共库模块的名称不改变 
    new webpack.HashedModuleIdsPlugin()
  webpack.optimize.UglifyJsPlugin  压缩JS 
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false, // 是否删除警告信息 
      },
      mangle: {}, // 代码混淆,默认是开启的 
      except: ['$super','exports','$'], // 排除关键字 
    })
  webpack.optimize.CommonsChunkPlugin    提取公共模块 
    new webpack.optimize.CommonsChunkPlugin({
      name: 'aoo',  // 指定提取出公共部分打包后文件的名称 
      names: ['aoo', 'manifest'],
        // manifest文件是将每次打包都会更改的东西单独提取出来,用于加快打包速度
      minChunks: 2, //公共模块被使用的最小次数 
        // 配置为2,即一个模块被使用2次及以上时才会被提取出来作为common chunks
        Infinity 
      children:true, // 可选,若为true,那么公共组件的所有子依赖都将被选择进来
      filename: 'vendor.js',
    })
    Example: 提取公共模块 
      修改entry入口文件
      entry: {
        app: path.resolve(APP_PATH, 'index.js'),
        vendors: ['jquery', 'moment'] //添加要打包在vendors里面的库
      },
      plugins: [
        //把入口文件里面的数组打包成verdors.js
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
      ]
  webpack.DefinePlugin          生成全局变量 
    plugs: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("process.env.NODE_ENV")
      })
    ]
  webpack.BannerPlugin          给打包后代码添加声明 
    new webpack.BannerPlugin('版权所有,翻版必究') 
  webpack.HotModuleReplacementPlugin  热加载 
    需在'webpack-dev-server'的配置中启用'hot'参数,
    还需要在JS模块中执行Webpack提供的API才能实现热加载 
    new webpack.HotModuleReplacementPlugin() //热加载插件 
  ◆常用插件 
  'html-webpack-plugin'    在分发目录新建HTML文件 
    PS: 可能配置多个从而创建多个HTML文件 
    $ npm i -D html-webpack-plugin 
    new htmlWebpackPlugin({  
      template: './aoo.html' , // 指定html模版,复制到output.path目录中 
      chunks: ['main','a'],    // 指定加载的打包后的文件,默认加载所有 
        // 数组中的名称对应'entry.key' 
      filename: 'aoo-[hash].html', // 指定生成的HTML名称,默认为'index.js'  
      title: '标题', // 指定标题 
      favicon: './favicon.ico',  // 指定favicon 
      inject: 'head',  // 指定打包后的文件插入的位置,
        // 'head'   <head>中
        // 'body'   <body>内部尾部 
        // false    不放入到指定模版生成的文件中
      minify: {  // 对按照模版生成的文件进行压缩
        removeComments : true ,     // 删除注释
        collapseWhitespace : true , // 删除空格 
      } , 
      excludechunks: ['b'], // 指定不加载的打包文件 
      hash: true,
      'aoo': 'boo',   // 自定义的属性,可在指定的模版文件中引用 
        // 模版文件中 方式为 <%= htmlWebpackPlugin.options.aoo %>
    }),
    在模版文件中使用'htmlWebpackPlugin' 
      遍历取值 
        遍历 htmlWebpackPlugin 
          <% for(key in htmlWebpackPlugin){%>  // 运行代码不需要'='
            <%= key %>  // 取值需要'='
          <% } %>
          得到 files 和 options 两个对象
        遍历 htmlWebpackPlugin.files 和 htmlWebpackPlugin.options
          <% for(key in htmlWebpackPlugin.files){%>
            <%= key %> : <%= JSON.stringify(htmlWebpackPlugin.files[key])%> 
            // 通过 json.stringify 将对象内容字符串化
          <% } %>
          <% for(key in htmlWebpackPlugin.options){%>
            <%= key %> : <%= JSON.stringify(htmlWebpackPlugin.options[key])%> 
          <% } %>
      在模版中指定的位置引入指定打包后的文件 
        <script src="<%= htmlWebpackPlugin.files.chunk.xx.entry %>" charset="utf-8"></script>
        其中'xx'为'webpack.config.js'文件中'module.exports.entry.key'定义的文件 
      在模版中插入打包后的文件的内容
        <script  type='text/javascript'>
          <%= compilation.asserts[
            htmlWebpackPlugin.files.chunks.main.entry
            .substr(htmlWebpackPlugin.files.publicPath.length)
          ].source() %>
        </script>
  'extract-text-webpack-plugin'   提取css文件到单独的文件 
    $ npm i -D extract-text-webpack-plugin  
    var ExtractTextPlugin = require('extract-text-webpack-plugin');
    module: {
      rules: [
        { 
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: "css-loader",
                options: { 
                  modules: true 
                }
              }
            ],
            fallback: 'style-loader',
          })
        },
        { 
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            use: [
              { 
                loader: "css-loader",
                options: { 
                  modules: true
                }
              },
              { loader: "less-loader" }
            ],
            fallback: 'style-loader',
          })
        },
      ]
    },
    plugins: [
      new ExtractTextPlugin({ 
        filename: 'css/[name].[hash].css', 
        allChunks: true 
      })
    ]
  'optimize-css-assets-webpack-plugin' 压缩提取出的CSS并解决ExtractTextPlugin分离出的JS重复问题 
    plugs: [
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })  
    ]
  'CommonsChunkPlugin'            提取出公用模块 
    开发中需要将多个页面的公用模块独立打包,
    从而可以利用浏览器缓存机制来提高页面加载效率,减少页面初次加载时间,
    只有当某功能被用到时,才去动态的加载。
    
    var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
    module.exports = {
      entry: { 
        a: "./a", 
        b: "./b" 
      },
      output: { 
        filename: "[name].js" 
      },
      plugins: [ 
        new CommonsChunkPlugin("common.js"), 
      ]
    }
    在文件中根据下面的方式引用即可 
    <script src="common.js"></script> 
    <script src="a.js"></script> 
    <script src="b.js"></script> 
  'clean-webpack-plugin'    文件管理 
    npm i -D clean-webpack-plugin 
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    plugins: [
      new CleanWebpackPlugin(['dist'])  // 每次打包前会清理'dist'文件夹 
      new CleanWebpackPlugin([
        // 只删除 dist 文件夹下的 bundle 和 manifest 文件
        'dist/bundle.*.js',
        'dist/manifest.*.js'
      ], 
      {
        verbose: true, // 打印 log
        dry: false // 删除文件
      }),
    ]
  'uglifyjs-webpack-plugin'     代码精简压缩 
    PS: 可'tree shaking'用于描述移除JS上下文中的未引用代码'dead-code' 
      前提是使用ES2015模块语法即'import'和'export'  
    npm i -S uglifyjs-webpack-plugin 
    const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
    new UglifyJSPlugin({
      'sourceMap': true, // 启用'source-map'
    })
'webpack-dev-server'    静态资源服务器  
  PS: 基于Express框架的轻量开发服务器,会监听文件的变化在内存中实时打包 
  $ npm i -g webpack-dev-server  // 全局安装静态资源服务器 
  $ webpack-dev-server           // 将webpack项目在本地起服务 
  'webpack.config.js'中的配置 
    devServer: { 
      contentBase: './dist' // 指定加载页所在目录,默认为当前配置文件的目录 
      ,host: '127.0.0.1'  // 建议写IP地址,localhost可能有问题  
      ,port: 8081   // 修改端口 
      ,inline: true // 是否监控文件变化 
      ,overlay: { // 在网页显示错误和警告信息 
        errors: true
        ,warnings: true
      }
      ,hot: true    // 是否启用模块热替换HMR'Hot Module Replacement 
      ,progress: true // 
      ,compress: true // enable gzip compression
      ,historyApiFallback: true // true for index.html upon 404,object for multiple paths 
      ,https: false // true for self-signed, object for cert authority
      ,noInfo: true // only errors & warns on hot reload
      ,proxy: { // proxy URLs to backend development server
        '/api': 'http://localhost:3000'
      }
      ,disableHostCheck: true  // 默认: false,是否忽略域名检查 
        PS: 默认的,在host中配置'127.0.0.1 aaa.bbb',访问'aaa.bbb'时则相当于访问'127.0.0.1'
          默认该项会进行检查,当访问'aaa.bbb'时不会进行转移到'127.0.0.1'
    },
  'package.json'中的启动配置 
    "scripts": { 
      "dev": "webpack-dev-server --open"
    },
'webpack-merge'通用配置工具: 提取开发环境和生产环境的公用配置  
  npm i -S webpack-merge // 安装  
  新建文件如下,用于开发环境和生产环境的配置  
  webpack.base.js  // 公共配置 
    module.exports = {
      entry: {},
      output: {},
      plugins: [],
    };
  webpack.dev.js     // 开发环境 
    const merge = require('webpack-merge'); 
    const base = require('./webpack.base.js'); 
    module.exports = merge(base, { 
      devtool: 'inline-source-map', 
      devServer: { 
        contentBase: './dist', 
      }, 
    }); 
  webpack.prod.js    // 生产环境 
    const merge = require('webpack-merge'); 
    const base = require('./webpack.base.js'); 
    const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); 
    module.exports = merge(base, { 
      plugins: [ 
        new UglifyJSPlugin() 
      ] 
    }); 
  'package.json'文件命令配置  
    "dev": "webpack-dev-server --open --config webpack.dev.js",
    "prod": "webpack --progress --profile --colors --config webpack.prod.js"
代码分离 
  有三种常用的代码分离方法：
  入口起点：使用'entry'配置手动地分离代码 
    最简单、最直观的分离代码的方式,但手动配置较多,且有一些陷阱 
  防止重复：使用'CommonsChunkPlugin'去重和分离chunk 
  动态导入：通过模块的内联函数调用来分离代码 
    使用符合ECMAScript提案的'import()'语法,import()调用会用到'promises',
    若浏览器不支持'Promise',需在首个'bundle'前引入'Promise polyfill'
    懒加载 : 需要时才'import()'引入,然后使用 
      button.onclick = (e) => import('./print').then((module) => {
        var print = module.default;
        print();
      });
--------------------------------------------------------------------------------
