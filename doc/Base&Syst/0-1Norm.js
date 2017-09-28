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
起步_基础 
  在统计到的128985个单词中,以字母开头的个数  
  X < Y < Z < Q < J < K < V < N < W < O < I
    X - 122
    Y - 608
    Z - 624
    Q - 720
    J - 1287
    K - 1577
    V - 2364
    N - 2522
    W - 3147
    O - 3681
    I - 3685
    
    L - 4126
    U - 4425
    H - 4500
    G - 4747
    E - 5151
    F - 5389
    R - 6794
    M - 6891
    D - 7217
    B - 7272 
    T - 7289
    A - 7296 
    P - 10278
    C - 11382
    S - 15917
  暴露的变量,统一采用前缀'z'或'Z'
自定义命名 
  无意义的模块名称 
    so
    as
    wa
    fr
    is
    are
    ft  工具函数
    sv  自定义变量
    db  数据结构块
  变量名 
    aoo
    boo
    coo
    doo
    eoo

    aux
    bux
    cux
    dux
    eux

    axx
    bxx
    cxx
    dxx
    exx
  函数名 
    是否 is
      Example:
        判断是否最小 isMin
    foo
    goo
    hoo
    ioo
    joo
    koo

    faz
    gaz
    haz
    iaz
    jaz
    kaz

    fux
    gux
    hux
    iux
    jux
    kux
  常用词语缩写 
    ◆描述类
      colo    颜色
      bg      背景
      center  居中
    ◆动作类
      op      操作
      sech    搜索 search
      set     设置
      hint    提示
      pop     弹出
      assist  帮助,助攻
      direct  指导 direction
    ◆位置类
      side    侧边
      menu    菜单
      submeu  子菜单 submenu
      main    主要区
      hpage   首页
      header  头部
      footer  底部
      nav     导航条
      title   标题栏
      column  栏目
      locat   位置 location
      layout  布局
    ◆状态类
      suc     成功
    ◆名称表示
      material 素材
      plugin   插件
      acty     活动 activity 如 Promotional Activities,促销活动
      extd     扩展 extend
      sort     类别
      defi     定义 definition
      pw       密码
      tx       文本
      bor      边框
      bt       按钮
      icon     图标
      art      文章
      logo     标志
      bar      条
      tool     工具
      side     侧边
      banner   广告条
      potr     头像 portrait
      cont     内容 content
      wrap     外套
      conter   容器 container
      tag      标签
      tips     小技巧
      msg      信息 message
      sumry    摘要 summary
      brand    商标 branding
      coprt    版权信息 copyright
      resu     结果 results
      hot      热点
      sit      站点 site
      info     信息
      partner  合作伙伴
      guild    指南
      map      地图
      list     列表
      statu    状态 status
      tab      标签页
      news     新闻
      prodct   产品 products
      prices   价格
      dscrip   描述 description
      pbli     生产,出版 publish
      screhot  缩略图 screenshot
      faqs     常见问题
      kwd      关键词 keyword
      blog     博客
      forum    论坛
      drop     下拉
      rvw      评论 review
      link     连接
      login    登录
      joinus   加入我们
      serv     服务 service
      regst    注册 regsiter
      scroll   滚动
      dload    下载 download
      retr     后退/返回 retreat
      top      上
      bottom   下
      left     左
      right    右
      mid      中 middle
      front    前
      behind   后
      fst      第一 first
      sec      第二 second
      thd      第三 third
      fth      第四 fourth
      fifth    第五
      sixth    第六
      seventh  第七
      eighth   第八
      ninth    第九
      tenth    第十
      master   主要的
      font     文字
      print    打印
      themes   主题
    Example:
      文本输入框 .input_tx
      密码输入框 .input_pw
      登录密码输入框 .input_pw_login
      日志设置成功提示 .hint_suc_blogset
      相册弹出的设置层 .pop_set_photo
      公共提示 .hint_bg
      文本颜色 .c_tx
      段落文本颜色 .c_tx_p
  短语_符号 
  ◆短语
  tag       标签
  atr       属性 attr attribute
  slt       选择器 selector
  bol       布尔值 bool boolean 
  num       数值
  str       字符串
  arr       数组
  idx       数组的下标 indx index
  bgn       开始 begin
  end       结束 
  elm       数组成员/DOM对象 elem element
  obj       对象
  key       对象的键,或属性等
  val       对象的值/值
  foo       [无属性]函数
  cfo       [回调型]函数 cfoo 
  arg       [无属性]参数
  pram      [配置项]参数 param 
  typ       类型 type
  rtn       返回值 ret retn 
  Jelm      jQuery对象 Jelem
  DiBs      在浏览器中有差异,有兼容性问题  Different in Browsers
  more      其他的,更多的
  moIn      更多参见 more in
  macro     总体,宏观
  micro     小的,微观
  detil     详细 detail
  acc       总结,积累
  rec       记录
  todo      待处理,待整理
  temp      暂时,临时
  xxx+      表示其及其后续
    如 IE9+ 表示IE9和IE9以后
    CSS3+ CSS3及以后
    HTML5 HTML5及以后
    ES5+  ES5新增
    ES6+  ES6新增
    ...
  foder     文件夹 folder
  file      文件
  self      自己的,自定义的
  SlPt      自我观点、认为 SelfPoint
  SlSt      自我设置 SelfSet
  文档描述相关
  PS:      说明
  Example:    举例子
  Exp:      经验积累
  Self:    自己相关
  Extend:  扩展
  ◆符号
  [一般其中的内容为补充说明,注释,解释,注意项等]   
  ◆、★、■    标题和内容处于同一层级状态时,给标题添加起到醒目的作用
自定义规范 
  PS:zzz 作为自己的标识,使用前缀z ,如 zAoo
  文件夹及文件名: 包含 小写字母 、数字 和 下划线'_'或'-'
    Windows, OSX下文件名不区分大小写,linux区分大小写,
  html及CSS 中id和class命名规范 
    PS: 使用 大小写字母、数字 和 下划线_;驼峰法用于间隔;
      以数字或_开头可能存在兼容性问题
    层级间   字母+数字 使用数字来定位层级[当数字取到两位时,如10,改用两位字母+数字] 
      一般将id的第一个首字母后带数字用于表示到该id元素的层级
      aoo 
        aBoo aCoo aDoo ...
          a1aoo ...
            ...
            a9xoo
              ax1aoo
    同级间   单词+数字/字母 区分 
      同分支同级重名 _数字 
        aCoo
        a1xoo | a1xoo_1
      异分支同级重名 _分支首字母 
        aAoo
        a1aoo | a1aoo_1 | a1boo
        a2aoo a2aoo_1 | a2aoo_a a2aoo_a_1 | a2aoo_b a2aoo_b_1
      当用于区分的两异分支也重名时 _分支首字母+数字 
        aAoo
        a1aoo | a1aoo_1 | a1aoo_2
        |--a2aoo a2aoo_1 
        |--a2aoo_a a2aoo_a_1 
        |--a2aoo_a1[a2aoo_a仍重名故改用a2aoo_a1] a2aoo_a1_1
    下标从0零开始,且0默认省略
    常用短语 
      top rit btm lft mid cnt up dwn frt bck
      ttl ctt bdy wrp item i special s  
    复杂级别[所有使用同一个名字]
      aoo  通过数字来定位和_num来区分
      a_0 | a_1 | a_2
      a0_0 a0_1 a0_2 | a1_0 a1_1 a1_2 a1_3 | a2_0 a2_1 a2_2
      |--a00_0 a00_1 a00_2 a00_3
      |--a01_0 a01_2 a01_3 
      |--a02_0 a02_1
      -----
      |--a10_0 a10_1 a10_2 
      |--a11_0 a11_1 a11_2 a11_3
      |--a12_0 a12_1 a12_2
      |--a13_0 a13_1 a13_2 a13_3 
      -----
      |--a20_0 a20_1 a20_2
      |--a21_0 a21_1 
      |--a22_0 a22_1 a22_2 a22_3
        |--a000 
        |--a001 
        |--a002 
        |--a003 
        -----
        |--a010 
        |--a011 
        |--a012 
        |--a013 
        -----
        |--a020 
        |--a021 
        --------
        |--
        |--
        |--
        ----
        |--
        |--
        |--
        |--
        ----
        |--
        |--
        |--
        ----
        |--
        |--
        |--
        |--
        --------
        |--
        |--
        |--
        ----
        |--
        |--
        ----
        |--
        |--
        |--
        |--
        
      
      或者 
      aoo  通过字母定位和_num来区分
      aLft | aCnt | aRit
      alLft alCnt alRit | acTop acMid acBtm | arTop arMid arBtm
      |--allTop allMid allBtm
      |--alcAoo alcBoo alcAoo_1 alcAoo_2 
      |--
      -----
  前后端数据交互规范 
    初始化数据和需提交的数据保持同样的格式和结构, 
    空内容使用''来表示  
--------------------------------------------------------------------------------
