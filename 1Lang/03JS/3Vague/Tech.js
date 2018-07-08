'File API' [HTML5] [IE10+] 
  PS: HTML5中[通过添加multiple属性],input[file]内能一次选中多个文件, 
    控件内的每一个被选择的文件都是一个file对象,而FileList对象是file对象的列表
    HTML4中,file控件内只能选中一个文件 
Blob,一个不可变、原始数据的类文件对象 
  PS: Blob表示的数据不一定是一个JavaScript原生格式. 
    File 接口基于Blob,继承 blob功能并将其扩展为支持用户系统上的文件.
  Extend: Object 
  Instance: 
    new Blob(partArr ,options?)  创建Blob对象 
      PS: 其内容由参数中给定的数组串联组成 
      Input: 
        partArr  arr,由 ArrayBuffer/ArrayBufferView/Blob/DOMString 等组成的数组或其他类似对象的混合体
          DOMString 会被编码为UTF-8。
        options  obj,可选,BlobPropertyBag字典配置项 
          .type     KW,可选,MIME类型  
            ""    默认值 
            'text/plain'  
          .endings  KW,可选,用于指定包含行结束符\n的字符串如何被写入
            "transparent"  默认值,保持blob中保存的结束符不变  
            "native"       行结束符会被更改为适合宿主操作系统文件系统的换行符
      Example:
        用字符串构建一个blob
        var debug = {hello: "world"};
        var blob = new Blob([JSON.stringify(debug)],{type: 'application/json'});
  Proto: 
    .size   num, Blob对象中所包含数据的大小,单位:b
    .type   str,Blob对象所包含数据的MIME类型 
      若类型未知,则为""  
      在Ajax操作中,若 xhr.responseType 设为 blob,接收的就是二进制数据 
    .slice(start? ,end? ,type?)  Blob,源blob的子集 
      Input: 
        start  num,可选,第一个会被拷贝进新的Blob的字节的位置
          默认值: 0
          负数表示 num+size 
            为偏移量将会从数据的末尾从后向前开始计算 
            -10 将会是  Blob 的最后十个字节 
          大于源 Blob 的长度,则返回一个长度为0并且不包含任何数据的一个 Blob 对象 
        end    num,可选,最后一个会被拷贝进新Blob的字节的位置
          默认值: 原始长度size
          负数表示 num+size 
            -1 对应的字节将会是被拷贝进新的Blob的最后一个字节 
          超出原始长度,则为原始长度 
        type   KW,可选,给新的 Blob 赋予一新的文档类型
          默认值: ""     
      Example:  使用XMLHttpRequest,将大文件分割上传
        var inputElem = document.querySelector('input[type="file"]');
        function upload(blobOrFile) {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', '/server', true);
          xhr.onload = function(e) { ... };
          xhr.send(blobOrFile);
        }
        inputElem.addEventListener('change', function(e) {
          var blob = this.files[0];
          const BYTES_PER_CHUNK = 1024 * 1024; // 1MB chunk sizes.
          const SIZE = blob.size;
          var start = 0 , end = BYTES_PER_CHUNK;
          while(start < SIZE) {
            var upBlob = blob.slice(start, end) ;
            upload(upBlob);
            start = end;
            end = start + BYTES_PER_CHUNK;
          }
        }, false);
    兼容性 
      blob.isClosed bol,指示 Blob.close() 是否在该对象上调用过
        关闭的 blob 对象不可读.
      blob.close() 关闭 Blob 对象,以便能释放底层资源 
  Expand: 
    利用Blob对象,生成可下载文件 
      var blob = new Blob(["文件内容"]);
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "文件名.txt";
      a.textContent = "点击下载";
      document.body.appendChild(a);
      最终HTML中显示为: 
      <a href="blob:http://main.lcltst.com/c175b53f-6b0c-43b0-bc63-b942461fb5ef" download="文件名.txt">点击下载</a>  
      点击后提示下载文本文件'文件名.txt',文件内容为'文件内容' 
  BlobBuilder,创建Blob对象[已废弃] 
    var builder = new BlobBuilder();
    var fileParts = ['<a id="a"><b id="b">hey!</b></a>'];
    builder.append(fileParts[0]);
    var myBlob = builder.getBlob('text/xml');
FileList,File对象的集合,表示用户选择的文件列表[HTML5] 
  Extend: Object 
    console.log(FileList.prototype.__proto__.constructor===Object); // true 
  Instance: input[type='file'].files 
  Proto: 
    .length 
    .item(idx)   File,文件 
File,文件 
  Extend: Blob 
    console.log(File.prototype.__proto__.constructor===Blob); // true 
  Instance: 
    new File(partArr ,filename ,options? )  
      PS: Edge浏览器不支持File对象构造函数 
      Input: 
        partArr   arr,ArrayBuffer/ArrayBufferView/Blob/DOMString 组成的数组或任何这些对象的组合
          文件内容的编码为 UTF-8 
        filename  str,文件名称/文件路径 
        options   obj,可选,包含文件的可选属性选项 
          .type          str,表示将要放到文件中的内容的 MIME 类型
            默认值:  "" 
          .lastModified  num,表示文件最后修改时间的Unix时间戳[ms]
            默认值: Date.now()       
      Example: var file = new File(["foo"], "foo.txt", { type: "text/plain" });
    <input>元素选择文件后返回的FileList对象的成员
    拖放操作生成的 DataTransfer 对象
    HTMLCanvasElement 上执行 mozGetAsFile() 方法后返回结果 
  Proto: 
    .name      str,本地文件系统中的文件名 
    .lastModified       num,文件上次修改的时间,格式:时间戳 
    .lastModifiedDate   date,文件上次修改的时间,格式:Date 对象 [仅Chrome支持]
    .webkitRelativePath  相关的 path 或 URL 
FileReader,一种异步的文件读取机制 
  Extend: EventTarget  
    console.log(FileReader.prototype.__proto__.constructor===EventTarget); // true 
  Instance: 
    new FileReader([file/blob])  创建fr对象 
  Proto: 
    常量: 
      .EMPTY    0   还没有加载任何数据 
      .LOADING  1   数据正在被加载 
      .DONE     2   已完成全部的读取请求 
    .readyState  num,表示FileReader状态的数字 
      0   EMPTY,还没有加载任何数据
      1   LOADING,数据正在被加载
      2   DONE,已完成全部的读取请求 
    .error    DOMException,表示在读取文件时发生的错误 
    .result   文件的URI数据,读取文件后该属性将被填充 
      数据的格式取决于读取操作的方法  
    .abort()  中断文件读取  
      readyState属性为DONE 
    .readAsBinaryString(Blob|File) 得到文件的原始二进制数据 
      PS: 通常将其传送到服务器端,服务器端可以通过这段字符串存储文件 
        该字符串每个字节包含一个0到255之间的整数
        可以读取任意类型的文件,而不仅仅是文本文件,返回文件的原始的二进制内容
        配合 xhr.sendAsBinary(),可上传任意文件到服务器 
      Example: 
        var fr = new FileReader();
        fr.onload = function(e) {
          var rawData = fr.result;
        }
        fr.readAsBinaryString(file);
    .readAsDataURL(Blob|File);     得到文件的'Data URL'的形式[基于Base64编码的'data-uri'对象] 
      PS: 将文件数据进行Base64编码,可将返回值作为图像的src 
    .readAsArrayBuffer(Blob|File)      得到文件的ArrayBuffer对象  
      返回一个类型化数组(ArrayBuffer),即固定长度的二进制缓存数据。
      在文件操作时(比如将JPEG图像转为PNG图像),这个方法非常方便。
      var fr = new FileReader();
      fr.onload = function(e) {
        var arrayBuffer = fr.result;
      }
      fr.readAsArrayBuffer(file);
    .readAsText(Blob|File ,encoding?)  得到文件的纯文本表现形式 
      encoding   可选,指定编码类型,默认为'UTF-8' 
    ★事件 
    .onloadstart 数据读取开始时触发
    .onprogress  数据读取中触发,每50ms左右触发一次 
      Example: 用来显示读取进度 
      var fr = new FileReader();
      fr.onprogress = function (e) {
        if (e.lengthComputable) {
          var percentLoaded = Math.round((e.loaded / e.totalEric Bidelman) * 100);
          var progress = document.querySelector('.percent');
          if (percentLoaded < 100) {
            progress.style.width = percentLoaded + '%';
            progress.textContent = percentLoaded + '%';
          }
        }
      }
    .onabort     读取中断或调用 fr.abort() 时触发 
    .onerror     数据读取出错时触发  
      触发error事件时,相关的信息在 fr.error.code 中,表示错误码
      1 未找到文件 
      2 安全性错误
      3 表示读取中断
      4 文件不可读
      5 编码错误
      Example:
        var fr = new FileReader();
        fr.onerror = errorHandler;
        function errorHandler(evt) {
          switch(evt.target.error.code) {
            case evt.target.error.NOT_FOUND_ERR:
            alert('File Not Found!');
            break;
            case evt.target.error.NOT_READABLE_ERR:
            alert('File is not readable');
            break;
            case evt.target.error.ABORT_ERR:
            break;
            default:
            alert('An error occurred reading this file.');
          };
        }
    .onload      读取成功后触发 
      load事件的回调函数接受一个事件对象,e.target.result 就是文件的内容 
      <input type="file" >
      var fr = new FileReader();
      fr.onload = function(e) {
        document.createElement('img').src = e.target.result;
        // 此时 fr.result === e.target.result 
      };
      document.querySelector("input[type='file']")
      .addEventListener("change",function(e){
        fr.readAsDataURL(e.target.files[0]);
      })
    .onloadend   读取完成后触发,不管是否成功 
      触发顺序排在onload或onerror后  
  Example: 
    读取文件内容后直接以二进制格式上传 
    var fr = new FileReader();
    fr.onload = function(){
      xhr.sendAsBinary(this.result); // chrome已移除 xhr.sendAsBinary 
    }
    // 把从input里读取的文件内容,放到fileReader的result字段里
    fr.readAsBinaryString(file);
    XMLHttpRequest.prototype.sendAsBinary = function(text){
      var data = new ArrayBuffer(text.length);
      var ui8a = new Uint8Array(data, 0);
      for (var i = 0; i < text.length; i++){ 
        ui8a[i] = (text.charCodeAt(i) & 0xff);
      }
      // 将字符串转成8位无符号整型,然后存放到一个8位无符号整型数组里面,
      // 再把整个数组发送出去。
      this.send(ui8a);
    }


























