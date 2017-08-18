MVC 模式
  Model,模型层:      提供/保存数据
  Controller,控制层: 数据处理,实现业务逻辑
  View,视图层:       展示数据,提供用户界面
MVVM 模式
  PS:用 View Model 代替 Controller.
    本质:view 绑定 view-model,视图与数据模型强耦合,
    数据的变化实时反映在 view 上,不需要手动处理.
  Model
  View
  View-Model:简化的 Controller,唯一作用就是为 View 提供处理好的数据,不含其他逻辑。
SPA, Single-page application
  前端可以做到: 读写数据 切换视图 用户交互
  这意味着,网页其实是一个应用程序。
  2010 年后,前端工程师从开发页面,变成了开发”前端应用“（跑在浏览器里面的应用程序）。
'Native_App'一种基于智能手机本地操作系统并使用原生程式编写运行的第三方应用程序 
  如iOS、Android、WP系统,也叫本地app。
  一般使用的开发语言为JAVA、C++、Objective-C。
静态页面和动态页面 
  动态页面 : 通过数据库进行架构的网站。
    动态网站除了要设计网页外,还要通过数据库和编程序来使网站具有更多自动的和高级的功能。
    例如,网站里的产品资料和图片数量很多、种类很多,
    为方便顾客查找,就应通过数据库编程来在网页上实现自动搜索；
    系统、在线采购系统、商务交流系统等都是用数据库来做成的
    一般使用PHP ASP JSP 等制作
    动态网页则更新较多,一般用于用户互动较多的网站
  静态网站: 主要是指由静态网站制作而成的网站。
    也可以简单的这样理解:动态网站的功能就是 想填加一条信息,只要登陆会员或者网站管理后台。
    然后像发电子邮件一样,填表单提交后, 网站前台就能显示了,就已经更新完毕了
    静态的需要用FTP或者WEBFTP从服务器上把需要更新的文件下载到本地修改后再上传。
    运行在客户端的程序、网页、插件、组件 属于静态网页,可以脱离服务器运行于浏览器客户端
    静态网页适合更新较少的网站,一般适用于展示型的网站
  区分 : 最简单的方法就是看后缀
    态网页网址中有两个标志性的符号“?”和“&”（有的可能没有&）,?和&就是用来带参数的,
    现在几乎所有的网页都是动态网页。
Web图片 
  格式: 主要有 .png、.jpeg、.gif 等
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
'Scalable_Vector_Graphics',SVG 可缩放矢量图 
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
动画 
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
AMD 规范,'Asynchronous Module Definition'异步模块定义
  异步:有效避免了采用同步加载方式中导致页面假死现象
  模块定义:每个模块必须按照一定的格式编写 
  主要接口有两个:'define'和'require'




