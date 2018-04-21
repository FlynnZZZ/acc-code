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









