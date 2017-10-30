本地服务器搭建  
'xampp'搭建本地服务器 
  修改服务器根目录指向'httpd.conf'文件
    DocumentRoot "E:/project/"                             1
    <Directory "E:/project/">                              2
      Options Indexes FollowSymLinks Includes ExecCGI
      AllowOverride All
      Require all granted
    </Directory>
  虚拟主机的配置'httpd-vhosts.conf'文件 
    <VirtualHost *:80>                                     
      ServerAdmin webmaster@dummy-host2.example.com
      DocumentRoot "E:/project/"            3
      ServerName    project.localtst.com                   4
      ErrorLog "logs/dummy-host2.example.com-error.log"
      CustomLog "logs/dummy-host2.example.com-access.log" common
    </VirtualHost>
  设置本地 Hosts
    127.0.0.1    project.localtst.com                      5
    // 127.0.0.2  上文配置虚拟主机时 VirtualHost 的回送 IP
  共修改'3'个文件'5'个位置
'nginx'配置步骤及说明 
  PS: Nginx"engine x"是一个高性能的HTTP和反向代理服务器,也是一个IMAP/POP3/SMTP服务器 
    特点是占有内存少,并发能力强  
  配置文件内容说明  
    Nginx的配置文件是conf文件下的'nginx.conf'
    默认网站根目录为'/usr/local/nginx/html' 
    server {
      listen 80;             // 当前的代理服务器监听的端口
      server_name localhost; // 监听到之后转到的地方 
      #charset koi8-r;
      #access_log logs/host.access.log main;
      location / {  // 匹配的路径,配置了/表示所有请求都被匹配到这里 
        root E:\home\www;  // root 表示当匹配这个请求的路径时,将会在这个文件夹内寻找相应的文件
        index index.html index.htm; // 未指定主页时,默认选择的文件,可有多个,并按顺序加载
        // 如果第一个不存在,则找第二个,依此类推。
      }
    #error_page 404 /404.html;
    # redirect server error pages to the static page /50x.html
    #
    error_page 500 502 503 504 /50x.html;  // 错误的页面 
    location = /50x.html {
      root html;
    }
    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #  proxy_pass http://127.0.0.1;
    #}
    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    # root html;
    # fastcgi_pass 127.0.0.1:9000;
    # fastcgi_index index.php;
    # fastcgi_param SCRIPT_FILENAME /scripts$fastcgi_script_name;
    # include fastcgi_params;
    #}


    location = /50x.html {
    root html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    # proxy_pass http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    # root E:\home\www;
    # fastcgi_pass 127.0.0.1:9000;
    # fastcgi_index index.php;
    # fastcgi_param SCRIPT_FILENAME /scripts$fastcgi_script_name;
    # include fastcgi_params;
    #}
  手机访问 
    手机和PC处于同一个局域网内 
    访问PC IP 即可 
'http-server' [详见npm] 
----------------------------------------------------------------------以下待整理


