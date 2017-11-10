◆Mobile移动端 
  IOS移动设备上,长按<a>标签,会弹出浏览器的原生菜单 
    在JS中设置取消的方法
    document.documentElement.style.webkitTouchCallout = 'none';
    代码为全局设置,若只针对某一块元素,则将其写在对应的块中;
WeiXin 微信 
  不支持的功能 
    模板字符串  ios中支持,android中不支持[20170124]
    可使用 window.open() 来打开新窗口,但都在当前窗口中打开,不支持 window.opener 来传递信息
    不支持进行跳转到上一步url中带有参数的url地址  [?]
      比如:一个查询列表页的url是: http://someweb?city=beijing
      当从这个页面跳到第二个页面比如详细页, 在详细页再执行返回上一页如: 
      location.href=document.referrer的时候   
      跳回的url就不再是 http://someweb?city=beijing   所以页面可能会死掉
      解决:微信开发中 不要用 带url参数的地址,都用/ ../ ,
      把上面的 http://someweb?city=beijing   换成   http://someweb/beijing   这种即可
  event 事件 
    禁止下滑显示网址 
      $(document).on('touchmove',function(e){
        e.preventDefault();
      })
