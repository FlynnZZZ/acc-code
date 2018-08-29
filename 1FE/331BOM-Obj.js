BOM'Browser Object Model'浏览器对象模型: 提供与浏览器交互的方法和接口 
  PS: 访问和操作浏览器窗口[显示的页面以外的部分],
    BOM由一系列相关的对象构成,且每个对象都提供了许多方法与属性,用来访问浏览器功能
    BOM只是ECMAScript的一个扩展,没有相关标准,W3C已将BOM的主要部分纳入HTML5规范中; 
Window,窗口 
  Extend: WindowProperties[不可直接访问]、EventTarget 
    console.log(Window.prototype.__proto__.constructor); // WindowProperties 
    console.log(Window.prototype.__proto__.__proto__.constructor); // EventTarget 
  Instance: window  
    console.log(window.constructor===Window); 
  Proto: 
    .TEMPORARY  num,0 
    .PERSISTENT num,1 
window,表示浏览器的一个实例,BOM的核心对象 
  PS: 具有双重角色,既是JS访问浏览器的接口,又是ECMAScript规定的Global对象; 
  全局作用域中声明的所有变量和函数,相当于window对象的属性和方法 [详见变量声明]  
    var aoo = 1;
    console.log(window.aoo); // 1 ,a就是window.a
    console.log(delete aoo); // false,删除失败,不是真正的window的属性 
    boo = 2; 
    console.log(window.boo);
    console.log(delete boo); // true 
    console.log(boo); // 报错不存在,已被删除  
  ◆Env: 
    window.moveTo(x,y)  将浏览器位置移动到x,y坐标 
      PS: 不适用于框架,只能对最外层的window对象使用 
      Chrome、Firefox中默认被禁用 
    window.moveBy(x,y)  将浏览器位置向下移动xpx向右移动ypx 
      PS: 不适用于框架,只能对最外层的window对象使用
      Chrome、Firefox中默认被禁用 
    window.outerHeight  num,浏览器窗口外侧高[IE9+] 
      包含浏览器的工具栏、边框、滚动条
    window.outerWidth
    window.innerHeight num,浏览器显示窗口高[IE9+] 
      不包含边框和工具栏等,但包含滚动条 
    window.innerWidth
    window.resizeTo(num1,num2) 将浏览器窗口调整为宽num1,高num2 
      PS: 不适用于框架,只能对最外层的window对象使用
      Chrome、Firefox中默认禁用的 
    window.resizeBy(num1,num2) 缩放差值[正数为放大,负数为缩小] 
      PS: 不适用于框架,只能对最外层的window对象使用;默认被浏览器禁用的 
    window.open([url][,target][,params][,bol])  win,导航或新建窗口 
      PS: 若浏览器扩展或其他程序阻止弹出窗口,open()通常会报错 
      url     可选,将要导航到的URL;
        若省略这个参数,或者它的值是空字符串,那么窗口就不显示任何文档 
      target  可选,打开窗口的位置 
        '_blank'  新建窗口或标签[视浏览器而定],默认值 
        '_self'   在当前框架中打开  
        '_parent' 在当前框架的父框架内打开.若当前框架无父框架,等同于'_self' 
        '_top'    在顶层框架中打开,在无框架页面中等同于'_self' 
          不打开新新窗口的情况下会忽略第三个参数
        frameName 命名的框架,不存在则相当于'_blank',并将其命名为改值 
      params  可选,设置窗口参数,参数间逗号隔开 
        PS: 字符串中不可出现空格
        width=num   窗口宽度,不能小于100
        height=num  窗口高度,不能小于100
        top=num     窗口顶部距屏幕顶部的px值[不可为负]
        left=num    窗口左端距屏幕左端的px值[不能是负值]
        menubar=yes/no     菜单栏显示,默认为no
        scrollbars=yes/no  滚动条显示,默认为no
        toolbar=yes/no     工具栏显示,默认为no
        status=yes/no      状态栏显示,默认为no
        resizable=yes/no   能否拖动改变窗口大小,默认为no
        scrollable=yes/no  能否滚动,默认为no 
        location=yes/no    是否在显示地址栏
          不同浏览器的默认值不同,操作方式也不同[可能隐藏,可能禁用]
        fullscreen=yes/no  浏览器窗口是否最大化[仅限IE]
        Example: 
        一般在新标签中打开,若设置了参数属性,则会打开新窗口,因为窗口风格不同
        open('https://www.baidu.com','frame1','width=300,height=300,top=100')
      bol     在浏览器记录中,新页面是否取代当前页面 
      win  新页面的window对象,若打开窗口失败则返回 null  
        PS: 默认可用 moveTo、moveBy、resizeTo、resizeBy 等方法 
        Example: 
        var win1 = open('https://www.baidu.com','_blank');
        win1.moveTo(0,0);  // 将新窗口移动到左上角 
      Exp: 
        当打开的窗口加载后才能获取到其DOM,且有同源限制  
          var win1 = window.open("./aoo.html?v=3","_blank")
          // var win1 = window.open("https://www.baidu.com","_blank") // 不同源 
          // console.log(win1.document.body); // 获取不到实际的DOM 
          win1.onload = function(){ // 若不同源则,win1对象不可用  
            console.log(win1.document.body); 
          }
        微信中兼容性问题 
          android: 不管窗口目标是是什么,始终在当前页面打开,
          ios : 只有目标窗口为'_self'时才有效[不填写也不行],其他则该方法不生效;
    window.opener  打开当网页的源网页window对象 [open()方法或超链接打开] 
      PS: 在本地file协议下,大部分该对象属性不可用,需要在服务器上运行 
      window.opener = null;  切断联系,表示在单独的进程中运行新标签页 
        联系一旦切断就无法恢复了
      Exp:  
        当打开的新窗口在当前窗口显示[即 _self、_parent或_top等],
        则 window.opener 表示为当前的窗口也就是新窗口而无法获取到原窗口
        window.opener.document.querySelector(); 获取到父元素的DOM对象
    window.close()   关闭打开的窗口或在打开的窗口中关闭自己  
      不能关闭当前窗口 
      window.close(); // Scripts may close only the windows that were opened by it 
      关闭新打开的窗口 
      var win1 = window.open("./a","_blank");
      setTimeout(function(){
        win1.close(); // 1s后关闭打开的窗口  
      },1000)
      在新打开的窗口中关闭自己  
      var win1 = window.open("./aoo.html","_blank");
      window.close(); // 在 aoo.html 中,关闭自己 
    window.closed    bol,检测[打开的]窗口是否关闭 
      PS: 当窗口关闭后,其窗口的引用仍然还在,可通过该属性来检测是否关闭 
    window.devicePixelRatio  num,设备物理像素和设备独立像素的比值  
  ◆Pag: 
    ★框架相关 
    window.parent  框架的父框架,在没有框架的情况下,parent等于top
    window.self    当前框架自身 
    window.length  框架内的子框架数量 
    window.name    框架的名称 
    window.top     最外层框架,即浏览器窗口window对象 
    window.length  当前页面中框架的数量,无其他框架时为 0 
    ★
    window.origin  str,如'http://tst.lcltst.com'  
    ★窗口位置与尺寸 
      返回值类型为num,单位px 
    window.screenTop  num,浏览器窗口相对桌面屏幕[DiBs] 
      Firefox不支持 
      IE窗口内边缘距屏幕的距离;
      Chrome窗口外边缘距屏幕边缘的距离 
    window.screenLeft
    window.screenY   num,浏览器窗口相对桌面屏幕[DiBs] 
      Firefox全屏时值分别为 -8,-8 
      IE9+,全屏时值分别为 -8,-8 
    window.screenX
    跨浏览器兼容方法: 
      var lftPos=(typeof screenLeft=="number")?screenLeft:screenX;
      var topPos=(typeof screenTop=="number")?screenTop:screenY;
    window.defaultStatus   读写,底部状态栏默认显示 
      读写 浏览器底部状态栏默认显示值
      defaultStatus="状态栏默认显示文本";
    window.status          底部状态栏条件显示的值 
      浏览器在某种条件下显示的值,当条件不成立时则不显示.
      描述由用户交互导致的状态栏的临时消息
      status="状态栏文本";
    window.scroll(x,y)   滚动到 
      x 值表示你想要置于左上角的px点的横坐标
      y 值表示你想要置于左上角的px点的纵坐标
    window.scrollTo(x,y) 同scroll
    window.scrollBy(x,y) 滚动距离 
      PS:要使此方法工作 window 滚动条的可见属性必须设置为true
      x 把文档向右滚动的px数
      y 把文档向下滚动的px数
    window.pageXOffset  num,页面水平滚动距离 
    window.pageYOffset  num,页面垂直滚动距离 
    window.matchMedia(str) 返回一个MediaQueryList对象 
      PS:若window.matchMedia 无法解析参数,matches返回的总是false,而不是报错.
      str 一个mediaQuery语句的字符串
      window.matchMedia(str).media; 返回所查询的mediaQuery语句字符串.
      window.matchMedia(str).matches; 布尔值,表示当前环境是否匹配查询语句
      addListener() 若mediaQuery查询结果发生变化就触发
        回调函数的参数是MediaQueryList对象
        Example:
        var mtmd = window.matchMedia("(max-width: 700px)");
        mtmd.addListener(foo); // 指定回调函数
        function foo(mtmd) { if(mtmd.matches) { } else { };}
        mtmd.removeListener(foo); // 撤销回调函数
      removeListener();
      Example:
        var result = window.matchMedia('(min-width: 600px)');
        result.media //(min-width: 600px)
        result.matches // true
        根据mediaQuery是否匹配当前环境,执行不同的JavaScript代码.
        var result = window.matchMedia('(max-width: 700px)');
        if(result.matches) {
          console.log('页面宽度小于等于700px');
        } else {
          console.log('页面宽度大于700px');
        }
    window.blur()        将焦点从窗口移除  
    window.focus()       将焦点移至窗口    
  ◆Kit: 
    ★系统对话框:其外观由操作系统或浏览器决定 
      显示alert、confirm、prompt对话框时代码会停止执行,关掉后再恢复执行 
    alert(str)    提示对话框  
      显示对话框的时候代码会停止执行,关掉后恢复
    confirm(str)  bol,用户确认对话框,确定返回'true',取消返回'false' 
    prompt("提示文字","默认输入文字")  str,用户输入框对话框,返回输入字符或 null   
    print()    打印对话框,异步显示 
    find(str)  网页字符查找,异步显示 [IE不支持] 
    ★base64编码&解码 
      Example:
        当服务器数据库中保存的是图片的二进制数据及图片文件的格式时,根据此二进制数据来渲染图片
        <input type="file" id="file"/>
        <input type="button" value="读取图像" onclick="readPicture()" id="btnReadPicture"/>
        <div id="result"></div>
        if(typeof FileReader == 'undefined') {
          result.innerHTML = "抱歉,你的浏览器不支持FileReader";
        }
        function readPicture(){
          // 检查是否为图像类型
          var fileObj = document.getElementById("file").files[0];
          if(!/image\/\w+/.test(fileObj.type)) {
            alert("请确保文件类型为图像类型");
            return false;
          }
          var reader = new FileReader();
          reader.readAsBinaryString(fileObj); // 将文件以二进制文件读入页面中
          reader.onload = function(f){
            var result = document.getElementById("result");
            var src = "data:" + fileObj.type + ";base64," + window.btoa(this.result);
            result.innerHTML = '<img src ="'+src+'"/>';
          }
        }
        
        使用canvas绘制一张图片后,点击上传
        首先通过canvas元素的'toDataURL'方法获取该图片的url地址,
        然后获取该URL地址中的base64格式的字符串,
        最后使用atob方法将其解码为一串二进制数据,并将该二进制数据提交到服务器端
        <input type="button" value="上传图片" onclick="imgSave()"/><br/>
        <canvas id="canvas" width="400" height="300"></canvas>
        var canvas;
        function draw(id) {
          canvas = document.getElementById(id);
          var context = canvas.getContext('2d');
          context.fillStyle = 'rgb(0,0,255)';
          context.fillRect(0,0,canvas.width,canvas.height);
          context.fillStyle = 'rgb(255,255,0)';
          context.fillRect(10,20,50,50);
        }
        draw('canvas');
        function imgSave(){
          var data = canvas.toDataURL("image/png");
          data = data.replace("data:image/png;base64,","");
          var xhr = new XMLHttpRequest();
          xhr.open("POST","uploadImg.php");
          xhr.send(window.atob(data));
        }
    btoa(btStr)  str,base64编码处理,返回base64字符串[HTML5 IE10+] 
      btStr  二进制数据组成的Unicode字符串 
    atob(bs64Str)  str,base64解码处理[HTML5 IE10+] 
      PS:返回二进制数据组成的Unicode字符串
        由于一些网络通讯协议的限制,必须使用该方法对原数据进行编码后,才能进行发送.
        接收方使用相当于 window.atob 的方法对接受到的base64数据进行解码,得到原数据.
        DOM Level 0 规范
      bs64Str  经过base64编码后的字符串 
      Example:
        var encodedData = window.btoa("Hello, world"); // 编码 ,SGVsbG8sIHdvcmxk
        var decodedData = window.atob(encodedData);    // 解码 ,Hello, world
      Unicode 字符串 
        在各浏览器中,使用 window.btoa 对Unicode字符串进行编码都会触发一个字符越界的异常.
        先把Unicode字符串转换为UTF-8 编码,可以解决这个问题
        function utf8_to_b64( str ) {
          return window.btoa(unescape(encodeURIComponent( str )));
        }
        function b64_to_utf8( str ) {
          return decodeURIComponent(escape(window.atob( str )));
        }

        // Usage:
        utf8_to_b64('? à la mode');          // "4pyTIMOgIGxhIG1vZGU="
        b64_to_utf8('4pyTIMOgIGxhIG1vZGU='); // "? à la mode"
        在js引擎内部, encodeURIComponent(str) 相当于 escape(unicodeToUTF8(str)) 
        所以可以推导出 unicodeToUTF8(str) 等同于 unescape(encodeURIComponent(str))
    ★其他接口 
    getSelection()  Selection,
    toStaticHTML(HTMLStr) str,返回经过处理后的版本[IE专属][IE8+] 
      从原HTML中删除所有脚本节点和事件处理程序属性 
  其他属性方法 
    window.offscreenBuffering bol,用于绘制新窗口内容并在完成后复制已存在的内容,控制屏幕更新
    window.frameElement   
    window.external 
    window.clientInformation 
    window.defaultstatus   
    window.isSecureContext   
  ◆事件相关 
    window.onerror 见:Event 
    window.onstorage   Storage事件[仅IE支持] 
      修改 localStorage 或 sessionStorage 时触发
    window.onload
    window.ononline   网络从离线变成在线时触发,不冒泡[HTML5]   
    window.onoffline  网络从在线变成离线时触发[HTML5]   
    onabort    
    onblur    
    oncancel    
    oncanplay    
    oncanplaythrough    
    onchange    
    onanimationend    
    onanimationiteration    
    onanimationstart    
    onsearch    
    ontransitionend    
    onwebkitanimationend    
    onwebkitanimationiteration    
    onwebkitanimationstart    
    onwebkittransitionend    
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
    onfocus    
    oninput    
    oninvalid    
    onkeydown    
    onkeypress    
    onkeyup    
    onload    
    onloadeddata    
    onloadedmetadata    
    onloadstart    
    onmousedown    
    onmouseenter    
    onmouseleave    
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
    onstalled    
    onsubmit    
    onsuspend    
    ontimeupdate    
    ontoggle    
    onvolumechange    
    onwaiting    
    onwheel    
    ongotpointercapture    
    onlostpointercapture    
    onpointerdown    
    onpointermove    
    onpointerup    
    onpointercancel    
    onpointerover    
    onpointerout    
    onpointerenter    
    onpointerleave    
    onbeforeunload    
    onhashchange    
    onlanguagechange    
    onmessage    
    onmessageerror    
    onpagehide    
    onpageshow    
    onpopstate    
    onrejectionhandled    
    onunhandledrejection    
    onunload    
    onappinstalled    
    onbeforeinstallprompt    
    ondevicemotion    
    ondeviceorientation    
    ondeviceorientationabsolute    
    onauxclick    
  stop()    
  requestIdleCallback()    
  cancelIdleCallback()    
  captureEvents()    
  releaseEvents()    
  getComputedStyle()    
  matchMedia()    
  getMatchedCSSRules()    
  webkitRequestAnimationFrame()    
  webkitCancelAnimationFrame()    
  createImageBitmap()    
  openDatabase()  
  待整理 
    StyleMedia 
    ByteLengthQueuingStrategy 
    CountQueuingStrategy 
    ReadableStream 
    WritableStream 
    SpeechSynthesisUtterance 
    RemotePlayback 
    PushSubscriptionOptions 
    PushSubscription 
    PushManager 
    PresentationReceiver
    PresentationConnectionList
    PresentationRequest
    PresentationConnectionCloseEvent
    PresentationConnectionAvailableEvent 
    PresentationConnection
    PresentationAvailability
    Presentation
    PermissionStatus
    Permissions
    PaymentResponse
    PaymentRequestUpdateEvent
    PaymentRequest
    PaymentAddress
    CanvasCaptureMediaStreamTrack
    PhotoCapabilities
    ImageCapture
    BudgetService
    BroadcastChannel
    XSLTProcessor
    VisualViewport
    SharedWorker
    PerformancePaintTiming
    PerformanceObserverEntryList
    PerformanceObserver
    PerformanceNavigationTiming
    IntersectionObserverEntry
    IntersectionObserver
    StaticRange
    DOMRectReadOnly
    DOMRect
    DOMQuad
    DOMPointReadOnly
    DOMPoint
    DOMMatrixReadOnly
    DOMMatrix
    WaveShaperNode
    TextEncoder
    TextDecoder
    SyncManager
    SubtleCrypto
    StorageManager
    StereoPannerNode
    SourceBufferList
    SourceBuffer
    ServiceWorkerRegistration
    ServiceWorkerContainer
    ServiceWorker
    ScriptProcessorNode
    ScreenOrientation
    Response
    Request
    RTCStatsReport
    RTCSessionDescription
    RTCRtpReceiver
    RTCRtpContributingSource
    RTCPeerConnectionIceEvent
    RTCPeerConnection
    RTCIceCandidate
    RTCDataChannelEvent
    RTCDataChannel
    RTCCertificate
    Plugin
    PluginArray
    PeriodicWave
    PannerNode
    OscillatorNode
    OfflineAudioContext
    OfflineAudioCompletionEvent
    NetworkInformation
    NavigationPreloadManager
    MimeType
    MimeTypeArray
    MIDIPort
    MIDIOutputMap
    MIDIOutput
    MIDIMessageEvent
    MIDIInputMap
    MIDIInput
    MIDIAccess
    ImageBitmapRenderingContext
    IIRFilterNode
    Headers
    Gamepad
    GamepadButton
    GainNode
    EventSource
    DynamicsCompressorNode
    DelayNode
    DOMError
    CryptoKey
    Crypto
    ConvolverNode
    ConstantSourceNode
    ChannelSplitterNode
    ChannelMergerNode
    CanvasRenderingContext2D
    CacheStorage
    Cache
    BiquadFilterNode
    BeforeInstallPromptEvent
    BatteryManager
    BaseAudioContext
    Audio 
    AudioScheduledSourceNode
    AudioParam
    AudioNode
    AudioListener
    AudioDestinationNode
    AudioContext
    AudioBufferSourceNode
    AudioBuffer
    AnalyserNode
    XPathResult
    XPathExpression
    XPathEvaluator
    ValidityState
    VTTCue
    URLSearchParams
    TransitionEvent
    TouchList
    Touch
    TimeRanges
    TextTrackList
    TextTrackCueList
    TextTrackCue
    TextTrack
    TextMetrics
    TaskAttributionTiming
    ShadowRoot
    SecurityPolicyViolationEvent
    RadioNodeList
    PromiseRejectionEvent
    ProcessingInstruction
    PerformanceResourceTiming
    PerformanceMeasure
    PerformanceMark
    PerformanceLongTaskTiming
    PerformanceEntry
    PageTransitionEvent
    NodeFilter
    MutationRecord
    MessagePort
    MessageChannel
    InputDeviceCapabilities
    ImageData
    ImageBitmap
    IdleDeadline
    HashChangeEvent
    FontFace
    DOMParser
    DOMException
    CustomElementRegistry
    CompositionEvent
    ClipboardEvent
    CSSViewportRule
    CSSSupportsRule
    CSSPageRule
    CSSNamespaceRule
    CSSMediaRule
    CSSKeyframesRule
    CSSKeyframeRule
    CSSImportRule
    CSSGroupingRule
    CSSFontFaceRule
    CSSConditionRule
    CDATASection
    BeforeUnloadEvent 
    ApplicationCacheErrorEvent 
    AnimationEvent
    SpeechSynthesis
    SharedArrayBuffer 
    Atomics 
    WebAssembly 
window.frames,框架集,包含页面所有框架的window对象 
  PS: 一个网页/窗口中可能包含多个框架,每个框架都有自己的window对象  
  console.log(window.frames===window); // true,同时也是页面的window: 
  window.frames[idx]  通过下标获取框架的window[从0开始,从左至右,从上至下]  
  window.frames[name] 通过框架的'name'属性获取框架的window  
window.document, 
  Member: 
    document.location  等价于 window.location 
      console.log(document.location===window.location); // true 
Navigator,客户端识别 
  Extend: Object 
  Instance: window.navigator 
  Proto: 
    ◆系统相关
    .platform  所在系统平台,如 "Win32"
    ◆浏览器相关 
    .vendor   浏览器品牌 [IE不支持]
    .vendorSub   有关供应商的次要信息 [IE和Chrome不支持] 
    .language   浏览器的主语言 [IE11+] 
      'zh-CN'
      'en'
      'en-US'
    .mimeTypes  在浏览器中注册的MIME类型集合 
    .plugins    浏览器安装的插件信息集合 [IE11+] 
      navigator.plugins.refresh([bol])  刷新插件或刷新页面 
      var plug = navigator.plugins[i];
      plug.name        // 插件名
      plug.filename    // 插件的磁盘文件名
      plug.length      // 插件所处理的MIME 类型数量
      plug.description // 插件的描述信息 
      IE浏览器控件检测 
        IE是以COM对象的方式实现插件的,而COM对象使用唯一标识符来表示 
        Example:
        检测IE是否安装flash控件
        flash的标识符是 ShckwaveFlash.ShockwaveFlash
        function hasIEPlugin(name){
          try{
            new ActiveXObject(name)
            // 此处的name表示的是控件的唯一标识符id
            return true;
          }catch(e){
            return false;
          }
        }
        console.log(hasIEPlugin('ShockwaveFlash.ShockwaveFlash'));
    .cookieEnabled  bol,浏览器是否启用cookie 
      启用cookie返回true,否则返回false
      cookieEnabled属性说明
        通常可以在浏览器的临时文件夹中保存一个文件,
        此文件可以包含用户信息(比如浏览过什么页面,是否选择了自动登录)等,
        这个文件被称作cookie,
        通过cookieEnabled属性可以判断浏览器是否启用了此功能
    .javaEnabled()  bol,浏览器是否启用Java 
    .vibrate()     设备震动 [HTML5] 
      PS:Vibration接口用于在浏览器中发出命令,使得设备振动.
        显然,这个API主要针对手机,适用场合是向用户发出提示或警告,游戏中尤其会大量使用.
        由于振动操作很耗电,在低电量时最好取消该操作.
      使用下面的代码检查该接口是否可用.
        目前,只有Chrome和Firefox的Android平台最新版本支持它.
        navigator.vibrate = navigator.vibrate
          || navigator.webkitVibrate
          || navigator.mozVibrate
          || navigator.msVibrate;
        if (navigator.vibrate) {
          // 支持
        }
      navigator.vibrate(num/arr);  震动
        num 数值,振动持续的毫秒数
        arr 数组,间时震动,表示振动的模式.
          偶数位置的数组成员表示振动的毫秒数,奇数位置的数组成员表示等待的毫秒数.
          navigator.vibrate([500, 300, 100]);
          表示,设备先振动500毫秒,然后等待300毫秒,再接着振动100毫秒.
        vibrate是一个非阻塞式的操作,即手机振动的同时,JavaScript代码继续向下运行.
        停止振动: 将0毫秒或者一个空数组传入vibrate方法.
          navigator.vibrate(0);
          navigator.vibrate([]);
        持续震动: 可使用setInterval不断调用vibrate.
          var vibrateInterval;
          function startVibrate(duration) {
            navigator.vibrate(duration);
          }
          function stopVibrate() {
            if(vibrateInterval) clearInterval(vibrateInterval);
            navigator.vibrate(0);
          }
          function startPeristentVibrate(duration, interval) {
            vibrateInterval = setInterval(function() {
              startVibrate(duration);
            }, interval);
          }
    .permissions 
    .permissions.query()   许可查询 [HTML5] 
      PS:很多操作需要用户许可,比如脚本想要知道用户的位置,或者操作用户机器上的摄像头.
        Permissions API就是用来查询某个接口的许可情况.
      // 查询地理位置接口的许可情况
      navigator.permissions.query({ name: 'geolocation' })
      .then(function(result) {
        // 状态为 prompt,表示查询地理位置时,
        // 用户会得到提示,是否许可本次查询
        /* result.status = "prompt" */
  
        // 状态为 granted,表示用户已经给予了许可
        /* result.status = "granted" */
      });
      有了这个API,就可以自动查询用户的态度.
      当用户已经明确拒绝的时候,就可以不必再次询问用户许可了.
    .battery     电池API,针对移动设备用于检测设备的电池信息 [HTML5] 
      var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;
      battery.charging;
      battery.level;
      battery.dischargingTime;
      battery.addEventListener("chargingchange",function(e){
      })
    ◆状态相关 
    .onLine   bol,是否联网[IE6+]  
    不常用  
      .credentials 
      .presentation 
      .storage 
      .userAgent    用户代理字符串
        console.log(navigator.userAgent);
        // "Mozilla/5.0(Windows NT 10.0; WOW64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36",谷歌浏览器
      .appCodeName  浏览器名称
        PS: 通常为'Mozilla',即使非Mozilla浏览器 
        console.log(navigator.appCodeName); // Mozilla,Chrome中结果  
      .appName      浏览器名称,不能精确区分浏览器 
        console.log(navigator.appName); // Netscape,Chrome中结果 
      .appMinorVersion 次版本信息 [Chrome不支持]
      .appVersion      浏览器版本,一般不与实际版本对应 
        console.log(navigator.appVersion); 
        // 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36,Chrome中结果 
      .buildID         浏览器编译版本 [Chrome不支持] 
      .product         产品名称,通常为'Gecko'
      .productSub      产品的次要信息,如Gecko的版本 [IE不支持]
      .oscpu      客户端计算机的操作系统或CPU [Chrome和IE不支持]
      .cpuClass   CPU类型 [Chrome不支持]
      .systemLanguage  操作系统的语言 [Chrome不支持]
      .userLanguage    操作系统的默认语言 [IE5+] [Chrome不支持]
      .userProfile   借以访问用户个人信息的对象 [Chrome不支持]
      .maxTouchPoints  
      .hardwareConcurrency  
      .languages  
      .doNotTrack  
      .mediaDevices  
      .connection  
      .webkitTemporaryStorage  
      .webkitPersistentStorage  
      .serviceWorker  
      .getBattery()    
      .sendBeacon()    
      .getGamepads()    
      .webkitGetUserMedia()    
      .requestMIDIAccess()    
      .getUserMedia()    
      .unregisterProtocolHandler()    
      .requestMediaKeySystemAccess()  
      .preference()  设置用户的首选项 [Chrome不支持]
      .registerContentHandler() 针对特定的MIME类型将一个站点注册为处理程序[Chrome不支持]
      .registerProtocolHandler() 针对特定的协议将一个站点注册为处理程序[Chrome不支持] 
      .opsProfile     [已废弃]    
      .securityPolicy [已废弃]  
      .taintEnabled() [已废弃] 
  Expand: 
    客户端检测总结: JavaScript高级程序设计 228 页 
    var client = function(){
      var engine = { //呈现引擎
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        //完整的版本号
        ver: null
      };
      var browser = { //浏览器
        //主要浏览器
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,
        //具体的版本号
        ver: null
      };
      var system = { //平台、设备和操作系统
        win: false,
        mac: false,
        x11: false,
        //移动设备
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,
        //游戏系统
        wii: false,
        ps: false
      };
      //检测呈现引擎和浏览器
      var ua = navigator.userAgent;
      if (window.opera){
        engine.ver = browser.ver = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);
      } 
      else if (/AppleWebKit\/(\S+)/.test(ua)){
        engine.ver = RegExp["$1"];
        engine.webkit = parseFloat(engine.ver);
        //确定是Chrome 还是Safari
        if (/Chrome\/(\S+)/.test(ua)){
          browser.ver = RegExp["$1"];
          browser.chrome = parseFloat(browser.ver);
        } 
        else if (/Version\/(\S+)/.test(ua)){
          browser.ver = RegExp["$1"];
          browser.safari = parseFloat(browser.ver);
        } 
        else {
          //近似地确定版本号
          var safariVersion = 1;
          if (engine.webkit < 100){
            safariVersion = 1;
          } 
          else if (engine.webkit < 312){
            safariVersion = 1.2;
          } 
          else if (engine.webkit < 412){
            safariVersion = 1.3;
          } 
          else {
            safariVersion = 2;
          }
          browser.safari = browser.ver = safariVersion;
        }
      } 
      else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
        engine.ver = browser.ver = RegExp["$1"];
        engine.khtml = browser.konq = parseFloat(engine.ver);
      } 
      else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
        engine.ver = RegExp["$1"];
        engine.gecko = parseFloat(engine.ver);
        //确定是不是Firefox
        if (/Firefox\/(\S+)/.test(ua)){
          browser.ver = RegExp["$1"];
          browser.firefox = parseFloat(browser.ver);
        }
      } 
      else if (/MSIE ([^;]+)/.test(ua)){
        engine.ver = browser.ver = RegExp["$1"];
        engine.ie = browser.ie = parseFloat(engine.ver);
      }
      //检测浏览器
      browser.ie = engine.ie;
      browser.opera = engine.opera;
      //检测平台
      var p = navigator.platform;
      system.win = p.indexOf("Win") == 0;
      system.mac = p.indexOf("Mac") == 0;
      system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
      //检测Windows 操作系统
      if (system.win){
        if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
          if (RegExp["$1"] == "NT"){
            switch(RegExp["$2"]){
              case "5.0":
              system.win = "2000";
              break;
              case "5.1":
              system.win = "XP";
              break;
              case "6.0":
              system.win = "Vista";
              break;
              case "6.1":
              system.win = "7";
              break;
              default:
              system.win = "NT";
              break;
            }
          } 
          else if (RegExp["$1"] == "9x"){
            system.win = "ME";
          } 
          else {
            system.win = RegExp["$1"];
          }
        }
      }
      //移动设备
      system.iphone = ua.indexOf("iPhone") > -1;
      system.ipod = ua.indexOf("iPod") > -1;
      system.ipad = ua.indexOf("iPad") > -1;
      system.nokiaN = ua.indexOf("NokiaN") > -1;
      //windows mobile
      if (system.win == "CE"){
        system.winMobile = system.win;
      } 
      else if (system.win == "Ph"){
        if(/Windows Phone OS (\d+.\d+)/.test(ua)){;
          system.win = "Phone";
          system.winMobile = parseFloat(RegExp["$1"]);
        }
      }
      //检测iOS 版本
      if (system.mac && ua.indexOf("Mobile") > -1){
        if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
          system.ios = parseFloat(RegExp.$1.replace("_", "."));
        } 
        else {
          system.ios = 2; //不能真正检测出来,所以只能猜测
        }
      }
      //检测Android 版本
      if (/Android (\d+\.\d+)/.test(ua)){
        system.android = parseFloat(RegExp.$1);
      }
      //游戏系统
      system.wii = ua.indexOf("Wii") > -1;
      system.ps = /playstation/i.test(ua);
      //返回这些对象
      return {
        engine: engine,
        browser: browser,
        system: system
      };
    }();
Location, 
  Extend: Object 
  Instance: window.location 
window.location,管理URL 
  PS: 修改URL都会生成一条历史记录[可前进后退], 且除hash外,页面也都会重载 
    存在 Location 构造函数,但 location 的属性/方法都存在对象中,而非其原型中 
  console.log(document.location === window.location); // true 
  Member: 
    .href   读写,整个url 
      Example: 
      location.href = 'https://www.baidu.com'; // 当前网页跳转到百度
    .protocol  协议[通常是 http: 或 https:]
    .host  读写,主机名:端口名[省略默认的80端口]
    .hostname  读写,主机名/服务器名
    .port  读写,端口号[若url中不包含端口号则返回'']
    .pathname  读写,路径名(URL中的目录和文件名)
    .search  读写,URL的查询字符串[以问号?开头的部分,包括?] 
      Example:
      'https://www.baidu.com/?key1=val1&key2=val2'
      location.search;   // "?key1=val1&key2=val2"
    .hash  读写URL锚点部分[#后面的部分][若无返回'']
    .ancestorOrigins  DOMStringList,
    .origin  
    .assign(url)  导航页面,并产生一条历史记录  
      location.assign('https://www.baidu.com')    // 跳转到百度主页
      对 window.location location.href 赋值则调用assign方法实现跳转  
    .replace(url)  导航页面,不产生历史记录 
      Example: :
      location.replace('https://www.baidu.com'); // 跳转到百度
    .reload([bol]) 重载当前页面 
      PS: 位于 reload() 之后的代码不一定会执行,取决于网络延迟或系统资源等因素,
        故推荐将其置于代码最后一行 
      bol  是否无缓存重载,默认 false
    .toString()  DOMString,包含整个URL
      和读取 .href 的效果相同,但不能够修改Location的值 
    .valueOf()  
window.fetch(),用来取代XMLHttpRequest的一种新规范 [IE不支持] 
  PS: XMLHttpRequest对象,输入、输出状态都在同一接口管理,容易导致代码混乱;
    Fetch主要有两个特点,一是接口合理化,Ajax是将所有不同性质的接口都放在XHR对象上,
    而Fetch是将它们分散在几个不同的对象上,设计更合理;
    二是Fetch操作返回Promise对象,避免了嵌套的回调函数.
  检查浏览器是否部署 Fetch API
    if (fetch in window){ /* 支持 */ } 
    else { /* 不支持 */ }
  Example: []
    fetch(url).then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      console.log(jsonData);
    })
    .catch(function () {
      console.log('出错了');
    });
    
    fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'name=TG&love=1'
    })
    .then(function(response){})
  stream数据流
    数据传送是以数据流stream的形式进行的.
    对于大文件,数据是一段一段得到的.
    Example:
      response.text().then(function (responseText) {
        console.log(responseText);
      }
      上面代码中的text(),其实就是一个数据流读取器,并使用指定格式解读.
    Fetch API提供以下五个数据流读取器.
    .text()        返回字符串
    .json()        返回一个JSON对象
    .formData()    返回一个FormData对象
    .blob()        返回一个blob对象
    .arrayBuffer() 返回一个二进制数组
    数据流只能读取一次,一旦读取,数据流就空了.
    再次读取就不会得到结果.
    解决方法是在读取之前,先使用.clone()方法,复制一份一模一样的副本.
    
    var url = 'LargeFile.txt';
    var progress = 0;
    var contentLength = 0;
    
    fetch(url).then(function (response) {
      // 本次请求总的数据长度
      contentLength = response.headers.get('Content-Length');
      var getStream = function (reader) {
        return reader.read().then(function (result) {
          // 若数据已经读取完毕,直接返回
          if (result.done) { return; }
          
          // 取出本段数据(二进制格式)
          var chunk = result.value;
          
          var text = '';
          // 假定数据是UTF-8编码,前三字节是数据头,
          // 而且每个字符占据一个字节(即都为英文字符)
          for (var i = 3; i < chunk.byteLength; i++) {
            text += String.fromCharCode(chunk[i]);
          }
          
          // 将本段数据追加到网页之中
          document.getElementById('content').innerHTML += text;
          
          // 计算当前进度
          progress += chunk.byteLength;
          console.log(((progress / contentLength) * 100) + '%');
          
          // 递归处理下一段数据
          return getStream(reader);
        };
      };
      return getStream(response.body.getReader());
    })
    .catch(function (error) {
      console.log(error);
    });
    上面代码中,response.body.getReader()返回的就是数据流之中的一段.
    上面这样的数据流处理,可以提高网站性能表现,减少内存占用,
    对于请求大文件或者网速慢的场景相当有用.
    传统的XMLHTTPRequest对象不支持数据流,所有的数据必须放在缓存里,
    等到全部拿到后,再一次性吐出来.    
  fetch() 方法
    第一个参数可以是URL字符串,也可以是Request对象实例 
    Fetch方法返回一个Promise对象,并将一个response对象传给回调函数 
    response 对象
      response.ok 属性
        若返回的状态码在200到299之间(即请求成功),这个属性为true,否则为false 
        因此,判断请求是否成功的代码可以写成下面这样 
    
    fetch('./api/some.json').then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
        });
      } 
      else {
        console.log('请求失败,状态码为', response.status);
      }
    }
    , function(err) {
      console.log('出错:', err);
    });
    response对象除了json方法,还包含了服务器HTTP回应的元数据 
    
    fetch('users.json').then(function(response) {
      console.log(response.headers.get('Content-Type'));
      console.log(response.headers.get('Date'));
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.type);
      console.log(response.url);
    });
    上面代码中,response对象有很多属性,
    其中的 response.type 属性比较特别,表示HTTP回应的类型,它有以下三个值 
    basic:正常的同域请求
    cors:CORS机制下的跨域请求
    opaque:非CORS机制下的跨域请求,这时无法读取返回的数据,也无法判断是否请求成功
    若需要在CORS机制下发出跨域请求,需要指明状态 
    fetch('http://some-site.com/cors-enabled/some.json', {mode: 'cors'})
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      console.log('Request successful', text);
    })
    .catch(function(error) {
      log('Request failed', error)
    });
    除了指定模式,fetch方法的第二个参数还可以用来配置其他值,
    比如指定cookie连同HTTP请求一起发出 
    fetch(url, { credentials: 'include' })
    
    发出POST请求的写法如下 
    fetch("http://www.example.org/submit.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "firstName=Nikhil&favColor=blue&password=easytoguess"
    })
    .then(function(res) {
      if (res.ok) {
        console.log("Perfect! Your settings are saved.");
      } 
      else if (res.status == 401) {
        console.log("Oops! You are not authorized.");
      }
    }
    , function(e) {
      console.log("Error submitting form!");
    });
    目前,还有一些XMLHttpRequest对象可以做到,但是Fetch API还没做到的地方,
    比如中途中断HTTP请求,以及获取HTTP请求的进度 
    这些不足与Fetch返回的是Promise对象有关     
  Headers
    Fetch API引入三个新的对象(也是构造函数):Headers, Request和Response 
    其中,Headers对象用来构造/读取HTTP数据包的头信息 
    
    var content = 'Hello World';
    var headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "text/plain");
    headers.append("Content-Length", content.length.toString());
    headers.append("X-Custom-Header", "ProcessThisImmediately");
    Headers对象的实例,除了使用append方法添加属性,也可以直接通过构造函数一次性生成 
    
    reqHeaders = new Headers({
      "Content-Type": "text/plain",
      "Content-Length": content.length.toString(),
      "X-Custom-Header": "ProcessThisImmediately",
    });
    Headers对象实例还提供了一些工具方法 
    
    reqHeaders.has("Content-Type") // true
    reqHeaders.has("Set-Cookie") // false
    reqHeaders.set("Content-Type", "text/html")
    reqHeaders.append("X-Custom-Header", "AnotherValue")
    
    reqHeaders.get("Content-Length") // 11
    reqHeaders.getAll("X-Custom-Header") // ["ProcessThisImmediately", "AnotherValue"]
    
    reqHeaders.delete("X-Custom-Header")
    reqHeaders.getAll("X-Custom-Header") // []
    生成Header实例以后,可以将它作为第二个参数,传入Request方法 
    
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    var request = new Request(URL, {headers: headers});
    
    fetch(request).then(function(response) {
      console.log(response.headers);
    });
    同样地,Headers实例可以用来构造Response方法 
    
    var headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=3600'
    });
    
    var response = new Response(
      JSON.stringify({photos: {photo: []}}),
      {'status': 200, headers: headers}
    );
    
    response.json().then(function(json) {
      insertPhotos(json);
    });
    上面代码中,构造了一个HTTP回应 
    目前,浏览器构造HTTP回应没有太大用处,但是随着Service Worker的部署,
    不久浏览器就可以向Service Worker发出HTTP回应     
  Request 对象,用来构造HTTP请求 
    var req = new Request(url,options); 
      var uploadReq = new Request("/uploadImage", {
        method: "POST",
        headers: {
          "Content-Type": "image/png",
        },
        body: "image data"
      });
    .method  
    .url  
    .headers  
    .referrer  
    .referrerPolicy  
    .mode  
    .credentials  
    .redirect  
    .integrity  
    .bodyUsed  
    .clone()  
    .arrayBuffer()  
    .blob()  
    .formData()  
    .json()  
    .text()  
    req.method // "GET"
    req.url // "http://example.com/index.html"
    下面是另一个例子 
    
    var req = new Request(URL, {method: 'GET', cache: 'reload'});
    fetch(req).then(function(response) {
      return response.json();
    })
    .then(function(json) {
      someOperator(json);
    });
    上面代码中,指定请求方法为GET,并且要求浏览器不得缓存response 
    
    Request对象实例有两个属性是只读的,不能手动设置 
    一个是referrer属性,表示请求的来源,由浏览器设置,有可能是空字符串 
    另一个是context属性,表示请求发出的上下文,
    若是image,表示是从img标签发出,
    若是worker,表示是从worker脚本发出,若是fetch,表示是从fetch函数发出的 
    Request对象实例的mode属性,用来设置是否跨域,合法的值有以下三种:
      same-origin、
      no-cors(默认值)、
      cors 
      当设置为same-origin时,只能向同域的URL发出请求,否则会报错 
    
    var arbitraryUrl = document.getElementById("url-input").value;
    fetch(arbitraryUrl, { mode: "same-origin" })
    .then(function(res) {
      console.log("Response succeeded?", res.ok);
    }
    ,function(e) {
      console.log("Please enter a same-origin URL!");
    });
    上面代码中,若用户输入的URL不是同域的,将会报错,否则就会发出请求 
    
    若mode属性为no-cors,就与默认的浏览器行为没有不同,
    类似script标签加载外部脚本文件、img标签加载外部图片 
    若mode属性为cors,就可以向部署了CORS机制的服务器,发出跨域请求 
    
    var u = new URLSearchParams();
    u.append('method', 'flickr.interestingness.getList');
    u.append('api_key', '<insert api key here>');
    u.append('format', 'json');
    u.append('nojsoncallback', '1');
    
    var apiCall = fetch('https://api.flickr.com/services/rest?' + u);
    
    apiCall.then(function(response) {
      return response.json().then(function(json) {
        // photo is a list of photos.
        return json.photos.photo;
      });
    })
    .then(function(photos) {
      photos.forEach(function(photo) {
        console.log(photo.title);
      });
    });
    上面代码是向Flickr API发出图片请求的例子 
    
    Request对象的一个很有用的功能,是在其他Request实例的基础上,生成新的Request实例 
    
    var postReq = new Request(req, {method: 'POST'});    
  Response 
    fetch方法返回Response对象实例,它有以下属性 
    
    status:整数值,表示状态码(比如200)
    statusText:字符串,表示状态信息,默认是“OK”
    ok:布尔值,表示状态码是否在200-299 的范围内
    headers:Headers对象,表示HTTP回应的头信息
    url:字符串,表示HTTP请求的网址
    type:字符串,合法的值有五个basic、cors、default、error、opaque basic表示正常的同域请求;cors表示CORS机制的跨域请求;error表示网络出错,无法取得信息,status属性为0,headers属性为空,并且导致fetch函数返回Promise对象被拒绝;opaque表示非CORS机制的跨域请求,受到严格限制 
    Response对象还有两个静态方法 
    
    Response.error() 返回一个type属性为error的Response对象实例
    Response.redirect(url, status) 返回的Response对象实例会重定向到另一个URL
    fetch("https://example.com", init)
    .then(function (response) {
    // Check that the response is a 200
      if (response.status === 200) {
        alert("Content type: " + response.headers.get('Content-Type'));
      }
    });
  body属性 
    Request对象和Response对象都有body属性,表示请求的内容 body属性可能是以下的数据类型 
    
    ArrayBuffer
    ArrayBufferView (Uint8Array等)
    Blob/File
    string
    URLSearchParams
    FormData
    var form = new FormData(document.getElementById('login-form'));
    fetch("/login", {
      method: "POST",
      body: form
    })
    上面代码中,Request对象的body属性为表单数据 
    
    Request对象和Response对象都提供以下方法,用来读取body 
    
    arrayBuffer()
    blob()
    json()
    text()
    formData()
    注意,上面这些方法都只能使用一次,第二次使用就会报错,也就是说,body属性只能读取一次 Request对象和Response对象都有bodyUsed属性,返回一个布尔值,表示body是否被读取过 
    
    var res = new Response("one time use");
    console.log(res.bodyUsed); // false
    res.text().then(function(v) {
      console.log(res.bodyUsed); // true
    });
    console.log(res.bodyUsed); // true
    
    res.text().catch(function(e) {
      console.log("Tried to read already consumed Response");
    });
    上面代码中,第二次通过text方法读取Response对象实例的body时,就会报错 
    
    这是因为body属性是一个stream对象,数据只能单向传送一次 这样的设计是为了允许JavaScript处理视频、音频这样的大型文件 
    
    若希望多次使用body属性,可以使用Response对象和Request对象的clone方法 它必须在body还没有读取前调用,返回一个新的body,也就是说,需要使用几次body,就要调用几次clone方法 
    
    addEventListener('fetch', function(evt) {
      var sheep = new Response("Dolly");
      console.log(sheep.bodyUsed); // false
      var clone = sheep.clone();
      console.log(clone.bodyUsed); // false
    
      clone.text();
      console.log(sheep.bodyUsed); // false
      console.log(clone.bodyUsed); // true
    
      evt.respondWith(cache.add(sheep.clone()).then(function(e) {
        return sheep;
      });
    });    
Performance,当前页面与性能相关信息  
  Extend: EventTarget 
  Proto: 
    .onresourcetimingbufferfull  触发'resourcetimingbufferfull'事件时调用 
    .onwebkitresourcetimingbufferfull 
    .timing  PerformanceTiming,包含各种时间戳,不同的事件会产生不同的时间值 [IE10+] 
      PS: 可全面了解页面在被加载到浏览器的过程中都经历的时间 
      .navigationStart   开始导航到当前页面的时间 
      .unloadEventStart  前一个页面的'unload'事件开始的时间 
        只有在前一个页面与当前页面来自同一个域时这个属性才会有值;否则,值为0 
      .unloadEventEnd    前一个页面的'unload'事件结束的时间 
        但只有在前一个页面与当前页面来自同一个域时这个属性才会有值;否则,值为0 
      .redirectStart     到当前页面的重定向开始的时间 
        但只有在重定向的页面来自同一个域时这个属性才会有值;否则,值为0 
      .redirectEnd       到当前页面的重定向结束的时间 
        但只有在重定向的页面来自同一个域时这个属性才会有值;否则,值为0  
      .fetchStart        开始通过HTTP GET 取得页面的时间 
      .domainLookupStart 开始查询当前页面DNS的时间 
      .domainLookupEnd   查询当前页面DNS结束的时间 
      .connectStart      浏览器尝试连接服务器的时间 
      .connectEnd        浏览器成功连接到服务器的时间 
      .secureConnectionStart 浏览器尝试以SSL 方式连接服务器的时间 
        不使用SSL方式连接时,这个属性的值为0 
      .requestStart      浏览器开始请求页面的时间 
      .responseStart     浏览器接收到页面第一字节的时间 
      .responseEnd       浏览器接收到页面所有内容的时间 
      .domLoading        document.readyState 变为"loading"的时间 
      .domInteractive    document.readyState 变为"interactive"的时间 
      .domContentLoadedEventStart  发生DOMContentLoaded 事件的时间 
      .domContentLoadedEventEnd    DOMContentLoaded事件已经发生且执行完所有事件处理程序的时间 
      .domComplete       document.readyState 变为"complete"的时间 
      .loadEventStart    发生load 事件的时间 
      .loadEventEnd      load 事件已经发生且执行完所有事件处理程序的时间 
    .navigation   PerformanceNavigation,与页面导航相关 
    .memory     获取基本内存使用情况 [Chrome的非标准扩展] 
    .now()      DOMHighResTimeStamp,从参考时刻开始经过的毫秒量       
    .getEntries()  返回一个 PerformanceEntry 对象的列表,基于给定的 filter
    .getEntriesByType()  返回一个 PerformanceEntry 对象的列表,基于给定的 entry type
    .getEntriesByName()  返回一个 PerformanceEntry 对象的列表,基于给定的 name 和 entry type
    .clearResourceTimings()  
      移除所有的 entryType 是 "resource" 的 performance entries,从浏览器的性能数据缓冲区中
    .setResourceTimingBufferSize() 
      将浏览器的资源 timing 缓冲区的大小设置为 "resource" type performance entry 对象的指定数量    
    .webkitClearResourceTimings() 
    .webkitSetResourceTimingBufferSize() 
    .mark()  在浏览器的性能输入缓冲区中创建一个 timestamp,基于给定的 name
    .clearMarks() 移除给定的 mark,从浏览器的性能输入缓冲区中
    .measure() 
      在浏览器的指定 start mark 和 end mark 间的性能输入缓冲区中创建一个指定的 timestamp
    .clearMeasures()  移除给定的 measure,从浏览器的性能输入缓冲区中
  Instance: window.performance  
PerformanceNavigation,页面导航相关信息 
  Static: 
    .TYPE_NAVIGATE      0 
    .TYPE_RELOAD        1 
    .TYPE_BACK_FORWARD  2 
  Proto: 
    .TYPE_NAVIGATE      0 
    .TYPE_RELOAD        1 
    .TYPE_BACK_FORWARD  2 
    .TYPE_RESERVED      255 
    .type            num,上次发生的导航类型 
      0  页面第一次加载,对应.TYPE_NAVIGATE 
      1  页面重载过,对应.TYPE_RELOAD  
      2  页面通过'后退'或'前进'打开的,对应.TYPE_BACK_FORWARD 
    .redirectCount   num,页面加载前的重定向次 
PerformanceTiming,包含延迟相关的性能信息  
History,历史记录对象,从窗口被打开的那一刻算起  
  PS: 基于安全考虑,其他的window中得不到用户浏览过的URL,但可在其中进行选择; 
  Extend: Object 
  Instance: window.history 
  Proto: 
    .length             历史记录数量 
      对于加载到窗口、标签页或框架中的第一个页面而言,history.length 为 0;
      当页面的URL改变时,包括hash的改变,就会生成一条历史记录,
      因此,设置 location.hash; 会在浏览器中生成一条新的历史记录
    .state              当前历史记录的状态对象 
    .scrollRestoration  
    .forward()        前进一条记录,相当于浏览器的前进按钮 
    .0           后退一条记录,相当于浏览器的后退按钮 
    .go(num/str)      在历史记录中跳转 
      num  正数,表示向前进num个记录,负数,表示向后退num个记录,0 相当于刷新当前页 
      str  为字符串时,跳转到历史记录中包含该字符串的第一个位置
        可能前进也可能后退,决定于那个位置最近 
        若历史记录中不包含该字符串则什么也不做 
    .pushState(state,title,path)    增加当前记录[不会跳转][HTML5][IE10+] 
      PS: 只增加历史记录,而不跳转页面,相当于增加当前页面的一个状态; 
      state  obj,自定义的会与指定网址关联的状态对象,一般用于传递信息  
        popstate事件触发时,该对象的副本为 e.state  
      title  str,新页面的标题,目前未有浏览器实现该功能 
      path   新页面的地址,浏览器的地址栏将显示这个网址  
        可以是路径,如:/box
        也可以是字符串,如:?c=1&b=2
      Example:
        history.pushState(null,'a','/abcd')
    .replaceState(state,title,path) 替换当前记录[不会跳转][HTML5] 
      和pushState类似,但不是增加而是替换 
[Geolocation API] [HTML5] 
  PS: 地理定位能够在用户同意后访问到用户当前的位置信息 
  navigator.geolocation   Geolocation,地理定位对象 
  Geolocation[仅在IE中可直接访问],地理定位 [IE9+]   
    PS: 在地理定位API中,使用小数值来表示经纬度[西经和南纬都用负数表示]
      浏览器通过 蜂窝电话、Wi-Fi、GPS、ip地址 等任意一种途径来获取位置信息
    Relate:  navigator.geolocation.constructor 间接访问 
    Proto: 
      .getCurrentPosition( // 发起授权请求并执行相应的回调 
        // PS: 会触发请求用户共享地理定位信息的对话框 
          // 现在只会在安全的上下文触发,如使用https协议的网页 
        function(e){  // 浏览器能成功确定位置时调用 
          e    Position, 
        }
        ,function(e){ // 可选,无法确定位置[如用户拒绝授权时]时调用
          e   PositionError, 
        }
        ,{ // 可选,设置定位的参数  
          enableHighAccuracy: true // 是否高精度,默认:false
          ,timeout: 5000           // 超时时限,默认:Infinity,单位:ms
          ,maximumAge: 600         // 缓存时限,不缓存:0,只读取缓存:infinity,单位:ms
        }
      )    
      .watchPosition(  // numId,监听位置变化  
        PS: 位置改变时调用成功处理程序,
        function(e){
          e    Position, 
        }
        ,function(e){
          e   PositionError, 
        }
        ,{
        }
      ) 
      .clearWatch(watchId) 取消watchPosition监听
    Expand: 
      检查是否支持该接口 
        if (navigator.geolocation) {
          // 支持
        }
        else {
          // 不支持
        }
      单位转换 
        可使用一下函数将使用度、分、秒表示的经纬度转换为小数
          function degreesToDecimal(degrees,minutes,seconds){
            return degrees +(minutes / 60 ) +(seconds / 3600);
          }
      'Google Maps API' [非HTML5规范]
        该 API 未提供可视化表示工具,使用第三方工具 Google Maps(非HTML5规范)
        引入 API 放置在 HTML head中
          <script src="http://maps.google.com/maps/api/js?sensor=true"></script>
          sensor=true 表示代码中用到自己的位置;若不用自己位置可设置为false
  Position[NdA], 
    Extend: Object 
    Proto: 
      .coords   Coordinates,  
      .timestamp  时间戳 
  Coordinates[NdA], 
    Extend: Object 
    Proto: 
      .latitude    十进制表示的纬度 
      .longitude   十进制表示的经度 
      .accuracy    经纬度坐标精度,单位:m 
      以下属性支持与否取决于设备,桌面浏览器一般没有
      .altitude      海拔高度,不存在则为 null,单位:m
      .altitudeAccuracy  海拔高度的精度,数值越小精度越高,单位:m 
      .heading    方向,0°表示正北,NaN 表示没有检测到数据 
      .speed     速度,未检测到则为 null,单位:m/s 
  PositionError[NdA], 
    Extend: Object 
    Proto: 
      .code    错误码 
        0  Unknown error 
        1  用户拒绝授权   
        2  无法定位       
        3  超时响应       
      .message 错误信息 
      常量 
        .PERMISSION_DENIED    num,1  
        .POSITION_UNAVAILABLE num,2  
        .TIMEOUT              num,3  
Screen,用户屏幕相关 
  PS: 基本上只用来表明客户端的能力,每个浏览器中的screen对象包含的属性不尽相同; 
  Extend: Object 
  Instance: window.screen 
  Proto: 
    .availWidth/.availHeight  屏幕可用宽/高度[不包含系统部件的占用] 
    .width/.height  num,屏幕宽/高度,单位px 
    .availLeft/.availTop  num,未被系统部件占用的左/上方的像素值 
      PS: 一般为0,当系统任务栏在左/上方时,则为任务栏的高度 
    .colorDepth  num,用于表现颜色的位数,值一般为 16、24、32 
    .pixelDepth  屏幕的位深 
    .orientation  
    .bufferDepth 读写用于呈现屏外位图的位数 [Chrome不支持]
    .deviceYDPI 屏幕实际的垂直DPI [Chrome不支持]
    .deviceXDPI 屏幕实际的水平DPI [Chrome不支持]
    .fontSmoothingEnabled 是否启用了字体平滑 [Chrome不支持]
    .left   当前屏幕距左边的像素距离 [Chrome不支持] 
    .top    当前屏幕距上边的像素距离 [Chrome不支持] 
    .logicalXDPI 屏幕逻辑的水平DPI [Chrome不支持] 
    .logicalYDPI 屏幕逻辑的垂直DPI [Chrome不支持] 
    .updateInterval 读写,屏幕刷新时间间隔,单位ms 
Storage,本地存储[IE8+][HTML5] 
  PS: 只能存储字符串,当存取的内容比较复杂时,可用JSON处理 
    各浏览器间数据独立 
  Extend: Object 
    console.log(Storage.prototype.__proto__.constructor===Object); // true 
  Instance: window.localStorage & window.localStorage  
    console.log(localStorage.constructor===Storage);   // true 
    console.log(sessionStorage.constructor===Storage); // true 
    window.localStorage   永久本地存储 
      PS: 永不失效除非手动删除;每个来源5M左右[DiBs];
      .xx      读写,自定义属性 
        只能存字符串,对象类型需JSON化存入[SlPt]
        Example:
        localStorage.XX;   //"abc"
        localStorage;       //Storage {name: "abc", length: 1}
        
        localStorage.yy = {};
        console.log(localStorage.yy,typeof localStorage.yy);
        // [object Object] string
      Feature: 
        子域名间或子域名和主域名间不共享;
        不同协议、端口间不共享;
        不同窗口间可共享;
        本质是在读写文件,数据多的话会比较卡,firefox会一次性将数据导入内存,
        不能被爬虫爬取,不要用它完全取代URL传参,
        隐私模式下不可读取 
          以采用 window.name 模拟sessionStorage的方式处理
          因为 window.name 是可做保存的,这个也是其解决跨域方案的原因
      Example: 保存网页状态的原理说明 
        储存信息
          将有变化的内容信息存在一个对象a中,
          通过JSON序列化(当存取的内容复杂时使用JSON来辅助处理)后存到 localstorage.XX 中;
        还原信息
          当关闭网页后下次加载时,通过JSON将 localstorage.XX 中的字符串反序列化成对象a
        还原页面
          通过函数添加HTML元素和a中的信息,还原上次的网页状态.
    window.sessionStorage 临时本地存储
      浏览器关闭时失效,刷新网页并不会失效   
      在当前窗口共享[只要属于同源即可],但新打开的窗口无法获取 
      所以对多页面应用有限制 
  Proto: 
    .length        num,项目条数 
    .key(idx)      str,获取键名 
      console.log(localStorage); // Storage {aoo: "a", boo: "b", length: 2}
      localStorage.key(0); // "aoo"
    .getItem(key)     str,获取对应键的值 
    .setItem(key,val) 键值对形式存值 
    .removeItem(key)  删除条目  
    .clear()          清除所有数据 
    .remainingSpace   num,剩余的可用空间的字节数[仅IE支持] 
  Question: 
    IE中localStorage中存在问题 ?
CSS,CSS相关的方法[IE不支持]   
  PS: 一个工具接口,无法创建该类型的对象,其内部只定义了静态方法 
  Extend: Object 
  Static: 
    .supports()  检测浏览器是否支持CSS的某些功能  
      bol = CSS.supports(propertyName, value);
      bol = CSS.supports(supportCondition);
      Example:
      console.log(CSS.supports("display", "flex")); // true 
    .escape()    
URLSearchParams,处理URL中的查询字符串[IE不支持] 
  Extend: Object 
  Instance: var params = new URLSearchParams('key1=val1&key2=val2');
  Proto: 
    .has(key)        bol,是否具有该参数
    .get(key)        指定参数的值 
    .getAll(key)     arr,成员为指定参数的所有值 
    .delete()        删除指定参数 
    .set(key,val)    设置指定参数 
    .append(key,val) 在查询字符串之中,追加一个键值对 
      params.append('key2','val2')
      console.log(params.toString()); // key1=val1&key2=val2&key2=val2 
    .sort()     
    .keys()      遍历所有参数名 
      for (var key of params.keys()) {
        console.log(key);
      }
    .values()    遍历所有参数值 
      for (var val of params.values()) {
        console.log(val);
      }
    .entries()   遍历所有参数的键值对 
      for (var pair of params.entries()) {
        console.log(pair[0]+ ', '+ pair[1]);
      }
    .forEach()   
    .toString()  返回整个查询字符串 
  Feature: 
    在Chrome浏览器之中,URLSearchParams实例本身就是Iterator对象,
      与entries方法返回值相同 
      for (var p of searchParams) {
        console.log(p);
      }
    URLSearchParams实例可当作POST数据发送,所有数据都会URL编码 
MutationObserver,观察者对象[IE11+] 
  PS: 能在某个范围内的DOM树发生变化时作出适当反应的能力 
    该API设计用来替换掉在DOM3事件规范中引入的Mutation事件 
  Extend: Object 
  Instance: 
    new MutationObserver(function(arr,self){ 
      PS: 回调函数会在指定的DOM节点[目标节点]发生变化时被调用
      arr   若干个 MutationRecord 对象的数组 
      self  该观察者对象本身
    })
  Proto: 
    .observe(node,{  // 观察目标节点注册,目标节点或其后代节点发生DOM变化时收到通知 
      PS: 向一个元素添加 observer 和 addEventListener 类似
        同一元素多次使用相同的配置注册观察,仅第一次生效,
        若不同的配置则取配置的并集,若回调对象不同,则同时多个观察者
      // 用来配置观察者对象行为的对象 
      // childList,attributes,或 characterData 三者至少有一个为 true
      childList: bol   // 是否需要观察子节点的增删
        PS: 不包括除子节点的后代节点 
      ,attributes: bol // 是否需要观察目标节点的属性节点变化[增删改]
      ,characterData:bol // 目标节点为characterData节点时,是否也要观察其文本内容的变化 
        characterData节点:一种抽象接口,具体可以为文本节点,注释节点,以及处理指令节点 
      ,subtree: bol  //  是否观察目标节点所有后代节点的上述三种节点变化 
      ,attributeOldValue: bol // 是否在MutationRecord对象的oldValue中记录attributes值 
        PS: attributes为true前提下
      ,characterDataOldValue: bol // 是否在MutationRecord对象的oldValue中记录characterData文本内容 
        PS: 在characterData属性已经设为true的前提下 
      ,attributeFilter: [ // 要观察的属性名的数组
        PS: 只有该数组中包含的属性名发生变化时才会被观察到 
      ] 
    })     
    .disconnect()  停止观测 
    .takeRecords() 清空观察者对象的记录队列,并返回里面的内容.
      返回一个包含了MutationRecord对象的数组 
MutationRecord,变动记录对象 
  Expand: Object 
  Instance: 作为第一个参数的成员传递给观察者对象的回调函数 
  Proto: 
    .type  str,发生变化的类型 
      'attributes'     属性发生变化 
      'characterData'  CharacterData节点发生变化 
      'childList'     目标节点的子节点发生了变化 
    .target  Node,此次变化影响到的节点
      具体返回那种节点类型是根据type值的不同而不同的. 
      如果type为attributes,则返回发生变化的属性节点所在的元素节点,
      如果type值为characterData,则返回发生变化的这个characterData节点.
      如果type为childList,则返回发生变化的子节点的父节点.
    .addedNodes  NodeList,被添加的节点,或 null 
    .removedNodes  NodeList,被删除的节点,或 null 
    .previousSibling  Node,被添加或被删除的节点的前一个兄弟节点,或 null 
    .nextSibling  Node,被添加或被删除的节点的后一个兄弟节点,或 null 
    .attributeName  str,变更属性的本地名称,或 null 
    .attributeNamespace  str,变更属性的命名空间,或 null 
    .oldValue  str,之前的值
      根据type值的不同,返回的值也会不同.
      如果type为 attributes,则返回该属性变化之前的属性值.
      如果type为characterData,则返回该节点变化之前的文本数据.
      如果type为childList,则返回null.
Notification,浏览器通知接口[HTML5][DiBs] 
  PS: 可在用户的桌面,而非网页上显示通知信息, 
    桌面电脑和手机都适用,比如通知用户收到了一封Email。
    具体的实现形式由浏览器自行部署,对于手机来说,一般显示在顶部的通知栏。
    若网页代码调用这个API,浏览器会询问用户是否接受。
    只有在用户同意的情况下,通知信息才会显示。
  Feature: 
    浏览器兼容性检测 
      目前,Chrome和Firefox在桌面端部署了这个API,
      Firefox和Blackberry在手机端部署了这个API; 
      if (window.Notification) {
        console.log('该浏览器支持Notification接口');
      } 
      else {
        console.log('该浏览器不支持Notification接口');
      }
  Static: 
    .permission  str,用户给予的权限状态  
      'default' 用户还没有做出许可,因此不会弹出通知 
      'granted' 用户明确同意接收通知 
      'denied'  用户明确拒绝接收通知 
    .maxActions  num, 
    .requestPermission(function(status){  // 获取用户授权 
      // status 用户授权状态  
      Example: 若用户拒绝接收通知,用alert方法代替 
        Notification.requestPermission(function (status) {
          if (status === "granted") {
            var n = new Notification("Hi!");
          } 
          else {
            alert("Hi!");
          }
        });
    })  
  Instance: 
    var notice = new Notification(title [,options]);  生成一条通知
      title   str,用来指定通知的标题
      options -- { // 可选,用来设定各种设置 
        dir: kw,  // 文字方向
          'auto'
          'ltr'  从左到右
          'rtl'  从右到左
        lang: kw, // 使用的语种
          'en-US'
          'zh-CN'
          ...
        body: str, // 通知内容,用来进一步说明通知的目的 
        tag: str, // 通知的ID 
          一组相同tag的通知,不会同时显示,只会在用户关闭前一个通知后,在原位置显示 
        icon: url // 图表的URL,用来显示在通知上
      }
    Example:
      var notice = new Notification('收到新邮件', {
        body: '您总共有3封未读邮件。'
      });
      notice.title // "收到新邮件"
      notice.body // "您总共有3封未读邮件。"
      notice.title  通知标题
      notice.body   通知内容
  Proto: 
    .title 
    .dir 
    .lang 
    .body 
    .tag 
    .icon 
    .vibrate 
    .timestamp 
    .renotify 
    .silent 
    .requireInteraction 
    .data 
    .actions 
    .badge 
    .image 
    .close()  关闭通知 
      var n = new Notification("Hi!");
      // 手动关闭
      n.close();
      // 自动关闭
      n.onshow = function () { 
        setTimeout(n.close.bind(n), 5000); 
      }
      不能从通知的close事件,判断是否为用户手动关闭 
    ★Evt: 
    .onshow  通知显示给用户时触发
    .onclick 用户点击通知时触发
    .onclose 用户关闭通知时触发
    .onerror 通知出错时触发,大多数发生在通知无法正确显示时 
  Example:
    当前浏览器支持Notification对象,并当前用户准许使用该对象,
    然后调用 Notification.requestPermission 方法,向用户弹出一条通知。
    if(window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission(function(status) {
        var n = new Notification('通知标题', { body: '这里是通知内容!'}); 
      });
    }
console,用于调试的控制台对象 
  PS: 提供对浏览器控制台的接入,不同浏览器上可能存在差异  
    由IE的JScript引擎提供的调试工具,后来逐渐成为浏览器的事实标准 
    NodeJS沿用了这个标准,提供与习惯行为一致的console对象,
    用于向标准输出流(stdout)或标准错误流(stderr)输出字符.
  Member: 
    .log([val1][, ...])   在控制台输出若干个数据 
      格式占位符[DiBs] 
        PS: log方法将占位符替换以后的内容,显示在console窗口
        %s     字符串
        %d     整数
        %i     整数
        %f     浮点数
        %o     对象的链接
        %c     CSS格式字符串 
          对输出的内容进行CSS渲染
          console.log('%c%s','color:red;font-size:24px;','abc');
          输出的内容将显示为红色的24px的字体
        Example:
          console.log("%s + %s = %s", 1, 1, 2);  //  1 + 1 = 2
          console.log("访问地址为 http://%s:%s",host,port) 
          function colorLog(arg){  // 带颜色输出 
            console.log("%c%s","background:#afffee",arg)
          }
    .info([val][, ...])   在控制台输出若干个信息性消息 
      这个命令与 console.log 差别并不大,
      除了在chrome中只会输出文字外,其余的会显示一个蓝色的惊叹号.
    .error([val1][, ...]) 在控制台输出若干个错误消息 
      控制台在出现错误时会显示是红色的叉子.
    .warn([val1][, ...])  在控制台输出若干个警告消息 
      控制台出现有黄色的惊叹号 
    .clear()    清空控制台,光标回到第一行 
    .trace(msg) 当前执行的代码在堆栈中的调用路径 
      PS: 给待测试的函数中加入 console.trace() 就行了 
      msg   str,标识信息 
    .dir(obj[,options])  优化对对象的输出,单参数输出 
      PS: 以易于阅读的形式显示,可读性较好,一般用于输出显示DOM节点
      Node中可指定以高亮形式输出 
        console.dir(obj,{color:true})
    .table(val)   以表格形式显示,单参数输出 
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
    .count([counterName])   计数器,输出被调用的次数 
      counterName  str,计数器名称,默认:"" 
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
    ◆用于记录time和timeEnd间经历的时间,可计算一个操作所花费的准确时间 
      Example:
        console.time('aoo');
        var array = new Array(1000000);
        for(var i = array.length - 1; i >= 0; i--) {
          array[i] = new Object();
        };
        console.timeEnd("aoo"); 
        // aoo: 214.47802734375ms 
    .time(timerName)     计时器开始计时 
      timerName  str,计时器名称 
    .timeEnd(timerName)  计时器结束计时并输出 
      timerName  str,计时器名称 
    ◆分组显示,在group和groupEnd间输出的信息作为一个'组'
      PS: 在输出大量信息时有用 
    .group([val1,val2,...])  '组'的开始 
    .groupEnd()              '组'的结束 
    ◆性能测试
    .profile()     
    .profileEnd()   
    ◆其他 
    .assert([bool][,val]) 用于判断某个表达式或变量是否为真 
      PS:接收两个参数,第一个参数是表达式,第二个参数是字符串.
        只有当第一个参数为false,才会输出第二个参数,否则不会有任何结果.
      bool  布尔值,默认为false 
      Example:
        若为假,则显示一条事先指定的错误信息
        console.assert(true === false,"判断条件不成立")
        // Assertion failed: 判断条件不成立
        判断子节点的个数是否大于等于500.
        console.assert(list.childNodes.length < 500, "节点个数大于等于500")
    .dirxml()  以目录树形式显示DOM节点 
      若参数不是DOM节点,则等同于dir
    .debug(val)     Chrome不支持? 
  Expand: 
    修改/定义console方法 
      因为console对象的所有方法,都可以被覆盖
      
      使用自定义的console.log方法,在显示结果添加当前时间
      ["log", "info", "error"].forEach(function(method) {
        console[method] = console[method].bind(console,new Date().toISOString());
      });
      console.log("出错了！");
      // 2014-05-18T09:00.000Z 出错了！
  Feature: 
    控制台打开时,console的方法才会执行,且打印方法有运行较慢  
      var startTime = performance.now()
      for (var check = 0; check < 1000; check++){
        console.log(check);
      }
      if (performance.now() - startTime > 200){ 
        // 打开控制台会打印会弹窗,否则不弹窗 
        alert("打开了控制台"); 
      }
    控制台打印元素时,控制台会获取元素的id值 
      var div = document.createElement('div');
      Object.defineProperty(div,"id", {get: () => {
        alert("控制台打开了");
      }});
      console.log(div);
Performance,当前页面加载相关的性能信息 
  PS: 用于精确度量、控制、增强浏览器的性能表现;精度可达千分之一毫秒  
    还可获取后台事件的时间进度 
    浏览器支持: IE10+、Chrome20+、Firefox15+、Opera15+ 
  Extend: EventTarget 
    console.log(Performance.prototype.__proto__.constructor===EventTarget);
  Example: 获取脚本运行的准确耗时 
    传统的做法: 
    var start = new Date().getTime();
    // do something here
    var now = new Date().getTime();
    var latency = now - start;
    console.log("任务运行时间:" + latency);
    不足之处: 
    精度: 只能精确到毫秒级别 
    局限: 无法获取一些后台事件的时间进度,如浏览器从服务器加载网页的时间  
  performance.timing  包含了各种与浏览器性能有关的时间数据   
    PS: 提供浏览器处理网页各个阶段的耗时。
    以下属性全部为只读
    navigationStart  当前浏览器窗口的前一个网页关闭,发生unload事件时的Unix毫秒时间戳 
      若没有前一个网页,则等于'fetchStart'属性。
      performance.timing.navigationStart   // 13260687
      表示距离浏览器开始处理当前网页,已经过了13260687毫秒
    unloadEventStart 若前一个网页与当前网页属于同一个域名,则返回前一个网页的unload事件发生时的Unix毫秒时间戳。
      若没有前一个网页,或者之前的网页跳转不是在同一个域名内,则返回值为0。
    unloadEventEnd   若前一个网页与当前网页属于同一个域名,则返回前一个网页unload事件的回调函数结束时的Unix毫秒时间戳。
      若没有前一个网页,或者之前的网页跳转不是在同一个域名内,则返回值为0。
    redirectStart    返回第一个HTTP跳转开始时的Unix毫秒时间戳。
      若没有跳转,或者不是同一个域名内部的跳转,则返回值为0。
    redirectEnd      返回最后一个HTTP跳转结束时,即跳转回应的最后一个字节接受完成时的Unix毫秒时间戳。
      若没有跳转,或者不是同一个域名内部的跳转,则返回值为0。
    fetchStart:返回浏览器准备使用HTTP请求读取文档时的Unix毫秒时间戳。该事件在网页查询本地缓存之前发生。
    domainLookupStart:返回域名查询开始时的Unix毫秒时间戳。若使用持久连接,或者信息是从本地缓存获取的,则返回值等同于fetchStart属性的值。
    domainLookupEnd:返回域名查询结束时的Unix毫秒时间戳。若使用持久连接,或者信息是从本地缓存获取的,则返回值等同于fetchStart属性的值。
    connectStart:返回HTTP请求开始向服务器发送时的Unix毫秒时间戳。若使用持久连接(persistent connection),则返回值等同于fetchStart属性的值。
    connectEnd:返回浏览器与服务器之间的连接建立时的Unix毫秒时间戳。若建立的是持久连接,则返回值等同于fetchStart属性的值。连接建立指的是所有握手和认证过程全部结束。
    secureConnectionStart:返回浏览器与服务器开始安全链接的握手时的Unix毫秒时间戳。若当前网页不要求安全连接,则返回0。
    requestStart:返回浏览器向服务器发出HTTP请求时(或开始读取本地缓存时)的Unix毫秒时间戳。
    responseStart:返回浏览器从服务器收到(或从本地缓存读取)第一个字节时的Unix毫秒时间戳。
    responseEnd:返回浏览器从服务器收到(或从本地缓存读取)最后一个字节时(若在此之前HTTP连接已经关闭,则返回关闭时)的Unix毫秒时间戳。
    domLoading:返回当前网页DOM结构开始解析时(即Document.readyState属性变为“loading”、相应的readystatechange事件触发时)的Unix毫秒时间戳。
    domInteractive:返回当前网页DOM结构结束解析、开始加载内嵌资源时(即Document.readyState属性变为“interactive”、相应的readystatechange事件触发时)的Unix毫秒时间戳。
    domContentLoadedEventStart:返回当前网页DOMContentLoaded事件发生时(即DOM结构解析完毕、所有脚本开始运行时)的Unix毫秒时间戳。
    domContentLoadedEventEnd:返回当前网页所有需要执行的脚本执行完成时的Unix毫秒时间戳。
    domComplete:返回当前网页DOM结构生成时(即Document.readyState属性变为“complete”,以及相应的readystatechange事件发生时)的Unix毫秒时间戳。
    loadEventStart:返回当前网页load事件的回调函数开始时的Unix毫秒时间戳。若该事件还没有发生,返回0。
    loadEventEnd:返回当前网页load事件的回调函数运行结束时的Unix毫秒时间戳。若该事件还没有发生,返回0。
  Example:
    var t = performance.timing;
    var pageloadtime = t.loadEventStart - t.navigationStart; 
    //页面加载的耗时
    var dns = t.domainLookupEnd - t.domainLookupStart; 
    // 域名解析的耗时
    var tcp = t.connectEnd - t.connectStart; 
    //TCP连接的耗时
    var ttfb = t.responseStart - t.navigationStart;
    // 读取页面第一个字节之前的耗时
  待整理
    根据上面这些属性,可以计算出网页加载各个阶段的耗时。比如,网页加载整个过程的耗时的计算方法如下:
    
    
    var t = performance.timing; 
    var pageLoadTime = t.loadEventEnd - t.navigationStart;
    
    performance.now()
    performance.now方法返回当前网页自从performance.timing.navigationStart到当前时间之间的微秒数(毫秒的千分之一)。也就是说,它的精度可以达到100万分之一秒。
    
    performance.now() 
    // 23493457.476999998
    
    Date.now() - (performance.timing.navigationStart + performance.now())
    // -0.64306640625
    上面代码表示,performance.timing.navigationStart加上performance.now(),近似等于Date.now(),也就是说,Date.now()可以替代performance.now()。但是,前者返回的是毫秒,后者返回的是微秒,所以后者的精度比前者高1000倍。
    
    通过两次调用performance.now方法,可以得到间隔的准确时间,用来衡量某种操作的耗时。
    
    var start = performance.now();
    doTasks();
    var end = performance.now();
    
    console.log('耗时:' + (end - start) + '微秒。');
    performance.mark()
    mark方法用于为相应的视点做标记。
    
    window.performance.mark('mark_fully_loaded');
    clearMarks方法用于清除标记,若不加参数,就表示清除所有标记。
    
    window.peformance.clearMarks('mark_fully_loaded');
    
    window.performance.clearMarks();
    performance.getEntries()
    浏览器获取网页时,会对网页中每一个对象(脚本文件、样式表、图片文件等等)发出一个HTTP请求。performance.getEntries方法以数组形式,返回这些请求的时间统计信息,有多少个请求,返回数组就会有多少个成员。
    
    由于该方法与浏览器处理网页的过程相关,所以只能在浏览器中使用。
    
    
    window.performance.getEntries()[0]
    
    // PerformanceResourceTiming { 
    //   responseEnd: 4121.6200000017125, 
    //   responseStart: 4120.0690000005125, 
    //   requestStart: 3315.355000002455, 
    //   ...
    // }
    
    上面代码返回第一个HTTP请求(即网页的HTML源码)的时间统计信息。该信息以一个高精度时间戳的对象形式返回,每个属性的单位是微秒(microsecond),即百万分之一秒。
    
    performance.navigation对象
    除了时间信息,performance还可以提供一些用户行为信息,主要都存放在performance.navigation对象上面。
    
    它有两个属性:
    
    (1)performance.navigation.type
    
    该属性返回一个整数值,表示网页的加载来源,可能有以下4种情况:
    
    0:网页通过点击链接、地址栏输入、表单提交、脚本操作等方式加载,相当于常数performance.navigation.TYPE_NAVIGATENEXT。
    
    1:网页通过“重新加载”按钮或者location.reload()方法加载,相当于常数performance.navigation.TYPE_RELOAD。
    
    2:网页通过“前进”或“后退”按钮加载,相当于常数performance.navigation.TYPE_BACK_FORWARD。
    
    255:任何其他来源的加载,相当于常数performance.navigation.TYPE_UNDEFINED。
    
    (2)performance.navigation.redirectCount
    
    该属性表示当前网页经过了多少次重定向跳转。  
-------------------------------------------------------------------------待整理 


