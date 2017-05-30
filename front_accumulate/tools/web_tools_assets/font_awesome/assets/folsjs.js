// PS:自定义的JS函数库
console.log("folsJS 准备就绪!");

// 数学库

// 数据操作
var ecmf =function(){ }; 
  
  // 返回字符串中出现 str 字符的次数
  ecmf.prototype.checkStrNum =function(oldStr,str){
    var len =str.length;
    var oldLen =oldStr.length;
    var num =0;
    for (var i = 0; i < oldLen-len+1; i++) {
      var str1 =oldStr.slice(i,len+i);
      if (str ===str1) {
        num++;
      }
    }
    return num;
  }



// DOM 操作函数
var domf =function(){ };
  // 同级元素获取
  domf.prototype.broEle =function(positionSelector,brotherSelector){
    // 获取positionSelector定位元素的同级元素brotherSelector
    var targetElem =document.querySelector(positionSelector);
    var pa =targetElem.parentElement;
    var bro =pa.querySelector(brotherSelector);
    return bro;
  }
  
  // 获取最后一个子元素
  domf.prototype.lastChildElem =function(){
  }
  
  // 清除 所有元素class中的 cla类
  domf.prototype.clearClass =function(cla){
    var selector ="." + cla;
    var elems = document.querySelectorAll(selector);
    for (var i = 0; i < elems.length; i++) {
      elems[i].classList.remove(cla);
    }
  }
  
  // 根据参考对象,操作另外一个对象
  // 根据 elem1 的 aoo 获取到 elem2,并通过foo操作它
  // elem 
  // aoo = tc/ti/cc/ci/ic/ii    text/clas/id
  domf.prototype.anotherElem =function(elem1,aoo,foo){
    switch (aoo) {
      case "tc":
        var t = elem1.innerText;
        var c = "." + t;
        var elem2 =document.querySelector(c);
        foo(elem2);
      case "ti":
        var t = elem1.innerText;
        var i = "#" + t;
        var elem2 =document.querySelector(i);
        foo(elem2);
        break;
      case "cc":
        var c = elem1.className;
        var c = "." + c;
        var elem2 =document.querySelector(c);
        foo(elem2);
        break;
      case "ci":
        var c = elem1.className;
        var i = "#" + c;
        var elem2 =document.querySelector(i);
        foo(elem2);
        break;
      case "ic":
        var i = elem1.id;
        var c = "." + i;
        var elem2 =document.querySelector(c);
        foo(elem2);
        break;
      case "ii":
        var i = elem1.id;
        var i = "#" + i;
        var elem2 =document.querySelector(i);
        foo(elem2);
        break;
      default:
        console.log("第二个参数错误");
    }
  }
  
  // 开关元素的类
  domf.prototype.toggleClass =function (elem,cla){
    var boo =elem.classList.contains(cla);
    if (boo) {
      elem.classList.remove(cla);
    }else {
      elem.classList.add(cla);
    }
  }
  
  // 拖动元素
  domf.prototype.drag= function (selector1,selector2){
    // selector1 为被拖动的元素
    // selector2 为激活拖动的元素
    var selec1 =document.querySelector(selector1)
    var selec2 =document.querySelector(selector2)
    selec2.addEventListener("mousedown",function(e){
      var x1 =e.clientX-selec1.offsetLeft
      var y1 =e.clientY-selec1.offsetTop
      // 注意此处被拖动的元素selector1不可设定margin等定位的值,但可以使用transform进行偏移
      // 默认被拖动的元素进行了absolute或relative定位,也可以使用top或left定位.
      function moveFunc(e){
        selec1.style.left=e.clientX-x1+"px"
        selec1.style.top=e.clientY-y1+"px"
      }
      document.addEventListener("mousemove",moveFunc)
      document.addEventListener("mouseup",function(){
        document.removeEventListener("mousemove",moveFunc)
      })
    })
  }



// 插件引入
var uif =function(){ }; 
  // 插入轮播图 
    // imgURLArr 包含轮播图图片的地址
    // selector  轮播图放置在selector表示的元素中
    // width height 指定轮播图的宽高
    // t 为指定的切换时间数值(单位为毫秒)
  uif.prototype.singleCarousel=function(imgURLArr,selector,width,height,t){
    // 公用变量
    var imgNum =imgURLArr.length; //轮播图数量
    var targetLocation =document.querySelector(`${selector}`); //生成的轮播图
    var ind =null;  // 指示器对象数组
    
    // 添加样式
    var putStyle =function (){
      var head =document.querySelector("head");
      head.insertAdjacentHTML("beforeEnd",`
        <style>
          .div{
            width:${width}px;
            height:${height}px;
            border :1px solid white;
            position:relative;
            user-select:none;
          }
          img.pic{
            opacity:1;
            width:100%;
            height:100%;
            transition:opacity ease-in ${t/11}ms;
            position:relative;
            z-index:-1;
          }
          img.hidden{
            opacity:0.2;
          }
          .preButton,.nextButton{
            position: absolute;
            font-size:${0.2*height}px;
            line-height:${0.2*height}px;
            cursor: pointer;
            background-color:rgba(14, 20, 18, 0.4);
            user-select:none;
            height:20%;
            top:0;
            bottom:0;
            margin:auto;
            display:none;
          }
          .buttonShow{
            display:block;
          }
          .preButton{
            left:0;
          }
          .nextButton{
            right:0;
          }
          .indicator{
            width:80%;
            position:absolute;
            bottom:5%;
            left:50%;
            transform:translateX(-50%) ;
            text-align:center;
          }
          .ind{
            display:inline-block;
            margin:0 ${0.8*width/(imgURLArr.length +1)/6}px;
            background-color:#a0e2c4;
            border-radius:50%;
            width:20px;
            height:20px;
            cursor: pointer;
            text-align:center;
          }
          .indColor{
            background-color:red;
          }
        </style> `);
    }()
    // 添加元素
    var put =function (){
      targetLocation.insertAdjacentHTML("beforeEnd",`
        <div class="div">
          <span class="preButton"><</span>
          <span class="nextButton">></span>
          <div class="indicator"></div>
        </div>
      `)
      var indhtml='';
      for (var i = 0; i < imgNum; i++) {
        var a = "ind";
        if (i ==0) {
          a ="ind indColor";
        }
        indhtml =indhtml + `<div data-id=${i} class="${a}">${i+1}</div>`;
      }
      document.querySelector(".indicator").insertAdjacentHTML("beforeEnd",`${indhtml}`);
      document.querySelector(".div").insertAdjacentHTML("beforeEnd",`
        <img  class='pic' src="${imgURLArr[0]}"  alt="" />
      `);
      ind =document.querySelectorAll(".indicator>div");
    }();
    
    // 公用函数
    // 确定当前指示器的下标
    function indind(){
      for (var i = 0; i < ind.length; i++) {
        if (ind[i].classList.contains("indColor")) {
          return i;
        }
      }
    }
    // 淡入淡出切换到 a+1 张图片
    function fade(a) {
      var img =document.querySelector(".pic");
      img.classList.add("hidden");
      setTimeout(function(){
        img.src =`${imgURLArr[a%imgNum]}`;
        img.classList.remove("hidden");
      },t/11);
    }
    // 上/下 一张 切换
    function next(){
      var a = indind();
      ind[a].classList.remove("indColor");
      ind[(a+1)%imgNum].classList.add("indColor");
      fade(a+1);
    }
    function pre(){
      var a = indind();
      ind[a].classList.remove("indColor");
      ind[(a-1 +imgNum)%(imgNum)].classList.add("indColor");
      fade(a-1 +imgNum);
    }
    
    var bind =function () {
      // 点击按钮切换
      var preButton =document.querySelector(".preButton");
      var nextButton =document.querySelector(".nextButton");
      nextButton.addEventListener("click",function(){ next(); });
      preButton.addEventListener("click",function(){ pre(); });
      
      // 自动切换 悬浮 暂停、显现切换按钮
      var cancelId =setInterval(next,t);
      targetLocation.addEventListener("mouseover",function(){
        clearInterval(cancelId);
        preButton.classList.add("buttonShow");
        nextButton.classList.add("buttonShow");
      })
      targetLocation.addEventListener("mouseout",function(){
        cancelId =setInterval(next,t);
        preButton.classList.remove("buttonShow");
        nextButton.classList.remove("buttonShow");
      })
      
      // 点击指示器切换 
      var indicator =document.querySelector(".indicator");
      indicator.addEventListener("click",function(e){
        if (e.target.dataset.id) {
          var a =indind();
          ind[a].classList.remove("indColor");
          e.target.classList.add("indColor");
          a =indind();
          fade(a);
        }
      })
    }()
  }



var domo =new domf();
var ecmo =new ecmf();
var uio =new uif();









//
