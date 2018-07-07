--------------------------------------------------------------------------------
jQuery插件 
  'jQuery-File-Upload': 文件上传插件 
  'Validation'表单验证插件 
    'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.16.0/jquery.validate.min.js'
    特点 
      内置验证规则 : 拥有必填、数字、email、URL和信用卡号等19类内置验证规则 
      自定义验证规则 
      验证信息提示 : 内置默认验证信息提示,也可自定义覆盖 
      实时验证 : 可通过keyup和blur事件触发验证,而不仅仅在提交表单时验证 
    $(form).validate({options})  插件自带包含必填、数字、URL在内容的验证规则 
      即时显示异常信息,允许自定义验证规则
      form    表单元素
      options 调用方法时的配置对象 
        所有的验证规则和异常信息显示的位置都在该对象中进行设置。
      Example:
        $('#myform').validate({
          // 自定义验证规则
          rules : {
            email : {
              require : true ,
              email : true 
            }
          }
          // 错误提示位置
          errorPlacement : function(error,elem){
            error.appendTo('.tip');
          }
        })
  'Form'表单插件 
    $(form).ajaxForm ({options}) 实现ajax方式向服务器提交表单数据 
      form     表单元素
      options  配置对象,设置发送ajax的数据和参数
      Example:
        var options = {
          url : 'xxx/xx.php',
          target : '.tip'
        }
        $('#myForm').ajaxForm(options); 
    $(form).ajaxSubmit()
  'Cookie'插件: 方便地通过cookie对象保存、读取、删除用户的信息,
    还能通过cookie插件保存用户的浏览记录
    $.cookie(key,value[,options]) 保存
      options 其他配置项 
        expires : num/date  整数/日期对象,有效期 
          当为num时,表示有效时长,单位为'天'
          为date日期对象时,表示过期时间,若为已过期的时间,则Cookie将被删除
          若不设置或设置为null,则Cookie将被当作session_cookie[浏览器关闭后删除]
        path : str          cookie的路径属性,默认为创建该cookie的页面路径 
        domain : str        cookie的域名属性,默认为创建该cookie的页面域名 
        secure : bol        若为true,则该cookie的传输会要求一个安全协议如https
    $.cookie(key)       读取
    $.cookie(key,null)  删除
  $(linkimage).lightBox({options}) 图片灯箱插件
    PS:该插件可以用圆角的方式展示选择中的图片,使用按钮查看上下张图片,
      在加载图片时自带进度条,还能以自动播放的方式浏览图片
    linkimage 为包含图片的<a>元素名称
    options   为插件方法的配置对象
    Example:
      $('.imgs a').lightBox({
        overlayBgColor : "#666" , // 图片浏览时的背景色
        overlayOpacity : 0.5, // 背景色透明度
        containsResizeSpeed : 600 // 图片切换时的速度
      })
  $(linkimage).jqzoom({options})  图片放大镜插件
  $(textbox).autocomplete(urlData,[options]);  搜索插件
    PS:搜索插件的功能是通过插件的 autocomplete() 方法与文本框相绑定,
      当文本框输入字符时,绑定后的插件将返回与字符相近的字符串提示选择
    textbox  为文本框元素名称
    urlData  为插件返回的相近字符串数据,可选项参数options为调用插件方法时的配置对象。
      其中参数key为保存cookie对象的名称,value为名称对应的cookie值。
  $(selector).contextMenu(menuId,{options}); 右键菜单插件
    PS:右键菜单插件可以绑定页面中的任意元素,
      绑定后,选中元素,点击右键,便通过该插件弹出一个快捷菜单,
      点击菜单各项名称执行相应操作
    Selector 参数为绑定插件的元素
    meunId   为快捷菜单元素,options为配置对象
  $(selector).focusColor(color)  自定义对象级插件
    PS:可以在<ul>元素中,鼠标在表项<li>元素移动时,自定义其获取焦点时的背景色, 
      即定义<li>元素选中时的背景色
    selector 表示<ul>元素
    color    表示<li>元素选中时的
  'jQuery UI'插件 
    PS:jQuery UI源自于'Interface'插件
      jQuery UI则是在jQuery的基础上,利用jQuery的扩展性,设计的插件。
      提供了一些常用的界面元素,诸如对话框、拖动行为、改变大小行为等等
    jQuery UI引入
      Example: 
        <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
        // 可选,定义默认的样式
        <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
        // 需jQuery支持
        <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
        // 引入jQuery UI
    jEl.draggable(options); 使元素可拖动 
      options 配置参数对象 
      { // 参数可选
        helper  : "clone",  // 拖动复制副本
        opacity : number,   // 0-1 的数值,定义拖动的元素的透明度
        axis : "x" | "y",   // 属性设置拖曳时的坐标方向
        containment : 属性指定拖曳区域
        ...
      }  
    jEl.droppable(options); 定义元素可放置 
      options 配置参数对象    
      {  
        accept: ".block",    // 限定jEl为块元素
        activeClass:"XX"     // 可放置元素放置后添加的class
        hoverClass: "XX"     // 鼠标悬浮可放置元素上时,添加的class
        drop:function(e,u){  // 定义放置后,执行的操作
          // 表示当被接收的拖曳元素完全进入接收元素的容器时,触发该函数的调用
        } 
      } 
    jEl.sortable(options);  定义元素的子元素可进行拖动排序
      PS:将序列元素实现拖曳排序的功能
        如<option>、<li>按任意位置进行拖曳从而形成一个新的元素序列
      options 配置参数对象    
      {  
        axis:         // 拖动排序时,可移动的方向
        "x"
        "y"
      }
      Example: <ul>中的各个<li>元素则能指定的透明度进行任意的拖曳排序
        $('ul').sortable({
          delay : 2 ,   // 为防止与点击事件冲突,延时两秒
          opacity : 0.5 // 拖动时透明度为0.5
        })
    jEl.selectable(obj);   其子元素可选[Ctrl多选] 
    jEl.resizable()   改变大小
    jEl.accordion(options)   折叠菜单
      PS:实现页面中指定区域类似“手风琴”的折叠效果,
        即点击标题时展开内容,再点另一标题时,关闭已展开的内容
      jEl   整个面板元素
      options 方法对应的配置对象
    jEl.dialog(options)      对话框
      PS:对话框插件可以用动画的效果弹出多种类型的对话框,
        实现js代码中 alert() 和 confirm() 函数的功能
      jEl   显示弹出对话框的元素
      options 方法的配置对象 
        在对象中可以设置对话框类型、“确定”、“取消”按钮执行的代码等。
      Example:
        $("#aoo").dialog({
          height : 140 ,
          modal  : true ,
          title  : '系统提示',
          hide   : 'explode',
          buttons:{
            '确定': function () {
              $("#spnName").remove();
              $(this).dialog("close");
            },
            '取消': function () {
              $(this).dialog("close");
            }
          },
          open : function(e , u){
            $(this).html('');
            $(this).append('<p>' + content + '<p>');
          }
        })
    jEl.slider()       滑动条
    jEl.tabs(options)  选项卡插件
      PS:使用选项卡插件可以将<ul>中的<li>选项定义为选项标题,
        在标题中,再使用<a>元素的“href”属性设置选项标题对应的内容
      jEl   为选项卡整体外围元素,该元素包含选项卡标题与内容
      options 方法的配置对象,通过该对象还能以ajax方式加载选项卡的内容
      Example:
        $('#tabs').tabs({
          fx : { // 设置各选项卡在切换时的动画效果
            opacity : 'toggle',
            height  : 'toggle'
          },
          event : 'mousemove' // 通过鼠标移动事件切换选项卡
        })
    jEl.menu(options)  菜单工具插件
      PS:菜单工具插件可以通过<ul>创建多级内联或弹出式菜单,
        支持通过键盘方向键控制菜单滑动,允许为菜单的各个选项添加图标;
      jEl   为菜单列表中最外层<ul>元素
      options 方法的配置对象
    jEl.spinner([options]) 微调按钮插件 
      PS:微调按钮插件不仅能在文本框中直接输入数值,
        还可以通过点击输入框右侧的上下按钮修改输入框的值,
        还支持键盘的上下方向键改变输入值
      jEl   为文本输入框元素
      options 可选,方法的配置对象
        在该对象中,可以设置输入的最大、最小值,获取改变值和设置对应事件
        在对象的方法中 
          $(this).spinner('value')      获取到当前的值
          $(this).spinner('value',num)  设置当前的值
        max 
        min 
        spin : function(event , ui){ // 微调递增/递减事件
        }
        change : function(){ // 微调值改变事件
          
        }
    jEl.tooltip([options]) 工具提示插件 
      PS:工具提示插件可以定制元素的提示外观,提示内容支持变量、Ajax远程获取,
        还可以自定义提示内容显示的位置
      jEl   需要显示提示信息的元素
      options 可选,方法的配置对象
        在该对象中,可以设置提示信息的弹出、隐藏时的效果和所在位置
      Example:
        给各个<a>元素都绑定工具提示插件,
        将在指定的位置并以动画效果展示各个<a>元素中title属性所对应的内容。
        $('a').tooltip({
          show : {
            effect : 'slideDown',
            delay  : 350
          },
          hide : {
            effect : 'explode',
            delay  : 350
          },
          position : {
            my : 'left top',
            at : 'left bottom'
          }
        })
    jQuery UI Events事件 
      slidechange   滑条改变事件
'jQuery Mobile' 
  引入 
    <link rel="stylesheet" href='jquery.mobile.css'>  // 引入样式文件 
    <script src="jquery.js"></script>                 // jQuery依赖
    <script src="jquery.mobile.js"></script>
Exp: 
  在新窗口中打开链接 
    <a href="http://www.opensourcehunter.com" rel='openNew'>link1</a>
    <a href="http://www.opensourcehunter.com" rel='openNew'>link2</a>
    ...
     $('a[rel$="openNew"]').click(function(){ 
        this.target = "_blank";
     });
  自动修改破损图像 
    若网站上有许多破碎的图像链接,可用一个不易被替换的图像来代替.
    添加这个简单的代码可以节省很多麻烦:
    即使网站没有破碎的图像链接,添加这段代码也没有任何害处。
    $('img').on('error', function () {
      $(this).prop('src', 'img/broken.png');
    });
  禁止页面右键菜单 
   $(document).on("contextmenu",function(e){
     return false;
   })
Suggestion: 
Question&Idea 
  如何在 AJAX 的回调中获取请求的数据 [?]
---------------------------------------------------------------------以下待整理 
