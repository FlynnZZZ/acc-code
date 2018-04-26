◆网络传输协议 
  PS: 网络请求都是单独的线程 
HTTP/HTTPS'Hypertext Transfer Protocol'超文本传送协议   
  PS: 一种无状态协议,不建立持久的连接; 
    在网络中请求和响应的数据都以二进制传输的[?]
    网站是基于HTTP协议的,如图片、CSS、JS等传输;
  HTTP传输过程  
    1 从网址到IP 
      输入地址回车,浏览器搜索自身DNS缓存,
      若未找到或缓存失效时,浏览器搜索操作系统的DNS缓存,
      若未找到,浏览器读取本地HOST文件,
      若未找到,浏览器发起DNS查询,系统向宽带运营商查询DNS,
      宽带运营商服务器查找自身缓存,
      若未成功,运营商服务器发起一个迭代DNS解析的请求,逐层向上查询,
      运营商服务器把结果返回操作系统,同时缓存起来,并返回给浏览器 
    2 浏览器发起HTTP"三次握手",建立'TCP/IP'连接 
    3 浏览器向服务器发送HTTP请求  
      浏览器向服务器发送请求命令
      浏览器发送请求头信息 
    4 服务器端接收请求,返回响应 
      根据路径及参数,经过后端的处理之后,把结果数据发送给浏览器,如请求页面 
      Web服务器发送应答信息 
      Web服务器向浏览器发送数据 
      Web服务器关闭TCP连接
    5 浏览器获取HTML页面,并解析和渲染页面 
    6 HTML中的JS、CSS、图片等静态资源,同样也通过HTTP请求来获取 
    7 最终浏览器渲染成功呈现页面  
  HTTP报文: 在HTTP应用程序之间发送的数据块,分为'请求报文'和'响应报文' 
    请求报文 
      <Method> <URL> <Protocol>/<version>   // 请求行 
        Method: 请求方法,如 GET/POST/...
        URL: 请求路径及查询参数 
        Protocol: 使用的协议,如 http/https 
        version: 协议版本号 
      key1: val1                            // 请求头 
        ★当前页信息 
        Host: yihuo.lcltst.com    // 必选,请求页所在的域 
        Referer:       // 请求页的URI 
          该英文的正确拼法为referrer 
        Origin: 'http://yihuo.lcltst.com'  // 
        User-Agent:    // 浏览器相关信息,浏览器的用户代理字符串 
        Client-IP      // 客户端IP 
        ★能力说明 
        Accept:     // 客户端能够处理的内容类型及相对优先级   
        Accept-Charset:      // 浏览器能识别显示的字符集 
        Accept-Encoding:   // 浏览器能够处理的压缩编码及优先级级  
          Accept-Encoding:gzip, deflate, sdch
        Accept-Language:  // 浏览器当前设置的语言 
          Accept-Language: zh-CN,zh;q=0.8,en;q=0.6
        ★请求内容信息 
        Content-Type:  // 请求体类型,GET无该项  
          'application/x-www-form-urlencoded' 默认方式,表单提交 
            只需在$.ajax({})参数中设置 processData = true[也是默认,可省略];
            Example:
                $.ajax({
                  method: 'POST',
                  url: '...',
                  data: dataToSend, 
                  /* dataToSend为Object类型的表单数据,否则jQuery会抛出异常 */
                  contentType: 'application/x-www-form-urlencoded',  // 可省略
                  processData: true,        // 可省略
                  success: function() {}
                });
          'multipart/form-data'  适合用于上传文件 
            首先,对表单数据构建成FormData的HTML5对象,代码如下。
            /* dataToSend 是FormData对象,可直接作为数据传输到后端 */
            var dataToSend= new FormData();      // HTML5对象, IE11以下不支持
            for (var key in data) {
              if (data.hasOwnProperty(key)) {
                dataToSend.append(key, data[key]);
              }
            }
            用$.ajax()方法传输数据
              processData与contentType必须设定为false,避免FormData对象被转换成URL编码
            $.ajax({
              method: 'POST',
              url: '...',
              data: dataToSend,          // dataToSend 是FormData对象
              
              contentType: false,        // contentType 必须设置为false
              processData: false,        // processData 必须设置为false
              
              success: function() { ... }
            });
          'text/plain'           传输字符串 
            $.ajax({
              method: 'POST',
              url: '...',
              data: dataToSend,         
              
              contentType: 'text/plain',       
              processData: false,      // processData 设置为false则不会转换成URL编码
              
              success: function() { ... }
            });
          'application/json'     传输JSON字符串 
            要用函数JSON.stringify()处理表单数据
            /* data 为表单Object类型的数据 */
            dataToSend = JSON.stringify(data);
            $.ajax({
              method: 'POST',
              url: '...',
              data: dataToSend,         
              
              contentType: 'application/json',       
              processData: false,     // processData 设置为false则不会转换成URL编码
              
              success: function() { ... }
            });
            若后端也返回JSON字符串时,success回调函数里接受到的数据参数仍为字符串,
            需要转换成Object类型[而Angular不需要];
            $.ajax({
              ...
              success: function(data) {
                var jsonData = JSON.parse(data);
                ...
              }
            });
          'text/xml'             传输XML 
            首先,构建XML文档对象,存入表单数据,代码如下。
            /* data参数为表单数据组成的对象,dataToSend为待发送给后端的数据 */
            var dataToSend = document.implementation.createDocument("", "formdata", null);
            var tempData = dataToSend.documentElement;
            for (var key in data) {
              if (data.hasOwnProperty(key)) {
                var keyElement = doc.createElement(key);
                keyElement.appendChild(doc.createTextNode(data[key]));
                tempData.appendChild(keyElement);
              }
            }
            /*
            xml文档格式示意:
            <formdata>
            <key1> value1 </key1>
            <key2> value2 </key2>
            </formdata>
            */
            发送数据dataToSend
            $.ajax({
              method: 'POST',
              url: '...',
              data: dataToSend,
              
              contentType: false,  // contentType 可设为false也可写成具体的'text/xml'等    
              processData: false,  // processData 必须设为false
              
              success: function() { ... }
            });
        Content-Length: 376  // 请求体大小 
        Cookie:       // 请求页Cookies  
        ★状态描述 
        Connection:      // 浏览器与服务器间连接的类型 
          'close'      指服务器像明确断开连接
          'Keep-Alive' 保持持久连接,'HTTP/1.1'前默认为非持久性的
            如需要保存持久连接,需要增加此字段
        ★控制信息 
        Cache-Control:  // 缓存控制 
          no-cache
        Pragma:      // 早期的随报文传送指示方式 
          no-cache 
        If-Match            如果ETag和文档当前ETag匹配,就获取文档
        If-Modified-Since   除非在某个指定日期之后修改过,否则限制这个请求
        If-None-Match       如果ETag和当前文档ETag不符合,获取资源
        If-Range            允许对文档否个范围内的条件请求
        If-Unmodified-Since 在某个指定日期之后没有修改过,否则现在请求
        ★
        Update:           给出了发送端可能想要升级使用新版本或协议
        Date:             日期,报文创建时间
        Via:              显示了报文经过的中间节点（代理、网关）
        Trailer:          如果报文采用分块传输编码方式,可以利用这个首部列出位于报文trailer部分的首部集合
        Trailer-Encoding: 告诉接收端对报文采用什么编码格式
        Proxy-Connection: keep-alive 
        Authorization       客户端的认证信息 
        From                客户端邮件地址
        Expect              允许客户端列出请求所要求的服务器行为
      // 空行 
      key1: val1                            // 可选,请求体 
        包含客户提交的查询字符串信息,表单信息等  
        GET请求无请求体,信息放在URL中 
    响应报文 
      <Protocol>/<version> <StatusCode> <StatusText> // 响应行 
        Protocol: 使用的协议,如 http/https 
        version: 协议版本号 
        StatusCode: 响应状态码,详见'Status Code' 
        StatusText: 响应状态文本描述[仅供查看,而不被浏览器识别]
      key1: val1                                  // 可选,响应头 
        PS: 包含如服务器类型、日期时间、内容类型和长度等信息  
        Content-Type:            响应MIME及编码  
          text/html; charset=utf8   HTML文件 
          application/javascript    JS文件
        Content-Encoding:        主体编码格式 
        Content-Length: <num>    响应的大小   
        Content-Language         解析主体时适用的语言 
        Content-Base             解析主体中相对URL的基础URL 
        Content-Location         资源实际位置 
        Content-MD5              主体的MD5校验和 
        Content-Range            在整个资源中此实体部分的字节范围  
        Set-Cookie       设置cookie 
        Connection       客户端和服务器是否保持连接,浏览器和服务器之间连接的类型 
        Pragma           早期的随报文传送指示方式
        Cache-Control    缓存控制 
        ETag: "4a67-55cfb373dc45b" 主体的实体标记  
        Update:           给出了发送端可能想要升级使用新版本或协议
        Via              显示了报文经过的中间节点（代理、网关）
        Trailer          如果报文采用分块传输编码方式,可以利用这个首部列出位于报文trailer部分的首部集合
        Trailer-Encoding 告诉接收端对报文采用什么编码格式
        Accept-Ranges: bytes
        Date: Sat, 04 Nov 2017 07:43:44 GMT   日期,报文创建时间
        Keep-Alive: timeout=38
        Last-Modified    实体最后一次修改时间 
          Last-Modified: Thu, 02 Nov 2017 07:48:36 GMT
        Server:         // 服务器软件名称及版本 
          Server: Apache/2.4.25 (Win32) OpenSSL/1.0.2j PHP/5.6.30
        Age              响应持续时间 
        Allow            列出了可用的请求方法 
        Location         告诉客户端实在在哪里,用于定向 
        Expires          过期时间  
      // 空行 
      key1: val1                                  // 可选,响应体   
  网址的组成  
    PS: 可用字符: 0-9,a-z,A-Z,其他用十六进制表示,并在每个字符前加%
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
  'Status Code'状态码: 表示请求的结果 
    PS:由三位数值组成,第一位表示其类别
    状态码被分为五大类: 
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
      新的URL在 Location 头中给出,浏览器会自动地访问新的URL 
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
    PS: 'http1.0'定义了8种方法,主要使用'GET'和'POST';
    GET,最常见的请求类型,常用于向服务器查询信息 
      一般用于信息获取.
      使用URL传递参数,发送的信息可见 
      对发送信息的数量有限制,一般在2000个字符内.
      必要时可将查询字符串参数追加到URL的末尾以便将信息发送给服务器.
      对于xhr而言,位于open方法的URL末尾的查询字符串必须经过正确的编码才行,
      查询字符串中每个参数的名称和值都需使用encodeURIComponent()进行编码,
      名值对必须由&分割.
    POST,通常用于向服务器发送应该被保存的数据 
      一般用于修改服务器上的资源.
      对发送信息的数量无限制.
      Remarks:
        表单提交时 Content-Type 为 application/x-www-form-urlencoded
    PUT,请求更新服务器端数据
    HEAD,检查一个对象是否存在 
      在服务器的响应中没有资源的内容,只有资源的一些基本信息
      主要用于
      1 在不获取资源的情况下获取资源信息（类型、大小等）
      2 通过状态码产看资源是否存在
      3 通过查看首部,测试资源是否被修改了
    DELETE,请求删除数据 
    CONNECT,对通道提供支持 
    TRACE,跟踪到服务器的路径 
    OPTIONS,查询Web服务器的性能 
    GET 和 POST 的区别
      一般的,向服务器发请求有两种方式:查询字符串和请求正文,
      通常,GET使用查询字符串,POST使用请求正文[若反过来也可,但无必要] 
      使用GET请求,可在查询字符串中看到所有的数据,包括隐藏域,且会限制查询字符串的长度,
      POST请求体无长度限制 
      POST比GET请求消耗的资源多一些 
  'HTTP'和'TCP'的区别
    TPC/IP 传输层协议: 解决数据如何在网络中传输,是一种'经过三次握手'的可靠的传输方式 
    HTTP 应用层协议: 是Web联网的基础,是建立在TCP协议之上的一种应用 
  HTTP 缓存 
    PS:缓存:存储指定资源的一份拷贝,并在下次请求该资源时提供该拷贝的技术 
    可划分为两种类型: 
      强缓存(200 from cache) 
        浏览器如果判断本地缓存未过期,就直接使用,无需发起http请求 
        http 1.0: Pragma/Expires
        http 1.1: Cache-Control/Max-Age
        注意: Max-Age不是一个头部,它是Cache-Control头部的值
      协商缓存(304)
        浏览器会向服务端发起http请求,然后服务端告诉浏览器文件未改变,让浏览器使用本地缓存 
        http 1.0: If-Modified-Since/Last-Modified 
        http 1.1: If-None-Match/E-tag 
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
        
      待整理: 
        http1.0 中的缓存控制: 
          Pragma: 
            严格来说,它不属于专门的缓存控制头部,
            但是它设置no-cache时可以让本地强缓存失效
          Expires: 
            服务端配置的,属于强缓存,
            用来控制在规定的时间之前,浏览器不会发出请求,而是直接使用本地缓存,
            注意,Expires一般对应服务器端时间,如Expires: Fri, 30 Oct 1998 14:19:41
          If-Modified-Since/Last-Modified: 
            这两个是成对出现的,属于协商缓存的内容,
            其中浏览器的头部是If-Modified-Since,而服务端的是Last-Modified,
            它的作用是,在发起请求时,如果If-Modified-Since和Last-Modified匹配,
            那么代表服务器资源并未改变,因此服务端不会返回资源实体,
            而是只返回头部,通知浏览器可以使用本地缓存。
            Last-Modified,顾名思义,指的是文件最后的修改时间,而且只能精确到1s以内
        http1.1 中的缓存控制: 
          Cache-Control: 
            缓存控制头部,有no-cache、max-age等多种取值
            Max-Age: 服务端配置的,用来控制强缓存,
            在规定的时间之内,浏览器无需发出请求,直接使用本地缓存,
            注意,Max-Age是Cache-Control头部的值,不是独立的头部,
            譬如Cache-Control: max-age=3600,而且它值得是绝对时间,由浏览器自己计算
          If-None-Match/E-tag: 
            这两个是成对出现的,属于协商缓存的内容,
            其中浏览器的头部是If-None-Match,而服务端的是E-tag,
            同样,发出请求后,如果If-None-Match和E-tag匹配,则代表内容未变,通知浏览器使用本地缓存,
            和Last-Modified不同,E-tag更精确,
            它是类似于指纹一样的东西,基于FileEtag INode Mtime Size生成,
            也就是说,只要文件变,指纹就会变,而且没有1s精确度的限制。
        Max-Age相比Expires？
          Expires使用的是服务器端的时间
          但是有时候会有这样一种情况-客户端时间和服务端不同步
          那这样,可能就会出问题了,造成了浏览器本地的缓存无用或者一直无法过期
          所以一般http1.1 后不推荐使用Expires
          而Max-Age使用的是客户端本地时间的计算,因此不会有这个问题
          因此推荐使用Max-Age。
          注意,如果同时启用了Cache-Control与Expires,Cache-Control优先级高。
        E-tag相比Last-Modified？
          Last-Modified: 
          表明服务端的文件最后何时改变的
          它有一个缺陷就是只能精确到1s,
          然后还有一个问题就是有的服务端的文件会周期性的改变,导致缓存失效
          而E-tag: 
          是一种指纹机制,代表文件相关指纹
          只有文件变才会变,也只要文件变就会变,
          也没有精确时间的限制,只要文件一遍,立马E-tag就不一样了
          如果同时带有E-tag和Last-Modified,服务端会优先检查E-tag        
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
'FTP',文件传输协议 
'SMTP',简单邮件传输协议 
--------------------------------------------------------------------------------
