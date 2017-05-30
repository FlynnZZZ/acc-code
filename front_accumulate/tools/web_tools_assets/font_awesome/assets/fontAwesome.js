
// 公用变量

// 不会变的变量
var slider =document.querySelector(".slider");
var classifyAdd =document.querySelector(".classifyAdd")
var inputClass =document.querySelector(".inputClass");
var classInput =document.querySelector(".inputClass input");
var inputClassIco =document.querySelector(".inputClass i");
var classifyNav =document.querySelector(".classifyNav");

var content =document.querySelector(".content");

// 可能会改变的变量
var csWidth =300+10; // 分类块的宽度数值(单位为px)

// 功能函数 (独立的)
function loadSlider(data){  // 将数据更新到 导航条 
  var html ='';
  for (var i = 0; i < data.length; i++) {
    var aoo = `
    <a href="#cd${data[i]['headers']['id']}"  class="cs${data[i]['headers']['id']}" draggable="true">
      <li class="li" data-id='${data[i]['headers']['id']}'>${data[i]['headers']['name']}</li>
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
    data[i] ={};
    data[i]['headers'] = {};
    data[i]['headers']['name'] = lis[i].innerText;
    data[i]['headers']['id'] = i+1;
    
    var id = "#ol" + lis[i].dataset.id;
    var names =document.querySelector(id).querySelectorAll(".name");
    data[i]['body'] = [];
    for (var j = 0; j < names.length; j++) {
      data[i]['body'][j] = names[j].innerText;
    }
  }
  localStorage.d =JSON.stringify(data);
  // console.log(localStorage.d)
}
// 在拥有背景的导航条后添加导航条 (否则在最后添加),在高度最小的cols中添加分类块
function addClassName(name){
  var targetElem =classifyNav.querySelector(".activeGround1");
  var elem =null;
  if (targetElem) {
    elem =targetElem.parentElement;
  }else {
    elem =classifyNav.lastElementChild;
  }
  var num = classifyNav.querySelectorAll("a").length+2;
  var href ='cd' + num;
  var klass ='cs' + num;
  elem.insertAdjacentHTML("afterend",`
    <a href="#${href}" class="${klass}" draggable="true">
    <li class="li" data-id='${num}' >${name}</li>
    </a>
  `);
  var drag1 =document.querySelector('.'+klass);
  drag1.onmousedown = function(){
    //兼容IE8-浏览器
    if(this.dragDrop){ this.dragDrop(); }
  }
  drag1.ondragstart = function(e){
    e.dataTransfer.setData('text',this.className);
  }
  var minElem =minHeightElem(".cols");
  var id ='ol' + num;
  // 在展示区添加 分类块
  minElem.insertAdjacentHTML("beforeend",`
    <div class="classifyDiv" id="${href}">
      <div class="classifyHead">
        <span class="name ">${name}</span>
        <i class="delete fa fa-close"></i>
        <i class="fix fa fa-paperclip"></i>
        <span class="add">添加图标</span>
        <div class="inputIco none">
          <input type="text" name="name" value="" placeholder="请输入名称">
          <i class="fa fa-check addIco" ></i>
        </div>
      </div>
      <ol class="classifyBody" id="${id}">
        <li class="items" draggable="true">
          <i class="ico   "></i>
          <span class="name">默认显示(可删除)</span>
          <i class="delete fa fa-close"></i>
        </li>
      </ol>
    </div> `)
}
// 在拥有背景的图标后添加图标 (否则在elem最后添加)
function addIcoName(name,elem){
  var targetElem =elem.querySelector(".activeColor1");
  if (targetElem) {
    targetElem.insertAdjacentHTML("afterend",`
      <li class="items" draggable="true">
        <i class="ico ${name}"></i>
        <span class="name" >${name}</span>
        <i class="delete fa fa-close"></i>
      </li>
    `); 
  }else {
    elem.insertAdjacentHTML("beforeend",`
      <li class="items">
        <i class="ico ${name}"></i>
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


//根据存在的列数 和 数据 瀑布流加载分类块
function loadClassfiyDiv(data){ 
  for (var i = 0; i < data.length; i++) {
    var minElem =minHeightElem(".cols");
    minElem.insertAdjacentHTML("beforeend",`
      <div class="classifyDiv" id="cd${data[i]['headers']['id']}">
        <div class="classifyHead">
          <span class="name ">${data[i]['headers']['name']}</span>
          <i class="delete fa fa-close"></i>
          <i class="fix fa fa-paperclip"></i>
          <span class="add">添加图标</span>
          <div class="inputIco none">
            <input type="text" name="name" value="" placeholder="请输入名称">
            <i class="fa fa-check addIco"></i>
          </div>
        </div>
        <ol class="classifyBody" id="ol${data[i]['headers']['id']}"> </ol>
      </div>
    `);
    var id ="#ol"+data[i]['headers']['id'];
    var ol =document.querySelector(id);
    var html ='';
    for (var j = 0; j < data[i]['body'].length; j++) {
      html = html +  `
        <li class="items" draggable="true">
          <i class="ico  ${data[i]['body'][j]}"></i>
          <span class="name" contenteditable>${data[i]['body'][j]}</span>
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
  var num =closNum(csWidth);
  var data =null;
  if (!localStorage.d) {
    console.log("来自初始化的数据");
    data =
      [
        {
          "headers": {
            "name": "4.7.0版新增41个全新的图标",
            "id": 1
          },
          "body": [
            "fa fa-address-book",
            "fa fa-address-book-o",
            "fa fa-address-card",
            "fa fa-address-card-o",
            "fa fa-bandcamp",
            "fa fa-bath",
            "fa fa-bathtub",
            "fa fa-drivers-license",
            "fa fa-drivers-license-o",
            "fa fa-eercast",
            "fa fa-envelope-open",
            "fa fa-envelope-open-o",
            "fa fa-etsy",
            "fa fa-free-code-camp",
            "fa fa-grav",
            "fa fa-handshake-o",
            "fa fa-id-badge",
            "fa fa-id-card",
            "fa fa-id-card-o",
            "fa fa-imdb",
            "fa fa-linode",
            "fa fa-meetup",
            "fa fa-microchip",
            "fa fa-podcast",
            "fa fa-quora",
            "fa fa-ravelry",
            "fa fa-s15",
            "fa fa-shower",
            "fa fa-snowflake-o",
            "fa fa-superpowers",
            "fa fa-telegram",
            "fa fa-thermometer",
            "fa fa-thermometer-0",
            "fa fa-thermometer-1",
            "fa fa-thermometer-2",
            "fa fa-thermometer-3",
            "fa fa-thermometer-4",
            "fa fa-thermometer-empty",
            "fa fa-thermometer-full",
            "fa fa-thermometer-half",
            "fa fa-thermometer-quarter",
            "fa fa-thermometer-three-quarters",
            "fa fa-times-rectangle",
            "fa fa-times-rectangle-o",
            "fa fa-user-circle",
            "fa fa-user-circle-o",
            "fa fa-user-o",
            "fa fa-vcard",
            "fa fa-vcard-o",
            "fa fa-window-close",
            "fa fa-window-close-o",
            "fa fa-window-maximize",
            "fa fa-window-minimize",
            "fa fa-window-restore",
            "fa fa-wpexplorer"
          ]
        },
        {
          "headers": {
            "name": "网页",
            "id": 2
          },
          "body": [
            "fa fa-address-book",
            "fa fa-address-book-o",
            "fa fa-address-card",
            "fa fa-address-card-o",
            "fa fa-adjust",
            "fa fa-american-sign-language-interpreting",
            "fa fa-anchor",
            "fa fa-archive",
            "fa fa-area-chart",
            "fa fa-arrows",
            "fa fa-arrows-h",
            "fa fa-arrows-v",
            "fa fa-asl-interpreting",
            "fa fa-assistive-listening-systems",
            "fa fa-asterisk",
            "fa fa-at",
            "fa fa-audio-description",
            "fa fa-automobile",
            "fa fa-balance-scale",
            "fa fa-ban",
            "fa fa-bank",
            "fa fa-bar-chart",
            "fa fa-bar-chart-o",
            "fa fa-barcode",
            "fa fa-bars",
            "fa fa-bath",
            "fa fa-bathtub",
            "fa fa-battery",
            "fa fa-battery-0",
            "fa fa-battery-1",
            "fa fa-battery-2",
            "fa fa-battery-3",
            "fa fa-battery-4",
            "fa fa-battery-empty",
            "fa fa-battery-full",
            "fa fa-battery-half",
            "fa fa-battery-quarter",
            "fa fa-battery-three-quarters",
            "fa fa-bed",
            "fa fa-beer",
            "fa fa-bell",
            "fa fa-bell-o",
            "fa fa-bell-slash",
            "fa fa-bell-slash-o",
            "fa fa-bicycle",
            "fa fa-binoculars",
            "fa fa-birthday-cake",
            "fa fa-blind",
            "fa fa-bluetooth",
            "fa fa-bluetooth-b",
            "fa fa-bolt",
            "fa fa-bomb",
            "fa fa-book",
            "fa fa-bookmark",
            "fa fa-bookmark-o",
            "fa fa-braille",
            "fa fa-briefcase",
            "fa fa-bug",
            "fa fa-building",
            "fa fa-building-o",
            "fa fa-bullhorn",
            "fa fa-bullseye",
            "fa fa-bus",
            "fa fa-cab",
            "fa fa-calculator",
            "fa fa-calendar",
            "fa fa-calendar-check-o",
            "fa fa-calendar-minus-o",
            "fa fa-calendar-o",
            "fa fa-calendar-plus-o",
            "fa fa-calendar-times-o",
            "fa fa-camera",
            "fa fa-camera-retro",
            "fa fa-car",
            "fa fa-caret-square-o-down",
            "fa fa-caret-square-o-left",
            "fa fa-caret-square-o-right",
            "fa fa-caret-square-o-up",
            "fa fa-cart-arrow-down",
            "fa fa-cart-plus",
            "fa fa-cc",
            "fa fa-certificate",
            "fa fa-check",
            "fa fa-check-circle",
            "fa fa-check-circle-o",
            "fa fa-check-square",
            "fa fa-check-square-o",
            "fa fa-child",
            "fa fa-circle",
            "fa fa-circle-o",
            "fa fa-circle-o-notch",
            "fa fa-circle-thin",
            "fa fa-clock-o",
            "fa fa-clone",
            "fa fa-close",
            "fa fa-cloud",
            "fa fa-cloud-download",
            "fa fa-cloud-upload",
            "fa fa-code",
            "fa fa-code-fork",
            "fa fa-coffee",
            "fa fa-cog",
            "fa fa-cogs",
            "fa fa-comment",
            "fa fa-comment-o",
            "fa fa-commenting",
            "fa fa-commenting-o",
            "fa fa-comments",
            "fa fa-comments-o",
            "fa fa-compass",
            "fa fa-copyright",
            "fa fa-creative-commons",
            "fa fa-credit-card",
            "fa fa-credit-card-alt",
            "fa fa-crop",
            "fa fa-crosshairs",
            "fa fa-cube",
            "fa fa-cubes",
            "fa fa-cutlery",
            "fa fa-dashboard",
            "fa fa-database",
            "fa fa-deaf",
            "fa fa-deafness",
            "fa fa-desktop",
            "fa fa-diamond",
            "fa fa-dot-circle-o",
            "fa fa-download",
            "fa fa-drivers-license",
            "fa fa-drivers-license-o",
            "fa fa-edit",
            "fa fa-ellipsis-h",
            "fa fa-ellipsis-v",
            "fa fa-envelope",
            "fa fa-envelope-o",
            "fa fa-envelope-open",
            "fa fa-envelope-open-o",
            "fa fa-envelope-square",
            "fa fa-eraser",
            "fa fa-exchange",
            "fa fa-exclamation",
            "fa fa-exclamation-circle",
            "fa fa-exclamation-triangle",
            "fa fa-external-link",
            "fa fa-external-link-square",
            "fa fa-eye",
            "fa fa-eye-slash",
            "fa fa-eyedropper",
            "fa fa-fax",
            "fa fa-feed",
            "fa fa-female",
            "fa fa-fighter-jet",
            "fa fa-file-archive-o",
            "fa fa-file-audio-o",
            "fa fa-file-code-o",
            "fa fa-file-excel-o",
            "fa fa-file-image-o",
            "fa fa-file-movie-o",
            "fa fa-file-pdf-o",
            "fa fa-file-photo-o",
            "fa fa-file-picture-o",
            "fa fa-file-powerpoint-o",
            "fa fa-file-sound-o",
            "fa fa-file-video-o",
            "fa fa-file-word-o",
            "fa fa-file-zip-o",
            "fa fa-film",
            "fa fa-filter",
            "fa fa-fire",
            "fa fa-fire-extinguisher",
            "fa fa-flag",
            "fa fa-flag-checkered",
            "fa fa-flag-o",
            "fa fa-flash",
            "fa fa-flask",
            "fa fa-folder",
            "fa fa-folder-o",
            "fa fa-folder-open",
            "fa fa-folder-open-o",
            "fa fa-frown-o",
            "fa fa-futbol-o",
            "fa fa-gamepad",
            "fa fa-gavel",
            "fa fa-gear",
            "fa fa-gears",
            "fa fa-gift",
            "fa fa-glass",
            "fa fa-globe",
            "fa fa-graduation-cap",
            "fa fa-group",
            "fa fa-hand-grab-o",
            "fa fa-hand-lizard-o",
            "fa fa-hand-paper-o",
            "fa fa-hand-peace-o",
            "fa fa-hand-pointer-o",
            "fa fa-hand-rock-o",
            "fa fa-hand-scissors-o",
            "fa fa-hand-spock-o",
            "fa fa-hand-stop-o",
            "fa fa-handshake-o",
            "fa fa-hard-of-hearing",
            "fa fa-hashtag",
            "fa fa-hdd-o",
            "fa fa-headphones",
            "fa fa-heart",
            "fa fa-heart-o",
            "fa fa-heartbeat",
            "fa fa-history",
            "fa fa-home",
            "fa fa-hotel",
            "fa fa-hourglass",
            "fa fa-hourglass-1",
            "fa fa-hourglass-2",
            "fa fa-hourglass-3",
            "fa fa-hourglass-end",
            "fa fa-hourglass-half",
            "fa fa-hourglass-o",
            "fa fa-hourglass-start",
            "fa fa-i-cursor",
            "fa fa-id-badge",
            "fa fa-id-card",
            "fa fa-id-card-o",
            "fa fa-image",
            "fa fa-inbox",
            "fa fa-industry",
            "fa fa-info",
            "fa fa-info-circle",
            "fa fa-institution",
            "fa fa-key",
            "fa fa-keyboard-o",
            "fa fa-language",
            "fa fa-laptop",
            "fa fa-leaf",
            "fa fa-legal",
            "fa fa-lemon-o",
            "fa fa-level-down",
            "fa fa-level-up",
            "fa fa-life-bouy",
            "fa fa-life-buoy",
            "fa fa-life-ring",
            "fa fa-life-saver",
            "fa fa-lightbulb-o",
            "fa fa-line-chart",
            "fa fa-location-arrow",
            "fa fa-lock",
            "fa fa-low-vision",
            "fa fa-magic",
            "fa fa-magnet",
            "fa fa-mail-forward",
            "fa fa-mail-reply",
            "fa fa-mail-reply-all",
            "fa fa-male",
            "fa fa-map",
            "fa fa-map-marker",
            "fa fa-map-o",
            "fa fa-map-pin",
            "fa fa-map-signs",
            "fa fa-meh-o",
            "fa fa-microchip",
            "fa fa-microphone",
            "fa fa-microphone-slash",
            "fa fa-minus",
            "fa fa-minus-circle",
            "fa fa-minus-square",
            "fa fa-minus-square-o",
            "fa fa-mobile",
            "fa fa-mobile-phone",
            "fa fa-money",
            "fa fa-moon-o",
            "fa fa-mortar-board",
            "fa fa-motorcycle",
            "fa fa-mouse-pointer",
            "fa fa-music",
            "fa fa-navicon",
            "fa fa-newspaper-o",
            "fa fa-object-group",
            "fa fa-object-ungroup",
            "fa fa-paint-brush",
            "fa fa-paper-plane",
            "fa fa-paper-plane-o",
            "fa fa-paw",
            "fa fa-pencil",
            "fa fa-pencil-square",
            "fa fa-pencil-square-o",
            "fa fa-percent",
            "fa fa-phone",
            "fa fa-phone-square",
            "fa fa-photo",
            "fa fa-picture-o",
            "fa fa-pie-chart",
            "fa fa-plane",
            "fa fa-plug",
            "fa fa-plus",
            "fa fa-plus-circle",
            "fa fa-plus-square",
            "fa fa-plus-square-o",
            "fa fa-podcast",
            "fa fa-power-off",
            "fa fa-print",
            "fa fa-puzzle-piece",
            "fa fa-qrcode",
            "fa fa-question",
            "fa fa-question-circle",
            "fa fa-question-circle-o",
            "fa fa-quote-left",
            "fa fa-quote-right",
            "fa fa-random",
            "fa fa-recycle",
            "fa fa-refresh",
            "fa fa-registered",
            "fa fa-remove",
            "fa fa-reorder",
            "fa fa-reply",
            "fa fa-reply-all",
            "fa fa-retweet",
            "fa fa-road",
            "fa fa-rocket",
            "fa fa-rss",
            "fa fa-rss-square",
            "fa fa-s15",
            "fa fa-search",
            "fa fa-search-minus",
            "fa fa-search-plus",
            "fa fa-send",
            "fa fa-send-o",
            "fa fa-server",
            "fa fa-share",
            "fa fa-share-alt",
            "fa fa-share-alt-square",
            "fa fa-share-square",
            "fa fa-share-square-o",
            "fa fa-shield",
            "fa fa-ship",
            "fa fa-shopping-bag",
            "fa fa-shopping-basket",
            "fa fa-shopping-cart",
            "fa fa-shower",
            "fa fa-sign-in",
            "fa fa-sign-language",
            "fa fa-sign-out",
            "fa fa-signal",
            "fa fa-signing",
            "fa fa-sitemap",
            "fa fa-sliders",
            "fa fa-smile-o",
            "fa fa-snowflake-o",
            "fa fa-soccer-ball-o",
            "fa fa-sort",
            "fa fa-sort-alpha-asc",
            "fa fa-sort-alpha-desc",
            "fa fa-sort-amount-asc",
            "fa fa-sort-amount-desc",
            "fa fa-sort-asc",
            "fa fa-sort-desc",
            "fa fa-sort-down",
            "fa fa-sort-numeric-asc",
            "fa fa-sort-numeric-desc",
            "fa fa-sort-up",
            "fa fa-space-shuttle",
            "fa fa-spinner",
            "fa fa-spoon",
            "fa fa-square",
            "fa fa-square-o",
            "fa fa-star",
            "fa fa-star-half",
            "fa fa-star-half-empty",
            "fa fa-star-half-full",
            "fa fa-star-half-o",
            "fa fa-star-o",
            "fa fa-sticky-note",
            "fa fa-sticky-note-o",
            "fa fa-street-view",
            "fa fa-suitcase",
            "fa fa-sun-o",
            "fa fa-support",
            "fa fa-tablet",
            "fa fa-tachometer",
            "fa fa-tag",
            "fa fa-tags",
            "fa fa-tasks",
            "fa fa-taxi",
            "fa fa-television",
            "fa fa-terminal",
            "fa fa-thermometer",
            "fa fa-thermometer-0",
            "fa fa-thermometer-1",
            "fa fa-thermometer-2",
            "fa fa-thermometer-3",
            "fa fa-thermometer-4",
            "fa fa-thermometer-empty",
            "fa fa-thermometer-full",
            "fa fa-thermometer-half",
            "fa fa-thermometer-quarter",
            "fa fa-thermometer-three-quarters",
            "fa fa-thumb-tack",
            "fa fa-thumbs-down",
            "fa fa-thumbs-o-down",
            "fa fa-thumbs-o-up",
            "fa fa-thumbs-up",
            "fa fa-ticket",
            "fa fa-times",
            "fa fa-times-circle",
            "fa fa-times-circle-o",
            "fa fa-times-rectangle",
            "fa fa-times-rectangle-o",
            "fa fa-tint",
            "fa fa-toggle-down",
            "fa fa-toggle-left",
            "fa fa-toggle-off",
            "fa fa-toggle-on",
            "fa fa-toggle-right",
            "fa fa-toggle-up",
            "fa fa-trademark",
            "fa fa-trash",
            "fa fa-trash-o",
            "fa fa-tree",
            "fa fa-trophy",
            "fa fa-truck",
            "fa fa-tty",
            "fa fa-tv",
            "fa fa-umbrella",
            "fa fa-universal-access",
            "fa fa-university",
            "fa fa-unlock",
            "fa fa-unlock-alt",
            "fa fa-unsorted",
            "fa fa-upload",
            "fa fa-user",
            "fa fa-user-circle",
            "fa fa-user-circle-o",
            "fa fa-user-o",
            "fa fa-user-plus",
            "fa fa-user-secret",
            "fa fa-user-times",
            "fa fa-users",
            "fa fa-vcard",
            "fa fa-vcard-o",
            "fa fa-video-camera",
            "fa fa-volume-control-phone",
            "fa fa-volume-down",
            "fa fa-volume-off",
            "fa fa-volume-up",
            "fa fa-warning",
            "fa fa-wheelchair",
            "fa fa-wheelchair-alt",
            "fa fa-wifi",
            "fa fa-window-close",
            "fa fa-window-close-o",
            "fa fa-window-maximize",
            "fa fa-window-minimize",
            "fa fa-window-restore",
            "fa fa-wrench"
          ]
        },
        {
          "headers": {
            "name": "手势",
            "id": 3
          },
          "body": [
            "fa fa-hand-grab-o",
            "fa fa-hand-lizard-o",
            "fa fa-hand-o-down",
            "fa fa-hand-o-left",
            "fa fa-hand-o-right",
            "fa fa-hand-o-up",
            "fa fa-hand-paper-o",
            "fa fa-hand-peace-o",
            "fa fa-hand-pointer-o",
            "fa fa-hand-rock-o",
            "fa fa-hand-scissors-o",
            "fa fa-hand-spock-o",
            "fa fa-hand-stop-o",
            "fa fa-thumbs-down",
            "fa fa-thumbs-o-down",
            "fa fa-thumbs-o-up",
            "fa fa-thumbs-up"
          ]
        },
        {
          "headers": {
            "name": "运输",
            "id": 4
          },
          "body": [
            "fa fa-ambulance",
            "fa fa-automobile",
            "fa fa-bicycle",
            "fa fa-bus",
            "fa fa-cab",
            "fa fa-car",
            "fa fa-fighter-jet",
            "fa fa-motorcycle",
            "fa fa-plane",
            "fa fa-rocket",
            "fa fa-ship",
            "fa fa-space-shuttle",
            "fa fa-subway",
            "fa fa-taxi",
            "fa fa-train",
            "fa fa-truck",
            "fa fa-wheelchair",
            "fa fa-wheelchair-alt"
          ]
        },
        {
          "headers": {
            "name": "性别",
            "id": 5
          },
          "body": [
            "fa fa-genderless",
            "fa fa-intersex",
            "fa fa-mars",
            "fa fa-mars-double",
            "fa fa-mars-stroke",
            "fa fa-mars-stroke-h",
            "fa fa-mars-stroke-v",
            "fa fa-mercury",
            "fa fa-neuter",
            "fa fa-transgender",
            "fa fa-transgender-alt",
            "fa fa-venus",
            "fa fa-venus-double",
            "fa fa-venus-mars"
          ]
        },
        {
          "headers": {
            "name": "文件类型",
            "id": 6
          },
          "body": [
            "fa fa-file",
            "fa fa-file-archive-o",
            "fa fa-file-audio-o",
            "fa fa-file-code-o",
            "fa fa-file-excel-o",
            "fa fa-file-image-o",
            "fa fa-file-movie-o",
            "fa fa-file-o",
            "fa fa-file-pdf-o",
            "fa fa-file-photo-o",
            "fa fa-file-picture-o",
            "fa fa-file-powerpoint-o",
            "fa fa-file-sound-o",
            "fa fa-file-text",
            "fa fa-file-text-o",
            "fa fa-file-video-o",
            "fa fa-file-word-o",
            "fa fa-file-zip-o"
          ]
        },
        {
          "headers": {
            "name": "可旋转",
            "id": 7
          },
          "body": [
            "fa fa-circle-o-notch",
            "fa fa-cog",
            "fa fa-gear",
            "fa fa-refresh",
            "fa fa-spinner"
          ]
        },
        {
          "headers": {
            "name": "表单",
            "id": 8
          },
          "body": [
            "fa fa-check-square",
            "fa fa-check-square-o",
            "fa fa-circle",
            "fa fa-circle-o",
            "fa fa-dot-circle-o",
            "fa fa-minus-square",
            "fa fa-minus-square-o",
            "fa fa-plus-square",
            "fa fa-plus-square-o",
            "fa fa-square",
            "fa fa-square-o"
          ]
        },
        {
          "headers": {
            "name": "支付",
            "id": 9
          },
          "body": [
            "fa fa-cc-amex",
            "fa fa-cc-diners-club",
            "fa fa-cc-discover",
            "fa fa-cc-jcb",
            "fa fa-cc-mastercard",
            "fa fa-cc-paypal",
            "fa fa-cc-stripe",
            "fa fa-cc-visa",
            "fa fa-credit-card",
            "fa fa-credit-card-alt",
            "fa fa-google-wallet",
            "fa fa-paypal"
          ]
        },
        {
          "headers": {
            "name": "图表",
            "id": 10
          },
          "body": [
            "fa fa-area-chart",
            "fa fa-bar-chart",
            "fa fa-bar-chart-o",
            "fa fa-line-chart",
            "fa fa-pie-chart"
          ]
        },
        {
          "headers": {
            "name": "货币",
            "id": 11
          },
          "body": [
            "fa fa-bitcoin",
            "fa fa-btc",
            "fa fa-cny",
            "fa fa-dollar",
            "fa fa-eur",
            "fa fa-euro",
            "fa fa-gbp",
            "fa fa-gg",
            "fa fa-gg-circle",
            "fa fa-ils",
            "fa fa-inr",
            "fa fa-jpy",
            "fa fa-krw",
            "fa fa-money",
            "fa fa-rmb",
            "fa fa-rouble",
            "fa fa-rub",
            "fa fa-ruble",
            "fa fa-rupee",
            "fa fa-shekel",
            "fa fa-sheqel",
            "fa fa-try",
            "fa fa-turkish-lira",
            "fa fa-usd",
            "fa fa-won",
            "fa fa-yen"
          ]
        },
        {
          "headers": {
            "name": "文本编辑",
            "id": 12
          },
          "body": [
            "fa fa-align-center",
            "fa fa-align-justify",
            "fa fa-align-left",
            "fa fa-align-right",
            "fa fa-bold",
            "fa fa-chain",
            "fa fa-chain-broken",
            "fa fa-clipboard",
            "fa fa-columns",
            "fa fa-copy",
            "fa fa-cut",
            "fa fa-dedent",
            "fa fa-eraser",
            "fa fa-file",
            "fa fa-file-o",
            "fa fa-file-text",
            "fa fa-file-text-o",
            "fa fa-files-o",
            "fa fa-floppy-o",
            "fa fa-font",
            "fa fa-header",
            "fa fa-indent",
            "fa fa-italic",
            "fa fa-link",
            "fa fa-list",
            "fa fa-list-alt",
            "fa fa-list-ol",
            "fa fa-list-ul",
            "fa fa-outdent",
            "fa fa-paperclip",
            "fa fa-paragraph",
            "fa fa-paste",
            "fa fa-repeat",
            "fa fa-rotate-left",
            "fa fa-rotate-right",
            "fa fa-save",
            "fa fa-scissors",
            "fa fa-strikethrough",
            "fa fa-subscript",
            "fa fa-superscript",
            "fa fa-table",
            "fa fa-text-height",
            "fa fa-text-width",
            "fa fa-th",
            "fa fa-th-large",
            "fa fa-th-list",
            "fa fa-underline",
            "fa fa-undo",
            "fa fa-unlink"
          ]
        },
        {
          "headers": {
            "name": "指示方向",
            "id": 13
          },
          "body": [
            "fa fa-angle-double-down",
            "fa fa-angle-double-left",
            "fa fa-angle-double-right",
            "fa fa-angle-double-up",
            "fa fa-angle-down",
            "fa fa-angle-left",
            "fa fa-angle-right",
            "fa fa-angle-up",
            "fa fa-arrow-circle-down",
            "fa fa-arrow-circle-left",
            "fa fa-arrow-circle-o-down",
            "fa fa-arrow-circle-o-left",
            "fa fa-arrow-circle-o-right",
            "fa fa-arrow-circle-o-up",
            "fa fa-arrow-circle-right",
            "fa fa-arrow-circle-up",
            "fa fa-arrow-down",
            "fa fa-arrow-left",
            "fa fa-arrow-right",
            "fa fa-arrow-up",
            "fa fa-arrows",
            "fa fa-arrows-alt",
            "fa fa-arrows-h",
            "fa fa-arrows-v",
            "fa fa-caret-down",
            "fa fa-caret-left",
            "fa fa-caret-right",
            "fa fa-caret-square-o-down",
            "fa fa-caret-square-o-left",
            "fa fa-caret-square-o-right",
            "fa fa-caret-square-o-up",
            "fa fa-caret-up",
            "fa fa-chevron-circle-down",
            "fa fa-chevron-circle-left",
            "fa fa-chevron-circle-right",
            "fa fa-chevron-circle-up",
            "fa fa-chevron-down",
            "fa fa-chevron-left",
            "fa fa-chevron-right",
            "fa fa-chevron-up",
            "fa fa-exchange",
            "fa fa-hand-o-down",
            "fa fa-hand-o-left",
            "fa fa-hand-o-right",
            "fa fa-hand-o-up",
            "fa fa-long-arrow-down",
            "fa fa-long-arrow-left",
            "fa fa-long-arrow-right",
            "fa fa-long-arrow-up",
            "fa fa-toggle-down",
            "fa fa-toggle-left",
            "fa fa-toggle-right",
            "fa fa-toggle-up"
          ]
        },
        {
          "headers": {
            "name": "视频播放",
            "id": 14
          },
          "body": [
            "fa fa-arrows-alt",
            "fa fa-backward",
            "fa fa-compress",
            "fa fa-eject",
            "fa fa-expand",
            "fa fa-fast-backward",
            "fa fa-fast-forward",
            "fa fa-forward",
            "fa fa-pause",
            "fa fa-pause-circle",
            "fa fa-pause-circle-o",
            "fa fa-play",
            "fa fa-play-circle",
            "fa fa-play-circle-o",
            "fa fa-random",
            "fa fa-step-backward",
            "fa fa-step-forward",
            "fa fa-stop",
            "fa fa-stop-circle",
            "fa fa-stop-circle-o",
            "fa fa-youtube-play"
          ]
        },
        {
          "headers": {
            "name": "标志",
            "id": 15
          },
          "body": [
            "fa fa-500px",
            "fa fa-adn",
            "fa fa-amazon",
            "fa fa-android",
            "fa fa-angellist",
            "fa fa-apple",
            "fa fa-bandcamp",
            "fa fa-behance",
            "fa fa-behance-square",
            "fa fa-bitbucket",
            "fa fa-bitbucket-square",
            "fa fa-bitcoin",
            "fa fa-black-tie",
            "fa fa-bluetooth",
            "fa fa-bluetooth-b",
            "fa fa-btc",
            "fa fa-buysellads",
            "fa fa-cc-amex",
            "fa fa-cc-diners-club",
            "fa fa-cc-discover",
            "fa fa-cc-jcb",
            "fa fa-cc-mastercard",
            "fa fa-cc-paypal",
            "fa fa-cc-stripe",
            "fa fa-cc-visa",
            "fa fa-chrome",
            "fa fa-codepen",
            "fa fa-codiepie",
            "fa fa-connectdevelop",
            "fa fa-contao",
            "fa fa-css3",
            "fa fa-dashcube",
            "fa fa-delicious",
            "fa fa-deviantart",
            "fa fa-digg",
            "fa fa-dribbble",
            "fa fa-dropbox",
            "fa fa-drupal",
            "fa fa-edge",
            "fa fa-eercast",
            "fa fa-empire",
            "fa fa-envira",
            "fa fa-etsy",
            "fa fa-expeditedssl",
            "fa fa-fa",
            "fa fa-facebook",
            "fa fa-facebook-f",
            "fa fa-facebook-official",
            "fa fa-facebook-square",
            "fa fa-firefox",
            "fa fa-first-order",
            "fa fa-flickr",
            "fa fa-font-awesome",
            "fa fa-fonticons",
            "fa fa-fort-awesome",
            "fa fa-forumbee",
            "fa fa-foursquare",
            "fa fa-free-code-camp",
            "fa fa-ge",
            "fa fa-get-pocket",
            "fa fa-gg",
            "fa fa-gg-circle",
            "fa fa-git",
            "fa fa-git-square",
            "fa fa-github",
            "fa fa-github-alt",
            "fa fa-github-square",
            "fa fa-gitlab",
            "fa fa-gittip",
            "fa fa-glide",
            "fa fa-glide-g",
            "fa fa-google",
            "fa fa-google-plus",
            "fa fa-google-plus-circle",
            "fa fa-google-plus-official",
            "fa fa-google-plus-square",
            "fa fa-google-wallet",
            "fa fa-gratipay",
            "fa fa-grav",
            "fa fa-hacker-news",
            "fa fa-houzz",
            "fa fa-html5",
            "fa fa-imdb",
            "fa fa-instagram",
            "fa fa-internet-explorer",
            "fa fa-ioxhost",
            "fa fa-joomla",
            "fa fa-jsfiddle",
            "fa fa-lastfm",
            "fa fa-lastfm-square",
            "fa fa-leanpub",
            "fa fa-linkedin",
            "fa fa-linkedin-square",
            "fa fa-linode",
            "fa fa-linux",
            "fa fa-maxcdn",
            "fa fa-meanpath",
            "fa fa-medium",
            "fa fa-meetup",
            "fa fa-mixcloud",
            "fa fa-modx",
            "fa fa-odnoklassniki",
            "fa fa-odnoklassniki-square",
            "fa fa-opencart",
            "fa fa-openid",
            "fa fa-opera",
            "fa fa-optin-monster",
            "fa fa-pagelines",
            "fa fa-paypal",
            "fa fa-pied-piper",
            "fa fa-pied-piper-alt",
            "fa fa-pied-piper-pp",
            "fa fa-pinterest",
            "fa fa-pinterest-p",
            "fa fa-pinterest-square",
            "fa fa-product-hunt",
            "fa fa-qq",
            "fa fa-quora",
            "fa fa-ra",
            "fa fa-ravelry",
            "fa fa-rebel",
            "fa fa-reddit",
            "fa fa-reddit-alien",
            "fa fa-reddit-square",
            "fa fa-renren",
            "fa fa-resistance",
            "fa fa-safari",
            "fa fa-scribd",
            "fa fa-sellsy",
            "fa fa-share-alt",
            "fa fa-share-alt-square",
            "fa fa-shirtsinbulk",
            "fa fa-simplybuilt",
            "fa fa-skyatlas",
            "fa fa-skype",
            "fa fa-slack",
            "fa fa-slideshare",
            "fa fa-snapchat",
            "fa fa-snapchat-ghost",
            "fa fa-snapchat-square",
            "fa fa-soundcloud",
            "fa fa-spotify",
            "fa fa-stack-exchange",
            "fa fa-stack-overflow",
            "fa fa-steam",
            "fa fa-steam-square",
            "fa fa-stumbleupon",
            "fa fa-stumbleupon-circle",
            "fa fa-superpowers",
            "fa fa-telegram",
            "fa fa-tencent-weibo",
            "fa fa-themeisle",
            "fa fa-trello",
            "fa fa-tripadvisor",
            "fa fa-tumblr",
            "fa fa-tumblr-square",
            "fa fa-twitch",
            "fa fa-twitter",
            "fa fa-twitter-square",
            "fa fa-usb",
            "fa fa-viacoin",
            "fa fa-viadeo",
            "fa fa-viadeo-square",
            "fa fa-vimeo",
            "fa fa-vimeo-square",
            "fa fa-vine",
            "fa fa-vk",
            "fa fa-wechat",
            "fa fa-weibo",
            "fa fa-weixin",
            "fa fa-whatsapp",
            "fa fa-wikipedia-w",
            "fa fa-windows",
            "fa fa-wordpress",
            "fa fa-wpbeginner",
            "fa fa-wpexplorer",
            "fa fa-wpforms",
            "fa fa-xing",
            "fa fa-xing-square",
            "fa fa-y-combinator",
            "fa fa-y-combinator-square",
            "fa fa-yahoo",
            "fa fa-yc",
            "fa fa-yc-square",
            "fa fa-yelp",
            "fa fa-yoast",
            "fa fa-youtube",
            "fa fa-youtube-play",
            "fa fa-youtube-square"
          ]
        },
        {
          "headers": {
            "name": "医疗",
            "id": 16
          },
          "body": [
            "fa fa-ambulance",
            "fa fa-h-square",
            "fa fa-heart",
            "fa fa-heart-o",
            "fa fa-heartbeat",
            "fa fa-hospital-o",
            "fa fa-medkit",
            "fa fa-plus-square",
            "fa fa-stethoscope",
            "fa fa-user-md",
            "fa fa-wheelchair",
            "fa fa-wheelchair-alt"
          ]
        }
      ];
    localStorage.d =JSON.stringify(data);
  }else { data = JSON.parse(localStorage.d);  }
  loadSlider(data);
  loadCols(num);
  loadClassfiyDiv(data);
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
      var id ='#cd' + e.target.dataset.id;
      document.querySelector(id).classList.add("activeGround1");
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
          klass = '.cs' +(aoo.id).slice(2);
          document.querySelector(klass).remove();
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
    if (clas.contains("fix") ){ // 点击 固定
      domo.toggleClass(e.target.closest(".classifyDiv"),'fixed');
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


// 拖放导航
var dragItems =document.querySelectorAll(".classifyNav a");
for (var i = 0; i < dragItems.length; i++) {
  (function(i){
    dragItems[i].onmousedown = function(e){
      //兼容IE8-浏览器
      if(e.target.dragDrop){ e.target.dragDrop(); }
    }
    dragItems[i].ondragstart = function(e){
      e.dataTransfer.setData('text',e.target.className);
    }
  })(i)
}
classifyNav.ondragenter = function(e){
  e.preventDefault();
  if (e.target.parentElement.nodeName == "A") {
    e.target.classList.add('dargColor');
  }
}
classifyNav.ondragover = function(e){
  e.preventDefault();
}
classifyNav.ondragleave = function(e){
  e.preventDefault();
  if (e.target.parentElement.nodeName == "A") {
    e.target.classList.remove('dargColor');
  }
}
classifyNav.ondrop = function(e){
  var klass = '.' + e.dataTransfer.getData('text');
  var elem =document.querySelector(klass);
  if (e.target.parentElement.nodeName == "A") {
    classifyNav.insertBefore(elem,e.target.parentElement.nextElementSibling);
    e.target.classList.remove('dargColor');
  }
}
// dragElem.ondrag = function(e){ }
// dragElem.ondragend = function(e){
//   this.innerHTML = '结束拖动';
//   this.style.backgroundColor = 'pink';
// }
// targetElem.ondragenter = function(e){
//   e.preventDefault();
//   this.innerHTML = '有元素进入目标区域';
//   this.style.background = 'red';
// }





var dragFlag = false;
var dragIcos =document.querySelectorAll(".content .items");
for (var i = 0; i < dragIcos.length; i++) {
  (function(i){
    dragIcos[i].onmousedown = function(){
      //兼容IE8-浏览器
      if(this.dragDrop){ this.dragDrop(); }
    }
    dragIcos[i].ondragstart = function(e){
      dragFlag = false;
      e.dataTransfer.setData('text',this.outerHTML);
    }
    dragIcos[i].ondragend = function(e){
      if (dragFlag) {
        this.remove();
      }
    }
  })(i)
}
content.ondragenter = function(e){
  e.preventDefault();
  console.log(e.target.nodeName);
  if (e.target.nodeName == "LI") {
    e.target.classList.add('dargColor');
  }
}
content.ondragover = function(e){
  e.preventDefault();
}
content.ondragleave = function(e){
  e.preventDefault();
  if (e.target.nodeName == "LI") {
    e.target.classList.remove('dargColor');
  }
}
content.ondrop = function(e){
  var html =  e.dataTransfer.getData('text');
  if (e.target.nodeName == "LI") {
    // 待解决的bug 重新添加的元素 未绑定 拖放事件
    e.target.insertAdjacentHTML("afterend",html);
    e.target.classList.remove('dargColor');
    dragFlag = true;
  }
}








