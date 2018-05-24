JS代码引入、执行 
  嵌入式:html标签中插入,作为某个元素的属性值或超链接的href属性值.
    // 通过一个链接弹出一个确认框
    <a href="javascript:confirm('hello');">hello</a>
    // 点击一段文字弹出一个提示框
    <p onclick="javascript:alert('我是弹出来的内容');">点我</p>
  内部JS: <script type="text/javascript">/*JS代码*/</script>
    内部JS中不可出现"</script>"字符串
      <script> alert("</script>"); </script>
      网页上会显示出: );
      不会执行出 alert("</script>"),(可改为alert("</scr"+"ipt>"))
      浏览器执行到alert中的</script>时会以为是script的结束标签.
      外部JS则可以执行 alert("</script>")
  外部JS: <script src="JS文件路径"></script>
    放置位置:一般将script标签放在body的最后面,也可以放入head中
    外部的JS的优点:
      维护性高
      可缓存(加载一次,无需加载):若有两个页面使用同一个文件,只需下载一次.
      方便未来扩展
    script加载使用的协议
      默认采用http协议 
      <script src="example.js" charset="utf-8"></script>
      采用https
      <script src="https://example.js" charset="utf-8"></script>
      根据页面本身的协议来决定
      <script src="//example.js" charset="utf-8"></script>
    Remarks:
      外部JS文件带有.js扩展名,但这个扩展名是非必须的,浏览器不会检查JS文件的扩展名.
      若不使用.js扩展名,需确保服务器能返回正确的MIME类型
  异步加载JS的方式
    一:<script>标签的 async="async"属性.
      HTML5 中新增的属性,Chrome、FF、IE9&IE9+均支持
      脚本相对于页面的其余部分异步地执行(当页面继续进行解析的同时,脚本将被执行)
      async 属性仅适用于外部脚本(只有在使用 src 属性时)
      该方法不能保证脚本按顺序执行(当有多个该属性的script时)
    二:<script>标签的 defer="defer"属性.
      规定脚本执行延迟,直到页面加载完毕,再执行
      兼容所有浏览器.此外,这种方法可以确保所有设置 defer 属性的脚本按顺序执行.
    三:AJAX eval
      使用 AJAX 得到脚本内容,然后通过 eval_r(xmlhttp.responseText)来运行脚本
      兼容所有浏览器.
    四:iframe 方式
      可以参照:iframe 异步加载技术及性能中关于 Meboo 的部分
      兼容所有浏览器.
    五: 在JS文件中创建script元素对象,按照要求添加到DOM中
      如创建script对象 然后在添加src地址;
      动态加入的JS需在CSS文件加载完后才会去下载
      动态生成的script不会阻塞页面渲染,但无法保证JS的执行顺序,
      先加载完的JS先执行,将其async属性设置为false 保证执行顺序
      ['a.js','b.js'].forEach(function(scr){
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.append(script);
      })
  Todo: 
    JavaScript代码嵌入网页的方法
      JavaScript代码只有嵌入网页,才能在用户浏览器网页时运行。

      网页中嵌入JavaScript代码,主要有四种方法。

      <script>标签:代码嵌入网页
      <script>标签:加载外部脚本
      事件属性:代码写入HTML元素的事件处理属性,比如onclick或者onmouseover
      URL协议:URL支持以javascript:协议的方式,执行JavaScript代码
      后两种方法用得很少,常用的是前两种方法。由于内容(HTML代码)和行为代码(JavaScript)应该分离,所以第一种方法应当谨慎使用。

      script标签:代码嵌入网页
      通过<script>标签,可以直接将JavaScript代码嵌入网页。

      <script>
        console.log('Hello World');
      </script>
      <script>标签有一个type属性,用来指定脚本类型。对JavaScript脚本来说,type属性可以设为两种值。

      text/javascript:这是默认值,也是历史上一贯设定的值。若你省略type属性,默认就是这个值。对于老式浏览器,设为这个值比较好。
      application/javascript:对于较新的浏览器,建议设为这个值。
      <script type="application/javascript">
        console.log('Hello World');
      </script>
      由于<script>标签默认就是JavaScript代码。所以,嵌入JavaScript脚本时,type属性也可以省略。

      若type属性的值,浏览器不认识,那么它不会执行其中的代码。利用这一点,可以在<script>标签之中嵌入任意的文本内容,然后加上一个浏览器不认识的type属性即可。

      <script id="mydata" type="x-custom-data">
        console.log('Hello World');
      </script>
      上面的代码,浏览器不会执行,也不会显示它的内容,因为不认识它的type属性。但是,这个<script>节点依然存在于DOM之中,可以使用<script>节点的text属性读出它的内容。

      document.getElementById('mydata').text
      // "
      //   console.log('Hello World');
      // "
      script标签:加载外部脚本
      <script>标签也可以指定加载外部的脚本文件。

      <script src="example.js"></script>
      若脚本文件使用了非英语字符,还应该注明编码。

      <script charset="utf-8" src="example.js"></script>
      所加载的脚本必须是纯的 JavaScript 代码,不能有HTML代码和<script>标签。

      加载外部脚本和直接添加代码块,这两种方法不能混用。下面代码的console.log语句直接被忽略。

      <script charset="utf-8" src="example.js">
        console.log('Hello World!');
      </script>
      为了防止攻击者篡改外部脚本,script标签允许设置一个integrity属性,写入该外部脚本的Hash签名,用来验证脚本的一致性。

      <script src="/assets/application.js"
        integrity="sha256-TvVUHzSfftWg1rcfL6TIJ0XKEGrgLyEq6lEpcmrG9qs=">
      </script>
      上面代码中,script标签有一个integrity属性,指定了外部脚本/assets/application.js的SHA265签名。一旦有人改了这个脚本,导致SHA265签名不匹配,浏览器就会拒绝加载。

      事件属性
      某些HTML元素的事件属性(比如onclick和onmouseover),可以写入JavaScript代码。当指定事件发生时,就会调用这些代码。

      <div onclick="alert('Hello')"></div>
      上面的事件属性代码只有一个语句。若有多个语句,用分号分隔即可。

      URL协议
      URL支持javascript:协议,调用这个URL时,就会执行JavaScript代码。

      <a href="javascript:alert('Hello')"></a>
      浏览器的地址栏也可以执行javascipt:协议。将javascript:alert('Hello')放入地址栏,按回车键,就会跳出提示框。

      若JavaScript代码返回一个字符串,浏览器就会新建一个文档,展示这个字符串的内容,原有文档的内容都会消失。

      <a href="javascript:new Date().toLocaleTimeString();">
        What time is it?
      </a>
      上面代码中,用户点击链接以后,会打开一个新文档,里面有当前时间。

      若返回的不是字符串,那么浏览器不会新建文档,也不会跳转。

      <a href="javascript:console.log(new Date().toLocaleTimeString())">
      What time is it?
      </a>
      上面代码中,用户点击链接后,网页不会跳转,只会在控制台显示当前时间。

      javascript:协议的常见用途是书签脚本Bookmarklet。由于浏览器的书签保存的是一个网址,所以javascript:网址也可以保存在里面,用户选择这个书签的时候,就会在当前页面执行这个脚本。为了防止书签替换掉当前文档,可以在脚本最后返回void 0。
    脚本的动态加载
      除了静态的script标签,还可以动态生成script标签,然后加入页面,从而实现脚本的动态加载。
      
      ['a.js', 'b.js'].forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
      });
      这种方法的好处是,动态生成的script标签不会阻塞页面渲染,也就不会造成浏览器假死。但是问题在于,这种方法无法保证脚本的执行顺序,哪个脚本文件先下载完成,就先执行哪个。
      
      若想避免这个问题,可以设置async属性为false。
      
      ['a.js', 'b.js'].forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
      });
      上面的代码依然不会阻塞页面渲染,而且可以保证b.js在a.js后面执行。不过需要注意的是,在这段代码后面加载的脚本文件,会因此都等待b.js执行完成后再执行。
      
      我们可以把上面的写法,封装成一个函数。
      
      (function() {
        var scripts = document.getElementsByTagName('script')[0];
        function load(url) {
          var script = document.createElement('script');
          script.async = true;
          script.src = url;
          scripts.parentNode.insertBefore(script, scripts);
        }
        load('//apis.google.com/js/plusone.js');
        load('//platform.twitter.com/widgets.js');
        load('//s.thirdpartywidget.com/widget.js');
      }());
      上面代码中,async属性设为true,是因为加载的脚本没有互相依赖关系。而且,这样就不会造成堵塞。
      
      若想为动态加载的脚本指定回调函数,可以使用下面的写法。
      
      function loadScript(src, done) {
        var js = document.createElement('script');
        js.src = src;
        js.onload = function() {
          done();
        };
        js.onerror = function() {
          done(new Error('Failed to load script ' + src));
        };
        document.head.appendChild(js);
      }
      此外,动态嵌入还有一个地方需要注意。动态嵌入必须等待CSS文件加载完成后,才会去下载外部脚本文件。静态加载就不存在这个问题,script标签指定的外部脚本文件,都是与CSS文件同时并发下载的。
      
      加载使用的协议
      若不指定协议,浏览器默认采用HTTP协议下载。
      
      <script src="example.js"></script>
      上面的example.js默认就是采用HTTP协议下载,若要采用HTTPS协议下载,必需写明(假定服务器支持)。
      
      <script src="https://example.js"></script>
      但是有时我们会希望,根据页面本身的协议来决定加载协议,这时可以采用下面的写法。
      
      <script src="//example.js"></script>    
    方法一: window.onload = function(){ }
    方法二: 将script标签放在body的结尾处
  Remarks: 
    原则上,将其放在html头部,但视情况可以将其放在网页的任何部分.
    一个html文件可以有几个<script>...</script>,且可以共享方法和变量.
BFCache'back-forward cache',往返缓存 
  Firefox和Opera独有特性,可在用户使用浏览器的'后退'和'前进'按钮时加快页面的转换速度。
  该缓存中不仅保存着页面数据,还保存了DOM和JS的状态；
  实际上是将整个页面都保存在了内存里。
  若页面位于bfcache中,那么再次打开该页面就不会触发load事件。
--------------------------------------------------------------------------------
技巧 实现 
  spa 页面通信及状态维持
    不同页面间通过 sessionStorage 或 localStorage 实现消息传递
    同一页面内 刷新保持状态 分享链接可获取状态
      如上 情景 前提都是URL未变化同样要保持当前状态,故通过添加自定义的hash决解,
      通过hash来添加、解析状态,从而到达要求的效果
Question & Idea
webview
-------------------------------------------------------------------- 以下待整理 
JS代码执行后将其删除仍不影响功能,因为JS代码已经解析到了内存中[SelfThink]
