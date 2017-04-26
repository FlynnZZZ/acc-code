ECMAScript 6 
变量扩展 
  let   定义块级变量 「ES6+」 
    块级作用域限制,只在定义的块级作用域中存在;
      PS：任何一对花括号{}中的语句都属于一个块,称之为块级作用域;
      if (true) { 
        var aoo = 1; 
        let boo = 2;
      }
      console.log(aoo); // 1
      console.log(boo); // 报错,boo is not defined
    无变量提升
      var aoo = 1;
      var boo = 2;
      function foo(){
        console.log(aoo); // undefined,变量提升
        console.log(boo); // 报错
        var aoo = 3; 
        let boo = 4; 
      }
    重复声明变量报错
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
  const 定义块级常量 「ES6+」 
    PS：只能在声明时赋予;不能被删除;只在块级作用域生效;无变量提升
    const aoo =2;
    aoo = 2;     // 报错 ,常量不可改变
    delete aoo;  // 报错
    const boo;   // 报错 ,定义时必须赋值
    不可传值改变,只能传址改变;
      传值赋值和传址赋值
      传址：赋值过程中,变量实存储的是数据的地址「对数据的引用」,而非原始数据或者数据的拷贝
      const arr =[1,2,3];
      arr =[1];    // 报错
      arr.push(4); // 允许
      arr[4] =5;   // 允许
      arr;         // [1, 2, 3, 4, 5]
      const obj = {key1 : 1}
      obj.key1 = 2; // 允许
Destructuring,解构赋值 
  PS：ES6允许按照一定模式,从数组和对象中提取值,对变量进行赋值,这被称为解构
  e.g.:
    传统的变量赋值
    var arr = [1,2,3];//把数组的值分别赋给下面的变量；
    var a = arr[0];
    var b = arr[1];
    var c = arr[2];
    console.log(a);// 1
    console.log(b);// 2
    console.log(c);// 3
    变量的解构赋值
    var [a,b,c] = [1,2,3]; //把数组的值分别赋给下面的变量；
    console.log(a);// 1
    console.log(b);// 2
    console.log(c);// 3
  结构赋值可以嵌套
    var [ a,b,[ c1,c2 ] ] = [ 1,2,[ 3.1,3.2 ] ];
    console.log(c1); // 3.1
    console.log(c2); // 3.2
  不完全解构
    var [a,b,c] = [1,2];
    console.log(a);//结果：a的值为1
    console.log(b);//结果：b的值为2
    赋值不成功,变量的值为undefined
    var [a,b,c] = [1,2];
    console.log(a);//结果：a的值为1
    console.log(b);//结果：b的值为2
    console.log(c);//结果：c的值为undefined
  允许设定默认值
    var [a,b,c=3] = [1,2];
    console.log(a);//结果:a的值为1
    console.log(b);//结果:b的值为2
    console.log(c);//结果:c的值为3
    覆盖默认值「当新的值为undefined的时候,是不会覆盖默认值的」
    var [a,b,c=3] =[1,2,4];
    console.log(a);//结果:a的值为1
    console.log(b);//结果:b的值为2
    console.log(c);//结果:c的值为4
  对象的解构赋值：对象的解构赋值不会受到属性的排列次序影响,是跟属性名关联起来的
    PS：变量名要和属性名一致,才会成功赋值。
      如果变量找不到与其名字相同的属性,就会赋值不成功
    e.g.:
      var { a,b,c} = {"a":1,"b":2,"c":3};
      console.log(a); // 1 
      console.log(b); // 2
      console.log(c); // 3
      改变顺序
      var { a,b,c } = {"a":1,"c":3,"b":2};
      console.log(a); // 1
      console.log(b); // 2
      console.log(c); // 3
      
      var { a } = {"b":2};
      console.log(a);//结果：a的值为undefined
    给一个变量名与属性名不一样的变量解构赋值
      var { b:a,} = {"b":2};
      console.log(a); // 2
  对象解构赋值嵌套
    var {a:{b}} = {"a":{"b":1}};
    console.log(b);//结果：b的值为1
  对象解构指定默认值
    var {a,b=2} = {"a":1};
    console.log(b);//结果：b的值为默认值2
  字符串的解构赋值
    PS：解构赋值的过程中,字符串被转换成了一个类似数组的对象
    var [a,b,c,d,e,f] = "123456";
    console.log(a); // 1
    console.log(b); // 2
    console.log(c); // 3
    console.log(d); // 4
    console.log(e); // 5
    console.log(f); // 6
  解构赋值的用途
    交换变量的值
      传统做法
      var x = 1;
      var y = 2;
      var z = x;//第三个变量临时存放x的值
      x = y;  //把y的值赋给x；
      y = z;  //把z的值赋值给y；
      console.log(x); //结果：x为2
      console.log(y); //结果：y为1
      使用解构
      var x = 1;
      var y = 2;
      [x,y] = [y,x];
    定义函数参数
      function foo({a,b,c}){ console.log(a,b,c); }
      foo({a:1,b:2,c:3,d:4}); // 1 2 3 
    函数参数的默认值
      function demo({aoo=1}){ console.log(aoo); }
      demo({});
标准库的扩展、新增 
  string字符串扩展
    `a${1+2}b` 模版字符串  [ES6+] 
      PS：又称多行字符串,可以跨越多行,使用反引号引起来,如 `字符`
      e.g.
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
        var aoo="fan";
        var boo=`${aoo} hello!`; // 此处使用反引号(数字1的左边的按键)引起来
        var coo = `${1+2} hello`
        console.log(boo); // fan hello
        console.log(coo); // 3 hello
    str.repeat(num) 将目标字符串重复N次,返回一个新的字符串「不影响目标字符串」
      var aoo = "1";  //目标字符串
      var boo = aoo.repeat(3); //变量aoo被重复三次；
      console.log(aoo); // 1
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
      PS：JS 中,一个字符固定为2个字节,
        对于那些需要4个字节存储的字符,JS 会认为它是两个字符,此时它的字符长度length为2。
        如字符："𠮷",就是一个需要4个字节存储,length为2的字符。
        对于4字节的字符,JS无法正确读取字符
      e.g.:
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
        返回其码点的十进制数：134071,换成16进制就是20bb7,对应的Unicode编码则是\u20bb7
    String.fromCodePoint(num)  函数的参数是一个字符对应的码点,返回的结果就是对应的字符
      PS：即使4字节的字符,也能正确实现
      String.fromCodePoint(134071); //结果："𠮷"
    String.raw()  返回字符串最原始的样貌,即使字符串中含有转义符 
      console.log(`hello\tworld`); // hello	world
      \t会被识别为制表符,实现空格效果
      console.log(String.raw`hello\twolrd`); //输出：hello\twolrd
  RegExp正则的扩展
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
      ES6改变了这种行为。如果RegExp构造函数第一个参数是一个正则对象,
      那么可以使用第二个参数指定修饰符。
      而且,返回的正则表达式会忽略原有的正则表达式的修饰符,只使用新指定的修饰符。
      new RegExp(/abc/ig, 'i').flags // "i"
      上面代码中,原有正则对象的修饰符是ig,它会被第二个参数i覆盖。
    字符串的正则方法
      字符串对象共有4个方法,可以使用正则表达式：match()、replace()、search()和split()。
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
        上面代码表示,如果不添加u修饰符,正则表达式就会认为字符串为两个字符,从而匹配失败。
      (2)Unicode字符表示法
        ES6新增了使用大括号表示Unicode字符,这种表示法在正则表达式中必须加上u修饰符,才能识别。
        /\u{61}/.test('a') // false
        /\u{61}/u.test('a') // true
        /\u{20BB7}/u.test('𠮷') // true
        上面代码表示,如果不加u修饰符,正则表达式无法识别\u{61}这种表示法,只会认为这匹配61个连续的u。
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
      如果改一下正则表达式,保证每次都能头部匹配,y修饰符就会返回结果了。
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
      上面代码中,如果字符串里面没有非法字符,y修饰符与g修饰符的提取结果是一样的。但是,一旦出现非法字符,两者的行为就不一样了。

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

      已经有提议将这个需求标准化,作为RegExp对象的静态方法RegExp.escape(),放入ES7。2015年7月31日,TC39认为,这个方法有安全风险,又不愿这个方法变得过于复杂,没有同意将其列入ES7,但这不失为一个真实的需求。

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
    s 修饰符：dotAll 模式
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
      上面两个字符串,如果互换正则表达式,就会匹配失败。另外,还可以看到,”先行断言“括号之中的部分((?=%)),是不计入返回结果的。

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
      上面代码中,如果后行断言的反斜杠引用(\1)放在括号的后面,就不会得到匹配结果,必须放在前面才可以。
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

      注意,这两种类只对Unicode有效,所以使用的时候一定要加上u修饰符。如果不加u修饰符,正则表达式使用\p和\P会报错,ECMAScript预留了这两个类。

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
  Strings and Regular Expressions,字符串与正则表达式 
    PS:ECMAScript 6 诞生之前,JavaScript 字符串(string)由 16 位编码的字符组成(UTF-16).
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
    e.g.:
      var text = "𠮷";
      console.log(text.length);           // 2
      单个 Unicode 字符 "𠮷" 由代理项对表示,
      因此,本例中 JavaScript 在操作该字符串时会将它视为两个 16 位字符.
    str.codePointAt(index); 返回指定下标字符的经过扩展后的UTF-16 编码
      为了全面支持 UTF-16,ECMAScript 6 新添加的方法之一就是 codePointAt(),
      它可以提取给定位置字符串的对应 Unicode 代码点.
      该方法接收代码单元而非字符的位置并返回一个整型值.
      e.g.:
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
      e.g.:
        使用给定的代码点来产生相应的单个字符
        console.log(String.fromCodePoint(134071));  // "𠮷"
  Set   集合 
     PS:和数组类似,区别是Set中的元素都是不重复的.
       会自动去掉重复的元素
     创建
       var s1 = new Set()
       //创建一个集合
       var s2 =new Set([1,2,3,2,4])
       //创建并初始化
       s2;   //Set {1, 2, 3, 4}
       // 自动过滤掉了重复的元素
     添加元素
       s.add(元素)
     删除元素
       s.delete(元素)
       删除成功返回true,否则为false.
     元素检查
       检测是否存在元素a
       s.has(元素a)
       若存在返回true,否则返回false
     集合长度
       s.size
       返回集合的长度,返回值类型为数值.
  Map   字典 
    和Object类似,以字符串作为下标来存储/获取值.
    定义
       var m =new Map()
    增加
       m.set('name','abc')
    获取
       m.get('name')
    e.g.
      var m =new Map()
      m.set('say',function Say(){console.log('hello')})
      m.get('say')    //function Say(){console.log('hello')}
  Blob  二进制数据的基本对象 
    PS:一个 Blob对象表示一个不可变的,原始数据的类似文件对象。
      Blob表示的数据不一定是一个JavaScript原生格式。 
      File 接口基于Blob,继承 blob功能并将其扩展为支持用户系统上的文件。
      要从用户文件系统上的一个文件中获取一个Blob对象,请参阅 File文档。
      接受Blob对象的APIs也被列在 File 文档中。
    创建blob对象
      Blob(blobParts[, options])  返回创建的 Blob 对象
        PS:其内容由参数中给定的数组串联组成。
        blobParts 一个包含实际数据的数组
        options   数据的类型
        使用其它对象创建一个 Blob 对象
          e.g.:用字符串构建一个 blob：
          var debug = {hello: "world"};
          var blob = new Blob([JSON.stringify(debug, null, 2)],
            {type : 'application/json'});
        e.g.: 利用Blob对象,生成可下载文件
          var blob = new Blob(["Hello World"]);
          var a = document.createElement("a");
          a.href = window.URL.createObjectURL(blob);
          a.download = "hello-world.txt";
          a.textContent = "Download Hello World!";
          document.body.appendChild(a);
          最终 HTML中显示为:
          <a href="blob:http://localhuarun.qilaiwan.com/377b41e4-d95f-4bf0-8e5e-c493d24fc2f4" download="hello-world.txt">Download Hello World!</a>
          点击后提示下载文本文件 hello-world.txt , 文件内容为“Hello World”。
      blob.slice() 使用blob对象创建blob对象
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
      以下代码将 Blob 的内容作为类型数组读取：
      var reader = new FileReader();
      reader.addEventListener("loadend", function() {
         // reader.result contains the contents of blob as a typed array
      });
      reader.readAsArrayBuffer(blob);
      使用 FileReader 以外的方法读取到的内容可能会是字符串或是数据 URL。  
    blob.slice()  创建一个包含另一个blob的数据子集的blob
      blob.slice([start[, end[, contentType]]]) 包含源对象中指定范围内的数据新对象
      slice 一开始的时候是接受 length 作为第二个参数,以表示复制到新 Blob 对象的字节数。
      如果设置其为 start + length,超出了源 Blob 对象的大小,那返回的 Blob 则是整个源 Blob 的数据。
      slice 方法在某些浏览器和版本上仍带有供应商前缀：
        Firefox 12 及更早版本的 blob.mozSlice() 
        Safari 中的 blob.webkitSlice()
        slice 方法的旧版本,没有供应商前缀,具有不同的语义,并且已过时。 
        使用Firefox 30 删除了对 blob.mozSlice() 的支持。
      e.g.:  使用XMLHttpRequest对象,将大文件分割上传
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
    blob.type 只读,字符串,表明该Blob对象所包含数据的MIME类型
      如果类型未知,则该值为空字符串。
      在Ajax操作中,如果 xhr.responseType 设为 blob,接收的就是二进制数据。
    blob.close() 关闭 Blob 对象,以便能释放底层资源。 
块级绑定,Block Bindings 
  var 声明与变量提升
    function getValue(condition) {
      // value 可以被访问到,其值为 undefined
      console.log(value); // undefined
      if(condition) {
        var value = "blue";
        // 其它代码
        return value;
      } else {
        console.log(value); // undefined
        // value 可以被访问到,其值为 undefined
        return null;
      }
    }
    getValue(false);
    相当于
    function getValue(condition) {
      var value;
      if(condition) {
        value = "blue";
        // 其它代码
        return value;
      } else {
        return null;
      }
    }
  块级声明(Block-Level Declarations)
    块级声明指的是该声明的变量无法被代码块外部访问.
    块作用域,又被称为词法作用域(lexical scopes),可以在如下的条件下创建：
      函数内部
      在代码块(即 { 和 })内部
    块级作用域是很多类C语言的工作机制,
    ECMAScript 6 引入块级声明的目的是增强 JavaScript 的灵活性,
    同时又能与其它编程语言保持一致.
  let 声明
    let 声明的语法和 var 完全一致.
    但是变量的作用域会限制在当前的代码块中.
    let 声明不会将变量提升至当前作用域的顶部.
      function foo() {
        console.log(aoo); // undefined
        console.log(boo); // 报错,没有变量提升
        var aoo =2;
        let boo =1;
      }
      foo();
    禁止重复声明
      如果一个标识符在当前作用域里已经存在,那么再用 let 声明相同的标识符或抛出错误
      var count = 30;
      let count = 40; // 报错,语法错误
  const 声明(Constant Declarations)
    在 ECMAScript 6 中也可使用常量(const)语法来声明变量.
    该种方式声明的变量会被视为常量,这意味着它们不能再次被赋值.
    所以所有的 const 声明的变量都必须在声明处初始化.
    e.g.:
    const maxItems = 30; // 合法的声明
    const aoo; // 语法错误：未初始化
  const 声明 vs let 声明(Constants vs Let Declarations)
    const 和 let 都是块级声明,意味着执行流跳出声明所在的代码块后就没有办法在访问它们,
    同样 const 变量也不会被提升
    const 也不能对已存在的标识符重复定义,
      不论该标识符由 var(全局或函数级作用域)还是 let (块级作用域)定义.例如以下的代码：
      var message = "Hello!";
      let age = 25;
      const message = "Goodbye!"; // 报错
      const age = 30; // 报错
    将对象赋值给 const 变量(Declaring Objects with Const)
      const 变量的值如果是个对象,那么这个对象本身可以被修改
      const 声明只是阻止变量和值的再次绑定而不是值本身的修改.
      意味着 const 不能限制对于值的类型为对象的变量的修改
        const person = { name: "Nicholas" };
        // 正常
        person.name = "Greg";
        // 抛出错误
        person = { name: "Greg" };
        person 变量一开始已经和包含一个属性的对象绑定.
        修改 person.name 是被允许的因为 person 的值(地址)未发生改变,
        但是尝试给 person 赋一个新值(代表重新绑定变量和值)的时候会报错.
        这个微妙之处会导致很多误解.
        只需记住：const 阻止的是绑定的修改,而不是绑定值的修改.
  循环中的 let 声明(Let Declarations in Loops)
    e.g.:
    for(let i = 0; i < 10; i++) { }
    console.log(i); // 在这里访问 i 会抛出错误
    变量 i 只存在于 for 循环代码块中,一旦循环完毕变量 i 将不复存在.

    var arr =[];
    for(var i = 0; i < 10; i++) { arr.push(i); }
    console.log(arr); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    var funArr =[];
    for(var i = 0; i < 10; i++) {
      funArr.push(function(){console.log(i); });
    }
    console.log(funArr[0]); // function(){console.log(i); }
    // i 是以引用的方式存在函数中的
    console.log(funArr[0]()); // 10
    该为let的声明的方式
    var funArr =[];
    for(let i = 0; i < 10; i++) {
      funArr.push(function(){console.log(i); });
    }
    console.log(funArr[0]); // function(){console.log(i); }
    // i 是以引用的方式存在函数中的
    console.log(funArr[0]()); // 0
    注:let 声明在上述循环内部中的表现是在规范中特别定义的,
      实际上,早期 let 的实现并不会表现中这种效果,是在后来被添加到规范中的.
  全局块级绑定(Global Block Bindings)
    当在全局作用域内使用 var 声明时会创建一个全局变量,
    同时也是全局对象(浏览器环境下是 window)的一个属性.
    这意味着全局对象的属性可能会意外地被重写覆盖.
      var RegExp = "Hello!";
      console.log(window.RegExp);     // "Hello!"
    如果在全局作用域内使用 let 或 const,那么绑定就会发生在全局作用域内,
    但是不会向全局对象内部添加任何属性.
      let RegExp = "Hello!";
      console.log(RegExp);           // "Hello!"
      console.log(window.RegExp);    // function RegExp() { [native code] }
Promise 对象 
  PS:
    采用 Promise 方式,可采用'同步'形式的代码来决解异步函数间的层层嵌套,
    将原来异步函数的嵌套关系转变为'同步'的链式关系.
  Summary:
    Promise 对象是一个代理对象,代理了最终返回的值,可以在后期使用.
    将异步操作封装成 Promise 对象.
    然后使用 Promise 对象的 then catch 等方法,进行链式的形似同步的写法完成异步操作.
  Details:
    Promise有以下几种状态:
      pending: 初始状态, 初始状态,未完成或拒绝。
      fulfilled: 意味着操作成功完成。
      rejected: 意味着操作失败。
  new Promise(foo) 创建Promise对象
    PS:
      Promise在创建时,参数函数就执行
    var pms = new Promise(function(rs,rj){
      rs(arg1); // 用于 异步成功后 传递数据 arg1
      rj(arg2); // 用于 异步失败后 传递数据 arg2
      // rs rj函数根据逻辑需要进行相应的执行
    })
    Details:
      参数为一个[执行异步操作的]与参数 resolve 和 reject一起传递的函数executor
      在参数函数内部,如果 resolve 被调用,代表该Promise被成功解析(resolve);
      而当reject被调用时,代表该Promise的值不能用于后续处理了,也就是被拒绝(reject)了.
      executor主要用于初始化异步代码,一旦异步代码调用完成,
      要么调用 resolve 方法来表示Promise被成功解析,
      或是调用 reject 方法,表示初始化的异步代码调用失败,整个promise被拒绝。
      如果在executor 方法的执行过程中抛出了任何异常,那么promise立即被拒绝,
      即相当于reject方法被调用,executor 的返回值也就会被忽略。
  pms对象的方法
    pms.then(foo1[,foo2])    rs或rj执行触发foo1或foo2
      Details:
        foo2 可选,在rj后执行,若不存在则忽略;
        其中rs的参数为foo1的参数,
        rj的参数为foo2的参数;
        foo1 默认会返回一个Promise值,也可以自定义返回值,
        该值会传递到下一个then的foo1方法参数中;
        若 foo1 返回一个新 Promise,
        则then之后再调用的then就是新Promise中的逻辑了;
  Question:
    使用 Promise 监控 点击时间 , 使用Promise 改变事件的执行方式 [?] 
  Todo:  JS 异步编程的 Promise 模式
    PS:异步模式在JS中实现起来不是很利索,
      为了降低异步编程的复杂性,寻找简便的方法来处理异步操作,其中一种处理模式称为promise,
      使用 XMLHttpRequest2 或者 Web Workers 可实现promise模式.
      这种模式不会阻塞和等待长时间的操作完成,而是返回一个代表了承诺的(promised)结果的对象。
      ES6 原生提供了 Promise 对象。
      回调函数真正的问题在于他剥夺了我们使用 return 和 throw 这些关键字的能力。
      而 Promise 很好地解决了这一切。
    Promise 对象
      PS:用来传递异步操作的消息,代表了某个未来才会知道结果的事件,通常是一个异步操作,
        并且这个事件提供统一的 API,可供进一步处理。
      Promise 对象的特点
        对象的状态不受外界影响。 Promise 对象代表一个异步操作,
        有三种状态:Pending(进行中) Resolved(已完成,也叫 Fulfilled) Rejected(已失败).
          只有异步操作的结果,可以决定当前是哪一种状态,任何其他操作都无法改变这个状态。
          这也是 Promise 这个名字的由来,它的英语意思就是「承诺」,表示其他手段无法改变。
        一旦状态改变,就不会再变,任何时候都可以得到这个结果。
          Promise 对象的状态改变,只有两种可能：
          从 Pending 变为 Resolved 和从 Pending 变为 Rejected。
          只要这两种情况发生,状态就凝固了,不会再变了,会一直保持这个结果。
          就算改变已经发生了,你再对 Promise 对象添加回调函数,也会立即得到这个结果。
          这与事件(Event)完全不同,事件的特点是,如果你错过了它,再去监听,是得不到结果的。
        Promise 对象可将异步操作以同步操作的流程表达出来,避免了层层嵌套的回调函数。
        此外,Promise 对象提供统一的接口,使得控制异步操作更加容易。
        Promise 的缺点
          首先,无法取消 Promise,一旦新建它就会立即执行,无法中途取消。
          其次,如果不设置回调函数,Promise 内部抛出的错误,不会反应到外部。
          第三,当处于 Pending 状态时,无法得知目前进展到哪一个阶段,刚刚开始还是即将完成.
      new Promise() 构造函数创建 Promise 对象
        构造函数接受一个函数作为参数,该函数的两个参数分别是 resolve 方法和 reject 方法。
        如果异步操作成功,则用 resolve 方法,
          将 Promise 对象的状态,从「未完成」变为「成功」(即从 pending 变为 resolved)；
        如果异步操作失败,则用 reject 方法,
          将 Promise 对象的状态,从「未完成」变为「失败」(即从 pending 变为 rejected)。
    api
      Promise.resolve()
      Promise.reject()
      Promise.prototype.then()
      Promise.prototype.catch()
      Promise.all() // 所有的完成
      var p = Promise.all([p1,p2,p3]);
      Promise.race() // 竞速,完成一个即可
      finally
      bind
      all
      joinprops
      any
      some
      race
      .map(Function mapper [, Object options])
      .reduce(Function reducer [, dynamic initialValue]) 
ASYNC : 用来取代回调函数、解决异步操作的一种方法 
  async 函数与 Promise、Generator 函数类似, 它本质上是 Generator 函数的语法糖。
  async 函数并不属于 ES6,而是被列入了 ES7。
export import：  module模块化 
  介绍
    JS一直没有模块体系,无法将一大程序拆分成互相依赖的小文件, 再简单的拼装起来。
    其他语言都有这项功能,比如 Ruby 的require、Python 的import,
    甚至就连 CSS 都有@import,
    但是 JavaScript 任何这方面的支持都没有,这对开发大型的、复杂的项目形成了巨大障碍
    在 ES6 之前,社区制定了一些模块加载方案,最主要的有 CommonJS 和 AMD 两种。
    前者用于服务器,后者用于浏览器。
    ES6 在语言标准的层面上,实现了模块功能,而且实现得相当简单,
    完全可以取代 CommonJS 和 AMD 规范,成为浏览器和服务器通用的模块解决方案。
  模块化演化
    PS:模块化开发是一种生产效率高,维护成本低的生产方式
      从软件开发角度来说,模块化开发是一种开发模式,写代码的一种方式;
      非模块化开发可能遇到的问题: 命名冲突、文件依赖
      模块化优点: 提升开发效率、方便后期维护.
      业务复杂, 重用逻辑非常多, 扩展性要求较高 时推荐使用模块化开发.
    全局函数
      function add(a , b) {
        return parseFloat(a) + parseFloat(b);
      }
      function substract(a ,b) {}
      存在的问题：
        污染了全局变量,无法保证不与其他模块发生变量名冲突。
        模块成员之间看不出直接关系。
    对象封装-命名空间
      var calculator = {
        add: function(a, b) { return parseFloat(a) + parseFloat(b); },
        subtract: function(a, b) {},
      };
      优缺点:
        从某种程度上解决了变量命名冲突的问题,但未从根本上解决命名冲突。
        从代码级别可以明显区分出哪些函数属于同一个模块
        暴露了所有的模块成员,内部状态可以被外部改写,不安全。
        命名空间越来越长。
    私有公有成员分离
      var calculator = (function () {
        function convert(input){ return parseInt(input); }
        function add(a, b) { return convert(a) + convert(b); }
        function subtract(a, b) {}
        function multiply(a, b) {}
        function divide(a, b) {}

        return {
          add : add,
          subtract : subtract,
          multiply : multiply,
          divide : divide
        }
      })();
      优点:
        此方式将函数包装成一独立的作用域,私有空间的变量和函数不会影响到全局作用域.
        以返回值的方式得到模块的公共成员、公开公有方法,隐藏私有空间内部的属性、元素.
        可以有选择的对外暴露自身成员。
        从某种意义上来说,解决了变量命名冲突的问题。
    模块的扩展与维护
      // 计算模块
      (function (calculator) {
        function convert(input) { return parseInt(input); }
        calculator.add = function(a, b) { return convert(a) + convert(b); }
        window.calculator = calculator;
      })(window.calculator || {});
      // 新增需求
      (function (calculator) {
        calculator.remain = function (a , b) { return a % b; }
        window.calculator = calculator;
      })(window.calculator || {});
      alert(calculator.remain(4,3));
      优点:
        有利于对庞大的模块的子模块划分。
        实现了开闭原则：对新增开发,对修改关闭。
        对于已有文件尽量不要修改,通过添加新文件的方式添加新功能。
    第三方依赖的管理
      (function (calculator , $) {
        // 依赖函数的参数,是属于模块内部
        // console.log($);
        calculator.remain = function (a , b) { return a % b; }
        window.calculator = calculator;
      })(window.calculator || {} , jQuery);
      优点:
        模块最好要保证模块的职责单一性,最好不要与程序的其他部分直接交互,
        通过向匿名函数注入依赖项的形式,保证了模块的独立性,还使模块之间的以来关系变得明显.
        对于模块的依赖通过自执行函数的参数传入,这样做可以做到依赖抽象,
        本例中使用的jQuery,而当要使用zepto的时候,只要更换传入的参数即可。
        原则：高内聚低耦合,模块内相关性高,模块间关联低。
  模块化规范
    PS:客户端规范主要有：AMD 和 CMD
      服务器端规范主要是 CommonJS,
      node.js 用的就是 CommonJS 规范。
    AMD 异步模块定义,依赖前置,实现主要有 RequireJS, RequireJS在国外用的比较多
      PS:制定了定义模块的规则,这样模块和模块的依赖可以被异步加载。
        这和浏览器的异步加载模块的环境刚好适应（浏览器同步加载模块会导致性能、可用性、调试和跨域访问等问题）。
      模块名的格式
        模块名用来唯一标识定义中模块,它们同样在依赖数组中使用。
        AMD的模块名规范是CommonJS模块名规范的超集。引用如下：
        模块名是由一个或多个单词以正斜杠为分隔符拼接成的字符串
        单词须为驼峰形式,或者".",".."
        模块名不允许文件扩展名的形式,如".js"
        模块名可以为 "相对的" 或 "顶级的"。如果首字符为"."或".."则为"相对的"模块名
        顶级的模块名从根命名空间的概念模块解析
        相对的模块名从 "require" 书写和调用的模块解析
        上文引用的CommonJS模块id属性常被用于JavaScript模块。
        相对模块名解析示例：
        如果模块 "a/b/c" 请求 "../d", 则解析为"a/d"
        如果模块 "a/b/c" 请求 "./e", 则解析为"a/b/e"
        如果AMD的实现支持加载器插件(Loader-Plugins),则"!"符号用于分隔加载器插件模块名和插件资源名。由于插件资源名可以非常自由地命名,大多数字符都允许在插件资源名使用。
      API说明
        define(id?, dependencies?, factory);
          id  可选,字符串,指的是定义中模块的名字.
            如果没有提供该参数,模块的名字应该默认为模块加载器请求的指定脚本的名字。
            如果提供了该参数,模块名必须是“顶级”的和绝对的（不允许相对名字）。
          dependencies,是个定义中模块所依赖模块的数组。
            依赖模块必须根据模块的工厂方法优先级执行,并且执行的结果应该按照依赖数组中的位置顺序以参数的形式传入（定义中模块的）工厂方法中。
            依赖的模块名如果是相对的,应该解析为相对定义中的模块。
            换句话来说,相对名解析为相对于模块的名字,并非相对于寻找该模块的名字的路径。
            本规范定义了三种特殊的依赖关键字。
            如果"require","exports", 或 "module"出现在依赖列表中,
            参数应该按照CommonJS模块规范自由变量去解析。
            依赖参数是可选的,如果忽略此参数,它应该默认为["require", "exports", "module"]。
            然而,如果工厂方法的形参个数小于3,加载器会选择以函数指定的参数个数调用工厂方法。
          factory,为模块初始化要执行的函数或对象。
            如果为函数,它应该只被执行一次。如果是对象,此对象应该为模块的输出值。
            如果工厂方法返回一个值（对象,函数,或任意强制类型转换为true的值）,应该为设置为模块的输出值。
          简单的 CommonJS 转换
            如果依赖性参数被忽略,模块加载器可以选择扫描工厂方法中的require语句以获得依赖性（字面量形为require("module-id")）。第一个参数必须字面量为require从而使此机制正常工作。
            在某些情况下,因为脚本大小的限制或函数不支持toString方法（Opera Mobile是已知的不支持函数的toString方法）,模块加载器可以选择扫描不扫描依赖性。
            如果有依赖参数,模块加载器不应该在工厂方法中扫描依赖性。
        define.amd 属性
          PS:为了清晰的标识全局函数（为浏览器加载script必须的）遵从AMD编程接口,
            任何全局函数应该有一个"amd"的属性,它的值为一个对象。
            这样可以防止与现有的定义了define函数但不遵从AMD编程接口的代码相冲突。
          当前,define.amd对象的属性没有包含在本规范中。实现本规范的作者,可以用它通知超出本规范编程接口基本实现的额外能力。
          define.amd的存在表明函数遵循本规范。如果有另外一个版本的编程接口,那么应该定义另外一个属性,如define.amd2,表明实现只遵循该版本的编程接口。
          e.g.:
            一个如何定义同一个环境中允许多次加载同一个版本的模块的实现：
            define.amd = {
              multiversion: true
            };
            最简短的定义：
            define.amd = {};
          一次输出多个模块
            在一个脚本中可以使用多次define调用。这些define调用的顺序不应该是重要的。早一些的模块定义中所指定的依赖,可以在同一脚本中晚一些定义。模块加载器负责延迟加载未解决的依赖,直到全部脚本加载完毕,防止没必要的请求。
        e.g.:
          使用 require 和 exports
          创建一个名为"alpha"的模块,使用了require,exports,和名为"beta"的模块:
          define("alpha", ["require", "exports", "beta"], function (require, exports, beta) {
               exports.verb = function() {
                   return beta.verb();
                   //Or:
                   return require("beta").verb();
               }
           });
          一个返回对象的匿名模块：
          define(["alpha"], function (alpha) {
            return {
              verb: function(){
                return alpha.verb() + 2;
              }
            };
          });
          一个没有依赖性的模块可以直接定义对象：
          define({
            add: function(x, y){
              return x + y;
            }
          });
          一个使用了简单CommonJS转换的模块定义：
          define(function (require, exports, module) {
            var a = require('a'),
            b = require('b');
    
            exports.action = function () {};
          });
        全局变量
          本规范保留全局变量"define"以用来实现本规范。包额外信息异步定义编程接口是为将来的CommonJS API保留的。模块加载器不应在此函数添加额外的方法或属性。
          本规范保留全局变量"require"被模块加载器使用。模块加载器可以在合适的情况下自由地使用该全局变量。它可以使用这个变量或添加任何属性以完成模块加载器的特定功能。它同样也可以选择完全不使用"require"。
        使用注意
          为了使静态分析工具（如build工具）可以正常工作,推荐使用字面上形如的'define(...)'。
        与CommonJS的关系
          一个关于本API的wiki开始在CommonJS wiki中创建了,作为中转的格式,模块中转。但是为了包含模块定义接口,随着时间而不断改变。在CommonJS列表中关于推荐本API作为模块定义API尚未达成一致。本API被转移到它自己的wiki和讨论组中。
          AMD可以作为CommonJS模块一个中转的版本只要CommonJS没有被用来同步的require调用。使用同步require调用的CommonJS代码可以被转换为使用回调风格的AMD模块加载器。
    CMD,Common Module Definition 通用模块定义,依赖就近
      PS:主要实现有 SeaJS, SeaJS的创始人为阿里的玉伯
        SeaJS在阿里系用的非常广泛,包括京东等也在用SeaJS
        但是SeaJS已经停止维护了,因为在ES6中已经有了模块化的实现,
        该规范明确了模块的基本书写格式和基本交互规则。
        在 CMD 规范中,一个模块就是一个文件。 代码的书写格式如下： define(factory);
      define Function
        define 是一个全局函数,用来定义模块。
      define define(factory)
        define 接受 factory 参数,factory 可以是一个函数,也可以是一个对象或字符串。
        factory 为对象、字符串时,表示模块的接口就是该对象、字符串。
        比如可以如下定义一个 JSON 数据模块：
        define({ "foo": "bar" });
        也可以通过字符串定义模板模块：
        define('I am a template. My name is {{name}}.');
        factory 为函数时,表示是模块的构造方法。执行该构造方法,可以得到模块向外提供的接口。factory 方法在执行时,默认会传入三个参数：require、exports 和 module：
        define(function(require, exports, module) { /*模块代码*/ });
      define define(id?, deps?, factory)
        define 也可以接受两个以上参数。字符串 id 表示模块标识,数组 deps 是模块依赖。比如：
        define('hello', ['jquery'], function(require, exports, module) { /*模块代码*/ });
        id 和 deps 参数可以省略。省略时,可以通过构建工具自动生成。
        注意：带 id 和 deps 参数的 define 用法不属于 CMD 规范,而属于 Modules/Transport 规范。
      define.cmd Object
        一个空对象,可用来判定当前页面是否有 CMD 模块加载器：
        if (typeof define === "function" && define.cmd) {
          /*有 Sea.js 等 CMD 模块加载器存在*/
        }
      require Function
        require 是 factory 函数的第一个参数。
      require require(id)
        require 是一个方法,接受 模块标识 作为唯一参数,用来获取其他模块提供的接口。
        define(function(require, exports) {
          // 获取模块 a 的接口
          var a = require('./a');
          // 调用模块 a 的方法
          a.doSomething();
        });
        注意：在开发时,require 的书写需要遵循一些 简单约定。
      require.async require.async(id, callback?)
        require.async 方法用来在模块内部异步加载模块,并在加载完成后执行指定回调。callback 参数可选。
        define(function(require, exports, module) {
          // 异步加载一个模块,在加载完成时,执行回调
          require.async('./b', function(b) {
            b.doSomething();
          });
          // 异步加载多个模块,在加载完成时,执行回调
          require.async(['./c', './d'], function(c, d) {
            c.doSomething();
            d.doSomething();
          });
        });
        注意：require 是同步往下执行,require.async 则是异步回调执行。require.async 一般用来加载可延迟异步加载的模块。
      require.resolve require.resolve(id)
        使用模块系统内部的路径解析机制来解析并返回模块路径。该函数不会加载模块,只返回解析后的绝对路径。
        define(function(require, exports) {
          console.log(require.resolve('./b'));
          // ==> http://example.com/path/to/b.js
        });
        这可以用来获取模块路径,一般用在插件环境或需动态拼接模块路径的场景下。
      exports Object
        exports 是一个对象,用来向外提供模块接口。
        define(function(require, exports) {
          // 对外提供 foo 属性
          exports.foo = 'bar';
          // 对外提供 doSomething 方法
          exports.doSomething = function() {};
        });
        除了给 exports 对象增加成员,还可以使用 return 直接向外提供接口。
        define(function(require) {
          // 通过 return 直接提供接口
          return {
            foo: 'bar',
            doSomething: function() {}
          };
        });
        如果 return 语句是模块中的唯一代码,还可简化为：
        define({
          foo: 'bar',
          doSomething: function() {}
        });
        上面这种格式特别适合定义 JSONP 模块。
        特别注意：下面这种写法是错误的！
        define(function(require, exports) {
          // 错误用法！！!
          exports = {
            foo: 'bar',
            doSomething: function() {}
          };
        });
        正确的写法是用 return 或者给 module.exports 赋值：
        define(function(require, exports, module) {
          // 正确写法
          module.exports = {
            foo: 'bar',
            doSomething: function() {}
          };
        });
        提示：exports 仅仅是 module.exports 的一个引用。在 factory 内部给 exports 重新赋值时,并不会改变 module.exports 的值。因此给 exports 赋值是无效的,不能用来更改模块接口。
      module Object
        module 是一个对象,上面存储了与当前模块相关联的一些属性和方法。
      module.id String
    
        模块的唯一标识。
    
        define('id', [], function(require, exports, module) {
    
          // 模块代码
    
        });
        上面代码中,define 的第一个参数就是模块标识。
      module.uri String
        根据模块系统的路径解析规则得到的模块绝对路径。
    
        define(function(require, exports, module) {
    
          console.log(module.uri);
          // ==> http://example.com/path/to/this/file.js
    
        });
        一般情况下（没有在 define 中手写 id 参数时）,module.id 的值就是 module.uri,两者完全相同。
      module.dependencies Array
        dependencies 是一个数组,表示当前模块的依赖。
      module.exports Object
        当前模块对外提供的接口。
    
        传给 factory 构造方法的 exports 参数是 module.exports 对象的一个引用。只通过 exports 参数来提供接口,有时无法满足开发者的所有需求。 比如当模块的接口是某个类的实例时,需要通过 module.exports 来实现：
    
        define(function(require, exports, module) {
    
          // exports 是 module.exports 的一个引用
          console.log(module.exports === exports); // true
    
          // 重新给 module.exports 赋值
          module.exports = new SomeClass();
    
          // exports 不再等于 module.exports
          console.log(module.exports === exports); // false
    
        });
        注意：对 module.exports 的赋值需要同步执行,不能放在回调函数里。下面这样是不行的：
    
        // x.js
        define(function(require, exports, module) {
    
          // 错误用法
          setTimeout(function() {
            module.exports = { a: "hello" };
          }, 0);
    
        });
        在 y.js 里有调用到上面的 x.js:
    
        // y.js
        define(function(require, exports, module) {
    
          var x = require('./x');
    
          // 无法立刻得到模块 x 的属性 a
          console.log(x.a); // undefined
    
        });
      小结
        这就是 CMD 模块定义规范的所有内容。经常使用的 API 只有 define, require, require.async, exports, module.exports 这五个。其他 API 有个印象就好,在需要时再来查文档,不用刻意去记。
        与 RequireJS 的 AMD 规范相比,CMD 规范尽量保持简单,并与 CommonJS 和 Node.js 的 Modules 规范保持了很大的兼容性。通过 CMD 规范书写的模块,可以很容易在 Node.js 中运行,后续会介绍。
    SeaJs
      PS:是一基于 CMD 规范实现的模块化开发解决方案.
        作者：Alibaba 玉伯
        简单友好的模块化定义规范。
        自然直观的代码组织方式。
      使用步骤
        引入sea.js库
        define 定义模块
          PS:在CMD规范中,一个模块就是一个js文件
            define 是一个全局函数,用来定义模块
          define(factory)
            参数 factory可为字符串、对象或函数
              define(function(require, exports, module){
                // 模块代码
              });
              define(obj);
              define(str);
            注意：为了减少出错,定义函数的时候直接把这三个参数写上
            factory为对象、字符串时,表示模块的接口就是该对象、字符串
              比如可以如下定义一个 JSON 数据模块：
              define({ "foo": "bar" });
              也可以通过字符串定义模板模块：
              define('I am a template. My name is {{name}}.');
            factory为函数时,表示是模块的构造方法。执行该构造方法,可以得到模块向外提供的接口。factory方法在执行时,默认会传入三个参数：require、exports和 module：

          define(function(require, exports, module) { // 模块代码});
          define define(id?, deps?, factory)

          　　define也可以接受两个以上参数。字符串 id表示模块标识,数组 deps是模块依赖。比如：

          define('hello', ['jquery'], function(require, exports, module) { // 模块代码});
          　　id和 deps参数可以省略。省略时,可以通过构建工具自动生成。
          　　注意：带 id和 deps参数的 define用法不属于 CMD 规范,而属于 Modules/Transport 规范。

          define.cmd Object

          　　一个空对象,可用来判定当前页面是否有 CMD 模块加载器：

          if (typeof define === "function" && define.cmd) {
              // 有 Sea.js 等 CMD 模块加载器存在
          }
          require Function

          　　require是 factory函数的第一个参数。

          require require(id)

          　　require是一个方法,接受 模块标识 作为唯一参数,用来获取其他模块提供的接口。

          define(function(require, exports) {
            // 获取模块 a 的接口
            var a = require('./a');
            // 调用模块 a 的方法
            a.doSomething();
          });
          注意：在开发时,require的书写需要遵循一些 简单约定。

          require.async  require.async(id, callback?)

          　　require.async方法用来在模块内部异步加载模块,并在加载完成后执行指定回调。callback参数可选。

          define(function(require, exports, module) {
            // 异步加载一个模块,在加载完成时,执行回调
            require.async('./b', function(b) {
              b.doSomething();
            });

            // 异步加载多个模块,在加载完成时,执行回调
            require.async(['./c', './d'], function(c, d) {
              c.doSomething();
              d.doSomething();
            });
          });
          注意：require是同步往下执行,require.async则是异步回调执行。require.async 一般用来加载可延迟异步加载的模块。

          require.resolve  require.resolve(id)

          　　使用模块系统内部的路径解析机制来解析并返回模块路径。该函数不会加载模块,只返回解析后的绝对路径。

          define(function(require, exports) {
            console.log(require.resolve('./b'));
            // ==> http://example.com/path/to/b.js
          });
          　　这可以用来获取模块路径,一般用在插件环境或需动态拼接模块路径的场景下。
        暴露接口
          exports
          module.exports
        依赖模块
          require(‘模块id’)
        启动模块系统
          seajs.use(‘模块id’,function( 模块对象 ){ 业务代码 });
        e.g.:
          01-convertor.js 中
            // 定义模块
            define(function (require, exports, module) {
              // 暴露接口
              exports.convertToNumber = function (input) {
                return parseFloat(input);
              }
            });
          01-calculator.js 中
            define(function (require, exports, module) {
              // 此处是模块的私有空间,定义模块的私有成员
              // 载入01-convertor模块
              var convertor = require('./01-convertor');
              function add(a, b) {
                return convertor.convertToNumber(a) + convertor.convertToNumber(b);
              }
              exports.add = add;
            });
          01-helloworld.html 中
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>Title</title>
              <script src="node_modules/seajs/dist/sea.js"></script>
              <script>
                seajs.use('./01-calculator.js', function (calculator) {
                  alert(calculator.add(1,2));
                });
              </script>
            </head>
            <body>
            </body>
            </html>
      定义模块define
        PS:先有规范,后有实现
          在CMD规范中,一个模块就是一个js文件
        define(factory)   define是一个全局函数,用来定义模块
          对象{}     外部会直接获取到该对象
          字符串''   同上
          函数function( require, exports, module ){ // 模块代码 }
            注意：为了减少出错,定义函数的时候直接把这三个参数写上
          factory为对象、字符串时,表示模块的接口就是该对象、字符串。
          比如可以如下定义一个 JSON 数据模块：
            define({ "foo": "bar" });
          也可以通过字符串定义模板模块：
            define('I am a template. My name is {{name}}.');
          factory为函数时,表示是模块的构造方法。
            执行该构造方法,可以得到模块向外提供的接口。
            factory方法在执行时,默认会传入三个参数：require、exports和 module：
            define(function(require, exports, module) { // 模块代码});
            define define(id?, deps?, factory)
            define也可以接受两个以上参数。字符串 id表示模块标识,数组 deps是模块依赖。
            比如：
            define('hello', ['jquery'], function(require, exports, module) { 
              // 模块代码
            });
          id和 deps参数可以省略。省略时,可以通过构建工具自动生成。
          注意：
            带 id和 deps参数的 define用法不属于 CMD 规范,
            而属于 Modules/Transport 规范。
        define.cmd  一个空对象,可用来判定当前页面是否有 CMD 模块加载器：
          if (typeof define === "function" && define.cmd) { 
            // 有 Sea.js 等 CMD 模块加载器存在
          }
        require  require是 factory函数的第一个参数。
        require(id) require是一个方法
          接受 模块标识 作为唯一参数,用来获取其他模块提供的接口。
          define(function(require, exports) { 
          // 获取模块 a 的接口 
          var a = require('./a'); 
          // 调用模块 a 的方法 
          a.doSomething();
          });
          注意：在开发时,require的书写需要遵循一些 简单约定。
        require.async(id, callback?)
          require.async 方法用来在模块内部异步加载模块,并在加载完成后执行指定回调。
          callback参数可选。
          define(function(require, exports, module) {
          // 异步加载一个模块,在加载完成时,执行回调
          require.async('./b', function(b) {
            b.doSomething();
          });

          // 异步加载多个模块,在加载完成时,执行回调
          require.async(['./c', './d'], function(c, d) {
            c.doSomething();
            d.doSomething();
          });
          });
          注意：require是同步往下执行,require.async则是异步回调执行。require.async 一般用来加载可延迟异步加载的模块。
        require.resolve(id)  使用模块系统内部的路径解析机制来解析并返回模块路径。
          该函数不会加载模块,只返回解析后的绝对路径。
          define(function(require, exports) {
          console.log(require.resolve('./b'));
          // ==> http://example.com/path/to/b.js
          });
          　　这可以用来获取模块路径,一般用在插件环境或需动态拼接模块路径的场景下。
      exports 和 module.exports
        功能:通过给 exports或module.exports动态的挂载变量、函数或对象,外部会获取到该接口
        exports 等价于 module.exports
        可以通过多次给exports 挂载属性向外暴露
        不能直接给 exports 赋值
        如果想暴露单个变量、函数或对象可以通过直接给module.exports 赋值 即可
      exports exports是一个对象,用来向外提供模块接口。
        define(function(require, exports) {
        // 对外提供 foo 属性
        exports.foo = 'bar';

        // 对外提供 doSomething 方法
        exports.doSomething = function() {};
        });
        　　除了给 exports对象增加成员,还可以使用 return直接向外提供接口。

        define(function(require) {
        // 通过 return 直接提供接口
        return {
          foo: 'bar',
          doSomething: function() {}
        };
        });
        　　如果 return语句是模块中的唯一代码,还可简化为：

        define({
        foo: 'bar',
        doSomething: function() {}
        });
        　　上面这种格式特别适合定义 JSONP 模块。

        特别注意：下面这种写法是错误的！

        define(function(require, exports) {
        // 错误用法！！!
        exports = {
          foo: 'bar',
          doSomething: function() {}
        };
        });
        正确的写法是用 return或者给 module.exports赋值：

        define(function(require, exports, module) {
        // 正确写法
        module.exports = {
          foo: 'bar',
          doSomething: function() {}
        };
        });
        提示：exports 仅仅是 module.exports 的一个引用。在 factory 内部给 exports 重新赋值时,并不会改变 module.exports 的值。因此给 exports 赋值是无效的,不能用来更改模块接口。
      module  module是一个对象,上面存储了与当前模块相关联的一些属性和方法。
        module.id 字符串,模块的唯一标识。
          define('id', [], function(require, exports, module) { 
          // 模块代码
          });
          上面代码中,define的第一个参数就是模块标识。
        module.uri 字符串, 根据模块系统的路径解析规则得到的模块绝对路径。
          define(function(require, exports, module) {
          console.log(module.uri); 
          // ==> http://example.com/path/to/this/file.js
          });
          一般情况下(没有在 define 中手写 id 参数时),module.id 的值就是 module.uri,两者完全相同。
        module.dependencies dependencies是一个数组,表示当前模块的依赖。
        module.exports    当前模块对外提供的接口。
          传给 factory 构造方法的 exports 参数是 module.exports 对象的一个引用。
          只通过 exports 参数来提供接口,有时无法满足开发者的所有需求。
          比如当模块的接口是某个类的实例时,需要通过 module.exports 来实现：
          define(function(require, exports, module) {
          // exports 是 module.exports 的一个引用
          console.log(module.exports === exports); // true

          // 重新给 module.exports 赋值
          module.exports = new SomeClass();

          // exports 不再等于 module.exports
          console.log(module.exports === exports); // false
          });
          注意：对 module.exports 的赋值需要同步执行,不能放在回调函数里。下面这样是不行的：
          // x.js
          define(function(require, exports, module) {
          // 错误用法
          setTimeout(function() {
            module.exports = { a: "hello" };
          }, 0);
          });
          在 y.js 里有调用到上面的 x.js:

          // y.js
          define(function(require, exports, module) {
          var x = require('./x');

          // 无法立刻得到模块 x 的属性 a
          console.log(x.a); // undefined
          });
      小结
        经常使用的 API 只有 define, require, require.async, exports, module.exports 五个。
        其他 API 次之,在需要时再来查文档,不用刻意去记。
        与 RequireJS 的 AMD 规范相比,CMD 规范尽量保持简单,
        并与 CommonJS 和 Node.js 的 Modules 规范保持了很大的兼容性.
        通过 CMD 规范书写的模块,可以很容易在 Node.js 中运行
    CommonJs
      PS:SeaJs 和 CommonJs 规范非常的相似,并且在 node.js 中使用起来更简单。
        在 node.js 中直接使用require引包,直接使用 exports 和 module.exports 暴露公开成员,
        并且npm基于CommonJs实现了自动加载和安装依赖。
      同样的 CommonJs 让 node.js 变得：
        1、增加内聚性,有助分工协作,
        2、方便重构,
        3、提高代码质量
      node.js 中的实现为：
        (function(exports,require,module,__filename,__dirname){
        return module.exports;
        });
      require
        加载模块后会缓存,多次加载后得到同一对象 require('http')
        查看模块缓存console.log(require.cache);
        查询模块绝对路径 require.resolve('./test.js');
        查看单个的模块缓存 require.cache[require.resolve('./test.js')]
        删除模块缓存 delete require.cache[require.resolve('./test.js')];
  ES6模块化规范
    PS: export 命令用于定义模块的对外接口,即提供接口,
      import 命令用于引入其他模块提供的功能,即引入接口;
    ES6 模块的设计思想: 尽量的静态化
      使得编译时就能确定模块的依赖关系,以及输入和输出的变量。
      CommonJS 和 AMD 模块: 运行时加载
        都只能在运行时确定这些东西。
        比如,CommonJS 模块就是对象,输入时必须查找对象属性。
        // CommonJS模块
        let { stat, exists, readFile } = require('fs');
        
        // 等同于
        let _fs = require('fs');
        let stat = _fs.stat;
        let exists = _fs.exists;
        let readfile = _fs.readfile;
        上面代码的实质是整体加载fs模块(即加载fs的所有方法),生成一个对象(_fs),
        然后再从这个对象上面读取3个方法。
        这种加载称为“运行时加载”,因为只有运行时才能得到这个对象,
        导致完全没办法在编译时做“静态优化”。
      ES6 模块: “编译时加载”或者静态加载
        ES6不是对象,而是通过export命令显式指定输出的代码,再通过import命令输入。
        // ES6模块
        import { stat, exists, readFile } from 'fs';
        上面代码的实质是从fs模块加载3个方法,其他方法不加载。
        这种加载称为“编译时加载”或者静态加载,即 ES6 可以在编译时就完成模块加载,
        效率要比 CommonJS 模块的加载方式高。
        当然,这也导致了没法引用 ES6 模块本身,因为它不是对象。
        由于 ES6 模块是编译时加载,使得静态分析成为可能。
        有了它,就能进一步拓宽 JS 的语法,
        比如引入宏(macro)和类型检验(type system)等只能靠静态分析实现的功能。
      除了静态加载带来的各种好处,ES6 模块还有以下好处。
        不再需要UMD模块格式了,将来服务器和浏览器都会支持 ES6 模块格式。
        目前,通过各种工具库,其实已经做到了这一点。
        将来浏览器的新 API 就能用模块格式提供,不再必须做成全局变量或者navigator对象的属性。
        不再需要对象作为命名空间(比如Math对象),未来这些功能可以通过模块提供。
    ES6 的模块自动采用严格模式,不管你有没有在模块头部加上"use strict";
      严格模式的部分限制:
        arguments不会自动反映函数参数的变化
        不能使用arguments.callee
        不能使用arguments.caller
        不能使用 fn.caller 和 fn.arguments 获取函数调用的堆栈
        禁止this指向全局对象
        变量必须声明后再使用
        函数的参数不能有同名属性,否则报错
        不能使用with语句
        不能对只读属性赋值,否则报错
        不能使用前缀0表示八进制数,否则报错
        不能删除不可删除的属性,否则报错
        不能删除变量delete prop,会报错,只能删除属性delete global[prop]
        eval不会在它的外层作用域引入变量
        eval和arguments不能被重新赋值
        增加了保留字(比如 protected static 和 interface )
      ES6 模块之中,顶层的this指向undefined,即不应该在顶层代码使用this。
    export 输出变量
      PS:一个模块就是一个独立的文件,
        该文件内部的所有变量,外部无法获取。
        若希望外部能读取模块内的变量,须使用export关键字输出变量。
      export var aoo = val;  单个变量输出
        e.g.:
          使用 export 命令对外部输出三个变量: aoo boo coo
          export var aoo = 'aa';
          export var boo = 'bb';
          export var coo = 1958;
        输出函数或类(class)
          对外输出一个函数 foo
          export function foo(x, y) { };
      export {aoo,boo};      {} 封装后输出
        PS:使用大括号指定所要输出的一组变量;
          与前一种写法(直接放置在var语句前)是等价的,
          但是应该优先考虑使用这种写法。
          因为这样就可以在脚本尾部,一眼看清楚输出了哪些变量。
        e.g.:
          var aoo = 'aa';
          var boo = 'bb';
          var coo = 1958;
          export {aoo, boo, coo};
        as关键字  重命名输出变量
          重命名了函数foo1和foo2的对外接口,foo2使用不同的名字输出了两次:
          function foo1() { ... }
          function foo2() { ... }
          export {
            foo1 as goo1,
            foo2 as goo2,
            foo2 as hoo1
          };
      e.g.:
        export 1; // 报错, 直接输出1, 1 只是一个值,不是接口。
        
        var m = 1;
        export m; // 报错
        单变量输出格式:
        export var m = 1;
        或
        var m = 1;
        export {m};
        或
        var n = 1;
        export {n as m};
        
        同样的,function和class的输出,也必须遵守这样的写法
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
      export命令必须在模块顶层作用域定义
        export命令可以出现在模块的任何位置,只要处于模块顶层就可以;
        如果处于块级作用域内,就会报错。
        因为处于条件代码块之中,就没法做静态优化了,违背了ES6模块的设计初衷。
        function foo() { export default 'bar' } // SyntaxError
        foo();
        上面代码中,export语句放在函数之中,结果报错。
    export default 默认输出
      PS:通过默认输出,和指定名称的引入,完成模块变量的引入;
      e.g.:
        // export-default.js
        默认输出一个函数
        export default function () { console.log('sss'); }
        或
        export default function foo() { console.log('sss'); }
        或
        function foo() { console.log('foo'); }
        export default foo;
        最终相当于 [self] : export {foo as default };
        // import-default.js
        其他模块加载该模块时,import命令可以为该匿名函数指定任意名字。
        import goo from './export-default';
        相当于 [self] : import { default as goo } from './profile';
        goo(); // 'sss'
        可使用任意名称指向 export-default.js 输出的方法,
        这时就不需要知道原模块输出的函数名。
        函数名foo,在模块外部是无效的,加载的时候,视同匿名函数加载。
        
        输出类
        // MyClass.js
        export default class { ... }
        // main.js
        import MyClass from 'MyClass';
        let o = new MyClass();
      默认输出和正常输出的比较
        使用export default时,对应的import语句不需要使用大括号；
        export default function foo() { } // 输出
        import goo from 'xx';             // 输入
        
        正常时,对应的import语句需要使用大括号。
        export function foo() { }; // 输出
        import {goo} from 'xx';    // 输入
      一个模块只能有一个默认输出,export default 命令只能使用一次
        PS:本质上,export default 就是输出一个叫做default的变量或方法,
          然后输入时,系统允许你为它取任意名字。
        // modules.js
        function foo(x, y) { return x * y; }
        export {foo as default};
        // app.js
        import { default as xxx } from 'modules';
      export default 后不能跟变量声明语句
        PS:因为export default命令其实只是输出一个叫做default的变量
          export default 本质是将该命令后面的值,赋给default变量以后再默认
        export var a = 1; // 正确
        
        var a = 1; 
        export default a; // 正确
        相当于 [self] : export { a as default } ;
        
        export default 42; // 正确
        相当于 [self] : export { 42 as default } ;
        
        export default var a = 1; // 错误
      在一条import语句中同时输入默认方法和其他变量
          import _, { each } from 'lodash';
          对应上面代码的export语句如下。
          export default function (obj) { }         
          export function each(obj, iterator, context) { }
    import 命令
      PS:export定义模块的对外接口后,其他 JS 文件就可通过import加载这个模块;
      import {} from './xx' 加载JS文件,并从中输入变量
        // main.js
        import {firstName, lastName, year} from './profile';
        console.log(firstName);
        import命令接受一对大括号,里面指定要从其他模块导入的变量名。
        大括号里面的变量名,必须与被导入模块(profile.js)对外接口的名称相同。
        from指定模块文件的位置,可以是相对路径,也可以是绝对路径,.js 可以省略。
      as 关键字   重命名输入的变量
        import { aoo as boo } from './profile';
      import {} from 'moduleName';
        若使用模块名,而非路径路径,则必须有配置文件,告诉 js 引擎该模块的位置。
        import {myMethod} from 'util';
        上面代码中,util是模块文件名,
        由于不带有路径,必须通过配置,告诉引擎怎么取到这个模块。
      import命令具有提升效果,会提升到整个模块的头部,首先执行。
        foo();
        import { foo } from 'my_module';
        上面的代码不会报错,因为import的执行早于foo的调用。
        这种行为的本质是,import命令是编译阶段执行的,在代码运行之前。
      不能使用表达式和变量
        由于import是静态执行,所以不能使用表达式和变量,
        这些只有在运行时才能得到结果的语法结构。
        import { 'f' + 'oo' } from 'my_module'; // 报错
        
        let module = 'my_module'; // 报错
        import { foo } from module;
        
        if (x === 1) { import { foo } from 'module1'; } // 报错
        else { import { foo } from 'module2'; }
        上面三种写法都会报错,因为它们用到了表达式、变量和if结构。
        在静态分析阶段,这些语法都是没法得到值的。
      其他写法
        import语句会执行所加载的模块,因此可以有下面的写法。
        
        仅仅执行lodash模块,但是不输入任何值。
        import 'lodash'; 
        
        多次重复执行同一句import语句,那么只会执行一次,而不会执行多次。
        import 'lodash';
        import 'lodash'; // 未执行
      
        import语句是 Singleton 模式。
        import { foo } from 'my_module';
        import { bar } from 'my_module';
        等同于
        import { foo, bar } from 'my_module';
        上面代码中,虽然foo和bar在两个语句中加载,但是它们对应的是同一个my_module实例。
      import * as aoo from './xx';  模块的整体加载
        PS:除了指定加载某个输出值,还可以使用整体加载,即用星号(*)指定一个对象,
          所有输出值都加载在这个对象上面。
        e.g.:
          // circle.js
          export function area(radius) { return Math.PI * radius * radius; }
          export function circumference(radius) { return 2 * Math.PI * radius; }
          
          // main.js
          import { area, circumference } from './circle';
          console.log('圆面积：' + area(4));
          console.log('圆周长：' + circumference(14));
          改用整体加载的方法:
          import * as circle from './circle';
          console.log('圆面积：' + circle.area(4));
          console.log('圆周长：' + circle.circumference(14));
        模块整体加载所在的对象(上例是circle),应该是可以静态分析的,不允许运行时改变
          import * as circle from './circle';
          // 下面两行都是不允许的
          circle.foo = 'hello';
          circle.area = function () {};
    export  from   复合写法
      PS:若在一个模块之中,先后输入输出同一个模块,import语句可与export语句写在一起。
      e.g.:
        export { foo, bar } from 'my_module';
        // 等同于
        import { foo, bar } from 'my_module';
        export { foo, bar };
      接口改名 export { foo as myFoo } from 'my_module';
      整体输出 export * from 'my_module';
      默认接口 export { default } from 'foo';
      具名接口改为默认接口 export { es6 as default } from './someModule';
        // 等同于
        import { es6 } from './someModule';
        export default es6;
      默认接口改名为具名接口 export { default as es6 } from './someModule';
      下面三种import语句,没有对应的复合写法。
        import * as someIdentifier from "someModule";
        import someIdentifier from "someModule";
        import someIdentifier, { namedIdentifier } from "someModule";
        为了做到形式的对称,现在有提案,提出补上这三种复合写法。
        export * as someIdentifier from "someModule";
        export someIdentifier from "someModule";
        export someIdentifier, { namedIdentifier } from "someModule";
    模块的继承
      e.g.:
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
      如果想设置跨模块的常量(即跨多个文件),或者说一个值要被多个模块共享,
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
      如果要使用的常量非常多,可以建一个专门的constants目录,
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
      PS:前面介绍过,import命令会被 JavaScript 引擎静态分析,
        先于模块内的其他模块执行(叫做”连接“更合适)。所以,下面的代码会报错。
        // 报错
        if (x === 2) { import MyModual from './myModual'; }
        上面代码中,引擎处理import语句是在编译时,这时不会去分析或执行if语句,
        所以import语句放在if代码块之中毫无意义,因此会报句法错误,而不是执行时错误。
        也就是说,import和export命令只能在模块的顶层,
        不能在代码块之中(比如,在if代码块之中,或在函数之中)。
          
        这样的设计,固然有利于编译器提高效率,但也导致无法在运行时加载模块。
        从语法上,条件加载就不可能实现。
        如果import命令要取代 Node 的require方法,这就形成了一个障碍。
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
        上面代码中,如果满足条件,就加载模块 A,否则加载模块 B。
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
        如果模块有default输出接口,可以用参数直接获得。
        import('./myModule.js')
        .then(myModule => {
          console.log(myModule.default);
        });
        上面的代码也可以使用具名输入的形式。
        import('./myModule.js')
        .then(({default: theDefault}) => {
          console.log(theDefault);
        });
        如果想同时加载多个模块,可以采用下面的写法。
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
--------------------------------------------------------------------------------
ECMAScript 7 
  PS:ECMAScript 7 即为 ECMAScript 2017
-------------------------------------------------------------------------待整理 
