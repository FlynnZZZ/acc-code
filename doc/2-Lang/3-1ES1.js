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
      规则: 
      undefined、null、0、NaN、""转换为 false;
      其余转换为 true,包括 '0'、
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
        undefined 为 NaN; null false 为 0; true 为 1;
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
      Object.getPrototypeOf(obj) 通过实例获取 [ES5] 
      obj.constructor.prototype   通过实例间接获取 
      obj.__proto__               通过实例获取 [非标][IE11+]  
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
    bol = prop in obj;  属性是否在对象中[包括原型中属性]  
      prop num/str,待检测的对象的属性 
      obj  被检测的对象 
        可以是一个String包装对象,但不能是一个字符串原始值
        var color1 = new String("green");
        "length" in color1; // true
        var color2 = "coral";
        "length" in color2; // 报错(color2不是对象)
      Example: 
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
      console.log(true?'真':'假'); // 真 
      console.log(false?'真':'假'); // 假 
      console.log('0'?'真':'假'); // 真 
      console.log('1'?'真':'假'); // 真 
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

