Linux 
  PS: Linux严格区分大小写 
文件&文件类型&文件信息  
  PS: Linux中所有内容以文件内容形式保存 
  不靠文件扩展名区分文件类型 
    但常用的约定扩展名:
    压缩包: '.gz'、'.bz2'、'.tgz'
    二进制软件包: '.rpm'
    脚本文件: '.sh'
    配置文件: '.conf' 
  文件信息表示 
    文件权限 文件链接数 文件所有者的用户名 用户组  文件大小 上次修改时间  文件/目录名 
    drwxr-xr-x   1         fsl          197121    0    Apr 15 23:17  node1/
    -rw-r--r--   1         fsl          197121  355    Apr 21 09:34  tmp.js
  文件权限信息: 默认为10位,如'-rwxr-xr-x'
    第一位表示文件类型: Linux中共7种 
      d 目录
      - 文件
      l 软链接文件,即超链接 
    后九位表示文件权限,三位一组共三组
      分别对应: 所属用户、 同组用户 、其他用户 对应的权限 
      'r'  可读
      'w'  可写
      'x'  可执行 
      '-'  无 
  修改用户权限: 
    chmod <user><+|-><limit> <fileName>  
      user    用户
        u   文件所有者 
        g   group,用户组
        o   其他用户 
        a   所有用户,即ugo的组合  
      +|-     增加|去除权限 
      limit   权限
        r
        w 
        x 
--------------------------------------------------------------------------------
Shell: 一种命令语言解释器'command-language interpreter' 
  PS: 用户和Linux内核之间的接口程序 
    在提示符下输入的命令由shell先解释然后传给Linux内核 
    shell也能被系统中其他有效的Linux实用程序和应用程序所调用 
    在成功地登录进入系统后shell启动,并始终作为与系统内核的交互手段直至退出系统 
    shell自身也是一个解释型的程序设计语言,支持在高级语言里所能见到的绝大多数程序控制结构,
    比如循环,函数,变量和数组,任何在提示符下能键入的命令也能放到一个可执行的shell程序里,
  命令的执行 
    命令分两种 
    内建的shell命令集: 包含在Linux bash内部的,比如打印当前工作目录命令'pwd' 
    其他命令: 比如拷贝命令'cp'和移动命令'rm',是存在于文件系统中某个目录下的单独的程序 
      这里的应用程序可以是Linux本身的实用程序,比如ls 和 rm,
      也可以是购买的商业程序,比如 xv,或者是公用软件（public domain software）,就象 ghostview。
      然后shell 试着在搜索路径($PATH)里寻找这些应用程序。
      搜索路径是一个能找到可执行程序的目录列表。
    shell 首先检查命令是否是内部命令,不是的话再检查是否是一个应用程序,
    如果你键入的命令不是一个内部命令并且在路径里没有找到这个可执行文件,将会显示一条错误信息。
    而如果命令被成功的找到的话,shell的内部命令或应用程序将被分解为系统调用并传给Linux内核。
  常用的shell: 
    Linux和UNIX系统里可使用多种不同的shell 
    最常用的几种是'Bourne shell'sh,'C shell'csh,和'Korn shell'ksh, 
    'tcsh'[csh 的扩展],'bash'[sh的扩展],和'pdksh'[ksh的扩展];
  Bash: 大多数'Linux'及'Mac OS X'系统默认的shell 
  特性: 
    'Command-Line Completion'命令补齐: 使用tab主动补全 
    'Job Control'作业控制: 控制当前正在运行的进程的行为 
      PS: 当一个命令在前台被运行时,它会禁止用户与shell的交互,直到该命令结束
        如果要运行的命令要花费很长的时间的话,通常会把它放到后台,以便能在前台继续输入其他命令
      ctrl-z 使一个运行的进程挂起
      bg 命令使一个被挂起的进程在后台恢复运行 
      fg 命令使进程在前台恢复运行 
      Example: 
        control-z  // 使命令挂起 
        bg         // 后台运行 
    提示符: Bash有两级用户提示符
      第一级提示符: 待命令输入时的提示符,默认为'$',若为超级用户则是'#'
        PS1="xx"  // 将一级提示符改为指定字符串  
      第二季提示符: 当bash期待输入更多的信息以完成命令时显示第二级提示符
        缺省的第二级提示符是'>' 
        PS2="xx"  // 将二级提示符改为指定字符串   
      定义提示符,最常用的特殊字符:  
        \$       显示$符作为提示符,如果用户是root的话,则显示#
        \!       显示该命令的历史记录编号
        \#       显示当前命令的命令编号
        \h       显示主机名 
        \u       显示当前用户的用户名 
        \W       显示当前工作目录的名字 
        \w       显示当前工作目录的路径 
        \d       显示当前日期 
        \t       显示当前时间 
        \s       显示当前运行的shell的名字 
        \/       显示反斜杠 
        \n       打印新行 
        \nnn     显示nnn的八进制值 
    通配符: 支持的三种通配符 
      *      匹配任何字符和任何数目的字符
      ?      匹配任何单字符
      [...]  匹配任何包含在括号里的单字符 
        [123] 或 [1-3] 表示数字'1''2''3'中的一个
    Bash变量: 
      PATH       bash寻找可执行文件的搜索路径
      PWD        当前工作目录
      HOME       当前用户的用户目录
      SECONDS    当前shell开始后所流逝的秒      
      OLDPWD     前一个工作目录
      PS1        命令行的一级提示符
      PS2        命令行的二级提示符
      EDITOR, FCEDIT  bsah fc 命令的缺省编辑器 
      HISTFILE        用于贮存历史命令的文件 
      HISTSIZE        历史命令列表的大小
    Bash初始化文件配置: Bash在每次启动时都读取这个文件,并执行所有包含的命令 
      Windows中,在'./Git/etc/bash.bashrc'文件中写入,进行永久别名配置 
        alias xx1='xxx1'
        alias xx2='xxx2'
命令 
  "~"表示home目录 
  "<"输入重定向 
  '>'覆盖式输出重定向 
    可将输入的内容放置到文件中,文件不存在会默认创建  
    会将之前的内容覆盖掉 
    可把一个命令的输出当作另一个命令的输入[更简单的方法是使用管道]
    Example:
      ls > directory.out //  把ls命令的输出保存为'directory.out'的文件 
      echo hello a.txt   //  向 a.txt 中写入 hello
  '>>'追加式输出重定向 
    不会将之前的内容覆盖掉,而是新增一行进行追加 
  '|'管道 
    可把一系列命令连接起来,将上一个命令的输出通过管道传给下一个命令的输入
    最终输出的结果为管道行中最后一个命令的输出 
    Example: 
      cat sample.text | grep "High" | wc -l  // 返回文件中,有'High'的行数 
      // cat <filename>   列出一个文件的内容
      // grep <str>    列出存在str的所有行
      // wc -l         统计输入里的行数 
  ``执行命令 
    $ echo pwd   // 表示输出pwd字符 
    $ echo `pwd` // 将当前目录输出,相当于 $ pwd | echo  
  历史操作 
    history   以列表形式显示所有历史命令 
    history <num> 仅有最后num个历史命令会被列出 
    history [-r|w|a|n] [<filename>] 
      -r  读命令历史列表文件的内容并且把它们当作当前的命令历史列表
      -w  选项将把当前的命令历史记录写入文件中并覆盖文件原来的内容
      -a  选项把当前的命令历史记录追加到文件中
      -n  选项将读取文件中的内容并加入到当前历史命令列表中
      filename 默认用变量 HISTFILE 的值来代替  
    fc [-e editor_name] [-n] [-l] [-r] [first] [last] 编辑历史命令 
      -e editor_name   指定用于编辑命令的文本编辑器 
        默认以变量FCEDIT的值来代替,如果该变量不存在的话,则用变量EDITOR的值来代替,都不存在的话将使用vi编辑器
      first 和 last   用于选择列出历史命令的范围,既可以是数字也可以是字符串
      -n   选项禁止列出命令的编号。
      -r   选项反向列出匹配的命令。
      -l   选项把匹配的命令行列在屏幕上,而不是在编辑器中 
  别名 
    alias   显示已定义的别名 
    alias <xx>=<'xxx'>  定义临时别名,使用xx来代替'xxx'[退出bash后失效] 
      在定义别名时,等号的两头不能有空格,当命令中包含有空格或特殊字符时需要引号 
      若定义的别名和原本的命令名字相同,可使用 \<command> 来执行原原命令 
    unalias <xx>  取消xx临时别名 
  快捷键 
    ctrl-d  退出命令行 
    ctrl-c  终止运行  
    ctrl-l  清屏 
  命令行 
    $ clear   清空命令行输出 
    $ curl -X? <url>  在命令行中显示根据URL获取到的网页内容 
      -X   可选,用于指定请求使用的方法,默认: GET 
        curl -X POST https://www.baidu.com  // 通过 -X 指定使用请求的方法 
    $ echo <xx>   在命令行显示 
      str  直接显示 
      $PATH  显示环境变量 
    $ export 使变量的值对当前shell的所有子进程都可见 。
    $ help   显示bash内部命令的帮助信息。
    $ kill   终止某个进程
  文件相关操作 
    $ pwd     // 查看当前完整路径 
    $ env     // 查看所有环境变量 
    $ cd <xx> // 进入目录 
      $ cd /   进入根目录 
      $ cd ~   进入当前用户home目录 
      $ cd     进入当前用户home目录 
      $ cd ..  进入上级目录 
      $ cd .   进入当前目录 
      $ cd -   进入上次目录 
    $ ls [<options>] [<name>]  // 查看文件夹的文件 
      options  配置项 
        -a  --all,查看所有文件,包括隐藏文件 
        -l  显示详细信息 
        -d  查看目录属性 
        -h  人性化显示文件大小 
        -i  显示inode,文件的id号  
        组合使用:   
          ls -hl 等价于 ls -h -l 
      name  目录/文件名,默认为当前目录 
      $ ll  即 $ ls -l 的别名 
    $ mkdir [-p] [<name>]      // 创建文件夹 
      -p  递归创建 
        Example: $ mkdir -p a/b   // 在当前目录下创建目录'a/b'两级目录 
    $ rmdir <dirName>          // 删除空白目录 
    $ touch <fileName>         // 新建文件
      如果新建的文件存在,则更新该文件的创建时间 
    $ rm [<options>] <name>    // 删除文件/目录  
      options 
        -f   强制执行不用确认  
        -r   删除目录 
      Example: 
        $ rm -rf <path>   // 删除目录及其里面的所有文件  
    $ cp [<options>] <sourceFile> [<finalPath>] // 复制文件 
      options 
        -r  用于复制目录 
          Example: $ cp -r dir1 dir2 // 将 dir1 目录复制到当前目录下并改名为 dir2 
        -p  待文件属性复制 
        -d  若源文件是链接文件,则复制链接属性 
        -a  相当于 -pdr 
      Example: 
        cp a.txt b.txt // 将 a.txt 复制到当前目录并改名为 b.txt 
    $ mv <sourcePath> <finalPath>      // 剪切/重命名 
    $ cat <fileName>           // 显示文件内容 
    $ tac <fileName>           // 以行为单位,倒序显示文件内容 
    $ nl <fileName>            // 显示文件内容,并加上行号 
    $ more <fileName>          // 分批查看文件内容 
    $ less <fileName>          // 分批查看文件内容 
    $ head <fileName>          // 查看文件前10行 
      可通过指定 -n <num> 来指定查看前num行 
        $ head -n 20 tmp.js  // 查看文件的前20行 
    $ tail <fileName>          // 查看文件后10行 
      $ tail -n 20 tmp.js  // 查看文件的后20行 
    $ locate <fileName>        // 搜索文件 
    $ ln [-s] <sourceFile> <finalFile> // 创建链接文件 
    $ updatedb     // 更新数据库 
  执行程序 
    which <name>  // 查看程序位置 
      如 which node ,which vue 
    where <name>  // 查看程序位置 
      如 where node 
    <atom> <path>  // 用Atom打开文件夹 
    $ kill <pid> // 杀掉进程 
  信息查询 
    $ whoami  当前使用者用户名 
    $ find <搜索范围> [<options>] <搜索条件>  完全匹配搜索 
      options 
        -name   按文件名称搜索 
        -iname  按文件名称且不区分大小写搜索 
        -user   有所有者的文件  
        -nouser 无所有者的文件  
        -atime 
        -atime <num>  访问文件 
        -ctime <num>  改变文件属性 
        -mtime <num>  修改文件内容 
          find /a/b  -mtime +10 查找10天前之前修改过的文件 
          find /a/b  -mtime 10  查找10天前当天修改的文件 
          find /a/b  -mtime -10 查找10天前到现在修改的文件
        -size <size>  根据文件大小修改 
          $ find . -size -25k   在当前文件夹下查找文件小于25k的文件 
          $ find . -size 25k    在当前文件夹下查找文件大小为25k的文件 
          $ find . -size +25k   在当前文件夹下查找文件大于25k的文件 
        -inum <num>   根据i节点来查找 
    $ uname <options> // 操作系统相关信息 
      options 
        -r  内核信息 
        -a  详细信息 
    $ grep <str>  // 查询包含指定字符的项 
    $ ps   // 查看进程 
  逻辑符号 
    -a  逻辑与
    -o  逻辑或 
--------------------------------------------------------------------------------
VMware: 一虚拟PC软件,可在现有的操作系统上虚拟出一个新的硬件环境 
  8.0 版本 


































