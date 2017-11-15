global|window,全局对象 
  PS: global对象未定义如何访问,浏览器中用window对象实现全局访问;
    所有全局作用域中定义的变量和函数,都是Global对象的属性和方法,
    var global = function(){ return this; }  间接获取Global对象
  Member: 
    ★转换方法 
    Boolean(val)  bol,转换为的布尔值 
      console.log(Boolean(0));         // false
      console.log(Boolean(NaN));       // false
      console.log(Boolean(undefined)); // false
      console.log(Boolean(''));        // false
      其余皆转换为true
    Number(val)   num,转换为数值  
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
    String(val)   str,将任意类型值转换为字符串 
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
    parseInt(str/num[,radix])  num,返回指定进制的整数值 
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
    parseFloat(str/num)        num,返回整数值/浮点数值  
      PS: 类似'parseInt',区别是数字中可包含一个'.'点; 只能解析为10进制数
      Example: 
      console.log(parseFloat(' 12.0'));   // 12,优先转换为整数值 
      console.log(parseFloat(' 01.20'));  // 1.2,去掉前、后导0
      console.log(parseFloat('123abc'));  // 123,去掉不识别的部分
      console.log(parseFloat('12.3.4'));  // 12.3,只认一个小数点
      console.log(parseFloat('0xA'));     // 0,不识别十六进制,x后面的字符被忽略 
      console.log(parseFloat('1.2e7'));   // 12000000,把科学计数法转化成普通数值
    encodeURI(str)    str,编码为URI 
      PS: 有效的URI中不能包含某些字符,如空格,否则需转换
        不会对本身属于URI的特殊字符",/?:@&=+$#"等ASCII标点符号进行转义 
    decodeURI(uriStr) str,解码URI 
    encodeURIComponent(str)  str,编码为URI[完全编码] 
      PS: encodeURIComponent() 方法比 encodeURI() 更加彻底 
        会对任何非标准字符进行编码[ASCII字母、数字及"-_.!～*'()"等进行编码] 
        一般来说 encodeURIComponent() 使用频率要高一些 
    decodeURIComponent(str)  str,解码URI[完全解码] 
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
    ★判断方法 
    isFinite(num)  bol,数值是否有限  
      isFinite(10); // true
    isNaN(val)     bol,能否转换为NaN 
      PS: 先后调用'valueOf''toString'方法,试图将值转换为数值进行判断 
      Example:
      console.log(isNaN(1));      // false
      console.log(isNaN('1'));    // false,'1'是一个字符串数值,可以转换成数值
      console.log(isNaN(true));   // false,true可以转换为1
      console.log(isNaN('abc'));  // true,'abc'不能转换为数值.
      console.log(isNaN(NaN));    // true
    已废弃 
      escape(str)   str,编码字符串[已废弃]
      unescape(str) str,解码由'escape'编码的字符串[已废弃] 
    window对象的DOM和BOM属性&方法 [详见DOM&BOM] 
Math,数学对象 
  PS: 非构造函数/类,实际为一对象; 为数学常量和数学函数提供的属性/方法; 
  Member: 
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
    Math.exp(num)       Math.E 的num次幂
    Math.log(num)       num的自然对数
    Math.pow(num,power) num的power次幂
    Math.sqrt(num)      num的平方根
    Math.sin(x)     求正弦值
      Example: 
      Math.sin(30/180*Math.PI);  //0.49999999999999994
    Math.cos(x)     求余弦值
    Math.tan(x)     求正切值
    Math.acos(num)  num的反余弦值
    Math.asin(num)  num的反正弦值
    Math.atan(num)  num的反正切值
    Math.atan2(num1,num2) num1/num2的反正切值
    其他  
    Math.trunc()  去除一个数的小数部分,返回整数部分[ES6] 
      PS:若传入的参数是整数,就直接返回整数,若是小数,就去除了小数部分,返回整数部分
      Math.trunc(3);   // 3
      Math.trunc(3.1); // 3
    Math.sign()   判断一个值到底是正数、负数、零还是NaN[ES6] 
      参数若是正数,结果返回1；
      若是负数,结果返回-1；
      若是0,结果返回0；
      若是一个非数值类型的参数,结果返回:NaN。
      Math.sign(3); //结果:1
      Math.sign(-3); //结果:-1
      Math.sign(0); //结果:0
      Math.sign('abc'); //结果:NaN
    Math.cbrt()   计算一个数的立方根[ES6] 
      Math.cbrt(8);  //2
      Math.cbrt(27); //3
    Math.acosh(x) 返回 x 的反双曲余弦 [ES6]
    Math.asinh(x) 返回 x 的反双曲正弦 [ES6]
    Math.atanh(x) 返回 x 的反双曲正切 [ES6]
    Math.clz32(x) 返回 x 的 32 位二进制整数表示形式的前导 0 的个数 [ES6]
    Math.sinh(x)  返回x的双曲正弦 [ES6]
    Math.cosh(x)  返回 x 的双曲余弦 [ES6]
    Math.expm1(x) 返回 eˆx - 1 [ES6]
    Math.fround(x) 返回 x 的单精度浮点数形式 [ES6]
    Math.hypot(...values) 返回所有参数的平方和的平方根 [ES6]
    Math.imul(x, y) 返回两个参数以 32 位整数形式相乘的结果 [ES6]
    Math.log1p(x)   返回 1 + x 的自然对数 [ES6]
    Math.log10(x)   返回以 10 为底的x的对数 [ES6]
    Math.log2(x)    返回以 2 为底的 x 的对数 [ES6]
    Math.tanh(x)    返回 x 的双曲正切 [ES6]
JSON'JavaScript Object Notation'JavaScript对象表示法 [IE8+]
  PS: 基于文本、独立于语言的轻量级数据交换格式;非构造函数/类,实际为对象 
    利用JS中的一些模式来表示结构化数据,广泛用于数据的传送和数据的交换, 
    每个JSON对象只能是一个值,即每个JSON文档只能包含一个值;
    ES5对解析JSON的行为进行了规范,定义了全局对象JSON对象
  Member: 
    JSON.stringify(val[,arr/foo,num/str])   str,序列化,将JS值转换为JSON字符串 
      PS: 所有函数及原型成员都会被有意忽略 
      val       需序列化的值 
      arr/foo   可选,过滤器,当为 null 时表示不过滤  
        ◆arr 结果中将只包含数组中列出的属性 
        var obj = {
          aoo: 1
          ,boo: 'abc'
          ,coo: ['abc',11]
        }
        console.log(JSON.stringify(obj,["aoo","coo"]));
        // {"aoo":1,"coo":["abc",11]} 
        ◆foo(key,val),结果为函数返回值 
        当值为非键值对结构时,键名可为空字符串
        var obj = {
          aoo: 1
          ,boo: 'abc'
          ,coo: [11,22]
        }
        var jsonStr = JSON.stringify(obj,function(key,val){
          switch(key) {
            case 'aoo':
              return 1;
              break;
            case 'coo':
              return 3;
              break;
            default:
              return val;
          }
        });
        console.log(jsonStr);
        // {"aoo":1,"boo":"abc","coo":3} 
        其中为值undefined的被忽略
      num/str   可选,缩进排版选项  
        ◆num  每级缩进的空格数,范围'1-10'[超过10仍取10] 
        ◆str  作为缩进字符,字符长度不可超过10  
        var obj = {
          key1: 1
          ,key2: 2
        }
        console.log(JSON.stringify(obj,null,2));
        // {
        //   "key1": 1,
        //   "key2": 2
        // }
        console.log(JSON.stringify(obj,null,'=='));
        // {
        // =="key1": 1,
        // =="key2": 2
        // }
      Example: 
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
    JSON.parse(JSONstr[,foo(key,val)])   val,反序列化,将JSON字符串转换为JS值 
      PS: 若还原中存在undefined会被删除 
      JSONstr  有效的JSON字符串,否则报错
      foo(key,val)  可选,还原函数 
        若返回 undefined,则表示删除相应的键,否则将该值插入到结果中 
        函数共进行 n+1 次,其余每次对应改变相应的值,最后一次返回值表示最终值 
        var obj = {
          key1: 1
          ,key2: 2
        }
        var str = JSON.stringify(obj)
        var obj1 = JSON.parse(str,function(key,val){
          if (key == 'key1') {
            return 11;
          }
          else {
            return val;
          }
        })
        console.log(obj1); // {key1: 11, key2: 2} 
  Feature: 
    JSON值类型和格式:  
    null Boolean Number[只能十进制] String Array Object 
    String、对象的键需用"双引号",数组或对象的最后一个成员不能加逗号 
    不能表示: undefined NaN Infinity,函数,时间对象,正则对象    
      ◆当为对象时:
      undefined 项将被忽略 
      NaN、Infinity 转换为 null
      函数项将被忽略 
      时间对象转换为字符串表示 
      正则对象转换为空对象表示 
      Example: 
      var obj = { 
        a: undefined,
        b: NaN,
        c: Infinity,
        d: new Date(),
        e: function(){
          console.log(11);
        },
        f: /aoo/
      };
      console.log(JSON.stringify(obj));
      // {"b":null,"c":null,"d":"2017-11-15T07:04:42.793Z","f":{}} 
      ◆当为数组时
      undefined、函数 转换为 null 
      var arr = [
        function(){
          console.log(11);
        },
        undefined
      ]
      console.log(JSON.stringify(arr));
      // [null,null] 
    Example: 
      JSON.stringify("aoo"); // ""aoo""
      JSON.stringify("aoo") === "\"aoo\"";  // true
      引号使用\转义, 将来还原时,双引号让JS引擎知道aoo为字符串而非变量名
      
      { "aoo" : "style="color:red;"" }
      格式错误,可改为
      { "aoo" : "style=\"color:red;\"" }
      或 
      { "aoo" : "style='color:red;'" }
  Accu:  
    使用 JSON 的函数进行序列化和反序列化来本地保存
    JSON 可以将JS中一组数据转换为字符串,然后就可以在函数之间轻松地传递这个字符串



