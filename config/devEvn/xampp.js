'xampp'搭建本地服务器 
  'xampp/apache/conf/httpd.conf',修改服务器根目录指向 
    DocumentRoot "E:/project/"                             1
    <Directory "E:/project/">                              2
      Options Indexes FollowSymLinks Includes ExecCGI
      AllowOverride All
      Require all granted
    </Directory>
  'xampp/apache/conf/extra/httpd-vhosts.conf',虚拟主机的配置 
    <VirtualHost *:80>                                     
      ServerAdmin webmaster@dummy-host2.example.com
      DocumentRoot "E:/project/"            3
      ServerName    project.localtst.com                   4
      ErrorLog "logs/dummy-host2.example.com-error.log"
      CustomLog "logs/dummy-host2.example.com-access.log" common
    </VirtualHost>
  'C:/Windows/System32/drivers/etc/hosts',本地ip代理 
    127.0.0.1    project.localtst.com                      5
    // 127.0.0.2  上文配置虚拟主机时 VirtualHost 的回送 IP
  共修改'3'个文件'5'个位置


