

var randId = 123123;
var body = $("#body");
var bodyW = body.width();
var bodyH = body.height();

var ws = new WebSocket("ws://112.74.36.44:9502");
var wsSend = function(name,data){
  var obj = {};
  var time = new Date();
  obj['FRandId'] = randId;
  obj['FCommand'] = {
    name : name,
    time : time,
    data : data,
  };
  var val = JSON.stringify(obj);
  ws.send(val);
  // console.log('--s--');
}
ws.onclose = function(e){
  console.log('ws close ---------------------------',e);
}
ws.onmessage = function(e){
  console.log('ws back data -----------------',e);
}
ws.onerror = function(e){
  console.log('ws error---------------------------------------',e);
}
ws.onopen = function(e){
  console.log('ws open -------------------');
  // 接收消息
  // var obj = {
  //   'FCommand' : 'join',
  //   'FRandId' : '123123'
  // }
  // obj1 = JSON.stringify(obj);
  // ws.send(obj1);
  
  
  
  
  // 光标移动 'mousemove'
  var mouseMoveBool = true;
  body.on("mousemove",function(e){
    // console.log(e.pageX,e.pageY);
    if ( mouseMoveBool ) {
      wsSend("mousemove",{
        movex : e.pageX,
        movey : e.pageY
      });
    }
    
    
  })
  
  // 视频播放 'videoControl'
  var video = body.find('.video video');
  video.on("play",function(e){
    wsSend('videoControl','play');
  });
  video.on("pause",function(e){
    wsSend('videoControl','pause');
  });
  
  // 文字选中 'textSelect'
  var text = body.find('.text');
  text.on("select",function(e){
    wsSend('textSelect',{
      start : e.target.selectionStart,
      end : e.target.selectionEnd
    })
  })
  text.on("click",function(e){
    wsSend('textSelect',{
      start : 0,
      end : 0
    })
  })
  
  // 动画交互 'imgMove' imgAutoMove
  var imgMove = body.find('.imgMove');
  var imgMoveW = imgMove.width();
  var imgMoveH = imgMove.height();
  var imgMoveBool = true;
  imgMove.on("click",function(e){
    
    var imgMovePosX = e.offsetX;
    var imgMovePosY = e.offsetY;
    if (imgMoveBool) {
      imgMoveBool = false;
      imgMove.on("mousemove",function(ev){
        var left = ev.pageX - imgMovePosX;
        var top = ev.pageY - imgMovePosY;
        imgMove.offset({
          left : left ,
          top : top
        })
        // imgMove 超出 但 cursor 未超出
        if ((left + imgMoveW) >= bodyW && ev.pageX < bodyW ) {
          wsSend("imgMove",{
            overLeft : left + imgMoveW - bodyW ,
            overTop : top
          });
        }
        //   cursor 超出 (imgMove 也超出)
        if ( ev.pageX >= ( bodyW-10) ) {
          wsSend("imgAutoMove",{
            overLeft : left + imgMoveW - bodyW ,
            overTop : top
          });
          imgMove.off('mousemove');
          imgMove.animate({
            left: left + 200,
            top: top + 150 
          },2000)

          imgMoveBool = true;
          // mouseMoveBool = true;
        } 
        
      })
      mouseMoveBool = false;
    }
    else {
      imgMove.off('mousemove');
      imgMoveBool = true;
      mouseMoveBool = true;
    }
    
    
    
    
    
    
    
    
    
    
    
    // var left = e.pageX - imgMovePosX;
    // var top = e.pageY - imgMovePosY;
    // var overLeft = left+imgMoveW - bodyW;
    // var overTop = top+imgMoveH- bodyH;
    
    // if (imgMoveBool && e.pageX<bodyW && e.pageY<bodyH) {
    //   mouseMoveBool = false;
    //   imgMove.offset({
    //     left : left,
    //     top : top,
    //   })
    // }
    // else if (left+imgMoveW>=bodyW || top+imgMoveH >= bodyH) { // imgMove 超出边界
    //   wsSend("imgMove",{
    //     overLeft : overLeft ,
    //     overTop : overTop
    //   });
    //   console.log('imgMove over');
    // }
    // else if (e.pageX >=bodyW  || e.pageY>=bodyH) { // 光标超出边界
    //   imgMoveBool = false;
    //   mouseMoveBool = true;
    //   wsSend("imgAutoMove",{
    //     overLeft : overLeft ,
    //     overTop : overTop
    //   });
    // }

    
    
  })

  
  
}

























