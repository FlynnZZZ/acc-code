http-server: 本地调试及移动端调试服务器  
  $ npm i -g http-server    // 全局安装'http-server'  
  $ http-server [<config>]  // ‹在相应的文件夹下›启动服务 
    PS: 在网页中或手机中访问出现的网址 
    config 配置项  
      -a 127.0.0.1  指定域名 
      -p 8080       指定端口号 
      -s            阻止命令行中打印信息 
      -o            启动服务后自动在浏览器中打开地址 
  移动端预览: 
    将手机和当前PC处于同于局域网内,使用手机访问命令行中出现的第一个URL即可 
    出现的问题及解决的方法: 
      PC端可打开,但移动端无法打开网页 
        1 将PC网络断开,再重连一下 
supervisor,开发时,用于检测代码变更自动重启程序 
  检测当前目录下'.node'和'.js'文件,当这些文件发生改动时,supervisor 会自动重启程序
  $ npm i -g supervisor  // 全局安装 
  $ supervisor  xx.js    // 代替node启动应用 
nodemon,检测代码变动自动执行 
  $ npm i -g nodemon    // 全局安装 
  $ nodemon <nodeFile>  // 使用nodemon来执行 
node-inspector,使用浏览器调试node代码 
  $ npm i -g node-inspector 
  $ node-inspector          // 在相应的目录开启
Anythere 将当前目录变成一个静态文件服务器的根目录,快速搭建服务器用于本地调试 
  $ npm i anywhere -g   npm全局安装anythere 
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
json-server,接口Mock数据 
  npm install json-server --save  安装依赖 
  在'dev-server.js'文件中进行配置
  var jsonServer = require('json-sever'); 引入json-server 
  ...
iron-node,调试Node代码 
  










