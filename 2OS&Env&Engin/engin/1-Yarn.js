Describe: 
  一个依赖管理工具
安装: 
  1 通过下载'.msi'文件进行安装 
  2 通过 npm 安装 
    $ npm i -g yarn  // 全局安装 yarn 
常用命令: 
  $ yarn init                   // 初始化一新项目 
  $ yarn add <packageName>      // 添加一个依赖包,并写入'package.json' 
    $ yarn add <packageName>@<version>
    $ yarn add <packageName>@<tag> 
  $ yarn upgrade <packageName>  // 更新一个依赖包
    $ yarn upgrade <packageName>@<version>
    $ yarn upgrade <packageName>@<tag>
  $ yarn remove <packageName>   // 删除一个依赖包
  $ yarn                        // 安装所有的依赖包
  $ yarn install                // 安装所有的依赖包 
文件说明:  
  'package.json': 记录了项目的所有依赖 
  'yarn.lock': 保存了项目的每个依赖的确切版本号 
  

