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
    path  项目目录名称 
    id    应用包名,采用反域名命名规则,全部使用小写字母 
      PS: Android程序的安装是以包名'package name'进行区分的,即同样的包名会被认作是同一个程序。
        这样就可以进行升级、替换。但是包名是一个可以被查看的字符串,这样就可能被伪造,
        然后其他人就可以自己创建一个应用去替代你的应用。
        而签名就是为了防止这样的情况发生,当你的程序被签名后安装,
        只有同样包名与签名的程序才能被替换安装。
        而签名是不可能简单被伪造的,从而保证了程序的安全性。 
      一级包名为com,二级包名为xx[可为公司或个人等等], 
      三级包名根据应用进行命名,四级包名为模块名或层级名 
    Example:  
      cordova create demo1 com.aoo.boo appOne  
  2 构建平台管理:  
  $ cordova platform add --save <platform>     // 添加开发平台
    PS: --save 表示将保存在 config.xml 配置文件中 
    android 
    ios
    blackberry 
    browser    // 一般是用于开发阶段调试 
    ...
    指定版本,如 android@4.2.0 
    Example: cordova platform add android --save
  $ cordova platform remove  --save <platform> // 移除开发平台 
  $ cordova platform ls  // 枚举已添加的平台  
  $ cordova requirements // 检测是否满足构建平台的要求 
  3 测试 
  $ cordova emulate <android> // 在模拟器上运行[前提是创建好AVD]
  $ cordova run <android>     // 打包并在手机上测试App 
  $ cordova serve <android>   // 在浏览器运行
  4 打包 
    PS: Android打包分'debug'和'release'两种版本,'release'是用来发布到应用商店的版本 
      默认打包的为debug版本,而release版本需开发者自己生成证书文件并签名 
    sign,为APK签名 
      PS: debug和release版本都须数字签名后才能安装到设备上 
      签名需对应的证书'keystore',通常APK都采用的自签名证书,即自己生成证书给应用签名 
    // 生成签名证书文件'.keystore',该文件只需要生成一次,以后每次sign都需使用   
    $ keytool -genkey -v -keyalg RSA -keysize 2048 -keystore <keystore> -alias <alias> -validity <num>  
      PS: 过程中会要求设置'keystore'和'key'的密码,待后续使用  
        使用keytool生成私钥[证书],keytool位于JDK中的bin目录中 
        windows下,git bash 中使用存在bug,最好在cmd中使用
      -genkey   表示执行的是生成数字证书操作
      -v        将生成证书的详细信息打印出来 
      -keyalg RSA    采用RSA算法  
      -keysize 2048  生成2048位密钥对 
      -keystore <keystore>  生成的证书及其存放路径,默认命令行打开的目录 
      -alias <alias>        证书的别名 
      -validity <num>       证书的有效期天数  
      Example: 
      $ keytool -genkey -v -keyalg RSA -keysize 2048 -keystore k1.keystore -alias k2 -validity 10000   
    方式一: 通过先生成未签名的release版然后再签名 
      $ cordova build android --release // 构建未签名的release版本 
        生成'android-release-unsigned.apk'文件 
      // 使用生成的签名文件对未签名的release版本A签名 
      $ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore <keystore> <待签名的apk> <alias>  
        PS: 签名过程中需要先后输入 keystore 和 key 的密码 
          命令运行完后,APK就已经改变了,过程没有生成新文件,改名后即可发布了  
        -verbose 表示将签名过程中的详细信息打印出来 
        <keystore>  证书名 
        <alias>     证书别名 
    方式二: 直接使用签名证书来构建release版本 
      $ cordova build android --release -- --keystore="xxx.keystore" --alias=<alias> --storePassword=<pw1> --password=<pw2> 
    方式三: 使用构建配置文件'build.json'打包 
      PS: 安全性考虑,'release'中不要填写密码,build时会弹出窗口,提示输入密码 
      {
        "android": {
          "release": {
            "keystore": "./xxx.keystore"
            ,"storePassword": "xxx"
            ,"alias": "xxx"
            ,"password" : "xxx"
            ,"keystoreType": ""
          }
          ,"debug": {
            "keystore": "./xxx.keystore"
            ,"storePassword": "xxx"
            ,"alias": "xxx"
            ,"password" : "xxx"
            ,"keystoreType": ""
          }
        }
      }
      $ cordova build --release // 构建release版本   
      $ cordova build --debug   // 构建debug版本   
    方式四: 用Gradle配置打包 
      Gradle,一个Android的自动化构建工具,cordova build android 的过程其实就是使用它 
      在 platforms/android 目录下建立'release-signing.properties'文件,内容类似下面这样 
      storeFile=relative/path/to/keystore
      keyAlias=ALIAS_NAME
      storePassword=SECRET1
      keyPassword=SECRET2
      这个文件的名称和位置也是可以通过 Gradle 的配置 'cdvReleaseSigningPropertiesFile' 修改的
    // 用zipalign压缩和优化APK,优化后会减少app运行时的内存开销 
    $ zipalign -v 4 <待优化的APK> <优化后的apk> 
      zipalign.exe 位于SDK/build-tools/某一版本下 
      将需优化的apk复制到该目录,并执行以上命令 
      Example: 
      zipalign -v 4 android-release.apk xx.apk 
  $ cordova build // 构建所有添加的平台 
  $ cordova build android   // 构建debug版本的android应用 
  $ cordova run <platform> [options] // 打包并运行应用 
    options: 
      --devices 运行在真机上 
  $ cordova clean  // 清理项目
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
        <allow-navigation href="http://*/*" />
        <allow-navigation href="https://*/*" />
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
      <preference name="SplashMaintainAspectRatio" value="true" /> 
        设置为true的话,那么图片会适应手机分辨率,不会出现拉伸情况。
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
    load 
    deviceready 
    offline 
    online 
插件: 提供原生组件的JS接口  
  PS: 默认的,创建的Cordova项目不包含任何插件 
  命令行: 
    $ cordova plugin add --save <plug>  // 添加插件并保存 
      $ cordova plugin add --save cordova-plugin-statusbar  // 添加状态栏插件  
      $ cordova plugin add --save <git地址> // 从Git上添加plugin 
      $ cordova plugin add <path> // 添加自已开发的plugin,path为自已开发的plugin的保存目录 
    $ cordova plugin rm --save <plug>   // 删除插件 
    $ cordova plugin ls // 枚举已安装的插件 
    $ cordova plugin update // 更新插件
  核心插件: Apache Cordova项目维护的一组插件 
    可让应用程序访问设备功能,比如：电源,相机,联系人等 
  插件枚举: 
  cordova-plugin-inappbrowser 
    var ref = cordova.InAppBrowser.open('http://apache.org', '_blank', 'location=yes'); 
  cordova-plug-file-transfer 
  cordova-plugin-camera   // 相机插件 
  cordova-plugin-console  // 调试控制台Console 
    让程序可以在控制台中打印输出日志 
  splash 
    navigator.splashscreen.show();
    navigator.splashscreen.hide();
  cordova-plugin-splashscreen 更改app图标 
    1 首先下载插件
    cordova plugin add cordova-plugin-splashscreen
    2 在config.xml 文件中添加下面的内容
    <platform name="android">
    <!-- you can use any density that exists in the Android project -->
    <splash src="res/screen/android/splash-land-hdpi.png" density="land-hdpi"/>   注意这里的density分别指的是不同手机的分辨率,不同分辨率的手机采用的而logo大小是不一样的
    <splash src="res/screen/android/splash-land-ldpi.png" density="land-ldpi"/>
    <splash src="res/screen/android/splash-land-mdpi.png" density="land-mdpi"/>
    <splash src="res/screen/android/splash-land-xhdpi.png" density="land-xhdpi"/>
    
    <splash src="res/screen/android/splash-port-hdpi.png" density="port-hdpi"/>
    <splash src="res/screen/android/splash-port-ldpi.png" density="port-ldpi"/>
    <splash src="res/screen/android/splash-port-mdpi.png" density="port-mdpi"/>
    <splash src="res/screen/android/splash-port-xhdpi.png" density="port-xhdpi"/>
    </platform>
    
    <platform name="ios">
    <!-- images are determined by width and height. The following are supported -->
    <splash src="res/screen/ios/Default~iphone.png" width="320" height="480"/>
    <splash src="res/screen/ios/Default@2x~iphone.png" width="640" height="960"/>
    <splash src="res/screen/ios/Default-Portrait~ipad.png" width="768" height="1024"/>
    <splash src="res/screen/ios/Default-Portrait@2x~ipad.png" width="1536" height="2048"/>
    <splash src="res/screen/ios/Default-Landscape~ipad.png" width="1024" height="768"/>
    <splash src="res/screen/ios/Default-Landscape@2x~ipad.png" width="2048" height="1536"/>
    <splash src="res/screen/ios/Default-568h@2x~iphone.png" width="640" height="1136"/>
    <splash src="res/screen/ios/Default-667h.png" width="750" height="1334"/>
    <splash src="res/screen/ios/Default-736h.png" width="1242" height="2208"/>
    <splash src="res/screen/ios/Default-Landscape-736h.png" width="2208" height="1242"/>
    </platform>
    
    <platform name="windows">
    <!-- images are determined by width and height. The following are supported -->
    <splash src="res/screen/windows/splashscreen.png" width="620" height="300"/>
    <splash src="res/screen/windows/splashscreenphone.png" width="1152" height="1920"/>
    </platform>
    
    <platform name="blackberry10">
    <!-- Add a rim:splash element for each resolution and locale you wish -->
    <!-- http://developer.blackberry.com/html5/documentation/rim_splash_element.html -->
    <rim:splash src="res/screen/blackberry/splashscreen.png"/>
    </platform>
    
    <preference name="SplashScreenDelay" value="10000" />//这个值表示这个图标显示10000毫秒后消失。
  cordova-plugin-crosswalk-webview  使用chromium代替默认的webview 
    $ cordova plugin add --save cordova-plugin-crosswalk-webview 
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
        放在<platform>节点下则表示仅对该平台生效 
        示例：
        <asset src="www/foo.js" target="foo.js" />
      src      plugin开发目录下准备复制的源文件,目录路径相对于 plugin.xml 文件
      target   拷贝到www目录下的目标文件,目录路径相对于www目录 
      <js-module> 每个<js-module>定义一个该plugin的js文件
        一般为plugin接口注册的js文件,
        cordova建立工程时,会复制文件到'www/plugins/my.plugin.id'目录下,
        并且在'www/cordova_plugins.js'文件中添加对该js文件的声明 
        在启动时,cordova.js 中会将这些js文件通过<script>插入到HTML页面中 
        如果<js-module>嵌入在<platform>下,则仅对该平台生效 
        src      plugin的js源文件名称,目录路径相对于 plugin.xml 文件,
          拷贝目的路径为：www/plugins/your-plugin-id/
        name     js模块的末尾名称,仅用于 cordova.require 语句导入js代码时 
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
        <platform>内的主要为各平台下plugin的具体实现文件 
        name：平台名称,可选择android、ios等
        <source-file>  需要安装的源代码文件
          src：源文件,文件目录相对于plugin.xml
          target-dir：拷贝目录,相对于cordova项目的根目录,如com.alunny.foo包中目录为com/alunny/foo 
          示例1：
          <source-file src="src/android/Foo.java" target-dir="src/com/alunny/foo" />
        <config-file>  用于在XML文件中追加配置项
          target 目标文件,路径相对于cordove工程的目录 如果文件不存在,则该配置会被忽略 
          如果指定*,则工程目录下所有子目录都被搜索, 直到找到第一个匹配的文件 
        parent：XPath格式的XML中父结点名称,配置内容会添加在这个父结点下 可以使用*来指定的根节点,例如'/*/plugins'
        after：指定当前配置添加在哪个兄弟节点后面 
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
        <config-file>中还可以为android平台添加权限配置 
        示例4：
          <config-file target="AndroidManifest.xml" parent="/*">
              <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
          </config-file>
        <lib-file>为工程添加lib库的引用 
        示例：
          <lib-file src="src/BlackBerry10/native/device/libfoo.so" arch="device" />
        src：库文件名称,目录相对于plugin.xml文件 
        arch ：库文件编译时的系统架构,可以是device、simulator、x86、x64、ARM
        <resource-file>为工程添加资源文件,如layout xml文件 
        src：源文件,目录相对于config.xml文件 
        target：目标文件,目录相对于android工程根目录 
        示例：
        <resource-file src="src/android/java/activity_preview.xml" target="res/layout/activity_preview.xml" />
vue-cordova项目,基于vue的cordova项目 
  自我配置: 
    先创建基于webpack的vue项目 
    然后在根目录创建cordova项目 
    将cordova项目的'/www/index.html'中所有<meta>拷贝到vue项目的'/index.html'中 
    将cordova的'/www/index.html'中关于'cordova.js'的<script>拷贝到vue的'/index.html'中 
      方式一: 直接在vue项目的入口 index.html 中插入 <script> 
      方式二: 通过vue项目的入口'/src/main.js'中插入 
        var cordovaScript = document.createElement('script')
        cordovaScript.setAttribute('type', 'text/javascript')
        cordovaScript.setAttribute('src', 'cordova.js')
        document.body.appendChild(cordovaScript)
    在webpack中修改打包的配置文件'./config/index.js' 
      build: {
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        ...
      }
      修改为: 
      build: {
        index: path.resolve(__dirname, '../cordova/www/index.html'),
        assetsRoot: path.resolve(__dirname, '../cordova/www'),
        assetsSubDirectory: 'static', ? 
        assetsPublicPath: '',
        productionSourceMap: true,
        ...
      }
  vue-cordova 插件,在Vue中使用 Vue.cordova 来管理插件和监听事件 ? 
    $ npm i --save vue-cordova // 安装 
    // main.js 中 
    import VueCordova from 'vue-cordova' 
    Vue.use(VueCordova) 
    console.log(Vue.cordova);
    使用: 
    // listen to Cordova event
    Vue.cordova.on('deviceready', () => {
      console.log('Cordova : device is ready !');
    });
    Vue.cordova.plugins 查看可用的插件 
    // 使用 ordova-plugin-camera 插件
      // Cordova Camera Plugin’s API is made available in Vue.cordova.camera, including methods and global options.
      // Install
      // cordova plugin add cordova-plugin-camera
    Vue.cordova.camera.getPicture((imageURI) => {
      window.alert('Photo URI : ' + imageURI)
    }
    ,(message) => {
      window.alert('FAILED : ' + message)
    }
    ,{
      quality: 50,
      destinationType: Vue.cordova.camera.DestinationType.FILE_URI
    })
  插件初始化 
    首次插件调用是没有任何问题的,但再重新打开时App已经存在数据,
    所以会直接进入页面,但是由于插件初始化需要一定的时间,如果进来就立即调用插件,会提示找不到这个插件
    解决办法为：在插件初始化成功之后再初始化VUE相关的东西,
    插件初始化成功会触发deviceready,这个时候再初始化app,就没有这个问题了
  示例代码：
  document.addEventListener('deviceready', () => {
    new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      data: {
        eventBus: new Vue(),
      },
      components: {App}
    })
  })
  







