'Document Object Model'DOM,文档对象模型:提供访问和操作网页内容的方法和接口 
  PS: 由W3C规定,一种结构化表示文档的方法,可改变文档的内容和呈现方式 
  DOM树: 将整个HTML文件、标签看成一个由对象组成的树 
    结构: document > 'html' > 'head'+'body' > ... 
    document为根节点 
    <HTML>为文档元素,是文档的最外层元素,文档中的其他所有元素都包含在该元素中; 
    每一段标记都可以通过树中的一个节点来表示;
    对DOM的任何修改都会在浏览器呈现DOM时立即反映出来;
    DOM不是专为HTML设计的,是通用型的标准,为所有标记语言而设计,
    IE中DOM对象以COM对象形式实现,故IE与原生JS对象有差异; 
◆Node,节点,所有节点类型的基础类型 
  PS: 节点分不同类型,分别表示文档中不同的信息或标记,共有12种 
    并非所有节点类型浏览器都支持,最常用的节点类型为'元素节点'和'文本节点' 
    一节点不能同时存在多个文档中,也不能同时出现在一文档的多个位置  
    IE未公开Node类型的构造函数,故无 Node 的静态属性/方法 
  Extend: EventTarget 
    console.log(Node.prototype.__proto__.constructor===EventTarget); // true  
  Static:  
    ◆节点类型的数值表示  
    Node.DOCUMENT_NODE   9,document节点
    Node.ELEMENT_NODE    1,元素节点 
    Node.TEXT_NODE       3,文本节点 
    Node.COMMENT_NODE    8,注释节点,表示一注释  
    Node.DOCUMENT_TYPE_NODE       10,文档类型的定义 
    Node.DOCUMENT_FRAGMENT_NODE   11,文档片段 
    Node.PROCESSING_INSTRUCTION_NODE  7,文档处理程序使用的特有指令 
    DOM4已弃用的节点类型 
      Node.ATTRIBUTE_NODE         2,元素的耦合属性
      Node.ENTITY_REFERENCE_NODE  5,表示一个实体引用
      Node.CDATA_SECTION_NODE     4,在XML文档中表示CharacterData[字符数据]部分
      Node.ENTITY_NODE            6,在XML文档中表示一个实体
      Node.NOTATION_NODE          12,在XML文档中表示一个符号
    ◆其他
    Node.DOCUMENT_POSITION_DISCONNECTED 1   
    Node.DOCUMENT_POSITION_PRECEDING    2   
    Node.DOCUMENT_POSITION_FOLLOWING    4   
    Node.DOCUMENT_POSITION_CONTAINS     8   
    Node.DOCUMENT_POSITION_CONTAINED_BY 16   
    Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC 32   
  Proto: 
    ★节点信息 
    .nodeType  num,节点类型 
    .nodeName  str,节点名称 
      标签的大写形式 元素节点
      属性名称      属性节点 
      "#document"  文档节点document
      '#text'      文本节点  
      "#comment"   注释节点  
      "#document-fragment" 文档片段节点 
    .nodeValue val,节点值  
      元素节点无节点值,返回 null
      属性节点返回属性值;
      文本节点返回文本内容[不包含html] 
      注释节点值为注释的内容 
      文档片段节点无节点值,返回 null 
    .baseURI   str,当前节点所在文档的基URI,若无法获取则返回null 
      一般情况下,基URL为 document.location ,但是它受诸多方面因素的影响,
      例如 HTML 的 <base> 元素和 XML xml:base 属性
    .isConnected  bol,
    ★节点关系 
    .ownerDocument  document,文档节点 
    .getRootNode()  document,文档节点 
    .parentNode       父节点 
      属性节点、文档片段节点无父节点,为 null 
    .previousSibling  前一兄弟节点[第一个节点的该属性为null] 
    .nextSibling      后一个兄弟节点[最后一个节点的该属性为null] 
    .firstChild       第一个子节点[若没有子节点则为null]  
    .lastChild        最后一个子节点[若没有子节点则为null] 
    .parentElement  父元素节点 
    .hasChildNodes(cNode)  bol,是否有该子节点 
    .contains(targeNode)   bol,是否包含目标节点 [专有扩展] 
    .isSameNode(nod2)      bol,是否为同一节点引用 [DOM3] 
    .isEqualNode(node1)    bol,两个节点是否具有同样类型、属性、子节点等 [DOM3]  
    .compareDocumentPosition(targetNode) num,与目标节点间的关系[DOM3][IE9+] 
      返回数值,表示该关系的位掩码'bitmask'
      1     无关,给定的节点不再当前文档中 
      2     居前,给定的节点在DOM树中位于参考节点之前 
      4     居后,给定的节点在DOM树中位于参考节点之后 
      8     包含,给定的节点是参考节点的祖先 
      16    被包含,给定的节点是参考节点的后代 
    ★节点操作 
    .textContent   str,读写,节点及其内部节点的文本内容 [DOM3][IE9+] 
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
    .appendChild(cNode)            节点内部尾部添加子节点  
      cNode 子节点,若为文档中的节点,则是移动操作[原位置消失,在插入位置出现] 
    .insertBefore(cNode,flagNode)  节点内的指定节点前插入子节点 
      flagNode  父节点内指定的节点,为 null 时,等同于 appendChild 
    .removeChild(cNode)            删除子节点 
    .replaceChild(newNode,oldNode) 在节点内用新节点替换旧节点 
    .cloneNode(bol)      node,返回复制的节点[但未添加到文档结构中] 
      PS: 不会复制节点中JS添加的属性,如事件等,只复制特性 
        IE中存在bug会复制事件处理程序,可以通过复制前移除事件来决解 
      bol   true 复制节点及其整个子节点树;false 只复制节点本身[只有标签]
    .normalize()         合并同一级别的文本节点 
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
    命名空间相关 
      .isDefaultNamespace()  bol,
      .lookupNamespaceURI()  
      .lookupPrefix()  
    常量 
      .ELEMENT_NODE                 1  
      .ATTRIBUTE_NODE               2  
      .TEXT_NODE                    3  
      .CDATA_SECTION_NODE           4  
      .ENTITY_REFERENCE_NODE        5  
      .ENTITY_NODE                  6  
      .PROCESSING_INSTRUCTION_NODE  7  
      .COMMENT_NODE                 8  
      .DOCUMENT_NODE                9  
      .DOCUMENT_TYPE_NODE           10  
      .DOCUMENT_FRAGMENT_NODE       11  
      .NOTATION_NODE                12  
      .DOCUMENT_POSITION_DISCONNECTED  1  
      .DOCUMENT_POSITION_PRECEDING     2  
      .DOCUMENT_POSITION_FOLLOWING     4  
      .DOCUMENT_POSITION_CONTAINS      8  
      .DOCUMENT_POSITION_CONTAINED_BY  16  
      .DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC  32  
    已废弃 
      .setUserData()   节点添加额外数据[DOM3]
Document,文档 
  Extend: Node 
    console.log(Document.prototype.__proto__.constructor===Node); // true 
  Proto: 
    ★Env: 
    .implementation  DOMImplementation, 
    ★Sit:  
    .referrer str,获取跳转页的URL,即获取从哪个网址跳转过来的 
      PS:若当前文档不是通过超级链接访问的,则为空字符串''
        这个属性允许客户端JS访问HTTP引用头部 
    .cookie   str,读写,当前页面所有可用的cookie的字符串 
      PS: 根据域、路径、失效时间和安全设置等来确定是否可用;  
        网站为了标示用户身份而储存在客户端的数据,通常经过加密; 
        储存空间大小为每个域名4kb,超过部分被忽略;
        存储个数每个域50个,各个浏览器不尽相同;
        cookie同源政策不要求传输协议,即http和https之间读写无限制
      cookie的构成 
        ◆内容,会发送到服务器的部分 
        key=val  必须,cookie的内容 
          一般不区分大小写[但可能服务器处理时会区分]
          键值都需为有效的URL字符,否则需用encodeURIComponent转义 
        ◆属性,不会发送到服务器,只是用于控制该cookie   
        domain=xxx   可选,限制域名访问,必须为当前发送Cookie域名的一部分 
          PS: 只有访问的域名匹配domain属性,Cookie才会发送到服务器
          Example: 
          example.com 
          .example.com  // 对所有子域名生效
          subdomain.example.com
        path=xxx     可选,限制路径访问,只有在该路径及以下才会发送cookie
        expires=xxx  可选,指定过期时间,即过了该时间,cookie被清理 
          PS: 使用格式采用 Date.toUTCString() 格式,参照时间为本地时间, 
            若未设置或为null,当窗口关闭时Cookie被清理; 
            若设置为之前的时间或0,则cookie会被立刻删除 
          Example: 
          设置7天后cookie过期
          var date = new Date();
          date.setDate((date,getDate()-1));
          document.cookie = 'user='+encodeURIComponent('张三')+';expires='+date;
          decodeURICompinent(document.cookie);
        max-age=xxx  可选,指定有效时长,单位s,如 60*60*24*365 [一年31536000秒] 
        secure   可选,是否只对https协议发送cookie  
          cookie只有在使用SSL连接的时候才发送到服务器 
        HttpOnly 可选,能否被JS读取,主要为了防止XSS攻击盗取Cookie 
          Set-Cookie: key = value; HttpOnly
          该cookie,JS无法获取,AJAX操作也无法获取
      服务器写入: 响应头中设置Cookie 
        Set-Cookie: key1=val1; expires=xxx; Max-Age=xxx; path=xx; domain=xxx
        Set-Cookie: key2=val2; expires=xxx; Max-Age=xxx; path=xx; domain=xxx
        ...
      客户端发送: 请求头中携带Cookie 
        PS: 可访问的前提下,http请求中cookie始终会被携带, 
          即在主域名中设置的cookie会始终在同源的主域名和其子域名的http请求中携带,
          在子域名中设置的cookie会始终在该子域名的http请求中携带;
        Cookie: key1=val1  
      JS读cookie: cookie间使用分号分割,需手动取出每一个cookie 
        PS: 键和值可用decodeURIComponent来解码 
        var cookie = document.cookie.split(';');
        for (var i = 0; i < cookie.length; i++) {
          console.log(cookie[i]);
        }
      JS写cookie: document.cookie = str  新增或覆盖已存在的cookie  
        PS: 一次只能写入一个cookie
          改变已存在的cookie,key、domain、path、secure需都匹配,否则为新建cookie;
        // 格式同相应头中的格式  
        document.cookie ='key=val;expires=time;domain=域名;path=路径;secure'; 
        var cookieHandle = { // 自定义增删查的方法 
          get: function (name){
            var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
            if (cookieStart > -1){ // 存在该cookie 
              var cookieEnd = document.cookie.indexOf(";", cookieStart);
              if (cookieEnd == -1){ // 最后一个cookie 
                cookieEnd = document.cookie.length;
              }
              cookieValue = decodeURIComponent(document.cookie.substring(
                cookieStart + cookieName.length
                ,cookieEnd
              ));
            }
            return cookieValue;
          },
          set: function (name,value,option) {
            // option --  { // 可选 
            //   expires: obj   // Date
            //   ,path: str
            //   ,domain: str
            //   ,secure: bol
            // }
            var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
            if (option) {
              if (option.expires instanceof Date) {
                cookieText += "; expires=" + option.expires.toGMTString();
              }
              if (option.path) {
                cookieText += "; path=" + option.path;
              }
              if (option.domain) {
                cookieText += "; domain=" + option.domain;
              }
              if (option.secure) {
                cookieText += "; secure";
              }
            }
            document.cookie = cookieText;
            return cookieText;
          },
          del: function (name,path,domain,secure){
            this.set(name,"", {
              expires: new Date(0)   
              ,path: path 
              ,domain: domain 
              ,secure: secure 
            });
          }
        };
    .domain   str,读写,当前页域名 
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
    .defaultCharset  str,根据浏览器及操作系统的设置,当前文档默认的字符集[HTML5]
      [Chrome不支持?] 
    ★Pag:    
    .doctype  DocumentType,文档类型,<!DOCTYPE>的引用 
    .documentElement  HTMLHtmlElement,<html>元素   
    .head  HTMLHeadElement,快捷获取[HTML5][IE9+]
    .body  HTMLBodyElement,<body>元素  
    .URL      str,当前页完整URL 
    .readyState  str,文档的加载状态[HTML5] 
      'loading'  正在加载文档 
      'complete' 已加载完文档 
    .compatMode  str,浏览器渲染模式[HTML5] 
      IE6开始区分渲染页面的模式是标准的还是混杂的,IE为此给document添加了'compatMode'属性 
      "CSS1Compat" 标准模式 
      "BackCompat" 混杂模式 
    .hasFocus()  bol,检测文档是否获得了焦点[HTML5] 
    .charset  str,读写,文档实际使用的字符集[HTML5] 
      也可通过<meta>元素、响应头部修改 
    .characterSet  str,字符集 
    .title    str,读写,网页标题 
    .hidden   bol,页面是否隐藏 [HTML5]  
      PS: 隐藏包括页面在后台标签页中或浏览器最小化 
      页面不可见时播放中的视频暂停,可见时视频继续播放
        <video id="video" 
        autoplay="autoplay" 
        loop="loop" 
        src="http://www.w3school.com.cn/example/html5/mov_bbb.mp4"> 
        </video>
        var video = document.getElementById('video') ;
        var Prefix = null;
        getHidden();
        //获取当前浏览器的hidden属性
        function getHidden(){
          ['webkit','ms','moz','o'].forEach(function(prefix){
            if((prefix+'Hidden') in document){
              Prefix = prefix;
            }
          });
          if(Prefix == null){
            alert('你的浏览器不支持Page Visibility API');
          }
        }
        //为visibilitychange事件绑定处理程序
        document.addEventListener(Prefix+'visibilitychange',handleVisibilityChange,false) ;
        function handleVisibilityChange(){
          switch (document.hidden){
            case true: //返回hidden = true,页面不可见
              video.pause();
              break;
            case false: //返回hidden = false,页面可见
              video.play();
              break;
          }
        }
    .visibilityState  str,页面隐藏或显示的状态[DiBs] 
      'hidden' 
      'visible'
      'prerender'
    ★Elm: 
    .images  HTMLCollection,所有<img>元素 
    .forms   HTMLCollection,所有<form>元素 
    .scripts  HTMLCollection,所有<script>元素 
    .links   HTMLCollection,具有href特性的所有<a>元素 
    .embeds  HTMLCollection, 
    .plugins  HTMLCollection, 
    .styleSheets  StyleSheetList,样式表集合 
    .getElementsByTagName(str)  HTMLCollection,  
    .getElementsByClassName(str)  HTMLCollection, 
    .getElementsByName('')  NodeList, 
    .querySelectorAll(str)  NodeList, 
    .execCommand(key,bol,val)  bol,文本操作,返回操作是否被支持或被启用的布尔值  
      PS: 该方法也适用于页面中contenteditable属性为true的区块 
        只是把对框架的document引用替换成当前窗口的document对象即可
      key  要执行的命令名称
      bol  浏览器是否应该为当前命令提供用户界面 
        Firefox中设置为true会报错,故一般设置为false 
      val  执行命令相应的值,不需要则为null或省略  
      命令枚举: 
        不同浏览器支持的预定义命令也不一样,下表列出了那些被支持最多的命令: 
        命令           值           说明
        'backcolor'     颜色字符串   设置文档背景色 [Chrome不支持]
        'selectall'     null        选中文档中的所有文本
        'fontname'      字体名称       将选中文本修改为指定字体 
        'bold'          null          将选中文本转换为粗体 
        'italic'        null          将选择的文本转换成斜体 
        'underline'     null          为选择的文本添加下划线 
        'fontsize'      1-7           将选中文本修改为指定字体大小 
        'forecolor'     颜色字符串     将选中文本修改为指定的颜色 
        'indent'        null        缩进文本 
        'outdent'       null        凸排文本,减少缩进 
        'justifyleft'   null        将插入光标所在文本块左对齐 
        'justifycenter' null        将插入光标所在文本块居中对齐 
        'createlink'    URL     将选中文本转换成一个链接,指向指定的URL 
        'unlink'        null    移除文本的链接,撤销createlink操作 
        'formatblock'   <tag>   使用指定的HTML标签来包含选择的文本块 
        'removeformat'  null    移除插入光标所在文本块的块级格式,撤销formatblock操作 
        'copy'          null        将选中文本复制到剪贴板
        'cut'           null        将选中文本剪切到剪贴板
        'paste'         null        将剪贴板中的文本粘贴到选择的文本
        'delete'        null        删除选中文本 
        'inserthorizontalrule'  null    在插入字符处插入一个<hr>元素
        'insertparagraph'       null    在插入字符处插入一个<p>元素
        'insertunorderedlist'   null    在插入字符处插入一个<ul>元素
        'insertorderedlist'     null    在插入字符处插入一个<ol>元素
        'insertimage'           imgURL  在插入字符处插入一个图像
      Example: 
      转换粗体文本
      frames["XX"].document.execCommand("bold",false,null);
    .queryCommandEnabled(key)  bol,是否可针对当前选择的文本或当前插入字符所在位置执行某个命令 
      PS: queryCommandEnabled()方法返回true,并不意味着实际上就可以执行相应命令 
        而只能说明对当前选择 的文本执行相应命令是否合适。
        例如,Firefox在默认情况下会禁用剪切操作,但执行queryCommandEnabled("cut")也可能会返回true
      key  检测的命令 
      Example: 
      var result = frames["richedit"].document.queryCommandEnabled("bold");
    .defaultView  当前document对应的window对象,不存在则为 null [DOM2] 
      IE不支持该属性,有 document.parentWindow 和其等价
      console.log(document.defaultView === window); // true  
    .activeElement  始终表示DOM中当前获得焦点的元素 [HTML5] 
      默认情况下,文档刚加载完,document.activeElement 中保存的是document.body 元素
      加载期间 document.activeElement 的值为 null
    .childElementCount [ElementTraversal]
    .firstElementChild [ElementTraversal]
    .lastElementChild  [ElementTraversal]
    .children 
    .rootElement 
    .getElementById("idName")  elem,通过id值获取对应的第一个元素 
      id值区分大小写;不存则返回 null 
    .querySelector()       [SelectorsAPI]
    ★元素操作 
    .prepend()  
    .append()  
    .importNode(nod,bol) node,复制节点,插入并返回  [DOM2]
      PS: 将外部文档的一个节点拷贝一份,然后可以把这个拷贝的节点插入到当前文档中 
        源节点不会从外部文档中删除,被导入的节点是源节点的一个拷贝 
        HTML中不常用,XML中常用 
      Example:
      var iframe = document.getElementsByTagName("iframe")[0];
      var oldNode = iframe.contentDocument.getElementById("myNode");
      var newNode = document.importNode(oldNode, true);
      document.getElementById("container").appendChild(newNode);
    ★创建节点 
    .createElement('tagName'[,options])  elem,创建元素节点 
      PS: 只是创建了一空元素[只有标签],无属性和内容,还没添加到html中[驻留在内存中] 
      'tagName' str,待创建元素的标签名  
        HTML中不区分大小写,XML中区分大小写 
      options   可选,'ElementCreationOptions'对象 
      IE中可传入HTML代码来创建HTML元素 
        var div = document.createElement("<div class="a" id="b"></div>");
      当指定未定义的元素时,创建一个 HTMLUnknownElement 
        console.log(HTMLUnknownElement===document.createElement('abc').constructor); // true 
    .createTextNode("文本")      txt,创建一文本节点
    .createComment("文本")   comt,创建一注释节点[Chrome、IE不支持] 
    .createAttribute("attrName") atr,创建属性节点 
    .createDocumentFragment("文本") frag,创建文档片段
    ★文档流写入、打开、关闭 
    .write(str)    将输出流写入到网页中  
      可使用该方法动态的包含外部资源,比如JS文件 
        document.write("<script type=\"text/javascript\" src=\"file.js\"><\/script>");
        注意不能在字符串中直接包含"</script>",需进行转义为'<\/script>' 
        否则会导致被解析为脚本块的结束
      清空原网页输出&叠加输出  
        文档加载完毕后,文档流已经关闭 
        当执行document.write()时,会先调用document.open()创建一个新的文档流,
        在写入新的内容,再通过浏览器展现,会导致原内容被清空 
        当文档未加载完毕,且文档流未关闭时,执行 document.wirte() 会叠加输出  
    .writeln(str)  换行输出,类似write,会在输出末尾加一换行符'\n' 
    .open(url,str,target)  新建新建窗口,并打开文档流 
      url 打开窗口的网址,默认为在当前网址后增加,使用'http://xxx'则表示一新网址 
      target 打开窗口的位置,可选'_blank'...
    .close() 关闭手动创建的文档流 
    ★待整理 
      .anchors 
      .applets 
      .selectedStylesheetSet 
      .preferredStylesheetSet 
      .scrollingElement 
      .fonts 
      .pointerLockElement 
      .createCDATASection()  
      .createProcessingInstruction()  
      .adoptNode()  
      .write()  
      .execCommand()  
      .queryCommandEnabled()  
      .queryCommandIndeterm()  
      .queryCommandState()  
      .queryCommandSupported()  
      .queryCommandValue()  
      .exitPointerLock()  
      .registerElement()  
      .caretRangeFromPoint()  
      .getSelection()  
      .elementFromPoint()  
      .elementsFromPoint()  
      .createExpression()  
      .createNSResolver()  
      .evaluate()  
    ★事件相关 
      .createEvent() 
      .onvisibilitychange  当文档从可见变为不可见或从不可见变为可见时触发事件[IE10+]
      .onreadystatechange 
      .onpointerlockchange 
      .onpointerlockerror 
      .onwebkitfullscreenchange 
      .onwebkitfullscreenerror 
      .onabort 
      .onblur 
      .oncancel 
      .oncanplay 
      .oncanplaythrough 
      .onchange 
      .onclick 
      .onclose 
      .oncontextmenu 
      .oncuechange 
      .ondblclick 
      .ondrag 
      .ondragend 
      .ondragenter 
      .ondragleave 
      .ondragover 
      .ondragstart 
      .ondrop 
      .ondurationchange 
      .onemptied 
      .onended 
      .onerror 
      .onfocus 
      .oninput 
      .oninvalid 
      .onkeydown 
      .onkeypress 
      .onkeyup 
      .onload 
      .onloadeddata 
      .onloadedmetadata 
      .onloadstart 
      .onmousedown 
      .onmouseenter  
      .onmouseleave  
      .onmousemove 
      .onmouseout 
      .onmouseover 
      .onmouseup 
      .onmousewheel 
      .onpause 
      .onplay 
      .onplaying 
      .onprogress 
      .onratechange 
      .onreset 
      .onresize 
      .onscroll 
      .onseeked 
      .onseeking 
      .onselect 
      .onshow 
      .onstalled 
      .onsubmit 
      .onsuspend 
      .ontimeupdate 
      .ontoggle 
      .onvolumechange 
      .onwaiting 
      .onbeforecopy 
      .onbeforecut 
      .onbeforepaste 
      .oncopy 
      .oncut 
      .onpaste 
      .onsearch 
      .onselectionchange 
      .onselectstart 
      .onwheel 
      .onauxclick 
      .ongotpointercapture 
      .onlostpointercapture 
      .onpointercancel 
      .onpointerdown 
      .onpointerenter 
      .onpointerleave 
      .onpointermove 
      .onpointerout 
      .onpointerover 
      .onpointerup 
    ★命名空间相关 
      .createElementNS()  
      .createAttributeNS()  
      .getElementsByTagNameNS()  
    ★不常用 
      .currentScript 
      .documentURI  str,url地址 
      .origin       str,协议+域名  
      .inputEncoding str,默认'UTF-8'
      .contentType str,默认'text/html'
      .lastModified 
      .dir 
      .designMode 读写,网页中所有元素可编辑 
        'on'/'off' 
      .xmlEncoding 
      .xmlVersion 
      .xmlStandalone 
      .createNodeIterator(node,num,filter/foo,bol)  创建NodeIterator对象 
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
      .createTreeWalker()  创建TreeWalker对象 
      .createRange()  创建DOM范围 
    ★兼容性 
      .documentMode 识别文档模式[IE专属][IE8+] 
        IE8能以不同的模式渲染页面,主要依赖于<!DOCTYPE>或者当前的某一个HTML元素
        如果未定义<!DOCTYPE>,IE8以IE5的模式来渲染页面
        按照下列的值返回:
        5   ----- in IE5 mode
        7   ----- in IE7 mode
        8   ----- in IE8 mode
        9   ----- in IE9 mode
      .webkitIsFullScreen 
      .webkitCurrentFullScreenElement 
      .webkitFullscreenEnabled 
      .webkitFullscreenElement 
      .webkitVisibilityState 
      .webkitHidden 
      .webkitCancelFullScreen()  
      .webkitExitFullscreen()  
      .selection  当前激活选中区,即高亮文本块,或文档中用户可执行某些操作的其它元素 [Chrome不支持]
        典型用途是作为用户的输入,以便识别正在对文档的哪一部分正在处理,或者作为某一操作的结果输出给用户。 
        用户和脚本都可以创建选中区。用户创建选中区的办法是拖曳文档的一部分。
        脚本创建选中区的办法是在文本区域或类似对象上调用 select 方法。
        要获取当前选中区,请对   document   对象应用   selection   关键字。
        要对选中区执行操作,请先用   createRange   方法从选中区创建一个文本区域对象。  
        一个文档同一时间只能有一个选中区。选中区的类型决定了其中为空或者包含文本和/或元素块。
        尽管空的选中区不包含任何内容,你仍然可以用它作为文档中的位置标志。  
        在IE下 这个方法  document.selection.createRange() 不支持,因此为了修复这个bug和在IE10+以上的话,
        今天又特意研究了下, 在file控件下获取焦点情况下 document.selection.createRange() 将会拒绝访问,
        所以我们要失去下焦点。我们可以再加一句代码就可以支持了 file.blur();
HTMLDocument,HTML文档 
  Extend: Document 
    console.log(HTMLDocument.prototype.__proto__.constructor===Document); // true 
  Instance: document,DOM根节点 
    document,表示浏览器中的整个页面,包含完整的DOM 
      子节点可为: 
      DocumentType[最多一个]、Element[最多一个]、ProcessingInstruction 或 Comment
  Proto:   [属性/方法都已废弃] 
    .all        文档内所有元素的类数组集合 
    .fgColor    读写,文档前景色或文本颜色 
    .bgColor    读写,文档背景色 
    .linkColor  读写,文档内链接元素[<a>]的颜色 
    .alinkColor 读写,文档内活动链接的颜色 
    .vlinkColor 读写,文档内点击过的链接的颜色 
    .clear()    清除整个文档 
    .captureEvents()   注册窗口以捕获指定类型的所有事件 
      等价于 window.captureEvents()  
    .releaseEvents()     
      等价于 window.releaseEvents() 
DOMImplementation,功能检测及创建文档 
  Extend: Object 
    console.log(DOMImplementation.prototype.__proto__.constructor===Object);
  Proto: 
    .hasFeature(feature,version)  bol,浏览器功能检测[DOM1] 
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
    .createDocumentType()  创建HTML5之前的doctype相关[DOM2] 
    .createDocument()      创建新文档[DOM2] 
    .createHTMLDocument(titlename) 创建一完整HTML文档[仅Opera、Safari支持][DOM2] 
      PS: 包括 <html> <head> <title> <body>元素 
        通过该方法创建的文档为'HTMLDocument'类型的实例
      'titlename'   放在<title>元素中的字符串
Element,元素节点,用于表现XML或HTML元素 
  Extend: Node 
    console.log(Element.prototype.__proto__.constructor===Node); // true 
  Feature: 
    元素节点可能的子节点: 
      Element Text Comment ProcessingInstruction 
      CDATASection EntityReference
  Proto: 
    ★元素信息 
    .tagName  元素标签名,在HTML中,标签名始终以全部大写表示 
      等价于 elem.nodeName 
      因为返回标签名的字符串存在大小写的问题,推荐的做法为统一转换为小写字符在做比较
        elem.tagName.toLowerCase() == "div";
    .childElementCount 子元素数量 [ElementTraversal]
    ★元素尺寸、位置 
      当元素中出现滚动条时: 
        Windows中: width/height包含滚动条 
        Mac中: 滚动条在未拖动时自动隐藏,无不影响 
    .clientWidth/.clientHeight 只读,width/height+padding  
      Example:  获取浏览器窗口的高和宽[视口宽高] 
        function getViewport(){
          var obj = {};
          if(document.compatMode == "BackCompat"){ // 对文档模式判断
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
    .clientLeft/.clientTop  'border-left-width'/'border-top-width'的值 
    .scrollWidth/.scrollHeight  元素内容实际大小,width/height+padding+滚动隐藏值  
      通常<html>元素是在Web浏览器的视口中滚动的元素,IE6-运行在混杂模式下时是<body>元素 
    .getBoundingClientRect()  ClientRect对象,用于获得元素相对视口的位置 [DiBs] 
      elem.getBoundingClientRect().width  元素宽
      elem.getBoundingClientRect().height 元素高
      elem.getBoundingClientRect().top    元素顶部到视口顶部的距离
      elem.getBoundingClientRect().bottom 元素底部到视口顶部的距离
      elem.getBoundingClientRect().left   元素左侧到视口左侧的距离
      elem.getBoundingClientRect().right  元素右侧到视口左侧的距离
    .scrollLeft/.scrollTop  num,读写,元素水平/垂直滚动距离 
    ★HTML标签相关 
    .innerHTML str,读写,元素标签内的所有标签及文本 [HTML5] 
      PS: 各个浏览器返回的值可能不完全一样[如是否带空格,大小写问题等] 
        在大多数浏览器中通过该方法插入<script>元素并不会执行其中的脚本
        为innerHTML设置HTML字符串后,浏览器会将其解析为相应的DOM树 
      并非所有元素都支持innerHTML属性,不支持的元素有[?]: 
        col colgroup frameset head html style table tbody thead tfoot tr
      关于常用的innerHTML属性和节点操作方法发的比较 
        在插入大量HTML标记时使用innerHTML的效率明显要高很多.
        在设置innerHTML时,会创建一个HTML解析器.
        这个解析器是浏览器级别的[C++编写],因此执行JS会快的多 
    .outerHTML str,读写,元素自身标签及其innerHTML [HTML5]
    .insertAdjacentHTML("pos","htmlStr") 在指定位置插入HTML代码 [HTML5] 
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
    .<atrName>  读写,元素特性值 
      str = elem.id  读写,元素id值 
      str = elem.className  读写,元素class特性字符串[包括空格] 
    .hasAttributes()bol, 标签中是否存在特性 
    .hasAttribute("atrName") bol,是否有指定的特性  
    .hasAttribute()  
    .getAttribute("atrName") str,获取指定特性的值,包括自定义的特性   
      Example: 
      elem.getAttribute("value") input表单中value的值 [不会实时动态的更新]
      elem.getAttribute("class/className"); 获取 class类
      elem.getAttribute("style"); 得到相应的代码字符串
      elem.getAttribute("onclick"); 得到相应的代码字符串
      IE使用class,其他浏览器使用className(?)
    .setAttribute("atrName","val") 设置特性,若存在则修改,否则创建 
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
    .removeAttribute("atrName") 删除属性及属性值 
      Example:
      elem.removeAttribute("class");
    .setAttributeNode()  将创建的特性添加到元素中
    .getAttributeNode()  获取元素的特性
    ★元素获取 
    .firstElementChild 第一个子元素 [ElementTraversal]
    .lastElementChild  最后一个子元素 [ElementTraversal]
    .previousElementSibling 前一个兄弟元素 [ElementTraversal] 
    .nextElementSibling   后一个兄弟元素 [ElementTraversal] 
    .children  所有子元素的集合 [专有扩展] 
      PS: HTMLCollection的实例;当只包含子元素节点时,children和childNodes相同
        每个子元素包含其所有的自身后代元素
        此属性不是符合W3C标准规范的属性,可以获取指定元素的子元素,
        支持的浏览器有IE5+ Firefox Safari Opera Chrome
        IE8及更早版本的children属性中会包含注释节点,IE9后则只包含元素节点
    .querySelector('selector')  后代元素中,对应的第一个元素对象 [SelectorsAPI] 
      PS: 在该元素的后代元素内查找匹配的元素,没有则为null 
      selector 可为标签、类、id等等,也可以为组合选择器如 div.wrap 
        slt 中的字符不可包含括号"()"字符
        若传入了不被支持的选择符,querySelector会抛出错误
    .closest('selector')  最近的祖先元素 [IE不支持] 
      PS: 也可以是当前元素本身;未匹配到,则返回 null
    ★元素操作 
    .scrollIntoView([bol]) 通过滚动浏览器窗口或某个容器元素使元素出现在视口中 [HTML5] 
      PS: 实际上,为某个元素设置焦点也会导致浏览器滚动并显示出该元素
      bol  默认 true
        true  让调用元素的顶部与视口顶部尽可能平齐 
        false 让调用元素尽可能全部出现在视口中,若可能的话,会使底部与底部平齐 
    .scrollIntoViewIfNeeded(bol) 将不再视口中的元素滚到到视口中,否则无操作  [专有扩展]
      当参数设置为true时,则表示尽量将元素显示在视口中部[垂直方向] 
    .insertAdjacentElement('pos',targetElem)  插入目标元素并返回 
    .remove()  删除元素 [IE不支持] 
    ★事件相关 
      .onbeforecopy 
      .onbeforecut 
      .onbeforepaste 
      .oncopy 
      .oncut 
      .onpaste 
      .onsearch 
      .onselectstart 
      .onwheel 
      .onwebkitfullscreenchange 
      .onwebkitfullscreenerror 
    ★兼容相关 
      .matchesSelector() bol,调用元素是否与该选择符匹配 [Selectors API Level 2] 
        elem.msMatchesSelector()     [IE9+]  
        elem.webkitMatchesSelector()   
        elem.mozMatchesSelector() 
      .webkitRequestFullScreen()  
      .webkitRequestFullscreen()  
    不常用 
      .slot 
      .shadowRoot 
      .assignedSlot 
      .removeAttributeNode()  
      .matches()  
      .attachShadow()  
      .insertAdjacentText()  
      .requestPointerLock()  
      .getClientRects()  
      .createShadowRoot()  
      .getDestinationInsertionPoints()  
      .animate()  
      .setPointerCapture()  
      .releasePointerCapture()  
      .hasPointerCapture()  
      .before()  
      .after()  
      .replaceWith()  
      .prepend()  
      .append()  
    命名空间相关 
      .localName 
      .namespaceURI 返回元素的命名空间,DOM4前,该API在Node接口中定义
      .prefix 
      .hasAttributeNS()  
      .getAttributeNS()  
      .setAttributeNS()  
      .removeAttributeNS()  
      .getAttributeNodeNS()  
      .setAttributeNodeNS()  
      .getElementsByTagNameNS()  
HTMLElement,HTML元素节点 
  PS: 该构造函数IE8+可访问
  Extend: Element 
    console.log(HTMLElement.prototype.__proto__.constructor===Element); // true 
  Proto: 
    ★元素信息 
    .offsetWidth/.offsetHeight   num,width/height+border+scrollbar [DiBs] 
    .offsetParent    elem,只读,最近的包含该元素的定位元素 
      PS: 若无定位元素,则为body;当元素display:none,其offsetParent为null;
    .offsetLeft/.offsetTop      num,元素外边框相对其offsetParent的内边框的距离 
      一般元素的offsetParent为其父元素
      定位元素为其相对定位的元素 
      <td>元素的offsetParent是作为其祖先元素的<table>元素 
      ..
    .tabIndex   num,当前元素的切换[Tab]序号,不存在则为-1 
    ★HTML标签及文本相关 
    .outerText  str,读写,元素及其包含的所有文本内容 [HTML5]
    .innerText  str,读写,元素中包含的所有文本内容 [HTML5] 
      PS: IE 引入的 element.innerText
        只能在body的范围内起作用
      innerText 会受样式的影响,它不返回隐藏元素的文本,但 textContent 返回.
      由于 innerText 受 CSS 样式的影响,它会触发重排(reflow),但textContent 不会.
      与 textContent 不同的是, 在 IE11=- 中对 innerText 进行修改,不仅会移除当前元素的子节点,而且还会永久性地销毁所有内部文本节点(由此导致无法再将这些被销毁的文本节点插入到当前元素或任何其他元素中).
      读取值时,它会按照有浅入深的顺序将子文档树中的所有文本拼接起来
      写入值时,则会取代元素的所有子节点
        会对文本中存在的HTML语法字符(如小于号等)进行编码转义(如&lt;)在网页中如实显示出.
    ★特性相关 
    .<atrName>  读写,元素特性值  
      PS: 只有公认的、非自定义的特性才会以属性的方式添加到DOM对象中 
    .title  有关元素的附加说明信息,一般通过工具提示条显示出来
    .contentEditable 
    .value  读写input的值,即输入框中的字符,实时动态的值
    .lang   元素内容的语言代码  [较少使用] 
    .dir    语言的方向  [较少使用]
      "ltr"   left-to-right从左至右
      "rtl"   right-to-left从右至左
    ★元素操作 
    .focus() 使元素获得焦点 
      在ios中该方法存在限制,
        直接调用失效; load、input等事件cfoo中失效,click事件cfoo中成功;
        当click中的cfoo可执行时,而通过其他方法或事件触发click,则无法获取焦点;
    .blur()  使元素失焦 
    .click() 点击元素 
    事件相关 
      .<onevents>  事件,返回相应的JS函数? 
      .onerror     见:Event 
      .onabort 
      .onblur 
      .oncancel 
      .oncanplay 
      .oncanplaythrough 
      .onchange 
      .onclick 
      .onclose 
      .oncontextmenu 
      .oncuechange 
      .ondblclick 
      .ondrag 
      .ondragend 
      .ondragenter 
      .ondragleave 
      .ondragover 
      .ondragstart 
      .ondrop 
      .ondurationchange 
      .onemptied 
      .onended 
      .onfocus 
      .oninput 
      .oninvalid  验证失败时触发 
      .onkeydown 
      .onkeypress 
      .onkeyup 
      .onload 
      .onloadeddata 
      .onloadedmetadata 
      .onloadstart 
      .onmousedown 
      .onmouseenter undefined 
      .onmouseleave undefined 
      .onmousemove 
      .onmouseout 
      .onmouseover 
      .onmouseup 
      .onmousewheel 
      .onpause 
      .onplay 
      .onplaying 
      .onprogress 
      .onratechange 
      .onreset 
      .onresize 
      .onscroll 
      .onseeked 
      .onseeking 
      .onselect 
      .onshow 
      .onstalled 
      .onsubmit 
      .onsuspend 
      .ontimeupdate 
      .ontoggle 
      .onvolumechange 
      .onwaiting 
      如 elem.onclick 等类似的事件处理程序
    不常用 
      .translate 
      .hidden 
      .accessKey 
      .draggable 
      .spellcheck 
      .isContentEditable 
      .onauxclick 
      .ongotpointercapture 
      .onlostpointercapture 
      .onpointercancel 
      .onpointerdown 
      .onpointerenter 
      .onpointerleave 
      .onpointermove 
      .onpointerout 
      .onpointerover 
      .onpointerup 
    非标 
      .runtimeStyle; 计算的样式 [仅IE6支持]
    .style    CSSStyleDeclaration,内联样式对象 
      PS: 包含着通过HTML的style特性指定的所有样式信息 
        若没有为元素设置style特性,即无嵌入样式,则style中可能会包含一些并不准确的默认值
★HTMLXXXElement,具体的HTML元素节点,继承:HTMLElement 
  待整理 
    HTMLElement  
      <abbr> <em> <acronym> <address> <b> <bdo> <big> <cite> 
      <dd> <kbd> <dfn> <strong> <noframes> <noscript> <sub> 
      <sup> <samp> <small> <var> 
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
    HTMLUnknownElement 
    HTMLTrackElement 
    HTMLTitleElement 
    HTMLTimeElement 
    HTMLTemplateElement 
    HTMLTableSectionElement 
    HTMLTableRowElement 
    HTMLTableColElement 
    HTMLTableCellElement 
    HTMLTableCaptionElement 
    HTMLSourceElement 
    HTMLSlotElement 
    HTMLShadowElement 
    HTMLQuoteElement 
    HTMLProgressElement 
    HTMLPreElement 
    HTMLPictureElement
    HTMLParamElement
    HTMLOutputElement
    HTMLOptionsCollection
    HTMLOptGroupElement
    HTMLObjectElement
    HTMLModElement
    HTMLMeterElement
    HTMLMetaElement
    HTMLMenuElement
    HTMLMarqueeElement
    HTMLMapElement
    HTMLLegendElement
    HTMLLabelElement
    HTMLLIElement
    HTMLHRElement
    HTMLFrameSetElement
    HTMLFrameElement
    HTMLFormControlsCollection
    HTMLFontElement
    HTMLFieldSetElement
    HTMLEmbedElement
    HTMLDirectoryElement
    HTMLDialogElement
    HTMLDetailsElement
    HTMLDataListElement
    HTMLDataElement
    HTMLDListElement
    HTMLContentElement
    HTMLBaseElement
    HTMLBRElement
    HTMLAudioElement
    HTMLAreaElement
    HTMLAllCollection
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
  HTMLElement,<i> <code> <dt> <tt> 
  HTMLHtmlElement,<html> 
    Extend: HTMLElement  
    Proto: 
      .version  空字符串 
  HTMLHeadElement,<head>元素  
  HTMLBodyElement,<body>元素  
  HTMLLinkElement,<link> 
    .href      读写,样式表路径 
    .disabled  
    .crossOrigin 
    .rel 
    .relList 
    .media 
    .hreflang 
    .type 
    .as 
    .referrerPolicy 
    .sizes 
    .charset 
    .rev 
    .target 
    .import 
    .integrity 
  HTMLScriptElement,<script> 
    .src 
    .type 
    .charset 
    .async 
    .defer 
    .crossOrigin 
    .text 
    .event 
    .htmlFor 
    .integrity 
    .noModule 
  HTMLStyleElement,<style> 
    .disabled 
    .media 
    .type 
  HTMLDivElement,<div>  
  HTMLSpanElement,<span> 
  HTMLAnchorElement,<a>  
    .target  
    .download  str,当下载文件时,设定下载文件默认名称   
    .ping  
    .rel  
    .hreflang  
    .type  
    .referrerPolicy  
    .text  
    .coords  
    .charset  
    .name  
    .rev  
    .shape  
    .href  
    .origin  
    .protocol  
    .username  
    .password  
    .host  
    .hostname  
    .port  
    .pathname  
    .search  
    .hash  
    .toString() 
  HTMLHeadingElement,<h1> <h2> <h3> <h4> <h5> <h6> 
  HTMLParagraphElement,<p>   
  HTMLOListElement,<ol>  
  HTMLUListElement,<ul> 
  HTMLLIElement,<li> 
  HTMLTableElement,<table> 
  HTMLFormElement,<form> 
    PS: 表单字段为表单中的元素,如input button textarea select 等等 
    .<attr> 
      .acceptCharset  服务器能够处理的字符集,对应标签'accept-charset'特性 
      .method  要发送的HTTP请求类型,对应标签'method'特性
      .action  接收请求的URL,对应标签'action'特性 
      .enctype  请求的编码类型,对应标签'enctype'特性 
      .name  表单的名称,对应标签'name'特性 
      .target  发送请求和接收响应的窗口名称,对应标签'target'特性
      .noValidate  bol,读写,将原生的表单验证关闭 
        formElem.noValidate = true;    
        原生的表单验证不完全符合需要,而且出错信息无法指定样式。
        这时,可能需要使用表单对象的noValidate属性,将原生的表单验证关闭。
        Example: 
        关闭原生的表单验证,然后指定submit事件时,让JavaScript接管表单验证
        var form = document.getElementById("myform");
        form.noValidate = true;
        form.onsubmit = validateForm;
      .autocomplete 
    .encoding 
    .elements  表单中所有控件的有序集合,HTMLCollection 
      表单字段在elements中出现的顺序和它们在标记中出现的顺序相同
      可通过下标或表单控件的name特性值索引,
      若存在多个表单控件使用相同的name,如单选按钮,则会返回一NodeList 
    .length  表单中控件的数量 
    .<fieldName>  通过表单元素中表单字段的name属性来获取表单字段 
    .submit()  提交表单,可不需提交按钮存在
    .reset()   重置所有表单域 
    .checkValidity()  bol,检测表单字段是否全部有效 
      若验证失败,则会触发一个invalid事件。
      使用该方法以后,会设置validity对象的值。
    .reportValidity()  
    事件 
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
  HTMLLabelElement,<label> 
  HTMLInputElement,<input>  
    Extend: HTMLElement  
    Proto: 
      .files  FileList, 
        <input type="file" id="file" multiple>
        document.querySelector("#file").addEventListener("change",function(e){
          console.log(this.files);
        })
      .<attr> 
        .type   str,当前字段的类型,如"checkbox"、"radio"等 
          <input> 和 <button> 的type属性可读写
          <select>元素的type属性只读
          对于<input>元素,该值等于其特性type的值,其他元素,见下表 
          说明             HTML示例                       type属性的值
          单选列表       <select>...</select>             "select-one"
          多选列表       <select multiple>...</select>    "select-multiple"
          自定义按钮     <button>...</button>             "submit"
          自定义非提交按钮 <button type="button">...</button> "button"
          自定义重置按钮 <button type="reset">...</buton>  "reset"
          自定义提交按钮 <button type="submit">...</buton> "submit"
          <input>和<button>元素的type属性是可以动态修改的,而<select>元素的type属性则是只读的
        .name   当前字段的名称
        .readOnly  bol,是否只读
        .accept  
        .alt  
        .autocomplete  
        .autofocus  
        .checked  
        .max  
        .maxLength  
        .min  
        .minLength  
        .pattern  [HTML5] 
        .placeholder  
        .required  
        .size  
        .src  
        .step  
      .validity    返回一个包含字段有效信息的对象 [详参 JS高程 430 页]
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
      .value     当前字段将被提交给服务器的值 
        对于type=file,该属性只读,包含着文件在计算机中的路径
        input、textarea、password、select等元素都可以通过value属性取到它们的值
      .willValidate = true;  开启单个表单字段验证
        对于那些不支持的浏览器(比如IE8),该属性等于undefined。
        即使willValidate属性为true,也不足以表示浏览器支持所有种类的表单验证。
        比如,Firefox 29 不支持date类型的输入框,会自动将其改为text类型,
        而此时它的willValidate属性为true。
        为了解决这个问题,必须确认input输入框的类型(type)未被浏览器改变。
        if (field.nodeName === "INPUT" && field.type !== field.getAttribute("type")) {
            // 浏览器不支持该种表单验证,需自行部署JavaScript验证
        }
      .disabled  bol,表示当前表单字段是否被禁用
      .form   只读,当前字段所属的表单
      .defaultValue  默认值
      .selectionStart num,选中字符的开始下标 
      .selectionEnd   num,选中字符的结束下标 
      .setCustomValidity() 用于自定义错误信息 
        该提示信息也反映在该输入框的 validationMessage 属性中 
        若将setCustomValidity设为空字符串,则意味该项目验证通过        
      不常用 
      .defaultChecked  
      .dirName  
      .formAction  
      .formEnctype  
      .formMethod  
      .formNoValidate  
      .formTarget  
      .height  
      .indeterminate  
      .list  
      .multiple  
      .valueAsDate  
      .valueAsNumber  
      .width  
      .validationMessage  
      .labels  
      .selectionDirection  
      .align  
      .useMap  
      .autocapitalize  
      .webkitdirectory  
      .incremental  
      .stepUp([num])     在当前数值上加num,num默认为1[HTML5]
      .stepDown([num])   在当前数值上减num,num默认为1[HTML5]
      .checkValidity()  bol,字段是否有效,判断依据为标签中添加的约束
      .reportValidity()    
      .select()    
      .setRangeText()    
      .setSelectionRange()    
      .webkitEntries  
  HTMLTextAreaElement,<textarea> 
    .autofocus  
    .cols  
    .dirName  
    .disabled  
    .form  
    .maxLength  
    .minLength  
    .name  
    .placeholder  
    .readOnly  
    .required  
    .rows  
    .wrap  
    .type  
    .defaultValue  
    .value  
    .textLength  
    .willValidate  
    .validity  
    .validationMessage  
    .labels  
    .selectionStart  num,选中字符在文本中的开始下标 [IE9+] 
    .selectionEnd    num,选中字符在文本中的结束下标 [IE9+] 
    .selectionDirection  
    .autocapitalize  
    .checkValidity()    
    .reportValidity()    
    .setCustomValidity()    
    .select()    
    .setRangeText()    
    .setSelectionRange()    
  HTMLSelectElement,<select> 
    .<attr>
      .autofocus 
      .disabled 
      .multiple  bol,是否多选 
      .size   选择框中可见的行数 
      .name 
      .required 
    .form 
    .type  "select-one"/"select-multiple",取决是否可多选 
    .length 
    .selectedOptions 
    .selectedIndex  idx,选中项索引,对于多选则只保存选中项中第一项的索引 
    .value 
    .willValidate 
    .validity 
    .validationMessage 
    .labels 
    .item()   
    .namedItem()   
    .add(newOption,relOption)  在relOption前插入新<option>元素 
    .remove(idx)     移除指定位置的选项 
    .checkValidity()   
    .reportValidity()   
    .setCustomValidity()   
    HTMLOptionsCollection===<select>.options.constructor  [继承 HTMLCollection]
      HTMLOptionsCollection.prototype.__proto__.constructor===HTMLCollection // true 
      HTMLOptionsCollection.prototype.xxx 
        options.length 
        options.selectedIndex 
        options.add()   
        options.remove()   
        options.namedItem()   
  HTMLOptionElement,<option> 
    .disabled 
    .form 
    .label 
    .defaultSelected 
    .selected  bol,读写,是否被选中 
    .value 
    .text 
    .index  当前选项在options集合中的索引 
  HTMLButtonElement,<button> 
  'formField'表单字段总结 
    change  表单值改变时触发 
      支持该事件的JS对象: fileUpload, select, text, textarea 等
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
    input文本字段 和 textarea文本框
      在其文本框中输入的内容保存在他们的value中
      text.select()  选中所有文本,会触发select事件 
      text.selectionStart  光标选中文本开始的字符下标表示 [HTML5]
        Example:  获取所选字符
          text.value.substring(text.selectionStart,text.selectionEnd);
      text.selectionEnd    光标选中文本结束的字符下标表示 
      text.setSelectionRange(startIdx,endIdx)   获取部分字符
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
  HTMLImageElement,<img>对象   
    Extend: HTMLElement 
    Instance: <img>元素 
    Proto: 
      .alt 
      .src  读写,图片地址 
      .naturalWidth/img.naturalHeight 只读,图片真实的宽/高
      .srcset 
      .sizes 
      .crossOrigin  kw,读写,
        'anonymous'  对此元素的CORS请求不设置凭据标志,一般在canvas中跨域使用图片时设置该值  
        'use-credentials'  对此元素的CORS请求设置凭证标志,即请求需提供凭据 
      .useMap 
      .isMap 
      .width 
      .height 
      .complete 
      .currentSrc 
      .referrerPolicy 
      .name 
      .lowsrc 
      .align 
      .hspace 
      .vspace 
      .longDesc 
      .border 
      .x/.y 
  HTMLCanvasElement,<canvas>[IE9+][HTML5] 
    PS: JS可对canvas图像进行像素级的操作,可直接处理图像的二进制原始数据, 
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
      if(canvas.getContext) { }
      else { }
    Proto: 
      .width 
      .height 
      .toDataURL(type,quality)  str,返回图片的'dataURI'[需将图片预先放入canvas] 
        PS: 若画布的高度或宽度是0,那么会返回字符串'data:,';
        type     str,可选,图像的MIME类型格式,默认会将图像编码为PNG格式 
          PS: 图片的分辨率为96dpi;
            若传入非'image/png',但返回的以'data:image/png'开头,则表示传入类型不支持;
          'image/png' 默认值 
          Chrome支持'image/webp'类型。
        quality  0-1,可选,设置得到图片的质量, 
          在指定图片格式为'image/jpeg'或'image/webp'时;若超出范围,默认使用 0.92 
      .getContext(keywords)   CanvasRenderingContext2D,获取上下文对象 
        '2d'
      .toBlob()   
      .captureStream()   
  HTMLAudioElement,<audio>[HTML5] 
    PS: 改变音频的src,会立即切换播放;但改变其<source>需重新加载才会切换播放
      在iOS中,调用p lay()时会弹出一个对话框,得到用户的许可后才能播放声音。
      若想在一段音频播放后再播放另一段音频,须在onfinish事件处理程序中调用 play()方法
    Extend: HTMLMediaElement 
  HTMLVideoElement,<video>[HTML5] 
    PS: 改变视频的src,会立即切换播放;但改变其<source>需重新加载才会切换播放 
    Extend: HTMLMediaElement 
    .width 
    .height 
    .videoWidth  num,当前视频本来的宽,单位px 
    .videoHeight num,当前视频本来的高,单位px 
    .poster      读写,视频预览图
    .webkitDecodedFrameCount 
    .webkitDroppedFrameCount 
    .webkitDisplayingFullscreen 
    .webkitSupportsFullscreen 
    .webkitEnterFullscreen()   
    .webkitExitFullscreen()   退出全屏 
    .webkitExitFullScreen()   
    .webkitEnterFullScreen()   
  HTMLIFrameElement,<iframe>对象  
    Extend: HTMLElement 
    Instance: 
      var frame = document.querySelector("#frameId1")   框架的DOM元素对象 
      var iframe = window.frames[iframeName]  通过'name'属性值获取框架的window对象 
        Example:
        var iframe = frames['frameName1'];
        iframe.document    框架的document对象 
    Proto: 
      .<attr>标签属性 
        .src    
        .srcdoc 
        .name   
        .width 
        .height 
        .align 
      .contentDocument  框架的document文档对象 [DOM2][IE8+] 
      .contentWindow    框架的window对象 
      .scrolling   读写,iframe的滚动条  
          iframe.scrolling = 'no'     去掉iframe的滚动条 
      .frameBorder num,iframe的边框 
          iframe.frameBorder = 0      去掉iframe的边框
      .sandbox    
      .allowFullscreen 
      .referrerPolicy  
      .longDesc     
      .marginHeight 
      .marginWidth  
      .allow        
      .getSVGDocument()  
    iframe,可在当前网页之中,嵌入其他网页 
      每个iframe元素形成自己的窗口,即有自己的window对象。
      iframe窗口之中的脚本,可以获得父窗口和子窗口。
      但是,只有在同源的情况下,父窗口和子窗口才能通信；
      若跨域,就无法拿到对方的DOM。
      比如,父窗口运行下面的命令,若iframe窗口不是同源,就会报错。
      document.getElementById("myIFrame").contentWindow.document
      // Uncaught DOMException: Blocked a frame from accessing a cross-origin frame.
      上面命令中,父窗口想获取子窗口的DOM,因为跨域导致报错。
      反之亦然,子窗口获取主窗口的DOM也会报错。
      window.parent.document.body  // 报错
      这种情况不仅适用于iframe窗口,还适用于 window.open 方法打开的窗口,
      只要跨域,父窗口与子窗口之间就无法通信。
      若两个窗口一级域名相同,只是二级域名不同,
      那么设置上一节介绍的 document.domain 属性,就可以规避同源政策,拿到DOM。
  HTMLMediaElement,HTML媒体元素   
    Extend: HTMLElement 
    Proto: 
      常量 
        .NETWORK_EMPTY     0  
        .NETWORK_IDLE      1  
        .NETWORK_LOADING   2  
        .NETWORK_NO_SOURCE 3  
        .HAVE_NOTHING       0  
        .HAVE_METADATA      1  
        .HAVE_CURRENT_DATA  2  
        .HAVE_FUTURE_DATA   3  
        .HAVE_ENOUGH_DATA   4  
      .src  str,读写,路径 
        对于<video>、<audio>推荐使用子元素<source>实现
      .autoplay   bol,读写,是否自动播放 
      .controls   bol,读写,是否显示操作控件
      .loop  bol,读写,是否应在结束时再次播放
      .paused   bol,读写,是否暂停播放
      .currentTime   num,读写,当前播放时长,单位s  
      .duration    num,读写,时长,单位s  
        在加载完音频/视频前,获取不到,返回NaN,往往和canplay事件配合使用
      .playbackRate   num,读写,播放速度,1.0 为正常速度
      .volume   num,读写,音量,范围 0-1 
      .muted    bol,读写,是否关闭声音
      .defaultPlaybackRate    读写,默认播放速度
      .defaultMuted    读写,默认是否静音
      .ended    bol,播放是否已结束
      .currentSrc   str,当前媒体的URL
      .networkState   当前网络状态 
      .preload       读写,预加载状态  
        auto 
        metadata 
        none 
      .error        MediaError,错误对象
      .buffered     TimeRanges,已缓冲部分对象 
      .played       TimeRanges,视频已播放部分对象
      .seekable     TimeRanges,视频可寻址部分的对象
      .textTracks   TextTrackList,可用文本轨道对象
      .readyState   视频当前的就绪状态  
      .seeking      bol,用户是否正在视频中进行查找
      .controlsList  
      .crossOrigin  
      .mediaKeys   
      .onencrypted  
      .onwaitingforkey  
      .srcObject  
      .sinkId  
      .remote  
      .disableRemotePlayback  
      .canPlayType(type)  str,检测编解码器的支持情况  
        PS: 返回值为: ''、"maybe"或"probably" 
          若浏览器无法播放该格式,返回空字符串""
          若浏览器认为有可能播放该格式,返回"maybe"
          若浏览器认为能够播放改格式,返回"probably"
        type  资源格式 
        Example:
        video.canPlayType("video/ogg")
        只传入一个短形式的格式,只可能得到""或"maybe"
        video.canPlayType('video/ogg; codecs="theora,vorbis"')
        若传入带编解码的具体类型,就可能达到到""、"maybe"或"probably"作为答案
      .load()        重新载入音频 
      .play()        播放 
      .pause()       暂停 
      .addTextTrack()  添加新的文本轨道
      .setSinkId()    
      .captureStream()    
      .webkitAudioDecodedByteCount  
      .webkitVideoDecodedByteCount  
FileList,File对象集合,表示用户选择的文件列表[HTML5] 
  PS: HTML5中[通过添加multiple属性],input[file]内能一次选中多个文件, 
    控件内的每一个被选择的文件都是一个file对象,而FileList对象是file对象的列表
    HTML4中,file控件内只能选中一个文件 
  Extend: Object 
    console.log(FileList.prototype.__proto__.constructor===Object); // true 
  Proto: 
    .length 
    .item(idx) File,文件 
File,文件 
  Extend: Blob 
    console.log(File.prototype.__proto__.constructor===Blob); // true 
  Proto: 
    .name  本地文件系统中的文件名 
    .lastModified  
    .lastModified   文件的上次修改时间,格式为时间戳。
    .lastModifiedDate   文件上一次被修改的时间,格式为Date对象实例 [仅Chrome支持]
    .webkitRelativePath  
MediaError,媒体错误对象 
  Extend: Object 
  Static: 
    .MEDIA_ERR_ABORTED           1  
    .MEDIA_ERR_NETWORK           2  
    .MEDIA_ERR_DECODE            3  
    .MEDIA_ERR_SRC_NOT_SUPPORTED 4  
  Proto: 
    .code     错误码 
    .message  
    常量 
      .MEDIA_ERR_ABORTED 1 
      .MEDIA_ERR_NETWORK 2 
      .MEDIA_ERR_DECODE  3 
      .MEDIA_ERR_SRC_NOT_SUPPORTED 4 
TimeRanges, 
  Extend: Object 
  Proto: 
    .length 
    .start()  
    .end()  
TextTrackList, 
  Extend: EventTarget 
  Proto: 
    .length 
    .onchange 
    .onaddtrack 
    .onremovetrack 
    .getTrackById() 
Image,img元素 
  PS: 不用插入到DOM中即可加载图片资源  
  Relate: Image.prototype===HTMLImageElement.prototype  
  Instance: img = new Image();   创建图像DOM对象  
Option,option元素 
  Relate: Option.prototype===HTMLOptionElement.prototype 
  Instance: 
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
Audio,audio元素 
  Relate: Audio.prototype===HTMLAudioElement.prototype 
  Instance: 
    Example: 
    var audio = new Audio("./sound.mp3");
      不用插入到文档中,即可加载音频资源 
    audio.addEventListener("canplaythrough",function(e){
    this.play();
  })
Attr,属性节点 
  PS: 元素的特性在DOM中以Attr类型表示,不被认为是DOM文档树的一部分 
  Extend: Node 
    console.log(Attr.prototype.__proto__.constructor===Node); // true 
  Proto: 
    .namespaceURI 
    .prefix 
    .localName 
    .name   与nodeName的值相同
    .value  与nodeValue的值相同
    .specified bol,用于区别特性是自行添加的还是默认的 
    .ownerElement 
  Feature: 
    子节点: 
      HTML中不支持[没有]子节点;
      XML中可以为 Text 或 EntityReference
DocumentType,文档类型表示[DiBs] 
  PS: 父节点为document;无子节点; 
  Extend: Node 
    console.log(DocumentType.prototype.__proto__.constructor===Node); // true 
  Proto: 
    .name     str,文档类型的名称,'html'/"HTML"
    .remove()  
    .before()  
    .after()  
    .replaceWith()  
    不常用: 
      .publicId  获取HTML5之前的doctype声明中的部分信息 [DOM2]
      .systemId  获取HTML5之前的doctype声明中的部分信息 [DOM2]
DocumentFragment,'document fragment'文档片段类型 
  PS: 一种 "轻量级"的文档,可包含和控制节点,但不会像完整的文档那样占用额外的资源 
    不能把文档片段直接添加到文档中,但可将其作为一个"仓库"来使用,
    即可以在里面保存将来可能会添加到文档中的节点.
    若将文档中的节点添加到文档片段中,就会从文档树中移除该节点.
    添加到文档片段中的新节点同样也不属于文档树.
    可以通过 appendChild 或 insertBefore 将文档片段中内容添加到文档中,
    将文档片段作为参数传递给这两个方法时,则会将其所有子节点添加到文档中.
    在所有节点类型中,只有 DocumentFragment 在文档中没有对应的标记 
  Extend: Node 
    console.log(DocumentFragment.prototype.__proto__.constructor===Node); // true 
  Proto: 
    .children 
    .childElementCount [ElementTraversal]
    .firstElementChild [ElementTraversal]
    .lastElementChild  [ElementTraversal]
    .getElementById()  
    .querySelector()  
    .querySelectorAll()  
    .prepend()  
    .append()  
  Feature: 
    子节点可以是: 
      Element ProcessingInstruction Text
      Commnet CDATASection EntityReference
  Expand: 
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
CharacterData, 
  Extend: Node 
    console.log(CharacterData.prototype.__proto__.constructor===Node); // true 
  Proto: 
    .length  字符数量,等价于 nodeValue.length 或 data.length
    .data  读写文本,等价于nodeValue 
      在修改文本节点时,字符串会经过HTML[或XML,取决于文档类型]编码
      Example: 
      div.firstChild.nodeValue = "Some <strong>other</strong> message";
      // 输出结果是"Some &lt;strong&gt;other&lt;/strong&gt; message" 
    .previousElementSibling [ElementTraversal] 
    .nextElementSibling     [ElementTraversal] 
    .substringData(offset,num)   返回从offset位置开始的num个字符串
    .appendData(tex1)  将tex1添加到节点的末尾
    .insertData(offset,tex1)  在offset的位置插入tex1
    .deleteData(begin,num)  从begin的位置开始删除num个字符
    .replaceData(offset,num,tex1)  用tex1替换从offset的位置后到的num个文本
    .remove() 
    .before() 
    .after() 
    .replaceWith() 
Text,文本节点 
  PS: 无子节点; 文本中可以包含转义后的HTML字符,但不能包含HTML代码 
  Extend: CharacterData 
    console.log(Text.prototype.__proto__.constructor===CharacterData); // true 
  Proto: 
    .wholeText 
    .assignedSlot 
    .Text()  
    .splitText(idx)  分割文本节点,从指定位置将当前文本节点分成两个文本节点 
    .getDestinationInsertionPoints()  
  Feature: 
    元素节点和文本节点的关系 
      Example: :
      <div></div>  <!-- 没有内容,没有文本节点 -->
      <div> </div>  <!-- 有空格,有一个文本节点 -->
      <div>hello word</div>  <!-- 有内容,有一个文本节点 -->
        该文本节点为元素节点的第一个子节点
        var tex = div.firstChild;
Comment,注释节点  
  PS: 不支持[没有]子节点 
  Extend: CharacterData 
    console.log(Comment.prototype.__proto__.constructor===CharacterData); // true 
HTMLCollection,元素集合[顺序为文档流中的顺序] 
  PS: 动态的,随着DOM的改变会相应的变化 
  Extend: Object 
    console.log(HTMLCollection.prototype.__proto__.constructor===Object); // true 
  Instance: 
    HTMLCollection===document.anchors.constructor
    HTMLCollection===document.applets.constructor
    HTMLCollection===<elem>.getElementsByTagName('').constructor 
    HTMLCollection===<elem>.getElementsByClassName('').constructor 
    
    document.anchors 具有name特性的所有<a>元素 
    
    document.applets 所有<applet>元素 [已几乎不用了]  
    document.getElementsByTagName('tagName') 
      *  表示获取页面所有元素 
    document.getElementsByClassName('clsName') [HTML5][IE9+] 
    <elem>.getElementsByTagName("tagName")  通过元素名获取元素集合 
    <elem>.getElementsByClassName('clsName'[,parent]) 通过类名获取元素集合[HTML5][IE9+]
      clsName  str,若干个类名的字符串,类名间用空格隔开,无顺序影响 
      Example:  
      获取所有包含"user"和"name"类的元素 
      var aoo =document.getElementsByClassName("user name");
  Proto: 
    .length      num,集合成员数量
    .item(idx)   或使用[idx]访问
    .namedItem() 通过name属性值索引 
    collection[idx/str] 
      在[]中传入数值,则后台就会调用 .item() 方法
      []中也可传入字符串,则调用 .namedItem() 方法
NodeList,节点集合 
  PS: NodeList 是动态实时的,DOM 改变后 NodeList 也会变化 
  Extend: Object 
    console.log(NodeList.prototype.__proto__.constructor===Object); // true 
  Instance: 
    NodeList===<node>.childNodes.constructor  
    NodeList===<elem>.querySelectorAll("abc").constructor 
    <node>.childNodes  一组有序的各种类型的子节点 
      cNodes  成员可为元素节点、文本节点、注释或处理指令等 
        且不同的浏览器返回值不一定相同 [?]  
    document.getElementsByName("nameVal")  通过name属性值获取元素节点集合 
      PS: 一般用于获取单选按钮 
        IE中若该元素本身不包括name属性[但自行添加了],获取时会获取不到
      nameValue  name属性的值 
    document.querySelectorAll("selector")  获取元素节点集合 [SelectorsAPI]
    <elem>.querySelectorAll("selector")  后代元素中,对应的元素集 [SelectorsAPI]
      返回值为一个"静态"不会自动更新,只包含元素的NodeList,无匹配项则为空 NodeList
      可通过下标或 item() 方法来获取单个元素
  Proto: 
    .length  
    .item(idx)  访问节点,也可通过[idx]下标法
    .entries()    
    .forEach()    
    .keys()    
    .values()    
NamedNodeMap,元素节点当前具有的特性节点集合 
  PS: 是一个"动态"集合;IE7及之前会返回元素所有可能的节点  
  Extend: Object 
    console.log(NamedNodeMap.prototype.__proto__.constructor===Object); // true 
  Instance: <elem>.attributes 
  Proto: 
    .length    属性节点个数 
    .item(idx)/[idx]下标法   Attr,特性节点 
      设置元素的id值
      atrs["id"].nodeValue = "xxx";
    .getNamedItem(str)    返回nodeName为str的节点 
      获取元素的id值 
      var id = atrs.getNamedItem("id").nodeValue;
    .setNamedItem(atr)    向列表中添加atr属性节点
    .removeNamedItem(str) 从列表中移除nodeName为str的节点并返回 
    命名空间相关 
      .getNamedItemNS()  
      .setNamedItemNS()  
      .removeNamedItemNS()  
DOMStringMap,标签自定义属性 [HTML5] 
  PS: 'data-xxx'是HTML5规定为元素添加非标准的属性的格式 
    目的是为元素提供与渲染无关的信息或提供语义信息
  Extend：Object 
    console.log(DOMStringMap.prototype.__proto__.constructor===Object); // true 
  Instance: <elem>.dataset 
  Proto: 
    .xxx   str,读写,元素自定义属性的值 
    delete elem.dataset.xxx  str,删除指定自定义属性的值 
  Expand: 
    IE下HTML标签自定义属性 
      elem.<attrName> 方式来获取[仅IE支持该方式]
      elem.getAttribute("attrName") 来获取
      Example:
        定义div标签的abc属性,值为aaa
        <div abc="aaa">123</div>
  Example: 
    <div id="div" data-aoo="aaa" data-boo="bbb"></div>
    var div = document.querySelector("#div");
    div.dataset.aoo = 'abc';  // 修改 data-aoo 
    delete div.dataset.boo;  // 删除 data-boo 
DOMTokenList,元素class的集合类[HTML5] 
  PS: Firefox 和 Chrome 支持该属性 
  Extend: Object 
    console.log(DOMTokenList.prototype.__proto__.constructor===Object); // true 
  Instance: <elem>.classList 
  Proto: 
    .length   num,获取class的个数 
    .contains('className')  bol,是否包含指定class  
    .item(idx) 或[idx]下标法  获取成员 
    .value 
    .add('className')     将指定类加到元素的类列表中 
      若存在该类,则不添加,否则添加 
    .remove('className')  从类列表中删除指定类,若存在则删除,否则无动作 
    .toggle('className')  元素列表中若有该类则删除,没有则加上
    .supports() 
    .toString() 
    .entries() 
    .forEach() 
    .keys() 
    .values() 
StyleSheetList,样式表集合 
  PS: 按照结构依次为: 样式表集-样式表-规则集-规则-声明 
  Extend：Object 
    console.log(StyleSheetList.prototype.__proto__.constructor===Object); // true  
  Proto: 
    .length 
    .item(idx)  CSSStyleSheet,一张样式表 
CSSStyleSheet,一张样式表 
  Extend: StyleSheet 
    console.log(CSSStyleSheet.prototype.__proto__.constructor===StyleSheet); // true 
  Instance: 
    <link>.sheet.constructor  <link>元素引入的样式表对象 
    <link>.stylesheet; // IE的方法
    <style>.sheet.constructor <style>元素引入的样式表对象 
    <style>.stylesheet; // IE的方法
  Proto: 
    .ownerRule  若样式表是通过'@import'导入的,则指向导入的规则;否则,值为null [IE不支持]  
    .insertRule(ruleStr,idx) 向样式表中插入一条规则 [IE9+] 
      ruleStr CSS规则字符串
      idx     插入的位置
      Example: 
      document.styleSheets[0].insertRule('#block { color:white }', 0);
    .addRule(ruleStr,idx)    向样式表中插入一条规则 [IE9-]
    .deleteRule(idx) 从样式表中删除一条规则 [IE9+] 
      Example:document.styleSheets[0].deleteRule(0); // 删除样式表中的第一条规则
    .removeRule(idx) 从样式表中删除一条规则 [IE9-] 
    .cssRules CSSRuleList,样式表CSS规则集[IE9+]  
    .rules    CSSRuleList,样式表CSS规则集[IE9-] 
      兼容写法 
      var sheet = document.styleSheets[0];
      var rules = sheet.cssRules||sheet.rules;
      var rule1 = rules[0];
      rule1.style.color ='red';
StyleSheet,样式表 
  Extend: Object 
    console.log(StyleSheet.prototype.__proto__.constructor===Object); // true 
  Proto: 
    .type  str,样式表类型,通常是'text/css' 
    .href  str,只读,样式表链接地址,否则为 null  
    .ownerNode   所在的DOM节点,通常是<link>或<style> 
      若当前样式表由'@import'导入的,则该值为 null;IE不支持这个属性 
    .title  str,所在节点的的title属性值 
    .parentStyleSheet 在当前样式表是通过'@import'导入的情况下,该属性为指向导入它的样式表的指针 
      因为CSS的@import命令允许在样式表中加载其他样式表,就有了parentStyleSheet属性,
      它返回包括了当前样式表的那张样式表.
      若当前样式表是顶层样式表,则该属性返回null
    .media  当前样式表支持的所有媒体类型的集合 
      如果集合是空列表,表示样式表适用于所有媒体 
      在IE中,media是一个反映<link>和<style>元素media特性值的字符串
    .disabled  bol,读写,是否禁用样式表,值为true或disabled 
CSSRuleList,样式表CSS规则集 
  Extend: Object 
    console.log(CSSRuleList.prototype.__proto__.constructor===Object); // true 
  Proto: 
    .length 
    .item(idx)  CSSStyleRule,一条CSS规则,包括两个部分: CSS选择器和样式声明  
CSSStyleRule,一条CSS规则 
  Extend: CSSRule  
    console.log(CSSStyleRule.prototype.__proto__.constructor===CSSRule); // true 
  Proto: 
    .selectorText  str,当前规则的选择器文本 
      Example:document.styleSheets[0].cssRules[0].selectorText; // ".myClass"
    .style         CSSStyleDeclaration,规则的声明部分 
CSSRule,CSS规则 
  Extend：Object 
    console.log(CSSRule.prototype.__proto__.constructor===Object); // true 
  Proto: 
    .parentStyleSheet  当前规则的所属的样式表对象 [IE不支持]
    .parentRule  若规则是导入的,则该属性即导入规则,否则,为 null [IE不支持该属性] 
    .type     num,规则类型的常量值,对于样式规则为1 [IE不支持]
    .cssText  str,当前规则的字符串 
    常量 
      .STYLE_RULE      1 
      .CHARSET_RULE    2 
      .IMPORT_RULE     3 
      .MEDIA_RULE      4 
      .FONT_FACE_RULE  5 
      .PAGE_RULE       6 
      .KEYFRAMES_RULE  7 
      .KEYFRAME_RULE   8 
      .NAMESPACE_RULE  10 
      .SUPPORTS_RULE   12 
CSSStyleDeclaration,CSS规则的声明  
  Extend: Object 
    console.log(CSSStyleDeclaration.prototype.__proto__.constructor===Object); // true 
  Instance: 
    getComputedStyle(<elem>,str/null) 计算后的样式对象[IE9+][DOM2] 
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
  Proto: 
    .parentRule 当前规则声明的CSS规则 
    .xx   str,读写内联样式 
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
    .cssText  str,读写,整个'style'属性中的CSS代码[DOM2] 
      elem.style.cssText ='background-color:red;'+'border:1px solid black;';
    .length   num,应用给元素的CSS属性的数量[DOM2]  
    .cssFloat 
    .item(idx)  str,指定位置的属性名称,或使用[idx]形式
    .getPropertyValue('propName') str,返回指定属性的字符串值
    .getPropertyPriority('propName') str,返回优先级声明,存在为"important",否则为""
    .setProperty('propName','value',"!import"/"")  设置属性及值,并加上"!important"或""
    .removeProperty('propName')  删除指定属性 
    不常用 
      .animationPlayState
    兼容性相关  
      .webkitAnimationPlayState 
        animation-play-state属性可以控制动画的状态,暂停/播放,需加上浏览器前缀
        "paused"    暂停
        "running"   播放
    .getPropertyCSSValue(属性名)  CSSValue, [Chrome不支持]
FormData,表单模拟 [HTML5] 
  DefDec: 序列化表单,模拟出表单所提交的数据,从而使用AJAX提交  
  PS: 当xhr发送FormData数据时,xhr能自动识别数据类型并配置适当头信息  
  Extend：Object 
    console.log(FormData.prototype.__proto__.constructor===Object); // true 
  Instance: 
    fd = new FormData([formElem]) 创建FormData对象 
      formElem  可选,<form>元素 
    Example: 通过表单元素创建
    var fd = new FormData(document.forms[0]);
  Proto: 
    .append(key,val ,name?)    向fd中添加字段 
      PS: 当信息添加完后就可直接使用'xhr.send(fd)'进行发送 
      key   数据键名  
      val   数据值  
      name  可选,通常是文件名 
    .delete() 
    .get() 
    .getAll() 
    .has() 
    .set() 
    .keys() 
    .values() 
    .forEach() 
    .entries() 
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
NodeIterator,遍历[DOM2][JS高程 326 页] 
  Extend: Object 
    console.log(NodeIterator.prototype.__proto__.constructor===Object); // true 
  Proto: 
    .root 
    .referenceNode 
    .pointerBeforeReferenceNode 
    .whatToShow 
    .filter 
    .nextNode()   
    .previousNode()   
    .detach()   
TreeWalker,遍历[DOM2][JS高程 330 页] 
  Extend: Object 
    console.log(TreeWalker.prototype.__proto__.constructor===Object); // true 
  Proto: 
    .root  
    .whatToShow  
    .filter  
    .currentNode  
    .parentNode()  
    .firstChild()  
    .lastChild()  
    .previousSibling()  
    .nextSibling()  
    .previousNode()  
    .nextNode()  
Range,范围[DOM2][JS高程 332 页]  
  Extend: Object 
    console.log(Range.prototype.__proto__.constructor===Object); // true 
  Proto: 
    常量 
      .START_TO_START 0  
      .START_TO_END   1  
      .END_TO_END     2  
      .END_TO_START   3  
    .startContainer  
    .startOffset  
    .endContainer  
    .endOffset  
    .collapsed  
    .commonAncestorContainer  
    .setStart()    
    .setEnd()    
    .setStartBefore()    
    .setStartAfter()    
    .setEndBefore()    
    .setEndAfter()    
    .collapse()    
    .selectNode()    
    .selectNodeContents()    
    .compareBoundaryPoints()    
    .deleteContents()    
    .extractContents()    
    .cloneContents()    
    .insertNode()    
    .surroundContents()    
    .cloneRange()    
    .detach()    
    .isPointInRange()    
    .comparePoint()    
    .intersectsNode()    
    .getClientRects()    
    .getBoundingClientRect()    
    .createContextualFragment()    
    .expand()    
    .toString()    
Selection,网页中选中的内容对象[HTML5][IE9+] 
  PS: 可通过连接一个空字符串"" 或使用 toString() 方法,获取文本字符串, 
    当该对象被传递给期望字符串作为参数的函数中时,如 window.alert 或 document.write,
    对象的 toString() 方法会被自动调用,而不用手动转换.
  Extend: Object 
  Instance: window.getSelection() 
  Proto: 
    .anchorNode     选区起点所在的节点
    .anchorOffset   在到达选区起点位置之前跳过的anchorNode中的字符数量
    .focusNode      选区终点所在的节点
    .focusOffset    focusNode中包含在选区之内的字符数量 
    .isCollapsed    bol,表示选区的起点和终点是否重合 
    .rangeCount     选区中包含的DOM范围的数量 
    .type 
    .baseNode 
    .baseOffset 
    .extentNode 
    .extentOffset 
    .getRangeAt(index) 返回索引对应的选区中的DOM范围 
    .addRange(range)   将指定的DOM范围添加到选区中
    .collapse(node,offset)   将选区折叠到指定节点中的相应的文本偏移位置 
    .collapseToEnd()        将选区折叠到终点位置 
    .collapseToStart()     将选区折叠到起点位置 
    .containsNode(node)  确定指定的节点是否包含在选区中 
    .deleteFromDocument()  从文档中删除选区中的文本
    与document.execCommand("delete", false, null)命令的结果相同 
    .removeRange()    
    .removeAllRanges() 从选区中移除所有DOM 范围,实际上,这样会移除选区,因为选区中 至少要有一个范围 
    .empty()    
    .setPosition()    
    .extend(node, offset) 通过将focusNode 和focusOffset 移动到指定的值来扩展选区 
    .setBaseAndExtent()    
    .selectAllChildren(node) 清除选区并选择指定节点的所有子节点 
    .modify()    
    .toString() str,选区所包含的文本内容 
    .reomveRange(range)   从选区中移除指定的DOM范围 [Chrome不支持]
DOMStringList, 
  .length  
  .item()    
  .contains(key)   bol,是否包含该成员  
XML相关 
  ProcessingInstruction [继承 CharacterData] 
  CDATASection 类型: 针对基于XML的文档,表示CDATA区域 
    与Comment类似;继承自Text类型;无子节点 
  EntityReference 
  XML命名空间: 不同XML文档的元素就可混合在一起,共同构成格式良好的文档,而不必担心发生命名冲突
    HTML不支持XML命名空间,但XHTML支持XML命名空间 
相关规范 
  'ElementTraversal'元素遍历规范 [IE9+]
    对于元素间的空格,IE9及之前版本不会返回文本节点,
    而其他浏览器都会返回文本节点,导致使用childNodes firstchildNodes等属性不一致
    为了弥补这一差异,同时保持DOM规范不变,ElementTraversal 规范新定义了一组属性
  'Selectors API'由W3C发起制定的一个标准,致力于让浏览器原生支持CSS查询 
    Selectors API Level 1  [IE8+] 
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
  控制网页http请求,如<script>的src需指定域名才可加载 
    案例: 使用百度收藏 收藏知乎的网页失败 


