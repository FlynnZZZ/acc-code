BOM,Browser Object Model 浏览器对象模型 
  PS:
    访问和操作浏览器窗口(显示的页面以外的部分)
    BOM由一系列相关的对象构成,并且每个对象都提供了很多方法与属性,用来访问浏览器功能
    BOM缺少规范,每个浏览器提供商又按照自己想法去扩展他,那么浏览器共有对象就成了事实的标准
    W3C已将DOM的主要内容纳入了HTML5规范中
  BOM部分包括:
    从根本上讲,BOM只处理浏览器窗口和框架,但习惯上帮所有针对浏览器的js扩展算作BOM的一部分如,
    弹出新浏览器窗口的功能
    移动、缩放和关闭浏览器窗口的功能
    提供浏览器详细信息的navigator对象
    提供浏览器所加载页面的详细信息的location对象
    提供用户显示器分辨率详细信息的screen对象
    对cookies的支持
    像 XMLHttpRequest 和IE的 ActiveXObject 这样的自定义对象
window 对象 
  PS:BOM 是为了操作浏览器出现的 API,window 是其的一个对象.
    核心对象是window,表示浏览器的一个实例.
    window对象处于JS结构的最顶层,对于每个打开的窗口,系统都会自动为其定义window对象
    双重角色:既是JS访问浏览器窗口的一个接口,也是ECMAScript规定的Global对象
    在网页中定义的任何对象 变量和函数,都以window作为其Global对象
    若一个网页中包含框架,则每个框架都有自己的window对象,并且保存在frame集合中.
  窗口与框架
    PS:若页面中包含框架,则每个框架都拥有自己的window对象,并且保存在frames集合中
      在frames集合中,可通过数值索引(从0开始,从左至右,从上至下),
      或者框架名称来访问相应的window对象
      window.name  表示窗口/框架的名称
    e.g. :
      下面是一个包含框架的页面
      <html>
        <head>
          <meta charset="utf-8">
          <title>Frameset Example</title>
        </head>
        <frameset rows="">
          <frame src="frame.html" name=topFrame>
          <frameset cols="">
            <frame src="" name="">
            <frame src="" name="">
          </frameset>
        </frameset>
      </html>
      可通过 window.frames[0] 或者 window.frames["topFrame"] 来引用
   (更多内容参见 JavaScript高级程序设计 196页)
  位置与尺寸
    screenLeft/Top 浏览器窗口相对于电脑屏幕左边和上边的位置 [可以为负]
    screenX/Y      浏览器窗口相对于电脑屏幕左边和上边的位置 [可以为负]
      返回值为数值,单位为px
      screenLeft/Top  火狐不支持
        ie 浏览器的内边缘距离屏幕边缘的距离
        chrome 浏览器的外边缘距离屏幕边缘的距离
      screenX/Y       IE不支持
      e.g.
      typeof screenLeft; // "number"
      跨浏览器兼容方法:
        var leftX=(typeof screenLeft=="number")?screenLeft:screenX;
        var topY=(typeof screenTop=="number")?screenTop:screenY;
    innerWidth/Height outerWidth/Height 浏览器窗口尺寸
      PS:谷歌浏览器中innerWidth 和 outerWidth 相同,都为视口大小
      innerWidth/innerHeight   浏览器内尺寸
        浏览器可见区域的内宽度、高度(不含浏览器的工具栏、边框,但包含滚动条)
        支持IE9及以上
        e.g.
          alert(window.innerWidth);       //浏览器可视窗口大小,单位像素
          alert(window.innerHeight);
      outerWidth/outerHeight   浏览器外宽、高
        浏览器外宽、高(包含浏览器的工具栏、边框、滚动条)
        IE不支持
        e.g.
          alert(window.outerWidth);       //窗口+边框大小
          alert(window.outerHeight);
      IE 下可使用 DOM 方法获取(其他浏览器也支持)
        PS:DOM操作比原生方法差一些,优先使用原生属性/方法
        document.documentElement.clientWidth
        document.documentElement.clientHeight
    moveTo moveBy 调整浏览器位置
      PS:不适用于框架,只能对最完成的window对象使用
      moveTo(x,y) 移动到x,y坐标
      moveBy(x,y) 向下移动x像素,向右移动y像素
    resizeTo resizeBy 调整浏览器窗口大小
      PS:IE7(及更高版本)中默认是被禁止的
        不适用于框架,只能对最外层的window对象使用
      resizeTo(num1,num2) 调整浏览器窗口大小,宽为num1,高为num2
      resizeBy(num1,num2) 扩展/收缩大小(正数为扩大,负数为缩小)
    PS:moveTo moveBy resizeTo resizeBy 被浏览器禁用较多,用处不大
    scroll(x,y)   滚动到
      x 值表示你想要置于左上角的像素点的横坐标
      y 值表示你想要置于左上角的像素点的纵坐标
    scrollTo(x,y) 同scroll
    scrollBy(x,y) 滚动距离
      PS:要使此方法工作 window 滚动条的可见属性必须设置为true
      x 把文档向右滚动的像素数
      y 把文档向下滚动的像素数
    screen.width  设备宽度,单位是像素
    screen.height 设备宽度,单位是像素
    pageXOffset/pageYOffset 页面的水平/垂直滚动距离,单位为像素
    window.matchMedia(str); 返回一个MediaQueryList对象
      PS:若window.matchMedia 无法解析参数,matches返回的总是false,而不是报错.
      str 一个mediaQuery语句的字符串
      window.matchMedia(str).media; 返回所查询的mediaQuery语句字符串.
      window.matchMedia(str).matches; 布尔值,表示当前环境是否匹配查询语句
      addListener() 若mediaQuery查询结果发生变化就触发
        回调函数的参数是MediaQueryList对象
        e.g.:
        var mtmd = window.matchMedia("(max-width: 700px)");
        mtmd.addListener(foo); // 指定回调函数
        function foo(mtmd) { if(mtmd.matches) { } else { };}
        mtmd.removeListener(foo); // 撤销回调函数
      removeListener();
      e.g.:
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
  导航和打开/关闭窗口
    window.open([url],[窗口目标],[参数str],[boolean]);   打开/新建窗口
      PS:查找一个已经存在的窗口或者新建的浏览器窗口
        若指定的窗口目标是已有的窗口或框架,则在目标窗口中加载指定的url;
        否则打开新窗口并命名
      Arguments: 一般使用3个参数
        url:     可选,将要导航到的URL;
          若省略这个参数,或者它的值是空字符串,那么窗口就不显示任何文档.
        窗口目标: 可选,被打开窗口的名称/位置
          _self   在当前窗口显示目标网页
          _top    在所有框架之外的最顶层窗口中打开   sUrl   .假如当前窗口无框架结构,此参数值等同于   _self   .
          _blank  新建一个窗口,默认值
            不打开新新窗口的情况下会忽略第三个参数
          _parent 在当前框架的父框架内打开.假如当前框架无父框架,此参数值等同于   _self   .
          str     命名打开的窗口,后续凡是以该名称打开的窗口都在这个窗口中加载
            相同 name 的窗口只能创建一个,要想创建多个窗口则 name 不能相同.
            name 不能包含有空格
        参数str:  可选,设置窗口参数,各参数用逗号隔开
          PS:字符串中不可出现空格
          width   数值,窗口宽度,不能小于100
          height  数值,窗口高度,不能小于100
          top     数值,窗口顶部距屏幕顶部的像素值(不能是负值)
          left    数值,窗口左端距屏幕左端的像素值(不能是负值)
          menubar    yes/no,菜单栏显示,默认为no
          scrollbars yes/no,滚动条显示,默认为no
          toolbar    yes/no,工具栏显示,默认为no
          status     yes/no,状态栏显示,默认为no
          resizable  yes/no,能否拖动改变窗口大小,默认为no
          location   yes/no,是否在显示地址栏
            不同浏览器的默认值不同,操作方式也不同(可能隐藏,可能禁用)
          fullscreen yes/no,浏览器窗口是否最大化(仅限IE)
        boolean: 表示新页面是否取代浏览器记录中当前加载页面的布尔值
      RetValue: 返回打开窗口的window对象
        PS:有些浏览器默认情况下不允许我们调整主浏览器窗口或位置
          但允许调整创建的窗口
      window.opener   表示打开它的原始窗口window对象.
        PS:
          打开的窗口(新窗口)关联着原始窗口(老窗口);
          打开新窗口后,若新窗口运行在独立的进程中,则两个window对象间不能通信 ?
          在本地file协议下,大部分该对象属性不可用,需要在服务器上运行.
          使用超链接打开的新窗口也可以.
        newWin.opener =null;  切断联系
          表示在单独的进程中运行新标签页,告诉浏览器他们不需要通信,
          联系一旦切断就无法恢复了
        自我总结:
          当打开的新窗口在当前窗口显示(即 _self、_parent或_top等),
          则 window.opener 表示为当前的窗口也就是新窗口而无法获取到原窗口.
          window.opener.document.querySelector(); 获取到父元素的DOM对象
      e.g.
        open('https://www.baidu.com','abc',width=300,height=300,top=100)
        若设置了参数属性,则会在新的浏览器窗口中打开窗口,
        因为现存的窗口风格和需要打开的新窗口风格不同.

        在新打开的窗口中弹出警告栏
        var box =open('https://www.baidu.com','abc')
        box.alert('abc')

        子窗口操作父窗口:点击新打开的窗口在父窗口输入一行字
        var aoo =window.open('https://www.baidu.com','abc',"width=300,height=300,top=100");
        document.onclick =function(){ aoo.opener.document.write("点击了子窗口"); }
        结果为:点击父窗口在父窗口打印.(Chrome中测试)
      Remarks:
        若浏览器扩展或其他程序阻止弹出窗口,open()通常会报错
      sSummary: 
        微信中兼容性问题
          android: 不管窗口目标是是什么,始终在当前页面打开,
          ios    : 只有目标窗口为'_self'时才有效「不填写也不行」,其他则该方法不生效;
    window.close();   关闭窗口,返回表示是否成功操作的布尔值
  计时器/函数调用 延时调用&间时调用&动画调用API
    JS单线程异步执行的机制
      JS引擎只有一个线程,强迫异步事件排队等待被执行,不可在同时执行两条命令
      setTimeout
        被延时执行的代码会被从同步任务队列放置到异步执行队列,并开始计时
        异步队列会在同步队列所有代码执行完,JS引擎空闲后,
        在计时结束时,开始执行延时代码.
        若异步队列在执行的时被阻塞了,那么它将会被推迟到下一个可能的执行点,
        所以延迟时间大于等于定时器设置的值.
        e.g.:
        console.log(1);
        setTimeout(function() {console.log('a')}, 9);
        setTimeout(function() {console.log('b')}, 3);
        setTimeout(function() {console.log('c')}, 0);
        var sum = 0;
        for(var i = 0; i < 1000000; i ++) { sum += 1; }
        console.log(sum);
        setTimeout(function() {console.log('d');}, 0);
        // 1 → 1000000 → c → b → d → a
      setInterval
        依次向异步列队中添加延时调用,
        每个延时调用分别计时,不会互相影响.
        当只有第n个延时被阻塞且阻塞时间小于间隔时间,
        则n-1 到 n 的间隔时间大于指定间隔时间, n 到 n+1 小于间隔时间.
        当阻塞时间大于间隔时间,则前面的调用被抛弃且立即调用下次(保证间时最接近指定值)
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
    var stId =setTimeout(foo,num[,arg1,arg2...]); 在指定的时间后执行代码
      Arguments:
        foo 需延时调用的函数名
        num 数值,延时的时间,单位为毫秒,未指定默认为0
        arg 可选,传入foo的参数
      RetValue:返回表示该超时调用的id的数值
      有解析功能,第一个参数可以是字符串代码
        不推荐此种写法,容易出错,不易扩展,损失性能
        setTimeout("alert('abc')",2000);  // 2秒后执行代码块
    clearTimeout(stId); 解除延时调用
      e.g.
      var aoo=setTimeout(function(){ alert("abc");},2000);
      console.log(aoo);  // 50500,延时调用的id值
      clearTimeout(aoo); // 取消调用
      等价于
      clearTimeout(50500);
      但此种写法可能存在问题,因为id值可能会变,非一直为定值
    var siId =setInterval(foo,num); 每隔指定时间执行一次代码
      Arguments:
        foo 需延时调用的函数名
        num 数值,延时的时间,单位为毫秒
    clearInterval(siId); 解除间时调用
      e.g.
      var box=setInterval(function(){ alert("abc"); },1000);
      clearInterval(box); // 取消调用
      console.log(box);   // 1518 ,虽然已取消调用 但box值仍存在
    使用 setTimeout 仿造 setInterval
      在开发环境下,很少使用真正的间歇调用,因为需要根据情况来取消,可能造成同步的一些问题.
      e.g.
      使用超时调用设置定时器
      <div id="a"></div>
      <script>
        var num =0;
        var max =5;
        function box(){
          num++;
          document.getElementById('a').innerHTML +=num;
          if(num ==max){
            alert('5秒到了!');
          }else{
            setTimeout(box,1000);
          }
        }
        box();
      </script>
    var rafId =requestAnimationFrame(函数);
      PS:原理跟setTimeout/setInterval类似,
        通过递归调用同一方法来不断更新画面以达到动起来的效果,
        它优于setTimeout/setInterval的地方在于它是由浏览器专门为动画提供的API,
        浏览器会自动优化方法的调用,如页面非激活状态下,动画会自动暂停,节省了CPU开销
      接收一个函数作为回调,返回一个ID值
      常用操作:在函数体内使用 requestAnimationFrame 来调用该函数来实现效果.
    cancelAnimationFrame(rafId); 通过返回ID值取消动画.
  系统对话框
    PS:系统对话框与浏览器中显示的网页没有关系,也不包含HTML
      他们的外观由操作系统或浏览器设置决定
      显示这些对话框的时候代码会停止执行,关掉后恢复
    alert("abc");   警告对话框,显示一条信息
    confirm("abc"); 需要用户确认的对话框,返回一个布尔值
      有确定和取消按钮,点击确定返回true,点击取消返回false
      e.g.
      if(confirm("请选择")){
        alert("您按了确定按钮");
      }else{
        alert("您按了取消按钮");
      }
    prompt("提示文字","默认显示文字"); 要求用户输入信息的输入框,
      点击确定,则返回值为用户输入的值;点击取消,则返回null.
    find();    调出查找对话框,异步显示
    print();   调出打印对话框,异步显示
  其他属性方法
    onload
    closed          当窗口关闭时返回true
    frame           窗口中的框架对象数组
    length          窗口中的框架数量
    offscreenBuffering        用于绘制新窗口内容并在完成后复制已存在的内容,控制屏幕更新
    opener          打开当前窗口的窗口
    self            指示当前窗口
    defaultStatus   底部状态栏默认显示(可读写)
      读写 浏览器底部状态栏默认显示值
      defaultStatus="状态栏默认显示文本";
    status          底部状态栏条件显示的值
      浏览器在某种条件下显示的值,当条件不成立时则不显示.
      描述由用户交互导致的状态栏的临时消息
      status="状态栏文本";
    parent          指向包含另一个窗口的窗口(有框架使用)
    top             包含特定窗口的最顶层窗口(由框架使用)
    window          指示当前窗口,与self等效
    // 窗口操作
    blur()        将焦点从窗口移除
    focus()       将焦点移至窗口
    方法
    window.btoa()  将ascii字符串或二进制数据转换成一base64编码过的字符串
    window.atob()  解码
      PS:该方法不能直接作用于Unicode字符串.
        由于一些网络通讯协议的限制,必须使用该方法对原数据进行编码后,才能进行发送.
        接收方使用相当于 window.atob 的方法对接受到的base64数据进行解码,得到原数据.
        DOM Level 0 规范
      e.g.:
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
  文本相关
    var selecText = window.getSelection();  返回一个 Selection 对象,表示选中的文字
      PS:可通过连接一个空字符串 "" 或使用  toString() 方法,获取文本字符串.
        当该对象被传递给期望字符串作为参数的函数中时,如 window.alert 或 document.write,
        对象的toString()方法会被自动调用,而不用手动转换.
      e.g.:
        打印出文档中被选中的的文字
        $(document).mouseup(function (e) {
          var txt = window.getSelection();
          if (txt.toString().length >= 1) { alert(txt); }
        });
  Remarks:
    由于window是顶层对象,因此调用它的子对象/属性/方法时可以不显示的指明window对象
      例如window.alert()和alert()是一个意思.
      实际上全局变量 a 等价于 window.a
    加上window.和不加window.的区别:
      不加window.情况,当某个浏览器识别不了该属性/方法时,就当作变量使用了
      加window则是强制性的操作,不会产生误会.
      当所有浏览器都支持的属性或方法,可不用加window.
    全局环境中的变量、函数都是window对象的属性和方法.
      全局变量与window属性的差异:
      全局变量(准确的说应该是显式声明的全局变量)无法使用delete, window属性则可以
      访问未声明的变量会报错,而未声明window对象的属性则为undefined.
window的属性对象 
  对象本身也是window的属性
  window.document  文档对象 「更多详见 DOM document对象」
    document.cookie  读写当前网页的cookie
      PS:网站为了标示用户身份而储存在Client Side「用户本地终端」上的数据,通常经过加密;
        可访问的前提下,http请求中cookie始终会被携带,
        即在主域名中设置的cookie会始终在同源的主域名和其子域名的http请求中携带,
        在子域名中设置的cookie会始终在该子域名的http请求中携带;
        客户端的磁盘上,每个域名大小在4kb以内;
        每个特定的域名下最多生成 20 个cookie「DiBs」;
        重要数据不建议保存在cookie中,
        cookie同源政策不要求传输协议,即http和https之间读写无限制
      cookie之间使用分号分割,需手动取出每一个cookie 
        var cookie = document.cookie.split(';');
        for (var i = 0; i < cookie.length; i++) {
          console.log(cookie[i]);
        }
      document.cookie = str; 写入cookie 
        PS：不会对原有的cookie进行覆盖,只会进行增加
          分号、逗号、空格不可作为cookie的值,可使用encodeURIComponent方法进行转义;
        document.cookie ='key=val;expires=time;domain=域名;path=路径;secure'
        key=val  必须,cookie的内容
        expires  可选,过期时间,即过了该时间,cookie被清理
          PS:使用格式采用 Date.toUTCString() 格式, 参照时间为本地时间,
            若未设置或设置为null,当窗口关闭时Cookie被清理;
          e.g. 设置7天后cookie过期
            var date =new Date();
            date.setDate((date,getDate()-1));
            document.cookie ='user='+encodeURIComponent('张三')+';expires='+date;
            decodeURICompinent(document.cookie);
        domain   可选,限制域名访问,必须为当前发送Cookie域名的一部分
          PS:只有访问的域名匹配domain属性,Cookie才会发送到服务器
          e.g.:
            example.com
            .example.com    // 对所有子域名生效
            subdomain.example.com
        path     可选,限制路径访问,只有在该路径及其下才可访问该cookie
        secure   可选,指定是否使用https协议
          该属性为一个开关,不需指定值,若通信为https协议,则其自动打开
        max-age  指定Cookie有效期,如 60*60*24*365 「一年31536000秒」
        HttpOnly 设置Cookie是否被JS读取,主要为了防止XSS攻击盗取Cookie
          Set-Cookie: key = value;HttpOnly
          该Cookie JS无法获取;AJAX操作也无法获取
      document.cookie 一次只能写入一个cookie;向浏览器发送时,将全部发送
        服务器在浏览器储存cookie时分行指定
        HTTP/1.0 200 OK
        Content-type: text/html
        Set-Cookie  : key1 = value1 
        Set-Cookie  : key2 = value2
        Set-Cookie字段用于服务器向浏览器写入Cookie,一行一个
      browser对Cookie的限制 
        Firefox中每个域名限制Cookie数量为50,Safari和Chrome无数量限制;
        Cookie累加长度限制为4kb,超过部分被忽略;
          通过使用其他符号分割,避免Cookie的数量限制,读取时再自行解析
          e.g.: name=a&b=c&d=e&f=g
      修改cookie
        若服务器想改变一个已存在的cookie,则修改时key、domain、path、secure需都匹配,
        否则,则是新建一cookie;
      设置Cookie的expires为0或者过期时间 删除cookie
    document.hidden  网页可见性API 「HTML5」 
      页面不可见时播放中的视频暂停，可见时视频继续播放
        <video id="video" autoplay="autoplay" loop="loop" src="http://www.w3school.com.cn/example/html5/mov_bbb.mp4"> </video>
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
            case true: //返回hidden = true，页面不可见
              video.pause();
              break;
            case false: //返回hidden = false，页面可见
              video.play();
              break;
          }
        }
  window.history   保存着用户上网的记录,从窗口被打开的那一刻算起
    PS:每个浏览器窗口、标签页及每个框架,都有自己的history对象与特定的window对象关联
      处于安全考虑,开发人员不再到用户浏览过的URL,
      但借由用户访问过的页面列表,可在不知道实际url的情况下实现后退和前进;
    history.length      历史记录数量
      对于加载到窗口、标签页或框架中的第一个页面而言,history.length 为 0;
      当页面的URL改变时(包括hash的改变),就会生成一条历史记录,
      因此,设置 location.hash; 会在浏览器中生成一条新的历史记录
    history.forward()   模仿浏览器的前进按钮
    history.back()      模仿浏览器的前进按钮
    history.go(num/str) 在历史记录中跳转
      Arguments:
        num为正,表示向前进num个记录
        num为负,表示向后退num个记录
        0 相当于刷新当前页面。
      为字符串时,跳转到历史记录中包含该字符串的第一个位置
        可能前进也可能后退,决定于那个位置最近
        若历史记录中不包含该字符串则什么也不做
    history.pushState  「HTML5」 
      检查当前浏览器是否支持
        if (!!(window.history && history.pushState)){
          // 支持History API
          console.log('支持');
        } 
        else {
          // 不支持
          console.log('不支持');
        }
      history.pushState(对象,'title',path); 增加历史记录 
        PS:只增加历史记录,而不跳转页面,相当于增加当前页面的一个状态;
          前进或后退 网页不跳转,url有变化;
          如可把当前地址发送个其他人而访问该页面的当前状态,
          只能改路径而不能改域名
          只能增加当前域名下的url
        三个参数:
          自定义对象
          新页面的标题(现在还没有浏览器实现该功能,有没有都一样)
          新页面的地址
            即在当前网址后添加的值
            可以是路径,如:/box
            也可以是字符串,如:?c=1&b=2
        e.g.
          history.pushState(null,'a','/abcd')
      history.replaceState 替换当前状态 
        和 pushState类似,但不是增加而是替换
      Todo: 
        history.pushState方法接受三个参数,依次为：
        
        state：一个与指定网址相关的状态对象,popstate事件触发时,该对象会传入回调函数。若不需要这个对象,此处可以填null。
        title：新页面的标题,但是所有浏览器目前都忽略这个值,因此这里可以填null。
        url：新的网址,必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。
        假定当前网址是example.com/1.html,我们使用pushState方法在浏览记录(history对象)中添加一个新记录。
        
        var stateObj = { foo: 'bar' };
        history.pushState(stateObj, 'page 2', '2.html');
        添加上面这个新记录后,浏览器地址栏立刻显示example.com/2.html,但并不会跳转到2.html,甚至也不会检查2.html是否存在,它只是成为浏览历史中的最新记录。假定这时你访问了google.com,然后点击了倒退按钮,页面的url将显示2.html,但是内容还是原来的1.html。你再点击一次倒退按钮,url将显示1.html,内容不变。
        
        总之,pushState方法不会触发页面刷新,只是导致history对象发生变化,地址栏会有反应。
        
        若pushState的url参数,设置了一个新的锚点值(即hash),并不会触发hashchange事件。若设置了一个跨域网址,则会报错。
        
        // 报错
        history.pushState(null, null, 'https://twitter.com/hello');
        上面代码中,pushState想要插入一个跨域的网址,导致报错。这样设计的目的是,防止恶意代码让用户以为他们是在另一个网站上。
        
        history.replaceState()
        history.replaceState方法的参数与pushState方法一模一样,区别是它修改浏览历史中当前纪录。
        
        假定当前网页是example.com/example.html。
        
        history.pushState({page: 1}, 'title 1', '?page=1');
        history.pushState({page: 2}, 'title 2', '?page=2');
        history.replaceState({page: 3}, 'title 3', '?page=3');
        
        history.back()
        // url显示为http://example.com/example.html?page=1
        
        history.back()
        // url显示为http://example.com/example.html
        
        history.go(2)
        // url显示为http://example.com/example.html?page=3
        history.state属性
        history.state属性返回当前页面的state对象。
        
        history.pushState({page: 1}, 'title 1', '?page=1');
        
        history.state
        // { page: 1 }
        popstate事件
        每当同一个文档的浏览历史(即history对象)出现变化时,就会触发popstate事件。
        
        需要注意的是,仅仅调用pushState方法或replaceState方法 ,并不会触发该事件,只有用户点击浏览器倒退按钮和前进按钮,或者使用JavaScript调用back、forward、go方法时才会触发。另外,该事件只针对同一个文档,若浏览历史的切换,导致加载不同的文档,该事件也不会触发。
        
        使用的时候,可以为popstate事件指定回调函数。这个回调函数的参数是一个event事件对象,它的state属性指向pushState和replaceState方法为当前URL所提供的状态对象(即这两个方法的第一个参数)。
        
        window.onpopstate = function (event) {
          console.log('location: ' + document.location);
          console.log('state: ' + JSON.stringify(event.state));
        };
        
        // 或者
        
        window.addEventListener('popstate', function(event) {
          console.log('location: ' + document.location);
          console.log('state: ' + JSON.stringify(event.state));
        });
        上面代码中的event.state,就是通过pushState和replaceState方法,为当前URL绑定的state对象。
        
        这个state对象也可以直接通过history对象读取。
        
        var currentState = history.state;
        注意,页面第一次加载的时候,在load事件发生后,Chrome和Safari浏览器(Webkit核心)会触发popstate事件,而Firefox和IE浏览器不会。
        
        URLSearchParams API
        URLSearchParams API用于处理URL之中的查询字符串,即问号之后的部分。没有部署这个API的浏览器,可以用url-search-params这个垫片库。
        
        var paramsString = 'q=URLUtils.searchParams&topic=api';
        var searchParams = new URLSearchParams(paramsString);
        URLSearchParams有以下方法,用来操作某个参数。
        
        has()：返回一个布尔值,表示是否具有某个参数
        get()：返回指定参数的第一个值
        getAll()：返回一个数组,成员是指定参数的所有值
        set()：设置指定参数
        delete()：删除指定参数
        append()：在查询字符串之中,追加一个键值对
        toString()：返回整个查询字符串
        var paramsString = 'q=URLUtils.searchParams&topic=api';
        var searchParams = new URLSearchParams(paramsString);
        
        searchParams.has('topic') // true
        searchParams.get('topic') // "api"
        searchParams.getAll('topic') // ["api"]
        
        searchParams.get('foo') // null,注意Firefox返回空字符串
        searchParams.set('foo', 2);
        searchParams.get('foo') // 2
        
        searchParams.append('topic', 'webdev');
        searchParams.toString() // "q=URLUtils.searchParams&topic=api&foo=2&topic=webdev"
        
        searchParams.append('foo', 3);
        searchParams.getAll('foo') // [2, 3]
        
        searchParams.delete('topic');
        searchParams.toString() // "q=URLUtils.searchParams&foo=2&foo=3"
        URLSearchParams还有三个方法,用来遍历所有参数。
        
        keys()：遍历所有参数名
        values()：遍历所有参数值
        entries()：遍历所有参数的键值对
        上面三个方法返回的都是Iterator对象。
        
        var searchParams = new URLSearchParams('key1=value1&key2=value2');
        
        for (var key of searchParams.keys()) {
          console.log(key);
        }
        // key1
        // key2
        
        for (var value of searchParams.values()) {
          console.log(value);
        }
        // value1
        // value2
        
        for (var pair of searchParams.entries()) {
          console.log(pair[0]+ ', '+ pair[1]);
        }
        // key1, value1
        // key2, value2
        在Chrome浏览器之中,URLSearchParams实例本身就是Iterator对象,与entries方法返回值相同。所以,可以写成下面的样子。
        
        for (var p of searchParams) {
          console.log(p);
        }
        下面是一个替换当前URL的例子。
        
        // URL: https://example.com?version=1.0
        var params = new URLSearchParams(location.search.slice(1));
        params.set('version', 2.0);
        
        window.history.replaceState({}, '', `${location.pathname}?${params}`);
        // URL: https://example.com?version=2.0
        URLSearchParams实例可以当作POST数据发送,所有数据都会URL编码。
        
        let params = new URLSearchParams();
        params.append('api_key', '1234567890');
        
        fetch('https://example.com/api', {
          method: 'POST',
          body: params
        }).then(...)
        DOM的a元素节点的searchParams属性,就是一个URLSearchParams实例。
        
        var a = document.createElement('a');
        a.href = 'https://example.com?filter=api';
        a.searchParams.get('filter') // "api"
        URLSearchParams还可以与URL接口结合使用。
        
        var url = new URL(location);
        var foo = url.searchParams.get('foo') || 'somedefault';      
    popstate 事件 改变url时在window上触发
      event.state 为pushState的第一个参数
  window.location  管理URL
    PS:提供了与当前窗口中加载的文档有关的信息(包含url信息),还提供了一些导航功能
      既是window的属性也是document的属性,
      即 window.location 和 document.location 引用的是同一个对象
      每次修改location的属性「hash除外」,页面都会以新URL重新加载,且生成一条历史记录
    location.href      取/设整个url
      返回值为当前的位置
      e.g. :
      location.href = 'https://www.baidu.com'; //当前网页跳转到百度
    location.hash      取/设URL锚点部分(若该部分存在,否则返回空字符串)(#后面的部分)
    location.host      主机名:端口名(域名+端口(默认端口就不写出))
    location.hostname  取/设 主机名/服务器名
    location.pathname  取/设 路径名(URL中的目录和文件名)
    location.port      取/设 端口号(若url中不包含端口号则返回空字符串)
    location.protocol  协议(通常是 http: 或 https:)
    location.search    取/设URL的查询字符串(以问号?开头)
    location.assign(url);  跳转到指定页面
      location.assign('https://www.baidu.com')    //跳转到百度主页
      以下两行代码与显示调用assign()方法效果完全一样(会调用assign方法)
      window.location ="https://www.baidu.com";
      location.href ="https://www.baidu.com";
    location.replace(url); 跳转到指定页面,无历史记录,不可后退
      e.g. :
      location.replace('https://www.baidu.com'); // 跳转到百度
    location.reload();     重载当前url
      location.reload();
      最有效的重新加载,有可能从缓存加载(即页面自从上次请求以来并没有改变过)
      location.reload(true);
      强制加载,从服务器重新加载
      Remarks:
        位于reload调用之后的代码可能会也可能不执行,取决于网络延迟或系统资源等因素
  window.navigator 浏览器检测
    PS: 最早由Netscape引入,现在已成为识别客户端浏览器的事实标准 
      与其他BOM对象一样,每个浏览器所包含的内容并不完全相同
    // 浏览器
    navigator.appCodeName;  浏览器名称,通常为Mozilla(即使非Mozilla浏览器也如此)
    navigator.appName;      浏览器名称,该属性不能精确区分出浏览器
      navigator.appName; //"Netscape",谷歌浏览器中的返回值
    navigator.appVersion;      浏览器版本.一般不与实际版本对应.
    navigator.appMinorVersion; 次版本信息
    navigator.buildID;         浏览器编译版本
    navigator.product;         产品名称(如 Gecko)
    navigator.productSub;      产品的次要信息(如 Gecko的版本)
    navigator.vendor;      浏览器的品牌
    navigator.vendorSub;   有关供应商的次要信息
    navigator.userAgent;  用户代理字符串,显示浏览器的信息(也将兼容的浏览器的信息列出)
      navigator.userAgent;
      //"Mozilla/5.0(Windows NT 10.0; WOW64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36",谷歌浏览器
    navigator.plugins;  返回浏览器安装插件的信息,类型为数组
      navigator.plugins[i].name;        //插件名
      navigator.plugins[i].filename;    //插件的磁盘文件名
      navigator.plugins[i].length;      //plugins数组的元素个数
      navigator.plugins[i].description; //插件的描述信息
      IE浏览器控件检测(IE浏览器不支持插件)
        IE是以COM对象的方式实现插件的,
        而COM对象使用唯一标识符来表示
        e.g.
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
    navigator.language; 浏览器的主语言
    navigator.systemLanguage; 操作系统的主语言
    navigator.userLanguage;   操作系统的默认语言
    navigator.preference(); 设置用户的首选项
    navigator.userProfile; 借以访问用户个人信息的对象
    navigator.mimeTypes; 在浏览器中注册的MIME类型数组
    navigator.onLine;   返回浏览器是否链接到了因特网的布尔值 「HTML5」
    navigator.cookieEnabled;  返回浏览器是否支持「启用」cookie的布尔值
      启用cookie返回true,否则返回false
      cookieEnabled属性说明
        通常可以在浏览器的临时文件夹中保存一个文件,
        此文件可以包含用户信息(比如浏览过什么页面,是否选择了自动登录)等,
        这个文件被称作cookie,
        通过cookieEnabled属性可以判断浏览器是否启用了此功能
    navigator.javaEnabled();  浏览器是否启用Java
    // 系统
    navigator.platform   所在系统平台(如 "Win32")
    navigator.cpuClass; 客户端计算机使用的CPU类型(x86、68K、Alpha、PPC或Other)
    navigator.oscup;  客户端计算机的操作系统或使用的CPU
    //
    navigator.registerContentHandler()
    navigator.registerProtocolHandler()

    navigator.geolocation 地理定位 「HTML5」
      PS:在地理定位API中,使用小数值来表示经纬度「西经和南纬都用负数表示」
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
      e.g.
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
          event.coords.altitudeAccuracy  海拔精度「m」
          event.coords.heading           以360度表示的方向
          event.coords.speed             速度 「m/s」
          event.timestamp 事件戳,表示获取位置时的时间
        var err = function(event){ }  回调函数,无法确定位置「如用户拒绝授权时」,调用
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
      Google Maps API 「非HTML5规范」
        该 API 未提供可视化表示工具,使用第三方工具 Google Maps(非HTML5规范)
        引入 API 放置在 HTML head中
          <script src="http://maps.google.com/maps/api/js?sensor=true"></script>
          sensor=true 表示代码中用到自己的位置;若不用自己位置可设置为false
    navigator.vibrate     设备震动 「HTML5」 
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
    navigator.permissions.query()   许可查询 「HTML5」 
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
    navigator.battery     电池API,针对移动设备用于检测设备的电池信息 「HTML5」 
      var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;
      battery.charging;
      battery.level;
      battery.dischargingTime;
      battery.addEventListener("chargingchange",function(e){
      })
  window.screen    管理屏幕
    PS:JS中有几个对象在编程中用处不大,而screen对象就是其中之一.
      screen对象基本上只用来表明客户端的能力
      每个浏览器中的screen对象包含的属性不尽相同
    screen.width;    设备屏幕的宽
    screen.height;   
    screen.availHeight; 屏幕的可用宽度
      availHeight与height区别在于availHeight除去了任务栏高度
    screen.availWidth;
    screen.availLeft;
    screen.availTop;
    screen.colorDepth;  表现颜色的位数,一般为16[表示16-bit]或24[表示24-bit]
  window.frames    包含窗口所有框架的一个数组
  客户端检测(详细见 JavaScript高级程序设计 228 页)
    PS:
      由于浏览器之间的差异,客户端检测除了是一种补救措施外,
      更是一种很难过行之有效的开发策略;
      先设计最通用的方案,在使用特定于浏览器的技术增强方案.
    能力检测: 能力检测又称为特性检测,识别浏览器的某些特性
    怪癖检测: 识别浏览器的特殊行为
      但与能力检测确认浏览器支持什么能力不同, 怪癖检测是想要知道浏览器存在什么缺陷(bug).
      bug一般属于个别浏览器独有,在大多数新版本中被修复.
    用户代理检测:通过检测用户代理字符串来确定实际使用的浏览器
      在每一次http请求过程中,用户代理字符串是作为响应首部发送的
      用户代理字符串可以通过JS的 navigator.userAgent 属性访问.
      通过用户代理字符串,获取当前浏览器的版本号、浏览器名称、系统名称.
      在服务器端,通过检测用户代理字符串确定用户使用的浏览器是一种比较广为接收的做法.
      但在客户端,这种测试被当作是一种万不得已的做法,且饱受争议,
      其优先级排在能力检测或怪癖检测之后.
      饱受争议的原因是因为它具有一定的欺骗性.
AJAX,Asynchronous JavaScript and XML  异步的JS和XML 
  介绍
    PS: 浏览器提供了使用http协议收发数据的接口,名为 AJAX;
      可用JS动态抓取内容构建页面;
      file 协议无法使用 AJAX,只有 http 和 https 协议才可以使用 AJAX;
      还支持通过其他协议传送,比如File和FTP 
      Ajax提供与服务器异步通信的能力
      该技术能够向服务器请求额外的数据而无须刷新页面
      虽然Ajax中的x代表的是XML,但Ajax通信和数据格式无关,即该技术不一定使用XML.
      W3C也在2006年发布了AJAX的国际标准.
    AJAX 的组成
      并非一种新的技术,而是几种原有技术的结合体.
      它由下列技术组合而成.
      使用CSS和XHTML来表示.
      使用DOM模型来交互和动态显示.
      使用XMLHttpRequest来和服务器进行异步通信.
      使用javascript来绑定和调用.
      在上面技术中,除了XmlHttpRequest对象以外,
      其它所有的技术都是基于web标准并且已经得到了广泛使用的.
    AJAX 运行原理:
      通过XmlHttpRequest对象来向服务器发http请求,
      从服务器获得数据,然后用javascript来操作DOM而更新页面.
      可以把服务器端看成一个数据接口,它返回的是一个纯文本流,
      这个文本流可以是XML格式、HTML、Javascript代码、JSON格式,也可以只是一个字符串.
      普通的web开发流程:向服务器端请求这个页面,客户端将文本的结果写入页面.
      使用Ajax:客户端在异步获取这个结果后,先由 JS 来处理,然后再显示在页面.
    AJAX 的缺点:
      不支持使用后退功能
      对搜索引擎的支持比较弱
      AJAX 不能跨域访问;不能跨端口(即需在同一域及同一端口下)
        浏览器安全策略不允许向不同的域发送请求,请求被拒绝,而未发出.
  XMLHttpRequest 对象
    PS:XMLHttpRequest对象是AJAX技术实现的核心.
      通过调用该对象的属性和方法实现各种功能.
      IE5最先引入XMLHttpRequest对象到浏览器,通过MSXML库中的一个ActiveX对象实现.
      XMLHttpRequest Level2 是XMLHttpRequest的最新版本.
    XMLHttpRequest 对象创建: 使用XMLHttpRequest构造函数
      var xhr = new XMLHttpRequest();
      请求发送到服务器端,在收到响应后,响应的数据会自动填充XMLHttpRequest对象的属性
      即调用XMLHttpRequest的属性可以得到响应的信息
    level版本说明
      Level1
        只支持文本数据的传送,无法用来读取和上传二进制文件
        传送和接收数据时,没有进度信息,只能提示有没有完成
        受到"同域限制"(Same Origin Policy),只能向同一域名的服务器请求数据
      XMLHttpRequest2级进一步发展了xhr
        xhr已经广发支持,成了事实标准,W3C开始着手制定相应的标准以规范其行为
        增加的新功能
          可以设置 HTTP 请求的时限
          可以使用 FormData 对象管理表单数据
          可以上传文件
          可以请求不同域名下的数据(跨域请求)
          可以获取服务器端的二进制数据
          可以获得数据传输的进度信息
        并非所有浏览器都完整的实现了XMLHttpRequest2级规范,但都实现了其规定的部分内容
        level2兼容level1.
    ◆请求 request
    xhr.open(method,url[,async]); 建立请求,以备(数据)发送(而未发送数据)
      PS:open()方法未发送请求,只是启动一个请求以备发送,通过send()方法进行请求发送
        若对使用过open()方法的请求,再次使用这个方法,等同于调用abort()
      method      GET、POST或PUT等 发送请求的类型
      url         请求的地址(即向哪个地方发送请求,向谁请求)
        可使用相对地址或绝对地址.
      async       可选,布尔值,默认为true异步
        异步通信方式(true):客户端就不等待服务器的响应,而可以继续执行后面的操作
        同步方式(false):客户端就要等到服务器返回消息后才去执行其他操作
      userName    可选,用户名,默认为空字符串
      passWord    可选,密码,默认为空字符串
    xhr.setRequestHeader(key,val); 设定请求头信息
      PS:该方法必须在 open 方法之后,send 方法之前使用.
        若该方法多次调用,设定同一个字段,则每一次设置的值会被合并成一个单一的值发送.
      e.g.:
        设置头信息Content-Type,表示发送JSON格式的数据；
        xhr.setRequestHeader('Content-Type', 'application/json');
        然后设置Content-Length,表示数据长度；
        xhr.setRequestHeader('Content-Length', JSON.stringify(data).length);
    xhr.overrideMimeType() 重写由服务器返回的 MIME type [IE不支持] [Level2]
      PS:该方法需在send方法之前调用
        Firefox最早引入该方法用于重写xhr响应的MIME类型
        该方法被XMLHttpRequest2级纳入规范中
      e.g. :
      var xhr =new XMLHttpRequest();
      xhr.open("get","URL",true);
      xhr.overrideMimeType("text/XML");
      xhr.send(null);
      强制使xhr对象将响应当作XML而非纯文本来处理
    xhr.withCredentials  跨域请求时,用户信息是否会包含在请求之中的布尔值
      用户信息,比如Cookie和认证的HTTP头信息,
      默认为false,即向example.com 发出跨域请求时,
      不会发送example.com 设置在本机上的Cookie(若有的话);
      若你需要通过跨域AJAX发送Cookie,需要打开withCredentials.
      xhr.withCredentials = true;
      为了让该属性生效,服务器必须显式返回Access-Control-Allow-Credentials这个头信息.
      Access-Control-Allow-Credentials: true
      withCredentials属性打开的话,不仅会发送Cookie,还会设置远程主机指定的Cookie.
      注意,此时你的脚本还是遵守同源政策,
      无法 从document.cookie 或者HTTP回应的头信息之中,读取这些Cookie.
    xhr.send(data); 发送请求(数据)
      data 发送的数据,类型可为 ArrayBufferView Blob Document String FormData
        可以为空,即发送请求但不发送数据内容,可写作 xhr.send(null) 或 xhr.send()
        若不带参数,就表示HTTP请求只包含头信息,也就是只有一个URL典型例子就是GET请求；
        若带有参数,就表示除了头信息,还带有包含具体数据的信息体,典型例子就是POST请求.
      e.g.:
        发送get请求
          ajax.open('GET',
            'http://www.example.com/somepage.php?id='+ encodeURIComponent(id),true );
          等同于
          var data = 'id=' + encodeURIComponent(id));
          ajax.open('GET', 'http://www.example.com/somepage.php', true);
          ajax.send(data);
          GET请求的参数,可以作为查询字符串附加在URL后面,也可以作为send方法的参数
        发送POST请求
          var data = 'email=' + encodeURIComponent(email) + '&password='
            + encodeURIComponent(password);
          ajax.open('POST', 'http://www.example.com/somepage.php', true);
          ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          ajax.send(data);
        发送二进制数据,最好使用ArrayBufferView或Blob对象,这使得通过Ajax上传文件成为可能
          function sendArrayBuffer() {
            var xhr = new XMLHttpRequest();
            var uInt8Array = new Uint8Array([1, 2, 3]);
            xhr.open('POST', '/server', true);
            xhr.onload = function(e) { ... };
            xhr.send(uInt8Array.buffer);
          }
        FormData类型可以用于构造表单数据
          var formData = new FormData();
          formData.append('username', '张三');
          formData.append('email', 'zhangsan@example.com');
          formData.append('birthDate', 1940);
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "/register");
          xhr.send(formData);
          效果与点击下面表单的submit按钮一样
          <form id='registration' name='registration' action='/register'>
            <input type='text' name='username' value='张三'>
            <input type='email' name='email' value='zhangsan@example.com'>
            <input type='number' name='birthDate' value='1940'>
            <input type='submit' onclick='return sendForm(this.form);'>
          </form>
    ◆事件
      PS:所有XMLHttpRequest的监听事件,都必须在send()方法调用之前设定
    xhr.onreadystatechange  readyState值改变时触发该事件
      PS:异步调用时,触发readystatechange事件,然后检测 readyState 属性检测状态
        只要readyState属性的值由一个值变成另一个值就会触发一次readystatechange事件
      e.g. :
      xhr.onreadystatechange =function(){
        if(xhr.readyState ===4 && xhr.status === 200) { }
      };
    xhr.ontimeout  超时事件,当响应时间超过指定时间触发 [Level2]
    xhr.onprogress  在接收响应期间持续不断的触发   [Level2]
      PS:它分成上传和下载两种情况.
        下载的 progress 事件属于 XMLHttpRequest 对象,
        上传的 progress 事件属于 XMLHttpRequest.upload 对象
        需在open方法前添加progress事件处理程序
      会产生事件对象e,e.target 为xhr对象
      e.lengthComputable 表示进度信息是否可用的布尔值
      e.position         表示已接收的字节数
      e.totalSize        表示根据Content-Length响应头部确定的预期字节数
      e.g.:
        我们先定义 progress 事件的回调函数.
        xhr.onprogress = updateProgress;
        xhr.upload.onprogress = updateProgress;
        然后,在回调函数里面,使用这个事件的一些属性.
        function updateProgress (event) {
          if (event.lengthComputable) {
            var percentComplete = event.loaded / event.total;
          }
        }
        上面的代码中,
        event.total 是需要传输的总字节,
        event.loaded 是已经传输的字节.
        若 event.lengthComputable 不为真,则 event.total 等于0.
    xhr.onabort   请求被中止,比如用户调用了abort()方法   [Level2]
    xhr.onerror   请求失败   [Level2]
      若发生网络错误(比如服务器无法连通),onerror事件无法获取报错信息,所以只能显示报错.
    xhr.onload    接收到完整的响应数据时触发(IE不支持) [Level2]
      Firefox中引入的load事件,用于代替readystatechange事件
      该事件的执行函数会接收到一个event对象,其target属性就指向xhr对象实例
    xhr.onloadstart 在接收到响应数据的第一个字节时触发   [Level2]
    xhr.onloadend 通信完成或触发error、abort或load事件后触发   [Level2]
    xhr.upload   监听上传 [Level2]
      e.g.:
        上传文件时,XMLHTTPRequest对象的upload属性有一个progress,会不断返回上传的进度.
          <progress min="0" max="100" value="0">0% complete</progress>
          文件上传时,对upload属性指定progress事件回调函数,即可获得上传的进度.
          function upload(blobOrFile) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/server', true);
            xhr.onload = function(e) { ... };
            // Listen to the upload progress.
            var progressBar = document.querySelector('progress');
            xhr.upload.onprogress = function(e) {
              if(e.lengthComputable) {
                progressBar.value =(e.loaded / e.total) * 100;
                // Fallback for unsupported browsers.
                progressBar.textContent = progressBar.value;
              }
            };
            xhr.send(blobOrFile);
          }
          upload(new Blob(['hello world'], {type: 'text/plain'}));
    xhr.timeout  当请求时间超过设定值后触发
    ◆响应状态
    xhr.readyState 只读,请求的状态码,异步时检测使用
      PS:在通信过程中,每当发生状态变化的时候,readyState属性的值就会发生改变
      0   未初始化  尚未调用open()方法
      1   启动      已调用open() 连接已建立,但未调用send()方法
      2   发送      已调用send(),尚未接收响应
      3   接收      正在接收服务器传来的body部分的数据
      4   完成      已经接收到全部响应数据,或者本次接收已失败
      Remarks:
        xhr.onreadystatechange =function(e){}, 此时 e.target 即为 xhr
    xhr.status      只读,HTTP响应的状态码
      200, OK,访问正常
      301, Moved Permanently,永久移动
      302, Move temporarily,暂时移动
      304, Not Modified,未修改
      307, Temporary Redirect,暂时重定向
      401, Unauthorized,未授权
      403, Forbidden,禁止访问
      404, Not Found,未发现指定网址
      500, Internal Server Error,服务器发生错误
    xhr.statusText  只读,HTTP响应的文本描述,比如”200 OK“
    ◆响应 response
    xhr.responseText 只读,获取字符串形式的响应数据
      PS:若本次请求没有成功或者数据不完整,该属性就会等于null.
        若服务器返回的数据格式是JSON,则该属性为JSON字符串.
    xhr.response     只读,返回接收到的数据体,即body部分
      PS:其类型可以是ArrayBuffer、Blob、Document、JSON对象、或者一个字符串,
        由 responseType 属性的值决定.
        若请求没有成功或者数据不完整,该属性就会等于null
    xhr.responseType 用来指定服务器返回数据(xhr.response)的类型
      ''            默认值,字符串
      'text'        字符串,适合大多数情况
      'json'        JSON对象
        若将这个属性设为“json”,支持JSON的浏览器(Firefox>9,chrome>30),
        就会自动对返回数据调用JSON.parse()方法.
        也就是说,从xhr.response 属性得到的不是文本,而是一个JSON对象.
      'blob'        Blob对象,适合读取二进制数据,比如图片文件等
      'arraybuffer' ArrayBuffer对象
      'document'    Document对象,适合返回XML文档的情况
        XHR2支持Ajax的返回类型为文档,即xhr.responseType=”document” .
        这意味着,对于那些打开CORS的网站,我们可以直接用Ajax抓取网页,
        然后不用解析HTML字符串,直接对XHR回应进行DOM操作.
      e.g.:
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/path/to/image.png', true);
        xhr.responseType = 'blob';
        xhr.onload = function(e) {
          if(this.status == 200) {
            var blob = new Blob([this.response], {type: 'image/png'});
            // 或者
            var blob = oReq.response;
          }
        };
      xhr.send();
    xhr.responseBody 服务器返回的主体(非文本格式)
    xhr.responseXML  只读,获取XML形式的响应数据,若响应数据为XML格式.
      PS:若响应的内容类型为text/xml或application/xml,
        则该属性保存着响应数据的XML DOM文档,
        否则该属性的值为null.
    xhr.responseStream   服务器返回的数据流
    xhr.getResponseHeader(key);  获取指定响应头信息
      e.g.:
      xhr.getResponseHeader('Content-Type');
    xhr.getAllResponseHeader(); 获取整个响应头信息,格式为字符串
      每个头信息之间使用CRLF分隔,若没有收到服务器回应,该属性返回null.
    ◆终止
    xhr.timeout  超时设定,值为一整数,单位默认为毫秒 [可能存在兼容性] [Level2]
      PS:表示多少毫秒后,若请求仍然没有得到结果,就会自动终止.
        若该属性等于0,就表示没有时间限制.
        在规定的时间内浏览器没有收到响应,就会触发xhr的 timeout 事件
        Opera、Firefox 和 IE 10 支持该属性,
        IE 8 和 IE 9 的这个属性属于 XDomainRequest 对象,
        而 Chrome 和 Safari 还不支持
    xhr.abort();   终止连接
      调用该方法后,xhr对象会停止触发事件,
      而且也不再允许访问任何与响应有关的对象属性
      在终止请求后,还应该对xhr对象进行解引用操作.
      若请求已经被发送,则立刻中止请求.
    ◆其他
    FormData 用于模拟表单   [HTML5新增]
      PS:为序列化表单及创建与表单格式相同的数据(用于通过xhr传输)提供了便利.
        不用明确的设置请求头信息,
        xhr对象能够识别传入的数据类型是FormData实例,并配置适当头信息.
      var foda =new FormData([formElem]); 创建FormData对象
        e.g.:
        通过表单元素创建
        var foda =new FormData(document.forms[0]);
      foda.append("key","value"); 向FormData对象中添加信息
        PS:当信息添加完后就可直接使用 xhr.send(foda) 进行发送
        第一个参数是表单的控件名,第二个参数是实际的值,第三个参数是可选的,通常是文件名.
      e.g.:
        模拟File控件,进行文件上传
          function uploadFiles(url, files) {
            var formData = new FormData();
            for(var i = 0; i< files.length; i++) {
              formData.append(files[i].name, files[i]);
            }
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.onload = function(e) { ... };
            xhr.send(formData);  // multipart/form-data
          }
          var inputFile =document.querySelector('input[type="file"]')
          inputFile.addEventListener('change', function(e) {
            uploadFiles('/server', this.files);
          }, false);
        加入JavaScript生成的文件
          var content = '<a id="a"><b id="b">hey!</b></a>';
          var blob = new Blob([content], { type: "text/xml"});
          formData.append("webmasterfile", blob);
    接收二进制数据
      PS:老版本的XMLHttpRequest对象,只能从服务器取回文本数据,新版则可以取回二进制数据.
      改写 MIMEType [老方法]
        改写数据的MIMEType,将服务器返回的二进制数据伪装成文本数据.
        xhr.overrideMimeType ("text/plain; charset=x-user-defined");
        然后,用 responseText 属性接收服务器返回的二进制数据.
        var binStr = xhr.responseText;
        由于这时,浏览器把它当做文本数据,所以还必须再一个个字节地还原成二进制数据.
        for (var i = 0, len = binStr.length; i < len; ++i) {
          var c = binStr.charCodeAt (i);
          var byte = c & 0xff;
        }
        最后一行的位运算"c & 0xff",表示在每个字符的两个字节之中,只保留后一个字节,将前一个字节扔掉.
        原因是浏览器解读字符的时候,会把字符自动解读成Unicode的 0xF700-0xF7ff 区段.
      responseType 属性 [新方法]
        PS:从服务器取回二进制数据,较新的方法是使用新增的 responseType 属性.
          若服务器返回文本数据,这个属性的值是"TEXT",这是默认值.
          较新的浏览器还支持其他值,也就是说,可以接收其他格式的数据.
          把 responseType 设为 blob,表示服务器传回的是二进制对象.
          e.g.:
            var xhr = new XMLHttpRequest ();
            xhr.open ('GET', '/path/to/image.png');
            xhr.responseType = 'blob';
            接收数据的时候,用浏览器自带的 Blob 对象即可.
            var blob = new Blob ([xhr.response], {type: 'image/png'});
            注意,是读取 xhr.response,而不是 xhr.responseText.
            你还可以将 responseType 设为 arraybuffer,把二进制数据装在一个数组里.
            var xhr = new XMLHttpRequest ();
            xhr.open ('GET', '/path/to/image.png');
            xhr.responseType = "arraybuffer";
            接收数据的时候,需要遍历这个数组.
            var arrayBuffer = xhr.response;
            if (arrayBuffer) {
              var byteArray = new Uint8Array (arrayBuffer);
              for (var i = 0; i < byteArray.byteLength; i++) {
                // do something
              }
            }
    e.g.:
      使用FormData接口上传文件
        <form id="file-form" action="handler.php" method="POST">
          <input type="file" id="file-select" name="photos[]" multiple/>
          <button type="submit" id="upload-button">上传</button>
        </form>
        var fileSelect = document.getElementById('file-select');
        var files = fileSelect.files;
        var formData = new FormData();
        for(var i = 0; i < files.length; i++) {
          var file = files[i];
          if(!file.type.match('image.*')) { continue; }
          formData.append('photos[]', file, file.name);
        }
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'handler.php', true);
        xhr.onload = function() {
          if(xhr.status !== 200) { alert('An error occurred!'); }
        };
        xhr.send(formData);
      使用File API上传文件
        var file = document.getElementById('test-input').files[0];
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'myserver/uploads');
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.send(file);
  同步&异步
    同步需等待服务器响应后,才能执行后续代码;
    异步:设置响应函数,等待响应后在处理,从而可继续执行后续代码
    使用同步方式
      var xhr =new XMLHttpRequest();    //创建xhr对象
      xhr.open('get','demo.php',false)  //准备发送请求
      xhr.send();                       //发送请求
    使用异步方式
      var xhr =new XMLHttpRequest();     //创建xhr对象
      xhr.onreadystatechange =function(){}; //设置响应事件程序
      xhr.open('get','demo.php',true)    //准备发送请求
      xhr.send();                        //发送请求
  HTTP 协议
    PS:计算机通过网络进行通信的规则
      是一种无状态协议,不建立持久的连接
      使客户(浏览器)能够向web服务器请求信息和服务
    HTTP 请求 一般由四部分组成:
      请求方法,如GET或POST请求
      请求的URL
      请求头,包含一些客户端环境信息,身份验证信息等
      请求体,即请求正文,其中可以包含客户提交的查询字符串信息,表单信息等等.
    HTTP 响应 一般由三部分组成:
      状态码: 一个数字和文字组成的,用于表示请求的状态(是成功还是失败等)
      响应头: 和请求头类似,包含许多的信息,如服务器类型、日期时间、内容类型和长度等.
      响应体: 响应正文.
    HTTP 头信息
      PS:每个http请求和响应都会带有相应的头部信息
        xhr对象提供了操作头信息(请求头信息和响应头信息)的方法
        有的浏览器允许重写默认头信息,而有的浏览器则不允许.
        头信息中必须使用ASCII码.
      默认情况下,发送xhr请求的同时,还会发送下列头信息
        虽然不同浏览器发送的头部信息会有所不同,以下为共有的信息
        Accept          浏览器能够处理的内容类型
        Accept-Charset  浏览器能够显示的字符集
        Accept-Encoding 浏览器能够处理的压缩编码
        Accept-language 浏览器当前设置的语言
        Connection      浏览器父服务器之间连接的类型
        Cookie          当前页面设置的任何Cookie
        Host            发出请求的页面所在的域
        Referer         发出请求页面的URI
          注意,HTTP规范将这个头部字段拼写错了,
          为了保证与规范一致,只能将错就错
         (该英文的正确拼法为referrer)
        User-Agent      浏览器的用户代理字符串
    网址的组成
      协议 http、https(https为加密的https) 超文本传输协议(收发的信息是文本信息)
      主机/域名/ip地址
        ip地址 32位2进制的数字(4个八位的数字)
        电脑通信靠ip地址,ip地址不好记使用域名
        进入DOS环境 输入 ping 域名来进行查询ip地址.
        e.g. :
        WWW.baidu.com 等网址
        WWW       子域名
        baidu.com 主域名
      端口 端口是一个16位的数字,范围0-65535
        http协议默认为80,因此一般不用填写.
        服务器的服务程序在启动的时候会向系统注册一个端口
      路径 /.../...等
      # hash
        #代表网页中的一个位置.在第一个#后面出现的任何字符,都会被浏览器解读为位置标识符
          e.g.:
          'http://www.example.com/index.html#print' 就代表网页index.html 的print位置.
          浏览器读取这个URL后,会自动将print位置滚动至可视区域.
          为网页位置指定标识符,有两个方法:
          一是使用锚点,比如<a name="print"></a>
          二是使用id属性,比如<div id="print">
        #是用来指导浏览器动作的,对服务器端完全无用.所以,HTTP请求中不包括#.
          比如,访问下面的网址,'http://www.example.com/index.html#print',
          浏览器实际发出的请求是这样的：
          GET /index.html HTTP/1.1
          Host: www.example.com
        单单改变#后的部分,浏览器只会滚动到相应位置,不会重新加载网页.若无该锚点则也无滚动
        改变#会改变浏览器的访问历史
          每一次改变#后的部分,都会在浏览器的访问历史中增加一个记录,
          使用"后退"按钮,就可以回到上一个位置.
          这对于ajax应用程序特别有用,可以用不同的#值,表示不同的访问状态,
          然后向用户给出可以访问某个状态的链接.
          值得注意的是,上述规则对IE6和IE7不成立,它们不会因为#的改变而增加历史记录.
      ? 查询字符串
        传递参数时用于连接
          & 不同参数的间隔符
          = 参数中名和值的连接
          e.g.:
          'http://www.xxx.com/Show.asp?id=77&nameid=2905210001&page=1'
        清除缓存
          e.g.:
          'http://www.xxxxx.com/index.html '
          'http://www.xxxxx.com/index.html?test123123'
          两个url打开的页面一样,但是后面这个有问号,说明不调用缓存的内容,
          而认为是一个新地址,重新读取.
    URL地址字符转换
      url的可用字符： 0-9,a-z,A-Z ,其他用十六进制表示,并在每个字节前加%
      url编码:encodeURIComponent('字符')
      url解码:decodeURIComponent('字符')
    HTTP状态码
      PS:由三位数值组成,第一位表示其类别
      1XX 表示请求已接收
      2XX 成功
      3XX 重定向,表示没有成功,客户必须采取进一步的动作
      4XX 客户端错误
      5XX 服务器端错误
      ◆常用状态码
      200 OK      正常返回信息
      304 Not Modified 自从上次请求后,请求的网页未修改过
      400 Bad Request  请求错误,不符合要求
        服务器无法理解请求的格式,客户端不应再次使用相同的内容发起请求
      403 Forbidden    禁止访问
      404 Not Found    找不到匹配的资源
      500 Internal Server Error  最常见的服务器端错误
      503 Service Unavailable    服务器端暂时无法处理请求(可能是过载或维护)
      其他状态码及说明
        100 Continue     继续,
          一般在发送post请求时,已发送了http header之后服务端将返回此信息,
          表示确认,之后发送具体参数信息
        201 Created   请求成功并且服务器创建了新的资源
        202 Accepted  服务器已接受请求,但尚未处理
        301 Moved Permanently  请求的网页已永久移动到新位置.
        302 Found        临时性重定向.
        303 See Other    临时性重定向,且总是使用 GET 请求新的 URI.
        401 Unauthorized      请求未授权.
    HTTP请求方法 :发送请求的类型
      PS:http 1.0 定义了8种方法
        主要使用“GET”和“POST”
      GET  请求
        最常见的请求类型,常用于向服务器查询信息.
        一般用于信息获取.
        使用URL传递参数.(发送的信息可见)
        对发送信息的数量有限制,一般在2000个字符内.
        必要时可将查询字符串参数追加到URL的末尾以便将信息发送给服务器.
        对于xhr而言,位于open方法的URL末尾的查询字符串必须经过正确的编码才行,
        查询字符串中每个参数的名称和值都需使用encodeURIComponent()进行编码,
        名值对必须由&分割.
      POST 请求
        通常用于向服务器发送应该被保存的数据.
        一般用于修改服务器上的资源.
        对发送信息的数量无限制.
        Remarks:
          表单提交时 Content-Type 为 application/x-www-form-urlencoded
      PUT  请求更新服务器端数据
      HEAD 检查一个对象是否存在
      DELETE  请求删除数据
      CONNECT 对通道提供支持
      TRACE   跟踪到服务器的路径
      OPTIONS 查询Web服务器的性能
      GET 和 POST 的区别
        大体上讲,向服务器发送客户端数据有两种方式：查询字符串和请求正文.
        通常,若是使用查询字符串,就发起了一个GET请求；
        若是使用请求正文,就发起了一个POST请求
       (若你反过来做,HTTP协议并不会阻止你,但这是没有必要的：最好在这里坚持标准实践).
        有一种普遍的误解是POST请求是安全的,而GET请求不安全.
        事实上若使用HTTPS协议,两者都是安全的；若不使用,则都不安全.
        若不使用HTTPS协议,入侵者会像查看GET请求的查询字符串一样,轻松查看POST请求的报文数据.
        使用GET请求,用户会在查询字符串中看到所有的输入数据(包括隐藏域),这是丑陋而且凌乱的.
        浏览器会限制查询字符串的长度(对请求正文没有长度限制).
        基于这些原因,一般推荐使用POST进行表单提交.
    HTTP 和 TCP 的区别
      TPC/IP 协议是传输层协议
        主要解决数据如何在网络中传输,是一种“经过三次握手”的可靠的传输方式
      HTTP 协议即超文本传送协议(Hypertext Transfer Protocol ),应用层协议,
        是 Web 联网的基础,也是手机联网常用的协议之一
        HTTP 协议是建立在 TCP 协议之上的一种应用.
    HTTP 传输过程
      建立TCP连接
        输入地址,然后回车
        Chrome搜索自身的DNS缓存 ,当没有找到或缓存失效时
        Chrome搜索操作系统自身的DNS缓存,若仍没找到,
        Chrome读取本地的HOST文件,若仍没找到,
        Chrome 发起一个DNS的一个系统调用 ,一般向宽带运营商查询DNS,
        宽带运营商服务器查找自身缓存,若未成功,
        运营商服务器发起一个迭代DNS解析的请求 ,逐层向上查询,
        运营商服务器把结果返回操作系统内核,同时缓存起来,
        操作系统内核把结果返回浏览器
        最终,浏览器得到 www.baidu.com 对应的ip地址,
        获取ip地址后,浏览器发起HTTP "三次握手",建立 TCP/IP 连接,
      浏览器就可以向服务器发送HTTP请求了,如get方法发送请求
        Web浏览器向Web服务器发送请求命令
        Web浏览器发送请求头信息
      服务器端接收到请求,根据路径参数,经过后端的处理之后,把结果数据发送给浏览器,如请求页面
        Web服务器发送应答信息
        Web服务器向浏览器发送数据
        Web服务器关闭TCP连接
      浏览器拿到完整的HTML页面代码,解析和渲染该页面,
      同时其中的JS、CSS、图片等静态资源,同样也是一个个HTTP请求都需要经过上面的步骤来获取.
      最终浏览器渲染成功呈现页面.
  e.g.:
    使用范例
      var xhr = new XMLHttpRequest(); // 创建 Ajax 对象
      xhr.open(method, url, async); // 设置请求方法 请求地址 是否异步
      xhr.onreadystatechange = function() { // 注册响应函数
        console.log('state change', xhr);
      }
      xhr.send(); // 发送请求

      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/login', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
          console.log('state change', xhr, xhr.status, xhr.response);
          var response = JSON.parse(xhr.response);
          console.log('response', response);
        } 
        else {
          console.log('change');
        }
      }
      var account = { username: 'gua', password: '123', };
      var data = JSON.stringify(account);
      xhr.send(data); // 发送请求

      // 可以封装成这样的一个函数
      var ajaxSelf = function(method,path,bool,headers,data,reseponseCallback) {
        var xhr =new XMLHttpRequest();
        xhr.open(method,path,bool);
        if(method == "POST") {
          xhr.onreadystatechange =function(){
            if(xhr.readyState == 4) {
              reseponseCallback(xhr.response);
            }else {
              console.log(xhr.readyState);
            }
          };
          xhr.setRequestHeader("Content-Type",headers);
          var da =JSON.stringify(data);
          xhr.send(da);
        }
        else {
          xhr.onreadystatechange =function(){
            if(xhr.readyState == 4) {
              reseponseCallback(xhr.response);
            }else {
              console.log(xhr.readyState);
            }
          };
          xhr.send(null);
        }
      }
      var url = 'https://vip.cocode.cc/uploads/pins.json';
      var callback =function(a){ console.log(a); };
      ajaxSelf("GET",url,true,"application/json",null,callback);
    从后台获取数据
      在 vip.cocode.cc 域名下运行
      // 定义函数ajaxGet 获取url的信息,并执行回调函数 callback
      var ajaxGet = function(url, callback) {
          var xhr = new XMLHttpRequest()
          xhr.open('GET', url, true)
          xhr.onreadystatechange = function(event) {
              if(xhr.readyState === 4) {
                  callback(xhr.response)
              }
          }
          xhr.send()
      }
      // 具体的需要获取的数据的url
      var url = 'http://vip.cocode.cc/uploads/pins.json'

      // 具体的执行callback函数fu
      // 在控制台输出经过JSON解析的信息
      function fu(data) {
          var info = JSON.parse(data)
          console.log("1",info)
      }
      // 执行函数 输出信息
      ajaxGet(url, fu)

      // 具体的执行callback函数 addImg
      // 在页面中添加图片
      function addImg(data){
        var obj =JSON.parse(data)
        var htmlcode =''
        for(var i = 0; i < obj.pins.length; i++) {
          var key = obj.pins[i].file.key  //由提供数据的格式决定
          var url = 'http://img.hb.aicdn.com/' + key  // 访问 url 就会得到一张照片
          htmlcode =htmlcode + `<img src=${url}>`
        }
        var body = document.querySelector('body')
        body.insertAdjacentHTML('beforeend', htmlcode)
      }
      // 执行函数 添加图片到页面中
      ajaxGet(url, addImg)
    使用 ajax 和后端交互数据
      在 vip.cocode.cc:3000/ 写代码
      试一下
        // 按照要求来定义 创建AJAX函数
        // 使用get来获得响应
        var ajaxGet =function(arg){
         var xhr =new XMLHttpRequest();
         xhr.open('GET',arg.url,true);
         xhr.onreadystatechange =function(){
           if(xhr.readyState === 4) {
             arg.callback(xhr.response);
           }
         }
         xhr.send();
        }
        // 使用POST来发送信息并获取响应
        var ajax =function(arg){
         var xhr =new XMLHttpRequest();
         xhr.open(arg.method,arg.url,true);
         xhr.setRequestHeader('Content-Type',arg.ContentType)
         xhr.onreadystatechange =arg.callback
         xhr.send(arg.data)
        }

        // 1, 获得所有的 数据info数组(返回的是一个数组)
          // GET
          // http://vip.cocode.cc:3000/todo/<你的qq号>/all
        var allTodos =function(){
          var request ={
            url:'http://vip.cocode.cc:3000/todo/123456789/all',
            callback:function(arg){
              console.log(arg);
            }
          }
          ajaxGet(request)
        }()
        // 返回响应信息:info数组

        // 2, 发送 JSON格式对象 添加元素到info中
          // 要求设置 Content-Type 为 application/json
          //   POST
          //   {"task": "study"}
          //   http://vip.cocode.cc:3000/todo/<你的qq号>/add
        var addTodo =function(){
          var request ={
            url:'http://vip.cocode.cc:3000/todo/123456789/add',
            method:'POST',
            ContentType:'application/json',
            data:JSON.stringify({"task": "study"}),
            callback:function(arg){
              console.log('add',arg);
            }
          }
          ajax(request);
        }()
        // {"task": "study"} 添加到数组中 ,返回响应信息:添加到info的元素

        // 3, 通过数组元素自身的id属性 发送 JSON格式对象 更改一个元素
          // 要求设置 Content-Type 为 application/json
          //   POST
          //   {"task": "study"}
          //   http://vip.cocode.cc:3000/todo/<你的qq号>/update/<todo_id>
        var updateTodo =function(){
          var request ={
            url:'http://vip.cocode.cc:3000/todo/123456789/update/500',
            method:'POST',
            ContentType:'application/json',
            data:'{"task":"abc"}',
            callback:function(a){
              console.log(a);
            }
          }
          ajax(request)
        }()
        // 将info的元素的id为500的元素 更改为 {"task":"abc"} 创建的info元素 返回响应信息:更改后的info元素

        // 4,  通过数组元素自身的id属性  删除一个元素
          //   GET
          //   http://vip.cocode.cc:3000/todo/<你的qq号>/delete/<todo_id>
        var deleteTodo =function(id){
          var request ={
            url:'http://vip.cocode.cc:3000/todo/123456789/delete/'+id,
            method:'GET',
            callback:function(a){
              console.log(a);
            }
          }
          ajaxGet(request)
        }()
          // 通过指定info元素的id来删除元素,返回响应信息:被删除的元素
      使用面向对象 封装
        var TodoApi = function(qqNumber="123456"){
          this.baseUrl ='http://vip.cocode.cc:3000/todo';
          this.qq =qqNumber;
        }

        TodoApi.prototype.get =function(path){
          var url =`${this.baseUrl}/${this.qq}`+path;
          var xhr =new XMLHttpRequest();
          xhr.open('GET',url,true);
          xhr.onreadystatechange =function(){
            if(xhr.readyState ==4) {
              console.log("1",xhr.response);
            }
          }
          xhr.send();
        }
        TodoApi.prototype.post =function(path,message){
          var url =`${this.baseUrl}/${this.qq}`+path;
          var xhr =new XMLHttpRequest();
          xhr.open('POST',url,true);
          xhr.setRequestHeader('Content-Type',"application/json")
          xhr.onreadystatechange =function(){
            if(xhr.readyState ==4) {
              console.log("1",xhr.response);
            }
          }
          var mess =JSON.stringify(message)
          xhr.send(mess);
        }

        TodoApi.prototype.all =function(){
          var path ='/all';
          this.get(path)
        }
        TodoApi.prototype.add =function(obj){
          var path ='/add';
          this.post(path,obj)
        }
        TodoApi.prototype.update =function(id,obj){
          var path ='/update/'+id;
          this.post(path,obj)
        }
        TodoApi.prototype.delete =function(id){
          var path ='/delete/'+id;
          this.get(path)
        }

        // 调用
        // 对象实例化
        var t =new TodoApi();
        // 返回info数组
        t.all()
        // 添加 元素到info中
        t.add({task:"abc"})
        // 通过id 修改info元素
        t.update('708',{task:'111'})
        // 通过id来删除info元素
        t.delete("709")
XMLHttpRequest Level2 「IE10+ HTML5」 
  IE10以下的版本不支持.它有自己相关的方法来实现.
  需要在服务器端进行相关的改动
    header("Access-Control-Allow-Origin:*"); /*星号表示所有的域都可以接受,*/
    header("Access-Control-Allow-Methods:GET,POST");
Fetch 用来取代XMLHttpRequest的一种新规范 
  PS: Ajax的XMLHttpRequest对象,输入、输出状态都在同一接口管理,容易导致代码混乱;
    Fetch主要有两个特点,一是接口合理化,Ajax是将所有不同性质的接口都放在XHR对象上,
    而Fetch是将它们分散在几个不同的对象上,设计更合理；
    二是Fetch操作返回Promise对象,避免了嵌套的回调函数.
  检查浏览器是否部署 Fetch API
    if (fetch in window){ /* 支持 */ } 
    else { /* 不支持 */ }
  e.g.:
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
    e.g.:
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
      console.log('出错：', err);
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
    basic：正常的同域请求
    cors：CORS机制下的跨域请求
    opaque：非CORS机制下的跨域请求,这时无法读取返回的数据,也无法判断是否请求成功
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
    Fetch API引入三个新的对象(也是构造函数)：Headers, Request和Response。
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
  Request对象
    Request对象用来构造HTTP请求。
    
    var req = new Request("/index.html");
    req.method // "GET"
    req.url // "http://example.com/index.html"
    Request对象的第二个参数,表示配置对象。
    
    var uploadReq = new Request("/uploadImage", {
      method: "POST",
      headers: {
        "Content-Type": "image/png",
      },
      body: "image data"
    });
    上面代码指定Request对象使用POST方法发出,并指定HTTP头信息和信息体。
    
    下面是另一个例子。
    
    var req = new Request(URL, {method: 'GET', cache: 'reload'});
    fetch(req).then(function(response) {
      return response.json();
    }).then(function(json) {
      someOperator(json);
    });
    上面代码中,指定请求方法为GET,并且要求浏览器不得缓存response。
    
    Request对象实例有两个属性是只读的,不能手动设置。一个是referrer属性,表示请求的来源,由浏览器设置,有可能是空字符串。另一个是context属性,表示请求发出的上下文,若是image,表示是从img标签发出,若是worker,表示是从worker脚本发出,若是fetch,表示是从fetch函数发出的。
    
    Request对象实例的mode属性,用来设置是否跨域,合法的值有以下三种：same-origin、no-cors(默认值)、cors。当设置为same-origin时,只能向同域的URL发出请求,否则会报错。
    
    var arbitraryUrl = document.getElementById("url-input").value;
    fetch(arbitraryUrl, { mode: "same-origin" }).then(function(res) {
      console.log("Response succeeded?", res.ok);
    }, function(e) {
      console.log("Please enter a same-origin URL!");
    });
    上面代码中,若用户输入的URL不是同域的,将会报错,否则就会发出请求。
    
    若mode属性为no-cors,就与默认的浏览器行为没有不同,类似script标签加载外部脚本文件、img标签加载外部图片。若mode属性为cors,就可以向部署了CORS机制的服务器,发出跨域请求。
    
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
    }).then(function(photos) {
      photos.forEach(function(photo) {
        console.log(photo.title);
      });
    });
    上面代码是向Flickr API发出图片请求的例子。
    
    Request对象的一个很有用的功能,是在其他Request实例的基础上,生成新的Request实例。
    
    var postReq = new Request(req, {method: 'POST'});    
  Response
    fetch方法返回Response对象实例,它有以下属性。
    
    status：整数值,表示状态码(比如200)
    statusText：字符串,表示状态信息,默认是“OK”
    ok：布尔值,表示状态码是否在200-299 的范围内
    headers：Headers对象,表示HTTP回应的头信息
    url：字符串,表示HTTP请求的网址
    type：字符串,合法的值有五个basic、cors、default、error、opaque。basic表示正常的同域请求；cors表示CORS机制的跨域请求；error表示网络出错,无法取得信息,status属性为0,headers属性为空,并且导致fetch函数返回Promise对象被拒绝；opaque表示非CORS机制的跨域请求,受到严格限制。
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
JSONP,JSON with Padding 填充式JSON或参数式JSON 
  PS:可用于决解主流浏览器的跨域数据访问(即只能支持GET请求,而不支持POST请求)
    应用JSON的一种新方法.
    一种使用<script>标记获取JSON对象的方法.
    决解AJAX不能跨域访问的问题.
  使用方法及原理:
    script标签可载入外域的JS文件,自己先定义一函数,然后从script中载入执行函数,
    从而达到载入JS文件后就执行操作,达到获取数据,
    从而也省去了监听script加载完成的操作.
    e.g.:
      在 a 网页中
      <script >
        function foo(data){ /*定义需执行的操作*/ }
      </script>
      访问 'https://www.baidu.com/xx,js' 网址可获取的内容
      foo({/*设置的内容*/});
      当 <script src="https://www.baidu.com/xx,js" charset="utf-8"></script> 载入后,
      就可获取所需要的数据,执行所需要的操作了.
    Remarks:
      可在url的后面添加参数用于定义双方函数名, (?)
      如 'https://www.baidu.com?foo='
  缺点
    可能存在安全隐患,须确保JSON数据中无恶意的代码
    若JSONP请求失败则不容易判断,虽然HTML5给<script>元素新增了一error事件,但支持情况不好
  Remarks:
    <script>标记放在body标记结尾处,等待网页加载完后在载入
  决解向AJAX一样动态更新的问题
    通过替换script标签来动态更新
    不能通过只更换script的src标签来达到效果,浏览器不会将其看作一个新元素;
    更换script标签后,强制浏览器做出请求,这种技术称为"脚本插入"
  e.g.:
    JSONP方法跨域获取百度搜索建议词
    <script type="text/javascript">
      window.onload = function() {
        // 查询内容
        var content = "123";
        //组装查询地址
        var baiduUrl =
           "http://suggestion.baidu.com/su?wd=#content#&cb=window.baidu.sug";
        baiduUrl = baiduUrl.replace("#content#", content);

        //定义回调函数
        window.baidu = {
          sug: function(json) {
            console.log(json)
          }
        }

        //动态添加JS脚本
        var script = document.createElement("script");
        script.src = baiduUrl;
        script.id = 'oldUrl';
        document.getElementsByTagName("head")[0].appendChild(script);
      }
    </script>
comet  服务器推送,一种更高级的AJAX技术 
  PS: 一种服务器向页面推送数据的技术,能够让信息近乎实时的被推送到页面上;
    非常适合处理体育比赛的分数和股票报价
  长轮询和流
    PS:实现Comet的一种方式,是传统轮询(也叫短轮询)的一个翻版,
    传统轮询:浏览器定时向服务器发送请求,看有没有更新的数据,
    长轮询:页面发起一个到服务器的请求,然后服务器一直保持连接打开,直到有数据可发送,
      发送完数据之后,浏览器关闭连接,随即又发起一个到服务器的新请求,...一直循环
    优势:所有浏览器都支持,使用XHR对象和setTimeout()就能实现
  HTTP流
    PS:页面的整个生命周期内只使用一个HTTP链接,
      即浏览器向服务器发送一个请求,而服务器保持链接打开,然后周期性的向浏览器发送数据
CORS,Cross-Origin Resource Sharing    跨源资源共享 
  PS:
    CORS是一个W3C标准,全称是“跨域资源共享”,
    允许浏览器向跨源服务器,发出XMLHttpRequest请求,从而克服了AJAX只能同源使用的限制;
    定义了访问跨源资源时,浏览器与服务器的沟通;
    新版本的 XMLHttpRequest 对象,可以向不同域名的服务器发出 HTTP 请求.
    使用"跨域资源共享"的前提,是浏览器必须支持这个功能,而且服务器端必须同意这种"跨域".
    需要改动服务器端代码.
    若能够满足上面的条件,则代码的写法与不跨域的请求完全一样.
    xhr.open ('GET', 'http://other.server/and/path/to/script');
    目前,除了 IE 8 和 IE 9,主流浏览器都支持 CORS,IE 10 也将支持这个功能.
    整个CORS通信过程,都是浏览器自动完成,不需要用户参与。
    对于开发者来说,CORS通信与同源的AJAX通信没有差别,代码完全一样。
    浏览器一旦发现AJAX请求跨源,就会自动添加一些附加的头信息,有时还会多出一次附加的请求;
    因此,实现CORS通信的关键是服务器,只要服务器实现了CORS接口,就可以跨源通信。
    浏览器将CORS请求分成:简单请求,simple request和非简单请求,not-so-simple request, 
    浏览器对这两种请求的处理不同;
  简单请求
    需同时满足以下两大条件
      (1)请求方法是以下三种方法之一。
      HEAD
      GET
      POST
      (2)HTTP的头信息不超出以下几种字段。
      Accept
      Accept-Language
      Content-Language
      Last-Event-ID
      Content-Type：只限于三个值
        application/x-www-form-urlencoded、multipart/form-data、text/plain
      凡是不同时满足上面两个条件,就属于非简单请求。
    基本流程
      对于简单请求,浏览器直接发出CORS请求。
      具体来说,就是在头信息之中,增加一个Origin字段。
    
      下面是一个例子,浏览器发现这次跨源AJAX请求是简单请求,就自动在头信息之中,添加一个Origin字段。
    
      GET /cors HTTP/1.1
      Origin: http://api.bob.com
      Host: api.alice.com
      Accept-Language: en-US
      Connection: keep-alive
      User-Agent: Mozilla/5.0...
      上面的头信息中,Origin字段用来说明,本次请求来自哪个源(协议 + 域名 + 端口)。服务器根据这个值,决定是否同意这次请求。
      
      若Origin指定的源,不在许可范围内,服务器会返回一个正常的HTTP回应。浏览器发现,这个回应的头信息没有包含Access-Control-Allow-Origin字段(详见下文),就知道出错了,从而抛出一个错误,被XMLHttpRequest的onerror回调函数捕获。注意,这种错误无法通过状态码识别,因为HTTP回应的状态码有可能是200。
      
      若Origin指定的域名在许可范围内,服务器返回的响应,会多出几个头信息字段。
      
      Access-Control-Allow-Origin: http://api.bob.com
      Access-Control-Allow-Credentials: true
      Access-Control-Expose-Headers: FooBar
      Content-Type: text/html; charset=utf-8
      上面的头信息之中,有三个与CORS请求相关的字段,都以Access-Control-开头。
      
      (1)Access-Control-Allow-Origin
      
      该字段是必须的。它的值要么是请求时Origin字段的值,要么是一个*,表示接受任意域名的请求。
    
      (2)Access-Control-Allow-Credentials
      
      该字段可选。它的值是一个布尔值,表示是否允许发送Cookie。默认情况下,Cookie不包括在CORS请求之中。设为true,即表示服务器明确许可,Cookie可以包含在请求中,一起发给服务器。这个值也只能设为true,若服务器不要浏览器发送Cookie,删除该字段即可。
      
      (3)Access-Control-Expose-Headers
      
      该字段可选。CORS请求时,XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。若想拿到其他字段,就必须在Access-Control-Expose-Headers里面指定。上面的例子指定,getResponseHeader('FooBar')可以返回FooBar字段的值。
      
      withCredentials 属性
      上面说到,CORS请求默认不包含Cookie信息(以及HTTP认证信息等)。若需要包含Cookie信息,一方面要服务器同意,指定Access-Control-Allow-Credentials字段。
      
      Access-Control-Allow-Credentials: true
      另一方面,开发者必须在AJAX请求中打开withCredentials属性。
      
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      否则,即使服务器同意发送Cookie,浏览器也不会发送。或者,服务器要求设置Cookie,浏览器也不会处理。
      
      但是,若省略withCredentials设置,有的浏览器还是会一起发送Cookie。这时,可以显式关闭withCredentials。
      
      xhr.withCredentials = false;
      需要注意的是,若要发送Cookie,Access-Control-Allow-Origin就不能设为星号,必须指定明确的、与请求网页一致的域名。同时,Cookie依然遵循同源政策,只有用服务器域名设置的Cookie才会上传,其他域名的Cookie并不会上传,且(跨源)原网页代码中的document.cookie也无法读取服务器域名下的Cookie。
  非简单请求
    预检请求
    非简单请求是那种对服务器有特殊要求的请求,比如请求方法是PUT或DELETE,或者Content-Type字段的类型是application/json。
    
    非简单请求的CORS请求,会在正式通信之前,增加一次HTTP查询请求,称为“预检”请求(preflight)。
    
    浏览器先询问服务器,当前网页所在的域名是否在服务器的许可名单之中,以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复,浏览器才会发出正式的XMLHttpRequest请求,否则就报错。
    
    下面是一段浏览器的JavaScript脚本。
    
    var url = 'http://api.alice.com/cors';
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('X-Custom-Header', 'value');
    xhr.send();
    上面代码中,HTTP请求的方法是PUT,并且发送一个自定义头信息X-Custom-Header。
    
    浏览器发现,这是一个非简单请求,就自动发出一个“预检”请求,要求服务器确认可以这样请求。下面是这个“预检”请求的HTTP头信息。
    
    OPTIONS /cors HTTP/1.1
    Origin: http://api.bob.com
    Access-Control-Request-Method: PUT
    Access-Control-Request-Headers: X-Custom-Header
    Host: api.alice.com
    Accept-Language: en-US
    Connection: keep-alive
    User-Agent: Mozilla/5.0...
    “预检”请求用的请求方法是OPTIONS,表示这个请求是用来询问的。头信息里面,关键字段是Origin,表示请求来自哪个源。
    
    除了Origin字段,“预检”请求的头信息包括两个特殊字段。
    
    (1)Access-Control-Request-Method
    
    该字段是必须的,用来列出浏览器的CORS请求会用到哪些HTTP方法,上例是PUT。
    
    (2)Access-Control-Request-Headers
    
    该字段是一个逗号分隔的字符串,指定浏览器CORS请求会额外发送的头信息字段,上例是X-Custom-Header。
    
    预检请求的回应
    服务器收到“预检”请求以后,检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后,确认允许跨源请求,就可以做出回应。
    
    HTTP/1.1 200 OK
    Date: Mon, 01 Dec 2008 01:15:39 GMT
    Server: Apache/2.0.61 (Unix)
    Access-Control-Allow-Origin: http://api.bob.com
    Access-Control-Allow-Methods: GET, POST, PUT
    Access-Control-Allow-Headers: X-Custom-Header
    Content-Type: text/html; charset=utf-8
    Content-Encoding: gzip
    Content-Length: 0
    Keep-Alive: timeout=2, max=100
    Connection: Keep-Alive
    Content-Type: text/plain
    上面的HTTP回应中,关键的是Access-Control-Allow-Origin字段,表示http://api.bob.com可以请求数据。该字段也可以设为星号,表示同意任意跨源请求。
    
    Access-Control-Allow-Origin: *
    若服务器否定了“预检”请求,会返回一个正常的HTTP回应,但是没有任何CORS相关的头信息字段。这时,浏览器就会认定,服务器不同意预检请求,因此触发一个错误,被XMLHttpRequest对象的onerror回调函数捕获。控制台会打印出如下的报错信息。
    
    XMLHttpRequest cannot load http://api.alice.com.
    Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.
    服务器回应的其他CORS相关字段如下。
    
    Access-Control-Allow-Methods: GET, POST, PUT
    Access-Control-Allow-Headers: X-Custom-Header
    Access-Control-Allow-Credentials: true
    Access-Control-Max-Age: 1728000
    (1)Access-Control-Allow-Methods
    
    该字段必需,它的值是逗号分隔的一个字符串,表明服务器支持的所有跨域请求的方法。注意,返回的是所有支持的方法,而不单是浏览器请求的那个方法。这是为了避免多次“预检”请求。
    
    (2)Access-Control-Allow-Headers
    
    若浏览器请求包括Access-Control-Request-Headers字段,则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串,表明服务器支持的所有头信息字段,不限于浏览器在“预检”中请求的字段。
    
    (3)Access-Control-Allow-Credentials
    
    该字段与简单请求时的含义相同。
    
    (4)Access-Control-Max-Age
    
    该字段可选,用来指定本次预检请求的有效期,单位为秒。上面结果中,有效期是20天(1728000秒),即允许缓存该条回应1728000秒(即20天),在此期间,不用发出另一条预检请求。
    
    浏览器的正常请求和回应
    一旦服务器通过了“预检”请求,以后每次浏览器正常的CORS请求,就都跟简单请求一样,会有一个Origin头信息字段。服务器的回应,也都会有一个Access-Control-Allow-Origin头信息字段。
    
    下面是“预检”请求之后,浏览器的正常CORS请求。
    
    PUT /cors HTTP/1.1
    Origin: http://api.bob.com
    Host: api.alice.com
    X-Custom-Header: value
    Accept-Language: en-US
    Connection: keep-alive
    User-Agent: Mozilla/5.0...
    上面头信息的Origin字段是浏览器自动添加的。
    
    下面是服务器正常的回应。
    
    Access-Control-Allow-Origin: http://api.bob.com
    Content-Type: text/html; charset=utf-8
    上面头信息中,Access-Control-Allow-Origin字段是每次回应都必定包含的。
    
    与JSONP的比较
    CORS与JSONP的使用目的相同,但是比JSONP更强大。
    
    JSONP只支持GET请求,CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器,以及可以向不支持CORS的网站请求数据。      
  具体操作 (?)
    在发送请求时,需附加一个额外的Origin头部,包含请求页面的源信息(协议 域名 端口),
    便于服务器根据该头信息来决定是否给予响应
    e.g. : Origin:'https://www.baidu.com'
    若服务器认可该请求,就在Access-Control-Allow-Origin 头部中回发相同的源信息
    若是公共资源,可以回发"*"
    若没有该头部,或者该头部与源信息不匹配,浏览器会驳回请求
    注:IE11 中没有该头部信息也允许显示信息,Chrome则不可以.
    e.g. : Access-Control-Allow-Origin:'https://www.baidu.com'
    Remarks:请求和响应都不包含cookie信息
  IE对CORS的实现
    IE8中引入了 XDR(XDomainRequest)类型,与XHR类似,但可以实现跨域通信
  其他浏览器对CORS的实现
    通过XMLHttpRequest对象实现对CORS的原生支持
    请求另一个域中的资源,使用标准的XHR对象并在 open()方法中传入绝对URL即可
    跨域XHR对象为了安全有如下限制:
    不能使用 setRequestHeader()设置自定义头部
    不能发送和接收cookie
    调用 getAllResponseHeaders()方法总会返回空字符串
    由于无论同源请求还是跨域请求都使用相同的接口,
    因此对于本地资源,最好使用相对URL, 在访问远程资源时再使用绝对URL,
    如此能消除歧义,避免出现限制访问头部或本地cookie信息等问题
same-origin_policy,同源政策 
  PS: 浏览器安全的基石,1995 年,由Netscape公司引入,目前所有浏览器都实行该政策;
    “同源”指的是: 协议、域名、端口 均相同;
    目的为了保证用户信息的安全,防止恶意的网站窃取数据;
    提交表单不受同源政策的限制;
    同源政策规定,AJAX请求只能发给同源的网址,否则就报错。
  限制范围
    随着互联网的发展,“同源政策”越来越严格。目前,若非同源,有三种行为受到限制:
    1、Cookie、LocalStorage 和 IndexedDB 无法读取。
    2、DOM 无法获得。
    3、AJAX 请求不能发送。
    虽然这些限制是必要的,但是有时很不方便,合理的用途也受到影响。
  服务器代理跨域 : 从服务器后端访问其他域进行中间代理
  Cookie 服务器写入浏览器的一小段信息
    document.domain 共享Cookie
      两个网页一级域名相同,只是二级域名不同,浏览器允许通过该设置共享cookies
      e.g.：
        A网页 'http://w1.example.com/a.html'
        B网页 'http://w2.example.com/b.html',
        那么只要设置相同的document.domain,两个网页就可以共享Cookie。
        document.domain = 'example.com';
        
        A网页通过脚本设置一cookie document.cookie = "test1=hello";
        B网页中读取该cookie       var allCookie = document.cookie;
        这种方法只适用于Cookie和iframe窗口,
        LocalStorage 和 IndexedDB 无法通过这种方法,规避同源政策,
    服务器设置Cookie时,指定其所属域名为一级域名,如.example.com
      Set-Cookie: key=value; domain=.example.com; path=/
      这样的话,二级域名和三级域名不用做任何设置,都可以读取这个Cookie;
  iframe 可在当前网页之中,嵌入其他网页
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
    若两个窗口一级域名相同,只是二级域名不同,那么设置上一节介绍的 document.domain 属性,就可以规避同源政策,拿到DOM。
    
    对于完全不同源的网站,目前有两种方法,可以解决跨域窗口的通信问题。
  fragment_identifier 片段识别符
    片段标识符指的是,URL的#号后面的部分,
    比如 'http://example.com/x.html#fragment'的#fragment。
    若只是改变片段标识符,页面不会重新刷新。
    父窗口可以把信息,写入子窗口的片段标识符。
    var src = originURL + '#' + data;
    document.getElementById('myIFrame').src = src;
    子窗口通过监听hashchange事件得到通知。
    window.onhashchange = checkMessage;
    function checkMessage() {
      var message = window.location.hash;
      // ...
    }r
    同样的,子窗口也可以改变父窗口的片段标识符。
    parent.location.href= target + “#” + hash;
    window.postMessage
  Cross-document_messaging 跨文档通信API
    为window对象新增了一个 window.postMessage 方法,
    允许跨窗口通信,不论这两个窗口是否同源。
  
    postMessage 父窗口 aaa.com 向子窗口 bbb.com 发消息
      var popup = window.open('http://bbb.com', 'title');
      popup.postMessage('Hello World!', 'http://bbb.com');
      postMessage方法的第一个参数是具体的信息内容,
      第二个参数是接收消息的窗口的源(origin),即“协议 + 域名 + 端口”。
      也可以设为*,表示不限制域名,向所有窗口发送。
      子窗口向父窗口发送消息的写法类似。
      window.opener.postMessage('Nice to see you', 'http://aaa.com');
    message事件 父窗口和子窗口监听对方的消息
      window.addEventListener('message', function(e) {
        console.log(e.data);
      },false);
      message事件的事件对象event,提供以下三个属性。
      event.source：发送消息的窗口
      event.origin: 消息发向的网址
      event.data: 消息内容
      下面的例子是,子窗口通过event.source属性引用父窗口,然后发送消息。
      window.addEventListener('message', receiveMessage);
      function receiveMessage(event) {
        event.source.postMessage('Nice to see you!', '*');
      }
      首先,receiveMessage函数里面没有过滤信息的来源,任意网址发来的信息都会被处理。
      其次,postMessage方法中指定的目标窗口的网址是一个星号,表示该信息可以向任意网址发送。
      通常来说,这两种做法是不推荐的,因为不够安全,可能会被恶意利用。
      event.origin 属性可以过滤不是发给本窗口的消息。
      window.addEventListener('message', receiveMessage);
      function receiveMessage(event) {
        if (event.origin !== 'http://aaa.com') return;
        if (event.data === 'Hello World') {
          event.source.postMessage('Hello', event.origin);
        } else {
          console.log(event.data);
        }
      }
      通过 window.postMessage,读写其他窗口的 LocalStorage 
        主窗口写入iframe子窗口的localStorage。
        window.onmessage = function(e) {
          if (e.origin !== 'http://bbb.com') {
            return;
          }
          var payload = JSON.parse(e.data);
          localStorage.setItem(payload.key, JSON.stringify(payload.data));
        };
        上面代码中,子窗口将父窗口发来的消息,写入自己的LocalStorage。
        
        父窗口发送消息的代码如下。
        
        var win = document.getElementsByTagName('iframe')[0].contentWindow;
        var obj = { name: 'Jack' };
        win.postMessage(JSON.stringify({key: 'storage', data: obj}), 'http://bbb.com');
        加强版的子窗口接收消息的代码如下。
        window.onmessage = function(e) {
          if (e.origin !== 'http://bbb.com') return;
          var payload = JSON.parse(e.data);
          switch (payload.method) {
            case 'set':
              localStorage.setItem(payload.key, JSON.stringify(payload.data));
              break;
            case 'get':
              var parent = window.parent;
              var data = localStorage.getItem(payload.key);
              parent.postMessage(data, 'http://aaa.com');
              break;
            case 'remove':
              localStorage.removeItem(payload.key);
              break;
          }
        };
        加强版的父窗口发送消息代码如下。
        
        var win = document.getElementsByTagName('iframe')[0].contentWindow;
        var obj = { name: 'Jack' };
        // 存入对象
        win.postMessage(JSON.stringify({key: 'storage', method: 'set', data: obj}), 'http://bbb.com');
        // 读取对象
        win.postMessage(JSON.stringify({key: 'storage', method: "get"}), "*");
        window.onmessage = function(e) {
          if (e.origin != 'http://aaa.com') return;
          // "Jack"
          console.log(JSON.parse(e.data).name);
        };
  JSONP 服务器与客户端跨源通信的常用方法
    特点就是简单适用,老式浏览器全部支持,服务器改造非常小。
    它的基本思想是,网页通过添加一个<script>元素,向服务器请求JSON数据,
    这种做法不受同源政策限制；服务器收到请求后,将数据放在一个指定名字的回调函数里传回来。
    首先,网页动态插入<script>元素,由它向跨源网址发出请求。
    
    function addScriptTag(src) {
      var script = document.createElement('script');
      script.setAttribute("type","text/javascript");
      script.src = src;
      document.body.appendChild(script);
    }
    
    window.onload = function () {
      addScriptTag('http://example.com/ip?callback=foo');
    }
    
    function foo(data) {
      console.log('Your public IP address is: ' + data.ip);
    };
    上面代码通过动态添加<script>元素,向服务器example.com发出请求。注意,该请求的查询字符串有一个callback参数,用来指定回调函数的名字,这对于JSONP是必需的。
    
    服务器收到这个请求以后,会将数据放在回调函数的参数位置返回。
    foo({
      "ip": "8.8.8.8"
    });
    由于<script>元素请求的脚本,直接作为代码运行。这时,只要浏览器定义了foo函数,该函数就会立即调用。作为参数的JSON数据被视为JavaScript对象,而不是字符串,因此避免了使用JSON.parse的步骤。
  WebSocket 一种通信协议,使用'ws://'(非加密)和'wss://'(加密)作为协议前缀
    该协议不实行同源政策,只要服务器支持,就可以通过它进行跨源通信。
    下面是一个例子,浏览器发出的WebSocket请求的头信息(摘自维基百科)。
    
    GET /chat HTTP/1.1
    Host: server.example.com
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
    Sec-WebSocket-Protocol: chat, superchat
    Sec-WebSocket-Version: 13
    Origin: http://example.com
    上面代码中,有一个字段是Origin,表示该请求的请求源(origin),即发自哪个域名。
    
    正是因为有了Origin这个字段,所以WebSocket才没有实行同源政策。因为服务器可以根据这个字段,判断是否许可本次通信。若该域名在白名单内,服务器就会做出如下回应。
    
    HTTP/1.1 101 Switching Protocols
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
    Sec-WebSocket-Protocol: chat
  CORS
    CORS是跨源资源分享 Cross-Origin Resource Sharing 的缩写。
    它是W3C标准,是跨源AJAX请求的根本解决方法。
    相比JSONP只能发GET请求,CORS允许任何类型的请求。  
  跨域 安全考虑,同源策略的限制,不允许跨域调用其他页面的对象
  协议 域名 端口号 等任一一个不相同,都算作跨域.
Viewport 视口 「HTML5」
  PS:Viewport指的是网页的显示区域,
    也就是不借助滚动条的情况下,用户可以看到的部分网页大小, 中文译为“视口”.
    正常情况下,viewport和浏览器的显示窗口是一样大小的.
    但是,在移动设备上,两者可能不是一样大小.
    比如,手机浏览器的窗口宽度可能是640像素,这时viewport宽度就是640像素,
    但是网页宽度有950像素,正常情况下,浏览器会提供横向滚动条,让用户查看窗口容纳不下的310个像素.
    另一种方法则是,将viewport设成950像素,也就是说,浏览器的显示宽度还是640像素,
    但是网页的显示区域达到950像素,整个网页缩小了,在浏览器中可以看清楚全貌.
    这样一来,手机浏览器就可以看到网页在桌面浏览器上的显示效果.
  viewport缩放规则 「在HTML网页的head部分指定」 
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
    上面代码指定,viewport的缩放规则: 
      缩放到当前设备的屏幕宽度「device-width」,
      初始缩放比例「initial-scale」为1倍,
      禁止用户缩放「user-scalable」;
  viewport 全部属性:
    width: viewport宽度
    height: viewport高度
    initial-scale: 初始缩放比例
    maximum-scale: 最大缩放比例
    minimum-scale: 最小缩放比例
    user-scalable: 是否允许用户缩放
  e.g.:.
    <meta name = "viewport" content = "width = 320, initial-scale = 2.3, user-scalable = no">
SSE 「HTML5」
WebRTC,Web Real Time Communication  网络实时通信 「HTML5」  
  PS: 最初是为了解决浏览器上视频通话而提出的,
    即两个浏览器之间直接进行视频和音频的通信,不经过服务器。
    后来发展到除了音频和视频,还可以传输文字和其他数据。
    Google是WebRTC的主要支持者和开发者,它最初在Gmail上推出了视频聊天,
    后来在2011年推出了Hangouts,允许在浏览器中打电话。推动了WebRTC标准的确立。
  MediaStream,又称 getUserMedia  获取音频和视频 「HTML5」   
    PS: navigator.getUserMedia  在浏览器中获取音频(通过麦克风)和视频(通过摄像头)
      将来可以用于获取任意数据流,比如光盘和传感器
    检查浏览器是否支持getUserMedia方法
      PS:Chrome 21, Opera 18 和Firefox 17,支持该方法。
        目前,IE还不支持,上面代码中的msGetUserMedia,只是为了确保将来的兼容。
      navigator.getUserMedia  = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
      if (navigator.getUserMedia) {
        // 支持
      } 
      else {
        // 不支持
      }
    navigator.getUserMedia(obj,onSuccess,onError);
      obj  对象,表示要获取哪些多媒体设备,
        { 
          video: true, 
          audio: true 
        } 
        表示获取摄像头和麦克风;
      onSuccess  回调函数,在获取多媒体设备成功时调用
        函数的参数是一个数据流对象stream。
        stream.getAudioTracks 方法和 stream.getVideoTracks 方法,
        分别返回一个数组,其成员是数据流包含的音轨和视轨(track)。
        使用的声音源和摄影头的数量,决定音轨和视轨的数量。
        比如,若只使用一个摄像头获取视频,且不获取音频,那么视轨的数量为1,音轨的数量为0。
        每个音轨和视轨,有一个kind属性,表示种类(video或者audio),
        和一个label属性(比如FaceTime HD Camera (Built-in))。
      onError    回调函数,在取多媒体设备失败时调用。
        函数接受一个Error对象作为参数。
        error.code.PERMISSION_DENIED    用户拒绝提供信息。
        error.code.NOT_SUPPORTED_ERROR  浏览器不支持硬件设备。
        error.code.MANDATORY_UNSATISFIED_ERROR 无法发现指定的硬件设备。
      e.g.:
        将摄像头拍摄的图像展示在网页上
        <video src="" controls="" id="camera"> </video>
        
        var constraints = {video: true};
        var vide = document.querySelector("#camera");
        function onSuccess(stream) {
          if (window.URL) {
            vide.src = window.URL.createObjectURL(stream);
          } 
          else { 
            vide.src = stream; 
          }
          vide.autoplay = true; 
          // 或者 vide.play();
        }
        function onError(error) {
          console.log("navigator.getUserMedia error: ", error);
        }
        if (navigator.getUserMedia) {
          navigator.getUserMedia(constraints, onSuccess, onError);
        } 
        else {
          vide.src = 'somevideo.mp4';
        }
        网页使用getUserMedia方法,浏览器就会询问用户,是否同意调用麦克风或摄像头;
        若用户同意,就调用回调函数onSuccess；
        若用户拒绝,就调用回调函数onError。
        浏览器兼容性
          Chrome中需使用https协议;
          Firefox中需使用mozGetUserMedia;
          vide.src
            大部分浏览器:
            URL.createObjectURL 方法将媒体数据流(MediaStream),
            转为一个二进制对象的URL(Blob URL),
            该URL可以作为video元素的src属性的值。 
            有些浏览器:
            媒体数据流可以直接作为src属性的值。
    Canvas API  ctx.drawImage(video, 0, 0)  可将视频的一个帧转为canvas元素
      PS:使得截屏变得非常容易。
      <video autoplay></video>
      <img src="">
      <canvas style="display:none;"></canvas>
      
      <script>
      var video = document.querySelector('video');
      var canvas = document.querySelector('canvas');
      var ctx = canvas.getContext('2d');
      var localMediaStream = null;
      function snapshot() {
        if (localMediaStream) {
          ctx.drawImage(video, 0, 0);
          // “image/webp”对Chrome有效,其他浏览器自动降为image/png
          document.querySelector('img').src = canvas.toDataURL('image/webp');
        }
      }
      video.addEventListener('click', snapshot, false);
      navigator.getUserMedia({video: true}, function(stream) {
        video.src = window.URL.createObjectURL(stream);
        localMediaStream = stream;
      }, errorCallback);
      </script>
    Web Audio API  通过浏览器捕获声音
      e.g.:
        捕获麦克风声音
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        var context = new AudioContext();
        function onSuccess(stream) {
          var audioInput = context.createMediaStreamSource(stream);
          audioInput.connect(context.destination);
        }
        navigator.getUserMedia({audio:true}, onSuccess);
    捕获的限定条件
      getUserMedia方法的第一个参数,除了指定捕获对象之外,还可以指定一些限制条件,
      比如限定只能录制高清(或者VGA标准)的视频。
      var hdConstraints = {
        video: {
          mandatory: {
            minWidth: 1280,
            minHeight: 720
          }
        }
      };
      navigator.getUserMedia(hdConstraints, onSuccess, onError);
      
      var vgaConstraints = {
        video: {
          mandatory: {
            maxWidth: 640,
            maxHeight: 360
          }
        }
      };
      navigator.getUserMedia(vgaConstraints, onSuccess, onError);
    MediaStreamTrack.getSources() 使用指定的媒体设备
      若本机有多个摄像头/麦克风,就需要使用 MediaStreamTrack.getSources 方法指定,
      到底使用哪一个摄像头/麦克风。
      function sourceSelected(audioSource, videoSource) {
        var constraints = {
          audio: {
            optional: [{sourceId: audioSource}]
          },
          video: {
            optional: [{sourceId: videoSource}]
          }
        };
        navigator.getUserMedia(constraints, onSuccess, onError);
      }
      MediaStreamTrack.getSources(function(sourceInfos) {
        var audioSource = null;
        var videoSource = null;
        for (var i = 0; i != sourceInfos.length; ++i) {
          var sourceInfo = sourceInfos[i];
          if (sourceInfo.kind === 'audio') {
            console.log(sourceInfo.id, sourceInfo.label || 'microphone');
            audioSource = sourceInfo.id;
          } 
          else if (sourceInfo.kind === 'video') {
            console.log(sourceInfo.id, sourceInfo.label || 'camera');
            videoSource = sourceInfo.id;
          } 
          else {
            console.log('Some other kind of source: ', sourceInfo);
          }
        }
        sourceSelected(audioSource, videoSource);
      });
      上面代码表示, MediaStreamTrack.getSources 方法的回调函数,
      可以得到一个本机的摄像头和麦克风的列表,然后指定使用最后一个摄像头和麦克风。
  RTCPeerConnection    进行音频和视频通信
    作用是在浏览器之间建立数据的“点对点”(peer to peer)通信,
    也就是将浏览器获取的麦克风或摄像头数据,传播给另一个浏览器。
    这里面包含了很多复杂的工作,比如信号处理、多媒体编码/解码、
    点对点通信、数据安全、带宽管理等等。
    不同客户端之间的音频/视频传递,是不用通过服务器的。
    但是,两个客户端之间建立联系,需要通过服务器。
    服务器主要转递两种数据:
      通信内容的元数据：
        打开/关闭对话(session)的命令、
        媒体文件的元数据(编码格式、媒体类型和带宽)等。
      网络通信的元数据： IP地址、NAT网络地址翻译和防火墙等。
    WebRTC协议没有规定与服务器的通信方式,因此可以采用各种方式, 比如WebSocket。
    通过服务器,两个客户端按照Session Description Protocol(SDP协议)交换双方的元数据。
    e.g.:
      var signalingChannel = createSignalingChannel();
      var pc;
      var configuration = ...;
      // run start(true) to initiate a call
      function start(isCaller) {
        pc = new RTCPeerConnection(configuration);
        
        // send any ice candidates to the other peer
        pc.onicecandidate = function (evt) {
          signalingChannel.send(JSON.stringify({ "candidate": evt.candidate }));
        };
        
        // once remote stream arrives, show it in the remote video element
        pc.onaddstream = function (evt) {
          remoteView.src = URL.createObjectURL(evt.stream);
        };
        
        // get the local stream, show it in the local video element and send it
        navigator.getUserMedia({ "audio": true, "video": true }, function (stream) {
          selfView.src = URL.createObjectURL(stream);
          pc.addStream(stream);
          
          if (isCaller)
          pc.createOffer(gotDescription);
          else
          pc.createAnswer(pc.remoteDescription, gotDescription);
          
          function gotDescription(desc) {
            pc.setLocalDescription(desc);
            signalingChannel.send(JSON.stringify({ "sdp": desc }));
          }
        });
      }
      signalingChannel.onmessage = function (evt) {
      if (!pc)
      start(false);
      
      var signal = JSON.parse(evt.data);
      if (signal.sdp)
      pc.setRemoteDescription(new RTCSessionDescription(signal.sdp));
      else
      pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
    };
    Chrome浏览器中为 webkitRTCPeerConnection ,
    Firefox浏览器中为 mozRTCPeerConnection。
    Google 维护一个函数库 adapter.js ,用来抽象掉浏览器之间的差异。
  RTCDataChannel       进行任意数据的通信
    作用是在点对点之间,传播任意数据。它的API与WebSockets的API相同。
    e.g.:
      var pc = new webkitRTCPeerConnection(servers, {
        optional: [{RtpDataChannels: true}]
      });
      pc.ondatachannel = function(event) {
        receiveChannel = event.channel;
        receiveChannel.onmessage = function(event){
          document.querySelector("div#receive").innerHTML = event.data;
        };
      };
      sendChannel = pc.createDataChannel("sendDataChannel", {reliable: false});
      document.querySelector("button#send").onclick = function (){
        var data = document.querySelector("textarea#send").value;
        sendChannel.send(data);
      };
      Chrome 25、Opera 18 和Firefox 22 支持RTCDataChannel。
  外部函数库
    由于API比较复杂,一般采用外部函数库进行操作。
    目前,视频聊天的函数库有 SimpleWebRTC easyRTC webRTC.io,
    点对点通信的函数库有PeerJS、Sharefest。
    e.g.: SimpleWebRTC的示例
      var webrtc = new WebRTC({
        localVideoEl: 'localVideo',
        remoteVideosEl: 'remoteVideos',
        autoRequestMedia: true
      });
      webrtc.on('readyToCall', function () {
          webrtc.joinRoom('My room name');
      });
    e.g.:PeerJS的示例
      var peer = new Peer('someid', {key: 'apikey'});
      peer.on('connection', function(conn) {
        conn.on('data', function(data){
          // Will print 'hi!'
          console.log(data);
        });
      });
      
      // Connecting peer
      var peer = new Peer('anotherid', {key: 'apikey'});
      var conn = peer.connect('someid');
      conn.on('open', function(){
        conn.send('hi!');
      });
devicelight    设备屏幕亮度变化事件 「HTML5」
  PS:移动设备的亮度传感器感知外部亮度发生显著变化时触发;目前,只有Firefox部署了该API
  var DLRun = function(event) { }
  window.addEventListener('devicelight',DLRun);
  event.value  亮度的流明值
  e.g.:  若亮度变强,网页显示黑底白字,若亮度变弱,网页显示白底黑字
    window.addEventListener('devicelight', function(e) {
      var lux = e.value;
      if(lux < 50) {
        document.body.className = 'dim';
      }
      if(lux >= 50 && lux <= 1000) {
        document.body.className = 'normal';
      }
      if(lux > 1000)  {
        document.body.className = 'bright';
      } 
    });
    CSS下一个版本的Media Query可以单独设置亮度,一旦浏览器支持,就可以用来取代Luminosity API.
    @media (light-level: dim) { /* 暗光环境 */ }
    @media (light-level: normal) { /* 正常光环境 */ }
    @media (light-level: washed) { /* 明亮环境 */ }
deviceorientation  设备摆放方向「竖放或横放」变化事件「HTML5」
  PS:一旦设备的方向发生变化触发
  检测浏览器是否支持该API
    if (window.DeviceOrientationEvent) { /*  支持 */ } 
    else { /* 不支持 */ }
  window.addEventListener("deviceorientation", DORun);
  function DORun(event){ }
  event 
    PS:分别对应手机摆放的三维倾角变化.要理解它们,就要理解手机的方向模型.
      当手机水平摆放时,使用三个轴标示它的空间位置：x轴代表横轴、y轴代表竖轴、z轴代表垂直轴.
      event对象的三个属性就对应这三根轴的旋转角度.
    event.alpha  表示围绕z轴的旋转,从0到360度.      设备水平摆放时,alpha为0
    event.beta   表示围绕x轴的旋转,从-180 度到180度 设备水平摆放时,beta为0
    event.gamma 表示围绕y轴的选择,从-90 到90度      设备水平摆放时,gramma为0
orientationchange  在屏幕发生翻转时触发「HTML5」 
  window.orientation 设备的方向,0 表示竖直;90 表示右旋;-90 表示 左旋;
rel='perfetch' 预加载网页内容,为浏览者提供一个平滑的浏览体验「HTML5」 
  <link rel="prefetch" href="url">
  url可为一网页地址或图片地址
移动端JS 
  event 事件
    理解click的300ms的延迟响应
      Click事件在移动手机开发中有300ms的延迟,
      因为在手机早期,浏览器系统有放大和缩放功能,
      用户在屏幕上点击两次之后,系统会触发放大或者缩放功能,
      因此系统做了一个处理,当触摸一次后,在300ms这段时间内有没有触摸第二次则为点击点击事件,
      若触摸了第二次的话,说明是触发放大或缩放功能。
      因此当click时候,所有用户必须等待于300ms后才会触发click事件。
      所以当在移动端使用click事件的时候,会感觉到有300ms的迟钝。
    Touch 触摸事件
      PS: 由于触摸会导致屏幕滚动,在事件函数内使用event.preventDefault()阻止掉默认事件(默认滚动)
      ◆在规范中列出并获得跨移动设备广泛实现的基本触摸事件
      touchstart  当手指放在屏幕上触发;
      touchmove   当手指在屏幕上滑动时,连续地触发;
        e.g.:
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
      touchend    当手指从屏幕上离开时触发;
      ◆规范提供了额外的三个触摸事件,但兼容性可能不太好.
      touchenter   移动的手指进入一个DOM元素。
      touchleave   移动手指离开一个DOM元素。
      touchcancel  触摸被中断（实现规范）。
      e.g.:
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
    事件对象 TouchEvent 
      e.touches          当前位于屏幕上的所有手指的一个列表
        event.touches.length  表示屏幕上触摸的手指个数
      e.targetTouches    位于当前DOM元素上的手指的一个列表
        PS:touch事件会冒泡,所以我们可以使用这个属性指出目标对象.
        event.touches.length  表示元素上触摸的手指个数
      e.originalEvent.changedTouches   
        e.originalEvent.changedTouches.Identifier  标示触摸的唯一ID [不存在?]
        e.originalEvent.changedTouches[0].clientX     触摸目标在视口中的X坐标
        e.originalEvent.changedTouches[0].clientY     触摸目标在视口中的Y坐标
        e.originalEvent.changedTouches[0].pageX    页面中的X坐标
        e.originalEvent.changedTouches[0].pageY    页面中的Y坐标
        e.originalEvent.changedTouches[0].screenX     触摸目标在屏幕中的X坐标
        e.originalEvent.changedTouches[0].screenY     触摸目标在屏幕中的Y坐标
        e.originalEvent.changedTouches[0].target      触摸的DOM节点目标
      event.preventDefault();  阻止滚动 [?]
        一些移动设备有缺省的touchmove行为,比如说经典的iOSoverscroll效果,
        当滚动超出了内容的界限时就引发视图反弹,这种做法在许多多点触控应用中会带来混乱。
    Gestures 触摸事件
      PS:该事件针对IOS设备,一个Gestures事件在两个或更多手指触摸屏幕时触发。
      Gesturestart  当一个手指已经按在屏幕上,而另一个手指又触摸在屏幕时触发。
      Gesturechange 当触摸屏幕的任何一个手指的位置发生改变的时候触发。
      Gestureend    当任何一个手指从屏幕上面移开时触发。
    触摸事件和手势事件的关系：
      当一个手指放在屏幕上时,会触发touchstart事件,
      而另一个手指触摸在屏幕上时触发gesturestart事件,随后触发基于该手指的touchstart事件。
      若一个或两个手指在屏幕上滑动时,将会触发gesturechange事件,
      但是只要有一个手指移开时候,则会触发gestureend事件,紧接着会触发touchend事件。
      手势的专有属性：
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
    屏幕旋转事件 orientationchange
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
  微信  
    不支持的功能
      模板字符串  ios中支持,android中不支持. [20170124]
      可使用 window.open() 来打开新窗口,但都在当前窗口中打开,不支持 window.opener 来传递信息
      不支持进行跳转到上一步url中带有参数 的url地址  [?]
        比如：一个查询列表页的url是： http://someweb?city=beijing
        当从这个页面跳到第二个页面比如详细页, 在详细页再执行返回上一页如： 
        location.href=document.referrer的时候   
        跳回的url就不再是 http://someweb?city=beijing   所以页面可能会死掉
        解决：微信开发中 不要用 带url参数的地址,都用/ ../ ,
        把上面的 http://someweb?city=beijing   换成   http://someweb/beijing   这种即可
    event 事件
      click 无延迟 [?]
      touchend 、 touchstar 始终会触发(而不管是否改为滑动)
      禁止下滑显示网址
        $(document).on('touchmove',function(e){
          e.preventDefault();
        })
Web_Socket 网络通信协议「HTML5」 
  PS:目标是在一个单独的持久连接上提供全双工、双向通信
    允许与一个Web服务的连接保持打开,
    只要有新数据,Web服务就可以把数据发送给你 [且你的代码会得到通知]
    在JS中创建Web Socket之后,会有一个HTTP请求发送来连接
    建立的连接会使用HTTP升级,从HTTP协议交换为Web Socket协议
    标准的HTTP服务器无法实现Web Socket,需使用支持ws或wss协议的服务器才能正常工作
    允许跨域通信
  缺点:
    Web Socket使用了自定义的协议,而制定协议的时间比制定JS API的事件还要长
    可能存在安全隐患
  创建Web Socket:使用 WebSocket 构造函数
    var ws =new WebSocket("ws://yourdomain/yourservice");
    必须给构造函数传入绝对URL
    实例化ws对象后,浏览器就会马上尝试创建连接
  属性 方法
    ws.readyState;  表示当前的连接状态值
      0  正在建立连接
      1  已经建立连接
      2  正在关闭连接
      3  已经关闭连接
    ws.close();  关闭Web Socket连接
    ws.send("message"); 发送数据(任意字符)
      Web Socket只能通过连接发送纯文本数据,对于复杂的数据结构,需转换为JSON字符串再发送
  事件
    WebSocket对象不支持DOM2级事件绑定,需使用DOM1级来定义(使用on+事件名)
    message 当服务器向客户端发来消息时触发事件,生成event对象
      e.data  值为返回的数据(字符串格式,需要手工解析)
    open 在成功建立连接时触发事件
    error 在发生错误时触发,连接不能持续
    close 在连接关闭时触发
      e.wasClean  表示连接是否已明确关闭的布尔值
      e.code      服务器返回的数值状态码
      e.reason    服务器发回的消息,类型为字符串
  webSocket如何兼容低浏览器？
    Adobe Flash Socket 、
    ActiveX HTMLFile(IE) 、
    基于 multipart 编码发送 XHR 、
    基于长轮询的 XHR
Web_Storage    网页本地存储 「IE8+ HTML5」
  PS: JS提供了sessionStorage和globalStorage,
    在HTML5中提供了localStorage来取代globalStorage;
  localStorage   本地存储
    PS: 永久存储,永不失效除非手动删除
      有容量限制,每个域「包括各个网页」 5 M 左右「DiBs」;
      子域名间或子域名和主域名间localStorage不共享;
      本质是在读写文件,数据多的话会比较卡,firefox会一次性将数据导入内存,
      不能被爬虫爬取,不要用它完全取代URL传参,
      各浏览器间,数据是独立的,在firefox中的localstorage数据,在chrome上无法读取.
      只能存储字符串,当存取的内容比较复杂时,使用JSON函数辅助处理
    localStorage.XX = str;               自定义属性进行读/写
      e.g.
      localStorage.XX;   //"abc"
      localStorage;       //Storage {name: "abc", length: 1}
    localStorage.length;                 localStorage的数据项个数
    localStorage.key(num);               获取localStorage中第num+1 个key对的值
      console.log(localStorage); // Storage {aoo: "a", boo: "b", length: 2}
      localStorage.key(0); // "aoo"
    localStorage.setItem("name", str);   键值对形式存值
    localStorage.getItem("name");        获取对应键的值
    localStorage.removeItem('name');     删除键值对
    localStorage.clear();                清除所有数据
    e.g. 保存网页状态的原理说明
      储存信息
        将有变化的内容信息存在一个对象a中,
        通过JSON序列化(当存取的内容复杂时使用JSON来辅助处理)后存到 localstorage.XX 中;
      还原信息
        当关闭网页后下次加载时,通过JSON将 localstorage.XX 中的字符串反序列化成对象a
      还原页面
        通过函数添加HTML元素和a中的信息,还原上次的网页状态.
    localstorage在隐私模式下不可读取
      隐私模式下可以采用 window.name 模拟sessionStorage的方式处理
      因为 window.name 是可做保存的,这个也是其解决跨域方案的原因
  sessionStorage 临时本地存储
    session即会话的意思,session对象的有效期为用户浏览某个网站时,从进入网站到关闭网站这个时间段.
    刷新网页并不会失效.
  sessionStorage 和 localStorage 的区别
    sessionStorage 不在不同的浏览器窗口中共享,即使是同一个页面,
    会在同一个窗口打开的不同页面间共享.
    localStorage 在所有同源窗口中都是共享的；
    cookie 也是在所有同源窗口中都是共享的.
  IE中localStorage中存在问题 ?
application_cache,简称appcache  应用离线缓存 「HTML5」
  PS:让Web应用在离线状态下继续使用, 通过 manifest 文件指明需要缓存的资源;
    使用 HTML5,通过创建 cache manifest 文件,可以轻松地创建 web 应用的离线版本;
    每个指定了 manifest 的页面在用户对其访问时都会被缓存;
    若未指定 manifest 属性,则页面不会被缓存,除非在 manifest 文件中直接指定了该页面;
    manifest 文件需要配置正确的 MIME-type,即 "text/cache-manifest";
    必须在 web 服务器上进行配置;
    如需启用应用程序缓存,需在文档的 <html> 标签中包含 manifest 属性;
    manifest 文件的建议的文件扩展名是：".appcache";
    移动端支持度比较好;
  manifest 文件可分为三个部分：
    CACHE MANIFEST //此标题下列出的文件将在首次下载后进行缓存
    NETWORK        //此标题下列出的文件需要与服务器的连接,且不会被缓存
    FALLBACK       //此标题下列出的文件规定当页面无法访问时的回退页面,比如 404 页面
    e.g.：
      CACHE MANIFEST
      #version n.n
      
      CACHE:
      #需要缓存的文件
      /css/sample.css
      /img/image.png
      
      NETWORK:
      #每次重新拉取的文件
      * 「表示除 CACHE 中指定的文件其他全部」
      
      FALLBACK
      #离线状态下代替文件
      /offline.html
  e.g. :
    // manifest文件中
    CACHE MANIFEST
    #version 1.1
    CACHE:
      img/1.jpg
      img/2.jpg
      css/assets.css
    NETWORK:
      *
    // html中
    <!DOCTYPE html>
    <html manifest="./manifest.appcache"> 
      <head>
        <meta charset="utf-8">
        <title>app cache demo</title>
      </head>
      <body>
        <h1>app cache demo</h1>
        <ul>
          <li><img src="img/1,jpg" alt=""></li>
          <li><img src="img/2,jpg" alt=""></li>
        </ul>
      </body>
      <script type="text/javascript">
      window.addEventListener("load",function(e){
        window.applicationCache.addEventListener("updateready",function(e){
          console.log(window.applicationCache.status);
          if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
            window.applicationCache.swapCache();
            if (confirm('a new version of this site is available,load it?')) {
              window.location.reload();
            }
          }
          else {
            console.log('manifest don\'t change');
          }
        },false)
      },false)
        
      </script>
    </html>
    
    在服务器添加mime-types text/cache-manifest
      如在 xampp->apache->conf->mime.types 中
      添加 text/cache-manifest  appcache
  applicationCache 核心对象
    applicationCache.status; 表示应用缓存的状态值
      0  无缓存,没有与页面相关的应用缓存
      1  闲置,应用缓存未得到更新
      2  检查中,正在下载描述文件并检查更新
      3  下载中,应用缓存正在下载描述文件中指定的资源
      4  更新完成,应用缓存已经更新了资源,且所有资源都已下载完毕,可通过swapCache()来使用了
      5  废弃,应用缓存的描述文件已经不存在了,此页面无法再访问应用缓存
    ◆事件
    checking  在浏览器为应用缓存查找更新时触发
    error     在检查更新或下载资源期间发生错误时触发
    noupdate  在检查描述文件发现文件无变化时触发
    downloading 在开始下载应用缓存资源时触发
    progress  在文件下载应用缓存的过程中持续不断的触发
    updateready 在页面新的应用缓存下载完毕且可以通过swapCache()使用时触发
    cached    在应用缓存完整可用时触发
IndexedDB   浏览器端数据库 「HTML5」 
  PS： IE 10+支持,但是Safari完全不支持「?」;
    能够在客户端持久的储存结构化数据的数据库,并且提供了丰富的查询能力;
    按域名分配独立空间「如a.qq.com 和 b.qq.com」,一个域名下可以创建多个数据库,
    每个数据库可以创建多个对象储存空间「表」,
    一个对象储存空间可以储存多个对象数据
  概述 
    随着浏览器的处理能力不断增强,越来越多的网站开始考虑,将大量数据储存在客户端,
    这样可以减少用户等待从服务器获取数据的时间。
    现有的浏览器端数据储存方案,都不适合储存大量数据;
    cookie不超过4KB,且每次请求都会发送回服务器端;
    Window.name 属性缺乏安全性,且没有统一的标准;
    localStorage在 2.5 M 到 10 MB 之间「DiBs」;
    可以被网页脚本程序创建和操作,它允许储存大量数据,提供查找接口,还能建立索引。
    IndexedDB不属于关系型数据库「不支持SQL查询语句」,更接近NoSQL数据库。
  特点 
    1、键值对储存 
      IndexedDB内部采用对象仓库「object store」存放数据。
      所有类型的数据都可以直接存入,包括JavaScript对象。
      在对象仓库中,数据以“键值对”的形式保存,
      每一个数据都有对应的键名,键名是独一无二的,不能有重复,否则会抛出一个错误。
    2、异步
      IndexedDB操作时不会锁死浏览器,用户依然可以进行其他操作,
      这与localStorage形成对比,后者的操作是同步的。
      异步设计是为了防止大量数据的读写,拖慢网页的表现。
    3、支持事务。 
      IndexedDB支持事务「transaction」,
      意味着一系列操作步骤之中,只要有一步失败,整个事务就都取消,
      数据库回到事务发生之前的状态,不存在只改写一部分数据的情况。
    4、同域限制 
      IndexedDB也受到同域限制,每一个数据库对应创建该数据库的域名。
      来自不同域名的网页,只能访问自身域名下的数据库,而不能访问其他域名下的数据库。
    5、储存空间大 
      IndexedDB的储存空间比localStorage大得多,一般来说不少于250MB。
      IE的储存上限是250MB,Chrome和Opera是剩余空间的某个百分比,Firefox则没有上限。
    6、支持二进制储存。
       IndexedDB不仅可以储存字符串,还可以储存二进制数据。
  检查浏览器是否支持该API及兼容写法 
    if("indexedDB" in window) {
      console.log('支持');
    } 
    else {
      console.log('不支持');
    }
    兼容写法
    var indexedDB = window.indexedDB || window.webkitIndexedDB 
    || window.mozIndexedDB || window.msIndexedDB;
  var openRequest = indexedDB.open(str[,num]);  打开数据库,不存在则创建
    str   字符串,数据库名称
    num   大于 0 的正整数「0 将报错」,数据库版本,可选,默认为1
  打开数据库事件 
    PS：open方法返回的是一个对象「IDBOpenDBRequest」,事件在该对象上触发
    success 打开成功
    error   打开失败
    upgradeneeded 第一次打开该数据库,或者数据库版本发生变化时 
      第一次打开数据库时,会先触发upgradeneeded事件,然后触发success事件。
    blocked       上一次的数据库连接还未关闭 
    event,事件对象
      event.target.result 指向打开的IndexedDB数据库
    e.g.：
      var openRequest = indexedDB.open("test",1);
      var db;
      openRequest.onupgradeneeded = function(e) {
        console.log("Upgrading...");
      }
      openRequest.onsuccess = function(e) {
        console.log("Success!");
        db = e.target.result;
      }
      openRequest.onerror = function(e) {
        console.log("Error");
        console.dir(e);
      }
  ◆数据库对象实例的方法、属性
    PS：获得数据库实例以后,就可以用实例对象的方法操作数据库。
  db.createObjectStore(str[,obj]); 用于创建存放数据的“对象仓库” 
    PS：类似于传统关系型数据库的表格;若该对象仓库已经存在,就会抛出一个错误;
    str 字符串,对象仓库的名称
    obj 对象,用于设置对象仓库的属性
      db.createObjectStore("test", { keyPath: "email" }); 
      db.createObjectStore("test2", { autoIncrement: true });
      keyPath 表示所存入对象的email属性用作每条记录的键名
        「由于键名不能重复,所以存入之前必须保证数据的email属性值都是不一样的」,默认值为null；
      autoIncrement 表示是否使用自动递增的整数作为键名「第一个数据为1,第二个数据为2,以此类推」
        默认为false。 一般来说,keyPath和autoIncrement属性只要使用一个就够了,
        若两个同时使用,表示键名为递增的整数,且对象不得缺少指定属性。
  db.objectStoreNames  返回一个DOMStringList对象 
    里面包含了当前数据库所有“对象仓库”的名称。
    db.objectStoreNames.contains(str)  检查数据库是否包含某个“对象仓库”
      if(!db.objectStoreNames.contains("firstOS")) {
        db.createObjectStore("firstOS");
      }
      判断某个“对象仓库”是否存在,若不存在就创建该对象仓库。
  ◆数据库事务对象
  var dbt = db.transaction(arr,option);  返回一个事务对象 
    PS：向数据库添加数据之前,必须先创建数据库事务。
    arr     数组,里面是所涉及的对象仓库,通常是只有一个
    option  字符串,表示操作类型,目前,操作类型只有两种
      添加数据使用readwrite,读取数据使用readonly。
      readonly  只读
      readwrite 读写
  var store = dbt.objectStore("firstOS");  用于获取指定的对象仓库
  事务对象的三个事件,可以用来定义回调函数
    abort    事务中断
    complete 事务完成
    error    事务出错
    var dbt = db.transaction(["note"], "readonly");  
    dbt.oncomplete = function(event) {
      // some code
    };
  ◆事务对象的方法,用于操作数据。
  var request = store.add(o,1); 添加数据
    获取对象仓库以后,就可以用add方法往里面添加数据了。
    var store = dbt.objectStore("firstOS");
    var o = {p: 123};
    var request = store.add(o,1);
    add方法的第一个参数是所要添加的数据,
    第二个参数是这条数据对应的键名(key),上面代码将对象o的键名设为1。
    若在创建数据仓库时,对键名做了设置,这里也可以不指定键名。
    success和error事件
      add方法是异步的,有自己的success和error事件
      var request = store.add(o,1);
      request.onerror = function(e) {
        // error handler
        console.log("Error",e.target.error.name); 
      }
      request.onsuccess = function(e) {
        console.log("数据添加成功！");
      }
  var ob = store.get(x); 读取数据
    参数是数据的键名
    var t = db.transaction(["test"], "readonly");
    var store = dbt.objectStore("test");
    var ob = store.get(x);
    get方法也是异步的,会触发自己的success和error事件,可以对它们指定回调函数。
      var ob = store.get(x);
      ob.onsuccess = function(e) {
        // ...
      }
  从创建事务到读取数据,所有操作方法也可以写成下面这样链式形式。
    db.transaction(["test"], "readonly")
    .objectStore("test")
    .get(X)
    .onsuccess = function(e){}
  var request = store.put(o, 1); 更新记录
    put方法的用法与add方法相近。
    var o = { p:456 };
    var request = store.put(o, 1);
  var request = store.delete(thisId); 删除记录
    var t = db.transaction(["people"], "readwrite");
    var request = dbt.objectStore("people").delete(thisId);
    delete方法的参数是数据的键名。另外,delete也是一个异步操作,可以为它指定回调函数。
  var cursor = store.openCursor(); 遍历数据
    若想要遍历数据,就要openCursor方法,它在当前对象仓库里面建立一个读取光标(cursor)。
    var t = db.transaction(["test"], "readonly");
    var store = dbt.objectStore("test");
    var cursor = store.openCursor();
    openCursor方法也是异步的,有自己的success和error事件,可以对它们指定回调函数。
      cursor.onsuccess = function(e) {
        var res = e.target.result;
        if(res) {
          console.log("Key", res.key);
          console.dir("Data", res.value);
          res.continue();
        }
      }
      回调函数接受一个事件对象作为参数,该对象的 target.result 属性指向当前数据对象。
      当前数据对象的 key 和 value 分别返回键名和键值「即实际存入的数据」。
      continue 方法将光标移到下一个数据对象,
      若当前数据对象已经是最后一个数据了,则光标指向null。
    openCursor方法还可以接受第二个参数,表示遍历方向,默认值为next,
      其他可能的值为prev、nextunique和prevunique。
      后两个值表示若遇到重复值,会自动跳过。
  store.createIndex 用于创建索引
    假定对象仓库中的数据对象都是下面person类型的。
    var person = {
      name:name,
      email:email,
      created:new Date()
    }
    可以指定这个数据对象的某个属性来建立索引。
    var store = db.createObjectStore("people", { autoIncrement:true });
    store.createIndex("name","name", {unique:false});
    store.createIndex("email","email", {unique:true});
    createIndex方法接受三个参数,
    第一个是索引名称,
    第二个是建立索引的属性名,
    第三个是参数对象,用来设置索引特性。
    unique表示索引所在的属性是否有唯一值,上面代码表示name属性不是唯一值,email属性是唯一值。
  var request = index.get(name); 从对象仓库返回指定的索引
    有了索引以后,就可以针对索引所在的属性读取数据。
    var t = db.transaction(["people"],"readonly");
    var store = dbt.objectStore("people");
    var index = store.index("name");
    var request = index.get(name);
    上面代码打开对象仓库以后,先用index方法指定索引在name属性上面,
    然后用get方法读取某个name属性所在的数据。
    若没有指定索引的那一行代码,get方法只能按照键名读取数据,
    而不能按照name属性读取数据。
    需要注意的是,这时get方法有可能取回多个数据对象,因为name属性没有唯一值。
    另外,get是异步方法,读取成功以后,只能在success事件的回调函数中处理数据。
  IDBKeyRange对象
    索引的有用之处,还在于可以指定读取数据的范围。
    这需要用到浏览器原生的IDBKeyRange对象。
    IDBKeyRange对象的作用是生成一个表示范围的Range对象。生成方法有四种：
    lowerBound方法：指定范围的下限。
    upperBound方法：指定范围的上限。
    bound方法：指定范围的上下限。
    only方法：指定范围中只有一个值。
    下面是一些代码实例：
    // All keys ≤ x	
    var r1 = IDBKeyRange.upperBound(x);
    
    // All keys < x	
    var r2 = IDBKeyRange.upperBound(x, true);
    
    // All keys ≥ y	
    var r3 = IDBKeyRange.lowerBound(y);
    
    // All keys > y	
    var r4 = IDBKeyRange.lowerBound(y, true);
    
    // All keys ≥ x && ≤ y	
    var r5 = IDBKeyRange.bound(x, y);
    
    // All keys > x &&< y	
    var r6 = IDBKeyRange.bound(x, y, true, true);
    
    // All keys > x && ≤ y	
    var r7 = IDBKeyRange.bound(x, y, true, false);
    
    // All keys ≥ x &&< y	
    var r8 = IDBKeyRange.bound(x, y, false, true);
    
    // The key = z	
    var r9 = IDBKeyRange.only(z);
    前三个方法(lowerBound、upperBound和bound)默认包括端点值,可以传入一个布尔值,修改这个属性。
    
    生成Range对象以后,将它作为参数输入openCursor方法,就可以在所设定的范围内读取数据。
    var t = db.transaction(["people"],"readonly");
    var store = dbt.objectStore("people");
    var index = store.index("name");
    
    var range = IDBKeyRange.bound('B', 'D');
    
    index.openCursor(range).onsuccess = function(e) {
      var cursor = e.target.result;
      if(cursor) {
        console.log(cursor.key + ":");
        for(var field in cursor.value) {
          console.log(cursor.value[field]);
        }
        cursor.continue();
      }
    }  
  e.g.：
Web Notifications 浏览器通知接口 「DiBs」「HTML5」  
  概述
  Notification API是浏览器的通知接口,用于在用户的桌面(而不是网页上)显示通知信息,桌面电脑和手机都适用,比如通知用户收到了一封Email。具体的实现形式由浏览器自行部署,对于手机来说,一般显示在顶部的通知栏。
  
  若网页代码调用这个API,浏览器会询问用户是否接受。只有在用户同意的情况下,通知信息才会显示。
  
  下面的代码用于检查浏览器是否支持这个API。
  
  
  if (window.Notification) {
    // 支持
  } else {
    // 不支持
  }
  
  目前,Chrome和Firefox在桌面端部署了这个API,Firefox和Blackberry在手机端部署了这个API。
  
  
  if(window.Notification && Notification.permission !== "denied") {
  	Notification.requestPermission(function(status) {
  		var n = new Notification('通知标题', { body: '这里是通知内容！' }); 
  	});
  }
  
  上面代码检查当前浏览器是否支持Notification对象,并且当前用户准许使用该对象,然后调用Notification.requestPermission方法,向用户弹出一条通知。
  
  Notification对象的属性和方法
  Notification.permission
  Notification.permission属性,用于读取用户给予的权限,它是一个只读属性,它有三种状态。
  
  default：用户还没有做出任何许可,因此不会弹出通知。
  granted：用户明确同意接收通知。
  denied：用户明确拒绝接收通知。
  Notification.requestPermission()
  Notification.requestPermission方法用于让用户做出选择,到底是否接收通知。它的参数是一个回调函数,该函数可以接收用户授权状态作为参数。
  
  
  Notification.requestPermission(function (status) {
    if (status === "granted") {
      var n = new Notification("Hi!");
    } else {
      alert("Hi!");
    }
  });
  
  上面代码表示,若用户拒绝接收通知,可以用alert方法代替。
  
  Notification实例对象
  Notification构造函数
  Notification对象作为构造函数使用时,用来生成一条通知。
  
  
  var notification = new Notification(title, options);
  
  Notification构造函数的title属性是必须的,用来指定通知的标题,格式为字符串。options属性是可选的,格式为一个对象,用来设定各种设置。该对象的属性如下：
  
  dir：文字方向,可能的值为auto、ltr(从左到右)和rtl(从右到左),一般是继承浏览器的设置。
  lang：使用的语种,比如en-US、zh-CN。
  body：通知内容,格式为字符串,用来进一步说明通知的目的。。
  tag：通知的ID,格式为字符串。一组相同tag的通知,不会同时显示,只会在用户关闭前一个通知后,在原位置显示。
  icon：图表的URL,用来显示在通知上。
  上面这些属性,都是可读写的。
  
  下面是一个生成Notification实例对象的例子。
  
  
  var notification = new Notification('收到新邮件', {
    body: '您总共有3封未读邮件。'
  });
  
  notification.title // "收到新邮件"
  notification.body // "您总共有3封未读邮件。"
  
  实例对象的事件
  Notification实例会触发以下事件。
  
  show：通知显示给用户时触发。
  click：用户点击通知时触发。
  close：用户关闭通知时触发。
  error：通知出错时触发(大多数发生在通知无法正确显示时)。
  这些事件有对应的onshow、onclick、onclose、onerror方法,用来指定相应的回调函数。addEventListener方法也可以用来为这些事件指定回调函数。
  
  
  notification.onshow = function() {
    console.log('Notification shown');
  };
  
  close方法
  Notification实例的close方法用于关闭通知。
  
  
  var n = new Notification("Hi!");
  
  // 手动关闭
  n.close();
  
  // 自动关闭
  n.onshow = function () { 
    setTimeout(n.close.bind(n), 5000); 
  }
  
  上面代码说明,并不能从通知的close事件,判断它是否为用户手动关闭。
drag|drop 拖放 「HTML5」 
  PS:Web开发人员一直在用jQuery完成拖放,现已原生支持 「IE9+ HTML5」
    IE4最早加入拖放功能,只能拖放文本框
  定义拖放元素和目标元素
    定义拖放元素
      在HTML中将要拖放的标签其draggable属性设置为true,即draggable="true",
      若是图片则图片需加载进来,当图片加载失败则不可拖放.
    定义目标元素
      默认的所有的元素都不能做为放置的目标元素,
      通过阻止拖放时触发事件的默认行为来达到可放置的效果,
      仅仅是光标的显示不同,DOM结构的变化还需自己设置.
      e.g.:
      var dropTarget =document.querySelector("#aoo");
      dropTarget.ondragover =function(e){
        e.preventDefault();
      }
      dropTarget.ondragenter =function(e){
        e.preventDefault();
      }
  拖放事件
    ◆在拖放元素上触发
    dragstart 开始拖动
    drag      拖放期间持续触发
    dragend   被放置后(无论放置在哪)都会触发
    ◆在放置目标元素上触发
    dragenter  被拖放元素开始进入目标元素范围时触发
    dragover   被拖放元素处于目标元素上方时触发
    dragleave  被拖放元素离开目标元素的范围时触发
    drop       被拖放元素放置到目标元素后触发
  dataTransfer 拖放事件的属性对象
    PS:IE5最早引入的对象.
      是事件对象的一个属性,故只能在拖放事件的处理程序中访问.
    ◆数据传递
      为拖放操作实现数据交换,用于从被拖放元素向目标元素传递字符串格式的数据.
      IE自定义了'text'和'URL'两种有效的数据类型,而HTML5对此扩展,允许指定MIME类型.
      为了兼容,HTML5也支持'text'和'URL',但会被映射为'text/plain'和'text/uri-list'.
      dataTransfer对象可以为每种MIME类型都保存一个值,如同时保存一段文本和一个URL.
    e.dataTransfer.setData('text',str);  设置传递数据及数据类型
      PS:拖动文本框中的文本时(选中的文字而非元素),浏览器自动调用setData()方法,
        将拖动的文本以"text"格式保存在dataTransfer对象中.
        在拖放链接或图像时,浏览器自动调用setData()方法保存URL,
        这些元素被拖放到放置目标时,就可以通过getData()读到这些数据了.
        也可以自定义保存的信息.
      str 字符串,表示保存的数据类型,取值为'text'或'URL'
    e.dataTransfer.getData('text'); 通过数据类型获取由setData方法保存的值
      PS:保存在dataTransfer对象中的数据只能在 drop 事件处理程序中读取.
      e.g.:
      设置和接收文本数据
      e.dataTransfer.setData('text','some text');
      var text =e.dataTransfer.getData('text');
      设置和接收URL
      e.dataTransfer.setData('URL','https://www.baidu.com');
      var url =e.dataTransfer.getData('URL');
    ◆改变拖放的光标显示
    e.dataTransfer.dropEffect   操作拖放元素
      'none'    不能把拖放元素放在这,文本框外的默认值
      'move'    把拖放的元素移动到目标位置
      'copy'    把拖放的元素复制到目标位置
      'link'    放置拖放元素到目标位置并打开拖动的元素(前提是拖放元素是一个链接有URL)
    e.dataTransfer.effectAllowed 操控dropEffect属性
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
    ◆其他
    e.dataTransfer.clearData(format); 清除以特定格式保存的数据
    e.dataTransfer.setDrageImage(elem,x,y); 指定图像,在拖动时,显示在光标下方. [兼容问题]
      其中elem可以时图像也可以是其他元素,若为图像则显示图像,其他元素则显示渲染后的元素.
    e.dataTransfer.addElement(elem); 为拖动操作添加一个元素
    e.dataTransfer.types  当前保存的数据类型,如'text'
    e.dataTransfer.items  返回 DataTransferItemList 对象
    e.dataTransfer.files　存放一些拖放的本地文件,若没有拖放文件,则此列表为空
  兼容
    IE9-不支持draggable属性,但可通过mousedown事件来模拟
      e.g.:
      elem.onmousedown = function(){ if(this.dragDrop){ this.dragDrop(); } }
    firefox中,通过ondragstart中dataTransfer的setData方法来达到支持draggable属性
    firefox的drop事件默认打开被放到放置目标上的URL.为了正常拖放,要取消其drop事件的默认行为
  e.g.:
    <div id="dragElem" draggable="true">拖放元素</div>
    <div id="targetElem" >放置目标元素</div>
    #dragElem{ height:30px; width:130px; background:pink; float:left; }
    #targetElem{ float:right; height: 200px; width:200px; background:lightblue; }
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
Fullscreen 全屏操作 「HTML5」 
  PS：全屏API可以控制浏览器的全屏显示,让一个Element节点「以及子节点」占满用户的整个屏幕
    目前各大浏览器的最新版本都支持这个API「包括IE11」,但是使用的时候需要加上浏览器前缀
    放大一个节点时,Firefox和Chrome在行为上略有不同。
    Firefox自动为该节点增加一条CSS规则,将该元素放大至全屏状态,width:100%; height:100%,
    而Chrome则是将该节点放在屏幕的中央,保持原来大小,其他部分变黑。
    用户手动按下ESC键或F11键,也可以退出全屏键;
    加载新页面,或切换tab,或从浏览器转向其他应用「按下Alt-Tab」,也会导致退出全屏状态;
  elem.requestFullscreen() 使该节点全屏
    PS：在Chrome/Firefox等浏览器中直接使用直接使元素节点全屏,会被拒绝
    function requestFullscreen(element) {
      if(element.requestFullscreen) {
        element.requestFullscreen();
      } 
      else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } 
      else if(element.msRequestFullscreen){
        element.msRequestFullscreen();
      } 
      else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
      }
      else {
        alert('该浏览器不支持全屏');
      }
    }
    requestFullscreen(document.documentElement);
    requestFullscreen(document.getElementById("videoElement"));
    为了让Chrome的行为与Firefox保持一致,可以自定义一条CSS规则。
      :-webkit-full-screen #myvideo {
        width: 100%;
        height: 100%;
      }
  document.exitFullscreen()  用于取消全屏「该方法也带有浏览器前缀」
    function exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } 
      else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } 
      else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } 
      else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
    exitFullscreen();
  document.fullscreenElement 返回正处于全屏状态的Element节点,
    PS：若当前没有节点处于全屏状态,则返回null。
    var fullscreenElement = document.fullscreenElement 
    || document.mozFullScreenElement 
    || document.webkitFullscreenElement;
  document.fullscreenEnabled 表示当前文档是否可以切换到全屏状态的布尔值
    var fullscreenEnabled = document.fullscreenEnabled 
    || document.mozFullScreenEnabled 
    || document.webkitFullscreenEnabled 
    || document.msFullscreenEnabled;
  fullscreenchange  浏览器进入或离开全屏时在document上触发事件
    document.addEventListener("fullscreenchange", function( event ) {
      if (document.fullscreenElement) {
        console.log('进入全屏');
      } 
      else {
        console.log('退出全屏');
      }
    });
  fullscreenerror   浏览器无法进入全屏时触发事件,可能是技术原因,也可能是用户拒绝
  全屏状态的CSS
    全屏状态下,大多数浏览器的CSS支持:full-screen伪类,只有IE11支持:fullscreen伪类。
    使用这个伪类,可以对全屏状态设置单独的CSS属性。
    :-webkit-full-screen {
      /* properties */
    }
    :-moz-full-screen {
      /* properties */
    }

    :-ms-fullscreen {
      /* properties */
    }

    :full-screen { /*pre-spec */
      /* properties */
    }

    :fullscreen { /* spec */
      /* properties */
    }
    /* deeper elements */
    :-webkit-full-screen video {
      width: 100%;
      height: 100%;
    }
-------------------------------------------------------------------------待整理






