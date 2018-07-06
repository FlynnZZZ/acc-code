clipboard.js  文本复制功能 
使用方式 
  1 通过 script 标签引入 
    clipboard = new ClipboardJS('#btn');
    clipboard.on('success', function(e) {
      console.log('复制成功!' ,e.text);
    });
    clipboard.on('error', function(e) {
      console.log(e);
    });
  2 模块化引入 
    var { ClipboardJS } = require("./clipboard2.0.1.min.js") 
  