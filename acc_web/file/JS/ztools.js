// 以下方法基于jQuery
!function(){
  window.ztools = {}; // 工具函数 
  // 通过 input type=file 获取到本地图片的 base64
  // var defe = new $.Deferred();
  ztools.getLocalImg = function(jInputElem,foo){
    jInputElem.on("change",function(e){
      var img = e.target.files[0];
      var fr = new FileReader();
      fr.readAsDataURL(img);
      // fr.readAsBinaryString(img);
      fr.onload = function(){
        // console.log(fr.result);
        var obj = {};
        obj.src = fr.result;
        obj.size = img.size; // 结果以 b 为单位
        obj.file = img;
        obj.more = fr;
        foo(obj);
      }
    })
  } 
  // 通过图片的地址或base64获取图片后,来压缩、裁剪图片
  // var defe = new $.Deferred();
  // param = {
  //   width : num,
  //   height: num,
  //   // 宽高可只填一个
  //   quality: num,[0-1 之间]
  // }
  ztools.dealImg = function ( imgSrc , param , resolve){
    var img = new Image();
    img.src = imgSrc;
    img.onload = function(){
      // 默认按比例压缩
      var w = this.width;
      var  h = this.height;
      var  scale = w / h;
      // 优先使用参数中设置的配置
      if (param.width && param.height) {
        w = param.width;
        h = param.height;
      }
      else if (param.width) {
        w = param.width;
        h = param.width / scale;
      }
      else if (param.height) {
        w = param.height;
        h = param.height * scale;
      }
      var canvas = document.createElement('canvas');
      //生成canvas
      canvas.width = w; 
      canvas.height = h;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(this, 0, 0, w, h);
      var quality = 1; 
      // 图像质量 默认设置为 1,不压缩
      if(param.quality && param.quality <= 1 && param.quality > 0){
        quality = param.quality;
      }
      var dealedImgSrc = canvas.toDataURL('image/jpeg', quality );
      resolve(dealedImgSrc);
    }
  }
  // 字符验证 
  ztools.strVerify = function ( currentVal ,standardVal , minLen , maxLen){
    var bool1 = true ,
    bool2 = true ,
    bool3 = true ;
    if (minLen  &&  currentVal.length <  minLen) {
      bool1 = false ;
    }
    if (maxLen && currentVal.length >  maxLen ) {
      bool2 = false ;
    }
    if (!standardVal.test(currentVal)) {
      bool3 = false ;
    }
    // console.log(bool1,bool2,bool3);
    return  bool1 && bool2 && bool3 ;
  }
  // localstorage 本地存储 读写
  ztools.localObjOpera = function(lsItem,key,val){
    if (localStorage[lsItem] === undefined) { // 不存在则初始化为一对象 
      localStorage[lsItem] = JSON.stringify({});
    }
    else if (typeof JSON.parse(localStorage[lsItem]) != 'object') {
      localStorage[lsItem] = JSON.stringify({});
      console.log('localStorage[lsItem] isnot object --ztools.localObjOpera');
    }
    var obj = JSON.parse(localStorage[lsItem]);
    if (val) {
      obj[key] = val;
      localStorage[lsItem] = JSON.stringify(obj);
    }
    else {
      return obj[key];
    }
  };
  // ztools.getData = function(str,val){
  //   var info1 = $('body').data(str);
  //   var foo = arguments.callee;
  //   if (info1 == undefined) {
  //     setTimeout(function(){
  //       foo(str,val);
  //     },99);
  //   }
  //   else {
  //     val['info'] = info1;
  //   }
  // };
  // 
  // 信息传递的推送和获取[先推送] 
  ztools.put = function (ename,data,elem){ 
    var el = elem || $('body');
    el.data(ename,data);
    el.trigger(ename,[data]);
  }
  ztools.get = function (ename,foo,bool,elem){ 
    var el = elem || $('body');
    var data1 = el.data(ename);
    if (data1) { // 当接受者为后出现时 
      foo(data1);
    }
    else { // 当接受者为先出现时 
      el.on(ename,function(e,data2){ 
        foo(data2) 
      })
    }
    // console.log($._data(el,'events'))
    if ($._data(el[0],'events') && !$._data(el[0],'events')[ename]) { // 如果事件不存在则绑定 
      el.on(ename,function(e,data2){ 
        foo(data2) 
      })
    }
  }
  // 弹窗效果 
    // param = {
    //   title : '使用的是默认标题', // 可选,默认为''
    //   txt : '使用的是默认提示文字', // 可选,默认提示文字
    //   appendPosition : 'body' ,  // 可选,默认'body'
    //   cancelBtn : 'inline-block', // 可选,当为 'none' 时,隐藏 取消按钮
    //   maskBool : 'none', // 可选,是否使用遮罩 
    //   confirmTxt : '确定', // 可选,默认为'确定'
    //   icon : 'fa-exclamation-circle', // 可选,默认为'fa-exclamation-circle redColor'
    //   height : ' 195px', // 可选,弹窗高度
    //   confirmClick : function(){ // 可选,点击确认按钮时的操作
    //   },
    //   cancelClick : function(){ // 可选,点击取消按钮时的操作
    //   },
    // }
  ztools.popUp = function(param) {
    var title = param.title || '';
    var txt = param.txt || '使用的是默认提示文字';
    var appendPosition = param.appendPosition || 'body';
    var cancelBtn = param.cancelBtn || 'inline-block';
    var maskBool = param.maskBool || "";
    var confirmTxt = param.confirmTxt || '确定'
    var height = param.height || '165px'
    var icon = icon || 'fa-exclamation-circle redColor';
    var html = 
    '<div id="_zpopUp">' + 
    '  <div class="mask '+ maskBool +'"> </div>' + 
    '  <div class="popup">' + 
    '    <i class="fa fa-close"></i>'+
    '    <div class="tl">'+title+'</div>'+
    '    <div class="txt"> <i class="fa '+icon+'"></i> '+ txt +' </div>' + 
    '    <div class="btns">' + 
    '      <button type="button" class="confirm btn redBg">'+ confirmTxt +'</button>' + 
    '      <button type="button" class="cancel btn blueBg">取消</button>' + 
    '    </div>' + 
    '  </div>' + 
    '  <style>' + 
    '  #_zpopUp {' + 
    '    position: relative;' + 
    '    z-index:99;' + 
    '  }' + 
    '  #_zpopUp .fa-close{' + 
    '    position: absolute;' + 
    '    top: 10px;' + 
    '    right: 10px;' + 
    '    cursor: pointer;' + 
    '    user-select: none;' + 
    '  }' + 
    '  #_zpopUp .tl{' + 
    '    padding: 6px 14px;' + 
    '    font-size: 18px;' + 
    '  }' + 
    '  #_zpopUp .mask{' + 
    '    position: fixed;' + 
    '    top: 0;left: 0;right: 0;bottom: 0;' + 
    '    background-color: rgba(0 , 0, 0, 0.5);' + 
    '  }' + 
    '  #_zpopUp .popup{' + 
    '    position: fixed;' + 
    '    top: 0;bottom: 0;right: 0;left: 0;margin: auto;' + 
    '    width: 450px;' + 
    '    height: '+height+';' + 
    '    background-color: #fff;' + 
    '    border: 1px solid #aaa;' + 
    '  }' + 
    '  #_zpopUp button{' + 
    '    padding: 5px 34px;' + 
    '    margin: 0 20px;' + 
    '    color: #fff;' + 
    '    border: none;' + 
    '  }' + 
    '  #_zpopUp .confirm {' + 
    '  }' + 
    '  #_zpopUp .txt{' + 
    '    margin-top: 20px;' + 
    '    text-align: center;' + 
    '    font-size: 21px;' +
    '    padding: 0 30px;' +
    '  }' + 
    '  #_zpopUp .txt img{' + 
    '    vertical-align: middle;' + 
    '  }' + 
    '  #_zpopUp .txt span{' + 
    '    vertical-align: middle;' + 
    '  }' + 
    '  #_zpopUp .txt .fa{' + 
    '    font-size: 24px;' + 
    '  }' + 
    '  #_zpopUp .btns{' + 
    '    width: 100%;' + 
    '    margin-top: 30px;' + 
    '    text-align: center;' + 
    '  }' + 
    '  #_zpopUp .cancel{' + 
    '    display: '+ cancelBtn +';' + 
    '  }' + 
    '  </style>' + 
    '</div>' ;
    $(appendPosition).append(html);
    
    var pop = $('#_zpopUp');
    pop.on('click','.confirm',function(e){
      pop.remove();
      param.confirmClick();
    })
    pop.on('click','.cancel',function(e){
      pop.remove();
      param.cancelClick();
    })
    pop.on('click','.fa-close',function(e){
      pop.remove();
      param.cancelClick();
    })
  }
  // 提示弹窗[会自动消失]
    // param = {
    //   title : '使用的是默认标题', // 该项可选,默认为''
    //   txt : '使用的是默认提示文字', // 默认提示文字
    //   appendPosition : 'body' ,  // 默认弹窗被放置的位置
    //   icon : '' ,  // 提示图标,默认为空,  可选如 "fa-exclamation-circle"
    //   time : 2, // 默认为2s消失
    //   foo : function(){ // 执行的回调
    //   },
    // }
  ztools.tipPop = function(param){
    var title = param.title || '提示' ;
    var txt = param.txt || '使用的是默认提示文字';
    var appendPosition = param.appendPosition || 'body';
    var icon = param.icon?'<i class="fa '+param.icon+'"></i>' : '<img src="/common/imgs/icon_check.png">';
    var time = param.time*1000 || 2000;
    var html = 
    '<div id="_zpopUp">' + 
    '  <div class="popup">' + 
    '    <i class="fa fa-close"></i>'+
    '    <div class="tl">'+title+'</div>'+
    '    <div class="txt"> '+ icon +'<span>'+ txt +'</span> </div>' +
    '    <div class="txt1"> '+ time/1000 +'s后自动消失! </div>' + 
    '  </div>' + 
    '  <style>' + 
    '  #_zpopUp {' + 
    '    position: relative;' + 
    '    z-index:99;' + 
    '  }' + 
    '  #_zpopUp .fa-close{' + 
    '    position: absolute;' + 
    '    top: 10px;' + 
    '    right: 10px;' + 
    '    cursor: pointer;' + 
    '    user-select: none;' + 
    '  }' + 
    '  #_zpopUp .tl{' + 
    '    padding: 6px 14px;' + 
    '    font-size: 18px;' + 
    '  }' + 
    '  #_zpopUp .popup{' + 
    '    position: fixed;' + 
    '    top: 0;bottom: 0;right: 0;left: 0;margin: auto;' + 
    '    width: 450px;' + 
    '    height: 160px;' + 
    '    background-color: #fff;' + 
    '    border: 1px solid #ccc;' + 
    '  }' + 
    '  #_zpopUp .txt{' + 
    '    margin-top: 24px;' +
    '    text-align: center;' + 
    '  }' + 
    '  #_zpopUp .txt span{' + 
    '    vertical-align: middle;' + 
    '    margin-left: 5px;' + 
    '  }' + 
    '  #_zpopUp .txt img{' + 
    '    vertical-align: middle;' + 
    '  }' + 
    '  #_zpopUp .txt1{' + 
    '    margin-top: 10px;' + 
    '    text-align: center;' + 
    '    color: #999;' + 
    '    font-size: 14px;' + 
    '  }' + 
    '  </style>' + 
    '</div>' ;
    if (!$('#_zpopUp').length) {
      $(appendPosition).append(html);
      var pop = $('#_zpopUp');
      pop.on('click','.fa-close',function(e){
        pop.remove();
      })
      setTimeout(function(){
        pop.remove();
        if (param.foo) {
          param.foo();
        }
      },time);
    }
  };
  // // 加载动画 
  //   // param = {
  //   //   txt : '使用的是默认提示文字', // 可选,默认提示文字
  //   //   appendPosition : 'body' ,  // 可选,默认'body'
  //   //   maskBool : 'none', // 可选,是否使用遮罩 
  //   //   icon : 'fa-exclamation-circle', // 可选,默认为'fa-exclamation-circle redColor'
  //   // }
  // ztools.loading = function(param){
  // };

  // 解析地址栏中的查询字符串
  ztools.searchStr2Obj = function(spaceMark,connector){
    var space = spaceMark || "&";
    var connect = connector || "=";
    var resultObj = {};
    var arr1 = location.search.slice(1).split(space);
    arr1.forEach(function(val,indx,arr){
      var arr2 = val.split(connect);
      resultObj[arr2[0]] = arr2[1];
    } );
    return resultObj;
  };

}();



  
