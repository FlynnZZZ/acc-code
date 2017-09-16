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
Grunt: JS构建工具,前端自动化工具  
  PS: 基于NodeJS,用JS开发,Grunt及其插件,都作为一个包,可以用NPM安装进行管理 
  相关命令 
    npm i -g grunt-cli   全局安装Grunt命令行 
      grunt -V 查看版本 
    npm i grunt -D    项目中安装grunt,并写入开发依赖 
    npm i <name> -D   安装相关插件、工具,并写入开发依赖 
      npm i load-grunt-tasks -D  安装用于加载包的grunt工具 
      npm i time-grunt -D   
  'Gruntfile.js'文件: Grunt的配置文件  
    PS: Grunt调用'Gruntfile.js'文件,解析里面的任务'task'并执行相应操作 
    module.exports = function(grunt){
      require('load-grunt-tasks')(grunt); // 加载所有插件 
      require('time-grunt')(grunt);       // time-grunt 
      
      var config = { // 配置项目路径 
        app: 'src',
        dist: 'dist'
      }
      
      grunt.initConfig({ // 任务配置
        // 定义此参数对象为'params',便于后续描述
        config:  config,
        
        // 任务配置 
        xx: {   // 命令行中 grunt xx ,执行所有子任务 
          aoo: { // 子任务, 命令行中 grunt xx:aoo 执行该任务 
            
          },
          boo: {
            
          }
          ...
        },
        
        
      })
    }
    主要分三块代码: 
      插件加载代码: 把需要用到的插件加载进来 
      任务注册代码: 注册task,包含编写的任务配置代码 
      任务配置代码: 要执行的任务和实现的功能 
    Task    
    Target  
    Options 
    API 
      通配符 
        ?   匹配除'/'外的单个字符
        *   匹配除'/'外的任意字符
        **  匹配任意字符 
        {xx,xx,...}  匹配所有列出的字符 
        !   条件取反 
      <%= aoo.xx %>   模版占位符,aoo表示'params.aoo' 
      属性 
      函数 
      grunt.file.readJSON('xx.json') // 读取'xx.json'文件 
      grunt.file.isDir(filePath)     // 判断路径是文件还是文件夹 
      grunt.loadNpmTasks('grunt-contrib-uglify')  // 加载插件 
      grunt.registerTask('default',['uglify'])    // 注册任务 
        在'default'上注册了一个'Uglify'任务,'default'是别名,是默认的'task', 
        当在项目目录执行grunt时,会执行注册到'default'上的任务 
  任务插件详解 
    load-grunt-tasks       加载所有在开发依赖的Grunt插件 
    grunt-contrib-copy     文件拷贝 
      'copy': {
        aoo: {  // 子任务'aoo' 
          // 形式一: 单/多对单  
          src: str/arr, // 原文件  
          dest:   ,     // 目标文件  
          // 形式二: 多对多映射 
          files: [
            {
              expand: true,
              cwd: 'path', // src 中的文件路径以此为基 
              src: str/arr,  
              dest:  '' ,     
              ext: '.js', // 定义扩展名 
              extDot: '', // 当原文件名中存在多个点,如'aoo.min.js'
                // 'first'  
                // 'last'   
              flatten: true,
              rename: function(dest,src){
                return dest+'js/'+src;
              },
            },
          ],
          // 形式三: 形式二的简化版 
          files: {
            // key 为目标文件,val 为原文件 
            key1: val2,
          }
        }
      }
    grunt-contrib-clean    文件删除 
      'clean': {
        aoo: {
          src: str/arr, // 将删除的文件 
          filter:   ,   // 过滤条件 
            参数可为 NodeJS的'fs.stats'的方法,或自定义函数
              如将文件全部删除,单保留文件夹,以下二选一  
              'isFile'        
              function(filePath){
                return !grunt.file.isDir(filePath);
              }
          dot: bol,     // 是否删除以'.'开头的文件, 
        }
      }
    grunt-contrib-connect  建立本地服务器 
    grunt-contrib-watch    监听文件变动  
    grunt-contrib-uglify   压缩文件  
      'uglify': {
        options: {
          
        },
        build: {
          
        },
      }
    grunt-contrib-concat   合并文件  
      'concat': {
        options: {
          separator: ';',
        },
        dist: {
          src: ['./src/plugin.js', './src/plugin2.js'],
          dest: './global.js',
        },
      }
    grunt-contrib-jshint   语法检查  
    grunt-contrib-sass     Scss编译  
      var sassStyle = 'expanded';
      
      'sass': {
        output : {
          options: {
            style: sassStyle
          },
          files: {
            './style.css': './scss/style.scss'
          }
        }
      }
Gulp: 自动化构建工具 
  相关命令 
    npm i -g gulp 
  'Gulpfile.js'配置文件 
----------------------------------------------------------------------以下待整理
