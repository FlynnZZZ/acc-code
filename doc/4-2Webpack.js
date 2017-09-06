Webpack: 模块加载器兼打包工具 
介绍 
  基于JS,包括四大核心'Entry''Output''Loaders'和'Plugins';
  把各种资源[如JS、coffee、less、sass、图片等]都作为模块来使用和处理,
  支持'AMD''commonJS''ES6Moudle'三种引入方式
  原理: 
    把所有的非js资源都转换成js,
    如把一个 css 文件转换成“创建一个 style 标签并把它插入 document”的脚本、
    把图片转换成一个图片地址的 js 变量或 base64 编码等,
    然后用 CommonJS、AMD 或 ES6模块化 的机制管理起来。
  工作方式 
    把项目当做一个整体,通过一给定的主文件[如 index.js],
    Webpack将从该文件开始找到项目的所有依赖文件,使用配置的loaders处理它们,
    最后打包为一个浏览器可识别的JS文件;
  说明 : 
    从'2.0'版本开始,支持用'ES6module'规范[import/export]去进行模块打包 
    'chunk'  表示为 '块'
命令行命令 
  npm i -g webpack  全局安装Webpack[仅一次即可]
  npm init                npm初始化,创建'package.json'文件 
  npm i webpack --save-dev     安装webpack并写入依赖配置文件  
  npm i -g webpack-dev-server  静态资源服务器 
    安装后就可使用 webpack-dev-server 命令了,将 webpack 项目在本地起服务 
    基于Node.js Express框架的轻量开发服务器
    开发中会监听文件的变化在内存中实时打包
    可以使用webpack-dev-server直接启动,
    也可以增加参数来获取更多的功能,具体配置可以参见官方文档。
    默认启动端口8080,通过localhost:8080/webpack-dev-server/可以访问页面,
    文件修改后保存时会在页面头部看到sever的状态变化,并且会进行热替换,实现页面的自动刷新。
    
    安装完毕后 在config中添加配置
    module.exports = {
      ....
      devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
      },
      ...
    }
    然后再 package.json 里配置运行的命令[npm支持自定义一些命令]
    ...
    "scripts": {
      "start": "webpack-dev-server --hot --inline"
    },
    ...      
  webpack aoo.js boo.js [<options>]    将'aoo.js'文件打包成'boo.js'文件 
    ◆<options>   可选,表示配置参数,可同时使用多个 
    --watch           当文件更改时,自动打包
    --progress        打包时显示进度
    --display-modules 打包完后显示依赖的模块 
    --display-reasons 显示打包的原因 
  webpack                    启动webpack
  webpack -v                 查看版本号 
  webpack -h                 查看版本信息及可用的指令 
  webpack -w                 提供watch方法,实时进行打包更新
  webpack -p                 对打包后的文件进行压缩
  webpack -d                 提供SourceMaps,方便调试
  webpack --colors           输出结果带彩色,比如:会用红色显示耗时较长的步骤
  webpack --profile          输出性能数据,可以看到每一步的耗时
  webpack -p       p 表示'生产'模式,输出文件会被 uglifies/minifies 
'webpack.config.js'默认的配置文件 
  PS:需手动创建该文件; 通过 webpack.config.js 文件来进行相应的配置;
    该文件是一个 node.js 模块,返回一个 json 格式的配置信息对象,
    或者通过 --config 选项来指定配置文件;
  命令行  
    webpack              [在命令行中当前文件夹下],默认按照配置文件来执行进行打包  
    webpack --config xx.js  自定义配置文件[可不再是默认的 webpack.config.js]
  配置详情 
    let webpack = require('webpack');
    let path = require('path');
    module.exports = {     // commonjs 模块化 输出 
      入口文件: 将被打包的文件 
        PS: 格式可为str,arr,obj 
        str     指定单一的入口文件 
          './src/index.js'
        arr     将多个文件打包在一起 
          [ './entry1.js' , 'entry2.js' ] 
        obj     'key-val'形式,对象的val可为str或arr 
          适用于可能需要不止一个入口的情况 
          同'output'的关系 
            输出打包后的文件和output参数有关,若 output.filename 仍指定为一个值,
            则最后打包后的文件只有一个,结果是两个同名的文件产生覆盖的结果,
            output.filename 可采用占位符的形式来指定来打包成多个文件[详见output配置]
            entry : {
              main : './src/index.js'
              page1 : './aoo.js',
              page2 : [ './entry1.js' , 'entry2.js' ],
               vendors: ['vue', 'vue-router','vue-resource','vuex']    需进行单独打包的文件  
            }
      'entry' : './src/main.js',   
      'context': __dirname + "/src", // __dirname 是指项目根目录
      指定打包文件的输出 
        项目的入口点,指定打包后的文件,作为执行上下文的根
      'output': { 
        'path' : './dist/js',      存放路径,输出的路径都相对于它 
        'publicPath': '/dist/',    对应的server上的路径
        'filename' : './bundle.js' 打包后的文件的名称 
          也可定义路径,会接着path后,推荐只指定名称 
          可使用占位符指定动态的输入 
            当存在多个输出的文件时用于指定名称[如entry的val为obj时」
            [name]      表示entry的obj的key
            [hash]      表示打包时产生的hash值
            [chunkhash] 每个chunk的hash值,相当于文件的MD5值 
              MD5值为了保证每个文件的唯一性
            Example: filename : '[name]-[hash].js'
        'chunkFilename': 'js/[name].asyncChunk.js?'+new Date().getTime()   chunk生成的配置
      },
      执行完成后,生成文件的存放位置的属性
      'resolve' : {
        'root' : [path.join(__dirname,'src')],
        'extensions' : ['','.ts','.js'],
        'alias': {
          'vue': 'vue/dist/vue.js'
        },
      },
      加载器,定义对模块的处理逻辑[详见'Loaders']
      'module' : { },
      插件 [详见'Plugins']
      'plugins' : [ ],
      使用'webpack-dev-server'启动热刷新插件
      'devServer': {
        contentBase: path.join(__dirname, "/"),
        host: 'localhost',  建议写IP地址,开发时候电脑的ip地址,localhost可能有问题  
        port: 9090,         默认9090
        inline: true,       可以监控js变化
        hot: true           热启动
      },
    } 
    多文件单输出 
      const webpack = require("webpack");
      module.exports = {
        context: __dirname + "/src",
        entry: {
          app: ["./home.js", "./events.js", "./vendor.js"],
        },
        output: {
          path: __dirname + "/dist",
          filename: "[name].bundle.js",
        },
      };
      根据数组顺序,文件全部会被一起打包在 dist/app.bundle.js 里 
    多文件多个输出 
      const webpack = require("webpack");
      module.exports = {
        context: __dirname + "/src",
        entry: {
          home: "./home.js",
          events: "./events.js",
          contact: "./contact.js",
        },
        output: {
          path: __dirname + "/dist",
          filename: "[name].bundle.js",
        },
      };
      会被打包成以下三个文件:
      dist/home.bundle.js、 
      dist/events.bundle.js, 
      dist/contact.bundle.js。
  其他说明 
    版本2.x 官方推荐 module.rules 写法
    module.exports = {
      module: {
        rules: [   
          {
            test: /\.js$/,
            use: [ 'babel-loader' ],
            exclude: /node_modules/ ,    // 跳过 node_modules 目录
            options: {
              cacheDirectory: true    // 缓存结果
            }
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
            // Loaders 会根据数组的逆序运行,即 css-loader 会跑在 style-loader 前面。
          }
        ]
      }
    }
    版本1.x 前,更多的用 module.loaders 写法
    module.exports = {
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
      }
    }      
  执行过程
    从 context 文件夹开始 寻找 entry 上的文件名, 读取内容
    每当遇到 import 或者 require()  依赖项时,解析这些代码,并且打包到最终构建里。
    接着它会不断递归搜索实际需要的依赖项,直到它到达了“树”的底部。
    从上一步接着,Webpack 把所有东西打包到 output.path 的文件夹里,
    并使用 output.filename 命名 [ [name] 表示使用 entry 项的 key」
  Example: 
    完整的wepack配置文件 webpack.config.js
    2017.4.8 新增less支持,先安装less和less的加载器
    // 安装完成之后在配置文件中添加对应的加载器规则
    npm i less less-loader -S
    var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');
    
    module.exports = {
      devtool: 'eval',
      entry: {
        main: './src/main.js'
      },
      resolve: {
        // 自动解析确定的扩展
        extensions: ['.js', '.vue'],
        // 告诉 webpack 解析模块时应该搜索的目录
        modules: [
          path.resolve(__dirname, 'src'),
          'node_modules'
        ],
        alias: {
          'src': path.resolve(__dirname, './src')
        }
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
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader?minimize'
            })
          },
          // 支持less,2017.4.8添加
          {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                { loader: "css-loader?minimize" },
                { loader: "less-loader" }
              ]
            })
          },
          {
            // 处理图片文件
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 7186, // inline base64 if <= 7K
              name: 'static/images/[name].[ext]'
            }
          },
          {
            // 处理字体文件
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 7186, // inline base64 if <= 7K
              name: 'static/fonts/[name].[ext]'
            }
          }
        ]
      },
      plugins: [
        // https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        new ExtractTextPlugin({ filename: 'static/css/app.css', allChunks: true })
      ]
    }    
  ◆注解 
Loaders,解释器  用于编译解释指定类型的文件,在打包之前对依赖进行预处理 
  PS:loader机制支持载入各种各样的静态资源,不只是js脚本,
    连 html,css,images 等各种资源都有相应的 loader 来做依赖管理和打包
    Webpack本身只能处理JS模块,若要处理其他类型的文件,就需使用loader进行转换;
    多个loader之间使用”!”连接,类似于Linux的pipe命令,加载器的加载顺序为从右向左处理;
    对于所需要的加载器,需要写在 package.json 文件中,
    并通过npm install下载安装到./node_modules文件夹中才会生效,
    否则在编译过程中因找不到加载器报错
    webpack提供强大的 loader API 来定义对不同文件格式的预处理逻辑
    基于loader可实现大量高级功能, 如自动分块打包并按需加载、对图片资源引用的自动定位、
    根据图片大小决定是否用base64内联、开发时的模块热替换等等;
  特性 
    可通过管道方式链式调用 
      每个loader可以把资源转换成任意格式并传递给下一个loader,
      但是最后一个loader必须返回JavaScript。
    Loader可以同步或异步执行
    Loader运行在nodejs环境中,所以可以做任何可能的事情
    Loader可以接受参数,以此来传递配置项给loader
    Loader可以通过文件扩展名[或正则表达式]绑定给不同类型的文件
    Loader可以通过npm发布和安装 
    除了通过 package.json 的main指定,通常的模块也可以导出一个loader来使用
    Loader可以访问配置
    插件可以让loader拥有更多特性
    Loader可以分发出附加的任意文件
  相关命令 
    npm install <loaderName> --save-dev   安装loader 
      npm install css-loader style-loader    同时安装多个loader 
  Query_Parameters,loader的配置参数 
    在 require 时配置 
      require("url-loader?mimetype=img/png!./file.png");
      require("style-loader!css-loader!./css/css.css");
    在 webpack.config.js 配置文件中进行配置 
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
    在命令行中进行配置 
      webpack a.js b.js --module-bind "css=style-loader!css-loader"   
  'webpack.config.js'文件配置  
    PS:根据模块类型[扩展名]来自动绑定需要的 loader
      为了让加载器工作,需要一个正则表达式来定义需修改的文件,
      以及一个字符串或数组用来申明我们需要使用的加载器。
    'module' : {
      loaders : [    '1.x'版本写法 
        通过正则的test方法将文件的后缀名法进行匹配,成功则使用指定的loader来处理  
        { test : /\.ts$/,
          loader : 'ts-loader',
        }, 
        {test: /\.css$/ , loader : 'style!css'},
          或 {test: /\.css$/ , loader : ["style", "css"]},
      ],
      rules: [       '2.x'版本写法 
        { test: /\.vue$/,
          loader: 'vue-loader',    
          options: {
            loaders: {
              scss: 'vue-style-loader!css-loader!sass-loader',               <style lang="scss">
              sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' <style lang="sass">
            }
          }
        },
        { test: /\.html$/,
          loader: "raw-loader"
        },
        { test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
        { test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: ["es2015","stage-0"],
            plugins: ['syntax-dynamic-import']
          }
        },
        { test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader'
        },
        { test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
          loader: 'file-loader'
        },
        { test: /\.(png|jpg|gif)$/,
          图片加载器,类似file-loader,可将小图片转成base64,减少http请求
          如下配置,将小于8192byte的图片转成base64码
          loader: 'url-loader?limit=8192&name=images/[hash].[ext]'
        },
        { test: /* RegEx */,
          use: [
            {
              loader: /* loader name */,
              query: /* optional config object */
            }
          ]
        }
      ]
    }
    其他使用方式 
      require时指定使用的loader  
        Example:require("loaderName!./xx/fileName.xx");  
        使用'!'隔离,表示引用前指定由 loaderName 来处理 .xx 文件,
        可同时使用多个,如 require("style-loader!css-loader!./style.css");
      命令行中编译时指定 
        webpack file1.xx file2.xx --moudle-bind 'fileType=loaderName' 
        webpack a.js a.bundle.js --moudle-bind 'css=style-loader!css-loader' 
        // 指定了style和css 两个loader
  loader枚举 
    css-loader       使webpack具备处理'.css'文件的能力 
    style-loader     用于将处理的样式文件插入到HTML中 
      Example:
        a.js 文件中: 
          require("style-loader!css-loader!./style.css");
        命令行编译,将 a.js 打包成 a.bundle.js :
          webpack a.js  a.bundle.js
        index.html 文件中
          引入 a.bundle.js 文件
          则 style.css 文件的内容被插入到了该HTML中
    URL资源处理        
      默认情况,vue-loader 是自动用 css-loader 和 Vue 组件编译器来处理样式和模板文件的。在处理过程中,所有的资源 URL 比如<img src="...">, background: url(...) 和 CSS @import 都是被当做依赖的模块来处理。
      
      例如,url(./image.png) 被转译成 require('./image.png')。
      
      <img src="../image.png">
      如上会被再转译成:
      
      createElement('img', { attrs: { src: require('../image.png') }})
      因为 .png 并不是个 JavaScript 文件,你需要配置 Webpack 使用 file-loader 或者 url-loader 处理它们。项目脚手架工具 vue-cli 也能帮你配置这些。
      
      这样做的好处是:
      
      file-loader 允许你指定在哪里复制和存放静态资源文件 ,以及用版本哈希值命名从而更好利用缓存。 这意味着,可以把图片放到 *.vue 文件旁边,可使用相对路径,而不需要担心发布时候的 URL。使用适当的配置,Webpack 在打包输出的时候,会自动把文件路径转为正确的 URL。
      
      url-loader 允许你内联 base-64 数据格式的URL资源,若小于设定的阈值。这样可以减少 HTTP 请求小文件的数量。若文件大于这个阈值。会自动it automatically falls back to file-loader.          
    css-loader       在JS中处理引入的CSS  
    style-loader     用于将引入的样式文件插入到HTML中 
      Example:
        a.js 文件中: 
          require("style-loader!css-loader!./style.css");
        命令行编译,将 a.js 打包成 a.bundle.js :
          webpack a.js  a.bundle.js
        index.html 文件中
          引入 a.bundle.js 文件
          则 style.css 文件的内容被插入到了该HTML中
    vue-loader       可把 .vue 文件转换成webpack包,和整个打包过程融合起来 
    url-loader       在JS中处理引入的图片文件 
      ◆css中 
      h1 {
        color: $red;
        background: url('./imgs/avatar.jpg');
      }
      ◆main.js 
      var img1 = document.createElement("img");
      img1.src = require("./small.png");
      document.body.appendChild(img1);
      var img2 = document.createElement("img");
      img2.src = require("./big.png");
      document.body.appendChild(img2);
      ◆index.html 
      <script type="text/javascript" src="bundle.js"></script>
      ◆webpack.config.js 
      module.exports = {
        entry: './main.js',
        output: {
          filename: 'bundle.js'
        },
        module: {
          loaders:[
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
            // 当图片体积小于8192bytes时,转换为 base64
          ]
        }
      };
      
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=10000&name=build/[name].[ext]'
      }
      若图片资源小于10kb就会转化成 base64 格式的 dataUrl,
      其他的图片会存放在build/文件夹下 
  Example: 
    module: {
      loaders: [ //加载器配置
        //.vue文件使用vue-loader处理（这里将-loader省去了）
        {
          test: /\.vue$/,
          loader: 'vue'
        },
        //.js文件首先经过ealint-loader处理,再经过babel-loader处理
        {
          test: /\.js$/,
          loader: 'babel!eslint',
          // make sure to exclude 3rd party code in node_modules
          exclude: /node_modules/
        },
        {
          //图片文件使用url-loader处理,小于10kb的直接转换为base64
          test: /\.(png|jpg|gif)$/,
          loader: 'url',
          query: {
            limit: 10000,
            // fallback to file-loader with this naming scheme
            name: '[name].[ext]?[hash]'
          }
        }
      ]
    }
    在JS中引入CSS 
    若在JS中添加css文件,就需要使用到 css-loader 和 style-loader,
    css-loader 会遍历 CSS 文件,然后找到 url() 表达式然后处理他们,
    style-loader 会把原来的 CSS 代码插入页面中的一个 style 标签中。
  使用案例
    样式CSS 
      需要css和style加载器
      npm install --save-dev css-loader style-loader
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              { loader: 'style-loader' },
              { loader: 'css-loader' }
              // main.css 将先经过css加载器的处理,然后是style加载器
            ]
          }
        ]
      }
    预处理器,如LESS或其他css预处理器
      需要安装相应的加载器,并添加到规则中
      rules: [
        {
          test: /\.less$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'less-loader' }
          ]
        }
      ]
    编译,如使用Babel加载器来编译脚本文件
      rules: [
        {
          test: /\.js$/,
          use: [
            { loader: 'babel-loader' }
          ]
        }
      ]
    图片
      Webpack可以在样式表里检测出 url()语句,让加载器对图片文件或链接本身做出一些改变 
    
    index.less file
    @import 'less/vars';
    body {
      background-color: @background-color;
      color: @text-color;
    }
    .logo {
      background-image: url('./images/logo.svg');
    }
    
    {
      test: /\.svg$/,
      use: [
        {
          loader: 'url-loader',
          query: { limit : 10000 }
        }
      ]
    }
    可以应用文件加载器来拷贝文件,或使用url-加载器,将图片替换为base64字符串,
    除非它超过字节限制,在这种情况下,它将用相对路径替换url语句,并将文件复制到输出位置。
    加载器可以通过传递query对象来配置,比如我们可以配置加载器内联文件,当文件不超过10Kb的时候。
Plugins,插件    扩展webpack的功能 
  var HtmlWebpackPlugin = require("html-webpack-plugin");
  plugins: [
    //webpack3.0的范围提升
    new webpack.optimize.ModuleConcatenationPlugin(),  插件初始化 
    //打包生成html文件,并且将js文件引入进来
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/html/index.html'), //生成的html存放路径,相对于path
      template: path.resolve(__dirname, 'src/html/index.html'), //ejs模板路径,前面最好加上loader用于处理
      inject: 'body',  //js插入的位置,true/'head'/'body'/false
      hash: true
    }),
    //提取功能模块
    new CommonsChunkPlugin({
      name: 'vendors', // 将公共模块提取,生成名为`vendors`的chunk
      minChunks: 2, //公共模块被使用的最小次数。配置为2,也就是同一个模块只有被2个以外的页面同时引用时才会被提取出来作为common chunks
      // children:true  //如果为true,那么公共组件的所有子依赖都将被选择进来
    }),
  ],
  ◆内建插件
  webpack.optimize.UglifyJsPlugin        压缩处理 
    module.exports = {
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
      ]
    }
    
    ◆main.js
    var longVariableName = 'Hello';
    longVariableName += ' World';
    document.write('<h1>' + longVariableName + '</h1>');
    ◆index.html
    <html>
    <body>
      <script src="bundle.js"></script>
    </body>
    </html>
    ◆webpack.config.js
    var webpack = require('webpack');
    var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
    module.exports = {
      entry: './main.js',
      output: {
        filename: 'bundle.js'
      },
      plugins: [
        new uglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
      ]
    };
    ◆输出
    var o="Hello";o+=" World",document.write("<h1>"+o+"</h1>")   
  webpack.optimize.CommonsChunkPlugin    提取公共模块 
    module.exports = {
      plugins: [
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          filename: 'vendor.js',
          minChunks: 3
        })
      ]
    }
    
    提取公共模块 
      现在我们build出来的只有一个 bundle.js 
      若第三方库很多的话,会造成这个文件非常大,减慢加载速度,
      现在我们要把第三方库和我们app本身的代码分成两个文件。
      修改entry入口文件
      entry: {
        app: path.resolve(APP_PATH, 'index.js'),
        //添加要打包在vendors里面的库
        vendors: ['jquery', 'moment']
      },
      // 添加CommonsChunkPlugin
      plugins: [
        //把入口文件里面的数组打包成verdors.js
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
      ]
  webpack.ProvidePlugin                  把一个全局变量插入到所有的代码中 
    ◆webpack.config.js 中
    plugins: [
      //provide $, jQuery and window.jQuery to every script
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })
    ]
    ◆js中
    //import $ from 'jquery'; //不需要了,可
    $, jQuery, window.jQuery 都可以直接使用了
  ◆常用插件 
  html-webpack-plugin           在HTML文件中自动引入打包后的文件 
    相关命令  
      npm install html-webpack-plugin --save-dev // 安装插件
    使用
      在 webpack.config.js 中
      // 引用
      var htmlWebpackPlugin = require("html-webpack-plugin");
      在 module.exports 中的 'plugins' 中实例化配置
      module.exports = {
        // context : '', // 指定当前的路径 
        entry : {
          main : './src/main.js',
          a : './src/a.js',
          b : './src/b.js',
        },  
        output: {   
          path : './dist/js',       
          filename : './bundle.js',
          publicPath : 'http://cdn.com/' // 代替 path 添加在 filename 值的前面
        },
        resolve : {
          root : [path.join(__dirname,'src')],
          extensions : ['','.ts','.js']
        },
        module : {
          loaders : [
            {test : /\.ts$/,loader : 'ts-loader'} // 定义各种 loaders
          ]
        },
        plugins : [
          new htmlWebpackPlugin({ // 实例化
            template : './aoo.html' , // 指定html文件做为将生成的HTML文件的模版,
            // 按照output的path路径中生成html文件,并引入打包后的文件
            filename : 'aoo-[hash].html', // 指定生成的HTML的名称
            inject : 'head' ,  // 指定打包后的文件插入的位置,如 head中
            // false 则表示不放入到指定模版生成的文件中
            aoo : 'boo',   // 自定义的属性,可在指定的模版文件中引用
            // 模版文件中 方式为 <%= htmlWebpackPlugin.options.aoo %>
            minify : {  // 对按照模版生成的文件进行压缩
              removeComments : true , // 删除注释
              collapseWhitespace : true , // 删除空格 
            } , 
            chunks : ['main','a'] // 指定加载的打包后的文件,默认为所有
          }),
          new htmlWebpackPlugin({    
            template : './boo.html' ,
            filename : 'boo-[hash].html', 
            inject : 'body' ,  
            minify : {  
              removeComments : true , 
              collapseWhitespace : true , 
            } , 
            excludechunks : ['a'],  // 指定除了选中的打包后的文件
          }),
        ]
      }

      在模版文件中引用 htmlWebpackPlugin
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
          其中 xx 为 webpack.config.js 文件中 module.exports.entry.key 定义的文件 
        在模版中插入打包后的文件的内容
          <script  type='text/javascript'>
            <%= compilation.asserts[htmlWebpackPlugin.files.chunks.main.entry.substr(htmlWebpackPlugin.files.publicPath.length)].source() %>
          </script>
    Example:
      var htmlWebpackPlugin = require('html-webpack-plugin');
      var path = require("path");
      moudle.exports = {
        context : __dirname, // 指定当前上下文环境,即当前路径"./"的位置
        entry : './src/app.js',
        output : {
          path : '.dist',
          filename : 'js/[name].budle.js'
        },
        module : {
          loaders : [
            {test: /\.jade$/ , loader : 'jade' },
            // 通过正则的test方将文件的后缀名法进行匹配
            // 匹配成功则使用 指定的loader
            {test: /\.css$/ , loader : 'style!css'},
            // 或者 {test: /\.css$/ , loader : ["style", "css"]},
          ] 
        }
      }
      
      var htmlWebpackPlugin = require('html-webpack-plugin');
      var path = require("path");
      moudle.exports = {
        context : __dirname, // 指定当前上下文环境,即当前路径"./"的位置
        entry : './src/app.js',
        output : {
          path : '.dist',
          filename : 'js/[name].budle.js'
        },
        module : {
          loaders : [
            { test : /\.js$/,
              loader : 'babel', // 通过 babel 对 JS文件进行编译
              exclude : path.resolve(__dirname,'node_modules'), // 指定不用处理的部分
              // 通过path[Node的API」将相对路径 node_modules 解析为绝对路径
              include : './src/', // 指定处理的范围
              query : {
                presets : ['latest'] 
                // 指定将 js 编译的版本,其他的如 ["es2015"] 等
              }
              // 可在 npm 的 package.json 中 指定
              // "babel" : { "presets" : ["latest"] }
              // 从而取消在此处指定 query 项
            },
            { html : /\.html$/,
              loader : 'html-loader'
            },
            { test : /\.css$/,
              loader : 'style-loader!css-loader?importLoader=1!postcss-loader', 
              // importLoader=1 表示该Loader后的1个loader来处理css中import的css
              // 或 loader : ["style-loader","css-loader"."postcss-loader"]
              // 注: 解析的顺序为 从后向前,即postcss-loader先起作用
              // css-loader 用于在JS中处理 css文件
              // style-loader 用于将处理后的css插入到HTML中
              // 使用 postcss-loader 的 autoprefixer 功能 将css属性添加前缀
              // 需安装 postcss-loader 和 autoprefixer 
            },
            { test : /\.less$/,
              loader : 'style!css!postcss!less', // 可以省略 -loader
              // less-loader 会自动将 @import 引入的css属性增加浏览器前缀
              // 故可省略 ?importLoader
            },
            { test : /\.sass$/,
              loader : 'style!css!postcss!sass',
            },
            // { test : /\.(png|jpg|gif|svg)$/i, // 用于处理图片的[相对」路径
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
            { test : /\.(png|jpg|gif|svg)$/i, 
              loaders : [  // 指定多个loader
                'url-loader?limit=1000&name=assets/[name]-[hash:5].[ext]',
                'image-webpack' // 用于压缩图片,按照逆序会先执行压缩
              ], 
              }
            },
          ]
        },
        postcss : [
          require('autoprefixer')({
            browser : ['latest 5 versions'] , // 最近的5个浏览器的版本
          })
        ],
        或 
        // postcss : function(){
        //   return [
        //     require('autoprefixer')({
        //       browser : ['latest 5 versions'] , // 最近的5个浏览器的版本
        //     })
        //   ]
        // } ,
        plugins : [
          new htmlWebpackPlugin({
            filename : 'index.html',
            template : 'index.html',
            inject : 'body'
          })
        ]
      }
  extract-text-webpack-plugin   提取css文件到单独的文件 
    npm install extract-text-webpack-plugin -S
      
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
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader?minimize'
            })
          }
        ]
      },
      plugins: [
        new ExtractTextPlugin({ filename: 'static/css/app.css', allChunks: true })
      ]
    }
    将会生成/dist/static/css/app.css,此时output.publicPath将会发挥作用
  CommonsChunkPlugin            提取出公用模块 
    开发中需要将多个页面的公用模块独立打包,
    从而可以利用浏览器缓存机制来提高页面加载效率,减少页面初次加载时间,
    只有当某功能被用到时,才去动态的加载。
    
    var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
    module.exports = {
      entry: { a: "./a", b: "./b" },
      output: { filename: "[name].js" },
      plugins: [ new CommonsChunkPlugin("common.js") ]
    }
    
    在文件中根据下面的方式引用即可 
    <script src="common.js"></script> 
    <script src="a.js"></script> 
    <script src="b.js"></script> 
使用步骤 
  创建项目文件夹 myproject
  cd myproject
  npm init 
  新建 webpack.config.js 文件 
    npm install html-webpack-plugin --save-dev  安装用于自动快速的生成HTML的插件
    
    写config文件
    var path = require('path');
    var HtmlwebpackPlugin = require('html-webpack-plugin');
    //定义了一些文件夹的路径
    var rootPath = path.resolve(__dirname);
    var appPath = path.resolve(rootPath, 'app');
    var buildPath = path.resolve(rootPath, 'build');
    
    module.exports = {
      //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
      entry: appPath,
      //输出的文件名 合并以后的js会命名为bundle.js
      output: {
        path: buildPath,
        filename: 'bundle.js'
      },
      //添加我们的插件 会自动生成一个html文件
      plugins: [
        new HtmlwebpackPlugin({
          title: 'Hello World app'
        })
      ]
    };
  添加第三方库 
    如使用jquery之类的库,需安装jquery的支持
    npm install jquery  --save-dev
    在js中引用
    var $ = require('jquery');
    var app  = document.createElement('div');
    app.innerHTML = '<h1>Hello World it</h1>';
    document.body.appendChild(app);
    $('body').append('<p>look at me!</p>');
  在项目根目录运行:  webpack
  部署上线 
    新创建一个单独的config文件,因为部署上线使用webpack的时候
    不需要一些dev-tools,dev-server和jshint校验等。
    复制现有的config文件,命名为 webpack.production.config.js,
    将里面关于 devServer等和开发有关的东西删掉。
    在 package.json 中添加一个命令
    "scripts": {
      "start": "webpack-dev-server --hot --inline",
      "build": "webpack --progress --profile --colors --config webpack.production.config.js"
    },
    当要上线的时候,运行 npm run build
--------------------------------------------------------------------------------
RequireJS 模块化开发框架 
  模块化开发的目的 
    开发阶段: 不打包、不压缩、模块化开发 
    部署阶段: 自动打包、压缩   减少http请求
  功能 
    异步加载文件 
    模块化开发: 
      一个文件一个模块 
      减少全局变量 
  加载机制  
    使用 head.appendChild() 将每个依赖加载成script标签,故可跨域加载 
    加载后的模块会立即执行 
  define(['name',] [dependArr,]foo)  定义模块 
    name      模块名,默认为文件路径,一般省略  
    dependArr 依赖模块名组成的数组,可选   
    foo       模块实现,传入参数顺序对应依赖模块的顺序 
  define(obj)  定义简单的对象 
  require(dependArr,foo)           加载模块 
    dependArr   依赖的模块名组成的数组 
    foo         依赖模块下载完后执行的函数,传入参数顺序对应依赖模块的顺序
  requirejs.config(configObj)      RequireJS配置 
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
  构建工具 
    1 Grunt、Gulp、Webpack
    2 使用npm来配置构建命令 
      npm init   生成 package.json 文件 
        {
          // ... 
          script : {
            'package' : 'node ./xx/r.js -o ./xx/app.build.js',
          }
        }
      npm run-srcipt xx  执行'script'字段内配置的命令 
        简写为 npm run xx 
--------------------------------------------------------------------------------

