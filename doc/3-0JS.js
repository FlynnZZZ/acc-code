JavaScript 
  JS诞生于1995年,最初用于验证表单输入;现在用来实现网页的特效、动画及交互等;
  解释型的,基于对象和事件驱动并具有相对安全性的客户端脚本语言;
  JS本身不提供任何与 I/O[输入/输出」相关的API[如网络、存储和图形等」,都靠宿主环境提供,
  所以JS只合适嵌入更大型的应用程序环境,去调用宿主环境提供的底层API;
  嵌入js的宿主环境有多种,最常见的环境就是浏览器,另外还有服务器环境,即Node项目;
  JS内容划分: 
    除ECMAScript外,各种宿主环境提供额外的API,以便JS调用;
    以浏览器为例,它提供的额外API可以分成三大类:
    浏览器控制类:操作浏览器,
    DOM类:操作网页的各种元素,
    Web类:实现互联网的各种功能;
    若宿主环境是服务器[如Node」,则会提供各种操作系统的API,比如文件操作、网络通信等;
JS相关知识 
  GC,垃圾回收机制 
    早期的计算机语言,如 C 和 C++,需开发者手动跟踪内存,优点是内存分配和释放的效率高,
    缺点是很容易忘记释放内存,从而造成内存的泄露,
    新的编程语言,比如 JAVA, C#, JS,都提供了谓'垃圾回收的机制',
    运行时自身会运行相应的垃圾回收机制,程序员只需要申请内存,而不需要关注内存的释放 
    垃圾回收器'GC'会在适当的时候将已经终止生命周期的变量的内存给释放掉 
    GC大大简化了应用层开发的复杂度,降低了内存泄露的风险 
    JS具有自动垃圾收集机制,即执行环境会负责管理代码执行过程中使用的内存,
    JS会自行管理内存分配及无用内存的回收.
    优化内存的最佳方案:一旦数据不再有用,那么将其设置为null来释放引用也叫解除引用[]
    解除引用适用于大多数全局变量和全局对象.(PS-Self:局部作用域的变量在执行完毕后不再内存中)
    var a = {
      name:"abc"
    };
    a = null;  //解除对象引用,等待垃圾收集器回收
  环境 
    在给定事件存在的变量和变量值的集合叫做环境
    在程序开始运行时,环境通常包含一些标准变量(比如函数,包括自定义及系统预设)
    理论上可以给任何变量赋一个新值,如 alert = 5;则alert不再是一个函数,且不能再用于显示信息.
  内存 
    一般来说,确保占用最少的内存可以让页面获得更好的性能.
    内存泄漏 : 无法销毁驻留在内存中的数据 [参见 函数>闭包>]
      IE的JScript对象和DOM对象使用不同的垃圾收集方式,因此闭包在IE中会导致一些问题.
      setTimeout 的第一个参数使用字符串而非函数的话,会引发内存泄漏.
      IE6时代有 bug,闭包会造成内存泄漏,这个现在已经无须考虑了.
      其次,闭包本身不会造成内存泄漏,但闭包过多很容易导致内存泄漏.
      这句话很矛盾,技术上讲,闭包是不会造成内存泄漏的,浏览器的 bug 除外.
      但是,闭包会造成对象引用的生命周期脱离当前函数的上下文,
      因此,若不仔细考虑闭包函数的生命周期,的确有可能出现意料之外的内存泄漏,
      当然,从严格意义上讲,这是程序员自己的 bug,而不是闭包的错.
  JS引擎 
    真正执行JS代码的地方,
    常见的引擎有V8[目前最快JS引擎、Google生产」、JS core;
    JS引擎主要做了下面几件事情:
    一套与宿主环境相联系的规则;
    JS引擎内核[基本语法规范、逻辑、命令和算法」;
    一组内置对象和API;
    其他约定.
  JS运行过程机理 
    可近似做如下理解:
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
约定&自我约定  
  参数的表示中,使用[]包裹起来的表示可选参数 
    str.slice(beginSlice[, endSlice])  表示第二个参数为可选
--------------------------------------------------------------------------------
Library库 
  每个项目为了提高开发效率,创建一个库来存放大量的重复调用的代码
  把各种常用的代码片段,组织起来放在一个JS文件中,组成的一个包就是JavaScript库.
  库是一个编程术语,意思是一些列函数的集合
  标准库指的是语言自带的库
Framework框架 
  框架与库的概念类似,一般框架规模大于库.
  框架更强调整体,解决方案,考虑的不单单是某个具体的方法或函数,
  而是注重从细节到宏观的整体思路,
  比如UI解决方案可以用ExtJS,
  Mobile开发可以用jQueryMobile,
  MVC解决方案用backbone.
MVC 模式 
  Model,模型层:      提供/保存数据
  Controller,控制层: 数据处理,实现业务逻辑
  View,视图层:       展示数据,提供用户界面
MVVM 模式 
  PS:用 View Model 代替 Controller 
    本质:view 绑定 view-model,视图与数据模型强耦合,
    数据的变化实时反映在view上,不需要手动处理.
  Model
  View
  View-Model:简化的 Controller,唯一作用就是为 View 提供处理好的数据,不含其他逻辑。
--------------------------------------------------------------------------------
静态页面和动态页面 
  动态页面 : 通过数据库进行架构的网站 
    动态网站除了要设计网页外,还要通过数据库和编程序来使网站具有更多自动的和高级的功能。
    例如,网站里的产品资料和图片数量很多、种类很多,
    为方便顾客查找,就应通过数据库编程来在网页上实现自动搜索；
    系统、在线采购系统、商务交流系统等都是用数据库来做成的
    一般使用PHP ASP JSP 等制作
    动态网页则更新较多,一般用于用户互动较多的网站
  静态网站: 主要是指由静态网站制作而成的网站 
    也可以简单的这样理解:动态网站的功能就是 想填加一条信息,只要登陆会员或者网站管理后台。
    然后像发电子邮件一样,填表单提交后, 网站前台就能显示了,就已经更新完毕了
    静态的需要用FTP或者WEBFTP从服务器上把需要更新的文件下载到本地修改后再上传。
    运行在客户端的程序、网页、插件、组件 属于静态网页,可以脱离服务器运行于浏览器客户端
    静态网页适合更新较少的网站,一般适用于展示型的网站
  区分 : 最简单的方法就是看后缀 
    态网页网址中有两个标志性的符号“?”和“&”（有的可能没有&）,?和&就是用来带参数的,
    现在几乎所有的网页都是动态网页。
'Single-page application'SPA,单页应用 
  前端可以做到: 读写数据 切换视图 用户交互,意味着,网页其实是一个应用程序; 
  2010 年后,前端工程师从开发页面,变成了开发'前端应用',运行在在浏览器里面的应用程序 
'Native_App'一种基于智能手机本地操作系统并使用原生程式编写运行的第三方应用程序 
  如iOS、Android、WP系统,也叫本地app。
  一般使用的开发语言为JAVA、C++、Objective-C。
'Hybrid_App'混合开发 
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
--------------------------------------------------------------------------------
'Web Imgs'图片 
  格式 : 主要有'.png''.jpeg''.gif'等 
  gif,图形交换格式   :  最多256种颜色,支持透明色、动画 
  png,网络可移植格式 :  最多1670万种 ,支持透明色,不支持动画 
  jpeg,联合图像专家组:  最多1670万种 ,不支持透明色、动画 
    PS:JPEG文件有两种保存方式,分别是Baseline JPEG和Progressive JPEG。
      两种格式有相同尺寸以及图像数据,扩展名也是相同的,唯一的区别是二者显示的方式不同。
    Baseline JPEG,渐进式 JPEG
      该类型的JPEG文件存储方式是按从上到下的扫描方式,把每一行顺序的保存在JPEG文件中。
      打开这个文件显示它的内容时,数据将按照存储时的顺序从上到下一行一行的被显示出来,
      直到所有的数据都被读完,就完成了整张图片的显示。
      如果文件较大或者网络下载速度较慢,那么就会看到图片被一行行加载的效果,
      这种格式的JPEG没有什么优点,因此,一般都推荐使用Progressive JPEG。
    Progressive JPEG,标准型
      Progressive JPEG文件包含多次扫描,这些扫描顺寻的存储在JPEG文件中。
      打开文件过程中,会先显示整个图片的模糊轮廓,随着扫描次数的增加,变得越来越清晰。
      这种格式的主要优点是在网络较慢的情况下,可以看到图片的轮廓知道图片大概。
      在一些网站打开较大图片时,你就会注意到这种技术。
      渐进式图片带来的好处是可以让用户在没有下载完图片就可以看到最终图像的大致轮廓,
      一定程度上可以提升用户体验。（瀑布留的网站建议还是使用标准型的）
      另外渐进式的图片的大小并不会和基本的图片大小相差很多,有时可能会比基本图片更小。
      渐进式的图片的缺点就是对CPU和内存开销大一点;
    保存为 Progressive JPEG
      在photoshop中有“存储为web所用格式”,打开后选择“连续”就是渐进式JPEG。
  base64 
    比起直接引入图片地址,css文件中引入base64格式的图片对样式渲染的性能消耗明显,
    若大量使用,会带来耗电和发热的问题,需谨慎使用。
    图片转成base64编码后,文档大小较原文件大了一些,而经过gzip后两者几乎没有区别。
    将图片资源编码进js文件中,管理和预加载H5应用的图片资源,合理的合并请求可以大大提高页面体验。
'Animation'动画 
  实现方式 
    JavaScript 通过定时器刷新,间隔来改变元素样式。
    CSS3 transition和animation。
    HTML5 使用HTML5提供的绘图方式:
  绘制频率 
    页面每一帧变化都是系统绘制出来的（GPU或者CPU）。
    它的最高绘制频率受限于显示器的刷新频率（而非显卡）, 
    所以大多数情况下最高的绘制频率只能是每秒60帧,对应于显示器的60Hz
    帧,frame per second,简称fps;
  刷新频率
    图像在屏幕上更新的速度,也就是屏幕上的图像每秒出现的次数,单位是Hz,
    刷新频率越高,屏幕上图片闪烁感就越小,稳定性也就越高。
    人的眼睛不容易察觉75Hz以上刷新频率带来的闪烁感。
  硬件加速
    硬件有三个处理器:CPU、GPU和APU（声音处理器）。他们通过PCI/AGP/PCIE总线交换数据。
    GPU在浮点运算、并行计算等部分计算方面,明显高于CPU的性能。
  fps 
    GPU渲染画面的频率, 游戏里谈到掉帧,是指GPU渲染画面频率降低。
    比如跌落到30fps甚至20fps,但因为视觉暂留原理,我们看到的画面仍然是运动和连贯的。
  Hz
    显示器刷新屏幕的频率
--------------------------------------------------------------------------------
'Scalable_Vector_Graphics'SVG,可缩放矢量图 
  PS:一种描述向量图形的XML格式的标记化语言。
    也就是说,SVG本质上是文本文件,格式采用XML,可以在浏览器中显示出矢量图像。
    由于结构是XML格式,使得它可以插入HTML文档,成为DOM的一部分,
    然后用JavaScript和CSS进行操作。
    相比传统的图像文件格式(比如JPG和PNG),SVG图像的优势就是文件体积小,
    并且放大多少倍都不会失真,因此非常合适用于网页。
    SVG图像可以用专门的图像软件生成。
    目前,所有主流浏览器都支持,
    对于低于IE 9 的浏览器,可以使用第三方的polyfills函数库。
  SVG插入网页的方法
    直接把SVG代码写在HTML网页里面。
      <svg id="mysvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" >
        <circle id="mycircle" cx="400" cy="300" r="50" />
      <svg>
    SVG代码也可以写在一个独立文件中,
      然后用在<img>、<object>、<embed>、<iframe>等标签,
      以及CSS的background-image属性,将这个文件插入网页。
      <!-- 方法一 -->
      <img src="circle.svg">
      <!-- 方法二 -->
      <object id="object" data="circle.svg" type="image/svg+xml"></object>
      <!-- 方法三 -->
      <embed id="embed" src="icon.svg" type="image/svg+xml">
      <!-- 方法四 -->
      <iframe id="iframe" src="icon.svg"></iframe>
      上面是四种在网页中插入SVG图像的方式。
    SVG文件还可以插入其他DOM元素
      Example:在<div>元素中插入svg
      <div id="stage"></div>
      <script>
      $('#stage').load('icon.svg', function (response) {
        $(this).addClass('svgLoaded');
        if (!response) { /* 加载失败的处理代码 */ }
      });
      </script>
  SVG文件采用XML格式,就是普通的文本文件。
    下面是一个例子。
      <svg width="300" height="180">
        <circle cx="30"  cy="50" r="25" />
        <circle cx="90"  cy="50" r="25" class="red" />
        <circle cx="150" cy="50" r="25" class="fancy" />
      </svg>
      上面的代码定义了三个圆,cx、cy、r属性分别为x坐标、y坐标和半径。
      利用class属性,可以为这些圆指定样式。
      .red { fill: red; /* not background-color! */ }
      .fancy {
        fill: none;
        stroke: black; /* similar to border-color */
        stroke-width: 3pt; /* similar to border-width */
      }
      上面代码中,
      fill属性表示填充色,
      stroke属性表示描边色,
      stroke-width属性表示边框宽度。
    除了<circle>标签表示圆,SVG文件还可以使用表示其他形状的标签。
      <svg>
        <!-- 直线 -->
        <line x1="0" y1="0" x2="200" y2="0" style="stroke:rgb(0,0,0);stroke-width:1"/>
        <!-- 矩形 -->
        <rect x="0" y="0" height="100" width="200" style="stroke: #70d5dd; fill: #dd524b" />
        <!-- 椭圆 -->
        <ellipse cx="60" cy="60" ry="40" rx="20" stroke="black" stroke-width="5" fill="silver"/>  <polygon fill="green" stroke="orange" stroke-width="10" points="350, 75  379,161 469,161 397,215 423,301 350,250 277,301 303,215 231,161 321,161"/><polygon>
        <!-- 多边形 -->
        <polygon points="60,20 100,40 100,80 60,100 20,80 20,40"/>
        <!-- 路径 -->
        <path id="path1" d="M160.143,196c0,0,62.777-28.033,90-17.143c71.428,28.572,73.952-25.987,84.286-21.428" style="fill:none;stroke:2;"></path>
        <!-- 文本 -->
        <text x="250" y="25">Hello World</text>
      </svg>
      上面代码中,
      line、rect、ellipse、polygon和path标签,
      分别表示线条、矩形、椭圆、多边形、路径和文字。
    g 标签用于将多个形状组成一组(group)。
      <svg width='300' height='180'>
        <g transform='translate(5, 15)'>
          <text x="0" y="0">Howdy!</text>
          <path d="M0,50 L50,0 Q100,0 100,50"
            fill="none" stroke-width="3" stroke="black" />
        </g>
      </svg>
    SVG文件里面还可以插入图片文件。
      <svg viewBox="0 0 1 1" width="100" height="100">
        <image xlink:href="path/to/image.jpg"
          width="100%" height="100%"
          preserveAspectRatio="xMidYMid slice"/>
      </svg>
      上面代码中,
      viewBox表示长宽比例,这里是 1:1 ,即正方形,
      第一对 width 和 height 表示图形默认的宽和高(CSS代码可以覆盖掉这两个值),
      xlink:href表示引用图像的来源,
      第二对width和height表示图像占满整个SVG图形,
      preserveAspectRatio等于xMidYMid slice,
      告诉浏览器置中图片,并且删去溢出的部分,更多参数可以参考MDN。
  DOM 操作
    若SVG代码直接写在HTML网页之中,它就成为网页DOM的一部分,可以直接用DOM操作。
    <svg id="mysvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" >
      <circle id="mycircle" cx="400" cy="300" r="50" />
    <svg>
    上面代码插入网页之后,就可以用CSS定制样式。
    circle {
      stroke-width: 5;
      stroke: #f00;
      fill: #ff0;
    }
    circle:hover {
      stroke: #090;
      fill: #fff;
    }
    然后,可以用JavaScript代码操作SVG文件。
    var mycircle = document.getElementById('mycircle');
    mycircle.addEventListener('click', function(e) {
      console.log('circle clicked - enlarging');
      mycircle.setAttributeNS(null, 'r', 60);
    }, false);
    上面代码指定,若点击图形,就改写circle元素的r属性。
  JavaScript操作
    获取SVG DOM
      若使用<img>标签插入SVG文件,就无法获取SVG DOM。
      使用<object>、<iframe>、<embed>标签,可以获取SVG DOM。
      var svgObject = document.getElementById('object').contentDocument;
      var svgIframe = document.getElementById('iframe').contentDocument;
      var svgEmbed = document.getElementById('embed').getSVGDocument();
      由于SVG文件就是一般的XML文件,因此可以用DOM方法,选取页面元素。
      // 改变填充色
      document.getElementById('theCircle').style.fill = 'red';
      // 改变元素属性
      document .getElementById('theCircle') 
      .setAttribute('class', 'changedColors');
      // 绑定事件回调函数
      document .getElementById('theCircle')
      .addEventListener('click', function () {
        console.log('clicked')
      });
    读取svg源码
      由于svg文件就是一个XML代码的文本文件,因此可以通过读取XML代码的方式,读取SVG源码。
      <div id="svg-container">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" width="500" height="440" >
          <!-- svg code -->
        </svg>
      </div>
      使用XMLSerializer实例的serializeToString方法,获取svg元素的代码。
      var svgString = new XMLSerializer()
      .serializeToString(document.querySelector('svg'));
    将svg图像转为canvas图像
      首先,需要新建一个Image对象,将svg图像指定到该Image对象的src属性。
      var img = new Image();
      var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
      var DOMURL = self.URL || self.webkitURL || self;
      var url = DOMURL.createObjectURL(svg);
      img.src = url;
      然后,当图像加载完成后,再将它绘制到<canvas>元素。
      img.onload = function () {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
      };
      Example: 假定我们要将下面的表格画成图形。
      
      Date	Amount
      2014-01-01	$10
      2014-02-01	$20
      2014-03-01	$40
      2014-04-01	$80
      上面的图形,可以画成一个坐标系,
      Date作为横轴,
      Amount作为纵轴,
      四行数据画成一个数据点。
      <svg width="350" height="160">
        <g class="layer" transform="translate(60,10)">
          <circle r="5" cx="0"   cy="105" />
          <circle r="5" cx="90"  cy="90"  />
          <circle r="5" cx="180" cy="60"  />
          <circle r="5" cx="270" cy="0"   />
          <g class="y axis">
            <line x1="0" y1="0" x2="0" y2="120" />
            <text x="-40" y="105" dy="5">$10</text>
            <text x="-40" y="0"   dy="5">$80</text>
          </g>
          <g class="x axis" transform="translate(0, 120)">
            <line x1="0" y1="0" x2="270" y2="0" />
            <text x="-30"   y="20">January 2014</text>
            <text x="240" y="20">April</text>
          </g>
        </g>
      </svg>
'eXtensible Markup Language'XML,可扩展标记语言 
  PS:与HTML一样都属于SGML标准通用语言 
    在使用XML传输信息时,若数据本身为XML文件,则不需设置'Content-Type',
    若由后台程序动态生成,则需设置为'text/xml'  
  语法 
    任何起始标签都必须有一个结束标签,简化写法即自闭合标签 
    所有的属性都需要有值,使用双引号括起来 
    XML文档只能有一个顶层元素 
  解析XML 
    在jQuery中和解析DOM一样可使用操作DOM的方法来操作XML  
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
'shim'&'polyfill' 
  shim 是将不同 api 封装成一种,
    比如 jQuery 的 $.ajax 封装了 XMLHttpRequest,
    IE 用 ActiveXObject 方式创建 xhr 对象.
  polyfill 是 shim 的一种.
    polyfill 特指 shim 成的 api 是遵循标准的,
    其典型做法是在IE浏览器中增加 window.XMLHttpRequest ,内部实现使用 ActiveXObject.
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
--------------------------------------------------------------------------------
收集总结分析 
  当程序的执行为按先后执行的流程时,需要考虑到某些语句未执行的情况 
    Example: 判断一个数组中是否存在数字1.
      function func(arr){
        var len = arr.length;
        for(var i = 0; i < len; i++) {
          if(arr[i]-1==0) {
            return true;
          }
        }
        //需要考虑到for未执行的情况,当数组为空时,for不执行.
        // 在for后面加一个return false来执行arr为空的情况
        // 考虑到for执行而if未执行的情况
        // 考虑到for和if都执行的情况.
        return false;
      }
  使用JS配合CSS的transition来产生过渡动画 
    先在元素的CSS中定义transition来'监听变化',
    再动态的给一个元素添加一个class,使其某个属性发生变化,从而达到动画效果,而非直接到结果.
    注意:不可使元素从无到有的进行过渡,如将display:none;换成visiblity:hidden;
  对象封装 
    Example: :
    var aoo = {
      message:"abc",
      click:function(e){
        alert(this.message);
      }
    }
    var btn =document.getElementById("myBtn");
    btn.onclick =function(){
      aoo.click();
    }
  奇怪的代码 
    赋值 = 
      var a , b , c = 1;
      console.log(a,b,c); // undefined undefined 1
      b = ( a = c );
      console.log(a,b,c); // 1 1 1
      相当于 
      a = c;
      b = a;

      var a = b =1
      相当于
      var a = 1;
      b = 1;     //  b为全局变量

      var aoo = a || b;
      相当于
      if(a) {
        var aoo = a;
      }
      else {
        var aoo = b;
      }
---------------------------------------------------------------------以下待整理


