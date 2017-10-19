◆Event事件: 用来处理响应的一个机制,JS与HTML的交互通过事件实现  
  PS: 响应可来自用户,也可以来自浏览器,如文件下载完了  
    事件机制属于观察者模式的模型 
  事件流: 描述页面中接收事件的顺序 
    "event bubbling"事件冒泡: IE的事件流,从内向外传递 
      PS: 事件冒泡的前提是目标元素在文档中,移除目标文件则会阻止冒泡 
      事件绑定元素-..-'body'-'html'-'document'-'window'
    "event capturing"事件捕获: 事件从最外层向内传递,直到传递到触发事件的该元素为止 
      由'window'-'document'-'html'-'body'-..-事件绑定元素  
    'DOM2级事件'规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段 
  事件支持检测 
    属性判断的检测方式: 
      此方式只能检测是否可使用DOM0级或内联的绑定方式 
        var input1 = document.querySelector("#input1")
        console.log('on'+'focusin' in input1); // fasle 
        input1.addEventListener("focusin",function(e){ // 仍可用 
        })
      Example: 
      var div = document.createElement('div'); 
      console.log('on'+'touchstart' in div); // false, 是否支持触摸事件
      console.log('on'+'orientationchange' in window); // false, 是否支持方向转换事件 
    自定义函数检测是否可使用'addEventListener'绑定: 
      function isEventSupport(eventStr,elem){
        var bol = false;
        var foo = function(){
          bol = true;
          console.log('是否支持DOM2事件:',eventStr,bol);
        }
        elem.addEventListener(eventStr,foo)
        var e = new Event(eventStr)
        elem.dispatchEvent(e)
        elem.removeEventListener(eventStr,foo)
        if (!bol) {
          console.log('是否支持DOM2事件:',eventStr,bol);
        }
      }
      isEventSupport('focusin',document.querySelector("#input1"))
事件绑定、解绑及触发 
  PS: 响应某个事件的函数就叫做事件处理程序或事件侦听器 
    函数中 this 为事件的目标元素
  内联事件处理程序: 事件处理函数作为HTML标签的一个属性  
    Example: 
    <input type="button" value="clickme" onclick="alert('点击')">
  DOM0级事件处理程序: 将一个函数赋值给元素的一个事件处理程序属性 
    PS: 当添加多个相同[即使执行函数不同]的事件,会产生覆盖
    绑定: elem.on<eventName>=foo 
    解绑: elem.on<eventName>=null;
    Example: 
      var btn = document.getElementById("myBtn");
      btn.onclick = function(){ };  // 绑定事件
      btn.onclick = null;            // 解除绑定
  DOM2级事件处理程序: addEventListener&removeEventListener [IE9+] 
    PS: 绑定多个相同的事件,不会覆盖,按照定义的先后顺序来触发 
  IE事件处理程序: attachEvent&detachEvent [IE8-IE10] 
    PS: 执行函数中的 this 为 window 
      同DOM方法类似,可以添加多个执行函数不同的相同事件,而不产生覆盖
      绑定多个事件,执行的先后顺序为先添加后执行[与DOM方法相反]
    elem.attachEvent("on事件名",函数)  绑定事件
      Example: :
      elem.attachEvent("onclick",function(){ });
    elem.detachEvent();   解除绑定
      匿名函数不可解除绑定
      和attachEvent接收同样的参数(同一个函数的引用,而非相同的不同引用)
  在内联事件及DOM0级事件中,一般的,事件处理函数返回false,可阻止默认事件行为  
    Example: 
    点击链接,返回false,阻止跳转
    <a id="a" href="https://www.baidu.com">点我也不会跳转</a>
    var a =document.querySelector("#a");
    a.onclick =function(){ return false; };
    a.addEventListener("click",function(){return false; }); // 不生效
EventTarget===Node.prototype.__proto__.constructor  [IE9+][DOM2]  
  ★EventTarget.prototype.xxx 
  tagt.addEventListener("eventName",cfoo[,bol])  事件绑定
    PS: 通过该方式添加的事件,只能使用'removeEventListener'来移除 
    bol  可选,true 在捕获阶段调用,默认 false 在冒泡阶段调用 
  tagt.removeEventListener(["eventName",cfoo])   解除addEventListener绑定的事件 
    PS: 若要要移除事件,需使用外部函数,若为匿名函数,则该事件无法移除 
    传入与 addEventListener() 同样的三个参数,执行函数必须是同一引用 
    Remarks: 
      在使用 innerHTML 移除有事件绑定的元素时,
      可能导致元素被移除后事件仍保留在内存中,大量的类似操作导致内存占用过多,
      可在移除元素前解除该元素事件的绑定 
  bol = tagt.dispatchEvent(event)  派发事件,返回是否阻止默认行为  
    event   被派发的事件对象  
  EventTarget===Performance.prototype.__proto__.constructor 当前页面加载相关的性能信息 
    PS: 用于精确度量、控制、增强浏览器的性能表现;精度可达千分之一毫秒  
      还可获取后台事件的时间进度 
      浏览器支持: IE10+、Chrome20+、Firefox15+、Opera15+ 
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
Event 事件对象类: 浏览器默认给事件响应函数传入一参数,表示该事件对象本身
  PS: 事件对象event包含着所有与事件有关的信息,作为参数传到执行函数中 
    只有在事件处理程序执行期间,event对象才存在[一旦执行完则会被销毁] 
    浏览器中可能发生的事件有很多类型,不同的事件类型具有不同的信息 
  IE中的事件对象 
    DOM1级中,event作为window对象的属性存在[IE8-] 
      Example: :
      var btn = document.getElementById("myBtn");
      btn.onclick = function(){
        var e = window.event;
        console.log(e.type); // click
      }
    DOM2级中,attachEvent将event作为事件函数的参数,也可使用 window.event 访问 
      属性/方法的获取也同DOM的event一样
  var event = new Event('eName')  创建自定义事件[IE11+]  
  var event = document.createEvent(eTypeStr)  创建事件对象  
    PS: 该方式已过时,请使用构造函数替代,
      早期的创建事件的方法使用了受Java启发的API
    Example: 
      console.log(document.createEvent('MouseEvent').constructor===MouseEvent); // true 
    var event = document.createEvent('Event');  创建事件
    event.initEvent('build',true,true);  定义事件 
      事件名为'build'
    document.addEventListener('build', function (e) {  监听事件 
      // e.target matches document from above
    });
    document.dispatchEvent(event); 触发事件
    自定义事件[DOM3] 
    var evt = document.createEvent("CustomEvent");   创建事件 
    evt.initEvent('customEvent',true,true);          定义事件类型 
    evt.initCustomEvent(str,boo,boo,obj);            初始化事件 
      str  触发的事件类型 type
      bol 表示事件是否应该冒泡
      bol 表示事件是否可以取消
      obj  任意值,保存在event对象的detail属性中.
    elem.addEventListener('customEvent',cfoo,false); 监听事件 
    elem.dispatchEvent(evt);     触发事件
  Event.prototype.xxx 
    常量 
      0===e.NONE 
      1===e.CAPTURING_PHASE  
      2===e.AT_TARGET  
      3===e.BUBBLING_PHASE  
    str = e.type         事件类型
    elem = e.target       触发事件的目标元素  
      目标元素在文档中是事件冒泡的前提,即删除目标元素也会阻止事件冒泡 
    elem = e.currentTarget   绑定事件的元素[即函数中的this] 
      若直接将事件绑定在目标元素上,则this currentTarget target 相同
    num = e.eventPhase  调用事件处理程序的阶段 
      1 表示捕获阶段;2 表示"处于目标";3 冒泡阶段
      Example: :
      var btn =document.getElementById("myBtn");
      btn.onclick =function(e){console.log(e.eventPhase);} // 2
      document.body.addEventListener("click",function(){
        console.log(e.eventPhase);  // 1
      },true)
      document.body.onclick =function(e){
        console.log(e.eventPhase);  // 3
      }
      当eventphase等于2是,this target currentTarget 是相等的
    bol = e.bubbles      事件是否冒泡 
    bol = e.cancelable   是否可取消事件默认行为 
    bol = e.defaultPrevented  是否已调用了preventDefault()来阻止默认事件 [DOM3]
    e.composed 
    e.timeStamp 
    e.path 
    elem = e.srcElement 事件目标,同 e.target 
    bol = e.cancelBubble 读写,取消事件冒泡,默认 false 
    bol = e.returnValue  读写,允许事件默认行为,默认 true  
    bol = e.trusted   事件是否为浏览器生成 [DOM3] [仅IE支持]
    e.stopPropagation()  取消事件的进一步捕获或冒泡 
      PS:前提bubbles为true,用于阻止事件的传递.
      Example: :
      var btn =document.getElementById("myBtn") 
      btn.onclick =function(e){
        alert("1") 
        e.stopPropagation()   // 否则会触发body的点击事件
      }
      document.body.onclick =function(){
        alert("2") 
      }
    e.stopImmediatePropagation()  取消事件传递,并阻止处理程序调用 [DOM3]
    e.preventDefault()   阻止事件的默认行为
      若cancelable是true则可以使用该方法
    e.composedPath()  
    e.initEvent()  
  事件枚举: 
    load    加载完后触发 
      window.onload 页面完全加载后触发,包括所有图像、JS文件、CSS文件等外部资源 
      elem.onload  元素加载完毕后触发 
    unload  卸载时触发 
      只要用户从一个页面切换到另一个页面就会发生unload事件 
      触发元素: window、window.frames、<object>
        当页面完全卸载后在window上触发,
        所有框架都卸载后在框架集'frames'上触发,
        嵌入的内容卸载完毕后在<object>元素上触发
    resize  当窗口或框架的大小变化时在window或框架上触发 
      Firefox只会在用户停止调整窗口大小时才触发事件
      IE Safari Chrome Opera 会在浏览器窗口变化过程中持续触发 
      浏览器窗口在最小化或最大化时,也会触发resize事件
    scroll  移动滚动条时持续触发 
    error   发生错误时触发,不会冒泡  
      PS: 支持该事件的HTML标签: <img>, <object>, <style>
        支持该事件的JS对象: window, image
      当发生JS错误时在window上面触发,
      无法加载图像时在<img>元素触发,
      无法加载嵌入内容在<object>元素上触发,
      有框架无法加载时在框架集上触发 [?]
    select  当用户选择文本框中的字符时触发 
      支持该事件的标签:<input type="text">, <textarea>
  ★Event子类型: 
  Event===UIEvent.prototype.__proto__.constructor  
    UIEvent.prototype.xxx 
      e.view        与事件关联的抽象视图,等同于发生事件的window对象
      e.detail      与事件相关的细节信息
      e.sourceCapabilities 
      e.which 
      e.initUIEvent() 
  UIEvent===MouseEvent.prototype.__proto__.constructor  
    ★MouseEvent.prototype.xxx 
      e.screenX/e.screenY     相对于设备屏幕左上角的坐标
      e.clientX/e.clientY     相对浏览器可视区左上角的坐标 
        不含浏览器的工具栏、边框和滚动条
        返回值类型为数值,但默认是以px为单位返回的数值.
      e.pageX/e.pageY       相对于整个网页左上角的坐标
        页面没滚动时 clientX 和 pageX 相等
      e.offsetX/e.offsetY     相对于事件源左上角的坐标
        如点击一div,则表示到该div左上叫的坐标
      e.x/e.y      相对于CSS定位的最内层包容元素的左上角
        IE最先引入,现在主流浏览器基本都支持;
        在Chrome中和clientX相同;在IE中当设置了定位则和offsetX相同,否则和clientX相同;
      e.movementX  
      e.movementY  
      e.layerX  
      e.layerY  
      bol = e.shiftKey  该键是否被按下
      bol = e.ctrlKey   该键是否被按下
      bol = e.altKey    该键是否被按下
      bol = e.metaKey   该键是否被按下
      num = e.button  对应表示鼠标的按钮 
        0 左键 [IE中为 1] 
        1 中键 [IE中为 4] 
        2 右键 [IE中为 2] 
        兼容处理: 
        function getButton(e){
          if(e){
            return e.button;
          }
          else if(window.event){
            switch(window.event.button){
              case 1:
              return 0;
              case 4:
              return 1;
              case 2:
              return 2;
            }
          }
        }
      e.buttons  
      e.relatedTarget  
      e.fromElement  
      e.toElement  
      e.getModifierState()    
      e.initMouseEvent()    
    ★事件枚举: 
      click    在左键按下后,弹起来时触发或按下回车键时触发
        同一个元素上相继触发mousedown和mouseup事件才会触发click事件
        (若有一个被取消就不会触发click事件)
      dblclick   鼠标双击
        触摸设备不支持dblclick事件,双击浏览器窗口会放大画面而且没有办法改变该行为
      mousedown  用户按下任意鼠标按钮触发
      mouseup    鼠标弹起触发
      mouseenter 光标从元素外部移动到元素范围内时触发,不冒泡 
      mouseleave 光标从元素范围内移到范围外时触发,不冒泡
      mousemove  光标在元素内移动时持续触发 
      mouseout   光标从一个元素到另一个元素时触发 
        另一个元素可能位于该元素外,也可能是该元素的子元素
      mouseover  光标移到元素上时触发 
      当事件是'mouseover'和'mouseout'时 
        e.relatedTarget  属性的值表示:移到/移出触发事件的元素最近的那个元素
        对于其他事件该属性值为 null
        IE的处理方式: e.toElement; e.fromElement;
  MouseEvent===WheelEvent.prototype.__proto__.constructor  
    ★WheelEvent.prototype.xxx 
      常量
        0===e.DOM_DELTA_PIXEL  
        1===e.DOM_DELTA_LINE  
        2===e.DOM_DELTA_PAGE  
      e.deltaX 
      e.deltaY 
      e.deltaZ 
      e.deltaMode 
      e.wheelDeltaX 
      e.wheelDeltaY 
      e.wheelDelta 向前滚动鼠标时,wheelDelta是120的倍数,向后为 -120 的倍数
    ★事件枚举 
      mousewheel 使用鼠标滚轮或类似设备时触发 
  UIEvent===TouchEvent.prototype.__proto__.constructor  
    ★TouchEvent.prototype.xxx 
    e.touches  
    e.targetTouches  
    e.changedTouches  
    e.altKey  
    e.metaKey  
    e.ctrlKey  
    e.shiftKey  
  UIEvent===KeyboardEvent.prototype.__proto__.constructor  
    ★KeyboardEvent.prototype.xxx 
      常量: 
        0 = e.DOM_KEY_LOCATION_STANDARD   
        1 = e.DOM_KEY_LOCATION_LEFT   
        2 = e.DOM_KEY_LOCATION_RIGHT   
        3 = e.DOM_KEY_LOCATION_NUMPAD   
      str = e.key  按键字符 [DOM3] 
      e.code  
      e.ctrlKey  
      e.shiftKey  
      e.altKey  
      e.metaKey  Windows中为Windows键,Mac中为Cmd键 
      e.repeat  
      e.isComposing  
      e.charCode  [DOM3废弃]
      num = e.keyCode  按键字符对应ASCII码中小写字母或数值的编码 
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
        a           65 [与Shift键的状态无关] 
      e.initKeyboardEvent()   
      bol = e.getModifierState(str)  检测修改键[IE9+] 
        str 可为"Control" "Shift" "AltGraph" "Meta" 
      兼容性: 
        num = e.location 键盘区域  [DOM3][DiBs] 
          0 表示默认键盘
          1 左侧位置,如左位的Alt键 
          2 右侧位置,如右位的Shift键
          3 数字小键盘
          4 移动设备键盘,虚拟键盘 
          5 手柄
        e.char [DOM3] [Chrome不支持]
    ★事件枚举: 
      keydown    按下任意键时触发,长按则持续触发 
      keypress   按下字符键时触发,长按则持续触发 
        任何获得焦点的元素都可以触发keypress事件
      keyup      释放按键时触发
  UIEvent===FocusEvent.prototype.__proto__.constructor 焦点事件  
    ★FocusEvent.prototype.xxx 
    e.relatedTarget 
    ★事件枚举: 
    blur  元素失去焦点时触发,不冒泡 
    focus 元素获得焦点时触发,不冒泡 
    focusin 与focus等价,冒泡,不支持DOM0绑定  
    focusout 元素失焦时触发,冒泡,不支持DOM0绑定
  UIEvent===InputEvent.prototype.__proto__.constructor  
    ★InputEvent.prototype.xxx 
    e.data  
    e.isComposing  
    e.inputType  
    e.dataTransfer  
    e.getTargetRanges() 
  UIEvent===TextEvent.prototype.__proto__.constructor  文本事件 
    ★TextEvent.prototype.xx 
    str = e.data  输入的字符 
    e.initTextEvent() 
    ★事件枚举: 
    textInput  将文本插入文本框前触发,不支持DOM0绑定 [DOM3] 
      PS: 只有可编辑区域才能触发该事件;键盘输入、粘贴操作都会触发 
  UIEvent===CompositionEvent.prototype.__proto__.constructor 合成事件[DOM3]  
    PS: 当为IME['Iput Method Editor'输入法编辑器]输入字符时触发 
      IME可以让用户输入在物理键盘上找不到的字符,如输入中文;
      浏览器支持率度不高
    ★CompositionEvent.prototype.xxx 
    str = e.data  操作的文本数据 
    e.initCompositionEvent()  
    ★事件枚举:  
    compositionstart  在IME打开时触发,表示要开始输入了,不支持DOM0绑定 
      e.data 包含正在编辑的文本,如已经选中的需要马上替换的文本 
    compositionupdate 在向输入字段中输入字符时触发,不支持DOM0绑定  
      e.data  正在插入的文本
    compositionend    在IME关闭时触发,表示返回正常键盘输入状态,不支持DOM0绑定 
      e.data  包含此次输入会话中插入的所有字符
  待整理事件: 
    abort   在用户停止下载过程时,若嵌入的内容没有加载则在<object>上触发
  已废弃事件: 
    DOMActivate  元素已被用户操作[通过鼠标或键盘]激活 [DOM3废弃] 
  Event===CustomEvent.prototype.__proto__.constructor [IE11+] 
    ★CustomEvent.prototype.xxx 
    e.detail 
    e.initCustomEvent() 
    var event = new CustomEvent(eName,{'detail':data}); 创建事件并为event对象添加的数据[IE11+] 
      传递的数据对象通过 e.detail 来获取 
事件兼容处理: 
  var eventCompat = {
    add: function(elem,type,foo){
      if(elem.addEventListener) {
        elem.addEventListener(type,foo);
      }
      else if(elem.attachEvent) {
        elem.attachEvent("on"+type,foo);
      }
      else {
        elem["on"+type] = foo;
      }
    },
    remove: function(elem,type,foo){
      if(elem.addEventListener) {
        elem.removeEventListener(type,foo);
      }
      else if(elem.attachEvent) {
        elem.detachEvent("on"+type,foo);
      }
      else {
        elem["on"+type]=null;
      }
    },
    getE: function(e){
      return e?e:window.e;
    },
    getType: function(e){
      return e.type;
    },
    getElem: function(e){
      return e.target || e.srcElement;
    },
    preventDefault: function(e){
      if(e.preventDefault) {
        e.preventDefault();
      }
      else {
        e.returnValue = false;
      }
    },
    stopPropagation: function(e){
      if(e.stopPropagation) {  
        e.stopPropagation();
      }
      else {
        e.cancelBubble = true;
      }
    }
  }
事件委托: 利用冒泡/捕获的原理,把事件绑在祖先元素上,检测子元素的触发 
  PS: 使用事件委托技术能避免对特定的每个节点添加事件监听器
    在创建GUI的语言[如C#]中,为GUI中的每个按钮添加一个onclick事件处理程序很常见,  
    但在JS中添加到页面上的事件处理程序数量直接关系到页面的整体运行性能,
    每当绑定事件时,浏览器代码会与支持页面交互的JS代码间建立一个链接,
    链接越多页面执行起来就越慢: 
    原因1:每个函数都是对象会占用内存
    原因2:绑定事件增加DOM访问次数,会延迟整个页面的交互就绪时间 
  Example: 
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
    
// TODO: ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★ 
变动事件 当底层DOM结构发生变化时触发[IE9+]
  PS: 变动事件是为XML或HTML DOM设计的,不特定于某种语言
  兼容性检测 
    var isSupported = document.implementation.hasFeature("MutationEvents","2.0");
  DOM2 级定义了如下变动事件[已废弃,但目前仍可用] 
  'DOMSubtreeModified'   在DOM结构中发生任何变化时触发
  'DOMNodeInserted'              节点被插入另一节点时触发
  'DOMNodeInsertedIntoDocument'  节点被直接插入文档或通过子树间接插入文档后触发
    该事件在 DOMNodeInserted 后触发
  'DOMNodeRemoved'             节点被删除时触发
  'DOMNodeRemovedFromDocument' 节点从文档中删除或通过子树间接从文档中删除前触发
    该事件在 DOMNodeRemoved 之后触发
  'DOMAttrModified'            特性被修改后触发 
  'DOMCharacterDataModified'  文本节点值发生变化时触发
  (详情参见 JavaScript高级程序设计384页)
  Exp:
    使用 on+eventName 的方式不生效,需使用 addEventListener 的方式绑定 
变动名称事件 当元素或属性名变动时触发[已被废弃]
◆HTML5事件 
  PS:DOM规范没有涵盖所有浏览器支持的事件,HTML5详尽列出了浏览器应该支持的所有事件
contextmenu  上下文菜单事件
  当点击网页时,会自动出现Windows自带的菜单
  使用contextmenu 事件来修改指定的菜单(前提将默认行为取消)
beforeunload  离开关闭/刷新网页时,在window上触发事件 
  PS:目的是让开发人员能在页面卸载前阻止这一操作, 
    通过以返回值的形式来显示给用户提示[无返回值则无提示],
    chrome中不会显示返回值内容而是浏览器的默认提示:'系统可能不会保存您所做的更改'; 
  Example:
    $(window).bind('beforeunload',function(e){
      return '您输入的内容尚未保存,确定离开此页面吗？';
    });
    //解除绑定,一般放在提交触发事件中
    $(window).unbind('beforeunload');
DOMContentLoaded 形成完整的DOM树后触发[IE9+]
  无需等待图像、JS文件、CSS文件或其他资源是否下载完毕,在load之前触发
readystatechange
  e.readyState;
    返回值
    uninitialized   对象存在但尚未初始化
    loading  对象正在加载数据
    loaded 对象加载数据完成
    interactive  可以操作对象了,但还没有完全加载
    complete 对象已经加载完毕
hashchange URL变化时在window上触发[IE8+] 
// 设备相关事件
[详参 JavaScript高级程序设计 395 页]
◆其他事件: 
  propertychange [IE专有] 
   不管js操作还是键盘鼠标手动操作,只要HTML元素属性发生改变即可立即捕获到.
  input    监听表单值改变[IE9+] 
    适用元素: input type=text , textarea
    使用情景: 粘贴可触发;
    HTML5中的标准事件
    在Chrome中通过JS改变表单的值,不会触发该事件 
    ios微信中,自定义获取焦点存在问题
  selectstart 其触发时间为目标对象被开始选中时(即选中动作刚开始,尚未实质性被选中)
   该事件常使用于使目标对象“禁止变蓝”,比如在很多地方当用户双击时,一些元素会变成蓝色(选中状态)
   而当我们要避免这种情况时就可以使用该事件
   Example: <div onselectstart="return false">该文字不可被选中</div>
  change:当文本框(input或textarea)内容改变且失去焦点后触发
  error  任何没通过try-catch处理的错误都会触发window对象的error事件
   和其他事件不同的是,error事件不会创建event对象,
   取而代之的是三个参数:错误消息、错误所在的URL和行号
   Example: :
   window.onerror =function(message,url,line){
     ...
     return false; // 可阻止浏览器报告错误的默认行为
   }
   图像的error事件:只要图像加载失败或显示失败就会触发error事件,会生成event对象
  online 网络从离线变成在线时触发 (HTML5新增)
  offline 网络从在线变成离线时触发(HTML5新增)
  transitionEnd  CSS的过渡效果transition结束后触发
   事件对象的属性
     propertyName:发生transition效果的CSS属性名.
     elapsedTime: transition效果持续的秒数,不含transition-delay的时间.
     pseudoElement:若transition效果发生在伪元素,会返回该伪元素的名称,以“::”开头.
       若不发生在伪元素上,则返回一个空字符串.
   Example:
   elem.addEventListener('transitionend',function(){},false);
   实际使用transitionend事件时,可能需要添加浏览器前缀.
   el.addEventListener('webkitTransitionEnd',function() {});
  animationstart 动画开始时触发
  animationend   动画结束时触发
  animationiteration 开始新一轮动画循环时触发
   若animation-iteration-count属性等于1,该事件不触发,
   即只播放一轮的CSS动画,不会触发animationiteration事件.
   这三个事件的事件对象
     都有animationName属性(返回产生过渡效果的CSS属性名)
     elapsedTime属性(动画已经运行的秒数)
     对于animationstart事件,elapsedTime属性等于0,除非animation-delay属性等于负值.
  checkbox选中时的事件是什么 [?]
  pageshow  网页重载时触发
   PS:重载时会在load事件触发后触发,若页面来自bfcache,则在页面状态完全恢复时触发;
     虽然这个事件的目标是 document,但必须将其事件处理程序添加到 window 上;
   Example:
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
     若刷新浏览器,则showCount的值会被重置为0,因为页面已经完全重新加载了。
   event.persisted  返回表示页面是否来自bfcache的布尔值
  pagehide  在浏览器卸载页面的时候触发 [unload事件之前]
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
访问剪贴板中的数据 
  $('#a').on("copy",function(e){
    if (window.getSelection) {
      text = window.getSelection().toString();
      console.log(1);
    } 
    else if (document.selection && document.selection.createRange) {
      text = document.selection.createRange().text;
      console.log(2);
    }
    console.log(text);
  });
  clipboardData对象 [无该对象?]
  使用 clipboardData 对象,IE中其为window的属性,其他浏览器为事件对象event的属性
  clipboardData.getData(formatstr);   从剪贴板中取得数据
    formatstr     数据格式的字符串
      IE中有两种格式 "text" "URL"
      其他浏览器 该参数是一种MIME类型[可使用"text"代表"text/plain"]
  clipboardData.setData(formatstr,str); 设置剪贴板中的数据,返回布尔值表示是否成功操作
     Arguments:formatstr 仍然是数据类型(但其他浏览器已不能识别 "text")
       第二个参数为要更换的字符串
  clipboardData.clearData(); 从剪贴板中清除数据
◆移动端事件 
 touchstart
 touchend
 touchmove
Exp: 
  页面加载时只执行'load'事件 
  页面刷新时先执行'beforeunload',然后'unload',最后'load' 
  页面关闭时先执行'beforeunload',最后'unload' 
// TODO: ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★ 
  
事件模拟 
  PS: 使用JS来触发特定的事件,DOM2级规范了模拟特定事件的方式,IE有自己的模拟方式 
  document.createEvent(str);  创建event对象
    str   表示要创建的事件类型的字符串
      PS: DOM2级中都使用英文复数形式, DOM3级中都使用英文单数形式
      'UIEvents'       一般的UI事件,鼠标、键盘事件都继承至UI事件
      'MouseEvents'    一般的鼠标事件
      'MutationEvents' 一般的DOM变动事件
      'HTMLEvents'     一般的HTML事件[DOM3中无该事件,被分散到其他类别中去了]
  elem.dispatchEvent(e);      触发创建的事件
  // 模拟鼠标事件
  var e = document.createEvent("MouseEvents");
  e.initMouseEvent();  指定与鼠标事件有关的信息 
    接收15个参数
    type       字符串,表示要触发的事件类型(如 "click")
    bubbles    布尔值,表示事件是否应该冒泡(一般设置为true)
    cancelable 布尔值,表示事件是否可以取消(一般设置为true)
    view       与事件关联的视图(通常设置为 document.defaultView)
    detail     整数,与事件有关的详细信息(通常设置为0)
    screenX    整数,事件行对于屏幕的X坐标
    screenY    整数,事件行对于屏幕的Y坐标
    clientX    整数,事件相对于视口的X坐标
    clientY    整数,事件相对于视口的Y坐标
    ctrlKey    布尔值,表示是否按下了Ctrl,默认值为false
    altKey     布尔值,表示是否按下了Alt,默认值为false
    shiftKey   布尔值,表示是否按下了Shift,默认值为false
    metaKey    布尔值,表示是否按下了Meta,默认值为false
    button     整数,表示按下了哪一个鼠标键,默认值为0
    relatedTarget 对象,表示与事件相关的对象(只在模拟 mouseover 和mouseout时使用)
  Example: :
    var btn = document.getElementById("myBtn"); 
    var event = document.createEvent("MouseEvents"); // 创建事件对象
    // 初始化事件对象
    event.initMouseEvent("click",true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null)
    // 触发事件
    btn.dispatchEvent(event);
  // 模拟键盘事件
  (详参 JavaScript高级程序设计 407 页)
  // 模拟其他事件
  (详参 JavaScript高级程序设计 409 页)
  兼容写法
    function trigger(elem, type) {
      if (document.createEvent) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent(type, true, false);
        elem.dispatchEvent(event);
      } 
      else {
        elem.fireEvent('on' + type);
      }
    }

    var t = document.getElementById('test');
    trigger(t, 'click');
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
    ◆在window上触发的事件 
    popstate   当活动历史记录条目更改时,在window上触发[HTML5 IE10+]
      PS: 调用history.pushState()或history.replaceState()不会触发该事件,
        只有在做出浏览器动作时,才会触发该事件,如用户点击浏览器的回退按钮,
        或者在JS代码中调用 history.back();
        不同的浏览器在加载页面时处理popstate事件的形式存在差异。
        页面加载时Chrome和Safari通常会触发popstate事件,但Firefox则不会。
        若被激活的历史记录条目是通过对 history.pushState() 的调用创建的,
        或者受到对 history.replaceState() 的调用的影响,
        e.state 属性为包含历史条目的状态对象的副本,为pushState的第一个参数;
      Example:
        window.addEventListener("popstate",function(e){
          var state1 = e.state;
          // state1 就是 pushState 的第一个参数,详情常见BOM history
          console.log(state1)
        })
    hashchange URL变化时在window上触发[IE8+] 
      PS:当#值发生变化时也会触发这个事件
      e.oldURL; 变化前的URL
      e.newURL; 变化后的URL
    ◆
    scroll     滚动[带滚动条的]元素时在该元素上触发[网页滚动在window上触发]
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
    Example:
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
    Example:
      var t = document.getElementById('test');
      deleteEvent(t, 'click', fn);
  对事件的认识
    Example:
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
自我总结 
  创建和触发事件 
    var on = function(eName,foo,elem) {
      var el = elem || document;
      el.addEventListener(eName, function(e){
        foo(e,e.detail);
      }, false);
    }
    var tr = function(eName,data,elem){
      var event = new CustomEvent(eName, { 'detail': data });
      var el = elem || document;
      el.dispatchEvent(event);
    }
-------------------------------------------------------------------------------- 
