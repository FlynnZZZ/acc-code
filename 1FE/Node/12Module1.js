第三方模块: 通过npm安装到本地 
cheerio,html文件源码操作模块 
  PS:像使用jquery一样方便快捷地操作抓取到的源码
  $ npm i -g cheerio    // 安装cheerio模块
  const cheerio = require("cheerio") // 引入cheerio模块
  var $ = cheerio.load(data); 将传入的数据生成DOM,返回选择器API用于获取DOM元素 
    $(selector)  获取selector对应的元素组成的类数组对象
      $($(selector)[0]).html();  获取第一个元素的HTML字符
      $($(selector)[0]).text();  获取第一个元素的文本
        当同时存在多个元素该方法会将多个文本合并返回
      $($(selector)[0]).attr(属性名);  获取第一个元素指定属性的值
      $($(selector)[0]).find(selector);  获取第一个元素中对应selector的子元素
    Example:
    var $ =cheerio.load(data);
    var a =$('a'); // 获取所有的a元素对象,操作类似与jQuery 
    Q&A: 
      当传入的数据为<tbody>时无法识别,需增加<table>进行包裹 
request,请求模块 
  var request =require('request'); 引入request模块
  request(url,function(err,response,data){ }); 向URL发送请求
    回调函数传入err response data三个参数
      err      当报错时err参数被填充,默认为null
      response 请求
        response.statusCode   http响应状态码,如200为成功
      data     响应的数据
