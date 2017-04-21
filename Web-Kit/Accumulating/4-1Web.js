介绍_概念_说明_定义
介绍
说明
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
微信 
微信开发介绍
  就是手机浏览器,只不过多了一些与微信的API对接的事情,微信也提供了很多jssdk,
  如果不想跟微信发生关系,就是一个手机网页
  正常是嵌入H5就可以了,需要微信登录、微信支付之类的功能,可以通过微信API进一步开发。
说明
  微信 6.1 版本以后,会自带QQ浏览器的X5内核,即使你没有安装QQ浏览器。  [?]
  webkit内核中的一些私有的meta标签,这些meta标签在开发webapp时起到非常重要的作用
    <meta content=”width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;” name=”viewport” /> 
    第一个meta标签表示：强制让文档的宽度与设备的宽度保持1:1,
    并且文档最大的宽度比例是1.0,且不允许用户点击屏幕放大浏览；

    <meta content=”yes” name=”apple-mobile-web-app-capable” /> 
    第二个meta标签是iphone设备中的safari私有meta标签,它表示：允许全屏模式浏览；

    <meta content=”black” name=”apple-mobile-web-app-status-bar-style” /> 
    第三个meta标签也是iphone的私有标签,它指定的iphone中safari顶端的状态条的样式；

    <meta content=”telephone=no” name=”format-detection” /> 
    第四个meta标签表示：告诉设备忽略将页面中的数字识别为电话号码。


    去除Android平台中对邮箱地址的识别
    看 过iOS webapp API的同学都知道iOS提供了一个meta标签:用于禁用iOS对页面中电话号码的自动识别。在iOS中是不自动识别邮件 地 址的,但在Android平台,它会自动检测邮件地址,当用户touch到这个邮件地址时,Android会弹出一个框提示用户发送邮件,如果你不 想 Android自动识别页面中的邮件地址,你不妨加上这样一句meta标签在head 中 1 <meta content=”email=no” name=”format-detection” />



    例子1：<a href="tel:400-4000-0000" >XXX</a>
    这个a标签里的href调用的是手机号码。当点击这个a标签的时候则弹出是否拨打该号码的提示。
    在手机浏览器中使用是没有任何问题的,
    但在微信中,在安卓系统手机,微信 5.0.1 以上版本时该标签就失效了。（最新的微信版本是否解决了这个问题目前还不清楚）。这种情况下,将：
    <a href="tel:400-4000-0000" >XXX</a>改为
    <a link="tel:400-4000-0000" >
    则可以解决部分安卓机型,（但不是全部的）,有些机型依然不行。
    这个和微信客户端有关。目前没有找到满意的解决办法。
WeUI：专为开发微信HTML5应用的开源Web UI组件库
  PS:WeUI是一套同微信原生视觉体验一致的基础样式库,
    为微信Web开发量身设计,可以令用户的使用感知更加统一。
    包含button、cell、dialog、toast、article、icon等各式元素。
  说明篇
    使用 dist/style 文件中的 weui.css 和 weui.min.css 两个文件
  起始
    需要在body标签中加入ontouchstart ,如: <body ontouchstart>
微信JS-SDK
  PS:微信JS-SDK是微信公众平台面向网页开发者提供的基于微信内的网页开发工具包。
    通过微信JS-SDK,网页开发者可使用拍照、选图、语音、位置等手机系统的能力,
    同时可以直接使用微信分享、扫一扫、卡券、支付等微信特有的能力。
  ?
    所有使用微信JS SDK的网站,都必须实名到微信认证、缴费。它采取了类似Apple App Store的策略,由系统运营方来保障用户的安全。
    所有能使用微信增强能力的网页都是经过认证权限的
  JSSDK使用步骤
    步骤一：绑定域名
      先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
      如果你使用了支付类接口,请确保支付目录在该安全域名下,否则将无法完成支付。
      备注：登录后可在“开发者中心”查看对应的接口权限。
    步骤二：引入JS文件
      在需要调用JS接口的页面引入如下JS文件
        http://res.wx.qq.com/open/js/jweixin-1.0.0.js
      使用https协议,务必引入 https://res.wx.qq.com/open/js/jweixin-1.0.0.js ,
        否则将无法在iOS9.0以上系统中成功使用JSSDK
      如需使用摇一摇周边功能,请引入 jweixin-1.1.0.js
      备注：支持使用 AMD/CMD 标准模块加载方法加载
    步骤三：通过config接口注入权限验证配置
      所有需要使用JS-SDK的页面必须先注入配置信息,否则将无法调用,
      同一个url仅需调用一次,对于变化url的SPA的web app可在每次url变化时进行调用,
      目前Android微信客户端不支持 pushState 的H5新特性,
      所以使用pushState来实现web app的页面会导致签名失败,此问题会在Android6.2中修复）。
      wx.config({
        debug: true, 
        // 开启调试模式,调用的所有api的返回值会在客户端alert出来,
        // 若要查看传入的参数,可以在pc端打开,参数信息会通过log打出,仅在pc端时才会打印。
        appId: '',    // 必填,公众号的唯一标识
        timestamp: ,  // 必填,生成签名的时间戳
        nonceStr: '', // 必填,生成签名的随机串
        signature: '',// 必填,签名,见附录1
        jsApiList: [] // 必填,需要使用的JS接口列表,所有JS接口列表见附录2
      });
    步骤四：通过ready接口处理成功验证
      wx.ready(function(){
        // config信息验证后会执行ready方法,所有接口调用都必须在config接口获得结果之后,
        // config是一个客户端的异步操作,所以如果需要在页面加载时就调用相关接口,则须把相关接口放在ready函数中调用来确保正确执行。
        // 对于用户触发时才调用的接口,则可以直接调用,不需要放在ready函数中。
      });
    步骤五：通过error接口处理失败验证
      wx.error(function(res){
        // config信息验证失败会执行error函数,如签名过期导致验证失败,
        // 具体错误信息可以打开config的debug模式查看,
        // 也可以在返回的res参数中查看,对于SPA可以在这里更新签名。
      });    
  接口调用说明
    PS:所有接口通过wx对象(也可使用jWeixin对象)来调用,参数是一个对象,
    除了每个接口本身需要传的参数之外,还有以下通用参数：
      success  接口调用成功时执行的回调函数。
      fail     接口调用失败时执行的回调函数。
      complete 接口调用完成时执行的回调函数,无论成功或失败都会执行。
      cancel   用户点击取消时的回调函数,仅部分有用户取消操作的api才会用到。
      trigger  监听Menu中的按钮点击时触发的方法,该方法仅支持Menu中的相关接口。
        不要尝试在trigger中使用ajax异步请求修改本次分享的内容,
        因为客户端分享操作是一个同步操作,这时候使用ajax的回包会还没有返回。
      以上几个函数都带有一个参数,类型为对象,
      其中除了每个接口本身返回的数据之外,还有一个通用属性errMsg,其值格式如下：
      调用成功时："xxx:ok" ,其中xxx为调用的接口名
      用户取消时："xxx:cancel",其中xxx为调用的接口名
      调用失败时：其值为具体错误信息    
  基础接口
    判断当前客户端版本是否支持指定JS接口
    wx.checkJsApi({
      jsApiList: ['chooseImage'], // 需要检测的JS接口列表,所有JS接口列表见附录2,
      success: function(res) {
        // 以键值对的形式返回,可用的api值true,不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
      }
    });
    备注：checkJsApi接口是客户端6.0.2新引入的一个预留接口,第一期开放的接口均可不使用checkJsApi来检测。
  分享接口
    请注意不要有诱导分享等违规行为,对于诱导分享行为将永久回收公众号接口权限,详细规则请查看：朋友圈管理常见问题 。
    获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
    wx.onMenuShareTimeline({
        title: '', // 分享标题
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        success: function () { 
            // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    });
    获取“分享给朋友”按钮点击状态及自定义分享内容接口
      wx.onMenuShareAppMessage({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        type: '', // 分享类型,music、video或link,不填默认为link
        dataUrl: '', // 如果type是music或video,则要提供数据链接,默认为空
        success: function () { 
          // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
          // 用户取消分享后执行的回调函数
        }
      });
    获取“分享到QQ”按钮点击状态及自定义分享内容接口
      wx.onMenuShareQQ({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        success: function () { 
          // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
          // 用户取消分享后执行的回调函数
        }
      });
    获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
      wx.onMenuShareWeibo({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        success: function () { 
          // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
          // 用户取消分享后执行的回调函数
        }
      });
    获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
      wx.onMenuShareQZone({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        success: function () { 
          // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
          // 用户取消分享后执行的回调函数
        }
      });
  图像接口
    拍照或从手机相册中选图接口
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图,默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机,默认二者都有
        success: function (res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表,localId可以作为img标签的src属性显示图片
        }
      });
    预览图片接口
      wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: [] // 需要预览的图片http链接列表
      });
    上传图片接口
      wx.uploadImage({
          localId: '', // 需要上传的图片的本地ID,由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1,显示进度提示
          success: function (res) {
              var serverId = res.serverId; // 返回图片的服务器端ID
          }
      });
      备注：上传图片有效期3天,可用微信多媒体接口下载图片到自己的服务器,此处获得的 serverId 即 media_id,参考文档 ../12/58bfcfabbd501c7cd77c19bd9cfa8354.html 目前多媒体文件下载接口的频率限制为10000次/天,如需要调高频率,请邮件weixin-open@qq.com,邮件主题为【申请多媒体接口调用量】,请对你的项目进行简单描述,附上产品体验链接,并对用户量和使用量进行说明。
    下载图片接口
      wx.downloadImage({
          serverId: '', // 需要下载的图片的服务器端ID,由uploadImage接口获得
          isShowProgressTips: 1, // 默认为1,显示进度提示
          success: function (res) {
              var localId = res.localId; // 返回图片下载后的本地ID
          }
      });
  音频接口
    开始录音接口 
      wx.startRecord();
    停止录音接口   
      wx.stopRecord({
          success: function (res) {
              var localId = res.localId;
          }
      });
    监听录音自动停止接口
      wx.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
        complete: function (res) {
          var localId = res.localId; 
        }
      });
    播放语音接口
      wx.playVoice({
          localId: '' // 需要播放的音频的本地ID,由stopRecord接口获得
      });
    暂停播放接口
      wx.pauseVoice({
          localId: '' // 需要暂停的音频的本地ID,由stopRecord接口获得
      });
    停止播放接口
      wx.stopVoice({
          localId: '' // 需要停止的音频的本地ID,由stopRecord接口获得
      });
    监听语音播放完毕接口
      wx.onVoicePlayEnd({
          success: function (res) {
              var localId = res.localId; // 返回音频的本地ID
          }
      });
    上传语音接口
      wx.uploadVoice({
          localId: '', // 需要上传的音频的本地ID,由stopRecord接口获得
          isShowProgressTips: 1, // 默认为1,显示进度提示
              success: function (res) {
              var serverId = res.serverId; // 返回音频的服务器端ID
          }
      });
      备注：上传语音有效期3天,可用微信多媒体接口下载语音到自己的服务器,此处获得的 serverId 即 media_id,参考文档 ../12/58bfcfabbd501c7cd77c19bd9cfa8354.html 目前多媒体文件下载接口的频率限制为10000次/天,如需要调高频率,请邮件weixin-open@qq.com,邮件主题为【申请多媒体接口调用量】,请对你的项目进行简单描述,附上产品体验链接,并对用户量和使用量进行说明。
    下载语音接口
      wx.downloadVoice({
          serverId: '', // 需要下载的音频的服务器端ID,由uploadVoice接口获得
          isShowProgressTips: 1, // 默认为1,显示进度提示
          success: function (res) {
              var localId = res.localId; // 返回音频的本地ID
          }
      });
  识别音频并返回识别结果接口
    wx.translateVoice({
       localId: '', // 需要识别的音频的本地Id,由录音相关接口获得
        isShowProgressTips: 1, // 默认为1,显示进度提示
        success: function (res) {
            alert(res.translateResult); // 语音识别的结果
        }
    });
  获取网络状态接口
    wx.getNetworkType({
        success: function (res) {
            var networkType = res.networkType; // 返回网络类型2g,3g,4g,wifi
        }
    });
  地理位置
    使用微信内置地图查看位置接口
      wx.openLocation({
        latitude: 0, // 纬度,浮点数,范围为90 ~ -90
        longitude: 0, // 经度,浮点数,范围为180 ~ -180。
        name: '', // 位置名
        address: '', // 地址详情说明
        scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
    });
    获取地理位置接口
      wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标,如果要返回直接给openLocation用的火星坐标,可传入'gcj02'
          success: function (res) {
              var latitude = res.latitude; // 纬度,浮点数,范围为90 ~ -90
              var longitude = res.longitude; // 经度,浮点数,范围为180 ~ -180。
              var speed = res.speed; // 速度,以米/每秒计
              var accuracy = res.accuracy; // 位置精度
          }
      });
    摇一摇周边
      开启查找周边ibeacon设备接口
      wx.startSearchBeacons({
        ticket:"",  //摇周边的业务ticket, 系统自动添加在摇出来的页面链接后面
        complete:function(argv){
          //开启查找完成后的回调函数
        }
      });
      备注：上述摇一摇周边接口使用注意事项及更多返回结果说明,请参考：摇一摇周边获取设备信息
    备注：如需接入摇一摇周边功能,请参考：申请开通摇一摇周边
    关闭查找周边ibeacon设备接口
      wx.stopSearchBeacons({
        complete:function(res){
          //关闭查找完成后的回调函数
        }
      });
    监听周边ibeacon设备接口
      wx.onSearchBeacons({
        complete:function(argv){
          //回调函数,可以数组形式取得该商家注册的在周边的相关设备列表
        }
      });
  界面操作
    隐藏右上角菜单接口
      wx.hideOptionMenu();
    显示右上角菜单接口
      wx.showOptionMenu();
    关闭当前网页窗口接口
      wx.closeWindow();
    批量隐藏功能按钮接口
      wx.hideMenuItems({
          menuList: [] // 要隐藏的菜单项,只能隐藏“传播类”和“保护类”按钮,所有menu项见附录3
      });
    批量显示功能按钮接口
      wx.showMenuItems({
          menuList: [] // 要显示的菜单项,所有menu项见附录3
      });
    隐藏所有非基础按钮接口
      wx.hideAllNonBaseMenuItem();
      // “基本类”按钮详见附录3
    显示所有功能按钮接口
      wx.showAllNonBaseMenuItem();
    微信扫一扫
      调起微信扫一扫接口
      wx.scanQRCode({
        needResult: 0, // 默认为0,扫描结果由微信处理,1则直接返回扫描结果,
        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码,默认二者都有
        success: function (res) {
          var result = res.resultStr; // 当needResult 为 1 时,扫码返回的结果
        }
      });    
  跳转微信商品页接口
    wx.openProductSpecificView({
      productId: '', // 商品id
      viewType: '' // 0.默认值,普通商品详情页1.扫一扫商品详情页2.小店商品详情页
    });    
  微信卡券
    微信卡券接口中使用的签名凭证api_ticket,与步骤三中config使用的签名凭证jsapi_ticket不同,开发者在调用微信卡券JS-SDK的过程中需依次完成两次不同的签名,并确保凭证的缓存。
    获取api_ticket
      api_ticket 是用于调用微信卡券JS API的临时票据,有效期为7200 秒,通过access_token 来获取。
    开发者注意事项：
      1.此用于卡券接口签名的api_ticket与步骤三中通过config接口注入权限验证配置使用的jsapi_ticket不同。
      2.由于获取api_ticket 的api 调用次数非常有限,频繁刷新api_ticket 会导致api调用受限,影响自身业务,开发者需在自己的服务存储与更新api_ticket。
    接口调用请求说明
      http请求方式: GET
      https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=wx_card
    参数说明
      参数	是否必须	说明
      access_token	是	调用接口凭证
      返回数据
    数据示例：
      {
        "errcode":0,
        "errmsg":"ok",
        "ticket":"bxLdikRXVbTPdHSM05e5u5sUoXNKdvsdshFKA",
        "expires_in":7200
      }
      参数名	描述
      errcode	错误码
      errmsg	错误信息
      ticket	api_ticket,卡券接口中签名所需凭证
      expires_in	有效时间    
    拉取适用卡券列表并获取用户选择信息
      wx.chooseCard({
        shopId: '', // 门店Id
        cardType: '', // 卡券类型
        cardId: '', // 卡券Id
        timestamp: 0, // 卡券签名时间戳
        nonceStr: '', // 卡券签名随机串
        signType: '', // 签名方式,默认'SHA1'
        cardSign: '', // 卡券签名
        success: function (res) {
          var cardList= res.cardList; // 用户选中的卡券列表信息
        }
      });
      参数名	必填	类型	示例值	描述
      shopId	否	string(24)	1234	门店ID。shopID用于筛选出拉起带有指定location_list(shopID)的卡券列表,非必填。
      cardType	否	string(24)	GROUPON	卡券类型,用于拉起指定卡券类型的卡券列表。当cardType为空时,默认拉起所有卡券的列表,非必填。
      cardId	否	string(32)	p1Pj9jr90_SQRaVqYI239Ka1erk	卡券ID,用于拉起指定cardId的卡券列表,当cardId为空时,默认拉起所有卡券的列表,非必填。
      timestamp	是	string(32)	14300000000	时间戳。
      nonceStr	是	string(32)	sduhi123	随机字符串。
      signType	是	string(32)	SHA1	签名方式,目前仅支持SHA1
      cardSign	是	string(64)	abcsdijcous123	签名。
      cardSign详见附录4。开发者特别注意：签名错误会导致拉取卡券列表异常为空,请仔细检查参与签名的参数有效性。
      
      特别提醒
      拉取列表仅与用户本地卡券有关,拉起列表异常为空的情况通常有三种：签名错误、时间戳无效、筛选机制有误。请开发者依次排查定位原因。    
    批量添加卡券接口
      wx.addCard({
          cardList: [{
              cardId: '',
              cardExt: ''
          }], // 需要添加的卡券列表
          success: function (res) {
              var cardList = res.cardList; // 添加的卡券列表信息
          }
      });
      cardExt详见附录4,值得注意的是,这里的card_ext参数必须与参与签名的参数一致,格式为字符串而不是Object,否则会报签名错误。    
    查看微信卡包中的卡券接口
      wx.openCard({
          cardList: [{
              cardId: '',
              code: ''
          }]// 需要打开的卡券列表
      });
    核销后再次赠送卡券接口
      wx.consumeAndShareCard({
          cardId: '',
          code: ''
      });
      参数说明：
      
      参数	说明
      cardId	上一步核销的card_id,若传入错误的card_id会报错
      code	上一步核销的code,若传入错误的code会报错
      注意：
      
      该接口只支持微信6.3.6以上版本的客户端,开发者在调用时需要注意两点：
      
      1.需要引入1.1.0版本的js文件： https://res.wx.qq.com/open/js/jweixin-1.1.0.js
      
      2.需要判断用户客户端版本号,做出容错处理,详情点击：判断当前客户端版本是否支持指定JS接口
    发起一个微信支付请求
      wx.chooseWXPay({
          timestamp: 0, // 支付签名时间戳,注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: '', // 支付签名随机串,不长于 32 位
          package: '', // 统一支付接口返回的prepay_id参数值,提交格式如：prepay_id=***）
          signType: '', // 签名方式,默认为'SHA1',使用新版支付需传入'MD5'
          paySign: '', // 支付签名
          success: function (res) {
              // 支付成功后的回调函数
          }
      });
      备注：prepay_id 通过微信支付统一下单接口拿到,paySign 采用统一的微信支付 Sign 签名生成方法,注意这里 appId 也要参与签名,appId 与 config 中传入的 appId 一致,即最后参与签名的参数有appId, timeStamp, nonceStr, package, signType。
      请注意该接口只能在你配置的支付目录下调用,同时需确保支付目录在JS接口安全域名下。
      微信支付开发文档：https://pay.weixin.qq.com/wiki/doc/api/index.html
遇到的问题
  ios 
    滑动当前
--------------------------------------------------------------------------------
webpack 模块加载器兼打包工具 
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
  插件 
    html-webpack--plugin  在HTML文件中自动引入打包后的文件
      npm install html-webpack-plugin --save-dev // 安装插件
      webpack.config.js 中引用
        var htmlWebpackPlugin = require("html-webpack-plugin");
        module.exports = {
          plugins : [
            new htmlWebpackPlugin({ // 实例化
              template : './index.html' ,
              // 指定html文件做为模版,
              // 按照output的path路径中生成引入打包文件的该模版
              filename : 'index-[hash].html', // 指定生成的HTML的名称
              injection : 'head'  // 指定打包后的文件插入的位置,如 head中
            }),
          ]
        }
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
Anythere  将当前目录变成一个静态文件服务器的根目录 
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


