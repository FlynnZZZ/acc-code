
var randId = 123123;
var body = $('#body');



var ws = new WebSocket("ws://112.74.36.44:9502");
ws.onopen = function(e){
  console.log('ws open  ------------------',ws.readyState);
  
  // 用于接收
  var sendObj = {
    'FCommand' : 'join',
    'FRandId' : randId,
  }
  var sendData = JSON.stringify(sendObj);
  ws.send(sendData);
  
}
ws.onclose = function(e){
  console.log('ws close ---------------------------',e);
}
ws.onerror = function(e){
  console.log('ws error ---------------------------------------',e);
}

// 光标移动
var cursor = $('#cursor');
var halfH = cursor.height()/2;
var halfW = cursor.width()/2;
// 视频播放
var video = body.find('.video video')[0];
// 文字选中 
var text = body.find('.text')[0];
// 动画交互
var imgMove = body.find('.imgMove');
var imgMoveH = imgMove.height();
var imgMoveW = imgMove.width();

ws.onmessage = function(e){
  var obj = JSON.parse(e.data);
  var command = obj.FCommand.name;
  var data = obj.FCommand.data;
  // console.log(command,data);
  
  // 光标移动
  if (command == 'mousemove') {
    cursor.offset({
      top : data.movey,
      left : data.movex-halfW,
    })
  }
  
  // 视频播放
  if (command == 'videoControl') {
    if (data == 'play') {
      video.play();
    }
    else if (data == 'pause') {
      video.pause();
    }
  }
  
  // 文本选中 
  if (command == 'textSelect') {
    function selectText(textbox, startIndex, stopIndex) {
      if (textbox.setSelectionRange) {
        textbox.setSelectionRange(startIndex, stopIndex);
      } else if (textbox.createTextRange) {
        var range = textbox.createTextRange();
        range.collapse(true);
        range.moveStart('character', startIndex);
        range.moveEnd('character', stopIndex - startIndex);
        range.select();
      }
      textbox.focus();
    }
    selectText(text, data.start, data.end);
  }
  
  // 动画交互 imgMove
  // data.overLeft
  // data.overTop
  console.log(command);
  if (command == 'imgMove') {
    imgMove.removeClass('hid1');
    var left = data.overLeft - imgMoveW;
    var top = data.overTop ;
    imgMove.offset({
      left: left,
      top: top
    });
  }
  else if (command == 'imgAutoMove') {
    var left = data.overLeft - imgMoveW;
    var top = data.overTop ;
    imgMove.removeClass('hid1');
    // imgMove.offset({
    // });
    imgMove.animate({
      left: left + 200,
      top: top + 150 
    },2000,function(){
      imgMove.animate({
        left: left + 300,
        top: top + 50 
      },2000)
    })
  }
  else {
    imgMove.addClass("hid1");
  }

  
}
