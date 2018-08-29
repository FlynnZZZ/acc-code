(function(){
  $('head').append('<style>.fols-timeChoose { background-color: #ddd; height: 53.33333333vw; font-size: 4.8vw; display: flex; position: fixed; bottom: 0; left: 0; right: 0; } .fols-timeChoose .items-wrap { flex-grow: 1; overflow: hidden; } .fols-timeChoose .items-wrap .time-items { height: 53.33333333vw; width: 110%; overflow: scroll; } .fols-timeChoose .items-wrap .time-items .time-item { text-align: center; height: 10.66666667vw; line-height: 10.66666667vw; width: 100%; box-sizing: border-box; padding-right: 2.13333333vw; } .fols-timeChoose .items-wrap .time-items .time-item:nth-child(1) { opacity: 0.18; } .fols-timeChoose .items-wrap .time-items .time-item:nth-child(2) { opacity: 0.5; font-size: 5.33333333vw; } .fols-timeChoose .items-wrap .time-items .time-item:nth-child(3) { opacity: 1; font-size: 5.86666667vw; } .fols-timeChoose .items-wrap .time-items .time-item:nth-child(4) { opacity: 0.5; font-size: 5.33333333vw; } .fols-timeChoose .items-wrap .time-items .time-item:nth-child(5) { opacity: 0.18; } .fols-timeChoose::before { content: ""; width: 100%; border-top: 0.26666667vw #808080 solid; position: absolute; top: 21.33333333vw; left: 0; } .fols-timeChoose::after { content: ""; width: 100%; border-top: 0.26666667vw #808080 solid; position: absolute; top: 32vw; left: 0; }</style>');
  $('body').append('<div class="fols-timeChoose none"> <div class="items-wrap"> <div class="year time-items"> <div class=" time-item">2015年 </div> <div class=" time-item">2016年 </div> <div class=" time-item">2017年 </div> <div class=" time-item">2018年 </div> <div class=" time-item">2019年 </div> </div> </div> <div class="items-wrap"> <div class="month time-items"> <div class=" time-item">2月</div> <div class=" time-item">3月</div> <div class=" time-item">4月</div> <div class=" time-item">5月</div> <div class=" time-item">6月</div> </div> </div> <div class="items-wrap"> <div class="day time-items"> <div class=" time-item">3日</div> <div class=" time-item">4日</div> <div class=" time-item">5日</div> <div class=" time-item">6日</div> <div class=" time-item">7日</div> </div> </div> </div> ');

  var starty;
  var flagYear =true;
  var flagMonth =true;
  var flagDay =true;
  var year =$('.year');
  var month =$('.month');
  var day =$('.day');
  year.on('touchmove',function(e){
    if (flagYear) {
      starty =e.originalEvent.changedTouches[0].pageY;
      flagYear =false;
    }
    var endy = e.originalEvent.changedTouches[0].pageY;
    if (endy - starty < -20 ) { // 下滑
      var elem1 =$($(this).find('.time-item')[0]);
      var elem2 =$($(this).find('.time-item')[4]);
      var num = parseInt(elem2.text()) +1;
      elem1.text(num+"年");
      $(this).append(elem1);
      starty =endy;
    }
    if (endy -starty > 20 ) { // 上滑
      var elem1 =$($(this).find('.time-item')[0]);
      var elem2 =$($(this).find('.time-item')[4]);
      var num = parseInt(elem1.text()) -1;
      elem2.text(num+"年");
      $(this).prepend(elem2);
      starty =endy;
    }
  })
  year.on('touchend',function(){
    flagYear =true;
  })
  month.on('touchmove',function(e){
    if (flagMonth) {
      starty =e.originalEvent.changedTouches[0].pageY;
      flagMonth =false;
    }
    var endy = e.originalEvent.changedTouches[0].pageY;
    if (endy -starty < -20 ) {
      var elem1 =$($(this).find('.time-item')[0]);
      var elem2 =$($(this).find('.time-item')[4]);
      var num = parseInt(elem2.text()) +1;
      if (num == 13) { num =1; }
      elem1.text(num+'月');
      $(this).append(elem1);
      starty =endy;
    }
    if (endy -starty > 20 ) {
      var elem1 =$($(this).find('.time-item')[0]);
      var elem2 =$($(this).find('.time-item')[4]);
      var num = parseInt(elem1.text()) -1;
      if (num == 0 ) { num =12; }
      elem2.text(num+'月');
      $(this).prepend(elem2);
      starty =endy;
    }
  })
  month.on('touchend',function(){
    flagMonth =true;
  })
  var dayNum;
  day.on('touchmove',function(e){
    if (flagDay) {
      starty =e.originalEvent.changedTouches[0].pageY;
      flagDay =false;
      var y =parseInt($(year.find('.time-item')[2]).text());
      var m =parseInt($(month.find('.time-item')[2]).text());
      var time =new Date(y,m,0);
      dayNum =time.getDate();
    }
    var endy = e.originalEvent.changedTouches[0].pageY;
    var elem1 =$($(this).find('.time-item')[0]);
    var elem2 =$($(this).find('.time-item')[4]);
    if (endy -starty < -20 ) {
      var num = parseInt(elem2.text()) +1;
      if (num == (dayNum +1) ) { num =1; }
      elem1.text(num+'日');
      $(this).append(elem1);
      starty =endy;
    }
    if (endy -starty > 20 ) {
      var num = parseInt(elem1.text()) -1;
      if (num == 0 ) { num =dayNum; }
      elem2.text(num+'日');
      $(this).prepend(elem2);
      starty =endy;
    }
  })
  day.on('touchend',function(){
    flagDay =true;
  })
  $('body').on('touchmove',function(e){ // 阻止微信默认下拉出现的网址显示
    e.preventDefault()
  })
})();
