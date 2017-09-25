操作系统相关 
  'path'环境变量 
    执行命令时,优先到path指定的路径中去寻找
  REPL'Read Eval Print Loop'交互式解释器 
    '读取-求值-输出 循环'表示一个电脑的环境 
    类似Windows系统的终端或Unix/Linux shell,可在终端中输入命令,并接收系统的响应
Shell: 用户和Linux内核之间的接口程序 
  PS: 一种命令语言解释器'command-language interpreter',
    在提示符下输入的命令由shell先解释然后传给Linux内核 
    shell也能被系统中其他有效的Linux实用程序和应用程序所调用 
    在成功地登录进入系统后shell启动,并始终作为与系统内核的交互手段直至退出系统 
    shell自身也是一个解释型的程序设计语言,支持在高级语言里所能见到的绝大多数程序控制结构,
    比如循环,函数,变量和数组,任何在提示符下能键入的命令也能放到一个可执行的shell程序里,
  命令的执行 
    命令分两种 
    内建的shell命令集: 包含在Linux bash内部的,比如打印当前工作目录命令'pwd' 
    其他命令: 比如拷贝命令'cp'和移动命令'rm',是存在于文件系统中某个目录下的单独的程序 
      这里的应用程序可以是Linux本身的实用程序,比如ls 和 rm,
      也可以是购买的商业程序,比如 xv,或者是公用软件（public domain software）,就象 ghostview。
      然后shell 试着在搜索路径($PATH)里寻找这些应用程序。
      搜索路径是一个能找到可执行程序的目录列表。
    shell 首先检查命令是否是内部命令,不是的话再检查是否是一个应用程序,
    如果你键入的命令不是一个内部命令并且在路径里没有找到这个可执行文件,将会显示一条错误信息。
    而如果命令被成功的找到的话,shell的内部命令或应用程序将被分解为系统调用并传给Linux内核。
  常用的shell: 
     Linux和UNIX系统里可使用多种不同的shell 
     最常用的几种是'Bourne shell'sh,'C shell'csh,和'Korn shell'ksh, 
     'tcsh'[csh 的扩展],'bash'[sh的扩展],和'pdksh'[ksh的扩展];
Bash: 大多数'Linux'及'Mac OS X'系统默认的shell 
  特性: 
    'Command-Line Completion'命令补齐: 使用tab主动补全 
    'Job Control'作业控制: 控制当前正在运行的进程的行为 
      PS: 当一个命令在前台被运行时,它会禁止用户与shell的交互,直到该命令结束
        如果要运行的命令要花费很长的时间的话,通常会把它放到后台,以便能在前台继续输入其他命令
      ctrl-z 使一个运行的进程挂起
      bg 命令使一个被挂起的进程在后台恢复运行 
      fg 命令使进程在前台恢复运行 
      Example: 
        control-z  // 使命令挂起 
        bg         // 后台运行 
  提示符 
    bash有两级用户提示符
    第一级是bash在等待命令输入时的提示符。默认的一级提示符是'$',如果是超级用户是'#'
      PS1="xx"  // 将一级提示符改为指定字符串  
    当bash期待输入更多的信息以完成命令时显示第二级提示符。缺省的第二级提示符是'>' 
      PS2="xx"  // 将二级提示符改为指定字符串   
    另外可以用特殊的字符来定义提示符,下面的列表列出了最常用的特殊字符 
      提示符特殊字符代码
      字符     含义 
      \!       显示该命令的历史记录编号
      \#       显示当前命令的命令编号
      \$       显示$符作为提示符,如果用户是root的话,则显示#
      \/       显示反斜杠 
      \d       显示当前日期 
      \h       显示主机名 
      \n       打印新行 
      \nnn     显示nnn的八进制值 
      \s       显示当前运行的shell的名字 
      \t       显示当前时间 
      \u       显示当前用户的用户名 
      \W       显示当前工作目录的名字 
      \w       显示当前工作目录的路径 
  通配符 
    支持的三种通配符：
    *      匹配任何字符和任何数目的字符
    ?      匹配任何单字符
    [...]  匹配任何包含在括号里的单字符 
      [123] 或 [1-3] 表示数字'1''2''3'中的一个
  bash变量 
    最常用的bash变量: 
    PATH       bash寻找可执行文件的搜索路径
    PWD        当前工作目录
    HOME       当前用户的用户目录
    SECONDS    当前shell开始后所流逝的秒      
    OLDPWD     前一个工作目录
    PS1        命令行的一级提示符
    PS2        命令行的二级提示符
    EDITOR, FCEDIT  bsah fc 命令的缺省编辑器 
    HISTFILE        用于贮存历史命令的文件 
    HISTSIZE        历史命令列表的大小
  在初始化文件中配置bash 
    Windows中,在'./Git/etc/bash.bashrc'文件中写入,进行永久别名配置 
      alias xx1='xxx1'
      alias xx2='xxx2'
    bash在每次启动时都读取这个文件,并执行所有包含的命令 
  ◆命令归纳  
  "<"输入重定向 
  '>'输出重定向 
    可将输入的内容放置到文件中
    可把一个命令的输出当作另一个命令的输入[更简单的方法是使用管道]
    Example:
      ls > directory.out //  把ls命令的输出保存为'directory.out'的文件
  '|'管道 
    可把一系列命令连接起来,将上一个命令的输出通过管道传给下一个命令的输入
    最终输出的结果为管道行中最后一个命令的输出 
    Example: 
      cat sample.text | grep "High" | wc -l  // 返回文件中,有'High'的行数 
      // cat <filename>   列出一个文件的内容
      // grep <str>    列出存在str的所有行
      // wc -l         统计输入里的行数 
  历史操作 
    history   以列表形式显示所有历史命令 
    history <num> 仅有最后num个历史命令会被列出 
    history [-r|w|a|n] [<filename>] 
      -r  读命令历史列表文件的内容并且把它们当作当前的命令历史列表
      -w  选项将把当前的命令历史记录写入文件中并覆盖文件原来的内容
      -a  选项把当前的命令历史记录追加到文件中
      -n  选项将读取文件中的内容并加入到当前历史命令列表中
      filename 默认用变量 HISTFILE 的值来代替  
    fc [-e editor_name] [-n] [-l] [-r] [first] [last] 编辑历史命令 
      -e editor_name   指定用于编辑命令的文本编辑器 
        默认以变量FCEDIT的值来代替,如果该变量不存在的话,则用变量EDITOR的值来代替,都不存在的话将使用vi编辑器
      first 和 last   用于选择列出历史命令的范围,既可以是数字也可以是字符串
      -n   选项禁止列出命令的编号。
      -r   选项反向列出匹配的命令。
      -l   选项把匹配的命令行列在屏幕上,而不是在编辑器中 
  别名 
    alias   显示已定义的别名 
    alias <xx>=<'xxx'>  定义临时别名,使用xx来代替'xxx'[退出bash后失效] 
      在定义别名时,等号的两头不能有空格,当命令中包含有空格或特殊字符时需要引号 
      若定义的别名和原本的命令名字相同,可使用 \<command> 来执行原原命令 
    unalias <xx>  取消xx临时别名 
  ◆其他命令 
  快捷键 
    ctrl+d  退出命令行 
  命令行 
    clear   清空命令行输出 
    curl <url>  在命令行中显示根据URL获取到的网页内容 
    echo <xx>   在命令行显示 
      str  直接显示 
      $PATH  显示环境变量 
    export 使变量的值对当前shell的所有子进程都可见 。
    help   显示bash内部命令的帮助信息。
    kill   终止某个进程
  文件相关操作 
    cd <xx> 进入目录 
      cd /   进入根目录 
      cd ~   进入当前用户home目录 
    ls [<name>] [<options>] 查看文件夹的文件 
      <options>  配置项 
        -a    查看所有文件[包括隐藏文件]  
        -al   查看所有文件的详细信息
    ll [<name>]  查看文件夹的文件详情 
    pwd   查看当前完整路径 
    env   查看所有环境变量 
    mkdir <name>   创建文件夹 
    touch <fileName> 新建文件 
    cp <fileName>  复制文件 
    rm <name>    删除文件 
    rm <name> -rf  删除文件夹 
    mv <name> <newName>  重命名 
  执行程序 
    which <name>  查看程序位置 
      如 which node ,which vue 
    where <name>  查看程序位置 
      如 where node 
    atom <path>  用Atom打开文件夹 
Git bash: 在Windows系统中使用Bash命令 
windows命令行: 类似于Linux的shell  
  PS:命令行程序为cmd.exe,一个32位的命令行程序,
    实际上很多Windows中的操作只能通过命令来实现;windows命令行中文件名不区分大小写;
  命令 快捷键 操作
  快捷键 
    鼠标右键     粘贴
    up/down     选择历史命令
    F7          显示命令历史记录
    Esc         清除当前命令行
    ctrl+c      强行中止命令执行
    ctrl+d      退出其他运行环境或推出命令行程序 
    F9          按编号选择命令[从0开始] 
    ctrl+h      和删除backspace功能相同
    alt+printScreen   截取当前命令窗[需在画板中粘贴]
    enter[选中文字下]  复制
  文件操作类 
    cd XX      进入XX文件夹
      cd ./    当前文件夹
      cd ../   到上级文件夹
      cd /     到该磁盘的根目录
      cd \     到该磁盘的根目录
    <x>:       进入磁盘
      Example: : e:  进入到E盘 ;  c:  进入到c盘
    dir        列出目录下的所有文件
    mkdir      创建文件夹
    <fileName> 运行/打开该文件[前提是可运行的程序、批处理文件等,可以不带格式后缀]
    type <fileName> 参看文件内容
    start <folderName> 打开文件夹
  命令行相关 
    cls       清屏 
  信息查看类 
    ping <域名>   查询IP地址  
    winver    检查Windows版本
    ipconfig  显示当前的TCP/IP配置的设置值
      ipconfig /all:显示本机TCP/IP配置的详细信息；
      ipconfig /release:DHCP客户端手工释放IP地址；
      ipconfig /renew:DHCP客户端手工向服务器刷新请求；
      ipconfig /flushdns:清除本地DNS缓存内容；
      ipconfig /displaydns:显示本地DNS内容；
      ipconfig /registerdns:DNS客户端手工向服务器进行注册；
      ipconfig /showclassid:显示网络适配器的DHCP类别信息；
      ipconfig /setclassid:设置网络适配器的DHCP类别。
      ipconfig /renew “Local Area Connection”:更新“本地连接”适配器的由 DHCP 分配 IP 地址的配置
      ipconfig /showclassid Local*:显示名称以 Local 开头的所有适配器的 DHCP 类别 ID
      ipconfig /setclassid “Local Area Connection” TEST:将“本地连接”适配器的 DHCP 类别 ID 设置为 TEST        
    cmd       CMD命令提示符
      cmd.exe  完整写法
    Nslookup  IP地址侦测器
    netstat -an   (TC)命令检查接口
    nslookup      网络管理的工具向导
  系统控制类 
    shutdown -s   30 秒后关机 
  打开应用类 
    explorer     打开资源管理器
    calc         启动计算器
    mspaint      画图板
    write        写字板
    eudcedit     造字程序
    magnify      放大镜实用程序
    dvdplay      DVD播放器
    taskmgr      任务管理器
    devmgmt.msc  设备管理器
    diskmgmt.msc 磁盘管理实用程序
    notepad      打开记事本
    osk          打开屏幕键盘
    fsmgmt.msc   共享文件夹管理器
    narrator     屏幕“讲述人”
    Msconfig.exe 系统配置实用程序
    eventvwr     事件查看器
    charmap      启动字符映射表
    utilman      辅助工具管理器
    wiaacmgr     扫描仪和照相机向导[需要安装] 
    services.msc 本地服务设置
    certmgr.msc  证书管理实用程序
    compmgmt.msc 计算机管理
    sfc.exe      系统文件检查器
    perfmon.msc  计算机性能监测程序
    regedit.exe  注册表
    regedt32     注册表编辑器
    cleanmgr     垃圾整理
    wmimgmt.msc  打开windows管理体系结构[WMI]
    sigverif     文件签名验证程序
    wscript      windows脚本宿主设置
    mmc          打开控制台
    dxdiag       检查DirectX信息
    chkdsk.exe   Chkdsk磁盘检查
  其他待整理 
    wupdmgr      windows更新程序
    winchat      XP自带局域网聊天
    mstsc        远程桌面连接
    mobsync      同步命令
    dcomcnfg     打开系统组件服务
    ddeshare     打开DDE共享设置
    shrpubw      创建共享文件夹
    syskey       系统加密,一旦加密就不能解开,保护windows xp系统的双重密码
    sfc /scannow windows文件保护
    tsshutdn     60 秒倒计时关机命令
    rononce -p   15 秒关机
    regsvr32 /u *.dll         停止dll文件运行
    regsvr32 /u zipfldr.dll   取消ZIP支持
    cliconfg      SQL SERVER 客户端网络实用程序
    conf          启动netmeeting
    odbcad32      ODBC数据源管理器
    logoff        注销命令
    net stop messenger   停止信使服务
    net start messenger  开始信使服务
--------------------------------------------------------------------------------
◆名词&术语  
  缩写词 
    bin   binary 二进制 
    src   source 来源 
    dist  distribute 分发 
    dest  destination 目的地 
    repo  repository 仓库 
    spec  specification 说明书 
  简写词 
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
◆约定常识 
文件的MD5值: 为了保证每个文件的唯一性,通过判断MD5值来确定文件是否更改 
HSL 色彩模式,工业界的一种颜色标准 
  PS: 通过'H''S''L'三个颜色通道的变化及其相互叠加来得到各种颜色 
  H'hue'色调[0-360]: 代表的是人眼所能感知的颜色范围 
    颜色分布在一个平面的色相环上,取值范围是0°到360°的圆心角,每个角度可以代表一种颜色。
    六大主色作基本参照:
    360°/0° 红
    60°     黄
    120°    绿
    180°    青
    240°    蓝
    300°    洋红
    0-119   表示红区 
    120-239 表示绿区 
    240-359 表示蓝区 
  S'saturation'饱和度[0-100%]: 指的是色彩的饱和度
    用'0%-100%'的值描述了相同色相、明度下色彩纯度的变化。
    数值越大,颜色中的灰色越少,颜色越鲜艳,呈现一种从灰度到纯色的变化
  L'lightness'亮度[0-100%]: 指的是色彩的明度,作用是控制色彩的明暗变化 
    取值'0%-100%',数值越小,色彩越暗,越接近于黑色;数值越大,色彩越亮,越接近于白色
编码 
  ANSI  本地编码[不代表具体的编码]
    如在简体版windows上它表示GB2312编码,繁体版windows上它表示Big5编码,
  UTF-8 
常用MIME类型 
  后缀名   MIME名称
  ◆文本 
  *.txt    text/plain    
  *.htm    text/html    
  *.html   text/html    
  *.xml    text/xml, application/xml    
  *.css    text/css
  *.csv    text/csv
  *.js     text/javascript, application/javascript    
  ◆图片 
  *.dwg    image/vnd.dwg    
  *.dxf    image/vnd.dxf
  *.gif    image/gif    
  *.jp2    image/jp2    
  *.jpe    image/jpeg
  *.jpeg   image/jpeg
  *.jpg    image/jpeg    
  *.png    image/png    
  *.svf    image/vnd.svf    
  *.tif    image/tiff    
  *.tiff   image/tiff    
  ◆音频 
  *.3gpp   audio/3gpp, video/3gpp
  *.ac3    audio/ac3
  *.au     audio/basic
  *.mp2    audio/mpeg, video/mpeg    
  *.mp3    audio/mpeg    
  *.mp4    audio/mp4, video/mp4    
  ◆视频 
  *.mpeg   video/mpeg    
  *.mpg    video/mpeg    
  ◆其他
  *.doc    application/msword    
  *.asf    allpication/vnd.ms-asf
  *.dot    application/msword    
  *.dtd    application/xml-dtd    
  *.json   application/json    
  *.mpp    application/vnd.ms-project    
  *.ogg    application/ogg, audio/ogg    
  *.pdf    application/pdf    
  *.pot    application/vnd.ms-powerpoint    
  *.pps    application/vnd.ms-powerpoint    
  *.ppt    application/vnd.ms-powerpoint    
  *.rtf    application/rtf, text/rtf    
  *.wdb    application/vnd.ms-works    
  *.wps    application/vnd.ms-works    
  *.xhtml  application/xhtml+xml    
  *.xlc    application/vnd.ms-excel    
  *.xlm    application/vnd.ms-excel    
  *.xls    application/vnd.ms-excel    
  *.xlt    application/vnd.ms-excel    
  *.xlw    application/vnd.ms-excel    
  *.xlsx   application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
  *.zip    aplication/zip    
URI&URL&URN 资源标识定位 
  PS: 'URL'和'URN'都是'URI'的子集
  URI'Uniform Resource Identifier'统一资源标识符 
    一个用于标识某一互联网资源名称的字符串
    该种标识允许用户对任何[包括本地和互联网的]资源通过特定的协议进行交互操作
    URI由包括确定语法和相关协议的方案所定义
    Web上可用的每种资源[HTML文档、图像、视频片段、程序等]由一个通用资源标识符进行定位
  URL'Uniform Resource Locator'统一资源定位符[也叫网址] 
    PS:从互联网上得到的资源的位置和访问方法的一种简洁的表示,是互联网上标准资源的地址 
      互联网上的每个文件都有一个唯一的URL,它包含的信息指出文件的位置以及浏览器应该怎么处理它
      使用ASCII代码的一部分来表示互联网的地址,
      一般统一资源定位符的开始标志着一个计算机网络所使用的网络协议。
      可以由单词组成,或者是因特网协议[IP]地址如:'162.168.1.253';
      用于定位万维网上的文档或其他数据
    'scheme://host.domain:port/path/fileName'  语法规则
      scheme  定义因特网服务的类型
        http   超文本传输协议,以'http://'开头的普通网页,不加密
        https  安全超文本传输协议,安全网页,加密所有信息交换
        ftp    文件传输协议,用于将文件下载或上传至网站
        file   本地计算机上的文件
      host    定义域主机,http的默认主机是www
      domain  定义因特网域名,如W3school.com.cn
      port    定义主机上的端口号,http的默认端口号是80
      path    定义服务器上的路径,若省略,则文档必须位于网站的根目录中
      fileName  定义文档/资源的名称
    网页地址字符编码 : 将字符转换为可通过因特网传输的格式
      URL只能使用ASCII字符集来通过因特网进行发送,
      由于URL常常会包含ASCII集合之外的字符,URL必须转换为有效的ASCII格式
      URL编码使用%其后跟随两位的十六进制数来替换非ASCII字符
      URL不能包含空格,URL编码通常使用'20%'来替换空格
    'file_path'文件路径访问
      /fileName    表示根目录下的文件
      ./filename   表示当前文件夹中的某个文件
      ../filename  表示上一层文件夹中的某个文件
      绝对路径: 提供目标文档的完整主机名称、路径信息及文档全称
      相对路径:
        同级,直接书写目标文档全称: fileName,如 boo.js;
        上一级,书写为:folderName/fileName;
        ../ 表示上一级目录; ./ 表示当前目录; / 表示相对根路径
  URN'Uniform Resource Name'通过名称来识别资源,和位置无关  
'Socket'套接字: 源IP地址及其端口号和目的IP地址及其端口号的组合称为套接字 
  用于标识客户端请求的服务器和服务,是网络通信过程中端点的抽象表示;
  包含进行网络通信必需的五种信息: 通信协议,本地IP和端口,远程IP和端口; 
TCP/IP  
  物理层
    将二进制的0和1、电压高低、光的闪灭及电波的强弱信号进行转换 
HTTP'Hypertext Transfer Protocol'超文本传送协议: 计算机通过网络进行通信的规则  
  PS: 一种无状态协议,不建立持久的连接;使客户端能向服务器请求信息和服务; 
    在网络中请求和响应的数据都以二进制传输的[?]
  HTTP报文: 在HTTP应用程序之间发送的数据块,分为'请求报文'和'响应报文' 
    请求报文 
      请求方法   URL    协议版本 
      请求头部字段     // 可选,包含一些客户端环境信息,身份验证信息等   
      // 空行 
      内容实体        // 包含客户提交的查询字符串信息,表单信息等  
    响应报文 
      协议版本  状态码  状态码描述短语 
      响应头部字段    // 可选,包含如服务器类型、日期时间、内容类型和长度等信息   
      // 空行 
      内容实体  
    头部字段 
      ◆通用首部: 客户端和服务器都可以使用 
      首部                     描述
      Cache-Control    缓存控制 
      Connection       客户端和服务器是否保持连接,浏览器和服务器之间连接的类型 
        'close'      指服务器像明确断开连接
        'Keep-Alive' 保持持久连接,HTTP/1.1前默认连接是非持久性的,如需要保存持久连接,需要增加此字段
      Update           给出了发送端可能想要升级使用新版本或协议
      Date             日期,报文创建时间
      Via              显示了报文经过的中间节点（代理、网关）
      Trailer          如果报文采用分块传输编码方式,可以利用这个首部列出位于报文trailer部分的首部集合
      Trailer-Encoding 告诉接收端对报文采用什么编码格式
      Pragma           早期的随报文传送指示方式
      ◆请求首部 
      Accept       表明客户端能够处理的内容类型及相对优先级 
      Accept-Encoding  客户端支持的内容编码及优先级级  
      Accept-Charset      客户端能识别的字符集 
      Accept-Language     告诉服务器能够发送那些语言 
      Authorization       客户端的认证信息 
      Host         告知服务器请求的主机名和端口号[当一个IP下存在多个域名时] 
      Referer             提供了包含当前请求URI的文档的URL,告诉服务器自己来源 
        该英文的正确拼法为referrer 
      User-Agent    浏览器及用户代理字符串等信息  
      Cookie              客户端字符串
      Client-IP           客户端IP
      From                客户端邮件地址
      Expect              允许客户端列出请求所要求的服务器行为
      If-Match            如果ETag和文档当前ETag匹配,就获取文档
      If-Modified-Since   除非在某个指定日期之后修改过,否则限制这个请求
      If-None-Match       如果ETag和当前文档ETag不符合,获取资源
      If-Range            允许对文档否个范围内的条件请求
      If-Unmodified-Since 在某个指定日期之后没有修改过,否则现在请求
      ◆响应首部 
      Content-Type     主体的MIME,返回的响应内容的类型  
      Content-Length   主体的长度或尺寸 
      Content-Encoding 主体编码格式 
      Content-Language 解析主体时适用的语言 
      Content-Base     解析主体中相对URL的基础URL 
      Content-Location 资源实际位置 
      Content-MD5      主体的MD5校验和 
      Content-Range    在整个资源中此实体部分的字节范围  
      Server           服务器应用软件名称和版本 
      Set-Cookie       设置cookie 
      Age              响应持续时间 
      Allow            列出了可用的请求方法 
      Location         告诉客户端实在在哪里,用于定向 
      ETag             主体的实体标记  
      Expires          过期时间  
      Last-Modified    实体最后一次修改时间 
  网址的组成  
    协议: 如http、https超文本传输协议[收发的信息是文本信息] 
    主机/域名/ip地址
      ip地址: 32 位2进制的数字[四个八位的数字] 
      Example: :
        WWW.baidu.com 等网址
        WWW       子域名
        baidu.com 主域名
    端口: 一个16位的数字,范围0-65535 
      http协议默认为80,因此一般不用填写.
      1024 以下的端口是系统保留端口,需要管理员权限才能使用;
      服务器的服务程序在启动的时候会向系统注册一个端口
    路径' /.../...'等
    '#'hash: 代表网页中的一个位置,第一个'#'后的字符,会被浏览器解读为位置标识符 
      仅改变#后的部分,浏览器只会滚动到相应位置,不会重新加载网页[若无该锚点也不会滚动]
      用来指导浏览器动作的,对服务器端无用 
        HTTP请求中不包括'#'
        如访问网址,'http://www.example.com/index.html#print',
        浏览器实际发出的请求是这样的:
        GET /index.html HTTP/1.1
        Host: www.example.com
      改变#会改变浏览器的访问历史 
        PS: IE6和IE7不会因为#的改变而增加历史记录 
        改变#后的部分,会在浏览器访问历史中增加一条记录,使用"后退"按钮,可返回上个位置 
    '?'查询字符串 
      传递参数: '&'不同参数的间隔符,'='参数中键和值的连接
      清除缓存 
        'http://www.aa.com' 和 'http://www.aa.com?11'
        两个url打开的页面一样,但查询字符串不同,而认为是一个新地址,重新读取 
  URL地址字符转换 
    url的可用字符: 0-9,a-z,A-Z,其他用十六进制表示,并在每个字节前加%
    url编码:encodeURIComponent('字符')
    url解码:decodeURIComponent('字符')
  'Status Code'状态码: 表示请求的结果 
    PS:由三位数值组成,第一位表示其类别
    状态码被分为五大类：
    '1XX' information[信息性状态码]  接收的请求正在处理 
    '2XX' success[成功状态码]        请求正常处理完毕   
    '3XX' redirection[重定向状态码]  需进行附加操作完成请求 
      用于已经移动的文件并且常被包含在定位头信息中指定新的地址信息 
    '4XX' client error[客户端错误状态码] 服务器无法处理请求  
    '5XX' server error[服务器错误状态码] 服务器处理请求错误 
    ◆状态码及说明 
    100  Continue            继续 [HTTP1.1] 
      初始的请求已经接受,客户应当继续发送请求的其余部分
    101  Switching Protocols 服务器将遵从客户的请求转换到另外一种协议 [HTTP1.1] 
    ★200  OK        正常返回信息 
    201  Created   请求成功,服务器创建了新的资源,Location头给出了它的URL  
    202  Accepted  服务器已接受请求,但处理尚未完成 
    203  Non-Authoritative Information 文档已返回,可能有误 [HTTP1.1] 
      一些应答头可能不正确,因为使用的是文档的拷贝 
    204  No Content 请求成功,无返回主体数据,应该继续显示原来的文档 
      如果用户定期地刷新页面,而Servlet可以确定用户文档足够新,这个状态代码是很有用的 
    205  Reset Content 没有新的内容,但浏览器应该重置它所显示的内容 [HTTP1.1] 
      用来强制浏览器清除表单输入内容 
    206  Partial Content 客户发送了一个带有Range头的GET请求,服务器完成了它 [HTTP1.1] 
    300  Multiple Choices 客户请求的文档可以在多个位置找到 
      这些位置已经在返回的文档内列出。如果服务器要提出优先选择,则应该在Location应答头指明。
    301  Moved Permanently 永久性重定向,资源已被分配了新的URL 
      新的URL在Location头中给出,浏览器应该自动地访问新的URL 
    302  Found             临时重定向,类似于301 
      注意,在HTTP1.0 中对应的状态信息是“Moved Temporatily”。
      出现该状态代码时,浏览器能够自动访问新的URL,因此它是一个很有用的状态代码。
      注意这个状态代码有时候可以和301替换使用。
      例如,如果浏览器错误地请求http://host/~user（缺少了后面的斜杠）,
      有的服务器 返回301,有的则返回302。
      严格地说,我们只能假定只有当原来的请求是GET时浏览器才会自动重定向。请参见307 
    303  See Other 资源存在着另一个URL,通过GET方法获取   [HTTP1.1]  
      Location头指定重定向目标文档 
    304  Not Modified 请求数据未改变,可继续使用 
      通常用于有缓存的请求中 
    305  Use Proxy   客户请求的文档应该通过Location头所指明的代理服务器提取 [HTTP1.1] 
    307  Temporary Redirect  临时重定向,和302相同 [HTTP1.1] 
    ★400  Bad Request  请求出现语法错误,服务器无法理解请求的格式 
    401  Unauthorized   未认证,客户试图未经授权访问受密码保护的页面  
      响应中会包含一个WWW-Authenticate头,浏览器据此显示用户名字/密码对话框,
      然后在填写合适的Authorization头后再次发出请求。
    403  Forbidden      禁止访问 
      服务器理解客户的请求,但拒绝处理它。通常由于服务器上文件或目录的权限设置导致。
    ★404  Not Found    未找到匹配的资源 
    405  Method Not Allowed 请求方法对指定的资源不适用 [HTTP1.1] 
    406  Not Acceptable 类型不兼容 [HTTP1.1]  
      指定的资源已经找到,但其MIME类型和请求Accpet头中所指定的不兼容
    407  Proxy Authentication Required 类似于'401' [HTTP1.1]  
      表示客户必须先经过代理服务器的授权 
    408  Request Timeout 在服务器许可的等待时间内,客户一直没有发出任何请求 [HTTP1.1] 
      客户可以在以后重复同一请求 
    409  Conflict 由于请求和资源的当前状态相冲突,因此请求不能成功 [HTTP1.1] 
      通常和PUT请求有关 
    410  Gone 所请求的文档已经不再可用,而且服务器不知道应该重定向到哪一个地址 [HTTP1.1] 
      它和404的不同在于,返回407表示文档永久地离开了指定的位置,
      而 404表示由于未知的原因文档不可用 
    411  Length Required 服务器不能处理请求,除非客户发送一个Content-Length头 [HTTP1.1] 
    412  Precondition Failed 请求头中指定的一些前提条件失败 [HTTP1.1] 
    413  Request Entity Too Large 目标文档的大小超过服务器当前愿意处理的大小 [HTTP1.1] 
      如果服务器认为自己能够稍后再处理该请求,则应该提供一个Retry-After头 
    414  Request URI Too Long URI太长 [HTTP1.1] 
    416  Requested Range Not Satisfiable 服务器不能满足客户在请求中指定的Range头 [HTTP1.1]  
    ★500  Internal Server Error  服务器处理请求时发生错误 
    501  Not Implemented 服务器不支持实现请求所需要的功能。
      例如,客户发出了一个服务器不支持的PUT请求 
    502  Bad Gateway 服务器作为网关或者代理时,为了完成请求访问下一个服务器,但该服务器返回了非法的应答 
    503  Service Unavailable    服务器端暂时无法处理请求[可能是过载或维护] 
    504  Gateway Timeout 由作为代理或网关的服务器使用,表示不能及时地从远程服务器获得应答 [HTTP1.1] 
    505  HTTP Version Not Supported 服务器不支持请求中所指明的HTTP版本  [HTTP1.1]  
  'Method':发送请求的类型
    PS:http 1.0 定义了8种方法,主要使用'GET'和'POST';
    GET  请求
      最常见的请求类型,常用于向服务器查询信息.
      一般用于信息获取.
      使用URL传递参数.(发送的信息可见)
      对发送信息的数量有限制,一般在2000个字符内.
      必要时可将查询字符串参数追加到URL的末尾以便将信息发送给服务器.
      对于xhr而言,位于open方法的URL末尾的查询字符串必须经过正确的编码才行,
      查询字符串中每个参数的名称和值都需使用encodeURIComponent()进行编码,
      名值对必须由&分割.
    POST 请求
      通常用于向服务器发送应该被保存的数据.
      一般用于修改服务器上的资源.
      对发送信息的数量无限制.
      Remarks:
        表单提交时 Content-Type 为 application/x-www-form-urlencoded
    PUT  请求更新服务器端数据
    HEAD 检查一个对象是否存在 
      在服务器的响应中没有资源的内容,只有资源的一些基本信息
      主要用于
      1 在不获取资源的情况下获取资源信息（类型、大小等）
      2 通过状态码产看资源是否存在
      3 通过查看首部,测试资源是否被修改了
    DELETE  请求删除数据
    CONNECT 对通道提供支持
    TRACE   跟踪到服务器的路径
    OPTIONS 查询Web服务器的性能 
    GET 和 POST 的区别
      大体上讲,向服务器发送客户端数据有两种方式:查询字符串和请求正文.
      通常,若是使用查询字符串,就发起了一个GET请求；
      若是使用请求正文,就发起了一个POST请求
     (若你反过来做,HTTP协议并不会阻止你,但这是没有必要的:最好在这里坚持标准实践).
      有一种普遍的误解是POST请求是安全的,而GET请求不安全.
      事实上若使用HTTPS协议,两者都是安全的；若不使用,则都不安全.
      若不使用HTTPS协议,入侵者会像查看GET请求的查询字符串一样,轻松查看POST请求的报文数据.
      使用GET请求,用户会在查询字符串中看到所有的输入数据(包括隐藏域),这是丑陋而且凌乱的.
      浏览器会限制查询字符串的长度(对请求正文没有长度限制).
      基于这些原因,一般推荐使用POST进行表单提交.
  'HTTP'和'TCP'的区别
    TPC/IP 传输层协议: 解决数据如何在网络中传输,是一种'经过三次握手'的可靠的传输方式 
    HTTP 应用层协议: 是Web联网的基础,是建立在TCP协议之上的一种应用 
  HTTP 传输过程  
    建立TCP连接 
      输入地址,然后回车
      Chrome搜索自身的DNS缓存 ,当没有找到或缓存失效时
      Chrome搜索操作系统自身的DNS缓存,若仍没找到,
      Chrome读取本地的HOST文件,若仍没找到,
      Chrome 发起一个DNS的一个系统调用 ,一般向宽带运营商查询DNS,
      宽带运营商服务器查找自身缓存,若未成功,
      运营商服务器发起一个迭代DNS解析的请求 ,逐层向上查询,
      运营商服务器把结果返回操作系统内核,同时缓存起来,
      操作系统内核把结果返回浏览器
      最终,浏览器得到 www.baidu.com 对应的ip地址,
      获取ip地址后,浏览器发起HTTP "三次握手",建立 TCP/IP 连接,
    浏览器就可以向服务器发送HTTP请求了,如get方法发送请求
      Web浏览器向Web服务器发送请求命令
      Web浏览器发送请求头信息
    服务器端接收到请求,根据路径参数,经过后端的处理之后,把结果数据发送给浏览器,如请求页面
      Web服务器发送应答信息 
      Web服务器向浏览器发送数据 
      Web服务器关闭TCP连接
    浏览器拿到完整的HTML页面代码,解析和渲染该页面,
    同时其中的JS、CSS、图片等静态资源,同样也是一个个HTTP请求都需要经过上面的步骤来获取 
    最终浏览器渲染成功呈现页面 
  HTTP 缓存 
    PS:缓存:存储指定资源的一份拷贝,并在下次请求该资源时提供该拷贝的技术 
    缓存控制--头信息 
      Expires 通过指定缓存文件过期时间来控制 [HTTP/1.0] 
        'Expire'的值是一个绝对时间点,表示缓存文件在某个时间点之前有效 
      Cache-Control: max-age=num;  [HTTP/1.1] 
        PS:请求头和响应头都支持该属性,提供的不同的值来定义缓存策略; 
          请求头的'Cache-control'优先级高于响应头中的;
          'Cache-Control'优先级高于Expires;
        'no-store'  禁止缓存,每次由客户端发起的请求都会下载完整的响应内容 
          浏览器会直接向服务器请求原始文件,并且请求中不附带 Etag 参数[服务器认为是新请求]
        'no-cache'  不缓存过期资源,释放缓存前向服务器发送请求以验证缓存是否有效 
          表示不使用Cache-Control的缓存控制方式做前置验证,
          而是使用'Etag'或者'Last-Modified'字段来控制缓存
        'private'   私有缓存,中间节点不允许缓存,响应的内容只能被唯一的用户缓存  
        'public'    公共缓存,表示响应可被任何中间节点缓存  
          如 Browser <-- proxy1 <-- proxy2 <-- Server,中间的proxy可以缓存资源,
          比如下次再请求同一资源proxy1直接把自己缓存的东西给 Browser 而不再向proxy2要。
        max-age=num   当前资源的有效时间,单位s 
          时间根据系统的时间来进行判断 
        must-revalidate 缓存验证,在使用一些老的资源前强制验证状态判断其是否过期 
      Last-Modified/If-Modified-Since 配合Cache-Control使用 
        缓存过期后,当之前响应头中存在'Last-Modified'头信息, 
        请求头发出'If-Modified-Since'判断是否使用缓存, 
        服务器收到'If-Modified-Since'则与资源的最后修改时间[根据服务器时间]进行比对,
        若最后修改时间较新,说明资源被改动过,响应'304',从缓存读数据;
        若最后修改时间较旧,说明资源无新修改,响应'200',返回新数据, 
        同时通过响应头更新'last-Modified'的值,以备下次对比; 
      Etag/If-None-Match              配合Cache-Control使用 
        根据文件的MD5值来判断是否使用缓存;  
        响应头中返回'Etag'[值为资源的MD5],
        当资源过期后,请求头中发送'If-None-Match'[值为上次响应头中'Etag'的值], 
        服务器通过判断文件的MD5和请求头中的'If-None-Match'来执行响应,相同则返回'304';
        否则响应新的内容,响应头中附带新的'Etag' 
      Pragma  [HTTP/1.0] 
        PS:响应头不支持该属性,通常定义'Pragma'以向后兼容基于HTTP/1.0 的客户端 
        no-cache  通知客户端不要对该资源进行缓存 
    无浏览器缓存的请求 
      浏览器发出的第一个请求的资源默认是不被缓存的; 
      POST请求无法被缓存 
      Cache-Control:no-cache 
      Cache-Control:max-age=0 
      HTTP响应头中不包含Last-Modified/Etag,也不包含Cache-Control/Expires的请求无法被缓存
      pragma:no-cache 
      需要根据Cookie,认证信息等决定输入内容的动态请求是不能被缓存的
    不使用缓存的方法 
      使用查询字符串来避免缓存,缓存以URL为依据 [古老的方法] 
--------------------------------------------------------------------------------
数据结构 
  数据结构就是存储数据的方式
  队列 
  堆栈 
    堆、栈都是一种数据项按序排列的数据结构,只能在一端[称为'top'栈顶]对数据项进行插入和删除 
    'heap'堆,先进先出[FIFO'first in first out']  
    'stack'栈,先进后出[FILO'first-in/last-out']  
  链表
    将零散的东西连起来,从而进行有序的操作.
    Example:
      // 定义零散的东西
      var Node =function(e){
        this.element =e;
        this.next =null
      }
      var n1 =new Node(1);
      var n2 =new Node(2);
      var n3 =new Node(3);
      // 建立关系,连起来
      n1.next = n2;
      n2.next = n3;
      // 将零散东西输出
      var n = n1;
      while(n != null){
        console.log('遍历链表',n.element);
        n = n.next;
      } 
  哈希表
    哈希表就是用 字符串 当下标,也就是 JS 中的对象的实现方式
    也是其他语言中的 字典
  树
  集合
  图 
    如 点 线 互联 求路线 
算法 
  复杂度 :对一个操作复杂程度的大致估计 
    五种常见时间复杂度 : 消耗的时间
    O(1)     常数复杂度,比如读取数组中的某一个元素
    O(logN)  比如二分搜索,常用于有序列表的查找
    O(N)     比如数组的遍历
    O(NlogN) 两个有序列表求交集,使用二分搜索
    O(N^2)   两个列表求交集
    空间复杂度 : 占用的内存
    O(1)     在数组中返回某一个元素
    O(N)     复制一个数组并返回
  15 个经典基础算法 
    Hash
    快速排序
    快递选择SELECT
    BFS/DFS （广度/深度优先遍历）
    红黑树 （一种自平衡的二叉查找树）
    KMP 字符串匹配算法
    DP (动态规划 dynamic programming)
    A*寻路算法: 求解最短路径
    Dijkstra:最短路径算法 
    遗传算法
    启发式搜索
    图像特征提取之SIFT算法
    傅立叶变换
    SPFA(shortest path faster algorithm) 单元最短路径算法
  算法设计思想 
    迭代法
    穷举搜索法
    递推法
    动态规划
    贪心算法
    回溯
    分治算法
二叉树 
--------------------------------------------------------------------------------
设计模式 
  观察者模式
    观察者模式定义了一种一对多的依赖关系,让多个观察者对象同时监听某一个主题对象 
    这个主题对象在状态发生变化时,会通知所有观察者对象,使它们能够自动更新自己

