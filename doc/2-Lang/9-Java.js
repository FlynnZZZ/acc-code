JDK环境变量配置
  JDK与jre
    JDK为java的开发环境,jre为java的运行环境‹包含javac编译程序、java、javaw、javadoc›,
    一般情况下,JDK中包含jre‹即主要两个运行程序java、javaw›
  path 路径
    需指定到JDK安装的bin目录,用于快速找到 Java.exe 及 javac.exe 程序
      javac用于编译,java用于运行 
  classpath 路径
    用于指定java编译后的文件‹类文件›的路径.当运行类文件时,即先从classpath路径中寻找该文件,
      路径可配置多个,路径配置完成后需添加分号(否则寻找的路径只在配置的路径中找)
  java_home JDK的主目录
    指定JDK的主目录的路径即可
  注:以上配置均为路径的配置,即将路径复制到其值中即可,不同路径间使用分号隔开 






















