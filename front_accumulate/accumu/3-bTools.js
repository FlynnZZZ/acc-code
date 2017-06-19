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
    npm init      初始化,新建 package.json 文件
    install <name> [-g] [--save][-dev]  使用npm安装插件 
      <name>     node插件名称, 如：npm install gulp-less --save-dev
      -g         全局安装 
        将会安装在C:\Users\Administrator\AppData\Roaming\npm,并写入系统环境变量
        非全局安装：将会安装在当前定位目录；
        全局安装可以通过命令行在任何地方调用它,
        本地安装将安装在定位目录的node_modules文件夹下,通过require()调用
      --save     将该模块写入当前的 package.json 文件中的 dependencies 属性
      --save-dev 将该模块写入当前的 package.json 文件中的 devDependencies 属性
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
    -v              版本
    npm show express     #显示模块详情
    npm update        #升级当前目录下的项目的所有模块
    npm update express    #升级当前目录下的项目的指定模块
    npm update -g express  #升级全局安装的express模块
    npm uninstall express  #删除指定的模块
    npm -g install npm         最新稳定版
    npm -g install npm@2.9.1   指定版本
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
    待整理
      npm view vue-cli   查看全局 vue-cli 版本
  cnpm npm的淘宝镜像  
    PS：npm的插件安装是从国外服务器下载,受网络影响大,淘宝团队将其复制到自己的服务器上,
      是一个完整 npmjs.org 镜像,可用其代替官方版本[只读],目前同步频率为 10 分钟每次,
      安装完后最好查看其版本号 cnpm -v 或关闭命令提示符重新打开,
      安装完直接使用有可能会出现错误,
      cnpm跟npm用法完全一致,只是在执行命令时将npm改为cnpm;
      官方网址：'http://npm.taobao.org'
    安装,命令提示符执行 
      npm install -g cnpm --registry=https://registry.npm.taobao.org
  package.json npm配置文件
    PS：将配置信息写入 package.json 并将其加入版本管理,通过配置更方便包的管理;
      该文件不是必须的,当没有该文件时,则相应的命令不生效; 
      定义当前项目所需要的各种模块,以及项目的配置信息,如名称、版本、许可证等元数据等;
      package.json 文件就是一个JSON对象,该对象的每一个成员就是当前项目的一项设置。
      比如name就是项目名称,version是版本[遵守“大版本.次要版本.小版本”的格式]。
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
webpack 
  提供了强大的loader API来定义对不同文件格式的预处理逻辑
  Webpack 基于loader还可以实现大量高级功能，比如自动分块打包并按需加载、对图片资源引用的自动定位、根据图片大小决定是否用base64内联、开发时的模块热替换等等


  webpack 与 vue 
    在Webpack的loader API基础上开发了vue-loader插件，从而让我们可以用这样的单文件格式 (*.vue) 来书写Vue组件：
    
    <style>
    .my-component h2 {
      color: red;
    }
    </style>
    
    <template>
    <div class="my-component">
    <h2>Hello from {{msg}}</h2>
    <other-component></other-component>
    </div>
    </template>
    
    <script>
    // 遵循 CommonJS 模块格式
    var otherComponent = require('./other-component')
    
    // 导出组件定义
    module.exports = {
      data: function () {
        return {
          msg: 'vue-loader'
        }
      },
      components: {
        'other-component': otherComponent
      }
    }
    </script>
    同时，还可以在*.vue文件中使用其他预处理器，只需要安装对应的Webpack loader即可： 
    <style lang="stylus">
    .my-component h2
    color red
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
    这样的组件格式，把一个组件的模板、样式、逻辑三要素整合在同一个文件中，即方便开发，也方便复用和维护。另外，Vue.js本身支持对组件的异步加载，配合Webpack的分块打包功能，可以极其轻松地实现组件的异步按需加载。
