Cordova: 一个移动开发框架 
  PS: CDV提供了一组设备相关的API,通过这组API,移动应用能够以JS访问原生的设备功能 
  Hybrid: 将HTML、CSS、JS封装为原生APP 
Cordova CLI: 
开发环境搭建: 
  $ npm i -g cordova // 安装Cordova 
    可能需要配置环境变量  
  $ cordova create <project> <com.hello.world>  // 创建Cordova项目
  $ cordova platform add <platform> --save    // 添加开发平台
    android 
    ios
    blackberry 
    ...
    指定版本,如 android@6.1.0 
  $ cordova platform remove <platform> --save // 移除开发平台 
  $ cordova platform ls  枚举已添加的平台  
  $ cordova plugin add <plug> --save // 添加插件
    $ cordova plugin add cordova-plugin-statusbar --save // 添加状态栏插件  
  $ cordova plugin ls // 枚举已安装的插件 
  // 打包应用 
  $ cordova prepare android
  $ cordova build android 
  $ cordova clean  // 清理项目












