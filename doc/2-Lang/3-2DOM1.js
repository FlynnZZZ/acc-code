DOM'Document Object Model'文档对象模型: 提供访问和操作网页内容的方法和接口  
  PS: 由W3C规定,一种结构化表示文档的方法,可改变文档的内容和呈现方式 
DOM树: 将整个HTML文件、标签看成一个由对象组成的树 
  结构: document > 'html' > 'head'+'body' > ... 
  document为根节点 
  <HTML>为文档元素,是文档的最外层元素,文档中的其他所有元素都包含在该元素中; 
  每一段标记都可以通过树中的一个节点来表示;
  对DOM的任何修改都会在浏览器呈现DOM时立即反映出来;
  DOM不是专为HTML设计的,是通用型的标准,为所有标记语言而设计,
  IE中DOM对象以COM对象形式实现,故IE与原生JS对象有差异; 
Node 节点类,所有节点类型都继承自Node类型 
  PS: 节点分不同类型,分别表示文档中不同的信息或标记,共有12种 
    并非所有节点类型浏览器都支持,最常用的节点类型为'元素节点'和'文本节点' 
    一节点不能同时存在多个文档中,也不能同时出现在一文档的多个位置  
    IE未公开Node类型的构造函数,故无 Node 的静态属性/方法 
  Node.xx  
    ◆节点类型的数值表示  
    9===Node.DOCUMENT_NODE    document节点
    1===Node.ELEMENT_NODE    元素节点 
    3===Node.TEXT_NODE    文本节点 
    8===Node.COMMENT_NODE    注释节点,表示一注释  
    10===Node.DOCUMENT_TYPE_NODE   文档类型的定义 
    11===Node.DOCUMENT_FRAGMENT_NODE   文档片段 
    7===Node.PROCESSING_INSTRUCTION_NODE  文档处理程序使用的特有指令 
    DOM4已弃用的节点类型 
      2===Node.ATTRIBUTE_NODE    元素的耦合属性
      4===Node.CDATA_SECTION_NODE    在XML文档中表示Character Data(字符数据)部分
      5===Node.ENTITY_REFERENCE_NODE    表示一个实体引用
      6===Node.ENTITY_NODE    在XML文档中表示一个实体
      12===Node.NOTATION_NODE   在XML文档中表示一个符号
    ◆其他
    1===Node.DOCUMENT_POSITION_DISCONNECTED   
    2===Node.DOCUMENT_POSITION_PRECEDING   
    4===Node.DOCUMENT_POSITION_FOLLOWING   
    8===Node.DOCUMENT_POSITION_CONTAINS   
    16===Node.DOCUMENT_POSITION_CONTAINED_BY   
    32===Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC   
  ◆Node.prototype.xx 
  ★节点信息 
    num = node.nodeType  节点类型 
    str = node.nodeName  节点名称 
      标签的大写形式 元素节点
      属性名称      属性节点 
      "#document"  文档节点document
      '#text'      文本节点  
      "#comment"   注释节点  
      "#document-fragment" 文档片段节点 
    val = node.nodeValue   节点值  
      元素节点无节点值,返回 null
      属性节点返回属性值;
      文本节点返回文本内容[不包含html] 
      注释节点值为注释的内容 
      文档片段节点无节点值,返回 null 
    str = node.baseURI  当前节点所在文档的基URI,若无法获取则返回null 
      一般情况下,基URL为 document.location ,但是它受诸多方面因素的影响,
      例如 HTML 的 <base> 元素和 XML xml:base 属性
    bol = node.isConnected  
  ★节点关系 
    document = node.ownerDocument   文档节点document 
    pElem = cNode.parentElement  父元素节点[包括元素内的后代元素]  
    pNode = cNode.parentNode  父节点 
      属性节点无父节点,为 null 
      文档片段节点无父节点,为 null 
    node0 = node1.previousSibling  前一兄弟节点[第一个节点的该属性为null] 
    node1 = node0.nextSibling      后一个兄弟节点[最后一个节点的该属性为null] 
    cNode = pNode.firstChild  第一个子节点[若没有子节点则为null]  
    cNode = pNode.lastChild   最后一个子节点[若没有子节点则为null] 
    bol = nod1.isSameNode(nod2)  是否为同一节点引用 [DOM3] 
    bol = node.isEqualNode(node1) 两个节点是否具有同样类型、属性、子节点等 [DOM3]  
    bol = pNode.hasChildNodes(cNode)  是否有该子节点 
    bol = node.contains(targeNode)  是否包含目标节点 [专有扩展] 
    num = node.compareDocumentPosition(targetNode) 确定节点间的关系  [DOM3][IE9+]
      返回数值,表示该关系的位掩码'bitmask'
      1     无关,给定的节点不再当前文档中 
      2     居前,给定的节点在DOM树中位于参考节点之前 
      4     居后,给定的节点在DOM树中位于参考节点之后 
      8     包含,给定的节点是参考节点的祖先 
      16    被包含,给定的节点是参考节点的后代 
  ★节点操作 
    str = node.textContent 读写,节点及其内部节点的文本内容 [DOM3][IE9+] 
      PS:innerText 返回值会忽略行内样式和脚本,但textContent则会返回行内样式和脚本代码.
        若对象为 Document,DocumentType 或者 Notation 类型节点,则 textContent 返回 null
        若你要获取整个文档的文本以及CDATA数据,
        可以使用 document.documentElement.textContent.
        若节点是个CDATA片段,注释,ProcessingInstruction节点或一个文本节点,
        textContent 返回节点内部的文本内容(即 nodeValue).
        对于其他节点类型,textContent 将所有子节点的 textContent 合并后返回,
        除了注释、ProcessingInstruction节点.
        若该节点没有子节点的话,返回一个空字符串.
        在节点上设置 textContent 属性的话,会删除它的所有子节点,并替换为给定的文本节点.
    document = node.getRootNode() 文档节点document 
    cNode = pNode.appendChild(cNode)  节点内部尾部添加子节点  
      cNode 子节点,若为文档中的节点,则是移动操作[原位置消失,在插入位置出现] 
    cNode = pNode.insertBefore(cNode,flagNode)  节点内的指定节点前插入子节点 
      flagNode  父节点内指定的节点,为 null 时,等同于 appendChild 
    cNode = pNode.removeChild(cNode)  删除子节点 
    oldNode = pNode.replaceChild(newNode,oldNode) 在节点内用新节点替换旧节点 
    node = node1.cloneNode(bol)  复制节点[但未添加到文档结构中] 
      PS: 不会复制节点中JS添加的属性,如事件等,只复制特性 
        IE中存在bug会复制事件处理程序,可以通过复制前移除事件来决解 
      bol   true 复制节点及其整个子节点树;false 只复制节点本身[只有标签]
    node.normalize()  合并同一级别的文本节点 
      浏览器在解析文档时不会创建相邻的文本节点
      当在一个元素节点中相邻添加多个文本节点时,外观上是合并在一起,访问时仍是保持独立的
      var element = document.createElement("div");
      element.className = "message";
      var textNode = document.createTextNode("Hello world!");
      element.appendChild(textNode);
      var anotherTextNode = document.createTextNode("Yippee!");
      element.appendChild(anotherTextNode);
      document.body.appendChild(element);
      alert(element.childNodes.length); //2
      element.normalize();
      alert(element.childNodes.length); //1
      alert(element.firstChild.nodeValue); // "Hello world!Yippee!"
  ★常量 
    1===node.ELEMENT_NODE  
    2===node.ATTRIBUTE_NODE  
    3===node.TEXT_NODE  
    4===node.CDATA_SECTION_NODE  
    5===node.ENTITY_REFERENCE_NODE  
    6===node.ENTITY_NODE  
    7===node.PROCESSING_INSTRUCTION_NODE  
    8===node.COMMENT_NODE  
    9===node.DOCUMENT_NODE  
    10===node.DOCUMENT_TYPE_NODE  
    11===node.DOCUMENT_FRAGMENT_NODE  
    12===node.NOTATION_NODE  
    1===node.DOCUMENT_POSITION_DISCONNECTED  
    2===node.DOCUMENT_POSITION_PRECEDING  
    4===node.DOCUMENT_POSITION_FOLLOWING  
    8===node.DOCUMENT_POSITION_CONTAINS  
    16===node.DOCUMENT_POSITION_CONTAINED_BY  
    32===node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC  
  ★命名空间相关 
    bol = node.isDefaultNamespace()  
    node.lookupNamespaceURI()  
    node.lookupPrefix()  
  ★已废弃 
    node.setUserData()   节点添加额外数据 [DOM3]
document DOM根节点,表示浏览器中的整个页面,包含完整的DOM 
  子节点可为: 
    DocumentType[最多一个]、Element[最多一个]、ProcessingInstruction 或 Comment
  Document  [继承 Node] 
    console.log(Document.prototype.__proto__.constructor===Node); // true,继承 Node  
    ◆Document.prototype.xx  
    ★页面信息  
      str = document.referrer 获取跳转页的URL,即获取从哪个网址跳转过来的 
        PS:若当前文档不是通过超级链接访问的,则为空字符串''
          这个属性允许客户端JS访问HTTP引用头部 
      str = document.URL      当前页完整URL 
      str = document.defaultCharset  根据浏览器及操作系统的设置,当前文档默认的字符集 [HTML5]
        [Chrome不支持?] 
      str = document.readyState  文档的加载状态 [HTML5] 
        'loading'  正在加载文档 
        'complete' 已加载完文档 
      str = document.compatMode  浏览器渲染模式 [HTML5] 
        IE6开始区分渲染页面的模式是标准的还是混杂的,IE为此给document添加了'compatMode'属性 
        "CSS1Compat" 标准模式 
        "BackCompat" 混杂模式 
      bol = document.hasFocus()  检测文档是否获得了焦点  [HTML5] 
    ★操作页面 
      str = document.domain   读写,当前页域名 
        出于安全方面的限制,可设置的值存在限制 
          不能将这个属性设置为URL中不包含的域,
          如果URL中包含一个子域名,例如p2p.wrox.com,则只能将domain设置为"wrox.com"
        当页面中包含其他子域的框架或内嵌框架时,可设置 document.domain 后从而可通信 
          由于跨域安全限制,来自不同子域的页面无法通过JS通信。
          通过将每个页面的 document.domain 设置为相同的值,就可互相访问对方的JS对象了
          Example: 
          假设有一个页面加载自www.wrox.com,其中包含一个内嵌框架,框架内的页面加载自p2p.wrox.com。
          由于document.domain 字符串不一样,内外两个页面之间无法相互访问对方的JavaScript 对象。
          但如 果将这两个页面的document.domain 值都设置为"wrox.com",它们之间就可以通信了。
        当域名是'loose'松散的,则不可将其再设为'tight'紧绷的 
          在将document.domain 设置为"wrox.com"之后,
          就不能再将其设置回"p2p.wrox.com",否则报错 
      str = document.charset  读写,文档实际使用的字符集 [HTML5] 
        也可通过<meta>元素、响应头部修改 
      str = document.characterSet  字符集 
      str = document.title    读写,网页标题 
      str = document.cookie 
    ★元素快捷获取 
      document.defaultView  当前document对应的window对象,不存在则为 null [DOM2] 
        IE不支持该属性,有 document.parentWindow 和其等价
        console.log(document.defaultView === window); // true  
      document.documentElement  <html>元素 
        document.documentElement.clientWidth   获取视口的宽度
        document.documentElement.clientHeight  获取视口的宽度
        document.documentElement.textContent   获取整个文档的文本以及CDATA数据
      document.head   <head>元素[HTML5]  
      document.body   <body>元素 
        等价于 document.querySelector("body");
    ★元素获取 
      document.childElementCount [ElementTraversal]
      document.firstElementChild [ElementTraversal]
      document.lastElementChild  [ElementTraversal]
      document.children 
      document.rootElement 
      document.activeElement   DOM中当前获得了焦点的元素[HTML5] 
        默认情况下,文档刚加载完时,document.activeElement 为 document.body 
        文档加载期间,document.activeElement 为 null
      elem = document.getElementById("idName")  通过id值获取对应的第一个元素 
        id值区分大小写;不存则返回 null 
      document.querySelector()       [SelectorsAPI]
    ★元素操作 
      document.prepend()  
      document.append()  
      node = document.importNode(nod,bol) 复制节点,插入并返回  [DOM2]
        PS: 将外部文档的一个节点拷贝一份,然后可以把这个拷贝的节点插入到当前文档中 
          源节点不会从外部文档中删除,被导入的节点是源节点的一个拷贝 
          HTML中不常用,XML中常用 
        Example:
        var iframe = document.getElementsByTagName("iframe")[0];
        var oldNode = iframe.contentDocument.getElementById("myNode");
        var newNode = document.importNode(oldNode, true);
        document.getElementById("container").appendChild(newNode);
    ★创建节点 
      elem = document.createElement('tagName'[,options])  创建元素对象 
        PS: 只是创建了一空元素[只有标签],无属性和内容,还没添加到html中[驻留在内存中] 
        'tagName' str,待创建元素的标签名  
          HTML中不区分大小写,XML中区分大小写 
        options   可选,'ElementCreationOptions'对象 
        IE中可传入HTML代码来创建HTML元素 
          var div =document.createElement("<div class="a" id="b"></div>");
        当指定未定义的元素时,创建一个 HTMLUnknownElement 
          console.log(HTMLUnknownElement===document.createElement('abc').constructor); // true 
      txt = document.createTextNode("文本")      创建一文本节点
      comt = document.createComment("文本")   创建一注释节点[Chrome、IE不支持] 
      atr = document.createAttribute("attrName") 创建属性节点 
      frag = document.createDocumentFragment("文本") 创建文档片段
    ★文档流写入、打开、关闭 
      document.write(str)    将输出流写入到网页中  
        可使用该方法动态的包含外部资源,比如JS文件 
          document.write("<script type=\"text/javascript\" src=\"file.js\"><\/script>");
          注意不能在字符串中直接包含"</script>",需进行转义为'<\/script>' 
          否则会导致被解析为脚本块的结束
        清空原网页输出&叠加输出  
          文档加载完毕后,文档流已经关闭 
          当执行document.write()时,会先调用document.open()创建一个新的文档流,
          在写入新的内容,再通过浏览器展现,会导致原内容被清空 
          当文档未加载完毕,且文档流未关闭时,执行 document.wirte() 会叠加输出  
      document.writeln(str)  换行输出,类似write,会在输出末尾加一换行符'\n' 
      document.open(url,str,target)  新建新建窗口,并打开文档流 
        url 打开窗口的网址,默认为在当前网址后增加,使用'http://xxx'则表示一新网址 
        target 打开窗口的位置,可选'_blank'...
      document.close() 关闭手动创建的文档流 
    ★待整理 
      document.xmlEncoding 
      document.xmlVersion 
      document.xmlStandalone 
      document.anchors 
      document.applets 
      document.selectedStylesheetSet 
      document.preferredStylesheetSet 
      document.scrollingElement 
      document.hidden 
      document.visibilityState 
      document.fonts 
      document.pointerLockElement 
      document.createCDATASection()  
      document.createProcessingInstruction()  
      document.adoptNode()  
      document.write()  
      document.execCommand()  
      document.queryCommandEnabled()  
      document.queryCommandIndeterm()  
      document.queryCommandState()  
      document.queryCommandSupported()  
      document.queryCommandValue()  
      document.exitPointerLock()  
      document.registerElement()  
      document.caretRangeFromPoint()  
      document.getSelection()  
      document.elementFromPoint()  
      document.elementsFromPoint()  
      document.createExpression()  
      document.createNSResolver()  
      document.evaluate()  
    ★事件相关 
      document.onreadystatechange 
      document.onpointerlockchange 
      document.onpointerlockerror 
      document.onwebkitfullscreenchange 
      document.onwebkitfullscreenerror 
      document.onabort 
      document.onblur 
      document.oncancel 
      document.oncanplay 
      document.oncanplaythrough 
      document.onchange 
      document.onclick 
      document.onclose 
      document.oncontextmenu 
      document.oncuechange 
      document.ondblclick 
      document.ondrag 
      document.ondragend 
      document.ondragenter 
      document.ondragleave 
      document.ondragover 
      document.ondragstart 
      document.ondrop 
      document.ondurationchange 
      document.onemptied 
      document.onended 
      document.onerror 
      document.onfocus 
      document.oninput 
      document.oninvalid 
      document.onkeydown 
      document.onkeypress 
      document.onkeyup 
      document.onload 
      document.onloadeddata 
      document.onloadedmetadata 
      document.onloadstart 
      document.onmousedown 
      document.onmouseenter  
      document.onmouseleave  
      document.onmousemove 
      document.onmouseout 
      document.onmouseover 
      document.onmouseup 
      document.onmousewheel 
      document.onpause 
      document.onplay 
      document.onplaying 
      document.onprogress 
      document.onratechange 
      document.onreset 
      document.onresize 
      document.onscroll 
      document.onseeked 
      document.onseeking 
      document.onselect 
      document.onshow 
      document.onstalled 
      document.onsubmit 
      document.onsuspend 
      document.ontimeupdate 
      document.ontoggle 
      document.onvolumechange 
      document.onwaiting 
      document.onbeforecopy 
      document.onbeforecut 
      document.onbeforepaste 
      document.oncopy 
      document.oncut 
      document.onpaste 
      document.onsearch 
      document.onselectionchange 
      document.onselectstart 
      document.onwheel 
      document.onauxclick 
      document.ongotpointercapture 
      document.onlostpointercapture 
      document.onpointercancel 
      document.onpointerdown 
      document.onpointerenter 
      document.onpointerleave 
      document.onpointermove 
      document.onpointerout 
      document.onpointerover 
      document.onpointerup 
    ★命名空间相关 
      document.createElementNS()  
      document.createAttributeNS()  
      document.getElementsByTagNameNS()  
    ★不常用 
      document.createNodeIterator(node,num,filter/foo,bol)  创建NodeIterator对象 
        node  作为搜索起点的树中的节点 
        num   表示要访问哪些节点的数字代码 
          一个位掩码,通过应用一或多个过滤器来确定要访问哪些节点。
          这个参数的值以常量形式在NodeFilter类型中定义 
          NodeFilter.SHOW_ALL      显示所有类型的节点 
          NodeFilter.SHOW_ELEMENT  显示元素节点 
          NodeFilter.SHOW_TEXT     显示文本节点 
          NodeFilter.SHOW_COMMENT  显示注释节点
          NodeFilter.SHOW_DOCUMENT 显示文档节点
          NodeFilter.SHOW_ATTRIBUTE 显示特性节点,由于DOM结构原因,实际上不能使用这个值 
          NodeFilter.SHOW_CDATA_SECTION     显示CDATA节点,对HTML页面没有用 
          NodeFilter.SHOW_ENTITY_REFERENCE  显示实体引用节点,对HTML页面没有用
          NodeFilter.SHOW_ENTITYE           显示实体节点,对HTML页面没有用
          NodeFilter.SHOW_DOCUMENT_TYPE     显示文档类型节点
          NodeFilter.SHOW_DOCUMENT_FRAGMENT 显示文档片段节点,对HTML页面没有用
          NodeFilter.SHOW_NOTATION          显示符号节点,对HTML页面没有用
          NodeFilter.SHOW_PROCESSING_INSTRUCTION  显示处理指令节点,对HTML页面没有用
        filter/foo 一个NodeFilter对象,或一个表示应该接受还是拒绝某种特定节点的函数 
        bol   表示是否要扩展实体引用,该参数在HTML页面中没有用,因为其中的实体引用不能扩展 
      document.createTreeWalker()  创建TreeWalker对象 
      document.createRange()  创建DOM范围 
      document.currentScript 
      str = document.documentURI  url地址 
      str = document.origin       协议+域名  
      str = document.inputEncoding 默认'UTF-8'
      str = document.contentType 默认'text/html'
      document.lastModified 
      document.dir 
      document.images 
      document.embeds 
      document.plugins 
      document.links 
      document.forms 
      document.scripts 
      document.designMode 
    ★兼容性 
      document.webkitIsFullScreen 
      document.webkitCurrentFullScreenElement 
      document.webkitFullscreenEnabled 
      document.webkitFullscreenElement 
      document.webkitVisibilityState 
      document.webkitHidden 
      document.webkitCancelFullScreen()  
      document.webkitExitFullscreen()  
  HTMLDocument===document.constructor  [继承 Document] 
    HTMLDocument.prototype.__proto__.constructor===Document // true,继承 Document  
    HTMLDocument.prototype.xx  [属性/方法都已废弃] 
      document.all        文档内所有元素的类数组集合 
      document.fgColor    读写,文档前景色或文本颜色 
      document.bgColor    读写,文档背景色 
      document.linkColor  读写,文档内链接元素[<a>]的颜色 
      document.alinkColor 读写,文档内活动链接的颜色 
      document.vlinkColor 读写,文档内点击过的链接的颜色 
      document.clear()    清除整个文档 
      document.captureEvents()   注册窗口以捕获指定类型的所有事件 
        等价于 window.captureEvents()  
      document.releaseEvents()     
        等价于 window.releaseEvents() 
  DOMImplementation===document.implementation.constructor 
    PS: DOM1级只为其规定了'hasFeature'一个方法 
    var tmp = document.implementation  
    ◆DOMImplementation.prototype.xxx  
    bol = tmp.hasFeature(feature,version)  浏览器功能检测 [DOM1] 
      PS: 检测结果不一定准确,如 safari2.x 及更早版本即使未完全实现某些DOM功能也会返回true 
      feature   待检测的DOM功能名称
      version   DOM功能的版本号
      ★枚举:
      Core        1.0 2.0 3.0 基本的DOM,用于描述表现文档的节点树
      XML         1.0 2.0 3.0 Core的XML扩展,添加对CDATA、处理指令及实体的支持
      HTML        1.0 2.0     XML的HTML扩展,添加了对HTML特有元素及实体的支持
      Views       2.0         基于某些样式完成文档的格式化
      StyleSheets 2.0         将样式表关联到文档
      CSS         2.0         对层叠样式表1级的支持
      CSS2        2.0         对层叠样式表2级的支持
      Events      2.0 3.0     常规的DOM事件
      UIEvents    2.0 3.0     用户界面事件
      MouseEvents 2.0 3.0     由鼠标引发的事件
      MulationEvents 2.0 3.0  DOM树变化时引发的事件
      HTMLEvents  2.0         HTML4.01 事件
      Range       2.0         用于操作DOM树中某个范围的对象和方法
      Traversal   2.0         遍历DOM树的方法
      LS          3.0         文件与DOM树之间的同步加载和保存
      LS-Async    3.0         文件与DOM树之间的异步加载和保存
      Validation  3.0         在确保有效的前提下修改DOM树的方法
      Example:
      document.implementation.hasFeature("CSS","2.0")
      document.implementation.hasFeature("CSS2","2.0")
      document.implementation.hasFeature("HTML","1.0")
    tmp.createDocumentType()  创建HTML5之前的doctype相关 [DOM2] 
    tmp.createDocument()  创建新文档 [DOM2] 
    tmp.createHTMLDocument(titlename) 创建一个完整的HTML文档 [只有Opera和Safari支持] [DOM2] 
      PS: 包括 <html> <head> <title> <body>元素 
        通过该方法创建的文档为'HTMLDocument'类型的实例
      'titlename'   放在<title>元素中的字符串
Element 元素节点类型,用于表现XML或HTML元素 [继承 Node] 
  元素节点可能的子节点: 
    Element Text Comment ProcessingInstruction 
    CDATASection EntityReference
  Element.prototype.__proto__.constructor===Node // true,继承 Node 
  ◆Element.prototype.xx 
  ★元素信息 
    elem.tagName  元素标签名,在HTML中,标签名始终以全部大写表示 
      等价于 elem.nodeName 
      因为返回标签名的字符串存在大小写的问题,推荐的做法为统一转换为小写字符在做比较
        elem.tagName.toLowerCase() == "div";
    elem.childElementCount 子元素数量 [ElementTraversal]
  ★元素尺寸、位置 
    当元素中出现滚动条时: 
      Windows中: width/height包含滚动条 
      Mac中: 滚动条在未拖动时自动隐藏,无不影响 
    elem.clientWidth/elem.clientHeight 只读,width/height+padding  
      Example:  获取浏览器窗口的高和宽
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
        大多数情况下 document.documentElement.clientWidth 返回正确值,
        但IE6的quirks模式中,document.body.clientWidth 返回正确的值,
        因此函数中加入了对文档模式的判断;
    elem.clientLeft/elem.clientTop  'border-left-width'/'border-top-width'的值 
    elem.scrollWidth/elem.scrollHeight  元素内容实际大小,width/height+padding+滚动隐藏值  
      通常<html>元素是在Web浏览器的视口中滚动的元素,IE6-运行在混杂模式下时是<body>元素 
    elem.getBoundingClientRect()  ClientRect对象,用于获得元素相对视口的位置 [DiBs] 
      elem.getBoundingClientRect().width  元素宽
      elem.getBoundingClientRect().height 元素高
      elem.getBoundingClientRect().top    元素顶部到视口顶部的距离
      elem.getBoundingClientRect().bottom 元素底部到视口顶部的距离
      elem.getBoundingClientRect().left   元素左侧到视口左侧的距离
      elem.getBoundingClientRect().right  元素右侧到视口左侧的距离
    num = elem.scrollLeft/elem.scrollTop  读写,元素水平/垂直滚动距离 
  ★HTML标签相关 
    str = elem.innerHTML 读写,元素标签内的所有标签及文本 [HTML5] 
      PS: 各个浏览器返回的值可能不完全一样[如是否带空格,大小写问题等] 
        在大多数浏览器中通过该方法插入<script>元素并不会执行其中的脚本
        为innerHTML设置HTML字符串后,浏览器会将其解析为相应的DOM树 
      并非所有元素都支持innerHTML属性,不支持的元素有[?]: 
        col colgroup frameset head html style table tbody thead tfoot tr
      关于常用的innerHTML属性和节点操作方法发的比较 
        在插入大量HTML标记时使用innerHTML的效率明显要高很多.
        在设置innerHTML时,会创建一个HTML解析器.
        这个解析器是浏览器级别的[C++编写],因此执行JS会快的多 
    str = elem.outerHTML 读写,元素自身标签及其innerHTML [HTML5]
    elem.insertAdjacentHTML("pos","htmlStr") 在指定位置插入HTML代码 [HTML5] 
      PS: 该方法最早在IE中出现;html字符串会在网页中自动转换为html元素
        无返回值 
      pos  插入的位置 
        'beforebegin' 在当前元素前插入同级元素 
        'afterbegin'  作为第一个子元素插入  
        'beforeend'   作为最后一子元素插入  
        'afterend'    在当前元素后插入同级元素 
      Example:
      var htmlStr = `<a href="https://www.baidu.com">这是一个到百度的链接</a>`
      a.insertAdjacentHTML("beforeBegin",htmlstr);
    innerHTML outerHTML insertAdjacentHTML 使用说明 
      该方法可能导致浏览器的内存占用问题,IE中问题更加明显,
      如删除某个元素后,元素与事件处理程序之间的绑定关系并未删除,若频繁出现导致内存占用过多
      最好先手工删除要被替换的元素的所有事件处理程序和JS对象属性
  ★特性相关 
    elem.<atrName>  读写,元素特性值 
      str = elem.id  读写,元素id值 
      str = elem.className  读写,元素class特性字符串[包括空格] 
    bol = elem.hasAttributes() 标签中是否存在特性 
    bol = elem.hasAttribute("atrName") 是否有指定的特性  
    elem.hasAttribute()  
    str = elem.getAttribute("atrName") 获取指定特性的值,包括自定义的特性   
      Example: 
      elem.getAttribute("value") input表单中value的值 [不会实时动态的更新]
      elem.getAttribute("class/className"); 获取 class类
      elem.getAttribute("style"); 得到相应的代码字符串
      elem.getAttribute("onclick"); 得到相应的代码字符串
      IE使用class,其他浏览器使用className(?)
    elem.setAttribute("atrName","val") 设置特性,若存在则修改,否则创建 
      使用元素属性方法来自定义属性不起作用,如 div.mycolor ="red"; 需使用setAttribute方法
      Example: 
        document.getElementById("box").setAttribute("align","center");
        document.getElementById("box").setAttribute("style","color:green");
        elem.setAttribute("contenteditable","true");
        添加内置样式表
        var style = document.createElement('style');
        style.setAttribute('media', 'screen');
        // 或者
        style.setAttribute("media","@media only screen and(max-width:1024px)");
    elem.removeAttribute("atrName") 删除属性及属性值 
      Example:
      elem.removeAttribute("class");
    elem.setAttributeNode()  将创建的特性添加到元素中
    elem.getAttributeNode()  获取元素的特性
  ★元素获取 
    elem.firstElementChild 第一个子元素 [ElementTraversal]
    elem.lastElementChild  最后一个子元素 [ElementTraversal]
    elem.previousElementSibling 前一个兄弟元素 [ElementTraversal] 
    elem.nextElementSibling   后一个兄弟元素 [ElementTraversal] 
    elem.children  所有子元素的集合 [专有扩展] 
      PS: HTMLCollection的实例;当只包含子元素节点时,children和childNodes相同
        每个子元素包含其所有的自身后代元素
        此属性不是符合W3C标准规范的属性,可以获取指定元素的子元素,
        支持的浏览器有IE5+ Firefox Safari Opera Chrome
        IE8及更早版本的children属性中会包含注释节点,IE9后则只包含元素节点
    elem.querySelector('selector')  后代元素中,对应的第一个元素对象 [SelectorsAPI] 
      PS: 在该元素的后代元素内查找匹配的元素,没有则为null 
      selector 可为标签、类、id等等,也可以为组合选择器如 div.wrap 
        slt 中的字符不可包含括号"()"字符
        若传入了不被支持的选择符,querySelector会抛出错误
    elem.closest('selector')  最近的祖先元素 [IE20+] 
      PS: 也可以是当前元素本身;未匹配到,则返回 null
  ★元素操作 
    elem.scrollIntoView([bol]) 通过滚动浏览器窗口或某个容器元素使元素出现在视口中 [HTML5] 
      PS: 实际上,为某个元素设置焦点也会导致浏览器滚动并显示出该元素
      bol  默认 true
        true  让调用元素的顶部与视口顶部尽可能平齐 
        false 让调用元素尽可能全部出现在视口中,若可能的话,会使底部与底部平齐 
    elem.scrollIntoViewIfNeeded(bol) 将不再视口中的元素滚到到视口中,否则无操作  [专有扩展]
      当参数设置为true时,则表示尽量将元素显示在视口中部[垂直方向] 
    elem.insertAdjacentElement('pos',targetElem)  插入目标元素并返回 
    elem.remove()  删除元素 [IE20+] 
  ★事件相关 
    elem.onbeforecopy 
    elem.onbeforecut 
    elem.onbeforepaste 
    elem.oncopy 
    elem.oncut 
    elem.onpaste 
    elem.onsearch 
    elem.onselectstart 
    elem.onwheel 
    elem.onwebkitfullscreenchange 
    elem.onwebkitfullscreenerror 
  ★兼容相关 
    bol = elem.matchesSelector() 调用元素是否与该选择符匹配 [Selectors API Level 2] 
      elem.msMatchesSelector()     [IE9+]  
      elem.webkitMatchesSelector()   
      elem.mozMatchesSelector() 
    elem.webkitRequestFullScreen()  
    elem.webkitRequestFullscreen()  
  ★不常用 
    elem.slot 
    elem.shadowRoot 
    elem.assignedSlot 
    elem.removeAttributeNode()  
    elem.matches()  
    elem.attachShadow()  
    elem.insertAdjacentText()  
    elem.requestPointerLock()  
    elem.getClientRects()  
    elem.createShadowRoot()  
    elem.getDestinationInsertionPoints()  
    elem.animate()  
    elem.setPointerCapture()  
    elem.releasePointerCapture()  
    elem.hasPointerCapture()  
    elem.before()  
    elem.after()  
    elem.replaceWith()  
    elem.prepend()  
    elem.append()  
  ★命名空间相关 
    elem.localName 
    elem.namespaceURI 返回元素的命名空间,DOM4前,该API在Node接口中定义
    elem.prefix 
    elem.hasAttributeNS()  
    elem.getAttributeNS()  
    elem.setAttributeNS()  
    elem.removeAttributeNS()  
    elem.getAttributeNodeNS()  
    elem.setAttributeNodeNS()  
    elem.getElementsByTagNameNS()  
  DOMTokenList===<elem>.classList.constructor  元素class类的集合[HTML5]
    PS: Firefox 和 Chrome 支持该属性 
    ◆DOMTokenList.prototype.xxx  
    bol = list.contains('className')  是否包含指定类 
    num = list.length   获取类的个数 
    list.value 
    list.item(idx) 或[idx]下标法  获取成员 
    list.add('className')   将指定类加到元素的类列表中 
      若存在该类,则不添加,否则添加 
    list.remove('className')  从类列表中删除指定类,若存在则删除,否则无动作 
    list.toggle('className')  元素列表中若有该类则删除,没有则加上
    list.supports() 
    list.toString() 
    list.entries() 
    list.forEach() 
    list.keys() 
    list.values() 
HTMLElement [继承 Element] 
  PS: 可以直接通过 == 来比较[不同于ECMAScript中的对象] [SelfPoint]
    HTMLElement.prototype.__proto__.constructor===Element  // true,继承 Element 
  ◆HTMLElement.prototype.xxx 
  ★元素信息 
    PS: 为方便描述,设定元素的边界宽为content+padding+border+margin,
      元素布局宽为content+padding+border,元素内宽为content+padding,
      元素宽为content的宽度[在box-sizing:content-box的默认条件下]
      高度同理;
    num = elem.offsetWidth/elem.offsetHeight   width/height+border+scrollbar [DiBs] 
    elem.offsetParent  只读,最近的包含该元素的定位元素 
      PS: 若无定位元素,则为body;当元素display:none,其offsetParent为null;
    num = elem.offsetLeft/elem.offsetTop  元素外边框相对其offsetParent的内边框的距离 
      一般元素的offsetParent为其父元素
      定位元素为其相对定位的元素 
      <td>元素的offsetParent是作为其祖先元素的<table>元素 
      ..
    num = elem.tabIndex  当前元素的切换[Tab]序号,不存在则为-1 
  ★HTML标签及文本相关 
    elem.outerText  读写,元素及其包含的所有文本内容 [HTML5]
    elem.innerText  读写,元素中包含的所有文本内容 [HTML5] 
      PS: IE 引入的 element.innerText
        只能在body的范围内起作用
      innerText 会受样式的影响,它不返回隐藏元素的文本,但 textContent 返回.
      由于 innerText 受 CSS 样式的影响,它会触发重排(reflow),但textContent 不会.
      与 textContent 不同的是, 在 IE11=- 中对 innerText 进行修改,不仅会移除当前元素的子节点,而且还会永久性地销毁所有内部文本节点(由此导致无法再将这些被销毁的文本节点插入到当前元素或任何其他元素中).
      读取值时,它会按照有浅入深的顺序将子文档树中的所有文本拼接起来
      写入值时,则会取代元素的所有子节点
        会对文本中存在的HTML语法字符(如小于号等)进行编码转义(如&lt;)在网页中如实显示出.
  ★特性相关 
    elem.<atrName>  读写,元素特性值  
      PS: 只有公认的、非自定义的特性才会以属性的方式添加到DOM对象中 
      elem.title  有关元素的附加说明信息,一般通过工具提示条显示出来
      elem.contentEditable 
      elem.value  读写input的值,即输入框中的字符,实时动态的值
      elem.lang   元素内容的语言代码  [较少使用] 
      elem.dir    语言的方向  [较少使用]
        "ltr"   left-to-right从左至右
        "rtl"   right-to-left从右至左
  ★事件相关 
    elem.<onEvents> 事件,返回相应的JS函数 
      onabort 
      onblur 
      oncancel 
      oncanplay 
      oncanplaythrough 
      onchange 
      onclick 
      onclose 
      oncontextmenu 
      oncuechange 
      ondblclick 
      ondrag 
      ondragend 
      ondragenter 
      ondragleave 
      ondragover 
      ondragstart 
      ondrop 
      ondurationchange 
      onemptied 
      onended 
      onerror 
      onfocus 
      oninput 
      oninvalid  验证失败时触发 
      onkeydown 
      onkeypress 
      onkeyup 
      onload 
      onloadeddata 
      onloadedmetadata 
      onloadstart 
      onmousedown 
      onmouseenter undefined 
      onmouseleave undefined 
      onmousemove 
      onmouseout 
      onmouseover 
      onmouseup 
      onmousewheel 
      onpause 
      onplay 
      onplaying 
      onprogress 
      onratechange 
      onreset 
      onresize 
      onscroll 
      onseeked 
      onseeking 
      onselect 
      onshow 
      onstalled 
      onsubmit 
      onsuspend 
      ontimeupdate 
      ontoggle 
      onvolumechange 
      onwaiting 
      如 elem.onclick 等类似的事件处理程序
  ★元素操作 
    elem.focus() 使元素获得焦点 
      在ios中该方法存在限制,
        直接调用失效; load、input等事件cfoo中失效,click事件cfoo中成功;
        当click中的cfoo可执行时,而通过其他方法或事件触发click,则无法获取焦点;
    elem.blur()  使元素失焦 
    elem.click() 点击元素 
  ★不常用 
    elem.translate 
    elem.hidden 
    elem.accessKey 
    elem.draggable 
    elem.spellcheck 
    elem.isContentEditable 
    elem.onauxclick 
    elem.ongotpointercapture 
    elem.onlostpointercapture 
    elem.onpointercancel 
    elem.onpointerdown 
    elem.onpointerenter 
    elem.onpointerleave 
    elem.onpointermove 
    elem.onpointerout 
    elem.onpointerover 
    elem.onpointerup 
  ★非标 
    elem.runtimeStyle; 计算的样式 [仅IE6支持]
  DOMStringMap===<elem>.dataset.constructor  自定义属性对象 [HTML5] 
    PS: 'data-xxx'是HTML5规定为元素添加非标准的属性的格式 
      目的是为元素提供与渲染无关的信息或提供语义信息
    str = elem.dataset.xxx   读写,元素自定义属性的值 
    delete elem.dataset.xxx  删除指定自定义属性的值
    Example: 
      <div id="div" data-aoo="aaa" data-boo="bbb"></div>
      var div = document.querySelector("#div");
      div.dataset.aoo = 'abc';  // 修改 data-aoo 
      delete div.dataset.boo;  // 删除 data-boo 
    IE下HTML标签自定义属性 
      elem.<attrName> 方式来获取[仅IE支持该方式]
      elem.getAttribute("attrName") 来获取
      Example:
        定义div标签的abc属性,值为aaa
        <div abc="aaa">123</div>
  ◆每个HTML元素都有 HTMLElement 的子类型[继承 HTMLElement][IE8+可访问]:  
  HTMLElement   <i> <code> <dt> <tt> 
  HTMLHtmlElement  <HTML> 
  HTMLHeadElement  <head> 
    console.log(document.head.constructor===HTMLHeadElement); // true 
    document.head  引用文档的<head>元素 [HTML5] 
      支持该属性的浏览器有Chrome和safari 
  HTMLBodyElement  <body> 
    console.log(document.body.constructor===HTMLBodyElement); // true 
    document.activeElement  始终表示DOM中当前获得焦点的元素 [HTML5] 
      默认情况下,文档刚加载完,document.activeElement 中保存的是document.body 元素
      加载期间 document.activeElement 的值为 null
    document.body  表示<body>元素,得到body标签及其包含的所有内容 
      document.body === document.querySelector("body")  // true
      [其他属性详见 DOM操作归纳总结->elem]
  HTMLLinkElement  <link> 
    ★HTMLLinkElement.prototype.xxx 
    link.href      读写,样式表路径 
    link.disabled  
    link.crossOrigin 
    link.rel 
    link.relList 
    link.media 
    link.hreflang 
    link.type 
    link.as 
    link.referrerPolicy 
    link.sizes 
    link.charset 
    link.rev 
    link.target 
    link.import 
    link.integrity 
  HTMLStyleElement <style> 
    ★HTMLStyleElement.prototype.xxx 
    style.disabled 
    style.media 
    style.type 
  HTMLDivElement       <div> 
  HTMLSpanElement      <span> 
  HTMLAnchorElement  <a>  
  HTMLHeadingElement  <h1> <h2> <h3> <h4> <h5> <h6> 
  HTMLParagraphElement <p>   
  HTMLOListElement  <ol>  
  HTMLUListElement  <ul> 
  HTMLLIElement  <li> 
  HTMLTableElement  <table> 
  HTMLFormElement   <form> 
    PS: 表单字段为表单中的元素,如input button textarea select 等等
    HTMLFormElement.prototype.xxx
      form.acceptCharset  服务器能够处理的字符集,对应标签'accept-charset'特性 
      form.method  要发送的HTTP请求类型,对应标签'method'特性
      form.action  接收请求的URL,对应标签'action'特性 
      form.enctype  请求的编码类型,对应标签'enctype'特性 
      form.name  表单的名称,对应标签'name'特性 
      form.target  发送请求和接收响应的窗口名称,对应标签'target'特性
      form.autocomplete 
      form.encoding 
      form.elements  表单中所有控件的有序集合,HTMLCollection 
        表单字段在elements中出现的顺序和它们在标记中出现的顺序相同
        可通过下标或表单控件的name特性值索引,
        若存在多个表单控件使用相同的name,如单选按钮,则会返回一NodeList 
      form.length  表单中控件的数量 
      bol = form.noValidate  读写,将原生的表单验证关闭 
        formElem.noValidate = true;    
        原生的表单验证不完全符合需要,而且出错信息无法指定样式。
        这时,可能需要使用表单对象的noValidate属性,将原生的表单验证关闭。
        Example: 
        关闭原生的表单验证,然后指定submit事件时,让JavaScript接管表单验证
        var form = document.getElementById("myform");
        form.noValidate = true;
        form.onsubmit = validateForm;
      form.submit()  提交表单,可不需提交按钮存在
      form.reset()   重置所有表单域 
      form.checkValidity()  检测表单是否有无效字段(值不符合要求),若有则返回false
        若验证通过返回true。若验证失败,则会触发一个invalid事件。
        使用该方法以后,会设置validity对象的值。
      form.reportValidity()  
      form.<fieldName>  通过表单元素中表单字段的name属性来获取表单字段 
    事件 
      submit 提交表单事件,点击提交按钮或提交按钮获取焦点按Enter时在form元素上触发 
        submit 和 click 事件: 不同的浏览器触发的先后顺序不一样
      reset  重置表单事件,点击重置按钮或重置按钮获取焦点按Enter时在form元素上触发 
    Extend: 利用<iframe>让<form>的submit不刷新页面进行上传 
      默认的表单提交会导致页面刷新,把<form>的target指定到一<iframe>,从而让其代替页面刷新  
      window.__iframeCount = 0;
      var hiddenframe = document.createElement("iframe");
      var frameName = "upload-iframe" + ++window.__iframeCount;
      hiddenframe.name = frameName;
      hiddenframe.id = frameName;
      hiddenframe.setAttribute("style", "width:0;height:0;display:none");
      document.body.appendChild(hiddenframe);
      
      var form = document.getElementById("myForm");
      form.target = frameName;
      // 然后响应iframe的onload事件,获取response
      hiddenframe.onload = function(){
        // 获取iframe的内容,即服务返回的数据
        var resData = this.contentDocument.body.textContent || this.contentWindow.document.body.textContent;
        // 处理数据 。。。
        
        //删除iframe
        setTimeout(function(){
          var _frame = document.getElementById(frameName);
          _frame.parentNode.removeChild(_frame);
        }, 100);
      }
  HTMLLabelElement  <label> 
  HTMLInputElement  <input>  
    HTMLInputElement.prototype.xx 
      input.validity    返回一个包含字段有效信息的对象 [详参 JS高程 430 页]
        每一个表单元素都有一个validity对象,有以下属性:
        valid         若该元素通过验证,则返回true。
        valueMissing  若用户没填必填项,则返回true。
        typeMismatch  若填入的格式不正确(比如Email地址),则返回true。
        patternMismatch 若不匹配指定的正则表达式,则返回true。
        tooLong       若超过最大长度,则返回true。
        tooShort      若小于最短长度,则返回true。
        rangeUnderFlow  若小于最小值,则返回true。
        rangeOverflow   若大于最大值,则返回true。
        stepMismatch    若不匹配步长(step),则返回true。
        badInput      若不能转为值,则返回true。
        customError   若该栏有自定义错误,则返回true。
      input.type      当前字段的类型(如 "checkbox" "radio"等等)
        <input> 和 <button> 的type属性可读写
        <select>元素的type属性只读
      input.value     当前字段将被提交给服务器的值
        对于 type=file 该属性只读,包含着文件在计算机中的路径
        input、textarea、password、select等元素都可以通过value属性取到它们的值
      input.willValidate = true;  开启单个表单字段验证
        对于那些不支持的浏览器(比如IE8),该属性等于undefined。
        即使willValidate属性为true,也不足以表示浏览器支持所有种类的表单验证。
        比如,Firefox 29 不支持date类型的输入框,会自动将其改为text类型,
        而此时它的willValidate属性为true。
        为了解决这个问题,必须确认input输入框的类型(type)未被浏览器改变。
        if (field.nodeName === "INPUT" && field.type !== field.getAttribute("type")) {
            // 浏览器不支持该种表单验证,需自行部署JavaScript验证
        }
      input.disabled  布尔值,表示当前表单字段是否被禁用
      input.form      表示当前字段所属的表单,只读
      input.name      当前字段的名称
      input.readOnly  布尔值,表示当前字段是否只读
      input.defaultValue;  默认值
      formElem.setCustomValidity() 用于自定义错误信息 
        该提示信息也反映在该输入框的 validationMessage 属性中 
        若将setCustomValidity设为空字符串,则意味该项目验证通过        
      num = input.selectionStart 选中字符的开始下标 
      num = input.selectionEnd   选中字符的结束下标 
    不常用 
      input.accept  
      input.alt  
      input.autocomplete  
      input.autofocus  
      input.defaultChecked  
      input.checked  
      input.dirName  
      input.files  
      input.formAction  
      input.formEnctype  
      input.formMethod  
      input.formNoValidate  
      input.formTarget  
      input.height  
      input.indeterminate  
      input.list  
      input.max  
      input.maxLength  
      input.min  
      input.minLength  
      input.multiple  
      input.pattern  
      input.placeholder  
      input.required  
      input.size  
      input.src  
      input.step  
      input.valueAsDate  
      input.valueAsNumber  
      input.width  
      input.validationMessage  
      input.labels  
      input.selectionDirection  
      input.align  
      input.useMap  
      input.autocapitalize  
      input.webkitdirectory  
      input.incremental  
      input.stepUp()    
      input.stepDown()    
      input.checkValidity()    
      input.reportValidity()    
      input.select()    
      input.setRangeText()    
      input.setSelectionRange()    
      input.webkitEntries  
  HTMLSelectElement <select> 
    HTMLSelectElement.prototype.xxx 
      select.autofocus 
      select.disabled 
      select.form 
      select.multiple 
      select.name 
      select.required 
      select.size 
      select.type 
      select.length 
      select.selectedOptions 
      select.selectedIndex 
      select.value 
      select.willValidate 
      select.validity 
      select.validationMessage 
      select.labels 
      select.item()   
      select.namedItem()   
      select.add()   
      select.remove()   
      select.checkValidity()   
      select.reportValidity()   
      select.setCustomValidity()   
    HTMLOptionsCollection===<select>.options.constructor  [继承 HTMLCollection]
      console.log(HTMLOptionsCollection.prototype.__proto__.constructor ===HTMLCollection); // true 
      HTMLOptionsCollection.prototype.xxx 
        options.length 
        options.selectedIndex 
        options.add()   
        options.remove()   
        options.namedItem()   
  HTMLOptionElement <option> 
    HTMLOptionElement.prototype.xxx 
      option.disabled 
      option.form 
      option.label 
      option.defaultSelected 
      option.selected 
      option.value 
      option.text 
      option.index 
  HTMLButtonElement    <button> 
  'formField'表单字段总结 
    共有的表单字段属性/方法  
      PS: 除了<fieldset>元素之外,所有表单字段都拥有相同的一组属性 
        由于<input>类型可以表示多种表单字段,因此有些属性只适用于某些字段,
        但还有一些属性是所有字段所共有的
      .disabled  bol,当前字段是否被禁用 
      .readOnly  bol,当前字段是否只读 
      .tabIndex  num,当前字段的切换tab序号
      .name      str,当前字段的名称 
      .form      只读,指向当前字段所属表单的指针 
      .type      str,当前字段的类型,如"checkbox"、"radio" 等等 
        对于<input>元素,该值等于其特性type的值,其他元素,见下表 
        说明             HTML示例                       type属性的值
        单选列表       <select>...</select>             "select-one"
        多选列表       <select multiple>...</select>    "select-multiple"
        自定义按钮     <button>...</button>             "submit"
        自定义非提交按钮 <button type="button">...</button> "button"
        自定义重置按钮 <button type="reset">...</buton>  "reset"
        自定义提交按钮 <button type="submit">...</buton> "submit"
        <input>和<button>元素的type属性是可以动态修改的,而<select>元素的type属性则是只读的
      .value     str,当前字段将被提交给服务器的值 
        对文件字段来说,这个属性是只读的,包含着文件在计算机中的路径
      .focus()  获得焦点,激活表单字段,只能对可见的表单字段使用   
      .blur()   失去焦点 
    change  表单值改变时触发 
      支持该事件的 JavaScript 对象: fileUpload, select, text, textarea 等
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
      <select>的值,就是选中的<option>的value值,若<option>没有value特性,则是其文本值 
    input[type="text"] 和 textarea 文本框
      在其文本框中输入的内容保存在他们的value中
      text.select()  选择文本框中所有的文本
      text.selectionStart  光标选中文本开始的字符下标表示 [HTML5新增]
        Example: : 获取所选字符
          text.value.substring(text.selectionStart,text.selectionEnd);
      text.selectionEnd    光标选中文本结束的字符下标表示
      text.value.setSelectionRange(begin,end)   获取部分字符
    input[type="file"]  处于内存中的元素仍能起作用 
      必须手动执行,才会打开本地文件 
        <img src="../../../2Resource/2Img/Wallpaper/160521133443-9.jpg" id="img" class="img">
        <button type="button" id="_btn">click</button>
        var file = $('<input type="file" id="__file">').appendTo($('body'))
        setTimeout(function(){ // 执行了 
          file.click();    
          $('#_btn').click();
          console.log(11); 
        },2000);
        $('#_btn').on("click",function(e){ // 执行了 
          file.click();
          console.log(22); 
        })
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
        Example:只有通过遍历,才能获得用户选中的那个选择框的value。
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
          若用户未做任何选择,则selected就为undefined。
    label 元素 
      Exp:
        该元素绑定'click'事件会触发两次[使用的jQuery绑定],
        使用'mouseup'事件来代替'click'事件来使用;
    相关事件 
      oninvalid    验证失败时触发 
  HTMLImageElement    <img> 
    HTMLImageElement.prototype.xxx 
      img.alt 
      img.src  读写,图片地址 
      img.naturalWidth/img.naturalHeight 只读,图片真实的宽/高
      img.srcset 
      img.sizes 
      img.crossOrigin 
      img.useMap 
      img.isMap 
      img.width 
      img.height 
      img.complete 
      img.currentSrc 
      img.referrerPolicy 
      img.name 
      img.lowsrc 
      img.align 
      img.hspace 
      img.vspace 
      img.longDesc 
      img.border 
      img.x 
      img.y 
  HTMLIFrameElement  <iframe> 
    HTMLIFrameElement.prototype.xxx 
      frame.src 
      frame.srcdoc 
      frame.name 
      frame.sandbox 
      frame.allowFullscreen 
      frame.width 
      frame.height 
      frame.referrerPolicy 
      frame.align 
      frame.scrolling  iframe的滚动条  
        iframe.scrolling = 'no'     去掉iframe的滚动条 
      frame.frameBorder  iframe的边框 
        iframe.frameBorder = 0      去掉iframe的边框
      frame.longDesc 
      frame.marginHeight 
      frame.marginWidth 
      frame.allow 
      frame.contentWindow   框架的window对象 
      frame.contentDocument 框架的document文档对象 [DOM2][IE8+] 
      frame.getSVGDocument()  
    <iframe id="frameId1" name='frameName1' src="/cpt/top_nav.html" ></iframe>
    var frame = document.querySelector("#frameId1") 框架的DOM元素对象 
    var iframe = frames[iframeName]  通过'name'属性值获取框架的window对象
      Example:
      var iframe = frames['frameName1'];
      iframe.document    框架的document对象 
    事件 
      'load'事件  <iframe>加载后在其本身触发
        Example: 
        $('#frameId1').on("load",function(e){
          var document1 = window.frames['frameName1'].document;
          var style = document1.querySelector("style");
          var html = document1.querySelector("#aoo");
          var script = document1.querySelector("script");
        });
  待整理 
    HTMLElement  <abbr> <em> <acronym> <address> <b> <bdo> <big> <cite> <dd> <kbd> <dfn> <strong> <noframes> <noscript> <sub> <sup> <samp> <small> <var> 
    HTMLFieldSetElement  <fieldset> 
    HTMLAreaElement  <area>  
    HTMLBaseElement  <base>  
    HTMLQuoteElement  <blockquote>  
    HTMLBRElement  <br>  
    HTMLHRElement  <hr> 
    HTMLTableCaptionElement  <caption>  
    HTMLTableColElement  <col>  
    HTMLModElement  <ins> 
    HTMLTableColElement  <colgroup>  
    HTMLModElement  <del>  
    HTMLLegendElement  <legend> 
    HTMLDListElement  <dl>  
    HTMLMapElement  <map> 
    HTMLMetaElement  <meta>  
    HTMLObjectElement  <object>  
    HTMLOptGroupElement  <optgroup>  
    HTMLTableSectionElement  <tbody> 
    HTMLTableCellElement  <td> 
    HTMLTextAreaElement  <textarea> 
    HTMLParamElement  <param>  
    HTMLTableSectionElement  <tfoot> 
    HTMLPreElement  <pre>  
    HTMLTableCellElement  <th> 
    HTMLQuoteElement  <q>  
    HTMLTableSectionElement  <thead> 
    HTMLTitleElement  <title> 
    HTMLTableRowElement  <tr> 
    HTMLScriptElement  <script>  
  不推荐使用 
    HTMLElement  <center> <s> <strike> <u> 
    HTMLFontElement  <font> 
    HTMLMenuElement  <menu> 
    HTMLDirectoryElement  <dir>  
    HTMLFrameElement  <frame> 
    HTMLFrameSetElement  <frameset> 
  已废弃 
    HTMLAppletElement  <applet>  
    HTMLIsIndexElement  <isindex> 
    HTMLBaseFontElement  <basefont>  
◆集合类 
HTMLCollection 包含元素[顺序为文档流中的顺序]的通用集合 
  PS: 动态的,随着DOM的改变会相应的变化 
    HTMLCollection===document.forms.constructor
    HTMLCollection===document.images.constructor
    HTMLCollection===document.links.constructor
    HTMLCollection===document.anchors.constructor
    HTMLCollection===document.applets.constructor
    HTMLCollection===document.getElementsByTagName('').constructor
    HTMLCollection===document.getElementsByClassName('').constructor 
    HTMLCollection===<elem>.getElementsByTagName('').constructor 
    HTMLCollection===<elem>.getElementsByClassName('').constructor 
  HTMLCollection.prototype.xx  
    els.length 
    els.item(idx)   或使用[idx]访问
    els.namedItem() 通过name属性值索引 
    els.[idx/str] 
      在[]中传入数值,则后台就会调用items()方法
      []中也可传入字符串,则调用namedItem()方法
  els = document.anchors 具有name特性的所有<a>元素 
  els = document.links   具有href特性的所有<a>元素 
  els = document.forms   所有<form>元素 
  els = document.images  所有<img>元素
  els = document.applets 所有<applet>元素 [已几乎不用了]  
  els = document.getElementsByTagName('tagName') 
    *  表示获取页面所有元素 
  els = document.getElementsByClassName('clsName') [HTML5][IE9+] 
  els = elem.getElementsByTagName("tagName")  通过元素名获取元素集合 
  els = elem.getElementsByClassName('clsName'[,parent]); 通过类名获取元素集合 [HTML5][IE9+]
    clsName  str,若干个类名的字符串,类名间用空格隔开,无顺序影响 
    Example:  
    获取所有包含"user"和"name"类的元素 
    var aoo =document.getElementsByClassName("user name");
NodeList 节点列表类 
  PS: NodeList 是动态实时的,DOM 改变后 NodeList 也会变化 
    NodeList===<node>.childNodes.constructor  
    NodeList===document.getElementsByName('').constructor 
    NodeList===document.querySelectorAll("abc").constructor 
    NodeList===<elem>.querySelectorAll("abc").constructor 
  NodeList.prototype.xxx 
    list.length  
    list.item(idx)  访问节点,也可通过[idx]下标法
    list.entries()    
    list.forEach()    
    list.keys()    
    list.values()    
  cNodes = pNode.childNodes  一组有序的各种类型的子节点 
    cNodes  成员可为元素节点、文本节点、注释或处理指令等 
      且不同的浏览器返回值不一定相同 [?]  
  list = document.getElementsByName("nameVal")  通过name属性值获取元素节点集合 
    PS: 一般用于获取单选按钮 
      IE中若该元素本身不包括name属性[但自行添加了],获取时会获取不到
    nameValue  name属性的值 
  list = document.querySelectorAll("selector")  获取元素节点集合 [SelectorsAPI]
  list = <elem>.querySelectorAll("selector")  后代元素中,对应的元素集 [SelectorsAPI]
    返回值为一个"静态"不会自动更新,只包含元素的NodeList,无匹配项则为空 NodeList
    可通过下标或 item() 方法来获取单个元素
NamedNodeMap===<elem>.attributes.constructor  元素节点当前具有的特性节点集合 
  PS: 是一个"动态"集合;IE7及之前会返回元素所有可能的节点  
  var atrs = <elem>.attributes 
  NamedNodeMap.prototype.xx 
    atrs.length  属性节点个数 
    atrs.item(idx)   返回特性节点或使用[idx]下标法 
    atrs.getNamedItem(str)  返回nodeName为str的节点 
      获取元素的id值 
      var id = atrs.getNamedItem("id").nodeValue;
    atrs.setNamedItem(atr)  向列表中添加atr属性节点
    atrs.removeNamedItem(str)  从列表中移除nodeName为str的节点并返回 
    命名空间相关 
      atrs.getNamedItemNS()  
      atrs.setNamedItemNS()  
      atrs.removeNamedItemNS()  
  Attr===<elem>.attributes[idx].constructor  
  Example: 
    设置元素的id值
    atrs.["id"].nodeValue = "xxx";
◆样式类 
  按照结构依次为: 样式表集-样式表-规则集-规则-声明 
StyleSheetList===document.styleSheets.constructor  样式表集合 
  ★StyleSheetList.prototype.xxx 
  shets.length 
  shets.item() 
CSSStyleSheet   一张样式表 [继承 StyleSheet] 
  CSSStyleSheet===document.styleSheets[0].constructor 样式表对象  
  CSSStyleSheet===<link>.sheet.constructor  <link>元素引入的样式表对象 
    <link>.stylesheet; // IE的方法
  CSSStyleSheet===<style>.sheet.constructor <style>元素引入的样式表对象 
    <style>.stylesheet; // IE的方法
  ★CSSStyleSheet.prototype.xxx  
  shet.ownerRule  若样式表是通过'@import'导入的,则指向导入的规则;否则,值为null [IE不支持]  
  shet.insertRule(ruleStr,idx) 向样式表中插入一条规则 [IE9+] 
    ruleStr CSS规则字符串
    idx     插入的位置
    Example: 
    document.styleSheets[0].insertRule('#block { color:white }', 0);
  shet.addRule(ruleStr,idx)    向样式表中插入一条规则 [IE9-]
  shet.deleteRule(idx) 从样式表中删除一条规则 [IE9+] 
    Example:document.styleSheets[0].deleteRule(0); // 删除样式表中的第一条规则
  shet.removeRule(idx) 从样式表中删除一条规则 [IE9-]
StyleSheet===CSSStyleSheet.prototype.__proto__.constructor 一张样式表 
  ★StyleSheet.prototype.xxx 
  str = shet.type  样式表类型,通常是'text/css' 
  str = shet.href  只读,样式表链接地址,否则为 null  
  shet.ownerNode   所在的DOM节点,通常是<link>或<style> 
    若当前样式表由'@import'导入的,则该值为 null;IE不支持这个属性 
  str = shet.title  所在节点的的title属性值 
  shet.parentStyleSheet 在当前样式表是通过'@import'导入的情况下,该属性为指向导入它的样式表的指针 
    因为CSS的@import命令允许在样式表中加载其他样式表,就有了parentStyleSheet属性,
    它返回包括了当前样式表的那张样式表.
    若当前样式表是顶层样式表,则该属性返回null
  shet.media  当前样式表支持的所有媒体类型的集合 
    如果集合是空列表,表示样式表适用于所有媒体 
    在IE中,media是一个反映<link>和<style>元素media特性值的字符串
  bol = shet.disabled  读写,是否禁用样式表,值为true或disabled 
CSSRuleList===shet.cssRules.constructor 样式表CSS规则集 [IE9+]  
CSSRuleList===shet.rules.constructor    样式表CSS规则集 [IE9-]  
  兼容写法 
  var sheet = document.styleSheets[0];
  var rules = sheet.cssRules||sheet.rules;
  var rule1 = rules[0];
  rule1.style.color ='red';
CSSStyleRule===shet.cssRules[0].constructor  一条CSS规则 [继承 CSSRule] 
  rule = shet.cssRules[0]  样式表的一条规则,包括两个部分: CSS选择器和样式声明 
  ★CSSStyleRule.prototype.xxx 
  str = rule.selectorText  当前规则的选择器文本 
    Example:document.styleSheets[0].cssRules[0].selectorText; // ".myClass"
CSSRule===CSSStyleRule.prototype.__proto__.constructor 一条CSS规则 
  ★CSSRule.prototype.xxx 
  rule.parentStyleSheet  当前规则的所属的样式表对象 [IE不支持]
  rule.parentRule  若规则是导入的,则该属性即导入规则,否则,为 null [IE不支持该属性] 
  num = rule.type 规则类型的常量值,对于样式规则为1 [IE不支持]
  str = rule.cssText  当前规则的字符串 
  常量 
    1===rule.STYLE_RULE 
    2===rule.CHARSET_RULE 
    3===rule.IMPORT_RULE 
    4===rule.MEDIA_RULE 
    5===rule.FONT_FACE_RULE 
    6===rule.PAGE_RULE 
    7===rule.KEYFRAMES_RULE 
    8===rule.KEYFRAME_RULE 
    10===rule.NAMESPACE_RULE 
    12===rule.SUPPORTS_RULE 
CSSStyleDeclaration  CSS规则的声明  
  CSSStyleDeclaration===rule.style.constructor 一张样式表中的一条规则的声明  
  CSSStyleDeclaration===<elem>.style.constructor  内联样式对象 
    PS: 包含着通过HTML的style特性指定的所有样式信息 
      若没有为元素设置style特性,即无嵌入样式,则style中可能会包含一些并不准确的默认值
  CSSStyleDeclaration===getComputedStyle(<elem>,str/null).constructor 计算后的样式对象[IE9+][DOM2]
    PS: 表示实际应用在指定元素上的最终样式信息,即各种CSS规则叠加后的结果 
      等价于 document.defaultView.getComputedStyle(<elem>,str/null);
      或 window.getComputedStyle(<elem>,str/null);
    str   一伪元素字符串,如":after",若不需要可为null或'' 
      IE不支持获取伪类 [?]
    Example: 
      var color = window.getComputedStyle(elm, ':before').color;
      var color = window.getComputedStyle(elm, ':before')
      .getPropertyValue('color');
      var color = window.getComputedStyle(elm, null).color;
    IE9-不支持'defaultView',使用 elem.currentStyle 属性代替 [非标] 
      兼容写法
      var styleObj = getComputedStyle?getComputedStyle(elem,""):elem.currentStyle;
      var width = styleObj.width;　　//100px;
  计算样式对象与内联样式对象的区别: 
    计算样式的属性是只读的 
    计算样式的值是绝对值,类似百分比和点之类相对的单位将全部转换为以'px'为后缀的字符串绝对值,
    颜色属性值格式各浏览器不一定相同,一般以'rgb(#,#,#)'或'rgba(#,#,#,#)'的格式返回;
    不计算复合属性,只基于最基础的属性
      比如,不可获取margin的值,只能读marginLeft、marginTop等值 
    计算样式对象的cssText属性无效,返回undefined 
    计算样式同时具有欺骗性,在查询某些属性时的返回值不一定精准,如查询font-family；
    若一个元素不是绝对定位,top和left属性总是返回auto.
  ★CSSStyleDeclaration.prototype.xxx  
  dec.parentRule 当前规则声明的CSS规则 
  str = dec.xx   读写内联样式 
    PS: style对象的属性值都是字符串,设置时必须包括单位
      当设置的值为非正常的值时,则不生效,设置为 null/''时可清除该样式 
      使用"-"连接的属选采用驼峰命名法来代替,如font-size,改写为fontSize;
    'float'为JS保留字,DOM2级规定使用'cssFloat'代替,IE则使用'styleFloat'
    elem.style.cssFloat;       非IE浏览器调用方法
    elem.style.styleFloat;     IE浏览器调用方法
    elem.style.color     读写字体颜色 
      elm.style.color = 'black';
    elem.style.fontSize  读写字体大小 
      font-size需改写为fontSize,返回值如'20px'
    elem.style.left      读写,相对于具有定位属性父元素的left 
    elem.style.width     读写,元素宽
    elem.style.cursor    显示的指针[光标]的类型
    ...
    跨浏览器兼容总结 
      elem.style.cssFloat || elem.style.styleFloat;
      typeof elem.style.cssFloat!="undefined" ? 
      elem.style.cssFloat="right" : elem.style.styleFloat="right";
    Example:
    elm.style.cssText ='color:red;line-height:30px';
    elm.style.removeProperty('color');
    elm.style.setProperty('color', 'green', 'important');
  str = dec.cssText  读写,整个'style'属性中的CSS代码[DOM2] 
    elem.style.cssText ='background-color:red;'+'border:1px solid black;';
  num = dec.length   应用给元素的CSS属性的数量[DOM2]  
  dec.cssFloat 
  str = dec.item(idx)  指定位置的属性名称,或使用[idx]形式
  str = dec.getPropertyValue('propName') 返回指定属性的字符串值
  str = dec.getPropertyPriority('propName') 返回优先级声明,存在为"important",否则为""
  dec.setProperty('propName','value',"!import"/"")  设置属性及值,并加上"!important"或""
  dec.removeProperty('propName')  删除指定属性 
  不常用 
    dec.animationPlayState
  兼容性相关  
    dec.webkitAnimationPlayState 
      animation-play-state属性可以控制动画的状态,暂停/播放,需加上浏览器前缀
      "paused"    暂停
      "running"   播放
    dec.getPropertyCSSValue(属性名); 返回包含指定属性的 CSSValue 对象 [Chrome不支持]
其他类 
  DocumentType===document.doctype.constructor [继承 Node][DiBs] 
    PS: 父节点为document;无子节点;
    var tmp = document.doctype  文档类型,<!DOCTYPE>的引用 
    ◆DocumentType.prototype.xx 
    str = tmp.name     文档类型的名称 'html'/"HTML"
    tmp.remove()  
    tmp.before()  
    tmp.after()  
    tmp.replaceWith()  
    不常用: 
      tmp.publicId  获取HTML5之前的doctype声明中的部分信息 [DOM2]
      tmp.systemId  获取HTML5之前的doctype声明中的部分信息 [DOM2]
  Attr 属性节点类型 [继承 Node] 
    PS: 元素的特性在DOM中以Attr类型表示,不被认为是DOM文档树的一部分
    子节点: 
      HTML中不支持[没有]子节点;
      XML中可以为 Text 或 EntityReference
    Attr.prototype.xxx 
      atr.namespaceURI 
      atr.prefix 
      atr.localName 
      atr.name   与nodeName的值相同
      atr.value  与nodeValue的值相同
      bol = atr.specified 用于区别特性是自行添加的还是默认的 
      atr.ownerElement 
  DocumentFragment'document fragment'文档片段类型 [继承 Node] 
    PS: 一种 "轻量级"的文档,可包含和控制节点,但不会像完整的文档那样占用额外的资源 
      不能把文档片段直接添加到文档中,但可将其作为一个"仓库"来使用,
      即可以在里面保存将来可能会添加到文档中的节点.
      若将文档中的节点添加到文档片段中,就会从文档树中移除该节点.
      添加到文档片段中的新节点同样也不属于文档树.
      可以通过 appendChild 或 insertBefore 将文档片段中内容添加到文档中,
      将文档片段作为参数传递给这两个方法时,则会将其所有子节点添加到文档中.
      在所有节点类型中,只有 DocumentFragment 在文档中没有对应的标记 
    子节点可以是: 
      Element ProcessingInstruction Text
      Commnet CDATASection EntityReference
    DocumentFragment.prototype.xxx 
    frag.children 
    frag.childElementCount [ElementTraversal]
    frag.firstElementChild [ElementTraversal]
    frag.lastElementChild  [ElementTraversal]
    frag.getElementById()  
    frag.querySelector()  
    frag.querySelectorAll()  
    frag.prepend()  
    frag.append()  
    Example: 
      通过文档片段来保存多个元素然后一次添加[若逐个添加,将导致浏览器反复渲染]
      <ul id="myList"></ul>
      var fragment = document.createDocumentFragment() 
      var ul = document.getElementById("myList");
      var li = null;
      for(var i = 0; i < 3; i++) {
        li = document.createElement("li");
        li.appendChild(document.createTextNode("ietm" +(i +1)));
        fragment.appendChild(li);
      }
      ul.appendChild(fragment);
  Text 文本节点类型 [继承 CharacterData、Node] 
    PS: 无子节点; 文本中可以包含转义后的HTML字符,但不能包含HTML代码
      Node===Text.prototype.__proto__.__proto__.constructor 继承 Node 类型 
    元素节点和文本节点的关系 
      Example: :
      <div></div>  <!-- 没有内容,没有文本节点 -->
      <div> </div>  <!-- 有空格,有一个文本节点 -->
      <div>hello word</div>  <!-- 有内容,有一个文本节点 -->
        该文本节点为元素节点的第一个子节点
        var tex = div.firstChild;
    Text.prototype.xxx 
      text.wholeText 
      text.assignedSlot 
      text.Text()  
      text.splitText(idx)  分割文本节点,从指定位置将当前文本节点分成两个文本节点 
      text.getDestinationInsertionPoints()  
  Comment 注释类型 [继承 CharacterData、Node] 
    PS: 不支持[没有]子节点
  CharacterData 
    CharacterData===Text.prototype.__proto__.constructor 
    CharacterData===Comment.prototype.__proto__.constructor
    CharacterData.prototype.xxx 
      text.length  字符数量,等价于 nodeValue.length 或 data.length
      text.data  读写文本,等价于nodeValue 
        在修改文本节点时,字符串会经过HTML[或XML,取决于文档类型]编码
        Example: 
        div.firstChild.nodeValue = "Some <strong>other</strong> message";
        // 输出结果是"Some &lt;strong&gt;other&lt;/strong&gt; message" 
      text.previousElementSibling [ElementTraversal] 
      text.nextElementSibling     [ElementTraversal] 
      text.substringData(offset,num)   返回从offset位置开始的num个字符串
      text.appendData(tex1)  将tex1添加到节点的末尾
      text.insertData(offset,tex1)  在offset的位置插入tex1
      text.deleteData(begin,num)  从begin的位置开始删除num个字符
      text.replaceData(offset,num,tex1)  用tex1替换从offset的位置后到的num个文本
      text.remove() 
      text.before() 
      text.after() 
      text.replaceWith() 
  NodeIterator   遍历 [DOM2] [JS高程 326 页]
  TreeWalker     遍历 [DOM2] [JS高程 330 页]
  Range       范围 [DOM2] [JS高程 332 页]
兼容性相关 
  ◆IE专属 
  document.documentMode 识别文档模式 [IE8+] 
    IE8能以不同的模式渲染页面,主要依赖于<!DOCTYPE>或者当前的某一个HTML元素
    如果未定义<!DOCTYPE>,IE8以IE5的模式来渲染页面
    按照下列的值返回:
    5   ----- in IE5 mode
    7   ----- in IE7 mode
    8   ----- in IE8 mode
    9   ----- in IE9 mode
  window.toStaticHTML('HTMLStr')  [IE8+] 
    返回一个经过处理后的版本,从原HTML中删除所有脚本节点和事件处理程序属性 
XML相关 
  ProcessingInstruction [继承 CharacterData] 
  CDATASection 类型: 针对基于XML的文档,表示CDATA区域 
    与Comment类似;继承自Text类型;无子节点 
  EntityReference 
  XML命名空间: 不同XML文档的元素就可混合在一起,共同构成格式良好的文档,而不必担心发生命名冲突
    HTML不支持XML命名空间,但XHTML支持XML命名空间 
相关规范 
  ElementTraversal 元素遍历规范 [IE9+]
    对于元素间的空格,IE9及之前版本不会返回文本节点,
    而其他浏览器都会返回文本节点,导致使用childNodes firstchildNodes等属性不一致
    为了弥补这一差异,同时保持DOM规范不变,ElementTraversal 规范新定义了一组属性
  SelectorsAPI 由W3C发起制定的一个标准,致力于让浏览器原生支持CSS查询 
    Selectors API Level 1  [IE8+] 
  DOM扩展 
    elem.matchSelector(slt); 返回布尔值,表示该元素是否与该选择符匹配 
      Selector API Level 2 规范为 Element 类型新增的一个方法
  专有扩展: 大量的专有的DOM扩展未成为标准,即此时还是专有功能,只得到了少数浏览器的支持 
    文档模式 
      IE8引入了一个新的概念叫"文档模式",
      文档模式决定了可以使用什么功能,以及如何对待文档类型(doctype)
    elem.scrollByLines(num)  将元素的内容滚动指定的行高
      num值可为正或负
    elem.scrollByPages(num)  将元素的内容滚动指定的页面高度,具体高度由元素的高度决定
  DOM2遍历和范围  [更多详见 JavaScript高级程序设计 327 页]
其他总结 
  JS中直接使用元素的id名称即代表该元素 
    前提: id名称是一符合标准的变量名称
    Example: 
      <div id="box"> </div>
      box.innerHTML = '直接使用id名称就可以了';
  可视区域宽高兼容写法 
    var width = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
    var height = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight ;
  获取计算后的样式 
    Example: 
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
  scrollbar  滚动轴 
    PS:在Windows和Mac系统中存在差异,Mac中滚动轴默认隐藏,滚动时出现,不占宽度[为0];
    获取滚动轴宽度scrollbarWidth
      方法一  var scrollbarWidth = elem.offsetWidth - elem.clientWidth;
      方法二  
        elem.style.overflow = 'hidden';
        var width1 = elem.clientWidth; // 没有滚动轴时的宽度
        elem.style.overflow = 'scroll';
        var width2 = elem.clientWidth; // 有滚动轴时的宽度
        var scrollbarWidth = width1 - width2;
        elem.style.overflow = null; // 清除该内联样式
        console.log(scrollbarWidth);
  存在内存中的元素,而非插入到DOM中,仍起作用 
    var file = $('<input type="file" id="file1">')
    file.click()  // 仍可打开图片选择框 
-------------------------------------------------------------------------------- 
◆专题 
Image.prototype===HTMLImageElement.prototype <img>标签 
  img = new Image();   创建图像DOM对象  
Option.prototype===HTMLOptionElement.prototype <option>标签 
  var opt = new Option(["文本","值",bol1,bol2]); 创建optionDOM对象 
    bol1  是否被选中 
    bol2  是否有效
    Example:
      var elem = document.getElementById('mySelect');
      elem.add(new Option("文本","值")); // 这个只能在IE中有效
      // 这个兼容IE与firefox
      elem.options.add(new Option("text","value"));
      elem.options.remove(idx); // 根据下标删除选项option
      elem.options[idx].text;
'audio'&'video' [详见 JavaScript高级程序设计 486 页][HTML5] 
  元素对象的标签属性'attribute'&对象属性'property'&方法'methods'
    ★共有 
      ▼标签属性 
        all.src            读写路径,推荐使用子元素<source>实现 
        all.loop           读写是否应在结束时再次播放
        bol = all.autoplay       读写自动播放状态
        bol = all.controls       读写是否应该显示操作控件 
      ▼对象属性 
        bol = all.paused         读写是否暂停播放 
        num = all.currentTime    读写当前播放时长,单位:秒 
        num = all.duration       读写时长,单位:秒 
          在加载完音频/视频前,获取不到,返回NaN,往往需要和canplay事件配合使用
        num = all.playbackRate   读写播放速度,'1.0'为正常速度
        num = all.volume         读写音量,范围'0-1'
        all.muted                读写是否关闭声音
        all.defaultPlaybackRate  读写默认播放速度 
        video.mediaGroup         读写所属的组合,用于连接多个视频/音频元素 
        all.ended          返回播放是否已结束
        all.error          返回错误状态的'mediaError'对象 
          video.error.code 错误码
        all.networkState   返回当前网络状态 
        video.buffered     返回已缓冲部分的'TimeTanges'对象 
        video.controller   返回当前媒体控制器的'MediaController'对象 
        video.crossorigin  若文件不是在同域,则crossorigin会被用来进行指示 
          适用于所有多媒体标签'video''audio''img',
          目的是处理cross-origin资源共享'CORS'的回放问题
      ▼对象方法
        all.play()         播放
        all.pause()        暂停
        all.load()         重新载入音频
        all.canPlayType()  确定浏览器可播放一媒体格式的可能性
          返回值为:空字符串,"maybe"或"probably"
            若浏览器无法播放该格式,返回空字符串""
            若浏览器认为有可能播放该格式,返回"maybe"
            若浏览器认为能够播放改格式,返回"probably"
          Example:
            video.canPlayType("video/ogg")
            只传入一个短形式的格式,只可能得到""或"maybe"
            video.canPlayType('video/ogg; codecs="theora,vorbis"')
            若传入带编解码的具体类型,就可能达到到""、"maybe"或"probably"作为答案
    ★独有 
      ▼标签属性 
        video.poster         读写视频预览图    
        video.preload        读写预加载状态  
          auto 
          metadata 
          none 
      ▼对象属性
        video.currentSrc   返回当前视频的URL
        video.played       返回视频已播放部分的'TimeRanges'对象 
        video.readyState   返回视频当前的就绪状态 
        video.seekable     返回表示视频可寻址部分的'TimeRanges'对象 
        video.seeking      返回用户是否正在视频中进行查找 
        video.startOffsetTime  返回表示当前时间偏移的'Date'对象 
        video.textTracks       返回表示可用文本轨道的'TextTrackList'对象 
        video.videoTracks      返回表示可用视频轨道的'VideoTrackList'对象 
        video.videoWidth   返回当前视频本来的宽,单位:px          
        video.videoHeight  返回当前视频本来的高,单位:px 
    
      audio.fastSeek()     在音频播放器中指定播放时间
      audio.canPlayType()  检查浏览器是否能够播放指定的音频类型
      audio.addTextTrack() 向音频添加新的文本轨道
      audio.requestFullscreen() 全屏
      audio.exltFullscreen()    退出全屏
      audio.autoplay       读写自动播放状态
      audio.defaultMuted   读写音频默认是否静音
      audio.currentSrc     返回当前音频的 URL
    readState
    seeking
  事件 
    ★共有事件
    abort           视频加载放弃时 
    canplay         当视频缓冲完毕可以播放时触发 
    canplaythrough  当浏览器可在不因缓冲而停顿的情况下进行播放时 
    ended           当媒介已抵达结尾时
    error
    play
    playing         当媒介数据正在播放时运行脚本
    pause           当媒介数据暂停时运行脚本
    progress
    ratechange 
    seeked
    seeking
    vstalled
    durationchange 当视频的时长已更改时 
    emptied        当目前的播放列表为空时 
    loadstart
    loadeddata
    loadedmetadata
    suspend
    timeupdate      音频/视频(audio/video)的播放位置发生改变时触发
      若视频在播放时,位置一直在改变,则每秒触发一次
      具体触发情况:
        播放音频/视频(audio/video)时
        移动音频/视频(audio/video)播放位置时
    volumechange
    waiting
    ★独有事件 
  Remarks:
    直接改变音频的src,会立即切换播放;但改变其<source>需要重新加载才会切换播放.
'canvas'画布  [HTML5][IE9+][详参 JavaScript高级程序设计 445 页] 
  PS: 通过'width'和'height'两个标签属性设定尺寸,默认为宽度300px和高度150px;
    若CSS的尺寸与初始画布的比例不一致,会导致画布的内容进行相应的缩放;
    通过canvas,JS可以对图像进行像素级的操作, 
    可以直接处理图像的二进制原始数据,为图像的签名技术提供了支持 
    canvas提供了常用的图像格式转换功能,可使用JS更改图像的编码方式 
  浏览器不允许处理跨域图像  
    可使用CORS进行跨域处理;
    为了阻止欺骗,浏览器会追踪 image data,
    当把跟canvas域不同的图片放到canvas上,canvas就成为'tainted'被污染的,
    浏览器就不让你操作该canvas的任何像素,
    对于阻止多种类型的XSS/CSRF攻击[两种典型的跨站攻击]是非常有用的;
    没有服务器环境[比如本地的html网页,操作本地的一张图片],
    会报"Unable to get image data ... has been tainted by cross-origin data"错误 
    本地网页的域为'file://,如:file:///home/summer/Desktop/test.html',
    本地图片不是以'file://'开头的,如 'c:\tmp\test.png'
  检测浏览器是否支持画布: 检测'canvas.getContext'方法是否存在 
    if(canvas.getContext) {
    }
    else {
    }
  canvas = document.querySelector('canvas')  获取到canvas 
    cvs.toDataURL(type,quality); 返回包含图片的 data URI[需将图片预先放入canvas]
      PS:若画布的高度或宽度是0,那么会返回字符串“data:,”;
      type     可选,返回的图片类型,默认为 PNG
        图片的分辨率为96dpi;
        若传入非“image/png”,但返回的以“data:image/png”开头,则传入类型是不支持的;
        Chrome支持“image/webp”类型。
      quality  可选,设置得到图片的质量
        在指定图片格式为 image/jpeg 或 image/webp的情况下,
        可以从 0 到 1 的区间内选择图片的质量。
        若超出取值范围,将会使用默认值 0.92。其他参数会被忽略。
  ctx = canvas.getContext("2d");   获取canvas的'2d'上下文对象 
    PS: 使用上下文的属性和方法来操作画布,是画布的核心对象
      目前只支持2D绘图,将来可能还会有其他上下文类型 
      设置样式等应写在绘制图形之前,否则样式会渲染不上 
    画布坐标: canvas左上角为原点坐标: 0,0,所有元素的位置都相对于原点定位 
    ★绘制矩形: 不同于SVG,canvas只支持一种原生的图形绘制:矩形 
      不同于路径函数pathFunction,所有其他的图形的绘制都至少需要生成一条路径,
      这三个函数绘制之后会马上显现在canvas上,即时生效.
    ctx.fillRect(x,y,w,h)    绘制填充的矩形 
      x,y   坐标位置,单位px 
      w,h   宽高尺寸,单位px 
    ctx.strokeRect(x,y,w,h)  绘制矩形边框 
    ctx.clearRect(x,y,w,h)   清除一矩形区域,让清除部分完全透明  
    ★绘制路径 
      使用路径绘制图形的步骤:  
        创建路径起始点-绘制出路径-封闭路径-通过描边或填充路径区域来渲染图形 
      ctx.beginPath()  开始路径,之后图形绘制命令被指向到路径上生成路径 
      ctx.closePath()  闭合路径,之后图形绘制命令又重新指向到上下文中 
        闭合路径不是必需的,可通过当前点到开始点的直线来闭合图形,
        若图形是已经闭合了的,即当前点为开始点,该函数什么也不做.
        当调用fill()函数时,所有没有闭合的形状都会自动闭合,也不需要'closePath' 
        但是调用stroke()时不会自动闭合.
      ctx.moveTo(x,y)  移动笔触 
        PS: 该函数实际上并不能画出任何东西.
          当canvas初始化或者'beginPath'调用后,通常使用'moveTo'设置起点 
          也能够使用'moveTo'绘制一些不连续的路径 
      ctx.lineTo(x, y)  绘制一条从当前位置到指定x以及y位置的直线;
        该方法有两个参数:x以及y ,代表坐标系中直线结束的点.
        开始点和之前的绘制路径有关,之前路径的结束点就是接下来的开始点,
        开始点也可以通过moveTo()函数改变.
      ctx.rect(x,y,width,height)  将一个矩形路径增加到当前路径上
        绘制一个左上角坐标为(x,y),宽高为width以及height的矩形.
        当该方法执行的时候,moveTo()方法自动设置坐标参数(0,0) .
        也就是说,当前笔触自动重置会默认坐标. ?
      ctx.arc(x,y,radius,startAngle,endAngle,anticlockwise)  绘制圆弧
        画一个以 x,y 为圆心的以radius为半径的圆弧,从startAngle开始到endAngle结束,
        按照anticlockwise给定的方向[默认为顺时针]来生成.
         x,y为绘制圆弧所在圆上的圆心坐标.
         radius为半径.
         startAngle以及endAngle参数用弧度定义了开始以及结束的弧度.
           角度与弧度的js表达式:radians=(Math.PI/180)*degrees.
         这些都是以x轴为基准.
         参数anticlockwise 为一个布尔值.为true时,是逆时针方向,否则顺时针方向.
      ctx.arcTo(x1,y1,x2,y2,radius) 
        根据给定的控制点和半径画一段圆弧,再以直线连接两个控制点.
      ▼贝塞尔bezier以及二次贝塞尔
        一次以及二次贝塞尔曲线都十分有用,一般用来绘制复杂有规律的图形.
        Example:
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
    ★样式 
      ◆颜色: 默认情况下,线条和填充颜色都是黑色'#000' 
        通过设置'strokeStyle'或'fillStyle'的值,为新绘制的图形设定颜色 
        若要给每个图形上不同的颜色,需重设'fillStyle'或'strokeStyle'的值 
      ctx.fillStyle='color'    设置填充颜色 
        可使用颜色名、十六进制或RGB、rgba来设置
      ctx.strokeStyle='color'  设置线条颜色  
        可使用颜色名、十六进制或RGB、rgba来设置
      ctx.globalAlpha=num    设置全局透明度
        PS: 该属性影响到canvas里所有图形的透明度,
          globalAlpha 属性在需要绘制大量拥有相同透明度的图形时候相当高效.
          也可设置一个半透明颜色作为轮廓或填充的样式 
        num 有效的值范围: 0.0-1.0,默认'1.0'完全不透明 
      ◆线型
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
        Example:
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
        Example:
          var lineargradient = ctx.createLinearGradient(0,0,150,150);
          var radialgradient = ctx.createRadialGradient(75,75,0,75,75,100);
      gradient.addColorStop(position, color)
        创建出 canvasGradient 对象后,我们就可以用 addColorStop 方法给它上色了.
        接受 2 个参数,position 参数必须是一个 0.0 与 1.0 之间的数值,
        表示渐变中颜色所在的相对位置.例如,0.5 表示颜色会出现在正中间.
        color 参数必须是一个有效的 CSS 颜色值(如 #FFF, rgba(0,0,0,1),等等).
        可以根据需要添加任意多个色标(color stops).
        Example:
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
        Type 必须是下面的字符串值之一:repeat,repeat-x,repeat-y 和 no-repeat.
        Example:
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
      Example:
        文字阴影
          var ctx = document.getElementById('canvas').getContext('2d');
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;
          ctx.shadowBlur = 2;
          ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
          ctx.font = "20px Times New Roman";
          ctx.fillStyle = "Black";
          ctx.fillText("Sample String", 5, 30);
      ★渲染路径
      ctx.stroke();    通过线条来绘制图形轮廓  [无参数]
      ctx.fill();      通过填充路径的内容区域生成实心的图形
        PS:当我们用到 fill(或者 clip和isPointinPath )你可以选择一个填充规则,
          该填充规则根据某处在路径的外面或者里面来决定该处是否被填充,
          这对于自己与自己路径相交或者路径被嵌套的时候是有用的.
        两个可能的值:
           "nonzero"    non-zero winding rule, 默认值.
           "evenodd"    even-odd winding rule.
        Example:
          var ctx = document.getElementById('canvas').getContext('2d');
          ctx.beginPath();
          ctx.arc(50, 50, 30, 0, Math.PI*2, true);
          ctx.arc(50, 50, 15, 0, Math.PI*2, true);
          ctx.fill("evenodd");
    ★绘制文本 
      ctx.fillText(text, x, y [, maxWidth]); 在指定的(x,y)位置填充指定的文本
        绘制的最大宽度是可选的
      ctx.strokeText(text, x, y [, maxWidth]); 在指定的(x,y)位置绘制文本边框
        绘制的最大宽度是可选的
      ctx.strokeText(str,x,y,maxwidth); 边框文字 
      ctx.font        取/设字体
        使用和css中相同格式
        Example: :
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
        Example: :
        ctx.textAlign ="left"
      ctx.textBaseline 基线,取/设字体的垂直对齐方式
        bottom
        middle
        alphabetic  (默认值)
        ideographic
        hanging
        top
        Example: :
        ctx.textBaseline = "middle"
      Example: 
        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.font = "48px serif";
        ctx.fillText("Hello world", 10, 50);

        文本用当前的边框样式被绘制:
        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.font = "48px serif";
        ctx.strokeText("Hello world", 10, 50);
      ★文本样式
      ctx.font = value  当前我们用来绘制文本的样式.
        和 CSS font 属性相同的语法. 默认的字体是 '10px sans-serif'
      ctx.textAlign = value 文本对齐选项.
        可选的值包括:start, end, left, right or center. 默认值是 start.
      ctx.textBaseline = value 基线对齐选项
        可选的值包括:top, hanging, middle, alphabetic, ideographic, bottom.
        默认值是 alphabetic.
      ctx.direction = value 文本方向.
        可能的值包括:ltr, rtl, inherit.默认值是 inherit.
      Example:
        ctx.font = "48px serif";
        ctx.textBaseline = "hanging";
        ctx.strokeText("Hello world", 0, 100);
      ctx.measureText() 文本测量
        将返回一个 TextMetrics对象的宽度、所在像素,这些体现文本特性的属性.
        Example:
          var ctx = document.getElementById('canvas').getContext('2d');
          var text = ctx.measureText("foo"); // TextMetrics object
          text.width; // 16;
    ★绘制图像 
      PS: 可以用于动态的图像合成或者作为图形的背景,以及游戏界面(Sprites)等等.
        浏览器支持的任意格式的外部图片都可以使用,比如PNG、GIF或者JPEG.
        你甚至可以将同一个页面中其他canvas元素生成的图片作为图片源.
      引入图像到canvas里需要以下两步基本操作:
        获得一个指向HTMLImageElement的对象或者另一个canvas元素的引用作为源,
          也可以通过提供一个URL的方式来使用图片
        使用 drawImage() 函数将图片绘制到画布上
      获得需要绘制的图片
        canvas的API可以使用下面这些类型中的一种作为图片的源:
          HTMLImageElement 这些图片是由Image()函数构造出来的,或者任何的<img>元素
          HTMLVideoElement 用一个HTML的 <video>元素作为你的图片源,
            可以从视频中抓取当前帧作为一个图像
          HTMLCanvasElement 可以使用另一个 <canvas> 元素作为你的图片源.
          ImageBitmap  它可以从上述的所有源以及其它几种源中生成.
            这是一个高性能的位图,可以低延迟地绘制,
          这些源统一由 CanvasImageSource类型来引用.
        使用相同页面内的图片
          我们可以通过下列方法的一种来获得与canvas相同页面内的图片的引用:
          document.images集合
          document.getElementById() 等方法
        使用其它域名下的图片
          在 HTMLImageElement上使用crossOrigin属性,你可以请求加载其它域名上的图片.
          若图片的服务器允许跨域访问这个图片,那么你可以使用这个图片而不污染canvas,
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
            因此你应该用load时间来保证不会在加载完毕之前使用这个图片:
            var img = new Image();   // 创建img元素
            img.onload = function(){
              // 执行drawImage语句
            }
            img.src = 'myImage.png'; // 设置图片源地址
            若你只用到一张图片的话,这已经够了.
            但一旦需要不止一张图片,那就需要更加复杂的处理方法,
            但图片预装载策略超出本教程的范围,感兴趣的话可以参考JavaScript Image Preloader.
        通过 data: url 方式嵌入图像
          我们还可以通过 data:url 方式来引用图像.
          Data urls 允许用一串 Base64 编码的字符串的方式来定义一个图片.
          Example:
            img.src = 'data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw==';
            其优点就是图片内容即时可用,无须再到服务器兜一圈.
            (还有一个优点是,可以将 CSS,JavaScript,HTML 和 图片全部封装在一起,迁移起来十分方便.)
            缺点就是图像没法缓存,图片大的话内嵌的 url 数据会相当的长:
        使用视频帧
          你还可以使用<video> 中的视频帧(即便视频是不可见的).
          Example:
            例如,若你有一个ID为“myvideo”的<video> 元素,你可以这样做:
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
          Example:
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
          PS:注意:图像可能会因为大幅度的缩放而变得起杂点或者模糊.
            若您的图像里面有文字,那么最好还是不要进行缩放,
            因为那样处理之后很可能图像里的文字就会变得无法辨认了.
          drawImage 方法的又一变种是增加了两个用于控制图像在 canvas 中缩放的参数.
          这个方法多了2个参数:width 和 height,
          这两个参数用来控制 当像canvas画入时应该缩放的大小
          Example:
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
          Example:
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
        当你想要从几个元素中来创建对象时,这将会很实用.比如:
        添加了一条路径到当前路径(可能添加了一个变换矩阵).
      Example:
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
        Example:
          这条路径将先移动到点 (M10 10) 然后再水平移动80个单位 (h 80),
          然后下移80个单位 (v 80),接着左移80个单位 (h -80),再回到起点处 (z).
          var p = new Path2D("M10 10 h 80 v 80 h -80 Z");
    ★    
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
        Example: :
        ctx.globalCompositeOperation ="source-over"
    ★路径相关: 在描出路径之前,路径是不可见的
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
    ★图片绘制
      Example:
      var ctx = document.getElementById("mycanvas").getContext("2d");
      var img=document.getElementById("myImg");
      ctx.beginPath();
      ctx.drawImage(img,x,y);
      ctx.closePath();
      ctx.drawImage(图片/画布/视频(元素)对象,x,y,width,height); 放置图片
        三参数:1 需要绘制的图片对象, 2 3 图片坐标；
        五个参数:1 需要绘制的图片对象, 2 3 图片坐标, 4 5 图片宽高；
        九个参数:1 需要绘制的图片对象, 2 3 绘制图片的横纵向切割点,
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
        Example: :
        context.translate(20,50)
        分别向x,y方向移动20,50(单位为像素)
      ctx.rotate(弧度值);   画布旋转
    ★绘制阴影
      ctx.shadowOffsetX=num; 横向偏移量
      ctx.shadowOffsetY=num; 纵向偏移量
      ctx.shadowColor   阴影颜色
      ctx.shadowBlur=num; 模糊等级
    ★绘制渐变
      Example:
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
        Example:
        color.addColorStop(0.3,"orange");
        color.addColorStop(0.5,"yellow");
    Example:
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
其他标签脚本 
  <a href="#"></a> 超链接
    URL 协议
      URL 支持 javascript: 协议,调用URL时会执行对应的JS代码
      Example: <a href="Javascript:console.log(111);">11111111</a>
      浏览器地址栏也支持 javascript: 协议
      Example: 将 javascript:console.log(111) 放入地址栏,回车执行
      若JS代码返回的为字符串,则浏览器会在页面中显示出该字符串
        Chrome: 清空当前页面,显示出返回的字符串
        <a href="Javascript:'aaa'" target="_blank">11111111</a>  
        javascript:"aaa"   // 在浏览器地址栏中键入
  <script src="" charset="utf-8"></script>  脚本引入 
FileList File对象集: 表示用户选择的文件列表 [HTML5]
  PS: HTML5中[通过添加multiple属性],input[file]内能一次选中多个文件, 
    控件内的每一个被选择的文件都是一个file对象,而FileList对象是file对象的列表
    HTML4中,file控件内只能选中一个文件 
  ★获取'FileList'
  e.target.files   input[type='file']的'change'事件的事件对象   
    Example:
    <input type="file" id="file" multiple>
    document.querySelector("#file").addEventListener("change",function(e){
      console.log(this.files);
    })
      
    采用拖放方式,也可以得到FileList对象 [?]
    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('drop', handleFileSelect, false);
    function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var files = evt.dataTransfer.files; // FileList object.
        // ...
      }
  document.querySelector("input[type='file']").files  
  ★'file'的属性&方法   
  file.name  本地文件系统中的文件名 
  file.type  文件的MIME类型,字符串 
  file.size  文件的字节大小 
  file.lastModified      文件的上次修改时间,格式为时间戳。
  file.lastModeFiedDate  文件上一次被修改的时间,格式为Date对象实例 [仅Chrome支持]
  file.webkitRelativePath
FormData 表单模拟: 序列化表单、创建与表单格式相同的数据 [HTML5]
  PS: 不用明确的设置请求头,xhr对象能够识别传入的数据类型是FormData,并配置适当头信息 
  fd = new FormData([formElem]) 创建FormData对象 
    Example: 通过表单元素创建
    var fd = new FormData(document.forms[0]);
  fd.append(key,val [,name])    向fd中添加字段 
    PS: 当信息添加完后就可直接使用'xhr.send(fd)'进行发送 
    key   表单的控件名 
    val   实际的值 
    name  可选,通常是文件名 
  Example: 文件上传 
    var inputFile = document.querySelector('input[type="file"]');
    inputFile.addEventListener('change', function(e) {
      var formData = new FormData();
      formData.append(this.files[0].name, this.files[0]);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/server');
      xhr.onload = function(e) {
        console.log('上传完成!');
      };
      xhr.send(formData);  // multipart/form-data
    });
    
    加入JS生成的文件 
    var content = '<a id="a"><b id="b">hey!</b></a>';
    var blob = new Blob([content], { type: "text/xml"});
    formData.append("webmasterfile", blob);
FileReader 文件读取: 一种异步的文件读取机制 
  fr = new FileReader([file/blob])  创建fr对象 
  ★读取文件: 将文件数据读到到'fr.result'中 
  fr.readAsBinaryString(Blob|File) 得到文件的二进制字符串 
    PS: 通常将其传送到服务器端,服务器端可以通过这段字符串存储文件 
      该字符串每个字节包含一个0到255之间的整数
      可以读取任意类型的文件,而不仅仅是文本文件,返回文件的原始的二进制内容
      配合 xhr.sendAsBinary(),可上传任意文件到服务器 
    Example: 
      var fr = new FileReader();
      fr.onload = function(e) {
        var rawData = fr.result;
      }
      fr.readAsBinaryString(file);
  fr.readAsDataURL(Blob|File);     得到文件的'Data URL'的形式[基于Base64编码的'data-uri'对象] 
    PS: 将文件数据进行Base64编码,可将返回值作为图像的src 
  fr.readAsArrayBuffer(Blob|File)      得到文件的ArrayBuffer对象  
    返回一个类型化数组(ArrayBuffer),即固定长度的二进制缓存数据。
    在文件操作时(比如将JPEG图像转为PNG图像),这个方法非常方便。
    var fr = new FileReader();
    fr.onload = function(e) {
      var arrayBuffer = fr.result;
    }
    fr.readAsArrayBuffer(file);
  fr.readAsText(Blob|File[,encoding])  得到文件的纯文本表现形式 
    encoding   可选,指定编码类型,默认为'UTF-8' 
  ★其他属性/方法 
  fr.abort()  中断文件读取  
  fr.result   读取到的数据,文件的URI数据,其他操作的结果都存放在该属性中 
  ◆事件
  loadstart 数据读取开始时触发
  progress  数据读取中触发,每50ms左右触发一次 
    Example: 用来显示读取进度 
    var fr = new FileReader();
    fr.onprogress = function (e) {
      if (e.lengthComputable) {
        var percentLoaded = Math.round((e.loaded / e.totalEric Bidelman) * 100);
        var progress = document.querySelector('.percent');
        if (percentLoaded < 100) {
          progress.style.width = percentLoaded + '%';
          progress.textContent = percentLoaded + '%';
        }
      }
    }
  abort     读取中断或调用 fr.abort() 时触发 
  error     数据读取出错时触发  
    触发error事件时,相关的信息在 fr.error.code 中,表示错误码
    1 未找到文件 
    2 安全性错误
    3 表示读取中断
    4 文件不可读
    5 编码错误
    Example:
      var fr = new FileReader();
      fr.onerror = errorHandler;
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
  load      读取成功后触发 
    load事件的回调函数接受一个事件对象,e.target.result 就是文件的内容 
    <input type="file" >
    var fr = new FileReader();
    fr.onload = function(e) {
      document.createElement('img').src = e.target.result;
      // 此时 fr.result === e.target.result 
    };
    document.querySelector("input[type='file']")
    .addEventListener("change",function(e){
      fr.readAsDataURL(e.target.files[0]);
    })
  loadend   读取完成后触发,不管是否成功 
    触发顺序排在onload或onerror后  
  Example: 
    读取文件内容后直接以二进制格式上传 
    var fr = new FileReader();
    fr.onload = function(){
      xhr.sendAsBinary(this.result); // chrome已移除 xhr.sendAsBinary 
    }
    // 把从input里读取的文件内容,放到fileReader的result字段里
    fr.readAsBinaryString(file);
    XMLHttpRequest.prototype.sendAsBinary = function(text){
      var data = new ArrayBuffer(text.length);
      var ui8a = new Uint8Array(data, 0);
      for (var i = 0; i < text.length; i++){ 
        ui8a[i] = (text.charCodeAt(i) & 0xff);
      }
      // 将字符串转成8位无符号整型,然后存放到一个8位无符号整型数组里面,
      // 再把整个数组发送出去。
      this.send(ui8a);
    }
WYSIWYG'what you see is what you get'所见即所得,富文本编辑 [详参 JS高级程序设计 440 页] 
  PS: 由IE引入,已成事实标准;本质为在页面中嵌入一个包含空HTML页面的iframe,
    通过设置designMode属性,使该HTML页面可以被编辑,
    编辑的对象则是该页面<body>元素的HTML代码.
    designMode 属性有两个可能的值: "off" 和 "on"(on时则可编辑)
    需要等到页面完全加载之后才能设置为可编辑状态(一般使用 load事件监听)
  Example: :
  在页面创建一个 iframe标签
  设置其designMode为"on"(frames["XX"].document.designMode ="on")
  注:在Chrome中不可使iframe的src外链其他文件[出于安全限制] 
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
    Example: :
    转换粗体文本
    frames["XX"].document.execCommand("bold",false,null);
'Web Workers'工作线程[HTML5]
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
        Example:
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
      Example: onmessage = PP;
        function PP(event){
          // 若主程序发来"ping",则工作线程JS 回复"pong"
          if(event.data =="ping"){
            postMessage("pong")
          }
        }
    importScripts 函数
      使用 importScripts 可向工作线程JS文件中导入一个或多个JS文件
      importScripts("http://big.com/a.js","https://www.baidu.com/b.js")
      多个JS间使用逗号分割.
      也可使用 importScripts 建立JSONP请求
        Example:
          function makeServerRequest(){
            importScripts("http://SomeServer.com?callback=handleRequest");
            function handleRequest(response){
              postMessage(response);
            }
          }
          makeServerRequest();
    close         停止工作
      close() 让工作线程停止工作.
  Example: 工作线程JS 接收命令执行操作 并返回
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
  HTML DOM 
    使用HTML DOM操作,可查询 HTML DOM手册
    Example: :
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
      x-aoo  标签类型[名字]需使用 - 连接
      不能是以下这些:
      annotation-xml、color-profile、font-face、font-face-src、
      font-face-uri、font-face-format、font-face-name、missing-glyph
      第二个参数是标签相关的配置,提供一个 prototype(以 HTMLElement 的原型为基础创建的对象)
        Example:
          在 HTML 中去使用自定义的标签:
          <div> <x-foo></x-foo> </div>
    HTML Imports
    HTML Templates
    Shadow DOM     隔离组件间代码的冲突和影响
    生命周期和回调:
      Web Components 标准提供一系列控制自定义元素的方法
      一个自定义元素会经历以下生命周期:
        注册前创建
        注册自定义元素定义
        在注册后创建元素实例
        元素**到 document 中
        元素从 document 中移除
      ◆回调: 
        PS:元素的属性变化时
          在注册新的自定义元素时指定对应的生命周期回调,为自定义元素添加各种自定义的行为
          生命周期回调包括(括号中为 Custom Elements 2016.07.21 新标准):
      createdCallback(constructor in class)  自定义元素注册后,在实例化之后会调用
        (多用于做元素的初始化:如**子元素,绑定事件等)
      attachedCallback(connectedCallback)    元素**到 document 时触发
      detachedCallback(disconnectedCallback) 元素从 document 中移除时触发
        (用于做类似 destroy 之类的事情)
      attributeChangedCallback               元素属性变化时触发
        (可以用于从外到内的通信:外部通过修改元素的属性来让内部获取相关的数据并且执行对应的操作)
        这个回调在不同情况下有对应不同的参数:
        设置属性时,参数列表是:属性名称,null,值,命名空间
        修改属性时,参数列表是:属性名称,旧值,新值,命名空间
        删除属性时,参数列表是:属性名称,旧值,null,命名空间
      adoptedCallback:              使用 document.adoptNode(node) 时触发
      Example: 
        创建一个自定义的 button-hello 按钮,点击时会 alert('hello world'):
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
        注:上述代码执行之后才能使用 <button-hello></button-hello>
    扩展原有元素:
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
      Web Components 标准中:createElement 和 createElementNS 支持元素扩展:
        const hello = document.createElement('button', 'button-hello')
--------------------------------------------------------------------------------
◆Mobile移动端 
  IOS移动设备上,长按<a>标签,会弹出浏览器的原生菜单 
    在JS中设置取消的方法
    document.documentElement.style.webkitTouchCallout = 'none';
    代码为全局设置,若只针对某一块元素,则将其写在对应的块中;
WeiXin 微信 
  不支持的功能 
    模板字符串  ios中支持,android中不支持[20170124]
    可使用 window.open() 来打开新窗口,但都在当前窗口中打开,不支持 window.opener 来传递信息
    不支持进行跳转到上一步url中带有参数的url地址  [?]
      比如:一个查询列表页的url是: http://someweb?city=beijing
      当从这个页面跳到第二个页面比如详细页, 在详细页再执行返回上一页如: 
      location.href=document.referrer的时候   
      跳回的url就不再是 http://someweb?city=beijing   所以页面可能会死掉
      解决:微信开发中 不要用 带url参数的地址,都用/ ../ ,
      把上面的 http://someweb?city=beijing   换成   http://someweb/beijing   这种即可
  event 事件 
    禁止下滑显示网址 
      $(document).on('touchmove',function(e){
        e.preventDefault();
      })
------------------------------------------------------------------------待整理 
  input表单无法获取焦点 
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
    // setTimeout(function(){
    //   $('#test1').focus();
    // },10000);


