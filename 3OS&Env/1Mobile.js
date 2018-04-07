搜索框 
  键盘 换行'enter' 改 搜索 
    input 放在form里,此时"换行"已变成'前往' 
    input 设置 type="search" 变成 '搜索' 
  监听键盘右下角按键事件 
    方法一: 监听'keydown',通过键码筛选, 但部分手机兼容性不好 
    document.getElementById('search').addEventListener('keydown',function (e) {
      console.log(e.keyCode);
      if(e.keyCode == 13){
        console.log("search");
      }
    })
    方法二: 将input放到form中,监听'submit'事件 
    <form action="">
      <input type="search" >
      <button type="submit" class="mui-btn mui-btn-block">搜索</button>
    </form>
    document.querySelector('form').addEventListener('submit', function(e){
      e.preventDefault(); // 阻止默认事件
      console.log("搜索");
    });
通过rem实现比例缩放 
  ;(function (doc, win) {
    var docEl = doc.documentElement
    ,resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize'
    ,setRem = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;  // 不清楚作用 ?  
       if (clientWidth <= 1000) {  // 限制屏幕最大宽度 
         docEl.style.fontSize = clientWidth/375*20 + 'px';   
         // 按照iPhone8的屏宽375px为基准,但Chrome中字体大小有限制,最小为12px 
         // 故将字体放大20倍,在less中定义变量 @w: 1rem/20; 来表示1px 
         // 后续使用,如 width: 20 *@w 来表示20px在iPhone8中的大小 
         // 同样也会按比例在其他屏幕中缩放 
       }
       else {
         docEl.style.fontSize = 1000/375*20 + 'px';   
       }
    };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, setRem, false);
    doc.addEventListener('DOMContentLoaded', setRem, false);
  })(document, window);






























