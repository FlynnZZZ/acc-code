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
    npm install <name> [-g] [--save-dev] [--save]  使用npm安装插件,可简写为 i 
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
        比如写 ES6 代码,如果想编译成 ES5 发布那么 babel 就是devDependencies,
        如果用了 jQuery,由于发布之后还是依赖jQuery,所以是dependencies;
      e.g.:
        npm install lodash -g   全局安装 
        npm install npm -g      升级npm版本[会更新所有npm的包?]
    npm uninstall <name> [-g] [--save-dev]  使用npm卸载插件 
      PS：不要直接删除本地插件包
      npm uninstall gulp-less gulp-uglify gulp-concat 删除列出的全部插件
    npm list [-g]       当前目录已安装插件[简写'ls'] 
      npm list <moudle name> [-g]  查看模块的版本号 
    npm update <name>   更新模块 
      e.g.：
        npm update -g           更新npm 
        npm update vue-cli -g   更新vue
    npm show express     #显示模块详情
    npm update        #升级当前目录下的项目的所有模块
    npm update express    #升级当前目录下的项目的指定模块
    npm update -g express  #升级全局安装的express模块
    npm uninstall express  #删除指定的模块
    npm search <name>      搜索模块 
    npm -g install npm         最新稳定版
    npm -g install npm@2.9.1   指定版本
    npm help            查看npm帮助
      npm help <command> 可查看某条命令的详细帮助
    ◆配置参数 
    -g              全局安装 
      本地安装  将安装包放在'./node_modules'下[运行npm命令时所在的目录],
        如果没有该目录,会在当前执行 npm 命令的目录下生成 node_modules 目录。
        可通过 require() 来引入本地安装的包
      全局安装 将安装包放在 /usr/local 下或者你 node 的安装目录。
        可以直接在命令行里使用。
      如果你希望具备两者功能,则需要在两个地方安装它或使用 npm link 
    -v              版本
    –save           添加到dependencies,简写化 -S
    –save-dev       添加到devDependencies,简写为 -D 
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
      npm install  npm在当前目录下载项目的所有依赖
        在有了完整的 package.json 文件的情况下,
        下载的文件存放在node_modules中,这一过程由npm自动完成,我们只需等待即可。
      npm init    自动生成 package.json 文件    
        package.json 文件可以手工编写,也可以使用 npm init 命令自动生成
        该命令采用互动方式,需用户指定一些规则,
        然后在当前目录生成一个基本的 package.json 文件,
        其中只有name项目名称和version项目版本是必填的,其他都是选填的。
      npm install [--production]   根据 package.json 的配置下载所有需要的包 
        PS：自动寻找当前目录下的 package.json 文件,按其配置执行安装,
          也就是配置项目所需的运行和开发环境;
        --production  可选,只下载dependencies节点的包
    文件内容详情 
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
      dependencies 键值内的内容
        在运行npm install xxx后可以自动插入相应的值,
        如需要安装vue,运行npm install vue,
        npm就会自动安装最新版本的vue到当前node_modules文件夹中,
        dependencies的内容也会变成如下：
        "dependencies": {
          "vue": "^1.0.16"
        }
      devDependencies 键值内的内容
        是指开发过程中需要用到的依赖包,包括ES6转ES5加载器、CSS加载器等等,
        这部分的内容可通过npm install xxx --save-dev 进行安装,
        如需要安装webpack,输入npm install webpack --save-dev,
        在devDependencies下就会写入webpack的具体安装信息。      
      
      版本号的设定规则 
        PS： 如 '1.2.2' ,遵循“大版本.次要版本.小版本”的格式规定,安装时只安装指定版本。
        NPM使用语义版本号来管理代码
        语义版本号分为'X.Y.Z'三位,分别代表主版本号、次版本号和补丁版本号。
        当代码变更时,版本号按以下原则更新。
        如果只是修复bug,需要更新Z位。
        如果是新增了功能,但是向下兼容,需要更新Y位。
        如果有大变动,向下不兼容,需要更新X位。
        版本号有了这个保证后,在申明第三方包依赖时,
        除了可依赖于一个固定版本号外,还可依赖于某个范围的版本号。
        例如"argv": "0.0.x"表示依赖于0.0.x 系列的最新版argv
        '~',tilde   波浪号+指定版本
          如'~1.2.2',表示安装'1.2.x'的最新版本[不低于'1.2.2'],
          但是不安装'1.3.x',也就是说安装时不改变大版本号和次要版本号
        'ˆ',caret   插入号+指定版本
          比如'ˆ1.2.2',表示安装'1.x.x'的最新版本,不低于'1.2.2',
          但是不安装'2.x.x',也就是说安装时不改变大版本号。
          需要注意的是,如果大版本号为0,则插入号的行为与波浪号相同,
          因为此时处于开发阶段,即使是次要版本号变动,也可能带来程序的不兼容
        'latest'      安装最新版本 
        these are all valid:
        { "dependencies" :
          { "foo" : "1.0.0 - 2.9999.9999"
          , "bar" : ">=1.0.2 <2.1.2"
          , "baz" : ">1.0.2 <=2.3.4"
          , "boo" : "2.0.1"
          , "qux" : "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0"
          , "asd" : "http://asdf.com/asdf.tar.gz"
          , "til" : "~1.2"
          , "elf" : "~1.2.3"
          , "two" : "2.x"
          , "thr" : "3.3.x"
          , "lat" : "latest"
          , "dyl" : "file:../dyl"
          }
        }
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
      name - 包名。
      version - 包的版本号。
      description - 包的描述。
      homepage - 包的官网 url 。
      author - 包的作者姓名。
      contributors - 包的其他贡献者姓名。
      dependencies - 依赖包列表。如果依赖包没有安装,npm 会自动将依赖包安装在 node_module 目录下。
      repository - 包代码存放的地方的类型,可以是 git 或 svn,git 可在 Github 上。
      main - main 字段是一个模块ID,它是一个指向你程序的主要项目。就是说,如果你包的名字叫 express,然后用户安装它,然后require("express")。
      keywords - 关键字        
webpack   模块加载器兼打包工具 
  介绍 
    基于JS,包括四大核心 Entry、Output、Loaders 和 Plugins;
    把各种资源[如JS、coffee、less、sass、图片等]都作为模块来使用和处理,
    支持3种引入方式: AMD commonjs ES6模块化
    原理:
    把所有的非js资源都转换成js,
    如把一个 css 文件转换成“创建一个 style 标签并把它插入 document”的脚本、
    把图片转换成一个图片地址的 js 变量或 base64 编码等,
    然后用 CommonJS、AMD 或 ES6模块化 的机制管理起来。
    从 2.0 版本开始,webpack原生支持用ES6 module规范[import/export]去进行模块打包
    'chunk'  表示为 '块'
  工作方式 
    把项目当做一个整体,通过一给定的主文件[如 index.js],
    Webpack将从该文件开始找到项目的所有依赖文件,使用配置的loaders处理它们,
    最后打包为一个浏览器可识别的JS文件;
  命令行命令 
    npm install -g webpack [--save-dev]  安装webpack并写入依赖配置文件  
    npm install -g webpack-dev-server    静态资源服务器 
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
    webpack aoo.js boo.js [--xx]    将 aoo.js 文件打包成 boo.js 文件 
      --xx   可选,表示配置参数,可同时使用多个
        --watch           当文件更改时,自动打包
        --progress        打包时显示进度
        --display-modules 打包完后显示依赖的模块 
        --display-reasons 显示打包的原因 
    webpack                    启动webpack
    webpack -h                 查看版本信息及可用的指令 
    webpack -w                 提供watch方法,实时进行打包更新
    webpack -p                 对打包后的文件进行压缩
    webpack -d                 提供SourceMaps,方便调试
    webpack --colors           输出结果带彩色,比如：会用红色显示耗时较长的步骤
    webpack --profile          输出性能数据,可以看到每一步的耗时
    ◆其他命令参数
    webpack -p       p 表示'生产'模式,输出文件会被 uglifies/minifies。
  webpack.config.js 默认的配置文件 
    PS：需手动创建该文件; 通过 webpack.config.js 文件来进行相应的配置;
      该文件是一个 node.js 模块,返回一个 json 格式的配置信息对象,
      或者通过 --config 选项来指定配置文件;
    相关命令 
      webpack              [在命令行中当前文件夹下],默认按照配置文件来执行进行打包  
      webpack --config xx.js  自定义配置文件[可不再是默认的 webpack.config.js]
    配置文件详情:
      module.exports = {     // commonjs 模块化 输出 
        context: __dirname + "/src", // __dirname 是指项目根目录
        entry : './src/main.js',   // 入口文件,将被打包的文件 
        // 项目的入口点,作为执行上下文的根
        output: {                  // 指定打包后的文件
          path : './dist/js',         // 指定路径
          filename : './bundle.js'    // 打包输出的文件名,「也可定义路径,会接着path后,推荐只指定名称」
        },
        // 执行完成后,生成文件的存放位置的属性
        resolve : {
          root : [path.join(__dirname,'src')],
          extensions : ['','.ts','.js']
        },
        module : {    // 定义对模块的处理逻辑
          loaders : [  
            {test : /\.ts$/,loader : 'ts-loader'} // 定义各种 loaders
          ],
          
        }
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
        会被打包成以下三个文件：
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
      并使用 output.filename 命名 「 [name] 表示使用 entry 项的 key」
    e.g.： 
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
  loader,解释器  用于编译解释相应的文件
    PS：loader机制支持载入各种各样的静态资源,不只是js脚本,
      连 html,css,images 等各种资源都有相应的 loader 来做依赖管理和打包
      Webpack本身只能处理JS模块,如果要处理其他类型的文件,就需使用loader进行转换;
      多个loader之间使用”!”连接,类似于Linux的pipe命令,加载器的加载顺序为从右向左处理;
      对于所需要的加载器,需要写在 package.json 文件中,
      并通过npm install下载安装到./node_modules文件夹中才会生效,
      否则在编译过程中因找不到加载器报错
    loader 的特性
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
    ★相关命令
    npm install 「loaderName」 [--save-dev]   安装loader 
      npm install css-loader style-loader     可同时安装多个loader 
    使用方式 
      require时指定使用的loader  
        e.g.：require("loaderName!./xx/fileName.xx");  
        使用'!'隔离,表示引用前指定由 loaderName 来处理 .xx 文件,
        可同时使用多个,如 require("style-loader!css-loader!./style.css");
      webpack.config.js 文件中进行配置  
        根据模块类型[扩展名]来自动绑定需要的 loader
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
        
        {test: /\.png$/,loader : 'url-loader?mimetype=image/png'}
        // 或
        {
          test : /\.png$/,
          loader : 'url-loader',
          query : {mimetype : "image/png"}
        }
      命令行中编译时指定 
        webpack file1.xx file2.xx --moudle-bind 'fileType=loaderName' 
        webpack a.js a.bundle.js --moudle-bind 'css=style-loader!css-loader' 
        // 指定了style和css 两个loader
    Query_Parameters,loader的配置参数
      在 require 时配置 
        require("url-loader?mimetype=img/png!./file.png");
      在 webpack.config.js 配置文件中进行配置 
        {test: /\.png$/,loader : 'url-loader?mimetype=image/png'}
        或
        {
          test : /\.png$/,
          loader : 'url-loader',
          query : {mimetype : "image/png"}
        }
      在命令行中进行配置   
    e.g.：
      module.loaders 是webpack最重要的一项配置,
      告知webpack每一种文件都需要使用什么加载器来处理
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
      如果在JS中添加css文件,就需要使用到 css-loader 和 style-loader,
      css-loader 会遍历 CSS 文件,然后找到 url() 表达式然后处理他们,
      style-loader 会把原来的 CSS 代码插入页面中的一个 style 标签中。
    loader枚举 
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
      URL资源处理        
        默认情况,vue-loader 是自动用 css-loader 和 Vue 组件编译器来处理样式和模板文件的。在处理过程中,所有的资源 URL 比如<img src="...">, background: url(...) 和 CSS @import 都是被当做依赖的模块来处理。
        
        例如,url(./image.png) 被转译成 require('./image.png')。
        
        <img src="../image.png">
        如上会被再转译成：
        
        createElement('img', { attrs: { src: require('../image.png') }})
        因为 .png 并不是个 JavaScript 文件,你需要配置 Webpack 使用 file-loader 或者 url-loader 处理它们。项目脚手架工具 vue-cli 也能帮你配置这些。
        
        这样做的好处是：
        
        file-loader 允许你指定在哪里复制和存放静态资源文件 ,以及用版本哈希值命名从而更好利用缓存。 这意味着,可以把图片放到 *.vue 文件旁边,可使用相对路径,而不需要担心发布时候的 URL。使用适当的配置,Webpack 在打包输出的时候,会自动把文件路径转为正确的 URL。
        
        url-loader 允许你内联 base-64 数据格式的URL资源,如果小于设定的阈值。这样可以减少 HTTP 请求小文件的数量。如果文件大于这个阈值。会自动it automatically falls back to file-loader.          
      css-loader       在JS中处理引入的CSS  
      style-loader     用于将引入的样式文件插入到HTML中 
        e.g.：
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
        如果图片资源小于10kb就会转化成 base64 格式的 dataUrl,
        其他的图片会存放在build/文件夹下 
  Plugins,插件   扩展webpack的功能 
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
    webpack.optimize.CommonsChunkPlugin    提取入口的公共模块到单独的文件 
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
        如果第三方库很多的话,会造成这个文件非常大,减慢加载速度,
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
    html-webpack-plugin       在HTML文件中自动引入打包后的文件 
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
      如使用jquery之类的库,
      安装jquery的支持
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
  webpack 与 vue组件 
    PS：webpack提供强大的 loader API 来定义对不同文件格式的预处理逻辑
      基于loader可实现大量高级功能, 如自动分块打包并按需加载、对图片资源引用的自动定位、
      根据图片大小决定是否用base64内联、开发时的模块热替换等等;
    vue-loader插件 
      在Webpack的loader API基础上开发的,可用 .vue 单文件格式来写Vue组件
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
    在 .vue 文件中使用其他预处理器[需安装对应的Webpack loader] 
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
      npm install -g css-loader less less-loader --save-dev
      npm install -g css-loader less less-loader  --save-dev
    webpack.config.js  文件的设置 
    module.exports = {
      module: {
        rules: [
          {
            test: /\.vue$/, // 这是个正则表达式
            loader: 'vue-loader' // 指定loader
          },
          {
            test: /\.css$/, 
            use: [ 'style-loader', 'css-loader' ] // 指定多个loader
          },
          {
            test: /\.less$/, 
            use: [ 'style-loader', 'less-loader' ] 
          }
        ]
      }
    }
    e.g.：  vue目录结构初始化
      手动创建的
      webpack2   项目目录
      |--dist    编译打包生成的文件存放的目录
      |--node_modules   npm包存放的目录,自动生成
      |--src         vue应用的源码存放目录
      |--|---pages   vue其它组件的存放目录
      |--|---css     应用的css目录
      |--|---|---app.css 应用的主css文件
      |--|---images  图片目录
      |--|---main.js   vue应用的入口js
      |--|---App.vue   vue应用的根组件
      |--.babelrc      babel配置文件
      |--index.html    vue应用的骨架html
      |--package.json  npm配置文件
      |--webpack.config.js   webpack配置文件
    步骤
      初始化项目目录,最终目录结构如下：
        - dist //文件生成目录
            -- //自动生成
        - node_module //自动安装
            -- ...
        - src //文件入口
            -- components //组件存放
                -- app.vue //主.vue
            -- main.js //主.js
        - index.html   //主.html
        - package.json //npm 配置 
        // 可以直接使用npm init来初始化我们的package.json文件的配置
        - webpack.cofig.js // webpack配置
      配置 webpack.config.js 文件
        var path = require('path');
        // NodeJS中的Path对象,用于处理目录的对象,提高开发效率。
        // 模块导入
        module.exports = {
          // 入口文件地址,不需要写完,会自动查找
          entry: './src/main',
          // 输出
          output: {
            path: path.join(__dirname, './dist'),
            // 文件地址,使用绝对路径形式
            filename: '[name].js',
            //[name]这里是webpack提供的根据路口文件自动生成的名字
            publicPath: '/dist/'
            // 公共文件生成的地址
          },
          // 服务器配置相关,自动刷新!
          devServer: {
            historyApiFallback: true,
            hot: false,
            inline: true,
            grogress: true,
          },
          // 加载器
          module: {
            // 加载器
            loaders: [
              // 解析.vue文件
              { test: /\.vue$/, loader: 'vue' },
              // 转化ES6的语法
              { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
              // 编译css并自动添加css前缀
              { test: /\.css$/, loader: 'style!css!autoprefixer'},
              //.scss 文件想要编译,scss就需要这些东西！来编译处理
              //install css-loader style-loader sass-loader node-sass --save-dev
              { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
              // 图片转化,小于8K自动转化为base64的编码
              { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},
              //html模板编译？
              { test: /\.(html|tpl)$/, loader: 'html-loader' },
            ]
          },
          // .vue的配置。需要单独出来配置,其实没什么必要--
          // 因为我删了也没保错,不过这里就留这把,因为官网文档里是可以有单独的配置的。
          vue: {
            loaders: {
              css: 'style!css!autoprefixer',
            }
          },
          // 转化成es5的语法
          babel: {
            presets: ['es2015'],
            plugins: ['transform-runtime']
          },
          resolve: {
            // require时省略的扩展名,如：require('module') 不需要module.js
            extensions: ['', '.js', '.vue'],
            // 别名,可以直接使用别名来代表设定的路径以及其他
            alias: {
              filter: path.join(__dirname, './src/filters'),
              components: path.join(__dirname, './src/components')
            }
          },
          // 开启source-map,webpack有多种source-map,在官网文档可以查到
          devtool: 'eval-source-map'
        };
其他工具 
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


