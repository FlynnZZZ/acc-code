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



    '.text.plain':
      '-★★★★★':
        'prefix': 'bj'
        'body': '★★★★★'
      '-「$1」':
        'prefix': 'kh'
        'body': '「$1」'
    '.text.plain.null-grammar':
      '-test':
        'prefix': 'test'
        'body': 'test'
    # -----------------------------------------------------------------------------
    '.text.html.basic':
      '-<div >$1</div>':
        'prefix': 'divNoClass'
        'body': '<div >$1</div>'
      '-html':
        'prefix': 'htmlSelf'
        'body': """
        <!DOCTYPE html>
        <html>
        
        <head>
          <meta charset="utf-8">
          <title>$1</title>
          <link rel="stylesheet" href="../css.css">
        </head>
        
        <body>
          
        </body>
        
        </html>"""
      '-html-mobile':
        'prefix': 'htmlMobile'
        'body': """
        <!DOCTYPE html>
        <html>
        
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
          <title>$1</title>
          <link rel="stylesheet" href="../css.css">
        </head>
        
        <body>
          
        </body>
        
        </html>"""
      '-<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">':
        'prefix': 'metaViewport'
        'body': '<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">'
      '-<section id="$1" class="">$2</section>':
        'prefix': 'section'
        'body': """<section id="$1" class="">
          $2
        </section>"""
      '-<script src="$1" charset="utf-8"></script>':
        'prefix': 'scriptSrc'
        'body': '<script src="$1" charset="utf-8"></script>'
      '-<span class="">$1</span>':
        'prefix': 'spanClass'
        'body': '<span class="">$1</span>'
      '-<style>$1</style>':
        'prefix': 'styleSelf'
        'body': '<style>\n\t$1\n</style>'
      '-class="$1"':
        'prefix': 'class'
        'body': 'class="$1"'
      '-id="$1"':
        'prefix': 'id'
        'body': 'id="$1"'
      '<?php $1 ?>':
        'prefix': 'php'
        'body': '<?php $1 ?>'
    # -----------------------------------------------------------------------------
    '.source.css':
      # 特殊符号
      '-/* $1 */':
        'prefix': 'zs'
        'body': '/* $1 */'
      '-animation:${1:name} 2s linear 1s infinite alternate;':
        'prefix': 'animation'
        'body': 'animation:${1:name} 2s linear 1s infinite alternate;'
      '-background-color:#b9e4e7;':
        'prefix': 'backgroundColorFast'
        'body': 'background-color:#b9e4e7;'
      '-border:solid blue 1px;':
        'prefix': 'borderFast'
        'body': 'border:solid blue 1px;'
      '-Microsoft YaHei':
        'prefix': 'MicrosoftYaHei'
        'body': 'Microsoft YaHei'
      '-no-repeat':
        'prefix': 'noRepeat1'
        'body': 'no-repeat'
      '-nth-child($1){$2}':
        'prefix': 'nthChild'
        'body': 'nth-child($1)'
      '-transform:${1:translate(length1,length1)};':
        'prefix': 'transform'
        'body': 'transform:${1:translate(length1,length1)};'
      '-transition:all 1s ease 0.5s;':
        'prefix': 'transition'
        'body': 'transition:all 1s ease 0.5s;'
      '-translate(length1,length1)':
        'prefix': 'translate'
        'body': 'translate(length1,length1)'
      '-transparent':
        'prefix': 'transparent'
        'body': 'transparent'
      '-user-select':
        'prefix': 'userSelect'
        'body': 'user-select:'
      '-@keyframes ${1:name}{}':
        'prefix': '@keyframes'
        'body': """@keyframes ${1:name}{
          form{
            
          }
          
          to{
            
          }
        }"""
    '.source.css.less':
      '-/* */':
        'prefix': 'zs'
        'body': '/* $1 */'
      '-@import "${1:../a.less}";':
        'prefix': 'import'
        'body': '@import "${1:../a.less}";'
      '-no-repeat':
        'prefix': 'noRepeat1'
        'body': 'no-repeat'
      '-*@wu':
        'prefix': 'wu'
        'body': '*@wu'
    # -----------------------------------------------------------------------------
    '.source.js':
      # 特殊符号
      '-「」':
        'prefix': 'kh'
        'body': '「$1」'
      '-/* $1 */':
        'prefix': 'zs'
        'body': '/* $1 */'
      '-($1) => {$2};':
        'prefix': 'functionArrows'
        'body': '($1) => {$2};'
      '-__proto__':
        'prefix': 'proto'
        'body': '__proto__'
      # A◆◆◆◆◆
      '-addEventListener();':
        'prefix': 'addEventListener'
        'body': """addEventListener("${1:click}",function(e){
          $2
        })
        """
      '-ajax':
        'prefix': 'ajax'
        'body':  """
          var xhr = new XMLHttpRequest();
          xhr.open('Method', 'Url', true);
          xhr.setRequestHeader('Content-Type', 'application/json'); // 可选
          xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
              console.log('state change end', xhr);
              console.log(xhr.status);
              console.log(xhr.response);
              var response = JSON.parse(xhr.response);
              console.log(response);
            } 
            else {
              console.log('change');
            }
          }
          var aoo = { username: 'gua', password: '123', };
          var data = JSON.stringify(aoo);
          xhr.send(data); 
          """
      '-alert($1);':
        'prefix': 'alert'
        'body': 'alert($1);'
      '-apply(thisArg[,arrays]);':
        'prefix': 'apply'
        'body': 'apply(${1:thisArg},${2:arrays});'
      '-arguments':
        'prefix': 'arguments'
        'body': 'arguments'
      '-autoprefixer':
        'prefix': 'autoprefixer'
        'body': 'autoprefixer'
      # B◆◆◆◆◆
      '-bind(thisArg[,arg1,arg2,...]);':
        'prefix': 'bind'
        'body': 'bind(${1:thisArg},${2:arg1,arg2,..});'
      '-blur':
        'prefix': 'blur'
        'body': 'blur'
      '-Boolean($1);':
        'prefix': 'Boolean'
        'body': 'Boolean($1);'
      # C◆◆◆◆◆
      '-call(thisArg[,arg1,arg2,...]);':
        'prefix': 'call'
        'body': """call(${1:thisArg},${2:arg1,arg2,..})"""
      '-caller':
        'prefix': 'caller'
        'body': 'caller'
      '-charAt(indx);':
        'prefix': 'charAt'
        'body': 'charAt($1);'
      '-charCodeAt(indx);':
        'prefix': 'charCodeAt'
        'body': 'charCodeAt($1);'
      '-clearInterval($1)':
        'prefix': 'clearInterval'
        'body': 'clearInterval($1)'
      '-clearTimeout($1)':
        'prefix': 'clearTimeout'
        'body': 'clearTimeout($1)'
      '-click':
        'prefix': 'click'
        'body': 'click'
      '-closest($1)':
        'prefix': 'closest'
        'body': 'closest($1)'
      '-cloneNode(bool);':
        'prefix': 'cloneNode'
        'body': 'cloneNode($1);'
      '-compile(rgep,modifier);':
        'prefix': 'compile'
        'body': 'compile($1);'
      '-concat($1)':
        'prefix': 'concat'
        'body': 'concat($1)'
      '-confirm(str)':
        'prefix': 'confirm'
        'body': 'confirm($1)'
      '-console':
        'prefix': 'console'
        'body': 'console'
      '-console.dir($1);':
        'prefix': 'consoledir'
        'body': 'console.dir($1);'
      '-console.log("$1",$2);':
        'prefix': 'consolelog'
        'body': 'console.log("$1",$2);'
      '-console.log("|" + "$1" + "|" );':
        'prefix': 'consolelog1'
        'body': 'console.log("|" + "$1" + "|" );'
      '-console.table($1)':
        'prefix': 'consoleTable'
        'body': 'console.table($1);'
      '-constructor':
        'prefix': 'constructor1'
        # 存在bug,当为 'prefix': 'constructor' 时
        'body': 'constructor'
      '-continue':
        'prefix': 'continue'
        'body': 'continue'
      '-createElement("$1");':
        'prefix': 'createElement'
        'body': 'createElement("$1");'
      # D◆◆◆◆◆
      '-Date($1);':
        'prefix': 'date'
        'body': 'Date($1);'
      '-Date.now();':
        'prefix': 'DateNow'
        'body': 'Date.now();'
      '-Date.parse(str/date);':
        'prefix': 'DateParse'
        'body': 'Date.parse($1);'
      '-Date.UTC(year,month[,...]);':
        'prefix': 'DateUTC'
        'body': 'Date.UTC($1);'
      '-default':
        'prefix': 'default'
        'body': 'default'
      '-delete $1':
        'prefix': 'delete'
        'body': 'delete $1'
      '-document':
        'prefix': 'document'
        'body': 'document'
      # E◆◆◆◆◆
      '-error':
        'prefix': 'error'
        'body': 'error'
      '-every(foo [,thisArg]);':
        'prefix': 'every'
        'body': """every(function(val,indx,arr){
          return ${2:[全部为真时,才为真]}
        },${1:thisArg});"""
      '-exec(str);':
        'prefix': 'exec'
        'body': 'exec($1);'
      '-export':
        'prefix': 'export'
        'body': 'export'
      # F◆◆◆◆◆
      '-false':
        'prefix': 'false'
        'body': 'false'
      '-filter(foo [,thisArg]);':
        'prefix': 'filter'
        'body': """filter(function(val,indx,arr){
            return ${2:true[保留]}
          } ,${1:thisArg});"""
      '-focus':
        'prefix': 'focus'
        'body': 'focus'
      '-for (var i = 0; i < $1; i++) { }':
        'prefix': 'for1'
        'body': """for (var i = 0; i < $1; i++) {
          $2
        }"""
      '-forEach(...);':
        'prefix': 'forEach'
        'body': """forEach(function(val,indx,arr){
          $1
        } );"""
      '-for-in;':
        'prefix': 'forin'
        'body': """for(var ${1:key} in ${2:obj}){
          $3
        };"""
      '-fromCharCode(num,num...);':
        'prefix': 'fromCharCode'
        'body': 'fromCharCode($1);'
      '-function':
        'prefix': 'function'
        'body': 'function'
      '-function()':
        'prefix': 'functionNo'
        'body': 'function($1){$2\n}'
      '-function $1($2){$3\n}':
        'prefix': 'functionName'
        'body': 'function $1($2){$3\n}'
      '-(function(){})()':
        'prefix': 'functionOnce'
        'body': '(function ($1){$3\n})($2);'
      # G◆◆◆◆◆
      '-GET':
        'prefix': 'get'
        'body': 'GET'
      '-getAttribute("$1");':
        'prefix': 'getAttribute'
        'body': 'getAttribute("$1");'
      '-getDate()':
        'prefix': 'getDate'
        'body': 'getDate();'
      '-getDay()':
        'prefix': 'getDay'
        'body': 'getDay();'
      '-getFullYear()':
        'prefix': 'getFullYear'
        'body': 'getFullYear();'
      '-getHours()':
        'prefix': 'getHours'
        'body': 'getHours();'
      '-getMonth()':
        'prefix': 'getMonth'
        'body': 'getMonth();'
      '-getMinutes()':
        'prefix': 'getMinutes'
        'body': 'getMinutes();'
      '-getMilliseconds()':
        'prefix': 'getMilliseconds'
        'body': 'getMilliseconds();'
      '-getSeconds()':
        'prefix': 'getSeconds'
        'body': 'getSeconds();'
      '-getTime();':
        'prefix': 'getTime'
        'body': 'getTime();'
      '-getTimezoneOffset();':
        'prefix': 'getTimezoneOffset'
        'body': 'getTimezoneOffset();'
      '-global':
        'prefix': 'global'
        'body': 'global'
      # H◆◆◆◆◆
      '-hasownProperty(str);':
        'prefix': 'hasownProperty'
        'body': 'hasownProperty(str);'
      '-history':
        'prefix': 'history'
        'body': 'history'
      # I◆◆◆◆◆
      '-id="$1"':
        'prefix': 'id'
        'body': 'id="$1"'
      '-ignoreCase':
        'prefix': 'ignoreCase'
        'body': 'ignoreCase'
      '-import':
        'prefix': 'import'
        'body': 'import'
      '-includes("$1");':
        'prefix': 'includes'
        'body': 'includes("$1");'
      '-indexOf(val[,begin])':
        'prefix': 'indexOf'
        'body': 'indexOf($1,0$2)$3'
      '-indexedDB':
        'prefix': 'indexedDB'
        'body': 'indexedDB'
      '-Infinity':
        'prefix': 'Infinity'
        'body': 'Infinity'
      '-innerHTML("$1");':
        'prefix': 'innerHTML'
        'body': 'innerHTML("$1");'
      '-innerText("$1");':
        'prefix': 'innerText'
        'body': 'innerText("$1");'
      '-instanceof':
        'prefix': 'instanceof'
        'body': 'instanceof'
      '-isArray($1);':
        'prefix': 'isArray'
        'body': 'isArray($1);'
      '-isFinite(num);':
        'prefix': 'isFinite'
        'body': 'isFinite(num);'
      '-isNaN(val);':
        'prefix': 'isNaN'
        'body': 'isNaN($1);'
      '-isPrototypeOf(obj);':
        'prefix': 'isPrototypeOf'
        'body': 'isPrototypeOf($1);'
      '-insertAdjacentHTML()':
        'prefix': 'insertAdjacentHTML'
        'body': 'insertAdjacentHTML("${1:beforeend}",#{2:html});'
      # J◆◆◆◆◆
      '-join([str]);':
        'prefix': 'join'
        'body': 'join($1);'
      '-jq-$':
        'prefix': 'jq'
        'body': '$($1)'
      '-jq-$.ajax({})':
        'prefix': 'ajaxJQ'
        'body': """$.ajax({
            type : 'get',
            url  : 'url',
            data : {
              key : val,
            }, 
            dataType : 'json',
            // contentType:'application/json',
            beforeSend : function(){ }, 
            // 发送请求前执行
            success  : function(backData,textStatus,obj){
            }, 
            error    : function (xhr,status,errorTrown){
            }, 
            complete : function(jqxhr,status){
              // 请求完成完后(无论成功与否)执行
            }, 
            cache : true / false 
            // 后续可能会调用缓存;false则不缓存,只对post方法有效,默认为true
          });"""
      '-jq-$.Deferred();':
        'prefix': 'deferred'
        'body': '$.Deferred();'
      '-jq-ajaxStart(cfoo);':
        'prefix': 'ajaxStart'
        'body': 'ajaxStart(function(){$1})'
      '-jq-ajaxStop(cfoo);':
        'prefix': 'ajaxStop'
        'body': 'ajaxStop(function(){$1})'
      '-jq-addClass("$1");':
        'prefix': 'addClass'
        'body': 'addClass("$1")'
      '-jq-after($1);':
        'prefix': 'after'
        'body': 'after($1)'
      '-jq-animate(params,time[,duration][,cfoo]);':
        'prefix': 'animate'
        'body': 'animate($1)'
      '-jq-andSelf($1);':
        'prefix': 'andSelf'
        'body': 'andSelf($1)'
      '-jq-append($1)':
        'prefix': 'append'
        'body': 'append($1)'
      '-jq-appendTo($1)':
        'prefix': 'appendTo'
        'body': 'appendTo($1)'
      '-jq-attr($1)':
        'prefix': 'attr'
        'body': 'attr($1)'
      '-jq-before($1)':
        'prefix': 'before'
        'body': 'before($1)'
      '-jq-children(["selector"])':
        'prefix': 'children'
        'body': 'children($1)'
      '-jq-clone([bool])':
        'prefix': 'clone'
        'body': 'clone($1)'
      '-jq-closest($1)':
        'prefix': 'closest'
        'body': 'closest($1)'
      '-jq-css($1)':
        'prefix': 'css'
        'body': 'css($1)'
      '-jq-data($1)':
        'prefix': 'data'
        'body': 'data($1)'
      '-jq-detach()':
        'prefix': 'detach'
        'body': 'detach()'
      '-jq-each(function(){})':
        'prefix': 'each'
        'body': """each(function(indx,elem){
          $1
          })"""
      '-jq-empty()':
        'prefix': 'empty'
        'body': 'empty()'
      '-jq-eq(indx)':
        'prefix': 'eq'
        'body': 'eq($1)'
      '-jq-fadeIn([time,cfoo])':
        'prefix': 'fadeIn'
        'body': 'fadeIn(${1:speed,cfoo})'
      '-jq-fadeOut([time,cfoo])':
        'prefix': 'fadeOut'
        'body': 'fadeOut(${1:speed,cfoo})'
      '-jq-fadeToggle([time,cfoo])':
        'prefix': 'fadeToggle'
        'body': 'fadeToggle(${1:speed,cfoo})'
      '-jq-fadeTo(time,opacity,cfoo)':
        'prefix': 'fadeTo'
        'body': 'fadeTo($1)'
      '-jq-find($1)':
        'prefix': 'find'
        'body': 'find($1)'
      '-jq-hasClass("$1")':
        'prefix': 'hasClass'
        'body': 'hasClass("$1")'
      '-jq-hide([time,cfoo])':
        'prefix': 'hide'
        'body': 'hide(${1:speed,cfoo})'
      '-jq-html($1)':
        'prefix': 'html'
        'body': 'html($1)'
      '-jq-index([$1])':
        'prefix': 'index'
        'body': 'index($1)'
      '-jq-innerHeight([$1])':
        'prefix': 'innerHeight'
        'body': 'innerHeight($1)'
      '-jq-innerWidth([$1])':
        'prefix': 'innerWidth'
        'body': 'innerWidth($1)'
      '-jq-jQuery':
        'prefix': 'jQuery'
        'body': 'jQuery'
      '-jq-insertAfter($1)':
        'prefix': 'insertAfter'
        'body': 'insertAfter($1)'
      '-jq-insertBefore($1)':
        'prefix': 'insertBefore'
        'body': 'insertBefore($1)'
      '-jq-metaKey':
        'prefix': 'metaKey'
        'body': 'metaKey'
      '-jq-next(["selector"])':
        'prefix': 'next'
        'body': 'next($1)'
      '-jq-nextAll(["selector"])':
        'prefix': 'nextAll'
        'body': 'nextAll($1)'
      '-jq-not($1)':
        'prefix': 'not'
        'body': 'not($1)'
      '-jq-offset([{top:num1,left:num2}])':
        'prefix': 'offset'
        'body': 'offset(${1:{top:num1,left:num2}})'
      '-jq-offsetParent()':
        'prefix': 'offsetParent'
        'body': 'offsetParent()'
      '-jq-on("${1:click}",cfoo)':
        'prefix': 'on'
        'body': """on("${1:click}",function(e){
            $2
          })"""
      '-jq-originalEvent':
        'prefix': 'originalEvent'
        'body': 'originalEvent'
      '-jq-outerHeight([true])':
        'prefix': 'outerHeight'
        'body': 'outerHeight(${1:true})'
      '-jq-outerWidth([true])':
        'prefix': 'outerWidth'
        'body': 'outerWidth(${1:true})'
      '-jq-parent(["selector"])':
        'prefix': 'parent'
        'body': 'parent($1)'
      '-jq-parents(["selector"])':
        'prefix': 'parents'
        'body': 'parents($1)'
      '-jq-position()':
        'prefix': 'position'
        'body': 'position()'
      '-jq-prepend($1)':
        'prefix': 'prepend'
        'body': 'prepend($1)'
      '-jq-prependTo($1)':
        'prefix': 'prependTo'
        'body': 'prependTo($1)'
      '-jq-prev(["selector"])':
        'prefix': 'prev'
        'body': 'prev($1)'
      '-jq-prevAll(["selector"])':
        'prefix': 'prevAll'
        'body': 'prevAll($1)'
      '-jq-prop($1)':
        'prefix': 'prop'
        'body': 'prop($1)'
      '-jq-relatedTarget':
        'prefix': 'relatedTarget'
        'body': 'relatedTarget'
      '-jq-removeAttr($1)':
        'prefix': 'removeAttr'
        'body': 'removeAttr($1)'
      '-jq-removeDate($1)':
        'prefix': 'removeDate'
        'body': 'removeDate($1)'
      '-jq-removeClass($1)':
        'prefix': 'removeClass'
        'body': 'removeClass($1)'
      '-jq-replaceAll($1)':
        'prefix': 'replaceAll'
        'body': 'replaceAll($1)'
      '-jq-replaceWith($1)':
        'prefix': 'replaceWith'
        'body': 'replaceWith($1)'
      '-jq-request()':
        'prefix': 'request'
        'body': 'request(url,function(err,response,data,){$1});'
      '-jq-scrollLeft([$1])':
        'prefix': 'scrollLeft'
        'body': 'scrollLeft($1)'
      '-jq-scrollTop([$1])':
        'prefix': 'scrollTop'
        'body': 'scrollTop($1)'
      '-jq-select()':
        'prefix': 'select'
        'body': 'select()'
      '-jq-show([time,cfoo])':
        'prefix': 'show'
        'body': 'show(${1:speed,cfoo})'
      '-jq-siblings("$1")':
        'prefix': 'siblings'
        'body': 'siblings("$1")'
      '-jq-slideDown([time,cfoo])':
        'prefix': 'slideDown'
        'body': 'slideDown(${1:speed,cfoo})'
      '-jq-slideUp([time,cfoo])':
        'prefix': 'slideUp'
        'body': 'slideUp(${1:speed,cfoo})'
      '-jq-slideToggle([time,cfoo])':
        'prefix': 'slideToggle'
        'body': 'slideToggle(${1:speed,cfoo})'
      '-jq-stop(bool1][,bool2])':
        'prefix': 'stop'
        'body': 'stop(${1:true,true})'
      '-jq-text($1);':
        'prefix': 'text'
        'body': 'text($1)'
      '-jq-toggle([time,cfoo])':
        'prefix': 'toggle'
        'body': 'toggle(${1:speed,cfoo})'
      '-jq-toggleClass("$1");':
        'prefix': 'toggleClass'
        'body': 'toggleClass("$1");'
      '-jq-trigger("event",[param1,param2,...]);':
        'prefix': 'trigger'
        'body': 'trigger("click",${1:param1,param2,...});'
      '-jq-unwrap($1);':
        'prefix': 'unwrap'
        'body': 'unwrap($1)'
      '-jq-val($1);':
        'prefix': 'val'
        'body': 'val($1)'
      '-jq-which':
        'prefix': 'which'
        'body': 'which'
      '-jq-wrap($1);':
        'prefix': 'wrap'
        'body': 'wrap($1)'
      '-jq-wrapAll($1);':
        'prefix': 'wrapAll'
        'body': 'wrapAll($1)'
      '-jq-wrapInner($1);':
        'prefix': 'wrapInner'
        'body': 'wrapInner($1)'
      '-JSON.parse($1);':
        'prefix': 'JSONparse'
        'body': 'JSON.parse($1);'
      '-JSON.stringify($1);':
        'prefix': 'JSONstringify'
        'body': 'JSON.stringify($1);'
      # L◆◆◆◆◆
      '-lastIndex':
        'prefix': 'lastIndex'
        'body': 'lastIndex'
      '-lastIndexOf($1);':
        'prefix': 'lastIndexOf'
        'body': 'lastIndexOf($1);'
      '-length':
        'prefix': 'length'
        'body': 'length'
      '-localStorage':
        'prefix': 'localStorage'
        'body': 'localStorage'
      '-location':
        'prefix': 'location'
        'body': 'location'
      # M◆◆◆◆◆
      '-map(cfoo[,thisArg]);':
        'prefix': 'map'
        'body': """var res = arr.map(function(val,indx,arr){
          return $2;
        },${1:thisArg})"""
      '-match(str);':
        'prefix': 'match'
        'body': 'match($1);'
      '-Math.abs(num)':
        'prefix': 'MathAbs'
        'body': 'Math.abs($1);'
      '-Math.acos(num)':
        'prefix': 'MathAcos'
        'body': 'Math.acos($1);'
      '-Math.asin(num)':
        'prefix': 'MathAsin'
        'body': 'Math.asin($1);'
      '-Math.atan(num)':
        'prefix': 'MathAtan'
        'body': 'Math.atan($1);'
      '-Math.ceil($1)-up':
        'prefix': 'Mathceil'
        'body': 'Math.ceil($1);'
      '-Math.cos(弧度值)':
        'prefix': 'MathCos'
        'body': 'Math.cos($1)'
      '-Math.exp(num)':
        'prefix': 'MathExp'
        'body': 'Math.exp($1);'
      '-Math.floor($1)':
        'prefix': 'Mathfloor'
        'body': 'Math.floor($1);'
      '-Math.log(num)':
        'prefix': 'MathLog'
        'body': 'Math.log($1);'
      '-Math.max(num1,num2,..)':
        'prefix': 'MathMax'
        'body': 'Math.max($1)'
      '-Math.min(num1,num2,..)':
        'prefix': 'MathMin'
        'body': 'Math.min($1)'
      '-Math.PI':
        'prefix': 'MathPI'
        'body': 'Math.PI'
      '-Math.pow($1)-幂':
        'prefix': 'Mathpow'
        'body': 'Math.pow($1);'
      '-Math.random();':
        'prefix': 'MathRandom'
        'body': 'Math.random();'
      '-Math.round($1)-四舍五入':
        'prefix': 'Mathround'
        'body': 'Math.round($1)'
      '-Math.sin(弧度值)':
        'prefix': 'MathSin'
        'body': 'Math.sin($1)'
      '-Math.sqrt(num)':
        'prefix': 'MathSqrt'
        'body': 'Math.sqrt($1)'
      '-Math.tan(弧度值)':
        'prefix': 'MathTan'
        'body': 'Math.tan($1)'
      '-Number($1);':
        'prefix': 'Number'
        'body': 'Number($1);'
      '-Number.MAX_VALUE-最大值':
        'prefix': 'NumberMaxValue'
        'body': 'Number.MAX_VALUE'
      '-Number.MIN_VALUE-最小值':
        'prefix': 'NumberMinValue'
        'body': 'Number.MIN_VALUE'
      '-Number.NEGATIVE_INFINITY-负无穷':
        'prefix': 'NumberNegativeInfinity'
        'body': 'Number.NEGATIVE_INFINITY'
      '-Number.POSITIVE_INFINITY-正无穷':
        'prefix': 'NumberPositiveInfinity'
        'body': 'Number.POSITIVE_INFINITY'
      # N◆◆◆◆◆
      '-navigator':
        'prefix': 'navigator'
        'body': 'navigator'
      # O◆◆◆◆◆
      '-Object':
        'prefix': 'Object'
        'body': 'Object'
      '-Object.assign(obj1,obj2,..);':
        'prefix': 'Objectassign'
        'body': 'Object.assign($1);'
      '-Object.getPrototypeOf(obj);':
        'prefix': 'ObjectGetPrototypeOf'
        'body': 'Object.getPrototypeOf($1);'
      '-Object.is(val1,val2);':
        'prefix': 'ObjectIs'
        'body': 'Object.is($1);'
      '-Object.keys(obj);':
        'prefix': 'Objectkeys'
        'body': 'Object.keys($1);'
      '-open()':
        'prefix': 'open'
        'body': 'open("${1:url}","_self");'
      # P◆◆◆◆◆
      '-prototype':
        'prefix': 'prototype'
        'body': 'prototype'
      # R◆◆◆◆◆
      '-readystatechange':
        'prefix': 'readystatechange'
        'body': 'readystatechange'
      '-RegExp.input;':
        'prefix': 'RegExpInput'
        'body': 'RegExp.input;'
      '-RegExp.lastMatch;':
        'prefix': 'RegExpLastMatch'
        'body': 'RegExp.lastMatch;'
      '-RegExp.lastParen;':
        'prefix': 'RegExpLastParen'
        'body': 'RegExp.lastParen;'
      '-RegExp.leftContext;':
        'prefix': 'RegExpLeftContext'
        'body': 'RegExp.leftContext;'
      '-RegExp.multiline;':
        'prefix': 'RegExpMultiline'
        'body': 'RegExp.multiline;'
      '-RegExp.rightContext;':
        'prefix': 'RegExpRightContext'
        'body': 'RegExp.rightContext;'
      '-reverse();':
        'prefix': 'reverse'
        'body': 'reverse();'
      # S◆◆◆◆◆
      '-search(str);':
        'prefix': 'search'
        'body': 'search($1);'
      '-shift()':
        'prefix': 'shift'
        'body': 'shift()'
      '-some(foo [,thisArg]);':
        'prefix': 'some'
        'body': """some(function(val,indx,arr){
          return ${2:[若存在返回值为真则返回真]}
        } ${1:,thisArg});"""
      # T◆◆◆◆◆
      '-test(str);':
        'prefix': 'test'
        'body': 'test($1);'
      # P◆◆◆◆◆
      '-pageX':
        'prefix': 'pageX'
        'body': 'pageX'
      '-pageY':
        'prefix': 'pageY'
        'body': 'pageY'
      '-parentElement':
        'prefix': 'parentElement'
        'body': 'parentElement'
      '-parse($1);':
        'prefix': 'parse'
        'body': 'parse($1);'
      '-parseFloat(str);':
        'prefix': 'parseFloat'
        'body': 'parseFloat($1);'
      '-parseInt(str[,radix]);':
        'prefix': 'parseInt'
        'body': 'parseInt(str,${1:radix});'
      '-pop();':
        'prefix': 'pop'
        'body': 'pop();'
      '-preventDefault()':
        'prefix': 'preventDefault'
        'body': 'preventDefault()'
      '-Promise($1)':
        'prefix': 'Promise'
        'body': 'Promise($1)'
      '-prompt("提示文字","默认显示文字");':
        'prefix': 'prompt'
        'body': 'prompt("提示文字","默认显示文字");'
      '-push($1);':
        'prefix': 'push'
        'body': 'push($1);'
      # Q◆◆◆◆◆
      '-querySelector("$1");':
        'prefix': 'querySelector'
        'body': 'querySelector("$1");'
      '-querySelectorAll("$1")':
        'prefix': 'querySelectorAll'
        'body': 'querySelector("$1")'
      # R◆◆◆◆◆
      '-reduce(foo[,initVal])':
        'prefix': 'reduce'
        'body': """reduce(function(retVal,currVal,indx,arr){ 
          return $2; 
        },${1:initVal});"""
      '-reduceRight(foo[,initVal])':
        'prefix': 'reduceRight'
        'body': """reduceRight(function(retVal,currVal,indx,arr){ 
          return $2; 
        },${1:initVal});"""
      '-remove("$1")':
        'prefix': 'remove'
        'body': 'remove("$1");'
      '-replace($1)':
        'prefix': 'replace'
        'body': 'replace($1);'
      '-require("$1");':
        'prefix': 'require'
        'body': 'require("$1");'
      '-return $1':
        'prefix': 'return'
        'body': 'return $1'
      '-RegExp($1)':
        'prefix': 'RegExp'
        'body': 'RegExp($1);'
      # S◆◆◆◆◆
      '-send()':
        'prefix': 'send'
        'body': 'send();'
      '-sessionStorage':
        'prefix': 'sessionStorage'
        'body': 'sessionStorage'
      '-setAttribute("$1","$2");':
        'prefix': 'setAttribute'
        'body': 'setAttribute("$1","$2");'
      '-setTimeout(${1:funName},${2:time});':
        'prefix': 'setTimeout'
        'body': 'setTimeout(${1:funName},${2:time});'
      '-slice(begin[,end]);':
        'prefix': 'slice'
        'body': 'slice($1);'
      '-sort([foo])':
        'prefix': 'sort'
        'body': """sort(${1:function(val1,val2){
          return ${2:true[改变顺序]}
        }});"""
      '-Source':
        'prefix': 'Source'
        'body': 'Source'
      '-splice(begin ,num ,v1,v2,...)':
        'prefix': 'splice'
        'body': 'splice(${1:begin},${2:num},${3:v1,v2,...})'
      '-split("$1");':
        'prefix': 'split'
        'body': 'split("$1");'
      '-stopPropagation();':
        'prefix': 'stopPropagation'
        'body': 'stopPropagation();'
      '-stringify($1);':
        'prefix': 'stringify'
        'body': 'stringify($1);'
      '-substr(begin[,num]);':
        'prefix': 'substr'
        'body': 'substr($1);'
      '-substring(indx1,indx2);':
        'prefix': 'substring'
        'body': 'substring($1);'
      '-success':
        'prefix': 'success'
        'body': 'success'
      # T◆◆◆◆◆
      '-target.':
        'prefix': 'target'
        'body': 'target'
      '-this':
        'prefix': 'this'
        'body': 'this'
      '-toDateString();':
        'prefix': 'toDateString'
        'body': 'toDateString();'
      '-toLocaleString();':
        'prefix': 'toLocaleString'
        'body': 'toLocaleString();'
      '-toFixed(num);':
        'prefix': 'toFixed'
        'body': 'toFixed($1);'
      '-toLocaleDateString();':
        'prefix': 'toLocaleDateString'
        'body': 'toLocaleDateString();'
      '-toLocaleTimeString();':
        'prefix': 'toLocaleTimeString'
        'body': 'toLocaleTimeString();'
      '-toLowerCase();':
        'prefix': 'toLowerCase'
        'body': 'toLowerCase();'
      '-toString();':
        'prefix': 'toString'
        'body': 'toString();'
      '-toTimeString();':
        'prefix': 'toTimeString'
        'body': 'toTimeString();'
      '-touchstart':
        'prefix': 'touchstart'
        'body': 'touchstart'
      '-touchmove':
        'prefix': 'touchmove'
        'body': 'touchmove'
      '-touchend':
        'prefix': 'touchend'
        'body': 'touchend'
      '-toUTCString();':
        'prefix': 'toUTCString'
        'body': 'toUTCString();'
      '-toUpperCase();':
        'prefix': 'toUpperCase'
        'body': 'toUpperCase();'
      '-trim();':
        'prefix': 'trim'
        'body': 'trim();'
      '-typeof':
        'prefix': 'typeof'
        'body': 'typeof'
      # U◆◆◆◆◆
      '-unshift(val1[,val2,...]);':
        'prefix': 'unshift'
        'body': 'unshift($1);'
      # V◆◆◆◆◆
      '-valueOf();':
        'prefix': 'valueOf'
        'body': 'valueOf();'
      # W◆◆◆◆◆
      '-WebSocket(url);':
        'prefix': 'WebSocket'
        'body': 'WebSocket($1);'
      '-window':
        'prefix': 'window'
        'body': 'window'
      # X◆◆◆◆◆
      '-XMLHttpRequest();':
        'prefix': 'XMLHttpRequest'
        'body': 'XMLHttpRequest();'
      # html 部分
      '-<div class="">$1</div>':
        'prefix': 'div'
        'body': '<div >$1</div>'
      '-<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">':
        'prefix': 'metaViewport'
        'body': '<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">'
      '-<script src="$1" charset="utf-8"></script>':
        'prefix': 'scriptSrc'
        'body': '<script src="$1" charset="utf-8"></script>'
      '-<span class="">$1</span>':
        'prefix': 'span'
        'body': '<span class="">$1</span>'
      '-<style>$1</style>':
        'prefix': 'style'
        'body': '<style>\n\t$1\n</style>'
      '-class="$1"':
        'prefix': 'classHtml'
        'body': 'class="$1"'
      '-id="$1"':
        'prefix': 'id'
        'body': 'id="$1"'
    # -----------------------------------------------------------------------------
    '.text.html.php':
      '-echo($1)':
        'prefix': 'echo'
        'body': 'echo($1)'
      '-print $1':
        'prefix': 'print'
        'body': 'print $1'
      '-print_r($1)':
        'prefix': 'printR'
        'body': 'print_r($1)'
      # html 部分
      '-<div class="">$1</div>':
        'prefix': 'div'
        'body': '<div >$1</div>'
      '-<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">':
        'prefix': 'metaViewport'
        'body': '<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">'
      '-<script src="$1" charset="utf-8"></script>':
        'prefix': 'scriptSrc'
        'body': '<script src="$1" charset="utf-8"></script>'
      '-<span class="">$1</span>':
        'prefix': 'span'
        'body': '<span class="">$1</span>'
      '-<style>$1</style>':
        'prefix': 'style'
        'body': '<style>\n\t$1\n</style>'
      '-class="$1"':
        'prefix': 'classHtml'
        'body': 'class="$1"'
      '-id="$1"':
        'prefix': 'id'
        'body': 'id="$1"'
    # -----------------------------------------------------------------------------





    # 使用说明---------------------------------------------------------------------
    # e.g.:
    #   # 提示 显示为
    #   '-console.log()':
    #     # 激活提示的词
    #     'prefix': 'con'
    #     # 最终的结果
    #     'body': 'console.log($1);'
    # 语法注释
    # $1 表示光标的默认位置
    # $2 按下 tab 键，光标跳到的第二个位置，以此类推
    # ${1:name} 表示第一次会将 name 选中
    # \n表示换行 \t tab缩进
    # 提示 显示 字符开始不可使用下划线符号_
    # """内容""" 创建保持格式的代码块 「"""...""" 代替'...'」
    # 当激活字符一样时,后面的会覆盖掉前面的.
    # 自定义Snippets的扩展词时,定义的格式的确定
    #   在要定义的文档类型下,ctrl-Shift-p 输入代码  Editor: Log Cursor Scope
    #   弹出字符如 txt格式的为 text.plain ,则.text.plain类似于.source.js表示一种文件格式
    #   注意在前面加一个店.
    # Question:
    #   如何同时定义多个类型文件的代码提示

    # 原始文档说明 存留-------------------------------------------------------------
    # Your snippets
    #
    # Atom snippets allow you to enter a simple prefix in the editor and hit tab to
    # expand the prefix into a larger code block with templated values.
    #
    # You can create a new snippet in this file by typing "snip" and then hitting
    # tab.
    #
    # An example CoffeeScript snippet to expand log to console.log:
    #
    # '.source.coffee':
    #   'Console log':
    #     'prefix': 'log'
    #     'body': 'console.log $1'
    #
    # Each scope (e.g. '.source.coffee' above) can only be declared once.
    #
    # This file uses CoffeeScript Object Notation (CSON).
    # If you are unfamiliar with CSON, you can read more about it in the
    # Atom Flight Manual:
    # http://flight-manual.atom.io/using-atom/sections/basic-customization/#_cson
    # -----------------------------------------------------------------------------


