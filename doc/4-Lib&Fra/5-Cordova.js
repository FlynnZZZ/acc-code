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
  $ cordova create <path> [id [name [config]]] [options] 
    Example:  cordova create demo1 com.aoo.boo appOne  
  2 构建平台管理:  
  $ cordova platform add <platform> --save    // 添加开发平台
    PS: --save 表示将保存在 config.xml 配置文件中 
    android 
    ios
    blackberry 
    browser    // 一般是用于开发阶段调试 
    ...
    指定版本,如 android@4.2.0 
    Example: cordova platform add android --save
  $ cordova platform remove <platform> --save // 移除开发平台 
  $ cordova platform ls  // 枚举已添加的平台  
  $ cordova requirements // 检测是否满足构建平台的要求 
  3 测试 
  $ cordova emulate <android> // 在模拟器上运行[前提是创建好AVD]
  $ cordova run <android>     // 打包并在手机上测试App 
  $ cordova serve <android>   // 在浏览器运行
  4 打包 
    // $ cordova prepare android // 打包应用 
  $ cordova build // 构建所有添加的平台 
  $ cordova build android   // 打包cordova项目到android平台  
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
      $ cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git 
      // 从Git上添加plugin的命令：
      $ cordova plugin add <path> // 添加自已开发的plugin,path为自已开发的plugin的保存目录 
    $ cordova plugin rm <plug> --save  // 删除插件 
    $ cordova plugin ls // 枚举已安装的插件 
  核心插件: Apache Cordova项目维护的一组插件 
    可让应用程序访问设备功能,比如：电源,相机,联系人等 
  插件枚举: 
  cordova-plugin-inappbrowser 
    var ref = cordova.InAppBrowser.open('http://apache.org', '_blank', 'location=yes'); 
  cordova-plug-file-transfer 
  cordova-plugin-camera 
  splash 
    navigator.splashscreen.show();
    navigator.splashscreen.hide();
  JS调用插件 
    采用NodeJS的CommonJS的模块方式
    var cordova = require('cordova'); //  声明cordova：
    // 也可以这样声明：在这种情况下,直接调用exe函数：
    // var exec = require('cordova/exec');
    cordova.exec(function(winParam) {
      // plugin接口调用成功后的回调函数
    }
    ,function(error) {
      // plugin接口调用失败后的回调函数
    }
    ,"service" // 服务名称,即为plugin.xml中config-file项下的feature项中的name 
      // <config-file target="res/xml/config.xml" parent="/*">
      // <feature name="service_name">
    ,"action"  // 方法名称,即为plugin的Java类中的exec函数里,识别的方法名称 
    // 传递给方法的参数,如果不需要参数,则输入“[]”,例如：
    ,["firstArgument", "secondArgument", 42, false]);
  plugin必备的文件
    一个plugin至少包含以下三部分内容：
    src         各平台的plugin实现代码
      android
      ios
      ..
    www         声明plugin的js接口 
      XXX.js
    plugin.xml  定义plugin的配置参数 
      Example:  
        <plugin xmlns="http://apache.org/cordova/ns/plugins/1.0" xmlns:android="http://schemas.android.com/apk/res/android" id="cordova-plugin-device" version="1.1.1">
          <name>Device</name>
          <description>Cordova Device Plugin</description>
          <license>Apache 2.0</license>
          <keywords>cordova,device</keywords>
          
          <js-module src="www/device.js" name="device">
            <clobbers target="device" />
          </js-module>
          
          <!-- android -->
          <platform name="android">
            <config-file target="res/xml/config.xml" parent="/*">
              <feature name="Device" >
                <param name="android-package" value="org.apache.cordova.device.Device"/>
              </feature>
            </config-file>
            <source-file src="src/android/Device.java" target-dir="src/org/apache/cordova/device" />
          </platform>
        </plugin>
      <plugin>  插件信息 
        xmlns   plugin的namespace,将添加到android工程的 AndroidManifest.xml 文件中 
        id      plugin的id,npm风格书写 
        version plugin的version
      <name>  plugin的名称
      <description> plugin的描述
      <author> plugin的作者
      <keyword> plugin的关键字
      <license> plugin的授权说明
      <asset>   该配置项下指定的文件将被拷贝到cordova的www目录,做为工程的一部分
        放在<platform>节点下则表示仅对该平台生效。
        示例：
        <asset src="www/foo.js" target="foo.js" />
      src      plugin开发目录下准备复制的源文件,目录路径相对于 plugin.xml 文件
      target   拷贝到www目录下的目标文件,目录路径相对于www目录 
      <js-module> 每个<js-module>定义一个该plugin的js文件
        一般为plugin接口注册的js文件,
        cordova建立工程时,会复制文件到'www/plugins/my.plugin.id'目录下,
        并且在'www/cordova_plugins.js'文件中添加对该js文件的声明。
        在启动时,cordova.js 中会将这些js文件通过<script>插入到HTML页面中 
        如果<js-module>嵌入在<platform>下,则仅对该平台生效。
        src      plugin的js源文件名称,目录路径相对于 plugin.xml 文件,
          拷贝目的路径为：www/plugins/your-plugin-id/
        name     js模块的末尾名称,仅用于 cordova.require 语句导入js代码时。
        clobbers 插入到windows对象的子属性或者方法,如上为 window.chrome.socket
 
        示例2：
        <js-module src="socket.js" name="Socket">
          <runs/>
          // runs：该js模块允许被 cordova.require 语句声明,但不能用于windows对象 
        </js-module>
      <dependency > 声明当前plugin需要其它plugin的支持 
        示例：
        <dependency id="cordova-plugin-someplugin" url="https://github.com/myuser/someplugin" commit="428931ada3891801" subdir="some/path/here" />
        <dependency id="cordova-plugin-someplugin" version="1.0.1">
      <platform > 针对具体平台的特别设置 
        <platform>外的配置主要针对js文件,它们将被安装在每个平台上,
        <platform>内的主要为各平台下plugin的具体实现文件。
        name：平台名称,可选择android、ios等
        <source-file>  需要安装的源代码文件
          src：源文件,文件目录相对于plugin.xml
          target-dir：拷贝目录,相对于cordova项目的根目录,如com.alunny.foo包中目录为com/alunny/foo。
          示例1：
          <source-file src="src/android/Foo.java" target-dir="src/com/alunny/foo" />
        <config-file>  用于在XML文件中追加配置项
          target 目标文件,路径相对于cordove工程的目录。如果文件不存在,则该配置会被忽略。
          如果指定*,则工程目录下所有子目录都被搜索, 直到找到第一个匹配的文件。
        parent：XPath格式的XML中父结点名称,配置内容会添加在这个父结点下。可以使用*来指定的根节点,例如'/*/plugins'
        after：指定当前配置添加在哪个兄弟节点后面。
        示例2：
          <config-file target="res/xml/config.xml" parent="/*">
              <feature name="Device" >
                  <param name="android-package" value="org.apache.cordova.device.Device"/>
              </feature>
          </config-file>
        <feature>定义plugin的接口类
        <feature "name"="">：plugin名称
        <param name>：为"android-package"
        <param value>：继承自CordovaPlugin类的接口类
        示例3,为activity添加filter：
           <config-file target="AndroidManifest.xml" parent="/manifest/application">
                <activity android:name="com.foo.Foo" android:label="@string/app_name">
                    <intent-filter>
                    </intent-filter>
                </activity>
            </config-file>
        <config-file>中还可以为android平台添加权限配置。
        示例4：
          <config-file target="AndroidManifest.xml" parent="/*">
              <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
          </config-file>
        <lib-file>为工程添加lib库的引用。
        示例：
          <lib-file src="src/BlackBerry10/native/device/libfoo.so" arch="device" />
        src：库文件名称,目录相对于plugin.xml文件。
        arch ：库文件编译时的系统架构,可以是device、simulator、x86、x64、ARM
        <resource-file>为工程添加资源文件,如layout xml文件。
        src：源文件,目录相对于config.xml文件。
        target：目标文件,目录相对于android工程根目录。
        示例：
        <resource-file src="src/android/java/activity_preview.xml" target="res/layout/activity_preview.xml" />
目录及文件说明:  
  hooks: 存放自定义cordova命令的脚本文件 
    每个project命令都可以定义before和after的Hook 
  platforms: 添加的平台 
  plugins: 引入的插件 
  res: 
    icon   不同平台的图标 
      可在 config.xml 中作为 <icon> 的图片地址 
    screen 不同平台的启动页图片 
      可作为 config.xml 中<splash> 的图片地址 
  www: 开发目录 
    index.html 项目主页 
  config.xml: 项目配置文件 
    version   版本号 
    <widget>  
      id  app的反转域名标识符 
      xmlns       config.xml 文件的 namespace 
      xmlns:cdv   namespace前缀 
      <name>    app名称,将显示在应用home屏上和appStore上 
      <description>  简述,将出现在appStore介绍中 
      <author>   开发者信息,包含联系方式 
      <content>  app启动页,默认www目录下 index.html 
      <access>   一组允许app访问的外部服务器地址,* 表示所有
      <allow-intent>  定义app向系统询问是否打开的URL地址 
      <platform>  指定平台参数,不同平台可显示不同效果 
        name   平台名称 
        <icon> 定义app图标 
          src="res/ios/icon.png"  图片文件位置,相对于项目根路径
          platform="android"      可选,目标平台
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
      <plugin>    相关插件 
      <allow-navigation href="http://*/*" />  在当前app中打开的超链接 
        Cordova中,超链接默认在系统浏览器打开网页,可通过该项进行设定链接的打开位置  
    <preference>  各种工程属性配置 
      <preference name="SplashShowOnlyFirstTime" value="false" />  是否每次启动都显示加载页 
      <preference name="ShowSplashScreenSpinner" value="false"/>   是否显示加载页进度条
      <preference name="FadeSplashScreen" value="false"/>      加载页消失时是否使用渐变 
        默认的splash消失时有渐变效果 
      <preference name="FadeSplashScreenDuration" value="1000"/> splash渐变时间控制 
      <preference name="Orientation" value="sensorLandscape" />  横竖屏 
        值为: default landscape portrait
      <preference name="Fullscreen" value="true" />   是否全屏 
      <preference name="DisallowOverscroll" value="true"/>   是否隐藏滚动条 
      <preference name="BackgroundColor" value="0xff0000ff"/>  背景色 
      <preference name="HideKeyboardFormAccessoryBar" value="true"/>
      <preference name="KeepRunning" value="false"/>
      <preference name="LoadUrlTimeoutValue" value="10000"/>
      <preference name="InAppBrowserStorageEnabled" value="true"/>
      <preference name="LoadingDialog" value="My Title,My Message"/>
      <preference name="ErrorUrl" value="myErrorPage.html"/>
      <preference name="ShowTitle" value="true"/>
      <preference name="LogLevel" value="VERBOSE"/>
      <preference name="AndroidLaunchMode" value="singleTop"/>
      <preference name="DefaultVolumeStream" value="call" />
      <preference name="OverrideUserAgent" value="Mozilla/5.0 My Browser" />
      <preference name="AppendUserAgent" value="My Browser" />
API 
  存储: 
    localStorage 同浏览器端 
    IndexedDB 
    WebSQL 
    相关插件: 未原生支持,但可通过插件来实现 
    FileSystem API 仅Chrome实现  [W3C规范]  
  事件 
    .addEventListener() 方法注册 
    ◆事件枚举: 
    ★'Lifecycle'生命周期
    Cordova事件  粗略的Android等效   含义
    deviceready  onCreate()        应用程序开始[不是从背景]
      只有该事件被调用后,才表示cordova其它各个接口可以使用 
      经常在该事件中注册其它事件的Listener 
    pause        onPause()         应用程序移动到背景时 
    resume       onResume()        应用程序返回到前景时  
    ★其他
    backbutton       用户点击退回按钮时被调用 
    menubutton       用户点击菜单按钮时被调用 
    searchbutton     用户点击搜索按钮时被调用 
    volumedownbutton 用户点击音量加按钮时被调用 
    volumeupbutton   用户点击音量减按钮时被调用 










