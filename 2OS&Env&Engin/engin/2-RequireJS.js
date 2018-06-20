'RequireJS'模块化开发框架,一种"在线编译"模块的方案 
  模块化开发的目的 
    开发阶段: 不打包、不压缩、模块化开发 
    部署阶段: 自动打包、压缩  减少http请求
  功能 
    异步加载文件 
    模块化开发: 
      一个文件一个模块 
      减少全局变量 
  加载机制  
    使用 head.appendChild() 将每个依赖加载成script标签,故可跨域加载 
    加载后的模块会立即执行 
define(['name',] [dependArr,]foo)  定义模块 
  name      模块名,默认为文件名,一般省略  
  dependArr 依赖模块名组成的数组,可选   
  foo       模块实现,工厂方法,模块初始化要执行的函数或对象 
    若为函数,只被执行一次,传入参数顺序对应依赖模块的顺序
    若是对象,此对象为模块的输出值 
  define(obj)  定义简单的对象 
require(dependArr,foo)  加载模块 
  PS: require()函数在加载依赖时是异步加载的 
  dependArr 依赖的模块名组成的数组 
  foo       依赖模块都加载完后执行的函数,传入参数顺序对应依赖模块的顺序 
requirejs.config(configObj)  RequireJS配置 
  configObj     配置对象 
  {
    baseUrl : '/a',   
    paths : {          
      'jquery' : 'lib/jquery', // 配置模块路径 
      'vue' : [
        '//cdn.bootcss.com/vue/2.3.0/vue',  // 首选加载模块 
        'lib/vue'   // 上一个模块加载失败后备用的加载文件 
      ],
      'css' : './lib/require/css',
      'i18n' : './lib/require/i18n',
    },
    shim : {  
    },
    map : {    
      'app/api' : {  // 指定'app/api'模块的'jquery'依赖为'./lib/jquery'
        'jquery' : './lib/jquery',
      },
      'app/api2' : { // 指定'app/api2'模块的'jquery'依赖为'./lib/jquery2'
        'jquery' : './lib/jquery2',
      },
      '*' : {  // 指定所有的模块'jquery'依赖为'./lib/jquery2' 
        'jquery' : './lib/jquery2',
        'css' : './lib/require/css',
      },
    },
    waitSeconds : 10,  
    urlArgs : 'name=1111',
    config : {
      text : { // 配置text插件模块 
        onXhr : function(xhr,url){ // ajax执行的open方法[send方法前],可用来设置http头 
          xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
        },
        createXhr : function(){ // 用来覆盖text插件默认的xhr对象,一般用不到
        },
        onXhrComplete : function(xhr,url){ // ajax完成后支持的函数 
        },
      },
    },
  }
  baseUrl   配置RequireJS加载文件的根路径 
    HTML中插入的JS    以当前HTML文件路径为跟路径 
    <script src=".require.js" data-main='/a/app'></script>  在当前HTML路径上加上'/a' 
  paths     配置模块的路径 
  shim      配置不支持AMD的模块 
    如 Modernizr.js 
    shim : {
      'modernizr' : {  // 不支持AMD的模块名称 
        // deps : ['jquery'], // 依赖的模块名称,可选  
        exports : 'Modernizr', // 输出的模块对象名称  
        // init : function($){ // 初始化函数,可选,返回的对象代替exports作为模块对象  
        //   return $;
        // },
      }
    }
    如 bootstrap, bootstrap只有依赖,而无全局变量  
    shim : {
      bootstrap : ['jquery'] // 简写方式 
    }
  map       配置不同模块的相同依赖指向不同文件 
  waitSeconds 下载js等待的时间,默认7秒,若设为0,则禁用等待超时;超时则RequireJS会报错
  urlArgs   下载文件时,在URL后增加额外的query参数 
插件模块 
  text插件模块 : 用于加载文本文件的RequireJS插件
    可用于加载HTML; 本质通过AJAX请求来加载文本,有跨域的限制 
    require(['text!/user.html!strip'],function(template){ 
      // 会先加载text插件模块在加载'user.html'模块 
      // !strip 可选,只获取'user.html'中body内的部分 
      console.log(template);
    })
  CSS插件模块 : 用于加载样式文件的RequireJS插件  
    为了让'css!'生效,需在RequireJS中配置['map'内或'paths'内任选一个进行配置]
    require(['css!jqurey-ui.css',]function(){
    })
  i18n插件模块 : 支持国际化多语言 
    require(['i18n!./nls/message',],function(i18n){
      console.log(i18n.aoo);
    })
    必须包含'nls',即加载的内容需放置于'nls'文件夹内 
    文件夹设置 
      nls 
        en 
          messages.js 
            define({
              'aoo' : 'show English'
            })
        zh 
          messages.js 
            define({
              'aoo' : '显示为中文'
            })
        messages.js  
          define({
            'en' : true,
            'zh' : true,
          })
    指定语言 
      1. 使用浏览器的 navigator.language 或 navigator.userLanguage 属性
      2. 配置语言 
        config : {
          i18n : {
            locale : 'zh' 
          }
        }
r.js  打包工具 
  npm install requirejs -g   通过npm安装RequireJS 
    r.js.cmd -o baseUrl=xx name=xx out=xx.js   命令行执行,进行打包
      进入对应文件夹下的命令行环境执行,
      baseUrl=路径
      name=要打包的文件名[可以不带文件后缀]
      out=命名输出文件的名称 
  下载 r.js 文件 
    通过Node执行 r.js 来进行打包 
    node r.js -o baseUrl=xx name=xx out=xx.js  
      进入存放 r.js 文件的目录下,命令行中执行   
  通过配置文件来打包 
    node r.js -o app.build.js 
      配置文件即为 app.build.js 
      ({
        appDir : './src', // 要打包的根目录,会将CSS也打包,./ 表示该配置文件所在的位置 
        baseUrl : './js', // 所要打包的目录 
        dir : './build', // 输出目录 
        mainConfigFile : 'src/js/requirejs.config.js', // 指定RequireJS的配置文件 
        optimize : 'none', // 可选 'uglify', 是否使用压缩 
        inlineText : false, // 使用 text 插件后,将HTML文件不打包 
        // name : 'app',     // 打包的具体文件 ,单模块打包 同 modules 互斥 
        modules : [   // 多模块打包 
          {
            name : '' , // 打包的模块名 
            include : [  // 添加所需要一起打包的文件 
              '',
              '',
            ],
            exclude : [ // 排除不打包的模块 
              '',
              '',
            ],
            excludeShallow : [ // 浅移除,仅将列出的模块移除,但会将其依赖打包进来  
              '',
            ],
            insertRequire : [
              '',
            ],
          },
          {
            
          },
        ]
      })
--------------------------------------------------------------------------------

















