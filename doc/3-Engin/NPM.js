NPM'node package manager',node包管理器 
  PS:随同NodeJS一起安装的包管理工具,用于node插件管理[包括安装、卸载、管理依赖等], 
    允许用户从NPM服务器下载别人编写的第三方包到本地使用. 
    允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用. 
    允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用. 
  'semver'语义化版本,版本管理及约定 
    semver格式：'主版本号.次版本号.修订号'
    版本号规则：
      主版本号：不兼容的API修改 
      次版本号：向下兼容的功能性新增或修改  
      修订号：向下兼容的bug修正 
相关命令 
  PS:所有node_modules/.bin/目录下的命令,都可以用 'npm run 命令' 的格式运行,
    在命令行下,键入 npm run,然后按tab键,就会显示所有可以使用的命令;
    和npm相关的指令或命令前都需添加'npm '
  ◆常用命令 
  $ npm init [-y]  初始化,创建'package.json'文件 
    -y   选用,默认将选项设置为yes 
  $ npm install -h        查看安装包时的所有命令 [简写:i] 
    npm i    根据'package.json'安装所有依赖 
    可同时安装多个使用空格分割  
    使用'@'来安装指定的版本 
      npm i -g webpack@2.3.2   
    Example: 
      npm install -g lodash    全局安装 
      npm install -g npm       升级npm版本[会更新所有npm的包]
  $ npm uninstall <name>  卸载包 
    PS:不要直接删除本地插件包
    Example:
    npm uninstall gulp-less gulp-uglify gulp-concat  一次性删除多个插件
  $ npm update [<name>]   更新插件 
    npm update       升级当前目录下的所有模块
    npm update -g vue-cli    更新vue
    npm update -g npm       更新npm 
  $ npm list              查看当前目录已安装模块[简写'ls'] 
  $ npm search <name>   搜索模块 
  $ npm show express    显示模块详情 
  $ npm info node       查看详情 
  $ npm view vue-cli    查看全局 vue-cli 版本
  $ npm cache clean -f  清除 npm cache
  $ npm help            查看npm帮助 
    npm help <command> 可查看某条命令的详细帮助
  $ npm shrinkwrap  生成'npm-shrinkwrap.json'文件,用于将依赖版本固定  
    PS: 使用'--save-exact'并不能保证所有依赖版本固定,可能依赖中的依赖版本仍不固定 
      'npm-shrinkwrap.json'里包含了通过 node_modules 计算出的模块的依赖树及版本 
      当目录下有 npm-shrinkwrap.json 时,
      运行 npm install 时优先使用 npm-shrinkwrap.json 进行安装 
      如果 node_modules 下存在某个模块,如直接通过 npm install xxx 安装的,
      而 package.json 中没有,运行 npm shrinkwrap 则会报错。
      npm shrinkwrap 只会生成 dependencies 的依赖,不会生成 devDependencies 的
  ◆安装/卸载/升级/查看的配置参数,可选,可多选   
    '-S'和'-D'的区别 
      '-D' 是开发时候依赖的东西
      '-S' 是发布之后还依赖的东西
      比如写ES6代码,若想编译成ES5发布那么'babel'就是'devDependencies',
      若用了jQuery,由于发布之后还是依赖'jQuery',所以是'dependencies';
    全局安装与本地安装的区别  
      PS: 两者不冲突,若希望具备两者功能,则需要同时安装 
      全局安装: 为了在命令行中执行命令,可通过命令行在任何地方调用它 
      本地安装: 为了在本项目中使用,安装在项目的node_modules文件夹下,可通过'require' 引入 
  -g       全局安装 
    将会安装在'C:/Users/Administrator/AppData/Roaming/npm'目录下,并写入系统环境变量
  --save   简写: -S,写入生产依赖 
    将模块写入'package.json'文件的'dependencies'中 
  --save-dev  简写: -D,写入开发依赖'devDependencies' 
    将模块写入'package.json'文件的'devDependencies'中 
  -S --save-exact  写入依赖时,写入固定版本  
  ◆其他配置参数 
  -v           参看版本 
'cnpm'npm的淘宝镜像 
  PS:npm的插件来自国外服务器,受网络影响大,淘宝团队将其复制到自己的服务器上,
    是一个完整'npmjs.org'镜像,可用其代替官方版本[只读],目前同步频率为'10分钟每次',
    cnpm跟npm用法完全一致,只是在执行命令时将npm改为cnpm;
    官方网址:'http://npm.taobao.org'
  ◆安装及使用cnpm 
  npm install -g cnpm --registry=https://registry.npm.taobao.org // 全局安装cnpm 
    安装完直接使用可能会出现错误,最好关闭命令提示符重新打开 
  使用别名的方式,将下载地址进行更改[在命令行中执行] 
  alias cnpm="npm --registry=https://registry.npm.taobao.org \
    --cache=$HOME/.npm/.cache/cnpm \
    --disturl=https://npm.taobao.org/dist \
    --userconfig=$HOME/.cnpmrc"  
  cnpm -v  查看其版本号 
  cnpm i <name>   安装包 
    '.npmrc'是使用淘宝的镜像产生的文件
      内容如下
      registry = http://registry.npm.taobao.org
      sass_binary_site=https://npm.taobao.org/mirrors/node-sass/      
'~/.npmrc',npm的默认配置文件   
  PS: 首次进行默认设置后才会产生该文件 
  $ npm config set xxx  // 设置默认选项[写入'.npmrc']  
    $ npm config set save-exact true  // 写入依赖时,默认锁定版本号 
      这样每次 npm i xxx --save 的时候会锁定依赖的版本号,相当于加了 --save-exact 参数
  $ npm config list  // 参看设置 
'package.json'npm配置文件 
  PS: 将配置信息写入 package.json 并将其加入版本管理,通过配置更方便包的管理;
    该文件不是必须的,当没有该文件时,则相应的命令不生效; 
    定义当前项目所需要的各种模块,以及项目的配置信息,如名称、版本、许可证等元数据等;
    package.json 文件就是一个JSON对象,该对象的每一个成员就是当前项目的一项设置 
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
  文件内容、详情配置 
    PS: json文件内不能写注释  
    {
      "name": "Hello World",  // 项目名称 
      "version": "0.0.1",     // 版本号
      "description": "",      // 描述 
      "homepage": "",         // 项目主页
      "author": "",           // 作者名 
        {    // 对象形式,描述更多信息
          "name": "surging",
          "email": "surging2@qq.com"
        },
      "license":"MIT",        // 项目许可协议  
      "scripts": {            // 指定运行脚本命令的npm命令行缩写 
        "start": "node index.js", // 命令行中 npm run start 执行该命令 
      },
      "dependencies": {       // 生产环境依赖的模块 
        // npm install xxx -S 安装,并写入  
        "express": "latest",
        "mongoose": "~3.8.3",
        "handlebars-runtime": "~1.0.12",
        "express3-handlebars": "~0.5.0",
        "MD5": "~1.2.0"
      },
      "devDependencies": {    // 开发环境依赖的模块 
        // npm install xxx -D 进行安装,并写入 
        "bower": "~1.2.8",
        "grunt": "~0.4.1",
        "grunt-contrib-concat": "~0.3.0",
        "grunt-contrib-jshint": "~0.7.2",
        "grunt-contrib-uglify": "~0.2.7",
        "grunt-contrib-clean": "~0.5.0",
        "browserify": "2.36.1",
        "grunt-browserify": "~1.3.0",
      },
      "keywords":[""],   // 关键词 
      "repository": {    // 项目资源库  
        // 可为'git'或'svn',git可在'Github'上 
        "type": "git",
        "url": "https://path/to/url"
      },
      "contributors":[{"name":"","email":""},...], // 其他贡献者姓名 
      "engines": {       // 指明了该模块运行的平台,如Node的某个版本或者浏览器  
        "node" : ">=0.10.3 <0.12", // 运行平台 
        "npm" : "~1.0.20"   // 指定适用的npm版本 
      }, 
      "bugs":{"url":"http://path/to/bug","email":""},
    }
    
    版本号的设定规则 
      PS: NPM使用语义版本号'semver'来管理代码 
      "aoo": "2.0.1"   // 固定版本 
      "aoo": '^1.1.2'  // '1.x.x'系列最新版本 
        若大版本号为0,则插入号的行为与波浪号相同,
      "aoo": '~1.1.2'  // '1.1.x'系列最新版本 
      "aoo": "1.1.x"   // '1.1.x'系列最新版本 
      "aoo": 'latest'  // 始终最新版本 
      "bar": ">=1.0.2 <2.1.2"  // 大于等于'1.0.2'小于'2.1.2'
      "baz": ">1.0.2 <=2.3.4"  // 
      "boo": "1.0.0 - 2.9999.9999"  // 
      "qux": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0" // 
      "asd": "http://asdf.com/asdf.tar.gz"
      "two": "2.x"
      "thr": "3.3.x"
      "dyl": "file:../dyl"
    peerDependencies 用来供插件指定其所需要的主工具的版本
      有时项目和所依赖的模块,都会同时依赖另一个模块,但是所依赖的版本不一样。
      比如,你的项目依赖A模块和B模块的 1.0 版,而A模块本身又依赖B模块的 2.0 版。
      大多数情况下,这不构成问题,B模块的两个版本可以并存,同时运行。
      但是,有一种情况,会出现问题,就是这种依赖关系将暴露给用户。
      最典型的场景就是插件,比如A模块是B模块的插件。用户安装的B模块是 1.0 版本,
      但是A插件只能和 2.0 版本的B模块一起使用。
      这时,用户要是将 1.0 版本的B的实例传给A,就会出现问题。
      因此,需要一种机制,在模板安装的时候提醒用户,若A和B一起安装,那么B必须是 2.0 模块。

      {
        "name": "chai-as-promised",
        "peerDependencies": {
          "chai": "1.x"
        }
      }
      上面代码指定,安装chai-as-promised模块时,主程序chai必须一起安装,
      而且chai的版本必须是'1.x'。若你的项目指定的依赖是chai的'2.0'版本,就会报错。
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
      main - main 字段是一个模块ID,它是一个指向你程序的主要项目。就是说,若你包的名字叫 express,然后用户安装它,然后require("express")。
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
    man     指定当前模块的man文档的位置 
      "man" :[ "./doc/calc.1" ]
    preferGlobal 当用户不将该模块安装为全局模块时[即无–global参数],是否显示警告
      值为布尔值
    style   指定供浏览器使用时,样式文件所在的位置
      样式文件打包工具parcelify,通过它知道样式文件的打包位置。
      "style": [
        "./node_modules/tipso/src/tipso.css"
      ]
--------------------------------------------------------------------------------
http-server: 本地调试及移动端调试服务器  
  npm i -g http-server     全局安装'http-server'  
  http-server [<options>]   [在相应的文件夹下]启动服务 
    PS: 在网页中或手机中访问出现的网址 
    ◆<options> 配置项 
    -a 127.0.0.1  指定域名 
    -p 8080       指定端口号 
    -s            阻止命令行中打印信息 
    -o            启动服务后自动在浏览器中打开地址 
Anythere 将当前目录变成一个静态文件服务器的根目录,快速搭建服务器用于本地调试 
  npm install anywhere -g   npm全局安装anythere
  执行参数
    -p 指定端口,默认为8000,
      Example:
      anywhere -p 8000 
      可省略
      anywhere  8000 
    -s 静默执行不会自动打开浏览器,默认自动打开网页
'Web Inspector Remote'Weinre: 一种远程调试工具,用于调试手机页面 
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
Bower 
json-server 接口Mock数据 
  npm install json-server --save  安装依赖 
  在'dev-server.js'文件中进行配置
  var jsonServer = require('json-sever'); 引入json-server 
  ...
iron-node  调试Node代码 
supervisor: 开发时,用于检测代码变更自动重启程序 
  检测当前目录下'.node'和'.js'文件,当这些文件发生改动时,supervisor 会自动重启程序
  $ npm i -g supervisor 
其他工具 

