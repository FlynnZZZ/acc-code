
(function ($){
// 定义全局变量 
window.ztools = {};

// 以下待整理----------------------------------------------------------------
 
// 弹窗定制
ztools.popUp = function(param) {
  var txt = param.txt || '使用的是默认提示文字';
  var appendPosition = param.appendPosition || 'body';
  var cancelBtn = param.cancelBtn || 'inline-block';
  var html = 
  '<div id="_zpopUp">' + 
  '  <div class="mask "> </div>' + 
  '  <div class="popup">' + 
  '    <div class="txt"> '+ txt +' </div>' + 
  '    <div class="btns">' + 
  '      <button type="button" name="button" class="confirm btn">确定</button>' + 
  '      <button type="button" name="button" class="cancel btn ">取消</button>' + 
  '    </div>' + 
  '  </div>' + 
  '  <style>' + 
  '  #_zpopUp {' + 
  '    position: relative;' + 
  '    z-index:99;' + 
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
  '    height: 150px;' + 
  '    background-color: #fff;' + 
  '    border: 1px solid #ccc;' + 
  '  }' + 
  '  #_zpopUp button{' + 
  '    padding: 3px 15px;' + 
  '    margin: 0 20px;' + 
  '  }' + 
  '  #_zpopUp .txt{' + 
  '    margin-top: 30px;' + 
  '    text-align: center;' + 
  '  }' + 
  '  #_zpopUp .btns{' + 
  '    position: absolute;' + 
  '    width: 100%;' + 
  '    bottom: 20px;' + 
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
    param.confirmClick();
    pop.remove();
  })
  pop.on('click','.cancel',function(e){
    param.cancelClick();
    pop.remove();
  })
}

// 路由控制
// 'www.aoo.com?ctt=xx&tab=xx'
// var s = location.search.slice(1);
// var s1 = s.split('&');
// var obj = {};
// s1.forEach(function(val,indx,arr){
//   var arr = val.split('=');
//   obj[arr[0]] = arr[1];
// });
// console.log(obj);

// 图片压缩  
// <img src="./source/1.gif" alt="" class='img'>
// <img src="./source/2.gif" alt="" class='img'>
function zDealImage ( imgSrc , imgSetObj , callback){
  var img = new Image();
  img.src = imgSrc;
  img.onload = function(){
    // 默认按比例压缩
    var w = this.width, h = this.height, scale = w / h;
    w = imgSetObj.width || w;
    h = imgSetObj.height || (w / scale);
    var quality = 1;  // 默认设置为1
    //生成canvas
    var canvas = document.createElement('canvas');
    canvas.width = w; 
    canvas.height = h;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(this, 0, 0, w, h);
    // 图像质量
    if(imgSetObj.quality && imgSetObj.quality <= 1 && imgSetObj.quality > 0){
      quality = imgSetObj.quality;
    }
    var base = canvas.toDataURL('image/jpeg', quality );
    callback(base);
    // console.log(base);
  }
}
// var obj = {
//   // width : 55,
//   // height : 55,
//   quality : 0.5
// };
// var appendImg = function(src){
//   var img = new Image();
//   img.src = src;
//   document.body.appendChild(img);
// }
// var imgsrc = $('.img')[0].src;
// zDealImage(imgsrc,obj,appendImg);

function getLocalImg(Jfile,cfoo){
  Jfile[0].onchange = function(event) {
    var selectedFile = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = function(){
      // console.log(reader.result);
      // getLocalImmg.src = reader.result;
      cfoo(reader.result);
    }
  }
}




// 表单验证 
function zFormVerify( nowVal ,standardVal , minLen , maxLen){
  var bool1 = true ,
  bool2 = true ,
  bool3 = true ;
  if (minLen  &&  nowVal.length <  minLen) {
    bool1 = false ;
  }
  if (maxLen && nowVal.length >  maxLen ) {
    bool2 = false ;
  }
  if (!standardVal.test(nowVal)) {
    bool3 = false ;
  }
  // console.log(bool1,bool2,bool3);
  return  bool1 && bool2 && bool3 ;
}





// 弹窗 
function zAlertTips(str,str1='确定',cfoo){
  var html = 
    '<div id="zAlertTips" class="">' +
    '  <div id="zMask"> </div>' +
    '  <div id="zShow">' +
    '    <div id="zMsg">'+ str +' </div>' +
    '    <div id="zBtnConfirm"> '+ str1 +' </div>' +
    '  </div>' +
    '  <style >' +
    '    #zAlertTips{' +
    '      position: absolute;' +
    '    }' +
    '    #zAlertTips #zMask{' +
    '      position: fixed;' +
    '      z-index: 100;' +
    '      top: 0;' +
    '      left: 0;' +
    '      width: 100vw;' +
    '      height: 100vh;' +
    '      background-color: #000;' +
    '      opacity: 0.3;' +
    '    }' +
    '    #zAlertTips  #zShow{' +
    '      position: fixed;' +
    '      z-index: 101;' +
    '      top: 50%;' +
    '      left: 50%;' +
    '      transform:translate(-50%,-50%);' +
    '      background-color: #e9dce5;' +
    '    }' +
    '    #zAlertTips #zMsg{' +
    '      width: 70vw;' +
    '      margin: auto;' +
    '      text-align: center;' +
    '      padding: 0 5vw;' +
    '      padding-top: 10vw;' +
    '    }' +
    '    #zAlertTips #zBtnConfirm{' +
    '      width: 20vw;' +
    '      height: 10vw;' +
    '      line-height: 10vw;' +
    '      margin: auto;' +
    '      text-align: center;' +
    '      border: 1px solid gray;' +
    '      border-radius: 3px;' +
    '      margin-top: 15vw;' +
    '      margin-bottom: 5vw;' +
    '    }' +
    '  </style>' +
    '</div>'  ;
  $('body').append(html);
  $('#zBtnConfirm').on('click',function(){
    $('#zAlertTips').remove();
    if (cfoo) { cfoo(); }
  })
  zAlertTips.click = function(){
    $('#zBtnConfirm').click();
  }
}

  
})(jQuery);









































