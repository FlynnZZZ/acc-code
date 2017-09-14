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
    nginx介绍:
      Nginx ("engine x") 是一个高性能的HTTP和反向代理服务器,也是一个IMAP/POP3/SMTP服务器。Nginx是由Igor Sysoev为俄罗斯访问量第二的Rambler.ru站点开发的,第一个公开版本0.1.0发布于2004年10月4日。其将源代码以类BSD许可证的形式发布,因它的稳定性、丰富的功能集、示例配置文件和低系统资源的消耗而闻名。2011年6月1日,nginx 1.0.4发布。Nginx是一款轻量级的Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器,并在一个BSD-like 协议下发行。由俄罗斯的程序设计师Igor Sysoev所开发,供俄国大型的入口网站及搜索引擎Rambler（俄文:Рамблер）使用。其特点是占有内存少,并发能力强,事实上nginx的并发能力确实在同类型的网页服务器中表现较好.
                                            -----摘自百度百科
    nginx安装
      nginx下载:
        官网网址:http://nginx.org/
        点击 2014(以2004版本为例进行说明,后续不再赘述) ;
        然后选择 2014-12-23日更新的nginx-1.7.9版本 ;
        选择稳定版 Stable version 下的第三个 nginx/Windows-1.10.1 进行下载.
      安装
        将下载的压缩包解压到你想安装的位置,然后打开文件夹找到nginx.exe双击; 
          PS:有个黑色弹框一闪而过,说明它启动；
        打开浏览器,地址栏输入 localhost ,出现 Welcome to nginx! 表示安装成功;
      测试
        配置说明
          Nginx的配置文件是conf文件下的nginx.conf,其实配置文件可以默认不修改,你通过浏览器输入localhost后出现的页面即为html文件夹下的index.html.所以你可以将你想要检测的文件放到HTML文件夹中,并将原本的index.html文件给删了,这个时候打开网页输入localhost,使用ctrl+F5清下浏览器缓存即出现你产品中的index.html(产品的首页都会命名为index.html）页面,然后在进行一系列测试.
          配置修改
            前面说到配置可以不修改,但在实际测试过程中,一般不大可能会将产品往nginx里的html文件夹中塞,这个时候咱们就得改下配置了；
            打开nginx文件夹下的conf文件夹,里面有个nginx.conf文件,用阅读工具如记事本之类打开它；举个栗子:
              默认网站根目录为/usr/local/nginx/html,要将它改成/homw/www
              用文本编辑软件打开nginx.conf
              将其中的
              location / {
              root html;
              index index.php index.html index.htm;
              }
              改为
              location / {
              root /home/www;
              index index.php index.html index.htm;
              }
              然后再将
              location ~ \.php$ {
              root html;
              fastcgi_pass 127.0.0.1:9000;
              fastcgi_index index.php;
              fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
              include fastcgi_params;
              }
              改为
              location ~ \.php$ {
              root /home/www;
              fastcgi_pass 127.0.0.1:9000;
              fastcgi_index index.php;
              fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
              include fastcgi_params;
              }
              然后重启nginx

    PS:若安装出现问题很可能是你的软件目录下有中文,建议大家养成一个好习惯,所有的软件安装目录都用英文,哪怕是拼音也行,因为毕竟从系统到软件,大多是国外的,中文路径容易出问题。
    “默认网站根目录为/usr/local/nginx/html,要将它改成/home/www”,这句话的意思就是,把默认路径从nginx/html改成你自己放置代码的路径,这里的home/www只是举的一个相对路径的栗子,大家也可以改成绝对路径,我个人是不习惯把软件跟文件放一起的,我们先来看下原配置文件
            server {
            listen 80;
            server_name localhost;
            #charset koi8-r;
            #access_log logs/host.access.log main;
            location / {
            root html;
            index index.html index.htm;
            }
            #error_page 404 /404.html;
            # redirect server error pages to the static page /50x.html
            #
            error_page 500 502 503 504 /50x.html;
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
            # root html;
            # fastcgi_pass 127.0.0.1:9000;
            # fastcgi_index index.php;
            # fastcgi_param SCRIPT_FILENAME /scripts$fastcgi_script_name;
            # include fastcgi_params;
            #}
            “下面我们仔细来分析一下:
            listen:表示当前的代理服务器监听的端口,默认的是监听80端口。注意,如果我们配置了多个server,这个listen要配置不一样,不然就不能确定转到哪里去了。
            server_name:表示监听到之后需要转到哪里去,这时我们直接转到本地,这时是直接到nginx文件夹内。
            location:表示匹配的路径,这时配置了/表示所有请求都被匹配到这里
            root:里面配置了root,表示当匹配这个请求的路径时,将会在这个文件夹内寻找相应的文件,这里对我们之后的静态文件伺服很有用。
            index:当没有指定主页时,默认会选择这个指定的文件,它可以有多个,并按顺序来加载,如果第一个不存在,则找第二个,依此类推。
            下面的error_page是代表错误的页面,这里我们暂时不用,先不管它 ”
            （上面这段分析文字,引用自 tomcat结合nginx使用小结）

            接下来的任务就很明确了,把listen 80下面的两个 root html中的路径,改成我们自己放代码的文件夹,例如在E盘下面新建一个home的文件夹,再在目录下新建一个www的文件夹,那么路径就是:E:\home\www,把task1.html放进去,然后修改配置

            server {
            listen 80;
            server_name localhost;

            #charset koi8-r;

            #access_log logs/host.access.log main;

            location / {
            root E:\home\www;
            index index.html index.htm;
            }

            #error_page 404 /404.html;

            # redirect server error pages to the static page /50x.html
            #
            error_page 500 502 503 504 /50x.html;
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

            只改上面两处红字（知乎不能改变文字颜色？那就加粗好了）的地方就可以了,然后用任务管理器 （ctrl+alt+delete）关闭nginx进程,可能有好几个,全都关掉,然后重新打开nginx,浏览器输入http://localhost/task1.html,就可以正常访问了,如果还是访问不了的话,在localhost上加上端口:80试试~
            （其实我理解的是,只要路径正确就行,但是我换了其他的文件夹名字,例如E:\wy\task,E:\task等,都失败了,提示404错误,不知道是不是我访问的姿势不对,我试了一个多小时都不行...ORZ）

            另外,@19 师弟:手机访问我研究出来了,不需要电脑共享文件
            首先,电脑和手机连接上同一个wifi
            然后查看电脑ip:win+R→cmd→ipconfig→回车, 找到无限局域网适配器wlan中的ip地址,例如我的是192.168.0.119
            然后手机浏览器中输入192.168.01.119/task1.html 就可以看到自己的代码啦~

            PS:手机访问还有另外两个方法
            1、代码上传至服务器,直接用ip访问
            2、谷歌浏览器的F12调试中,左上角有个手机的图标,点那个就可以模拟移动设备访问,有很多不同尺寸的手机,苹果、三星、洛基亚之类的,木有小米 0.0


            感想:
            1、感谢@19 师弟的耐心指导,没想到12点了还在,下次有人问你这个问题,把这篇日报给他看就行啦~
            2、我在夜猫子的路上一去不复返了..orz


            2016.03.05 更新
            在群里看到老大帮师弟解答问题,顺便也解了我先前的疑惑
            为什么用E:\wy\task,E:\task等路径都显示错误,都是转义字符的锅


            所有的转义字符和所对应的意义:
            转义字符
            意义
            ASCII码值（十进制）
            \a
            响铃(BEL)
            007
            \b
            退格(BS) ,将当前位置移到前一列
            008
            \f
            换页(FF),将当前位置移到下页开头
            012
            \n
            换行(LF) ,将当前位置移到下一行开头
            010
            \r
            回车(CR) ,将当前位置移到本行开头
            013
            \t
            水平制表(HT) （跳到下一个TAB位置）
            009
            \v
            垂直制表(VT)
            011
            \\
            // 代表一个反斜线字符''\'
            // 092
            // \'
            // 代表一个单引号（撇号）字符
            // 039
            // \"
            // 代表一个双引号字符
            // 034
            // \?
            // 　　代表一个问号
            // 　　063
            // \0
            // 空字符(NULL)
            // 000
            // \ddd
            // 1到3位八进制数所代表的任意字符
            // 三位八进制
            // \xhh
            // 1到2位十六进制所代表的任意字符
            // 二位十六进制
            // 注意:区分,斜杠:"/" 与 反斜杠:"\" ,此处不可互换
            // 来源: 转义字符_百度百科
            // 先前我路径中的\t被自动转换成制表符了,所以读取不了目录,换成mytask就行了
            // 另外,也明白了看错误日志的重要性
            // nginx路径下的\logs\error.log就是错误日志,复制里面的内容去百度就行
            // 其他很多软件应该也是类似原理
            // 再次感谢老大~
            // 
            // PS:
            // 1、先前我口中的@19 师弟,原来是首席大师兄,失敬,失敬
            // 2、@苏哈哈 师兄补充的一条:#号是注释符号
  'http-server' [详见npm]
--------------------------------------------------------------------------------
CommonJS模块化规范 
  PS: 一般情况可省略'.js'拓展名,可以使用相对路径,也可以使用绝对路径,
    系统内置模块可直接使用模块名 
    require是同步的,模块系统需要同步读取模块文件内容,并编译执行以得到模块接口 
  运行时加载: 只能在运行时确定 
    比如,CommonJS 模块就是对象,输入时必须查找对象属性 
    // CommonJS模块
    let { stat, exists, readFile } = require('fs');
    // 等同于
    let _fs = require('fs');
    let stat = _fs.stat;
    let exists = _fs.exists;
    let readfile = _fs.readfile;
    上面代码的实质是整体加载fs模块[即加载fs的所有方法],生成一个对象(_fs),
    然后再从这个对象上面读取3个方法。
    这种加载称为“运行时加载”,因为只有运行时才能得到这个对象,
    导致完全没办法在编译时做“静态优化”。
  module.exports 模块输出: 把模块希望输出的内容放入该对象 
  require() 加载模块的方法: 该方法读取一文件并执行,返回内部的 module.exports 对象 
AMD'Asynchronous Module Definition'规范,异步模块定义 
  PS: 异步:有效避免了采用同步加载方式中导致页面假死现象 
    模块定义:每个模块必须按照一定的格式编写  
    主要接口有两个:'define'和'require' 
  由于原生JS不支持,需用库函数如RequireJS 
CMD'Common Module Definition'通用模块定义
  CMD规范是国内发展出来的,就像AMD有个requireJS,CMD有个浏览器的实现SeaJS,
  SeaJS要解决的问题和requireJS一样,只不过在模块定义方式和模块加载时机上有所不同
  区别:在模块定义时对依赖的处理不同
  AMD推崇依赖前置,在定义模块的时候就要声明其依赖的模块 
  CMD推崇就近依赖,只有在用到某个模块的时候再去require 
----------------------------------------------------------------------以下待整理
