Object,对象基础类,ES中所有对象的基类 
  Extend：null 
    console.log(Object.prototype.__proto__); // null  
    JS中所有对象实例都继承自Object类型 
      Object.prototype.foo = function(){ // 所有类型的对象都会继承到 
        return '来自Object'
      }
      var goo = function(){}
      var arr = []
      console.log(goo.foo()); // 来自Object 
      console.log(arr.foo()); // 来自Object 
  Static: 
    Object.create()  [moIn 引用类型]  
    Object.is(val1,val2)  bol,值是否相同[按外形比较][ES6] 
      与 == 和 === 的逻辑都不同 
      Example:
      Object.is(+0,-0);    // false
      Object.is(0,0);      // true
      Object.is(NaN, NaN); // true
    Object.assign(obj1[,obj2,..])  obj,返回合并后的对象[ES6]  
      PS: 参数可以是多个[至少是两个]
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
      Example:
      console.log(Object.assign({aoo:"abc"})); // {aoo: "abc"} 
    Object.entries() 
    Object.values()   
    Object.getOwnPropertySymbols 
    ★对象成员操作 
    Object.keys(obj)  arr,获取可枚举的自有成员 [ES5] 
      Object.keys(obj).length;    获取对象的"长度"
    Object.getOwnPropertyNames(obj)  arr,所有[包括不可枚]的自有成员 [ES5] 
      var obj = {
        aoo: 1,
        boo: 'a'
      }
      Object.defineProperty(obj,'coo',{
        value : 11
      });
      obj.__proto__.doo = '111111111';
      console.log(obj); // {aoo: 1, boo: "a", coo: 11} 
      console.log(Object.getOwnPropertyNames(obj)); // ["aoo", "boo", "coo"] 
      var arr = [];
      for(var key in obj){
        arr.push(key);
      };
      console.log(arr); // ["aoo", "boo", "doo"] 
    ★原型相关 
    Object.getPrototypeOf() obj,获取对象的prototype属性[ES6] 
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
    Object.setPrototypeOf() 设置对象的prototype属性[ES6] 
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
    ★属性特性相关 
    Object.getOwnPropertyDescriptor(obj,key)  obj,成员的特性配置 [ES5] 
      PS: 可对DOM或BOM对象使用该方法;若查询的属性不存在则返回 undefined 
        如果是访问器属性,这个对象的属性有configurable、enumerable、get 和set;
        如果是数据属性,这个对象的属性有configurable、enumerable、writable 和value 
      console.log(Object.getOwnPropertyDescriptor({aoo:"a"},"aoo"));
      // Object {value: "a", writable: true, enumerable: true, configurable: true}
    Object.getOwnPropertyDescriptors(obj)  obj,所有成员的特性配置 [ES5]
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
    Object.isExtensible(obj) bol,能否增加成员[ES5] 
    Object.isSealed(obj)     bol,是否被密封[ES5] 
    Object.isFrozen(obj)     bol,是否被冻结[ES5] 
    Object.preventExtensions(obj)  阻止给对象新增属性[ES5] 
      PS: 但可修改和删除已有属性; 只是对对象操作,对其原型链无影响
    Object.seal(obj)     不可扩展、配置  [ES5]
      PS: 只是对对象操作,对其原型链无影响
    Object.freeze(obj)   不可写、扩展、配置[最严格的防篡改级别][ES5] 
      PS: 只是对对象操作,对其原型链无影响
  Proto:  
    .constructor  fn,实例的构造函数 
    .valueOf()  对象转换为基本类型,通常与'toString'返回值相同  
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
    .toString([radix]) 对象转换为基本类型 
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
    .toLocaleString() 对象的本地字符串表示,通常与toString的返回值相同 
    .hasOwnProperty(key)   bol,属性是否存在[不包括原型链]   
      var obj = {key1: 1}
      console.log(obj.hasOwnProperty('key1'));  // true
    .propertyIsEnumerable(key) bol,属性能否通过'for-in'枚举 
    .isPrototypeOf(obj)  bol,是否处于目标对象原型链上  
      Example:
      function Foo(){};
      var aoo = new Foo();
      console.log(Foo.prototype.isPrototypeOf(aoo));    // true
      console.log(Object.prototype.isPrototypeOf(aoo)); // true
  Feature: 
    属性/方法简写 [ES6]
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
    属性名可以是表达式[ES6] 
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
Function,函数基础类,ES中所有函数的基类  
  PS: JS中函数是唯一能创建新作用域的地方;  
  Extend：Object 
    Function.prototype instanceof Object // true 
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
    .arguments    函数的参数 
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
    .call(context[,arg1,arg2,...]) 改变函数的执行上下文this 
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
    .apply(context[,arr/arrLike])  改变函数的执行上下文this 
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
    .bind(context[,arg1,arg2,...]) fn,返回改变函数this和初始化参数后的拷贝[ES5]
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
  Feature: 
    函数传参 
      传入的参数不固定,多则舍去,少则用undefined来补充 
        function foo(){ 
          console.log(arguments[0],arguments[1]); 
        };
        foo(1); // 1 undefined
      参数按共享传递 [moIn 'Evaluation Strategy']
    默认参数: 在定义函数时,将参数赋值[ES6]   
      function person(name='aoo',age=25){
        console.log(name,age);
      }
      person();         // aoo 25
      person('boo',18); // boo 18
      只有当传入的参数为 undefined,才会触发默认值赋值 
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
      ([arg1,arg2,..]) =>{statement}  箭头函数[ES6] 
        PS: 箭头函数中无'arguments'对象,若要多参数,则需用'...'扩展符
        相当于: function(参数1,参数2){ return statement }
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
    函数内部属性 
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
Boolean,布尔类: 处理布尔值的'包装对象' 
  Extend：Object 
    console.log(Boolean.prototype.__proto__.constructor===Object); // true 
  Instance: true false 
    var bol = new Boolean(); 创建布尔值基本包装对象 
  Proto: 
    .valueOf()   bol,返回当前布尔值 
      对 Object.prototype.valueOf 进行了改写 
      console.log(Boolean.prototype.valueOf == Object.prototype.valueOf); // false 
      console.log(true.valueOf()); // true 
      console.log(false.valueOf()); // false 
      console.log(typeof false.valueOf()); // boolean 
    .toString()  str,转换为字符串 
      对 Object.prototype.toString 进行了改写
        console.log(Boolean.prototype.toString == Object.prototype.toString); // false 
      console.log(true.toString());  // true   
      console.log(false.toString()); // fasle  
      console.log(typeof alse.toString()); // string   
Number,数值类: 处理数值的'包装对象' 
  Extend：Object 
    console.log(Number.prototype.__proto__.constructor===Object); // true 
  Static: 
    Number.MAX_VALUE           最大值,1.7976931348623157e+308 
    Number.MIN_VALUE           最小值,5e-324
    Number.NEGATIVE_INFINITY   -Infinity
    Number.POSITIVE_INFINITY   Infinity
    Number.NaN                 NaN
    Number.EPSILON  2.220446049250313e-16,一个极小的数值[ES6] 
      PS: Number.EPSILON 的出现是用来判断浮点数的计算误差,
        若浮点数计算得到的误差不超过Number.EPSILON 的值,就表示可以接受这样的误差。
      console.log(Number.EPSILON); // 2.220446049250313e-16
      2.220446049250313e-16 是一个极小的数值,约等于 0.00000000000000022204
    Number.MAX_SAFE_INTEGER  最大的安全整数: 9007199254740991[ES6] 
    Number.MIN_SAFE_INTEGER  最小的安全整数:-9007199254740991[ES6] 
    Number.isNaN(val)     bol,是否为非数值[ES6]     
      window.isNaN(val) 会把非数值的参数转化成数值再进行判断 
      Number.isNaN(val) 只对数值类型有效,非数值类型的参数一律返回false 
      Example: 
      console.log(isNaN('abc'));         // true   进行了类型转换 
      console.log(Number.isNaN('abc'));  // false  不做类型转换 
    Number.isFinite(val)  bol,是否为有限的数值[ES6] 
      只是对数值类型有效,对非数值类型的参数一律返回'false' 
      Number.isFinite('abc');    // false
      Number.isFinite(Infinity); // false 
      Number.isFinite(1);        // true 
    Number.isInteger(num)     bol,是否为整数[ES6] 
      PS: JS内整数和浮点数存储方式相同,小数点后都是0的浮点数,会被认为是整数
      Number.isInteger(3);    // true
      Number.isInteger(3.0);  // true
      Number.isInteger(3.00); // true
      Number.isInteger(3.2);  // false
    Number.isSafeInteger(num) bol,是否为安全整数[ES6] 
      处于 Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER 之间的整数
      Number.isSafeInteger(Number.MAX_SAFE_INTEGER);   // true
      Number.isSafeInteger(Number.MAX_SAFE_INTEGER+1); // false
    Number.parseInt(str)     int,解析字符串,返回整数[ES6] 
      等价于 window.parseInt()
    Number.parseFloat(str)   float,解析字符串,并返回浮点数[ES6] 
      等价于 window.parseFloat() 
  Instance: 
    var num = new Number([val]);  创建数值基本包装对象  
      var num1 = new Number();
      var num2 = new Number(1);
      console.log(num1);    // Number {[[PrimitiveValue]]: 0}
      console.log(num2);    // Number {[[PrimitiveValue]]: 1} 
      console.log(typeof num2);   // object
  Proto: 
    .toFixed(x)  str,四舍五入保留x位小数  
    .toExponential(x)  str,以科学计数法表示并保留x位小数 
    .toPrecision(x)   str,以指数或点形式来表示[根据x的长度来决定形式] 
      console.log( 123.111.toPrecision(1)); // 1e+2 
      console.log( 123.111.toPrecision(2)); // 1.2e+2 
      console.log(typeof  123.111.toPrecision(2)); // string 
    .toString 
    .valueOf 
    .toLocaleString 
  Feature: 
    console.log(1..constructor===Number); // true 
String,字符类: 处理字符串的'包装对象' 
  Extend: Object 
    console.log(String.prototype.__proto__.constructor===Object); // true 
  Static:  
    String.fromCharCode([num,num...])  str,指定Unicode值对应的字符串  
      Example: 
      console.log(String.fromCharCode(72,69,76,76,79));  // "HELLO"
    String.fromCodePoint(num)  str,将一个字符对应的码点,转换为对应的字符[ES6] 
      PS: 即使4字节的字符,也能正确实现
      String.fromCodePoint(134071); // 结果:"𠮷"
    String.raw<str>  str,返回字符串最原始的样貌,即使字符串中含有转义符[ES6] 
      console.log(`hello\tworld`); // hello world
      '\t'会被识别为制表符,实现空格效果
      console.log(String.raw`hello\twolrd`); // hello\twolrd
      console.log(String.raw(`hello\twolrd`)); // 报错 
      console.log(String.raw'hello\twolrd');   // 报错 
  Instance: 
    var str = new String([val])   创建字符串基本包装对象  
      console.log(new String('abc'));
      // String {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"} 
  Proto: 
    ★字符获取 
    .length    num,只读,字符长度 
      console.log("abc"['length']);    // 3
    str[idx]   str,下标法访问字符 
      console.log('abc'[1]); // b 
    .charAt(idx)  str,指定下标对应的字符 
      console.log("abc".charAt(1)); // "b"
    .charCodeAt(idx)  num,以Unicode编码形式显示指定位置的字符 
      var num1 = 'Ab'.charCodeAt(1)   
      var num2 = 'abc'.charCodeAt(0)  
      console.log(num1,num2,typeof num1) // 98 97 "number"
    ★字符串获取 
    .slice(bgn[,end])  str,字符截取[详见 arr.slice()] 
    .substr(bgn[,num]) str,截取num个字符 
      当只有一个参数且负数时,同 slice 
      当num为负数或0时,返回空字符串 
    .substring(idx1[,idx2])  str,截取字符串 
      idx1  必须,若为负数返回全部字符串
      idx2  默认到最后,若为负,则取0 
      截取的范围为[idx1,idx2) 或 [idx2,idx1)  
        var str = 'abcde' 
        console.log(str.substring(1,2)); // b 
        console.log(str.substring(2,1)); // b 
    ★字符串对比 
    .includes(str)  bol,是否包含指定字符串  
    .indexOf(str[,bgn]) idx,指定位置向后首个指定字符串的下标,否则返回-1 
      bgn  可选,开始查询的下标,默认为 0 
      Example:
      'abcdef'.indexOf('bc')   // 1
      'abcdef'.indexOf('ac')   // -1
    .lastIndexOf(str[,bgn]) idx,指定位置向前的首个指定字符串的下标,否则返回-1 
      bgn  可选,开始查询的下标,默认为 str.length  
    .search(str/rgep)   idx,首个指定字符串的下标,否则返回-1  
    .match(str2/rgep)   arr,指定字符匹配到的数组 
      arr 匹配结果数组
        arr.index 
        arr.input 
        数组的第一项是与整个模式匹配的字符串 
        之后的每一项[如存在]保存着与正则表达式中的捕获组匹配的字符串 
    .localeCompare(str2)  num,字符串比较 
      两个字符串相等,返回 0 
      第一个不同的字母,若str1大,则返回 1,否则返回 -1 
    ★字符串修改
    .replace(targetStr/rgep,replaceStr/foo)  str,返回替换后的字符串 
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
    .split([str/rgep [,num]])   arr,使用包含的指定字符分割成数组 
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
    .concat(str1,str2,...)   str,返回拼接后的字符串 
      var str = 'abc'
      console.log(str.concat('a','b')); // abcab 
    .trim()  str,去除头尾空格并返回  
      var str = ' 12 3 ';
      var res = str.trim();
      console.log("|" + res + "|" ); // |12 3|
    ★字符串转换 
      PS: 只有几种语言[如土耳其语]具有大小写本地性,一般是否本地化效果是一致的 
    .toUpperCase()  str,转换为大写并返回  
    .toLowerCase()  str,转换为小写并返回 
    .toLocaleUpperCase()  str,转换为本地大写并返回  
    .toLocaleLowerCase()  str,转换为本地小写并返回  
    .toString() 
    .valueOf() 
    ★待整理 
    .repeat(num) str,将字符串重复num次并返回[不影响源字符串][ES6] 
      PS: 该方法不能用于数值,即不会隐式转换 
      var aoo = "1";  //目标字符串
      console.log(aoo.repeat(3),aoo); // 111 1 
    .includes(str2)   bol,str1是否包含str2[ES6] 
      'good'.includes('o') // true
    .startsWith(str2[,idx]) bol,str1起始从idx位置开始是否为str2[ES6] 
      idx  可选,默认为0,指定的开头位置 
      var aoo = "123";      // 目标字符串
      aoo.startsWith('1');  //true,出现在开头位置
      aoo.startsWith('2');  //false,不是在开头位置
      aoo.startsWith('2',1); //true,从第2个字符开始
    .endsWith(str2[,idx])   bol,str1的前num位是否以str2结尾[ES6] 
      idx   可选,默认为str1的长度
      var name = "123456";  // 目标字符串
      name.endsWith('6');   // true,在尾部位置
      name.endsWith('6',5); // false,只针对前5个字符
      name.endsWith('5',5); // true,针对前5个字符
    .codePointAt()  num,返回4字节字符对应的十进制数[ES6] 
      PS: JS中,一个字符固定为2个字节,对于4字节的字符,JS无法正确读取字符 
      var str1 = "前端";
      var str2 = "𠮷"; // 需4个字节存储的字符 
      console.log(str1.length,str2.length); // 2 2 
      console.log(str1.charAt(0));  // 前
      console.log(str1.charAt(1));  // 端
      console.log(str2.charAt(0));  // �,charAt方法只能正确读取2字节字符串 
      console.log(str2.charAt(1));  // �
      console.log(str2.codePointAt());  // 134071 
      返回其码点的十进制数:134071,换成16进制就是'20bb7',对应的Unicode编码则是'\u20bb7'
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
      str.normalize() 
      str.trimLeft() 
      str.trimRight() 
      str.padEnd() 
      str.padStart() 
  Expand: 
    Array.prototype.join.call(str1,str2)   使用str2来间隔str1 
      Example: :
        var str ="123456";
        var s ="-";
        Array.prototype.join.call(str,s); // "1-2-3-4-5-6"
        var str ="1-2-3-4-5-6";
        var s ="=";
        Array.prototype.join.call(str,s,'-'); // "1=-=2=-=3=-=4=-=5=-=6"
Array,数组类: 一种特殊类型的对象,可类比成有序数据的对象 
  PS: 数组最大长度为 2^23-1 
  Extend: Object 
    console.log(Array.prototype.__proto__.constructor===Object); // true 
  Static:   
    Array.isArray(arr)  bol,是否为数组 [IE9+][ES5] 
    Array.of(val1,val2,..);  arr,将一组值,转换成数组[ES6] 
      PS: Array.of() 函数的出现是源于Array构造函数的缺陷
      console.log(Array.of(1,2,3,4,5)); // [1,2,3,4,5]
    Array.from(arrLike[,mapFoo][,context]) arr,转换成为数组[ES6] 
      PS: 最常见的类数组对象就是调用getElementsByTagName方法得到的结果
      arrLike 想要转换成数组的类数组或可遍历对象
      mapFoo  可选,最后生成的数组会经过该函数的加工处理后再返回
      context 可选,执行 mapFoo 函数时 this 的值
      let ele = document.getElementsByTagName('a');
      ele instanceof Array;  // false,非数组
      ele instanceof Object; // true,对象
      Array.from(ele) instanceof Array; // true,数组
      将字符串分割成数组 
      console.log(Array.from('hello')); // ["h", "e", "l", "l", "o"]
  Instance: 
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
  Proto: 
    ◆信息查询 
    arr[idx]   val,读写数组元素 
      var arr = [];
      arr[100] = 3;
      console.log(arr.length);  //101
    .length    num,读写数组长度 
      var arr = [1,2,3,4,5];
      arr.length = 3;
      console.log(arr); // [1,2,3]
      arr.length = 4;
      console.log(arr); // [1, 2, 3, undefined ]
    .includes(val[,idx])  bol,成员是否存在 
      val   需要查找的元素值;
      idx 可选,默认为 0,从该索引处开始向后查找 
      Example:
        [1, 2, 3].includes(2);     // true
        [1, 2, 3].includes(4);     // false
        [1, 2, 3].includes(3, 3);  // false
    .indexOf(val[,bgn])     idx,成员索引[ES5] 
      PS:返回值为下标值,若找不到则返回-1 
      bgn  表示开始查询的索引位置,默认为0 
        若为负,则为 bgn+arr.length 
    .lastIndexOf(val[,bgn]) idx,成员索引[从右向左][ES5] 
    ◆改变原数组
    .reverse()  arr,颠倒所有成员后返回   
      Example: :
      var arr = [1, 2, 3];
      var result = arr.reverse();
      console.log(arr);  // [3, 2, 1] 
      console.log(result===arr);  // true 
    .push(val1[,val2,...])  num,末尾添加成员,返回新数组长度 
      val 在原数组尾部添加的成员,添加多个成员用逗号隔开
      Example:
      var arr = [1];
      console.log(arr.push(2)); // 2 
      console.log(arr);         // [1, 2]
    .pop()    val,返回删除的尾部成员  
      PS: 无参数;若原数组为空,则无操作,并返回 undefined 值 
      Example: 
      var obj = [1,2,3];
      var member1 = obj.pop();  
      console.log(member1); // 3
      console.log(obj);     // [1, 2]
    .unshift(val1[,val2,...])  num,头部添加元素,返回新数组长度 
    .shift()  val,返回删除的头部成员 
    .splice(bgn[,num][,v1,v2,...]) arr,删除[添加]元素,返回由删除的成员组成的数组 
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
    .slice([bgn][,end])  arr,返回复制的片段 
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
    .concat(val1[val2,..])  arr,返回拼接后的新数组  
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
    .join([str])  str,使用指定字符串连成员 
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
    .forEach(foo(val,idx,arr)[,context])  数组遍历 [ES5] 
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
    .sort([foo(val1,val2)])   arr,返回排序后的数组[改变原数组]  
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
    .every(f(val,idx,arr)[,context])  bol,回调返回值是否全部为真[ES5]
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
    .some(f(val,idx,arr)[,context])  bol,回调返回值是否有真[ES5]
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
    .map(f(val,idx,arr)[,context])  arr,返回回调返回值组成的数组[ES5] 
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
    .filter(f(val,idx,arr)[,context])  arr,回调返回值为true的元素组成的数组[ES5]
      foo     回调函数,返回true表示保留该元素,通过测试,false则不保留;
      context 可选,执行函数时的用于 this 的值
      Example: 筛选数组arr中小于12的数
        var arr = [10, 2, 34, 4, 11, 12];
        var res = arr.filter(function(val,idx,arr){
          return val < 12; // 返回值为 true,则保留该元素
        });
        console.log(arr); // [10, 2, 34, 4, 11, 12]
        console.log(res); // [10, 2, 4, 11]
    .reduce(foo(retVal,curVal,idx,arr)[,initVal])  val,条件缩减,返回最后一次回调值[ES5]
      PS: 接收一个函数作为累加器,数组中的每个值从左到右开始缩减,最终为一个值 
        为数组中的每一个元素依次执行回调函数,不包括数组中被删除或未被赋值的元素 
        若数组是空的并且没有initialValue参数,将会抛出TypeError错误.
        若数组只有一个元素并且没有initialValue, 或者有initialValue但数组是空的,
        这个唯一的值直接被返回而不会调用回调函数.
        通常来说提供一个initialValue初始值更安全一点,因为没有的话会出现3种可能的输出结果,
      foo     执行数组中每个值的函数 
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
    .reduceRight(foo(retVal,curVal,idx,arr)[,initVal])  val,和reduce类似,只是从右到左遍历[ES5]
    ◆待整理
    .find(f(member))  val,返回数组中符合条件的第一个成员[ES6] 
      member  分别为数组中的每个成员  
        回调函数返回true时,find函数就会返回该成员的值,否则最终返回 undefined  
      var aoo = [1,2,3,4,5,6].find(function(value){ 
        return value > 2; 
      });
      console.log(aoo); // 3
    .findIndex(f(member)) idx,返回数组中符合条件的第一个成员的下标[ES6] 
      回调返回值为true时,该成员的下标,否则最终返回 -1 
      var idx1 = [7,8,9,10].findIndex(function(value){ 
        return value > 8; 
      }); 
      console.log(idx1); // 2
    .fill(val[,beginIndex,endIndex]) 返回一个用指定的值,覆盖数组中的元素的新数组[ES6] 
      let arr = [1,2,3];
      arr.fill(4); // [4,4,4]
      
      let arr = [1,2,3];
      arr.fill(4,1,3); // [1,4,4],从位置2到到位置4被覆盖
    .entries() 对数组的键值对进行遍历,返回一个遍历器,可以用for..of 对其进行遍历[ES6] 
      for..of 也是ES6的新增特性 
      for(let [i,v] of ['a', 'b'].entries()) {
        console.log(i,v);
      }
      //0 "a"
      //1 "b"
      用 entries() 函数返回的一个遍历器,用for...of进行遍历,
      能得到数组的键值:0 和 1,以及对应的数组元素:‘a‘和’b‘
    .keys() 对数组的索引键进行遍历,返回一个遍历器[ES6] 
      for(let index of ['a', 'b'].keys()) {
        console.log(index);
      }
      //0
      //1
    .values()  对数组的元素进行遍历,返回一个遍历器[ES6] 
      for(let value of ['a', 'b'].values()) {
        console.log(value);
      }
      //a
      //b
    .toString() 
    .toLocaleString() 
    .copyWithin() 
  Feature: 
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
    数组推导:用简洁的写法,直接通过现有的数组生成新数组 [ES6]
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
  Expand:  
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
Date,日期时间类: 处理时间和日期,内置获取和设置日期时间信息的方法   
  PS: 在早期java中 java.util.Date 类基础上构建;  
    Date对象基于1970年1月1日0时世界协调时间开始的毫秒数 
  Extend: Object 
    console.log(Date.prototype.__proto__.constructor===Object); // true  
  Static: 
    Date.now()      num,自世界协调时间至今的毫秒数 
      console.log(Date.now()); // 1507606437591
    Date.parse(str/date) num,日期解析的毫秒数 
      Example: 
      console.log(Date.parse('4/12/2007')); // 1176307200000 
    Date.UTC(year,month[,...]) num,表示日期的毫秒数 
      参数中必须有年份和月份
      Date.UTC(2016,10,1,1,1);  //1477962060000
  Instance: 
    var date = new Date([val]) 构造函数创建时间对象 
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
  Proto: 
    .valueOf()   num,时间的毫秒表示  
      var date1 = new Date(100);
      console.log( date1.valueOf()); // 100 
      console.log(+date1); // 100 
    ◆组件方法 
    .getTime()   num,从1970年1月1日到当前时间的毫秒数值 
    .getDay()          num,星期数值,0-6  
    .getFullYear()     num,年份数值,1970-275760  
    .getMonth()        num,月份数值,0-11 
    .getDate()         num,日数值,1-31 
    .getHours()        num,小时数值,0-23 
    .getMinutes()      num,分钟数值,0-59 
    .getSeconds()      num,秒数值,0-59 
    .getMilliseconds() num,毫秒数值,0-999 
    .setXX()     'get'方法对应的'set'方法,用于改变日期对象的各项值 
    .xxxUTCxx()  'get'和'set'方法对应的'UTC'方法
      Example:  
      date.getDate()
      date.setDate() 
      date.getUTCDate()
      date.setUTCDate()
    .getTimezoneOffset()  num,当前时区和'GMT'格林威治时间相差的分钟数值 
      Example: 
      var date = new Date();
      console.log(date.getTimezoneOffset()); // -480,8个小时
      若在柏林,则 date.getTimezoneOffset();   // -60
    ◆日期格式化方法 不同浏览器可能显示不同,一般用于调试,以下均为Chrome中的结果   
      console.log(new Date(0));
      // Thu Jan 01 1970 08:00:00 GMT+0800(中国标准时间),默认显示格式 
    .toDateString()   格式: '星期 月 日 年' 
      var date = new Date(0)
      console.log(date.toDateString()); // Thu Jan 01 1970 
    .toTimeString()   格式: '时:分:秒 时区' 
      var date = new Date(0)
      console.log(date.toTimeString()); // 08:00:00 GMT+0800 (中国标准时间) 
    .toLocaleString() 格式: '年/月/日 时间' 
      var date = new Date(0)
      console.log(date.toLocaleString()); // 1970/1/1 上午8:00:00 
    .toLocaleDateString() 格式: '年/月/日' 
      var date = new Date(0)
      console.log(date.toLocaleDateString()); // 1970/1/1 
    .toLocaleTimeString() 格式: '时 分 秒'  
      var date = new Date(0)
      console.log(date.toLocaleTimeString()); // 上午8:00:00 
    .toUTCString()        格式: '星期,日 月 年 时:分:秒 '
      var date = new Date(0)
      console.log(date.toUTCString()); // Thu, 01 Jan 1970 00:00:00 GMT 
    .toGMTString()     与'toUTCString'方法等价,推荐使用'toUTCString' 
      var date = new Date(0)
      console.log(date.toGMTString()); // Thu, 01 Jan 1970 00:00:00 GMT 
    .toString()     
      var date = new Date(0)
      console.log(date.toString()); 
      // Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间) 
    .toISOString()  
      var date = new Date();
      console.log(date.toISOString()); // 1970-01-01T00:00:00.000Z 
    .toJSON()  使用 .toISOString()返回的字符串,为了在 JSON.stringify()方法中使用 
    已废弃 
      .getYear()  被废弃 
  Feature: 
    Date类型隐式转换 
      var date = new Date(0);
      // 优先转换为string 
      console.log(date+1); // Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)1
      console.log(+date);  // 0 
    日期的比较: 使用变量名比较时,对象的变量名指向的是地址,需转换为毫秒数进行比较
RegExp'Regular Expression'正则类: 描述、匹配一系列符合某个语法规则字符串的规则 
  Expand: Object 
    console.log(RegExp.prototype.__proto__.constructor===Object); // true  
  Static: 
    需先执行匹配'test'或'exec' 
    PS: 基于最近一次所执行的正则表达式操作而变化;可通过两种方式访问
    // TODO: ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★ 
    Example: 
      var rgep=/google/;
      var str="this is a agoogle!";
      //必须执行一下(test或exec),静态属性才有效
      rgep.test(str);
    RegExp.input       str,当前被匹配的字符串  
      RegExp.$_;     // this is a google!      
    RegExp.lastMatch   str,最后一个匹配的字符串 
      RegExp['$&']; //google
    RegExp.leftContext  str,最后一次匹配前的子串 
      RegExp['$`']; //this is a a
    RegExp.rightContext str,在上次匹配之后的子串 
      RegExp["$'"]; //!
    RegExp.lastParen    str,最后一对圆括号内的匹配子串 
      RegExp['$+'];      
    RegExp.multiline    bol,指定是否所的表达式都用于多行的布尔值 
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
  Instance: 
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
  Proto: 
    Example: 
      var rgep=/google/ig;
      rgep.global;     // true
      rgep.ignoreCase; // true
      rgep.multiline;  // false
      rgep.source;     // "google"
    console.log(/a/.constructor === RegExp); // true 
    .global      bol,是否全局匹配,默认'false' 
    .ignoreCase  bol,是否忽略大小写,默认'false'    
    .multiline   bol,是否多行匹配,默认'false'  
    .source      str,正则的pattern  
    .lastIndex   num,读写下次匹配字符位置的数值表示[在全局匹配时生效],从 0 开始 
    .toString()  str,字符串形式的正则字面量  
      var rgep = /\da/;
      console.log(rgep.toString()); // /\da/ 
    .test(str)   bol,是否存在于字符串中 
      console.log(/bc/.test('abcd'));    // true 
      使用全局匹配,由于正则的lastIndex的属性,匹配多次可能返回错误值 
        var re = /\w/g;
        console.log(re.test("a")); // true
        console.log(re.test("a")); // false
        console.log(re.test("a")); // true
        console.log(re.test("a")); // false
    .exec(str)   arr,正则匹配到的字符串组成的数组,否则返回 null 
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
    .compile(rgep,modifier)  编译正则 
    .flags    
    .sticky   
    .unicode  
  Feature: 
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
      ?=n 匹配其后紧接为指定字符串n  
      ?!n 匹配其后紧接着的不是字符串n  
        包含'ab'但不包含'cd'的正则: /ab.(?!cd)./ 
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
  Expand: 
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
  Accu: 
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
  todo
  RegExp 正则扩展[ES6] 
    RegExp构造函数功能扩展: 当参数是一个正则对象,则可使用第二个参数指定修饰符 [ES6]
      var rgep = new RegExp(/ab/,'g')  通过正则来创建 [ES6] 
      返回的正则表达式会忽略原有的正则表达式的修饰符,只使用新指定的修饰符
      new RegExp(/abc/ig, 'i').flags // "i" 
      上面代码中,原有正则对象的修饰符是ig,它会被第二个参数i覆盖 
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
Error,错误类 
  PS: JS解析或执行时,当发生错误就会抛出一错误对象,并且程序中断在发生错误的地方 
    JS原生提供一个Error构造函数,所有抛出的错误都是这个构造函数的实例 
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
  其他错误类型: ECMA-262 定义了7种错误类型,Error是基类型,是其他六种的父类型
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
  Instance: 
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
    let s = new Set(arr);       // Set {1,2,3,4}
    let newArr = Array.from(s); // [1,2,3,4],完成去重
WeakSet, [ES6]
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
      若这个引用类型的值被垃圾机制回收了,WeakMap实例中的对应键值对也会消失。
Blob,二进制数据的基本对象[ES6] 
  PS: 一个 Blob对象表示一个不可变的,原始数据的类似文件对象 
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
ArrayBuffer&TypedArray&DataView: JS操作二进制数据的接口[ES6] 
  PS: ArrayBuffer、TypedArray和 DataView,这些对象早就存在,属于独立的规格, 
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
  ◆TypedArray,用来生成内存的视图 
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
Uint8Array  
Int8Array  
Uint16Array  
Int16Array  
Uint32Array  
Int32Array  
Float32Array  
Float64Array  
Uint8ClampedArray  
DataView  
Promise,同步书写异步模式[ES6] 
  PS:采用'同步'形式的代码来决解异步函数间的层层嵌套,将原来异步函数的嵌套关系转变为'同步'的链式关系; 
    Promise对象是一个代理对象,代理了最终返回的值,可以在后期使用; 
    将异步操作封装成Promise对象,然后使用该对象的'then''catch'等方法,进行链式写法完成异步操作;
  Promise的状态 
    'pending'  : 初始状态,未完成或拒绝 
    'resolved' : 操作成功 
    'rejected' : 操作失败 
    只有异步操作的结果,可以决定当前是哪一种状态,任何其他操作都无法改变这个状态 
    一旦状态改变,就不会再变,任何时候都可以得到这个结果 
    与事件[Event]不同,事件的特点是,若错过了,再去监听则得不到结果  
  Promise的缺点 
    首先,无法取消Promise,一旦新建它就会立即执行,无法中途取消 
    其次,若不设置回调函数,Promise内部抛出的错误,不会反应到外部 
    第三,当处于'Pending'状态时,无法得知目前进展到哪一个阶段,刚刚开始还是即将完成 
  var pms = new Promise(foo(resolve,reject)) 创建Promise对象 
    PS:Promise在创建时,参数函数就会执行 
    foo   用于放置执行异步操作的函数 
      若在foo方法的执行过程中抛出了任何异常,那么promise立即被拒绝,
      resolve(data)  表示该pms成功解析并传递参数'data'
      reject(error)  表示该pms被拒绝并传递参数'error'
      // resolve reject 函数根据逻辑需要进行相应的执行
  ◆pms的方法 
  pms1 = pms.then(foo1(data)[,foo2(error)])  rs或rj执行触发foo1或foo2,返回promise对象 
    foo1 成功后的回调,默认返回一个Promise对象,也可以自定义返回值 
      返回一新'Promise'类型,后续再调用的'then'就是新Promise中的逻辑了  
        new Promise(function(rs,rj){
          console.log('开始');
          setTimeout(function(){
            rs('0')
            console.log('0-1');
          },200)
        })
        .then(function(arg){
          console.log('当前 1','上一步: '+arg);
          return new Promise(function(rs,rj){
            setTimeout(function(){
              rs('1')
              console.log('1-2');
            },1000)
          })
        })
        .then(function(arg){
          console.log('当前 2','上一步: '+arg);
          return new Promise(function(rs,rj){
            setTimeout(function(){
              rs('2')
              console.log('2-3');
            },2000)
          })
        })
        .then(function(arg){
          console.log('当前 3','上一步: '+arg);
          return new Promise(function(rs,rj){
            setTimeout(function(){
              rs('3')
              console.log('3-4');
            },3000)
          })
        })
        // 开始
        // 0-1
        // 当前 1 上一步: 0
        // 1-2
        // 当前 2 上一步: 1
        // 2-3
        // 当前 3 上一步: 2
        // 3-4
      返回非'Promise'类型,继续使用.then ,将作为其参数; 
        new Promise(function(rs,rj){
          setTimeout(function(){
            console.log('开始'); 
            rs('开始'); 
          },1000) 
        })
        .then(function(res){
          console.log('当前: '+'1','上一步: '+res); 
          return '1'; 
        })
        .then(function(res){
          console.log('当前: '+'2','上一步是:'+res); 
          return '2'; 
        })
        .then(function(res){ 
          console.log('当前 :'+'3','上一步是:'+res); 
        }) 
        // 延迟1s
        // 开始 
        // 当前: 1 上一步: 开始
        // 当前: 2 上一步是:1
        // 当前 :3 上一步是:2  
    foo2 可选,失败/出错后的回调 
  pms1 = pms.catch(foo)  用于处理操作异常,返回promise对象 
    pms.catch(function (error) {
      //操作失败的处理程序
    });
  ◆静态方法 
  Promise.length    '1',构造器参数的数目 
  pms = Promise.all(pmsArr)  全局模式,所有成功才成功,有一个失败则失败 
    PS: 成功时传递值为多个rs传递的值按顺序组成的数组,失败时为传递的失败信息; 
    pmsArr  由Promise实例组成的数组
    Example:
      let pms1 = new Promise(function(resolve){
        setTimeout(function () {
          resolve('实例1操作成功');
        },5000);
      });
      let pms2 = new Promise(function(resolve){
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
  pms = Promise.race(pmsArr) 竞速模式,任意一个成功或失败则结束 
    PS: 结束后,其他实例中再发生变化,也不管了 
    arr  由Promise实例组成的数组 
    Example:
      let pms1 = new Promise(function(resolve){
        setTimeout(function () {
          resolve('实例1操作成功');
        },4000);
      });
      let pms2 = new Promise(function(resolve,reject){
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
  pms = Promise.reject(val)     传递失败的信息,返回一状态为失败的Promise对象 
  val = Promise.resolve(pms/thenable/primitive)  传递成功的信息,返回Promise对象 
    pms,'Promise'对象,返回值直接为该Promise 
      Promise.resolve(new Promise(function(rs,rj){
        setTimeout(function(){
          rs('aoo')
        },1000)
      }))
      .then(function(msg){
        console.log(msg);
      })
    thenable,带有'then'方法的非Promise对象,返回Promise对象[状态由then方法执行决定] 
      var likePms = {
        then : function(rs,rj){
          // console.log(arg(11),'thenable');
          // rs('boo')
          rj('boo1')
        }
      }
      Promise.resolve(likePms).then(function(a){
        console.log(a);
      }
      ,function(msg){
        console.log(msg);
      })
    primitive,原始类型,返回fulfilled状态的Promise对象 
      Promise.resolve('coo').then(function(msg){
        console.log(msg);
      })
  Promise.prototype.constructor 'Promise'函数 
  Promise.prototype.then()  
  Promise.prototype.catch() 
Generator,生成器函数: 可控制函数内部状态,暂停或继续[ES6] 
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
  ◆Reflect对象一共有13个静态方法 
    PS: 大部分与Object对象的同名方法的作用都是相同的,且与Proxy对象的方法是一一对应 
    Reflect.get(obj,key,receiver)    返回对象的key,否则返回undefined 
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
    Reflect.set(obj,key,val,receiver) 设置对象的key为val 
      如果name属性设置了赋值函数,则赋值函数的this绑定receiver。
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
    Reflect.apply(target,context,args)
    Reflect.construct(target,args)
    Reflect.defineProperty(target,name,desc)
    Reflect.deleteProperty(target,name)
    Reflect.has(target,name)
    Reflect.ownKeys(target)
    Reflect.isExtensible(target)
    Reflect.preventExtensions(target)
    Reflect.getOwnPropertyDescriptor(target, name)
    Reflect.getPrototypeOf(target)
    Reflect.setPrototypeOf(target, prototype)
ASYNC,用来取代回调函数、解决异步操作的一种方法[ES7] 
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
        也就是同时执行,而不是继发执行。
        正确的写法: 采用for循环 
        let docs = [{}, {}, {}];
        for (let doc of docs) {
          await db.post(doc);
        }
  'Async Iterator'异步遍历器 
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
------------------------------------------------------------------------------- 
SelfSummary 
  对象分析: 
    var obj = Array.prototype     
    console.log('查询的对象:',obj);
    console.log('对象的类型:',typeof obj,obj.toString().slice(7,-1));
    var tObj = Object.getOwnPropertyNames(obj)
    for(var key in tObj){
      var k = tObj[key];
      try {
        console.log(typeof obj[k],k,obj[k], '#####' );
        // console.log(obj[k].toString(),k,obj[k], '#####' );
      } 
      catch (e) {
        console.log( '------',k, '#####' );
      } 
      if (k == 'id') { // 查询某个具体的属性 
        console.log('存在==========================================');
      }
    };


