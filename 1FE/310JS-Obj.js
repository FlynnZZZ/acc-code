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












