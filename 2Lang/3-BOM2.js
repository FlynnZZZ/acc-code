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
    ★延时调用&间时调用&动画调用API 
      JS引擎单线程,异步事件排队等待被执行,不会在同时执行两条命令 
    setTimeout(foo/str,num [,arg1,arg2...])  numId,指定时间后回调  
      PS: 实际执行的时间大于等于定时器设置的值  
        被延时执行的代码会被从同步任务队列放置到异步执行队列,并开始计时
        异步队列会在同步队列所有代码执行完,JS引擎空闲后,
        在计时结束时,开始执行延时代码.
        若异步队列在执行的时被阻塞了,那么它将会被推迟到下一个可能的执行点,
      foo 回调函数 
      str 字符串代码,有解析功能相当于eval 
        不推荐此种写法,容易出错,不易扩展,损失性能
        setTimeout("alert('abc')",2000);  // 2秒后执行代码块
      num 延时的时间,单位ms,默认:0
        范围: 1-2147483647,超过该范围,自动改为 1
      arg 可选,传入回调函数的参数 
        setTimeout(function(arg){
          console.log(arguments); // ["abc", callee: ƒ, Symbol(Symbol.iterator): ƒ] 
          console.log(arg);      // abc 
        },1000,'abc')
      指定的时间表示何时将定时器的代码添加到队列,而非何时实际执行代码 
        Example:
        console.log(1);
        setTimeout(function() {console.log('a')}, 9);
        setTimeout(function() {console.log('b')}, 3);
        setTimeout(function() {console.log('c')}, 0);
        var sum = 0;
        for(var i = 0; i < 1000000; i ++) { sum += 1; }
        console.log(sum);
        setTimeout(function() {console.log('d');}, 0);
        // 1 → 1000000 → c → b → d → a
      使用'setTimeout'仿造'setInterval' 
        后一间歇调用可能会在前一间歇调用结束前启动? 
        Example: 
        function interval(foo,time,conditionFoo,isFirst) {
          // foo  fn,待执行的函数 
          // time  num,间隔时间 
          // conditionFoo fn,终止条件,根据其返回值判断 
          // isFirst  bol,是否首次运行 
          var args = arguments
          ,num = time;
          if (isFirst) { num = 0 }
          setTimeout(function(){
            foo();
            if (!conditionFoo()) {
              setTimeout(function(){
                args.callee(foo,time,conditionFoo,isFirst)
              },time)
            }
          },num)
        }
    clearTimeout(id) 通过返回id值解除延时调用 
      Example:
      var aoo=setTimeout(function(){ alert("abc");},2000);
      console.log(aoo);  // 50500,延时调用的id值
      clearTimeout(aoo); // 取消调用
      等价于
      clearTimeout(50500);
      但此种写法可能存在问题,因为id值可能会变,非一直为定值
    setInterval(foo/str,num [,arg1,arg2...]) numId,每隔指定时间回调  
      PS: 实际执行时间尽量接近指定值[可多可少]  
        依次向异步列队中添加延时调用,
        每个延时调用分别计时,不会互相影响.
        当只有第n个延时被阻塞且阻塞时间小于间隔时间,
        则n-1 到 n 的间隔时间大于指定间隔时间, n 到 n+1 小于间隔时间.
        当阻塞时间大于间隔时间,则前面的调用被抛弃且立即调用下次,
      foo 回调函数 
      str 字符串代码,有解析功能相当于eval
      num 间隔时间,单位:ms 
      arg 可选,传入回调函数的参数 
      保证间时最接近指定值 
        console.log(1)
        var siId = setInterval(function() {
          var date = new Date();
          console.log(date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds());
        }, 10);
        var sum = 0;
        for(var i = 0; i < 10000000; i ++) { sum += i; }
        console.log(2);
        // 清除定时器,避免卡死浏览器
        setTimeout(function() { clearInterval(siId); }, 30);
        运行结果
        1
        2
        19:44:733
        19:44:750
        19:44:760
        19:44:770
    clearInterval(id) 通过返回id值解除间时调用 
      Example:
      var box=setInterval(function(){ alert("abc"); },1000);
      clearInterval(box); // 取消调用
      console.log(box);   // 1518 ,虽然已取消调用 但box值仍存在
    requestAnimationFrame(foo) numId,浏览器专门为动画提供的API 
      PS: 浏览器会自动优化方法的调用,如页面非激活状态下,动画会自动暂停,节省了CPU开销
        原理同setTimeout类似;通过递归调用同一方法来不断更新画面以达到动画效果;
      常用操作: 在函数体内使用 requestAnimationFrame 来调用该函数来实现效果 
      Example: 
      var n = 0;
      !function(){
        if (n<99) {
          ++n;
          requestAnimationFrame(arguments.callee)
          console.log(n);
        }
      }();
    cancelAnimationFrame(id)   通过返回ID值取消动画 
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
    window.ononline  网络从离线变成在线时触发,不冒泡[HTML5]   
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
    Worker
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
    PerformanceTiming
    PerformanceResourceTiming
    PerformanceNavigation
    PerformanceMeasure
    PerformanceMark
    PerformanceLongTaskTiming
    PerformanceEntry
    Performance
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
    .ancestorOrigins  DOMStringList,
    .origin  
    .toString() 
    .valueOf() 
window.document, 
  Member: 
    document.location  等价于 window.location 
      console.log(document.location===window.location); // true 
window.fetch(),用来取代XMLHttpRequest的一种新规范 [IE不支持] 
  PS: XMLHttpRequest对象,输入、输出状态都在同一接口管理,容易导致代码混乱;
    Fetch主要有两个特点,一是接口合理化,Ajax是将所有不同性质的接口都放在XHR对象上,
    而Fetch是将它们分散在几个不同的对象上,设计更合理；
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
    第一个参数可以是URL字符串,也可以是Request对象实例。
    Fetch方法返回一个Promise对象,并将一个response对象传给回调函数。
    response 对象
      response.ok 属性
        若返回的状态码在200到299之间(即请求成功),这个属性为true,否则为false。
        因此,判断请求是否成功的代码可以写成下面这样。
    
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
    response对象除了json方法,还包含了服务器HTTP回应的元数据。
    
    fetch('users.json').then(function(response) {
      console.log(response.headers.get('Content-Type'));
      console.log(response.headers.get('Date'));
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.type);
      console.log(response.url);
    });
    上面代码中,response对象有很多属性,
    其中的 response.type 属性比较特别,表示HTTP回应的类型,它有以下三个值。
    basic:正常的同域请求
    cors:CORS机制下的跨域请求
    opaque:非CORS机制下的跨域请求,这时无法读取返回的数据,也无法判断是否请求成功
    若需要在CORS机制下发出跨域请求,需要指明状态。
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
    比如指定cookie连同HTTP请求一起发出。
    fetch(url, { credentials: 'include' })
    
    发出POST请求的写法如下。
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
    比如中途中断HTTP请求,以及获取HTTP请求的进度。
    这些不足与Fetch返回的是Promise对象有关。    
  Headers
    Fetch API引入三个新的对象(也是构造函数):Headers, Request和Response。
    其中,Headers对象用来构造/读取HTTP数据包的头信息。
    
    var content = 'Hello World';
    var headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "text/plain");
    headers.append("Content-Length", content.length.toString());
    headers.append("X-Custom-Header", "ProcessThisImmediately");
    Headers对象的实例,除了使用append方法添加属性,也可以直接通过构造函数一次性生成。
    
    reqHeaders = new Headers({
      "Content-Type": "text/plain",
      "Content-Length": content.length.toString(),
      "X-Custom-Header": "ProcessThisImmediately",
    });
    Headers对象实例还提供了一些工具方法。
    
    reqHeaders.has("Content-Type") // true
    reqHeaders.has("Set-Cookie") // false
    reqHeaders.set("Content-Type", "text/html")
    reqHeaders.append("X-Custom-Header", "AnotherValue")
    
    reqHeaders.get("Content-Length") // 11
    reqHeaders.getAll("X-Custom-Header") // ["ProcessThisImmediately", "AnotherValue"]
    
    reqHeaders.delete("X-Custom-Header")
    reqHeaders.getAll("X-Custom-Header") // []
    生成Header实例以后,可以将它作为第二个参数,传入Request方法。
    
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    var request = new Request(URL, {headers: headers});
    
    fetch(request).then(function(response) {
      console.log(response.headers);
    });
    同样地,Headers实例可以用来构造Response方法。
    
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
    上面代码中,构造了一个HTTP回应。
    目前,浏览器构造HTTP回应没有太大用处,但是随着Service Worker的部署,
    不久浏览器就可以向Service Worker发出HTTP回应。    
  Request 对象,用来构造HTTP请求。
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
    下面是另一个例子。
    
    var req = new Request(URL, {method: 'GET', cache: 'reload'});
    fetch(req).then(function(response) {
      return response.json();
    })
    .then(function(json) {
      someOperator(json);
    });
    上面代码中,指定请求方法为GET,并且要求浏览器不得缓存response。
    
    Request对象实例有两个属性是只读的,不能手动设置。
    一个是referrer属性,表示请求的来源,由浏览器设置,有可能是空字符串。
    另一个是context属性,表示请求发出的上下文,
    若是image,表示是从img标签发出,
    若是worker,表示是从worker脚本发出,若是fetch,表示是从fetch函数发出的。
    Request对象实例的mode属性,用来设置是否跨域,合法的值有以下三种:
      same-origin、
      no-cors(默认值)、
      cors。
      当设置为same-origin时,只能向同域的URL发出请求,否则会报错。
    
    var arbitraryUrl = document.getElementById("url-input").value;
    fetch(arbitraryUrl, { mode: "same-origin" })
    .then(function(res) {
      console.log("Response succeeded?", res.ok);
    }
    ,function(e) {
      console.log("Please enter a same-origin URL!");
    });
    上面代码中,若用户输入的URL不是同域的,将会报错,否则就会发出请求。
    
    若mode属性为no-cors,就与默认的浏览器行为没有不同,
    类似script标签加载外部脚本文件、img标签加载外部图片。
    若mode属性为cors,就可以向部署了CORS机制的服务器,发出跨域请求。
    
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
    上面代码是向Flickr API发出图片请求的例子。
    
    Request对象的一个很有用的功能,是在其他Request实例的基础上,生成新的Request实例。
    
    var postReq = new Request(req, {method: 'POST'});    
  Response 
    fetch方法返回Response对象实例,它有以下属性。
    
    status:整数值,表示状态码(比如200)
    statusText:字符串,表示状态信息,默认是“OK”
    ok:布尔值,表示状态码是否在200-299 的范围内
    headers:Headers对象,表示HTTP回应的头信息
    url:字符串,表示HTTP请求的网址
    type:字符串,合法的值有五个basic、cors、default、error、opaque。basic表示正常的同域请求；cors表示CORS机制的跨域请求；error表示网络出错,无法取得信息,status属性为0,headers属性为空,并且导致fetch函数返回Promise对象被拒绝；opaque表示非CORS机制的跨域请求,受到严格限制。
    Response对象还有两个静态方法。
    
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
    Request对象和Response对象都有body属性,表示请求的内容。body属性可能是以下的数据类型。
    
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
    上面代码中,Request对象的body属性为表单数据。
    
    Request对象和Response对象都提供以下方法,用来读取body。
    
    arrayBuffer()
    blob()
    json()
    text()
    formData()
    注意,上面这些方法都只能使用一次,第二次使用就会报错,也就是说,body属性只能读取一次。Request对象和Response对象都有bodyUsed属性,返回一个布尔值,表示body是否被读取过。
    
    var res = new Response("one time use");
    console.log(res.bodyUsed); // false
    res.text().then(function(v) {
      console.log(res.bodyUsed); // true
    });
    console.log(res.bodyUsed); // true
    
    res.text().catch(function(e) {
      console.log("Tried to read already consumed Response");
    });
    上面代码中,第二次通过text方法读取Response对象实例的body时,就会报错。
    
    这是因为body属性是一个stream对象,数据只能单向传送一次。这样的设计是为了允许JavaScript处理视频、音频这样的大型文件。
    
    若希望多次使用body属性,可以使用Response对象和Request对象的clone方法。它必须在body还没有读取前调用,返回一个新的body,也就是说,需要使用几次body,就要调用几次clone方法。
    
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
console,用于调试的控制台对象  
  PS: 由IE的JScript引擎提供的调试工具,后来逐渐成为浏览器的事实标准 
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

