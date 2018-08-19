
代码
  debug 函数可以给内置 API 添加断点
    比如你想知道哪里调用了 alert, 执行 debug(alert) 就可以 
控制台
  设置 
    More tools 
      Network conditions 
        Disable cache        是否不加载缓存 
        Network throttling   网速控制 
        User agent           客户端识别定义   
小技巧: 
  将网页作为应用形式打开 
    PS: 需将 chrome.exe 配置到环境变量 
    chrome --app="‹网页地址›"  
ES6语法支持 
  <script>标签引入脚本时,添加 type="module" 属性即可,

手机模拟与普通模式的区别: 
  navigator  对象的区别 
    .appVersion    
      Normal: "5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36"
      Mobile: "5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36"
    .userAgent   
      Normal: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36"
      Mobile: "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36"
    .maxTouchPoints  
      Normal: 0 
      Mobile: 1 
  ... 









