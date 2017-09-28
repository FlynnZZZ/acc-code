AngularJS1 
  PS: 于09年在Google诞生;在12年6月正式推出'1.0.0'版本,'1.3'版本放弃支持IE8-;
  不足 : 
    性能问题 
    手机端支持不友好 
Angular2 
  PS:于16年9月发布;核心:MVC、模块化、自动化双向数据绑定、语义化标签、依赖注入等等 
  同AngularJS的比较 
    移除controller+$scope设计,改用组件式开发 
    移动优先,Angular Mobile Toolkit
  ◆核心概念 
  'Compenents'组件 : 
    ◆生命周期钩子 
      'constructor'   构造器初始化 
      'onChanges'     首次触发数据变化钩子 
      'onInit'        组件初始化 
      'onChanges'     运行间触发数据变化钩子
      'onDestroy'     组件销毁前 
  'Metadata'元数据 : 
  'Templates'模版 : 
    框架代码以模块形式组织 [文件模块]
      core    核心模块
      common  通用模块
      forms   表单模块
      http    网络模块
      ... 
      模块的引入
        Example: 
          import {Http} from "@angular/http"
          import {Component} from "@angular/core" // @Component 装饰器
          import {Directive} from "@angular/core" // @Directive 装饰器
    功能单元以模块形式组织 [应用模块]
  'Data Binding'数据绑定 : 
  'Services'服务 : 
    services   服务 : 实现专一目的的逻辑单元,如日志服务
  'Directives'指令 : 
    PS:指令可以自定义
    指令: 通过被称为指令的新属性来扩展HTML,为应用添加功能,允许自定义指令 
    带有前缀ng- 
    ng-app 指令初始化一个AngularJS应用程序
    ng-init 指令初始化应用程序数据
    ng-model 指把元素值[比如输入域的值]绑定到应用程序
    属性指令: 改变组件模板的外观或行为,如样式等
    结构指令: 改变组件模板的DOM结构,如插值或移除DOM节点
    AngularJS内置指令 共63个
      ng-app
      
      ng-controller
      
      ng-class
      ng-show
      ng-hide
      
      ng-click
      
      ng-view
  'Dependency Injection'依赖注入 : 
    dependency injection 依赖注入: 组件引入外部构建[如服务]的一种机制
  'Moudles'模块化 : 
    PS:一切由模块开始
    路由
      使用ngRoute进行视图之间的路由
      Example: :
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
      Example: :
      var bookStoreApp =angular.module("bookStoreApp",[
        'ngRoute',"ngAnimate","bookStoreCtrls","bookStoreFilters"
      ])
  ◆其他
  'Model Controller View' MVC 
    PS:MVC 只是手段,目的是模块化和复用
      model :数据模型层;
      view :视图层,负责展示;
      controller:业务逻辑和控制逻辑.
    $scope 
      PS:MVC 是借助$scope实现的 
        是一个'Plain Old JavaScript Object'POJO 
        提供了一些工具方法 $watch() $apply() 
        是表达式的执行环境,也叫作用域 
        是一个树型结构,与DOM标签平行 
        子$scope对象会继承父$scope上的属性和方法 
        每个Angular应用只有一个根$scope对象,一般位于ng-app上 
        可以传播事件,类似DOM事件,可以向上也可以向下 
        不仅是MVC的基础,也是实现双向数据绑定的基础 
        可以使用angular.element($0).scope()进行调试 
  双向数据绑定 
    数据模型到视图,视图到数据模型.
    取值表达式 {{}}
---------------------------------------------------------------------以下待整理 
