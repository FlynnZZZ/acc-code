名词&术语 
  IDE,'integrated development environment'集成开发环境 
  API,'application programming interfaces'应用编程接口 
    目的是给应用程序与开发人员基于某软件或硬件得以访问一组例程的能力,
    无需访问源码,或理解内部工作机制的细节;
    提供了一组对象,方法和属性,可以用来访问这些技术的所有功能
    对方定义的一种信息交互的方式[Self]
  CLI,'command line interface for batch scripting'命令行界面  
  UTC,'coordinated universeal time'国际协调时间,又称世界统一时间 
    UTC 日期值得是在没有时区偏差的情况下的日期值
    UTC和北京时间相差8个小时,北京属于东八区
  'scripting language'脚本语言 
    不具备开发操作系统的能力,而是用来编写控制其他大型应用程序的'脚本';
  'host environment'宿主环境 :语言在运行时的环境 
    对于JS,最常见的宿主环境是web浏览器,提供JS运行的环境和一些接口 
    同样作为宿主环境,NodeJS也有自己的JS引擎--V8 
  'localhost' :计算机网络中,意为'本地主机',指'这台计算机' 
    是给loopback回路网络接口的一个标准主机名;
    相对应的IP地址为'127.0.0.1'[IPv4]和'::1'[IPv6]
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
文档记录规范 
  常用词: 
    tag     标签
    attr    特性 
    prop    属性 
    slctor  选择器 slctor 
    bol     布尔值 
    num     数值
    int     整数 
    float   浮点数 
    str     字符串
    arr     数组
    obj     对象
    any     任意类型 
    expr    表达式  
    stmt    语句  statement 
    idx     数组的下标/字符串字符下标  
    bgn     开始 begin
    end     结束 
    elem    DOM对象  
    jEl     jQuery对象 
    member  数组成员,集合成员 
    key     对象的键,或属性等
    val     对象的值/值
    foo     [无属性]函数
    cfo     [回调型]函数 cfoo 
    arg     [无属性]参数
    params  [配置项]参数  
    option  [配置项]参数  
    typ     类型 type
    init    初始的 
    hdl     操作 handle 
    DiBs    在浏览器中有差异,有兼容性问题  Different in Browsers
    acc     总结,积累
    rec     记录
    todo    待处理,待整理
    tmp     暂时,临时
    xxx+    表示其及其后续 
      如 IE9+ 表示IE9和IE9以后
      CSS3+ CSS3及以后
      HTML5 HTML5及以后
      ES5+  ES5新增
      ES6+  ES6新增
      ...
    more    其他的,更多的
    self    自己的,自定义的
    SlPt    自我观点、认为 SelfPoint
    SlSt    自我设置 SelfSet
    ★组合短语 
    moIn    更多参见 more in 
    NdA     Nondirect availability,不可直接使用  
    ★其他 
    hint    提示 
    pop     弹出 
    column  栏目 
    sort    类别 
    pw      密码 
  符号表示: 
    '[]'包裹: 表示可选 
      Example: tr.slice(beginSlice[,endSlice])  表示第二个参数为可选 
    ?作为结尾: 表示可选 
      Example: str.slice(beginSlice,endSlice?)   表示第二个参数为可选 
    <描述词>|‹描述词›: 表示描述值  
      Example: $(<selector>) 表示传入的参数为选择器 
  划分、描述记录对象的关键词 
    ★通用定义 
    PS:       说明 
    DefDec:   定义说明 
    Example:  举例子 
    Feature:  特征 
    Enum:     枚举 
    Sort:     分类 
    Accu:     总结 
    Self:     自己相关 
    More:     更多  
    MoIn:     更多  
    Expand:   扩展 
    Q&I:   问题及想法 
    Env:   环境 
    Sit:   站点/网站/整站  
    Win:   窗口 
    Pag:   页面/文档
    Elm:   DOM/元素/元素内容 
    Atr:   元素属性 
    Evt:   事件
    Kit:   工具方法 
    ★类描述常用的关键词: 
    Extend:   继承自 
    Relate:   关系 
    Static:   静态属性/方法 
    Instance: 实例对象 
    Proto:    原型属性/方法 
    ★对象描述常用的关键词:  
    Member:   成员 
自定义命名 
  用于标记: __ 或 zzz 
  变量名: aoo,boo,..;axx,bxx,..; 
  函数名  foo, goo hoo ioo joo koo
自定义规范 
  前后端数据交互规范 
    初始化数据和需提交的数据保持同样的格式和结构 
    空内容使用''来表示  
--------------------------------------------------------------------------------





