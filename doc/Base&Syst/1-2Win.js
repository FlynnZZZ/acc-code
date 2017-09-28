Windows命令行: 类似于Linux的shell  
  PS: 命令行程序为'cmd.exe',一个32位的命令行程序,
    实际上很多Windows中的操作只能通过命令来实现;windows命令行中文件名不区分大小写;
命令 快捷键 操作
  快捷键 
    鼠标右键     粘贴
    up/down     选择历史命令
    F7          显示命令历史记录
    Esc         清除当前命令行
    ctrl+c      强行中止命令执行
    ctrl+d      退出其他运行环境或推出命令行程序 
    F9          按编号选择命令[从0开始] 
    ctrl+h      和删除backspace功能相同
    alt+printScreen   截取当前命令窗[需在画板中粘贴]
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
    ping <域名>   查询IP地址  
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
  系统控制类 
    shutdown -s   30 秒后关机 
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
