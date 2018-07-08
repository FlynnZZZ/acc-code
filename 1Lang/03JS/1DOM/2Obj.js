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
