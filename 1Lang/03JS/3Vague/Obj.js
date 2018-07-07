'File API' [HTML5] [IE10+] 
  PS: HTML5中[通过添加multiple属性],input[file]内能一次选中多个文件, 
    控件内的每一个被选择的文件都是一个file对象,而FileList对象是file对象的列表
    HTML4中,file控件内只能选中一个文件 
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
    <input>元素选择文件后返回的FileList对象的成员
    拖放操作生成的 DataTransfer 对象
    HTMLCanvasElement 上执行 mozGetAsFile() 方法后返回结果 
  Proto: 
    .name      str,本地文件系统中的文件名 
    .lastModified       文件的上次修改时间,格式为时间戳 
    .lastModifiedDate   date,文件上一次被修改的时间 [仅Chrome支持]
    .webkitRelativePath  
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
URL,用于对二进制数据生成URL,生成指向File对象或Blob对象的URL[IE10+] 
  PS: 引用保存在File或Blob中数据的URL.
    使用对象URL的好处是可以不必把文件内容读取到JS中而直接使用文件内容.
    只要在需要文件内容的地方提供对象URL即可
  Extend: Object 
  Static: 
    .createObjectURL(blob)  str,创建url对象实例,将二进制数据生成一个URL 
      PS: 同样的二进制数据,每调用一次该方法,就会得到一个不同的URL, 
        该URL的存在时间,等同于网页的存在时间,一旦网页刷新或卸载,该URL将失效 
      Example: 
        // 传入一个合适的MIME类型
        var blob = new Blob([typedArray], {type: "application/octet-binary"});
        // 产生一类似'blob:d3958f5c-0777-0845-9dcf-2cb28783acaf'的URL字符串 
        // 同普通URL使用方式相同,如用在img.src上 
        var url = URL.createObjectURL(blob);
    .revokeObjectURL(url)   使createObjectURL生成的URL失效并释放内存  
  Proto: 
    .href  
    .origin  
    .protocol  
    .username  
    .password  
    .host  
    .hostname  
    .port  
    .pathname  
    .search  
    .searchParams  
    .hash  
    .toString() 
  Example: 
    在网页插入图片
    var img = document.createElement("img");
    img.src = window.URL.createObjectURL(files[0]);
    img.height = 60;
    img.onload = function(e) {
      window.URL.revokeObjectURL(this.src);
    }
    docment.body.appendChild(img);
    var info = document.createElement("span");
    info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
    docment.body.appendChild(info);
    
    本机视频预览
    var video = document.getElementById('video');
    var obj_url = window.URL.createObjectURL(blob);
    video.src = obj_url;
    video.play()
    window.URL.revokeObjectURL(obj_url);  
    
    function html5Reader(file) {         
      var fileObj = file.files[0],
      img = document.getElementById("img");   
      // URL.createObjectURL  safari不支持
      img.src = URL.createObjectURL(fileObj);
      img.onload =function() {
        var data = getBase64Image(img);
        console.log(data);  // 打印出base64编码
      }
    }
    function getBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
      var dataURL = canvas.toDataURL("image/"+ext);
      return dataURL;
    }
拖放事件: 从桌面上把文件拖放到浏览器中也会触发拖放事件 
  e.dataTransfer.files 获取到拖放到元素上的文件列表 












