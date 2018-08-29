JavaScript: 解释型的、基于对象和事件驱动的客户端脚本语言 
  PS: I/O相关的API,如网络、存储和图形等,都靠宿主环境提供, 
    嵌入JS的宿主环境有多种,如浏览器、Node环境等;
  JS内容划分: 
    除ECMAScript外,各种宿主环境提供额外的API,以便JS调用;
    以浏览器为例,它提供的额外API可以分成三大类:
    浏览器控制类: 操作浏览器,
    DOM类: 操作网页的各种元素,
    Web类: 实现互联网的各种功能;
    若宿主环境是服务器[如Node],则会提供各种操作系统的API,比如文件操作、网络通信等;
ECMAScript: 由ECMA制定和发布,JS语法核心,提供核心语言功能 
  任何基于此规范实现的脚本语言都要遵守其约定; 
  是宿主环境中脚本语言的国际Web标准; 
  本身并非脚本语言,实现它的语言有JavaScript、JScript、ActionScript等; 
  'ECMA-262'要求支持Unicode标准,从而支持多语言开发,第五版发布于2009年;
  ES6即ES2015于2015年6月发布 
  浏览器环境中比如BOM和DOM中的对象,都属于宿主对象,由宿主实现提供和定义;
说明&定义 
  函数和方法的区别: 
    函数基于过程,写法: foo()
    方法基于对象,就是对象的函数,调用写法: obj.foo()
  '实例': 类的具象化;在面向对象中,通过类创建对象的过程称为实例化; 
  '静态'、'公有'、'私有'、'特权'属性和方法 
    PS: 静态、公有、私有属性/方法 是相对于类来说的
    静态属性/方法: '构造函数'的属性/方法[无需实例化通过类名来访问] 
    公有属性/方法: 即其原型对象的属性/方法 
    私有属性/方法: '函数内部'定义的属性/方法,外部无法访问
    特权方法: 有权访问私有变量和私有函数的'公有方法' 
      利用的闭包原理,即通过作用域链,
      让内部函数能够访问上层函数的变量对象[即该函数的私有变量、私有方法] 
      
    function Foo(arg1,arg2){ // 构造函数
      var name = arg1;   // 私有属性
      function goo(){};  // 私有方法
      this.age = arg2;                 // 公有属性,通过实例对象来访问
      Foo.prototype.do1 = function(){  // 公有方法,通过实例对象来调用
        console.log(name);
      }
      this.do2 = function(){  // 特权方法 
        console.log(name); // 访问了私有属性
      }
    }
    Foo.name ="abc";         // 静态属性
    Foo.say =function(){};   // 静态方法
    var aoo =new Foo(1,2);
  IE8支持部分ES5功能,IE9+支持ES5 
  多态: 同一操作作用于不同的对象,可以有不同的解释,产生不同的执行结果,JS无多态  
语法规则 
  PS: 语法源自Java,基于原型继承来自Self;一等函数来自Scheme; 
  标识符: 指变量、函数、属性或函数的参数的名字 
    区分大小写的若干个字符 
    首字符需为'字母'、'_'或"$";其他字符可为'字母'、"_"、'$'或'数字'
    不能使用关键字、保留字作为标识符
    标识符中的字母也可以包含扩展的ASCII或 Unicode字母字符,但不推荐使用
  关键字和保留字: 有特殊意义,不可作为变量名的名称 
    关键字: 程序中已经开始使用的字符,如'var''function''return''if' ... 
    保留字: 还没有特定的用途,但可能在将来被用作关键字,如'class''int' ... 
  多行注释 /* 注释内容 */ ; 单行注释 // c风格的注释 
  ';'语句使用分号结尾可省略,若省略由解析器确定语句的结尾 
    加上分号会在某些情况下增进代码的性能,解析器不必花时间推测哪里需要插入分号
  \ 续行符 当一行代码过长,可人为分行,在行尾连接进行代码跨行 
    PS: 大部分JS引擎都支持,但并非ECMAScript标准;
    var str = "string \
    is broken \
    across multiple\
    lines";
    console.log(str);   // string is broken across multiplelines.
--------------------------------------------------------------------------------
JS引擎,真正执行JS代码的地方 
  常见的引擎有V8[目前最快JS引擎、Google生产]、JS core;
  JS引擎主要做了下面几件事情:
  一套与宿主环境相联系的规则;
  JS引擎内核[基本语法规范、逻辑、命令和算法];
  一组内置对象和API;
  其他约定 
JS运行过程机理 
  PS: 从上到下顺序执行代码; 
    执行阶段分: 预处理阶段 和 执行阶段 
    代码执行环境分: 全局环境window 和 函数作用域环境 
  JS代码运行过程分析: 
    PS: 在父环境不可访问子环境的缓存,反之可以 
      在子环境运行时,优先访问自己的缓存,若无再向上级寻找 
      子环境执行完毕,环境会被销毁[闭包则不会],缓存不存在;后续再执行则重新再创建 
      同类型的,变量重名或函数重名,后面的覆盖前面的 
    解析器接收到JS代码,此时处于全局环境下 
    1 进入预处理阶段: 扫描所有代码 
      PS: 缓存中,当函数名和变量名重名,函数优先级高[覆盖变量名] 
      将'全局变量'['var'声明的]和'函数'添加到缓存中,变量设为'undefined',函数名指向函数 
      非var的声明的变量不记录  
    2 执行阶段 
      PS: 直接跳过函数,因为已存在缓存中 
      在全局环境中  
        遇到变量声明则将其对应到缓存中,若遇到重名则后面覆盖前面  
      在入子环境中[函数的局部作用域] 
        进入子环境预处理阶段: 和全局类似 
          将'变量'、'函数'和'参数'添加到子环境的'缓存'中 
          当重名时,'函数'优先级最高覆盖其他,'变量'和'参数'互不影响 
        进入子环境执行阶段: 同全局类似
          顺序执行 
          将变量对应到缓存中,重名时,后面覆盖前面['参数'和'变量'同等对待]
内存相关 
  一般来说,确保占用最少的内存可以让页面获得更好的性能 
  内存泄漏: 无法销毁驻留在内存中的数据 [参见 函数>闭包>]
    IE6时代有bug,闭包会造成内存泄漏,这个现在已经无须考虑了 
    闭包过多容易导致内存泄漏,
    闭包会造成对象引用的生命周期脱离当前函数的上下文,
    从严格意义上讲,这是程序员自己的bug,而不是闭包的错 
'Garbage Collecation'垃圾回收机制: 只需申请内存,而不需关注内存的释放 
  垃圾回收器会在适当的时候将已经终止生命周期的变量的内存给释放掉 
  JS会自行管理内存分配及无用内存的回收 
  内存优化方案: 一旦数据不再有用,则将其设为null来释放引用,也叫解除引用'dereferencing' 
  解除引用适用于大多数全局变量和全局对象 
  var a = {
    name:"abc"
  };
  a = null;  //解除对象引用,等待垃圾收集器回收 
'Scope'作用域,在运行时,代码中变量、函数和对象的可访问性 
  PS: 即作用域决定了代码区块中变量和其他资源的可见性 
  全局作用域: JS运行的最外层  
  局部作用域: 函数体内部  
    定义在函数内部的变量具有局部作用域; 
    每个函数在被调用时都会创建一个新的作用域。
    函数内定义的变量在局部作用域中 
  动态作用域: JS不具备
    function foo(){
      console.log(aoo)
    }
    function goo(){
      var aoo =1;
      foo();
    }
    goo(); // 报错, aoo未定义
    若支持动态作用域,则为结果为 1
'Closure'闭包,当内部函数尝试访问其外部函数的作用域链,会创建一个闭包 
  PS: 闭包会携带包含它的函数的作用域,因此会比其他函数占用更多的内存 
    过度使用闭包可能会导致内存占用过多 
    虽然V8等优化后的JS引擎会尝试回收被闭包占用的内存,但还是要慎重使用.
  创建闭包的常见的方式,在函数内部创建另一个函数 
  作用: 保存自己的私有变量,通过提供的接口(方法)给外部使用,但外部不能直接访问该变量 
  闭包包含自己的作用域链,父级的作用域链[包括全局作用域] 
  闭包不仅可以访问其外部函数中定义的变量,还可以访问外部函数的参数 
'use strict'; 使用严格模式[IE10+] 
  作用意义: 
    消除ECMAScript老版本中不合理、不严谨、不安全之处,提升效率,为ES的新版本做准备
  作用范围: 
    函数作用域: 在函数内第一行添加 'use strict'; 
      function foo(){
        'use strict';
        // ...
      };
    整个脚本范围: 在脚本的顶部添加 'use strict'; 
  严格模式下的差异 
    字面量&变量相关: 
      禁止8进制的字面量 
        console.log(0123); // 83,严格模式下则报错 
        不能使用前缀0表示八进制数 
      未声明的变量赋值报错 
        即必须使用 var 来声明变量,直接使用变量名赋值则报错 
      不能删除变量,否则报错
        只能删除属性delete global[prop]
    对象相关: 
      初始化时重复定义对象属性报错 
        Example: var obj = { key1: 1, key1: 2 }
      不能对只读属性赋值,否则报错
      不能删除不可删除的属性,否则报错
    函数相关: 
      函数的参数不能存在同名,否则报错
      arguments[num] 变成静态副本,按共享传递 
        在函数中修改arguments[num]不会影响到函数的参数,
        当修改 arguments[num].xx 会影响 
      不能使用arguments.callee
      不能使用arguments.caller
      不能使用 fn.caller 和 fn.arguments 获取函数调用的堆栈
    禁止动态绑定 
      不可使用 with(){} 语句
      不可使用 eval 作用域 
    禁止this指向全局对象
    eval会创建作用域  
      eval('var num = 1')
      console.log(num);   // 1
      
      'use strict';
      eval('var num = 1')
      console.log(num);   // 报错,num未定义 
    eval和arguments不能被重新赋值
    增加了保留字[如 protected static 和 interface] 
数据类型 
  PS: JS变量不必定义类型,每个变量仅仅是一个用于保存值的占位符;
    ECMAScript不支持任何创建自定义类型,所有值都为6种数据类型之一[ES6可以了];
    一个值可由多个变量名称指向,但一个变量只能指向一个值;
'Evaluation Strategy'求值策略: 决定变量之间、函数调用时实参和形参之间值的传递方式 
  读写引用类型值 
    引用存储: 栈内存中存储指针[指向堆内存],堆内存中存储实际值 
    引用访问: 先从栈中读取内存地址,再通过地址找到堆中的值 
    引用类型变量: 实际上是一个指向对象的指针,并非对象本身 
    引用复制: 复制指针,因此两个变量最终都指向同一个对象 
    引用类型值按引用地址来比较 
      var aoo = {a:1};
      var boo = {a:1};
      var coo = boo;
      console.log(aoo == boo);  // fasle,值相同但地址不同
      console.log(coo === boo); // true,引用地址相同
    修改引用类型的值 和 改变变量的指向 
      var aoo = { name:'abc', age:19 }; // 让 aoo 指向推内存中的一个对象
      var boo = aoo;   // 使 aoo 和 boo 指向同一对象
      console.log(boo); // {name: "abc", age: 19}
      boo.name = "changed"; // 修改堆内存中的对象
      console.log(aoo.name); // changed,boo的值也随着变化了
      aoo = 1;          //改变 aoo,不再指向对象
      console.log(boo); // {name: "changed", age: 19},boo仍指向对象
  'call by value'按值传递: 最常用的求值策略,JS中基本类型按值传递 
    传递的值为拷贝的副本,修改传递的值并不会影响原来值 
    按值传递由于每次都需要克隆副本,对一些复杂类型,性能较低
  'call by reference'按引用传递: 传递的为原始值的隐式引用 
    PS: 当传递的值被改变时原始值也会被改变[两者同时指向相同的值]
      按引用传递会使函数调用的追踪更加困难,有时也会引起一些微妙的BUG 
  'call by sharing'按共享传递: 也叫按对象传递,JS中对象类型按共享传递的 
    PS: 该求值策略被用于Python、Java、Ruby、JS等多种语言 
    对象实际值存放于堆内存,传递的为指针引用,修改时则改变堆内存对象,重置则改变指针指向 
      var obj = {x : 1};
      function foo(o) {
        o = 100;  // 将指针设置为100 
      }
      function goo(o) {
        o.x = 2;  // 通过指针修改堆内存中的对象 
      }
      foo(obj);
      console.log(obj); // {x : 1},obj并未被修改 
      goo(obj);
      console.log(obj); // {x: 2},被修改了 
      
      var obj1 = {
        aoo: 111
        ,foo: function(cfoo){
          cfoo('aaa')
        }
      }
      var obj2 = {
        aoo: 222 
        ,foo: function(arg){
          console.log(this.aoo,arg);
        }
      }
      obj1.foo(obj2.foo) // undefined 'aaa' 
      相当于: 
      var foo = obj2.foo 
      obj1.foo(foo) 
      即: 传递的值A为指向实际的对象值B的引用,可修改影响实际值但覆盖则不会影响 
--------------------------------------------------------------------------------
◆总结、技巧 
函数节流,对消耗资源过多的操作的频率进行限制 
  如IE中onresize的连续触发操作DOM,高频率的更改可能会让浏览器崩溃 
  ★简陋版节流: 频率过高导致只执行最后一次 
  function simpleThrottle(method, context) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function(){
      method.call(context);
    }, 100);
  }
  ★限定为一定频率的节流:  
  function throttle(foo,context,time){
    if(!foo._1_){
      foo._1_ = setTimeout(function(){
        foo.call(context);
        foo._1_ = false;
      },time)
    }
  }
  Example: 
  function resizeDiv(){
    var div = document.getElementById("myDiv");
    div.style.height = div.offsetWidth + "px";
  }
  window.onresize = function(){
    simpleThrottle(resizeDiv);
  };
Question&Suggestion 
  如何通过函数名来获取到函数传入的参数 ? 
    自我实现: 
      在函数内定义 arguments.callee.args = arguments
      然后 foo.args 就可以获取的传入的参数了 
