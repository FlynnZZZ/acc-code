npm,node package manager node包管理器 
  PS：随同NodeJS一起安装的包管理工具.
    用于node插件管理（包括安装、卸载、管理依赖等）；
    package 就是我们之前说的库,比如jQuery.
    允许用户从NPM服务器下载别人编写的第三方包到本地使用.
    允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用.
    允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用.
  命令 
    ◆安装 卸载 模块 
    npm install <name> [-g] [--save-dev]  使用npm安装插件
      PS：命令提示符执行
      <name>：node插件名称。例：npm install gulp-less --save-dev
      -g：全局安装。将会安装在C:\Users\Administrator\AppData\Roaming\npm,并且写入系统环境变量；
        非全局安装：将会安装在当前定位目录；
        全局安装可以通过命令行在任何地方调用它,
        本地安装将安装在定位目录的node_modules文件夹下,通过require()调用；
      --save：将保存配置信息至 package.json,package.json 是nodejs项目配置文件.
      -dev：保存至package.json 的devDependencies节点,
        不指定-dev将保存至dependencies节点；
        一般保存在dependencies的像这些express/ejs/body-parser等等。
      为什么要保存至 package.json？
        因为node插件包相对来说非常庞大,所以不加入版本管理,
        将配置信息写入 package.json 并将其加入版本管理,其他开发者对应下载即可
        （命令提示符执行npm install,则会根据package.json下载所有需要的包,
        npm install --production只下载dependencies节点的包）。
      e.g.:
        npm install lodash   [在命令操作符中执行]
        npm install express -g    # 全局安装
        npm install express       # 本地安装
        npm install jQuery 
        npm install Bootstrap 
        npm install request
        npm install cheerio
        npm install anywhere -g   快速搭建服务器用于本地调试
        npm -g install weinre     安装weinre,用于调试手机页面
    npm uninstall <name> [-g] [--save-dev]  使用npm卸载插件：
      PS：不要直接删除本地插件包
      npm uninstall gulp-less gulp-uglify gulp-concat 删除全部插件
      借助rimraf：npm install rimraf -g 用法：rimraf node_modules
      e.g.:
        npm uninstall cheerio     #卸载
    ◆其他
    npm help  查看npm帮助
    npm list  当前目录已安装插件
    npm ls -g   查看所有全局安装的模块
    npm update express   更新模块
    npm search express   搜索模块
  选装cnpm
    PS：说明：因为npm安装插件是从国外服务器下载,受网络影响大,可能出现异常,
      如果npm的服务器在中国就好了,所以我们乐于分享的淘宝团队干了这事。
      来自官网：“这是一个完整 npmjs.org 镜像,你可以用此代替官方版本(只读),
      同步频率目前为 10 分钟 一次以保证尽量与官方服务同步。”；
      官方网址：'http://npm.taobao.org'
      安装完后最好查看其版本号cnpm -v或关闭命令提示符重新打开,安装完直接使用有可能会出现错误；
      cnpm跟npm用法完全一致,只是在执行命令时将npm改为cnpm（以下操作将以cnpm代替npm）。
    安装,命令提示符执行 
      npm install -g cnpm --registry=https://registry.npm.taobao.org
  已安装
    npm install lodash   [在命令操作符中执行]
    npm install express -g    # 全局安装
    npm install express       # 本地安装
    npm install jQuery 
    npm install Bootstrap 
    npm install request
    npm install cheerio
    npm install anywhere -g   快速搭建服务器用于本地调试
    npm -g install weinre     安装weinre,用于调试手机页面
  package.json npm配置文件
