介绍_概念_说明_定义
  其他库
    Modernizr 检测浏览器的支持情况
      要想检测浏览器对一个API的支持,并没有一个统一的方法.
      几乎每个API都有自己的一种方式来检测.
      Modernizr是一个开源JavaScript库,
      提供了一个统一的接口来检测浏览器支持.
Library 库 
  每个项目为了提高开发效率,创建一个库来存放大量的重复调用的代码
  把各种常用的代码片段,组织起来放在一个JS文件中,组成的一个包就是JavaScript库.
  库是一个编程术语,意思是一些列函数的集合
  标准库指的是语言自带的库
Framework 框架 
  框架与库的概念类似,一般框架规模大于库.
  框架更强调整体,解决方案,考虑的不单单是某个具体的方法或函数,
  而是注重从细节到宏观的整体思路,
  比如UI解决方案可以用ExtJS,
  Mobile开发可以用jQueryMobile,
  MVC解决方案用backbone.
--------------------------------------------------------------------------------
★jQuery 
说明篇 :快速简洁的JavaScript库 
  PS:jQuery是一个JS的库,提供了DOM操作、Ajax封装和、兼容性等功能
  版本
    2.0 版本不支持ie 6/7/8
  核心特性总结：
    具有独特的链式语法和短小清晰的多功能接口；
    具有高效灵活的css选择器,并且可对CSS选择器进行扩展；
    拥有便捷的插件扩展机制和丰富的插件.
    jQuery兼容各种主流浏览器,如IE 6.0+、FF 1.5+、Safari 2.0+、Opera 9.0+等。
    jQuery操作即使Jelem不存在也不会报错
      $("#aoo").css("height"); 
      即使$("#aoo")不存在也不会报错;
      且$("#aoo")仍为一个对象,
      if ($("#aoo")) { } 不可用来做为节点是否存在的判断,
      可使用$("#aoo").length 或 $("#aoo")[0] 来判断
  封装库方法
    函数式封装
    对象式封装
  封装库-连缀 :一条语句同时设置一个或多个节点两个或两个以上的操作
      实现连缀操作,需要改写库函数的封装方式,使用函数式对象写法
      e.g.
        <div id="box"> 123 </div>
        $().getId('box').css("color","red").html('内容').click(function(){alert('a')});
        结果为: <div id="box" style="color: red;">内容</div>
      使用函数式对象写法封装库 示例:
        // 前台调用
        var $ =function (){ return new Base(); }
        // 基础库
        function Base(){
          this.elements =[];// 创建一个数组,来保存获取的节点和节点数组
          this.getId =function(id){ // 获取id节点
            this.elements.push(document.getElementById(id));
            return this;
          }
          this.getTagName =function(tag){ // 获取元素节点
            var tags =document.getElementsByTagName(tag);
            for(var i =0;i<tags.length;i++){
              this.elements.push(tags[i]);
            }
            return this;
          }
        }
        //设置css
        Base.prototype.css =function(attr,value){
          for (var i =0;i<this.elements.length;i++){
            this.elements[i].style[attr] =value;
          }
          return this;
        }
        // 设置innerHTML
        Base.prototype.html =function(str){
          for(var i =0;i<this.elements.length;i++){
            this.elements[i].innerHTML =str;
          }
          return this;
        }
        // 触发点击事件
        Base.prototype.click =function (f){
          for(var i =0;i<this.elements.length;i++){
            this.elements[i].onclick =f;
          }
          return this;
        }
  jQuery 引入
    本地引入
      下载jQuery的JS文件到本地,通过script标签引入
    引入网络文件
      当可以访问网络时,可以直接引用jQuery的网址即可.
      e.g. 
      通过网站 "http://www.bootcdn.cn/jquery/" 选择需要的版本使用script引入
      <script src="https://cdn.bootcss.com/jquery/3.0.0/jquery.js"></script>
    调试页引入jQuery
      在没有使用jQuery的页面,从调试窗口手动添加代码引入.(刷新后失效)
      使用JS DOM将<script src="cdn.bootcss.com/jquery/3.1.1/core.js"></script>插入到head中.
      e.g. 
      将下面代码插入到调试页即可
      document.querySelector("head").insertAdjacentHTML("afterbegin",`<script src="https://cdn.bootcss.com/jquery/3.0.0/jquery.js"></script>`)
    设置将HTML加载完后再加载JS
      ready函数会在文档加载完成后才执行.
      $("document").ready(function(){
        // code
      })
    $ 或 jQuery 符号冲突决解
      var $jq = jQuery.noConflict(); 
      $jq('#id').show();
  jQuery 配置
    jQuery.noConflict()   移交$的控制权
      var J = jQuery.noConflict(); 自定义快捷方式为J
    jQuery(function(J){
      // 此作用域中,J 等价于 jQuery
    })
    (function(J){
      // 此作用域中 J 等价于 jQuery
    })(jQuery);
DOM 操作 
  PS:使用JQ方法获取的HTML元素,为JQ DOM元素对象,
    jQuery对象是通过jQuery包装DOM对象产生的对象,
    Jelem 类似于数组,未获取到元素则为空数组,
    数组中每个元素为原生JS的DOM元素对象;
    在jQuery中 $ 等价于 jQuery,$为快捷方式;
  Jelem 创建 
    $('<div>') 创建一个div Jelem
    Jelem.clone(bool) 复制元素
      bool   布尔值,默认为false,若为true,则复制 Event 和 Data
  Jelem 获取 
    $("selector"); 通过选择器获取Jelem 
      PS:等价于 jQuery("selector");
        selector 可为组合选择器
        CSS选择器几乎可全部适用 
      ◆层级关系
        :first 第一个
          e.g. $("div:first")  //表示选取第一个div
        :last  最后一个
        :even  下标为偶数的 (实质上第奇数个元素被选中)
        :odd   下标为奇数的 (实质上第偶数个元素被选中)
        :eq(n) 下标指定选择器
          e.g. $("p:eq(1)"); 选择第二个 p元素
          Exp:选取带有指定 index 值的元素。index 值从 0 开始
            经常与其他元素/选择器一起使用,来选择指定的组中特定序号的元素(如上面的例子)。
          语法 $(":eq(index)")            
        :gt(n) 下标大于n的
        :lt(n) 下标小于n的
        :only-child  当元素为其父元素的唯一子元素时
        :nth-child(index/even/odd/equation) 下标/偶数/奇数/xn+m表达式
        :first-child
        :last-child
      ◆属性、内容
        :empty          内容为空的元素
        :parent         含有子元素或文本的元素
        :contains(str)  内容包含字符str [相当于判断 innerText 包含]
          e.g. 
            $("div:contains(abc)");  // 选取所有内容包含abc的div元素 
        []           属性选择器
          $("div[class]");        选取所有 有class属性 的div元素
          $("div[XX="XXX"]");     选取所有 XX="XXX" 的div元素
          $("div[XX!="XXX"]");    不等
          $("div[XX^="XXX"]");    以XXX开头
          $("div[XX$="XXX"]");    以XXX结尾
          $("div[XX*="XXX"]");    包含XXX字符
          $("div[XX|="XXX"]");    XX为前缀
          $("div[XX~="XXX"]");    空格分割的值中包含XXX
            <div class="aoo boo"> </div>
            $("div[class~="aoo"]");
          $("a[XX*="XXX"][class]");    //可多个组合使用
      ◆选择器筛选
        :not(selector)  非选择器
          selector 为所有jQuery支持的选择器
          e.g. 
            $("li:not(li:first)") 
            $('.mask-selected:not(.none)')
        :has(selector)  元素包含后代元素selector对应的元素
          e.g.:
            <div class="aoo "> 1</div>
            <div class="aoo boo"> 2
              <div class="boo">
                11
              </div>
            console.log( $('.aoo:has(.boo)').is($('.aoo').eq(1)) ); // true
      ◆元素状态
        :hidden       所有 display:none visibility:hidden type='hidden' 的元素
        :visible      和:hidden相反
        :animated     正在执行动画的所用元素
        :focus        当前所用获取焦点的元素
      ◆表单类
        :input 所有 input、textarea、select、button等等
        :text     单行文本框
        :password 密码框
        :radio    单选框
        :checkbox 多选框
        :submit   提交按钮
        :image    图像按钮
        :reset    重置按钮
        :button   按钮
        :file     上传域
        ★表单状态类
        :enabled    可用元素
        :disabled   不可用
        :checked    被选中 [单选框、复选框]
        :selected   被选中 [下拉列表]
      ◆组合
        > 子元素 
          $("#playlist > li") 
        * 通配
        , 多选
        + 同级后一元素 
          J(".one+div") <=> J('.one').next('div')
        ~ 同级后面元素 
          J('.one~div') <=> J('.one').nextAll('div')
      ◆其他
        $(':header')  所有的标题元素,h1、h2...
        Xpath选择器
      \\   选择器中的特殊字符转义
        <div id="aoo#boo"> </div>
        $('#aoo#boo');   正确为  $('#aoo\\#b');
      RetValue:为包含选择器对应的所用元素
      特殊值
        $('html') 等价于 document.documentElement
        $('head') 等价于 document.head
        $('body') 等价于 document.body
        $(window)   浏览器显示网页内容的部分
        $(document) 整个网页文档流
        $("body")   就是body
    通过Jelem获取 
      Remarks:
        不可通过 Jelem.$("selector")获取Jelem
        原生JS中可通过 elem.getElementById() 来获取子类元素
        而jQuery中$相当于 document.getElementById(),而不能拆分.
      ★层级关系筛选
      Jelem.parents(["selector"])  所有祖先元素
      Jelem.closest("selector")    最近的第一个祖先元素
      Jelem.parent(["selector"])   父级及以上的一个元素  [无参时,为父元素]
      Jelem.siblings(["selector"]) 从同级元素中获取Jelem [无参,为所有同级元素]
      Jelem.prev(["selector"])   同级前一个元素 [无参时,为同级前一元素]
      Jelem.prevAll("selector")  同级前所有元素
      Jelem.next(["selector"])   同级后元素 [无参时,为同级后一元素]
      Jelem.nextAll("selector")  同级后所有元素
      Jelem.andSelf("selector")  获取指定元素后边的所有同级元素,之后加上指定的元素
      Jelem.find('selector')        从后代元素中获取Jelem
        自身Jelem若find自己则获取不到
      Jelem.children(['selector'])  和find类似,只是从子元素中获取
      ★属性筛选
      Jelem.offsetParent() 最近的祖先定位元素
        定位元素指的是position 属性被设置为 relative、absolute 或 fixed 的元素. 
      ★其他条件筛选
      Jelem.eq(index) 通过下标选取Jelem
        index为整数,指示元素的位置[从0开始]
        如果是负数,则从集合中的最后一个元素往回计数。
      Jelem.not('selector'/Jelem) 获取Jelem中不包含参数中的Jelem的Jelem
        Jelem.not(function(index){}); 用于检测集合中每个元素的函数。this 是当前 DOM 元素。
    通过elem获取 
      $(elem);  返回Jelem
        e.g. $(document); // 获取整个文档
    性能优化
      关于jQuery选择器的性能优先级,ID选择器快于元素选择器,元素选择器快于class选择器。
      因为ID选择器和元素选择器是原生的JavaScript操作,而类选择器不是;
      
      $('#nav').find('a.home'); //3 
      $('#nav a.home'); //2 
      $('.home'); //1 
      推荐优先使用前两种
      
      为选择器指定上下文
        默认情况下,当把一个选择器传递给jQuery时,它将遍历整个DOM,
        jQuery方法还具有一个未充分利用的参数,既可以将一个上下文参数传入jQuery,
        以限制它只搜索DOM中特定的一部分。
        //糟糕,会遍历整个DOM
        $(".class");
        //建议,只搜索#id元素内
        $(".class","#id");
        
        jQuery选择器的性能比较：
        $(".class","#id") > $("#id .class") > $(".class")
        
      缓存jQuery对象
        // 糟糕 
        var $container = $('#container'), 
        $containerLi = $('#container li'), 
        $containerLiSpan = $('#container li span'); 
        // 建议 (高效) 
        var $container = $('#container '), 
        $containerLi = $container.find('li'), 
        $containerLiSpan= $containerLi.find('span');
  Jelem 操作 
    PS:若操作的元素是从html中获取到的,则位置操作都是移动操作,即原来的就没有了
    Jelem 转换为 elem
      PS: 而Jelem对象 使用原生JS的方法时,需转换为elem对象
      Jelem[index];     下标获取对应的元素
      Jelem.get(index); get取下标获取elem
        PS:使用get取下标,index的可能性更多
        参数为负时:0 表示第一个,-1 表示最后一个,-2 表示倒数第二个,依此类推...
        无参数时,将jQ对象数组转换为可用JS操作的常规数组.
    增
      Jelem.prepend('htmlCode'/Jelem)    内部头部插入
      Jelem.prependTo("selector"/Jelem)  被插入到内部头部 [与prepend相反]
        将元素/内容content插入到元素内部头部
      Jelem.append('htmlCode'/Jelem)     内部尾部插入
        也可以将style标签内的css代码添加到head中
      Jelem1.appendTo("selector"/Jelem2) 被插入到内部尾部 [与append顺序相反]
        e.g.:
          .aoo{ background-color:pink;}
          $("<b>Hello</b>",{"class":"aoo"}).appendTo("p");
          // 在所有的p标签中添加粗体的Hello,且背景为pink
      Jelem.before('htmlCode'/Jelem) 将html代码/Jelem添加到元素外部头部
      Jelem.insertBefore("selector"/Jelem) 被插入到外部头部 [与before相反]
        将元素/内容content插入到元素外部尾部 
      Jelem.after('htmlCode'/Jelem)      外部尾部插入
      Jelem.insertAfter("selector"/Jelem) 被插入到外部尾部 [与after相反]
        将元素/内容content插入到元素外部尾部  
      Jelem.html(str/foo); 设置/获取元素内容
        无参数:以字符串形式返回元素内容,包括HTML标签
        有参数:参数为字符串,将元素中内容替换为字符串,会将HTML标记转换为HTML元素
        当 Jelem 包含多个 elem时,则默认将其获取的每个元素的字符串合并为一个字符串.
        和JS中的.innerHTML 相似
      Jelem.text(str/foo); 设置/获取元素文本
        无参数:获取元素的内容文本
        有参数:设置元素内容文本
      Jelem.wrap("HTML代码"/Jelem)          每个元素外包裹元素
      Jelem.wrapAll("HTML代码"/Jelem)       所有元素整体外包裹元素
      Jelem.unwrap("HTML代码"/Jelem)        元素外包裹的元素去除
      Jelem.wrapInner("HTML代码"/Jelem)     将每个元素的内容包裹
    删
      Jelem.remove()   删除元素
        删除该元素和其子元素及以下的所有内容(包括自身标签)
        所有与元素相关的数据也会被删除(event handlers、internally cached data)
        返回值为删除的元素
      Jelem.detach()   删除元素「保留绑定事件、附加数据等」
        detach 后的返回值(元素)再添加到其他地方,元素的event事件仍存在.
      Jelem.empty()    清空内容
        删除该元素的子元素及以下的所有内容(不包括自身标签)
        返回值为清空后的元素
      Jelem.removeAttr('属性名'); 删除属性
        e.g.:
          Jelem.removeAttr('class'); 
    改
      Jelem1.replaceWith("HTML代码"/Jelem); 元素1代替为元素2
      Jelem1.replaceAll("selector"/Jelem2); 元素2代替为元素1 [与replaceWith相反]
        $("HTML代码")/Jelem1.replaceAll("selector"/Jelem2); 
      Jelem.css() 设置/获取元素的style样式 [设置为行内样式] [获取为计算后的属性]
        e.g. 
          Jelem.css('height'); //获取元素的高度
          Jelem.css("color");  // 获取元素的字体颜色
          Jelem.css("color","red"); // 设置元素的字体颜色为红色
        Jelem.css(attrArr);  获取多个属性值
          e.g.:
            Jelem.css(["color","font-size"]); 
        Jelem.css(attrObj);  设置多个属性
          e.g.:  Jelem.css({"background-color":"red",color:"yellow"});  
        Jelem.css("color",function(index,oldValue){ }); 传入函数
          // 设置返回值(即 return的值)为属性值.
    元素属性
      ◆添加属性
      Jelem.attr();  读写属性值
        Jelem.attr('属性名')     返回选定属性的属性值
        Jelem.attr('属性名',str/boolean) 设定选定属性的属性值
          e.g.:
            Jelem.attr('disabled',false); // 取消表单禁用
        Jelem.attr(attribute,function(index,oldvalue){...}) 通过函数来操作属性
        Jelem.attr({attribute:value, attribute:value ...})  同时设置多组属性值
        e.g.:
          Jelem.attr('class'); // 获取class属性的值
          Jelem.attr('data-foo'); // 获取自定义元素属性的值
            注:自定义属性一般设置格式为 data-**="xxxx"
          $('a[href^="http://"]').attr("target", "_blank"); // 在新窗口打开链接
      Jelem.prop();  读写属性值,和attr类似  [1.6 中新增]
        prop 和 attr 的区别
          有的属性写法要求不同,如disabled 和 checked,可写成 disabled = "disabled",
          或单独 disabled 或 disabled=true [HTML5规定,可等于任何字符,最终都为true]
          Jelem.attr('disabled') 返回 disabled
          Jelem.prop('disabled') 返回 true
          使用prop不会在DOM中反应出来
          e.g.:
            Jelem.prop('checked',false);//  html中仍显示为checked,但实际上改变了
            Jelem.attr('checked',false); // html 中会去掉checked属性
        $(selector).prop(property,value)
        $(selector).prop(property,function(index,currentvalue){...})
        $(selector).prop({property:value, property:value,...})
      Jelem.val(str/foo); 读写值 [实时动态的]
        使用元素
          input元素的value的值 
          textarea 的内容
          select 的 value 值(而非显示值)
        返回第一个匹配元素的 value 属性的值 
      ◆自定义数据
      Jelem.data(key,value) 绑定自定义数据 [DOM中无任何变化]
        e.g.:
          $('#box').data('name', 'TG'); 
      Jelem.data(key) 读取自定义数据
        e.g.:
          <div class="aoo" data-id='111'> 23423 </div>
          var Jelem = $('.aoo');
          var id = Jelem.data('id');
          console.log(id); // 111
      Jelem.removeDate(key) 移除自定义数据
        e.g.:
          $('#box').removeDate('name');
      ◆class相关
      Jelem.hasClass('class名');    检测class类
        返回值类型为Boolean,若存在返回true,否则false.
      Jelem.addClass('class名');    添加class类
        若为多个元素,则每个元素中都添加该类
      Jelem.removeClass('class名'); 移除class类
        Jelem.removeClass("aoo boo"); 移除class aoo 和 class boo
      Jelem.toggleClass('class名'); 开关class类
        若有,则删除;没有,则加上
    元素信息
      ◆尺寸位置信息
      Jelem.position()  定位(非static)元素的定位尺寸信息(top和left) [只读?]
        PS:只对可见元素有效
      Jelem.offset()    可读写,元素相对document「可视区左上角」的top和left
        PS:此方法只对可见元素有效
        RetValue:包含top和left属性的一个对象
        e.g.:
          $(".a").offset(); // {top: 24, left: 0}
          $(".a").offset().left = 20; // ? 
          $( "p:last" ).offset({top:10,left:30}); // 使用此方法进行 写操作
      Jelem.width([num]); 设置或返回元素content的width
      Jelem.height([num]); 设置或返回元素content的height
        需要设置 height的值,如单行文字只设置line-height则该方法获取不到数值.
      Jelem.innerWidth(); 返回元素的宽度,包括内边距
      Jelem.innerHeight(); 返回元素的高度,包括内边距
      Jelem.outerWidth([bool]) 方法返回元素的宽度,包括padding和border
        bool  可选,布尔值参数,默认为false,设置true时,计算外边距在内
      Jelem.outerHeight([bool]) 方法返回元素的高度,包括padding和border
        bool  可选,布尔值参数,默认为false,设置true时,计算外边距在内
      Jelem.scrollTop()   读写元素相对滚动条顶部的偏移
      Jelem.scrollLeft()  读写元素相对滚动条左侧的偏移
        此处的Jelem为拥有滚动条的元素
      ◆其他信息
      Jelem.size();        元素个数
      Jelem.index([Jelem]);  获取元素在其父元素Jelem中的下标「从1开始」
        jelem.index();   无参数,返回该元素在同级元素中的索引位置
        e.g.:
          点击获取当前为第几个li
          $("li").click(function(){ console.log( $(this).index()); });
          <ul>
            <li>aaaaa</li>
            <li>bbbbb</li>
            <li>ccccc</li>
          </ul>
      Jelem1.is(Jelem2) 判断
        Jelem1.is(Jelem2) 判断两个节点是否相同
        Jelem1.is(":checked") 判断是否被选中
    状态改变
      Jelem.focus();   获得焦点
      Jelem.blur();    失焦
      Jelem.click();   点击元素 「会触发事件」
      Jelem.select();  选中文字
        不可选中因增加contenteditable属性而可编辑的元素的文字
    性能优化
      繁重的操作中分离元素
        如果你打算对DOM元素做大量操作（连续设置多个属性或css样式）,
        建议首先分离元素然后在添加。
        // 糟糕
        var $container = $("#container"),
        $containerLi = $("#container li"),
        $element = null;
        $element = $containerLi.first();
        //... 许多复杂的操作
        // better
        var $container = $("#container"),
        $containerLi = $container.find("li"),
        $element = null;
        $element = $containerLi.first().detach();
        //... 许多复杂的操作
        $container.append($element);
  Animation 动画
    speed    数值,速度,过渡的时间,默认为0「单位毫秒」
      number (比如 1500)
      "normal"
      "slow"
      "fast"
      "swing"    
      "linear"   匀速
    cfoo 回调函数,在动画执行完后调用 
    ◆可见性变化
    Jelem.hide([speed,cfoo]);   隐藏元素
      cfoo 可选,hide之后执行的函数 (前提为设置了speed,否则不可选)
    Jelem.show([speed,cfoo]);   显示元素
    Jelem.fadeIn(speed,cfoo)        元素的淡入
    Jelem.fadeOut(speed,cfoo)       元素的淡出
    Jelem.fadeToggle(speed,cfoo);   开/关淡入淡出
    Jelem.fadeTo(speed,opacity,cfoo)   元素透明度变化到opacity
      opacity 透明度,0-1 之间取值
    ◆尺寸变化
    Jelem.slideDown(speed,cfoo)   高度变化
    Jelem.slideUp(speed,cfoo)     高度变化
    Jelem.slideToggle(speed,cfoo) 开/关高度变化
    Jelem.toggle([speed][,cfoo]);     开/关长宽尺寸变化
    ◆自定义变化
    Jelem.animate(params,duration,speed,cfoo)  定义变化及变化的过程
      params   必须,表示元素的最终样式状态
      duration 可选,执行时间
        "normal" ,默认值
        毫秒 （比如 1500）
        "slow"
        "fast"
      e.g. 
        $(".aoo").animate({width:"100%",height:"100%",fontSize:"50px"},1000)
        $(".aoo").animate({
          width:"+=10px", // 在原来的基础上加10px
          height:"-=100%"
        },1000)
    Jelem.animate(params,obj)    定义每个阶段的变化
      e.g. 
        $('.a').animate({
          left:100
        },
        {
          duration:1000,
          step:function(now,fx){

          }
        }
      );
    Jelem.stop(bool1,bool2)             停止动画
      bool1 可选,默认为false,表示当元素有多个动画时只停止第一个动画;true则停止所用动画
      bool2 可选,表示停止后的动画位置,默认false表示在执行到的位置,true表示到最后
    ◆其他
    jQuery.fx.off = true   禁用jQuery动画效果
    e.g.:
      左右滑动效果
      <div class="wrap">
        <div class="num">
          <span class="page">1</span>/
          <span class="total">9</span>
        </div>
        <div class="imgs">
          <img src="../publicImg/地图1.png" alt="" class="img">
          <img src="../publicImg/地图1.png" alt="" class="img">
          <img src="../publicImg/地图1.png" alt="" class="img">
          <img src="../publicImg/地图1.png" alt="" class="img">
          <img src="../publicImg/地图1.png" alt="" class="img">
          <img src="../publicImg/地图1.png" alt="" class="img">
          <img src="../publicImg/地图1.png" alt="" class="img">
          <img src="../publicImg/地图1.png" alt="" class="img">
          <img src="../publicImg/地图1.png" alt="" class="img">
        </div>
      </div>
      .wrap {
        height: 100vh;
        width: 100vw;
        background-color: #646464;
        position: relative;
      }
      .wrap .num {
        font-size: 4.26666667vw;
        width: 100%;
        color: white;
        position: absolute;
        text-align: center;
        bottom: 4vw;
      }
      .wrap .imgs {
        font-size: 0;
        white-space: nowrap;
        overflow-x: scroll;
      }
      .wrap .imgs img {
        outline: 1px solid gray;
        margin-top: 20%;
        width: 100%;
      }
      var width = $('.img').width();
      $('.imgs').on('touchend',function(e){
        var distance = $('.imgs').scrollLeft();
        var d = distance % width;
        var n = Math.floor(distance /width);
        if (d > width/2) {
          $(this).animate({scrollLeft : (n+1)*width },300);
          $('.page').text(n + 2 +'');
        }else {
          $(this).animate({scrollLeft : n*width},300);
          $('.page').text(n + 1+ '');
        }
        setTimeout(function(){
          var val = $('.imgs').scrollLeft() / width;
          $('.imgs').scrollLeft(Math.round(val)*width );
        },1000);
      })
Event 事件 
  PS:Jelem绑定事件,则为列表中的每个对象进行了绑定
  ◆事件绑定与取消
    PS:bind,live,delegate,on
      其中 elem.eventName 为bind的简写.
      对应解除为 unbind、die、undelegate、off
      bind 只能针对已经存在的元素进行事件的设置；
      live on delegate 均支持未来新添加元素的事件绑定 [使用委托的方式才会生效]
      bind 在 1.7 版本前比较受推崇之后已不推荐
      on 是 1.7 版本新添加的,也推荐使用,
      live 在 1.9 版本已经删除
  Jelem.on()      绑定事件 
    一般事件绑定
      Jelem.on("事件名",function(e){}) 
        jq对象为多个元素的数组时,此操作则给每个元素都绑定了事件
    同时绑定多事件
      Jelem.on("mouseover mouseout",foo)  
    绑定多组事件
      Jelem.on({ mouseover：foo1, mouseout：foo2, click：foo3, })
    绑定自定义事件
      Jelem.on("myOwnEvent",function(event,showName){  
        $(this).text(showName + "! What a beautiful name!").show()；
      })；
      $("button").click(function(){
        $("p").trigger("myOwnEvent",["Anja"])；
      })；
    事件传递信息
      Jelem.on("click",{msg:"You just clicked me!"},foo);
      function foo (event){ alert(event.data.msg); }
    事件代理 [可对未来元素进行绑定]
      Jelem.on('事件a',"selector",function(){
        // 其中 this 表示的为 selector表示的DOM元素
      }) 
        对selector对应的元素上执行事件,才会执行响应函数(相当于将函数中的判断外置了)
        PS-Self: 仍需符合冒泡原理,响应元素需为绑定元素的子元素?
  Jelem.off()     取消绑定 
    PS: 移除元素上绑定的一个或多个事件的事件处理函数
      off()函数主要用于解除由on()函数绑定的事件处理函数 
    Jelem.off(events,selector,handler)
      events   可选,String类型,一个或多个用空格分隔的事件或可选的命名空间
        例如"click"、"focus click"、"keydown.myPlugin" 
      selector 可选,String类型,jQuery选择器,用于Jelem 
        如果该参数为null或被省略,则表示当前元素自身绑定事件
        (实际触发者也可能是后代元素,只要事件流能到达当前元素即可) 
      handler  可选,Function类型,指定的事件处理函数 
    Jelem.off(eventsMap,selector)
      Arguments:
        eventsMap  Object类型,event:handler 对象
          如果省略参数handler,则移除指定元素指定事件类型上绑定的所有事件处理函数 
        selector 指定的对象(属于Jelem的后代元素)
          如果省略参数selector,则移除Jelem及后代的所用响应函数
          selector 必须与通过on()函数添加绑定时传入的选择器一致 
        如果省略了所有参数,则表示移除当前元素及后代元素的所有事件处理函数 
        实际上,off()函数的参数全是筛选条件,只有匹配所有参数条件的事件处理函数才会被移除
        参数越多,限定条件就越多,被移除的范围就越小
      RetValue:
        返回值为jQuery类型,返回当前jQuery对象本身 
  Jelem.unbind()  取消绑定
    规定从指定元素上删除的一个或多个事件处理程序 
    如果没有规定参数,unbind() 方法会删除指定元素的所有事件处理程序 
    语法
      $(selector).unbind(event,function)
      event    可选,规定删除元素的一个或多个事件 由空格分隔多个事件值.
      function 可选,规定从元素的指定事件取消绑定的函数名.若未设置该参数,则会删除绑定到指定事件的所有函数 
    使用 Event 对象来取消绑定事件处理程序 unbind
      规定要删除的事件对象 
      用于对自身内部的事件取消绑定(比如当事件已被触发一定次数之后,删除事件处理程序) 
      如果未规定参数,则 unbind() 方法会删除指定元素的所有事件处理程序 
      语法
        $(selector).unbind(eventObj)
        eventObj	可选,规定要使用的事件对象.eventObj参数来自事件绑定函数(即e.target 中的e).
  Jelem.eventName(foo)   快捷绑定
    Jelem.click(foo)    点击事件绑定
    $(document).ready(foo)  DOM结构加载完后执行
      简写方式: $(function(){/*jQuery代码*/})
    Jelem.change(foo)      元素的值或内容发生变化时响应
    Jelem.scroll(fuoo)     元素滚动条滑动事件
    Jelem.hover()  「JS 中无hover事件,所以无法使用on方法来绑定 ?」 
      可以有退出状态时的回调函数
        Jelem.hover(foo1,foo2)
        如click事件则无 
          Jelem.click(foo1,foo2)
          始终不会执行foo1,代替的是执行foo2
    Jelem.focus(foo)
    Jelem.blur(foo)
    Jelem.toggle(foo1,foo2[,foo3][,...])  点击依次执行函数 [1.9 版本移除]
  事件绑定性能优化
    正确使用事件委托
      $('#t').find('td').on('click', function () {  
        $(this).css({ 
          'color': 'red', 
          'background': 'yellow' 
        });  
      });
      这样会为每个td绑上事件,在为100个单元格绑定click事件的测试中,
      两者性能相差7倍之多,好的做法应该是下边写法：
      $('#t').on('click', 'td', function () {  
        $(this).css({ 
          'color': 'red', 
          'background': 'yellow' 
        });  
      }); 
  触发事件 
    Jelem.trigger("event",[param1,param2,...]); 
      event	 必需,规定指定元素要触发的事件
        可以使自定义事件(使用 bind() 函数来附加),或者任何标准事件
      [param1,param2,...]	 可选,传递到事件处理程序的额外参数
        PS:额外的参数对自定义事件特别有用
      Remarks:
        使用 val() 改变 select 的值,不会触发其 change 事件
    Jelem.eventName();   快捷触发
      Jelem.click();  触发点击 
        PS:不会产生鼠标点击的效果,如下拉选项不会弹出
  Event 对象
    PS:jQuery在遵循W3C规范的情况下,对event事件对象的常用属性进行了封装,
      使得事件处理在各大浏览器下都可以正常的运行而不需要进行浏览器类型判断。
    event.type 获取事件的类型
      e.g.:
        $("a").click(function(event){
          alert(event.type); //获取时间类型
          return false;  //阻止链接跳转
        })
        以上代码运行后会返回：“click”。
    event.preventDefault()  阻止默认的事件行为
      PS:JavaScript中符合W3C规范的preventDefault()方法在IE浏览器中无效。
        jQuery对其进行了封装,使之能兼容各种浏览器。
    event.stopPropagation() 阻止事件的冒泡
      PS:JavaScript中符合W3C规范的stopPropagation()方法在IE浏览器中无效。
        jQuery对其进行封装,使之能兼容各种浏览器。
    event.target 获取到触发事件的元素
      PS:jQuery对其封装后,避免了W3C、IE和safari浏览器不同标准的差异.
      e.g.:
        $("a[href=http://www.jb51.net]").click(function(event){
          alert(event.target.href); //获取触发事件的<a>元素的href属性值
          alert(event.target.tagName); //获取触发事件的元素的标签名称
          return false; //阻止链接跳转
        })
    event.relatedTarget 
      PS:
        标准DOM中,mouseover 和 mouseout 发生的元素通过event.target()来获取,
        相关元素通过 event.relatedTarget 属性来获取.
        event.relatedTarget 在 mouseover 中相当于IE浏览器的 event.fromElement,
        在 mouseout 中相当于IE浏览器的 event.toElement,
        jQuery对其进行了封装,使之能兼容各种浏览器。
    event.pageX 获取到光标相对页面的x坐标
    event.pageY 获取到光标相对页面的y坐标
      PS:
        如果没有使用jQuery时,那么IE浏览器中是用 event.x/event.y,
        而在Firefox浏览器中用 event.pageX/event.pageY,
        如果页上有滚动条,则还要加上滚动条的宽度和高度。
        在IE浏览器中还应该减去默认的2px的边框。
      e.g.:
        $(function() {
          $("a").click(function(event) {
            alert("Current mouse position:" + event.pageX + "," + event.pageY);
            //获取鼠标当前相对于页面的坐标
            return false; //阻止链接跳转
          });
        })
    event.which 在鼠标单击事件中获取到鼠标的左、中、右键,在键盘事件中获取键盘的按钮
      e.g.:
        $(function() {
          $("body").mousedown(function(e) {
            alert(e.which); //1 = 鼠标左键；2 = 鼠标中键；3 = 鼠标右键。
          })
        })
        以上代码加载到页面中,用鼠标单击页面时,单击左、中、右键分别返回1、2、3.
    event.metaKey 属性
      PS:
        针对不同浏览器对键盘中的<ctrl>按键解释不同,jQuery也进行了封装,
        规定 event.metaKey() 为键盘事件中获取<ctrl>按键.
    event.originalEvent 指向原始的事件对象
  window.onload 与 $(document).ready(function () {}) 的区别
    执行时间
    window.onload 必须等到页面内包括图片的所有元素加载完毕后才能执行
    $(document).ready() 是 DOM 结构绘制完毕后就执行,不必等到所有内容加载完毕
    编写个数不同
    window.onload 不能同时编写多个,若有多个 window.onload 方法,只会执行一个
    $(document).ready() 可以同时编写多个,并且都可以得到执行
    简化写法
    window.onload 没有简化写法
    $(document).ready(function(){}) 可以简写成 $(function(){})
  todo
    禁止右键点击
      $(document).bind("contextmenu",function(e){
        return false;
      });
    自动修改破损图像
      如果碰巧在网站上发现了破碎的图像链接,可以用一个被替换的图像来代替。
      添加这个简单的代码可以节省很多麻烦：
      即使你的网站没有破碎的图像链接,添加这段代码也没有任何害处。
      $('img').on('error', function () {
        $(this).prop('src', 'img/broken.png');
      });
    鼠标悬停(hover)切换 class 属性
      假如当用户鼠标悬停在一个可点击的元素上时,你希望改变其效果,下面这段代码可以在其悬停在元素上时添加 class 属性,当用户鼠标离开时,则自动取消该 class 属性：
      $('.btn').hover(function () {
        $(this).addClass('hover');
        }, function () {
          $(this).removeClass('hover');
        });
      你只需要添加必要的CSS代码即可。如果你想要更简洁的代码,可以使用 toggleClass 方法：
      $('.btn').hover(function () { 
        $(this).toggleClass('hover'); 
      });
      注：直接使用CSS实现该效果可能是更好的解决方案,但你仍然有必要知道该方法。
AJAX 
  PS: jQuery 最常用的 AJAX API 可以为分三类:
  ◆方法型 
  $.get(url[,data][,cfoo][,type]) get请求 
    url  请求的地址
    data 可选,get方法会把data添加到url上,故可直接改变url而省略data;
    cfoo 载入成功时调用回调函数
      PS:只有当Response的返回状态为success才执行该函数
      参数
      backData   返回的数据
      textStatus 字符串形式表示的响应的状态
    type 请求的数据类型,如'json'
  $.post(url[,data][,cfoo][,type])  post请求 
    type 客户端请求的数据类型,如 JSON、XML 等等
  ◆捷径型 
  Jelem.load(url[,data][,cfoo])  获取数据并将内容插入Jelem元素中 
    url      请求的地址
    data     可选,发送的数据
    cfoo     可选,请求成功时执行的回调函数
  $.getJSON(url[,data][,cfoo])   获取数据并解析
    url    请求加载json格式文件的服务器地址
    data   可选,请求时发送的数据
    cfoo   可选,数据请求成功后执行的回调函数,获取的数据作为参数传入
  $.getScript(url[,cfoo])      请求并执行获取到的JavaScript格式文件 
    $.getScript('http://www.imooc.com/data/sport_f.js',function() { 
      console.log("获取成功,自动执行JS");
    });
  ◆通用型
  $.ajaxSetup([options])    设置全局Ajax默认选项 
    PS：可以设置Ajax请求的一些全局性选项值,
      设置完成后,后面的Ajax请求将不需要再添加这些选项值,它的调用格式为：
    options 可选,对象,通过该对象设置Ajax请求时的全局选项值。
      {
        dataType : 'xxx',
        success  : function(data){
        }
        ...
      }
    e.g.：
      $.ajaxSetup({
        url : 'xx'
      });
      $.ajax({
        type : 'get',
        // url 可省略,已经在 ajaxSetup 中设置
        data : {
          key : val,
        }, 
        dataType : 'json',
        success  : function(backData,textStatus,obj){
        }, 
      });
  $.ajax({
    // 可选,发送的数据,若为get则会被附在url上;post则 作为postBody传出
    type:'请求方法', // 默认为get
    url:'/uploads/tags/json',
    // get请求,将键值对改为 &key1=val1&key2=val2 附在URL上
    data:{
      key1:val1,
      key2:val2,
      ...
    }, 
    // 服务器返回的数据类型,若不指定,jQuery将根据HTTP包MIME信息来智能判断
    dataType:'json', // 常用JSON格式,设置为 'json',其他如'text'
    // 常用的回调函数
    // contentType:'application/json',
    beforeSend:function(){ // 发送请求前执行
    }, 
    success:function(backData,textStatus,功能性的对象){ // 请求成功后执行
    }, 
    error:function (xhr,status,errorTrown){ // 请求失败后执行
    }, 
    complete:function(jqxhr,status){ // 请求完成完后执行,无论成功与否
    }, 
    // 后续可能会调用缓存;false则不缓存,只对post方法有效,默认为true
    cache:true / false ,
  });
  ◆JSONP跨域,原理上不属于AJAX只是采用了AJAX的写法而已
  $.ajax({
    type:'请求方法',
    url:'/uploads/tags/json',
    data:{}, 
    dataType:'jsonp',
    jsonp:"cfoo123", // 需要在后端有相应的改动,名称需一致
    beforeSend:function(){ }, 
    success:function(backData,textStatus,功能性的对象){ },
    error:function (xhr,status,errorTrown){ },
    complete:function(jqxhr,status){ },
    cache:true / false 
  });
  e.g. 上传文件
    ajax上传的时候,需要获得input:file 选择的文件(可能为多个文件),获取其文件列表为：
      // input标签的files属性
      document.querySelector("#fileId").files
      // 返回的是一个文件列表数组
    获得的文件列表,然后遍历插入到表单数据当中 即：
      // 获得上传文件DOM对象
      var oFiles = document.querySelector("#fileId");
      // 实例化一个表单数据对象
      var formData = new FormData();
      // 遍历图片文件列表,插入到表单数据中
      for (var i = 0, file; file = oFiles[i]; i++) { // 文件名称,文件对象
        formData.append(file.name, file);
      }
    获得表单数据之后,就可以用ajax的POST上传 
      // 实例化一个AJAX对象
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        alert("上传成功！");
      }
      xhr.open("POST", "upload.php", true);
      // 发送表单数据
      xhr.send(formData);
    上传到服务器之后,获取到文件列表为：
      Array
      (
        [jpg_jpg] => Array
            (
                [name] => jpg.jpg
                [type] => image/jpeg
                [tmp_name] => D:\xampp\tmp\phpA595.tmp
                [error] => 0
                [size] => 133363
            )

        [png_png] => Array
            (
                [name] => png.png
                [type] => image/png
                [tmp_name] => D:\xampp\tmp\phpA5A6.tmp
                [error] => 0
                [size] => 1214628
            )

      )
    在服务端循环遍历这个数组就可以上传文件了 
  ◆其他方法
  $(selector).serialize()   序列化表单元素值 
    PS：可将表单中有name属性的元素值进行序列化,生成标准URL编码文本字符串,直接用于ajax请求;
    selector  一个或多个表单中的元素或表单form元素本身
    e.g.：var aoo = $('form').serialize();
  绑定Ajax事件
  Jelem.ajaxStart(cfoo)  在Ajax请求发出前触发函数
  Jelem.ajaxStop(cfoo)   在Ajax请求完成后触发函数
方法 
  Jelem.each(foo)    为每个匹配成员规定执行的函数 
    foo 指定的执行函数,参数为 index下标 和element成员值
    返回 'false' 将停止循环,就像在普通的循环中使用 'break'
    返回 'true' 跳至下一个循环,就像在普通的循环中使用'continue'
    e.g.
      输出每个dom元素
      Jelem.each(function(){ console.log(this); })
      输入每个Jelem
      Jelem.each(function(){ console.log($(this)); })
      
      $('.todo-cell').each(function()){ console.log(arguments) }
      或写成
      $('.todo-cell').each(function(i,e)){ console.log(i,e) }
      
      var obj = { one:1, two:2, three:3, four:4};
      $.each(obj, function(key, val) { console.log(key,val); });
      // one,1,two,2,three,four,4
      // 当obj为数组时,key表示下标
  $.map(arr,foo)     对每个数组中的元素调用函数得到返回值组成新的数组
    arr    用于遍历的数组
    foo    遍历执行的函数,传入 value值和下标index;
    retn   一个新数组
    e.g.
      var foo =[1,2,3,4]
      var a =$.map(foo,function(v){
        return v*v
      })
      a;    //[1, 4, 9, 16]
  $.grep(arr,foo)    对数组中每个元素进行筛选,返回符合条件的成员
    arr  用于筛选的数组
    foo  筛选函数,传入每个数组的元素作为参数
    e.g.
      var foo =[1,2,3,4,5]
      var bar =$.grep(foo,function(a){
        return a%2 == 0;
      })
      bar;      //[2, 4]
  $.trim(str)  去除字符串中开始和结尾的空格「不能删除字符串中间的空格」
    e.g.:
      $.trim('a bc '); // "a bc"
  $.stringify({obj}) 序列化为JSON
  $.parseJSON(jsonStr) 解析JSON字符串
  $.param (obj)  使对象或数组按照key/value格式进行序列化编码
    PS：该编码后的值常用于向服务端发送URL请求
    obj  表示需要进行序列化的对象
      该对象也可以是一个数组,整个函数返回一个经过序列化编码后的字符串
  $.isArray(arr)         判断是否为数组
  $.inArray(item, array) 判断元素是否在数组内
  $.isEmptyObject(obj)   检测一对象的内容是否为空
    如果为空,则该函数返回true,否则,返回false值;
    obj  需要检测的对象名称
  $.isPlainObject(obj)   检测对象是否为原始对象
    检测对象是否为通过{}或new Object()关键字创建的原始对象的布尔值;
  $.contains(elem1,elem2) 检测在一DOM节点中是否包含另外一DOM节点的布尔值
    elem1  一个DOM对象节点元素,用于包含其他节点的容器
    elem2  另一个DOM对象节点元素,用于被其他容器所包含 
  $.extend (options)  可对原有的工具函数进行扩展,自定义类级别的jQuery插件
    PS：扩展工具方法或者叫静态方法
    options 对象,表示自定义插件的函数内容
      $.extend({
        foo:function(){
          console.log(1);
        }
      });
      $.foo(); //1
    e.g.：
      自定义一个用于返回两个数中最大值的插件
      $.extend({
        'maxNum' : function(num1,num2){
          return (num1 > num2) ? num1 : num2 ;
        }
      })
      var maxNum = $.maxNum(1,2);
      console.log(maxNum); // 2
      
      扩展自己的选择器
      $.extend($.expr[':'], {
        moreThen1000px: function(a) {
          return $(a).width() > 1000;
        }
      });
      $('.box:moreThen1000px').click(function() { 
        console.log(1); 
      });
  $.extend(obj1,obj2,...objn)  扩展原有的Object对象
    PS：在扩展对象时,两个对象将进行合并,当存在相同属性名时,后者将覆盖前者
    obj1至objN  表示需要合并的各个原有对象
    e.g.：对两个已有的对象进行合并
      var obj1 = {
        aoo : 1 ,
        boo : 2 
      }
      var obj2 = {
        aoo : 3 ,
        coo : 2 
      }
      var obj = $.extend(obj1,obj2);
      console.log(obj); // Object {aoo: 3, boo: 2, coo: 2}
  $.fn.extend() 扩展实例方法
    e.g. 
      $.fn.extend({
        foo : function(){
          console.log(2);
        }
      });
      $("div").foo(); //2
  已废弃 
    $.browser 对象 获取浏览器的名称与版本信息 「1.9-可用」
      PS：已在jQuery 1.9 中被移除,因为识别方法不准确
      $.browser.chrome  为 true 表示当前为Chrome浏览器
      $.browser.mozilla 为 true 表示当前为火狐浏览器
      $.browser.msie    为 true 表示当前为IE浏览器
      $.browser.version 获取浏览器版本信息
    $.support.boxModel 检测浏览器是否属于标准的w3c盒子模型 「1.8-可用」
      PS：浏览器的盒子模型分为两类,一类为标准的w3c盒子模型,另一类为IE盒子模型,
        两者区别为在Width和Height这两个属性值中是否包含padding和border的值,
        w3c盒子模型不包含,IE盒子模型则包含,
Deferred 对象 
  PS：Deferred 对象是在 jQuery 1.5 中引入的,
    该对象提供了一系列的方法,可以将多个回调函数注册进一个回调队列里、调用回调队列,
    以及将同步或异步函数执行结果的成功还是失败传递给对应的处理函数。
    Promise 对象是和 Deferred 对象一起作为 jQuery 对 Promise 的一种实现。
    在 jQuery1.x 和 2.x 版本中, Deferred 对象遵守的是《CommonJS Promises 提案》中的约定,
    而 原生 promises 方法的建立基础《Promises/A+ 提案》也是以这一提案书为根基衍生而来。
    之所以 Deferred 对象没有遵循《Promises/A+ 提案》,是因为那时后者根本还没被构想出来。
    由于 jQuery 扮演的先驱者的角色以及后向兼容性问题,
    jQuery1.x 和 2.x 里 promises 的使用方式和原生 Javascript 的用法并不一致。
    此外,由于 jQuery 自己在 promises 方面遵循了另外一套提案,
    这导致它无法兼容其他实现 promises 的库,比如 Q library。
    不过即将到来的 jQuery 3 改进了 同原生 promises「ES6+」的互操作性。
    虽然为了向后兼容,Deferred 对象的主要方法之一（then()）的方法签名仍然会有些不同,
    但行为方面它已经同 ECMAScript 2015 标准更加一致。
  Deferred和Promise对象 
    PS： Deferred 对象可以被用来执行异步操作,例如 Ajax 请求和动画的实现。
      在 jQuery 中,Promise对象是只能由Deferred对象或 jQuery 对象创建。
      它拥有 Deferred 对象的一部分方法：always(),done(), fail(), state()和then()。
      jQuery 文档和 ECMAScript 标准在术语上的不同:
      在 ECMAScript 中, 不论一个 promise 被完成 (fulfilled) 还是被拒绝 (rejected),
      我们都说它被解析 (resolved) 了。
      然而在 jQuery 的文档中,被解析这个词指的是 ECMAScript 标准中的完成 (fulfilled) 状态。
    var deferred = jQuery.Deferred(); 创建deferred对象
      或者,使用 $ 作为 jQuery 的简写： var deferred = $.Deferred();
    deferred.always(cfoos[, cfoos, ..., cfoos])
       添加在该 Deferred 对象被解析或被拒绝时调用的处理函数
    deferred.done(cfoos[, cfoos, ..., cfoos])
      添加在该 Deferred 对象被解析时调用的处理函数
    deferred.fail(cfoos[, cfoos, ..., cfoos])
      添加在该 Deferred 对象被拒绝时调用的处理函数
    deferred.notify([argument, ..., argument]):
      调用 Deferred 对象上的 progressCallbacks 处理函数并传递制定的参数
    deferred.notifyWith(context[, argument, ..., argument])
      在制定的上下文中调用 progressCallbacks 处理函数并传递制定的参数。
    deferred.progress(cfoos[, cfoos, ..., cfoos])
      添加在该 Deferred 对象产生进展通知时被调用的处理函数。
    deferred.promise([target])  返回 Deferred 对象的 promise 对象
    deferred.reject([argument, ..., argument]) 
      拒绝一个 Deferred 对象并以指定的参数调用所有的failCallbacks处理函数。
    deferred.rejectWith(context[, argument, ..., argument])
      拒绝一个 Deferred 对象并在指定的上下文中以指定参数调用所有的failCallbacks处理函数。
    deferred.resolve([argument, ..., argument])
      解析一个 Deferred 对象并以指定的参数调用所有的 doneCallbackswith 处理函数。
    deferred.resolveWith(context[, argument, ..., argument])
      解析一个 Deferred 对象并在指定的上下文中以指定参数调用所有的doneCallbacks处理函数。
    deferred.state()    返回当前 Deferred 对象的状态。
    deferred.then(resolvedCallback[, rejectedCallback[, progressCallback]])
      添加在该 Deferred 对象被解析、拒绝或收到进展通知时被调用的处理函数
      可用 done() 也可以通过 then() 来处理操作成功的情况;
      区别是then能够把接收到的值通过参数传递给后续的then,done,fail或progress调用
    e.g.: 
      利用 Deferred 依次执行 Ajax 请求
      var username = 'testuser';
      var fileToSearch = 'README.md';
      $.getJSON('https://api.github.com/user/' + username + '/repositories')
      .then(function(repositories) {
        return repositories[0].name;
      })
      .then(function(lastUpdatedRepository) {
        return $.getJSON('https://api.github.com/user/' + username + '/repository/' + lastUpdatedRepository + '/files');
      })
      .then(function(files) {
        var README = null;
        for (var i = 0; i < files.length; i++) {
          if (files[i].name.indexOf(fileToSearch) >= 0) {
            README = files[i].path;
            break;
          }
        }
        return README;
      })
      .then(function(README) {
        return $.getJSON('https://api.github.com/user/' + username + '/repository/' + lastUpdatedRepository + '/file/' + README + '/content');
      })
      .then(function(content) {
        console.log(content);
      });
      
      创建一个基于 Promise 的 setTimeout 函数
      function timeout(milliseconds) {
        var deferred = $.Deferred(); //创建一个新Deferred
        setTimeout(deferred.resolve, milliseconds); // 在指定时间后解析Deferred对象
        return deferred.promise(); // 返回Deferred对象的Promise对象
      }
      timeout(1000).then(function() {
        console.log('等待了1秒钟！');
      });
    jQuery1.x/2.x 同 jQuery3 的区别 
      var deferred = $.Deferred();
      deferred.then(function() {
        throw new Error('一条错误信息');
      })
      .then( 
        function() {
          console.log('第一个成功条件函数');
        },
        function() {
          console.log('第一个失败条件函数');
        }
      )
      .then(
        function() {
          console.log('第二个成功条件函数');
        },
        function() {
          console.log('第二个失败条件函数');
        }
      );
      deferred.resolve();
      jQuery 3.x 中, 这段代码会在控制台输出“第一个失败条件函数” 和 “第二个成功条件函数”。
      原因就像我前面提到的,抛出异常后的状态会被转换成拒绝操作进而失败条件回调函数一定会被执行。
      此外,一旦异常被处理（在这个例子里被失败条件回调函数传给了第二个then()）,
      后面的成功条件函数就会被执行（这里是第三个 then() 里的成功条件函数）。
      在 jQuery 1.x 和 2.x 中,除了第一个函数（抛出错误异常的那个）之外没有其他函数会被执行,
      所以你只会在控制台里看到“未处理的异常：一条错误信息。”
      为了更好的改善它同 ECMAScript2015 的兼容性,
      jQuery3.x 还给 Deferred 和 Promise 对象增加了一个叫做 catch() 的新方法。
      它可以用来定义当 Deferred 对象被拒绝或 Promise 对象处于拒绝态时的处理函数。
      它的函数签名如下：
      deferred.catch(rejectedCallback)
      可以看出,这个方法不过是 then(null, rejectedCallback) 的一个快捷方式罢了。
  e.g.:  在ajax中使用 「self」 
    var deferred = $.Deferred();
    $.ajax({
      type : 'get',
      url  : './source/test-json.json',
      // url  : './source/test-json.json1', // 测试错误时使用
      data : {
      }, 
      dataType : 'json',
      success  : function(backData,textStatus,obj){
        deferred.resolve(backData);
      }, 
      error    : function (xhr,status,errorTrown){
        deferred.reject(status);
      }, 
    });
    deferred.then(function(data){
      console.log(data,1);
    })
    .catch(function(data){
      console.log(data,2);
    })
jQuery插件 
  $(form).validate({options})  插件自带包含必填、数字、URL在内容的验证规则 
    即时显示异常信息,允许自定义验证规则
    form    表单元素
    options 调用方法时的配置对象 
      所有的验证规则和异常信息显示的位置都在该对象中进行设置。
    e.g.：
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
  $(form).ajaxForm ({options}) 实现ajax方式向服务器提交表单数据 
    form     表单元素
    options  配置对象,设置发送ajax的数据和参数
    e.g.：
      var options = {
        url : 'xxx/xx.php',
        target : '.tip'
      }
      $('#myForm').ajaxForm(options); 
  $(linkimage).lightBox({options}) 图片灯箱插件
    PS：该插件可以用圆角的方式展示选择中的图片,使用按钮查看上下张图片,
      在加载图片时自带进度条,还能以自动播放的方式浏览图片
    linkimage 为包含图片的<a>元素名称
    options   为插件方法的配置对象
    e.g.：
      $('.imgs a').lightBox({
        overlayBgColor : "#666" , // 图片浏览时的背景色
        overlayOpacity : 0.5, // 背景色透明度
        containsResizeSpeed : 600 // 图片切换时的速度
      })
  $(linkimage).jqzoom({options})  图片放大镜插件
  cookie插件 方便地通过cookie对象保存、读取、删除用户的信息,
    还能通过cookie插件保存用户的浏览记录
    $.cookie(key,value) 保存
    $.cookie(key)       读取
    $.cookie(key,null)  删除
  $(textbox).autocomplete(urlData,[options]);  搜索插件
    PS：搜索插件的功能是通过插件的 autocomplete() 方法与文本框相绑定,
      当文本框输入字符时,绑定后的插件将返回与字符相近的字符串提示选择
    textbox  为文本框元素名称
    urlData  为插件返回的相近字符串数据,可选项参数options为调用插件方法时的配置对象。
      其中参数key为保存cookie对象的名称,value为名称对应的cookie值。
  $(selector).contextMenu(menuId,{options}); 右键菜单插件
    PS：右键菜单插件可以绑定页面中的任意元素,
      绑定后,选中元素,点击右键,便通过该插件弹出一个快捷菜单,
      点击菜单各项名称执行相应操作
    Selector 参数为绑定插件的元素
    meunId   为快捷菜单元素,options为配置对象
  $(selector).focusColor(color)  自定义对象级插件
    PS：可以在<ul>元素中,鼠标在表项<li>元素移动时,自定义其获取焦点时的背景色, 
      即定义<li>元素选中时的背景色
    selector 表示<ul>元素
    color    表示<li>元素选中时的
jQuery UI插件
  PS:jQuery UI则是在jQuery的基础上,利用jQuery的扩展性,设计的插件。
    提供了一些常用的界面元素,诸如对话框、拖动行为、改变大小行为等等
  jQuery UI 引入
    e.g. 
      <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
      // 可选定义默认的样式
      <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
      // 需jQuery支持
      <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
      // 引入jQuery UI
  Jelem.draggable(options); 使元素可拖动 
    options 配置参数对象 
    { // 参数可选
      helper  : "clone",  // 拖动复制副本
      opacity : number,   // 0-1 的数值,定义拖动的元素的透明度
      axis : "x" | "y",   // 属性设置拖曳时的坐标方向
      containment : 属性指定拖曳区域
      ...
    }  
  Jelem.droppable(options); 定义元素可放置 
    options 配置参数对象    
    {  
      accept: ".block",    // 限定Jelem为块元素
      activeClass:"XX"     // 可放置元素放置后添加的class
      hoverClass: "XX"     // 鼠标悬浮可放置元素上时,添加的class
      drop:function(e,u){  // 定义放置后,执行的操作
        // 表示当被接收的拖曳元素完全进入接收元素的容器时,触发该函数的调用
      } 
    } 
  Jelem.sortable(options);  定义元素的子元素可进行拖动排序
    PS：将序列元素实现拖曳排序的功能
      如<option>、<li>按任意位置进行拖曳从而形成一个新的元素序列
    options 配置参数对象    
    {  
      axis:         // 拖动排序时,可移动的方向
      "x"
      "y"
    }
    e.g.： <ul>中的各个<li>元素则能指定的透明度进行任意的拖曳排序
      $('ul').sortable({
        delay : 2 ,   // 为防止与点击事件冲突,延时两秒
        opacity : 0.5 // 拖动时透明度为0.5
      })
  Jelem.selectable(obj);   其子元素可选 (Ctrl多选)
  Jelem.resizable()   改变大小
  Jelem.accordion(options)   折叠菜单
    PS：实现页面中指定区域类似“手风琴”的折叠效果,
      即点击标题时展开内容,再点另一标题时,关闭已展开的内容
    Jelem   整个面板元素
    options 方法对应的配置对象
  Jelem.dialog(options)      对话框
    PS：对话框插件可以用动画的效果弹出多种类型的对话框,
      实现js代码中 alert() 和 confirm() 函数的功能
    Jelem   显示弹出对话框的元素
    options 方法的配置对象 
      在对象中可以设置对话框类型、“确定”、“取消”按钮执行的代码等。
    e.g.：
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
  Jelem.slider()      滑动条
  Jelem.tabs(options)  选项卡插件
    PS：使用选项卡插件可以将<ul>中的<li>选项定义为选项标题,
      在标题中,再使用<a>元素的“href”属性设置选项标题对应的内容
    Jelem   为选项卡整体外围元素,该元素包含选项卡标题与内容
    options 方法的配置对象,通过该对象还能以ajax方式加载选项卡的内容
    e.g.：
      $('#tabs').tabs({
        fx : { // 设置各选项卡在切换时的动画效果
          opacity : 'toggle',
          height  : 'toggle'
        },
        event : 'mousemove' // 通过鼠标移动事件切换选项卡
      })
  Jelem.menu(options)  菜单工具插件
    PS：菜单工具插件可以通过<ul>创建多级内联或弹出式菜单,
      支持通过键盘方向键控制菜单滑动,允许为菜单的各个选项添加图标;
    Jelem   为菜单列表中最外层<ul>元素
    options 方法的配置对象
  Jelem.spinner([options]) 微调按钮插件 
    PS：微调按钮插件不仅能在文本框中直接输入数值,
      还可以通过点击输入框右侧的上下按钮修改输入框的值,
      还支持键盘的上下方向键改变输入值
    Jelem   为文本输入框元素
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
  Jelem.tooltip([options]) 工具提示插件 
    PS：工具提示插件可以定制元素的提示外观,提示内容支持变量、Ajax远程获取,
      还可以自定义提示内容显示的位置
    Jelem   需要显示提示信息的元素
    options 可选,方法的配置对象
      在该对象中,可以设置提示信息的弹出、隐藏时的效果和所在位置
    e.g.：
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
其他 
  Collection
    在新窗口中打开链接
      // Links with the rel="external" attribute will only open in a new window
       $('a[@rel$='external']').click(function(){
          this.target = "_blank";
       });
      // how to use
      <a href="http://www.opensourcehunter.com" rel=external>open link</a>
  Suggestion:
    增强功能
      由此启发
      var form = document.getElementById('form');
      var input = form.getElementsByTagName('input');
      实现类似如此的功能(现在还没有?)
      var form =$(".form")
      var input =form.$('input')

      实现类似如下功能:在获取的元素中进行筛选,如筛选出type='checkbox'的input.
      $('input').$('type',"checkbox")
  特殊用法
    PS-Self:
      $(":checkbox") 
        表示选中type值为checkbox的input元素.
--------------------------------------------------------------------------------
Bootstrap :快速开发 Web 应用程序和网站的前端框架 
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
      e.g. 
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
--------------------------------------------------------------------------------
Idea 
  视图-控制器-数据存储-模块 app
收集 
  一个页面从输入 URL 到页面加载显示完成,这个过程中都发生了什么？（流程说的越详细越好）
    详细版：
      1、浏览器会开启一个线程来处理这个请求,对 URL 分析判断如果是 http 协议就按照 Web 方式来处理;
      2、调用浏览器内核中的对应方法,比如 WebView 中的 loadUrl 方法;
      3、通过DNS解析获取网址的IP地址,设置 UA 等信息发出第二个GET请求;
      4、进行HTTP协议会话,客户端发送报头(请求报头);
      5、进入到web服务器上的 Web Server,如 Apache、Tomcat、Node.JS 等服务器;
      6、进入部署好的后端应用,如 PHP、Java、JavaScript、Python 等,找到对应的请求处理;
      7、处理结束回馈报头,此处如果浏览器访问过,缓存上有对应资源,会与服务器最后修改时间对比,一致则返回304;
      8、浏览器开始下载html文档(响应报头,状态码200),同时使用缓存;
      9、文档树建立,根据标记请求所需指定MIME类型的文件（比如css、js）,同时设置了cookie;
      10、页面开始渲染DOM,JS根据DOM API操作DOM,执行事件绑定等,页面显示完成。
    简洁版：
      浏览器根据请求的URL交给DNS域名解析,找到真实IP,向服务器发起请求；
      服务器交给后台处理完成后返回数据,浏览器接收文件（HTML、JS、CSS、图象等）；
      浏览器对加载到的资源（HTML、JS、CSS等）进行语法解析,建立相应的内部数据结构（如HTML的DOM）；
      载入解析到的资源文件,渲染页面,完成。

  网页多语言支持
    采用统一编码UTF-8方式编码
      所以对提供了多语言版本的网站来说,Unicode字符集应该是最理想的选择。
      它是一种双字节编码机制的字符集,不管是东方文字还是西方文字,在Unicode中一律用两个字节来表示,
      因而至少可以定义65536个不同的字符,几乎可以涵盖世界上目前所有通用的语言的每一种字符。
      所以在设计和开发多语言网站时,一定要注意先把非中文页面的字符集定义为“utf-8”格式,
      这一步非常重要,原因在于若等页面做好之后再更改字符集设置,可说是一件非常非常吃力不讨好的工作,
      有时候甚至可能需要从头再来,重新输入网站的文字内容。
    多语言网站实现计划 ：
      静态：就是为每种语言分辨准备一套页面文件,
        通过文件后缀名来区分不同语言,
          例如对于首页文件index_en.htm供给英语界面,index_gb.htm供给简体中文界面,index_big.htm供给繁体中文界面
        通过子目录来区分不同语言。
          或者是en/index.htm供给英语界面,gb/index.htm供给简体中文界面,big/index.htm供给繁体中文界面
        一旦用户选择了需要的语言后,主动跳转到相应的页面,首页以下其他链接也是按照同样方法处理。
        从保护的角度来看,通过子目录比通过文件后缀名来区分不同语言版本显得要简略明了
      动态：站点内所有页面文件都是动态页面文件（PHP,ASP等）而不是静态页面文件,
       在需要输出语言文字的处所同一采用语言变量来表现,这些语言变量可以根据用户选择不同的语言赋予不同的值,
       从而实现在不同的语言环境下输出不同的文字。
        例如：语言变量ln_name,当用户选择的语言是英语时赋值为“Name”,
        当用户选择的语言是简体中文时赋值为“姓名”,这样就可以适应不同语言时的输出。
      优缺点
        采用静态方法的长处是页面直接输出到客户端,不需要在服务器上运行,占用服务器的资源比拟少,
          系统能够支撑的并发连接数较多,
          毛病是要为每种语言制作一套页面文件,很多内容即使是和语言无关的也要分不同语言来存储,占用的存储空间较多。
        采用动态方法和静态方法的优毛病正好相反,它的长处是动态页面文件只有一套,不同语言的文字应用语言变量来存储,
          和语言无关的内容只存储一份,占用的存储空间较少,并且扩大新语言比拟轻易,
          毛病需要在服务器上运行,然后把成果输进到客户端,占用服务器的资源比拟多,系统能够支撑的并发连接数较少。

    根据navigator.language我们可以获取到浏览器的语言设置
    如果是中文的话返回的是zh-CN, 英文的话返回的可能是en,en-US等其它的
    一般情况下（一般系统和浏览器的语言一致的。当操作系统是中文,浏览器是英文,只能用服务器脚本去判断）是没有问题啦。
    navigator.language对IE的支持不是很好,IE的话可以选用navigator.userLanguage判断操作系统的语言
    
  代码功能实现
    表单中不允许输入中文(输入中文自动消失)
      <form id="form">
        <input type="text" placeholder="用户名">
      </form>
  
      <script>
        (function() {
          var form = document.getElementById('form');
          var input = form.getElementsByTagName('input');
  
          // 给input 绑定两个事件(键盘按下、失焦)
          input[0].onkeyup = input[0].onblur = function(e) {
            // clear(this);
            // 等价于
            clear(e.target)
          }
  
          function clear(o) {
            o.value = o.value.replace(/[\u4e00-\u9fa5]/g, '');
            // 这两个unicode值正好是Unicode表中的汉字的头和尾
          }
        })();
      </script>
  
    禁止用户复制 剪切 粘贴
      <form id="form">
        <input type="text" placeholder="用户名">
      </form>
  
      <script>
        (function() {
          var form = document.getElementById('form');
          var input = form.getElementsByTagName('input');
          for (var i = 0; i < input.length; i++) {
            input[i].oncopy = input[i].onpaste=input[i].oncut = function() {
              // copy为复制 paste为粘贴 cut为剪切
              return false;
            }
          }
        })();
      </script>
  
    通过z-index 实现轮播图
      <style>
        .boundary{
          position: relative;
          background: pink;
        }
        .img{
          z-index: 100;
          position: absolute;left: 0;top: 0;
        }
        .active{
          z-index: 110;
        }
      </style>
      <input id="button" type="button" name="name" value="点击切换">
      <div class="boundary">
        <img class="img active" src="http://cdnstatic.visualizeus.com/thumbs/12/33/123347ce2eeea7d0fc05643f39518f9f_i.jpg" alt="picture1" />
        <img class="img" src="http://cdnstatic.visualizeus.com/thumbs/86/37/8637e4b4b016ba4b631bd628ebc07f48_i.jpg" alt="picture2" />
        <img class="img" src="http://cdnstatic.visualizeus.com/thumbs/21/cf/21cf04f8cb7799e36d2b8160c349de01_i.jpg" alt="picture3" />
      </div>
  
      <script>
        // 轮播图的效果:
        //   定时轮播
        //   点击切换(下一张图片)
        // 实现原理:使多张图叠加在一起,通过改变一张的z-index属性来进行显示控制.
        var button =document.querySelector('#button')
        button.addEventListener('click',next)
        var num =0;
        var sum =3;
        function next(){
          // 使当前显示的图片下沉(不显示)
          var active =document.querySelector('.active')
          active.classList.remove('active')
          // 使下一张浮上来
          var i =(num++)%sum
          var img =document.querySelectorAll('.img')[i]
          img.classList.add('active')
        }
        // 实现图片的自动切换
        setInterval(next,1000)
      </script>
  
    留言板
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>留言板</title>
          <script src="jFols.js" charset="utf-8"></script>
          <style>
  
          </style>
        </head>
        <body>
          <div class="inputPart">
            <input id="inputText" type="text" name="name" value="" placeholder="在此输入留言">
            <input id="inputButton" type="button" name="name" value="添加留言">
          </div>
          <div class="messagePart">
            <!-- <div class="message">
              <input  type="button" name="name" value="编辑">
              <input type="button" name="name" value="删除">
              <span>message</span>
            </div> -->
          </div>
  
        <script>
          // 实现功能:
          //   在输入框输入留言,点击添加将留言添加在下方
          //   可修改留言
          //   可删除留言
  
          // 实现添加功能
          var inputButton =document.querySelector("#inputButton");
          inputButton.addEventListener("click",addMessage);
          // 函数功能:将输入的文字添加到下方
          function addMessage(){
            // PS-Self:若将addMessage定义为var addMessage=function(){}的形式,则必须将其放在绑定事件的前面,否则执行不到.
            var messagePart =document.querySelector(".messagePart");
            var inputText =document.querySelector('#inputText');
            var value =inputText.value;
            messagePart.insertAdjacentHTML("beforeEnd",`
              <div class="message">
                <input class="edit" type="button" name="name" value="编辑">
                <input class="delete" type="button" name="name" value="删除">
                <span class="mesContent editable" contenteditable="false">${value}</span>
              </div>`)
          }
  
          // 实现删除/编辑功能
          var messagePart =document.querySelector(".messagePart");
          messagePart.addEventListener("click",function (evernt){
            var eveEle =event.target;
            // eveEle表示被点击的元素 (和冒泡无关)
            console.log('点击的元素为',eveEle);
            if (eveEle.classList.contains('delete')) {
              // 判断是否点击的是删除按钮
              console.log(eveEle.parentElement);
              eveEle.parentElement.remove()
            }else if (eveEle.classList.contains('edit')) {
              // 判断点击的是否是编辑按钮
              var span =broEle(eveEle,'mesContent')
              span.setAttribute("contenteditable","true")
              span.focus()
            }
          });
        </script>
        </body>
      </html>
  
    js实现焦点进入文本框内关闭输入法:imeMode
      2011-05-26 11:23
      要用到的东西: imeMode:xxx
      有四个参数
      active 代表输入法为中文
      inactive 代表输入法为英文
      auto 代表打开输入法 (默认)
      disable 代表关闭输入法
      <INPUT onfocus=" this.style.imeMode='active' " />
      <INPUT onfocus=" this.style.imeMode='inactive' " />
      <INPUT onfocus=" this.style.imeMode='auto' " />
      <INPUT onfocus=" this.style.imeMode='disabled' " /> 这个应该算最常用的了,其他可以不记
  
    音乐播放器
Question And Answer 
  html调试中,如何使访问后的链接回到未访问的状态.
    决解方法1 关闭网页重新打开

  怎样避免用户在留言或发帖等在网页中添加字符时,加入html标签等会影响网页的因素?(不一定是问题的问题)
    使用 innerText 而非 innerHTML
---------------------------------------------------------------------以下待整理
  面试题
    pushstate
    webview
    二叉树
    使用过的jQuery组件
    json格式有什么优缺点？
    css的盒模型, width和height指定的是什么
    介绍下http协议
      http的header有哪些内容
      402.402等状态码什么含义
      get与post方法的区别是什么？除了get与post,还有哪些方式？
    bootstrap
    anjularJS

    ES6的object.assign()
    window.onclick与addEventListener的区别。同时用他们注册监听器的话,触发顺序是什么；
    如何进行页面加载优化；
    算法： 求3的平方根；
    CSS实现一个圆环形loading效果
    CSS3 实现一个立方体
    如果网页内容需要支持多语言,你会怎么做？
    模块式开发
    ajax的回调函数,（答success, error,complete）还有其他几种?
    ajax 的ContentType 和 datatype 的区别（答了之后又问了 datatype有哪些类型）
    一个div width = 12px, 里面有个p元素是1.5em, 现在把浏览器窗口放大2倍,div和p的width是多少
    给了几个个字符串,有的里面有双引号,有的是单引号,有的没引号,判断哪个是合法有效的JSON格式数据
    MVVM

    写出页面中超链接href中包含"/ system/"字符的CSS选择器
    简述编写jQuery插件的步骤和代码编写关键点
    jQuery widget 插件

  Question & Idea 
    在浏览器中, length 的值为0 ,为什么会这样子?
    通过图片的像素信息 在网页中创建图片 ?
      像素数据 如 ctx.getImageData(10,10,50,50).data
    网页防盗,将显示出来的内容与复制粘贴的内容不一致
      通过复制事件来改变粘贴板的内容,如何具体实现(?)
    局部作用域的表示?
      在全局中运行时,有一个window对象,
      那么在函数作用域内,表示该作用域的对象如何引用
    在当前页面中打开一新页面,点击返回后,保留之前页面的状态(如JS将某个元素隐藏了),如何实现?
      在Firefox中返回可以保存状态,但Chrome和IE中不会,
      方法一:将跳转之前的状态信息使用,sessionStorage存起来,返回后再使用JS调回状态.
      方法二:使用hash来存状态信息,原理同方法一.
    
    增强网页文档的可读性
      如通过Ctrl+左键选中一行文字使其增加背景颜色,
      然后Alt+左键点击取消颜色背景.
      
    如何规定JS执行在一定的时间内完成,如将一元素颜色在3秒内从白到黑?
      通过操作CSS样式,再定义元素的animation动画来实现
    如何实现无CSS属性的动画,如scroll bar 滚动的动画?
      注:CSS不可定义元素的scroll bar 的位置, 故不可用CSS3的animation来实现
  Collection 
    奇怪的代码
      赋值 =
        b =(a =c);
        分解为:
          a =c;
          b =a;
        b =(a = ctx.createImageData(w, h)).data;
        分解为:
          a =ctx.createImageData(w, h);
          b =a.data;
  
        if(tog = !tog){}
        相当于
          tog =!tog
          if(tog){}
        总结:
          var a =1;
          var b =2;
          console.log( a =b);  //2
          即 a = b 的值为a
  
        var a = b =1
        相当于
        var a= 1;
        b =1;     //  b为全局变量
  
        var aoo =a ||b;
        相当于
        if(a) {
          var aoo =a;
        }else {
          var aoo =b;
        }
    模块化开发怎么做？
      方法一:使用立即执行的匿名函数创建作用域
        var module1 =(function(){
          //code
        })();
      方法二:使用JS对象方式创建命名空间
        var module1 ={}
        module1.aoo =12;
        module1.foo =function(){
          console.log(1);
        }
    什么是Cookie 隔离？(或者说：请求资源的时候不要让它带cookie怎么做)
      如果静态文件都放在主域名下,那静态文件请求的时候都带有的cookie的数据提交给server的,浪费流量,所以需要隔离开.
      因为cookie有域的限制,因此不能跨域提交请求,故使用非主要域名的时候,请求头中就不会带有cookie数据,
      这样可以降低请求头的大小,降低请求时间,从而达到降低整体请求延时的目的.
      同时这种方式不会将cookie传入Web Server,也减少了Web Server对cookie的处理分析环节,
      提高了webserver的http请求的解析速度.
    如何判断一个变量是否为null
      var aoo = null;
      if(aoo === null) {
        alert("is null");
      }
    使用JS改变 <input type="range" name="" value=""> 的值,不会触发input事件?
    习题及精解
      根据以下代码 编写第一个for循环,使用第二个for循环分别输出 0,1,2,3,4
        var list=[];
        for(var i = 0; i < 5; i++) { //code }
        for(var j = 0; j < 5; j++) { list[j](); }
        解1
        var list=[];
        for(var i = 0; i < 5; i++) {
          list[i] =(function(){
            var a =i;
            return function(){ console.log(a) }
          })();
        }
        for(var j = 0; j < 5; j++) { list[j](); }
        解2
        var list=[];
        for(let i = 0; i < 5; i++) {
          list[i] =function(){
            console.log(i);
          };
        }
        // console.log(list);
        for(var j = 0; j < 5; j++) { list[j](); }
  技巧 综合 总结 
    JS使用技巧
      函数绑定
        e.g. :
        var aoo ={
          message:"abc",
          click:function(e){
            alert(this.message);
          }
        }
        var btn =document.getElementById("myBtn");
        btn.onclick =function(){
          aoo.click();
        }
    知识点综合
      length
        PS:字符串和数组 有length属性
          String的length属性不可手动更改
          Array的length属性可以手动更改
        e.g.
          var arr =[1,2,3,4,5]
          arr.length =7;
          arr;              //[1, 2, 3, 4, 5, undefined × 2]
          arr.length =3;
          arr;              //[1, 2, 3]
    编程小技巧
      使用中间量来承接值
        e.g. 实现 applyCompare 函数
          参数如下
          expression 是一个 数组, 包含了 3 个元素
          第一个元素是 op, 值是 '>' '<' '==' 其中之一
          剩下两个元素分别是 2 个数字
          根据 op 对数字运算并返回结果(结果是 true 或者 false)
          var applyCompare = function(expression) {
            var op = expression[0]
            var a = expression[1]
            var b = expression[2]
            // 使用变量op、a、b来承接值——数组中的三个值
            if(op == '<') {
              return a < b
            }
            if(op == '>') {
              return a > b
            }
            if(op == '==') {
              return a == b
            }
          }
          总结使用中间变量来承接值的优点:
            减少重复的输入
            方便更改,如更改条件将数组中的第二个元素为op,更改函数更容易.
  
      当一个值a为布尔值时,开关其值
        即当其为true时改为false,为false改为true
        a = !a;
    自我总结:
      当程序的执行为按先后执行的流程时,需要考虑到某些语句未执行的情况.
        e.g. 判断一个数组中是否存在数字1.
          function func(arr){
            var len = arr.length;
            for(var i = 0; i < len; i++) {
              if(arr[i]-1==0) {
                return true;
              }
            }
            //需要考虑到for未执行的情况,当数组为空时,for不执行.
            // 在for后面加一个return false来执行arr为空的情况
            // 考虑到for执行而if未执行的情况
            // 考虑到for和if都执行的情况.
            return false;
          }
  
      调试报错总结
        html中JS代码的放置位置问题.
        当调试程序中出现错误如: Uncaught TypeError: Cannot read property...,原因是js代码在执行前未加载到,则须将js的引入标签放到body尾部,
  
        未正确获取到html元素
           Cannot read property 'insertAdjacentHTML' of null
  
      js中起名的问题
        var discount = function(price, grade) {
          var gradeobj = {'小学生':0.5,'初中生':0.6,'高中生':0.7,'大学生':0.8,'研究生':0.9,undefined:1}
          return gradeobj[grade]*price;
        }
        discount(10,'小学生')
        // 5
        //将gradeobj的名字取为grade-obj则程序报错.
  
      二维数组arr的问题
        当arr的长度一定后(或存在具体的二维的arr时),可使用arr[][]进行值的访问和对数组进行a[][]=XX 形式的修改
          e.g.  var arr=[ [0, 9, 0, 0], [0, 0, 9, 0], [9, 0, 9, 0], [0, 9, 0, 0], ]
            arr[0][0];//0,可访问值
            arr[0][0]=2;
            arr;//[ [2, 9, 0, 0], [0, 0, 9, 0], [9, 0, 9, 0], [0, 9, 0, 0], ]   //可修改值
        当arr未固定时,不可进行arr[][]的修改或arr[][]形式的访问未定义的值
          e.g. var arr=new Array()
            arr[0][0];  //报错
            arr[0][0]=1;  //报错
        创建长度不定的二维数组
          var arr = new Array();   //先声明一维
          for(var i=0;i<n;i++){    //一维长度为n
            arr[i]=new Array();    //声明二维
            for(var j=0;j<m;j++){  //二维长度为m
              arr[i][j]="";        //将变量初始化为空,后面在用所需的值覆盖里面的值
            }
          }
  
      自我总结特殊点
        JS
          var box=setInterval(function(){
            alert("abc");
          },1000)
          // 该语句会直接执行
  
        html
          <script type="text/javascript">
            function a(){
              location.href ='https://www.baidu.com'
            }
          </script>
          <a href="javascript:a()">XXX</a>
          // 在网页中点击链接XXX 会跳转到百度去.
  
      使用JS配合CSS的transition来产生动画,
        先在元素的CSS中定义transition来'监听变化',
        再动态的给一个元素添加一个class,使其某个属性发生变化,从而达到动画效果,而非直接到结果.
        注意:不可使元素从无到有的进行过渡,如将display:none;换成visiblity:hidden;
    页面间传递信息
      方法一:使用 sessionStorage 或 localStorage 来存取需传递的信息
      方法二:使用 锚点来存取需传递的信息
    高阶函数传参的问题
      方法一:默认函数 不够灵活,相当于固定了参数
      方法二:将高阶函数的参数和高阶函数一起作为参数传递  [完美解决!]
  JS代码规范 ----20170316 [self] 
    暴露的变量 统一采用前缀 Z
    采用 对象模块的形式切分JS代码
      初始化模块  必选
      入口函数    必选
      保存模块    可选
    采用 函数封装 + 公用变量统一存放在 Zpub 对象中
  ---------------------------------------------------------------------以下待整理
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
  
    "偷"的代码
      得到上传文件的地址(并非直观可见的地址)
        function getFileURL(argu) {
          var url =''
          var file = null
          if(argu.files && argu.files[0] ){
            file = argu.files[0]
        console.log(argu)
        console.log(argu.files)
        console.log(argu.files[0])
          }
          url = window.URL.createObjectURL(file)
        console.log(typeof url)
          creatFile(url)
         }
  
         //根据指定URL创建一个对象,比如选择 音频 创建 音频
        function creatFile(url){
          var textHtml =  "<audio src='"+url+"' controls> </audio>"
          $(".mark").after(textHtml);
        }
        <body>
            <div  id="show">
                <div class="mark"></div>
            </div>
        <br>
        <input type="file" value="" onchange="getFileURL(this)">
        </body>
  
    view 视口 移动端
  
  
    window.location = canvas.toDataURL("image/png")
    将整个页面设置为画布绘制后的图像
  
    使用画布将彩色视频变成黑白
      谷歌浏览器的安全策略在本地运行失败
      <video  id="video" width="720" height="480" src="鸿星尔克.mp4" controls=""></video>
      <canvas id="buffer" width="720" height="480"></canvas>
      <canvas id="display" width="720" height="480"></canvas>
  
      var video =document.getElementById('video')
      var bufferCanvas =document.getElementById('buffer')
      var displayCanvas =document.getElementById('display')
      video.load()
      video.addEventListener("play",processFrame)
      function processFrame(){
        if(video.paused || video.ended) {
          return;
        }
        var buffer =bufferCanvas.getContext("2d");
        var display =displayCanvas.getContext("2d");
        buffer.drawImage(video,0,0,bufferCanvas.width,bufferCanvas.height);
        console.log(buffer)
        var frame =buffer.getImageData(0,0,bufferCanvas.width,bufferCanvas.height);
        var length =frame.data.length/4;
        for(var i =0;i<length;i++){
          var xhr =frame.data[i*4+0];
          var g =frame.data[i*4+1];
          var b =frame.data[i*4+2];
          noir(i,xhr,g,b,frame.data);
        }
        display.putImageData(frame,0,0);
        setTimeout(processFrame,0)
      }
  
      function noir(pos,xhr,g,b,data){
        var brightness =(3*xhr +4*g +b) >>>3;
        if(brightness <0) {
          brightness = 0;
        }
        data[pos*4 +0] =brightness;
        data[pos*4 +1] =brightness;
        data[pos*4 +2] =brightness;
      }
  
    includes 比 indexOf 兼容性好
  
    当逻辑复杂时,可以通过添加属性如class或调整CSS来简化JS逻辑复杂程度

    检测浏览器 [?]
      $.support.mozilla && $.support.version >= "1.8" 
      $.support.safari
      $.support.chrome
      $.support.camino
      $.support.opera
      $.support.msie && $.support.version <= 6 // Target IE6 and below
      $.support.msie && $.support.version > 6  // Target anything above IE6


