(2017-05-22 08:36:58) : (22873 79)
fileNum : 21
-------------------------------------------------------------------------------







-------------------------------------------------------------------------todo 
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

  整理fontawesome
    分类
    手势
    方向指示
    logo
    状态表示
  一个图标多个标签按标签组合来查找
    











