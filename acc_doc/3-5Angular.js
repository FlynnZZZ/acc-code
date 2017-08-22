AngularJS 
  PS:诞生于2009年,优秀的前端JS框架,已经被用于Google的多款产品当中 
    最为核心的是:MVC、模块化、自动化双向数据绑定、语义化标签、依赖注入等等 
  概念类
    指令: 通过被称为指令的新属性来扩展HTML,为应用添加功能,允许自定义指令.
      带有前缀ng- 
      ng-app 指令初始化一个AngularJS应用程序
      ng-init 指令初始化应用程序数据
      ng-model 指把元素值(比如输入域的值)绑定到应用程序
  ◆四大核心特性
  MVC,Model Controller View 
    PS:MVC 只是手段,目的是模块化和复用
      model :数据模型层;
      view :视图层,负责展示;
      controller:业务逻辑和控制逻辑.
    $scope 
      PS:MVC 是借助$scope实现的 
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
    PS:指令可以自定义
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
        Example: 
          import {Http} from "@angular/http"
          import {Component} from "@angular/core" // @Component 装饰器
          import {Directive} from "@angular/core" // @Directive 装饰器
    功能单元以模块形式组织 「应用模块」
  data binding 数据绑定
  modules 模块 
  todo 
    模块化 
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
---------------------------------------------------------------------以下待整理 
