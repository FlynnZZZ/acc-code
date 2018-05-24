

console,用于调试的控制台对象 
  PS: 提供对浏览器控制台的接入,不同浏览器上可能存在差异  
    由IE的JScript引擎提供的调试工具,后来逐渐成为浏览器的事实标准 
    NodeJS沿用了这个标准,提供与习惯行为一致的console对象,
    用于向标准输出流(stdout)或标准错误流(stderr)输出字符.
  Member: 
    .log([val1][, ...])   在控制台输出若干个数据 
      格式占位符[DiBs] 
        PS: log方法将占位符替换以后的内容,显示在console窗口
        %s     字符串
        %d     整数
        %i     整数
        %f     浮点数
        %o     对象的链接
        %c     CSS格式字符串 
          对输出的内容进行CSS渲染
          console.log('%c%s','color:red;font-size:24px;','abc');
          输出的内容将显示为红色的24px的字体
        Example:
          console.log("%s + %s = %s", 1, 1, 2);  //  1 + 1 = 2
          console.log("访问地址为 http://%s:%s",host,port) 
          function colorLog(arg){  // 带颜色输出 
            console.log("%c%s","background:#afffee",arg)
          }
    .info([val][, ...])   在控制台输出若干个信息性消息 
      这个命令与 console.log 差别并不大,
      除了在chrome中只会输出文字外,其余的会显示一个蓝色的惊叹号.
    .error([val1][, ...]) 在控制台输出若干个错误消息 
      控制台在出现错误时会显示是红色的叉子.
    .warn([val1][, ...])  在控制台输出若干个警告消息 
      控制台出现有黄色的惊叹号 
    .clear()    清空控制台,光标回到第一行 
    .trace(msg) 当前执行的代码在堆栈中的调用路径 
      PS: 给待测试的函数中加入 console.trace() 就行了 
      msg   str,标识信息 
    .dir(obj[,options])  优化对对象的输出,单参数输出 
      PS: 以易于阅读的形式显示,可读性较好,一般用于输出显示DOM节点
      Node中可指定以高亮形式输出 
        console.dir(obj,{color:true})
    .table(val)   以表格形式显示,单参数输出 
      Example: :
      var languages = [
        { name: "JavaScript", fileExtension: ".js" },
        { name: "TypeScript", fileExtension: ".ts" },
        { name: "CoffeeScript", fileExtension: ".coffee" }
      ];
      console.table(languages);
      上面代码的language,转为表格显示如下.
     (index) name fileExtension
      0 "JavaScript" ".js"
      1 "TypeScript" ".ts"
      2 "CoffeeScript" ".coffee"
      复合型数据转为表格显示的条件是,必须拥有主键.
        对于上面的数组来说,主键就是数字键.对于对象来说,主键就是它的最外层键.
        var languages = {
          csharp: { name: "C#", paradigm: "object-oriented" },
          fsharp: { name: "F#", paradigm: "functional" }
        };
        console.table(languages);
        上面代码的language,转为表格显示如下.
       (index) name paradigm
        csharp "C#" "object-oriented"
        fsharp "F#" "functional"
    .count([counterName])   计数器,输出被调用的次数 
      counterName  str,计数器名称,默认:"" 
      Example:
        console.count('a');  // a: 1
        console.count('a');  // a: 2
      
        for (var i = 0; i < 5; i++) { 
          console.count(); 
        }
        // : 1
        // : 2
        // : 3
        // : 4
        // : 5
    ◆用于记录time和timeEnd间经历的时间,可计算一个操作所花费的准确时间 
      Example:
        console.time('aoo');
        var array = new Array(1000000);
        for(var i = array.length - 1; i >= 0; i--) {
          array[i] = new Object();
        };
        console.timeEnd("aoo"); 
        // aoo: 214.47802734375ms 
    .time(timerName)     计时器开始计时 
      timerName  str,计时器名称 
    .timeEnd(timerName)  计时器结束计时并输出 
      timerName  str,计时器名称 
    ◆分组显示,在group和groupEnd间输出的信息作为一个'组'
      PS: 在输出大量信息时有用 
    .group([val1,val2,...])  '组'的开始 
    .groupEnd()              '组'的结束 
    ◆性能测试
    .profile()     
    .profileEnd()   
    ◆其他 
    .assert([bool][,val]) 用于判断某个表达式或变量是否为真 
      PS:接收两个参数,第一个参数是表达式,第二个参数是字符串.
        只有当第一个参数为false,才会输出第二个参数,否则不会有任何结果.
      bool  布尔值,默认为false 
      Example:
        若为假,则显示一条事先指定的错误信息
        console.assert(true === false,"判断条件不成立")
        // Assertion failed: 判断条件不成立
        判断子节点的个数是否大于等于500.
        console.assert(list.childNodes.length < 500, "节点个数大于等于500")
    .dirxml()  以目录树形式显示DOM节点 
      若参数不是DOM节点,则等同于dir
    .debug(val)     Chrome不支持? 
  Expand: 
    修改/定义console方法 
      因为console对象的所有方法,都可以被覆盖
      
      使用自定义的console.log方法,在显示结果添加当前时间
      ["log", "info", "error"].forEach(function(method) {
        console[method] = console[method].bind(console,new Date().toISOString());
      });
      console.log("出错了！");
      // 2014-05-18T09:00.000Z 出错了！
  Feature: 
    控制台打开时,console的方法才会执行,且打印方法有运行较慢  
      var startTime = performance.now()
      for (var check = 0; check < 1000; check++){
        console.log(check);
      }
      if (performance.now() - startTime > 200){ 
        // 打开控制台会打印会弹窗,否则不弹窗 
        alert("打开了控制台"); 
      }
    控制台打印元素时,控制台会获取元素的id值 
      var div = document.createElement('div');
      Object.defineProperty(div,"id", {get: () => {
        alert("控制台打开了");
      }});
      console.log(div);










