express,简洁而灵活的NodeJS的Web框架 
  PS: 使用Express可快速地搭建一个完整功能的网站 
  Express 框架核心特性:
    可以设置中间件来响应 HTTP 请求 
    定义了路由表用于执行不同的 HTTP 请求动作 
    可以通过向模板传递参数来动态渲染 HTML 页面         
相关命令 
  $ npm i -S express // 安装 
    $ npm i -S express@4.14.0  // 指定版本安装 
  // 辅助的插件 
  $ npm i -S body-parser  
    NodeJS中间件,用于处理 JSON, Raw, Text 和 URL 编码的数据 
  $ npm i -S cookie-parser  
    解析Cookie的工具 通过 req.cookies 可取到传过来的cookie,并把它们转成对象 
  $ npm i -S multer  
    NodeJS中间件,用于处理 enctype="multipart/form-data" 的表单数据 
API 
  var express = require('express') // 引入模块 
  var app = express()  // 实例化
  express.static(path)  // 设置静态文件路径 
    将图片, CSS, JavaScript 文件放在 public 目录下,你可以这么写:
    app.use(express.static('public'));
    Example: 
      我们可以到 public/images 目录下放些图片,如下所示:
        node_modules
        server.js
        public/
        public/images
        public/images/logo.png
      让我们再修改下 "Hello Word" 应用添加处理静态文件的功能 
        创建 express_demo3.js 文件,代码如下所示:
        var express = require('express');
        var app = express();
        
        app.use(express.static('public'));
        
        app.get('/', function (req, res) {
           res.send('Hello World');
        })
        
        var server = app.listen(8081, function () {
        
          var host = server.address().address
          var port = server.address().port
        
          console.log("应用实例,访问地址为 http://%s:%s", host, port)
        
        })
      执行以上代码:
        $ node express_demo3.js 
        应用实例,访问地址为 http://0.0.0.0:8081
      在浏览器中访问 http://127.0.0.1:8081/images/logo.png
      (本实例采用了菜鸟教程的logo),结果如下图所示:
  const router = express.Router()   // 生成路由实例[MoIn: 路由]
  app.use()  // 加载中间件 
  app.set()  // 
    app.set('view engine', 'ejs')// 设置模板引擎为 ejs
    app.set('views', path.join(__dirname, 'views'))// 设置存放模板文件的目录
  app.get(path,function(req,res){  // 处理get请求 
    path str,请求路径 
      *     任意匹配符,如: '/ab*cd'  
      :aoo  占位符,如:'/users/:aoo' 
        可通过 req.params.aoo 获取到实际值 
    req  HTTP请求,包含了请求查询字符串,参数,内容,HTTP头部等属性 
      .app   当callback为外部文件时,用于访问express实例
      .baseUrl  获取路由当前安装的URL路径
      .body  请求体 
        解析后请求体,需使用相关的模块,如 body-parser
      .cookies Cookies
      .fresh  判断请求是否还'新鲜' 
      .stale  
      .hostname  主机名
      .ip        IP地址
      .originalUrl   获取原始请求URL
      .params   obj,获取路由的parameters
      .path   获取请求路径
      .protocol   获取协议类型
      .query   obj,获取URL的查询参数串
      .route   获取当前匹配的路由
      .subdomains   获取子域名
      .acceptsCharsets 
      .acceptsEncodings 
      .acceptsLanguages
      .accpets()   检查请求的Accept头的请求类型
      .get()     获取指定的HTTP请求头
      .is()      判断请求头Content-Type的MIME类型
    res  HTTP响应,即在接收到请求时向客户端发送的 HTTP响应数据  
      .send()  发送HTTP响应
      .sendFile(path[,options][,fn])  响应指定路径的文件 
        会自动根据文件extension设定Content-Type
      .end(data)  发送响应数据 
      .json()  传送JSON响应
      .jsonp() 传送JSONP响应 
      .render(templateName[,dataObj])  响应HTML 
        PS: 将模板和数据结合生成html,并设置响应头'Content-Type: text/html' 
        templateName  模版名称 
        dataObj       传给模板的数据 
      .app     obj,当前express实例,同 req.app 
      .status(num)  设置HTTP状态码
      .append()  追加指定HTTP头
      .set()  设置HTTP头,传入object可以一次设置多个头
      .cookie(name,value [,option])  设置Cookie 
        opition: domain / expires / httpOnly / maxAge / path / secure / signed
      .clearCookie()  清除Cookie
      .download()     传送指定路径的文件
      .get()       返回指定的HTTP头
      .location()  只设置响应的Location HTTP头,不设置状态码或者close response
      .redirect()  设置响应的Location HTTP头,并且设置状态码302
      .type()    设置Content-Type的MIME类型        
  }) 
  app.post(path,function(req,res){ // 处理post请求 
    // req 和 res 的属性/方法 同GET请求类似 
    req  
      .files  上传文件信息集合    
        [idx]  单个文件信息对象  
          .originalname 
    res  
    Example: 
      在表单中通过 POST 方法提交两个参数
      使用 server.js 文件内的 process_post 路由器来处理输入:
      index.htm 文件代码修改如下:
        <html>
          <body>
            <form action="http://127.0.0.1:8081/process_post" method="POST">
              First Name: <input type="text" name="first_name">
              <br>
              Last Name: <input type="text" name="last_name">
              <input type="submit" value="Submit">
            </form>
          </body>
        </html>
      server.js 文件代码修改如下:
        var express = require('express');
        var app = express();
        var bodyParser = require('body-parser');
        
        // 创建 application/x-www-form-urlencoded 编码解析
        var urlencodedParser = bodyParser.urlencoded({ extended: false })
        
        app.use(express.static('public'));
        app.get('/index.htm', function (req, res) {
           res.sendFile( __dirname + "/" + "index.htm" );
        })
        app.post('/process_post', urlencodedParser, function (req, res) {
           // 输出 JSON 格式
           response = {
               first_name:req.body.first_name,
               last_name:req.body.last_name
           };
           console.log(response);
           res.end(JSON.stringify(response));
        })
        
        var server = app.listen(8081, function () {
          var host = server.address().address
          var port = server.address().port
          console.log("应用实例,访问地址为 http://%s:%s", host, port)
        })
      执行以上代码:
        $ node server.js
      浏览器访问 http://127.0.0.1:8081/index.htm 
    Example: 
      创建一个用于上传文件的表单,使用 POST 方法,
      表单 enctype 属性设置为 multipart/form-data 
      index.htm 文件代码修改如下:
        <html>
          <head>
            <title>文件上传表单</title>
          </head>
          <body>
            <h3>文件上传:</h3>
            选择一个文件上传: 
            <br>
            <form action="/file_upload" method="post" enctype="multipart/form-data">
              <input type="file" name="image" size="50" />
              <br>
              <input type="submit" value="上传文件" />
            </form>
          </body>
        </html>
      server.js 文件代码修改如下:
        var express = require('express');
        var app = express();
        var fs = require("fs");
        
        var bodyParser = require('body-parser');
        var multer  = require('multer');
        
        app.use(express.static('public'));
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(multer({ dest: '/tmp/'}).array('image'));
        
        app.get('/index.htm', function (req, res) {
           res.sendFile( __dirname + "/" + "index.htm" );
        })
        
        app.post('/file_upload', function (req, res) {
           console.log(req.files[0]);  // 上传的文件信息
           var des_file = __dirname + "/" + req.files[0].originalname;
           fs.readFile( req.files[0].path, function (err, data) {
                fs.writeFile(des_file, data, function (err) {
                 if( err ){
                      console.log( err );
                 }else{
                       response = {
                           message:'File uploaded successfully', 
                           filename:req.files[0].originalname
                      };
                  }
                  console.log( response );
                  res.end( JSON.stringify( response ) );
               });
           });
        })
        
        var server = app.listen(8081, function () {
          var host = server.address().address
          var port = server.address().port
          console.log("应用实例,访问地址为 http://%s:%s", host, port)
        })
      执行以上代码:
        $ node server.js 
      浏览器访问 http://127.0.0.1:8081/index.htm
  }) 
  var server = app.listen(端口[,callback]) // 监听端口 
    ◆server的属性/方法 
    .address()  obj,地址信息对象 
      .address str,地址 
      .port    str,端口号 
路由,决定了由谁[哪个脚本]去响应请求 
  Example: 
    创建 express_demo2.js 文件,代码如下所示:
      var express = require('express');
      var app = express();
      app.get('/', function (req, res) { //  主页输出 "Hello World"
         console.log("主页 GET 请求");
         res.send('Hello GET');
      })
      app.post('/', function (req, res) { //  POST 请求
         console.log("主页 POST 请求");
         res.send('Hello POST');
      })
      app.get('/del_user', function (req, res) { //  /del_user 页面响应
         console.log("/del_user 响应 DELETE 请求");
         res.send('删除页面');
      })
      app.get('/list_user', function (req, res) { //  /list_user 页面 GET 请求
         console.log("/list_user GET 请求");
         res.send('用户列表页面');
      })
      // 对页面 abcd, abxcd, ab123cd等 响应 GET 请求
      app.get('/ab*cd', function(req, res) { 
         console.log("/ab*cd GET 请求");
         res.send('正则匹配');
      })
      var server = app.listen(8081, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log("应用实例,访问地址为 http://%s:%s", host, port)
      })
    执行以上代码:  node express_demo2.js 
    访问地址
      访问 'http://127.0.0.1:8081 不同的地址,查看效果 '
      访问 'http://127.0.0.1:8081/list_user'
        浏览器显示为:正则匹配
      访问 'http://127.0.0.1:8081/abcd,'
        浏览器显示为:用户列表页
      访问 'http://127.0.0.1:8081/abcdefg'
        浏览器显示为: cannot get /abcdefg  无法解析该地址
  Example: 
    将'/'和'/users/:name'的路由分别放到'routes/index.js'和'routes/users.js'中,
    每个路由文件通过生成一个 express.Router 实例router,并导出,
    通过 app.use 挂载到不同的路径 
    文件目录: 
    index.js 
      const express = require('express')
      const app = express()
      const indexRouter = require('./routes/index')
      const userRouter = require('./routes/users')
      
      app.use('/', indexRouter)
      app.use('/users', userRouter)
      
      app.listen(3000)
    routes 
      index.js 
        const express = require('express')
        const router = express.Router()
        router.get('/', function (req, res) {
          res.send('hello, express')
        })
        module.exports = router
      users.js  
        const express = require('express')
        const router = express.Router()
        
        router.get('/:name', function (req, res) {
          res.send('hello, ' + req.params.name)
        })
        
        module.exports = router
Cookie管理 
  // express_cookie.js 文件
  var express = require('express')
  var cookieParser = require('cookie-parser')
  
  var app = express()
  app.use(cookieParser())
  
  app.get('/', function(req, res) {
    console.log("Cookies: ", req.cookies)
  })
  
  app.listen(8081)
  执行以上代码:
  $ node express_cookie.js 
  访问 http://127.0.0.1:8081 并查看终端信息的输出
中间件'middleware',express的设计精髓 
  当一个中间件处理完,可通过调用 next() 传递给下一个中间件 
  如果没有调用 next(),则请求不会往下传递 
    如内置的 res.render 其实就是渲染完 html 直接返回给客户端,
    没有调用 next(),从而没有传递给下一个中间件
  Example: 
    const express = require('express')
    const app = express()
    
    app.use(function (req, res, next) {
      console.log('1')
      next()
    })
    app.use(function (req, res, next) {
      console.log('2')
      res.status(200).end()
    })
    
    app.listen(3000)
  中间件枚举: 
    express-session  session中间件,实现对会话的支持 
      app.use(session(options)) 
      session 中间件会在 req 上添加 session 对象,即 req.session 初始值为 {},
      当登录后设置 req.session.user = 用户信息,
      返回浏览器的头信息中会带上 set-cookie 将 session id 写到浏览器 cookie 中,
      那么该用户下次请求时,通过带上来的 cookie 中的 session id 我们就可以查找到该用户,
      并将用户信息保存到 req.session.user。
    connect-flash    页面通知的中间件,基于session实现  
      原理：
        设置初始值 req.session.flash={}，
        通过 req.flash(name, value) 设置这个对象下的字段和值，
        通过 req.flash(name) 获取这个对象下的值，同时删除这个字段，
        实现了只显示一次刷新后消失的功能。
    connect-mongo    将session存储于mongodb,结合 express-session 使用
    express-formidable   接收表单及文件上传的中间件
    express-winston   express的winston日志中间件
--------------------------------------------------------------------------------
常与express搭配的模块 
★config-lite,一个轻量的读取配置文件的模块
  根据环境变量'NODE_ENV'的不同加载 config 目录下不同的配置文件。
    如果不设置 NODE_ENV,则读取默认的 default 配置文件,
    如果设置了 NODE_ENV,则会合并指定的配置文件和 default 配置文件作为配置,
    支持 .js、.json、.node、.yml、.yaml 后缀的文件。
    如果程序以 NODE_ENV=test node app 启动,
    则 config-lite 会依次降级查找: 
      config/test.js
      config/test.json
      config/test.node
      config/test.yml
      config/test.yaml 
      并合并 default 配置; 
    如果程序以 NODE_ENV=production node app 启动,
    则 config-lite 会依次降级查找 
      config/production.js
      config/production.json
      config/production.node
      config/production.yml
      config/production.yaml 
      并合并 default 配置。
  支持冒泡查找配置
    即从传入的路径开始,从该目录不断往上一级目录查找 config 目录,直到找到或者到达根目录为止。
  Example: 
    'config/default.js'
    module.exports = {
      port: 3000, // 程序启动要监听的端口号
      session: {  // express-session 的配置信息 
        secret: 'myblog',
        key: 'myblog',
        maxAge: 2592000000
      },
      // mongodb 的地址,以 mongodb:// 协议开头,myblog 为 db 名
      mongodb: 'mongodb://localhost:27017/myblog'
    }
★marked   markdown 解析
★moment   时间格式化
★mongolass   mongodb 驱动
★winston   日志
★objectid-to-timestamp   根据 ObjectId 生成时间戳
★sha1   sha1 加密,用于密码加密
★ejs,一款与express集成良好的模版引擎 
  PS: 'Template Engine'模板引擎: 将页面模板和数据结合起来生成html的工具 
  相关命令 
    $ npm i -S ejs  // 
  '.ejs'模版实例: 
    views/users.ejs 
    <!DOCTYPE html>
    <html>
      <head>
        <style type="text/css">
          body {
            padding: 50px;
            font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
          }
        </style>
      </head>
      <body>
        <h1><%= name.toUpperCase() %></h1>
        <p>hello, <%= name %></p>
      </body>
    </html>
  API 
    <% code %>    运行JS代码,不输出 
      Example: 
        Data: 
          supplies: ['mop', 'broom', 'duster']
        Template: 
          <ul>
            <% for(var i=0; i<supplies.length; i++) { %>
            <li><%= supplies[i] %></li>
            <% } %>
          </ul>
        Result: 
          <ul>
            <li>mop</li>
            <li>broom</li>
            <li>duster</li>
          </ul>
    <%= code %>   显示转义后的HTML内容  
    <%- code %>   显示原始HTML内容 
    includes(path)  引入其他模版 
      views/header.ejs
        <!DOCTYPE html>
        <html>
          <head>
            <style type="text/css">
              body {padding: 50px;font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;}
            </style>
          </head>
          <body>
      views/footer.ejs
          </body>
        </html>
      views/users.ejs
        <%- include('header') %>
          <h1><%= name.toUpperCase() %></h1>
          <p>hello, <%= name %></p>
        <%- include('footer') %>







