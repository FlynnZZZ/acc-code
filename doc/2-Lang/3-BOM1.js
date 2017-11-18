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
Location, 
  Extend: Object 
  Instance: window.location 
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
    .back()           后退一条记录,相当于浏览器的后退按钮 
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
    .geolocation 地理定位 [HTML5]
      PS:在地理定位API中,使用小数值来表示经纬度[西经和南纬都用负数表示]
      浏览器通过 蜂窝电话、Wi-Fi、GPS、ip地址 等任意一种途径来获取位置信息
      单位转换
        可使用一下函数将使用度、分、秒表示的经纬度转换为小数
          function degreesToDecimal(degrees,minutes,seconds){
            return degrees +(minutes / 60 ) +(seconds / 3600);
          }
      检查是否支持该接口
        if (navigator.geolocation) {
          // 支持
        }
        else {
          // 不支持
        }
        该API兼容性较好,IE9及以前都支持
      Example:
        navigator.geolocation.getCurrentPosition(function(position){
        var latitude = position.coords.latitude;
        // 维度值
        var longitude = position.coords.longitude;
        // 经度值
      })
      包含整个地理定位 API
      navigator.geolocation.getCurrentPosition(suc,err,options)  是否同意授权后回调
        var suc = function(event){ }  回调函数,若浏览器能成功的确定位置,调用
          event.coords.latitude    纬度
          event.coords.longitude   经度
          event.coords.accuracy    精度
          以下属性支持与否取决于设备,桌面浏览器一般没有
          event.coords.altitude          海拔
          event.coords.altitudeAccuracy  海拔精度[m]
          event.coords.heading           以360度表示的方向
          event.coords.speed             速度 [m/s]
          event.timestamp 事件戳,表示获取位置时的时间
        var err = function(event){ }  回调函数,无法确定位置[如用户拒绝授权时],调用
          event.code    错误码
            0  Unknown error,相当于 event.UNKNOWN_ERROR
            1  用户拒绝授权  ,相当于 event.PERMISSION_DENIED
            2  无法定位      ,相当于 event.POSIRION_UNAVSILSBLE
            3  超时响应      ,相当于 event.TIMEOUT
          event.message 错误信息
        options                       可选,对象,设置定位的参数
          var options = {
              enableHighAccuracy:true, // 是否高精度,默认为false
              timeout:5000,            // 超时时限,默认为Infinity,单位ms
              maximumAge:600           // 缓存时限,0表示不缓存,infinity表示只读取缓存
            }
      var watchId=navigator.geolocation.watchPosition(suc,err,options) 监听位置变化
        PS:位置改变时重复调用成功处理程序,
          回调函数传入的event对象和getCurrentPosition用法类似
      navigator.geolocation.clearWatch(watchId) 取消watchPosition监听
      Google Maps API [非HTML5规范]
        该 API 未提供可视化表示工具,使用第三方工具 Google Maps(非HTML5规范)
        引入 API 放置在 HTML head中
          <script src="http://maps.google.com/maps/api/js?sensor=true"></script>
          sensor=true 表示代码中用到自己的位置;若不用自己位置可设置为false
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
        不同窗口间可共享；
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
URL,用于对二进制数据生成URL,生成指向File对象或Blob对象的URL  [IE10+]
  Extend: Object 
  Static: 
    .createObjectURL(blob)  str,创建url对象实例,将二进制数据生成一个URL 
      同样的二进制数据, 每调用一次该方法,就会得到一个不同的URL,
      这个URL的存在时间,等同于网页的存在时间,一旦网页刷新或卸载,该URL将失效 
      除此之外,也可以手动调用 URL.revokeObjectURL 方法,使URL失效。
      类似于 "blob:http%3A//test.com/666e6730-f45c-47c1-8012-ccc706f17191"
      这个URL可以放置于任何通常可以放置URL的地方,比如img标签的src属性
    .revokeObjectURL(url)   使生成的URL失效 
  Proto: 
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
    .searchParams  
    .hash  
    .toString() 
  Example: 
    在网页插入图片
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
    
    本机视频预览
    var video = document.getElementById('video');
    var obj_url = window.URL.createObjectURL(blob);
    video.src = obj_url;
    video.play()
    window.URL.revokeObjectURL(obj_url);  
    
    function html5Reader(file) {         
      var fileObj = file.files[0],
      img = document.getElementById("img");   
      // URL.createObjectURL  safari不支持
      img.src = URL.createObjectURL(fileObj);
      img.onload =function() {
        var data = getBase64Image(img);
        console.log(data);  // 打印出base64编码
      }
    }
    function getBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
      var dataURL = canvas.toDataURL("image/"+ext);
      return dataURL;
    }
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
DOMStringList 
  .length  
  .item()    
  .contains(key)   bol,是否包含该成员  
Intl 
WeakMap 
BarProp 
  .locationbar   
  .menubar   
  .personalbar   
  .scrollbars   
  .statusbar   
  .toolbar   
WeakSet 
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
-------------------------------------------------------------------------待整理 



