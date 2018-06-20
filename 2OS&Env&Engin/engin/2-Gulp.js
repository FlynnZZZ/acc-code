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
配置文件: 'gulpfile.js'
  PS: 项目根目录创建 
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
--------------------------------------------------------------------------------












