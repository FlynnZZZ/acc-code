ECMAScript JS核心 语法部分 
介绍_概念_说明_定义 
  ECMAscript: JS的 语法核心,提供核心语言功能.
    由ECMA制定和发布,任何基于此规范实现的脚本语言都要遵守它的约定
    是宿主环境中脚本语言的国际 Web 标准.
    本身并不是一种脚本语言.
    实现它的语言有JavaScript、JScript、ActionScript等等.
    ECMA-262 第五版发布于2009年
    ECMA-262 要求支持Unicode标准「从而支持多语言开发」,而且对象也变成了平台无关的
    ECMA-262 中对象的行为不一定适用于JS中其他对象,
    浏览器环境中比如BOM和DOM中的对象,都属于宿主对象,由宿主实现提供和定义,
    JavaScript和ECMAScript的关系
      通常JavaScript和ECMAscript被人们用来表达相同的含义,
      但JS的内容却比 ECMA-262 中规定的要多,ECMA-262 的大部分组成JS的一部分.
      Web浏览器只是ECMAscript实现可能的宿主环境之一,
      还有其他环境如Node「一种服务端JavaScript平台」和Adobe Flash 等等
  ECMA-262 大致规定了如下部分: 
    语法 类型 语句 关键字 保留字 操作符 对象 正则表达式 
    try-catch「ES3+」 JSON对象「ES5+」
语法 
  PS: 区分大小写,如变量、函数名和操作符.
  标识符: 指变量、函数、属性或函数的参数的名字
    标识符的组合规则:
    第一个字符必须是字母、下划线或美元符号$
    其他字符可以是字母、下划线、美元符号$或数字
    可以一个或多个字符
    不能把关键字、保留字、true、false和null等作为标识符
    标识符中的字母也可以包含扩展的 ASCII 或 Unicode字母字符,但不推荐使用
  关键字和保留字
    有些名称有特殊意义,不可作为变量名
    关键字: 是程序中已经开始使用的字符
      PS:ECMAscript-262 描述了一组具有特定用途的关键字
        一般用于控制语句的开始或结束,或者用于执行特定的操作等.
      ECMAScript全部关键字: 
      break case catch continue default delete do else finally
      for function if in inseanceof new return switch this
      throw try typeof var void while with
    保留字: 还没有特定的用途,但可能在将来被用作关键字
      ECMAScript-262 第3版 定义的全部保留字
      abstract boolean byte char class const debugger double
      enum export extends final float goto implements import int
      interface long native package private protected public
      short static super synchronized throws transient volatile
  多行注释 /* 注释内容 */ 
  单行注释 // c风格的注释
  语句使用分号结尾,若省略分号,则由解析器确定语句的结尾
    加上分号会在某些情况下增进代码的性能,解析器不必花时间推测哪里需要插入分号
变量 
  PS: Undefined Boolean Number String Object Null
    ECMAScript不支持任何创建自定义类型,所有值都为6种数据类型之一「ES6可以了」
    变量就是一指向一个值的名称.
    JS变量是松散类型的,不必定义其类型可保存任何类型数据「类似于PHP」
    虽然 JS 可以不定义直接使用变量,但建议先定义再使用.
    一个值可由多个变量指向,但一个变量只能指向一个值.
  var valName   定义变量
    PS:变量定义但未赋值,默认为undefined
    e.g. :
      定义变量box
      var box;  // 但未初始化,系统会设定默认值 undefined(表示未定义)

      var a = b =1;
      相当于
      var a =1; b =1;
    重复的var声明 : 相当于一个赋值操作并不会报错,但不推荐使用
      var box = "fan";
      var box = "abc";  // 相当于 box = "abc";
      console.log(box); // abc
    不使用var定义变量 :相当于给window对象添加属性
      使用var声明的变量不可delete,无var修饰的变量则可以,因为delete用于删除对象属性
      var aoo =1; boo = 2;
      delete aoo;
      delete boo;
      console.log(aoo); // 1
      console.log(boo); // 报错 boo 未定义
    连续定义多个变量 : 中间用逗号隔开
      var box="A", age="20", height="175";
  literal,字面量: 也叫常量或直接量,即直接显示出来的数据值
    100            //数字字面量
    "abc"          //字符串字面量
    false          //布尔字面量
    null           //对象字面量
    /xxx/ig        //正则表达式字面量
    {x:1,y:2}      //对象字面量表达式
    [1,2,3,4,5]    //数组字面量表达式
数据类型 
  基本类型/原始类型
    基本类型:直接存储在栈「stack」中的简单数据段;
      占据空间小、大小固定,属于被频繁使用的数据;
      在某些语言中,字符串以对象的形式来表示,因此是引用类型,但ECMAScript中不是
    基本包装类型 :三种基本类型的变体,在一定条件下,拥有对象的性质
      PS:如可调用方法、设置属性等对象拥有的操作「只有对象才能调用方法」
      隐式创建的包装对象和显式创建的包装对象及区别
        区别1:基本包装对象和对象一样按引用进行比较
          var a1 = "test";
          var a2=new String("test");  // 对象字符串
          console.log(a1 == a2);//true
          console.log(a1 === a2);//false
        区别2: 作用时限
          隐式创建的包装对象其对象性质是临时性的,如访问属性或方法时,此后其对象性质失效
          而显示创建的包装对象则一直存在
          var aoo ="abc";
          aoo.z ="z"; //瞬时存在包装对象,所以不会报错,但后续访该对象被丢弃
          console.log(aoo.z); //undefined ,上一次隐式创建的包装对象用完就消失了
          // 此次访问其z属性又隐式创建了包装对象但并未定义,所以为undefined
          var boo =new String("abc");
          boo.z ="z";
          console.log(boo.z); //z
    Undefined 不存在的值,或尚未赋值的变量
      表示一个变量未赋值
      Undefined 类型只有一个值,即 undefined
      在声明变量时没有对其初始化,则变量的值就是undefined.
      e.g.
      typeof undefined; //"undefined"
      typeof a;         //"undefined"
      console.log(a);   //报错,a未定义
    Null   表示一个空对象指针,表示什么都没有,相当于一个占位符
      PS::将来用于保存对象的变量,可初始化为null.
      e.g. :
      console.log(null==undefined);//true ,undefined派生于null
      var box= null;
      console.log(typeof box);  // object
      console.log(typeof null); // object
    Boolean 布尔值
      PS:Boolean类型有两个值(字面量): true 和 false
        ECMAScript中所有类型的值都可转换成这两个Boolean值等价的值.
      隐式转换为布尔值
        转换为false的值: undefined null 数值0 或 0.0 NaN 空字符串""
        其余全部转换为true
        e.g.
          var box = ''; 
          //条件语句中()内必须是布尔值
          if(box){ console.log('真');}
          else{ console.log('假');} // 假
          
          console.log(!0,!1); // true false
      Boolean(val);  返回转换为的布尔值
        var a=Boolean(0);         // 转换为false
        var a=Boolean(-0);        // 转换为false
        var a=Boolean(0.0);       // 转换为false
        var a=Boolean(NaN);       // 转换为false
        var a=Boolean(undefined); // 转换为false
        var a=Boolean('');        // 转换为false
        其余皆转换为true
    Number  数值
      PS:
        Number类型包含两种数值:整型和浮点型
        JS中整数相除可以到浮点数(不同于C语言)
        可以保存+0 和 -0,且 +0 ===-0;
      数值进制
        PS:在进行算术计算时,所有以八进制和十六进制表示的数值最终都将被转换成十进制数值
        十进制
        八进制     使用0开头,且最大数值不超过7
          若字面量中的数值超出了范围,则前导0被忽略,后面的数值将被当作十进制数值解析
          八进制字面量在严格模式下是无效的,会导致支持的JavaScript引擎抛出错误
        十六进制数 必须使用0x或0X开头,最大字符不超过f
      使用科学计数法表示
        e 可大写,可小写
        默认情况下,ECMAScript会将小数点后面有6个零以上的浮点数使用科学计数法表示
        var a=2E3;//或者2e3
        console.log(a); //2000
        2e3;  //2000
        0.000000005; //5e-9
      浮点类型
        PS:浮点数值中必须包含一个小数点,并且小数点后面至少有一位数字.
        浮点数可省略前导0,但不推荐使用
          var box=3.8;
          var box=.8;  //有效,但不推荐此写法
        浮点型自动转化为整型
          保存浮点数值需要的内存空间比整型数值大两倍,
          ECMAscript会自动将可以转换为整型的浮点数值转换成整型
          var box1=8.;    //小数点后面没有值,转换为8
          var box2=8.0;   //小数点后面是0,转换为8
          console.log(box1);   //8
          console.log(box2);   //8
        浮点数值的精度
          最高精度是17位小数,但算术运算中可能会不精确.
          // 不要使用浮点数做判断
          console.log(0.1+0.2);   // 0.300000000000004
      特殊值
        Infinity(正无穷) -Infinity(负无穷) : 当超过范围时显示
          Number.NEGATIVE_INFINITY  // 负无穷
          Number.POSITIVE_INFINITY  // 正无穷
        NaN 非数值(not a number)
          PS:该数值用于表示一个本来要返回数值的操作数未返回数值的情况(而不会报错)
            在其他语言中,任何数值除以零都会导致错误而终止程序执行,
            但在ECMAScript中会返回特殊的值,不会影响程序执行.
            任何与NaN进行运算的结果均为 NaN
            NaN 不和任何值相等(包括自己)
          Number.NaN;        //NaN,非数值
          e.g.
          var a=0/0;
          console.log(a);  //NaN
          NaN+1;           //NaN
          console.log(NaN == NaN); // false
        // 静态属性,如直接通过Number调用的属性(Number.XX)
        Number.MAX_VALUE;  //1.7976931348623157e+308,最大值
        Number.MIN_VALUE;  //5e-324,最小值
      其他类型→数值
        隐式转换为数值
          undefined转换为NaN;
          null、false转换为0;
          true转换为1;
          e.g.
          console.log(1*"12");  // 12,字符串隐式转换为数值
          console.log(1+"12");  // 112,数值隐式转换为字符串

          var obj ={aoo:1,boo:2};
          obj.valueOf(); // Object {aoo: 1, boo: 2}
          obj.valueOf =function(){ return 100; };
          +obj; // 100
        Number(val);  返回转换为的数值
          Number(true)       // 1;
          Number(false)      // 0
          Number(undefined)  // NaN
          Number(null)       // 0
          Number(number)     // 对应的值
          Number("")         // 0
          其他规则:
            只包含数值的字符串,会直接转换成十进制数值,如果包含前导0则自动去掉.
              Number('070'); //70
              注:若是070(无引号包含)则会转换为8进制数.
              Number(070);   //56
            只包含浮点数值的字符串,会直接转换成浮点数值,如果包含前导0则自动去掉.
            如果不是以上三种字符串类型,则返回NaN
              console.log(Number('123abc123')); // NaN
            若为对象,调用 vaueOf()/toString()方法
              先调用对象的vaueOf()方法,然后依照前面的规则转换返回的值,
              如果转换的结果是NaN,则改用toString()方法,
              然后再依次按照前面的规则转换返回的字符串值.
        parseInt(str,radix); 把字符串转换成整数值
          PS:由于Number()转换字符串时比较复杂且不够合理,更常用的是parseInt()
            忽略字符串前面的空格,直至找到第一个非空格字符
            从数字字符开始解析,直到非数字字符为止,返回解析的数值,后续被忽略(.也被忽略)
            若第一个字符不是数字字符或负号,则返回NaN(空字符返回NaN)
            可以识别十六进制,即字符串以"0x"开头且后面跟数字字符,就会被当作十六进制整数
          Arguments:
            str   被转换的字符串(支持科学计数法形式的转换)
            radix 可选,用于解决各种进制的转换
              当radix为0时,或没有设置该参数时且符合十进制格式时,默认为十进制
              2    二进制
              8    二进制
              10   二进制
              16  十六进制
            e.g.
            parseInt('oxA');     //10,十六进制
            parseInt('070');     //70,十进制
            parseInt('0xALabc'); //10,labc被自动过滤掉了
            parseInt('0xAF');    //175,十六进制
            parseInt('AF',16);   //175,第二参数指定16进制,可以去掉0x前导
            parseInt('AF');      //NaN
          e.g.
            console.log(parsetint('abc123')) //NaN,第一个不是数字会返回NaN
            console.log(parsetint('1a2b'))   //1,从第一个数值开始取直到非数字结束
            console.log(parseInt('3.14'));   //3,小数点不是数值.
            console.log(parsetint(''));      //NaN,空返回NaN

            Number(""); //为0;
            parseInt(""); //为NaN
          ECMAScript 3 和ECMAScript 5 的分歧
            parseInt("070");  // ECMAScript 3 认为是 56(八进制)
            parseInt("070");  // ECMAScript 5 认为是 70(十进制)
        parseFloat(str);     把字符串转换成浮点数值
          和parseInt()类似,区别是数字中可以包含一个点.
          只能解析为10进制数
          如果字符串包含的是一个可解析为整数的数(没有小数点,或小数点后都是零),则返回整数
          e.g.
          parseFloat('123abc');  //123,去掉不识别的部分
          parseFloat('0xA');     //0,不识别十六进制
          parseFloat('12.3.4');  //12.3,只认一个小数点
          parseFloat('01.20');   //1.2,去掉前、后导0
          parseFloat('1.2e7');   //12000000,把科学计数法转化成普通数值
      isFinite(num);  返回数值num是否在可用范围内的布尔值
        isFinite(10); // true
      isNaN(val);     返回是否能转换为NaN的布尔值
        先后调用valueOf() toString() 直到将值转换为数值为止,进行判断
        console.log(isNaN(1));      //false
        console.log(isNaN('1'));    //false,'1'是一个字符串数值,可以转换成数值
        console.log(isNaN(true));   //false,true可以转换为1
        console.log(isNaN('abc'));  //true,'abc'不能转换为数值.
        console.log(isNaN(NaN));    //true
        Remarks:
          当值为对象时,首先调用对象的 valueOf()方法,然后确定该方法返回的值是否可以转换为数值,若不能,则基于这个返回值再调用toString()方法,再测试返回值.
      num.toFixed(x);       将数字保留小数点后x位并转化为字符串(会四舍五入)
      num.toExponential(x); 以科学计数法表示并保留x位小数.并转换成字符串.
      num.toPrecision(x);   以指数或点形式来表示(根据x的长度来决定形式)
    String  字符串
      PS:
        用于表示由零或多个16位Unicode字符组成的字符序列.
        表示显示的字符,使用引号引起来,无特殊含义.
        几乎任何字符都可以放在引号里,JS会将它解析成string.
        双引号或单引号,两种表示方法没有任何区别,但必须成对出现.
        数字使用引号引起来也表示字符,数字字符
      特殊字符:作为一般字符的扩展,可以在字符串中使用特殊字符
        PS:
          String类型包含了一些可能引起歧义的特殊的字符字面量,也叫转义序列.
          有些符号不便放在引号中(如引号,换号符等),需要进行转义.
          在引号中发现的\,其后面的字符有特殊意义.
          可出现在字符串的任何位置.
          被作为一个字符来解释.
        常用特殊字符:
          \0 Null字节
          \b 退格符
          \f 换页符
          \n 换行符
          \r 回车符
          \t Tab (制表符)
          \v 垂直制表符
          \' 单引号'
          \" 双引号"
          \\ 反斜杠字符(\)
          \XXX 由从0到377最多三位八进制数XXX表示的 Latin-1 字符。
            例如,\251 是版权符号的八进制序列。
            严格模式下,不能使用八进制转义字符。
          \xXX 由从00和FF的两位十六进制数字XX表示的Latin-1 字符。
            例如,\ xA9是版权符号的十六进制序列。
          \uXXXX 由四位十六进制数字XXXX表示的Unicode字符。
            例如,\ u00A9是版权符号的Unicode序列
          \u{XXXXX} Unicode代码点 code point 转义字符。
            例如,\u{2F804} 相当于Unicode转义字符 \uD87E\uDC04的简写。
        e.g.
          '\t\n\n'.length; // 3

          var aoo = "read \"book\"";
          console.log(aoo); // read "book"
      创建字符串
        字面量法创建
        new String(); 构造函数创建
        字符串不可单独修改其字符(只能覆盖替换)
          e.g.
          var name = 'abc';
          name[1];   //"b"
          name[1] =0;
          name;      //"abc"
          name ="a";
          name;      //"a"
      其他类型→字符串
        隐式转换为字符串
          使用 空字符+其他值 ""+value
          undefined  "undefined"
          true       "true"
          false      "false"
          null       "null"
          NaN        "NaN";
          数值转换为数值本身(数字字符串).
          其余对象,如果存在这个对象则转换为toString()方法的值,否则转换为undefined.
            e.g. :
            var obj ={aoo:1,boo:2};
            obj.toString(); // "[object Object]"
            obj.toString =function(){ return "hello"; }; // 自定义该对象的toString方法
            "a" + obj; // "ahello"
        val.toString(); 参见通用方法
        String(val);      返回转换后的字符串
          若值存在toString()方法,则调用该方法(没有参数)并返回相应的结果
          否则(即值为null或undefined),则返回"null"或'undefined'
          String(num)       "数值"
          String(str)       "字符串"
          String(true)      "true"
          String(false)     "false"
          String(undefined) "undefined"
          String(null)      "null"
          e.g.  String(1); //"1"
      模版字符串 `abc${1+2}`  [ES5新增]
        多行字符串又称模版字符串,使用反引号引起来,如 `字符`
        模版字符串可以跨越多行
        e.g.
          var str =`a
            b
            c`;
          console.log(str);
          // "a
          //   b
          //   c"
        模板占位符 `${}`
          ${str1}表示变量字符串str1表示的字符
          e.g.
          var aoo="fan";
          var boo=`${aoo} hello!`;
          // 此处使用反引号(数字1的左边的按键)引起来
          console.log(boo);   //fan hello
      ◆信息获取
      str.length;   返回字符串的字符个数的数值
        或 str["length"]
        e.g. :
        "abc".length;    // 3
        "abc"['length']; // 3
      ◆字符获取
      str[index]; 下标法访问字符串字符
      str.charAt(index); 返回指定下标对应的字符
        e.g. :
        "abcdefg".charAt(1); // "b"
      str.charCodeAt(index); 返回以Unicode编码形式指定索引位置的字符
        e.g.
        'Ab'.charCodeAt(1)   //98
        'abc'.charCodeAt(0)  //97
      ◆字符串获取
      str.slice(begin,end);    字符截取
        PS:截取的内容不包括end下标对应的字符.
          即截取的长度为:结束下标-开始下标
          该方法也可对数组进行截取
        begin:开始下标;end:结束下标,可选,省略表示到最后
          当begin或end有为负数时,则使用str.length+n代替
        返回一个新字符串
      str.substr(begin,num); 返回指定位置开始的num个字符串
        当只有一个参数且负数时,同 slice
        当n为负数或0时,返回空字符串.
      str.substring(begin,end);  返回截取的新字符串
        Arguments:
          begin 数值,必须,若为负数返回全部字符串
            str.substring(-begin);
          end   数值,可选,若省略表示到最后,若为负,则取0
          以两个参数中较小一个作为起始位置,较大的参数作为结束位置
          e.g.
          str.substring(1,4) 等价于 str.substring(4,1)
      ◆字符串对比
      str1.indexOf(str2,begin); 从指定位置向后首个指定字符串的下标
        当begin不存在时,直接从头开始
        RetValue:检测字符不存在则返回-1
        e.g.
        'abcdef'.indexOf('bc')   // 1
        'abcdef'.indexOf('ac')   // -1
      str1.lastIndexOf(str2,begin);从指定位置向前的首个指定字符串的下标
        当begin不存在时,表示从末尾开始搜索.
        RetValue:搜索字符不存在时,返回-1
      str1.search(str2);   返回字符串的位置
      str1.match(str2);    返回查找到的字符str2或null
      str1.includes(str2); 返回是否包含str2的布尔值
       (ES6新增)
        e.g. 'good'.includes('o') // true
      str1.localCompare(str2); 返回两个字符串比较的数值表示
        若str1和str2相同,返回0;
        第一个不同字符,str1在str2前,返回1,否则返回-1
      str1.localeCompare(str2); 使用本地特定的顺序来比较字符串
        若str1大则返回1,相等返回0,否则返回-1
      ◆字符串修改
      str1.replace(regexp/str2,replacement)  字符替换
        返回值为 使用replacement替换str1中第一个str2后的 结果字符串
        e.g.: 'abcde'.replace('ab','11'); // "11cde"
      str1.split(str2)    通过字符分割成数组
        与 join 或互为反操作
        str.split("字符x") 将str字符串通过其中的字符x作为分割,返回字符串数组
        str.split()        则将str作为一个元素放入一数组中.
        e.g.
          将arr使用-进行分割成数组
          var arr = "1-2-3"
          arr.split("-"); //返回值为["1","2","3"]

          var aoo = '1020304';
          aoo.split('0').join(''); // "1234"
      str.concat(str1,str2,...);  字符串拼接
      str.trim() 去除字符串开始和结束的空格
      ◆字符串转换
        PS:只有几种语言(如土耳其语)具有地方特有的大小写本地性,
          一般是否本地化效果是一致的
      str.toUpperCase(); 转换为大写,返回转换后的值
      str.toLowerCase(); 转换为小写,返回转换后的值
      str.toLocaleLowerCase();  将字符串全部转换为小写,并且本地化
      str.toLocaleUpperCase();  将字符串全部转换为大写,并且本地化
      ◆静态方法
      String.fromCharCode(num,num...); 得到指定的Unicode值对应的字符
        e.g. :
        String.fromCharCode(72,69,76,76,79); // "HELLO"
      ◆借用 方法
      Array.prototype.join.call(str1,str2);
        e.g. :
        var str ="123456";
        var s ="-";
        Array.prototype.join.call(str,s); // "1-2-3-4-5-6"
    Symbols  符号 [ES6+]
      一个不可变的数据类型,用来产生唯一的标识,也无法直接访问这个标识
      创建符号
        e.g. :
          var sym = Symbol("some optional description");
          console.log(typeof sym); // symbol
        ES6 开始不再支持构造函数创建一个显式包装器对象
          现有原始包装器对象,遗留原因仍可创建.(如new Boolean new String new Number)
          var sym = new Symbol();  // TypeError,报错
        但仍可以使用 Object() 函数创建一个符号包装对象(Symbol wrapper object)
          var sym = Symbol("foo");
          typeof sym;     // "symbol"
          var symObj = Object(sym);
          typeof symObj;  // "object"

        Symbol("foo") === Symbol("foo"); // false
        Symbol("foo") == Symbol("foo");  // false
  引用类型 :Object 对象
    PS:JS中所有对象都为引用类型,引用类型只包含有对象.(即1对1的等价关系)
      访问对象的不存在的属性,不会报错,返回值为undefined
    引用类型值的读、写
      自我总结
        按引用访问,传递的是指针(引用),一个对象可由多个指针访问.
        覆盖时,则改变指针的指向;
        修改时,改变的是指针指向的实际值.
      权威说法
        引用访问:先从栈中读取内存地址,再通过地址找到堆中的值.
        对象在栈内存中保存一个指向堆(heap)内存中对象位置的指针,由堆内存保存对象
        引用类型赋值时,在堆内存中为这个值分配空间.由于这种值大小不固定、一般占用空间较多
        但内存的地址大小是固定的,可以将内存地址保存在栈内存中,
        如果存储在栈中,将会影响程序运行的性能；
        保存在堆内存中,
        包含引用类型值的变量实际上包含的并不是对象本身,而是一个指向该对象的指针.
        从一个变量向另一个变量复制引用类型的值,复制的其实是指针,因此两个变量最终都指向同一个对象.
      e.g.:
      引用类型值按引用地址来比较
        var aoo={a:1};
        var boo={a:1};
        var coo =boo;
        console.log(aoo == boo);  // fasle,值相同但地址不同
        console.log(aoo === boo); // fasle,值相同但地址不同
        console.log(coo === boo); // true,引用地址相同
      修改引用类型的值&改变变量的指向
        var aoo ={ name:'abc', age:19 };
        var boo =aoo; // aoo 和 boo 指向同一对象
        boo;      //{name: "abc", age: 19}
        boo.name ="aaa";//修改堆内存中的对象
        aoo.name; //aaa
        aoo =1;   //改变 aoo,不再指向对象
        boo;      // {name: "aaa", age: 19},boo仍指向对象
      函数是对象
        var foo =function(){ console.log(1); }
        var goo =foo; //表示变量 aoo 和 boo 指向同一函数
        foo =2; // 改变 aoo,不再指向函数
        console.log(goo()); // 1, boo 仍指向该函数
        console.log(foo()); // 报错
      对象按照地址来进行的比较,而非按属性或内容来进行比较
        相同对象的两个引用 和 具有相同属性的两个对象 的区别
        var obj1 = {aoo:1};
        var obj2 = {aoo:1};
        var obj3 = obj1;
        obj1 == obj2;   // false
        obj1 == obj3;   // true
        obj1.aoo = 2;
        obj3.aoo;    //2
        obj2.aoo;    //1
        obj1和obj3是两个变量名,指向的相同的值---内存中的一个实际对象
        因此修改了obj1的值的同时也改变了obj3的值;
        变量obj2指向的是另外一个对象,只是和obj1有相同的属性而已
    类: 语言提供的自定义数据类型的机制,用于自定义对象.
      PS:通过类来定义对象.
        面向对象语言中 class 关键字声明类,ECMAScript中没有类 [ES6中新增]
        对象的数据类型是类,对象就是类的具象化.
      仿造类的实现方式：
        工厂模式 : 一个返回特定对象类型的函数
          每次调用工厂函数,都会创建一个新对象
          e.g. :
          function createCar(name,color) {
            var car=new Object();
            car.name=name;
            car.color=color;
            car.showColor=function() { console.log(car.color+" is beautiful"); }
            return car;
          }
          var car1=createCar('法拉利',400,"red");
          car1;              //{name: "法拉利", color: "red"}
          car1.showColor();  //red is beautiful
          问题:创建的多个对象之间无共享内容
        构造函数方式 : 相当于JS的类(也叫做伪类)
          e.g. :
          function Car(name,money,color) {
            this.name=name;
            this.money=money;
            this.color=color;
            this.showColor=function() { console.log(this.color+' is beautiful'); }
          }
          var car1 =new Car('法拉利',400,"red");
          car1;                    //Car {name: "法拉利", money: 400, color: "red"}
          car1.showColor();         //red is beautiful
          特点:在构造函数中,内部无创建对象,而是使用this关键字;
            使用new运算符调用构造函数时,创建对象实例
        原型方式(也叫混合的构造函数)
          用构造函数定义对象的独有的属性/方法,用原型方式定义共有属性/方法
          e.g. :
          function Car(name,color) { this.name=name; this.color=color; }
          Car.prototype.showColor=function() {
            console.log(this.color+" is beautiful");
          }
          var car1=new Car("aoo","red");
          var car2=new Car("boo","blue");
          console.log(car1.color);  //red
          console.log(car2.color);  //blue
        动态原型方式 : 和原型方式相同,唯一不同之处在于对原型方式的优化
          e.g. :
          function Car(color,name) {
            this.color=color;
            this.name=name;
            if(typeof Car._initialized=="undefined") {
              Car.prototype.showColor=function(){ alert(this.color); }
            }
            Car._initialized=true;
          }
          该方式 Car.prototype.showColor 只被创建一次,这段代码更像其他语言中的类定义了
      class 类 [ES6新增]
        ES6提供了更接近传统语言的写法,引入了Class(类)这个概念,作为对象的模板.
        创建类
          通过 class 关键字定义类
            class Cla{
              constructor(aoo,boo){ this.aoo =aoo; this.boo =boo; },
              toString() { return '('+this.x+', '+this.y+')'; }
            }
            var cla1 =new Cla(1,2);
            cla1; // Cla {aoo: 1, boo: 2}
          constructor 方法:类的默认方法,通过new命令生成对象实例时,自动调用该方法.
        类的特点
          继承 : 通过 extends 关键字实现继承
            子类继承父类的属性和方法
              class Point {
                constructor(x, y) {
                  this.x = x;
                  this.y = y;
                }
              }
              class ColorPoint extends Point {
                constructor(x, y, color) {
                  // this.color = color; // 错误
                  super(x, y);
                  this.color = color; // 正确
                }
              }
              上面代码中,子类的constructor方法没有调用super之前,就使用this关键字,结果报错,
              而放在super方法之后就是正确的.
              var cp = new ColorPoint(25, 8, 'green');
              cp instanceof ColorPoint // true
              cp instanceof Point // true
          class的取值函数(getter)和存值函数(setter)
            在Class内部可以使用get和set关键字,对某个属性设置存值函数和取值函数.
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
        // 相关操作
        Cla.name;  获取类的名字
    创建对象
      PS: ECMA-262 的定义为:无序的名值的合集
        对象一般没有长度,具有多种属性的内容结构 .
        与C++、Java不同,JS是一种基于原型的编程语言,没有类,而把构造函数用作类.
        对象由属性和值构成,值可以为基本值、对象或函数等任何类型.
        JS中几乎所有的事物都是对象,对象是拥有属性和方法的数据.
        对象其实就是一组数据和功能的集合.
        概念类似的有:python的字典,C/C++的散列表,Java的HashMap,PHP的关联数组等.
        对象的种类: JS内置对象(如 Number)、宿主环境(如 window)、自定义(如 {}).
      对象的表现形式:  键-值(key-value)对
        { 键1:值1, 键2:值2, ... }
        键key: 叫做属性名或方法名;值value:为属性值或方法(函数).
        属性名key 的使用规范
          对象的每一个属性都是用一个名称来标记的,
          属性名称可以为任何字符(不只是合法的变量名).
          创建对象时,属性名除数字外,否则都需要用引号包住.(不用引号也不会报错)
          属性名必须使用引号括起来的情况
            若属性名中包含特殊字符(除字母、数字、下划线以外的字符)
            若属性名以数字开头
            属性名为JavaScript保留字
          e.g.
          var aoo ={ "d sd ":1 }
          aoo["d sd "]; // 1
        类似数组的表现形式,但无长度属性
       (可使用 Object.keys(obj).length 求出其属性的个数)
        e.g. :
        var obj={};
        obj[0]="a";
        obj[1]=12;
        obj["a"]="abc";
        console.log(obj);        // {0:"a", 1:12, a:"abc"}
        console.log(obj.length); // undefined
        Object.keys(obj).length; // 3
      字面量 {}     创建对象
        var box=null; 初始化对象
        var obj={}    没有任何属性的对象(空对象)
        var obj1={属性1:值1,属性2:值2,...}    //名值对间使用逗号隔开.
        不能传参改变key值,可传参改变val值
          var voo1 = 'a' ,
              voo2 = 'b' ,
              koo1 = 'c' ,
              obj = { koo1 : voo1, 'koo2' : voo2 };
          console.log(obj); // { koo1 : "a", koo2 : "b" }
          类似的对于数组
          var voo1 = 'a' ,
              voo2 = 'b' ,
              arr = [voo1,voo2];
          console.log(arr); // ["a", "b"]
          
      new Object(value); 创建对象
        PS:即使用原生构造函数Object来创建对象
          使用构造函数创建对象需使用new操作符
        Arguments:括号里可以任意传参,可以传数值、字符串、布尔值等,而且还可以进行相应的计算.
          若无参数可省略括号:var obj =new Object; 有效,但不推荐使用.
        e.g.
          var box=new Object(2);  //Object类型,值是2
          box;  //Number {[[PrimitiveValue]]: 2}
          var age=box+2;          //可以和普通变量运算,会隐式转换
          age; //4

          var b =new Object({x:1})
          console.log(b);          //Object {x: 1}
          console.log(b.__proto__);//Object {}
        使用new 构造器,创建对象经历的过程
          1 创建一个新对象
          2 将构造函数的作用域赋值给新对象(因此this就指向了这个新对象);
          3 执行构造函数中的代码(为这个新对象添加属性);
          4 返回新对象
        使用new操作符来创建其它类型的对象.(Number()、String()等)
          var box1=new Number();
          var box2=new Number(1);
          console.log(box1);    //Number {[[PrimitiveValue]]: 0}
          console.log(box2);    //Number {[[PrimitiveValue]]: 1}
          typeof box2;          //返回值为"object"
        使用new的注意点
          var o = new myObject();
          上面这种做法的问题是:
          一旦你忘了加上new, myObject()内部的this关键字就会指向全局对象,
          导致所有绑定在this上面的变量,都变成全局变量。
          因此,建议使用Object.create()命令,替代new命令。
          如果不得不使用new,为了防止出错,最好在视觉上把构造函数与其他函数区分开来。
          比如,构造函数的函数名,采用首字母大写(InitialCap),其他函数名一律首字母小写。      
      自定义构造函数 创建对象
        function Foo(aoo,boo){ this.azz=aoo; this.bzz=boo; }
        var obj=new Foo(2,3);
        obj; //Foo {azz: 2, bzz: 3}
        Remarks:
          和工厂模式比较,构造函数创建的对象可以将其标识为一种特定的类型
          当创建对象时未使用new则会导致window对象属性的意外增加
            this在运行时绑定,直接调用Person(),this映射到window上
            function Foo(aoo,boo){ this.azz=aoo; this.bzz=boo; }
            var obj= Foo(2,3);
            console.log(azz);
            console.log(bzz);
      工厂模式  创建对象
        PS:工厂模式时软件领域一种广为人知的设计模式
        function createObject(name,age){    // 创建工厂函数
          var obj=new Object();             //创建对象
          obj.name=name;                    //添加属性
          obj.age=age;
          obj.run=function(){               //添加方法
            return this.name+this.age+"运行中";
          };
          return obj;                       //返回对象引用
        }
        var aoo=createObject("lee",100);       //创建第一个对象
        var boo=createObject('jack',200);      //创建第二个对象
        aoo.run();    //"lee100运行中"
        boo.run();    //"jack200运行中"
        缺点:
          无法继承
          无法识别对象(获取对象的类型)
      Object.create() 创建对象(ES5新增)
        var obj =Object.create(obj.__proto__,{新增属性/方法 及特性});
        e.g.
          var aoo = {x:1};
          var boo = Object.create(aoo);
          console.log(boo);   // {}
          boo.__proto__;      // {x: 1}

          var aoo = {x:1};
          var boo =Object.create(aoo,{
            age:{value:22,writable:false},
            address:{value:"beijing",writable:true}
          });
          boo; // {age: 22, address: "beijing"}
          boo.__proto__;  // {x: 1}

          var obj=Object.create(Object.prototype);
          obj;  // {} ,创建一个空对象
     (详参 类)
      e.g.:
        var box=new Object(); //创建一个对象
        box.name='abc';           //给box对象添加name属性并赋值.
        box.age=20;               //给box对象添加age属性并赋值.
        alert(box.age);           //打印出box对象age属性的属性值.
        var box=Object();    //new关键字可以省略
        var box={};          //字面量方式创建的对象.
        var box={            //字面量创建对象及其属性.
          name:'abc';
          age:19;
        };
        alert(box['name']);  //用数组的方式输出.
        var box={            //给对象创建方法
          run:function(){    //匿名函数
          }
        }
        alert(box.run());
        //没有括号(如box.run)会打印代码(即该函数),有括号(即执行函数)会打印返回值.

        var obj={
          name:"小明",
          age:12,
          sex:"男",
          sayhi:function(){
            return "say";
          },
          info:function(){
            return "用户名"+this.name+"年龄"+this.age;   //使用this访问当前对象的属性
          }
        }
        obj.info();
    对象属性&对象操作
      对象属性的属性或特性
        数据属性:  包含4个描述属性行为的特性
          PS:后3个只能通过函数来设定
          value        属性的值.默认为 undefined
          writable     默认true,表示能否修改属性的值
          enumerable   默认true,能否枚举(即是否可通过for in 枚举)
          configurable 默认true,能否通过delete删除,能否配置(修改其属性等)
            不可逆性:一旦把属性定义为不可配置的,就不能再把其变回可配置的了
        访问器属性:包含4个特性描述
          get  设置获取属性值时的操作,默认返回属性值
          set  设定设置属性值时的操作,默认返回属性值
          enumerable    同数据属性
          configurable  同数据属性
          e.g.
            var person={
              name:"小明",
              sex:"男",
              // 注意此处无冒号
              get age(){ return 12; },
              set age(val){ console.log("设置为"+val) }
            }
            person.age;       //12
            person.age=16;    //设置为16

            var obj={
              x:3,
              y:4,
              z:5,
              get sum(){ return this.x+this.y+this.z; },
              set double(val){ this.x*=val, this.y*=val, this.z*=val }
            };
            obj.sum;        //12
            obj.double=2;
            obj.x;          //6
            obj.sum;        //24

            var obj={};
            Object.defineProperty(obj,"a",{
              //注意此处有冒号
              get:function(){ return 12; }
            });
            obj.a;      //12

            var book ={year:2004,edition:1};
            Object.defineProperty(book,"name",{
              get :function(){ return 1; },
              set : function(value){ this.edition = value; }
            });
            book.name;       // 1
            book.name =11;
            book.edition;    // 11

            function Foo(){ };
            Object.defineProperty(Foo.prototype,'z',{
              get:function(){return 1; }
            })
            var obj =new Foo();
            obj.z; // 1
            obj.z =11;
            obj.z; // 1
            Object.defineProperty(obj,'z',{
              value:100,configurable:true
            });
            obj.z; // 100
            delete obj.z;
            obj.z; // 1
          Remarks:
            在使用Object.defineProperty 函数时,不一定非要同时指定set 和 get,
            只指定get时,意味着属性不能写,尝试写入被忽略;
            类似的只指定set则属性不能读 ?.
        ◆定义/修改
        Object.defineProperty(obj,"key",obj1); 定义属性及其特性
          PS:通过该方法创建的属性,其3个特性未设置时默认为false
            不能同时定义数据属性和访问器属性(要分开定义)
          obj  为属性所在的对象
          key  为所在对象的属性的名字
          obj1 特性的描述对象
          e.g.
          var obj ={"sex":"男"}
          Object.defineProperty(obj,"name1",{
            value:"小明",
            writable:true,
            enumerable:true,
            configurable:true
          });
          obj.name1;
        Object.defineProperties(obj,obj1);  同时定义多个属性及特性
          Arguments:
            obj  修改的目标对象
            obj1 属性名及其对应的属性组成的对象
          e.g.
            var obj = {};
            Object.defineProperties(obj, {
              aoo: {
                value: 101,
                writable: true,
                enumerable: true,
                configurable: true
              },
              boo: {
                set: function(x) {
                  document.write("in property set accessor" + newLine);
                  this.newaccpropvalue = x;
                },
                get: function() {
                  document.write("in property get accessor" + newLine);
                  return this.newaccpropvalue;
                },
                enumerable: true,
                configurable: true
              }
            });
        ◆查询
        obj.hasOwnProperty("propName"); 返回对象上是否有该属性的布尔值,不包括继承的属性
          e.g.
          var obj={"name":"abc"};
          obj.hasOwnProperty("name"); //true
        obj.propertyIsEnumerable("propName"); 表示对象属性是否可以枚举的布尔值
        Object.getOwnPropertyDescriptor(obj,"propName"); 返回对象指定属性的特性描述对象
          PS:可对DOM或BOM对象使用该方法.
            若查询的属性不存在则返回undefined.
          var obj ={aoo:"a"};
          Object.getOwnPropertyDescriptor(obj,"aoo");
          //Object {value: "a", writable: true, enumerable: true, configurable: true}
        ◆阻止
        Object.getOwnPropertyNames();  返回对象所有自有属性名(数组形式)(包括不可枚举的属性)
        Object.isExtensible(obj);      表示对象能否扩展的布尔值
        Object.isSealed(obj);     表示对象对象是否被密封的布尔值
        Object.isFrozen(obj);     表示对象是否被冻结的布尔值
        ◆操作对象
        Object.preventExtensions(obj); 设置对象不可扩展(ES5新增)
          不能给对象添加属性,但可以修改和删除已有属性
          只是对对象操作,对其原型链无影响
        Object.seal(obj);        密封对象(ES5新增)
          不可扩展,不可删除,但可修改其属性值
          只是对对象操作,对其原型链无影响
        Object.freeze(obj);      冻结对象(ES5新增)
          最严格的防篡改级别
          既不可扩展,又是密封的,且属性值也不可修改
          只是对对象操作,对其原型链无影响
      ◆操作对象的属性
        PS: 访问对象不存在的属性,不会报错,返回值为undefined
          对象的属性可以手动赋值,进行覆盖修改.
          对象默认是可扩展的,可以向对象中添加、删除属性和方法
      obj.属性名 或 obj["属性名"]  读、写对象的属性值
        PS:属性名不是一个合法的变量名时,不可使用下标法访问,只能使用中括号的形式访问.
          括号内的部分可以为任意表达式,系统自动将其转化为字符串来判断是否有该属性
          即也可以使用变量名当成属性名调用
        e.g.
          var aoo = "length";
          var str = "abc";
          str[aoo];   //3
          str.aoo;    //undefined,str无aoo属性.
      obj.键名();     调用对象的方法
      str in obj;    返回对象中是否有某属性的布尔值
        var obj ={ aoo:1, boo:"a" }
        'aoo' in obj; //true
        'boo' in obj; //true
        'coo' in obj; //false

        var box = {"a":1};
        box.content = box;
        "content" in box;                         //true
        "content" in box.content;                 //true
        "content" in box.content.content;         //true
        "content" in box.content.content.content; //true
        PS-Self:box.content = box ,则始终将其带入box.content.content.content;运算?
      delete obj.key 或 delete obj["key"] 删除属性
        PS: 对于数组可以删除键值对,但仍会保留位置(该处显示为undefined);对象中不会
        若删除成功返回 true,否则返回 false
        若删除不存在的值也会返回true
        不能删除继承的属性,否则不会删除,返回false
        e.g. :
        var obj ={aoo:1,boo:"a"};
        delete obj.aoo; //true
        obj; // {boo: "a"}
      Object.keys(obj); 以数组形式返回对象不包含原型的所有属性名
        应用: 获取对象的"长度"
          Object.keys(obj).length;
        e.g.
        var obj ={
          aoo:"a",
          boo:22,
          foo:function(){ console.log("hello") }
        }
        obj.__proto__.doo=1;
        obj.constructor.prototype.eoo =11;
        console.log(obj.doo); //1
        console.log(obj.eoo); //11
        Object.keys(obj); //["aoo", "boo", "foo"]
      for(var key in obj){}        遍历属性  [详参 语句]
      Object.assign();  合并多个对象
        e.g.
        var obj1 ={name:"abc"};
        var obj2 ={height:180};
        var obj3 ={sex:"man"};
        Object.assign(obj1,obj2,obj3);
        // {name: "abc", height: 180, sex: "man"}
    对象的 原型&继承&多态
      对象的构造原型 :构造函数的原型对象
        PS:函数对象的属性prototype也是一个对象,
          只有函数对象才有prototype(原型)属性
        原型的 作用原理&执行流程
          创建的每一个函数都有一个prototype(原型)属性,
          这个属性是一个指针,指向一个对象.
          构造函数的prototype的属性/方法,所有的实例化后的对象都可以'继承'到.
          对象实例中的属性或方法,优先级高于原型中的(原型中的属性/方法仍存在)
          原型模式的执行流程:
          1 先查找自身对象中的属性和方法,若有则返回
          2 若自身无,则去其原型对象中查找,若有则返回
          3 否则没有
        原型的 创建&获取
          字面量方式 创建原型
            存在问题: Foo.prototype.constructor 被覆盖,
              即 obj.constructor 不再指向构造函数(而指向Object).
              但使用 instanceof 效果不变.
            决解方案:强制指定constructor
            e.g. :
            function Box(){ }
            Box.prototype={ run:function(){return 1;} }
            var box1 =new Box();
            box1.constructor; // function Object() { [native code] }
            // 实例的构造函数指向Object
            字面量方式改进为:
            Box.prototype={
              constructor:Box, // 强制指定到Box
              run:function(){return 1;}
            }
          动态原型模式: 将原型封装到构造函数里
            PS:原型的初始化只要第一次初始化就可以了.
              没必要每次构造函数实例化的时候都初始化
              并同时解决了封装问题
            function Box(name){
              this.name=name;
              if(typeof this.run!="function"){ //判断this.run是否存在
                Box.prototype.run=function(){ return this.name; };
              }
            }
            var box1=new Box("a");
            var box2=new Box("Jack");
          通过不同方法创建的对象,其(原型链的中间)原型不同
            通过构造函数创建的对象,则该对象原型为 构造函数名.prototype;
            通过字面量{}或new Object({})创建的对象,原型为{}本身 即 Object.prototype;
          原型的获取
            obj.constructor.prototype;  通过 构造函数 获取原型
              只有函数才有prototype属性,表示函数的原型(也就是实例对象的原型)
            obj.__proto__;  通过 对象实例 的__proto__  [隐式获取]
              对象的__proto__ 属性,直接和其构造函数的原型相关联(忽略了构造器中间桥梁)
              __proto__是非标准的,IE中没有,不建议使用
              obj._proto_=null;在对象中添加表示不从原型中继承属性.
              obj.__proto__ === obj.constructor.prototype; //true
              e.g. :
              obj.__proto__.aoo =12;
        原型的 修改&重设 的区别
          PS:当重新定义构造函数的原型时(即改变其整个原型时,而非修改其部分),
            已创建的对象其指向的原型仍然不变,
            但会影响到更改后再创建的对象的原型.
          e.g. :
          function Foo(){this.aoo =1; this.boo =2;}
          Foo.prototype.azz =1;
          var obj =new Foo();
          console.log(obj.azz); // 1
          Foo.prototype.azz =4;        // 修改原型部分
          console.log(obj.azz); // 4 ,跟随变化
          Foo.prototype ={azz:11};     // 重定义原型
          console.log(obj.azz); //4 ,无变化
          原对象的 __proto__ 指向无变化,后续重设相当于又增加了一条链.
          var obj1 =new Foo();
          console.log(obj1.azz); //11,改变后续生成对象的 __proto__ 指向
        修改实例来自于原型的引用类型,会修改原型
          e.g. :
          function Person(){ };
          Person.prototype ={ "constructor":Person, "friends":["a","b"] }
          var p1 =new Person();
          var p2 =new Person();
          p1.friends.push("c");
          console.log(p1.friends);  // ["a", "b", "c"]
          console.log(p2.friends);  // ["a", "b", "c"]
          p1.friends =["1"];  // 定义 p1 实例中的属性
          console.log(p1.friends);  // ["1"]
          console.log(p2.friends);  // ["a", "b", "c"]
          决解方法:只将共享的且不再改变的属性和方法放入原型中.
            设置原型中的属性为只读(SelfPoint)
        ◆相关操作
        key in obj; 若obj(包括原型)中有属性key,则返回true,否则false
        Object.getPrototypeOf(obj); 获取对象的原型对象(ES5新增)
          等价于 obj.__proto__
        修改JS内置数据类型的prototype
          e.g.
          String.prototype.abc='AA'
          'aaa'.abc;  //'AA'
          通过赋值undefined覆盖,来删除定义的prototype
        delete 构造函数.prototype.属性  删除原型属性
        delete obj.属性                删除实例属性
        构造函数.prototype.属性 ='XX'   覆盖原型属性
      原型链继承
        PS:JS中的面向对象继承机制基于原型,将原型链作为实现继承的主要方法
          基本思想:利用原型让一个引用类型继承另一个引用类型的属性和方法
          通过实现原型链,本质上扩展了原型搜索机制
        ◆相关操作
        obj instanceof 构造函数; 是否处于对象的原型链上 [详见: 关系运算符]
        Obj.isPrototypeOf(obj);  判断obj的原型链上是否有Obj原型对象
          若是则返回true,否则返回false
          e.g.
          function Foo(){};
          var aoo =new Foo();
          Foo.prototype.isPrototypeOf(aoo);    //true
          Object.prototype.isPrototypeOf(aoo); //true
        问题: 原型中的缺点带到了原型链中
        e.g. :
          function A(){ this.name="abc"; }
          function B(){ this.age=99; }
          function C(){ this.level="aaa"; }
          //通过原型链继承
          B.prototype=new A();
          // new A();     //A {name: "abc"}
          C.prototype=new B(); //通过原型链继承
          var c1=new C();
          c1.name;        //"abc"
        其他方法的继承
          PS:ECMAScript只支持继承,不支持接口实现
            其他正统面向对象语言都会用两种方式实现继承:一个是接口实现,一个是继承.
            被继承的函数叫做超类型(父类或基类),被继承的函数叫做子类型(子类或派生类)
            JS中所有的构造函数都继承自Object [系统设定]
          拷贝方式继承
            对象的拷贝
              var person={
                name:"abc",
                age:22,
                address:{
                  home:"home adress",
                  office:"office address"
                },
                hobbies:["football","watched movie"]
              }
              var programer ={ language:"js" }
              // 定义一个实现深拷贝的函数 将aoo拷贝到boo中
              function copyDeeply(aoo,boo){
                var c =c||{};
                for(var key in aoo) {
                  if(typeof aoo[key] ==="object") {
                    boo[key] =(aoo[key].constructor ===Array)?[]:{};
                    copyDeeply(aoo[key],boo[key]);
                  }else { boo[key] =aoo[key] }
                }
              }
              copyDeeply(person,programer);
              programer;
              //Object {language: "js", name: "abc", age: 22, address: Object, hobbies: Array[2]}
            构造函数拷贝
              function Foo(){ this.name ="abc"; this.age =19; }
              function Goo(){ Foo.apply(this); this.height =180; }
              var obj =new Goo();
              console.log(obj); //Goo {name: "abc", age: 19, height: 180}
          链接式继承
            子对象和父对象链接
              var parent ={ name:"abc" }
              // 定义一个继承函数
              // 相当于 浏览器自带 Object.create() 功能
              function createObj(obj){
                function Foo(){};
                Foo.prototype =obj;
                var aoo =new Foo();
                return aoo;
              }
              var child =createObj(parent);
              console.log(child);      //Foo {}
              console.log(child.name); //abc
          构造继承
          对象冒充(也叫借用构造函数、伪造对象或经典继承)
            PS: 对象冒充只能继承父类构造函数里的属性或方法
              父类原型中的方法或属性不可被继承
            共享的属性或方法放不要放在被继承的构造函数中,否则造成浪费
              解决方法:直接定义子类构造函数的原型即可
            e.g. :
            function B(name,age){this.name=name; this.age=age; }
            B.prototype.sex ='man';
            function A(name,age){ B.call(this,name,age); }  // 对象冒充
            A.prototype.address ='aa';
            var obj =new A('abc',100);
            console.log(obj.name);    // abc
            console.log(obj.sex);     // undefined
            console.log(obj.address); // aa
          原型式继承
            // 定义一个中转函数
            function obj(o){    //o表示将要传递进入的一对象
              function F(){}    //F构造是一个临时新建对象
              F.prototype =o;
              return new F();
            }
            var aoo ={ name:'abc', age:100 };
            var obj =obj(aoo);  // 实例化 obj对象
            obj;       //F {}
            obj.name;  //"abc"
            obj.__proto__; // Object {name: "abc", age: 100}
          寄生式(parasitic)继承
          寄生组合式继承
          组合继承(也叫伪经典继承)
            JavaScript中最常用的继承模式
      多态 :JS无多态
        假如有多态功能:
          定义多个函数,(函数名相同)区别是传入的参数不同,
          调用时,会根据传入参数的不同自动选择对应的函数执行.
          JS中:会产生覆盖,只有最后一个定义的函数有用.
  数据类型相关的方法、功能
    ◆类型检测
      typeof val;               [详参 一元运算符]
      obj instanceof Object;    [详参 关系运算符]
      Object.prototype.toString.call(val); 获取值类型
        e.g. 判断值是否为数组
        var a ="1";
        var b =1;
        var c =[1];
        var d ={age:1}
        Object.prototype.toString.call(a);  //"[object String]"
        Object.prototype.toString(a);      // "[object Object]"
        Object.prototype.toString.call(b);  //"[object Number]"
        Object.prototype.toString.call(c);  //"[object Array]"
        Object.prototype.toString.call(d);  //"[object Object]"
      obj.constructor
      duck type
    ◆数据通用属性/方法
      Remarks:
        Date实例的toLocaleString toString valueOf 方法,返回值有不同
          var box=new Date(2007,10,15,17,22,45,15);
          console.log(box);
          //Thu Nov 15 2007 17:22:45 GMT+0800(中国标准时间)
          console.log(box.toString());
          //Thu Nov 15 2007 17:22:45 GMT+0800(中国标准时间)
          console.log(box.toLocaleString()); //2007/11/15 下午5:22:45
          console.log(box.valueOf());        //1195118565015
          注:toLocaleString 和 toString 方法在不同浏览器显示的效果可能不一样,
            一般调试使用.
        e.g.
        var box=["a",18,"js"];  //字面量数组
        box.valueOf();  // ["a", 18, "js"]
        box.toString(); // "a,18,js"
        box.toLocaleString();//"a,18,js"
        上面显示一致,当出现如时间的属性时,则返回字符串格式参照本地时间格式.
      Object 类型是所有它的实例的基础
        PS:Object类型所具有的任何属性和方法同样存在于更具体的对象中
          ECMA-262 中对象的行为不一定适用于JavaScript中的其他对象,
          比如BOM和DOM中的对象都属于宿主对象,由宿主实现提供和定义的,
          ECMA-262 不负责定义宿主对象,因此宿主对象可能不会继承Object.
      val.constructor;     返回创建该对象的构造函数
      val.hasownProperty(str);   见上文
      val.isPrototypeOf(obj);    见上文
      val.propertyIsEnumerable(str);  见上文
      val.toString([num]);   转换为字符串
        PS:数值 布尔值 对象和字符串都有 toString() 方法.(null和undefined没有)
        Arguments: num 可选,为表示进制的数值,一般为2、8、16 等
          未填写,num默认为10进制
        foo.toString(); 返回定义该函数对象的字符串(函数的源代码)
        arr.toString(); 将数组元素转换连接为字符串返回
          和 arr.join('') 效果一样.
        obj.toString();
          var obj ={};
          obj.toString; // function toString() { [native code] }
          //原型上的toString属性
          obj.toString(); // "[object Object]"
        e.g.
          var box=10;
          box.toString();    //返回值为'10'
          box.toString(2);   //返回值为'1010',二进制输出

          "abc".toString();   //"abc"
          123.toString(); // 报错 ,默认将点.作为了小数点
          123.1.toString(); // "123.1"

          var desk;
          desk.toString(); //报错
          var box =undefined;
          box.toString();  //报错

          var foo =function(){console.log(1);}
          foo.toString(); //"function(){ console.log(1); }"
      val.toLocaleString(); 转换为本地字符串
      val.valueOf();  返回对象的字符串、数值或布尔值表示
        通常与toString()方法的返回值相同
        foo.valueOf(); 返回函数对象本身
      Object.is(val1,val2); 返回是否相同的布尔值 [可能存在兼容问题]
        与 == 或 === 的逻辑不同.
        e.g.:
          Object.is(+0,-0);    //false
          Object.is(0,0);      //true
          Object.is(NaN, NaN); //true
      转换为原始类型
        如果输入的值已经是个原始值,则直接返回它.
        默认的,Date类型的对象会被设置为 String,其它类型的值会被设置为 Number. [?]
          e.g.:
            var date =new Date();
            console.log(typeof date); // Object
            var aoo = date + '';
            var boo = date + 1; // Date类型被优先转换为 String
            var coo =date.toString();
            var doo =date.valueOf()
            console.log( aoo);  // Mon Jan 09 2017 11:35:22 GMT+0800 (中国标准时间)
            console.log(typeof aoo);  // String
            console.log( boo);  // Mon Jan 09 2017 11:35:22 GMT+0800 (中国标准时间)1
            console.log(typeof boo);  // String
            console.log( coo); // Mon Jan 09 2017 11:36:49 GMT+0800 (中国标准时间)
            console.log( doo); // 1483932704579

            var aoo = [1,2,3];
            var boo = aoo + 0; // 默认转换为 String
            var coo = aoo + '0';
            console.log(boo); // 1,2,30
            console.log(typeof boo); // string
            console.log(coo); // 1,2,30
            console.log(typeof coo); // string
        转换为 Number:先调用 valueOf 再调用 toString.
          调用该对象的valueOf()方法.若valueOf()返回原始值,则返回这个原始值.
          否则,调用该对象的toString()方法.若toString()返回原始值,则返回这个原始值.
          否则,抛出TypeError异常.
        转换为 String:先调用 toString 再调用 valueOf.
        e.g.:
          var obj = {
            // 没有返回原始值
            valueOf: function() {console.log(1);return {};},
            // 没有返回原始值
            toString: function() {console.log(2);return {};} }
          Number(obj); // 1 2 报错
          分析:调用Number方法时,先调用对象的valueOf方法,再调用其toString方法
            一般调用的是对象原型上的valueOf和toString,而本次对象的方法覆盖了原型上的.
关键字 
  var 变量声明
    var 与 逗号,运算符 「moIn 逗号运算符,变量声明」       
      (var aoo = 1), 2==3; // Uncaught SyntaxError: Unexpected token var
      (var aoo = 1);       // Uncaught SyntaxError: Unexpected token var
      (var aoo);           // Uncaught SyntaxError: Unexpected token var
      var aoo = 1, window.boo = 2; // Unexpected token .
操作符/运算符 
  PS:ECMA-262 描述了一组用于操作数据值的运算符.
    ECMAScript操作符的特点是能够适用于很多值
    进行运算时会将不同的类型进行隐式转换.
    运用于对象时,通常会调用对象的valueOf()和toString()方法,以便取得相应的值.
    前面讲的typeof操作符、new操作符,也称为typeof运算符、new运算符.
  一元运算符
    只能操作一个值得运算符叫做一元运算符
    ++、-- 自增、自减
      前置和后置的区别:
        对赋值有影响.
        在没有赋值操作时,前置后后置是一样的
        在赋值操作时,前置++会先累加再赋值,而后置++则先赋值再累加.
      e.g. var box=100;
       var box1=++box;         //box1值为101;
       var box2=box++;         //box2值为100;
    +、-(正、负数)
      var box="1";
      -box;               //-1
      typeof box;         //String类型
      typeof -box;        //Number类型
    typeof val; 返回操作数的数据类型字符串
      PS:typeof是操作符而非函数,因此后面的括号可有可无.
        操作数 val 可以是变量,也可以是字面量
      返回值为如下6种之一
      'undefined' 未定义
      'boolean'   布尔值
      'string'    字符串
      'number'    数值
      'object'    对象或null
      'function'  函数(不是数据类型,但是可以使用typeof操作符)
      e.g.
        typeof a;  // "undefined",返回值为表示变量a的数据类型的字符串.

        var box=null;
        typeof box; //"object",空对象

        function box(){}
        typeof box;   //"function"

        typeof "fan";   //返回值为string
    delete val; 删除数组、对象等属性
    new Foo();
    this
    void 运算符: 运行表达式,始终返回 undefined
      PS:无论void后的表达式是什么,void操作符始终返回 undefined
      使用void的目的
        undefined 在JS中不是保留字。
        如执行以下代码:
        function joke() {
          var undefined = "hello world";
          console.log(undefined); // "hello world"
        }
        console.log(undefined);   // undefined
        可以在一个函数上下文内以undefined做为变量名,
        于是在这个上下文写的代码便只能通过从全局作用域来取到undefined,如：
        window.undefined //浏览器环境
        GLOBAL.undefined //Node环境
        但要注意的是,即便window, GLOBAL仍然可以在函数上下文被定义,
        故从window/GLOBAL上取undefined并不是100%可靠的做法。如：
        function x() {
          var undefined = 'hello world' ,
            f = {} ,
            window = { 'undefined': 'joke' } ;
          console.log(undefined);         //  hello world
          console.log(window.undefined);  // joke
          console.log(f.a === undefined); // false
          console.log(f.a === void 0);    // true
        }
        于是,采用void方式获取undefined便成了通用准则。
        还有一种方式是通过函数调用。如AngularJS的源码里就用这样的方式：
        (function(undefined) {
          //此处的 undefined 为undefined
        })();
        通过不传参数,确保了undefined参数的值是一个undefined。
      其它作用
        禁止超链接跳转页面,
        如果URL不写的话,点击会刷新整个页面。
        于是便用上了href='javascript:void(0)'的方式,
        确保点击它会执行一个纯粹无聊的void(0)。
        另一种情况,生成一个空的src的image,
        最好的方式似乎也是src='javascript:void(0)';
      关于 void 后面表达式的执行
        e.g.:
        var totalNum = 10;
        var obj = {
          get reduceNum() { totalNum--; },
          get showNum() { return totalNum; }
        };
        console.log(obj.reduceNum); // 调用了 reduceNum 的get方法
        console.log(obj.totalNum);  // 9
        void obj.reduceNum;         // 调用了 reduceNum 的get方法
        console.log(obj.totalNum);  // 8
        delete obj.reduceNum;       // 没有调用 reduceNum 的get方法
        console.log(obj.totalNum);  // 8
        无论是普通访问 obj.reduceNum ,还是 void obj.reduceNum 都会使 totalNum 减少;
        而 delete obj.reduceNum,totalNum 不会减了,
        因为 delete 操作符不会对 obj.whenMarry 求值;
        
        function foo(){ console.log('我执行了'); }
        var aoo = void foo(); // '我执行了'
        console.log(aoo);     // undefined
        
        console.log(void 0);  // undefined
        console.log(void(0)); // undefined
  算术运算符
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
      var box = 100 - 对象;   //NaN,如果有toString()或alueOf(),返回10-返回值
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
      e.g.
      2**3; // 8
      var aoo =3;
      var boo =2;
      console.log(aoo**boo); // 9
  关系运算符
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
      e.g.
      1==true;    //true
      1===true;   //false
      NaN==NaN;   //false
    obj instanceof 构造函数; 返回表示构造函数是否处于对象的原型链上的布尔值
      PS: 检测的对象必须和构造函数处于同一个全局作用域,即同一个iframe和window中,
        若一数组arr在另一个框架中定义则在其他框架中arr instanceof Array;返回false
      e.g.
      function Foo(name){ this.name=name;}
      function Goo(age){ this.age=age; }
      Foo.prototype =new Goo(18);  //
      var person=new Foo("abc");   //
      person instanceof Foo;  //true
      person instanceof Goo;  //true
      person instanceof Object;   //true
      Foo.constructor;     // function Function() { [native code] }
      Foo.prototype;       // Goo {age: 18}
      person instanceof Foo.constructor;  //false
      person instanceof Foo.prototype;  // 报错

      123.1 instanceof Number;  // false
      "a" instanceof String;    // false
      new Number(123) instanceof Number; //true
    prop in obj; 如表示指定的属性是否存在于指定的对象中的布尔值
      prop 一个字符串类型或者symbol类型的属性名或者数组索引
      obj  需要检测的对象
        可以是一个String包装对象,但不能是一个字符串原始值.
        var color1 = new String("green");
        "length" in color1; // true
        var color2 = "coral";
        "length" in color2; // 报错(color2不是对象)
      e.g. :
        数组
        var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
        0 in trees        // 返回true
        3 in trees        // 返回true
        6 in trees        // 返回false
        "bay" in trees    // 返回false(必须使用索引号,而不是数组元素的值)
        "length" in trees // 返回true(length是一个数组属性)

        内置对象
        "PI" in Math          // 返回true

        自定义对象
        var mycar = {make: "Honda", model: "Accord", year: 1998};
        "make" in mycar  // 返回true
        "model" in mycar // 返回true
  逻辑运算符
    PS:逻辑运算符通常用于布尔值的操作,一般和关系运算符配合使用.
      逻辑运算符有三个:与&&(AND)、或||(OR)、非!(NOT)
    && 逻辑与
      第一个操作数为false时,不执行第二个操作数,直接返回false.
      若两边的操作数有一个操作数不是布尔值时,逻辑与运算就不一定返回布尔值.
        规则如下:
          第一个操作数是对象,则返回第一个操作数
            var box = {}&&(5>3);    //box值为true
            var box = {}&&5;        //box值为5
          第二个操作数为对象,在第一个操作数为true时,返回对象;否则返回false;
            var box =5&&{}  //box为对象{}
            var box =(5>3)&&{}  //box为对象{}
          有一个操作数为null或undefined,则返回null或undefined(除去第一个操作数为false时的情况)
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
      PS:逻辑非可以用于任何值,无论这个值是什么类型,该运算都会返回一个布尔值.
        执行原理:先将这个值转换成布尔值,然后取反.
        使用两次逻辑运算符相当于对值进行Boolean()转型函数处理.
      规则如下:
        操作数是一个对象,返回false;
        操作数是数值0、空字符串、null、NaN、undefined,返回true;
        操作数是一个非空字符串,返回false;
        操作数是任意非0和infinity,返回false;
    逻辑运算的短路现象
      使用&&时,第一个值为false后面的就不再做运算了;
      使用||时,第一个值为true,则后面的也不做运算了.
  位运算符
   PS:一般应用中,基本用不到位运算符.
     比较基于底层,性能和速度会非常好.
     ECMAScript中的所有数值都以IEEE-754 64 位格式存储,
     但位操作符并不直接操作64位的值,而是先将64位的值转换成32位的整数,
     然后执行操作,最后在将结果转换回64位.
   ~   位非NOT
   &   位与AND
   |   位或OR
   ^   位异或XOR
   <<  左移
   >>  有符号右移
   >>> 无符号右移
  =  赋值运算符
   =:将右边的赋值给左边
   复合赋值运算符
     +=/-=/*=//=/%=
  ?: 三元条件运算符
    exp1?exp2:exp3;执行规则:当第一个表达式为真则执行第二个,否则执行第三个表达式.
    三元条件运算符其实就是if语句的简写形式.
    var box=5>4?'对':'错';    //对,5>4赋值第一个'对'给box.否则第二个.
  其他运算符
    + 字符串连接符
      PS:进行字符的拼接操作(只要需要有一个操作数是字符串即可)
        当有字符串和数值进行+操作时,则默认将数值转换为字符串形式进行拼接操作.
      e.g. :
        3+6+"3a";      //"93a",先进行算术运算然后再进行字符串的连接操作.
        ""+3+6+"3a";   //"363a",使用空字符串达到字符连接的效果.
        var a=1,b=2,c=3;
        ""+a+b+c;      //"123",数值和字符串+运算为字符串,运算顺序从左到右.
    , 逗号运算符: 在一条语句中执行多个操作
      将多个表达式连接为一个表达式,最终返回值为最后一个表达式的值.
        1,2; // 2
      
        var auu=(aoo=1,boo=2,coo=3);
        console.log(auu);    // 3

        var aoo =(1,2,3);
        aoo; // 3,取最后一个值.
        
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
      return 处理之后返回: 在返回值前处理一些操作
        有最后一个表达式被返回,其他的都只是被求值
        function foo () {
          var x = 0;
          return x++, x;
        }
        console.log(foo()); // 1
      逗号,与 var 关键字 「moIn 关键字-var」
        1 , 2==3,function(){ console.log(4); }() // 4;
        var aoo = 1, 2==3; // Uncaught SyntaxError: Unexpected number
        var 2==3;          // Uncaught SyntaxError: Unexpected number
        aoo = 1, 2==3;     // false
    解包 「ES6新增」 
      var [a,b]=[1,2];
      console.log(a); // 1
      console.log(b); // 2
      相当于如下代码
      var arr =[1,2]
      var a =arr[1]
      var b =arr[2]
      e.g.
        var a1 =3
        var a2 =9
        a1      //3
        a2      //9
        [a1, a2] =[a2, a1]
        a1    //9
        a2    //3
    ... 扩展符 「ES6新增」 
      把数组解开成单独的元素
      e.g.
        var aoo =[1,2,3];
        var boo =[...aoo,4];
        console.log(boo);  //[1, 2, 3, 4]
        console.log(...aoo); //1 2 3,相当于 console.log(1,2,3)
        // 相当于
        console.log.apply(null,aoo); // 1 2 3
        ...aoo;            //报错

        获取部分参数
        var foo =function(aoo,...boo){ console.log(aoo,boo); }
        foo(1,2,3,4);  // 1 [2, 3, 4]
        //  将其余的参数放在数组 boo 中
  运算符优先级
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
  特殊用法
    ★自运行函数
    !function(){}() 
      等同于 (function(){ })() 
      ()、！、+、-、=等运算符,都将函数声明转换成函数表达式,
      消除了javascript引擎识别函数表达式和函数声明的歧义,
      告诉javascript引擎这是一个函数表达式,不是函数声明,
      可以在后面加括号,并立即执行函数的代码。
      加括号是最安全的做法,因为！、+、-等运算符会和函数的返回值进行运算,有时造成不必要的麻烦。
    val/exp , function(){ }() 
标准库--对象 
  ◆数据封装类对象
  Object  对象,JS中所有对象的父对象
  Boolean 布尔对象:处理布尔值的包装对象
  Number  数值对象:处理数值的包装对象
  String  字符对象:处理字符串的包装对象
  Array   数组对象
    PS:数组是JS内置的一种特殊类型的对象
       可以将数组类比成属性名为从0开始的自然数的对象,数组即有序数据的对象
       JS中的Array类型和其他语言中的数组区别很大,数组的元素可以保存任何类型
       数组是一种特殊的对象,凡是对象有的性质,数组都有
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
      var arr =new Array(); 内置构造函数创建
        PS:可省略 new 关键字(不推荐使用)
        无参数 : 创建空数组 []
        一个参数:作为数组的元素或指定数组的长度
          var arr1=new Array("a");
          var arr2=new Array(6);   //表示该数组的长度为6
          console.log(arr1);   // ["a"]
          console.log(arr2);   // [undefined × 6]
        两个参数及以上:将参数作为数组的元素
          var arr=new Array(1,3,true,"abc");
          arr;  // [1, 3, true, "abc"]
          可省略 new 关键字
      可采用用类似对象的方式(键值对)来表示元素
        下标设置为(非自然数)数字和字符,但不将其计算在数组的长度中
        e.g. :
        var arr=[];
        arr[0]=1;
        arr[1]=3;
        console.log(arr); // [1, 3]
        arr["a"]=5;
        arr[12.5]="abc";
        console.log(arr); // [1, 3, a: 5, 12.5: "abc"]
        arr["a"];   // 5 ,仍然存在且可以访问,但是不计算在数组的长度中
        console.log(arr.length);    //2
      数组元素也可以为表达式
        var x=3;
        var arr=[2*x,x+3,x];
        arr; // [6, 6, 3]
      省略数组中的某个值,则默认为undefined
        var arr=[1,,3];
        arr[1]; // undefined
      JS会自动忽略最后一个逗号,可能存在兼容问题
        var arr=[1,2,];
        arr.length; // 2
      稀疏数组:并不含有从0开始的连续索引,一般length属性值比实际元素个数大.
        e.g. :
        var arr1 =[undefined]; // 有一个元素为undefined
        var arr2 =new Array(1);// 元素长度为1,但无元素
        console.log(arr1); // [undefined]
        console.log(arr2); // []
        console.log(0 in arr1); // true
        console.log(0 in arr2); // false
    ◆信息查询
      arr.length; 读写长度
        返回值类型为数值,表示arr元素的个数
        设置数组长度
          var bar=[1,2,3,4,5,6,7,8,9];
          bar.length=3;
          bar;       //[1,2,3]
          bar.length =4;
          bar;       //[1, 2, 3, undefined ]
        使用下标来修改数组长度
          var foo=[];
          foo[100]=3;
          foo.length;   //101
      arr.includes(elem,index);  返回表示元素是否存在的布尔值
        elem  需要查找的元素值;
        index 可选,从该索引处开始向后查找,默认为 0
        e.g.
          [1, 2, 3].includes(2);     // true
          [1, 2, 3].includes(4);     // false
          [1, 2, 3].includes(3, 3);  // false
      arr.indexOf(elem[,begin]);   查找数组中元素对应的下标 [ES5+]
        begin表示开始的下标位置,默认为0,
          若为负,则-1 表示最后一个元素,依次类推.
        返回值为下标值,若找不到则返回-1
      arr.lastIndexOf(elem); 从右到左查找 [ES5+]
      Array.isArray(arr) 表示是否为数组的布尔值 [ES5+]
    ◆以元素为单位操作
      arr[i-1]  取/设数组元素
        下标从0开始
      arr.push(元素1,元素1,...);  末尾添加新元素,会改变原数组
        PS:在原arr的最后增加新元素,添加多个元素使用逗号隔开
          相当于arr[arr.length] =XX;
        返回值:新数组长度的数值表示
        e.g.
          var aoo=[1,2,3];
          aoo.push("d","e",12);  // 6
          aoo;                   // [1, 2, 3, "d", "e", 12]
      arr.pop();   末尾删除元素,并返回删除的元素
        无参数,在元素的末尾删除一个值
        会改变原数组,若原数组为空,则无操作,并返回 undefined 值.
        e.g. :
        var obj =[1,2,3];
        obj.pop(); // 3
        console.log(obj);// [1, 2]
      arr.unshift(元素1,元素2,...); 头部添加元素,并返回新数组的长度
      arr.shift();  删除一个元素,并返回删除的元素(无参数)
      delete arrElem; 删除元素
        删除某个元素后其位置会保存,值为undefined,数组长度无变化.
        e.g.
        var aoo = [1,2,3];
        delete aoo[1];
        console.log(aoo);  //[1, undefined, 3]
        aoo.length; // 3
    ◆以数组为单位操作元素
      arr.splice(begin,num[,item1[,item2[,...]]]); 删除替换原数组
        PS:删除num个元素,使用用参数列表中声明的一个或多个值从被删除的元素处插入
          该方法会改变原数组
        Arguments:
          begin 从数组的哪一位开始修改内容.
            如果超出了数组的长度,则从数组末尾开始添加内容；
            如果是负值,则表示从数组末位开始的第几位.
          num   可选,表示要移除的数组元素的个数,默认到数组末尾
            若 num 是 0,则不移除元素,此时至少应添加一个新元素
            若 num 大于begin之后的元素总数,则从begin后的元素都将被删除(含第start位)
          itemN 可选,要添加进数组的元素;若不指定,则只删除元素
        RetValue: 由被删除的元素组成的一个数组.
          如果只删除了一个元素,则返回只包含一个元素的数组.
          如果没有删除元素,则返回空数组.
        删除个数可为负
        e.g.
        var arr = [1,2,3];
        arr.splice(1,1);  // [2]
        console.log(arr); // [1, 3]
      arr.slice(begin,end);   返回截取的一个新的数组 [原数组不变]
        Arguments:若只有一个参数begin,则表示从begin一直到最后
          若参数为负值则表示位置(从最后倒数第几)
        RetValue:截取的内容为 半闭半开 区间(即[begin,end))
        slice 方法可以用来将一个类数组(Array-like)对象/集合转换成一个数组
          只需将该方法绑定到这个对象上
          下述代码中 list 函数中的 arguments 就是一个类数组对象.
          function list() { return Array.prototype.slice.call(arguments); }
          var list1 = list(1, 2, 3); // [1, 2, 3]
          也可使用 [].slice.call(arguments) 来代替.
          另外,可以使用 bind 来简化该过程.
          var unboundSlice = Array.prototype.slice;
          var slice = Function.prototype.call.bind(unboundSlice);
          function list() { return slice(arguments); }
          var list1 = list(1, 2, 3); // [1, 2, 3]
      arr.reverse();  反转原数组中元素的位置并返回数组
        e.g. :
        var myArray = ['one', 'two', 'three'];
        myArray.reverse();
        console.log(myArray) // ['three', 'two', 'one']
      arr.concat(elem/arr1);  拼接若干个数组/元素,返回一个新数组
        连接元素
          var a = [1,2,3];
          console.log(a.concat(4,5)); // [1, 2, 3, 4, 5]
        连接单个数组
          var arr = ["a","b"];
          var arr1 = ["d","e","f"];
          console.log(arr.concat(arr1)); // ["a","b","d","e","f"]
          console.log(arr.concat([1,[2,3]])); // ["a","b","1",[2,3]]
        连接多个数组
          var arr = [1,2,3];
          var arr1 = [4,5];
          var arr2 = [6,7,8,9];
          arr.concat(arr1,arr2);
          // [1, 2, 3, 4, 5, 6, 7, 8, 9]
      arr.sort([func]); 在原数组上递增排序并返回数组
        func 可选,用来指定按某种顺序进行排列的函数.
          如果省略,元素按照转换为的字符串的诸个字符的Unicode位点进行排序
          e.g. :
          var arr =[31,1,2,5,4]
          arr.sort(); // [1, 2, 31, 4, 5]
          传入func定义函数
          function compare(val1,val2){ return val1-val2; }
          var box=[5,2,4,17];
          console.log(box.sort(compare)); // [2, 4, 5, 17]
    ◆其他操作
      arr.join(str);   使用str串连每个元素,返回结果字符串
        str 可选,表示用于连接的字符串,默认为逗号,
        e.g.
          将[1,2,3]输出为字符串"1-2-3"
          var arr =[1,2,3];
          arr.join("-");  // 1-2-3

          function repeatStr(str,n){ return new Array(n+1).join(str); };
          repeatStr("a",6); // "aaaaaa"
    ◆修改数组
    ◆获取部分
      var newArr=arr.filter(function(v,i,arr){}[,thisArg]); 过滤数组 [ES5+]
        Arguments:
          func 调用的函数,参数为: val元素 index下标 arr原数组
            用来测试数组的每个元素的函数。
            返回true表示保留该元素,通过测试,false则不保留。
          thisArg 可选,执行函数时的用于 this 的值
        e.g.
        筛选数组arr中小于12的数
        var arr=[10,2,34,4,11,12];
        var res=arr.filter(function(x){return x<12;});
        console.log(res); // [10, 2, 4, 11]
    ◆获取其他
      arr.reduce(func[,initialValue]); 条件缩减,返回一个新数组 [ES5+]
        PS:接收一个函数作为累加器,数组中的每个值(从左到右)开始缩减,最终为一个值
          为数组中的每一个元素依次执行回调函数,不包括数组中被删除或未被赋值的元素
        Arguments:
          func 执行数组中每个值的函数,包含四个参数
            preVal  上一次回调函数的返回值,
              或提供的初始值(initialValue),或数组第一个值(此时currVal为数组第二个值)
            currVal 数组中当前被处理的元素
            index   当前被处理元素在数组中的索引index
            arr     调用 reduce 的数组
          initialValue 可选,作为首次调用 callback 时,代替它的第一个参数
        RetValue:: 最后一次调用回调函数返回的结果
        Remarks:
          如果数组是空的并且没有initialValue参数,将会抛出TypeError错误.
          如果数组只有一个元素并且没有initialValue, 或者有initialValue但数组是空的,
          这个唯一的值直接被返回而不会调用回调函数.
          通常来说提供一个initialValue初始值更安全一点,因为没有的话会出现3种可能的输出结果,
        e.g.
        实现将数组中所有元素进行累加
          var arr =[1,2,3,4,5];
          var res=arr.reduce(function(a,b){ return a+b; });
          console.log(arr); // [1, 2, 3, 4, 5]
          console.log(res); // 15
      arr.reduceRight(); 和reduce类似,只是从右到左遍历 [ES5+]
    ◆遍历数组元素: 循环访问元素叫遍历
      arr.forEach(cfoo[, thisArg]); 对数组的每个元素执行操作
        PS:forEach 方法按顺序为数组中含有效值的每一项执行一次cfoo 函数,
          那些已删除(使用delete方法等情况)或者从未赋值的项将被跳过
         (而值为 undefined 的项则不会被跳过).
          无法中止或跳出forEach循环,除非报错.
         (ES5新增)
        Arguments:
          cfoo 函数为每个元素执行,接收三个参数：
            value 可选,元素
            index 可选,元素的索引
            arr   可选,数组对象本身
          thisArg 可选,表示数组本身,当执行回调函数时用作this的值(参考对象).
            如果给forEach传递了thisArg 参数,它将作为 cfoo 函数的执行上下文,
            类似执行如下函数cfoo.call(thisArg, element, index, array).
            如果 thisArg 值为 undefined 或 null,
            函数的 this 值取决于当前执行环境是否为严格模式,
            严格模式下为 undefined,非严格模式下为全局对象.
        Remarks:
          forEach 遍历的范围在第一次调用 cfoo 前就会确定,
          调用forEach 后添加到数组中的项不会被 cfoo 访问到,
          如果已经存在的值被改变,则传递给 cfoo 的值是 forEach 遍历到他们那一刻的值,
          已删除的项不会被遍历到.
      arr.map(func[,thisArg]);  元素遍历调用方法,返回新数组 [ES5新增]
        Arguments:
          func   对数组arr的每个元素调用函数 func
            currVal  数组中当前被传递的元素
            index    数组中当前被传递的元素的索引
            arr      调用 map 方法的数组
          thisArg 可选,数组本身
            执行 callback 函数时 this 指向的对象.
        RetValue:由回调函数的返回值组成的一个新数组
        e.g.
          arr = [1,2,3];
          arr.map(String);  // ["1", "2", "3"]

          ["1", "2", "3"].map(parseInt); // [1, NaN, NaN]
          因为parseInt 会接收两个参数,导致上述结果,改为
          function returnInt(element){
            return parseInt(element,10);
          }
          ["1", "2", "3"].map(returnInt); // [1,2,3]
      arr.every(callback[,thisArg]); 条件判断,返回布尔值 [ES5新增]
        PS: every 方法为数组中的每个元素执行一次 callback 函数,
          直到它找到一个使 callback 返回 false(表示可转换为布尔值 false 的值)的元素。
          如果发现了一个这样的元素,every 方法将会立即返回 false。
          否则,callback 为每一个元素返回 true,every 就会返回 true。
          callback 只会为那些已经被赋值的索引调用。不会为那些被删除或从来没被赋值的索引调用。
          every 不会改变原数组。
          every 遍历的元素范围在第一次调用 callback 之前就已确定了。
          在调用 every 之后添加到数组中的元素不会被 callback 访问到。
          如果数组中存在的元素被更改,则他们传入 callback 的值是 every 访问到他们那一刻的值。
          那些被删除的元素或从来未被赋值的元素将不会被访问到。
        Arguments:
          callback 用来测试每个元素的函数。
            callback 被调用时传入三个参数：元素值val,元素的索引index,原数组arr。
          thisArg 执行 callback 时使用的 this 值。
            如果为 every 提供一个 thisArg 参数,在该参数为调用 callback 时的 this 值。
            如果省略该参数,则 callback 被调用时的 this 值,
            在非严格模式下为全局对象,在严格模式下传入 undefined。
        e.g.
        所有元素大于18才返回true
        var arr =[19,20,22];
        var res=arr.every(function(x){return x>18;});
        console.log(res); // true
      arr.some(func[,thisArg]);  条件判断,返回布尔值 [ES5新增]
        PS:some 为数组中的每一个元素执行一次 callback 函数,
          直到找到一个使得 callback 返回一个“真值”(即可转换为布尔值 true 的值).
          如果找到了这样一个值,some 将会立即返回 true.
          否则,some 返回 false.
          callback 只会在那些”有值“的索引上被调用,
          不会在那些被删除或从来未被赋值的索引上调用.
          some 被调用时不会改变数组.
          some 遍历的元素的范围在第一次调用 callback 时就已经确定了.
          在调用 some 后被添加到数组中的值不会被 callback 访问到.
          如果数组中存在且还未被访问到的元素被 callback 改变了,
          则其传递给 callback 的值是 some 访问到它那一刻的值.
        Arguments:
          callback 被调用时传入三个参数：元素的值,元素的索引,被遍历的数组.
          thisArg  可选,将会把它传给被调用的 callback,作为 this 值.
            否则,在非严格模式下将会是全局对象,严格模式下是 undefined.
        e.g. :
        只要有一个数大于18返回true
        var arr =[19,10,9];
        var res=arr.some(function(x){return x>18;});
        console.log(res); // true
    ◆转换为数组
      Array.from(arrLike,mapFn,thisArg); 对象转换为数组,并返回新数组(ES6新增)
        Arguments:
          arrLike 想要转换成数组的类数组或可遍历对象
          mapFn   可选,最后生成的数组会经过该函数的加工处理后再返回
          thisArg 可选,执行 mapFn 函数时 this 的值
    数组的复制
      通过arr.slice(0)来复制
        PS:使用slice为浅拷贝,只能将第一层完全复制(更深层是引用)
        e.g.
        当arr中的元素为数组时,修改它仍然会改变复制后的数组.
        var a =[[1],2];
        var b =a.slice(0);
        alert(b);     //1,2
        a[0].push(1);
        alert(a);     //1,1,2
        alert(b);     //1,1,2
      通过concat()来复制
        e.g.
        var aoo =[[1],2];
        var boo =aoo.concat();
        console.log(boo);    //[[1],2]
        aoo[0].push(1);
        console.table(aoo);  //[[1,1],2]
        console.log(boo);    //[[1,1],2]
      以上两种方法只是复制了数组的第一维,由于数组第一维存放的是第二维的引用,
      而第二维才是实际存放他们的内容
      使用JSON 序列化与反序列化来复制(?)
  二进制数组
    PS:JavaScript操作二进制数据的接口;
      二进制数组由三个对象组成,这些对象早就存在,属于独立的规格,
      ES6将它们纳入了ECMAScript规格,并增加了新的方法;
      这些对象原始的设计目的,与WebGL项目有关。
      所谓WebGL,就是指浏览器与显卡之间的通信接口,
      为了满足JavaScript与显卡之间大量的、实时的数据交换,
      它们之间的数据通信必须是二进制的,而不能是传统的文本格式。
      文本格式传递一个32位整数,两端的JavaScript脚本与显卡都要进行格式转化,将非常耗时。
      这时要是存在一种机制,可以像C语言那样,直接操作字节,
      将4个字节的32位整数,以二进制形式原封不动地送入显卡,脚本的性能就会大幅提升。
      二进制数组就是在这种背景下诞生的。
      它很像C语言的数组,允许开发者以数组下标的形式,直接操作内存,
      大大增强了JavaScript处理二进制数据的能力,
      使得开发者有可能通过JavaScript与操作系统的原生接口进行二进制通信。
      简单说,ArrayBuffer对象代表原始的二进制数据,TypedArray对象代表确定类型的二进制数据,
      DataView对象代表不确定类型的二进制数据。
      它们支持的数据类型一共有9种(DataView对象支持除Uint8C以外的其他8种)。
    ArrayBuffer 代表内存之中的一段二进制数据,可以通过“视图”进行操作。
      “视图”部署了数组接口,这意味着,可以用数组的方法操作内存。
    TypedArray  用来生成内存的视图
      通过9个构造函数,可以生成9种数据格式的视图,
      比如 Uint8Array (无符号8位整数)数组视图, 
      Int16Array (16 位整数)数组视图, 
      Float32Array (32 位浮点数)数组视图等等
    DataView    用来生成内存的视图,可以自定义格式和字节序
      比如第一个字节是Uint8(无符号8位整数)、第二个字节是Int16(16 位整数)、
      第三个字节是Float32(32 位浮点数)等等。
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
  ◆功能类对象
  Function 函数对象
    PS:函数是存储在变量中的一段程序,变量作为一个函数使用,用于实现某种功能.
      在 JS 中,“一切皆对象”,数组和函数本质上都是对象.
      函数是定义一次但却可以调用或执行任意多次的一段代码.
      若函数名称重复会产生覆盖.
      JS中代码块(大括号之间)里不会产生作用域,函数是唯一能创建新作用域的地方.
    Function 类型
      PS:函数也是一个值,类型为函数,
        在ECMAScript中, Function类型 实际上是对象
        每个函数都是 Function构造器 的实例,而且都与其他引用类型一样具有属性和方法.
        由于函数是对象,因此函数名实际上也是一个指向函数对象的指针
      e.g.:
        function foo(){}
        typeof foo;  // "function",类型显示为function

        函数作为对象使用
        function goo(){}
        goo.a =1;
        console.log(goo.a); //1
    创建函数
      PS:函数的创建有 函数声明 和 函数表达式 两种常用方法.
        变量名可以使用中文字符来进行命名而不会报错,但最好不要使用中文.
      function funcName(参数){执行语句} function关键字创建函数
        PS:ECMAScript中的函数使用function关键字来声明,后跟一组参数以及函数体.
          该方法创建的函数,调用可在声明(位置)前进行(函数声明提升)
          函数声明后,函数不调用不执行
        函数的调用 : 函数名(参数);
      var foo=function(参数){执行语句}  变量初始化创建函数
        函数的创建需在调用前完成
        e.g.
        var foo =function bar(){ alert(1); }
        bar() ; //报错:bar未定义
        // 会将赋值变量的函数的函数名忽略
        自调用可省略一个括号
          var foo =function bar(){ alert(1); }();   //直接调用
          // foo中存放的是 函数的返回值,而非函数本身
          等价于
          var foo =(function bar(){ alert(1); })();
          等价于
         (function bar(){ alert(1); })();
      new Function(); 构造函数创建函数
        PS: 该方法不推荐使用,会导致解析两次代码,影响性能,
          第一次解析常规ECMAScript代码,第二次是解析传入构造函数中的字符串.
        var foo =new Function('arg1',...,"函数体");
        e.g. :
          var foo =function(){}
          foo.constructor;  // Function() { [native code] }

          var foo =new Function("a","b","console.log(a+b);");
          foo(1,3); // 4
      不同声明的差异
        关键字声明法:函数的调用可在声明之前或之后无影响,函数在代码运行之前有预加载.
        变量初始化:函数的调用必须在声明之后,实质上,该函数就是一个变量,没有预加载.
        e.g. :
        console.log(foo()); // 1
        function foo(){ return 1; }
        var foo =function(){ return 2; }
        console.log(foo()); // 2
        原理:在代码运行前,函数被预加载以便运行时调用,
          运行时读取到变量声明的函数,导致产生了覆盖.

        以下语法可能导致错误,不同的浏览器的结果可能有差异
        if(condition) {
          function foo(){ }
        }else {
          function foo(){ }
        }
        修改为
        var foo;
        if(condition) {
          foo =function(){ }
        }else {
          foo =function foo(){ }
        }
      函数的参数
        传入的参数可多可少,多则舍去,少则使用undefined来补充
          e.g. :
          function foo(){ console.log(arguments[0],arguments[1]); };
          foo(1); // 1 undefined
        默认参数:在定义函数时,可先将将参数赋值(ES6新增)
          function foo(b,c=3){ console.log(b,c); }
          foo();           //undefined 3
          foo(1);          //1 3,当未传参时默认参数
          foo(1,4);        //1 4,当传入参数时则使用传入的值
          foo(1,c=5);      //1 5
        arguments 类数组 : 在函数体内,表示实际传入函数的参数组成的数组
          arguments.length; 在函数体内表示实际传入参数的数量
            e.g. :
            function box(){ return arguments.length; }
            console.log(box(1,2,3,4,5));  // 5
          arguments.callee; 在函数体内表示函数本身
            该属性是一个指针,指向拥有这个arguments对象的函数.
            e.g.
            递归-阶乘
            function sum(num){
              if(num<=1){
                return 1;
              }else{
                return num*sum(num-1);
              }
            }
            对于阶乘函数一般要用到递归算法,所以函数内部一定会调用自身;
            如果函数名不改变是没有问题的,一旦改变函数名,内部的自身调用需要逐一修改
            为了解决这个问题,我们可以使用arguments.callee来代替.
            function box(sum){
              if(num<=1){
                return 1;
              }else{
                return num*arguments.callee(num-1);
                //此时arguments.callee等价于box
              }
            }
          e.g.
          对若干个数值进行累加
          function foo(){
            var sum=0;
            for(var i=0;i<arguments.length;i++){
              sum=sum+arguments[i];
            }
            return sum;
          }
          foo(5,6,1); // 12
    return 函数的返回值
      函数使用 return 关键字返回值,如果没有 return 默认返回undefined.
      当执行到 return 后直接返回值,后面代码不再执行,
      当 return 后不带值,默认返回 undefined
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
    函数的调用:函数名称加上()即可调用
    特殊形式的函数
      全局函数(参见 window对象)
        系统内置构造函数:用于创建数据对象
          Boolean()
          String()
          Number()
          Object()
          Date()
          ...
      匿名函数 : 没有名字的函数
        可以通过匿名函数来执行某些一次性的任务.(自调用)
        可以将匿名函数作为参数传递给其他函数(参见高阶函数)
        通过匿名函数来定义函数
          把匿名函数赋值给变量
          var f =function(a){...}
        单独定义匿名函数程序报错
          function(){ return "abc"; } // 报错
        通过自我来执行匿名函数
         (function(){ alert("abc"); })();
          //第一个括号内为匿名函数,第二个括号执行.
          自我执行匿名函数的传参
         (function(age){ alert(age); })(100);       //100.
        函数里的匿名函数
          function box(){
            return function(){
              return "abc";
            }
          }
          console.log(box()());  //abc.
      闭包closure: 可访问一个函数作用域里变量的函数
        PS: 或者说闭包是函数中创建的函数.
          闭包会携带包含它的函数的作用域,因此会比其他函数占用更多的内存.
          过度使用闭包可能会导致内存占用过多.
          虽然V8等优化后的JS引擎会尝试回收被闭包占用的内存,但还是要慎重使用.
        创建闭包的常见的方式:
          在一个函数内部创建另一个函数,
          通过另一个函数(在外部调用)访问这个函数的局部变量.
        作用
          保存自己的私有变量,通过提供的接口(方法)给外部使用,但外部不能直接访问该变量.
          将函数a中的变量通过a中的函数b引出到全局作用域,从而可在全局中进行访问.
          e.g. :
          var goo;
          function foo(){
            var b=3;
            goo= function(){ return b; };
          }
          foo();
          console.log(goo()); // 3
        应用
          使用闭包的特点:就是可以把局部变量驻留在内存中,可以避免使用全局变量.
          由于闭包里作用域返回的局部变量资源不会立刻回收,所以可能会占用更多的内存,
          过度使用闭包会导致性能下降.
          由于闭包可能会占用更多内存,一般情况下不推荐使用闭包.
          e.g.
          使用匿名函数实现局部变量驻留内存中从而累加
            function foo(){
              var aoo=100;
              return function(){aoo++;console.log(aoo)}  //闭包
            }
            foo();    //function(){ aoo++; console.log(aoo) }
            foo()();  //101
            foo()();  //101
            var goo =foo();
            goo();    //101
            goo();    //102
            goo=null; //解除引用,等待垃圾回收 释放闭包
            PS-Self:goo 和 foo()的返回值一样,实质内容不同
              foo()表示执行函数会对函数内的aoo初始化
              b表示的为box()执行后的返回值(函数内的闭包)
          减少参数
            function cal(base){
              return function(max){
                var total =0;
                for(var i = 1; i <= max; i++){ total +=i;};
                return total +base;
              }
            }
            var add =cal(2);
            add(3); // 8
            var add2 =cal(1);
            add2(3); // 7
          封装
           (function(){
              var m =0;
              function get(){ return m; }
              function set(val){ m =val; }
              window.getM =get;
              window.setM =set;
            })()
            getM();   //0
            setM(11);
            getM();   //11
          点击列表项返回其在列表中的位置
            <ol id="list">
              <li>000</li>
              <li>111</li>
              <li>222</li>
              <li>333</li>
              <li>444</li>
            </ol>
            var  li = list.getElementsByTagName('li');
            // 方案一:
            for(var  i = 0; i < li.length; i++){
             (function(){
                var aoo =i;
                li[i].onclick = function() { console.log(aoo); }
              })()
            }
            // 方案二:
            // for(var  i = 0; i < li.length; i++){
            //   let aoo =i;
            //   // 或者 const aoo =i;
            //   li[i].onclick = function() {
            //     console.log(aoo);
            //   }
            // }
        内存泄漏
          IE9之前的版本对JScript对象和COM对象使用不同的垃圾收集例程,
          因此闭包在IE的这些版本中会导致一些特殊的问题.
         (具体参见 JavaScript高级程序设计第184页)
        e.g.
          var aoo =9;
          function foo(){
            var aoo =1;
            return function goo(){ console.log(aoo); }
          }
          var joo =foo();
          joo(); //1

          function foo(){
            var aoo =11;
            function goo(){
              var aoo =1;
              function joo(){ console.log(aoo); }
              joo();
            }
            goo();
          }
          foo();  // 1
      构造函数
        PS:
          构造器函数首字母大写(约定写法),区别其他的一般函数.
          构造器用于生成对象(类似于 类)
         (构造器及构造器的prototype一起,相当于类)
          任何函数通过new来调用就可以作为构造函数;
          如果不用new来调用,构造函数和普通函数无区别
        obj.constructor; 获取对象的构造器函数
          e.g.
          "abc".constructor;  //function String() { [native code] }
          Object.constructor; //function Function() { [native code] }
          12.0.constructor;   //function Number() { [native code] }
          // 12.constructor;     //报错,将点.作为了小数点
          var aoo =123;
          aoo.constructor; //function Number() { [native code] }
        公有属性和私有属性
          function Foo(a){
            var age =100;    //私有
            this.name =a;        //公有
            function goo(){console.log(this.name);} //私有函数
            this.joo =function(){goo();} //公有方法
          }
          var name ='global';
          var obj =new Foo("abc");
          obj.joo();  //global
          公有 私有 相互调用
            决解方法1
              function Foo(a){
                var age =100;  //私有
                this.name =a;  //公有
                function goo(){console.log(this.name);} //私有函数
                this.joo =function(){goo.call(this);}   //公有方法
              }
              var obj =new Foo("abc");
              obj.joo(); //abc
            解决方法2
              function Foo(a){
                function goo(){console.log(aoo.name)};
                var aoo ={
                  name:a,
                  joo:function(){goo();}
                }
                return aoo;
              }
              var obj =Foo("abc");
              obj.joo(); //abc
        构造函数也可以具有属性,但不会影响其生成的对象(函数也是对象)
          function Foo(name){
            this.name =name;
          }
          Foo.age =19;
          Foo.prototype.aoo =11;
          var obj =new Foo("abc")
          Foo.age; //19
          obj.age; //undefined
          obj.aoo; //
      高阶函数(回调函数)
        PS:将函数名作为另一函数的参数进行传入,则后者为高阶函数.
          将函数b的功能传入,而非将函数b的执行值传入,
          所以是将函数b的函数名作为a的一个参数,
          b也可以是匿名函数.
        优点:当要变更高阶函数引入的函数的功能时,
          不用去高阶函数内部修改引入的函数,
          在执行时直接改变参数即可.
        e.g.
        function foo(){ }
        function goo(foo,aoo){return foo(aoo);}

        function cal(x,y){ return x()+y(); }
        function test1(){ return 2; }
        function test2(){ return 3; }
        console.log(cal(test1,test2));  //5
      自调用函数 :立即调用的函数
        (function(){console.log("hello");})()  //hello
        (function(a,b){console.log(a+b);})(2,3); //5
      递归 :一个函数调用本身或者两个函数相互调用
        PS:递归必须要定义终止条件,否则无限递归.
        e.g.
        用递归求斐波那契数
        斐波那契函数的定义:fib(n)=fib(n-2)+fib(n-1),fib(1)=1,fib(2)=1
        var fib = function(n) {
          // 如果 n 是 1 或者 2 则返回 1 作为结果
          // 这是递归终止的条件, 必须要有, 否则无限递归了
          if(n == 1 || n == 2) {
            return 1
          } else {
            // 如果 n 不为 1 和 2, 返回 fib(n-2) + fib(n-1)
            // 这时候 fib(n-2) fib(n-1) 需要计算
            // 于是代码进入下一重世界开始计算
            return fib(n-2) + fib(n-1)
          }
        }
        PS-Self:规律将上一层的表述和下一层的表述,通过题目中的等式进行相等即可,
          即fib(n)=fib(n-1)+fib(n-2),而fib(n)函数的值为return 返回的值
          故将return返回值设为fib(n-1)+fib(n-2)即可.
        Remarks:
          一般递归效率较低,
          一些需要探测或者处理多分支(可能分支又产生分支)的问题,则递归效率较高
      箭头函数 (ES6新增)
        PS:匿名函数的简化版
          箭头函数的this值是绑定了的
          箭头函数没有arguments对象,若要多参数,则需用...
        创建箭头函数
         (arg1,arg2) =>{语句};
            相当于: function(参数1,参数2){ return 语句 }
          arg => {语句};  若只有一个参数,可省略圆括号
         ( ) => {语句};  若没有参数,则不可省略圆括号
         e.g.
           var a1 =[1,2,3]
           var a2 =a1.map(function(n){ return n*n });
           console.log(a2); // [1, 4, 9]
           /*等价于*/ var a3 =a1.map(n => n*n);
           console.log(a3); // [1, 4, 9]
    不具备函数重载
      即当函数名相同时会被覆盖掉(不会因为参数不同而进行区分)
      ECMAScript中的函数,没有像其他高级语言那种函数重载功能.
      e.g.
      function box(num,a){ return num+1; }
      function box(num){ return num+2; }
      console.log(box(7,20)); //9,第二个函数把第一个函数覆盖掉了,不具备重载功能.,
    this 执行函数时的上下文对象
      PS:函数内部另一个特殊对象.
        在JS中函数的this关键字的行为与其他语言相比有很多不同.
        this引用的是函数据以执行操作的对象.
        是JavaScript的一个关键字,表示一个对象.
        随着函数使用场合的不同,this的值会发生变化,始终指向当前运行的对象.
        this指针是面向对象程序设计中的一项重要概念,它表示当前运行的对象.
        this在函数运行时确定.
        在实现对象的方法时,可以使用this指针来获得该对象自身的引用.
        在绝大多数情况下,函数的调用方式决定了this的值.
        this不能在执行期间被赋值,在每次函数被调用时this的值也可能会不同.
        ES5引入了bind方法来设置函数的this值,而不用考虑函数如何被调用的.
      this使用的地方
        全局中:在全局运行上下文中(在任何函数体外部),指代全局对象
          在浏览器中执行后得到一个Window对象,这是一个全局对象
          console.log(this === window); // true
          在全局作用域内,我们可以通过this访问到 所有的全局属性
          var a = 1;
          console.log(this.a);
          // 1 ,定义的全局变量实际上就是window的属性
        函数中:this的值取决于函数是如何调用的
          函数的普通调用this始终指向window
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
          声明一个局部变量保存this引用
            当需要在嵌套函数中读取调用被嵌套函数的对象的属性时
            var aoo = 1;
            function foo(){
              console.log(this.aoo);
              var that = this;
              var aoo =2
              function goo(){console.log(that.aoo);}
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
          作为构造函数
            var aoo = 1;
            function Foo(){this.aoo = 2;}
            function Goo(){ this.aoo =3;return {aoo:4}; };
            var obj = new Foo();
            var obj1 =new Goo();
            console.log(obj.aoo);  // 2
            console.log(obj1.aoo); // 4
          使用对象间接调用
            var obj ={aoo:100};
            function foo(){ return this.aoo; };
            obj.goo =foo;
            console.log(obj.goo()); // 100
        对象内
          var aoo = 1;
          function foo(){ console.log(this.aoo);  }
          var obj = { aoo: 2,  goo: foo }
          obj.goo(); // 2 ,obj调用的this指向obj
          var joo =obj.goo;
          joo();     //1,
          相当于 window.joo(); this指向window

          var aoo =11;
          var obj ={
            aoo:22,
            foo:function(){
              return function(){ return this.aoo; }
            },
          }
          obj.foo()();   //11
          // 相当于
         (obj.foo())(); //11
        DOM中
          var aoo =document.querySelector("#aoo");
          aoo.addEventListener("click",function(){
            console.log(this);
          })
          //表示被点击的那个元素对象
      fun.call(thisArg[,arg1[,arg2[,...]]]) 改变this指向
        function foo(a){ console.log(Object.prototype.toString.call(a)); };
        foo(7);    // [object Number]
        等价于
        function foo(){ console.log(Object.prototype.toString.call(this)); };
        foo.call(7); // [object Number]
      fun.apply(thisArg[,argsArray])        改变this指向
        PS:使用一个指定的this值和若干个指定的参数值的前提下调用某个函数或方法
          都是函数对象的方法,区别在于接收参数的形式不同.
        Arguments:
          thisArg  在fun函数运行时指定的 this 值.
            非严格模式下,null 或 undefined 指向全局对象(浏览器中就是window对象),
            原始值(数字,字符串,布尔值)的 this 会指向该原始值的自动包装对象
          第二个参数表示函数传入的参数
          argsArray       一个数组或者类数组对象
            其中的数组元素将作为单独的参数传给 fun 函数.
            如果该参数的值为null 或 undefined,则表示不需要传入任何参数.
            从ECMAScript 5 开始可以使用类数组对象(可能存在兼容性问题)
          arg1, arg2, ... 指定的参数列表
        改变this的好处:对象不需要与方法发生任何耦合关系
        e.g. :
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
          e.g.
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
      fun.bind(thisArg[,arg1[,arg2[,...]]]) 创建新函数并改变this指向 [ES5新增]
        PS:bind()方法会创建一个新函数.
          当这个新函数被调用时,bind()的第一个参数将作为它运行时的 this,
          之后的一序列参数将会在传递的实参前传入作为它的参数.
        Arguments:
          thisArg       绑定函数被调用时,代替原函数运行时的 this 指向
            当使用new 操作符调用绑定函数时,该参数无效.
          arg1,arg2,... 绑定函数被调用时,这些参数将将于实参之前传递函数
        RetValue:由指定的this值和初始化参数改造后的原函数拷贝
        使用bind固定参数值
          function foo(a,b,c){ return a+b+c; };
          // undefined 即不改变this的值,100为给a指定为100,且后续不可变
          var f1 =foo.bind(undefined,100);
          f1(1,2); // 103 ,第二、三个参数分别为1、2
          var f2 =f1.bind(undefined,10);
          f2(1); // 111
        使用new时
          function Foo(){ this.b =1; return this.a; };
          var Goo =Foo.bind({a:1});
          Goo(); // 1
          new Goo(); // {b:1}
        e.g. :
          var x = 9;
          var obj = {
            x: 81,
            getX: function() { return this.x; }
          };
          obj.getX(); // 返回 81
          var foo = obj.getX;
          foo(); // 返回 9, 在这种情况下,"this"指向全局作用域
          var goo = foo.bind(obj);
          goo(); // 返回 81

          var obj ={
            foo:1,
            bar:function(){
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

          var person ={
            name :'a',
            job : '1',
            sayHello:function(){ return this.name + this.job; }
          }
          person.sayHello()     //"a1"
          var anotherGuySayHello =person.sayHello.bind({ name : 'b', job : '2' })
          anotherGuySayHello()  //"b2"
      e.g. :
        console.log(this);; //window,因为在window的范围下.
        var color="红色的"; //此处color是全局变量,该变量是window的属性.
        // 此时 var color 等价于 window.color
        console.log(this.color);        //color
      其他特殊情况
        var aoo =1;
        var obj ={ aoo:2, foo:function(){return this.aoo;} }
        obj.foo();    // 2
       (obj.foo)();  // 2
       (obj.foo = obj.foo)();  // 1
        var goo =obj.foo;
        goo();  // 1
    ◆函数相关属性/方法
    foo.length; 获取函数声明时定义的参数的个数
      e.g. :
      function box(a,b){ return a+b; }
      console.log(box.length);  // 2,表示box的参数有两个.
    foo.name;   函数的名字
    foo.caller; 返回调用当前函数的函数(当前函数的直接父函数)
      function foo(){
        console.log(foo.caller);
      };
      function goo(){
        foo();
      };
      goo(); // function goo(){ foo(); }
    foo.prototype(构造)函数的原型属性对象(参见 对象原型)
  Date     日期时间对象
    PS:ECMAScript提供了Date类型来处理时间和日期.
      Date 对象内置一系列获取和设置日期时间信息的方法.
      ECMAScript中的Date类型是在早期java中 java.util.Date 类基础上构建的.
      Date对象基于1970年1月1日0时世界协调时间开始的毫秒数.
      UTC(coordinated universeal time,国际协调时间,又称世界统一时间)
      UTC 日期值得是在没有时区偏差的情况下的日期值(UTC和北京时间相差8个小时,北京属于东八区)
    创建时间对象:Date 构造函数(没有字面量格式)
      PS:
        以常规函数调用他(即不加new操作符)将会返回一个字符串,而不是时间对象.
        当时间数值超过合理范围值时,会被调整为相邻值,
        如new Date(2013,13,1)等于new Date(2014,1,1)
      var time =new Date();
      无参数     : 则根据系统当前的时间来创建时间对象
      单数值参数 : 创建参数数值(自世界协调时间到现在经过的毫秒数)对应的时间
        var time =new Date(1000);
        console.log(time); // Thu Jan 01 1970 08:00:01 GMT+0800(中国标准时间)
      字符串参数 : 创建字符串被Date.parse()解析后对应的时间
        var box=new Date("4/12/2007");
        等价于
        var box=new Date(Date.parse("4/12/2007"));
        console.log(box);
        // Thu Apr 12 2007 00:00:00 GMT+0800(中国标准时间)
      多数值参数 : 最少指定前两个(否则为单数值情况),不指定默认为第一天.
        var time =new Date(y,m,d,h,m,s,ms);
        var t1 = new Date(2016,1,1); // 2月
        var t2 = new Date(2016,1,0); // 1月 ,根据此特性可求出某月份的天数
        var t3 = new Date(2016,1);   // 2月
        console.log(t1); //Mon Feb 01 2016 00:00:00 GMT+0800(中国标准时间)
        console.log(t2); //Sun Jan 31 2016 00:00:00 GMT+0800(中国标准时间)
        console.log(t3); //Mon Feb 01 2016 00:00:00 GMT+0800(中国标准时间)
    ◆静态方法
    Date.now();      返回自世界协调时间至今所经过的毫秒数
    Date.parse(str/date); 接收表示日期的字符串参数,返回相应的毫秒数.
      e.g. Date.parse('4/12/2007');
      //1176307200000,返回值为一个毫秒数
    Date.UTC(num1,num2,...); 返回表示日期的毫秒数
      参数中必须有年份和月份
      Date.UTC(2016,10,1,1,1);  //1477962060000
    ◆获取事件信息的方法
    // dat.getYear(); 被废弃
    dat.getDay()          得到星期数值, 0-6 表示.
    dat.getFullYear()     得到年份数值.
    dat.getMonth()        得到月份数值, 0-11 表示.
    dat.getDate()         得到 日 数值, 1-31 表示.
    dat.getHours()        得到小时数值, 0-23 表示.
    dat.getMinutes()      得到分钟数值, 0-59 表示.
    dat.getSeconds()      得到 秒 数值, 0-59 表示.
    dat.getMilliseconds() 得到毫秒数值, 0-999 表示.
    dat.getTime()         得到从1970年1月1日到当前时间的毫秒数值
    以上get方法都有对应的set方法,用于改变日期对象的各项值,都具有UTC功能,
      如: setDate() setUTCDate()
    dat.getTimezoneOffset() 得到当前时区的时间和格林威治时间(GMT)相差分钟数值.
      e.g.
      dat.getTimezoneOffset(); //-480 ,相差8个小时
      如果在柏林,则 new Date().getTimezoneOffset();    //-60
    ◆日期格式化 : 将日期按不同的格式转化为字符串
    new Date(0);  默认显示格式
      //Thu Jan 01 1970 08:00:00 GMT+0800(中国标准时间)
    dat.toDateString()  星期 月 日 年
      // Thu Jan 01 1970
    dat.toTimeString()  时:分:秒 时区 [e.g.: 08:00:00 GMT+0800(中国标准时间)]
      e.g.:
        var time = new Date(1970,0,1,71,20,20); // 71:20:20
        time.toTimeString();  // "23:20:20 GMT+0800 (中国标准时间)"
    dat.toLocaleDateString()  年/月/日
      // "2016/12/23"(Chrome下)
      // "‎2016‎年‎12‎月‎23‎日"(IE11下)
      // "2016/12/23"(Firefox下)
    dat.toLocaleTimeString()  时 分 秒 时区
      // 上午8:00:00
    dat.toUTCString();        完整的UTC日期格式
      // Thu, 01 Jan 1970 00:00:00 GMT
    日期的比较(使用变量名比较时,对象的变量名指向的是地址)
      通过getTime()转换为毫秒数进行比较
      将时间对象通过JSON格式转化后进行比较
  RegExp   正则对象
    PS:Regular Expression使用字符串来描述、匹配一系列符合某个语法规则的字符串
      正则表达式是一个描述字符模式的对象.
      ECMAScript的RegExp类型表示正则表达式.
      String 和 RegExp 都定义了使用正则表达式进行强大的模式匹配和文本检索与替换的函数.
      常用于表单的本地验证.
    创建正则表达式
      /pattern/attr 字面量方式创建
        PS:正则表达式字面量在脚本加载后编译.
          若需创建的正则表达式是常量,使用这种方式可以获得更好的性能.
        e.g. :
          var rgep1=/fan/;
          var rgep2=/fan/ig;
      new RegExp(str,attr); 通过字符串创建
        PS:
          当创建的正则表达式的模式会发生改变,
          或者事先并不了解它的模式,
          或者是从其他地方(比如用户的输入)得到的,
          代码这时比较适合用构造函数的方式.
        e.g. :
          var rgep = new RegExp('fan-\\d','ig')
          console.log(rgep); //  /fan-\d/gi
      new RegExp(/ab/,'g'); 通过正则创建 [ES6新增]
    attributes 模式修饰符
      i   ignore case,忽略大小写
      g   global,全局匹配
      m   multiple lines,多行匹配
    Metacharacter 元符号 :包含特殊含义的字符
      PS: 可以控制匹配模式的方式.
        第二个反斜杠"/"后的元字符将失去其特殊含义(用于放置模式修饰符的)
      ◇字符元字符
      .   表示(除换行符和回车符外的)任意字符,等价于[^\r\n]
        e.g. :
        var rgep=/g.gle/;
        var str1="g gle";
        var str2="ggle";
        var str3="g\tgle";
        var str4="g\ngle";
        rgep.test(str1);   //true
        rgep.test(str2);   //true
        rgep.test(str3);   //false
        rgep.test(str3);   //false
      \d  digit,表示一数字          同[0-9]
      \D  表示一非数字              同[^0-9]
      \w  word,表示一字母或数字或_   同[a-zA-Z0-9]
      \W  表示一非字母和数字及_      同[^a-zA-Z0-9]
      \s  space,表示空白字符、空格、制表符和换行符
        也可以使用空格来匹配空格
      \S  表示非空白字符
      \0  表示null空字符
      \n  表示换行字符
      \r  表示回车字符
      \t  表示制表符
      \f  表示进纸字符
      \v  查找垂直制表符
      \cx 与x对应的控制字符(如Ctrl+x)
      \xxx  查找以八进制数 xxx 规定的字符
      \xdd  查找以十六进制数 dd 规定的字符
      ◇量词字符
      X?       表示0个或1个X
      X+       表示1个或多个X
      X*       表示任意数量的X(可为0)
      X{num}   表示num个的X
      X{num,}  表示num个及以上数量的X
      X{num1,num2}  表示num1个到num2个之间任意数量的X
      ◇锚点字符
      ^   强制首匹配
        位于正则字符串的开始(第一个斜杠/后)
        e.g. : ^n 匹配任何开头为 n 的字符串.
      $   强制尾匹配
        位于正则字符的末尾(第二个斜杠/之前)
        e.g. : n$ 匹配任何结尾为 n 的字符串.
      ?=n 匹配任何其后紧接指定字符串 n 的字符串.
      ?!n 匹配任何其后没有紧接指定字符串 n 的字符串.
      \b  匹配单词边界(在[]内时无效)
        /a\b/ 表示a字母为单词的结尾字母
        /\ba/ 表示a字母为单词的首字母
      \B  匹配非单词边界
      \z  只匹配字符串结束处
      \Z  匹配字符串结束处或行尾
      \A  只有匹配字符串开始处??
      \G  匹配当前搜索的开始位置
      ◇方括号[] 与 圆括号()
      [char]   表示[]内的任意一个字符
        e.g. :
        [a-z] [A-Z] [0-9]
        互相组合如[a-zA-Z0-9]
      [^char]  表示任意不在括号中的一个字符
        e.g. :
        [^a-z]
        可组合如:[^a-zA-Z0-9]
      [0-9]    查找任何从 0 至 9 的数字
        [a-z]    查找任何从小写 a 到小写 z 的字符
        [A-Z]    查找任何从大写 A 到大写 Z 的字符
        [A-z]    查找任何从大写 A 到小写 z 的字符
        也可任意组合如 [a-z0-9]等
        e.g. :
        [a-z-] 匹配 a到z和-
      ()       分组,对()内的整体进行处理
      (XYZ)    表示一个(XYZ)
      /(abc){3}/  表示需要匹配abc 三次以上
      (red|blue|green)  查找任何指定的选项(| 或)
    捕获匹配分组 
      PS:获取之前需要有匹配操作;
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
      e.g. :
        var rgep=/a(.*)a([0-9])/;
        var str='abcdea1abc';
        str.match(rgep);  // 需匹配一次
        RegExp.$1;        // "bcde",表示第1个分组匹配到的内容.
        RegExp.$2;        // "1",表示第2个分组匹配到的内容.
    转义字符:使用 \字符 转义
      在RegExp中许多符号被用于表达特殊的含义,当需要表示这些字符时需转义.
      如 点.,当需要匹配点.时,就需要转义 \.
      \uxxxx  查找以十六进制数 xxxx 规定的 Unicode 字符
        e.g.:
        \u00A0       不间断空格
        \u0008  \b   Backspace
        \u000D  \r   回车
        [\u4e00-\u9fa5] 表示所有的汉字
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
      e.g.
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
    ◆RegExp对象的实例属性/方法
      e.g.
      var rgep=/google/ig;
      rgep.global;     // true
      rgep.ignoreCase; // true
      rgep.multiline;  // false
      rgep.source;     // "google"
    rgep.global;      表示g是否已设置的布尔值,默认为false
    rgep.ignoreCase;  表示i是否已设置的布尔值,默认为false
    rgep.multiline;   表示m是否已设置的布尔值,默认为false
    rgep.Source;      正则表达式的文本字符串
    rgep.lastIndex;   取/设下次匹配字符位置的数值表示(在全局匹配时生效)
    rgep.test(str);   返回对象是否在参数中的布尔值
      var rgep = new RegExp('fan');
      var str = 'fanshenglin';
      console.log(rgep.test(str));    // true
      console.log(/fan/i.test('Fan')); // true

      使用全局匹配,匹配多次可能返回错误值.
      由于正则的lastIndex的属性导致
      var reg = /\w/g;
      console.log(reg.test("a")); // true
      console.log(reg.test("a")); // false
      console.log(reg.test("a")); // true
      console.log(reg.test("a")); // false
    rgep.exec(str);   返回正则匹配于指定字符串中的结果数组,否则返回null
      e.g.
        var rgep=/[a-z]{2}/;
        var str='abcdefghi';
        rgep.exec(str);  // ["ab"]

        var  rgep=/^([a-z]+)\s([0-9]{4})$/;  //使用了分组
        var str='google 2012';
        rgep.exec(str);   // ["google 2012", "google", "2012"]
      捕获性分组,即所有的捕获都返回
        var rgep=/(\d+)([a-z])/;
        var str='123abc';
        rgep.exec(str);  // ["123a", "123", "a"]
        
        var rgep=/(\d+)/;
        var str='123abc12aa3a';
        console.log(rgep.exec(str)); 
        // ["123", "123", index: 0, input: "123abc12aa3a"]
        console.log(rgep.exec(str)); 
        // ["123", "123", index: 0, input: "123abc12aa3a"]
        console.log(rgep.exec(str)); 
        // ["123", "123", index: 0, input: "123abc12aa3a"]
        
        var rgep=/(\d+)/g;
        var str='123abc12aa3a';
        console.log(rgep.exec(str)); 
        // ["123", "123", index: 0, input: "123abc12aa3a"]
        console.log(rgep.exec(str)); 
        // ["12", "12", index: 6, input: "123abc12aa3a"]
        console.log(rgep.exec(str)); 
        // ["3", "3", index: 10, input: "123abc12aa3a"]
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
    rgep.compile(rgep,modifier); 编译正则表达式
    ◆静态属性 :需先执行匹配(test或exec)
      e.g. :
      var rgep=/google/;
      var str="this is a agoogle!";
      //必须执行一下(test或exec),静态属性才有效
      rgep.test(str);
      RegExp.input;        //this is a google!
      RegExp.lastMatch;    //google
      RegExp.leftContext;  //this is a a
      RegExp.rightContext; //!
      RegExp.lastParen;
      RegExp.multiline;    //false
    RegExp.input;        $_  当前被匹配的字符串
    RegExp.lastMatch;    &&  最后一个匹配的字符串
    RegExp.leftContext;  $`  最后一次匹配前的子串      `
    RegExp.rightContext;     在上次匹配之后的子串
    RegExp.lastParen;    $+  最后一对圆括号内的匹配子串
    RegExp.multiline;    $*  指定是否所的表达式都用于多行的布尔值
    ◆字符串中的正则方法
    str.match(rgep);  返回符合正则的字符串组成的数组
      var rgep=/Box/ig;
      var str="this is a Box2,thatis a box!";
      console.log(str.match(rgep));    //["Box", "box"]
    str.search(rgep); 返回第一个正则的位置,否则返回-1
      search方法查找到即返回,无需g全局匹配
      var rgep=/Box/ig;
      var str="this is a box,thatis a box!";
      str.search(rgep);
      //10,返回第一个匹配的位置(从0开始)
    str.split(rgep);  返回使用正则分割成的字符串组成的数组
      var rgep=/!/ig;
      var str="this is a box!,thatis a box!";
      str.split(rgep);
      //["this is a box", ",thatis a box", ""]
    Str.replace(rgep,str); 返回指定字符串替换正则后的新字符串 [未改变原字符串]
      PS:全局则替换字符串中所有符合的字符,否则替换第一个,
        非全局连续多次替换时,后一次从上一次匹配结束的位置开始匹配
      var rgep=/Box/ig;
      var Str="this is a Box,that is a box!";
      var str ='tom';
      Str.replace(rgep,str); // "this is a tom,that is a tom!"
    常用的正则
      检查邮政编码
        规则六位数字,第一位不是0
        var pattern=/[1-9][0-9]{5}/;
        var str="224000";
        pattern.test(str);      //true
      检查文件压缩包
        规则:名称可能为 字母、数字、下划线 格式可能为.zip/.rar/gz
        var pattern=/^[\w\-]+\.(zip|rar|gz)$/;
        // |选择符 需使用分组符号 包含起来
        var str="1-23.zip";
        pattern.test(str);      //true
      删除多余空格
        var pattern=/\s/g;
        var str="111 222 333 444";
        str.replace(pattern,"");      //"111222333444"
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
      简单的电子邮件验证
        var pattern=/^([\w\.\_]+)@([\w\_]+)\.([a-zA-Z]{2,4})$/;
        var str="123abc.com@aaa.com";
        alert(pattern.test(str));
  Error    错误对象
    PS:JS解析或执行时,一旦发生错误,引擎就会抛出一个错误对象。
      然后整个程序就中断在发生错误的地方,不再往下执行.
      JS原生提供一个Error构造函数,所有抛出的错误都是这个构造函数的实例。
    错误类型
      PS:ECMA-262 定义了7种错误类型
        Error是基类型,是其他六种的父类型,其他类型继承自它;
        其他六种派生错误,连同原始的Error对象,都是构造函数。
        开发者可以使用它们,人为生成错误对象的实例。
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
      message表示错误消息,为字符串
      new Error(message);
      new RangeError(message);
      ...
      通过原型链继承Error来创建自定义错误类型
        e.g. :
        function CustomError(message){
          this.name ="CustomError";
          this.message =message;
        }
        CustomError.prototype =new Error();
        throw new CustomError('abc')
    error.message; 可以读取的错误消息 [标准属性]
    error.description; 和 message 属性完全相同 [IE定义]
    error.number;  错误数量 [IE定义]
    error.name;    错误名称 [非标准属性]
    error.stack：  错误的堆栈 [非标准属性]
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
  ◆单体内置对象
    PS:ECMA-262 的定义:有ECMAScript实现提供的、不依赖宿主环境的对象,
      这些对象在ECMAScript程序执行之前就已经存在了.
  Global 全局对象 
    PS:
      JS继承于ECMAScript,在浏览器中使用JS,全局对象为window
      Web浏览器将Global作为window对象的一部分加以实现
      Global对象是ECMAScript中一个特别的对象,没有定义如何调用Global对象
      不属于任何其他对象的属性和方法,最终都是它的属性和方法
      所有全局作用域中定义的变量和函数,都是Global对象的属性和方法;
      诸如前面的 isNaN isFinite paresInt等等
      Global对象没有办法直接访问,在浏览器中使用window对象来实现全局访问.
    间接获取Global对象
      var global =function(){
        return this;
      }
    其他内置属性/方法:
      URI 编码方法
        PS:URI编码可以对URI(链接)进行编码,以便发送给浏览器
          URI(Uniform Rescurce Identifiers),通用资源标识符
          有效的URI中不能包含某些字符,如空格
          采用特殊的UTF-8 编码替换所有无效字符,从而让浏览器能够接受和理解.
          encodeURICompinent()编码比encodeURI()编码来的更加彻底
          一般来说encodeURIConponent()使用频率要高一些.
        encodeURI(str)/decodeURI(str)
          不会对本身属于URI的特殊字符进行编码,如冒号、正斜杠、问号和#等;
        encodeURICommponent(str)/decodeURIComponent(str)
          会对任何非标准字符进行编码.
      eval()方法
        eval()方法主要担当一个字符串解析器的作用
        只接受一个参数,而这个参数就是要执行的JavaScript代码的字符串.
        e.g.
          'var box =100';   //表达式为一行字符串,而非JS代码
          console.log(box);       //程序报错,不存在box
          eval('var box =100');
          console.log(box);       //100
    Global对象属性
      如下为 Global 的所有属性
      undefined  特殊值undefined
      NaN        特殊值NaN
      Infinity   特殊值Infinity
      Object     构造函数Object
      Array      构造函数Array
      Function   构造函数Function
      Boolean    构造函数Boolean
      String     构造函数String
      Number     构造函数Number
      Date       构造函数Date
      RegExp     构造函数RegExp
      Error          构造函数Error
      EvalError      构造函数EvalError
      RangeError     构造函数RangeError
      ReferenceError 构造函数ReferenceError
      SyntaxError    构造函数SyntaxError
      TypeError      构造函数TypeError
      URIError       构造函数URIError
    window 对象
      PS:
        ECMAScript中不能直接访问Global对象,当Web浏览器都将这个全局对象作为window对象的一部分加以实现
        window为JS(而非ECMAScript)最顶层的对象
        全局作用域中声明的所有变量和函数,都为window对象的属性和方法.
      var a =1;
      window.a; //1 ,a就是window.a
      方法 :全局函数
        parseInt(string,radix)
        parseFloat(string)
        isFinite(value)检测是否是不是无穷值,
          如果值是NaN、+Infinity或-Infinity,返回false,其余返回true
        isNaN(value);检测值是否为NaN
          若值为NaN返回true,否则返回false
        encodeURI(URI)将字符串编码为URI
          通用资源标识符简称为URI
          ,/?:@&=+$#等具有特殊含义的ASCII标点符号,不会进行转义(可使用decodeURIComponent(URI)进行编码)
        decodeURI():解码某个编码的URI
        encodeURIComponent(URI)将字符串编码为URI
          //不会对ASCII字母、数字及-_.!～*'()等进行编码.
        decodeURIComponent()解码一个编码的URI
        escape()对字符串进行编码
          不要编码URI
          不会对*@-_+./ 等ASCII标点符号进行编码
        unescape()解码由escape()编码的字符串
        eval()将JavaScript字符串当作脚本来执行.
          如果参数是一个表达式,eval()函数执行表达式.如果参数是JavaScript语句,eval()将执行JavaScript语句.
          eval()函数是一种由函数执行的动态代码,比直接执行脚本慢很多
        Number(Object)把对象值转换为数字.
        String()把对象的值转换为字符串
          String()函数返回与字符串对象的toString()方法值一样.
  Math   数学对象 
    PS:
      为数学常量和数学函数提供了属性和方法
      Math的所有属性/方法都是静态的
    数学值
      Math.PI         π的值
        Math.PI;  //3.141592653589793
      Math.SQRT2      2 的平方根
      Math.SQRT1_2    1/2 的平方根
      Math.E          自然对数的底数,即常量e的值(也叫欧拉参数)
      Math.LN10        10 的自然对数
      Math.LN2         2 的自然对数
      Math.LOG2E       以2为底e的对数
      Math.LOG10E      以10为底e的对数
      Math.random();   随机数
        得到一个介于0到1之间的随机数,不包括0和1.
        不需要参数,添加参数不起作用,也不会报错.
        应用：如果需要某个范围,可套用以下公式:
          值=Math.floor(Math.random()*总数+第一个值)
          Math.floor(Math,random()*6+5);
          //随机产生5-10之间的任意整数
    求极值
      Math.min()和Math.max() 返回一组数值中的最小值和最大值.
      e.g. :
      Math.max(2,3,5,6,76,8,7);   //76
      Math.min(2,3,5,6,76,8,7);   //2
      Math.min.apply(null,[2,3,5,6,76,8,7]);   //2
      Math.min.apply(null,[0,0,0]);   //2
    取整
      Math.round(num)   四舍五入取整            「round  圆；循环；一回合；圆形物」
      Math.ceil(num)    向上舍入取整,数值将变大; 「ceil  天花板」
      Math.floor(num)   向下舍入取整,数值将变小; 「floor 地板  」
      e.g. Math.floor(1.1)    //1
    其他方法
      Math.abs(num)       返回num的绝对值
      Math.pow(num,power) 返回num的power次幂
      Math.sqrt(num)      返回num的平方根
      Math.log(num)       返回num的自然对数
      Math.exp(num)       返回Math.E的num次幂
      Math.sin(弧度值)  求正弦值
        e.g. Math.sin(30/180*Math.PI);  //0.49999999999999994
      Math.cos(弧度值)  求余弦值
      Math.tan(弧度值)  求正切值
      Math.acos(x)      返回x的反余弦值
      Math.asin(x)      返回x的反正弦值
      Math.atan(x)      返回x的反正切值
      Math.atan2(x,y)   返回x/y的反正切值
  JSON:  "JavaScript Object Notation",JS对象表示法 [ES5+]
    PS: 一种基于文本、独立于语言的轻量级数据交换格式,
      利用 JS 中的一些模式来表示结构化数据.
      对于整个Web,广泛用于数据的传送和数据的交换.
      JSON是独立于语言的,也就是说不管什么语言,都可以解析JSON,只需要按照JSON的规则来就行.
      JSON可以使用javascript内建的方法直接进行解析,转换成javascript对象,非常方便;
      每个JSON对象只能是一个值,即每个JSON文档只能包含一个值;
    JSON值类型和格式
      简单类型: String Number,只能十进制 Boolean Null
        不能使用 NaN Infinity undifined
        String 必须使用双引号
      复合类型: Array Object 不能为函数、正则、日期对象
        对象的键必须用双引号引起来 ,
        数组或对象的最后一个成员不能加逗号
      e.g.:
        JSON.stringify("aoo"); // ""aoo""
        JSON.stringify("aoo") === "\"aoo\"";  // true
        JSON.stringify("aoo") === ""aoo"";    // 报错
        引号使用\转义, 将来还原时,双引号让JS引擎知道aoo为字符串而非变量名
        
        { "aoo" : "style="color:red;"" }
        格式错误,可改为
        { "aoo" : "style=\"color:red;\"" }
        或 { "aoo" : "style='color:red;'" }
    ◆JSON对象 的两个方法
      PS:ECMAScript5 对解析 JSON 的行为进行了规范,定义了全局对象 JSON对象
      e.g.
        var s = JSON.stringify([1,2,3,4]);
        //"[1,2,3,4]",为string类型
        var a = JSON.parse(s);
        //[1,2,3,4],object类型(数组为object类型)
    JSON.stringify(val[,arr/func,num/str]); 序列化,将JS值转换为JSON字符串
      PS:序列化JS对象时,所有函数及原型成员都会被有意忽略,不体现在结果中
        值为undefined的任何属性也都会被跳过
      val       需序列化的值
      arr/func  可选,过滤器,数组或函数
        若为数组则,结果中将只包含数组中列出的属性
          e.g. :
          var book ={
            "title":"Professional JavaScript",
            "authors":['abc'],
            "edition":3,
            year:2011
          }
          var jsonText =JSON.stringify(book,["title","edition"]);
          // {"title":"Professional JavaScript","edition":3}
        若为函数,函数接收两个参数:属性名和属性值,
          当值为非键值对结构的值时,键名可以为空字符串
          e.g. :
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
          当为数值时范围为1-10(超过10仍取10),表示最大缩进空格数(不会改变数据(SelfThink))
          若为字符串时,则该字符串将在JSON字符串中被用作缩进字符(代替空格)
            可将缩进字符设置为制表符等
            缩进字符串最长长度不能超过10个字符,否则只使用前10个字符
      e.g. :
        会将属性值为undefined的属性忽略,NaN、Infinity 转换为null,
        时间表示转换为字符串的表示
        var obj ={a:undefined,b:NaN,c:Infinity,d:new Date()};
        JSON.stringify(obj);
        // "{"b":null,"c":null,"d":"2016-12-28T07:45:24.152Z"}"
      对象成员的值为 undefined 函数 或 XML对象 该成员会被过滤
          var obj = {aoo:1,boo:undefined,coo:function(){ }};
          JSON.stringify(obj); // "{"aoo":1}"
      数组成员为 undefined、函数或XML对象,将被转换成null
        var arr = [undefined,function(){ }];
        JSON.stringify(arr); // "[null,null]"
      正则对象转换为空对象{}
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
        e.g.:
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
      使用toJSON的特性,将正则转化为字符串
        var reg = /aoo/;
        JSON.stringify(reg); // "{}"
        设置toJSON方法
        RegExp.prototype.toJSON = RegExp.prototype.toString;
        JSON.stringify(/aoo/); // ""/aoo/""
    JSON.parse(JSONstr[,func]);     反序列化,将 JSON字符 串转换为JS值
      PS:若还原中存在undefined会被删除, 若参数不是有效的JSON格式,将报错
      JSONstr 需要解析的JSON字符串
      func    可选,函数的参数传入 属性名 和 属性值
    应用:
      使用 JSON 的函数进行序列化和反序列化来本地保存
      JSON 可以将JS中一组数据转换为字符串,然后就可以在函数之间轻松地传递这个字符串
  Performance 当前页面加载相关的性能信息  「ES5+」
    PS: ECMAScript 5 引入“高精度时间戳”这个API,部署在performance对象上。
      用于精确度量、控制、增强浏览器的性能表现;为测量网站性能,提供以前没有办法做到的精度。
      它的精度可以达到1毫秒的千分之一,这对于衡量的程序的细微差别,提高程序运行速度很有好处,
      而且还可以获取后台事件的时间进度。
      目前,所有主要浏览器都已经支持performance对象,
      包括Chrome 20+、Firefox 15+、IE 10+、Opera 15+。
    比如,为了得到脚本运行的准确耗时,需要一个高精度时间戳。
      传统的做法是使用Date对象的getTime方法。
      var start = new Date().getTime();
      // do something here
      var now = new Date().getTime();
      var latency = now - start;
      console.log("任务运行时间：" + latency);
      不足之处: 
        精度,getTime方法,以及Date对象的其他方法都只能精确到毫秒级别,
          想要得到更小的时间差别就无能为力了；
        局限,这种写法只能获取代码运行过程中的时间进度,无法知道一些后台事件的时间进度,
          比如浏览器用了多少时间从服务器加载网页。
    performance.timing  包含了各种与浏览器性能有关的时间数据
      PS:提供浏览器处理网页各个阶段的耗时。
      以下属性全部为只读
      navigationStart  当前浏览器窗口的前一个网页关闭,发生unload事件时的Unix毫秒时间戳。
        如果没有前一个网页,则等于fetchStart属性。
        performance.timing.navigationStart   // 13260687
        表示距离浏览器开始处理当前网页,已经过了13260687毫秒
      unloadEventStart 如果前一个网页与当前网页属于同一个域名,则返回前一个网页的unload事件发生时的Unix毫秒时间戳。
        如果没有前一个网页,或者之前的网页跳转不是在同一个域名内,则返回值为0。
      unloadEventEnd   如果前一个网页与当前网页属于同一个域名,则返回前一个网页unload事件的回调函数结束时的Unix毫秒时间戳。
        如果没有前一个网页,或者之前的网页跳转不是在同一个域名内,则返回值为0。
      redirectStart    返回第一个HTTP跳转开始时的Unix毫秒时间戳。
        如果没有跳转,或者不是同一个域名内部的跳转,则返回值为0。
      redirectEnd      返回最后一个HTTP跳转结束时,即跳转回应的最后一个字节接受完成时的Unix毫秒时间戳。
        如果没有跳转,或者不是同一个域名内部的跳转,则返回值为0。
      fetchStart：返回浏览器准备使用HTTP请求读取文档时的Unix毫秒时间戳。该事件在网页查询本地缓存之前发生。
      domainLookupStart：返回域名查询开始时的Unix毫秒时间戳。如果使用持久连接,或者信息是从本地缓存获取的,则返回值等同于fetchStart属性的值。
      domainLookupEnd：返回域名查询结束时的Unix毫秒时间戳。如果使用持久连接,或者信息是从本地缓存获取的,则返回值等同于fetchStart属性的值。
      connectStart：返回HTTP请求开始向服务器发送时的Unix毫秒时间戳。如果使用持久连接(persistent connection),则返回值等同于fetchStart属性的值。
      connectEnd：返回浏览器与服务器之间的连接建立时的Unix毫秒时间戳。如果建立的是持久连接,则返回值等同于fetchStart属性的值。连接建立指的是所有握手和认证过程全部结束。
      secureConnectionStart：返回浏览器与服务器开始安全链接的握手时的Unix毫秒时间戳。如果当前网页不要求安全连接,则返回0。
      requestStart：返回浏览器向服务器发出HTTP请求时(或开始读取本地缓存时)的Unix毫秒时间戳。
      responseStart：返回浏览器从服务器收到(或从本地缓存读取)第一个字节时的Unix毫秒时间戳。
      responseEnd：返回浏览器从服务器收到(或从本地缓存读取)最后一个字节时(如果在此之前HTTP连接已经关闭,则返回关闭时)的Unix毫秒时间戳。
      domLoading：返回当前网页DOM结构开始解析时(即Document.readyState属性变为“loading”、相应的readystatechange事件触发时)的Unix毫秒时间戳。
      domInteractive：返回当前网页DOM结构结束解析、开始加载内嵌资源时(即Document.readyState属性变为“interactive”、相应的readystatechange事件触发时)的Unix毫秒时间戳。
      domContentLoadedEventStart：返回当前网页DOMContentLoaded事件发生时(即DOM结构解析完毕、所有脚本开始运行时)的Unix毫秒时间戳。
      domContentLoadedEventEnd：返回当前网页所有需要执行的脚本执行完成时的Unix毫秒时间戳。
      domComplete：返回当前网页DOM结构生成时(即Document.readyState属性变为“complete”,以及相应的readystatechange事件发生时)的Unix毫秒时间戳。
      loadEventStart：返回当前网页load事件的回调函数开始时的Unix毫秒时间戳。如果该事件还没有发生,返回0。
      loadEventEnd：返回当前网页load事件的回调函数运行结束时的Unix毫秒时间戳。如果该事件还没有发生,返回0。
    e.g.:
      var t = performance.timing;
      var pageloadtime = t.loadEventStart - t.navigationStart; 
      //页面加载的耗时
      var dns = t.domainLookupEnd - t.domainLookupStart; 
      // 域名解析的耗时
      var tcp = t.connectEnd - t.connectStart; 
      //TCP连接的耗时
      var ttfb = t.responseStart - t.navigationStart;
      // 读取页面第一个字节之前的耗时

    根据上面这些属性,可以计算出网页加载各个阶段的耗时。比如,网页加载整个过程的耗时的计算方法如下：
    
    
    var t = performance.timing; 
    var pageLoadTime = t.loadEventEnd - t.navigationStart;
    
    performance.now()
    performance.now方法返回当前网页自从performance.timing.navigationStart到当前时间之间的微秒数(毫秒的千分之一)。也就是说,它的精度可以达到100万分之一秒。
    
    performance.now() 
    // 23493457.476999998
    
    Date.now() - (performance.timing.navigationStart + performance.now())
    // -0.64306640625
    上面代码表示,performance.timing.navigationStart加上performance.now(),近似等于Date.now(),也就是说,Date.now()可以替代performance.now()。但是,前者返回的是毫秒,后者返回的是微秒,所以后者的精度比前者高1000倍。
    
    通过两次调用performance.now方法,可以得到间隔的准确时间,用来衡量某种操作的耗时。
    
    var start = performance.now();
    doTasks();
    var end = performance.now();
    
    console.log('耗时：' + (end - start) + '微秒。');
    performance.mark()
    mark方法用于为相应的视点做标记。
    
    window.performance.mark('mark_fully_loaded');
    clearMarks方法用于清除标记,如果不加参数,就表示清除所有标记。
    
    window.peformance.clearMarks('mark_fully_loaded');
    
    window.performance.clearMarks();
    performance.getEntries()
    浏览器获取网页时,会对网页中每一个对象(脚本文件、样式表、图片文件等等)发出一个HTTP请求。performance.getEntries方法以数组形式,返回这些请求的时间统计信息,有多少个请求,返回数组就会有多少个成员。
    
    由于该方法与浏览器处理网页的过程相关,所以只能在浏览器中使用。
    
    
    window.performance.getEntries()[0]
    
    // PerformanceResourceTiming { 
    //   responseEnd: 4121.6200000017125, 
    //   responseStart: 4120.0690000005125, 
    //   requestStart: 3315.355000002455, 
    //   ...
    // }
    
    上面代码返回第一个HTTP请求(即网页的HTML源码)的时间统计信息。该信息以一个高精度时间戳的对象形式返回,每个属性的单位是微秒(microsecond),即百万分之一秒。
    
    performance.navigation对象
    除了时间信息,performance还可以提供一些用户行为信息,主要都存放在performance.navigation对象上面。
    
    它有两个属性：
    
    (1)performance.navigation.type
    
    该属性返回一个整数值,表示网页的加载来源,可能有以下4种情况：
    
    0：网页通过点击链接、地址栏输入、表单提交、脚本操作等方式加载,相当于常数performance.navigation.TYPE_NAVIGATENEXT。
    
    1：网页通过“重新加载”按钮或者location.reload()方法加载,相当于常数performance.navigation.TYPE_RELOAD。
    
    2：网页通过“前进”或“后退”按钮加载,相当于常数performance.navigation.TYPE_BACK_FORWARD。
    
    255：任何其他来源的加载,相当于常数performance.navigation.TYPE_UNDEFINED。
    
    (2)performance.navigation.redirectCount
    
    该属性表示当前网页经过了多少次重定向跳转。  
表达式|语句 
  ECMA-262 规定了一组语句,也称为流程控制语句;
  表达式
    解释器会通过计算将表达式转换为一个值.
    最简单的表达式是字面量或变量名.
    通过合并简单的表达式来创建复杂的表达式.
    e.g.
    box+5;    //加法运算的表达式
    typeOf(box); //查看数据类型的表达式
    box>3;         //逻辑运算表达式
  语句 :比表达式更大的单位叫语句.
    PS: 程序由语句组成.
      最简单的语句由一个表达式和表达式后的分号组成.
      语句通常有一个或多个关键字来完成给定的任务.如:判断、循环、退出等.
      在ECMAScript中,所有的代码都是有语句来构成的.
      语句表明执行过程中的流程、限定与约定
      形式上可以是单行语句,或大括号{}括起来的复合语句(复合语句一般也称代码块)
      在语法描述中,复合语句整体可以作为一个单语句处理.
    ◆块语句 {} :JS无块级作用域
    ◆声明语句 :变量声明
    ◆表达式语句 :赋值 与 调用
    ◆分支语句
    if(boo){}
      if语句括号的的表达式若为true,只会执行后面一条语句
      括号中的若不为布尔值,系统会调用Boolean()函数进行转换.
      如果需要控制多条语句,那么就需使用{}把多条语句包含在内.(推荐都加{})
      if分支语句: if(){ }else{ }
      if 多重分支语句
        if(){
        }else if{
        }else if{
        }...{
        }else{
        }
        可以使用if或else作为最后一个判断,当使用else时至少会执行一个
    switch(value) 多重条件判断,用于多个值相等的比较.
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
    for 语句
      具有在执行循环之前初始化变量和定义循环后执行代码的能力.
      for(初始变量;判断语句;其他语句;){执行语句}
        注:其他语句 在 执行语句 后运行.
    while(条件){ }
      while语句先判断再运行.
    do{ }while(条件);
      先执行后判断,至少会执行一次.
    for(var key in obj) 无序遍历对象属性/数组元素 等等(?)
      PS: ECMAScript对象的属性无顺序,因此for-in循环的顺序不可预测
        若原型链上的属性设置为可遍历,则也会将其遍历出来.
      e.g.
        var obj ={ name:"abc", age:19 }
        for(var key in obj){ console.log(key,obj[key]) }
        // name abc ,age 19

        var obj={ "a":"01", "b":"02", "c":"03","d":"04" };
        for(var k in obj){console.log(k);} // a b c d

        var arr=[1,2,3,4,5]
        for(var k in arr){console.log(k);} // 1 2 3 4 5
    for(var val of obj) 遍历对象属性值/数组元素/字符串字符等集合的元素或值
      e.g. :
      str ="123456";
      for(var val of str) { console.log(val); }
      // 1 2 3 4 5 6
    ◆控制结构
    break 和 continue 语句
      只能用于循环语句中,用于精确控制代码的执行
      continue 继续下一次循环(跳出当前循环).
      break    跳出循环,执行循环后的语句.
    return   函数返回
    throw value; 异常触发 :用于随之抛出自定义错误
      value 类型无要求
      在遇到throw操作时,代码会立即停止执行
    try-catch 异常捕获与处理 (ECMA-262 第3版引入)
      PS:与Java中的 try-catch 语句完全相同
        catch 和 finally 可二选一
        IE7存在bug:除非有catch否则不执行finally
      try{
        // 可能会导致错误的代码
      } catch(error){
        // 发生错误时执行的代码
        // 当try中代码出错,catch会接收到一个包含错误信息的 error 对象
      } finally{
        // 该部分可选
        // 一定会执行的代码,即使前面包含return语句
      }
      e.g. :
      function foo(){
        try {return 0;}catch(e){return 1;}finally{return 2;}
      }
      foo(); // 2
    ◆其他语句
    with(){};
      e.g. :
      var box{"name":"abc","age":23,"height":175};
      var aoo=box.name;
      var boo=box.age;
      var coo=box.height;
      等价于
      var box{"name":"abc","age":23,"height":175};
      with(box){ var a=name; var b=age; var c=height; }

      var aoo = "hello";
      aoo.toUpperCase(); // HELLO
      with(aoo){console.log(toUpperCase());}
      Remarks:with 语句运行缓慢,尤其是在已设置了属性值时.尽量少使用
    label 语句
      使用label语句可以在代码中添加标签,以便将来使用
      e.g.
      var num = 0;
      lab: for(var i = 0 ; i < 10 ; i++){
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
    Remarks:
      while、for 和 if 等无作用域区间(只有函数才有作用域),
      e.g. :
      在for中定义的i,在for外面依然可以访问.
      console.log(aoo) // undefined
      console.log(boo) // undefined
      console.log(coo) // undefined
      console.log(doo) // 报错
      console.log(eoo) // 报错
      var aoo=0;
      if(false) { var boo =1 }else { var coo =2 }
      function foo(){ var doo =3 }
      eoo =4
--------------------------------------------------------------------------------
ECMAScript 6 
let   定义局部变量「ES6+」 
  和var的区别是:有作用域的限制,只在定义的作用域中存在
  e.g.
  for(let i = 0; i < 3; i++) { console.log(i); }
  console.log(i);  // undefined
const 定义是常量  「ES6+」 
  PS:不可改变,只能引用;只能在声明的时候赋予;不能被删除
  e.g. :
  const x =2;
  x = 2;     //报错 ,常量不可改变
  const c;   //报错 ,定义时必须赋值
  常量数组
    不可直接赋值修改、不可删除,但可通过其他操作来改变,如push,下标法等等
    e.g. :
    const arr =[1,2,3];
    arr =[1];    //报错
    arr.push(4); // 允许
    arr[4] =5;   // 允许
    arr;         //[1, 2, 3, 4, 5]
标准库的扩展、新增 
  Set      集合 
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
  Map      字典 
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
  RegExp   正则的扩展
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
  Blob     二进制数据的基本对象 [ES5+] 
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
字符串与正则表达式,Strings and Regular Expressions 
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
  PS: export 命令用于定义模块的对外接口,即提供接口,
    import 命令用于引入其他模块提供的功能,即引入接口;
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
    PS:
      JS一直没有模块体系,无法将一大程序拆分成互相依赖的小文件, 再简单的拼装起来。
      其他语言都有这项功能,比如 Ruby 的require、Python 的import,
      甚至就连 CSS 都有@import,
      但是 JavaScript 任何这方面的支持都没有,这对开发大型的、复杂的项目形成了巨大障碍
      在 ES6 之前,社区制定了一些模块加载方案,最主要的有 CommonJS 和 AMD 两种。
      前者用于服务器,后者用于浏览器。
      ES6 在语言标准的层面上,实现了模块功能,而且实现得相当简单,
      完全可以取代 CommonJS 和 AMD 规范,成为浏览器和服务器通用的模块解决方案。
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

 












