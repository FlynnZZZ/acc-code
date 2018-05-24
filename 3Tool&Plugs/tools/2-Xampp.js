'xampp'搭建本地服务器 
  'xampp/apache/conf/httpd.conf',修改服务器根目录指向 
    DocumentRoot "E:/project/"                             1
    <Directory "E:/project/">                              2
      Options Indexes FollowSymLinks Includes ExecCGI
      AllowOverride All
      Require all granted
    </Directory>
    台式机: 
      #-------------------------------------------------------------------------------------------------------------------------------------------------------------
      DocumentRoot "H:/project/test"
      <Directory "H:/project/test">
        Options Indexes FollowSymLinks Includes ExecCGI
        AllowOverride All
        Require all granted
      </Directory>
      DocumentRoot "H:/github/acc-web/tls"
      <Directory "H:/github/acc-web/tls">
        Options Indexes FollowSymLinks Includes ExecCGI
        AllowOverride All
        Require all granted
      </Directory>
      
      DocumentRoot "F:/yihuo/pc/HTML"
      <Directory "F:/yihuo/pc/HTML">
        Options Indexes FollowSymLinks Includes ExecCGI
        AllowOverride All
        Require all granted
      </Directory>
      #-------------------------------------------------------------------------------------------------------------------------------------------------------------
  'xampp/apache/conf/extra/httpd-vhosts.conf',虚拟主机的配置 
    <VirtualHost *:80>                                     
      ServerAdmin webmaster@dummy-host2.example.com   // 管理员邮箱 
      DocumentRoot "E:/project/"                           3
      ServerName    project.localtst.com                   4
      ErrorLog "logs/dummy-host2.example.com-error.log"            // 错误日志 
      CustomLog "logs/dummy-host2.example.com-access.log" common   // 日常日志  
    </VirtualHost>
    台式机: 
      #--------------------------------------------------------------------------------------------------------------------------------------------------------
      <VirtualHost *:80>
        DocumentRoot "H:/project/test"
        ServerName   tst.lcl.com
      </VirtualHost>
      <VirtualHost *:80>
        DocumentRoot "H:/github/acc-web/tls"
        ServerName   wbtls.lcl.com
      </VirtualHost>
      
      <VirtualHost *:80>
        DocumentRoot "F:/yihuo/pc/HTML"
        ServerName   yihuo.lcltst.com
      </VirtualHost>
      #--------------------------------------------------------------------------------------------------------------------------------------------------------
  'C:/Windows/System32/drivers/etc/hosts',本地ip代理 
    127.0.0.1    project.localtst.com                      5
    // 127.0.0.2  上文配置虚拟主机时 VirtualHost 的回送 IP
  共修改'3'个文件'5'个位置
  问题及决解: 
    启动Apache,显示如下错误信息:  
      Error: Apache shutdown unexpectedly.
      This may be due to a blocked port, missing dependencies, 
      improper privileges, a crash, or a shutdown by another method.
      Press the Logs button to view error logs and check
      the Windows Event Viewer for more clues
      If you need more help, copy and post this
      entire log window on the forums
    原因: 在'xampp/apache/conf/httpd.conf'中设置了不存在的目录
    决解: 将不存在的目录修正 


