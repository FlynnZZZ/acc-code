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
------------------------------------------------------------------------------- 
数据类型 
  PS: JS变量不必定义类型,每个变量仅仅是一个用于保存值的占位符;
    ECMAScript不支持任何创建自定义类型,所有值都为6种数据类型之一[ES6可以了];
    一个值可由多个变量名称指向,但一个变量只能指向一个值;
'literal'字面量,直接显示出来的数据值 
  100            // 数字字面量
  "abc"          // 字符串字面量
  false          // 布尔字面量
  null           // 对象字面量
  /xxx/ig        // 正则表达式字面量
  {x:1,y:2}      // 对象字面量表达式
  [1,2,3,4,5]    // 数组字面量表达式
var,定义变量,相当于给window添加不可配置的window属性 
  Feature: 
    定义变量但未赋值,默认:'undefined' 
      var num ;
      console.log(num); // undefined 
    重复的var声明: 相当于赋值操作产生覆盖 
      var box = "fan";
      var box = "abc";  // 相当于 box = "abc";
      console.log(box); // abc
    函数内,产生变量提升 
      var num = 1;
      !function(){
        // 函数内此时num还未定义,所以为undefined 
        console.log(num); // undefined,变量提升
        var num = 2;
      }()
  Relate: 
    全局变量与window属性 
      不用用var声明的变量,相当于给window添加可配置的属性  
        var aoo = 1; 
        console.log(window.aoo); // 1
        console.log(delete aoo); // fasle,删除失败 
        console.log(aoo); // 1 
        boo = 2;
        console.log(window.boo); // 2
        console.log(delete boo); // true,删除成功 
        console.log(boo);  // 报错,变量未定义 
      显式声明的全局变量无法 delete 删除,但window属性则可以 
        var aoo = 1;
        window.boo = 2;
        var o1 = Object.getOwnPropertyDescriptor(window,'aoo')
        var o2 = Object.getOwnPropertyDescriptor(window,'boo')
        console.log(o1); 
        // {value: 1, writable: true, enumerable: true, configurable: false} 
        console.log(o2); 
        // {value: 2, writable: true, enumerable: true, configurable: true} 
      访问未声明的变量会报错,而未声明window对象的属性则为undefined 
        console.log(window.aoo); // undefined 
        console.log(aoo); // 报错 
    'var' 与','运算符 [参见:逗号运算符,变量声明]     
      (var aoo = 1), 2==3; // Uncaught SyntaxError: Unexpected token var
      (var aoo = 1);       // Uncaught SyntaxError: Unexpected token var
      (var aoo);           // Uncaught SyntaxError: Unexpected token var
      var aoo = 1, window.boo = 2; // Unexpected token .
'lexical scopes'块作用域,在函数内部、代码块,即'{}'内创建[ES6]  
  PS: 也叫词法作用域,任何一对花括号'{}'中的语句都属于一个块 
  Relate: 
    'var'变量、函数存在块作用域,但可跨块作用域访问  
      存在块作用域:  
      { 
        {
          function foo(){
            return 1;
          }
          var aoo = 1;
          console.log(foo(),aoo); // 1 1
        }
        {
          var aoo = 2;
          function foo(){
            return 2;
          }
          console.log(foo(),aoo); // 2 2 
        }
      }
      可跨块作用域访问: 
      if (true) { 
        var aoo = 1; 
        let boo = 2;
      }
      console.log(aoo); // 1,可跨块作用域访问 
      console.log(boo); // 报错,boo is not defined
'Global Block Bindings'全局块级绑定[ES6] 
  全局作用域使用'var'声明全局变量,相当于给全局对象[浏览器环境下是 window]添加属性 
    这意味着全局对象的属性可能会意外地被重写覆盖
    var RegExp = "Hello!";
    console.log(window.RegExp);     // "Hello!"
  若在全局作用域使用'let'或'const',绑定也发生在全局作用域内,但不会向全局对象添加属性 
    let RegExp = "Hello!";
    console.log(RegExp);           // "Hello!"
    console.log(window.RegExp);    // function RegExp() { [native code] }
let,定义块级变量[ES6] 
  PS: 块级作用域限制,只在定义的块级作用域中存在;
  函数内无变量提升 
    var aoo = 1;
    var boo = 2;
    function foo(){
      console.log(aoo); // undefined,变量提升
      console.log(boo); // 报错
      var aoo = 3; 
      let boo = 4; 
    }
  重复声明报错 
    Example:
      var aoo = 1;
      var aoo = 2;
      let aoo = 3; // 报错,Identifier 'aoo' has already been declared
      let boo = 4;
      let boo = 5; // 报错,Identifier 'boo' has already been declared
    函数内重新声明函数的参数报错
      function foo(aoo){
        var aoo = 1;
        let aoo = 2;  //报错,Identifier 'aoo' has already been declared
        console.log(aoo);
      }
  'Let Declarations in Loops'循环中的'let'声明 
    var arr =[];
    for(var i = 0; i < 10; i++) { 
      arr.push(i); 
    }
    console.log(arr); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    var fooArr =[];
    for(var i = 0; i < 10; i++) {
      fooArr.push(function(){console.log(i); });
    }
    console.log(fooArr[0]); // function(){console.log(i); }
    // i 是以引用的方式存在函数中的
    console.log(fooArr[0]()); // 10
    使用let的声明方式
    var fooArr =[];
    for(let i = 0; i < 10; i++) {
      fooArr.push(function(){console.log(i); });
    }
    console.log(fooArr[0]); // function(){console.log(i); }
    // i 是以引用的方式存在函数中的
    console.log(fooArr[0]()); // 0
    注:let 声明在上述循环内部中的表现是在规范中特别定义的,
    实际上,早期 let 的实现并不会表现中这种效果,是在后来被添加到规范中的 
const,定义块级常量[ES6] 
  Feature: 
    在声明时需赋值,否则报错 
      const num;   // 报错,定义时必须赋值 
    在同一作用域中,常量名不能与其他变量或函数名重名,否则报错 
      const num = 1;
      var num = 2; // 报错,重名  
    不可‹覆盖›改变常量值,否则报错   
      const num = 1, obj = { key: 1 }
      obj.key = 2;
      console.log(obj); // { key: 2 },对对象进行了引用修改 
      num = 2;          // 报错,不可改变常量值 
    只在块级作用域生效 
      if (true) { const num = 1; }
      console.log(num); // 报错,num未定义 
    函数内无变量提升 
      !function(){
        console.log(num1);  // undefined,变量提升 
        console.log(num2);  // 报错,变量未定义,无提升  
        var  num1 = 1
        const num2 = 2 
      }() 
  不可传值改变,只能传址改变; 
    不限制对于值的类型为对象的属性的修改,阻止的是绑定的修改,而不是绑定值的修改
    传值赋值和传址赋值
    传址:赋值过程中,变量实存储的是数据的地址[对数据的引用],而非原始数据或者数据的拷贝
    const arr =[1,2,3];
    arr = [1];    // 报错
    arr.push(4); // 允许
    arr[4] =5;   // 允许
    arr;         // [1, 2, 3, 4, 5]
    
    const person = { name: "Nicholas" };
    person.name = "Greg"; // 正常
    person = { name: "Greg" }; // 抛出错误
    person 变量一开始已经和包含一个属性的对象绑定.
    修改 person.name 是被允许的因为 person 的值[地址]未发生改变,
    但是尝试给 person 赋一个新值(代表重新绑定变量和值)的时候会报错.
  Expand: 
    ES5中可通过定义window不可变属性来模拟常量 
      Object.defineProperty(window,'const1',{
        value: '自定义的常量',
        writable: false,
        enumerable: false, 
        configurable: false
      })
基本类型: 也叫原始类型,占据空间小、大小固定,存储在'stack'栈内存中 
  基本类型: 变量的赋值,会创建该值的一个副本  
  undefined 表示未定义的值 
    在声明变量时没有对其初始化,则变量的值就是 undefined 
  null      表示空指针  
    PS: 将来用于保存对象的变量,可初始化为 null 
    Example: 
    console.log(null === null);
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
    `a${1+2}b` 模版字符串,可以跨越多行,使用反引号引起来[ES6] 
      `${val/expr}` 模板占位符 
    'Strings and Regular Expressions'字符串与正则表达式[ES6] 
      PS: ECMAScript6诞生之前,JS字符串由 16 位编码的字符组成'UTF-16' 
        每个字符又由包含一个 16 位序列的代码单元(code unit)表示.
        所有的字符串属性和方法,例如 length 和 charAt(),都基于这些 16 位编码单元.
        曾经,16 位的容量对于任意字符的存放都是足够的,
        然而 Unicode 引入了扩展字符集(expanded character set)使得限制字符的长度在 16 位以内,
        所以难以满足 Unicode 意图给世界上所有字符提供全局唯一标识符的雄心壮志.
        UTF-16 的前 2^16 个代码点由单个 16 位代码单元表示.
        这个范围被称作基本多语言面(Basic Multilingual Plane,BMP).
        任何超出该范围的部分都是增补的语言面(supplementary plane),
        代码点将不能被单一的 16 位代码单元表示.
        因此,UTF-16 引入了代理项对(surrogate pair)来让两个 16 位代码单元表示一个代码点.
        这意味着字符既可能是包含单个代码单元的 16 位 BMP 字符,
        也可能是由两个代码单元组成的位于增补语言面的 32 位字符.
      Example: 
        var text = "𠮷";
        console.log(text.length);           // 2
        单个 Unicode 字符 "𠮷" 由代理项对表示,
        因此,本例中 JavaScript 在操作该字符串时会将它视为两个 16 位字符.
      str.codePointAt(index); 返回指定下标字符的经过扩展后的UTF-16 编码
        为了全面支持 UTF-16,ECMAScript 6 新添加的方法之一就是 codePointAt(),
        它可以提取给定位置字符串的对应 Unicode 代码点.
        该方法接收代码单元而非字符的位置并返回一个整型值.
        Example:
          var text = "𠮷a";
          console.log(text.charCodeAt(0));    // 55362
          console.log(text.charCodeAt(1));    // 57271
          console.log(text.charCodeAt(2));    // 97
          console.log(text.codePointAt(0));   // 134071
          console.log(text.codePointAt(1));   // 57271
          console.log(text.codePointAt(2));   // 97
          示例中的首个字符并没有位于 BMP 范围内,因此它包含两个代码单元,
          意味着 length 属性是 3 而不是 2 .
          charCodeAt() 方法返回的只是处于位置 0 的第一个代码单元,
          而 codePointAt() 返回的是完整的代码点,即使它分配给了多个代码单元.
    
          对一个字符调用 codePointAt() 方法是判断它所包含代码单元数量的最容易的方法
          function is32Bit(c) { return c.codePointAt(0) > 0xFFFF; }
          console.log(is32Bit("𠮷"));    // true
          console.log(is32Bit("a"));     // false
      String.fromCodePoint(num); 根据指定的UTF-16 编码生成字符
        PS:可以将 String.fromCharCode() 视为 String.fromCharCode() 的完善版本.
          针对 BMP 字符两者会产生相同的结果,只有 BMP 之外的字符才会有差异.
        Example:
          使用给定的代码点来产生相应的单个字符
          console.log(String.fromCodePoint(134071));  // "𠮷"
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
      obj.constructor.prototype   通过实例间接获取 
      Object.getPrototypeOf(obj)  通过实例获取 [ES5] 
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
  对象类型检测方法:  
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
    typeof val;               [详参 一元运算符] 
    obj instanceof Object;    [详参 关系运算符] 
    obj.constructor           查询对象的构造函数 
    'duck type' 鸭子类型,根据其表现来确定其身份 
class,类,基于原型的实现的封装[ES6] 
  class className {} 创建类 
    PS: 类内部定义的方法都是不可枚举的;类和模块内部默认采取严格模式; 
      class内部不可定义原型属性和静态属性;
      类名后面的括号{}里面的内容称之为类体 
    Example: 
      ES5 : 
      var Animal = function(name){
        this.name = name;
      }
      animal.prototype = {
        speak: function(){
          console.log("I am"+this.name);
        }
      }
      var animal = new Animal("cat");
      animal.speak();  //I am cat
      ES6 : 
      class Animal {
        constructor(name){
          this.name = name;
        }
        speak(){
          console.log("I am "+this.name);
        }
      }
      const animal = new Animal("cat");
      animal.speak();    //I am cat
    ◆类体中的方法 
    constructor(){}   构造方法,声明实例属性/方法 
      PS: 实例化时,会调用此方法来初始化实例对象;内部的 this 表示实例对象;  
        若无'constructor'方法,执行时会使用一个空的constructor方法 
        具有唯一性,一个类体不能含有多个constructor构造方法 
    foo(){}           声明原型方法 
      PS: 内部的 this 表示实例对象;  
      [val] () {}  属性名可使用表达式 
        var  aoo = 'sayHello';
        class Clas{
          [aoo] () {
            console.log('hello');
          }
        }
        var clas = new Clas();
        clas.sayHello(); // 1
    static foo(){}    声明静态方法 
      class Clas {
        static foo(){
          console.log('静态方法');
        }
      }
      Clas.foo();  // 静态方法
    get foo(){}  取值函数 
    set foo(){}  存值函数 
      使用get和set关键字,对某个属性设置存值函数和取值函数 
      class MyClass {
        get prop() {
          return 'getter';
        }
        set prop(value) {
          console.log("setter:" + value);
        }
      }
      var inst = new MyClass();
      inst.prop = 123; // setter: 123
      inst.prop ;      // 'getter'
  class Child extends Parent {} 继承全部静态方法、实例属性/方法,选择性继承原型方法  
    Example: 
      class Animal { 
        constructor(name){ 
          this.name = name; 
        }
        say(){ 
          return 'This is a animal'; 
        }
      }
      class Dog extends Animal { 
        constructor(name,color){
          super(name);  // 调用父类的构造方法,继承实例属性/方法   
          this.color = color;
          this.say = super.say();
        }
        gerInfo(){
          return super.say()+',name is: '+this.name+',color is: '+this.color;
          // 父类中定义了say方法,想在子类中调用父类的say方法,使用super.say()即可实现
        }
      }
      let doge = new Dog("dog","black"); 
      doge.gerInfo(); // This is a animal,name is: dog,color is: black 
    使用继承的方式创建的实例对象既是子类的实例,也是父类的实例 
      class Child extends Parent {}
      var child = new Child();
      child instanceof Child ; // true
      child instanceof Parent; // true
    super 关键字,在子类中进行调用父类中的构造方法,从而继承实例属性/方法  
      PS: 由于对象总是继承于其它对象,所以可以在ES6的任何一个对象中使用super关键字 
      若子类未显式定义'constructor',则下面的代码将被默认添加 
        constructor(...args){
          super(...args)
        }
      super()  子类的'constructor'构造函数中调用 
        子类的constructor方法必须调用super方法,否则不能新建实例 
        因为子类没有属于自己的this对象,而是继承了父类的this对象而对其进行加工 
        只有调用了super方法后,才可使用this,否则报错;
      super.xx 父类中的静态方法或原型方法 
        子类的构造方法中,只能调用父类的原型方法,而不能调用静态方法 
          但可使用 '父类名.方法()' 的方式调用父类的静态方法 
        子类的原型方法中,只能调用父类的原型方法,而不能调用静态方法 
          但可使用 '父类名.方法()' 的方式调用父类的静态方法 
        子类的静态方法中,只能调用父类的静态方法,而不能调用原型方法  
        class Foo{
          static fooSay(){
            console.log('foo say');
          }
        }
        class Bar extends Foo{
          sing(){
            // super.fooSay(); // 报错,因为 super.fooSay() 是父类的静态方法 
            console.log('hello');
          }
          static barSay(){
            super.fooSay();
            console.log('bar say')
          }
        }
        Bar.fooSay() // foo say 
        Bar.barSay() // foo say   bar say 
    ES5继承和ES6继承的区别 
      在ES5中,继承实质上是子类先创建属于自己的this,
      然后再将父类的方法添加到this [也就是使用 Parent.apply(this) 的方式],
      或者 this.__proto__ [即Child.prototype = new Parent()]上;
      而在ES6中,则是先创建父类的实例对象this,然后再用子类的构造函数修改this;
  inst = new Clas(arg) 创建实例 
    PS: 创建实例时会自动执行类体中的'constructor'方法 
    inst.constructor             创建该实例的类 
    inst.constructor.prototype   该实例的原型对象 
    new Clas{}(arg) 立即执行的class 
      let point = new class{
        constructor(x = 0, y = 0) {
          this.x = x;
          this.y = y;
        }
        toString() {
          return this.x + this.y;
        }
      }(1, 2);
      console.log(point.toString()); // 3
  ◆相关操作
  str = Clas.name;  获取类的名字 
'Decorator'修饰器: 用来修改类的行为[ES7] 
'Iterator'遍历器: 为不同的数据结构提供统一的访问机制的接口 
  PS: JS表'集合'的数据结构有: Array、Object、Map&Set  
    也可组合使用,定义自己的数据结构,如数组的成员是Map,Map的成员是对象,
    这样就需要一种统一的接口机制,来处理所有不同的数据结构 
    部署了Iterator接口数据结构都可完成遍历操作,即依次处理该数据结构的所有成员  
  遍历过程:  
    创建一个指针对象,指向当前数据结构的起始位置 
    第一次调用指针对象的next方法,可以将指针指向数据结构的第一个成员 
    第二次调用指针对象的next方法,指针就指向数据结构的第二个成员 
    不断调用指针对象的next方法,直到它指向数据结构的结束位置 
    每一次调用next方法,都会返回数据结构的当前成员的信息 
    具体来说,就是返回一个包含value和done两个属性的对象 
    其中,value属性是当前成员的值,done属性是一个布尔值,表示遍历是否结束。
  Iterator接口: 部署了Iterator接口的数据结构就称可遍历的  
    或者说,一个数据结构只要具有 Symbol.iterator 属性,就可以认为是可遍历的
    数据结构的[Symbol.iterator]属性就是当前数据结构默认的遍历器生成函数 
    执行这个函数,就会返回一个遍历器。
    Symbol.iterator 是一个预定义好的、类型为 Symbol 的特殊值 
    Example:
      数组的 Symbol.iterator 属性 
        let arr = ['a', 'b', 'c'];
        let iter = arr[Symbol.iterator]();
        var aoo1 = iter.next() // { value: 'a', done: false }
        var aoo2 = iter.next() // { value: 'b', done: false }
        var aoo3 = iter.next() // { value: 'c', done: false }
        var aoo4 = iter.next() // { value: undefined, done: true }
        console.log(aoo1,aoo2,aoo3,aoo4);
  会默认调用Iterator接口的场合:  
    for-of  循环 
    解构赋值: 对数组和Set结构进行解构赋值时,会默认调用[Symbol.iterator]方法 
    扩展运算符 
    yield*后面跟的是一个可遍历的结构,它会调用该结构的遍历器接口 
    其他场合: 由于数组的遍历会调用遍历器接口,所以接受数组作为参数的场合,会调用遍历器接口 
      如: 
      Array.from()
      Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
      Promise.all()
      Promise.race()
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
------------------------------------------------------------------------------- 
'expression'表达式: 解释器通过计算将表达式转换为一个值 
  PS: 最简单的表达式是字面量或变量名; 通过合并简单的表达式来创建复杂的表达式 
'operator'运算符: 用于操作数据值的运算符,也叫操作符 
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
    str = typeof val  值类型检测 
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
    bol = delete val  删除对象中的成员[值],返回是否删除成功的布尔值  
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
    obj instanceof Foo; bol,对象是否继承至构造函数  
      PS: 对象须和构造函数处于同一iframe或window中,否则返回false
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
    'Destructuring'解构赋值: 按照一定模式,从数组和对象中取值,对变量进行赋值[ES6] 
      PS:
      Example:
        var [a,b,c] = [1,2,3]; //把数组的值分别赋给下面的变量；
        console.log(a,b,c);// 1 2 3 
      解构嵌套 
        var [ a,b,[ c1,c2 ] ] = [ 1,2,[ 3.1,3.2 ] ];
        console.log(c1,c2); // 3.1 3.2
      不完全解构 
        赋值不成功,变量的值为undefined
        var [a,b,c] = [1,2];
        console.log(a,b,c); // 1 2 undefined 
      设定默认值 
        var [a,b,c=3] = [1,2];
        console.log(a,b,c); // 1 2 3 
        覆盖默认值 
        var [a,b,c=3] =[1,2,4];
        console.log(a,b,c); // 1 2 4
      对象的解构赋值:不受属性的顺序影响,和属性名对应 
        PS:默认的变量名要和属性名一致,才会成功赋值,否则赋值不成功 
        Example:
          var {a,b,c} = {"a":1,"b":2,"c":3};
          console.log(a,b,c); // 1 2 3 
          改变顺序
          var { a,b,c } = {"a":1,"c":3,"b":2};
          console.log(a,b,c); // 1 2 3 
          
          var { a } = {"b":2};
          console.log(a); // undefined
        给一个变量名与属性名不一样的变量解构赋值 
          var { b:a } = {"b":2};
          console.log(a); // 2
      对象解构赋值嵌套
        var {a:{b}} = {"a":{"b":1}};
        console.log(b);//结果:b的值为1
      对象解构指定默认值 
        var {a,b=2} = {"a":1}; 
        console.log(b); // 2
      字符串的解构赋值 
        PS:解构赋值的过程中,字符串被转换成了一个类似数组的对象
        var [a,b,c,d,e] = "12345";
        console.log(a,b,c,d,e); // 1 2 3 4 5 
      使用举例  
        交换变量的值 
          var x = 1;
          var y = 2;
          [x,y] = [y,x]; 
        定义函数参数 
          function foo({a,b,c}){ 
            console.log(a,b,c); 
          }
          foo({a:1,b:2,c:3,d:4}); // 1 2 3 
        函数参数的默认值 
          function demo({aoo=1}){ 
            console.log(aoo); 
          }
          demo({});
    'Spread'扩展运算符: 把数组解开成单独的值[ES6] 
      PS:除了用在rest参数中,还有其他用途
      结合数组使用,把数组的元素用逗号分隔开来,组成一个序列 
        function sum(a,b) {
          return  a+b ;
        }
        let arr = [2,3];
        // ...arr  // 报错
        sum(...arr);    // 5,用扩展运算法将数组[2,3]转换成2,3
        // sum( ...arr ) 的效果相当于sum( 2,3 ) 
      Example:
        var aoo =[1,2,3];
        var boo =[...aoo,4];
        console.log(boo);  //[1, 2, 3, 4]
        console.log(...aoo); //1 2 3,相当于 console.log(1,2,3)
        // 相当于
        console.log.apply(null,aoo); // 1 2 3
        ...aoo;            //报错
      函数中将部分参数组成的数组 
        var foo = function(aoo,...boo){ 
          console.log(aoo,boo); 
        }
        foo(1,2,3,4);  // 1 [2, 3, 4]
        //  将其余的参数放在数组 boo 中
  三元表达式 
    expr1?expr2:expr3;  三元条件运算符,当expr1为真则执行expr2,否则执行expr3 
      PS: 三元条件运算符相当于if语句的简写形式 
      var box=5>4?'对':'错';    //对,5>4赋值第一个'对'给box.否则第二个. 
      console.log(true?'真':'假'); // 真 
      console.log(false?'真':'假'); // 假 
      console.log('0'?'真':'假'); // 真 
      console.log('1'?'真':'假'); // 真 
  ◆运算优先级 
    PS: 可通过圆括号来提高优先级 
    运算符             优先级  描述                 关联性       
    ()                 19     圆括号                \        
    obj.key            18     成员访问              从左到右     
    obj[‹computedVal›] 18     需计算的成员访问       从左到右     
    new Fn(arg)        18     new ‹带参数列表›      \           
    fn(arg?)           17     函数调用              从左到右      
    new Fn()           17     new ‹无参数列表›      从右到左     
    num++              16     后置递增              \       
    num--              16     后置递减              \       
    !bol               15     逻辑非                从右到左  
    ~                  15     按位非                从右到左  
    +num               15     正数                  从右到左   
    -num               15     负数                  从右到左      
    ++num              15     前置递增              从右到左 
    --num              15     前置递减              从右到左   
    typeof val         15     类型检测              从右到左   
    void expr          15                          从右到左    
    delete val         15                          从右到左   
    num*num            14     乘法                 从左到右     
    num/num            14     除法                 从左到右   
    num%num            14     取模                 从左到右   
    num+num            13     加法                 从左到右    
    num-num            13     减法                 从左到右  
    val << val         12     按位左移             从左到右  
    val >> val         12     按位右移             从左到右    
    val >>> val        12     无符号右移           从左到右     
    num < num          11     小于                 从左到右 
    num <= num         11     小于等于             从左到右 
    num > num          11     大于                 从左到右 
    num >= num         11     大于等于             从左到右     
    val in obj         11                         从左到右     
    obj instanceof fn  11                         从左到右    
    val == val         10     等号                从左到右   
    val != val         10     不等                从左到右    
    val === val        10     全等                从左到右  
    val !=== val       10     非全等              从左到右     
    val & val          9      按位与              从左到右    
    val ^ val          8      按位异或            从左到右    
    val | val          7      按位或              从左到右     
    bol && bol         6      逻辑与              从左到右      
    bol || bol         5      逻辑或              从左到右   
    bol?val1:val2      4      条件运算符          从右到左      
    val = val          3      赋值               从右到左  
    val += val         3                         
    val -= val         3                         
    val *= val         3                         
    val /= val         3                         
    val %= val         3                         
    val <<= val        3                         
    val >>= val        3                         
    val &= val         3                         
    val ^= val         3                         
    val |= val         3                         
    yield  fn          2                        从右到左   
    yield* fn          2                        从右到左   
    ...obj             1     展开运算符          \            
    val , val          0     逗号                从左到右    
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
'statement'语句: 比表达式更大的单位 
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
  for(var val of iterator){}  遍历[ES6] 
    PS: 当使用for...of循环遍历某种数据结构时,该循环会自动去寻找Iterator接口
      原生具备Iterator接口的数据结构: Array Map Set String TypedArray arguments NodeList对象 
    数组遍历 
      var arr = ['a','b','c','d','e'];
      for(let val of arr){
        console.log(val); // a b c d e
      }
    字符串遍历 
      let word = "abcde";
      for(let w of word){
        console.log(w); // a  b  c  d  e
      }
    类数组遍历,如'DOM List'
      <p>1</p>
      <p>2</p>
      <p>3</p>
      //假设有3个p元素
      let pList = document.querySelectorAll('p');
      for(let p of pList){
        console.log(p); // <p>1</p>  <p>2</p>  <p>3</p> 
      }
    set和map解构的遍历
    不能遍历'Object' 
      PS:要能够被for...of正常遍历的,都需要实现一个遍历器Iterator[又叫迭代器] 
        而数组、Set和Map结构,内置了遍历器Iterator,它们的原型中都有一个 Symbol.iterator 方法 
        而Object对象并没有实现这个接口,所以无法被for...of遍历 
      Example: 遍历对象报错
        let obj = {"name":"前端君"};
        for(let v of obj){  
          console.log(v);
        }
        // 报错, undefined is not a function
      验证原型中的'Symbol.iterator'方法 
        'Symbol.iterator'是一个特殊的Symbol值,其作为prototype对象属性名时,需使用'[]'的形式;
        prototype[Symbol.iterator] [不能使用点形式获取:prototype.Symbol.iterator]
        即只要一数据结构拥有[Symbol.iterator]()方法的数据结构,就可被'for-of'遍历,称为可遍历对象 
        var arr = Array.prototype[Symbol.iterator];  
        var str = String.prototype[Symbol.iterator]; 
        var set = Set.prototype[Symbol.iterator];    
        var map = Map.prototype[Symbol.iterator];    
        var obj = Object.prototype[Symbol.iterator]; 
        console.log(arr); // function values() { [native code] }
        console.log(str); // function [Symbol.iterator]() { [native code] }
        console.log(set); // function values() { [native code] }
        console.log(map); // function entries() { [native code] }
        console.log(obj); // undefined
      Iterator遍历器的原理
        当可遍历对象被for...of遍历的时候,[Symbol.iterator]()就会被调用,
        返回一个iterator对象,其中还有一个很重要的方法:next();
        先调用可遍历对象的[Symbol.iterator]( )方法,得到一个iterator遍历器对象,
        然后就在遍历器上不断调用next()方法,直到done的值为true的时候,就表示遍历完成结束了。
        let arr = ['a','b','c']; //数组:一个可遍历对象
        let iter = arr[Symbol.iterator](); //调用数组的Symbol.iterator()方法
        iter.next(); // {value: "a", done: false}
        // 第1次调用next():返回第1个元素:“a”,以及done的值为fasle,表示循环没有结束,继续遍历。
        iter.next(); // {value: "b", done: false}
        // 第2次调用next():返回第2个元素:“b”,以及done的值还是为fasle,循环没有结束,继续遍历。
        iter.next(); // {value: "c", done: false}
        // 第3次调用next():返回第3个元素:“c”,以及done的值依然为fasle,循环没有结束,继续遍历。
        iter.next(); // {value: undefined, done: true}
        // 第4次调用next():返回的value值为undefined,以及done的值变成了true,表示遍历结束。
      自定义对象的Iterator遍历器
        给Object对象加上[Symbol.iterator]()方法
        let obj = { //定义一个的Object对象
          0:"我是0",
          1:"我是1",
          2:"我是2",
          length:3,
          //添加[Symbol.iterator]方法
          [Symbol.iterator] : function() { 
            let _this = this;
            let index = 0;
            return {
              next:() => {
                let value = _this[index];
                let done = (index >= _this.length);
                index++;
                return {value,done}
              }
            }
          }
        };
        for(let v of obj){
          console.log(v); // "我是0" // "我是1" // "我是2"
        }
    'break'终止循环 
      var arr = [1,2,3,4,5];
      for(let val of arr){
        if(value == 3){ break; } 
        console.log(val); // 1 2
      }
    'continue'继续[后面的]循环 
      var arr = [1,2,3,4,5];
      for(let val of arr){
        if(val == 3){ continue; } // 跳过当前循环,继续后面的循环
        console.log(val); // 1 2 4  5
      }
    使用数组的扩展keys()获取键名再遍历,index为数字类型
      var arr = [1,2,3,4,5];
      var rstArr = arr.keys();
      console.log(resArr); 
      for(let index of arr.keys()){
        console.log(index); // 0 1 2 3 4
      }
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
  throw val  异常触发,用于抛出自定义错误 
    PS: 在遇到throw操作时,代码会立即停止执行
    val any,类型无要求
  try{}catch(err){} 异常捕获与处理[ES3+] 
    PS: 与Java中的 try-catch 完全相同
      IE7存在bug: 除非有catch否则不执行finally
    try{
      // 可能会导致错误的代码
      // catch 和 finally 必须存在一个 
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
Function,函数基础类,ES中所有函数的基类 
  PS: JS中函数是唯一能创建新作用域的地方;  
  Extend：Object 
    Function.prototype.__proto__.constructor===Object // true 
  Instance: 
    PS: 变量名可以使用中文字符来进行命名而不会报错[但最好不要使用中文] 
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
  Proto:   
    Function的原型对象,也是一个函数 
      console.log(typeof Function.prototype); // function 
    .name      str,函数的名字
    .arguments   Arguments[NdA],在函数内部表示函数接收到的参数 
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
    .length    num,获取函数声明时定义的参数的个数 
      Example: :
      function box(a,b){ return a+b; }
      console.log(box.length);  // 2,表示box的参数有两个.
    .caller    fn,函数执行时的上层函数,全局作用域中则为 null  
      function foo(){
        return arguments.callee.caller;
      };
      function goo(){
        console.log(arguments.callee === foo() ); // true 
        console.log(arguments.callee.caller);     // null 
      };
      goo(); 
    .toString()   转换为字符串   
    .call(context[,arg1,arg2,...]) 改变函数的运行环境/函数借用 
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
    .apply(context[,arr/arrLike])  改变函数的运行环境/函数借用 
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
    .bind(context[,arg1,arg2,...]) fn,返回绑定运行环境及初始化参数后的函数拷贝[ES5][IE9+]
      context 返回的函数被调用时,作为其 this  
        相当于 context.foo([arg,..])  [Self]
        当使用 new 操作符() 调用绑定函数时,该参数无效 
      arg     返回的函数被调用时,作为其前若干个参数 
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
      手动实现bind函数 
        function bind(fn, context){
          return function(){
            return fn.apply(context, arguments);
          };
        }
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
  Feature: 
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
      高阶函数: 在参数中传递函数的函数 
        函数也是对象可以向其他值一样作为参数传递
      递归: 一个函数调用本身或者两个函数相互调用 
        PS: 递归必须要定义终止条件,否则无限递归 
          一般递归效率较低,但处理探测或者处理多分支的问题,则效率较高 
        Example:
          求斐波那契数 
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
          查找数字的所有因子 
            如: 6=1*2*3 
            思路: 从最小的因子开始,剩下部分再递归
            function findAll(num,resultArr){
              for (var i = 2; i <= num; i++) {
                if (num % i == 0) {
                  resultArr.push(i) 
                  findAll(num / i,resultArr)
                  return ;  // 在找到第一个最小因子后结束递归,否则会找到其他多余的因子  
                }
              }
            }
            var result = []
            findAll(6,result)
    惰性载入函数: 改变函数自身,以优化多次在相同条件下执行的函数 
      Example: 
      首次执行返回两参数的和,后续返回两参数的积 
      一般: 
      var foo = function(arg1,arg2){
        if (!arguments.callee.aoo) {
          arguments.callee.aoo = true;
          return arg1+arg2;
        }
        else {
          return arg1*arg2;
        }
      }
      console.log(foo(3,4));
      console.log(foo(3,4));
      console.log(foo(3,4));
      惰性载入函数: goo被替换了,不用每次都判断aoo的值 
      var goo = function(arg1,arg2){
        goo = function(arg1,arg2){
          return arg1*arg2;
        }
        return arg1+arg2;
      } 
      console.log(goo(3,4));
      console.log(goo(3,4));
      console.log(goo(3,4));
      由给定值aoo是否为0,来决定函数foo为求和还是求积函数 
      一般: 
      var foo = function(arg1,arg2){
        if (aoo == 0) {
          return arg1+arg2;
        }
        else {
          return arg1*arg2;
        }
      }
      惰性载入函数: goo被替换了,不用每次都判断aoo的值 
      var goo = function(arg1,arg2){
        if (aoo == 0) {
          return function(arg1,arg2){
            return arg1+arg2;
          };
        }
        else {
          return function(arg1,arg2){
            return arg1*arg2;
          };
        }
      }
    函数柯里化: 科里化后的[多参数]函数可固化前若干个参数  
      function curry (foo){ // 创建柯里化函数的通用方式
        // 获取传入额外的参数组成的数组 
        var args1 = Array.prototype.slice.call(arguments,1) 
        return function(){
          // 类数组数组化 
          var args2 = Array.prototype.slice.call(arguments) 
          var args = args1.concat(args2) 
          return foo.apply(null,args);
        };
      }
      var foo = function(num1,num2){
        return num1+num2;
      }
      var goo = curry(foo,3); // 
      console.log(goo(4)); // 7 
    不具备函数重载: 即当函数名相同时会被覆盖掉[不会因为参数或内部定义不同而进行区分] 
    obj = foo.prototype [构造]函数的原型对象,不可枚举 [详见 原型] 
    默认参数: 在定义函数时,将参数赋值[ES6]   
      Example: 
        function person(name='aoo',age=25){
          console.log(name,age);
        }
        person();         // aoo 25
        person('boo',18); // boo 18
      当传入的参数为非 undefined 值时,才会覆盖该对应的默认参数  
        function person(age = 12){
          console.log(age);
        }
        person();          // 12
        person(undefined); // 12
        person(0);         // 0
        person(null);      // null
    ...aoo  'rest argument'剩余参数: 获取函数剩下部分的参数,类型为数组[ES6] 
      在实参中,除了指定参数以外,剩余的参数都会被'...values'获取到 
        function sum(result,...values){ //求和函数,得到的结果赋值到result 
          console.log(values); // [1,2,3,4]
          values.forEach(function (v,i) { //进行求和
            result += v; //求和得到的结果存到result
          });
          console.log(result); // 10
        }
        var res = 0; // 存储求和结果的变量res
        sum(res,1,2,3,4);  //调用sum函数
      rest参数必须是函数的最后一个参数[后面不能再跟其他参数] 
        //错误写法
        function sum(result, ...values, mult){
          //rest参数...values后面还有一个参数mult
        }
        //正确的写法
        function sum(result, mult, ...values){
          //rest参数...values放在最后
        }
'Arrow functions'箭头函数 [ES6] 
  Feature: 
    变化形式: ([arg1,arg2,..]) => { statements } 
      相当于: function([arg1,arg2,..]){ statement }
      ◆参数: 
      无参数时,必须使用一个括号来表示  () => {} 
      单参数时,可省略括号 arg => {} 
      多参数时,不可省略括号 
      ◆函数体: 
      单条语句时,可省略大括号,且该条语句作为函数返回值: () => expr 
        相当于 function(){ return expr } 
          var rst = [1,2,3,4].map( val => val+100 )
          console.log(rst); // [101, 102, 103, 104] 
        可使用括号来'封装'单语句
          var foo = () => ('abc')
          console.log(foo()); // abc 
          
          () => ({key1: 'val1'}) // 返回对象存在歧义时 
          相当于: function(){ return {key1: 'val1'}; }
      多条语句时,不可省略大括号 
    不能用作构造器,否则报错  
      var Foo = () => {};
      var foo = new Foo(); // TypeError: Foo is not a constructor
    不绑定 this 
      不创建自己的 this,而使用封闭执行上下文的 this  
        var obj = {  //定义一个对象
          x: 100,     //属性x
          show: function(){
            setTimeout( function(){ //匿名函数 
              console.log(this.x);
            }, 500 );
          }
        };
        obj.show(); // undefined
        setTimeout() 中的匿名函数在 window 上下文中执行,this 表示的为 window 
        
        var obj = {
          x: 100, 
          show: function (){
            setTimeout( () => {   // 箭头函数
              console.log(this.x);
            }, 500 );
          }
        };
        obj.show(); // 100
        定义 obj.show() 方法时,此时的this是指的obj,所以 this.x 指的是 obj.x.
        而在 show() 被调用时,this依然指向的是被定义时候所指向的对象obj;
      严格模式中与 this 相关的规则都将被忽略 
        因为 this 是词法层面上的 
      使用 call 或 apply 调用时,对this指向无影响,只是改变传参 
        因为 this 已在词法层面完成了绑定 
    不绑定'arguments'对象 
      var foo = () => { console.log(arguments); }
      foo() // 报错: arguments is not defined 
      
      使用'剩余参数'间接实现类似功能 
      var log = (...args) => {
        console.log.apply(console,args)
      }
    无'prototype'属性 
      var Foo = () => {};
      console.log(Foo.prototype); // undefined
'Generator'生成器函数,可控制函数内部状态,暂停或继续[ES6] 
  PS: 中途退出后又重新进入执行,函数内定义的变量的状态都会保留 
  function* foo(){} 声明Generator函数
    Example: 
      function* Hello(name) {  
        yield `hello ${name}`;
        yield `how are you`;
        yield `bye`;
      }
    'yield'关键字: 相当于暂停执行并且返回信息 
      yield命令后面只能是Thunk函数或Promise对象 
      Generator函数可以有多个yield
      yield代表的是暂停执行,后续通过调用生成器的next()方法,可以恢复执行 
    'yield*'关键字: 调用另一个Generator函数 
      若一个Generator函数A执行过程中,进入[调用]了另一个Generator函数B,
      那么会一直等到Generator函数B全部执行完毕后,才会返回Generator函数A继续执行 
      function* gen1() {   
        yield "gen1 start";
        yield "gen1 end";
      }
      function* gen2() {  
        yield "gen2 start";
        yield "gen2 end";
      }
      function* start() { 
        yield "start";
        // 使用关键字yield*来实现调用另外两个Generator函数
        yield* gen1();
        yield* gen2();
        yield "end";
      }
      var ite = start(); //调用start函数,创建一个生成器
      ite.next(); // {value: "start", done: false}
      ite.next(); // {value: "gen1 start", done: false}
      ite.next(); // {value: "gen1 end", done: false}
      ite.next(); // {value: "gen2 start", done: false}
      ite.next(); // {value: "gen2 end", done: false}
      ite.next(); // {value: "end", done: false}
  调用Generator函数 
    Generator函数被调用后返回该生成器的迭代器'iterator'对象[而不执行其中的语句] 
    iterator.next() 首次调用后,语句执行到第一个'yield'表达式的位置,并停止执行 
      该表达式定义了迭代器要返回的值,或被'yield*'委派至另一个生成器函数 
        function* anotherGenerator(i) {
          yield i + 1;
          yield i + 2;
          yield i + 3;
        }
        function* generator(i){
          yield i;
          yield* anotherGenerator(i);
          yield i + 10;
        }
        var gen = generator(10);
        console.log(gen.next().value); // 10
        console.log(gen.next().value); // 11
        console.log(gen.next().value); // 12
        console.log(gen.next().value); // 13
        console.log(gen.next().value); // 20
      返回一个对象,然后继续等待 
        对象包含两个属性：
        value: 本次'yield'后面表达式的返回值 
          区别于'yield'的返回值,在下次.next() 时,才能获取到'yield'的返回值 
        done: bol,表示生成器是否已经产出了它最后的值,即生成器函数是否已经返回 
    iterator.next() 再次被调用时,继续接着往下执行,直到done的值为true 
    iterator.next(arg) 传参,参数会替换上一个'yield'的返回值 
      function* foo() {
        var res = yield `hello`; // 把返回值字符串'hello'赋给变量res
        console.log(res,1); // undefined 1
        yield res;
      }
      let iterator = foo(); // 返回一生成器对象
      iterator.next(); //{value: "hello", done: false}
      // 若为 iterator.next(); // {value: undefined, done: false}
      iterator.next("world"); // {value: "world", done: false}
      相当于
      function* foo() {
        var res = yield `hello`; // 把返回值字符串'hello'赋给变量res
        console.log(res); // {value: undefined, done: false}
        res = 'world'
        yield res;
      }
      let iterator = foo(); // 返回一生成器对象
      iterator.next(); // {value: "hello", done: false}
      iterator.next(); // {value: "world", done: false}
    当在生成器函数中显式'return'时,会导致生成器立即变为完成状态
      即调用.next()方法返回的对象的'done'为 true 
      如果'return'了一个值,则改值会作为下次调用 .next() 方法返回的value值 
      function* yieldAndReturn() {
        yield "Y";
        return "R";//显式返回处
        yield "unreachable";
      }
      var gen = yieldAndReturn()
      console.log(gen.next()); // { value: "Y", done: false }
      console.log(gen.next()); // { value: "R", done: true }
      console.log(gen.next()); // { value: undefined, done: true }
  使用Generator函数实现异步操作 
    原理: 将异步操作的语句写到'yield'后面,通过执行next方法进行回调 
'ASYNC'用来替代回调函数、解决异步操作的一种方法[ES7] 
  PS: async函数与Promise、Generator函数类似,本质上是Generator函数的语法糖 
  var promise = async function(){}  函数表达式声明async函数
  async function foo() {}           声明async函数
    PS: 函数执行时,遇到'await'就会先返回,等到异步操作完成,再接着执行函数体内后面的语句 
    Example: 
      function timeout(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
      async function asyncPrint(value, ms) {
        await timeout(ms);
        console.log(value);
      }
      asyncPrint('hello world', 1000); //  1000 毫秒后,输出hello world 
      改写为:
      由于async函数返回的是Promise对象,可以作为await命令的参数
      async function timeout(ms) {
        await new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
      async function asyncPrint(value, ms) {
        await timeout(ms);
        console.log(value);
      }
      asyncPrint('hello world', 1000);
    await promise 
      promise   Promise对象,否则被转成一个立即resolve的Promise对象 
      Example:
        async function f() {
          return await 123;
        }
        f().then(v => console.log(v))  // 123
      只要有await后面的Promise变为reject,则整个async函数都会中断执行 
        ◆前一个异步操作失败,也不中断后面的异步操作的方法
        将await放在try...catch结构里面 
          async function f() {
            try {
              await Promise.reject('出错了');
            } 
            catch(e) {
            }
            return await Promise.resolve('hello world');
          }
          f().then(v => console.log(v))  // hello world
        await后面的Promise跟一个catch方法,处理可能出现的错误 
          async function f() {
            await Promise.reject('出错了')
            .catch(e => console.log(e));
            return await Promise.resolve('hello world');
          }
          f().then(v => console.log(v))
          // 出错了
          // hello world
      多个await的异步操作,若不存在继发关系,最好同时触发 
        // 写法一
        let [foo, bar] = await Promise.all([getFoo(), getBar()]);
        // 写法二
        let fooPromise = getFoo();
        let barPromise = getBar();
        let foo = await fooPromise;
        let bar = await barPromise;
    async函数返回值和return返回值
      async函数返回值为Promise对象,可使用then方法添加回调函数
        async函数返回的Promise对象,必须等到内部所有await命令后面的Promise对象执行完,
        才会发生状态改变,除非遇到return语句或者抛出错误
      return返回值为then方法回调的参数 
      Example:
        async function f() {
          return 'hello world';
        }
        f().then(v => console.log(v)) // "hello world"
        async函数内部抛出错误,使Promise对象变为reject状态
        async function f() {
          throw new Error('出错了');
        }
        f().then( v => console.log(v)
        , e => console.log(e) )  // Error: 出错了
    采用异步函数作为回调 
      将forEach方法的参数改成async函数存在问题 
        let docs = [{}, {}, {}];
        docs.forEach(async function (doc) { // 可能得到错误结果
          await db.post(doc);
        });
        上面代码可能不会正常工作,原因是这时三个 db.post 操作将是并发执行,
        也就是同时执行,而不是继发执行.
        正确的写法: 采用for循环 
        let docs = [{}, {}, {}];
        for (let doc of docs) {
          await db.post(doc);
        }
  'Async Iterator'异步遍历器 
    PS:Iterator接口是一种数据遍历的协议,调用遍历器对象的next方法,就会得到一个对象,
      该对象表示当前遍历指针所在的那个位置的信息,next方法返回的对象的结构是{value, done},
      其中value表示当前的数据的值,done是一个布尔值,表示遍历是否结束.
    遍历器的next方法必须是同步的,只要调用就必须立刻返回值 
      也就是说,一旦执行next方法,就必须同步地得到value和done这两个属性 
      若遍历指针正好指向同步操作,当然没有问题,但对于异步操作,就不太合适了 
      目前的解决方法是,Generator函数里面的异步操作,返回一个Thunk函数或者Promise对象,
      即value属性是一个Thunk函数或Promise对象,等待以后返回真正的值,而done属性则还是同步产生的
      目前,有一个提案,为异步操作提供原生的遍历器接口,即value和done这两个属性都是异步产生,这称为'异步遍历器'
  for await(var val of asyncIterator){}   遍历异步的Iterator接口 
  异步生成器函数 : async函数与Generator函数的结合 
    async function* foo() { } 定义异步Gen函数 
      async function* gen() {
        yield 'hello';
      }
      const genObj = gen();
      genObj.next().then(x => console.log(x)); // { value: 'hello', done: false }
      执行后返回一个异步Iterator对象,该对象调用next方法,返回一个Promise对象 
this,JS代码执行时的'context'上下文对象 
  PS: this根据函数执行的场合不同而变化,但始终指向当前运行的对象; 
    在绝大多数情况下,函数的调用方式决定了this的值;
    this不能在执行期间被赋值;
    当在严格模式中调用函数,上下文将默认为 undefined 
  运行场景枚举: 
    全局上下文中[在任何函数体外部]: 指向全局对象'window' 
      NodeJS环境,全局作用域中上下文中始终是Global对象 
      console.log(this === window); // true 
      var aoo = 1; 
      console.log(this.aoo,window.aoo); // 1 1,定义的全局变量实际上就是window的属性
      this.boo = 2;
      console.log(boo); // 2 
    普通/匿名函数执行时: this始终指向'window'[严格模式下指向 undefined] 
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
      
      [1,2,3,4,5].map(function(val,idx ){  
        // 匿名函数作为参数传入map方法中,然后执行该匿名函数 
        console.log(this);  // window 
        return this
      } )
    构造函数执行时: this表示一空对象,其原型为 Foo.prototype 对象 
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
    对象方法执行时: this指向调用方法的对象 
      var obj = {
        aoo: 100
      };
      function foo(){ 
        return this.aoo; 
      };
      obj.goo = foo;
      console.log(obj.goo()); // 100
    箭头函数执行时: this为上一层中的this,即不改变this的指向 
    [ES6的]类的静态方法执行时: this表示该类 
    [ES6的]类的原型方法执行时: this表示实例 
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
  Self: 
    作为函数的参数,不会改变this指向[仅在函数体中会改变] 
    var obj = {
      aoo: 100
      ,foo: function(){
        // 不会将 this 绑定到 console 对象中 
        console.log(this.aoo);
      }
    }
    obj.foo() // 100 
-----------------------------------------------------------------------待整理   

