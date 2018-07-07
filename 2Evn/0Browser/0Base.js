说明 
  浏览器从一个域同时下载文件的数量有限,当同时下载多个文件,会比相同大小的单个文件慢.
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
  通过浏览器地址栏运行HTML代码 [非IE浏览器内核]
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
--------------------------------------------------------------------------------
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


  遇到CSS样式资源 
    CSS资源的处理有几个特点：
    CSS下载时异步，不会阻塞浏览器构建DOM树
    但是会阻塞渲染，也就是在构建render时，会等到css下载解析完毕后才进行（这点与浏览器优化有关，防止css规则不断改变，避免了重复的构建）
    有例外，media query声明的CSS是不会阻塞渲染的
  遇到JS脚本资源 
    JS脚本资源的处理有几个特点：
  
    阻塞浏览器的解析，也就是说发现一个外链脚本时，需等待脚本下载完成并执行后才会继续解析HTML
    浏览器的优化，一般现代浏览器有优化，在脚本阻塞时，也会继续下载其它资源（当然有并发上限），但是虽然脚本可以并行下载，解析过程仍然是阻塞的，也就是说必须这个脚本执行完毕后才会接下来的解析，并行下载只是一种优化而已
    defer与async，普通的脚本是会阻塞浏览器解析的，但是可以加上defer或async属性，这样脚本就变成异步了，可以等到解析完毕后再执行
    注意，defer和async是有区别的： defer是延迟执行，而async是异步执行。
  
    简单的说（不展开）：
  
    async是异步执行，异步下载完毕后就会执行，不确保执行顺序，一定在onload前，但不确定在DOMContentLoaded事件的前或后
    defer是延迟执行，在浏览器看起来的效果像是将脚本放在了body后面一样（虽然按规范应该是在DOMContentLoaded事件前，但实际上不同浏览器的优化效果不一样，也有可能在它后面）
  遇到img图片类资源 
    遇到图片等资源时，直接就是异步下载，不会阻塞解析，下载完毕后直接用图片替换原有src的地方
--------------------------------------------------------------------------------
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
BFCache'back-forward cache',往返缓存 
  Firefox和Opera独有特性,可在用户使用浏览器的'后退'和'前进'按钮时加快页面的转换速度。
  该缓存中不仅保存着页面数据,还保存了DOM和JS的状态；
  实际上是将整个页面都保存在了内存里。
  若页面位于bfcache中,那么再次打开该页面就不会触发load事件。
--------------------------------------------------------------------------------
技巧 实现 
  spa 页面通信及状态维持
    不同页面间通过 sessionStorage 或 localStorage 实现消息传递
    同一页面内 刷新保持状态 分享链接可获取状态
      如上 情景 前提都是URL未变化同样要保持当前状态,故通过添加自定义的hash决解,
      通过hash来添加、解析状态,从而到达要求的效果
Question & Idea
webview
-------------------------------------------------------------------- 以下待整理 
JS代码执行后将其删除仍不影响功能,因为JS代码已经解析到了内存中[SelfThink]
前端性能优化 
  文件的合并、压缩
  资源预加载 
    Exp:
      第一个页面load完的时,在用户阅读网页的空隙,把下一个页面所用的资源提前加载过来cache住,
      这样下个页面就直接读缓存资源了,这样可以一定程度改善用户体验。
    原理:
      只要浏览器把图片下载到本地,就会被缓存,再次请求相同的 src 时就会优先寻找浏览器缓存,提高访问速度。
    执行:
      预加载资源需要解决的主要问题是JS加载过来不会被直接执行,css加载过来不会更改页面样式。
      通过js   预先从服务加载图片资源(动态创建 Image,设置 src 属性,将其添加到DOM中并隐藏)
      通过AJAX 加载数据 (不需要将图片等加入到网页中即可进行缓存达到和JS相同的效果)
    Example:
      单图片预加载
        目前最常见的一种实现方式如下
        function preloadImg(url) {
          var img = new Image();
          img.src = url;
          if(img.complete) {
            //接下来可以使用图片了
            //do something here
          }
          else {
            img.onload = function() {
              //接下来可以使用图片了
              //do something here
            };
          }
        }
        // 首先实例化一个Image对象赋值给img,然后设置img.src为参数url指定的图片地址,
        // 接着判断img的complete属性,若本地有这张图片的缓存,则该值为true,此时我们可以直接操作这张图片,
        // 若本地没有缓存,则该值为false,此时我们需要监听img的onload事件,把对img的操作放在onload的回调函数里面,
        // 经过测试,这种方案基本能够兼容目前所有浏览器
  预读取
    DNS 预解析 dns-prefetch
      Exp:通过 DNS 预解析来告诉浏览器未来我们可能从某个特定的 URL 获取资源,
        当浏览器真正使用到该域中的某个资源时就可以尽快地完成 DNS 解析。
      Example:
        我们将来可能从 example.com 获取图片或音频资源,那么可以在文档顶部的 标签中加入以下内容:
        <link rel="dns-prefetch" href="//example.com">
        当我们从该 URL 请求一个资源时,就不再需要等待 DNS 的解析过程。
      Remarks:
        该技术对使用第三方资源特别有用。
    预连接 preconnect
      Exp:与 DNS 预解析类似,preconnect 不仅完成 DNS 预解析,同时还将进行 TCP 握手和建立传输层协议。
      可以这样使用:<link rel="preconnect" href="http://example.com">
      Ilya Grigorik 的文章中的介绍:
        现代浏览器都试着预测网站将来需要哪些连接,然后预先建立 socket 连接,
        从而消除昂贵的 DNS 查找、TCP 握手和 TLS 往返开销。然而,
        浏览器还不够聪明,并不能准确预测每个网站的所有预链接目标。
        好在,在 Firefox 39 和 Chrome 46 中我们可以使用 preconnect 告诉浏览器我们需要进行哪些预连接。
    预获取 prefetch
      Exp:若我们确定某个资源将来一定会被使用到,我们可以让浏览器预先请求该资源并放入浏览器缓存中。
      Example: 一个图片和脚本或任何可以被浏览器缓存的资源:
        <link rel="prefetch" href="image.png">
      与 DNS 预解析不同,预获取真正请求并下载了资源,并储存在缓存中。
        但预获取还依赖于一些条件,某些预获取可能会被浏览器忽略,
        例如从一个非常缓慢的网络中获取一个庞大的字体文件。
        并且,Firefox 只会在浏览器闲置时进行资源预获取。
      Bram Stein 的帖子中说到
        这对 webfonts 性能提升非常明显。
        目前,字体文件必须等到 DOM 和 CSS 构建完成之后才开始下载,使用预获取就可以轻松绕过该瓶颈。
      注意:要测试资源的预获取有点困难,但在 Chrome 和 Firefox 的网络面板中都有资源预获取的记录。
        预获取的资源没有同源策略的限制。
    预获取 subresource
      这是另一个预获取方式,这种方式指定的预获取资源具有最高的优先级,在所有 prefetch 项之前进行:
      <link rel="subresource" href="styles.css">
      Chrome 文档说明:
        rel=prefetch 为将来的页面提供了一种低优先级的资源预加载方式,
        而 rel=subresource 为当前页面提供了一种高优先级的资源预加载。
        所以,若资源是当前页面必须的,或者资源需要尽快可用,那么最好使用 subresource 而不是 prefetch。
    预渲染 prerender
      这是一个核武器,因为 prerender 可以预先加载文档的所有资源:
      <link rel="prerender" href="http://example.com">
      Steve Souders 的一篇文章中写到:
        这类似于在一个隐藏的 tab 页中打开了某个链接 – 将下载所有资源、创建 DOM 结构、
        完成页面布局、应用 CSS 样式和执行 JS 脚本等。
        当用户真正访问该链接时,隐藏的页面就切换为可见,使页面看起来就是瞬间加载完成一样。
        Google 搜索在其即时搜索页面中已经应用该技术多年了,微软也宣称将在 IE11 中支持该特性。
        需要注意的是不要滥用该特性,当你知道用户一定会点击某个链接时才可以进行预渲染,
        否则浏览器将无条件地下载所有预渲染需要的资源。
    更多相关讨论:
      所有预加载技术都存在一个潜在的风险:对资源预测错误,
      而预加载的开销（抢占 CPU 资源,消耗电池,浪费带宽等）是高昂的,所以必须谨慎行事。
      虽然很难确定用户下一步将访问哪些资源,但高可信的场景确实存在:
        若用户完成一个带有明显结果的搜索,那么结果页面很可能会被加载
        若用户进入到登陆页面,那么登陆成功的页面很可能会被加载
        若用户阅读一个多页的文章或访问一个分页的结果集,那么下一页很可能会被加载
      最后,使用 Page Visibility API 可以防止页面真正可见前被执行。
    预加载 preload
      preload 是一个新规范,与 prefetch 不同（可能被忽略）的是,浏览器一定会预加载该资源:
        <link rel="preload" href="image.png">
        虽然该规范还没有被所有浏览器兼容,但其背后的思想还是非常有意思的。
    缓存和预加载的区别
      缓存就是把请求过的数据缓存起来,下次请求的时候直接使用缓存内容,提高响应速度
      预加载指的是提前把需要的内容加载完成,访问的时候可以明显提高响应效率,
        比如图片的预加载（可以提前加载一定数量的图片,当用户访问图片的时一般只看前几张,由于是预加载好的,所以速度比较快）。
  图片优化
    JPG 通常使用的背景图片,照片图片,商品图片等等。
      这一类型的图片都属于大尺寸图片或较大尺寸图片一般使用的是这种格式。
    PNG 这种格式的又分为两种 一种 PNG-8,一种 PNG-24。
      PNG-8 格式不支持半透明,也是 IE6 兼容的图片存储方式。
      PNG-24 图片质量要求较高的半透明或全透明背景,
        保存成 PNG-24 更合适（为了兼容 IE 可以试用 js 插件 pngfix）一般是背景图标中使用的多。
    GIF 这种格式显而易见的是在需要 gif 动画的时候使用了。
    精灵图 CSS Sprites
      将同类型的图标或按钮等背景图合到一张大图中,减少页面请求
    字体图标
      Icon Font,将图标做成字体文件。
      优点是图标支持多个尺寸,兼容所有浏览器,减少页面请求等。
      美中不足 的是只支持纯色的 icon
    Base64
      将图片转化为 base64 编码格式,资源内嵌于 CSS 或 HTML 中,不必单独请求
    SVG 可缩放矢量图形（Scalable Vector Graphics）
      SVG 用来定义用于网络的基于矢量的图形
      SVG 使用 XML 格式定义图形
      SVG 图像在放大或改变尺寸的情况下其图形质量不会有所损失
      SVG 是万维网联盟的标准
      SVG 与诸如 DOM 和 XSL 之类的 W3C 标准是一个整体
    图片响应式
      通常图片加载都是可以通过 lazy 加载的形式来的,那么可以在加载的时候来判断屏幕的尺寸来达到加载大图还是小图的目的来达到优化。
    滚动加载图片（懒加载 或 延迟加载）
      当访问一个页面的时候,先把所有的图片路径替换成一张大小为1*1px图片的路径（这样就只需请求一次）,
      只有当图片出现在浏览器的可视区域内时,才设置图片正真的路径,让图片显示出来。这就是图片懒加载。
  JS操作
    用innerHTML代替DOM操作,减少DOM操作次数,优化JS性能。
    当需要设置的样式很多时设置className而不是直接操作style。
    少用全局变量、缓存DOM节点查找的结果。减少IO读取操作。
  图片大小控制合适
  前端性能优化的方法
    图片预加载,将样式表放在顶部,将脚本放在底部  加上时间戳。
    避免在页面的主体布局中使用table,table要等其中的内容完全下载之后才会显示出来,显示比div+css布局慢。

    避免使用CSS Expression（css表达式)又称Dynamic properties(动态属性)。
    前端模板 JS+数据,减少由于HTML标签导致的带宽浪费
    前端用变量保存AJAX请求结果,每次操作本地变量,不用请求,减少请求次数
    对普通的网站有一个统一的思路,就是尽量向前端优化、减少数据库操作、减少磁盘IO。
      在不影响功能和体验的情况下,能在浏览器执行的不要在服务端执行,能在缓存服务器上直接返回的不要到应用服务器,
      程序能直接取得的结果不要到外部取得,本机内能取得的数据不要到远程取,
      内存能取到的不要到磁盘取,缓存中有的不要去数据库查询。
      减少数据库操作指减少更新次数、缓存结果减少查询次数、将数据库执行的操作尽可能的让你的程序完成（例如join查询）
      减少磁盘IO指尽量不使用文件系统作为缓存、减少读写文件次数等。
      程序优化永远要优化慢的部分,换语言是无法'优化'的。
  提高网站的性能？
    （1）资源加载
      CSS 顶部, JS 底部
      CSS JS 文件压缩
      尽量使用图片使用精灵图,字体图标
      图片加载可通过延迟加载的方式
      总之就是减少资源体积减少资源请求次数。
    （2）代码性能
      Css:
      使用 CSS 缩写,减少代码量；
      减少查询层级:如.header .logo 要好过.header .top .logo；
      减少查询范围:如.header>li 要好过.header li；
      避免 TAG 标签与 CLASS 或 ID 并存:如 a.top、button#submit；
      删除重复的 CSS；
      ….
      Html:
      减少 DOM 节点:加速页面渲染；
      正确的闭合标签:如避免使用<div/>,浏览器会多一个将它解析成<div\></div\>的过程；
      减少页面重绘。比如 给图片加上正确的宽高值:这可以减少页面重绘,
      ……
      Js:
      避免频繁操作 DOM 节点；
      使用事件委托绑定事件,如将事件绑定在 body 上进行代理；
      尽量少用全局变量；
      减少对象查找,如 a.b.c.d 这种查找方式非常耗性能,尽可能把它定义在变量里；
      多线程 将执行时间过长的运算异步操作.







