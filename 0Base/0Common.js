// 常识 
文件的MD5值: 为保证每个文件的唯一性,通过判断MD5值来确定文件是否更改 
HSL,色彩模式,工业界的一种颜色标准 
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
'Character Encoding'字符编码 
  ANSI  本地编码[不代表具体的编码] 
    如在简体版windows上它表示GB2312编码,繁体版windows上它表示Big5编码 
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
'Web Imgs'图片 
  PS: 主要有'.png'、'.jpeg'、'.gif'等 
  'color depth'色深: 图像包含颜色种类的多少,单位: 'bit'位 
    Example: 8 位的色深有 2^8=256 种颜色,24 位色深包含 2^24 种颜色   
  '.gif': 支持8位色深,支持透明色、动画 
    支持1位透明度[完全透明或不透明,而无中间值] 
    非常适合带有大块相同颜色区域的图像 
  '.jpeg': 支持24位色深,不支持透明色、动画 
    PS: JPEG文件有两种保存方式,分别是'Baseline JPEG'和'Progressive JPEG' 
      两种格式有相同尺寸以及图像数据,扩展名也是相同的,唯一的区别是二者显示的方式不同。
    'Baseline JPEG'渐进式 
      该类型的JPEG文件存储方式是按从上到下的扫描方式,把每一行顺序的保存在JPEG文件中。
      打开这个文件显示它的内容时,数据将按照存储时的顺序从上到下一行一行的被显示出来,
      直到所有的数据都被读完,就完成了整张图片的显示。
      如果文件较大或者网络下载速度较慢,那么就会看到图片被一行行加载的效果,
      这种格式的JPEG没有什么优点,因此,一般都推荐使用Progressive JPEG。
    'Progressive JPEG',标准型 
      Progressive JPEG文件包含多次扫描,这些扫描顺寻的存储在JPEG文件中。
      打开文件过程中,会先显示整个图片的模糊轮廓,随着扫描次数的增加,变得越来越清晰。
      这种格式的主要优点是在网络较慢的情况下,可以看到图片的轮廓知道图片大概。
      在一些网站打开较大图片时,你就会注意到这种技术。
      渐进式图片带来的好处是可以让用户在没有下载完图片就可以看到最终图像的大致轮廓,
      一定程度上可以提升用户体验。（瀑布留的网站建议还是使用标准型的）
      另外渐进式的图片的大小并不会和基本的图片大小相差很多,有时可能会比基本图片更小。
      渐进式的图片的缺点就是对CPU和内存开销大一点;
      保存为'Progressive JPEG': 在PS中'存储为web所用格式',选择'连续' 
  '.png': 提供了两种色深:8位&24位,支持两种模式透明度:1位&8位,不支持动画 
  base64 
    CSS文件中引入base64,比直接引入图片地址,对样式渲染的性能消耗更大  
    若大量使用,会带来耗电和发热的问题,需谨慎使用。
    图片转成base64编码后,文档大小较原文件大了一些,而经过gzip后两者几乎没有区别。
    将图片资源编码进js文件中,管理和预加载H5应用的图片资源,合理的合并请求可以大大提高页面体验。
--------------------------------------------------------------------------------
URI&URL&URN 资源标识/定位 
  PS: 'URL'和'URN'都是'URI'的子集
  URI'Uniform Resource Identifier'统一资源标识符 
    一个用于标识某一互联网资源名称的字符串
    该种标识允许用户对任何[包括本地和互联网的]资源通过特定的协议进行交互操作
    URI由包括确定语法和相关协议的方案所定义
    Web上可用的每种资源[HTML文档、图像、视频片段、程序等]由一个通用资源标识符进行定位
  URL'Uniform Resource Locator'统一资源定位符[也叫网址] 
    PS: 从互联网上得到的资源的位置和访问方法的一种简洁的表示,
      是互联网上标准资源的地址 
      互联网上的每个文件都有一个唯一的URL,
      包含的信息指出文件的位置以及浏览器应该怎么处理它
      使用ASCII代码的一部分来表示互联网的地址,
      一般统一资源定位符的开始标志着一个计算机网络所使用的网络协议。
      可以由单词组成,或者是因特网协议[IP]地址如:'162.168.1.253';
      用于定位万维网上的文档或其他数据
    编码规则: 
      网页地址字符编码: 将字符转换为可通过因特网传输的格式
      URL只能使用ASCII字符集来通过因特网进行发送,
      由于URL常常会包含ASCII集合之外的字符,URL必须转换为有效的ASCII格式
      URL编码使用%其后跟随两位的十六进制数来替换非ASCII字符
      URL不能包含空格,URL编码通常使用'20%'来替换空格
    语法规则: 
      'scheme://host.domain:port/path/fileName'  
      scheme    因特网服务的类型/协议头 
        http   超文本传输协议,以'http://'开头的普通网页,不加密
        https  安全超文本传输协议,安全网页,加密所有信息交换
        ftp    文件传输协议,用于将文件下载或上传至网站
        file   本地计算机上的文件
      host      域主机,http的默认主机是www
      domain    域名,如W3school.com.cn
      port      主机端口号,http的默认端口号是80
      path      服务器上的路径,若省略,则文档必须位于网站的根目录中
      fileName  定义文档/资源的名称 
      query     查询参数
      fragment，#后的hash值,一般用来定位到某个位置 
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
URL协议 
  'javascript:'协议,调用URL时会执行对应的JS代码 
    Example: <a href="Javascript:console.log(111);">11111111</a>
    浏览器地址栏也支持'javascript:'协议
    Example: 
    若JS代码返回的为字符串,则浏览器会在页面中显示出该字符串
    Chrome: 清空当前页面,显示出返回的字符串
    <a href="Javascript:'aaa'" target="_blank">11111111</a>  
    javascript:"aaa"   // 在浏览器地址栏中键入
'Socket'套接字: 源IP地址及其端口号和目的IP地址及其端口号的组合称为套接字 
  用于标识客户端请求的服务器和服务,是网络通信过程中端点的抽象表示;
  包含进行网络通信必需的五种信息: 通信协议,本地IP和端口,远程IP和端口; 
'shim'&'polyfill' 
  shim 是将不同 api 封装成一种,
    比如 jQuery 的 $.ajax 封装了 XMLHttpRequest,
    IE 用 ActiveXObject 方式创建 xhr 对象.
  polyfill 是 shim 的一种.
    polyfill 特指 shim 成的 api 是遵循标准的,
    其典型做法是在IE浏览器中增加 window.XMLHttpRequest ,内部实现使用 ActiveXObject.



