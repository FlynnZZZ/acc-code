设计模式 
  观察者模式 
    一对多的依赖关系,多个观察者对象同时监听某一个主题对象 
    该主题对象在状态发生变化时,会通知所有观察者对象  
'Modules'模块化规范 
  CommonJS [详见NodeJS] 
  AMD'Asynchronous Module Definition'规范,异步模块定义 
    Describe: 
      模块定义:每个模块必须按照一定的格式编写  
      主要接口有两个:'define'和'require' 
      RequireJS就是AMD规范的实现  
    Feature: 
      异步,有效避免了采用同步加载方式中导致页面假死现象 
      必须要提前加载所有依赖,才可使用,而非按需加载 
  CMD'Common Module Definition'通用模块定义 
    Describe: 
      CMD规范是阿里的玉伯提出来的 
      和AMD类似,但是是按需加载的 
      SeaJS要解决的问题和requireJS一样,只不过在模块定义方式和模块加载时机上有所不同
  AMD 与 CMD 的区别:在模块定义时对依赖的处理不同
    AMD 推崇依赖前置,在定义模块时就要声明其依赖的模块 
    CMD 推崇就近依赖,只有在用到某个模块的时再去加载  
  ES6 Modules [详见ES6] 

