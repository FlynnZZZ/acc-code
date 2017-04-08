
var arr=new Array();
arr[0]=2;
// 定义数组用于存放找出的质数.初始化一个用于后面使用.
var k=1;
// k表示k个质数,先将一个质数k放入数组中.
var n=1;
// n 用作判断

for(var j=3;j<=1000000;j=j+2){
  // j+2 表示所有的质数都是奇数
  for(var i=0;i<Math.sqrt(k);i++){
    // Math.sqrt(k) 为求平方根
    if(j%arr[i]==0){
      n=0;
      break;
    }
  }
  if (n) {
    arr[k]=j;
    k++;
    document.write(j+" ");
  }
  n =1;
  // 重置判断
}
// document.write(arr);
document.write(k);




/*
算法优化思路一:
  当一个数具有公约数则最小为3,通过此可以缩小取余的范围. */
