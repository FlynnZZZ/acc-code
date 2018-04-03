模块: Nodejs应用程序的基本组成部分,模块间可相互调用 
  PS: 一个NodeJS文件[可能是JS代码、JSON或编译过的C/C++扩展等]就是一个模块
    按照CommonJS规范定义和使用模块
◆核心模块: Node自带模块不用安装即可使用  
  源码都在Node的lib子目录中,为了提高运行速度,安装时都会被编译成二进制文件
  核心模块总是最优先加载的,如果自定义一HTTP模块,require('http')加载的还是核心模块 
events,事件模块 
  PS: events 模块只提供了一个对象: events.EventEmitter, 
    EventEmitter 的核心就是事件触发与事件监听器功能的封装;
    NodeJS所有的异步 I/O 操作在完成时都会发送一个事件到事件队列,
    NodeJS 里面的许多对象都会分发事件:
      一个 net.Server 对象会在每次有新连接时分发一个事件,
      一个 fs.readStream 对象会在文件被打开的时候发出一个事件.
      所有这些产生事件的对象都是 events.EventEmitter 的实例; 
    大多数时候不会直接使用 EventEmitter,而是在对象中继承它 
    包括 fs、net、 http 在内的,只要是支持事件响应的核心模块都是 EventEmitter 的子类 
  var events = require('events');   引入events模块 
  ★EventEmitter 类
  var EventEmitter = events.EventEmitter;  获取到事件对象的类 
  var evEm = new EventEmitter(); 创建事件功能对象 
    EventEmitter 对象若在实例化时发生错误,会触发 'error' 事件.
    当添加新的监听器时,'newListener' 事件会触发,
    当监听器被移除时,'removeListener' 事件被触发.
  ▼实例属性方法
  evEm.on('eName',foo);    监听事件 
    PS: 此处'on'也可以换成'addEventListener' 
    foo 回调函数,参数为[手动]触发时传入的值 
  evEm.addListener('eName',listener) 给指定事件添加监听器[同'on'] 
  evEm.once('eName',listener)  单次事件监听器添加,即只会触发一次,触发后立刻解除
  evEm.emit('eName'[,val1,val2...]); 触发事件,返回表示该事件是否有被监听的布尔值  
    当事件触发时,注册到这个事件的事件监听器被依次调用
  evEm.removeListener('eName',fooName)  移除指定事件的监听 
    PS:此操作将会改变处于被删监听器之后的那些监听器的索引,
    fooName 为指定回调的函数名,不能为匿名函数,否则不能移除 
    Example: 
      var callback = function(stream) { };
      server.on('connection', callback);
      server.removeListener('connection', callback);
  evEm.removeAllListeners(['eName'])  移除所有监听器
    eName  事件名,可选,默认移除所有事件的监听,若指定事件,则移除该事件的所有监听器
  evEm.setMaxListeners(num)   设置事件最大的监听数量 
    默认单个事件允许绑定不超过 10 监听器函数,否则就会输出警告信息 
  evEm.listeners('eName')     返回指定事件的监听函数的数组 
  evEm.emit('eName'[,val1,val2...]) 激活监听器并传参,返回该事件是否存在监听器的布尔值 
  ▼类属性方法
  EventEmitter.listenerCount(evEm,'eName')  返回指定事件功能对象的事件的监听器数量 
  ▼EventEmitter 事件 
  error  在实例化时发生错误触发 
    当 error 被触发时,EventEmitter 规定如果没有响应的监听器,
    Node.js 会把它当作异常,退出程序并输出错误信息,
    为触发 error 事件的对象设置监听器,避免遇到错误后整个程序崩溃.
  newListener     在添加新监听器时被触发 
    event - 字符串,事件名称
    listener - 处理事件函数
  removeListener  从指定监听器数组中删除一个监听器
    此操作将会改变处于被删监听器之后的那些监听器的索引
    event - 字符串,事件名称
    listener - 处理事件函数
  Example: 
    var events = require('events');
    var event = new events.EventEmitter();
    var listener1 = function listener1() { console.log('监听器 listener1 执行'); }
    var listener2 = function listener2() { console.log('监听器 listener2 执行'); }
    // 绑定 connection 事件,处理函数为 listener1 
    event.addListener('connection', listener1);
    // 绑定 connection 事件,处理函数为 listener2
    event.on('connection', listener2);
    var eventListeners = events.EventEmitter.listenerCount(event,'connection');
    console.log(eventListeners + " 个监听器监听连接事件");
    event.emit('connection'); // 激活事件
    event.removeListener('connection', listener1); // 移除监绑定的 listener1 函数
    console.log("listener1 不再受监听");
    event.emit('connection'); // 触发事件
    eventListeners = events.EventEmitter.listenerCount(event,'connection');
    console.log(eventListeners + " 个监听器监听连接事件");
    console.log("程序执行完毕");
    执行结果
      2 个监听器监听连接事件
      监听器 listener1 执行
      监听器 listener2 执行
      listener1 不再受监听
      监听器 listener2 执行
      1 个监听器监听连接事件
      程序执行完毕
  继承 EventEmitter 
    大多数时候我们不会直接使用 EventEmitter, 而是在对象中继承它.
    包括 fs、net、 http 在内的,只要是支持事件响应的核心模块都是 EventEmitter 的子类.
    为什么要这样做呢？原因有两点:
    首先,具有某个实体功能的对象实现事件符合语义, 事件的监听和发射应该是一个对象的方法.
    其次 JS 的对象机制是基于原型的,支持 部分多重继承,
    继承 EventEmitter 不会打乱对象原有的继承关系.
stream,流,用于暂存和移动数据[以bufer的形式存在] 
  PS: Stream 是一个抽象接口,Node中有很多对象实现了这个接口.
    如对http服务器发起请求的request对象就是一个Stream,还有stdout[标准输出] 
    所有的 Stream 对象都是 EventEmitter 的实例 
  var steam = require('stream');  // 
  四种Stream流类型:
    Readable  可读流,读取数据并暂存于bufer中 
      可'pause'和'resume' 
    Writable  可写流,消费数据,从可读流中读取数据,对数据块chunk进行处理 
    Duplex    可读可写操作 
    Transform 可读写,操作被写入数据,然后读出结果
  ◆stm流对象的方法属性
  stm.pause()    暂停流传输 
  stm.resume()   启动流传输 
  writerStream.write(data,'UTF8')   使用 utf8 编码写入数据 
    var readStream = fs.createReadStream('video.mp4');
    var writerStream = fs.createWriteStream('video1.mp4');
    readStream.on("data",function(chunk){
      if (writerStream.write(chunk) == false) {
        readStream.pause();
      }
    })
    readStream.on("end",function(){
      writerStream.end;
    })
    writerStream.on("drain",function(){
      readStream.resume();
    })
  writerStream.end()      标记文件末尾
  readerStream.setEncoding('UTF8');  设置编码为 utf8
  pipe 管道 
    PS:管道提供了一个输出流到输入流的机制 
      通常用于从一个流中获取数据并将数据传递到另外一个流中 
      慢慢的实现大文件的复制过程 
    Example:
      读取一文件内容并将数据写入到另外一文件中
      设置 input.txt 文件内容如下:
        菜鸟教程官网地址:www.runoob.com
      创建 main.js 文件, 代码如下:
        var fs = require("fs");
        var rs = fs.createReadStream('input.txt');// 创建一个可读流
        var writerStream = fs.createWriteStream('output.txt'); // 创建一个可写流
        // 读取 input.txt 文件内容,并将内容写入到 output.txt 文件中
        rs.pipe(writerStream); // 管道读写操作
        console.log("程序执行完毕");
      程序执行完毕,查看 output.txt 文件的内容:
        菜鸟教程官网地址:www.runoob.com
    链式流,通过连接输出流到另外一个流并创建多个对个流操作链的机制,一般用于管道操作
      Example:
      用管道和链式来压缩文件 
        创建 compress.js 文件, 代码如下:
        var fs = require("fs");
        var zlib = require('zlib');
        // 压缩 input.txt 文件为 input.txt.gz
        fs.createReadStream('input.txt')
        .pipe(zlib.createGzip())
        .pipe(fs.createWriteStream('input.txt.gz'));
        console.log("文件压缩完成.");
        执行后,当前目录下生成压缩文件 input.txt.gz 
      用管道和链式来解压文件 
        创建 decompress.js 文件,代码如下:
        var fs = require("fs");
        var zlib = require('zlib');
        // 解压 input.txt.gz 文件为 input.txt
        fs.createReadStream('input.txt.gz')
        .pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream('input.txt'));
        console.log("文件解压完成.");
  ◆Event 常用事件 
    所有的 Stream 对象都是 EventEmitter 的实例
  data     当steam数据传递时时触发 
    stm.on("data",function(chunk){
      // chunk 数据块,Buffer类型 
    })
  readable 可读时触发 
  drain    
  end      数据传递完成时触发[之后目标不再可写] 
  close    流传输关闭时 
  error    在接收和写入过程中发生错误时触发
  finish   所有数据已被写入到底层系统时触发
  Example: 
    从文件中读取数据 
      创建 input.txt 文件,内容如下:
        菜鸟教程官网地址:www.runoob.com
      创建 main.js 文件, 代码如下:
        var fs = require("fs");
        var data = '';
        var rs = fs.createReadStream('input.txt'); // 创建可读流
        rs.setEncoding('UTF8'); // 设置编码为 utf8.
        // 处理流事件 data  end error
        rs.on('data', function(chunk) { data += chunk; });
        rs.on('end',function(){ console.log(data); });
        rs.on('error', function(err){ console.log(err.stack); });
        console.log("程序执行完毕");
      以上代码执行结果如下:
        程序执行完毕
        菜鸟教程官网地址:www.runoob.com
    将数据写入文件
      创建 main.js 文件, 代码如下:
        var fs = require("fs");
        var data = '菜鸟教程官网地址:www.runoob.com';
        // 创建一个可以写入的流,写入到文件 output.txt 中
        var rs = fs.createWriteStream('output.txt');
        // 使用 utf8 编码写入数据
        rs.write(data,'UTF8');
        rs.end(); // 标记文件末尾
        // 处理流事件 
        rs.on('finish', function() { console.log("写入完成."); });
        rs.on('error', function(err){ console.log(err.stack); });
        console.log("程序执行完毕");
      以上程序会将 data 变量的数据写入到 output.txt 文件中.代码执行结果如下:
        程序执行完毕
        写入完成.
      查看 output.txt 文件的内容:
        菜鸟教程官网地址:www.runoob.com
url,一个实例对象,用于解析URL 
  const url = require('url')    // 引入url模块 
  url.parse(     // obj,将URL解析为对象[方便后续其他操作]
    url        // str,传入需要解析的URL字符串  
    ,bol1?     // 是否将'query'字段转换为对象表示,默认: false 
    ,bol2?     // 当URL不全时更智能的识别,默认: false 
    // 返回的对象及其字段说明 
    {          
      // url.parse("https://www.baidu.com?key=val");
      protocol: 'https:',            // str,协议
      slashes: true,                 // bol,是否有协议的双斜线
      host: 'www.baidu.com',         // str,ip地址或域名
      hostname: 'www.baidu.com',     // str,主机名
      port: null,                    // num,端口,默认:80 显示为null,否则会指明
      path: '/',                     // 路径
      pathname: '/',                 // 路径名,
      search: '?key=val',            // str,查询字符串 
      query: 'key=val',              // str|obj,查询字符串
        当第二个参数为true时,则为对象形式 
      hash: null,                    // hash值,锚点
      auth: null,                    // 
      href: 'https://www.baidu.com/' // str,完整超链接
    } 
  ) 
  url.format(    // str,将url对象格式化为url字符串
    obj       // url对象 
    Example: :
      var obj =url.parse("https://www.baidu.com");
      url.format(obj); // 'https://www.baidu.com/'
  )      
  url.resolve(str1,str2)  // str,拼接为URL 
    Example: :
      url.resolve("https://imooc.com","/course/list");
      // 'https://imooc.com/course/list'
      
      url.resolve('/one/two/three', 'four')
      // '/one/two/four'
      
      url.resolve('http://example.com/', '/one')
      // 'http://example.com/one'
      
      url.resolve('http://example.com/one/', 'two')
      // 'http://example.com/one/two'
      
      url.resolve('http://example.com/one', '/two')
      // 'http://example.com/two'
querystring,解析URL的查询字符串 
  var querystring = require("querystring") // 引入querystring模块
  querystring.stringify(obj [,str1] [,str2])  序列化为字符串形式 
    obj  需序列化的对象
    str1 可选,默认为'&',参数连接符
    str2 可选,默认为'=',键值分割符
    Example: :
      querystring.stringify({
        name:"Scott",
        course:["Java","Node"],
        from:""
      })
      // 'name=Scott&course=Java&course=Node&from='
  querystring.parse(   // obj,将查询字符串解析为对象格式 
    str       // 需要解析的字符串
    ,str1?    // 可选,参数连接符,默认: '&' 
      Example:
      var str = 'name=Scott-course=Java-course=Node-from=';
      var obj1 = querystring.parse(str);
      var obj2 = querystring.parse(str,'-');
      console.log(obj1,'/n',obj2);
      // { name: 'Scott-course=Java-course=Node-from=' } 
      // { name: 'Scott', course: [ 'Java', 'Node' ], from: '' }
    ,str2?    // 可选,键值分割符,默认: '=' 
    ,options? // 其他配置 
    Example: :
      querystring.parse('name=Scott&course=Java&course=Node&from=');
      // { name: 'Scott', course: [ 'Java', 'Node' ], from: '' }
  )     
  querystring.escape(str); 转义为URL可用的字符串
    Example: : 
      querystring.escape("哈哈>._.<"); // '%E5%93%88%E5%93%88%3E._.%3C'
  querystring.unescape(str); 反转义 
    Example: :
      querystring.unescape('%E5%93%88%E5%93%88%3E._.%3C'); // '哈哈>._.<'
  querystring.unescapeBuffer() 
  querystring.encode()
  querystring.decode()
http: http服务模块,提供HTTP服务器功能 
  PS: 主要用于搭建HTTP服务端和客户端; 
  Web服务器 
    Web服务器一般指网站服务器,是指驻留于因特网上某种类型计算机的程序,
    Web服务器的基本功能就是提供Web信息浏览服务.
    它只需支持HTTP协议、HTML文档格式及URL,与客户端的网络浏览器配合.
    大多数 web 服务器都支持服务端的脚本语言php、python、ruby等,
    并通过脚本语言从数据库获取数据,将结果返回给客户端浏览器.
    目前最主流的三个Web服务器是Apache、Nginx、IIS.
  Web应用架构 
    Client   客户端,一般指浏览器,浏览器可以通过 HTTP 协议向服务器请求数据 
    Server   服务端,一般指Web服务器,可接收客户端请求,并向客户端发送响应数据 
    Business 业务层,通过Web服务器处理应用程序,如与数据库交互,逻辑运算,调用外部程序等
    Data     数据层,一般由数据库组成 
  var http = require("http");          // 引入http模块 
    PS:使用HTTP服务器或客户端功能必须调用该模块
  var server = http.createServer(      // 创建服务器 
    function(   // 服务响应回调 
      req   // obj,请求 
        .url            // str,请求的地址 
        .setEncoding(                   // 设置请求的格式为UTF-8
          type  // str,设置的格式,如: 'utf8'
        ) 
        .addListener( "data" ,function( // data事件,接收请求时触发,会触发多次
          PS: 通常用于获取POST请求数据  
          part // 每次的信息,将所有信息串起来就是请求的信息了  
        ) { } ); 
        .addListener("end",function(    // end事件,请求信息传送完毕时触发 
        ){}); 
      ,res  // obj,响应 
        .writeHead(   // 设置响应头
          code  // num,状态码,如 200  
          ,{     // 设置响应头信息的对象 
            "Content-Type":"text/plain"
          }
        ); 
        .write(       // 发送响应  
          data  // str|binary,发送的响应数据 
        )  
        .end(         // 结束响应 
          data?  // 可选,str|binary,若存在会将其发送 
        )   
    ) { }
  ); 
  server.listen(                       // 监听ip及端口 
    <num>    // 监听的端口
    ,<str>?  // 监听的ip,如: "127.0.0.1" 
  );   
  http.request(       // 从后台发送http请求 
    PS: 返回可写的request实例流
    options          // str/obj,配置项参数 
      str  字符串,将被 url.parse 解析为对象
      obj  对象 
        host           服务器域名或ip地址
        hostname       host别名
        port           端口
        localAddress   
        socketPath     
        method         请求方法,默认为'get'
        path           请求的路径 
        headers        请求头对象 
        auth           计算认证头的认证,一般为 user 和 password 
        agent          代理 
        keepAlive      
        keepAliveMsecs     
    ,function(res){  // 可选
      // res 服务器的响应 
    }
    Example: 慕课网评论的提交 
      var http = require("http");
      var querystring = require("querystring");
      var postData = querystring.stringify({  
        'content' : '用于测试评论的评论',
        'mid' : 8837
      });
      var options = {
        hostname : 'www.imooc.com',
        path : '/course/docomment', 
        port : 80,
        // 前三项用于组成请求的地址
        method : 'POST',
        // headers 来自于 网页请求的 Reqeust Headers
        headers : {
          'Accept' : 'application/json, text/JS, */*; q=0.01',
          'Accept-Encoding' : 'gzip, deflate',
          'Accept-Language' : 'zh-CN,zh;q=0.8,en;q=0.6',
          'Content-Length' : postData.length, // 仅此处更改 
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
          'Cookie' : 'imooc_uuid=aaf7ef90-41e9-4556-b4c4-d565f6666970; imooc_isnew_ct=1491625441; UM_distinctid=15c07943af93d8-07e39e6439fbee-3e64430f-1fa400-15c07943afa529; CNZZDATA1261110065=2035860492-1494771972-null%7C1494771972; PHPSESSID=5vftmu08ki7j3b5m9nuqpclqq4; loginstate=1; apsid=ZlMDQxODI1ZjExYmQ0ZWJmZmVlNDNmOWE3YjFkNTQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzc5Mjk3MgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxMzU2MDA3NTY1QHFxLmNvbQAAAAAAAAAAAAAAAAAAADZlMmEwZjMzOWZiZmMwNWJkOTNlYTg4MTM2NWMxMTligfxFWYH8RVk%3DNG; last_login_username=1356007565%40qq.com; cninfo=weibo-ad48fca2a463aa6148f0b70c330b445b; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1498279675; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1498279675; IMCDNS=0; imooc_isnew=2; cvde=5945fc118b240-423',
          'Host' : 'www.imooc.com',
          'Origin' : 'http://www.imooc.com',
          'Proxy-Connection' : 'keep-alive',
          'Referer' : 'http://www.imooc.com/video/8837',
          'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
          'X-Requested-With' : 'XMLHttpRequest'
        },
      };
      // 提交数据的格式,从响应的网站获取 
      var req = http.request(options,function(res){
        console.log('status',res.statusCode); // 网络请求的状态码
        // 输出响应头信息
        console.log('response headers',JSON.stringify(res.headers));
        // 接收响应信息时,Node以流的形式来接收,可用于监听信息流事件
        res.on("data",function(chunk){
          // chunk 为接收到的数据,类型为 buffer 类型 
          console.log(Buffer.isBuffer(chunk)); // true
          console.log(typeof chunk);  // object
        });
        // 数据接收完毕
        res.on("end",function(){
          console.log('评论完毕----');
        });
        
      });
      // 请求出错事件
      req.on("error",function(e){
        console.log('评论出错',e.message);
      });
      req.write(postData); // 将请求数据写入请求体 
      req.end(); // 结束请求,请始终加上
  )  
  http.get(           // 使用get方法请求指定url的数据  
    PS: 基于 http.request 的封装,
      相对于request,将请求方法默认为get,且自动调用req.end();
    url 
    ,function (res){ 
      res.on('data',foo); 监听请求的数据传输,会不断的触发 
        PS:将回调函数中所有的data数据串起来就是完整的响应数据了
        foo  传入参数 (data) 
      res.on('end',foo);  请求数据下载完毕触发
    }
  );   
  Example: 
    在该目录下创建一个 index.htm 文件[用于读取] 
    创建Web服务器 
      var http = require('http');
      var fs = require('fs');
      var url = require('url');
      http.createServer( function (req, res) {  
        var pathname = url.parse(req.url).pathname;
        console.log("Request for " + pathname + " received.");
        // 从文件系统中读取请求的文件内容
        fs.readFile(pathname.substr(1), function (err, data) {
          if (err) {
            console.log(err);
            // HTTP 状态码: 404 : NOT FOUND
            // Content Type: text/plain
            res.writeHead(404, {'Content-Type': 'text/html'});
          }
          else{          
            // HTTP 状态码: 200 : OK
            // Content Type: text/plain
            res.writeHead(200, {'Content-Type': 'text/html'}); 
            // 响应文件内容
            res.write(data.toString());  
          }
          //  发送响应数据
          res.end();
        });   
      }).listen(8081);
      // 控制台会输出以下信息
      console.log('Server running at http://127.0.0.1:8081/');
    创建Web客户端 
      var http = require('http');
      var options = { // 用于请求的选项 
        host: 'localhost',
        port: '8081',
        path: '/index.htm'  
      };
      var callback = function(response){ // 处理响应的回调函数
        var body = '';
        response.on('data', function(data) { // 不断更新数据
          body += data;
        });
        response.on('end', function() { // 数据接收完成
          console.log(body);
        });
      }
      var req = http.request(options, callback); // 向服务端发送请求
      req.end();
  路由 
    PS:为路由提供请求的URL和其他需要的GET及POST参数,路由根据这些数据来执行相应的代码.
      因此需要查看HTTP请求,从中提取出请求的URL以及GET/POST参数,
      这一功能应当属于路由还是服务器[甚至作为一个模块自身的功能]确实值得探讨,
      需要的所有数据都会包含在request对象中,该对象作为回调函数的第一个参数传递 
    router.js 文件 
      function route(pathname) {
        console.log("About to route a request for " + pathname);
      }
      exports.route = route;
    server.js 文件 
      var http = require("http");
      var url = require("url");
      function start(route) {
        function onRequest(request, response) {
          var pathname = url.parse(request.url).pathname;
          route(pathname);
          response.writeHead(200, {"Content-Type": "text/plain"});
          response.write("Hello World");
          response.end();
        }
        http.createServer(onRequest).listen(8888);
        console.log("Server has started.");
      }
      exports.start = start;
    index.js 文件 
      var server = require("./server");
      var router = require("./router");
      server.start(router.route);
https,https服务模块 
  PS:和http模块类似,在搭建https服务器时需SSl证书
  搭建https服务器 
    var https = require("https");
    var fs = require("fs");
    var options = {
      key : fs.readFileSync('ssh_key.pem'),
      cert : fs.readFileSync('ssh_cert.pem')
    }
    https.createServer(options,function(req,res){
      res.writeHead(200);
      res.end('hello');
    })
    .listen(8080);
fs,文件系统模块'file system',与文件系统交互 
  PS:fs模块可用于对系统文件及目录进行读写操作.
    NodeJS 提供一组类似 UNIX(POSIX)标准的文件操作API.
    也可使用 fs.read 和 fs.write 读写文件,
    fs.read 和 fs.write 功能类似 fs.readFile 和 fs.writeFile,
    但提供更底层的操作,实际应用中多用 fs.readFile 和 fs.writeFile,
    使用 fs.read 和 fs.write 读写文件需要使用 fs.open 打开文件和 fs.close 关闭文件.
  模块中所有方法都有同步和异步两种形式
    PS:建议使用异步方法,比起同步,异步方法性能更高,速度更快,而且没有阻塞.
      异步的方法函数最后一个参数为回调函数,回调函数的第一个参数包含了错误信息 error.
    异步写法demo:有一个回调函数
      var fs = require('fs'); // 载入fs模块
      fs.unlink('/tmp/shiyanlou', function(err) {
          if (err) { throw err; }
          console.log('成功删除了 /tmp/shiyanlou');
      });
      异步方法中回调函数的第一个参数总是留给异常参数(exception),
      若方法成功完成,该参数为null或undefined
    同步写法demo:
      var fs = require('fs');
      fs.unlinkSync('/tmp/shiyanlou'); // Sync 表示是同步方法
      console.log('成功删除了 /tmp/shiyanlou');
      同步方法执行完并返回结果后,才能执行后续的代码 
      而异步方法采用回调函数接收返回结果,可以立即执行后续代码 
  var fs = require('fs') // 引入文件系统模块
  fs.writeFile(   // 写内容到文件中 
    <path>      // str,路径及文件名 
    ,<data>     // str,写入的内容  
    ,{          // 可选,用于控制写入 
      encoding: <type>  // str,编码,默认: 'utf8' 
      ,mode: <>         // num,模式,默认: 0666  
      ,flag: <KW>       // 默认: "w"
        // "w",表示重写,会清空文件之前的内容 
        // 'a'  增加,在文件原有的基础上增加
    }? 
    ,function(  // 回调函数 
      err   // 
    ){ }
    PS: 写入文件内容,若文件不存在会创建一个文件,但不会主动创建目录
      写入时会先清空文件
    Example:
      var fs = require('fs'); // 引入fs模块
      fs.writeFile('./test2.txt', '生当做人杰', function(err) {
        if (err) { throw err; }
        console.log('Saved.');
        fs.readFile('./test2.txt', 'utf-8', function(err, data) {
          if (err) { throw err; }
          console.log(data); // 写入成功后读取测试
        });
      });

      默认flag='w'是重写,会清空文件,想要追加,可以设置 flag 参数 
        var fs = require('fs'); // 引入fs模块
        // 传递了追加参数 { 'flag': 'a' }
        fs.writeFile('./test2.txt', '至死不渝', { 'flag': 'a' }, function(err) {
          if (err) { throw err; }
          console.log('Saved.');
          fs.readFile('./test2.txt', 'utf-8', function(err, data) {
            // 写入成功后读取测试
            if (err) { throw err; }
            console.log(data);
          });
        });

        flag传值,r代表读取文件,w代表写文件,a代表追加 
  ) 
  fs.writeFileSync()   写文件的同步写法 
  fs.readFile(   // 读取文件内容 
    <str>      // 读取的文件路径及文件名 
    ,{         // 可选,配置项 
      encoding: <str|null> // 编码,默认: null 
      ,flag: <str>         // 默认:'r'
    }?     
    ,function( // 回调函数
      err     // 读取文件出错时触发的错误对象 
      ,data   // Buffer,从文件读取的数据 
    ){ }
    Example:
      一个文本文件: text.txt 内容如下:
        line one
        line two
      readfile.js 内容如下 [和 text.txt 在相同目录中] 
        var fs = require('fs'); // 引入fs模块
        fs.readFile('./test.txt', function(err, data) {
          if (err) { throw err; }// 读取文件失败/错误
          // console.log(data.toString());
          console.log(data);  
        });
      node readfile.js 运行结果
        <Buffer 6c 69 6e 65 20 6f 6e 65 0a 6c 69 6e 65 20 74 77 6f 0a>
        // 这是原始二进制数据在缓冲区中的内容 
        要显示文件内容可以使用 toString() 或 指定编码输出
          toString()写法:
          fs.readFile('./test.txt', function(err, data) {
            if (err) { throw err; }
            console.log(data.toString());
          });
          设置utf-8 编码写法:
          fs.readFile('./test.txt', 'utf-8', function(err, data) {
            if (err) { throw err; }
            console.log('utf-8: ', data);
          });
  );  
  fs.readFileSync()     readFile的同步写法[就是没有回调函数] 
  fs.unlink(path,callback); 删除文件
    Arguments:
      path 字符串,路径及文件名
      callback 回调函数,传入参数 err
    Example: 
      var file ='message.txt'
      fs.unlink(file,(err) =>{
        if (err) { throw err }
        console.log(`${file} 成功删除`)
      })
  fs.mkdir(path,[mode],callback); 创建目录
    PS:当创建的文件夹和已存在的文件夹重名时会报错
    Arguments:
      path     路径和目录名称
      mode     可选,设置目录的权限,默认为 0777
      callback 回调函数,传入参数 err 
    Example:
      var fs = require('fs'); // 引入fs模块
      fs.mkdir('./newdir', function(err) { // 创建 newdir 目录
        if (err) { throw err; }
        console.log('make dir success.');
      });
  fs.readdir(path,callback);  读取文件目录
    Arguments:
      path 路径和目录名称
      callback 回调函数,传入两个参数 err files
        files是一个数组,每个元素是此目录下的文件或文件夹的名称
    Example:
      结果输出当前目录下的所有文件及文件夹
      var fs = require('fs'); // 引入fs模块
      fs.readdir('./', function(err, files) {
        if (err) { throw err; }
        console.log(files);
      });
  fs.rmdir(path,callback);   删除目录
    Arguments:
      path      文件路径.
      callback  回调函数,没有参数.
    Example:
    fs.rmdir("./新建文件夹",function(err){
      if (err) {
        console.log(err);
      }else {
        console.log("删除文件夹成功");
      }
    })
  fs.open(path,flags[,mode],callback); 打开文件
    Arguments:
      path     文件的路径
      flags    文件打开的行为
        r   以读取模式打开文件.若文件不存在抛出异常.
        r+  以读写模式打开文件.若文件不存在抛出异常.
        rs  以同步的方式读取文件.
        rs+ 以同步的方式读取和写入文件.
        w   以写入模式打开文件,若文件不存在则创建.
        wx  类似 'w',但是若文件路径存在,则文件写入失败.
        w+  以读写模式打开文件,若文件不存在则创建.
        wx+ 类似 'w+', 但是若文件路径存在,则文件读写失败.
        a   以追加模式打开文件,若文件不存在则创建.
        ax  类似 'a', 但是若文件路径存在,则文件追加失败.
        a+  以读取追加模式打开文件,若文件不存在则创建.
        ax+ 类似 'a+', 但是若文件路径存在,则文件读取追加失败.          
      mode     设置文件模式(权限),文件创建默认权限为 0666,可读写)
      callback 回调函数,带有两个参数如:callback(err, fd)      
  fs.stat(path,callback); 获取文件信息
    Arguments:
      path     文件路径.
      callback 回调函数,带有两个参数如:(err, stats), stats 是 fs.Stats 对象. 
    Example:
      fs.stat(path)执行后,会将stats类的实例返回给其回调函数.
      可以通过stats类中的提供方法判断文件的相关属性.例如判断是否为文件:
      var fs = require('fs');
      fs.stat('/Users/liuht/code/itbilu/demo/fs.js', function (err, stats) {
        console.log(stats.isFile());   //true
      })      
    stats对象的方法
      stats.isFile(); 若是文件返回 true,否则返回 false.
      stats.isDirectory(); 若是目录返回 true,否则返回 false.
      stats.isBlockDevice(); 若是块设备返回 true,否则返回 false.
      stats.isCharacterDevice(); 若是字符设备返回 true,否则返回 false.
      stats.isSymbolicLink(); 若是软链接返回 true,否则返回 false.
      stats.isFIFO(); 若是FIFO,返回true,否则返回 false.
        FIFO是UNIX中的一种特殊类型的命令管道.
      stats.isSocket(); 若是 Socket 返回 true,否则返回 false.      
  fs.read(fd,buffer,offset,length,position,callback); 读取文件
    Arguments:
      fd      通过 fs.open() 方法返回的文件描述符.
      buffer  数据写入的缓冲区
      offset  缓冲区写入的写入偏移量
      length  要从文件中读取的字节数
      position  文件读取的起始位置,若 position 的值为 null,则会从当前文件指针的位置读取
      callback  回调函数,有三个参数err, bytesRead, buffer
        err 为错误信息, bytesRead 表示读取的字节数,buffer 为缓冲区对象
    Example:
      input.txt 文件内容为:
        菜鸟教程官网地址:www.runoob.com
      接下来我们创建 file.js 文件,代码如下所示:
        var fs = require("fs");
        var buf = new Buffer(1024);
        console.log("准备打开已存在的文件！");
        fs.open('input.txt', 'r+', function(err, fd) {
          if (err) { return console.error(err); }
          console.log("文件打开成功！");
          console.log("准备读取文件:");
          fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
            if (err){ console.log(err); }
            console.log(bytes + "  字节被读取");
            if(bytes > 0){ // 仅输出读取的字节
              console.log(buf.slice(0, bytes).toString());
            }
          });
        });
        以上代码执行结果如下:
          准备打开已存在的文件！
          文件打开成功！
          准备读取文件:
          42  字节被读取
          菜鸟教程官网地址:www.runoob.com      
  fs.close(fd,callback); 关闭文件
    Arguments:
      fd   通过 fs.open() 方法返回的文件描述符
      callback   回调函数,没有参数
    Example:
      input.txt 文件内容为:
        菜鸟教程官网地址:www.runoob.com
      接下来我们创建 file.js 文件,代码如下所示:
        var fs = require("fs");
        var buf = new Buffer(1024);
        console.log("准备打开文件！");
        fs.open('input.txt', 'r+', function(err, fd) {
          if (err) { return console.error(err); }
          console.log("文件打开成功！");
          console.log("准备读取文件！");
          fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
            if (err){ console.log(err); }
            // 仅输出读取的字节
            if(bytes > 0){ console.log(buf.slice(0, bytes).toString()); }
            fs.close(fd, function(err){// 关闭文件
              if (err){ console.log(err); } 
              console.log("文件关闭成功");
            });
          });
        });
      以上代码执行结果如下:
        准备打开文件！
        文件打开成功！
        准备读取文件！
        菜鸟教程官网地址:www.runoob.com
        文件关闭成功          
  fs.ftruncate(fd,len,callback); 截取文件          
    Arguments:
      fd  通过 fs.open() 方法返回的文件描述符.
      len  文件内容截取的长度.
      callback  回调函数,没有参数.
    Example:
      input.txt 文件内容为:
        site:www.runoob.com
      接下来我们创建 file.js 文件,代码如下所示:
        var fs = require("fs");
        var buf = new Buffer(1024);
        console.log("准备打开文件！");
        fs.open('input.txt', 'r+', function(err, fd) {
          if (err) { return console.error(err); }
          console.log("文件打开成功！");
          console.log("截取10字节后的文件内容.");
          fs.ftruncate(fd, 10, function(err){ // 截取文件
            if (err){ console.log(err); } 
            console.log("文件截取成功.");
            console.log("读取相同的文件"); 
            fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
              if (err){ console.log(err); }
              // 仅输出读取的字节
              if(bytes > 0){ console.log(buf.slice(0, bytes).toString()); }
              fs.close(fd, function(err){ // 关闭文件
                if (err){ console.log(err); } 
                console.log("文件关闭成功！");
              });
            });
          });
        });
      以上代码执行结果如下:
        准备打开文件！
        文件打开成功！
        截取10字节后的文件内容.
        文件截取成功.
        读取相同的文件
        site:www.r
        文件关闭成功          
  fs.rename(oldPath, newPath, callback) 
    回调函数没有参数,但可能抛出异常          
  fs.exists(path)   检测文件是否存在 
  ★流相关 
  fs.createReadStream(path,options);  创建可读的stream流 
    为异步操作,不会阻塞后续代码执行 
    var readStream = fs.createReadStream('1.pm4');
  fs.createWriteStream(path,options); 创建可写的stream流 
crypto,提供加密和解密功能,基本上是对OpenSSL的包装
util,提供常用函数的集合 
  PS:用于弥补核心JS 的功能 过于精简的不足
  util.inherits(handleConstructor,baseConstructor);  实现对象间原型继承
    PS:JS 的面向对象特性是基于原型的,与常见的基于类的不同.
      JS 没有 提供对象继承的语言级别特性,而是通过原型复制来实现的.
      handleConstructor构造函数只会继承baseConstructor构造函数原型中的属性方法.
    Example:
      var util = require('util'); 
      function Base() { 
       this.name = 'base'; 
       this.base = 1991; 
       this.sayHello = function() { console.log('Hello ' + this.name); }; 
      } 
      Base.prototype.showName = function() { console.log(this.name); }; 
      function Sub() { this.name = 'sub'; } 
      util.inherits(Sub, Base); 
      var objBase = new Base(); 
      objBase.showName();  // base 
      objBase.sayHello();  // Hello base 
      console.log(objBase); // { name: 'base', base: 1991, sayHello: [Function] } 
      var objSub = new Sub(); 
      objSub.showName(); // sub
      objSub.sayHello(); // 报错,继承不到
      console.log(objSub); // { name: 'sub' }
      定义了一个基础对象Base 和一个继承自Base 的Sub,
  util.inspect(object,[showHidden],[depth],[colors]); 将对象转换为字符串
    PS:通常用于调试和错误输出.它至少接受一个参数 object,即要转换的对象
      util.inspect 并不会简单地直接把对象转换为字符串,
      即使该对象定义了toString方法也不会调用.
    Arguments:
      showHidden 可选,若值为 true,将会输出更多隐藏信息
      depth   表示最大递归的层数,若对象很复杂,可指定层数以控制输出信息的多少,默认为2层.
        指定为 null 表示将不限递归层数完整遍历对象. 
        若color 值为 true,输出格式将会以ANSI 颜色编码,通常用于在终端显示更漂亮 的效果.
    Example:
      var util = require('util'); 
      function Person() { 
       this.name = 'abc'; 
       this.toString = function() { return this.name; }; 
      } 
      var obj = new Person(); 
      console.log(util.inspect(obj)); // Person { name: 'abc', toString: [Function] }
      console.log(util.inspect(obj, true)); 
      // Person {
      //   name: 'abc',
      //   toString: 
      //    { [Function]
      //      [length]: 0,
      //      [name]: '',
      //      [arguments]: null,
      //      [caller]: null,
      //      [prototype]: { [constructor]: [Circular] } } }
  util.isArray(val); 返回表示参数是否为数组的布尔值
  util.isRegExp(val); 返回表示参数是否为正则表达式的布尔值
    Example:
      var util = require('util');
      util.isRegExp(/some regexp/) // true
      util.isRegExp(new RegExp('another regexp')) // true
      util.isRegExp({}) // false
  util.isDate(val);  返回表示参数是否为日期对象的布尔值
    Example:
      var util = require('util');
      util.isDate(new Date()) // true
      util.isDate(Date()) // false (without 'new' returns a String)
      util.isDate({}) // false
  util.isError(val); 返回表示参数是否为错误对象的布尔值
    Example:
      var util = require('util');
      util.isError(new Error()) // true
      util.isError(new TypeError()) // true
      util.isError({ name: 'Error', message: 'an error occurred' }) // false      
child_process,创建子进程 
  child_process.exec(command[,options],cfoo); 使用子进程执行命令,缓存子进程的输出,并将子进程的输出以回调函数参数的形式返回.
    command: 字符串, 将要运行的命令,参数使用空格隔开
    options :对象,可以是:
    cwd ,字符串,子进程的当前工作目录
    env,对象 环境变量键值对
    encoding ,字符串,字符编码(默认: 'utf8')
    shell ,字符串,将要执行命令的 Shell(默认: 在 UNIX 中为/bin/sh, 在 Windows 中为cmd.exe, Shell 应当能识别 -c开关在 UNIX 中,或 /s /c 在 Windows 中. 在Windows 中,命令行解析应当能兼容cmd.exe)
    timeout,数字,超时时间(默认: 0)
    maxBuffer,数字, 在 stdout 或 stderr 中允许存在的最大缓冲(二进制),若超出那么子进程将会被杀死 (默认: 200*1024)
    killSignal ,字符串,结束信号(默认:'SIGTERM')
    uid,数字,设置用户进程的 ID
    gid,数字,设置进程组的 ID
    cfoo :回调函数,包含三个参数error, stdout 和 stderr.
    exec() 方法返回最大的缓冲区,并等待进程结束,一次性返回缓冲区的内容.
    Example:
      让我们创建两个 js 文件 support.js 和 master.js.
      support.js 文件代码:
      console.log("进程 " + process.argv[2] + " 执行." );
      master.js 文件代码:
      const fs = require('fs');
      const child_process = require('child_process');
      for(var i=0; i<3; i++) {
        var workerProcess = child_process.exec('node support.js '+i,
        function (error, stdout, stderr) {
          if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
          }
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
        });
        workerProcess.on('exit', function (code) {
          console.log('子进程已退出,退出码 '+code);
        });
      }
      执行以上代码,输出结果为:
      $ node master.js 
      子进程已退出,退出码 0
      stdout: 进程 1 执行.
      stderr: 
      子进程已退出,退出码 0
      stdout: 进程 0 执行.
      stderr: 
      子进程已退出,退出码 0
      stdout: 进程 2 执行.
      stderr:     
  child_process.spawn(command[,args][,options]) 使用指定的命令行参数创建新进程
    Arguments:
      command: 将要运行的命令
      args: Array 字符串参数数组
      options Object
      cwd String 子进程的当前工作目录
      env Object 环境变量键值对
      stdio Array|String 子进程的 stdio 配置
      detached Boolean 这个子进程将会变成进程组的领导
      uid Number 设置用户进程的 ID
      gid Number 设置进程组的 ID
      spawn() 方法返回流 (stdout & stderr),在进程返回大量数据时使用.进程一旦开始执行时 spawn() 就开始接收响应.    
    Example:
      让我们创建两个 js 文件 support.js 和 master.js.
      support.js 文件代码:
      console.log("进程 " + process.argv[2] + " 执行." );
      master.js 文件代码:
      const fs = require('fs');
      const child_process = require('child_process');
      for(var i=0; i<3; i++) {
        var workerProcess = child_process.spawn('node', ['support.js', i]);
        workerProcess.stdout.on('data', function (data) {
          console.log('stdout: ' + data);
        });
        workerProcess.stderr.on('data', function (data) {
          console.log('stderr: ' + data);
        });
        workerProcess.on('close', function (code) {
          console.log('子进程已退出,退出码 '+code);
        });
      }
      执行以上代码,输出结果为:
      $ node master.js stdout: 进程 0 执行.
      子进程已退出,退出码 0
      stdout: 进程 1 执行.
      子进程已退出,退出码 0
      stdout: 进程 2 执行.
      子进程已退出,退出码 0    
  child_process.fork 是 spawn()的特殊形式,用于在子进程中运行的模块,用于创建进程
    PS:如 fork('./son.js') 相当于 spawn('node', ['./son.js']) .
      与spawn方法不同的是,fork会在父进程与子进程之间,建立一个通信管道,用于进程之间的通信.
    Arguments:
      modulePath: String,将要在子进程中运行的模块
      args: Array 字符串参数数组
      options:Object
      cwd String 子进程的当前工作目录
      env Object 环境变量键值对
      execPath String 创建子进程的可执行文件
      execArgv Array 子进程的可执行文件的字符串参数数组(默认: process.execArgv)
      silent Boolean 若为true,子进程的stdin,stdout和stderr将会被关联至父进程,否则,它们将会从父进程中继承.(默认为:false)
      uid Number 设置用户进程的 ID
      gid Number 设置进程组的 ID
      返回的对象除了拥有ChildProcess实例的所有方法,还有一个内建的通信信道.
    Example:
      让我们创建两个 js 文件 support.js 和 master.js.
      support.js 文件代码:
      console.log("进程 " + process.argv[2] + " 执行." );
      master.js 文件代码:
      const fs = require('fs');
      const child_process = require('child_process');
      for(var i=0; i<3; i++) {
         var worker_process = child_process.fork("support.js", [i]); 
         worker_process.on('close', function (code) {
            console.log('子进程已退出,退出码 ' + code);
         });
      }
      执行以上代码,输出结果为:
      $ node master.js 
      进程 0 执行.
      子进程已退出,退出码 0
      进程 1 执行.
      子进程已退出,退出码 0
      进程 2 执行.
      子进程已退出,退出码 0
path,处理文件路径 
  PS:
  var path = require("path")  // 引入path模块
    .normalize(p)  规范化路径,注意'..' 和 '.'.
    .join([path1][, path2][, ...])  str,返回连接路径 
      该方法的主要用途在于,会正确使用当前系统的路径分隔符,Unix系统是 /,Windows系统是 \
    .resolve([path1],path2) 将path2解析为绝对路径 
      Example:
      var path1 = path.resolve('e://a','./b')
      console.log(path1); // e://a/b 
    .isAbsolute(path) 判断参数 path 是否是绝对路径.
    .relative(from, to) 用于将相对路径转为绝对路径.
    .dirname(p) 返回路径中代表文件夹的部分,同 Unix 的dirname 命令类似.
    .basename(p[, ext]) 返回路径中的最后一部分.同 Unix 命令 bashname 类似.
    .extname(p) 返回路径中文件的后缀名,即路径中最后一个'.'之后的部分.
      若一个路径中并不包含'.'或该路径只包含一个'.' 且这个'.'为路径的第一个字符,则此命令返回空字符串.
    .parse(pathString) 返回路径字符串的对象.
    .format(pathObject) 从对象中返回路径字符串,和 path.parse 相反.    
    .sep 平台的文件路径分隔符,'\\' 或 '/'
    .delimiter 平台的分隔符, ; or ':'.
    .posix 提供上述 path 的方法,不过总是以 posix 兼容的方式交互.
    .win32 提供上述 path 的方法,不过总是以 win32 兼容的方式交互.    
  Example:
    创建 main.js 文件,代码如下所示:
      var path = require("path");
      // 格式化路径
      console.log('normalization:'+path.normalize('/test/test1//2slashes/1slash/tab/..'));
      // 连接路径
      console.log('joint path:'+path.join('/test','test1','2slashes/1slash','tab','..'));
      // 转换为绝对路径
      console.log('resolve:'+path.resolve('main.js'));
      // 路径中文件的后缀名
      console.log('ext name:'+path.extname('main.js'));
    代码执行结果如下:
      normalization : /test/test1/2slashes/1slash
      joint path : /test/test1/2slashes/1slash
      resolve : /web/com/1427176256_27423/main.js
      ext name : .js    
os,模块提供了一些基本的系统操作函数 
  PS:
  var os = require("os"); 引入os模块
  os.tmpdir() 返回操作系统的默认临时文件夹.
  os.endianness() 返回 CPU 的字节序,可能的是 "BE" 或 "LE".
  os.hostname() 返回操作系统的主机名.
  os.type() 返回操作系统名
  os.platform() 返回操作系统名
  os.arch() 返回操作系统 CPU 架构,可能的值有 "x64"、"arm" 和 "ia32".
  os.release() 返回操作系统的发行版本.
  os.uptime() 返回操作系统运行的时间,以秒为单位.
  os.loadavg() 返回一个包含 1、5、15 分钟平均负载的数组.
  os.totalmem() 返回系统内存总量,单位为字节.
  os.freemem() 返回操作系统空闲内存量,单位是字节.
  os.cpus() 返回一个对象数组,包含所安装的每个 CPU/内核的信息
    型号、速度(单位 MHz)、
    时间(一个包含 user、nice、sys、idle 和 irq 所使用 CPU/内核毫秒数的对象)
  os.networkInterfaces() 获得网络接口列表.
  Example:
    创建 main.js 文件,代码如下所示:
      var os = require("os");
      console.log('endianness : ' + os.endianness());// CPU 的字节序
      console.log('type : ' + os.type()); // 操作系统名
      console.log('platform : ' + os.platform()); // 操作系统名
      console.log('total memory : ' + os.totalmem() + " bytes."); // 系统内存总量
      console.log('free memory : ' + os.freemem() + " bytes."); // 操作系统空闲内存量
    代码执行结果如下:
      endianness : LE
      type : Linux
      platform : linux
      total memory : 25103400960 bytes.
      free memory : 20676710400 bytes.
net,底层的网络通信工具,包含创建服务器/客户端的方法 
  const net = require("net");       引入 net模块
  const server = new net.Server();  创建服务器 
  server.listen(port,host,foo)      监听客户端请求,监听到请求后回调 
    port 端口,数字,1024-65535 之间, 1024 以下端口需管理员权限才能使用
    host 域名,字符串,空字符串""表示接受任意ip地址的连接 
    foo  回调,传入参数 () 
  server.address();                 服务器的ip地址、ip 协议及端口号[以 ipv6 格式显示] 
  server.on('connection',foo)       有连接建立时,触发'connection'事件 
    foo 回调,传入参数 (socket) 
      socket 表示请求方信息的对象 
        socket.io 是对 websocket 的封装
        socket的一些属性表示连接的客户端的信息
      socket.remoteAddress 
      socket.remotePort       操作系统分配给客户端的  
      socket.remoteFamily 
      socket.localAddress     客户端IP 
      socket.on('data',foo)   接收完数据时触发'data'事件 
        foo  回调,传入参数 (data) 
          data 接收到的数据,包括请求头和请求体,Buffer类型
      socket.write(response)  发送响应数据[可发送多次] 
        response  响应的数据,可为'String'或"Buffer"类型 
        格式为: 'HTTP/1.1 200 OK\r\nContent-Length: 12\r\n\r\nHello world!';
        Content-Length 可选,告诉浏览器响应数据量,避免一直等待可和'destroy'二选一 
      socket.destroy()        结束本次服务器的响应[若不结束,浏览器会一直等待接收数据] 
  server.on("error",foo)            服务器出错时触发'error'事件 
    foo  传入参数 (error) 
  server.on("close",foo)            服务器关闭时触发'close'事件 
  const client = new net.Socket()   创建客户端
  client.connect(port,host,foo)     向服务器发送连接请求,连接成功后回调  
    port   连接的端口 
    host   ip或域名[不可带'http://']
    foo    执行的回调,传入参数 () 
  client.write(request)             发送请求  
    request   请求内容,格式为:'GET / HTTP/1.1\r\nHost: music.163.com\r\n\r\n' 
  client.on("data",foo)         监听响应,接收数据完毕触发'data'事件[SelfThink] 
    foo  回调,传入参数 (data) 
      data  响应的数据,默认为Buffer类型,可通过'toString'方法转换成字符串 
  client.destroy()              关闭请求连接 
  client.on("close",foo)        监听关闭,关闭连接时触发'close'事件 
  Example: 
    创建服务端 
    server.listen(2000, '', () => { 
      console.log('listening.', server.address()); 
    })
    server.on('connection', (socket) => { 
      console.log('connected client info', 
        socket.remoteAddress, 
        socket.remotePort, 
        socket.remoteFamily
      )
      socket.on('data', (dat) => { 
        console.log('接受到的原始数据',dat.toString());
        socket.write('HTTP/1.1 200 OK\r\nContent-Length: 12\r\n\r\nHello world!');  
        socket.destroy(); 
      })
    })
    server.on('error', (error) => {  
      console.log('server error', error)
    })
    server.on('close', () => {     
      console.log('server closed')
    })
    创建客户端 
    client.connect('80','59.111.160.197',() => { 
      client.write('GET / HTTP/1.1\r\nHost: music.163.com\r\n\r\n'); 
    });
    client.on('data', (dat) => {   
      console.log('dat:', dat.toString());
      client.destroy(); 
    });        
    client.on('close', function() { }) 
tls,https的创建 
dns,模块用于解析域名 
  PS:
  var dns = require("dns")  // 引入dns模块 
    .lookup(host,function(error,ip,ipv){  // 查询网址的IP 
      host  查询的网址 
      error 错误对象 
      ip    查询的ip  
      ipv   '4'或'6',表示ipv4或ipv6   
      Example: 
        const dns = require('dns');
        const host = 'zhihu.com';
        dns.lookup(host,(error,ip,ipv) => {
          console.log(ip,ipv); // 118.178.213.186  4 
        })
    })     
domain,域,简化异步代码的异常处理,可以捕捉处理try catch无法捕捉的异常
  PS: domain模块,把处理多个不同的IO的操作作为一个组.
    注册事件和回调到domain,当发生一个错误事件或抛出一个错误时,
    domain对象会被通知,不会丢失上下文环境,也不导致程序错误立即推出,
    与process.on('uncaughtException')不同.
    Domain 模块可分为隐式绑定和显式绑定:
      隐式绑定: 把在domain上下文中定义的变量,自动绑定到domain对象
      显式绑定: 把不是在domain上下文中定义的变量,以代码的方式绑定到domain对象
  var domain = require("domain"); 引入domain模块
assert,主要用于断言,如果表达式不符合预期,就抛出一个错误 
  PS:Node的内置模块; 该模块提供11个方法,但只有少数几个是常用的
  assert(bol,str); 
    bol  布尔值
      为true时,无任何提示,返回undefined;
      为false时,抛出一错误,错误的提示信息为第二个参数设定的字符串
    str   字符串
    Example:
      var assert = require('assert');
      function add (a, b) {
        return a + b;
      }
      var expected = add(1,2);
      assert( expected === 3, '预期1加2等于3');
      // 无任何输出,因为assert方法的第一个参数是true 
      assert( expected === 4, '预期1加2等于3')
      // AssertionError: 预期1加2等于3
      会抛出一个错误,因为assert方法的第一个参数是false 
  assert.ok(bol,str)  是assert方法的另一个名字,与assert方法完全一样
  assert.equal(actVal,expVal [,tip]);
    PS:equal方法内部使用的是相等运算符（==）,而不是严格运算符（===）,进行比较运算 
    actVal  实际值
    expVal  预期值
    tip     字符串,错误的提示信息 
    assert.equal(true, value, message);
    // 等同于
    assert(value, message);
    Example: 
      var assert = require('assert');
      function add (a, b) {
        return a + b;
      }
      var expected = add(1,2);
      // 以下三句效果相同
      assert(expected == 3, '预期1+2等于3');
      assert.ok(expected == 3, '预期1+2等于3');
      assert.equal(expected, 3, '预期1+2等于3');
  assert.notEqual(actVal,expVal [,tip]);  只有在实际值等于预期值时,才会抛出错误
    PS:notEqual方法的用法与equal方法类似
      内部使用不相等运算符（!=）,而不是严格不相等运算符（!==）,进行比较运算 
    Example:
      var assert = require('assert');
      function add (a, b) {
        return a + b;
      }
      var expected = add(1,2);
      // 以下三种写法效果相同
      assert(expected != 4, '预期不等于4');
      assert.ok(expected != 4, '预期不等于4');
      assert.notEqual(expected, 4, '预期不等于4');
  assert.deepEqual(actVal,expVal [,tip]); 比较两个对象
    两个对象的属性一一对应,且值都相等,就认为两个对象相等,否则抛出一个错误 
    Example:
      var assert = require('assert');
      var list1 = [1, 2, 3, 4, 5];
      var list2 = [1, 2, 3, 4, 5];
      assert.deepEqual(list1, list2, '预期两个数组应该有相同的属性');
      
      var person1 = { "name":"john", "age":"21" };
      var person2 = { "name":"john", "age":"21" };
      assert.deepEqual(person1, person2, '预期两个对象应该有相同的属性');
  assert.notDeepEqual(actVal,expVal [,tip]); 与deepEqual方法正好相反
    用来断言两个对象是否不相等
  assert.strictEqual(actVal,expVal [,tip])   使用严格相等'===',比较两个表达式
    Example:
      var assert = require('assert');
      assert.strictEqual(1, '1', '预期严格相等');
      // AssertionError: 预期严格相等
  assert.notStrictEqual(actVal,expVal [,tip]) 使用严格不相等'!==',比较两个表达式
  assert.throws(block, [error], [message])  预期某个代码块会抛出一个错误,且抛出的错误符合指定的条件
    // 例一,抛出的错误符合某个构造函数
    assert.throws(
      function() {
        throw new Error("Wrong value");
      },
      Error,
      '不符合预期的错误类型'
    );
    
    // 例二、抛出错误的提示信息符合正则表达式
    assert.throws(
      function() {
        throw new Error("Wrong value");
      },
      /value/,
      '不符合预期的错误类型'
    );
    
    // 例三、抛出的错误符合自定义函数的校验
    assert.throws(
      function() {
        throw new Error("Wrong value");
      },
      function(err) {
        if ( (err instanceof Error) && /value/.test(err) ) {
          return true;
        }
      },
      '不符合预期的错误类型'
    );
    assert.doesNotThrow()
  assert.doesNotThrow(block, [message])     预期某个代码块不抛出错误 
    assert.doesNotThrow(
      function() {
        console.log("Nothing to see here");
      },
      '预期不抛出错误' 
    );
  assert.ifError(val)  断言某个表达式是否false
    如果该表达式对应的布尔值等于true,就抛出一个错误 
    它对于验证回调函数的第一个参数十分有用,如果该参数为true,就表示有错误 
    Example:
      function sayHello(name, callback) {
        var error = false;
        var str   = "Hello "+name;
        callback(error, str);
      }
      // use the function
      sayHello('World', function(err, value){
        assert.ifError(err);
        // ...
      })
  assert.fail(actual, expected, message, operator)   用于抛出一个错误 
    该方法共有四个参数,但是不管参数是什么值,它总是抛出一个错误 
    如果message参数对应的布尔值不为false,抛出的错误信息就是message,
    否则错误信息就是“实际值 + 分隔符 + 预期值”     
    Example:
      var assert = require('assert');
      assert.fail(21, 42, 'Test Failed', '###')
      // AssertionError: Test Failed
      assert.fail(21, 21, 'Test Failed', '###')
      // AssertionError: Test Failed
      assert.fail(21, 42, undefined, '###')
      // AssertionError: 21 ### 42
Promise,同步形式执行异步操作　
  var Promise = require("Promise");   模块引入　
◆第三方模块: 通过npm安装到本地  
cheerio,html文件源码操作模块 
  PS:像使用jquery一样方便快捷地操作抓取到的源码
  npm install cheerio -g   安装cheerio模块
  var cheerio = require("cheerio"); 引入cheerio模块
  var $ = cheerio.load(data); 将传入的数据生成DOM,返回选择器API用于获取DOM元素 
    $(selector)  获取selector对应的元素组成的类数组对象
      $($(selector)[0]).html();  获取第一个元素的HTML字符
      $($(selector)[0]).text();  获取第一个元素的文本
        当同时存在多个元素该方法会将多个文本合并返回
      $($(selector)[0]).attr(属性名);  获取第一个元素指定属性的值
      $($(selector)[0]).find(selector);  获取第一个元素中对应selector的子元素
    Example:
    var $ =cheerio.load(data);
    var a =$('a'); // 获取所有的a元素对象,操作类似与jQuery
request,请求模块 
  var request =require('request'); 引入request模块
  request(url,function(err,response,data){ }); 向URL发送请求
    回调函数传入err response data三个参数
      err      当报错时err参数被填充,默认为null
      response 请求
        response.statusCode   http响应状态码,如200为成功
      data     响应的数据
◆本地模块: 自定义的JS文件  



