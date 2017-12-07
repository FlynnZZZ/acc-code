SDK'Software Development Kit'软件开发工具包
JDK'Java Development Kit',Java语言的软件开发工具包SDK 
  JDK是java开发的核心,它包含了JAVA的运行环境[JVM+Java系统类库]和JAVA工具 
  没有JDK的话,无法编译Java程序 
开发环境搭建: 
  安装'Java JDK' 
    下载'Java JDK'进行安装[可改变安装路径]  
      将安装 jdk 和 jre 
      Self:分别安装到: 'D:/devkits/java/' 下 [开发工具目录]
    将JDK的bin目录添加到Path环境变量中 
    $ java -version // 版本信息 
  安装'Android SDK' 
    PS: 可单独安装,也可通过'Android Studio'安装 
    1 安装'Android Studio' 
      self: 
        安装studio到 'D:/devkits/android/studio'
        安装sdk到 'D:/devkits/android/sdk' 
    2 安装必要组件  
      在 SDK Manager 中进行相关选择安装  
    3 配置环境变量 
      ANDROID_HOME: sdk所在目录 
      'Path'中配置SDK的'tools'子目录和'platform-tools'子目录  











