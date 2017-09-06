浏览器 
  介绍_概念_说明_定义 
    说明 
      浏览器从同一个域同时下载文件的数量有限,当同时下载多个文件,会比相同大小的单个文件慢.
      浏览器在遇到<body>标签时才开始呈现内容
    主要组成
      渲染引擎: 将网页代码渲染成图像呈现,也叫浏览器内核
        PS:浏览器核心的部分是“Rendering Engine”,“渲染引擎”,一般称为“浏览器内核”。
          负责对网页语法的解释,如HTML、JavaScript并渲染（显示）网页。
          渲染引擎决定了浏览器如何显示网页的内容以及页面的格式信息。
          不同的浏览器内核对网页编写语法的解释也有不同,
          因此同一网页在不同的内核的浏览器里的渲染（显示）效果也可能不同.
        Blink    Chrome内核
          Blink是一个由Google和Opera Software开发的浏览器排版引擎,
          Google计划将这个渲染引擎作为Chromium计划的一部分。
          这一渲染引擎是开源引擎WebKit中WebCore组件的一个分支,并且在Chrome（28 及往后版本）、Opera（15 及往后版本）和Yandex浏览器中使用。
        Webkit   Safari内核,Chrome内核原型,开源
          它是苹果公司自己的内核,也是苹果的Safari浏览器使用的内核。
          Webkit引擎包含WebCore排版引擎及JavaScriptCore解析引擎,均是从KDE的KHTML及KJS引擎衍生而来,它们都是自由软件,在GPL条约下授权,同时支持BSD系统的开发。
          所以Webkit也是自由软件,同时开放源代码。在安全方面不受IE、Firefox的制约,所以Safari浏览器在国内还是很安全的。
          Google Chrome、360 极速浏览器以及搜狗高速浏览器高速模式也使用Webkit作为内核(在脚本理解方面,Chrome使用自己研发的V8引擎)。
          WebKit内核常见的浏览器:傲游浏览器3、[1]  Apple Safari (Win/Mac/iPhone/iPad)、Symbian手机浏览器、Android 默认浏览器,
        Gecko    Firefox内核
          Netscape6开始采用的内核,后来的Mozilla FireFox也采用了该内核,
          Gecko的特点是代码完全公开,因此,其可开发程度很高,
          全世界的程序员都可以为其编写代码,增加功能。
          IE没有使用W3C的标准,这导致了微软内部一些开发人员的不满；
          他们与当时已经停止更新了的 Netscape的一些员工一起创办了Mozilla,
          以当时的Mosaic内核为基础重新编写内核,于是开发出了Gecko。
          此外Gecko也是一个跨平台内核,可以在Windows、 BSD、Linux和Mac OS X中使用。
          JavaScript引擎是SpiderMonkey。
        Trident  IE内核
          1997 年的IE4中首次被采用,是微软在Mosaic代码的基础之上修改而来的,并沿用到IE11。
          微软很长时间都并没有更新Trident内核,
          导致了Trident内核曾经几乎与W3C标准脱节（2005 年）,
          Trident内核的大量 Bug等安全性问题没有得到及时解决,
          然后加上一些致力于开源的开发者和一些学者们公开自己认为IE浏览器不安全的观点,
          也有很多用户转向了其他浏览器,Firefox和Opera就是这个时候兴起的。
          非Trident内核浏览器的市场占有率大幅提高也致使许多网页开发人员开始注意网页标准和非IE浏览器的浏览效果问题。
          IE从版本11开始,初步支持WebGL技术。
          IE8的JavaScript引擎是Jscript,IE9开始用Chakra,
          这两个版本区别很大,Chakra无论是速度和标准化方面都很出色。
          Trident内核的常见浏览器有:
            IE6、IE7、IE8（Trident 4.0）
            IE9（Trident 5.0）
            IE10（Trident 6.0）
          360 安全浏览器
            1.0-5.0 为Trident
            6.0 为Trident+Webkit
            7.0 为Trident+Blink
          国内的厂商一般把其他内核叫做“高速浏览模式”,而Trident则是“兼容浏览模式”,用户可以来回切换。
        EdgeHTML Edge
        Presto   Opera前内核 [已废弃]
          Opera 12.17 及更早版本曾经采用的内核,现已停止开发并废弃,
          该内核在2003年的Opera7中首次被使用,
          该款引擎的特点就是渲染速度的优化达到了极致,然而代价是牺牲了网页的兼容性。
          Opera现已改用Google Chrome的Blink内核。
        渲染的四个阶段
          解析代码: HTML解析DOM,CSS解析为CSSOM,CSS Object Model
          对象合成: 将DOM和CSSOM合成渲染树,render tree
          布局    : 渲染树布局 layout
          绘制    : 将渲染树绘制到屏幕
          注:并非严格按顺序,可能有交叉,如HTML未下载完已有内容在浏览器中显示出来
        flow  : 渲染树到网页布局,称为"布局流"
        paint : 布局到网页显示为"绘制"
        reflow 和 repaint
          PS:页面生成后,JS操作和样式表操作都会触发flow和paint,称为"重流"和"重绘"
            reflow必然要repaint,反之则不然,
            如改变颜色只会repaint,改变元素的布局则会reflow和repaint,
            通常,浏览器browser会智能的将reflow和repaint限制在相关子树上, 以减小开销
          尽量减少重绘的次数和成本
            优先考虑底层DOM元素的变动而非高DOM;
            browser会累计DOM变动进行一次性执行,故将DOM操作进行集中处理
              如:读取或写入DOM,尽量居中不要混杂
              缓存DOM信息
              使用CSS class 一次性改变样式,而非一项一项的改变
            动画时尽量使用absolute 或 fixed 定位,减少对其他元素的影响
            使用document fragment 操作DOM
            window.requestAnimationFrame() 推迟代码到下次重流时执行,而非立即要求重流
              开销大
              function addHeight(elem){
                var height1 = elem.clientHeight;
                elem.style.height = (height * 2) + "px";
              }
              allElems.forEach(addHeight);
              开销小
              function addHeight(elem){
                var height1 = elem.clientHeight;
                window.requestAnimationFrame(function(){
                  elem.style.height = (height * 2) + "px";
                })
              }
              allElems.forEach(addHeight);
      JS引擎: 主要作用将网页中的JS代码读取、处理并运行,也叫JS解释器
        PS:JS为解释型语言,不需编译,由解释器运行
          好处: 运行和修改方便
          缺点: 每次运行需要调用解释器,系统开销大,运行速度慢于编译型语言
          为了提高运行速度,目前浏览器都将JS进行一定程度的编译,
          生成类似字节码的中间代码,以提高运行速度
        早期,browser对JS的处理过程:
          读取: 进行词法分析,lexical analysis ,分解成词元,token
          对token语法分析,parsing,成"语法树",syntax tree
          翻译器,translator将syntax tree翻译成字节码bytecode
          字节码解释器,bytecode interpreter将bytecode转换成机器码machine code
        JIT,即时编译,Just In Time compiler
          因为bytecode到machine code的过程低效,bytecode只在运行时编译,
          且缓存,inline cache编译结果;
          通常一程序经常用到的只是其中一部分代码,缓存机制让程序执行速度显著提升,
          不同browser的编译策略不同,如V8直接从syntax tree 到machine code
        JS虚拟机
          bytecode不能直接运行,需通过一虚拟机,Virtual Machine 运行,
          一般也将Virtual Machine 称为JS引擎,
          JS运行时未必有bytecode,
          所以JS Virtual Machine 不完全基于bytecode,而是部分基于,
          只要有可能,就通过JIT将源码source code转换到machine code
          常用的JS Virtual Machine 
            Chrome  V8
            Safari  Nitro
            Firefox SpiderMonkey
            IE      Chakra
            Opera   Carakan
    浏览器缓存
      反复的获取同一个URL(如JSONP请求),浏览器为了提高效率会加载缓存,会得到同样的缓存文件.
      Example: 
        var url="http://gumball.wickedlysmart.com/?callback=updateSales" + "&random=" + (new Date()).getTime();
        在URL的末尾增加一个数字,URL的实际访问地址没有变,但浏览器会认为其是新URL
  小技巧 
    通过浏览器地址栏运行HTML代码 [非IE浏览器内核」
      Example:  
      在浏览器地址栏直接输入 data:text/html,<a href=''> 13 </a>
      通过JS操作也可
        setTimeout(function(){
          location.href = 'data:text/html,<a href=""> 13 </a>';
        },1000);
  浏览器调试 
    说明 
      在调试页,选中的当前元素,可用 $0 表示'可在控制台使用$0查找到'
      IE是唯一一个在浏览器的界面显示JS错误信息的浏览器  [IE11已不再如此]
    自定义测试函数 
      // 待测试的函数
      var sum = function(array) {
        var s = 0;
        for(var i = 0; i < array.length; i++) {
          var n = array[i];
          s = s + n;
        }
        return s;
      }
      // 定义测试函数
      var ensure = function(condition) {
        if(!condition) {
          console.log("Wrong")
        }else{
          console.log("Pass");
        }
      }
      // 测试
      var testFunction = function() {
        var numbers = [1, 2, 3, 4]
        var value = 10
        ensure(value == sum(numbers))
        ensure(1 == sum([1]))
      }
      // 测试结果
      testFunction()
    控制台命令行: 控制台自带的命令行方法 
      $_     返回上一个表达式的值
      $0
      $1
      $2
      $3
      $4
      clear()  清空控制台
      copy()
      dir()
      dirxml()
      $(selector)   <=>  document.querySelectorAll(selector)
      $$(selector)  <=>  document.querySelector(selector)
      $x(path)  匹配特定Xpath表达式的所有DOM元素的数组
        Example:$x("//p[a]")  所有包含a元素的p元素
      inspect(obj)  在相关面板显示对象
        DOM元素在Elements面板中显示对象
        JS对象在Profiles面板中显示
      keys(obj)        返回对象的所有key
      values(obj)      返回对象的所有value
      getEventListeners(obj)   显示事件
      monitorEvents(obj[,events])    监听对象的事件
      unmonitorEvents(obj[,events])  取消监听对象的事件
        允许监听同一大类的事件,所有事件可以分成4大类
        mouse : mousedown mouseup click dbclick mousemove mouseover mouseout mousewheel
        key   : keydown keyup keypress textInput 
        touch : touchstart touchmove touchend touchcancel
        control : resize scroll zoom focus blur select change submit reset
    console 对象 
      PS:console对象为浏览器的实现,包含在浏览器自带的开发工具中, 
        虽然还不是标准,但各大浏览器都原生支持,已成为事实上的标准;
        由 Internet Explorer 的 JScript 引擎提供的调试工具,后来逐渐成为浏览器的事实标准.
        NodeJS 沿用了这个标准,提供与习惯行为一致的 console 对象,
        用于向标准输出流(stdout)或标准错误流(stderr)输出字符.
        指向Node内置的console模块,提供命令行环境中的标准输入、标准输出功能
      console.log([val1][, ...])   向标准输出流打印字符并以换行符结束
        PS: 该方法接收若干 个参数,若只有一个参数,则输出这个参数的字符串形式.
          若有多个参数,则 以类似于C 语言 printf() 命令的格式输出
        格式占位符
          PS:log方法将占位符替换以后的内容,显示在console窗口
          %s     字符串
          %d     整数
          %i     整数
          %f     浮点数
          %o     对象的链接
          %c     CSS格式字符串
            对输出的内容进行CSS渲染
            console.log('%c this text is styled!','color:red;font-size:24px;');
            输出的内容将显示为红色的24px的字体
          Example:
            console.log(" %s + %s = %s", 1, 1, 2);  //  1 + 1 = 2
            上面代码的 %s 表示字符串的占位符
    
            两种参数格式,可以结合在一起使用.
            console.log(" %s + %s ", 1, 1, "= 2")
            // 1 + 1  = 2
      console.info([val][, ...])   返回信息性消息 
        这个命令与 console.log 差别并不大,
        除了在chrome中只会输出文字外,其余的会显示一个蓝色的惊叹号.
      console.error([val1][, ...]) 输出错误消息 
        控制台在出现错误时会显示是红色的叉子.
      console.warn([val1][, ...])  输出警告消息 
        控制台出现有黄色的惊叹号.
      console.dir(obj[, options])  用来对一个对象进行检查[inspect],并以易于阅读和打印的格式显示.
        可读性较好,一般用于输出显示DOM节点
        Node中可指定以高亮形式输出
          console.dir(obj,{color:true})
      console.trace(message[,...]) 当前执行的代码在堆栈中的调用路径 
        这个测试函数运行很有帮助,只要给想测试的函数里面加入 console.trace 就行了.
      console.assert([bool][,val]) 用于判断某个表达式或变量是否为真 
        PS:接收两个参数,第一个参数是表达式,第二个参数是字符串.
          只有当第一个参数为false,才会输出第二个参数,否则不会有任何结果.
        bool  布尔值,默认为false 
        Example:
          若为假,则显示一条事先指定的错误信息
          console.assert(true === false,"判断条件不成立")
          // Assertion failed: 判断条件不成立
          判断子节点的个数是否大于等于500.
          console.assert(list.childNodes.length < 500, "节点个数大于等于500")
      console.debug(val)     
      console.dirxml()             主要用于以目录树形式显示DOM节点
        若参数不是DOM节点,则等同于dir
      console.table()              对于某些复合类型的数据将其转为表格显示
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
      console.count([val])         用于计数,输出被调用的次数 
        接收一个参数作为标签,进行相应的次数统计
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
      console.clear()         清空控制台,光标回到第一行
      ◆用于记录time和timeEnd间经历的时间,可计算一个操作所花费的准确时间 
      console.time()         计时开始
      console.timeEnd(val)   计时结束
        val 为计时器的名称
        Example:
          console.time();
          var array = new Array(1000000);
          for(var i = array.length - 1; i >= 0; i--) {
            array[i] = new Object();
          };
          console.timeEnd("aoo"); 
          // aoo: 242ms
        调用timeEnd方法之后,console窗口会显示'计时器名称: 所耗费的时间'.
      ◆性能测试
      console.profile() 
      console.profileEnd()   
      ◆分组显示
      console.group(val)   '组'的开始
      console.groupEnd()   '组'的结束
        str  作为'组'的名称
        在group和groupEnd之间打印的信息可作为一个'组'进行展开或折叠,在输出大量信息时有用
      修改/定义console方法 
        因为console对象的所有方法,都可以被覆盖
        
        使用自定义的console.log方法,在显示结果添加当前时间
        ["log", "info", "error"].forEach(function(method) {
          console[method] = console[method].bind(console,new Date().toISOString());
        });
        console.log("出错了！");
        // 2014-05-18T09:00.000Z 出错了！
    断点调试 [Chrome浏览器下] 
      f12 - Sources 进入断点调试界面
      在程序中添加语句 debuger; 相当于在语句处添加断点
    Exp: 
      不可见符号及空格
        var i = String.fromCharCode(0) +'1'; //"1"
        // ASCII码 0 对应的是null 控制符 不可写的也不显示的符号
        console.log(i,typeof i,i.length); //1 string 2
  
        var a ='2 '
        console.log(a);         //2
        console.log(`(${a})`);  //(2 )
        // 方便查看出字符中的空格
      在手机等不可打开控制台的设备上调试时 
        console.log()不可见,而 alert阻塞运行, 
        使用在页面中相应的改变元素来达到感知的效果 
  Todo: 
    浏览器的组成
    浏览器的核心是两部分:渲染引擎和JavaScript解释器（又称JavaScript引擎）。
    
    渲染引擎
    渲染引擎的主要作用是,将网页代码渲染为用户视觉可以感知的平面文档。
    
    不同的浏览器有不同的渲染引擎。
    
    Firefox:Gecko引擎
    Safari:WebKit引擎
    Chrome:Blink引擎
    IE: Trident引擎
    Edge: EdgeHTML引擎
    渲染引擎处理网页,通常分成四个阶段。
    
    解析代码:HTML代码解析为DOM,CSS代码解析为CSSOM（CSS Object Model）
    对象合成:将DOM和CSSOM合成一棵渲染树（render tree）
    布局:计算出渲染树的布局（layout）
    绘制:将渲染树绘制到屏幕
    以上四步并非严格按顺序执行,往往第一步还没完成,第二步和第三步就已经开始了。所以,会看到这种情况:网页的HTML代码还没下载完,但浏览器已经显示出内容了。
    
    重流和重绘
    渲染树转换为网页布局,称为“布局流”（flow）；布局显示到页面的这个过程,称为“绘制”（paint）。它们都具有阻塞效应,并且会耗费很多时间和计算资源。
    
    页面生成以后,脚本操作和样式表操作,都会触发重流（reflow）和重绘（repaint）。用户的互动,也会触发,比如设置了鼠标悬停（a:hover）效果、页面滚动、在输入框中输入文本、改变窗口大小等等。
    
    重流和重绘并不一定一起发生,重流必然导致重绘,重绘不一定需要重流。比如改变元素颜色,只会导致重绘,而不会导致重流；改变元素的布局,则会导致重绘和重流。
    
    大多数情况下,浏览器会智能判断,将重流和重绘只限制到相关的子树上面,最小化所耗费的代价,而不会全局重新生成网页。
    
    作为开发者,应该尽量设法降低重绘的次数和成本。比如,尽量不要变动高层的DOM元素,而以底层DOM元素的变动代替；再比如,重绘table布局和flex布局,开销都会比较大。
    
    var foo = document.getElementById('foobar');
    
    foo.style.color = 'blue';
    foo.style.marginTop = '30px';
    上面的代码只会导致一次重绘,因为浏览器会累积DOM变动,然后一次性执行。
    
    下面是一些优化技巧。
    
    读取DOM或者写入DOM,尽量写在一起,不要混杂
    缓存DOM信息
    不要一项一项地改变样式,而是使用CSS class一次性改变样式
    使用document fragment操作DOM
    动画时使用absolute定位或fixed定位,这样可以减少对其他元素的影响
    只在必要时才显示元素
    使用window.requestAnimationFrame(),因为它可以把代码推迟到下一次重流时执行,而不是立即要求页面重流
    使用虚拟DOM（virtual DOM）库
    下面是一个window.requestAnimationFrame()对比效果的例子。
    
    // 重绘代价高
    function doubleHeight(element) {
      var currentHeight = element.clientHeight;
      element.style.height = (currentHeight * 2) + 'px';
    }
    
    all_my_elements.forEach(doubleHeight);
    
    // 重绘代价低
    function doubleHeight(element) {
      var currentHeight = element.clientHeight;
    
      window.requestAnimationFrame(function () {
        element.style.height = (currentHeight * 2) + 'px';
      });
    }
    
    all_my_elements.forEach(doubleHeight);
    JavaScript引擎
    JavaScript引擎的主要作用是,读取网页中的JavaScript代码,对其处理后运行。
    
    JavaScript是一种解释型语言,也就是说,它不需要编译,由解释器实时运行。这样的好处是运行和修改都比较方便,刷新页面就可以重新解释；缺点是每次运行都要调用解释器,系统开销较大,运行速度慢于编译型语言。
    
    为了提高运行速度,目前的浏览器都将JavaScript进行一定程度的编译,生成类似字节码（bytecode）的中间代码,以提高运行速度。
    
    早期,浏览器内部对JavaScript的处理过程如下:
    
    读取代码,进行词法分析（Lexical analysis）,将代码分解成词元（token）。
    对词元进行语法分析（parsing）,将代码整理成“语法树”（syntax tree）。
    使用“翻译器”（translator）,将代码转为字节码（bytecode）。
    使用“字节码解释器”（bytecode interpreter）,将字节码转为机器码。
    逐行解释将字节码转为机器码,是很低效的。为了提高运行速度,现代浏览器改为采用“即时编译”（Just In Time compiler,缩写JIT）,即字节码只在运行时编译,用到哪一行就编译哪一行,并且把编译结果缓存（inline cache）。通常,一个程序被经常用到的,只是其中一小部分代码,有了缓存的编译结果,整个程序的运行速度就会显著提升。不同的浏览器有不同的编译策略。有的浏览器只编译最经常用到的部分,比如循环的部分；有的浏览器索性省略了字节码的翻译步骤,直接编译成机器码,比如chrome浏览器的V8引擎。
    
    字节码不能直接运行,而是运行在一个虚拟机（Virtual Machine）之上,一般也把虚拟机称为JavaScript引擎。因为JavaScript运行时未必有字节码,所以JavaScript虚拟机并不完全基于字节码,而是部分基于源码,即只要有可能,就通过JIT（just in time）编译器直接把源码编译成机器码运行,省略字节码步骤。这一点与其他采用虚拟机（比如Java）的语言不尽相同。这样做的目的,是为了尽可能地优化代码、提高性能。下面是目前最常见的一些JavaScript虚拟机:
    
    Chakra(Microsoft Internet Explorer)
    Nitro/JavaScript Core (Safari)
    Carakan (Opera)
    SpiderMonkey (Firefox)
    V8 (Chrome, Chromium)    
  Chrome 
    js报错: Uncaught RangeError: Invalid string length
      原因:多重遍历过程中,重复使用变量i导致,把内for循环的变量i换成j.
  Firefox
  IE
  Safari
网页的显示过程 
  ◆自我总结 
    网页从打开到显示包括: 下载 解析 渲染 
    首先将HTML下载下来,并逐行开始解析 
    遇到<link>、<script>、<img>等,开始下载,并继续向下解析直至完毕,
    然后准备从头开始渲染, 
    对于CSS不同浏览器的HTML渲染策略不同
    对于JS会将前面的HTML渲染,遇到JS会暂停渲染等待解析执行后,继续渲染
  
  浏览器加载网页过程 
    一个网页的加载依赖于脚本文件、CSS样式文件。浏览器加载网页的过程如下:
    首先,浏览器下载 HTML 并开始解析。如果浏览器发现外部CSS资源链接则发送下载请求。
    浏览器可以在下载CSS资源的同时,并行解析HTML文件,
    但是,一旦发现有脚本文件的引用,则必须等待脚本文件完成下载并且执行后才能继续解析。
    脚本文件完成下载并且执行后,浏览器可以继续解析HTML工作,
    如果遇到非阻塞资源浏览器会发送下载请求并且继续解析。
    即使浏览器可以并行执行多个请求,但是无法与针对脚本文件的操作并行执行。
  一个页面从输入 URL 到页面加载显示完成,这个过程中都发生了什么？（流程说的越详细越好）
    详细版:
      1、浏览器会开启一个线程来处理这个请求,对 URL 分析判断如果是 http 协议就按照 Web 方式来处理;
      2、调用浏览器内核中的对应方法,比如 WebView 中的 loadUrl 方法;
      3、通过DNS解析获取网址的IP地址,设置 UA 等信息发出第二个GET请求;
      4、进行HTTP协议会话,客户端发送报头(请求报头);
      5、进入到web服务器上的 Web Server,如 Apache、Tomcat、Node.JS 等服务器;
      6、进入部署好的后端应用,如 PHP、Java、JavaScript、Python 等,找到对应的请求处理;
      7、处理结束回馈报头,此处如果浏览器访问过,缓存上有对应资源,会与服务器最后修改时间对比,一致则返回304;
      8、浏览器开始下载html文档(响应报头,状态码200),同时使用缓存;
      9、文档树建立,根据标记请求所需指定MIME类型的文件（比如css、js）,同时设置了cookie;
      10、页面开始渲染DOM,JS根据DOM API操作DOM,执行事件绑定等,页面显示完成。
    简洁版:
      浏览器根据请求的URL交给DNS域名解析,找到真实IP,向服务器发起请求；
      服务器交给后台处理完成后返回数据,浏览器接收文件（HTML、JS、CSS、图象等）；
      浏览器对加载到的资源（HTML、JS、CSS等）进行语法解析,建立相应的内部数据结构（如HTML的DOM）；
      载入解析到的资源文件,渲染页面,完成。    
  网页从开始请求到最终显示的过程 
    1 浏览器中输入网址,发送至DNS服务器并获得域名对应的WEB服务器的IP地址 
    2 与WEB服务器建立TCP连接,浏览器向WEB服务器的IP地址发送相应的HTTP请求 
    3 WEB服务器响应请求并返回指定URL的数据或错误信息,若有重定向则重定向到新的URL地址 
    4 浏览器下载数据并解析HTML源文件,解析过程中实现对页面的排版,解析完成后显示基础页面 
    5 下载其他资源如图片等 
    
  下载HTML文档,从头开始顺序解析,
  解析中遇到script标签,停止HTML的解析,JS引擎工作,边下载边解析JS,
  解析完毕后,恢复HTML的解析
  原因: JS可能修改DOM,故浏览器优先执行JS
  Gecko和Webkit引擎在网页被阻塞后,会生成第二个线程解析文档,下载外部资源,
  但是不会修改DOM,网页还是处于阻塞状态。
  
  JS脚本的执行也是顺序执行,但下载时会同时进行,
  也就是说,脚本的执行顺序由它们在页面中的出现顺序决定,
  当然,执行多个脚本都会产生'阻塞效应',
  必须等到它们都执行完,浏览器才会继续页面渲染。
  
  下载CSS会阻塞页面后续HTML的渲染,因为不知道后续HTML渲染的样式,
  但会同时下载多个CSS,
  对于来自同一个域名的资源,比如脚本文件、样式表文件、图片文件等,
  不同浏览器同时下载的资源数量有差异, 
  若是来自不同域名的资源,就没有这个限制,故可把静态文件放在不同的域名下以加快下载速度 
  当CSS处于部分HTML标签之后时, Firefox和Chrome的渲染策略不同,
  Firefox会先将无样式的部分HTML渲染,等CSS加载后在显示完整的部分HTML,
  Chrome会等CSS加载后显示完整的部分HTML,之前不显示
  故将CSS置于head中 
浏览器 
  URL中的参数 lastreporttime 
    在URL末尾增加一个 lastreporttime 参数,表示只会加载该参数时间之后的报告.
    Example:
    'http://gumball.wickedlysmart.com/?lastreporttime=1302212903099'
    指定的时间为一串数字,单位为毫秒.
  浏览器检测 
    检测是否为 IE6、7、8、9 [不支持 IE10、11]
      var isIE = function(num){
        var b = document.createElement('b')
        b.innerHTML = '<!--[if IE ' + num + ']><i></i><![endif]-->'
        return b.getElementsByTagName('i').length === 1
      }
      alert(
        'ie6:' + isIE(6) + '\n' + 
        'ie7:' + isIE(7) + '\n' + 
        'ie8:' + isIE(8) + '\n' + 
        'ie9:' + isIE(9) + '\n' + 
        // 'ie10:' + isIE(10) + '\n' + 
        // 'ie11:' + isIE(11) + '\n' + 
        'ie:' + isIE()
      );
  网页多语言支持 
    采用统一编码UTF-8方式编码
      所以对提供了多语言版本的网站来说,Unicode字符集应该是最理想的选择。
      它是一种双字节编码机制的字符集,不管是东方文字还是西方文字,在Unicode中一律用两个字节来表示,
      因而至少可以定义65536个不同的字符,几乎可以涵盖世界上目前所有通用的语言的每一种字符。
      所以在设计和开发多语言网站时,一定要注意先把非中文页面的字符集定义为“utf-8”格式,
      这一步非常重要,原因在于若等页面做好之后再更改字符集设置,可说是一件非常非常吃力不讨好的工作,
      有时候甚至可能需要从头再来,重新输入网站的文字内容。
    多语言网站实现计划 :
      静态:就是为每种语言分辨准备一套页面文件,
        通过文件后缀名来区分不同语言,
          例如对于首页文件index_en.htm供给英语界面,index_gb.htm供给简体中文界面,index_big.htm供给繁体中文界面
        通过子目录来区分不同语言。
          或者是en/index.htm供给英语界面,gb/index.htm供给简体中文界面,big/index.htm供给繁体中文界面
        一旦用户选择了需要的语言后,主动跳转到相应的页面,首页以下其他链接也是按照同样方法处理。
        从保护的角度来看,通过子目录比通过文件后缀名来区分不同语言版本显得要简略明了
      动态:站点内所有页面文件都是动态页面文件（PHP,ASP等）而不是静态页面文件,
       在需要输出语言文字的处所同一采用语言变量来表现,这些语言变量可以根据用户选择不同的语言赋予不同的值,
       从而实现在不同的语言环境下输出不同的文字。
        例如:语言变量ln_name,当用户选择的语言是英语时赋值为“Name”,
        当用户选择的语言是简体中文时赋值为“姓名”,这样就可以适应不同语言时的输出。
      优缺点
        采用静态方法的长处是页面直接输出到客户端,不需要在服务器上运行,占用服务器的资源比拟少,
          系统能够支撑的并发连接数较多,
          毛病是要为每种语言制作一套页面文件,很多内容即使是和语言无关的也要分不同语言来存储,占用的存储空间较多。
        采用动态方法和静态方法的优毛病正好相反,它的长处是动态页面文件只有一套,不同语言的文字应用语言变量来存储,
          和语言无关的内容只存储一份,占用的存储空间较少,并且扩大新语言比拟轻易,
          毛病需要在服务器上运行,然后把成果输进到客户端,占用服务器的资源比拟多,系统能够支撑的并发连接数较少。
  
    根据navigator.language我们可以获取到浏览器的语言设置
    如果是中文的话返回的是zh-CN, 英文的话返回的可能是en,en-US等其它的
    一般情况下（一般系统和浏览器的语言一致的。当操作系统是中文,浏览器是英文,只能用服务器脚本去判断）是没有问题啦。
    navigator.language对IE的支持不是很好,IE的话可以选用navigator.userLanguage判断操作系统的语言      
  在浏览器中,length 的值默认为0  why?
网页的加载过程 
JS代码引入、执行 
  嵌入式:html标签中插入,作为某个元素的属性值或超链接的href属性值.
    // 通过一个链接弹出一个确认框
    <a href="javascript:confirm('hello');">hello</a>
    // 点击一段文字弹出一个提示框
    <p onclick="javascript:alert('我是弹出来的内容');">点我</p>
  内部JS: <script type="text/javascript">/*JS代码*/</script>
    内部JS中不可出现"</script>"字符串
      <script> alert("</script>"); </script>
      网页上会显示出: );
      不会执行出 alert("</script>"),(可改为alert("</scr"+"ipt>"))
      浏览器执行到alert中的</script>时会以为是script的结束标签.
      外部JS则可以执行 alert("</script>")
  外部JS: <script src="JS文件路径"></script>
    放置位置:一般将script标签放在body的最后面,也可以放入head中
    外部的JS的优点:
      维护性高
      可缓存(加载一次,无需加载):若有两个页面使用同一个文件,只需下载一次.
      方便未来扩展
    script加载使用的协议
      默认采用http协议 
      <script src="example.js" charset="utf-8"></script>
      采用https
      <script src="https://example.js" charset="utf-8"></script>
      根据页面本身的协议来决定
      <script src="//example.js" charset="utf-8"></script>
    Remarks:
      外部JS文件带有.js扩展名,但这个扩展名是非必须的,浏览器不会检查JS文件的扩展名.
      若不使用.js扩展名,需确保服务器能返回正确的MIME类型
  异步加载JS的方式
    一:<script>标签的 async="async"属性.
      HTML5 中新增的属性,Chrome、FF、IE9&IE9+均支持
      脚本相对于页面的其余部分异步地执行(当页面继续进行解析的同时,脚本将被执行)
      async 属性仅适用于外部脚本(只有在使用 src 属性时)
      该方法不能保证脚本按顺序执行(当有多个该属性的script时)
    二:<script>标签的 defer="defer"属性.
      规定脚本执行延迟,直到页面加载完毕,再执行
      兼容所有浏览器.此外,这种方法可以确保所有设置 defer 属性的脚本按顺序执行.
    三:AJAX eval
      使用 AJAX 得到脚本内容,然后通过 eval_r(xmlhttp.responseText)来运行脚本
      兼容所有浏览器.
    四:iframe 方式
      可以参照:iframe 异步加载技术及性能中关于 Meboo 的部分
      兼容所有浏览器.
    五: 在JS文件中创建script元素对象,按照要求添加到DOM中
      如创建script对象 然后在添加src地址;
      动态加入的JS需在CSS文件加载完后才会去下载
      动态生成的script不会阻塞页面渲染,但无法保证JS的执行顺序,
      先加载完的JS先执行,将其async属性设置为false 保证执行顺序
      ['a.js','b.js'].forEach(function(scr){
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.append(script);
      })
  Todo: 
    JavaScript代码嵌入网页的方法
      JavaScript代码只有嵌入网页,才能在用户浏览器网页时运行。

      网页中嵌入JavaScript代码,主要有四种方法。

      <script>标签:代码嵌入网页
      <script>标签:加载外部脚本
      事件属性:代码写入HTML元素的事件处理属性,比如onclick或者onmouseover
      URL协议:URL支持以javascript:协议的方式,执行JavaScript代码
      后两种方法用得很少,常用的是前两种方法。由于内容(HTML代码)和行为代码(JavaScript)应该分离,所以第一种方法应当谨慎使用。

      script标签:代码嵌入网页
      通过<script>标签,可以直接将JavaScript代码嵌入网页。

      <script>
        console.log('Hello World');
      </script>
      <script>标签有一个type属性,用来指定脚本类型。对JavaScript脚本来说,type属性可以设为两种值。

      text/javascript:这是默认值,也是历史上一贯设定的值。若你省略type属性,默认就是这个值。对于老式浏览器,设为这个值比较好。
      application/javascript:对于较新的浏览器,建议设为这个值。
      <script type="application/javascript">
        console.log('Hello World');
      </script>
      由于<script>标签默认就是JavaScript代码。所以,嵌入JavaScript脚本时,type属性也可以省略。

      若type属性的值,浏览器不认识,那么它不会执行其中的代码。利用这一点,可以在<script>标签之中嵌入任意的文本内容,然后加上一个浏览器不认识的type属性即可。

      <script id="mydata" type="x-custom-data">
        console.log('Hello World');
      </script>
      上面的代码,浏览器不会执行,也不会显示它的内容,因为不认识它的type属性。但是,这个<script>节点依然存在于DOM之中,可以使用<script>节点的text属性读出它的内容。

      document.getElementById('mydata').text
      // "
      //   console.log('Hello World');
      // "
      script标签:加载外部脚本
      <script>标签也可以指定加载外部的脚本文件。

      <script src="example.js"></script>
      若脚本文件使用了非英语字符,还应该注明编码。

      <script charset="utf-8" src="example.js"></script>
      所加载的脚本必须是纯的 JavaScript 代码,不能有HTML代码和<script>标签。

      加载外部脚本和直接添加代码块,这两种方法不能混用。下面代码的console.log语句直接被忽略。

      <script charset="utf-8" src="example.js">
        console.log('Hello World!');
      </script>
      为了防止攻击者篡改外部脚本,script标签允许设置一个integrity属性,写入该外部脚本的Hash签名,用来验证脚本的一致性。

      <script src="/assets/application.js"
        integrity="sha256-TvVUHzSfftWg1rcfL6TIJ0XKEGrgLyEq6lEpcmrG9qs=">
      </script>
      上面代码中,script标签有一个integrity属性,指定了外部脚本/assets/application.js的SHA265签名。一旦有人改了这个脚本,导致SHA265签名不匹配,浏览器就会拒绝加载。

      事件属性
      某些HTML元素的事件属性(比如onclick和onmouseover),可以写入JavaScript代码。当指定事件发生时,就会调用这些代码。

      <div onclick="alert('Hello')"></div>
      上面的事件属性代码只有一个语句。若有多个语句,用分号分隔即可。

      URL协议
      URL支持javascript:协议,调用这个URL时,就会执行JavaScript代码。

      <a href="javascript:alert('Hello')"></a>
      浏览器的地址栏也可以执行javascipt:协议。将javascript:alert('Hello')放入地址栏,按回车键,就会跳出提示框。

      若JavaScript代码返回一个字符串,浏览器就会新建一个文档,展示这个字符串的内容,原有文档的内容都会消失。

      <a href="javascript:new Date().toLocaleTimeString();">
        What time is it?
      </a>
      上面代码中,用户点击链接以后,会打开一个新文档,里面有当前时间。

      若返回的不是字符串,那么浏览器不会新建文档,也不会跳转。

      <a href="javascript:console.log(new Date().toLocaleTimeString())">
      What time is it?
      </a>
      上面代码中,用户点击链接后,网页不会跳转,只会在控制台显示当前时间。

      javascript:协议的常见用途是书签脚本Bookmarklet。由于浏览器的书签保存的是一个网址,所以javascript:网址也可以保存在里面,用户选择这个书签的时候,就会在当前页面执行这个脚本。为了防止书签替换掉当前文档,可以在脚本最后返回void 0。
    脚本的动态加载
      除了静态的script标签,还可以动态生成script标签,然后加入页面,从而实现脚本的动态加载。
      
      ['a.js', 'b.js'].forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
      });
      这种方法的好处是,动态生成的script标签不会阻塞页面渲染,也就不会造成浏览器假死。但是问题在于,这种方法无法保证脚本的执行顺序,哪个脚本文件先下载完成,就先执行哪个。
      
      若想避免这个问题,可以设置async属性为false。
      
      ['a.js', 'b.js'].forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
      });
      上面的代码依然不会阻塞页面渲染,而且可以保证b.js在a.js后面执行。不过需要注意的是,在这段代码后面加载的脚本文件,会因此都等待b.js执行完成后再执行。
      
      我们可以把上面的写法,封装成一个函数。
      
      (function() {
        var scripts = document.getElementsByTagName('script')[0];
        function load(url) {
          var script = document.createElement('script');
          script.async = true;
          script.src = url;
          scripts.parentNode.insertBefore(script, scripts);
        }
        load('//apis.google.com/js/plusone.js');
        load('//platform.twitter.com/widgets.js');
        load('//s.thirdpartywidget.com/widget.js');
      }());
      上面代码中,async属性设为true,是因为加载的脚本没有互相依赖关系。而且,这样就不会造成堵塞。
      
      若想为动态加载的脚本指定回调函数,可以使用下面的写法。
      
      function loadScript(src, done) {
        var js = document.createElement('script');
        js.src = src;
        js.onload = function() {
          done();
        };
        js.onerror = function() {
          done(new Error('Failed to load script ' + src));
        };
        document.head.appendChild(js);
      }
      此外,动态嵌入还有一个地方需要注意。动态嵌入必须等待CSS文件加载完成后,才会去下载外部脚本文件。静态加载就不存在这个问题,script标签指定的外部脚本文件,都是与CSS文件同时并发下载的。
      
      加载使用的协议
      若不指定协议,浏览器默认采用HTTP协议下载。
      
      <script src="example.js"></script>
      上面的example.js默认就是采用HTTP协议下载,若要采用HTTPS协议下载,必需写明(假定服务器支持)。
      
      <script src="https://example.js"></script>
      但是有时我们会希望,根据页面本身的协议来决定加载协议,这时可以采用下面的写法。
      
      <script src="//example.js"></script>    
    方法一: window.onload = function(){ }
    方法二: 将script标签放在body的结尾处
  Remarks: 
    原则上,将其放在html头部,但视情况可以将其放在网页的任何部分.
    一个html文件可以有几个<script>...</script>,且可以共享方法和变量.
'back-forward_cache'简称'bfcache',往返缓存 
  Firefox和Opera独有特性,可在用户使用浏览器的'后退'和'前进'按钮时加快页面的转换速度。
  该缓存中不仅保存着页面数据,还保存了DOM和JS的状态；
  实际上是将整个页面都保存在了内存里。
  若页面位于bfcache中,那么再次打开该页面就不会触发load事件。
--------------------------------------------------------------------------------
移动端 
微信开发介绍 
  就是手机浏览器,只不过多了一些与微信的API对接的事情,微信也提供了很多jssdk,
  如果不想跟微信发生关系,就是一个手机网页
  正常是嵌入H5就可以了,需要微信登录、微信支付之类的功能,可以通过微信API进一步开发。
说明 
  微信 6.1 版本以后,会自带QQ浏览器的X5内核,即使你没有安装QQ浏览器。  [?]
  webkit内核中的一些私有的meta标签,这些meta标签在开发webapp时起到非常重要的作用
    <meta content=”width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;” name=”viewport” /> 
    第一个meta标签表示:强制让文档的宽度与设备的宽度保持1:1,
    并且文档最大的宽度比例是1.0,且不允许用户点击屏幕放大浏览；

    <meta content=”yes” name=”apple-mobile-web-app-capable” /> 
    第二个meta标签是iphone设备中的safari私有meta标签,它表示:允许全屏模式浏览；

    <meta content=”black” name=”apple-mobile-web-app-status-bar-style” /> 
    第三个meta标签也是iphone的私有标签,它指定的iphone中safari顶端的状态条的样式；

    <meta content=”telephone=no” name=”format-detection” /> 
    第四个meta标签表示:告诉设备忽略将页面中的数字识别为电话号码。


    去除Android平台中对邮箱地址的识别
    看 过iOS webapp API的同学都知道iOS提供了一个meta标签:用于禁用iOS对页面中电话号码的自动识别。在iOS中是不自动识别邮件 地 址的,但在Android平台,它会自动检测邮件地址,当用户touch到这个邮件地址时,Android会弹出一个框提示用户发送邮件,如果你不 想 Android自动识别页面中的邮件地址,你不妨加上这样一句meta标签在head 中 1 <meta content=”email=no” name=”format-detection” />



    例子1:<a href="tel:400-4000-0000" >XXX</a>
    这个a标签里的href调用的是手机号码。当点击这个a标签的时候则弹出是否拨打该号码的提示。
    在手机浏览器中使用是没有任何问题的,
    但在微信中,在安卓系统手机,微信 5.0.1 以上版本时该标签就失效了。（最新的微信版本是否解决了这个问题目前还不清楚）。这种情况下,将:
    <a href="tel:400-4000-0000" >XXX</a>改为
    <a link="tel:400-4000-0000" >
    则可以解决部分安卓机型,（但不是全部的）,有些机型依然不行。
    这个和微信客户端有关。目前没有找到满意的解决办法。
WeUI:专为开发微信HTML5应用的开源Web UI组件库
  PS:WeUI是一套同微信原生视觉体验一致的基础样式库,
    为微信Web开发量身设计,可以令用户的使用感知更加统一。
    包含button、cell、dialog、toast、article、icon等各式元素。
  说明篇
    使用 dist/style 文件中的 weui.css 和 weui.min.css 两个文件
  起始
    需要在body标签中加入ontouchstart ,如: <body ontouchstart>
微信开发者工具: 用于在手机上调试页面
  使用方法及原理
  将电脑和手机处于同一局域网[可通过Wi-Fi或USB连接」
  切换到开发者工具的调试页根据手机系统[ios或android」进行相应的选择普通调试
  选择代理的ip [一般Wi-Fi以 168 开头」
  将需要调试的网页的地址[不可使用file协议,即需要开启本地服务器」发送到微信上,
  在微信上打开从电脑上发来的链接即可看到调试页的效果了
微信'JS-SDK' 
  PS:微信JS-SDK是微信公众平台面向网页开发者提供的基于微信内的网页开发工具包。
    通过微信JS-SDK,网页开发者可使用拍照、选图、语音、位置等手机系统的能力,
    同时可以直接使用微信分享、扫一扫、卡券、支付等微信特有的能力。
  ?
    所有使用微信JS SDK的网站,都必须实名到微信认证、缴费。它采取了类似Apple App Store的策略,由系统运营方来保障用户的安全。
    所有能使用微信增强能力的网页都是经过认证权限的
  JSSDK使用步骤
    步骤一:绑定域名
      先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
      如果你使用了支付类接口,请确保支付目录在该安全域名下,否则将无法完成支付。
      备注:登录后可在“开发者中心”查看对应的接口权限。
    步骤二:引入JS文件
      在需要调用JS接口的页面引入如下JS文件
        http://res.wx.qq.com/open/js/jweixin-1.0.0.js
      使用https协议,务必引入 https://res.wx.qq.com/open/js/jweixin-1.0.0.js ,
        否则将无法在'iOS9.0'以上系统中成功使用JSSDK
      如需使用摇一摇周边功能,请引入 jweixin-1.1.0.js
      备注:支持使用 AMD/CMD 标准模块加载方法加载
    步骤三:通过config接口注入权限验证配置
      所有需要使用JS-SDK的页面必须先注入配置信息,否则将无法调用,
      同一个url仅需调用一次,对于变化url的SPA的web app可在每次url变化时进行调用,
      目前Android微信客户端不支持 pushState 的H5新特性,
      所以使用pushState来实现web app的页面会导致签名失败,此问题会在'Android6.2'中修复）。
      wx.config({
        debug: true, 
        // 开启调试模式,调用的所有api的返回值会在客户端alert出来,
        // 若要查看传入的参数,可以在pc端打开,参数信息会通过log打出,仅在pc端时才会打印。
        appId: '',    // 必填,公众号的唯一标识
        timestamp: ,  // 必填,生成签名的时间戳
        nonceStr: '', // 必填,生成签名的随机串
        signature: '',// 必填,签名,见附录1
        jsApiList: [] // 必填,需要使用的JS接口列表,所有JS接口列表见附录2
      });
    步骤四:通过ready接口处理成功验证
      wx.ready(function(){
        // config信息验证后会执行ready方法,所有接口调用都必须在config接口获得结果之后,
        // config是一个客户端的异步操作,所以如果需要在页面加载时就调用相关接口,则须把相关接口放在ready函数中调用来确保正确执行。
        // 对于用户触发时才调用的接口,则可以直接调用,不需要放在ready函数中。
      });
    步骤五:通过error接口处理失败验证
      wx.error(function(res){
        // config信息验证失败会执行error函数,如签名过期导致验证失败,
        // 具体错误信息可以打开config的debug模式查看,
        // 也可以在返回的res参数中查看,对于SPA可以在这里更新签名。
      });    
  接口调用说明
    PS:所有接口通过wx对象(也可使用jWeixin对象)来调用,参数是一个对象,
    除了每个接口本身需要传的参数之外,还有以下通用参数:
      success  接口调用成功时执行的回调函数。
      fail     接口调用失败时执行的回调函数。
      complete 接口调用完成时执行的回调函数,无论成功或失败都会执行。
      cancel   用户点击取消时的回调函数,仅部分有用户取消操作的api才会用到。
      trigger  监听Menu中的按钮点击时触发的方法,该方法仅支持Menu中的相关接口。
        不要尝试在trigger中使用ajax异步请求修改本次分享的内容,
        因为客户端分享操作是一个同步操作,这时候使用ajax的回包会还没有返回。
      以上几个函数都带有一个参数,类型为对象,
      其中除了每个接口本身返回的数据之外,还有一个通用属性errMsg,其值格式如下:
      调用成功时:"xxx:ok" ,其中xxx为调用的接口名
      用户取消时:"xxx:cancel",其中xxx为调用的接口名
      调用失败时:其值为具体错误信息    
  基础接口
    判断当前客户端版本是否支持指定JS接口
    wx.checkJsApi({
      jsApiList: ['chooseImage'], // 需要检测的JS接口列表,所有JS接口列表见附录2,
      success: function(res) {
        // 以键值对的形式返回,可用的api值true,不可用为false
        // 如:{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
      }
    });
    备注:checkJsApi接口是客户端'6.0.2'新引入的一个预留接口,第一期开放的接口均可不使用checkJsApi来检测。
  分享接口
    请注意不要有诱导分享等违规行为,对于诱导分享行为将永久回收公众号接口权限,详细规则请查看:朋友圈管理常见问题 。
    获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
    wx.onMenuShareTimeline({
        title: '', // 分享标题
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        success: function () { 
            // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    });
    获取“分享给朋友”按钮点击状态及自定义分享内容接口
      wx.onMenuShareAppMessage({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        type: '', // 分享类型,music、video或link,不填默认为link
        dataUrl: '', // 如果type是music或video,则要提供数据链接,默认为空
        success: function () { 
          // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
          // 用户取消分享后执行的回调函数
        }
      });
    获取“分享到QQ”按钮点击状态及自定义分享内容接口
      wx.onMenuShareQQ({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        success: function () { 
          // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
          // 用户取消分享后执行的回调函数
        }
      });
    获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
      wx.onMenuShareWeibo({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        success: function () { 
          // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
          // 用户取消分享后执行的回调函数
        }
      });
    获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
      wx.onMenuShareQZone({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        success: function () { 
          // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
          // 用户取消分享后执行的回调函数
        }
      });
  图像接口
    拍照或从手机相册中选图接口
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图,默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机,默认二者都有
        success: function (res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表,localId可以作为img标签的src属性显示图片
        }
      });
    预览图片接口
      wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: [] // 需要预览的图片http链接列表
      });
    上传图片接口
      wx.uploadImage({
          localId: '', // 需要上传的图片的本地ID,由chooseImage接口获得
          isShowProgressTiPS: 1, // 默认为1,显示进度提示
          success: function (res) {
              var serverId = res.serverId; // 返回图片的服务器端ID
          }
      });
      备注:上传图片有效期3天,可用微信多媒体接口下载图片到自己的服务器,此处获得的 serverId 即 media_id,参考文档 ../12/58bfcfabbd501c7cd77c19bd9cfa8354.html 目前多媒体文件下载接口的频率限制为10000次/天,如需要调高频率,请邮件weixin-open@qq.com,邮件主题为【申请多媒体接口调用量】,请对你的项目进行简单描述,附上产品体验链接,并对用户量和使用量进行说明。
    下载图片接口
      wx.downloadImage({
          serverId: '', // 需要下载的图片的服务器端ID,由uploadImage接口获得
          isShowProgressTiPS: 1, // 默认为1,显示进度提示
          success: function (res) {
              var localId = res.localId; // 返回图片下载后的本地ID
          }
      });
  音频接口
    开始录音接口 
      wx.startRecord();
    停止录音接口   
      wx.stopRecord({
          success: function (res) {
              var localId = res.localId;
          }
      });
    监听录音自动停止接口
      wx.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
        complete: function (res) {
          var localId = res.localId; 
        }
      });
    播放语音接口
      wx.playVoice({
          localId: '' // 需要播放的音频的本地ID,由stopRecord接口获得
      });
    暂停播放接口
      wx.pauseVoice({
          localId: '' // 需要暂停的音频的本地ID,由stopRecord接口获得
      });
    停止播放接口
      wx.stopVoice({
          localId: '' // 需要停止的音频的本地ID,由stopRecord接口获得
      });
    监听语音播放完毕接口
      wx.onVoicePlayEnd({
          success: function (res) {
              var localId = res.localId; // 返回音频的本地ID
          }
      });
    上传语音接口
      wx.uploadVoice({
          localId: '', // 需要上传的音频的本地ID,由stopRecord接口获得
          isShowProgressTiPS: 1, // 默认为1,显示进度提示
              success: function (res) {
              var serverId = res.serverId; // 返回音频的服务器端ID
          }
      });
      备注:上传语音有效期3天,可用微信多媒体接口下载语音到自己的服务器,此处获得的 serverId 即 media_id,参考文档 '../12/58bfcfabbd501c7cd77c19bd9cfa8354.html' 目前多媒体文件下载接口的频率限制为10000次/天,如需要调高频率,请邮件weixin-open@qq.com,邮件主题为【申请多媒体接口调用量】,请对你的项目进行简单描述,附上产品体验链接,并对用户量和使用量进行说明。
    下载语音接口
      wx.downloadVoice({
          serverId: '', // 需要下载的音频的服务器端ID,由uploadVoice接口获得
          isShowProgressTiPS: 1, // 默认为1,显示进度提示
          success: function (res) {
              var localId = res.localId; // 返回音频的本地ID
          }
      });
  识别音频并返回识别结果接口
    wx.translateVoice({
       localId: '', // 需要识别的音频的本地Id,由录音相关接口获得
        isShowProgressTiPS: 1, // 默认为1,显示进度提示
        success: function (res) {
            alert(res.translateResult); // 语音识别的结果
        }
    });
  获取网络状态接口
    wx.getNetworkType({
        success: function (res) {
            var networkType = res.networkType; // 返回网络类型2g,3g,4g,wifi
        }
    });
  地理位置
    使用微信内置地图查看位置接口
      wx.openLocation({
        latitude: 0, // 纬度,浮点数,范围为90 ~ -90
        longitude: 0, // 经度,浮点数,范围为180 ~ -180。
        name: '', // 位置名
        address: '', // 地址详情说明
        scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
    });
    获取地理位置接口
      wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标,如果要返回直接给openLocation用的火星坐标,可传入'gcj02'
          success: function (res) {
              var latitude = res.latitude; // 纬度,浮点数,范围为90 ~ -90
              var longitude = res.longitude; // 经度,浮点数,范围为180 ~ -180。
              var speed = res.speed; // 速度,以米/每秒计
              var accuracy = res.accuracy; // 位置精度
          }
      });
    摇一摇周边
      开启查找周边ibeacon设备接口
      wx.startSearchBeacons({
        ticket:"",  //摇周边的业务ticket, 系统自动添加在摇出来的页面链接后面
        complete:function(argv){
          //开启查找完成后的回调函数
        }
      });
      备注:上述摇一摇周边接口使用注意事项及更多返回结果说明,请参考:摇一摇周边获取设备信息
    备注:如需接入摇一摇周边功能,请参考:申请开通摇一摇周边
    关闭查找周边ibeacon设备接口
      wx.stopSearchBeacons({
        complete:function(res){
          //关闭查找完成后的回调函数
        }
      });
    监听周边ibeacon设备接口
      wx.onSearchBeacons({
        complete:function(argv){
          //回调函数,可以数组形式取得该商家注册的在周边的相关设备列表
        }
      });
  界面操作
    隐藏右上角菜单接口
      wx.hideOptionMenu();
    显示右上角菜单接口
      wx.showOptionMenu();
    关闭当前网页窗口接口
      wx.closeWindow();
    批量隐藏功能按钮接口
      wx.hideMenuItems({
          menuList: [] // 要隐藏的菜单项,只能隐藏“传播类”和“保护类”按钮,所有menu项见附录3
      });
    批量显示功能按钮接口
      wx.showMenuItems({
          menuList: [] // 要显示的菜单项,所有menu项见附录3
      });
    隐藏所有非基础按钮接口
      wx.hideAllNonBaseMenuItem();
      // “基本类”按钮详见附录3
    显示所有功能按钮接口
      wx.showAllNonBaseMenuItem();
    微信扫一扫
      调起微信扫一扫接口
      wx.scanQRCode({
        needResult: 0, // 默认为0,扫描结果由微信处理,1则直接返回扫描结果,
        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码,默认二者都有
        success: function (res) {
          var result = res.resultStr; // 当needResult 为 1 时,扫码返回的结果
        }
      });    
  跳转微信商品页接口
    wx.openProductSpecificView({
      productId: '', // 商品id
      viewType: '' // 0.默认值,普通商品详情页1.扫一扫商品详情页2.小店商品详情页
    });    
  微信卡券
    微信卡券接口中使用的签名凭证api_ticket,与步骤三中config使用的签名凭证jsapi_ticket不同,开发者在调用微信卡券JS-SDK的过程中需依次完成两次不同的签名,并确保凭证的缓存。
    获取api_ticket
      api_ticket 是用于调用微信卡券JS API的临时票据,有效期为7200 秒,通过access_token 来获取。
    开发者注意事项:
      1.此用于卡券接口签名的api_ticket与步骤三中通过config接口注入权限验证配置使用的jsapi_ticket不同。
      2.由于获取api_ticket 的api 调用次数非常有限,频繁刷新api_ticket 会导致api调用受限,影响自身业务,开发者需在自己的服务存储与更新api_ticket。
    接口调用请求说明
      http请求方式: GET
      https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=wx_card
    参数说明
      参数	是否必须	说明
      access_token	是	调用接口凭证
      返回数据
    数据示例:
      {
        "errcode":0,
        "errmsg":"ok",
        "ticket":"bxLdikRXVbTPdHSM05e5u5sUoXNKdvsdshFKA",
        "expires_in":7200
      }
      参数名	描述
      errcode	错误码
      errmsg	错误信息
      ticket	api_ticket,卡券接口中签名所需凭证
      expires_in	有效时间    
    拉取适用卡券列表并获取用户选择信息
      wx.chooseCard({
        shopId: '', // 门店Id
        cardType: '', // 卡券类型
        cardId: '', // 卡券Id
        timestamp: 0, // 卡券签名时间戳
        nonceStr: '', // 卡券签名随机串
        signType: '', // 签名方式,默认'SHA1'
        cardSign: '', // 卡券签名
        success: function (res) {
          var cardList= res.cardList; // 用户选中的卡券列表信息
        }
      });
      参数名	必填	类型	示例值	描述
      shopId	否	string(24)	1234	门店ID。shopID用于筛选出拉起带有指定location_list(shopID)的卡券列表,非必填。
      cardType	否	string(24)	GROUPON	卡券类型,用于拉起指定卡券类型的卡券列表。当cardType为空时,默认拉起所有卡券的列表,非必填。
      cardId	否	string(32)	p1Pj9jr90_SQRaVqYI239Ka1erk	卡券ID,用于拉起指定cardId的卡券列表,当cardId为空时,默认拉起所有卡券的列表,非必填。
      timestamp	是	string(32)	14300000000	时间戳。
      nonceStr	是	string(32)	sduhi123	随机字符串。
      signType	是	string(32)	SHA1	签名方式,目前仅支持SHA1
      cardSign	是	string(64)	abcsdijcous123	签名。
      cardSign详见附录4。开发者特别注意:签名错误会导致拉取卡券列表异常为空,请仔细检查参与签名的参数有效性。
      
      特别提醒
      拉取列表仅与用户本地卡券有关,拉起列表异常为空的情况通常有三种:签名错误、时间戳无效、筛选机制有误。请开发者依次排查定位原因。    
    批量添加卡券接口
      wx.addCard({
          cardList: [{
              cardId: '',
              cardExt: ''
          }], // 需要添加的卡券列表
          success: function (res) {
              var cardList = res.cardList; // 添加的卡券列表信息
          }
      });
      cardExt详见附录4,值得注意的是,这里的card_ext参数必须与参与签名的参数一致,格式为字符串而不是Object,否则会报签名错误。    
    查看微信卡包中的卡券接口
      wx.openCard({
          cardList: [{
              cardId: '',
              code: ''
          }]// 需要打开的卡券列表
      });
    核销后再次赠送卡券接口
      wx.consumeAndShareCard({
          cardId: '',
          code: ''
      });
      参数说明:
      
      参数	说明
      cardId	上一步核销的card_id,若传入错误的card_id会报错
      code	上一步核销的code,若传入错误的code会报错
      注意:
      
      该接口只支持微信6.3.6以上版本的客户端,开发者在调用时需要注意两点:
      
      1.需要引入1.1.0版本的js文件: https://res.wx.qq.com/open/js/jweixin-1.1.0.js
      
      2.需要判断用户客户端版本号,做出容错处理,详情点击:判断当前客户端版本是否支持指定JS接口
    发起一个微信支付请求
      wx.chooseWXPay({
          timestamp: 0, // 支付签名时间戳,注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: '', // 支付签名随机串,不长于 32 位
          package: '', // 统一支付接口返回的prepay_id参数值,提交格式如:prepay_id=***）
          signType: '', // 签名方式,默认为'SHA1',使用新版支付需传入'MD5'
          paySign: '', // 支付签名
          success: function (res) {
              // 支付成功后的回调函数
          }
      });
      备注:prepay_id 通过微信支付统一下单接口拿到,paySign 采用统一的微信支付 Sign 签名生成方法,注意这里 appId 也要参与签名,appId 与 config 中传入的 appId 一致,即最后参与签名的参数有appId, timeStamp, nonceStr, package, signType。
      请注意该接口只能在你配置的支付目录下调用,同时需确保支付目录在JS接口安全域名下。
      微信支付开发文档:https://pay.weixin.qq.com/wiki/doc/api/index.html
遇到的问题 
  ios 
    滑动当前div使其他div产生滚动效果
ios 
  iOS 10.3+ 可通过给 input[type='file'] 的标签里指定 capture="user" 来调用手机前置摄像头
android
--------------------------------------------------------------------------------
技巧 实现 
  动态 rem 自适应布局.
    PS:rem 单位在做移动端的h5开发的时候是最经常使用的单位。
      采用js动态计算给文档的根节点 font-size 赋值,并以此为尺寸参考进行网页布局.
      可参考淘宝的布局.
    使用的时,将下面的代码放到页面的顶部（head标签内）；
    <script>
      function changeFont() {
        var originWidth =375; // 用来设置设计稿原型的屏幕宽度 此处以 Iphone 6为例
        var currClientWidth = document.documentElement.clientWidth;
        //设置屏幕的最大和最小值时设定一默认值
        if (currClientWidth > 640) { currClientWidth = 640; }
        if (currClientWidth < 320) { currClientWidth = 320; }
        document.documentElement.style.fontSize = currClientWidth /originWidth ;
        // 将 1rem 设置为相当于iPhone6 的 1px
      }
      changeFont();
      window.addEventListener('resize', changeFont, false); //注册 resize事件
    </script>
  spa 页面通信及状态维持
    不同页面间通过 sessionStorage 或 localStorage 实现消息传递
    同一页面内 刷新保持状态 分享链接可获取状态
      如上 情景 前提都是URL未变化同样要保持当前状态,故通过添加自定义的hash决解,
      通过hash来添加、解析状态,从而到达要求的效果
Question & Idea
webview
-------------------------------------------------------------------- 以下待整理 
  JS代码执行后将其删除仍不影响功能,因为JS代码已经解析到了内存中[SelfThink]

