npm,node_package_manager node包管理器 
  PS:随同NodeJS一起安装的包管理工具,用于node插件管理[包括安装、卸载、管理依赖等], 
    允许用户从NPM服务器下载别人编写的第三方包到本地使用. 
    允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用. 
    允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用. 
命令行命令 
  PS:所有node_modules/.bin/目录下的命令,都可以用 'npm run 命令' 的格式运行,
    在命令行下,键入 npm run,然后按tab键,就会显示所有可以使用的命令;
    和npm相关的指令或命令前都需添加'npm '
  ◆常用命令 
  npm init        初始化,创建'package.json'文件
  npm install <name> [-g] [--save-dev] [--save]  使用npm安装插件,可简写为'i' 
    <name>     node插件名称, 如:npm install gulp-less --save-dev
    -g         全局安装 
      将会安装在C:\Users\Administrator\AppData\Roaming\npm,并写入系统环境变量
      非全局安装:将会安装在当前定位目录；
      全局安装可以通过命令行在任何地方调用它,
      本地安装将安装在定位目录的node_modules文件夹下,通过require()调用 
    --save     将该模块写入当前的 package.json 文件中的 dependencies 属性
    --save-dev 将该模块写入当前的 package.json 文件中的 devDependencies 属性
    --save-dev 和 --save 的区别 
      --save-dev 是开发时候依赖的东西
      --save     是发布之后还依赖的东西
      比如写 ES6 代码,如果想编译成 ES5 发布那么 babel 就是devDependencies,
      如果用了 jQuery,由于发布之后还是依赖jQuery,所以是dependencies;
    全局安装与本地安装 
      两者不冲突,有时需要两者都进行安装,全局安装是为了在命令行中执行命令,
      本地安装是为了在本项目中使用 
    Example:
      npm install lodash -g   全局安装 
      npm install npm -g      升级npm版本[会更新所有npm的包?]
  npm uninstall <name> [-g] [--save-dev]  使用npm卸载插件 
    PS:不要直接删除本地插件包
    npm uninstall gulp-less gulp-uglify gulp-concat 删除列出的全部插件
  npm list [-g]       当前目录已安装插件[简写'ls'] 
    npm list <name> [-g]  查看模块的版本号 
  npm update <name> [-g] [--save-dev]  更新插件
    npm update [--save-dev]  // 更新全部插件
    Example:
      npm update -g           更新npm 
      npm update vue-cli -g   更新vue
  npm show express     #显示模块详情
  npm update        #升级当前目录下的项目的所有模块
  npm update express    #升级当前目录下的项目的指定模块
  npm update -g express  #升级全局安装的express模块
  npm uninstall express  #删除指定的模块
  npm search <name>      搜索模块 
  npm install npm  -g       最新稳定版 
  npm -g install npm@2.9.1  指定版本 
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
    PS:npm的插件安装是从国外服务器下载,受网络影响大,淘宝团队将其复制到自己的服务器上,
      是一个完整 npmjs.org 镜像,可用其代替官方版本[只读],目前同步频率为 10 分钟每次,
      安装完后最好查看其版本号 cnpm -v 或关闭命令提示符重新打开[安装完直接使用可能会出现错误],
      cnpm跟npm用法完全一致,只是在执行命令时将npm改为cnpm;
      官方网址:'http://npm.taobao.org'
    安装cnpm 
      'npm install -g cnpm --registry=https://registry.npm.taobao.org'
  待整理 
    npm view vue-cli   查看全局 vue-cli 版本
package.json npm配置文件 
  PS:将配置信息写入 package.json 并将其加入版本管理,通过配置更方便包的管理;
    该文件不是必须的,当没有该文件时,则相应的命令不生效; 
    定义当前项目所需要的各种模块,以及项目的配置信息,如名称、版本、许可证等元数据等;
    package.json 文件就是一个JSON对象,该对象的每一个成员就是当前项目的一项设置。
    比如name就是项目名称,version是版本[遵守“大版本.次要版本.小版本”的格式]。
  相关命令 
    npm init     创建 package.json 文件
      该文件也可手动创建配置,
      该命令采用互动方式,需用户指定一些规则,
      然后在当前目录生成一个基本的 package.json 文件,
      其中'name'项目名称和'version'项目版本必填,其他选填 
    npm install [--production]   根据 package.json 的配置,下载所有依赖  
      PS:自动寻找当前目录下的 package.json 文件,按其配置执行安装,
        下载的文件存放在node_modules中,这一过程由npm自动完成,我们只需等待即可。
      --production  可选,只下载dependencies节点的包
    npm run xx   默认执行该文件中'script'下的属性定义的命令
      package.json 中
      "script" : {
          "aoo" : "node index.js"
        }
      命令行执行 npm run aoo 
      即为执行  node index.js 
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
      dependencies的内容也会变成如下:
      "dependencies": {
        "vue": "^1.0.16"
      }
    devDependencies 键值内的内容
      是指开发过程中需要用到的依赖包,包括ES6转ES5加载器、CSS加载器等等,
      这部分的内容可通过npm install xxx --save-dev 进行安装,
      如需要安装webpack,输入npm install webpack --save-dev,
      在devDependencies下就会写入webpack的具体安装信息。      
    
    版本号的设定规则 
      PS: 如 '1.2.2' ,遵循“大版本.次要版本.小版本”的格式规定,安装时只安装指定版本。
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
--------------------------------------------------------------------------------
Webpack  模块加载器兼打包工具 
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
说明 
  从'2.0'版本开始,支持用'ES6module'规范[import/export]去进行模块打包 
  'chunk'  表示为 '块'
命令行命令 
  npm install webpack -g 全局安装Webpack[仅一次即可]
  npm init    npm初始化
  npm install webpack --save-dev  安装webpack并写入依赖配置文件  
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
  webpack aoo.js boo.js [--xx]    将'aoo.js'文件打包成'boo.js'文件 
    --xx   可选,表示配置参数,可同时使用多个
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
  ◆其他命令参数
  webpack -p       p 表示'生产'模式,输出文件会被 uglifies/minifies 
'webpack.config.js'默认的配置文件 
  PS:需手动创建该文件; 通过 webpack.config.js 文件来进行相应的配置;
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
    并使用 output.filename 命名 「 [name] 表示使用 entry 项的 key」
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
  entry     指定将被打包的文件的入口,依赖关系网的根节点 
    格式可为str,arr,obj 
    str     指定单一的入口文件 
      var baseConfig = {
        entry: './src/index.js'
      };
    arr     将多个文件打包在一起 
      如 [ './entry1.js' , 'entry2.js' ] 
    obj     key-val 形式,对象的val可为str或arr 
      适用于可能需要不止一个入口的情况 
      同'output'的关系 
        输出打包后的文件和output参数有关,若 output.filename 仍指定为一个值,
        则最后打包后的文件只有一个,结果是两个同名的文件产生覆盖的结果,
        output.filename 可采用占位符的形式来指定来打包成多个文件[详见output配置]
        entry : {
          main : './src/index.js'
          page1 : './aoo.js',
          page2 : [ './entry1.js' , 'entry2.js' ] 
        }
  output    obj,指定打包文件的输出 
    打包后的程序和资源将要去到的路径 
    'path'     指定打包后的文件的存放路径 
    'filename' 指定打包后的文件的名称 
      值为str,指定文件名称
      可使用占位符指定动态的输入 
        当存在多个输出的文件时用于指定名称「如entry的val为obj时」
        [name]      表示entry的obj的key
        [hash]      表示打包时产生的hash值
        [chunkhash] 每个chunk的hash值,相当于文件的MD5值
          MD5值为了保证每个文件的唯一性
        Example: filename : '[name]-[hash].js'
Loader,解释器  用于编译解释指定类型的文件,在打包之前对依赖进行预处理 
  PS:loader机制支持载入各种各样的静态资源,不只是js脚本,
    连 html,css,images 等各种资源都有相应的 loader 来做依赖管理和打包
    Webpack本身只能处理JS模块,如果要处理其他类型的文件,就需使用loader进行转换;
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
    '1.x'版本的配置方式 
    module : {
      loaders : [
        {test: /\.jade$/ , loader : 'jade' },
        // 通过正则的test方将文件的后缀名法进行匹配
        // 匹配成功则使用 指定的loader
        {test: /\.css$/ , loader : 'style!css'},
        // 或者 {test: /\.css$/ , loader : ["style", "css"]},
      ] 
    }
    '2.x'版本的配置方式 
    module: {
      rules: [
        {
          test: /* RegEx */,
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
      
      url-loader 允许你内联 base-64 数据格式的URL资源,如果小于设定的阈值。这样可以减少 HTTP 请求小文件的数量。如果文件大于这个阈值。会自动it automatically falls back to file-loader.          
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
      如果图片资源小于10kb就会转化成 base64 格式的 dataUrl,
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
    如果在JS中添加css文件,就需要使用到 css-loader 和 style-loader,
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
Plugins,插件   扩展webpack的功能 
  plugins   arr,使用插件,arr的元素为插件的初始化 
    Example:
    var htmlWebpackPlugin = require("html-webpack-plugin");
      module.exports ={
        plugins: [
          new htmlWebpackPlugin(arg);
        ]
      }
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
'vue-cli'官方提供的一个脚手架工具,用于初始化一个Vue项目 
  使用要求 : NodeJS大于'4.0'版本; 安装Git,用于下载代码
  '.vue'文件 
    vue-loader插件 
      在Webpack的loader API基础上开发的,可用'.vue'单文件格式来写Vue组件
      Vuejs支持对组件的异步加载,配合Webpack的分块打包功能,可轻松实现组件的异步按需加载;
    在'.vue'文件中使用其他预处理器[需安装对应的Webpack loader] 
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
      当使用 lang="less" 即使用Less,需 安装如下依赖
      npm install -g css-loader less less-loader --save-dev
      npm install -g css-loader less less-loader  --save-dev
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
  webpack.config.js webpack配置文件 
    module.exports = {
      entry: {
        'index': './vue/index/main.js',
      },
      output: {
        path: './public/bulid',
        filename: '[filename].js' // 可以多点切入
      },
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
        // loaders: [
        //   {
        //     test: /\.vue$/,
        //     exclude: /node_modules/,
        //     loader: vue.withLoaders({
        //       js: 'babel?optional[]=runtime'
        //     })
        //   },
        //   { test: /\.scss$/, loader: 'style!css!sass' },
        //   { test: /\.css$/, loader: "style!css" },
        //   { test: /\.js$/, loader: 'babel-loader' }
        // ]
      }
      resolve: { // 解决 npm 的依赖问题
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.json']
      },
    }
  Example:  vue目录结构初始化
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
    初始化项目目录,最终目录结构如下:
      - dist //文件生成目录
          -- //自动生成
      - node_module //自动安装 
          -- ...
      - src //文件入口
          -- components //组件存放 
              -- app.vue //主.vue
          -- main.js //主.js
      - index.html   //主.html
      - package.json // npm 配置 
      - webpack.cofig.js // webpack配置
    配置 webpack.config.js 文件
      var path = require('path');
      // NodeJS中的Path对象,用于处理目录的对象,提高开发效率 
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
          // require时省略的扩展名,如:require('module') 不需要module.js
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
  使用步骤 
    ◆工具安装[初始安装一次即可] 
    npm install -g webpack            全局安装webpack 
    npm install -g vue                全局安装vue 
    npm install -g vue-cli            全局安装vue-cli
      在安装Vue后就可以在命令行中使用'vue'命令了
      vue --version 或 vue -V // 查看Vue的版本 
      vue list  // 查看官方提供的模版 
    ◆初始化项目 
    vue init webpack projectName[项目名称不能为中文]       创建基于'webpack'模版的Vue项目 
    cd  projectName       进入新创建的项目文件夹 
      文件夹中的 index.html 为项目的入口,且默认调用 src 下的 main.js  
      后续的开发都在该文件夹下的'src'文件夹下进行[且主要为 App.vue 文件]
    npm init              npm初始化,创建 package.json 文件 
    npm install           安装依赖 
      根据存在的'package.json'文件的配置安装依赖文件 
      增加'node_modules'文件夹 
    npm install vue-router vue-resource --save  安装路由模块和网络请求模块
    ◆启动项目 
    npm run dev                         启动测试服务器  
      启动本地服务,打开浏览器,运行项目
      默认执行 package.json 中 script 属性 dev 的配置
      运行安装时,eslint mocha 等等依赖,建议初学不安装
    ◆构建发布 
    npm run build                       运行构建,生成生产环境可发布的代码 
  项目目录文件说明 
    ├── README.md
    ├── build                           编译任务的代码
    │   ├── build.js
      require('./check-versions')() // 检查 Node 和 npm 版本
      require('shelljs/global') // 使用了 shelljs 插件,可以让我们在 node 环境的 js 中使用 shell
      env.NODE_ENV = 'production'
      
      var path = require('path') // 不再赘述
      var config = require('../config') // 加载 config.js
      var ora = require('ora') // 一个很好看的 loading 插件
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
    │   └── prod.env.js
    ├── index.html
    ├── package.json
    ├── src
    │   ├── App.vue
    │   ├── assets
    │   │   └── logo.png
    │   ├── components
    │   │   └── Hello.vue
    │   └── main.js
    └── static    
  
    .gitignore   # 忽略无需git控制的文件  比如 node_modules
    .eslintrc    # eslint加载器配置
    .babelrc         # babel加载器配置
    build 
      webpack.base.config.js         # webpack 基础配置
        基础配置包括了webpack的最基本配置,
        包括入口文件、输入文件、加载器配置、插件配置等,
        module.exports = {
          entry: './src/main.js', //页面入口文件配置
          output: { //入口文件输出配置
            path: './dist',
            publicPath: 'dist/',
            filename: 'build.js'
          },
          module: { //加载器配置
            loaders: [
              {
                test: /\.vue$/,
                loader: 'vue'
              },
              {
                test: /\.js$/,
                loader: 'babel!eslint',
                // make sure to exclude 3rd party code in node_modules
                exclude: /node_modules/
              },
              {
                // edit this for additional asset file types
                test: /\.(png|jpg|gif)$/,
                loader: 'url',
                query: {
                  // inline files smaller then 10kb as base64 dataURL
                  limit: 10000,
                  // fallback to file-loader with this naming scheme
                  name: '[name].[ext]?[hash]'
                }
              }
            ]
          },
          vue: {  // vue-loader 设置:
            loaders: {
              js: 'babel!eslint'
            }
          }
          //将所有的*.vue文件转化为javascript文件并执行ESLint检测,这里需要配置.eslintrc文件
        }    
      webpack.dev.config.js          # webpack 开发配置
      webpack.prod.config.js         # webpack 生产配置
    node_modules         #通过npm安装的模块
    index.html       # 首页
    package.json     # 项目配置
    src 
      components    # 组件文件夹,存放app组件
        A.vue
        B.vue
        Counter.vue
      assets   #静态资源 
      app.vue    ## 主vue组件
      main.js    #启动配置,webpack入口文件
      
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
HttpServer   本地调试及移动端调试 
  npm i http-server -g   全局安装'http-server'  
  http-server [-x xxx]   在相应的文件夹下启动服务
    在网页中或手机中访问出现的网址 
  -x 配置项 
    -a 127.0.0.1  指定域名 
    -p 8080       指定端口号 
    -s            阻止命令行中打印信息 
    -o            启动服务后自动在浏览器中打开地址 
其他工具 
  Gulp|Grunt 工具链、构建工具,能够优化前端工作流程 
    如自动刷新页面,压缩css、JS,编译Less等,配置需要的插件实现自动化工作 
  browserify|webpack JS模块化方案,文件打包工具,预编译模块的方案  
Gulp 
  PS:gulp是前端开发过程中对代码进行构建的工具,是自动化项目的构建利器；
    不仅能对网站资源进行优化,而且在开发过程中很多重复的任务能够使用正确的工具自动完成；
    gulp是基于Nodejs的自动任务运行器,
    她能自动化地完成 javascript/coffee/sass/less/html/image/css 等文件的的测试、
    检查、合并、压缩、格式化、浏览器自动刷新、部署文件生成,
    并监听文件在改动后重复指定的这些步骤。
    在实现上,她借鉴了Unix操作系统的管道（pipe）思想,前一级的输出,直接变成后一级的输入,
    使得在操作上非常简单。
    gulp 和 grunt 非常类似,但相比于 grunt 的频繁 IO 操作,
    gulp 的流操作,能更快地更便捷地完成构建工作。
  全局安装gulp
    PS:全局安装gulp目的是为了通过她执行gulp任务；
    cnpm install gulp -g   安装
    gulp -v     查看是否正确安装,出现版本号即为正确安装
      //  CLI version 3.9.1
  新建 package.json 文件 
    PS:package.json 是基于nodejs项目必不可少的配置文件,它是存放在项目根目录的普通json文件；
    手动新建配置文件
      它是这样一个json文件（注意:json文件内是不能写注释的,复制下列内容请删除注释）:
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
      通过 cd命令 确定创建的位置,Example:进入到文件名为 testgulp的文件夹下
      cnpm init    创建 package.json 文件
      name: (testgulp) XXX       输入 XXX 作为项目名称,必须项,Example:testg
      version: (1.0.0) XXX       输入 XXX 作为项目版本,必须项,Example:1.0.0
      description: XXX           输入 XXX 作为项目描述,必须项,Example:this is a test
      entry point: (index.js)    定义入口文件,默认为括号内的
      test command:              测试命令,可选
      git repository:            git地址,可选
      keywords:                  关键字,可选
      author:                    作者信息,可选
      license: (ISC)             许可信息,可选
      Is this ok? (yes)    输入 y 确认创建
    cnpm help package.json     查看 package.json 帮助文档,会跳转网页
  本地安装gulp插件
    安装:定位目录命令后提示符执行cnpm install --save-dev；
    以gulp-less为例（编译less文件）,命令提示符执行cnpm install gulp-less --save-dev；
    将会安装在node_modules的gulp-less目录下,该目录下有一个 gulp-less 的使用帮助文档README.md；
    为了能正常使用,我们还得本地安装gulp:cnpm install gulp --save-dev；
      全局安装了gulp,项目也安装了gulp,
      全局安装gulp是为了执行gulp任务,本地安装gulp则是为了调用gulp插件的功能。
  新建 gulpfile.js 文件[重要] 
    PS:gulpfile.js 是gulp项目的配置文件,
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
      
      //gulp.task(name[, deps], fn) 定义任务  name:任务名称 deps:依赖任务名称 fn:回调函数
      //gulp.src(globs[, options]) 执行任务处理的文件  globs:处理的文件路径(字符串或者字符串数组) 
      //gulp.dest(path[, options]) 处理完后文件生成路径
  运行gulp 
    命令提示符执行 gulp 任务名称
    编译less:命令提示符执行 gulp testLess；
    当执行 gulp default 或 gulp 将会调用default任务里的所有任务[‘testLess’,’elseTask’]。
  使用webstorm运行gulp任务 
    说明:使用webstorm可视化运行gulp任务；
    使用方法:
      将项目导入webstorm,右键gulpfile.js 选择”Show Gulp Tasks”打开Gulp窗口,
      若出现”No task found”,选择右键”Reload tasks”,双击要运行的任务即可。
Anythere 将当前目录变成一个静态文件服务器的根目录 
  npm install anywhere -g   npm全局安装anythere
  执行参数
    -p 指定端口,默认为8000,
      Example:
      anywhere -p 8000 
      可省略
      anywhere  8000 
    -s 静默执行不会自动打开浏览器,默认自动打开网页
Weinre,'Web Inspector Remote'一种远程调试工具 
  PS:功能与Firebug、Webkit inspector类似,可以帮助我们即时更改页面元素、样式,调试JS等。
    由于Weinre的客户端是基于Web Inspector开发,而Web Inspector只兼容WebKit核心的浏览器,
    所以只能在Chrome/Safari浏览器打开Weinre客户端进行调试。
  三个端的含义:
    客户端(client):本地的WebInspector,远程调试客户端。
    服务端(agent):本地的HTTPServer,为目标页面与客户端建立通信。
    目标页面(target):被调试的页面,页面已嵌入weinre的远程js。
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
json-server  接口Mock数据 
  npm install json-server --save  安装依赖 
  在'dev-server.js'文件中进行配置
  var jsonServer = require('json-sever'); 引入json-server 
  ...

