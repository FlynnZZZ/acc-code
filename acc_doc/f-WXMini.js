miniA微信小程序
说明 
  开发小程序时可以选择有 APPID 和 无 APPID 两种方式,及其区别 
    有APPID时,只能和指定的域名进行通信,如果没有进行配置,编译时会报错 
      微信公众平台-小程序-设置-开发设置 
      每种最多可设置两个,只能使用 https 的域名,且申请过程需花费一定时间 
    无APPID时,不可进行发布,但可随意进行网络请求,不限制域名 
  微信对小程序的要求是整体大小不能超过1MB [?] 
  'WeiXin Markup language' 'WeiXin Style Sheet'
  前台、后台定义: 
    当用户点击左上角关闭,或者按了设备Home键离开微信,
    小程序并没有正在销毁,而是进入了后台,
    当再次启动微信或再次打开小程序,又会从后台进入前台。
    只有当小程序进入后台一定时间,或者系统资源占用过高,才会被真正销毁。
工程目录及文件 
  miniA程序主体、总体配置信息：'app.js''app.json''app.wxss' 三个文件组成 
    'app.json'  公共设置,全局配置  
      PS: 决定页面文件的路径,窗口表现,设置网络超时时间,设置多个tab等
      {
        描述整个工程的页面信息 
          指定小程序由那些页面组成,每一项代表页面的信息,
          新增、减少页面,都需要对pages数组进行修改 
        "pages": [   
          "page/index/index",   第一项代表小程序的初始页面
          "page/logs/index"
        ],
        设置小程序的'状态栏''导航条''标题''窗口背景色',可选  
          '页面.json'只能设置window相关的配置项,以决定本页面窗口表现,所以无需写window这个关键字 
          '页面.json'文件中若有相同的描述,则会覆盖"window"中描述的信息 
        "window": { 
          "navigationBarTitleText": "Demo",      导航栏标题文字内容 
          'navigationBarBackgroundColor':'#000', 导航背景色 
          'navigationBarTextStyle':'black',      导航栏标题颜色,仅支持'black'或'white'
          'backgroundColor': '#fff',             窗口的背景色
          'backgroundTextStyle': 'dark', 下拉背景字体、loading图的样式,仅支持'dark'或'light'
          'enablePullDownRefresh':true    是否开启下拉刷新 
            onPullDownRefresh: function () {  // 下拉刷新回调接口
            },
            onReachBottom: function () {  // 下拉回调 
            },
        },
        设置底部tab的表现,可选 
          多tab应用小程序,可通过该配置项指定tab栏的表现,及tab切换时显示的对应页面 
          最少配置2个,最多5个tab,tab按数组的顺序排序 
          图片必须是本地图片不能是网络图片 
        "tabBar": {   
          "list": [
            { "text": "首页",                  tab上按钮文字
              "pagePath": "page/index/index",  页面路径,必须在pages中先定义
              'iconPath': './img.png',         图片路径,icon大小限制为40kb
              'selectedIconPath':'./img.png'   选中时的图片路径,icon大小限制为40kb
            }, 
            { "text": "日志",
              "pagePath": "page/logs/logs"
            }
          ],
          'color':'#000',           tab上文字默认颜色
          'selectedColor':'#000',   tab上文字选中时的颜色
          'backgroundColor':'#fff', tab的背景色
          'borderStyle':'black'     tab上边框的颜色,仅支持'black'或'white',可选 
        },
        设置各种网络请求超时时间,单位ms,可选 
        "networkTimeout": {  
          "request": 9000,       'wx.request'的超时时间,可选 
          "downloadFile": 9000,  'wx.downloadFile'超时时间,可选 
          'connectSocket': 9000, 'wx.connectSocket'的超时时间,可选 
          'uploadFile': 9000     'wx.uploadFile'的超时时间,可选  
        },
        设置是否开启debug模式,可选 
          在开发者工具的控制台面板,调试信息以info的形式给出,
          其信息有Page的注册,页面路由,数据更新,事件触发  
        "debug": true  
      }
    'app.js'    逻辑,主要描述该项目入口逻辑 
      主要描述一些用户登录后的信息 
    'app.wxss'  公共样式,可选 
  miniA页面由四个文件组成：'xx.js''xx.wxml''xx.wxss''xx.json' 
    'xx.wxml'  页面结构 
    'xx.js'    页面逻辑 
    'xx.wxss'  页面样式表,可选 
    'xx.json'  页面配置,可选 
模块化 
  文件作用域: 在JS文件中声明的变量和函数只在该文件中有效
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
  通过 module.exports 对外暴露接口 
    function sayHello(name) {
      console.log('Hello ' + name + '!')
    }
    module.exports = {
      sayHello: sayHello
    }
  ​使用 require(path) 将代码引入 
    var common = require('common.js')
    Page({
      helloMINA: function() {
        common.sayHello('MINA')
      }
    })  
'.js'逻辑层'App Service' 
  PS: 提供丰富的API,如扫一扫,支付等微信特有能力。
    每个页面有独立的作用域,并提供模块化能力。
    由于MINA并非运行在浏览器中,所以JS在web中一些能力都无法使用,如document,window等。
    开发者写的所有代码最终将会打包成一份JavaScript,并在小程序启动的时候运行,
    直到小程序销毁,类似ServiceWorker,所以逻辑层也称之为App Service。
  App(params)   注册小程序[只能在'app.js'中注册] 
    params  配置参数对象,指定小程序生命周期函数等
    {
      ◆生命周期函数
      'onLaunch': foo 监听小程序初始化, 当小程序初始化完成时,全局只触发一次 
      'onShow':foo    监听小程序显示,小程序启动或者从后台进入到前台 
      'onHide':foo    监听小程序隐藏,小程序从前台进入到后台 
      fooName: foo    可添加任意函数或数据,用 this 访问 
    }
    App.prototype.getCurrentPage() 获取当前页面实例
      不要在 'onLaunch'的时候调用 getCurrentPage(),此时page还没有生成
    使用 this 代替使用 getApp()     获取小程序实例
  Page(params)  注册一个页面 
    params   参数对象,其页面初始数据,生命周期函数,事件处理函数等 
    {
      'data': {}           页面的初始数据 
      ◆生命周期 
      'onLoad': foo        监听页面加载 
      'onReady': foo       监听页面渲染完成 
      'onShow': foo        监听页面显示 
      'onHide': foo        监听页面隐藏 
      'onUnload': foo      监听页面卸载 
      Any             可添加任意函数或数据参数中,用'this'访问 
    }
    page.prototype.setData(dataObj) 将数据从逻辑层发送到视图层,同时改变对应的'this.data'的值 
      直接修改 this.data 无效,无法改变页面的状态,还会造成数据不一致 
      单次设置的数据不能超过1024kB,请尽量避免一次设置过多的数据
      dataObj  以'key:value'的形式表示将'this.data'中的'key'对应的值改变成'val' 
        其中key可以非常灵活,以数据路径的形式给出,如array[2].message,a.b.c.d,
        并且不需要在'this.data'中预先定义 
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
  'wx'全局对象  
    wx.request(params)  网络请求 
      PS: 需先去微信公众平台配置请求的域名 
      {
        method: 'GET', 
        url: 'url', 
        data: {
        },
        header: {}, // 设置请求 header
        success: function(json){
          wx.showModal({
            title: '请求结果',
            content: JSON.stringify(json.data),
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
      }
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
'.wxml'和'.wxss'视图层 
  PS: 将逻辑层的数据反应成视图,同时将视图层的事件发送给逻辑层 
    '.wxml'用于描述页面的结构,'.wxss'用于描述页面的样式 
    WXML中动态数据均来自对应Page的data 
  {{val}}            "Mustache"语法,插值 
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
  wx:if="{{val}}"    条件渲染 
    wx:elif="{{val}}"   
    wx:else             
  <block wx:if="{{val}}"> </block>  多组件条件渲染 
    PS: 一次性判断多个组件标签,可用一个<block/>标签将多个组件包装起来,并使用wx:if控制属性 
      <block/>并不是一个组件,它仅仅是一个包装元素,不会在页面中做任何渲染,只接受控制属性。
    <block wx:if="{{true}}">
      <view> view1 </view>
      <view> view2 </view>
    </block>
  <template name="templateName"></template> WXML模板
    PS: 可在模板中定义代码片段,然后在不同的地方调用 
    定义模板 
      使用'name'属性定义模板的名字,然后在<template/>内定义代码片段 
      <template name="msgItem">
        <view>
          <text> {{index}}: {{msg}} </text>
          <text> Time: {{time}} </text>
        </view>
      </template>
    使用模板 
      'is'属性声明需要的使用的模板,'data'属性将模板所需要的数据传入 
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
    模板的作用域
      模板拥有自己的作用域,只能使用data传入的数据
  WXML事件 
    PS: 事件是视图层到逻辑层的通讯方式;可将用户的行为反馈到逻辑层进行处理。
      事件可以绑定在组件上,当达到触发事件,就会执行逻辑层中对应的事件处理函数。
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
      'longtap'     手指触摸后,超过350ms再离开 
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
    事件对象 
      如无特殊说明,当组件触发事件时,逻辑层绑定该事件的处理函数会收到一个事件对象 
      ◆事件对象的属性列表 
      e.target         事件源对象 
      e.currentTarget  当前View对象 
      e.dataSet        'data-xx'的值 
      e.touches        触摸事件,触摸点信息的数组 
      e.type           事件类型
      e.timeStamp      事件生成时的时间戳
      e.detail         额外的信息
  WXML引用 
    PS: WXML提供两种文件引用方式'import'和'include' 
    <import src="xx.wxml"/>   在WXML中引入template 
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
    <include src="xx.wxml"/>  拷贝WXML内容到include位置
      将目标文件除了了<template/>的整个代码引入
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
内置组件 
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
页面路由 
  一个应用同时只能打开5个页面
  wx.nativateTo     打开新页面
    不会销毁之前的页面 
    以查询字符串的形式进行页面间的传递数据 
      wx:navigateTo({
        url:"../logs/logs?id=10"
      })
      然后通过B中 onLoad(options) 中取出
  wx.redirectTo     页面重定向
  wx.navigatBack    页面返回
  通过<navigator>组件形式路由及进行值传递
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
      method: 'POST', // 默认为 GET 
      url: 'url',
      请求的参数可以采用'xxx=xxx&xxx=xxx'的形式或者{key:val}的形式
      data: {
        type: "1"
      },
      设置请求的header 
      header: {
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
-------------------------------------------------------------------------待整理 

