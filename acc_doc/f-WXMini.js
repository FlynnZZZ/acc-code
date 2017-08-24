miniA微信小程序
说明 
  介绍:
    微信小程序主要依赖于微信平台,使用微信台提供的'View''Event''Component''Container'等构建,
    可以说是介于 Web App 和 Native App 之间的一种类型。无须Native App的安装,比Web APP更好的体验
  开发小程序时可以选择有 APPID 和 无 APPID 两种方式,及其区别 
    有APPID时,只能和指定的域名进行通信,如果没有进行配置,编译时会报错 
      微信公众平台-小程序-设置-开发设置 
      每种最多可设置两个,只能使用 https 的域名,且申请过程需花费一定时间 
    无APPID时,不可进行发布,但可随意进行网络请求,不限制域名 
  微信对小程序的要求是整体大小不能超过2MB  
  'WeiXin Markup language' 'WeiXin Style Sheet'
  'Component'组件是视图的基本组成单元
目录结构及文件 
  程序主体、总体配置信息：'app.js''app.json''app.wxss' 三个文件组成 
    'app.json'  公共设置、全局配置  
      PS: 决定页面'文件路径''窗口表现''网络超时设置''设置多个tab'等
      {
        指定小程序由那些页面组成,必填 
          每一项代表页面的信息,新增、减少页面,都需要对pages数组进行修改 
          不需写文件后缀,框架会自动去寻找路径'.json''.js''.wxml''.wxss'的四个文件进行整合 
        "pages": [   
          "page/index/index",   // 第一项代表小程序的初始页面
          "page/logs/index"
        ],
        设置小程序的'状态栏''导航条''标题''窗口背景色',可选  
          '页面.json'文件中若有相同的描述,则会覆盖"window"中描述的信息 
        "window": { 
          "navigationBarBackgroundColor":"#000", // 导航栏背景色 
          "navigationBarTextStyle": "white",     // 导航栏标题颜色,仅支持'black'/'white'
          "navigationBarTitleText": "xxx",       // 导航栏标题文字 
          "backgroundColor": "#fff",             // 窗口背景色
          "backgroundTextStyle": "dark",  // 下拉背景字体、loading图的样式,仅支持'dark'/'light'
          "enablePullDownRefresh":false,  // 是否开启下拉刷新 
          "onReachBottomDistance": 50, // 页面上拉触底事件触发时距页面底部距离,单位'px'
        },
        设置底部tab的表现,可选 
          多tab应用小程序,可通过该配置项指定tab栏的表现,及tab切换时显示的对应页面 
          最少配置2个,最多5个tab,tab按数组的顺序排序 
          图片必须是本地图片不能是网络图片 
        "tabBar": {   
          "color":"#000",           // 文字默认颜色,必填 
          "selectedColor":"#000",   // 文字选中时的颜色,必填 
          "backgroundColor":"#fff", // 背景色,必填 
          "list": [             // 必填 
            { "pagePath": "page/index/index", // 页面路径,须在pages中先定义,必填 
              "text": "firstBar",             // tab上按钮文字,可选 
              "iconPath": "./img.png",        // 图片路径,icon大小限制为40kb,可选 
              // 当 postion 为 top 时,此参数无效
              "selectedIconPath":"./img.png"  // 选中时的图片路径,icon大小限制为40kb,可选 
              // 当 postion 为 top 时,此参数无效
            }, 
            { "pagePath": "page/logs/logs"
              "text": "日志",
            }
          ],
          "borderStyle":"black",    // 边框色,仅支持'black'或'white',可选 
          "position": "bottom"  // 显示位置,支持'bottom''top',可选 
        },
        设置各种网络请求超时时间,单位ms,可选 
        "networkTimeout": {  
          "request": 60000,       // 'wx.request'的超时时间,可选 
          'connectSocket': 60000, // 'wx.connectSocket'的超时时间,可选 
          "downloadFile": 60000,  // 'wx.downloadFile'超时时间,可选 
          'uploadFile': 60000     // 'wx.uploadFile'的超时时间,可选  
        },
        设置是否开启debug模式,可选 
          在开发者工具的控制台面板,调试信息以info的形式给出,
          其信息有Page的注册,页面路由,数据更新,事件触发  
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
  App(params)   注册小程序[只能在'app.js'中注册且一次] 
    params  配置参数对象,指定小程序生命周期函数等
    {
      ◆生命周期函数
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
      其他 Any  开发者可以添加任意的函数或数据到 Object 参数中,用 this 可以访问
      'globalData':{}, 全局数据,通过 this.globalData 或 app.globalData 访问  
      可添加任意函数或数据,用 this 访问 
      fooName : function(){
        console.log(1);
      },    
    }
    使用 this 代替使用 getApp()     获取小程序实例
    App.prototype.getCurrentPage() 获取当前页面实例 
      不要在'onLaunch'时调用 getCurrentPage(),此时page还没有生成 
  Page(params)  注册一个页面,指定页面的'初始数据''生命周期函数''事件处理函数'等 
    params   参数对象 
    {
      'data': { //  页面的初始数据 
        key : val,
      },           
      // ◆生命周期 
      onLoad: function(query){  //  页面加载回调 
        // query 其他页面打开当前页面所调用的query参数
        console.log(query); 
      },        
      onShow: function(){       // 页面显示回调  
        console.log();
      },        
      onReady: function(){ // 页面初次渲染完成回调  
        // 一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互
        console.log();
      },       
      onHide: function(){ // 页面隐藏回调  
        console.log();
      },        
      onUnload: function(){ // 页面卸载回调  
        console.log();
      },      
      // 其他回调 
      onPullDownRefresh: function () {   // 用户下拉刷新回调 
        // 下拉回调: 需先在'app.json'或'.json'中配置 'enablePullDownRefresh':true 
        console.log();
      },
      onReachBottom: function () { // 上拉触底回调  
        // 可以在app.json的window选项中或页面配置中设置触发距离onReachBottomDistance 
        // 在触发距离内滑动期间，本事件只会被触发一次
        console.log();
      },
      onShareAppMessage: function(){ // 用户点击右上角转发回调,未设置该项则不会出现转发选项  
        console.log();
        return {   // 用于自定义转发内容
          'title': '自定义转发标题',  //  转发标题,默认当前小程序名称
          'path': '/page/user?id=123', // 转发路径,默认当前页面path 
          // 必须是以'/'开头的完整路径 
        }
      },
      onPageScroll: function(obj){ // 页面滚动触发 
        // obj.scrollTop 页面在垂直方向已滚动的距离,单位px 
        console.log(obj);
      },
      Any       可添加任意函数或数据,用'this'访问 
    }
    Page.prototype.setData(dataObj,foo) 将数据从逻辑层发送到视图层[异步],同时改变对应的 this.data 的值[同步] 
      PS: 直接修改 this.data 无效,无法改变页面的状态,还会造成数据不一致 
        单次设置的数据不能超过1024kB,请尽量避免一次设置过多的数据
      dataObj  以'key:value'的形式表示将'this.data'中的'key'对应的值改变成'val' 
        其中key可以非常灵活,以数据路径的形式给出,如array[2].message,a.b.c.d,
        并不需要在'this.data'中预先定义 
      foo      本次setData对界面渲染完毕后调用['1.5.0+'] 
      Example: 
        <!--index.wxml-->
        <view>{{text}}</view>
        <button bindtap="changeText"> Change normal data </button>
        <view>{{array[0].text}}</view>
        <button bindtap="changeItemInArray"> Change Array data </button>
        <view>{{object.text}}</view>
        <button bindtap="changeItemInObject"> Change Object data </button>
        <view>{{newField.text}}</view>
        <button bindtap="addNewField"> Add new data </button>
        //index.js
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
              'object.text': 'changed data'
            });
          },
          addNewField: function() {
            this.setData({
              'newField.text': 'new data'
            })
          }
        })      
    Page.prototype.route  获取当前页路径['1.2.0+']
    app.getCurrentPages() 获取当前页面栈实例 
      以数组形式按栈的顺序给出,第一个元素为首页,最后一个元素为当前页面
      不要尝试修改页面栈，会导致路由以及页面状态错误
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
'.wxml'和'.wxss'组成视图层,由组件进行展示 
  PS: 将逻辑层的数据反应成视图,同时将视图层的事件发送给逻辑层 
    '.wxml'用于描述页面的结构,'.wxss'用于描述页面的样式 
    WXML中动态数据均来自对应Page的data 
  {{val}}      "Mustache"语法,插值
    适用于'组件文本' '组件属性'
  wx:for="{{arr}}"   列表渲染 
    当前下标默认为: 'index';当前项默认为: 'item' 
      <view wx:for="{{items}}">
        {{index}}: {{item:one}}
      </view>
    wx:for-item="placeholder"  指定当前项 
    wx:for-index="placeholder" 指定当前下标 
      <view wx:for="{{items}}" wx:for-item="name"  wx:for-index="id">
        {{id}}: {{name.one}}
      </view>
    wx:for={{str}}     值为字符串时，将字符串解析成字符串数组 
      <view wx:for="array"> {{item}} </view>
      // 等同于
      <view wx:for="{{['a','r','r','a','y']}}"> {{item}} </view>
    花括号和引号之间如果有空格，将最终被解析成为字符串 
      <view wx:for="{{[1,2,3]}} "> {{item}} </view>
      // 等同于
      <view wx:for="{{[1,2,3] + ' '}}" > {{item}} </view>
  <block wx:for="{{arr}}"> </block>  列表块渲染 
  wx:key="str/*this"    指定列表中项目的唯一标识符 
    PS: 当列表为静态时可不必使用;
      当数据改变触发渲染层重新渲染时,会校正带有key的组件,进行重排而非重建,
      以确保使组件保持自身的状态,并提高列表渲染效率 
    str   相当于'item[str]',该值需是列表中唯一的字符串或数字,且不能动态改变 
    *this 保留关键字,表示'item'本身,这种表示需item是一个唯一的字符串或者数字
  wx:if="{{val}}"    条件渲染 
    PS: wx:if 是惰性的，如果在初始渲染条件为 false，框架什么也不做，在条件第一次变成真的时候才开始局部渲染
  wx:elif="{{val}}"  条件渲染 
  wx:else            条件渲染 
  <block wx:if="{{val}}"> </block>  多组件条件渲染 
    PS: 一次性判断多个组件标签,可用一个<block/>标签将多个组件包装起来,并使用wx:if控制属性 
      <block/>并不是一个组件,它仅仅是一个包装元素,不会在页面中做任何渲染,只接受控制属性。
    <block wx:if="{{true}}">
      <view> view1 </view>
      <view> view2 </view>
    </block>
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
  WXML事件 
    PS: 事件是视图层到逻辑层的通讯方式;可将用户的行为反馈到逻辑层进行处理。
      事件可以绑定在组件上,当达到触发事件,就会执行逻辑层中对应的事件处理函数 
      事件对象可以携带额外信息,如id, dataset, touches。
    事件的使用方式: 在组件中绑定一个事件处理函数 
    'bindtap'   用户点击组件  
      <view id="tapTest" data-hi="MINA" bindtap="tapName"> Click me! </view>
      在相应的Page定义中写上相应的事件处理函数,参数是event 
      Page({
        tapName: function(event) {
          console.log(event)
        }
      })
    事件详解 
      PS: 事件分为冒泡事件和非冒泡事件
      ◆WXML的冒泡事件列表： 
        冒泡事件：当一个组件上的事件被触发后,该事件会向父节点传递。
        除下表之外的其他组件自定义事件都是非冒泡事件,
        如<form/>的submit事件,<input/>的input事件,<scroll-view/>的scroll事件
      类型           触发条件
      'touchstart'  手指触摸
      'touchmove'   手指触摸后移动
      'touchcancel' 手指触摸动作被打断,如来电提醒,弹窗
      'touchend'    手指触摸动作结束
      'tap'         手指触摸后离开
      'longpress'   手指触摸后,超过350ms再离开['1.5.0+'] 
        如果指定了事件回调函数并触发了这个事件，tap事件将不被触发 
      'longtap'     手指触摸后,超过350ms再离开[推荐使用longpress事件代替] 
      ◆非冒泡事件：当一个组件上的事件被触发后,该事件不会向父节点传递 
    事件绑定 
      事件绑定的写法同组件的属性,以key、value的形式 
      key以'bind'或'catch'开头,然后跟上事件的类型,如bindtap, catchtouchstart
      value是一个字符串,需要在对应的Page中定义同名的函数。不然当触发事件的时候会报错。
      bind事件绑定不会阻止冒泡事件向上冒泡,catch事件绑定会阻止冒泡事件向上冒泡
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
      PS: '1.5.0+' 起，触摸类事件支持捕获阶段。捕获阶段位于冒泡阶段之前，
        捕获阶段中，事件到达节点的顺序与冒泡阶段恰好相反。
        需要在捕获阶段监听事件时，可以采用capture-bind、capture-catch关键字，后者将中断捕获阶段和取消冒泡阶段。
      在下面的代码中，点击 inner view 会先后调用handleTap2、handleTap4、handleTap3、handleTap1。
      <view id="outer" bind:touchstart="handleTap1" capture-bind:touchstart="handleTap2">
        outer view
        <view id="inner" bind:touchstart="handleTap3" capture-bind:touchstart="handleTap4">
          inner view
        </view>
      </view>
      如果将上面代码中的第一个capture-bind改为capture-catch，将只触发handleTap2。
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
      e.timeStamp      页面打开到触发事件所经过的毫秒数 
      e.target         触发事件的源组件,触发事件的组件的一些属性值集合  
        e.target.id   事件源组件的id
        e.target.tagName   当前组件的类型
        e.target.dataset   事件源组件上由data-开头的自定义属性组成的集合 
      e.currentTarget  事件绑定的当前组件,当前组件的一些属性值集合  
        e.currentTarget.id       当前组件的id
        e.currentTarget.tagName  当前组件的类型
        e.currentTarget.dataset  当前组件上由data-开头的自定义属性组成的集合
      ◆'CustomEvent'自定义事件对象属性列表[继承 BaseEvent] 
      e.detail         额外的信息
        自定义事件所携带的数据，如表单组件的提交事件会携带用户的输入，媒体的错误事件会携带错误信息，详见组件定义中各个事件的定义。
        点击事件的detail 带有的 x, y 同 pageX, pageY 代表距离文档左上角的距离。
      ◆'TouchEvent'触摸事件对象属性列表[继承 BaseEvent]：
      e.touches         触摸事件,当前停留在屏幕中的触摸点信息的数组  
        PS: 数组每个元素为一个 Touch 对象,表示当前停留在屏幕上的触摸点 
        identifier num,触摸点的标识符
        pageX   num,距离文档左上角的距离 
        pageY   num,距离文档左上角的距离 
        clientX  num,距离页面可显示区域[屏幕除去导航条]左上角距离
        clientY  num,距离页面可显示区域[屏幕除去导航条]左上角距离 
      e.changedTouches  触摸事件，当前变化的触摸点信息的数组 
        changedTouches 数据格式同 touches。 
        表示有变化的触摸点，如从无变有（touchstart），位置变化（touchmove），从有变无（touchend、touchcancel）。
      ◆特殊事件： 
      <canvas/> 中的触摸事件不可冒泡，故没有 currentTarget。
      canvas 触摸事件中携带的 touches 是'CanvasTouch'数组
        identifier num,触摸点的标识符 
        x       num,距离 Canvas 左上角的距离
        y       num,距离 Canvas 左上角的距离
  WXML引用 
    PS: WXML提供两种文件引用方式'import'和'include' 
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
    <include src="xx.wxml"/>  非模版引入,将目标文件除了<template/>的整个代码引入
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
  WXSS: MINA设计的一套样式语言,用于描述WXML的组件样式 
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
      目前支持的选择器有：
      选择器               样例            样例描述
      .class             .intro           选择所有拥有class="intro"的组件
      #id                #firstname       选择拥有id="firstname"的组件
      element            view             选择所有view组件
      element, element   view checkbox    选择所有文档的view组件和所有的checkbox组件
      ::after            view::after      在view组件后边插入内容
      ::before           view::before     在view组件前边插入内容
    全局样式与局部样式 
      定义在app.wxss 中的样式为全局样式,作用于每一个页面。
      在page的wxss文件中定义的样式为局部样式,只作用在对应的页面,并会覆盖app.wxss 中相同的选择器。   
基础组件 : 框架为开发者提供的一系列组件，开发者可以通过组合这些基础组件进行快速开发
  <swiper>轮播组件,也叫'滑块视图容器' 
    <swiper>       容器类视图,其中只能放置组件,如放置其他节点,会被自动删除 
    <swiper-item>  仅可放置在<swiper>组件中,宽高自动设置为100%,代表轮播中一帧的页面 
      通常以循环的方式加载到页面中 
      item单击 
        在'swiper-item'上绑定事件,通过'data-xx'自定义标签绑定数据,然后在function中通过event拿到 
          如：e.currentTarget.dataset.id 对应wxml中的data-id
        通过在每一个的 swiper-item 外面包上一个 a 标签,以超链接的方式跳转页面 
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
    'vertical' bol,默认值为false 
      当不设置 vertical 属性,或者 vertical=”false” 时,指示点在组件下部,图片轮播从左至右 
      当设置 vertical=”true” 时,指示点在组件右部,图片轮播从下至上
  ◆属性相关 
  dataset
    在组件中可以定义数据，这些数据将会通过事件传递给 SERVICE。 书写方式： 以data-开头，多个单词由连字符-链接，不能有大写(大写会自动转成小写)如data-element-type，最终在 event.currentTarget.dataset 中会将连字符转成驼峰elementType。
全局对象、方法及属性 
  app = getApp()   获取小程序实例
  ◆wx对象  
  wx.request(params)  网络请求 [详见'网络请求']
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
  通过<navigator url=""></navigator>组件形式路由及数据传递 
    <navigator url="../logs/logs?id=100">
      <view> <text>文章1</text> </view>
    </navigator>
    通过'redirect'形式进行值传递
    <navigator url="../logs/logs?id=100" redirect>
      <view> <text>文章1</text>  </view>
    </navigator>
网络请求 
  ◆网络请求大致分为四种类型 
  wx.request       普通HTTPS请求 
    PS: 用于发起http请求,但被限制同时只有5个及以下网络请求 
    wx.request({
      'method': 'POST', // 默认为 GET 
      'url': 'url',
      请求的参数可以采用'xxx=xxx&xxx=xxx'的形式或者{key:val}的形式
      'data': {
        type: "1"
      },
      设置请求的header 
      'header': {
        'Accept': 'application/json'
      },
      success: function (res) {
        that.setData({
          images: res.data.data.guanggao
        })
      },
      fail:function(err){
        console.log(err)
      },
      调用接口结束之后的回调,无论成功或者失败该接口都会被调用 
      complete: function(){
      } 
    })
  wx.uploadFile    上传文件 
  wx.downloadFile  下载文件 
  wx.connectSocket WebSocket通信 
微信Web开发者工具使用 
  快速创建文件[包括'.js''.json''.wxml''.wxss']
    在'app.json'中的'pages'中新增元素即可[注意最后一个不可有',']
      即使在'app.json'中删除了'pages'的元素,新增加的文件也不会被删除 
兼容处理 
  基础库与客户端之间的关系
    小程序的能力需要微信客户端来支撑，每一个基础库都只能在对应的客户端版本上运行，
    高版本的基础库无法兼容低版本的微信客户端
  兼容方式 - 接口
    对于新增的 API，可以用以下代码来判断是否支持用户的手机
    if (wx.openBluetoothAdapter) {
      wx.openBluetoothAdapter()
    } 
    else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  兼容方式 - 参数
    对于 API 的参数或者返回值有新增的参数，可以判断用以下代码判断。
    wx.showModal({
      success: function(res) {
        if (wx.canIUse('showModal.cancel')) {
          console.log(res.cancel)
        }
      }
    })
  兼容方式 - 组件 
    对于组件，新增的属性在旧版本上不会被处理，不过也不会报错。
    如果特殊场景需要对旧版本做一些降级处理，可以这样子做。
    Page({
      data: {
        canIUse: wx.canIUse('button.open-type.contact')
      }
    })
    <button wx:if="{{canIUse}}" open-type="contact"> 客服消息 </button>
    <contact-button wx:else></contact-button>
运行机制 
  PS: 小程序没有重启的概念
    当小程序进入后台，客户端会维持一段时间的运行状态，超过一定时间后（目前是5分钟）会被微信主动销毁
    置顶的小程序不会被微信主动销毁
    当收到系统内存告警也会进行小程序的销毁
  前台、后台定义: 
    当用户点击左上角关闭,或者按了设备Home键离开微信,
    小程序并没有正在销毁,而是进入了后台,
    当再次启动微信或再次打开小程序,又会从后台进入前台。
    只有当小程序进入后台一定时间,或者系统资源占用过高,才会被真正销毁。
  再次打开逻辑
    基础库 1.4.0 开始支持，低版本需做兼容处理
    用户打开小程序的预期有以下两类场景：
    A. 打开首页： 场景值有 1001, 1019, 1022, 1023, 1038, 1056
    B. 打开小程序指定的某个页面： 场景值为除 A 以外的其他
    当再次打开一个小程序逻辑如下：
    上一次的场景 当前打开的场景 效果
    A A 保留原来的状态
    B A 清空原来的页面栈，打开首页（相当于执行 wx.reLaunch 到首页）
    A 或 B B 清空原来的页面栈，打开指定页面（相当于执行 wx.reLaunch 到指定页）
-------------------------------------------------------------------------待整理 



