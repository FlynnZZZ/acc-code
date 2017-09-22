本地服务器搭建  
'xampp'搭建本地服务器 
  修改服务器根目录指向'httpd.conf'文件
    DocumentRoot "E:/project/"                             1
    <Directory "E:/project/">                              2
      Options Indexes FollowSymLinks Includes ExecCGI
      AllowOverride All
      Require all granted
    </Directory>
  虚拟主机的配置'httpd-vhosts.conf'文件 
    <VirtualHost *:80>                                     
      ServerAdmin webmaster@dummy-host2.example.com
      DocumentRoot "E:/project/"            3
      ServerName    project.localtst.com                   4
      ErrorLog "logs/dummy-host2.example.com-error.log"
      CustomLog "logs/dummy-host2.example.com-access.log" common
    </VirtualHost>
  设置本地 Hosts
    127.0.0.1    project.localtst.com                      5
    // 127.0.0.2  上文配置虚拟主机时 VirtualHost 的回送 IP
  共修改'3'个文件'5'个位置
'nginx'配置步骤及说明 
  PS: Nginx"engine x"是一个高性能的HTTP和反向代理服务器,也是一个IMAP/POP3/SMTP服务器 
    特点是占有内存少,并发能力强  
  配置文件内容说明  
    Nginx的配置文件是conf文件下的'nginx.conf'
    默认网站根目录为'/usr/local/nginx/html' 
    server {
      listen 80;             // 当前的代理服务器监听的端口
      server_name localhost; // 监听到之后转到的地方 
      #charset koi8-r;
      #access_log logs/host.access.log main;
      location / {  // 匹配的路径,配置了/表示所有请求都被匹配到这里 
        root E:\home\www;  // root 表示当匹配这个请求的路径时,将会在这个文件夹内寻找相应的文件
        index index.html index.htm; // 未指定主页时,默认选择的文件,可有多个,并按顺序加载
        // 如果第一个不存在,则找第二个,依此类推。
      }
    #error_page 404 /404.html;
    # redirect server error pages to the static page /50x.html
    #
    error_page 500 502 503 504 /50x.html;  // 错误的页面 
    location = /50x.html {
      root html;
    }
    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #  proxy_pass http://127.0.0.1;
    #}
    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    # root html;
    # fastcgi_pass 127.0.0.1:9000;
    # fastcgi_index index.php;
    # fastcgi_param SCRIPT_FILENAME /scripts$fastcgi_script_name;
    # include fastcgi_params;
    #}


    location = /50x.html {
    root html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    # proxy_pass http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    # root E:\home\www;
    # fastcgi_pass 127.0.0.1:9000;
    # fastcgi_index index.php;
    # fastcgi_param SCRIPT_FILENAME /scripts$fastcgi_script_name;
    # include fastcgi_params;
    #}
  手机访问 
    手机和PC处于同一个局域网内 
    访问PC IP 即可 
'http-server' [详见npm]
-------------------------------------------------------------------------------
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
  相关命令 
    $ npm i -g gulp   // 全局安装gulp 
    $ npm i -D gulp   // 项目中安装并写入开发依赖 
'gulpfile.js'配置文件[项目根目录创建] 
  var gulp = require('gulp'),  // 加载插件 
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');
    
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
    taskArr   可选,其他任务组成的数组,执行本次任务前将先执行并完成任务数组内的任务 
    foo([cb]) 回调函数  
      cb()   // 完成 task 
    任务的执行顺序 
      默认的任务将以最大的并发数执行,即gulp会一次性运行所有的task且不做任何等待 [?] 
      gulp.task('aoo',['one','two']); 若任务间没有依赖,会按书写顺序执行 
        如果有依赖的话则会先执行依赖的任务。
      如果某任务所依赖的任务是异步的,gulp并不会等待依赖的异步任务完成,而是接着执行后续任务 
        gulp.task('one',function(){
          setTimeout(function(){ // 一个异步执行的任务
            console.log('one is done')
          },5000);
        });
        //two任务虽然依赖于one任务,但并不会等到one任务中的异步操作完成后再执行
        gulp.task('two',['one'],function(){ 
          console.log('two is done');
        });
      等待异步任务中的异步操作完成后再执行后续的任务的方法 
        
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
  del        删除文件,原生的node模块  
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
  gulp-less      编译less 
    $ npm i -D gulp-less  
  gulp-ruby-sass     编译sass  
  gulp-autoprefixer  自动添加css前缀 
  gulp-minify   可压缩js脚本,css样式,html文档,json数据,jpg、png和gif图片 
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
  gulp-minify-css    压缩css 
  gulp-uglify        压缩js代码
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
  gulp-concat        合并js文件 
  gulp-base64        把小图片转成base64字符串 
  gulp-clean         文件删除 
    gulp.task('clean',function () {    //删除dist目录下的所有文件
      gulp.src('dist/*',{read:false})
      .pipe(clean());
    });
  gulp-jshint        js代码校验
  gulp-livereload    自动刷新页面
  gulp-cache         图片缓存,只有图片替换了才压缩 
  gulp-notify        更改提醒
  gulp-rev           对css、js文件名加MD5后缀
  gulp-rev-collector 路径替换
  gulp-rename        改变文件名 
----------------------------------------------------------------------以下待整理


