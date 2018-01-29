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
Geolocation[仅在IE中可直接访问],地理定位[HTML5][IE9+]   
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
        enableHighAccuracy:true, // 是否高精度,默认:false
        timeout:5000,            // 超时时限,默认:Infinity,单位:ms
        maximumAge:600    // 缓存时限,不缓存:0,只读取缓存:infinity,单位:ms
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
Intl, 
BarProp, 
  .locationbar   
  .menubar   
  .personalbar   
  .scrollbars   
  .statusbar   
  .toolbar   
USB相关 
  USBOutTransferResult 
  USBIsochronousOutTransferResult 
  USBIsochronousOutTransferPacket 
  USBIsochronousInTransferResult 
  USBIsochronousInTransferPacket 
  USBInTransferResult
  USBInterface
  USBEndpoint
  USBDevice
  USBConnectionEvent
  USBConfiguration
  USBAlternateInterface
  USB
SVG相关 
  SVGViewElement
  SVGUseElement
  SVGUnitTypes
  SVGTransformList
  SVGTransform
  SVGTitleElement
  SVGTextPositioningElement
  SVGTextPathElement
  SVGTextElement
  SVGTextContentElement
  SVGTSpanElement
  SVGSymbolElement
  SVGSwitchElement
  SVGStyleElement
  SVGStringList
  SVGStopElement
  SVGSetElement
  SVGScriptElement
  SVGSVGElement
  SVGRectElement
  SVGRect
  SVGRadialGradientElement
  SVGPreserveAspectRatio
  SVGPolylineElement
  SVGPolygonElement
  SVGPointList
  SVGPoint
  SVGPatternElement
  SVGPathElement
  SVGNumberList
  SVGNumber
  SVGMetadataElement
  SVGMatrix
  SVGMaskElement
  SVGMarkerElement
  SVGLinearGradientElement
  SVGLineElement
  SVGLengthList
  SVGLength
  SVGImageElement
  SVGGraphicsElement
  SVGGradientElement
  SVGGeometryElement
  SVGGElement
  SVGForeignObjectElement
  SVGFilterElement
  SVGFETurbulenceElement
  SVGFETileElement
  SVGFESpotLightElement
  SVGFESpecularLightingElement
  SVGFEPointLightElement
  SVGFEOffsetElement
  SVGFEMorphologyElement
  SVGFEMergeNodeElement
  SVGFEMergeElement
  SVGFEImageElement
  SVGFEGaussianBlurElement
  SVGFEFuncRElement
  SVGFEFuncGElement
  SVGFEFuncBElement
  SVGFEFuncAElement
  SVGFEFloodElement
  SVGFEDropShadowElement
  SVGFEDistantLightElement
  SVGFEDisplacementMapElement
  SVGFEDiffuseLightingElement
  SVGFEConvolveMatrixElement
  SVGFECompositeElement
  SVGFEComponentTransferElement
  SVGFEColorMatrixElement
  SVGFEBlendElement
  SVGEllipseElement
  SVGElement
  SVGDescElement
  SVGDefsElement
  SVGComponentTransferFunctionElement
  SVGClipPathElement
  SVGCircleElement
  SVGAnimatedTransformList
  SVGAnimatedString
  SVGAnimatedRect
  SVGAnimatedPreserveAspectRatio
  SVGAnimatedNumberList
  SVGAnimatedNumber
  SVGAnimatedLengthList
  SVGAnimatedLength
  SVGAnimatedInteger
  SVGAnimatedEnumeration
  SVGAnimatedBoolean
  SVGAnimatedAngle
  SVGAnimateTransformElement
  SVGAnimateMotionElement
  SVGAnimateElement
  SVGAngle
  SVGMPathElement
  SVGDiscardElement
  SVGAnimationElement
  SVGAElement
XML相关 
  XMLSerializer
  XMLHttpRequestUpload
  XMLDocument
Media相关 
  MediaSettingsRange
  MediaStreamTrackEvent
  MediaStreamTrack
  MediaStreamEvent
  MediaStream
  MediaStreamAudioSourceNode
  MediaStreamAudioDestinationNode
  MediaSource
  MediaRecorder
  MediaKeySystemAccess
  MediaKeyStatusMap
  MediaKeySession
  MediaKeyMessageEvent
  MediaEncryptedEvent
  MediaElementAudioSourceNode
  MediaDevices
  MediaDeviceInfo
  MediaQueryListEvent
  MediaQueryList
  MediaList
  MediaError
WebKit相关 
  WebKitCSSMatrix
  webkitURL
  WebKitAnimationEvent
  WebKitTransitionEvent

