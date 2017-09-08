'node package manager'NPM: node包管理器 
  PS:随同NodeJS一起安装的包管理工具,用于node插件管理[包括安装、卸载、管理依赖等], 
    允许用户从NPM服务器下载别人编写的第三方包到本地使用. 
    允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用. 
    允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用. 
相关命令行命令 
  PS:所有node_modules/.bin/目录下的命令,都可以用 'npm run 命令' 的格式运行,
    在命令行下,键入 npm run,然后按tab键,就会显示所有可以使用的命令;
    和npm相关的指令或命令前都需添加'npm '
  ◆常用命令 
  npm init [-y]  初始化,创建'package.json'文件 
    -y   选用,默认将选项设置为yes 
  npm install <name> [<posOpt>]    安装包[简写'i'] 
    <name>       node包名称,可同时安装多个使用空格分割  
    Example: 
      npm install lodash -g   全局安装 
      npm install npm -g      升级npm版本[会更新所有npm的包?]
      npm install -g npm@2.9.1  指定版本 
  npm i    根据'package.json'安装所有依赖 
  npm uninstall <name> [<posOpt>]  卸载包 
    PS:不要直接删除本地插件包
    Example:
    npm uninstall gulp-less gulp-uglify gulp-concat  一次性删除多个插件
  npm list [<posOpt>]       查看当前目录已安装模块[简写'ls'] 
  npm update [<name>] [<posOpt>]   更新插件
    npm update       升级当前目录下的所有模块
    npm update -g           更新npm 
    npm update vue-cli -g   更新vue
  npm show express                 显示模块详情
  npm search <name>       搜索模块 
  npm view vue-cli   查看全局 vue-cli 版本
  npm cache clean -f   清除 npm cache
  npm help           查看npm帮助 
    npm help <command> 可查看某条命令的详细帮助
  ◆<posOpt> 安装位置的配置参数,可选,可多选   
  -g         全局安装 
    将会安装在'C:\Users\Administrator\AppData\Roaming\npm'目录下,并写入系统环境变量
  --save     将模块写入'package.json'文件的'dependencies'属性中[简写'-S']
  --save-dev 将模块写入'package.json'文件的'devDependencies'属性中[简写'-D'] 
  '-S'和'-D'的区别 
    '-D' 是开发时候依赖的东西
    '-S' 是发布之后还依赖的东西
    比如写ES6代码,若想编译成ES5发布那么'babel'就是'devDependencies',
    若用了jQuery,由于发布之后还是依赖'jQuery',所以是'dependencies';
  全局安装与本地安装的区别  
    PS: 两者不冲突,若希望具备两者功能,则需要同时安装 
    全局安装: 为了在命令行中执行命令,可通过命令行在任何地方调用它 
    本地安装: 为了在本项目中使用,安装在项目的node_modules文件夹下,可通过'require' 引入 
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
'package.json'npm配置文件 
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
  文件内容、详情配置 
    {
      项目名称 
      "name": "Hello World",
      版本号
      "version": "0.0.1",
      作者名 
      "author": "张三",
      证书 
      "license":"MIT",
      其他贡献者姓名 
      "contributors":[{"name":"李四","email":"lisi@example.com"}],
      描述 
      "description": "第一个node.js程序",
      关键词 
      "keywords":["node.js","javascript"],
      包代码存放的地方 
        可以是'git'或'svn',git可在'Github'上 
      "repository": {
        "type": "git",
        "url": "https://path/to/url"
      },
      指明了该模块运行的平台,如Node的某个版本或者浏览器,也可以指定适用的npm版本 
      "engines" : { 
        "node" : ">=0.10.3 <0.12", 
        "npm" : "~1.0.20" 
      }, 
      "bugs":{"url":"http://path/to/bug","email":"bug@example.com"},
      指定运行脚本命令的npm命令行缩写 
        比如'start'指定了运行'npm run start'时,所要执行的命令
        其他的为 npm run preinstall、npm run postinstall、
        npm run start、npm run test时,所要执行的命令
      "scripts": {
        "start": "node index.js",
        "preinstall": "echo here it comes!",
        "postinstall": "echo there it goes!",
        "start": "node index.js",
        "test": "tap test/*.js"
      },
      指定了项目运行所依赖的模块 
        对象的各个成员,分别由模块名和对应的版本要求组成,表示依赖的模块及其版本范围。
        若依赖包没有安装,npm 会自动将依赖包安装在 node_module 目录下 
        在运行npm install xxx后可以自动插入相应的值,
        如需要安装vue,运行npm install vue,npm就会自动安装最新版本的vue到当前node_modules文件夹中,
        dependencies的内容也会变成如下:
        "dependencies": {
          "vue": "^1.0.16"
        }
      "dependencies": {
        "express": "latest",
        "mongoose": "~3.8.3",
        "handlebars-runtime": "~1.0.12",
        "express3-handlebars": "~0.5.0",
        "MD5": "~1.2.0"
      },
      指定项目开发所需要的模块 
        分别由模块名和对应的版本要求组成,表示依赖的模块及其版本范围 
        是指开发过程中需要用到的依赖包,包括ES6转ES5加载器、CSS加载器等等,
        这部分的内容可通过npm install xxx --save-dev 进行安装,
        如需要安装webpack,输入npm install webpack --save-dev,
        在devDependencies下就会写入webpack的具体安装信息。      
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
    }
    
    版本号的设定规则 
      PS: 如 '1.2.2' ,遵循“大版本.次要版本.小版本”的格式规定,安装时只安装指定版本。
      NPM使用语义版本号来管理代码
      语义版本号分为'X.Y.Z'三位,分别代表主版本号、次版本号和补丁版本号。
      当代码变更时,版本号按以下原则更新。
      若只是修复bug,需要更新Z位。
      若是新增了功能,但是向下兼容,需要更新Y位。
      若有大变动,向下不兼容,需要更新X位。
      版本号有了这个保证后,在申明第三方包依赖时,
      除了可依赖于一个固定版本号外,还可依赖于某个范围的版本号。
      例如"argv": "0.0.x"表示依赖于0.0.x 系列的最新版argv
      '~',tilde   波浪号+指定版本
        如'~1.2.2',表示安装'1.2.x'的最新版本[不低于'1.2.2'],
        但是不安装'1.3.x',也就是说安装时不改变大版本号和次要版本号
      'ˆ',caret   插入号+指定版本 
        比如'ˆ1.2.2',表示安装'1.x.x'的最新版本,不低于'1.2.2',
        但是不安装'2.x.x',也就是说安装时不改变大版本号。
        需要注意的是,若大版本号为0,则插入号的行为与波浪号相同,
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
    homepage - 包的官网 url 。
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
Grunt和Gulp的工作方式 
  在一个配置文件中,指明对某些文件进行类似编译,组合,压缩等任务的具体步骤,
  这个工具之后可以自动替你完成这些任务。
Bower 
json-server 接口Mock数据 
  npm install json-server --save  安装依赖 
  在'dev-server.js'文件中进行配置
  var jsonServer = require('json-sever'); 引入json-server 
  ...
iron-node  调试Node代码 
其他工具 

