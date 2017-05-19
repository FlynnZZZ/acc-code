(2017-05-19 20:33:25) : (22866 32)
-------------------------------------------------------------------------------







---------------------------------------------------------------------------todo
  路径控制 
    'www.aoo.com?ctt=xx&tab=xx'
    var s = location.search.slice(1);
    var s1 = s.split('&');
    var obj = {};
    s1.forEach(function(val,indx,arr){
      var arr = val.split('=');
      obj[arr[0]] = arr[1];
    });
    console.log(obj);














