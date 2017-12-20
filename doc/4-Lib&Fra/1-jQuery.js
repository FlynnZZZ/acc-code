jQuery: 快速简洁的JS库 
  PS: 提供了DOM操作、AJAX封装和、兼容性等功能; 2.0+版本不再支持IE8-  
    在jQuery中 $ 等价于 jQuery,$为快捷方式;
  核心特性总结:  
    命名清晰精简,
    链式语法: 一条语句同时设置一个或多个节点两个或两个以上的操作  
    具有高效灵活的CSS选择器,并且可对CSS选择器进行扩展；
    便捷的插件扩展机制和丰富的插件
    兼容各种主流浏览器,如IE6+ 
    操作即便不存在的jEl也不会报错 
      $("#aoo").css("height"); 即使$("#aoo")不存在也不会报错;
      且$("#aoo")仍为一个对象,
      if ($("#aoo")) { } 不可用来做为节点是否存在的判断,
      可使用$("#aoo").length 或 $("#aoo")[0] 来判断
  安装引入 
    $ npm i -S jquery 
  jQuery配置 
    jQuery.noConflict()   指定jQuery代理
      var jq = jQuery.noConflict(); 自定义快捷方式为'jq'
    jQuery(function(jq){
      // 此作用域中,jq 等价于 jQuery
    })
    (function(jq){
      // 此作用域中 jq 等价于 jQuery
    })(jQuery);
DOM操作 
  PS: jQuery元素对象: 使用JQ方法获取的HTML元素,通过jQuery包装DOM对象产生的对象 
    jEl 类似于数组,未获取到元素则为空数组, 数组中每个元素为原生JS的DOM元素对象;
  jEl 创建 
    var jEl = $(HTMLStr)  通过HTML创建jEl
    jEl.clone([bool]) 复制元素
      bool   布尔值,默认为false,若为true,则复制 Event 和 Data
  jEl 获取 
    $("selector")  通过选择器获取jEl 
      PS:等价于 jQuery("selector"); 
      selector 选择器,可为组合选择器,CSS选择器几乎可全部适用 
      :xx  筛选  
        Example:
          $('.a:first')    // 获取第一个.a元素
          $('#a :first')   // 获取 #a 内的第一个元素
          $('#a p:first')  // 获取 #a 内的第一个p元素
        :first 第一个元素
        :last  最后一个元素 
        :even  下标为偶数的[实质上第奇数个元素被选中] 
        :odd   下标为奇数的[实质上第偶数个元素被选中] 
        :eq(n) 指定下标的元素 
          Example: 
            $("p:eq(1)"); 选择第二个p元素 
        :gt(n) 下标大于n的元素
        :lt(n) 下标小于n的元素
        :only-child  唯一子元素 
        :nth-child(index/even/odd/equation) 下标/偶数/奇数/xn+m表达式
        :first-child 第一个子元素
        :last-child  最后一个子元素 
        :input    所有input、textarea、select、button等元素
        :text     单行文本框
        :password 密码框
        :radio    单选框
        :checkbox 多选框
        :submit   提交按钮
        :image    图像按钮
        :reset    重置按钮
        :button   按钮
        :file     上传域
        :visible  可见的元素 
        :hidden       所有 display:none visibility:hidden type='hidden' 的元素
        :animated 当前处于动画状态的元素
        :focus        当前所用获取焦点的元素
        :enabled    可用元素
        :disabled   不可用
        :checked    被选中 [单选框、复选框]
        :selected   被选中 [下拉列表]
        :empty      内容为空的元素
        :parent     含有子元素或文本的元素
        :header     标题元素,h1、h2...
        :contains(str)  内容包含字符str[相当于判断 innerText 包含]
          Example: 
            $("div:contains(abc)");  // 选取所有内容包含abc的div元素 
        :not(selector) 非选择器
          selector 为所有jQuery支持的选择器
          Example: 
            $("li:not(li:first)") 
            $('.mask-selected:not(.none)')
        :has(selector) 元素包含后代元素selector对应的元素
          Example:
            <div class="aoo "> 1</div>
            <div class="aoo boo"> 2
              <div class="boo">
                11
              </div>
            console.log( $('.aoo:has(.boo)').is($('.aoo').eq(1)) ); // true
      []   属性选择器
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
      组合 
        > 子元素 
          $("#playlist > li") 
        * 通配
        , 多选
        + 同级后一元素 
          J(".one+div") <=> J('.one').next('div')
        ~ 同级后面元素 
          J('.one~div') <=> J('.one').nextAll('div')
      其他 
        Xpath选择器 [1.2 版本去掉]
      '\\'选择器中的特殊字符转义 
        <div id="aoo#boo"> </div>
        $('#aoo#boo');   正确为  $('#aoo\\#b');
      特殊值 
        $('html') 等价于 document.documentElement
        $('head') 等价于 document.head
        $('body') 等价于 document.body
        $(window)   浏览器显示网页内容的部分
        $(document) 整个网页文档流
        $("body")   就是body
      自定义筛选器 
        PS:jQuery的选择符解析器首先会使用一组正则表达式来解析选择器,
          然后针对解析出的每个选择符执行一个函数,称为选择器函数,
          最后根据这个选择器函数的返回值[true或false]来决定是否保留该元素
          已存在的筛选器有 lt、gt、eq 
        'gt'筛选器实现原理分析 
          $('div:gt(1)')  
          该选择器首先获取所有<div>元素,然后隐式遍历并逐个将<div>元素和'1'作为参数,
          传递给gt对应的选择器函数进行判断,若函数返回true,则保留该<div>元素,否则不保留, 
          最终得到一个符合要求的<div>元素集 
          :gt() 选择器在jQuery源文件中的代码
          gt : function(a,i,m){
            return i>m[3]-0
          }
          参数说明 
          a  指向当前遍历到的DOM元素 
          i  当前遍历到的DOM元素的索引值 
          m  一个数组
            m[0]  表示选择器进一步将要匹配的内容,如 $('div:gt(1)')中的':gt(1)'部分 
            m[1]  选择器引导符,如 $('div:gt(1)')中的':',用户还可自定义其他选择器引导符 
            m[2]  选择器函数,如 $('div:gt(1)')中的'gt' 
            m[3]  选择器函数的参数,如 $('div:gt(1)')中的'1' 
            m[4]  
        自定义一个'between'选择器
          如 $('div:between(2,4)') 实现获取索引值为3、4 元素的功能 
          构建选择器函数
          var foo = function(a,i,m){
            var temp = m[3].split(","); // 将传递的参数转成一个数组
            return temp[0]-0<i && i<temp[1]-0 
          }
          ;(function ($){  // 在函数前加';'避免被其他未加';'的代码影响 
            $.extend($.expr[':'],{
              between : foo
            })
          })(jQuery);
          选择器仅仅是 jQuery.expr[':'] 对象的一部分,可直接扩展 
    var jEl = $(elem)  通过elem获取,返回jEl 
        Example: $(document); // 获取整个文档
    通过jEl获取 
      $('selector',jEl)  在jEl中查找'selector'
      ★自身条件筛选 
      jEl.first()   jEl,jEl的第一个  
      jEl.eq(index) 下标选取 
        index为整数,指示元素的位置[从0开始]
        若是负数,则从集合中的最后一个元素往回计数。
      jEl.not('selector'/jEl) 非筛选 
      jEl.not(function(idx){  // jEl,用于检测集合中每个元素的函数 
        $(this) jEl集中的当前jEl  
        return bol; // 是否排除当前jEl  
      }); 
      jEl.has('selector');   包含筛选 
      jEl.filter('selector');   相等筛选  
      ★层级关系筛选 
      jEl.parents(["selector"])  所有祖先元素
      jEl.closest("selector")    最近的第一个祖先元素
      jEl.parent(["selector"])   父级及以上的一个元素  [无参时,为父元素]
      jEl.siblings(["selector"]) 从同级元素中获取jEl [无参,为所有同级元素]
      jEl.prev(["selector"])   同级前一个元素 [无参时,为同级前一元素]
      jEl.prevAll("selector")  同级前所有元素
        获取到的元素在集合中为从后向前排列;
      jEl.next(["selector"])   同级后元素 [无参时,为同级后一元素]
      jEl.nextAll("selector")  同级后所有元素
      jEl.andSelf("selector")  获取指定元素后边的所有同级元素,之后加上指定的元素
      jEl.find('selector')        从后代元素中获取jEl
        自身jEl若find自己则获取不到
      jEl.children(['selector'])  和find类似,只是从子元素中获取
      ★属性筛选 
      jEl.offsetParent() 最近的祖先定位元素 
        定位元素指的是position 属性被设置为 relative、absolute 或 fixed 的元素. 
    性能优化
      关于jQuery选择器的性能优先级,ID选择器快于元素选择器,元素选择器快于class选择器 
      因为ID选择器和元素选择器是原生的JavaScript操作,而类选择器不是; 
      
      $('#nav').find('a.home'); // 3 
      $('#nav a.home'); // 2 
      $('.home'); // 1 
      推荐优先使用前两种
      
      为选择器指定范围 
        默认情况下,当把一个选择器传递给jQuery时,它将遍历整个DOM,
        jQuery方法还具有一个未充分利用的参数,既可以将一个上下文参数传入jQuery,
        以限制它只搜索DOM中特定的一部分。
        //糟糕,会遍历整个DOM
        $(".class");
        //建议,只搜索#id元素内
        $(".class","#id");
        
        jQuery选择器的性能比较:
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
  jEl 操作 
    PS: 若操作的元素是从html中获取到的,则位置操作都是移动操作,即原来的就没有了
    转换为原始DOM元素对象elem 
      PS:使用原生JS的方法时,需将jEl转换为elem对象
      var elem = jEl[index]     获取对应下标的DOM元素
      var elemArr = jEl.toArray() 返回DOM元素组成的数组 
      var elemArr = jEl.get()   返回DOM元素组成的数组 
      var elem = jEl.get(num)   获取对应数字的DOM元素 
        num  数值,从0开始,可为负,为负值时,表示第 num+jEl.length 个
    增删改 
      jEl.prepend('htmlCode'/jEl)    内部头部插入参数目标 
      jEl.prependTo("selector"/jEl)  插入参数目标的内部头部 
        将元素/内容content插入到元素内部头部
      jEl.append('htmlCode'/jEl)     内部尾部插入
        也可以将style标签内的css代码添加到head中
      jEl1.appendTo("selector"/jEl2) 被插入到内部尾部 [与append顺序相反]
        Example:
          .aoo{ background-color:pink;}
          $("<b>Hello</b>",{"class":"aoo"}).appendTo("p");
          // 在所有的p标签中添加粗体的Hello,且背景为pink
      jEl.before('htmlCode'/jEl)     将html代码/jEl添加到元素外部头部
      jEl.insertBefore("selector"/jEl) 被插入到外部头部 [与before相反]
        将元素/内容content插入到元素外部尾部 
      jEl.after('htmlCode'/jEl)      外部尾部插入
      jEl.insertAfter("selector"/jEl) 被插入到外部尾部 [与after相反]
        将元素/内容content插入到元素外部尾部  
      jEl.wrap("HTML代码"/jEl)          每个元素外包裹元素
      jEl.wrapAll("HTML代码"/jEl)       所有元素整体外包裹元素
      jEl.unwrap("HTML代码"/jEl)        元素外包裹的元素去除[?]
        Example:
          <a href="#"><div class="aoo"> 123123 </div></a>
          $('.aoo').unwrap('a');
          结果为: <div class="aoo"> 123123 </div>
      jEl.wrapInner("HTML代码"/jEl)     将每个元素的内容包裹
      jEl1.replaceWith("HTML代码"/jEl)  元素1代替为元素2
      jEl1.replaceAll("selector"/jEl2)  元素2代替为元素1 [与replaceWith相反]
        $("HTML代码")/jEl1.replaceAll("selector"/jEl2); 
      jEl.html(str/foo); 设置/获取元素内容
        无参数:以字符串形式返回元素内容,包括HTML标签
        有参数:参数为字符串,将元素中内容替换为字符串,会将HTML标记转换为HTML元素
        当 jEl 包含多个 elem时,则默认将其获取的每个元素的字符串合并为一个字符串.
        和JS中的.innerHTML 相似
      jEl.text(str/foo); 设置/获取元素文本
        无参数:获取元素的内容文本
        有参数:设置元素内容文本
      jEl.remove()   删除元素
        删除该元素和其子元素及以下的所有内容(包括自身标签)
        所有与元素相关的数据也会被删除(event handlers、internally cached data)
        返回值为删除的元素
      jEl.detach()   删除元素[保留绑定事件、附加数据等]
        detach 后的返回值(元素)再添加到其他地方,元素的event事件仍存在.
      jEl.empty()    清空内容
        删除该元素的子元素及以下的所有内容(不包括自身标签)
        返回值为清空后的元素
      jEl.removeAttr('属性名')  删除属性
        Example:
          jEl.removeAttr('class'); 
      jEl.css(arg?)  读写,元素的style样式  
        PS: 设置为行内样式; 获取为计算后的属性 
        Example: 
          jEl.css('height'); //获取元素的高度
          jEl.css("color");  // 获取元素的字体颜色
          jEl.css("color","red"); // 设置元素的字体颜色为红色
        jEl.css(attrArr);  获取多个属性值
          Example:
          jEl.css(["color","font-size"]); 
        jEl.css(attrObj);  设置多个属性
          Example:  
          jEl.css({
            "background-color": "red"
            ,color: "yellow"
          });  
        jEl.css("color",function(index,oldValue){ // 传入函数 
          return val;  // 返回值为属性值 
        }); 
    元素属性 
      ◆添加属性
      jEl.attr();  读写属性值 
        jEl.attr('属性名')     返回选定属性的属性值
        jEl.attr('属性名',str/boolean) 设定选定属性的属性值
          Example:
            jEl.attr('disabled',false); // 取消表单禁用
        jEl.attr(attribute,function(index,oldvalue){...}) 通过函数来操作属性
        jEl.attr({attribute:value, attribute:value ...})  同时设置多组属性值
        Example:
          jEl.attr('class'); // 获取class属性的值
          jEl.attr('data-foo'); // 获取自定义元素属性的值
            注:自定义属性一般设置格式为 data-**="xxxx"
          $('a[href^="http://"]').attr("target", "_blank"); // 在新窗口打开链接
      jEl.prop();  读写属性值,和attr类似 ‹'1.6+'› 
        $(selector).prop(property,value)
        $(selector).prop(property,function(index,currentvalue){...})
        $(selector).prop({property:value, property:value,...})
      prop 和 attr 的区别 
        有的属性写法要求不同,如disabled 和 checked,可写成 disabled = "disabled",
        或单独 disabled 或 disabled=true [HTML5规定,可等于任何字符,最终都为true]
        jEl.attr('disabled') 返回 disabled
        jEl.prop('disabled') 返回 true
        使用prop不会在DOM中反应出来
        Example:
          <input type="checkbox" name="" value="">
          $('#checkbox').on("click",function(e){
            var aoo = $(this).prop('checked');
            var boo = $(this).attr('checked');
            console.log(aoo,boo);
          })
          // true undefined
          // false undefined
          // true undefined
          // false undefined
          // ...
          
          反复切换选中状态
          <input type="text" name="" value="" class="checkbox1">
          <input type="text" name="" value="" class="checkbox2">
          var checkbox1 = $('.checkbox1');
          var checkbox2 = $('.checkbox2');
          var cal = 0;
          var aoo = setInterval(function(){
            if (cal % 2 == 0) {
              checkbox1.prop('checked',true);
              checkbox2.prop('checked',true);
            }
            else {
              checkbox1.prop('checked',false);
              checkbox2.prop('checked',false);
            }
            cal++;
          },1000);
          attr在HTML文档中有'checked'属性开关显示,但在网页视图中无切换显示,
          prop在HTML文档中无'checked'属性开关显示,但在网页视图中有切换显示
          
          <button type="button" name="button">点击我</button>
          $('button').click(function(){
            $(this).css('display','none');
            console.log($(this).attr('style')); // display: none;
            console.log($(this).prop('style'));
            //  CSSStyleDeclaration {0: "display", alignContent: "", alignItems: "", alignSelf: "", alignmentBaseline: "", all: ""…}
          })
      jEl.val(str/foo); 读写值 [实时动态的]
        使用元素
          input元素的value的值 
          textarea 的内容
          select 的 value 值(而非显示值)
        返回第一个匹配元素的 value 属性的值 
      ◆class相关
      jEl.hasClass('className')    检测class类
        返回值类型为Boolean,若存在返回true,否则false.
      jEl.addClass('className')    添加class类
        若为多个元素,则每个元素中都添加该类
      jEl.removeClass('className') 移除class类
        jEl.removeClass("aoo boo"); 移除class aoo 和 class boo
      jEl.toggleClass('className') 开关class类
        若有,则删除;没有,则加上
    元素信息 
      ◆尺寸位置信息 
        $(window) 和 $(document) 的宽高尺寸 
          他们的 .height() .innerHeight() .outerHeight() 都相同
          且为只读,也和其 margin border padding 无关,
          推荐使用 height 来代替 innerHeight、outerHeight 获取; 宽度同理;
          $(window).height()   表示为可视区高度 
          $(document).height() 表示网页的总高度 
      jEl.width([num/foo])   读写元素content的width 
        PS: 当元素display:none;时宽度为0;
        num      用于设置元素的宽度值,单位px
        foo = function(indx,oldWidth){
        }
      jEl.height([num/foo])  读写元素content的height 
        需要设置 height 的值,如单行文字只设置line-height则该方法获取不到数值;
      jEl.innerWidth([num/foo])  读写元素宽,content+padding 
      jEl.innerHeight([num/foo]) 读写元素高,content+padding
      jEl.outerWidth([bool])   元素宽,content+padding+border[+margin] 
        bool  可选,默认为false,是否包括margin的布尔值
      jEl.outerHeight([bool])  元素高,content+padding+border[+margin] 
      jEl.scrollTop()   读写,元素相对滚动条顶部的偏移 
        PS: 此处的jEl为拥有滚动条的元素;
      jEl.scrollLeft()  读写元素相对滚动条左侧的偏移
      jEl.offset([{top:num1,left:num2}]) 读写,元素相对文档左上角的top和left 
        PS: 返回包含top和left属性的对象; 
          元素相对与document的top和left,若需获取到视口则需减去滚动距离;
          此方法只对可见元素有效;
        Example:
          $(".a").offset(); // {top: 24, left: 0}
          $(".a").offset().left = 20; // ? 
          $( "p:last" ).offset({top:10,left:30}); // 使用此方法进行 写操作
      jEl.position()  元素相对于其offsetParent的top和left [只读?]
        PS:只对可见元素有效
        Example:
          .parent{
            position: relative;
          }
          .child{
            position: absolute;
            top: 10px;left: 20px;
          }
          <div class="parent"> <div class="child"></div> </div>
          var pos = $('.child').position();
          console.log(pos); //  Object {top: 10, left: 20}
      ◆自定义数据
      jEl.data(key,value) 绑定自定义数据 [DOM中无任何变化]
        Example:
        $('#box').data('name', 'TG'); 
      jEl.data(key)       读取自定义数据 
        Example:
          <div class="aoo" data-id='111'> 23423 </div>
          var jEl = $('.aoo');
          var id = jEl.data('id');
          console.log(id); // 111
      jEl.removeDate(key) 移除自定义数据
        Example:
          $('#box').removeDate('name');
      ◆其他信息
      jEl.size()         元素个数
      num = jEl.index([jEl/selector]) 获取元素在其父元素jEl中的下标[从1开始]
        jelem.index();   无参数,返回该元素在同级元素中的索引位置
        Example: 点击获取当前为第几个li 
          <ul>
            <li>aaaaa</li>
            <li>bbbbb</li>
            <li>ccccc</li>
          </ul>
          $("li").click(function(){ 
            console.log( $(this).index()); 
          });
      jEl1.is(jEl2) 判断
        jEl1.is(jEl2) 判断两个节点是否相同
        jEl1.is(":checked") 判断是否被选中
    状态改变 
      jEl.focus();   获得焦点
      jEl.blur();    失焦
      jEl.click();   点击元素 [会触发事件]
      jEl.select();  选中文字 
        选中如input、textarea等元素类的文字,
        不可选中因增加contenteditable属性而可编辑的元素的文字;
    性能优化 
      繁重的操作中分离元素
        若你打算对DOM元素做大量操作（连续设置多个属性或css样式）,
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
    jEl.each(foo)  为每个匹配成员规定执行的函数,返回 
      foo  回调函数,依次传入参数 (indx,elem) 
        其中 elem 为DOMElem,通过 $(elem) 转换为 jEl
        返回 'false' 将停止循环,就像在普通的循环中使用 'break'
        返回 'true' 跳至下一个循环,就像在普通的循环中使用'continue'
      Example:
        jEl.each(function(){ 
          // 输出每个dom元素
          console.log(this); 
          // 输入每个jEl
          console.log($(this)); 
        })
        
        $('.todo-cell').each(function()){ 
          console.log(arguments) 
        }
        或写成
        $('.todo-cell').each(function(i,e)){ 
          console.log(i,e) 
        }
  Animation 动画 
    time   数值,过渡的时间,单位毫秒,默认一般为0 
      number  如 1500 
      "normal"
      "slow"
      "fast"
      "swing"    
      "linear"   匀速
    cfoo   回调函数,在动画执行完后调用 
    ◆可见性变化 
    jEl.show([time] [,cfoo])   'height'&'widht'&'opacity'恢复到原始
    jEl.hide([time] [,cfoo])   'height'&'widht'&'opacity'过渡到0 
    jEl.toggle([time][,cfoo])  切换'show'和'hide'
    jEl.fadeIn([time] [,cfoo])      'opacity'从0过渡到1 
    jEl.fadeOut([time] [,cfoo])     'opacity'从1过渡到0  
    jEl.fadeToggle([time] [,cfoo])  切换'fadeIn'和'fadeOut' 
    jEl.fadeTo(time,opacity,cfoo) 透明度过渡到指定值'opacity' 
      opacity   透明度,0-1 之间取值
    ◆尺寸变化
    jEl.slideDown(time,cfoo)   向下'height'从0展开到初始值 
    jEl.slideUp(time,cfoo)     向上'height'从原始值收缩到0 
    jEl.slideToggle(time,cfoo) 切换'slideDown'和'slideUp' 
    ◆自定义变化 
      当定义样式的值时,单位默认为'px',如 '100px'或'100'等价
    jEl.animate(finalStyle[,time][,duration][,cfoo])  定义变化及变化的过程 
      {  // 必须,元素的最终样式状态,由样式声明属性和其值组成的对象 
        styleAttr : styleVal,
        // styleAttr 由'-'连接改为驼峰写法,如 'font-size'改为'fontSize'
        // styleVal 可通过 -=、+= 等在原值上进行便捷计算 
        //   $(".aoo").animate({
        //     width:"+=10px", // 在原来的基础上加10px
        //     height:"-=100%"
        //   },1000)
        ... 
        非CSS样式的属性列举 
          scrollTop 定义滚动条的滚动距离
            $('.aoo').animate({
              scrollTop : '+=33'
            },100)
      }
      time       可选,执行时间 
        number    毫秒,如 1500
        "normal"  默认值
        "slow"
        "fast"
      duration   延时 
      cfoo       执行结束的回调 
    jEl.animate(finalStyle,options)    定义变化及变化的过程  
      {   // 最终样式 
        left : 100
      }
      {   // 配置选项 
        duration: 1000, // 延迟 
        step: function(now,fx){ 
        },
        complete: foo,  // 动画执行完成后的回调 
      }
    jEl.stop([bool1] [,bool2]) 停止动画 
      bool1  默认为false,是否清空未执行完的动画队列 
      bool2  默认false,是否将动画调到最后状态 
    jEl.delay(time)            延缓动画 
      Example:
        $('#aoo').animate({
          width : '+=30'
        },1000)
        .delay(500)
        .animate({
          height : '+=30'
        },1000)
    ◆其他
    $.fx.off = true   禁用jQuery动画效果[关闭所有网页特效]
    $.fx.interval     读写动画的频率,单位毫秒 
    Example:
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
    动画队列 : 将一元素的多个动画按顺序书写,会按顺序执行,而非同时执行 
      或使用链式操作,也会按顺序执行[前一个动画执行完了,才会执行下一个] 
    var bol = jEl.is(':animated') 判断元素是否处于动画状态 
  新奇用法 
    $(this)[bol?'removeClass':'addClass']('redColor');
    等价于 
    bol?$(this).removeClass('redColor'):$(this).addClass('redColor') 
工具方法 
  ◆遍历相关 
  $.each(obj,function(key,val){ // 对象遍历 
    key  当obj为数组时,key表示下标 
  })  
  $.map(arr,function(val,idx){  // arr,遍历得到返回值组成新的数组 
    return xxx;
    Example:
      var foo =[1,2,3,4]
      var a =$.map(foo,function(v){
        return v*v
      })
      a;    //[1, 4, 9, 16]
  })     
  $.grep(arr,function(val,idx){ // arr,遍历筛选,返回符合条件的成员组成的数组 
    return bol; // 是否包含该元素 
    Example:
      var foo =[1,2,3,4,5];
      var arr =$.grep(foo,function(val,indx){
        return val % 2 == 0;
      })
      arr;      //[2, 4]
  })    
  ◆数组相关 
  $.isArray(val)  // bol,是否为数组
  $.inArray(item,arr)  // num,元素在数组的位置,不存在返回-1 
  $.merge(arr1,arr2)   // arr,合并两个数组 
  $.unique(arr)    // arr,去除后续重复元素
  $.makeArray()        将对象转化为数组 
  ◆字符串相关 
  $.trim(str)  // str,去除字符串首尾空格[不能删除字符串中间的空格] 
    Example:
      $.trim('a bc '); // "a bc"
  $.stringify({obj}) 序列化为JSON
  $.parseJSON(jsonStr) 解析JSON字符串 
  $.parseXML(str) 解析一字符串到一个XML文件 
  ◆其他检测相关 
  $.type(val) // str,判断JS对象的类型[函数对象、日期对象、数组对象、正则对象等] 
  $.isNumberic(val)   // bol,是否为数值  
  $.isFunction(obj)   // bol,是否为函数 
  $.isEmptyObject(obj)  // bol,对象是否为空 
  $.isPlainObject(obj)  // bol,对象是否为原始对象 
    检测对象是否为通过{}或new Object()关键字创建的原始对象
  $.isWindow(obj)     // bol,是否为window对象 
  $.contains(elem1,elem2) bol,检测elem1中是否包含elem2 
    elem1  一个DOM对象节点元素,用于包含其他节点的容器
    elem2  另一个DOM对象节点元素,用于被其他容器所包含 
  ◆jQuery扩展 
  $.extend (options)       扩展jQuery类本身
    PS:扩展静态方法,自定义类级别的jQuery插件;等价于 $.xxx = function(){};
    options 对象,表示自定义插件的函数内容 
      在方法中'this'表示的是'$'
      $.extend({
        foo : function(){
          console.log(1);
        }
      });
      $.foo(); //1
    Example:
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
      
      $.extend({
        add : function(a,b){
          return a+b;
        },
        a :'aaaa'
      });
      console.log($.add(3,4)); // 7
      console.log($.a);        // aaaa
      $.add2 = function(a,b){
        return a-b;
      }
      console.log($.add2(4,3)); //1
  $.extend(target,obj1,obj2,..)  和并多对象 
    PS:在扩展对象时,两个对象将进行合并,当存在相同属性名时,后者将覆盖前者 
    target 用于扩展并返回的目标对象 
    obj    表示需要合并的各个原有对象
    Example:
      对两个已有的对象进行合并 
      var target = {
        aoo : 1 ,
        boo : 2 
      }
      var obj2 = {
        aoo : 3 ,
        coo : 2 
      }
      var obj = $.extend(target,obj2);
      console.log(obj,obj===target); // Object {aoo: 3, boo: 2, coo: 2}  true 
      
      扩展String对象的方法
      $.extend(String.prototype,{
        isInteger : function(){
          return (new RegExp(/^\d+$/).test(this))
        }
      })
  $.fn.extend(options) 扩展实例方法
    PS:等价于 $.fn.xxx 
    options 配置对象
      key : foo
      在函数中'this'指向的为调用的jEl
    Example: 
      $.fn.extend({
        foo : function(){
          console.log(2);
        }
      });
      $("div").foo(); //2
  $.sub()  创建jQuery副本,不影响原有jQuery对象避免jQuery冲突 
    (function (){
      var sub = jQuery.sub();
      sub.fn.foo = function(){
        return 'just for me'
      };
      sub(document).ready(function(){
        sub('body').foo(); // just for me 
      })
    })();
  ◆其他方法 
  $.proxy(foo,thisArg)  指定函数foo中this的指向 
    <button id="btn1">btn1</button>
    <button id="btn2">btn2</button>
    $('#btn1').on("click",function(e){
      var that = this; 
      $('#btn2').animate({
        width : '+=20'
      },200
      ,(function(){
        $(that).fadeOut(200)
      })
    })
    等价于 
    $('#btn1').on("click",function(e){
      $('#btn2').animate({
        width : '+=20'
      },200
      ,$.proxy(function(){
        $(this).fadeOut(200)
      },this))
    })
  $.holdReady()   暂停或恢复'ready'事件的执行 
  $.Callbacks()   回调列表对象,可用来管理回调函数 
  已废弃 
    $.browser 对象 获取浏览器的名称与版本信息 [1.9-] 
      PS:'1.9版本'被移除,因识别方法不准确,现已作为一插件存在 
      $.browser.chrome  为 true 表示当前为Chrome浏览器
      $.browser.mozilla 为 true 表示当前为火狐浏览器
      $.browser.msie    为 true 表示当前为IE浏览器
      $.browser.version 获取浏览器版本信息
    $.support 浏览器检测 [1.8-]
      $.support.boxModel 检测浏览器是否属于标准的w3c盒子模型 
        PS:浏览器的盒子模型分为两类,一类为标准的w3c盒子模型,另一类为IE盒子模型,
          两者区别为在Width和Height这两个属性值中是否包含padding和border的值,
          w3c盒子模型不包含,IE盒子模型则包含,
      $.support.mozilla && $.support.version >= "1.8" 
      $.support.safari
      $.support.chrome
      $.support.camino
      $.support.opera
      $.support.msie && $.support.version <= 6 // Target IE6 and below
      $.support.msie && $.support.version > 6  // Target anything above IE6
Event事件 
  PS: jEl绑定事件,则为列表中的每个对象进行了绑定
  ◆事件绑定与取消 
    PS:bind,live,delegate,on;对应解除为 unbind、die、undelegate、off 
      live on delegate 均支持未来新添加元素的事件绑定 [使用委托的方式才会生效]
      bind 只能针对已经存在的元素进行事件的设置；
      bind 在 1.7 版本前比较受推崇之后已不推荐
      live 在 1.9 版本已经删除
  jEl.on(params)   事件绑定 [1.7 版本增加,推荐使用的方式] 
    jEl.on("eName",foo)         常规事件绑定 
      PS:jEl为元素集时,此操作则给每个元素都绑定了事件 
      eName  事件类型、事件名称 
        blur focus load unload resize scroll  click dblclick error 
        mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave 
        change select submit 
        keydown keyup keypress 
        ... 
    jEl.on("eName.xx",foo)      添加事件命名空间,便于管理 
      Example:
        jEl.on("click",function(e){
          console.log(1);
        })
        jEl.on("click.aoo",function(e){
          console.log(2);
        })
        jEl.off('click.aoo')   // 移除 click.aoo 的事件 
        jEl.off('.aoo')        // 移除所有 .aoo 的事件 
        jEl.trigger("click!"); // 触发所有无命名空间的 click 事件 
        jEl.trigger("click");  // 触发所有 click 事件 
    jEl.on("eName1 eName2",foo) 同时多事件绑定 
    jEl.on(paramsObj)           多组事件绑定 
      paramsObj   为一个 eName-foo 的配置对象
        { 
          mouseover:foo1, 
          mouseout:foo2, 
          click:foo3, 
          ...
        }
    jEl.on(str,foo)             自定义事件绑定 
      foo  传入参数  (e,arg1,arg2,..) 
        arg为传递的信息,通过 trigger 触发时配置的数组元素 
      Example:
        $("p").on("aoo",function(e,arg1,arg2){  
          $(this).text(arg1 + arg2);
        });
        $("button").click(function(){
          $("p").trigger("aoo",["abc","123"]);
        });
    jEl.on("eName",val,foo)     事件绑信息定传递 
      obj  对象,传递的信息,通过 e.data 获取 
      Example:
        jEl.on("click",{msg:"You just clicked me!"},function(e){
          console.log(e.data);
        });
    jEl.on('eName',"slct",foo)  事件代理 [可对未来元素进行绑定]
      PS:foo 中 this 表示的为 slct 表示的元素 
        对selector对应的元素上执行事件,才会执行响应函数
        仍需符合冒泡原理,响应元素需为绑定元素的子元素[?]
  jEl.one('eName',foo)   绑定一次性事件 
  jEl.off(['eName1 eName2'] [,slct] [,foo]) 主要解除由on绑定的事件 
    PS: 移除元素上绑定的一个或多个事件的事件处理函数 
    eName  可选,默认移除该元素所有的事件绑定 
      如"click"、"focus click"、"keydown.myPlugin" 
    slct   可选,选择器,若该参数为null或被省略,则表示当前元素自身绑定事件
      (实际触发者也可能是后代元素,只要事件流能到达当前元素即可) 
    foo    可选,指定的事件处理函数 
    todo:
      jEl.off(eventsMap,selector)
        eventsMap  Object类型,event:handler 对象
          若省略参数handler,则移除指定元素指定事件类型上绑定的所有事件处理函数 
        selector 指定的对象(属于jEl的后代元素)
            若省略参数selector,则移除jEl及后代的所用响应函数
            selector 必须与通过on()函数添加绑定时传入的选择器一致 
        若省略了所有参数,则表示移除当前元素及后代元素的所有事件处理函数 
        实际上,off()函数的参数全是筛选条件,只有匹配所有参数条件的事件处理函数才会被移除
        参数越多,限定条件就越多,被移除的范围就越小
        RetValue:
          返回值为jQuery类型,返回当前jQuery对象本身 
  jEl.unbind()   取消绑定
    规定从指定元素上删除的一个或多个事件处理程序 
    若没有规定参数,unbind() 方法会删除指定元素的所有事件处理程序 
    语法
      $(selector).unbind(event,foo)
      event 可选,规定删除元素的一个或多个事件 由空格分隔多个事件值.
      foo   可选,规定从元素的指定事件取消绑定的函数名.若未设置该参数,则会删除绑定到指定事件的所有函数 
    使用 Event 对象来取消绑定事件处理程序 unbind
      规定要删除的事件对象 
      用于对自身内部的事件取消绑定(比如当事件已被触发一定次数之后,删除事件处理程序) 
      若未规定参数,则 unbind() 方法会删除指定元素的所有事件处理程序 
      语法
        $(selector).unbind(eventObj)
        eventObj 可选,规定要使用的事件对象.eventObj参数来自事件绑定函数(即e.target 中的e).
  jEl.eventName(foo)  快捷绑定[bind的简写] 
    ★name可使用的值枚举如下:
    $(document).ready(foo); DOM结构加载完后执行
      简写方式: $(function(){/*jQuery代码*/})
    jEl.load()            元素加载完毕
    jEl.unload()          用户离开页面    
    jEl.click(foo);          单击事件 
    jEl.dblclick()           鼠标双击 
    jEl.mousedown()          按下鼠标
    jEl.mouseenter()         鼠标进入（进入子元素不触发）
    jEl.mouseleave()         鼠标离开（离开子元素不触发）
    jEl.mousemove()          鼠标在元素内部移动
    jEl.mouseout()           鼠标离开（离开子元素也触发）
    jEl.mouseover()          鼠标进入（进入子元素也触发）
    jEl.mouseup()            松开鼠标
    jEl.select()      用户选中文本框中的内容
    jEl.submit()      用户递交表单
    jEl.change(foo);  元素的值或内容发生变化时响应
    jEl.focus(foo); 获得焦点事件
    jEl.focusin()   子元素获得焦点
    jEl.focusout()  子元素失去焦点
    jEl.blur(foo);  失去焦点事件
    jEl.keydown()   按下键盘（长时间按键,只返回一个事件）
    jEl.keypress() 按下键盘（长时间按键,将返回多个事件）
    jEl.keyup()    松开键盘
    jEl.scroll(foo)  元素滚动条滑动事件
    jEl.resize() 浏览器窗口的大小发生改变 
    jEl.hover(foo1 [,foo2]); 悬浮事件[jQuery合成事件] 
      PS: 
      foo1  进入悬浮时回调  
      foo2  可选,离开悬浮时回调 
    jEl.toggle(foo1,foo2 [,foo3,..]);  点击依次执行函数[jQuery合成事件 1.9 版本移除] 
  ◆事件绑定检测
  jEl.data('events')[ename]         [1.8 版本以下]
  $._data(jEl[0],'events')[ename];  [1.8 版本以上]
  事件绑定性能优化 
    正确使用事件委托 
      $('#t').find('td').on('click', function () {  
        $(this).css({ 
          'color': 'red', 
          'background': 'yellow' 
        });  
      });
      这样会为每个td绑上事件,在为100个单元格绑定click事件的测试中,
      两者性能相差7倍之多,好的做法应该是下边写法:
      $('#t').on('click', 'td', function () {  
        $(this).css({ 
          'color': 'red', 
          'background': 'yellow' 
        });  
      }); 
  触发事件 
    jEl.trigger("eName" [,arr]);   触发事件及信息传递 
      PS:会触发事件的默认行为 
      eName   必需,指定触发的事件 
      arr     数组,可选,传递到事件处理程序的额外参数 
        $("p").on("aoo",function(e,arg1,arg2){  
          $(this).text(arg1 + arg2);
        });
        $("button").click(function(){
          $("p").trigger("aoo",["abc","123"]);
        });
        改写为对象及单参数的方式
        $("p").on("aoo",function(e,arg){  
          $(this).text(arg.aoo + arg.boo);
        });
        $("button").click(function(){
          $("p").trigger("aoo",[{
            aoo : 'abc',
            boo : '123'
          }]);
        });
      Exp: 
        使用 val() 改变 select 的值,不会触发其 change 事件
    jEl.triggerHandler()     触发事件但不触发默认行为 
    jEl.eventName();   快捷触发 
      jEl.click();  触发点击 
        PS:不会产生鼠标点击的效果,如下拉选项不会弹出
  Event 对象 
    PS: jQuery在遵循W3C规范下,对event事件对象的常用属性进行了封装,
      使得事件处理在各大浏览器下都可以正常的运行而不需要进行浏览器类型判断。
    e.type 获取事件的类型[jQuery封装属性]  
    e.preventDefault()  阻止事件默认行为
      PS:JavaScript中符合W3C规范的 preventDefault()方法在IE浏览器中无效。
        jQuery对其进行了封装,使之能兼容各种浏览器。
    e.isDefaultPrevented()  根据是否调用过'preventDefault'返回布尔值 
    e.stopPropagation() 阻止事件冒泡
      PS:JavaScript中符合W3C规范的stopPropagation()方法在IE浏览器中无效。
        jQuery对其进行封装,使之能兼容各种浏览器。
    e.isPropagationStopped() 根据是否调用过'stopPropagation'返回布尔值
    e.target 获取到触发事件的元素
      PS:jQuery对其封装后,避免了W3C、IE和safari浏览器不同标准的差异.
      Example:
        $("a[href=http://www.jb51.net]").click(function(event){
          alert(event.target.href); //获取触发事件的<a>元素的href属性值
          alert(event.target.tagName); //获取触发事件的元素的标签名称
          return false; //阻止链接跳转
        })
    e.relatedTarget 相关元素 
      PS:标准DOM中,mouseover 和 mouseout 发生的元素通过e.target()来获取,
        相关元素通过 e.relatedTarget 属性来获取 
    e.currentTarget  在事件冒泡阶段中的当前DOM元素 
    e.pageX 获取到光标相对页面的x坐标
    e.pageY 获取到光标相对页面的y坐标
      PS:若没有使用jQuery时,那么IE浏览器中是用 e.x/e.y,
        在IE浏览器中还应该减去默认的2px的边框。
        而在Firefox浏览器中用 e.pageX/e.pageY,
        若页上有滚动条,则还要加上滚动条的宽度和高度。
    e.which 鼠标单击事件中获取到鼠标的左、中、右键,键盘事件中获取键盘的按钮 
      鼠标单击事件中  
        左、中、右键分别对应值 1、2、3 
      e.which == '13' enter,回车键 
    e.metaKey 键盘事件中获取<ctrl>按键 
      PS:针对不同浏览器对键盘中的<ctrl>按键解释不同,jQuery进行了封装,
    e.originalEvent 指向原始的事件对象
    e.data    在事件对象上绑定数据,然后传入事件处理函数 
    e.namespage  事件被指定的命名空间 
    e.result   事件最后触发的处理函数的返回值 
    e.timeStamp   触发事件时距1970年1月1日的毫秒数  
  $(document).ready(foo) 与 window.onload 的区别 
    执行时间
    window.onload       须等到页面内包括图片的所有元素加载完毕后才能执行
    $(document).ready() DOM结构绘制完毕后就执行,不必等到所有内容加载完毕
    编写个数不同
    window.onload       不能同时存在多个,否则会被覆盖 
    $(document).ready() 可以同时编写多个,并且都可以得到执行 
    简化写法
    window.onload 没有简化写法
    $(document).ready(foo) 可以简写成 $(foo)
  jEl.load(foo) 在元素内容加载完毕触发 
    $(window).load(function(){}) 等价于 window.onload = function(){}
  todo 
    禁止右键点击
      $(document).bind("contextmenu",function(e){
        return false;
      });
    自动修改破损图像
      若碰巧在网站上发现了破碎的图像链接,可以用一个被替换的图像来代替。
      添加这个简单的代码可以节省很多麻烦:
      即使你的网站没有破碎的图像链接,添加这段代码也没有任何害处。
      $('img').on('error', function () {
        $(this).prop('src', 'img/broken.png');
      });
    鼠标悬停'hover'切换class属性
      假如当用户鼠标悬停在一个可点击的元素上时,你希望改变其效果,下面这段代码可以在其悬停在元素上时添加 class 属性,当用户鼠标离开时,则自动取消该 class 属性:
      $('.btn').hover(function () {
        $(this).addClass('hover');
        }, function () {
          $(this).removeClass('hover');
        });
      你只需要添加必要的CSS代码即可。若你想要更简洁的代码,可以使用 toggleClass 方法:
      $('.btn').hover(function () { 
        $(this).toggleClass('hover'); 
      });
      注:直接使用CSS实现该效果可能是更好的解决方案,但你仍然有必要知道该方法。
  Exp:
AJAX 
  PS: '1.5.0-'版本返回的是XHR对象,'1.5.0+'版本返回的是deferred对象
  ◆捷径型 
  jEl.load(url[,data][,cfoo]) 加载HTML并将其插入jEl元素中 
    url      请求的地址 
      可使用'url selector'的形式来对获取的HTML进行筛选 
        $('#aoo').load('test.html .boo') 加载'test.html'页面class为'boo'的内容 
    data     可选,发送的数据,当存在参数时使用'POST',否则为'GET'方式
    cfoo     可选,请求完成触发的回调,传入参数 (reponseText,textStatus,xhr) 
      reponseText 请求返回的内容
      textStatus  请求状态,'success' 'error' 'notmodified' 'timeout' 4 种
      xhr         XMLHttpRequest对象 
  $.getScript(url[,cfoo])       请求并执行获取到的JS文件[并不会插入到DOM中,仅运行] 
  $.getJSON(url[,cfoo])  加载并解析JSON文件 
    url    请求加载json格式文件的服务器地址
    cfoo   加载完成后的回调,可选,传入参数 (backData,textStatus,xhr) 
  ◆方法型 
  $.get(url[,data][,cfoo][,type])   GET请求 
    url  请求的地址 
    data 可选,get方法会把data添加到url上,可直接改变url而省略data; 
    cfoo 请求成功时的回调函数,传入参数 (backData,textStatus,xhr) 
      PS:只有当Response的返回状态为success才执行该函数
      backData   返回的数据 
      textStatus 响应的状态,'success' 'error' 'notmodified' 'timeout' 4 种
    type 服务端返回数据的格式 : 'xml' 'html' 'script' 'json' 'text' 'default' 
  $.post(url[,data][,cfoo][,type])  POST请求 
  ◆通用型 
  $.ajaxSetup({  // 设置全局Ajax默认选项  
    PS: 设置Ajax请求的一些全局性选项值,请求未设置则默认使用该值  
      当使用第三方插件时,可能导致问题 
    选项同 $.ajax 
  })  
  $.ajax({        // jQuery中最底层的AJAX实现 
    PS: 在回调函数中,'this'表示该次AJAX请求的参数对象 
    url: url  // 发送的请求地址,默认:当前页地址  
    ,type: str  // 请求方式,默认:"GET"      
      'GET'   键值对将自动改为查询字符串附在URL后 
      'POST'
      'PUT'
      'DELETE'
      ...
    ,contentType: str // 请求信息的内容编码类型  
      'application/x-www-form-urlencoded'  默认值,表单提交  
      'application/json'   传输JSON字符串
      'text/plain'         传输字符串
      'multipart/form-data'  适合用于上传文件
      'text/xml'           传输XML 
    ,data: obj/str // 请求数据 
      obj   键值对 
        当值为数组时,将指定多个值对应一个键  
          {aoo : ['a1','a2']} 相当于 '&aoo=a1&aoo=a2'
      str   查询字符串 
        如 'username='+encodeURLComponent(val1)+'&content='+encodeURLComponent(val2)
    ,crossDomain: bol // 是否可跨域,默认:false 
    ,xhrFields: {  // 设置xhr对象 
      withCredentials : true  // 请求是否带cookie
    },  
    ,headers: {  // 设置请求头信息 
      // 信息头中的设置优先级高于'beforeSend'函数范围内的设置 
    }   
    ,dataType: str  // 预期响应数据的类型 
      PS:默认根据HTTP包MIME信息返回reponseText或reponseXML,作为回调函数参数传递 
      'xml'    XML文档,可使用jQuery处理 
      'html'   纯文本HTML信息,包含的script标签在插入DOM时执行 
      'script' 纯文本JS代码,
      'json'   JSON数据 
      'jsonp'  JSONP格式
        如'url?callback=xx',jq将自动替换'xx'为正确函数名,以执行回调 
      'text'   纯文本字符串 
    ,timeout: num // 请求超时设置,单位:ms 
    ,cache: bol  // 是否缓存,默认:true  
      // 当dataType为'script'和'jsonp'时,默认为false
    ,async: bol  // 是否异步请求,默认:true 
      // 跨域请求和 dataType:'jsonp'请求不支持同步操作 
    ,global: bol  // 是否触发全局事件'ajaxStart'和'ajaxStop',默认true 
    ,xhr: function(){ // 用于重写或提供一增强的xhr对象 ['1.3+'] 
      var xhr = new XMLHttpRequest();
      // 其他操作,如监听上传、下载进度 
      //Upload progress
      xhr.upload.addEventListener("progress", function(evt){
        if (evt.lengthComputable) {
          var percentComplete = evt.loaded / evt.total;
          console.log(percentComplete);
        }
      });
      //Download progress
      xhr.addEventListener("progress", function(evt){
        if (evt.lengthComputable) {
          var percentComplete = evt.loaded / evt.total;
          console.log(percentComplete);
        }
      });
      return xhr; // 返回一xhr 
    }     
    ,beforeSend: function(xhr){ // 请求发送前回调 
      xhr  XMLHttpRequest对象 
      return bol; // 是否允许本次请求  
    }  
    ,dataFilter: function(data,type){ // 对响应的原始数据进行预处理
      data   响应的原始数据 
      type   AJAX提供的'dataType'参数 
      return '111'; // 返回最终的响应数据  
    }   
    ,success: function(data,textStatus,xhr){ // 请求成功后的回调  
      data  由'dataType'参数处理后的响应数据  
      // 可能是 xmlDoc,jsonObj,html,text等
    }    
    ,error: function(xhr,textStatus,errorTrown){ // 请求失败后的回调 
      errorTrown  捕获的错误对象 
    }     
    ,complete: function(xhr,textStatus){ // 请求完成后的回调 
      PS: 失败或成功都会执行 
    }   
    ,jsonp: 'foo' // jsonp请求中,重写回调函数名  
      // 用来代替在'callback=xx'GET或POST请求中的'callback'部分 
    ,jsonpCallback: function(){ // 为JSONP请求指定回调函数 
      // 将用来取代jQuery自动生成的随机函数名 
    },  
    ,statusCode: { // 为不同的响应状态码指定响应函数 
      404: function(){   // 为响应状态'404'指定回调 
        console.log('page not found');
      }
    }    
    ,username: 'aaa'  // 用于响应HTTP访问认证请求的用户名 
    ,password: '111'  // 用于响应HTTP访问认证请求的密码 
    ,processData: bol  // 是否处理请求数据'data',默认:true
      默认情况下,通过data选项传递进来的数据,都会处理转化成一个查询字符串,
      以配合默认内容类型 "application/x-www-form-urlencoded" 
      如果要发送 DOM 树信息或其它不希望转换的信息,可设置为 false 
    ,accepts: {}   // 内容类型发送请求头
      // 告诉服务器什么样的响应会接收返回 
      // 若accepts设置需修改,推荐在 $.ajaxSetup() 中设置
    ,contents: {}  // 用来确定jQuery如何解析响应,给定其内容类型
      // 以'{字符串:正则表达式}'匹配的对象 
    ,context: {}   // 用于设置AJAX相关回调函数的上下文
      // 即让回调函数内的this执行这个对象,默认的this执行AJAX的参数对象 
    ,converters: {}  // 数据类型对数据类型转换器的对象
      // 每个转换器的值是一函数,返回相应的转化值 
    ,ifModified: false  // 仅在服务器数据改变时获取新数据,默认'false' 
      // 使用HTTP的'Last-Modified'头信息判断,也会检查服务器指定的'etag'来确定数据是否被修改 
    ,isLocal: false  // 允许当前环境为'本地',如文件系统 [貌似不可用?] 
    ,mimeType: str // 用来覆盖xhr的MIME类型 
    ,scriptCharset: 'utf-8'  // 设置字符集 
      // 只有当'dataType'为'jsonp'或'script',且type是GET时才能修改字符集'charset' 
    ,traditional: bol  // 是否使用传统的方式序列化数据 
  })          
  JSONP跨域,原理上不属于AJAX只是采用了AJAX的写法而已 
    function cfoo123(){   // 和 success 任选一个,否则会执行两次 
      console.log(1111111);
    };
    $.ajax({
      // ... 
      dataType : 'jsonp',
      jsonp : "cfoo123", // 需要在后端有相应的改动,名称需一致
      success : function(arg){ // 和cfoo123 任选一个,否则会执行两次 
        console.log(arg);
      },
      // ... 
    });
  Example: 上传文件
    ajax上传的时候,需要获得input:file 选择的文件(可能为多个文件),获取其文件列表为:
      // input标签的files属性
      document.querySelector("#fileId").files
      // 返回的是一个文件列表数组
    获得的文件列表,然后遍历插入到表单数据当中 即:
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
    上传到服务器之后,获取到文件列表为:
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
  ◆Ajax全局设置及事件 
    PS:cfoo回调函数中,$(this)表示为'jEl' 
  jEl.ajaxStart(cfoo)  Ajax请求发出前响应 
  jEl.ajaxStop(cfoo)   Ajax请求结束后响应 
  jEl.ajaxComplete(cfoo)  每当一Ajax请求完成时触发  
    PS: '1.8+'开始该方法只能绑定到 $(document)
    foo  依次传入参数 (event, xhr, options)
  jEl.ajaxError(cfoo)  Ajax请求发生错误时响应 
  jEl.ajaxSend(cfoo)  Ajax请求发送前响应 
  jEl.ajaxSuccess(cfoo)  Ajax请求成功时响应 
  ◆辅助方法 
  jEl.serialize()   序列化表单元素值 
    PS:将表单中有name属性的元素值进行序列化,生成标准URL编码文本字符串,直接用于ajax请求 
    Example:
      $.get('get1.php',$('#form1').serialize(),function(backData,textStatus){
      })
    不光表单可使用,其他元素也能使用 
      Example: 
        将选中的复选框和单选框的值序列化为字符串形式 
        $(':checkbox,:radio').serialize() 
  jEl.serializeArray()  DOM元素序列化,返回JSON格式数据 
  Example:
    <input type="text" class="a2" name='n1' value='abc1'>
    <input type="text" class="a2" name='n2' value='abc2'>
    <input type="text" class="a2" name='n3' value='abc3'>
    console.log($('.a2').serialize());
    // n1=abc1&n2=abc2&n3=abc3 
    console.log($('.a2').serializeArray());
    // [
    //   { name : "n1", value : "abc1" },
    //   { name : "n2", value : "abc2" },
    //   { name : "n3", value : "abc3" },
    // ]
  $.param(obj)   将对象按照'key-val'进行序列化 
    PS:常用于将编码后的值向服务端发送请求 
    var obj = {a:1,b:2,c:3}
    console.log($.param(obj)); // a=1&b=2&c=3
'Deferred'异步操作 
  PS:'jQuery1.5'中引入; 和Promise对象一起作为jQuery对Promise的一种实现;
    '1.x-2.x'版本中,Deferred对象遵守的是CommonJS Promises提案中的约定,
    不同于原生promises遵守Promises/A+提案[从CommonJS Promises 衍生而来]的约定,
    导致其无法兼容其他实现promises的库,
    '3.0'改进了同原生 promises的互操作性,但Deferred的then方法签名仍然会有些不同,
    但行为方面它已经同ECMAScript2015标准更加一致;
  Deferred和Promise对象 
    PS: Deferred 对象可以被用来执行异步操作,例如 Ajax 请求和动画的实现。
      在 jQuery 中,Promise对象是只能由Deferred对象或 jQuery 对象创建。
      它拥有 Deferred 对象的一部分方法:always(),done(), fail(), state()和then()。
      jQuery 文档和 ECMAScript 标准在术语上的不同:
      在 ECMAScript 中, 不论一个 promise 被完成 (fulfilled) 还是被拒绝 (rejected),
      我们都说它被解析 (resolved) 了。
      然而在 jQuery 的文档中,被解析这个词指的是 ECMAScript 标准中的完成 (fulfilled) 状态。
    var defer = $.Deferred()    创建deferred对象
    var defer = $.Deferred(fooName) 创建deferred对象
      fooName 函数名,$.Deferred()生成的defer对象将作为fooName的默认参数 
      Example:
        var wait = function(defer){
          var tasks = function(){
            console.log("执行完毕！");
            defer.resolve(); // 改变Deferred对象的执行状态
          };
          setTimeout(tasks,2000);
          return defer.promise(); // 返回promise对象
        };
        $.Deferred(wait)
        .done(function(){ 
          console.log("哈哈,成功了！"); 
        })
        .fail(function(){ 
          console.log("出错啦！"); 
        });
    defer.resolve([arg1,...])   改变状态为"已完成" 
    defer.reject([arg,...])     改变状态为"已失败" 
    defer.done(foo [,foo,...])  指定成功时的回调函数 
    defer.fail(foo [,foo,...])  指定失败时的回调函数 
    defer.then(rsCfoo [,rjCfoo[,progressCallback]]) 解析、拒绝或收到进展通知时调用处理函数
      可用 done() 也可以通过 then() 来处理操作成功的情况;
      区别是then能够把接收到的值通过参数传递给后续的then,done,fail或progress调用
    defer.progress(foo [,foo,...]) Deferred对象产生进展通知时被调用的处理函数。
    defer.always(foo [,foo,...])   总会执行
    defer.state()     返回当前Deferred对象的状态
    defer.promise([foo])  
      无参数时   返回一promise对象,该对象的运行状态无法被改变 
        为决解defer是全局对象,其执行状态可从外部改变的问题而引入, 
          返回的promise对象只开放与改变执行状态无关的方法,如'done'和'fail'方法,
          屏蔽了与改变执行状态有关的方法,如'resolve'和'reject'方法,从而使执行状态不能被改变;
        var defer = $.Deferred(); 
        var wait = function(defer){
          var tasks = function(){
            console.log("执行完毕！");
            defer.resolve(); // 改变Deferred对象的执行状态
          };
          setTimeout(tasks,5000);
          return defer;
        };
        $.when(wait(defer))
        .done(function(){ 
          console.log("哈哈,成功了！"); 
        })
        .fail(function(){ 
          console.log("出错啦！"); 
        });
        defer.resolve(); 
        导致done()方法立刻执行,跳出"哈哈,成功了！",等5秒之后再跳出"执行完毕！"
        为避免该情况,jQuery 提供了 deferred.promise() 方法
        改进后
        var defer = $.Deferred(); 
        var wait = function(defer){
          var tasks = function(){
            console.log("执行完毕！");
            defer.resolve(); 
          };
          setTimeout(tasks,5000);
          return defer.promise(); // 返回promise对象
        };
        var pms = wait(defer); // 新建promise对象,改为对这个对象进行操作 
        $.when(pms)
        .done(function(){ 
          console.log("哈哈,成功了！"); 
        })
        .fail(function(){ 
          console.log("出错啦！"); 
        });
        pms.resolve(); // 此时,这个语句是无效的
        更好的写法是将defer对象变成 wait 函数的内部对象
        var wait = function(){
          var defer = $.Deferred(); //在函数内部,新建一个Deferred对象
          var tasks = function(){
            console.log("执行完毕！");
            defer.resolve(); // 改变Deferred对象的执行状态
          };
          setTimeout(tasks,5000);
          return defer.promise(); // 返回promise对象
        };
        $.when(wait())
        .done(function(){ 
          console.log("哈哈,成功了！"); 
        })
        .fail(function(){ 
          console.log("出错啦！"); 
        });    
      传入函数时,在参数对象上部署deferred接口 
        var wait = function(defer){ // 定义函数 
          var tasks = function(){
            console.log("执行完毕！");
            defer.resolve(); 
          };
          setTimeout(tasks,3000);
        };
        var defer = $.Deferred(); 
        defer.promise(wait);  // 在wait对象上部署Deferred接口,后面可调用 done() 和 fail()
        wait.done(function(){  // 监听 
          console.log("哈哈,成功了！"); 
        })
        .fail(function(){ 
          console.log("出错啦！"); 
        });
        wait(defer); // 执行函数 
    defer.notify([arg,...])  调用Deferred对象的progressCallbacks处理函数并传递制定的参数
    defer.notifyWith(context [,arg,...]) 
      在制定的上下文中调用progressCallbacks处理函数并传递制定的参数
    defer.resolveWith(context [,arg,...]) 
      解析Deferred对象并在指定的上下文中以指定参数调用所有的doneCallbacks处理函数。
    defer.rejectWith(context [,arg,...]) 
      拒绝Deferred对象并在指定的上下文中以指定参数调用所有的failCallbacks处理函数
    jQ1.x-jQ2.x 同 jQ3 的区别 
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
      jQuery3.x 中, 这段代码会在控制台输出“第一个失败条件函数” 和 “第二个成功条件函数”。
      原因就像我前面提到的,抛出异常后的状态会被转换成拒绝操作进而失败条件回调函数一定会被执行。
      此外,一旦异常被处理（在这个例子里被失败条件回调函数传给了第二个then()）,
      后面的成功条件函数就会被执行（这里是第三个 then() 里的成功条件函数）。
      在 jQuery1.x 和 jQuery12.x 中,除了第一个函数（抛出错误异常的那个）之外没有其他函数会被执行,
      所以你只会在控制台里看到“未处理的异常:一条错误信息。”
      为了更好的改善它同 ECMAScript2015 的兼容性,
      jQuery3.x 还给 Deferred 和 Promise 对象增加了一个叫做 catch() 的新方法。
      它可以用来定义当 Deferred 对象被拒绝或 Promise 对象处于拒绝态时的处理函数。
      它的函数签名如下:
      deferred.catch(rejectedCallback)
      可以看出,这个方法不过是 then(null, rejectedCallback) 的一个快捷方式罢了。
  $.when(defer1,defer2,..)    整体模式,都完成后执行 
    响应数据'data'和'defer'相对应,有多少个请求则传入多少个参数 
    data为一数组包含'backData'、'textStatus'和'otherObj' 
    $.when( 
      $.ajax({
        ..
      }), 
      $.ajax({
        ..
      }),
      ...
    )
    .fail(function(dat1,dat2,..){    // 有失败则执行 
      console.log("至少有一个出错啦！"); 
    })
    .done(function(data1,data2,..){  // 全部成功才执行 
      console.log("全部都成功了！"); 
    })
    .always(function(){              // 全部完成后执行[不管成功与否]
      console.log('请求全部完成,但不一定都成功了!');
    })
  Example: 
    在ajax中使用[self] 
    var defer = $.Deferred();
    $.ajax({
      type : 'get',
      url  : './source/test-json.json',
      // url  : './source/test-json.json1', // 测试错误时使用
      data : {
      }, 
      dataType : 'json',
      success  : function(backData,textStatus,obj){
        defer.resolve(backData);
      }, 
      error    : function (xhr,status,errorTrown){
        defer.reject(status);
      }, 
    });
    defer.then(function(data){
      console.log(data,1);
    })
    .catch(function(data){
      console.log(data,2);
    })
    
    var defer = $.Deferred(); 
    var wait = function(defer){
      var tasks = function(){
        console.log("执行完毕！");
        defer.resolve(); // 改变deferred对象的执行状态
      };
      setTimeout(tasks,5000);
      return defer;
    };
    //  wait() 函数返回的是deferred对象,可进行链式操作
    $.when(wait(defer))
    .done(function(data){ 
      console.log("哈哈,成功了！"); 
    })
    .fail(function(data){ 
      console.log("出错啦！"); 
    });

    $.ajax({
      ...
    })
    .done(function(data){
      console.log('success');
    })
    .fail(function(data){ 
      console.log('error');
    });
    
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




