(2017-05-22 08:36:58) : (22873 79)
fileNum : 21
-------------------------------------------------------------------------------







-------------------------------------------------------------------------todo 
  路径控制 
    'www.aoo.com?ctt=xx&tab=xx'
    var s = location.search.slice(1);
    var s1 = s.split('&');
    var obj = {};
    s1.forEach(function(val,indx,arr){
      var arr = val.split('=');
      obj[arr[0]] = arr[1];
    });
    console.log(obj);

  整理fontawesome
    分类
    手势
    方向指示
    logo
    状态表示
    一个图标多个标签按标签组合来查找

  整理自己的 tools.js pub_less.less pub_js.js 
  
  百度编辑器

  获取图片的 base64
    $('.imgChoose input').on('change',function(e){
      var fil = e.target.files[0];
      var fr =new FileReader(fil); 
      var img = $(this).siblings('.img').find('img');
      fr.readAsDataURL(fil);
      fr.onload = function(){
        if (fil.size > 1024*1024*2) { //大于2M
          console.log(fil.size,'压缩图片');
          zTls.zAlertTips('照片尺寸大于2M!<br/>');
          zTls.zDealImage(fr.result,{quality : 0.1 } , function(src){
            img.attr('src',src);
            // console.log(fr.result);
            // console.log(src);
          })
        }
        else if (fil.size > 1024*1024*0.5) { // 大于0.5M 进行压缩
          console.log(fil.size,'压缩图片');
          zTls.zDealImage(fr.result,{quality : 0.2 } , function(src){
            img.attr('src',src);
            // console.log(fr.result);
            // console.log(src);
          })
        }
        else {
          img.attr('src',fr.result);
        }
      }
      
      img[0].onload = function(){ 
        heightFull(this); 
      }

    })

  拖动、缩放、拉伸和裁剪图片功能
    <div class="img img1">
      <img src="../../pub_img/logo3.png" alt="" class="logo edit-img">
      <div class="none resize top-resize"> </div>
      <div class="none resize rit-resize"> </div>
      <div class="none resize btm-resize"> </div>
      <div class="none resize lft-resize"> </div>
      <div class="none resize lt-resize "> </div>
      <div class="none resize lb-resize "> </div>
      <div class="none resize rt-resize "> </div>
      <div class="none resize rb-resize "> </div>
    </div>
    <div class="img img1">
      <img src="../../pub_img/logo3.png" alt="" class="logo edit-img">
      <div class="none resize top-resize"> </div>
      <div class="none resize rit-resize"> </div>
      <div class="none resize btm-resize"> </div>
      <div class="none resize lft-resize"> </div>
      <div class="none resize lt-resize "> </div>
      <div class="none resize lb-resize "> </div>
      <div class="none resize rt-resize "> </div>
      <div class="none resize rb-resize "> </div>
    </div>
    <div class="img img1">
      <img src="../../pub_img/logo3.png" alt="" class="logo edit-img">
      <div class="none resize top-resize"> </div>
      <div class="none resize rit-resize"> </div>
      <div class="none resize btm-resize"> </div>
      <div class="none resize lft-resize"> </div>
      <div class="none resize lt-resize "> </div>
      <div class="none resize lb-resize "> </div>
      <div class="none resize rt-resize "> </div>
      <div class="none resize rb-resize "> </div>
    </div>
    <div class="img img1">
      <img src="../../pub_img/logo3.png" alt="" class="logo edit-img">
      <div class="none resize top-resize"> </div>
      <div class="none resize rit-resize"> </div>
      <div class="none resize btm-resize"> </div>
      <div class="none resize lft-resize"> </div>
      <div class="none resize lt-resize "> </div>
      <div class="none resize lb-resize "> </div>
      <div class="none resize rt-resize "> </div>
      <div class="none resize rb-resize "> </div>
    </div> 
    .img{
      position: absolute;
      width: 222px;
      height: 88px;
      overflow: hidden;
      box-sizing: border-box;
      img{
        position: absolute;
        top: 0;left: 0;
        cursor: move;
        width: 100%;
        user-select:none;
      }
      .resize{
        width: 5px;
        height: 5px;
        border-radius: 50%;
        position: absolute;
        background-color: #fff;
        border: 1.5px  gold solid;
        box-sizing: border-box;
      }
      .top-resize{
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        cursor: s-resize;
      }
      .rit-resize{
        top: 0;bottom: 0;
        right: 0;
        margin: auto;
        cursor: e-resize;
      }
      .btm-resize{
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        cursor: s-resize;
      }
      .lft-resize{
        bottom: 0;
        top: 0;
        left: 0;
        margin: auto;
        cursor: e-resize;
      }
      .lt-resize{
        left: 0;
        top: 0;
        cursor: nw-resize;
      }
      .lb-resize{
        bottom: 0;
        left: 0;
        cursor: sw-resize;
      }
      .rt-resize{
        top: 0;
        right: 0;
        cursor: ne-resize;
      }
      .rb-resize{
        bottom: 0;
        right: 0;
        cursor: se-resize;
      }
    }
    // 拖动图片
    function dragElem(Jactiv,Jmover,Jwrap){
      Jactiv[0].onmousedown = function(ev){
        var obj = {};
        var leftMax = Jwrap.width()- Jmover.width() + Jactiv.width() - 9 ;
        var topMax = Jwrap.height()- Jmover.height() + Jactiv.height() - 9 ;
        var leftMin = -Jactiv.width() + 9;
        var topMin = -Jactiv.height() + 9;
        var e = window.event|| ev;
        var oX=e.clientX - Jmover[0].offsetLeft;
        var oY=e.clientY - Jmover[0].offsetTop;
        document.onmousemove=function(ev){
          var e = window.event|| ev;
          e.preventDefault();
          var left = e.clientX-oX;
          var top = e.clientY-oY;
          if (left < leftMin) { left = leftMin; }
          if (left > leftMax) { left = leftMax; }
          if (top < topMin) { top = topMin; }
          if (top > topMax) { top = topMax; }
          Jmover[0].style.left = left +"px";
          Jmover[0].style.top =  top +"px";
          obj.left = left;
          obj.top = top;
        }
        document.onmouseup=function(){
          document.onmousemove = null;
          document.onmouseup  = null;
          console.log(obj);
        }
      }
    }
    for (var i = 0; i < $('.phone .img').length ; i++) {
      var Jactiv1 = $('.phone .img img').eq(i);
      var Jmover1 = $('.phone .img').eq(i);
      dragElem(Jactiv1,Jmover1,Jwrap1);
    }
    // 缩放图片及部分显示图片
    function scaleElem(Jactiv,Jscaler,Jwrap,param){
      Jactiv[0].onmousedown = function(ev){
        var obj = {};
        var oWidth , oHeight , width , height ;
        var oTop , oLeft , top , left;
        var img = Jscaler.find('img');
        var e = window.event|| ev , 
        ox = e.clientX , 
        oy = e.clientY ;
        oWidth = Jscaler.width();
        oHeight = Jscaler.height();
        wid1 = img.width();
        heit1 = img.height();
        oTop = Jscaler[0].offsetTop;
        top1 = img[0].offsetTop;
        oLeft = Jscaler[0].offsetLeft;
        lft1 = img[0].offsetLeft;
        document.onmousemove=function(ev){
          var e = window.event|| ev;
          e.preventDefault();
          cx = e.clientX - ox;
          cy = e.clientY - oy;
          width = oWidth + cx;
          height = oHeight + cy;
          switch (param.direction) {
            case 'right':
              img[0].style.width = wid1 +"px";
              break;
            case 'top':
              height = oHeight - cy ;
              Jscaler[0].style.top = oTop + cy +"px";
              img[0].style.top = top1 - cy +"px";
              break;
            case 'left':
              width = oWidth - cx ;
              Jscaler[0].style.left = oLeft + cx +"px";
              img[0].style.width = wid1 +"px";
              img[0].style.left = lft1 - cx +"px";
              break;
            case 'rb':
              img[0].style.width = wid1 + cx +"px";
              img[0].style.height = heit1 + cy +"px";
              break;
            case 'rt':
              width = oWidth + cx;
              height = oHeight - cy;
              img[0].style.width = wid1 + cx +"px";
              img[0].style.height = heit1 - cy +"px";
              Jscaler[0].style.top = oTop + cy +"px";
              break;
            case 'lb':
              width = oWidth - cx;
              height = oHeight + cy;
              img[0].style.width = wid1 - cx +"px";
              img[0].style.height = heit1 + cy +"px";
              Jscaler[0].style.left = oLeft + cx +"px";
              break;
            case 'lt':
              width = oWidth - cx;
              height = oHeight - cy;
              img[0].style.width = wid1 - cx +"px";
              img[0].style.height = heit1 - cy +"px";
              Jscaler[0].style.left = oLeft + cx +"px";
              Jscaler[0].style.top = oTop + cy +"px";
              break;
            default:  // bottom
          }
          if (param.width) {
            Jscaler[0].style.width = width +"px";
            obj.width = width;
          }
          if (param.height) {
            Jscaler[0].style.height =  height +"px";
            obj.height = height;
          }
        }
        document.onmouseup=function(){
          document.onmousemove = null;
          document.onmouseup  = null;
          console.log(obj);
        }
      }
    }
    for (var i = 0; i < $('.phone .img').length; i++) {
      var Jactiv1 = $('.phone .img .top-resize').eq(i);
      var Jactiv2 = $('.phone .img .rit-resize').eq(i);
      var Jactiv3 = $('.phone .img .btm-resize').eq(i);
      var Jactiv4 = $('.phone .img .lft-resize').eq(i);
      var Jactiv5 = $('.phone .img .lt-resize').eq(i);
      var Jactiv6 = $('.phone .img .lb-resize').eq(i);
      var Jactiv7 = $('.phone .img .rt-resize').eq(i);
      var Jactiv8 = $('.phone .img .rb-resize').eq(i);
      var Jscaler1 = $('.phone .img').eq(i);
      scaleElem(Jactiv1,Jscaler1,Jwrap1,{width:false,height:true,direction:'top'});
      scaleElem(Jactiv2,Jscaler1,Jwrap1,{width:true,height:false,direction:'right'});
      scaleElem(Jactiv4,Jscaler1,Jwrap1,{width:true,height:false,direction:'left'});
      scaleElem(Jactiv3,Jscaler1,Jwrap1,{width:false,height:true,direction:'bottom'});
      scaleElem(Jactiv5,Jscaler1,Jwrap1,{width:true,height:true,direction:'lt'});
      scaleElem(Jactiv6,Jscaler1,Jwrap1,{width:true,height:true,direction:'lb'});
      scaleElem(Jactiv7,Jscaler1,Jwrap1,{width:true,height:true,direction:'rt'});
      scaleElem(Jactiv8,Jscaler1,Jwrap1,{width:true,height:true,direction:'rb'});
    }
    
    // 激活选中图片
    $('.phone').on('click','.img',function(){
      $('.phone .img').removeClass('activImg');
      $('.phone .img .resize').addClass('none');
      $(this).addClass('activImg');
      $(this).find('.resize').removeClass('none');
    })
    
    // 点击更换图片 更换有边框的图片
    $('#gameEdit .img-change').on('click',function(){
      $('.file-img').click();
      var img = $('.img.activImg img');
      var imgWidth = img.parent().width();
      zTls.getLocalImg($('.file-img'),function(src){
        img.attr('src',src).width(imgWidth);
        img[0].style.top = 0;
        img[0].style.left = 0;
      });
    })
    // 点击的其他效果
    $('.phone').on('click',function(e){
      var bool = $(e.target).closest('.img').hasClass('img')
      if (! bool) {
        $('.phone .img').removeClass('activImg');
        $('.phone .img .resize').addClass('none');
      }
    })

  1 tools.js
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
    
  myFra
    childCpt to  parentCpt  data  

    dq（）defer query
    
    data（） self then parent get




◆DeskTop 
  editor 
    snippets
    js-------------------

      
  QQInput
    自定义短语
    
◆NoteBook 
  editor 
    snippets
    html----------------------------
    JS------------------------------




      
    
  QQInput 
    自定义短语
    



jQuery 的 AJAX 属性
xhrFields: {
  withCredentials: true
},
crossDomain: true,


sudo 

v-model select bug 







