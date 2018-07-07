HTML'Hyper Text Markup Language'超文本标记语言 
  'markup language'标记语言: 通过使用一套标记标签'markup tag'来描述网页 
  Web浏览器读取HTML文档,以网页的形式显示,用标签来解释页面的内容;
  XHTML: 一个过渡技术,结合了部分XML的强大功能及大多数HTML的简单特性 
  2000 年底,W3C发布XHTML1.0 版本,是一种在HTML 4.0 基础上优化和改进的的新语言 
语法规则 
  文档结构 
    所有的网页文件,通常有四对标记来构成文档的骨架
    <html> <!-- 标识网页文件的开始与结束,所有html元素都要放在这对标记中 -->
    <head> <!-- 标识网页文件的头部信息,如标题、搜索引擎关键字等 -->
      <title> 标题 </title> <!-- 标识网页文件的标题  -->
    </head>
    <body> <!-- 表示网页文件的主体部分 -->
    </body>
    </html>
  <tag/>标签: 也叫标记、元素,用于浏览器识别 
    PS: 标签大小写不敏感['<p>'等同于'<P>'],推荐使用小写;
      HTML元素指从开始标签'start tag'到结束标签'end tag'的所有代码;
    双标记: <tag>内容</tag>
    单标记: <tag/>
      也叫自闭合'self-closing'标签,如:img input br hr 等;
    标记的属性: <tag attr1='参数1' attr2='参数2' ...>内容</tag> 
      属性为HTML元素提供附加信息,小写字母,值用引号括起来[双引号或单引号但须成对使用];
      HTML5中,属性值可不加引号,除了有空格等特殊情况;
      某些个别的情况下,比如属性值本身就含有双引号,则必须使用单引号,
      如 name=‘Bill“hellwoword”Gates’;
    标签内容 
      字符开头的空格,不论多少都不显示,代码中所有连续的空格或空行都会被算作一个空格;
  其他 
    <!-- 注释内容  -->
    只对IE生效的注释 
      <!--[if lt IE 7]>
        <link rel="stylesheet" type="text/css" media="screen" href="path/to/ie.css" />
      <![endif]-->
        这些代码的意思是:若用户浏览器是IE6及以下,那这段代码才会生效。
        若你想把IE7也包含进来,那么就把“[if lt IE 7]”改为“[if lte IE 7]”。
  浏览器解析HTML方式 
    PS:一个不含任何DOCTYPE的网页将会以'quirks'怪异模式渲染 
      HTML5提供的<DOCTYPE html>是标准模式,向后兼容的,等同于开启了标准模式;
      IE6开始区分标准模式和混杂模式也叫怪异模式,主要是看文档的声明.
      如去掉html文档中的声明则进入怪异模式
    standards mode,标准模式: 按照HTML与CSS的定义渲染
    quirks mode,怪异模式: 尝试模拟更旧的浏览器的行为 
    参见 document.compatMode 和 document.documentMode 
  自我设定 
    标签使用'tag'表示,属性使用'attr'表示,布尔值属性用'prop'表示
--------------------------------------------------------------------------------
◆标签&属性 
声明类 
  <！DOCTYPE>   声明
    PS: HTML文档的第一行,非HTML标签,告知浏览器页面使用的HTML版本;
      没有结束标签,对大小写不敏感
      请始终向HTML文档添加<！DOCTYPE>声明,这样浏览器才能获知文档类型.
    文档模式 
      IE8引入的一个新的概念叫"文档模式",
      文档模式决定了可以使用什么功能,以及如何对待文档类型'doctype'
      标准模式与兼容模式的区别:  
      标准模式的排版和JS运作模式都是以该浏览器支持的最高标准运行.
      在兼容模式中,页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作.
      简单的说,就是尽可能的显示能显示的东西给用户看.
    HTML 4.01 中 
      DOCTYPE文档类型,用于引入DTD[说明当前html版本],告知浏览器解析器HTML的文档标准.
      DOCTYPE不存在或格式不正确会导致文档以兼容模式[怪异模式]呈现.
      HTML4.01基于SGML,<！DOCTYPE>声明需引用DTD告知浏览器文档所使用的文档类型
      DTD规定了标记语言的规则,这样浏览器才能正确地呈现内容 
      DTD全称 “Document Type Definition” 即文档类型定义,W3C所发布的一个文档类型定义,
      源于XML规范,用于定义当前文档中的元素、元素的属性、元素之间的结构关系等基本规则.
      在HTML4.01中有3种<！DOCTYPE>声明.在HTML5中只有一种.
    HTML5声明: <!doctype html> 
      HTML5不基于SGML,不需要对DTD进行引用,
      但是需要doctype来规范浏览器的行为,让浏览器按照它们应该的方式来运行 
    常用的DOCTYPE声明 
      HTML4.01 Strict 
      HTML4.01 Transitional 
      HTML4.01 Frameset 
      HTML5 使用 <!DOCTYPE html>
  <html>  根标签,所有的网页标签都在其中 
    PS: 高度默认为0,定义height:100%;则会将网页占满;背景色会向上渲染将整个浏览器铺满
    manifest="cache.manifest"  定义使用的离线文件 [HTML5]  
  <head>  用于定义文档的头部,所有头部元素的容器 
    子元素包括: 
      <meta/>
      <title/> 
      <style/> 
      <link/> 
      <script/> 
      ... 
  <meta/>  页面'meta-information'元信息设置  
    PS: 放置于<head>间,元数据不会显示在页面上,但是对于机器是可读的 
      作用: 对网页进行说明‹如便于搜索引擎查找› 
      content用于定义与指定属性相关的元信息
    http-equiv="KW"    把'content'关联到HTTP头 
      <meta http-equiv="content-type" content="‹KW›"/>
        text/html;charset=UTF-8  
      <meta http-equiv="expires" content="‹num|时间›"/>   
        DefDec: 设置缓存头信息,缓存时长 
        ‹num›  过期时间,单位:s 
          为0时表示不缓存,方便代码调试
        Example: <meta http-equiv="expires" content="31 Dec 2008">
      <meta http-equiv="cache-control" content="‹KW›"/>  
        no-siteapp  禁止搜索引擎转码 
          如通过百度打开网页时,百度可能会对网页进行转码,贴上广告,可通过该meta禁止百度转码
      <meta http-equiv="pragma" content="‹KW›"/>  
        DefDec: 代理服务器缓存设置 
        no-cache  禁止页面缓存 
      <meta http-equiv="set-cookie" content="name=value; expires=date; path=url"> 
        DefDec: 在客户端存储 cookie,web 浏览器的客户端识别 
      <meta http-equiv="refresh" content="‹num›" URL="‹url›">  
        DefDec: 定时跳转或刷新 
        ‹num›  指定跳转的时间间隔,单位:s 
        ‹url›  可选,跳转的目标地址,默认:当前地址 
      <meta http-equiv="x-ua-compatible" content="xxx"/> 
        DefDec: 网页的兼容性模式设置 
        PS: IE8新加的设置,IE8-则不识别 
          该方式设置优先级高于通过HTTP Header指定 
          'X-UA-compatible'标头不区分大小写 
          但必须在网页中除 title 和其他 meta 以外的所有其他元素前,否则不起作用  
        IE=7     IE中,以IE7引擎来渲染页面<无论是否DTD声明文档标准> 
        IE=edge  IE中,以最高版本IE来渲染页面 
        IE=Edge,chrome=1 IE中,以最高版本渲染页面,且激活Chrome Frame 
      <meta http-equiv="x-dns-prefetch-control" content="off"> 
        DefDec: 通过设置为 “off” 完全退出 DNS 预取 
      <meta http-equiv="window-target" content="_value"> 
        DefDec: 指定要显示在一个特定框架中的页面 
      清除缓存
      <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
      <meta http-equiv="Pragma" content="no-cache" />
      <meta http-equiv="Expires" content="0" />
    name="KW"          把'content'关联到一个名称 
      <meta name="viewport" content="KW1,KW2..."> [HTML5]
        DefDec: 视口设置 ›
        PS: Viewport指的是网页的显示区域,即不滑动滚动条时,可看到的部分网页大小 
          当网页宽大于视口宽时,默认会出现滚动条,而设置视口宽为网页时则可以刚好显示所有 
        width=device-width|‹px›         视口宽 
          // device-width 设备宽 
        ,height=device-height|‹px›      视口高 
          // device-height 设备高  
        ,initial-scale=<float>          初始缩放比例 
          // 范围: 0.01-10 
        ,maximum-scale=<float>          最大缩放比例 
        ,minimum-scale=<float>          最小缩放比例 
        ,user-scalable=‹KW›             是否允许用户缩放 
          // KW: yes | no 
        ,target-desitydpi=‹KW›|<float>  像素密度  
          KW: 
            device-dpi // 设备默认像素密度 
            height-dpi // 高像素密度 
            medium-dpi // 中像素密度 
            low-dpi    // 低像素密度 
      <meta name="referrer" content="‹KW›"> 
        DefDec: 控制http请求头中的referrer 
        'never'     不发送referrer[删除http头中的referer]  
        'always'    始终发送referrer 
          不改变http header 中的 referer 的值
          即使当前页使用https协议,且加载资源使用http,加载资源的请求头中仍带referer
        'origin'    只发送origin部分
        'default'   若前页面使用https,而加载资源使用http,则不发送referrer
      <meta name="description" content="描述1,描述2..."> 
        页面的简短描述,限制150字符,
        使用','分割多个描述词 
        有时该描述被用作搜索结果展示片段的一部分 
      <meta name="keywords" content="关键词1,关键词2..."> 
        页面关键词设置  
      <meta name="author" content="<作者名>"> 
        DefDec: 设置作者 
      <meta name="generator" content="<KW>"/>
        DefDec: 代码生成软件说明,表示该文件使用什么软件生成的 
        Notepad2  
        ... 
      <meta name="robots" content="kw1,kw2...">   
        DefDec: 定义网页搜索引擎索引方式 
        none       
        noindex    
        nofollow   
        index      
        follow     
        Example: 'index,follow'  表示所有搜索引擎        
        取值如下：
      <meta name="application-name" content="应用名称">    
        DefDec: Web应用名称,仅当网站被用作为一个应用时才使用 
      <meta name="revised" content="">  
      ★移动端相关 
      <meta name="format-detection" content="kw1,kw2,..."> 
        DefDec: 如何显示电话号码,如将电话显示为超链接 
        'telephone=no'  禁用电话号码识别  
        'email=no'      禁用email识别 
      <meta name="mobile-agent" content="format=html5;url=http://m.baidu.com">
        DefDec: 若在手机上打开该网站,则转到'm.baidu.com' 
      <meta name="renderer" content="webkit"> 
        DefDec: 启用360浏览器的极速模式[webkit] 
        'webkit'   极速模式 
        'ie-comp'  IE兼容内核 
        'ie-stand' IE标准内核 
      <meta name="HandheldFriendly" content="true"> 
        DefDec: 针对手持设备优化,主要是针对一些老的不识别viewport的浏览器,比如黑莓
      <meta name="screen-orientation" content="portrait"> 
        DefDec: uc强制竖屏 
      <meta name="full-screen" content="yes"> 
        DefDec: UC强制全屏
      <meta name="browsermode" content="application"> 
        DefDec: UC应用模式 
      <meta name="x5-orientation" content="portrait"> 
        DefDec: QQ强制竖屏 
      <meta name="x5-fullscreen" content="true"> 
        DefDec: QQ强制全屏 
      <meta name="x5-page-mode" content="app"> 
        DefDec: QQ应用模式 
      ★IOS私有 
      <meta name="apple-mobile-web-app-capable" content="yes"> 
        DefDec: 是否启动webapp功能
          会删除默认的苹果工具栏和菜单栏 
          可将网站添加到主屏幕上 
      <meta name="apple-mobile-web-app-status-bar-style" content="<KW>"> 
        DefDec: 让网页以应用程序风格显示<状态栏透明>,定义状态样式 
        'default'           默认值:白色 
        'black'             黑色 
        'black-translucent' 灰色半透明,将浮在页面上方<状态栏不占位置,页面上移>
      <meta name="apple-touch-fullscreen" content="yes"/> 
        DefDec: 全屏显示 
      <meta name="apple-mobile-web-app-title" content="标题">
        DefDec: 将网站添加到主屏后的标题
      ★地理标签
      <meta name="ICBM" content="latitude, longitude">
      <meta name="geo.position" content="latitude;longitude">
      <meta name="geo.region" content="country[-state]">
        国家代码 (ISO 3166-1): 强制性, 
        州代码 (ISO 3166-2): 
        Example: content="US" / content="US-NY" 
      <meta name="geo.placename" content="city/town">
        如 content="New York City" 
      ★不常用  
      <meta name="google" content="<KW>"> 
        DefDec: 谷歌相关设置 
        'nositelinkssearchbox'  告诉Google不显示网站链接的搜索框
        'notranslate'           告诉Google不提供此页面的翻译 
      <meta name="googlebot" content="index,follow">   
        DefDec: 控制搜索引擎的抓取和索引行为,仅对Google有效  
      <meta name="google-site-verification" content="verification_token"> 
        DefDec: 验证Google搜索控制台的所有权
      <meta name="yandex-verification" content="verification_token"> 
        DefDec: 验证Yandex网站管理员的所有权
      <meta name="msvalidate.01" content="verification_token"> 
        DefDec: 验证Bing网站管理员中心的所有权
      <meta name="alexaVerifyID" content="verification_token"> 
        DefDec: 验证Alexa控制台的所有权 
      <meta name="p:domain_verify" content="code from pinterest"> 
        DefDec: 验证Pinterest控制台的所有权 
      <meta name="norton-safeweb-site-verification" content="norton code"> 
        DefDec: 验证Norton安全站点的所有权 
      <meta name="subject" content="你的网站主题"> 
        DefDec: 关于网站主题的简短描述
      <meta name="rating" content="General"> 
        DefDec: 基于网站内容给出一般的年龄分级 
      ★不存在的 
      <meta name="copyright" content="声明内容"/> 
        DefDec: 版权声明 
    charset="KW"       设置字符集 [HTML5]
      PS: 需放置在head的其他前面 
      Example: 
        <meta charset="UTF-8"> 
        // HTML5前的写法 
        <meta http-equiv="content-type" content="text/html;charset=UTF-8"/> 
    scheme=""       
  <title>  网页标题 
  <base href="url">  定义超链接的根目录 [HTML5]  
    PS: 在head中使用 
    href="url"    定义页面中a链接默认以此为根路径
    target="KW"   可选,定义页面中a链接的打开方式
      '_blank' 
  <body>  所有HTML标签的wraper 
    高度默认为0; 背景色会向上渲染将整个浏览器铺满
    建议不要对body进行样式控制,使用一个其他的盒子代替[Self] 
引入类 
  <style/>  嵌入样式 
  <link>  外部样式 
    rel="KW"   规定当前文档与被链接文档/资源之间的关系 
      PS: 只有当使用 href 属性时,才能使用 rel 属性, 
        只有"stylesheet"支持所有浏览器,其他值只有部分支持 
      'stylesheet' 文档的外部样式表
        <link rel="stylesheet" type="text/css" href="XXX.css" />
      部分浏览器支持的值: 
        'icon'       该页面图标 
          W3C: <link rel="icon" type="image/gif" sizes='16*16' href="XX.gif"/> 
            PS: 对于 IE11+、Chrome、Firefox、Safari 和 Opera 网站图标 
            type="KW"        图片类型 
              "image/gif"   
              "image/png"   
            sizes="num*num"  图标尺寸 
            href="path"      图标路径 
          IE: <link rel="shortcut icon" href="XX.ico" /> 
            IE 10 及以下版本,将'favicon.ico'放在根目录下即可 
        'bookmark'   相关文档
        'search'     链接到针对文档的搜索工具
        'author'     链接到该文档的作者
        'prefetch'   预加载网页内容,为浏览者提供一个平滑的浏览体验[HTML5]  
          <link rel="prefetch" href="url">
        'alternate'  文档的替代版本(例如打印页、翻译或镜像)
        'help'       帮助文档
        'licence'    链接到该文档的版权信息
        'next'       集合中的下一个文档
        'pingback'   指向 pingback 服务器的 URL
        'prev'       集合中的前一个文档
        'sidebar'    链接到应该显示在浏览器侧栏的文档
        'tag'        描述当前文档的标签(关键词)
        'start'        集合中的第一个文档 
        'contents'     文档的目录
        'index'        文档的索引
        'glossary'     在文档中使用的词汇的术语表(解释)
        'copyright'    包含版权信息的文档
        'chapter'      文档的章
        'section'      文档的节
        'subsection'   文档的小节
        'appendix'     文档的附录
        'manifest'  
          链接到一个指定Web应用程序“安装”证书的JSON文件 
          <link rel="manifest" href="manifest.json">
        'me'         提供了关于作者或其他人的信息 
          <link rel="me" href="https://google.com/profiles/thenextweb" type="text/html">
          <link rel="me" href="mailto:name@example.com">
          <link rel="me" href="sms:+15035550125">        
        'import'     加载一个外部的HTML文件到当前HTML文件中 
          <link rel="import" href="/path/to/component.html">
        'search'     打开搜索 
          <link rel="search" href="/open-search.xml" type="application/opensearchdescription+xml" title="Search Title">
        预取,预载,预浏览 
        <link rel="dns-prefetch" href="//example.com/">
        <link rel="preconnect" href="https://www.example.com/">
        <link rel="prefetch" href="https://www.example.com/">
        <link rel="prerender" href="https://example.com/">
        <link rel="preload" href="image.png" as="image">
        ★IOS私有 
        "apple-touch-icon" 定义添加到主屏幕后的图标样式  
          sizes="num*num" 用来放置对应不同的设备 
            57×57   默认值,对应320×640 的iPhone老设备 
            72×72   对应iPad 
            114×114 对应retina屏的iPhone及iTouch
            144×144 高分辨率,ipad3
            最完善的写法: 
            <link rel="apple-touch-icon" sizes="57x57" href="touch-icon-iphone.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="touch-icon-ipad.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="touch-icon-iphone4.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="apple-touch-icon-ipad3-144.png" />
          href="url"  
        "apple-touch-icon-precomposed"  定义添加到主屏幕后的图标样式,不用IOS默认的圆角和调光  
          href="url"
        "apple-touch-startup-image"   用WebApp设置类似NativeApp的启动画面
          media=""     控制retina和横竖屏加载不同的启动画面 
            media="(device-width: 320px)" // iPhone
            media="(device-width: 320px) and (-webkit-device-pixel-ratio: 2)" // iPhone Retina
            // iPhone 5
            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" 
            // iPad portrait
            media="(device-width: 768px) and (orientation: portrait)" 
            // iPad landscape
            media="(device-width: 768px) and (orientation: landscape)" 
            // iPad Retina portrait
            media="(device-width: 1536px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)" 
            // iPad Retina landscape
            media="(device-width: 1536px)  and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)"
          href="url"   
    href="url" 外部样式的地址 
    media="KW" 说明这个样式表要应用于的媒体 
      'all'        所有表现媒体
      'screen'     屏幕媒体
      'print'      打印文档时使用
      'aural'      语音合成器、屏幕阅读器和文档的其他声音表现
      'handheld'   用于手持设备
      'projection' 用于投影媒体
      'tv'         电视
      ...
  <script/> JS引入 
    PS:用于引进JS代码;一个script标签不可同时使用内部和外部JS代码,否则只执行外部JS; 
      存在多个script引入标签时[且不存defer和async属性],代码执行顺序按照标签的先后顺序;
      在加载和解析script代码时,网页会暂停对其他内容的加载和解析;
      script标签可以放在HTML中的任何位置,但一般放在head中或body的尾部;
    src="url"    可选,引入JS文件的路径  
    type="KW"    可选,代码内容的类型,也称为MIME类型  
      PS: 以前是必选项,现可省略 
        若设置的type值浏览器不认识,则其中的代码不会执行,但该script节点依然存在于DOM中
      "text/javascript"  默认值,对于老式浏览器推荐设置该值 
      'application/javascript'   推荐现代浏览器设置 
      'module'    使用ES6的模块化 [Chrome支持]
    charset="KW" 可选,指定的字符集 
      "UTF-8"   默认值,由于大多数浏览器忽略它,故较少使用 
    defer="bol"  可选,网页解析完后解析JS [延迟解析,而非延迟下载] [只有IE支持?]
      兼容性不好,只有IE支持 ? 
      当存在多个延迟脚本时,并不一定会按照先后顺序执行  
      下载的脚本文件在'DOMContentLoaded'事件触发前执行[即刚刚读取完</html>标签],
    async="bol"  可选,下载完后立即解析JS,但解析期间不阻塞HTML的下载,可选 
      只对外部JS文件有效
      多个async的脚本并不保证按照指定的先后顺序执行,而是按下载完的先后顺序
      当同时存在async和defer时,defer不生效
      异步脚本一定会在页面的load事件前执行,可能在'DOMContentLoaded'事件之前或之后执行
    interity="str"  写入该外部脚本的hash签名,验证脚本的一致性 
      <script src="xx.js" interity="xxxxxx"></script>
      一旦有人更改了这个脚本,导致签名不匹配,浏览器就会拒绝加载
    当script放置在head中时,需设定'DOMContentLoaded'事件已保证在文档解析后执行 
      PS:HTML文档被完全加载、解析时,DOMContentLoaded触发,无需等待样式表、图像和子框架完成加载
      <script>
        document.addEventListener( 'DOMContentLoaded', function (e) {
          ...
        });
      </script>
    当内部JS代码中遇到'</script>'字符串时,会被认为是结束标签导致bug
      console.log('</script>'); 
  <noscript> 未启用JS 
    当浏览器不支持js,或没有启用[如禁止使用JS]时会被激活.
    <noscript>您的浏览器不支持JavaScript,请升级浏览器!或您没有启用JS</noscript>
  <iframe> 内联框架,创建包含另外一个文档的内联框架  
    PS:iframe会阻塞主页面的'load'事件 
    'name'     命名iframe 
    'frameborder' 是否显示iframe周围的边框,设为'0'即可移除边框 
    'seamless'    无边距边框,使外观类似当前页面的内容[有兼容性问题][HTML5]
    'srcdoc'      指定iframe的内容,优先级高于'src'[HTML5] 
      <iframe src="" srcdoc="<p>1111111111</p>"> </iframe>
    'sandbox'     严格安全限制,默认全部不允许[HTML5]   
      allow-forms           允许提交表单 
      allow-same-origin     允许同源 
      allow-scripts         允许运行脚本 
      allow-top-navigation  允许跳转
    'iframe'与'frame'的区别 
      iframe标记又叫浮动帧标记,可以用它将一个HTML文档嵌入在一个HTML中显示.
      在网页中嵌入的<iframe></iframe>所包含的内容与整个页面是一个整体,
      而<Frame></Frame>所包含的内容是一个独立的个体,是可以独立显示的.
      另外,应用Iframe还可以在同一个页面中多次显示同一内容,而不必重复这段内容的代码.
  <frameset> 框架[HTML5废弃] 
    PS:通过使用框架,可以在同一个浏览器窗口中显示不止一个页面.
      每份HTML文档称为一个框架,并且每个框架都独立于其他的框架.
      使用框架的坏处:开发人员必须同时跟踪更多的HTML文档；很难打印整张页面
    <frameset cols="列窗口百分比分割" rows="行窗口百分比分割">
      <frame name="命名frame" src="HTML路径" scrolling="yes/no/auto"(noresize)/>
      <frame name="命名frame" src="HTML路径" scrolling="yes/no/auto"(noresize)/>
    </frameset>
    frameborder 边框大小,为0时无边框显示
      firefox中由border控制宽度,framespacing无效,IE相反,所以最好两个值同时设置,以兼容浏览器！(?)(百度知道所得)
    cols  列窗口百分比分割 
    rows  行窗口百分比分割
    framespacing  定义各区域间的间隙大小
      number
    Remarks:使用框架结构则至少需要两个HTML文件,在总的HTML文件中
      在定义某个区域的HTML文件中,往往需要用到target指向frame的名字来指定超链接的显示位置
      重要提示:不能将<body></body>标签与<frameset></frameset>标签同时使用.
  <frame>    框架[HTML5废弃] 
    PS:不需要body
    cols  列窗口百分比分割 
    rows  行窗口百分比分割
    noresize   表示不可改变分割比例,默认情况下,用户可以对分割比例进行拖拽从而改变比例 
    scrolling  定义该区域是否显示滚轴
    src                URL             该框架中显示的html.
    name              name              规定框架的名称.
    longdesc           URL         规定一个包含有关框架内容的长描述的页面.
    frameborder 边框大小
      0  则无边框 
    framespacing 定义各区域间的间隙大小
    Example: 
      <frameset cols="200,30％,*">
        <!-- cols表示3个框架按照列分
        第一个宽度200px,第二个占总共的30％,最后一个为剩下所有的.
        rows表示按照行来分 -->
        <frame name="left" src="01html" noresize></frame>
        <!-- noresize表示不允许改变大小 -->
        <frame name="middle" src="02.html" ></frame>
        <frame name="right" src="03.html"></frame>
      </frameset>
结构类 
  ★HTML新增 
  <header>     页眉 
    header元素是一种具有引导和导航作用的结构元素
    通常用来放置整个页面或页面内某个内容区块的标题等,没有个数限制
    但也可以包含其他的内容,比如在header里面放置logo图片、搜索表单等等.
  <article>    文章 表示页面中的一块与上下文不相关的独立内容,
    比如一篇文章中的文章 
  <section>    区块 表示页面中的一块内容区块
  <aside>      侧边栏 表示article内容外的和内容相关的辅助信息
  <footer>     页脚 作为其上层父级内容区块或是一个根区块的注脚.
  <nav>        导航栏
语义化 
  <p>       段落
  <h1>-<h6> 标题,字体默认为粗体
  <hr/>     标尺线,水平直线
    align   水平位置.默认为居中
    size    线宽度,默认为0,当size不为0时为一线框,通过颜色来填充
    width   控制线的长度
  <code>    格式化文本
    当代码为一行时可使用该标签进行插入.若是多行代码,则需使用pre
  <pre>     preformatted_text,格式化文本,保留内容包含的格式
    被包围在pre元素中的文本通常会保留空格和换行符,文本呈现为等宽字体;
    常用来展示计算机源代码;
  <br>      换行
  <nobr>    不换行
    <nobr>这是一段很长的文字但不会换行</nobr>
    建议使用white-space: nowrap;属性代替;
  <q>          引用
    浏览器会对q标签自动添加双引号
    语义:引用别人的话
    有些浏览器会将q内的内容加引号括起来,有些则没有
  <blockquote> 长文本引用
    如在文章中引入大段某知名作家的文字,这时可用这个标签;
    <q>标签是对简短文本的引用,比如引用一句话;
    表现形式类似于段落加缩进,并无引号出现,从周围内容分离出来比较长的部分(通常显示为缩进的块)
  <block>      引用 
    <block></block> 块引用
  ★HTML5新增 
  <hgroup>     标题组 对网页或区段的标题进行组合.
    将标题和他的子标题进行分组的元素,比如在一个内容区块的标题和他的子标题算是一组.
    通常情况下,文章只有一个主标题时,不需要hgroup元素.
  <figure>     独立的流内容[IE9+]
    规定独立的流内容(图像、图标、照片、代码等等)(一般用于包括一组图片)
    figure元素用来表示页面上一块独立的内容,如果将其从网页上删除不会给我们的网页造成影响.
  <figcaption> 定义figure的标题
    与figrue配套使用,用于标签定义figure元素的标题
    它属于figure元素,figcaption元素必须写在figure元素内部,
    可以写在figure元素内的其他从属元素前面或后面,一个figure元素内最多只能允许放置一个figcaption元素.
    Example: 
      <figure>
        <figcaption>
        </figcaption>
          <img src="url" alt="图片" />
          <h3>标题</h3>
          <p> 说明注释1 </p>
          <p> 说明注释2 </p>
          <p> 说明注释3 </p>
      </figure>
      <figure>
        <figcaption>
        </figcaption>
          <img src="url" alt="图片" />
          <h3>标题</h3>
          <p> 说明注释1 </p>
          <p> 说明注释2 </p>
          <p> 说明注释3 </p>
      </figure>
  <address>    联系信息 定义文档或文章的作者/拥有者的联系信息.
    PS:如果address元素位于body元素内,则它表示文档联系信息.
      如果address元素位于article元素内,则它表示文章的联系信息.
      默认显示为斜体,且会换行显示
      用来在页面中呈现联系信息,包括文档的作者、邮箱、地址、电话信息等.
      address元素还用来展示和文章中的相关的联系人的所有联系信息.
  <details>    细节 用于描述文档或文档某个部分的细节[仅chrome和safari支持]
    PS:用于标识该元素内部子元素可被展开、搜索显示 
    open   定义details初始状态是否可见 
    Example:
      <details>
        <summary> 细节展示的标题 </summary>
        <div> 折叠展开的内容1 </div>
        <div> 折叠展开的内容2 </div>
      </details>
  <summary>    定义details的标题[与'details'配合使用] 
    与details标签配合使用,定义details的标题.
    summary是可见的,当用户点击标题时会显示出details的详细信息.
    summary 元素应该是 details元素的第一个子元素.
    目前只有谷歌浏览器支持
    summary元素从属于details元素
    用鼠标点击summary元素中的内容文字时,details元素中的其他所有从属元素将会展开或者收缩.
    如果details元素没有summary元素,浏览器会提供默认的文字以供点击.
  <mark>       文本标记 定义带有记号的文本.
    mark标签有突显作用,但在仅需突出显示文本时使用 <m> 标签.
    mark元素表示页面中需要突出显示或高亮显示的,对于当前用户具有参考作用的一段文字.
    mark元素最主要的目的就是吸引当前用户的注意.
  <time>       时间日期 
  <meter>      条状份额显示 
  <output>     输出计算 
  <keygen>   用于表单的密钥对生成器字段,当提交表单时,私钥存储在本地,公钥发送到服务器
    属性             值          描述
    autofocus  autofocus   使 keygen 字段在页面加载时获得焦点。
    challenge  challenge   如果使用,则将 keygen 的值设置为在提交时询问。
    disabled   disabled    禁用 keytag 字段。
    form       formname    定义该 keygen 字段所属的一个或多个表单。
    keytype    rsa         定义 keytype。rsa 生成 RSA 密钥。
    name       fieldname   定义 keygen 元素的唯一名称。name 属性用于在提交表单时搜集字段的值。
  <dialog>    对话框,会话框[仅Chrome和Safari支持] 
    <dialog open>这是打开的对话窗口</dialog>
  <command>   定义一个命令按钮 [存在兼容性问题] 
功能类 
  <img> 图片
    src         图片路径
      <img src="data:image/png;base64,xxxxx" >  通过'base64'加载图片 
    alt='文字'  图片的替代文本,图片无法显示时显示的内容 
    align       top 文字垂直居上 
      middle 文字垂直居中
      bottom 文字垂直居下(默认)
    vspace      定义图像顶部和底部的空白(垂直边距)
    hspace      定义图像左侧和右侧的空白(水平边距)
    注:align、space及hspace为处理图片和周围文字的关系.
  <a>   'anchor'锚点元素、超链接 
    PS: 可链接到外部地址实现页面跳转,也可在当前页面实现内部导航的锚点功能
    href=""   链接地址 
      网址: 链接到指定网页
      锚点: 链接网页指定部位 
        href="#id名称" 
        或 href="#另一个a元素的name属性的值"
      下载: href="aoo.zip" 
        格式不可为'.html'、'.js'、'.txt'等等 
      发送邮件: href='mailto:address?key1=val1' 
        PS: 键值对间使用'&'连接;val可选多个,之间使用分号';'隔开;
        address   必须,收件人邮箱地址 
        key=val   可选,其他可选参数 
          subject='邮件标题'  
          body='邮件内容'   
          cc='抄送人邮箱'    
          bcc='密抄人邮箱'   
        Example:    
        <a href="mailto:收件人@qq.com?subject=标题&body=邮件内容&cc=抄送人1@qq.com;抄送人2@qq.com">发送邮件</a> 
      脚本链接: 单击设置脚本的链接时执行相应的javascript语句 
        Example: 
        <a href="javascript:alert('hello')">hello</a>
    target="keywords" 定义链接打开的位置 
      '_self'    在自身窗口中打开(默认值)
      '_blank'   在新窗口中打开
      '_parent'  父窗口(本窗口的上一级窗口),框架会经常使用
      '_top'     在浏览器的整个窗口中打开,忽略任何框架
      框架的名称  
  <ul>  无序列表
    type 列表显示样式
      none    无
      disc    圆点(默认值)
      square  方块
      circle  圆圈
  <ol>  有序列表
    type     序号的显示类型 
      i/I   罗马数字
      1     阿拉伯数字
    start    定义开始的序号 
      如 start=6,序号从6开始
    reversed 倒序排序;默认为正序排序 
    Define:
      <ol>
          <li>信息</li>
          <li>信息</li>
      ......
      </ol>
  <li>  列表项
    <li>列表条目标签</li>
    定义列表条目,配合ul或ol使用
  <dl>  用于定义列表,用于容纳<dt>和<dd>标签
    重新定义后的dl元素
      在html4中,dl元素是一个专门用来定义术语的列表
      在HTML5中:
      dl元素在HTML5中进行了重新定义.
      每一项包含一条或者多条带名字的dt元素用来表示术语,
      dt元素后面紧跟一个或者多个dd元素用来表示定义.
    Example: 
      <dl>                  <!--定义列表-->
        <dt>标题1</dt>      <!--表示一个项目-->
          <dd>内容1</dd>    <!--表示一个项目下的更详细的内容的解释-->
          <dd>内容2</dd>
        <dt>标题2</dt>
        <dd>内容1</dd>
        <dd>内容2</dd>
        ...
      </dl>
  <dt>  定义列表中的项目
  <dd>  描述列表中的项目
  ★HTML5新增 
  <canvas> 画布,专门用来绘制图形 
    PS: canvas标签提供一块画布,可访问画布中的像素点 
      画布默认为透明的 ,canvas标签只是图形容器,图形需脚本来绘制 
      主要用途: 游戏或高级复杂的图像效果 
      通过'width'和'height'两个标签属性设定尺寸,默认宽300px、高150px; 
      若CSS的尺寸与初始画布的比例不一致,会导致画布的内容进行相应的缩放; 
      即CSS中控制的宽高只影响HTML布局,而不会对画布内部尺寸产生影响 
    <canvas width="600" height="200">您的浏览器不支持画布,请升级</canvas> 添加画布标签
    当不支持画布的浏览器,会显示出标签中的内容,支持的会忽略 
  <video>  视频 
    属性
    controls 可选,是否添加浏览器自带的播放控制条
    autoplay 可选,当网页加载完成之后是否自动播放
    preload  可选,是否对数据进行预加载
      如果是的话,浏览器会将视频数据或者音频数据进行缓冲,这样做可以加快播放的速度.
      auto     让浏览器做决定,一般预加载全部的视频或音频,默认值 
      metadata 只预加载媒体元数据,如视频的总长度与第一帧画面 
      none     页面加载后不载入视频,若指定了'autoplay' 则忽略该特性 
    loop     可选,是否循环播放
    poster="imgURL"  图片展示替换方案,可选  
      PS: 当视频不可播放或未播放时,使用该属性向用户展示一张图片代替视频
    error 
      读取过程中一旦发生错误,返回一个media error对象,这个对象的code返回对应的错误状态,
      默认情况下video和audio的error属性都是null.
      1 取回过程被用户终止
      2 下载时发生错误
      3 解码发生错误
      4 媒体不可用或者不支持音频/视频
    src      可选,可通过src或source标签来指定
    Example: 
      <video width="750" height="500" src="XXX.mp4">该浏览器不支持video标签</video>
      设定好长和宽和src属性就可以了.
      兼容格式如下:
      <video width="750" height="500" controls>
        <source src='movie.mp4'/>
        <source src='movie.ogv'/>
      </video>
  <trace>  视频字幕标签 
  <audio>  音频 
    <audio>元素是一个HTML5元素
    Example: 
      <audio src="XXX.mp3" controls="controls"></audio>
      audio元素只需指定一个src属性即可
      兼容格式如下:
      <audio controls>
        <source src='audio.ogg'/>
        <source src='audio.mp3'/>
      </audio>
    对于不支持的浏览器我们可以在这对元素之间加入提示语句来代替
      若支持则不会显示标签内的文本.
      如<audio src="XXX.mp3" controls="controls">您的浏览器不支持audio元素</audio>
    属性
      autoplay 自动播放,可选属性
      controls 带播放控制条,可选属性
      src      可选属性,可通过src或source标签来指定
  <source> 视/音频的资源链接 
    PS:为video或audio指定多个播放格式与编码;
      以确保浏览器可以从中选择一种自己支持的播放格式进行播放.
      按顺序选择,直到选择到所支持的格式为止,后面的source不再读取  
    'src'  指定地址
    'type' 指定文件格式,可选 
      Example: <source src="" type='video/ogg; codecs="theora,vorbis"'/>
        codecs参数指定使用的视频音频编解码器
          theora 视频编解码器;vorbis音频编解码器
    e.g: 
      <video>
        <source src="XXX.m4v" type="video/mp4"/>
        <source src="XXX.webm" type="video/webm"/>
        <source src="XXX.ogv" type="video/ogv"/>
        <source src="XXX.mp4"/>
      </video>
  <embed>   嵌入对象,在HTML页面中嵌入多媒体元素 
    <embed src="" type=""> flash动画插入
    属性
    wmode="transparent"  使flash背景部分透明
    src  只支持本地播放.(?)
  <progress> 进度条标签,显示进度进程,如显示下载进度 
    PS:表示一个任务的完成进度这个进度,可以是不确定的,标识进度正在进行,
      可以用百分比数表示准确的进度情况.
    Example: <progress max="40" value="20"></progress>
    max=num   定义完成的值,表示总共有多少
    value=num 定义进程的当前值,表示已经完成了多少
    value和max的属性值必须大于0,且max的值大于等于value的值.
    单位是随意的
  <meter>    条状份额显示 
    <meter></meter> 所占份额的条状显示
    Example: <meter value="40" max="100" min="0" low="50" high="70" optimum="60">(PS:此处不影响显示)</meter>
    属性:
      value=num   当前占有值,该属性默认为0,可以为小数
      min=min     定义份额最小值,默认为0
       (当min不为0,则显示值为value-min);所设定的值不能小于0.
      max=num     定义总份额值,默认为1
        如果该属性值小于min值,则把min值视为最大值.
      low=num     范围的下限值
        必须小于或等于high的值;
      high=num    范围的上限值
        若该值小于low,则low视为high,同样若该属性值大于max则把max视为high
      optimum=num 定义最佳份额值.
        若该值高于 "high" 属性,则意味着值越高越好.若该值低于 "low" 属性的值,则意味着值越低越好.
        最佳值属性值必须在min属性值和max属性值之间
  <time>     时间日期 
    time元素代表24小时中的某个时间或者是日期,表示时间允许带时差.
    PS: 标签定义公历的时间(24 小时制)或日期,时间和时区偏移是可选的.
    Example: 
      <time datetime="2011-06-22" pubdate="pubdate"></time>
      <time datetime="2014-9-28">2014年9月28日</time>
      <time datetime="2014-9-28">9月28日</time>
      <time datetime="2014-9-28">今天的时间</time>
      <time datetime="2014-9-28T22:30">2014年9月28日晚上10点</time>
      <time datetime="2014-9-28T22:30Z">UTC标准时间2014年9月28日晚上10点</time>
      <time datetime="2014-9-28T22:30+8:00">中国时间2014年9月28日晚上10点</time>
    datetime=时间  规定日期 / 时间.否则,由元素的内容给定日期 / 时间.可选属性
    pubdate       可以用在article元素里面的time上表示,当前文章的发布时间.可选属性
  <template> 内容片段模版 
    一种用于保存客户端内容的机制,可视为被存储以供随后在文档中使用的一个内容片段 
    在加载页面时,解析器会处理template元素的内容,但是不会被渲染出来
    可在运行时使用JS进行实例化 
Table表格 
  PS: 在一些浏览器中,没有内容的表格单元显示的不太好,
    如果某个单元格是空的[没有内容],浏览器可能无法显示出这个单元格的边框,
    为了避免这种情况,在空单元格中添加一个空格占位符,就可以将边框显示出来;
  <table>   表格,整个表格以其开始和结束
    PS:单独使用没有意义,需配合其他表格元素使用.
    cellpadding   定义单元边沿与其内容之间的空白 
      pixels   默认为2px
      %
    cellspacing   定义单元格之间的空白 
      pixels   默认为2px 
      %
    frame   规定外侧边框的哪个部分是可见的 
      void  above  below hsides lhs rhs vsides box border
    rules   规定内侧边框的哪个部分是可见的 
      none groups rows cols  all
    bordercolorlight 设置左＆上边框的颜色[当border的值大于等于1时才有用] 
    bordercolordark  设置右＆下边框的颜色[当border的值大于等于1时才有用] 
    summary    表格的摘要[语义化属性] 
      PS:内容不会在浏览器中显示出来,其作用是增加表格的可读性,
        使搜索引擎更好的读懂表格内容 
      Example: <table summary="表格简介文本"> </table>
  <caption> 用于放置表格的标题
  <thead>   表格头部
    表头部分,table的结构性标签
    定义时无论thead处于table的什么位置,thead会默认放置在表格的开始,并且字体默认加粗.
    thead中不可省略tr
    只能存在一个thead(虽然设置多个不会报错)
  <tbody>   表体,table的主体部分
    可以定义多个
    当表格内容非常多时,表格会下载一点显示一点,但若加上<tbody>标签后,则该表格内容全部下载完才会显示.
  <tfoot>   表格页脚
    tfoot在表格中会默认显示在最下方,即使在标签结构中放置在最前面 
    一个table中只能有一个tfoot[虽然存在多个也不会报错] 
  <tr>  表格行 
    注:单元格合并实质上为单元格的跨越[需将其占据位置的单元格删除] 
  <th>  表头列 
    定义表格表头,默认文字加粗、自动居中 
    使用方法:在thead中使用,将相应的td更改为th即可
  <td>  表格列 
    rowspan  列合并 
      num
    colspan  行合并 
      num 
  <colgroup ></colgroup> 列组
    PS:只能在table标签内使用
      通过使用colgroup标签,可以向整个列应用样式,而不需要重复为每个单元格或每一行设置样式.
      colgroup标签用于对表格中的列进行组合,以便对其进行格式化.
      通过为colgroup标签添加 class 属性,这样就可以使用 CSS 来控制列
    属性
      span=num 表示控制 num 列(html中只有该属性生效,其他已被废弃)
    Example:
      通过colgroup控制列
      <table width="100%" border="1">
        <colgroup span="2" style="background-color:red">1</colgroup>
        <colgroup style="background-color:pink">2</colgroup>
        <tr>
          <th>ISBN</th>
          <th>Title</th>
          <th>Price</th>
        </tr>
        <tr>
          <td>3476896</td>
          <td>My first HTML</td>
          <td>$53</td>
        </tr>
        <tr>
          <td>2489604</td>
          <td>My first CSS</td>
          <td>47</td>
        </tr>
      </table>
  <col span="2">     表格列控制标签
    PS:参考 colgroup 一起了解.
      <col> 标签为表格中一个或多个列定义属性值.
      只能在 table 或 colgroup 元素中使用 <col> 标签.
      通过CSS控制 <col> 标签来控制表格的列.
      在 colgroup 内部定义,为每个列规定不同的属性值.
    属性:
      span number  规定 <col> 元素应该横跨的列数.(h5中只有该属性可用)
    Example:
      通过colgroup和col来控制列
        <table border="1">
          <colgroup>
            <col span="2" style="background-color:red">
            <col style="background-color:yellow">
          </colgroup>
          <tr>
            <th>ISBN</th>
            <th>Title</th>
            <th>Price</th>
          </tr>
          <tr>
            <td>3476896</td>
            <td>My first HTML</td>
            <td>$53</td>
          </tr>
          <tr>
            <td>5869207</td>
            <td>My first CSS</td>
            <td>$49</td>
          </tr>
        </table>
  多用属性 
    tr/td 
      align  水平对齐方式[HTML5不支持] 
        left right center 
      valign 竖直对齐方式[HTML5不支持]  
        top middle bottom
    thead、tbody&tfoot 
      align定义其内容的水平对齐方式       left/center/right/justify/char
      char规定根据哪个字符来进行文本对齐   character
      charoff规定第一个对齐字符的偏移量    num
      valign定义元素中内容的垂直对齐方式   top/middle/bottom/baseline
    scope 属性标识某个单元是否是列、行、列组或行组的表头 
      PS:该属性不会在普通浏览器中产生任何视觉变化,类似于语义化的标签 
        屏幕阅读器可以利用该属性 
        由于不会在普通浏览器中产生任何视觉效果,很难判断浏览器是否支持 scope 属性 
      col      规定单元格是列的表头
        指定 col,会将当前列的所有单元格和表头单元格绑定起来 
      row      规定单元格是行的表头
        通过属性值 row,表头行包括的所有表格都将和表头单元格联系起来 
      colgroup 规定单元格是列组的表头
        使用rowgroup和colgroup会将单元格的行组[由 <thead>、<tbody> 或 <tfoot> 标签定义]
        或列组中的所有单元格和表头单元格绑定起来[由 <col> 或 <colgroup> 标签定义]  
      rowgroup 规定单元格是行组的表头
Form表单  
  PS: 表单字段也叫表单控件,如input、button等元素[self] 
  <fieldset></fieldset> 表单信息分组
    PS: 默认有一个细线边框,可设置border控制 
    Example: 
    <fieldset>
      <legend>框线上显示的文字</legend>
      <form action="">
      <!--  其他字段 -->
      </form>
    </fieldset>
  <legend>     显示fieldset边框上的信息文字
    PS: legend就像fieldset的标题,处于fieldset的顶部,
      legend很难应用样式,不可使用内、外边距 定位等机型控制 
  <form>       表单域,用于包含其他表单元素[如文本框、单选框等]的容器   
    PS: 户端与服务器端进行信息交流的途径之一;
      所有表单控件都必须放在该标签中,否则信息提交不到服务器上;
    name=""  表单名称 
      HTML4中,推荐使用id  
      HTML5中,多个form中的name须唯一 
    action="url"  表单提交的地址,处理该form信息程序所在的URL 
      该值可以被<button>或者<input>元素中的'formaction'属性重载[覆盖] 
    method=""   提交表单的HTTP方法 
      get  默认值 ,将表单数据附加到请求URL中 
        提交信息会显示在url中不适合密码传输,传递少量信息[256 byte]
      post 表单数据会包含在表单体内然后发送给服务器 
    target=""    指示提交表单之后,显示收到回复的位置 
      PS: 通过该属性指向一个iframe来实现无刷新表单提交 
      HTML4: 一个用于frame的名字/关键字,默认'_self' 
      HTML5: 一个用于'browsing context'浏览器上下文的名字/关键字 
        举例来说, 标签页tab,窗口window,or或者行内frame 
      关键字枚举: 
      _self: 在当前文档页面重新加载返回值 
        如果这个文档在一个frame中的话,self是在当前frame（document）中重新加载的,而不是整个页面（window） 
      _blank: 以新的HTML4或HTML5文档窗口加载返回值。
      _parent: 在父级的frame中以HTML4或HTML5文档形式加载返回值,
        如果没有父级的frame,行为和_self一致。
      _top: HTML4中,清空当前文档,加载返回内容;HTML5中,在当前文档的最高级内加载返回值 
        如果没有父级,和_self的行为一致。
      iframename: 返回值在指定frame中加载 
      HTML5: 这个值可以被 <button> 或者 <input> 元素中的 formtarget 属性重载[覆盖]    
    autocomplete   是否启用表单的自动完成功能 [HTML5] 
      PS: 当在表单中输入过一次字段后,后续(刷新后)再次输入相同的字段会产生提示效果 
        该设定可被属于该form的子元素的'autocomplete'属性覆盖 
      "on"    浏览器能够根据用户之前在form里输入的值自动补全 
      "off"   浏览器不自动补全输入
    novalidate   表单是否不进行验证 [HTML5] 
      可被该<form>的<button>或<input>元素中的 formnovalidate 属性覆盖
    enctype      当method为post时,enctype 是提交form给服务器的内容的 MIME 类型 
      PS:规定了对表单提交给服务器时表单数据编码的内容类型[Content Type]
        可认为是表单数据的'content type'[MIME type],
        只不过其取值只能为以下三种之一,否则会转换成默认的编码。
        该值可以被<button>或者<input>元素中的'formenctype'属性重载 
      "application/x-www-form-urlencoded" 默认值,所有字符都会进行编码 
        空格转换为 "+" 加号,特殊符号转换为 ASCII HEX 值;
        将表单数据中非字母数字的字符转换成转义字符,如"%HH",
        然后组合成 key1=value1&key2=value2 的形式;
      'multipart/form-data' 不对字符编码,在上传文件时使用 
        用于高效传输文件、非ASCII数据和二进制数据,
        将表单数据逐项地分成不同的部分,用指定的分割符分割每一部分。
        每一部分都拥有Content-Disposition头部,指定了该表单项的键名和一些其他信息;
        并且每一部分都有可选的Content-Type,不特殊指定就为text/plain。
        一般来说,method和enctype是两个不同的互不影响的属性,
        但在传文件时,method必须要指定为POST,否则文件只剩下filename了；
        当没有传文件时,enctype会改回默认的application/x-www-form-urlencoded
      'text/plain'      空格转换为 "+" 加号,但不对特殊字符编码 [HTML5]
        按照键值对排列表单数据 key1=value1\r\nkey2=value2,不进行转义;
        若表单中有文件,则只留文件名；
      Exp:
        表单发送超过100个具有相同name的字段时,服务器收不到数据 [20170518]
          添加 enctype='multipart/form-data' 解决
    accept-charset 一个空格分隔或逗号分隔的列表 
      列表包括了服务器支持的字符编码。浏览器以这些编码被列举的顺序使用它们。
      默认值是一个保留字符串“UNKNOWN”。 
    可以提交表单的按钮 
      PS: 用于提交表单的按钮需放置在表单<form>内,
        以下三种任意一按钮都可用于提交表单
        点击提交按钮或[获得焦点时]在表单字段中回车可提交表单,
        <textarea>字段例外,在文本区中回车会换行,
        若表单中无提交按钮,回车不会提交表单;
        若一个表单中有多个提交按钮,指定按钮可通过设置 formnovalidate 属性表示使用该按钮提交不需验证表单
      <input type="submit" name="xx" value="xxx">  通用提交按钮
      <input type="image" src="xx">  图像按钮
      <button type="submit" name="xx">xxx</button> 自定义提交按钮
    可以重置表单的按钮 
      <!-- 通用重置按钮 -->
      <input type="submit" name="xx" value="xxx">
      <!-- 自定义重置按钮 -->
      <button type="submit" name="xx">xxx</button>
    无页面刷新的表单提交 
      <iframe name="frame1"></iframe>
      <form action="iframe.htm" target="frame1">
        <input type="submit" value="提交">
      </form>
      $('iframe[name=frame1]').on("load",function(){
        var frame = frames['frame1'].document.querySelector("body")
        console.log(frame);
      })
  <label for="">内容</label>      字段标签  
    PS: label元素不会向用户呈现特殊效果;
      点击label,使关联表单字段获得焦点且被点击 
      产生效果的前提是:label的"for"属性值设置为相关元素的id值进行关联,
      或将表单字段放置其标签内进行关联;
    for=""关联
      label和input进行了关联,点击label会选中input
      <label for="man">男</label>
      <input id="man" type='radio' name='sex' value='男'/>
    包含关联[需去掉 for=""]
      将input标签放在label中也可达到如上效果
      <label><input type='radio' name='sex' value='男'/>男</label>
  <input type="类型" name="name" value="">  表单字段  
    PS: input表单根据不同的type属性值显示为不同的样式,如文本框、按钮、密码框等 
      IOS的微信中,input默认有圆角; 
    type=""  规定元素类型,虽不是必需,推荐始终使用 
      'text'     默认,单行文本字段  
        默认是20个字符
      'password' 密码框文本字段 
      'checkbox' 复选框 
      'radio'    单选按钮 
        name    有多个单选按钮时,多个name的属性值相同才能起到单选的作用
        checked定义该项为默认选中的[单选中只一个起作用,多个时最后一个起作用]
      'submit'   提交按钮 
      'reset'    重置按钮 
      'button'   普通按钮 
      'image'    图片按钮 
        src="图片路径"
      'file'     文件上传,文件字段 
        可覆盖表单中的'action'、'method'属性 ?  
        accept   表示可以选择的文件MIME类型,多个MIME类型用英文逗号分开 
          Example: 只能选择png和gif图片 
          <input type="file" accept="image/png,image/gif"/>  Chrome中显示为'自定义文件'
          <input type="file" accept="image/*"/>  表示为图片文件 
        multiple 是否可多选,多个文件时其value值为第一个文件的虚拟路径 
          Example: 多文件上传
          <input id="fileId2" type="file" multiple name="file" />
      'hidden'   隐藏域 
        value="提交值"
      ◆HTML5新增
      'email'   邮件地址  
        要求输入的文本需符合电子邮件地址的格式
      'url'     URL类型   
        要求输入的文本需符合URL的模式
      'number'  数字字段[带有spinner控件][IOS微信不兼容] 
        可能存在兼容性问题,在微信中可以输入+特殊字符, 且正则替换时存在问题
      'range'   拖动条,带有 slider 控件 
      'color'   拾色器  
      'search'  搜索文本字段 
      'tel'     定义用于电话号码的文本字段 
      'date'    日期
      'calendar'  日历 
      'datetime'        日期字段 [带有calendar和time控件] [Chrome无效]
      'datetime-local'  日期字段 [带有calendar和time控件]
      'month'           日期字段的月 [带有calendar控件]
      'week'            日期字段的周 [带有calendar控件]
      'time'            日期字段的时分秒 [带有time控件]
    value="" 表单字段值/显示值/按钮名称  
      提交到服务器的数据值;当为按钮时,按钮显示的内容
    功能属性 
      size="<num>"       显示的字数 
      maxlength="<num>"  最多容纳字符数 
      ◆HTML5 
      autocomplete  是否自动完成,具有记忆功能,适用:<form>、部分<input> 
        PS: 当用户在自动完成域中开始输入时,浏览器应该在该域中显示填写的选项; 
      autofocus  当页面加载完是否自动获得焦点,适用:所有<input>类型 
      form=""   规定输入域所属的表单,值为<form>的id 
        PS: 若需引用多个表单,使用空格分隔;
        Example: 
          <form action="demo_form.asp" method="get" id="user_form">
            First name:<input type="text" name="fname" />
            <input type="submit" />
          </form>
          Last name: <input type="text" name="lname" form="user_form" />
      height/width   image类型input标签的图像宽高
        PS:只适用于type=image 的 <input> 标签
        Example: <input type="image" src="img.gif" width="99" height="99" />
      list           为表单提供选项列表
        PS:datalist 是输入域的选项列表;
          适用于 type=text/search/url/telephone/email/date,
          /pickers/number/range/color 的 <input>;
        Example:
          Webpage: <input type="url" list="url_list" name="link" />
          <datalist id="url_list">
            <option label="W3Schools" value="http://www.w3school.com.cn" />
            <option label="Google" value="http://www.google.com" />
            <option label="Microsoft" value="http://www.microsoft.com" />
          </datalist>
      min、max 和 step 属性
        min 最小的可能值
        max 最大的可能值
        step 最小单位
        Example: :
          让用户只能输入0-100 的值,且是5的倍数
          <input type="number" min="0" max="100" step="5" name="xx"/>
        min、max 和 step 属性用于为包含数字或日期的 input 类型规定限定(约束)。
        max 属性规定输入域所允许的最大值。
        min 属性规定输入域所允许的最小值。
        step 属性为输入域规定合法的数字间隔(如果 step="3",则合法的数是 -3,0,3,6 等)。
        注释:min、max 和 step 属性适用于以下类型的 <input> 标签:date pickers、number 以及 range。
        下面的例子显示一个数字域,该域接受介于 0 到 10 之间的值,且步进为 3(即合法的值为 0、3、6 和 9):
        实例
        Points: <input type="number" name="points" min="0" max="10" step="3" />
        亲自试一试
      multiple  规定输入域中可选择多个值。
        注释:multiple 属性适用于以下类型的 <input> 标签:email 和 file。
        Example:
          Select images: <input type="file" name="img" multiple="multiple" />
      novalidate 属性
        novalidate 属性规定在提交表单时不应该验证 form 或 input 域。
        注释:novalidate 属性适用于 <form> 以及以下类型的 <input> 标签:text, search, url, telephone, email, password, date pickers, range 以及 color.
        实例
        <form action="demo_form.asp" method="get" novalidate="true">
        E-mail: <input type="email" name="user_email" />
        <input type="submit" />
        </form>
        亲自试一试
      pattern=""  rgep,自定义文本字段验证规则  [HTML5] 
        模式的开头和末尾不用加^和$符号[假定已经有了],须从头到尾都与模式匹配 
        Example: 
        <input type="text" name="code" pattern="[A-z]{3}" />
        <input type="text" pattern="\d+" name="xx"/>
    公用属性 
  <button type="" >      定义按钮 
    在 button 元素内部,可以放置文本或图像.(与 input 创建的按钮的不同之处)
    type 
      可选,IE的默认为 "button",而其他浏览器中(包括 W3C 规范)的默认值是 "submit"
      其他值和input表示按钮的type值相同
  <textarea name="" >    多行文本区,容纳文本不受限制  
    row=""     num,文本区可见字符行数 
      更好的办法是使用css的height和width来控制尺寸
      但CSS中无法设置rows或cols 
    cols=""    num,文本区可见字符列数 
    name       规定文本区的名称.
    disabled   禁用该文本区
    readonly   规定文本区只读 
      PS:disabled和readonly功能类似,主要区别如下
        1.readonly属性只针对标段元素的文本框,密码框或多行文本框有效,而disabled属性可对所有的表单元素都会有效
        2.设置两个属性的外观不一样
        3.设置readonly的表单元素依然会被提交,而设置disabled的值不会被提交.
    maxlength  值为数值,规定文本区域的最大字符数.
    wrap='off' 在文本域中输入文字时不自动换行,默认为自动换行
  <select>    下拉列表,创建单选或多选菜单
    multiple="bol"  是否可多选 
      Window下,使用Ctrl多选 
    size="num"      下拉列表中可见选项的数目 
    Example: 
      <label>爱好</label>
      <select multiple="multiple">
        <option value="看书">看书</option>
        <option value="旅游">旅游</option>
        <option value="运动">运动</option>
      </select>
  <option>    下拉列表选项
    PS: 既可以单选又可以多选 
      需与select元素配合使用,否则该标签没有意义.
    selected="bol"   是否为选中状态,当存在多个只有最后一个或几个起作用 
    value="向服务器提交的值" 
    Example: 
      <select name=# >
        <option selected="selected"(初始选择,只能有一个选项有)value="提交值">选项1</option>
        <option  value="提交值">选项2</option>
          ...
      </select>
  <optgroup>  列表选项分组
    将下拉选项进行分组显示
    Example: 
      <optgroup label="组名称">
        <option></option>
        <option></option>
        ...
      </optgroup>
  字段通用属性 
    checked   默认选中 
      若 checked 属性存在则表示该复选框默认被选中(设置其值为任何值,都表示被选中)
      使用JS控制选中状态时,设置其值为true(或其他任何能隐式转换成true的值),则其复选框被选中.
      Example: 以下都表示默认被选中
        <input type="checkbox" name="name"  checked>
        <input type="checkbox" name="name"  checked="">
        <input type="checkbox" name="name"  checked="1">
        <input type="checkbox" name="name"  checked="false">
        <input type="checkbox" name="name"  checked=false>
    disabled  禁用字段 
      如input不可输入 
    readonly  只读字段 
      适用: 部分<input>、<textarea> 
    readonly&disabled 的区别 
      disabled: 元素的值不会被提交 
      readonly: 正常提交;
    required  提交时输入字段不能为空 [HTML5]   
      PS: 需在form中且点击submit提交时触发
      适用: <input> <textarea> <select>  
    name=""         表单名称 
      将表单数据发送到服务器需要name 
      当发送多个相同name值的表单字段时,可使用 name='xx[]' 的形式 
    placeholder=""  占位符,提示文本  
      PS: 在输入域为空时显示出现,会在输入域获得焦点时消失:
      适用: <input>的:text,search,url,telephone,email,password、textarea 
      Example: 
      <input type="search" name="user_search"  placeholder="Search W3School" /> 
      在占位符中使用换行 
        方法一: 使用 &#10; 实体字符来表示换行 [Firefox不支持] 
        方法二: 通过JS来指定'placeholder'的值,可使用'\n'进行换行 
    ★'form override attributes'重写<form>的某些属性设定,适用: 提交字段  
      PS: 便于创建不同的提交按钮;
      Example:
      <form action="form.asp" method="get" id="user_form">
        E-mail: <input type="email" name="userid" /><br />
        <input type="submit" value="Submit" /> <br />
        <input type="submit" formaction="demo_admin.asp" value="admin" />
        <input type="submit" formnovalidate="true" value="validation" />
      </form>
    formaction=""      重写表单的 action 属性 
      formaction="提交位置" (提交按钮的属性)
        新属性,可选,适用于提交按钮(包括button和input)
        用于改变form的action
        Example: 
          <form action="demo_form.asp" method="get">
            <input type="text" name="fname" />
            <button type="submit">提交</button><br />
            <button type="submit" formaction="demo_admin.asp">以管理员身份提交</button>
            /*该按钮将信息提交到 formaction 指定的位置,而非form 指定的action位置*/
          </form>
    formenctype=""     重写表单的 enctype 属性
    formmethod=""      重写表单的 method 属性
    formnovalidate=""  重写表单的 novalidate 属性
    formtarget=""      重写表单的 target 属性
  表单将数据发送给服务器规则: 
    对表单字段的名称和值进行URL编码使用和号'&'分隔 
    不发送禁用的表单字段
    只发送勾选的复选框和单选按钮
    不发送type 为"reset"和"button"的按钮
    多选选择框中的每个选中的值单独一个条目
    在单击提交按钮提交表单的情况下会发送提交按钮,否则不发送,包括type为"image"的input元素 
    select元素值为选中的option元素的value特性的值,若option元素无value特性则为其元素文本值 
  Remarks: 
    type="submit" 的input和button 在提交时页面会跳转  [如何不跳转?] 
其他标签 
  ★无语义标签 : 无任何特殊含义
    存在的意义就是为了应用css样式,一个块元素一个行内元素 
  <div>   块元素 
    PS:把一些独立的逻辑部分划分出来,放在一个<div>标签中
      div元素是用来为html文档内大块'block-level'的内容提供结构和背景的元素.
      div标签的作用就相当于一个容器.
  <span>  行内元素 
    用来组合文档中的行内元素
  ★样式标签[建议使用CSS来控制] 
    PS:可组合使用,如表示加粗倾斜同时使用两个标签
    <blink> 闪烁文字[DiBs]
      <blink>内容</blink>  效果:内容文字闪烁 
    <marquee> 移动内容
      <marquee direction="left/right" >文字</marquee>
      移动的文字/图片(IE8之前有用)
      属性:
        direction    定义移动方向
        behaviour    移动方式
    <sup> 上标
      <sup>上标</sup>
      字体缩小,整体上移
    <sub> 下标
      <sub>下标</sub>
      字体缩小,整体下移
    <b> 加粗
      <b>加粗</b>
    <strong> 加粗
      <strong>加强语气(加粗)</strong>
    <i> 倾斜
      <i>倾斜</i>
    <em> 倾斜
      <em>加强语气(倾斜)</em>
    <u> 下划线
      <u></u> 下划线
    <ins> 下划线
      <ins></ins> 增加下划线
    <s> 删除线
      <s>删除线</s>
    <del> 删除线
      <del></del> 增加删除线
  ★不常用 
    <keygen> 标签规定用于表单的密钥对生成器字段.
      当提交表单时,私钥存储在本地,公钥发送到服务器.
      autofocus        使 keygen 字段在页面加载时获得焦点.
      challenge        如果使用,则将 keygen 的值设置为在提交时询问.
      disabled         禁用 keytag 字段.
      form   formname  定义该 keygen 字段所属的一个或多个表单.
      keytype   rsa    定义 keytype.rsa 生成 RSA 密钥.
      name  fieldname  定义 keygen 元素的唯一名称.
        name 属性用于在提交表单时搜集字段的值.
    <applet>
    <object>  嵌入对象,在HTML页面中嵌入多媒体元素
      <object data="" type=""></object> flash动画插入
      <object>的作用是支持HTML插件.
      辅助应用程序(helper application)是可由浏览器启动的程序.辅助应用程序也称为插件
      辅助程序可用于播放音频和视频,辅助程序是使用<object>标签来加载的.
      浏览器插件是一种扩展浏览器标准功能的小型计算机程序.
      插件有很多用途:播放音乐、显示地图、验证银行帐号、控制输入等等.
      可使用<object>或<embed>标签来将插件添加到HTML页面.
      <embed>标签定义外部(非HTML)内容的容器.(一HTML5标签,HTML4中非法,但所用浏览器中都有效)
      <object>标签也可以定义外部(非HTML)内容的容器.
      可使用此元素向 HTML 页面添加多媒体。
      <object> 标签用于包含对象,比如图像、音频、视频、Java applets、ActiveX、PDF 以及 Flash。
      object 的初衷是取代 img 和 applet 元素。不过由于漏洞以及缺乏浏览器支持,这一点并未实现。
      如果未显示 object 元素,就会执行位于 <object> 和 </object> 之间的代码。
      通过这种方式,我们能够嵌套多个 object 元素(每个对应一个浏览器)。
      可选参数
        archive URL 由空格分隔的指向档案文件的 URL 列表。这些档案文件包含了与对象相关的资源。 STF
        border pixels 定义对象周围的边框。 TF
        classid class ID 定义嵌入 Windows Registry 中或某个 URL 中的类的 ID 值,此属性可用来指定浏览器中包含的对象的位置,通常是一个 Java 类。 STF
        codebase URL 定义在何处可找到对象所需的代码,提供一个基准 URL。 STF
        codetype MIME type 通过 classid 属性所引用的代码的 MIME 类型。 STF
        data     URL 定义引用对象数据的 URL。如果有需要对象处理的数据文件,要用 data 属性来指定这些数据文件。 STF
        declare   declare 可定义此对象仅可被声明,但不能被创建或例示,直到此对象得到应用为止。 STF
        height pixels 定义对象的高度。 STF
        hspace pixels 定义对象周围水平方向的空白。 TF
        name unique_name 为对象定义唯一的名称(以便在脚本中使用)。 STF
        standby text 定义当对象正在加载时所显示的文本。 STF
        type MIME_type 定义被规定在 data 属性中指定的文件中出现的数据的 MIME 类型。 STF
        usemap URL 规定与对象一同使用的客户端图像映射的 URL。 STF
        vspace pixels 定义对象的垂直方向的空白。 TF
        width pixels 定义对象的宽度。 STF
    <param> 为object嵌入的对象规定 run-time 设置
      此标签可为包含它的 <object> 或者 <applet> 标签提供参数。
      HTML 中,<param> 标签没有结束标签,XHTML 中,<param> 标签必须被正确地关闭。
      Example::
        <object classid="clsid:F08DF954-8592-11D1-B16A-00C0F0283628" >
          <param name="BorderStyle" value="1" />
          <param name="MousePointer" value="0" />
          <param name="Enabled" value="1" />
          <param name="Min" value="0" />
          <param name="Max" value="10" />
        </object>
      属性
        name unique_name 定义参数的名称(用在脚本中)。 STF
        Param可选的属性
        属性 值 描述 DTD
        type MIME type 规定参数的 MIME 类型(internet media type)。 STF
        value value 规定参数的值。 STF
        valuetype 
        data
        ref
        object 规定值的 MIME 类型。 STF      
    <marquee> 滚动
      <marquee behavior="" direction="">滚动的文字</marquee>  滚动字幕
      属性
        滚动方向direction="left/right/up/down"
        滚动方式behavior="scroll/slide/alternate"
        循环次数loop="数字"(若未指定则一直循环infinite)
        速度scrollamount="数字"(数值越大速度越快)
        scrolldelay="延时"(走一步,停一停)
HTML全局属性 
  class    规定元素的一个或多个类名 
  id='xx'  使用id属性创建锚点 
    在相对链接或url后面添加#id名称即可链接到锚点 
  style    规定元素的行内CSS样式 
  title    元素的额外信息,当鼠标悬浮时,显示出文字说明 
  dir   规定元素中内容的文本方向 
  lang  规定元素内容的语言 
    en 英语 
  accesskey  规定激活元素的快捷键 
  tabindex    规定元素的tab键次序 
  ◆HTML5新增属性 
  data-xx  自定义元素的属性 
    'xx'为任意字符,长度不限 
  role     标识标签,使之语义化 
    方便浏览器对其具体功能进行识别 
    Example: <div role="navigation"></div>
  contenteditable  元素内容可编辑 
    PS: 在编辑的内容里进行回车会换行
    true/false/inherit  
  contextmenu    规定元素的上下文菜单,上下文菜单在用户点击元素时显示 
  draggable    规定元素是否可拖动 
  dropzone    规定在拖动被拖动数据时是否进行复制、移动或链接 
  hidden      隐藏元素,相当于'display:none'
  spellcheck  对元素进行拼写和语法检查  
  translate   规定是否应该翻译元素内容 
  tableindex=3  使用table键跳转时,按照定义的数字顺序 
◆特殊字符 
  'character entities'字符实体 
    PS: HTML中,某些字符是预留的,如'<'和'>'可能导致浏览器误认为标签 
      可在HTML源代码中使用'字符实体',来显示预留字符 
      其中大多数符号可在不进行实体引用的情况下使用 
      但为那些不容易通过键盘键入的符号提供了表达的方法;
    '实体字符'可用'实体名称'或'实体编号'表示 
      '实体名称'比'实体编号'好记,但浏览器对'实体编码'支持性更好 
      实体名称对大小写敏感;
    ★实体名称 实体编号   显示     描述          
    &#10;                        换行 
    &#160;   &nbsp;     ' '     'non-breaking space'不间断空格 
      浏览器总是会截短HTML页面中的空格。
      如在文本中写10个空格,在显示该页面之前,浏览器会删除它们中的9个。
      可使用 &nbsp; 字符实体,在页面中增加空格的数量 
    &#34;    &quot;     '"'     双引号 
    &#39;    &apos;     "'"     单引号 
      该符号实体名称,IE不支持
    &#60;    &lt;       <       小于号 
    &#62;    &gt;       >       大于号 
    &#38;    &amp;      &       和号  
    &#215;   &times;    ×       乘号 
    &#247;   &divide;   ÷       除号
    &#177;   &plusmn;   ±       加减号   
    &#176;   &deg;      °       度  
    &#165;   &yen;      ¥       元'yen'
    &#8364;  &euro;     €       欧元'euro'
    &#163;   &pound;    ￡      英镑
    &#162;   &cent;     ￠      分'cent'
    &#187;   &raquo;    »       angle quotation mark[right]
    &#171;   &laquo;    «       angle quotation mark[left]
    &#185;   &sup1;     ¹       superscript 1 
    &#178;   &sup2;     ²       superscript 2 
    &#179;   &sup3;     ³       superscript 3 
    &#188;   &frac14;   ¼       fraction 1/4 
    &#189;   &frac12;   ½       fraction 1/2 
    &#190;   &frac34;   ¾       fraction 3/4 
    &#169;   &copy;     ©       版权号
    &#174;   &reg;      ®       注册商标
    &#8482;  &trade;    ™       商标 
    &#167;   &sect;     §       小节 
    &#8730;  &radic;    √       square root 
    &#8226;  &bull;     •       bullet 
    &#8230;  &hellip;   …       horizontal ellipsis 
    &#8240;  &permil;   ‰       per mille 
    &#8242;  &prime;    ′       minutes 
    &#8243;  &Prime;    ″       seconds 
    &#8249;  &lsaquo;   ‹       single left angle quotation  
    &#8250;  &rsaquo;   ›       single right angle quotation 
    &#8254;  &oline;    ‾       overline 
    &#8364;  &euro;     €       euro 
    &#8482;  &trade;    ™       trademark 
    &#8592;  &larr;     ←       left arrow 
    &#8593;  &uarr;     ↑       up arrow 
    &#8594;  &rarr;     →       right arrow 
    &#8595;  &darr;     ↓       down arrow                   
    &#8596;  &harr;     ↔       left right arrow             
    &#8629;  &crarr;    ↵       carriage return arrow        
    &#8968;  &lceil;    ⌈       left ceiling                 
    &#8969;  &rceil;    ⌉       right ceiling                
    &#8970;  &lfloor;   ⌊       left floor                   
    &#8971;  &rfloor;   ⌋       right floor                  
    &#9674;  &loz;      ◊       lozenge                      
    &#9824;  &spades;   ♠       spade                        
    &#9827;  &clubs;    ♣       club                         
    &#9829;  &hearts;   ♥       heart                        
    &#9830;  &diams;    ♦       diamond                      
    &#8853;  &oplus;    ⊕      circled plus                 
    &#8855;  &otimes;   ⊗      cirled times                 
    &#8704;  &forall;   ∀       for all                      
    &#8706;  &part;     ∂       part                         
    &#8707;  &exists;   ∃       exists                       
    &#8709;  &empty;    ∅       empty                        
    &#8711;  &nabla;    ∇       nabla                        
    &#8712;  &isin;     ∈       isin                         
    &#8713;  &notin;    ∉       notin                        
    &#8715;  &ni;       ∋       ni                           
    &#8719;  &prod;     ∏       prod                         
    &#8721;  &sum;      ∑       sum                          
    &#8722;  &minus;    −       minus                        
    &#8727;  &lowast;   ∗       lowast                       
    &#8730;  &radic;    √       square root                  
    &#8733;  &prop;     ∝      proportional to              
    &#8734;  &infin;    ∞       infinity                     
    &#8736;  &ang;      ∠      angle                        
    &#8743;  &and;      ∧      and                          
    &#8744;  &or;       ∨      or                           
    &#8745;  &cap;      ∩       cap                          
    &#8746;  &cup;      ∪      cup                          
    &#8747;  &int;      ∫       integral                     
    &#8756;  &there4;   ∴      therefore                    
    &#8764;  &sim;      ∼      simular to                   
    &#8773;  &cong;     ≅      approximately equal          
    &#8776;  &asymp;    ≈      almost equal                 
    &#8800;  &ne;       ≠      not equal                    
    &#8801;  &equiv;    ≡      equivalent                   
    &#8804;  &le;       ≤      less or equal                
    &#8805;  &ge;       ≥      greater or equal             
    &#8834;  &sub;      ⊂      subset of                    
    &#8835;  &sup;      ⊃      superset of                  
    &#8836;  &nsub;     ⊄      not subset of                
    &#8838;  &sube;     ⊆      subset or equal              
    &#8839;  &supe;     ⊇      superset or equal            
    &#8869;  &perp;     ⊥      perpendicular                
  &#x<Unicode编码>;  表示一字符 
    如 &#x1d306;   表示:𝌆  
◆HTML5 
  介绍 
    PS:HTML5 是对 HTML 标准的第五次修订,HTML5是最新版本的HTML,
      引入了简化的标记、新的语义和媒体元素,另外还有一组支持Web应用的JavaScript库
      HTML5仍处于完善之中,大部分现代浏览器已经具备了某些HTML5支持
      HTML5 = 标记 + JavaScript API + CSS
    变化
      声明  简化为: <!doctype html> ,该声明将是HTML未来所有版本的声明,而不会再改变了
      meta标记
        之前 : <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        调整为 : <meta charset="utf-8">
      link标记 不再需要'type'属性,已经确定CSS作为HTML的标准样式.
        <link rel="stylesheet" href=""/>
      script标记 JavaScript成为HTML的默认脚本语言,除去原先的'type'属性
        简化为: <script src=""></script> 或 <script> </script>
      新的解析顺序:不再基于SGML 
      优点
        HTML5让网页结构变得更加清楚明了,增加了语义化的结构标签
        解决HTML在各个浏览器上存在不兼容的问题
        将HTML5网页上的音视频、图像、动画等都带入国际标准化.
        兼容性:HTML5在老版本的浏览器上也可以完美运行
        实用性:HTML5抛弃了不切实际的功能,一切按照实用性的路线出发.
  语义化 
    PS:通俗的说就是:明白每个标签的用途[在什么情况下使用此标签合理]
      比如,网页上的文章的标题就可以用标题标签,网页上的各个栏目的栏目名称也可以使用标题标签.
      文章中内容的段落就得放在段落标签中,
      在文章中有想强调的文本,就可以使用 em 标签表示强调等等.
    ★优点 
    便于阅读、理解、维护,使阅读源代码的人对网站更容易分块
    更容易被搜索引擎收录.
    更容易让屏幕阅读器读出网页内容.
  新特性&规范&标签&属性&内容 
    特性规范 
      标签属性的四种写法 
        <input disabled>
        <input value=yes>
        <input type='checkbox'>
        <input name="be evil">
        标签的'Boolean'值的属性只要写了属性[或者赋任何值]就是true
        Example: 
          <input type="checkbox" checked/>
          <input type="checkbox" checked="checked"/>
          <input type="checkbox" checked=""/>
          <input type="checkbox" checked="false"/>
          以上的复选框均被选中,js中通过移除该属性控制其状态
      自闭合标签不一定要以'/>'结尾,比如 <input > <img >
      HTML5 文档里可以不写 <html> <head> 和 <body> 标签
      HTML5 规定开发者可以自定义设置任何标签 
        'display'默认为'inline'
    新增标签[详见'◆标签&属性'] 
      ★功能性标签 
      <datalist>   下拉列表
      <progress>   进度条 
        max="100"   最大值
        value="80"  当前值 
      <ruby>       文本注释 
        Example:
          <ruby>
            abc
            <rt> 注释的内容 </rt>
            <rp> 备用的显示 </rp>
          </ruby> 
      <rt>         注释内容[和'ruby'配合使用]
      <rp>         注释不生效时显示[和'ruby'配合使用] 
      <wbr>        软换行,当宽度不够时换行 
      <datalist>   输入框输入提示 
        Example:
          <input list="cars">
          <datalist id="cars"> // 通过 id 和 input 的 list 进行关联 
            <option value="BWM"></option>
            <option value="Ford"></option>
            <option value="Volvo"></option>
          </datalist>
    新的表单元素 
      1 输入类型 
        email 输入 email 格式
        tel 手机号码
        url 只能输入 url 格式
        number 只能输入数字
        search 搜索框
        range 范围
        color 拾色器
        time时间
        date 日期 不是绝对的
        datetime 时间日期
        month 月份
        week 星期
        部分类型是针对移动设备生效的,且具有一定的兼容性,在实际应用当中可选择性的使用.
      2 表单元素[标签] 
        <datalist> 下拉选项,使用中文时要注意
        <keygen> 生成加密字符串
        <output> 不可当做数据提交？
        <meter> 表示度量器,不建议用作进度条
      4 表单事件 
        oninput 用户输入内容时触发,可用于移动端输入字数统计
        oninvalid 验证不通过时触发
    新增属性[详见'◆标签&属性'] 
    增加内容 
      现在已不是'SGML'的子集,主要是关于图像,位置,存储,多任务等功能的增加 
      Web储存:localStorage sessionStorage
        本地离线存储 localStorage 长期存储数据,浏览器关闭后数据不丢失;
        sessionStorage 的数据在浏览器关闭后自动删除;
      新的技术 'webworker''websocket''Geolocation'等;
  废弃元素 
    可被css代替的元素: 'basefont''big''center''font''s''strike''tt''u' 
    对可用性产生负面影响的元素: 'frame''frameset''noframe',只支持'iframe'框架 
    只有部分浏览器支持的元素 
    其他被废除的元素 
      废除'rb'元素,使用'ruby'元素代替;
      'acronym'使用'abbr'元素代替;
      ...
  浏览器兼容HTML5新标签的方法 
    document.createElement 创造标签 
      IE8/IE7/IE6 支持通过document.createElement方法产生的标签
      利用这一特性让这些浏览器支持HTML5新标签,然后添加标签默认的样式即可
    直接使用成熟的框架.比如HTML5shim;
      <!--[if lt IE 9]>
        <script> src="http://HTML5shim.googlecode.com/svn/trunk/HTML5.js"</script>
      <![endif]-->
  input元素的新类型:date, email, url等等。
  新的属性:ping（用于a与area）, charset（用于meta）, async（用于script）。
  全域属性:id, tabindex, repeat。
  新的全域属性:contenteditable, contextmenu, draggable, dropzone, hidden, spellcheck。
  移除元素:
    acronym
    applet
    basefont
    big
    center
    dir
    font
    frame
    frameset
    isindex
    noframes
    strike
    tt
--------------------------------------------------------------------------------
Collection 
自我总结 
  编写语义化的HTML
    将整个页面进行结构性的划分,使用结构性的标签来构建
    对每个结构或区块进行细致的划分
    对有语义的内容,使用语义化的标签来组建,如时间 地址等
  在保留格式的情况下,在网页中显示出html代码 
    实现方法一 
      使用文本域标签<textarea></textarea>
        添加属性disabled="disabled"不可更改文本、cols&rows 属性
习题及精解 
Question&Idea 
--------------------------------------------------------------------以下待整理 



