npm,node_package_manager node包管理器 
  PS：随同NodeJS一起安装的包管理工具,用于node插件管理[包括安装、卸载、管理依赖等],
    允许用户从NPM服务器下载别人编写的第三方包到本地使用.
    允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用.
    允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用.
  命令行命令 
    PS：所有node_modules/.bin/目录下的命令,都可以用 'npm run 命令' 的格式运行,
      在命令行下,键入 npm run,然后按tab键,就会显示所有可以使用的命令;
      和npm相关的指令或命令前都需添加'npm '
    ◆常用命令 
    npm init        初始化,新建 package.json 文件
    install <name> [-g] [--save-dev] [--save]  使用npm安装插件 
      <name>     node插件名称, 如：npm install gulp-less --save-dev
      -g         全局安装 
        将会安装在C:\Users\Administrator\AppData\Roaming\npm,并写入系统环境变量
        非全局安装：将会安装在当前定位目录；
        全局安装可以通过命令行在任何地方调用它,
        本地安装将安装在定位目录的node_modules文件夹下,通过require()调用
      --save     将该模块写入当前的 package.json 文件中的 dependencies 属性
      --save-dev 将该模块写入当前的 package.json 文件中的 devDependencies 属性
      --save-dev 和 --save 的区别
        --save-dev 是开发时候依赖的东西
        --save     是发布之后还依赖的东西
        比如写 ES6 代码，如果想编译成 ES5 发布那么 babel 就是devDependencies,
        如果用了 jQuery，由于发布之后还是依赖jQuery，所以是dependencies;
      e.g.:
        npm install lodash -g   全局安装 
        npm install npm -g      升级npm版本[会更新所有npm的包?]
    uninstall <name> [-g] [--save-dev]  使用npm卸载插件 
      PS：不要直接删除本地插件包
      npm uninstall gulp-less gulp-uglify gulp-concat 删除列出的全部插件
    list [-g]       当前目录已安装插件[简写'ls']
    update <name>   更新模块
      e.g.：
        npm update -g           更新npm 
        npm update vue-cli -g   更新vue
    npm show express     #显示模块详情
    npm update        #升级当前目录下的项目的所有模块
    npm update express    #升级当前目录下的项目的指定模块
    npm update -g express  #升级全局安装的express模块
    npm uninstall express  #删除指定的模块
    npm -g install npm         最新稳定版
    npm -g install npm@2.9.1   指定版本
    ◆配置参数 
    -v              版本
    其他命令 
      help            查看npm帮助
      search <name>   搜索模块
    已安装 
      npm install lodash       在命令操作符中执行
      npm install express -g   # 全局安装
      npm install less -g    
      npm install express      # 本地安装
      npm install jQuery 
      npm install request
      npm install cheerio
      npm install anywhere -g  快速搭建服务器用于本地调试
      npm install weinre -g    安装weinre,用于调试手机页面
    cnpm npm的淘宝镜像  
      PS：npm的插件安装是从国外服务器下载,受网络影响大,淘宝团队将其复制到自己的服务器上,
        是一个完整 npmjs.org 镜像,可用其代替官方版本[只读],目前同步频率为 10 分钟每次,
        安装完后最好查看其版本号 cnpm -v 或关闭命令提示符重新打开[安装完直接使用可能会出现错误],
        cnpm跟npm用法完全一致,只是在执行命令时将npm改为cnpm;
        官方网址：'http://npm.taobao.org'
      安装cnpm 
        'npm install -g cnpm --registry=https://registry.npm.taobao.org'
    待整理
      npm view vue-cli   查看全局 vue-cli 版本
  package.json npm配置文件
    PS：将配置信息写入 package.json 并将其加入版本管理,通过配置更方便包的管理;
      该文件不是必须的,当没有该文件时,则相应的命令不生效; 
      定义当前项目所需要的各种模块,以及项目的配置信息,如名称、版本、许可证等元数据等;
      package.json 文件就是一个JSON对象,该对象的每一个成员就是当前项目的一项设置。
      比如name就是项目名称,version是版本[遵守“大版本.次要版本.小版本”的格式]。
    相关命令 
      npm init     创建并初始化 package.json 文件
      npm run xx   默认执行该文件中'script'下的属性定义的命令
        package.json 中
        "script" : {
            "aoo" : "node index.js"
          }
        命令行执行 npm run aoo 
        即为执行  node index.js 
    文件内容
      {
        "name": "Hello World",
        "version": "0.0.1",
        "author": "张三",
        "description": "第一个node.js程序",
        "keywords":["node.js","javascript"],
        "repository": {
          "type": "git",
          "url": "https://path/to/url"
        },
        "license":"MIT",
        "engines": {"node": "0.10.x"},
        "bugs":{"url":"http://path/to/bug","email":"bug@example.com"},
        "contributors":[{"name":"李四","email":"lisi@example.com"}],
        "scripts": {
          "start": "node index.js",
          "preinstall": "echo here it comes!",
          "postinstall": "echo there it goes!",
          "start": "node index.js",
          "test": "tap test/*.js"
        },
        // scripts 指定了运行脚本命令的npm命令行缩写,
        // 比如start指定了运行npm run start时,所要执行的命令
        // 其他的为 npm run preinstall、npm run postinstall、
        // npm run start、npm run test时,所要执行的命令
        "dependencies": {
          "express": "latest",
          "mongoose": "~3.8.3",
          "handlebars-runtime": "~1.0.12",
          "express3-handlebars": "~0.5.0",
          "MD5": "~1.2.0"
        },
        // dependencies 字段指定了项目运行所依赖的模块,指向一个对象
        // 对象的各个成员,分别由模块名和对应的版本要求组成,表示依赖的模块及其版本范围。
        "devDependencies": {
          "bower": "~1.2.8",
          "grunt": "~0.4.1",
          "grunt-contrib-concat": "~0.3.0",
          "grunt-contrib-jshint": "~0.7.2",
          "grunt-contrib-uglify": "~0.2.7",
          "grunt-contrib-clean": "~0.5.0",
          "browserify": "2.36.1",
          "grunt-browserify": "~1.3.0",
        }
        // devDependencies 指定项目开发所需要的模块,指向一个对象
        // 对象的各个成员,分别由模块名和对应的版本要求组成,表示依赖的模块及其版本范围。
      }
      版本号的设定规则
        PS： 如 '1.2.2' ,遵循“大版本.次要版本.小版本”的格式规定,安装时只安装指定版本。
          可以加上各种限定,主要有以下几种
        '~',tilde   波浪号+指定版本
          如'~1.2.2',表示安装'1.2.x'的最新版本[不低于'1.2.2'],
          但是不安装'1.3.x',也就是说安装时不改变大版本号和次要版本号
        'ˆ',caret   插入号+指定版本
          比如'ˆ1.2.2',表示安装'1.x.x'的最新版本,不低于'1.2.2',
          但是不安装'2.x.x',也就是说安装时不改变大版本号。
          需要注意的是,如果大版本号为0,则插入号的行为与波浪号相同,
          因为此时处于开发阶段,即使是次要版本号变动,也可能带来程序的不兼容
        'latest'      安装最新版本
      peerDependencies 用来供插件指定其所需要的主工具的版本
        有时项目和所依赖的模块,都会同时依赖另一个模块,但是所依赖的版本不一样。
        比如,你的项目依赖A模块和B模块的 1.0 版,而A模块本身又依赖B模块的 2.0 版。
        大多数情况下,这不构成问题,B模块的两个版本可以并存,同时运行。
        但是,有一种情况,会出现问题,就是这种依赖关系将暴露给用户。
        最典型的场景就是插件,比如A模块是B模块的插件。用户安装的B模块是 1.0 版本,
        但是A插件只能和 2.0 版本的B模块一起使用。
        这时,用户要是将 1.0 版本的B的实例传给A,就会出现问题。
        因此,需要一种机制,在模板安装的时候提醒用户,如果A和B一起安装,那么B必须是 2.0 模块。

        {
          "name": "chai-as-promised",
          "peerDependencies": {
            "chai": "1.x"
          }
        }
        上面代码指定,安装chai-as-promised模块时,主程序chai必须一起安装,
        而且chai的版本必须是'1.x'。如果你的项目指定的依赖是chai的'2.0'版本,就会报错。
        注意,从npm 3.0 版开始,peerDependencies不再会默认安装了。
      bin  用来指定各个内部命令对应的可执行文件的位。
        "bin": {
          "someTool": "./bin/someTool.js"
        }
        上面代码指定,someTool 命令对应的可执行文件为 bin 子目录下的 someTool.js。
        Npm会寻找这个文件,在'node_modules/.bin/'目录下建立符号链接,
        由于'node_modules/.bin/'目录会在运行时加入系统的PATH变量,
        因此在运行npm时,就可以不带路径,直接通过命令来调用这些脚本。

        因此,像下面这样的写法可以采用简写。
        scripts: {  
          start: './node_modules/someTool/someTool.js build'
        }
        // 简写为
        scripts: {  
          start: 'someTool build'
        }
      main 指定了加载的入口文件
        require('moduleName')就会加载这个文件。
        这个字段的默认值是模块根目录下面的 index.js。
      config  用于添加命令行的环境变量
        package.json 文件中 
          {
            "name" : "foo",
            "config" : { "port" : "8080" },
            "scripts" : { "start" : "node server.js" }
          }
        server.js 脚本中 
          可引用config字段的值
          http
          .createServer(...)
          .listen(process.env.npm_package_config_port)
        命令行中 
          用户执行 npm run start 命令时,脚本就可以得到值 
          npm config set foo:port 80 用户可以改变这个值。
      browser 指定该模板供浏览器使用的版本
        Browserify 这样的浏览器打包工具,通过它就知道该打包那个文件。
        "browser": {
          "tipso": "./node_modules/tipso/src/tipso.js"
        },
      engines 指明了该模块运行的平台
        比如 Node 的某个版本或者浏览器。
        { 
          "engines" : { 
            "node" : ">=0.10.3 <0.12" 
          } 
        }
        该字段也可以指定适用的npm版本。
        { 
          "engines" : { 
            "npm" : "~1.0.20" 
          } 
        }
      man     指定当前模块的man文档的位置 
        "man" :[ "./doc/calc.1" ]
      preferGlobal 当用户不将该模块安装为全局模块时[即无–global参数],是否显示警告
        值为布尔值
      style   指定供浏览器使用时,样式文件所在的位置
        样式文件打包工具parcelify,通过它知道样式文件的打包位置。
        "style": [
          "./node_modules/tipso/src/tipso.css"
        ]
    相关命令
      npm init    自动生成 package.json 文件    
        package.json 文件可以手工编写,也可以使用 npm init 命令自动生成
        该命令采用互动方式,需用户指定一些规则,
        然后在当前目录生成一个基本的 package.json 文件,
        其中只有name项目名称和version项目版本是必填的,其他都是选填的。
      npm install [--production]   根据 package.json 的配置下载所有需要的包 
        PS：自动寻找当前目录下的 package.json 文件,按其配置执行安装,
          也就是配置项目所需的运行和开发环境;
        --production  可选,只下载dependencies节点的包
webpack   模块加载器兼打包工具 
  介绍 
    把各种资源,如JS「含JSX」、coffee、样式「如less/sass」、图片等都作为模块来使用和处理,
    工作方式是：把项目当做一个整体,通过一给定的主文件[如 index.js],
    Webpack将从该文件开始找到项目的所有依赖文件,使用loaders处理它们,
    最后打包为一个浏览器可识别的JavaScript文件;
    支持3种引入方式: AMD commonjs ES6模块化
  命令行命令 
    npm install webpack --save-dev  安装webpack并写入依赖配置文件  
    webpack aoo.js boo.js [--xx]    将 aoo.js 文件打包成 boo.js 文件
      --xx   可选,表示配置参数,可同时使用多个
        --watch           当文件更改时,自动打包
        --progress        打包时显示进度
        --display-modules 打包完后显示依赖的模块 
        --display-reasons 显示打包的原因 
    ◆其他命令参数
  webpack.config.js 默认的配置文件 
    PS：需手动创建该文件; 通过配置文件 webpack.config.js 来进行相应的配置;
    相关命令 
      webpack          [在命令行中当前文件夹下],默认按照配置文件来执行进行打包  
      webpack --config xx.js  自定义配置文件[不再是默认的 webpack.config.js]
    配置文件详情:
      module.exports = {     // commonjs 模块化 输出 
        entry : './src/main.js',   // 入口文件,将被打包的文件 
        output: {                  // 指定打包后的文件
          path : './dist/js',         // 指定路径
          filename : './bundle.js'    // 打包输出的文件名,「也可定义路径,会接着path后,推荐只指定名称」
        },
        resolve : {
          root : [path.join(__dirname,'src')],
          extensions : ['','.ts','.js']
        },
        module : {
          loaders : [
            {test : /\.ts$/,loader : 'ts-loader'} // 定义各种 loaders
          ]
        }
      } 
    ◆注解 
    entry     指定将被打包的文件,格式可为str,arr,obj
      str     指定单一的入口文件
      arr     将多个文件打包在一起 
        如 [ './entry1.js' , 'entry2.js' ] 
      obj     key-val 形式,对象的val可为str或arr
        输出打包后的文件和output参数有关,若 output.filename 仍指定为一个值,
        则最后打包后的文件只有一个,结果是两个同名的文件产生覆盖的结果,
        output.filename 可采用占位符的形式来指定来打包成多个文件[详见output配置]
        如 {
          page1 : './aoo.js',
          page2 : [ './entry1.js' , 'entry2.js' ] 
        }
    output    obj,指定打包的文件 
      path 指定打包后的文件的存放路径
      filename 指定打包后的文件的名称
        val1 : str,指定一固定的文件名称
        val2 : str+占位符,当穿在多个输出的文件时用于指定名称「如entry的val为obj时」
          [name]  表示entry的obj的key
          [hash]  表示打包时产生的hash值
          [chunkhash] 每个chunk的hash值,相当于文件的MD5值「MD5值为了保证每个文件的唯一性」
          e.g.: filename : '[name]-[hash].js'
    plugins   arr,使用插件,arr的元素为插件的初始化
      e.g.:
      var htmlWebpackPlugin = require("html-webpack-plugin");
        module.exports ={
          plugins: [
            new htmlWebpackPlugin(arg);
          ]
        }
  loader,解释器 用于编译解释相应的文件 
    npm install 「loaderName」 [--save-dev]   安装loader 
      npm install css-loader style-loader     可同时安装多个loader 
    ◆loader 枚举
    css-loader       使webpack可以处理'.css'格式文件
    style-loader     用于将引入的样式文件插入到HTML中
      e.g.：
        a.js 文件中: 
          require("style-loader!css-loader!./style.css");
        命令行编译,将 a.js 打包成 a.bundle.js :
          webpack a.js  a.bundle.js
        index.html 文件中
          引入 a.bundle.js 文件
          则 style.css 文件的内容被插入到了该HTML中
    ◆使用方式
    require("loaderName!./xx/fileName.xx");  在require中指定使用的loader 
      使用'!'隔离,表示引用前指定由 loaderName 来处理 .xx 文件,
      可同时使用多个,如 require("style-loader!css-loader!./style.css");
    webpack file1.xx file2.xx --moudle-bind 'fileType=loaderName' 在命令行中编译时指定
      可同时指定多个loader 
      e.g.：
        webpack a.js a.bundle.js --moudle-bind 'css=style-loader!css-loader' 
      // 指定了style和css 两个loader
    在配置文件中进行配置 
      {
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
      e.g.：
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
                // 通过path「Node的API」将相对路径 node_modules 解析为绝对路径
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
              // { test : /\.(png|jpg|gif|svg)$/i, // 用于处理图片的「相对」路径
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
    ◆Query_Parameters,loader的配置参数
    在require时配置
      require("url-loader?mimetype=img/png!./file.png");
    在配置文件中进行配置
      {test: /\.png$/,loader : 'url-loader?mimetype=image/png'}
      // 或
      {
        test : /\.png$/,
        loader : 'url-loader',
        query : {mimetype : "image/png"}
      }
    在cli命令行中进行配置
  ◆plugins插件 
  html-webpack-plugin  在HTML文件中自动引入打包后的文件
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
  ...
  webpack 与 vue组件 
    webpack提供强大的 loader API 来定义对不同文件格式的预处理逻辑
    基于loader可实现大量高级功能,
    如自动分块打包并按需加载、对图片资源引用的自动定位、
    根据图片大小决定是否用base64内联、开发时的模块热替换等等;
    在Webpack的loader API基础上开发了vue-loader插件,可用 .vue 单文件格式来写Vue组
    把一个组件的模板、样式、逻辑三要素整合在同一个文件中,即方便开发,也方便复用和维护;
    Vuejs支持对组件的异步加载,配合Webpack的分块打包功能,可轻松实现组件的异步按需加载;
    e.g.：
      <style>
        ...
      </style>
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
    可在 .vue 文件中使用其他预处理器,只需要安装对应的Webpack loader即可 
      <style lang="less">
        .my-component{
          background-color : bule;
          .child{
            background-color:green;
          }
        }
      </style>
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
      当使用 lang="less" 即使用Less,需 安装如下依赖
      npm install -g css-loader less less-loader  --save-dev
Gulp 
  PS：gulp是前端开发过程中对代码进行构建的工具,是自动化项目的构建利器；
    她不仅能对网站资源进行优化,而且在开发过程中很多重复的任务能够使用正确的工具自动完成；
    使用她,我们不仅可以很愉快的编写代码,而且大大提高我们的工作效率。
    gulp是基于Nodejs的自动任务运行器,
    她能自动化地完成 javascript/coffee/sass/less/html/image/css 等文件的的测试、
    检查、合并、压缩、格式化、浏览器自动刷新、部署文件生成,
    并监听文件在改动后重复指定的这些步骤。
    在实现上,她借鉴了Unix操作系统的管道（pipe）思想,前一级的输出,直接变成后一级的输入,
    使得在操作上非常简单。
    gulp 和 grunt 非常类似,但相比于 grunt 的频繁 IO 操作,
    gulp 的流操作,能更快地更便捷地完成构建工作。
  全局安装gulp
    PS：全局安装gulp目的是为了通过她执行gulp任务；
    cnpm install gulp -g   安装
    gulp -v     查看是否正确安装,出现版本号即为正确安装
      //  CLI version 3.9.1
  新建 package.json 文件
    PS：package.json 是基于nodejs项目必不可少的配置文件,它是存放在项目根目录的普通json文件；
    手动新建配置文件
      它是这样一个json文件（注意：json文件内是不能写注释的,复制下列内容请删除注释）：
      {
        "name": "test",   //项目名称（必须）
        "version": "1.0.0",   //项目版本（必须）
        "description": "This is for study gulp project !",   //项目描述（必须）
        "homepage": "",   //项目主页
        "repository": {    //项目资源库
          "type": "git",
          "url": "https://git.oschina.net/xxxx"
        },
        "author": {    //项目作者信息
          "name": "surging",
          "email": "surging2@qq.com"
        },
        "license": "ISC",    //项目许可协议
        "devDependencies": {    //项目依赖的插件
          "gulp": "^3.8.11",
          "gulp-less": "^3.0.0"
        }
      }
    cnpm init 命令 命令提示符执行创建
      通过 cd命令 确定创建的位置,e.g.:进入到文件名为 testgulp的文件夹下
      cnpm init    创建 package.json 文件
      name: (testgulp) XXX       输入 XXX 作为项目名称,必须项,e.g.:testg
      version: (1.0.0) XXX       输入 XXX 作为项目版本,必须项,e.g.:1.0.0
      description: XXX           输入 XXX 作为项目描述,必须项,e.g.:this is a test
      entry point: (index.js)    定义入口文件,默认为括号内的
      test command:              测试命令,可选
      git repository:            git地址,可选
      keywords:                  关键字,可选
      author:                    作者信息,可选
      license: (ISC)             许可信息,可选
      Is this ok? (yes)    输入 y 确认创建
    cnpm help package.json     查看 package.json 帮助文档,会跳转网页
  本地安装gulp插件
    安装：定位目录命令后提示符执行cnpm install --save-dev；
    以gulp-less为例（编译less文件）,命令提示符执行cnpm install gulp-less --save-dev；
    将会安装在node_modules的gulp-less目录下,该目录下有一个 gulp-less 的使用帮助文档README.md；
    为了能正常使用,我们还得本地安装gulp：cnpm install gulp --save-dev；
      全局安装了gulp,项目也安装了gulp,
      全局安装gulp是为了执行gulp任务,本地安装gulp则是为了调用gulp插件的功能。
  新建 gulpfile.js 文件（重要）
    PS：gulpfile.js 是gulp项目的配置文件,
      是位于项目根目录的普通js文件（其实将 gulpfile.js 放入其他文件夹下亦可）。
    大概是这样一个js文件,主要配置:
      //导入工具包 require('node_modules里对应模块')
      var gulp = require('gulp'), //本地安装gulp所用到的地方
      less = require('gulp-less');
      
      //定义一个testLess任务（自定义任务名称）
      gulp.task('testLess', function () {
        gulp.src('src/less/index.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
      });
      
      //定义默认任务 elseTask为其他任务,该示例没有定义elseTask任务
      gulp.task('default',['testLess', 'elseTask']); 
      
      //gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
      //gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
      //gulp.dest(path[, options]) 处理完后文件生成路径
  运行gulp
    命令提示符执行 gulp 任务名称
    编译less：命令提示符执行 gulp testLess；
    当执行 gulp default 或 gulp 将会调用default任务里的所有任务[‘testLess’,’elseTask’]。
  使用webstorm运行gulp任务
    说明：使用webstorm可视化运行gulp任务；
    使用方法：
      将项目导入webstorm,右键gulpfile.js 选择”Show Gulp Tasks”打开Gulp窗口,
      若出现”No task found”,选择右键”Reload tasks”,双击要运行的任务即可。
Anythere 将当前目录变成一个静态文件服务器的根目录 
  npm install anywhere -g   npm全局安装anythere
  执行参数
    -p 指定端口,默认为8000,
      e.g.:
      anywhere -p 8000 
      可省略
      anywhere  8000 
    -s 静默执行不会自动打开浏览器,默认自动打开网页
Weinre,Web Inspector Remote  一种远程调试工具 
  PS：功能与Firebug、Webkit inspector类似,可以帮助我们即时更改页面元素、样式,调试JS等。
    由于Weinre的客户端是基于Web Inspector开发,而Web Inspector只兼容WebKit核心的浏览器,
    所以只能在Chrome/Safari浏览器打开Weinre客户端进行调试。
  三个端的含义：
    客户端(client)：本地的WebInspector,远程调试客户端。
    服务端(agent)：本地的HTTPServer,为目标页面与客户端建立通信。
    目标页面(target)：被调试的页面,页面已嵌入weinre的远程js。
  Weinre运行
    weinre -boundHost 192.168.0.102  -httpPort 8099   命令行键入 
      httpPort 为调试服务器运行的端口,默认8080;
      boundHost 调试服务器绑定的IP地址或域名,默认localhost,需改为本机地址 '192.168.0.102'
    添加 js到 所需的调试的html的头部
      <script src="http://192.168.0.102:8099/target/target-script-min.js#anonymous"></script> 
Grunt和Gulp的工作方式 
  在一个配置文件中,指明对某些文件进行类似编译,组合,压缩等任务的具体步骤,
  这个工具之后可以自动替你完成这些任务。
Bower 


