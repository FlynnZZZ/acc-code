Weex: 一套简单易用的跨平台开发方案,以web的开发体验构建高性能、可扩展的native应用 
  使用Vue作为上层框架,并遵循W3C标准实现了统一的 JSEngine 和 DOM API,
  甚至可使用其他框架驱动 Weex,打造三端一致的 native 应用 
  不需考虑安装开发环境或编写 native 代码,只需要做下面两件事：
    为手机安装 Playground App,也可以使用浏览器进行预览 
    在新标签页中打开 Hello World 例子,点击预览,然后用 Playground 扫码即可 
weex-toolkit: 官方提供的脚手架命令行工具,可进行Weex项目创建、调试及打包等 
  $ npm i -g weex-toolkit  // 安装 weex-toolkit 
    $ weex -v // 查看当前weex版本 
  $ weex init <dirName>    // 初始化weex项目 
    // $ weex create <dirName>  // 创建项目 
  $ npm i                  // 安装项目依赖 
  package.json 中已配置的 npm script:  
    serve: 开启静态服务器
    dev: webpack watch模式,方便开发
    build: 源码打包,生成JS Bundle
    debug: 调试模式
  $ weex src/aoo.vue // 预览指定文件 
    浏览器会自动弹出页面,可看到所编辑的 Weex页面的具体效果和页面布局。
    使用Playground扫描二维码,可在Android/IOS设备查看效果 
  $ weex src --entry src/foo.vue // 预览整个项目目录 
    在传入的参数指定预览的目录和入口文件 
  $ weex compile <源文件/目录> <生成目录> // 进行单文件或整个项目的打包 
  调试 Weex 页面
    $ weex debug [options] [we_file|bundles_dir]
      -p, --port <port>    设置 debug 服务器端口号 默认为8088
      -e, --entry <entry>  debug一目录时,指定整个目录的入口 bundle 文件
        这个 bundle 文件的地址会显示在 debug 主页上,作为二维码 
      -m, --mode <mode>    设置构建 we 文件的方式,
        transformer 最基础的风格适合单文件, loader:webpack 风格 适合模块化的多文件
        默认为 transformer
      -h, --help           显示帮助
      -V, --verbose        显示 debug 服务器运行时的各种 log
      -v, --version        显示版本
    $ weex debug // 开启调试
      单纯启动一个调试服务器,并同时唤起Chrome浏览器打开调试主页。
      这个调试主页上会有一个二维码,使用 Playground App 扫这个二维码可以开启 Playground 调试。
      开启调试后,设备列表中会出现您的设备,根据提示进行后续的调试操作。
    $ weex debug your_weex.vue // 调试 .we | .vue 文件
      将 your_weex.vue 编译成 JS Bundle 文件 部署到 debug 服务器；
      并启动debug服务器如上述命令那样打开的调试vue主页会多显示一个二维码,
      使用 Playground App扫这个二维码码可以加载 your_weex.we [注意要先扫描开启调试的那个二维码码]
      这个命令会自动检测 your_weex.we 文件变动,
      如果发现内容被修改则立即重新编译部署,并刷新 debugger 页面。
    $ weex debug your/we/path  -e index.we // 调试整个bundle/we文件夹
      只需要传入目录的路径和入口文件即可；
      编译指定目录下的所有的 .we 文件,并把编译好的 JS Bundle 部署到 debug 服务器,
      他们的地址会映射到 'http://lcoalhost:8088/weex/' 下
      比如 your/we/path/index.we 可以通过 http://lcoalhost:8088/weex/index.js 访问。
      your/we/path/demo/test.we 可以通过 http://lcoalhost:8088/weex/demo/index.js 。
      -e 参数可以指定一个入口的 .we 文件,这个文件的地址会显示在调试主页上(作为二维码)。
weexpack 
  能够帮助开发者通过命令行创建 Weex 工程，添加相应平台的 Weex app 模版，
  并基于模版从本地，GitHub 或者 Weex 应用市场安装插件，
  快速打包 Weex 应用并安装到手机运行，
  对于具有分享精神的开发者而言还能够创建 Weex 插件模版并发布插件到 Weex 应用市场。
  现在使用 weex-toolkit 同样支持对 weexpack 的命令调用,
  如果你当前的项目与 weexpack 生成的项目目录一致，那么你可以直接实现对于 platform 的操作，
  从而构建具体的 Android/IOS app 。
  $ weex platform add <android> // 添加平台 
  $ weex run <android>          // 启动模拟器 
  $ weex plugin add <plugin_name>  // 使用插件市场的插件 
    你只需要输入插件的名称就可以从远程添加插件到你本地的项目,
    $ weex plugin add weex-chart // 添加 weex-chart,我们可以输入命令：
    $ weex plugin remove weex-chart // 移除安装好的 weex-cahrt：
  $ npm i -g weexpack  // 安装weexpack 
  $ weexpack create <appName> // 创建weexpack工程 
  $ weexpack platform add <android>  // 安装应用模版 
  $ weexpack platform list  // 查看已安装模版
  $ weexpack run android // 打包运行android应用
  $ weexpack run ios // 模拟器运行
  $ weexpack build ios // 构建ipa包
  $ weexpack build web // 打包html5平台：
  $ weexpack run web // 在 html5 平台运行：



