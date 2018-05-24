var fs = require("fs");
var cheerio = require('cheerio');
var request = require('request');
var url ='https://movie.douban.com/top250';
var path = './豆瓣电影.txt';
var Movie =function(){
  this.title ='';
  this.score =0;
  this.inq ='';
  this.num =0;
}

request(url,function(err,response,data){
  if (err === null && response.statusCode == 200 ) {
    var $ =cheerio.load(data);
    var title =$('.info .title:nth-child(1)');
    var score =$('.info .rating_num');
    var inq =$('.info .inq');
    var arr =[];
    for (var i = 0; i < title.length; i++) {
      var movie =new Movie();
      movie.title =$(title[i]).text();
      movie.score =$(score[i]).text();
      movie.inq =$(inq[i]).text();
      movie.num =i+1;
      arr.push(movie);
    }
    var mes =JSON.stringify(arr,null,2);
    fs.writeFile(path,mes,function(err){
      if (err) {
        console.log(err);
      }else {
        console.log("已经保存");
      }
    })
  }else {
    console.log(err);
  }
 })
































