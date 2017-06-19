●AngularJS 
  PS：诞生于2009年,优秀的前端JS框架,已经被用于Google的多款产品当中 
    最为核心的是：MVC、模块化、自动化双向数据绑定、语义化标签、依赖注入等等 
  概念类
    指令: 通过被称为指令的新属性来扩展HTML,为应用添加功能,允许自定义指令.
      带有前缀ng- 
      ng-app 指令初始化一个AngularJS应用程序
      ng-init 指令初始化应用程序数据
      ng-model 指把元素值(比如输入域的值)绑定到应用程序
  ◆四大核心特性
  MVC,Model Controller View
    PS：MVC 只是手段,目的是模块化和复用
      model :数据模型层;
      view :视图层,负责展示;
      controller:业务逻辑和控制逻辑.
    $scope 
      PS：MVC 是借助$scope实现的 
        是一个POJO,Plain Old JavaScript Object 
        提供了一些工具方法 $watch() $apply() 
        是表达式的执行环境,也叫作用域 
        是一个树型结构,与DOM标签平行 
        子$scope对象会继承父$scope上的属性和方法 
        每个Angular应用只有一个根$scope对象,一般位于ng-app上 
        可以传播事件,类似DOM事件,可以向上也可以向下 
        不仅是MVC的基础,也是实现双向数据绑定的基础 
        可以使用angular.element($0).scope()进行调试 
components 组件 
  全生命周期支持
directives 指令
  PS：指令可以自定义
  属性指令: 改变组件模板的外观或行为,如样式等
  结构指令: 改变组件模板的DOM结构,如插值或移除DOM节点
services   服务 : 实现专一目的的逻辑单元,如日志服务
dependency injection 依赖注入: 组件引入外部构建「如服务」的一种机制
metadata 元数据
templates 模板
  框架代码以模块形式组织 「文件模块」
    core    核心模块
    common  通用模块
    forms   表单模块
    http    网络模块
    ... 
    模块的引入
      e.g.: 
        import {Http} from "@angular/http"
        import {Component} from "@angular/core" // @Component 装饰器
        import {Directive} from "@angular/core" // @Directive 装饰器
  功能单元以模块形式组织 「应用模块」
data binding 数据绑定
modules 模块 
todo 
  模块化 
    PS：一切由模块开始
    路由
      使用ngRoute进行视图之间的路由
      e.g. :
      $routeProvider.when('/hello',{
        templateUrl:'tpls/hello.html',
        controller:'HelloCtrl'
      }).when("/list",{
        templateUrl:"tpls/bookList.html",
        controller:"BookListCtrl"
      }).otherwise({
        redirectTo:'/hello'
      })
    模块
      定义模块 
        var mod =angular.module("modName",[]); // 创建模块
        // 创建控制器
        mod.controller("contrName",["$scope",function($scope){
        };])
    依赖注入
      模块之间有依赖,使用依赖注入来决解
      e.g. :
      var bookStoreApp =angular.module("bookStoreApp",[
        'ngRoute',"ngAnimate","bookStoreCtrls","bookStoreFilters"
      ])
  指令系统 
    AngularJS内置指令 共63个
      ng-app
      
      ng-controller
      
      ng-class
      ng-show
      ng-hide
      
      ng-click
      
      ng-view
  双向数据绑定 
    数据模型到视图,视图到数据模型.
    取值表达式 {{}}
--------------------------------------------------------------------------------
●VueJS  数据驱动,组件化开发模式,渐进式前端框架
  PS：支持IE9+,因vue使用了ES5特性;非压缩版有错误提示和警告,而压缩版则没有;
    API设计受 AngularJS、KnockoutJS、RactiveJS 和 RivetsJS 影响;
    Vue没有完全遵循MVVM格式,但其设计受到了它的启发;
  与jQuery对比 
    JQ在业务复杂时,复杂程度急剧增加,
    vue采用mvvm的方式,双向绑定,可专注于业务逻辑,开发更快;
    JQ是命令式编程,而vue是声明式,开发会更快,debug也更方便[HTML CSS 都是声明式] 
安装|启动 
  使用<script>标签直接引用VueJS 
    Vue被注册为一个全局变量
    e.g. : <script src="./vue.min.js" charset="utf-8"></script>
    
    异步组件 
      在不使用脚手架的情况下将一个个组件分别独立成一个个html文件,
      再去引用注册它们,也是可以实现的,但一般不推荐这样做。
      vue.js 可以将异步组件定义为一个工厂函数
      e.g.：
        新建一 head.html
          <div> 这是头部  </div>
        在 index.html 中异步引入 head.html 作为组件
          <div id="app1">
            <head-com></head-com>
          </div>
          Vue.component('head-com', function (resolve, reject) {
            $.get("./head.html").then(function (res) {
              resolve({
                template: res
              })
            });
          });
          var app1 = new Vue({
            el: '#app1'
          });
  命令行 npm 和 webpack 构建项目 
    ◆安装工具 
    npm install -g webpack              全局安装webpack 
    npm install -g vue                  全局安装vue 
    npm install -g vue-cli              全局安装vue-cli [vue构建工具?]
      在安装Vue后就可以在命令行中使用'vue'命令了
      vue --version  // 查看Vue的版本 
    ◆创建项目 
    vue init webpack test1「项目名称」   创建基于'webpack'模版的新项目 
    cd  test1                           进入新创建的项目文件夹 
      文件夹中的 index.html 为项目的入口,且默认调用 src 下的 main.js  
      后续的开发都在该文件夹下的'src'文件夹下进行[且主要为 App.vue 文件]
    npm install                         安装依赖 
      默认会根据 package.json 文件中配置的依赖文件进行安装 
      增加'node_modules'文件夹 
    npm install vue-router vue-resource --save  安装路由模块和网络请求模块
    ◆启动项目 
    npm run dev                         启动Vue 
      启动本地服务,打开浏览器,运行项目
      默认执行 package.json 中 script 属性 dev 的配置
      运行安装时,eslint mocha 等等依赖,建议初学不安装
    ◆构建发布 
    npm run build                       运行构建,生成生产环境可发布的代码 
    webpack                             打包[直接运行] 
      webpack --color --progress 
    使用路由功能 
      npm install vue-router      安装路由
      配置路由
        在 main.js 里
        import Vue from 'vue'
        import VueRouter from 'vue-router'
        import App from './App'
    
        Vue.use(VueRouter);
        
        const routes = [
          { 
            path: '/',             // 首页默认重定向至Index路由
            redirect: '/index'
          },
          { 
            path: '/test', 
            component: resolve => require(['./components/test.vue'], resolve) 
          },
          { 
            path: '/index', 
            component: resolve => require(['./components/index.vue'], resolve) 
          }
        ];
        
        const router = new VueRouter({
          routes // （缩写）相当于 routes: routes,
        });
        
        // 4. 创建和挂载根实例。
        // 记得要通过 router 配置参数注入路由，
        // 从而让整个应用都有路由功能
        const app = new Vue({
          router,
          render: h => h(App)
        }).$mount('#app');
        
    安装 vue 路由模块vue-router和网络请求模块vue-resource 
      npm install vue-router vue-resource --save
        
    使用路由搭建单页应用
      
      之前已经通过命令安装了vue-router
      
      cnpm install vue-router --save
      在webpack.config.js加入别名
      
      resolve: {
          alias: {vue: 'vue/dist/vue.js'}
        }
      为什么要加 alias 配置项？其作用可以在文档中有相应的描述:查看图片修改完之后的webpack.config.js是这样子的:
      
      var path = require('path')
      var webpack = require('webpack')
      
      module.exports = {
        entry: './src/main.js',
        output: {
          path: path.resolve(__dirname, './dist'),
          publicPath: '/dist/',
          filename: 'build.js'
        },
        resolveLoader: {
          root: path.join(__dirname, 'node_modules'),
        },
        module: {
          loaders: [
            {
              test: /\.vue$/,
              loader: 'vue'
            },
            {
              test: /\.js$/,
              loader: 'babel',
              exclude: /node_modules/
            },
            {
              test: /\.(png|jpg|gif|svg)$/,
              loader: 'file',
              query: {
                name: '[name].[ext]?[hash]'
              }
            }
          ]
        },
        resolve: {
          alias: {vue: 'vue/dist/vue.js'}
        },
        devServer: {
          historyApiFallback: true,
          noInfo: true
        },
        devtool: '#eval-source-map'
      }
      
      if (process.env.NODE_ENV === 'production') {
        module.exports.devtool = '#source-map'
        // http://vue-loader.vuejs.org/en/workflow/production.html
        module.exports.plugins = (module.exports.plugins || []).concat([
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: '"production"'
            }
          }),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
          })
        ])
      }
      再按之前的方法写一个组件 secondcomponent.vue
      
      <template>
        <div>
          <h1>I am another page</h1>
          <a> written by {{ author }} </a>
          <p> 感谢 <a href="https://github.com/showonne">showonne</a>大神的技术指导</p>
        </div>
      </template>
      
      <script>
      export default {
        data() {
          return {
            author: "微信公众号 jinkey-love",
            articles: [],
          }
        }
        }
      }
      </script>
      
      <style>
      </style>
      这时候修改 main.js，引入并注册 vue-router
      
      import VueRouter from "vue-router";
      Vue.use(VueRouter);
      并且配置路由规则和 app 启动配置项加上 router，旧版的 router.map 方法在vue-router 2.0 已经不能用了。修改后的main.js如下:
      
      import Vue from 'vue'
      import App from './App.vue'
      import VueRouter from "vue-router";
      import VueResource from 'vue-resource'
      
      //开启debug模式
      Vue.config.debug = true;
      
      Vue.use(VueRouter);
      Vue.use(VueResource);
      
      // 定义组件, 也可以像教程之前教的方法从别的文件引入
      const First = { template: '<div><h2>我是第 1 个子页面</h2></div>' }
      import secondcomponent from './component/secondcomponent.vue'
      
      // 创建一个路由器实例
      // 并且配置路由规则
      const router = new VueRouter({
        mode: 'history',
        base: __dirname,
        routes: [
          {
            path: '/first',
            component: First
          },
          {
            path: '/second',
            component: secondcomponent
          }
        ]
      })
      
      // 现在我们可以启动应用了！
      // 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
      const app = new Vue({
        router: router,
        render: h => h(App)
      }).$mount('#app')
      这样子改完再打开浏览器看看。查看图片点击那两个链接试试，会发现<router-view></router-view>的内容已经展示出来，同时注意浏览器地址已经变更。查看图片另外，也可以把 App.vue 的内容写在 main.js 也是可以的不过不建议这么做查看图片
      
      如果你使用 vue1.0和0.7版本的 vue-router，请参照下面这个教程, 他整个系列都不错的，当然仅限于 vue1.0 :
      
      http://guowenfh.github.io/2016/03/28/vue-webpack-06-router/
      给页面加点动态数据
      
      这时候的页面都是静态的(数据在写程序的时候已经固定了不能修改)，而每个应用基本上都会请求外部数据以动态改变页面内容。对应有一个库叫 vue-resource 帮我们解决这个问题。使用命令行安装
      
      cnpm install vue-resource --save
      在 main.js 引入并注册 vue-resource:
      
      import VueResource from 'vue-resource'
      Vue.use(VueResource);
      我们在 secondcomponent.vue 上来动态加载数据添加一个列表:
      
      <ul>
            <li v-for="article in articles">
              {{article.title}}
            </li>
          </ul>
      在 data 里面加入数组 articles 并赋值为[]然后在 data 后面加入加入钩子函数 mounted(详细请参照官方文档关于 vue 生命周期的解析)，data 和 mount 中间记得记得加逗号
      
      mounted: function() {
          this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
              headers: {
      
              },
              emulateJSON: true
          }).then(function(response) {
            // 这里是处理正确的回调
      
              this.articles = response.data.subjects
              // this.articles = response.data["subjects"] 也可以
      
          }, function(response) {
              // 这里是处理错误的回调
              console.log(response)
          });
        }
      这里使用的是豆瓣的公开 GET 接口，如果接口是跨域的 POST 请求，则需要在服务器端配置:
      
      Access-Control-Allow-Origin: *        
        
    项目基本目录结构 
      bulid            构建的配置文件
      config           
      dist             打包构建好的代码
        static 
        index.html 
      node_modules     
      src              开发目录 
        assets         静态资源目录 
        components     组件目录 
        App.vue        主入口视图文件 
        main.js        主入口JS文件 
      static 
      index.html 
      package.json 
      ...
      
    webpack.config.js  webpack配置文件 
      在 webpack.config.js 中的配置
      module.exports = {
        entry: {
          'index': './vue/index/main.js',
        },
        output: {
          path: './public/bulid',
          filename: '[filename].js' // 可以多点切入
        },
        module: {
          loaders: [
            {
              test: /\.vue$/,
              exclude: /node_modules/,
              loader: vue.withLoaders({
                js: 'babel?optional[]=runtime'
              })
            },
            { test: /\.scss$/, loader: 'style!css!sass' },
            { test: /\.css$/, loader: "style!css" },
            { test: /\.js$/, loader: 'babel-loader' }
          ]
        },
        resolve: { // 解决 npm 的依赖问题
          modulesDirectories: ['node_modules'],
          extensions: ['', '.js', '.json']
        },
      }      
View,视图   Vue实例管理的DOM节点 
  当一Vue实例被创建时,它会递归遍历根元素的所有子节点,同时完成必要的数据绑定,
  当视图被编译后,它就会自动响应数据的变化,
  使用VueJS时,除了自定义指令,几乎不必直接接触 DOM,
  当数据发生变化时,视图将会自动触发更新,
  这些更新的粒度精确到一个文字节点,
  同时为了更好的性能,这些更新是批量异步执行的;
Model,模型  一个轻微改动过的原生JS对象 
  VueJS 中的模型就是普通的 JavaScript 对象——也可以称为数据对象。
  一旦某对象被作为Vue实例中的数据,它就成为一个 “反应式” 的对象了。
  可操作它们的属性,同时正在观察它的 Vue 实例也会收到提示。
  VueJS把数据对象的属性都转换成了ES5中的 getter/setters,
  以此达到无缝的数据观察效果：无需脏值检查,也不需要刻意给 Vue 任何更新视图的信号。
  每当数据变化时,视图都会在下一帧自动更新。
  Vue实例代理了它们观察到的数据对象的所有属性。
  所以一旦一个对象 { a: 1 } 被观察,那么 vm.$data.a 和 vm.a 将会返回相同的值,
  而设置 vm.a = 2 则也会修改 vm.$data。
  数据对象是被就地转化的,所以根据引用修改数据和修改 vm.$data 具有相同的效果。
  这也意味着多个 Vue 实例可以观察同一份数据。
  在较大型的应用程序中,我们也推荐将 Vue 实例作为纯粹的视图看待,
  同时把数据处理逻辑放在更独立的外部数据层。
  一旦数据被观察,VueJS 就不会再侦测到新加入或删除的属性了。
  作为弥补,我们会为被观察的对象增加 $add, $set 和 $delete 方法。
var vm = new Vue(params);  创建Vue实例[ViewModel,简称vm],声明式渲染 
  PS： VueJS的核心,采用简洁的模板语法来声明式的将数据渲染进DOM的系统;
    VueJS应用都是通过构造函数Vue创建一个Vue的根实例启动的;
    所有的VueJS组件其实都是被扩展的Vue实例;
    在params中的方法中 this 表示的即为 vm;
  ◆params   用于配置vm的参数对象 
    包括数据、模板、挂载元素、方法、生命周期钩子等选项 
  'el' : 'slct'    必选,指定Vue接管的元素 
    slct 选择器,当为class选择器时,若存在多个该class,则只接管第一个
  'data' : val     可选,vm的数据模型 
    PS：Vue实例默认代理其'data'对象,在params中使用 this 表示'data'对象;
    val 为 obj 或 function(){ return obj }
    e.g.：
      var obj = { a: 1 };
      var vm = new Vue({
        data: obj
      });
      console.log(vm.a === obj.a); // true
      // 设置属性也会影响到原始数据
      vm.a = 2;
      console.log(obj.a); // 2
      // 修改样式数据也会影响到data对象
      obj.a = 3;
      console.log(vm.a); // 3
      若在实例创建之后添加新的属性到实例上,它不会触发视图更新
    双向数据绑定 
      view层为 HTML DOM, model层为 vue实例,
      vuejs[使用v-model这个指令]完成中间的底层逻辑,实现绑定的效果, 
      改变其中的任何一层,另外一层都会改变 
      e.g.:
        HTML
        <div id="test">
          <p>{{ message }}</p>
          <input v-model="message">
        </div>
        JS
        new Vue({
          el: '#test',
          data: { 
            message: '菜鸟教程!', 
          }
        });
    不能改变data变量,因为这样完全破坏了data与vm的引用关系
      <div>{{age}}</div>  
      var userInfo = {name:'Kyle Hu',age:20}
      ……
      data: userInfo
      …… 
        
      userInfo.age = 15; // DOM渲染成15
      vm.age = 16; // DOM渲染成16
      userInfo = {name:'Kyle Hu',age:22}; // 引用关系被破坏,DOM不会重新渲染
      userInfo.age = 25; // 引用关系被破坏,DOM不会重新渲染
      vm.age = 23; // DOM被渲染成23
  'methods':val    可选,vm的方法 
  'computed':val   可选,vm的计算方法 
    PS：相当于经过处理的data数据,在第一次取值时进行计算「SlPt」
    val  包含方法的对象,其方法名可作为类似于data的属性名使用  
      computed : {
        cmptFoo1 : function(arg){
          // 
        }
      }
    e.g.：
      在模板中放入太多的逻辑会让模板过重且难以维护
      <div id="example"> {{ message.split('').reverse().join('') }} </div>
      采用方法返回值的形式,将逻辑转移的vm中
      <div id="example1">
        <p>Original message: "{{ message }}"</p>
        <p>Computed reversed message: "{{ rvsMsg }}"</p>
      </div>
      var vm = new Vue({
        el: '#example1',
        data: { message: 'Hello' },
        computed: {
          rvsMsg: function () {
            return this.message.split('').reverse().join('')
          }
        }
      });
      控制台中修改vm  vm.rvsMsg 的值始终取决于 vm.message 的值,
      当 vm.message 发生改变时,依赖于 vm.rvsMsg 的绑定也会更新;
    setter 
      PS：计算属性默认只有 getter,需要时也可提供 setter;
        computed的方法依赖于实例中data数据[但不会改变data数据],
        若希望computed的方法改变也会引起data数据的改变,需为之创建一个setter
      // ...
      computed: {
        fullName: {
          // getter
          get: function () { 
            return this.firstName + ' ' + this.lastName 
          },
          // setter
          set: function (newValue) {
            var names = newValue.split(' ')
            this.firstName = names[0]
            this.lastName = names[names.length - 1]
          }
        }
      }
      // ...
      运行 vm.fullName = 'John Doe' 时,setter会被调用,
      vm.firstName 和 vm.lastName 也会被对应更新 
  'watch' :val     可选,vm的数据监听方法 
    e.g.：
      var vm = new Vue({
        data: {
          a: 1,
          b: 2,
          c: 3
        },
        watch: {
          a: function (val, oldVal) {
            console.log('new: %s, old: %s', val, oldVal)
          },
          // 方法名
          b: 'someMethod',
          // 深度 watcher
          c: {
            handler: function (val, oldVal) { /* ... */ },
            deep: true
          }
        }
      })
      vm.a = 2 // -> new: 2, old: 1
    todo
      当想要在数据变化响应时,执行异步操作或开销较大的操作,很有用的。
      <div id="watch-example">
        <p> 
          Ask a yes/no question:
          <input v-model="question">
        </p>
        <p>{{ answer }}</p>
      </div>
      <script src="https://unpkg.com/axios@0.12.0/dist/axios.min.js"></script>
      <script src="https://unpkg.com/lodash@4.13.1/lodash.min.js"></script>
      <script>
      var watchExampleVM = new Vue({
        el: '#watch-example',
        data: {
          question: '',
          answer: 'I cannot give you an answer until you ask a question!'
        },
        watch: {
          // 若 question 发生改变,这个函数就会运行
          question: function (newQuestion) {
            this.answer = 'Waiting for you to stop typing...'
            this.getAnswer()
          }
        },
        methods: {
          // _.debounce 是一个通过 lodash 限制操作频率的函数。
          // 在这个例子中,我们希望限制访问yesno.wtf/api的频率
          // ajax请求直到用户输入完毕才会发出
          // 学习更多关于 _.debounce function (and its cousin
          // _.throttle),参考: https://lodash.com/docs#debounce
          getAnswer: _.debounce(
            function () {
              var vm = this
              if (this.question.indexOf('?') === -1) {
                vm.answer = 'Questions usually contain a question mark. ;-)'
                return
              }
              vm.answer = 'Thinking...'
              axios.get('https://yesno.wtf/api')
              .then(function (response) {
                vm.answer = _.capitalize(response.data.answer)
              })
              .catch(function (error) {
                vm.answer = 'Error! Could not reach the API. ' + error
              })
            },
            // 这是我们为用户停止输入等待的毫秒数
            500
          )
        }
      })
      </script>
      结果：
      Ask a yes/no question: are you ok?
      Yes
      该示例中,使用 watch 选项执行异步操作[访问一个 API],
      限制执行该操作的频率,并在得到最终结果前,设置中间状态。
      这是计算属性无法做到的。
      除了 watch 选项之外,还可以使用 vm.$watch API 命令
  'components':val 可选,vm的组件 
    e.g.: 
      HTML中
      <cpt1></cpt1>
      // HTML中不区分大小写,须将驼峰写法转换成'-'连接的方式
      JS中
      import cpt1 from 'path';    // 引入组件
      ...
      new Vue({
        ...
        components : {cpt1,cpt2,..},   // 在Vue中注册 
        // 相当于 
        // components : {
        //   cpt1 : 'cpt1',
        //   cpt2 : 'cpt2',
        //   ..
        // }
      })
  'filters' : val  可选,定义过滤器 
    val  包含过滤器函数的对象
      {
        ftFoo1 : function(val){
          // 
        }
      }
  'props'  : val   可选,作为组件时[在 .vue 格式文件中],注册标签属性,同父组件通信 
    PS：在父组件中插入该子组件时,并添加子组件注册的attr,通过attr的值来向子组件传递信息,
      在vm实例中可通过 this.attr 来获取值,HTML中 attr 可直接获取值
    val  ['attr1','attr2',..] 
  'mounted': foo   可选,模型渲染后 
    使用 mounted 并不能保证钩子函数中的 this.$el 在 document 中。
    为此还应该引入 Vue.nextTick/vm.$nextTick。例如：
    mounted: function () {
      this.$nextTick(function () {
        // 代码保证 this.$el 在 document 中
      })
    }
  ...
  ◆vm.$xx [带有前缀$的]实例方法与属性[用于访问选项对象里的属性] 
    PS：vm.xx 代理的是data中的属性,则使用 vm.$xx 访问如el,data等在选项对象里的属性;
    ★实例属性
      e.g.：
        var obj = { a: 1 };
        var vm = new Vue({
          el: '#test',
          data: obj,
        });
        vm.$data === obj;  // true
        vm.$el === document.getElementById('test'); // true
    vm.$el      实例接管的DOM对象
    vm.$data    实例的data
    ★实例方法
    vm.$watch('val', foo)  监控元素改变的方法
      val 为data对象中的属性值
      foo 依次传入函数 (newVal, oldVal) 
      e.g.：
        vm.$watch('a', function (newVal, oldVal) {
            // 这个回调将在 `vm.a`  改变后调用
        })
  vm.$data    vm的数据对象
  vm.$el      vm接管的DOM对象
  vm.$watch('val',function(newVal,oldVal) { }); 回调在 vm.val 改变后调用
    不要在实例属性或者回调函数中使用箭头函数 
    如 vm.$watch('a',newVal => this.myMethod())
    因为箭头函数绑定父上下文,所以 this 不会像预想的一样是Vue实例,
    而是 this.myMethod 未被定义;
  e.g.：
    HTML
    <div id="test"> {{ message }} </div>
    JS
    var test = new Vue({
      el: '#test',
      data: { 
        message: 'Hello Vue!', 
      }
    })
    渲染为 
    <div id="test"> Hello Vue! </div>
  Exp：
    后续使用data中不存在的的数据的决解办法 
      在data中声明
      Vue.set(obj,key,val) 全局声明 
      vm.$set(obj,key,val) 局部声明
        在vm实例的的方法中将'vm'改为 this 
Lifecycle_hooks,生命周期钩子 
  PS：钩子：某个阶段开始或者结束之前、之后等过程中被触发的函数,
    每个Vue实例在被创建之前都要经过一系列的初始化过程, 
    如实例需要配置数据观测[data observer]、编译模版、挂载实例到 DOM,
    然后在数据变化时更新 DOM,
    在这个过程中,实例也会调用一些 生命周期钩子,提供了执行自定义逻辑的机会,
    组件的自定义逻辑可以分布在这些钩子中[Vue无'控制器'的概念];
    钩子的 this 指向调用它的 Vue 实例;
  beforeCreate   
  created       创建实例 
    var vm = new Vue({
      data: {
        a: 1
      },
      created: function () {
        // `this` 指向 vm 实例
        console.log('a is: ' + this.a)
      }
    });
    //  "a is: 1"
  beforeMount   
  mounted       DOM渲染 [替换'1.x'版本的 ready ]
  beforeUpdate 
  updated       数据模型更新 
  activated     组件被激活时 
  deactivated   组件被移除时 
  beforeDestroy 
  destroyed     销毁观察、组件及事件 
var vmEx = Vue.extend(params); 扩展Vue构造器,用预定义选项创建可复用的组件构造器 
  PS： 所有的Vue组件其实都是被扩展的Vue实例
    在多数情况下建议将组件构造器注册为一个自定义元素,然后声明式地用在模板中。
var ve = new vmEx(params);
Directives,指令系统 用于model和view的交互 
  PS：将vm和 HTML DOM 进行关联,做为HTML标签的属性,让Vue对 DOM 元素做各种处理,
    职责为当其表达式的值改变时相应地将某些行为应用到 DOM 上;
  ◆数据渲染 
  v-text='key' 纯文本 
    e.g.：
      <div id="test" v-text='aoo'> </div>
      new Vue({
        el : '#test',
        data : {
          aoo : '<a href="#">作为文本出现</a>'
        }
      });
      渲染为 
      <div id="test">&lt;a href="#"&gt;作为文本出现&lt;/a&gt;</div>
  v-html='key' HTML文本 
    e.g.：
      <div id="test" v-html='aoo'> </div>
      new Vue({
        el : '#test',
        data : {
          aoo : '<a href="#">作为文本出现</a>'
        }
      });
      渲染为
      <div id="test"><a href="#">作为文本出现</a></div>
  v-model="key"  表单元素读写值 
    常见的表单如 input,checkbox,radio,select:
    e.g.：
      动态展示输入
      <div id="test">
        <p>{{ message }}</p>
        <input v-model="message">
      </div>
      var vm = new Vue({
        el: '#test',
        data: {
          message: 'Hello Vue!'
        }
      })    
  v-for='ph in keyObj'   渲染循环列表 
    ph 为自定义的占位符placeholder,keyObj的属性,便于后续使用 
      '(ph,key) in keyObj' 形式,使用下标占位符'key'
    e.g.：
      <div id="test">
        <ol>
          <li v-for="ph in dataKeyObj">
            {{ ph.text }}
            // 在插值中使用了 todo 
          </li>
        </ol>
      </div>
      var vm = new Vue({
        el: '#test',
        data: {
          dataKeyObj: [
            { text: '第一条' },
            { text: '第二条' },
            { text: '第三条' },
          ]
        }
      })
  v-once  一次性插值[配合插值使用] 
    当数据改变时,插值处的内容不会更新
    <span v-once>This will never change: {{ msg }}</span>
  ◆事件绑定
  v-on:eName='arg' 事件处理与绑定「简写'@eName'」
    arg 可以为 fooName() 或 简单表达式expression[一元或三元表达式] 
      fooName()  vm中的方法名称,当其无参数时可简写为fooName,需传参时为 fooName(arg1,arg2,..) 
      expression 事件响应时则执行该表达式 
    e.g.: 
      <div id="test">
        <p>{{ message }}</p>
        <button v-on:click="reverseMsg">逆转消息</button>
        // 可简写为 <button @click="reverseMsg">逆转消息</button>
      </div>
      var app5 = new Vue({
        el: '#test',
        data: {
          message: 'Hello VueJS!'
        },
        methods: {
          reverseMsg: function () {
            this.message = this.message.split('').reverse().join('');
          }
        }
      })    
  ◆显示控制 
  v-if:"key"    控制显示
    e.g.：
      <div id="test">
        <p v-if="seen">现在你看到我了</p>
      </div>
      var vm = new Vue({
        el: '#test',
        data: {
          seen: true
        }
      })
      在控制台设置 app3.seen = false 隐藏
  v-else:"key"  控制显示 
    PS：v-if用于条件判断,和v-else是一对
  v-show:'key'  作用与v-if类似 
    不同的是v-show的元素会始终渲染并保持在DOM中「使用的是display:none」,
    且v-show不支持<template>标签
  ◆属性控制
  v-bind:attrName='arg'  属性赋值「简写':attrName'」
    arg 为str时,表示属性attrName的值为str 
      <div id="app-2">
        <span v-bind:title="message">
        // 简写为 <span :title="message">
          鼠标悬停几秒钟查看此处动态绑定的提示信息！
        </span>
      </div>
      var app2 = new Vue({
        el: '#app-2',
        data: {
          message: '页面加载于 ' + new Date()
        }
      }); 
      // app2.message = '新消息';
      // 可通过更改 app2.message 的值来改变显示
    ★用于'class'和'style'属性时,参数可以是对象或数组
    arr   表示该class的值为该数组中的多个 
      其中数组中的值属于 params.data 
      e.g.：
        <div v-bind:class="[activeClass,errorClass]">
        data: {
          activeClass: 'active',
          errorClass: 'text-danger'
        }
        渲染为:
        <div class="active text-danger"></div>
      使用三元表达式,根据条件切换列表中的class  
        <div v-bind:class="[isActive ? activeClass : '',errorClass]">
        此例始终添加 errorClass ,但是只有在 isActive 是 true 时添加 activeClass 。
      可在数组语法中使用对象语法 
        <div v-bind:class="[{ active: isActive },errorClass]"> 
    obj   key为属性名,val可为属性的值、函数判断或简单表达式  
      动态地切换class 
        <div v-bind:class="{ active: isActive }"></div>
        class active 存在与否将取决于数据属性 isActive 是否为真值
      与普通的class属性共存 
        <div class="static" :class="{ active: isActive,'text-danger': hasError }">
        </div>
        data: {
          isActive: true,
          hasError: false
        }
        渲染为:
        <div class="static active"></div>
      可直接绑定数据属性里的对象 
        <div id="test" v-bind:class="dataKeyObj"></div>
        new Vue({
          el : '#test',
          data: {
            dataKeyObj: {
              active: true,
              'text-danger': false
            }
          }
        });
        渲染为
        <div id="test" class="active"></div>
      可为计算属性的方法[返回的对象] 
        <div v-bind:class="comptFoo"></div>
        data: {
          isActive: true,
          error: null
        },
        computed: {
          comptFoo: function () {
            return {
              active: this.isActive && !this.error,
              'text-danger': this.error && this.error.type === 'fatal',
            }
          }
        }      
  ◆指令的扩展
  Modifiers,修饰符 主要用于'v-on'与'v-model'指令,指出一个指令以特殊方式绑定 
    PS：修饰符是以点号'.'指明的特殊后缀;
    .prevent 修饰v-on,触发的事件调用 event.preventDefault() 
      <form v-on:submit.prevent="onSubmit"></form>
    .native  修饰v-on,监听原生事件 
      e.g.：<my-component v-on:click.native="doTheThing"></my-component>
    .enter   修饰v-on,按键为Enter键,
      如 @keyup.enter 表示当按键为Enter,keyup时响应,也可使用数字 .13 等价于 .enter
    .sync    对子组件props双向绑定 
      Vue1.x  中 .sync 对子组件props双向绑定
        当一个子组件改变了一个 prop 的值时,这个变化也会同步到父组件中所绑定的值。
        这很方便,但也会导致问题,因为它破坏了『单向数据流』的假设,会带来高的维护成本。
      Vue 2.0 中移除 .sync 
      Vue 2.3 加入,作为一个编译时的语法糖 
        只是让子组件改变父组件状态的代码更容易被区分
        会被扩展为一个自动更新父组件属性的 v-on 侦听器
        <comp :foo.sync="bar"></comp>
        会被扩展为：
        <comp :foo="bar" @update:foo="val => bar = val"></comp>
        当子组件需要更新 foo 的值时,它需要显式地触发一个更新事件：
        this.$emit('update:foo',newValue)
  Class 与 Style 绑定
    PS：数据绑定一个常见需求是操作元素的 class 列表和它的内联样式。
      因为它们都是属性 ,我们可以用v-bind 处理它们：只需要计算出表达式最终的字符串。
      不过,字符串拼接麻烦又易错。
      因此,在 v-bind 用于 class 和 style 时,VueJS 专门增强了它。
      表达式的结果类型除了字符串之外,还可以是对象或数组。
    绑定 HTML Class 
      对象语法
      我们可以传给 v-bind:class 一个对象,以动态地切换 class 。
        <div v-bind:class="{ active: isActive }"></div>
        上面的语法表示 classactive 的更新将取决于数据属性 isActive 是否为真值 。
      可以在对象中传入更多属性用来动态切换多个 class 。
      此外,v-bind:class 指令可以与普通的 class 属性共存。如下模板:
        <div class="static"
          v-bind:class="{ active: isActive,'text-danger': hasError }">
        </div>
        如下 data:
        data: {
          isActive: true,
          hasError: false
        }
        渲染为:
        <div class="static active"></div>
      当 isActive 或者 hasError 变化时,class 列表将相应地更新。
      例如,若 hasError 的值为 true ,class列表将变为 "static active text-danger"。
      你也可以直接绑定数据里的一个对象：
        <div v-bind:class="classObject"></div>
        data: {
          classObject: {
            active: true,
            'text-danger': false
          }
        }
        渲染的结果和上面一样。我们也可以在这里绑定返回对象的计算属性。这是一个常用且强大的模式：
        <div v-bind:class="classObject"></div>
        data: {
          isActive: true,
          error: null
        },
        computed: {
          classObject: function () {
            return {
              active: this.isActive && !this.error,
              'text-danger': this.error && this.error.type === 'fatal',
            }
          }
        }
    数组语法 
      我们可以把一个数组传给 v-bind:class ,以应用一个 class 列表：
      <div v-bind:class="[activeClass,errorClass]">
      data: {
        activeClass: 'active',
        errorClass: 'text-danger'
      }
      渲染为:
      <div class="active text-danger"></div>
      若你也想根据条件切换列表中的 class ,可以用三元表达式：
      <div v-bind:class="[isActive ? activeClass : '',errorClass]">
      此例始终添加 errorClass ,但是只有在 isActive 是 true 时添加 activeClass 。
      不过,当有多个条件 class 时这样写有些繁琐。可以在数组语法中使用对象语法：
      <div v-bind:class="[{ active: isActive },errorClass]">
    用在组件上 
      这个章节假设你已经对 Vue 组件 有一定的了解。当然你也可以跳过这里,稍后再回过头来看。
      当你在一个定制的组件上用到 class 属性的时候,这些类将被添加到根元素上面,这个元素上已经存在的类不会被覆盖。
      例如,若你声明了这个组件:
      Vue.component('my-component',{
        template: '<p class="foo bar">Hi</p>'
      })
      然后在使用它的时候添加一些 class：
      <my-component class="baz boo"></my-component>
      HTML 最终将被渲染成为:
      <p class="foo bar baz boo">Hi</p>
      同样的适用于绑定 HTML class :
      <my-component v-bind:class="{ active: isActive }"></my-component>
      当 isActive 为 true 的时候,HTML 将被渲染成为:
      <p class="foo bar active"></p>
    绑定内联样式 
      对象语法
        v-bind:style 的对象语法十分直观——看着非常像 CSS ,其实它是一个 JavaScript 对象。 CSS 属性名可以用驼峰式（camelCase）或短横分隔命名（kebab-case）：
        <div v-bind:style="{ color: activeColor,fontSize: fontSize + 'px' }"></div>
        data: {
          activeColor: 'red',
          fontSize: 30
        }
        直接绑定到一个样式对象通常更好,让模板更清晰：
        <div v-bind:style="styleObject"></div>
        data: {
          styleObject: {
            color: 'red',
            fontSize: '13px'
          }
        }
        同样的,对象语法常常结合返回对象的计算属性使用。
      数组语法
        v-bind:style 的数组语法可以将多个样式对象应用到一个元素上：
        <div v-bind:style="[baseStyles,overridingStyles]">
      自动添加前缀
        当 v-bind:style 使用需要特定前缀的 CSS 属性时,如 transform ,VueJS 会自动侦测并添加相应的前缀。
    条件渲染 
        
        v-if
        
        在字符串模板中,如 Handlebars ,我们得像这样写一个条件块：
        <!-- Handlebars 模板 -->
        {{#if ok}}
          <h1>Yes</h1>
        {{/if}}
        在 VueJS ,我们使用 v-if 指令实现同样的功能：
        <h1 v-if="ok">Yes</h1>
        也可以用 v-else 添加一个 “else” 块：
        <h1 v-if="ok">Yes</h1>
        <h1 v-else>No</h1>
        <template> 中 v-if 条件组
        
        因为 v-if 是一个指令,需要将它添加到一个元素上。但是若我们想切换多个元素呢？此时我们可以把一个 <template> 元素当做包装元素,并在上面使用 v-if,最终的渲染结果不会包含它。
        <template v-if="ok">
          <h1>Title</h1>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </template>
        v-else
        
        可以用 v-else 指令给 v-if 添加一个 “else” 块：
        <div v-if="Math.random() > 0.5">
          Sorry
        </div>
        <div v-else>
          Not sorry
        </div>
        v-else 元素必须紧跟在 v-if 元素或者 v-else-if的后面——否则它不能被识别。
        v-else-if
        
        2.1.0 新增
        v-else-if,顾名思义,用作 v-if 的 else-if 块。可以链式的多次使用：
        <div v-if="type === 'A'">
          A
        </div>
        <div v-else-if="type === 'B'">
          B
        </div>
        <div v-else-if="type === 'C'">
          C
        </div>
        <div v-else>
          Not A/B/C
        </div>
        与 v-else 相似,,v-else-if 必须跟在 v-if 或者 v-else-if之后。
        使用 key 控制元素的可重用
        
        Vue 尝试尽可能高效的渲染元素,通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 更快之外还可以得到一些好处。如下例,当允许用户在不同的登录方式之间切换:
        <template v-if="loginType === 'username'">
          <label>Username</label>
          <input placeholder="Enter your username">
        </template>
        <template v-else>
          <label>Email</label>
          <input placeholder="Enter your email address">
        </template>
        在代码中切换 loginType 不会删除用户已经输入的内容,两个模版由于使用了相同的元素,<input> 会被复用,仅仅是替换了他们的 placeholder。
        自己动手试一试,输入一些文本,然后点击 「Toggle login type」 进行切换
        Username 
        Enter your username
         Toggle login type
        这样也不总是符合实际需求,所以 Vue 提供一种方式让你可以自己决定是否要复用元素。你要做的是添加一个属性 key ,key 必须带有唯一的值。
        <template v-if="loginType === 'username'">
          <label>Username</label>
          <input placeholder="Enter your username" key="username-input">
        </template>
        <template v-else>
          <label>Email</label>
          <input placeholder="Enter your email address" key="email-input">
        </template>
        现在输入文本将会在每次切换时重新渲染。自动动手试一试。
        Username 
        Enter your username
         Toggle login type
        注意,<label> 元素仍然会被复用,因为没有被添加了 key 属性。
        v-show
        
        另一个根据条件展示元素的选项是 v-show 指令。用法大体上一样：
        <h1 v-show="ok">Hello!</h1>
        不同的是有 v-show 的元素会始终渲染并保持在 DOM 中。v-show 是简单的切换元素的 CSS 属性 display 。
        注意 v-show 不支持 <template> 语法。
        
        v-if vs v-show
        
        v-if 是真实的条件渲染,因为它会确保条件块在切换当中适当地销毁与重建条件块内的事件监听器和子组件。
        v-if 也是惰性的：若在初始渲染时条件为假,则什么也不做——在条件第一次变为真时才开始局部编译（编译会被缓存起来）。
        相比之下,v-show 简单得多——元素始终被编译并保留,只是简单地基于 CSS 切换。
        一般来说,v-if 有更高的切换消耗而 v-show 有更高的初始渲染消耗。因此,若需要频繁切换使用 v-show 较好,若在运行时条件不大可能改变则使用 v-if 较好。        
    列表渲染 
        v-for
        
        我们用 v-for 指令根据一组数组的选项列表进行渲染。 v-for 指令需要以 item in items 形式的特殊语法,items 是源数据数组并且 item 是数组元素迭代的别名。
        基本用法
        
        <ul id="example-1">
          <li v-for="item in items">
            {{ item.message }}
          </li>
        </ul>
        var example1 = new Vue({
          el: '#example-1',
          data: {
            items: [
              {message: 'Foo' },
              {message: 'Bar' }
            ]
          }
        })
        结果：
        Foo
        Bar
        在 v-for 块中,我们拥有对父作用域属性的完全访问权限。 v-for 还支持一个可选的第二个参数为当前项的索引。
        <ul id="example-2">
          <li v-for="(item,index) in items">
            {{ parentMessage }} - {{ index }} - {{ item.message }}
          </li>
        </ul>
        var example2 = new Vue({
          el: '#example-2',
          data: {
            parentMessage: 'Parent',
            items: [
              { message: 'Foo' },
              { message: 'Bar' }
            ]
          }
        })
        结果：
        Parent - 0 - Foo
        Parent - 1 - Bar
        你也可以用 of 替代 in 作为分隔符,因为它是最接近 JavaScript 迭代器的语法：
        <div v-for="item of items"></div>
        Template v-for
        
        如同 v-if 模板,你也可以用带有 v-for 的 <template> 标签来渲染多个元素块。例如：
        <ul>
          <template v-for="item in items">
            <li>{{ item.msg }}</li>
            <li class="divider"></li>
          </template>
        </ul>
        对象迭代 v-for
        
        你也可以用 v-for 通过一个对象的属性来迭代。
        <ul id="repeat-object" class="demo">
          <li v-for="value in object">
            {{ value }}
          </li>
        </ul>
        new Vue({
          el: '#repeat-object',
          data: {
            object: {
              FirstName: 'John',
              LastName: 'Doe',
              Age: 30
            }
          }
        })
        结果：
        John
        Doe
        30
        你也可以提供第二个的参数为键名：
        <div v-for="(value,key) in object">
          {{ key }} : {{ value }}
        </div>
        第三个参数为索引：
        <div v-for="(value,key,index) in object">
          {{ index }}. {{ key }} : {{ value }}
        </div>
        在遍历对象时,是按 Object.keys() 的结果遍历,但是不能保证它的结果在不同的 JavaScript 引擎下是一致的。
        
        整数迭代 v-for
        
        v-for 也可以取整数。在这种情况下,它将重复多次模板。
        <div>
          <span v-for="n in 10">{{ n }}</span>
        </div>
        结果：
        1 2 3 4 5 6 7 8 9 10
        组件 和 v-for
        
        了解组件相关知识,查看 组件 。完全可以先跳过它,以后再回来查看。
        在自定义组件里,你可以像任何普通元素一样用 v-for 。
        <my-component v-for="item in items"></my-component>
        然而他不能自动传递数据到组件里,因为组件有自己独立的作用域。为了传递迭代数据到组件里,我们要用 props ：
        <my-component
          v-for="(item,index) in items"
          v-bind:item="item"
          v-bind:index="index">
        </my-component>
        不自动注入 item 到组件里的原因是,因为这使得组件会紧密耦合到 v-for 如何运作。在一些情况下,明确数据的来源可以使组件可重用。
        下面是一个简单的 todo list 完整的例子：
        <div id="todo-list-example">
          <input
            v-model="newTodoText"
            v-on:keyup.enter="addNewTodo"
            placeholder="Add a todo"
          >
          <ul>
            <li
              is="todo-item"
              v-for="(todo,index) in todos"
              v-bind:title="todo"
              v-on:remove="todos.splice(index,1)"
            ></li>
          </ul>
        </div>
        Vue.component('todo-item',{
          template: '\
            <li>\
              {{ title }}\
              <button v-on:click="$emit(\'remove\')">X</button>\
            </li>\
          ',
          proPS： ['title']
        })
        new Vue({
          el: '#todo-list-example',
          data: {
            newTodoText: '',
            todos: [
              'Do the dishes',
              'Take out the trash',
              'Mow the lawn'
            ]
          },
          methods: {
            addNewTodo: function () {
              this.todos.push(this.newTodoText)
              this.newTodoText = ''
            }
          }
        })
        
        Add a todo
        Do the dishes  X
        Take out the trash  X
        Mow the lawn  X
        key
        
        当 VueJS 用 v-for 正在更新已渲染过的元素列表时,它默认用 “就地复用” 策略。若数据项的顺序被改变,Vue将不是移动 DOM 元素来匹配数据项的顺序,而是简单复用此处每个元素,并且确保它在特定索引下显示已被渲染过的每个元素。这个类似 Vue 1.x 的 track-by="$index" 。
        这个默认的模式是有效的,但是只适用于不依赖子组件状态或临时 DOM 状态（例如：表单输入值）的列表渲染输出。
        为了给 Vue 一个提示,以便它能跟踪每个节点的身份,从而重用和重新排序现有元素,你需要为每项提供一个唯一 key 属性。理想的 key 值是每项都有唯一 id。这个特殊的属性相当于 Vue 1.x 的 track-by ,但它的工作方式类似于一个属性,所以你需要用 v-bind 来绑定动态值（在这里使用简写）：
        <div v-for="item in items" :key="item.id">
          <!-- 内容 -->
        </div>
        建议尽可能使用 v-for 来提供 key ,除非迭代 DOM 内容足够简单,或者你是故意要依赖于默认行为来获得性能提升。
        因为它是 Vue 识别节点的一个通用机制,key 并不特别与 v-for 关联,key 还具有其他用途,我们将在后面的指南中看到其他用途。
        数组更新检测
        
        变异方法
        
        Vue 包含一组观察数组的变异方法,所以它们也将会触发视图更新。这些方法如下：
        push()
        pop()
        shift()
        unshift()
        splice()
        sort()
        reverse()
        你打开控制台,然后用前面例子的 items 数组调用变异方法：example1.items.push({ message: 'Baz' }) 。
        重塑数组
        
        变异方法(mutation method),顾名思义,会改变被这些方法调用的原始数组。相比之下,也有非变异(non-mutating method)方法,例如： filter(),concat(),slice() 。这些不会改变原始数组,但总是返回一个新数组。当使用非变异方法时,可以用新数组替换旧数组：
        example1.items = example1.items.filter(function (item) {
          return item.message.match(/Foo/)
        })
        你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是,事实并非如此。 Vue 实现了一些智能启发式方法来最大化 DOM 元素重用,所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。
        注意事项
        
        由于 JavaScript 的限制,Vue 不能检测以下变动的数组：
        当你利用索引直接设置一个项时,例如： vm.items[indexOfItem] = newValue
        当你修改数组的长度时,例如： vm.items.length = newLength
        为了避免第一种情况,以下两种方式将达到像 vm.items[indexOfItem] = newValue 的效果,同时也将触发状态更新：
        // Vue.set
        Vue.set(example1.items,indexOfItem,newValue)
        // Array.prototype.splice`
        example1.items.splice(indexOfItem,1,newValue)
        避免第二种情况,使用 splice：
        example1.items.splice(newLength)
        显示过滤/排序结果
        
        有时,我们想要显示一个数组的过滤或排序副本,而不实际改变或重置原始数据。在这种情况下,可以创建返回过滤或排序数组的计算属性。
        例如：
        <li v-for="n in evenNumbers">{{ n }}</li>
        data: {
          numbers: [ 1,2,3,4,5 ]
        },
        computed: {
          evenNumbers: function () {
            return this.numbers.filter(function (number) {
              return number % 2 === 0
            })
          }
        }
        或者,你也可以在计算属性不适用的情况下 (如在嵌套'v-for'循环中) 使用 method 方法：
        <li v-for="n in even(numbers)">{{ n }}</li>
        data: {
          numbers: [ 1,2,3,4,5 ]
        },
        methods: {
          even: function (numbers) {
            return numbers.filter(function (number) {
              return number % 2 === 0
            })
          }
        }
    事件处理器 
        
        监听事件
        
        可以用 v-on 指令监听 DOM 事件来触发一些 JavaScript 代码。
        示例：
        <div id="example-1">
          <button v-on:click="counter += 1">增加 1</button>
          <p>这个按钮被点击了 {{ counter }} 次。</p>
        </div>
        var example1 = new Vue({
          el: '#example-1',
          data: {
            counter: 0
          }
        })
        结果：
        增加 1
        这个按钮被点击了 0 次。
        方法事件处理器
        
        许多事件处理的逻辑都很复杂,所以直接把 JavaScript 代码写在 v-on 指令中是不可行的。因此 v-on 可以接收一个定义的方法来调用。
        示例：
        <div id="example-2">
          <!-- `greet` 是在下面定义的方法名 -->
          <button v-on:click="greet">Greet</button>
        </div>
        var example2 = new Vue({
          el: '#example-2',
          data: {
            name: 'VueJS'
          },
          // 在 `methods` 对象中定义方法
          methods: {
            greet: function (event) {
              // `this` 在方法里指当前 Vue 实例
              alert('Hello ' + this.name + '!')
              // `event` 是原生 DOM 事件
              alert(event.target.tagName)
            }
          }
        })
        // 也可以用 JavaScript 直接调用方法
        example2.greet() // -> 'Hello VueJS!'
        结果：
        Greet
        内联处理器方法
        
        除了直接绑定到一个方法,也可以用内联 JavaScript 语句：
        <div id="example-3">
          <button v-on:click="say('hi')">Say hi</button>
          <button v-on:click="say('what')">Say what</button>
        </div>
        new Vue({
          el: '#example-3',
          methods: {
            say: function (message) {
              alert(message)
            }
          }
        })
        结果：
        Say hi Say what
        有时也需要在内联语句处理器中访问原生 DOM 事件。可以用特殊变量 $event 把它传入方法：
        <button v-on:click="warn('Form cannot be submitted yet.',$event)">Submit</button>
        // ...
        methods: {
          warn: function (message,event) {
            // 现在我们可以访问原生事件对象
            if (event) event.preventDefault()
            alert(message)
          }
        }
        事件修饰符
        
        在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。尽管我们可以在 methods 中轻松实现这点,但更好的方式是：methods 只有纯粹的数据逻辑,而不是去处理 DOM 事件细节。
        为了解决这个问题,VueJS 为 v-on 提供了 事件修饰符。通过由点(.)表示的指令后缀来调用修饰符。
        .stop
        .prevent
        .capture
        .self
        .once
        <!-- 阻止单击事件冒泡 -->
        <a v-on:click.stop="doThis"></a>
        <!-- 提交事件不再重载页面 -->
        <form v-on:submit.prevent="onSubmit"></form>
        <!-- 修饰符可以串联  -->
        <a v-on:click.stop.prevent="doThat"></a>
        <!-- 只有修饰符 -->
        <form v-on:submit.prevent></form>
        <!-- 添加事件侦听器时使用事件捕获模式 -->
        <div v-on:click.capture="doThis">...</div>
        <!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
        <div v-on:click.self="doThat">...</div>
        2.1.4 新增
        <!-- the click event will be triggered at most once -->
        <a v-on:click.once="doThis"></a>
        Unlike the other modifiers,which are exclusive to native DOM events,the .once modifier can also be used on component events. If you haven’t read about components yet,don’t worry about this for now.
        按键修饰符
        
        在监听键盘事件时,我们经常需要监测常见的键值。 Vue 允许为 v-on 在监听键盘事件时添加按键修饰符：
        <!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
        <input v-on:keyup.13="submit">
        记住所有的 keyCode 比较困难,所以 Vue 为最常用的按键提供了别名：
        <!-- 同上 -->
        <input v-on:keyup.enter="submit">
        <!-- 缩写语法 -->
        <input @keyup.enter="submit">
        全部的按键别名：
        .enter
        .tab
        .delete (捕获 “删除” 和 “退格” 键)
        .esc
        .space
        .up
        .down
        .left
        .right
        可以通过全局 config.keyCodes 对象自定义按键修饰符别名：
        // 可以使用 v-on:keyup.f1
        Vue.config.keyCodes.f1 = 112
        按键修饰符
        
        2.1.0 新增
        可以用如下修饰符开启鼠标或键盘事件监听,使在按键按下时发生响应。
        .ctrl
        .alt
        .shift
        .meta
        Note: On Macintosh keyboards,meta is the command key (⌘). On Windows keyboards,meta is the windows key (⊞). On Sun Microsystems keyboards,meta is marked as a solid diamond (◆). On certain keyboards,specifically MIT and Lisp machine keyboards and successors,such as the Knight keyboard,space-cadet keyboard,meta is labeled “META”. On Symbolics keyboards,meta is labeled “META” or “Meta”.
        For example:
        <!-- Alt + C -->
        <input @keyup.alt.67="clear">
        <!-- Ctrl + Click -->
        <div @click.ctrl="doSomething">Do something</div>
        为什么在 HTML 中监听事件?
        
        你可能注意到这种事件监听的方式违背了关注点分离（separation of concern）传统理念。不必担心,因为所有的 VueJS 事件处理方法和表达式都严格绑定在当前视图的 ViewModel 上,它不会导致任何维护上的困难。实际上,使用 v-on 有几个好处：
        扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
        因为你无须在 JavaScript 里手动绑定事件,你的 ViewModel 代码可以是非常纯粹的逻辑,和 DOM 完全解耦,更易于测试。
        当一个 ViewModel 被销毁时,所有的事件处理器都会自动被删除。你无须担心如何自己清理它们。        
    表单控件绑定 
        
        基础用法
        
        你可以用 v-model 指令在表单控件元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇,但 v-model 本质上不过是语法糖,它负责监听用户的输入事件以更新数据,并特别处理一些极端的例子。
        v-model 并不关心表单控件初始化所生成的值。因为它会选择 Vue 实例数据来作为具体的值。
        
        For languages that require an IME (Chinese,Japanese,Korean etc.),you’ll notice that v-model doesn’t get updated during IME composition. If you want to cater for these updates as well,use input event instead.
        
        文本
        
        <input v-model="message" placeholder="edit me">
        <p>Message is: {{ message }}</p>
        
        edit me
        Message is:
        多行文本
        
        <span>Multiline message is:</span>
        <p style="white-space: pre">{{ message }}</p>
        <br>
        <textarea v-model="message" placeholder="add multiple lines"></textarea>
        Multiline message is:
        
        
        add multiple lines
        在文本区域插值( <textarea></textarea> ) 并不会生效,应用 v-model 来代替
        
        复选框
        
        单个勾选框,逻辑值：
        <input type="checkbox" id="checkbox" v-model="checked">
        <label for="checkbox">{{ checked }}</label>
         false
        多个勾选框,绑定到同一个数组：
        <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="checkedNames">
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
        <label for="mike">Mike</label>
        <br>
        <span>Checked names: {{ checkedNames }}</span>
        new Vue({
          el: '...',
          data: {
            checkedNames: []
          }
        })
         Jack  John  Mike 
        Checked names: []
        单选按钮
        
        <input type="radio" id="one" value="One" v-model="picked">
        <label for="one">One</label>
        <br>
        <input type="radio" id="two" value="Two" v-model="picked">
        <label for="two">Two</label>
        <br>
        <span>Picked: {{ picked }}</span>
         One 
         Two 
        Picked:
        选择列表
        
        单选列表:
        <select v-model="selected">
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        <span>Selected: {{ selected }}</span>
         Selected:
        多选列表（绑定到一个数组）：
        <select v-model="selected" multiple>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        <br>
        <span>Selected: {{ selected }}</span>
        ABC 
        Selected: []
        动态选项,用 v-for 渲染：
        <select v-model="selected">
          <option v-for="option in options" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
        <span>Selected: {{ selected }}</span>
        new Vue({
          el: '...',
          data: {
            selected: 'A',
            options: [
              { text: 'One',value: 'A' },
              { text: 'Two',value: 'B' },
              { text: 'Three',value: 'C' }
            ]
          }
        })
         Selected: A
        绑定 value
        
        对于单选按钮,勾选框及选择列表选项,v-model 绑定的 value 通常是静态字符串（对于勾选框是逻辑值）：
        <!-- 当选中时,`picked` 为字符串 "a" -->
        <input type="radio" v-model="picked" value="a">
        <!-- `toggle` 为 true 或 false -->
        <input type="checkbox" v-model="toggle">
        <!-- 当选中时,`selected` 为字符串 "abc" -->
        <select v-model="selected">
          <option value="abc">ABC</option>
        </select>
        但是有时我们想绑定 value 到 Vue 实例的一个动态属性上,这时可以用 v-bind 实现,并且这个属性的值可以不是字符串。
        复选框
        
        <input
          type="checkbox"
          v-model="toggle"
          v-bind:true-value="a"
          v-bind:false-value="b"
        >
        // 当选中时
        vm.toggle === vm.a
        // 当没有选中时
        vm.toggle === vm.b
        单选按钮
        
        <input type="radio" v-model="pick" v-bind:value="a">
        // 当选中时
        vm.pick === vm.a
        选择列表设置
        
        <select v-model="selected">
            <!-- 内联对象字面量 -->
          <option v-bind:value="{ number: 123 }">123</option>
        </select>
        // 当选中时
        typeof vm.selected // -> 'object'
        vm.selected.number // -> 123
        修饰符
        
        .lazy
        
        在默认情况下,v-model 在 input 事件中同步输入框的值与数据 (除了 上述 IME 部分),但你可以添加一个修饰符 lazy ,从而转变为在 change 事件中同步：
        <!-- 在 "change" 而不是 "input" 事件中更新 -->
        <input v-model.lazy="msg" >
        .number
        
        若想自动将用户的输入值转为 Number 类型（若原值的转换结果为 NaN 则返回原值）,可以添加一个修饰符 number 给 v-model 来处理输入值：
        <input v-model.number="age" type="number">
        这通常很有用,因为在 type="number" 时 HTML 中输入的值也总是会返回字符串类型。
        .trim
        
        若要自动过滤用户输入的首尾空格,可以添加 trim 修饰符到 v-model 上过滤输入：
        <input v-model.trim="msg">
        v-model 与组件
        
        若你还不熟悉Vue的组件,跳过这里即可。
        HTML 内建的 input 类型有时不能满足你的需求。还好,Vue 的组件系统允许你创建一个具有自定义行为可复用的 input 类型,这些 input 类型甚至可以和 v-model 一起使用！要了解更多,请参阅自定义 input 类型          
  v-attr   
  v-repeat 
Mustache,模板语法   插值 
  PS：Vue使用了基于 HTML 的模版语法,可声明式地将DOM绑定至底层Vue实例的数据;
    在底层的实现上,Vue 将模板编译成虚拟 DOM 渲染函数;
    结合响应系统,应用状态改变时,Vue以最小代价重新渲染组件并应用到DOM操作上;
    也可不用模板,直接写渲染[render]函数,使用可选的 JSX 语法;  
    不能在HTML属性中使用[应使用 v-bind 指令];
  {{key}}  数据属性插值[params.data.key]
    PS：{{value}}的形式可取到value的值,并与value进行绑定,
      绑定的数据对象上的属性发生了改变,插值处的内容都会更新,
      双大括号会将数据解释为纯文本,而非 HTML 
  {{表达式}} 配合JS表达式使用 
    PS：Vuejs提供了完全的JS表达式支持; 
      模板表达式都被放在沙盒中,只能访问全局变量的一个白名单,如 Math 和 Date,
      不应该在模板表达式中试图访问用户定义的全局变量; 
    e.g.:
      {{ number + 1 }}
      {{ ok ? 'YES' : 'NO' }}
      {{ message.split('').reverse().join('') }}
      <div v-bind:id="'list-' + id"></div>
      这些表达式会在所属 Vue 实例的数据作用域下作为JS被解析
    每个绑定都只能包含单个表达式
      下面的例子不会生效
      // <!-- 这是语句,不是表达式 -->
      {{ var a = 1 }}
      // <!-- 流控制也不会生效,请使用三元表达式 -->
      {{ if (ok) { return message } }}
  {{foo}}  计算属性插值[params.computed.foo]
    PS：像绑定普通属性一样在模板中绑定计算属性 
  {{foo(arg)}} 方法调用插值[params.methods.foo]
    PS：计算属性是基于它的依赖缓存,只有在其的相关依赖发生改变时才会重新取值;
      若依赖未改变,多次访问计算属性会立即返回之前的计算结果[有缓存];
      而每当重新渲染的时候,method 调用总会执行函数[无缓存];
    e.g.：
      通过调用method来达到同样的效果
      <p>Reversed message: "{{ reverseMessage() }}"</p>
      methods: {
        reverseMessage: function () {
          return this.message.split('').reverse().join('')
        }
      }
      
      如下计算属性将不会更新,因为 Date.now() 不是响应式依赖
      computed: {
        now: function () {
          return Date.now()
        }
      }
  Mustache 和 v-text 的区别: 在刷新的瞬间会显示出'{{}}'
filters,过滤器  用于文本格式化
  PS：Vue2.x 中,过滤器只能在'插值'和'v-bind'表达式[从' 2.1.0'开始支持]中使用 
    类似Linux中的管道,vuejs也使用的是'|'; 
    因为过滤器设计目的就是用于文本转换。
    为了在其他指令中实现更复杂的数据变换,应该使用计算属性。
    过滤器函数总接受"|"左边的值作为第一个参数
  在插值及指令再中使用 
    添加在JS表达式的尾部,由“管道”符指示 
    // 插值中
    {{ message | ftFoo }}
    // v-bind 中
    <div v-bind:id="rawId | ftFoo"></div>
    // 传入额外的参数
    {{ message | ftFoo(arg1,arg2,..) }}
  Vue.filter('ftName',foo); 自定义内建过滤器[全局过滤器,可在所有实例中使用] 
    foo  依次传入参数 val[,arg1,arg2,..] 
      val 表示'|'左边的值,
      arg 可选,表示使用时传入的额外参数 
    e.g.：
      定义一个全局的 reverse 过滤器
      Vue.filter('reverse',function (value) {
        return value.split('').reverse().join('')
      })
  过滤器串联 
    {{ message | filterA | filterB }}
  过滤器传参 
    过滤器是JS函数,因此可以接受参数
    {{ message | filterA('arg1',arg2) }}
    字符串'arg1'将传给过滤器作为第二个参数,
    arg2 表达式的值将被求值然后传给过滤器作为第三个参数 
Component 组件 
  PS：Vue的重要概念,提供了一种抽象,用独立可复用的小组件来构建大型应用; 
    几乎任意类型的应用的界面都可以抽象为一个组件树;
    在一个大型应用中,为了使得开发过程可控,有必要将应用整体分割成一个个的组件.
    Vuejs组件类似于自定义元素,提供了原生自定义元素所不具备的一些重要功能,
    比如组件间的数据流,自定义事件系统,以及动态的、带特效的组件替换;
    在Vue里,一个组件本质上是一个拥有预定义选项的一个Vue实例;
    扩展 HTML 元素,封装可重用的代码,
    在较高层面上,组件是自定义元素,VueJS 的编译器为它添加特殊功能;
  Vue.component(tagName,options);     注册全局组件 
    tagName 组件的名称 
      对于自定义标签名,Vue不强制要求遵循W3C规则[小写,并且包含一个短杠],
      但尽管遵循这个规则比较好
    options 配置对象 
      template : "HTMLStr",   组件的HTML代码
      props    :  options ,   可选,自定义属性 
        options 可为 字符串集合数strArr组或对象obj
          strArr  ['attr1','att2',...]
          
        this.todo 获取到值 
      data     : foo           可选,组件的数据存放,但必须为一函数 
        PS：通过Vue构造器传入的各种选项大多数都可以在组件里用,
          data 是一个例外,它必须是函数
        e.g.：
          Vue会停止,并在控制台发出警告,在组件中data必须是一个函数 
          Vue.component('my-component',{
            template: '<span>{{ message }}</span>',
            data: {
              message: 'hello'
            }
          })
          使用如下方式来决解该情况：
          <div id="example-2">
            <simple-counter></simple-counter>
            <simple-counter></simple-counter>
            <simple-counter></simple-counter>
          </div>
          var data = { counter: 0 }
          Vue.component('simple-counter',{
            template: '<button v-on:click="counter += 1">{{ counter }}</button>',
            // 技术上 data 的确是一个函数了,因此 Vue 不会警告,
            // 但是我们返回给每个组件的实例的却引用了同一个data对象
            data: function () {
              return data
            }
          })
          new Vue({
            el: '#example-2'
          })
          这三个组件共享了同一个 data ,因此 counter 会影响所有组件！
          通过为每个组件返回全新的 data 对象来取消同步
          data: function () {
            return {
              counter: 0
            }
          }
          现在每个 counter 都有它自己内部的状态了：
      computer : {}
      methods  : {}
      name : ''
    e.g.：
      定义名为 todo-item 的新组件
      Vue.component('todo-item',{
        template: '<li>这是个待办项</li>'
      })
      用其构建另一个组件模板 
      <ol>
        // <!-- 创建一个 todo-item 组件的实例 -->
        <todo-item></todo-item>
      </ol>
      将数据从父作用域传到子组件。让我们来修改一下组件的定义,使之能够接受一个属性：
      Vue.component('todo-item',{
        // todo-item 组件现在接受一个
        // "prop",类似于一个自定义属性
        // 这个属性名为 todo。
        props: ['todo'],
        template: '<li>{{ todo.text }}</li>'
      })
      使用 v-bind 指令将待办项传到每一个重复的组件中：
      <div id="app-7">
        <ol>
          // <!-- 现在我们为每个todo-item提供待办项对象    -->
          // <!-- 待办项对象是变量,即其内容可以是动态的 -->
          <todo-item v-for="item in groceryList" v-bind:todo="item"></todo-item>
        </ol>
      </div>
      Vue.component('todo-item',{
        props: ['todo'],
        template: '<li>{{ todo.text }}</li>'
      })
      var app7 = new Vue({
        el: '#app-7',
        data: {
          groceryList: [
            { text: '蔬菜' },
            { text: '奶酪' },
            { text: '随便其他什么人吃的东西' }
          ]
        }
      })
  需在父实例的模块中使用,在HTML中指定位置 
    以自定义元素<my-component></my-component>的形式使用
    要确保在初始化根实例之前注册了组件
    <div id="example">
      <cpt-child></cpt-child>
    </div>
    // 注册
    Vue.component('cpt-child',{
      template: '<div>A custom component!</div>'
    })
    // 创建根实例,否则不生效
    new Vue({
      el: '#example'
    })
    // 渲染为：
    <div id="example">
      <div>A custom component!</div>
    </div>
    A custom component!
  new Vue({})  vue实例中局部注册 
    通过在组件实例选项中注册,可使组件仅在该实例/组件的作用域中使用
    new Vue({
      ...
      components: {
        // <my-component> 将只在该模板可用
        'my-component': {
          template: '<div>A custom component!</div>'
        },
      }
    })
    这种封装也适用于其它可注册的 Vue 功能,如指令。
  组件元素可能的限制 
    像这些元素 <ul> ,<ol>,<table> ,<select> 限制了能被它包裹的元素,
    而一些像 <option> 这样的元素只能出现在某些其它元素内部。
    在自定义组件中使用这些受限制的元素时会导致一些问题,例如：
      <table>
        <my-row>...</my-row>
      </table>
      自定义组件 <my-row> 被认为是无效的内容,因此在渲染的时候会导致错误。
      变通的方案是使用特殊的 is 属性：
      <table>
        <tr is="my-row"></tr>
      </table>
    若使用来自以下来源之一的字符串模板,这些限制将不适用：
      <script type="text/x-template">
      JavaScript内联模版字符串
      .vue 组件
  父组件通过子组件的props向下传递数据给子组件 
    组件实例的作用域是孤立的,不能在子组件的模板内直接引用父组件的数据;
    e.g.：
      Vue.component('child',{
        // 声明 props
        props: ['message'],
        // 就像 data 一样,prop 可以用在模板内
        // 同样也可以在 vm 实例中像 “this.message” 这样使用
        template: '<span>{{ message }}</span>'
      })
      传入一个普通字符串：
      <child message="hello!"></child>
      结果： hello!
    属性命名camelCased[驼峰式]转换为kebab-case[短横线隔开式] 
      PS：HTML特性不区分大小写,当未使用字符串模版[若使用字符串模版,则没有这些限制],
      Vue.component('child',{
        // camelCase in JavaScript
        props: ['myMessage'],
        template: '<span>{{ myMessage }}</span>'
      })
      // <!-- kebab-case in HTML -->
      <child my-message="hello!"></child>
    v-bind动态属性 
      PS：每当父组件的数据变化时,该变化也会传导给子组件 
      <div id="parent">
        <input v-model="parentMsg"> <br>
        <cpt-child :my-message="parentMsg"></cpt-child>
      </div>
      Vue.component('cpt-child',{
        // camelCase in JavaScript
        props: ['myMessage'],
        template: '<span>{{ myMessage }}</span>'
      })
      new Vue({
        el: '#parent',
        data:{
          parentMsg : '',
        }
      })
    props单向数据流 
      PS：当父组件的属性变化时,将传导给子组件,但是不会反过来,
        这是为了防止子组件无意修改了父组件的状态;
        每当父组件更新时,子组件的所有 prop 都会更新为最新值,
        这意味着不应该在子组件内部改变 prop 。否则,Vue 会在控制台给出警告;
        在js中对象和数组是引用类型,指向同一个内存空间,
        若 prop 是一个对象或数组,在子组件内部改变它会影响父组件的状态;
    Prop 验证 
      要指定验证规格,需要用对象的形式,而不能用字符串数组;
      可为组件的props指定验证规格。
      若传入的数据不符合规格,Vue 会发出警告。
      Vue.component('example',{
        props: {
          // 基础类型检测 （`null` 意思是任何类型都可以）
          propA: Number,
          // 多种类型
          propB: [String,Number],
          // 必传且是字符串
          propC: {
            type: String,
            required: true
          },
          // 数字,有默认值
          propD: {
            type: Number,
            default: 100
          },
          // 数组／对象的默认值应当由一个工厂函数返回
          propE: {
            type: Object,
            default: function () {
              return { message: 'hello' }
            }
          },
          // 自定义验证函数
          propF: {
            validator: function (value) {
              return value > 10
            }
          }
        }
      })
      type 类型
        type 也可以是一个自定义构造器函数,使用 instanceof 检测。
        当 prop 验证失败,Vue会在抛出警告[若使用的是开发版本]
        String
        Number
        Boolean
        Function
        Object
        Array
  子组件通过v-on绑定自定义事件向父元素传递信息 
    PS：$on('eventName') 监听事件,$emit('eventName',data) 触发事件
      父组件在使用子组件的地方直接用v-on来监听子组件触发的事件
    e.g.：
      <div id="parent">
        <p>{{ total }}</p>
        <cpt-child v-on:addtotal="incrementTotal"></cpt-child>
        <cpt-child v-on:addtotal="incrementTotal"></cpt-child>
      </div>
      Vue.component('cpt-child',{
        template: '<button v-on:click="addSelf">{{ counter }}</button>',
        data: function () {
          return {
            counter: 0
          }
        },
        methods: {
          addSelf: function () {
            this.counter += 1
            this.$emit('addtotal')
            // 此处需注意将'addtotal'统一改为'addTotal'时,vue不工作
            // 在HTML中不区分大小写,但在JS中区分大小写「SlPt」
          }
        },
      })
      new Vue({
        el: '#parent',
        data: {
          total: 0
        },
        methods: {
          incrementTotal: function () {
            this.total += 1
          }
        }
      })
  非父子组件通信 
    简单场景下,使用一个的 Vue 实例作为中央事件总线
      var bus = new Vue()
      // 触发组件 A 中的事件
      bus.$emit('id-selected',1)
      // 在组件 B 创建的钩子中监听事件
      bus.$on('id-selected',function (id) {
        // ...
      })
    复杂情况下,使用专门的状态管理模式
  Slot 内容分发[父组件替换子组件内容]
    编译作用域、组件作用域
      <cpt-child> {{ message }} </cpt-child>
      message 为绑定到父组件的数据,
      因为<cpt-child>属于父组件的管辖范围,只是其代表的为子组件而已「SlPt」;
      子组件有自己的数据,在其注册时定义,父组件模板不应该知道子组件的状态。
      分发内容是在父作用域内编译
    <slot> 插口 
      PS：除非子组件模板包含至少一个<slot>插口,否则父组件的内容将会被丢弃;
        父组件在子组件标签内定义的内容将换掉子组件内定义的没有属性的slot标签本身;
        在<slot>标签中的任何内容都被视为备用内容,没有要替换的内容时才显示备用内容;
      e.g.：
        子组件
        <div>
          <h2>我是子组件的标题</h2>
          <slot> 只有在没有要分发的内容时才会显示 </slot>
        </div>
        父组件模版
        <div>
          <h1>我是父组件的标题</h1>
          <cpt-child>
            <p>这是一些初始内容</p>
            <p>这是更多的初始内容</p>
          </cpt-child>
        </div>
        渲染结果
        <div>
          <h1>我是父组件的标题</h1>
          <div>
            <h2>我是子组件的标题</h2>
            <p>这是一些初始内容</p>
            <p>这是更多的初始内容</p>
          </div>
        </div>
      <slot name="">具名Slot
        PS：<slot>使用name属性来配置分发的内容,
          子组件中name的值和父组件中标签的slot属性的值进行匹配,相等则将子组件的<slot>替换;
          可以有一个匿名 slot ,为默认 slot ,作为找不到匹配的内容片段的备用插槽。
          若没有默认的 slot ,这些找不到匹配的内容片段将被抛弃;
        e.g.：
          子组件
          <div class="container">
            <header> 
              <slot name="header"></slot> 
            </header>
            <main>   
              <slot></slot>               
            </main>
            <footer> 
              <slot name="footer"></slot> 
            </footer>
          </div>
          父组件模版
          <cpt-child>
            <h1 slot="header">这里可能是一个页面标题</h1>
            <p>主要内容的一个段落。</p>
            <p>另一个主要段落。</p>
            <p slot="footer">这里有一些联系信息</p>
          </cpt-child>
          渲染结果为
          <div class="container">
            <header>
              <h1>这里可能是一个页面标题</h1>
            </header>
            <main>
              <p>主要内容的一个段落。</p>
              <p>另一个主要段落。</p>
            </main>
            <footer>
              <p>这里有一些联系信息</p>
            </footer>
          </div>
    <template scope="aoo" slot="boo"> 作用域插槽 ['2.1.0' 新增] 
      通过<template>模版的scope属性获取子组件props传递的数据,
      scope的值接收从子组件中传递的 prop 对象;
      作用域插槽也可以是具名的;
      e.g.：
        <div class="parent">
          <cpt-child>
            <template scope="aoo">
              <span>hello from parent</span>
              <span>{{ aoo.text }}</span>
            </template>
          </cpt-child>
        </div>
        Vue.component('cpt-child',{
          template: 
            '<div class="cpt-child">\
              <slot text="hello from child"></slot>\
            </div>',
          props : ['text'],
        })
        new Vue({
          el: '.parent',
        })
        渲染为
        <div class="parent">
          <div class="cpt-child">
            <span>hello from parent</span> 
            <span>hello from child</span>
          </div>
        </div>
        
        子组件列表渲染 
        <div class="parent">
          <cpt-child :items="items">
            <template slot="aoo" scope="boo">
              <li>{{ boo.text }}</li>
            </template>
          </cpt-child>
        </div>
        Vue.component('cpt-child',{
          template: 
            '<ul>\
              <slot name="aoo" v-for="item in items" :text="item.text">\
                <!-- 这里写入备用内容 --> \
              </slot>\
            </ul> ',
          props : ['text'],
          data : function(){
            return {
              items : [
                { text : '11' },
                { text : '22' },
                { text : '33' },
              ]
            }
          }
        })
        new Vue({
          el: '.parent',
          data : {
            items : 'aaa',// 为 false 时,则无该属性
          }
        });
  <component v-bind:is="aoo"> 动态组件
    通过<component>引入;v-bind:is="aoo"动态切换
    e.g.：
      <div id="parent">
        <button type="button" name="button" @click='changeFoo' >switchBtn</button>
        <component v-bind:is="changeFlag">
          // <!-- 组件在 vm.changeFlag 变化时改变！ -->
        </component>
      </div>
      var vm = new Vue({
        el: '#parent',
        data: {
          changeFlag: 'boo'
        },
        methods : {
          changeFoo : function(){
            if (this.changeFlag == 'aoo') {
              this.changeFlag = 'boo'
            }
            else if (this.changeFlag == 'boo') {
              this.changeFlag = 'coo';
            }
            else {
              this.changeFlag = 'aoo';
            }
            console.log(this.changeFlag);
          }
        },
        components: {
          aoo: { 
            template : '<span>aaa</span>'
          },
          boo: { 
            template : '<span>bbb</span>'
          },
          coo: { 
            template : '<span>ccc</span>'
          },
        }
      });
    keep-alive 缓存切换的组件
      把切换出去的组件保留在内存中,保留其状态或避免重新渲染;
      <keep-alive>
        <component :is="currentView">
          <!-- 非活动组件将被缓存！ -->
        </component>
      </keep-alive>
  编写可复用组件 
    PS：Vue 组件的 API 来自三部分 - props,events 和 slots;
      Props  允许外部环境传递数据给组件
      Events 允许组件触发外部环境的副作用
      Slots  允许外部环境将额外的内容组合在组件中
  子组件索引 
    PS：使用ref为子组件指定一个索引 ID,便于JS直接访问子组件;
      当 ref 和 v-for 一起使用时,ref 是一个数组或对象,包含相应的子组件。
      $refs 只在组件渲染完成后才填充,并且它是非响应式的,
      仅仅作为一个直接访问子组件的应急方案——应当避免在模版或计算属性中使用 $refs 。
    e.g.：
      <div id="parent">
        <user-profile ref="profile"></user-profile>
      </div>
      var parent = new Vue({ el: '#parent' })
      // 访问子组件
      var child = parent.$refs.profile
  异步组件 
    在大型应用中,我们可能需要将应用拆分为多个小模块,按需从服务器下载。
    为了让事情更简单,Vuejs 允许将组件定义为一个工厂函数,动态地解析组件的定义。
    Vuejs 只在组件需要渲染时触发工厂函数,并且把结果缓存起来,用于后面的再次渲染。
    Vue.component('async-example',function (resolve,reject) {
      setTimeout(function () {
        // Pass the component definition to the resolve callback
        resolve({
          template: '<div>I am async!</div>'
        })
      },1000)
    })
    工厂函数接收一个 resolve 回调,在收到从服务器下载的组件定义时调用。
    也可以调用 reject(reason) 指示加载失败。
    这里 setTimeout 只是为了演示。怎么获取组件完全由你决定。
    推荐配合使用 ：Webpack 的代码分割功能：
    Vue.component('async-webpack-example',function (resolve) {
      // 这个特殊的 require 语法告诉 webpack
      // 自动将编译后的代码分割成不同的块,
      // 这些块将通过 Ajax 请求自动下载。
      require(['./my-async-component'],resolve)
    })
    你可以使用 Webpack 2 + ES2015 的语法返回一个 Promise resolve 函数：
    Vue.component(
      'async-webpack-example',
      () => import('./my-async-component')
    )
  高级异步组件 ['2.3.0' 新增] 
    步组件的工厂函数可返回一如下的对象：
    const AsyncComp = () => ({
      // 需要加载的组件. 应当是一个 Promise
      component: import('./MyComp.vue'),
      // loading 时应当渲染的组件
      loading: LoadingComp,
      // 出错时渲染的组件
      error: ErrorComp,
      // 渲染 loading 组件前的等待时间。默认：200ms.
      delay: 200,
      // 最长等待时间。超出此时间则渲染 error 组件。默认：Infinity
      timeout: 3000
    })
    当一个异步组件被作为 vue-router 的路由组件使用时,这些高级选项都是无效的,
    因为在路由切换前就会提前加载所需要的异步组件。
    另外,若你要在路由组件中上述写法,需要使用 vue-router 2.4.0+。
  组件命名约定 
    当注册组件（或者 props）时,可以使用 kebab-case ,camelCase ,或 TitleCase 。
    // 在组件定义中
    components: {
      // 使用 kebab-case 形式注册
      'kebab-cased-component': { /* ... */ },
      // register using camelCase
      'camelCasedComponent': { /* ... */ },
      // register using TitleCase
      'TitleCasedComponent': { /* ... */ }
    }
    在 HTML 模版中,请使用 kebab-case 形式：
    // <!-- 在HTML模版中始终使用 kebab-case -->
    <kebab-cased-component></kebab-cased-component>
    <camel-cased-component></camel-cased-component>
    <title-cased-component></title-cased-component>
    当使用字符串模式时,可以不受 HTML 的 case-insensitive 限制,
    可使用 camelCase 、 TitleCase 或者 kebab-case 来引用：
    // <!-- 在字符串模版中可以用任何你喜欢的方式! -->
    <my-component></my-component>
    <myComponent></myComponent>
    <MyComponent></MyComponent>
    若组件未经 slot 元素传递内容,在字符串模版中可以在组件名后使用 / 使其自闭合,
    否则自定义元素是无效的 HTML ,浏览器原生的解析器无法识别;
    <my-component/>
  递归组件 
    当有name选项时,组件在其模板内可递归调用自己 
    使用 Vue.component 全局注册组件,其全局的ID使用其name选项值,被自动设置;
    若不谨慎,递归组件可能导致死循环
      name: 'stack-overflow',
      template: '<div><stack-overflow></stack-overflow></div>'
      导致错误 “max stack size exceeded” ,
      要确保递归调用有终止条件[如递归调用时使用 v-if 最终返回 false] 
  组件间的循环引用Circular References Between Components 
    e.g.：构建一文件目录树
    tree-folder 组件
    <p>
      <span>{{ folder.name }}</span>
      <tree-folder-contents :children="folder.children"/>
    </p>
    tree-folder-contents 组件
    <ul>
      <li v-for="child in children">
        <tree-folder v-if="child.children" :folder="child"/>
        <span v-else>{{ child.name }}</span>
      </li>
    </ul>
    当你仔细看时,会发现在渲染树上这两个组件同时为对方的父节点和子节点–这点是矛盾的。
    当使用 Vue.component 将这两个组件注册为全局组件的时候,框架会自动为你解决这个矛盾;
    然而,若使用诸如Webpack或者Browserify之类的模块化管理工具来requiring/importing组件的话,就会报错了：
    Failed to mount component: template or render function not defined.
    为了解释为什么会报错,简单的将上面两个组件称为 A 和 B ,
    模块系统看到它需要 A ,但是首先 A 需要 B ,
    但是 B 需要 A,而 A 需要 B,陷入了一个无限循环,因此不知道到底应该先解决哪个。
    要解决这个问题,我们需要在其中一个组件中（比如 A ）告诉模块化管理系统,
    “A 虽然需要 B ,但是不需要优先导入 B”
    在我们的例子中,我们选择在tree-folder 组件中来告诉模块化管理系统循环引用的组件间的处理优先级,
    我们知道引起矛盾的子组件是tree-folder-contents,
    所以我们在beforeCreate 生命周期钩子中去注册它：
    beforeCreate: function () {
      this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue')
    }
    问题解决了。
  内联模版 
    若子组件有 inline-template 特性,组件将把它的内容当作它的模板,
    而不是把它当作分发内容,让模板更灵活。
    <my-component inline-template>
      <div>
        <p>These are compiled as the component's own template.</p>
        <p>Not parent's transclusion content.</p>
      </div>
    </my-component>
    但是 inline-template 让模板的作用域难以理解。
    最佳实践是使用 template 选项在组件内定义模板或者在 .vue 文件中使用 template 元素。
  X-Templates 
    另一种定义模版的方式是在 JavaScript 标签里使用 text/x-template 类型,并且指定一个id。
    <script type="text/x-template" id="hello-world-template">
      <p>Hello hello hello</p>
    </script>
    Vue.component('hello-world',{
      template: '#hello-world-template'
    })
    这在有很多模版或者小的应用中有用,否则应该避免使用,
    因为它将模版和组件的其他定义隔离了。
  对低开销的静态组件使用 v-once 
    当组件中包含大量静态内容时,可使用 v-once 将渲染结果缓存起来
    Vue.component('terms-of-service',{
      template: '\
        <div v-once>\
          <h1>Terms of Service</h1>\
          ... a lot of static content ...\
        </div>\
      '
    })    
  单文件的组件模式 
    PS：使用一个 .vue 格式文件将 HTML+CSS+JS 组装起来;一个 .vue 文件就是一个组件;
      组件的通信方式同上[使用 props 和 event] 
    文件结构为 
    <template> HTMLCode <template/>
    <script> JSCode <script/>
    <style> CSSCode <style/>
    ◆自我总结
    通过自定义事件子组件向父组件传递信息 
      ★父组件内
      绑定事件A,用于响应子组件 $emit('eventName',data) 的触发 
      ★子组件内
      绑定事件用于响应何时向父组件发送数据
      在事件的回调函数中 $emit('eventName',data) 触发在父组件中的事件A 
vue-resource  与后台数据交互 
  PS：作为vue插件的形式存在,通过 XMLHttpRequest 或 JSONP 发起请求并处理响应 
  vm.$http.get('url'[,arg]).then(foo)   get请求 
    url  请求的地址
    arg  可选,obj,请求的参数
    foo  传入参数 res「返回的结果,且进行了Vue封装」
  vm.$http.post()
  vm.$http.jsonp()
axios         功能和 Vue-resource 类似
Vuex          大规模状态管理
vue-router    路由
vue-validator 表单验证 
vue-touch     移动端 
--------------------------------------------------------------------------------
●React 
介绍_概念_说明_定义 
  起源于Facebook,用来架设Instagram网站,
  设计思想独特,属于革命性创新,性能出众,代码逻辑却非常简单;
  框架使用语言jsx和自己一整套完整的工具链「工具集合」
  声明式,组件化
使用 
  npm install -g  create-react-app       安装React 
  create-react-ap helloworld「项目名称」  创建React项目并初始化\
  cd helloworld
  npm start   「npm run start的缩写」 
--------------------------------------------------------------------------------
●orage「self」
  功能: 轻量、简洁、功能--多模块化自由组合、待续...
  简写符号:
    pa   parents
    pu   public
    el   elements
    me   method
    da   data
    op   operation
    ms   message
  思想 
    通过JS管控HTML元素
    var o1 = new Org( {
      el : '#app',
      da : {
        
      },
      me : {
        
      },
      ms : {
        o2 : {data:value},
      },
      op   : {
        '#app-btn1' : me.foo1,
        '#app-btn1' : {
          'click' : me.foo1
        },
        '#app-btn1' : [
          { 'click' : me.foo1 },
          { 'hover,mouseout' : me.foo2 },
          { 'hover' : {  
            is  : me.foo2 ,
            aoo : foo 
          }  
          },
        ],
        '#app-btn2' : function(data){
          console.log(data);
          me.foo2(data)
        },
      }
    } )
---------------------------------------------------------------------以下待整理



