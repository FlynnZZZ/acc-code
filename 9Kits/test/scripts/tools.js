


export default {
  objView(checkObj,checkProp){  // 检查对象及其自身的属性 
    console.log('_______________________ start __________________________');
    console.log('查询的对象: ',checkObj);
    // 检查对象的类型 
    console.log('对象的类型: ',Object.prototype.toString.call(checkObj).slice(8,-1) );
    var bol = false 
    // 查询对象成员 
    var keys = Object.getOwnPropertyNames(checkObj) 
    // var keys = Object.keys(checkObj) 
    ,_resultArr = keys.map(function(val,idx ){
      if (checkProp && val == checkProp) { bol = true }
      var _idx = ('00'+idx+'0').slice(-4,-1)
      try {
        console.log(`${_idx} : ${val} - ${checkObj[val]}` );
      } 
      catch (e) {
        console.log(`${_idx} : ${val} -----` );
      } 
    } ) 
    console.log(`共计对象成员: ${_resultArr.length} 个`);
    if ( bol ) { console.log(`存在属性: ${checkProp}`) }
    else if ( checkProp ) { console.log(`不存在属性: ${checkProp}`) } 
    console.log('_______________________ end __________________________');
  },
  
  
  
  
  
  
  
  
}