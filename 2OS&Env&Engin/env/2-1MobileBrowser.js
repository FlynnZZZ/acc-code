HTML标签 
  // meta  
  <meta name="apple-mobile-web-app-capable" content="yes">  
    让普通移动网页被添加到主屏幕后,拥有一些类native的功能,
    就是类似隐藏ios的上下状态栏, 实现全屏,禁止弹性拖拽,修改顶部颜色等
  // 键盘  
  input表单中,右下角键显示为'开始',textarea中显示为'换行'  
  <input type="tel" >     // 默认调出数字键盘
  <input type="number" >  // 默认调出数字键盘,且只能输入数字 
  <input type="search" >  // 键盘上的右下角键将显示为'搜索'  
  // 其他 
  <a href="tel: 123456789"> </a> 点击拨号  
动态 rem 自适应布局 
  PS:rem 单位在做移动端的h5开发的时候是最经常使用的单位。
    采用js动态计算给文档的根节点 font-size 赋值,并以此为尺寸参考进行网页布局.
    可参考淘宝的布局.
  使用的时,将下面的代码放到页面的顶部（head标签内）；
  <script>
    // Input: {
    //   maxWidth: ''  // 单位px 
    //   ,minWidth: ''  // 单位px 
    // }
    function changeFont(config) {
      var originWidth =375; // 用来设置设计稿原型的屏幕宽度 此处以 Iphone 6为例
      var currClientWidth = document.documentElement.clientWidth;
      //设置屏幕的最大和最小值时设定一默认值
      if (currClientWidth > 640) { currClientWidth = 640; }
      if (currClientWidth < 320) { currClientWidth = 320; }
      document.documentElement.style.fontSize = currClientWidth /originWidth ;
      // 将 1rem 设置为相当于iPhone6 的 1px
    }
    changeFont();
    window.addEventListener('resize', changeFont, false); //注册 resize事件
  </script>
  
  ;(function (doc ,win ,config) {
    var config = config || {}
    ,standard = config.standard || 375  // 默认按iPhone8的屏宽375px为基准
    ,minWidth = config.minWidth || 100  // 
    ,maxWidth = config.maxWidth || 1400 // 
    
    var docEl = doc.documentElement
    ,resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize'
    ,setRem = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;  // 不清楚作用 ?  
      
      if ( clientWidth <= minWidth ) {      // 限制最小宽度 
        docEl.style.fontSize = minWidth/standard*50 + 'px';   
        // Chrome中字体大小有限制,最小为12px 
        // 故将字体放大50倍,在less中定义变量 @w: 1rem/50; 来表示1px 
        // 后续使用,如 width: 20 *@w 来表示20px在iPhone8中的大小 
        // 同样也会按比例在其他屏幕中缩放 
      }
      else if ( clientWidth <= maxWidth ) { // 在可变范围内 
        docEl.style.fontSize = clientWidth/standard*50 + 'px';   
      }
      else {                                // 限制最大宽度 
        docEl.style.fontSize = maxWidth/standard*50 + 'px';   
      }
    };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, setRem, false);
    doc.addEventListener('DOMContentLoaded', setRem, false);
  })
  (document ,window ,{
    standard: 375     // 参照宽度
    ,minWidth: 100    // 最小宽度
    ,maxWidth: 1400   // 最大宽度
  });




