ES6 
  PS:于2015年6月发布,目标是使JS可用来编写复杂的大型应用程序,成为企业级开发语言 
  Babel转码器将ES6转换为ES5 
    配置文件'.babelrc' : 位于项目的根目录 
      文件配置  用来设置转码规则和插件
        {
          "presets": [  // 设定转码规则 
            "latest",
            "react",
            "stage-2"
          ],
          "plugins": []
        }
        官方提供了以下的规则集,可以根据需要安装 
          # 最新转码规则
          $ npm install --save-dev babel-preset-latest
          # react 转码规则
          $ npm install --save-dev babel-preset-react
          # 不同阶段语法提案的转码规则[共有4个阶段],选装一个
          $ npm install --save-dev babel-preset-stage-0
          $ npm install --save-dev babel-preset-stage-1
          $ npm install --save-dev babel-preset-stage-2
          $ npm install --save-dev babel-preset-stage-3
    'babel-cli'命令行编译 
      npm install --global babel-cli   #安装
      基本用法 
        babel example.js  # 转码结果输出到标准输出
        babel example.js --out-file compiled.js  # 转码结果写入一个文件
          # 或者
          babel example.js -o compiled.js
          # --out-file 或 -o 参数指定输出文件
        babel src --out-dir lib     # 整个目录转码
          # 或者
          babel src -d lib
          # --out-dir 或 -d 参数指定输出目录
        babel src -d lib -s   # -s 参数生成source map文件
    'babel-cli'项目中安装 
      PS:全局环境下,进行 Babel 转码意味着,若项目要运行,全局环境必须有 Babel,
        也就是说项目产生了对环境的依赖。
        另一方面,这样做也无法支持不同项目使用不同版本的 Babel。
      npm install --save-dev babel-cli   #安装
      配置'package.json' 
        {
          // ...
          "devDependencies": {
            "babel-cli": "^6.0.0"
          },
          "scripts": {
            "build": "babel src -d lib"
          },
        }
      npm run build         #执行命令转码 
◆标准库的扩展&数据类型&对象库扩展 
Number 数值 
  PS:ES6中,isNaN、isFinite、parseInt、parseFloat等方法从window移植到了Number上 
    目的是减少全局性的函数,把全局函数合理地规划到其他对象下,逐渐实现语言的模块化 
  Number.isNaN()      判断是否为非数值
    传统的 window.isNaN() 会把非数值的参数转化成数值再进行判断,
    而 Number. isNaN() 只对数值类型有效,非数值类型的参数一律返回false
    isNaN('abc'); // true,'abc'无法转为一个数值,返回true
    Number.isNaN('abc'); // false,Number.isNaN不做类型转换,直接返回false
  Number.isFinite()   判断数值是否非无穷
    只是对数值类型有效,对非数值类型的参数一律返回false。
    Number.isFinite(1);        // true,数值1是有穷,即非无穷
    Number.isFinite(Infinity); // false,Infinity表示无穷大的特殊值
    Number.isFinite('abc');    // false
  Number.parseInt()   解析字符串,返回整数     [等价于 window.parseInt()] 
  Number.parseFloat() 解析字符串,并返回浮点数 [等价于 window.parseFloat()] 
  ◆新特性:
  Number.isInteger()  判断是否是整数
    PS:JS内部对整数和浮点数采用一样的存储方式,小数点后都是0的浮点数,会被认为是整数
    Number.isInteger(3.2);  // false
    Number.isInteger(3);    // true
    Number.isInteger(3.0);  // true
    Number.isInteger(3.00); // true
  Number.EPSILON 常量,定义一个极小的数值
    PS:Number.EPSILON 的出现是用来判断浮点数的计算误差,
      若浮点数计算得到的误差不超过Number.EPSILON 的值,就表示可以接受这样的误差。
    console.log(Number.EPSILON); // 2.220446049250313e-16
    2.220446049250313e-16 是一个极小的数值,约等于 0.00000000000000022204
  Number.isSafeInteger() 判断是否为安全整数
    Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER 安全整数
    ES6为引入了安全整数的概念。
    原来JavaScript能够准确表示的整数范围在 -2^53 到 2^53 之间,
    超过这个范围,无法精确表示这个值。故称之为不安全。
    为此,ES6定义了两个常量来表示这个范围的最大值和最小值:
    Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER
    此外,若给你一个数值,你不知道它是否超出了这个安全范围,
    可以使用ES6给我们新增的一个函数 Number.isSafeInteger 来进行判断
    Number.isSafeInteger(Number.MAX_SAFE_INTEGER);   // true
    Number.isSafeInteger(Number.MAX_SAFE_INTEGER+1); // false
String 字符串扩展 
  `a${1+2}b` 模版字符串 
    PS:又称多行字符串,可以跨越多行,使用反引号引起来,如 `字符`
    Example:
      var str =`a
        b
        c`;
      console.log(str);
      // "a
      //   b
      //   c"
    `${}` 模板占位符 
      ${str1}表示变量字符串str1表示的字符
      ${}中可以放任意的javascript表达式
      var aoo = "fan";
      var boo = `${aoo} hello!`; 
      var coo = `${1+2} hello`;
      console.log(boo,coo); // fan hello   3 hello
  var rstStr = str.repeat(num) 将字符串重复N次并返回[不影响目标字符串]
    var aoo = "1";  //目标字符串
    console.log(aoo); // 1
    var boo = aoo.repeat(3); //变量aoo被重复三次；
    console.log(boo); // 111
  str1.includes(str2); 返回是否包含str2的布尔值  
    'good'.includes('o') // true
  str1.startsWith(str2[,num]) 判断str2是否为str1指定的开头位置,
    num可选,默认为0,表示指定的开头
    var aoo = "123";      //目标字符串
    aoo.startsWith('1');  //true,出现在开头位置
    aoo.startsWith('2');  //false,不是在开头位置
    aoo.startsWith('2',1); //true,从第2个字符开始
  str1.endsWith(str2[,num])   判断str2是否出现在str1指定长度的尾部位置
    num可选,默认为str1的长度
    var name = "123456";    //目标字符串
    name.endsWith('1');   //false,不在尾部位置
    name.endsWith('6');   //true,在尾部位置
    name.endsWith('6',5); //false,只针对前5个字符
    name.endsWith('5',5); //true,针对前6个字符
  str.codePointAt()  返回4字节字符对应的十进制数
    PS:JS 中,一个字符固定为2个字节,
      对于那些需要4个字节存储的字符,JS 会认为它是两个字符,此时它的字符长度length为2。
      如字符:"𠮷",就是一个需要4个字节存储,length为2的字符。
      对于4字节的字符,JS无法正确读取字符
    Example:
      var str1 = "前端";
      var str2 = "𠮷";
      str1.length; //length为2
      str2.length; //length为2
      str1.charAt(0);  //前
      str1.charAt(1);  //端
      str2.charAt(0);  //'�'
      str2.charAt(1);  //'�'
      字符"𠮷"是一个4字节的字符,charAt方法能正确读取字符串str1的字符,
      但无法正确读取4个字节的字符,此时返回结果出现了乱码。
      使用ES6给我们提供的 codePointAt方法,就可以处理这种4个字节的字符了
      var str = "𠮷";
      str.codePointAt();  //结果:134071
      返回其码点的十进制数:134071,换成16进制就是20bb7,对应的Unicode编码则是\u20bb7
  String.fromCodePoint(num)  函数的参数是一个字符对应的码点,返回的结果就是对应的字符
    PS:即使4字节的字符,也能正确实现
    String.fromCodePoint(134071); //结果:"𠮷"
  String.raw()  返回字符串最原始的样貌,即使字符串中含有转义符 
    console.log(`hello\tworld`); // hello world
    \t会被识别为制表符,实现空格效果
    console.log(String.raw`hello\twolrd`); //输出:hello\twolrd
Array 数组扩展 
  ◆静态方法
  Array.of();  将一组值,转换成数组 
    PS:Array.of() 函数的出现是源于Array构造函数的缺陷
    Array.of(1,2,3,4,5); // [1,2,3,4,5]
  Array.from( ) 将类似数组的对象或者可遍历的对象转换成真正的数组 
    PS:最常见的类数组对象就是调用getElementsByTagName方法得到的结果
    let ele = document.getElementsByTagName('a');
    ele instanceof Array;  // false,非数组
    ele instanceof Object; // true,对象
    Array.from(ele) instanceof Array; // true,数组
    Example:将字符串分割成数组
      let str = 'hello';
      Array.from(str); // ["h", "e", "l", "l", "o"]
  ◆实例方法
  arr.find(foo)      返回数组中符合条件的第一个元素 
    foo 参数分别为数组中的每个元素
      每个元素都会进入函数执行,直到结果为true,find函数就会返回该元素的值;
      倘若所有元素都不符合匿名函数的条件,最终返回undefind
    let arr = [1,2,3,4,5,6];
    var aoo = arr.find(function(value){ return value > 2; });
    console.log(aoo); // 3
    
    let arr = [1,2,3,4,5,6];
    arr.find(function(value){ return value > 7; }); // undefined
  arr.findIndex(foo) 返回数组中符合条件的第一个元素的位置
    若所有元素都不符合匿名函数的条件,函数返回-1
    let arr = [7,8,9,10];
    arr.findIndex(function(value){ return value > 8; }); // 2
  arr.fill(val[,beginIndex,endIndex]) 返回一个用指定的值,覆盖数组中的元素的新数组
    let arr = [1,2,3];
    arr.fill(4); // [4,4,4]
    
    let arr = [1,2,3];
    arr.fill(4,1,3); // [1,4,4],从位置2到到位置4被覆盖
  arr.entries() 对数组的键值对进行遍历,返回一个遍历器,可以用for..of 对其进行遍历
    for..of 也是ES6的新增特性 
    for(let [i,v] of ['a', 'b'].entries()) {
      console.log(i,v);
    }
    //0 "a"
    //1 "b"
    用 entries() 函数返回的一个遍历器,用for...of进行遍历,
    能得到数组的键值:0 和 1,以及对应的数组元素:‘a‘和’b‘
  arr.keys() 对数组的索引键进行遍历,返回一个遍历器 
    for(let index of ['a', 'b'].keys()) {
      console.log(index);
    }
    //0
    //1
  arr.values()  对数组的元素进行遍历,返回一个遍历器。
    for(let value of ['a', 'b'].values()) {
      console.log(value);
    }
    //a
    //b
  数组推导:用简洁的写法,直接通过现有的数组生成新数组
    Example: 将数组的每个元素乘以2,得到一个新数组
    传统的实现方法:
    var arr1 = [1,2,3,4];
    var arr2 = [];
    for(let i=0;i<arr1.length;i++){
      arr2.push(arr1[i]*2); //每个元素乘以2后,push到数组arr2
    }
    console.log(arr2); // [2,4,6,8]
    
    var arr1 = [1, 2, 3, 4];
    var arr2 = [for(i of arr1) i * 2];
    console.log(arr2); // [ 2, 4, 6, 8 ]
    
    在数组推导中,for..of 后面还可以加上if语句
    var array1 = [1, 2, 3, 4];
    var array2 = [for(i of array1)  if(i>3) i];
    console.log(array2); //  [4]
Object 对象扩展 
  属性的简写
    var name = "Zhangsan";
    var age = 12;
    //传统的属性写法
    var person = {
      "name":name,
      "age":age
    };
    console.log(person); // {name: "Zhangsan", age: 12}
    //ES6的简洁写法
    var person = {name,age};
    console.log(person); // {name: "Zhangsan", age: 12}
  方法的简写
    //传统的表示法
    var person = {
      say:function(){
        alert('这是传统的表示法');
      }
    };
    //ES6的表示法
    var person = {
      say(){
        alert('这是ES6的表示法');
      }
    };
  属性名可以是表达式 
    PS:用字面量定义一个对象的时候,可以用表达式作为对象的属性名或者方法名
      不可使用 点. 方式来获取
    var f = "first";
    var n = "Name";
    var s = "say";
    var h = "Hello";
    var person = {
      [ f+n ] : "Zhang",
      [ s+h ](){
        return "你好吗？";
      },
      [f] : 1
    };
    console.log(person.firstName); // Zhang
    console.log(person.sayHello()); // 你好吗？
    console.log(person[f]); // 1
    console.log(person.f); // undefined
    
    var aoo = 'boo';
    var obj = {};
    obj[aoo] = 1;
    obj['aoo'] = 2;
    console.log(obj); // Object {boo: 1, aoo: 2}
  ◆新增的函数
  Object.is() 比较两个值是否严格相等,或者说全等
    var str = '12';
    var num = 12;
    var num2 = 12;
    Object.is(str,num);  // false
    Object.is(num2,num); // true
  Object.assign() 将源对象的属性赋值到目标对象上 
    PS:参数可以是多个[至少是两个]
    let origin = {"b":2,"c":3}; //这个充当源对象
    let target = {"a":1};       //这个充当目标对象
    Object.assign(target,origin);
    console.log(target); // {a: 1, b: 2, c: 3}
    
    若赋值过程中,对象的属性出现了相同的名字,则后面的属性值就会覆盖前面的属性值
    let target = {"a":1};
    let origin1 = {"a":2};
    let origin2 = {"a":3};
    Object.assign(target,origin1,origin2);
    console.log(target); //  {a: 3}
  Object.getPrototypeOf() 获取对象的prototype属性
    function Person(){ //自定义一个Person类（函数）
    } 
    Person.prototype = { //函数都有一个预属性prototype对象
      //给prototype对象添加一个say方法
      say(){
        console.log('hello');
      }
    };
    let allen = new Person(); //实例化Person对象,赋值给变量allen
    allen.say(); // hello,调用类的say方法
    Object.getPrototypeOf(allen); //{say:function(){.....}}
    // 获取allen对象的prototype属性
  Object.setPrototypeOf() 设置对象的prototype属性
    function Person(){ }
    Person.prototype = {
      say(){
        console.log('hello');
      }
    };
    let allen = new Person();
    allen.say(); // hello
    Object.setPrototypeOf( allen, {
      say(){
        console.log('hi')
      } 
    });
    allen.say(); // hi
    javascript的面向对象
      Javascript本身不是一种面向对象的编程语言,
      在ES5中,它的语法中也没有class（类的关键字）,
      但是,开发者可以利用对象的原型prototype属性来模拟面向对象进行编程开发。
      function Dog(name){ //构造函数模拟创建一个Dog类
        this.name = name;
      }
      Dog.prototype = { //把一些属性和方法,定义在prototype对象上
        "type":"动物",
        "say":function(){
          alert("名字叫"+this.name);
        }
      };
      var dog = new Dog('旺财'); //实例化
      //调用say方法
      dog.say(); // 名字叫旺财
      模拟面向对象编程有几个关键步骤:
      1、构造函数；
      2、给prototype对象添加属性和方法；
      3、实例化；
      4、通过实例化后的对象调用类的方法或者属性。
      注意:面向对象是一种编程思想,并不是具体的工具。
Function 函数扩展 
  参数的默认值
    传统的实现方式
      function person(n,a){
        var name = n || 'Zhangsan';
        var age  = a ||  25;
      }
    ES6实现
      function person(name = 'Zhangsan',age = 25){
        console.log(name,age);
      }
      person();//结果:Zhangsan  25
      person('Lisi',18);//结果:Lisi  18
    只有当传入的参数为undefined,才会触发默认值赋值
      function person(age = 12){
        console.log(age);
      }
      person();          // 12
      person(undefined); // 12
      person(0);         // 0
      person(null);      // null
    函数的参数是默认声明的,不能再次声明,否则会报错的
      function person(age = 12){
        var age = 25;//错误,再次声明age
        let age = 25;//错误,再次声明age
      }
      person();
    默认参数:在定义函数时,可先将将参数赋值 [ES6+]
      function foo(b,c=3){ 
        console.log(b,c); 
      }
      foo();           //undefined 3
      foo(1);          //1 3,当未传参时默认参数
      foo(1,4);        //1 4,当传入参数时则使用传入的值
      foo(1,c=5);      //1 5
  ...aoo  restArgument,获取函数剩下部分的参数,类型为数组
    在实参中,除了指定参数以外,剩余的参数都会被...values获取到
      function sum(result,...values){ //求和函数,得到的结果赋值到result 
        console.log(values); // [1,2,3,4]
        values.forEach(function (v,i) { //进行求和
          result += v; //求和得到的结果存到result
        });
        console.log(result); // 10
      }
      var res = 0; // 存储求和结果的变量res
      sum(res,1,2,3,4);  //调用sum函数
    rest参数必须是函数的最后一个参数,后面不能再跟其他参数
      //错误写法
      function sum(result, ...values, mult){
        //rest参数...values后面还有一个参数mult
      }
      //正确的写法
      function sum(result, mult, ...values){
        //rest参数...values放在最后
      }
  (arg1,arg2) =>{语句}  箭头函数 
    PS: 箭头函数没有'arguments'对象,若要多参数,则需用'...'扩展符
    相当于: function(参数1,参数2){ return 语句 }
    传入多个参数使用括号(),复杂操作使用{}
      若参数超过1个的话,需要用小括号（）括起来,
      函数体语句超过1条的时候,需要用大括号{ }括起来。
      var sum = (a,b) => {return a+b}
      sum(1,2);//结果:3
    箭头函数中的this指向的是定义时的this,而非执行时的this 
      var obj = {  //定义一个对象
        x:100,     //属性x
        show(){
          setTimeout( function(){   //延迟500毫秒,输出x的值
            //匿名函数
            console.log(this.x);
          }, 500 );
        }
      };
      obj.show(); // undefined
      当代码执行到了 setTimeout() 时,此时的this已经变成了window对象
      [setTimeout是window对象的方法],已经不再是obj对象了,
      所以用 this.x 获取的时候,获取的不是 obj.x 的值,而是 window.x 的值
      
      var obj = {
        x:100, 
        show(){
          setTimeout( () => {   // 箭头函数
            console.log(this.x);
          }, 500 );
        }
      };
      obj.show(); // 100
      定义 obj.show() 方法时,此时的this是指的obj,所以 this.x 指的是 obj.x。
      而在 show() 被调用时,this依然指向的是被定义时候所指向的对象obj;
Math   对象扩展 
  PS: ES6给Math对象新增了共17个函数
  Math.trunc()  去除一个数的小数部分,返回整数部分。
    PS:若传入的参数是整数,就直接返回整数,若是小数,就去除了小数部分,返回整数部分
    Math.trunc(3);   // 3
    Math.trunc(3.1); // 3
  Math.sign()   判断一个值到底是正数、负数、零还是NaN
    参数若是正数,结果返回1；
    若是负数,结果返回-1；
    若是0,结果返回0；
    若是一个非数值类型的参数,结果返回:NaN。
    Math.sign(3); //结果:1
    Math.sign(-3); //结果:-1
    Math.sign(0); //结果:0
    Math.sign('abc'); //结果:NaN
  Math.cbrt()   计算一个数的立方根
    Math.cbrt(8);  //2
    Math.cbrt(27); //3
  Math.acosh(x) 返回 x 的反双曲余弦。
  Math.asinh(x) 返回 x 的反双曲正弦。
  Math.atanh(x) 返回 x 的反双曲正切。
  Math.clz32(x) 返回 x 的 32 位二进制整数表示形式的前导 0 的个数。
  Math.sinh(x)  返回x的双曲正弦。
  Math.cosh(x)  返回 x 的双曲余弦。
  Math.expm1(x) 返回 eˆx - 1。
  Math.fround(x) 返回 x 的单精度浮点数形式。
  Math.hypot(...values) 返回所有参数的平方和的平方根。
  Math.imul(x, y) 返回两个参数以 32 位整数形式相乘的结果。
  Math.log1p(x)   返回 1 + x 的自然对数。
  Math.log10(x)   返回以 10 为底的x的对数。
  Math.log2(x)    返回以 2 为底的 x 的对数。
  Math.tanh(x)    返回 x 的双曲正切。
RegExp 正则扩展 
  RegExp构造函数
    在ES5中,RegExp构造函数的参数有两种情况。
    第一种情况是,参数是字符串,这时第二个参数表示正则表达式的修饰符(flag)。
    var regex = new RegExp('xyz', 'i');
    // 等价于
    var regex = /xyz/i;
    第二种情况是,参数是一个正则表示式,这时会返回一个原有正则表达式的拷贝。
    var regex = new RegExp(/xyz/i);
    // 等价于
    var regex = /xyz/i;
    但是,ES5不允许此时使用第二个参数,添加修饰符,否则会报错。
    var regex = new RegExp(/xyz/, 'i');
    // Uncaught TypeError: Cannot supply flags when constructing one RegExp from another
    ES6改变了这种行为。若RegExp构造函数第一个参数是一个正则对象,
    那么可以使用第二个参数指定修饰符。
    而且,返回的正则表达式会忽略原有的正则表达式的修饰符,只使用新指定的修饰符。
    new RegExp(/abc/ig, 'i').flags // "i"
    上面代码中,原有正则对象的修饰符是ig,它会被第二个参数i覆盖。
  字符串的正则方法
    字符串对象共有4个方法,可以使用正则表达式:match()、replace()、search()和split()。
    ES6将这4个方法,在语言内部全部调用RegExp的实例方法,
    从而做到所有与正则相关的方法,全都定义在RegExp对象上。
    String.prototype.match 调用 RegExp.prototype[Symbol.match]
    String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
    String.prototype.search 调用 RegExp.prototype[Symbol.search]
    String.prototype.split 调用 RegExp.prototype[Symbol.split]
  u修饰符
    ES6对正则表达式添加了u修饰符,含义为“Unicode模式”,
    用来正确处理大于\uFFFF的Unicode字符。
    也就是说,会正确处理四个字节的UTF-16 编码。
    /^\uD83D/u.test('\uD83D\uDC2A')
    // false
    /^\uD83D/.test('\uD83D\uDC2A')
    // true
    上面代码中,\uD83D\uDC2A是一个四个字节的UTF-16 编码,代表一个字符。
    ES5不支持四个字节的UTF-16 编码,会将其识别为两个字符,导致第二行代码结果为true。
    加了u修饰符以后,ES6就会识别其为一个字符,所以第一行代码结果为false。
    一旦加上u修饰符号,就会修改下面这些正则表达式的行为。
    (1)点字符
      点(.)字符在正则表达式中,含义是除了换行符以外的任意单个字符。
      对于码点大于0xFFFF的Unicode字符,点字符不能识别,必须加上u修饰符。
      var s = '𠮷';
      /^.$/.test(s) // false
      /^.$/u.test(s) // true
      上面代码表示,若不添加u修饰符,正则表达式就会认为字符串为两个字符,从而匹配失败。
    (2)Unicode字符表示法
      ES6新增了使用大括号表示Unicode字符,这种表示法在正则表达式中必须加上u修饰符,才能识别。
      /\u{61}/.test('a') // false
      /\u{61}/u.test('a') // true
      /\u{20BB7}/u.test('𠮷') // true
      上面代码表示,若不加u修饰符,正则表达式无法识别\u{61}这种表示法,只会认为这匹配61个连续的u。
    (3)量词
      使用u修饰符后,所有量词都会正确识别码点大于0xFFFF的Unicode字符。

      /a{2}/.test('aa') // true
      /a{2}/u.test('aa') // true
      /𠮷{2}/.test('𠮷𠮷') // false
      /𠮷{2}/u.test('𠮷𠮷') // true
      另外,只有在使用u修饰符的情况下,Unicode表达式当中的大括号才会被正确解读,否则会被解读为量词。

      /^\u{3}$/.test('uuu') // true
      上面代码中,由于正则表达式没有u修饰符,所以大括号被解读为量词。加上u修饰符,就会被解读为Unicode表达式。
    (4)预定义模式
      u修饰符也影响到预定义模式,能否正确识别码点大于0xFFFF的Unicode字符。

      /^\S$/.test('𠮷') // false
      /^\S$/u.test('𠮷') // true
      上面代码的\S是预定义模式,匹配所有不是空格的字符。只有加了u修饰符,它才能正确匹配码点大于0xFFFF的Unicode字符。

      利用这一点,可以写出一个正确返回字符串长度的函数。

      function codePointLength(text) {
        var result = text.match(/[\s\S]/gu);
        return result ? result.length : 0;
      }
      var s = '𠮷𠮷';
      s.length // 4
      codePointLength(s) // 2
    (5)i修饰符

      有些Unicode字符的编码不同,但是字型很相近,比如,\u004B与\u212A都是大写的K。

      /[a-z]/i.test('\u212A') // false
      /[a-z]/iu.test('\u212A') // true
      上面代码中,不加u修饰符,就无法识别非规范的K字符。
  y 修饰符
    除了u修饰符,ES6还为正则表达式添加了y修饰符,叫做“粘连”(sticky)修饰符。
    y修饰符的作用与g修饰符类似,也是全局匹配,后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于,g修饰符只要剩余位置中存在匹配就可,而y修饰符确保匹配必须从剩余的第一个位置开始,这也就是“粘连”的涵义。
    var s = 'aaa_aa_a';
    var r1 = /a+/g;
    var r2 = /a+/y;

    r1.exec(s) // ["aaa"]
    r2.exec(s) // ["aaa"]

    r1.exec(s) // ["aa"]
    r2.exec(s) // null
    上面代码有两个正则表达式,一个使用g修饰符,另一个使用y修饰符。这两个正则表达式各执行了两次,第一次执行的时候,两者行为相同,剩余字符串都是_aa_a。由于g修饰没有位置要求,所以第二次执行会返回结果,而y修饰符要求匹配必须从头部开始,所以返回null。
    若改一下正则表达式,保证每次都能头部匹配,y修饰符就会返回结果了。
    var s = 'aaa_aa_a';
    var r = /a+_/y;

    r.exec(s) // ["aaa_"]
    r.exec(s) // ["aa_"]
    上面代码每次匹配,都是从剩余字符串的头部开始。
    使用lastIndex属性,可以更好地说明y修饰符。

    const REGEX = /a/g;

    // 指定从2号位置(y)开始匹配
    REGEX.lastIndex = 2;

    // 匹配成功
    const match = REGEX.exec('xaya');

    // 在3号位置匹配成功
    match.index // 3

    // 下一次匹配从4号位开始
    REGEX.lastIndex // 4

    // 4号位开始匹配失败
    REGEX.exec('xaxa') // null
    上面代码中,lastIndex属性指定每次搜索的开始位置,g修饰符从这个位置开始向后搜索,直到发现匹配为止。

    y修饰符同样遵守lastIndex属性,但是要求必须在lastIndex指定的位置发现匹配。

    const REGEX = /a/y;

    // 指定从2号位置开始匹配
    REGEX.lastIndex = 2;

    // 不是粘连,匹配失败
    REGEX.exec('xaya') // null

    // 指定从3号位置开始匹配
    REGEX.lastIndex = 3;

    // 3号位置是粘连,匹配成功
    const match = REGEX.exec('xaxa');
    match.index // 3
    REGEX.lastIndex // 4
    进一步说,y修饰符号隐含了头部匹配的标志^。

    /b/y.exec('aba')
    // null
    上面代码由于不能保证头部匹配,所以返回null。y修饰符的设计本意,就是让头部匹配的标志^在全局匹配中都有效。

    在split方法中使用y修饰符,原字符串必须以分隔符开头。这也意味着,只要匹配成功,数组的第一个成员肯定是空字符串。

    // 没有找到匹配
    'x##'.split(/#/y)
    // [ 'x##' ]

    // 找到两个匹配
    '##x'.split(/#/y)
    // [ '', '', 'x' ]
    后续的分隔符只有紧跟前面的分隔符,才会被识别。

    '#x#'.split(/#/y)
    // [ '', 'x#' ]

    '##'.split(/#/y)
    // [ '', '', '' ]
    下面是字符串对象的replace方法的例子。

    const REGEX = /a/gy;
    'aaxa'.replace(REGEX, '-') // '--xa'
    上面代码中,最后一个a因为不是出现下一次匹配的头部,所以不会被替换。

    单单一个y修饰符对match方法,只能返回第一个匹配,必须与g修饰符联用,才能返回所有匹配。

    'a1a2a3'.match(/a\d/y) // ["a1"]
    'a1a2a3'.match(/a\d/gy) // ["a1", "a2", "a3"]
    y修饰符的一个应用,是从字符串提取token(词元),y修饰符确保了匹配之间不会有漏掉的字符。

    const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
    const TOKEN_G  = /\s*(\+|[0-9]+)\s*/g;

    tokenize(TOKEN_Y, '3 + 4')
    // [ '3', '+', '4' ]
    tokenize(TOKEN_G, '3 + 4')
    // [ '3', '+', '4' ]

    function tokenize(TOKEN_REGEX, str) {
      let result = [];
      let match;
      while (match = TOKEN_REGEX.exec(str)) {
        result.push(match[1]);
      }
      return result;
    }
    上面代码中,若字符串里面没有非法字符,y修饰符与g修饰符的提取结果是一样的。但是,一旦出现非法字符,两者的行为就不一样了。

    tokenize(TOKEN_Y, '3x + 4')
    // [ '3' ]
    tokenize(TOKEN_G, '3x + 4')
    // [ '3', '+', '4' ]
    上面代码中,g修饰符会忽略非法字符,而y修饰符不会,这样就很容易发现错误。

    sticky属性
    与y修饰符相匹配,ES6的正则对象多了sticky属性,表示是否设置了y修饰符。

    var r = /hello\d/y;
    r.sticky // true
    flags属性
    ES6为正则表达式新增了flags属性,会返回正则表达式的修饰符。

    // ES5的source属性
    // 返回正则表达式的正文
    /abc/ig.source
    // "abc"

    // ES6的flags属性
    // 返回正则表达式的修饰符
    /abc/ig.flags
    // 'gi'
    RegExp.escape()
    字符串必须转义,才能作为正则模式。

    function escapeRegExp(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    }

    let str = '/path/to/resource.html?search=query';
    escapeRegExp(str)
    // "\/path\/to\/resource\.html\?search=query"
    上面代码中,str是一个正常字符串,必须使用反斜杠对其中的特殊字符转义,才能用来作为一个正则匹配的模式。

    已经有提议将这个需求标准化,作为RegExp对象的静态方法RegExp.escape(),放入ES7。
    2015 年7月,TC39认为,该方法有安全风险,又不愿这个方法变得过于复杂,没有同意将其列入ES7,但这不失为一个真实的需求。

    RegExp.escape('The Quick Brown Fox');
    // "The Quick Brown Fox"

    RegExp.escape('Buy it. use it. break it. fix it.');
    // "Buy it\. use it\. break it\. fix it\."

    RegExp.escape('(*.*)');
    // "\(\*\.\*\)"
    字符串转义以后,可以使用RegExp构造函数生成正则模式。

    var str = 'hello. how are you?';
    var regex = new RegExp(RegExp.escape(str), 'g');
    assert.equal(String(regex), '/hello\. how are you\?/g');
    目前,该方法可以用上文的escapeRegExp函数或者垫片模块regexp.escape实现。

    var escape = require('regexp.escape');
    escape('hi. how are you?');
    // "hi\\. how are you\\?"
  s 修饰符:dotAll 模式
    正则表达式中,点(.)是一个特殊字符,代表任意的单个字符,但是行终止符(line terminator character)除外。

    以下四个字符属于”行终止符“。

    U+000A 换行符(\n)
    U+000D 回车符(\r)
    U+2028 行分隔符(line separator)
    U+2029 段分隔符(paragraph separator)
    /foo.bar/.test('foo\nbar')
    // false
    上面代码中,因为.不匹配\n,所以正则表达式返回false。

    但是,很多时候我们希望匹配的是任意单个字符,这时有一种变通的写法。

    /foo[^]bar/.test('foo\nbar')
    // true
    这种解决方案毕竟不太符合直觉,所以现在有一个提案,引入/s修饰符,使得.可以匹配任意单个字符。

    /foo.bar/s.test('foo\nbar') // true
    这被称为dotAll模式,即点(dot)代表一切字符。所以,正则表达式还引入了一个dotAll属性,返回一个布尔值,表示该正则表达式是否处在dotAll模式。

    const re = /foo.bar/s;
    // 另一种写法
    // const re = new RegExp('foo.bar', 's');

    re.test('foo\nbar') // true
    re.dotAll // true
    re.flags // 's'
    /s修饰符和多行修饰符/m不冲突,两者一起使用的情况下,.匹配所有字符,而^和$匹配每一行的行首和行尾。
  后行断言
    JavaScript 语言的正则表达式,只支持先行断言(lookahead)和先行否定断言(negative lookahead),不支持后行断言(lookbehind)和后行否定断言(negative lookbehind)。

    目前,有一个提案,引入后行断言。V8 引擎4.9版已经支持,Chrome 浏览器49版打开”experimental JavaScript features“开关(地址栏键入about:flags),就可以使用这项功能。

    ”先行断言“指的是,x只有在y前面才匹配,必须写成/x(?=y)/。比如,只匹配百分号之前的数字,要写成/\d+(?=%)/。”先行否定断言“指的是,x只有不在y前面才匹配,必须写成/x(?!y)/。比如,只匹配不在百分号之前的数字,要写成/\d+(?!%)/。

    /\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]
    /\d+(?!%)/.exec('that’s all 44 of them')                 // ["44"]
    上面两个字符串,若互换正则表达式,就会匹配失败。另外,还可以看到,”先行断言“括号之中的部分((?=%)),是不计入返回结果的。

    “后行断言”正好与“先行断言”相反,x只有在y后面才匹配,必须写成/(?<=y)x/。比如,只匹配美元符号之后的数字,要写成/(?<=\$)\d+/。”后行否定断言“则与”先行否定断言“相反,x只有不在y后面才匹配,必须写成/(?<!y)x/。比如,只匹配不在美元符号后面的数字,要写成/(?<!\$)\d+/。

    /(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')  // ["100"]
    /(?<!\$)\d+/.exec('it’s is worth about €90')                // ["90"]
    上面的例子中,“后行断言”的括号之中的部分((?<=\$)),也是不计入返回结果。

    “后行断言”的实现,需要先匹配/(?<=y)x/的x,然后再回到左边,匹配y的部分。这种“先右后左”的执行顺序,与所有其他正则操作相反,导致了一些不符合预期的行为。

    首先,”后行断言“的组匹配,与正常情况下结果是不一样的。

    /(?<=(\d+)(\d+))$/.exec('1053') // ["", "1", "053"]
    /^(\d+)(\d+)$/.exec('1053') // ["1053", "105", "3"]
    上面代码中,需要捕捉两个组匹配。没有"后行断言"时,第一个括号是贪婪模式,第二个括号只能捕获一个字符,所以结果是105和3。而"后行断言"时,由于执行顺序是从右到左,第二个括号是贪婪模式,第一个括号只能捕获一个字符,所以结果是1和053。

    其次,"后行断言"的反斜杠引用,也与通常的顺序相反,必须放在对应的那个括号之前。

    /(?<=(o)d\1)r/.exec('hodor')  // null
    /(?<=\1d(o))r/.exec('hodor')  // ["r", "o"]
    上面代码中,若后行断言的反斜杠引用(\1)放在括号的后面,就不会得到匹配结果,必须放在前面才可以。
  Unicode属性类
    目前,有一个提案,引入了一种新的类的写法\p{...}和\P{...},允许正则表达式匹配符合Unicode某种属性的所有字符。

    const regexGreekSymbol = /\p{Script=Greek}/u;
    regexGreekSymbol.test('π') // u
    上面代码中,\p{Script=Greek}指定匹配一个希腊文字母,所以匹配π成功。

    Unicode属性类要指定属性名和属性值。

    \p{UnicodePropertyName=UnicodePropertyValue}
    对于某些属性,可以只写属性名。

    \p{UnicodePropertyName}
    \P{…}是\p{…}的反向匹配,即匹配不满足条件的字符。

    注意,这两种类只对Unicode有效,所以使用的时候一定要加上u修饰符。若不加u修饰符,正则表达式使用\p和\P会报错,ECMAScript预留了这两个类。

    由于Unicode的各种属性非常多,所以这种新的类的表达能力非常强。

    const regex = /^\p{Decimal_Number}+$/u;
    regex.test('𝟏𝟐𝟑𝟜𝟝𝟞𝟩𝟪𝟫𝟬𝟭𝟮𝟯𝟺𝟻𝟼') // true
    上面代码中,属性类指定匹配所有十进制字符,可以看到各种字型的十进制字符都会匹配成功。

    \p{Number}甚至能匹配罗马数字。

    // 匹配所有数字
    const regex = /^\p{Number}+$/u;
    regex.test('²³¹¼½¾') // true
    regex.test('㉛㉜㉝') // true
    regex.test('ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ') // true
    下面是其他一些例子。

    // 匹配各种文字的所有字母,等同于Unicode版的\w
    [\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]

    // 匹配各种文字的所有非字母的字符,等同于Unicode版的\W
    [^\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]

    // 匹配所有的箭头字符
    const regexArrows = /^\p{Block=Arrows}+$/u;
    regexArrows.test('←↑→↓↔↕↖↗↘↙⇏⇐⇑⇒⇓⇔⇕⇖⇗⇘⇙⇧⇩') // true
'Strings_and_Regular_Expressions'字符串与正则表达式 
  PS:ECMAScript6诞生之前,JS字符串由 16 位编码的字符组成(UTF-16).
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
Symbol 标记,表示独一无二的值[原始数据类型] 
  PS:JS的第七种数据类型,不可变,用来产生唯一的标识 
  创建标记 
    var sym = Symbol([arg])   创建标记 
      PS:Symbol函数前不能使用new命令,否则会报错。
        因为生成的Symbol是一个原始类型的值,不是对象,也不能添加属性
      arg  可选,表示对Symbol实例的描述,可为字符串或对象 
        主要是为了在控制台显示,或者转为字符串时,比较容易区分 
        当参数为对象时,调用该对象的toString方法,将其转为字符串 
          const obj = {
            toString() {
              return 'abc';
            }
          };
          const sym = Symbol(obj);
          sym // Symbol(abc)
      参数只是表示对当前Symbol值的描述,相同参数创建的Symbol是不相等的 
        var s1 = Symbol();
        var s2 = Symbol();
        s1 === s2 // false
        var s3 = Symbol('foo');
        var s4 = Symbol('foo');
        s3 === s4 // false
      Example:
        var sym1 = Symbol("aoo");
        var sym2 = Symbol();
        var str1 = sym1.toString();
        var str2 = sym2.toString();
        console.log(sym1,sym2);   // Symbol(aoo) Symbol()
        console.log(str1,str2);   // Symbol(aoo) Symbol()
        console.log(typeof sym1); // symbol
    var sym =   Symbol.for(str) 根据参数在全局环境中搜索该symbol,有则返回,无则创建 
      PS:Symbol.for()创建的值会被登记在全局环境中,供以后用 Symbol.for() 来搜索,
        可在不同的 iframe 或 service worker 中取到同一个值;
        Symbol() 创建的symbol值不会被登记在全局环境中
      let sym1 = Symbol.for('name');
      let sym2 = Symbol.for('name');
      console.log(sym1 === sym2); // true
      
      Symbol( )创建的symbol值,用 Symbol.for() 搜索不到 
      let sym1 = Symbol('name'); // 不会被登记在全局环境中
      let sym2 = Symbol.for('name');
      console.log(sym1 === sym2);  // false
    var symObj = Object(sym)  通过sym创建
      var sym = Symbol("foo");
      typeof sym;     // "symbol"
      var symObj = Object(sym);
      typeof symObj;  // "object"
  显式转为字符串或布尔值,但不能转为数值 
    var sym1 = Symbol('My symbol');
    String(sym1) // 'Symbol(My symbol)'
    sym1.toString() // 'Symbol(My symbol)'
    var sym2 = Symbol();
    Boolean(sym2) // true
    !sym2  // false
    if (sym2) {
      // ...
    }
    Number(sym2) // TypeError
    sym2 + 2 // TypeError
  不能与其他类型的值进行运算 
    var sym = Symbol('My symbol');
    "your symbol is " + sym  // TypeError: can't convert symbol to string
    `your symbol is ${sym}`  // TypeError: can't convert symbol to string
  定义常量 
    var sym1 = Symbol('sm');
    var sym2 = Symbol('sm');
    console.log(sym1==sym2,sym1===sym2); // false false
  作为属性名使用 
    PS:对象的属性名现在可以有两种类型,一种是原来就有的字符串,另一种就是新增的Symbol类型 
      凡是属性名属于Symbol类型,就都是独一无二的,可以保证不会与其他属性名产生冲突 
    Example:
      let name = Symbol();
      let age = '年龄'
      let person = {
        [name]:"张三",
        [age] : 15
      };
      
      var mySymbol = Symbol();
      var a = {};
      // 第一种写法
      a[mySymbol] = 'Hello!';
      // 第二种写法
      var a = {
        [mySymbol]: 'Hello!'
      };
      // 第三种写法
      Object.defineProperty(a, mySymbol, { value: 'Hello!' });
      // 以上写法都得到同样结果
      a[mySymbol] // "Hello!"
    Symbol值作为对象属性名时,不能用点运算符。
      var mySymbol = Symbol();
      var a = {};
      a.mySymbol = 'Hello!';
      a[mySymbol] // undefined
      a['mySymbol'] // "Hello!"
      因为点运算符后面总是字符串,所以不会读取mySymbol作为标识名所指代的那个值,
      导致a的属性名实际上是一个字符串,而不是一个Symbol值
    Symbol类型属性名的特点 
      不会出现在'for...in'和'for...of'中
      不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify() 返回
      Example:
        let name = Symbol();
        let person = {
          [name]:"张三",  //symbol类型
          "age":12        //string类型
        };
        Object.keys(person); // ["age"]
        for(let key in person){
          console.log(key); // age
        }
    Object.getOwnPropertySymbols(obj)  获取对象的Symbol类型的属性
      找到symbol类型的属性并且返回一个数组,数组的成员就是symbol类型的属性值
      let name = Symbol("name");
      let age = Symbol("age");
      let person = {
        [name]:"张三", 
        [age]:12       
      };
      Object.getOwnPropertySymbols(person); // (2) [Symbol(name), Symbol(age)]
    Reflect.ownKeys(obj)   获取对象所有类型的属性[包括symbol类型]
      let person = {
        [Symbol('name')]:"张三",
        "age": 21
      };
      Reflect.ownKeys(person); // (2) ["age", Symbol(name)]
  ◆静态属性&方法 
    PS:ES6提供了11个内置的Symbol值,指向语言内部使用的方法 
  Symbol.keyFor(sym) 返回登记在全局环境中的symbol值的key,否则返回undefined
    PS:“被登记在全局环境中”,即该symbol值是被 Symbol.for()创建的,而非 Symbol();
    let sym1 = Symbol.for('aoo');
    let sym2 = Symbol('aoo');
    Symbol.KeyFor(sym1); // aoo
    Symbol.KeyFor(sym2); // undefined
  Symbol.hasInstance  对象使用instanceof运算符时,调用的方法 
    Example:
      foo instanceof Foo 在语言内部,实际调用的是 Foo[Symbol.hasInstance](foo) 
      class MyClass {
        [Symbol.hasInstance](foo) {
          return foo instanceof Array;
        }
      }
      [1, 2, 3] instanceof new MyClass() // true
      该实例的 Symbol.hasInstance 方法,在进行instanceof运算时自动调用,
      判断左侧的运算子是否为Array的实例。
  Symbol.species      对象的该属性指向其构造函数
    创造实例时,默认会调用这个方法,即使用这个属性返回的函数当作构造函数,来创造新的实例对象。
  Symbol.match   当执行str.match(obj)时,若该属性存在,会调用它,返回该方法的返回值 
    String.prototype.match(regexp)
    // 等同于
    regexp[Symbol.match](this)
    
    class MyMatcher {
      [Symbol.match](string) {
        return 'hello world'.indexOf(string);
      }
    }
    'e'.match(new MyMatcher()) // 1
  Symbol.replace  当对象被 String.prototype.replace 方法调用时,会返回该方法的返回值 
    String.prototype.replace(searchValue, replaceValue)
    // 等同于
    searchValue[Symbol.replace](this, replaceValue)
    下面是一个例子。
    const x = {};
    x[Symbol.replace] = (...s) => console.log(s);
    
    'Hello'.replace(x, 'World') // ["Hello", "World"]
    Symbol.replace方法会收到两个参数,第一个参数是replace方法正在作用的对象,上面例子是Hello,第二个参数是替换后的值,上面例子是World。
  Symbol.search   当对象被 String.prototype.search 方法调用时,会返回该方法的返回值。
    String.prototype.search(regexp)
    // 等同于
    regexp[Symbol.search](this)
    
    class MySearch {
      constructor(value) {
        this.value = value;
      }
      [Symbol.search](string) {
        return string.indexOf(this.value);
      }
    }
    'foobar'.search(new MySearch('foo')) // 0
  Symbol.split    当对象被 String.prototype.split 方法调用时,会返回该方法的返回值 
    String.prototype.split(separator, limit)
    // 等同于
    separator[Symbol.split](this, limit)
    下面是一个例子。
    
    class MySplitter {
      constructor(value) {
        this.value = value;
      }
      [Symbol.split](string) {
        var index = string.indexOf(this.value);
        if (index === -1) {
          return string;
        }
        return [
          string.substr(0, index),
          string.substr(index + this.value.length)
        ];
      }
    }
    
    'foobar'.split(new MySplitter('foo'))
    // ['', 'bar']
    
    'foobar'.split(new MySplitter('bar'))
    // ['foo', '']
    
    'foobar'.split(new MySplitter('baz'))
    // 'foobar'
    上面方法使用Symbol.split方法,重新定义了字符串对象的split方法的行为,
  Symbol.iterator 对象的 Symbol.iterator 属性,指向该对象的默认遍历器方法。
    var myIterable = {};
    myIterable[Symbol.iterator] = function* () {
      yield 1;
      yield 2;
      yield 3;
    };
    
    [...myIterable] // [1, 2, 3]
    对象进行for...of循环时,会调用Symbol.iterator方法,返回该对象的默认遍历器,详细介绍参见《Iterator和for...of循环》一章。
    
    class Collection {
      *[Symbol.iterator]() {
        let i = 0;
        while(this[i] !== undefined) {
          yield this[i];
          ++i;
        }
      }
    }
    
    let myCollection = new Collection();
    myCollection[0] = 1;
    myCollection[1] = 2;
    
    for(let value of myCollection) {
      console.log(value);
    }
    // 1
    // 2
  Symbol.toPrimitive 对象的 Symbol.toPrimitive 属性,指向一个方法。
    该对象被转为原始类型的值时,会调用这个方法,返回该对象对应的原始类型值。
    Symbol.toPrimitive 被调用时,会接受一个字符串参数,表示当前运算的模式,一共有三种模式。
    Number:该场合需要转成数值
    String:该场合需要转成字符串
    Default:该场合可以转成数值,也可以转成字符串
    let obj = {
      [Symbol.toPrimitive](hint) {
        switch (hint) {
          case 'number':
          return 123;
          case 'string':
          return 'str';
          case 'default':
          return 'default';
          default:
          throw new Error();
        }
      }
    };
    
    2 * obj // 246
    3 + obj // '3default'
    obj == 'default' // true
    String(obj) // 'str'
    Symbol.toStringTag
    对象的Symbol.toStringTag属性,指向一个方法。在该对象上面调用Object.prototype.toString方法时,若这个属性存在,它的返回值会出现在toString方法返回的字符串之中,表示对象的类型。也就是说,这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串。
    
    // 例一
    ({[Symbol.toStringTag]: 'Foo'}.toString())
    // "[object Foo]"
    
    // 例二
    class Collection {
      get [Symbol.toStringTag]() {
        return 'xxx';
      }
    }
    var x = new Collection();
    Object.prototype.toString.call(x) // "[object xxx]"    
  ES6新增内置对象的 Symbol.toStringTag 属性值如下
    JSON[Symbol.toStringTag]:'JSON'
    Math[Symbol.toStringTag]:'Math'
    Module对象M[Symbol.toStringTag]:'Module'
    ArrayBuffer.prototype[Symbol.toStringTag]:'ArrayBuffer'
    DataView.prototype[Symbol.toStringTag]:'DataView'
    Map.prototype[Symbol.toStringTag]:'Map'
    Promise.prototype[Symbol.toStringTag]:'Promise'
    Set.prototype[Symbol.toStringTag]:'Set'
    %TypedArray%.prototype[Symbol.toStringTag]:'Uint8Array'等
    WeakMap.prototype[Symbol.toStringTag]:'WeakMap'
    WeakSet.prototype[Symbol.toStringTag]:'WeakSet'
    %MapIteratorPrototype%[Symbol.toStringTag]:'Map Iterator'
    %SetIteratorPrototype%[Symbol.toStringTag]:'Set Iterator'
    %StringIteratorPrototype%[Symbol.toStringTag]:'String Iterator'
    Symbol.prototype[Symbol.toStringTag]:'Symbol'
    Generator.prototype[Symbol.toStringTag]:'Generator'
    GeneratorFunction.prototype[Symbol.toStringTag]:'GeneratorFunction'    
Set   集合 
  PS:ES6新增的一种新的数据结构,可以理解为值的集合;
    Set中的元素无重复项[会自动去掉重复的元素];
    Set集合中,key和val为同一个值;
  new Set([arr])  创建set
    var s1 = new Set();  // 创建一个集合
    var s2 = new Set([1,2,3,2,4]); //创建并初始化
    console.log(s2);     // Set {1, 2, 3, 4} , 自动过滤掉了重复的元素
  ◆属性方法
  s.add(val) 添加元素
  s.delete(val) 删除元素,成功返回true,否则为false 
    var s = new Set([1,2,3]);
    console.log(s); // Set {1, 2, 3}
    s.delete(2);    // true
    s.delete(4);    // false
    console.log(s); // Set {1, 3}
  s.clear()     删除所有元素
    var s = new Set([1,2,3]);
    console.log(s); // Set {1, 2, 3}
    s.clear();
    console.log(s); // Set {}
  s.size  返回元素的个数,类型为数值
  s.has(val) 检测元素是否存在,存在返回true,否则返回false
    var s = new Set([1,2,3]);
    s.has(1); // true
    s.has(4); // false
  s.entries() 返回一个键值对的遍历器
    var s = new Set(['a','b','c']);
    var aoo = s.entries(); 
    console.log(aoo); // SetIterator {"a", "b", "c"}
  keys()   返回键名的遍历器
  values() 返回键值的遍历器
    var s = new Set(['a','b','c']);
    var aoo = s.keys();  
    var boo = s.values();
    console.log(aoo); // SetIterator {"a", "b", "c"}
    console.log(boo); // SetIterator {"a", "b", "c"}
  for...of遍历Set结构
    var s = new Set(['a','b','c']);
    for(let [i,v] of s.entries()){
      console.log(i+' '+v);
    }
    // a  a    
    // b  b   
    // c  c   
  s.forEach() 遍历
    var s = new Set(['a','b','c']);
    s.forEach(function(value,key){
      console.log(value,key)
    });
    // a  a
    // b  b
    // c  c
  Set的用途
    实现数组去重
    let arr = [1,2,2,3,4,4,4];  // 目标数组arr,要求去重
    let s = new Set(arr);       // Set {1,2,3,4}
    let newArr = Array.from(s); // [1,2,3,4],完成去重
  WeakSet结构
    PS:WeakSet结构同样不会存储重复的值;
      且其成员必须是对象类型的值[严格来说是:具有 iterable 接口的对象]
      实际上,任何可遍历的对象,都可以作为WeakSet的初始化参数。比如:数组。
    new WeakSet(arr);
      arr 数组,且其成员必须是对象类型的值,否则就会报错
      let ws = new WeakSet([{"age":18}]); // WeakSet {Object {age: 18}}
      let ws = new WeakSet([1,2]); // 报错 ,Invalid value used in weak set
  
      let arr1 = [1];
      let arr2 = [2];
      let ws = new WeakSet([arr1,arr2]); // WeakSet {[1], [2]}
    ws.add()    作用与用法跟Set结构完全一致
    ws.delete() 作用与用法跟Set结构完全一致
    ws.has()    作用与用法跟Set结构完全一致
    WeakSet结构不可遍历
      因为它的成员都是对象的弱引用,随时被回收机制回收,成员消失。
      所以WeakSet结构无keys(),values(),entries(),forEach() 等方法和 size 属性
Map   字典 
  ES5中的key键名的类型要求一定是字符串,ES6已经允许属性名的类型是Symbol
  跟Object对象很像,但其的key键名的类型不再局限于字符串类型了,可为各种类型的值;
  new Map([arr]) 定义Map
    arr  可选,数组
    var mp1 = new Map()
    let mp2 = new Map([
      ["name","aoo"],
      ["gender",1]
    ]);
    console.log(mp2); // Map(2) {"name" => "aoo", "gender" => 1}
  mp.size   获取实例的成员数
    let mp = new Map();
    mp.set(1,3);
    mp.set('1','3');
    mp.size;// 2
  mp.set(key,val) 增加,给实例设置一对键值对,返回map实例
    key可以为各种类型的值
      let mp = new Map();
      mp.set("name","aoo"); // 添加一个string类型的键名
      mp.set(1,2);          // 添加一个数字类型的键名
      console.log(mp); // Map(2) {"name" => "aoo", 1 => 2}
      mp.set([1],2);            // 数组类型的键名
      mp.set({"age":"15"},2);   // 对象类型的键名
      mp.set(true,2);           // 布尔类型的键名
      mp.set(Symbol('name'),2); // Symbol类型的键名
      mp.set(null,2);           // null为键名
      mp.set(undefined,2);      // undefined为键名
      console.log(mp);
      // Map(8) {"name" => "aoo", 1 => 2, [1] => 2, Object {age: "15"} => 2, true => 2…}
    若设置一已经存在的键名,后面的键值会覆盖前面的键值
      let mp = new Map();
      mp.set("aoo","boo");
      console.log(mp);     // Map(1) {"aoo" => "boo"}
      mp.set("aoo","coo"); // 再次设置name的值
      console.log(mp);     // Map(1) {"aoo" => "coo"}
  mp.get(val)     返回指定键名的键值
    获取存在对应的键值,若键值对存在,就会返回键值;否则,返回undefined;
    let mp = new Map([["aoo","boo"]]);
    mp.get("aoo"); // "boo"
    mp.get("coo"); // undefined
  mp.delete(key)  删除指定的键值对,删除成功返回true,否则返回false
    let m = new Map();
    m.set("aoo","boo");
    m.delete("aoo"); // true
    m.delete("coo"); // false
  mp.clear()      一次性删除所有键值对
  mp.has(key)     判断Map实例内是否含有指定的键值对,有返回true,否则返回false
    let mp = new Map();
    mp.set("aoo","boo");
    mp.has('aoo'); // true
    mp.has('coo'); // false
  for...of 遍历Map的键名或者键值
  entries() 返回实例的键值对遍历器
    let m = new Map([
      ["aoo","boo"],
      ["age",25]
    ]);
    for(let [key,value] of m.entries()){
      console.log(key+'  '+value);
    }
    // aoo  boo
    // age  25
  keys()   返回实例所有键名的遍历器
  values() 返回实例所有键值的遍历器
    keys方法和values方法的使用方式一致,只是返回的结果不同。
    let m = new Map([
      ["name","van"],
      ["age",25]
    ]);
    for(let key of m.keys()){  //使用keys方法获取键名
      console.log(key);
    }
    // name
    // age
    for(let value of m.values()){ //使用values方法获取键值
      console.log(value);
    }
    // van
    // 25
  forEach( ) 遍历
    let mp = new Map([
      ["name","van"],
      ["age",25]
    ]);
    mp.forEach(function(value,key){
      console.log(key+':'+value);
    });
    // name:van
    // age:25
  WeakMap结构
    和Map结构很类似,但WeakMap结构的键名只支持引用类型的数据,比:数组,对象,函数等
    let wm = new WeakMap();
    wm.set(key,val)
      key 必须为引用类型数据,普通值类型则不允许[如字符串,数字,null,undefined,布尔类型]
      let wm = new WeakMap();
      wm.set([1],2);            //数组类型的键名
      wm.set({'name':'van'},2); //对象类型的键名
      function fn(){};
      wm.set(fn,2);             //函数类型的键名
      console.log(wm);
      // WeakMap {function => 2, Object {name: "van"} => 2, [1] => 2}
    ws.get()    和Map用法相同
    ws.has()    和Map用法相同
    ws.delete() 和Map用法相同
    WeakMap不支持的属性方法
      clear方法,
      不支持遍历,也就没有了keys、values、entries、forEach这4个方法
      也没有属性size
      理由跟WeakSet结构一样:键名中的引用类型是弱引用,
      你永远不知道这个引用对象什么时候会被垃圾回收机制回收了,
      若这个引用类型的值被垃圾机制回收了,WeakMap实例中的对应键值对也会消失。
Blob  二进制数据的基本对象 
  PS:一个 Blob对象表示一个不可变的,原始数据的类似文件对象 
    Blob表示的数据不一定是一个JavaScript原生格式。 
    File 接口基于Blob,继承 blob功能并将其扩展为支持用户系统上的文件。
    要从用户文件系统上的一个文件中获取一个Blob对象,请参阅 File文档。
    接受Blob对象的APIs也被列在 File 文档中。
  创建blob对象 
    var bb = new Blob(blobParts[, options])  返回创建的Blob对象 
      PS:其内容由参数中给定的数组串联组成 
      blobParts 一个包含实际数据的数组
      options   数据的类型 
      使用其它对象创建一个 Blob 对象
        Example:用字符串构建一个 blob:
        var debug = {hello: "world"};
        var blob = new Blob([JSON.stringify(debug, null, 2)],{type : 'application/json'});
      Example: 利用Blob对象,生成可下载文件 
        var blob = new Blob(["文件内容"]);
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = "文件名.txt";
        a.textContent = "点击下载";
        document.body.appendChild(a);
        最终HTML中显示为: 
        <a href="blob:http://main.lcltst.com/c175b53f-6b0c-43b0-bc63-b942461fb5ef" download="文件名.txt">点击下载</a>  
        点击后提示下载文本文件'文件名.txt',文件内容为'文件内容' 
    blob.slice() 使用blob对象创建blob对象
    通过<input type="file">获取Blob对象 
      <input type="file" id="file" multiple size="80" accept="image/*"/>
      <input type="button" onclick="ShowFileType();" value="显示文件信息"/>
      function ShowFileType() {
        var file = document.getElementById("file").files[0];
        console.log(file);
      }
  BlobBuilder 接口提供了另外一种创建Blob对象的方式 [已废弃]
    var builder = new BlobBuilder();
    var fileParts = ['<a id="a"><b id="b">hey!</b></a>'];
    builder.append(fileParts[0]);
    var myBlob = builder.getBlob('text/xml');
  使用类型数组和 Blob 创建一个 URL
    var typedArray = GetTheTypedArraySomehow();
    // 传入一个合适的MIME类型
    var blob = new Blob([typedArray], {type: "application/octet-binary"});
    
    // 会产生一个类似blob:d3958f5c-0777-0845-9dcf-2cb28783acaf 这样的URL字符串
    // 你可以像使用一个普通URL那样使用它,比如用在img.src上。
    var url = URL.createObjectURL(blob);
  从Blob中读取内容的唯一方法是使用 FileReader
    以下代码将 Blob 的内容作为类型数组读取:
    var reader = new FileReader();
    reader.addEventListener("loadend", function() {
       // reader.result contains the contents of blob as a typed array
    });
    reader.readAsArrayBuffer(blob);
    使用 FileReader 以外的方法读取到的内容可能会是字符串或是数据 URL。  
  blob.slice()  创建一个包含另一个blob的数据子集的blob
    blob.slice([start[, end[, contentType]]]) 包含源对象中指定范围内的数据新对象
    slice 一开始的时候是接受 length 作为第二个参数,以表示复制到新 Blob 对象的字节数。
    若设置其为 start + length,超出了源 Blob 对象的大小,那返回的 Blob 则是整个源 Blob 的数据。
    slice 方法在某些浏览器和版本上仍带有供应商前缀:
      Firefox 12 及更早版本的 blob.mozSlice() 
      Safari 中的 blob.webkitSlice()
      slice 方法的旧版本,没有供应商前缀,具有不同的语义,并且已过时。 
      使用Firefox 30 删除了对 blob.mozSlice() 的支持。
    Example:  使用XMLHttpRequest对象,将大文件分割上传
      var inputElem = document.querySelector('input[type="file"]');
      function upload(blobOrFile) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/server', true);
        xhr.onload = function(e) { ... };
        xhr.send(blobOrFile);
      }
      inputElem.addEventListener('change', function(e) {
        var blob = this.files[0];
        const BYTES_PER_CHUNK = 1024 * 1024; // 1MB chunk sizes.
        const SIZE = blob.size;
        var start = 0 , end = BYTES_PER_CHUNK;
        while(start < SIZE) {
          var upBlob = blob.slice(start, end) ;
          upload(upBlob);
          start = end;
          end = start + BYTES_PER_CHUNK;
        }
      }, false);
  blob.isClosed 只读 布尔值,指示 Blob.close() 是否在该对象上调用过
    关闭的 blob 对象不可读。
  blob.size 只读, Blob对象中所包含数据的大小,单位为字节
  blob.type 只读,字符串,Blob对象所包含数据的MIME类型 
    若类型未知,则该值为空字符串 
    在Ajax操作中,若 xhr.responseType 设为 blob,接收的就是二进制数据 
  blob.close() 关闭 Blob 对象,以便能释放底层资源 
ArrayBuffer&TypedArray&DataView: JS操作二进制数据的接口  
  PS:ArrayBuffer对象、TypedArray视图和DataView视图,这些对象早就存在,属于独立的规格, 
    ES6将其纳入ECMAScript规格,并且增加了新的方法,
    都是以数组的语法处理二进制数据,故统称为二进制数组,
  由来 
    这个接口的原始设计目的,与WebGL项目有关。
    所谓WebGL,就是指浏览器与显卡之间的通信接口,为了满足JS与显卡之间大量的、实时的数据交换,
    它们之间的数据通信必须是二进制的,而不能是传统的文本格式,
    文本格式传递一个32位整数,两端的JS脚本与显卡都要进行格式转化,将非常耗时。
    这时要是存在一种机制,可以像C语言那样,直接操作字节,
    将4个字节的32位整数,以二进制形式原封不动地送入显卡,脚本的性能就会大幅提升,
    二进制数组就是在这种背景下诞生的,
    很像C语言的数组,允许开发者以数组下标的形式,直接操作内存,
    使得开发者能通过JS与操作系统的原生接口进行二进制通信 
  ◆二进制数组由三类对象组成 
    它们支持的数据类型一共有'9'种(DataView对象支持除Uint8C以外的其他8种)。
  ArrayBuffer 对象,代表原始的二进制数据,内存中的一段二进制数据 
  TypedArray 视图,用来读写简单类型的二进制数据,代表确定类型的二进制数据 
    通过9个构造函数,可以生成9种数据格式的视图
    Uint8Array   [无符号8位整数]数组视图
    Int16Array   [16位整数]数组视图 
    Float32Array [32位浮点数]数组视图
    ...
  DataView 视图,用来读写复杂类型的二进制数据,代表不确定类型的二进制数据  
    比如第一个字节是Uint8[无符号8位整数]、
    第二个字节是Int16[16位整数]、
    第三个字节是Float32[32位浮点数]等等 
  ◆TypedArray  用来生成内存的视图 
  数据类型 字节长度  对应的C语言类型    含义 
    Int8      1     signed char      8 位带符号整数               
    Uint8     1     unsigned char    8 位不带符号整数               
    Uint8C    1     unsigned char    8 位不带符号整数(自动过滤溢出)
    Int16     2     short            16 位带符号整数               
    Uint16    2     unsigned short   16 位不带符号整数               
    Int32     4     int              32 位带符号整数               
    Uint32    4     unsigned int     32 位不带符号的整数             
    Float32   4     float            32 位浮点数                    
    Float64   8     double           64 位浮点数                    
'Class'类 
  PS: 'class'本质上还是基于原型prototype的实现做的进一步封装,
    ES5之前使用'function'和'prototype'来模拟class实现面向对象;  
  class Klass {} 创建类 
    PS: 类内部定义的方法都是不可枚举的;类和模块内部默认采取严格模式; 
      class内部只允许定义方法,不允许定义属性,包括静态属性[?];
      类名后面的括号{}里面的内容称之为类体 
    Example: 
      ES5 : 
      var Animal = function(name){
        this.name = name;
      }
      animal.prototype = {
        speak : function(){
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
    constructor(){}   构造方法,声明实例的属性和方法,相当于ES5的构造函数 
      PS:实例化时,会调用此方法来初始化实例对象; 内部的 this 表示实例对象;  
        若无'constructor'方法,执行时会使用一个空的constructor方法 
        具有唯一性,一个类体不能含有多个constructor构造方法 
      Example:
        class Klass{
          constructor(aoo,boo){ 
            // this,指向实例化后的对象
            this.aoo = aoo; 
            this.boo = boo; 
          };
          toString() { 
            return '('+this.x+', '+this.y+')'; 
          };
        }
        var cla1 = new Klass(1,2);
        cla1; // Klass {aoo: 1, boo: 2}
    foo(){}           声明实例的原型方法 
      PS: 内部的 this 表示实例对象;  
      [val] () {}  属性名可使用表达式 
        var  aoo = 'sayHello';
        class Klass{
          [aoo] () {
            console.log('hello');
          }
        }
        var klass = new Klass();
        klass.sayHello(); // 1
    static foo(){}    声明类的静态方法 
      class Klass {
        static foo(){
          console.log('静态方法');
        }
      }
      Klass.foo();  // 静态方法
    getter foo(){}  取值函数 
    setter foo(){}  存值函数 
      在Class内部可以使用get和set关键字,对某个属性设置存值函数和取值函数 
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
  class Child extends Parent {} 子类继承父类全部静态方法和实例属性方法,选择性继承原型方法 
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
          super(name);
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
    super 关键字,在子类中进行调用父类中的构造函数和方法 
      PS: 而super本身指代的是父类的实例对象,可以使用super.的方式调用父对象的方法[?]
        由于对象总是继承于其它对象,所以可以在ES6的任何一个对象中使用super关键字 
      若子类未显式定义'constructor',则下面的代码将被默认添加 
        constructor(...args){
          super(...args)
        }
      super()  子类的'constructor'构造函数中调用 
        子类的constructor方法必须调用super方法,否则不能新建实例 
        因为子类没有属于自己的this对象,而是继承了父类的this对象而对其进行加工 
        只有调用了super方法后,才可使用this,否则报错;
      super.xx()   调用父类中的静态方法或原型方法 
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
  klass = new Klass(arg) 创建类实例 
    PS: 创建实例时会自动执行类体中的'constructor'方法 
    klass.constructor             创建该实例的类 
    klass.constructor.prototype   该实例的原型对象 
    new Klass{}(arg) 立即执行的class 
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
  str = Klass.name;  获取类的名字 
Promise 同步书写异步模式 
  PS:采用'同步'形式的代码来决解异步函数间的层层嵌套,将原来异步函数的嵌套关系转变为'同步'的链式关系; 
    Promise对象是一个代理对象,代理了最终返回的值,可以在后期使用; 
    将异步操作封装成Promise对象,然后使用该对象的'then''catch'等方法,进行链式写法完成异步操作;
  Promise的状态 
    pending :   初始状态,初始状态,未完成或拒绝 
    fulfilled : 意味着操作成功完成 
    rejected :  意味着操作失败 
    只有异步操作的结果,可以决定当前是哪一种状态,任何其他操作都无法改变这个状态 
    一旦状态改变,就不会再变,任何时候都可以得到这个结果 
    与事件[Event]不同,事件的特点是,若错过了,再去监听则得不到结果  
  Promise的缺点
    首先,无法取消Promise,一旦新建它就会立即执行,无法中途取消 
    其次,若不设置回调函数,Promise内部抛出的错误,不会反应到外部 
    第三,当处于 Pending 状态时,无法得知目前进展到哪一个阶段,刚刚开始还是即将完成 
  var prms = new Promise(foo) 创建Promise对象 
    PS:Promise在创建时,参数函数就会执行 
    foo   用于放置执行异步操作的函数,传入参数 (resolve,reject) 
      函数内,若'resolve'被调用,代表该Promise被成功解析[resolve];
      若'reject'被调用时,代表该Promise的值不能用于后续处理了,即被拒绝[reject]了
      foo主要用于初始化异步代码,一旦异步代码调用完成,
      要么调用resolve方法来表示Promise被成功解析,
      或是调用reject方法,表示初始化的异步代码调用失败,整个promise被拒绝。
      若在foo方法的执行过程中抛出了任何异常,那么promise立即被拒绝,
      即相当于reject方法被调用,executor 的返回值也就会被忽略。
      resolve(arg1); // 用于 异步成功后 传递数据 arg1
      reject(arg2); // 用于 异步失败后 传递数据 arg2
      // resolve reject 函数根据逻辑需要进行相应的执行
  ◆prms的方法 
  prms.then(foo1[,foo2])    rs或rj执行触发foo1或foo2,返回promise对象 
    foo1 rs(sucessData)后执行,传入参数 (sucessData)
      默认会返回一个Promise值,也可以自定义返回值 
      若 foo1 返回一个新 Promise,
      则then之后再调用的then就是新Promise中的逻辑了;
    foo2 可选,rj(failData)后执行,传入参数 (failData) 
  prms.catch(foo)  用于处理操作异常,返回promise对象 
    prms.catch(function (error) {
      //操作失败的处理程序
    });
  ◆静态方法 
  Promise.all(arr)  全局模式,所有成功[?]才触发 
    PS:当所有实例对象的状态变化时才触发;最终的结果为多个rs传递的值组成的一个数组;
    arr  由Promise实例组成的数组
    Example:
      let prms1 = new Promise(function(resolve){
        setTimeout(function () {
          resolve('实例1操作成功');
        },5000);
      });
      let prms2 = new Promise(function(resolve){
        setTimeout(function () {
          resolve('实例2操作成功');
        },1000);
      });
      // 5秒之后控制台才会输出结果
      Promise.all([pro1,pro2])
      .then(function(result){
        console.log(result);
      });
      // ["实例1操作成功", "实例2操作成功"]
  Promise.race(arr) 竞速模式,有一个完成时触发 
    PS:参数中的promise实例,只要有一个状态发生变化[不管成功还是异常],它就会有返回,
      其他实例中再发生变化,也不管了。
    arr  由Promise实例组成的数组 
    Example:
      let prms1 = new Promise(function(resolve){
        setTimeout(function () {
          resolve('实例1操作成功');
        },4000);
      });
      let prms2 = new Promise(function(resolve,reject){
        setTimeout(function () {
          reject('实例2操作失败');
        },2000);
      });
      Promise.race([pro2,pro1])
      .then(function(result){
        console.log(result);
      })
      .catch(function(error){
        console.log(error);
      });
      // Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}
      // 实例2操作失败
      由于pro2实例中2000毫秒之后就执行reject方法,早于实例pro1的4000毫秒,
      所以最后输出的是:实例2操作失败。
  Promise.resolve() 
  Promise.reject()  
  Promise.prototype.then()  
  Promise.prototype.catch() 
  todo:
    finally
    bind
    joinprops
    any
    some
  Question:
    使用 Promise 监控 点击事件 , 使用Promise 改变事件的执行方式 [?] 
  Example:
    通过Promise来调用AJAX [self]
    var prms = new Promise(function(rs, rj){
      $.ajax({
        type : 'get',
        url  : 'url',
        data : {
          key : val,
        }, 
        dataType : 'json',
        success  : function(backData,textStatus,obj){
          rs(backData);
        }, 
        error    : function (xhr,status,errorTrown){
          rj(status);
        }, 
      });
    })
    prms.then(function(data){
      console.log(data); // 打印出AJAX获取到的数据
    })
    .catch(function(data){
      console.log(data); // 打印出出错的信息
    })
    
    let prms = new Promise(function(resolve,reject){
      if(true){
        resolve('操作成功'); //调用操作成功方法
      }
      else{
        reject('操作异常'); //调用操作异常方法
      }
    });
    function requestA(){
      console.log('请求A成功');
      return '准备请求B';
    }
    function requestB(res){
      console.log('上一步是:'+res);
      console.log('请求B成功');
      return '准备请求C';
    }
    function requestC(res){
      console.log('上一步是:'+res);
      console.log('请求C成功');
    }
    function requestError(){
      console.log('请求失败');
    }
    //用then处理操作成功,catch处理操作异常
    prms.then(requestA)
    .then(requestB)
    .then(requestC)
    .catch(requestError);
    // 请求A成功
    // 上一步是:准备请求B
    // 请求B成功
    // 上一步是:准备请求C
    // 请求C成功
    // Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: undefined}
Generator 生成器函数 
  PS:可控制函数的内部状态,依次遍历每个状态;可根据需要,让函数暂停执行或者继续执行。
    可利用Generator函数暂停执行的特性来实现异步操作 
    原理:将异步操作的语句写到yield后面,通过执行next方法进行回调 
  function* foo(){} 声明Generator函数
    Example:
      function* Hello(name) {  
        yield `hello ${name}`;
        yield `how are you`;
        yield `bye`;
      }
    'yield'关键字 : 相当于暂停执行并且返回信息 
      Generator函数可以有多个yield
      yield代表的是暂停执行,后续通过调用生成器的next()方法,可以恢复执行 
    'yield*'关键字 : 调用另一个Generator函数
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
    PS:Generator函数被调用后得到的生成器是一个遍历器iterator,用于遍历函数内部的状态 
      Generator函数被调用后并不会一直执行到最后,而是先回返回一个生成器对象,
      然后hold住不动,等到生成器对象的'next'方法被调用后,函数才会继续执行,
      直到遇到关键字yield后,又会停止执行,并返回一个Object对象,然后继续等待,
      直到'next'再一次被调用的时候,才会继续接着往下执行,直到done的值为true 
    Example:
      function* foo(name) {
        yield name
        yield `world`
        yield `fina`
      }
      let ite = foo('hello');
      console.log(ite); // foo {[[GeneratorStatus]]: "suspended"}
      setTimeout(function(){
        console.log(ite.next()); // Object {value: "hello", done: false}
        setTimeout(function(){
          console.log(ite.next()); // Object {value: "world", done: false}
          setTimeout(function(){
            console.log(ite.next()); // Object {value: "fina", done: false}
            setTimeout(function(){
              console.log(ite.next()); // Object {value: undefined, done: true}
              console.log(ite.next()); // Object {value: undefined, done: true}
            },1000);
          },1000);
        },1000);
      },1000);
    next([arg])方法 
      arg 参数,替换上一个yield的返回值
      function* Hello() {
        var res = yield `hello`; // 把返回值字符串'hello'赋给变量res
        console.log(res,1); // undefined 1
        yield res;
      }
      let iterator = Hello(); // 返回一生成器对象
      iterator.next(); //{value: "hello", done: false}
      // 若为 iterator.next(); // {value: undefined, done: false}
      iterator.next("world"); // {value: "world", done: false}
      相当于
      function* Hello() {
        var res = yield `hello`; // 把返回值字符串'hello'赋给变量res
        console.log(res); // {value: undefined, done: false}
        res = 'world'
        yield res;
      }
      let iterator = Hello(); // 返回一生成器对象
      iterator.next(); // {value: "hello", done: false}
      iterator.next(); // {value: "world", done: false}
Proxy 对象代理 
  PS:作用:将一个对象交给了Proxy代理,然后通过编写处理函数,来拦截目标对象的操作
  new Proxy(target,params) Proxy创建-Proxy的实现 
    target 代理的目标对象
    params 配置对象 
      get     代理对象的读操作,传入参数 (target,prop) 
        target 表示代理的目标对象 
        prop   占位符,表示代理对象的属性 
        Example:
          var person = {"name":"张三"};
          var pro = new Proxy(person,{  //创建代理对象pro,代理person的读写操作
            get : function(target,property){
              return "李四"
            }
          });
          pro.name; //李四
      set     代理对象的写操作,传入参数 (target,prop,value)  
        target  同'set'
        prop    同'set'
        value   设置的值 
        Example:
          var bankAccount = {"RMB":1000,"dollar":0};
          var banker = new Proxy(bankAccount,{ //创建一个Proxy代理实例
            get : function(target,property){      //编写get处理程序
              if(target[property] > 0){  //判断余额是否大于0
                return target[property]; //有余额,就返回余额值
              }
              else{
                return "余额不足"; //没钱了
              }    
            },
            set : function(target,property,value){ //编写set处理程序
              if(!Number.isInteger(value)){ //存入的数额必须是一个数字类型
                console.log(value,'数值不正确');
                return "请设置正确的数值";
              }
              else {
                target[property] = value;  //修改属性的值
                console.log('存款成功');
              }
            }
          });
          banker.RMB;    // 1000,查款
          banker.dollar; // 余额不足,查款
          banker.dollar = "五百"; // 五百 数值不正确,存款
          banker.dollar;          // 余额不足,查款
          banker.dollar = 500;    // 存款成功,存款
          banker.dollar;          // 500,查款
      ownKeys 代理对象的keys集合[通过 Object.keys()来查看] 
        let person = {"name":"老王","age":40,"height":1.5};
        let proxy = new Proxy(person,{ 
          ownKeys : function(target){  // ownKeys过滤对对象的属性遍历
            return ["name","age"] 
          }
        });
        Object.keys(person); // ["name", "age","height"],未使用代理
        Object.keys(proxy);  // ["name", "age"]
      has     代理对象的属性查询[通过 key in obj 来查看]
        var person = { "name":"张三", "age":20 };
        var proxy = new Proxy(person, {
          has : function(target, prop) {
            if(target[prop] === undefined){
              return false;
            }
            else{
              return true;
            }
          }
        });
        "name" in proxy;   // true
        "height" in proxy; // false
      apply   代理函数对象的执行 
        let foo = function(){
          console.log('我是原始函数');
        };
        let proxy = new Proxy(foo,{  //创建一个代理实例,代理函数foo
          apply : function(){
            console.log('我是代理函数');
          }
        });
        proxy(); // 我是代理函数
  var obj = Proxy.revocable() 代理及取消代理,返回一个对象 
    obj.proxy    Proxy的代理实例对象
    obj.revoke() 用于取消代理
    Example:
      let person = {"name":"张三"};
      let handle = {  //定义一个代理处理程序
        get : function(target,prop){
          return "李四";
        }
      };
      let obj = Proxy.revocable(person,handle); // 使用Proxy.revocable()代理
      obj.proxy.name; // 李四
      obj.revoke();   //调用返回对象obj的revoke方法,取消代理
      obj.proxy.name; //报错,代理被取消
  defineProperty() 
  deleteProperty() 
  enumerate()
  getOwnPropertyDescriptor()
  getPrototypeOf()
  isExtensible()
  preventExtensions()
  setPrototypeOf()
Reflect  为操作对象提供的API 
  Reflect对象的设计目的 
    将Object对象的一些明显属于语言内部的方法[如 Object.defineProperty],放到Reflect对象上。
      现阶段,某些方法同时在Object和Reflect对象上部署,未来的新方法将只部署在Reflect对象上。
      也就是说,从Reflect对象上可以拿到语言内部的方法。
    修改某些Object方法的返回结果,让其变得更合理。
      比如,Object.defineProperty(obj, name, desc)在无法定义属性时,会抛出一个错误,而Reflect.defineProperty(obj, name, desc)则会返回false。
      // 老写法
      try {
        Object.defineProperty(target, property, attributes);
        // success
      } 
      catch (e) {
        // failure
      }
      
      // 新写法
      if (Reflect.defineProperty(target, property, attributes)) {
        // success
      } 
      else {
        // failure
      }
    让Object操作都变成函数行为
      某些Object操作是命令式,比如name in obj和delete obj[name],
      而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
      // 老写法
      'assign' in Object // true
      // 新写法
      Reflect.has(Object, 'assign') // true
    Reflect对象的方法与Proxy对象的方法一一对应
      只要是Proxy对象的方法,就能在Reflect对象上找到对应的方法。
      这就让Proxy对象可以方便地调用对应的Reflect方法,完成默认行为,作为修改行为的基础。
      也就是说,不管Proxy怎么修改默认行为,你总可以在Reflect上获取默认行为。
      Proxy(target, {
        set: function(target, name, value, receiver) {
          var success = Reflect.set(target,name, value, receiver);
          if (success) {
            log('property ' + name + ' on ' + target + ' set to ' + value);
          }
          return success;
        }
      });
      上面代码中,Proxy方法拦截target对象的属性赋值行为。
      它采用 Reflect.set 方法将值赋值给对象的属性,确保完成原有的行为,然后再部署额外的功能 
  ◆Reflect对象一共有13个静态方法 
    PS:这些方法的作用大部分与Object对象的同名方法的作用都是相同的,
      而且它与Proxy对象的方法是一一对应的
    Reflect.apply(target,thisArg,args)
    Reflect.construct(target,args)
    Reflect.get(target,name,receiver)
    Reflect.set(target,name,value,receiver)
    Reflect.defineProperty(target,name,desc)
    Reflect.deleteProperty(target,name)
    Reflect.has(target,name)
    Reflect.ownKeys(target)
    Reflect.isExtensible(target)
    Reflect.preventExtensions(target)
    Reflect.getOwnPropertyDescriptor(target, name)
    Reflect.getPrototypeOf(target)
    Reflect.setPrototypeOf(target, prototype)
◆变量扩展 
'lexical_scopes'词法作用域,即'块作用域'
  PS:会在函数内部、代码块[即 {}]内创建,任何一对花括号'{}'中的语句都属于一个块,称之为块级作用域;
    块级作用域是很多类C语言的工作机制,可增强JS的灵活性,又能与其它编程语言保持一致 
  if (true) { 
    var aoo = 1; 
    let boo = 2;
  }
  console.log(aoo); // 1
  console.log(boo); // 报错,boo is not defined
'Global_Block_Bindings'全局块级绑定
  全局作用域使用'var'声明全局变量,相当于给全局对象[浏览器环境下是 window]添加属性 
    这意味着全局对象的属性可能会意外地被重写覆盖
    var RegExp = "Hello!";
    console.log(window.RegExp);     // "Hello!"
  若在全局作用域使用'let'或'const',绑定也发生在全局作用域内,但不会向全局对象添加属性 
    let RegExp = "Hello!";
    console.log(RegExp);           // "Hello!"
    console.log(window.RegExp);    // function RegExp() { [native code] }
let   定义块级变量 
  PS:块级作用域限制,只在定义的块级作用域中存在;
  无变量提升 
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
  'Let_Declarations_in_Loops'循环中的'let'声明 
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
const 定义块级常量 
  PS:只能在声明时赋予;不能被删除;只在块级作用域生效;无变量提升
  const aoo =2;
  aoo = 2;     // 报错 ,常量不可改变
  delete aoo;  // 报错 
  const boo;   // 报错 ,定义时必须赋值
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
◆操作符&语句扩展 
'Destructuring'解构赋值 : 按照一定模式,从数组和对象中取值,对变量进行赋值 
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
'spread'扩展运算符 : 把数组解开成单独的值 
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
for(var val of iterator){}  遍历 
  PS:可遍历的对象包括数组,对象,字符串,set和map结构等具有'iterator'接口的数据结构 
    原生具备Iterator接口的数据结构: Array Map Set String TypedArray arguments'函数参数对象'
  数组遍历 
    var arr = ['a','b','c','d','e'];
    for(let val of arr){
      // console.log(typeof );
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
--------------------------------------------------------------------------------
'Iterator'遍历器 : 一种接口,为各种不同的数据结构提供统一的访问机制 
  PS:JS原有的表示“集合”的数据结构,主要是数组Array和对象Object,ES6又添加了Map和Set 
    用户还可以组合使用它们,定义自己的数据结构[比如数组的成员是Map,Map的成员是对象] 
    这样就需要一种统一的接口机制,来处理所有不同的数据结构 
    任何数据结构只要部署Iterator接口,就可以完成遍历操作,即依次处理该数据结构的所有成员 
  Iterator的作用 
    为各种数据结构,提供一个统一的、简便的访问接口
    使得数据结构的成员能够按某种次序排列 
    主要供for...of消费 
  遍历过程 
    创建一个指针对象,指向当前数据结构的起始位置 
    第一次调用指针对象的next方法,可以将指针指向数据结构的第一个成员 
    第二次调用指针对象的next方法,指针就指向数据结构的第二个成员 
    不断调用指针对象的next方法,直到它指向数据结构的结束位置 
    每一次调用next方法,都会返回数据结构的当前成员的信息。
    具体来说,就是返回一个包含value和done两个属性的对象。
    其中,value属性是当前成员的值,done属性是一个布尔值,表示遍历是否结束。
  默认Iterator接口 
    当使用for...of循环遍历某种数据结构时,该循环会自动去寻找Iterator接口 
    一种数据结构只要部署了 Iterator 接口,就称这种数据结构是”可遍历的“
    ES6规定,默认的Iterator接口部署在数据结构的 Symbol.iterator 属性,
    或者说,一个数据结构只要具有 Symbol.iterator 属性,就可以认为是“可遍历的”
    Symbol.iterator 属性本身是一个函数,就是当前数据结构默认的遍历器生成函数。
    执行这个函数,就会返回一个遍历器。
    属性名 Symbol.iterator 是一个表达式,返回Symbol对象的iterator属性,
    这是一个预定义好的、类型为 Symbol 的特殊值 
    Example:
      数组的 Symbol.iterator 属性 
        let arr = ['a', 'b', 'c'];
        let iter = arr[Symbol.iterator]();
        var aoo1 = iter.next() // { value: 'a', done: false }
        var aoo2 = iter.next() // { value: 'b', done: false }
        var aoo3 = iter.next() // { value: 'c', done: false }
        var aoo4 = iter.next() // { value: undefined, done: true }
        console.log(aoo1,aoo2,aoo3,aoo4);
'Modules'模块化规范 
  PS: ES6模块默认采用严格模式,不管是否在模块头部加上"use strict"; 
    ES6模块之中,顶层的this指向undefined,即不应该在顶层代码使用this; 
  ES6模块设计思想: 尽量的静态化,使编译时能确定模块的依赖关系,以及输入和输出的变量 
    ES6模块: “编译时加载”或者静态加载
      ES6不是对象,而是通过export命令显式指定输出的代码,再通过import命令输入。
      // ES6模块
      import { stat, exists, readFile } from 'fs';
      上面代码的实质是从fs模块加载3个方法,其他方法不加载。
      这种加载称为“编译时加载”或者静态加载,即ES6可以在编译时就完成模块加载, 
      效率要比CommonJS模块的加载方式高, 
      当然,这也导致了没法引用ES6模块本身,因为它不是对象。
      由于ES6模块是编译时加载,使得静态分析成为可能。
      有了它,就能进一步拓宽JS的语法,
      比如引入宏(macro)和类型检验(type system)等只能靠静态分析实现的功能。
    除了静态加载带来的各种好处,ES6模块还有以下好处 
      不再需要UMD模块格式了,将来服务器和浏览器都会支持ES6模块格式 
      将来浏览器的新API就能用模块格式提供,不再必须做成全局变量或者navigator对象的属性 
      不再需要对象作为命名空间[比如Math对象],未来这些功能可以通过模块提供 
  export 输出接口,对外暴露属性方法 
    PS:一个模块就是一个独立的文件,该文件内部的变量,外部无法获取。
      若希望外部能读取模块内的变量,须使用export关键字输出变量。
    export var aoo = val;     单个变量输出 
      对外部输出三个变量: aoo boo coo
      export var aoo = 'aa';
      export var boo = 'bb';
      export var coo = 1958;
    export function foo() {}; 单个函数输出 
    export default  默认输出 
      PS:通过默认输出和指定名称的引入,完成模块变量的引入;
      Example:
        // export-default.js
        默认输出一个函数
        export default function () { console.log('sss'); }
        或
        export default function foo() { console.log('sss'); }
        // 函数名foo,在模块外部是无效的,加载的时候,视同匿名函数加载 
        或
        function foo() { console.log('foo'); }
        export default foo;
        最终相当于 [self] : export {foo as default };
        // import-default.js
        其他模块加载该模块时,import命令可以为该匿名函数指定任意名字。
        import goo from './export-default';
        相当于 [self] : import { default as goo } from './profile';
        goo(); // 'sss'
        
        输出类
        // MyClass.js
        export default class { ... }
        // main.js
        import MyClass from 'MyClass';
        let o = new MyClass();
        
        在一条import语句中同时输入默认方法和其他变量
          import _,{ each } from 'lodash';
          对应上面代码的export语句如下。
          export default function (obj) { }         
          export function each(obj, iterator, context) { }
      默认输出和正常输出的比较 
        使用export default时,对应的import语句不需要使用大括号；
        export default function foo() { } // 输出
        import goo from 'xx';             // 输入
        
        正常时,对应的import语句需要使用大括号。
        export function foo() { }; // 输出
        import {goo} from 'xx';    // 输入
      一个模块只能有一个默认输出[即'export default'命令只能使用一次] 
        PS:本质上,export default 就是输出一个叫做default的变量或方法,
          然后输入时,系统允许你为它取任意名字。
        // modules.js
        function foo(x, y) { return x * y; }
        export {foo as default};
        // app.js
        import { default as xxx } from 'modules';
      'export default'后不能跟变量声明语句
        PS:因为export default命令其实只是输出一个叫做default的变量
          export default 本质是将该命令后面的值,赋给default变量以后再默认
        export var a = 1; // 正确
        
        var a = 1; 
        export default a; // 正确
        相当于 [self] : export { a as default } ;
        
        export default 42; // 正确
        相当于 [self] : export { 42 as default } ;
        
        export default var a = 1; // 错误
    export {aoo,boo}  {}封装批量导出,使用大括号指定所要输出的一组变量 
      var aoo = 'aa';
      var boo = 'bb';
      var coo = 1958;
      export {aoo, boo, coo};
    'as'关键字    重命名输出变量 
      重命名了函数foo1和foo2的对外接口,foo2使用不同的名字输出了两次:
      function foo1() {  }
      function foo2() {  }
      export {
        foo1 as goo1,
        foo2 as goo2,
        foo2 as hoo1
      };
    Example:
      export 1; // 报错 
      
      var m = 1;
      export m; // 报错
      单变量输出格式采用以下方式 
      export var m = 1;
      或
      var m = 1;
      export {m};
      或
      var n = 1;
      export {n as m};
      
      function f() {}
      export f;  // 报错
      改为:
      export function f() {};
      或
      function f() {}
      export {f};
    输出的值是实时动态的 
      export var aoo = 'bar';
      setTimeout(() => aoo = 'baz', 500);
      上面代码输出变量aoo,值为bar,500 毫秒之后变成baz。
      这一点与 CommonJS 规范完全不同。
      CommonJS 模块输出的是值的缓存,不存在动态更新。
    'export'命令必须在模块顶层作用域定义 
      PS:可出现在模块的任何位置,但要处于模块顶层,若处于块级作用域内,就会报错 
        因为处于条件代码块之中,就没法做静态优化了,违背了ES6模块的设计初衷。
      function foo() { 
        export default 'bar'  // SyntaxError
      } 
      foo();
    export {}  from 'path' 先后输入输出同一个模块 
      PS:
      Example:
        export { foo, bar } from 'my_module';
        // 等同于
        import { foo, bar } from 'my_module';
        export { foo, bar };
      export { foo as myFoo } from 'my_module' 接口改名 
      export * from 'my_module';               整体输出 
      export { default } from 'foo';           默认接口 
      export { aoo as default } from './someModule'  具名接口改为默认接口 
        // 等同于
        import { es6 } from './someModule';
        export default es6;
      export { default as es6 } from './someModule'  默认接口改为具名接口 
      下面三种import语句,没有对应的复合写法。
        import * as someIdentifier from "someModule";
        import someIdentifier from "someModule";
        import someIdentifier, { namedIdentifier } from "someModule";
        为了做到形式的对称,现在有提案,提出补上这三种复合写法。
        export * as someIdentifier from "someModule";
        export someIdentifier from "someModule";
        export someIdentifier, { namedIdentifier } from "someModule";
  import 引入接口,导入其他模块的属性方法 
    PS:其他JS文件通过import加载export定义对外的输出 
    import {name1 [,name2,..]} from './xx' 加载JS文件,并从中输入变量 
      PS: 变量名必须与导出名称相同,位置顺序则无要求 
      from     指定模块文件的位置,可是相对路径或绝对路径,'.js'可省略 
      Example:
        import {firstName, lastName, year} from './profile';
        console.log(firstName);
    import {name1 [,name2,..]} from 'moduleName'; 
      PS:若使用模块名,而非路径路径,则必须有配置文件,告诉JS引擎该模块的位置 
      Example:
        import {myMethod} from 'util';
        util是模块文件名,由于不带有路径,需通过配置告诉引擎怎么取到这个模块 
    'as'关键字  重命名输入的变量 
      import { aoo as boo } from './profile';
    'import'命令引入提升,会提升到整个模块的头部,首先执行 
      Example:
        foo();
        import { foo } from 'my_module';
        import的执行会早于foo的调用,行为本质是import命令是编译阶段执行的,在代码运行前 
    不能使用表达式和变量 
      由于import是静态执行,所以不能使用表达式和变量,这些只有在运行时才能得到结果的语法结构 
      在静态分析阶段,这些语法都是没法得到值的。
      import { 'f' + 'oo' } from 'my_module'; // 报错
      
      let module = 'my_module'; // 报错
      import { foo } from module;
      
      if (x === 1) { import { foo } from 'module1'; } // 报错
      else { import { foo } from 'module2'; }
    其他写法 
      import语句会执行所加载的模块,因此可以有下面的写法 
      
      import 'lodash'; //  仅仅执行lodash模块,但是不输入任何值。
      
      多次重复执行同一句import语句,则只会执行一次,而不会执行多次 
      import 'lodash';
      import 'lodash'; // 未执行
    
      import语句是'Singleton'模式。
      import { foo } from 'my_module';
      import { bar } from 'my_module';
      等同于
      import { foo, bar } from 'my_module';
    import * as aoo from './xx';  模块的整体加载 
      PS:使用星号'*'整体加载,指定一个对象,所有输出值都加载在这个对象上面 
      Example:
        // circle.js 
        export function area(radius) { 
          return Math.PI * radius * radius; 
        }
        export function circumference(radius) { 
          return 2 * Math.PI * radius; 
        }
        // main.js 
        import * as circle from './circle'; 
        console.log('圆面积:' + circle.area(4)); 
        console.log('圆周长:' + circle.circumference(14)); 
      模块整体加载所在的对象不允许运行时改变 
        import * as circle from './circle';
        // 下面两行都是不允许的
        circle.foo = 'hello';
        circle.area = function () {};
  模块的继承 
    Example: 
      假设有一个circleplus模块,继承了circle模块。
      // circleplus.js
      export * from 'circle';
      export var e = 2.71828182846;
      export default function(x) { return Math.exp(x); }
      上面代码中的export *,表示再输出circle模块的所有属性和方法。
      注意,export *命令会忽略circle模块的default方法。
      然后,上面代码又输出了自定义的e变量和默认方法。
      这时,也可以将circle的属性或方法,改名后再输出。
      // circleplus.js
      export { area as circleArea } from 'circle';
      上面代码表示,只输出circle模块的area方法,且将其改名为circleArea。
      加载上面模块的写法如下。
      // main.js
      import * as math from 'circleplus';
      import exp from 'circleplus';
      console.log(exp(math.e));
      上面代码中的import exp表示,将circleplus模块的默认方法加载为exp方法。
  跨模块常量 
    const声明的常量只在当前代码块有效。
    若想设置跨模块的常量(即跨多个文件),或者说一个值要被多个模块共享,
    可以采用下面的写法。
    // constants.js 模块
    export const A = 1;
    export const B = 3;
    export const C = 4;
    // test1.js 模块
    import * as constants from './constants';
    console.log(constants.A); // 1
    console.log(constants.B); // 3
    // test2.js 模块
    import {A, B} from './constants';
    console.log(A); // 1
    console.log(B); // 3
    若要使用的常量非常多,可以建一个专门的constants目录,
    将各种常量写在不同的文件里面,保存在该目录下。
    // constants/db.js
    export const db = {
      url: 'http://my.couchdbserver.local:5984',
      admin_username: 'admin',
      admin_password: 'admin password'
    };
    // constants/user.js
    export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];
    然后,将这些文件输出的常量,合并在index.js里面。
    // constants/index.js
    export {db} from './db';
    export {users} from './users';
    使用的时候,直接加载index.js就可以了。
    // script.js
    import {db, users} from './constants';
  import(specifier) 
    PS:前面介绍过,import命令会被JS引擎静态分析,
      先于模块内的其他模块执行(叫做”连接“更合适)。所以,下面的代码会报错。
      // 报错
      if (x === 2) { import MyModual from './myModual'; }
      上面代码中,引擎处理import语句是在编译时,这时不会去分析或执行if语句,
      所以import语句放在if代码块之中毫无意义,因此会报句法错误,而不是执行时错误。
      也就是说,import和export命令只能在模块的顶层,
      不能在代码块之中(比如,在if代码块之中,或在函数之中)。
        
      这样的设计,固然有利于编译器提高效率,但也导致无法在运行时加载模块。
      从语法上,条件加载就不可能实现。
      若import命令要取代 Node 的require方法,这就形成了一个障碍。
      因为require是运行时加载模块,import命令无法取代require的动态加载功能。
      const path = './' + fileName;
      const myModual = require(path);
      上面的语句就是动态加载,require到底加载哪一个模块,只有运行时才知道。
      import语句做不到这一点。
        
      因此,有一个提案,建议引入import()函数,完成动态加载。
    import函数的参数specifier,指定所要加载的模块的位置。
    import命令能够接受什么参数,import()函数就能接受什么参数,
    两者区别主要是后者为动态加载。
    import()返回一个 Promise 对象。
    下面是一个例子。
    const main = document.querySelector('main');
    import(`./section-modules/${someVariable}.js`)
    .then(module => { module.loadPageInto(main); })
    .catch(err => { main.textContent = err.message; });
    import()函数可以用在任何地方,不仅仅是模块,非模块的脚本也可以使用。
    它是运行时执行,也就是说,什么时候运行到这一句,也会加载指定的模块。
    另外,import()函数与所加载的模块没有静态连接关系,这点也是与import语句不相同。
    import()类似于 Node 的require方法,区别主要是前者是异步加载,后者是同步加载。
    下面是import()的一些适用场合。
      (1)按需加载。
      import()可以在需要的时候,再加载某个模块。
      button.addEventListener('click', event => {
        import('./dialogBox.js')
        .then(dialogBox => { dialogBox.open(); })
        .catch(error => { /* Error handling */ })
      });
      上面代码中,import()方法放在click事件的监听函数之中,只有用户点击了按钮,才会加载这个模块。
      (2)条件加载
      import()可以放在if代码块,根据不同的情况,加载不同的模块。
      if (condition) {
        import('moduleA').then(...);
      } 
      else {
        import('moduleB').then(...);
      }
      上面代码中,若满足条件,就加载模块 A,否则加载模块 B。
      (3)动态的模块路径
      import()允许模块路径动态生成。
      import(f())
      .then(...);
      上面代码中,根据函数f的返回结果,加载不同的模块。
      注意点
      import()加载模块成功以后,这个模块会作为一个对象,当作then方法的参数。
      因此,可以使用对象解构赋值的语法,获取输出接口。
      import('./myModule.js')
      .then(({export1, export2}) => {
        // ...·
      });
      上面代码中,export1 和 export2 都是 myModule.js 的输出接口,可以解构获得。
      若模块有default输出接口,可以用参数直接获得。
      import('./myModule.js')
      .then(myModule => {
        console.log(myModule.default);
      });
      上面的代码也可以使用具名输入的形式。
      import('./myModule.js')
      .then(({default: theDefault}) => {
        console.log(theDefault);
      });
      若想同时加载多个模块,可以采用下面的写法。
      Promise.all([
        import('./module1.js'),
        import('./module2.js'),
        import('./module3.js'),
      ])
      .then(([module1, module2, module3]) => {
         ···
      });
      import()也可以用在 async 函数之中。
      async function main() {
        const myModule = await import('./myModule.js');
        const {export1, export2} = await import('./myModule.js');
        const [module1, module2, module3] =
          await Promise.all([
            import('./module1.js'),
            import('./module2.js'),
            import('./module3.js'),
          ]);
      }
      main();    
  注意事项 
    声明的变量,对外都是只读的 
      //---module-B.js文件------
      var name = "前端君"
      export {name}
      //---module-A.js文件------
      import {name} from "./module-B.js";
      name = "修改字符串变量"; //报错:name is read-only
    若模块B导出的是对象类型的值,可[部分]修改。
      //---module-B.js文件---
      var person = {"name":"前端君"}
      export { person }
      //---module-A.js文件------
      import {person} from "./module-B.js";
      person.name = "修改字符串变量"; //修改成功
    导入不存在的变量,值为undefined。
      //---module-B.js文件---
      var name = "前端君";
      export {name}
      //---module-A.js文件------
      import { height } from "./module-B.js";
      console.log(height); // undefined,不会抛出异常,只是值为undefined
--------------------------------------------------------------------------------
ES7 
ASYNC  用来取代回调函数、解决异步操作的一种方法  
  PS:async函数与Promise、Generator函数类似,本质上是 Generator 函数的语法糖 
  var prms = async function(){}  函数表达式定义async函数
  async function foo() {}        函数声明
    PS:同一般函数声明相同,使用'async function'代替'function'来声明异步函数
      函数执行时,遇到await就会先返回,等到异步操作完成,再接着执行函数体内后面的语句 
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
    await proms 
      PS:await命令只能用在async函数之中,用在普通函数会报错 
      proms   Promise对象,否则被转成一个立即resolve的Promise对象 
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
    采用异步函数作为回调 
      将forEach方法的参数改成async函数存在问题 
        let docs = [{}, {}, {}];
        docs.forEach(async function (doc) { // 可能得到错误结果
          await db.post(doc);
        });
        上面代码可能不会正常工作,原因是这时三个 db.post 操作将是并发执行,
        也就是同时执行,而不是继发执行。
        正确的写法: 采用for循环 
        let docs = [{}, {}, {}];
        for (let doc of docs) {
          await db.post(doc);
        }
'Async_Iterator'异步遍历器
  PS:Iterator接口是一种数据遍历的协议,调用遍历器对象的next方法,就会得到一个对象,
    该对象表示当前遍历指针所在的那个位置的信息,next方法返回的对象的结构是{value, done},
    其中value表示当前的数据的值,done是一个布尔值,表示遍历是否结束。
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
'Decorator'修饰器 : 用来修改类的行为 
-------------------------------------------------------------------------待整理 


