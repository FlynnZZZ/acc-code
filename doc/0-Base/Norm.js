名词&术语 
  IDE: 'Integrated Development Environment'集成开发环境 
  API: 'Application Programming interfaces'应用编程接口 
    目的是给应用程序与开发人员基于某软件或硬件得以访问一组例程的能力,
    无需访问源码,或理解内部工作机制的细节;
    提供了一组对象,方法和属性,可以用来访问这些技术的所有功能
    对方定义的一种信息交互的方式[Self]
  'scripting language'脚本语言 
    不具备开发操作系统的能力,而是用来编写控制其他大型应用程序的'脚本';
  'host environment'宿主环境 :语言在运行时的环境 
    对于JS,最常见的宿主环境是web浏览器,提供JS运行的环境和一些接口 
    同样作为宿主环境,NodeJS也有自己的JS引擎--V8 
  'localhost' :计算机网络中,意为'本地主机',指'这台计算机' 
    是给loopback回路网络接口的一个标准主机名;
    相对应的IP地址为'127.0.0.1'[IPv4]和'::1'[IPv6]
  UTC'coordinated universeal time'国际协调时间,又称世界统一时间 
    UTC 日期值得是在没有时区偏差的情况下的日期值
    UTC和北京时间相差8个小时,北京属于东八区
--------------------------------------------------------------------------------
常用约定
缩写词 
  bin   binary 二进制 
  src   source 来源 
  dist  distribute 分发 
  dest  destination 目的地 
  repo  repository 仓库 
  spec  specification 说明书 
--------------------------------------------------------------------------------
◆自我设定 
状态表示  
  参数表示 
    '[]'包裹起来的表示可选参数 
      str.slice(beginSlice[, endSlice])  表示第二个参数为可选 
    '<>' 表示自定义的值 
      $(<selector>) 
  文档描述 
    PS:      说明
    Example: 举例子
    Exp:     经验积累
    Self:    自己相关
    Extend:  扩展
  短语表示 
    tag       标签
    attr      特性 
    prop      属性 
    selector  选择器 
    bol       布尔值 
    num       数值
    int       整数 
    float     浮点数 
    str       字符串
    arr       数组
    obj       对象
    any       任意类型 
    expr      表达式  
    idx       数组的下标/字符串字符下标  
    bgn       开始 begin
    end       结束 
    elem      DOM对象  
    Jelem     jQuery对象 
    member    数组成员,集合成员 
    key       对象的键,或属性等
    val       对象的值/值
    foo       [无属性]函数
    cfo       [回调型]函数 cfoo 
    arg       [无属性]参数
    params    [配置项]参数  
    options   [配置项]参数  
    typ       类型 type
    DiBs      在浏览器中有差异,有兼容性问题  Different in Browsers
    acc       总结,积累
    rec       记录
    todo      待处理,待整理
    tmp       暂时,临时
    xxx+      表示其及其后续 
      如 IE9+ 表示IE9和IE9以后
      CSS3+ CSS3及以后
      HTML5 HTML5及以后
      ES5+  ES5新增
      ES6+  ES6新增
      ...
    more      其他的,更多的
    moIn      更多参见 more in
    self      自己的,自定义的
    SlPt      自我观点、认为 SelfPoint
    SlSt      自我设置 SelfSet
命名规范 
  起步_基础 
    在统计到的128985个单词中,以字母开头的个数  
    X < Y < Z < Q < J < K < V < N < W < O < I
    暴露的变量,统一采用前缀'z'或'Z'
  变量名: aoo,boo,..  aux,bux,..  axx,bxx,..
  函数名  foo, goo hoo ioo joo koo
  常用词语缩写 
    handle  操作
    hint    提示
    pop     弹出
    column  栏目
    sort    类别
    pw      密码
自定义规范 
  前后端数据交互规范 
    初始化数据和需提交的数据保持同样的格式和结构 
    空内容使用''来表示  
--------------------------------------------------------------------------------
