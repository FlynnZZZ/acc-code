// 以下方法基于jQuery
!function(){
  window.ztls = {}; // 工具函数 
  // 通过 input type=file 获取到本地图片的 base64
  // var defe = new $.Deferred();
  ztls.getLocalImg = function(jInputElem,foo){
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
  ztls.dealImg = function ( imgSrc , param , resolve){
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
  ztls.strVerify = function ( currentVal ,standardVal , minLen , maxLen){
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
  // localstorage 读写,本地存储 
  ztls.localstore = function(lsItem,key,val){
    if (localStorage[lsItem] === undefined) { // 不存在则初始化为一对象 
      localStorage[lsItem] = JSON.stringify({});
    }
    else if (typeof JSON.parse(localStorage[lsItem]) != 'object') {
      localStorage[lsItem] = JSON.stringify({});
      console.log('localStorage[lsItem] isnot object --ztls.localstore');
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
  // ztls.getData = function(str,val){
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
  ztls.put = function (ename,data,elem){ 
    var el = elem || $('body');
    el.data(ename,data);
    el.trigger(ename,[data]);
  }
  ztls.get = function (ename,foo,bool,elem){ 
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
    //   title : '标题', // 可选 
    //   txt : '提示文字', // 可选 
    //   appendPosition : 'body' ,  // 可选,
    //   cancelBtn : 'inline-block', // 可选,当为 'none' 时,隐藏 取消按钮
    //   maskBool : 'none', // 可选,默认使用 
    //   confirmTxt : '确定', // 可选,默认为'确定'
    //   icon : 'fa-exclamation-circle', // 可选,默认为'fa-exclamation-circle redColor'
    //   height : ' 186px', // 可选,弹窗高度
    //   confirmClick : function(){ // 可选,点击确认按钮时的操作
    //   },
    //   cancelClick : function(){ // 可选,点击取消按钮时的操作
    //   },
    // }
  ztls.popUp = function(param) {
    var title = param.title || '标题';
    var txt = param.txt || '提示文字';
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
  ztls.tipPop = function(param){
    var title = param.title || '提示' ;
    var txt = param.txt || '使用的是默认提示文字';
    var appendPosition = param.appendPosition || 'body';
    var icon = param.icon?'<i class="fa '+param.icon+'"></i>' : '<img src="/common/imgs/icon_check.png">';
    var time = param.time*1000 || 2000;
    var html = 
    '<div id="_zpopUp_">' + 
    '  <div class="popup">' + 
    '    <i class="fa fa-close"></i>'+
    '    <div class="tl">'+title+'</div>'+
    '    <div class="txt"> '+ icon +'<span>'+ txt +'</span> </div>' +
    '    <div class="txt1"> '+ time/1000 +'s后自动消失! </div>' + 
    '  </div>' + 
    '  <style>' + 
    '  #_zpopUp_ {' + 
    '    position: relative;' + 
    '    z-index:99;' + 
    '  }' + 
    '  #_zpopUp_ .fa-close{' + 
    '    position: absolute;' + 
    '    top: 10px;' + 
    '    right: 10px;' + 
    '    cursor: pointer;' + 
    '    user-select: none;' + 
    '  }' + 
    '  #_zpopUp_ .tl{' + 
    '    padding: 6px 14px;' + 
    '    font-size: 18px;' + 
    '  }' + 
    '  #_zpopUp_ .popup{' + 
    '    position: fixed;' + 
    '    top: 0;bottom: 0;right: 0;left: 0;margin: auto;' + 
    '    width: 450px;' + 
    '    height: 160px;' + 
    '    background-color: #fff;' + 
    '    border: 1px solid #ccc;' + 
    '  }' + 
    '  #_zpopUp_ .txt{' + 
    '    margin-top: 24px;' +
    '    text-align: center;' + 
    '    font-size: 18px;' + 
    '  }' + 
    '  #_zpopUp_ .txt span{' + 
    '    vertical-align: middle;' + 
    '    margin-left: 5px;' + 
    '  }' + 
    '  #_zpopUp_ .txt img{' + 
    '    vertical-align: middle;' + 
    '  }' + 
    '  #_zpopUp_ .txt1{' + 
    '    margin-top: 10px;' + 
    '    text-align: center;' + 
    '    color: #999;' + 
    '    font-size: 14px;' + 
    '  }' + 
    '  </style>' + 
    '</div>' ;
    if (!$('#_zpopUp_').length) {
      $(appendPosition).append(html);
      var pop = $('#_zpopUp_');
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
  // ztls.loading = function(param){
  // };

  
  // 查询字符串 对象化 
  ztls.queryObj = function(){ 
    var resultObj = {};
    var arr1 = location.search.slice(1).split("&");
    arr1.forEach(function(val,indx,arr){
      var arr2 = val.split("=");
      resultObj[arr2[0]] = arr2[1];
    } );
    return resultObj;
  };
  // 设置查询字符串   依赖'queryObj'
  // {
  //   's1' : 1,
  //   's3' : 3,
  // }
  ztls.setQuery = function(obj){
    var resStr = '?';
    var o = ztls.queryObj();
    for(var key in obj){
      o[key] = obj[key];
    };
    for(var k in o){
      resStr += k +'='+o[k]+'&';
    };
    return location.pathname+resStr.slice(0,-1);
  };
  
  // 初始vm实例加载 
  // var params = [
  //   [ url,pos ],
  //   [ url,pos ],
  //   [ url,pos ],
  // ]
  ztls.loadVm = function(params){
    var head = $('head');
    var html = $('html');
    var arr = [];
    for (var i = 0; i < params.length; i++) {
      (function (i){
        arr[i] =  $.ajax({
          type : 'get',
          url  : params[i][0],
        })
        .fail(function (xhr,status,errorTrown){
          console.log('load component fail,url:',params[i][0]);
        })
        .done(function(backData,textStatus,obj){
          var ct = $(backData)
          head.append(ct[0]);
          if (ct[1] == '#text') {
            $(params[i][1]).after(ct[2]).remove();
            html.append(ct[4]);
          }
          else {
            $(params[i][1]).after(ct[1]).remove();
            html.append(ct[2]);
          }
        })
      })(i);
    }
    return $.when.apply(null,arr);
  };
  // 异步子组件加载  
    // 需先在Vue实例中放置子标签且使用v-if="false" 
    // 异步执行函数,当组件加载到HTML后v-if='true'执行渲染 
    // 当有一个子组件被渲染其他未被隐藏的子组件都会被渲染出来 
  // var args = [
  //   './c-test.html',
  //   './c-test1.html',
  // ]
  ztls.loadCpts = function(args){
    var head = $('head');
    var body = $('body');
    var arr = [];
    for (var i = 0; i < args.length; i++) {
      arr.push(
        $.ajax({
          type : 'GET',
          url  : args[i],
        })
        .fail(function (xhr,status,errorTrown){
          console.log('load component fail,from one of:',args);
        })
        .done(function(backData,textStatus,xhr){
          var ct = $(backData)
          var ct1,ct2;
          if (ct[1] == '#text') {
            ct1 = ct[2];
            ct2 = ct[4];
          }
          else {
            ct1 = ct[1];
            ct2 = ct[2];
          }
          head.append(ct[0]).append(ct1)
          body.append(ct2);
        })      
      )
    }
    return $.when.apply(null,arr);
  }
  // 初始子组件加载  在Vue实例的beforeMonted之前执行即可 // 相当于 loadCpts+自动触发渲染  
  // var args = [ '#body', [
  //   './c-test.html',
  //   './c-test1.html',
  // ]]
  // ztls.loadCptsInit = function(args){
  //   var _rs = '';
  //   // hack  通过异步组件的rs()的怪异特性来实现 在vm实例化后定义组件可用  
  //   // 该函数需在vm实例化前执行 
  //   // vuejs 版本2.3.0 
  //   $(args[0]).append('<p style="display:none" is="_xx"></p>');
  //   Vue.component("_xx",function(rs,rj){
  //     _rs = rs;
  //   });
  //   var head = $('head');
  //   var body = $('body');
  //   var arr = [];
  //   for (var i = 0; i < args[1].length; i++) {
  //     arr.push(
  //       $.ajax({
  //         type : 'GET',
  //         url  : args[1][i],
  //       })
  //       .fail(function (xhr,status,errorTrown){
  //         console.log('load component fail,from one of:',args[1]);
  //       })
  //       .done(function(backData,textStatus,xhr){
  //         var ct = $(backData)
  //         head.append(ct[0]).append(ct[2])
  //         body.append(ct[4]);
  //       })      
  //     )
  //   }
  //   $.when.apply(null,arr).
  //   always(function(){
  //     _rs({ template: '' })
  //   })
  //   .done(function(){
  //     console.log('loaded all c success!');
  //   })
  //   return $.when.apply(null,arr);
  // }
  
  // 检测是否为IE  num可选 7、8、9 
  ztls.isIE = function(num){
    var b = document.createElement('b');
    b.innerHTML = '<!--[if IE ' + num + ']><i></i><![endif]-->';
    return b.getElementsByTagName('i').length === 1;
  }
  
  // 表单验证   依赖'tipPop' 
  // var arg = [
  //   [ '1771234560', /^1\d{10}$/, '手机号填写错误' ],
  // ]
  ztls.formVerify = function(arg){
    return arg.every(function(val,idx,arr){
      if (val[0] == undefined) {
        ztls.tipPop({
          txt : val[2], 
          icon : 'fa-exclamation-circle redColor',
        })
        return false;
      }
      var __bol = val[1].test(val[0])
      if (!__bol) {
        ztls.tipPop({
          txt : val[2], 
          icon : 'fa-exclamation-circle redColor',
        })
      }
      return __bol;
    });
  };
  

  // 选用 ----------------------------------------------------------------------
  // 地址选择
  ztls.adrsSlct = function(pro,city,area,data){
    var proName = Object.keys(data);
    var html = '<option value="0">请选择</option>';
    var value = '';
    proName.forEach(function(val,indx,arr){
      html += '<option value="'+ val +'">'+ val +'</option>'
    } );
    pro.html(html);
    pro.on("change",function(e){
      value = $(this).val();
      var cityName = Object.keys(data[value]);
      var html1 = '<option value="0">请选择</option>';
      cityName.forEach(function(val1,indx,arr){
        html1 += '<option value="'+ val1 +'">'+ val1 +'</option>'
      } );
      city.html(html1);
    })
    city.on("change",function(e){
      console.log(value);
      var value1 = $(this).val();
      var areaName = data[value][value1];
      var html2 = '<option value="0">请选择</option>';
      areaName.forEach(function(val2,indx,arr){
        html2 += '<option value="'+ val2 +'">'+ val2 +'</option>'
      } );
      area.html(html2);
    })
  }
  // 时间选择
  ztls.dateSlct = function(yJelem,mJelem,dJelem,length){
    var currentT = new Date();
    var currentY = currentT.getFullYear();
    
    var strY = '<option value="0">请选择</option>';
    length = length || 100;
    for (var i =  currentY- length ; i < currentY ; i++) {
      strY += '<option value="'+ i +'"> '+ i +'年 </option>';
    }
    yJelem.html(strY);
    
    var strM = '<option value="0">请选择</option>';
    for (var i = 1; i < 13; i++) {
      strM += '<option value="'+ i +'"> '+ i +'月 </option>'
    }
    mJelem.html(strM);
    
    var strD = '<option value="0">请选择</option>';
    for (var i = 1; i < 32; i++) {
      strD += '<option value="'+ i +'"> '+ i +'日 </option>';
    }
    dJelem.html(strD);
    
    mJelem.on("change",function(e){
      var v = $(this).val();
      var num = dJelem.children().length;
      console.log(v,num);
      var arr = ['4', '6', '9', '11']
      if (v == 2) {
        if (num == 32) {
          dJelem.children().eq(-1).remove();
          dJelem.children().eq(-1).remove();
          dJelem.children().eq(-1).remove();
        }
        else if (num == 31) {
          dJelem.children().eq(-1).remove();
          dJelem.children().eq(-1).remove();
        }
        else {
        }
      }
      else if (arr.includes(v)) {
        if (num == 32) {
          dJelem.children().eq(-1).remove();
        }
        else if (num == 31) {
        }
        else {
          dJelem.append('<option value="29"> 29日 </option><option value="30"> 30日 </option>')
        }
      }
      else {
        if (num == 32) {
        }
        else if (num == 31) {
          dJelem.append('<option value="31"> 31日 </option>');
        }
        else {
          dJelem.append('<option value="29"> 29日 </option>\
            <option value="30"> 30日 </option>\
            <option value="31"> 31日 </option>'
          );
        }
        
      }
    })
  };
  // 翻页功能
  // var params = {
  //   wrapElem : pagesElem,
  //   currentElem : currentElem,
  //   currentClass : "current1",
  //   length : 6,
  //   hideClass : "none",
  //   nextBtn : elem1,
  //   prevBtn : elem2,
  // }
  ztls.pagesChange = function(params){
    params.currentElem.siblings('.'+params.currentClass).removeClass(params.currentClass);
    params.currentElem.addClass(params.currentClass);
    
    var showElems = ":not(."+ params.hideClass +")";
    var showELems = params.wrapElem.find(showElems);
    
    // 点击显示的最后一个时,将其作为后续的第二个
    var currentLastElem2 = showELems.eq(-2);
    var currentLastElems = currentLastElem2.nextAll();
    if (params.currentElem.is(currentLastElem2.next()) && currentLastElems.length > 1) {
      currentLastElem2.prevAll().addClass(params.hideClass);
      // console.log(currentLastElems.eq(0));
      for (var i = 0; i < params.length-1; i++) {
        currentLastElems.eq(i).removeClass(params.hideClass);
      };
    }
    // 点击显示的第一个时,将其作为后续的倒数第二个
    var currentFirstElem2 = showELems.eq(1);
    var currentFirstElems = currentFirstElem2.prevAll();
    if (params.currentElem.is(currentFirstElem2.prev()) && currentFirstElems.length > 1) {
      currentFirstElem2.nextAll().addClass(params.hideClass);
      for (var i = 0; i < params.length-1 ; i++) {
        currentFirstElems.eq(i).removeClass(params.hideClass);
      }
    }
  };
  // 延迟执行 : slct 存在时执行 
  ztls.delayRun = function(slct,foo,argObj){
    if ($(slct).length) {
      foo(argObj);
    }
    else {
      var foo1 = arguments.callee;
      setTimeout(function(){
        foo1(slct,foo,argObj);
        // console.log('------'); // to delete
      },240);
    }
  };
}();
var qObj = ztls.queryObj();


