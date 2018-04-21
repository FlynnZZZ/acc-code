DefDec: 
  一款windows下的命令集合软件,可以集合各种系统下的命令,并且操作非常快速方便 
安装&使用: 
  两个版本: 简化版&完全版  
    完全版包含'git-for-windows'如果已经装了'git-for-windows'直接下载简化版即可  
  无安装文件,直接下载解压文件,运行'Cmder.exe' 
相关配置 
  配置环境变量,以便全局可使用 
  添加cmder到右键菜单 
    $ Cmder.exe /REGISTER ALL  // 添加到右键命令[需管理员权限打开命令行]
  ls命令支持中文 
    默认ls命令不支持中文
    win+alt+p打开设置面板,找到'Startup'-'Envrioment'选项
    在下面的文本框里添加一行: set LANG=zh_CN.UTF8
    然后重启cmder
    然后用ls命令查看目录下的文件,带中文的文件名都能正常显示了。
  修改命令提示符号 
    cmder默认的命令提示符是 λ ,如果想改成常见的 $ ,具体操作如下：
    打开cmder安装目录下的'\vendor\clink.lua'文件
    找到lambda = "λ"和lambda = "("..env..") λ"把λ替换成$
    然后重启cmder即可,
    但powerShell需要另行设置
    打开cmder安装目录下的'\vendor\profile.ps1'文件
    找到λ <PostPrompt> <repl input>和λ <PostPrompt> |
    和Microsoft.PowerShell.UtilityWrite-Host "`nλ " -NoNewLine -ForegroundColor "DarkGray"
    把λ替换成$ ,然后重启cmder即可
  自定义aliases 
    修改安装目录下的'\config\user-aliases.cmd'文件
    修改后的命令只能在cmd下有效,在powershell下无效 
    如: ..=cd ..  // ..返回上一级文件夹 
  powershell下自定义短命令 
    修改安装目录下的'vendor\profile.ps1'文件,添加相应代码
    如: /*
      // 输入 sbl 就可直接打开sublime
      Set-Alias sbl "C:\Program Files\Sublime Text 3\sublime_text.exe"
      // 输入gw 直接cd到我的mobile目录
      function go-Work {cd c:\mobile}
      Set-Alias gw go-Work 
      */
  设置cmder默认启动目录 
    win + alt + p   //  打开设置
    选择'Startup-Task'，修改 {cmd::Cmder} 项
    把: *cmd /k "%ConEmuDir%\..\init.bat"  -new_console:d:%USERPROFILE%
    修改成: cmd /k "%ConEmuDir%\..\init.bat"  -new_console:d:D:\
      D:\ 根据你自己需要自定义  
    重启 cmder 之后就可以看到 cmder 已经进入了刚刚设置的 D:\ 目录。 
    同样也可以修改打开cmder的时候进入的操作模式,cmder、PowerShell、bash 等等 
快捷键:  
  ctrl-w     // 关闭命令行窗口 
    
    