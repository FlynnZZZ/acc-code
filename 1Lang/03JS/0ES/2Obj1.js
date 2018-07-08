Global|window,全局对象 
  PS: global对象未定义如何访问,浏览器中用window对象实现全局访问;
    所有全局作用域中定义的变量和函数,都是Global对象的属性和方法,
    var global = function(){ return this; }  间接获取Global对象
  Member: 
    ★属性: Infinity NaN undefined null 
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
Math,数学对象 
  PS: 非构造函数/类,实际为一对象; 为数学常量和数学函数提供的属性/方法; 
  Member: 
    数学值常量  
    Math.PI         π的值,3.141592653589793 
    Math.SQRT2      2 的平方根,1.4142135623730951  
    Math.SQRT1_2    1/2 的平方根,0.7071067811865476  
    Math.E          自然对数的底数,即常量e的值[也叫欧拉参数],2.718281828459045
    Math.LN10       10 的自然对数,2.302585092994046 
    Math.LN2        2 的自然对数,0.6931471805599453
    Math.LOG2E      以2为底e的对数,1.4426950408889634 
    Math.LOG10E     以10为底e的对数,0.4342944819032518 
    Math.random();  返回一个介于0到1之间不包括0和1的随机数 
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
JSON'JavaScript Object Notation'JavaScript对象表示法[IE8+] 
  PS: 基于文本、独立于语言的轻量级数据交换格式;非构造函数/类,实际为对象 
    利用JS中的一些模式来表示结构化数据,广泛用于数据的传送和数据的交换, 
    每个JSON对象只能是一个值,即每个JSON文档只能包含一个值;
    ES5对解析JSON的行为进行了规范,定义了全局对象JSON对象
  Member: 
    JSON.stringify(val ,<filter>? ,<indent>?)   str,序列化,将JS值转换为JSON字符串 
      PS: 所有函数及原型成员都会被有意忽略 
      val       需序列化的值 
      filter    可选,过滤器,当为 null 时表示不过滤  
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
      indent    可选,缩进排版选项  
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
--------------------------------------------------------------------------------
Promise,同步书写异步模式[ES6] 
  PS: 将原来异步函数的嵌套关系转变为'同步'的链式关系; 
    Promise对象是一个代理对象,代理了最终返回的值,可以在后期使用; 
    将异步操作封装成Promise对象,然后使用该对象的'then''catch'等方法,进行链式写法完成异步操作;
  Static: 
    Promise.length    '1',构造器参数的数目 
    Promise.all(pmsArr)  Promise,全局模式 
      Input: 由Promise对象组成的数组 
      Output: 'settled'状态的Promise 
        所有Promise都'fulfilled',则输出'fulfilled'的Promise 
          传递值为每个Promise'fulfilled'状态传递值组成的数组 
        有一个Promise为'rejected'则输出'rejected'的Promise 
          传递值为第一个'rejected'的Promise'rejected'的传递值 
    Promise.race(pmsArr) Promise,竞速模式 
      Input: 由Promise对象组成的数组 
      Output: 首个'settled'的Promise,状态和传递值由该Promise决定 
    Promise.resolve(val)    返回'fulfilled'状态的Promise  
      根据输入不同存在3种情况: 
      Input: Promise 
        Output: 该Promise,由该Promise决定传递值  
          Promise.resolve(new Promise(function(rs,rj){
            setTimeout(function(){
              rj('传递的信息')
            },1000)
          }))
          .catch(function(info){
            console.log(info);
          })
          // 传递的信息 
      Input: 带有'then'方法的非Promise对象 
        Output: 状态和传递值由定义的then方法执行决定的Promise 
        Promise.resolve({
          then: function(rs,rj){
            // console.log(arg(11),'thenable');
            // rs('boo')
            rj('boo1')
          }
        })
        .then(function(data){
          console.log(data);
        }
        ,function(msg){
          console.log(msg);
        })
      Input: 其他值 
        Output: 'fulfilled'状态的Promise,传递val值  
        Promise.resolve('传递的数据')
        .then(function(msg){
          console.log(msg);
        })
    Promise.reject(val)     返回'rejected'状态的Promise 
  Instance: 
    new Promise(fn)  
      Input: fn  必选,传入参数 (rs,rj)  
        PS: Promise在创建时,参数函数就会执行 
          若在方法的执行过程中抛出了任何异常,那么promise立即'rejected' 
        rs/rj 函数根据逻辑需要进行相应的执行 
          rs(data) 将该Promise变成'fulfilled',传递data值 
            传入不同类型的值,函数输出和传递值的逻辑同 Promise.resolve() 
          rj(info) 将该Promise变成'rejected',传递info值 
            传入不同类型的值,函数输出和传递值的逻辑同 Promise.reject() 
          rs/rj 后,若该函数未return,则会继续向后执行,但不影响Promise的状态和值的传递 
            new Promise(function(rs,rj){
              rs('success')
              console.log('仍会执行该打印操作');
            })
            .then(function(data){
              console.log(data);
            })
            // 仍会执行该打印操作
            // success
  Proto: 
    .then(val1 ,val2?)       // Promise,根据调用的Promise的状态进行回调 
      val1   any,'fulfilled'状态下的回调 
        function(data){ // 函数类型的值 
          // data   'fulfilled'状态的传递值  
          return val // 可选,改变输出Promise及传递值  
            非Promise值: 输出'fulfilled'的Promise,传递值为该值  
            promise: 输出该Promise,传递值由该Promise决定  
        } 
        非函数值,则默认为: function(arg){ return arg; }
      val2   any,'rejected'状态下的回调 
        function(info){ // 函数类型的值  
          PS: 当该回调不存在时,失败会继续向后传递,直到遇到错误处理,进行回调;
            存在则捕获失败状态,后续Promise状态为'rejected' 
          // info   Promise传递的值  
          return val // 可选,改变输出的Promise及传递值    
            非Promise值: 输出'fulfilled'的Promise,传递值为该值  
            promise: 输出该Promise,传递值由该Promise决定  
        }  
        非函数值,则默认为: function(arg){ return arg; }
    .catch(function(info){   // Promise,处理操作异常 
      // info  'rejected'状态的传递值/报错时的信息  
      return val  // 可选,改变输出的Promise及传递值 
        非Promise值: 输出'fulfilled'的Promise,传递值为该值  
        promise: 输出该Promise,传递值由该Promise决定  
    })                   
    .finally(function(){     // Promise,最终将执行的操作 
      return val // 可选,改变输出的Promise及传递值 
        非Promise值: 输出'fulfilled'的Promise,传递值为该值  
        promise: 输出该Promise,传递值由该Promise决定  
    })                 
  Feature: 
    Promise是一个状态机,只能从'pending'状态,转换为'settled'
      'pending': 初始状态,未完成或拒绝 
      'fulfilled': 成功状态  
      'rejected': 失败状态 
      'settled': 'fulfilled'和'rejected'的统称 
      可在'settled'状态下进行回调操作 
    Promise的缺点 
      首先,无法取消Promise,一旦新建它就会立即执行,无法中途取消 
      其次,若不设置回调函数,Promise内部抛出的错误,不会反应到外部 
      第三,当处于'Pending'状态时,无法得知目前进展到哪一个阶段,刚刚开始还是即将完成 
  Accu: 
    定一方法,功能:使Promise从'pending'到'settled',并指定传递数据 // TODO 
      foo(pms,data,bol)
        pms   Promise对象 
        data  传递的数据 
        bol   true 表示状态变为'fulfilled';false 表示状态变为'rejected' 
Symbol,标记,JS的第七种数据类型[原始数据类型],表示独一无二的值[ES6] 
  PS: 不可改变,用来产生唯一的标识,ES6已经允许属性名的类型是 Symbol 
  Extend: Object 
    console.log(Symbol.prototype.__proto__.constructor===Object); // true 
  Static:  
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
        判断左侧的运算子是否为Array的实例.
    Symbol.species      对象的该属性指向其构造函数
      创造实例时,默认会调用这个方法,即使用这个属性返回的函数当作构造函数,来创造新的实例对象.
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
      下面是一个例子.
      const x = {};
      x[Symbol.replace] = (...s) => console.log(s);
      
      'Hello'.replace(x, 'World') // ["Hello", "World"]
      Symbol.replace方法会收到两个参数,第一个参数是replace方法正在作用的对象,上面例子是Hello,第二个参数是替换后的值,上面例子是World.
    Symbol.search   当对象被 String.prototype.search 方法调用时,会返回该方法的返回值.
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
      下面是一个例子.
      
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
    Symbol.iterator 对象的 Symbol.iterator 属性,指向该对象的默认遍历器方法.
      var myIterable = {};
      myIterable[Symbol.iterator] = function* () {
        yield 1;
        yield 2;
        yield 3;
      };
      
      [...myIterable] // [1, 2, 3]
      对象进行for...of循环时,会调用Symbol.iterator方法,返回该对象的默认遍历器,详细介绍参见《Iterator和for...of循环》一章.
      
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
    Symbol.toPrimitive 对象的 Symbol.toPrimitive 属性,指向一个方法.
      该对象被转为原始类型的值时,会调用这个方法,返回该对象对应的原始类型值.
      Symbol.toPrimitive 被调用时,会接受一个字符串参数,表示当前运算的模式,一共有三种模式.
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
      对象的Symbol.toStringTag属性,指向一个方法.在该对象上面调用Object.prototype.toString方法时,若这个属性存在,它的返回值会出现在toString方法返回的字符串之中,表示对象的类型.也就是说,这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串.
      
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
  Instance: 
    创建标记 
    var sym = Symbol([arg])   创建标记 
      PS:Symbol函数前不能使用new命令,否则会报错.
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
  Proto: 
    .valueOf()
    .toString()
  Feature: 
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
      Symbol值作为对象属性名时,不能用点运算符.
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
Set,集合[ES6] 
  PS: Set中的元素无重复项[会自动去掉重复的元素]; Set集合中,key和val为同一个值;
  Extend: Object 
    console.log(Set.prototype.__proto__.constructor===Object); // true  
  Instance:  
    new Set([arr])  创建set
      var s1 = new Set();  // 创建一个集合
      var s2 = new Set([1,2,3,2,4]); //创建并初始化
      console.log(s2);     // Set {1, 2, 3, 4} , 自动过滤掉了重复的元素
  Proto: 
    .size  返回元素的个数,类型为数值
    .add(val) 添加元素
    .delete(val) 删除元素,成功返回true,否则为false 
      var s = new Set([1,2,3]);
      console.log(s); // Set {1, 2, 3}
      s.delete(2);    // true
      s.delete(4);    // false
      console.log(s); // Set {1, 3}
    .clear()     删除所有元素
      var s = new Set([1,2,3]);
      console.log(s); // Set {1, 2, 3}
      s.clear();
      console.log(s); // Set {}
    .has(val) 检测元素是否存在,存在返回true,否则返回false
      var s = new Set([1,2,3]);
      s.has(1); // true
      s.has(4); // false
    .entries() 返回一个键值对的遍历器
      var s = new Set(['a','b','c']);
      var aoo = s.entries(); 
      console.log(aoo); // SetIterator {"a", "b", "c"}
    .keys()   返回键名的遍历器
    .values() 返回键值的遍历器
      var s = new Set(['a','b','c']);
      var aoo = s.keys();  
      var boo = s.values();
      console.log(aoo); // SetIterator {"a", "b", "c"}
      console.log(boo); // SetIterator {"a", "b", "c"}
    .forEach() 遍历
      var s = new Set(['a','b','c']);
      s.forEach(function(value,key){
        console.log(value,key)
      });
      // a  a
      // b  b
      // c  c
  Feature: 
    'for-of'遍历Set结构
      var s = new Set(['a','b','c']);
      for(let [i,v] of s.entries()){
        console.log(i+' '+v);
      }
      // a  a    
      // b  b   
      // c  c   
  Set的用途
    实现数组去重
    let arr = [1,2,2,3,4,4,4];  // 目标数组arr,要求去重
    let newArr = Array.from(new Set(arr)); // [1,2,3,4],完成去重
WeakSet, [ES6] 
  PS: WeakSet结构同样不会存储重复的值;
    且其成员必须是对象类型的值[严格来说是:具有 iterable 接口的对象]
    实际上,任何可遍历的对象,都可以作为WeakSet的初始化参数,如:数组.
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
    因为它的成员都是对象的弱引用,随时被回收机制回收,成员消失.
    所以WeakSet结构无keys(),values(),entries(),forEach() 等方法和 size 属性
Map,字典[ES6] 
  var map = new Map([arr]) 定义Map 
    arr  可选,数组
    var mp1 = new Map()
    let mp2 = new Map([
      ["name","aoo"],
      ["gender",1]
    ]);
    console.log(mp2); // Map(2) {"name" => "aoo", "gender" => 1}
  map.size   获取实例的成员数
    let map = new Map();
    map.set(1,3);
    map.set('1','3');
    map.size;// 2
  map.set(key,val) 增加,给实例设置一对键值对,返回map实例
    key可以为各种类型的值
      let map = new Map();
      map.set("name","aoo"); // 添加一个string类型的键名
      map.set(1,2);          // 添加一个数字类型的键名
      console.log(map); // Map(2) {"name" => "aoo", 1 => 2}
      map.set([1],2);            // 数组类型的键名
      map.set({"age":"15"},2);   // 对象类型的键名
      map.set(true,2);           // 布尔类型的键名
      map.set(Symbol('name'),2); // Symbol类型的键名
      map.set(null,2);           // null为键名
      map.set(undefined,2);      // undefined为键名
      console.log(map);
      // Map(8) {"name" => "aoo", 1 => 2, [1] => 2, Object {age: "15"} => 2, true => 2…}
    若设置一已经存在的键名,后面的键值会覆盖前面的键值
      let map = new Map();
      map.set("aoo","boo");
      console.log(map);     // Map(1) {"aoo" => "boo"}
      map.set("aoo","coo"); // 再次设置name的值
      console.log(map);     // Map(1) {"aoo" => "coo"}
  map.get(val)     返回指定键名的键值
    获取存在对应的键值,若键值对存在,就会返回键值;否则,返回undefined;
    let map = new Map([["aoo","boo"]]);
    map.get("aoo"); // "boo"
    map.get("coo"); // undefined
  map.delete(key)  删除指定的键值对,删除成功返回true,否则返回false
    let m = new Map();
    m.set("aoo","boo");
    m.delete("aoo"); // true
    m.delete("coo"); // false
  map.clear()      一次性删除所有键值对
  map.has(key)     判断Map实例内是否含有指定的键值对,有返回true,否则返回false
    let map = new Map();
    map.set("aoo","boo");
    map.has('aoo'); // true
    map.has('coo'); // false
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
    keys方法和values方法的使用方式一致,只是返回的结果不同.
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
    let map = new Map([
      ["name","van"],
      ["age",25]
    ]);
    map.forEach(function(value,key){
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
      若这个引用类型的值被垃圾机制回收了,WeakMap实例中的对应键值对也会消失.
WeakMap, 
Proxy,对象代理: 用于代理外界对对象的访问[ES6] 
  PS: 将一对象交给了Proxy代理,然后代理对象的读写等操作
    要使得Proxy起作用,必须针对Proxy实例进行操作,而不是针对目标对象进行操作
  pObj = new Proxy(obj,config) 创建代理对象  
    obj    代理的目标对象
    config = { // 配置对象,用于代理的行为 
        PS: 若没有设置任何代理操作,则等同于直接通向原对象
        get: function(target,key,receiver){        // 代理读 
          // target 代理的目标对象 
          // key    读的属性 
          Example:
            var person = {"name":"张三"};
            var pPerson = new Proxy(person,{ 
              get: function(target,property){
                console.log('1',target,property);
                return "李四"
              }
            });
            console.log(pPerson.name); //李四
        },     
        set: function(target,key,val,receiver){  // 代理写 
          // target  同'set'
          // key     同'set'
          // val     设置的值 
          Example: 
            var bankAccount = {"RMB":1000,"dollar":0};
            var pBankAccount = new Proxy(bankAccount,{  
              get: function(target,property){  
                if(target[property] > 0){  
                  return target[property];
                }
                else{
                  return "余额不足"; 
                }    
              },
              set: function(target,property,value){  
                if(!Number.isInteger(value)){ // 存入的数额必须是一个数字类型
                  console.log(value,'数值不正确');
                  return "请设置正确的数值";
                }
                else {
                  target[property] = value;  // 修改属性的值
                  console.log('存款成功');
                }
              }
            });
            pBankAccount.RMB;    // 1000,查款
            pBankAccount.dollar; // 余额不足,查款
            pBankAccount.dollar = "五百"; // 五百 数值不正确,存款
            pBankAccount.dollar;          // 余额不足,查款
            pBankAccount.dollar = 500;    // 存款成功,存款
            pBankAccount.dollar;          // 500,查款
        },
        has: function(target,key){ // 代理 key in obj 操作 
          Example: 
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
        },
        deleteProperty: function(target,key){ // 代理 delete proxy[propKey]
        },
        ownKeys: function(target){ 
          // 代理:   
          // Object.getOwnPropertyNames(proxy)、
          // Object.getOwnPropertySymbols(proxy)、
          // Object.keys(proxy)
          let person = {"name":"老王","age":40,"height":1.5};
          let proxy = new Proxy(person,{ 
            ownKeys : function(target){  // ownKeys过滤对对象的属性遍历
              return ["name","age"] 
            }
          });
          Object.keys(person); // ["name", "age","height"],未使用代理
          Object.keys(proxy);  // ["name", "age"]
        },
        getOwnPropertyDescriptor: function(target,key){ 
          // 代理 Object.getOwnPropertyDescriptor(obj,key)
        },
        defineProperty: function(target,key,propDesc){
          // 代理 
          // Object.defineProperty(proxy, propKey, propDesc）
          // Object.defineProperties(proxy, propDescs)
        },
        preventExtensions: function(target){
          // 代理 Object.preventExtensions(proxy) 
        },
        getPrototypeOf: function(target){
          // 代理 Object.getPrototypeOf(proxy) 
        },
        isExtensible: function(target){
          // 代理 Object.isExtensible(proxy) 
        },
        setPrototypeOf: function(target, proto){
          // 代理 Object.setPrototypeOf(proxy, proto) 
        },
        // 如果目标对象是函数 
        apply: function(target, object, args){ // 代理函数对象的执行 
          // 代理 如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...) 等 
          let foo = function(){
            console.log('我是原始函数');
          };
          let proxy = new Proxy(foo,{  //创建一个代理实例,代理函数foo
            apply : function(){
              console.log('我是代理函数');
            }
          });
          proxy(); // 我是代理函数
        },
        construct: function(target, args){ // 代理构造函数调用的操作,如new proxy(...args)
        }
      }
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
Reflect,为操作对象提供的API[ES6] 
  目的:  
  将对象上一些明显属于语言内部的方法[如 Object.defineProperty]放到Reflect 
  Reflect方法操作失败返回false[而不像其他的操作失败可能会报错]
  让Object操作都变成函数行为 
    命令式如:  key in obj;  delete obj[key];
    函数行为:
    Reflect.has(obj, key)
    Reflect.deleteProperty(obj, key) 
  Static: 
    PS: 大部分与Object对象的同名方法的作用都是相同的,且与Proxy对象的方法是一一对应 
    .get(obj,key,receiver)    返回对象的key,否则返回undefined 
      obj  操作的目标对象,若不是对象则报错  
      如果name属性部署了读取函数（getter）,则读取函数的this绑定receiver 
        var myObject = {
          foo: 1,
          bar: 2,
          get baz() {
            return this.foo + this.bar;
          },
        };
        var myReceiverObject = {
          foo: 4,
          bar: 4,
        };
        Reflect.get(myObject, 'baz', myReceiverObject) // 8
    .set(obj,key,val,receiver) 设置对象的key为val 
      如果name属性设置了赋值函数,则赋值函数的this绑定receiver.
      var myObject = {
        foo: 4,
        set bar(value) {
          return this.foo = value;
        },
      };
      var myReceiverObject = {
        foo: 0,
      };
      Reflect.set(myObject, 'bar', 1, myReceiverObject);
      myObject.foo // 4
      myReceiverObject.foo // 1
    .apply(target,context,args)
    .construct(target,args)
    .defineProperty(target,name,desc)
    .deleteProperty(target,name)
    .has(target,name)
    .ownKeys(target)
    .isExtensible(target)
    .preventExtensions(target)
    .getOwnPropertyDescriptor(target, name)
    .getPrototypeOf(target)
    .setPrototypeOf(target, prototype)
--------------------------------------------------------------------------------
◆二进制数组,以数组的语法处理二进制数据[ES6] 
  PS: 二进制数组由 ArrayBuffer&TypedArray&DataView 三类对象组成, 
    它们早就存在,属于独立的规格,ES6将其纳入ECMAScript规格,并增加了新方法,
    该接口的原始设计目的,与WebGL项目有关
    浏览器与显卡间的通信接口,使用二进制才能满足大量的、实时的数据交换, 
    直接操作字节,脚本的性能大幅提升,二进制数组就是在这种背景下诞生的 
ArrayBuffer,内存中的一段二进制数据 
  Extend：Object 
  Instance: new ArrayBuffer(num) 
    var buffer = new ArrayBuffer(20);  // 在内存中分配20B 
  Proto: 
    .byteLength // 包含的字节数 
    .slice()    
数据类型 字节长度 对应C语言中的类型  含义 
  Int8     1     signed char      8 位整数 
  Uint8    1     unsigned char    8 位无符号整数 
  Uint8C   1     unsigned char    8 位无符号整数[自动过滤溢出] 
  Int16    2     short            16 位整数 
  Uint16   2     unsigned short   16 位无符号整数 
  Int32    4     int              32 位整数 
  Uint32   4     unsigned int     32 位无符号的整数 
  Float32  4     float            32 位浮点数 
  Float64  8     double           64 位浮点数 
DataView,不确定类型的二进制数据 
  PS: 支持除'Uint8C'外的其他8种组成的集合  
    比如第一个字节是Uint8,第二个字节是Int16,第三个字节是Float32等等  
  Extend: Object 
  Instance: 
    var view = new DataView(buffer[,bgn[,length]]) // 通过Buffer类型创建  
      buffer  ArrayBuffer对象 
      bgn     num,可选,字节偏移量,从该字节开始选择 \
        //创建一个开始于字节9 的新视图
        var view = new DataView(buffer, 9);
      length  num,可选,要选择的字节数 
        //创建一个从字节9 开始到字节18 的新视图
        var view = new DataView(buffer, 9, 10);
  Proto: 
    .buffer       // 获取buffer对象 
    .byteOffset   // 偏移量 
    .byteLength   // 字节长度 
    ★读写方法 
      PS: 保存不同类型的数据,需要的空间不同,如无符号8 位整数要用1B,而32 位浮点数则要用4B
        使用DataView,需自己来管理这些细节,即要明确知道数据需要多少字节,并选择正确的读写方法
      offset   num,字节偏移量,表示要从哪个字节开始读取或写入 
      littleEndian  bol,表示读写数值时是否采用小端字节序 
        即将数据的最低有效位保存在低内存地址中 
    .getInt8(offset)  
    .getUint8(offset)  
    .getInt16(offset,littleEndian)  
    .getUint16(offset,littleEndian)  
    .getInt32(offset,littleEndian)  
    .getUint32(offset,littleEndian)  
    .getFloat32(offset,littleEndian)  
    .getFloat64(offset,littleEndian)  
    .setInt8(offset,val)  
    .setUint8(offset,val)  
    .setInt16(offset,val,littleEndian)  
    .setUint16(offset,val,littleEndian)  
    .setInt32(offset,val,littleEndian)  
    .setUint32(offset,val,littleEndian)  
    .setFloat32(offset,val,littleEndian)  
    .setFloat64(offset,val,littleEndian)  
TypedArray[不可直接访问],类型化数组,确定类型的二进制数据 
  Relate: <TypedArray>.prototype.__proto__.constructor===TypedArray
  Proto:  
    .buffer 
    .byteLength 
    .byteOffset 
    .length 
    .subarray(bgn,end)  // 基于底层数组缓冲器的子集创建一新视图
    .entries() 
    .keys() 
    .values() 
    .copyWithin() 
    .fill() 
    .includes() 
    .indexOf() 
    .lastIndexOf() 
    .slice() 
    .set() 
    .find() 
    .findIndex() 
    .toLocaleString() 
    .join() 
    .toString() 
    .forEach() 
    .every() 
    .map() 
    .reverse() 
    .reduce() 
    .reduceRight() 
    .some() 
    .filter() 
    .sort() 
<TypedArray> 
  Static: 
    <TypedArray>.BYTES_PER_ELEMENT  num,类型化数组的每个元素需要多少字节 
    Uint8Array.BYTES_PER_ELEMENT    1 
    Float32Array.BYTES_PER_ELEMENT  4 
    ...
    Example: 
      利用该属性来辅助初始化
      // 需要10 个元素空间
      var int8s = new Int8Array(buffer, 0, 10 * Int8Array.BYTES_PER_ELEMENT);
  Instance: 
    var typedArray = new <TypedArray>(buffer[,bgn[,length]]); 
    var typedArray = new <TypedArray>(num); 
      // 创建一个数组保存10 个8 位整数[10 字节] 
      var int8s = new Int8Array(10); 
      // 创建一个数组保存10 个16 位整数[20 字节] 
      var int16s = new Int16Array(10); 
    var typedArray = new <TypedArray>(arr); // 把常规数组转换为类型化视图 
      PS: 用默认值来初始化类型化视图的最佳方式 
      // 创建一个数组保存5 个8 位整数[5 字节]
      var int8s = new Int8Array([10, 20, 30, 40, 50]);
  Feature: 
    若为相应元素指定的字节数放不下相应的值,则实际保存的值是最大可能值的模 
      如无符号16 位整数所能表示的最大数值是65535,如果想保存65536,那实际保存的值是0,
      保存65537,那实际保存的值是1,依此类推。
      var uint16s = new Uint16Array(10);
      uint16s[0] = 65537;
      console.log(uint16s[0]); // 1
  Example: 
    // 使用缓冲器的一部分保存8 位整数,另一部分保存16 位整数 
    var int8s = new Int8Array(buffer, 0, 10);
    var uint16s = new Uint16Array(buffer, 11, 10);
Int8Array,   
Uint8Array,   
Uint8ClampedArray,    
Int16Array,      
Uint16Array,      
Int32Array,      
Uint32Array,    
Float32Array,     
Float64Array,    
◆Error,错误类 
  PS: JS解析或执行时,当发生错误就会抛出一错误对象,并且程序中断在发生错误的地方 
    JS原生提供一个Error构造函数,所有抛出的错误都是这个构造函数的实例 
    ECMA-262 定义了7种错误类型,Error是其他六种的父类型
  Extend: Object 
    console.log(Error.prototype.__proto__.constructor===Object); // true 
  Static: 
    Error.captureStackTrace() 
    Error.stackTraceLimit 
  Instance: 
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
  Proto: 
    .message   可以读取的错误消息 [标准属性]
    .name      错误名称   [非标]
    .description  可以读取的错误消息 [IE定义]
    .number   错误数量 [IE定义]
    .stack    错误的堆栈 [非标] 
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
    .toString() 
TypeError,变量或参数不是预期类型时发生的错误 
  比如,对字符串、布尔值、数值等原始类型的值使用new命令,就会抛出这种错误,
  因为new命令的参数应该是一个构造函数
ReferenceError,引用一个不存在的变量时发生的错误 
  另一种触发场景,将一个值分配给无法分配的对象,比如对函数的运行结果或者this赋值
RangeError,一个值超出有效范围时发生的错误 
  主要场景: 数组长度为负数,Number对象的方法参数超出范围,函数堆栈超过最大值
URIError,URI相关函数的参数不正确时抛出的错误 
  主要涉及 encodeURI() decodeURI() encodeURIComponent() 
  decodeURIComponent() escape() unescape() 六个函数
SyntaxError,解析代码时发生的语法错误 
EvalError,使用 eval()发生异常时抛出 
  已不再在ES5中出现,仅为了保持兼容 
--------------------------------------------------------------------------------





