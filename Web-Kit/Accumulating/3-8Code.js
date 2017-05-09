插件
  使用 全局函数
    function foo(aoo){
      alert(aoo);
    }
    foo('12')
  使用 原型方法
    // 创建
    var Aoo = function(obj){
      this.a = obj.a;
      this.b = obj.b;
      console.log('初始化时就运行了');
      this.do2();
    }
    Aoo.prototype.do1 = function () {
      console.log(this.a);
    };
    Aoo.prototype.do2 = function () {
      console.log(this.b);
    };
    // 使用
    var aoo = new Aoo({
      a : '第一个参数',
      b : '第二个参数',
    }); 
    //  初始化时就运行了
    // 第二个参数
    aoo.do1(); 
    // 第一个参数
  使用 闭包
    function(){
      // code
      window.aoo = aoo; // 暴露接口
    }
--------------------------------------------------------------------------------
PC端
网络收集 
  获取、压缩图片
    <input type="file" name="" value="" id="fileChoose">
    var myFile = document.getElementById('fileChoose');
    myFile.onchange = function(event) {
      var selectedFile = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = function(){
        console.log(reader.result);
        dealImage(reader.result, { width : 500 }, function(base){
          // document.getElementById("transform").src = base;
          console.log("压缩后：" + base.length / 1024 + " " + base);　　　　
        })
        
      }
    }
    function dealImage(base64, obj, callback){
      var img = new Image();
      img.src = base64;
      img.onload = function(){
        // 默认按比例压缩
        var w = this.width,
        h = this.height,
        scale = w / h;
        w = obj.width || w;
        h = obj.height || (w / scale);
        var quality = 0.01;  // 默认图片质量为 0.7
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh); 
        ctx.drawImage(this, 0, 0, w, h);
        // 图像质量
        if(obj.quality && obj.quality <= 1 && obj.quality > 0){
          quality = obj.quality;
        }
        var base = canvas.toDataURL('image/jpeg', quality );
        callback(base);
        console.log(base);
      }
    }
    
    
    function addImg(base64,name){
      if (!name) {
        var name = 'to-do';
      }
      var html =
      '<div class="img-div">' + 
      '  <img src="'+ base64 +'" alt="">' + 
      '  <div class="title"> '+ name +' </div>' + 
      '  <div class="mask-selected none"> ✔ </div>' + 
      '</div>' ;
      $('.img-select-window .body').append(html);
    }
    function dealImg(base64,quality,sizeObj,callback){
      var img = new Image();
      img.src = base64;
      img.onload = function(){
        // 默认按比例压缩
        var w = this.width,
        h = this.height,
        scale = w / h;
        w = sizeObj.width || w;
        h = sizeObj.height || (w / scale);
        // var quality = 0.01;  // 默认图片质量为 0.7
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh); 
        ctx.drawImage(this, 0, 0, w, h);
        // 图像质量
        if(sizeObj.quality && sizeObj.quality <= 1 && sizeObj.quality > 0){
          quality = sizeObj.quality;
        }
        var resultBase = canvas.toDataURL('image/jpeg', quality );  
        // 此处只能为 jpeg ?     png则压缩 失败
        callback(resultBase);
      }
    }
    function inputChange(callback,quality,sizeObj,ccback){
      $('.btns .addImg-input').change(function(event){
        if ( event.target.files.length ) {
          var fs = event.target.files;
          var selectedFiles = [];
          var readers = [];
          for (var i = 0; i < fs.length ; i++) {
            selectedFiles[i] = fs[i];
            readers[i] = new FileReader();
            readers[i].readAsDataURL(selectedFiles[i]);
            readers[i].onload = function(){
              callback(this.result,quality,sizeObj,ccback);
            }
          }
        }
      })
    }
    inputChange(dealImg,0.1,{},addImg);
    
    
    <input type="file" name="" value="" id="fileChoose">
    <input type="button" name="" value="click me"> <br>
    var zDealImgs = function(elem,zObj ){
      var dealImage = function ( base64 , obj , callback){
        var img = new Image();
        img.src = base64;
        img.onload = function(){
          // 默认按比例压缩
          var w = this.width,
          h = this.height,
          scale = w / h;
          w = obj.width || w;
          h = obj.height || (w / scale);
          var quality = 1;  // 默认图片质量为 1
          //生成canvas
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          // 创建属性节点
          var anw = document.createAttribute("width");
          anw.nodeValue = w;
          var anh = document.createAttribute("height");
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh); 
          ctx.drawImage(this, 0, 0, w, h);
          // 图像质量
          if(obj.quality && obj.quality <= 1 && obj.quality > 0){
            quality = obj.quality;
          }
          var base = canvas.toDataURL('image/jpeg', quality );
          callback(base);
          // console.log(base);
        }
      }
      zDealImgs.go = function(){
        alert('图片加载失败');
      }
      elem.onchange = function(event) {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = function(){
          zResultImg = reader.result;
          zDealImgs.go = function(zCalback){
            dealImage( zResultImg , zObj , zCalback );
          }
        }
      }
    }
    var zFile = document.getElementById('fileChoose');
    var zSize = { quality : 1 , width   : 100, height  : 100 }
    var zGo = function(base){
      var html = `<img src="${base}" alt="">`;
      $('body').append(html);
      // console.log(base);　　　　
    }
    zDealImgs( zFile, zSize  );
    // zFile.addEventListener("change",function(){
    //   setTimeout(function(){
    //     zDealImgs.go(zGo); 
    //   },6);
    // }) 
    // 大约6毫秒可以处理完图片
    $('input[type=button]').click(function(){ zDealImgs.go(zGo); })
    
    // 处理多张图片
    <img src="./source/1.gif" alt="" class='img'>
    <img src="./source/2.gif" alt="" class='img'>
    var dealImage = function ( imgSelector , imgSetObj , callback){
      function dealOne(oneImg){
        var img = new Image();
        img.src = oneImg.src;
        img.onload = function(){
          // 默认按比例压缩
          var w = this.width, h = this.height, scale = w / h;
          w = imgSetObj.width || w;
          h = imgSetObj.height || (w / scale);
          var quality = 0.5;  // 默认设置为0.5
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
          var base = canvas.toDataURL('image/webp', quality );
          callback(base);
          // console.log(base);
        }
      }
      var imgElem = document.querySelectorAll(imgSelector);
      imgElem.forEach(function(val,indx,arr){
        dealOne(arr[indx]);
      })
    }
    var obj = {
      // width : 55,
      // height : 55,
      quality : 0.5
    };
    var appendImg = function(src){
      var img = new Image();
      img.src = src;
      document.body.appendChild(img);
    }
    dealImage('.img',obj,appendImg);
    
    // 根据canvas绘制尺寸来控制质量, 图片体积变化不明显而清晰度变化剧烈
    // Question: 跨域图片不能处理
    <img src="./source/jpg.jpg" alt="" class="myImg">
    <img src="./source/gif.gif" alt="" class="myImg">
    var dealImage = function ( imgSelector , imgSetObj , callback){
      function dealOneImg(imgElem,w2,h2){
        return  new Promise(function(rs , rj){
          var img = new Image();
          img.src = imgElem.src;
          img.onload = function(){
            var ws = this.width, // width show,得到的图片尺寸
            hs = this.height, 
            rate = ws / hs;     // 默认按比例压缩
            var quality = 0.8;  // 默认设置为0.8
            // 图像质量
            if(imgSetObj.quality && imgSetObj.quality <= 1 && imgSetObj.quality > 0){
              quality = imgSetObj.quality;
            }
            var wq = ws*quality , hq = hs*quality ; 
            // width quality,通过尺寸控制压缩质量
            if (imgSetObj.quality) {
              wq = w2 || ws*imgSetObj.quality;
              hq = h2 || hs*imgSetObj.quality;
            }
            ws = imgSetObj.width  || ws;
            hs = imgSetObj.height || (ws / rate);
            //生成canvas
            var canvas = document.createElement('canvas');
            canvas.width = wq; 
            canvas.height = hq;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(this, 0, 0, wq , hq);
            var base = canvas.toDataURL();
            var obj = {};
            obj.src = base;
            obj.w = ws;
            obj.h = hs;
            rs(obj);
          }
        });
      }
      var imgElem = document.querySelectorAll(imgSelector);
      imgElem.forEach(function(val,indx,arr){
        dealOneImg(val)
        .then(function(obj){
          var img1 = new Image();
          img1.src = obj.src;
          return dealOneImg(img1,obj.w,obj.h);
        })
        .then(function(obj){
          callback(obj.src);
          console.log(obj.src);
        });
      })
    }
    var obj = {
      width : 200,
      height : 200,
      quality : 0.4
    };
    var appendImg = function(src){
      var img = new Image();
      // img.width = '140';
      img.src = src;
      document.body.appendChild(img);
    }
    dealImage('.myImg',obj,appendImg);
  回到顶部
    <div class="top"> 11111 </div>
    $('.top').click(function () { 
      var elem = $('body');
      // var elem1 = $(document.body);
      // console.log(elem);
      // console.log(elem1);
      elem.animate({scrollTop: 0}, 800); 
    }); 
  图片预加载
    $.preloadImages = function () { 
      for (var i = 0; i < arguments.length; i++) {
        var img = $('<img>');
        img.attr('src', arguments[i]); 
      } 
    }; 
    $.preloadImages('img/hover1.png', 'img/hover2.png');
  自动修改破损图像
    若网站上有许多破碎的图像链接,可用一个不易被替换的图像来代替.
    添加这个简单的代码可以节省很多麻烦：
    即使网站没有破碎的图像链接,添加这段代码也没有任何害处。
    $('img').on('error', function () {
      $(this).prop('src', 'img/broken.png');
    });
  将指定字符替换为其变形后的字符
    function rule(str){ return str.slice(1,-3)*2 + 'vw'; }
    function strReplace(originStr,rgep,rule){
      var matchRgep = new RegExp(rgep,'g');
      var arr =originStr.match(matchRgep); // [" 100px;", " 60px;"]
      var resultStr = originStr;
      for (var i = 0; i < arr.length; i++) {
        resultStr = resultStr.replace(rgep,rule(arr[i]));
      }
      console.log(resultStr);  // style="width:720vw height:494vw720vw494vw"
    }
    // use
    var originStr = 'style="width: 360px; height: 247px; 360px; 247px;"' ;
    var replaceRgep = /\s(\d+)px;/;
    strReplace(originStr,replaceRgep,rule); 
    // style="width:720vw height:494vw720vw494vw"
  显示用户选取的本地图片
    假设有一个表单,用于用户选取图片。

    <input type="file" name="picture" accept="image/png, image/jpeg"/>
    一旦用户选中图片,将其显示在canvas的函数可以这样写：

    document.querySelector('input[name=picture]').onchange = function(e){
         readFile(e.target.files[0]);
    }

    function readFile(file){

      var reader = new FileReader();

      reader.onload = function(e){
        applyDataUrlToCanvas( reader.result );
      };

      reader.reaAsDataURL(file);
    }
    还可以在canvas上面定义拖放事件,允许用户直接拖放图片到上面。

    // stop FireFox from replacing the whole page with the file.
    canvas.ondragover = function () { return false; };

    // Add drop handler
    canvas.ondrop = function (e) {
      e.stopPropagation();
      e.preventDefault(); 
      e = e || window.event;
      var files = e.dataTransfer.files;
      if(files){
        readFile(files[0]);
      }
    };
    所有的拖放事件都有一个dataTransfer属性,它包含拖放过程涉及的二进制数据。

    还可以让canvas显示剪贴板中的图片。

    document.onpaste = function(e){
      e.preventDefault();
      if(e.clipboardData&&e.clipboardData.items){
        // pasted image
        for(var i=0, items = e.clipboardData.items;i<items.length;i++){
          if( items[i].kind==='file' && items[i].type.match(/^image/) ){
            readFile(items[i].getAsFile());
            break;
          }
        }
      }
      return false;
    };
  获取、设置input的光标位置
    <input type="text" name="" value="123456">
    (function($) {
      $.fn.getCursorPosition = function() {
        var input = this.get(0);
        if (!input) return; // No (input) element found
        if ('selectionStart' in input) {
          // Standard-compliant browsers
          return input.selectionStart;
        } 
        else if (document.selection) {
          // IE
          input.focus();
          var sel = document.selection.createRange();
          var selLen = document.selection.createRange().text.length;
          sel.moveStart('character', -input.value.length);
          return sel.text.length - selLen;
        }
      };
      $.fn.setCaretPosition = function(pos) {
        var input = this.get(0);
        if (!input) return; // No (input) element found
        if(input.setSelectionRange) {
          input.focus();
          input.setSelectionRange(pos,pos);
        }
        else if (input.createTextRange) {
          var range = input.createTextRange();
          range.collapse(true);
          range.moveEnd('character', pos);
          range.moveStart('character', pos);
          range.select();
        }
      };
    })(jQuery);
    $('input').click(function(){
      var pos = $('input').getCursorPosition();
      console.log('pos',pos);
      $('input').setCaretPosition(4);
      
    })
  鼠标拖动图片
    function dragElem(jelem,wrap = jelem.parent()){
      obj = {};
      var leftMax = wrap.width()-jelem.width();
      var topMax = wrap.height()-jelem.height();
      jelem[0].onmousedown = function(ev){
        var e = window.event|| ev;
        var oX=e.clientX - jelem[0].offsetLeft;
        var oY=e.clientY - jelem[0].offsetTop;
        document.onmousemove=function(ev){
          var e = window.event|| ev;
          e.preventDefault();
          var left = e.clientX-oX;
          var top = e.clientY-oY;
          if (left <0) { left = 0; }
          if (left > leftMax) { left = leftMax; }
          if (top < 0) { top = 0; }
          if (top > topMax) { top = topMax; }
          jelem[0].style.left = left +"px";
          jelem[0].style.top =  top +"px";
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
    var img1 = $('.phone .logo');
    dragElem(img1);
自我实现 
  滚动条滑动到底端的判断 
    <div class="wrap"> <div class="content"> </div> </div>
    function isScrollBottom(wrap,content,callback,arg1){
      var elem = $(wrap);
      var content = $(content);
      var scrollHeight = content.height();
      var clientHeight = elem.height();
      elem.scroll(function(){
        var scrollTop = $(this).scrollTop();
        if (scrollHeight == clientHeight + scrollTop) {
          callback(arg1);
        }
      })
    }
    isScrollBottom('.wrap','.content',console.log,'到底部了');
    判断条件 scrollTop + clientHeight == scrollHeight
      scrollTop    滚动条的滑动距离
      clientHeight 可视的高度
      scrollHeight  总高度,即可视高度和隐藏高度的和.
  多行文本省略显示 
    <div class="wrap"> 文字 </div>
    // 文字容器必须为非static定位元素
    function linesEndOmit(elem,linesNum){
      // 兼容写法
      var styleObj = getComputedStyle ? getComputedStyle(elem, null) : elem.currentStyle;
      var top = styleObj.lineHeight.slice(0,-2) * (linesNum -1);
      if (top + '' == 'NaN' ) {   // 默认行高 styleObj.lineHeight 值为 'normal'
        top = 18 * (linesNum -1); //chrome默认行高是18px
      }
      var color = styleObj.backgroundColor;
      var cName = 'fols-className-after'; // 自定义的 class name
      var htmlStyle = 
        '<style>'+
        '  .'+ cName +':after{'+
        '    content: "...";'+
        '    position: absolute;'+
        '    right: 0;'+
        '    top: '+ top +'px;'+
        '    background-color:'+ color +';'+
        '  }'+
        '</style>';
      document.querySelector("head").insertAdjacentHTML("beforeend",htmlStyle);
      elem.classList.add(cName);
    }
    var elem = document.querySelector(".wrap");
    linesEndOmit(elem,1);
  图片缩放、部分显示
--------------------------------------------------------------------------------
移动端
网络收集 
  通过rem开实现比例缩放的前提
    (function (d, w) {
      var docEl = d.documentElement,
      resizeEvt = 'orientationchange' in w ? 'orientationchange' : 'resize',
      recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 100 * (clientWidth / 1080) + 'px';
      };
      if (!d.addEventListener) return;
      w.addEventListener(resizeEvt, recalc, false);
      d.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
自我实现 
  滑动轮播插件
    .imgs{
      white-space: nowrap;
      overflow : hidden;
      font-size: 0;
      position: relative;
      height: 232.4*@wu;
      .wrap{
        position: absolute;
        width: 100%;
        .actImg{
          width: 100%;
        }
      }
      .indicate{
        position: absolute;
        width: 30%;
        height: 20*@wu;
        left: 0;
        right: 0;
        top: 210*@wu;
        margin: auto;
        span{
          display: inline-block;
          width: 28%;
          height: 33%;
          background-color: gray;
          margin-left: 2*@wu;
          margin-right: 2*@wu;
          border-radius: 5*@wu;
        }
      }
    }
    function scorllAnimate(showDiv,wrap,item,num){
      var width = $(item).width();
      var begin = 0;
      var end = 0;
      var len = 0;
      var left1 = 0;
      var n = 0;
      function indicateChange(n){
        $('.indicate span').removeClass('indicateColor');
        $('.indicate span').eq(n).addClass('indicateColor');
      }
      function startDo(e){
        begin = e.originalEvent.changedTouches[0].pageX;
        left1 = $(wrap).position().left;
      }
      function endDo(e){
        $(showDiv).off();
        end = e.originalEvent.changedTouches[0].pageX;
        if (begin < end) { // right
          len =  left1 + width;
          if (len > 0) { len = 0; }
        }else if (begin > end) {
          len = left1- width;
          if (len < -(num-1)*width) { len = -(num-1)*width; }
        } 
        $(wrap).animate({left : len },333,function(){
          n = -len / width ;
          indicateChange(n);
          bind();
        });
      }
      function moveDo(e){
        var l = e.originalEvent.changedTouches[0].pageX - begin;
        $(wrap).offset({top:$(wrap).offset({}).top,left:left1 +l});
      }
      function bind(){
        $(showDiv).on('touchstart',startDo);
        $(showDiv).on('touchend',endDo);
        $(showDiv).on('touchmove', moveDo);
      }
      bind();
    }
    scorllAnimate('.imgs','.wrap','.actImg',3);
  时间滑动选择插件
    .time-choose{
      background-color: #ddd;
      height: 40*6*@wu;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      .choose{
        font-size: 0;
        span{
          font-size: 18*@wu;
          display: inline-block;
          width: 50%;
          text-align: center;
          padding-top: 10*@wu;
        }
      }
      .wrap{
        font-size: 18*@wu;
        display: flex;
        .items-wrap{
          flex-grow:1;
          overflow: hidden;
          .time-items{
            height: 40*5*@wu;
            width: 110%;
            overflow: scroll;
            .time-item{
              text-align: center;
              height: 40*@wu;
              line-height: 40*@wu;
              // border-top: 0.5*@wu solid gray;
              // border-bottom: 0.5*@wu solid gray;
              width: 100%;
              box-sizing: border-box;
              padding-right: 8*@wu;
            }
            .time-item:nth-child(1){ opacity: 0.18; }
            .time-item:nth-child(2){ opacity: 0.5;font-size: 20*@wu; }
            .time-item:nth-child(3){ opacity: 1; font-size: 22*@wu;}
            .time-item:nth-child(4){ opacity: 0.5;font-size: 20*@wu; }
            .time-item:nth-child(5){ opacity: 0.18; }
          }
        }
        // &::before{
        //   content: '';
        //   width: 100%;
        //   border-top: 1*@wu gray solid;
        //   position: absolute;
        //   top: 80*@wu;
        //   left: 0;
        // }
        // &::after{
        //   content: '';
        //   width: 100%;
        //   border-top: 1*@wu gray solid;
        //   position: absolute;
        //   top: 120*@wu;
        //   left: 0;
        // }
      }
    }
    function timeSlider(){
      // 滑动修改时间
      var starty;
      var flagYear =true;
      var flagMonth =true;
      var flagDay =true;
      var flaghour =true;
      var flagmin =true;
      var year =$('.year');
      var month =$('.month');
      var day =$('.day');
      var hour =$('.hour');
      var minutes =$('.minutes');
      year.on('touchmove',function(e){
        if (flagYear) {
          starty =e.originalEvent.changedTouches[0].pageY;
          flagYear =false;
        }
        var endy = e.originalEvent.changedTouches[0].pageY;
        if (endy - starty < -20 ) { // 下滑
          var elem1 =$($(this).find('.time-item')[0]);
          var elem2 =$($(this).find('.time-item')[4]);
          var num = parseInt(elem2.text()) +1;
          elem1.text(num+"年");
          $(this).append(elem1);
          starty =endy;
        }
        if (endy -starty > 20 ) { // 上滑
          var elem1 =$($(this).find('.time-item')[0]);
          var elem2 =$($(this).find('.time-item')[4]);
          var num = parseInt(elem1.text()) -1;
          elem2.text(num+"年");
          $(this).prepend(elem2);
          starty =endy;
        }
      })
      year.on('touchend',function(){
        flagYear =true;
      })
      month.on('touchmove',function(e){
        if (flagMonth) {
          starty =e.originalEvent.changedTouches[0].pageY;
          flagMonth =false;
        }
        var endy = e.originalEvent.changedTouches[0].pageY;
        if (endy -starty < -20 ) {
          var elem1 =$($(this).find('.time-item')[0]);
          var elem2 =$($(this).find('.time-item')[4]);
          var num = parseInt(elem2.text()) +1;
          if (num == 13) { num =1; }
          elem1.text(num+'月');
          $(this).append(elem1);
          starty =endy;
        }
        if (endy -starty > 20 ) {
          var elem1 =$($(this).find('.time-item')[0]);
          var elem2 =$($(this).find('.time-item')[4]);
          var num = parseInt(elem1.text()) -1;
          if (num == 0 ) { num =12; }
          elem2.text(num+'月');
          $(this).prepend(elem2);
          starty =endy;
        }
      })
      month.on('touchend',function(){
        flagMonth =true;
      })
      var dayNum;
      day.on('touchmove',function(e){
        if (flagDay) {
          starty =e.originalEvent.changedTouches[0].pageY;
          flagDay =false;
          var y =parseInt($(year.find('.time-item')[2]).text());
          var m =parseInt($(month.find('.time-item')[2]).text());
          var time =new Date(y,m,0);
          dayNum =time.getDate();
        }
        var endy = e.originalEvent.changedTouches[0].pageY;
        var elem1 =$($(this).find('.time-item')[0]);
        var elem2 =$($(this).find('.time-item')[4]);
        if (endy -starty < -20 ) {
          var num = parseInt(elem2.text()) +1;
          if (num == (dayNum +1) ) { num =1; }
          elem1.text(num+'日');
          $(this).append(elem1);
          starty =endy;
        }
        if (endy -starty > 20 ) {
          var num = parseInt(elem1.text()) -1;
          if (num == 0 ) { num =dayNum; }
          elem2.text(num+'日');
          $(this).prepend(elem2);
          starty =endy;
        }
      })
      day.on('touchend',function(){
        flagDay =true;
      })
      hour.on('touchmove',function(e){
        if (flaghour) {
          starty =e.originalEvent.changedTouches[0].pageY;
          flaghour =false;
        }
        var endy = e.originalEvent.changedTouches[0].pageY;
        if (endy -starty < -20 ) {
          var elem1 =$($(this).find('.time-item')[0]);
          var elem2 =$($(this).find('.time-item')[4]);
          var num = parseInt(elem2.text()) +1;
          if (num == 24) { num =0; }
          elem1.text(num+'时');
          $(this).append(elem1);
          starty =endy;
        }
        if (endy -starty > 20 ) {
          var elem1 =$($(this).find('.time-item')[0]);
          var elem2 =$($(this).find('.time-item')[4]);
          var num = parseInt(elem1.text()) -1;
          if (num == -1 ) { num =23; }
          elem2.text(num+'时');
          $(this).prepend(elem2);
          starty =endy;
        }
      })
      hour.on('touchend',function(){
        flaghour =true;
      })
      minutes.on('touchmove',function(e){
        if (flagmin) {
          starty =e.originalEvent.changedTouches[0].pageY;
          flagmin =false;
        }
        var endy = e.originalEvent.changedTouches[0].pageY;
        if (endy -starty < -20 ) {
          var elem1 =$($(this).find('.time-item')[0]);
          var elem2 =$($(this).find('.time-item')[4]);
          var num = parseInt(elem2.text()) +1;
          if (num == 60) { num =0; }
          elem1.text(num+'分');
          $(this).append(elem1);
          starty =endy;
        }
        if (endy -starty > 20 ) {
          var elem1 =$($(this).find('.time-item')[0]);
          var elem2 =$($(this).find('.time-item')[4]);
          var num = parseInt(elem1.text()) -1;
          if (num == -1 ) { num =59; }
          elem2.text(num+'分');
          $(this).prepend(elem2);
          starty =endy;
        }
      })
      minutes.on('touchend',function(){
        flagmin =true;
      })
      $('body').on('touchmove',function(e){ // 阻止微信默认下拉出现的网址显示
        e.preventDefault()
      })
    }
    timeSlider();
  时间滑动选择插件2
    .time-choose{
      background-color: #ddd;
      position: fixed;
      bottom: 0; left: 0; right: 0;
      height: 3*40*@wu;
      overflow: hidden;
      .choose{
        background-color: #eee;
        z-index: 10;
        position: fixed;
        bottom: 3*40*@wu;
        width: 100%;
        font-size: 0;
        // border-bottom: 1*@wu solid #bbb;
        span{
          font-size: 18*@wu;
          display: inline-block;
          width: 50%;
          line-height: 45*@wu;
          text-align: center;
        }
      }
      .showDiv{
        position: absolute;
        top: 40*@wu;
        width: 100%;
        height: 40*@wu;
        background-color: #eee;
        overflow: visible;
      }
      .wrap{
        font-size: 18*@wu;
        text-align: center;
        width: 100%;
        position: absolute;
        // top: -40*@wu;
        .time-item{
          line-height: 40*@wu;
          height: 40*@wu;
          color: #999;
        }
      }
    }
    function slider(){
      var clickLocation = 0;
      var len = 0;
      var originLocation = 0;
      var height = $('.time-item').height(); // 条目高度
      var totalHeight = $(document).height(); 
      // 页面高度,用于确定到底部的位置,因为没有offset.bottom
      var num = $('.time-item').length; // 条目的总个数
      var num1 = 3;  // 展示的条目个数
      $('.wrap').on('touchstart',function(e){
        clickLocation = e.originalEvent.changedTouches[0].pageY;
        $(this).stop(true,true);  // 高频滑动时取消动画
      })
      $('.wrap').on('touchmove',function(e){
        len = e.originalEvent.changedTouches[0].pageY - clickLocation;
        $(this).css('top',originLocation + len)
        
        for (var i = 0; i < $('.time-item').length ; i++) {
          var ttt = $('.time-item').eq(i).offset().top;
          if (totalHeight -1.5*height >= ttt && ttt >totalHeight - 2.5* height ) {
            $('.time-item').removeClass('activeColor');
            $('.time-item').eq(i).addClass('activeColor');
            break;
          }
        }
      })
      $('.wrap').on('touchend',function(e){
        var topVal = $(this).css('top').slice(0,-2)
        if (topVal > (num1-2)*height) { topVal = (num1-2)*height; }
        if (topVal < -(num-2)*height) { topVal = -(num-2)*height; }
        originLocation = parseInt(topVal);
        $(this).animate({top : originLocation },200);
        
        for (var i = 0; i < $('.time-item').length ; i++) {
          var ttt = $('.time-item').eq(i).offset().top;
          if (totalHeight -1.5*height >= ttt && ttt >totalHeight - 2.5* height ) {
            $('.wrap').animate({top : -(i-1)*height },222);
            originLocation =  -(i-1)*height ;
            $('.time-item').removeClass('activeColor');
            $('.time-item').eq(i).addClass('activeColor');
            break;
          }
        }
      })
    }
    slider();
  水平方向滑动
    .wrapper{
      overflow: hidden;
      height: 80*@wu;
      position: relative;
      color: #fff;
      .content{
        position: absolute;
        top: 0;left: 0;
        white-space: nowrap;
        font-size: 0;
        .item{
          width: 160*@wu;
          height: 80*@wu;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          margin-right: 10*@wu;
          background-color: #b89981;
          padding: 3.8*@wu;
          box-sizing: border-box;
          outline: solid 0.5px #bbb;
          outline-offset: -4*@wu;
          &:last-child{
            margin-right: 100vw;
          }
          .top{
            height: 50*@wu;
            line-height: 50*@wu;
            border-bottom: 0.1px dashed #bbb;
            font-size: 17*@wu;
            font-weight: 600;
            width: 100%;
            text-align: center;
          }
          .btm{
            height: 100%;
            font-size: 12*@wu;
            display: flex;
            align-items: center;
          }
        }
      }
    }
    function slider(wrapper,content,item){
      var clickLocation = 0;
      var len = 0;
      var originLocation = 0;
      var margin = item.css('margin-right').slice(0,-2)*1 ;
      var selfWid = item.width()*1;
      var width = selfWid + margin ; // 条目高度
      var totlWid = wrapper.width()*1; 
      // 页面高度,用于确定到底部的位置,因为没有offset.bottom
      var num = item.length; // 条目的总个数
      var orginLeft = content.css('left').slice(0,-2)*1;
      content.on('touchstart',function(e){
        clickLocation = e.originalEvent.changedTouches[0].pageX;
        $(this).stop(true,true);  // 高频滑动时取消动画
      })
      content.on('touchmove',function(e){
        len = e.originalEvent.changedTouches[0].pageX - clickLocation;
        $(this).css('left',originLocation + len);
      })
      content.on('touchend',function(e){
        var topVal = $(this).css('left').slice(0,-2)*1;
        if (topVal > orginLeft) { 
          topVal = orginLeft;
         }
        if (topVal < -(num-1)*width + margin ) { 
          topVal = -(num-1)*width + margin; 
        }
        originLocation = parseInt(topVal);
        $(this).animate({left : originLocation },200);
        
      })
    }
    var wrapper1 = $('.member .wrapper');
    var content1 = $('.member .wrapper>.content');
    var item1 = $('.member .content>.item');
    slider(wrapper1,content1,item1);
--------------------------------------------------------------------------------
功能逻辑 
  一container中多个宽度相等item,多个item的总高度大于container的,
    当在item中滑动时, 判断那个item在container的可视范围中,显示的面积最大?
    注:可获取的到的参数有container的高度H,item的高度h,
    item顶部到container的顶部的距离top,item之间的间距m
    self: 判断显示面积最大,则判断item的中线和container中线的偏差值x,
      若多个偏差值相同,则取第一个.
      则 |x| = |(H-h)/2 - t|    「绝对值」
技巧方式总结
  在本地开起service服务时,可创建一个 *.json 文件,可用于AJAX获取模拟
    e.g.： 在页面中插入一张图
      目录结构 
      index.html
      source
      |--ajax-test.json
      文件内容
      // index.html 文件中
      <script type="text/javascript">
        var xhr = new XMLHttpRequest();
        xhr.open('get', './source/ajax-test.json', true);
        xhr.onreadystatechange = function() {
          if(xhr.readyState === 4) {
            console.log('state change end', xhr);
            console.log(xhr.status);
            console.log(xhr.response);
            var response = JSON.parse(xhr.response);
            console.log(response);
            addImg(response.img)
          } 
          else {
            console.log('change');
          }
        }
        xhr.send(null); 
        function addImg(url){
          document.body.insertAdjacentHTML("beforeend",`<img src=${url}>`);
        }
      </script>
      // ajax-test.json 文件中
      {
        "txt" : "这是一段用于测试的文字",
        "img" : "http://pic.58pic.com/58pic/17/48/00/59858PICQgT_1024.jpg"
      }
--------------------------------------------------------------------------------
Question & Idea 
  整理文档的代码,将HTML中的内联样式分离出来转换为内联样式
------------------------------------------------------------------------待整理 
  左右滑动
    <div class="wrap">
      <div class="num">
        <span class="page">1</span>/
        <span class="total">9</span>
      </div>
      <div class="imgs">
        <img src="../publicImg/地图1.png" alt="" class="img">
        <img src="../publicImg/地图31.png" alt="" class="img ">
        <img src="../publicImg/地图1.png" alt="" class="img ">
        <img src="../publicImg/地图31.png" alt="" class="img ">
        <img src="../publicImg/地图1.png" alt="" class="img ">
        <img src="../publicImg/地图31.png" alt="" class="img ">
        <img src="../publicImg/地图1.png" alt="" class="img ">
        <img src="../publicImg/地图31.png" alt="" class="img ">
        <img src="../publicImg/地图1.png" alt="" class="img ">
      </div>
    </div>
    .wrap{
      height: 100vh;
      width: 100vw;
      background-color: #646464;
      position: relative;
      overflow-x: hidden;
      .num{
        font-size: 16*@wu;;
        width: 100%;
        color: white;
        position: absolute;
        text-align: center;
        bottom: 15*@wu;
      }
      .imgs{
        font-size: 0;
        white-space: nowrap;
        position: absolute;
        left: 0;
        top: 0;
        margin-top: 20%;
        img{
          outline: 1px solid gray;
          width: 100vw;
        }
      }
    }
    !function(){
      var clickLocation = 0; originLocation = 0 , len = 0 , lef = 0 ;
      var num1 = 1 ;  // 展示的条目个数
      var num = $('.imgs>.img').length;     // 条目的总个数
      var width = $('.imgs>.img').width();  //  条目宽度
      var totalwidth = $(document).width(); // 总宽度
      $('.imgs').on('touchstart',function(e){
        clickLocation = e.originalEvent.changedTouches[0].pageX;
        $(this).stop(true,true);  // 高频滑动时取消动画
        lef = parseInt($(this).css('left').slice(0,-2));
      })
      $('.imgs').on('touchmove',function(e){
        len = e.originalEvent.changedTouches[0].pageX - clickLocation;
        $(this).css('left',lef + len)
      })
      $('.imgs').on('touchend',function(e){
        var finalLeft = 0;
        var endX = e.originalEvent.changedTouches[0].pageX
        var leftVal = $(this).css('left').slice(0,-2);
        
        // 超过范围时
        if ((leftVal > (num1-1)*width) || (leftVal < -(num-1)*width)) {
          if (leftVal > (num1-1)*width) { 
            leftVal = (num1-1)*width; 
          }
          if (leftVal < -(num-1)*width) { 
            leftVal = -(num-1)*width; 
          }
          originLocation = parseInt(leftVal);
          $(this).animate({left : originLocation },200);
          finalLeft = originLocation;
        }
        else {
          if (endX > clickLocation) { // 右滑
            finalLeft = lef + width;
          }
          else if (endX < clickLocation) { 
            finalLeft = lef - width;
          } 
          else {
            finalLeft = lef ; // 点击时执行
          }
          $(this).animate({left : finalLeft },200);
        }
        
        var finalNum = -Math.round(finalLeft/375) + 1
        console.log(finalNum);
        $('.wrap>.num>.page').text(finalNum)
        
      })
    }();

  上下滑动1
    <div class="card-choose">
        <div class="choose">
          <span>取消</span>
          <span>确定</span>
        </div>
        <div class="showDiv">
          
        </div>
        <div class="wrap" style="top: -160px;">
          <div class="card-item">军官证 </div>
          <div class="card-item">驾驶证 </div>
          <div class="card-item">身份证 </div>
          <div class="card-item">护照 </div>
          <div class="card-item">港澳台身份证 </div>
          <div class="card-item">警官证 </div>
          <div class="card-item activeColor">会员卡卡号 </div>
        </div>
    </div>  
    .card-choose {
      background-color: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 53.33333333vw;
      overflow: hidden;
    }
    .card-choose .choose {
      background-color: #eee;
      z-index: 10;
      position: fixed;
      bottom: 53.33333333vw;
      width: 100%;
      font-size: 0;
    }
    .card-choose .choose span:nth-child(1) {
      box-sizing: border-box;
      font-size: 4.8vw;
      display: inline-block;
      width: 50%;
      line-height: 12vw;
      text-align: left;
      padding-left: 6%;
    }
    .card-choose .choose span:nth-child(2) {
      box-sizing: border-box;
      font-size: 4.8vw;
      display: inline-block;
      width: 50%;
      line-height: 12vw;
      text-align: right;
      padding-right: 6%;
      color: #fe8a3d;
    }
    .card-choose .showDiv {
      position: absolute;
      top: 21.33333333vw;
      width: 100%;
      height: 10.66666667vw;
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;
      overflow: visible;
    }
    .card-choose .wrap {
      font-size: 4.8vw;
      text-align: center;
      width: 100%;
      position: absolute;
    }
    .card-choose .wrap .card-item {
      line-height: 10.66666667vw;
      height: 10.66666667vw;
      color: #999;
    }
    .activeOutline {
      outline: solid 0.26666667vw #ff0000 !important;
    }
    .activeColor {
      color: #000 !important;
      font-size: 22px !important;
    }
    .rolate {
      transform: rotate(180deg) !important;
    }
    
    function slider(){
      var clickLocation = 0;
      var len = 0;
      var originLocation = 0;
      var height = $('.card-item').height(); // 条目高度
      var totalHeight = $(document).height(); 
      // 页面高度,用于确定到底部的位置,因为没有offset.bottom
      var num = $('.card-item').length; // 条目的总个数
      var num1 = 5;  // 展示的条目个数
      $('.wrap').on('touchstart',function(e){
        clickLocation = e.originalEvent.changedTouches[0].pageY;
        $(this).stop(true,true);  // 高频滑动时取消动画
      })
      $('.wrap').on('touchmove',function(e){
        len = e.originalEvent.changedTouches[0].pageY - clickLocation;
        $(this).css('top',originLocation + len)
        
        for (var i = 0; i < $('.card-item').length ; i++) {
          var ttt = $('.card-item').eq(i).offset().top;
          if (totalHeight -2.5*height >= ttt && ttt >totalHeight - 3.5* height ) {
            $('.card-item').removeClass('activeColor');
            $('.card-item').eq(i).addClass('activeColor');
            break;
          }
        }
      })
      $('.wrap').on('touchend',function(e){
        var topVal = $(this).css('top').slice(0,-2)
        if (topVal > (num1-3)*height) { topVal = (num1-3)*height; }
        if (topVal < -(num-3)*height) { topVal = -(num-3)*height; }
        originLocation = parseInt(topVal);
        $(this).animate({top : originLocation },200);
        
        for (var i = 0; i < $('.card-item').length ; i++) {
          var ttt = $('.card-item').eq(i).offset().top;
          if (totalHeight -2.5*height >= ttt && ttt >totalHeight - 3.5* height ) {
            $('.wrap').animate({top : -(i-2)*height },222);
            originLocation =  -(i-2)*height ;
            $('.card-item').removeClass('activeColor');
            $('.card-item').eq(i).addClass('activeColor');
            break;
          }
        }
      })
    }
    slider();
  
  上下滑动2
    <div class = "time-choose">
      <div class = "choose " >
        <span class = "time-cancel " > 取消 < /span> 
        <span class = "time-confirm " > 确认 < /span> 
      </div> 
      <div class = "showDiv" > < /div> 
      <div class = "zWrap" >
        <div class = "zPadding" > < /div>
        <div class = "wrap " id = "eventSessionIdList"  >
        <div class = "time-item select-session" >
          2017 - 03 - 27 00: 00 - 2017 - 03 - 27 23: 59 
        </div> 
        <div class = "time-item select-session" > 
          2017 - 03 - 28 00: 00 - 2017 - 03 - 30 23: 59 
        </div> 
        <div class = "time-item select-session activeColor" > 
          2017 - 03 - 31 00: 00 - 2017 - 04 - 08 23: 59 
        </div>
      </div> 
      <div class = "zPadding" > < /div> 
    </div> 
    .time-choose {
      background-color: #ddd;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .time-choose .choose {
      background-color: #eee;
      width: 100%;
      font-size: 0;
      height: 11vw;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
    }
    .time-choose .choose span {
      font-size: 4.8vw;
      display: inline-block;
      width: 50%;
      line-height: 11vw;
      text-align: center;
    }
    .time-choose .showDiv {
      position: absolute;
      top: 22vw;
      width: 100%;
      height: 11vw;
      background-color: #eee;
    }
    .time-choose .zWrap{
      height: 33vw;
      position: relative;
      overflow: hidden;
    }
    .time-choose .zWrap .wrap {
      font-size: 4.8vw;
      text-align: center;
      width: 100%;
      position: absolute;
      height: 33vw;
    }
    .time-choose .zWrap .zPadding {
      height: 11vw;
    }
    .time-choose .zWrap .wrap .time-item {
      line-height: 11vw;
      height: 11vw;
      color: #999;
    }
    .activeColor {
      color: #000 !important;
      font-size: 4vw !important;
    }
    function slider() {
      var clickLocation = 0;
      var len = 0;
      var height = $('#eventSessionIdList>.time-item').height();
      var originLocation = height ;
      var totalHeight = $(document).height();
      var num = $('#eventSessionIdList>.time-item').length;
      var num1 = 3; // 展示的条目个数
      $('.zWrap').on('touchstart', function(e) {
        clickLocation = e.originalEvent.changedTouches[0].pageY ;
        $(this).find('.wrap').stop(true, true);
      })
      $('.zWrap').on('touchmove', function(e) {
        len = e.originalEvent.changedTouches[0].pageY - clickLocation;
        $(this).find('.wrap').css('top', originLocation + len);
        console.log(originLocation ,len);
        
        for (var i = 0; i < $('.time-item').length; i++) {
          var ttt = $('.time-item').eq(i).offset().top;
          if (totalHeight - 1.5 * height >= ttt && ttt > totalHeight - 2.5 * height) {
            $('.activeColor').removeClass('activeColor');
            $('.time-item').eq(i).addClass('activeColor');
            break;
          }
        }
      })
      $('.zWrap').on('touchend', function(e) {
        var topVal = $(this).find('.wrap').css('top').slice(0, -2)
        if (topVal > (num1 - 2) * height) {
          topVal = (num1 - 2) * height;
        }
        if (topVal < -(num - 2) * height) {
          topVal = -(num - 2) * height;
        }
        originLocation = parseInt(topVal) ;
        $(this).find('.wrap').animate({ top: originLocation }, 200);
               
        for (var i = 0; i < $('.time-item').length; i++) {
          var ttt = $('.time-item').eq(i).offset().top;
          if (totalHeight - 1.5 * height >= ttt && ttt > totalHeight - 2.5 * height) {
            $('.wrap').animate({ top: -(i -2) * height }, 222);
            originLocation =  -(i-2)*height ;
            $('.activeColor').removeClass('activeColor');
            $('.time-item').eq(i).addClass('activeColor');
            break;
          }
        }
      })
    }
    slider();

  拖动图片
    function dragElem(Jactiv,Jmover,Jwrap){
      var obj = {};
      Jactiv[0].onmousedown = function(ev){
        var leftMax = Jwrap.width()- 9 ;
        var topMax = Jwrap.height()- 9 ;
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
    var Jactiv1 = $('.phone .img img');
    var Jmover1 = $('.phone .img');
    var Jwrap1 = $('.phone');
    dragElem(Jactiv1,Jmover1,Jwrap1);
    
  缩放图片及部分显示图片
    function scaleElem(Jactiv,Jscaler,Jwrap,param){
      var obj = {};
      var oWidth , oHeight , width , height ;
      var oTop , oLeft , top , left;
      var img = Jscaler.find('img');
      Jactiv[0].onmousedown = function(ev){
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
    var Jactiv1 = $('.phone .img .top-resize');
    var Jactiv2 = $('.phone .img .rit-resize');
    var Jactiv3 = $('.phone .img .btm-resize');
    var Jactiv4 = $('.phone .img .lft-resize');
    var Jactiv5 = $('.phone .img .lt-resize');
    var Jactiv6 = $('.phone .img .lb-resize');
    var Jactiv7 = $('.phone .img .rt-resize');
    var Jactiv8 = $('.phone .img .rb-resize');
    var Jscaler1 = $('.phone .img');
    var Jwrap1 = $('.phone');
    scaleElem(Jactiv1,Jscaler1,Jwrap1,{width:false,height:true,direction:'top'});
    scaleElem(Jactiv2,Jscaler1,Jwrap1,{width:true,height:false,direction:'right'});
    scaleElem(Jactiv4,Jscaler1,Jwrap1,{width:true,height:false,direction:'left'});
    scaleElem(Jactiv3,Jscaler1,Jwrap1,{width:false,height:true,direction:'bottom'});
    scaleElem(Jactiv5,Jscaler1,Jwrap1,{width:true,height:true,direction:'lt'});
    scaleElem(Jactiv6,Jscaler1,Jwrap1,{width:true,height:true,direction:'lb'});
    scaleElem(Jactiv7,Jscaler1,Jwrap1,{width:true,height:true,direction:'rt'});
    scaleElem(Jactiv8,Jscaler1,Jwrap1,{width:true,height:true,direction:'rb'});









