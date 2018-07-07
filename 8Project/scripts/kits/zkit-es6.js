

// 获取操作系统类型  
// 输出: str 操作系统类型 
var identOS = function () {
  var userAgent = 'navigator' in window 
  && 'userAgent' in navigator 
  && navigator.userAgent.toLowerCase() || '';
  var vendor = 'navigator' in window 
  && 'vendor' in navigator 
  && navigator.vendor.toLowerCase() || '';
  var appVersion = 'navigator' in window 
  && 'appVersion' in navigator 
  && navigator.appVersion.toLowerCase() || '';
  
  if (/mac/i.test(appVersion)) return 'mac'
  if (/win/i.test(appVersion)) return 'windows'
  if (/linux/i.test(appVersion)) return 'linux'
  if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
  if (/android/i.test(userAgent)) return 'android'
  if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsphone'
  return 'unkonwn'
}
// 识别浏览器的类型和版本    
// 输出: str 浏览器类型和版本,形式:'<kind>:<version>'   
var identBrowser = function () {
  var sys = {}
  ,ua = navigator.userAgent.toLowerCase()
  ,s;
  
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
  (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
  (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
  (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
  (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
  (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
  (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
  // 根据关系进行判断
  if (sys.ie) return ('ie:' + sys.ie)
  if (sys.edge) return ('edge:' + sys.edge)
  if (sys.firefox) return ('firefox:' + sys.firefox)
  if (sys.chrome) return ('chrome:' + sys.chrome)
  if (sys.opera) return ('opera:' + sys.opera)
  if (sys.safari) return ('safari:' + sys.safari)
  return 'unkonwn:unkonwn'
}
// 检测是否为IE7、8、9 之一 
// 输出: bol,是否为指定的IE版本 
var isLowIE = function( 
  num  // 可选,7、8、9 之一  
){ 
  var b = document.createElement('b');
  b.innerHTML = '<!--[if IE ' + num + ']><i></i><![endif]-->';
  return b.getElementsByTagName('i').length === 1;
}
// 检测浏览器是否支持webP格式图片 
// 输出: bol  是否支持webP格式图片
var isSupportWebP = function () {
  return !![].map &&
  document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
  // [].map 用于判断是否 IE9+,以确保有 toDataURL 方法
}
// 以上网络收集 --------------------------------------------------------------------------------

// 序列化对象为字符串
// 输出: str  序列化后的字符串 
var objToStr = function(
  obj          // 待序列化的对象 TODO: 当对象为多维时 
  ,link1 = '='  // 键值连接符 
  ,link2 = '&'  // 字段连接符 
){
  var resultStr = ''
  for(var key in obj){
    resultStr = resultStr + key + link1 + obj[key] + link2 
  };
  return resultStr.slice(0,-1);
}
// 图片base64转Blob 
// 输出: blob  图片的blob 
var base64ToBlob = function(base64){
  var type = "image/jpeg" 
  ,text = window.atob(base64.split(",")[1])
  ,buffer = new ArrayBuffer(text.length)
  ,ubuffer = new Uint8Array(buffer)
  for (var i = 0; i < text.length; i++) {
    ubuffer[i] = text.charCodeAt(i);
  }
  
  var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder 
  ,blob = {}
  if (Builder) {
    var builder = new Builder();
    builder.append(buffer);
    blob = builder.getBlob(type);
  } 
  else {
    blob = new window.Blob([buffer], {type: type});
  }        
  
  return blob 
}
// 字符串检测 
// 输出: bol  是否全部通过检验 
var strCheck =  function( 
  arrArr  // 用于检测的字段 
  // [
  //   [ 
  //     '1771234560'     // 实际值 
  //     ,/^1\d{10}$/     // 匹配规则 
  //     ,'phone  wrong'  // 提示语 
  //     ,false           // 可选,是否可为空,默认:false 
  //   ]
  //   ,...
  // ]
  ,failFn = function(msg){ //  检验未通过时的回调函数
    // msg  arrArr中,出错项的提示语
    console.log(msg);
  }     
  ,successFn = function(num){ //  全部检测通过的回调函数
    console.log(num+'项全部检测通过');
  }
) { 
  var _bol0 = arrArr.every(function(val,idx,arr){
    if (!val[0] && val[3]) { return true; }
    else {
      if (val[0] == undefined) {
        failFn(val[2])
        return false;
      }
      var _bol1 = val[1].test(val[0])
      if (!_bol1) { failFn(val[2]) }
      return _bol1;
    }
  });
  if (_bol0) { successFn(arrArr.length) }
  return _bol0 
}
// 获取一张本地图片
// 输出: fn  执行fn获取图片,其参数fn1为获取后的回调,fn1的参数back为图片信息对象   
var imgGet = (function(){ 
  var _input = document.createElement("input") // 缓存元素  
  ,_foo = function(back){ 
    console.log(back,'请提供回调函数'); 
  }
  _input.setAttribute("type","file") 
  _input.addEventListener("change",function(evt){
    if (this.value) {
      var _img = this.files[0]
      this.value = ""; // 清空选择的图片 
      var _fr = new FileReader();
      _fr.readAsDataURL(_img);
      _fr.onload = function(){
        _foo({ 
          base64: _fr.result 
          ,file: _img       
          ,size: _img.size  // 单位:b 
          ,more: _fr 
        });
      }
    }
  })
  return function(
    foo  // fn,可选,获取到图片后的操作 
  ){
    if (foo) { _foo = foo; }
    _input.click(); 
  };
})() 
// 获取多张本地图片
// 输出: fn  执行fn获取图片,其参数fn1为获取后的回调,fn1的参数back为图片信息对象组成的数组    
var imgsGet = (function(){ 
  var _foo = function(back){ 
    console.log(back,'请提供回调函数'); 
  }
  ,_input = document.createElement("input") // 缓存元素  
  _input.setAttribute("type","file") 
  _input.setAttribute("multiple",true) 
  
  _input.addEventListener("change",function(evt){
    if (this.value) {
      var that = this 
      ,_files = this.files   
      ,_arr = [] 
      ,_counter = 0 
      Array.prototype.map.call(_files,function(_img,idx ){
        var _fr = new FileReader();
        _fr.readAsDataURL(_img);
        _fr.onload = function(){
          _counter++ 
          _arr.push({ 
            base64: _fr.result 
            ,file: _img       
            ,size: _img.size  // 单位:b 
            ,more: _fr 
          })
          if ( _files.length === _counter ) { 
            _foo(_arr); 
            that.value = ""; // 清空选择的图片 
          }
        } } 
      )
    }
  })
  return function(
    foo  // fn,可选,获取到图片后的操作 
  ){
    if (foo) { _foo = foo; }
    _input.click(); 
  };
})() 
// 压缩单张图片 
// 输出: undefined   
var imgCompress = function(
  imgObj    // obj,图片信息 
    // .name    图片名称  
    // .base64  图片base64 
  ,options = {
    quality: 1  // float,可选,指定压缩后的质量,范围: 0-1 
    ,width: 0   // num,可选,压缩后的宽,0表示不改变   
    ,height: 0  // num,可选,压缩后的高,0表示不改变 
  }
  ,callback = function(img){ // fn,指定压缩后的回调 
    // img  图片信息 
    //   .base64   图片的base64 
    //   .blob     图片的blob对象 
    console.log(img, '请指定回调函数');
  } 
){ 
  var _img = new Image()
  _img.src = imgObj.base64  
  _img.onload = function(){
    // 默认按比例压缩
    var _width0 = this.width
    ,_height0 = this.height
    ,_scale0 = _width0 / _height0 
    // 最终 质量 宽 高 
    if ( typeof options !== "object" ) { options = {} }
    var _width1 = options.width || _width0 
    ,_height1 = options.height || _width1/_scale0 || _height0 
    ,_quality = options.quality || 1  
    //生成canvas
    ,_canvas = document.createElement('canvas')
    ,_ctx = _canvas.getContext('2d') 
    
    _canvas.width = _width1 
    _canvas.height = _height1  
    _ctx.drawImage(this, 0, 0, _width1, _height1) 
    
    _canvas.toBlob(function(blobImg){
      var _base64 = _canvas.toDataURL('image/jpeg',_quality);
      callback({
        name: imgObj.name 
        ,base64: _base64 
        ,blob: blobImg
      })
    } ,'image/jpeg', _quality ) 
  }
}
// 上传单张图片 
// 输出: undefined   
var imgUpload = function(
  imgObj       // 图片 
    // .name   图片的名称 
    // .blob   图片的blob 
  ,options = {  // 配置参数 
    size: 50                // 图片尺寸限制,单位:kb 
    ,url: '127.0.0.1:8080'  // 图片上传地址,默认: '127.0.0.1:8080'  
    ,upLoadKey: 'uploadImg' // 上传的字段,默认: 'uploadImg'  
  }  
  ,upload = function(file){  // 获取图片后&上传前 
    // file  图片blob 
    console.log(file,'上传中');
  }
  ,failFn = function(msg){   // 上传失败后的回调 
    // msg  str,错误信息 
    console.log(msg,'上传失败');
  }  
  ,doneFn = function(url,name){   // 上传成功后的回调  
    // url  str,上传返回后的地址 
    // name str,上传图片的名称  
    console.log(url,'上传成功');
  }  
) {
  if ( imgObj.blob.size/1024 -  options.size > 0 ) {
    failFn(`图片大小超过${options.size}KB`)
  }
  else {
    var _fileName = imgObj.name
    ,_fmDt = new FormData()
    ,_file = new File([imgObj.blob] ,_fileName ,{type:"image/png"})
    _fmDt.append(options.upLoadKey, _file  )
    
    upload(_file) 
    
    // 此处 根据使用的AJAX插件及接口适当修改 
    http.post(options.url ,_fmDt )  // 附件上传
    .then(function(back){
      var _data = back.data 
      if (_data.error_code == 0) { doneFn(_data.data.url,_fileName) }
      else { failFn(_data.info) }
    }
    ,function(err){
      failFn(err)
      console.warn(options.url,err); 
    })
  }
}


export {
  identOS 
  ,identBrowser 
  ,isLowIE 
  ,isSupportWebP 
  
  ,objToStr 
  ,base64ToBlob 
  ,strCheck 
  ,imgGet  
  ,imgsGet  
  ,imgCompress   
  ,imgUpload   
}



