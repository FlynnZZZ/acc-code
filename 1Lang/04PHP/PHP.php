<?php 
介绍&说明&概念 
  PS: PHP,'Hypertext Preprocessor'超文本预处理器,名称来源'Personal_Home_Pages'  
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
  使用环境  
    一支持PHP和MySQL的Web主机
    安装Web服务器,然后安装PHP和MySQL
    只要在web目录中创建 .php 文件即可,服务器将自动为您解析这些文件 
  PHP服务器组件 
    PS: 对于初学者建议使用集成的服务器组件,它已经包含了 PHP、Apache、Mysql 等服务,
      免去了开发人员将时间花费在繁琐的配置环境过程。
    WampServer 
      Window 系统可以使用 WampServer,下载地址:http://www.wampserver.com/,
      支持32位和64位系统,根据自己的系统选择版本。
      WampServer 安装也简单,你只需要一直点击 "Next" 就可以完成安装了。
    XAMPP 
      XAMPP 支持 Mac OS 和 Window 系统,
  书写: 
    脚本可以放在文档中的任何位置,以 '<?php' 开头, '?>' 结尾,且后面的'?>'是可省略的 
    文件的默认文件扩展名是 ".php",可包含文本、HTML、JavaScript代码和 PHP 代码,
    代码在服务器上执行,结果以纯 HTML 形式返回给浏览器;
    在本地开发时,调试需开启服务器来访问否则浏览器解析不了[SlPt];
  注释 
    // 这是 PHP 单行注释
    
    /*
    这是 
    PHP 多行
    注释
    */
--------------------------------------------------------------------------------
数据类型 
  PS:由于变量占用的空间单元不一样,分成几种数据类型;
    8种原始类型,其中包括四种标量类型、两种复合类型和两种特殊类型;
  ◆四种标量类型
  Boolean 布尔型 
    不区分大小写,true/false 等价于 TRUE/FALSE 
    Example: 
      $x = TRUE;
      $y = false;
      $man = '男';
      echo $bool = $man == '男'; // 1
      echo $x; // 1
      echo $y; // 无输出
  Integer 整型,没有小数的数字 
    可用于表示的值: 
      十进制
      十六进制,前缀为 0x
      八进制,前缀为 0 
    Example: 
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
  Float   浮点型,带小数部分的数字,或是指数形式,使用e或E来表示 
    Example: 
      $x = 10.365;
      var_dump($x); // float(10.365) 
      echo "<br>"; 
      $x = 2.4e3;
      var_dump($x); // float(2400) 
      echo "<br>"; 
      $x = 8E-5;
      var_dump($x); // float(8.0E-5)
    ceil(<num>)             缩小取整 
    intdiv(val1,val2);  返回val1整除val2的值[PHP7+] 
      var_dump(intdiv(10, 3)); // int(3)
  String  字符串 
    单引号形式: 
    双引号形式: 
      双引号中包含变量时,变量会进行替换并连接在一起 
    Heredoc结构形式:   
      PS: 第一行只能存在'<<<xxx',最后一行只能为'xxx;',空格等都不允许存在 
      // $str1 = <<<xxx
      //   dsfadfas
      //   sdfsadf
      // xxx;
    Feature: 
      单双引号可以交替使用,作为引号输出 
        $str1 = 'a"b"c'
        $str1 = "a'b'c"
      \ 转义符,可用来输出引号 
        $str1 = 'a\'b\'c'
    Example: 
      $x = "Hello world!";
      echo $x;
      echo "<br>"; 
      $x = 'Hello world!';
      echo $x;
    相关函数 
    strlen()            返回字符串的长度[字符数]
      echo strlen("Hello world!"); // 12
    strpos(str1,str2)   在字符串str1内查找str2
      如果找到匹配,返回第一个匹配的字符位置;未找到匹配,则返回 FALSE;
      Example:
        echo strpos("0123456789","345"); // 3
  ◆两种复合类型
  Array   数组 
    数组可以在一个变量中存储多个值
    array() 创建数组 
      自动分配ID键,ID键总是从0开始: 
        $arr = array("a","b","c"); 
      手动分配ID键: 
        // $arr = array(); // 可不预先定义,不同于JS
        $arr[0]="a";
        $arr[1]="b";
        $arr[2]="c";
        var_dump($arr)  ;
        // array(3) { [0]=> string(1) "a" [1]=> string(1) "b" [2]=> string(1) "c" }
    数值数组: 带有数字ID键的数组 
    关联数组: 带有指定的键的数组,每个键关联一个值 
      关联数组是使用指定分配给数组键的数组
      两种创建关联数组的方法:
        $age=array("aoo"=>"35","boo"=>"37","coo"=>"43");
        or:
        $age['aoo']="35";
        $age['boo']="37";
        $age['coo']="43";
        随后可以在脚本中使用指定的键:
      使用 foreach 循环遍历关联数组
        $age = array("aoo"=>"35","boo"=>"37","coo"=>"43");
        foreach($age as $x => $x_value) {
          echo "Key=" . $x . ", Value=" . $x_value;
          echo "<br>";
        }
      Example:
        $age = array("aoo"=>"35","boo"=>"37","coo"=>"43");
        echo "aoo is " . $age['aoo'] . " years old.";
    多维数组: 包含一个或多个数组的数组 
    Feature: 
      循环中,数组自增长赋值 
        for ($i=0; $i < 5; $i++) { 
          $arr[] = $i;
        }
        print_r($arr); // Array ( [0] => 0 [1] => 1 [2] => 2 [3] => 3 [4] => 4 )
    ◆相关函数 
    print_r()   打印数组
    count($arr) 返回数组长度
    sort()      对数组进行升序排列 [改变原数组]
      Example:
        $aoo = array("aa","abac","ba");
        sort($aoo); 
        print_r($aoo) ; // Array ( [0] => aa [1] => abac [2] => ba )
        ?>
        <?php
        $numbers=array(4,6,2,22,11);
        sort($numbers);
        print_r($numbers) ; 
        // Array ( [0] => 2 [1] => 4 [2] => 6 [3] => 11 [4] => 22 )
    rsort()     对数组进行降序排列
    asort()     根据关联数组的值,对数组进行升序排列
      Example:
        $aoo = array("a"=>"35","b"=>"37","ab"=>"43");
        asort($aoo);
        print_r($aoo); // Array ( [a] => 35 [b] => 37 [ab] => 43 )
    arsort()    根据关联数组的值,对数组进行降序排列
    ksort()     根据关联数组的键,对数组进行升序排列
      Example:
        $age = array("Peter"=>"35","Ben"=>"37","Joe"=>"43");
        ksort($age);
        print_r($age); // Array ( [Ben] => 37 [Joe] => 43 [Peter] => 35 )
    krsort()    根据关联数组的键,对数组进行降序排列
  Object  对象,更多详见OOP  
    创建对象 
      首先先使用class关键字声明类对象,类是可以包含属性和方法的结构,
      然后在类中定义数据类型,
      最后在实例化的类中使用数据类型;
    Example:
      //也可以采用变量来创建
      $className = 'Car';
      $car = new $className();
  ◆两种特殊类型 
  NULL     空值,表示变量没有值 
    当被赋值为NULL,或者尚未被赋值,或者被unset(),变量则为NULL
    可通过设置变量值为 NULL 来清空变量数据 
    大小写不敏感 
    Example:
      $x = "Hello world!";
      $x = null;
      var_dump($x); // NULL
  Resource 资源 
    由专门的函数来建立和使用的,如打开文件、数据连接、图形画布
    可对资源进行操作[创建、使用和释放]。
    任何资源,在不需要的时候应该被及时释放。否则,系统自动启用垃圾回收机制,
    在页面执行完毕后回收资源,以避免内存被消耗殆尽。
    Example: 
      // 读取并输出文件 
      $file_handle = fopen("/data/webroot/resource/php/f.txt","r"); // 打开文件
      if ($file_handle){
        while (!feof($file_handle)) {  // 判断是否到最后一行
          $line = fgets($file_handle); // 读取一行文本
          echo $line;    // 输出一行文本
          echo "<br />"; // 换行
        }
      }
      fclose($file_handle); // 关闭文件
        
      $con=mysql_connect("localhost","root","root");  //连接数据库
      $img=imagecreate(100,100);  //图形画布
    相关函数 
    fopen()        打开文件,返回资源类型  
    imagecreate()  创建图形画布 
OOP'Object oriented programming'面向对象 
  面向对象内容 
    类: 定义了一件事物的抽象特点。类的定义包含了数据的形式以及对数据的操作
    对象: 类的实例
    成员变量: 定义在类内部的变量 
      该变量的值对外是不可见的,但是可以通过成员函数访问,
      在类被实例化为对象后,该变量即可称为对象的属性。
    成员函数: 定义在类的内部,可用于访问对象的数据。
    继承: 子类自动共享父类数据结构和方法的机制,类之间的一种关系 
      在定义和实现一个类的时候,可以在一个已经存在的类的基础之上来进行,
      把这个已经存在的类所定义的内容作为自己的内容,并加入若干新的内容。
    父类: 一个类被其他类继承,可将该类称为父类,或基类,或超类。
    子类: 一个类继承其他类称为子类,也可称为派生类。
    多态: 相同的操作或函数、过程可作用于多种类型的对象上并获得不同的结果 
      不同的对象,收到同一消息可以产生不同的结果,这种现象称为多态性 
    重载: 简单说,就是函数或者方法有同样的名称,但是参数列表不相同的情形,
      这样的同名不同参数的函数或者方法之间,互相称之为重载函数或者方法 
    抽象性: 将具有一致的数据结构（属性）和行为（操作）的对象抽象成类 
      一个类就是这样一种抽象,它反映了与应用有关的重要性质,而忽略其他一些无关内容。
      任何类的划分都是主观的,但必须与具体的应用有关。
    封装: 将某个客体的属性与行为绑定在一起,并放置在一个逻辑单元内 
    构造函数: 主要在创建对象时初始化对象,即为对象成员变量赋初始值,
      总与new运算符一起使用在创建对象的语句中 
    析构函数: 析构函数'destructor'与构造函数相反 
  class ClassName{}     关键字定义类 
    ClassName  类名  
    {}         类体,其中可定义变量和方法 
      var $xx;     声明类的变量,变量也可初始化值
      function fn(){} 函数定义
        类似PHP函数的定义,但函数只能通过该类及其实例化的对象访问 
    Example: 
      class Site {
        var $url;                // 成员变量 
        var $title;  
        function setUrl($par){   // 成员函数 
          $this->url = $par; 
        }
        function getUrl(){ 
          echo $this->url . PHP_EOL; 
        }
      }
  new ClassName(val?);  使用new运算符来实例化该类的对象 
    Example:
    $mercedes = new Car ();
    $bmw = new Car ();
    $audi = new Car ();
  $this->xx/fn   实例的属性/方法 
  $obj->xx/fn    访问成员方法/变量 
    Example:
      class Site {        // 创建类 
        var $url; 
        var $title; 
        function setUrl($par){ $this->url = $par; } 
        function getUrl(){ echo $this->url . PHP_EOL; } 
        function setTitle($par){ $this->title = $par; }
        function getTitle(){ echo $this->title . PHP_EOL; } 
      } 
      // 实例化对象 
      $runoob = new Site; 
      $taobao = new Site; 
      // 调用成员函数,设置标题和URL 
      $runoob->setTitle( "菜鸟教程" ); 
      $taobao->setTitle( "淘宝" ); 
      $runoob->setUrl( 'www.runoob.com' ); 
      $taobao->setUrl( 'www.taobao.com' ); 
      // 调用成员函数,获取标题和URL 
      $runoob->getTitle(); // 菜鸟教程
      $taobao->getTitle(); // 淘宝
      $runoob->getUrl(); // www.runoob.com
      $taobao->getUrl(); // www.taobao.com
      echo $taobao->title; // 淘宝  
  function __construct(){}   构造函数,实例化时初始化对象
    PS: 类中的一种特殊的方法,在实例化时自动执行 
      PHP5允行开发者在一个类中定义一个方法作为构造函数;
      子类中若定义了__construct则不会调用父类的__construct,
      若需要同时调用父类的构造函数,需要使用parent::__construct()显式调用 
    Example: 
      class Site {
        function __construct($par1, $par2) {
          $this->url = $par1;
          $this->title = $par2;
        }
      }
      $site1 = new Site('google' ,'baidu');
      echo $site1->title; // baidu
      echo "<br>";
      echo $site1->url;   // google
  function __destruct() {}   析构函数'destructor',实例化后销毁类 
    PS: 与构造函数相反,当对象结束其生命周期时,系统自动执行析构函数 
      当对象结束其生命周期时,例如对象所在的函数已调用完毕,系统自动执行析构函数 
      析构函数往往用来做"清理善后" 的工作,
      例如在建立对象时用new开辟了一片内存空间,应在退出前在析构函数中用delete释放 
      PHP5引入了析构函数的概念,这类似于其它面向对象的语言;
    Example: 
      class Car {
         function __construct() {
             print "构造函数被调用 <br>";
         }
         function __destruct() {
             print "析构函数被调用 <br>";
         }
      }
      $car = new Car(); //实例化时会调用构造函数
      echo '使用后,准备销毁car对象 <br>';
      unset($car); //销毁时会调用析构函数
      // 当PHP代码执行完毕以后,会自动回收与销毁对象,因此一般情况下不需要显式的去销毁对象 
  class Child extends Parent {}   继承 
    PS: PHP不支持多继承 
    Example: 
      Child_Site 类继承了 Site 类,并扩展了功能:
      // 子类扩展站点类别
      class Child_Site extends Site {
        var $category;
        function setCate($par){ $this->category = $par; }
        function getCate(){ echo $this->category . PHP_EOL; }
      }
    属性/方法重写/覆盖'override': 对父类的属性/方法进行改写 
      class Parent1 {
        var $key1 = '1'; 
        function __construct($arg) {
          $this->key1 = $arg;
          $this->key2 = $arg;
        }
      }
      class Child1 extends Parent1 {
        var $key1 = '100';
        function __construct() {
          $this->key2 = 'aa';
          $this->key3 = 'bb';
        }
      }
      $parent1 = new Parent1('a');
      $child1 = new Child1();
      echo var_dump($parent1);
      echo "<br>";
      echo var_dump($child1);
  public/protected/private  属性/方法的访问控制 
    PS: 通过在属性/方法前添加关键字public,protected或private来实现 
    public     公有的类成员,可在任何地方被访问 
    protected  受保护的类成员,可被其自身以及其子类和父类访问 
    private    私有的类成员,只能被其定义所在的类访问 
      若构造函数定义成了私有方法,则不允许直接实例化对象了,
      这时候一般通过静态方法进行实例化,
      在设计模式中会经常使用这样的方法来控制对象的创建,
      比如单例模式只允许有一个全局唯一的对象
      class Car {
        private function __construct() {
          echo 'object create <br>';
        }
        
        private static $_object = null;
        public static function getInstance() {
          if (empty(self::$_object)) {
            self::$_object = new Car(); //内部方法可以调用私有方法,因此这里可以创建对象
          }
          return self::$_object;
        }
      }
      // $car = new Car(); // 报错 
      $car = Car::getInstance(); //通过静态方法来获得一个实例
    属性的访问控制 
      PS: 为兼容PHP5-的版本,若采用 var 定义,则被视为公有 
      Example: 
        class MyClass {
          public $public = '公有属性1';
          protected $protected = '受保护的属性1';
          private $private = '私有属性1';
          function printHello() {
            echo "<br>";
            echo $this->public;
            echo "<br>";
            echo $this->protected;
            echo "<br>";
            echo $this->private;
          }
        }
        $obj = new MyClass();
        echo $obj->public;     // 公有属性1
        // echo $obj->protected;  // 报错 
        // echo $obj->private;    // 报错 
        $obj->printHello();    // 公有属性1 受保护的属性1 私有属性1
        class MyClass2 extends MyClass {
          // 可对 public 和 protected 进行重定义,但 private 而不能
          protected $protected = '受保护的属性2';
          function printHello() {
            echo "<br>";
            echo $this->public;
            echo "<br>";
            echo $this->protected;
            echo "<br>";
            echo $this->private;
          }
        }
        $obj2 = new MyClass2();
        echo "<br>";
        echo $obj2->public;    // 公有属性1 
        // echo $obj2->protected; // 报错
        echo $obj2->private;   // 警告: 未定义 private
        $obj2->printHello();   // 公有属性1 受保护的属性2  Undefined
    方法的访问控制 
      PS: 方法默认为公有 
      Example: 
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
  static             声明静态属性/方法关键字 
    PS: 可不实例化类而直接访问 
      静态属性不能通过一个类已实例化的对象来访问,但静态方法可以
      由于静态方法不需要通过对象即可调用,所以伪变量 $this 在静态方法中不可用
      静态属性不可以由对象通过 -> 操作符来访问
      可用一个变量来动态调用类[PHP5.3.0+] 
    self/parent/static 在静态方法内部调用静态方法与属性
    Example: 
      class Foo {
        public static $my_static = 'foo';
        public function staticValue() { 
          return self::$my_static; 
        }
      }
      print Foo::$my_static . PHP_EOL;    // foo
      $foo = new Foo();
      print $foo->staticValue() . PHP_EOL; // foo
      
      class Car {
        public static function getName() {
          return '汽车';
        }
      ​}
      echo Car::getName(); // 结果为“汽车”
  ClassName::$xxx/fn 访问静态属性/方法  
    可通过变量来进行动态调用 
      $className = 'Car';
      echo $className::$func();  // 动态调用静态方法
    parent::__construct() 子类调用父类构造方法 
      PHP 不会在子类的构造方法中自动的调用父类的构造方法。
      要执行父类的构造方法,需要在子类的构造方法中调用 parent::__construct()
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
  重载: 动态的创建属性与方法 
    PS: 通过魔术方法来实现
    属性重载 
      __set   对不存在属性赋值
      __get   对不存在属性读取 
      __isset 判断属性是否设置
      __unset 销毁属性 
      Example: 
        class Car {
          private $ary = array();
          
          public function __set($key, $val) {
            $this->ary[$key] = $val;
          }
          
          public function __get($key) {
            if (isset($this->ary[$key])) {
              return $this->ary[$key];
            }
            return null;
          }
          
          public function __isset($key) {
            if (isset($this->ary[$key])) {
              return true;
            }
            return false;
          }
          
          public function __unset($key) {
            unset($this->ary[$key]);
          }
        }
        $car = new Car();
        $car->name = '汽车';  //name属性动态创建并赋值
        echo $car->name;
    方法重载 
      通过__call来实现,当调用不存在的方法的时候,将会转为参数调用__call方法,
      当调用不存在的静态方法时会使用__callStatic重载 
      Example: 
        class Car {
          public $speed = 0;
          
          public function __call($name, $args) {
            if ($name == 'speedUp') {
              $this->speed += 10;
            }
          }
        }
        $car = new Car();
        $car->speedUp();   //  调用不存在的方法会使用重载
        echo $car->speed;      
  对象操作 
    clone 复制一个对象,通过自动调用__clone魔术方法来设置属性的值  
      class Car {
        public $name = 'car';
        
        public function __clone() {
          $obj = new Car();
          $obj->name = $this->name;
        }
      }
      $a = new Car();
      $a->name = 'new car';
      $b = clone $a;
      var_dump($b);
    serialize    将对象序列化为字符串,用于存储或者传递数据 
    unserialize  将字符串反序列化成对象进行使用 
      class Car {
        public $name = 'car';
      }
      $a = new Car();
      $str = serialize($a);   //  对象序列化成字符串
      echo $str.'<br>';
      $b = unserialize($str); //  反序列化为对象
      var_dump($b);        
        
  interface implements 接口
    通过 interface 关键字来定义接口,但其中定义所有的方法都是空的。
      接口中定义的所有方法都必须是公有,这是接口的特性。
      使用接口,可以指定某个类必须实现哪些方法,
      但不需要定义这些方法的具体内容,
    使用 implements 操作符,实现一个接口,
      类中必须实现接口中定义的所有方法,否则会报一个致命错误。
      类可以实现多个接口,用逗号来分隔多个接口的名称。
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
  const 常量 
    可以把在类中始终保持不变的值定义为常量。
    在定义和使用常量的时候不需要使用 $ 符号。
    常量的值必须是一个定值,不能是变量,类属性,数学运算的结果或函数调用。
    自 PHP 5.3.0 起,可以用一个变量来动态调用类。
    但该变量的值不能为关键字（如 self,parent 或 static）。
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
  final 关键字 [PHP5+] 
    如果父类中的方法被声明为 final,则子类无法覆盖该方法。
    如果一个类被声明为 final,则不能被继承。
    Example:
      以下代码执行会报错:
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
数据量 
  变量: 用于存储信息的"容器" 
    PS: PHP 是一门弱类型语言,会根据变量的值,自动把变量转换为正确的数据类型 
    命名规则 
      以'$'符号开始,后面跟着变量的名称,
      只能包含'字母'、'数字'、汉字及下划线"_" [A-z、0-9 和 _],不能包含空格,
      只能以'字母'或者下划线'_'开始,
      区分大小写 [$y 和 $Y 是两个不同的变量] ;
    创建变量 
      PHP无声明变量的命令,在第一次赋值时被创建;
        $txt = "Hello world!" ;
        $x = 5 ;
        $y = 10.5 ;
        echo '这是一个 '.$x;
    有四种不同的变量作用域:  
      全局作用域: global全局变量,可被脚本中的任何部分访问  
        PS: 在所有函数外部定义的变量 
          在函数中访问全局变量,需使用 global 关键字 ;
        global关键字,用于函数内访问全局变量。
          Example:
            $x = 5 ;
            $y = 10 ;
            function myTest() {
              global $x , $y ;
              $y = $x + $y ;
            }
            myTest();
            echo $y;  // 输出 15
      函数作用域: local局部变量,在函数内部定义的变量,仅能在函数内部访问
      static作用域: 
        PS: 当一个函数完成时,它的所有变量通常都会被删除,
          有时候希望某个局部变量不要被删除,
          要做到这一点,需在第一次声明变量时使用 static 关键字;
        Example:
          function myTest() {
            static $x = 0;
            echo $x;
            $x++;
          }
          myTest(); // 0
          myTest(); // 1
          myTest(); // 2
          每次调用该函数时,该变量将会保留着函数前一次被调用时的值。
          注释:该变量仍然是函数的局部变量。
      parameter参数作用域: 
        参数是通过调用代码将值传递给函数的局部变量。
        参数是在参数列表中声明的,作为函数声明的一部分:
        Example:
          function myTest($x) {
            echo $x;
          }
          myTest(5);
      Example:
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
  常量: 被定义后不能被改变,默认是全局的,可在整个运行的脚本内使用  
    PS: 常量是一个简单值的标识符,和变量类似,但不需要加'$'修饰符 
    define ( <name> ,<value> ,<case_insensitive>? );  定义常量 
      Input: 
        name               str,常量名称,即标志符
        value              常量的值
        case_insensitive   bol,常量大小写是否敏感,默认: false 
      Output: 
      Example:
        // 创建一区分大小写的常量 GREETING,值为"abc"
        define("GREETING", "abc");
        echo GREETING;    // "abc"
        echo '<br>';
        echo greeting;    // 报错 
        
        // 创建一不区分大小写的常量,值为"abc" 
        define("GREETING" ,"abc" ,true);
        echo greeting;  // 输出 "abc"
    defined(<name>)   bol,判断常量是否定义 
    constant( <name> );  读取常量的值 
      define('const1' ,'aaa' ,false);
      $const1 = 'const1'
      echo constant($const1);  // aaa 
      echo "<br>";
      echo constant('const1'); // aaa 
  超级全局变量: PHP系统中自带的变量[PHP4.1.0+] 
    $GLOBALS   存放着用户定义的全局变量的集合,可在全局访问,也可直接更新变量 
      Example:
        $var1 = 75; 
        $var2 = 25;
        echo $GLOBALS['var1']; // 75
        $GLOBALS['var1'] = 74 ;
        echo $var1;            // 74
        function addition() { 
          $GLOBALS['var2'] = $GLOBALS['var1'] + $GLOBALS['var2']; 
        }
        addition(); 
        echo $var2; // 99
    $_SERVER   Web服务器信息
      PS: 包含了诸如头信息'header'、路径'path'、以及脚本位置'script locations'等信息集合;
        该集合中的项目由Web服务器创建,不能保证每个服务器都提供全部项目,
        服务器可能会忽略一些,或者提供一些没有在这里列举出来的项目; 
      $_SERVER中的重要元素: 
      // PHP文件相关 
      $_SERVER['PHP_SELF']           当前脚本的路径及文件名 
        PS: 与'document root'有关
        Example: 
          //  http://example.com/test.php/foo.bar.php 的脚本中
          $_SERVER['PHP_SELF'];  //  /test.php/foo.bar.php  
      $_SERVER['SCRIPT_NAME']        当前脚本的路径及文件名 
      $_SERVER['SCRIPT_FILENAME']    当前执行脚本的绝对路径 
      // 服务器相关 
      $_SERVER['GATEWAY_INTERFACE']  服务器使用的CGI规范的版本 
        例如,"CGI/1.1"。
      $_SERVER['SERVER_ADDR']        当前脚本所在服务器的IP地址 
      $_SERVER['SERVER_NAME']        当前运行脚本所在的服务器的主机名 
        如果脚本运行于虚拟主机中,该名称是由虚拟主机所设置的值决定 
      $_SERVER['SERVER_SOFTWARE']    服务器标识字符串 
        在响应请求时的头信息中给出,如: Apache/2.4.25 (Win32) OpenSSL/1.0.2j PHP/5.6.30  
      $_SERVER['SERVER_PROTOCOL']    请求页面时通信协议名称和版本 
        如: HTTP/1.1 
      $_SERVER['SERVER_PORT']          Web服务器使用的端口,默认: "80" 
        如果使用 SSL 安全连接,则这个值为用户设置的 HTTP 端口。
      $_SERVER['SERVER_SIGNATURE']     服务器版本和虚拟主机名的字符串 
        如: Apache/2.4.25 (Win32) OpenSSL/1.0.2j PHP/5.6.30 Server at tst.lcl.com Port 80
      // 请求相关 
      $_SERVER['REQUEST_METHOD']       访问页面使用的请求方法类型  
        如: "GET" "HEAD" "POST" "PUT" 
      $_SERVER['REQUEST_TIME']         请求开始时的时间戳[PHP5.1.0+]
         如:1377687496
      $_SERVER['QUERY_STRING']         请求的查询字符串'query string' 
        无查询字符的话则为空字符 
      $_SERVER['HTTP_ACCEPT']          当前请求头中Accept的值 
      $_SERVER['HTTP_USER_AGENT']      当前请求头中User-Agent的值 
      $_SERVER['HTTP_ACCEPT_CHARSET']  当前请求头中Accept-Charset的值 
        如果存在的话。例如:"iso-8859-1,*,utf-8"。
      $_SERVER['HTTP_HOST']            当前请求头中Host的值 
      $_SERVER['HTTP_REFERER']         引导用户代理到当前页的前一页的地址 
        由'user agent'设置决定,并非所有的用户代理都会设置该项 
        有的还提供了修改 HTTP_REFERER 的功能,简言之,该值并不可信
      $_SERVER['HTTPS']                若脚本是通过HTTPS被访问的,则为一个非空的值 
      $_SERVER['REMOTE_ADDR']          浏览当前页面的用户的IP地址 
      $_SERVER['REMOTE_HOST']          浏览当前页面的用户的主机名 
        DNS 反向解析不依赖于用户的 REMOTE_ADDR。
      $_SERVER['REMOTE_PORT']          用户机器上连接到Web服务器所使用的端口号 
      $_SERVER['SERVER_ADMIN']         Apache服务器配置文件中的SERVER_ADMIN参数 
        如: postmaster@localhost 
        若脚本运行在虚拟主机上,则该值是虚拟主机的值 
      $_SERVER['PATH_TRANSLATED']     当前脚本所在文件系统的基本路径 
      $_SERVER['SCRIPT_URI']          URI用来指定要访问的页面 
    $_REQUEST  用于收集HTML表单提交的数据 
      $_REQUEST[<field>] 
        field  提交的字段名 
      Example: 
        /*  
        <form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
          Name: <input type="text" name="fname">
          <input type="submit">
        </form>    
        <?php echo $_REQUEST['fname']; ?>
        */
    $_POST     用于收集POST提交的数据 
      PS: 在form标签的指定属性: method="post" 
      $_POST[<field>]   
        field   字段名 
    $_GET      用于收集GET提交的数据
      PS: 在form标签中指定属性: method="get",也可收集URL中发送的数据 
    $_COOKIE   储存着任何从浏览器发回的Cookie的数组 
    $_SESSION  读写session 
    $_FILES  
    $_ENV  
  魔术变量:  
    PS: PHP提供了大量的预定义常量,很多都是由不同的扩展库定义的 
      有八个魔术常量它们的值随着其在代码中的位置改变而改变;
    __FILE__      当前文件的完整路径和文件名[PHP4.3.0+] 
      自 PHP 4.0.2 起,__FILE__ 总是包含一个绝对路径,
    __LINE__      代码当前的行号 
      其值依赖于它在脚本中所处的行来决定;
      Example:
        echo '这是第 " '  . __LINE__ . ' " 行'; // 这是第 " 9 " 行
    __DIR__       文件所在目录 
      PS:如果用在被包括文件中,则返回被包括的文件所在的目录。
        它等价于 dirname(__FILE__)。
        除非是根目录,否则目录中名不包括末尾的斜杠。[PHP 5.3.0中新增]
      Example:
        echo '该文件位于 " '  . __DIR__ . ' " ';
        // 该文件位于 " E:\project\test "
    __FUNCTION__  函数名称[PHP4.3.0+] 
      PS: PHP5+返回该函数被定义时的名字,区分大小写,PHP4中该值总是小写字母 
      Example:
        function test() {
          echo  '函数名为:' . __FUNCTION__ ;
        }
        test(); // 函数名为:test
    __CLASS__     类的名称[PHP4.3.0+] 
      PS: PHP5+返回该类被定义时的名字,区分大小写;PHP4中该值总是小写字母,
        类名包括其被声明的作用区域,如 Foo\Bar,
        PHP 5.4+ __CLASS__ 对trait也起作用。
        当用在trait方法中时,__CLASS__ 是调用trait方法的类的名字 
      Example:
        class test {
          function _print() {
            echo '类名为:'  . __CLASS__ . "<br>";
            echo  '函数名为:' . __FUNCTION__ ;
          }
        }
        $t = new test();
        $t->_print();
        // 类名为:test
        // 函数名为:_print
    __TRAIT__     Trait的名字[PHP5.4.0+] 
      PS:自 PHP 5.4.0 起,PHP 实现了代码复用的一个方法,称为 traits 
        Trait名包括其被声明的作用区域（例如 Foo\Bar）。
        从基类继承的成员被插入的 SayWorld Trait中的 MyHelloWorld 方法所覆盖。
        其行为 MyHelloWorld 类中定义的方法一致。
        优先顺序是当前类中的方法会覆盖trait方法,而trait方法又覆盖了基类中的方法。
      Example:
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
        输出: Hello World!
    __METHOD__    类的方法名[PHP5.0.0+] 
      PS:返回该方法被定义时的名字,区分大小写
      Example:
        function test() {
          echo  '函数名为:' . __METHOD__ ;
        }
        test(); // 函数名为:test
    __NAMESPACE__ 当前命名空间的名称,区分大小写[PHP5.3.0+] 
      PS: 此常量是在编译时定义的
      Example:
        namespace MyProject;
        echo '命名空间为:"', __NAMESPACE__, '"'; 
        // 命名空间为:"MyProject"
    PHP_VERSION   当前PHP解析器的版本号 
      echo PHP_VERSION;  // 5.6.30 
    PHP_OS        服务器所用的操作系统名称 
      echo PHP_OS;  // WINNT 
  相关函数 
  var_dump(val);      返回变量的数据类型和值 
    Example: 
      $flag = true 
      var_dump($flag);  // bool(true) 
  unset(val)          将值设为null 
运算符/操作符 
  $str1 . $str2;         字符串连接符 
    Example:
      $txt1 = "aa"; 
      $txt2 = "bb!"; 
      echo $txt1 . " " . $txt2;  // aa bb!
  expr1 ? expr2 : expr3; 三元运算符 
  @   错误控制运算符 
    PS: 对于一些可能会在运行过程中出错的表达式时,可将@放置在一个PHP表达式前,
      该表达式可能产生的任何错误信息都被忽略掉; 
      若激活了track_error[在php.ini中设置]特性,
      表达式所产生的任何错误信息都被存放在变量$php_errormsg中,
      此变量在每次出错时都会被覆盖,所以如果想用它的话必须尽早检查;
      错误控制前缀“@”不会屏蔽解析错误的信息,
      不能把它放在函数或类的定义之前,
      也不能用于条件结构例如if和foreach等 
    Example: 
      $conn = @mysql_connect("localhost","username","password");
      echo "出错了,错误原因是：".$php_errormsg;
  算术运算符 
    +  加 
    -  减 
    *  乘 
    /  除 
    %  取余 
  赋值运算符 
    =   赋值,将右边表达式值复制一份,交给左边的运算数 
      $var1 = $var2 
    =&  引用赋值,即两个变量都指向同一个数据,共享一块内存 
      若该内存存储的数据变了,则两个变量的值都会发生变化 
    +=  
    .=  连接赋值 
      a .= b 等价于 a = a . b 连接两个字符串
  比较运算符 
    ==    相等,值相同  
      两个对象的所有属性都相等时,相等 
    ===   全等,值且类型相同 
      两个对象为同一个引用时,全等
    !=    不等 
      5 != 8 ; // 1
    <>    不等 
      5 <> 8 ; // 1
    !==   不恒等 
      x !== y  如果 x 不等于 y,或它们类型不相同,则返回 true
      5!=="5" 返回 true
    <     小于 
    <=    小于等于  
    >     大于
    >=    大于等于  
    <=> 组合比较符[PHP7+] 
      大于 返回1;等于 返回0;小于 返回-1;
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
  逻辑运算符 
    !$var;   非
    $var1 and $var2; 与
    $var1 && $var2;  与
    $var1 or $var2;  或 
    $var1 || $var2;  或 
    $var1 xor $var2 xor $var3 ...; 异或,有且只有一个为true  
  +     集合
语句 
  条件判断 
    if (condition) {
      # code...
    }
    elseif (condition) {
      # code...
    }
    else {
      # code...
    }
    
    switch (variable) {
      case 'value1':
        # code...
        break;
      case 'value2':
        # code...
        break;
      default:
        # code...
        break;
    }
  循环 
    while ( condition ) {
      # code...
    }
    
    do {
      # code...
    } while ( condition );
    
    for (初始化; 循环条件; 内容变化) { 
      # code...
    }
    
    // 常用于遍历数组 
    foreach ($variable as $key => $value) {
      # code...
      // break 可跳出循环 
    }
函数 
  PS: PHP的真正威力源自于它的函数,提供了超过 1000 个内建的函数; 
    页面加载时执行脚本可以放到函数里;
  function fn($arg1 ,..) {} 创建函数 
    Example:
      function writeName() { echo "Kai Jim Refsnes"; }
      echo "My name is ";
      writeName();
      // My name is Kai Jim Refsnes
      function writeName($fname) { 
        echo $fname . " Refsnes.<br>"; 
      }
      echo "My name is ";
      writeName("Kai Jim");
      // My name is Kai Jim Refsnes.
    return 语句让函数返回一个值
其他全局函数 
  PS: 语句间使用分号;分割,且不可省略
  echo (val1,val2?,..); 文本输出 
    PS: 括号可省略: echo 或 echo()
    Feature: 
      输出的速度比 print 快,无返回值
      当输入未定义的变量时,不会报错但有提示,默认以字符串形式输出
      输出布尔类型时,'true'输出的是'1','false'则什么也不输出
    Example:
      使用 echo 命令输出字符串[可包含 HTML 标签]:
      echo "<h2>PHP 很有趣!</h2>"; // 输出HTML 
      echo "Hello world!<br>";
      echo "这是一个", "字符串,";  // 输入多个值 
      echo 2*3;                   // 可进行运算
  print (val);          文本输出 
    PS: 括号可省略: print 或 print()。
    只允许输出一个字符串,返回值总为 1
  memory_get_usage()-val1-val2 ..; 获取当前PHP消耗的内存
    PS: 根据操作系统、PHP版本以及PHP的运行方式可能输出结果会不同 
规定字符 
  PHP_EOL  换行符 
    echo '<div >1' . PHP_EOL . '1</div>' ;
    
    // 在浏览器中显示为 1 1
    // 在HTML中为 
    //   <div>1
    //   1</div>
命名空间[PHP5.3+] 
  作用: 
    决解命名冲突; 
    为(很长的)标识符名称创建一个(简短)别名的名称; 
    提高源代码的可读性;
  在声明命名空间之前唯一合法的代码是用于定义源文件编码方式的 declare 语句 
    declare(encoding='UTF-8'); // 定义多个命名空间和不包含在命名空间中的代码
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
  namespace name1; 定义命名空间
    PS: 默认的,所有常量、类和函数名都放在全局空间下,就和PHP支持命名空间之前一样 
    namespace MyProject;  
    // ... 代码 ...  
    
    namespace MyProject3 { // 另一种语法风格
      // MyProject3 命名空间中的PHP代码  
    }  
  在同一个文件中定义不同的命名空间 
    namespace MyProject1;  
    // MyProject1 命名空间中的PHP代码  
     
    namespace MyProject2;  
    // MyProject2 命名空间中的PHP代码    
     
    namespace MyProject3 { // 另一种语法
      // MyProject3 命名空间中的PHP代码 
    }  
  namespace name1\namw2\nameX; 子命名空间
    PS: 命名空间允许指定层次化的命名空间的名称,可使用分层次的方式定义 
    Example:
      namespace MyProject\Sub\Level;  // 声明分层次的单个命名空间
      const CONNECT_OK = 1;
      class Connection {  }
      function Connect() {  }
      上面的例子创建了:
      MyProject\Sub\Level\CONNECT_OK  // 常量
      MyProject\Sub\Level\Connection  // 类
      MyProject\Sub\Level\Connect  // 函数
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
    Example:
      file1.php 文件代码
        namespace Foo\Bar\subnamespace; 
        const FOO = 1;
        function foo() {
          // 
        }
        class foo { 
          static function staticmethod() {
            // 
          } 
        }
      file2.php 文件代码
        namespace Foo\Bar;
        include 'file1.php';
        const FOO = 2;
        function foo() {
          // 
        }
        class foo {
          static function staticmethod() {
            // 
          }
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
    注意访问任意全局类、函数或常量,都可以使用完全限定名称
      例如 \strlen() 或 \Exception 或 \INI_ALL。
    在命名空间内部访问全局类、函数和常量:
      namespace Foo;
      function strlen() {}
      const INI_ALL = 3;
      class Exception {}
      
      $a = \strlen('hi'); // 调用全局函数strlen
      $b = \INI_ALL; // 访问全局常量 INI_ALL
      $c = new \Exception('error'); // 实例化全局类 Exception
    命名空间和动态语言特征
      命名空间的实现受到其语言自身的动态特征的影响。
      Example:
        因此,如果要将下面的代码转换到命名空间中,动态访问元素。
        必须使用完全限定名称（包括命名空间前缀的类名称）。
        注意因为在动态的类名称、函数名称或常量名称中,
        限定名称和完全限定名称没有区别,因此其前导的反斜杠是不必要的。
        example1.php 文件代码:
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
    动态访问命名空间的元素
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
  'namespace' 关键字; 和 __NAMESPACE__ 魔术常量
    PS: 两种抽象的访问当前命名空间内部元素的方法
    __NAMESPACE__ 常量 
      其值是包含当前命名空间名称的字符串。
      在全局的,不包括在任何命名空间中的代码,它包含一个空的字符串。
      Example:
        namespace MyProject;
        echo '"', __NAMESPACE__, '"';  // 输出 "MyProject"

        echo '"', __NAMESPACE__, '"'; // 输出 ""
      常量 __NAMESPACE__ 在动态创建名称时很有用
        使用__NAMESPACE__动态创建名称
          namespace MyProject;
          
          function get($classname) {
            $a = __NAMESPACE__ . '\\' . $classname;
            return new $a;
          }
    'namespace' 关键字  
      用来显式访问当前命名空间或子命名空间中的元素。等价于类中的 self 操作符。
      namespace操作符,命名空间中的代码
      namespace MyProject;
      
      use blah\blah as mine; // see "Using namespaces: importing/aliasing"
      
      blah\mine(); // calls function blah\blah\mine()
      namespace\blah\mine(); // calls function MyProject\blah\mine()
      
      namespace\func(); // calls function MyProject\func()
      namespace\sub\func(); // calls function MyProject\sub\func()
      namespace\cname::method(); // calls static method "method" of class MyProject\cname
      $a = new namespace\sub\cname(); // instantiates object of class MyProject\sub\cname
      $b = namespace\CONSTANT; // assigns value of constant MyProject\CONSTANT to $b
      namespace操作符, 全局代码
      
      namespace\func(); // calls function func()
      namespace\sub\func(); // calls function sub\func()
      namespace\cname::method(); // calls static method "method" of class cname
      $a = new namespace\sub\cname(); // instantiates object of class sub\cname
      $b = namespace\CONSTANT; // assigns value of constant CONSTANT to $b
      使用命名空间:别名/导入
        命名空间支持 有两种使用别名或导入方式:为类名称使用别名,或为命名空间名称使用别名
        注意PHP不支持导入函数或常量。
        在PHP中,别名是通过操作符 use 来实现的. 
        1、使用use操作符导入/使用别名
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
        2、 一行中包含多个use语句
        use My\Full\Classname as Another, My\Full\NSname;
        
        $obj = new Another; // 实例化 My\Full\Classname 对象
        NSname\subns\func(); // 调用函数 My\Full\NSname\subns\func
        3、导入和动态名称
        导入操作是在编译执行的,但动态的类名称、函数名称或常量名称则不是。
        use My\Full\Classname as Another, My\Full\NSname;
        
        $obj = new Another; // 实例化一个 My\Full\Classname 对象
        $a = 'Another';
        $obj = new $a;      // 实际化一个 Another 对象
        4、导入和完全限定名称
        另外,导入操作只影响非限定名称和限定名称。完全限定名称由于是确定的,故不受导入的影响。
        use My\Full\Classname as Another, My\Full\NSname;
        
        $obj = new Another; // instantiates object of class My\Full\Classname
        $obj = new \Another; // instantiates object of class Another
        $obj = new Another\thing; // instantiates object of class My\Full\Classname\thing
        $obj = new \Another\thing; // instantiates object of class Another\thing
        使用命名空间:后备全局函数/常量
          在一个命名空间中,当 PHP 遇到一个非限定的类、函数或常量名称时,
          它使用不同的优先策略来解析该名称。类名称总是解析到当前命名空间中的名称。
          因此在访问系统内部或不包含在命名空间中的类名称时,必须使用完全限定名称,
          例如:
          1、在命名空间中访问全局类
          namespace A\B\C;
          class Exception extends \Exception {}
          
          $a = new Exception('hi'); // $a 是类 A\B\C\Exception 的一个对象
          $b = new \Exception('hi'); // $b 是类 Exception 的一个对象
          
          $c = new ArrayObject; // 致命错误, 找不到 A\B\C\ArrayObject 类
          对于函数和常量来说,如果当前命名空间中不存在该函数或常量,PHP 会退而使用全局空间中的函数或常量。
          2、 命名空间中后备的全局函数/常量
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
  全局空间
    如果没有定义任何命名空间,所有的类与函数的定义都是在全局空间,
    与 PHP 引入命名空间概念前一样。
    在名称前加上前缀 \ 表示该名称是全局空间中的名称,
    即使该名称位于其它的命名空间中时也是如此。
    使用全局空间说明
    namespace A\B\C;
    
    /* 这个函数是 A\B\C\fopen */
    function fopen() { 
      /* ... */
      $f = \fopen(...); // 调用全局的fopen函数
      return $f;
    } 
  命名空间的顺序
    自从有了命名空间之后,最容易出错的该是使用类的时候,这个类的寻找路径是什么样的了。
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
  名称解析遵循下列规则:
    对完全限定名称的函数,类和常量的调用在编译时解析。例如 new \A\B 解析为类 A\B。
    所有的非限定名称和限定名称（非完全限定名称）根据当前的导入规则在编译时进行转换。
      例如,如果命名空间 A\B\C 被导入为 C,
      那么对 C\D\e() 的调用就会被转换为 A\B\C\D\e()。
    在命名空间内部,所有的没有根据导入规则转换的限定名称均会在其前面加上当前的命名空间名称。
      例如,在命名空间 A\B 内部调用 C\D\e(),则 C\D\e() 会被转换为 A\B\C\D\e() 。
    非限定类名根据当前的导入规则在编译时转换（用全名代替短的导入名称）。
      例如,如果命名空间 A\B\C 导入为C,则 new C() 被转换为 new A\B\C() 。
    在命名空间内部（例如A\B）,对非限定名称的函数调用是在运行时解析的。
      例如对函数 foo() 的调用是这样解析的:
    在当前命名空间中查找名为 A\B\foo() 的函数
    尝试查找并调用 全局(global) 空间中的函数 foo()。
    在命名空间（例如A\B）内部对非限定名称或限定名称类（非完全限定名称）的调用是在运行时解析的。
      下面是调用 new C() 及 new D\E() 的解析过程: new C()的解析:
      在当前命名空间中查找A\B\C类。
      尝试自动装载类A\B\C。
      new D\E()的解析:
      在类名称前面加上当前命名空间名称变成:A\B\D\E,然后查找该类。
      尝试自动装载类 A\B\D\E。
      为了引用全局命名空间中的全局类,必须使用完全限定名称 new \C()。
PCRE库 
  正则匹配模式使用分隔符与元字符组成
  分隔符 
    可为非数字、非反斜线、非空格的任意字符
    使用反斜杠 \ 进行转义 
      /http:\/\//
    若模式中包含较多的分割字符,可采用preg_quote进行转义 
      $p = 'http://';
      $p = '/'.preg_quote($p, '/').'/';
      echo $p;
  元字符: 具有特殊含义的字符 
    PS: 元字符具有两种使用场景,一种是可以在任何地方都能使用,另一种是只能在方括号内使用
    \   一般用于转义字符
    ^   断言目标的开始位置,或在多行模式下是行首
    $   断言目标的结束位置,或在多行模式下是行尾
    .   匹配除换行符外的任何字符 
    [   开始字符类定义 
    ]   结束字符类定义 
    |   开始一个可选分支 
    (   子组的开始标记 
    )   子组的结束标记 
    ?   作为量词,表示 0 次或 1 次匹配。位于量词后面用于改变量词的贪婪特性 
    *   量词,0 次或多次匹配
    +   量词,1 次或多次匹配
    {   自定义量词开始标记 
    }   自定义量词结束标记 
    \s  匹配任意的空白符,包括空格,制表符,换行符 
      [^\s]代表非空白符 
    
      $p = '/^我[^\s]+(苹果|香蕉)$/';
      $str = "我喜欢吃苹果";
      if (preg_match($p, $str)) {
        echo '匹配成功';
      }
    \w  匹配字母或数字或下划线 
      $p = '/[\w\.\-]+@[a-z0-9\-]+\.(com|cn)/';
      $str = "我的邮箱是Spark.eric@imooc.com";
      preg_match($p, $str, $match);
      echo $match[0];
    \d  匹配数字 
    在方括号内使用: 
    \   转义字符
    ^   仅在作为第一个字符[方括号内]时,表明字符类取反
      其中^方反括号外面,表示断言目标的开始位置,
      但在方括号内部则代表字符类取反,
    -   标记字符范围
      方括号内的减号-可以标记字符范围,例如0-9表示0到9之间的所有数字。
  模式修饰符 
    i   忽略大小写匹配 
      $str = "Http://www.imooc.com/";
      if (preg_match('/http/i', $str)) {
        echo '匹配成功';
      }
    g   全局匹配
    m   多行匹配 
    s   单行匹配,换行符作为普通字符
    x   忽略模式中的空白
    A   强制从目标字符串开头匹配
    D   如果使用$限制结尾字符,则不允许结尾有换行;
    U   只匹配最近的一个字符串;不重复匹配;
    e   配合函数preg_replace()使用,可以把匹配来的字符串当作正则表达式执行;
  贪婪模式与懒惰模式
    贪婪模式：在可匹配与可不匹配的时候,优先匹配
      正则表达式中每个元字符匹配一个字符,当使用+之后将会变的贪婪,它将匹配尽可能多的字符,
    懒惰模式：在可匹配与可不匹配的时候,优先不匹配
      但使用问号?字符时,它将尽可能少的匹配字符,既是懒惰模式。
    Example: 
      $p = '/\d+\-\d+/';
      $str = "我的电话是010-12345678";
      preg_match($p, $str, $match);
      echo $match[0]; //结果为：010-12345678
      
      $p = '/\d?\-\d?/';
      $str = "我的电话是010-12345678";
      preg_match($p, $str, $match);
      echo $match[0];  //结果为：0-1
        
      $p = '/\d{3}\-\d{8}/';
      $str = "我的电话是010-12345678";
      preg_match($p, $str, $match);
      echo $match[0]; //结果为：010-12345678
  preg_match(pattern ,str ,matches)     获取一个匹配的数组 
    可简单的用来判断模式是否匹配成功,或者取得一个匹配结果,
    返回值是匹配成功的次数0或者1,在匹配到1次以后就会停止搜索。
    Example: 
      $subject = "abcdef";
      $pattern = '/def/';
      preg_match($pattern, $subject, $matches);
      print_r($matches); //结果为：Array ( [0] => def )
      
      $subject = "abcdef";
      $pattern = '/a(.*?)d/';
      preg_match($pattern, $subject, $matches);
      print_r($matches); //结果为：Array ( [0] => abcd [1] => bc )
  preg_match_all(pattern ,str ,matches) 循环获取一个列表的匹配结果数组 
    $p = "|<[^>]+>(.*?)</[^>]+>|i";
    $str = "<b>example: </b><div align=left>this is a test</div>";
    preg_match_all($p, $str, $matches);
    print_r($matches);
  preg_replace($pattern ,$replacement ,$string)  正则匹配到的字符替换为指定值  
    echo preg_replace('/\s+/' ,' ' ,'one     two'); // 'one two'
    
    $string = 'April 15, 2014';
    $pattern = '/(\w+) (\d+), (\d+)/i';
    $replacement = '$3, ${1} $2'; // ${1}与$1的写法是等效的 
    echo preg_replace($pattern, $replacement, $string); // 2014, April 15
       
    // 使用数组 
    $patterns = array ('/(19|20)(\d{2})-(\d{1,2})-(\d{1,2})/', '/^\s*{(\w+)}\s*=/');
    // \3等效于$3,\4等效于$4,依次类推
    $replace = array ('\3/\4/\1\2', '$\1 ='); 
    echo preg_replace($patterns, $replace, '{startDate} = 1999-5-27'); 
    // $startDate = 5/27/1999 
Cookie,存储在客户端浏览器中的数据 
  PS: 通过Cookie来跟踪与存储用户数据
    一般情况下,Cookie通过HTTP headers从服务端返回到客户端
  setcookie(<name> ,<value> ,<expirre> ,<path> ,<domain>);  设置/删除cookie 
    PS: 通过设置过期时间或将cookie值设为空字符来删除cookie 
    7个可选参数:  
    name     Cookie名,可通过 $_COOKIE['name'] 进行访问
    value    Cookie的值
    expire   过期时间,Unix时间戳格式,默认: 0,表示浏览器关闭即失效
    path     有效路径,如果路径设置为'/',则整个网站都有效 
      当设定了其他路径之后,则只在设定的路径以及子路径下有效 
    domain   有效域,默认整个域名都有效
      如设置了'www.imooc.com',则只在www子域中有效
    Example: 
      setcookie('test', time()); 
    
      $value = 'test';
      setcookie("TestCookie", $value, time()+3600);  //有效期一小时
      setcookie("TestCookie", $value, time()+3600, "/path/", "imooc.com"); //设置路径与域
      
      setcookie('test', '', time()-1);   // 删除cookie 
  setrawcookie();  设置cookie 
    跟setcookie基本一样,唯一的不同就是value值不会自动的进行urlencode,
    因此在需要的时候要手动的进行urlencode
    setrawcookie('cookie_name', rawurlencode($value), time()+60*60*24*365); 
  header("Set-Cookie:cookie_name=value"); 直接使用header方法进行设置
    通过header来删除cookie
    header("Set-Cookie:test=1393832059; expires=".gmdate('D, d M Y H:i:s \G\M\T', time()-1));
    // gmdate 用来生成格林威治标准时间,以便排除时差的影响 
session,将用户的会话数据存储在服务端 
  PS: 无大小限制,通过一个session_id进行用户识别,
    PHP默认情况下session id是通过cookie来保存的,
    因此从某种程度上来说,seesion依赖于cookie。
    但这不是绝对的,session id也可以通过参数来实现,
    只要能将session id传递到服务端进行识别的机制都可以使用session。  
    默认情况下,session是以文件形式存储在服务器上的,
    因此当一个页面开启了session之后,会独占这个session文件,
    这样会导致当前用户的其他并发访问无法执行而等待。
    可以采用缓存或者数据库的形式存储来解决这个问题
  使用session: 
    1 session_start()  // 开启session
    2 通过全局变量$_SESSION进行session的读写 
      session会自动的对要设置的值进行encode与decode,
      因此session可以支持任意数据类型,包括数据与对象等。
    Example: 
      session_start();
      $_SESSION['test'] = time();
      var_dump($_SESSION);
    
      session_start();
      $_SESSION['ary'] = array('name' => 'jobs');
      $_SESSION['obj'] = new stdClass();
      var_dump($_SESSION);
  删除与销毁session
    使用unset函数,删除后就会从全局变量$_SESSION中去除,无法访问 
    Example: 
      session_start();
      $_SESSION['name'] = 'jobs';
      unset($_SESSION['name']);
      echo $_SESSION['name']; // 提示name不存在
    session_destroy()  销毁当前session,删除所有数据,但是session_id仍然存在 
      并不会立即的销毁全局变量$_SESSION中的值,
      只有当下次再访问的时候,$_SESSION才为空,
      因此如果需要立即销毁$_SESSION,可以使用unset函数。
      
      session_start();
      $_SESSION['name'] = 'jobs';
      $_SESSION['time'] = time();
      session_destroy();
文件系统 
  // 目录操作 
  is_dir(<path>);       路径是否是目录  
  opendir(<dirpath>);   打开目录 
    Input: dirpath  文件目录路径 
    Output: Resource类型 
  closedir(<dirRsc>);   关闭打开的目录 
  readdir(<dirRsc>);    读取目录 
    Input: dirRsc  目录的Resource 
    Output: 文件目录名/文件名 
  rmdir();              删除空文件夹 
    如果文件夹不为空或者没有权限则会提示失败 
    删除非空文件夹: 
      先循环删除目录中的所有文件,然后再删除该目录 
      循环删除可以使用glob函数遍历所有文件 
      foreach (glob("*") as $filename) {
        unlink($filename);
      }        
  touch(<path>);                       创建文件 
    Input: path   创建的文件路径及名称 
    Output: 文件是否创建成功的布尔值 
  is_file(<path>);                     判断给定的路径是否是一个文件 
    Input: path  文件路径 
    Output: 文件是否存在的布尔值 
  is_readable(<path>);                 判断文件是否可读
  is_writeable(<path>);                判断文件是否可写
  filetype(<path>);                    获取文件类型 
    Input: path 文件的路径及名称 
    Output: 文件类型的字符串表示 
      'file'  文件
      'dir'   目录 
  file_get_contents(<path> ,);         读取文件内容 
    可将整个文件全部读取到一个字符串中
    也可通过参数控制读取内容的开始点以及长度 
      $content = file_get_contents('./test.txt', null, null, 100, 500);
  file_exists(<path>);                 判断文件是否存在 
    PS: 不仅可以判断文件是否存在,同时也可以判断目录是否存在
    Input: path  文件路径 
    Output: 文件/目录是否存在的布尔值 
  filesize();                          取得文件的大小 
    文件大小是以字节数表示 
  fileowner();                         获得文件的所有者 
  filectime();                         获取文件的创建时间 
  filemtime();                         获取文件的修改时间 
  fileatime();                         获取文件的访问时间 
  file_put_contents(<path> ,<data>);   写入内容到文件 
    Input: 
      path   文件路径 
      data   str/arr,写入的数据 
        当data是数组的时候,会自动的将数组连接起来,相当于$data=implode('', $data);
  unlink(<path>);                      文件删除 
    跟Unix系统命令类似
  PHP也提供类似于C语言操作文件的方法 
    fopen   打开文件指针 
    fclose  关闭文件指针
      使用fopen打开的文件,最好使用fclose,避免文件句柄被占用 
    fgets   从文件指针中读取一行
    fread
    freads  可读取指定长度的字符串 
    fwrite  文件写入
    Example: 
      $fp = fopen('./text.txt', 'rb');
      while(!feof($fp)) {
        echo fgets($fp); //读取一行
      }
      fclose($fp);
      
      $fp = fopen('./text.txt', 'rb');
      $contents = '';
      while(!feof($fp)) {
        $contents .= fread($fp, 4096); //一次读取4096个字符
      }
      fclose($fp);

    
      $fp = fopen('./test.txt', 'w');
      fwrite($fp, 'hello');
      fwrite($fp, 'world');
      fclose($fp);
异常处理[PHP5+] 
  throw 抛出异常
    异常抛出之后,后面的代码将不会再被执行
  既然抛出异常会中断程序执行,那么为什么还需要使用异常处理？
    异常抛出被用于在遇到未知错误,或者不符合预先设定的条件时,通知客户程序,
    以便进行其他相关处理,不至于使程序直接报错中断。
  try{}catch{} 
    PS: 抛出的异常会在catch中捕获,否则会直接中断 
    try {
      //可能出现错误或异常的代码
      //catch表示捕获,Exception是php已定义好的异常类
    } 
    catch(Exception $e){
      //对异常处理,方法：
      //1、自己处理
      //2、不处理,将其再次抛出
    }
    Example: 
      function checkNum($number){
        if($number>1){
          throw new Exception("异常提示-数字必须小于等于1");
        }
        return true;
      }
      try{
        checkNum(2);
        //如果异常被抛出,那么下面一行代码将不会被输出
        echo '如果能看到这个提示,说明你的数字小于等于1';
      }catch(Exception $e){
        echo '捕获异常: ' .$e->getMessage();
      }
      "catch" 代码块接收到该异常,并创建一个包含异常信息的对象 ($e)。
      通过从这个 exception 对象调用 $e->getMessage(),输出来自该异常的错误消息      
  Exception 所有异常处理的基类 
    Exception的基本属性与方法
      ->message 异常消息内容
      ->code    异常代码
      ->file    抛出异常的文件名
      ->line    抛出异常在该文件的行数
      ->getTrace()         获取异常追踪信息
      ->getTraceAsString() 获取异常追踪信息的字符串
      getMessage()       获取出错信息
    如果必要的话,可以通过继承Exception类来建立自定义的异常处理类 
      //自定义的异常类,继承了PHP的异常基类Exception
      class MyException extends Exception {
        function getInfo() {
          return '自定义错误信息';
        }
      }
    
      try {
        throw new MyException('error');// 这里规定如何触发异常
        // 注意：每一个 "throw" 必须对应至少一个 "catch",当然可以对应多个"catch"
      } 
      catch(Exception $e) { 
        echo $e->getInfo();   // 获取自定义的异常信息
        echo $e->getMessage();// 获取继承自基类的getMessage信息
      }    
--------------------------------------------------------------------------------
Mysql数据库 
  PS: PHP通过安装相应的扩展来实现数据库操作 
    PHP中一个数据库可能有一个或者多个扩展,其中既有官方的,也有第三方提供的。
    像Mysql常用的扩展有原生的mysql库,也可以使用增强版的mysqli扩展,还可以使用PDO进行连接与操作。
    不同的扩展提供基本相近的操作方法,不同的是可能具备一些新特性,以及操作性能可能会有所不同。
mysql扩展 
  // 进行数据库连接 
  $link = mysql_connect('mysql_host', 'mysql_user', 'mysql_password');
    PS: PHP连接数据库的方式类似于直接在命令行下通过进行连接,类似：mysql -hlocalhost -ucode1 -p 
    mysql_host     数据库的地址
    mysql_user     用户名
    mysql_password 密码 
  mysql_select_db('code1');  [连接成功以后]选择一个操作的数据库 
  mysql_query("set names 'utf8'");  设置一下当前连接使用的字符编码 
  mysql_query(<sql语句>);  执行sql语句  
    查询数据 
      默认的,PHP使用最近的数据库连接执行查询 
        但如果存在多个连接的情况,则可以通过参数指令从那个连接中进行查询。
        $link1 = mysql_connect('127.0.0.1', 'code1', '');
        $link2 = mysql_connect('127.0.0.1', 'code1', '', true); //开启一个新的连接
        $res = mysql_query('select * from user limit 1', $link1); //从第一个连接中查询数据    
      对于查询类的语句会返回一个资源句柄'resource'
        可通过该资源获取查询结果集中的数据 
        $res = mysql_query('select * from user limit 1');
        $row = mysql_fetch_array($res);
        var_dump($row);
    插入数据 
      $sql = "insert into user(name, age, class) values('李四', 18, '高三一班')";
      mysql_query($sql); // 执行插入语句
      通常数据都是存储在变量或者数组中,因此sql语句需要先进行字符串拼接得到。
      $name = '李四';
      $age = 18;
      $class = '高三一班';
      $sql = "insert into user(name, age, class) values('$name', '$age', '$class')";
      mysql_query($sql); //执行插入语句
      在mysql中,执行插入语句以后,可以得到自增的主键id,通过PHP的 mysql_insert_id 函数可以获取该id。
      
      $uid = mysql_insert_id();
      这个id的作用非常大,通常可以用来判断是否插入成功,或者作为关联ID进行其他的数据操作。    
    更新与删除数据 
      Example: 
        $sql = "update user set name = '曹操' where id=2 limit 1";
        if (mysql_query($sql)) { echo '更新成功'; }
        
        $sql = "delete from user where id=2 limit 1";
        if (mysql_query($sql)) { echo '删除成功'; }
      mysql_affected_rows 对于删除与更新操作,获取更新过的数据行数
        如果数据没有变化,则结果为0。
        $sql = "update user set name = '曹操' where id=2 limit 1";
        if (mysql_query($sql)) {
          echo mysql_affected_rows();
        }        
  取得数据查询结果 
    mysql_fetch_array()  获取数据集中的一行数据 
      可通过设定参数来更改行数据的下标,默认的会包含数字索引的下标以及字段名的关联索引下标。
  
      $sql = "select * from user limit 1";
      $result = mysql_query($sql);
      $row = mysql_fetch_array($result);
    mysql_fetch_row()    只获取数字索引数组 
      等同于mysql_fetch_array设定参数 MYSQL_NUM 
    mysql_fetch_assoc()  只获取关联索引数组
      等同于mysql_fetch_array设定参数 MYSQL_ASSOC 
    Example: 
      $row = mysql_fetch_row($result);
      $row = mysql_fetch_array($result, MYSQL_NUM); 
      // 以上两个方法获取的数据是一样的 
      $row = mysql_fetch_assoc($result);
      $row = mysql_fetch_array($result, MYSQL_ASSOC);
      // 以上两个方法获取的数据是一样的 
      
      如果要获取数据集中的所有数据,我们通过循环来遍历整个结果集。
      $data = array();
      while ($row = mysql_fetch_array($result)) {
        $data[] = $row;
      }  
  查询分页数据 
    在实际应用中,一次性获取数据表中的所有数据,性能会非常的低,
    因此会使用翻页功能,每页仅显示10条或者20条数据。
        
      通过mysql的limit可以很容易的实现分页,limit m,n表示从m行后取n行数据,
      $currentPage = 2;     // 当前页 
      $pageSize = 2;      // 每页显示的数据条数 
      $preAllNum = ($currentPage - 1) * $pageSize; // 当前页前面所有的数据 
      $sql = "select * from user limit $preAllNum, $pageSize";
      $result = mysql_query($sql);
      //循环获取当前页的数据
      $data = array();
      while ($row = mysql_fetch_assoc($result)) {
        $data[] = $row;
      }
  mysql_close();  关闭MySQL连接
    虽然PHP会自动关闭数据库连接,一般情况下已经满足需求,
    但是在对性能要求比较高的情况下,可以在进行完数据库操作之后尽快关闭数据库连接,以节省资源,提高性能。
    在存在多个数据库连接的情况下,可以设定连接资源参数来关闭指定的数据库连接。
    $link = mysql_connect($host, $user, $pass);
    mysql_close($link);
mysqli扩展 
  $link = mysqli_connect('mysql_host', 'mysql_user', 'mysql_password');
PDO扩展 
  $dsn = 'mysql:dbname=testdb;host=127.0.0.1';
  $user = 'dbuser';
  $password = 'dbpass';
  $dbh = new PDO($dsn, $user, $password);
--------------------------------------------------------------------------------
Example: 
  员工查询和添加 
    保存 
      POST 提交 
      "Content-Type" : "application/x-www-form-urlencoded"
      {
        number: ''  // 员工编号 
        ,name: ''   // 员工姓名 
        ,sex: ''    // 员工性别 
        ,job: ''    // 员工职位 
      }
    查询 
      GET 提交 
      number: ''
  PHP文件 
    // 设置页面内容是html编码格式是utf-8
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
          $result = "找到员工:员工编号:" . $value["number"] . ",员工姓名:" . $value["name"] . 
          ",员工性别:" . $value["sex"] . ",员工职位:" . $value["job"];
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
      echo "员工:" . $_POST["name"] . " 信息保存成功！"; //提示保存成功
    }






