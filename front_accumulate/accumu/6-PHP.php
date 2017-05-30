介绍 说明 概念 
  PS：PHP,Hypertext Preprocessor 超文本预处理器,名称来源 Personal_Home_Pages  
    一种创建动态交互性站点的服务器端脚本语言,用于服务器端的存取;
    HTML和js是客户端语言,用于实现页面呈现、特效;
  功能
    能够生成动态页面内容,
    能够创建、打开、读取、写入、删除以及关闭服务器上的文件,
    能够接收表单数据,
    能够发送并取回cookies,
    能够添加、删除、修改数据库中的数据,
    能够限制用户访问网站中的某些页面,
    能够加密数据,
    可以输出图像、PDF 文件,甚至 Flash 电影,
    可以输出任意的文本,比如 XHTML 和 XML;
    跨平台,可运行在如Linux、Unix、windows等平台上;
  说明
    PS：脚本可以放在文档中的任何位置,以 <?php 开头,以?>结尾「且后面的?>是可省略的」;
      文件的默认文件扩展名是 ".php",可包含文本、HTML、JavaScript代码和 PHP 代码,
      代码在服务器上执行,结果以纯 HTML 形式返回给浏览器;
      在本地开发时,调试需开启服务器来访问否则浏览器解析不了「SlPt」;
    注释 
      <?php
        // 这是 PHP 单行注释
        
        /*
        这是 
        PHP 多行
        注释
        */
      ?>
  PHP 安装
    为了使用 PHP,需 找一个支持 PHP 和 MySQL 的 Web 主机
    安装 Web 服务器,然后安装 PHP 和 MySQL
    使用支持 PHP 的 Web 主机
    如果服务器支持 PHP,那么不需要做任何事情。
    只要在 web 目录中创建 .php 文件即可,服务器将自动为您解析这些文件。
    不需要编译任何软件,或安装额外的工具。
    由于 PHP 是免费的,大多数的 Web 主机都提供对 PHP 的支持。
    然而,如果服务器不支持 PHP,必须：
    安装 Web 服务器
    安装 PHP
    安装数据库,比如 MySQL
    官方 PHP 网站（PHP.net）有 PHP 的安装说明： http://php.net/manual/en/install.php
  PHP 服务器组件
    PS：对于初学者建议使用集成的服务器组件,它已经包含了 PHP、Apache、Mysql 等服务,
      免去了开发人员将时间花费在繁琐的配置环境过程。
    WampServer
      Window 系统可以使用 WampServer,下载地址：http://www.wampserver.com/,
      支持32位和64位系统,根据自己的系统选择版本。
      WampServer 安装也简单,你只需要一直点击 "Next" 就可以完成安装了。
    XAMPP
      XAMPP 支持 Mac OS 和 Window 系统,
      下载地址：https://www.apachefriends.org/zh_cn/index.html。
---------------------------------------------------------------------------
数据类型 
  NULL    空值
    表示变量没有值,
    NULL 是数据类型为 NULL 的值。
    可以通过设置变量值为 NULL 来清空变量数据;
    e.g.:
      <?php
      $x = "Hello world!";
      $x = null;
      var_dump($x); // NULL
      ?>
  Boolean 布尔型
    布尔型可以是 true 或 false
    布尔型通常用于条件判断;
    $x=true;
    $y=false;
  Integer 整型
    PS：整数是一个没有小数的数字。
    整数规则:
      整数必须至少有一个数字 (0-9),
      整数不能包含逗号或空格,
      整数是没有小数点的,
      整数可以是正数或负数,
      整型可用三种格式来指定：十进制、十六进制(以 0x 为前缀)或八进制(前缀为 0);
    e.g.:
      <?php 
      $x = 5985;
      var_dump($x); // int(5985)
      echo "<br>"; 
      $x = -345; 
      var_dump($x); // int(-345)
      echo "<br>"; 
      $x = 0x8C;    // 十六进制数
      var_dump($x); // int(140) 
      echo "<br>";
      $x = 047;     // 八进制数
      var_dump($x); // int(39)
      ?>
  Float   浮点型
    浮点数是带小数部分的数字,或是指数形式。
    <?php 
    $x = 10.365;
    var_dump($x); // float(10.365) 
    echo "<br>"; 
    $x = 2.4e3;
    var_dump($x); // float(2400) 
    echo "<br>"; 
    $x = 8E-5;
    var_dump($x); // float(8.0E-5)
    ?>
  String  字符串
    PS： 一个字符串是一串字符的序列,就像 "Hello world!"。
      可以将任何文本放在'单引号'或"双引号"中：
      字符串变量用于存储并处理文本。
      赋一个文本值给变量时,给文本值加上单引号或者双引号。
    e.g.:
      <?php 
      $x = "Hello world!";
      echo $x;
      echo "<br>"; 
      $x = 'Hello world!';
      echo $x;
      ?>
    .  字符串连接符
      <?php echo 'Hi,'.'imooc'.'!';?>
    strlen() 返回字符串的长度「字符数」
      <?php 
        echo strlen("Hello world!"); // 12
      ?>
    strpos(str1,str2) 在字符串str1内查找str2
      如果找到匹配,返回第一个匹配的字符位置;未找到匹配,则返回 FALSE;
      e.g.:
        <?php 
        echo strpos("0123456789","345"); // 3
        ?>
  Array   数组
    数组可以在一个变量中存储多个值
    array() 创建数组
      两种创建数值数组的方法：
      自动分配 ID 键,ID 键总是从 0 开始：
        $arr=array("a","b","c");
      人工分配 ID 键：
        <?php
        // $arr = array(); // 可以不预先定义,不同于JS
        $arr[0]="a";
        $arr[1]="b";
        $arr[2]="c";
        var_dump($arr)  ;
        // array(3) { [0]=> string(1) "a" [1]=> string(1) "b" [2]=> string(1) "c" }
        ?>
    数值数组: 带有数字 ID 键的数组
    关联数组: 带有指定的键的数组,每个键关联一个值
      关联数组是使用指定分配给数组键的数组
      两种创建关联数组的方法：
        $age=array("aoo"=>"35","boo"=>"37","coo"=>"43");
        or:
        $age['aoo']="35";
        $age['boo']="37";
        $age['coo']="43";
        随后可以在脚本中使用指定的键：
      使用 foreach 循环 遍历关联数组
        <?php
        $age = array("aoo"=>"35","boo"=>"37","coo"=>"43");
        foreach($age as $x => $x_value) {
          echo "Key=" . $x . ", Value=" . $x_value;
          echo "<br>";
        }
        ?>
      e.g.:
        <?php
        $age = array("aoo"=>"35","boo"=>"37","coo"=>"43");
        echo "aoo is " . $age['aoo'] . " years old.";
        ?>
    多维数组: 包含一个或多个数组的数组
    e.g.:
      <?php 
      $cars=array("Volvo","BMW","Toyota");
      var_dump($cars);
      ?>
    print_r()  打印数组
    count($arr) 返回数组长度
    ◆数组排序: 数组中的元素可以按字母或数字顺序进行降序或升序排列
    sort()     对数组进行升序排列 [改变原数组]
      e.g.:
        <?php
        $aoo = array("aa","abac","ba");
        sort($aoo); 
        print_r($aoo) ; // Array ( [0] => aa [1] => abac [2] => ba )
        ?>
        <?php
        $numbers=array(4,6,2,22,11);
        sort($numbers);
        print_r($numbers) ; 
        // Array ( [0] => 2 [1] => 4 [2] => 6 [3] => 11 [4] => 22 )
        ?>
    rsort()    对数组进行降序排列
    asort()    根据关联数组的值,对数组进行升序排列
      e.g.:
        <?php
        $aoo = array("a"=>"35","b"=>"37","ab"=>"43");
        asort($aoo);
        print_r($aoo); // Array ( [a] => 35 [b] => 37 [ab] => 43 )
        ?>
    arsort()   根据关联数组的值,对数组进行降序排列
    ksort()    根据关联数组的键,对数组进行升序排列
      e.g.:
        <?php
        $age = array("Peter"=>"35","Ben"=>"37","Joe"=>"43");
        ksort($age);
        print_r($age); // Array ( [Ben] => 37 [Joe] => 43 [Peter] => 35 )
        ?>
    krsort()   根据关联数组的键,对数组进行降序排列
  Object  对象
    创建对象
      首先必须使用class关键字声明类对象,类是可以包含属性和方法的结构,
      然后在类中定义数据类型,
      最后在实例化的类中使用数据类型;
    e.g.:
      <?php
      class Car {
        var $color;
        function Car($color="green") { $this->color = $color; }
        function what_color() { return $this->color; }
      }
      ?>
      this指向当前对象实例的指针
  相关函数和运算符
    var_dump()  返回变量的数据类型和值
数据 
  变量: 用于存储信息的"容器"
    PS：PHP 是一门弱类型语言
      PHP 会根据变量的值,自动把变量转换为正确的数据类型。
    命名规则：
      以 $ 符号开始,后面跟着变量的名称,
      变量必须以字母或者下划线字符开始,
      只能包含字母数字字符以及下划线 [A-z、0-9 和 _],不能包含空格,
      变量名区分大小写 [$y 和 $Y 是两个不同的变量] ;
    创建变量
      PHP 没有声明变量的命令,在第一次赋值时被创建;
      e.g.:
        <?php
          $txt = "Hello world!" ;
          $x = 5 ;
          $y = 10.5 ;
          echo '这是一个  $x';
        ?>
    作用域
      有四种不同的变量作用域：    
      global 全局变量: 在所有函数外部定义的变量
        PS：拥有全局作用域;
          全局变量可以被脚本中的任何部分访问,
          在函数中访问全局变量,需使用 global 关键字 ;
        $GLOBALS[index] 数组
          PS：所有全局变量的存储位置,index 保存变量的名称,
            该数组可以在函数内部访问,也可以直接用来更新全局变量;
          e.g.:
            <?php
            $x = 5;
            $y = 10;
            function myTest() {
              $GLOBALS['y']=$GLOBALS['x']+$GLOBALS['y'];
            } 
            myTest();
            echo $y; // 15
            ?>
      global 关键字
        global 关键字用于函数内访问全局变量。
        e.g.:
        <?php
          $x = 5 ;
          $y = 10 ;
          function myTest() {
            global $x , $y ;
            $y = $x + $y ;
          }
          myTest();
          echo $y;  // 输出 15
        ?>
      local 局部变量: 在函数内部定义的变量
        仅能在函数内部访问：
        可以在不同函数中使用相同的变量名称,因为函数内定义的变量是局部变量;
      Static 作用域
        PS：当一个函数完成时,它的所有变量通常都会被删除,
          有时候希望某个局部变量不要被删除,
          要做到这一点,需在第一次声明变量时使用 static 关键字;
        e.g.:
          <?php
          function myTest() {
            static $x = 0;
            echo $x;
            $x++;
          }
          myTest(); // 0
          myTest(); // 1
          myTest(); // 2
          ?>
          每次调用该函数时,该变量将会保留着函数前一次被调用时的值。
          注释：该变量仍然是函数的局部变量。
      parameter 参数作用域
        参数是通过调用代码将值传递给函数的局部变量。
        参数是在参数列表中声明的,作为函数声明的一部分：
        e.g.:
          <?php
          function myTest($x) {
            echo $x;
          }
          myTest(5);
          ?>
      e.g.:
        <?php 
        $x = 5; // 全局变量 
        function myTest() { 
          $y = 10; // 局部变量 
          echo "<p>测试函数内变量:<p>"; 
          echo "变量 x 为: $x";  // 无法访问
          echo "<br>"; 
          echo "变量 y 为: $y";  // 10
        }  
        myTest(); 
        echo "<p>测试函数外变量:<p>"; 
        echo "变量 x 为: $x";  // 5
        echo "<br>"; 
        echo "变量 y 为: $y";  // 无法访问
        ?>
    引用说明
      可以在 双引号中直接引用变量"" ,但不可在单引号中直接应用''
        e.g.:
          <?php
          $txt = "Hello!" ;
          echo "双引号中可以直接引用变量  $txt"; // 双引号中可以直接引用变量 Hello!
          echo '<br>';
          echo '单引号中不可直接引用变量  $txt'; // 单引号中不可直接引用变量 $txt
          ?>
  常量: 常量值被定义后,在脚本的其他任何地方都不能被改变。
    PS：常量是一个简单值的标识符;
      由英文字母、下划线、和数字组成,但数字不能作为首字母出现,
      常量名不需要加 $ 修饰符;
    设置常量: 使用 define() 函数
      define ( $name , $value [, $case_insensitive ] )
      参数:
        name ：必选,字符串,常量名称,即标志符。
        value：必选,常量的值。
        case_insensitive ：可选,boolean值,TRUE 表示常量大小写不敏感,默认为false
      e.g.:
        创建一个 区分大小写的常量, 常量值为 "abc"：
        <?php
        define("GREETING", "abc");
        echo GREETING;    // "abc"
        echo '<br>';
        echo greeting;    // "greeting"
        ?>
        创建一个 不区分大小写的常量, 常量值为 "abc"：
        <?php
        define("GREETING", "abc", true);
        echo greeting;  // 输出 "abc"
        ?>
    常量是全局的
      常量在定义后,默认是全局变量,可以在整个运行的脚本的任何地方使用。
      e.g.:
        <?php
        define("GREETING", "abc");
        function myTest() { echo GREETING; }
        myTest();    // "abc"
        ?>        
  超级全局变量: PHP系统中自带的变量
    PS：超级全局变量在PHP 4.1.0之后被启用,在一个脚本的全部作用域中都可用
    $GLOBALS: 存放着用户定义的变量,且可在全局访问的一个组合数组
      e.g.:
        <?php 
        $x = 75; 
        $y = 25;
        echo $GLOBALS['x']; // 75
        $GLOBALS['x'] = 74 ;
        echo $x;            // 74
        function addition() { 
          $GLOBALS['z'] = $GLOBALS['x'] + $GLOBALS['y']; 
        }
        addition(); 
        echo $z; // 99
        ?>
    $_SERVER: Web服务器信息
      PS：包含了诸如头信息(header)、路径(path)、
        以及脚本位置(script locations)等等信息的数组;
        这个数组中的项目由 Web 服务器创建,
        不能保证每个服务器都提供全部项目,
        服务器可能会忽略一些,或者提供一些没有在这里列举出来的项目;
      e.g.:
        <?php 
        echo $_SERVER['PHP_SELF']; // /test/one.php
        echo "<br>";
        echo $_SERVER['SERVER_NAME']; // localhuarun.qilaiwan.com
        echo "<br>";
        echo $_SERVER['HTTP_HOST']; // localhuarun.qilaiwan.com
        echo "<br>";
        echo $_SERVER['HTTP_REFERER']; 
        // Notice: Undefined index: HTTP_REFERER in E:\project\test\one.php on line 15
        echo "<br>";
        echo $_SERVER['HTTP_USER_AGENT']; 
        // Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.87 Safari/537.36
        echo "<br>";
        echo $_SERVER['SCRIPT_NAME']; // /test/one.php
        ?>
      $_SERVER 变量中的重要元素:
      $_SERVER['PHP_SELF']   当前执行脚本的文件名
        与 document root 有关。
        例如,
        在地址为 http://example.com/test.php/foo.bar 的脚本中,
        使用 $_SERVER['PHP_SELF'] 将得到 /test.php/foo.bar。
        __FILE__ 常量包含当前(例如包含)文件的完整路径和文件名。
        从 PHP 4.3.0 版本开始,如果 PHP 以命令行模式运行,
        这个变量将包含脚本名。之前的版本该变量不可用。
      $_SERVER['GATEWAY_INTERFACE']  服务器使用的 CGI 规范的版本
        例如,"CGI/1.1"。
      $_SERVER['SERVER_ADDR']  当前运行脚本所在的服务器的 IP 地址。
      $_SERVER['SERVER_NAME']  当前运行脚本所在的服务器的主机名。
        如果脚本运行于虚拟主机中,该名称是由那个虚拟主机所设置的值决定。
        (如: www.runoob.com)
      $_SERVER['SERVER_SOFTWARE']  服务器标识字符串,在响应请求时的头信息中给出。
         (如：Apache/2.2.24)
      $_SERVER['SERVER_PROTOCOL']  请求页面时通信协议的名称和版本。
        例如,"HTTP/1.0"。
      $_SERVER['REQUEST_METHOD']  访问页面使用的请求方法
        例如,"GET", "HEAD","POST","PUT"。
      $_SERVER['REQUEST_TIME']  请求开始时的时间戳  [PHP 5.1.0+可用]
         如：1377687496
      $_SERVER['QUERY_STRING']  query string（查询字符串）
        如果有的话,通过它进行页面访问。
      $_SERVER['HTTP_ACCEPT']  当前请求头中 Accept: 项的内容,如果存在的话。
      $_SERVER['HTTP_ACCEPT_CHARSET']  当前请求头中 Accept-Charset: 项的内容,
        如果存在的话。例如："iso-8859-1,*,utf-8"。
      $_SERVER['HTTP_HOST']  当前请求头中 Host: 项的内容,如果存在的话。
      $_SERVER['HTTP_REFERER']  引导用户代理到当前页的前一页的地址（如果存在）。
        由 user agent 设置决定。
        并不是所有的用户代理都会设置该项,
        有的还提供了修改 HTTP_REFERER 的功能。
        简言之,该值并不可信
      $_SERVER['HTTPS']   如果脚本是通过 HTTPS 协议被访问,则被设为一个非空的值。
      $_SERVER['REMOTE_ADDR']  浏览当前页面的用户的 IP 地址。
      $_SERVER['REMOTE_HOST']  浏览当前页面的用户的主机名。
        DNS 反向解析不依赖于用户的 REMOTE_ADDR。
      $_SERVER['REMOTE_PORT']  用户机器上连接到 Web 服务器所使用的端口号。
      $_SERVER['SCRIPT_FILENAME']  当前执行脚本的绝对路径。
      $_SERVER['SERVER_ADMIN'] Apache 服务器配置文件中的 SERVER_ADMIN 参数。
        如果脚本运行在一个虚拟主机上,则该值是那个虚拟主机的值。
        如：someone@runoob.com
      $_SERVER['SERVER_PORT']    Web 服务器使用的端口。默认值为 "80"。
        如果使用 SSL 安全连接,则这个值为用户设置的 HTTP 端口。
      $_SERVER['SERVER_SIGNATURE']  包含了服务器版本和虚拟主机名的字符串。
      $_SERVER['PATH_TRANSLATED']  当前脚本所在文件系统（非文档根目录）的基本路径。
        这是在服务器进行虚拟到真实路径的映像后的结果。
      $_SERVER['SCRIPT_NAME']  包含当前脚本的路径。
        这在页面需要指向自己时非常有用。
        __FILE__ 常量包含当前脚本(例如包含文件)的完整路径和文件名。
      $_SERVER['SCRIPT_URI']  URI 用来指定要访问的页面
        如 "/index.html"。
    $_REQUEST: 用于收集HTML表单提交的数据
      以下实例显示了一个输入字段（input）及提交按钮(submit)的表单(form)。
      当用户通过点击 "Submit" 按钮提交表单数据时, 
      表单数据将发送至<form>标签中 action 属性中指定的脚本文件。 
      在这个实例中,我们指定文件来处理表单数据。
      如果你希望其他的PHP文件来处理该数据,你可以修改该指定的脚本文件名。 
      然后,我们可以使用超级全局变量 $_REQUEST 来收集表单中的 input 字段数据:
      <html>
      <body>
        <form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
          Name: <input type="text" name="fname">
          <input type="submit">
        </form>
        <?php 
        $name = $_REQUEST['fname']; 
        echo $name; 
        ?>
      </body>
      </html>
    $_POST: 应用于收集表单数据
      PS：在HTML form标签的指定该属性："method="post"。
      在这个实例中,我们指定文件来处理表单数据。
      如果你希望其他的PHP文件来处理该数据,你可以修改该指定的脚本文件名。 
      然后,我们可以使用超级全局变量 $_POST 来收集表单中的 input 字段数据:
      <html>
      <body>
        <form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
          Name: <input type="text" name="fname">
          <input type="submit">
        </form>
        <?php 
        $name = $_POST['fname']; 
        echo $name; 
        ?>
      </body>
      </html>
    $_GET: 应用于收集表单数据
      PS：在HTML form标签的指定该属性："method="get"。
      $_GET 也可以收集URL中发送的数据。
      假定我们有一个包含参数的超链接HTML页面：
      <html>
      <body>
        <a href="test_get.php?subject=PHP&web=runoob.com">Test $GET</a>
      </body>
      </html>
      当用户点击链接 "Test $GET", 参数 "subject" 和 "web" 将发送至"test_get.php",
      你可以在 "test_get.php" 文件中使用 $_GET 变量来获取这些数据。
      以下实例显示了 "test_get.php" 文件的代码:
      <html>
      <body>
        <?php 
        echo "Study " . $_GET['subject'] . " at " . $_GET['web'];
        ?>
      </body>
      </html>    
    $_FILES
    $_ENV
    $_COOKIE
    $_SESSION
  魔术变量 
    PS：PHP提供了大量的预定义常量
      不过很多常量都是由不同的扩展库定义的,只有在加载了这些扩展库时才会出现,
      或者动态加载后,或者在编译时已经包括进去了;
      有八个魔术常量它们的值随着它们在代码中的位置改变而改变。
      这些特殊的常量不区分大小写;
    __LINE__: 文件中的当前行号
      其值依赖于它在脚本中所处的行来决定;
      e.g.:
        <?php
        echo '这是第 " '  . __LINE__ . ' " 行'; // 这是第 " 9 " 行
        ?>
    __FILE__: 文件的完整路径和文件名
      PS：如果用在被包含文件中,则返回被包含的文件名。
        自 PHP 4.0.2 起,__FILE__ 总是包含一个绝对路径,
        如果是符号连接,则是解析后的绝对路径,
        而在此之前的版本有时会包含一个相对路径;
      e.g.:
        <?php
        echo '该文件位于 " '  . __FILE__ . ' " ';
        // 该文件位于 " E:\project\test\one.php "
        ?>
    __DIR__: 文件所在的目录 
      PS：如果用在被包括文件中,则返回被包括的文件所在的目录。
        它等价于 dirname(__FILE__)。
        除非是根目录,否则目录中名不包括末尾的斜杠。[PHP 5.3.0中新增]
      e.g.:
        <?php
        echo '该文件位于 " '  . __DIR__ . ' " ';
        // 该文件位于 " E:\project\test "
        ?>
    __FUNCTION__:  函数名称  [PHP 4.3.0 新加]
      PS：自 PHP 5 起本常量返回该函数被定义时的名字,区分大小写,
        在 PHP 4 中该值总是小写字母的。
      e.g.:
        <?php
        function test() {
          echo  '函数名为：' . __FUNCTION__ ;
        }
        test(); // 函数名为：test
        ?>
    __CLASS__: 类的名称      [PHP 4.3.0 新增] 
      PS：自 PHP 5 起本常量返回该类被定义时的名字,区分大小写;
        在 PHP 4 中该值总是小写字母的,
        类名包括其被声明的作用区域（例如 Foo\Bar）,
        注意自 PHP 5.4 起 __CLASS__ 对 trait 也起作用。
        当用在 trait 方法中时,__CLASS__ 是调用 trait 方法的类的名字。
      e.g.:
        <?php
        class test {
          function _print() {
            echo '类名为：'  . __CLASS__ . "<br>";
            echo  '函数名为：' . __FUNCTION__ ;
          }
        }
        $t = new test();
        $t->_print();
        ?>
        输出结果为：
        类名为：test
        函数名为：_print
    __TRAIT__:  Trait 的名字 [PHP 5.4.0 新增]
      PS：自 PHP 5.4.0 起,PHP 实现了代码复用的一个方法,称为 traits。
        Trait 名包括其被声明的作用区域（例如 Foo\Bar）。
        从基类继承的成员被插入的 SayWorld Trait 中的 MyHelloWorld 方法所覆盖。
        其行为 MyHelloWorld 类中定义的方法一致。
        优先顺序是当前类中的方法会覆盖 trait 方法,而 trait 方法又覆盖了基类中的方法。
      e.g.:
        <?php
        class Base {
          public function sayHello() {
            echo 'Hello ';
          }
        }
        
        trait SayWorld {
          public function sayHello() {
            parent::sayHello();
            echo 'World!';
          }
        }
        
        class MyHelloWorld extends Base {
          use SayWorld;
        }
        
        $o = new MyHelloWorld();
        $o->sayHello();
        ?>
        输出： Hello World!
    __METHOD__: 类的方法名   [PHP 5.0.0 新加] 
      PS：返回该方法被定义时的名字,区分大小写
      e.g.:
        <?php
        function test() {
          echo  '函数名为：' . __METHOD__ ;
        }
        test(); // 函数名为：test
        ?>
    __NAMESPACE__: 当前命名空间的名称,区分大小写 [PHP 5.3.0 新增]
      PS：此常量是在编译时定义的
      e.g.:
        <?php
        namespace MyProject;
        echo '命名空间为："', __NAMESPACE__, '"'; 
        // 命名空间为："MyProject"
        ?>
OOP,Object-oriented_programming 面向对象 
  对象是一个由信息及对信息进行处理的描述所组成的整体,是对现实世界的抽象。
  对象的主要三个特性：
    对象的表示：对象的表示就相当于身份证,具体区分在相同的行为与状态下有什么不同。
    对象的形态：当施加那些方法是对象如何响应,颜色,尺寸,外型。
    对象的行为：可以对 对象施加那些操作,开灯,关灯就是行为。
  面向对象内容
    类:   定义了一件事物的抽象特点。类的定义包含了数据的形式以及对数据的操作
    对象: 类的实例
    成员变量: 定义在类内部的变量。
      该变量的值对外是不可见的,但是可以通过成员函数访问,
      在类被实例化为对象后,该变量即可称为对象的属性。
    成员函数: 定义在类的内部,可用于访问对象的数据。
    继承:  子类自动共享父类数据结构和方法的机制,类之间的一种关系。
      在定义和实现一个类的时候,可以在一个已经存在的类的基础之上来进行,
      把这个已经存在的类所定义的内容作为自己的内容,并加入若干新的内容。
    父类:  一个类被其他类继承,可将该类称为父类,或基类,或超类。
    子类:  一个类继承其他类称为子类,也可称为派生类。
    多态:  相同的操作或函数、过程可作用于多种类型的对象上并获得不同的结果。
      不同的对象,收到同一消息可以产生不同的结果,这种现象称为多态性。
    重载:  简单说,就是函数或者方法有同样的名称,但是参数列表不相同的情形,
      这样的同名不同参数的函数或者方法之间,互相称之为重载函数或者方法。
    抽象性: 将具有一致的数据结构（属性）和行为（操作）的对象抽象成类。
      一个类就是这样一种抽象,它反映了与应用有关的重要性质,而忽略其他一些无关内容。
      任何类的划分都是主观的,但必须与具体的应用有关。
    封装: 将某个客体的属性与行为绑定在一起,并放置在一个逻辑单元内。
    构造函数: 主要在创建对象时初始化对象,即为对象成员变量赋初始值,
      总与new运算符一起使用在创建对象的语句中。
    析构函数: 析构函数(destructor) 与构造函数相反,
      当对象结束其生命周期时（例如对象所在的函数已调用完毕）,系统自动执行析构函数。
      析构函数往往用来做"清理善后" 的工作,
      例如在建立对象时用new开辟了一片内存空间,应在退出前在析构函数中用delete释放
    e.g.:
      通过 Car 类 创建了三个对象：Mercedes, Bmw, 和 Audi。
      $mercedes = new Car ();
      $bmw = new Car ();
      $audi = new Car ();
  class 关键字 定义类
    语法规则
      类使用 class 关键字后加上类名定义。
      类名后的一对大括号({})内可以定义变量和方法。
      类的变量使用 var 来声明, 变量也可以初始化值。
      函数定义类似 PHP 函数的定义,但函数只能通过该类及其实例化的对象访问。
    e.g.:
      <?php
      class Site {
        /* 成员变量 */
        var $url;
        var $title;
        /* 成员函数 */
        function setUrl($par){ $this->url = $par; }
        function getUrl(){ echo $this->url . PHP_EOL; }
        function setTitle($par){ $this->title = $par; }
        function getTitle(){ echo $this->title . PHP_EOL; }
      }
      ?>
  类创建后,使用 new 运算符来实例化该类的对象：
  $this 代表自身的对象
  -> 访问成员方法与成员变量
    调用成员方法 ->
      实例化对象后,可以使用该对象调用成员方法,
      该对象的成员方法只能操作该对象的成员变量：
      e.g.:
        <?php 
        class Site { 
          /* 成员变量 */ 
          var $url; 
          var $title; 
          /* 成员函数 */ 
          function setUrl($par){ $this->url = $par; } 
          function getUrl(){ echo $this->url . PHP_EOL; } 
          function setTitle($par){ $this->title = $par; }
          function getTitle(){ echo $this->title . PHP_EOL; } 
        } 
      
        $runoob = new Site; 
        $taobao = new Site; 
        $google = new Site; 
        
        // 调用成员函数,设置标题和URL 
        $runoob->setTitle( "菜鸟教程" ); 
        $taobao->setTitle( "淘宝" ); 
        $google->setTitle( "Google 搜索" ); 
        
        $runoob->setUrl( 'www.runoob.com' ); 
        $taobao->setUrl( 'www.taobao.com' ); 
        $google->setUrl( 'www.google.com' ); 
        
        // 调用成员函数,获取标题和URL 
        $runoob->getTitle(); 
        // 菜鸟教程
        $taobao->getTitle(); 
        // 淘宝
        $google->getTitle(); 
        // Google 搜索
        
        $runoob->getUrl(); 
        // www.runoob.com
        $taobao->getUrl(); 
        // www.taobao.com
        $google->getUrl(); 
        // www.google.com
        ?>
  __construct 构造函数: 类中一种特殊的方法
    PS：主要用来在创建对象时初始化对象
      即为对象成员变量赋初始值,总与new运算符一起使用在创建对象的语句中。
      PHP 5 允行开发者在一个类中定义一个方法作为构造函数;
    self: 构造函数就是在由类生成对象时,会自动执行的方法
    语法格式： function __construct(){}
      在上面的例子中我们就可以通过构造方法来初始化 $url 和 $title 变量：
      function __construct( $par1, $par2 ) {
        $this->url = $par1;
        $this->title = $par2;
      }
    e.g.:
      $runoob = new Site('www.runoob.com', '菜鸟教程'); 
      $taobao = new Site('www.taobao.com', '淘宝'); 
      $google = new Site('www.google.com', 'Google 搜索'); 
    
      // 调用成员函数,获取标题和URL 
      $runoob->getTitle(); 
      $taobao->getTitle(); 
      $google->getTitle(); 
      
      $runoob->getUrl(); 
      $taobao->getUrl(); 
      $google->getUrl();
  __destruct 析构函数
    PS：析构函数(destructor) 与构造函数相反,
      当对象结束其生命周期时,例如对象所在的函数已调用完毕,系统自动执行析构函数。
      PHP 5 引入了析构函数的概念,这类似于其它面向对象的语言;
    function __destruct() {  }
    e.g.:
      <?php
      class MyDestructableClass {
        function __construct() {
          print "构造函数\n";
          $this->name = "MyDestructableClass";
        }
        function __destruct() { print "销毁 " . $this->name . "\n"; }
      }
      
      $obj = new MyDestructableClass();
      // 构造函数
      // 销毁 MyDestructableClass
      ?>
  extends 继承
    PS：使用关键字 extends 来继承一个类,PHP 不支持多继承
    格式： class Child extends Parent { /* 代码部分 */ }
    e.g.:
      Child_Site 类继承了 Site 类,并扩展了功能：
      <?php 
      // 子类扩展站点类别
      class Child_Site extends Site {
         var $category;
      	function setCate($par){ $this->category = $par; }
      	function getCate(){ echo $this->category . PHP_EOL; }
      }
  方法重写
    PS：如果从父类继承的方法不能满足子类的需求,可以对其进行改写,
      这个过程叫方法的覆盖（override）,也称为方法的重写。
    e.g.:
      function getUrl() {
        echo $this->url . PHP_EOL;
        return $this->url;
      }
      
      function getTitle(){
        echo $this->title . PHP_EOL;
        return $this->title;
      }
      实例中重写了 getUrl 与 getTitle 方法：
  public protected private 访问控制
    PS：通过在属性或方法前添加关键字 public,protected 或 private 来实现.
    public   : 公有的类成员,可以在任何地方被访问。
    protected: 受保护的类成员,可以被其自身以及其子类和父类访问。
    private  : 私有的类成员,只能被其定义所在的类访问。
    属性的访问控制
      类属性必须定义为公有,受保护,私有之一。
      如果用 var 定义,则被视为公有。
      <?php
      /* * Define MyClass */
      class MyClass {
        public $public = 'Public';
        protected $protected = 'Protected';
        private $private = 'Private';
        function printHello() {
          echo $this->public;
          echo $this->protected;
          echo $this->private;
        }
      }
      $obj = new MyClass();
      echo $obj->public; // 这行能被正常执行
      echo $obj->protected; // 这行会产生一个致命错误
      echo $obj->private; // 这行也会产生一个致命错误
      $obj->printHello(); // 输出 Public、Protected 和 Private
      
      /** * Define MyClass2 */
      class MyClass2 extends MyClass {
        // 可以对 public 和 protected 进行重定义,但 private 而不能
        protected $protected = 'Protected2';
        function printHello() {
          echo $this->public;
          echo $this->protected;
          echo $this->private;
        }
      }
      $obj2 = new MyClass2();
      echo $obj2->public; // 这行能被正常执行
      echo $obj2->private; // 未定义 private
      echo $obj2->protected; // 这行会产生一个致命错误
      $obj2->printHello(); // 输出 Public、Protected2 和 Undefined
      ?>
    方法的访问控制
      类中的方法可以被定义为公有,私有或受保护。
      如果没有设置这些关键字,则该方法默认为公有。
      <?php
      /** * Define MyClass */
      class MyClass {
        public function __construct() { }    // 声明一个公有的构造函数
        public function MyPublic() { }       // 声明一个公有的方法
        protected function MyProtected() { } // 声明一个受保护的方法
        private function MyPrivate() { }     // 声明一个私有的方法
        
        function Foo() { // 此方法为公有
          $this->MyPublic();
          $this->MyProtected();
          $this->MyPrivate();
        }
      }
      $myclass = new MyClass;
      $myclass->MyPublic();    // 这行能被正常执行
      $myclass->MyProtected(); // 这行会产生一个致命错误
      $myclass->MyPrivate();   // 这行会产生一个致命错误
      $myclass->Foo();         // 公有,受保护,私有都可以执行
      /** * Define MyClass2 */
      class MyClass2 extends MyClass {
        function Foo2() {  // 此方法为公有
          $this->MyPublic();
          $this->MyProtected();
          $this->MyPrivate(); // 这行会产生一个致命错误
        }
      }
      $myclass2 = new MyClass2;
      $myclass2->MyPublic(); // 这行能被正常执行
      $myclass2->Foo2();     // 公有的和受保护的都可执行,但私有的不行
      
      class Bar {
        public function test() {
          $this->testPrivate();
          $this->testPublic();
        }
        public function testPublic() { echo "Bar::testPublic\n"; }
        private function testPrivate() { echo "Bar::testPrivate\n"; }
      }
      class Foo extends Bar {
        public function testPublic() { echo "Foo::testPublic\n"; }
        private function testPrivate() { echo "Foo::testPrivate\n"; }
      }
      $myFoo = new foo();
      $myFoo->test(); // Bar::testPrivate 
      // Foo::testPublic
      ?>
  interface implements 接口
    通过 interface 关键字来定义接口,但其中定义所有的方法都是空的。
      接口中定义的所有方法都必须是公有,这是接口的特性。
      使用接口,可以指定某个类必须实现哪些方法,
      但不需要定义这些方法的具体内容,
    使用 implements 操作符,实现一个接口,
      类中必须实现接口中定义的所有方法,否则会报一个致命错误。
      类可以实现多个接口,用逗号来分隔多个接口的名称。
    <?php
    interface iTemplate { // 声明一个'iTemplate'接口
      public function setVariable($name, $var);
      public function getHtml($template);
    }
    
    class Template implements iTemplate { // 实现接口
      private $vars = array();
      public function setVariable($name, $var) { $this->vars[$name] = $var; }
      public function getHtml($template) {
        foreach($this->vars as $name => $value) {
          $template = str_replace('{' . $name . '}', $value, $template);
        }
        return $template;
      }
    }
    ?>
  const 常量
    可以把在类中始终保持不变的值定义为常量。
    在定义和使用常量的时候不需要使用 $ 符号。
    常量的值必须是一个定值,不能是变量,类属性,数学运算的结果或函数调用。
    自 PHP 5.3.0 起,可以用一个变量来动态调用类。
    但该变量的值不能为关键字（如 self,parent 或 static）。
    <?php
    class MyClass {
      const constant = '常量值';
      function showConstant() { echo  self::constant . PHP_EOL; }
    }
    echo MyClass::constant . PHP_EOL;
    
    $classname = "MyClass";
    echo $classname::constant . PHP_EOL;  // 自 5.3.0 起
    
    $class = new MyClass();
    $class->showConstant();
    echo $class::constant . PHP_EOL;     // 自 PHP 5.3.0 起
    ?>
  abstract 抽象类
    若一个类中有方法是被声明为抽象的,那么这个类就必须被声明为抽象的。
    定义为抽象的类不能被实例化。
    被定义为抽象的方法只是声明了其调用方式（参数）,不能定义其具体的功能实现。
    继承一个抽象类的时候,子类必须定义父类中的所有抽象方法；
    另外,这些方法的访问控制必须和父类中一样（或者更为宽松）。
    例如某个抽象方法被声明为受保护的,
    那么子类中实现的方法就应该声明为受保护的或者公有的,而不能定义为私有的。
    此外方法的调用方式必须匹配,即类型和所需参数数量必须一致。
    例如,子类定义了一个可选参数,而父类抽象方法的声明里没有,则两者的声明并无冲突。
    <?php
    abstract class AbstractClass {
      // 强制要求子类定义这些方法
      abstract protected function getValue();
      abstract protected function prefixValue($prefix);
      // 普通方法（非抽象方法）
      public function printOut() { print $this->getValue() . PHP_EOL; }
    }
    
    class ConcreteClass1 extends AbstractClass {
      protected function getValue() { return "ConcreteClass1"; }
      public function prefixValue($prefix) { return "{$prefix}ConcreteClass1"; }
    }
    class ConcreteClass2 extends AbstractClass {
      public function getValue() { return "ConcreteClass2"; }       
      public function prefixValue($prefix) { return "{$prefix}ConcreteClass2"; }
    }
    
    $class1 = new ConcreteClass1;
    $class1->printOut(); // ConcreteClass1
    echo $class1->prefixValue('FOO_') . PHP_EOL; // FOO_ConcreteClass1
    $class2 = new ConcreteClass2;
    $class2->printOut(); // ConcreteClass2
    echo $class2->prefixValue('FOO_') . PHP_EOL; // FOO_ConcreteClass2
    ?>
  static 关键字
    声明类属性或方法为 static(静态),就可以不实例化类而直接访问
    静态属性不能通过一个类已实例化的对象来访问,但静态方法可以
    由于静态方法不需要通过对象即可调用,所以伪变量 $this 在静态方法中不可用
    静态属性不可以由对象通过 -> 操作符来访问
    自 PHP 5.3.0 起,可以用一个变量来动态调用类。
    但该变量的值不能为关键字 self,parent 或 static
    <?php
    class Foo {
      public static $my_static = 'foo';
      public function staticValue() { return self::$my_static; }
    }
    print Foo::$my_static . PHP_EOL; // foo
    $foo = new Foo();
    print $foo->staticValue() . PHP_EOL; // foo
    ?>	
  final 关键字 [PHP5新增]
    如果父类中的方法被声明为 final,则子类无法覆盖该方法。
    如果一个类被声明为 final,则不能被继承。
    e.g.:
      以下代码执行会报错：
      <?php
      class BaseClass {
        public function test() { echo "BaseClass::test() called" . PHP_EOL; }
        
        final public function moreTesting() {
          echo "BaseClass::moreTesting() called"  . PHP_EOL;
        }
      }
      
      class ChildClass extends BaseClass {
        public function moreTesting() {
          echo "ChildClass::moreTesting() called"  . PHP_EOL;
        }
      }
      // 报错信息 Fatal error: Cannot override final method BaseClass::moreTesting()
      ?>
  parent::__construct() 调用父类构造方法
    PHP 不会在子类的构造方法中自动的调用父类的构造方法。
    要执行父类的构造方法,需要在子类的构造方法中调用 parent::__construct()
    <?php
    class BaseClass {
      function __construct() { print "BaseClass 类中构造方法" . "<br>"; }
    }
    class SubClass extends BaseClass {
      function __construct() {
        parent::__construct();  // 子类构造方法不能自动调用父类的构造方法
        print "SubClass 类中构造方法" . "<br>";
      }
    }
    // 继承 BaseClass 的构造方法
    class OtherSubClass extends BaseClass { }
    
    // 调用 BaseClass 构造方法
    $obj = new BaseClass();
    // BaseClass 类中构造方法
    
    // 调用 BaseClass、SubClass 构造方法
    $obj = new SubClass();
    // BaseClass 类中构造方法
    // SubClass 类中构造方法
    
    // 调用 BaseClass 构造方法
    $obj = new OtherSubClass();
    // BaseClass 类中构造方法
    ?>
运算符 
  .   并置运算符,用于把两个字符串值连接起来
    PHP 中,只有一个字符串运算符
    e.g.:
      <?php 
      $txt1 = "aa"; 
      $txt2 = "bb!"; 
      echo $txt1 . " " . $txt2;  // aa bb!
      ?>
  .=  连接赋值
    a .= b 等价于 a = a . b 连接两个字符串
  !=  不等于
    5 != 8 ; //  true
  <>  不等于
    5 <> 8 ; // true
  !== 不恒等于
    x !== y  如果 x 不等于 y,或它们类型不相同,则返回 true
    5!=="5" 返回 true
  ◆逻辑运算
    and 与
    &&  与
    or  或
    ||  或
    !   非
    xor 异或
  ◆数组运算符
    +     集合
    ==    相等  
      具有相同的键/值对,则返回 true
    ===   恒等  
      具有相同的键/值对,且顺序相同类型相同,则返回 true
    !=    不相等
    <>    不相等
    !== y 不恒等
  <=> 组合比较符 [PHP7+]
    大于 返回1;等于 返回0;小于 返回-1;
    <?php
    // 整型
    echo 1 <=> 1; // 0
    echo 1 <=> 2; // -1
    echo 2 <=> 1; // 1
    
    // 浮点型
    echo 1.5 <=> 1.5; // 0
    echo 1.5 <=> 2.5; // -1
    echo 2.5 <=> 1.5; // 1
     
    // 字符串
    echo "a" <=> "a"; // 0
    echo "a" <=> "b"; // -1
    echo "b" <=> "a"; // 1
    ?>  
  intdiv()  整除  [PHP7+]
    e.g.:
      <?php
      var_dump(intdiv(10, 3)); // int(3)
      ?>
语句 
  PS：语句间使用分号;分割,且不可省略
  echo val1[,val2 ...]; 文本输出
    echo 语言结构,使用的时可不加括号,也可以加上： echo 或 echo()
    当输入未定义的变量时,不会报错但有提示,默认以字符串形式输出
    e.g.:
      使用 echo 命令输出字符串「可包含 HTML 标签」：
      <?php
      echo "<h2>PHP 很有趣!</h2>";
      echo "Hello world!<br>";
      echo "我要学 PHP!<br>";
      echo "这是一个", "字符串,", "使用了", "多个", "参数。";
      echo 2*3;
      ?>
  print val; 文本输出 
    print 语言结构,可以使用括号或不使用, print 或 print()。
  echo 和 print 异同 
    都可浏览器输出文本
    echo  可以输出一个或多个字符串,输出的速度比 print 快,没有返回值
    print 只允许输出一个字符串,返回值总为 1
  foreach: 根据数组中每个元素来循环代码块 
    foreach ($array as $value) {
      <!-- 要执行代码; -->
    }
    e.g.:
      <html>
      <body>
        <?php
        $x = array("one","two","three");
        foreach ($x as $value) {
          echo $value . "<br>";
        }
        ?>
      </body>
      </html>
      输出：
      // one
      // two
      // three
函数 
  PS： PHP的真正威力源自于它的函数
    PHP提供了超过 1000 个内建的函数
    页面加载时执行脚本可以放到函数里。
  创建函数
    函数的名称应该提示出它的功能, 函数名称以字母或下划线开头,不能以数字开头
    function functionName() { }
    e.g.:
      <html>
      <body>
      
      <?php
      function writeName() { echo "Kai Jim Refsnes"; }
      echo "My name is ";
      writeName();
      // My name is Kai Jim Refsnes
      ?>
      
      </body>
      </html>
  函数参数
    PS：添加参数可以给函数添加更多的功能;参数类似变量。
      参数就在函数名称后面有一个括号内指定
    e.g.:
      <html>
      <body>
      
      <?php
      function writeName($fname) { echo $fname . " Refsnes.<br>"; }
      
      echo "My name is ";
      writeName("Kai Jim");
      // My name is Kai Jim Refsnes.
      echo "My sister's name is ";
      writeName("Hege");
      // My sister's name is Hege Refsnes.
      echo "My brother's name is ";
      writeName("Stale");
      // My brother's name is Stale Refsnes.
      ?>
      
      </body>
      </html>
      输出：
  函数返回值
    使用 return 语句让函数返回一个值
    <html>
    <body>
    <?php
    function add($x,$y) {
      $total = $x + $y;
      return $total;
    }
    echo "1 + 16 = " . add(1,16);
    // 1 + 16 = 17      
    ?>
    </body>
    </html>
规定字符 
  PHP_EOL 换行符
    e.g.:
      <?php
      echo '<div >1' . PHP_EOL . '1</div>' ;
      ?>
      在浏览器中显示为 1 1
      在HTML中为 
        <div>1
        1</div>
命名空间     [PHP 5.3新增] 
  PS： 所有非 PHP 代码包括空白符都不能出现在命名空间的声明之前
  作用:决解命名冲突; 为(很长的)标识符名称创建一个(简短)别名的名称; 提高源代码的可读性;
  namespace  定义命名空间
    PS：如果一个文件中包含命名空间,它必须在其它所有代码之前声明命名空间
      命名空间通过关键字 namespace 来声明
      默认的,所有常量、类和函数名都放在全局空间下,就和PHP支持命名空间之前一样。
    <?php  
    // 定义代码在 'MyProject' 命名空间中  
    namespace MyProject;  
    // ... 代码 ...  
    
    // 另一种语法风格
    namespace MyProject3 {  /* MyProject3 命名空间中的PHP代码  */ }  
    ?>
    在声明命名空间之前唯一合法的代码是用于定义源文件编码方式的 declare 语句
      <?php
      declare(encoding='UTF-8'); //定义多个命名空间和不包含在命名空间中的代码
      namespace MyProject {
        const CONNECT_OK = 1;
        class Connection { }
        function connect() {  }
      }
      namespace { // 全局代码
        session_start();
        $a = MyProject\connect();
        echo MyProject\Connection::start();
      }
      ?>
    在同一个文件中定义不同的命名空间
      <?php  
      namespace MyProject1;  
      // MyProject1 命名空间中的PHP代码  
       
      namespace MyProject2;  
      // MyProject2 命名空间中的PHP代码    
       
      // 另一种语法
      namespace MyProject3 {  /* MyProject3 命名空间中的PHP代码  */ }  
      ?>  
    命名空间之前出现其他代码导致语法错误
      <html>
      <?php
      namespace MyProject;
      // 命名空间前出现了“<html>” 会致命错误 -　命名空间必须是程序脚本的第一条语句
      ?>
  \ 子命名空间
    PS：与目录和文件的关系很象,PHP 命名空间也允许指定层次化的命名空间的名称。
      因此,命名空间的名字可以使用分层次的方式定义：
    e.g.:
      <?php
      namespace MyProject\Sub\Level;  //声明分层次的单个命名空间
      const CONNECT_OK = 1;
      class Connection {  }
      function Connect() {  }
      ?>
      上面的例子创建了常量 MyProject\Sub\Level\CONNECT_OK,
      类 MyProject\Sub\Level\Connection 
      和函数 MyProject\Sub\Level\Connect。
  命名空间使用
    命名空间中的类名的三种方式引用:
    非限定名称,或不包含前缀的名称
      如果当前命名空间是 currentnamespace,foo 将被解析为 currentnamespace\foo。
      如果使用 foo 的代码是全局的,且不包含在任何命名空间中,则 foo 会被解析为foo
    限定名称,或包含前缀的名称
      例如 $a = new subnamespace\foo(); 或 subnamespace\foo::staticmethod();
      如果当前的命名空间是 currentnamespace,
        则 foo 会被解析为 currentnamespace\subnamespace\foo。
      如果使用 foo 的代码是全局的,不包含在任何命名空间中的代码,
        foo 会被解析为subnamespace\foo。
    完全限定名称,或包含了全局前缀操作符的名称,
      例如, $a = new \currentnamespace\foo();
      或 \currentnamespace\foo::staticmethod();。
      在这种情况下,foo 总是被解析为代码中的文字名(literal name)currentnamespace\foo。
    e.g.:
      file1.php 文件代码
        <?php
        namespace Foo\Bar\subnamespace; 
        const FOO = 1;
        function foo() {}
        class foo { static function staticmethod() {} }
        ?>
      file2.php 文件代码
        <?php
        namespace Foo\Bar;
        include 'file1.php';
        const FOO = 2;
        function foo() {}
        class foo {
          static function staticmethod() {}
        }
        
      /* 非限定名称 */
      foo(); // 解析为 Foo\Bar\foo resolves to function Foo\Bar\foo
      foo::staticmethod(); 
      // 解析为类 Foo\Bar\foo的静态方法staticmethod。resolves to class Foo\Bar\foo, method staticmethod
      echo FOO; // resolves to constant Foo\Bar\FOO
  
      /* 限定名称 */
      subnamespace\foo(); // 解析为函数 Foo\Bar\subnamespace\foo
      subnamespace\foo::staticmethod(); // 解析为类 Foo\Bar\subnamespace\foo,
                                        // 以及类的方法 staticmethod
      echo subnamespace\FOO; // 解析为常量 Foo\Bar\subnamespace\FOO
                                        
      /* 完全限定名称 */
      \Foo\Bar\foo(); // 解析为函数 Foo\Bar\foo
      \Foo\Bar\foo::staticmethod(); // 解析为类 Foo\Bar\foo, 以及类的方法 staticmethod
      echo \Foo\Bar\FOO; // 解析为常量 Foo\Bar\FOO
      ?>
    注意访问任意全局类、函数或常量,都可以使用完全限定名称
      例如 \strlen() 或 \Exception 或 \INI_ALL。
    在命名空间内部访问全局类、函数和常量：
      <?php
      namespace Foo;
      function strlen() {}
      const INI_ALL = 3;
      class Exception {}
      
      $a = \strlen('hi'); // 调用全局函数strlen
      $b = \INI_ALL; // 访问全局常量 INI_ALL
      $c = new \Exception('error'); // 实例化全局类 Exception
      ?>
    命名空间和动态语言特征
      命名空间的实现受到其语言自身的动态特征的影响。
      e.g.:
        因此,如果要将下面的代码转换到命名空间中,动态访问元素。
        必须使用完全限定名称（包括命名空间前缀的类名称）。
        注意因为在动态的类名称、函数名称或常量名称中,
        限定名称和完全限定名称没有区别,因此其前导的反斜杠是不必要的。
        example1.php 文件代码：
        <?php
        class classname {
          function __construct() { echo __METHOD__,"\n"; }
        }
        function funcname() { echo __FUNCTION__,"\n"; }
        const constname = "global";
        
        $a = 'classname';
        $obj = new $a; // prints classname::__construct
        $b = 'funcname';
        $b(); // prints funcname
        echo constant('constname'), "\n"; // prints global
        ?>
    动态访问命名空间的元素
      <?php
      namespace namespacename;
      class classname {
        function __construct() { echo __METHOD__,"\n"; }
      }
      function funcname() { echo __FUNCTION__,"\n"; }
      const constname = "namespaced";
      
      include 'example1.php';
      
      $a = 'classname';
      $obj = new $a; // prints classname::__construct
      $b = 'funcname';
      $b(); // prints funcname
      echo constant('constname'), "\n"; // prints global
      
      /* note that if using double quotes, "\\namespacename\\classname" must be used */
      $a = '\namespacename\classname';
      $obj = new $a; // prints namespacename\classname::__construct
      $a = 'namespacename\classname';
      $obj = new $a; // also prints namespacename\classname::__construct
      $b = 'namespacename\funcname';
      $b(); // prints namespacename\funcname
      $b = '\namespacename\funcname';
      $b(); // also prints namespacename\funcname
      echo constant('\namespacename\constname'), "\n"; // prints namespaced
      echo constant('namespacename\constname'), "\n"; // also prints namespaced
      ?>
  namespace 关键字 和 __NAMESPACE__ 魔术常量
    PS：两种抽象的访问当前命名空间内部元素的方法
    __NAMESPACE__ 常量 
      其值是包含当前命名空间名称的字符串。
      在全局的,不包括在任何命名空间中的代码,它包含一个空的字符串。
      e.g.:
        <?php
        namespace MyProject;
        echo '"', __NAMESPACE__, '"';  // 输出 "MyProject"
        ?>

        <?php
        echo '"', __NAMESPACE__, '"'; // 输出 ""
        ?>
      常量 __NAMESPACE__ 在动态创建名称时很有用
        使用__NAMESPACE__动态创建名称
          <?php
          namespace MyProject;
          
          function get($classname) {
            $a = __NAMESPACE__ . '\\' . $classname;
            return new $a;
          }
          ?>
    namespace 关键字  
      用来显式访问当前命名空间或子命名空间中的元素。等价于类中的 self 操作符。
      namespace操作符,命名空间中的代码
      <?php
      namespace MyProject;
      
      use blah\blah as mine; // see "Using namespaces: importing/aliasing"
      
      blah\mine(); // calls function blah\blah\mine()
      namespace\blah\mine(); // calls function MyProject\blah\mine()
      
      namespace\func(); // calls function MyProject\func()
      namespace\sub\func(); // calls function MyProject\sub\func()
      namespace\cname::method(); // calls static method "method" of class MyProject\cname
      $a = new namespace\sub\cname(); // instantiates object of class MyProject\sub\cname
      $b = namespace\CONSTANT; // assigns value of constant MyProject\CONSTANT to $b
      ?>
      namespace操作符, 全局代码
      <?php
      
      namespace\func(); // calls function func()
      namespace\sub\func(); // calls function sub\func()
      namespace\cname::method(); // calls static method "method" of class cname
      $a = new namespace\sub\cname(); // instantiates object of class sub\cname
      $b = namespace\CONSTANT; // assigns value of constant CONSTANT to $b
      ?>
      使用命名空间：别名/导入
        命名空间支持 有两种使用别名或导入方式：为类名称使用别名,或为命名空间名称使用别名
        注意PHP不支持导入函数或常量。
        在PHP中,别名是通过操作符 use 来实现的. 
        1、使用use操作符导入/使用别名
        <?php
        namespace foo;
        use My\Full\Classname as Another;
        
        // 下面的例子与 use My\Full\NSname as NSname 相同
        use My\Full\NSname;
        
        // 导入一个全局类
        use \ArrayObject;
        
        $obj = new namespace\Another; // 实例化 foo\Another 对象
        $obj = new Another; // 实例化 My\Full\Classname　对象
        NSname\subns\func(); // 调用函数 My\Full\NSname\subns\func
        $a = new ArrayObject(array(1)); // 实例化 ArrayObject 对象
        // 如果不使用 "use \ArrayObject" ,则实例化一个 foo\ArrayObject 对象
        ?>
        2、 一行中包含多个use语句
        <?php
        use My\Full\Classname as Another, My\Full\NSname;
        
        $obj = new Another; // 实例化 My\Full\Classname 对象
        NSname\subns\func(); // 调用函数 My\Full\NSname\subns\func
        ?>
        3、导入和动态名称
        导入操作是在编译执行的,但动态的类名称、函数名称或常量名称则不是。
        <?php
        use My\Full\Classname as Another, My\Full\NSname;
        
        $obj = new Another; // 实例化一个 My\Full\Classname 对象
        $a = 'Another';
        $obj = new $a;      // 实际化一个 Another 对象
        ?>
        4、导入和完全限定名称
        另外,导入操作只影响非限定名称和限定名称。完全限定名称由于是确定的,故不受导入的影响。
        <?php
        use My\Full\Classname as Another, My\Full\NSname;
        
        $obj = new Another; // instantiates object of class My\Full\Classname
        $obj = new \Another; // instantiates object of class Another
        $obj = new Another\thing; // instantiates object of class My\Full\Classname\thing
        $obj = new \Another\thing; // instantiates object of class Another\thing
        ?>
        使用命名空间：后备全局函数/常量
          在一个命名空间中,当 PHP 遇到一个非限定的类、函数或常量名称时,
          它使用不同的优先策略来解析该名称。类名称总是解析到当前命名空间中的名称。
          因此在访问系统内部或不包含在命名空间中的类名称时,必须使用完全限定名称,
          例如：
          1、在命名空间中访问全局类
          <?php
          namespace A\B\C;
          class Exception extends \Exception {}
          
          $a = new Exception('hi'); // $a 是类 A\B\C\Exception 的一个对象
          $b = new \Exception('hi'); // $b 是类 Exception 的一个对象
          
          $c = new ArrayObject; // 致命错误, 找不到 A\B\C\ArrayObject 类
          ?>
          对于函数和常量来说,如果当前命名空间中不存在该函数或常量,PHP 会退而使用全局空间中的函数或常量。
          2、 命名空间中后备的全局函数/常量
          <?php
          namespace A\B\C;
          
          const E_ERROR = 45;
          function strlen($str) {
            return \strlen($str) - 1;
          }
          
          echo E_ERROR, "\n"; // 输出 "45"
          echo INI_ALL, "\n"; // 输出 "7" - 使用全局常量 INI_ALL
          
          echo strlen('hi'), "\n"; // 输出 "1"
          if (is_array('hi')) { // 输出 "is not array"
            echo "is array\n";
          } else {
            echo "is not array\n";
          }
          ?>
  全局空间
    如果没有定义任何命名空间,所有的类与函数的定义都是在全局空间,
    与 PHP 引入命名空间概念前一样。
    在名称前加上前缀 \ 表示该名称是全局空间中的名称,
    即使该名称位于其它的命名空间中时也是如此。
    使用全局空间说明
    <?php
    namespace A\B\C;
    
    /* 这个函数是 A\B\C\fopen */
    function fopen() { 
      /* ... */
      $f = \fopen(...); // 调用全局的fopen函数
      return $f;
    } 
    ?>
  命名空间的顺序
    自从有了命名空间之后,最容易出错的该是使用类的时候,这个类的寻找路径是什么样的了。
    <?php
    namespace A;
    use B\D, C\E as F;
    // 函数调用
    foo();    // 首先尝试调用定义在命名空间"A"中的函数foo()
              // 再尝试调用全局函数 "foo"
    \foo();     // 调用全局空间函数 "foo" 
  
    my\foo();   // 调用定义在命名空间"A\my"中函数 "foo" 
  
    F();        // 首先尝试调用定义在命名空间"A"中的函数 "F" 
              // 再尝试调用全局函数 "F"
  
    // 类引用
    
    new B();    // 创建命名空间 "A" 中定义的类 "B" 的一个对象
                // 如果未找到,则尝试自动装载类 "A\B"
    
    new D();    // 使用导入规则,创建命名空间 "B" 中定义的类 "D" 的一个对象
                // 如果未找到,则尝试自动装载类 "B\D"
    
    new F();    // 使用导入规则,创建命名空间 "C" 中定义的类 "E" 的一个对象
                // 如果未找到,则尝试自动装载类 "C\E"
    
    new \B();   // 创建定义在全局空间中的类 "B" 的一个对象
                // 如果未发现,则尝试自动装载类 "B"
    
    new \D();   // 创建定义在全局空间中的类 "D" 的一个对象
                // 如果未发现,则尝试自动装载类 "D"
    
    new \F();   // 创建定义在全局空间中的类 "F" 的一个对象
                // 如果未发现,则尝试自动装载类 "F"
    
    // 调用另一个命名空间中的静态方法或命名空间函数
    
    B\foo();    // 调用命名空间 "A\B" 中函数 "foo"
    
    B::foo();   // 调用命名空间 "A" 中定义的类 "B" 的 "foo" 方法
                // 如果未找到类 "A\B" ,则尝试自动装载类 "A\B"
    
    D::foo();   // 使用导入规则,调用命名空间 "B" 中定义的类 "D" 的 "foo" 方法
                // 如果类 "B\D" 未找到,则尝试自动装载类 "B\D"
    
    \B\foo();   // 调用命名空间 "B" 中的函数 "foo" 
    
    \B::foo();  // 调用全局空间中的类 "B" 的 "foo" 方法
                // 如果类 "B" 未找到,则尝试自动装载类 "B"
    
    // 当前命名空间中的静态方法或函数
    
    A\B::foo();   // 调用命名空间 "A\A" 中定义的类 "B" 的 "foo" 方法
                  // 如果类 "A\A\B" 未找到,则尝试自动装载类 "A\A\B"
    
    \A\B::foo();  // 调用命名空间 "A\B" 中定义的类 "B" 的 "foo" 方法
                  // 如果类 "A\B" 未找到,则尝试自动装载类 "A\B"
    ?>
  名称解析遵循下列规则：
    对完全限定名称的函数,类和常量的调用在编译时解析。例如 new \A\B 解析为类 A\B。
    所有的非限定名称和限定名称（非完全限定名称）根据当前的导入规则在编译时进行转换。
      例如,如果命名空间 A\B\C 被导入为 C,
      那么对 C\D\e() 的调用就会被转换为 A\B\C\D\e()。
    在命名空间内部,所有的没有根据导入规则转换的限定名称均会在其前面加上当前的命名空间名称。
      例如,在命名空间 A\B 内部调用 C\D\e(),则 C\D\e() 会被转换为 A\B\C\D\e() 。
    非限定类名根据当前的导入规则在编译时转换（用全名代替短的导入名称）。
      例如,如果命名空间 A\B\C 导入为C,则 new C() 被转换为 new A\B\C() 。
    在命名空间内部（例如A\B）,对非限定名称的函数调用是在运行时解析的。
      例如对函数 foo() 的调用是这样解析的：
    在当前命名空间中查找名为 A\B\foo() 的函数
    尝试查找并调用 全局(global) 空间中的函数 foo()。
    在命名空间（例如A\B）内部对非限定名称或限定名称类（非完全限定名称）的调用是在运行时解析的。
      下面是调用 new C() 及 new D\E() 的解析过程： new C()的解析:
      在当前命名空间中查找A\B\C类。
      尝试自动装载类A\B\C。
      new D\E()的解析:
      在类名称前面加上当前命名空间名称变成：A\B\D\E,然后查找该类。
      尝试自动装载类 A\B\D\E。
      为了引用全局命名空间中的全局类,必须使用完全限定名称 new \C()。
--------------------------------------------------------------------------------  












--------------------------------------------------------------------------------
e.g.:
  员工查询和添加
  HTML 和 JS
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Title</title>
      </head>
      <body>
        //查询表单
        <h1>员工查询</h1>
          <label>请输入员工编号:</label>
          <input type="text">
          <button>查询</button>
        <h1>员工添加</h1>
          <label>请输入员工编号:</label>
          <input type="text">
          <label>请输入员工姓名:</label>
          <input type="text">
          <label>请选择员工性别:</label>
          <select>
            <option>男</option>
            <option>女</option>
          </select>
          <label>请输入员工职位:</label>
          <input type="text">
          <button>保存</button>
        <script type="text/javascript">
          document.getElementById("search").onclick=function(){
            var request=new XMLHttpRequest();
            //XHR对象的open方法：请求方法：get；请求地址：server.php,参数为输入的编号；
            request.open("GET","server.php?number="+document.getElementById("keyword").value);
            //监听request的状态的改变：readyState的改变：
            request.onreadystatechange=function () {
              if(request.readyState==4){//如果readyState为4即服务器响应已完成；
                if(request.status===200){ //如果request的状态码为200；
                  document.getElementById("searchResult").innerHTML=request.responseText;
                  //将查询结果显示；
                }
                else{ alert("发生错误"+request.status); }
              }
            }
            request.send();//发送请求
          }
          document.getElementById("save").onclick=function(){
            var add_staff=new XMLHttpRequest();//生成XHR对象；
            //XHR对象的open方法：请求方法：post；请求地址：server.php；
            add_staff.open("POST","server.php");
            //将填写的数据保存到data；     
            var data="number="+document.getElementById("staffnumber").value+
              "&name="+document.getElementById("staffname").value+
              "&sex="+document.getElementById("staffsex").value+
              "&job="+document.getElementById("staffjob").value;
            //设置请求头的content-type为获取表单信息；
            add_staff.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            //监听add_staff的状态的改变：readyState的改变：
            add_staff.onreadystatechange=function () {
              if(add_staff.readyState==4){
                if(add_staff.status===200){
                  //将响应内容显示出来：
                  document.getElementById("createResult").innerHTML=add_staff.responseText;
                }
                else{ alert("发生错误"+add_staff.status); }
              }
            }
            add_staff.send(data);//发送请求,post的参数为data；
          }
        </script>
      </body>
    </html>

  Server.php文件：
  <?php
    //设置页面内容是html编码格式是utf-8
    header("Content-Type: text/plain;charset=utf-8"); 
    //header("Content-Type: application/json;charset=utf-8"); 
    //header("Content-Type: text/xml;charset=utf-8"); 
    //header("Content-Type: text/html;charset=utf-8"); 
    //header("Content-Type: application/javascript;charset=utf-8"); 
    $staff = array ( //定义数组,包含员工的信息,每条员工信息为一个数组
      array("name" => "洪七", "number" => "101", "sex" => "男", "job" => "总经理"),
      array("name" => "郭靖", "number" => "102", "sex" => "男", "job" => "开发工程师"),
      array("name" => "黄蓉", "number" => "103", "sex" => "女", "job" => "产品经理") );
    //判断如果是get请求,则进行搜索；如果是POST请求,则进行新建
    //$_SERVER是一个超全局变量,在一个脚本的全部作用域中都可用,不用使用global关键字
    //$_SERVER["REQUEST_METHOD"] 返回访问页面使用的请求方法
    if ($_SERVER["REQUEST_METHOD"] == "GET") { search(); } 
    else if ($_SERVER["REQUEST_METHOD"] == "POST"){ create(); }
    //通过员工编号搜索员工
    function search(){
      //isset检测变量是否设置；empty判断值为否为空
      //超全局变量 $_GET 和 $_POST 用于收集表单数据
      if (!isset($_GET["number"]) || empty($_GET["number"])) {
        echo "参数错误";
        return;
      }
      //函数之外声明的变量拥有 Global 作用域,只能在函数以外进行访问。
      //global 关键词用于访问函数内的全局变量
      global $staff;
      //获取number参数
      $number = $_GET["number"];
      $result = "没有找到员工。";
      
      //遍历$staff多维数组,查找key值为number的员工是否存在,如果存在,则修改返回结果
      foreach ($staff as $value) {
        if ($value["number"] == $number) {
          $result = "找到员工：员工编号：" . $value["number"] . ",员工姓名：" . $value["name"] . 
          ",员工性别：" . $value["sex"] . ",员工职位：" . $value["job"];
          break;
        }
      }
      echo $result;
    }
    //创建员工
    function create(){
      parse_str(file_get_contents('php://input'), $_POST);//解决post拿不到内容;
      //判断信息是否填写完全
      if (!isset($_POST["name"]) || empty($_POST["name"])
        || !isset($_POST["number"]) || empty($_POST["number"])
        || !isset($_POST["sex"]) || empty($_POST["sex"])
        || !isset($_POST["job"]) || empty($_POST["job"])) {
        echo "参数错误,员工信息填写不全";
        return;
      }
      //TODO: 获取POST表单数据并保存到数据库
      echo "员工：" . $_POST["name"] . " 信息保存成功！"; //提示保存成功
    }
  ?>















