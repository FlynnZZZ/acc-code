BOM'Browser Object Model'浏览器对象模型: 提供与浏览器交互的方法和接口 
  PS: 访问和操作浏览器窗口[显示的页面以外的部分],
    BOM由一系列相关的对象构成,且每个对象都提供了许多方法与属性,用来访问浏览器功能
    BOM只是ECMAScript的一个扩展,没有相关标准,W3C已将BOM的主要部分纳入HTML5规范中; 
◆类 
Window,窗口 
  Extend: WindowProperties[不可直接访问]、EventTarget 
    console.log(Window.prototype.__proto__.constructor); 
    // ƒ WindowProperties() { [native code] } 
    console.log(Window.prototype.__proto__.__proto__.constructor); 
    // ƒ EventTarget() { [native code] } 
  Instance: console.log(window.constructor===Window); 
  window,表示浏览器的一个实例,BOM的核心对象 
    PS: 具有双重角色,既是通过JS访问浏览器窗口的一个接口,又是ECMAScript规定的Global对象; 
    全局作用域中声明的所有变量和函数,相当于window对象的属性和方法 [详见变量声明]  
      var aoo = 1;
      console.log(window.aoo); // 1 ,a就是window.a
      console.log(delete aoo); // false,删除失败,不是真正的window的属性 
      boo = 2; 
      console.log(window.boo);
      console.log(delete boo); // true 
      console.log(boo); // 报错不存在,已被删除  
    'frame'框架: 一个网页/窗口中可能包含多个框架,每个框架都有自己的window对象  
      PS: 若网页包含框架,则每个框架都有自己的window对象[保存在frames集合中] 
      window.frames 框架集,包含页面所有框架的window对象 
      同时也是页面的window: console.log(frames===window); // true 
      var frame = frames[idx]  通过下标获取框架的window[从0开始,从左至右,从上至下]  
      var frame = frames[name] 通过框架的'name'属性获取框架的window  
      frame.parent  框架的父框架,在没有框架的情况下,parent等于top
      frame.self    当前框架自身 
      frame.length  框架内的子框架数量 
      frame.name    框架的名称 
      window.top    最外层框架,即浏览器窗口window对象 
      window.length  当前页面中框架的数量,等价于 window.frames.length 
    窗口位置与尺寸 
      返回值类型为num,单位px 
      ◆浏览器位置
      screenLeft/screenTop  num,浏览器窗口相对桌面屏幕 「DiBs」 
        Firefox不支持 
        IE窗口内边缘距屏幕的距离;
        Chrome窗口外边缘距屏幕边缘的距离 
      screenX/screenY       num,浏览器窗口相对桌面屏幕 「DiBs」 
        Firefox全屏时值分别为 -8,-8 
        IE9+,全屏时值分别为 -8,-8 
      跨浏览器兼容方法: 
        var lftPos=(typeof screenLeft=="number")?screenLeft:screenX;
        var topPos=(typeof screenTop=="number")?screenTop:screenY;
      moveTo(x,y)    将浏览器位置移动到x,y坐标 
        PS: 不适用于框架,只能对最外层的window对象使用 
        Chrome、Firefox中默认被禁用 
      moveBy(x,y)    将浏览器位置向下移动xpx向右移动ypx 
        PS: 不适用于框架,只能对最外层的window对象使用
        Chrome、Firefox中默认被禁用 
      ◆浏览器尺寸  
      outerWidth/outerHeight num,浏览器窗口外侧宽/高 [IE9+] 
        包含浏览器的工具栏、边框、滚动条
      innerWidth/innerHeight num,浏览器显示窗口宽/高 [IE9+] 
        不包含边框和工具栏等,但包含滚动条 
      resizeTo(num1,num2) 将浏览器窗口调整为宽num1,高num2 
        PS: 不适用于框架,只能对最外层的window对象使用
        Chrome、Firefox中默认禁用的 
      resizeBy(num1,num2) 缩放差值[正数为放大,负数为缩小] 
        PS: 不适用于框架,只能对最外层的window对象使用;默认被浏览器禁用的 
    窗口其他操作 
      win = window.open([url][,target][,params][,bol])  导航或新建窗口 
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
      bol = window.closed    检测[打开的]窗口是否关闭 
        PS: 当窗口关闭后,其窗口的引用仍然还在,可通过该属性来检测是否关闭 
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
      num = window.pageXOffset 页面水平滚动距离 
      num = window.pageYOffset 页面垂直滚动距离 
      window.matchMedia(str); 返回一个MediaQueryList对象 
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
    延时调用&间时调用&动画调用API 
      JS单线程异步执行的机制 
        JS引擎只有一个线程,异步事件排队等待被执行,不会在同时执行两条命令 
        setTimeout,实际执行的时间大于等于定时器设置的值 
          被延时执行的代码会被从同步任务队列放置到异步执行队列,并开始计时
          异步队列会在同步队列所有代码执行完,JS引擎空闲后,
          在计时结束时,开始执行延时代码.
          若异步队列在执行的时被阻塞了,那么它将会被推迟到下一个可能的执行点,
          指定的时间间隔表示何时将定时器的代码添加到队列,而不是何时实际执行代码
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
        setInterval,实际执行时间尽量接近指定值[可多可少]
          依次向异步列队中添加延时调用,
          每个延时调用分别计时,不会互相影响.
          当只有第n个延时被阻塞且阻塞时间小于间隔时间,
          则n-1 到 n 的间隔时间大于指定间隔时间, n 到 n+1 小于间隔时间.
          当阻塞时间大于间隔时间,则前面的调用被抛弃且立即调用下次,
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
      id = setTimeout(foo/str,num [,arg1,arg2...]) 指定时间后回调,返回一id值  
        foo 回调函数 
        str 字符串代码,有解析功能相当于eval
          不推荐此种写法,容易出错,不易扩展,损失性能
          setTimeout("alert('abc')",2000);  // 2秒后执行代码块
        num 延时的时间,单位ms,默认为 0
        arg 可选,传入回调函数的参数 
          setTimeout(function(arg){
            console.log(arguments); // ["abc", callee: ƒ, Symbol(Symbol.iterator): ƒ] 
            console.log(arg);      // abc 
          },1000,'abc')
      clearTimeout(id) 通过返回id值解除延时调用 
        Example:
        var aoo=setTimeout(function(){ alert("abc");},2000);
        console.log(aoo);  // 50500,延时调用的id值
        clearTimeout(aoo); // 取消调用
        等价于
        clearTimeout(50500);
        但此种写法可能存在问题,因为id值可能会变,非一直为定值
      id = setInterval(foo/str,num [,arg1,arg2...]) 每隔指定时间回调,返回一id值  
        foo 回调函数 
        str 字符串代码,有解析功能相当于eval
        num 间隔时间,单位ms 
        arg 可选,传入回调函数的参数 
      clearInterval(id) 通过返回id值解除间时调用 
        Example:
        var box=setInterval(function(){ alert("abc"); },1000);
        clearInterval(box); // 取消调用
        console.log(box);   // 1518 ,虽然已取消调用 但box值仍存在
      使用'setTimeout'仿造'setInterval' 
        在开发环境下,很少使用真正的间歇调用,后一个间歇调用可能会在前一个间歇调用结束之前启动
        Example:
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
      id = requestAnimationFrame(foo) 浏览器专门为动画提供的API 
        原理同setTimeout类似; 
        通过递归调用同一方法来不断更新画面以达到动起来的效果,
        浏览器会自动优化方法的调用,如页面非激活状态下,动画会自动暂停,节省了CPU开销
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
    系统对话框: 其外观由操作系统或浏览器决定 
      显示alert、confirm、prompt对话框时代码会停止执行,关掉后再恢复执行 
      alert(str)    提示对话框  
        显示对话框的时候代码会停止执行,关掉后恢复
      confirm(str)  bol,用户确认对话框,确定返回'true',取消返回'false' 
      prompt("提示文字","默认输入文字")  str,用户输入框对话框,返回输入字符或 null   
        点击确定,返回用户输入值;点击取消,则返回 null 
      print()    打印对话框,异步显示 
      find(str)  网页字符查找,异步显示 [IE不支持] 
    base64编码&解码 
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
    ◆其他接口 
    window.Notification   浏览器通知接口[DiBs HTML5] 
      PS:用于在用户的桌面,而非网页上显示通知信息, 
        桌面电脑和手机都适用,比如通知用户收到了一封Email。
        具体的实现形式由浏览器自行部署,对于手机来说,一般显示在顶部的通知栏。
        若网页代码调用这个API,浏览器会询问用户是否接受。
        只有在用户同意的情况下,通知信息才会显示。
      浏览器兼容性检测 
        目前,Chrome和Firefox在桌面端部署了这个API,
        Firefox和Blackberry在手机端部署了这个API; 
        if (window.Notification) {
          console.log('该浏览器支持Notification接口');
        } 
        else {
          console.log('该浏览器不支持Notification接口');
        }
      Example:
        当前浏览器支持Notification对象,并当前用户准许使用该对象,
        然后调用 Notification.requestPermission 方法,向用户弹出一条通知。
        if(window.Notification && Notification.permission !== "denied") {
          Notification.requestPermission(function(status) {
            var n = new Notification('通知标题', { body: '这里是通知内容!'}); 
          });
        }
      ◆Notification对象的属性和方法
      Notification.permission  只读,用户给予的权限 
        'default' 用户还没有做出许可,因此不会弹出通知 
        'granted' 用户明确同意接收通知 
        'denied'  用户明确拒绝接收通知 
      Notification.requestPermission(foo)  获取用户授权
        foo  回调函数,参数为 status[用户授权状态] 
        Example: 若用户拒绝接收通知,用alert方法代替 
          Notification.requestPermission(function (status) {
            if (status === "granted") {
              var n = new Notification("Hi!");
            } 
            else {
              alert("Hi!");
            }
          });
      var notice = new Notification(title [,options]);  生成一条通知
        title   字符串,必须,用来指定通知的标题
        options 对象,可选,用来设定各种设置
          属性都是可读写的
          dir   文字方向,
            'auto'
            'ltr'  从左到右
            'rtl'  从右到左
          lang  使用的语种
            'en-US'
            'zh-CN'
            ...
          body  通知内容,值为字符串,用来进一步说明通知的目的
          tag   通知的ID,值为字符串 
            一组相同tag的通知,不会同时显示,只会在用户关闭前一个通知后,在原位置显示。
          icon  图表的URL,用来显示在通知上
        Example:
          var notice = new Notification('收到新邮件', {
            body: '您总共有3封未读邮件。'
          });
          notice.title // "收到新邮件"
          notice.body // "您总共有3封未读邮件。"
        notice.title  通知标题
        notice.body   通知内容
      notice.close();    关闭通知
        var n = new Notification("Hi!");
        // 手动关闭
        n.close();
        // 自动关闭
        n.onshow = function () { 
          setTimeout(n.close.bind(n), 5000); 
        }
        上面代码说明,并不能从通知的close事件,判断它是否为用户手动关闭。
      notice_event 通知对象的事件
        show  通知显示给用户时触发
        click 用户点击通知时触发
        close 用户关闭通知时触发
        error 通知出错时触发,大多数发生在通知无法正确显示时 
        Example:
          notice.onshow = function() {
            console.log('Notification shown');
          };
    window.getSelection() 返回表示选中的文字的Selection对象 
      PS:可通过连接一个空字符串 "" 或使用  toString() 方法,获取文本字符串, 
        当该对象被传递给期望字符串作为参数的函数中时,如 window.alert 或 document.write,
        对象的 toString() 方法会被自动调用,而不用手动转换.
      var selectText = window.getSelection();  
      var str1 = selectText + ''         获取选中的字符串
      var str2 = selectText.toString();  获取选中的字符串
      Example: 打印出文档中被选中的的文字 
        $(document).mouseup(function (e) {
          var txt = window.getSelection();
          if (txt.toString().length >= 1) { 
            console.log(txt);  // 返回一个对象
            console.log(txt+''); // 返回选中的文字
            console.log(txt.toString()); // 返回选中的文字
            alert(txt); // 返回选中的文字
          }
        });
    其他属性方法 
      window.onload
      window.offscreenBuffering 用于绘制新窗口内容并在完成后复制已存在的内容,控制屏幕更新
    SpeechRecognitionEvent()  
    SpeechRecognitionError()  
    SpeechRecognition()  
    SpeechGrammarList()  
    SpeechGrammar()  
    window.origin  str,如'http://tst.lcltst.com'  
    window.name   
    window.status   
    window.frameElement   
    window.external 
    window.devicePixelRatio 
    window.clientInformation 
    window.defaultstatus   
    styleMedia StyleMedia {type: "screen"}  
    onanimationend    
    onanimationiteration    
    onanimationstart    
    onsearch    
    ontransitionend    
    onwebkitanimationend    
    onwebkitanimationiteration    
    onwebkitanimationstart    
    onwebkittransitionend    
    isSecureContext   
    事件相关 
      .onerror 见:Event 
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
      onoffline    
      ononline    
      onpagehide    
      onpageshow    
      onpopstate    
      onrejectionhandled    
      onstorage    
      onunhandledrejection    
      onunload    
    stop()    
    open()    
    alert()    
    confirm()    
    prompt()    
    print()    
    requestAnimationFrame()    
    cancelAnimationFrame()    
    requestIdleCallback()    
    cancelIdleCallback()    
    captureEvents()    
    releaseEvents()    
    getComputedStyle()    
    matchMedia()    
    moveTo()    
    moveBy()    
    resizeTo()    
    resizeBy()    
    getSelection()    
    find()    
    getMatchedCSSRules()    
    webkitRequestAnimationFrame()    
    webkitCancelAnimationFrame()    
    btoa()    
    atob()    
    setTimeout()    
    clearTimeout()    
    setInterval()    
    clearInterval()    
    createImageBitmap()    
    scroll()    
    scrollTo()    
    scrollBy()    
    onappinstalled    
    onbeforeinstallprompt    
    ondevicemotion    
    ondeviceorientation    
    ondeviceorientationabsolute    
    onauxclick    
    openDatabase() { [native code] }  
Location, 
  Instance: 
    window.location,管理URL 
    PS: 修改URL都会生成一条历史记录[可前进后退], 且除hash外,页面也都会重载 
      存在 Location 构造函数,但 location 的属性/方法都存在对象中,而非其原型中 
    console.log(document.location === window.location); // true 
    location.href      读写,整个url 
      Example: 
      location.href = 'https://www.baidu.com'; // 当前网页跳转到百度
    location.protocol  协议[通常是 http: 或 https:]
    location.host      读写,主机名:端口名[省略默认的80端口]
    location.hostname  读写,主机名/服务器名
    location.port      读写,端口号[若url中不包含端口号则返回'']
    location.pathname  读写,路径名(URL中的目录和文件名)
    location.search    读写,URL的查询字符串[以问号?开头的部分,包括?] 
      Example:
      'https://www.baidu.com/?key1=val1&key2=val2'
      location.search;   // "?key1=val1&key2=val2"
    location.hash      读写URL锚点部分[#后面的部分][若无返回'']
    location.assign(url)   导航页面,并产生一条历史记录  
      location.assign('https://www.baidu.com')    // 跳转到百度主页
      对 window.location location.href 赋值则调用assign方法实现跳转  
    location.replace(url)  导航页面,不产生历史记录 
      Example: :
      location.replace('https://www.baidu.com'); // 跳转到百度
    location.reload([bol]) 重载当前页面 
      PS: 位于 reload() 之后的代码不一定会执行,取决于网络延迟或系统资源等因素,
        故推荐将其置于代码最后一行 
      bol  是否无缓存重载,默认 false
    location.ancestorOrigins  DOMStringList,
    location.origin  
    location.toString() 
    location.valueOf() 
History,历史记录对象 
  PS: 基于安全考虑,其他的window中得不到用户浏览过的URL,但可在其中进行选择;
  window.history   用户上网的记录,从窗口被打开的那一刻算起 
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
  window.navigator 
  ◆浏览器相关 
  .vendor      浏览器品牌 [IE不支持]
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
  .onLine   bol,是否联网  
  .cookieEnabled  bol,浏览器是否启用cookie 
    启用cookie返回true,否则返回false
    cookieEnabled属性说明
      通常可以在浏览器的临时文件夹中保存一个文件,
      此文件可以包含用户信息(比如浏览过什么页面,是否选择了自动登录)等,
      这个文件被称作cookie,
      通过cookieEnabled属性可以判断浏览器是否启用了此功能
  .javaEnabled()  bol,浏览器是否启用Java 
  ◆系统相关
  .platform  所在系统平台,如 "Win32"
  客户端检测 
    JavaScript高级程序设计 228 页 
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
  不常用  
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
    .preference()  设置用户的首选项 [Chrome不支持]
    .registerContentHandler() 针对特定的MIME类型将一个站点注册为处理程序 [Chrome不支持]
    .registerProtocolHandler() 针对特定的协议将一个站点注册为处理程序 [Chrome不支持] 
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
    .opsProfile     已废弃    
    .securityPolicy 已废弃  
    .taintEnabled() 已废弃 
Screen,用户屏幕相关 
  PS: 基本上只用来表明客户端的能力,每个浏览器中的screen对象包含的属性不尽相同;
  window.screen 
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
URL,用于对二进制数据生成URL,生成指向File对象或Blob对象的URL  [IE10+]
  URL.createObjectURL(blob)  str,创建url对象实例,将二进制数据生成一个URL 
    同样的二进制数据, 每调用一次该方法,就会得到一个不同的URL,
    这个URL的存在时间,等同于网页的存在时间,一旦网页刷新或卸载,该URL将失效 
    除此之外,也可以手动调用 URL.revokeObjectURL 方法,使URL失效。
    类似于 "blob:http%3A//test.com/666e6730-f45c-47c1-8012-ccc706f17191"
    这个URL可以放置于任何通常可以放置URL的地方,比如img标签的src属性
  URL.revokeObjectURL(url)   使生成的URL失效 
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
  CSS.supports()  检测浏览器是否支持CSS的某些功能  
    bol = CSS.supports(propertyName, value);
    bol = CSS.supports(supportCondition);
    Example:
    console.log(CSS.supports("display", "flex")); // true 
  CSS.escape()    
URLSearchParams,处理URL中的查询字符串 [IE不支持] 
  var params = new URLSearchParams('key1=val1&key2=val2');
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
  .contains()    
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
基本无原型方法/属性的类 
  Window 
    .TEMPORARY  0 
    .PERSISTENT 1 
  Location 
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
待整理 
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
  Notification
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
  IDBTransaction
  IDBRequest
  IDBOpenDBRequest
  IDBObjectStore
  IDBKeyRange
  IDBIndex
  IDBFactory
  IDBDatabase
  IDBCursorWithValue
  IDBCursor
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
  ApplicationCache 
  AnimationEvent
  SpeechSynthesis
  SharedArrayBuffer 
  Atomics 
  WebAssembly 
◆对象 
console,用于调试的控制台对象  
  PS: 由IE的JScript引擎提供的调试工具,后来逐渐成为浏览器的事实标准 
    NodeJS沿用了这个标准,提供与习惯行为一致的console对象,
    用于向标准输出流(stdout)或标准错误流(stderr)输出字符.
  Member: 
    .log([val1][, ...])   向标准输出流打印字符并以换行符结束
      PS: 该方法接收若干个参数,若只有一个参数,则输出这个参数的字符串形式.
        若有多个参数,则以类似于C语言 printf() 命令的格式输出
      格式占位符
        PS:log方法将占位符替换以后的内容,显示在console窗口
        %s     字符串
        %d     整数
        %i     整数
        %f     浮点数
        %o     对象的链接
        %c     CSS格式字符串
          对输出的内容进行CSS渲染
          console.log('%c this text is styled!','color:red;font-size:24px;');
          输出的内容将显示为红色的24px的字体
        Example:
          console.log(" %s + %s = %s", 1, 1, 2);  //  1 + 1 = 2
          上面代码的 %s 表示字符串的占位符

          两种参数格式,可以结合在一起使用.
          console.log(" %s + %s ", 1, 1, "= 2")
          // 1 + 1  = 2
    .info([val][, ...])   返回信息性消息 
      这个命令与 console.log 差别并不大,
      除了在chrome中只会输出文字外,其余的会显示一个蓝色的惊叹号.
    .error([val1][, ...]) 输出错误消息 
      控制台在出现错误时会显示是红色的叉子.
    .warn([val1][, ...])  输出警告消息 
      控制台出现有黄色的惊叹号 
    .dir(obj[, options])  用来对一个对象进行检查[inspect],并以易于阅读和打印的格式显示 
      可读性较好,一般用于输出显示DOM节点
      Node中可指定以高亮形式输出
        console.dir(obj,{color:true})
    .trace(message[,...]) 当前执行的代码在堆栈中的调用路径 
      这个测试函数运行很有帮助,只要给想测试的函数里面加入 console.trace 就行了.
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
    .dirxml()             主要用于以目录树形式显示DOM节点
      若参数不是DOM节点,则等同于dir
    .table()              对于某些复合类型的数据将其转为表格显示
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
    .count([val])         用于计数,输出被调用的次数 
      接收一个参数作为标签,进行相应的次数统计
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
    .clear()         清空控制台,光标回到第一行
    ◆用于记录time和timeEnd间经历的时间,可计算一个操作所花费的准确时间 
    .time()         计时开始
    .timeEnd(val)   计时结束
      val 为计时器的名称
      Example:
        console.time();
        var array = new Array(1000000);
        for(var i = array.length - 1; i >= 0; i--) {
          array[i] = new Object();
        };
        console.timeEnd("aoo"); 
        // aoo: 242ms
      调用timeEnd方法之后,console窗口会显示'计时器名称: 所耗费的时间'.
    ◆性能测试
    .profile()     
    .profileEnd()   
    ◆分组显示
    .group(val)   '组'的开始
    .groupEnd()   '组'的结束 
      str  作为'组'的名称
      在group和groupEnd之间打印的信息可作为一个'组'进行展开或折叠,在输出大量信息时有用
    ◆其他 
    .debug(val)     Chrome不支持 
  Expand: 
    修改/定义console方法 
      因为console对象的所有方法,都可以被覆盖
      
      使用自定义的console.log方法,在显示结果添加当前时间
      ["log", "info", "error"].forEach(function(method) {
        console[method] = console[method].bind(console,new Date().toISOString());
      });
      console.log("出错了！");
      // 2014-05-18T09:00.000Z 出错了！
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
◆技术综合  
'Same-Origin Policy'同源政策 
  PS: 浏览器安全的基石,于1995年Netscape引入,目前所有浏览器都实行该政策;
    '同源'指的是: '协议'、'域名'、'端口'均相同 
    目的: 为保证用户信息的安全,防止恶意的网站窃取数据;
    提交表单不受同源政策的限制;
    script标签里的src属性里的路径不受同源策略的限制
  限制 
    脚本运行时会进行同源检查,只有同源的脚本才能被执行
    同源政策规定,AJAX请求只能发给同源的网址,否则就报错 
    目前,若非同源,有三种行为受到限制:
    1、Cookie、LocalStorage 和 IndexedDB 无法读取 
    2、DOM 无法获得 
    3、AJAX 请求不能发送 
    虽然这些限制是必要的,但是有时很不方便,合理的用途也受到影响。
  服务器代理跨域 : 从服务器后端访问其他域进行中间代理
AJAX'Asynchronous JavaScript and XML'浏览器提供的使用HTTP协议收发数据的接口 
  PS: 'file://'协议无法使用AJAX,只有'http'和'https'协议才可以使用AJAX; 
    提供了与服务器异步通信的能力; W3C在2006年发布了AJAX的国际标准 
    使用JS来操作'XMLHttpRequest'对象接口和服务器进行异步通信 
  使用步骤: 
    建立连接[设置请求行]-设置请求头-设定响应事件-发送请求体 
  AJAX缺点 
    不支持使用后退功能,对搜索引擎的支持比较弱
    ◆Level1 的限制
    受浏览器'同源策略'限制,只能请求同域资源[否则请求被拒绝,而未发出];
    仅支持文本数据传输,无法读取和上传二进制文件数据;
    传输数据时,没有进度信息提示, 只能提示是否完成;
    没有超时机制,不方便掌控ajax请求节奏;
XMLHttpRequest,AJAX实现的核心 
  PS: IE5最先引入该对象,通过MSXML库中的一个ActiveX对象实现 
    请求发送到服务器端,在收到响应后,响应的数据会自动填充xhr对象的属性,
    即调用xhr的属性可以得到响应的信息;
    XMLHttpRequest2级规范IE10+支持,level2兼容level1 
  Extend: XMLHttpRequestEventTarget 
    console.log(XMLHttpRequest.prototype.__proto__.constructor===XMLHttpRequestEventTarget);
  Instance:
    xhr = new XMLHttpRequest()  创建xhr对象 
  Proto: 
    .open(method,url[,bol])  // 建立请求,以备后续数据发送 
      PS: 若对使用过open()方法的请求,再次使用该方法,等同于调用.abort() 
      method  发送请求的类型,如GET、POST等 
      url     请求的地址 
        可使用相对地址或绝对地址 
        查询了字符串需 encodeURIComponent() 进行编码 
      bol     可选,是否异步,默认:true 
      userName    str,可选,用户名,默认空字符串
      passWord    str,可选,密码,默认空字符串
    .setRequestHeader(key,val) // 设定请求头 
      PS: 'open'后'send'前使用; 
        若多次设置同一字段,则最终发送每次设置值的合并值  
      'Content-Type'   发送的数据格式,编码类型  
        PS: 请求头中Content-Type决定POST发送数据的编码类型[GET没有请求体],
          不同的值对应不同的提交和回调处理方式;
          有常见的五种'Content-Type'发送数据的方式; 
        'text/plain' 默认值 
          若未设定且数据不是 FormData 和 XML Document,则默认为'text/plain';
        'application/json' JSON格式的数据
          使用该MIME类型时,需要将数据对象转换成JSON串,
          再设定请求头部的Content-Type,就可以发数据了
          xhr.setRequestHeader('Content-Type', 'application/json');
        'application/x-www-form-urlencoded' 
          要求数据按照key1=value1&key2=value2的格式发送,
          且其中的特殊字符需要转义成%HH的形式;
        'multipart/form-data' 多用来提交文件 
          采用HTML5的FormData对象来构建提交的数据;
          不设置请求头部的Content-Type,交给浏览器来处理[设定Boundary等工作];
        'text/xml' XML格式传输 
          首先,构建XML文档对象,存入表单数据
          /* data参数为表单数据组成的对象,dataToSend为待发送给后端的数据 */
          var dataToSend = document.implementation.createDocument("", "formdata", null);
          var tempData = dataToSend.documentElement;
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              var keyElement = doc.createElement(key);
              keyElement.appendChild(doc.createTextNode(data[key]));
              tempData.appendChild(keyElement);
            }
          }
          /*
          xml文档格式示意:
          <formdata>
          <key1> value1 </key1>
          <key2> value2 </key2>
          </formdata>
          */
          发送数据[不需设置Content-Type]
          req.send(dataToSend);
      'Content-Length' 发送的数据长度
        num  
          xhr.setRequestHeader('Content-Length', JSON.stringify(data).length);
    .withCredentials  // bol,读写,是否允许跨域获取用户信息,默认:false[IE10+] 
      PS: 用户信息,比如Cookie和认证的HTTP头信息,
      为让该属性生效,服务器必须显式返回'Access-Control-Allow-Credentials'头信息 
      Access-Control-Allow-Credentials: true 
        发送Cookie,且会设置服务器指定的Cookie 
    .responseType // str,指定响应体类型 
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
      Example:
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
    .timeout     // num,超时设定,单位ms[DiBs][level2]
      PS: 指定时间内未收到响应,就会自动终止,并触发xhr的 ontimeout 事件 
        IE8+该属性属于 XDomainRequest 对象,IE10 支持该属性
        而 Chrome 和 Safari 还不支持
      0,   表示没有时间限制 
    .overrideMimeType(kw) // 重写响应体MIMEtype[IE不支持][level2] 
      PS: send前调用;Firefox最早引入,现已纳入XMLHttpRequest2级规范; 
      'text/xml'          预设为xml 
        可用responseXML
      'application/json'  预设为json 
        需先JSON解析,JSON.parse(responseText);
      ...
      Example:  
      var xhr = new XMLHttpRequest();
      xhr.open("get","URL",true);
      xhr.overrideMimeType("text/XML");
      xhr.send(null);
      强制使xhr对象将响应当作XML而非纯文本来处理
    .send([data])     // 发送请求数据 
      data 发送的数据
        类型可为obj,str,'FormData''ArrayBufferView''Blob''Document'等 
        若为空,表示HTTP请求只包含头信息,而无请求体,如GET请求 
          可写作 xhr.send(null) 或 xhr.send()
        不为空,表示除了头信息,也包含请求体,如POST请求 
      Example: 
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
    .sendAsBinary(BinaryString) // 发送二进制字符串[Chrome中移除] 
      自行实现如下 
      XMLHttpRequest.prototype.sendAsBinary = function(text){
        var data = new ArrayBuffer(text.length);
        var ui8a = new Uint8Array(data, 0);
        for (var i = 0; i < text.length; i++){ 
          ui8a[i] = (text.charCodeAt(i) & 0xff);
        }
        this.send(ui8a);
      }
      每个头信息之间使用CRLF分隔,若没有收到服务器回应,该属性返回null.
    .response     // obj/str,响应体 
      PS: 其类型可为str、ArrayBuffer、Blob、Document、JSON 
        由 responseType 属性的值决定 
        若请求没有成功或者数据不完整,该属性就会等于 null
    .responseText // str,响应体文本 
      PS:若本次请求没有成功或者数据不完整,该属性就会等于null.
        若服务器返回的数据格式是JSON,则该属性为JSON字符串.
    .responseStream  // 服务器返回的数据流
    .responseXML  // str,只读,获取XML形式的响应体或null  
      若响应体类型为'text/xml'或'application/xml',
      则获取到XML DOM文档,否则为 null 
    .responseURL  
    .status      // num,只读,响应HTTP状态码 
      200, 访问正常
      301, 永久移动
      302, 暂时移动
      304, 未修改
      307, 暂时重定向
      401, 未授权
      403, 禁止访问
      404, 未发现指定网址
      500, 服务器发生错误
      ...
    .statusText  // str,只读,响应状态的文本描述,如'OK' 
    .getResponseHeader(key)  // str,获取指定响应头信息 
      Example:
      xhr.getResponseHeader('Content-Type');
    .getAllResponseHeader()  // str,获取所有响应头信息  
    .abort()    // 终止连接 
      调用该方法后,xhr对象会停止触发事件 
      且不再允许访问任何与响应有关的对象属性
      在终止请求后,还应该对xhr对象进行解引用操作.
      若请求已经被发送,则立刻中止请求.
    .onreadystatechange  // xhr.readyState 值改变时触发事件 
      Example: 
      xhr.onreadystatechange = function(){
        if(xhr.readyState ===4 && xhr.status === 200) {
          // 
        }
      };
    .readyState  // num,只读,AJAX请求状态码 
      PS: 在通信过程中,每当发生状态变化的时候,readyState属性的值就会发生改变
      0   未初始化  还未调用 xhr.open() 
      1   启动      已调用 xhr.open(),但未发送数据 
      2   发送      浏览器接收到响应头
      3   接收      浏览器接收到响应体 
      4   完成      浏览器已接收到全部响应数据,或本次接收已失败 
      Remarks:
        xhr.onreadystatechange =function(e){}, 此时 e.target 即为 xhr
    .upload 
    .upload.onprogress = function(e){ // 上传进度事件,触发频率50ms/次[level2]  
      PS: 文件太小网络环境好的时候是直接到100%的;
        在xhr.send()后,xhr.readystate=2 前触发;
      e.lengthComputable   bol,能否获取到上传数据的大小   
      e.loaded             已上传数据的大小 
      e.total              上传数据的大小 
      Example:显示上传进度
        <progress min="0" max="100" value="0">0% complete</progress>
        function upload(blobOrFile) {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', '/server', true);
          xhr.onload = function(e) { ... };
          // Listen to the upload progress.
          var progressBar = document.querySelector('progress');
          xhr.upload.onprogress = function(e) {
            if(e.lengthComputable) {
              progressBar.value = (e.loaded / e.total) * 100;
              // Fallback for unsupported browsers.
              progressBar.textContent = progressBar.value;
            }
          };
          xhr.send(blobOrFile);
        }
        upload(new Blob(['hello world'], {type: 'text/plain'}));
    }  
    ◆待整理
    ◆其他 
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
          Example:
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
      Example:
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
    常量: 
      .UNSENT  0  
      .OPENED  1  
      .HEADERS_RECEIVED  2  
      .LOADING 3  
      .DONE    4  
  Expand: 
  Example: 
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
XMLHttpRequestEventTarget,AJAX请求相关的事件 
  Extend: EventTarget 
    console.log(XMLHttpRequestEventTarget.prototype.__proto__.constructor===EventTarget);
  Proto: 
    PS: 事件须在'send'方法调用前设定 
    .ontimeout   超时事件,当响应时间超过指定时间触发[level2]
    .onloadstart 在接收到响应数据的第一个字节时触发[level2] 
    .onprogress  下载进度事件,在接收响应期间持续触发[level2]
      PS: 下载的'progress'事件属于'xhr'对象,上传的'progress'事件属于'xhr.upload'对象
        需在open方法前添加progress事件处理程序
      Event事件对象及其属性/方法 
      e.lengthComputable bol,能否获取到下载数据的长度  
      e.position         表示已接收的字节数
      e.totalSize        表示根据Content-Length响应头部确定的预期字节数
      Example: 
        // 定义progress事件的回调函数
        xhr.onprogress = updateProgress;
        xhr.upload.onprogress = updateProgress;
        function updateProgress (event) {
          if (event.lengthComputable) {
            var percentComplete = event.loaded / event.total;
            // 若 event.lengthComputable 不为真,则 event.total 等于0.
            // event.total 需要传输的总字节
            // event.loaded 是已经传输的字节
          }
        }
    .onabort     请求被中止,如调用abort()方法 [level2]
    .onerror     请求失败[level2] 
      若发生网络错误(比如服务器无法连通),onerror事件无法获取报错信息,所以只能显示报错.
    .onload      接收到完整的响应数据时触发[level2]
      PS: 相当于jQuery中ajax的'success'
      Firefox中引入的load事件,用于代替readystatechange事件
      该事件的执行函数会接收到一个event对象,其target属性就指向xhr对象实例
    .onloadend   通信完成或触发error、abort或load事件后触发 [level2] 
      PS: 相当于jQuery AJAX的'completed'
CORS'Cross-Origin Resource Sharing'跨源资源共享[IE10+] 
  PS: W3C标准,允许浏览器跨源发出XMLHttpRequest请求; 
    'XMLHttpRequest level2'可跨域发出HTTP请求;
    使用"跨域资源共享"的前提: 需浏览器支持该功能,且服务器需同意该"跨域", 
    整个CORS通信过程,都是浏览器自动完成,不需要用户参与 
    实现CORS通信的关键是服务器,只要服务器实现了CORS接口,就可以跨源通信 
  浏览器将CORS请求分成:'simple request'简单请求和'not-so-simple request'非简单请求 
    简单请求: HEAD GET POST 的请求,且HTTP的头信息不超出以下几种字段 
      Accept
      Accept-Language
      Content-Language
      Last-Event-ID
      Content-Type: 只限于三个值
      application/x-www-form-urlencoded、multipart/form-data、text/plain
      
      对于简单请求,浏览器直接发出CORS请求,在头信息之中,增加一个Origin字段 
      服务器根据这个值,决定是否同意这次请求 
      若Origin指定的源,不在许可范围内,服务器会返回一个正常的HTTP回应。
      浏览器发现,这个回应的头信息没有包含Access-Control-Allow-Origin,就知道出错了,
      从而抛出一个错误,被XMLHttpRequest的onerror回调函数捕获。
      注意,这种错误无法通过状态码识别,因为HTTP回应的状态码有可能是200。
      若Origin指定的域名在许可范围内,服务器返回的响应,会多出几个头信息字段。
      Access-Control-Allow-Origin: http://api.bob.com
        // 表示允许请求的域,若为*,则允许所有请求 
      Access-Control-Allow-Credentials: true 
        // 表示是否允许发送Cookie
        // 另一方面,开发者必须在AJAX请求中打开withCredentials属性 
        // var xhr = new XMLHttpRequest();
        // xhr.withCredentials = true;
        // 若省略withCredentials设置,有的浏览器还是会一起发送Cookie。这时,可以显式关闭withCredentials。
        // xhr.withCredentials = false;
        // 这个值也只能设为true,若服务器不要浏览器发送Cookie,删除该字段即可。
      Access-Control-Expose-Headers: FooBar
        // CORS请求时,xhr.getResponseHeader()方法只能拿到6个基本字段:
        // Cache-Control、
        // Content-Language、
        // Content-Type、
        // Expires、
        // Last-Modified、
        // Pragma。
        // 若想拿到其他字段,就必须在Access-Control-Expose-Headers里面指定
        // 上面的例子指定,xhr.getResponseHeader('FooBar')可以返回FooBar字段的值。
    非简单请求: 凡是不同时满足上面两个条件的请求  
      'preflight'预检请求: 在正式通信之前,增加一次HTTP查询请求 
        浏览器先询问服务器,当前网页所在的域名是否在服务器的许可名单之中,
        以及可以使用哪些HTTP动词和头信息字段。
        只有得到肯定答复,浏览器才会发出正式的XMLHttpRequest请求,否则就报错。
      非简单请求,浏览器会自动发出一个预检请求,要求服务器确认可以这样请求
      预检请求的HTTP头信息
        OPTIONS /cors HTTP/1.1
        // “预检”请求用的请求方法是OPTIONS,表示这个请求是用来询问的。
        Origin: http://api.bob.com
        // 头信息里面,关键字段是Origin,表示请求来自哪个源。
        Access-Control-Request-Method: PUT
        // 用来列出浏览器的CORS请求会用到哪些HTTP方法,本例是PUT。
        Access-Control-Request-Headers: X-Custom-Header
        // 该字段是一个逗号分隔的字符串,指定浏览器CORS请求会额外发送的头信息字段,本例是X-Custom-Header。
        Host: api.alice.com
        Accept-Language: en-US
        Connection: keep-alive
        User-Agent: Mozilla/5.0...
      预检请求的回应 
        服务器收到“预检”请求以后,检查了Origin、Access-Control-Request-Method
        和Access-Control-Request-Headers字段以后,确认允许跨源请求,就可以做出回应。
        HTTP/1.1 200 OK
        Date: Mon, 01 Dec 2008 01:15:39 GMT
        Server: Apache/2.0.61 (Unix)
        Access-Control-Allow-Origin: http://api.bob.com
        // 表示可请求的源 
        // 若服务器否定了“预检”请求,会返回一个正常的HTTP回应,但是没有任何CORS相关的头信息字段。
        // 这时,浏览器就会认定,服务器不同意预检请求,因此触发一个错误,
        // 被XMLHttpRequest对象的onerror回调函数捕获。控制台会打印出如下的报错信息。
        Access-Control-Allow-Methods: GET, POST, PUT
        // 逗号分隔的一个字符串,表明服务器支持的所有跨域请求的方法。
        // 注意,返回的是所有支持的方法,而不单是浏览器请求的那个方法。这是为了避免多次“预检”请求。
        Access-Control-Allow-Headers: X-Custom-Header
        // 若浏览器请求包括Access-Control-Request-Headers字段,
        // 则Access-Control-Allow-Headers字段是必需的。
        // 它也是一个逗号分隔的字符串,表明服务器支持的所有头信息字段,不限于浏览器在“预检”中请求的字段。
        Access-Control-Allow-Credentials: true 
        // 该字段与简单请求时的含义相同。
        Access-Control-Max-Age: 1728000
        // 用来指定本次预检请求的有效期,单位为秒。
        // 该例中有效期是20天(1728000秒),即允许缓存该条回应1728000秒(即20天),
        // 在此期间,不用发出另一条预检请求。
        Content-Type: text/html; charset=utf-8
        Content-Encoding: gzip
        Content-Length: 0
        Keep-Alive: timeout=2, max=100
        Connection: Keep-Alive
        Content-Type: text/plain
      通过了预检请求后: 
        以后每次浏览器正常的CORS请求,就都跟简单请求一样,会有一个Origin头信息字段。
        服务器的回应,也都会有一个Access-Control-Allow-Origin头信息字段。
        预检请求后,浏览器的正常CORS请求: 
        PUT /cors HTTP/1.1
        Origin: http://api.bob.com 
        // Origin 字段,浏览器自动添加的 
        Host: api.alice.com
        X-Custom-Header: value
        Accept-Language: en-US
        Connection: keep-alive
        User-Agent: Mozilla/5.0...
        服务器正常的回应: 
        Access-Control-Allow-Origin: http://api.bob.com
        // Access-Control-Allow-Origin字段是每次回应都必定包含的。
        Content-Type: text/html; charset=utf-8
  与JSONP的比较
    JSONP只支持GET请求,CORS支持所有类型的HTTP请求。
    JSONP的优势在于支持老式浏览器,以及可以向不支持CORS的网站请求数据。      
  IE对CORS的实现: IE8中引入了'XDomainRequest'XDR类型,与XHR类似,但可实现跨域通信 
JSONP'JSON with Padding'填充式JSON或参数式JSON 
  PS: 可用于决解主流浏览器的跨域数据访问,只能支持GET请求 
    应用JSON的一种新方法.
    一种使用<script>标记获取JSON对象的方法.
    决解AJAX不能跨域访问的问题.
  使用方法及原理: 
    script标签可载入外域的JS文件,自己先定义一函数,然后从script中载入执行函数,
    从而达到载入JS文件后就执行操作,达到获取数据,
    从而也省去了监听script加载完成的操作.
    Example:
      <script src="http://www.aoo.com/boo?callback=foo1"></script> 
      后端通过callback获取参数值'fool1'进行动态生成代码
      自定义一全局函数并执行 fool1(arg) 
    Example:
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
  Example:
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
'Img Ping'跨域,与服务器进行简单、单向的跨域通信的一种方式 
  PS: 只能发送GET请求,无法访问服务器的响应文本,只能由从浏览器到服务器间的单向通信;
    动态的创建图像,使用load和error事件来处理响应
    请求的数据是通过查询字符串形式发送,响应可以是任意内容,请求从设置src属性时发生;
    最常用于跟踪用户点击页面或动态广告曝光次数 
  Example: :
    var img = new Image();
    img.onload = img.onerror =function(){
      console.log(1);
    }
    img.src ="https://www.baidu.com?name=abc"; // 请求中发送了一个name参数
    onload 和 onerror 事件处理程序指定为同一个函数,
    则无论什么响应,请求完成都能得到通知 
'Comet'服务器推送,一种服务器向页面推送数据的技术 
  PS: 
  长轮询 
    PS: 实现Comet的一种方式,是传统轮询[也叫短轮询]的一个翻版,
    传统轮询: 浏览器定时向服务器发送请求,看有没有更新的数据,
    长轮询: 页面发起一个到服务器的请求,然后服务器一直保持连接打开,直到有数据可发送,
      发送完数据之后,浏览器关闭连接,随即又发起一个到服务器的新请求,...一直循环
    优势:所有浏览器都支持,使用 XHR 对象和 setTimeout() 就能实现
  HTTP流 
    PS: 页面的整个生命周期内只使用一个HTTP链接,
      即浏览器向服务器发送一个请求,而服务器保持链接打开,然后周期性的向浏览器发送数据
SSE'Server-Sent Events'服务器发送事件 [HTML5] 
  SSE API 用于创建到服务器的单向连接,服务器通过这个连接可以发送任意数量的数据。
  服务器响应的MIME类型必须是text/event-stream,
  而且是浏览器中的JavaScript API 能解析格式输出。
  SSE 支持短轮询、长轮询和HTTP流,且能在断开连接时自动确定何时重新连接
EventSource,服务器发送事件  
  PS: 默认的,EventSource 对象会保持与服务器的活动连接,若连接断开,会重新连接
  Extend: EventTarget 
  Instance: new EventSource('url') 
  Proto: 
    .url 
    .withCredentials 
    .readyState    num,连接状态 
      0 正连接到服务器
      1 打开了连接
      2 关闭了连接
    .close()     强制立即断开连接并且不再重新连接 
    .onopen     在建立连接时触发 
    .onmessage  从服务器接收到新事件时触发
    .onerror    无法建立连接时触发 
    常量: 
      .CONNECTING 0 
      .OPEN 1 
      .CLOSED 2 
WebSocket,网络通信协议[HTML5][IE10+]
  PS: 目标是在一个单独的持久连接上提供全双工、双向通信, 
    诞生于2008,于2011年成为国际标准; 
    允许与一个Web服务的连接保持打开,
    只要有新数据,Web服务就可以把数据发送给客户端[且客户端代码会得到通知];
    在JS中创建Web Socket之后,会有一个HTTP请求发送来连接,
    使用Web Socket协议: 'ws://'或'wss://'
    标准的HTTP服务器无法实现Web Socket,需使用支持ws或wss协议的服务器才能正常工作;
    允许跨域通信;
    基于TCP;
    可以发送文本,也可以发送二进制数据?;
    没有同源限制,客户端可以与任意服务器通信;
  Extend: EventTarget 
    console.log(WebSocket.prototype.__proto__.constructor===EventTarget);
  Instance: var ws = new WebSocket("url");  创建WebSocket 
    PS: 实例化ws对象后,浏览器就会马上尝试创建连接
    url   绝对URL
  Proto: 
    .readyState  表示当前的连接状态值 
      0  正在建立连接
      1  已经建立连接
      2  正在关闭连接
      3  已经关闭连接
    .binaryType  指定收到的二进制数据类型 
      除了动态判断收到的数据类型,也可以使用binaryType属性指定
      // 收到的是 blob 数据
      ws.binaryType = "blob";
      ws.onmessage = function(e) {
        console.log(e.data.size);
      };
      // 收到的是 ArrayBuffer 数据
      ws.binaryType = "arraybuffer";
      ws.onmessage = function(e) {
        console.log(e.data.byteLength);
      };
    .bufferedAmount  表示还有多少字节的二进制数据没有发送出去 
      可以用来判断发送是否结束
      var data = new ArrayBuffer(10000000);
      ws.send(data);
      if (ws.bufferedAmount === 0) {
        // 发送完毕
      } 
      else {
        // 发送还没结束
      }
    .close()         关闭连接 
      调用了close()之后,readyState的值立即变为2 
    .send("message") 发送数据[任意字符]
      Web Socket只能通过连接发送纯文本数据,对于复杂的数据结构,需转换为JSON字符串再发送
    .url 
    .extensions 
    .protocol 
    ◆事件,只支持DOM1级绑定 
    .onopen = function(){ // 在成功建立连接时触发事件 
    }
    .onerror = function(){ // 在发生错误时触发,连接不能持续 
    }
    .onclose = function(e){ // 在连接关闭时触发 
      e.wasClean  表示连接是否已明确关闭的布尔值
      e.code      服务器返回的数值状态码
      e.reason    服务器发回的消息,类型为字符串
    }
    .onmessage = function(e){ // 接收响应数据时触发事件 
      e.data  str,返回的数据[字符串格式,需要手动解析] 
    } 
    ◆常量: 
      .CONNECTING 0  正在建立连接 
      .OPEN       1  已经建立连接 
      .CLOSING    2  正在关闭连接 
      .CLOSED     3  已经关闭连接 
  Expand: 
    缺点 
      Web Socket使用了自定义的协议,而制定协议的时间比制定JS API的事件还要长
      可能存在安全隐患
    兼容性检测 
      if(window.WebSocket){
        console.log('This browser supports WebSocket');
      }
      else{
        alert('browser not supports ws');
      }
    webSocket如何兼容低浏览器？
      Adobe Flash Socket 、
      ActiveX HTMLFile(IE) 、
      基于 multipart 编码发送 XHR 、
      基于长轮询的 XHR
  todo 
    除了发送字符串,也可以使用 Blob 或 ArrayBuffer 对象发送二进制数据。
    // 使用ArrayBuffer发送canvas图像数据 
    var img = canvas_context.getImageData(0, 0, 400, 320); 
    var binary = new Uint8Array(img.data.length); 
    for (var i = 0; i < img.data.length; i++) { 
      binary[i] = img.data[i]; 
    } 
    connection.send(binary.buffer);
    
    // 使用Blob发送文件 
    var file = document.querySelector(‘input[type=”file”]’).files[0]; 
    connection.send(file);
    
    如果接收的是二进制数据,需要将连接对象的格式设为blob或arraybuffer。
    connection.binaryType = 'arraybuffer';
    connection.onmessage = function(e) {
      console.log(e.data.byteLength); // ArrayBuffer对象有byteLength属性
    };
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
Cookie 服务器写入浏览器的一小段信息
  document.domain 共享Cookie
    两个网页一级域名相同,只是二级域名不同,浏览器允许通过该设置共享cookies
    Example:
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
fragment identifier 片段识别符
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
Storage,本地存储 [IE8+][HTML5] 
  Extend: Object 
    console.log(Storage.prototype.__proto__.constructor===Object); // true 
  Instance: 
    PS: JS提供了sessionStorage和globalStorage,
      在HTML5中提供了localStorage来取代globalStorage;
    console.log(localStorage.constructor===Storage);   // true 
    console.log(sessionStorage.constructor===Storage); // true 
    localStorage   本地存储 [IE8+]
      PS: 永久存储,永不失效除非手动删除
        有容量限制,每个域[包括各个网页] 5 M 左右[DiBs];
        子域名间或子域名和主域名间localStorage不共享;
        本质是在读写文件,数据多的话会比较卡,firefox会一次性将数据导入内存,
        不能被爬虫爬取,不要用它完全取代URL传参,
        各浏览器间,数据是独立的,在firefox中的localstorage数据,在chrome上无法读取.
        只能存储字符串,当存取的内容比较复杂时,使用JSON函数辅助处理
      .xx      读写,自定义属性 
        只能存字符串,对象类型需JSON化存入[SlPt]
        Example:
        localStorage.XX;   //"abc"
        localStorage;       //Storage {name: "abc", length: 1}
        
        localStorage.yy = {};
        console.log(localStorage.yy,typeof localStorage.yy);
        // [object Object] string
      Example: 保存网页状态的原理说明 
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
    localStorage 和 sessionStorage 的区别 
      sessionStorage 不在不同的浏览器窗口中共享,即使是同一个页面,
      会在同一个窗口打开的不同页面间共享.
      localStorage 在所有同源窗口中都是共享的；
      cookie 也是在所有同源窗口中都是共享的.
  Proto: 
    .length        num,项目条数 
    .key(idx)      str,获取值 
      console.log(localStorage); // Storage {aoo: "a", boo: "b", length: 2}
      localStorage.key(0); // "aoo"
    .getItem(key)     str,获取对应键的值 
    .setItem(key,val) 键值对形式存值 
    .removeItem(key)  删除条目  
    .clear()          清除所有数据 
  Question: 
    IE中localStorage中存在问题 ?
-------------------------------------------------------------------------待整理 



