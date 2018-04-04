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
  PS: 任何基于此规范实现的脚本语言都要遵守其约定; 
    是宿主环境中脚本语言的国际Web标准; 
    本身并非脚本语言,实现它的语言有JavaScript、JScript、ActionScript等; 
    'ECMA-262'要求支持Unicode标准,从而支持多语言开发,第五版发布于2009年;
    ES6于2015年6月发布 
    浏览器环境中比如BOM和DOM中的对象,都属于宿主对象,由宿主实现提供和定义;
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
ES6 Modules 
  PS: ES6模块默认采用严格模式"use strict"; 
    ES6模块之中,顶层的this指向undefined,即不应该在顶层代码使用this; 
    设计思想: 尽量静态化,使编译时能确定模块的依赖关系,及输入和输出的变量 
  ★输出接口,对外暴露属性方法 
  export default foo/{}   // 默认输出 
    PS: 导入时可自定义名称 
    一个模块只能有一个默认输出[即'export default'命令只能使用一次] 
      本质上,export default 就是输出一个叫做default的变量或方法 
      然后输入时,系统允许你为它取任意名字。
    默认输出和正常输出的比较 
      // export default时,对应的 import 不需要使用大括号 
      export default function foo() { } // 输出
      import goo from 'xx';             // 输入
      // 正常时,对应的import语句需要使用大括号 
      export function foo() { }; // 输出
      import {goo} from 'xx';    // 输入
    'export default'后不能跟变量声明语句
      PS: 因为export default命令其实只是输出一个叫做default的变量
        export default 本质是将该命令后面的值,赋给default变量以后再默认
      export default var a = 1; // 错误
  export var aoo = val/function foo() {}  // 单个变量/函数输出 
    对外部输出三个变量: aoo boo coo
    export var aoo = 'aa';
    export var boo = 'bb';
    export var coo = 1958;
  export {aoo,..}   // 批量导出,使用大括号指定所要输出的一组变量 
    var aoo = 'aa',boo = 'bb',coo = 1958;
    export {aoo, boo, coo};
  export {curName1 as outName1,..}    // 重命名输出变量 
  export {aoo,..}  from 'path' // 先后输入输出同一个模块 
    等价于:
    import {aoo,..} from 'my_module';
    export {aoo,..};
    Example:
    export { foo as myFoo } from 'my_module' 接口改名 
    export { default } from 'foo';           默认接口 
    export * from 'my_module';               整体输出 
    export { aoo as default } from './someModule'  具名接口改为默认接口 
    export { default as es6 } from './someModule'  默认接口改为具名接口 
    下面三种import语句,没有对应的复合写法。
      import * as someIdentifier from "someModule";
      import someIdentifier from "someModule";
      import someIdentifier, { namedIdentifier } from "someModule";
      为了做到形式的对称,现在有提案,提出补上这三种复合写法。
      export * as someIdentifier from "someModule";
      export someIdentifier from "someModule";
      export someIdentifier, { namedIdentifier } from "someModule";
  'export'需在模块顶层作用域定义,否则报错  
    PS: 可出现在模块的任何位置,但要处于模块顶层,否则无法静态化 
    function foo() { 
      export default 'bar'  // SyntaxError
    } 
    foo();
  输出的值是实时动态的 
    PS: 'CommonJS'输出的是值的缓存,不存在动态更新 
    export var aoo = 'bar';
    setTimeout(() => aoo = 'baz', 500);
    输出变量'aoo',值为'bar',500 毫秒之后变成'baz' 
  Example: 
    export 1; // 报错 
    
    var m = 1;
    export m; // 报错
    单变量输出需采用
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
  ★导入接口,导入其他模块的属性方法 
  import 'path'  
    import语句会执行所加载的模块 
    import 'lodash'; //  仅仅执行lodash模块,但是不输入任何值。
    多次重复执行同一句import语句,则只会执行一次,而不会执行多次 
    import 'lodash';
    import 'lodash'; // 未执行
  import {name1 [,name2,..]} from 'path' // 加载JS文件,并从中输入变量 
    PS: 变量名必须与导出名称相同,位置顺序则无要求 
    from   模块文件的位置,可是相对路径、绝对路径或模块名,'.js'可省略 
    import语句是'Singleton'模式 
      import { foo } from 'my_module';
      import { bar } from 'my_module';
      等同于
      import { foo, bar } from 'my_module';
  import { aoo as boo } from 'path' // 重命名导入的变量 
  import * as aoo from 'path'   模块的整体加载 
    PS:使用星号'*'整体加载,指定一个对象,所有输出值都加载在这个对象上面 
    // export.js 
    export function foo() { }
    export function goo() { }
    // import.js 
    import * as aoo from './export'; 
    aoo.foo()
    aoo.goo()
    模块整体加载所在的对象不允许运行时改变  
    import * as aoo from './export';
    // 下面两行都是不允许的
    aoo.foo = 'hello';
    aoo.goo = function () {};
  import命令引入提升,会提升到整个模块的头部,首先执行 
    foo();
    import { foo } from 'my_module';
    import的执行会早于foo的调用,行为本质是import命令是编译阶段执行的,在代码运行前 
  由于import静态执行,不能使用表达式和变量 
    这些只有在运行时才能得到结果的语法结构,在静态分析阶段无法得到值  
    import { 'f' + 'oo' } from 'my_module'; // 报错
    
    let module = 'my_module'; // 报错
    import { foo } from module;
    
    if (x === 1) { 
      import { foo } from 'module1'; // 报错
    } 
  promise = import('path')   动态加载,返回Promise对象  
    PS: import命令会被JS引擎静态分析,先于模块内的其他模块执行, 
      固然有利于编译器提高效率,但也导致无法在运行时加载模块,
      require是运行时加载模块,import命令无法取代require的动态加载功能;
      因此,有一个提案,建议引入import()函数,完成动态加载 
      import()函数可以用在任何地方,不仅仅是模块,非模块的脚本也可以使用。
      import()类似于Node的require方法,区别主要是前者是异步加载,后者是同步加载 
    适用场景:  
    按需加载 
      import()可以在需要的时候,再加载某个模块。
      button.addEventListener('click', event => {
        import('./dialogBox.js')
        .then(dialogBox => { dialogBox.open(); })
        .catch(error => { /* Error handling */ })
      });
    条件加载
      if (condition) {
        import('moduleA').then(...);
      } 
      else {
        import('moduleB').then(...);
      }
    动态的模块路径
      import(f()) // 根据函数f的返回结果,加载不同的模块 
      .then(...);
    加载模块成功以后,这个模块会作为一个对象,当作then方法的参数 
        因此,可以使用对象解构赋值的语法,获取输出接口。
        import('./myModule.js')
        .then(({export1, export2}) => {
          // ...·
        });
        上面代码中,export1 和 export2 都是 myModule.js 的输出接口,可以解构获得。
    同时加载多个模块 
      Promise.all([
        import('./module1.js'),
        import('./module2.js'),
        import('./module3.js'),
      ])
      .then(([module1, module2, module3]) => {
         ···
      });
    用在async函数中 
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
  ★其他
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
