var http =require('https');
var fs =require("fs");
var cheerio =require("cheerio");
var url ='https://movie.douban.com/top250';
var path ='./豆瓣电影.txt';
var html ='';
var Movie =function(){
  this.title ='';
  this.score =0;
  this.introduc ='';
  this.num =0;
}
http.get(url,function (res){
  res.on("data",function(data){
    html +=data;
  })
  res.on('end',function (){
    var $ =cheerio.load(html);
    var title =$('.info .title:nth-child(1)');
    var score =$('.info .rating_num');
    var introduc =$('.info .inq');
    var arr =[];
    for (var i = 0; i < title.length; i++) {
      var movie =new Movie();
      movie.title =$(title[i]).text();
      movie.score =$(score[i]).text();
      movie.introduc =$(introduc[i]).text();
      movie.num =i+1;
      arr.push(movie);
    }
    var mes =JSON.stringify(arr,null,2);
    fs.writeFile(path,mes,function(err){
      if (err) {
        console.log(err);
      }else {
        console.log("已保存");
      }
    })
  })
})


