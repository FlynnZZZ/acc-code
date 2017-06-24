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
    PS：
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
URL,Uniform_Resource_Locator 也叫网址或统一资源定位符 
  PS：可以由单词组成,或者是因特网协议「IP」地址如:'162.168.1.253';
    用于定位万维网上的文档或其他数据
  scheme://host.domain:port/path/fileName  语法规则
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
  HTML URL字符编码: 将字符转换为可通过因特网传输的格式
    URL只能使用ASCII字符集来通过因特网进行发送,
    由于URL常常会包含ASCII集合之外的字符,URL必须转换为有效的ASCII格式。
    URL编码使用%其后跟随两位的十六进制数来替换非ASCII字符。
    URL不能包含空格,URL编码通常使用+来替换空格
HTTP 协议 
  PS：计算机通过网络进行通信的规则, 是一种无状态协议,不建立持久的连接;
    使客户(浏览器)能够向web服务器请求信息和服务
  HTTP 请求 
    一般由四部分组成:
    请求方法,如GET或POST请求
    请求的URL
    请求头,包含一些客户端环境信息,身份验证信息等
    请求体,即请求正文,其中可以包含客户提交的查询字符串信息,表单信息等等.
  HTTP 响应 
    一般由三部分组成:
    状态码: 一个数字和文字组成的,用于表示请求的状态(是成功还是失败等)
    响应头: 和请求头类似,包含许多的信息,如服务器类型、日期时间、内容类型和长度等.
    响应体: 响应正文.
  HTTP 头信息
    PS：每个http请求和响应都会带有相应的头部信息
      xhr对象提供了操作头信息「请求头信息和响应头信息」的方法
      有的浏览器允许重写默认头信息,而有的浏览器则不允许.
      头信息中必须使用ASCII码.
    默认情况下,发送xhr请求的同时,还会发送下列头信息
      虽然不同浏览器发送的头部信息会有所不同,以下为共有的信息
      Accept          浏览器能够处理的内容类型
      Accept-Charset  浏览器能够显示的字符集
      Accept-Encoding 浏览器能够处理的压缩编码
      Accept-language 浏览器当前设置的语言
      Connection      浏览器父服务器之间连接的类型
      Cookie          当前页面设置的任何Cookie
      Host            发出请求的页面所在的域
      Referer         发出请求页面的URI
        注意,HTTP规范将这个头部字段拼写错了, 为了保证与规范一致,只能将错就错
       (该英文的正确拼法为referrer)
      User-Agent      浏览器的用户代理字符串
  网址的组成 
    协议 http、https(https为加密的https) 超文本传输协议(收发的信息是文本信息)
    主机/域名/ip地址
      ip地址 32 位2 进制的数字(4 个八位的数字)
      电脑通信靠ip地址,ip地址不好记使用域名
      进入DOS环境 输入 ping 域名来进行查询ip地址.
      e.g. :
        WWW.baidu.com 等网址
        WWW       子域名
        baidu.com 主域名
    端口 端口是一个16位的数字,范围0-65535
      http协议默认为80,因此一般不用填写.
      服务器的服务程序在启动的时候会向系统注册一个端口
    路径 /.../...等
    # hash
      #代表网页中的一个位置.在第一个#后面出现的任何字符,都会被浏览器解读为位置标识符
        e.g.:
        'http://www.example.com/index.html#print' 就代表网页index.html 的print位置.
        浏览器读取这个URL后,会自动将print位置滚动至可视区域.
        为网页位置指定标识符,有两个方法:
        一是使用锚点,比如<a name="print"></a>
        二是使用id属性,比如<div id="print">
      #是用来指导浏览器动作的,对服务器端完全无用.所以,HTTP请求中不包括#.
        比如,访问下面的网址,'http://www.example.com/index.html#print',
        浏览器实际发出的请求是这样的：
        GET /index.html HTTP/1.1
        Host: www.example.com
      单单改变#后的部分,浏览器只会滚动到相应位置,不会重新加载网页.若无该锚点则也无滚动
      改变#会改变浏览器的访问历史
        每一次改变#后的部分,都会在浏览器的访问历史中增加一个记录,
        使用"后退"按钮,就可以回到上一个位置.
        这对于ajax应用程序特别有用,可以用不同的#值,表示不同的访问状态,
        然后向用户给出可以访问某个状态的链接.
        值得注意的是,上述规则对IE6和IE7不成立,它们不会因为#的改变而增加历史记录.
    ? 查询字符串
      传递参数时用于连接
        & 不同参数的间隔符
        = 参数中名和值的连接
        e.g.:
        'http://www.xxx.com/Show.asp?id=77&nameid=2905210001&page=1'
      清除缓存
        e.g.:
        'http://www.xxxxx.com/index.html '
        'http://www.xxxxx.com/index.html?test123123'
        两个url打开的页面一样,但是后面这个有问号,说明不调用缓存的内容,
        而认为是一个新地址,重新读取.
  URL地址字符转换 
    url的可用字符： 0-9,a-z,A-Z ,其他用十六进制表示,并在每个字节前加%
    url编码:encodeURIComponent('字符')
    url解码:decodeURIComponent('字符')
  HTTP状态码 
    PS：由三位数值组成,第一位表示其类别
    '1XX' 表示请求已接收
    '2XX' 成功
    '3XX' 重定向,表示没有成功,客户必须采取进一步的动作
    '4XX' 客户端错误
    '5XX' 服务器端错误
    ◆常用状态码
    200 OK      正常返回信息
    304 Not Modified 自从上次请求后,请求的网页未修改过
    400 Bad Request  请求错误,不符合要求
      服务器无法理解请求的格式,客户端不应再次使用相同的内容发起请求
    403 Forbidden    禁止访问
    404 Not Found    找不到匹配的资源
    500 Internal Server Error  最常见的服务器端错误
    503 Service Unavailable    服务器端暂时无法处理请求(可能是过载或维护)
    其他状态码及说明
      100 Continue     继续,
        一般在发送post请求时,已发送了http header之后服务端将返回此信息,
        表示确认,之后发送具体参数信息
      201 Created   请求成功并且服务器创建了新的资源
      202 Accepted  服务器已接受请求,但尚未处理
      301 Moved Permanently  请求的网页已永久移动到新位置.
      302 Found        临时性重定向.
      303 See Other    临时性重定向,且总是使用 GET 请求新的 URI.
      401 Unauthorized      请求未授权.
  HTTP请求方法 :发送请求的类型
    PS：http 1.0 定义了8种方法,主要使用'GET'和'POST';
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
    DELETE  请求删除数据
    CONNECT 对通道提供支持
    TRACE   跟踪到服务器的路径
    OPTIONS 查询Web服务器的性能
    GET 和 POST 的区别
      大体上讲,向服务器发送客户端数据有两种方式：查询字符串和请求正文.
      通常,若是使用查询字符串,就发起了一个GET请求；
      若是使用请求正文,就发起了一个POST请求
     (若你反过来做,HTTP协议并不会阻止你,但这是没有必要的：最好在这里坚持标准实践).
      有一种普遍的误解是POST请求是安全的,而GET请求不安全.
      事实上若使用HTTPS协议,两者都是安全的；若不使用,则都不安全.
      若不使用HTTPS协议,入侵者会像查看GET请求的查询字符串一样,轻松查看POST请求的报文数据.
      使用GET请求,用户会在查询字符串中看到所有的输入数据(包括隐藏域),这是丑陋而且凌乱的.
      浏览器会限制查询字符串的长度(对请求正文没有长度限制).
      基于这些原因,一般推荐使用POST进行表单提交.
  HTTP 和 TCP 的区别
    TPC/IP 协议是传输层协议
      主要解决数据如何在网络中传输,是一种“经过三次握手”的可靠的传输方式
    HTTP 协议即超文本传送协议(Hypertext Transfer Protocol ),应用层协议,
      是 Web 联网的基础,也是手机联网常用的协议之一
      HTTP 协议是建立在 TCP 协议之上的一种应用.
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
    同时其中的JS、CSS、图片等静态资源,同样也是一个个HTTP请求都需要经过上面的步骤来获取.
    最终浏览器渲染成功呈现页面.
网页的显示过程 
  浏览器加载网页过程
    一个网页的加载依赖于脚本文件、CSS样式文件。浏览器加载网页的过程如下:
    首先,浏览器下载 HTML 并开始解析。如果浏览器发现外部CSS资源链接则发送下载请求。
    浏览器可以在下载CSS资源的同时,并行解析HTML文件,
    但是,一旦发现有脚本文件的引用,则必须等待脚本文件完成下载并且执行后才能继续解析。
    脚本文件完成下载并且执行后,浏览器可以继续解析HTML工作,
    如果遇到非阻塞资源浏览器会发送下载请求并且继续解析。
    即使浏览器可以并行执行多个请求,但是无法与针对脚本文件的操作并行执行。
    
  一个页面从输入 URL 到页面加载显示完成,这个过程中都发生了什么？（流程说的越详细越好）
    详细版：
      1、浏览器会开启一个线程来处理这个请求,对 URL 分析判断如果是 http 协议就按照 Web 方式来处理;
      2、调用浏览器内核中的对应方法,比如 WebView 中的 loadUrl 方法;
      3、通过DNS解析获取网址的IP地址,设置 UA 等信息发出第二个GET请求;
      4、进行HTTP协议会话,客户端发送报头(请求报头);
      5、进入到web服务器上的 Web Server,如 Apache、Tomcat、Node.JS 等服务器;
      6、进入部署好的后端应用,如 PHP、Java、JavaScript、Python 等,找到对应的请求处理;
      7、处理结束回馈报头,此处如果浏览器访问过,缓存上有对应资源,会与服务器最后修改时间对比,一致则返回304;
      8、浏览器开始下载html文档(响应报头,状态码200),同时使用缓存;
      9、文档树建立,根据标记请求所需指定MIME类型的文件（比如css、js）,同时设置了cookie;
      10、页面开始渲染DOM,JS根据DOM API操作DOM,执行事件绑定等,页面显示完成。
    简洁版：
      浏览器根据请求的URL交给DNS域名解析,找到真实IP,向服务器发起请求；
      服务器交给后台处理完成后返回数据,浏览器接收文件（HTML、JS、CSS、图象等）；
      浏览器对加载到的资源（HTML、JS、CSS等）进行语法解析,建立相应的内部数据结构（如HTML的DOM）；
      载入解析到的资源文件,渲染页面,完成。    
名称解释类汇总 
  IDE: 集成开发环境,Integrated Development Environment
  MVC 模式
    Model,模型层:      提供/保存数据
    Controller,控制层: 数据处理,实现业务逻辑
    View,视图层:       展示数据,提供用户界面
  MVVM 模式
    PS：用 View Model 代替 Controller.
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
--------------------------------------------------------------------------------
命令提示符操作 
  命令提示符是在操作系统中,提示进行命令输入的一种工作提示符;
  在不同的操作系统环境下,命令提示符各不相同;
windows环境 
  PS：命令行程序为cmd.exe,是一个32位的命令行程序,
    微软Windows系统基于Windows上的命令解释程序,类似于微软的DOS操作系统。
    输入一些命令,cmd.exe 可以执行,比如输入shutdown -s就会在30秒后关机。
    打开方法：开始-所有程序-附件 或 开始-寻找-输入：cmd/cmd.exe 回车。
    CMD即命令提示符窗口[cmd.exe],是Windows的“标配”组件,
    它可以实现用户与操作系统的直接交流,并负责用户输入的所有命令的解释和支持。
    命令提示符进行的操作往往更具有专业性——实际上很多Windows中的操作只能通过命令来实现;
    在命令行中文件名不区分大小写;
  命令 快捷键 操作
    PS：
      命令码无大小写区分 (文件夹的名称也无大小写区分)     
    快捷键
      rightMouse        粘贴
      up/down           选择历史命令
      F7                显示命令历史记录
      Esc               清除当前命令行
      ctrl+c            强行中止命令执行
      ctrl+d            退出其他运行环境或推出命令行程序 
      alt+printScreen   截取当前命令窗[需在画板中粘贴]
      F9                按编号选择命令[从0开始] 
      ctrl+h            和删除backspace功能相同
      enter[选中文字下]  复制
    文件操作类
      cd XX      进入XX文件夹
        cd ./    当前文件夹
        cd ../   到上级文件夹
        cd /     到该磁盘的根目录
        cd \     到该磁盘的根目录
      <x>:       进入磁盘
        e.g. : e:  进入到E盘 ;  c:  进入到c盘
      dir        列出目录下的所有文件
      mkdir      创建文件夹
      <fileName> 运行/打开该文件[前提是可运行的程序、批处理文件等,可以不带格式后缀]
      type <fileName> 参看文件内容
      start <folderName> 打开文件夹
    命令行相关
      cls       清屏
    信息查看类
      winver    检查Windows版本
      ipconfig  显示当前的TCP/IP配置的设置值
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
      cmd       CMD命令提示符
        cmd.exe  完整写法
      Nslookup  IP地址侦测器
      netstat -an   (TC)命令检查接口
      nslookup      网络管理的工具向导
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
浏览器 
  介绍_概念_说明_定义 
    说明 
      浏览器从同一个域同时下载文件的数量有限,当同时下载多个文件,会比相同大小的单个文件慢.
      浏览器在遇到<body>标签时才开始呈现内容
    主要组成
      渲染引擎: 将网页代码渲染成图像呈现,也叫浏览器内核
        PS：浏览器核心的部分是“Rendering Engine”,“渲染引擎”,一般称为“浏览器内核”。
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
          PS：页面生成后,JS操作和样式表操作都会触发flow和paint,称为"重流"和"重绘"
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
        PS：JS为解释型语言,不需编译,由解释器运行
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
  浏览器调试 
    说明 
      在调试页,选中的当前元素,可用 $0 表示'可在控制台使用$0查找到'
      IE是唯一一个在浏览器的界面显示JS错误信息的浏览器  [IE11已不再如此]
    自定义测试函数 
      // 待测试的函数
      var sum = function(array) {
        var s = 0;
        for(var i = 0; i < array.length; i++) {
          var n = array[i];
          s = s + n;
        }
        return s;
      }
      // 定义测试函数
      var ensure = function(condition) {
        if(!condition) {
          console.log("Wrong")
        }else{
          console.log("Pass");
        }
      }
      // 测试
      var testFunction = function() {
        var numbers = [1, 2, 3, 4]
        var value = 10
        ensure(value == sum(numbers))
        ensure(1 == sum([1]))
      }
      // 测试结果
      testFunction()
    控制台命令行: 控制台自带的命令行方法 
      $_     返回上一个表达式的值
      $0
      $1
      $2
      $3
      $4
      clear()  清空控制台
      copy()
      dir()
      dirxml()
      $(selector)   <=>  document.querySelectorAll(selector)
      $$(selector)  <=>  document.querySelector(selector)
      $x(path)  匹配特定Xpath表达式的所有DOM元素的数组
        e.g.:$x("//p[a]")  所有包含a元素的p元素
      inspect(obj)  在相关面板显示对象
        DOM元素在Elements面板中显示对象
        JS对象在Profiles面板中显示
      keys(obj)        返回对象的所有key
      values(obj)      返回对象的所有value
      getEventListeners(obj)   显示事件
      monitorEvents(obj[,events])    监听对象的事件
      unmonitorEvents(obj[,events])  取消监听对象的事件
        允许监听同一大类的事件,所有事件可以分成4大类
        mouse : mousedown mouseup click dbclick mousemove mouseover mouseout mousewheel
        key   : keydown keyup keypress textInput 
        touch : touchstart touchmove touchend touchcancel
        control : resize scroll zoom focus blur select change submit reset
    console 对象 
      PS：console对象为浏览器的实现,包含在浏览器自带的开发工具中, 
        虽然还不是标准,但各大浏览器都原生支持,已成为事实上的标准;
      console.log(val1,val2,...);     将一般消息记录到控制台 
        PS：自动在输出的最后一个值后添加换行符 
        格式占位符
          PS：log方法将占位符替换以后的内容,显示在console窗口
          %s     字符串
          %d     整数
          %i     整数
          %f     浮点数
          %o     对象的链接
          %c     CSS格式字符串
            对输出的内容进行CSS渲染
            console.log('%c this text is styled!','color:red;font-size:24px;');
            输出的内容将显示为红色的24px的字体
          e.g.:
            console.log(" %s + %s = %s", 1, 1, 2);  //  1 + 1 = 2
            上面代码的 %s 表示字符串的占位符
    
            两种参数格式,可以结合在一起使用.
            console.log(" %s + %s ", 1, 1, "= 2")
            // 1 + 1  = 2
      console.debug(val)     
      console.dir()                输出对象的信息,用于显示一个对象的所有属性.
        可读性较好,一般用于输出显示DOM节点
        Node中可指定以高亮形式输出
          console.dir(obj,{color:true})
      console.dirxml()             主要用于以目录树形式显示DOM节点
        若参数不是DOM节点,则等同于dir
      console.table()              对于某些复合类型的数据将其转为表格显示
        e.g. :
        var languages = [
          { name: "JavaScript", fileExtension: ".js" },
          { name: "TypeScript", fileExtension: ".ts" },
          { name: "CoffeeScript", fileExtension: ".coffee" }
        ];
        console.table(languages);
        上面代码的language,转为表格显示如下.
       (index) name fileExtension
        0 "JavaScript" ".js"
        1 "TypeScript" ".ts"
        2 "CoffeeScript" ".coffee"
        复合型数据转为表格显示的条件是,必须拥有主键.
          对于上面的数组来说,主键就是数字键.对于对象来说,主键就是它的最外层键.
          var languages = {
            csharp: { name: "C#", paradigm: "object-oriented" },
            fsharp: { name: "F#", paradigm: "functional" }
          };
          console.table(languages);
          上面代码的language,转为表格显示如下.
         (index) name paradigm
          csharp "C#" "object-oriented"
          fsharp "F#" "functional"
      console.trace()              当前执行的代码在堆栈中的调用路径.
      console.assert([bool][,val]) 条件验证,为假时以错误的形式输出,为真时无输出 
        bool  布尔值,默认为false 
        e.g.:
          若为假,则显示一条事先指定的错误信息
          console.assert(true === false,"判断条件不成立")
          // Assertion failed: 判断条件不成立
          判断子节点的个数是否大于等于500.
          console.assert(list.childNodes.length < 500, "节点个数大于等于500")
      console.count([val])         用于计数,输出被调用的次数 
        接收一个参数作为标签,进行相应的次数统计
        e.g.:
          console.count('a');  // a: 1
          console.count('a');  // a: 2
        
          for (var i = 0; i < 5; i++) { 
            console.count(); 
          }
          // : 1
          // : 2
          // : 3
          // : 4
          // : 5
      console.info(val)      将信息记录到控制台
      console.warn(val)      将警告消息记录到控制台
      console.error(val)     将错误消息记录到控制台
      console.clear()         清空控制台,光标回到第一行
      ◆用于记录time和timeEnd间经历的时间,可计算一个操作所花费的准确时间 
      console.time()         计时开始
      console.timeEnd(val)   计时结束
        val 为计时器的名称
        e.g.:
          console.time();
          var array = new Array(1000000);
          for(var i = array.length - 1; i >= 0; i--) {
            array[i] = new Object();
          };
          console.timeEnd("aoo"); 
          // aoo: 242ms
        调用timeEnd方法之后,console窗口会显示'计时器名称: 所耗费的时间'.
      ◆性能测试
      console.profile() 
      console.profileEnd()   
      ◆分组显示
      console.group(val)   '组'的开始
      console.groupEnd()   '组'的结束
        str  作为'组'的名称
        在group和groupEnd之间打印的信息可作为一个'组'进行展开或折叠,在输出大量信息时有用
      修改/定义console方法 
        因为console对象的所有方法,都可以被覆盖
        
        使用自定义的console.log方法,在显示结果添加当前时间
        ["log", "info", "error"].forEach(function(method) {
          console[method] = console[method].bind(console,new Date().toISOString());
        });
        console.log("出错了！");
        // 2014-05-18T09:00.000Z 出错了！
    断点调试 [Chrome浏览器下] 
      f12 - Sources 进入断点调试界面
      在程序中添加语句 debuger; 相当于在语句处添加断点
    Exp： 
      不可见符号及空格
        var i = String.fromCharCode(0) +'1'; //"1"
        // ASCII码 0 对应的是null 控制符 不可写的也不显示的符号
        console.log(i,typeof i,i.length); //1 string 2
  
        var a ='2 '
        console.log(a);         //2
        console.log(`(${a})`);  //(2 )
        // 方便查看出字符中的空格
      在手机等不可打开控制台的设备上调试时 
        console.log()不可见,而 alert阻塞运行, 
        使用在页面中相应的改变元素来达到感知的效果 
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
git bash 
  命令
    clear   清空输出
    ls      相当于dir命令
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
    PS： GET提交,返回JSON; sort可以为0和1,作用。。未知
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
    PS：rem 单位在做移动端的h5开发的时候是最经常使用的单位。
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
webview



