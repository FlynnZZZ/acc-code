常识 理论
介绍_概念_说明_定义
介绍 
  JS诞生于1995年,最初的目的是验证表单输入的,
  作用:用来实现网页上的特效效果,动画或交互的实现;
  解释型的,基于对象和事件驱动并具有相对安全性的客户端 脚本语言,scripting-language;
  其语法源自于Java,其一等函数,first-class function 来自于 Scheme,
  其基于原型的继承来自于Self;
  通常每一种编程语言都有各自的开发平台、标准库或API函数,用来提供诸如基本输入输出的功能,
  JS语言核心针对文本、数组、日期和正则表达式的操作定义了很少的API,且不包括输入输出,
  输入和输出功能,类似于网络、存储和图形相关的复杂特性,
  是由JS所属的 宿主环境,host environment 提供的
概念 
  脚本语言
    指的是它不具备开发操作系统的能力,而是只用来编写控制其他大型应用程序的“脚本”。
  实例
    实例 是 类型 的具象化
    在面向对象的编程中,通常把用类创建对象的过程称为实例化
  函数和方法的区别
    方法就是对象的函数
    方法基于对象,对某个对象使用某个方法,写法：对象.方法()
    函数基于过程,执行某函数,运行某函数,触发某函数,写法：函数()
  静态 公有 私有 特权 属性/方法的区别
    PS:静态、公有、私有属性/方法 是相对于类来说的.
    静态方法/属性 : 给类或构造函数定义的属性/方法,实例对象无法调用或访问
    公有属性 : 可实例化成有差异的属性
    公有方法 : 一般把共用的方法,都放在“原型对象“当中,如果放在构造函数中,会重复创建共同的方法.
    私有属性和方法 : 不可实例化,且外部不可访问的属性/方法
    特权方法 : 有权访问私有变量和私有函数的公有方法
      利用的闭包原理,即通过作用域链,
      让内部函数能够访问上层函数的变量对象(即该类的私有变量、私有方法).
  e.g. :
    function Foo(arg1,arg2){
      var name =arg1;    // 私有属性
      function goo(){};  // 私有方法
      this.age =arg2;        // 公有属性
      this.do1 =function(){   // 特权方法
        console.log(name);
      }
      Foo.prototype.do2 =function(){  // 公有方法
        console.log(name);
      }
    }
    Foo.name ="abc";        // 静态属性
    Foo.say =function(){}; // 静态方法
    var aoo =new Foo(1,2);

    var box=100;
    box.MAX_VALUE;    //undefined ,这种写法叫做属性
    Number.MAX_VALUE; //1.7976931348623157e+308 ,这种写法,叫做静态属性.

  API 介绍
    API 是一些预先定义的函数,目的是给应用程序与开发人员基于某软件或硬件得以访问一组例程的能力(无需访问源码,或理解内部工作机制的细节)
    也称为应用编程接口(Application Programming interfaces),提供了一组对象,方法和属性. 可以用来访问这些技术的所有功能
    API 是对象,拥有属性和方法.
    PS-Self:程序提供的操作它的一些函数、方法等.
      对方定义的一种互相交互信息的方式.
  面向对象
    面向对象的编程语言最大的特色就是可以编写自己所需的数据类型,以更好的解决问题
    从世界观的角度可以认为：
      面向对象的基本哲学是认为世界是由各种各样具有自己的运动规律和内部状态的对象所组成的；
      不同对象之间的相互作用和通讯构成了完整的现实世界
    ECMAScript有两种开发模式:函数式(过程化),面向对象(OOP).
    语言自带的数据类型有限,要表示复杂的数据,需要有复杂的数据类型.则可使用对象表示复杂类型.
    传统面向对象语言有一个标志,就是类的概念,通过类可以创建任意多个具有相同属性和方法的对象
  同源策略
    有Netscape提出的一个安全策略,所有支持JS的浏览器都会使用该策略
    同源:域名、协议、端口相同
    脚本运行时会进行同源检查,只有同源的脚本才能被执行
      script标签里的src属性里的路径不受同源策略的限制

  宿主环境
    语言在运行的时候,需要一个环境,叫做宿主环境.
    对于JavaScript,宿主环境最常见的是web浏览器,
    浏览器提供了一个JavaScript运行的环境,
    这个环境里面,需要提供一些接口,
    好让JavaScript引擎能够和宿主环境对接.
    但是环境不是唯一的,也就是JavaScript不仅仅能够在浏览器里面跑,
    也能在其他提供了宿主环境的程序里面跑,最常见的就是nodejs.
    同样作为一个宿主环境,nodejs也有自己的JavaScript引擎--V8.
    Node.js 官方的定义:
    Node.js is a platform built on Chrome’s JavaScript runtime for easily building fast, scalable network applications
  JavaScript引擎
    真正执行JavaScript代码的地方,
    常见的引擎有V8(目前最快JavaScript引擎、Google生产)、JavaScript core.
    JavaScript引擎主要做了下面几件事情：
    一套与宿主环境相联系的规则;
    JavaScript引擎内核(基本语法规范、逻辑、命令和算法);
    一组内置对象和API;
    其他约定.
说明 
  js本身不提供任何与I/O(输入/输出)相关的API,都要靠宿主环境(host)提供,
    所以JavaScript只合适嵌入更大型的应用程序环境,去调用宿主环境提供的底层API
  嵌入js的宿主环境有多种,最常见的环境就是浏览器,另外还有服务器环境,即Node项目
  JS内容划分
    JavaScript的核心语法相当精简,只包括两个部分：
    基本的语法构造(比如操作符、控制结构、语句)和标准库(比如Array、Date、Math等)
    除此之外,各种宿主环境提供额外的API(即只能在该环境使用的接口),以便JavaScript调用。
    以浏览器为例,它提供的额外API可以分成三大类。
      浏览器控制类：操作浏览器
      DOM类：操作网页的各种元素
      Web类：实现互联网的各种功能
    如果宿主环境是服务器,则会提供各种操作系统的API,比如文件操作API、网络通信API等等。
    这些你都可以在Node环境中找到。
  自我定义的缩写含义
    [DIBs]   difference in browser    即存在兼容性问题
  单、双引号要交错、成对使用
    即'1"2"3'或"1'2'3" 正确使用
    "1"2"3" 或 '1'2'3' 错误使用
  js大小写敏感,严格区分大小写
  当一行代码过长,人为的分行时可使用\在行尾连接进行代码跨行
    e.g.
    var str = "string \
    is broken \
    across multiple\
    lines";
    console.log(str);   // string is broken across multiplelines.
  在定义函数时,参数使用[]包裹起来表示可选参数
    e.g. $.get(url,[data],[callback])
  debug--调试/除错
  参数的表示中,使用[]包裹起来的表示可选参数
    e.g. :
    str.slice(beginSlice[, endSlice])
    表示第二个参数为可选
  耦合关系就是相互关联的意思
介绍 
  localhost
    在计算机网络中,localhost 意为“本地主机”,指“这台计算机”
    是给回路网络接口(loopback)的一个标准主机名
    相对应的IP地址为127.0.0.1(IPv4)和[::1](IPv6)
  js 的内容,包含以下三部分：
    BOM尚无正式标准,JavaScript语法的标准化组织是ECMA,DOM的标准化组织是W3C
    ECMAScript(核心)：JavaScript 语言基础；
      ECMAScript 标准定义了 JavaScript 脚本中最为核心的内容,是 JavaScript 脚本的“骨架”
      有了“骨架”,就可以在它上面进行扩展,如 DOM(文档对象模型)和 BOM(浏览器对象模型).
    DOM(文档对象模型)：规定了访问HTML和XML的接口；
      DOM 是“ Document Object Model ”的缩写,简称“ 文件对象模型 ”,由W3C制定规范.
    BOM(浏览器对象模型)：提供了独立于内容而在浏览器窗口之间进行交互的对象和方法.
      BOM 只是 ECMAScript 的一个扩展,没有任何相关标准
      W3C也没有对该部分作出规范,每个浏览器厂商都有自己的 BOM 实现,这可以说是 BOM 的软肋所在.
      注意：BOM 有一些“事实上的标准”,
        如操作浏览器窗口、获取浏览器版本信息等,在不同浏览器中,对它们的实现方法是一样的.
  js甚至也可以用来操作数据库。
    NoSQL数据库,本身就是在JSON格式的基础上诞生的,
    大部分NoSQL数据库允许JavaScript直接操作。
    基于SQL语言的开源数据库PostgreSQL支持JavaScript作为操作语言,可以部分取代SQL查询语言。
介绍_概念_说明_定义 
  ./filename   表示当前文件夹中的某个文件
  ../filename  表示上一层文件夹中的某个文件

  URI : 统一资源标识符(Uniform Resource Identifier)
    一个用于标识某一互联网资源名称的字符串
    该种标识允许用户对任何（包括本地和互联网的）资源通过特定的协议进行交互操作
    URI由包括确定语法和相关协议的方案所定义。
    Web上可用的每种资源(HTML文档、图像、视频片段、程序等)由一个通用资源标识符进行定位
  URL : 统一资源定位符(Uniform Resource Locator)
    从互联网上得到的资源的位置和访问方法的一种简洁的表示,是互联网上标准资源的地址
    互联网上的每个文件都有一个唯一的URL,它包含的信息指出文件的位置以及浏览器应该怎么处理它
    使用ASCII代码的一部分来表示互联网的地址,
    一般统一资源定位符的开始标志着一个计算机网络所使用的网络协议。
  URN : 统一资源名称 (Uniform Resource Name)
    标识一个实体的标识符
  URI URL URN 的区别
    URN 与地址无关。
    URL 和 URN 都是 URI 的子集

  URL中的参数 lastreporttime
    在URL末尾增加一个 lastreporttime 参数,表示只会加载该参数时间之后的报告.
    e.g.
    'http://gumball.wickedlysmart.com/?lastreporttime=1302212903099'
    指定的时间为一串数字,单位为毫秒.
网页的加载过程:
  下载HTML文档,从头开始顺序解析,边下载边解析HTML
  解析中遇到script标签,停止HTML的解析,JS引擎工作,边下载边解析JS,
  解析完毕后,恢复HTML的解析
  原因: JS可能修改DOM,故浏览器优先执行JS
  Gecko和Webkit引擎在网页被阻塞后,会生成第二个线程解析文档,下载外部资源,
  但是不会修改DOM,网页还是处于阻塞状态。
  
  JS脚本的执行也是顺序执行,但下载时会同时进行,
  也就是说,脚本的执行顺序由它们在页面中的出现顺序决定,
  当然,执行多个脚本都会产生“阻塞效应”,
  必须等到它们都执行完,浏览器才会继续页面渲染。
  
  解析和执行CSS,也会产生阻塞。
  Firefox会等到脚本前面的所有样式表,都下载并解析完,再执行脚本；
  Webkit则是一旦发现脚本引用了样式,就会暂停执行脚本,等到样式表下载并解析完,再恢复执行。
  此外,对于来自同一个域名的资源,比如脚本文件、样式表文件、图片文件等,
  浏览器一般最多同时下载六个(IE11允许同时下载13个)。
  如果是来自不同域名的资源,就没有这个限制。
  所以,通常把静态文件放在不同的域名之下,以加快下载速度。
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
      可缓存(加载一次,无需加载):如果有两个页面使用同一个文件,只需下载一次.
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
    一：<script>标签的 async="async"属性.
      HTML5 中新增的属性,Chrome、FF、IE9&IE9+均支持
      脚本相对于页面的其余部分异步地执行(当页面继续进行解析的同时,脚本将被执行)
      async 属性仅适用于外部脚本(只有在使用 src 属性时)
      该方法不能保证脚本按顺序执行(当有多个该属性的script时)
    二：<script>标签的 defer="defer"属性.
      规定脚本执行延迟,直到页面加载完毕,再执行
      兼容所有浏览器.此外,这种方法可以确保所有设置 defer 属性的脚本按顺序执行.
    三：AJAX eval
      使用 AJAX 得到脚本内容,然后通过 eval_r(xmlhttp.responseText)来运行脚本
      兼容所有浏览器.
    四：iframe 方式
      可以参照：iframe 异步加载技术及性能中关于 Meboo 的部分
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

      <script>标签：代码嵌入网页
      <script>标签：加载外部脚本
      事件属性：代码写入HTML元素的事件处理属性,比如onclick或者onmouseover
      URL协议：URL支持以javascript:协议的方式,执行JavaScript代码
      后两种方法用得很少,常用的是前两种方法。由于内容(HTML代码)和行为代码(JavaScript)应该分离,所以第一种方法应当谨慎使用。

      script标签：代码嵌入网页
      通过<script>标签,可以直接将JavaScript代码嵌入网页。

      <script>
        console.log('Hello World');
      </script>
      <script>标签有一个type属性,用来指定脚本类型。对JavaScript脚本来说,type属性可以设为两种值。

      text/javascript：这是默认值,也是历史上一贯设定的值。如果你省略type属性,默认就是这个值。对于老式浏览器,设为这个值比较好。
      application/javascript：对于较新的浏览器,建议设为这个值。
      <script type="application/javascript">
        console.log('Hello World');
      </script>
      由于<script>标签默认就是JavaScript代码。所以,嵌入JavaScript脚本时,type属性也可以省略。

      如果type属性的值,浏览器不认识,那么它不会执行其中的代码。利用这一点,可以在<script>标签之中嵌入任意的文本内容,然后加上一个浏览器不认识的type属性即可。

      <script id="mydata" type="x-custom-data">
        console.log('Hello World');
      </script>
      上面的代码,浏览器不会执行,也不会显示它的内容,因为不认识它的type属性。但是,这个<script>节点依然存在于DOM之中,可以使用<script>节点的text属性读出它的内容。

      document.getElementById('mydata').text
      // "
      //   console.log('Hello World');
      // "
      script标签：加载外部脚本
      <script>标签也可以指定加载外部的脚本文件。

      <script src="example.js"></script>
      如果脚本文件使用了非英语字符,还应该注明编码。

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
      上面的事件属性代码只有一个语句。如果有多个语句,用分号分隔即可。

      URL协议
      URL支持javascript:协议,调用这个URL时,就会执行JavaScript代码。

      <a href="javascript:alert('Hello')"></a>
      浏览器的地址栏也可以执行javascipt:协议。将javascript:alert('Hello')放入地址栏,按回车键,就会跳出提示框。

      如果JavaScript代码返回一个字符串,浏览器就会新建一个文档,展示这个字符串的内容,原有文档的内容都会消失。

      <a href="javascript:new Date().toLocaleTimeString();">
        What time is it?
      </a>
      上面代码中,用户点击链接以后,会打开一个新文档,里面有当前时间。

      如果返回的不是字符串,那么浏览器不会新建文档,也不会跳转。

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
      
      如果想避免这个问题,可以设置async属性为false。
      
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
      
      如果想为动态加载的脚本指定回调函数,可以使用下面的写法。
      
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
      如果不指定协议,浏览器默认采用HTTP协议下载。
      
      <script src="example.js"></script>
      上面的example.js默认就是采用HTTP协议下载,如果要采用HTTPS协议下载,必需写明(假定服务器支持)。
      
      <script src="https://example.js"></script>
      但是有时我们会希望,根据页面本身的协议来决定加载协议,这时可以采用下面的写法。
      
      <script src="//example.js"></script>    
    方法一: window.onload = function(){ }
    方法二: 将script标签放在body的结尾处
  Remarks: 
    原则上,将其放在html头部,但视情况可以将其放在网页的任何部分.
    一个html文件可以有几个<script>...</script>,且可以共享方法和变量.
--------------------------------------------------------------------------------
环境
  在给定事件存在的变量和变量值的集合叫做环境
  在程序开始运行时,环境通常包含一些标准变量(比如函数,包括自定义及系统预设)
  理论上可以给任何变量赋一个新值,如 alert = 5;则alert不再是一个函数,且不能再用于显示信息.
内存
  一般来说,确保占用最少的内存可以让页面获得更好的性能.
  JS垃圾回收
    javascript具有自动垃圾收集机制,即执行环境会负责管理代码执行过程中使用的内存,
    其他语言比如C和C++,必须手动跟踪内存使用情况适时的释放,否则会造成很多问题.
    JS会自行管理内存分配及无用内存的回收.
    优化内存的最佳方案:一旦数据不再有用,那么将其设置为null来释放引用(也叫解除引用)
    解除引用适用于大多数全局变量和全局对象.(PS-Self:局部作用域的变量在执行完毕后不再内存中)
    var a={
      name:"abc"
    };
    a=null;  //解除对象引用,等待垃圾收集器回收
  内存泄漏(可参见 函数>闭包>)
    内存泄漏就是无法销毁驻留在内存中的元素.
    IE的JScript对象和DOM对象使用不同的垃圾收集方式,因此闭包在IE中会导致一些问题.
    setTimeout 的第一个参数使用字符串而非函数的话,会引发内存泄漏.
    IE6 时代有 bug,闭包会造成内存泄漏,这个现在已经无须考虑了.
    其次,闭包本身不会造成内存泄漏,但闭包过多很容易导致内存泄漏.
    这句话很矛盾,技术上讲,闭包是不会造成内存泄漏的,浏览器的 bug 除外.
    但是,闭包会造成对象引用的生命周期脱离当前函数的上下文,
    因此,如果不仔细考虑闭包函数的生命周期,的确有可能出现意料之外的内存泄漏,
    当然,从严格意义上讲,这是程序员自己的 bug,而不是闭包的错.
作用域「执行环境」
  PS:执行环境定义了变量或函数有权访问的其他数据,决定了他们各自的行为.
  作用域与变量
    PS:在局部作用域内定义变量不加var,则定义的为全局全局变量(不推荐使用)
    变量在作用域中的访问规则
      规则1:子作用域内可访问上层作用域的变量,反之则不行.
      规则2:当前作用域的变量优先级高于上层作用域的变量.
      e.g. :
      var aoo=1;
      function foo(){
        var aoo =2;
        var boo =11;
        console.log(aoo);
      }
      foo();            //2 , 规则2
      console.log(boo); // 报错 , 规则1
  全局作用域
    在web浏览器中,全局执行环境被认为是window对象
    所有全局变量和函数都是window对象的属性和方法
    尽量控制全局变量的数量,容易引发bug
    在函数内定义变量不加var即定义的为全局变量.
  块作用域(私有作用域):{...}之间(Self) JS不具备
    if(){}、for(){}等没有作用域
    仿造块级作用域
      PS:使用自我执行的匿名函数达到块级作用域的效果.
        使用块级作用域后,匿名函数中定义的任何变量,都会在执行结束时被销毁.
        采用块级作用域,每个开发者可以使用自己的变量,而不必担心搞乱全局作用域.
      e.g.
     (function(){
        //这里是块级作用域
      })()
      这种做法可以减少闭包占用内存的问题,因为没有指向匿名函数的引用,
      只要函数执行完毕,就可以立即销毁其作用域链了

      function box(){
        //包含自我执行的匿名函数,就可以实现私有作用域
       (function(){
          for(var i=0;i<3;i++){
            console.log(i);
          }
        })();      //出了这个私有作用域,变量立即被销毁
        console.log(i);
      }
      box();
      //打印出0,1,2,然后程序报错:i is not defined
    块级作用域用途:多人协同独立开发环境,不会互相干扰
      在全局作用域中使用块级作用域可以减少闭包占用的内存问题,因为没有指向匿名函数的引用.
     (function(){
        //这里就是全局的私有作用域(块级作用域)
      })();
  函数作用域:每个函数体内为一个作用域 JS具备
    函数作用域的运行机制:
      每个函数被调用时都会创建自己的执行环境,
      当执行到这个函数时,函数的环境就会被推到环境中去执行,
      执行后在环境栈中弹出(退出),把控制权交给上一级的执行环境.
      当执行环境中的所有代码执行完毕后,该环境被销毁,其中的所有变量和函数也随之销毁(没有产生闭包的情况).
      全局环境下,需要程序执行完毕或网页被关闭才会销毁.
      每个执行环境都有一个与之关联的变量对象,环境中定义的所有变量和函数都保存在这个对象中
     (我们无法访问这个变量对象,但解析器处理数据时后台会使用它)
    私有变量:在函数中定义的变量(因为不能在函数的外部访问这些变量)
      私有变量包括函数的参数、局部变量和在函数内部定义的其他函数
      通过闭包访问私有变量
        function Box(){
          var age=100;    //私有变量
          function run(){ //私有函数
            return "运行中";
          }
          this.getAge=function(){ //对外可见的公共接口,特权方法
            return age;
          }
        }
        var box=new Box();
        console.log(box.run);      //undefined,无法调用
        console.log(box.getAge()); //100
  动态作用域: JS不具备
    function foo(){
      console.log(aoo)
    }
    function goo(){
      var aoo =1;
      foo();
    }
    goo(); // 报错, aoo未定义
    若支持动态作用域,则为结果为 1
  静态作用域:也称为词法作用域或闭包  JS具备
    函数创建时所处的作用域为其父作用域,函数可访问其父作用域;但父作用域不可访问子作用域(Self)
      通过闭包来访问函数中的变量
      var goo =function(){
        var aoo =5;
        function foo(){
          console.log(aoo);
        }
        window.foo =foo;
      }();  // 运行一次 ,创建函数和初始化变量
      foo(); // 5
    通过new Function()创建的函数,其父作用域始终指向window(全局)
      new Function() 创建函数
        function foo(){
          var aoo =1;
          var goo =new Function("","console.log(aoo)");
          // 函数 goo 父作用域为window ,相当于在全局创建的函数,不可访问函数作用域的变量
          goo();
        }
        foo();   //报错,aoo未定义
  call apply bind 指定作用域(见 对象>this>)
  模块模式
    e.g. :
    var aoo =function(){
      // 私有变量和私有函数
      var azz =1;
      function fzz(){
      }
      // 创建对象
      var obj =new Foo();
      // 添加特权/公有属性和方法
      obj.bzz = 2;
      obj.gzz =function(){
      }
      return obj;
    }
JS运行过程机理 可近似做如下理解:
  JS代码执行为从上到下顺序执行
  代码执行环境分:全局环境window 和 函数作用域环境
  JS代码执行阶段分:预处理阶段 和 执行阶段
  JS代码运行过程试分析:
    解析器接收到JS代码开始,此时处于全局环境下,解析器先进入预处理阶段
      扫描所有代码,将var声明的全局变量和函数添加到缓存中预备使用
        记录变量名,值为undefined,未使用var的变量未记录;函数则将函数名指向函数
      若函数名和变量名重名,缓存中函数优先级高,覆盖变量名.
    从代码起始部分执行,在全局中,遇到变量声明时将值和名字在缓存中对应起来以便后续使用
      执行阶段若产生覆盖问题,则由最后声明的变量为准
     (函数只在预处理时产生覆盖问题,读取代码执行过程时会跳过函数,因为存在缓存中)
    若进入函数的局部作用域(也可称为子环境),和全局类似先预处理,将变量名和函数添加到子环境的缓存中
      预处理阶段,函数传入的值被放入缓存,不会被后续重名变量干扰,但会被重名函数覆盖
    子环境执行同全局类似,顺序执行,遇到变量声明时将值和名字在缓存中对应起来以便后续执行使用
      在前辈环境不可获取到后代环境的缓存,反之则可以.
      局部环境运行时,优先访问自己的缓存,若无再向上级寻找
      子环境执行完毕,环境会被销毁,缓存不存在;后续再执行则重新再创建
    注: 同类型的,变量和变量重名或函数和函数重名 ,则后面的覆盖前面的
GC,垃圾回收机制 
  早期的计算机语言,比如 C 和 C++,需要开发者手动的来跟踪内存,这种机制的优点是内存分配和释放的效率很高.
  但是它也有着它的缺点,程序员很容易不小心忘记释放内存,从而造成内存的泄露.
  新的编程语言,比如 JAVA, C#, javascript, 都提供了所谓“垃圾回收的机制”,
  运行时自身会运行相应的垃圾回收机制.程序员只需要申请内存,而不需要关注内存的释放.
  垃圾回收器(GC)会在适当的时候将已经终止生命周期的变量的内存给释放掉.
  GC 的优点就在于它大大简化了应用层开发的复杂度,降低了内存泄露的风险.
--------------------------------------------------------------------------------
调试、测试与错误处理
  说明
    在调试页,选中的当前元素,可用$0表示(可在控制台使用$0查找到)
    IE是唯一一个在浏览器的界面显示JS错误信息的浏览器  [IE11已不再如此]
  try-catch 语句 (详见 语句)
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
  浏览器调试
    e.g.
    var i =String.fromCharCode(0) +'1'; //"1"
    // ASCII码 0 对应的是null 控制符 不可写的也不显示的符号
    console.log(i,typeof i,i.length); //1 string 2

    var a ='2 '
    console.log(a);         //2
    console.log(`(${a})`);  //(2 )
    // 方便查看出字符中的空格
  console 对象
    PS:console对象 属于浏览器的实现,包含在浏览器自带的开发工具中,
      虽然还不是标准,但是各大浏览器都原生支持,已成为事实上的标准;
    console.log('a','b',...)    将一般消息记录到控制台
      PS:自动在输入的结尾添加换行符
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
        e.g.:
          console.log(" %s + %s = %s", 1, 1, 2);  //  1 + 1 = 2
          上面代码的 %s 表示字符串的占位符

          两种参数格式,可以结合在一起使用.
          console.log(" %s + %s ", 1, 1, "= 2")
          // 1 + 1  = 2
    console.debug('message')     等价于log
    console.dir()                输出对象的信息,用于显示一个对象的所有属性.
      可读性较好,一般用于输出显示DOM节点
      Node中可指定以高亮形式输出
        console.dir(obj,{color:true})
    console.dirxml()             主要用于以目录树形式显示DOM节点
      若参数不是DOM节点,则等同于dir
    console.table()              对于某些复合类型的数据将其转为表格显示
      e.g. :
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
    console.trace()              当前执行的代码在堆栈中的调用路径.
    console.assert(boolean,info) 来验证某个条件是否为真.
      e.g.:
        如果为假,则显示一条事先指定的错误信息
        console.assert(true === false,"判断条件不成立")
        // Assertion failed: 判断条件不成立
        判断子节点的个数是否大于等于500.
        console.assert(list.childNodes.length < 500, "节点个数大于等于500")
    console.count([str])         用于计数,输出被调用的次数
      接收一个字符串参数,作为标签进行相应的次数统计
      e.g.:
        console.count('a');  // a: 1
        console.count('a');  // a: 2
      
        for (var i = 0; i < 5; i++) { console.count(); }
        // : 1
        // : 2
        // : 3
        // : 4
        // : 5
    console.info('message')      将信息记录到控制台
    console.warn('message')      将警告消息记录到控制台
    console.error('message')     将错误消息记录到控制台
    console.clear()              清空控制台,光标回到第一行.
    console.time()    console.timeEnd()  用于计时,可计算一个操作所花费的准确时间
      e.g.:
        console.time("aoo");
        var array= new Array(1000000);
        for(var i = array.length - 1; i >= 0; i--) {
          array[i] = new Object();
        };
        console.timeEnd("aoo"); // aoo: 242ms
      time方法表示计时开始,timeEnd方法表示计时结束.它们的参数是计时器的名称.
      调用timeEnd方法之后,console窗口会显示“计时器名称: 所耗费的时间”.
    console.profile() console.profileEnd()   性能测试
    console.group()   console.groupEnd()     分组显示
     ( groupEnd chrome中无效)
      这两个方法用于将显示的信息分组.
      它只在输出大量信息时有用,分在一组的信息,可以用鼠标折叠/展开.
    修改定义 console 方法
      因为console对象的所有方法,都可以被覆盖
      
      使用自定义的console.log方法,在显示结果添加当前时间
      ["log", "info", "error"].forEach(function(method) {
        console[method] = console[method].bind(console,new Date().toISOString());
      });
      console.log("出错了！");
      // 2014-05-18T09:00.000Z 出错了！
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
      e.g.:$x("//p[a]")  所有包含a元素的p元素
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
  调试技巧总结
    在手机等不可打开控制台的设备上调试时,
      console.log()不可见,而 alert阻塞运行,
      使用在页面中相应的改变元素来达到感知的效果
Hybrid App 混合开发
  PS-Self:JS可以在网页中通过API操作系统,实现各种功能
  混合开发说的是, 你写的网页运行在手机程序里
  本来网页能提供的功能是有限的
  但是应用程序可以给页面添加函数
  在这种情况下, js 就可以调用别人提供的功能
  这就是混合开发的基础

  比如你 js 不能实现让手机震动的功能
  但是别的程序能实现这个功能, 并且把这个功能
  注册为你网页中的一个 js 函数
  这样 js 也就拥有这个功能了
  然后你调用 vfds() 就让手机震动了

  这样的效果就是原生代码(相对于 js 而言的
  官方开发语言)实现功能并且提供 js 函数
  js 代码用别人提供的功能写逻辑
shim 和 polyfill
  shim 是将不同 api 封装成一种,
    比如 jQuery 的 $.ajax 封装了 XMLHttpRequest,
    IE 用 ActiveXObject 方式创建 xhr 对象.
  polyfill 是 shim 的一种.
    polyfill 特指 shim 成的 api 是遵循标准的,
    其典型做法是在IE浏览器中增加 window.XMLHttpRequest ,内部实现使用 ActiveXObject.
数据结构
  数据结构就是存储数据的方式
  队列
  栈
  链表
    将零散的东西连起来,从而进行有序的操作.
    e.g.
      // 定义零散的东西
      var Node =function(e){
        this.element =e;
        this.next =null
      }
      var n1 =new Node(1);
      var n2 =new Node(2);
      var n3 =new Node(3);
      // 建立关系,连起来
      n1.next = n2;
      n2.next = n3;
      // 将零散东西输出
      var n = n1;
      while(n != null){
        console.log('遍历链表',n.element);
        n = n.next;
      }
  哈希表
    哈希表就是用 字符串 当下标,也就是 JS 中的对象的实现方式
    也是其他语言中的 字典
  树
  集合
  图
    如 点 线 互联 求路线
算法
  复杂度 :对一个操作复杂程度的大致估计
    五种常见时间复杂度 : 消耗的时间
    O(1)     常数复杂度,比如读取数组中的某一个元素
    O(logN)  比如二分搜索,常用于有序列表的查找
    O(N)     比如数组的遍历
    O(NlogN) 两个有序列表求交集,使用二分搜索
    O(N^2)   两个列表求交集
    空间复杂度 : 占用的内存
    O(1)     在数组中返回某一个元素
    O(N)     复制一个数组并返回
--------------------------------------------------------------------------------
浏览器差异
back-forward cache简称bfcache,往返缓存
  Firefox和Opera独有特性,可在用户使用浏览器的“后退”和“前进”按钮时加快页面的转换速度。
  该缓存中不仅保存着页面数据,还保存了DOM和JavaScript的状态；
  实际上是将整个页面都保存在了内存里。
  如果页面位于bfcache中,那么再次打开该页面就不会触发load事件。
--------------------------------------------------------------------------------
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
    e.g.
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
        // 接着判断img的complete属性,如果本地有这张图片的缓存,则该值为true,此时我们可以直接操作这张图片,
        // 如果本地没有缓存,则该值为false,此时我们需要监听img的onload事件,把对img的操作放在onload的回调函数里面,
        // 经过测试,这种方案基本能够兼容目前所有浏览器
  预读取
    DNS 预解析 dns-prefetch
      Exp:通过 DNS 预解析来告诉浏览器未来我们可能从某个特定的 URL 获取资源,
        当浏览器真正使用到该域中的某个资源时就可以尽快地完成 DNS 解析。
      e.g.
        我们将来可能从 example.com 获取图片或音频资源,那么可以在文档顶部的 标签中加入以下内容：
        <link rel="dns-prefetch" href="//example.com">
        当我们从该 URL 请求一个资源时,就不再需要等待 DNS 的解析过程。
      Remarks:
        该技术对使用第三方资源特别有用。
    预连接 preconnect
      Exp:与 DNS 预解析类似,preconnect 不仅完成 DNS 预解析,同时还将进行 TCP 握手和建立传输层协议。
      可以这样使用：<link rel="preconnect" href="http://example.com">
      Ilya Grigorik 的文章中的介绍：
        现代浏览器都试着预测网站将来需要哪些连接,然后预先建立 socket 连接,
        从而消除昂贵的 DNS 查找、TCP 握手和 TLS 往返开销。然而,
        浏览器还不够聪明,并不能准确预测每个网站的所有预链接目标。
        好在,在 Firefox 39 和 Chrome 46 中我们可以使用 preconnect 告诉浏览器我们需要进行哪些预连接。
    预获取 prefetch
      Exp:如果我们确定某个资源将来一定会被使用到,我们可以让浏览器预先请求该资源并放入浏览器缓存中。
      e.g. 一个图片和脚本或任何可以被浏览器缓存的资源：
        <link rel="prefetch" href="image.png">
      与 DNS 预解析不同,预获取真正请求并下载了资源,并储存在缓存中。
        但预获取还依赖于一些条件,某些预获取可能会被浏览器忽略,
        例如从一个非常缓慢的网络中获取一个庞大的字体文件。
        并且,Firefox 只会在浏览器闲置时进行资源预获取。
      Bram Stein 的帖子中说到
        这对 webfonts 性能提升非常明显。
        目前,字体文件必须等到 DOM 和 CSS 构建完成之后才开始下载,使用预获取就可以轻松绕过该瓶颈。
      注意：要测试资源的预获取有点困难,但在 Chrome 和 Firefox 的网络面板中都有资源预获取的记录。
        预获取的资源没有同源策略的限制。
    预获取 subresource
      这是另一个预获取方式,这种方式指定的预获取资源具有最高的优先级,在所有 prefetch 项之前进行：
      <link rel="subresource" href="styles.css">
      Chrome 文档说明：
        rel=prefetch 为将来的页面提供了一种低优先级的资源预加载方式,
        而 rel=subresource 为当前页面提供了一种高优先级的资源预加载。
        所以,如果资源是当前页面必须的,或者资源需要尽快可用,那么最好使用 subresource 而不是 prefetch。
    预渲染 prerender
      这是一个核武器,因为 prerender 可以预先加载文档的所有资源：
      <link rel="prerender" href="http://example.com">
      Steve Souders 的一篇文章中写到：
        这类似于在一个隐藏的 tab 页中打开了某个链接 – 将下载所有资源、创建 DOM 结构、
        完成页面布局、应用 CSS 样式和执行 JavaScript 脚本等。
        当用户真正访问该链接时,隐藏的页面就切换为可见,使页面看起来就是瞬间加载完成一样。
        Google 搜索在其即时搜索页面中已经应用该技术多年了,微软也宣称将在 IE11 中支持该特性。
        需要注意的是不要滥用该特性,当你知道用户一定会点击某个链接时才可以进行预渲染,
        否则浏览器将无条件地下载所有预渲染需要的资源。
    更多相关讨论：
      所有预加载技术都存在一个潜在的风险：对资源预测错误,
      而预加载的开销（抢占 CPU 资源,消耗电池,浪费带宽等）是高昂的,所以必须谨慎行事。
      虽然很难确定用户下一步将访问哪些资源,但高可信的场景确实存在：
        如果用户完成一个带有明显结果的搜索,那么结果页面很可能会被加载
        如果用户进入到登陆页面,那么登陆成功的页面很可能会被加载
        如果用户阅读一个多页的文章或访问一个分页的结果集,那么下一页很可能会被加载
      最后,使用 Page Visibility API 可以防止页面真正可见前被执行。
    预加载 preload
      preload 是一个新规范,与 prefetch 不同（可能被忽略）的是,浏览器一定会预加载该资源：
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
    用innerHTML代替DOM操作,减少DOM操作次数,优化javascript性能。
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
      程序优化永远要优化慢的部分,换语言是无法“优化”的。
  提高网站的性能？
    （1）资源加载
      CSS 顶部, JS 底部
      CSS JS 文件压缩
      尽量使用图片使用精灵图,字体图标
      图片加载可通过延迟加载的方式
      总之就是减少资源体积减少资源请求次数。
    （2）代码性能
      Css：
      使用 CSS 缩写,减少代码量；
      减少查询层级：如.header .logo 要好过.header .top .logo；
      减少查询范围：如.header>li 要好过.header li；
      避免 TAG 标签与 CLASS 或 ID 并存：如 a.top、button#submit；
      删除重复的 CSS；
      ….
      Html：
      减少 DOM 节点：加速页面渲染；
      正确的闭合标签：如避免使用<div/>,浏览器会多一个将它解析成<div\></div\>的过程；
      减少页面重绘。比如 给图片加上正确的宽高值：这可以减少页面重绘,
      ……
      Js：
      避免频繁操作 DOM 节点；
      使用事件委托绑定事件,如将事件绑定在 body 上进行代理；
      尽量少用全局变量；
      减少对象查找,如 a.b.c.d 这种查找方式非常耗性能,尽可能把它定义在变量里；
      多线程 将执行时间过长的运算异步操作.
图片 
  base64
    比起直接引入图片地址,css文件中引入base64格式的图片对样式渲染的性能消耗明显,
    如果大量使用,会带来耗电和发热的问题,需谨慎使用。
    图片转成base64编码后,文档大小较原文件大了一些,而经过 gzip 后两者几乎没有区别。
    将图片资源编码进js文件中,管理和预加载H5应用的图片资源,合理的合并请求可以大大提高页面体验。
---------------------------------------------------------------------以下待整理







