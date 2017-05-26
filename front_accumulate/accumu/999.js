(2017-05-22 08:36:58) : (22873 79)
fileNum : 21
-------------------------------------------------------------------------------







---------------------------------------------------------------------------todo
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




