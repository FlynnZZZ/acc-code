var fs = require("fs");
var cheerio = require('cheerio');
var request = require('request');
var url ='https://movie.douban.com/top250';

request(url,function(err,response,data){
  if (err === null && response.statusCode == 200 ) {
    var $ =cheerio.load(data);
    var imgs =$('.item img');
    for (var i = 0; i < imgs.length; i++) {
      (function(i){
        var imgUrl = $(imgs[i]).attr('src');
        var imgName =$(imgs[i]).attr('alt');
        var path = './img/' + imgName +'.png';
        request(imgUrl).pipe(fs.createWriteStream(path));
      })(i)
    }
  }else {
    console.log(err);
  }
 })
































