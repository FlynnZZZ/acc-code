

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
// 图片base64转Blob 
// 输出: blob  图片的blob 
var dataURLToBlob = function(base64){
  var _arr = base64.split(',')
  ,type = _arr[0].match(/:(.*?);/)[1]
  ,text = window.atob(_arr[1])
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
// 以上网络收集 --------------------------------------------------------------------------------

// 解析URL中的query成obj 
// 输出: obj 解析后的对象  
var urlQueryToObj = function(url){
  var _result = {}
  ,_query = url.split('?')[1] 
  if (!_query) { return {} }
  var _arr = _query.split('&') || [] 
  _arr.forEach(function(val,idx ){
    var _arr1 = val.split('=')
    _result[_arr1[0]] = _arr1[1]
  } )
  return _result 
}
// 序列化对象为字符串 
// 输出: str  序列化后的字符串,不包含'?' 
var objToQuery = function(
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
// 读写localStorage任意深度的值  
// 输出: 
//   读时,输出当前最深key对应的值,即使上层已不存在也不报错[返回undefined],但并未写入任何数据 
//   写时,输出当前key的所在的集合[对象/数组]  
var localData = function( 
  keys    // str,'aoo' 或 'aoo.boo' 等   
  ,setVal   // any,可选,存在则为写,省略则为读  val 
){ 
  var tmpArr = keys.split('.')
  ,tmpLen = tmpArr.length 
  ,firstKey = tmpArr[0]
  ,lastKey = tmpArr[tmpLen-1] 
  // 根节点  
  ,rootObj = JSON.parse( localStorage[firstKey] || JSON.stringify({}) )
  ,parentObj = null   // 最底层节点的父节点   
  
  if (tmpLen - 2 <= 0) { parentObj = rootObj }
  else {
    var _shortArr = tmpArr.slice(1,tmpLen-1) // 去头尾 
    ,_switch = false  
    parentObj = _shortArr.reduce(function(retVal ,val ,idx ,arr){ 
      // 读取时,上层已为undefined时,直接返回undefined,后续不再执行节省开销 
      if ( setVal === undefined && _switch ) { return } 
      var _currentNd = retVal[val] 
      ,_typ = typeof _currentNd 
      ,_nextMb = arr[idx+1] 
      ,_val = null 
      if ( _typ === 'object' ) { // 存在对象类型 
        _val = _currentNd 
      }
      else  {                    // 未定义/原始类型 赋值为引用类型  
        _switch = true 
        _val = isNaN(parseInt(_nextMb)) ? {} : [] 
      }
      retVal[val] = _val  // retVal为返回的引用,赋值会改变 rootObj 
      return _val         // 最终的返回值将 parentObj 和 rootObj 产生了引用关系 
    },rootObj)
  }
  
  
  if ( setVal === undefined ) {  // 读 
    if ( !parentObj ) { return parentObj ; }
    else { return parentObj[lastKey]; }
  }
  else {                         // 写 
    parentObj[lastKey] = setVal // parentObj 和 rootObj 存在引用关系,间接改变了 rootObj 
    localStorage[firstKey] = JSON.stringify(rootObj)
    return parentObj ;
  }
  
  
};
// 获取一张本地图片 异步 
// 输出: promise 'fulfilled'时传递图片信息对象img
// img 
//   .base64 
//   .file 
//   .size 
//   .more 
var imgGet = (function(){ 
  var _input = document.createElement("input") // 缓存元素  
  _input.setAttribute("type","file") 
  var _pms = new Promise(function(rs,rj){
    _input.addEventListener("change",function(evt){
      if (this.value) {
        var _img = this.files[0]
        this.value = ""; // 清空选择的图片 
        var _fr = new FileReader();
        _fr.readAsDataURL(_img);
        _fr.onload = function(){
          rs({ 
            base64: _fr.result 
            ,file: _img       
            ,size: _img.size  // 单位:b 
            ,more: _fr 
          })
        }
      }
    })
  })  
  return function(){
    _input.click(); 
    return _pms 
  };
})() 
// 获取多张本地图片 异步 
// 输出: promise 'fulfilled'时传递图片信息对象的数组imgArr 
// img 
//   .base64 
//   .file 
//   .size 
//   .more 
var imgsGet = (function(){ 
  var _input = document.createElement("input") // 缓存元素  
  _input.setAttribute("type","file") 
  _input.setAttribute("multiple",true) 
  
  var _pms = new Promise(function(rs,rj){
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
              rs(_arr); 
              that.value = ""; // 清空选择的图片 
            }
          } } 
        )
      }
    })
  })
  return function( ){
    _input.click(); 
    return _pms
  };
})() 
// 压缩单张图片 异步 
// 输出: promise 'fulfilled'时传递图片信息对象img  
// img  
//   .name 
//   .base64 
//   .blob 
var imgCompress = function(  // TODO: 大图片使用瓦片拆分进行压缩 
  imgObj    // obj,图片信息 
    // .name    图片名称  
    // .base64  图片base64 
  ,options = {
    quality: 1  // float,可选,指定压缩后的质量,范围: 0-1 
    ,width: 0   // num,可选,压缩后的宽,0表示不改变   
    ,height: 0  // num,可选,压缩后的高,0表示不改变 
  }
){ 
  var _img = new Image()
  return new Promise(function(rs,rj){
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
      // 铺底色
      _ctx.fillStyle = "#fff";
      _ctx.fillRect(0 ,0 ,_width1 ,_width1);
      
      _ctx.drawImage(this, 0, 0, _width1, _height1) 
      
      _canvas.toBlob(function(blobImg){
        var _base64 = _canvas.toDataURL('image/jpeg',_quality);
        rs({
          name: imgObj.name  // 图片的名称
          ,base64: _base64   // 图片的base64 
          ,blob: blobImg     // 图片的blob对象 
        })
      } ,'image/jpeg', _quality ) 
    }
  })
}
// 上传单张图片 异步 
// 输出: promise 'fulfilled'时传递图片信息对象img;'rejected'时传递失败信息msg 
// img 
//   .name  // 上传图片的名称
//   .file  // 上传图片的file对象 
//   .url   // 上传后的URL 
// msg   str 
var imgUpload = function(
  imgObj       // 图片 
    // .name   图片的名称 
    // .blob   图片的blob 
  ,options = {  // 配置参数 
    size: 50                // 图片尺寸限制,单位:kb 
    ,url: '127.0.0.1:8080'  // 图片上传地址,默认: '127.0.0.1:8080'  
    ,upLoadKey: 'uploadImg' // 上传的字段,默认: 'uploadImg'  
  }  
) {
  return new Promise(function(rs,rj){
    if ( imgObj.blob.size/1024 -  options.size > 0 ) {
      rj(`图片大小超过${options.size}KB`)
    }
    else {
      var _fileName = imgObj.name
      ,_fmDt = new FormData()
      ,_file = new File([imgObj.blob] ,_fileName ,{type:"image/png"})
      _fmDt.append(options.upLoadKey, _file  )
      
      // 此处 根据使用的AJAX插件及接口适当修改 
      http.post(options.url ,_fmDt )  // 附件上传
      .then(function(back){
        var _data = back.data 
        if (_data.error_code == 0) { rs({
          name: _fileName 
          ,file: _file  
          ,url: _data.data.url 
        })}
        else { rj(_data.info) }
      }
      ,function(err){
        rj(JSON.stringify(err))
        console.warn(options.url,err); 
      })
    }
  })
}


export {
  identOS 
  ,identBrowser 
  ,isLowIE 
  ,isSupportWebP 
  ,dataURLToBlob  
  
  ,urlQueryToObj 
  ,objToQuery 
  ,strCheck 
  ,localData  
  ,imgGet  
  ,imgsGet  
  ,imgCompress   
  ,imgUpload   
}



