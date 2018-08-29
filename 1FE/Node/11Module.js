模块: Nodejs应用程序的基本组成部分,模块间可相互调用 
  一个NodeJS文件[可能是JS代码、JSON或编译过的C/C++扩展等]就是一个模块
  可分为: 核心模块,第三方模块和自定义的JS文件 
  按照CommonJS规范定义和使用模块 
  命名文件时,推荐使用'-'或'_'代替驼峰  
◆核心模块: Node自带模块不用安装即可使用  
  源码都在Node的lib子目录中,为了提高运行速度,安装时都会被编译成二进制文件
  核心模块总是最优先加载的,如果自定义一HTTP模块,require('http')加载的还是核心模块 
// 基础类 
const events = require('events')  事件模块 
  PS: EventEmitter 的核心就是事件触发与事件监听器功能的封装 
    NodeJS所有的异步 I/O 操作在完成时都会发送一个事件到事件队列,
    大多数时候我们不会直接使用 EventEmitter, 而是在对象中继承它 
    包括 fs、net、 http 在内的,只要是支持事件响应的核心模块都是 EventEmitter 的子类 
    NodeJS 里面的许多对象都会分发事件: 
    一个 net.Server 对象会在每次有新连接时分发一个事件,
    一个 fs.readStream 对象会在文件被打开的时候发出一个事件.
    所有这些产生事件的对象都是 events.EventEmitter 的实例 
  DefDec: 
    emitter  事件实例,一个事件实例可注册多个事件  
    evtName  事件名称,一个事件可绑定多个监听器  
    listener 事件监听器,触发事件时,绑定的监听器都会执行  
  events/EventEmitter 类
    PS: events === events.EventEmitter   
    Static: 
      .listenerCount(emitter,'evtName')  返回事件实例的事件绑定的监听器数量 [已废弃]  
      .defaultMaxListeners  读写最大的事件的监听器绑定的个数   
        每个事件默认可注册最多 10 个监听器;若设置值不是正数,将抛出 TypeError错误 
        所有 emitter 默认值可使用 EventEmitter.defaultMaxListeners 设置 
          会影响所有 emitter,包括之前创建的 
        单个 emitter 的限制可使用 emitter.setMaxListeners(n)
          且优先级高于 EventEmitter.defaultMaxListeners 
      .init()  
    Instance: new EventEmitter() 
    Proto: 
      ._events 
      ._maxListeners 
      .domain 
      .addListener(evtName,function(arg1,..){  // 添加 listener 到事件监听器数组的末尾  
        arg  一一对应触发事件时传入的参数 
      })    
        PS: 不会检查 listener 是否已被添加
          多次添加相同的 eventName 和 listener 会导致触发时 listener 被调用多次
        Input: 
          evtName   str,注册的事件  
          listener  事件绑定的监听器   
        Output: 事件实例 
      .on(evtName,fn)                          // addListener 的别名  
      .once(evtName ,function(arg1,..){        // 单次监听器绑定,其他同 .on 
        PS: 只会触发一次,触发后立刻解除 
      })            
      .prependListener(evtName,fn)             // 添加 listener 到事件监听器数组的头部 
      .prependOnceListener(evtName,fn)         // 单次添加 
      .emit(evtName ,arg1?,.. )     // bol,同步触发该事件并传递一组数据  
        PS: 触发时,该事件的监听器会按照注册的顺序依次被调用 
        Input: 
          evtName  str,触发的事件 
          arg      any,传入的若干个数据  
        Output:  返回表示该事件是否有被监听的布尔值   
      .removeListener(evtName ,fooName)  // 移除事件的指定监听器  
        PS: 此操作将会改变处于被删监听器之后的那些监听器的索引 
        Input: 
          evtName  事件名称 
          fooName  为指定回调的函数名,不能为匿名函数,否则不能移除  
        Output: 当前的事件实例 
        Example: 
          var callback = function(stream) { };
          server.on('connection', callback);
          server.removeListener('connection', callback);
      .off(evtName,fooName)              // removeListener 的别名 
      .removeAllListeners(evtName?)      // 解绑所有监听器  
        evtName  可选,移除指定事件的所有监听器,默认:移除所有事件的所有监听  
      .listenerCount(evtName)  // num,指定事件绑定的监听器的数量  
      .listeners(evtName)      // listenerArr,返回指定事件的监听器的数组 
      .getMaxListeners()       // num,当前的最大监听器限制值 
      .setMaxListeners(num)    // 设置事件最大的监听数量 
        默认单个事件允许绑定不超过 10 监听器函数,否则就会输出警告信息 
      .eventNames()            // evtNameArr,返回所有注册的事件组成的数组 
        PS: 数组中的值为字符串或符号 
        const EventEmitter = require('events');
        const myEE = new EventEmitter();
        myEE.on('foo', () => {});
        myEE.on('bar', () => {});
        const sym = Symbol('symbol');
        myEE.on(sym, () => {});
        console.log(myEE.eventNames()); //  [ 'foo', 'bar', Symbol(symbol) ]
      .rawListeners(evtName)   // 
    Events: 
      'newListener'     事件实例添加事件时,在该事件实例上触发 
        响应函数的参数为: (
          evtName        // 新绑定的事件 
          ,listener      // 新绑定事件对应的监听器 
        ) 
        Feature: 
          在该事件中进行的事件绑定,会被置于该事件的最前位置触发 
            const myEmitter = new EventEmitter();
            // 只处理一次,所以不会无限循环
            myEmitter.once('newListener', (event, listener) => {
              if (event === 'event') {
                // 在开头插入一个新的监听器
                myEmitter.on('event', () => {
                  console.log('B');
                });
              }
            });
            myEmitter.on('event', () => {
              console.log('A');
            });
            myEmitter.emit('event');
            // 打印:
            //   B
            //   A
      'removeListener'  事件实例移除事件时,在该事件实例上触发 
        用法类似'newListener' 
      'error'           事件实例中发生错误时,在该事件实例上会触发  
        若没有为 'error' 事件注册至少一个监听器,则当 'error' 事件触发时,
        会抛出错误、打印堆栈跟踪、且退出 Node.js 进程 
        
        const myEmitter = new EventEmitter();
        myEmitter.emit('error', new Error('whoops!'));
        // 抛出错误,并使 Node.js 崩溃 
        
        作为最佳实践,应该始终为 'error' 事件注册监听器 
        const myEmitter = new EventEmitter();
        myEmitter.on('error', (err) => {
          console.error('有错误');
        });
        myEmitter.emit('error', new Error('whoops!'));
    Feature: 
const stream = require('stream')   流,用于暂存和移动数据[以bufer的形式存在] 
  PS: Stream 是一个抽象接口,Node中有很多对象实现了这个接口 
    如对http服务器发起请求的request对象就是一个Stream,还有stdout[标准输出] 
  DefDec: 
    所有 Node.js API 创建的流都是专门运作在字符串和 Buffer（或 Uint8Array）对象上。 
    当然,流的实现也可使用其它类型的js值（除了 null,它在流中有特殊用途）,这些流会以“对象模式”进行操作。
    当创建流时,可以使用 objectMode 选项把流实例切换到对象模式。 
    试图将已经存在的流切换到对象模式是不安全的。
  Extend: stream.prototype.__proto__.constructor === events 
  stream.Writable 可写流类 
    PS: 消费数据,从可读流中读取数据,对数据块chunk进行处理 
    Extend: stream.Writable.prototype.__proto__ === stream.prototype  
    Events: 
      'close'  当流或其底层资源[比如文件描述符]被关闭时触发 
        该事件表明不会再触发其他事件,且不会再发生运算 
        不是所有可写流都会触发 'close' 事件。
      'drain'  回复可写入的状态时触发 
        如调用 stream.write(chunk) 返回 false,则在适合恢复写入数据到流时会触发'drain'事件 
      'error'  当写入数据出错或使用管道出错时触发 
        该事件触发时,流还未被关闭  
      'finish' 所有数据已被写入到底层系统时触发 
        调用 stream.end() 方法且缓冲数据都已经传给底层系统后触发 
      'pipe'   在可读流上调用 stream.pipe() 方法添加可写流到目标流向时触发  
        事件回调的参数: src  stream.Readable,通过管道流入到可写流的来源流 
      'unpipe' 当在可读流上调用 stream.unpipe() 方法从目标流向中移除当前可写流时触发 
        当可读流通过管道流向可写流发生错误时也会触发 
        事件回调的参数: src  stream.Readable,被移除写入管道的来源流 
    Proto: 
      .writableHighWaterMark  返回构造该可写流时传入的'highWaterMark'参数值 
      .writableLength  写入就绪队列的字节(或者对象)数 
      .cork()  强制所有写入数据都存放到内存中的缓冲区里  
      .uncork()  输出在 .cork() 方法被调用之后缓冲在内存中的所有数据 
      .destroy(err?)  摧毁流并发出错误;当这个函数被调用后,这个写入流就结束了 
      .end(chunk? ,encoding? ,callback?)  结束流,后续不可写 
        Input: 
          chunk     需要写入的数据 
            对于非对象模式下的流,须为: String/Buffer/Uint8Array 
            对于对象模式下的流,可为: 除了 null 的任意值 
          encoding  如果 chunk 是字符串,可指定字符编码 
          callback  流结束时的回调函数 
      .setDefaultEncoding(encoding)  为可写流设置encoding 
      .write(chunk? ,encoding? ,callback?)  向流中写入数据 
        Input: 
        Output: bol,是否在设定的'highWaterMark'阈值内 
  stream.Readable 可读流类 
    PS: 读取数据并暂存于bufer中 
      可'pause'和'resume' 
    Extend: stream.Readable.prototype.__proto__ === stream.prototype 
    Events: 
      'close' 将在流或其底层资源[比如一个文件]关闭后触发 
        事件触发后,该流将不会再触发任何事件 
        不是所有可读流都会触发'close'事件 
      'data'  在流将数据传递给消费者时触发 
        响应函数的参数: chunk  
          对于非对象模式的可读流,可为 String/Buffer 
          对于对象模式的可读流,可为除 null 以外的任意类型 JavaScript 值 
          若调用 readable.setEncoding() 为流指定了默认编码,回调函数将接收到一个字符串
        当流转换到 flowing 模式时会触发该事件 
          调用 readable.pipe()、readable.resume() 方法,
          或为 'data' 事件添加回调可以将流转换到 flowing 模式。 
          'data' 事件也会在调用 readable.read() 方法并有数据返回时触发。
        在没有明确暂停的流上添加'data'事件监听会将流转换为 flowing 模式 
          数据会在可用时尽快传递给下个流程 
      'end'   在流中再没有数据可供消费时触发 
        只有在数据被完全消费后才会触发 
          可通过将流转换到flowing模式,或反复调用 stream.read() 方法来实现
      'error' 出错时触发 
        响应函数的参数: err  Error对象 
        可在任何时候在可读流实现[Readable implementation]上触发
          如在底层系统内部出错从而不能产生数据,
          或当流的实现试图传递错误数据时发生。
      'readable' 在流中有数据可供读取时触发  
        PS: 在某些情况下,为'readable'事件添加回调将会导致一些数据被读取到内部缓存中 
          通常情况下,readable.pipe() 方法和 'data' 事件机制比 'readable' 事件更容易理解。
          然而处理 'readable'事件可能造成吞吐量升高。      
        'readable'事件表明流有了新的动态: 
          有了新的数据,stream.read() 将返回可用的数据 
          到了流的尾部,stream.read() 将返回 null 
            触发顺序在'end'事件前
    Proto: 
      .readableHighWaterMark   构造该可读流时传入的'highWaterMark'属性 
      .readableLength    num,
      .destroy(error?)  销毁流,并触发error事件 
        PS: 可读流将释放所有的内部资源 
      .isPaused()   bol,返回可读流的当前操作状态 
        主要在 readable.pipe() 方法的底层机制中用到,大多数情况下,没必要直接使用该方法 
        Example: 
          const readable = new stream.Readable();
          readable.isPaused(); // === false
          readable.pause();
          readable.isPaused(); // === true
          readable.resume();
          readable.isPaused(); // === false
      .pause()   使'flowing'模式的流停止触发'data'事件,进而切出'flowing'模式
        任何可用的数据都将保存在内部缓存中 
        Output: this
      .pipe(destination ,options? )  绑定一 [Writable][] 到 readable 上 
        PS: 将可写流自动切换到'flowing'模式并将所有数据传给绑定的[Writable][]
          数据流将被自动管理,即使是可读流较快,目标可写流也不会超负荷'overwhelmed'  
        Input: 
          destination    stream.Writable,数据写入目标 
          options        obj,可选,Pipe选项 {
            end: bol // 在reader结束时结束writer,默认:true 
              默认情况下,当源可读流触发'end'事件时,目标流也会调用 stream.end() 方法从而结束写入.  
              'end'选项指定为 false,可禁用这默认行为,这将使目标流保持打开
              若可读流在处理时发生错误,目标可写流不会自动关闭 
              若发生错误,需要手动关闭所有流以避免内存泄漏 
          }
        Output: 返回'目标流'的引用,可对流进行链式地管道操作 
        Example: 
          将 readable 中的所有数据通过管道传递给名为 file.txt 的文件：
          const readable = getReadableStreamSomehow();
          const writable = fs.createWriteStream('file.txt');
          // readable 中的所有数据都传给了 'file.txt'
          readable.pipe(writable);
        Feature: 
          可在单个可读流上绑定多个可写流  
            const r = fs.createReadStream('file.txt');
            const z = zlib.createGzip();
            const w = fs.createWriteStream('file.txt.gz');
            r.pipe(z).pipe(w);
      .read(size?)   从内部缓冲区中抽出并返回一些数据 
        Input: size   num,可选,确定读取数据的大小 
          如果没有指定size参数,则内部缓冲区包含的所有数据将返回 
        Output:  <string>|<Buffer>|<null> 读取的数据  
          无可读的数据,返回 null
          默认数据将作为'Buffer'对象返回,
          除非已经使用 readable.setEncoding() 方法设置编码或流运行在对象模式。
        Feature: 
          只应该在暂停模式下的可读流上运行 
          在流模式下,该方法自动调用直到内部缓冲区的数据完全耗尽。
          一般来说,建议避免使用'readable'事件和readable.read()方法,
          使用readable.pipe()或'data'事件代替
          在已经被发出的'end'事件后调用该方法事件将返回 null,不会抛出运行时错误 
          
      TODO: ★★★★★★★★★ 
        
        readable.resume() 
        返回： this
        readable.resume() 方法会重新触发 'data' 事件, 将暂停模式切换到流动模式。
        
        readable.resume() 方法可以用来充分使用流中的数据,而不用实际处理任何数据,如以下示例所示：
        
        getReadableStreamSomehow()
        .resume()
        .on('end', () => {
          console.log('Reached the end, but did not read anything.');
        });
        readable.setEncoding(encoding)#
        查看英文版参与翻译
        
        新增于: v0.9.4
        encoding <string> 要使用的编码
        Returns: this
        readble.setEncoding() 方法会为从可读流读入的数据设置字符编码
        
        默认返回Buffer对象。设置编码会使得该流数据返回指定编码的字符串而不是Buffer对象。例如,调用readable.setEncoding('utf-8')会使得输出数据作为UTF-8数据解析,并作为字符串返回。调用readable.setEncoding('hex')使得数据被编码成16进制字符串格式。
        
        可读流会妥善处理多字节字符,如果仅仅直接从流中取出Buffer对象,很可能会导致错误解码。
        
        const readable = getReadableStreamSomehow();
        readable.setEncoding('utf8');
        readable.on('data', (chunk) => {
          assert.equal(typeof chunk, 'string');
          console.log('got %d characters of string data', chunk.length);
        });
        readable.unpipe([destination])#
        查看英文版参与翻译
        
        新增于: v0.9.4
        destination <stream.Writable> 可选的,指定需要分离的目标流
        readable.unpipe() 方法将之前通过stream.pipe()方法绑定的流分离
        
        如果 destination 没有传入, 则所有绑定的流都会被分离.
        
        如果传入 destination, 但它没有被pipe()绑定过,则该方法不作为.
        
        const readable = getReadableStreamSomehow();
        const writable = fs.createWriteStream('file.txt');
        // All the data from readable goes into 'file.txt',
        // but only for the first second
        readable.pipe(writable);
        setTimeout(() => {
          console.log('Stop writing to file.txt');
          readable.unpipe(writable);
          console.log('Manually close the file stream');
          writable.end();
        }, 1000);
        readable.unshift(chunk)#
        查看英文版参与翻译
        
        版本历史
        chunk <Buffer> | <Uint8Array> | <string> | <any> 数据块移动到可读队列底部。对于不以对象模式运行的流,chunk 必须是字符串, Buffer 或者 Uint8Array。对于对象流, chunk 任何非null的值。
        readable.unshift() 方法会把一块数据压回到Buffer内部。 这在如下特定情形下有用： 代码正在消费一个数据流,已经"乐观地"拉取了数据。 又需要"反悔-消费"一些数据,以便这些数据可以传给其他人用。
        
        注意: 'end' 事件已经触发或者运行时错误抛出后,stream.unshift(chunk) 方法不能被调用。
        
        使用 stream.unshift() 的开发者一般需要换一下思路,考虑用一个[Transform][] 流替代. 更多信息请查看API for Stream Implementers部分。
        
        // Pull off a header delimited by \n\n
        // use unshift() if we get too much
        // Call the callback with (error, header, stream)
        const { StringDecoder } = require('string_decoder');
        function parseHeader(stream, callback) {
          stream.on('error', callback);
          stream.on('readable', onReadable);
          const decoder = new StringDecoder('utf8');
          let header = '';
          function onReadable() {
            let chunk;
            while (null !== (chunk = stream.read())) {
              const str = decoder.write(chunk);
              if (str.match(/\n\n/)) {
                // found the header boundary
                const split = str.split(/\n\n/);
                header += split.shift();
                const remaining = split.join('\n\n');
                const buf = Buffer.from(remaining, 'utf8');
                stream.removeListener('error', callback);
                // remove the readable listener before unshifting
                stream.removeListener('readable', onReadable);
                if (buf.length)
                stream.unshift(buf);
                // now the body of the message can be read from the stream.
                callback(null, header, stream);
              } else {
                // still reading the header.
                header += str;
              }
            }
          }
        }
        注意： 
        不像 stream.push(chunk),stream.unshift(chunk)在重置流的内部读取状态时是不会结束读取过程。 如果在读取过程中调用 readable.unshift() 则会导致异常 (例如：即来自自定义流上的 stream._read()内部方法上的实现)。 应该在调用 readable.unshift()方法之后适当调用 stream.push('') 来重置读取状态,执行读取的过程中最好避免调用 readable.unshift()方法。
        
        readable.wrap(stream)#
        查看英文版参与翻译
        
        新增于: v0.9.4
        stream <Stream> 一个老版本的readable stream
        Node.js在v0.10版本之前的流没有实现当前定义的所有流模块的API.(查看更多兼容性信息 Compatibility )
        
        当使用老版本的Node.js库来触发'data'事件和stream.pause()方法仅是建议性的, readable.wrap()方法能创建一个把老版本的流作为数据源的[Readable][] stream。
        
        几乎没有必要使用readable.wrap(),但是这个方法已经为老版本的Node.js应用和一些库提供了方便。
        
        例子：
        
        const { OldReader } = require('./old-api-module.js');
        const { Readable } = require('stream');
        const oreader = new OldReader();
        const myReader = new Readable().wrap(oreader);
        
        myReader.on('readable', () => {
          myReader.read(); // etc.
        });
      TODO: ★★★★★★★★★ 
    Feature: 
      可读流的两种模式: 
        PS: 只有提供了消费或忽略数据的机制后,可读流才会产生数据。 
          如果消费的机制被禁用或移除,则可读流会停止产生数据。
          为了向后兼容,移除 'data' 事件处理函数不会自动地暂停流。 
          如果存在管道目标,一旦目标变为 drain 状态并请求接收数据时,
          则调用 stream.pause() 也不能保证流会保持暂停状态。
        'paused'已暂停: 
          所有可读流都开始于'paused'模式 
          必须显式调用 stream.read() 方法来从流中读取数据片段
          切换到'flowing'的方法: 
            新增一个 'data' 事件处理函数。
            调用 stream.resume() 方法。
            调用 stream.pipe() 方法发送数据到可写流。
        'flowing'流动中: 
          数据自动地从底层的系统被读取,并通过 EventEmitter 接口的事件尽可能快地被提供给应用程序。
          如果可读流切换到 flowing 模式,且没有可用的消费函数处理数据,则这些数据将会丢失。 
          例如,当调用 readable.resume() 方法时,没有监听'data'事件或'data'事件的处理函数从流中被移除了       
          切换到'paused'的方法: 
            如果没有管道目标,调用 stream.pause() 方法。
            如果有管道目标,移除所有管道目标。调用 stream.unpipe() 方法可以移除多个管道目标。
      可读流的三种状态: 
        readable.readableFlowing = null 
          没有提供消费流数据的机制,所以流不会产生数据。 
          变为 true 
            监听 'data' 事件
            调用 readable.pipe() 方法
            调用 readable.resume() 方法, 
          变为 false  
            调用 readable.pause()
            调用 readable.unpipe()
            接收背压 
        readable.readableFlowing = false 
          暂时停止事件流动但不会停止数据的生成
          该状态下,为 'data' 事件设置监听器不会使 readable.readableFlowing 变成 true 
        readable.readableFlowing = true 
          可读流开始主动地产生数据触发事件 
  stream.Duplex 可读可写流 
  stream.Transform  读写过程中可修改或转换数据的'Duplex'流 
  ◆stm流对象的方法属性 
  stm.pause()    暂停流传输 
  stm.resume()   启动流传输 
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
const net = require("net") 底层的网络通信工具 
  PS: 包含创建服务器/客户端的方法 
  const server = new net.Server()  // 创建服务器 
    .listen(port,host,fn)      // 监听请求并执行回调 
      Input: 
        port   num,端口,1024-65535 之间, 1024 以下端口需管理员权限才能使用
        host   str,域名,空字符串""表示接受任意ip地址的连接 
        function(){ }  回调函数
      Output: 
    .address()    // obj,获取服务器的ip地址、ip协议及端口号 
      Output: { 
        address: <str>   // 监听ip,如: '127.0.0.1' 
        ,family: <str>   // ip协议,如: 'IPv4' 
        ,port: <num>     // 监听的端口号,如: 8080 
      } 
    .on('connection',fn)   // 'connection'事件,有连接建立时触发 
      Input: function(socket){ }   回调函数 
        socket 表示请求方信息的对象 
          PS: socket.io 是对websocket的封装,socket的一些属性表示连接的客户端的信息 
          .remoteAddress 
          .remotePort       操作系统分配给客户端的  
          .remoteFamily 
          .localAddress     客户端IP 
          .on('data',fn)    接收完数据时触发'data'事件 
            Input: function(data){ }  // 回调函数 
              data  buffer,接收到的数据[包括请求头和请求体]  
                通过.toString() 转换为字符串 
                  POST <path> HTTP/1.1   // 响应行 
                  Host:                 // 若干头信息 
                  ...
                  // 空行 
                  // 请求体
          .write(response)  发送响应数据[可发送多次] 
            response  响应的数据,可为'String'或"Buffer"类型 
            格式为: 'HTTP/1.1 200 OK\r\nContent-Length: 12\r\n\r\nHello world!';
            Content-Length 可选,告诉浏览器响应数据量,避免一直等待可和'destroy'二选一 
          .destroy()        结束本次服务器的响应[若不结束,浏览器会一直等待接收数据] 
      Output: 
    .on("error",foo)            服务器出错时触发'error'事件 
      foo  传入参数 (error) 
    .on("close",foo)            服务器关闭时触发'close'事件 
  创建TCP通信 
    PS: TCP服务器的通信是持续的,且可由服务器主动发送数据到客户端 
  const app = net.createServer(options? ,fn) // TCP服务端  
    Input: 
      options      可选,配置选项 
      function(socket){    // 执行'connect'事件[客户端连接]时回调 
        // socket   
        socket.on("data",function(data){  // 客户端发送数据时响应 
          // 
        })
        socket.on("close",function( ){    // 客户端连接断开时响应 
          // 
        })
      }  
  socket 
    Events: 
      'data'
      'close'
    Methods: 
      .write()  // 向客户端发送数据  
    Props: 
  const client = new net.Socket() // TCP客户端   
    .connect(port,host,foo)     向服务器发送连接请求,连接成功后回调  
      port   连接的端口 
      host   ip或域名[不可带'http://']
      foo    执行的回调,传入参数 () 
    .write(request)             发送请求  
      request   请求内容,格式为:'GET / HTTP/1.1\r\nHost: music.163.com\r\n\r\n' 
    .on("data",foo)         监听响应,接收数据完毕触发'data'事件[SelfThink] 
      foo  回调,传入参数 (data) 
        data  响应的数据,默认为Buffer类型,可通过'toString'方法转换成字符串 
    .destroy()              关闭请求连接 
    .on("close",foo)        监听关闭,关闭连接时触发'close'事件 
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
// 工具类 
const url = require('url')    用于解析URL  
  .parse(url,bol1?,bol2?)    // obj,将URL解析为对象[方便后续其他操作]
    Input: 
      url      str,传入需要解析的URL字符串  
      bol1     可选,是否将'query'字段转换为对象表示,默认:false 
      bol2     可选,当URL不全时更智能的识别,默认:false  
    Output: 返回一对象,属性枚举如下:  
      // url.parse("https://www.baidu.com?key=val");
      {          
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
  .format(obj)               // str,将url对象格式化为url字符串 
    Input: obj   url.parse 后的url对象 
    Output: str,将对象形式还原成字符串的URL 
    Example: 
      var obj = url.parse("https://www.baidu.com");
      url.format(obj); // 'https://www.baidu.com/'
  .resolve(path1,path2)  // str,拼接为URL 
    Input: 
      path1  str,地址 
      path2  str,地址  
    Output: str,拼接后的地址
    Example: 
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
const path = require("path")  处理文件路径 
  PS:
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
  .parse(<path>)  解析文件路径 
    Input: path  str,解析的文件路径 
    Output: 文件路径的对象表示 
      root: 根目录 
      dir: 目录部分
      base: 文件名及扩展名  
      name: 文件名 
      ext: 扩展名 
    Example: 
      'D:\\asserts\\img\\qq.png'
      { 
        root: 'D:\\',
        dir: 'D:\\asserts\\img',
        base: 'qq.png',
        ext: '.png',
        name: 'qq' 
      }
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
const qs = require("querystring")  解析URL的查询字符串  
  .stringify(obj,link1?,link2?)         对象序列化为字符串 
    Input: 
      obj   需序列化的对象
      link1 可选,参数连接符,默认:'&' 
      link2 可选,键值连接符,默认:'=' 
    Output: str,序列化成的字符串 
    Example: 
      querystring.stringify({
        name:"Scott",
        course:["Java","Node"],
        from:""
      })
      // 'name=Scott&course=Java&course=Node&from='
  .parse(query,link1?,link2?,options?)  字符串解析成为对象 
    Input: 
      query    str,需要解析的字符串
      link1    str,可选,键值连接符,默认:'&' 
        Example:
        var str = 'name=Scott-course=Java-course=Node-from=';
        var obj1 = querystring.parse(str);
        var obj2 = querystring.parse(str,'-');
        console.log(obj1,'/n',obj2);
        // { name: 'Scott-course=Java-course=Node-from=' } 
        // { name: 'Scott', course: [ 'Java', 'Node' ], from: '' }
      link2    str,可选,字段连接符,默认:'=' 
      options  obj,可选,其他配置  
    Output: obj,解析成键值对形式的对象
    Example: 
      querystring.parse('name=Scott&course=Java&course=Node&from=');
      // { name: 'Scott', course: [ 'Java', 'Node' ], from: '' }
  .escape(str)    转义为URL可用的字符串 
    Input: str  待转义的字符串 
    Output: str,转义后的字符串  
    Example:  
      querystring.escape("哈哈>._.<"); // '%E5%93%88%E5%93%88%3E._.%3C'
  .unescape(str)  反转义 
    Example: 
      querystring.unescape('%E5%93%88%E5%93%88%3E._.%3C'); // '哈哈>._.<'
  .unescapeBuffer()  
  .encode() 
  .decode() 
const sd = require('string_decoder')  字符串解码器 
const assert = require('assert')  断言 
  PS: 如果表达式不符合预期,就抛出一个错误 
    Node的内置模块; 该模块提供11个方法,但只有少数几个是常用的
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
  .ok(bol,str)  是assert方法的另一个名字,与assert方法完全一样
  .equal(actVal,expVal [,tip]);
    PS:equal方法内部使用的是相等运算符==,而不是严格运算符===,进行比较运算 
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
  .notEqual(actVal,expVal [,tip]);  只有在实际值等于预期值时,才会抛出错误
    PS:notEqual方法的用法与equal方法类似
      内部使用不相等运算符(!=),而不是严格不相等运算符(!==),进行比较运算 
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
  .deepEqual(actVal,expVal [,tip]); 比较两个对象
    两个对象的属性一一对应,且值都相等,就认为两个对象相等,否则抛出一个错误 
    Example:
      var assert = require('assert');
      var list1 = [1, 2, 3, 4, 5];
      var list2 = [1, 2, 3, 4, 5];
      assert.deepEqual(list1, list2, '预期两个数组应该有相同的属性');
      
      var person1 = { "name":"john", "age":"21" };
      var person2 = { "name":"john", "age":"21" };
      assert.deepEqual(person1, person2, '预期两个对象应该有相同的属性');
  .notDeepEqual(actVal,expVal [,tip]); 与deepEqual方法正好相反
    用来断言两个对象是否不相等
  .strictEqual(actVal,expVal [,tip])   使用严格相等'===',比较两个表达式
    Example:
      var assert = require('assert');
      assert.strictEqual(1, '1', '预期严格相等');
      // AssertionError: 预期严格相等
  .notStrictEqual(actVal,expVal [,tip]) 使用严格不相等'!==',比较两个表达式
  .throws(block, [error], [message])  预期某个代码块会抛出一个错误,且抛出的错误符合指定的条件
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
  .doesNotThrow(block, [message])     预期某个代码块不抛出错误 
    assert.doesNotThrow(
      function() {
        console.log("Nothing to see here");
      },
      '预期不抛出错误' 
    );
  .ifError(val)  断言某个表达式是否false
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
  .fail(actual, expected, message, operator)   用于抛出一个错误 
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
// 环境类 
const os = require("os")    提供了一些基本的系统操作函数 
  PS:
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
const v8 = require('v8')  v8引擎相关 
const vm = require('vm')  虚拟机 
const tty = require('tty') 终端 
  PS: 连接到远端的命令行 
const dns = require("dns")   域名解析 
  PS:
  .getServers()      // 获取ip 
  .lookup(host,fn)   // 查询网址的IP 
    Input: 
      host   str,查询的网址 
      function(error,ip,ipv){}  
        error  错误对象 
        ip     str,查询的ip  
        ipv    '4'或'6',表示ipv4或ipv6   
    Example: 
      const dns = require('dns');
      const host = 'zhihu.com';
      dns.lookup(host,(error,ip,ipv) => {
        console.log(ip,ipv); // 118.178.213.186  4 
      })
// 功能类  
const http = require("http")    提供HTTP服务器功能  
  PS: 用于搭建HTTP服务端和客户端 
  Web服务器 
    Web服务器一般指网站服务器,是指驻留于因特网上某种类型计算机的程序,
    Web服务器的基本功能就是提供Web信息浏览服务.
    它只需支持HTTP协议、HTML文档格式及URL,与客户端的网络浏览器配合.
    大多数 web 服务器都支持服务端的脚本语言php、python、ruby等,
    并通过脚本语言从数据库获取数据,将结果返回给客户端浏览器.
    目前最主流的三个Web服务器是Apache、Nginx、IIS.
    PHP需Apache 或 Nginx 的HTTP 服务器,并配上 mod_php5 模块和php-cgi,来处理客户端的请求 
    而Node可直接实现 HTTP 服务器 
  Web应用架构 
    Client   客户端,一般指浏览器,浏览器可以通过 HTTP 协议向服务器请求数据 
    Server   服务端,一般指Web服务器,可接收客户端请求,并向客户端发送响应数据 
    Business 业务层,通过Web服务器处理应用程序,如与数据库交互,逻辑运算,调用外部程序等
    Data     数据层,一般由数据库组成 
  ★类
  .Server,HSv,服务器   
    .listen(port ,ip?)              // 服务器监听ip及端口 
      Input: 
        port   num,监听的端口 
        ip     str,监听的ip地址,如: "127.0.0.1" 
      Output:  
  .ClientRequest,HCR,请求 
  .ServerResponse,HSR,响应 
  .IncomingMessage,HIM, 
    PS: 可用来访问响应状态、消息头、以及数据,也实现了可读流接口 
  .Agent,HAg,负责为HTTP客户端管理连接的持续与复用  
  ★属性 
  .METHODS   解析器支持的HTTP方法的列表  
  .STATUS_CODES  标准的HTTP响应状态码的集合,以及其简述 
  ★方法 
  .createServer(function(req ,res){  // HSv,创建服务器 
    req   请求 
      .url            // str,请求的地址 
      .on("data",function(    // 从请求体中接收数据时触发,会触发多次  
        PS: 通常用于获取POST请求数据  
        part  // 接收到的数据[来自请求体],将所有信息串起来就是请求的信息了   
      ){ })
      .on("end",function(  ){ // 请求数据传送完毕时触发  
        PS: GET、POST 请求都会触发该事件 
      })
      .setEncoding(                   // 设置请求的格式 
        type  // str,设置的格式,如: 'utf8'
      ) 
    res   响应 
      .writeHead(statusCode,headersObj)   设置响应状态码及响应头 
        Input: 
          statusCode      num,状态码,如: 200 
          headersObj =  { // obj,设置响应头信息的对象,格式如下: 
            "Content-Type":"text/plain; charset=utf-8" 
            ,...
          }   
        Output: 
      .write( data )  发送响应  
        data   str/binary,发送的响应数据 
      .end(data?)     结束响应并发送信息  
        data    str|binary,可选,若存在会将其发送 
  })   
    Input: callback,创建服务器的响应回调   
    Output: server  创建的服务器对象  
  .request(options ,function(res){   // 发送http请求 
    res   服务器的响应 
  })    
    Input: 
      options           str/obj,配置项参数 
        str  将被 url.parse 解析为对象
        obj = {
          method: KW     // 请求方法,默认:'get'
          ,host: str     // 服务器域名或ip地址
          ,hostname: str // host别名
          ,port: num     // 端口
          ,path: str     // 请求的路径 
          ,headers: {    // 请求头对象 
            // 
          }        
          ,auth: str     // 计算认证头的认证,一般为 user 和 password 
          ,agent: str    // 代理 
          ,keepAlive: ''      
          ,socketPath: ''     
          ,keepAliveMsecs: ''     
          ,localAddress: ''   
        } 
      function(res){}   可选,回调函数  
    Output:  可写的request实例流 
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
  .get(url ,function(res){           // 使用get方法请求指定url的数据  
    res.on('data',fn) 
    res.on('end',fn) 
  })              
    PS: 基于 http.request 的封装,
      相对于request,将请求方法默认为get,且自动调用req.end();
    Input: 
      url      str,请求的URL地址 
      fn       请求的回调  
    Output: 
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
const https = require("https")  https服务模块  
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
const tls = require('tls')  安全传输层 
const crypto = require('crypto')  提供加密和解密功能,基本上是对OpenSSL的包装 
  var hash = crypto.createHash(<ways>)   // 使用加密的算法  
    Input: ways    kw,加密算法  
      'md5'   MD5摘要算法 
      'sha1'  sha1摘要算法 
    Output: 加密对象 
  hash.update(<pwd>)    // 加密指定字符,并更新加密对象  
    Input: pwd  str,待加密的密码 
  hash.digest('hex')    // 返回16进制表示的加密值 
  var cipher = crypto.createCipher(<ways>,<key>) // 加密 
    Input: 
      ways   kw,加密的算法 
        'aes-256-cbc'  
      key    str,加密用的key 
    Output: 加密对象 
  var pwd1 = cipher.update(<pwd>,<inEncode>,<outEncode>)  // 进行加密 
    Input: 
      pwd        str,待加密的密码  
      inEncode   kw,输入的编码类型 
        'utf8'
      outEncode  kw,输出的编码类型 
        'hex'
    Output:  返回加密后的字符串
  pwd1 += cipher.final('hex')   // 加密
  var decipher = crypto.createDecipher(<ways>,<key>)  // 解密 
    Input: 
      ways   kw,解密的算法 
        'aes-256-cbc'
    Output:  解密对象 
  var pwd = decipher.update(<pwd1>,<inEncode>,<outEncode>) // 进行解密 
    Input: 
      pwd1       str,加密后的密码 
      inEncode   kw,输入的编码格式 
      outEncode  kw,输出的编码格式 
  pwd += decipher.final('utf8')   // 解密 
const fs = require('fs')    文件系统模块'file system',与文件系统交互  
  PS: fs模块可用于对系统文件及目录进行读写操作 
    NodeJS 提供一组类似 UNIX(POSIX)标准的文件操作API 
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
  .writeFile(path,data,options?, cb(err))   写内容到文件中 
    PS: 文件不存在则创建,但不会主动创建目录; 写入时会先清空文件
    Input: 
      path     str,路径及文件名 
      data     str,写入的内容  
      options  obj,可选,用于控制写入 
        .encoding   str,编码,默认: 'utf8' 
        .mode       num,模式,默认: 0666  
        .flag       操作的方式  
          "w"  重写,默认值,会清空文件之前的内容
          'a'  增加,在文件原有的基础上增加
      cb(err)  操作完毕后的回调函数  
        err   错误对象,操作成功则为: null 
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
  .writeFileSync()                           写文件 [同步] 
  .readFile(path,options?, cb(err,data))    读取文件内容 
    Input: 
      path         str,读取的文件路径及文件名 
      options      obj,可选,配置项 
        .encoding      编码,默认: null 
        .flag          默认:'r' 
      cb(err,data) 回调函数 
        err    读取文件出错时触发的错误对象 
        data   buffer,从文件读取的数据 
    Output: 
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
  .readFileSync()     // 同步读文件  
  .unlink(path,cb(err)); 删除文件
    Input: 
      path    str,路径及文件名
      cb(err) 回调函数 
    Example: 
      var file ='message.txt'
      fs.unlink(file,(err) =>{
        if (err) { throw err }
        console.log(`${file} 成功删除`)
      })
  .mkdir(path,mode,? cb(err)); 创建目录 
    PS: 当创建的文件夹和已存在的文件夹重名时会报错
    Input: 
      path     str,路径和目录名称
      mode     num,可选,设置目录的权限,默认: 0777
      cb(err)  回调函数 
    Example:
      var fs = require('fs'); // 引入fs模块
      fs.mkdir('./newdir', function(err) { // 创建 newdir 目录
        if (err) { throw err; }
        console.log('make dir success.');
      });
  .readdir(path,cb(err,files));  读取目录内文件&文件夹 
    Input: 
      path          str,路径和目录名称
      cb(err,files) 回调函数
        err 
        files  arr,成员为此目录下的文件/文件夹名称
    Example:
      结果输出当前目录下的所有文件及文件夹
      var fs = require('fs'); // 引入fs模块
      fs.readdir('./', function(err, files) {
        if (err) { throw err; }
        console.log(files);
      });
  .rmdir(path,cb);   删除目录 
    Input: 
      path     文件路径 
      cb       回调函数,无参数 
    Example:
      fs.rmdir("./新建文件夹",function(err){
        if (err) {
          console.log(err);
        }else {
          console.log("删除文件夹成功");
        }
      })
  .rename(oldPath,newPath,cb(err)) 重命名文件/文件夹 
    Input: 
      oldPath   str,旧文件路径 
      newPath   str,新文件路径 
      cb(err)   回调函数  
  .open(path,flags[,mode],callback); 打开文件
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
  .stat(path,callback); 获取文件信息
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
  .read(fd,buffer,offset,length,position,callback); 读取文件
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
  .close(fd,callback); 关闭文件
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
  .ftruncate(fd,len,callback); 截取文件          
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
  .exists(path)   检测文件是否存在 
  ★流相关 
  fs.createReadStream(path,options);  创建可读的stream流 
    为异步操作,不会阻塞后续代码执行 
    var readStream = fs.createReadStream('1.pm4');
  fs.createWriteStream(path,options); 创建可写的stream流 
const zlib = require('zlib')     压缩 
const cp = require('child_process')  创建子进程 
  .exec(command[,options],cfoo); 使用子进程执行命令,缓存子进程的输出
    将子进程的输出以回调函数参数的形式返回.
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
  .spawn(command[,args][,options]) 使用指定的命令行参数创建新进程
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
  .fork 是 spawn()的特殊形式,用于在子进程中运行的模块,用于创建进程
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
const cluster = require('cluster')  集群 
// 其他类  
已废弃 
  const domain = require("domain") 域 
    PS: 简化异步代码的异常处理,可以捕捉处理try catch无法捕捉的异常 
      domain模块,把处理多个不同的IO的操作作为一个组 
      注册事件和回调到domain,当发生一个错误事件或抛出一个错误时,
      domain对象会被通知,不会丢失上下文环境,也不导致程序错误立即推出,
      与process.on('uncaughtException')不同.
      Domain 模块可分为隐式绑定和显式绑定:
        隐式绑定: 把在domain上下文中定义的变量,自动绑定到domain对象
        显式绑定: 把不是在domain上下文中定义的变量,以代码的方式绑定到domain对象
  const punycode = require('punycode') 




