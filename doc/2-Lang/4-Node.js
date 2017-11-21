NodeJS: 于2009年发布,一个事件驱动I/O服务端JS运行环境 
  PS: 内部采用V8引擎,作为JS解释器,通过自行开发的libuv库,调用操作系统资源 
    偶数位为稳定版本,如: 0.6.X、0.8.X; 奇数为非稳定版本,如: 0.7.X、0.9.X 
  相关命令 
    $ node -v         查看所安装node的版本信息
    $ node <fileName> 执行文件 
    $ node -e <codeStr>   使用-e参数,可执行代码字符串 
      node -e 'console.log("Hello World")'
    REPL命令 
      PS: 'NodeJS REPL'Node的交互式解释器 
        Node的交互式解释器可以很好的调试JS代码;相当于浏览器的Console控制台[SlPt]
      $ node                // 启动Node终端,进入node运行环境 
      $ node --use_strict   // REPL将在严格模式下运行,
      $ .help    列出使用命令
      $ .break   退出多行表达式
      $ .clear   退出多行表达式
      $ .save <filename>  保存当前的 Node REPL 会话到指定文件
      $ .load <filename>  载入当前 Node REPL 会话的文件内容
      $ _      下划线表示上一个命令的返回结果 
        > 1 + 1
        2
        > _ + 1
        3
      ctrl+c   按下两次退出 Node REPL
      ctrl+d   退出 Node REPL
      tab      列出当前命令
      up/down  查看输入的历史命令
    node升级 
      方式一: n: NodeJS版本管理 
        npm install -g n     安装n模块 
        n stable   升级nodejs到最新稳定版 
          n后面也可以跟随版本号比如:
          n v0.10.26
          n 0.10.26
        n ls       查看所有node版本
        n latest 安装最新的版本
        n rm 0.10.1 删除某个版本
        n use 0.10.21 some.js 以指定的版本来执行脚本
      方式二: nvm'Node Version Manager': NodeJS版本管理 
        nvm install 0.10  安装Node
        nvm use 0.10 使用指定的版本
        nvm ls 查看当前已经安装的版本
      方式三: 直接下载Node覆盖安装 
NodeJS的运行方式及编程风格 
  以单线程模式运行,使用事件驱动来处理并发,使用回调函数异步操作 
    基本上所有的事件机制都是用[设计模式中]观察者模式实现 
    每个子进程总是带有三个流对象: child.stdin, child.stdout 和 child.stderr 
    他们可能会共享父进程的stdio流,或者也可以是独立的被导流的流对象  
  回调函数 
    NodeJS异步编程依托于回调来实现,所有API都支持回调函数 
      Nodede的单线程[[一次只能运行一个任务]],导致大量采用异步操作'asynchronous opertion' 
      即任务不是马上执行,而是插在任务队列的尾部,等到前面的任务运行完后再执行 
      由于这种特性,某一个任务的后续操作,往往采用回调函数[callback]的形式进行定义 
      var isTrue = function(value, callback) {
        if (value === true) {
          callback(null, "Value was true.");
        }
        else {
          callback(new Error("Value is not true!"));
        }
      }
      上面代码就把进一步的处理,交给回调函数callback 
    Node回调函数的约定 
      若一函数需要'callback'作为参数,则'callback'作为最后一个参数 
      'callback'的第一个参数,为上一步传入的错误对象'error' 
      若没有发生错误,'callback'的第一个参数就传入null 
      好处: 通过判断'callback'的第一个参数来确定是否出错 
--------------------------------------------------------------------------------
基础 
  NODE_PATH node环境变量 
    与PATH环境变量类似,NodeJS允许通过NODE_PATH环境变量来指定额外的模块搜索路径 
    NODE_PATH环境变量中包含一到多个目录路径,路径间,在Linux下使用:分隔,在Windows下使用;分隔 
    Example: 
      例如定义了以下NODE_PATH环境变量：
      $ NODE_PATH=/home/user/lib:/home/lib
      当使用require('foo/bar')的方式加载模块时,则NodeJS依次尝试以下路径 
      /home/user/lib/foo/bar
      /home/lib/foo/bar
语法 
  this 
    全局作用域下的'this' 
      浏览器中,等价于window,声明的全局变量会作为this的属性 
      在node里面,有两种执行JS代码的方式: 
      直接在命令行执行代码: 声明的全局变量会添加到global对象,也会添加给this
        global 和 this 是等价的 
      执行JS文件: 声明的全局变量会添加到global对象,但不会自动添加到this
    'function'函数中的'this' 
      除了在DOM事件处理程序里,事件处理程序里面的this表示被绑定的元素对象
      若使用new调用,函数就变成了一个构造函数 
        就创建了一个实例,this指代这个实例.
        当构造函数使用new生成实例时,this指向其prototype.
      正常的方式调用函数[直接执行而无前缀],[浏览器和node环境]this指代全局的this
        使用严格模式,this就会变成undefined
  CommonJS规范: 模块化,模块导出、引入 
    ◆模块公开的接口 
      PS: module变量是整个模块文件的顶层变量,其exports属性就是模块向外输出的接口 
    module.exports = val  
      hello.js 文件中 
        function world() { 
          console.log(1);
        }; 
        module.exports = world;
        // module.exports.aoo = world;
      main.js  文件中 
        var word = require('./hello'); 
        world(); // 1
        // world.aoo(); // 1
    module.exports.xx = val  
    exports.xx = val  
    ◆obj = require(arg)    模块引入接口[相当于获取暴露的'exports'对象] 
      PS: 加载时可省略脚本文件的后缀名,依次查找'.js'-'.json'-'.node'-其他; 
        模块被加载以后,会被系统缓存,后续再加载该模块,会返回缓存中的版本,
        意味着模块加载实际上只会执行一次, 
        若希望模块执行多次,则可以让模块返回一个函数,然后多次调用该函数; 
      arg  可为'模块名'或'文件路径'  
        原生模块       http、fs、path等模块名
        相对路径的文件 ./mod或../mod等
        绝对路径的文件 /pathtomodule/mod等
        name  非原生模块的文件模块,通过配置文件指定 
          若模块目录中没有 package.json 文件,
          nodejs会尝试在模块目录中寻找 index.js 或 index.node 文件进行加载 
      当模块重名时,加载的优先级:  
        Node核心模块>相对路径文件模块>绝对路径文件模块>非路径模块 
'Global Object'全局变量,可在程序的任何地方访问 
  PS: 浏览器JS中,'window'是全局对象,Node中的全局对象是'global',
    所有全局变量[除了global本身以外]都是'global'对象的属性 
  ◆类
  Buffer,缓冲器,处理二进制数据的接口[用于保存原始数据] 
    PS: 用来创建一个专门存放二进制数据的缓存区; 
      可在 TCP 流或文件操作中处理二进制数据流 
      Buffer类以一种更优化的方式实现了 Uint8Array 
      Buffer实例大小固定[被创建时确定,且无法调整]、在V8堆外分配物理内存 
    Extend: Uint8Array  
    Static: 
      .poolSize  
      .alloc(len[,fill[,encoding]])  创建指定长度的Buffer 
        PS: 比Buffer.allocUnsafe()慢,但能确保新建的Buffer实例的内容不包含敏感数据  
        len  int,创建Buffer的长度,范围:[0-buffer.constants.MAX_LENGTH] 
        fill  int/str/buf,初始填充值,默认:0  
          PS: 若指定了fill,则会调用 buf.fill(fill) 初始化分配的Buffer 
        encoding kw,fill为字符串时的字符编码,默认:'utf8' 
          PS: 若指定了fill和encoding,则会调用 buf.fill(fill,encoding) 初始化分配的Buffer 
        Example: 
          // 创建一个长度为 10、且用 0x1 填充的 Buffer。 
          const buf2 = Buffer.alloc(10, 1);
      .allocUnsafe(len)  创建指定长度未初始化的Buffer实例 
        PS: 该方式创建的实例的底层内存未初始化,内容未知,可能包含敏感数据
        len  num,指定新建Buffer的长度 
        可用 buf.fill(0) 初始化实例为0 
          Example: 
          const buf = Buffer.allocUnsafe(10);
          // 输出: (内容可能不同): <Buffer a0 8b 28 3f 01 00 00 00 50 32>
          console.log(buf);
          buf.fill(0);
          // 输出: <Buffer 00 00 00 00 00 00 00 00 00 00>
          console.log(buf);
      .allocUnsafeSlow(len)  创建指定长度未初始化的Buffer实例 
      .from(val[,..])  通过其他值Buffer 
        (arr)  通过一八位字节的数组创建Buffer 
          // 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer 
          const buf4 = Buffer.from([1, 2, 3]);
        (arrBuf[,byteOffset[,length]])  创建一共享内存的Buffer 
          arrBuf  ArrayBuffer,共享源  
          byteOffset  开始拷贝的索引,默认:0
          length  int,拷贝的字节数,默认: arrayBuffer.length-byteOffset
          Example: 
            const arr = new Uint16Array(2);
            arr[0] = 5000;
            arr[1] = 4000;
            const buf = Buffer.from(arr.buffer);
            // 输出: <Buffer 88 13 a0 0f>
            console.log(buf);
            // 与 `arr` 共享内存,改变原始的 Uint16Array 也会改变 Buffer
            arr[1] = 6000;
            // 输出: <Buffer 88 13 70 17>
            console.log(buf);
        (buf)  返回Buffer的拷贝 
        (str[,encoding])  
          str  要编码的字符串 
          encoding  kw,字符编码,默认:'utf8' 
            'latin1'  Latin-1 
            'ascii'   
            ...
          Example: 
            // 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer 
            const buf5 = Buffer.from('tést');
            // 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer 
            const buf6 = Buffer.from('tést', 'latin1');
      .concat(buflist[,length]); 合并bufer,返回合并后的新buffer对象 
        buflist 用于合并的buf对象数组列表,如[buf1,buf2,buf3]
          参数列表只有一个成员,就直接返回该成员
        length  可选,默认为总长度,指定新buf对象的长度
          省略第二个参数时,Node内部会计算出这个值,然后再据此进行合并运算 
          因此,显式提供这个参数,能提供运行速度  
        Example:
          var buf1 = new Buffer('11');
          var buf2 = new Buffer('22');
          var buf3 = Buffer.concat([buf1,buf2]);
          console.log(buf3.toString());   // 1122
      .isEncoding(typ)  bol,表示Buffer实例是否为指定编码 
        Buffer.isEncoding('utf8'); // true
      .isBuffer(obj)    bol,判断对象是否为Buffer实例的 
        Buffer.isBuffer(Date) // false
      .byteLength(str [,typ]) 返回字符串实际占据的字节长度 
        str  检测的字符串
        typ  可选,编码类型,默认编码为'utf8'[不同编码其长度不同]
        Buffer.byteLength('Hello', 'utf8') // 5
      .compare(buf1,buf2)    比较两份Buffer对象 
    Instance: 
      var bufer = new Buffer(val)  通过Buffer类来创建bufer对象[已废弃][6.0-] 
        PS: bufer对象是类数组对象,成员都为0到255的整数值,即一个8位的字节 
        ◆val可为以下类型:
        num         整数,用于指定创建的bufer的长度[分配的字节内存][单位为字节] 
          var bufer = new Buffer(10); 创建一长度为10直接字节的bufer对象
        bufer       bufer对象,通过拷贝来创建新buffer对象 
          var buffer = new Buffer([1, 1, 2, 2, 3]);
          console.log(buffer); // <Buffer 01 01 02 02 03>
        str[,type]  字符串和编码类型,通过字符串来创建bufer对象 
          type  编码方式,默认为'utf-8',其他可选值为 
            "base64"  
            "ascii"   
            "utf8"    
            "utf-8"    
            "utf16le" UTF-16 的小端编码,支持大于 U+10000 的四字节字符
            "ucs2"    utf16le的别名
            "hex"     将每个字节转为两个十六进制字符
          Example:
            var bufer1 = new Buffer("abcdefg", "utf-8"); 
            var bufer2 = new Buffer("abcdefg", "base64"); 
            console.log(bufer1,bufer2);
            // <Buffer 61 62 63 64 65 66 67> <Buffer 69 b7 1d 79 f8>
        arr         数组,数组成员必须是整数值 
          var hello = new Buffer([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
          console.log(hello.toString()); // 'Hello'
      Buffer.from()  
      Buffer.alloc()  
      Buffer.allocUnsafe()  
    Proto: 
      .parent 
      .offset 
      .copy()  
      .toString()  
      .write()  
      .toJSON()  
      .readUIntLE()  
      .readUIntBE()  
      .readUInt8()  
      .readUInt16LE()  
      .readUInt16BE()  
      .readUInt32LE()  
      .readUInt32BE()  
      .readIntLE()  
      .readIntBE()  
      .readInt8()  
      .readInt16LE()  
      .readInt16BE()  
      .readInt32LE()  
      .readInt32BE()  
      .writeUIntLE()  
      .writeUIntBE()  
      .writeUInt8()  
      .writeUInt16LE()  
      .writeUInt16BE()  
      .writeUInt32LE()  
      .writeUInt32BE()  
      .writeIntLE()  
      .writeIntBE()  
      .writeInt8()  
      .writeInt16LE()  
      .writeInt16BE()  
      .writeInt32LE()  
      .writeInt32BE()  
      .toLocaleString()  
      .asciiSlice()  
      .base64Slice()  
      .latin1Slice()  
      .hexSlice()  
      .ucs2Slice()  
      .utf8Slice()  
      .asciiWrite()  
      .base64Write()  
      .latin1Write()  
      .hexWrite()  
      .ucs2Write()  
      .utf8Write()  
      .equals()  
      .inspect()  
      .compare()  
      .indexOf()  
      .lastIndexOf()  
      .includes()  
      .fill()  
      .slice()  
      .readFloatLE()  
      .readFloatBE()  
      .readDoubleLE()  
      .readDoubleBE()  
      .writeFloatLE()  
      .writeFloatBE()  
      .writeDoubleLE()  
      .writeDoubleBE()  
      .swap16()  
      .swap32()  
      .swap64()  
    ◆Buffer实例的属性方法 
    bufer[idx]  下标访问
    bufer.length  读写,bufer对象所占据的内存长度  
      PS:改值与Buffer对象的内容无关;
        如果想知道一个字符串所占据的字节长度,可以将其传入 Buffer.byteLength 方法
      var buf1 = new Buffer('1234567');
      var buf2 = new Buffer(8);
      console.log(buf1.length); // 7
      console.log(buf2.length); // 8
    bufer.byteLength   文件的体积大小 
    bufer.write(str[,idx][,len][,typ]) 将字符串写入bufer对象,返回实际写入的长度 
      PS:若bufer空间不足[长度不够],则只会写入[覆盖]部分字符串,其余被忽略; 
      str   写入缓冲区的字符串 
      idx   缓冲区开始写入的索引值,默认为 0 
      len   写入的字节数,默认为 buffer.length 
      typ   使用的编码.默认为'utf8' 
      Example: 
        var buf = new Buffer('abcdefg');
        var len = buf.write("1234");
        console.log("写入字节数 : "+ len);  // 写入字节数 : 4
        console.log(buf.toString()); // 1234efg
    bufer.toString([typ][,bgn][,end])  解码buf缓冲区数据并使用指定的编码返回字符串 
      typ    使用的编码,默认为 'utf8'[后续有参数时需用undefined来占位]  
      bgn    开始读取的索引位置,默认为 0 
      end    结束位置,默认为缓冲区的末尾 
      Example:
        var buf = new Buffer(26);
        for (var i = 0 ; i < 26 ; i++) { 
          buf[i] = i + 97; 
        }
        console.log(buf);
        // <Buffer 61 62 63 64 65 66 67 68 69 6a 6b 6c 6d 6e 6f 70 71 72 73 74 75 76 77 78 79 7a>
        console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
        console.log( buf.toString('ascii',0,5));   // 输出: abcde
        console.log( buf.toString('utf8',0,5));    // 输出: abcde
        console.log( buf.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde
    bufer.toJSON()    返回将bufer对象转换为JSON格式对象 
      PS:如果 JSON.stringify 方法调用Buffer实例,默认会先调用toJSON方法 
      Example:
        var bufer = new Buffer('abc');
        var json = bufer.toJSON();
        console.log(json); // { type: 'Buffer', data: [ 97, 98, 99 ] }
        console.log(typeof json); // object
        
        var buf = new Buffer('test');
        var json = JSON.stringify(buf);
        console.log(json); // '[116,101,115,116]'
        var copy = new Buffer(JSON.parse(json));
        console.log(copy); // <Buffer 74 65 73 74>
    bufer.slice([bgn[,end]])  bufer剪切,返回剪切的新缓冲区 
      begin 可选,默认为 0
      end   可选,默认为 bufer.length
      Example:
        var buf1 = new Buffer('123');
        var buf2 = buf1.slice(0,2);
        console.log(buf2); // <Buffer 31 32>
    bufer.copy(bufer1[,bf1Bgn[,bfBgn[,bfEnd]]])  拷贝bufer到bufer1中,返回undefined
      bufer1   复制的目标bufer对象 
      bf1Bgn   数字,可选,默认为 0,开始复制插入的下标 
      bfBgn    数字,可选,默认为 0 
      bfEnd    数字,可选,默认为 buf.length 
      Example: 
        var buf1 = new Buffer('abcdefghi');
        var buf2 = new Buffer(6);
        for (var i = 0; i < buf2.length; i++) {
          buf2[i] = 65;
        }
        console.log(buf1,buf2);
        // <Buffer 61 62 63 64 65 66 67 68 69> <Buffer 41 41 41 41 41 41>
        buf1.copy(buf2,2,3,5);
        console.log(buf1,buf2);
        // <Buffer 61 62 63 64 65 66 67 68 69> <Buffer 41 41 64 65 41 41>
        var bufStr1 = buf1.toString();
        var bufStr2 = buf2.toString();
        console.log(bufStr1,bufStr2);
        // abcdefghi AAdeAA
    bufer.compare(buf)  比较 
      Example:
        var buf1 = new Buffer('10');
        var buf2 = new Buffer('11');
        var result = buf1.compare(buf2);
        console.log(result); // -1
    bufer.equals(bufer1)
    与二进制数组的关系 
      TypedArray构造函数可以接受Buffer实例作为参数,生成一个二进制数组 
      比如,new Uint32Array(new Buffer([1, 2, 3, 4])),生成一个4个成员的二进制数组 
      注意,新数组的成员有四个,而不是只有单个成员（[0x1020304]或者[0x4030201]） 
      另外,这时二进制数组所对应的内存是从Buffer对象拷贝的,而不是共享的 
      二进制数组的buffer属性,保留指向原Buffer对象的指针 
      二进制数组的操作,与Buffer对象的操作基本上是兼容的,只有轻微的差异 
      比如,二进制数组的slice方法返回原内存的拷贝,而Buffer对象的slice方法创造原内存的一个视图（view） 
  ◆对象 
  global,Node所在的全局环境,类似浏览器的window对象 
    最根本的作用是作为全局变量的宿主
    global 和 window 的不同 
      在浏览器中声明一个全局变量,实际上是声明了一个全局对象的属性 
        var x = 1;
        // 等同于设置 
        window.x = 1;
      在模块中不是这样,[REPL环境的行为与浏览器一致] 
        在模块文件中
        var x = 1;
        该变量不是global对象的属性
        global.x // undefined 
        因为模块的全局变量都是该模块私有的,其他模块无法取到 
  global.process,用于描述当前Node进程状态  
    PS: 表示Node所处的当前进程,允许开发者与该进程互动,提供了一个与操作系统的简单接口
    ◆属性
    obj = process.env  成员为当前shell的环境变量 
      process.env.aoo  即为在命令行中输入的  aoo=xx
    process.stdout      标准输出流
    process.stderr      标准错误流
    process.stdin       标准输入流
    process.argv        属性返回一个数组,由命令行执行脚本时的各个参数组成.
      它的第一个成员总是node,第二个成员是脚本文件名,其余成员是脚本文件的参数.
    process.execPath    返回执行当前脚本的 Node 二进制文件的绝对路径.
    arr = process.execArgv  成员是命令行下执行脚本时,在Node可执行文件与脚本文件之间的命令行参数 
    process.exitCode    进程退出时的代码,若进程优通过 process.exit() 退出,不需要指定退出码.
    process.version     Node 的版本,比如v0.10.18.
    process.versions    一个属性,包含了 node 的版本和依赖.
    process.config      一个包含用来编译当前 node 执行文件的 JS 配置选项的对象.
      它与运行 ./configure 脚本生成的 "config.gypi" 文件相同.
    process.pid         当前进程的进程号.
    process.title       进程名,默认值为"node",可以自定义该值.
    process.arch        当前 CPU 的架构:'arm'、'ia32' 或者 'x64'.
    process.platform    运行程序所在的平台系统 'darwin', 'freebsd', 'linux', 'sunos' 或 'win32'
    process.mainModule  require.main 的备选方法.
      不同点,若主模块在运行时改变,require.main可能会继续返回老的模块.
      可以认为,这两者引用了同一个模块.
    Example:
      创建文件 main.js ,代码如下所示:
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
    process.abort()   这将导致 node 触发 abort 事件.会让 node 退出并生成一个核心文件.
    process.chdir(directory)   改变当前工作进程的目录,若操作失败抛出异常.
    process.cwd()   返回当前进程的工作目录
    process.exit([code])   使用指定的 code 结束进程.若忽略,将会使用 code 0.
    process.getgid()   获取进程的群组标识(参见 getgid(2)).获取到得时群组的数字 id,而不是名字.
      注意:这个函数仅在 POSIX 平台上可用(例如,非Windows 和 Android).
    process.setgid(id) 设置进程的群组标识(参见 setgid(2)).
      可以接收数字 ID 或者群组名.若指定了群组名,会阻塞等待解析为数字 ID .
      注意:这个函数仅在 POSIX 平台上可用(例如,非Windows 和 Android).
    process.getuid() 获取进程的用户标识(参见 getuid(2)).这是数字的用户 id,不是用户名.
      注意:这个函数仅在 POSIX 平台上可用(例如,非Windows 和 Android).
    process.setuid(id) 设置进程的用户标识(参见setuid(2)).
      接收数字 ID或字符串名字.果指定了群组名,会阻塞等待解析为数字 ID .
      注意:这个函数仅在 POSIX 平台上可用(例如,非Windows 和 Android).
    process.getgroups() 返回进程的群组 iD 数组.POSIX 系统没有保证一定有,但是 node.js 保证有.
      注意:这个函数仅在 POSIX 平台上可用(例如,非Windows 和 Android).
    process.setgroups(groups) 设置进程的群组ID.这是授权操作,需root权限,或者有 CAP_SETGID 能力 
      注意:这个函数仅在 POSIX 平台上可用(例如,非Windows 和 Android).
    process.initgroups(user,extra_group) 读取/etc/group,并初始化群组访问列表,使用成员所在的所有群组
      这是授权操作,所有你需要有 root 权限,或者有 CAP_SETGID 能力.
      注意:这个函数仅在 POSIX 平台上可用(例如,非Windows 和 Android).
    process.kill(pid[, signal]) 发送信号给进程. pid 是进程id,并且 signal 是发送的信号的字符串描述
      信号名是字符串,比如 'SIGINT' 或 'SIGHUP'.若忽略,信号会是 'SIGTERM'.
    process.memoryUsage() 返回一个对象,描述了 Node 进程所用的内存状况,单位为字节.
    process.nextTick(callback) 一旦当前事件循环结束,调用回到函数.
    process.umask([mask]) 设置或读取进程文件的掩码.
      子进程从父进程继承掩码.若mask 参数有效,返回旧的掩码.否则,返回当前掩码.
    process.uptime() 返回 Node 已经运行的秒数.
    process.hrtime() 返回当前进程的高分辨时间,形式为 [seconds, nanoseconds]数组.
      它是相对于过去的任意事件.该值与日期无关,因此不受时钟漂移的影响.
      主要用途是可以通过精确的时间间隔,来衡量程序的性能.
      你可以将之前的结果传递给当前的 process.hrtime() ,会返回两者间的时间差,用来基准和测量时间间隔.
    Example:
      创建文件 main.js ,代码如下所示:
      console.log('当前目录: ' + process.cwd()); // 输出当前目录
      console.log('当前版本: ' + process.version); // 输出当前版本
      console.log(process.memoryUsage()); // 输出内存使用情况
      执行 main.js 文件,代码如下所示:
      $ node main.js
      当前目录: /web/com/runoob/nodejs
      当前版本: v0.10.36
      { rss: 12541952, heapTotal: 4083456, heapUsed: 2157056 }    
    ◆事件
    exit       当进程准备退出时触发.
    beforeExit 当node清空事件循环,并且没有其他安排时触发这个事件 
      通常来说,当没有进程安排时 node 退出,
      但是 'beforeExit' 的监听器可以异步调用,这样 node 就会继续执行.
    uncaughtException 当一个异常冒泡回到事件循环,触发这个事件.
      若给异常添加了监视器,默认的操作[打印堆栈跟踪信息并退出]就不会发生.
    signal 当进程接收到信号时就触发.
      信号列表详见标准的 POSIX 信号名,如 SIGINT、SIGUSR1 等.
    Example:
      process.on('exit', function(code) {
        setTimeout(function() {  // 该代码永远不会执行
          console.log("该代码不会执行"); 
        }, 0);
        console.log('退出码为:', code);
      });
      console.log("程序执行结束");
      执行 main.js 文件,代码如下所示:
      $ node main.js
      程序执行结束
      退出码为: 0
    ◆退出状态码
      状态码 名称 & 描述
      1 Uncaught Fatal Exception 有未捕获异常,并且没有被域或 uncaughtException 处理函数处理.
      2 Unused 保留
      3 Internal JS Parse Error JS的源码启动 Node 进程时引起解析错误.非常罕见,仅会在开发 Node 时才会有.
      4 Internal JS Evaluation Failure JS 的源码启动 Node 进程,评估时返回函数失败.非常罕见,仅会在开发 Node 时才会有.
      5 Fatal Error V8 里致命的不可恢复的错误.通常会打印到 stderr ,内容为: FATAL ERROR
      6 'Non-function' Internal Exception Handler 未捕获异常,内部异常处理函数不知为何设置为'on-function',并且不能被调用.
      7 Internal Exception Handler Run-Time Failure 未捕获的异常, 并且异常处理函数处理时自己抛出了异常.例如,若 process.on('uncaughtException') 或 domain.on('error') 抛出了异常.
      8 Unused 保留
      9 Invalid Argument 可能是给了未知的参数,或者给的参数没有值.
      10 Internal JS Run-Time Failure JS的源码启动 Node 进程时抛出错误,非常罕见,仅会在开发 Node 时才会有.
      12 Invalid Debug Argument 设置了参数--debug 和/或 --debug-brk,但是选择了错误端口.
      >128 Signal Exits 若 Node 接收到致命信号,比如SIGKILL 或 SIGHUP,那么退出代码就是128 加信号代码.这是标准的 Unix 做法,退出信号代码放在高位.
  __filename 当前正在执行的脚本的路径和文件名 
    PS: 将输出文件所在位置的绝对路径,且和命令行参数所指定的文件名不一定相同  
      在模块中,返回的值是模块文件的路径 
    Example:
      创建文件 main.js ,代码如下所示:
      // 输出全局变量 __filename 的值
      console.log( __filename );
      执行 main.js 文件,代码如下所示:
      $ node main.js
      /web/com/runoob/nodejs/main.js
  __dirname  当前执行脚本所在的目录 
    Example:
      创建文件 main.js ,代码如下所示:
      // 输出全局变量 __dirname 的值
      console.log( __dirname );
      执行 main.js 文件,代码如下所示:
      $ node main.js
      /web/com/runoob/nodejs
  ◆全局函数 
  require() 用于加载模块 
  Buffer()  用于操作二进制数据 
  ◆伪全局变量 
    模块内部的全局变量,指向的对象根据模块不同而不同,但是所有模块都适用
  module
  module.exports
  exports 
  ◆其他同浏览器中JS相同的类、对象 
  Date,时间类 
  console,用于提供控制台标准输出[详见浏览器调试] 
  setTimeout(foo, time)  指定毫秒数后执行指定函数,返回一整数代表定时器的编号 
  clearTimeout(num)      通过一定时器编号来终止该定时器 
  setInterval(foo,time) 指定毫秒数后执行函数,返回一整数代表定时器的编号 
    具体执行时间大于等于该间隔,而不会少于它?;
  clearInterval(num)     终止一个用setInterval方法新建的定时器 
◆类 
◆模块 
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
stream,流: 用于暂存和移动数据[以bufer的形式存在] 
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
模块,Nodejs应用程序的基本组成部分,可让Nodejs的文件可以相互调用 
  PS:文件和模块是一一对应的,即一个NodeJS文件就是一个模块,
    文件可能是JS代码、JSON或者编译过的C/C++扩展等等;
    按照CommonJS规范定义和使用模块
  ◆核心模块: Node自带模块不用安装即可使用  
    源码都在Node的lib子目录中,为了提高运行速度,安装时都会被编译成二进制文件
    核心模块总是最优先加载的,如果自定义一HTTP模块,require('http')加载的还是核心模块 
  url   一个实例对象,用于解析URL 
    obj = url.parse(url [,bol1] [,bol2])  将URL解析为对象[方便后续其他操作]
      url   字符串,传入需要解析的URL字符串
      bol1  默认'false',是否将'query'字段转换为对象表示 
      bol2  默认'false',当URL不全时更智能的识别 
      返回的对象及其字段说明 
        url.parse("https://www.baidu.com?key=val");
        {
          protocol: 'https:',  // 协议
          slashes: true,       // 是否有协议的双斜线
          auth: null,
          host: 'www.baidu.com', // ip地址或域名
          port: null,           // 端口,默认为80,否则会指明
          hostname: 'www.baidu.com', // 主机名
          hash: null,   // hash值,锚点
          search: '?key=val', // 查询字符串 
          query: 'key=val',   // 查询字符串
          pathname: '/', // 路径名,
          path: '/',     // 路径
          href: 'https://www.baidu.com/' // 完整超链接
        }
    str = url.format(urlObj)      将url对象格式化为url字符串
      Example: :
      var obj =url.parse("https://www.baidu.com");
      url.format(obj); // 'https://www.baidu.com/'
    str = url.resolve(str1,str2)  拼接为URL 
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
  querystring  解析URL的查询字符串 
    var querystring = require("querystring"); 引入querystring模块
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
    querystring.parse(str [,str1] [,str2] [,options])   解析为对象格式  
      str  需要解析的字符串
      str1 可选,默认为'&',参数连接符
        Example:
        var str = 'name=Scott-course=Java-course=Node-from=';
        var obj1 = querystring.parse(str);
        var obj2 = querystring.parse(str,'-');
        console.log(obj1,'/n',obj2);
        // { name: 'Scott-course=Java-course=Node-from=' } 
        // { name: 'Scott', course: [ 'Java', 'Node' ], from: '' }
      str2 可选,默认为'=',键值分割符 
      optons  其他配置 
      Example: :
        querystring.parse('name=Scott&course=Java&course=Node&from=');
        // { name: 'Scott', course: [ 'Java', 'Node' ], from: '' }
    querystring.escape(str); 转义为URL可用的字符串
      Example: : 
        querystring.escape("哈哈>._.<"); // '%E5%93%88%E5%93%88%3E._.%3C'
    querystring.unescape(str); 反转义 
      Example: :
        querystring.unescape('%E5%93%88%E5%93%88%3E._.%3C'); // '哈哈>._.<'
    querystring.unescapeBuffer() 
    querystring.encode()
    querystring.decode()
  http   http服务模块,提供HTTP服务器功能 
    PS:主要用于搭建HTTP服务端和客户端; 
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
    var http = require("http"); 引入http模块 
      PS:使用HTTP服务器或客户端功能必须调用该模块
    var server = http.createServer(foo); 创建服务器 
      foo 依次传入参数 (req,res) 
        req 请求 
          req.url  请求的地址
          req.setEncoding("utf8"); 设置请求的格式为UTF-8
          req.addListener("data",function(dataPart){}); data事件,当接收请求信息时触发
            会触发多次,dataPart为每次信息,将所有dataPart串起来就是,请求传送的信息了
          req.addListener("end",function(){}); end事件,请求信息传送完毕后触发
        res 响应 
          res.writeHead(状态码,obj); 设置响应头
            obj  设置响应头信息的对象
            Example:
            res.writeHead(200,{"Content-Type":"text/plain"})
          res.write(str); 定义响应信息
          res.end([str]); 完成响应,参数可选,存在会将其发送
    server.listen(port [,url]);  监听ip及端口 
    http.request(options [,foo])  从后台发送http请求
      PS:返回可写的request实例流
      options  配置项参数,可为str或obj
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
      foo      参数为 (res) 
        res 服务器的响应 
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
    http.get(url,foo);   使用get方法请求指定url的数据 
      PS:基于 http.request 的封装,
        相对于request,将请求方法默认为get,且自动调用req.end();
      foo   传入参数 (res) 
        res.on('data',foo); 监听请求的数据传输,会不断的触发 
          PS:将回调函数中所有的data数据串起来就是完整的响应数据了
          foo  传入参数 (data) 
        res.on('end',foo);  请求数据下载完毕触发
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
  https  https服务模块 
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
  fs     file system,文件系统模块,与文件系统交互
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
    var fs = require('fs'); 引入文件系统模块
    fs.writeFile(path,data,[options],callback); 写内容到文件中 
      PS: 写入文件内容,若文件不存在会创建一个文件,但不会主动创建目录
        写入时会先清空文件
      path    字符串,路径及文件名
      data    字符串,写入的内容
      option  对象,用于控制写入,包含{encoding,mode,flag}
        encoding 默认编码为 utf8
        mode     模式为 0666
        flag     默认值为 "w",表示重写,会清空文件之前的内容
          'a'  增加,在文件原有的基础上增加
      callback 回调函数,传入参数 err
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
    fs.writeFileSync()   写文件的同步写法 
    fs.readFile(path,[option],callback);  读取文件内容
      path     字符串,路径及文件名
      option   对象
        encoding String |null default=null
        flag  默认为 'r'
      callback 回调函数,传入参数 (err,data) 
        err   读取文件出错时触发的错误对象 
        data  Buffer类型,从文件读取的数据 
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
  crypto 提供加密和解密功能,基本上是对OpenSSL的包装
  util   提供常用函数的集合 
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
  child_process 创建子进程 
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
  path   处理文件路径 
    PS:
    var path = require("path"); 引入path模块
    path.normalize(p) 规范化路径,注意'..' 和 '.'.
    path.join([path1][, path2][, ...]) 用于连接路径
      该方法的主要用途在于,会正确使用当前系统的路径分隔符,Unix系统是 /,Windows系统是 \
    path.resolve([path1],path2) 将path2解析为绝对路径 
      Example:
      var path1 = path.resolve('e://a','./b')
      console.log(path1); // e://a/b 
    path.isAbsolute(path) 判断参数 path 是否是绝对路径.
    path.relative(from, to) 用于将相对路径转为绝对路径.
    path.dirname(p) 返回路径中代表文件夹的部分,同 Unix 的dirname 命令类似.
    path.basename(p[, ext]) 返回路径中的最后一部分.同 Unix 命令 bashname 类似.
    path.extname(p) 返回路径中文件的后缀名,即路径中最后一个'.'之后的部分.
      若一个路径中并不包含'.'或该路径只包含一个'.' 且这个'.'为路径的第一个字符,则此命令返回空字符串.
    path.parse(pathString) 返回路径字符串的对象.
    path.format(pathObject) 从对象中返回路径字符串,和 path.parse 相反.    
    path.sep 平台的文件路径分隔符,'\\' 或 '/'
    path.delimiter 平台的分隔符, ; or ':'.
    path.posix 提供上述 path 的方法,不过总是以 posix 兼容的方式交互.
    path.win32 提供上述 path 的方法,不过总是以 win32 兼容的方式交互.    
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
  os   模块提供了一些基本的系统操作函数
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
  net  底层的网络通信工具,包含创建服务器/客户端的方法 
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
  tls : https的创建 
  dns  模块用于解析域名 
    PS:
    var dns = require("dns"); 引入dns模块
  domain  域,简化异步代码的异常处理,可以捕捉处理try catch无法捕捉的异常
    PS: domain模块,把处理多个不同的IO的操作作为一个组.
      注册事件和回调到domain,当发生一个错误事件或抛出一个错误时,
      domain对象会被通知,不会丢失上下文环境,也不导致程序错误立即推出,
      与process.on('uncaughtException')不同.
      Domain 模块可分为隐式绑定和显式绑定:
        隐式绑定: 把在domain上下文中定义的变量,自动绑定到domain对象
        显式绑定: 把不是在domain上下文中定义的变量,以代码的方式绑定到domain对象
    var domain = require("domain"); 引入domain模块
  assert  主要用于断言,如果表达式不符合预期,就抛出一个错误 
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
  Promise  同步形式执行异步操作　
    var Promise = require("Promise");   模块引入　
  dns  : 查询网址的ip 
    dns.lookup(host,foo)    查询网址的IP 
      host  查询的网址 
      foo   执行的回调,依次传入参数 (error,ip,ipv) 
        error 错误对象 
        ip    查询的ip  
        ipv   '4'或'6',表示ipv4或ipv6   
    Example: 
    const dns = require('dns');
    const host = 'zhihu.com';
    dns.lookup(host,(error,ip,ipv) => {
      console.log(ip,ipv); // 118.178.213.186  4 
    })
  ◆第三方模块: 需通过npm安装到本地  
  cheerio html文件源码操作模块 
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
  request 请求模块 
    var request =require('request'); 引入request模块
    request(url,function(err,response,data){ }); 向URL发送请求
      回调函数传入err response data三个参数
        err      当报错时err参数被填充,默认为null
        response 请求
          response.statusCode   http响应状态码,如200为成功
        data     响应的数据
  ◆本地模块: 自定义的JS文件  
操作总结 
  GET/POST 请求信息获取  
    PS:表单提交到服务器一般使用 GET/POST 请求
    获取 GET 请求内容 
      PS:由于GET请求直接被嵌入在路径中,URL是完整的请求路径,包括了?后面的部分,
        因此可手动解析后面的内容作为GET请求的参数 
      Example:
        var http = require('http');
        var url = require('url');
        var util = require('util');
        http.createServer(function(req, res){
          res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
          res.end(util.inspect(url.parse(req.url, true)));
        }).listen(3000);
        在浏览器中访问 'http://localhost:3000/user?name=菜鸟教程&url=www.runoob.com' 
        网页显示:
        Url {
          protocol: null,
          slashes: null,
          auth: null,
          host: null,
          port: null,
          hostname: null,
          hash: null,
          search: '?name=%E8%8F%9C%E9%B8%9F%E6%95%99%E7%A8%8B&url=www.runoob.com',
          query: { name: '菜鸟教程', url: 'www.runoob.com' },
          pathname: '/user',
          path: '/user?name=%E8%8F%9C%E9%B8%9F%E6%95%99%E7%A8%8B&url=www.runoob.com',
          href: '/user?name=%E8%8F%9C%E9%B8%9F%E6%95%99%E7%A8%8B&url=www.runoob.com' 
        }
      获取 URL 的参数
        使用 url.parse 方法来解析 URL 中的参数
        var http = require('http');
        var url = require('url');
        var util = require('util');
        http.createServer(function(req, res){
          res.writeHead(200, {'Content-Type': 'text/plain'});
          // 解析 url 参数
          var params = url.parse(req.url, true).query;
          res.write("网站名:" + params.name);
          res.write("\n");
          res.write("网站 URL:" + params.url);
          res.end();
        }).listen(3000);
        在浏览器中访问 'http://localhost:3000/user?name=菜鸟教程&url=www.runoob.com' 
        返回结果:
    获取 POST 请求内容 
      PS:POST 请求的内容全部的都在请求体中,http.ServerRequest 并没有一个属性内容为请求体,
        原因是等待请求体传输可能是一件耗时的工作 
        比如上传文件,而很多时候我们可能并不需要理会请求体的内容,
        恶意的POST请求会大大消耗服务器的资源,
        所有nodejs默认是不会解析请求体的,当需要的时候,需要手动来做 
      基本语法结构 
        var http = require('http');
        var querystring = require('querystring');
        http.createServer(function(req, res){
          // 定义了一个post变量,用于暂存请求体的信息
          var post = '';     
          
          // 通过req的data事件监听函数,每当接受到请求体的数据,就累加到post变量中
          req.on('data', function(chunk){    
            post += chunk;
          });
          
          // 在end事件触发后,通过querystring.parse将post解析为真正的POST请求格式,然后向客户端返回 
          req.on('end', function(){    
            post = querystring.parse(post);
            res.end(util.inspect(post));
          });
        }).listen(3000);
      Example:
        表单通过 POST 提交并输出数据:
        var http = require('http');
        var querystring = require('querystring');
        var postHTML = 
        '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
        '<body>' +
        '<form method="post">' +
        '网站名: <input name="name"><br>' +
        '网站 URL: <input name="url"><br>' +
        '<input type="submit">' +
        '</form>' +
        '</body></html>';
        http.createServer(function (req, res) {
          var body = "";
          req.on('data', function (chunk) {
            body += chunk;
          });
          req.on('end', function () {
            // 解析参数
            body = querystring.parse(body);
            // 设置响应头部信息及编码
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
            
            if(body.name && body.url) { // 输出提交的数据
              res.write("网站名:" + body.name);
              res.write("<br>");
              res.write("网站 URL:" + body.url);
            } 
            else {  // 输出表单
              res.write(postHTML);
            }
            res.end();
          });
        }).listen(3000);
  Cookie 操作 
    写入cookie 
      在响应头中设定 'Set-Cookie' = 'xx=xxx'
Question&Suggestion: 
--------------------------------------------------------------------------------
'Representational State Transfer'RESTful API: 表述性状态传递,一种软件架构风格  
  PS: 满足这些架构约束条件和原则的应用程序或设计就是RESTful 
    REST是设计风格而不是标准,常基于HTTP,URI,XML及HTML这些现有的广泛流行的协议和标准使用 
    REST 通常使用 JSON 数据格式 
  REST基本架构的四个方法:
    GET    用于获取数据
    PUT    用于添加数据
    DELETE 用于删除数据
    POST   用于更新或添加数据
  RESTful Web Services: 基于REST架构的Web Services 
    由于轻量级及通过HTTP直接传输数据的特性,Web服务的RESTful方法已经成为最常见的替代方法 
    可以使用各种语言(如Java、Perl、Ruby、Python、PHP、JS[包括 Ajax])实现客户端 
    RESTful Web 服务通常可以通过自动客户端或代表用户的应用程序访问 
  Example: 
    创建 RESTful
    首先,创建一个 json 数据资源文件 users.json,内容如下:
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
    基于以上数据,我们创建以下 RESTful API:
      序号 URI HTTP 方法 发送内容 结果
      1 listUsers GET 空 显示所有用户列表
      2 addUser POST JSON 字符串 添加新用户
      3 deleteUser DELETE JSON 字符串 删除用户
      4 :id GET 空 显示用户详细信息
    获取用户列表:
      以下代码,我们创建了 RESTful API listUsers,
      用于读取用户的信息列表, server.js 文件代码如下所示:
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
      接下来执行以下命令:
      应用实例,访问地址为 http://0.0.0.0:8081
      在浏览器中访问 'http://127.0.0.1:8081/listUsers',结果如下所示:
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
        用于添加新的用户数据,server.js 文件代码如下所示:
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
      接下来执行以下命令:
      应用实例,访问地址为 'http://0.0.0.0:8081'
      在浏览器中访问 http://127.0.0.1:8081/addUser,结果如下所示:
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
      以下代码,我们创建了 RESTful API :id(用户id), 用于读取指定用户的详细信息,server.js 文件代码如下所示:
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
      接下来执行以下命令:
      $ node server.js 
      应用实例,访问地址为 http://0.0.0.0:8081
      在浏览器中访问 http://127.0.0.1:8081/2,结果如下所示:
      {
        "name":"suresh",
        "password":"password2",
        "profession":"librarian",
        "id":2
      }
    删除用户
      以下代码,我们创建了 RESTful API deleteUser, 用于删除指定用户的详细信息,
      以下实例中,用户 id 为 2,server.js 文件代码如下所示:
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
      接下来执行以下命令:
      $ node server.js 
      应用实例,访问地址为 http://0.0.0.0:8081
      在浏览器中访问 http://127.0.0.1:8081/deleteUser,结果如下所示:
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
其他相关 
  electron 开发桌面程序 
----------------------------------------------------------------------以下待整理




