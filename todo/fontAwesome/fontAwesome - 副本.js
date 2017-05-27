
// 公用变量

// 不会变的变量
var slider =document.querySelector(".slider");
var classifyAdd =document.querySelector(".classifyAdd")
var inputClass =document.querySelector(".inputClass");
var classInput =document.querySelector(".inputClass input");
var inputClassIco =document.querySelector(".inputClass i");

var content =document.querySelector(".content");
var classifyNav =document.querySelector(".classifyNav");

// 可能会改变的变量
var csWidth =300+10; // 分类块的宽度数值(单位为px)


// 功能函数 (独立的)
function loadSlider(data){  // 将数据更新到 导航条 
  var html ='';
  for (var i = 0; i < data.length; i++) {
    var aoo = `
    <a href="#${data[i][0]}" class="${data[i][0]}">
      <li class="li">${data[i][0]}</li>
    </a>`;
    html =html + aoo;
  }
  classifyNav.insertAdjacentHTML("beforeend",html);
}
function minHeightElem(selector){  //返回一组元素中高度最小的元素
  var elems =document.querySelectorAll(selector);
  var elemHeights =[];
  for (var i = 0; i < elems.length; i++) {
    elemHeights[i] = elems[i].clientHeight;
  }
  var min = Math.min.apply(null,elemHeights);
  var minElem = elems[elemHeights.indexOf(min)];
  return minElem;
}
// 根据 展示区宽度 和设定的 分类块宽度width 返回合适数量的 列数
function closNum(width){  
  var contentWidth =content.clientWidth-17;//此处由bug 相差 17px;
  console.log("展示区宽度",contentWidth)
  var colsNum =Math.floor(contentWidth/width);
  console.log("列数",colsNum);
  return colsNum;
}
function loadCols(num){ // 加载 num 列
  var html ="";
  for (var i = 0; i < num; i++) {
    var html = html +'<div class="cols"> </div>';
  }
  content.insertAdjacentHTML("beforeend",html);
}
function saveAll(){ // 保存当前展示的数据到 localStorage.d 中
  var lis =classifyNav.querySelectorAll("li");
  var data =[];
  for (var i = 0; i < lis.length; i++) {
    data[i] =[];
    data[i][0] = lis[i].innerText;
    var id = "#" +data[i][0] +"ol";
    var names =document.querySelector(id).querySelectorAll(".name");
    for (var j = 1; j < names.length+1; j++) {
      data[i][j] = names[j-1].innerText;
    }
  }
  localStorage.d =JSON.stringify(data);
  // console.log(localStorage.d)
}
// 在拥有背景的导航条后添加导航条 (否则在最后添加),在高度最小的cols中添加分类块
function addClassName(name){
  var targetElem =classifyNav.querySelector(".activeGround1");
  if (targetElem) {
    targetElem.parentElement.insertAdjacentHTML("afterend",`
      <a href="#${name}" class="${name}">
        <li class="li">${name}</li>
      </a>
    `);
  }else {
    classifyNav.insertAdjacentHTML("beforeend",`
      <a href="#${name}" class="${name}">
        <li class="li">${name}</li>
      </a>
    `);
  }
  var minElem =minHeightElem(".cols");
  minElem.insertAdjacentHTML("beforeend",`
    <div class="classifyDiv" id="${name}">
      <div class="classifyHead">
        <span class="name ">${name}</span>
        <i class="delete fa fa-close"></i>
        <span class="add">添加图标</span>
        <div class="inputIco none">
          <input type="text" name="name" value="" placeholder="请输入名称">
          <i class="fa fa-check addIco" ></i>
        </div>
      </div>
      <ol class="classifyBody" id="${name}ol">
      </ol>
    </div> `)
}
// 在拥有背景的图标后添加图标 (否则在elem最后添加)
function addIcoName(name,elem){
  var targetElem =elem.querySelector(".activeColor1");
  if (targetElem) {
    targetElem.insertAdjacentHTML("afterend",`
      <li class="items">
        <i class="ico fa ${name}"></i>
        <span class="name">${name}</span>
        <i class="delete fa fa-close"></i>
      </li>
    `);
  }else {
    elem.insertAdjacentHTML("beforeend",`
      <li class="items">
        <i class="ico fa ${name}"></i>
        <span class="name">${name}</span>
        <i class="delete fa fa-close"></i>
      </li>
    `);
  }
}

// 检查str 是否在导航中存在重复
// 若存在重复 返回true,并将重复项添加 warmingColorLeft 类,滚动到事业中
function hasRepeat(str){ 
  var lis =classifyNav.querySelectorAll(".li");
  for (var i = 0; i < lis.length; i++) {
    if (str == lis[i].innerText) {
      lis[i].classList.add("warmingColorLeft");
      lis[i].scrollIntoView();
      return true;
    };
  }
  return false;
}

// 检查str 是否在展示区的条目中有重复,
// 若重复,则将已存在条目的字体变为红色 (加warmingColor),且出现在窗口中
// 并返回true
function itemsRepeat(str){ 
  var name =content.querySelectorAll(".items>.name");
  console.log("调用了")
  for (var i = 0; i < name.length; i++) {
    if (str == name[i].innerText) {
      name[i].classList.add("warmingColor");
      name[i].scrollIntoView();
      return true;
    }
  }
  return false;
}


// (有依赖)
function loadClassfiyDiv(data){ //根据存在的列数 和 数据 瀑布流加载分类块
  for (var i = 0; i < data.length; i++) {
    var minElem =minHeightElem(".cols");
    minElem.insertAdjacentHTML("beforeend",`
      <div class="classifyDiv" id="${data[i][0]}">
        <div class="classifyHead">
          <span class="name ">${data[i][0]}</span>
          <i class="delete fa fa-close"></i>
          <span class="add">添加图标</span>
          <div class="inputIco none">
            <input type="text" name="name" value="" placeholder="请输入名称">
            <i class="fa fa-check addIco"></i>
          </div>
        </div>
      <ol class="classifyBody" id="${data[i][0]}ol">
      
      </ol>
      </div>
    `);
    var id ="#"+data[i][0]+"ol";
    var ol =document.querySelector(id);
    var html ='';
    for (var j = 1; j < data[i].length; j++) {
      html = html +  `
        <li class="items">
          <i class="ico fa ${data[i][j]}"></i>
          <span class="name">${data[i][j]}</span>
          <i class="delete fa fa-close"></i>
        </li>
      `;
    }
    ol.insertAdjacentHTML("beforeend",html);
  }
}

// todo 
// 使用 Node AJAX 发送本地文件数据 到页面,进行填充,
// 在页面进行更改后发送 AJAX 后台使用Node更改文件内容

// 初始化
(function(){
  if (localStorage.d ==undefined) {
    console.log("来自初始化的数据");
    var data =
    [
      ["手机系统",
      "fa-address-book","fa-address-book-o","fa-address-card","fa-address-card-o","fa-drivers-license","fa-drivers-license-o","fa-battery","fa-battery-0","fa-battery-1","fa-battery-2","fa-battery-3","fa-battery-4","fa-battery-empty","fa-battery-full","fa-battery-half","fa-battery-quarter","fa-battery-three-quarters","fa-bluetooth","fa-bluetooth-b","fa-bolt","fa-comment","fa-comment-o","fa-commenting","fa-commenting-o","fa-comments","fa-comments-o","fa-flash"],
      ["Windows系统",
      "fa-arrows","fa-arrows-h","fa-arrows-v","fa-crop","fa-feed"],
      ["IT","fa-bug","fa-cloud","fa-cloud-download","fa-cloud-upload","fa-code","fa-code-fork","fa-download"],["电子产品","fa-desktop"],["文本符号","fa-asterisk","fa-at","fa-check","fa-check-circle","fa-circle-o-notch","fa-circle-o","fa-circle-thin","fa-circle","fa-check-square-o","fa-check-square","fa-close","fa-copyright","fa-dot-circle-o","fa-ellipsis-h","fa-ellipsis-v","fa-exclamation","fa-exclamation-circle","fa-exclamation-triangle"],["表情符号","fa-frown-o"],["电子邮件","fa-envelope","fa-envelope-o","fa-envelope-open","fa-envelope-open-o","fa-envelope-square"],["未知","fa-adjust","fa-assistive-listening-systems","fa-audio-description","fa-braille","fa-bullseye","fa-cc","fa-certificate","fa-creative-commons","fa-deaf","fa-deafness"],["商务","fa-briefcase","fa-fax"],["手势","fa-american-sign-language-interpreting","fa-asl-interpreting"],["航海","fa-anchor"],["交通","fa-automobile","fa-bicycle","fa-blind","fa-bus","fa-cab","fa-car","fa-dashboard","fa-database"],["法律","fa-balance-scale","fa-bank"],["学校","fa-bell","fa-bell-o","fa-bell-slash","fa-bell-slash-o","fa-book","fa-calculator","fa-eraser"],["体育","fa-futbol-o"],["指示","fa-exchange"],["日常用品","fa-calendar","fa-calendar-check-o","fa-calendar-minus-o","fa-calendar-o","fa-calendar-plus-o","fa-calendar-times-o"],["科研","fa-eyedropper","fa-filter","fa-flask"],["建筑","fa-building","fa-building-o"],["工业","fa-cog","fa-cogs"],["超市","fa-cart-arrow-down","fa-cart-plus","fa-credit-card","fa-credit-card-alt"],["标识","fa-ban","fa-barcode","fa-caret-square-o-down","fa-caret-square-o-left","fa-caret-square-o-right","fa-caret-square-o-up","fa-child","fa-compass","fa-crosshairs","fa-cube","fa-cubes","fa-female","fa-fighter-jet","fa-fire","fa-fire-extinguisher","fa-flag","fa-flag-checkered","fa-flag-o"],["家庭用具","fa-archive","fa-bath","fa-bathtub","fa-bed","fa-beer","fa-coffee","fa-cutlery"],["图表","fa-area-chart","fa-bar-chart","fa-bar-chart-o"],["其他","fa-bars"],["实物表示","fa-binoculars","fa-birthday-cake","fa-bomb","fa-bullhorn","fa-camera","fa-camera-retro","fa-clock-o","fa-diamond"],["文本相关","fa-clone","fa-edit","fa-external-link","fa-external-link-square","fa-eye","fa-eye-slash"],["文件相关","fa-folder","fa-folder-o","fa-folder-open","fa-folder-open-o","fa-file-archive-o","fa-film","fa-file-zip-o","fa-file-audio-o","fa-file-sound-o","fa-file-pdf-o","fa-file-video-o","fa-file-movie-o","fa-file-photo-o","fa-file-picture-o","fa-file-word-o","fa-file-powerpoint-o","fa-file-image-o","fa-file-excel-o","fa-file-code-o"],["书籍相关","fa-bookmark","fa-bookmark-o"]
    ]; 
    loadSlider(data);
    
    var num =closNum(csWidth);
    loadCols(num);
    loadClassfiyDiv(data);
    localStorage.d =JSON.stringify(data);
  }else {
    console.log("来自本地localStorage.d的数据");
    var data = JSON.parse(localStorage.d); 
    loadSlider(data);
    
    var num =closNum(csWidth);
    loadCols(num);
    loadClassfiyDiv(data);
    // console.log(localStorage.d);
  }
})();




// 导航栏 点击事件委托 
slider.addEventListener("click",function(e){
  console.log("点击了",e.target);
  var classs =e.target.classList;
  if (classs) {
    if (classs.contains("saveAll")) {// 点击 保存所有 按钮
      saveAll();
      alert("已保存!");
    }
    if (classs.contains("li")) { // 点击类别 激活自己及显示区对应的 背景
      domo.clearClass("activeGround1");
      domo.clearClass("warmingColorLeft");
      classs.add("activeGround1");
      var text =e.target.innerText;
      domo.anotherElem(e.target,"ti",function(elem){
        elem.classList.add("activeGround1")
      })
    }
    // 点击 添加分类 开关输入框,使输入框获取焦点
    if (classs.contains("classifyAdd")) { 
      domo.toggleClass(inputClass,"none");
      inputClass.querySelector("input").focus();
    }
    // 点击 确认添加按钮 检测输入值是否符合要求
    if (e.target ==inputClassIco) { 
      var val =classInput.value;
      var data =JSON.parse(localStorage.d);
      var boo =hasRepeat(val);
      if (val =="") {
        alert("名称不可为空");
      }else if (ecmo.checkStrNum(val," ")) {
        alert("名称中不可包含空格")
      }else if (boo) {
        alert("不能有重复分类!");
      } else if ("0123456789".includes(val.slice(0,1))) {
        alert("第一位不能为数字");
      }else {
        addClassName(val);  // 符合要求添加 分类
        classInput.value ="";
      }
    }
  }
  
})
// 输入分类绑定input事件
inputClass.oninput =function(e){
  var val =e.target.value;
  console.log(this)
  console.log(inputClassIco)
  console.log(val)
  if (val) {
    inputClassIco.classList.add("activeColor2");
  }else {
    inputClassIco.classList.remove("activeColor2");
  }
}


// 展示区 点击事件委托
content.addEventListener("click",function(e){
  console.log("点击了",e.target);
  var clas = e.target.classList;
  var tag =e.target;
  if (clas) {
    if (clas.contains("delete") ) {  // 点击x
      if (tag.closest(".items")) {  // 点击 图标x
        var bool =confirm("确认删除?");
        if (bool) {
          tag.closest(".items").remove();
        }
      }else {                       // 点击 分类x
        var bool =confirm("确认删除分类?");
        if (bool) {
          var aoo =tag.closest(".classifyDiv");
          aoo.remove();  // 删除分类块
          domo.anotherElem(aoo,"ic",function(elem){
            elem.remove();
          });
        }
      }
    }
    if (clas.contains("name") ) { // 点击 图标的名称
      domo.clearClass("activeColor1");
      domo.clearClass("warmingColor");
      if (tag.closest(".items")) {
        tag.closest(".items").classList.add("activeColor1");
      }
    }
    if (clas.contains("add") ) { // 点击 添加图标
      var inputIco= tag.parentElement.querySelector(".inputIco");
      domo.toggleClass(inputIco,"none");
      inputIco.querySelector("input").focus();
    }
    if (clas.contains("addIco") ) { // 点击 确定添加 
      var input = tag.closest('.inputIco').querySelector("input");
      var val =input.value;
      if (val =="") {
        alert("不可为空!");
      }else if (itemsRepeat(val)) {
        alert("有重复图标");
      }else {
        var elem =tag.closest('.classifyDiv').querySelector(".classifyBody");
        addIcoName(val,elem);
        input.value ="";
      }
    }
  }
})
// // 展示区 input事件委托
// content.addEventListener("input",function(e){
//   console.log("点击了",e.target);
//   var tag =e.target;
//   var val =e.target.val;
// })








// document 点击事件绑定
document.onclick =function (e){
  // 自动隐藏 添加分类框
  if (e.target !=classifyAdd && !inputClass.contains(e.target)) {
    inputClass.classList.add("none");
  }
}


window.onbeforeunload = function(e) {
  return "确定退出吗";
}








// // 待完善的功能
// 拖放 改变位置
// 修改 分类名称















