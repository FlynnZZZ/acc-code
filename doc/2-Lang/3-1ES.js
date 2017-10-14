JavaScript: 解释型的、基于对象和事件驱动的客户端脚本语言 
  I/O[输入/输出]相关的API[如网络、存储和图形等]都靠宿主环境提供[JS本身不提供],
  嵌入JS的宿主环境有多种,如浏览器、Node环境等;
  JS内容划分: 
    除ECMAScript外,各种宿主环境提供额外的API,以便JS调用;
    以浏览器为例,它提供的额外API可以分成三大类:
    浏览器控制类: 操作浏览器,
    DOM类: 操作网页的各种元素,
    Web类: 实现互联网的各种功能;
    若宿主环境是服务器[如Node],则会提供各种操作系统的API,比如文件操作、网络通信等;
  多态:同一操作作用于不同的对象,可以有不同的解释,产生不同的执行结果,JS无多态  
ECMAScript: 由ECMA制定和发布,JS语法核心,提供核心语言功能 
  PS: 任何基于此规范实现的脚本语言都要遵守其约定;是宿主环境中脚本语言的国际Web标准;
    本身并非脚本语言,实现它的语言有JavaScript、JScript、ActionScript等;
    'ECMA-262'要求支持Unicode标准[从而支持多语言开发],第五版发布于2009年;
    浏览器环境中比如BOM和DOM中的对象,都属于宿主对象,由宿主实现提供和定义;
说明&定义 
  函数和方法的区别 
    函数基于过程,写法: foo()
    方法就是对象的函数,基于对象,调用写法: obj.foo()
  '实例': 类的具象化;在面向对象中,通过类创建对象的过程称为实例化; 
  '静态'、'公有'、'私有'、'特权'属性和方法 
    PS:静态、公有、私有属性/方法 是相对于类来说的.
    静态属性/方法: '构造函数'的属性/方法[无需实例化通过类名来访问] 
    公有属性/方法: '实例对象'的方法/属性,一般把共用的方法,都放在'原型对象'当中 
      若放在构造函数中,会重复创建共同的方法
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
语法规则 
  PS: 语法源自Java,基于原型继承来自Self;'first-class function'一等函数来自Scheme;
  标识符: 指变量、函数、属性或函数的参数的名字 
    区分大小写
    第一个字符必须是'字母'、'_'或"$";其他字符可以是'字母'、"_"、'$'或'数字'
    不能使用关键字、保留字作为标识符
    可以一个或多个字符
    标识符中的字母也可以包含扩展的ASCII或 Unicode字母字符,但不推荐使用
  关键字和保留字 
    有些名称有特殊意义,不可作为变量名
    关键字: 程序中已经开始使用的字符,如'var''function''return''if' ... 
    保留字: 还没有特定的用途,但可能在将来被用作关键字,如'class''int' ... 
  单、双引号需交错、成对使用 
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
  'use strict'; 使用严格模式 [IE10+]
    在需使用的作用域中使用 
      在函数的作用域中使用严格模式 
        function foo(){
          'use strict';
          // ...
        };
      在整个脚本顶部添加 
    严格模式下的限制 
      不可使用 with(){} 语句
      未声明的变量赋值报错 
      arguments[num] 变成静态副本,按共享传递 
        在函数中修改arguments[num]不会影响到函数的参数,
        当修改 arguments[num].xx 会影响 
      不能使用arguments.callee
      不能使用arguments.caller
      不能使用 fn.caller 和 fn.arguments 获取函数调用的堆栈
      初始化时重复定义对象属性报错
        Example: var obj = {a:1,a:2}
      禁止8进制的字面量
        console.log(0123); // 83,严格模式下则报错 
        不能使用前缀0表示八进制数 
      禁止this指向全局对象
      函数的参数不能有同名属性,否则报错
      不能对只读属性赋值,否则报错
      不能删除不可删除的属性,否则报错
      不能删除变量delete prop,会报错,只能删除属性delete global[prop]
      eval不会在它的外层作用域引入变量
      eval和arguments不能被重新赋值
      增加了保留字[如 protected static 和 interface] 
------------------------------------------------------------------------------- 
◆数据类型 
变量&常量&字面量 
  PS: JS变量不必定义类型,每个变量仅仅是一个用于保存值的占位符;
    ECMAScript不支持任何创建自定义类型,所有值都为6种数据类型之一[ES6可以了];
    一个值可由多个变量名称指向,但一个变量只能指向一个值;
  var valName;   定义变量,相当于给window添加属性,但不可'delete'删除 
    PS: 变量定义但未赋值,默认为'undefined'
    不用用var声明的变量: 相当于给window添加属性,但可用'delete'删除  
      var aoo = 1; 
      boo = 2;
      console.log(window.aoo); // 1
      console.log(window.boo); // 2
      var bol1 = delete aoo; // 删除失败 
      var bol2 = delete boo; // 删除成功
      console.log(bol1,aoo); // fasle 1
      console.log(bol2);     // true
      console.log(boo);  // 报错 boo 未定义, 因为boo已被删除而无法访问
    全局变量与window属性的差异 
      准确的说应该是显式声明的全局变量无法delete,window属性则可以
      访问未声明的变量会报错,而未声明window对象的属性则为undefined 
    重复的var声明: 相当于赋值操作产生覆盖 
      var box = "fan";
      var box = "abc";  // 相当于 box = "abc";
      console.log(box); // abc
    'var' 与','运算符 [参见:逗号运算符,变量声明]     
      (var aoo = 1), 2==3; // Uncaught SyntaxError: Unexpected token var
      (var aoo = 1);       // Uncaught SyntaxError: Unexpected token var
      (var aoo);           // Uncaught SyntaxError: Unexpected token var
      var aoo = 1, window.boo = 2; // Unexpected token .
  'literal'字面量  直接显示出来的数据值 
    100            // 数字字面量
    "abc"          // 字符串字面量
    false          // 布尔字面量
    null           // 对象字面量
    /xxx/ig        // 正则表达式字面量
    {x:1,y:2}      // 对象字面量表达式
    [1,2,3,4,5]    // 数组字面量表达式
基本类型: 也叫原始类型,占据空间小、大小固定,存储在'stack'栈内存中 
  基本类型: 变量的赋值,会创建该值的一个副本  
  undefined 表示未定义的值 
    在声明变量时没有对其初始化,则变量的值就是 undefined 
  null      表示空指针  
    PS: 将来用于保存对象的变量,可初始化为 null 
    Example: 
    console.log(null==undefined); // true ,undefined派生于null
    console.log(typeof null); // object
  基本包装类型: 基本类型的变体,一定条件下有对象的性质[如可调用方法、设置属性等] 
    PS: 通过构造函数显式的创建基本包装对象 
    基本包装对象和对象一样按引用进行比较 
      var a1 = "test";
      var a2 = new String("test");  // 对象字符串
      console.log(a1 == a2);//true
      console.log(a1 === a2);//false
    隐式创建的包装对象其对象性质是临时性的 
      var aoo ="abc";
      aoo.z ="z"; // 瞬时存在包装对象,所以不会报错,但后续访该对象被丢弃
      console.log(aoo.z); // undefined 
      // 上一次隐式创建的包装对象用完就消失了
      // 此次访问其z属性又隐式创建了包装对象但并未定义,所以为undefined
      var boo = new String("abc");
      boo.z = "z";
      console.log(boo.z); // z
  Boolean 布尔值 
    PS: ECMAScript中所有类型的值都可转换成这两个Boolean值等价的值 
    隐式转换为布尔值 
      规则: undefined、null、0、NaN、""转换为 false;其余转换为 true
      Example: 
      var box = ''; 
      if(box){ //条件语句中()内必须是布尔值
        console.log('真');
      }
      else{ 
        console.log('假');
      } 
      
      console.log(!0,!1); // true false
    bol = Boolean(any) 显式转换为布尔值 [moIn 'Global']
  Number  数值 
    PS: 可以保存+0 和 -0,且 +0 === -0;
    数值进制 
      PS: 在进行算术计算时,所有八进制和十六进制表示的数值都将被转换成十进制数值
      十进制    
      八进制     0 开头,且最大数值不超过7 
        若字面量中的数值超出了范围,则前导0被忽略,后面的数值将被当作十进制数值解析
        八进制字面量在严格模式下是无效的,会导致JS引擎抛错  
      十六进制数 必须使用0x或0X开头,最大字符不超过f 
    科学计数: 
      e E 可大写,可小写
      默认情况下,ECMAScript会将小数点后面有6个零以上的浮点数使用科学计数法表示
      var a = 2E3;//或者2e3
      console.log(a); //2000
      2e3;  //2000
      0.000000005; //5e-9
    浮点类型: 小数点后至少有一位非零数字 
      浮点数可省略前导0,但不推荐使用,如 .8  
      浮点数占用的内存比整型数大两倍,默认将可转换为整型的浮点数值转换成整型 
        console.log(8.0);   // 8
      浮点数最高精度是17位小数,但算术运算中可能会不精确 
        // 不要使用浮点数做判断
        console.log(0.1+0.2);   // 0.300000000000004
    特殊数值 
      Infinity/-Infinity   正/负无穷 
        无穷是不能参加计算的数值  
      NaN'not a number'非数值: 表示一本应为数值而不是数值的情况,而不报错 
        PS: 在其他语言中,任何数值除以零都会导致错误而终止程序执行,
          但ECMAScript会返回特殊的值,不会影响程序执行.
        不和任何值相等,包括自己  
          console.log(NaN == NaN); // false
        任何与NaN进行运算的结果均为 NaN  
          console.log(NaN+1); // NaN
        Example:
        console.log(0/0);  // NaN
    转换为数值  
      隐式转换为数值 
        undefined 为 NaN;null false 为 0;true 为 1;
        其他对象调用自身的 .valueOf() .toString() 方法,进行转换 
        Example:
        console.log(1*"2",typeof (1*'2'));  // 2 number  
        console.log(1+"1",typeof (1+'1'));  // 11 string
      Number()、parseInt()、parseFloat()、obj.valueOf()、obj.toString() 显式转换为 
  String  字符串: 由若干个16位Unicode字符组成的字符序列 
    PS: 可使用双引号或单引号,但必须成对出现;
    特殊字符: 也叫转义序列,可能引起歧义的特殊字符字面量  
      枚举: 
        '\"' 双引号
        '\'' 单引号
        '\n' 换行符
        '\r' 回车符
        '\b' 空格 
        '\t' Tab制表符 
        '\0' Null字节
        '\f' 换页符
        '\v' 垂直制表符
        '\\' \反斜杠字符
        '\123'   最多三位0到377八进制数表示的'Latin-1'字符 
          PS: 严格模式下,不能使用八进制转义字符 
          console.log('\251'==='©');  // true  
          console.log('\55');   // -
          console.log('\055');  // -
        '\x12'   二位00和FF的十六进制数字表示的'Latin-1'字符 
          console.log('\xA9'==='©'); // true 
        '\u1234' 四位十六进制数字表示的Unicode序列字符 
          console.log('\u00A9'==='©');  // true 
        '\u{12345}' Unicode代码点'code point'转义字符 
          console.log('\u{2F804}'==='你'); // true 
      作为一个字符来解释 
        console.log('\t\n'.length); // 2
      Example: 
        console.log("read \"book\""); // read "book"
    创建字符串 
      str = 'xx' 字面量法创建
      str = new String() 构造函数创建
      字符串不可单独修改其字符,只能覆盖替换,因为不是引用类型  
    其他类型转换为字符串 
      隐式转换为字符串 
        val+"" 
        undefined 为"undefined";null 转换为"null";
        true 为"true";false 为"false";NaN  为"NaN";
        其他对象调用自身的 .valueOf() .toString() 方法,进行转换 
          数值会转换为数值本身,即数字字符串 
          console.log(123.0.toString(),typeof 123..toString()); // 123 string
      String(val)、obj.valueOf()、obj.toString() 显式转换 
    Exp: 
      数值字符串比较其数值大小,采用相减的方式 
        var str1 = '9';
        var str2 = '100';
        console.log(str1>str2);   // true , 非想要的结果 
        console.log(str1-str2>0); // false
引用类型: 引用类型的值是对象,保存在堆内存中
  PS: 包含引用类型值的变量是一个指向对象的指针,
    变量赋值,复制的其实是指针,因此两个变量最终都指向同一个对象 
    对象是若干名值的合集,一般没有长度
    对象分为JS内置对象[如 Number]、宿主环境[如 window]、自定义[如 {}] 
  'key-val'键值对表现形式: 对象成员都是用一个名称来标记的  
    PS: 访问对象不存在的属性,返回'undefined' 
      对象默认是可扩展的,可以向对象中添加、删除属性和方法
    'key'键  str,属性名或方法名,
      需用引号的情况: 非合法的变量名,或包含除特殊字符,或以数字开头,或为JS保留字;
      Example: 
        var aoo = { "d sd ":1 }
        console.log(aoo["d sd "]); // 1
        
        var obj = {};
        var obj1 = {a : 1}
        obj[obj1] = 2;
        console.log(obj); // {[object Object]: 2},对象被转换成字符串来作为key存储
        console.log(obj[{}]); // 2 
        console.log(obj[{b:3}]); // 2 
    'val'值  any/expr,属性值或方法 
      var obj = {
        key1 : new Date().getHours()
      }
      console.log(obj); // {key1: 21} 
    obj[<key>]  读写属性值 
      key    expr,系统将自动转化为字符串 
    obj.<key>   读写属性值,
      PS: 属性名不是一个合法的变量名时,只能使用中括号的形式访问;
    obj.<key>() 方法调用 
  创建对象: 'class'类,语言提供的自定义数据类型的机制,用于创建对象 
    PS: 类就是对象的数据类型,对象就是类的具象化 
    obj = {}  字面量创建对象 
      var box = null  // 初始化对象
      var obj = {}    // 空对象,没有任何属性的对象
      var obj = {key1:val1,...}   // 名值对间使用逗号隔开
    obj = new Object(any/expr) 构造函数创建对象 
      PS: 若无参数可省略括号 new Object 但不推荐使用
      Example: 
      var obj1 = new Object(2); // Object类型,值是2
      console.log(obj1); //  Number {[[PrimitiveValue]]: 2}  
      console.log(obj1+2); // 4 ,隐式转换为2 
      var obj2 = {a:1} 
      console.log(obj2 + 2); // Object {a: 1} [object Object]2 ,变成字符串相加 
      console.log(new Object({x:1}));  // Object {x : 1} 
    obj = Object.create(proto[,config]); 继承方式创建对象[ES5] 
      proto   创建对象的原型对象  
        console.log(Object.create(null)); // {},'纯净的空对象',没有原型 
        Object.create(Object.prototype);  // {} ,一个空对象
        
        var aoo = {x:1};
        var boo = Object.create(aoo);
        console.log(boo.__proto__ === aoo);      // true 
        console.log(boo.constructor === Object); // true  
      config  新增属性方法及属性特性的配置对象 
        var boo = Object.create({aoo:1},{
          boo: {
            value : 22,
            writable : false
          },
          coo: { 
            value : "aa",
            writable : true
          }
        });
    仿造类的实现方式:
    obj = foo()  工厂模式: 创建一对象并返回 
      PS: 工厂模式使软件领域一种广为人知的设计模式 
      function createObject(name,age){    // 创建工厂函数 
        var obj = new Object();           //创建对象
        obj.name = name;                  //添加属性
        obj.age = age;
        obj.run = function(){             //添加方法
          return this.name+this.age+"运行中";
        };
        return obj;                       //返回对象引用
      }
      var aoo = createObject("lee",100);       //创建第一个对象
      aoo.run();    // "lee100运行中"
      缺点: 无法继承; 无法识别对象的类型 
    obj = new Foo() 自定义构构造函数[类]实例化对象 
      混合的构造函数: 构造函数+原型对象  
        构造函数: 定义对象的独有的属性/方法; 原型对象: 定义共享的属性/方法
        Example: 
        function Foo(arg1,arg2) { 
          this.key1 = arg1; 
          this.key2 = arg2; 
        }
        Foo.prototype = {
          constructor: Foo,
          foo1: function(){
          },
        }
      构造函数创建对象的过程: 
        1 创建一个新对象'newObj' 
        2 将this就指向了'newObj';
        3 为'newObj'添加属性/方法;
        4 返回'newObj'
      若构造函数返回值为一对象,则将该返回值作为生成的实例对象 
        若构造函数无返回值或返回值为基本类型,则将'this'作为返回值来生成实例对象 
        即返回值的优先级更高
        var Foo = function(){
          this.aoo = 1;
          this.boo = 2;
          return 1;
        }
        var Goo = function(){
          this.aoo = 1;
          this.boo = 2;
          return {a:'a'}
        }
        console.log(new Foo(),new Goo()); 
        // Foo {aoo: 1, boo: 2}    {a: "a"}
      未使用'new'实例化对象时,相当于直接执行函数,导致'window'属性意外增加 
        直接执行构造函数,使内部的'this'指向的是全局对象window 
        function Foo(arg1,arg2){ 
          this.aoo = arg1; 
          this.boo = arg2; 
        }
        var obj = Foo(2,3);
        console.log(window.aoo,boo); // 2,3 
  对象成员的特性'attributes' 
    PS: 'writable'、'enumerable'、'configurable'只能通过函数来设定 
      这些特性是为了实现JS引擎用的,在JS中不能直接访问它们。
      为了表示特性是内部值,该规范把它们放在了两对儿方括号中,例如 [[Enumerable]]
    ◆数据特性: 描述属性行为 
    [[Value]]        默认 undefined,属性的值 
    [[Writable]]     默认 true,是否可写 
    [[Enumerable]]   默认 true,能否通过'for in'、'Object.keys'等枚举  
    [[Configurable]] 默认 true,能否配置 
      包括: 能否delete删除、能否修改属性特性配置、能否重新定义属性特性 
      不可逆性: 一旦把属性定义为不可配置的,就不能再把其变回可配置的了 
    ◆访问器特性 
    [[Get]]  读属性值时的操作,默认返回属性值 
    [[Set]]  写属性值时的操作,默认返回属性值 
      var obj = {
        aoo : "aaa",
        boo : 111,
        // 注意此处无冒号
        get boo (){ 
          console.log('读取boo中..');
          return 222; 
        },
        set boo (val){ 
          console.log("boo设置为"+val) 
        },
      }
      console.log(obj.boo);     // 读取boo中..
      obj.boo = 11; // boo设置为11
    [[Enumerable]]    能否遍历  
    [[Configurable]]  能否配置 
  原型对象: 构造函数的'prototype'属性 
    PS: 用于存放某一类对象的公有属性和方法 
      构造函数实例化后的对象都可以'继承'到其'prototype'的属性和方法 
      原型对象的'constructor'属性指向构造函数
    原型对象的获取方法:   
      Foo.prototype   通过定义获取 
      Object.getPrototypeOf(obj); 通过实例获取 [ES5] 
      obj.constructor.prototype   通过实例间接获取 
      obj.__proto__               通过实例获取 [非标准 IE11+]  
    原型的'修改'与'重设' 
      修改原型对象会影响到其他实例 
        function Person(){ };
        Person.prototype = { 
          "constructor": Person, 
          "friends": ["a","b"] 
        }
        var p1 = new Person();
        var p2 = new Person();
        p1.friends.push("c"); // 实际为修改原型 
        console.log(p1.friends);  // ["a", "b", "c"]
        console.log(p2.friends);  // ["a", "b", "c"]
        p1.friends = ["1"];  // 定义 p1 实例中的属性
        console.log(p1.friends);  // ["1"]
        console.log(p2.friends);  // ["a", "b", "c"]
      重设原型对象: 
      ★导致原型的'constructor'属性被覆盖,不再指回构造函数 
        决解方案: 强制指定 constructor
        Example: 
        function Box(){}
        Box.prototype = { run : function(){} }
        var box1 = new Box();
        box1.constructor; // function Object() { [native code] }
        // 实例的构造函数指向Object
        字面量方式改进为:
        Box.prototype = {
          constructor : Box, // 强制指定到Box
          run : function(){
            return 1;
          }
        }
      ★已创建实例的原型不变,但会改变后续再实例化的对象的原型 
        即构造函数和实例间可存在多个原型对象   
        function Foo(name){
          this.name = name; 
        }
        Foo.prototype.aoo = 1;
        var obj1 = new Foo('aa');
        console.log(obj1.__proto__);  // {aoo: 1, constructor: ƒ}
        Foo.prototype.aoo = 2;   
        console.log(obj1.__proto__);  // {aoo: 2, constructor: ƒ}
        Foo.prototype = { boo : 11 }; 
        console.log(obj1.__proto__);  // {aoo: 2, constructor: ƒ}
        console.log(Object.getPrototypeOf(obj1));  // {aoo: 2, constructor: ƒ}
        // 原实例的原型无变化 
        console.log(obj1.constructor.prototype); // {boo: 11}  
        // 但更改了后续实例的原型 
        var obj2 = new Foo('bb');
        console.log(obj2.constructor.prototype === Object.prototype); // true 
  原型链继承: 通过实例对象继承原型对象的原理,原型对象继承其他对象,从而实现原型链继承[Self]  
    Example: 
    var Foo = function(name){
      this.name = name;
    }
    Foo.prototype.aoo = '1'; // 实例继承原型  
    var Goo = function(age){
      this.age = age;
      this.age1 = 'age1';   // 要求不继承 
    }
    Goo.prototype = {  // 要求继承 
      boo: {
        a: 1 
      },  
    }
    // 方式1
    Foo.prototype = Object.assign(Foo.prototype,Goo.prototype) // 
    Foo.prototype.constructor = Foo;
    // console.log(Foo.prototype.boo === Goo.prototype.boo); // true 
    // 方式2
    // Foo.prototype.__proto__ = Goo.prototype // 原型的继承 
    var obj1 = new Foo('abc')
    console.log(obj1); // Foo {name: "abc"} 
    console.log(obj1.aoo);  // 1 
    console.log(obj1.age1); // undefined
    console.log(obj1.boo);  // {a: 1}  
    原型链继承的缺点: 
    ★在原型中定义的引用类型的属性可被所有实例共享 
      var Foo = function(){ }
      Foo.prototype = {
        key1: [1,2]
      }
      var obj1 = new Foo();
      var obj2 = new Foo();
      obj1.key1.push(3);
      console.log(obj2.key1); //  [1, 2, 3] 
    ★在创建子类型的实例时,不能向超类型的构造函数中传递参数 
  对象类型检测的方法:  
    PS: 无直接访问对象类型的方式,可间接通过以下方式来获取
    Object.prototype.toString.call(val); 获取值类型 
      var type = Object.prototype.toString;
      var getType = function(val){
        return type.call(val).slice(8,-1);
      }
      console.log(type.call(null)); // [object Null] 
      console.log(getType(null)); // Null
      console.log(getType(undefined)); // Undefined
      console.log(getType(true)); // Boolean
      console.log(getType('a')); // String
      console.log(getType(1)); // Number
      console.log(getType(new Number())); // Number
      console.log(typeof new Number()); // object
      console.log(getType({})); // object
      console.log(getType([])); // Array
      console.log(getType(new Date())); // Date
    'duck type' 鸭子类型,根据其表现来确定其身份 
    typeof val;               [详参 一元运算符]
    obj instanceof Object;    [详参 关系运算符]
    obj.constructor           查询对象的构造函数 
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
------------------------------------------------------------------------------- 
表达式: 解释器通过计算将表达式转换为一个值 
  PS: 最简单的表达式是字面量或变量名; 通过合并简单的表达式来创建复杂的表达式 
运算符: 用于操作数据值的运算符,也叫操作符 
  PS: ECMAScript操作符的特点是能够适用于很多值,进行运算时会将不同的类型进行隐式转换,
    运用于对象时,通常会调用对象的'valueOf'和'toString'方法,以便取得相应的值;
  一元运算符 : 只能操作一个值的运算符 
    ++、-- 自增、自减
      前置和后置的区别:
        对赋值有影响;在没有赋值操作时,前置后后置是一样的,
        在赋值操作时,前置++会先累加再赋值,而后置++则先赋值再累加.
      Example: 
      var num = 100;
      console.log(num++,++num); // 100 , 102 
    +、-   正、负数
      var box="1";
      -box;               //-1
      typeof box;         //String类型
      typeof -box;        //Number类型
    str = typeof val  检测值类型 
      PS: typeof是操作符而非函数,因此后面的括号可有可无;不能有效的区分对象的类型;  
      val   被检测的值,可以是变量或字面量 
        返回值类型为字符串,为如下6种之一: 
        'undefined' 未定义
        'boolean'   布尔值
        'string'    字符串
        'number'    数值
          typeof NaN;       // "number"
        'object'    对象 或 null
          typeof null;       // "object",空对象
        'function'  函数 
      检测未声明的变量不会报错,而返回 undefined   
        typeof aoo;         // "undefined"
    bol = delete val; 删除数组、对象等中的成员,返回是否删除成功的布尔值  
      PS: 若删除不存在的值也会返回true 
      删除数组成员,相当于将该成员值变成'undefined',数组长度不变化 
        var arr = ['a','b','c']
        delete arr[1]
        console.log(arr,arr[1]); // ["a", undefined × 1, "c"]  undefined 
        console.log(arr.length); // 3 
      Example:
      var obj = {a:1,b:2,c:3}
      var bol1 = delete obj.b;
      console.log(bol1,obj); // true {a: 1, c: 3}
    obj = new Foo();  初始化对象 
    void expr;   执行表达式,并始终返回 undefined 
      PS: 无论void后的表达式是什么,void操作符始终返回 undefined
      expr  表达式,不可为空,否则报错 
        void ();  // Uncaught SyntaxError: Unexpected token )
      使用void获取'undefined' 
        'undefined'不是JS的保留字,有可能被占用 
        还有一种方式是通过函数调用,如AngularJS的源码里就用这样的方式:
        (function(undefined) {
          //此处的 undefined 为undefined
        })();
      禁止超链接跳转页面 
        若链接URL为空,点击会刷新整个页面,
        点击以 javascript: URI 的链接时,浏览器会对冒号后面的代码进行求值,
        然后清空页面把求值的结果显示在页面上
        只有当这段代码的求值结果是 undefined 的时候,浏览器才不会去做显示
        但不推荐利用 javascript: 伪协议来执行JS代码
      立即调用的函数表达式 
        void function(){
          console.log(1);
        }();
  二元表达式 
    ◆算术运算符 
      PS:若算术运算的值不是数值,后台会先使用Number()转型函数将其隐式转换为数值.
    +  和运算/字符串连接
      var box=Infinity+-Infinity; //NaN,正负无穷相加为NaN
      var box=100+'100'; //100100,字符串连接先于和运算
      var box="年龄为"+10+10; //年龄为1010,被转换成字符串,字符串链接操作
      var box=10+10+"是年龄"; //20是年龄,先进行和运算再进行字符串连接
      var box="年龄是"+(10+10); //年龄是20,括号提升优先级
      var aoo = 10 + {};
      console.log(aoo);       // 10[object Object]
      console.log(typeof aoo); // string
    -  减运算
      var box=100-'';         //100,空自动转换为0
      var box=100-'80';
      //20,'80'转换成了80(因为-不同于+可作为字符串连接符)
      var box=100-null;       //100,null转换成0
      var box=100-'abc';      //NaN,abc转换成NaN
      var box = 100 - 对象;   //NaN,若有toString()或alueOf(),返回10-返回值
    *  乘运算
    /  除运算
      不同于C语言,得到的结果为浮点数.
      var box=100/'';                 //infinity,''转换成了0
      var box=100/null;               //infinity,null转换成了0
      3%-8; //3,其中%后面的符号不起作用
      -3%8; //-3
    %  取余
       var box=100%'';                 //NaN
       var box=100%null;               //NaN
       var box=100%"abc";             //NaN
       var box=100%0;                 //NaN
    ** 幂 
      Example:
      2**3; // 8
      var aoo =3;
      var boo =2;
      console.log(aoo**boo); // 9
    ◆关系运算符 
      PS:用于进行比较的运算符称作为关系运算符.
       包括:<、>、<=、>=、==、!=、全等(恒等)===、不全等!==
       关系运算符大多返回的为布尔值.
    <、>、<=、>=的运算规则:
      两个操作数都是字符串,则比较两个字符串的第一个字符对应的Unicode字符编码值;
      有一个操作数是数值,则将另一个转换为数值,在进行数值比较
      两个操作数有一个是对象.和对象的toString()或valueOf()返回值进行比较.否则数字永远大于对象.
    == 与 === 
      ==:比较值是否相等
       在比较时会进行类型转换
       null和undefined是相等的
       null和undefined在相等比较时不会自动转换.(所以null不等于0)
       当两个对象指向同一个对象,他们才相等.(否则相同值的对象不相等)
      ===:比较值和类型是否都相等
      Example:
      1==true;    //true
      1===true;   //false
      NaN==NaN;   //false
    bol = obj instanceof Foo; 原型链检测 
      PS: 检测构造函数的'prototype'属性是否存在于对象的原型链中 
        检测的对象必须和构造函数处于同一个同一个iframe或window中,否则返回false
      obj  用于检测的对象,若为基本类型则直接返回'false' 
        console.log(123.1 instanceof Number);  // false
        console.log("a" instanceof String);    // false
        console.log(new Number(123) instanceof Number); // true
      Foo  被检测的构造器,若为非构造函数则报错 
      Example: 
        function Foo(name){ 
          this.name=name;
        }
        function Goo(age){ 
          this.age=age; 
        }
        Foo.prototype = new Goo(18);  //
        var aoo = new Foo("abc");   //
        aoo instanceof Foo;  // true
        aoo instanceof Goo;  // true
        aoo instanceof Object;   //true
        Foo.constructor;     // function Function() { [native code] }
        Foo.prototype;       // Goo {age: 18}
        aoo instanceof Foo.constructor;  //false
        aoo instanceof Foo.prototype;  // 报错
    bol = prop in obj;  属性是否在对象中[包括原型对象的属性]  
      prop 所要检测的对象的属性 
      obj  被检测的对象 
        可以是一个String包装对象,但不能是一个字符串原始值
        var color1 = new String("green");
        "length" in color1; // true
        var color2 = "coral";
        "length" in color2; // 报错(color2不是对象)
      Example: :
        数组
        var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
        0 in trees        // true
        3 in trees        // true
        6 in trees        // false
        "bay" in trees    // false(必须使用索引号,而不是数组元素的值)
        "length" in trees // true(length是一个数组属性)

        内置对象
        "PI" in Math          // 返回true
        自定义对象
        var mycar = {make: "Honda", model: "Accord", year: 1998};
        "make" in mycar  // 返回true
        "model" in mycar // 返回true
    
        var obj = {"a":1};
        obj.b = obj;
        var bol1 = "b" in obj;       
        var bol2 = "b" in obj.b;     
        var bol3 = "b" in obj.b.b;   
        var bol4 = "b" in obj.b.b.b; 
        console.log(bol1,bol2,bol3,bol4); // true true true true
    ◆逻辑运算符 
      PS:逻辑运算符通常用于布尔值的操作,一般和关系运算符配合使用.
        逻辑运算符有三个:与&&(AND)、或||(OR)、非!(NOT)
      逻辑运算的短路现象
        使用&&时,第一个值为false后面的就不再做运算了;
        使用||时,第一个值为true,则后面的也不做运算了.
    && 逻辑与 
      若两边的操作数有一个操作数不是布尔值时,逻辑与运算就不一定返回布尔值 
        规则如下:
          第一个操作数是对象,则返回第一个操作数
            var box = {}&&(5>3);    //box值为true
            var box = {}&&5;        //box值为5
          第二个操作数为对象,在第一个操作数为true时,返回对象;否则返回false;
            var box =5&&{}  //box为对象{}
            var box =(5>3)&&{}  //box为对象{}
          有一个操作数为null或undefined,则返回null或undefined(除去第一个操作数为false时的情况)
      短路 : 遇到false时,后续不再执行,直接返回false 
        var flag = 1;
        var bool1 = 0 && function(){
          flag = 2;
        }
        console.log(bool1,flag); // 0 1
        var bool2 = 1 && function(){
          flag = 3;
        }
        console.log(bool2,flag); // function (){ flag = 3; } 1
        var bool3 = 1 && (flag = 4); // 不加括号则报错 
        console.log(bool3,flag); // 4 4
        
        fn && fn() 
        // 相当于 
        if (fn) {fn()}
    || 逻辑或 
      PS:返回值不一定为布尔值;
      返回值:
        规则如下:
        第一个操作数为对象,则返回该对象
        第一个操作数为false,第二个任意,返回第二个操作数
          var boo1 = false || 'abc';
          console.log(boo1); // abc
        两个操作数都是null或NaN或undefined时,则对应的返回null或NaN或undefined
      短路: 执行遇到可表示为true的操作符时,则直接返回该操作符,后续不再执行;
        var num = 10;
        function foo(){ 
          num++; 
          return 'foo函数' ;
        }
        var boo1 = 1 || foo(); // foo函数未执行
        console.log(num);  // 10
        console.log(boo1); // 1
        var boo2 = 0 || foo(); // foo函数执行了
        console.log(num);  // 11
        console.log(boo2); // foo函数
    !  逻辑非 
      PS:可用于任何类型值,最终结果返回一个布尔值;
        执行原理:先将这个值转换成布尔值,然后取反;
        使用两次逻辑运算符相当于对值进行Boolean()转型函数处理;
      ★规则:
      操作数是一个对象,返回 false;
      操作数是数值0、空字符串、null、NaN、undefined,返回 true;
      操作数是一个非空字符串,返回 false;
      操作数是任意非0和infinity,返回 false;
    ◆位运算符: 按内存中表示数值的位来操作数值 
      PS: 一般应用中,基本用不到位运算符; 比较基于底层,性能和速度会非常好;
        ECMAScript中的所有数值都以'IEEE-754''64位'格式存储,
        但位操作符并不直接操作64位的值,而是先将64位的值转换成32位的整数,
        然后执行操作,最后在将结果转换回64位,
        对于开发人员来说,由于64位存储格式是透明的,因此整个过程就像是只存在32位的整数一样;
      ~   位非NOT
      &   位与AND
      |   位或OR
      ^   位异或XOR
      <<  左移
      >>  有符号右移
      >>> 无符号右移
    ◆其他运算符 
    =  赋值运算符
     =:将右边的赋值给左边
     复合赋值运算符
       +=/-=/*=//=/%=
    +  字符串连接符
      PS:进行字符的拼接操作(只要需要有一个操作数是字符串即可)
        当有字符串和数值进行+操作时,则默认将数值转换为字符串形式进行拼接操作.
      Example: :
        3+6+"3a";      //"93a",先进行算术运算然后再进行字符串的连接操作.
        ""+3+6+"3a";   //"363a",使用空字符串达到字符连接的效果.
        var a=1,b=2,c=3;
        ""+a+b+c;      //"123",数值和字符串+运算为字符串,运算顺序从左到右.
    ,  逗号运算符: 在一条语句中执行多个操作 
      将多个表达式连接为一个表达式,依次执行每个表达式,最终返回值为最后一个表达式的值 
        console.log(1),console.log(2),console.log(3); // 1 2 3
        
        1,2; // 2
      
        var auu=(aoo=1,boo=2,coo=3);
        console.log(auu);    // 3

        var aoo =(1,2,3); // 3,取最后一个值.
        
        self:
        var aoo = 1,boo = 2;
        相当于: 
        var aoo = 1 ;
        var boo = 2 ;
        而非:
        var aoo = 1;
        boo = 2;
        验证:
          function foo(){
            var aoo = 1, boo = 2; 
            console.log(aoo); // 1
            console.log(boo); // 2
          }
          foo();
          console.log(boo); // boo is not defined
          console.log(aoo);
          
          function foo(){
            var aoo = 1;
            boo = 2;
            console.log(aoo); // 1
            console.log(boo); // 2
          }
          foo();
          console.log(boo); // 2
          console.log(aoo); // aoo is not defined
      在for循环中的使用
        for (var i = 0, j = 9; i <= 9; i++, j--) {
          console.log("" + i  + j  );
        }
      'return'处理之后返回: 在返回值前处理一些操作
        有最后一个表达式被返回,其他的都只是被求值
        function foo () {
          var x = 0;
          return x++, x;
        }
        console.log(foo()); // 1
      配合'var'关键字,同时定义多个变量  
        var box="A", age="20", height="175";  // 同时定义多个变量 
        var aoo = 1, 2==3; // Uncaught SyntaxError: Unexpected number
        var 2==3;          // Uncaught SyntaxError: Unexpected number
        1 , 2==3,function(){ console.log(4); }() // 4;
  三元表达式 
    expr1?expr2:expr3;  三元条件运算符,当expr1为真则执行expr2,否则执行expr3 
      PS: 三元条件运算符相当于if语句的简写形式 
      var box=5>4?'对':'错';    //对,5>4赋值第一个'对'给box.否则第二个.
  ◆运算优先级 
    一般运算中,不必考虑运算符的优先级,因为可以通过圆括号来解决这种问题.
    简易版
      . []()            对象成员 数组存取 函数调用或表达式分组
      ++ -- ~ ! delete new typeof void  一元运算符
      * / %                乘 除 取余
      + - +                加 减 字符串连接
      << >> >>>   位移
      < <= > >= instanceof   关系比较 检测类实例
      == != === !==          等不等
      &
      ^
      |
      &&               逻辑与
      ||               逻辑或
      ?:               条件
      =                赋值或运算赋值
      ,                多重赋值或数组元素
    完整版
      优先级  运算类型              关联性      运算符
      19    圆括号                n/a         ( … )
      18    成员访问              从左到右     … . …
            需计算的成员访问       从左到右     … [ … ]
            new(带参数列表)       n/a         new …( … )
      17    函数调用              从左到右     …( … )
            new(无参数列表)       从右到左     new …
      16    后置递增(运算符在后)   n/a … ++
            后置递减(运算符在后)   n/a … --
      15    逻辑非                从右到左     ! …
            按位非                从右到左     ~ …
            一元加法              从右到左     + …
            一元减法              从右到左     - …
            前置递增              从右到左     ++ …
            前置递减              从右到左     -- …
            typeof               从右到左     typeof …
            void                 从右到左     void …
            delete               从右到左     delete …
      14    乘法                 从左到右      … * …
            除法                 从左到右      … / …
            取模                 从左到右      … % …
      13    加法                 从左到右      … + …
            减法                 从左到右      … - …
      12    按位左移              从左到右      … << …
            按位右移              从左到右      … >> …
            无符号右移            从左到右      … >>> …
      11    小于                 从左到右      … < …
            小于等于             从左到右      … <= …
            大于                 从左到右      … > …
            大于等于             从左到右      … >= …
            in                   从左到右     … in …
            instanceof           从左到右     … instanceof …
      10    等号                 从左到右      … == …
            非等号               从左到右      … != …
            全等号               从左到右      … === …
            非全等号             从左到右      … !== …
      9     按位与               从左到右        … & …
      8     按位异或             从左到右        … ^ …
      7     按位或              从左到右        … | …
      6     逻辑与              从左到右        … && …
      5     逻辑或              从左到右        … || …
      4     条件运算符          从右到左        … ? … : …
      3     赋值                从右到左        … = …
                                              … += …
                                              … -= …
                                              … *= …
                                              … /= …
                                              … %= …
                                              … <<= …
                                              … >>= …
                                              … >>>= …
                                              … &= …
                                              … ^= …
                                              … |= …
      2     yield               从右到左       yield …
            yield*              从右到左       yield* …
      1     展开运算符           n/a            ... …
      0     逗号                从左到右        … , …
  ◆特殊用法  
    ★自运行函数
    !function(){}() 
      等同于 (function(){ })() 
      ()、！、+、-、=等运算符,都将函数声明转换成函数表达式,
      消除了javascript引擎识别函数表达式和函数声明的歧义,
      告诉javascript引擎这是一个函数表达式,不是函数声明,
      可以在后面加括号,并立即执行函数的代码。
      加括号是最安全的做法,因为！、+、-等运算符会和函数的返回值进行运算,有时造成不必要的麻烦。
    val/expr, function(){ }() 
语句: 比表达式更大的单位 
  PS: 程序由语句组成,最简单的语句由一个表达式和表达式后的分号组成.
    在ECMAScript中,所有的代码都是有语句来构成的.
    语句表明执行过程中的流程、限定与约定
    形式上可以是单行语句,或大括号{}括起来的复合语句[复合语句一般也称代码块]
    在语法描述中,复合语句整体可以作为一个单语句处理.
  {} 块语句: JS无块级作用域
  声明语句: 变量声明
  表达式语句: 赋值 与 调用
  ◆分支语句
  if(boo){}  括号的表达式为true时执行语句 
    括号中的若不为布尔值,系统会调用 Boolean() 函数进行转换;
    若需要控制多条语句,那么就需使用{}把多条语句包含在内,推荐都加{}
    if分支语句 if(){}else{}
    if多重分支语句 if(){}else if{}else{}
      else if 的数量为任意个
      可以使用if或else if作为最后一个判断,当使用else时至少会执行一个
      短路执行,即只会有一个分支被执行
        if (true) {
          console.log(1);
        }
        else if (true) {
          console.log(2);
        }
        else {
          console.log(3);
        }
        // 1
  switch(value){} 多重条件判断,用于多个值相等的比较 
    PS:传入值和对比值需是全等关系才会相应的执行.
    switch(传入值){
      case 对比值1:
        控制执行的语句1;
        break;  //break中途退出,防止穿透.
      case 对比值2:
        控制执行的语句2;
        break;
      ...
      default: // 当无条件符合时执行
        控制执行语句n;
    }
  ◆循环语句
  for(初始变量;判断语句;其他语句;){};  for循环 
    具有在执行循环之前初始化变量和定义循环后执行代码的能力;
    其他语句 在 执行语句 后运行;
  while(条件){};  先判断再运行
  do{}while(条件); 先执行后判断,至少会执行一次 
  for(var key in obj){} 无序遍历[会遍历原型链上的属性] [适用'str''arr''obj']  
    PS: 若原型链上的属性设置为可遍历,则也会将其遍历出来;可使用'break'终止循环 
    遍历字符串 
      var str = 'abc';
      var rst = '';
      for(var key in str){
        rst += key + '=' + str[key] + '&'
      };
      console.log(rst); // 0=a&1=b&2=c&
    遍历数组[遍历的下标为字符串类型而非数值类型] 
      var arr = ['a','b','c']
      var rst = '';
      for(var idx in arr){
        // console.log(typeof idx); // string
        rst += idx + '-' + arr[idx]
      } 
      console.log(rst); // 0-a1-b2-c
    遍历对象 
      var obj ={ 
        aoo : "a", 
        boo : 11 
      }
      var rst = '';
      for(var key in obj){ 
        rst += key +':'+ obj[key]
      }
      console.log(rst); // aoo:aboo:11
  ◆控制结构
  break 和 continue  只能用于循环语句中,精确控制代码的执行 
    continue [跳出当前循环]继续下一次循环
    break    跳出整个循环[执行循环后的语句]
      aa: // 命名最外层的循环 
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          for (var k = 0; k < 3; k++) {
            if (k == 1) {
              console.log(i);
              break aa; // 直接跳出最外层的循环 
            }
          }
        }
      }
  return   函数返回
  throw val  异常触发,用于随之抛出自定义错误 
    PS:在遇到throw操作时,代码会立即停止执行
    val 类型无要求
  try{}catch(err){} 异常捕获与处理[ECMA-262 第3版增加] 
    PS:与Java中的 try-catch 语句完全相同,catch 和 finally 必须存在一个
      IE7存在bug:除非有catch否则不执行finally
    try{
      // 可能会导致错误的代码
    } 
    catch(error){
      // 发生错误时执行的代码
      // 当try中代码出错,catch会接收到一个包含错误信息的 error 对象
    } 
    finally{
      // 该部分可选
      // 一定会执行的代码,即使前面包含return语句
    }
    Example: :
      function foo(){
        try {return 0;}
        catch(e){return 1;}
        finally{return 2;}
      }
      foo(); // 2
  其他语句 
  with(){};  修改当前作用域
    PS:运行缓慢,尤其是在已设置了属性值时,尽量少使用;严格模式下不可用 
    Example: :
    var obj = {
      "aa":"abc",
      "bb":11,
      "cc":true
    };
    var aoo = obj.aa;
    var boo = obj.bb;
    var coo = obj.cc;
    console.log(aoo,boo,coo); // abc 11 true
    等价于
    var obj = {
      "aa":"abc",
      "bb":11,
      "cc":true
    };
    with(obj){ 
      var aoo = aa; 
      var boo = bb; 
      var coo = cc; 
    }
    console.log(aoo,boo,coo); // abc 11 true

    var aoo = "hello";
    aoo.toUpperCase(); // HELLO
    with(aoo){
      console.log(toUpperCase());
    }
  label   可在代码中添加标签,以便将来使用 
    var num = 0;
    lab : for(var i = 0 ; i < 10 ; i++){
      for(var j = 0 ; j < 10 ; j++){
        if( i == 2 && j == 2 ){
          break lab;
        }
        num++;
      }
    }
    console.log(num); // 22,2*10+2
    该例子中定义的lab标签可以在将来由break或continue语句引用.
    加标签的语句一般都要与for语句等循环语句配合使用.
------------------------------------------------------------------------------- 
Global|Window 全局对象 
  PS: Global对象未定义如何访问,浏览器中用window对象实现全局访问;
    所有全局作用域中定义的变量和函数,都是Global对象的属性和方法,
  var global = function(){ return this; }  间接获取Global对象
  全局属性/方法 
  ★构造函数 
    Object     构造函数Object
    Boolean    构造函数Boolean
    Number     构造函数Number
    String     构造函数String
    Array      构造函数Array
    Function   构造函数Function
    Date       构造函数Date
    RegExp     构造函数RegExp
    Error          构造函数Error
    EvalError      构造函数EvalError
    RangeError     构造函数RangeError
    ReferenceError 构造函数ReferenceError
    SyntaxError    构造函数SyntaxError
    TypeError      构造函数TypeError
    URIError       构造函数URIError 
  ★特殊值 
    undefined   特殊值undefined  
    NaN         特殊值NaN 
    Infinity    特殊值Infinity 
  ★转换方法 
    bol = Boolean(val)  转换为的布尔值 
      console.log(Boolean(0));         // false
      console.log(Boolean(NaN));       // false
      console.log(Boolean(undefined)); // false
      console.log(Boolean(''));        // false
      其余皆转换为true
    num = Number(val)   转换为数值  
      Number(undefined)  // NaN 
      Number(null);      // 0 
      Number(true);      // 1
      Number(false);     // 0 
      Number(number)     // 对应的值 
        console.log(Number(070)); // 56
      Number("")         // 0
      只包含数值的字符串 
        有效的十六进制格式: 
        console.log(Number('0x10')); // 16 
        其他格式转换成十进制数值,若包含前导0则自动去掉 
        console.log(Number('070')); // 70 
      包含非数值的字符串,返回 NaN 
        console.log(Number('123abc123')); // NaN
      转换对象,先后调用其'vaueOf'、'toString'方法,直到转换为数值,否则报错  
        var obj = {
          valueOf: function() { // 未返回原始值 
            console.log(1);
            return {};
          },
          toString: function() { // 未返回原始值 
            console.log(2);
            return {};
          } 
        }
        Number(obj); 
        // 1 2 Uncaught TypeError: Cannot convert object to primitive value
    num = parseInt(str/num[,radix])  将字符串或数值转换成整数值 
      str/num 待转换的字符串/数值  
        转换从第一个非空格字符开始,到第一个非数字结束 
        console.log(parseInt(' 3.14'));  // 3 
        console.log(parseInt(' 1a2b'))   // 1 
        若第一个非空格字符不是数字或负号,则返回 NaN 
        console.log(parseInt(' abc123')) // NaN 
        可识别十六进制,即字符串以"0x"开头且后面跟数字字符 
        console.log(parseInt('0xALabc')); // 10,labc被自动过滤掉了 
        支持科学计数法形式的转换 
      radix   可选,用于指定各种进制的转换
        2    二进制
        8    二进制
        10   二进制,非以'0x'开头字符的默认值 
        16  十六进制
        Example:
        parseInt('0xA');     // 10,十六进制
        parseInt('070');     // 70,十进制
        parseInt('0xAF');    // 175,十六进制
        parseInt('AF',16);   // 175,指定16进制,可去掉 0x 前导
        parseInt('AF');      // NaN
      ES3和ES5的分歧: ES5不再具备解析八进制,需指定基数 
        parseInt("070");  // ECMAScript 3 认为是 56(八进制)
        parseInt("070");  // ECMAScript 5 认为是 70(十进制)
      Example: 
        Number("");   // 为0;
        parseInt(""); // 为NaN
    num = parseFloat(str)   将字符串转换成整数值/浮点数值  
      PS: 类似'parseInt',区别是数字中可包含一个'.'点; 只能解析为10进制数
      Example: 
      console.log(parseFloat(' 12.0'));   // 12,优先转换为整数值 
      console.log(parseFloat(' 01.20'));  // 1.2,去掉前、后导0
      console.log(parseFloat('123abc'));  // 123,去掉不识别的部分
      console.log(parseFloat('12.3.4'));  // 12.3,只认一个小数点
      console.log(parseFloat('0xA'));     // 0,不识别十六进制,x后面的字符被忽略 
      console.log(parseFloat('1.2e7'));   // 12000000,把科学计数法转化成普通数值
    str = String(val)     将任意类型值转换为字符串 
      undefined、null 分别转换为'undefined'、'null'
        console.log(String(undefined));  // "undefined"
        console.log(String(null));       // "null"
      其他值,先后调用其'toString'、'valueOf'方法 
        若有返回值为基本类型则返回该值,否则最后报错  
        var obj = {
          valueOf: function() { // 未返回原始值 
            console.log(1);
            return {};
          },
          toString: function() { // 未返回原始值 
            console.log(2);
            return {};
          } 
        }
        console.log(String(obj));  // 2 1 报错
    uriStr = encodeURI(str) 将字符串编码为URI 
      PS: 有效的URI中不能包含某些字符,如空格,否则需转换
        不会对本身属于URI的特殊字符",/?:@&=+$#"等ASCII标点符号进行转义 
    str = decodeURI(uriStr) 解码URI 
    uriStr = encodeURIComponent(str) 将字符串编码为URI[完全编码] 
      PS: encodeURIComponent() 方法比 encodeURI() 更加彻底 
        会对任何非标准字符进行编码[ASCII字母、数字及"-_.!～*'()"等进行编码] 
        一般来说 encodeURIComponent() 使用频率要高一些 
    str = decodeURIComponent(str)    解码URI[完全解码] 
    eval(str) 字符串解析器,将JS符串当作脚本来执行 
      PS: 是一种由函数执行的动态代码,比直接执行脚本慢;
      str  要执行解析的JS代码的字符串 
      将解析的JS语句插入到当前位置,作为当前执行环境的一部分 
        PS: 无变量提升,当执行代码时才会解析字符串 
        eval(`function foo(name){
          console.log('hello '+name);
        }`);
        // 相当于
        // function foo(name){
        //   console.log('hello '+name);
        // }
        foo('boy'); // hello boy 
      严格模式下,在外部访问不到 eval() 中创建的任何变量或函数  
        "use strict"; 
        console.log(eval(`var num = 100`),'111'); // undefined  
        console.log(num); // Uncaught ReferenceError: num is not defined
    str1 = escape(str)   对字符串进行编码  [ES3-]
    str1 = unescape(str) 解码由'escape'编码的字符串  [ES3-] 
  ★判断方法 
    bol = isFinite(num) 数值是否有限  
      isFinite(10); // true
    bol = isNaN(val)    能否转换为NaN 
      PS: 先后调用'valueOf''toString'方法,试图将值转换为数值进行判断 
      Example:
      console.log(isNaN(1));      // false
      console.log(isNaN('1'));    // false,'1'是一个字符串数值,可以转换成数值
      console.log(isNaN(true));   // false,true可以转换为1
      console.log(isNaN('abc'));  // true,'abc'不能转换为数值.
      console.log(isNaN(NaN));    // true
  window对象的DOM和BOM属性&方法 [详见DOM&BOM] 
Function 函数类: ECMAscript中所有[构造]函数的基类  
  PS: JS中代码块[大括号之间]里不会产生作用域,函数是唯一能创建新作用域的地方 
    函数也是对象可以向其他值一样作为参数传递 
  创建函数 
    PS:变量名可以使用中文字符来进行命名而不会报错[但最好不要使用中文] 
    function foo(arg){}        函数声明创建 
    var foo = function(arg){}  函数表达式创建 
      var foo = function bar(){ 
        console.log(1);
      }
      foo(); // 1
      bar(); // 报错:bar未定义,会将赋值变量的函数的函数名忽略 
    var foo = new Function('arg1',...,"函数体"); 构造函数创建 
      每个函数都是Function构造器的实例对象  
        function foo(){}
        foo.a =1;
        console.log(foo.a); //1
      Function创建的函数,其父作用域始终指向 window 
        function foo(){
          var aoo = 1;
          var goo = new Function("","console.log(aoo)");
          // 函数 goo 父作用域为window ,
          // 相当于在全局创建的函数,不可访问函数作用域的变量
          var hoo = function(){
            console.log(aoo);
          }
          hoo();
          goo();
        }
        foo();   //1 报错: aoo is not defined
      不推荐使用该方法,会导致解析两次代码,影响性能 
        第一次解析常规ECMAScript代码,第二次是解析传入构造函数中的字符串 
      var foo1 = function(){}
      foo1.constructor;  // Function() { [native code] }
      var foo2 = new Function("a","b","console.log(a+b);");
      foo2(1,3); // 4
    不同声明的差异 
      关键字声明法: 函数的调用可在声明之前[函数声明提升] 
      变量初始化: 函数的创建需在调用前完成 
    函数传参 
      传入的参数不固定,多则舍去,少则用undefined来补充 
        function foo(){ 
          console.log(arguments[0],arguments[1]); 
        };
        foo(1); // 1 undefined
      参数按共享传递 [moIn 'Evaluation Strategy']
    return 函数返回值 
      PS: 函数执行到'return'后直接返回值,后面代码不再执行 
      使用'return'关键字返回值,若没有return默认返回'undefined' 
      'return'后无值,默认返回'undefined' 
        var foo = function(){
          return 
          2;
        }
        console.log(foo()); // undefined
        相当于 
        var foo = function(){
          return ;
          2;
        }
  特殊形式的函数及调用  
    foo()  直接调用 
    obj.foo() 方法调用 
    new Foo() 构造器调用 
    foo.call() call/apply/bind调用 
    IIFE,立即执行的函数 
      (function bar(){ 
        console.log(1);
      })();
      或
      !function(){
        console.log(1);
      }();
      或
      var foo = function(){ 
        console.log(1);
      }();   
      
      (function(a,b){
        console.log(a+b);
      })(2,3); 
    全局函数 [moIn window]
    匿名函数: 未命名的函数 
      单独定义匿名函数程序报错
      function(){ return "abc"; } // 报错
    构造函数: 用于实例化对象[构造函数及其prototype一起相当于类] 
      将首字母大写[约定写法],用于区别其他的一般函数,
      任何函数都可通过new来调用作为构造函数;若不用new来调用,即为执行函数;
    高阶函数: 作为函数参数的函数  
    递归: 一个函数调用本身或者两个函数相互调用 
      PS: 递归必须要定义终止条件,否则无限递归.
        一般递归效率较低,但处理探测或者处理多分支的问题,则效率较高 
      Example:
      用递归求斐波那契数
      斐波那契函数的定义:fib(n)=fib(n-2)+fib(n-1),fib(1)=1,fib(2)=1
      var fib = function(n) {
        // 若 n 是 1 或者 2 则返回 1 作为结果
        // 这是递归终止的条件, 必须要有, 否则无限递归了
        if(n == 1 || n == 2) {
          return 1
        } 
        else {
          // 若 n 不为 1 和 2, 返回 fib(n-2) + fib(n-1)
          // 这时候 fib(n-2) fib(n-1) 需要计算
          // 于是代码进入下一重世界开始计算
          return fib(n-2) + fib(n-1)
        }
      }
  不具备函数重载: 即当函数名相同时会被覆盖掉[不会因为参数或内部定义不同而进行区分] 
  obj = foo.prototype [构造]函数的原型对象,不可枚举 [详见 原型] 
  Function.prototype.xx  Function类的原型对象,也是一个函数 
    console.log(typeof Function.prototype); // function 
    foo.toString()   转换为字符串  [改写 Object.toString] 
    foo.constructor  函数实例的构造函数,即 Function 
    foo.arguments    在函数体内使用,表示其传入的参数 
    num = foo.length    获取函数声明时定义的参数的个数 
      Example: :
      function box(a,b){ return a+b; }
      console.log(box.length);  // 2,表示box的参数有两个.
    str = foo.name      函数的名字
    foo0 = foo.caller   函数执行时的上层函数,全局作用域中则为 null  
      function foo(){
        return arguments.callee.caller;
      };
      function goo(){
        console.log(arguments.callee === foo() ); // true 
        console.log(arguments.callee.caller);     // null 
      };
      goo(); 
    foo.call(context[,arg1,arg2,...]) 改变函数的执行上下文this 
      context  函数执行时'this'的值,为'null'或'undefined'时,不改变指向 
        原始值[数字,字符串,布尔值]的'this'会指向该原始值的自动包装对象 
        相当于 context.foo([arg,..])  [Self]
      arg      函数的参数列表
      Example: 
        var foo = function(){
          console.log(this);
        }
        console.log(foo.call(1));    // Number {[[PrimitiveValue]]: 1}
        console.log(foo.call(true)); // Boolean {[[PrimitiveValue]]: true}
        console.log(foo.call(null)); // window 
        console.log(foo.call(undefined)); // window 
        
        console.log({}.toString()); // [object Object]
        function foo(arg){ 
          console.log(Object.prototype.toString.call(arg)); 
        };
        console.log(foo(7)); // [object Number]
        等价于
        function foo(){ 
          console.log(Object.prototype.toString.call(this)); 
        };
        foo.call(7); // [object Number]
      实现继承的效果 
        function Pet(words){
          this.words = words;
          this.speak = function (){
            console.log(this.words);
          };
        };
        function Dog(words){
          Pet.call(this,words);
        };
        var dog1 = new Dog('wang!');
        dog1.speak(); // wang!
        console.log(dog1); // Dog {words: "wang!", speak: function}
    foo.apply(context[,arr/arrLike])  改变函数的执行上下文this 
      PS: 使用一个指定的this值和若干个指定的参数值的前提下调用某个函数或方法 
        都是函数对象的方法,区别在于接收参数的形式不同.
        改变this的好处:对象不需要与方法发生任何耦合关系
      context  在foo函数运行时指定的 this 值 
        非严格模式下,null 或 undefined 指向全局对象(浏览器中就是window对象),
        原始值(数字,字符串,布尔值)的 this 会指向该原始值的自动包装对象
        相当于 context.foo([arg,..])  [Self]
      arr/arrLike  数组或类数组对象,函数传入的参数, 
        其中的数组元素将作为单独的参数传给 foo 函数
        若该参数的值为null或undefined,则表示不需要传入任何参数 
        从ES5开始可以使用类数组对象 
      Example: 
        function Pet(words){
          this.words =words;
          this.speak =function(){console.log(this.words);}
        }
        function Dog(words){ Pet.call(this,words); }
        // 或者 Pet.apply(this,arguments);
        var dog =new Dog("wang");
        dog.speak(); // wang

        var box={
          color:"蓝色",
          sayColor:function(){ console.log(this.color); }
        }
        box.sayColor();  //蓝色,box调用函数 this就表示box

        var aoo = 1;
        var obj = {aoo: 2};
        function foo(a){console.log(this[a]);}
        foo.call(null,"aoo"); // 1
        foo.call(obj,"aoo");  // 2
      apply和call继承 
        将函数指向对象后,对象将获取到函数的属性
        Example:
          function foo(){ this.name ="abc" }
          var obj ={};
          console.log(obj.name); //undefined
          foo.call(obj);
          console.log(obj.name); //abc

          仿造new
            function Person(name,age){
              this.name =name;
              this.age =age;
            }
            var p1 =new Person("aoo",19); //使用new 创建
            function New(func){
              return function(){
                var obj ={"__proto__":func.prototype};
                func.apply(obj,arguments); //使对象获取到传入函数的属性
                return obj;
              }
            }
            var p2 =New(Person)("boo",18); //使用仿造的new
            console.log(p1); //Person {name: "aoo", age: 19}
            console.log(p2); //Person {name: "boo", age: 18}
    foo0 = foo.bind(context[,arg1,arg2,...]) 返回改变函数this和初始化参数后的拷贝[ES5]
      context 返回函数被调用时,作为其 this  
        相当于 context.foo([arg,..])  [Self]
        当使用 new 操作符() 调用绑定函数时,该参数无效 
      arg     返回函数被调用时,作为其参数 
      使用bind固定参数值 
        function foo(arg1,arg2,arg3){ 
          return arg1 + arg2 + arg3; 
        };
        // undefined 即不改变this的值,100为给 arg1 指定为100,且后续不可变
        var foo1 = foo.bind(undefined,100);
        foo1(1,2); // 103 ,第二、三个参数分别为1、2
        var f2 = foo1.bind(undefined,10);
        foo2(1); // 111
      使用new时,会忽略绑定 
        function Foo(){ 
          this.b = 1; 
          return this.a; 
        };
        var Goo = Foo.bind({a:2});
        Goo(); // 2
        new Goo(); // {b:1} 
        var Hoo = Foo.bind({a:{aoo:3}})
        Hoo();
        new Hoo(); // {b:1} 
      Example: 
        var x = 9;
        var obj = {
          x: 81,
          getX: function() { 
            return this.x; 
          }
        };
        obj.getX(); // 返回 81
        var foo = obj.getX;
        foo(); // 返回 9, 在这种情况下,"this"指向全局作用域
        var goo = foo.bind(obj);
        goo(); // 返回 81

        var obj = {
          foo : 1,
          bar : function(){
            return this.foo;
          }
        }
        obj.bar();  //1
        var a =obj.bar;
        a();        //undefined
        var b =obj.bar.bind(obj)
        obj.bar.bind(obj)() // 1
        b()         //1
        obj.foo =12;
        b()         //12

        var person = {
          name :'a',
          job : '1',
          sayHello : function(){ 
            return this.name + this.job; 
          }
        }
        person.sayHello()     //"a1"
        var anotherGuySayHello =person.sayHello.bind({ name : 'b', job : '2' })
        anotherGuySayHello()  //"b2"
  ◆函数内部属性
  arguments [在函数体内]表示实际传入函数的参数组成的类数组 
    Example: 
      对若干个数值进行累加
      function sum(){
        var sum = 0;
        for(var i = 0;i < arguments.length;i++){
          sum = sum + arguments[i];
        }
        return sum;
      }
      sum(5,6,1); // 12
    arguments.length 在函数体内表示实际传入参数的数量 
    arguments[idx]   读写相应的参数 
      在函数内进行写操作,[非严格模式下]会改变函数的参数[但当参数为 undefined,则不会被改变]
    arguments.callee 在函数体内表示函数本身 
      该属性是一个指针,指向拥有这个arguments对象的函数 
      Example:
        若在函数内部通过函数名调用自身,当改变函数名时,内部需逐一修改
        可使用 arguments.callee 来代替来代替函数名来表示函数本身 
        function sum(num){
          if(num<=1){
            return 1;
          }else{
            return num*sum(num-1);
          }
        }
        function box(sum){
        if(num<=1){
          return 1;
        }
        else{
          return num*arguments.callee(num-1);
          //此时arguments.callee等价于box
        }
      }
  this  函数据以执行的环境对象,执行函数时的'context'上下文对象   
    PS: 函数执行的场合不同this值也不同,但始终指向当前运行的对象;
      在绝大多数情况下,函数的调用方式决定了this的值;
      this不能在执行期间被赋值;
      当在严格模式中调用函数,上下文将默认为 undefined 
    在全局运行上下文中[在任何函数体外部],指向全局对象'window' 
      NodeJS环境,全局作用域中上下文中始终是Global对象 
      console.log(this === window); // true 
      var aoo = 1; 
      console.log(this.aoo,window.aoo); // 1 1,定义的全局变量实际上就是window的属性
      this.boo = 2;
      console.log(boo); // 2 
    函数中: 'this'取决于函数是如何调用的 
      普通函数调用:this始终指向'window'[严格模式下指向 undefined]
        var aoo = 1;
        function foo(){
          var aoo = 2;
          console.log(this);   //window
          console.log(this.aoo); //1
          this.aoo =3;
          console.log(this.aoo); //3
        }
        foo();
        相当于
        window.foo()

        var aoo = 1;
        function foo(){
          console.log(this.aoo);
          var aoo =2
          function goo(){
            console.log(this.aoo);
          }
          goo();
        }
        var obj = {aoo: 3, hoo: foo};
        obj.hoo(); //3,1

        var aoo =1;
        var obj ={
          aoo:2,
          foo:function(){
            return function(){return this.aoo;}
          }
        }
        console.log(obj.foo()());  // 1
      作为构造函数:this表示一空对象,其原型为 Foo.prototype 对象 
        var aoo = 1;
        function Foo(){ 
          this.aoo = 2;
        }
        function Goo(){ 
          this.aoo = 3;
          return {aoo:4}; 
        };
        var obj1 = new Foo();
        var obj2 = new Goo();
        console.log(obj1.aoo,obj2.aoo); // 2 4 
      使用对象方法调用:this指向调用方法的对象 
        var obj = {aoo:100};
        function foo(){ 
          return this.aoo; 
        };
        obj.goo = foo;
        console.log(obj.goo()); // 100
    对象内 
      在实现对象的方法时,可以使用this指针来获得该对象自身的引用.
      var aoo = 1;
      function foo(){ 
        console.log(this.aoo);  
      }
      var obj = { aoo: 2,  foo : foo }
      obj.foo(); // 2 ,obj调用的this指向obj
      var goo = obj.foo;
      goo();     // 1 
      相当于 window.goo(); this指向window

      var aoo = 1;
      var obj = {
        aoo : 2,
        foo : function(){
          return function(){ 
            return this.aoo; 
          }
        },
      }
      var val = obj.foo()(); // 相当于 (obj.foo())(); 
      console.log(val);  // 1 
      
      var obj = {
        name : "小明",
        age : 12,
        sex : "男",
        sayhi : function(){
          return "say";
        },
        info : function(){ //使用this访问当前对象的属性
          return this.name+"年龄"+this.age; 
        }
      }
      obj.info(); // 小明年龄12
    DOM中 
      var el = document.querySelector("#el");
      el.addEventListener("click",function(){
        console.log(this);
      })
      //表示被点击的那个元素对象
    Example: 
      var aoo = 1;
      var obj = { 
        aoo : 2, 
        foo : function(){
          return this.aoo;
        } 
      }
      var val1 = obj.foo();   // 2
      var val2 = (obj.foo)();  // 2
      var val3 = (obj.foo = obj.foo)();  // 1
      var goo = obj.foo;
      var val4 = goo();  // 1
      console.log(val1,val2,val3,val4); // 2 2 1 1 
    声明局部变量来保存this引用 
      当需要在嵌套函数中读取调用被嵌套函数的对象的属性时
      var aoo = 1;
      function foo(){
        console.log(this.aoo);
        var that = this;
        var aoo = 2
        function goo(){
          console.log(that.aoo);
        }
        goo();
      }
      var obj = {aoo: 3, hoo: foo};
      obj.hoo(); //3,3

      通过把外部作用域中的this对象保存在一个闭包能访问到的变量中,实现闭包访问该对象
      var aoo =1;
      var obj ={
        aoo:2,
        foo:function(){
          var that =this;
          return function(){return that.aoo;}
        }
      }
      console.log(obj.foo()());  // 2
Object 基础类: ECMAscript中所有对象的基类 
  JS中所有对象实例都继承自Object类型 
    Object.prototype.foo = function(){ // 所有类型的对象都会继承到 
      return '来自 Object'
    }
    var goo = function(){}
    var arr = []
    console.log(goo.foo(),arr.foo()); // 来自 Object 来自 Object
  Object.xx    
    Object 函数继承自 Function 
      console.log(typeof Object.call); // function 
      console.log(Object.call === Function.prototype.call); // true 
    Object.create()  [moIn 引用类型]  
    bol = Object.is(val1,val2)  值是否相同[可能存在兼容问题] 
      与 == 和 === 的逻辑都不同 
      Example:
      Object.is(+0,-0);    // false
      Object.is(0,0);      // true
      Object.is(NaN, NaN); // true
    obj = Object.assign(obj1[,obj2,..])  合并多个对象,返回合并后的对象  
      Example:
      console.log(Object.assign({aoo:"abc"})); // {aoo: "abc"} 
    Object.entries() 
    Object.values()   
    Object.getOwnPropertySymbols 
    ★对象成员操作 
    arr = Object.keys(obj)  获取可枚举的自有成员 [ES5] 
      Object.keys(obj).length;    获取对象的"长度"
    arr = Object.getOwnPropertyNames(obj)  查询所有自有成员[包括不可枚举属性] [ES5] 
      var obj = {
        aoo: 1,
        boo: 'a'
      }
      Object.defineProperty(obj,'coo',{
        value : 11,
      });
      var arr = [];
      for(var key in obj){
        arr.push(key);
      };
      console.log(obj); // {aoo: 1, boo: "a", coo: 11} 
      console.log(arr); // ["aoo", "boo"] 
      console.log(Object.getOwnPropertyNames(obj)); // ["aoo", "boo", "coo"] 
    ★原型相关 
    proto = Object.getPrototypeOf(obj) 返回原型对象  
    Object.setPrototypeOf() 
    ★属性特性相关 
    obj = Object.getOwnPropertyDescriptor(obj,key)  查询成员的特性配置 [ES5] 
      PS: 可对DOM或BOM对象使用该方法;若查询的属性不存在则返回 undefined 
        如果是访问器属性,这个对象的属性有configurable、enumerable、get 和set;
        如果是数据属性,这个对象的属性有configurable、enumerable、writable 和value 
      console.log(Object.getOwnPropertyDescriptor({aoo:"a"},"aoo"));
      // Object {value: "a", writable: true, enumerable: true, configurable: true}
    obj = Object.getOwnPropertyDescriptors(obj)  查询对象所有成员的特性配置 [ES5]
    Object.defineProperty(obj,key,{   // 定义对象的成员及其特性[ES5]  
      value: val,       // 默认为原始值  
      writable: bol,    // 默认 false
      enumerable: bol,  // 默认 false
      configurable: bol // 默认 false
      Example: 
        var proto = {}
        Object.defineProperty(proto,'aoo',{
          value: 0 // 其他则默认为 false
        })
        var obj = Object.create(proto);
        obj.aoo = 1;
        console.log(obj.aoo); // 0,未设置成功 
        // Object.defineProperty(proto,'aoo',{  // 重复定义报错 
        //   value: 0 // 其他则默认为 false
        // })
        // 解决办法:重新在对象上定义该属性的特性 
        Object.defineProperty(obj,'aoo',{
          writable: true,
          configurable: true
        })
        console.log(obj.aoo); // undefined
        obj.aoo = 100;
        console.log(obj.aoo); // 100 
      // 不能同时定义'数据属性'和'访问器属性'[要分开定义] 
      get: function(){ // 未设置则不能读
      },
      set: function(){ // 未设置则不可写
      },
      enumerable: bol,  // 默认 false 
      configurable: bol // 默认 false 
      优先按照定义的配置来执行 
        var Foo = function(){ }
        Object.defineProperty(Foo.prototype,'boo',{
          get: function(){
            console.log(11111);
            return 1;
          },
          set: function(val){
            console.log(22222);
            this.aoo = 11;  // this 指向实例 
          }
        })
        var obj = new Foo(); 
        console.log(obj.boo); // 11111 1 
        obj.boo = 2; // 22222 
        console.log(obj,obj.boo); // Foo {aoo: 11} 1
    }); 
    Object.defineProperties(obj,{     // 同时定义多个成员及特性[ES5] 
      key1: {
        value: val,       // 默认为原始值 
        writable: bol,    // 默认 false
        enumerable: bol,  // 默认 false
        configurable: bol // 默认 false
      },
      key2: {
        get: function() {    // 未定义则不可读 
        },
        set: function(val) { // 未定义则不可写 
        },
        enumerable: bol,  // 默认 false
        configurable: bol // 默认 false
      }
      ...
    });  
    bol = Object.isExtensible(obj)  对象的属性/方法能否增加[ES5] 
    bol = Object.isSealed(obj);     是否被密封[ES5] 
    bol = Object.isFrozen(obj);     是否被冻结[ES5] 
    Object.preventExtensions(obj)  阻止给对象新增属性[ES5] 
      PS: 但可修改和删除已有属性; 只是对对象操作,对其原型链无影响
    Object.seal(obj)     属性不可扩展、不可配置  [ES5]
      PS: 只是对对象操作,对其原型链无影响
    Object.freeze(obj)   属性不可扩展、不可写、不可配置[最严格的防篡改级别][ES5] 
      PS: 只是对对象操作,对其原型链无影响
  Object.prototype.xx 
    foo = obj.constructor  实例的构造函数 
    val = obj.valueOf()  对象转换为基本类型,通常与'toString'返回值相同  
      不一定能转换成基本类型 
        var obj1 = {key1:1}.valueOf();
        console.log(obj1,typeof obj1); // {key1: 1} "object" 
      同时定义'valueOf'和'toString'时 
        先调用'valueOf'方法,若返回值为基本类型,则返回该基本类型,
        否则,调用'toString',若返回值为基本类型,则返回该基本类型,
        否则报错 
      只定义'toString'方法时  
        转换为基本类型时,直接调用'toString',当返回值为基本类型则返回, 否则报错 
        var obj2 = {key1:1} 
        obj2.toString = function(){
          return 100;
        }
        console.log(+obj2);   // 100 
        console.log(''+obj2); // 100 
    str = obj.toString([radix]) 对象转换为基本类型 
      num.toString([radix]); 返回数值的字符串 
        radix 可选,默认为10,表示进制,一般为 2、8、16 等 
        var num = 10;
        num.toString();    // '10'
        num.toString(2);   // '1010',二进制输出
        123.1.toString(); // "123.1"
      foo.toString(); 返回定义该函数对象的字符串[函数的源代码]
        var foo = function(){
          console.log(1);
        }
        foo.toString(); //"function(){ console.log(1); }"
      arr.toString(); 将数组成员通过','连接为字符串返回[和 .join(',') 效果一样] 
        会对数组的每一项调用 toString() 
          undefined 和 null 会被转换成空字符串 
          var arr = ['aoo',{boo:'boo'},33] 
          console.log(arr.toString());  // aoo,[object Object],33 
      obj.toString(); 返回"[object Object]" 
        var obj = {};
        obj.toString(); // "[object Object]"
      自定义'toString'方法 [详见 'valueOf']
    str = obj.toLocaleString() 对象的本地字符串表示,通常与toString的返回值相同 
    bol = obj.hasOwnProperty(key)   是否存在该属性[不包括原型链]   
      var obj = {key1: 1}
      console.log(obj.hasOwnProperty('key1'));  // true
    bol = obj.propertyIsEnumerable(key) 查询属性是否能通过'for-in'语句枚举 
    bol = proto.isPrototypeOf(obj)  是否存在于对象的原型对象链上  
      Example:
      function Foo(){};
      var aoo = new Foo();
      console.log(Foo.prototype.isPrototypeOf(aoo));    // true
      console.log(Object.prototype.isPrototypeOf(aoo)); // true
    obj.__proto__ === Foo.prototype 实例的原型对象 [详见 原型]
Boolean 布尔类: 处理布尔值的'包装对象' 
  var bol = new Boolean(); 创建布尔值基本包装对象 
  Boolean.prototype.xx  
    bol.constructor === Boolean  // true 
    bol = bol.valueOf()   返回当前布尔值 
      对 Object.prototype.valueOf 进行了改写 
      console.log(Boolean.prototype.valueOf == Object.prototype.valueOf); // false 
      console.log(true.valueOf()); // true 
      console.log(false.valueOf()); // false 
      console.log(typeof false.valueOf()); // boolean 
    str = bol.toString()  转换为字符串 
      对 Object.prototype.toString 进行了改写
        console.log(Boolean.prototype.toString == Object.prototype.toString); // false 
      console.log(true.toString());  // true   
      console.log(false.toString()); // fasle  
      console.log(typeof alse.toString()); // string   
Number 数值类: 处理数值的'包装对象' 
  num = new Number([val]);  创建数值基本包装对象  
    var num1 = new Number();
    var num2 = new Number(1);
    console.log(num1);    // Number {[[PrimitiveValue]]: 0}
    console.log(num2);    // Number {[[PrimitiveValue]]: 1} 
    console.log(typeof num2);   // object
  Number.xx  
    Number.MAX_VALUE           最大值,1.7976931348623157e+308 
    Number.MIN_VALUE           最小值,5e-324
    Number.NEGATIVE_INFINITY   -Infinity
    Number.POSITIVE_INFINITY   Infinity
    Number.NaN                 NaN
    Number.MAX_SAFE_INTEGER    9007199254740991               
    Number.MIN_SAFE_INTEGER    -9007199254740991               
    Number.EPSILON             2.220446049250313e-16           
    Number.isFinite()                   
    Number.isInteger()                   
    Number.isNaN()                   
    Number.isSafeInteger()                   
    Number.parseFloat()                   
    Number.parseInt()                   
  Number.prototype.xx 
    1..constructor === Number  // true 
    str = num.toFixed(x)  将保留x位小数  [会四舍五入] 
    str = num.toExponential(x)  以科学计数法表示并保留x位小数 
    str = num.toPrecision(x)   以指数或点形式来表示[根据x的长度来决定形式] 
      console.log( 123.111.toPrecision(1)); // 1e+2 
      console.log( 123.111.toPrecision(2)); // 1.2e+2 
      console.log(typeof  123.111.toPrecision(2)); // string 
    num.toString 
    num.valueOf 
    num.toLocaleString 
String 字符类: 处理字符串的'包装对象' 
  var str = new String([val])   创建字符串基本包装对象  
    console.log(new String('abc'));
    // String {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"} 
  String.xx 
    str = String.fromCharCode([num,num...])  返回指定Unicode值对应的字符串  
      Example: 
      console.log(String.fromCharCode(72,69,76,76,79));  // "HELLO"
    String.fromCodePoint() 
    String.raw() 
  String.prototype.xx 
    console.log('a'.constructor === String); // true  
    ★字符获取 
    num = str.length  只读,字符长度 
      console.log("abc"['length']);    // 3
    str1 = str[idx] 下标法访问字符 
      console.log('abc'[1]); // b 
    str1 = str.charAt(idx)  返回指定下标对应的字符 
      console.log("abc".charAt(1)); // "b"
    num = str.charCodeAt(idx)  以Unicode编码形式显示索引位置的字符 
      var num1 = 'Ab'.charCodeAt(1)   
      var num2 = 'abc'.charCodeAt(0)  
      console.log(num1,num2,typeof num1) // 98 97 "number"
    ★字符串获取 
    str1 = str.slice(bgn[,end])  字符截取[详见 arr.slice()] 
    str1 = str.substr(bgn[,num]) 从指定位置开始的num个字符 
      当只有一个参数且负数时,同 slice 
      当n为负数或0时,返回空字符串 
    str1 = str.substring(idx1[,idx2])  返回截取的字符串
      idx1  必须,若为负数返回全部字符串
      idx2  默认到最后,若为负,则取0 
      截取的范围为[idx1,idx2) 或 [idx2,idx1)  
        var str = 'abcde' 
        console.log(str.substring(1,2)); // b 
        console.log(str.substring(2,1)); // b 
    ★字符串对比 
    bol = str.includes(str1)  str中是否包含str2 
    idx = str.indexOf(str1[,bgn]) 指定位置向后首个指定字符串的下标,否则返回-1 
      bgn  可选,开始查询的下标,默认为 0 
      Example:
      'abcdef'.indexOf('bc')   // 1
      'abcdef'.indexOf('ac')   // -1
    idx = str.lastIndexOf(str1[,bgn]) 指定位置向前的首个指定字符串的下标,否则返回-1 
      bgn  可选,开始查询的下标,默认为 str.length  
    idx = str.search(str1/rgep)   字符串中首个指定字符串的下标,否则返回-1  
    arr = str1.match(str2/rgep)    返回指定字符匹配到的数组 
      arr 匹配结果数组
        arr.index 
        arr.input 
        数组的第一项是与整个模式匹配的字符串 
        之后的每一项[如存在]保存着与正则表达式中的捕获组匹配的字符串 
    num = str1.localeCompare(str2)  字符串比较 
      两个字符串相等,返回 0 
      第一个不同的字母,若str1大,则返回 1,否则返回 -1 
    ★字符串修改
    str1 = str.replace(targetStr/rgep,replaceStr/foo)  返回替换后的字符串 
      targetStr   rgep/str,将被替换的字符串 
        console.log('abcdeab'.replace('ab','11'));  // 11cdeab 
        console.log('abcdeab'.replace(/ab/g,'11')); // 11cde11 
      replaceStr  用于替换的字符 
        ▼一些特殊的字符序列,将正则表达式操作得到的值插入到结果字符串中 
        $$       $
        $&       匹配整个模式的子字符串。与RegExp.lastMatch的值相同
        "$'"     匹配的子字符串之前的子字符串。与RegExp.leftContext的值相同
        "$`"     匹配的子字符串之后的子字符串。与RegExp.rightContext的值相同
        $n       匹配第n个捕获组的子字符串,其中n等于 0-9 
          $1是匹配第一个捕获组的子字符串,$2是匹配第二个捕获组的子字符串,以此类推。
          如果正则表达式中没有定义捕获组,则使用空字符串
        $nn      匹配第nn个捕获组的子字符串,其中nn等于 01-99 
          $01是匹配第一个捕获组的子字符串,$02 是匹配第二个捕获组的子字符串,以此类推。
          如果正则表达式中没有定义捕获组,则使用空字符串
        Example: 
        var text = "cat, bat, sat, fat";
        result = text.replace(/(.at)/g, "word <$1>");
        console.log(result); // word <cat>, word <bat>, word <sat>, word <fat> 
      foo      回调函数,返回值作为替换字符串   
        每匹配一次就会调用一次,当正则全局匹配时可能调用多次 
        函数的参数：
        match      匹配的子串,对应 $& 
        p1,p2,...  当第一个参数为rgep时,代表第n个括号匹配的字符串,对应 $1,$2... 
        offset     匹配到的子字符串在原字符串中的下标 
        string     被匹配的原字符串
        Example:  
        var str1 = 'abc12345#$*%'
        var str0 = str1.replace(/([^\d]*)(\d*)/,function(match,p1,p2,idx,str){
          console.log(" -- ",match) // --  abc12345 
          console.log(" -- ",p1)    // --  abc
          console.log(" -- ",p2)    // --  12345
          console.log(" -- ",idx)   // --  0
          console.log(" -- ",str)   // --  abc12345#$*%
          return '==';
        });
        console.log(str0);  // ==#$*% 
    arr = str1.split([str2/rgep [,num]])   返回str2字符分割成的数组 
      PS: 与 .join() 或互为反操作 
      str2   用于分割的字符串,可选,默认不分割   
        var str = 'abcdefg'
        console.log(str.split()); // ["abcdefg"]
      num    限定数组的长度,默认不限定 
        var str1 = 'babcabbabd'
        var str2 = str1.split('a')
        var str3 = str1.split('a',2)
        var str4 = str1.split('a',100)
        console.log(str2); // ["b", "bc", "bb", "bd"] 
        console.log(str3); // ["b", "bc"] 
        console.log(str4); // ["b", "bc", "bb", "bd"] 
      当分割字符不在目标字符中时,返回仅有该字符串一个成员的数组 
        var str = 'abcdefg'
        console.log(str.split('z')); // ["abcdefg"]
        console.log(str.split());    // ["abcdefg"] 
      Example: 
      var str = "1-2-3";
      console.log(str.split("-")); //返回值为["1","2","3"]
    str = str0.concat(str1,str2,...)   返回拼接后的字符串 
      var str = 'abc'
      console.log(str.concat('a','b')); // abcab 
    str1 = str.trim()  返回去除头尾空格后的字符串  
      var str = ' 12 3 ';
      var res = str.trim();
      console.log("|" + res + "|" ); // |12 3|
    ★字符串转换 
      PS: 只有几种语言[如土耳其语]具有大小写本地性,一般是否本地化效果是一致的 
    str1 = str.toUpperCase()  返回转换为大写的字符串 
    str1 = str.toLowerCase()  返回转换为小写的字符串 
    str1 = str.toLocaleUpperCase()  返回转换为本地大写的字符串 
    str1 = str.toLocaleLowerCase()  返回转换为本地小写的字符串 
    str.toString() 
    str.valueOf() 
    ★HTML方法: Web浏览器提供  
    str.anchor() 
    str.big() 
    str.bold() 
    str.fixed() 
    str.fontcolor() 
    str.fontsize() 
    str.italics() 
    str.link() 
    str.small() 
    str.strike() 
    str.sub() 
    str.sup() 
    str.blink() 
    ★其他方法 
    str.endsWith() 
    str.normalize() 
    str.startsWith() 
    str.trimLeft() 
    str.trimRight() 
    str.codePointAt() 
    str.padEnd() 
    str.padStart() 
    str.repeat() 
  ★借用方法
  Array.prototype.join.call(str1,str2)   使用str2来间隔str1 
    Example: :
      var str ="123456";
      var s ="-";
      Array.prototype.join.call(str,s); // "1-2-3-4-5-6"
      var str ="1-2-3-4-5-6";
      var s ="=";
      Array.prototype.join.call(str,s,'-'); // "1=-=2=-=3=-=4=-=5=-=6"
Array 数组类: 一种特殊类型的对象,可类比成有序数据的对象 
  PS: 数组最大长度为 2^23-1 
  'idx-val'结构: '索引-元素'组成的有序集合 
    idx数组索引 
      下标可设置为[非自然数]数字和字符,但不将其计算在数组的长度中
        var arr=[];
        arr[0]=1;
        arr[1]=3;
        console.log(arr); // [1, 3]
        arr["a"]=5;
        arr[12.5]="abc";
        console.log(arr); // [1, 3, a: 5, 12.5: "abc"]
        arr["a"];   // 5 ,仍然存在且可以访问,但是不计算在数组的长度中
        console.log(arr.length);    //2
    val数组元素
      数组元素也可以为表达式 
        var x = 3;
        var arr = [2*x,x+3,x];
        console.log(arr); // [6, 6, 3]
      省略数组中的某个值,则默认为undefined
        var arr=[1,,3];
        console.log(arr); // [1, undefined × 1, 3]
    JS会自动忽略最后一个逗号,可能存在兼容问题 
      var arr = [1,2,];
      console.log(arr.length,arr); // 2 [1, 2]
    稀疏数组: 并不含有从0开始的连续索引,一般length属性值比实际元素个数大 
      var arr1 = [undefined]; // 有一个元素为undefined
      var arr2 = new Array(1);// 稀疏数组,元素长度为1,但无元素
      console.log(arr1,arr2); // [undefined]  []
      console.log(0 in arr1); // true
      console.log(0 in arr2); // false
      var arr3 = []
      console.log(0 in arr3); // false
      arr3.length = 100  // 稀疏数组
      arr3[99] = 'a'
      console.log(98 in arr3,99 in arr3); // false true 
      var arr4 = [,,,]  // 稀疏数组
      console.log(0 in arr4); // false
  创建数组 
    [] 字面量创建 
       空数组:var arr=[];
       带有元素的数组:var arr=[1,2,3,3,2]
       var box = [,,]          //表示数组长度为2或3,可能有兼容性问题
       var foo = [1,2]
       foo["name"] = "fan"; //也允许该操作
       foo;                 //[1, 2]
       foo.name;            //"fan"
       foo.length;          //2
       console.log(foo)     //[1, 2, name: "fan"]
    arr = new Array([val1,val2,..]) 内置构造函数创建 
      PS: 可省略'new'关键字,但不推荐 
      无参数: 创建空数组 []
      单参数: 作为数组的元素或指定数组的长度 
        var arr1 = new Array("a");
        var arr2 = new Array(6);   //表示该数组的长度为6
        console.log(arr1);   // ["a"]
        console.log(arr2);   // [undefined × 6] 
      多参数: 将参数作为数组的元素 
        var arr = new Array(1,3,true,"abc"); 
        console.log(arr);  // [1, 3, true, "abc"]
  Array.xx  
    bol = Array.isArray(arr)  是否为数组 [IE9+ ES5] 
    Array.from()
    Array.of()
  Array.prototype.xx 
    console.log([].constructor === Array); // true 
    ◆信息查询 
    val = arr[idx]   读写数组元素 
      var arr = [];
      arr[100] = 3;
      console.log(arr.length);  //101
    num = arr.length 读写数组长度 
      var arr = [1,2,3,4,5];
      arr.length = 3;
      console.log(arr); // [1,2,3]
      arr.length = 4;
      console.log(arr); // [1, 2, 3, undefined ]
    bol = arr.includes(val [,index])  检测元素是否存在 
      val   需要查找的元素值;
      index 可选,默认为 0,从该索引处开始向后查找 
      Example:
        [1, 2, 3].includes(2);     // true
        [1, 2, 3].includes(4);     // false
        [1, 2, 3].includes(3, 3);  // false
    idx = arr.indexOf(val[,bgn])     查询元素索引[ES5] 
      PS:返回值为下标值,若找不到则返回-1 
      bgn  表示开始查询的索引位置,默认为0 
        若为负,则为 bgn+arr.length 
    idx = arr.lastIndexOf(val[,bgn]) 查询元素的索引[从右向左][ES5] 
    ◆改变原数组
    arr1 = arr.reverse() 返回颠倒所有成员后的数组   
      Example: :
      var arr = [1, 2, 3];
      var result = arr.reverse();
      console.log(arr);  // [3, 2, 1] 
      console.log(result===arr);  // true 
    num = arr.push(val1[,val2,...]) 末尾添加成员,返回新数组长度 
      val 在原数组尾部添加的成员,添加多个成员用逗号隔开
      Example:
      var arr = [1];
      console.log(arr.push(2)); // 2 
      console.log(arr);         // [1, 2]
    val = arr.pop()    返回删除的尾部成员  
      PS: 无参数;若原数组为空,则无操作,并返回 undefined 值 
      Example: 
      var obj = [1,2,3];
      var member1 = obj.pop();  
      console.log(member1); // 3
      console.log(obj);     // [1, 2]
    num = arr.unshift(val1[,val2,...]) 头部添加元素,返回新数组长度 
    val = arr.shift()  返回删除的头部成员 
    arr1 = arr.splice(bgn[,num][,v1,v2,...]) 删除[添加]元素,返回由删除元素组成的数组
      PS:删除若干个元素,使用参数列表中声明的值从被删除的元素处插入,
        添加的元素的个数可大于、等于或小于删除元素的个数; 
        若没有删除元素,则返回空数组;
      bgn  开始删除的元素的下标[包括该元素] 
        若超出数组的长度,则从数组末尾开始[不会删除元素了]；
        若是负值,则为 arr.length+bgn 
      num 可选,默认为arr.length[SlSt],要删除元素的个数 
        若为 0,则不移除元素,此时至少应添加一个新元素
        若大于bgn之后的元素个数,则取该数值
      v   可选,要添加进数组的元素;若无,则只删除元素 
      Example: 
        var arr = [1,2,3];
        var aoo = arr.splice
        arr.splice(2,1);  // [2]
        console.log(arr); // [1, 3]
    ◆不改变原数组
    arr1 = arr.slice([bgn][,end]); 返回复制的片段 
      PS: 截取的内容为'[bgn,end)'前闭后开区间,长度为'end-bgn'
        当bgn或end有为负数时,则使其加上 str.length 来代替
      bgn  num,开始下标,可选,默认为 0 
        var arr = [1,2,3];
        var aoo = arr.slice();
        console.log(aoo); // [1,2,3]
      end  num,结束下标,可选,默认为 arr.length 
      Example: 
        将'Array-like'类数组对象转换成数组 
        function list() { 
          console.log(arguments,typeof arguments);
          // 将该方法绑定到 arguments 类数组对象上 
          return Array.prototype.slice.call(arguments); 
          // 也可用 [].slice.call(arguments) 来代替.
        }
        console.log(list(1, 2, 3)); // [1, 2, 3]
        // 使用 bind 来简化该过程 
        var slice = Function.prototype.call.bind(Array.prototype.slice);
        function list() { 
          return slice(arguments); 
        }
        console.log(list(1, 2, 3)); // [1, 2, 3]
    arr1 = arr.concat(val1[val2,..]);  返回拼接后的新数组  
      val  数组或数组成员  
      Example: 
      var arr = [1,2,3];
      var arr1 = arr.concat(4,5);
      var arr2 = arr.concat([4],5);
      var arr3 = arr.concat([4,[5]],6);
      console.log(arr);  // [1, 2, 3] 
      console.log(arr1); // [1, 2, 3, 4, 5]  
      console.log(arr2); // [1, 2, 3, 4, 5]  
      console.log(arr3); // [1, 2, 3, 4, [5], 6]  
    str1 = arr.join([str])  使用str串连每个元素 
      str   可选,默认为逗号',',表示用于连接的字符
      为 null 和 undefined 的成员,用空字符串表示 
        function repeatStr(str,n){ // 重复字符串 
          var arr = new Array(n+1) // [undefined × 4] 
          console.log(arr);
          return arr.join(str); 
        };
        console.log(repeatStr("aoo",3)); // aooaooaoo 
      Example: 
      将 [1,2,3] 输出为字符串"1-2-3"
      var arr = [1,2,3];
      var str = arr.join("-"); 
      console.log(arr); // [1, 2, 3]
      console.log(str); // 1-2-3 
    ◆遍历方法 
      以下方法中,函数内修改元素'val',不会改变原数组,但修改'arr[idx]',则会改变原数组 
    arr.forEach(foo(val,idx,arr)[,context])  数组遍历 [ES5] 
      PS: 已删除或者从未赋值的项将被跳过,而值为 undefined 的项则不会被跳过
        无法中止或跳出forEach循环,除非报错.
      foo  遍历函数 
      val  数组成员 
      idx  成员索引 
      arr  数组本身 
      context   foo的执行上下文,可选,默认为数组本身  
        类似执行如下函数 foo.call(context, element, index, array).
        若 context 值为 undefined 或 null,
        函数的 this 值取决于当前执行环境是否为严格模式,
        严格模式下为 undefined,非严格模式下为全局对象.
        function Counter() {
          this.sum = 0;
          this.count = 0;
        }
        Counter.prototype.add = function(array) {
          array.forEach(function(entry) {
            this.sum += entry;
            ++this.count;
          }, this);
          console.log(this); // Counter {sum: 16, count: 4}
        };
        var obj = new Counter();
        obj.add([1, 3, 5, 7]);
        console.log(obj.count); // 4
        console.log(obj.sum);   // 16
      遍历范围在第一次函数调用前会确定,之后添加到数组中的项不会被foo访问到 
        若已经存在的值被改变,则传递给 foo 的值是 forEach 遍历到他们那一刻的值,
        已删除的项不会被遍历到.
      无法自定义终止遍历,只有出现错误时会停止[可通过try来抛出异常] 
        使用try来抛出错误且不影响后续的其他代码执行 
        var arr = [1,2,3,4,5];
        try {
          arr.forEach(function(val,idx,arr){
            console.log(val,'1');
            if (val == 3) {
              console.log(val,'2');
              throw '1111' ;
            }
          });
        } 
        catch (e) {
          console.log('执行了');
        } 
    arr = arr.sort([foo(val1,val2)])   返回排序后的数组[改变原数组]  
      foo 可选,传入数组相邻的两个元素,返回值为true则调序,否则不变; 
        通过冒泡的算法大小排序[SlSt];
        若省略,元素按照转换为的字符串的首个字符的Unicode位点进行排序
        var arr =[31,1,2,5,4]
        arr.sort();
        console.log(arr); // [1, 2, 31, 4, 5]
      Example:  
        // 从小到大排序
        var arr = [5,2,4,17];
        arr.sort(function(val1,val2){
          return val1 - val2;
        });
        console.log(arr); // (4) [2, 4, 5, 17] 
        
        // 颠倒数组元素顺序
        var arr = ['a','b','c'];
        var resArr = arr.sort(function(val1,val2){
          return true;
        });
        console.log(arr);    // ["c", "b", "a"]
        console.log(resArr); // ["c", "b", "a"]
    bol = arr.every(f(val,idx,arr)[,context]) 返回值是否全部为真[ES5]
      PS:若有一次返回值为 false,则该方法就返回 false,并停止遍历;
        foo 只会为那些已经被赋值的索引调用, 不会为那些被删除或从来没被赋值的索引调用;
        every 遍历的元素范围在第一次调用 foo 之前就已确定了,
        在调用 every 之后添加到数组中的元素不会被 foo 访问到,
        若数组中存在的元素被更改,则他们传入 foo 的值是 every 访问到他们那一刻的值,
        那些被删除的元素或从来未被赋值的元素将不会被访问到;
      context 执行 callback 时使用的 this 值 
        若为 every 提供一个 context 参数,在该参数为调用 callback 时的 this 值。
        若省略该参数,则 callback 被调用时的 this 值,
        在非严格模式下为全局对象,在严格模式下传入 undefined。
      Example: 判断是否所有元素大于18 
        var arr = [19, 20, 22];
        var res = arr.every(function(val,idx,arr){
          return val > 18;
        });
        console.log(res); // true
    bol = arr.some(f(val,idx,arr)[,context])  返回值是否存在为真[ES5]
      PS: 一旦 foo 返回值为真,some 将会立即返回 true,后续不再遍历;
        foo 只会在那些”有值“的索引上被调用,不会在那些被删除或从来未被赋值的索引上调用;
        some 遍历的元素的范围在第一次调用 foo 时就已经确定了,
        在调用 some 后被添加到数组中的值不会被 foo 访问到,
        若数组中存在且还未被访问到的元素被 foo 改变了,
        则其传递给 foo 的值是 some 访问到它那一刻的值;
      context  可选,将会把它传给被调用的 foo,作为 this 值.
        否则,在非严格模式下将会是全局对象,严格模式下是 undefined.
      Example: :  是否存在大于18的元素 
        var arr = [19, 10, 9];
        var res = arr.some(function(val,idx,arr){
          return val > 18;
        });
        console.log(res); // true
    arr1 = arr.map(f(val,idx,arr)[,context]) 返回值组成的数组[ES5] 
      val 数组中当前被传递的元素 
      idx 数组中当前被传递的元素的索引 
      arr 调用map方法的数组 
      context 可选,数组本身,执行 foo 函数时 this 指向的对象 
      Example:
        arr = [1, 2, 3];
        arr.map(String);  // ["1", "2", "3"]

        var arr = ["1", "2", "3"];
        arr.map(parseInt); // [1, NaN, NaN]
        因为parseInt 会接收两个参数,导致上述结果,改为
        function returnInt(element){
          return parseInt(element,10);
        }
        ["1", "2", "3"].map(returnInt); // [1,2,3]
        
        var arr = [1, 3, 5];
        var res = arr.map(function(val,idx,arr){
          console.log(val);
          console.log(idx);
          console.log(arr);
          return 1;
        })
        // 1
        // 0
        // [1, 3, 5]
        // 3
        // 1
        // [1, 3, 5]
        // 5
        // 2
        // [1, 3, 5]
        console.log(res); // [1, 1, 1]
    arr1 = arr.filter(foo[,context]) 返回值为true的元素组成的数组[ES5]
      foo     回调函数,传入参数: (val,idx,arr) 
        返回true表示保留该元素,通过测试,false则不保留;
      context 可选,执行函数时的用于 this 的值
      Example: 筛选数组arr中小于12的数
        var arr = [10, 2, 34, 4, 11, 12];
        var res = arr.filter(function(val,idx,arr){
          return val < 12; // 返回值为 true,则保留该元素
        });
        console.log(arr); // [10, 2, 34, 4, 11, 12]
        console.log(res); // [10, 2, 4, 11]
    val = arr.reduce(foo[,initVal]) 条件缩减,最后一次回调值[ES5]
      PS:接收一个函数作为累加器,数组中的每个值从左到右开始缩减,最终为一个值 
        为数组中的每一个元素依次执行回调函数,不包括数组中被删除或未被赋值的元素 
        若数组是空的并且没有initialValue参数,将会抛出TypeError错误.
        若数组只有一个元素并且没有initialValue, 或者有initialValue但数组是空的,
        这个唯一的值直接被返回而不会调用回调函数.
        通常来说提供一个initialValue初始值更安全一点,因为没有的话会出现3种可能的输出结果,
      foo     执行数组中每个值的函数,传入参数依 (retVal,curVal,idx,arr) 
        retVal 上一次回调函数的返回值 
          或提供的初始值(initialValue),或数组第一个值(此时curVal为数组第二个值)
        curVal 数组中当前被处理的元素
        idx    当前被处理元素在数组中的索引idx
        arr    调用 reduce 的数组
      initVal 可选,作为首次调用 foo 时,代替它的第一个参数
      Example: 
        元素累加
        var arr = [1, 2, 3, 4, 5];
        var res = arr.reduce(function(retVal,curVal,idx,arr){ 
          return retVal + curVal; 
        });
        console.log(arr); // [1, 2, 3, 4, 5]
        console.log(res); // 15
    val = arr.reduceRight(foo [,initVal]); 和reduce类似,只是从右到左遍历[ES5]
    ◆待整理
    arr.toString()
    arr.toLocaleString()
    arr.copyWithin()
    arr.find()
    arr.findIndex()
    arr.fill()
    arr.entries()
    arr.keys()
  Exp: 
    数组的复制
      slice(0)、concat() 浅拷贝: 只能将第一层完全复制[更深层仍是引用] 
        var arr = [[0], 0];
        var arr1 = arr.concat();
        console.log(arr1[0]);  // [0] 
        arr[0].push(1);
        console.log(arr[0]);  // [0, 1] 
        console.log(arr1[0]); // [0, 1] 
        
        var arr2 = arr.slice(0);
        console.log(arr2[0]);  // [0, 1] 
        arr[0].push(1);
        console.log(arr[0]);   // [0, 1, 1] 
        console.log(arr2[0]);  // [0, 1, 1] 
      使用JSON序列化与反序列化实现深拷贝 
        var arr = [[0], 0];
        var arr1 = JSON.parse(JSON.stringify(arr))
        console.log(arr1[0]);  // [0] 
        arr[0].push(1);
        console.log(arr[0]);  // [0, 1] 
        console.log(arr1[0]); // [0] 
Date 日期时间类: 处理时间和日期,内置获取和设置日期时间信息的方法   
  PS: 在早期java中 java.util.Date 类基础上构建;  
    Date对象基于1970年1月1日0时世界协调时间开始的毫秒数 
  date = new Date([val]) 构造函数创建时间对象 
    PS: 无字面量格式; 以常规函数调用即不加new操作符,也会返回一个字符串,但不是时间对象;
    date = new Date()     由系统当前时间创建的时间对象
    date = new Date(num)  自世界协调时间至今的毫秒数创建时间对象 
      var date = new Date(1000);
      console.log(date); // Thu Jan 01 1970 08:00:01 GMT+0800(中国标准时间)
    date = new Date(str)  由被 Date.parse() 解析的字符串创建的时间对象  
      var date1 = new Date("4/12/2007");
      // 等价于
      var date2 = new Date(Date.parse("4/12/2007"));
      console.log(date1); // Thu Apr 12 2007 00:00:00 GMT+0800(中国标准时间)
      console.log(date2); // Thu Apr 12 2007 00:00:00 GMT+0800(中国标准时间)
    date = new Date(y,m[,d,h,m,s,ms]);  最少指定年月 
      m   '月'参数,范围 0-11  
      d   '天'参数,默认为 1, 0 则表示上一个月的最后一天 
      Example: 
        var t1 = new Date(2016,1,1); // 2月 
        var t2 = new Date(2016,1,0); // 1月,根据此特性可求出某月份的天数
        var t3 = new Date(2016,1);   // 2月
        console.log(t1); //Mon Feb 01 2016 00:00:00 GMT+0800(中国标准时间)
        console.log(t2); //Sun Jan 31 2016 00:00:00 GMT+0800(中国标准时间)
        console.log(t3); //Mon Feb 01 2016 00:00:00 GMT+0800(中国标准时间)
    当时间数值超过合理范围值时,会被调整为相邻值 
      如 new Date(2013,13,1) 等于 new Date(2014,1,1) 
  Date.XX 
    num = Date.now()      返回自世界协调时间至今的毫秒数 
      console.log(Date.now()); // 1507606437591
    num = Date.parse(str/date) 返回日期解析的毫秒数 
      Example: 
      console.log(Date.parse('4/12/2007')); // 1176307200000 
    Date.UTC(year,month[,...]) 返回表示日期的毫秒数 
      参数中必须有年份和月份
      Date.UTC(2016,10,1,1,1);  //1477962060000
  Date.prototype.xx 
    console.log(new Date().constructor === Date); // true  
    date.getYear()  被废弃 
    num = date.valueOf()   时间的毫秒表示  
      var date1 = new Date(100);
      console.log( date1.valueOf()); // 100 
      console.log(+date1); // 100 
    ◆组件方法 
    num = date.getTime()   从1970年1月1日到当前时间的毫秒数值 
    num = date.getDay()          星期数值,0-6  
    num = date.getFullYear()     年份数值,1970-275760  
    num = date.getMonth()        月份数值,0-11 
    num = date.getDate()         日 数值,1-31 
    num = date.getHours()        小时数值,0-23 
    num = date.getMinutes()      分钟数值,0-59 
    num = date.getSeconds()      秒 数值,0-59 
    num = date.getMilliseconds() 毫秒数值,0-999 
    date.setXX()     'get'方法对应的'set'方法,用于改变日期对象的各项值 
    date.xxxUTCxx()  'get'和'set'方法对应的'UTC'方法
      Example:  
      date.getDate()
      date.setDate() 
      date.getUTCDate()
      date.setUTCDate()
    date.getTimezoneOffset()  当前时区和'GMT'格林威治时间相差的分钟数值 
      Example: 
      var date = new Date();
      console.log(date.getTimezoneOffset()); // -480,8个小时
      若在柏林,则 date.getTimezoneOffset();   // -60
    ◆日期格式化方法 不同浏览器可能显示不同,一般用于调试,以下均为Chrome中的结果   
      console.log(new Date(0));
      // Thu Jan 01 1970 08:00:00 GMT+0800(中国标准时间),默认显示格式 
    date.toDateString()   格式: '星期 月 日 年' 
      var date = new Date(0)
      console.log(date.toDateString()); // Thu Jan 01 1970 
    date.toTimeString()   格式: '时:分:秒 时区' 
      var date = new Date(0)
      console.log(date.toTimeString()); // 08:00:00 GMT+0800 (中国标准时间) 
    date.toLocaleString() 格式: '年/月/日 时间' 
      var date = new Date(0)
      console.log(date.toLocaleString()); // 1970/1/1 上午8:00:00 
    date.toLocaleDateString() 格式: '年/月/日' 
      var date = new Date(0)
      console.log(date.toLocaleDateString()); // 1970/1/1 
    date.toLocaleTimeString() 格式: '时 分 秒'  
      var date = new Date(0)
      console.log(date.toLocaleTimeString()); // 上午8:00:00 
    date.toUTCString()        格式: '星期,日 月 年 时:分:秒 '
      var date = new Date(0)
      console.log(date.toUTCString()); // Thu, 01 Jan 1970 00:00:00 GMT 
    date.toGMTString()     与'toUTCString'方法等价,推荐使用'toUTCString' 
      var date = new Date(0)
      console.log(date.toGMTString()); // Thu, 01 Jan 1970 00:00:00 GMT 
    date.toString()     
      var date = new Date(0)
      console.log(date.toString()); 
      // Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间) 
    date.toISOString()  
      var date = new Date();
      console.log(date.toISOString()); // 1970-01-01T00:00:00.000Z 
    date.toJSON()  使用 .toISOString()返回的字符串,为了在 JSON.stringify()方法中使用
  Date类型隐式转换 
    var date = new Date(0);
    // 优先转换为string 
    console.log(date+1); // Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)1
    console.log(+date);  // 0 
  日期的比较: 使用变量名比较时,对象的变量名指向的是地址,需转换为毫秒数进行比较
RegExp 'Regular Expression'正则类: 描述、匹配一系列符合某个语法规则字符串的规则 
  创建正则表达式 
    var rgep = /pattern/flags 字面量方式创建 
      PS: 正则表达式字面量在脚本加载后编译 
        若需创建的正则表达式是常量,使用这种方式可以获得更好的性能 
      Example: 
      var rgep1=/fan/;
      var rgep2=/fan/ig;
    var rgep = new RegExp((pattern,flags)/rgep)  通过字符串或正则来创建 
      通过字符串创建,指定字符和修饰符 
        由于传递的参数为字符串,需要进行双重转义
        var rgep = new RegExp('fan-\\d','ig')
        console.log(rgep); //  /fan-\d/gi
      通过正则创建,返回一个传入正则的拷贝,但不能指定修饰符 
    ★pattern模式
    ★flags模式修饰符 
    i   'ignore case'忽略大小写
    g   'global'全局匹配
    m   'multiple lines'多行匹配
  'Metacharacter'元符号: 特殊含义的字符,控制匹配模式的方式 
    .   [除'\n'换行符和'\r'回车符外的]任意字符,即[^\r\n]
    \d  'digit'数字,即[0-9]
    \D  非数字,即[^0-9]
    \w  'word'字母或数字或_,即[a-zA-Z0-9]
    \W  非字母和数字及_,即[^a-zA-Z0-9]
    \s  'space'空白字符、空格、制表符和换行符 
      也可以使用空格来匹配空格
    \S  非空白字符
    \0  null空字符
    \n  换行字符
    \r  回车字符
    \t  制表符
    \f  进纸字符
    \v  垂直制表符
    \cx 与x对应的控制字符[如Ctrl+x]
    \xxx  查找以八进制数 xxx 规定的字符
    \xdd  查找以十六进制数 dd 规定的字符
  量词字符 
    X?       0 个或1个X
    X+       1 个或多个X
    X*       任意数量的X(可为0)
    X{num}       num个的X
    X{num,}      num个及以上数量的X
    X{num1,num2} num1个到num2个之间任意数量的X
  锚点字符 
    ^   首匹配,位于正则字符串的开始 
      Example: 
      /^n/ 匹配任何开头为 n 的字符串.
    $   尾匹配,位于正则字符的末尾 
      Example: 
      /n$/ 匹配任何结尾为n的字符串 
    ?=n 匹配任何其后紧接指定字符串n的字符串 
    ?!n 匹配任何其后没有紧接指定字符串 n 的字符串 
    \b  匹配单词边界(在[]内时无效) 
      /a\b/ 表示a字母为单词的结尾字母 
      /\ba/ 表示a字母为单词的首字母   
    \B  匹配非单词边界
    \z  只匹配字符串结束处
    \Z  匹配字符串结束处或行尾
    \A  只有匹配字符串开始处??
    \G  匹配当前搜索的开始位置
  方括号 [] 与 圆括号()
    [char]   表示[]内的任意一个字符 
      Example: :
      [a-z] [A-Z] [0-9] 
      互相组合如[a-zA-Z0-9] 
    [^char]  表示任意不在括号中的一个字符 
      Example: :
      [^a-z]
      可组合如:[^a-zA-Z0-9]
    [0-9]    查找任何从 0 至 9 的数字
      [a-z]    查找任何从小写 a 到小写 z 的字符
      [A-Z]    查找任何从大写 A 到大写 Z 的字符
      [A-z]    查找任何从大写 A 到小写 z 的字符
      也可任意组合如 [a-z0-9]等
      Example: :
      [a-z-] 匹配 a到z和-
    ()       分组,对()内的整体进行处理
    (XYZ)    表示一个(XYZ)
    /(abc){3}/  表示需要匹配abc 三次以上
    (red|blue|green)  查找任何指定的选项(| 或)
  转义字符: 使用'\字符'转义 
    在RegExp中许多符号被用于表达特殊的含义,当需要表示这些字符时需转义.
    如'.',当需要匹配点.时,就需要转义'\.'
    \uxxxx  查找以十六进制数xxxx规定的Unicode字符 
      Example:
      \u00A0       不间断空格
      \u0008  \b   Backspace
      \u000D  \r   回车
      [\u4e00-\u9fa5] 常见汉字 
      [\u0391-\uFFE5] 所有汉字 
  捕获匹配分组 
    PS: 获取之前需要有匹配操作;
      RegExp.$num 或 \num 表示匹配第num个分组中的内容;
    replace方法中 
      实现将str中两个单词位置替换.
      var rgep=/(.*)\s(.*)/;
      var str="aoo buu";
      str.replace(rgep,"$2 $1"); // "buu aoo"
    不希望捕获某些分组,在分组括号()内加上?:
      var rgep=/(?:.*)\s(.*)/;
      var str="google baidu";
      str.replace(rgep,"$1"); // "baidu"
    Example: :
      var rgep=/a(.*)a([0-9])/;
      var str='abcdea1abc';
      str.match(rgep);  // 需匹配一次
      RegExp.$1;        // "bcde",表示第1个分组匹配到的内容.
      RegExp.$2;        // "1",表示第2个分组匹配到的内容.
  贪婪&惰性
    默认为贪婪模式(尽可能多的匹配),在量词后加上?则表示惰性模式.

    贪婪对于exec()无效?或者只对replace()起作用?
    贪婪       惰性(在重复的元字符后多加一个?)
    +          +?
    ?          ??
    *          *?
    {n}        {n}?
    {n,}       {n,}?
    {n,m}      {n,m}?
    Example:
      "1234567".replace(/\d{3,6}/,"X"); // "X7"
      "1234567".replace(/\d{3,6}?/,"X"); // "X4567"

      使用了贪婪模式
      var rgep =/[a-z]+/;
      var str ='abcdef';
      str.replace(rgep,"1");
      //"1",贪婪模式 abcdef全被匹配到了
      使用惰性模式
      var rgep =/[a-z]+?/;
      var str ='abcdef';
      str.replace(rgep,"1");
      //"1bcdef",惰性模式 只有a被匹配到了
      使用惰性模式 开启全局
      var rgep =/[a-z]+?/;
      var str ='abcdef';
      str.replace(rgep,"1");
      //"111111" ,每一个字母都替换成了1

      使用了贪婪模式
      var rgep =/8(.*)8/;
      var str ='8google8 8google8 8google8';
      //(.*)匹配到了google8 8google8 8google
      str.replace(rgep,'$1');
      //"google8 8google8 8google"
      使用了惰性模式 开启全局
      var rgep =/8(.*?)8/g;
      var str ='8google8 8google8 8google8';
      //(.*)匹配到了每个google
      str.replace(rgep,'$1');
      //"google google google"
      另一种禁止贪婪  开启全局
      var rgep =/8([^8]*)8/g;
      var str ='8google8 8google8 8google8';
      //(.*)匹配到了每个google
      str.replace(rgep,'$1');
      //"google google google"
  正向&负向 前瞻&后顾
    正向前瞻 exp(?=assert)
      "a2*3".replace(/\w(?=\d)/g,"0");  // "02*3"
    负向前瞻 exp(?!assert)
      "a2*3".replace(/\w(?!\d)/g,"0");  // "a0*0"
    正向后顾 exp(?<=assert) JavaScript不支持
    负向后顾 exp(?<!assert) JavaScript不支持
  RegExp.xx  静态属性: 需先执行匹配'test'或'exec' 
    PS: 基于最近一次所执行的正则表达式操作而变化;可通过两种方式访问
    // TODO: ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★ 
    Example: 
      var rgep=/google/;
      var str="this is a agoogle!";
      //必须执行一下(test或exec),静态属性才有效
      rgep.test(str);
    str = RegExp.input       当前被匹配的字符串  
      RegExp.$_;     // this is a google!      
    str = RegExp.lastMatch   最后一个匹配的字符串
      RegExp['$&']; //google
    str = RegExp.leftContext  最后一次匹配前的子串 
      RegExp['$`']; //this is a a
    str = RegExp.rightContext 在上次匹配之后的子串 
      RegExp["$'"]; //!
    str = RegExp.lastParen    最后一对圆括号内的匹配子串 
      RegExp['$+'];      
    bol = RegExp.multiline    指定是否所的表达式都用于多行的布尔值 
      RegExp['$*']; //false
    ★分别用于存储第一、第二……第九个匹配的捕获组
    RegExp.$1 
    RegExp.$2 
    RegExp.$3 
    RegExp.$4 
    RegExp.$5 
    RegExp.$6 
    RegExp.$7 
    RegExp.$8 
    RegExp.$9 
  RegExp.prototype.xx 
    Example: 
      var rgep=/google/ig;
      rgep.global;     // true
      rgep.ignoreCase; // true
      rgep.multiline;  // false
      rgep.source;     // "google"
    console.log(/a/.constructor === RegExp); // true 
    bol = rgep.global      是否全局匹配,默认'false' 
    bol = rgep.ignoreCase  是否忽略大小写,默认'false'    
    bol = rgep.multiline   是否多行匹配,默认'false'  
    str = rgep.source      字符串表示,即正则的pattern  
    rgep.lastIndex   读写下次匹配字符位置的数值表示[在全局匹配时生效],从 0 开始 
    str = rgep.toString()  字符串形式的正则字面量  
      var rgep = /\da/;
      console.log(rgep.toString()); // /\da/ 
    bol = rgep.test(str)  正则是否存在于字符串中 
      console.log(/bc/.test('abcd'));    // true 
      使用全局匹配,由于正则的lastIndex的属性,匹配多次可能返回错误值 
        var re = /\w/g;
        console.log(re.test("a")); // true
        console.log(re.test("a")); // false
        console.log(re.test("a")); // true
        console.log(re.test("a")); // false
    arr = rgep.exec(str)  正则匹配到的字符串组成的数组,否则返回 null 
      PS: 专门为捕获组而设计;返回的数组 
      arr 返回值,数组包含两个额外的属性: index 和 input 
        arr.index  匹配项在字符串中的位置 
        arr.input  应用正则表达式的字符串  
        数组第一项是与整个模式匹配 的字符串
        其他项是与模式中的捕获组匹配的字符串[若模式中没有捕获组,则该数组只包含一项] 
      是否全局的区别 
        var text = "cat, bat, sat, fat";
        var rgep1 = /.at/;
        var matches = rgep1.exec(text);
        console.log(matches.index);   // 0
        console.log(matches[0]);      // cat
        console.log(rgep1.lastIndex); // 0
        matches = rgep1.exec(text);
        console.log(matches.index);  // 0
        console.log(matches[0]);     // cat
        console.log(rgep1.lastIndex); //0
        
        var rgep2 = /.at/g;
        var matches = rgep2.exec(text);
        console.log(matches.index);   // 0
        console.log(matches[0]);      // cat
        console.log(rgep2.lastIndex); // 3
        matches = rgep2.exec(text);
        console.log(matches.index);   // 5
        console.log(matches[0]);      // bat
        console.log(rgep2.lastIndex); // 8
      捕获性分组,所有的捕获都返回 
        console.log(/(\d+)([a-z])/.exec('123abc'));
        // (3) ["123a", "123", "a", index: 0, input: "123abc"]
        
        var reg1 = /(\d+)/g;
        var str='123abc12aa3a';
        console.log(reg1.exec(str)); 
        // ["123", "123", index: 0, input: "123abc12aa3a"]
        console.log(reg1.exec(str)); 
        // ["12", "12", index: 6, input: "123abc12aa3a"]
        console.log(reg1.exec(str)); 
        // ["3", "3", index: 10, input: "123abc12aa3a"]
        console.log(reg1.exec(str)); 
        // null 
        var reg2 = /(\d+)/;
        console.log(reg2.exec(str)); 
        // (2) ["123", "123", index: 0, input: "123abc12aa3a"]
        console.log(reg2.exec(str)); 
        // (2) ["123", "123", index: 0, input: "123abc12aa3a"]
      非捕获性分组,在不需返回的分组前加?:
        var rgep=/(?:\d+)([a-z])/;
        var str='123abc';
        rgep.exec(str);  // ["123a", "a"]
      分组嵌套 
        嵌套分组,从内往外获取
        var pat=/(a?(b?(c?)))/;
        var str='abc';
        var a=pat.exec(str);    //["abc", "abc", "bc", "c"]
        a[0] 整个匹配到的字符串
        a[1] 匹配到的第一个分组(a?(b?(c?)))
        a[2] 匹配到的第二个分组(b?(c?))
        a[3] 匹配到的第三个分组(c?)
      前瞻捕获 
        匹配的字符后面必须是XX,使用?=来定义
        var pat=/goo(?=gle)/
        var str='googlea'
        pat.exec(str)           //["goo"]
      特殊字符匹配 
        用\来转义正则里的特殊字符,才能匹配.
        var pat=/\[/
        var str='['
        pat.exec(str)         //["["]
      换行匹配 
        使用首匹配^时,需开启换行匹配才能匹配到多行,
        (未指定首匹配时则不开启多行匹配也能匹配到多行)
        var pat=/^\d+/gm
        var str='1.baidu\n2.google\n3.bing'
        str.replace(pat,"*")
          // "*.baidu
          // *.google
          // *.bing"
      Example:
      console.log(/[a-z]{2}/.exec('abcdefg'));  
      // ["ab", index: 0, input: "abcdefg"]
    rgep.compile(rgep,modifier)  编译正则 
    // TODO: ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★ 
    rgep.flags    
    rgep.sticky   
    rgep.unicode  
  ◆字符串中的正则方法
  str.match(rgep)   返回符合正则的字符串组成的数组
    var rgep=/Box/ig;
    var str="this is a Box2,thatis a box!";
    console.log(str.match(rgep));    //["Box", "box"]
  str.search(rgep)  返回第一个正则的位置,否则返回-1
    search方法查找到即返回,无需g全局匹配
    var rgep=/Box/ig;
    var str="this is a box,thatis a box!";
    str.search(rgep);
    //10,返回第一个匹配的位置(从0开始)
  str.split(rgep)   返回使用正则分割成的字符串组成的数组
    var rgep=/!/ig;
    var str="this is a box!,thatis a box!";
    str.split(rgep);
    //["this is a box", ",thatis a box", ""]
  Str.replace(rgep,str)  返回指定字符串替换正则后的新字符串 [未改变原字符串]
    PS:全局则替换字符串中所有符合的字符,否则替换第一个,
      非全局连续多次替换时,后一次从上一次匹配结束的位置开始匹配
    var rgep=/Box/ig;
    var Str="this is a Box,that is a box!";
    var str ='tom';
    Str.replace(rgep,str); // "this is a tom,that is a tom!"
  常用的正则 
    检查邮政编码: 规则六位数字,第一位不是0 
      console.log(/^[1-9][0-9]{5}$/.test('123456')); //true
    检查文件压缩包: 名称可能为 字母、数字、下划线 格式可能为.zip/.rar/.gz
      // |选择符 需使用分组符号 包含起来
      console.log(/^[\w\-]+\.(zip|rar|gz)$/.test('1-23.zip'));   //true
    简单的电子邮件验证 
      var regp = /^([\w\.\_]+)@([\w\_]+)\.([a-zA-Z]{2,4})$/;
      var str = "fols.van@126.com";
      console.log(regp.test(str)); // true 
    删除首尾空格 
      使用两次正则 
        var pattern=/^\s+/;
        var str="    goo    gle  ";
        var result=str.replace(pattern,"");
        pattern=/\s+$/;
        result=result.replace(pattern,"");
        result;            //"goo    gle"
      使用惰性模式捕获 
        var pattern=/^\s*(.+?)\s+$/;      //+?是惰性模式
        var str="  goo gle  ";
        pattern.exec(str)[1];     //"goo gle",数组的第二个
        //若使用非惰性模式(或贪婪模式)则返回值为:"goo gle "
        // PS-Self:惰性模式即为捕获最少复合要求的字符.
      使用分组捕获 
        var pattern=/^\s*(.+?)\s+$/;
        var str="  goo gle  ";
        var result=str.replace(pattern,"$1");
        alert("|"+result+"|");
  Question: 
    只包含中文和字母a的正则 
      中文表示为 [\u0391-\uFFE5]
      为 /[\u0391-\uFFE5a]/ ?
    指定初始开始匹配的字符的下标,如'abcde',指定从第二个字符开始匹配 
Error 错误类 
  PS: JS解析或执行时,当发生错误就会抛出一错误对象,并且程序中断在发生错误的地方 
    JS原生提供一个Error构造函数,所有抛出的错误都是这个构造函数的实例 
  错误类型: ECMA-262 定义了7种错误类型,Error是基类型,是其他六种的父类型
    Error
    SyntaxError    解析代码时发生的语法错误
    TypeError      变量或参数不是预期类型时发生的错误
      比如,对字符串、布尔值、数值等原始类型的值使用new命令,就会抛出这种错误,
      因为new命令的参数应该是一个构造函数
    ReferenceError 引用一个不存在的变量时发生的错误
      另一种触发场景,将一个值分配给无法分配的对象,比如对函数的运行结果或者this赋值
    RangeError     一个值超出有效范围时发生的错误
      主要场景: 数组长度为负数,Number对象的方法参数超出范围,函数堆栈超过最大值
    URIError       URI相关函数的参数不正确时抛出的错误
      主要涉及 encodeURI() decodeURI() encodeURIComponent() 
      decodeURIComponent() escape() unescape() 六个函数
    EvalError      使用 eval()发生异常时抛出
      该错误类型已经不再在ES5中出现了,只是为了保证与以前代码兼容,才继续保留。
  自定义错误对象 
    error = new Error(str);
    error = new RangeError(str);
    ...
    通过原型链继承Error来创建自定义错误类型 
      Example: :
      function CustomError(message){
        this.name ="CustomError";
        this.message =message;
      }
      CustomError.prototype = new Error();
      throw new CustomError('abc')
  Error.xx 
    Error.captureStackTrace() 
    Error.stackTraceLimit 
  Error.prototype.xx 
    error.toString() 
    error.message;   可以读取的错误消息 [标准属性]
    error.name;      错误名称   [非标]
    error.description; 可以读取的错误消息 [IE定义]
    error.number;  错误数量 [IE定义]
    error.stack:   错误的堆栈 [非标] 
      function throwIt() { throw new Error(''); }
      function catchIt() {
        try { throwIt(); } 
        catch(e) { console.log(e.stack); }
      }
      catchIt();
      // Error
      //    at throwIt (~/examples/throwcatch.js:9:11)
      //    at catchIt (~/examples/throwcatch.js:3:9)
      //    at repl:1:5
      代码显示:抛出错误首先在throwIt函数,然后在catchIt函数,最后在函数的运行环境中。        
Math  数学对象 
  PS: 为数学常量和数学函数提供的属性/方法; 所有属性/方法都是静态的 
  数学值常量  
    Math.PI         π的值,3.141592653589793 
    Math.SQRT2      2 的平方根,1.4142135623730951  
    Math.SQRT1_2    1/2 的平方根,0.7071067811865476  
    Math.E          自然对数的底数,即常量e的值[也叫欧拉参数],2.718281828459045
    Math.LN10        10 的自然对数,2.302585092994046 
    Math.LN2         2 的自然对数,0.6931471805599453
    Math.LOG2E       以2为底e的对数,1.4426950408889634 
    Math.LOG10E      以10为底e的对数,0.4342944819032518 
    Math.random();   返回一个介于0到1之间不包括0和1的随机数 
      PS:不需要参数,添加参数不起作用,也不会报错 
      若需要某个范围,可套用的公式 
        值 = Math.floor(Math.random()*总数 + 第一个值)
        Math.floor(Math,random()*6 + 5);
        //随机产生5-10之间的任意整数
  取整方法 
    Math.round(num)   四舍五入取整            [round 圆；循环；一回合；圆形物]
    Math.ceil(num)    向上舍入取整,数值将变大; [ceil  天花板] 
    Math.floor(num)   向下舍入取整,数值将变小; [floor 地板  ] 
      Math.floor(1.1)    //1
  求值方法 
    num = Math.min(num1,num2,..) 求最小值 
      Math.min(2,3,5,6,76,8,7);   // 2
      Math.min.apply(null,[2,3,5,6,76,8,7]);   // 2
      Math.min.apply(null,[0,0,0]);   // 2
    num = Math.max(num1,num2,..) 求最大值 
      Math.max(2,3,5,6,76,8,7);   // 76
    Math.abs(num)       求绝对值
    Math.exp(num)       返回 Math.E 的num次幂
    Math.log(num)       返回num的自然对数
    Math.pow(num,power) 返回num的power次幂
    Math.sqrt(num)      返回num的平方根
    Math.sin(x)     求正弦值
      Example: 
      Math.sin(30/180*Math.PI);  //0.49999999999999994
    Math.cos(x)     求余弦值
    Math.tan(x)     求正切值
    Math.acos(num)  返回num的反余弦值
    Math.asin(num)  返回num的反正弦值
    Math.atan(num)  返回num的反正切值
    Math.atan2(num1,num2) 返回num1/num2的反正切值
  其他  
    Math.acosh()  
    Math.asinh()         
    Math.atanh()     
    Math.cbrt()     
    Math.expm1()     
    Math.clz32()     
    Math.cosh()     
    Math.fround()     
    Math.hypot()     
    Math.imul()     
    Math.log2()     
    Math.log1p()     
    Math.sign()     
    Math.sinh()     
    Math.tanh()     
    Math.trunc()     
JSON'JavaScript Object Notation'JS对象表示法: 基于文本、独立于语言的轻量级数据交换格式 
  PS: 利用JS中的一些模式来表示结构化数据,广泛用于数据的传送和数据的交换, 
    每个JSON对象只能是一个值,即每个JSON文档只能包含一个值;
    ES5对解析JSON的行为进行了规范,定义了全局对象JSON对象
  JSON值类型和格式 
    null Boolean Number[只能十进制] String Array Object 
    不能为: NaN Infinity undefined 
    不能为: 函数、正则、日期对象 
    String 必须使用双引号  
    对象的键必须用双引号引起来,数组或对象的最后一个成员不能加逗号 
    Example: 
      JSON.stringify("aoo"); // ""aoo""
      JSON.stringify("aoo") === "\"aoo\"";  // true
      JSON.stringify("aoo") === ""aoo"";    // 报错
      引号使用\转义, 将来还原时,双引号让JS引擎知道aoo为字符串而非变量名
      
      { "aoo" : "style="color:red;"" }
      格式错误,可改为
      { "aoo" : "style=\"color:red;\"" }
      或 
      { "aoo" : "style='color:red;'" }
  JSON.stringify(val[,arr/foo,num/str])   序列化,将JS值转换为JSON字符串 
    PS: 序列化JS对象时,所有函数及原型成员都会被有意忽略,不体现在结果中 
    val       需序列化的值 
    arr/foo   可选,过滤器,数组或函数 
      若为数组则,结果中将只包含数组中列出的属性 
        Example: :
        var book ={
          "title":"Professional JavaScript",
          "authors":['abc'],
          "edition":3,
          year:2011
        }
        var jsonText =JSON.stringify(book,["title","edition"]);
        // {"title":"Professional JavaScript","edition":3}
      若为函数,函数接收两个参数:属性名和属性值,结果为函数返回值 
        当值为非键值对结构的值时,键名可以为空字符串
        Example: :
        var book ={
          "title":"Professional JavaScript",
          "authors":['abc'],
          "edition":3,
          year:2011
        }
        var jsonText =JSON.stringify(book,function(key,value){
          switch(key) {
            case "authors":
              return value.join(",");
              break;
            case "year":
              return 5000;
              break;
            case "edition":
              return undefined;
              break;
            default:
              return value;
          }
        });
        // {"title":"Professional Javascript","authors":"abc","year":5000}
        其中为值undefined的被忽略
    num/str   可选,缩进排版选项,数值或字符 
      当为数值时范围为'1-10'[超过10仍取10],表示最大缩进空格数(不会改变数据(SelfThink))
      若为字符串时,则该字符串将在JSON字符串中被用作缩进字符[代替空格]
        可将缩进字符设置为制表符等
        缩进字符串最长长度不能超过10个字符,否则只使用前10个字符
    Example: 
      会将属性值为undefined的属性忽略,NaN、Infinity 转换为 null,
      时间表示转换为字符串的表示
      var obj ={a:undefined,b:NaN,c:Infinity,d:new Date()};
      JSON.stringify(obj);
      // "{"b":null,"c":null,"d":"2016-12-28T07:45:24.152Z"}"
    当'对象'成员的值为'undefined'、'函数'或'XML对象'时,则该成员会被过滤 
        var obj = {
          aoo:1,
          boo:undefined,
          coo:function(){ }
        };
        JSON.stringify(obj); // "{"aoo":1}"
    当'数组'成员为'undefined'、'函数'或'XML对象'时,将被转换成null 
      var arr = [undefined,function(){ }];
      JSON.stringify(arr); // "[null,null]"
    '正则'会被转换为空对象{} 
      JSON.stringify(/aoo/); // "{}"
    忽略对象的不可遍历属性 
      var obj = {};
      Object.defineProperties(obj,{
        'aoo' : {
          value : 1,
          enumerable : true
        },
        'boo' : {
          value : 2,
          enumerable : false 
        }
      });
      JSON.stringify(obj); // "{"aoo":1}"
    对象中使用 toJSON 指定序列化的规则
      PS:若 JSON.stringify 的参数对象有自定义的toJSON方法,
        则其使用该方法的返回值代替参数对象.
      Date 对象有一个自己的toJSON 方法
        var date = new Date('2015-01-01');
        date.toJSON();         // "2015-01-01T00:00:00.000Z"
        JSON.stringify(date); // ""2015-01-01T00:00:00.000Z""
      Example:
        var obj ={
          a:1,
          b:2,
          c:{ 
            c1:10, 
            c2:11, 
            toJSON:function(){ return this.c1 + this.c2; }, 
          }
        }
        JSON.stringify(obj); // "{"a":1,"b":2,"c":21}"
        
        正常:
        var user = {
          aoo : 'a',
          boo : 'b',
          get foo(){return this.aoo + this.boo;}
        }
        JSON.stringify(user); // "{"aoo":"a","boo":"b","foo":"ab"}"
        存在toJSON方法:
        var user = {
          aoo : 'a',
          boo : 'b',
          get foo(){return this.aoo + this.boo;},
          toJSON : function(){
            return { coo : 'c', doo : 'd' };
          }
        }
        JSON.stringify(user); // "{"coo":"c","doo":"d"}"
    使用'toJSON'
      将正则转化为字符串
      RegExp.prototype.toJSON = RegExp.prototype.toString;
      JSON.stringify(/aoo/); // ""/aoo/""
      自定义解析
      var obj1 = {
        a : 1,
        b : 'aa'
      }
      var rst1 = JSON.stringify(obj1);
      var obj2 = {
        a : 1,
        b : 'aa',
        toJSON : function(){
          return '自定义的返回值'
        }
      }
      var rst2 = JSON.stringify(obj2);
      console.log(rst1); // {"a":1,"b":"aa"}
      console.log(rst2); // "自定义的返回值"
  JSON.parse(JSONstr[,foo(key,val)])      反序列化,将 JSON字符 串转换为JS值
    PS: 若还原中存在undefined会被删除, 若参数不是有效的JSON格式,将报错
    JSONstr 需要解析的JSON字符串
    foo     可选 
  应用: 
    使用 JSON 的函数进行序列化和反序列化来本地保存
    JSON 可以将JS中一组数据转换为字符串,然后就可以在函数之间轻松地传递这个字符串
------------------------------------------------------------------------------- 
内存 
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
JS引擎: 真正执行JS代码的地方,
  常见的引擎有V8[目前最快JS引擎、Google生产]、JS core;
  JS引擎主要做了下面几件事情:
  一套与宿主环境相联系的规则;
  JS引擎内核[基本语法规范、逻辑、命令和算法];
  一组内置对象和API;
  其他约定.
JS运行过程机理 
  可近似做如下理解: 
  从上到下顺序执行代码; 
  执行阶段分: 预处理阶段 和 执行阶段 
  代码执行环境分: 全局环境window 和 函数作用域环境 
  JS代码运行过程分析: 
    PS: 在父环境不可访问子环境的缓存,反之可以 
      在子环境运行时,优先访问自己的缓存,若无再向上级寻找 
      子环境执行完毕,环境会被销毁[闭包则不会],缓存不存在;后续再执行则重新再创建 
      同类型的,变量和变量重名或函数和函数重名 ,则后面的覆盖前面的 
    解析器接收到JS代码,此时处于全局环境下 
    1 进入预处理阶段: 扫描所有代码 
      PS: 缓存中,当函数名和变量名重名,函数优先级高[覆盖变量名] 
      将'var'声明的'全局变量'和'函数'添加到缓存中,变量设为'undefined',函数名指向函数 
      未使用var的变量不记录  
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
'Scope'作用域: 在运行时,代码中变量、函数和对象的可访问性 
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
'Closure'闭包: 当内部函数尝试访问其外部函数的作用域链,会创建一个闭包 
  PS: 闭包会携带包含它的函数的作用域,因此会比其他函数占用更多的内存 
    过度使用闭包可能会导致内存占用过多 
    虽然V8等优化后的JS引擎会尝试回收被闭包占用的内存,但还是要慎重使用.
  创建闭包的常见的方式,在函数内部创建另一个函数 
  作用: 保存自己的私有变量,通过提供的接口(方法)给外部使用,但外部不能直接访问该变量 
  闭包包含自己的作用域链,父级的作用域链[包括全局作用域] 
  闭包不仅可以访问其外部函数中定义的变量,还可以访问外部函数的参数 
Question&Suggestion 
  如何通过函数名来获取到函数传入的参数 ? 
    自我实现: 
      在函数内定义 arguments.callee.args = arguments
      然后 foo.args 就可以获取的传入的参数了 
-----------------------------------------------------------------------待整理   

