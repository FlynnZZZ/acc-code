Cordova: 一个移动开发框架 
  PS: Cordova提供了一组设备相关的API,使应用能以JS访问原生的设备功能 
  Hybrid: 将HTML、CSS、JS封装为原生APP 
开发环境搭建: 
  PS: 前提为系统配置了Android开发环境 
  $ npm i -g cordova // 安装Cordova 
    PS: 保证npm目录在环境变量中 'C:\Users\<username>\AppData\Roaming\npm' 
  设置模拟器: 
    PS: 在Android模拟器上面运行Cordova应用,需要一Android虚拟设备'AVD'
  $ cordova run --list // 运行并查看模拟器 
Cordova CLI:  
  1 创建Cordova项目: 
  $ cordova create <PATH> [ID [NAME [CONFIG]]] [options] 
    Example:  cordova create demo1 com.aoo.boo appOne  
  2 构建平台管理:  
  $ cordova platform add <platform> --save    // 添加开发平台
    PS: --save 表示将保存在 config.xml 配置文件中 
    android 
    ios
    blackberry 
    browser 
    ...
    指定版本,如 android@6.1.0 
  $ cordova platform remove <platform> --save // 移除开发平台 
  $ cordova platform ls  // 枚举已添加的平台  
  $ cordova requirements // 检测是否满足构建平台的要求 
  3 应用打包&运行: 
  $ cordova emulate android // 重新构建App并在特定平台的模拟器上查看 
  $ cordova run android // 将手机插入电脑,在手机上直接测试App 
  $ cordova prepare android // 打包应用 
  $ cordova build android // 打包应用 
  $ cordova run <platform> [options] // 打包并运行应用 
    options: 
      --devices 运行在真机上 
  $ cordova clean  // 清理项目
  应用签名: 
    签名一个应用需要下面参数:
      参数              标志              描述
      Keystore          --keystore       用来存储一组key的二进制文件路径
      Keystore Password --storePassword  keystore存储密钥
      Alias             --alias          用来指定私有key用来签名
      Password          --password       私有key的密码
      Keystore的类型    --keystoreType    默认:自动检测基于文件扩展名 pkcs12或者jks
    参数可通过 cordova build 或 run 命令来指定命令行参数 
      Example: 
      cordova run android --release -- --keystore=../my-release-key.keystore --storePassword=password --alias=alias_name --password=password.
    使用构建配置文件 build.json
      使用 --buildConfig 参数传递构建配置文件,并在其中指定参数 
      Example: 
      {
        "android": {
          "debug": {
            "keystore": "../android.keystore",
            "storePassword": "android",
            "alias": "mykey1",
            "password" : "password",
            "keystoreType": ""
          },
          "release": {
            "keystore": "../android.keystore",
            "storePassword": "",
            "alias": "mykey2",
            "password" : "password",
            "keystoreType": ""
          }
        }
      }
    对于发布签名,密码可以排除在外,构建系统将会发出提示要求输入密码 
插件: 提供原生组件的JS接口  
  PS: 默认的,创建的Cordova项目不包含任何插件 
  命令行: 
    $ cordova plugin add <plug> --save // 添加插件并保存 
      $ cordova plugin add cordova-plugin-statusbar --save // 添加状态栏插件  
    $ cordova plugin ls // 枚举已安装的插件 
  核心插件: Apache Cordova项目维护的一组插件 
    可让应用程序访问设备功能,比如：电源,相机,联系人等 
  插件枚举: 
  cordova-plugin-inappbrowser 
    var ref = cordova.InAppBrowser.open('http://apache.org', '_blank', 'location=yes'); 
  cordova-plug-file-transfer 
目录及文件说明:  
  hooks: 
  platforms: 添加的平台 
  plugins: 引入的插件 
  res: 
  www: 开发目录 
    在当前目录下进行开发,项目的主页是 www/index.html 文件
  config.xml: 项目配置文件 
    <widget>: 
      'android-versionCode': 设置生成APK的版本编码Version Code 
    <platform>/<icon>: 定义app图标 
      src="res/ios/icon.png"  图片文件位置,相对于项目根路径
      platform="ios"          可选,目标平台
      width="57"              可选,图片的像素宽度
      height="57"             可选,图片的像素高度
      density="mdpi"          可选,Android指定图标密度 
        可同时定义多个来适用不同的屏幕分辨率 
        <icon src="res/android/ldpi.png" density="ldpi" />
        <icon src="res/android/mdpi.png" density="mdpi" />
        <icon src="res/android/hdpi.png" density="hdpi" />
        <icon src="res/android/xhdpi.png" density="xhdpi" />
        <icon src="res/android/xxhdpi.png" density="xxhdpi" />
        <icon src="res/android/xxxhdpi.png" density="xxxhdpi" />
'Lifecycle'生命周期
  Cordova事件  粗略的Android等效   含义
  deviceready  onCreate()        应用程序开始[不是从背景]
  pause        onPause()         应用程序移动到背景 
  resume       onResume()        应用程序返回到前景 
其他功能: 
  存储: 
    localStorage 同浏览器端 
    IndexedDB 
    WebSQL 
    相关插件: 未原生支持,但可通过插件来实现 
    FileSystem API 仅Chrome实现  [W3C规范]  

  
  









