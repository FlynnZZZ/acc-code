NodeJS: 于2009年发布,一个事件驱动I/O服务端JS运行环境 
  PS: 内部采用V8引擎,作为JS解释器,通过自行开发的libuv库,调用操作系统资源 
    偶数位为稳定版本,如: 0.6.X、0.8.X; 奇数为非稳定版本,如: 0.7.X、0.9.X 
  相关命令 
    $ node -v           // 查看所安装node的版本信息
    $ node <fileName>   // 执行文件 
    $ node -e <codeStr>  //  使用-e参数,可执行代码字符串 
      Example: node -e 'console.log("Hello World")'
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
基础&语法 
  NODE_PATH,node环境变量 
    与PATH环境变量类似,NodeJS允许通过NODE_PATH环境变量来指定额外的模块搜索路径 
    NODE_PATH环境变量中包含一到多个目录路径,路径间,在Linux下使用:分隔,在Windows下使用;分隔 
    Example: 
      例如定义了以下NODE_PATH环境变量：
      $ NODE_PATH=/home/user/lib:/home/lib
      当使用require('foo/bar')的方式加载模块时,则NodeJS依次尝试以下路径 
      /home/user/lib/foo/bar
      /home/lib/foo/bar
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
  'Global Object'全局变量,可在程序的任何地方访问 
    PS: 浏览器JS中,'window'是全局对象,Node中的全局对象是'global',
      所有全局变量[除了global本身以外]都是'global'对象的属性 
module,'CommonJS'模块化规范 
  Feature: 
    加载模块,会将模块内的内容执行一次 
      当直接运行时,在模块内 require.main === module 
      可以此来判断直接运行还是加载运行  
    同步加载,模块系统需要同步读取模块文件内容,并编译执行以得到模块接口 
    运行时加载: 只能在运行时确定 
      比如,CommonJS 模块就是对象,输入时必须查找对象属性 
      // CommonJS模块
      let { stat, exists, readFile } = require('fs');
      // 等同于
      let _fs = require('fs');
      let stat = _fs.stat;
      let exists = _fs.exists;
      let readfile = _fs.readfile;
      上面代码的实质是整体加载fs模块[即加载fs的所有方法],生成一个对象(_fs),
      然后再从这个对象上面读取3个方法。
      这种加载称为“运行时加载”,因为只有运行时才能得到这个对象,
      导致完全没办法在编译时做“静态优化”。
  模块内部的全局变量,指向的对象根据模块不同而不同,但是所有模块都适用 ? 
  ◆模块引入 
  require(moduleName)  模块引入,返回模块的 module.exports 
    Feature: 
      省略文件后缀名时,依次查找'.js'、'.json'、'.node'、其他; 
      省略文件名时,依次查找'index'、 ? 
      模块被加载后会缓存,后续加载返回缓存中的版本
        即模块加载最多执行一次模块代码, 
        若希望模块执行多次,则可以让模块返回一个函数,然后多次调用该函数; 
      当模块重名时,加载的优先级:  
        Node核心模块>相对路径文件模块>绝对路径文件模块>非路径模块 
    moduleName  str,'模块名'/'文件路径'  
      使用模块名引入原生模块或放到'node_modules'下的自定义模块 
      使用文件路径引入自定义模块
        相对路径  如:'./mod' 
        绝对路径  如:'/pathtomodule/mod' 
  ◆模块公开  
    PS: module变量是整个模块文件的顶层变量,其exports属性就是模块向外输出的接口 
  module.exports = val     把模块希望输出的内容放入该对象[覆盖模式] 
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
  module.exports.xx = val  把模块希望输出的内容放入该对象[修改模式] 
  exports.xxx = val        把模块希望输出的内容放入该对象[只有修改模式] 
  exports 指向 module.exports 的一个引用, exports === module.exports 
  ◆Expand: 
  循环引用,也叫循环依赖,会导致其中一个引入为空 
    方法一: 将需公用的部分提取出来作为一个独立模块 
    方法二: 动态引入,在需要时引入,如在函数内部 
'Command Line Options'命令行参数 
  -v, --version  // Node版本 
★类 
Buffer,缓冲器,处理二进制数据的接口[用于保存原始数据] 
  PS: 用来创建一个专门存放二进制数据的缓存区; 
    可在 TCP 流或文件操作中处理二进制数据流 
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
    .from( val )  将其他值使用buffer表示  
      Input: 参数可分为以下几种形式: 
        arr         通过一八位字节的数组创建Buffer 
          // 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer 
          const buf4 = Buffer.from([1, 2, 3]);
        arrBuf[,byteOffset[,length]]  创建一共享内存的Buffer 
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
        buffer      返回Buffer的拷贝 
        str,encoding?   将字符串转换成buffer格式    
          str       要编码的字符串 
          encoding  kw,可选,字符编码,默认:'utf8' 
            'latin1'  Latin-1 
            'ascii'   
            ...
          Example: 
            const buf = Buffer.from('test');
            const buf = Buffer.from('test', 'latin1');
      Output: buffer,转换后的buffer 
    .concat(<bufList>,<length>?)   bufer拼接 
      Input: 
        bufList   待合并的buf组成的数组,如[buf1,buf2,buf3]
          参数列表只有一个成员,就直接返回该成员
        length    num,可选,默认为总长度,指定新buf对象的长度 
          省略第二个参数时,Node内部会计算出这个值,然后再据此进行合并运算 
          因此,显式提供这个参数,能提供运行速度  
      Output: buffer,返回合并后的新buffer对象 
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
  Proto: 
    [idx]  下标访问
    .length  读写,bufer对象所占据的内存长度  
      PS:改值与Buffer对象的内容无关;
        如果想知道一个字符串所占据的字节长度,可以将其传入 Buffer.byteLength 方法
      var buf1 = new Buffer('1234567');
      var buf2 = new Buffer(8);
      console.log(buf1.length); // 7
      console.log(buf2.length); // 8
    .byteLength   文件的体积大小 
    .parent 
    .offset 
    .write(str[,idx][,len][,typ]) 将字符串写入bufer对象,返回实际写入的长度 
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
    .toString([typ][,bgn][,end])  解码buf缓冲区数据并使用指定的编码返回字符串 
      typ    使用的编码[后续有参数时需用undefined来占位]  
        'utf8'    默认字
        'ascii'   
        'hex'     16 进制 
        'ascii'
        'ucs2'
        'base64'
        'gbk'不支持
        'gb2312'不支持
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
    .toJSON()    返回将bufer对象转换为JSON格式对象 
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
    .slice([bgn[,end]])  bufer剪切,返回剪切的新缓冲区 
      begin 可选,默认为 0
      end   可选,默认为 bufer.length
      Example:
        var buf1 = new Buffer('123');
        var buf2 = buf1.slice(0,2);
        console.log(buf2); // <Buffer 31 32>
    .copy(bufer1[,bf1Bgn[,bfBgn[,bfEnd]]])  拷贝bufer到bufer1中,返回undefined
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
    .compare(buf)  比较 
      Example:
        var buf1 = new Buffer('10');
        var buf2 = new Buffer('11');
        var result = buf1.compare(buf2);
        console.log(result); // -1
    .equals(bufer1)
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
    .inspect()  
    .indexOf()  
    .lastIndexOf()  
    .includes()  
    .fill()  
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
  与二进制数组的关系 
    TypedArray构造函数可以接受Buffer实例作为参数,生成一个二进制数组 
    比如,new Uint32Array(new Buffer([1, 2, 3, 4])),生成一个4个成员的二进制数组 
    注意,新数组的成员有四个,而不是只有单个成员（[0x1020304]或者[0x4030201]） 
    另外,这时二进制数组所对应的内存是从Buffer对象拷贝的,而不是共享的 
    二进制数组的buffer属性,保留指向原Buffer对象的指针 
    二进制数组的操作,与Buffer对象的操作基本上是兼容的,只有轻微的差异 
    比如,二进制数组的slice方法返回原内存的拷贝,而Buffer对象的slice方法创造原内存的一个视图（view） 
★函数 
定时器相关 
  setTimeout(foo,time)  numId,延时调用  
  clearTimeout(numId)   清除延时调用  
  setInterval(foo,time) numId,间时调用 
  clearInterval(numId)  清除间时调用 
★全局变量&对象  
global,Node所在的全局环境对象 
  最根本的作用是作为全局变量的宿主,相当于浏览器的window对象 
  global 和 window 的不同 
    在浏览器中声明一个全局变量,实际上是声明了一个全局对象的属性 
      var x = 1;
      // 等同于设置 
      window.x = 1;
    NodeJS中 
      相同模块中,和浏览器表现一致 
      不同模块中,则不同,因为模块的全局变量都是该模块私有的,其他模块无法取到  
process,用于描述当前Node进程状态  
  PS: 一个全局对象,表示Node所处的当前进程,
    允许开发者与该进程互动,提供了一个与操作系统的简单接口
  ▼成员: 
  .env     obj,其成员为当前shell的环境变量 
    process.env.aoo  即在命令行中输入 aoo=xx 的值xx 
  .stdout      标准输出流
  .stderr      标准错误流
  .stdin       标准输入流
  .argv        属性返回一个数组,由命令行执行脚本时的各个参数组成.
    它的第一个成员总是node,第二个成员是脚本文件名,其余成员是脚本文件的参数.
  .execPath    返回执行当前脚本的 Node 二进制文件的绝对路径.
  .execArgv  arr,成员是命令行下执行脚本时,在Node可执行文件与脚本文件之间的命令行参数 
  .exitCode    进程退出时的代码,若进程优通过 process.exit() 退出,不需要指定退出码.
  .version     Node 的版本,比如v0.10.18.
  .versions    一个属性,包含了 node 的版本和依赖.
  .config      一个包含用来编译当前 node 执行文件的 JS 配置选项的对象.
    它与运行 ./configure 脚本生成的 "config.gypi" 文件相同.
  .pid         当前进程的进程号.
  .title       进程名,默认值为"node",可以自定义该值.
  .arch        当前 CPU 的架构:'arm'、'ia32' 或者 'x64'.
  .platform    运行程序所在的平台系统 'darwin', 'freebsd', 'linux', 'sunos' 或 'win32'
  .mainModule  require.main 的备选方法.
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
  .abort()   这将导致 node 触发 abort 事件.会让 node 退出并生成一个核心文件.
  .chdir(directory)   改变当前工作进程的目录,若操作失败抛出异常.
  .cwd()   返回当前进程的工作目录
  .exit([code])   使用指定的 code 结束进程.若忽略,将会使用 code 0.
  .getgid()   获取进程的群组标识(参见 getgid(2)).获取到得时群组的数字 id,而不是名字.
    注意:这个函数仅在 POSIX 平台上可用(例如,非Windows 和 Android).
  .setgid(id) 设置进程的群组标识(参见 setgid(2)).
    可以接收数字 ID 或者群组名.若指定了群组名,会阻塞等待解析为数字 ID .
    注意:这个函数仅在 POSIX 平台上可用(例如,非Windows 和 Android).
  .getuid() 获取进程的用户标识(参见 getuid(2)).这是数字的用户 id,不是用户名.
    注意:这个函数仅在 POSIX 平台上可用(例如,非Windows 和 Android).
  .setuid(id) 设置进程的用户标识(参见setuid(2)).
    接收数字 ID或字符串名字.果指定了群组名,会阻塞等待解析为数字 ID .
    注意:这个函数仅在 POSIX 平台上可用(例如,非Windows 和 Android).
  .getgroups() 返回进程的群组 iD 数组.POSIX 系统没有保证一定有,但是 node.js 保证有.
    注意:这个函数仅在 POSIX 平台上可用(例如,非Windows 和 Android).
  .setgroups(groups) 设置进程的群组ID.这是授权操作,需root权限,或者有 CAP_SETGID 能力 
    注意:这个函数仅在 POSIX 平台上可用(例如,非Windows 和 Android).
  .initgroups(user,extra_group) 读取/etc/group,并初始化群组访问列表,使用成员所在的所有群组
    这是授权操作,所有你需要有 root 权限,或者有 CAP_SETGID 能力.
    注意:这个函数仅在 POSIX 平台上可用(例如,非Windows 和 Android).
  .kill(pid[, signal]) 发送信号给进程. pid 是进程id,并且 signal 是发送的信号的字符串描述
    信号名是字符串,比如 'SIGINT' 或 'SIGHUP'.若忽略,信号会是 'SIGTERM'.
  .memoryUsage() 返回一个对象,描述了 Node 进程所用的内存状况,单位为字节.
  .nextTick(callback) 一旦当前事件循环结束,调用回到函数.
  .umask([mask]) 设置或读取进程文件的掩码.
    子进程从父进程继承掩码.若mask 参数有效,返回旧的掩码.否则,返回当前掩码.
  .uptime() 返回 Node 已经运行的秒数.
  .hrtime() 返回当前进程的高分辨时间,形式为 [seconds, nanoseconds]数组.
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
  ▼事件
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
  ▼退出状态码
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
Date,时间类 
console,用于提供控制台标准输出[详见浏览器调试] 
Q&A: 
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
----------------------------------------------------------------------以下待整理




