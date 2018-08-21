window,全局对象 
  Member: 
    ★延时调用&间时调用&动画调用API 
      'setTimeout'、'setInterval'最大延时间隔为 Math.pow(2,23)-1,超过该值则相当于 0  
      JS引擎单线程,异步事件排队等待被执行,不会在同时执行两条命令 
    setTimeout(foo/str,num [,arg1,arg2...])  numId,指定时间后回调  
      PS: 实际执行的时间大于等于定时器设置的值  
        被延时执行的代码会被从同步任务队列放置到异步执行队列,并开始计时
        异步队列会在同步队列所有代码执行完,JS引擎空闲后,
        在计时结束时,开始执行延时代码.
        若异步队列在执行的时被阻塞了,那么它将会被推迟到下一个可能的执行点,
      foo 回调函数 
      str 字符串代码,有解析功能相当于eval 
        不推荐此种写法,容易出错,不易扩展,损失性能
        setTimeout("alert('abc')",2000);  // 2秒后执行代码块
      num 延时的时间,单位ms,默认:0
        范围: 1-2147483647,超过该范围,自动改为 1
      arg 可选,传入回调函数的参数 
        setTimeout(function(arg){
          console.log(arguments); // ["abc", callee: ƒ, Symbol(Symbol.iterator): ƒ] 
          console.log(arg);      // abc 
        },1000,'abc')
      指定的时间表示何时将定时器的代码添加到队列,而非何时实际执行代码 
        Example:
        console.log(1);
        setTimeout(function() {console.log('a')}, 9);
        setTimeout(function() {console.log('b')}, 3);
        setTimeout(function() {console.log('c')}, 0);
        var sum = 0;
        for(var i = 0; i < 1000000; i ++) { sum += 1; }
        console.log(sum);
        setTimeout(function() {console.log('d');}, 0);
        // 1 → 1000000 → c → b → d → a
      使用'setTimeout'仿造'setInterval' 
        后一间歇调用可能会在前一间歇调用结束前启动? 
        Example: 
        function interval(foo,time,conditionFoo,isFirst) {
          // foo  fn,待执行的函数 
          // time  num,间隔时间 
          // conditionFoo fn,终止条件,根据其返回值判断 
          // isFirst  bol,是否首次运行 
          var args = arguments
          ,num = time;
          if (isFirst) { num = 0 }
          setTimeout(function(){
            foo();
            if (!conditionFoo()) {
              setTimeout(function(){
                args.callee(foo,time,conditionFoo,isFirst)
              },time)
            }
          },num)
        }
    clearTimeout(id) 通过返回id值解除延时调用 
      Example:
        var setTimeoutId = setTimeout(function(){ 
          console.log('执行setTimeout');
        },2000);
        console.log(setTimeoutId);  // 50500,延时调用的id值
        clearTimeout(setTimeoutId); // 取消调用
        // 等价于
        clearTimeout(50500); // 此种写法可能存在问题,因为id值可能会变,非一直为定值
    setInterval(foo/str,num [,arg1,arg2...]) numId,每隔指定时间回调  
      PS: 实际执行时间尽量接近指定值[可多可少]  
        依次向异步列队中添加延时调用,
        每个延时调用分别计时,不会互相影响.
        当只有第n个延时被阻塞且阻塞时间小于间隔时间,
        则n-1 到 n 的间隔时间大于指定间隔时间, n 到 n+1 小于间隔时间.
        当阻塞时间大于间隔时间,则前面的调用被抛弃且立即调用下次,
      foo 回调函数 
      str 字符串代码,有解析功能相当于eval
      num 间隔时间,单位:ms 
      arg 可选,传入回调函数的参数 
      保证间时最接近指定值 
        console.log(1)
        var siId = setInterval(function() {
          var date = new Date();
          console.log(date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds());
        }, 10);
        var sum = 0;
        for(var i = 0; i < 10000000; i ++) { sum += i; }
        console.log(2);
        // 清除定时器,避免卡死浏览器
        setTimeout(function() { clearInterval(siId); }, 30);
        运行结果
        1
        2
        19:44:733
        19:44:750
        19:44:760
        19:44:770
    clearInterval(id) 通过返回id值解除间时调用 
      Example:
        var setIntervalId = setInterval(function(){ 
          console.log('执行 setInterval');
        },1000);
        clearInterval(setIntervalId); // 取消调用
        console.log(setIntervalId);   // 1518 ,虽已取消调用,但box值仍存在
    requestAnimationFrame(foo) numId,浏览器专门为动画提供的API 
      PS: 浏览器会自动优化方法的调用,如页面非激活状态下,动画会自动暂停,节省了CPU开销
        原理同setTimeout类似;通过递归调用同一方法来不断更新画面以达到动画效果;
      常用操作: 在函数体内使用 requestAnimationFrame 来调用该函数来实现效果 
      Example: 
        function updateProgress(){
          var div = document.getElementById("status");
          div.style.width = (parseInt(div.style.width, 10) + 5) + "%";
          if (div.style.left != "100%"){
            requestAnimationFrame(updateProgress);
          }
        }
        requestAnimationFrame(updateProgress);
    cancelAnimationFrame(id)   通过返回ID值取消动画 
DOMStringList, 
  .length  
  .item()    
  .contains(key)   bol,是否包含该成员  
FormData,表单模拟 [HTML5] 
  DefDec: 序列化表单,模拟出表单所提交的数据,从而使用AJAX提交  
  PS: 当xhr发送FormData数据时,xhr能自动识别数据类型并配置适当头信息  
  Extend：Object 
    console.log(FormData.prototype.__proto__.constructor===Object); // true 
  Instance: 
    fd = new FormData([formElem]) 创建FormData对象 
      formElem  可选,<form>元素 
    Example: 通过表单元素创建
    var fd = new FormData(document.forms[0]);
  Proto: 
    .append(key,val ,name?)    向fd中添加字段 
      PS: 当信息添加完后就可直接使用'xhr.send(fd)'进行发送 
      key   数据键名  
      val   数据值  
      name  可选,通常是文件名 
    .delete() 
    .get() 
    .getAll() 
    .has() 
    .set() 
    .keys() 
    .values() 
    .forEach() 
    .entries() 
  Example: 文件上传 
    var inputFile = document.querySelector('input[type="file"]');
    inputFile.addEventListener('change', function(e) {
      var formData = new FormData();
      formData.append(this.files[0].name, this.files[0]);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/server');
      xhr.onload = function(e) {
        console.log('上传完成!');
      };
      xhr.send(formData);  // multipart/form-data
    });
    
    加入JS生成的文件 
    var content = '<a id="a"><b id="b">hey!</b></a>';
    var blob = new Blob([content], { type: "text/xml"});
    formData.append("webmasterfile", blob);
Option,option元素 
  Relate: Option.prototype===HTMLOptionElement.prototype 
  Instance: 
    var opt = new Option(["文本","值",bol1,bol2]); 创建optionDOM对象 
      bol1  是否被选中 
      bol2  是否有效
      Example:
        var elem = document.getElementById('mySelect');
        elem.add(new Option("文本","值")); // 这个只能在IE中有效
        // 这个兼容IE与firefox
        elem.options.add(new Option("text","value"));
        elem.options.remove(idx); // 根据下标删除选项option
        elem.options[idx].text;
Image,img元素 
  PS: 不用插入到DOM中即可加载图片资源  
  Relate: Image.prototype===HTMLImageElement.prototype  
  Instance: img = new Image();   创建图像DOM对象  
Audio,audio元素 
  Relate: Audio.prototype===HTMLAudioElement.prototype 
  Instance: 
    Example: 
    var audio = new Audio("./sound.mp3");
      不用插入到文档中,即可加载音频资源 
      audio.addEventListener("canplaythrough",function(e){
        this.play();
      })
DataTransfer,数据传递  
  PS: 为实现数据交换,IE自定义了'text'和'URL'两种有效的数据类型,
    而HTML5对此扩展,允许指定MIME类型,为了兼容,HTML5也支持'text'和'URL',
    但会被映射为'text/plain'和'text/uri-list'.
    dataTransfer对象可以为每种MIME类型都保存一个值,如同时保存一段文本和一个URL 
  Extend: Object 
    console.log(DataTransfer.prototype.__proto__.constructor===Object);
  Proto: 
    .files　 FileList,存放一些拖放的本地文件,若无拖放文件,则为空 
    .dropEffect    控制拖放元素光标显示  
      'none'    不能把拖放元素放在这,文本框外的默认值
      'move'    把拖放的元素移动到目标位置
      'copy'    把拖放的元素复制到目标位置
      'link'    放置拖放元素到目标位置并打开拖动的元素(前提是拖放元素是一个链接有URL)
    .effectAllowed 操控dropEffect属性 
      PS:必须在ondragstart事件处理程序中设置effectAllowed属性
      'uninitialized'  没有给拖放元素设置任何放置行为
      'none'           被拖放的元素不能有任何行为
      'copy'           只允许值为'copy'的dropEffect
      'link'           只允许值为'link'的dropEffect
      'move'           只允许值为'move'的dropEffect
      'copyLink'       允许值为'copy'和'link'的dropEffect
      'copyMove'       允许值为'link'和'move'的dropEffect
      'linkMove'       允许值为'link'和'move'的dropEffect
      'all'            允许任意dropEffect
    .types   当前保存的数据类型,如'text'
    .setDragImage()    
    .getData('text')      通过数据类型获取由setData方法保存的值
      PS:保存在dataTransfer对象中的数据只能在 drop 事件处理程序中读取.
      Example:
      设置和接收文本数据
      e.dataTransfer.setData('text','some text');
      var text =e.dataTransfer.getData('text');
      设置和接收URL
      e.dataTransfer.setData('URL','https://www.baidu.com');
      var url =e.dataTransfer.getData('URL');
    .setData('text',str)  设置传递数据及数据类型
      PS:拖动文本框中的文本时(选中的文字而非元素),浏览器自动调用setData()方法,
        将拖动的文本以"text"格式保存在dataTransfer对象中.
        在拖放链接或图像时,浏览器自动调用setData()方法保存URL,
        这些元素被拖放到放置目标时,就可以通过getData()读到这些数据了.
        也可以自定义保存的信息.
      str 字符串,表示保存的数据类型,取值为'text'或'URL'
    .clearData(format)    清除以特定格式保存的数据
    .items   DataTransferItemList, 
    兼容问题 
      .setDrageImage(elem,x,y) 指定图像,在拖动时,显示在光标下方 [Chrome不支持]
        其中elem可以时图像也可以是其他元素,若为图像则显示图像,其他元素则显示渲染后的元素.
      .addElement(elem) 为拖动操作添加一个元素
DataTransferItemList, 
  Extend: Object 
    console.log(DataTransferItemList.prototype.__proto__.constructor===Object);
  Proto: 
    .length  
    .add()   
    .remove()  
    .clear()  
DataTransferItem, 
  Extend: Object 
    console.log(DataTransferItem.prototype.__proto__.constructor===Object);
  Proto: 
    .kind 
    .type 
    .getAsString()  
    .getAsFile()  
    .webkitGetAsEntry()  
