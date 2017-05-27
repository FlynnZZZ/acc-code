介绍_概念_说明_定义
  NodeJS介绍
    2009 年,Node 项目诞生,它是服务器上的 JavaScript 运行环境.
    简单的说 Node.js 就是运行在服务端的 JavaScript 
    Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台 
    Node.js是一个事件驱动I/O服务端JavaScript环境,基于Google的V8引擎
    V8引擎执行Javascript的速度非常快,性能非常好 
    用于开发脱离浏览器的JS程序(主要用于工具或服务端,比如文件处理)
  NodeJS的版本特点
    偶数位为稳定版本
    e.g. :-0.6.X -0.8.X -0.10.X  
    奇数为非稳定版本
    e.g. :-0.7.X -0.9.X -0.11.X  
  
  Node.js 应用一般由3部分组成
    required引入模块：我们可以使用 require 指令来载入 Node.js 模块.
    创建服务器：服务器可以监听客户端的请求,类似于 Apache 、Nginx 等 HTTP 服务器.
    接收请求与响应请求: 客户端可以使用浏览器或终端发送 HTTP 请求,服务器接收请求后返回响应数据.
    
  运行环境
    path 环境变量
      执行命令时,优先到path指定的路径中去寻找.
    cmd执行环境 Node指令
      node -v     查看所安装node的版本信息
      node 文件名  执行该文件
    需要将执行的文件放在引用库的文件夹下(自带的库则不用)
    Node.js REPL 交互式解释器
      PS：Node.js REPL,Read Eval Print Loop, 表示一个电脑的环境,
        类似 Window 系统的终端或 Unix/Linux shell,我们可以在终端中输入命令,并接收系统的响应.
        Node 的交互式解释器可以很好的调试 Javascript 代码.
        通过输入 node 命令来启动 Node 的终端
      Node 自带了交互式解释器,可以执行以下任务：
        读取 - 读取用户输入,解析输入了Javascript 数据结构并存储在内存中.
        执行 - 执行输入的数据结构
        打印 - 输出结果
        循环 - 循环操作以上步骤直到用户两次按下 ctrl-c 按钮退出.
      REPL 命令
        ctrl + c   退出当前终端.
        ctrl + c   按下两次退出 Node REPL
        ctrl + d   退出 Node REPL
        向上/向下键 查看输入的历史命令
        tab 键     列出当前命令
        .help      列出使用命令
        .break     退出多行表达式
        .clear     退出多行表达式
        .save filename  保存当前的 Node REPL 会话到指定文件
        .load filename  载入当前 Node REPL 会话的文件内容.
        
  Node.js 回调函数
    PS：Node.js 异步编程的直接体现就是回调.
      异步编程依托于回调来实现,但不能说使用了回调后程序就异步化了.
      回调函数在完成任务后就会被调用,Node 使用了大量的回调函数,Node 所有 API 都支持回调函数.
      例如,我们可以一边读取文件,一边执行其他命令,在文件读取完成后,
      我们将文件内容作为回调函数的参数返回.这样在执行代码时就没有阻塞或等待文件 I/O 操作.
      这就大大提高了 Node.js 的性能,可以处理大量的并发请求.
    阻塞与非阻塞调用的不同
      e.g.:
      阻塞代码实例
        创建一个文件 input.txt ,内容如下：
          11111111111111
        创建 main.js 文件, 代码如下：
          var fs = require("fs");
          var data = fs.readFileSync('input.txt');
          console.log(data.toString());
          console.log("程序执行结束!");
        node main.js 以上代码执行结果:
          11111111111111
          程序执行结束!
      非阻塞代码实例
        创建一个文件 input.txt ,内容如下：
          11111111111
        创建 main.js 文件, 代码如下：
          var fs = require("fs");
          fs.readFile('input.txt', function (err, data) {
            if (err) return console.error(err);
            console.log(data.toString());
          });
          console.log("程序执行结束!");
        $ node main.js 以上代码执行结果如下：
          程序执行结束!
          11111111111
      第一个实例在文件读取完后才执行完程序. 
      第二个实例不需要等待文件读取完,可以在读取文件时同时执行后续代码,大大提高了程序的性能.
      因此,阻塞是按顺序执行的,而非阻塞是不需要按顺序的,
      所以如果需要处理回调函数的参数,我们就需要写在回调函数内.
    Node.js 事件循环
      Node.js 是单进程单线程应用程序,但是通过事件和回调支持并发,所以性能非常高.
      Node.js 的每一个 API 都是异步的,并作为一个独立线程运行,使用异步函数调用,并处理并发.
      Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现.
        观察者模式定义了一种一对多的依赖关系,让多个观察者对象同时监听某一个主题对象.
        这个主题对象在状态发生变化时,会通知所有观察者对象,使它们能够自动更新自己.
      Node.js 单线程类似进入一个while(true)的事件循环,直到没有事件观察者后退出,
      每个异步事件都生成一个事件观察者,如果有事件发生就调用该回调函数.
    事件驱动程序
      PS：Node.js 使用事件驱动模型,当web server接收到请求,就把它关闭然后进行处理,
        然后去服务下一个web请求.
        当这个请求完成,它被放回处理队列,当到达队列开头,这个结果被返回给用户.
        这个模型非常高效可扩展性非常强,因为webserver一直接受请求而不等待任何读写操作,
        这也被称之为非阻塞式IO或者事件驱动IO.
        在事件驱动模型中,会生成一个主循环来监听事件,当检测到事件时触发回调函数.
      Node.js 有多个内置的事件,可以通过引入events模块,并实例化EventEmitter类来绑定和监听事件
        e.g.:
          var events = require('events'); // 引入 events 模块
          var eventEmitter = new events.EventEmitter(); // 创建 eventEmitter 对象
          var foo = function connected() {  // 创建事件处理程序
            console.log('1');
            eventEmitter.emit('data_received'); // 触发 data_received 事件 
          }
          eventEmitter.on('connection', foo); // 绑定 connection 事件处理程序
          eventEmitter.on('data_received', function(){ // 绑定 data_received 事件
            console.log('2');
          });
          eventEmitter.emit('connection'); // 触发 connection 事件 
          console.log("3");
          执行:
          // 1
          // 2
          // 3
--------------------------------------------------------------------------------
基础语法 
  this
    全局作用域下的this
      在浏览器里this等价于window对象,若声明一些全局变量(不管在任何地方),
      这些变量都会作为this的属性.
      在node里面,有两种执行JavaScript代码的方式,
      一种是直接在里面执行一行行代码.
        声明的全局变量会添加到global对象,也会添加给this
        global 和 this 是等价的.
      一种是直接执行写好的JavaScript文件,
        声明的全局变量会添加到global对象,但不会自动添加到this
    function this
      除了在DOM事件处理程序里,
        事件处理程序里面的this表示被绑定的元素对象
      不是用new调用外,
        若使用new调用,函数就变成了一个构造函数,
        就创建了一个实例,this指代这个实例.
        当构造函数使用new生成实例时,this指向其prototype.
        e.g. :
        function Foo() { console.log(this.aoo); }
        Foo.prototype.aoo = "111"; 
        Foo();  // undefined
        var obj = new Foo();   // 111
        console.log(obj.aoo);  // 111
      无论是在浏览器环境还是node环境,
      正常的方式调用函数(直接执行而无前缀),this指代全局的this
      使用严格模式,this就会变成undefined.
      e.g. :
      var foo = "bar";
      function testThis() { this.foo = "foo"; }
      console.log(this.foo); // bar
      testThis();
      console.log(this.foo); // foo
Buffer 缓冲区 
  PS：JavaScript 语言自身只有字符串数据类型,没有二进制数据类型.
    但在处理像TCP流或文件流时,必须使用到二进制数据.
    因此在 Node.js中,定义了一个 Buffer 类,该类用来创建一个专门存放二进制数据的缓存区.
    在 Node.js 中,Buffer 类是随 Node 内核一起发布的核心库.
    Buffer 库为 Node.js 带来了一种存储原始数据的方法,可以让 Node.js 处理二进制数据,
    每当需要在 Node.js 中处理I/O操作中移动的数据时,就有可能使用 Buffer 库.
    原始数据存储在 Buffer 类的实例中.
    一个 Buffer 类似于一个整数数组,但它对应于 V8 堆内存之外的一块原始内存.
  var buf = new Buffer(10); 创建长度为 10 字节的 Buffer 实例
  var buf = new Buffer(buf); 通过拷贝buf创建
    e.g.:
    var buf = new Buffer([1, 1, 2, 2, 3]);
    console.log(buf); // <Buffer 01 01 02 02 03>
  var buf = new Buffer("www.runoob.com", "utf-8"); 通过一个字符串来创建 Buffer 实例
    utf-8 是默认的编码方式,
    此外它同样支持以下编码："ascii", "utf8", "utf16le", "ucs2", "base64" 和 "hex".  
  buf.length;  返回buf对象所占据的内存长度
    e.g.:
      var buf1 = new Buffer('1234567');
      var buf2 = new Buffer(8);
      console.log(buf1.length); // 7
      console.log(buf2.length); // 8
  buf.write(str[,index[,length]][,encoding]); 将字符串写入buf缓冲区,返回实际写入的长度
    PS：如果 buffer 空间不足, 则只会写入部分字符串.
    Arguments: 
      string   写入缓冲区的字符串.
      index    缓冲区开始写入的索引值,默认为 0 .
      length   写入的字节数,默认为 buffer.length
      encoding 使用的编码.默认为 'utf8' 
    e.g.:
      var buf = new Buffer(256);
      var len = buf.write("www.runoob.com");
      console.log("写入字节数 : "+ len);  // 写入字节数 : 14
      console.log(buf);
      // <Buffer 77 77 77 2e 72 75 6e 6f 6f 62 2e 63 6f 6d 00 00 90 74 48 ee 42 01 00 00 0a 00 00 00 00 00 00 00 b8 74 48 ee 42 01 00 00 05 00 00 00 01 00 00 00 00 00 ... >
  buf.toString([encoding[,begin[,end]]]); 解码buf缓冲区数据并使用指定的编码返回字符串
    Arguments:
      encoding 使用的编码.默认为 'utf8' .
      begin    指定开始读取的索引位置,默认为 0.
      end      结束位置,默认为缓冲区的末尾.
    e.g.:
      var buf = new Buffer(26);
      for (var i = 0 ; i < 26 ; i++) { buf[i] = i + 97; }
      console.log(buf);
      // <Buffer 61 62 63 64 65 66 67 68 69 6a 6b 6c 6d 6e 6f 70 71 72 73 74 75 76 77 78 79 7a>
      console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
      console.log( buf.toString('ascii',0,5));   // 输出: abcde
      console.log( buf.toString('utf8',0,5));    // 输出: abcde
      console.log( buf.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde
  buf.toJSON();    返回将buf类数组转换为JSON格式对象
    e.g.:
      var buf = new Buffer('abc');
      var json = buf.toJSON();
      console.log(json); // { type: 'Buffer', data: [ 97, 98, 99 ] }
      console.log(typeof json); // object
  buf.slice([begin[,end]]);  buf缓冲区剪切,返回剪切的新缓冲区
    Arguments:
      begin 可选,默认为 0
      end   可选,默认为 buf.length
    e.g.:
      var buf1 = new Buffer('123');
      var buf2 = buf1.slice(0,2);
      console.log(buf2); // <Buffer 31 32>
  Buf.copy(targetBuf[,targetBegin[,begin[,end]]]); 拷贝缓冲区,返回undefined
    Arguments:
      targetBuf    要拷贝的 Buffer 对象.
      targetBegin  数字,可选,默认为 0
      begin        数字,可选,默认为 0
      end          数字,可选,默认为 buf.length
    e.g.:
      var buf1 = new Buffer('abc');
      var buf2 = new Buffer(3);
      buf1.copy(buf2);
      console.log(buf2.toString()); // abc
  Buf.compare(buf);  比较
    e.g.:
      var buf1 = new Buffer('10');
      var buf2 = new Buffer('11');
      var result = buf1.compare(buf2);
      console.log(result); // -1
  Buffer.concat(buflist[,length]);  buf缓冲区合并,返回合并后的新buffer对象
    Arguments:
      buflist 用于合并的buf对象数组列表,如[buf1,buf2,buf3]
      length  指定新buf对象的长度
    e.g.:
      var buf1 = new Buffer('11');
      var buf2 = new Buffer('22');
      var buf3 = Buffer.concat([buf1,buf2]);
      console.log(buf3.toString());   // 1122
Stream 流 
  PS：Stream 是一个抽象接口,Node中有很多对象实现了这个接口.
    例如,对http 服务器发起请求的request 对象就是一个 Stream,还有stdout,标准输出.
    所有的 Stream 对象都是 EventEmitter 的实例
  Stream 有四种流类型：
    Readable  可读操作
    Writable  可写操作
    Duplex    可读可写操作
    Transform 操作被写入数据,然后读出结果
  ◆常用事件
  data   当有数据可读时触发
  end    没有更多的数据可读时触发
  error  在接收和写入过程中发生错误时触发
  finish 所有数据已被写入到底层系统时触发
  e.g.:
    从文件中读取数据
      创建 input.txt 文件,内容如下：
        菜鸟教程官网地址：www.runoob.com
      创建 main.js 文件, 代码如下：
        var fs = require("fs");
        var data = '';
        var rs = fs.createReadStream('input.txt'); // 创建可读流
        rs.setEncoding('UTF8'); // 设置编码为 utf8.
        // 处理流事件 data  end error
        rs.on('data', function(chunk) { data += chunk; });
        rs.on('end',function(){ console.log(data); });
        rs.on('error', function(err){ console.log(err.stack); });
        console.log("程序执行完毕");
      以上代码执行结果如下：
        程序执行完毕
        菜鸟教程官网地址：www.runoob.com
    将数据写入文件
      创建 main.js 文件, 代码如下：
        var fs = require("fs");
        var data = '菜鸟教程官网地址：www.runoob.com';
        // 创建一个可以写入的流,写入到文件 output.txt 中
        var rs = fs.createWriteStream('output.txt');
        // 使用 utf8 编码写入数据
        rs.write(data,'UTF8');
        rs.end(); // 标记文件末尾
        // 处理流事件 
        rs.on('finish', function() { console.log("写入完成."); });
        rs.on('error', function(err){ console.log(err.stack); });
        console.log("程序执行完毕");
      以上程序会将 data 变量的数据写入到 output.txt 文件中.代码执行结果如下：
        程序执行完毕
        写入完成.
      查看 output.txt 文件的内容：
        菜鸟教程官网地址：www.runoob.com
  管道流 
    PS：管道提供了一个输出流到输入流的机制.
      通常我们用于从一个流中获取数据并将数据传递到另外一个流中
    e.g.:
      读取一文件内容并将数据写入到另外一文件中
      设置 input.txt 文件内容如下：
        菜鸟教程官网地址：www.runoob.com
      创建 main.js 文件, 代码如下：
        var fs = require("fs");
        var rs = fs.createReadStream('input.txt');// 创建一个可读流
        var writerStream = fs.createWriteStream('output.txt'); // 创建一个可写流
        // 读取 input.txt 文件内容,并将内容写入到 output.txt 文件中
        rs.pipe(writerStream); // 管道读写操作
        console.log("程序执行完毕");
      程序执行完毕,查看 output.txt 文件的内容：
        菜鸟教程官网地址：www.runoob.com
  链式流
    PS：链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制.
      链式流一般用于管道操作.
    e.g.:
      用管道和链式来压缩和解压文件
        创建 compress.js 文件, 代码如下：
        var fs = require("fs");
        var zlib = require('zlib');
        // 压缩 input.txt 文件为 input.txt.gz
        fs.createReadStream('input.txt')
          .pipe(zlib.createGzip())
          .pipe(fs.createWriteStream('input.txt.gz'));
        console.log("文件压缩完成.");
        代码执行结果如下：
        文件压缩完成.
        执行完以上操作后,我们可以看到当前目录下生成了 input.txt 的压缩文件 input.txt.gz.
      接下来,解压该文件
        创建 decompress.js 文件,代码如下：
        var fs = require("fs");
        var zlib = require('zlib');
        // 解压 input.txt.gz 文件为 input.txt
        fs.createReadStream('input.txt.gz')
          .pipe(zlib.createGunzip())
          .pipe(fs.createWriteStream('input.txt'));
        console.log("文件解压完成.");
        代码执行结果如下：
        文件解压完成.
模块系统 
  PS：为了让NodeJS的文件可以相互调用,NodeJS提供了一个简单的模块系统.
    模块是Node.js 应用程序的基本组成部分,文件和模块是一一对应的.
    换言之,一个 Node.js 文件就是一个模块,
    这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展.
  模块的引用和创建
    PS：Node.js 提供了exports 和 require 两个对象,
      其中 exports 是模块公开的接口,
      require 用于从外部获取一个模块的接口,即所获取模块的 exports 对象.
    exports.foo = function(){ }
      e.g.:
        创建hello.js文件,代码如下：
          exports.world = function() { console.log('Hello World'); }
        在以上示例中,hello.js 通过 exports 对象把 world 作为模块的访问接口,
        在 main.js 中通过 require('./hello') 加载这个模块,
          然后就可以直接访 问 hello.js 中 exports 对象的成员函数 world 了.
    module.obj = function(){ }
      e.g.:
      hello.js 文件中
        function world() { 
          var name; 
          this.setName = function(thyName) { name = thyName; }; 
          this.sayHello = function() { console.log('Hello ' + name); }; 
        }; 
        module.exports = world;
      main.js 文件中
        var World = require('./hello'); 
        world = new World(); 
        world.setName('BYVoid'); 
        world.sayHello(); 
    ◆require 引入模块
      require方法接受以下几种参数的传递：
        http、fs、path等,原生模块.
        ./mod或../mod,相对路径的文件模块.
        /pathtomodule/mod,绝对路径的文件模块.
        mod,非原生模块的文件模块.
    var aoo = require(path); 通过路径引入
      e.g. :
        模块的引入和创建
          student.js 文件中
            function add(student){ console.log("Add student:" + student); }
            exports.add =add; // 通过 exports对象 注册,以便引入到其他文件中
          teacher.js 文件中
            function add(teacher){ console.log("Add teacher:" + teacher); }
            exports.add =add; // 通过 exports对象 暴露值
          klass.js 文件中
            var student =require("./student"); 
            // 通过 require函数 来引入student.js 模块 
            // (student.js 和 class.js 在同一目录下,必须使用./)
            var teacher =require("./teacher");
            // 引入 teacher.js 模块
            function add(t,ss){
              teacher.add(t);  // 调用teacher.js 模块中的 add函数
              ss.forEach(function(val,i){ student.add(val); })
              // 调用student.js 模块中的 add函数
            }
            exports.add =add; // 传统的模块实例
            // moudule.exports.add =add; // 成为一个特别的模块类型
            //和 exports.add =add; 类似(功能相同),调用方式不同
            // 若存在 exports.add =add; moudule.exports.add =add;被忽略
          index.js 文件中
            var klass =require("./klass"); // 引入 klass.js
            klass.add("abc",["12","34"]);  // 调用 klass.js 中的函数
            // Add teacher:abc
            // Add student:12
            // Add student:34
    var aoo = require(str);  通过模块名引入
      e.g.:
      var fs = require('fs'); // 引入fs模块
  ◆核心模块
  events 事件模块
    PS：Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列
    Node.js 里面的许多对象都会分发事件：
      一个 net.Server 对象会在每次有新连接时分发一个事件,
      一个 fs.readStream 对象会在文件被打开的时候发出一个事件.
      所有这些产生事件的对象都是 events.EventEmitter 的实例.
    var events = require('events');   引入 events 模块
    var event = new events.EventEmitter(); 创建事件功能对象
      EventEmitter 对象如果在实例化时发生错误,会触发 'error' 事件.
      当添加新的监听器时,'newListener' 事件会触发,
      当监听器被移除时,'removeListener' 事件被触发.
    event.on(eName,function([arg1,arg2...]){ }); 给指定事件添加监听器
      PS：事件名为字符串,可自定义.一个事件可以绑定多次
      回调函数的传入的参数为手动触发时指定的值
    event.emit(eName[,val1,val2...]); 手动触发事件
      当事件触发时,注册到这个事件的事件监听器被依次调用
    event.addListener(eName,listener) 给指定事件添加监听器
    event.once(eName,listener)  单次事件监听器添加,即只会触发一次,触发后立刻解除
    event.removeListener(eName,listener)  移除指定事件的指定监听器
      此操作将会改变处于被删监听器之后的那些监听器的索引
      e.g.:
        var callback = function(stream) { };
        server.on('connection', callback);
        server.removeListener('connection', callback);
    event.removeAllListeners([eName])  移除所有监听器,若指定事件,则移除该事件的所有监听器
    event.setMaxListeners(num)   提高监听器的默认限制的数量
      默认情况下,单个事件允许绑定不超过 10 监听器函数否则就会输出警告信息
    event.listeners(eName)     返回指定事件的监听器数组
    event.emit(eName[,val1,val2...]) 激活监听器并传参,返回该事件是否存在监听器的布尔值
    events.EventEmitter.listenerCount(event,eName)  返回指定事件功能对象的事件的监听器数量
    e.g.:
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
      为什么要这样做呢？原因有两点：
      首先,具有某个实体功能的对象实现事件符合语义, 事件的监听和发射应该是一个对象的方法.
      其次 JavaScript 的对象机制是基于原型的,支持 部分多重继承,
      继承 EventEmitter 不会打乱对象原有的继承关系.
  http   http服务模块
    PS： Node.js自带的 http 模块, 当协议为 https 时,使用 https 模块
      1024 以下的端口是系统保留端口,需要管理员权限才能使用;
      http 模块主要用于搭建 HTTP 服务端和客户端,
      使用 HTTP 服务器或客户端功能必须调用 http 模块.
    Web服务器
      Web服务器一般指网站服务器,是指驻留于因特网上某种类型计算机的程序,
      Web服务器的基本功能就是提供Web信息浏览服务.
      它只需支持HTTP协议、HTML文档格式及URL,与客户端的网络浏览器配合.
      大多数 web 服务器都支持服务端的脚本语言(php、python、ruby)等,
      并通过脚本语言从数据库获取数据,将结果返回给客户端浏览器.
      目前最主流的三个Web服务器是Apache、Nginx、IIS.
    Web 应用架构
      Client   客户端,一般指浏览器,浏览器可以通过 HTTP 协议向服务器请求数据.
      Server   服务端,一般指 Web 服务器,可以接收客户端请求,并向客户端发送响应数据.
      Business 业务层,通过 Web 服务器处理应用程序,如与数据库交互,逻辑运算,调用外部程序等.
      Data     数据层,一般由数据库组成.
    var http =require("http"); 引入 http 模块
    var server =http.createServer(function(req,res){}); 创建服务器
      Arguments:
        req 请求
        req.url  请求的地址
        req.setEncoding("utf8"); 设置请求的格式为UTF-8
        req.addListener("data",function(dataPart){}); data事件,当接收请求信息时触发
          会触发多次,dataPart为每次信息,将所有dataPart串起来就是,请求传送的信息了
        req.addListener("end",function(){}); end事件,请求信息传送完毕后触发
        res 响应
        res.writeHead(状态码,obj); 设置响应头
          obj  设置响应头信息的对象
          e.g.:
          res.writeHead(200,{"Content-Type":"text/plain"})
        res.write(str); 定义响应信息
        res.end([str]); 完成响应,参数可选,存在会将其发送
      server.listen(端口[,url]);  监听网址及端口
      e.g. :
        var http =require("http"); // 引入 http 模块
        //创建Web服务器,传入一回调函数,用于处理请求
        var server =http.createServer(function(req,res){ 
          res.writeHead(200,{"Content-Type":"text/plain"});
          res.write("haha! ");
          res.end("hello word\n");
        });
        server.listen(1337,"127.0.0.1"); // 监听请求
        // 通过监听 http://127.0.0.1:1337 来调用回调函数
        console.log("server running at http://127.0.0.1:1337");
        Node环境中运行该文件
        打开浏览器输入地址 "http://127.0.0.1:1337" 
        出现 haha! hello word
    http.get(url,function(res){}); 使用get方法请求指定url的数据
      res.on('data',function(data){ }); 监听请求的数据下载事件,会不断的触发
        PS：将回调函数中所有的data数据串起来就是完整的响应数据了
      res.on('end',function(){ }); 请求数据下载完毕触发
    e.g.:
      创建Web服务器
      创建 server.js 文件,代码如下所示：
        var http = require('http');
        var fs = require('fs');
        var url = require('url');
        // 创建服务器
        http.createServer( function (request, response) {  
          // 解析请求,包括文件名
          var pathname = url.parse(request.url).pathname;
          // 输出请求的文件名
          console.log("Request for " + pathname + " received.");
          // 从文件系统中读取请求的文件内容
          fs.readFile(pathname.substr(1), function (err, data) {
            if (err) {
              console.log(err);
              // HTTP 状态码: 404 : NOT FOUND
              // Content Type: text/plain
              response.writeHead(404, {'Content-Type': 'text/html'});
            }else{	         
              // HTTP 状态码: 200 : OK
              // Content Type: text/plain
              response.writeHead(200, {'Content-Type': 'text/html'});	
              // 响应文件内容
              response.write(data.toString());		
            }
            //  发送响应数据
            response.end();
          });   
        }).listen(8081);
        // 控制台会输出以下信息
        console.log('Server running at http://127.0.0.1:8081/');
      在该目录下创建一个 index.htm 文件,代码如下：
        <html>
        <head>
        <title>Sample Page</title>
        </head>
        <body>
        Hello World!
        </body>
        </html>
      执行 server.js 文件：
      
      创建Web客户端
      创建 client.js 文件,代码如下所示：
        var http = require('http');
        // 用于请求的选项
        var options = {
          host: 'localhost',
          port: '8081',
          path: '/index.htm'  
        };
        // 处理响应的回调函数
        var callback = function(response){
          // 不断更新数据
          var body = '';
          response.on('data', function(data) {
            body += data;
          });
          response.on('end', function() {
            // 数据接收完成
            console.log(body);
          });
        }
        // 向服务端发送请求
        var req = http.request(options, callback);
        req.end();
      新开一个终端,执行 client.js 文件,输出结果如下：
        <html>
        <head>
        <title>Sample Page</title>
        </head>
        <body>
        Hello World!
        </body>
        </html>
  fs     文件系统模块file system
    PS：fs模块可用于对系统文件及目录进行读写操作.
      Node.js 提供一组类似 UNIX(POSIX)标准的文件操作API.
      也可使用 fs.read 和 fs.write 读写文件,
      fs.read 和 fs.write 功能类似 fs.readFile 和 fs.writeFile,
      但提供更底层的操作,实际应用中多用 fs.readFile 和 fs.writeFile,
      使用 fs.read 和 fs.write 读写文件需要使用 fs.open 打开文件和 fs.close 关闭文件.
    模块中所有方法都有同步和异步两种形式
      PS：建议使用异步方法,比起同步,异步方法性能更高,速度更快,而且没有阻塞.
        异步的方法函数最后一个参数为回调函数,回调函数的第一个参数包含了错误信息 error.
      异步写法demo:有一个回调函数
        var fs = require('fs'); // 载入fs模块
        fs.unlink('/tmp/shiyanlou', function(err) {
            if (err) { throw err; }
            console.log('成功删除了 /tmp/shiyanlou');
        });
        异步方法中回调函数的第一个参数总是留给异常参数(exception),
        如果方法成功完成,该参数为null或undefined
      同步写法demo:
        var fs = require('fs');
        fs.unlinkSync('/tmp/shiyanlou'); // Sync 表示是同步方法
        console.log('成功删除了 /tmp/shiyanlou');
        同步方法执行完并返回结果后,才能执行后续的代码 
        而异步方法采用回调函数接收返回结果,可以立即执行后续代码 
    var fs = require('fs'); 引入文件系统模块
    fs.writeFile(path,data,[options],callback); 写内容到文件中
      PS： 写入文件内容,如果文件不存在会创建一个文件,但不会主动创建目录
        写入时会先清空文件
      Arguments:
        path    字符串,路径及文件名
        data    字符串,写入的内容
        option  对象,用于控制写入,包含{encoding,mode,flag}
          encoding 默认编码为 utf8
          mode     模式为 0666
          flag     默认值为 "w",表示重写,会清空文件之前的内容
            'a'  增加,在文件原有的基础上增加
        callback 回调函数,传入参数 err
      e.g.:
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
    fs.readFile(path,[option],callback); 读取文件内容
      Arguments:
        path   字符串,路径及文件名
        option   对象
          encoding String |null default=null
          flag  默认为 'r'
        callback 回调函数,传入两个参数 err 和 data
          err是读取文件出错时触发的错误对象,
          data是从文件读取的数据 
      e.g.:
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
            toString()写法：
            fs.readFile('./test.txt', function(err, data) {
              if (err) { throw err; }
              console.log(data.toString());
            });
            设置utf-8 编码写法：
            fs.readFile('./test.txt', 'utf-8', function(err, data) {
              if (err) { throw err; }
              console.log('utf-8: ', data);
            });

        readFile 同步的写法就是没有回调函数:fs.readFileSync(filename,[options])
    fs.unlink(path,callback); 删除文件
      Arguments:
        path 字符串,路径及文件名
        callback 回调函数,传入参数 err
      e.g. 
        var file ='message.txt'
        fs.unlink(file,(err) =>{
          if (err) { throw err }
          console.log(`${file} 成功删除`)
        })
    fs.mkdir(path,[mode],callback); 创建目录
      PS：当创建的文件夹和已存在的文件夹重名时会报错
      Arguments:
        path     路径和目录名称
        mode     可选,设置目录的权限,默认为 0777
        callback 回调函数,传入参数 err 
      e.g.:
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
      e.g.:
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
      e.g.:
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
          r   以读取模式打开文件.如果文件不存在抛出异常.
          r+  以读写模式打开文件.如果文件不存在抛出异常.
          rs  以同步的方式读取文件.
          rs+ 以同步的方式读取和写入文件.
          w   以写入模式打开文件,如果文件不存在则创建.
          wx  类似 'w',但是如果文件路径存在,则文件写入失败.
          w+  以读写模式打开文件,如果文件不存在则创建.
          wx+ 类似 'w+', 但是如果文件路径存在,则文件读写失败.
          a   以追加模式打开文件,如果文件不存在则创建.
          ax  类似 'a', 但是如果文件路径存在,则文件追加失败.
          a+  以读取追加模式打开文件,如果文件不存在则创建.
          ax+ 类似 'a+', 但是如果文件路径存在,则文件读取追加失败.          
        mode     设置文件模式(权限),文件创建默认权限为 0666,可读写)
        callback 回调函数,带有两个参数如：callback(err, fd)      
    fs.stat(path,callback); 获取文件信息
      Arguments:
        path     文件路径.
        callback 回调函数,带有两个参数如：(err, stats), stats 是 fs.Stats 对象. 
      e.g.:
        fs.stat(path)执行后,会将stats类的实例返回给其回调函数.
        可以通过stats类中的提供方法判断文件的相关属性.例如判断是否为文件：
        var fs = require('fs');
        fs.stat('/Users/liuht/code/itbilu/demo/fs.js', function (err, stats) {
          console.log(stats.isFile()); 		//true
        })      
      stats对象的方法
        stats.isFile(); 如果是文件返回 true,否则返回 false.
        stats.isDirectory(); 如果是目录返回 true,否则返回 false.
        stats.isBlockDevice(); 如果是块设备返回 true,否则返回 false.
        stats.isCharacterDevice(); 如果是字符设备返回 true,否则返回 false.
        stats.isSymbolicLink(); 如果是软链接返回 true,否则返回 false.
        stats.isFIFO(); 如果是FIFO,返回true,否则返回 false.
          FIFO是UNIX中的一种特殊类型的命令管道.
        stats.isSocket(); 如果是 Socket 返回 true,否则返回 false.      
    fs.read(fd,buffer,offset,length,position,callback); 读取文件
      Arguments:
        fd      通过 fs.open() 方法返回的文件描述符.
        buffer  数据写入的缓冲区
        offset  缓冲区写入的写入偏移量
        length  要从文件中读取的字节数
        position  文件读取的起始位置,如果 position 的值为 null,则会从当前文件指针的位置读取
        callback  回调函数,有三个参数err, bytesRead, buffer
          err 为错误信息, bytesRead 表示读取的字节数,buffer 为缓冲区对象
      e.g.:
        input.txt 文件内容为：
          菜鸟教程官网地址：www.runoob.com
        接下来我们创建 file.js 文件,代码如下所示：
          var fs = require("fs");
          var buf = new Buffer(1024);
          console.log("准备打开已存在的文件！");
          fs.open('input.txt', 'r+', function(err, fd) {
            if (err) { return console.error(err); }
            console.log("文件打开成功！");
            console.log("准备读取文件：");
            fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
              if (err){ console.log(err); }
              console.log(bytes + "  字节被读取");
              if(bytes > 0){ // 仅输出读取的字节
                console.log(buf.slice(0, bytes).toString());
              }
            });
          });
          以上代码执行结果如下：
            准备打开已存在的文件！
            文件打开成功！
            准备读取文件：
            42  字节被读取
            菜鸟教程官网地址：www.runoob.com      
    fs.close(fd,callback); 关闭文件
      Arguments:
        fd   通过 fs.open() 方法返回的文件描述符
        callback   回调函数,没有参数
      e.g.:
        input.txt 文件内容为：
          菜鸟教程官网地址：www.runoob.com
        接下来我们创建 file.js 文件,代码如下所示：
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
        以上代码执行结果如下：
          准备打开文件！
          文件打开成功！
          准备读取文件！
          菜鸟教程官网地址：www.runoob.com
          文件关闭成功          
    fs.ftruncate(fd,len,callback); 截取文件          
      Arguments:
        fd  通过 fs.open() 方法返回的文件描述符.
        len  文件内容截取的长度.
        callback  回调函数,没有参数.
      e.g.:
        input.txt 文件内容为：
          site:www.runoob.com
        接下来我们创建 file.js 文件,代码如下所示：
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
        以上代码执行结果如下：
          准备打开文件！
          文件打开成功！
          截取10字节后的文件内容.
          文件截取成功.
          读取相同的文件
          site:www.r
          文件关闭成功          
    fs.rename(oldPath, newPath, callback)
      回调函数没有参数,但可能抛出异常          
  url    
    PS：URL对象包含五个方法,不需要实例化,本身就是一个实例对象.
    var url = require("url"); 引入url模块
    url.parse(url [,bool1] [,bool2]); 将URL解析为对象「方便后续其他操作」
      url   字符串,传入需要解析的URL字符串
      bool1 布尔值,可选,默认false,是否将query字段转换为对象表示
      bool2 布尔值,可选,默认false,当URL不全时更智能的识别
      e.g. :
        url.parse("https://www.baidu.com");
        返回如下的对象
        {
          protocol: 'https:',  // 使用协议
          slashes: true,       // 是否有协议的双斜线
          auth: null,
          host: 'www.baidu.com', // ip地址或域名
          port: null,       // 端口,默认为80,否则会指明
          hostname: 'www.baidu.com', // 主机名
          hash: null,   // hash值,锚点
          search: null, // 查询字符串参数
          query: null,  // 发送给服务器的数据,使用=的键值对表示,参数串
          pathname: '/', // 路径名,
          path: '/',     // 路径
          href: 'https://www.baidu.com/' // 完整超链接
        }
    url.format(url对象); 将url对象格式化为url字符串
      e.g. :
      var obj =url.parse("https://www.baidu.com");
      url.format(obj); // 'https://www.baidu.com/'
    url.resolve(str1,str2); 拼接为URL
      e.g. :
      url.resolve("https://imooc.com","/course/list");
      // 'https://imooc.com/course/list'
  querystring 
    PS：
    var querystring = require("querystring"); 引入querystring模块
    querystring.stringify(obj [,str1] [,str2])  序列化为字符串形式 
      obj  需序列化的对象
      str1 字符串,可选,默认为'&',用于键值对间的连接
      str2 字符串,可选,默认为'=',用于键值对的键值连接
      e.g. :
        querystring.stringify({
          name:"Scott",
          course:["Java","Node"],
          from:""
        })
        // 'name=Scott&course=Java&course=Node&from='
    querystring.parse(str [,str1] [,str2])   解析为对象格式  
      str  字符串,需要解析的字符串
      str1 字符串,可选,默认为'&',指定键值对间的连接符号
        e.g.：
        var str = 'name=Scott-course=Java-course=Node-from=';
        var obj1 = querystring.parse(str);
        var obj2 = querystring.parse(str,'-');
        console.log(obj1,'/n',obj2);
        // { name: 'Scott-course=Java-course=Node-from=' } 
        // { name: 'Scott', course: [ 'Java', 'Node' ], from: '' }
      str2 字符串,可选,默认为'=',指定键值对的键值连接符号
      e.g. :
        querystring.parse('name=Scott&course=Java&course=Node&from=');
        // { name: 'Scott', course: [ 'Java', 'Node' ], from: '' }
    querystring.escape(str); 转义为URL可用的字符串
      e.g. :
      querystring.escape("哈哈>._.<");
      // '%E5%93%88%E5%93%88%3E._.%3C'
    querystring.unescape(str); 反转义
      e.g. :
      querystring.unescape('%E5%93%88%E5%93%88%3E._.%3C');
      // '哈哈>._.<'
    querystring.unescapeBuffer()
    querystring.encode()
    querystring.decode()
  util 提供常用函数的集合
    PS：用于弥补核心JavaScript 的功能 过于精简的不足
    util.inherits(handleConstructor,baseConstructor);  实现对象间原型继承
      PS：JavaScript 的面向对象特性是基于原型的,与常见的基于类的不同.
        JavaScript 没有 提供对象继承的语言级别特性,而是通过原型复制来实现的.
        handleConstructor构造函数只会继承baseConstructor构造函数原型中的属性方法.
      e.g.:
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
      PS：通常用于调试和错误输出.它至少接受一个参数 object,即要转换的对象
        util.inspect 并不会简单地直接把对象转换为字符串,
        即使该对象定义了toString方法也不会调用.
      Arguments:
        showHidden 可选,如果值为 true,将会输出更多隐藏信息
        depth   表示最大递归的层数,若对象很复杂,可指定层数以控制输出信息的多少,默认为2层.
          指定为 null 表示将不限递归层数完整遍历对象. 
          如果color 值为 true,输出格式将会以ANSI 颜色编码,通常用于在终端显示更漂亮 的效果.
      e.g.:
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
      e.g.:
        var util = require('util');
        util.isRegExp(/some regexp/) // true
        util.isRegExp(new RegExp('another regexp')) // true
        util.isRegExp({}) // false
    util.isDate(val);  返回表示参数是否为日期对象的布尔值
      e.g.:
        var util = require('util');
        util.isDate(new Date()) // true
        util.isDate(Date()) // false (without 'new' returns a String)
        util.isDate({}) // false
    util.isError(val); 返回表示参数是否为错误对象的布尔值
      e.g.:
        var util = require('util');
        util.isError(new Error()) // true
        util.isError(new TypeError()) // true
        util.isError({ name: 'Error', message: 'an error occurred' }) // false      
  os 模块提供了一些基本的系统操作函数
    PS：
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
    e.g.:
      创建 main.js 文件,代码如下所示：
        var os = require("os");
        console.log('endianness : ' + os.endianness());// CPU 的字节序
        console.log('type : ' + os.type()); // 操作系统名
        console.log('platform : ' + os.platform()); // 操作系统名
        console.log('total memory : ' + os.totalmem() + " bytes."); // 系统内存总量
        console.log('free memory : ' + os.freemem() + " bytes."); // 操作系统空闲内存量
      代码执行结果如下：
        endianness : LE
        type : Linux
        platform : linux
        total memory : 25103400960 bytes.
        free memory : 20676710400 bytes.
  path 模块提供了一些用于处理文件路径的小工具
    PS：
    var path = require("path"); 引入path模块
    path.normalize(p) 规范化路径,注意'..' 和 '.'.
    path.join([path1][, path2][, ...]) 用于连接路径
      该方法的主要用途在于,会正确使用当前系统的路径分隔符,Unix系统是 /,Windows系统是 \
    path.resolve([from ...], to) 将 to 参数解析为绝对路径.
    path.isAbsolute(path) 判断参数 path 是否是绝对路径.
    path.relative(from, to) 用于将相对路径转为绝对路径.
    path.dirname(p) 返回路径中代表文件夹的部分,同 Unix 的dirname 命令类似.
    path.basename(p[, ext]) 返回路径中的最后一部分.同 Unix 命令 bashname 类似.
    path.extname(p) 返回路径中文件的后缀名,即路径中最后一个'.'之后的部分.
      如果一个路径中并不包含'.'或该路径只包含一个'.' 且这个'.'为路径的第一个字符,则此命令返回空字符串.
    path.parse(pathString) 返回路径字符串的对象.
    path.format(pathObject) 从对象中返回路径字符串,和 path.parse 相反.    
    path.sep 平台的文件路径分隔符,'\\' 或 '/'
    path.delimiter 平台的分隔符, ; or ':'.
    path.posix 提供上述 path 的方法,不过总是以 posix 兼容的方式交互.
    path.win32 提供上述 path 的方法,不过总是以 win32 兼容的方式交互.    
    e.g.:
      创建 main.js 文件,代码如下所示：
        var path = require("path");
        // 格式化路径
        console.log('normalization:'+path.normalize('/test/test1//2slashes/1slash/tab/..'));
        // 连接路径
        console.log('joint path:'+path.join('/test','test1','2slashes/1slash','tab','..'));
        // 转换为绝对路径
        console.log('resolve:'+path.resolve('main.js'));
        // 路径中文件的后缀名
        console.log('ext name:'+path.extname('main.js'));
      代码执行结果如下：
        normalization : /test/test1/2slashes/1slash
        joint path : /test/test1/2slashes/1slash
        resolve : /web/com/1427176256_27423/main.js
        ext name : .js    
  net  模块提供了一些用于底层的网络通信的小工具,包含了创建服务器/客户端的方法
    创建客户端
      const net = require("net");     // 引入 net模块
      const host = '59.111.160.197';  // 指定host,只能填写 ip,而不能为网址
      const port = 80;                // 指定 端口
      const client = new net.Socket();   // 创建客户端
      client.connect(port, host, () => { // 建立连接,完成后执行操作
        const request = 'GET / HTTP/1.1\r\nHost: music.163.com\r\n\r\n';
        client.write(request); // 向服务器发送一个消息
        
        // 如果 server destroy 之后, 再调用下面的代码会报错
        // setInterval(() => {
        //   client.write('hello in interval')
        // }, 100)
      } );
      client.on('data', (dat) => {   // 接收服务器的响应数据,触发 data 事件
        // 参数 dat 默认情况下是 buffer 类型
        // 可用 dat.toString() 将 buffer 转成字符串
        console.log('dat:', dat.toString());
        client.destroy(); // 关闭 client 连接
      } );        
      client.on('close', function() { }) // 连接关闭时触发 close 事件
    创建服务端
      const net = require('net');
      const host = ''; // 字符串,表示接受任意 ip 地址的连接
      const port = 2000; // 1024-65535之间, 1024以下端口需管理员权限才能使用
      const server = new net.Server(); // 创建服务器
      server.listen(port, host, () => { // 在指定端口监听指定客户端请求
        // server.address(); 返回绑定的服务器的 ip 地址、ip 协议、端口号
        console.log('listening.', server.address()); // 以 ipv6 格式显示
      })
      server.on('connection', (socket) => { // 有连接建立时,触发 connection 事件
        // socket.io 是对 websocket 的封装
        // socket的一些属性表示连接的客户端的信息
        const address = socket.remoteAddress;
        const port = socket.remotePort; // remotePort 是操作系统分配给客户端的
        const family = socket.remoteFamily;
        console.log('connected client info', address, port, family)
        socket.on('data', (dat) => { // 当 socket 接收到数据时,触发 data 事件
          // dat 是一个 Buffer 类型
          // Buffer 是 node 中的特殊类型, 用来处理二进制数据
          const r = dat.toString(); // 调用 toString() 将二进制数据转成字符串
          console.log('接受到的原始数据', r, typeof(r));
          
          const response = 'HTTP/1.1 200 OK\r\nContent-Length: 12\r\n\r\nHello world!';
          // Content-Length,可选,告诉浏览器响应数据量,避免一直等待
          // 参数可以是 string 类型, 也可以是 buffer 类型
          socket.write(response);  // 发送数据
          socket.destroy(); // 用于结束本次服务器的响应
          // 若不结束,浏览器会一直等待,也就是会一直 loading
        })
      })
      server.on('error', (error) => {       // 服务器出错时触发事件
        console.log('server error', error)
      })
      server.on('close', () => {            // 服务器关闭时触发
        console.log('server closed')
      })
  dns  模块用于解析域名
    PS：
    var dns = require("dns"); 引入dns模块
  domain,域 简化异步代码的异常处理,可以捕捉处理try catch无法捕捉的异常
    PS：
      domain模块,把处理多个不同的IO的操作作为一个组.
      注册事件和回调到domain,当发生一个错误事件或抛出一个错误时,
      domain对象会被通知,不会丢失上下文环境,也不导致程序错误立即推出,
      与process.on('uncaughtException')不同.
      Domain 模块可分为隐式绑定和显式绑定：
        隐式绑定: 把在domain上下文中定义的变量,自动绑定到domain对象
        显式绑定: 把不是在domain上下文中定义的变量,以代码的方式绑定到domain对象
    var domain = require("domain"); 引入domain模块
  本地模块
  ◆第三方模块
  cheerio html文件源码操作模块
    PS：像使用jquery一样方便快捷地操作抓取到的源码
    var cheerio =require("cheerio"); 引入cheerio模块
    var $ =cheerio.load(data); 将传入的数据生成DOM,并返回选择器API用于获取DOM元素
      $(selector)  获取selector对应的元素组成的类数组对象
        $($(selector)[0]).html();  获取第一个元素的HTML字符
        $($(selector)[0]).text();  获取第一个元素的文本
          当同时存在多个元素该方法会将多个文本合并返回
        $($(selector)[0]).attr(属性名);  获取第一个元素指定属性的值
        $($(selector)[0]).find(selector);  获取第一个元素中对应selector的子元素
      e.g.:
      var $ =cheerio.load(data);
      var a =$('a'); // 获取所有的a元素对象,操作类似与jQuery
  request 请求模块
    var request =require('request'); 引入request模块
    request(url,function(err,response,data){ }); 向URL发送请求
      回调函数传入err response data三个参数
        err      当报错时err参数被填充,默认为null
        response 请求
          response.statusCode   http响应状态码,如200为成功
        data     响应的数据
路由 
  PS：我们要为路由提供请求的URL和其他需要的GET及POST参数,
    随后路由需要根据这些数据来执行相应的代码.
    因此,我们需要查看HTTP请求,从中提取出请求的URL以及GET/POST参数.
    这一功能应当属于路由还是服务器(甚至作为一个模块自身的功能)确实值得探讨,
    但这里暂定其为我们的HTTP服务器的功能.
    我们需要的所有数据都会包含在request对象中,该对象作为回调函数的第一个参数传递.
    但是为了解析这些数据,我们需要额外的 NodeJS 模块,它们分别是url和querystring模块.
    当然我们也可以用querystring模块来解析POST请求体中的参数.
  找出浏览器请求的URL路径：
    var http = require("http");
    var url = require("url");
    function start() {
      function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
      }
      http.createServer(onRequest).listen(8888);
      console.log("Server has started.");
    }
    exports.start = start;
    好了,我们的应用现在可以通过请求的URL路径来区别不同请求了,
    这使我们得以使用路由(还未完成)来将请求以URL路径为基准映射到处理程序上.
    在我们所要构建的应用中,这意味着来自/start和/upload的请求可以使用不同的代码来处理.
    稍后我们将看到这些内容是如何整合到一起的.
  现在我们可以来编写路由了,建立一个名为 router.js 的文件,添加以下内容：
    function route(pathname) {
      console.log("About to route a request for " + pathname);
    }
    exports.route = route;
    如你所见,这段代码什么也没干,不过对于现在来说这是应该的.
    在添加更多的逻辑以前,我们先来看看如何把路由和服务器整合起来.
  我们的服务器应当知道路由的存在并加以有效利用.
  我们当然可以通过硬编码的方式将这一依赖项绑定到服务器上,
  但是其它语言的编程经验告诉我们这会是一件非常痛苦的事,
  因此我们将使用依赖注入的方式较松散地添加路由模块.
  首先,我们来扩展一下服务器的start()函数,以便将路由函数作为参数传递过去,
    server.js 文件代码如下
    var http = require("http");
    var url = require("url");
    function start(route) {
      function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(pathname);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
      }
      http.createServer(onRequest).listen(8888);
      console.log("Server has started.");
    }
    exports.start = start;
  同时,我们会相应扩展index.js,使得路由函数可以被注入到服务器中：
    var server = require("./server");
    var router = require("./router");
    server.start(router.route);
    在这里,我们传递的函数依旧什么也没做.
  如果现在启动应用(node index.js,始终记得这个命令行),随后请求一个URL,
    你将会看到应用输出相应的信息,这表明我们的HTTP服务器已经在使用路由模块了,
    并会将请求的路径传递给路由：
  $ node index.js
    Server has started.
  以上输出已经去掉了比较烦人的/favicon.ico请求相关的部分.
  浏览器访问 http://127.0.0.1:8888/,输出结果如下：
全局对象 
  PS：JavaScript 中有一个特殊的对象,称为全局对象(Global Object),
    它及其所有属性都可以在程序的任何地方访问,即全局变量.
    在浏览器 JavaScript 中,通常 window 是全局对象, 而 Node.js 中的全局对象是 global,
    所有全局变量(除了 global 本身以外)都是 global 对象的属性.
    在 Node.js 我们可以直接访问到 global 的属性,而不需要在应用中包含它.
  全局对象与全局变量
    global 最根本的作用是作为全局变量的宿主.
    按照 ECMAScript 的定义,满足以下条 件的变量是全局变量：
      在最外层定义的变量；
      全局对象的属性；
      隐式定义的变量(未定义直接赋值的变量).
      当你定义一个全局变量时,这个变量同时也会成为全局对象的属性,反之亦然.
      需要注 意的是,在 Node.js 中你不可能在最外层定义变量,因为所有用户代码都是属于当前模块的, 
      而模块本身不是最外层上下文.
      注意： 永远使用 var 定义变量以避免引入全局变量,
      因为全局变量会污染 命名空间,提高代码的耦合风险.
  __filename 表示当前正在执行的脚本的文件名
    PS： 它将输出文件所在位置的绝对路径,且和命令行参数所指定的文件名不一定相同. 
      如果在模块中,返回的值是模块文件的路径.
    e.g.:
      创建文件 main.js ,代码如下所示：
      // 输出全局变量 __filename 的值
      console.log( __filename );
      执行 main.js 文件,代码如下所示:
      $ node main.js
      /web/com/runoob/nodejs/main.js
  __dirname 表示当前执行脚本所在的目录
    e.g.:
      创建文件 main.js ,代码如下所示：
      // 输出全局变量 __dirname 的值
      console.log( __dirname );
      执行 main.js 文件,代码如下所示:
      $ node main.js
      /web/com/runoob/nodejs
  setTimeout(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)
    返回一个代表定时器的句柄值.
    e.g.:
      创建文件 main.js ,代码如下所示：
      function printHello(){ console.log( "Hello, World!"); }
      // 两秒后执行以上函数
      setTimeout(printHello, 2000);
      执行 main.js 文件,代码如下所示:
      $ node main.js
      Hello, World!
  clearTimeout(t)     全局函数用于停止一个之前通过 setTimeout() 创建的定时器
    参数 t 是通过 setTimeout() 函数创建的定时器
    e.g.:
      创建文件 main.js ,代码如下所示：
      function printHello(){ console.log( "Hello, World!"); }
      // 两秒后执行以上函数
      var t = setTimeout(printHello, 2000);
      // 清除定时器
      clearTimeout(t);
      执行 main.js 文件,代码如下所示:
      $ node main.js
  setInterval(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)
    返回一个代表定时器的句柄值.可以使用 clearInterval(t) 函数来清除定时器.
    setInterval() 方法会不停地调用函数,直到 clearInterval() 被调用或窗口被关闭.
  console 用于提供控制台标准输出
    PS：它是由 Internet Explorer 的 JScript 引擎提供的调试工具,后来逐渐成为浏览器的事实标准.
      Node.js 沿用了这个标准,提供与习惯行为一致的 console 对象,
      用于向标准输出流(stdout)或标准错误流(stderr)输出字符.
    console.log([data][, ...]) 向标准输出流打印字符并以换行符结束
      该方法接收若干 个参数,如果只有一个参数,则输出这个参数的字符串形式.
      如果有多个参数,则 以类似于C 语言 printf() 命令的格式输出.
    console.info([data][, ...]) 该命令的作用是返回信息性消息
      这个命令与 console.log 差别并不大,
      除了在chrome中只会输出文字外,其余的会显示一个蓝色的惊叹号.
    console.error([data][, ...]) 输出错误消息的
      控制台在出现错误时会显示是红色的叉子.
    console.warn([data][, ...]) 输出警告消息
      控制台出现有黄色的惊叹号.
    console.dir(obj[, options]) 用来对一个对象进行检查(inspect),并以易于阅读和打印的格式显示.
    console.time(label) 输出时间,表示计时开始.
    console.timeEnd(label) 结束时间,表示计时结束.
    console.trace(message[, ...]) 当前执行的代码在堆栈中的调用路径
      这个测试函数运行很有帮助,只要给想测试的函数里面加入 console.trace 就行了.
    console.assert(value[, message][, ...]) 用于判断某个表达式或变量是否为真,
      接收两个参数,第一个参数是表达式,第二个参数是字符串.
      只有当第一个参数为false,才会输出第二个参数,否则不会有任何结果.
  process global对象的属性对象,用于描述当前 Nodejs 进程状态
    PS：提供了一个与操作系统的简单接口
    ◆事件
    exit   当进程准备退出时触发.
    beforeExit 当 node 清空事件循环,并且没有其他安排时触发这个事件.
      通常来说,当没有进程安排时 node 退出,
      但是 'beforeExit' 的监听器可以异步调用,这样 node 就会继续执行.
    uncaughtException 当一个异常冒泡回到事件循环,触发这个事件.
      如果给异常添加了监视器,默认的操作(打印堆栈跟踪信息并退出)就不会发生.
    Signal 当进程接收到信号时就触发.
      信号列表详见标准的 POSIX 信号名,如 SIGINT、SIGUSR1 等.
    e.g.:
      创建文件 main.js ,代码如下所示：
      process.on('exit', function(code) {
        // 以下代码永远不会执行
        setTimeout(function() { console.log("该代码不会执行"); }, 0);
        console.log('退出码为:', code);
      });
      console.log("程序执行结束");
      执行 main.js 文件,代码如下所示:
      $ node main.js
      程序执行结束
      退出码为: 0
    ◆退出状态码
      状态码	名称 & 描述
      1	Uncaught Fatal Exception
      有未捕获异常,并且没有被域或 uncaughtException 处理函数处理.
      2	Unused
      保留
      3	Internal JavaScript Parse Error
      JavaScript的源码启动 Node 进程时引起解析错误.非常罕见,仅会在开发 Node 时才会有.
      4	Internal JavaScript Evaluation Failure
      JavaScript 的源码启动 Node 进程,评估时返回函数失败.非常罕见,仅会在开发 Node 时才会有.
      5	Fatal Error
      V8 里致命的不可恢复的错误.通常会打印到 stderr ,内容为： FATAL ERROR
      6	Non-function Internal Exception Handler
      未捕获异常,内部异常处理函数不知为何设置为on-function,并且不能被调用.
      7	Internal Exception Handler Run-Time Failure
      未捕获的异常, 并且异常处理函数处理时自己抛出了异常.例如,如果 process.on('uncaughtException') 或 domain.on('error') 抛出了异常.
      8	Unused
      保留
      9	Invalid Argument
      可能是给了未知的参数,或者给的参数没有值.
      10	Internal JavaScript Run-Time Failure
      JavaScript的源码启动 Node 进程时抛出错误,非常罕见,仅会在开发 Node 时才会有.
      12	Invalid Debug Argument 
      设置了参数--debug 和/或 --debug-brk,但是选择了错误端口.
      >128	Signal Exits
      如果 Node 接收到致命信号,比如SIGKILL 或 SIGHUP,那么退出代码就是128 加信号代码.这是标准的 Unix 做法,退出信号代码放在高位.
    ◆属性
    stdout      标准输出流.
    stderr      标准错误流.
    stdin       标准输入流.
    argv        属性返回一个数组,由命令行执行脚本时的各个参数组成.
      它的第一个成员总是node,第二个成员是脚本文件名,其余成员是脚本文件的参数.
    execPath    返回执行当前脚本的 Node 二进制文件的绝对路径.
    execArgv    返回一个数组,成员是命令行下执行脚本时,在Node可执行文件与脚本文件之间的命令行参数.
    env         返回一个对象,成员为当前 shell 的环境变量
    exitCode    进程退出时的代码,如果进程优通过 process.exit() 退出,不需要指定退出码.
    version     Node 的版本,比如v0.10.18.
    versions    一个属性,包含了 node 的版本和依赖.
    config      一个包含用来编译当前 node 执行文件的 javascript 配置选项的对象.
      它与运行 ./configure 脚本生成的 "config.gypi" 文件相同.
    pid         当前进程的进程号.
    title       进程名,默认值为"node",可以自定义该值.
    arch        当前 CPU 的架构：'arm'、'ia32' 或者 'x64'.
    platform    运行程序所在的平台系统 'darwin', 'freebsd', 'linux', 'sunos' 或 'win32'
    mainModule  require.main 的备选方法.
      不同点,如果主模块在运行时改变,require.main可能会继续返回老的模块.
      可以认为,这两者引用了同一个模块.
    e.g.:
      创建文件 main.js ,代码如下所示：
      process.stdout.write("Hello World!" + "\n"); // 输出到终端
      process.argv.forEach(function(val, index, array) { // 通过参数读取
       console.log(index + ': ' + val);
      });
      console.log(process.execPath); // 获取执行路局
      console.log(process.platform); // 平台信息
      执行 main.js 文件,代码如下所示:
      $ node main.js
      Hello World!
      0: node
      1: /web/www/node/main.js
      /usr/local/node/0.10.36/bin/node
      darwin
    ◆方法
    abort()   这将导致 node 触发 abort 事件.会让 node 退出并生成一个核心文件.
    chdir(directory)   改变当前工作进程的目录,如果操作失败抛出异常.
    cwd()   返回当前进程的工作目录
    exit([code])   使用指定的 code 结束进程.如果忽略,将会使用 code 0.
    getgid()   获取进程的群组标识(参见 getgid(2)).获取到得时群组的数字 id,而不是名字.
      注意：这个函数仅在 POSIX 平台上可用(例如,非Windows 和 Android).
    setgid(id) 设置进程的群组标识(参见 setgid(2)).
      可以接收数字 ID 或者群组名.如果指定了群组名,会阻塞等待解析为数字 ID .
      注意：这个函数仅在 POSIX 平台上可用(例如,非Windows 和 Android).
    getuid() 获取进程的用户标识(参见 getuid(2)).这是数字的用户 id,不是用户名.
      注意：这个函数仅在 POSIX 平台上可用(例如,非Windows 和 Android).
    setuid(id) 设置进程的用户标识(参见setuid(2)).
      接收数字 ID或字符串名字.果指定了群组名,会阻塞等待解析为数字 ID .
      注意：这个函数仅在 POSIX 平台上可用(例如,非Windows 和 Android).
    getgroups() 返回进程的群组 iD 数组.POSIX 系统没有保证一定有,但是 node.js 保证有.
      注意：这个函数仅在 POSIX 平台上可用(例如,非Windows 和 Android).
    setgroups(groups) 设置进程的群组 ID.这是授权操作,所有你需要有 root 权限,或者有 CAP_SETGID 能力.
      注意：这个函数仅在 POSIX 平台上可用(例如,非Windows 和 Android).
    initgroups(user,extra_group) 读取/etc/group,并初始化群组访问列表,使用成员所在的所有群组
      这是授权操作,所有你需要有 root 权限,或者有 CAP_SETGID 能力.
      注意：这个函数仅在 POSIX 平台上可用(例如,非Windows 和 Android).
    kill(pid[, signal]) 发送信号给进程. pid 是进程id,并且 signal 是发送的信号的字符串描述
      信号名是字符串,比如 'SIGINT' 或 'SIGHUP'.如果忽略,信号会是 'SIGTERM'.
    memoryUsage() 返回一个对象,描述了 Node 进程所用的内存状况,单位为字节.
    nextTick(callback) 一旦当前事件循环结束,调用回到函数.
    umask([mask]) 设置或读取进程文件的掩码.
      子进程从父进程继承掩码.如果mask 参数有效,返回旧的掩码.否则,返回当前掩码.
    uptime() 返回 Node 已经运行的秒数.
    hrtime() 返回当前进程的高分辨时间,形式为 [seconds, nanoseconds]数组.
      它是相对于过去的任意事件.该值与日期无关,因此不受时钟漂移的影响.
      主要用途是可以通过精确的时间间隔,来衡量程序的性能.
      你可以将之前的结果传递给当前的 process.hrtime() ,会返回两者间的时间差,用来基准和测量时间间隔.
    e.g.:
      创建文件 main.js ,代码如下所示：
      console.log('当前目录: ' + process.cwd()); // 输出当前目录
      console.log('当前版本: ' + process.version); // 输出当前版本
      console.log(process.memoryUsage()); // 输出内存使用情况
      执行 main.js 文件,代码如下所示:
      $ node main.js
      当前目录: /web/com/runoob/nodejs
      当前版本: v0.10.36
      { rss: 12541952, heapTotal: 4083456, heapUsed: 2157056 }    
--------------------------------------------------------------------------------
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
express 后端开发框架 
  PS： Express 是一个简洁而灵活的 node.js Web应用框架
    提供了一系列强大特性帮助你创建各种 Web 应用,和丰富的 HTTP 工具 
    使用 Express 可以快速地搭建一个完整功能的网站.
  Express 框架核心特性：
    可以设置中间件来响应 HTTP 请求 
    定义了路由表用于执行不同的 HTTP 请求动作 
    可以通过向模板传递参数来动态渲染 HTML 页面         
  安装 express 
    $ npm install express --save 
    // (表示在命令提示符中输入 npm install express --save 代码)
    以上命令会将 Express 框架安装在当期目录的 node_modules 目录中
    node_modules 目录下会自动创建 express 目录 
    以下几个重要的模块是需要与 express 框架一起安装的(对于前端一般不需要)：
      body-parser - node.js 中间件,用于处理 JSON, Raw, Text 和 URL 编码的数据 
      cookie-parser - 这就是一个解析Cookie的工具 通过req.cookies可以取到传过来的cookie,并把它们转成对象 
      multer - node.js 中间件,用于处理 enctype="multipart/form-data"(设置表单的MIME编码)的表单数据 
      安装命令代码
        $ npm install body-parser --save
        $ npm install cookie-parser --save
        $ npm install multer --save      
  var express =require('express'); 引入
  var app =express();  实例化
  app.get(path,function(req,res){}); 处理get请求
    req
      request 对象表示 HTTP 请求,包含了请求查询字符串,参数,内容,HTTP 头部等属性 常见属性有：
      req.app：当callback为外部文件时,用req.app访问express的实例
      req.baseUrl：获取路由当前安装的URL路径
      req.body / req.cookies：获得「请求主体」/ Cookies
      req.fresh / req.stale：判断请求是否还「新鲜」
      req.hostname / req.ip：获取主机名和IP地址
      req.originalUrl：获取原始请求URL
      req.params：获取路由的parameters
      req.path：获取请求路径
      req.protocol：获取协议类型
      req.query：获取URL的查询参数串
      req.route：获取当前匹配的路由
      req.subdomains：获取子域名
      req.accpets()：检查请求的Accept头的请求类型
      req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages
      req.get()：获取指定的HTTP请求头
      req.is()：判断请求头Content-Type的MIME类型
    res
      response 对象表示 HTTP 响应,即在接收到请求时向客户端发送的 HTTP 响应数据 常见属性有：
      res.app：同req.app一样
      res.append()：追加指定HTTP头
      res.set()在res.append()后将重置之前设置的头
      res.cookie(name,value [,option])：设置Cookie
      opition: domain / expires / httpOnly / maxAge / path / secure / signed
      res.clearCookie()：清除Cookie
      res.download()：传送指定路径的文件
      res.get()：返回指定的HTTP头
      res.json()：传送JSON响应
      res.jsonp()：传送JSONP响应
      res.location()：只设置响应的Location HTTP头,不设置状态码或者close response
      res.redirect()：设置响应的Location HTTP头,并且设置状态码302
      res.send()：传送HTTP响应
      res.sendFile(path [,options] [,fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type
      res.set()：设置HTTP头,传入object可以一次设置多个头
      res.status()：设置HTTP状态码
      res.type()：设置Content-Type的MIME类型        
  app.post(path,function(req,res){}); 处理post请求
  var server =app.listen(端口,callback); 监听端口
  e.g.  
    使用 Express 框架来输出 "Hello World"
      var express = require('express'); // 引入 express 模块
      var app =express(); // 创建一个express实例 赋值给 app
      // 用 get 定义一个给用户访问的网址
      app.get('/',function(req,res){ res.send("hello world") })
      // 定义监听
      var server =app.listen(8081,function(){
        var host =server.address().address
        var port =server.address().port
        console.log("应用实例,访问地址为 http://%s:%s",host,port)
      })
    执行以上代码： node express_demo.js 
    在浏览器中访问 'http://127.0.0.1:8081'
    结果：在浏览器中显示: "Hello World"
  路由 路由决定了由谁(指定脚本)去响应客户端请求 
    在HTTP请求中,我们可以通过路由提取出请求的URL以及GET/POST参数
    e.g.  
      扩展 Hello World,添加一些功能来处理更多类型的 HTTP 请求
      创建 express_demo2.js 文件,代码如下所示：
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
      执行以上代码：  node express_demo2.js 
      访问地址
        访问 'http://127.0.0.1:8081 不同的地址,查看效果 '
        访问 'http://127.0.0.1:8081/list_user'
          浏览器显示为:正则匹配
        访问 'http://127.0.0.1:8081/abcd,'
          浏览器显示为:用户列表页
        访问 'http://127.0.0.1:8081/abcdefg'
          浏览器显示为: cannot get /abcdefg  无法解析该地址
  静态文件
    Express 提供了内置的中间件 express.static 来设置静态文件如：图片, CSS, JavaScript 等 
    你可以使用 express.static 中间件来设置静态文件路径
    将图片, CSS, JavaScript 文件放在 public 目录下,你可以这么写：
      app.use(express.static('public'));
    e.g. 
      我们可以到 public/images 目录下放些图片,如下所示：
        node_modules
        server.js
        public/
        public/images
        public/images/logo.png
      让我们再修改下 "Hello Word" 应用添加处理静态文件的功能 
        创建 express_demo3.js 文件,代码如下所示：
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
      执行以上代码：
        $ node express_demo3.js 
        应用实例,访问地址为 http://0.0.0.0:8081
      在浏览器中访问 http://127.0.0.1:8081/images/logo.png
      (本实例采用了菜鸟教程的logo),结果如下图所示：
  GET 方法
    e.g. 
      在表单中通过 GET 方法提交两个参数,
      使用 server.js 文件内的 process_get 路由器来处理输入
      index.htm 文件代码如下：
        <html>
          <body>
            <form action="http://127.0.0.1:8081/process_get" method="GET">
              First Name: <input type="text" name="first_name">
              <br>
              Last Name: <input type="text" name="last_name">
              <input type="submit" value="Submit">
            </form>
          </body>
        </html>
      server.js 文件代码如下:
        var express = require('express');
        var app = express();
        
        app.use(express.static('public'));
        
        app.get('/index.htm', function (req, res) {
           res.sendFile( __dirname + "/" + "index.htm" );
        })
        
        app.get('/process_get', function (req, res) {
           // 输出 JSON 格式
           response = {
               first_name:req.query.first_name,
               last_name:req.query.last_name
           };
           console.log(response);
           res.end(JSON.stringify(response));
        })
        
        var server = app.listen(8081, function () {
          var host = server.address().address
          var port = server.address().port
          console.log("应用实例,访问地址为 http://%s:%s", host, port)
        })
      执行以上代码：
        node server.js 
      浏览器访问 http://127.0.0.1:8081/index.htm
        向表单输入数据,并提交,返回输入的字符组成的对象.
  POST 方法
    e.g. 
      在表单中通过 POST 方法提交两个参数
      使用 server.js 文件内的 process_post 路由器来处理输入：
      index.htm 文件代码修改如下：
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
      执行以上代码：
        $ node server.js
      浏览器访问 http://127.0.0.1:8081/index.htm,
  文件上传
  e.g. 
    创建一个用于上传文件的表单,使用 POST 方法,
    表单 enctype 属性设置为 multipart/form-data 
    index.htm 文件代码修改如下：
      <html>
        <head>
          <title>文件上传表单</title>
        </head>
        <body>
          <h3>文件上传：</h3>
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
    执行以上代码：
      $ node server.js 
    浏览器访问 http://127.0.0.1:8081/index.htm
  Cookie 管理
    我们可以使用中间件向 Node.js 服务器发送 cookie 信息,以下代码输出了客户端发送的 cookie 信息：
    // express_cookie.js 文件
    var express      = require('express')
    var cookieParser = require('cookie-parser')
    
    var app = express()
    app.use(cookieParser())
    
    app.get('/', function(req, res) {
      console.log("Cookies: ", req.cookies)
    })
    
    app.listen(8081)
    执行以上代码：
    $ node express_cookie.js 
    现在你可以访问 http://127.0.0.1:8081 并查看终端信息的输出
--------------------------------------------------------------------------------
RESTful API 
  PS： REST即表述性状态传递(英文：Representational State Transfer,简称REST),
    是Roy Fielding博士在2000年他的博士论文中提出来的一种软件架构风格.
    表述性状态转移是一组架构约束条件和原则.满足这些约束条件和原则的应用程序或设计就是RESTful.
    需要注意的是,REST是设计风格而不是标准.
    REST通常基于使用HTTP,URI,和XML以及HTML这些现有的广泛流行的协议和标准.
    REST 通常使用 JSON 数据格式.
  REST 基本架构的四个方法：
    GET - 用于获取数据.
    PUT - 用于添加数据.
    DELETE - 用于删除数据.
    POST - 用于更新或添加数据.
  RESTful Web Services
    Web service是一个平台独立的,低耦合的,自包含的、基于可编程的web的应用程序,
    可使用开放的XML标准来描述、发布、发现、协调和配置这些应用程序,用于开发分布式的互操作的应用程序.
    基于 REST 架构的 Web Services 即是 RESTful.
    由于轻量级以及通过 HTTP 直接传输数据的特性,Web 服务的 RESTful 方法已经成为最常见的替代方法.
    可以使用各种语言(比如 Java 程序、Perl、Ruby、Python、PHP 和 Javascript[包括 Ajax])实现客户端.
    RESTful Web 服务通常可以通过自动客户端或代表用户的应用程序访问.
    但是,这种服务的简便性让用户能够与之直接交互,
    使用它们的 Web 浏览器构建一个 GET URL 并读取返回的内容.
  e.g.:
    创建 RESTful
    首先,创建一个 json 数据资源文件 users.json,内容如下：
      {
        "user1" : {
          "name" : "mahesh",
          "password" : "password1",
          "profession" : "teacher",
          "id": 1
        },
        "user2" : {
          "name" : "suresh",
          "password" : "password2",
          "profession" : "librarian",
          "id": 2
        },
        "user3" : {
          "name" : "ramesh",
          "password" : "password3",
          "profession" : "clerk",
          "id": 3
        }
      }
    基于以上数据,我们创建以下 RESTful API：
      序号	URI	HTTP 方法	发送内容	结果
      1	listUsers	GET	空	显示所有用户列表
      2	addUser	POST	JSON 字符串	添加新用户
      3	deleteUser	DELETE	JSON 字符串	删除用户
      4	:id	GET	空	显示用户详细信息
    获取用户列表：
      以下代码,我们创建了 RESTful API listUsers,
      用于读取用户的信息列表, server.js 文件代码如下所示：
      var express = require('express');
      var app = express();
      var fs = require("fs");
      app.get('/listUsers', function (req, res) {
        fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
          console.log( data );
          res.end( data );
        });
      })
      var server = app.listen(8081, function () {
        var host = server.address().address
        var port = server.address().port
        console.log("应用实例,访问地址为 http://%s:%s", host, port)
      })
      接下来执行以下命令：
      应用实例,访问地址为 http://0.0.0.0:8081
      在浏览器中访问 'http://127.0.0.1:8081/listUsers',结果如下所示：
        {
          "user1" : {
            "name" : "mahesh",
            "password" : "password1",
            "profession" : "teacher",
            "id": 1
          },
          "user2" : {
            "name" : "suresh",
            "password" : "password2",
            "profession" : "librarian",
            "id": 2
          },
          "user3" : {
            "name" : "ramesh",
            "password" : "password3",
            "profession" : "clerk",
            "id": 3
          }
        }
    添加用户
      以下代码,我们创建了 RESTful API addUser,
        用于添加新的用户数据,server.js 文件代码如下所示：
        var express = require('express');
        var app = express();
        var fs = require("fs");
        //添加的新用户数据
        var user = {
          "user4" : {
            "name" : "mohit",
            "password" : "password4",
            "profession" : "teacher",
            "id": 4
          }
        }
        app.get('/addUser', function (req, res) {
          // 读取已存在的数据
          fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
            data = JSON.parse( data );
            data["user4"] = user["user4"];
            console.log( data );
            res.end( JSON.stringify(data));
          });
        })
        var server = app.listen(8081, function () {
          var host = server.address().address
          var port = server.address().port
          console.log("应用实例,访问地址为 http://%s:%s", host, port)
        })
      接下来执行以下命令：
      应用实例,访问地址为 'http://0.0.0.0:8081'
      在浏览器中访问 http://127.0.0.1:8081/addUser,结果如下所示：
        { user1:
          { name: 'mahesh',
          password: 'password1',
          profession: 'teacher',
          id: 1 },
          user2:
          { name: 'suresh',
          password: 'password2',
          profession: 'librarian',
          id: 2 },
          user3:
          { name: 'ramesh',
          password: 'password3',
          profession: 'clerk',
          id: 3 },
          user4:
          { name: 'mohit',
          password: 'password4',
          profession: 'teacher',
          id: 4 } 
        }
    显示用户详情
      以下代码,我们创建了 RESTful API :id(用户id), 用于读取指定用户的详细信息,server.js 文件代码如下所示：
      var express = require('express');
      var app = express();
      var fs = require("fs");
      
      app.get('/:id', function (req, res) {
        // 首先我们读取已存在的用户
        fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
          data = JSON.parse( data );
          var user = data["user" + req.params.id] 
          console.log( user );
          res.end( JSON.stringify(user));
        });
      })
      
      var server = app.listen(8081, function () {
        
        var host = server.address().address
        var port = server.address().port
        console.log("应用实例,访问地址为 http://%s:%s", host, port)
        
      })
      接下来执行以下命令：
      $ node server.js 
      应用实例,访问地址为 http://0.0.0.0:8081
      在浏览器中访问 http://127.0.0.1:8081/2,结果如下所示：
      {
        "name":"suresh",
        "password":"password2",
        "profession":"librarian",
        "id":2
      }
    删除用户
      以下代码,我们创建了 RESTful API deleteUser, 用于删除指定用户的详细信息,
      以下实例中,用户 id 为 2,server.js 文件代码如下所示：
      var express = require('express');
      var app = express();
      var fs = require("fs");
      
      var id = 2;
      
      app.get('/deleteUser', function (req, res) {
        
        // First read existing users.
        fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
          data = JSON.parse( data );
          delete data["user" + 2];
          
          console.log( data );
          res.end( JSON.stringify(data));
        });
      })
      
      var server = app.listen(8081, function () {
        
        var host = server.address().address
        var port = server.address().port
        console.log("应用实例,访问地址为 http://%s:%s", host, port)
        
      })
      接下来执行以下命令：
      $ node server.js 
      应用实例,访问地址为 http://0.0.0.0:8081
      在浏览器中访问 http://127.0.0.1:8081/deleteUser,结果如下所示：
      { user1:
        { name: 'mahesh',
        password: 'password1',
        profession: 'teacher',
        id: 1 },
        user3:
        { name: 'ramesh',
        password: 'password3',
        profession: 'clerk',
        id: 3 } 
      }  
多进程 
  PS：Node.js 是以单线程的模式运行的,但它使用的是事件驱动来处理并发,
    这样有助于我们在多核 cpu 的系统上创建多个子进程,从而提高性能.
    每个子进程总是带有三个流对象：child.stdin, child.stdout 和child.stderr.
    他们可能会共享父进程的 stdio 流,或者也可以是独立的被导流的流对象.
  Node 提供了 child_process 模块来创建子进程,方法有：
  child_process.exec(command[,options],callback); 使用子进程执行命令,缓存子进程的输出,并将子进程的输出以回调函数参数的形式返回.
    Arguments:
      command： 字符串, 将要运行的命令,参数使用空格隔开
      options ：对象,可以是：
      cwd ,字符串,子进程的当前工作目录
      env,对象 环境变量键值对
      encoding ,字符串,字符编码(默认： 'utf8')
      shell ,字符串,将要执行命令的 Shell(默认: 在 UNIX 中为/bin/sh, 在 Windows 中为cmd.exe, Shell 应当能识别 -c开关在 UNIX 中,或 /s /c 在 Windows 中. 在Windows 中,命令行解析应当能兼容cmd.exe)
      timeout,数字,超时时间(默认： 0)
      maxBuffer,数字, 在 stdout 或 stderr 中允许存在的最大缓冲(二进制),如果超出那么子进程将会被杀死 (默认: 200*1024)
      killSignal ,字符串,结束信号(默认：'SIGTERM')
      uid,数字,设置用户进程的 ID
      gid,数字,设置进程组的 ID
      callback ：回调函数,包含三个参数error, stdout 和 stderr.
      exec() 方法返回最大的缓冲区,并等待进程结束,一次性返回缓冲区的内容.
    e.g.:
      让我们创建两个 js 文件 support.js 和 master.js.
      support.js 文件代码：
      console.log("进程 " + process.argv[2] + " 执行." );
      master.js 文件代码：
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
      执行以上代码,输出结果为：
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
      command： 将要运行的命令
      args： Array 字符串参数数组
      options Object
      cwd String 子进程的当前工作目录
      env Object 环境变量键值对
      stdio Array|String 子进程的 stdio 配置
      detached Boolean 这个子进程将会变成进程组的领导
      uid Number 设置用户进程的 ID
      gid Number 设置进程组的 ID
      spawn() 方法返回流 (stdout & stderr),在进程返回大量数据时使用.进程一旦开始执行时 spawn() 就开始接收响应.    
    e.g.:
      让我们创建两个 js 文件 support.js 和 master.js.
      support.js 文件代码：
      console.log("进程 " + process.argv[2] + " 执行." );
      master.js 文件代码：
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
      执行以上代码,输出结果为：
      $ node master.js stdout: 进程 0 执行.
      子进程已退出,退出码 0
      stdout: 进程 1 执行.
      子进程已退出,退出码 0
      stdout: 进程 2 执行.
      子进程已退出,退出码 0    
  child_process.fork 是 spawn()的特殊形式,用于在子进程中运行的模块,用于创建进程
    PS：如 fork('./son.js') 相当于 spawn('node', ['./son.js']) .
      与spawn方法不同的是,fork会在父进程与子进程之间,建立一个通信管道,用于进程之间的通信.
    Arguments:
      modulePath： String,将要在子进程中运行的模块
      args： Array 字符串参数数组
      options：Object
      cwd String 子进程的当前工作目录
      env Object 环境变量键值对
      execPath String 创建子进程的可执行文件
      execArgv Array 子进程的可执行文件的字符串参数数组(默认： process.execArgv)
      silent Boolean 如果为true,子进程的stdin,stdout和stderr将会被关联至父进程,否则,它们将会从父进程中继承.(默认为：false)
      uid Number 设置用户进程的 ID
      gid Number 设置进程组的 ID
      返回的对象除了拥有ChildProcess实例的所有方法,还有一个内建的通信信道.
    e.g.:
      让我们创建两个 js 文件 support.js 和 master.js.
      support.js 文件代码：
      console.log("进程 " + process.argv[2] + " 执行." );
      master.js 文件代码：
      const fs = require('fs');
      const child_process = require('child_process');
      for(var i=0; i<3; i++) {
         var worker_process = child_process.fork("support.js", [i]);	
         worker_process.on('close', function (code) {
            console.log('子进程已退出,退出码 ' + code);
         });
      }
      执行以上代码,输出结果为：
      $ node master.js 
      进程 0 执行.
      子进程已退出,退出码 0
      进程 1 执行.
      子进程已退出,退出码 0
      进程 2 执行.
      子进程已退出,退出码 0
其他相关 
  electron 开发桌面程序
--------------------------------------------------------------------------------
总结收集
----------------------------------------------------------------------以下待整理











