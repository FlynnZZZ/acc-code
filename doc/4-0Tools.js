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
      Nginx ("engine x") 是一个高性能的HTTP和反向代理服务器，也是一个IMAP/POP3/SMTP服务器。Nginx是由Igor Sysoev为俄罗斯访问量第二的Rambler.ru站点开发的，第一个公开版本0.1.0发布于2004年10月4日。其将源代码以类BSD许可证的形式发布，因它的稳定性、丰富的功能集、示例配置文件和低系统资源的消耗而闻名。2011年6月1日，nginx 1.0.4发布。Nginx是一款轻量级的Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，并在一个BSD-like 协议下发行。由俄罗斯的程序设计师Igor Sysoev所开发，供俄国大型的入口网站及搜索引擎Rambler（俄文:Рамблер）使用。其特点是占有内存少，并发能力强，事实上nginx的并发能力确实在同类型的网页服务器中表现较好.
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
          Nginx的配置文件是conf文件下的nginx.conf，其实配置文件可以默认不修改,你通过浏览器输入localhost后出现的页面即为html文件夹下的index.html.所以你可以将你想要检测的文件放到HTML文件夹中，并将原本的index.html文件给删了，这个时候打开网页输入localhost，使用ctrl+F5清下浏览器缓存即出现你产品中的index.html(产品的首页都会命名为index.html）页面，然后在进行一系列测试.
          配置修改
            前面说到配置可以不修改，但在实际测试过程中，一般不大可能会将产品往nginx里的html文件夹中塞，这个时候咱们就得改下配置了；
            打开nginx文件夹下的conf文件夹，里面有个nginx.conf文件，用阅读工具如记事本之类打开它；举个栗子:
              默认网站根目录为/usr/local/nginx/html，要将它改成/homw/www
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

    PS:若安装出现问题很可能是你的软件目录下有中文，建议大家养成一个好习惯，所有的软件安装目录都用英文，哪怕是拼音也行，因为毕竟从系统到软件，大多是国外的，中文路径容易出问题。
    “默认网站根目录为/usr/local/nginx/html，要将它改成/home/www”，这句话的意思就是，把默认路径从nginx/html改成你自己放置代码的路径，这里的home/www只是举的一个相对路径的栗子，大家也可以改成绝对路径，我个人是不习惯把软件跟文件放一起的，我们先来看下原配置文件
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
            listen:表示当前的代理服务器监听的端口，默认的是监听80端口。注意，如果我们配置了多个server，这个listen要配置不一样，不然就不能确定转到哪里去了。
            server_name:表示监听到之后需要转到哪里去，这时我们直接转到本地，这时是直接到nginx文件夹内。
            location:表示匹配的路径，这时配置了/表示所有请求都被匹配到这里
            root:里面配置了root，表示当匹配这个请求的路径时，将会在这个文件夹内寻找相应的文件，这里对我们之后的静态文件伺服很有用。
            index:当没有指定主页时，默认会选择这个指定的文件，它可以有多个，并按顺序来加载，如果第一个不存在，则找第二个，依此类推。
            下面的error_page是代表错误的页面，这里我们暂时不用，先不管它 ”
            （上面这段分析文字，引用自 tomcat结合nginx使用小结）

            接下来的任务就很明确了，把listen 80下面的两个 root html中的路径，改成我们自己放代码的文件夹，例如在E盘下面新建一个home的文件夹，再在目录下新建一个www的文件夹，那么路径就是:E:\home\www，把task1.html放进去，然后修改配置

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

            只改上面两处红字（知乎不能改变文字颜色？那就加粗好了）的地方就可以了，然后用任务管理器 （ctrl+alt+delete）关闭nginx进程，可能有好几个，全都关掉，然后重新打开nginx，浏览器输入http://localhost/task1.html，就可以正常访问了，如果还是访问不了的话，在localhost上加上端口:80试试~
            （其实我理解的是，只要路径正确就行，但是我换了其他的文件夹名字，例如E:\wy\task，E:\task等，都失败了，提示404错误，不知道是不是我访问的姿势不对，我试了一个多小时都不行...ORZ）

            另外，@19 师弟:手机访问我研究出来了，不需要电脑共享文件
            首先，电脑和手机连接上同一个wifi
            然后查看电脑ip:win+R→cmd→ipconfig→回车, 找到无限局域网适配器wlan中的ip地址，例如我的是192.168.0.119
            然后手机浏览器中输入192.168.01.119/task1.html 就可以看到自己的代码啦~

            PS:手机访问还有另外两个方法
            1、代码上传至服务器，直接用ip访问
            2、谷歌浏览器的F12调试中，左上角有个手机的图标，点那个就可以模拟移动设备访问，有很多不同尺寸的手机，苹果、三星、洛基亚之类的，木有小米 0.0


            感想:
            1、感谢@19 师弟的耐心指导，没想到12点了还在，下次有人问你这个问题，把这篇日报给他看就行啦~
            2、我在夜猫子的路上一去不复返了..orz


            2016.03.05 更新
            在群里看到老大帮师弟解答问题，顺便也解了我先前的疑惑
            为什么用E:\wy\task，E:\task等路径都显示错误，都是转义字符的锅


            所有的转义字符和所对应的意义:
            转义字符
            意义
            ASCII码值（十进制）
            \a
            响铃(BEL)
            007
            \b
            退格(BS) ，将当前位置移到前一列
            008
            \f
            换页(FF)，将当前位置移到下页开头
            012
            \n
            换行(LF) ，将当前位置移到下一行开头
            010
            \r
            回车(CR) ，将当前位置移到本行开头
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
            // 注意:区分，斜杠:"/" 与 反斜杠:"\" ,此处不可互换
            // 来源: 转义字符_百度百科
            // 先前我路径中的\t被自动转换成制表符了，所以读取不了目录，换成mytask就行了
            // 另外，也明白了看错误日志的重要性
            // nginx路径下的\logs\error.log就是错误日志，复制里面的内容去百度就行
            // 其他很多软件应该也是类似原理
            // 再次感谢老大~
            // 
            // PS:
            // 1、先前我口中的@19 师弟，原来是首席大师兄，失敬，失敬
            // 2、@苏哈哈 师兄补充的一条:#号是注释符号
命令提示符操作 
  命令提示符是在操作系统中,提示进行命令输入的一种工作提示符;
  在不同的操作系统环境下,命令提示符各不相同;
windows环境 
  PS:命令行程序为cmd.exe,是一个32位的命令行程序,
    微软Windows系统基于Windows上的命令解释程序,类似于微软的DOS操作系统。
    输入一些命令,cmd.exe 可以执行,比如输入shutdown -s就会在30秒后关机。
    打开方法:开始-所有程序-附件 或 开始-寻找-输入:cmd/cmd.exe 回车。
    CMD即命令提示符窗口[cmd.exe],是Windows的“标配”组件,
    它可以实现用户与操作系统的直接交流,并负责用户输入的所有命令的解释和支持。
    命令提示符进行的操作往往更具有专业性——实际上很多Windows中的操作只能通过命令来实现;
    在命令行中文件名不区分大小写;
  命令 快捷键 操作
    PS:
      命令码无大小写区分 (文件夹的名称也无大小写区分)     
    快捷键
      rightMouse        粘贴
      up/down           选择历史命令
      F7                显示命令历史记录
      Esc               清除当前命令行
      ctrl+c            强行中止命令执行
      ctrl+d            退出其他运行环境或推出命令行程序 
      alt+printScreen   截取当前命令窗[需在画板中粘贴]
      F9                按编号选择命令[从0开始] 
      ctrl+h            和删除backspace功能相同
      enter[选中文字下]  复制
    文件操作类
      cd XX      进入XX文件夹
        cd ./    当前文件夹
        cd ../   到上级文件夹
        cd /     到该磁盘的根目录
        cd \     到该磁盘的根目录
      <x>:       进入磁盘
        Example: : e:  进入到E盘 ;  c:  进入到c盘
      dir        列出目录下的所有文件
      mkdir      创建文件夹
      <fileName> 运行/打开该文件[前提是可运行的程序、批处理文件等,可以不带格式后缀]
      type <fileName> 参看文件内容
      start <folderName> 打开文件夹
    命令行相关
      cls       清屏
    信息查看类
      winver    检查Windows版本
      ipconfig  显示当前的TCP/IP配置的设置值
        ipconfig /all:显示本机TCP/IP配置的详细信息；
        ipconfig /release:DHCP客户端手工释放IP地址；
        ipconfig /renew:DHCP客户端手工向服务器刷新请求；
        ipconfig /flushdns:清除本地DNS缓存内容；
        ipconfig /displaydns:显示本地DNS内容；
        ipconfig /registerdns:DNS客户端手工向服务器进行注册；
        ipconfig /showclassid:显示网络适配器的DHCP类别信息；
        ipconfig /setclassid:设置网络适配器的DHCP类别。
        ipconfig /renew “Local Area Connection”:更新“本地连接”适配器的由 DHCP 分配 IP 地址的配置
        ipconfig /showclassid Local*:显示名称以 Local 开头的所有适配器的 DHCP 类别 ID
        ipconfig /setclassid “Local Area Connection” TEST:将“本地连接”适配器的 DHCP 类别 ID 设置为 TEST        
      cmd       CMD命令提示符
        cmd.exe  完整写法
      Nslookup  IP地址侦测器
      netstat -an   (TC)命令检查接口
      nslookup      网络管理的工具向导
    打开应用类
      explorer     打开资源管理器
      calc         启动计算器
      mspaint      画图板
      write        写字板
      eudcedit     造字程序
      magnify      放大镜实用程序
      dvdplay      DVD播放器
      taskmgr      任务管理器
      devmgmt.msc  设备管理器
      diskmgmt.msc 磁盘管理实用程序
      notepad      打开记事本
      osk          打开屏幕键盘
      fsmgmt.msc   共享文件夹管理器
      narrator     屏幕“讲述人”
      Msconfig.exe 系统配置实用程序
      eventvwr     事件查看器
      charmap      启动字符映射表
      utilman      辅助工具管理器
      wiaacmgr     扫描仪和照相机向导[需要安装] 
      services.msc 本地服务设置
      certmgr.msc  证书管理实用程序
      compmgmt.msc 计算机管理
      sfc.exe      系统文件检查器
      perfmon.msc  计算机性能监测程序
      regedit.exe  注册表
      regedt32     注册表编辑器
      cleanmgr     垃圾整理
      wmimgmt.msc  打开windows管理体系结构[WMI]
      sigverif     文件签名验证程序
      wscript      windows脚本宿主设置
      mmc          打开控制台
      dxdiag       检查DirectX信息
      chkdsk.exe   Chkdsk磁盘检查
    其他待整理
      wupdmgr      windows更新程序
      winchat      XP自带局域网聊天
      mstsc        远程桌面连接
      mobsync      同步命令
      dcomcnfg     打开系统组件服务
      ddeshare     打开DDE共享设置
      shrpubw      创建共享文件夹
      syskey       系统加密,一旦加密就不能解开,保护windows xp系统的双重密码
      sfc /scannow windows文件保护
      tsshutdn     60 秒倒计时关机命令
      rononce -p   15 秒关机
      regsvr32 /u *.dll         停止dll文件运行
      regsvr32 /u zipfldr.dll   取消ZIP支持
      cliconfg      SQL SERVER 客户端网络实用程序
      conf          启动netmeeting
      odbcad32      ODBC数据源管理器
      logoff        注销命令
      net stop messenger   停止信使服务
      net start messenger  开始信使服务
git bash: 类似于Linux的命令行 
  命令 
    clear   清空输出 
    ls      相当于dir命令 
    ctrl+d  退出命令行 
    which <name>  查找程序的位置 
      如 which node ,which vue 
SVN 
  介绍、说明篇 
    下载网址 https://tortoisesvn.net/downloads.html
    介绍
      TortoiseSVN 是一个 Windows 下的版本控制系统 Apache™ Subversion® 的客户端工具。
      文件存储于一个中央版本库中。
      版本库就像一个常见的文件服务器,保存对文件和目录所有的改变。
      Subversion 是一个通用系统,可以管理任何类型的文件集,包括源代码。
    TortoiseSVN 的特性 
      外壳集成
        TortoiseSVN 无缝地整合进 Windows 的外壳(例如资源管理器)。
        即可以继续使用已经熟悉的工具,而且当需要版本控制功能时不用切换到不同的应用程序。
        而且并没有被限制在 Windows 资源管理器中; 
        TortoiseSVN 的右键菜单可以在很多其它文件管理器中以及标准 Windows 程序的 文件/打开 对话框中被调出。
        不过,TortoiseSVN 是专 门作为 Windows 资源管理器的扩展进行开发的。有可能在其它程序中整合的不那么完整,例 如重载图标可能不显示。
      重载图标
        每个版本控制的文件和目录的状态使用小的重载图标表示,可以让你立刻看出工作副本的状态。
      图形用户界面
        当你列出文件或文件夹的更改时,你可以点击任意版本查看提交注释。
        也可以看到更改过的文件列 表 - 只要双击文件就可以查看更改内容。
        提交对话框列出了本次提交将要包括的条目,每一个条目有一个复选框,所以你可以选择包括哪些 条目。
        未版本控制的文件也会被列出,以防你忘记添加新文件。
      Subversion 命令的简便访问
        PS:TortoiseSVN 是一个 Subversion 客户端,包含一些 Subversion 本身的特性:
        所有的 Subversion 命令存在于资源管理器的右键菜单,TortoiseSVN 在那里添加子菜单。
        目录版本控制
          CVS 只能追踪单个文件的历史,
          但是 Subversion 实现了一个“虚拟”文件系统,可以追踪整个目 录树的修改,文件和目录都是版本控制的,
          结果就是可以在客户端对文件和目录执行移动和复制命
          令。
        原子提交
          提交要么完全进入版本库,要么一点都没有,这允许开发者以一个逻辑块提交修改。
        版本控制的元数据
          每个文件和目录都有一组附加的“属性”,你可以发明和保存任意的键/值对,
          属性是版本控制 的,就像文件内容。
        可选的网络层
          Subversion 在版本库访问方面有一个抽象概念,
          利于人们去实现新的网络机制,Subversion 的“高级”服务器是 Apache 网络服务器的一个模块,
          使用 HTTP 的变种协议 WebDAV/DeltaV 通讯,这给了 Subversion 在稳定性和交互性方面很大的好处,
          可以直接使用服务器的特性,例如认 证、授权、传输压缩和版本库浏览等等。
          也有一个轻型的,单独运行的 Subversion 服务器,这个 服务器使用自己的协议,可以轻松的用 SSH 封装。
        一致的数据处理
          Subversion 使用二进制文件差异算法展现文件的区别,
          对于文本(人类可读)和二进制(人类不可 读)文件具备一致的操作方式,
          两种类型的文件都压缩存放在版本库中,差异在网络上双向传递。
        高效的分支和标签
          分支与标签的代价不与工程的大小成比例,
          Subversion 建立分支与标签时只是复制项目,使用了 一种类似于硬链接的机制,
          因而这类操作通常只会花费很少并且相对固定的时间,以及很小的版本 库空间。
    命令、名词解释
      提交:将本地文件同步到服务器上
      更新:将服务器上的文件同步到本地
  使用总结 
    提交之前先更新
    当更新时中途中断后,仓库会锁住,下次在执行更新时需先执行清理操作
GIT 分布式版本控制系统 
  介绍、说明 
    拉取:将服务器上文件同步到本地
    提交:将本地文件同步到本地库
    推送:将本地库文件同步到服务器端
  使用总结 
    通常的操作顺序为,提交、推送、拉取;
    在未进行提交而执行其他操作都有风险,如拉取会覆盖本地未提交的改变,推送无[提交的」更新
GitHub 
  GitHub 
    名词解释 
      commit  版本,添加一个新版本 
      Merging 合并分支
      Pull Request 发起讨论
      collaborators 协作者
      wiki 
      issues 事务卡片
      GitHub Pages 项目展示为网站
    网页上的快捷键 
      t    搜索文件
  命令行 
    PS:需进入到当前仓库对应的文件夹进行相应的操作 
      命令之前都需要加'git'命令[之间使用空格隔开」
    help   查看git的使用帮助[git命令」
    clone  将远端仓库克隆到本地形成本地仓库
      默认克隆在当前文件夹
      Example: git clone https://github.com/hk029/hello-world.git
    init   在本地创建一个新的本地仓库
    add    添加文件到本地仓库
    mv     移动或重命名文件
    rm     移除文件
    commit 提交更新到本地仓库
    pull   将远端仓库同步到本地仓库
    push   将本地仓库同步到远端仓库
PhotoShop 
  界面设置
    新建 设置 初始化
      新建(快捷键Ctrl+N)
      预设:自定义
      宽度:1920(像素)
      高度:2000(像素)
      分辨率:72(像素/英寸)(现在比较常用的)
      背景内容:透明
        PS:可将上述设置设定为 存储预设
        
    设置
      通过新建设置 单位为pixels 背景设置为透明 并储存预设,设为默认的新建样式.
      在 信息 栏选项中更改其显示的单位为像素
      图像-首选项-单位与标尺 设置单位为像素
    
      视图-工作区-新建工作区 保存自己自定义后的界面环境,方便环境的切换.
        
    移动工具设置
      移动工具 快捷键 V
      默认设置为选择的是图层
      
    视图设置
      视图-显示-智能参考线 勾选
      打开 视图-标尺  快捷键:Ctrl+R
      窗口 取消勾选(web切图一般不用的) 库、颜色
        打开  信息、字符
  基本操作
    选区工具 快捷键M
    缩放  Alt+滚轮
    移动  空格+左键
    套索工具  L
  参考线
    隐藏参考线   Ctrl+;
  切片
    根据图层来切片
      将背景切下
        选中该图层-图层菜单-新建基于图层的切片
      只将图案切下(背景为透明)
        选中图层-在右边的图层列表中 右键-编辑图层(若没有则创建智能对象)
        打开新窗口-文件-储存为web所用格式 [快捷键 Ctrl+Shift+S]
  图片周围有光晕
    设置PS中的matte,蒙版或杂边属性,将其设置为和图片相接的背景色.
  快捷键
    标尺————Ctrl+R
    后退一步————Ctrl+Z+Alt
    前进一步————Ctrl+Z+Shift
    根据图层选区————Ctrl+左键在图层栏中选中图层
    取消选区————Ctrl+D(或者使用选区工具)
Zeplin 
  标注与线上协作平台,不同平台的设计师和开发者沟通起来更加轻松便捷
----------------------------------------------------------------------以下待整理
