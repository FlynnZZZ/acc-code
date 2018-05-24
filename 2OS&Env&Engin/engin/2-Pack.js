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


