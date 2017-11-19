◆Event事件: 用来处理响应的一个机制,JS与HTML的交互通过事件实现  
  PS: 响应可来自用户,也可以来自浏览器,如文件下载完了  
    事件机制属于观察者的设计模式
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
EventTarget,事件目标[IE9+][DOM2]  
  Extend: Object 
    console.log(EventTarget.prototype.__proto__.constructor===Object); // true 
  Proto: 
    .addEventListener("eventName",cfoo[,bol])  事件绑定
      PS: 通过该方式添加的事件,只能使用'removeEventListener'来移除 
      bol  可选,true 在捕获阶段调用,默认 false 在冒泡阶段调用 
    .removeEventListener(["eventName",cfoo])   解除addEventListener绑定的事件 
      PS: 若要要移除事件,需使用外部函数,若为匿名函数,则该事件无法移除 
      传入与 addEventListener() 同样的三个参数,执行函数必须是同一引用 
      Remarks: 
        在使用 innerHTML 移除有事件绑定的元素时,
        可能导致元素被移除后事件仍保留在内存中,大量的类似操作导致内存占用过多,
        可在移除元素前解除该元素事件的绑定 
    .dispatchEvent(event)  bol,派发事件,返回是否阻止默认行为  
      event   被派发的事件对象  
Event,事件基础类 
  PS: 事件对象包含着所有与事件有关的信息,作为参数传到事件响应函数中 
    只有在事件处理程序执行期间,event对象才存在[一旦执行完则会被销毁] 
    浏览器中可能发生的事件有很多类型,不同的事件类型具有不同的信息 
  Extend：Object 
    console.log(Event.prototype.__proto__.constructor===Object); // true  
  Instance: 
    var event = new Event('eName')  创建自定义事件[IE不支持]  
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
    document.createEventObject()  IE的创建方式 
  Proto: 
    常量 
      .NONE              0 
      .CAPTURING_PHASE   1  
      .AT_TARGET         2  
      .BUBBLING_PHASE    3  
    .type         str,事件类型
    .bubbles      bol,事件是否冒泡 
    .cancelable   bol,是否可取消事件默认行为 
    .trusted      bol,事件是否为浏览器生成 [DOM3] 
    .target          elem,触发事件的目标元素  
      目标元素在文档中是事件冒泡的前提,即删除目标元素也会阻止事件冒泡 
    .srcElement      elem,事件目标,同 .target 
    .currentTarget   elem,绑定事件的元素[即函数中的this] 
      若直接将事件绑定在目标元素上,则this currentTarget target 相同
    .eventPhase   num,调用事件处理程序的阶段 
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
    .defaultPrevented  bol,是否已调用了preventDefault()来阻止默认事件 [DOM3]
    .composed   
    .timeStamp 
    .path 
    .cancelBubble bol,读写,取消事件冒泡,默认 false 
    .returnValue  bol,读写,允许事件默认行为,默认 true  
    .stopPropagation()  取消事件的进一步捕获或冒泡 
      PS: 前提bubbles为true,用于阻止事件的传递
      Example: :
      var btn =document.getElementById("myBtn") 
      btn.onclick =function(e){
        alert("1") 
        e.stopPropagation()   // 否则会触发body的点击事件
      }
      document.body.onclick =function(){
        alert("2") 
      }
    .stopImmediatePropagation()  取消事件传递,并阻止处理程序调用 [DOM3]
    .preventDefault()   阻止事件的默认行为 
      若cancelable是true则可以使用该方法
    .composedPath()  
    .initEvent()  
  Expand: 
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
  事件枚举: 
    DOMContentLoaded 形成完整DOM树后触发,不支持DOM0绑定 [HTML5][IE9+] 
      在window或document上触发 
      无需等待图像、JS文件、CSS文件或其他资源是否下载完毕,在load之前触发
    load    加载完后触发 
      window 上触发: 页面完全加载后触发,包括所有图像、JS文件、CSS文件等外部资源  
      window.frames 上触发: 所有框架加载完毕 
      <img>上触发: 图像加载完毕 
      <object>上触发:  嵌入内容加载完毕 
      <script> 
        当通过 jQuery append() 添加的<script>则不会触发 load 事件,
        通过 document.write() 添加的<script>则会触发该事件 
        通过 document.createElement("script") 则会触发该事件 
          function loadScript(url, callback) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            // IE
            if (script.readyState) {
              script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                  script.onreadystatechange = null;
                  callback(111);
                }
              };
            } else { // others
              script.onload = function () {
                callback(222);
              };
            }
            script.src = url;
            document.body.appendChild(script);
          }
          loadScript("http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js", function (arg) {
            alert(arg+'loaded');
          });
      ..
    unload  卸载时触发 
      PS: 从一个页面切换到另一个页面就会发生unload事件 
      当页面完全卸载后在 window 上触发
      所有框架都卸载后在框架集 window.frames 上触发,
      嵌入的内容卸载完毕后在 <object> 元素上触发
    readystatechange  加载状态,在document上触发 [HTML5] 
    resize  当窗口或框架的大小变化时在window或框架上触发 
      Firefox只会在用户停止调整窗口大小时才触发事件
      IE Safari Chrome Opera 会在浏览器窗口变化过程中持续触发 
      浏览器窗口在最小化或最大化时,也会触发resize事件
    scroll  移动滚动条时在包含该滚动条的元素上持续触发 
    select      当用户选中文本框中的字符时触发 
      支持的标签: <input type="text">, <textarea> ... 
    selectstart 目标对象被选中时触发,即选中动作刚开始但未被选中时  
      PS: 该事件常使用于使目标对象'禁止变蓝',
        比如在很多地方当用户双击时,一些元素会变成蓝色(选中状态)
        而当我们要避免这种情况时就可以使用该事件
      Example: 
      <div onselectstart="return false">该文字不可被选中</div>
    change   当文本框[input或textarea]内容改变且失去焦点后触发
    error   发生错误时触发,不冒泡  
      PS: 支持该事件的HTML标签: <img>, <object>, <style> 
        支持该事件的JS对象: window, image
      window.onerror = function(msg,url,line){ // 当JS发生错误时 
        PS: 任何未通过'try-catch'处理的错误都会触发window的错误事件 
          该事件是浏览器最早支持的事件之一,为保持兼容而未修改[DiBs] 
          不会创建event对象,代替的是接收三个参数 
          只支持DOM0级绑定 
        msg  错误消息 
        url  错误所在的URL 
        line 行号 
        return true; // 可阻止报告错误 
      }    
      当一个或多个框架无法加载时在框架集 window.frames 上触发 
      无法加载图像时在 <img> 上触发 
      无法加载嵌入内容在 <object> 上触发 
    canplay         当视频缓冲完毕可播放时触发,不冒泡 
    canplaythrough  媒体缓冲完毕且播放不会停顿时触发  
    ended           媒体播放完毕时触发,不冒泡 
    play            媒体开始播放时触发,不冒泡 
    playing         当媒体播放时触发,不冒泡   
    pause           当媒体暂停时触发,不冒泡   
    durationchange  当视频的时长已更改时 
    emptied         当目前的播放列表为空时 
    loadstart       下载已开始  
    loadeddata      媒体的第一帧已加载完成 
    timeupdate      媒体播放时持续触发,频率每秒一次  
      具体触发情况: 
      播放音频/视频(audio/video)时
      移动音频/视频(audio/video)播放位置时
    volumechange    音量改变时触发 
    progress        正在下载 
    ratechange      播放媒体的速度改变
    seeking         正移动到新位置 
    seeked          搜索结束 
    waiting         播放暂停,等待下载更多数据
    vstalled        不支持DOM0绑定
    online  [见window对象] 
    offline  [见window对象] 
    suspend         
    事件总结: 
      页面的加载与卸载 
        页面加载: 'DOMContentLoaded'-'load' 
        页面刷新: 'beforeunload'-'unload'-'load' 
        页面关闭: 'beforeunload'-'unload' 
    待整理事件: 
      abort    停止下载时,触发
        若嵌入的内容没有加载则在<object>上触发 
        放弃视频加载时,在<video>上触发  
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
      propertychange  HTML元素属性发生改变触发 [IE专有] 
       不管js操作还是键盘鼠标手动操作,都可捕获到 
     移动端事件 
      touchstart
      touchend
      touchmove
    已废弃事件: 
      DOMActivate  元素已被用户操作[通过鼠标或键盘]激活 [DOM3废弃] 
PageTransitionEvent, 
  Extend: Event 
    console.log(PageTransitionEvent.prototype.__proto__.constructor===Event); // true 
  Proto: 
    .persisted   bol, 
  事件枚举:  
    pageshow  网页重载时触发 
     PS: 重载时会在load事件触发后触发,若页面来自bfcache,则在页面状态完全恢复时触发;
       虽然这个事件的目标是 document,但必须将其事件处理程序添加到 window 上;
     bol = e.persisted  页面是否来自bfcache 
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
    pagehide  页面卸载前触发[unload事件之前] 
     PS:与pageshow一样,在document上面触发,但必须要绑定在Windows对象上;
       指定了unload事件处理程序的页面会被自动排除在bfcache之外,即使事件处理程序是空的。
       因为unload常用于撤销在load中所执行的操作,而跳过load后显示页面可能导致页面异常  
     event.persisted  返回页面是否将保存在bfcache中的布尔值
       若在Firefox浏览器中, 当第一次触发pageshow时,persisted的值一定是false,
       而在第一次触发pagehide时,persisted 为true
ErrorEvent,错误事件 
  Extend：Event 
    console.log(ErrorEvent.prototype.__proto__.constructor===Event); // true 
  Proto: 
    .message 
    .filename 
    .lineno 
    .colno 
    .error 
  事件枚举:  
    error  任何没通过try-catch处理的错误都会触发window对象的error事件 
     和其他事件不同的是,error事件不会创建event对象,
     取而代之的是三个参数:错误消息、错误所在的URL和行号
     Example: :
     window.onerror = function(message,url,line){
       ...
       return false; // 可阻止浏览器报告错误的默认行为
     }
     图像的error事件:只要图像加载失败或显示失败就会触发error事件,会生成event对象
HashChangeEvent,URL锚点改变事件 
  Extend: Event 
    console.log(HashChangeEvent.prototype.__proto__.constructor===Event); 
  Proto: 
    .oldURL str,变化前的URL
    .newURL str,变化后的URL
  事件枚举: 
    hashchange   hash变化时在window上触发[IE8+] [HTML5]
PopStateEvent,历史记录状态事件[HTML5][IE10+] 
  Extend: Event 
    console.log(PopStateEvent.prototype.__proto__.constructor===Event); // true 
  Proto: 
    .state  obj,当前历史记录对应的状态对象的副本,即pushState的第一个参数
  事件枚举: 
    popstate   历史记录变化时,在window上触发,不冒泡 
      PS: 调用history.pushState()或history.replaceState()不会触发该事件,
        不同的浏览器在加载页面时处理popstate事件的形式存在差异。
        页面加载时Chrome和Safari通常会触发popstate事件,但Firefox则不会。
        若被激活的历史记录条目是通过对 history.pushState() 的调用创建的,
        或者受到对 history.replaceState() 的调用的影响,
      只有在做出浏览器动作时,才会触发该事件,如用户点击浏览器的回退按钮,
      或者在调用 back、forward、go 方法时才会触发  
BeforeUnloadEvent, 
  Extend: Event 
    console.log(BeforeUnloadEvent.prototype.__proto__.constructor===Event);
  Proto: 
    .returnValue 
  事件枚举: 
    beforeunload  离开关闭/刷新网页时,在window上触发,不冒泡  [HTML5] 
      PS: 目的是让开发人员能在页面卸载前阻止这一操作, 
        通过以返回值的形式来显示给用户提示[无返回值则无提示],
        chrome中不会显示返回值内容而是浏览器的默认提示:'系统可能不会保存您所做的更改'; 
      Example:
        $(window).on('beforeunload',function(e){
          return '您输入的内容尚未保存,确定离开此页面吗？';
        });
        //解除绑定,一般放在提交触发事件中
        $(window).off('beforeunload');
      在Chrome中,使用原生绑定不会触发 ? 
        window.addEventListener("beforeunload",function(e){
          return '您输入的内容尚未保存,确定离开此页面吗？';
        })
ClipboardEvent,剪贴版事件[HTML5] 
  Extend: Event 
    console.log(ClipboardEvent.prototype.__proto__.constructor===Event);
  Proto: 
    .clipboardData  DataTransfer, 
  事件枚举: 
    beforecopy 复制前触发  [HTML5]
    copy       复制时触发  [HTML5]
    beforecut  剪切前触发  [HTML5]
    cut        剪切时触发  [HTML5]
    beforepaste 粘贴前触发 [HTML5]
    paste      粘贴时触发  [HTML5] 
    访问剪贴板中的数据 
      document.selection  obj,保存着用户在整个文档范围内选择的文本信息 [IE8-] 
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
      clipboardData = e.clipboardData || window.clipboardData  
        IE中为window属性,其他浏览器为事件对象属性 
      clipboardData.getData(formatstr)   从剪贴板中取得数据
        formatstr  str,数据格式 
          IE中有两种格式 "text" "URL"
          其他浏览器  一种MIME类型[可使用"text"代表"text/plain"]
      bol = clipboardData.setData(formatstr,str) 设置剪贴板中的数据,返回是否成功操作 
        formatstr  数据类型,但其他浏览器已不能识别 "text" 
        str        要更换的字符串
      clipboardData.clearData() 从剪贴板中清除数据
MutationEvent,变动事件[IE9+][已废弃] 
  PS: 当底层DOM结构发生变化时触发 
    变动事件是为XML或HTML DOM设计的,不特定于某种语言 
    已从Web标准中删除[因为API的设计有缺陷],
    虽然一些浏览器目前仍然支持它,但不推荐使用该特性
  Extend: Event 
    console.log(MutationEvent.prototype.__proto__.constructor===Event);
  Proto: 
    常量
      1===e.MODIFICATION   
      2===e.ADDITION   
      3===e.REMOVAL   
    .relatedNode  
    .prevValue  
    .newValue  
    .attrName  
    .attrChange  
    .initMutationEvent() 
  Feature: 
    兼容性检测 
    var isSupported = document.implementation.hasFeature("MutationEvents","2.0");
  事件枚举: 
    'DOMSubtreeModified' 在DOM结构中发生任何变化时触发,不支持DOM0绑定[DOM2] 
    'DOMNodeInserted'    节点被插入另一节点时触发[DOM2] 
    'DOMNodeInsertedIntoDocument' 节点被直接插入文档或通过子树间接插入文档后触发[DOM2] 
      该事件在 DOMNodeInserted 后触发
      貌似无效 ? 
    'DOMNodeRemoved'      节点被删除时触发,不支持DOM0绑定 [DOM2]  
    'DOMNodeRemovedFromDocument' 节点从文档中删除或通过子树间接从文档中删除前触发[DOM2]  
      该事件在 DOMNodeRemoved 之后触发
    'DOMAttrModified'           特性被修改后触发,不支持DOM0绑定 [DOM2]  
    'DOMCharacterDataModified'  文本节点值发生变化时触发,不支持DOM0绑定 [DOM2]  
    DOMAttributeNameChanged
    DOMElementNameChanged
CustomEvent,自定义事件[DOM3][IE11+] 
  Extend：Event 
    console.log(CustomEvent.prototype.__proto__.constructor===Event); // true 
  Instance: 
    var event = new CustomEvent(eName,{'detail':data}); 创建事件并为event对象添加的数据[IE11+] 
      传递的数据对象通过 e.detail 来获取 
  Proto: 
    .detail 
    .initCustomEvent() 
UIEvent,UI事件 
  Extend: Event 
    console.log(UIEvent.prototype.__proto__.constructor===Event);
  Proto: 
    .view        与事件关联的抽象视图,等同于发生事件的window对象
    .detail      与事件相关的细节信息
    .sourceCapabilities 
    .which 
    .initUIEvent() 
InputEvent,输入事件 
  Extend: UIEvent 
    console.log(InputEvent.prototype.__proto__.constructor===UIEvent);
  Proto: 
    .data 
    .isComposing 
    .inputType 
    .dataTransfer 
    .getTargetRanges() 
  事件枚举: 
    input  监听表单值改变[IE9+][HTML5] 
      PS: 粘贴可触发; 在Chrome中通过JS改变表单的值,不会触发该事件 
      适用元素: input type=text , textarea
      IOS微信中,自定义获取焦点存在问题
MouseEvent,鼠标事件 
  Expand: UIEvent 
    console.log(MouseEvent.prototype.__proto__.constructor===UIEvent);
  Proto: 
    .screenX/.screenY   num,相对设备屏幕左上角的距离,单位px 
    .clientX/.clientY   num,相对视口左上角的距离,单位px  
      不含浏览器的工具栏、边框和滚动条
    .pageX/.pageY       num,相对页面左上角的距离,单位px 
      页面没滚动时 clientX 和 pageX 相等
    .offsetX/.offsetY     相对于事件源左上角的坐标
      如点击一div,则表示到该div左上叫的坐标
    .x/.y      相对于CSS定位的最内层包容元素的左上角
      IE最先引入,现在主流浏览器基本都支持;
      在Chrome中和clientX相同;在IE中当设置了定位则和offsetX相同,否则和clientX相同;
    .movementX  
    .movementY  
    .layerX  
    .layerY  
    .shiftKey  bol,'Shif'键是否被按下
    .ctrlKey   bol,'Ctrl'键是否被按下
    .altKey    bol,'Alt'键是否被按下
    .metaKey   bol,'Meta'键是否被按下,Windows中为Windows键,Mac中为Cmd键 [IE9+] 
    .button    num,对应表示鼠标的按钮 
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
    .buttons  
    .relatedTarget  
    .fromElement  
    .toElement  
    .getModifierState()    
    .initMouseEvent()    
  事件枚举: 
    mousedown  用户按下任意鼠标按钮触发
    mouseup    鼠标弹起触发
    click    在左键按下后,弹起来时触发或按下回车键时触发
      同一个元素上相继触发mousedown和mouseup事件才会触发click事件,若有一个被取消就不会触发click事件 
    dblclick   鼠标双击 [DOM3]
      只有触发两次click事件,才会触发一次dblclick事件。
      如果有代码阻止了连续两次触发click事件,可能是直接取消click事件,
      也可能通过取消mousedown或mouseup间接实现,那么就不会触发dblclick事件了 
      触摸设备不支持dblclick事件,双击浏览器窗口会放大画面而且没有办法改变该行为 
    mouseenter 光标从元素外部移动到元素范围内时触发,不冒泡 [DOM3][IE9+]
    mouseleave 光标从元素范围内移到范围外时触发,不冒泡 [DOM3]  
    mousemove  光标在元素内移动时持续触发 
    mouseout   光标从一个元素到另一个元素时触发 
      另一个元素可能位于该元素外,也可能是该元素的子元素
    mouseover  光标移到元素上时触发 
    当事件是'mouseover'和'mouseout'时 
      e.relatedTarget  属性的值表示:移到/移出触发事件的元素最近的那个元素
      对于其他事件该属性值为 null
      IE的处理方式: e.toElement; e.fromElement;
    contextmenu  上下文菜单事件 [HTML5] 
      右击网页时,会自动出现Windows自带的菜单
      使用 contextmenu 事件来修改指定的菜单,前提将默认行为取消  
WheelEvent,滚轮事件[HTML5] 
  Extend: MouseEvent 
    console.log(WheelEvent.prototype.__proto__.constructor===MouseEvent);
  Proto: 
    常量
      0===e.DOM_DELTA_PIXEL  
      1===e.DOM_DELTA_LINE  
      2===e.DOM_DELTA_PAGE  
    .deltaX 
    .deltaY 
    .deltaZ 
    .deltaMode 
    .wheelDeltaX 
    .wheelDeltaY 
    .wheelDelta 向前滚动鼠标时,wheelDelta是120的倍数,向后为 -120 的倍数
  事件枚举: 
    mousewheel 使用鼠标滚轮或类似设备时触发 
DragEvent,拖放事件[IE9+][HTML5] 
  PS: IE4最早加入拖放功能,只能拖放文本框 [JS高程 482 页]
  Extend：MouseEvent 
    console.log(DragEvent.prototype.__proto__.constructor===MouseEvent);
  Proto: 
    .dataTransfer  DataTransfer, 
      PS: IE5最早引入,是事件对象的一个属性,故只能在拖放事件的处理程序中访问.
  Expand: 
    拖放源,被拖放的元素 
      若是图片则需加载后拖放,当图片加载失败则不可拖放
      在需拖动元素的标签中,添加属性 draggable="true",
      图像和链接的draggable属性自动被设置成了true
    拖放目标,要放置的目标元素  
      默认的在外观显示上所有的元素都不能做为放置的目标元素,
      通过阻止拖放目标'dragover'事件的默认行为来达到可拖放,
      达到的效果: 光标显示可放置的效果,拖放后会触发拖放目标的'drop'事件 
      但DOM结构的变化还需自己设置
      Example:
        var dropTarget = document.querySelector("#aoo");
        dropTarget.ondragover =function(e){
          e.preventDefault();
        }
        dropTarget.ondragenter =function(e){
          e.preventDefault();
        }
    兼容 
      IE9-不支持draggable属性,但可通过mousedown事件来模拟 
        Example:
        elem.onmousedown = function(){ if(this.dragDrop){ this.dragDrop(); } }
      firefox中,通过ondragstart中dataTransfer的setData方法来达到支持draggable属性
  事件枚举: 
    ◆在拖放源上触发 
    ondragstart 开始拖动
    ondrag      拖放期间持续触发
    ondragend   被放置后触发[无论放置位置] 
    ◆在拖放目标元素上触发 
    ondragenter  拖放源开始进入目标元素范围时触发 
    ondragleave  拖放源离开目标元素的范围时触发
    ondragover   拖放源处于目标元素上方时持续触发 
    ondrop       拖放源放置到目标元素后触发 
      Firefox中默认打开被放到放置目标上的URL,为了正常拖放,要取消其drop事件的默认行为 
  Example: 
    <div id="dragElem" draggable="true">拖放元素</div>
    <div id="targetElem" >放置目标元素</div>
    #dragElem{ 
      height:30px; 
      width:130px; 
      background:pink; 
      float:left; 
    }
    #targetElem{ 
      float:right; 
      height: 200px; 
      width:200px; 
      background:lightblue; 
    }
    dragElem.onmousedown = function(){
      //兼容IE8-浏览器
      if(this.dragDrop){ this.dragDrop(); }
    }
    dragElem.ondragstart = function(){
      this.style.backgroundColor = 'lightgreen';
      this.innerHTML = '开始拖动';
    }
    dragElem.ondrag = function(){ }
    dragElem.ondragend = function(){
      this.innerHTML = '结束拖动';
      this.style.backgroundColor = 'pink';
    }
    targetElem.ondragenter = function(e){
      e.preventDefault();
      this.innerHTML = '有元素进入目标区域';
      this.style.background = 'red';
    }
    targetElem.ondragover = function(e){
      e.preventDefault();
    }
    targetElem.ondragleave = function(){
      this.innerHTML = '元素已离开目标区域';
      this.style.backgroundColor = 'lightblue';
    }
    targetElem.ondrop = function(){
      this.innerHTML = '元素已落在目标区域';
      this.style.backgroundColor = 'orange';
    }

    <div>请将从这堆内容不同乱七八糟的文字中挑选一些移动到拖放目标中</div>
    <div id="targetElem" >拖放目标</div>
    <div id="result"></div>
    #targetElem{ margin-top:20px;height: 100px;width:200px;background:lightblue; }
    targetElem.ondragenter = function(e){
      e = e || event;
      e.preventDefault();
      this.innerHTML = '有元素进入目标区域';
      this.style.background = 'red';
    }
    targetElem.ondragover = function(e){
      e = e || event;
      e.preventDefault();
    }
    targetElem.ondragleave = function(e){
      e = e || event;
      this.innerHTML = '元素已离开目标区域';
      this.style.backgroundColor = 'lightblue';
    }
    targetElem.ondrop = function(e){
      e = e || event;
      e.preventDefault();
      result.innerHTML = '落入目标区域的文字为:' + e.dataTransfer.getData('text');
      this.innerHTML = '元素已落在目标区域';
      this.style.backgroundColor = 'orange';
    }

    <div id="dragElem" draggable="true" data-value="这是一个秘密">拖动源</div>
    <div id="targetElem" >拖放目标</div>
    <div id="result"></div>
    #dragElem{ height:30px;width:100px;background:pink; }
    #targetElem{ margin-top:20px;height: 100px;width:200px;background:lightblue; }
    dragElem.onmousedown = function(){
      //兼容IE8-浏览器
      if(this.dragDrop){ this.dragDrop(); }
    }
    dragElem.ondragstart = function(e){
      e = e || event;
      e.dataTransfer.setData('text',dragElem.getAttribute('data-value'));
    }
    targetElem.ondragenter = function(e){
      e = e || event;
      e.preventDefault();
      this.innerHTML = '有元素进入目标区域';
      this.style.background = 'red';
    }
    targetElem.ondragover = function(e){
      e = e || event;
      e.preventDefault();
    }
    targetElem.ondragleave = function(e){
      e = e || event;
      this.innerHTML = '元素已离开目标区域';
      this.style.backgroundColor = 'lightblue';
    }
    targetElem.ondrop = function(e){
      e = e || event;
      e.preventDefault();
      result.innerHTML = '落入目标区域的文字为:' + e.dataTransfer.getData('text');
      this.innerHTML = '元素已落在目标区域';
      this.style.backgroundColor = 'orange';
    }
TouchEvent,触摸事件  
  Extend: UIEvent 
    console.log(TouchEvent.prototype.__proto__.constructor===UIEvent);
  Proto: 
    .touches  
    .targetTouches  
    .changedTouches  
    .altKey  
    .metaKey  Windows中为Windows键,Mac中为Cmd键  
    .ctrlKey  
    .shiftKey  
KeyboardEvent,键盘事件[DOM3] 
  Extend: UIEvent 
    console.log(KeyboardEvent.prototype.__proto__.constructor===UIEvent);
  Proto: 
    常量: 
      0 = e.DOM_KEY_LOCATION_STANDARD   
      1 = e.DOM_KEY_LOCATION_LEFT   
      2 = e.DOM_KEY_LOCATION_RIGHT   
      3 = e.DOM_KEY_LOCATION_NUMPAD   
    .key  str,按键字符 [DOM3][DiBs]  
    .keyCode  num,按键字符对应ASCII码中小写字母或数值的编码 
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
    .code  
    .ctrlKey  
    .shiftKey  
    .altKey  
    .metaKey  Windows中为Windows键,Mac中为Cmd键 
    .repeat  
    .isComposing  
    .initKeyboardEvent()   
    .getModifierState(str)  bol,检测修改键[IE9+] 
      str 可为"Control" "Shift" "AltGraph" "Meta" 
    兼容性: 
      .location  num,键盘区域  [DOM3][DiBs] 
        0 表示默认键盘
        1 左侧位置,如左位的Alt键 
        2 右侧位置,如右位的Shift键
        3 数字小键盘
        4 移动设备键盘,虚拟键盘 
        5 手柄
      .charCode  [DOM3废弃] 
      .char      [DOM3] [Chrome不支持]
  事件枚举: 
    keydown    按下任意键时触发,长按则持续触发 
    keypress   按下字符键时触发,长按则持续触发 
      任何获得焦点的元素都可以触发keypress事件
    keyup      释放按键时触发
FocusEvent,焦点事件 
  Extend: UIEvent 
    console.log(FocusEvent.prototype.__proto__.constructor===UIEvent);
  Proto: 
    .relatedTarget 
  事件枚举: 
    blur  元素失去焦点时触发,不冒泡 
    focus 元素获得焦点时触发,不冒泡 
    focusin 与focus等价,冒泡,不支持DOM0绑定  [DOM3] 
    focusout 元素失焦时触发,冒泡,不支持DOM0绑定 [DOM3] 
TextEvent,文本事件 
  Extend: UIEvent 
    console.log(TextEvent.prototype.__proto__.constructor===UIEvent);
  Proto: 
    .data  str,输入的字符 
    .initTextEvent() 
  事件枚举: 
    textInput  将文本插入文本框前触发,不支持DOM0绑定 [DOM3] 
      PS: 只有可编辑区域才能触发该事件;键盘输入、粘贴操作都会触发 
CompositionEvent,合成事件[DOM3]  
  PS: 当为IME['Iput Method Editor'输入法编辑器]输入字符时触发 
    IME可以让用户输入在物理键盘上找不到的字符,如输入中文;
    浏览器支持率度不高
  Extend: UIEvent 
    console.log(CompositionEvent.prototype.__proto__.constructor===UIEvent);
  Proto: 
    .data  str,操作的文本数据 
    .initCompositionEvent()  
  事件枚举: 
    compositionstart  在IME打开时触发,表示要开始输入了,不支持DOM0绑定 
      e.data 包含正在编辑的文本,如已经选中的需要马上替换的文本 
    compositionupdate 在向输入字段中输入字符时触发,不支持DOM0绑定  
      e.data  正在插入的文本
    compositionend    在IME关闭时触发,表示返回正常键盘输入状态,不支持DOM0绑定 
      e.data  包含此次输入会话中插入的所有字符
FontFaceSetLoadEvent,   
TrackEvent,   
SpeechSynthesisEvent,   
DeviceOrientationEvent,   
DeviceMotionEvent,   
BlobEvent,   
AudioProcessingEvent,   
MessageEvent,   
PointerEvent,   
ProgressEvent,   
StorageEvent,   
MIDIConnectionEvent,   
IDBVersionChangeEvent,   
GamepadEvent, 
CloseEvent,   
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
移动端事件 
  orientationchange 屏幕旋转事件 
  deviceorientation 在加速计检测到设备方向变化时在window对象上触发 
  devicemotion  设备移动事件
  Touch触摸事件
    PS: 由于触摸会导致屏幕滚动,在事件函数内使用 e.preventDefault() 阻止掉默认事件(默认滚动)
    ◆基本触摸事件[在规范中列出并获得跨移动设备广泛实现]
    touchstart  当手指放在屏幕上触发,始终会触发,而不管是否改为滑动
      即使已经有一个手指放在了屏幕上也会触发 
    touchmove   当手指在屏幕上滑动时持续触发 
      事件发生期间,调用preventDefault() 可以阻止滚动。
      Example:
        指定滑动一定距离执行动作 [self]
        var flagYear =true; // 用于记录滑动起始点的 布尔值
        year.on('touchmove',function(e){
          if (flagYear) {   // 仅记录滑动初始的位置
            starty =e.originalEvent.changedTouches[0].pageY;
            flagYear =false;
          }
          var endy = e.originalEvent.changedTouches[0].pageY;
          if (endy - starty < -20 ) { // 下滑距离20执行动作
            // 执行的代码
            
            starty =endy;
          }
          if (endy - starty > 20 ) {   // 上滑距离20执行动作
            // 执行的代码
            
            starty =endy;
          }
        })
        year.on('touchend',function(){  // 重置flagYear 用于下一次滑动
          flagYear =true;
        })
    touchend    当手指从屏幕上离开时触发,始终会触发,而不管是否改为滑动
    ◆额外的三个触摸事件[DiBs]
    touchenter   移动的手指进入一个DOM元素
    touchleave   移动手指离开一个DOM元素
    touchcancel  触摸被中断
    Example:
      var EventUtil = {
        addHandler: function(element,type,handler) {
          if(element.addEventListener) {
            element.addEventListener(type,handler,false);
          }else if(element.attachEvent) {
            element.attachEvent("on"+type,handler);
          }else {
            element["on" +type] = handler;
          }
        },
        removeHandler: function(element,type,handler){
          if(element.removeEventListener) {
            element.removeEventListener(type,handler,false);
          }else if(element.detachEvent) {
            element.detachEvent("on"+type,handler);
          }else {
            element["on" +type] = null;
          }
        }
      };
      var touch = document.getElementById("touch");
      EventUtil.addHandler(touch,"touchstart",function(event){
        console.log(event);
      })；
      
      // 连续滑动触发
      EventUtil.addHandler(window,"touchmove",function(event){
        alert(1);
      })；
      //当手指从屏幕上离开时触发;
      EventUtil.addHandler(window,"touchend",function(event){
        alert(1);
      })
    TouchEvent事件对象  
    e.touches    当前位于屏幕上的所有手指的一个列表 当前跟踪的触摸操作的Touch对象的数组
      event.touches.length  表示屏幕上触摸的手指个数 
      touch = e.touches[idx] 
      touch.clientX 触摸目标在视口中的x 坐标
      touch.clientY 触摸目标在视口中的y 坐标
      touch.identifier 标识触摸的唯一ID
      touch.pageX 触摸目标在页面中的x 坐标
      touch.pageY 触摸目标在页面中的y 坐标
      touch.screenX 触摸目标在屏幕中的x 坐标
      touch.screenY 触摸目标在屏幕中的y 坐标
      touch.target 触摸的DOM 节点目标 
    e.targetTouches    位于当前DOM元素上的手指的一个列表
      PS:touch事件会冒泡,所以我们可以使用这个属性指出目标对象.
      event.touches.length  表示元素上触摸的手指个数
    e.targetTouchs    特定于事件目标的Touch 对象的数组。
    e.originalEvent.changedTouches   
      e.originalEvent.changedTouches.Identifier  标示触摸的唯一ID [不存在?]
      e.originalEvent.changedTouches[0].clientX     触摸目标在视口中的X坐标
      e.originalEvent.changedTouches[0].clientY     触摸目标在视口中的Y坐标
      e.originalEvent.changedTouches[0].pageX    页面中的X坐标
      e.originalEvent.changedTouches[0].pageY    页面中的Y坐标
      e.originalEvent.changedTouches[0].screenX     触摸目标在屏幕中的X坐标
      e.originalEvent.changedTouches[0].screenY     触摸目标在屏幕中的Y坐标
      e.originalEvent.changedTouches[0].target      触摸的DOM节点目标
    e.changeTouches  表示自上次触摸以来发生了什么改变的Touch 对象的数组。
    event.preventDefault();  阻止滚动 [?]
      一些移动设备有缺省的touchmove行为,比如说经典的iOSoverscroll效果,
      当滚动超出了内容的界限时就引发视图反弹,这种做法在许多多点触控应用中会带来混乱。
  Gestures手势事件
    PS: 该事件针对IOS设备,一个Gestures事件在两个或更多手指触摸屏幕时触发 
      当两个手指触摸屏幕时就会产生手势,手势通常会改变显示项的大小,或者旋转显示项
    gesturestart  当一个手指已经按在屏幕上,而另一个手指又触摸在屏幕时触发 
    gesturechange 当触摸屏幕的任何一个手指的位置发生改变的时候触发。
    gestureend    当任何一个手指从屏幕上面移开时触发。
  触摸事件和手势事件的关系 
    当一个手指放在屏幕上时,会触发touchstart事件,
    而另一个手指触摸在屏幕上时触发gesturestart事件,随后触发基于该手指的touchstart事件。
    若一个或两个手指在屏幕上滑动时,将会触发gesturechange事件,
    但是只要有一个手指移开时候,则会触发gestureend事件,紧接着会触发touchend事件。
    手势的专有属性:
      rotation 表示手指变化引起的旋转角度,负值表示逆时针,正值表示顺时针,从0开始；
      scale    表示2个手指之间的距离情况,向内收缩会缩短距离,这个值从1开始的,并随距离拉大而增长。
  其他 
    navigator.platform.indexOf(‘iPad‘) != -1    判断是否为iPhone
    autocapitalize  autocorrect   自动大写与自动修正
      <input type="text" autocapitalize="off" autocorrect="off" />
    -webkit-touch-callout:none    禁止 iOS 弹出各种操作窗口
    -webkit-user-select:none      禁止用户选中文字
    关于 iOS 系统中,中文输入法输入英文时,字母之间可能会出现一个六分之一空格
      this.value = this.value.replace(/\u2006/g, ‘‘);
    input::-webkit-input-speech-button {display: none}    Andriod 上去掉语音输入按钮
    判断是否为微信浏览器；
      function is_weixn(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
          return true;
        } else {
          return false;
        }
      }
  键盘调出与关闭事件: 使用resize间接实现
    var wh1 = window.innerHeight; 
    //获取初始可视窗口高度
    $(window).resize(function() {      
      //监测窗口大小的变化事件
      var wh2 = window.innerHeight;    
      //当前可视窗口高度
      var viewTop = $(window).scrollTop();   
      //可视窗口高度顶部距离网页顶部的距离
      if(wh1 > wh2){          
        //可作为虚拟键盘弹出事件
      }
      else{                      
        //可作为虚拟键盘关闭事件
      }
    });
  click点击事件 
    click会在'touchend'事件后触发 
    click延迟
      PS: 移动端需判断是否为双击,故单击后不能立刻触发,需等300ms,直到确认不是双击才触发 
      去掉click延迟的方法 
      把viewport设置成设备的实际像素 Chrome和Safari生效 
        <meta name="viewport" content="width=device-width">
      设置initial-scale=1.0   Chrome生效 
        <meta name="viewport" content="initial-scale=1.0">
      设置CSS     Chrome和Safari都生效 
        html{
          touch-action: manipulation;
        }
自定义事件 
  // 实现自定义事件 
  function MyEventTarget() {
    this.msg = '自定义的事件对象'
    this.store = {};
  }
  MyEventTarget.prototype = {
    constructor: MyEventTarget
    ,listen: function(which,foo){
      if ( typeof this.store[which] == 'undefined') {
        this.store[which] = []
      }
      this.store[which].push(foo);
    }
    ,run: function(which,data){
      var tmp = this.store[which]
      if (typeof tmp != 'undefined') {
        for (var i = 0; i < tmp.length; i++) {
          tmp[i](data)
        }
      }
      else {
        console.log('该事件没有监听');
      }
    }
    ,clear: function(which,foo){
      var tmp = this.store[which];
      if (typeof tmp == 'undefined') {
        console.log('未监听,不用清理');
      }
      else {
        this.store[which] = tmp.filter(function(val,idx,arr){
          return val != foo
        })
      }
    }
  }
  var myET = new MyEventTarget();
-------------------------------------------------------------------------------- 
DataTransfer,数据传递  
  PS: 为实现数据交换,IE自定义了'text'和'URL'两种有效的数据类型,
    而HTML5对此扩展,允许指定MIME类型,为了兼容,HTML5也支持'text'和'URL',
    但会被映射为'text/plain'和'text/uri-list'.
    dataTransfer对象可以为每种MIME类型都保存一个值,如同时保存一段文本和一个URL 
  Extend: Object 
    console.log(DataTransfer.prototype.__proto__.constructor===Object);
  Proto: 
    .dropEffect    控制拖放元素光标显示  
      'none'    不能把拖放元素放在这,文本框外的默认值
      'move'    把拖放的元素移动到目标位置
      'copy'    把拖放的元素复制到目标位置
      'link'    放置拖放元素到目标位置并打开拖动的元素(前提是拖放元素是一个链接有URL)
    .effectAllowed 操控dropEffect属性 
      PS:必须在ondragstart事件处理程序中设置effectAllowed属性
      'uninitialized'  没有给拖放元素设置任何放置行为
      'none'           被拖放的元素不能有任何行为
      'copy'           只允许值为'copy'的dropEffect
      'link'           只允许值为'link'的dropEffect
      'move'           只允许值为'move'的dropEffect
      'copyLink'       允许值为'copy'和'link'的dropEffect
      'copyMove'       允许值为'link'和'move'的dropEffect
      'linkMove'       允许值为'link'和'move'的dropEffect
      'all'            允许任意dropEffect
    .types   当前保存的数据类型,如'text'
    .files　 存放一些拖放的本地文件,若没有拖放文件,则此列表为空
    .setDragImage()    
    .getData('text')      通过数据类型获取由setData方法保存的值
      PS:保存在dataTransfer对象中的数据只能在 drop 事件处理程序中读取.
      Example:
      设置和接收文本数据
      e.dataTransfer.setData('text','some text');
      var text =e.dataTransfer.getData('text');
      设置和接收URL
      e.dataTransfer.setData('URL','https://www.baidu.com');
      var url =e.dataTransfer.getData('URL');
    .setData('text',str)  设置传递数据及数据类型
      PS:拖动文本框中的文本时(选中的文字而非元素),浏览器自动调用setData()方法,
        将拖动的文本以"text"格式保存在dataTransfer对象中.
        在拖放链接或图像时,浏览器自动调用setData()方法保存URL,
        这些元素被拖放到放置目标时,就可以通过getData()读到这些数据了.
        也可以自定义保存的信息.
      str 字符串,表示保存的数据类型,取值为'text'或'URL'
    .clearData(format)    清除以特定格式保存的数据
    .items   DataTransferItemList, 
    兼容问题 
      .setDrageImage(elem,x,y) 指定图像,在拖动时,显示在光标下方 [Chrome不支持]
        其中elem可以时图像也可以是其他元素,若为图像则显示图像,其他元素则显示渲染后的元素.
      .addElement(elem) 为拖动操作添加一个元素
DataTransferItemList, 
  Extend: Object 
    console.log(DataTransferItemList.prototype.__proto__.constructor===Object);
  Proto: 
    .length  
    .add()   
    .remove()  
    .clear()  
DataTransferItem, 
  Extend: Object 
    console.log(DataTransferItem.prototype.__proto__.constructor===Object);
  Proto: 
    .kind 
    .type 
    .getAsString()  
    .getAsFile()  
    .webkitGetAsEntry()  
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
--------------------------------------------------------------------------------
SelfSummary: 
  事件对象分析: 
    var eventStr = 'DOMSubtreeModified' 
    var targetElem = input1
    console.log('是否支持DOM0事件:',eventStr,'on'+eventStr in targetElem);
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
    isEventSupport(eventStr,targetElem);
    targetElem['on'+eventStr] = function(e){
      console.log('事件对象:',e);
      console.log('是否冒泡:',e.bubbles);
      console.log('事件类型:',e.constructor);
      // console.log(':',e.targetElem.constructor);
      console.log('------------------------------------------------------');
    }
    targetElem.addEventListener(eventStr,function(e){
      console.log('事件对象:',e);
      console.log('是否冒泡:',e.bubbles);
      console.log('事件类型:',e.constructor);
      // console.log(':',e.targetElem.constructor);
      console.log('======================================================');
    })
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
  checkbox选中时的事件 change? 

  
  

