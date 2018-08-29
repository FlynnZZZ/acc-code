originJS[SlSt] 
  功能: 轻量、简洁、功能--多模块化自由组合、待续... 
  简写符号: 
    pa   parents
    pu   public
    el   elements
    me   method
    da   data
    op   operation
    ms   message
  思想 
    通过JS管控HTML元素 
      var o1 = new Org( {
        el : '#app',
        da : {
          
        },
        me : {
          
        },
        ms : {
          o2 : {data:value},
        },
        op   : {
          '#app-btn1' : me.foo1,
          '#app-btn1' : {
            'click' : me.foo1
          },
          '#app-btn1' : [
            { 'click' : me.foo1 },
            { 'hover,mouseout' : me.foo2 },
            { 'hover' : {  
              is  : me.foo2 ,
              aoo : foo 
            }  
            },
          ],
          '#app-btn2' : function(data){
            console.log(data);
            me.foo2(data)
          },
        }
      } )
    组件化的实现 
      将 HTML、CSS、JS 代码,统一放置在一 xx.html 文件中,作为一个'组件'
      通过ajax方式获取'组件'并插入到'对象HTML'中
      在'对象HTML'中,通过标签 <cpt-xxx></cpt-xxx> 的方式来确定'组件'的插入位置 
        内部实现, $('cpt-xxx').after(data).remove();
    组件间通信 
      通过自定义事件的方式来实现 
      Jelem.trigger("eName" [,arr]);     触发事件及传递数据 
      Jelem.on(str,function(e,arg1,arg2,..){ }) 监听事件及接收数据 
      将事件的监听触发绑定在需互相传递数据组件的共同父元素上,
      事件需先监听后触发才能保证无信息遗漏,
      因为根据组件的加载,他们的共同父元素在他们加载之前是存在的,不会导致无法获取到DOM的情况, 
      一般可将事件绑定到'body'元素上,
      假设 A B 组件 ,其加载的时间不同,若 A 先加载,B 后加载,
        A 在 B 加载后发送消息 
        ...
      
      封装监听触发,实现相互通信 
        原理:
          触发一个事件'e'时,同时监听[一次性]事件'_e_',
          响应一个事件'e'时,同时触发事件'_e_';
          注意:请始终保持先监听再触发的顺序 
          $.fn.extend({
            io : function(ename,foo){
              var that = this;
              this.on(ename,function(e,data){
                var outData = foo(e,data);
                // console.log(data,'收到的数据');
                var event = '__'+ename+'__';
                var arr = [];
                arr.push(outData);
                that.trigger(event,arr);
              });
            },
            oi : function(ename,outData,foo){
              var that = this;
              var event = '__'+ename+'__';
              this.one(event,function(e,data){
                foo(e,data);
                // console.log(data,'触发后回来的数据');
              })
              var arr = [];
              arr.push(outData);
              that.trigger(ename,arr);
            },
          });
          
          // agreed 为双方约定的通信名称 
          var elem = $('.aoo');
          
          // 监听事件['agreed'],然后发送 数据
          elem.io('agreed',function(e,data){
            // console.log(data,'接收到的信息');
            if (data == 1) {
              return 10;
            }
            else if (data == 2) {
              return 20
            }
            else {
              return 'no suitable data'
            }
          });
          // 发送 请求数据 后,等待回应
          elem.oi('agreed','1',function(e,data){
            console.log(data,'等待的回应');
          });
        效果:利用发送信息的方式来获取信息 
          可自定义规则,向未来元素发送信息 
            预定义发送数据,等待未来元素的触发 
            
      出现的'时间前''时间后' + 信息的'发送者''接受者' 
      
      1. 广播模式 
        PS:信息发送者主动 
          将信息同时放置于body的data中和通过事件来发送 
          接收时通过两个渠道来获取,从而保证获取到数据不受组件的加载的先后顺序影响 
        function put (ename,data,elem){ 
          var el = elem || $('body');
          el.data(ename,data);
          el.trigger(ename,[data]);
        }
        function get (ename,foo,elem){ 
          var el = elem || $('body');
          var data1 = el.data(ename);
          if (data1) { // 当接受者为后出现时 
            foo(data1);
          }
          else { // 当接受者为先出现时 
            el.on(ename,function(e,data2){ 
              foo(data2) 
            })
          }
          if (!$._data(el[0],'events')[ename]) { // 如果事件不存在则绑定 
            el.on(ename,function(e,data2){ 
              foo(data2) 
            })
          }
        }
        // ename  不可使用大小写、不可使用'_'连接,最好全部为小写字母 
        // 使用
        var foo = function(data){ 
          console.log(data);
        }
        put('test',{'a','11111'});
        get('test',function(data){ 
          console.log(data);
        })
      2. 请求模式 
        信息接受者主动
        prev to next 
        next to prev 
        接受者不断的发送请求,接收到响应后停止
        请求的参数为信息发出者预先定义好的参数 
    将公用资源初次加载存放到客户端,之后在缓存中去取 
      如公用的库 jQuery,Vue,自定义的工具 等等 
      1. 使用 localStorage 存储 
      2. 
---------------------------------------------------------------------以下待整理 


Modernizr,检测浏览器的支持情况 
  引入 
    通过script标签引入库文件 
    下载页地址:'https://modernizr.com/download/?setclasses'
    可自定义配置来进行下载所需要的部分 
  HTML的类标记的检测方式  
    Modernizr会自动检测将是否支持的CSS样式以类的形式反馈到HTML标签上 
    no-xxx 表示不支持xxx属性,通过给 .no-xxx 指定属性来替换不支持该属性的情况 
    在HTML中加上'class="no-js"',当引入Modernizr后,
    将变成<HTML class="js ...">[表示浏览器支持JS] 表示Modernizr运行了 
    Example: 
      <HTML class="js no-boxshadow borderimage ...."> 
      支持 border-image 属性,而不支持 box-shadow 属性 
    CSS属性及对应Modernizr类标记枚举[部分] 
      '@font-face'                            fontface
      'text-shadow'                           textshadow
      'background-size'                       backgroundsize
      'border-image'                          borderimage
      'border-radius'                         borderradius
      'box-shadow'                            boxshadow
      'opacity'                               opacity
      'reflection'                            cssreflections
      '::before'and'::after' pseudo-elements  generatedcontent
      gradients                               cssgradients
      hsla()                                  hsla
      rgba()                                  rgba
      flexible box layout                     flexbox
      multi-column layout                     csscolumns
      multiple backgrounds                    multiplebgs
      CSS animations                          cssanimations
      CSS transitions                         csstransitions
      CSS 2D transformations                  csstransforms
      CSS 3D transformations                  csstransforms3d
  全局Modernizr对象 : JS的检测方式 
    返回值为字符串,表明着浏览器能够处理特定类型的置信水平 
    空''表示不支持,'maybe'或'probably'则支持 
    ◆检测支持JS的API 
    Modernizr.localstorage  
    Modernizr.geolocation   
    Modernizr.touch         
    ★HTML5新增标签及功能
    Modernizr.canvas        
    Modernizr.inputtypes.search  是否支持新的search input类型 
    ★HTML5标签新增属性判断 
    Modernizr.input.autofocus 
    Modernizr.input.required 
    ◆检测CSS属性 
    Modernizr.borderradius 
    Modernizr.csstransforms 
    ◆更详细的信息 
    Modernizr.video.h264     是否支持这个特殊的编解码器 
  Modernizr.load()加载器 : 根据JS检测的结果加载不同的脚本 
    Modernizr.load({
      test : Modernizr.xx,
      yep  : 'xx.js',      // 可选 
      nope : 'xx.js',      // 可选 
      complete : foo       // 可选 
    })
    test：测试浏览器是否支持某个属性 
    yep：若浏览器支持该属性,加载的脚本 
    nope：若浏览器不支持该属性,加载的脚本 
    complete：加载完成后,运行的JS代码 
--------------------------------------------------------------------------------
Bootstrap : 快速开发Web应用程序和网站的前端框架 
  介绍_概念_说明_定义 
    PS:Bootstrap 来自 Twitter, 2011 年八月在 GitHub 上发布的开源产品
      简洁灵活的用于搭建Web页面的基于 HTML、CSS、JAVASCRIPT 的工具集 (HTML5 CSS3)
      Bootstrap 的响应式 CSS 能够自适应于台式机、平板电脑和手机
      一套丰富的预定义样式表
    Bootstrap2和Bootstrap3的区别
      Bootstrap2兼容性更好
      Bootstrap3放弃了IE7,IE8支持性也不是很好,功能更多
    使用要求
      Bootstrap 中使用了一些HTML5元素和CSS属性,所以需要一些其他条件来支持HTML5,如使用HTML5的声明
      在head中添加 viewport meta 标签
        为让Bootstrap开发的网站对移动设备友好,确保适当的绘制和触屏缩放
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      引入 jQuery、Bootstrap CSS、Bootstrap JS 
        PS:Bootstrap中的JS插件依赖于jQuery,因此jQuery需在Bootstrap前引入
        Example: 
          <link href="css/bootstrap.min.css" rel="stylesheet">
          <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
  CSS 
    核心思想:通过给HTML标签引入 Bootstrap 定义的class属性,来控制标签的样式.
    移动设备优先
      之前 Bootstrap 版本(直到 2.x),您需要手动引用另一个 CSS,才能让整个项目友好的支持移动设备。
      Bootstrap 3 默认的 CSS 本身就对移动设备友好支持
      Bootstrap 3 的设计目标是移动设备优先,然后才是桌面设备。
    网格系统(Grid System)
      使用说明:
        网格系统是通过指定您想要横跨的十二个可用的列来创建的。
          例如,要创建三个相等的列,可使用三个 .col-xs-4。(若和小于等于12 则在一行显示,否则换行)
        网格的基本结构
          <div class="container">       // 网格 块 
            // 行必须放置在 class="container" 内,以便获得适当的对齐(alignment)和内边距(padding)。
            <div class="row">           // 网格 行 
              <div class="col-*-*">     // 网格 单元 
                <div class="row">                  // 网格嵌套 行
                  <div class="col-*-*">...</div>   // 网格嵌套 单元
                </div>
              </div> 
              <div class="col-*-*">...</div>
            </div>
            <div class="row">
              ...
            </div>
          </div>
          <div class="container">
            ....
          </div>
        原理: 网格单元采用的是左浮动的排列原理
      容器 container
        .container       只在最小屏才占满屏幕宽
        .container-fluid 始终占满屏宽
      列宽度 col-*-*
        在表示 网格单元的标签中添加class
        超小屏(<768px)  .col-xs-
        小屏  (≥768px)  .col-sm-
        中屏  (≥992px)  .col-md-
        大屏  (≥1200px) .col-lg-
        在中型设备中,Bootstrap 会查找带有 md 的类,并使用它们。
        在大型设备中,会查找带有 lg 的类,并使用它们。
        小屏会兼容大屏(保持比例)(当只定义了小屏时)
        可以同时添加不同屏的列宽,可在不同尺寸时获取不同的宽度比例
      列偏移 col-*-offset-*
        大屏幕显示器上使用偏移 .col-md-offset-* 类,
        则该列列的左外边距(margin)增加 * 列,其中 * 范围是从 1 到 11。
        在 网格单元 标签中添加该属性class
      列嵌套
        在需要嵌套的 网格单元 中,添加 网格行,然后再在 网格行 中添加 网格单元.
      列排序 col-*-push-* / col-*-pull-*
        改变带有 .col-md-push-* 和 .col-md-pull-* 类的内置网格列的顺序,其中 * 范围是从 1 到 11
        在 网格单元 上添加上此类,push 相当于右移,数字表示移动的列数;pull相当于左移.
      清楚浮动 clearfix visible-*
        在需要清除浮动的单元后添加 <div class="clearfix visible-*"></div>
    全局样式
      body{
        font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;
        font-size:14px;
        line-height: 1.42857143;
        color:#333;
        background-color:#fff;
      }
      使用了 normalize.css 第三方库,将不同浏览器的默认样式效果统一
      .visible-*  在某种宽度下显示(其他不显示)
      .hidden-*   在某种宽度下显示(其他不隐藏)
      .show       显示
      .hidden     显示
    文本样式
      标题
        h1-h5 标签和class
          Bootstrap都进行了样式设置;也可以使用 class h1-h5 达到和 h标签类似的效果 (有细微差别)
        small 内联子标题标签和class
          即在标题内再添加标题.使用 <small></small>标签 或 .small class
      引导主体副本 更大更粗、行高更高的文本 class="lead" 强调
      <p class="text-left">向左对齐文本</p>
      <p class="text-center">居中对齐文本</p>
      <p class="text-right">向右对齐文本</p>
      <p class="text-muted">本行内容是减弱的</p>
      <p class="text-primary">本行内容带有一个 primary class</p>
      <p class="text-success">本行内容带有一个 success class</p>
      <p class="text-info">本行内容带有一个 info class</p>
      <p class="text-warning">本行内容带有一个 warning class</p>
      <p class="text-danger">本行内容带有一个 danger class</p>
      // 文字颜色
      .text-muted    柔和灰
      .text-primary  主要蓝
      .text-info     信息蓝
      .text-success  成功绿
      .text-warning  警告黄
      .text-danger   危险红
      // 背景颜色
      .bg-primary  主要蓝
      .bg-info     信息蓝
      .bg-success  成功绿
      .bg-warning  警告黄
      .bg-danger   危险红
    列表 
      ul 或 ol 标签中定义
        .list-unstyled 移除指示样式
        .list-inline 把所有的列表项放在同一行中。
      dl 标签中定义
        .dl-horizontal 将dt和dd放置在一行展示
    代码
      <code> 内联显示代码
      <pre>  代码显示为一个独立的块元素或者代码有多行
      <kbd>  显示为黑底白字
      <var>  用于显示变量,显示为斜体
      <samp> 程序结果显示
    表格
      <table>  .table 为表格添加基础样式(必须),自适应,占满container,两行之间有一条分割线
        .table-striped   <tbody>内 行背景色斑马线形式交替显示 ( IE8 不支持)
        .table-bordered  添加边框
        .table-hover     <tbody>内 行启用鼠标悬停显示背景色#F5F5F5
        .table-condensed 让表格更加紧凑
      <tr>、<th>或<td> 的添加类
        .active  将(前面.table-hover)悬停的颜色固定在行或者单元格上
        .success 给 行或单元格 添加 背景色#DFF0D8 表示成功操作
        .info    给 行或单元格 添加 背景色#D9EDF7 表示信息变化的操作
        .warning 给 行或单元格 添加 背景色#FCF8E3 表示一个警告的操作
        .danger  给 行或单元格 添加 背景色#F2DEDE 表示一个危险的操作
      表格尺寸自适应/响应式
        把 .table 放置在 .table-responsive 内,
        可以让表格水平滚动以适应小型设备(小于 768px)
        当在大于 768px 宽的大型设备上查看时,看不到任何的差别
    表单
      .form-group   设置margin-bottom =15px
      .form-control 设置width为100%
      form 
        .form-inline  内联表单,所有后代元素在一行显示
      label
        .sr-only  将其内容隐藏
        .control-label  自动居中label在父元素中的位置
      input的结构样式
        <div class="type的类型">
          <label><input type=" " />xx</label>
        </div>
        行内样式则为 type类型值-inline
      控件状态
      表单小图标 校验状态
    按钮
      PS:任何带有 class .btn 的元素都会继承圆角灰色按钮的默认外观
        <a>、<button> 或 <input> 元素可使用按钮 class。
        但建议在 <button> 元素上使用,避免跨浏览器不一致
      .btn         为按钮添加基本样式,必须
      
      .btn-default 默认/标准按钮
      .btn-primary 原始按钮样式(未被操作)
      .btn-success 表示成功的动作
      .btn-info    该样式可用于要弹出信息的按钮
      .btn-warning 表示需要谨慎操作的按钮
      .btn-dange   表示一个危险动作的按钮操作
      .btn-link    让按钮看起来像个链接 (仍然保留按钮行为)
      
      .btn-lg      制作一个大按钮
      .btn-sm      制作一个小按钮
      .btn-xs      制作一个超小按钮
      .btn-block   块级按钮(拉伸至父元素100%的宽度)
      
      .active      按钮被点击
      .disabled    禁用按钮
      按钮组
        <div class="btn-group">
          <button type="button" name="button" class="btn btn-default">111</button>
          <button type="button" name="button" class="btn btn-default">111</button>
          <button type="button" name="button" class="btn btn-default">111</button>
        </div>
      按钮工具栏
        <div class="btn-toolbar">
          <div class="btn-group">
            <button type="button" name="button" class="btn btn-default"></button>
            <button type="button" name="button" class="btn btn-default"></button>
            <button type="button" name="button" class="btn btn-default"></button>
            <button type="button" name="button" class="btn btn-default"></button>
          </div>
        </div>
    图片
      // 图片形状
      .img-rounded    添加 border-radius:6px 来获得图片圆角。
      .img-circle     添加 border-radius:50% 来让整个图片变成圆形。
      .img-thumbnail  添加一些内边距(padding)和一个灰色的边框。
      .img-responsive 图片尺寸自适应
        max-width:100%;height:auto;
    图标
      <button type="button" class="close">&times;</button> 关闭x,关闭按钮
      <a type="button" class="close">&times;</a> 关闭x,关闭按钮
      <span class="caret"></span>  倒三角
    位置控制
      .center-block 居中
      .pull-left    居左
      .pull-right   居右
        <div class="pull-left">居左</div>
        <div class="pull-right">居右</div>
        <div class="clearfix visible-sm">清除浮动</div>  
    小图标
      一般使用span或i标签引入
      <span class="glyphicon glyphicon-asterisk"></span>
      <i class="glyphicon glyphicon-asterisk"></i>
      图标+表单
        <div class="input-group">
          <span class="input-group-addon">
          <span class="glyphicon glyphicon-zoom-in"></span>
          </span>
          <input type="text" class="form-control">
        </div>
    下拉菜单
    导航
      //选项卡导航
      <ul class="nav nav-tabs">
        <li class="active"><a href="#">home</a></li>
        <li><a href="#">home</a></li>
        <li><a href="#">home</a></li>
      </ul>
      .nav-pills   胶囊式导航
      .nav-stacked 堆叠式导航
      .nav-justified 自适应
      .nav-divider 选项分割符,选项样式
      二级导航
      导航条
        <nav class="navbar navbar-default">
          <div class="navbar-header">
            <a href="#" class="navbar-brand">导航</a>
          </div>
          <!-- <ul class="nav navbar-nav">
            <li><a href="#">2222</a></li>
            <li><a href="#">2222</a></li>
          </ul> -->
        </nav>
  组件
  JS插件 
    PS:一组基于jQuery的JS插件集 (故需要引入jQuery库)
    使用方法:给元素添加 data-xx="xxx" 属性 或再配合jQuery 使用.
    动画效果
    下拉菜单
    选项卡
    警告框
    按钮
    折叠
    模态弹窗
    滚动侦测
    提示框
    弹出框
    旋转轮播
    自动定位浮标
---------------------------------------------------------------------以下待整理 
Question&Idea 
  视图-控制器-数据存储-模块 app
  在当前页面中打开一新页面,点击返回后,保留之前页面的状态[如JS将某个元素隐藏了],如何实现?
    在Firefox中返回可以保存状态,但Chrome和IE中不会,
    方法一:将跳转之前的状态信息使用,sessionStorage存起来,返回后再使用JS调回状态.
    方法二:使用hash来存状态信息,原理同方法一.
  一道面试题 
    function foo(){
      getName =function(){ console.log(1); }
      return this;
    }
    foo.getName =function(){ console.log(2); }
    foo.prototype.getName =function(){ console.log(3); }
    var getName =function(){ console.log(4); }
    function getName(){ console.log(5); }
    // 请写出以下输出结果
    foo.getName()           //2
    getName()               //4
    foo().getName()         //1 ,执行foo()后,getName未加var是全局变量产生覆盖
    getName()               //1
    new foo.getName()       //2
    new foo().getName()     //3 ,相当于(new foo()).getName() 改写为(new foo).getName()
      new foo().getName() ===(new foo).getName() //true
      var aoo =new foo();
      aoo.getName() === new foo().getName() //true
    new new foo().getName() //3,懵比


