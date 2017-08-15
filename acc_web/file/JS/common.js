!function(){
  window.zcmn = {};  // 通用 

  // 添加 'none' class
  zcmn.jelemShow = function( ){
    for (var i = 0; i < arguments.length; i++) {
      arguments[i].removeClass('none');
    }
  }
  // 删除 'none' class
  zcmn.jelemHide = function( ){
    for (var i = 0; i < arguments.length; i++) {
      arguments[i].addClass('none');
    }
  }
  // 开关 none class
  zcmn.jelemToggle = function(){
    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i].hasClass("none")) {
        arguments[i].removeClass('none');
      }
      else {
        arguments[i].addClass('none');
      }
    }
  };

  // 地址选择
  zcmn.addressSelect = function(pro,city,area,data){
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
  zcmn.dateSelect = function(yJelem,mJelem,dJelem,length){
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
  zcmn.pagesChange = function(params){
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

  // 全选反选
  zcmn.selects = function(checkboxs,txtElem){
    if (txtElem.text() == '全选') {
      txtElem.text('反选');
      checkboxs.prop('checked',true);
    }
    else {
      txtElem.text('全选');
      checkboxs.prop('checked',false);
    }
  };

  // 手机验证
  zcmn.phoneNumVerify = function(phoneNum){
    var phoneStandard = /^1\d{10}$/;
    return  zcmn.strVerify(phoneNum, phoneStandard);
  };


  // 组件加载 
  // var params = [
  //   [ url,pos ],
  //   [ url,pos ],
  //   [ url,pos ],
  // ]
  zcmn.loadComponent = function(params){
    var head = $('head');
    var html = $('html');
    var arr = [];
    for (var i = 0; i < params.length; i++) {
      (function (i){
        arr[i] =  $.ajax({
          type : 'get',
          url  : params[i][0],
        })
        .done(function(backData,textStatus,obj){
          // console.log($(backData)['style'], $(backData));
          $(params[i][1]).after($(backData)[2]).remove();
          head.append($(backData)[0]);
          html.append($(backData)[4]);
        })
        .fail(function (xhr,status,errorTrown){
          console.log('loadComponent fail,url:',params[i][0]);
        });
      })(i);
    }
    var back = $.when(arr);
    return back;
  };

  // 延迟执行 
  // 此处 slct 为 全局变量 及 Jelem 都不行
  // zcmn.delayRun = function(slct,foo,argObj){
  //   if ($(slct).length) {
  //     foo(argObj);
  //   }
  //   else {
  //     var foo1 = arguments.callee;
  //     setTimeout(function(){
  //       foo1(slct,foo,argObj);
  //       console.log('cycleIndex-delayRun'); // to delete
  //     },240);
  //   }
  // };




  // 查询字符串 对象化 
  // 加载的组件
  // 请求的接口
  // 
  zcmn.searchStrObj = function(){ 
    var resultObj = {};
    var arr1 = location.search.slice(1).split("&");
    arr1.forEach(function(val,indx,arr){
      var arr2 = val.split("=");
      resultObj[arr2[0]] = arr2[1];
    } );
    return resultObj;
  };
  // 设置查询字符串
  // {
  //   's1' : 1,
  //   's3' : 3,
  // }
  zcmn.setSearch = function(obj){
    var resStr = '?';
    var o = zcmn.searchStrObj();
    for(var key in obj){
      o[key] = obj[key];
    };
    for(var k in o){
      resStr += k +'='+o[k]+'&';
    };
    return location.pathname+resStr.slice(0,-1);
    
  };

  // -------------------------------------------------------------------------- 
  // 密码验证 
  zcmn.pwVerify = function(password){
    var standard = /^\w{6,16}$/;
    return  zcmn.strVerify(password, standard);
  };

  zcmn.isIE = function(num){
    var b = document.createElement('b');
    b.innerHTML = '<!--[if IE ' + num + ']><i></i><![endif]-->';
    return b.getElementsByTagName('i').length === 1;
  }


  window.config = {};  // 配置项
  // 域名
  config.domain = 'http://yihuo.hkbao.com';

}();

// 浏览器版本判断 
if (zcmn.isIE(7) || zcmn.isIE(8) || zcmn.isIE(9)) { alert('存在安全风险,请升级您的浏览器!'); }



