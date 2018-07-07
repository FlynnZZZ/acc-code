var x =250
function t(n){
var b = []
var i = 100;
function a (n){
  if (n==1) {
    b[i--] =[1]
    return 1
  }
  if (n==0) {
    b[i--] =0
    return 10
  }else {
    if (n%2==0) {
      b[i--] = 0
      return a(Math.floor(n/2))
    }else {
      b[i--] =1
      return a(Math.floor(n/2))+1
    }
  }
}
a(n)
return b.join('');
}
console.log(t(x));
