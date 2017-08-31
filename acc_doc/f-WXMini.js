miniA微信小程序 
  介绍:
    微信小程序主要依赖于微信平台,使用微信台提供的'View''Event''Component''Container'等构建,
    可以说是介于 Web App 和 Native App 之间的一种类型。无须Native App的安装,比Web APP更好的体验
说明 
  开发小程序时可以选择有APPID和无APPID两种方式,及其区别 
    有APPID时,只能和指定的域名进行通信,如果没有进行配置,编译时会报错 
      微信公众平台-小程序-设置-开发设置 
      每种最多可设置两个,只能使用 https 的域名,且申请过程需花费一定时间 
    无APPID时,不可进行发布,但可随意进行网络请求,不限制域名 
  微信对小程序的要求是整体大小不能超过2MB  
  'Component'组件是视图的基本组成单元
目录结构及文件 
  程序主体、总体配置信息：'app.js''app.json''app.wxss' 三个文件组成 
    'app.json'  公共设置、全局配置  
      PS: 决定页面'文件路径''窗口表现''网络超时设置''设置多个tab'等
      {
        // 指定小程序由那些页面组成,必填 
        //   每一项代表页面的信息,新增、减少页面,都需要对pages数组进行修改 
        //   不需写文件后缀,框架会自动去寻找路径'.json''.js''.wxml''.wxss'的四个文件进行整合 
        "pages": [   
          "page/index/index",   // 第一项代表小程序的初始页面
          "page/logs/index"
        ],
        // 设置小程序的'状态栏''导航条''标题''窗口背景色',可选  
        //   '页面.json'文件中若有相同的描述,则会覆盖"window"中描述的信息 
        "window": { 
          "navigationBarBackgroundColor":"#000", // 导航栏背景色 
          "navigationBarTextStyle": "white",     // 导航栏标题颜色,仅支持'black'/'white'
          "navigationBarTitleText": "xxx",       // 导航栏标题文字 
          "backgroundColor": "#fff",             // 窗口背景色
          "backgroundTextStyle": "dark",  // 下拉背景字体、loading图的样式,仅支持'dark'/'light'
          "enablePullDownRefresh":false,  // 是否开启下拉刷新 
          "onReachBottomDistance": 50, // 页面上拉触底事件触发时距页面底部距离,单位'px'
        },
        // 设置底部tab的表现,可选 
        //   指定tab栏表现,及切换对应页面 
        //   最少配置2个,最多5个tab,tab按数组的顺序排序 
        //   图片必须是本地图片不能是网络图片 
        "tabBar": {   
          "color":"#000",           // 文字默认颜色,必填 
          "selectedColor":"#000",   // 文字选中时的颜色,必填 
          "backgroundColor":"#fff", // 背景色,必填 
          "list": [             // 必填 
            { "pagePath": "page/index/index", // 页面路径,须在pages中先定义,必填 
              "text": "firstBar",             // tab上按钮文字,可选 
              "iconPath": "./img.png",        // 图片路径,icon大小限制为40kb,可选 
              // 当 postion 为 top 时,此参数无效
              "selectedIconPath":"./img.png"  // 选中的图片,icon大小限制为40kb,可选 
              // 当 postion 为 top 时,此参数无效
            }, 
          ],
          "borderStyle":"black",    // 边框色,仅支持'black'或'white',可选 
          "position": "bottom"      // 显示位置,支持'bottom''top',可选 
        },
        // 设置各种网络请求超时时间,单位ms,可选 
        "networkTimeout": {  
          "request": 60000,       // 'wx.request'的超时时间,可选 
          'connectSocket': 60000, // 'wx.connectSocket'的超时时间,可选 
          "downloadFile": 60000,  // 'wx.downloadFile'超时时间,可选 
          'uploadFile': 60000     // 'wx.uploadFile'的超时时间,可选  
        },
        // 设置是否开启debug模式,可选 
        //   在开发者工具的控制台面板,调试信息以info的形式给出,
        //   其信息有Page的注册,页面路由,数据更新,事件触发  
        "debug": true  
      }
    'app.js'    逻辑,主要描述该项目入口逻辑 
      主要描述一些用户登录后的信息 
    'app.wxss'  公共样式,可选 
  一个页面由四个文件组成：'xx.js''xx.wxml''xx.wxss''xx.json' 
    PS: 为方便开发,规定描述页面的这四个文件必须具有相同的路径与文件名 
    'xx.wxml'  页面结构,必填 
    'xx.js'    页面逻辑,必填[即使空的也要填写,否则会报错] 
    'xx.wxss'  页面样式表,可选 
    'xx.json'  页面配置,可选 
      只能设置 window 相关的配置项,以决定本页面的窗口表现,无需写 window 这个键 
      {
        "navigationBarBackgroundColor": "#ffffff",
        "navigationBarTextStyle": "black",
        "navigationBarTitleText": "微信接口功能演示",
        "backgroundColor": "#eeeeee",
        "backgroundTextStyle": "light"
      }
模块化 
  PS: 文件作用域: 在JS文件中声明的变量和函数只在该文件中有效
    小程序目前不支持直接引入 node_modules , 
    开发者需要使用到 node_modules 时候建议拷贝出相关的代码到小程序的目录中
  getApp() 全局函数可获取全局的应用实例,若需要全局的数据可以在App()中设置 
    App({
      globalData: 1
    })
    // a.js
    var localValue = 'a'
    var app = getApp()
    app.globalData++
    // b.js
    var localValue = 'b'
    console.log(getApp().globalData)
  通过 module.exports/exports 对外暴露接口 
    function sayHello(name) {
      console.log('Hello ' + name + '!')
    }
    module.exports = {
      sayHello: sayHello
    }
  ​使用 require(path) 将代码引入 
    PS: require 暂时不支持绝对路径 
    var common = require('common.js')
    Page({
      helloMINA: function() {
        common.sayHello('MINA')
      }
    })  
'.js'逻辑层'App Service' 
  PS: 提供丰富的API,如扫一扫,支付等微信特有能力。
    每个页面有独立的作用域,并提供模块化能力。
    由于MINA并非运行在浏览器中,所以JS在web中一些能力都无法使用,如'document''window'等
    开发者写的所有代码最终将会打包成一份JavaScript,并在小程序启动的时候运行,
    直到小程序销毁,类似ServiceWorker,所以逻辑层也称之为App Service。
  App({})   注册小程序 [只能在'app.js'中注册且一次] 
    PS: 指定小程序生命周期函数等;函数中 this 表示小程序实例;
    {
      // ◆生命周期函数
      onLaunch: function(opts){  // 监听小程序初始化,当小程序初始化完成时,全局只触发一次 
        console.log(opts);
        // path  打开小程序的路径
        // query  打开小程序的query
        // scene  打开小程序的场景值
        // shareTicket  shareTicket,详见 获取更多转发信息
        // referrerInfo  当场景为由另一个小程序打开时,返回此字段
        // referrerInfo.appId  来源小程序的 appId
        // referrerInfo.extraData  来源小程序传过来的数据
      },  
      onShow: function(opts){  // 监听小程序显示,小程序启动或者从后台进入到前台  
        console.log(opts);
        // opts 同 onLaunch 
      },
      onHide: function(){  // 监听小程序隐藏,小程序从前台进入到后台 
        console.log('onHide');
      },    
      onError: function(err){ // 错误监听函数,当发生脚本错误,或者api调用失败时触发 
        console.log(err);
      }, 
      'globalData':{}, // 全局数据,通过 this.globalData 或 app.globalData 访问  
      // 可添加任意函数或数据,用 this 访问 
      fooName : function(){
        console.log(1);
      },    
    }
    App.prototype.getCurrentPage() 获取当前页面实例 
      不要在'onLaunch'时调用 getCurrentPage(),此时page还没有生成 
  Page({})  注册页面 
    PS: 指定页面的'初始数据''生命周期函数''事件处理函数'等 
    {
      'data': { //  页面的初始数据 
        key : val,
      },           
      // ◆生命周期 
      onLoad: function(query){   
        // query 其他页面打开当前页面所调用的query参数
        console.log('加载页面',query); 
      },        
      onShow: function(){       
        console.log('页面显示');
      },        
      onReady: function(){      
        // 一个页面只会调用一次,代表页面已经准备妥当,可以和视图层进行交互
        console.log('面初次渲染完成');
      },       
      onHide: function(){      
        console.log('页面隐藏');
      },        
      onUnload: function(){       
        console.log('页面卸载');
      },      
      // 事件处理函数 
      onPullDownRefresh: function () {   
        // 需先在'app.json'或'.json'中配置'enablePullDownRefresh':true 
        console.log('下拉刷新');
      },
      onReachBottom: function () {        
        // 可以在app.json的window选项中或页面配置中设置触发距离onReachBottomDistance 
        // 在触发距离内滑动期间,本事件只会被触发一次
        console.log('上拉触底');
      },
      onShareAppMessage: function(){     
        // 未设置该回调则不会出现转发选项  
        // 返回值用于自定义转发内容
        console.log('点击右上角转发');
        return {   
          'title': '自定义转发标题',  //  转发标题,默认当前小程序名称
          'path': '/page/user?id=123', // 转发路径,默认当前页面path 
          // 必须是以'/'开头的完整路径 
        }
      },
      onPageScroll: function(obj){       
        // obj.scrollTop 页面在垂直方向已滚动的距离,单位px 
        console.log('页面滚动',obj);
      },
      // Any  可添加任意函数或数据,用'this'访问 
    }
    Page.prototype.setData(dataObj,foo) 更新视图层数据[异步],同时改变对应data中的值[同步] 
      PS: 直接修改 this.data 无效,无法改变页面的状态,还会造成数据不一致 
        单次设置的数据不能超过1024kB,请尽量避免一次设置过多的数据
      dataObj  以'key:value'的形式表示将'this.data'中的'key'对应的值改变成'val' 
        其中key可以非常灵活,以数据路径的形式给出,如array[2].message,a.b.c.d,
        并不需要在'this.data'中预先定义 
      foo      本次setData对界面渲染完毕后调用['1.5.0+'] 
      Example: 
        <view>{{text}}</view>
        <button bindtap="changeText"> Change normal data </button>
        <view>{{array[0].text}}</view>
        <button bindtap="changeItemInArray"> Change Array data </button>
        <view>{{object.text}}</view>
        <button bindtap="changeItemInObject"> Change Object data </button>
        <view>{{newField.text}}</view>
        <button bindtap="addNewField"> Add new data </button>
        Page({
          data: {
            text: 'init data',
            array: [{text: 'init data'}],
            object: {
              text: 'init data'
            }
          },
          changeText: function() {
            // this.data.text = 'changed data'  // bad, it can not work
            this.setData({
              text: 'changed data'
            })
          },
          changeItemInArray: function() {
            // you can use this way to modify a danamic data path
            var changedData = {}
            var index = 0
            changedData['array[' + index + '].text'] = 'changed data'
            this.setData(changedData)
          },
          changeItemInObject: function(){
            this.setData({
              'object.text': 'changed data' // 需要使用引号将'object.text'括起来 
            });
          },
          addNewField: function() {
            this.setData({
              'newField.text': 'new data'
            })
          }
        })      
    Page.prototype.route  获取当前页路径['1.2.0+']
  var app = getApp();   获取小程序实例 
  app.getCurrentPages() 获取当前页面栈实例 
    以数组形式按栈的顺序给出,第一个元素为首页,最后一个元素为当前页面
    不要尝试修改页面栈,会导致路由以及页面状态错误
  生命周期 
    A、B 两个界面
    ◆应用启动
    触发App Launch()  Show()
    A:Load() Show() Ready()
    ◆从A跳转[wx.navigateTo]到B
    A:Hide()
    B:Load() Show() Ready()
    ◆关闭B[显示A] 
    B：unLoad()
    A: Show()
    ◆[来电话,从A]切换到后台
    APP：Hide()
    A:Hide()
    ◆从后台切换到前台[A]
    APP:Show()
    A:Show()
    ◆从A跳转[wx.rediectTo]到B
    A:unLoad()
    B:Load() Show() Ready()
'WeiXin Markup language','.wxml'视图元素用于描述页面的结构,由组件进行展示 
  PS: WXML中动态数据均来自对应Page的data;自动会被一个<page>标签包裹
  {{val}}      "Mustache"语法,插值
    适用于'组件文本' '组件属性'
  wx:for="{{arr/obj/str}}"  列表渲染 
    当前下标默认为: 'index';当前项默认为: 'item' 
      <view wx:for="{{items}}">
        {{index}}: {{item:one}}
      </view>
    花括号和引号之间如果有空格,将最终被解析成为字符串 
      <view wx:for="{{[1,2,3]}} "> {{item}} </view>
      // 等同于
      <view wx:for="{{[1,2,3] + ' '}}" > {{item}} </view>
    值为字符串时,将字符串解析成字符串数组 
      <view wx:for="abcde"> {{item}} </view>
      // 等同于
      <view wx:for="{{['a','b','c','d','e']}}"> {{item}} </view>
  wx:for-item="placeholder"  指定当前项 
  wx:for-index="placeholder" 指定当前下标 
    <view wx:for="{{items}}" wx:for-item="name"  wx:for-index="id">
      {{id}}: {{name.one}}
    </view>
  <block wx:for="{{arr}}"> </block>  列表块渲染 
  wx:key="key/*this"    指定列表中项目的唯一标识符 
    PS: 当列表为静态时可不必使用;
      当数据改变触发渲染层重新渲染时,会校正带有key的组件,进行重排而非重建,
      以确保使组件保持自身的状态,并提高列表渲染效率 
    key   即表示为'item[key]',该值需是列表中唯一的字符串或数字,且不能动态改变 
    *this 保留关键字,表示'item'本身,这种表示需item是一个唯一的字符串或者数字
  wx:if="{{val}}"    条件渲染 
    PS: wx:if 是惰性的,如果在初始渲染条件为 false,框架什么也不做,在条件第一次变成真的时候才开始局部渲染
  wx:elif="{{val}}"  条件渲染 
  wx:else            条件渲染 
    和 wx:if 必须相邻 
  <block wx:if="{{val}}"> </block>  多组件条件渲染 
    PS: 一次性判断多个组件标签,可用一个<block/>标签将多个组件包装起来,并使用wx:if控制属性 
      <block/>并不是一个组件,它仅仅是一个包装元素,不会在页面中做任何渲染,只接受控制属性。
    <block wx:if="{{true}}">
      <view> view1 </view>
      <view> view2 </view>
    </block>
  WXML模版及引用 
    <template name="templateName"></template> WXML模板 
      PS: 可在模板中定义代码片段,然后在不同的地方调用 
      定义模板 : 使用'name'属性定义模板的名字,在<template/>内定义代码片段 
        <template name="msgItem">
          <view>
            <text> {{index}}: {{msg}} </text>
            <text> Time: {{time}} </text>
          </view>
        </template>
      使用模板 : 'is'属性声明使用的模板,'data'属性将模板所需要的数据传入 
        <template is="msgItem" data="{{...item}}"/>
        Page({
          data: {
            item: {
              index: 0,
              msg: 'this is a template',
              time: '2016-09-15'
            }
          }
        })
      
        is属性可以使用Mustache语法,在运行时来决定具体需要渲染哪个模板 
        <template name="odd"> 
          <view> odd </view>
        </template>
        <template name="even"> 
          <view> even </view>
        </template>
        <block wx:for="{{[1, 2, 3, 4, 5]}}">
          <template is="{{item % 2 == 0 ? 'even' : 'odd'}}"/>
        </block>
      模板的作用域 : 模板拥有自己的作用域,只能使用data传入的数据 
    ◆WXML提供两种文件引用方式'import'和'include' 
    <import src="xx.wxml"/>   模版引入,在WXML中引入template 
      Example:
        item.wxml : 定义一叫item的template  
        <template name="item">
          <text>{{text}}</text>
        </template>
        index.wxml : 引用 item.wxml,然后使用item模板 
        <import src="item.wxml"/>
        <template is="item" data="{{text: 'forbar'}}"/>
      只会import目标文件中定义的template,而不会import目标文件import的template 
        <!-- A.wxml -->
        <template name="A">
          <text> A template </text>
        </template>
        <!-- B.wxml -->
        <import src="a.wxml"/>
        <template name="B">
          <text> B template </text>
        </template>
        <!-- C.wxml -->
        <import src="b.wxml"/>
        <template is="A"/>  <!-- Error! Can not use tempalte when not import A. -->
        <template is="B"/>
    <include src="xx.wxml"/>  页面引入,将目标文件除了<template/>的整个代码引入
      相当于是拷贝到include位置
      Example:
        index.wxml 中 
        <include src="header.wxml"/>
        <view> body </view>
        <include src="footer.wxml"/>
        header.wxml 中 
        <view> header </view>
        footer.wxml 中 
        <view> footer </view>    
  WXML事件 
    PS: 事件是视图层到逻辑层的通讯方式;可将用户的行为反馈到逻辑层进行处理 
      事件可以绑定在组件上,当达到触发事件,就会执行逻辑层中对应的事件处理函数 
      事件对象可以携带额外信息,如id, dataset, touches。
    使用方式: 在组件中绑定一个事件处理函数 
    事件类型及分类 
      PS: 事件分为冒泡事件和非冒泡事件
      ◆WXML的冒泡事件列表：当一个组件上的事件被触发后,该事件会向父节点传递 
      类型           触发条件
      'tap'         手指触摸后离开
      'touchstart'  手指触摸
      'touchmove'   手指触摸后移动
      'touchcancel' 手指触摸动作被打断,如来电提醒,弹窗
      'touchend'    手指触摸动作结束
      'longpress'   手指触摸后,超过350ms再离开['1.5.0+'] 
        如果指定了事件回调函数并触发了这个事件,tap事件将不被触发 
      'longtap'     手指触摸后,超过350ms再离开[推荐使用'longpress'代替] 
      ◆非冒泡事件：当一个组件上的事件被触发后,该事件不会向父节点传递 
        除上表之外的其他组件自定义事件都是非冒泡事件 
        如<form/>的submit事件,<input/>的input事件,<scroll-view/>的scroll事件
    事件绑定 : 写法同组件的属性['key-val'的形式]  
      'key' : 以'bind'或'catch'开头,加上事件的类型,如'bindtap''catchtouchstart'
      'val' : 一字符串,需在对应的Page中定义同名的函数,否则当触发事件时会报错 
      'bind'事件绑定不会阻止冒泡事件向上冒泡;
      'catch'事件绑定会阻止冒泡事件向上冒泡;
      Example:
        点击inner view 会先后触发'handleTap3'和'handleTap2',
        因为tap事件会冒泡到middle view,而middle view阻止了tap事件冒泡,不再向父节点传递,
        点击middle view会触发'handleTap2',点击outter view会触发'handleTap1'。
        <view id="outter" bindtap="handleTap1">
          outer view
          <view id="middle" catchtap="handleTap2">
            middle view
            <view id="inner" bindtap="handleTap3">
              inner view
            </view>
          </view>
        </view>
    事件的捕获阶段 
      PS: '1.5.0+'起,触摸类事件支持捕获阶段,捕获阶段位于冒泡阶段之前,
        捕获阶段中,事件到达节点的顺序与冒泡阶段恰好相反。
        需要在捕获阶段监听事件时,可以采用capture-bind、capture-catch关键字,后者将中断捕获阶段和取消冒泡阶段。
      在下面的代码中,点击 inner view 会先后调用handleTap2、handleTap4、handleTap3、handleTap1。
      <view id="outer" bind:touchstart="handleTap1" capture-bind:touchstart="handleTap2">
        outer view
        <view id="inner" bind:touchstart="handleTap3" capture-bind:touchstart="handleTap4">
          inner view
        </view>
      </view>
      如果将上面代码中的第一个capture-bind改为capture-catch,将只触发handleTap2。
      <view id="outer" bind:touchstart="handleTap1" capture-catch:touchstart="handleTap2">
        outer view
        <view id="inner" bind:touchstart="handleTap3" capture-bind:touchstart="handleTap4">
          inner view
        </view>
      </view>
    事件对象 
      PS: 如无特殊说明,当组件触发事件时,逻辑层绑定该事件的处理函数会收到一个事件对象 
      ◆'BaseEvent'基础事件对象属性列表
      e.type           事件类型
      e.timeStamp      页面打开到触发事件所经过的ms数 
      e.target         触发事件的源组件,触发事件的组件的一些属性值集合  
        e.target.id   事件源组件的id
        e.target.tagName   当前组件的类型
        e.target.dataset   事件源组件上由data-开头的自定义属性组成的集合 
      e.currentTarget  事件绑定的当前组件,当前组件的一些属性值集合  
        e.currentTarget.id       当前组件的id
        e.currentTarget.tagName  当前组件的类型
        e.currentTarget.dataset  当前组件上由data-开头的自定义属性组成的集合
          'data-*'不区分大小写,大写会自动转成小写加'-',如data-element-type
      ◆'CustomEvent'自定义事件对象属性列表[继承 BaseEvent] 
      e.detail         额外的信息
        自定义事件所携带的数据,如表单组件的提交事件会携带用户的输入,媒体的错误事件会携带错误信息,详见组件定义中各个事件的定义。
        点击事件的detail 带有的 x, y 同 pageX, pageY 代表距离文档左上角的距离。
      ◆'TouchEvent'触摸事件对象属性列表[继承 BaseEvent]：
      e.touches         触摸事件,当前停留在屏幕中的触摸点信息的数组  
        PS: 数组每个元素为一个 Touch 对象,表示当前停留在屏幕上的触摸点 
        identifier num,触摸点的标识符
        pageX   num,距离文档左上角的距离 
        pageY   num,距离文档左上角的距离 
        clientX  num,距离页面可显示区域[屏幕除去导航条]左上角距离
        clientY  num,距离页面可显示区域[屏幕除去导航条]左上角距离 
      e.changedTouches  触摸事件,当前变化的触摸点信息的数组 
        changedTouches 数据格式同 touches。 
        表示有变化的触摸点,如从无变有（touchstart）,位置变化（touchmove）,从有变无（touchend、touchcancel）。
      ◆特殊事件： 
      <canvas/> 中的触摸事件不可冒泡,故没有 currentTarget。
      canvas 触摸事件中携带的 touches 是'CanvasTouch'数组
        identifier num,触摸点的标识符 
        x       num,距离 Canvas 左上角的距离
        y       num,距离 Canvas 左上角的距离
'WeiXin Style Sheet','.wxss'视图样式用于描述页面的样式 
  PS: 为了适应广大的前端开发者,WXSS具有CSS大部分特性 
    同时为了更适合开发微信小程序,我们对CSS进行了扩充以及修改 
  ◆与css相比扩展的特性有 
  尺寸单位 
    PS: 建议：开发微信小程序时设计师可以用iPhone6作为视觉稿的标准。
    'responsive pixel'rpx: 根据屏幕宽度进行自适应,屏幕宽度等于750rpx
      如在iPhone6上,屏幕宽度为375px,共有750个物理像素,
      则'750rpx = 375px = 750物理像素','1rpx = 0.5px = 1物理像素' 
    'root em'rem: 根据屏幕宽度进行自适应,屏幕宽度等于20rem 
  样式导入 
    使用'@import'语句导入外联样式表,@import后跟需要导入的外联样式表的相对路径,用';'结束 
    Example:
      common.wxss 
      .small-p{
        padding:5px;
      }
      app.wxss 
      @import "common.wxss";
      .middle-p:{
        padding:15px;
      }
  内联样式 
    MINA组件上支持使用style、class属性来控制组件的样式 
    style：style接收动态的样式,在运行时会进行解析,
      不要将静态的样式写进style中,统一写到class中,以免影响渲染速度 
      <view style="color:{{color}};" />
  选择器 
    element        标签选择器 
    #id            id选择器 
    .class         类选择器 
    slctor,slctor  并集选择器 
    ::before       伪选择器,内部头部插入内容  
    ::after        伪选择器,内部尾部插入内容  
  全局样式与局部样式 
    定义在app.wxss 中的样式为全局样式,作用于每一个页面。
    在page的wxss文件中定义的样式为局部样式,只作用在对应的页面,并会覆盖app.wxss 中相同的选择器。   
'WeiXin Script','.wxs'套脚本语言,结合WXML，可以构建出页面的结构 
内置组件: 框架为开发者提供的一系列组件,开发者可以通过组合这些基础组件进行快速开发 
  PS: 遵守H5的属性使用原则,当布尔值的属性只用写属性名即表示为'true' ? 
  ◆视图组件 
  <view>         视图容器 
    hover-stop-propagation 是否阻止节点的祖先节点出现点击态,默认'false'['1.5.0+'] ? 
    hover-class   指定点击后的样式类 
      "none"   默认值,没有点击态效果 
    hover-start-time  点击后多久出现点击态,单位ms,默认'50'  
    hover-stay-time   手指松开后点击态保留时间,单位ms,默认'400'
  <scroll-view>  可滚动视图区域 
    PS: 不可在组件内中使用<textarea><map><canvas><video>组件
    scroll-x    横向滚动,默认'false' 
    scroll-y    纵向滚动[需设定高度],默认'false' 
    scroll-with-animation 在设置滚动条位置时使用动画过渡,默认'false' 
    enable-back-to-top [iOS点击顶部状态栏,安卓双击标题栏时]滚动条返回顶部,默认'false' 
      只支持竖向;当页面存在多个<scroll-veiw>时,全部都返回顶部 
    scroll-left    num,设置横向滚动条滚动到的位置,单位px 
      范围:0-(内容宽-视区宽),大于最大值取最大值,小于最小值取最小值  
    scroll-top     num,设置竖向滚动条滚动到的位置,单位px 
      范围:0-(内容宽-视区高),大于最大值取最大值,小于最小值取最小值  
    scroll-into-view   将元素滚动到可视区,值应为某子元素id 
      优先级高于'scroll-top'
    upper-threshold   距顶部/左边多远时,触发'scrolltoupper'事件,单位px,默认'50' 
    lower-threshold   距底部/右边多远时,触发'scrolltolower'事件,默认'50' 
    bindscrolltoupper foo,绑定'scrolltoupper'事件 
    bindscrolltolower foo,绑定'scrolltolower'事件 
    bindscroll        foo,滚动时触发 
      event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY} 
    <scroll-view>中的滚动无法触发'onPullDownRefresh' 
      若要使用下拉刷新,请使用页面的滚动[能通过点击顶部状态栏回到页面顶部],而非<scroll-view> 
    ◆自我总结 
    子组件需超出视图范围,否则无法滚动 
    默认高度为其父元素的100%,需指定其父元素高度,否则滚动相关的事件无法触发 
  <movable-area> 可拖拽滑动视图区域['1.2.0+'] 
    PS: 需设置宽高,否则默认10px;
  <movable-view> 可拖拽滑动的视图容器['1.2.0+'] 
    PS: 宽高默认10px;默认为绝对定位,top和left属性为0px 
      必须在<movable-area>组件中,并且必须是直接子节点,否则不能移动 
      当小于<movable-area>时,移动范围是在<movable-area>内；
      当大于<movable-area>时,移动范围为包含<movable-area>
    x    num,x轴偏移量,改变值会触发动画 
      PS: 如果x的值不在可移动范围内,会自动移动到可移动范围 
    y    num,y轴偏移量,改变值会触发动画 
      PS: 如果y的值不在可移动范围内,会自动移动到可移动范围 
    direction   可移动的方向 
      'none'  默认
      'all'
      'vertical'
      'horizontal'
    inertia     移动否带有惯性,默认'false' 
    out-of-bounds   超过可移动区域后,movable-view是否还可以移动,默认'false' 
    damping   阻尼系数,用于控制过界回弹的动画,值越大移动越快,默认'20' 
    friction  摩擦系数,用于控制惯性滑动的动画,值越大滑动越快停止,默认'2' 
      必须大于0,否则会被设置成默认值
  <swiper>       滑块视图容器,也叫轮播组件 
    PS: 其中只能放置<swiper-item>组件,否则会被删除? 
    indicator-dots  是否显示面板指示点,默认'false' 
    autoplay        是否自动切换,默认'false'  
    circular        是否采用衔接滑动,默认'false'  
    vertical        滑动方向是否为纵向,默认'false' 
    indicator-color        指示点颜色,默认'rgba(0,0,0,0.3)' ['1.1.0+'] 
    indicator-active-color 当前选中的指示点颜色,默认'#000' ['1.1.0+'] 
    interval  自动切换时间间隔,默认'5000' 
    duration  滑动动画时长,默认'500' 
    current    当前所在页面的index,默认'0' 
    bindchange foo,'current'改变时触发'change'事件 
      event.detail = {
        current: current, 
        source: source, // 表示导致变更的原因 ['1.4.0+']
        // autoplay自动播放导致swiper变化；
        // touch用户划动引起swiper变化；
        // 其他原因将用空字符串表示。
      }
      若在'bindchange'事件中使用setData改变current值,有可能导致setData被不停地调用,
      因而通常情况下请不要这样使用 
  <swiper-item>  轮播中一帧的页面 
    PS: 仅可放置在<swiper>组件中,宽高自动设置为100%;通常以循环的方式加载到页面中 
      通过在每一个的 swiper-item 外面包上一个<a>标签,以超链接的方式跳转页面 
    Example: 
      main.wxml
      <view>
        <swiper class="swiper_box" indicator-dots="{{indicatorDots}}" vertical="{{vertical}}" autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}" bindchange="swiperchange">
          <block wx:for="{{images}}">
            <swiper-item>
              <image src="{{item.picurl}}" class="slide-image"/>
            </swiper-item>
          </block>
        </swiper>
      </view>
      main.js
      var app = getApp()    //获取应用实例
      Page({
        data: {
          indicatorDots: true,
          vertical: true,
          autoplay: true,
          interval: 3000,
          duration: 1000,
          loadingHidden: false  // loading
        },
        //事件处理函数
        swiperchange: function(e) { //  轮播 改变时会触发的 change 事件
        },
        onLoad: function() {
          console.log('onLoad')
          var that = this
          //sliderList
          wx.request({
            url: 'http://huanqiuxiaozhen.com/wemall/slider/list',
            method: 'GET',
            data: {},
            header: {
              'Accept': 'application/json'
            },
            success: function(res) {
              that.setData({
                images: res.data
              })
            }
          })
        }
      })
  <cover-view>   覆盖在原生组件上的文本视图 ['1.4.0+'] 
    PS: 可覆盖的原生组件包括<map><video><canvas>,支持嵌套 
      文本建议都套上<cover-view>标签,避免排版错误 
  <cover-image/> 覆盖在原生组件之上的图片视图 ['1.4.0+'] 
    PS: 可覆盖的原生组件同<cover-view>,避免嵌套在其他组件内 
      支持嵌套在<cover-view>里 
      事件模型遵循冒泡模型,但不会冒泡到原生组件 
      只支持基本的定位、布局、文本样式。不支持设置单边的border、opacity、background-image等。
      建议子节点不要溢出父节点
      暂不支持css动画 
    src  图标路径,支持临时路径,暂不支持base64与网络地址 
  ◆基础内容 
  <icon/>   图标 
    type   icon的类型 
      'success'
      'success_no_circle'
      'info'
      'warn'
      'waiting'
      'cancel'
      'download'
      'search'
      'clear'
    size   icon的大小,单位px,默认'23' 
    color  icon的颜色 
  <text>    文本 
    PS: <text>组件内只支持<text>嵌套;除了文本节点以外的其他节点都无法长按选中;
      各个操作系统的空格标准并不一致。
      长按复制功能尚未实现
    selectable  文本是否可选,默认'false'  ['1.1.0+']
    decode      是否解码,默认'false' ['1.4.0+'] 
      可解析的有 '&nbsp;' '&lt;' '&gt;' '&amp;' '&apos;' '&ensp;' '&emsp;'
    space       显示连续空格及方式  ['1.4.0+'] 
      'ensp'  中文字符空格一半大小
      'emsp'  中文字符空格大小
      'nbsp'  根据字体设置的空格大小
  <rich-text>  富文本 ['1.4.0+'] 
    PS: 组件内屏蔽所有节点的事件 
      如果使用了不受信任的HTML节点,该节点及其所有子节点将会被移除;img 标签仅支持网络图片 
    nodes  arr/str,节点列表或HTMLStr,默认值'[]' 
      PS: 推荐使用arr类型,组件会将str类型转换为arr,因而性能会有所下降 
      现支持两种节点: 
      ★type="node" 元素节点,默认值 
      name      str,标签名,支持部分受信任的HTML节点,必填[大小写不敏感] 
        'img'           alt，src，height，width
        'ol'            start，type
        'table'         width
        'th'            colspan，height，rowspan，width
        'td'            colspan，height，rowspan，width
        'colgroup'      span，width
        'col'           span，width
        'tbody' 
        'tfoot' 
        'thead' 
        'tr' 
        'a' 
        'abbr' 
        'b' 
        'blockquote' 
        'br' 
        'code' 
        'dd' 
        'del' 
        'div' 
        'dl' 
        'dt' 
        'em' 
        'fieldset' 
        'h1' 
        'h2' 
        'h3' 
        'h4' 
        'h5' 
        'h6' 
        'hr' 
        'i' 
        'ins' 
        'label' 
        'legend' 
        'li' 
        'p' 
        'q' 
        'span' 
        'strong' 
        'sub' 
        'sup' 
        'ul'
      attrs     obj,属性 
        PS: 支持部分受信任的属性,如class和style,不支持id属性 
        {
          'class' : '',
          'style' : '',
        }
      children  arr,子节点列表,结构和'nodes'一致 
        [
          {
            
          }
        ]
      ★type="text" 文本节点 
      text      str,文本,必填 
    Example: 
      <rich-text nodes="{{nodes}}" bindtap="tap"></rich-text>
      Page({
        data: {
          nodes: [
            {
              type : 'node',
              name: 'div',
              attrs: {
                class: 'div_class',
                style: 'line-height: 60px; color: red;'
              },
              children: [
                {
                  type: 'text',
                  text: 'Hello&nbsp;World!'
                }
              ]
            }
          ]
        },
        tap() {
          console.log('tap')
        }
      })
    支持默认事件,包括：'tap''touchstart''touchmove''touchcancel''touchend'和'longtap' 
  <progress>   进度条 
    percent      百分比,'0-100'间的浮点数 
    show-info    是否在进度条右侧显示百分比,默认'false'
    stroke-width 进度条线的宽度,单位px,默认'6' 
    color           进度条颜色,默认'#09BB07' 
    activeColor     已选择的进度条的颜色
    backgroundColor 未选择的进度条的颜色
    active          进度条从左往右的动画,默认'false' 
  <navigator>  页面链接 
    url           跳转链接 
    open-type     跳转方式 
      'navigate'  对应wx.navigateTo()的功能,默认 
      'redirect'  对应wx.redirectTo()的功能 
      'switchTab' 对应wx.switchTab()的功能 
      'reLaunch'  对应wx.reLaunch()的功能 ['1.1.0+'] 
      'navigateBack' 对应wx.navigateBack()的功能 ['1.1.0+'] 
    delta     num,表示回退的层数[当'open-type'为'navigateBack'时有效] 
    hover-class 指定点击时的样式类 
      'navigator-hover' 默认值 
        {background-color: rgba(0, 0, 0, 0.1); opacity: 0.7;} 
      "none"      没有点击态效果 
    hover-stop-propagation 指定是否阻止本节点的祖先节点出现点击态,默认'false'['1.5.0+']
    hover-start-time   按住后多久出现点击态,单位ms,默认'50'  
    hover-stay-time    手指松开后点击态保留时间,单位ms,默认'600' 
  ◆表单 
  <form>   表单 
    PS: 当点击<form>内'formType'为'submit'的<button>组件时,会提交表单 
    report-submit  是否返回formId用于发送模板消息 
    bindsubmit   foo,携带form中的数据触发'submit'事件 
      event.detail = {value : {'name': 'value'} , formId: ''} 
    bindreset    foo,表单重置时会触发'reset'事件 
  <input/> 输入框 
    PS: <input>组件是native组件,字体是系统字体,所以无法设置 
      在<input>聚焦期间,避免使用css动画；
    value  input值
    type   input类型  
      'text'   文本输入键盘,默认 
      'number' 数字输入键盘
      'idcard' 身份证输入键盘
      'digit'  带小数点的数字键盘
    password     是否是密码类型,默认'false'  
    placeholder  输入框为空时占位符 
      微信版本'6.3.30', placeholder 在聚焦时出现重影问题；
    placeholder-style str,指定'placeholder'的样式 
    placeholder-class 指定'placeholder'的样式类 
      "input-placeholder" 默认 
    disabled   是否禁用,默认'false'  
    maxlength  最大输入长度,默认'140' 
      设置为 -1 的时候不限制最大长度 
    cursor-spacing  指定光标与键盘的距离,单位px ,默认'0' 
      取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离 
    auto-focus  自动聚焦,拉起键盘,默认'false' [即将废弃,请直接使用 focus] 
    focus       获取焦点,默认'false'  
      微信版本'6.3.30', focus 属性设置无效；
    confirm-type  设置键盘右下角按钮的文字['1.1.0+'] 
      "done"   '完成',默认  
      'send'   '发送' 
      'search' '搜索' 
      'next'   '下一个' 
      'go'     '前往' 
    confirm-hold  点击键盘右下角按钮时是否保持键盘不收起,默认'false' ['1.1.0+']
    cursor        num,指定focus时的光标位置['1.5.0+'] 
    bindinput   foo,当键盘输入时,触发'input'事件
      函数的返回值将替换输入框的内容 
      event.detail = {value, cursor}
    bindfocus   foo,输入框聚焦时触发 
      event.detail = {value: value} 
    bindblur    foo,输入框失去焦点时触发 
      event.detail = {value: value} 
    bindconfirm foo,点击完成按钮时触发 
      event.detail = {value: value}
  <checkbox-group>  多项选择器,内部由多个<checkbox>组成 
    bindchange foo,选中项发生改变时触发'change'事件
      detail = {value:[选中的checkbox的value的数组]}
  <checkbox/>       多选项目 
    value     值 
    disabled  是否禁用,默认'false' 
    checked   当前是否选中,可用来设置默认选中,默认'false' 
    color     checkbox的颜色 
  <picker>     从底部弹起的滚动选择器 
    现支持五种选择器'普通选择器''多列选择器''时间选择器''日期选择器''省市区选择器' 
    ★共有属性 
    bindchange foo,value改变时触发'change'事件 
      event.detail = {value: value}
    disabled   是否禁用,默认'false' 
    ★mode="selector" 普通选择器,默认值 
    range      默认'[]' 
    range-key  当'range'是objArr时,指定对象中key的值作为选择器显示内容 
    value      表示选择了'range'中的第几个[下标从0开始],默认'0'
    ★mode='multiSelector' 多列选择器 ['1.4.0+']
    range      二维数组,长度表示多少列,数组的每项表示每列的数据,默认'[]' 
      如[["a","b"], ["c","d"]]
    range-key  指定数组中对象的key值作为选择器显示内容 
    value      数组的元素表示选择了range对应项中的第几个,下标从0开始,默认'[]' 
    bindcolumnchange foo,某一列的值改变时触发'columnchange'事件
      event.detail = {
        column: column,  // 表示改变了第几列,下标从0开始 
        value: value     // 表示变更值的下标 
      }
    ★mode='time' 时间选择器 
    value   表示选中的时间,格式为"hh:mm"
    start   表示有效时间范围的开始,字符串格式为"hh:mm"
    end     表示有效时间范围的结束,字符串格式为"hh:mm"
    ★mode='date' 日期选择器 
    value  表示选中的日期,格式为"YYYY-MM-DD",默认'0'
    start  表示有效日期范围的开始,字符串格式为"YYYY-MM-DD"
    end    表示有效日期范围的结束,字符串格式为"YYYY-MM-DD"
    fields 表示选择器的粒度 
      day   选择器粒度为天,默认值 
      year  选择器粒度为年 
      month 选择器粒度为月份 
    ★mode='region' 省市区选择器 ['1.4.0+']
    value         表示选中的省市区,默认选中每一列的第一个值 
    custom-item   可为每一列的顶部添加一个自定义的项 '1.5.0+' 
  <picker-view>  嵌入页面的滚动选择器 
    PS: 其中只可放置<picker-view-column>组件,其他节点不会显示 
      滚动时在iOS自带振动反馈,可在系统设置 -> 声音与触感 -> 系统触感反馈中关闭
    value    arr,数组中的数字依次表示... 
      数字大于 picker-view-column 可选项长度时,选择最后一项 
    indicator-style  设置选择器中间选中框的样式 
    indicator-class  设置选择器中间选中框的类名['1.1.0+'] 
    mask-style       设置蒙层的样式['1.5.0'] 
    mask-class       设置蒙层的类名 ['1.5.0']
    bindchange   foo,当滚动选择,value 改变时触发'change'事件
      event.detail = {value: value}；
      value为数组,表示 picker-view 内的 picker-view-column 当前选择的是第几项（下标从 0 开始）
  <picker-view-column> 滚动选择项 
    仅可放置于<picker-view>中,其子节点的高度会自动设置成与<picker-view>的选中框的高度一致 
  <radio-group>  单项选择器,内部由多个<radio/>组成 
    bindchange foo,选中项发生变化时触发'change'事件 
      event.detail = {value: 选中项radio的value}
  <radio>  单选项目 
    value     值 
    checked   当前是否选中,默认'false' 
    disabled  是否禁用,默认'false' 
    color     radio的颜色,同css的color
  <slider>  滑动选择器 
    min   最小值,默认'0' 
    max   最大值,默认'100' 
    step  步长,取值必须大于0,并且可被(max-min)整除,默认'1'
    disabled  是否禁用,默认'false'
    value     当前取值,默认'0' 
    color           背景条的颜色[请使用'backgroundColor'],默认'#e9e9e9'
    selected-color  已选择的颜色[请使用'activeColor'],默认'#1aad19'
    activeColor     已选择的颜色,默认'#1aad19' 
    backgroundColor 背景条的颜色,默认'#e9e9e9' 
    show-value      是否显示当前value,默认'false' 
    bindchange    foo,完成一次拖动后触发的事件
      event.detail = {value: value}
  <'switch'>  开关选择器 
    PS: switch切换在iOS自带振动反馈,可在系统设置 -> 声音与触感 -> 系统触感反馈中关闭 
    checked   是否选中,默认'false'
    type      样式
      'switch'   默认 
      'checkbox'  
    bindchange foo, checked改变时触发'change'事件
      event.detail={ value:checked}
    color      switch颜色,同css的color
  <textarea> 多行输入框 
    PS: 微信版本'6.3.30',列表渲染时,新增加的<textarea>在自动聚焦时的位置计算错误 
      <textarea>的blur事件会晚于页面上的tap事件,
      如果需要在<button>的点击事件获取textarea,可以使用form的bindsubmit。
      不建议在多行文本上对用户的输入进行修改,
      所以textarea的bindinput处理函数并不会将返回值反映到textarea上
      textarea组件是由客户端创建的原生组件,它的层级是最高的。
      请勿在scroll-view中使用 textarea 组件。
      css动画对textarea组件无效
    value   输入框的内容 
    placeholder         输入框为空时占位符 
    placeholder-style   指定'placeholder'的样式 
    placeholder-class   指定'placeholder'的样式类 
      'textarea-placeholder'  默认 
    disabled   是否禁用,默认'false' 
    maxlength   最大输入长度,设置为'-1'的时候不限制最大长度,默认'140'  
    auto-focus  自动聚焦,拉起键盘,默认'false' 
    focus       获取焦点,默认'false'  
    auto-height 是否自动增高,设置auto-height时,style.height 不生效,默认'false'  
    fixed      如果textarea是在一个position:fixed的区域,需要显示指定属性fixed为true,默认'false' 
    cursor-spacing   指定光标与键盘的距离,单位px,默认'0' 
      取textarea距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离  
    cursor         num,指定focus时的光标位置 '1.5.0+'
    bindfocus foo,输入框聚焦时触发 
      event.detail = {value: value} 
    bindblur  foo,输入框失去焦点时触发 
      event.detail = {value: value} 
    bindlinechange foo,输入框行数变化时调用 
      event.detail = {height: 0, heightRpx: 0, lineCount: 0} 
    bindinput      foo,当键盘输入时,触发'input'事件 
      event.detail = {value, cursor}, bindinput 处理函数的返回值并不会反映到 textarea 上 
    bindconfirm    foo,点击完成时,触发'confirm'事件 
      event.detail = {value: value}
  <label>    用来改进表单组件的可用性 
    PS: 使用for属性找到对应的id,或者将控件放在该标签下,当点击时,就会触发对应的控件 
      for优先级高于内部控件,内部有多个控件的时候默认触发第一个控件 
      目前可以绑定的控件有：<button/>, <checkbox/>, <radio/>, <'switch'>。
    for   绑定控件的id 
  <button> 按钮 
    size   按钮大小   
      'default'  默认 
      'mini'
    type   按钮样式类型   
      'default'   默认 
      'primary' 
      'warn'
    plain  按钮是否镂空,背景色透明,默认'false' 
    disabled  是否禁用,默认'false'  
    loading   名称前是否带'loading'图标,默认'false' 
    form-type 点击对表单产生的效果 
      点击分别会触发<form>组件的submit/reset事件 
      'submit' 提交表单
      'reset'  重置表单
    hover-class 指定按钮按下去的样式类   
      'button-hover'   默认值 
        {background-color: rgba(0, 0, 0, 0.1); opacity: 0.7;}
      "none"           无点击态效果 
    hover-stop-propagation  指定是否阻止本节点的祖先节点出现点击态,默认'false' ['1.5.0+']
    hover-start-time   按住后多久出现点击态,单位ms,默认'20'   
    hover-stay-time   手指松开后点击态保留时间,单位ms,默认'70'   
    open-type       微信开放能力['1.1.0+']
      "getPhoneNumber" 获取用户手机号,可从'bindgetphonenumber'回调用获取到用户信息,解包方式
      "getUserInfo"    获取用户信息,可从'bindgetuserinfo'回调中获取到用户信息  
      'contact'        打开客服会话 
      'share'          触发用户转发 
    bindgetphonenumber foo,获取用户手机号回调 '1.2.0+' 
    bindgetuserinfo    foo,用户点击该按钮时,会返回获取到的用户信息 ['1.3.0+']
      从返回参数的detail中获取到的值同 wx.getUserInfo  
    bindcontact        foo,客服消息回调 
    session-from       str,会话来源['1.4.0+']  
    send-message-title str,会话内消息卡片标题,默认为当前标题['1.5.0+'] 
    send-message-path  str,会话内消息卡片点击跳转小程序路径,默认当前分享路径 
    send-message-img   str,会话内消息卡片图片,默认为当前截图 
    show-message-card  显示会话内消息卡片,默认'false'  
  ◆媒体组件 
  <image/> 图片 
    PS: image组件默认宽度300px、高度225px
    lazyload   图片懒加载,只在<page>与<scroll-view>下生效,默认'false'['1.5.0']
    src   图片资源地址 
    mode  'scaleToFill' 图片裁剪、缩放的模式 
      mode 有 13 种模式,其中 4 种是缩放模式,9 种是裁剪模式 
      ★缩放 
      'scaleToFill' 不保持纵横比缩放图片,使图片的宽高完全拉伸至填满image元素,默认值 
      'aspectFit'   保持纵横比缩放图片,使图片的长边能完全显示出来,即完整显示图片 
      'aspectFill'  保持纵横比缩放图片,只保证图片的短边能完全显示出来
        也就是说,图片通常只在水平或垂直方向是完整的,另一个方向将会发生截取。
      'widthFix'    宽度不变,高度自动变化,保持原图宽高比不变 
      ★裁剪,不缩放图片  
      'top'          只显示图片的顶部区域
      'bottom'       只显示图片的底部区域
      'center'       只显示图片的中间区域
      'left'         只显示图片的左边区域
      'right'        只显示图片的右边区域
      'top left'     只显示图片的左上边区域
      'top right'    只显示图片的右上边区域
      'bottom left'  只显示图片的左下边区域
      'bottom right' 只显示图片的右下边区域
    binderror foo,当错误发生时触发 
      event.detail = {errMsg: 'something wrong'} 
    bindload  foo,当图片载入完毕时触发  
      event.detail = {height:'图片高度px', width:'图片宽度px'}
  <audio> 音频 
    id       组件的唯一标识符
    src      要播放音频的资源地址
    loop     是否循环播放,默认'false' 
    controls 是否显示默认控件,默认'true' 
    poster   默认控件上的音频封面的图片资源地址[需'controls'为true] 
    name     默认控件上的音频名字,默认'未知音频'[需'controls'为true] 
    author   默认控件上的作者名字,默认'未知作者'[需'controls'为true] 
    binderror      foo,当发生错误时触发'error'事件 
      detail = {errMsg: MediaError.code}
      MediaError.code
      MEDIA_ERR_ABORTED 获取资源被用户禁止
      MEDIA_ERR_NETWORD 网络错误
      MEDIA_ERR_DECODE 解码错误
      MEDIA_ERR_SRC_NOT_SUPPOERTED 不合适资源
    bindplay       foo,当开始/继续播放时触发'play'事件 
    bindpause      foo,当暂停播放时触发'pause'事件 
    bindtimeupdate foo,当播放进度改变时触发'timeupdate'事件 
      detail = {currentTime, duration}
    bindended      foo,当播放到末尾时触发'ended'事件 
  <video> 视频 
    PS: video标签认宽度300px、高度225px,设置宽高需要通过wxss设置width和height 
      video组件是由客户端创建的原生组件,它的层级是最高的。
      请勿在scroll-view中使用video组件
      css动画对video组件无效 
    src         要播放视频的资源地址 
    duration    指定视频时长 ['1.1.0']
    controls    是否显示默认播放控件播放/暂停按钮、播放进度、时间[],默认'true' 
    enable-danmu  是否展示弹幕,只在初始化时有效,不能动态变更,默认'false' 
    danmu-btn     是否显示弹幕按钮,只在初始化时有效,不能动态变更,默认'false'  
    danmu-list    弹幕列表 
    autoplay  是否自动播放,默认'false' 
    loop      是否循环播放,默认'false'  '1.4.0'
    muted     是否静音播放,默认'false'  '1.4.0'
    bindplay       foo,当开始/继续播放时触发play事件 
    bindpause      foo,当暂停播放时触发 pause 事件 
    bindended      foo,当播放到末尾时触发 ended 事件 
    bindtimeupdate foo,播放进度变化时触发[触发频率大约在250ms/次]
      event.detail = {currentTime: '当前播放时间'} 。 
    bindfullscreenchange foo,当视频进入和退出全屏是触发 '1.4.0'
      event.detail = {fullScreen: '当前全屏状态'} 
    objectFit   当视频大小与video容器大小不一致时,视频的表现形式 
      'contain'  包含,默认值 
      'fill'     填充
      'cover'    覆盖 
    poster      默认控件上的音频封面的图片资源地址['controls'需为true]
  ◆其他
  <map> 地图 
    PS: 客户端创建的原生组件,它的层级是最高的
      请勿在 scroll-view 中使用 map 组件。 css 动画对 map 组件无效。
      map 组件使用的经纬度是火星坐标系,调用 wx.getLocation 接口需要指定 type 为 gcj02
      地图组件的经纬度必填, 如果不填经纬度则默认值是北京的经纬度。
    longitude    num,中心经度 
    latitude     num,中心纬度 
    scale    缩放级别,取值范围为'5-18',默认'16'  
    markers  arr,标记点 
    covers   arr,即将移除,请使用markers 
    polyline arr,路线 
    circles  arr,圆 
    controls arr,控件 
    include-points arr,缩放视野以包含所有给定的坐标点 
    show-location bol,显示带有方向的当前定位点 
    bindmarkertap    foo,点击标记点时触发 
    bindcallouttap   foo,点击标记点对应的气泡时触发 '1.2.0+'
    bindcontroltap   foo,点击控件时触发 
    bindregionchange foo,视野发生变化时触发 
    bindtap          foo,点击地图时触发
    markers  标记点用于在地图上显示标记的位置
      属性 说明 类型 必填 备注 最低版本
      id 标记点id Number 否 marker点击事件回调会返回此id 
      latitude 纬度 Number 是 浮点数,范围 -90 ~ 90 
      longitude 经度 Number 是 浮点数,范围 -180 ~ 180 
      title 标注点名 String 否  
      iconPath 显示的图标 String 是 项目目录下的图片路径,支持相对路径写法,以'/'开头则表示相对小程序根目录；也支持临时路径 
      rotate 旋转角度 Number 否 顺时针旋转的角度,范围 0 ~ 360,默认为 0 
      alpha 标注的透明度 Number 否 默认1,无透明 
      width 标注图标宽度 Number 否 默认为图片实际宽度 
      height 标注图标高度 Number 否 默认为图片实际高度 
      callout 自定义标记点上方的气泡窗口 Object 否 {content, color, fontSize, borderRadius, bgColor, padding, boxShadow, display} 1.2.0
      label 为标记点旁边增加标签 Object 否 {color, fontSize, content, x, y},可识别换行符,x,y原点是marker对应的经纬度 1.2.0
      anchor 经纬度在标注图标的锚点,默认底边中点 Object 否 {x, y},x表示横向(0-1),y表示竖向(0-1)。{x: .5, y: 1} 表示底边中点 1.2.0
    marker   上的气泡 callout
    content  文本 String
      color 文本颜色 String
      fontSize 文字大小 Number
      borderRadius callout边框圆角 Number
      bgColor 背景色 String
      padding 文本边缘留白 Number
      display 'BYCLICK':点击显示; 'ALWAYS':常显 String
    polyline 指定一系列坐标点,从数组第一项连线至最后一项
      points 经纬度数组 Array 是 [{latitude: 0, longitude: 0}] 
      color 线的颜色 String 否 8位十六进制表示,后两位表示alpha值,如：#000000AA 
      width 线的宽度 Number 否  
      dottedLine 是否虚线 Boolean 否 默认false 
      arrowLine 带箭头的线 Boolean 否 默认false,开发者工具暂不支持该属性 1.2.0
      borderColor 线的边框颜色 String 否  1.2.0
      borderWidth 线的厚度 Number 否  1.2.0
    circles 在地图上显示圆
      latitude 纬度 Number 是 浮点数,范围 -90 ~ 90
      longitude 经度 Number 是 浮点数,范围 -180 ~ 180
      color 描边的颜色 String 否 8位十六进制表示,后两位表示alpha值,如：#000000AA
      fillColor 填充颜色 String 否 8位十六进制表示,后两位表示alpha值,如：#000000AA
      radius 半径 Number 是 
      strokeWidth 描边的宽度 Number 否
    controls 在地图上显示控件,控件不随着地图移动
      id 控件id Number 否 在控件点击事件回调会返回此id
      position 控件在地图的位置 Object 是 控件相对地图位置
      iconPath 显示的图标 String 是 项目目录下的图片路径,支持相对路径写法,以'/'开头则表示相对小程序根目录；也支持临时路径
      clickable 是否可点击 Boolean 否 默认不可点击
    position 
      left 距离地图的左边界多远 Number 否 默认为0
      top 距离地图的上边界多远 Number 否 默认为0
      width 控件宽度 Number 否 默认为图片宽度
      height 控件高度 Number 否 默认为图片高度
  <canvas> 画布 
    PS: 由客户端创建的原生组件,它的层级是最高的; 默认宽度300px、高度225px 
      css 动画对 canvas 组件无效 
      请勿在 scroll-view 中使用 canvas 组件 
    canvas-id      组件的唯一标识符 
      同一页面中的 canvas-id 不可重复,如果使用一个已经出现过的 canvas-id,该 canvas 标签对应的画布将被隐藏并不再正常工作
    disable-scroll 当在canvas中移动时且有绑定手势事件时,禁止屏幕滚动以及下拉刷新,默认'false' 
    bindtouchstart  foo,手指触摸动作开始
    bindtouchmove   foo,手指触摸后移动
    bindtouchend    foo,手指触摸动作结束
    bindtouchcancel foo,手指触摸动作被打断,如来电提醒,弹窗
    bindlongtap     foo,手指长按'500ms'之后触发,触发了长按事件后进行移动不会触发屏幕的滚动
    binderror       foo,当发生错误时触发'error'事件
      detail = {errMsg: 'something wrong'}
  <open-data> 用于展示微信开放的数据 ['1.4.0+'] 
    type       str,开放数据类型
      'groupName' 拉取群名称[只有当前用户在此群内才能拉取到群名称] ['1.4.0+'] 
    open-gid   str,群id,当 type="groupName" 时生效, 
  <contact-button>  客服会话按钮,点击后会进入客服会话 
    PS: <button>组件通过设置open-type="contact"也可进入客服会话  
    size   按钮大小[有效值'18-27'],单位px,默认'18' 
    type   按钮的样式类型 
      'default-dark'  默认 
      'default-light'
    session-from str,用户从该按钮进入会话时,开发者将收到带上本参数的事件推送 
      本参数可用于区分用户进入客服会话的来源。
  ◆属性相关 
API 
  网络 
    PS: 最大并发数是 10; 默认超时时间和最大超时时间都是60s 
      网络请求的'referer'是不可以设置的，
      格式固定为' https://servicewechat.com/{appid}/{version}/page-frame.html'，
      其中 {appid} 为小程序的 appid，{version} 为小程序的版本号，版本号为 0 表示为开发版。
      小程序进入后台运行后（非置顶聊天），如果5s内网络请求没有结束，会回调错误信息 "fail interrupted"；
      在回到前台之前，网络请求接口调用都会无法调用。
    var requestTask = wx.request({})    发起http请求  
      PS:  
      {
        'method': 'POST', // 默认为 GET,需采用大写形式  
          // 有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        'url': 'url', // url 中不能有端口 
        'header': {  // 设置请求的header 
          'Accept': 'application/json'
          'content-type': 'application/json', 
            // 'application/json' 默认值,会对数据进行 JSON 序列化
            // 'application/x-www-form-urlencoded'  会将数据转换成 query string 
        },
        'data': {  // 请求的参数可以采用'xxx=xxx&xxx=xxx'的形式或者{key:val}的形式 
          type: "1"
        },
        'dataType': 'json', // 可选,默认为'json' 
          // 如果设置了 dataType 为 json，则会尝试对响应的数据做一次 JSON.parse
        success: function (response) {
          // response  响应 
          //   data       服务器返回的数据 
          //   statusCode 服务器返回的状态码 
          //   header     服务器返回的 HTTP Response Header 
          that.setData({
            images: response.data.data.guanggao
          })
        },
        fail:function(err){
          console.log(err)
        },
        complete: function(){ // 调用结束后无论成功或者失败都会被调用 
          console.log();
        } 
      }
      requestTask 返回值对象,可调用方法中断请求任务 
        requestTask.abort()  中断请求任务'1.4.0+'
    var uploadTask = wx.uploadFile(params)    上传文件,将本地资源上传到服务器  
      PS: 如通过 wx.chooseImage 等接口获取到一个本地资源的临时文件路径后，
        可通过此接口将本地资源上传到指定服务器。
        客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data 。
      {
        'url': 'xx', // 服务器url
        'filePath': 'xx', // 要上传文件资源的路径
        'name': '',  // 文件对应的 key , 服务器端通过这个key可以获取到文件二进制内容
        'header': {},   // 请求 Header  
        'formData': {}, // 请求中其他额外的 form data
        success: function(response){ // 接口调用成功的回调函数 
          // response.data       开发者服务器返回的数据
          // response.statusCode HTTP状态码
        }, 
        fail : function(){   // 接口调用失败的回调函数 
        }, 
        complete :function(){ // 调用成功、失败都会执行 
        }, 
      }
      uploadTask 返回值对象，可监听上传进度变化事件，以及取消上传任务 
        uploadTask.onProgressUpdate(foo)  监听上传进度变化 '1.4.0' 
          foo  回调,参数 (response) 
          response.progress       num,上传进度百分比
          response.totalBytesSent num,已经上传的数据长度，单位 Bytes
          response.totalBytesExpectedToSend num,预期需要上传的数据总长度，单位 Bytes 
        uploadTask.abort()  中断上传任务 '1.4.0' 
    var downloadTask = wx.downloadFile(params)  下载文件资源到本地
      PS: 客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径 
      {
        'url': '', 
        'header': {}, 
        success: function(response){
          // response.tempFilePath   文件的临时路径 
            // 文件的临时路径，在小程序本次启动期间可以正常使用，
            // 如需持久保存，需在主动调用 wx.saveFile，在小程序下次启动时才能访问得到
        }, 
        fail: function(){
        },
        complete : function(){
        },
      }
      downloadTask 返回值对象,可监听下载进度变化事件，以及取消下载任务 
        downloadTask.onProgressUpdate(foo(response))  监听下载进度变化 '1.4.0'
          response.progress           下载进度百分比
          response.totalBytesWritten  已经下载的数据长度，单位 Bytes
          response.totalBytesExpectedToWrite 预期需要下载的数据总长度，单位 Bytes
        downloadTask.abort()  中断下载任务 '1.4.0'
    wx.connectSocket(params)     创建WebSocket连接 
      PS: 一个微信小程序同时只能有一个WebSocket连接,否则后续再创建会导致之前的连接关闭;
      {
        'url' : '', // 必须是wss协议 
        'data' : {}, 
        'header' : {},  
        'method' : 'GET', // 默认是GET
          // 有效值： OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 
        'protocols' : [], //  StringArray 否 子协议数组 1.4.0
        success : function(){
        },
        fail : function(){
        },
        complete : function(){
        },
      }
    wx.onSocketOpen(foo(res))    监听WebSocket打开 
    wx.sendSocketMessage(params) 发送WebSocket消息
      PS: 需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送
      {
        data : {}, //  String/ArrayBuffer,需要发送的内容
        success : function(){ // 可选 
        },
        fail : function(){ // 可选 
        },
        complete : function(){ // 可选 
        },
      }
    wx.onSocketMessage(foo(res)) 接收WebSocket消息
      res.data    String/ArrayBuffer,服务器返回的消息 
    wx.closeSocket(params)       关闭WebSocket连接 
      PS: 当连接打开后再调用 wx.closeSocket 才能关闭连接,否则不起作用 
      {
        'code' : num,  // 可选,表示关闭连接的状态号，表示连接被关闭的原因。
          // 默认的取值是1000 （表示正常连接关闭） 1.4.0
        'reason' : '', // 可选,表示连接被关闭的原因
          // 这个字符串必须是不长于123字节的UTF-8 文本（不是字符） 1.4.0
        success : function(){ // 可选 
        },
        fail : function(){ // 可选 
        },
        complete : function(){ // 可选 
        },
      }
    wx.onSocketError(foo(res))   监听WebSocket错误
    wx.onSocketClose    监听WebSocket关闭
  媒体 
    ◆图片 
    wx.chooseImage({})   从本地相册选择图片或使用相机拍照 
      {
        'count' : 9, // 最多可以选择的图片张数，默认9
        'sizeType': ['original', 'compressed'],  //  original原图，compressed压缩图，默认二者都有
        'sourceType': ['album', 'camera'], //  album从相册选图，camera使用相机，默认二者都有
        success : function(res){ 
          // res. tempFilePaths  图片的本地文件路径列表 
          // res.tempFiles  图片的本地文件列表，每一项是一个File对象 '1.2.0'
            // [
            //   {
            //     'path' : '', 本地文件路径
            //     'size' : '', 本地文件大小，单位：B
            //   },
            // ]
        },
        fail : function(){ },
        complete : function(){ },
      }
    wx.previewImage({})  预览图片 
      {
        'urls': [], // 需要预览的图片链接列表
        'current': '', // 当前显示图片的链接，不填则默认为 urls 的第一张
        success:function(){ },
        fail : function(){ },
        complete : function(){ },
      }
    wx.getImageInfo({})  获取图片信息 
      {
        'src' : '', // 图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径
        success : function(res){
          // res.width   num,图片宽度，单位px
          // res.height  num,图片高度，单位px
          // res.path    返回图片的本地路径
        },
        fail : function(){
        },
        complete : function(){
        },
      }
    wx.saveImageToPhotosAlbum({}) 保存图片到系统相册 '1.2.0+'
      PS: 需要用户授权（scope.writePhotosAlbum），详见 用户授权 
      {
        'filePath': '', // 图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
        success:function(res){
          // res.errMsg 调用结果
        },
        fail:function(){ },
        complete:function(){ },
      }
    ◆录音 
    wx.startRecord({}) 开始录音,返回录音文件的临时文件路径,接口需要用户授权 
      PS: 当主动调用wx.stopRecord，或者录音超过1分钟时自动结束录音
        当用户离开小程序时，此接口无法调用。
      {
        success: function(res){
          // res.tempFilePath  录音文件的临时路径
            // 需持久保存，需在主动调用wx.saveFile
        },
        fail: function(){
        },
        complete: function(){
        },
      }
    wx.stopRecord()  ​ 主动调用停止录音
    ◆音频播放控制 
    ◆音乐播放控制 
  文件 
  数据缓存  
  位置 
    wx.getLocation({}) 获取当前地理位置信息 
      PS: 当用户离开小程序后，此接口无法调用；当用户点击“显示在聊天顶部”时，此接口可继续调用。
      {
        'type' : '', 指定返回坐标的类型 
          // 默认为'wgs84'返回gps坐标,'gcj02'返回可用于 wx.openLocation 的坐标
        success:function(res){
          // res.latitude  纬度，浮点数，范围为-90~90，负数表示南纬 
          // res.longitude 经度，浮点数，范围为-180~180，负数表示西经 
          // res.speed     速度，浮点数，单位m/s 
          // res.accuracy  位置的精确度 
          // res.altitude  高度，单位 m 1.2.0
          // res.verticalAccuracy 垂直精度，单位 m（Android 无法获取，返回 0） 1.2.0
          // res.horizontalAccuracy 水平精度，单位 m 1.2.0
        },
        fail:function(){
        },
        complete:function(){
        },
      }

  todo : ----------------------------------------------------------------------
  wx.getStorageSync(key)      读取本地存储的数据 
  wx.setStorageSync(key,val)  本地存储 
    val 可为任意类型
  wx.login({         // 用户登录 
    success: (res) => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
    }
  })
  wx.getSetting({      // 获取用户信息 
    success: (res) => {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权,可以直接调用 getUserInfo 获取头像昵称,不会弹框
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            this.globalData.userInfo = res.userInfo
            
            // 由于 getUserInfo 是网络请求,可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          }
        })
      }
    }
  })
  wx.getUserInfo({}) 
  wx.stopPullDownRefresh;  停止当前页面的下拉刷新 
  ★检测 
  wx.getSystemInfo     获取到小程序的基础库版本号 
  wx.getSystemInfoSync 获取到小程序的基础库版本号 
  wx.canIUse     判断是否可以在该基础库版本下直接使用对应的API或者组件 
  app = getApp()   获取小程序实例 
页面路由 : 小程序中所有页面的路由全部由框架进行管理 
  PS: 框架以栈的形式维护了当前的所有页面; 一个应用同时只能打开5个页面
  页面栈 : 以栈的形式维护当前的所有页面  
    当发生路由切换的时候,页面栈的表现如下：
    路由方式       页面栈表现
    初始化          新页面入栈
    打开新页面      新页面入栈
    页面重定向      当前页面出栈,新页面入栈
    页面返回        页面不断出栈,直到目标返回页面,新页面入栈
    Tab切换        当前页面出栈, 新页面入栈
  wx.nativateTo({})  保留当前页面,跳转到指定页[只能打开非 tabBar 页] 
    使用'wx.navigateBack'可以返回到原页面 
    以查询字符串的形式进行页面间的传递数据 
      wx:navigateTo({
        url:"../logs/logs?id=10"
      })
      然后通过B中 onLoad(options) 中取出
  wx.redirectTo({})  关闭当前页面,跳转到指定页[只能打开非 tabBar 页] 
  wx.navigatBack({}) 关闭当前页面,返回前若干页
    可通过 getCurrentPages()) 获取当前的页面栈,决定需要返回几层 
  wx.switchTab({})   跳转到tabBar页面,并关闭其他所有非tabBar页面 
  wx.reLaunch()      重新启动[可打开任意页] 
微信Web开发者工具使用 
  快速创建文件[包括'.js''.json''.wxml''.wxss']
    在'app.json'中的'pages'中新增元素即可[注意最后一个不可有',']
      即使在'app.json'中删除了'pages'的元素,新增加的文件也不会被删除 
兼容处理 
  基础库与客户端之间的关系
    小程序的能力需要微信客户端来支撑,每一个基础库都只能在对应的客户端版本上运行,
    高版本的基础库无法兼容低版本的微信客户端
  兼容方式 - 接口
    对于新增的 API,可以用以下代码来判断是否支持用户的手机
    if (wx.openBluetoothAdapter) {
      wx.openBluetoothAdapter()
    } 
    else {
      // 如果希望用户在最新版本的客户端上体验您的小程序,可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低,无法使用该功能,请升级到最新微信版本后重试。'
      })
    }
  兼容方式 - 参数
    对于 API 的参数或者返回值有新增的参数,可以判断用以下代码判断。
    wx.showModal({
      success: function(res) {
        if (wx.canIUse('showModal.cancel')) {
          console.log(res.cancel)
        }
      }
    })
  兼容方式 - 组件 
    对于组件,新增的属性在旧版本上不会被处理,不过也不会报错。
    如果特殊场景需要对旧版本做一些降级处理,可以这样子做。
    Page({
      data: {
        canIUse: wx.canIUse('button.open-type.contact')
      }
    })
    <button wx:if="{{canIUse}}" open-type="contact"> 客服消息 </button>
    <contact-button wx:else></contact-button>
运行机制 
  PS: 小程序没有重启的概念
    当小程序进入后台,客户端会维持一段时间的运行状态,超过一定时间后（目前是5分钟）会被微信主动销毁
    置顶的小程序不会被微信主动销毁
    当收到系统内存告警也会进行小程序的销毁
  前台、后台定义: 
    当用户点击左上角关闭,或者按了设备Home键离开微信,
    小程序并没有正在销毁,而是进入了后台,
    当再次启动微信或再次打开小程序,又会从后台进入前台。
    只有当小程序进入后台一定时间,或者系统资源占用过高,才会被真正销毁。
  再次打开逻辑 '1.4.0+' 
    用户打开小程序的预期有以下两类场景：
    A. 打开首页： 场景值有 1001, 1019, 1022, 1023, 1038, 1056
    B. 打开小程序指定的某个页面： 场景值为除 A 以外的其他
    当再次打开一个小程序逻辑如下：
    上一次的场景 当前打开的场景 效果
    A A 保留原来的状态
    B A 清空原来的页面栈,打开首页（相当于执行 wx.reLaunch 到首页）
    A 或 B B 清空原来的页面栈,打开指定页面（相当于执行 wx.reLaunch 到指定页）
自我总结 
  '.wxss'中可使用weui中的样式,在CSS中定义即可而不用引入文件 
    <image src="../../image/ing.png" class="animationImg"/>
    .animationImg{
      animation: weuiLoading 1s steps(12, end) infinite;
    }
  HTML标签的可用性总结 
    ◆标签链接被删除 
    a img 
Question&Idea 
  连接跳转到的页面仍有tabBar,如何实现 
-------------------------------------------------------------------------待整理 
