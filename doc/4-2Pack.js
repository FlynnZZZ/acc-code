'CommonJS'模块化规范 
  PS: 一般情况可省略'.js'拓展名,可以使用相对路径,也可以使用绝对路径,
    系统内置模块可直接使用模块名 
    require是同步的,模块系统需要同步读取模块文件内容,并编译执行以得到模块接口 
  运行时加载: 只能在运行时确定 
    比如,CommonJS 模块就是对象,输入时必须查找对象属性 
    // CommonJS模块
    let { stat, exists, readFile } = require('fs');
    // 等同于
    let _fs = require('fs');
    let stat = _fs.stat;
    let exists = _fs.exists;
    let readfile = _fs.readfile;
    上面代码的实质是整体加载fs模块[即加载fs的所有方法],生成一个对象(_fs),
    然后再从这个对象上面读取3个方法。
    这种加载称为“运行时加载”,因为只有运行时才能得到这个对象,
    导致完全没办法在编译时做“静态优化”。
  module.exports 模块输出: 把模块希望输出的内容放入该对象 
  require() 加载模块的方法: 该方法读取一文件并执行,返回内部的 module.exports 对象 
AMD'Asynchronous Module Definition'规范,异步模块定义 
  PS: 异步:有效避免了采用同步加载方式中导致页面假死现象 
    模块定义:每个模块必须按照一定的格式编写  
    主要接口有两个:'define'和'require' 
  由于原生JS不支持,需用库函数如RequireJS 
CMD'Common Module Definition'通用模块定义
  CMD规范是国内发展出来的,就像AMD有个requireJS,CMD有个浏览器的实现SeaJS,
  SeaJS要解决的问题和requireJS一样,只不过在模块定义方式和模块加载时机上有所不同
  区别:在模块定义时对依赖的处理不同
  AMD推崇依赖前置,在定义模块的时候就要声明其依赖的模块 
  CMD推崇就近依赖,只有在用到某个模块的时候再去require 
--------------------------------------------------------------------------------
'Webpack'JS模块打包器'module bundler'
  介绍 
    运行在NodeJS环境中;支持'AMD''commonJS''ES6Moudle'三种引入方式;
    基于JS,包括四大核心'Entry''Output''Loaders'和'Plugins';
    把各种资源,如JS、coffee、less、sass、图片等都作为模块来使用和处理;
    '预编译'模块的方案,根据模块的依赖关系进行静态分析,然后生成对应的静态资源 
  原理: 
    webpack模块能够以各种方式表达它们的依赖关系,如: 
      ES2015'import'语句、CommonJS'require'语句、AMD'define'和'require'语句
      样式文件中的'@import'语句'url(...)'样式、HTML文件中<img src=...>的图片链接 
      webpack1需要特定的loader来转换ES2015'import',然而通过webpack2可直接使用  
    即: Webpack会识别HTML及CSS中的路径、JS中的模块引入,将他们进行转换、打包, 
    [但不会识别JS中的path,因为无法区分是字符串还是路径] 
    把所有的非js资源都转换成js, 
    如把一个'css'文件转换成'创建一个style标签并把它插入document'的脚本、 
    把图片转换成一个图片地址的js变量或base64编码等, 
    然后用CommonJS、AMD或ES6模块化的机制管理; 
  执行过程 
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
  npm i -g webpack  全局安装Webpack  
  npm i -g webpack-dev-server  全局安装静态资源服务器 
    PS: 基于NodeJS的Express框架的轻量开发服务器,
      开发中会监听文件的变化在内存中实时打包 
    webpack-dev-server   将webpack项目在本地起服务 
    'devServer': { // 在config中的配置 
      contentBase: './dist', // 指定根目录 
      hot: true,  // 启用'HMR'模块热替换'Hot Module Replacement' 
      inline: true,   // 
      progress: true, // 
      historyApiFallback: true, // 
    },
    "scripts": { // 在'package.json'中的启动配置 
      "start": "webpack-dev-server --open"
    },
  npm init   npm初始化,创建'package.json'文件 
  npm i webpack -S  在项目中安装webpack并写入依赖配置文件  
  ◆安装后可用的其他相关命令  
  webpack <option>  Webpack自身可用命令 
    -v        查看版本号 
    -h        查看版本信息及可用的指令 
  ◆打包相关  
  webpack aoo.js aoo.boudle.js [<options>]   将'aoo.js'打包成'aoo.boudle.js' 
    ◆<options>   可选,表示配置参数,可同时使用多个 
    --watch           当文件更改时,自动打包
    --progress        打包时显示进度
    --display-modules 打包完后显示依赖的模块 
    --display-reasons 显示打包的原因 
  webpack [<option>]   打包时的配置项,可多选     
    -w   提供watch方法,实时进行打包更新 
    -d   提供SourceMaps,方便调试
    -p   表示'生产'模式,输出文件会被uglifies/minifies 
    --colors  输出结果带彩色,比如:会用红色显示耗时较长的步骤
    --profile 输出性能数据,可以看到每一步的耗时 
    --display-module  显示打包的模块 
    --display-reason  显示打包的原因 
    --display-error-details  打印错误详情 
  webpack --config xx.js 自定义配置文件[可不再是默认的'webpack.config.js'] 
'webpack.config.js'默认的配置文件: 通过该文件进行打包配置 
  PS: 需手动创建该文件;是一个NodeJS模块,返回一json格式的配置信息对象[?] 
  配置详情 
    let webpack = require('webpack');
    let path = require('path'); // 引入path模块 
    module.exports = {  // commonjs模块化输出 
      // 一般的每个HTML页面都有一个入口起点;
      // 单页应用(SPA)：一个入口起点,多页应用(MPA)：多个入口起点
      'entry': { // 适用于多入口的情况,最可扩展的方式  
        main: './src/index.js'
        page1: './aoo.js',
        page2: ['./entry1.js','entry2.js'], // 将被打包到一起 
        // 第三方库,需进行单独打包的文件  
        vendors: ['vue','vue-router','vue-resource','vuex'], 
        // 输出打包后的文件和output参数有关,若 output.filename 仍指定为一个值,
        // 则最后打包后的文件只有一个,结果是两个同名的文件产生覆盖的结果,
      },
      'entry': ['./entry1.js','entry2.js'], // 将多个文件打包在一起
      'entry': './src/index.js', // 指定单一的入口文件 
      // 入口文件: 将被打包的文件 
      'output': {  // 指定打包后的文件的输出 
        path: './dist/js',  // 指定输出路径 
        // 打包后的文件的名称 
        filename: './bundle.js',      // 也可包含路径,会接着path后 
        filename: '[name]-bundle.js', // 使用占位符输出多文件  
          // PS: [hash]和[chunkhash]的长度可以使用[hash:16]来指定,默认为20
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
        publicPath: "https://cdn.example.com/", 
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
      
      // webpack的主目录、上下文: 入口文件所处的目录的绝对路径 
      'context': path.resolve(__dirname,"src"), 
        // process.cwd() 默认值,NodeJS的启动目录 
      'watch': true, // 监控文件改变,动态更新 
      // 浏览器调试中添加元信息'meta info'可增强调试 
      'devtool': 'source-map', // 牺牲构建速度的'source-map'是最详细的 
        "eval" // 没有模块映射,而是命名模块。以牺牲细节达到最快 
        "eval-source-map"  // 将 SourceMap 嵌入到每个模块中
        "cheap-module-source-map" // 有模块映射'module mappings'的'SourceMap'低级变体 
        "cheap-source-map"  // 没有模块映射'module mappings'的'SourceMap'低级变体'cheap-variant' 
        "inline-source-map" // 嵌入到源文件中
        "hidden-source-map" // 'SourceMap'不在源文件中引用
      // 'source map'位置的文件名模板
      'sourceMapFilename': "[file].map", 
        "sourcemaps/[file].map" 
      // 'devtool'中模块的文件名模板 
      'devtoolModuleFilenameTemplate': "webpack:///[resource-path]", 
      // 'devtool'中模块的文件名模板[用于冲突]     
      'devtoolFallbackModuleFilenameTemplate': "webpack:///[resource-path]?[hash]", 
      // 解析模块请求的选项,用来配置要被打包的模块解析的处理细节  
      'resolve': { 
        modules: [  // 用于查找模块的目录  
          path.resolve(__dirname, 'src'),
          'node_modules'
        ],
        extensions: ['','.js',".css",'.vue','.jsx','.ts'], // 使用的扩展名 
        alias: {   // 模块别名列表 
          'aoo': '../asserts/aoo.js',
          "module$": "new-module", // "module/path/file"但不匹配"new-module/path/file"
          'src': path.resolve(__dirname, './src'),
        },
        root : [path.join(__dirname,'src')],
        fallback: path.join(__dirname, "node_modules"),
        // 当出现 Node.js 模块依赖查找失败的时候,
        // 可尝试设置 resolve.fallback 和 resolveLoader.fallback 来解决问题
      },
      'devServer': { // 使用'webpack-dev-server'启动热刷新插件
        contentBase: path.join(__dirname, "/"),
        host: 'localhost',  // 建议写IP地址,开发时候电脑的ip地址,localhost可能有问题  
        port: 9090,   // 端口,默认9090
        inline: true, // 是否监控js变化
        hot: true,    // 是否热启动
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
        proxy: { // proxy URLs to backend development server
          '/api': 'http://localhost:3000'
        },
        grogress: true,
      },
      'resolveLoader':{ // 用来配置loader模块解析的处理细节 
        fallback: path.join(__dirname, "node_modules"),
      }, 
      'libraryTarget': "umd", // 导出库'exported library'的类型,通用模块定义 
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
      // 附加分块'additional chunk'的文件名模板  
      'chunkFilename': "[id].js",
        "[chunkhash].js"   // 长效缓存(/guides/caching)
      // 指定运行时如何发出跨域请求问题        
      'crossOriginLoading': "use-credentials", // 枚举
        "anonymous"  
        false 
      
      'postcss': [
        require('autoprefixer')({
          browser : ['latest 5 versions'] , // 最近的5个浏览器的版本
        })
      ],
      // 或 
      // postcss : function(){
      //   return [
      //     require('autoprefixer')({
      //       browser : ['latest 5 versions'] , // 最近的5个浏览器的版本
      //     })
      //   ]
      // } ,
      
      'module': {},  // 决定了如何处理项目中的不同类型的模块 [详见'Loaders']
      'plugins': [], // 插件 [详见'Plugins'] 
    } 
    多文件单输出 
      'entry': {
        app: ["./home.js", "./events.js", "./vendor.js"],
      },
      'output': {
        path: __dirname + "/dist",
        filename: "[name].bundle.js",
      },
      根据数组顺序,文件全部会被一起打包在'dist/app.bundle.js'里 
    多文件多个输出 
      'entry': {
        home: "./home.js",
        events: "./events.js",
        contact: "./contact.js",
      },
      'output': {
        path: __dirname + "/dist",
        filename: "[name].aoo.js",
      },
      会被打包成以下三个文件:
      'dist/home.aoo.js'、'dist/events.aoo.js'、'dist/contact.aoo.js' 
'Loaders'解释器: 用于编译解释指定类型的文件,在打包之前进行预处理 
  PS: Webpack本身只能处理JS模块,使用loader可处理其他类型的文件,
    html,css,images等各种资源都有相应的loader来做依赖管理和打包;
    通过文件扩展名[或正则表达式]绑定给不同类型的文件
    Loader可以同步或异步执行,可接受参数,以此来传递配置项给loader
  通过管道方式链式调用 
    多个loader之间使用'!'连接,类似于Linux的pipe命令,
    每个loader可以把资源转换成任意格式并传递给下一个loader,
    但是最后一个loader必须返回JavaScript;
  相关命令 
    npm i <loaderName> -D   安装loader 
      npm i css-loader style-loader -D  同时安装多个loader 
    // 命令行中编译时指定使用的loader 
    webpack aoo.js boo.js --module-bind 'css=style-loader!css-loader' 
  'module': {  // 'webpack.config.js'中的'loaders'配置 
    loaders: [  // '1.x'版本写法 
      // 根据模块类型[扩展名]来自动绑定需要的loader,通过正则匹配实现, 
      // 使用字符串或数组来申明我们需要使用的加载器 
      { 
        test: /\.js$/,
        loader: 'babel-loader', // 简写可省略'-loader' 
        // 可选,指定不用处理的部分 
        exclude: path.resolve(__dirname,'node_modules'), 
          // 也可使用正则 /node_modules/ 
        include: './src/', // 可选,指定处理的范围
        query: {  // 可选 
          presets : ['latest'] // 指定将js编译的版本,如 ["es2015"] 等
        },
        // 可在npm的 package.json 中 指定
        // "babel" : { "presets" : ["latest"] }
        // 从而取消在此处指定query项
      }, 
      {
        test: /\.jsx$/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react',
          // babel中的presets  
      },
      {
        test: /\.css$/, 
        // loader : 'style!css',
        loader : 'style-loader!css-loader?importLoader=1!postcss-loader', 
        // importLoader=1 表示该Loader后的1个loader来处理css中import的css
        // 或 loaders: ["style-loader","css-loader"."postcss-loader"]
        // 解析的顺序为从后向前,即postcss-loader先起作用
        // css-loader用于处理css文件,style-loader用于将处理后的css插入到HTML中
        // 使用postcss-loader的autoprefixer功能将css属性添加前缀
        // 需安装postcss-loader和autoprefixer 
      },
      // 或 {test: /\.css$/ , loader : ["style", "css"]},
      // 先后使用css-loader、style-loader来进行处理 
      { 
        test : /\.(png|jpg|gif|svg)$/i, 
        loaders : [  // 指定多个loader
          'url-loader?limit=1000&name=assets/[name]-[hash:5].[ext]',
            // [name] 使用原名称 
            // [hash:5] 截取hash的前5位 
            // [ext] 使用原扩展名,保持不变  
          'image-webpack', // 用于压缩图片,按照逆序会先执行压缩
        ],
        // 当使用 require('../img.png') 时,将使用url-loader进行处理 
      },
      // { test : /\.(png|jpg|gif|svg)$/i, // 用于处理图片的[相对]路径
      //   // HTML、CSS中图片的相对路径会被替换
      //   // 组件模版中HTML内需如此使用 <img src="${require(../a.png)}"/>
      //   loader : 'file',
      //   query : {
      //     name :'assets/[name]-[hash:5].[ext]' , // 用于定义图片的路径
      //     // [name]、[hash]、[ext]都为占位符表示名字、哈希和后缀名
      //     // 其中 [hash:5] 表示取hash字符串中的5位
      //   }
      // },
      // { test : /\.(png|jpg|gif|svg)$/i, 
      //   loader : 'url', // 可以处理图片或文件
      //   query : {
      //     limit : 20000, // 20k,当图片小于该该值时,将被转换为base64
      //     // 否则交由 file-loader 来处理
      //     name :'assets/[name]-[hash:5].[ext]' , 
      //   }
      // },
    ],
    // 创建'module'模块时,匹配请求的规则数组 
    rules: [    // '2.x'版本写法 
      { 
        test: regp, // 可选,匹配特定条件,正则表达式或正则表达式的数组  
        include: str|strArr, // 可选,匹配特定条件 
        exclude: str|strArr, // 可选,排除特定条件 
        and: [], // 必须匹配数组中的所有条件 
        or: [],  // 匹配数组中任何一个条件
        not: [], // 必须排除这个条件
        use: [
          {loader: 'aoo-loader',
            options: {  // 配置或使用'?key1=val1&key2=val2'的形式  
            },
          },
          "boo-loader", // 使用多个loader 
          {loader: "coo-loader",
            options: {
            }
          },
          ...
        ],
        use: [ "aoo-loader" ], // 简写方式
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
      { test: /\.html$/,
        use: "raw-loader"
      },
      { test: /\.css$/,
        use: 'style-loader!css-loader?-autoprefixer',
      },
      { test: /\.scss$/,
        use: 'style-loader!css-loader!sass-loader'
      },
      { test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/, // 处理字体文件
        use: 'file-loader'
      },
      { test: /\.(png|jpg|gif)$/,
        // 图片加载器,类似file-loader,可将小图片转成base64,减少http请求
        // 将小于8192byte的图片转成base64码 
        use: 'url-loader?limit=8192&name=images/[hash].[ext]'
      },
      { test: /\.js$/,
        // `-loader`后缀在webpack2不可省略  
        use: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["es2015","stage-0"],
          plugins: ['syntax-dynamic-import'],
          cacheDirectory: true,    // 缓存结果
        }
      },
      { test: /\.vue$/,
        use: 'vue-loader',    
        options: {
          loaders: {
            // <style lang="scss">
            scss: 'vue-style-loader!css-loader!sass-loader',               
            // <style lang="sass">
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax', 
          },
        },
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
  require()时指定使用的loader  
    Example:require("loaderName!./xx/fileName.xx");  
    使用'!'隔离,表示引用前指定由 loaderName 来处理 .xx 文件,
    可同时使用多个,如 require("style-loader!css-loader!./style.css");
  'Query Parameters'loader的配置参数 
    在'webpack.config.js'文件中进行配置 
      {
        test: /\.png$/,
        loader : 'url-loader?mimetype=image/png'
      }
      或
      {
        test : /\.png$/,
        loader : 'url-loader',
        query : {mimetype : "image/png"}
      }
    在'require'时配置 
      require("url-loader?mimetype=img/png!./file.png");
      require("style-loader!css-loader!./css/css.css");
    在命令行中进行配置 
      webpack a.js b.js --module-bind "css=style-loader!css-loader"   
  loader枚举 
    css-loader    使webpack具备处理'.css'文件的能力 
      比如<img src="...">,background: url(...)和'@import'都是被当做依赖的模块来处理 
      url(./image.png) 被转译成 require('./image.png')。
    style-loader  用于将引入的样式文件插入到HTML中 
    less-loader   '.less'文件处理 
      less-loader会自动将'@import'引入的css属性增加浏览器前缀 
    file-loader   接收并加载任何文件,然后将其输出到构建目录  
      import MyImage from './my-image.png'
      // MyImage 变量将为该图像在处理后的最终url 
      var myIcon = new Image();
      myIcon.src = Icon;
    url-loader    在JS中处理引入的图片文件 
      { test: /\.(png|jpg)$/, 
        loader: 'url-loader?limit=8192' 
        // 当图片体积小于8192bytes时,转换为 base64
      }
      { test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=10000&name=build/[name].[ext]'
        // 若图片资源小于10kb就会转化成 base64 格式的 dataUrl,
        // 其他的图片会存放在build/文件夹下 
      }
      { test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 处理字体文件
        loader: 'url-loader',
        options: {
          limit: 7186, // inline base64 if <= 7K
          name: 'static/fonts/[name].[ext]'
        },
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        },
      }
    vue-loader    把'.vue'文件转换成webpack包,和整个打包过程融合起来 
      默认情况,vue-loader是自动用css-loader 
    xml-loader    处理这'.xml'文件 
'Plugins'插件: 扩展webpack的功能 
  PS: 目的在于解决'loader'无法实现的其他事,可能会配合'loaders'来使用  
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
  webpack.optimize.UglifyJsPlugin        压缩处理 
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false, // 警告信息 
      },
      mangle: {}, // 代码混淆,默认是开启的 
      except: ['$super','exports','$'], // 排除关键字 
    })
  webpack.optimize.CommonsChunkPlugin    提取公共模块 
    new webpack.optimize.CommonsChunkPlugin({
      name: 'aoo', // 指定公共块的名称 
      minChunks: 2, //公共模块被使用的最小次数
      // 配置为2,即一个模块被使用2次及以上时才会被提取出来作为common chunks
      children:true, // 可选,若为true,那么公共组件的所有子依赖都将被选择进来
      filename: 'vendor.js',
      minChunks: 3
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
  ◆常用插件 
  'uglifyjs-webpack-plugin'     代码精简压缩 
    PS: 可'tree shaking'用于描述移除JS上下文中的未引用代码'dead-code' 
      前提是使用ES2015模块语法即'import'和'export'  
    npm i -S uglifyjs-webpack-plugin 
    const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
    new UglifyJSPlugin({
      'sourceMap': true, // 启用'source-map'
    })
  'html-webpack-plugin'    在分发目录新建HTML文件 
    npm install html-webpack-plugin --save-dev // 安装插件
    new htmlWebpackPlugin({  
      'title': '标题',
      'template' : './aoo.html' , // 指定html文件做为将生成的HTML文件的模版,
      // 按照output的path路径中生成html文件,并引入打包后的文件
      'filename' : 'aoo-[hash].html', // 指定生成的HTML的名称
      'inject' : 'head' ,  // 指定打包后的文件插入的位置,
        // 'head'   <head>中
        // 'body'   <body>内部尾部 
        // false 则表示不放入到指定模版生成的文件中
      'aoo' : 'boo',   // 自定义的属性,可在指定的模版文件中引用
      // 模版文件中 方式为 <%= htmlWebpackPlugin.options.aoo %>
      'minify' : {  // 对按照模版生成的文件进行压缩
        removeComments : true ,     // 删除注释
        collapseWhitespace : true , // 删除空格 
      } , 
      'chunks' : ['main','a']  // 指定加载的打包后的文件,默认为所有 
      'excludechunks' : ['b'], // 指定除了选中的打包后的文件
      'hash': true,
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
    npm install extract-text-webpack-plugin -S  命令行进行安装插件 
      
    var ExtractTextPlugin = require('extract-text-webpack-plugin');
    module.exports = {
      entry: {
        main: './src/main.js'
      },
      output: {
        // 打包输出的目录,这里是绝对路径,必选设置项
        path: path.resolve(__dirname, './dist'),
        // 资源基础路径
        publicPath: '/dist/',
        // 打包输出的文件名
        filename: 'build.js'
      },
      module: {
        rules: [
          { test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader?minimize'
            })
          },
          { test: /\.less$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                { loader: "css-loader?minimize" },
                { loader: "less-loader" }
              ]
            })
          },
        ]
      },
      plugins: [
        new ExtractTextPlugin({ 
          filename: 'static/css/app.css', 
          allChunks: true 
        })
      ]
    }
    将会生成/dist/static/css/app.css,此时output.publicPath 将会发挥作用
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
  'clean-webpack-plugin'  文件管理插件 
    npm i -D clean-webpack-plugin 
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    new CleanWebpackPlugin(['dist'])  // 每次打包前会清理'dist'文件夹 
'webpack-merge'通用配置工具: 提取开发环境和生产环境的公用配置  
  npm i -S webpack-merge // 安装  
  新建文件如下,用于开发环境和生产环境的配置  
  webpack.common.js  // 公共配置 
    module.exports = {
      entry: {},
      output: {},
      plugins: [],
    };
  webpack.dev.js     // 开发环境 
    const merge = require('webpack-merge'); 
    const common = require('./webpack.common.js'); 
    module.exports = merge(common, { 
      devtool: 'inline-source-map', 
      devServer: { 
        contentBase: './dist', 
      }, 
    }); 
  webpack.prod.js    // 生产环境 
    const merge = require('webpack-merge'); 
    const common = require('./webpack.common.js'); 
    const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); 
    module.exports = merge(common, { 
      plugins: [ 
        new UglifyJSPlugin() 
      ] 
    }); 
  package.json       // 命令配置  
    "dev": "webpack-dev-server --open --config webpack.dev.js",
    "prd": "webpack --config webpack.prod.js"
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
使用步骤 
  创建项目文件夹 myproject
  cd myproject
  npm init 
  npm install html-webpack-plugin -D  安装用于自动快速的生成HTML的插件 
  ...
  'webpack.config.js'文件创建  
    var path = require('path');
    var HtmlwebpackPlugin = require('html-webpack-plugin');
    //定义了一些文件夹的路径
    var rootPath = path.resolve(__dirname);
    var appPath = path.resolve(rootPath, 'app');
    var buildPath = path.resolve(rootPath, 'build');
    
    module.exports = {
      entry: appPath,
      output: {
        path: buildPath,
        filename: 'bundle.js'
      },
      plugins: [
        new HtmlwebpackPlugin({
          title: 'Hello World app'
        })
      ]
    };
  添加第三方库 
    npm install jquery  -D // 如使用jquery之类的库,需安装jquery的支持
      var $ = require('jquery');
      var app  = document.createElement('div');
      app.innerHTML = '<h1>Hello World it</h1>';
      document.body.appendChild(app);
      $('body').append('<p>look at me!</p>'); 
    ...
  webpack  // 项目根目录执行命令  
  部署上线 
    新创建一个单独的config文件,因为部署上线使用webpack的时候
    不需要一些dev-tools,dev-server和jshint校验等。
    复制现有的config文件,命名为 webpack.prod.config.js,
    将里面关于devServer等和开发有关的东西删掉 
    'package.json'中添加命令 
      "scripts": {
        // 测试环境  
        "dev": "webpack-dev-server --hot --inline",  
        // 生产环境 
        "bd": "webpack --progress --profile --colors --config webpack.production.config.js" 
      },
--------------------------------------------------------------------------------
'RequireJS'模块化开发框架,一种"在线编译"模块的方案 
  模块化开发的目的 
    开发阶段: 不打包、不压缩、模块化开发 
    部署阶段: 自动打包、压缩  减少http请求
  功能 
    异步加载文件 
    模块化开发: 
      一个文件一个模块 
      减少全局变量 
  加载机制  
    使用 head.appendChild() 将每个依赖加载成script标签,故可跨域加载 
    加载后的模块会立即执行 
define(['name',] [dependArr,]foo)  定义模块 
  name      模块名,默认为文件名,一般省略  
  dependArr 依赖模块名组成的数组,可选   
  foo       模块实现,工厂方法,模块初始化要执行的函数或对象 
    若为函数,只被执行一次,传入参数顺序对应依赖模块的顺序
    若是对象,此对象为模块的输出值 
  define(obj)  定义简单的对象 
require(dependArr,foo)  加载模块 
  PS: require()函数在加载依赖时是异步加载的 
  dependArr 依赖的模块名组成的数组 
  foo       依赖模块都加载完后执行的函数,传入参数顺序对应依赖模块的顺序 
requirejs.config(configObj)  RequireJS配置 
  configObj     配置对象 
  {
    baseUrl : '/a',   
    paths : {          
      'jquery' : 'lib/jquery', // 配置模块路径 
      'vue' : [
        '//cdn.bootcss.com/vue/2.3.0/vue',  // 首选加载模块 
        'lib/vue'   // 上一个模块加载失败后备用的加载文件 
      ],
      'css' : './lib/require/css',
      'i18n' : './lib/require/i18n',
    },
    shim : {  
    },
    map : {    
      'app/api' : {  // 指定'app/api'模块的'jquery'依赖为'./lib/jquery'
        'jquery' : './lib/jquery',
      },
      'app/api2' : { // 指定'app/api2'模块的'jquery'依赖为'./lib/jquery2'
        'jquery' : './lib/jquery2',
      },
      '*' : {  // 指定所有的模块'jquery'依赖为'./lib/jquery2' 
        'jquery' : './lib/jquery2',
        'css' : './lib/require/css',
      },
    },
    waitSeconds : 10,  
    urlArgs : 'name=1111',
    config : {
      text : { // 配置text插件模块 
        onXhr : function(xhr,url){ // ajax执行的open方法[send方法前],可用来设置http头 
          xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
        },
        createXhr : function(){ // 用来覆盖text插件默认的xhr对象,一般用不到
        },
        onXhrComplete : function(xhr,url){ // ajax完成后支持的函数 
        },
      },
    },
  }
  baseUrl   配置RequireJS加载文件的根路径 
    HTML中插入的JS    以当前HTML文件路径为跟路径 
    <script src=".require.js" data-main='/a/app'></script>  在当前HTML路径上加上'/a' 
  paths     配置模块的路径 
  shim      配置不支持AMD的模块 
    如 Modernizr.js 
    shim : {
      'modernizr' : {  // 不支持AMD的模块名称 
        // deps : ['jquery'], // 依赖的模块名称,可选  
        exports : 'Modernizr', // 输出的模块对象名称  
        // init : function($){ // 初始化函数,可选,返回的对象代替exports作为模块对象  
        //   return $;
        // },
      }
    }
    如 bootstrap, bootstrap只有依赖,而无全局变量  
    shim : {
      bootstrap : ['jquery'] // 简写方式 
    }
  map       配置不同模块的相同依赖指向不同文件 
  waitSeconds 下载js等待的时间,默认7秒,若设为0,则禁用等待超时;超时则RequireJS会报错
  urlArgs   下载文件时,在URL后增加额外的query参数 
插件模块 
  text插件模块 : 用于加载文本文件的RequireJS插件
    可用于加载HTML; 本质通过AJAX请求来加载文本,有跨域的限制 
    require(['text!/user.html!strip'],function(template){ 
      // 会先加载text插件模块在加载'user.html'模块 
      // !strip 可选,只获取'user.html'中body内的部分 
      console.log(template);
    })
  CSS插件模块 : 用于加载样式文件的RequireJS插件  
    为了让'css!'生效,需在RequireJS中配置['map'内或'paths'内任选一个进行配置]
    require(['css!jqurey-ui.css',]function(){
    })
  i18n插件模块 : 支持国际化多语言 
    require(['i18n!./nls/message',],function(i18n){
      console.log(i18n.aoo);
    })
    必须包含'nls',即加载的内容需放置于'nls'文件夹内 
    文件夹设置 
      nls 
        en 
          messages.js 
            define({
              'aoo' : 'show English'
            })
        zh 
          messages.js 
            define({
              'aoo' : '显示为中文'
            })
        messages.js  
          define({
            'en' : true,
            'zh' : true,
          })
    指定语言 
      1. 使用浏览器的 navigator.language 或 navigator.userLanguage 属性
      2. 配置语言 
        config : {
          i18n : {
            locale : 'zh' 
          }
        }
r.js  打包工具 
  npm install requirejs -g   通过npm安装RequireJS 
    r.js.cmd -o baseUrl=xx name=xx out=xx.js   命令行执行,进行打包
      进入对应文件夹下的命令行环境执行,
      baseUrl=路径
      name=要打包的文件名[可以不带文件后缀]
      out=命名输出文件的名称 
  下载 r.js 文件 
    通过Node执行 r.js 来进行打包 
    node r.js -o baseUrl=xx name=xx out=xx.js  
      进入存放 r.js 文件的目录下,命令行中执行   
  通过配置文件来打包 
    node r.js -o app.build.js 
      配置文件即为 app.build.js 
      ({
        appDir : './src', // 要打包的根目录,会将CSS也打包,./ 表示该配置文件所在的位置 
        baseUrl : './js', // 所要打包的目录 
        dir : './build', // 输出目录 
        mainConfigFile : 'src/js/requirejs.config.js', // 指定RequireJS的配置文件 
        optimize : 'none', // 可选 'uglify', 是否使用压缩 
        inlineText : false, // 使用 text 插件后,将HTML文件不打包 
        // name : 'app',     // 打包的具体文件 ,单模块打包 同 modules 互斥 
        modules : [   // 多模块打包 
          {
            name : '' , // 打包的模块名 
            include : [  // 添加所需要一起打包的文件 
              '',
              '',
            ],
            exclude : [ // 排除不打包的模块 
              '',
              '',
            ],
            excludeShallow : [ // 浅移除,仅将列出的模块移除,但会将其依赖打包进来  
              '',
            ],
            insertRequire : [
              '',
            ],
          },
          {
            
          },
        ]
      })
-------------------------------------------------------------------------待整理 


