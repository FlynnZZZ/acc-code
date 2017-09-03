var fs = require("fs");
var cheerio = require('cheerio');
var request = require('request');

var url ='http://fontawesome.dashgame.com/';
var path = './font-awesome.txt';
var selector1 = '.container .mainParts';
var selector2 = '.fa-hover i:nth-child(1)';

var resArr =[];

// [
//   {
//     name:webpages,
//     children:[]
//   },
//   {
//     name:webpages,
//     children:[]
//   },
// ]




// 功能函数
function filter1($){
  var elems1 =$(selector1);
  for (var i = 0; i < elems1.length; i++) {
    var obj ={};
    var elem1 =$(elems1[i]);
    var elems2 =elem1.find(selector2);
    if (elems2.length == 0) {
      continue;
    }
    obj.name =elem1.find('.page-header').text();
    obj.children =filter2($,elems2);
    resArr.push(obj);
  }
}

function filter2($,elems){
  var arr =[]
  for (var i = 0; i < elems.length; i++) {
    var elem =$(elems[i]);
    var mes =elem.attr('class');
    arr.push(mes);
  }
  return arr;
}

function writeMes(mes){
  var data =JSON.stringify(mes,null,2);
  fs.writeFile(path,data,function(err){
    if (err) {
      console.log("have a err",err);
    }else {
      console.log('saved');
    }
  })
}


// 程序开始
request(url,function(err,response,data){
  if (err === null && response.statusCode == 200 ) {
    var $ =cheerio.load(data);
    filter1($);
    writeMes(resArr);
  }else { console.log("获取网页失败",err); }
})





































