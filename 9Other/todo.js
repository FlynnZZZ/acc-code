收集总结分析 
  当程序的执行为按先后执行的流程时,需要考虑到某些语句未执行的情况 
    Example: 判断一个数组中是否存在数字1.
      function func(arr){
        var len = arr.length;
        for(var i = 0; i < len; i++) {
          if(arr[i]-1==0) {
            return true;
          }
        }
        //需要考虑到for未执行的情况,当数组为空时,for不执行.
        // 在for后面加一个return false来执行arr为空的情况
        // 考虑到for执行而if未执行的情况
        // 考虑到for和if都执行的情况.
        return false;
      }
  使用JS配合CSS的transition来产生过渡动画 
    先在元素的CSS中定义transition来'监听变化',
    再动态的给一个元素添加一个class,使其某个属性发生变化,从而达到动画效果,而非直接到结果.
    注意:不可使元素从无到有的进行过渡,如将display:none;换成visiblity:hidden;
  对象封装 
    Example: :
    var aoo = {
      message:"abc",
      click:function(e){
        alert(this.message);
      }
    }
    var btn =document.getElementById("myBtn");
    btn.onclick =function(){
      aoo.click();
    }
  奇怪的代码 
    赋值 = 
      var a , b , c = 1;
      console.log(a,b,c); // undefined undefined 1
      b = ( a = c );
      console.log(a,b,c); // 1 1 1
      相当于 
      a = c;
      b = a;

      var a = b =1
      相当于
      var a = 1;
      b = 1;     //  b为全局变量

      var aoo = a || b;
      相当于
      if(a) {
        var aoo = a;
      }
      else {
        var aoo = b;
      }
