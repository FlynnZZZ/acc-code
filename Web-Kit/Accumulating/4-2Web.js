介绍_概念_说明_定义
web标准的构成
  主要有三部分:结构「structure」、表现「presentation」和行为「behavior」
  结构标准对应的主要语言是html
  表现标准对应的主要语言是css
  行为标准对应的主要语言是javascript
常识
  网页文件名的中英文问题
    在本地电脑中,使用中英文无影响;
    若将网页文件存放在服务器上,建议使用英文名,以免产生异常.
  命名规则样式
    驼峰式   headerLeft  一般用于组合名词
    拼接式   header-left 一般用于属性叠加
  url 路径:
    绝对路径: 提供目标文档的完整主机名称、路径信息及文档全称
    相对路径:
      同级,直接书写目标文档全称: fileName,如 boo.js;
      上一级,书写为:folderName/fileName;
      ../ 表示上一级目录; ./ 表示当前目录; / 表示相对根路径
  HSL色彩模式 工业界的一种颜色标准
    PS:
      通过对色相(H) 饱和度(S) 明度(L)三个颜色通道的变化及其相互叠加来得到各式各样的颜色的,
      HSL即是代表色相,饱和度,明度三个通道的颜色,这个标准几乎包括了人类视力所能感知的所有颜色,
      是目前运用最广的颜色系统之一。
    H(hue)分量 代表的是人眼所能感知的颜色范围
      这些颜色分布在一个平面的色相环上,取值范围是0°到360°的圆心角,每个角度可以代表一种颜色。
      六大主色作基本参照：360°/0°红、60°黄、120°绿、180°青、240°蓝、300°洋红
    S(saturation)分量 指的是色彩的饱和度
      它用0%至100%的值描述了相同色相、明度下色彩纯度的变化。
      数值越大,颜色中的灰色越少,颜色越鲜艳,呈现一种从灰度到纯色的变化
    L(lightness)分量 指的是色彩的明度,作用是控制色彩的明暗变化。
      它同样使用了0%至100%的取值范围。
      数值越小,色彩越暗,越接近于黑色；数值越大,色彩越亮,越接近于白色。
  编码
    ANSI  本地编码「不代表具体的编码」
      比如在简体版windows上它表示GB2312编码,
      在繁体版windows上它表示Big5编码,
      在日文操作系统上它表示JIS编码。
    UTF-8 
--------------------------------------------------------------------------------
网页的显示过程
  浏览器加载网页过程
    一个网页的加载依赖于脚本文件、CSS样式文件。浏览器加载网页的过程如下:
    首先,浏览器下载 HTML 并开始解析。如果浏览器发现外部CSS资源链接则发送下载请求。
    浏览器可以在下载CSS资源的同时,并行解析HTML文件,
    但是,一旦发现有脚本文件的引用,则必须等待脚本文件完成下载并且执行后才能继续解析。
    脚本文件完成下载并且执行后,浏览器可以继续解析HTML工作,
    如果遇到非阻塞资源浏览器会发送下载请求并且继续解析。
    即使浏览器可以并行执行多个请求,但是无法与针对脚本文件的操作并行执行。
名称解释类汇总
  IDE: 集成开发环境,Integrated Development Environment
  MVC 模式
    Model,模型层:      提供/保存数据
    Controller,控制层: 数据处理,实现业务逻辑
    View,视图层:       展示数据,提供用户界面
  MVVM 模式
    PS:用 View Model 代替 Controller.
      本质：view 绑定 view-model,视图与数据模型强耦合,
      数据的变化实时反映在 view 上,不需要手动处理.
    Model
    View
    View-Model：简化的 Controller,唯一作用就是为 View 提供处理好的数据,不含其他逻辑。
  SPA, Single-page application
    前端可以做到： 读写数据 切换视图 用户交互
    这意味着,网页其实是一个应用程序。
    2010 年后,前端工程师从开发页面,变成了开发”前端应用“（跑在浏览器里面的应用程序）。
  Native App  是一种基于智能手机本地操作系统并使用原生程式编写运行的第三方应用程序
    如iOS、Android、WP系统,也叫本地app。
    一般使用的开发语言为JAVA、C++、Objective-C。
  静态页面和动态页面
    动态页面 : 通过数据库进行架构的网站。
      动态网站除了要设计网页外,还要通过数据库和编程序来使网站具有更多自动的和高级的功能。
      例如,网站里的产品资料和图片数量很多、种类很多,
      为方便顾客查找,就应通过数据库编程来在网页上实现自动搜索；
      系统、在线采购系统、商务交流系统等都是用数据库来做成的
      一般使用PHP ASP JSP 等制作
      动态网页则更新较多,一般用于用户互动较多的网站
    静态网站: 主要是指由静态网站制作而成的网站。
      也可以简单的这样理解：动态网站的功能就是 想填加一条信息,只要登陆会员或者网站管理后台。
      然后像发电子邮件一样,填表单提交后, 网站前台就能显示了,就已经更新完毕了
      静态的需要用FTP或者WEBFTP从服务器上把需要更新的文件下载到本地修改后再上传。
      运行在客户端的程序、网页、插件、组件 属于静态网页,可以脱离服务器运行于浏览器客户端
      静态网页适合更新较少的网站,一般适用于展示型的网站
    区分 : 最简单的方法就是看后缀
      态网页网址中有两个标志性的符号“?”和“&”（有的可能没有&）,?和&就是用来带参数的,
      现在几乎所有的网页都是动态网页。
动画
  实现方式 
    JavaScript 通过定时器刷新,间隔来改变元素样式。
    CSS3 transition和animation。
    HTML5 使用HTML5提供的绘图方式：
  绘制频率 
    页面每一帧变化都是系统绘制出来的（GPU或者CPU）。
    它的最高绘制频率受限于显示器的刷新频率（而非显卡）, 
    所以大多数情况下最高的绘制频率只能是每秒60帧,对应于显示器的60Hz
    帧,frame per second,简称fps;
  刷新频率
    图像在屏幕上更新的速度,也就是屏幕上的图像每秒出现的次数,单位是Hz,
    刷新频率越高,屏幕上图片闪烁感就越小,稳定性也就越高。
    人的眼睛不容易察觉75Hz以上刷新频率带来的闪烁感。
  硬件加速
    硬件有三个处理器：CPU、GPU和APU（声音处理器）。他们通过PCI/AGP/PCIE总线交换数据。
    GPU在浮点运算、并行计算等部分计算方面,明显高于CPU的性能。
  fps 
    GPU渲染画面的频率, 游戏里谈到掉帧,是指GPU渲染画面频率降低。
    比如跌落到30fps甚至20fps,但因为视觉暂留原理,我们看到的画面仍然是运动和连贯的。
  Hz
    显示器刷新屏幕的频率
canvas
svg
webgl
--------------------------------------------------------------------------------
命令提示符操作 
  命令提示符是在操作系统中,提示进行命令输入的一种工作提示符。
  在不同的操作系统环境下,命令提示符各不相同。
windows环境 
  PS:命令行程序为cmd.exe,是一个32位的命令行程序,
    微软Windows系统基于Windows上的命令解释程序,类似于微软的DOS操作系统。
    输入一些命令,cmd.exe可以执行,比如输入shutdown -s就会在30秒后关机。
    打开方法：开始-所有程序-附件 或 开始-寻找-输入：cmd/cmd.exe 回车。
    CMD即命令提示符窗口(cmd.exe),是Windows的“标配”组件,
    它可以实现用户与操作系统的直接交流,并负责用户输入的所有命令的解释和支持。
    命令提示符进行的操作往往更具有专业性——实际上很多Windows中的操作只能通过命令来实现
  命令 快捷键 操作
    PS:
      命令码无大小写区分 (文件夹的名称也无大小写区分)     
    快捷键
      rightmouse      粘贴
      上/下方向键      选择历史命令
      F7              显示命令历史记录
      Esc             清除当前命令行
      Ctrl+c          强行中止命令执行
      Alt+printScreen 截取当前命令窗 (需在画板中粘贴)
      F9              按编号选择命令(从0开始) 
      Ctrl+h          和删除backspace功能相同
      选中文字下enter  复制
    文件操作类
      cd XX   进入XX文件夹
        cd ./    当前文件夹
        cd ../   到上级文件夹
        cd\      到该磁盘的根目录
      盘符:   进入磁盘
        e.g. : E:  进入到E盘 ;  c:  进入到c盘
      dir     列出目录下的所有文件
      mkdir   创建文件夹
      文件名  运行/打开该文件(前提是可运行的程序、批处理文件等,可以不带格式后缀)
    信息查看类
      cls   清屏
      winver---------检查Windows版本
      ipconfig       显示当前的TCP/IP配置的设置值
        ipconfig /all：显示本机TCP/IP配置的详细信息；
        ipconfig /release：DHCP客户端手工释放IP地址；
        ipconfig /renew：DHCP客户端手工向服务器刷新请求；
        ipconfig /flushdns：清除本地DNS缓存内容；
        ipconfig /displaydns：显示本地DNS内容；
        ipconfig /registerdns：DNS客户端手工向服务器进行注册；
        ipconfig /showclassid：显示网络适配器的DHCP类别信息；
        ipconfig /setclassid：设置网络适配器的DHCP类别。
        ipconfig /renew “Local Area Connection”：更新“本地连接”适配器的由 DHCP 分配 IP 地址的配置
        ipconfig /showclassid Local*：显示名称以 Local 开头的所有适配器的 DHCP 类别 ID
        ipconfig /setclassid “Local Area Connection” TEST：将“本地连接”适配器的 DHCP 类别 ID 设置为 TEST        
      cmd.exe--------CMD命令提示符
      Nslookup-------IP地址侦测器
      netstat -an----(TC)命令检查接口
      nslookup-------网络管理的工具向导
    打开应用类
      explorer-------打开资源管理器
      calc-----------启动计算器
      mspaint--------画图板
      write----------写字板
      eudcedit-------造字程序
      magnify--------放大镜实用程序
      dvdplay--------DVD播放器
      taskmgr--------任务管理器
      devmgmt.msc--- 设备管理器
      diskmgmt.msc---磁盘管理实用程序
      notepad--------打开记事本
      osk------------打开屏幕键盘
      fsmgmt.msc-----共享文件夹管理器
      narrator-------屏幕“讲述人”
      Msconfig.exe---系统配置实用程序
      eventvwr-------事件查看器
      charmap--------启动字符映射表
      utilman--------辅助工具管理器
      wiaacmgr-------扫描仪和照相机向导 (需要安装)
      services.msc---本地服务设置
      certmgr.msc----证书管理实用程序
      compmgmt.msc---计算机管理
      sfc.exe--------系统文件检查器
      perfmon.msc----计算机性能监测程序
      regedit.exe----注册表
      regedt32-------注册表编辑器
      cleanmgr-------垃圾整理
      wmimgmt.msc----打开windows管理体系结构(WMI)
      sigverif-------文件签名验证程序
      wscript--------windows脚本宿主设置
      mmc------------打开控制台
      dxdiag---------检查DirectX信息
      chkdsk.exe-----Chkdsk磁盘检查
    其他待整理
      wupdmgr--------windows更新程序
      winchat--------XP自带局域网聊天
      mstsc----------远程桌面连接
      mobsync--------同步命令
      dcomcnfg-------打开系统组件服务
      ddeshare-------打开DDE共享设置
      shrpubw--------创建共享文件夹
      syskey---------系统加密,一旦加密就不能解开,保护windows xp系统的双重密码
      sfc /scannow---windows文件保护
      tsshutdn-------60秒倒计时关机命令
      rononce -p ----15秒关机
      regsvr32 /u *.dll----停止dll文件运行
      regsvr32 /u zipfldr.dll------取消ZIP支持
      cliconfg-------SQL SERVER 客户端网络实用程序
      conf-----------启动netmeeting
      odbcad32-------ODBC数据源管理器
      logoff---------注销命令
      net stop messenger-----停止信使服务
      net start messenger----开始信使服务
浏览器
  介绍_概念_说明_定义 
    说明
      浏览器从同一个域同时下载文件的数量有限,当同时下载多个文件,会比相同大小的单个文件慢.
      浏览器在遇到<body>标签时才开始呈现内容
    主要组成
      渲染引擎: 将网页代码渲染成图像呈现,也叫浏览器内核
        PS:浏览器核心的部分是“Rendering Engine”,“渲染引擎”,一般称为“浏览器内核”。
          负责对网页语法的解释,如HTML、JavaScript并渲染（显示）网页。
          渲染引擎决定了浏览器如何显示网页的内容以及页面的格式信息。
          不同的浏览器内核对网页编写语法的解释也有不同,
          因此同一网页在不同的内核的浏览器里的渲染（显示）效果也可能不同.
        Blink    Chrome内核
          Blink是一个由Google和Opera Software开发的浏览器排版引擎,
          Google计划将这个渲染引擎作为Chromium计划的一部分。
          这一渲染引擎是开源引擎WebKit中WebCore组件的一个分支,并且在Chrome（28 及往后版本）、Opera（15 及往后版本）和Yandex浏览器中使用。
        Webkit   Safari内核,Chrome内核原型,开源
          它是苹果公司自己的内核,也是苹果的Safari浏览器使用的内核。
          Webkit引擎包含WebCore排版引擎及JavaScriptCore解析引擎,均是从KDE的KHTML及KJS引擎衍生而来,它们都是自由软件,在GPL条约下授权,同时支持BSD系统的开发。
          所以Webkit也是自由软件,同时开放源代码。在安全方面不受IE、Firefox的制约,所以Safari浏览器在国内还是很安全的。
          Google Chrome、360 极速浏览器以及搜狗高速浏览器高速模式也使用Webkit作为内核(在脚本理解方面,Chrome使用自己研发的V8引擎)。
          WebKit内核常见的浏览器：傲游浏览器3、[1]  Apple Safari (Win/Mac/iPhone/iPad)、Symbian手机浏览器、Android 默认浏览器,
        Gecko    Firefox内核
          Netscape6开始采用的内核,后来的Mozilla FireFox也采用了该内核,
          Gecko的特点是代码完全公开,因此,其可开发程度很高,
          全世界的程序员都可以为其编写代码,增加功能。
          IE没有使用W3C的标准,这导致了微软内部一些开发人员的不满；
          他们与当时已经停止更新了的 Netscape的一些员工一起创办了Mozilla,
          以当时的Mosaic内核为基础重新编写内核,于是开发出了Gecko。
          此外Gecko也是一个跨平台内核,可以在Windows、 BSD、Linux和Mac OS X中使用。
          JavaScript引擎是SpiderMonkey。
        Trident  IE内核
          1997 年的IE4中首次被采用,是微软在Mosaic代码的基础之上修改而来的,并沿用到IE11。
          微软很长时间都并没有更新Trident内核,
          导致了Trident内核曾经几乎与W3C标准脱节（2005 年）,
          Trident内核的大量 Bug等安全性问题没有得到及时解决,
          然后加上一些致力于开源的开发者和一些学者们公开自己认为IE浏览器不安全的观点,
          也有很多用户转向了其他浏览器,Firefox和Opera就是这个时候兴起的。
          非Trident内核浏览器的市场占有率大幅提高也致使许多网页开发人员开始注意网页标准和非IE浏览器的浏览效果问题。
          IE从版本11开始,初步支持WebGL技术。
          IE8的JavaScript引擎是Jscript,IE9开始用Chakra,
          这两个版本区别很大,Chakra无论是速度和标准化方面都很出色。
          Trident内核的常见浏览器有：
            IE6、IE7、IE8（Trident 4.0）
            IE9（Trident 5.0）
            IE10（Trident 6.0）
          360 安全浏览器
            1.0-5.0 为Trident
            6.0 为Trident+Webkit
            7.0 为Trident+Blink
          国内的厂商一般把其他内核叫做“高速浏览模式”,而Trident则是“兼容浏览模式”,用户可以来回切换。
        EdgeHTML Edge
        Presto   Opera前内核 [已废弃]
          Opera 12.17 及更早版本曾经采用的内核,现已停止开发并废弃,
          该内核在2003年的Opera7中首次被使用,
          该款引擎的特点就是渲染速度的优化达到了极致,然而代价是牺牲了网页的兼容性。
          Opera现已改用Google Chrome的Blink内核。
        渲染的四个阶段
          解析代码: HTML解析DOM,CSS解析为CSSOM,CSS Object Model
          对象合成: 将DOM和CSSOM合成渲染树,render tree
          布局    : 渲染树布局 layout
          绘制    : 将渲染树绘制到屏幕
          注:并非严格按顺序,可能有交叉,如HTML未下载完已有内容在浏览器中显示出来
        flow  : 渲染树到网页布局,称为"布局流"
        paint : 布局到网页显示为"绘制"
        reflow 和 repaint
          PS:页面生成后,JS操作和样式表操作都会触发flow和paint,称为"重流"和"重绘"
            reflow必然要repaint,反之则不然,
            如改变颜色只会repaint,改变元素的布局则会reflow和repaint,
            通常,浏览器browser会智能的将reflow和repaint限制在相关子树上, 以减小开销
          尽量减少重绘的次数和成本
            优先考虑底层DOM元素的变动而非高DOM;
            browser会累计DOM变动进行一次性执行,故将DOM操作进行集中处理
              如:读取或写入DOM,尽量居中不要混杂
              缓存DOM信息
              使用CSS class 一次性改变样式,而非一项一项的改变
            动画时尽量使用absolute 或 fixed 定位,减少对其他元素的影响
            使用document fragment 操作DOM
            window.requestAnimationFrame() 推迟代码到下次重流时执行,而非立即要求重流
              开销大
              function addHeight(elem){
                var height1 = elem.clientHeight;
                elem.style.height = (height * 2) + "px";
              }
              allElems.forEach(addHeight);
              开销小
              function addHeight(elem){
                var height1 = elem.clientHeight;
                window.requestAnimationFrame(function(){
                  elem.style.height = (height * 2) + "px";
                })
              }
              allElems.forEach(addHeight);
      JS引擎: 主要作用将网页中的JS代码读取、处理并运行,也叫JS解释器
        PS:JS为解释型语言,不需编译,由解释器运行
          好处: 运行和修改方便
          缺点: 每次运行需要调用解释器,系统开销大,运行速度慢于编译型语言
          为了提高运行速度,目前浏览器都将JS进行一定程度的编译,
          生成类似字节码的中间代码,以提高运行速度
        早期,browser对JS的处理过程:
          读取: 进行词法分析,lexical analysis ,分解成词元,token
          对token语法分析,parsing,成"语法树",syntax tree
          翻译器,translator将syntax tree翻译成字节码bytecode
          字节码解释器,bytecode interpreter将bytecode转换成机器码machine code
        JIT,即时编译,Just In Time compiler
          因为bytecode到machine code的过程低效,bytecode只在运行时编译,
          且缓存,inline cache编译结果;
          通常一程序经常用到的只是其中一部分代码,缓存机制让程序执行速度显著提升,
          不同browser的编译策略不同,如V8直接从syntax tree 到machine code
        JS虚拟机
          bytecode不能直接运行,需通过一虚拟机,Virtual Machine 运行,
          一般也将Virtual Machine 称为JS引擎,
          JS运行时未必有bytecode,
          所以JS Virtual Machine 不完全基于bytecode,而是部分基于,
          只要有可能,就通过JIT将源码source code转换到machine code
          常用的JS Virtual Machine 
            Chrome  V8
            Safari  Nitro
            Firefox SpiderMonkey
            IE      Chakra
            Opera   Carakan
    浏览器缓存
      反复的获取同一个URL(如JSONP请求),浏览器为了提高效率会加载缓存,会得到同样的缓存文件.
      e.g. 
        var url="http://gumball.wickedlysmart.com/?callback=updateSales" + "&random=" + (new Date()).getTime();
        在URL的末尾增加一个数字,URL的实际访问地址没有变,但浏览器会认为其是新URL
  小技巧
    通过浏览器地址栏运行HTML代码 「非IE浏览器内核」
      e.g.:  
      在浏览器地址栏直接输入 data:text/html,<a href=''> 13 </a>
      通过JS操作也可
        setTimeout(function(){
          location.href = 'data:text/html,<a href=""> 13 </a>';
        },1000);
  Todo: 
    浏览器的组成
    浏览器的核心是两部分：渲染引擎和JavaScript解释器（又称JavaScript引擎）。
    
    渲染引擎
    渲染引擎的主要作用是,将网页代码渲染为用户视觉可以感知的平面文档。
    
    不同的浏览器有不同的渲染引擎。
    
    Firefox：Gecko引擎
    Safari：WebKit引擎
    Chrome：Blink引擎
    IE: Trident引擎
    Edge: EdgeHTML引擎
    渲染引擎处理网页,通常分成四个阶段。
    
    解析代码：HTML代码解析为DOM,CSS代码解析为CSSOM（CSS Object Model）
    对象合成：将DOM和CSSOM合成一棵渲染树（render tree）
    布局：计算出渲染树的布局（layout）
    绘制：将渲染树绘制到屏幕
    以上四步并非严格按顺序执行,往往第一步还没完成,第二步和第三步就已经开始了。所以,会看到这种情况：网页的HTML代码还没下载完,但浏览器已经显示出内容了。
    
    重流和重绘
    渲染树转换为网页布局,称为“布局流”（flow）；布局显示到页面的这个过程,称为“绘制”（paint）。它们都具有阻塞效应,并且会耗费很多时间和计算资源。
    
    页面生成以后,脚本操作和样式表操作,都会触发重流（reflow）和重绘（repaint）。用户的互动,也会触发,比如设置了鼠标悬停（a:hover）效果、页面滚动、在输入框中输入文本、改变窗口大小等等。
    
    重流和重绘并不一定一起发生,重流必然导致重绘,重绘不一定需要重流。比如改变元素颜色,只会导致重绘,而不会导致重流；改变元素的布局,则会导致重绘和重流。
    
    大多数情况下,浏览器会智能判断,将重流和重绘只限制到相关的子树上面,最小化所耗费的代价,而不会全局重新生成网页。
    
    作为开发者,应该尽量设法降低重绘的次数和成本。比如,尽量不要变动高层的DOM元素,而以底层DOM元素的变动代替；再比如,重绘table布局和flex布局,开销都会比较大。
    
    var foo = document.getElementById('foobar');
    
    foo.style.color = 'blue';
    foo.style.marginTop = '30px';
    上面的代码只会导致一次重绘,因为浏览器会累积DOM变动,然后一次性执行。
    
    下面是一些优化技巧。
    
    读取DOM或者写入DOM,尽量写在一起,不要混杂
    缓存DOM信息
    不要一项一项地改变样式,而是使用CSS class一次性改变样式
    使用document fragment操作DOM
    动画时使用absolute定位或fixed定位,这样可以减少对其他元素的影响
    只在必要时才显示元素
    使用window.requestAnimationFrame(),因为它可以把代码推迟到下一次重流时执行,而不是立即要求页面重流
    使用虚拟DOM（virtual DOM）库
    下面是一个window.requestAnimationFrame()对比效果的例子。
    
    // 重绘代价高
    function doubleHeight(element) {
      var currentHeight = element.clientHeight;
      element.style.height = (currentHeight * 2) + 'px';
    }
    
    all_my_elements.forEach(doubleHeight);
    
    // 重绘代价低
    function doubleHeight(element) {
      var currentHeight = element.clientHeight;
    
      window.requestAnimationFrame(function () {
        element.style.height = (currentHeight * 2) + 'px';
      });
    }
    
    all_my_elements.forEach(doubleHeight);
    JavaScript引擎
    JavaScript引擎的主要作用是,读取网页中的JavaScript代码,对其处理后运行。
    
    JavaScript是一种解释型语言,也就是说,它不需要编译,由解释器实时运行。这样的好处是运行和修改都比较方便,刷新页面就可以重新解释；缺点是每次运行都要调用解释器,系统开销较大,运行速度慢于编译型语言。
    
    为了提高运行速度,目前的浏览器都将JavaScript进行一定程度的编译,生成类似字节码（bytecode）的中间代码,以提高运行速度。
    
    早期,浏览器内部对JavaScript的处理过程如下：
    
    读取代码,进行词法分析（Lexical analysis）,将代码分解成词元（token）。
    对词元进行语法分析（parsing）,将代码整理成“语法树”（syntax tree）。
    使用“翻译器”（translator）,将代码转为字节码（bytecode）。
    使用“字节码解释器”（bytecode interpreter）,将字节码转为机器码。
    逐行解释将字节码转为机器码,是很低效的。为了提高运行速度,现代浏览器改为采用“即时编译”（Just In Time compiler,缩写JIT）,即字节码只在运行时编译,用到哪一行就编译哪一行,并且把编译结果缓存（inline cache）。通常,一个程序被经常用到的,只是其中一小部分代码,有了缓存的编译结果,整个程序的运行速度就会显著提升。不同的浏览器有不同的编译策略。有的浏览器只编译最经常用到的部分,比如循环的部分；有的浏览器索性省略了字节码的翻译步骤,直接编译成机器码,比如chrome浏览器的V8引擎。
    
    字节码不能直接运行,而是运行在一个虚拟机（Virtual Machine）之上,一般也把虚拟机称为JavaScript引擎。因为JavaScript运行时未必有字节码,所以JavaScript虚拟机并不完全基于字节码,而是部分基于源码,即只要有可能,就通过JIT（just in time）编译器直接把源码编译成机器码运行,省略字节码步骤。这一点与其他采用虚拟机（比如Java）的语言不尽相同。这样做的目的,是为了尽可能地优化代码、提高性能。下面是目前最常见的一些JavaScript虚拟机：
    
    Chakra(Microsoft Internet Explorer)
    Nitro/JavaScript Core (Safari)
    Carakan (Opera)
    SpiderMonkey (Firefox)
    V8 (Chrome, Chromium)    
  Chrome 
    js报错： Uncaught RangeError: Invalid string length
      原因：多重遍历过程中,重复使用变量i导致,把内for循环的变量i换成j.
  Firefox
  IE
  Safari
NodeJS环境 
--------------------------------------------------------------------------------
Webpack 模块加载器兼打包工具 
  介绍 
    把各种资源,如JS「含JSX」、coffee、样式「含less/sass」、图片等都作为模块来使用和处理,
    Webpack的工作方式是：把你的项目当做一个整体,通过一个给定的主文件（如：index.js）,
      Webpack将从这个文件开始找到你的项目的所有依赖文件,使用loaders处理它们,
      最后打包为一个浏览器可识别的JavaScript文件。
    支持3种引入方式: AMD commonjs ES6模块化
  命令行 命令
    webpack aoo.js boo.js // 将aoo.js文件打包成boo.js文件
    其他命令参数
    --watch 当文件更改时,自动打包
    --display-modules 打包完后显示依赖的文件
  webpack.config.js 配置文件  
    通过配置文件 webpack.config.js 来进行相应的配置
    目的: 在命令行中,当前文件夹下执行 webpack 命令,默认按照该配置文件来执行进行打包
    entry   str,arr,obj,入口文件 
      val1 : str,指定单一的入口文件
      val2 : arr,将多个文件打包在一起 
        如 [ './entry1.js' , 'entry2.js' ] 
      val3 : obj,key-val形式,对象的val可为val1、val2 的表现形式
        输出的打包后的文件和output参数有关,若output.filename 仍指定为一个值,
        则最后打包后的文件只有一个,结果是两个同名的文件产生覆盖的结果,
        output.filename 可采用占位符的形式来指定来打包成多个文件
        如 {
          page1 : './aoo.js',
          page2 : [ './entry1.js' , 'entry2.js' ] 
        }
    output  obj,指定打包的文件 
      path 指定打包后的文件的存放路径
      filename 指定打包后的文件的名称
        val1 : str,指定一固定的文件名称
        val2 : str+占位符,当穿在多个输出的文件时用于指定名称「如entry的val为obj时」
          [name]  表示entry的obj的key
          [hash]  表示打包时产生的hash值
          [chunkhash] chunk的hash值,相当于文件的MD5值「MD5值为了保证每个文件的唯一性」
          e.g.: filename : '[name]-[hash].js'
    plugins arr,使用插件,arr的元素为插件的初始化
      e.g.:
      var htmlWebpackPlugin = require("html-webpack-plugin");
        module.exports ={
          plugins: [
            new htmlWebpackPlugin(arg);
          ]
        }
    e.g.:  配置文件
      module.exports = {  // commonjs 模块化 输出
        entry : './src/main.js',   // 入口文件
        // 入口文件: 表示有将其他的文件通过AMD或commonjs等引入,且将该文件做为执行的入口
        output: {                  // 指定打包后的文件
          path : './dist/js',         // 指定路径
          filename : './bundle.js'    // 打包输出的文件名,「也可定义路径,会接着path后」
        },
        resolve : {
          root : [path.join(__dirname,'src')],
          extensions : ['','.ts','.js']
        },
        module : {
          loaders : [
            {test : /\.ts$/,loader : 'ts-loader'} // 定义各种 loaders
          ]
        }
      } 
  webpack 安装 
  loader,解释器 用于编译解释相应的文件 
    使用方式
      在 require 中声明 资源相应的编译 loader
        require("./loader!./dir/file.txt") ;
      通过 cli 进行配置
        webpack --moudle-bind jade --moudle-bind 'css=style!css' 
        // 指定了style和css 两个loader
      在配置文件中进行配置
        {
          module : {
            loaders : [
              {test: /\.jade$/ , loader : 'jade' },
              // 通过正则的test方将文件的后缀名法进行匹配
              // 匹配成功则使用 指定的loader
              {test: /\.css$/ , loader : 'style!css'},
              // 或者 {test: /\.css$/ , loader : ["style", "css"]},
            ] 
          }
        }
        e.g.：
          var htmlWebpackPlugin = require('html-webpack-plugin');
          var path = require("path");
          moudle.exports = {
            context : __dirname, // 指定当前上下文环境,即当前路径"./"的位置
            entry : './src/app.js',
            output : {
              path : '.dist',
              filename : 'js/[name].budle.js'
            },
            module : {
              loaders : [
                { test : /\.js$/,
                  loader : 'babel', // 通过 babel 对 JS文件进行编译
                  exclude : path.resolve(__dirname,'node_modules'), // 指定不用处理的部分
                  // 通过path「Node的API」将相对路径 node_modules 解析为绝对路径
                  include : './src/', // 指定处理的范围
                  query : {
                    presets : ['latest'] 
                    // 指定将 js 编译的版本,其他的如 ["es2015"] 等
                  }
                  // 可在 npm 的 package.json 中 指定
                  // "babel" : { "presets" : ["latest"] }
                  // 从而取消在此处指定 query 项
                },
                { html : /\.html$/,
                  loader : 'html-loader'
                },
                { test : /\.css$/,
                  loader : 'style-loader!css-loader?importLoader=1!postcss-loader', 
                  // importLoader=1 表示该Loader后的1个loader来处理css中import的css
                  // 或 loader : ["style-loader","css-loader"."postcss-loader"]
                  // 注: 解析的顺序为 从后向前,即postcss-loader先起作用
                  // css-loader 用于在JS中处理 css文件
                  // style-loader 用于将处理后的css插入到HTML中
                  // 使用 postcss-loader 的 autoprefixer 功能 将css属性添加前缀
                  // 需安装 postcss-loader 和 autoprefixer 
                },
                { test : /\.less$/,
                  loader : 'style!css!postcss!less', // 可以省略 -loader
                  // less-loader 会自动将 @import 引入的css属性增加浏览器前缀
                  // 故可省略 ?importLoader
                },
                { test : /\.sass$/,
                  loader : 'style!css!postcss!sass',
                },
                // { test : /\.(png|jpg|gif|svg)$/i, // 用于处理图片的「相对」路径
                //   // HTML、CSS中图片的相对路径会被替换
                //   // 组件模版中HTML内需如此使用 <img src="${require(../a.png)}"/>
                //   loader : 'file',
                //   query : {
                //     name :'assets/[name]-[hash:5].[ext]' , // 用于定义图片的路径
                //     // [name]、[hash]、[ext]都为占位符表示名字、哈希和后缀名
                //     // 其中 [hash:5] 表示取hash字符串中的5位
                //   }
                // },
                // { test : /\.(png|jpg|gif|svg)$/i, 
                //   loader : 'url', // 可以处理图片或文件
                //   query : {
                //     limit : 20000, // 20k,当图片小于该该值时,将被转换为base64
                //     // 否则交由 file-loader 来处理
                //     name :'assets/[name]-[hash:5].[ext]' , 
                //   }
                // },
                { test : /\.(png|jpg|gif|svg)$/i, 
                  loaders : [  // 指定多个loader
                    'url-loader?limit=1000&name=assets/[name]-[hash:5].[ext]',
                    'image-webpack' // 用于压缩图片,按照逆序会先执行压缩
                  ], 
                  }
                },
              ]
            },
            postcss : [
              require('autoprefixer')({
                browser : ['latest 5 versions'] , // 最近的5个浏览器的版本
              })
            ],
            或 
            // postcss : function(){
            //   return [
            //     require('autoprefixer')({
            //       browser : ['latest 5 versions'] , // 最近的5个浏览器的版本
            //     })
            //   ]
            // } ,
            plugins : [
              new htmlWebpackPlugin({
                filename : 'index.html',
                template : 'index.html',
                inject : 'body'
              })
            ]
          }
    Query Parameters,loader的配置参数
      在require时配置
        require("url-loader?mimetype=img/png!./file.png");
      在配置文件中进行配置
        {test: /\.png$/,loader : 'url-loader?mimetype=image/png'}
        // 或
        {
          test : /\.png$/,
          loader : 'url-loader',
          query : {mimetype : "image/png"}
        }
      在cli命令行中进行配置
  plugins,插件 
    html-webpack-plugin  在HTML文件中自动引入打包后的文件
      npm install html-webpack-plugin --save-dev // 安装插件
      webpack.config.js 中引用
        var htmlWebpackPlugin = require("html-webpack-plugin");
        module.exports = {
          entry : {
            main : './src/main.js',
            a : './src/a.js',
            b : './src/b.js',
          },  
          output: {   
            path : './dist/js',       
            filename : './bundle.js',
            publicPath : 'http://cdn.com/' // 代替 path 添加在 filename值的前面
          },
          resolve : {
            root : [path.join(__dirname,'src')],
            extensions : ['','.ts','.js']
          },
          module : {
            loaders : [
              {test : /\.ts$/,loader : 'ts-loader'} // 定义各种 loaders
            ]
          },
          plugins : [
            new htmlWebpackPlugin({ // 实例化
              template : './aoo.html' ,
              // 指定html文件做为模版,
              // 按照output的path路径中生成引入打包文件的该模版
              filename : 'aoo-[hash].html', // 指定生成的HTML的名称
              inject : 'head' ,  // 指定打包后的文件插入的位置,如 head中
              // false 则表示不放入到指定模版生成的文件中
              aoo : 'boo',   // 可以在模版文件中引用
              // 方式为 <?= htmlWebpackPlugin.options.aoo ?>
              minify : {  // 对按照模版生成的文件进行压缩
                removeComments : true , // 删除注释
                collapseWhitespace : true , // 删除空格 
              } , 
              chunks : ['main','a'] // 指定加载的打包后的文件,默认为所有
            }),
            new htmlWebpackPlugin({    
              template : './boo.html' ,
              filename : 'boo-[hash].html', 
              inject : 'body' ,  
              minify : {  
                removeComments : true , 
                collapseWhitespace : true , 
              } , 
              excludechunks : ['a'],  // 指定除了选中的打包后的文件
            }),
          ]
        }

        在模版文件中引用 htmlWebpackPlugin
          遍历取值
            遍历 htmlWebpackPlugin 
              <% for(key in htmlWebpackPlugin){%>
                <%= key %>
              <% } %>
              得到 files 和 options 两个对象
            遍历 htmlWebpackPlugin.files 和 htmlWebpackPlugin.options
              <% for(key in htmlWebpackPlugin.files){%>
                <%= key %> : <%= JSON.stringify(htmlWebpackPlugin.files[key])%> 
                // 通过 json.stringify 将对象字符串化
              <% } %>
              <% for(key in htmlWebpackPlugin.options){%>
                <%= key %> : <%= JSON.stringify(htmlWebpackPlugin.options[key])%> 
                // 通过 json.stringify 将对象字符串化
              <% } %>
          在模版中引入打包后的文件
            <script src="<%= htmlWebpackPlugin.files.chunk.xx.entry %>" charset="utf-8"></script>
            其中 xx 为 webpack.config.js 文件中 module.exports.entry 中定义的文件 
          在模版中插入打包后的文件的内容
            <script  type='text/javascript'>
              <%= compilation.asserts[htmlWebpackPlugin.files.chunks.main.entry.substr(htmlWebpackPlugin.files.publicPath.length)].source() %>
            </script>
Gulp 
  PS:gulp是前端开发过程中对代码进行构建的工具,是自动化项目的构建利器；
    她不仅能对网站资源进行优化,而且在开发过程中很多重复的任务能够使用正确的工具自动完成；
    使用她,我们不仅可以很愉快的编写代码,而且大大提高我们的工作效率。
    gulp是基于Nodejs的自动任务运行器,
    她能自动化地完成 javascript/coffee/sass/less/html/image/css 等文件的的测试、
    检查、合并、压缩、格式化、浏览器自动刷新、部署文件生成,
    并监听文件在改动后重复指定的这些步骤。
    在实现上,她借鉴了Unix操作系统的管道（pipe）思想,前一级的输出,直接变成后一级的输入,
    使得在操作上非常简单。
    gulp 和 grunt 非常类似,但相比于 grunt 的频繁 IO 操作,
    gulp 的流操作,能更快地更便捷地完成构建工作。
  全局安装gulp
    PS:全局安装gulp目的是为了通过她执行gulp任务；
    cnpm install gulp -g   安装
    gulp -v     查看是否正确安装,出现版本号即为正确安装
      //  CLI version 3.9.1
  新建 package.json 文件
    PS:package.json 是基于nodejs项目必不可少的配置文件,它是存放在项目根目录的普通json文件；
    手动新建配置文件
      它是这样一个json文件（注意：json文件内是不能写注释的,复制下列内容请删除注释）：
      {
        "name": "test",   //项目名称（必须）
        "version": "1.0.0",   //项目版本（必须）
        "description": "This is for study gulp project !",   //项目描述（必须）
        "homepage": "",   //项目主页
        "repository": {    //项目资源库
          "type": "git",
          "url": "https://git.oschina.net/xxxx"
        },
        "author": {    //项目作者信息
          "name": "surging",
          "email": "surging2@qq.com"
        },
        "license": "ISC",    //项目许可协议
        "devDependencies": {    //项目依赖的插件
          "gulp": "^3.8.11",
          "gulp-less": "^3.0.0"
        }
      }
    cnpm init 命令 命令提示符执行创建
      通过 cd命令 确定创建的位置,e.g.:进入到文件名为 testgulp的文件夹下
      cnpm init    创建 package.json 文件
      name: (testgulp) XXX       输入 XXX 作为项目名称,必须项,e.g.:testg
      version: (1.0.0) XXX       输入 XXX 作为项目版本,必须项,e.g.:1.0.0
      description: XXX           输入 XXX 作为项目描述,必须项,e.g.:this is a test
      entry point: (index.js)    定义入口文件,默认为括号内的
      test command:              测试命令,可选
      git repository:            git地址,可选
      keywords:                  关键字,可选
      author:                    作者信息,可选
      license: (ISC)             许可信息,可选
      Is this ok? (yes)    输入 y 确认创建
    cnpm help package.json     查看 package.json 帮助文档,会跳转网页
  本地安装gulp插件
    安装：定位目录命令后提示符执行cnpm install --save-dev；
    以gulp-less为例（编译less文件）,命令提示符执行cnpm install gulp-less --save-dev；
    将会安装在node_modules的gulp-less目录下,该目录下有一个 gulp-less 的使用帮助文档README.md；
    为了能正常使用,我们还得本地安装gulp：cnpm install gulp --save-dev；
      全局安装了gulp,项目也安装了gulp,
      全局安装gulp是为了执行gulp任务,本地安装gulp则是为了调用gulp插件的功能。
  新建 gulpfile.js 文件（重要）
    PS:gulpfile.js 是gulp项目的配置文件,
      是位于项目根目录的普通js文件（其实将 gulpfile.js 放入其他文件夹下亦可）。
    大概是这样一个js文件,主要配置:
      //导入工具包 require('node_modules里对应模块')
      var gulp = require('gulp'), //本地安装gulp所用到的地方
      less = require('gulp-less');
      
      //定义一个testLess任务（自定义任务名称）
      gulp.task('testLess', function () {
        gulp.src('src/less/index.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
      });
      
      //定义默认任务 elseTask为其他任务,该示例没有定义elseTask任务
      gulp.task('default',['testLess', 'elseTask']); 
      
      //gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
      //gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
      //gulp.dest(path[, options]) 处理完后文件生成路径
  运行gulp
    命令提示符执行 gulp 任务名称
    编译less：命令提示符执行 gulp testLess；
    当执行 gulp default 或 gulp 将会调用default任务里的所有任务[‘testLess’,’elseTask’]。
  使用webstorm运行gulp任务
    说明：使用webstorm可视化运行gulp任务；
    使用方法：
      将项目导入webstorm,右键gulpfile.js 选择”Show Gulp Tasks”打开Gulp窗口,
      若出现”No task found”,选择右键”Reload tasks”,双击要运行的任务即可。
Anythere 将当前目录变成一个静态文件服务器的根目录 
  npm install anywhere -g   npm全局安装anythere
  执行参数
    -p 指定端口,默认为8000,
      e.g.:
      anywhere -p 8000 
      可省略
      anywhere  8000 
    -s 静默执行不会自动打开浏览器,默认自动打开网页
Weinre,Web Inspector Remote  一种远程调试工具 
  PS:功能与Firebug、Webkit inspector类似,可以帮助我们即时更改页面元素、样式,调试JS等。
    由于Weinre的客户端是基于Web Inspector开发,而Web Inspector只兼容WebKit核心的浏览器,
    所以只能在Chrome/Safari浏览器打开Weinre客户端进行调试。
  三个端的含义：
    客户端(client)：本地的WebInspector,远程调试客户端。
    服务端(agent)：本地的HTTPServer,为目标页面与客户端建立通信。
    目标页面(target)：被调试的页面,页面已嵌入weinre的远程js。
  Weinre运行
    weinre -boundHost 192.168.0.102  -httpPort 8099   命令行键入 
      httpPort 为调试服务器运行的端口,默认8080;
      boundHost 调试服务器绑定的IP地址或域名,默认localhost,需改为本机地址 '192.168.0.102'
    添加 js到 所需的调试的html的头部
      <script src="http://192.168.0.102:8099/target/target-script-min.js#anonymous"></script> 
Grunt和Gulp的工作方式 
  在一个配置文件中,指明对某些文件进行类似编译,组合,压缩等任务的具体步骤,
  这个工具之后可以自动替你完成这些任务。
Bower 
--------------------------------------------------------------------------------
插件类工具
ueditor 百度编辑器 
  打开图片上传框反映缓慢慢
    将以下文件中的  'image/* '  改为  'image/jpg,image/jpeg,image/png' 即可
    文件
      'ueditor\dialogs\image\image.js'
      'ueditor.all.min.js'
    修改内容
      mimeTypes: 'image/*' 
      改为  
      mimeTypes: 'image/jpg,image/jpeg,image/png'  
    或者全局搜索将所有 'image/* '  改为  'image/jpg,image/jpeg,image/png'
--------------------------------------------------------------------------------
网络收集 
接口
  百度分类图片api
    PS： GET提交,返回JSON
      sort可以为0和1,作用。。未知
    URL：'http://image.baidu.com/data/imgs'
    参数：
      col  : '大类' // 如 美女
      tag  : '分类' // 小清新
      pn   : 开始条数
      rn   : 显示数量
      p    : 'channel'
      from : 1
      sort : 0
    e.g.:
      'http://image.baidu.com/data/imgs?col=美女&tag=小清新&pn=10&rn=10&p=channel&from=1&sort=0'
--------------------------------------------------------------------------------
技巧 实现 
  动态 rem 自适应布局.
    PS:rem 单位在做移动端的h5开发的时候是最经常使用的单位。
      采用js动态计算给文档的根节点 font-size 赋值,并以此为尺寸参考进行网页布局.
      可参考淘宝的布局.
    使用的时,将下面的代码放到页面的顶部（head标签内）；
    <script>
      function changeFont() {
        var originWidth =375; // 用来设置设计稿原型的屏幕宽度 此处以 Iphone 6为例
        var currClientWidth = document.documentElement.clientWidth;
        //设置屏幕的最大和最小值时设定一默认值
        if (currClientWidth > 640) { currClientWidth = 640; }
        if (currClientWidth < 320) { currClientWidth = 320; }
        document.documentElement.style.fontSize = currClientWidth /originWidth ;
        // 将 1rem 设置为相当于iPhone6 的 1px
      }
      changeFont();
      window.addEventListener('resize', changeFont, false); //注册 resize事件
    </script>
  spa 页面通信及状态维持
    不同页面间通过 sessionStorage 或 localStorage 实现消息传递
    同一页面内 刷新保持状态 分享链接可获取状态
      如上 情景 前提都是URL未变化同样要保持当前状态,故通过添加自定义的hash决解,
      通过hash来添加、解析状态,从而到达要求的效果
Question & Idea
--------------------------------------------------------------------以下待整理 
  Web Server
      如果希望向世界发布网站,则必须把它存放在web服务器上。
    e.g.: 网址如 'http://www.W3school.com.cn/html/index.asp'


