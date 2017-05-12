

// 去除相邻字符重复的字符,只保留一位
var str ="1122233344567711233";
function foo(str){
  var j=1;
  var res ='';
  for (var i = 0; i < str.length; i=j) {
    for (j = i+1; j < str.length+1; j++) {
      if (str[i]!=str[j]) {
        res =res+str[i];
        console.log(str[i])
        break;
      }
    }
  }
  return res;
}
foo(str); //"1234567123"

