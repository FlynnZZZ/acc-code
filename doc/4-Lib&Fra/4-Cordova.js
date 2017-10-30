Cordova: 一个移动开发框架 
  PS: Cordova提供了一组设备相关的API,使应用能以JS访问原生的设备功能 
  Hybrid: 将HTML、CSS、JS封装为原生APP 
开发环境搭建: 
  PS: 前提为系统配置了Android开发环境 
  $ npm i -g cordova // 安装Cordova 
    可能需要配置环境变量  
    'C:\Users\<username>\AppData\Roaming\npm\node_modules\cordova\bin' 
Cordova CLI:  
  1 创建Cordova项目: 
  $ cordova create <PATH> [ID [NAME [CONFIG]]] [options] 
    Example:  cordova create demo1 com.aoo.boo appOne  
  2 构建平台管理:  
  $ cordova platform add <platform> --save    // 添加开发平台 
    android 
    ios
    blackberry 
    ...
    指定版本,如 android@6.1.0 
  $ cordova platform remove <platform> --save // 移除开发平台 
  $ cordova platform ls  // 枚举已添加的平台  
  2 插件管理: 
  $ cordova plugin add <plug> --save // 添加插件 
    $ cordova plugin add cordova-plugin-statusbar --save // 添加状态栏插件  
  $ cordova plugin ls // 枚举已安装的插件 
  3 应用打包&运行: 
  $ cordova prepare android // 打包应用 
  $ cordova build android // 打包应用 
  $ cordova run <platform> [options] // 打包并运行应用 
    options: 
      --devices 运行在真机上 
  $ cordova clean  // 清理项目
项目目录说明:  
  hooks: 
  platforms: 添加的平台 
  plugins: 引入的插件 
  res: 
  www: 开发目录 
  config.xml: 项目配置文件 
  在项目的 www 文件夹下进行开发 




  
  









