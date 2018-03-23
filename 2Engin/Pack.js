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
Grunt: JS构建工具,前端自动化工具 
  PS: 基于NodeJS,用JS开发,Grunt及其插件,都作为一个包,可以用NPM安装进行管理 
  相关命令 
    npm i -g grunt-cli   全局安装Grunt命令行 
      grunt -V 查看版本 
    npm i -D grunt    项目中安装grunt,并写入开发依赖 
    npm i -D <name>   安装相关插件、工具,并写入开发依赖 
      npm i -D load-grunt-tasks   安装用于加载包的grunt工具 
      npm i -D time-grunt    
    grunt <task>      执行grunt任务 
      task 为'Gruntfile.js'中'grunt.initConfig'的配置对象的属性 
'Gruntfile.js'文件: Grunt的配置文件  
  PS: Grunt调用'Gruntfile.js'文件,解析里面的任务'task'并执行相应操作 
  module.exports = function(grunt){
    require('load-grunt-tasks')(grunt);  
    require('time-grunt')(grunt); 
    
    var config = { // 自定义的配置项  
      name: 'app', 
      src: 'app/src',    //源文件目录
      dist: 'app/assets' //生产文件目录
    }
    grunt.initConfig({ // 任务配置
      // 定义此参数对象为'params',便于后续描述
      // params 的属性名和使用的同名模块对应,也可自定义属性  
      
      pkg: grunt.file.readJSON('package.json'), 
      
      config:  config, // 自定义配置,方便后续使用 
      // 任务配置 具体设置需参考该模板的文档 
      taskName0: {   // $ grunt xx ,执行所有子任务 
        aoo: { // 子任务, $ grunt xx:aoo 执行该任务 
          // ..
        },
        boo: {
          // ..
        }
        // ...
      },
      // ...
    })
  } 
  任务中常用属性名说明  
    'options': {}   // 任务的可选配置项  
      'banner': str,  // 定义的banner注释将插入到输出文件的顶部 
      'mangle': bol,  // 是否混淆变量名 
      'preserveComments': keywords, // 是否保留注释 
      'report': keywords, // 输出压缩率报告 
        "min"  
        false   不输出信息  
    'files': arr/obj,  
      'expand': bol,  // 下面文件名的占位符[即*号]是否扩展成具体的文件名 
      'cwd': str,     // 需处理的文件所在的目录 
      'src': str/arr, // 需处理的文件 
      'dest': str,    // 处理后的文件所在目录或文件名   
      'ext': str,     // 处理后的文件后缀名 
API 
  通配符 
    ?   匹配除'/'外的单个字符
    *   匹配除'/'外的任意字符
    **  匹配任意字符 
    {xx,xx,...}  匹配所有列出的字符 
    !   条件取反 
    Example: 
      '**/*.js'  所有的JS文件 
  <%= aoo.xx %>   模板引擎,aoo表示'params.aoo'  
    可实现类似管道的功能 
      在'concat'合并任务中,子任务为'aoo',输出目录为'boo'
      在'uglify'JS压缩任务中,使用 <%= concat.aoo.boo> 作为输入目录 
      则uglify会自动压缩concat任务中生成的文件 
  属性 
  函数 
  grunt.file.readJSON('package.json') // 读取'package.json'文件的项目配置信息
  grunt.file.isDir(filePath)     // 判断路径是文件还是文件夹 
  grunt.loadNpmTasks('grunt-contrib-uglify')  // 加载插件 
  grunt.registerTask(task,['plugs0',..])   // 注册任务 
    task    任务名 
      'default'  默认的任务,执行grunt时,会执行注册到'default'上的任务 
    plugs   表示该任务需要依次使用的模块 
    Example: 
      grunt.registerTask('build', [ 'uglify', 'cssmin' ]);
      grunt.registerTask('dev', []);
任务插件详解 
  load-grunt-tasks       加载所有在'package.json'开发依赖中的Grunt插件 
  time-grunt             显示每一个任务所花的时间和百分比 
  grunt-contrib-uglify   压缩及合并JS文件  
    'uglify': {
      options: {
        //添加banner
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        report: keywords,  // 输出压缩率 
          false   // 不输出信息
          'gzip'  // 
          'min'   // 
      },
      task0: {
        options: {
          mangle: bol, // 是否混淆变量名
          preserveComments: keywords, // 是否删除注释 
            // 'all'   不删除注释 
            // 'some'  保留@preserve @license @cc_on等注释
            // false   删除全部注释 
          //添加footer
          footer: '\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        files: {
          'output/js/a.min.js': ['js/a.js']
        },
        files: [{  // 按原文件结构压缩文件夹内所有JS文件 
          expand: true,
          cwd:'src',      // src目录下 
          src:'**/*.js',  // 所有js文件
          dest: 'dist'    // 输出到此目录下
        }]
      },
      // ...
    }
    Example: 
      uglify: {
        prod: {
          options: {
            mangle: {
              except: ['require', 'exports', 'module', 'window']
            },
            compress: {
              global_defs: {
                PROD: true
              },
              dead_code: true,
              pure_funcs: [
                "console.log",
                "console.info"
              ]
            }
          },
          files: [{
            expand: true,
            cwd: 'dist/html',
            src: ['js/*.js', '!js/*.min.js'],
            dest: 'dist/html'
          }]
        }
      },      
  grunt-contrib-cssmin   压缩及合并CSS文件 
    Example: 
      cssmin: {
        prod: {
          options: {
            report: 'gzip'
          },
          files: [
            {
              expand: true,
              cwd: 'dist/html',
              src: ['css/*.css'],
              dest: 'dist/html'
            }
          ]
        }
      },
  grunt-contrib-htmlmin  压缩及合并HTML文件 
    Example:
      htmlmin: {
        options: {
          removeComments: true,
          removeCommentsFromCDATA: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true
        },
        html: {
          files: [
            {expand: true, cwd: 'dist/html', src: ['*.html'], dest: 'dist/html'}
          ]
        }
      }    
  grunt-contrib-imagemin 图像压缩  
    Example:
      imagemin: {
        prod: {
          options: {
            optimizationLevel: 7,
            pngquant: true
          },
          files: [
            {
              expand: true, 
              cwd: 'dist/html', 
              src: ['images/*.{png,jpg,jpeg,gif,webp,svg}'], 
              dest: 'dist/html'
            }
          ]
        }
      },
  grunt-contrib-sass     Scss编译  
    var sassStyle = 'expanded';
    
    'sass': {
      output : {
        options: {
          style: sassStyle
        },
        files: {
          './style.css': './scss/style.scss'
        }
      }
    }
  grunt-contrib-copy     文件拷贝 
    'copy': {
      aoo: {  // 子任务'aoo' 
        // 形式一: 单/多对单  
        src: str/arr, // 原文件  
        dest:   ,     // 目标文件  
        // 形式二: 多对多映射 
        files: [
          {
            expand: true, 
            cwd: 'path',  // src中的文件路径,以此为基 
            src: str/arr,  
            dest: '' ,     
            ext: '.js',  // 定义扩展名 
            extDot: '',  // 当原文件名中存在多个点,如'aoo.min.js'
              // 'first'  
              // 'last'   
            flatten: true,
            rename: function(dest,src){
              return dest+'js/'+src;
            },
          },
        ],
        // 形式三: 形式二的简化版 
        files: {
          // key 为目标文件,val 为原文件 
          key1: val2,
        }
      }
    }
    Example: 
      copy: {
        src: {
          files: [
            {expand: true, cwd: 'src', src: ['*.html'], dest: 'dist/html'}
          ]
        },
        image: {
          files: [
            {expand: true, cwd: 'src', src: ['images/*.{png,jpg,jpeg,gif}'], dest: 'dist/html'}
          ]
        }
      },
  grunt-contrib-clean    文件删除 
    'clean': {
      aoo: {
        src: str/arr, // 将删除的文件 
        filter:   ,   // 过滤条件 
          参数可为 NodeJS的'fs.stats'的方法,或自定义函数
            如将文件全部删除,单保留文件夹,以下二选一  
            'isFile'        
            function(filePath){
              return !grunt.file.isDir(filePath);
            }
        dot: bol,     // 是否删除以'.'开头的文件, 
      }
    }
    Example: 
      clean: {
        all: ['dist/html/**', 'dist/*.*'],
        image: 'dist/html/images',
        css: 'dist/html/css',
        html: 'dist/html/**/*'
      },
  grunt-contrib-concat   合并文件  
    'concat': {
      options: {
        separator: ';',  // 用于插入合并输出文件间的字符
      },
      dist: {
        src: ['./src/plugin.js', './src/plugin2.js'],
        dest: './global.js',
      },
    }
    Example: 
      concat: {
        options: {
          separator: ';',
          stripBanners: true
        },
        js: {
          src: [
            "src/js/*.js"
          ],
          dest: "dist/html/js/app.js"
        },
        css:{
          src: [
            "src/css/*.css"
          ],
          dest: "dist/html/css/main.css"
        }
      },
  grunt-contrib-jshint   语法检查  
  grunt-contrib-watch    监听文件变动  
    watch: {
      files: [],
      tasks: ['jshint', 'qunit'], // 监听到变化后触发的任务列表 
    }
  grunt-contrib-connect  建立本地服务器 
--------------------------------------------------------------------------------
Gulp: 自动化构建工具 
  PS: 基于Nodejs的自动任务运行器, 
    能自动化地完成 JS/coffee/sass/less/html/image/css 等文件的
    测试、检查、合并、压缩、格式化、浏览器自动刷新、部署文件生成,
    并监听文件在改动后重复指定的这些步骤等等 
    借鉴了Unix操作系统的管道'pipe'思想,前一级的输出,直接变成后一级的输入,使得在操作上非常简单 
    和Grunt类似,但Gulp的流操作,能更快地更便捷地完成构建工作 
    'gulp4.0'中已引入同步机制   
  相关命令 
    $ npm i -g gulp   // 全局安装gulp 
      $ gulp -v     // 查看版本号 
    $ npm i -D gulp   // 项目中安装并写入开发依赖 
    $ gulp <taskName> // 执行配置的任务 
  使用webstorm运行gulp任务 
    说明:使用webstorm可视化运行gulp任务；
    使用方法:
      将项目导入webstorm,右键gulpfile.js 选择”Show Gulp Tasks”打开Gulp窗口,
      若出现”No task found”,选择右键”Reload tasks”,双击要运行的任务即可。
'gulpfile.js'配置文件[项目根目录创建] 
  // 加载插件 
  var gulp = require('gulp') 
  ,sass = require('gulp-ruby-sass')
  ,autoprefixer = require('gulp-autoprefixer')
  ,minifycss = require('gulp-minify-css')
  ,jshint = require('gulp-jshint')
  ,uglify = require('gulp-uglify')
  ,imagemin = require('gulp-imagemin')
  ,rename = require('gulp-rename')
  ,concat = require('gulp-concat')
  ,notify = require('gulp-notify')
  ,cache = require('gulp-cache')
  ,livereload = require('gulp-livereload')
  ,del = require('del');
    
  // 设置默认任务'default', $ gulp 执行  
  gulp.task('default', ['clean'], function() {
    // clean任务执行完成了才会去运行其他的任务,
    // 在gulp.start()里的任务执行的顺序是不确定的,所以将要在它们之前执行的任务写在数组里面。  
    gulp.start('styles', 'scripts', 'images');
  });
  
  // 建立任务: 编译sass、自动添加css前缀、压缩最,后添加'.min'后缀输出到指定目录 
  gulp.task('aoo', function() { // 创建任务 
    return gulp.src('src/styles/main.scss') 
    .pipe(sass({ style: 'expanded' })) 
    .pipe(autoprefixer(
      'last 2 version', 
      'safari 5','ie 8','ie 9','opera 12.1',
      'ios 6','android 4'
    ))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css')) 
    .pipe(notify({ message: 'Styles task complete' }));
  });      
  
  gulp.task('watch', function() { //  监听文件,以执行相应的任务 
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/images/**/*', ['images']);
  });
  gulp.task('watch', function() { // 自动刷新页面 
    livereload.listen(); // Create LiveReload server
    gulp.watch(['dist/**']).on('change', livereload.changed);
  });
API 
  路径匹配 
    PS: Gulp内部使用了node-glob模块来实现其文件匹配功能 
    *    匹配除'/'外的若干个任意字符  
      一般用于匹配任意文件名或单个目录名
    **   匹配若干个任意字符 
      一般用于匹配若干个目录 
    ?    匹配除'/'外的单个任意字符 
    !    取反 
    |    或 
    []   单匹配 
      [abc] 可匹配'a'或'b'或'c',但不能匹配'ab'
      [1-4] 
    {}   展开模式,展开为多个模式
      {a,b,c} 
    ()   分组匹配  
      !(a|b|..)  排除所有 
      ?(a|b|..)  匹配任意一个一次或0次 
      @(a|b|..)  匹配任意一个一次 
      +(a|b|..)  
      *(a|b|..)  
  gulp.task(task[,taskArr],foo)  // 创建任务, $ gulp task 执行  
    task      任务名称 
      当任务名为'default'时,通过 $ gulp 执行 
    taskArr   可选,任务数组,执行本次任务前将先并行执行任务数组内的任务  
      若任务所依赖的任务是异步的,gulp并不会等待依赖的异步任务完成,而是接着执行后续任务 
        gulp.task('one',function(){
          setTimeout(function(){ // 一个异步执行的任务
            console.log('one is done')
          },5000);
        });
        //two任务虽然依赖于one任务,但并不会等到one任务中的异步操作完成后再执行
        gulp.task('two',['one'],function(){ 
          console.log('two is done');
        });
    foo([cb]) 回调函数  
      cb()   // 完成 task 
    串行方式运行任务,即任务依赖 
      默认的任务以最大并发数执行,即gulp会运行所有的task且不等待  
      ◆等待异步任务中的异步操作完成后再执行后续的任务的方法 
      方法一: 在异步操作完成后执行一个回调函数来通知gulp这个异步任务已经完成 
        回调函数就是任务函数的第一个参数 
        gulp.task('one',function(cb){ //cb为任务函数提供的回调,用来通知任务已经完成
          //one是一个异步执行的任务
          setTimeout(function(){
            console.log('one is done');
            cb();   //  执行回调,表示这个异步任务已经完成
          },5000);
        });
        //这时two任务会在one任务中的异步操作完成后再执行
        gulp.task('two',['one'],function(){
          console.log('two is done');
        });
      方法二: 返回一个'stream'取代使用回调函数 
        适用于任务就是操作'gulp.src'获取到的流的情况 
        gulp.task('one',function(cb){
          var stream = gulp.src('client/**/*.js')
          .pipe(dosomething()) //dosomething()中有某些异步操作
          .pipe(gulp.dest('build'));
          return stream; // 返回一个 stream 来表示它已经被完成 
        });
        gulp.task('two',['one'],function(){
          console.log('two is done');
        });
      方法三: 返回一个promise对象 
        var Q = require('q'); //一个著名的异步处理的库 https://github.com/kriskowal/q
        gulp.task('one',function(cb){
          var deferred = Q.defer();
          // 做一些异步操作
          setTimeout(function() {
            deferred.resolve();
          }, 5000);
          return deferred.promise;
        });
        
        gulp.task('two',['one'],function(){
          console.log('two is done');
        });
  .pipe()     // 管道操作,将上一个结果导向下一个 
  gulp.src(path[,options])    // 设置待处理的文件 
    path  str/arr,文件路径 
      str   单个文件路径 
      arr   数组形式的多个文件路径  
    options = {   // 配置对象 
      buffer: bol,  // 默认true, false则将以stream方式返回而非文件buffer的形式 
        // 有的插件可能不支持stream 
      read: bol, // 默认true, false则返回空值(null),即不会去读取文件 
      base: ''   // 默认path中匹配前的值 
        最终生成的目录为: 使用'gulp.dest'中指定的'path'替换'gulp.src'中'base'值  [详见'gulp.dest']
        gulp.src('app/src/**/*.css') // 此时base的值为 app/src 
    }
  gulp.dest(path[,options])   // 设置生成文件的路径 
    PS: 传入的路径参数,只能用来指定要生成的文件的目录,而不能指定生成文件的文件名,
      生成文件的文件名使用的是导入到的文件流自身的文件名,
      改变文件名需用插件  
    生成的文件路径是传入的path参数后面再加上'gulp.src()'中通配符匹配的路径 
      var gulp = reruire('gulp');
      gulp.src('script/**/*.js') // 有通配符匹配的路径为 **/*.js
      .pipe(gulp.dest('dist'));  //最后生成的文件路径为 dist/**/*.js
      //如果 **/*.js 匹配到的文件为 jquery/jquery.js ,则生成的文件路径为 dist/jquery/jquery.js
      
      gulp.src('script/avalon/avalon.js') // 没有通配符出现时  
      .pipe(gulp.dest('dist')); //最后生成的文件路径为 dist/avalon.js
  gulp.watch(path[,options],taskArr)  // 监听文件变动 
    gulp.watch(path[,options],taskArr)  // 监听文件变动执行任务 
      taskArr  文件变动后执行的一个或者多个任务 
      Example: 
        gulp.watch('js/**/*.js', ['uglify','reload'])
        .on('change', function(event) {
          console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
    gulp.watch(path[,options,cb(e)])    // 监听文件变动进行回调 
      cb  每次变动执行的回调函数,默认传入event对象 
        event对象描述了所监控到的变动 
        event.type str,发生变动的行为类型: 'added', 'changed', 'deleted'
        event.path str,触发该事件的文件路径 
插件枚举 
  $ npm i -D <plugsName>   // 安装插件并写入开发依赖 
  del        删除文件,原生的node模块 // rm -rf
    清除之前生成的文件 
    gulp.task('clean', function(cb) {
      // 用一个回调函数'cb'确保在退出前完成任务  
      del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb) 
    });

    gulp.task('clean', function (cb) {
      del([
        'dist/report.csv',
        'dist/mobile/**/*', // 使用通配模式来匹配 `mobile` 文件夹中的所有文件及文件夹  
        '!dist/mobile/deploy.json' // 不希望删掉的文件通过取反匹配模式 
      ], cb);
    }); 
  gulp-clean         文件删除 
    gulp.task('clean',function () {    //删除dist目录下的所有文件
      gulp.src('dist/*',{read:false})
      .pipe(clean());
    });
  gulp-less          编译less 
    gulp.task('compile-less', function () {
      gulp.src('less/*.less')
      .pipe(less())
      .pipe(gulp.dest('dist/css'));
    });
  gulp-ruby-sass     编译sass  
    gulp.task('compile-sass', function () {
      gulp.src('sass/*.sass')
      .pipe(sass())
      .pipe(gulp.dest('dist/css'));
    });
  gulp-autoprefixer  自动添加css前缀 
  gulp-minify        压缩js脚本,css样式,html文档,json数据,jpg、png和gif图片 
    PS: 压缩不了JSON文件?
    $ npm i -D gulp-minify 
    gulp.task('js', function () {
      return gulp.src('src/**/*.js')
      .pipe(code.lint())
      .pipe(code.dep({
        name: pkg.name,
        path: 'http://g.tbcdn.cn/tm/detail/' + pkg.version,
        depFile: ['seed.js']
      }))
      .pipe(minify())
      .pipe(gulp.dest('build/'))
    });
    压缩css并且图片进行datauri
    gulp.task('css', function () {
      return gulp.src('src/**/*.css')
      .pipe(code.lint())
      .pipe(minify({"datauri": true}))
      .pipe(gulp.dest('build/'))
    });
  gulp-minify-css    压缩css 
    gulp.task('minify-css', function () {
      gulp.src('css/*.css') // 要压缩的css文件
      .pipe(minifyCss()) //压缩css
      .pipe(gulp.dest('dist/css'));
    });
  gulp-minify-html   压缩HTML 
    gulp.task('minify-html', function () {
      gulp.src('html/*.html') // 要压缩的html文件
      .pipe(minifyHtml()) //压缩
      .pipe(gulp.dest('dist/html'));
    });
  gulp-uglify        压缩js代码 
    gulp.task('minify-js', function () {
      gulp.src('js/*.js') // 要压缩的js文件
      .pipe(uglify())  //使用uglify进行压缩,更多配置请参考：
      .pipe(gulp.dest('dist/js')); //压缩后的路径
    });
  gulp-htmlmin       压缩HTML 
    $ npm i -D gulp-htmlmin  
    gulp.task('htmlmin', function () {
      var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
      };
      gulp.src('html/**/**.html')
      .pipe(htmlmin(options))
      .pipe(gulp.dest('dist/'));
    });
  gulp-imagemin      压缩图片 
    .pipe(imagemin({   
      optimizationLevel: 3, 
      progressive: true, 
      interlaced: true 
    }))
    缓存压缩过的图片,只有新建或者修改过的图片才会被压缩了 
    .pipe(cache(imagemin({ 
      optimizationLevel: 5, 
      progressive: true, 
      interlaced: true 
    })))
  gulp-json-minify   压缩JSON文件 
  gulp-jsonminify    压缩JSON文件 
  gulp-concat        合并js文件 
    gulp.task('concat', function () {
      gulp.src('js/*.js')  //要合并的文件
      .pipe(concat('all.js'))  // 合并匹配到的js文件并命名为 "all.js"
      .pipe(gulp.dest('dist/js'));
    });
  gulp-base64        把小图片转成base64字符串 
  gulp-jshint        js代码校验
  gulp-livereload    当代码变化时,自动刷新页面 
    最好配合谷歌浏览器来使用,且要安装'livereload chrome extension'扩展插件 
    var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload');
    
    gulp.task('less', function() {
      gulp.src('less/*.less')
      .pipe(less())
      .pipe(gulp.dest('css'))
      .pipe(livereload());
    });
    gulp.task('watch', function() {
      livereload.listen(); //要在这里调用listen()方法
      gulp.watch('less/*.less', ['less']);
    });
  gulp-cache         图片缓存,只有图片替换了才压缩 
  gulp-notify        更改提醒
  gulp-rev           对css、js文件名加MD5后缀
  gulp-rev-collector 路径替换
  gulp-rename        重命名文件流中的文件
    PS: 用'gulp.dest'写入文件时,文件名使用的是文件流中的文件名, 
      若想改变文件名,可以在之前用gulp-rename插件来改变文件流中的文件名 
  gulp-load-plugins  自动加载'package.json'文件里的gulp插件 
    PS: 并不会一开始就加载所有'package.json'里的gulp插件
      而是在需要用到某个插件的时候,才去加载  
    var plug = require('gulp-load-plugins')(); // 加载gulp-load-plugins,并运行  
    plug.name // 表示对应的插件,'name'为原始插件名去掉'gulp-'前缀后转换成的驼峰命名 
  run-sequence       同步运行 
    gulp.task('default',function() {
      runSequence('clean',
      ['script', 'css','img'],
      'html',
      'server',
      'auto');
    });
Suggestion&Question: 
  如何删除HTML中嵌入的JS中的'console.log();'
-------------------------------------------------------------------------------
'Webpack'JS模块打包器'module bundler'
  介绍 
    运行在NodeJS环境中;支持'AMD'、'commonJS'、'ES6Moudle'三种引入方式; 
    基于JS,包括四大核心'Entry''Output''Loaders'和'Plugins'; 
    把各种资源,如JS、coffee、less、sass、图片等都作为模块来使用和处理; 
    '预编译'模块方案,根据模块的依赖进行静态分析,使用JS作为载体将所有静态资源打包在一起 
  原理: 
    webpack模块能够以以下方式表达依赖关系,如: 
      CSS中的'@import'语句 
      CSS中的'url(...)'样式 
      HTML中<img src=...>的图片链接 
      ES2015'import'语句 
      CommonJS'require'语句 
      AMD'define'和'require'语句
      即: Webpack会识别HTML及CSS中的路径、JS中的模块引入,将他们进行转换、打包, 
      [但不会识别JS中的path,因为无法区分是字符串还是路径] 
    把所有的非js资源都转换成js, 
    如把一个'css'文件转换成'创建一个style标签并把它插入document'的脚本、 
    把图片转换成一个图片地址的js变量或base64编码等, 
    然后用CommonJS、AMD或ES6模块化的机制管理; 
    执行过程:  
      从'context'目录开始,寻找'entry'内的文件,读取内容
      每当遇到'import'或者require()依赖项时,解析这些代码,并且打包到最终构建里;
      接着它会不断递归搜索实际需要的依赖项,直到它到达了“树”的底部。
      从上一步接着,Webpack把所有东西打包到'output.path'的文件夹里,
      并使用'output.filename'命名
  说明 : 
    从'2.0'版本开始,支持用'ES6module'规范[import/export]去进行模块打包 
    'chunk'块,被entry所依赖的额外的代码块 
相关命令 
  ◆安装相关 
  $ npm i -g webpack  // 全局安装Webpack  
  $ npm init  // npm初始化,创建'package.json'文件 
  $ npm i -D webpack  在项目中安装webpack并写入依赖配置文件  
  ◆安装后可用的其他相关命令  
  $ webpack <option>  Webpack自身可用命令 
    -v        查看版本号 
    -h        查看版本信息及可用的指令 
  ◆打包相关  
  $ webpack aoo.js aoo.boudle.js [<options>]   将'aoo.js'打包成'aoo.boudle.js' 
    ◆<options>   可选,表示配置参数,可同时使用多个 
    --watch           当文件更改时,自动打包
    --progress        打包时显示进度
    --display-modules 打包完后显示依赖的模块 
    --display-reasons 显示打包的原因 
  $ webpack [<option>]   打包时的配置项,可多选     
    -w   提供watch方法,实时进行打包更新 
    -d   提供SourceMaps,方便调试
    -p   表示'生产'模式,输出文件会被uglifies/minifies 
    --colors  输出结果带彩色,比如:会用红色显示耗时较长的步骤
    --profile 输出性能数据,可以看到每一步的耗时 
      将打包数据输出到JSON文件中,可通过'webpack.github.io/analyse'等站点进行分析 
      $ webpack --profile --json > statis.json 
    --display-module  显示打包的模块 
    --display-reason  显示打包的原因 
    --display-error-details  打印错误详情 
  $ webpack --config xx.js 自定义配置文件[可不再是默认的'webpack.config.js'] 
'webpack.config.js'默认的配置文件: 默认通过该配置进行打包 
  PS: 需手动创建该文件;是一个NodeJS模块,返回一json格式的配置信息对象[?] 
  配置详情 
  let webpack = require('webpack'); // 引入Webpack 
  let path = require('path'); // 引入path模块 
  //定义了一些文件夹的路径
  let rootPath = path.resolve(__dirname);
  let srcPath = path.resolve(rootPath, 'src');
  let distPath = path.resolve(rootPath, 'dist');
  module.exports = {  // commonjs模块化输出 
    context: path.resolve(__dirname,"src"), // webpack上下文: 入口文件所处的目录的绝对路径 
      // process.cwd() 默认值,NodeJS的启动目录 
    entry: str/arr/obj, // 入口,可认为app第一个启动文件 
      // PS: 一般的每个HTML页面都有一个入口起点 
      //   一般单页应用[SPA]:一个入口起点;多页应用[MPA]:多个入口起点
      { // 适用于多入口的情况,最可扩展的方式  
        // key 映射到 [name] 中
        key1: './src/index.js'
        key3: ['./entry1.js','entry2.js'], // 将被打包到一起 
        vendor: ['vue','vue-router','vue-resource','vuex'], // 将第三方库进行单独打包 
          // 一般使用'vendor',也可以是其他任意字符串 
      },
      ['./entry1.js','entry2.js'], // 将多个文件打包在一起
      './src/index.js', // 指定单一的入口文件 
    output: {  // 指定打包后的文件的输出 
      path: path.resolve(__dirname,'dist'),  // 指定输出目录,需用绝对路径   
      // 打包后的文件的名称 
      filename: './bundle.js',      // 也可包含路径,会接着path后 
        // PS: 可使用占位符输出多文件 
        //   [hash]和[chunkhash]等占位符长度可以使用[hash:16]来指定,默认为20
        // [name]      对应'entry.key'
        // [hash]      对应打包时生成的hash值
        // [chunkhash] 对应chunk的hash值,相当于文件的MD5值 
        // [id]        对应内部 chunk id
      hashDigestLength: num,  // [hash]和[chunkhash]的使用长度 
      // 一般用于服务器配置,输出解析文件的目录,默认空字符串 
      // 选项的值是以'runtime'运行时或'loader'载入时所创建的每个URL的前缀 
      // 'webpack-dev-server'也会默认从 publicPath 为基准
      // 在'compile time'编译时无法知道输出文件的'publicPath'的情况下,可留空,
      // 然后在'entry file'入口文件处使用'free variable'自由变量'__webpack_public_path__',
      // 以便在运行时(runtime)进行动态设置 
      //  __webpack_public_path__ = myRuntimePublicPath
      publicPath: "https://cdn.example.com/", // 如如何加载图片 
      // 决定非入口'chunk'的名称,即动态导入的文件被打包后的名称 
      // 文件名需在'runtime'根据'chunk'发送的请求去生成 
      chunkFilename: 'js/[name].asyncChunk.js?'+new Date().getTime(), 
      chunkLoadTimeout: 120000, // chunk请求到期之前的毫秒数,单位ms,默认120000 ['2.6.0+']
      library: "MyLibrary", // 'exported library'导出库的名称 
      libraryTarget: "umd", // 通用模块定义,导出库'exported library'的类型 
      hashFunction: str, // 散列算法,默认'md5'
      sourceMapFilename: str, // 在'devtool'启用了'SourceMap'选项时才生效 
        // 可使用的占位符:
        // [name]、[id]、[hash]、[chunkhash] 
        // [file]     模块文件名称
        // [filebase] 模块 basename
    }, 
    
    module: {},  // 决定了如何处理项目中的不同类型的模块 [详见'Loaders']
    plugins: [], // 插件 [详见'Plugins'] 
    devServer: { // 'webpack-dev-server'配置 [详见'webpack-dev-server'] 
      // PS: webpack2.0新增,用于集中处理'webpack-dev-server'的相关配置 
      port: 8000
      ,host: '0.0.0.0'
      ,overlay: {
        errors: true // 编译错误时,显示在网页上 
      }
      ,open: true   // 是否自动打开浏览器 
      ,historyFallback: {  // 将不识别的地址映射到指定地址 
        
      }
      ,hot: true // 是否热更新 
    }, 
    devtool: 'source-map', // 浏览器调试用的选项  
      'source-map'  // 牺牲构建速度的'source-map'是最详细的 
      "cheap-module-source-map" // 调试时只能寻找到对应的行,不能对应到具体符号 
      "eval-source-map"   // 用于开发环境  
      "eval"         // 没有模块映射,而是命名模块,以牺牲细节达到最快 
      "inline-source-map" // 嵌入到源文件中
      "hidden-source-map" // 'SourceMap'不在源文件中引用
      'null'        // 无'source-map'
    
    resolve: { // 解析模块请求的选项,用来配置要被打包的模块解析的处理细节  
      modules: [  // 用于查找模块的目录  
        path.resolve(__dirname, 'src'),
        'node_modules'
      ],
      root: [path.join(__dirname,'src')], // 查找module的路径,需是绝对路径 
      extensions: ['','.js',".css",'.vue','.jsx','.ts'], // 使用的扩展名 
        // 当省略后缀时,会按数组属性来匹配 
      alias: {   // 路径别名列表 
        'aoo': '../asserts/aoo.js',
        "module$": "new-module", // "module/path/file"但不匹配"new-module/path/file"
        'src': path.resolve(__dirname, './src'),
      },
      fallback: path.join(__dirname, "node_modules"),
      // 当出现 Node.js 模块依赖查找失败的时候,
      // 可尝试设置 resolve.fallback 和 resolveLoader.fallback 来解决问题
    },
    watch: true, // 监控文件改变,动态更新 
    sourceMapFilename: "[file].map", // 'source map'位置的文件名模板
      "sourcemaps/[file].map" 
    devtoolModuleFilenameTemplate: "webpack:///[resource-path]", // 'devtool'中模块的文件名模板 
    // 'devtool'中模块的文件名模板[用于冲突]     
    devtoolFallbackModuleFilenameTemplate: "webpack:///[resource-path]?[hash]",
    performance: { // 检测模块的相关信息 
      hints: 'warning'/'error', // 提示级别 
      maxEntrypointSize: num, // 单位为bytes,打包后的文件的最大体积限制
      maxAssetSize: num, // 单位bytes,图片或CSS的最大体积限制  
    }
    resolveLoader:{ // 用来配置loader模块解析的处理细节 
      fallback: path.join(__dirname, "node_modules"),
    }, 
    libraryTarget: "umd", // 导出库'exported library'的类型,通用模块定义 
      "umd2", // 通用模块定义
      "commonjs2", // exported with module.exports
      "commonjs-module", // 使用 module.exports 导出
      "commonjs", // 作为 exports 的属性导出
      "amd", // 使用 AMD 定义方法来定义
      "this", // 在 this 上设置属性
      "var", // 变量定义于根作用域下
      "assign", // 盲分配(blind assignment)
      "window", // 在 window 对象上设置属性
      "global", // property set to global object
      "jsonp", // jsonp wrapper
    chunkFilename: "[id].js", // 附加分块'additional chunk'的文件名模板  
      "[chunkhash].js"   // 长效缓存(/guides/caching)
    crossOriginLoading: "use-credentials", // 指定运行时如何发出跨域请求问题        
      "anonymous"  
      false 
  } 
'Loaders'解释器: 用于编译解释指定类型的文件,在打包之前进行预处理 
  PS: Webpack本身只能处理JS模块,使用loader可处理其他类型的文件,
    html,css,images等各种资源都有相应的loader来做依赖管理和打包;
    通过文件扩展名[或正则表达式]绑定给不同类型的文件
    Loader可以同步或异步执行,可接受参数,以此来传递配置项给loader
  相关命令 
    npm i <loaderName> -D   安装loader 
      npm i css-loader style-loader -D  同时安装多个loader 
    // 命令行中编译时指定使用的loader 
    webpack aoo.js boo.js --module-bind 'css=style-loader!css-loader' 
  通过管道方式链式调用 
    多个loader之间使用'!'连接,类似于Linux的pipe命令,
    每个loader可以把资源转换成任意格式并传递给下一个loader,
    但是最后一个loader必须返回JavaScript;
  'webpack.config.js'配置文件  
    'module': {    
      loaders: [  // '1.x'版本写法,loader可简写省略'-loader' 
        { test: /\.css$/, 
          // loader : 'style!css',
          loader : 'style-loader!css-loader?importLoader=1!postcss-loader', 
          // importLoader=1 表示该Loader后的1个loader来处理css中import的css
          // 或 loaders: ["style-loader","css-loader"."postcss-loader"]
          // 使用postcss-loader的autoprefixer功能将css属性添加前缀
          // 需安装postcss-loader和autoprefixer 
        },
        { test : /\.(png|jpg|gif|svg)$/i, 
          loaders : [  // 指定多个loader
            'url-loader?limit=1000&name=assets/[name]-[hash:5].[ext]',
            'image-webpack', // 用于压缩图片,按照逆序会先执行压缩
          ],
          // 当使用 require('../img.png') 时,将使用url-loader进行处理 
        },
        { test : /\.(png|jpg|gif|svg)$/i, // 用于处理图片的[相对]路径
          // HTML、CSS中图片的相对路径会被替换
          // 组件模版中HTML内需如此使用 <img src="${require(../a.png)}"/>
          loader : 'file',
          query : {
            name :'assets/[name]-[hash:5].[ext]' , // 用于定义图片的路径
          }
        },
      ],
      // 创建'module'模块时,匹配请求的规则数组 
      rules: [    // '2.x'版本写法,`-loader`后缀在webpack2不可省略  
        { test: regp, // 可选,匹配特定条件,正则表达式或正则表达式的数组  
          use: str/obj/arr,  // 配置loaders 
            "aoo-loader", // 使用单个loader,简写方式
            {             // 使用单个loader
              loader: 'aoo-loader',
              options: { // 配置,或使用'?key1=val1&key2=val2'的形式  
              },
            },
            [ // 使用多个loader,成员为前两种形式  
              "boo-loader", 
              {},
              ...
            ],
          exclude: str|strArr, // 可选,排除特定条件 
          include: str|strArr, // 可选,匹配特定条件 
          and: [], // 必须匹配数组中的所有条件 
          or: [],  // 匹配数组中任何一个条件
          not: [], // 必须排除这个条件
          oneOf: [ /* rules */ ], // 当规则匹配时,只使用第一个匹配规则 
            // {
            //   test: /.css$/,
            //   oneOf: [
            //     {
            //       resourceQuery: /inline/, // foo.css?inline
            //       use: 'url-loader'
            //     },
            //     {
            //       resourceQuery: /external/, // foo.css?external
            //       use: 'file-loader'
            //     }
            //   ]
            // }
          rules: [ /* rules */ ], // 使用所有这些嵌套规则[合并可用条件] 
        },
      ],
      // 防止'webpack'解析那些任何与给定正则表达式相匹配的文件
      // 忽略的文件中不应该含有'import','require','define'的调用,或任何其他导入机制。
      // 忽略大型的'library'可以提高构建性能 
      noParse: RegExp|[RegExp]|foo,
        noParse: /jquery|lodash/,
        noParse: function(content) { // "3.0.0+" 
          return /jquery|lodash/.test(content);
        },
    }
  其他 
    require()时指定使用的loader  
      Example:require("loaderName!./xx/fileName.xx");  
      使用'!'隔离,表示引用前指定由 loaderName 来处理 .xx 文件,
      可同时使用多个,如 require("style-loader!css-loader!./style.css");
    'Query Parameters'loader的配置参数 
      在'webpack.config.js'文件中进行配置 
        在loader后配置参数 
        {
          test: /\.png$/,
          loader : 'url-loader?mimetype=image/png'
        }
        或 使用'options'选项 
        {
          test : /\.png$/,
          loader : 'url-loader',
          options : {
            mimetype : "image/png"
          }
        }
      在'require'时配置 
        require("url-loader?mimetype=img/png!./file.png");
        require("style-loader!css-loader!./css/css.css");
      在命令行中进行配置 
        webpack a.js b.js --module-bind "css=style-loader!css-loader"   
  ◆loader枚举 
  raw-loader     
    { 
      test: /\.html$/,
      use: "raw-loader"
    },
  css-loader    使webpack具备处理'.css'文件的能力 
    能够使用'@import'和'url(./image.png)'实现'require()'的功能 
  style-loader  用于将引入的样式插入到HTML中 
    //main.js
    import './style.css';//使用require导入css文件
    {
      test: /\.css$/,
      use: [
        'style-loader', 
        { 
          loader: 'css-loader',
          options: {
            modules: true  // 开启模块化,即样式不会互相影响 
              // 若需要有全局的样式则在CSS中  :global(selector){...}
          }
        }
      ]
    },
  less-loader   '.less'文件处理 
    less-loader会自动将'@import'引入的css属性增加浏览器前缀 
  sass-loader   '.sass'文件处理 
    { 
      test: /\.scss$/,
      use: 'style-loader!css-loader!sass-loader'
    },
  file-loader   接收并加载任何文件,然后将其输出到构建目录  
    import iconSrc from './my-image.png'
    var myIcon = new Image();
    myIcon.src = iconSrc;
    { 
      test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/, // 处理字体文件
      use: 'file-loader'
    },
  url-loader    在JS中处理引入的图片文件 
    { 
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: { 
        loader: 'url-loader',
        options: {
          limit: 8192, // 限制图片大小 8192B,否则转换为 base64格式
          name: 'images/[name]-[hash].[ext]' // 超出限制,创建的文件  
        }
      }
    },
  vue-loader    把'.vue'文件转换成webpack包,和整个打包过程融合起来 
    在Webpack的'loader API'基础上开发,可用'.vue'单文件格式来写Vue组件 
    VueJS支持对组件的异步加载,配合Webpack的分块打包功能,可轻松实现组件的异步按需加载;
    默认情况,vue-loader是自动用css-loader 
    { 
      test: /\.vue$/,
      use: 'vue-loader',    
      options: {
        loaders: {
          // <style lang="less">
          less: 'vue-style-loader!css-loader!less-loader',               
          // <style lang="scss">
          scss: 'vue-style-loader!css-loader!sass-loader',               
          // <style lang="sass">
          sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax', 
        },
      },
    },
  xml-loader    处理'.xml'文件 
  json-loader   处理'.json'文件 [webpack2+已内置,无需再安装] 
    var aoo = require('./aoo.json');  
  ★单独的平台
  babel        允许使用ES6及JSX语法 
    $ npm i -D babel-loader babel-core babel-preset-env 
      babel-loader     用于让webpack知道如何运行babel 
      babel-core       做编译器,如何解析代码 
      babel-preset-env 可根据环境的不同转换代码 
    ".babelrc"babel的专属配置文件 
      PS: Babel其实可以完全在'webpack.config.js'中进行配置
        webpack会自动调用'.babelrc'里的babel配置选项 
      {
        "presets": ["react", "es2015"]
      }
    { 
      test: /(\.jsx|\.js)$/,
      use: 'babel-loader',
      exclude: /node_modules/, // 不包括路径
      options: {
        presets: ['latest',"es2015","react"], // 指定将会编译的版本 
          // 采用query的形式: loader: 'babel-loader?presets[]=es2015&presets[]=react',
        plugins: ['syntax-dynamic-import'],
        cacheDirectory: true,    // 缓存结果
        // 可在npm的 package.json 中 指定
        // "babel" : { "presets" : ["latest"] }
        // 从而取消在此处指定'options'项
      }
    }
  postcss      处理CSS文件 
    $ npm i -D postcss-loader autoprefixer 
    'postcss.config.js'postcss配置文件 
      module.exports = {
        plugins: [
          require('autoprefixer')
        ]
      }
    { 
      test: /\.css$/,
      use: "postcss-loader",
    } 
'Plugins'插件: 扩展webpack的功能 
  PS: 目的在于解决'loader'无法实现的其他事,可能会配合'loaders'来使用  
    可在一个配置文件中因不同目的而多次使用同一插件 
  'webpack.config.js'中的'plugins'配置 
    var webpack = require('webpack'); // 用于访问内置的插件 
    var htmlWebpackPlugin = require("html-webpack-plugin"); // 引入插件 
    ...
    'plugins': [ //webpack3.0的范围提升 
      new webpack.optimize.UglifyJsPlugin(),
      new htmlWebpackPlugin({
        ...
      }),
    ],
  ◆内建插件
  webpack.ProvidePlugin   把一全局变量导入所有的代码中[只有使用时才会被加载进来]  
    new webpack.ProvidePlugin({
      '$': "jquery",
      'jQuery': "jquery",
      // JS中 import $ from 'jquery'不再需要,'$''jQuery'可直接使用  
    })
    [module, child, ...children?]数组形式,从模块中导出具体属性方法 
      // 从'TypeScript'的'tslib package'包中导入函数' __assign'
      '__assign': ['tslib', '__assign'],
  webpack.HashedModuleIdsPlugin    构建后的公共库模块的名称不改变 
    new webpack.HashedModuleIdsPlugin()
  webpack.optimize.UglifyJsPlugin  压缩JS 
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false, // 是否删除警告信息 
      },
      mangle: {}, // 代码混淆,默认是开启的 
      except: ['$super','exports','$'], // 排除关键字 
    })
  webpack.optimize.CommonsChunkPlugin    提取公共模块 
    new webpack.optimize.CommonsChunkPlugin({
      name: 'aoo',  // 指定提取出公共部分打包后文件的名称 
      names: ['aoo', 'manifest'],
        // manifest文件是将每次打包都会更改的东西单独提取出来,用于加快打包速度
      minChunks: 2, //公共模块被使用的最小次数 
        // 配置为2,即一个模块被使用2次及以上时才会被提取出来作为common chunks
        Infinity 
      children:true, // 可选,若为true,那么公共组件的所有子依赖都将被选择进来
      filename: 'vendor.js',
    })
    Example: 提取公共模块 
      修改entry入口文件
      entry: {
        app: path.resolve(APP_PATH, 'index.js'),
        vendors: ['jquery', 'moment'] //添加要打包在vendors里面的库
      },
      plugins: [
        //把入口文件里面的数组打包成verdors.js
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
      ]
  webpack.DefinePlugin          生成全局变量 
    plugs: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("process.env.NODE_ENV")
      })
    ]
  webpack.BannerPlugin          给打包后代码添加声明 
    new webpack.BannerPlugin('版权所有,翻版必究') 
  webpack.HotModuleReplacementPlugin  热加载 
    需在'webpack-dev-server'的配置中启用'hot'参数,
    还需要在JS模块中执行Webpack提供的API才能实现热加载 
    new webpack.HotModuleReplacementPlugin() //热加载插件 
  ◆常用插件 
  'html-webpack-plugin'    在分发目录新建HTML文件 
    PS: 可能配置多个从而创建多个HTML文件 
    $ npm i -D html-webpack-plugin 
    new htmlWebpackPlugin({  
      template: './aoo.html' , // 指定html模版,复制到output.path目录中 
      chunks: ['main','a'],    // 指定加载的打包后的文件,默认加载所有 
        // 数组中的名称对应'entry.key' 
      filename: 'aoo-[hash].html', // 指定生成的HTML名称,默认为'index.js'  
      title: '标题', // 指定标题 
      favicon: './favicon.ico',  // 指定favicon 
      inject: 'head',  // 指定打包后的文件插入的位置,
        // 'head'   <head>中
        // 'body'   <body>内部尾部 
        // false    不放入到指定模版生成的文件中
      minify: {  // 对按照模版生成的文件进行压缩
        removeComments : true ,     // 删除注释
        collapseWhitespace : true , // 删除空格 
      } , 
      excludechunks: ['b'], // 指定不加载的打包文件 
      hash: true,
      'aoo': 'boo',   // 自定义的属性,可在指定的模版文件中引用 
        // 模版文件中 方式为 <%= htmlWebpackPlugin.options.aoo %>
    }),
    在模版文件中使用'htmlWebpackPlugin' 
      遍历取值 
        遍历 htmlWebpackPlugin 
          <% for(key in htmlWebpackPlugin){%>  // 运行代码不需要'='
            <%= key %>  // 取值需要'='
          <% } %>
          得到 files 和 options 两个对象
        遍历 htmlWebpackPlugin.files 和 htmlWebpackPlugin.options
          <% for(key in htmlWebpackPlugin.files){%>
            <%= key %> : <%= JSON.stringify(htmlWebpackPlugin.files[key])%> 
            // 通过 json.stringify 将对象内容字符串化
          <% } %>
          <% for(key in htmlWebpackPlugin.options){%>
            <%= key %> : <%= JSON.stringify(htmlWebpackPlugin.options[key])%> 
          <% } %>
      在模版中指定的位置引入指定打包后的文件 
        <script src="<%= htmlWebpackPlugin.files.chunk.xx.entry %>" charset="utf-8"></script>
        其中'xx'为'webpack.config.js'文件中'module.exports.entry.key'定义的文件 
      在模版中插入打包后的文件的内容
        <script  type='text/javascript'>
          <%= compilation.asserts[
            htmlWebpackPlugin.files.chunks.main.entry
            .substr(htmlWebpackPlugin.files.publicPath.length)
          ].source() %>
        </script>
  'extract-text-webpack-plugin'   提取css文件到单独的文件 
    $ npm i -D extract-text-webpack-plugin  
    var ExtractTextPlugin = require('extract-text-webpack-plugin');
    module: {
      rules: [
        { 
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: "css-loader",
                options: { 
                  modules: true 
                }
              }
            ],
            fallback: 'style-loader',
          })
        },
        { 
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            use: [
              { 
                loader: "css-loader",
                options: { 
                  modules: true
                }
              },
              { loader: "less-loader" }
            ],
            fallback: 'style-loader',
          })
        },
      ]
    },
    plugins: [
      new ExtractTextPlugin({ 
        filename: 'css/[name].[hash].css', 
        allChunks: true 
      })
    ]
  'optimize-css-assets-webpack-plugin' 压缩提取出的CSS并解决ExtractTextPlugin分离出的JS重复问题 
    plugs: [
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })  
    ]
  'CommonsChunkPlugin'            提取出公用模块 
    开发中需要将多个页面的公用模块独立打包,
    从而可以利用浏览器缓存机制来提高页面加载效率,减少页面初次加载时间,
    只有当某功能被用到时,才去动态的加载。
    
    var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
    module.exports = {
      entry: { 
        a: "./a", 
        b: "./b" 
      },
      output: { 
        filename: "[name].js" 
      },
      plugins: [ 
        new CommonsChunkPlugin("common.js"), 
      ]
    }
    在文件中根据下面的方式引用即可 
    <script src="common.js"></script> 
    <script src="a.js"></script> 
    <script src="b.js"></script> 
  'clean-webpack-plugin'    文件管理 
    npm i -D clean-webpack-plugin 
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    plugins: [
      new CleanWebpackPlugin(['dist'])  // 每次打包前会清理'dist'文件夹 
      new CleanWebpackPlugin([
        // 只删除 dist 文件夹下的 bundle 和 manifest 文件
        'dist/bundle.*.js',
        'dist/manifest.*.js'
      ], 
      {
        verbose: true, // 打印 log
        dry: false // 删除文件
      }),
    ]
  'uglifyjs-webpack-plugin'     代码精简压缩 
    PS: 可'tree shaking'用于描述移除JS上下文中的未引用代码'dead-code' 
      前提是使用ES2015模块语法即'import'和'export'  
    npm i -S uglifyjs-webpack-plugin 
    const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
    new UglifyJSPlugin({
      'sourceMap': true, // 启用'source-map'
    })
'webpack-dev-server'    静态资源服务器  
  PS: 基于Express框架的轻量开发服务器,会监听文件的变化在内存中实时打包 
  $ npm i -g webpack-dev-server  // 全局安装静态资源服务器 
  $ webpack-dev-server           // 将webpack项目在本地起服务 
  'webpack.config.js'中的配置 
    devServer: { 
      contentBase: './dist', // 指定加载页所在目录,默认为当前配置文件的目录 
      host: '127.0.0.1',  // 建议写IP地址,localhost可能有问题  
      port: 8081,   // 修改端口 
      inline: true, // 是否监控文件变化 
      overlay: { // 在网页显示错误和警告信息 
        errors: true,
        warnings: true,
      },
      hot: true,    // 是否启用模块热替换HMR'Hot Module Replacement 
      progress: true, // 
      compress: true, // enable gzip compression
      historyApiFallback: true, // true for index.html upon 404,object for multiple paths 
      https: false, // true for self-signed, object for cert authority
      noInfo: true, // only errors & warns on hot reload
      proxy: { // proxy URLs to backend development server
        '/api': 'http://localhost:3000'
      },
    },
  'package.json'中的启动配置 
    "scripts": { 
      "dev": "webpack-dev-server --open"
    },
'webpack-merge'通用配置工具: 提取开发环境和生产环境的公用配置  
  npm i -S webpack-merge // 安装  
  新建文件如下,用于开发环境和生产环境的配置  
  webpack.base.js  // 公共配置 
    module.exports = {
      entry: {},
      output: {},
      plugins: [],
    };
  webpack.dev.js     // 开发环境 
    const merge = require('webpack-merge'); 
    const base = require('./webpack.base.js'); 
    module.exports = merge(base, { 
      devtool: 'inline-source-map', 
      devServer: { 
        contentBase: './dist', 
      }, 
    }); 
  webpack.prod.js    // 生产环境 
    const merge = require('webpack-merge'); 
    const base = require('./webpack.base.js'); 
    const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); 
    module.exports = merge(base, { 
      plugins: [ 
        new UglifyJSPlugin() 
      ] 
    }); 
  'package.json'文件命令配置  
    "dev": "webpack-dev-server --open --config webpack.dev.js",
    "prod": "webpack --progress --profile --colors --config webpack.prod.js"
代码分离 
  有三种常用的代码分离方法：
  入口起点：使用'entry'配置手动地分离代码 
    最简单、最直观的分离代码的方式,但手动配置较多,且有一些陷阱 
  防止重复：使用'CommonsChunkPlugin'去重和分离chunk 
  动态导入：通过模块的内联函数调用来分离代码 
    使用符合ECMAScript提案的'import()'语法,import()调用会用到'promises',
    若浏览器不支持'Promise',需在首个'bundle'前引入'Promise polyfill'
    懒加载 : 需要时才'import()'引入,然后使用 
      button.onclick = (e) => import('./print').then((module) => {
        var print = module.default;
        print();
      });
--------------------------------------------------------------------------------
Parcel,Web应用打包工具 
  PS: 可使用任何类型的文件作为入口,但是最好还是使用 HTML 或 JS 文件 
    同时支持 CommonJS 和 ES6 两种模块语法来导入文件 
  步骤: 
    安装Parcel 
    $ npm i -g parcel-bundler 
    项目目录下创建'package.json'文件 
    $ npm init -y 
    打开文件并启动Web服务[支持热模块替换] 
    $ parcel index.html [-p <num>] 
      -p  指定端口 
--------------------------------------------------------------------------------
Babel转码器将ES6转换为ES5 
  配置文件'.babelrc' : 位于项目的根目录 
    文件配置  用来设置转码规则和插件
      {
        "presets": [  // 设定转码规则 
          "latest",
          "react",
          "stage-2"
        ],
        "plugins": []
      }
      官方提供了以下的规则集,可以根据需要安装 
        # 最新转码规则
        $ npm install --save-dev babel-preset-latest
        # react 转码规则
        $ npm install --save-dev babel-preset-react
        # 不同阶段语法提案的转码规则[共有4个阶段],选装一个
        $ npm install --save-dev babel-preset-stage-0
        $ npm install --save-dev babel-preset-stage-1
        $ npm install --save-dev babel-preset-stage-2
        $ npm install --save-dev babel-preset-stage-3
  'babel-cli'命令行编译 
    npm install --global babel-cli   #安装
    基本用法 
      babel example.js  # 转码结果输出到标准输出
      babel example.js --out-file compiled.js  # 转码结果写入一个文件
        # 或者
        babel example.js -o compiled.js
        # --out-file 或 -o 参数指定输出文件
      babel src --out-dir lib     # 整个目录转码
        # 或者
        babel src -d lib
        # --out-dir 或 -d 参数指定输出目录
      babel src -d lib -s   # -s 参数生成source map文件
  'babel-cli'项目中安装 
    PS:全局环境下,进行 Babel 转码意味着,若项目要运行,全局环境必须有 Babel,
      也就是说项目产生了对环境的依赖。
      另一方面,这样做也无法支持不同项目使用不同版本的 Babel。
    npm install --save-dev babel-cli   #安装
    配置'package.json' 
      {
        // ...
        "devDependencies": {
          "babel-cli": "^6.0.0"
        },
        "scripts": {
          "build": "babel src -d lib"
        },
      }
    npm run build         #执行命令转码 
-------------------------------------------------------------------------待整理  


