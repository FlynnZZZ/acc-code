MiniProgrom微信小程序 
  依赖于微信平台,使用微信台提供的 View/Event/Component/Container 等构建 
  介于 Web App 和 Native App 之间的一种类型 
说明 
  开发小程序时可以选择有APPID和无APPID两种方式,及其区别 
    有APPID时,只能和指定的域名进行通信,如果没有进行配置,编译时会报错 
      微信公众平台-小程序-设置-开发设置 
      每种最多可设置两个,只能使用 https 的域名,且申请过程需花费一定时间 
    无APPID时,不可进行发布,但可随意进行网络请求,不限制域名 
  微信对小程序的要求是整体大小不能超过2MB  
  'Component'组件是视图的基本组成单元 
  ◆运行机制 
  小程序没有重启的概念 
    当小程序进入后台,客户端会维持一段时间的运行状态,超过一定时间后（目前是5分钟）会被微信主动销毁
    置顶的小程序不会被微信主动销毁
    当收到系统内存告警也会进行小程序的销毁
  前台/后台/销毁: 
    当用户点击左上角关闭/按设备Home键离开微信 进入后台 [小程序并未销毁]
    再次启动微信/再次打开小程序 从后台进入前台 
    当小程序进入后台一定时间/系统资源占用过高 小程序被销毁 
  关闭小程序 [基础库1.1.0+支持] 
    当用户从扫一扫、转发等入口(场景值为1007, 1008, 1011, 1025)进入小程序,
    且没有置顶小程序的情况下退出,小程序会被销毁。
    小程序运行机制在基础库版本 1.4.0 有所改变,该逻辑在新版本已不适用 
  再次打开逻辑 '1.4.0+' 
    用户打开小程序的预期有以下两类场景：
    A. 打开首页： 场景值有 1001, 1019, 1022, 1023, 1038, 1056
    B. 打开小程序指定的某个页面： 场景值为除 A 以外的其他
    当再次打开一个小程序逻辑如下：
    上一次的场景 当前打开的场景 效果
    A A 保留原来的状态
    B A 清空原来的页面栈,打开首页（相当于执行 wx.reLaunch 到首页）
    A 或 B B 清空原来的页面栈,打开指定页面（相当于执行 wx.reLaunch 到指定页）
  ◆场景值 [基础库1.1.0+] 
    PS: 由于Android系统限制,目前无法获取到按 Home 键退出到桌面,然后从桌面再次进小程序的场景值,
      对于这种情况,会保留上一次的场景值
    1001  发现栏小程序主入口
    1005  顶部搜索框的搜索结果页
    1006  发现栏小程序主入口搜索框的搜索结果页
    1007  单人聊天会话中的小程序消息卡片
    1008  群聊会话中的小程序消息卡片
    1011  扫描二维码
    1012  长按图片识别二维码
    1013  手机相册选取二维码
    1014  小程序模版消息
    1017  前往体验版的入口页
    1019  微信钱包
    1020  公众号 profile 页相关小程序列表
    1022  聊天顶部置顶小程序入口
    1023  安卓系统桌面图标
    1024  小程序 profile 页
    1025  扫描一维码
    1026  附近小程序列表
    1027  顶部搜索框搜索结果页“使用过的小程序”列表
    1028  我的卡包
    1029  卡券详情页
    1030  自动化测试下打开小程序
    1031  长按图片识别一维码
    1032  手机相册选取一维码
    1034  微信支付完成页
    1035  公众号自定义菜单
    1036  App 分享消息卡片
    1037  小程序打开小程序
    1038  从另一个小程序返回
    1039  摇电视
    1042  添加好友搜索框的搜索结果页
    1043  公众号模板消息
    1044  带 shareTicket 的小程序消息卡片（详情)
    1045  朋友圈广告
    1047  扫描小程序码
    1048  长按图片识别小程序码
    1049  手机相册选取小程序码
    1052  卡券的适用门店列表
    1053  搜一搜的结果页
    1054  顶部搜索框小程序快捷入口
    1056  音乐播放器菜单
    1057  钱包中的银行卡详情页
    1058  公众号文章
    1059  体验版小程序绑定邀请页
    1064  微信连Wi-Fi状态栏
    1067  公众号文章广告
    1068  附近小程序列表广告
    1069  移动应用
    1071  钱包中的银行卡列表页
    1072  二维码收款页面
    1073  客服消息列表下发的小程序消息卡片
    1074  公众号会话下发的小程序消息卡片
    1077  摇周边
    1078  连Wi-Fi成功页
    1079  微信游戏中心
    1081  客服消息下发的文字链
    1082  公众号会话下发的文字链
    1089  微信聊天主界面下拉
    1090  长按小程序右上角菜单唤出最近使用历史
    1091  公众号文章商品卡片
    1092  城市服务入口
    1095  小程序广告组件
    1096  聊天记录
    1097  微信支付签约页
基础 
  模块化 
    PS: 文件作用域: 在JS文件中声明的变量和函数只在该文件中有效
      小程序目前不支持直接引入 node_modules 
      开发者需要使用到 node_modules 时候建议拷贝出相关的代码到小程序的目录中
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
  页面路由: 小程序中所有页面的路由全部由框架进行管理 
    PS: 一个应用同时只能打开5个页面
    页面栈: 以栈的形式维护当前的所有页面  
      初始化          新页面入栈
      打开新页面      新页面入栈
      页面重定向      当前页面出栈,新页面入栈
      页面返回        页面不断出栈,直到目标返回页面,新页面入栈
      Tab切换        当前页面出栈, 新页面入栈 
      重加载         页面全部出栈,只留下新的页面
  生命周期  
    A、B 两个界面 
      ◆应用启动
      触发App Launch()  Show()
      A:Load() Show() Ready()
      ◆从A跳转[wx.navigateTo]到B
      A:Hide()
      B:Load() Show() Ready()
      ◆关闭B[显示A] 
      B: unLoad()
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
    路由的触发方式以及页面生命周期函数 
      路由方式       触发时机  
      初始化        小程序打开的第一个页面    
        路由前页面: /  
        路由后页面: onLoad, onShow
      打开新页面     wx.navigateTo/<navigator open-type="navigateTo"/>  
        onHide  
        onLoad, onShow
      页面重定向     wx.redirectTo/<navigator open-type="redirectTo"/>  
        onUnload  
        onLoad, onShow
      页面返回       wx.navigateBack/<navigator open-type="navigateBack">/用户按左上角返回按钮  
        onUnload  
        onShow
      Tab 切换       wx.switchTab/<navigator open-type="switchTab"/>/用户切换 Tab    
        各种情况请参考下表'页面切换对应的生命周期'
      重启动         wx.reLaunch/<navigator open-type="reLaunch"/>  
        onUnload  
        onLoad, onShow
    页面切换对应的生命周期 
      A、B 页为 Tabbar 页面, C 是从 A 页面打开的页面, D 页面是从 C 页面打开的页面 
      当前页面 到 路由后页面 及 按顺序触发的生命周期
      A ->  A             
        Nothing happend
      A ->  B             
        A.onHide(), B.onLoad(), B.onShow()
      A ->  B[再次打开]    
        A.onHide(), B.onShow()
      C ->  A             
        C.onUnload(), A.onShow()
      C ->  B             
        C.onUnload(), B.onLoad(), B.onShow()
      D ->  B             
        D.onUnload(), C.onUnload(), B.onLoad(), B.onShow()
      D[从转发进入] ->  A     
        D.onUnload(), A.onLoad(), A.onShow()
      D[从转发进入] ->  B     
        D.onUnload(), B.onLoad(), B.onShow()      
项目目录&说明  
  ◆程序总配置 
  'app.json'  必选,全局配置   
    PS: 包括小程序的所有页面路径、界面表现、网络超时时间、底部tab 等
    { "pages": [   // 必选,描述所有可用页面路径 
      // 将页面路径枚举出来,方可使用 
      // 省略文件后缀,默认寻找'.json'、'.js'、'.wxml'、'.wxss'的四个文件进行整合 
      "page/index/index" // 第一项为初始页面
      ,"page/logs/index"
      ,...
    ]
    ,"window": { // 可选,设置页面窗口的默认表现 
      // '页面.json'文件中若有相同的描述,则会覆盖"window"中描述的信息 
      "backgroundColor": <HexColor>     // 窗口背景色,默认: '#ffffff' 
      ,"navigationBarTitleText": <str>            // 导航栏标题文字 
      ,"navigationBarTextStyle": <kw>             // 导航栏标题颜色 
        'white'  白色,默认值  
        'black'  黑色
      ,"navigationBarBackgroundColor": <HexColor> // 导航栏背景色,默认: '#000000' 
      ,"navigationStyle": <kw>                    // 导航栏样式 [6.6.0+] 
        PS: 只在 app.json 中生效,其他页面不可单独定义 
        "default"  默认值 
        "custom"   可自定义导航栏,只保留右上角胶囊状的按钮  
          低版本客户端需要做好兼容
      ,"enablePullDownRefresh": <bol>  // 是否开启下拉刷新,默认: false  
      ,"backgroundTextStyle": <kw>     // 下拉loading的样式 
        'dark'   默认值 
        'light'  
      ,"onReachBottomDistance": <num>  // 页面上拉触底事件触发时距页面底部距离,单位'px',默认: 50 
      ,"backgroundColorTop": <HexColor>    // 顶部窗口的背景色,默认: '#ffffff' [仅iOS][6.5.16+] 
      ,"backgroundColorBottom": <HexColor> // 底部窗口的背景色,默认: '#ffffff' [仅iOS][6.5.16+] 
    }
    ,"tabBar": { // 可选,设置底部/顶部的tab 
      // 指定tab栏表现,及切换对应页面 
      "color": <HexColor>            // 必选,文字默认颜色 
      ,"selectedColor": <HexColor>   // 必选,文字选中时的颜色  
      ,"backgroundColor": <HexColor> // 必选,背景色 
      ,"list": [   // 必选,定义tabBar,最少2个,最多5个,按数组的顺序排序  
        { "pagePath": "pages/index/index" // 必选,页面路径,需在pages中先定义 
        ,"text": <str>                    // 必选,tab上按钮文字 
        ,"iconPath": "./img.png"          // 可选,图片路径
          // 当 postion 为 top 时,此参数无效
          // 图片必须是本地图片不能是网络图片 
          // icon大小限制为40kb,建议尺寸: 81px*81px
        ,"selectedIconPath":"./img.png" } // 可选,选中时的图片路径 
          // 当 postion 为 top 时,此参数无效
          // icon大小限制为40kb,建议尺寸: 81px*81px  
        ,...  
      ],
      ,"position": <kw>     // 可选,显示位置 
        'bottom'  默认值 
        'top'     将不显示icon 
      ,"borderStyle": <kw>  // 可选,边框颜色 
        'black'  默认值 
        'white' 
    }
    ,"networkTimeout": { // 可选,设置各种网络请求的超时时间,单位:ms 
      "request": <num>   // 可选,wx.request 超时时间,单位: ms,默认: 60000 
      ,"connectSocket": <num>  // 可选,wx.connectSocket 超时时间,单位: ms,默认: 60000 
      ,"downloadFile": <num>   // 可选,wx.downloadFile 超时时间,单位: ms,默认: 60000  
      ,"uploadFile": <num>     // 可选,wx.uploadFile 超时时间,单位: ms,默认: 60000   
    }
    ,"debug": true }     // 可选,是否开启debug模式 
      // 在开发者工具的控制台面板,调试信息以info的形式给出,
      // 信息包括: Page的注册/页面路由/数据更新/事件触发  
  'app.js'    必选,逻辑,主要描述该项目入口逻辑 
    PS: 主要描述一些用户登录后的信息 
    App({  // 注册小程序,返回小程序实例 
      // 只在'app.js'中注册一次,整个小程序只有一个 App 实例
      // 函数中的 this 表示小程序实例 
      globalData: { // 全局数据,
        // 通过 this.globalData/app.globalData 访问  
      } 
      // 可添加任意函数或数据,用 this 访问 
      ,<fooName>: function(){
        console.log(1);
      },    
      ,..
      // 生命周期函数
      ,onLaunch: function(param){   // 监听小程序初始化 
        // 当小程序初始化完成时,全局只触发一次 
        // 此次页面page还没生成  
        param 的值: { 
          path: <str>    // 打开小程序的路径
          ,query: {      // 打开小程序的 query 
            key: val
          }  
          ,scene: <num>  // 打开小程序的场景值
          ,shareTicket: <str>  // shareTicket,详见 获取更多转发信息
          ,referrerInfo: {   // 当场景为由从另一个小程序或公众号或App打开时,返回此字段
            appId: <str>   // 来源小程序或公众号或App的 appId 
            以下场景支持返回 referrerInfo.appId 
            场景值        场景                         appId 信息含义
            1020   公众号 profile 页相关小程序列表   返回来源公众号 appId
            1035   公众号自定义菜单                  返回来源公众号 appId
            1036   App 分享消息卡片                 返回来源应用 appId
            1037   小程序打开小程序                 返回来源小程序 appId
            1038   从另一个小程序返回                返回来源小程序 appId
            1043   公众号模板消息                   返回来源公众号 appId
            ,extraData: {  // 来源小程序传过来的数据,scene=1037或1038时支持
              // 
            }
          } 
        }
      }
      ,onShow: function(param){     // 监听小程序显示 
        // 小程序启动/从后台进入到前台时触发  
        // param 同 onLaunch 
      }
      ,onHide: function(){           // 监听小程序隐藏 
        // 小程序从前台进入到后台时触发  
        console.log('onHide');
      }
      ,onError: function(err){          // 错误监听函数 
        // 当发生脚本错误/api调用失败时触发 
        console.log(err);
      }
      ,onPageNotFound: function(param){ // 页面不存在监听函数 [基础库1.9.90+] 
        // 当小程序出现要打开的页面不存在的情况时触发 
        // 若无 onPageNotFound 监听,当跳转页面不存在时,将推入微信客户端原生的页面不存在提示页面 
        // 可进行重定向处理,但必须同步处理,异步处理,如 setTimeout,则无效 
        // 若又重定向到另一个不存在的页面,将推入微信客户端原生的页面不存在提示页面,且不在回调 onPageNotFound
        param 值: {
          path: <str>  // 不存在页面的路径
          ,query: {    // 打开不存在页面的 query
            key: val 
          } 
          ,isEntryPage: <bol> // 是否本次启动的首个页面
            // 如从分享等入口进来,首个页面是开发者配置的分享页面 
        }
      } 
    })   
    App.prototype.getCurrentPage() 获取当前页面实例 
      不要在'onLaunch'时调用 getCurrentPage(),此时page还没有生成 
  'app.wxss'  可选,公共样式  
  ◆页面定义 
    PS: 为方便开发,规定描述页面的这四个文件必须具有相同的路径与文件名 
      微信客户端会先根据 xxx.json 配置生成一个界面,
      紧接着会装载该页面的 WXML 结构和 WXSS 样式
      最装载 xxx.js 
  'xxx.wxml'   必选,页面结构 
  'xxx.js'     必选,页面逻辑 [即使空的也要填写,否则会报错] 
    var app = getApp()    // 获取小程序实例 
      // 不要私自调用生命周期函数     
    Page({  // 注册一个页面 
      // 页面加载时会对该Page参数对象进行一次深拷贝,需考虑数据大小对页面加载的开销 
      data: { // 页面的初始数据 
        // 初始化数据将作为页面的第一次渲染。
        // data 将会以 JSON 的形式由逻辑层传至渲染层,
        // 所以其数据必须是可以转成 JSON 的格式：字符串,数字,布尔值,对象,数组。
        key1: val1
        ,...
      }           
      // 添加任意函数或数据,用'this'访问 
      ,<key>: <val>
      ,<fn>: function(){
        // 
      }  
      ,..
      // 页面相关事件处理函数 
      ,onPullDownRefresh: function () {   // 下拉时响应 
        // 需在'app.json'或'xxx.json'中开启 'enablePullDownRefresh':true 
      }
      ,onReachBottom: function () {       // 页面上拉触底时响应  
        // 可在'app.json'/'xxx.json'中设置触发距离 onReachBottomDistance 
        // 在触发距离内滑动期间,该事件只会被触发一次 
        console.log('上拉触底');
      }
      ,onShareAppMessage: function(){     // 点击右上角转发时响应 
        // 未设置该回调则不会出现转发选项  
        return { // 返回值用于自定义转发内容
          title: '自定义转发标题'      // 转发标题,默认: 当前小程序名称 
          ,path: '/page/user?id=123'  // 转发路径,默认: 当前页path 
            // 必须是以'/'开头的完整路径 
        }
      }
      ,onPageScroll: function(param){     // 页面滚动时响应 
        param 值: {
          scrollTop: <num>  // 页面在垂直方向已滚动的距离,单位:px 
        }
      }
      ,onTabItemTap: function(){          // 当前是tab页时,点击tab时触发 
        // 
      } 
      // 生命周期  
      ,onLoad: function(query){   // 页面加载时响应  
        // 一个页面只会调用一次 
        query 值: { // 打开当前页面所调用的 query 参数 
          key, val 
          ,..
        }   
      }
      ,onShow: function(){        // 页面显示时响应 
        console.log('页面显示');
      }
      ,onReady: function(){       // 页面初次渲染完成时响应 
        // 一个页面只会调用一次,代表页面已经准备妥当,可和视图层进行交互 
        // 对界面的设置如 wx.setNavigationBarTitle 需在 onReady 后设置 
      }
      ,onHide: function(){        // 页面隐藏时响应 
        // 当 navigateTo 或底部 tab 切换时调用 
      }
      ,onUnload: function(){      // 页面卸载时响应 
        // 当 redirectTo 或 navigateBack 时调用 
      }
    })  
    Page.prototype.route      // 获取当前页路径 [基础库1.2.0+] 
    Page.prototype.setData({  // 更新视图层数据[异步],同时改变对应data中的值[同步] 
      PS: 单次设置的数据不能超过1024kB,请尽量避免一次设置过多的数据 
        直接修改 this.data 无效,无法改变页面的状态,还会造成数据不一致 
      <key>: <val> 
        key  'data'中的属性 
          // 并不需在'this.data'中预先定义 
          // 可以非常灵活,以数据路径的形式给出,如 'arr[2].mes,a.b.c.d' 
        val  设置的值 
          // 请不要把 data 中任何一项的 value 设为 undefined 
          // 否则这一项将不被设置并可能遗留一些潜在问题 
      ,.. 
    }
    ,function(){   // 可选,本次setData对界面渲染完毕后调用 ['1.5.0+'] 
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
    }) 
  'xxx.wxss'   可选,页面样式表,会对'app.wxss'进行覆盖  
  'xxx.json'   可选,配置本页的窗口表现,用于覆盖'app.json'中的'window'配置  
    只能设置 window 相关的配置项 
    { "disableScroll": <bol> // 只在 page.json 中有效,无法在 app.json 中设置该项 
      false  默认值 
      true   页面整体不能上下滚动
    ,"navigationBarBackgroundColor": "#ffffff"
    ,"navigationBarTextStyle": "black"
    ,"navigationBarTitleText": "微信接口功能演示"
    ,"backgroundColor": "#eeeeee"
    ,"backgroundTextStyle": "light"
    ,"enablePullDownRefresh": true  
    ,"onReachBottomDistance": 50 }
'*.json'JSON配置文件 
  'project.config.json'  开发者工具配置 
  'app.json'             小程序配置,详见'app.json'说明 
  'page.json'            页面配置,详见'xxx.json'说明   
'*.wxml'视图元素用于描述页面的结构,由组件进行展示 
  PS: 'WeiXin Markup language',结合基础组件/事件系统,可构建出页面的结构 
    WXML中动态数据均来自对应Page的data;自动会被一个<page>标签包裹
  ◆'Component'内置组件: 可通过组合基础组件进行快速开发 
    PS: 遵守H5的属性使用原则,当布尔值的属性只用写属性名即表示为'true' ? 
  视图组件 
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
  基础内容 
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
        name      str,标签名,支持部分受信任的HTML节点,必选[大小写不敏感] 
          'img'           alt,src,height,width
          'ol'            start,type
          'table'         width
          'th'            colspan,height,rowspan,width
          'td'            colspan,height,rowspan,width
          'colgroup'      span,width
          'col'           span,width
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
        text      str,文本,必选 
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
  表单 
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
        e.detail.value  输入框的值 
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
    '<switch>'  开关选择器 
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
  媒体组件 
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
  其他 
    <map> 地图 
      PS: 客户端创建的原生组件,它的层级是最高的
        请勿在 scroll-view 中使用 map 组件。 css 动画对 map 组件无效。
        map 组件使用的经纬度是火星坐标系,调用 wx.getLocation 接口需要指定 type 为 gcj02
        地图组件的经纬度必选, 如果不填经纬度则默认值是北京的经纬度。
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
        属性 说明 类型 必选 备注 最低版本
        id 标记点id Number 否 marker点击事件回调会返回此id 
        latitude 纬度 Number 是 浮点数,范围 -90 ~ 90 
        longitude 经度 Number 是 浮点数,范围 -180 ~ 180 
        title 标注点名 str 否  
        iconPath 显示的图标 str 是 项目目录下的图片路径,支持相对路径写法,以'/'开头则表示相对小程序根目录；也支持临时路径 
        rotate 旋转角度 Number 否 顺时针旋转的角度,范围 0 ~ 360,默认为 0 
        alpha 标注的透明度 Number 否 默认1,无透明 
        width 标注图标宽度 Number 否 默认为图片实际宽度 
        height 标注图标高度 Number 否 默认为图片实际高度 
        callout 自定义标记点上方的气泡窗口 Object 否 {content, color, fontSize, borderRadius, bgColor, padding, boxShadow, display} 1.2.0
        label 为标记点旁边增加标签 Object 否 {color, fontSize, content, x, y},可识别换行符,x,y原点是marker对应的经纬度 1.2.0
        anchor 经纬度在标注图标的锚点,默认底边中点 Object 否 {x, y},x表示横向(0-1),y表示竖向(0-1)。{x: .5, y: 1} 表示底边中点 1.2.0
      marker   上的气泡 callout
      content  文本 str
        color 文本颜色 str
        fontSize 文字大小 Number
        borderRadius callout边框圆角 Number
        bgColor 背景色 str
        padding 文本边缘留白 Number
        display 'BYCLICK':点击显示; 'ALWAYS':常显 str
      polyline 指定一系列坐标点,从数组第一项连线至最后一项
        points 经纬度数组 Array 是 [{latitude: 0, longitude: 0}] 
        color 线的颜色 str 否 8位十六进制表示,后两位表示alpha值,如：#000000AA 
        width 线的宽度 Number 否  
        dottedLine 是否虚线 Boolean 否 默认false 
        arrowLine 带箭头的线 Boolean 否 默认false,开发者工具暂不支持该属性 1.2.0
        borderColor 线的边框颜色 str 否  1.2.0
        borderWidth 线的厚度 Number 否  1.2.0
      circles 在地图上显示圆
        latitude 纬度 Number 是 浮点数,范围 -90 ~ 90
        longitude 经度 Number 是 浮点数,范围 -180 ~ 180
        color 描边的颜色 str 否 8位十六进制表示,后两位表示alpha值,如：#000000AA
        fillColor 填充颜色 str 否 8位十六进制表示,后两位表示alpha值,如：#000000AA
        radius 半径 Number 是 
        strokeWidth 描边的宽度 Number 否
      controls 在地图上显示控件,控件不随着地图移动
        id 控件id Number 否 在控件点击事件回调会返回此id
        position 控件在地图的位置 Object 是 控件相对地图位置
        iconPath 显示的图标 str 是 项目目录下的图片路径,支持相对路径写法,以'/'开头则表示相对小程序根目录；也支持临时路径
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
  属性相关 
  ◆指令语法 
  {{val}}      "Mustache"语法,插值 
    适用于'组件文本'/'组件属性' 
    控制class  class="aoo {{boo}}" 
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
  <import src="xxx.wxml"/>使用目标文件定义的<template>模版
    PS: 不可绑定引入页的JS数据 
      可自定义数据,但不能从引入页JS中绑定数据;
      可绑定事件,在引入后页面的JS中定义响应函数; 
    Example: 
      // tpl-aoo.wxml 中  
      <template name="aoo">
      <view wx:for={{key2}}>{{key1}}</view>
      </template>  
      // boo.wxml 中 
      <import src="./tpl-aoo.wxml"/>       // 引入 
      <template is="aoo" data="{{key1:val1,key2:val2,...}}"></template> // 使用,并传入数据 
    作用域 
      只会import目标文件中定义的template,而不会import目标文件import的template 
      // <!-- A.wxml -->
      <template name="A"> <text> A template </text> </template>
      // <!-- B.wxml -->
      <import src="a.wxml"/>
      <template name="B"> <text> B template </text> </template>
      // <!-- C.wxml -->
      <import src="b.wxml"/>
      <template is="A"/>  // <!-- Error! Can not use tempalte when not import A. -->
      <template is="B"/>
  <include src="xxx.wxml"/> 将目标文件除了<template/>的整个代码引入 
    相当于是拷贝到include位置,可绑定引入页的JS数据 
    Example:
      <view> header </view>  // header.wxml  
      <view> footer </view>  // footer.wxml 
      // index.wxml 中 
      <include src="header.wxml"/>
      <view> body </view>
      <include src="footer.wxml"/>
  ◆'Event'事件 
    PS: 事件是视图层到逻辑层的通讯方式;可将用户的行为反馈到逻辑层进行处理 
      事件可以绑定在组件上,当达到触发事件,就会执行逻辑层中对应的事件处理函数 
      事件对象可以携带额外信息,如id, dataset, touches。
  事件枚举 
    PS: 事件分为冒泡事件和非冒泡事件
    ◆WXML的冒泡事件列表：当一个组件上的事件被触发后,该事件会向父节点传递 
    类型           触发条件
    'touchstart'  手指触摸动作开始
    'touchmove'   手指触摸后移动
    'touchcancel' 手指触摸动作被打断,如来电提醒/弹窗
    'touchend'    手指触摸动作结束
    'tap'         手指触摸后离开
    'longpress'   手指触摸后,超过350ms再离开 ['1.5.0+'] 
      如果指定了事件回调函数并触发了该事件,tap事件将不被触发 
    'longtap'     手指触摸后,超过350ms再离开[推荐使用'longpress'代替] 
    'markertap'   
    'transitionend'      在 WXSS transition/wx.createAnimation 动画结束后触发 
    'animationstart'     在一 WXSS animation 动画开始时触发 
    'animationiteration' 在一 WXSS animation 一次迭代结束时触发 
    'animationend'       在一 WXSS animation 动画完成时触发 
    'touchforcechange'   在支持3DTouch的iPhone设备,重按时触发 [1.9.90+]    
    ◆非冒泡事件：当一个组件上的事件被触发后,该事件不会向父节点传递 
    除上表之外的其他组件自定义事件都是非冒泡事件 
    如<form/>的'submit'事件,<input/>的'input'事件,<scroll-view/>的'scroll'事件
  使用方式 
    在结构的标签中指定 eventname="fn", 在组件中绑定一个事件处理函数 
    eventname: 监听的事件方式及类型 
      'bind'/'catch' 开头,加上事件的类型
        如'bindtap''catchtouchstart'
      bind/catch:type   [1.5.0+]
        如: catch:touchstart bind:tap 
      'bind'事件绑定不会阻止冒泡事件向上冒泡;
      'catch'事件绑定会阻止冒泡事件向上冒泡;
    fn:  str,需在对应的Page中定义同名的函数,否则当触发事件时会报错 
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
    PS: '1.5.0+'起,触摸类事件支持捕获阶段,捕获阶段位于冒泡阶段前,
      捕获阶段中,事件到达节点的顺序与冒泡阶段恰好相反 
    在捕获阶段监听事件的方式: 
      capture-bind 
      capture-catch  将中断捕获阶段和取消冒泡阶段 
    Example: 
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
    .type           事件类型
    .timeStamp      页面打开到触发事件所经过的ms数 
    .target         触发事件的源组件,触发事件的组件的一些属性值集合  
      .id        事件源组件的id
      .tagName   当前组件的类型
      .dataset   事件源组件上由data-开头的自定义属性组成的集合 
    .currentTarget  事件绑定的当前组件,当前组件的一些属性值集合  
      .id       当前组件的id
      .tagName  当前组件的类型
      .dataset  当前组件上由data-开头的自定义属性组成的集合
        'data-*'不区分大小写,大写会自动转成小写加'-',如data-element-type
    ◆'CustomEvent'自定义事件对象属性列表[继承 BaseEvent] 
    .detail         额外的信息 
      自定义事件所携带的数据,
      如表单组件的提交事件会携带用户的输入,媒体的错误事件会携带错误信息,
      详见组件定义中各个事件的定义。
      点击事件的detail 带有的 x, y 同 pageX, pageY 代表距离文档左上角的距离。
    ◆'TouchEvent'触摸事件对象属性列表[继承 BaseEvent]：
    .touches         触摸事件,当前停留在屏幕中的触摸点信息的数组  
      PS: 数组每个元素为一个 Touch 对象,表示当前停留在屏幕上的触摸点 
      Touch对象
        .identifier num,触摸点的标识符
        .pageX    num,距离文档左上角的距离 
        .pageY    num,距离文档左上角的距离 
        .clientX  num,距离页面可显示区域[屏幕除去导航条]左上角距离
        .clientY  num,距离页面可显示区域[屏幕除去导航条]左上角距离 
    .changedTouches  触摸事件,当前变化的触摸点信息的数组 
      changedTouches 数据格式同 touches,表示有变化的触摸点,
      如从无变有[touchstart],位置变化[touchmove],从有变无[touchend/touchcancel] 
    ◆特殊事件： 
    <canvas/> 中的触摸事件不可冒泡,故没有 currentTarget 
    canvas 触摸事件中携带的 touches 是'CanvasTouch'数组 
      CanvasTouch对象 
        .identifier num,触摸点的标识符 
        .x       num,距离 Canvas 左上角的距离
        .y       num,距离 Canvas 左上角的距离
'*.js'逻辑层'App Service' 
  PS: 每个页面有独立的作用域,并提供模块化能力 
    提供丰富的API,如扫一扫,支付等微信特有能力 
    由于MINA并非运行在浏览器中,所以JS在web中一些能力都无法使用,如'document''window'等
    开发者写的所有代码最终将会打包成一份js,并在小程序启动的时候运行,直到小程序销毁,
    类似ServiceWorker,所以逻辑层也称之为App Service 
  APP()   // 见 app.js 
  Page()  // 见 xxx.js 
  getCurrentPages() // 获取当前页面栈的实例 
    // 以数组形式按栈的顺序给出,第一个元素为首页,最后一个元素为当前页面
    // 不要尝试修改页面栈,会导致路由以及页面状态错误 
'*.wxss'视图样式用于描述页面的样式 
  PS: 'WeiXin Style Sheet',具有CSS大部分特性,同时对CSS进行了扩充以及修改  
  尺寸单位 
    PS: 建议：开发微信小程序时设计师可用iPhone6作为视觉稿的标准 
    rpx,'responsive pixel': 根据屏幕宽度进行自适应,屏幕宽度等于750rpx 
      如在iPhone6上,屏幕宽度为375px,共有750个物理像素, 
      则'750rpx = 375px = 750物理像素','1rpx = 0.5px = 1物理像素' 
    rem,'root em': 根据屏幕宽度进行自适应,屏幕宽度等于20rem 
  @import "./xx.wxss"; 导入外联样式表 
  style="" 内联样式,可接收动态的样式,在运行时会进行解析
    如 <view style="color:{{color}};"/> 
    不要将静态的样式写进style中,统一写到class中,以免影响渲染速度 
  目前支持的选择器: 
    element        标签选择器 
    #id            id选择器 
    .class         类选择器 
    ::before       伪选择器,内部头部插入内容  
    ::after        伪选择器,内部尾部插入内容  
    slctor,slctor  并集选择器 
'*.wxs'小程序的脚本语言,结合WXML,可以构建出页面的结构 
  PS: 'WeiXin Script',不依赖于运行时的基础库版本,可在所有版本的小程序中运行 
    语法不同于JS,wxs中不能调用其他js文件中定义的函数,也不能调用小程序提供的API 
    wxs函数不能作为组件的事件回调 
    每个'.wxs'文件和<wxs>标签都是一个单独的模块,有自己独立的作用域 
  module 对象: 每个wxs模块均有一个内置的module对象 
    .exports 对外暴露其内部的私有变量与函数  
  require() 函数: wxs中引用其他wxs文件模块 
    只能引用'.wxs'文件模块,且必须使用相对路径 
    wxs 模块均为单例,wxs 模块在第一次被引用时,会自动初始化为单例对象。
      多个页面,多个地方,多次引用,使用的都是同一个 wxs 模块对象。
    如果一个 wxs 模块在定义之后,一直没有被引用,则该模块不会被解析与运行。
  <wxs module="md1" src="xx.wxs"></wxs> 标签: 编写或引入wxs 
    module  必选,模块名 
      有重复模块名则按照先后顺序覆盖[后者覆盖前者],
      不同文件之间的 wxs 模块名不会相互覆盖 
    src     引用'.wxs'文件的相对路径
      仅当本标签为单闭合标签或标签的内容为空时有效  
      效果同require函数  
  Feature: 
    使用 <include> 或 <import> 时,<wxs> 模块不会被引入到对应的 WXML 文件中。
    <template> 标签中,只能使用定义该 <template> 的 WXML 文件中定义的 <wxs> 模块。
自定义组件 [1.6.3+] 
  PS: 将页面内的功能模块抽象成自定义组件,以便在不同的页面中重复使用 
    也可将复杂的页面拆分成多个低耦合的模块,有助于代码维护
    自定义组件在使用时与基础组件非常相似 
  创建自定义组件
    一个自定义组件由 json wxml wxss js 四个文件组成 
    .json 配置设定 
      {
        "component": true  // 进行自定义组件声明 
      }
    .wxml 组件模版 
    .js  
      Component({ // 注册组件,提供组件的属性定义/内部数据/自定义方法 
        // Component 构造器构造的组件也可以作为页面使用 
        // 通过 this 访问生成的组件实例 
        // 生命周期函数无法在组件方法中通过 this 访问到。
        properties: {  // 可选,组件的对外属性,是属性名到属性设置的映射表 
          // 属性名采用驼峰写法
          // 在 wxml 中,指定属性值时则对应使用连字符写法
          // 应用于数据绑定时采用驼峰写法 
          attr1: {
            type: <kw>  // 必选,属性类型 
              null    表示任意类型
              String
              Number
              Boolean
              Object
              Array
            ,value:     // 可选,属性初始值
            // observer 可选,属性值被更改时的响应函数 
            ,observer: 'fnName'  // fnName在methods中定义的方法 
            ,observer: function(newVal ,oldVal){ 
              // 
            } 
          }
          attr2: String // 简化的定义方式 
          ,...
        }  
        ,data: {       // 可选,组件的内部数据,和 properties 一同用于组件的模版渲染  
          // 使用 this.data 可以获取内部数据和属性值,但不要直接修改它们,应使用 setData 修改 
          // 属性名应避免以 data 开头,即不要命名成 dataXyz 这样的形式,
          // 因为在 WXML 中, data-xyz="" 会被作为节点 dataset 来处理,而不是组件属性。
          // 在一个组件的定义和使用时,组件的属性名和data字段相互间都不能冲突 
          key: val 
          ,...
        }  
        ,methods: {    // 可选,组件的方法,包括事件响应函数和任意的自定义方法 
          fn: function(){
          }
          ,..
        }  
        ,behaviors: []    // 可选,类似于mixins和traits的组件间代码复用机制 
        // 生命周期函数可为函数/methods中定义的方法名 
        ,created: function(){   // 可选,在组件实例进入页面节点树时执行 
          // 此时不能调用 setData
        }  
        ,attached: function(){  // 可选,在组件实例进入页面节点树时执行 
          // 
        }  
        ,ready: function(){     // 可选,组件布局完成后执行 
          // 此时可获取节点信息[使用 SelectorQuery] 
        }  
        ,moved: function(){     // 可选,在组件实例被移动到节点树另一个位置时执行 
          // 
        }  
        ,detached: function(){  // 可选,在组件实例被从页面节点树移除时执行 
          // 
        }  
        ,relations: {  // 可选,组件间关系定义,参见 组件间关系
          // 
        }
        ,externalClasses:   // 可选,组件接受的外部样式类 
        ,options:   // 可选,一些组件选项 
      }) 
      组件实例通用的属性/方法 
      .is       str,组件的文件路径
      .id       str,节点id
      .dataset  str,节点dataset
      .data     obj,组件数据,包括内部数据和属性值
      .setData()       // 设置data并执行视图层渲染
      .hasBehavior()   // 检查组件是否具有 behavior 
        // 检查时会递归检查被直接或间接引入的所有behavior 
      .triggerEvent('eventname',detail,config)  // 触发事件 
        eventname  // str,事件名  
        detail     //obj,detail对象,提供给事件监听函数 
        config: {  // 触发事件的选项 
          bubbles: <bol>   // 可选,事件是否冒泡,默认: false 
          ,composed: <bol> // 可选,事件是否可以穿越组件边界,默认: false 
            为false时,事件将只能在引用组件的节点树上触发,不进入其他任何组件内部 
          ,capturePhase: <bol> // 可选,事件是否拥有捕获阶段,默认: false 
        }      
      .createSelectorQuery()   // 创建一个 SelectorQuery 对象,选择器选取范围为这个组件实例内
      .selectComponent()       // 使用选择器选择组件实例节点,返回匹配到的第一个组件实例对象
      .selectAllComponents()   // 使用选择器选择组件实例节点,返回匹配到的全部组件实例对象组成的数组
      .getRelationNodes()      // 获取所有这个关系对应的所有关联节点,参见 组件间关系
    .wxss 组件样式 
      组件wxss中不应使用ID选择器/属性选择器/标签名选择器 
API 
  PS: 多数API在执行后有回调['success''fail''complete'],无特别情况下,使用'cfoo'表示[Self];
  网络 
    PS: 最大并发数为'10'; 默认超时时间和最大超时时间都是60s 
      网络请求的'referer'是不可以设置的,
      格式固定为'https://servicewechat.com/{appid}/{version}/page-frame.html',
      其中{appid}为小程序的'appid'{version}为小程序的版本号,版本号0表示为开发版。
      小程序进入后台运行后[非置顶聊天],如果5s内网络请求没有结束,会回调错误信息"fail interrupted"；
      在回到前台之前,网络请求接口调用都会无法调用。
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
          key: val,
        },
        'dataType': 'json', // 可选,默认为'json' 
          // 如果设置了 dataType 为 json,则会尝试对响应的数据做一次 JSON.parse
        cfoo,
      }
      requestTask 返回值对象,可调用方法中断请求任务 
        requestTask.abort()  中断请求任务'1.4.0+'
    var uploadTask = wx.uploadFile({})    上传文件,将本地资源上传到服务器  
      PS: 如通过 wx.chooseImage 等接口获取到一个本地资源的临时文件路径后,
        可通过此接口将本地资源上传到指定服务器。
        客户端发起一个 HTTPS POST 请求,其中 content-type 为 multipart/form-data 。
      {
        'url': 'xx', // 服务器url
        'filePath': 'xx', // 要上传文件资源的路径
        'name': '',  // 文件对应的 key , 服务器端通过这个key可以获取到文件二进制内容
        'header': {},   // 请求 Header  
        'formData': {}, // 请求中其他额外的 form data
        success: function(res){ // 接口调用成功的回调函数 
          // res.data       开发者服务器返回的数据
          // res.statusCode HTTP状态码
        }, 
        fail : function(){   // 接口调用失败的回调函数 
        }, 
        complete :function(){ // 调用成功、失败都会执行 
        }, 
      }
      uploadTask 返回值对象,可监听上传进度变化事件,以及取消上传任务 
        uploadTask.onProgressUpdate(foo)  监听上传进度变化 '1.4.0' 
          foo  回调,参数 (response) 
          response.progress       num,上传进度百分比
          response.totalBytesSent num,已经上传的数据长度,单位 Bytes
          response.totalBytesExpectedToSend num,预期需要上传的数据总长度,单位 Bytes 
        uploadTask.abort()  中断上传任务 '1.4.0' 
    var downloadTask = wx.downloadFile({})  下载文件资源到本地
      PS: 客户端直接发起一个 HTTP GET 请求,返回文件的本地临时路径 
      {
        'url': '', 
        'header': {}, 
        success: function(res){
          // res.tempFilePath   文件的临时路径 
            // 文件的临时路径,在小程序本次启动期间可以正常使用,
            // 如需持久保存,需在主动调用 wx.saveFile,在小程序下次启动时才能访问得到
        }, 
        fail: function(){
        },
        complete : function(){
        },
      }
      downloadTask 返回值对象,可监听下载进度变化事件,以及取消下载任务 
        downloadTask.onProgressUpdate(foo(response))  监听下载进度变化 '1.4.0'
          response.progress           下载进度百分比
          response.totalBytesWritten  已经下载的数据长度,单位 Bytes
          response.totalBytesExpectedToWrite 预期需要下载的数据总长度,单位 Bytes
        downloadTask.abort()  中断下载任务 '1.4.0'
    wx.connectSocket({})     创建WebSocket连接 
      PS: 一个微信小程序同时只能有一个WebSocket连接,否则后续再创建会导致之前的连接关闭;
      {
        'url' : '', // 必须是wss协议 
        'data' : {}, 
        'header' : {},  
        'method' : 'GET', // 默认是GET
          // 有效值： OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 
        'protocols' : [], //  strArray 否 子协议数组 1.4.0
        cfoo,
      }
    wx.onSocketOpen(foo(res))    监听WebSocket打开 
    wx.sendSocketMessage({}) 发送WebSocket消息
      PS: 需要先 wx.connectSocket,并在 wx.onSocketOpen 回调之后才能发送
      {
        data : {}, //  str/ArrayBuffer,需要发送的内容
        cfoo,
      }
    wx.onSocketMessage(foo(res)) 接收WebSocket消息
      res.data    str/ArrayBuffer,服务器返回的消息 
    wx.closeSocket({})       关闭WebSocket连接 
      PS: 当连接打开后再调用 wx.closeSocket 才能关闭连接,否则不起作用 
      {
        'code' : num,  // 可选,表示关闭连接的状态号,表示连接被关闭的原因。
          // 默认的取值是1000 （表示正常连接关闭） 1.4.0
        'reason' : '', // 可选,表示连接被关闭的原因
          // 这个字符串必须是不长于123字节的UTF-8 文本（不是字符） 1.4.0
        cfoo,
      }
    wx.onSocketError(foo(res))   监听WebSocket错误
    wx.onSocketClose    监听WebSocket关闭
  媒体 
    ◆图片 
    wx.chooseImage({})   从本地相册选择图片或使用相机拍照 
      {
        'count' : 9, // 最多可以选择的图片张数,默认9
        'sizeType': ['original', 'compressed'],  //  original原图,compressed压缩图,默认二者都有
        'sourceType': ['album', 'camera'], //  album从相册选图,camera使用相机,默认二者都有
        success : function(res){ 
          // res. tempFilePaths  图片的本地文件路径列表 
          // res.tempFiles  图片的本地文件列表,每一项是一个File对象 '1.2.0'
            // [
            //   {
            //     'path' : '', 本地文件路径
            //     'size' : '', 本地文件大小,单位：B
            //   },
            // ]
        },
        fail : function(){ },
        complete : function(){ },
      }
    wx.previewImage({})  预览图片 
      {
        'urls': [], // 需要预览的图片链接列表
        'current': '', // 当前显示图片的链接,不填则默认为 urls 的第一张
        cfoo,
      }
    wx.getImageInfo({})  获取图片信息 
      {
        'src' : '', // 图片的路径,可为'相对路径''临时文件路径''存储文件路径''网络图片路径'
        success : function(res){
          // res.width   num,图片宽度,单位px
          // res.height  num,图片高度,单位px
          // res.path    返回图片的本地路径
        },
        fail : function(){
        },
        complete : function(){
        },
      }
    wx.saveImageToPhotosAlbum({}) 保存图片到系统相册 '1.2.0+'
      PS: 需要用户授权（scope.writePhotosAlbum）,详见 用户授权 
      {
        'filePath': '', // 图片文件路径,可以是临时文件路径也可以是永久文件路径,不支持网络图片路径
        success:function(res){
          // res.errMsg 调用结果
        },
        fail:function(){ },
        complete:function(){ },
      }
    ◆录音 
    wx.startRecord({}) 开始录音,返回录音文件的临时文件路径,接口需要用户授权 
      PS: 当主动调用wx.stopRecord,或者录音超过1分钟时自动结束录音
        当用户离开小程序时,此接口无法调用。
      {
        success: function(res){
          // res.tempFilePath  录音文件的临时路径
            // 需持久保存,需在主动调用wx.saveFile
        },
        fail: function(){
        },
        complete: function(){
        },
      }
    wx.stopRecord()  ​ 主动调用停止录音
    ◆音频播放控制 
    wx.playVoice({})  开始播放语音 
      PS: 同时只允许一个语音文件正在播放,如果前一个语音文件还没播放完,将中断前一个语音播放。
      {
        'filePath' : 'path', // 需要播放的语音文件的文件路径,必选 
        cfoo,
      }
    wx.pauseVoice()   暂停正在播放的语音 
      PS: 再次调用wx.playVoice()播放同一个文件时,会从暂停处开始播放。
        如果想从头开始播放,需要先调用 wx.stopVoice。    
    wx.stopVoice()    结束播放语音 
    ◆音乐播放控制 
      PS: 对于微信客户端来说,只能同时有一个后台音乐在播放。
      当用户离开小程序后,音乐将暂停播放；
      当用户点击“显示在聊天顶部”时,音乐不会暂停播放；
      当用户在其他小程序占用了音乐播放器,原有小程序内的音乐将停止播放。
    wx.getBackgroundAudioPlayerState({}) 获取后台音乐播放状态 
      {
        success : function(res){ 
          // res.status  播放状态,2：没有音乐在播放,1：播放中,0：暂停中 
          // 以下信息,只有在当前有音乐播放时返回 
          // res.duration  选定音频的长度,单位：s 
          // res.currentPosition  选定音频的播放位置,单位：s 
          // res.downloadPercent  整数,音频的下载进度,[80 代表 80%] 
          // res.dataUrl  歌曲数据链接     
        },
        fail: function(){
        },
        complete:function(){
        },
      }
    wx.playBackgroundAudio({}) 使用后台播放器播放音乐 
      {
        'dataUrl': '', // 音乐链接,必选,目前支持格式'm4a''aac''mp3''wav'
        'title': '',   // 音乐标题
        'coverImgUrl': '', //  封面URL
        cfoo, 
      }
    wx.pauseBackgroundAudio()  暂停播放音乐  
    wx.seekBackgroundAudio({}) 控制音乐播放进度 
      PS: iOS'6.3.30',wx.seekBackgroundAudio()会有短暂延迟
      {
        'position': num, // 音乐位置,单位s,必选 
        cfoo,
      }
    wx.stopBackgroundAudio()   停止播放音乐     
    wx.onBackgroundAudioPlay(CALLBACK)  监听音乐播放     
    wx.onBackgroundAudioPause(CALLBACK) 监听音乐暂停 
    wx.onBackgroundAudioStop(CALLBACK)  监听音乐停止      
    ◆背景音频播放管理 
    var bgAuM = wx.getBackgroundAudioManager() 获取全局唯一的背景音频管理器 '1.2.0+' 
      ◆'backgroundAudioManager'对象的属性 
      bgAuM.duration  // num,当前音频长度,单位s 
        // 有在当前有合法的src时返回
      bgAuM.currentTime // num,当前音频的播放位置,单位s 
        // 有在当前有合法的src时返回
      bgAuM.paused    // 当前是是否暂停或停止状态,true表示暂停或停止,false 表示正在播放 
      bgAuM.src  // 音频的数据源,默认为空字符串,
        // 当设置了新的 src 时,会自动开始播放 ,目前支持的格式有 m4a, aac, mp3, wav  否
      bgAuM.buffered  // num,音频缓冲的时间点,仅保证当前播放时间点到此时间点内容已缓冲 
      bgAuM.startTime   // num,读写,音频开始播放的位置,单位s
      bgAuM.title       // 读写,音频标题,用于做原生音频播放器音频标题 
        // 原生音频播放器中的分享功能,分享出去的卡片标题,也将使用该值 
      bgAuM.epname      // 读写,专辑名 
        // 原生音频播放器中的分享功能,分享出去的卡片简介,也将使用该值。  否
      bgAuM.singer      // 读写,歌手名 
        // 原生音频播放器中的分享功能,分享出去的卡片简介,也将使用该值 
      bgAuM.coverImgUrl // 读写,封面图url,用于做原生音频播放器背景图 
        // 原生音频播放器中的分享功能,分享出去的卡片配图及背景也将使用该图 
      bgAuM.webUrl      // 读写,页面链接 
        // 原生音频播放器中的分享功能,分享出去的卡片简介,也将使用该值 
      ◆'backgroundAudioManager'对象的方法  
      bgAuM.play()    // 播放
      bgAuM.pause()   // 暂停
      bgAuM.stop()    // 停止
      bgAuM.seek(num) // 跳转到指定位置,单位 s
      bgAuM.onCanplay(foo)    // 背景音频进入可以播放状态,但不保证后面可以流畅播放
      bgAuM.onPlay(foo)       // 背景音频播放事件 
      bgAuM.onPause(foo)      // 背景音频暂停事件 
      bgAuM.onStop(foo)       // 背景音频停止事件 
      bgAuM.onEnded(foo)      // 背景音频自然播放结束事件 
      bgAuM.onTimeUpdate(foo) // 背景音频播放进度更新事件 
      bgAuM.onPrev(foo)       // 用户在系统音乐播放面板点击上一曲事件（iOS only）
      bgAuM.onNext(foo)       // 用户在系统音乐播放面板点击下一曲事件（iOS only）
      bgAuM.onError(foo)      // 背景音频播放错误事件
        errCode说明
        10001  系统错误
        10002  网络错误
        10003  文件错误
        10004  格式错误
        -1     未知错误  
      bgAuM.onWaiting(foo)    // 音频加载中事件,当音频因为数据不足,需要停下来加载时会触发
    ◆音频组件控制 
    var auCt = wx.createAudioContext(audioId) 创建并返回audio上下文audioContext对象
      PS: 通过'audioId'跟一个<audio/>组件绑定,通过它可以操作对应的<audio/>组件 
      'audioContext'对象的方法列表：
      auCt.setSrc('') // 设置音频的地址
      auCt.play()     // 播放
      auCt.pause()    // 暂停
      auCt.seek(num)  // 跳转到指定位置,单位 s      
    ◆视频 
    wx.chooseVideo({}) 拍摄视频或从相册中选视频,返回视频临时文件路径 
      PS: 文件的临时路径,在小程序本次启动期间可以正常使用,
        如需持久保存,需在主动调用 wx.saveFile,在小程序下次启动时才能访问得到。
      {
        sourceType: [],  // 选择/拍摄视频,默认: ['album','camera'] 
          'album'   从相册选视频
          'camera'  使用相机拍摄
        maxDuration: 60, // 视频最长拍摄时间,单位秒。最长支持'60'秒
        camera: 'back',  // 默认调起的为前置还是后置摄像头 
          // 在部分Android手机下由于系统ROM不支持无法生效   
          'back'   后置,默认值
          'front'  前置
        success: function(res){
          // res.tempFilePath 选定视频的临时文件路径
          // res.duration     选定视频的时间长度
          // res.size    选定视频的数据量大小
          // res.height  返回选定视频的长
          // res.width   返回选定视频的宽
        },
        fail: function(){
          // 
        },
        complete: function(){
          // 
        },
      }
    wx.saveVideoToPhotosAlbum({}) 保存视频到系统相册 '1.2.0+' 
      PS: 需要用户授权（scope.writePhotosAlbum）,详见 用户授权 
      {
        'filePath':'', // 视频文件路径,可以是临时文件路径也可以是永久文件路径
        success: function(res){
          res.errMsg  // 调用结果
        },
        fail: function(){ },
        complete: function(){ },
      }
    ◆视频组件控制 
    var vdCt = wx.createVideoContext(videoId)  创建并返回video上下文'videoContext'对象
      PS: 'videoContext'通过videoId跟一个video组件绑定,通过它可以操作一个video组件
      'videoContext'对象的方法列表
      vdCt.play()  // 播放  
      vdCt.pause() // 暂停  
      vdCt.seek(num) // 跳转到指定位置,单位 s  
      vdCt.sendDanmu({text:'',color:''})  // 发送弹幕   
      vdCt.playbackRate(num)   // 设置倍速播放,支持的倍率有0.5/0.8/1.0/1.25/1.5 '1.4.0'
      vdCt.requestFullScreen() // 进入全屏  '1.4.0'
      vdCt.exitFullScreen()    // 退出全屏  '1.4.0'
  文件 
    wx.saveFile({})  保存文件到本地 
      PS: 本地文件存储的大小限制为10M 
      {
        'tempFilePath':'', // 要保存的文件的临时路径 
        success:function(res){
          res.savedFilePath // 文件的保存路径 
        },
        fail:function(){ },
        complete:function(){ },
      }
    wx.getSavedFileList({})  获取本地已保存的文件列表 
      {
        success:function(res){
          // res.errMsg   接口调用结果 
          // res.fileList 文件列表 
            // fileItem.filePath   // 文件的本地路径
            // fileItem.createTime // 文件的保存时的时间戳,从1970/01/01 08:00:00 到当前时间的秒数
            // fileItem.size       // 文件大小,单位B
        },
        fail:function(){},
        complete:function(){},
      }
    wx.getSavedFileInfo({}) 获取本地文件的文件信息
      PS: 此接口只能用于获取已保存到本地的文件 [使用wx.getFileInfo()接口获取临时文件信息] 
      {
        'filePath':'',  // 文件路径
        success:function(res){
          res.errMsg  // 接口调用结果
          res.size    // num,文件大小,单位B
          res.createTime // 文件的保存时的时间戳,从1970/01/01 08:00:00 到当前时间的秒数
        },
        fail:function(){ },
        complete:function(){ },
      }
    wx.removeSavedFile({})  删除本地存储的文件 
      {
        'filePath':'', // 需要删除的文件路径
        cfoo,
      }
    wx.openDocument({}) 新开页面打开文档
      PS: 支持格式'doc','xls','ppt','pdf','docx','xlsx','pptx'
      {
        'filePath':'', // 文件路径,可通过downFile 得  
        'fileType':'', // 文件类型,指定文件类型打开文件,可选 
          // 有效值 doc, xls, ppt, pdf, docx, xlsx, pptx  1.4.0
        cfoo,
      }
  数据缓存 
    PS: 每个微信小程序都可以有自己的本地缓存,
      可以通过 wx.setStorage（wx.setStorageSync）、
      wx.getStorage（wx.getStorageSync）、
      wx.clearStorage（wx.clearStorageSync）可以对本地缓存进行设置、获取和清理。
      同一个微信用户,同一个小程序 storage 上限为 10MB。
      localStorage 以用户维度隔离,同一台设备上,A 用户无法读取到 B 用户的数据。
      localStorage 是永久存储的,但是我们不建议将关键信息全部存在localStorage,以防用户换设备的情况。
      本地数据存储的大小限制为10MB  
    wx.setStorage({})  将数据存储在本地缓存中指定的key中
      PS: 会覆盖掉原来该key对应的内容,这是一个异步接口 
      {
        'key':'',        // 本地缓存中的指定的 key
        'data': obj/str, // 需要存储的内容
        cfoo,
      }
    wx.setStorageSync(key,data)  将data存储在本地缓存中指定的key中
      PS: 会覆盖掉原来该 key 对应的内容,这是一个同步接口 
      key  str,本地缓存中的指定的key  
      data obj/str,需要存储的内容 
    wx.getStorage({}) 从本地缓存中异步获取指定key对应的内容 
      {
        'key':'', // 本地缓存中的指定的key 
        success: function(res){
          // res.data   key对应的内容
        },
        fail: function(){ },
        complete: function(){ },
      }
    wx.getStorageSync(key) 从本地缓存中同步获取指定key对应的内容。
      key   本地缓存中的指定的key 
    wx.getStorageInfo({})  异步获取当前storage的相关信息
      {
        success:function(res){
          // res.keys         当前storage中所有的key
          // res.currentSize  当前占用的空间大小, 单位kb
          // res.limitSize    限制的空间大小,单位kb
        },
        fail:function(){ },
        complete:function(){ },
      }
    wx.getStorageInfoSync()   同步获取当前storage的相关信息 
    wx.removeStorage({})      从本地缓存中异步移除指定key 
      {
        'key':'', // 本地缓存中的指定的key 
        cfoo,
      }
    wx.removeStorageSync(key) 从本地缓存中同步移除指定key 
      key   本地缓存中的指定的key 
    wx.clearStorage()     清理本地数据缓存[异步]
    wx.clearStorageSync() 同步清理本地数据缓存 
  位置 
    ◆获取位置 
    wx.getLocation({}) 获取当前地理位置信息 
      PS: 当用户离开小程序后,此接口无法调用；当用户点击“显示在聊天顶部”时,此接口可继续调用。
        wx.getLocation()、wx.chooseLocation() 接口需要用户授权,请兼容用户拒绝授权的场景。      
      {
        'type' : '', 指定返回坐标的类型 
          // 默认为'wgs84'返回gps坐标,'gcj02'返回可用于 wx.openLocation 的坐标
          // iOS 6.3.30 type 参数不生效,只会返回 wgs84 类型的坐标信息 
        success:function(res){
          // res.latitude  纬度,浮点数,范围为-90~90,负数表示南纬 
          // res.longitude 经度,浮点数,范围为-180~180,负数表示西经 
          // res.speed     速度,浮点数,单位m/s 
          // res.accuracy  位置的精确度 
          // res.altitude  高度,单位 m 1.2.0
          // res.verticalAccuracy 垂直精度,单位 m（Android 无法获取,返回 0） 1.2.0
          // res.horizontalAccuracy 水平精度,单位 m 1.2.0
        },
        fail:function(){
        },
        complete:function(){
        },
      }
    wx.chooseLocation({})   打开地图选择位置 
      {
        success:function(res){
          res.name      // 位置名称
          res.address   // 详细地址
          res.latitude  // 纬度,浮点数,范围为-90~90,负数表示南纬
          res.longitude // 经度,浮点数,范围为-180~180,负数表示西经
        },
        fail:function(){
        },
        complete:function(){
        },
        cancel:function(){
        },
      }
    ◆查看位置 
    wx.openLocation({}) ​使用微信内置地图查看位置
      {
        'latitude':'',  // 纬度,范围为-90~90,负数表示南纬
        'longitude':'', // 经度,范围为-180~180,负数表示西经
        'scale':'',     // 缩放比例,范围5~18,默认为18
        'name':'',     // 位置名
        'address':'',  // 地址的详细说明
        cfoo,
      }
    ◆地图组件控制 
    var mpCt = wx.createMapContext(mapId) 创建并返回map上下文'mapContext'对象 
      PS: mapContext通过mapId跟一个<map/>组件绑定,通过它可以操作对应的<map/>组件
      'mapContext'对象的方法列表
      mpCt.getCenterLocation({ // 获取当前地图中心的经纬度
        // 返回的是gcj02坐标系,可用于 wx.openLocation
        success:function(res){
          // res = { longitude: "经度", latitude: "纬度"}
        },
        fail:function(){ },
        complete:function(){ },
      })     
      mpCt.moveToLocation()  // 将地图中心移动到当前定位点,需要配合map组件的show-location使用  
      mpCt.translateMarker({  // 平移marker,带动画  '1.2.0+'
        'markerId': num, // 指定marker
        'destination': obj, // 指定marker移动到的目标点
        'autoRotate': bol, // 移动过程中是否自动旋转marker
        'rotate': num, // marker的旋转角度
        'duration': num, // 动画持续时长,默认值1000ms,平移与旋转分别计算
        animationEnd: function(){  // 动画结束回调函数
        },
        fail: function(){ // 接口调用失败的回调函数
        },
      })   
      mpCt.includePoints({    // 缩放视野展示所有经纬度  '1.2.0'
        'points': arr,  // 要显示在可视区域内的坐标点列表,[{latitude, longitude}]
        'padding': arr, // 坐标点形成的矩形边缘到地图边缘的距离,单位像素
        // 格式为[上,右,下,左],安卓上只能识别数组第一项,上下左右的padding一致。
        // 开发者工具暂不支持padding参数。
      })  
      mpCt.getRegion({    // 获取当前地图的视野范围  '1.4.0'
        'success': function(res){
          // res = {southwest, northeast},西南角与东北角的经纬度
        },
        'fail': function(){ },
        'complete': function(){ },
      })    
      mpCt.getScale({   // 获取当前地图的缩放级别  '1.4.0'
        cfoo,
      })   
  设备 
    ◆系统信息 
    wx.getSystemInfo({})  获取系统信息 
      {
        success: function(res){
          // res.brand        手机品牌  1.5.0
          // res.model        手机型号  
          // res.pixelRatio   设备像素比  
          // res.screenWidth   屏幕宽度  1.1.0
          // res.screenHeight  屏幕高度  1.1.0
          // res.windowWidth   可使用窗口宽度  
          // res.windowHeight  可使用窗口高度  
          // res.language   微信设置的语言  
          // res.version    微信版本号  
          // res.system     操作系统版本  
          // res.platform   客户端平台  
          // res.fontSizeSetting 用户字体大小设置。单位px  1.5.0 
            // 以“我-设置-通用-字体大小”中的设置为准
          // res.SDKVersion   客户端基础库版本  1.1.0
        },
        fail: function(){ },
        complete: function(){ },
      }
    var res = wx.getSystemInfoSync() 获取系统信息同步接口
      res.brand  手机品牌  '1.5.0' 
      res.model  手机型号  
      res.pixelRatio  设备像素比  
      res.screenWidth  屏幕宽度  '1.1.0' 
      res.screenHeight  屏幕高度  '1.1.0' 
      res.windowWidth  可使用窗口宽度  
      res.windowHeight  可使用窗口高度  
      res.language  微信设置的语言  
      res.version  微信版本号  
      res.system  操作系统版本  
      res.platform  客户端平台  
      res.fontSizeSetting  用户字体大小设置,单位：px  '1.5.0' 
        以“我-设置-通用-字体大小”中的设置为准 
      res.SDKVersion  客户端基础库版本  '1.1.0' 
    wx.canIUse(str)  判断小程序的API,回调,参数,组件等是否在当前版本可用 
      参数说明： 使用${API}.${method}.${param}.${options}
      或者${component}.${attribute}.${option}方式来调用
      ${API}       代表API名字 
      ${method}    代表调用方式,有效值为return, success, object, callback 
      ${param}     代表参数或者返回值 
      ${options}   代表参数的可选值 
      ${component} 代表组件名字 
      ${attribute} 代表组件属性 
      ${option}    代表组件属性的可选值  
      Example:
      wx.canIUse('openBluetoothAdapter')
      wx.canIUse('getSystemInfoSync.return.screenWidth')
      wx.canIUse('getSystemInfo.success.screenWidth')
      wx.canIUse('showToast.object.image')
      wx.canIUse('onCompassChange.callback.direction')
      wx.canIUse('request.object.method.GET')
      wx.canIUse('contact-button')
      wx.canIUse('text.selectable')
      wx.canIUse('button.open-type.contact')
    ◆网络状态 
    wx.getNetworkType({})  获取网络类型  
      {
        success: function(res){
          // res.networkType  网络类型
        },
        fail: function(){ },
        complete: function(){ },
      }
    wx.onNetworkStatusChange(f(res))  监听网络状态变化 '1.1.0+'
      res.isConnected  bol,当前是否有网络连接
      res.networkType  网络类型
        'wifi'  wifi网络
        '2g'    2g网络
        '3g'    3g网络
        '4g'    4g网络
        'none'  无网络
        'unknown'  Android下不常见的网络类型
    ◆加速度计 
    wx.onAccelerometerChange(f(res)) 监听加速度数据,频率'5次/秒' 
      PS: 接口调用后会自动开始监听,可使用 wx.stopAccelerometer 停止监听。
      res.x  num,X轴
      res.y  num,Y轴
      res.z  num,Z轴
    wx.startAccelerometer({})      开始监听加速度数据 '1.1.0'
      {
        cfoo,
      }
    wx.stopAccelerometer({})  停止监听加速度数据 '1.1.0'
      {
        cfoo,
      }
    ◆罗盘 
    wx.onCompassChange(f(res))  监听罗盘数据,频率'5次/秒'
      PS: 接口调用后会自动开始监听,可使用wx.stopCompass()停止监听 
      res.direction  num,面对的方向度数 
    wx.startCompass({})  开始监听罗盘数据 '1.1.0'
      {
        cfoo,
      }
    wx.stopCompass({})   停止监听罗盘数据 '1.1.0+'
      {
        cfoo,
      }
    ◆拨打电话 
    wx.makePhoneCall({}) 
      {
        'phoneNumber':'', // 需要拨打的电话号码
        cfoo,
      }
    ◆扫码 
    wx.scanCode({})  调起客户端扫码界面,扫码成功后返回对应的结果 
      {
        'onlyFromCamera': false,  // 是否只能从相机扫码,不允许从相册选择图片  '1.2.0'
        success: function(res){
          // res.result   所扫码的内容
          // res.scanType 所扫码的类型
          // res.charSet  所扫码的字符集
          // res.path  当所扫的码为当前小程序的合法二维码时,会返回此字段,内容为二维码携带的path
        },
        fail: function(){ },
        complete: function(){ },
      }
    ◆剪切板 
    wx.setClipboardData({})  设置系统剪贴板的内容 '1.1.0+'
      {
        'data': '',  // 需要设置的内容 
        cfoo,
      }
    wx.getClipboardData({})  获取系统剪贴板内容 '1.1.0+'
      {
        success: function(res){
          // res.data   剪贴板的内容
        },
        fail: function(){ },
        complete: function(){ },
      }
    ◆蓝牙 
    ★蓝牙适配器接口  '1.1.0' 
      PS: iOS微信客户端'6.5.6'版本开始支持,Android'6.5.7'版本开始支持 
        Mac系统可能无法获取'advertisData'及RSSI,请使用真机调试
        开发者工具和 Android 上获取到的deviceId为设备 MAC 地址,iOS 上则为设备 uuid。因此deviceId不能硬编码到代码中
      wx.openBluetoothAdapter({}) 初始化蓝牙适配器 '1.1.0+'
        PS: 由于系统的问题,目前仅在mac版的开发工具上支持蓝牙调试 
        {
          cfoo,
        }
      wx.closeBluetoothAdapter({}) 关闭蓝牙模块 '1.1.0+'
        PS: 调用该方法将断开所有已建立的链接并释放系统资源
        {
          cfoo,
        }
      wx.getBluetoothAdapterState({}) 获取本机蓝牙适配器状态 '1.1.0+'
        {
          success: function(res){
            // res.errMsg       成功：ok,错误：详细信息 
            // res.discovering  是否正在搜索设备 
            // res.available    蓝牙适配器是否可用 
          },
          fail: function(){ },
          complete: function(){ },
        }
      wx.onBluetoothAdapterStateChange(f(res)) 监听蓝牙适配器状态变化事件 '1.1.0'
        res.available    bol,蓝牙适配器是否可用 
        res.discovering  bol,蓝牙适配器是否处于搜索状态 
      wx.startBluetoothDevicesDiscovery({}) 开始搜寻附近的蓝牙外围设备 '1.1.0+' 
        PS: 该操作比较耗费系统资源,请在搜索并连接到设备后调用 stop 方法停止搜索 
        {
          'services': arr, //  蓝牙设备主 service 的 uuid 列表
            // 某些蓝牙设备会广播自己的主 service 的 uuid。
            // 如果这里传入该数组,那么根据该 uuid 列表,只搜索有这个主服务的设备。
          'allowDuplicatesKey': bol, // 是否允许重复上报同一设备
            // 如果允许重复上报,则onDeviceFound 方法会多次上报同一设备,但是 RSSI 值会有不同
          'interval': num, //  上报设备的间隔 
            // 默认为0,意思是找到新设备立即上报,否则根据传入的间隔上报
          success: function(res){
            // res.errMsg         成功：ok,错误：详细信息 
            // res.isDiscovering  当前蓝牙适配器是否处于搜索状态 
          },
          fail: function(){ },
          complete: function(){ },
        }
        Example：
        // 以微信硬件平台的蓝牙智能灯为例,主服务的 UUID 是 FEE7。传入这个参数,只搜索主服务 UUID 为 FEE7 的设备
        wx.startBluetoothDevicesDiscovery({
          services: ['FEE7'],
          success: function (res) {
            console.log(res)
          }
        })
      wx.stopBluetoothDevicesDiscovery({}) 停止搜寻附近的蓝牙外围设备 '1.1.0+' 
        PS: 请在确保找到需要连接的设备后调用该方法停止搜索。
        {
          success: function(res){
          },
          fail: function(){ },
          complete: function(){ },
        }
      wx.getBluetoothDevices({}) 获取所有已发现的蓝牙设备,包括已经和本机处于连接状态的设备 '1.1.0+'
        {
          success: function(res){
            // res.devices  Array  uuid 对应的的已连接设备列表
              // device.name       string  蓝牙设备名称,某些设备可能没有
              // device.localName  string  低功耗设备广播名称,某些设备可能没有
              // device.deviceId   string  用于区分设备的 id
              // device.RSSI       int  当前蓝牙设备的信号强度
              // device.advertisData  ArrayBuffer  当前蓝牙设备的广播内容
                // 注意：vConsole 无法打印出 ArrayBuffer 类型数据 
            // res.errMsg  string  成功：ok,错误：详细信息
          },
          fail: function(){ },
          complete: function(){ },
        }
      wx.onBluetoothDeviceFound(f(res)) 监听寻找到新设备的事件 '1.1.0+'
        res.devices   新搜索到的设备列表
          device.deviceId  string  蓝牙设备 id,参考 device 对象
          device.name      string  蓝牙设备名称,参考 device 对象
          device.localName string  低功耗设备广播名称,某些设备可能没有
          device.RSSI      int 当前蓝牙设备的信号强度
          device.advertisData  ArrayBuffer 当前蓝牙设备的广播内容
            注意：vConsole 无法打印出 ArrayBuffer 类型数据 
      wx.getConnectedBluetoothDevices({})  根据uuid获取处于已连接状态的设备 '1.1.0+'
        {
          'services': arr, // 蓝牙设备主 service 的 uuid 列表
          success: function(res){
            // res.devices  Array  搜索到的设备列表
              // device对象 蓝牙设备信息
              // device.name  string  蓝牙设备名称,某些设备可能没有
              // device.deviceId  string  用于区分设备的 id
            // res.errMsg   string 成功：ok,错误：详细信息
          },
          fail: function(){ },
          complete: function(){ },
        }
    ★低功耗蓝牙接口 
      wx.createBLEConnection({})  连接低功耗蓝牙设备 '1.1.0+'
        PS: 安卓手机上如果多次调用create创建连接,有可能导致系统持有同一设备多个连接的实例,
          导致调用close的时候并不能真正的断开与设备的连接。因此请保证尽量成对的调用create和close接口
        {
          'deviceId': '', // 蓝牙设备 id,参考 getDevices 接口
          success: function(res){
            res.errMsg  //  成功：ok,错误：详细信息
          },
          fail: function(){ },
          complete: function(){ },
        }
        Example:
        wx.createBLEConnection({
          // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
          deviceId: deviceId,
          success: function (res) {
            console.log(res)
          }
        })
      wx.closeBLEConnection({}) 断开与低功耗蓝牙设备的连接 '1.1.0+' 
        {
          'deviceId': '', // 蓝牙设备 id,参考 getDevices 接口
          success: function(res){
            res.errMsg  // 成功：ok,错误：详细信息
          },
          fail: function(){ },
          complete: function(){ },
        }
      wx.getBLEDeviceServices({}) 获取蓝牙设备所有 service（服务） '1.1.0+' 
        {
          'deviceId': '', //  蓝牙设备 id,参考 getDevices 接口
          success: function(res){
            // res.services  array  设备服务列表
              // service对象 蓝牙设备service(服务)信息
              // service.uuid  string  蓝牙设备服务的 uuid
              // service.isPrimary  boolean  该服务是否为主服务
            // res.errMsg  string  成功：ok,错误：详细信息
          },
          fail: function(){ },
          complete: function(){ },
        }
      wx.getBLEDeviceCharacteristics({}) 获取蓝牙设备所有characteristic（特征值）'1.1.0'
        {
          'deviceId': '', // 蓝牙设备 id,参考 device 对象
          'serviceId': '', // str,蓝牙服务 uuid
          success: function(res){
            // res.characteristics  array  设备特征值列表
              // characteristic对象 蓝牙设备characteristic(特征值)信息
              // characteristic.uuid  string  蓝牙设备特征值的 uuid
              // characteristic.properties  object  该特征值支持的操作类型
              // characteristic.properties.read     boolean  该特征值是否支持 read 操作
              // characteristic.properties.write    boolean  该特征值是否支持 write 操作
              // characteristic.properties.notify   boolean  该特征值是否支持 notify 操作
              // characteristic.properties.indicate boolean  该特征值是否支持 indicate 操作
            // res.errMsg  string  成功：ok,错误：详细信息
          },
          fail: function(){ },
          complete: function(){ },
        }
      wx.readBLECharacteristicValue({}) 读取低功耗蓝牙设备的特征值的二进制数据值 '1.1.0'
        PS: 必须设备的特征值支持read才可以成功调用,具体参照 characteristic 的 properties 属性
          并行调用多次读写接口存在读写失败的可能性。
          read接口读取到的信息需要在onBLECharacteristicValueChange方法注册的回调中获取。
        {
          'deviceId': '', //  蓝牙设备 id,参考 device 对象
          'serviceId': '', //  蓝牙特征值对应服务的 uuid
          'characteristicId': '', //  蓝牙特征值的 uuid
          success: function(res){
            // res.characteristic obj,设备特征值信息.蓝牙设备characteristic(特征值)信息
              // characteristic.characteristicId  str,蓝牙设备特征值的 uuid
              // characteristic.serviceId         obj.蓝牙设备特征值对应服务的 uuid
              // characteristic.value      ArrayBuffer,蓝牙设备特征值对应的二进制值 
                // 注意：vConsole 无法打印出 ArrayBuffer 类型数据 
            // res.errMsg         str,成功：ok,错误：详细信息 
          },
          fail: function(){ },
          complete: function(){ },
        }
      wx.writeBLECharacteristicValue({}) 向低功耗蓝牙设备特征值中写入二进制数据 '1.1.0'
        PS: 必须设备的特征值支持write才可以成功调用,具体参照 characteristic 的 properties 属性
          并行调用多次读写接口存在读写失败的可能性
        {
          'deviceId': '',         //  蓝牙设备 id,参考 device 对象
          'serviceId': '',        //  蓝牙特征值对应服务的 uuid
          'characteristicId': '', // 蓝牙特征值的 uuid
          'value': ArrayBuffer,   // 蓝牙设备特征值对应的二进制值
          cfoo,
        }
      wx.notifyBLECharacteristicValueChange({})启用特征值变化时的'notify'功能 '1.1.1'
        PS: 必须设备的特征值支持notify才可以成功调用,具体参照 characteristic 的 properties 属性
          必须先启用notify才能监听到设备 characteristicValueChange 事件
        {
          deviceId  string  是  蓝牙设备 id,参考 device 对象
          serviceId  string  是  蓝牙特征值对应服务的 uuid
          characteristicId  string  是  蓝牙特征值的 uuid
          state  boolean  是  true: 启用 notify; false: 停用 notify
          cfoo,
        }
      wx.onBLEConnectionStateChange(f(res)) 监听低功耗蓝牙连接的错误事件 '1.1.1'
        PS: 包括设备丢失,连接异常断开等等 
        res.deviceId  string  蓝牙设备 id,参考 device 对象
        res.connected  boolean  连接目前的状态
      wx.onBLECharacteristicValueChange(f(res)) 监听低功耗蓝牙设备的特征值变化 '1.1.0'
        PS: 必须先启用notify接口才能接收到设备推送的notification。
        res.deviceId  string  蓝牙设备 id,参考 device 对象
        res.serviceId  string  特征值所属服务 uuid
        res.characteristicId  string  特征值 uuid
        res.value  ArrayBuffer  特征值最新的值（注意：vConsole 无法打印出 ArrayBuffer 类型数据）
    'errCode'蓝牙错误码列表
      错误码  说明                 备注
      0      ok                   正常
      10000  not init             未初始化蓝牙适配器
      10001  not available        当前蓝牙适配器不可用
      10002  no device            没有找到指定设备
      10003  connection fail      连接失败
      10004  no service           没有找到指定服务
      10005  no characteristic    没有找到指定特征值
      10006  no connection        当前连接已断开
      10007  property not support 当前特征值不支持此操作
      10008  system error         其余所有系统上报的异常
      10009  system not support   Android 系统特有,系统版本低于 4.3 不支持BLE
      10010  no descriptor        没有找到指定描述符
      10011  location not turned  Android6.0 以上系统因未打开定位导致搜寻蓝牙设备（startBluetoothDevicesDiscovery ）失败    
    ◆iBeacon 
    开始搜索附近的iBeacon设备  '1.2.0'
    wx.startBeaconDiscovery({  
      'uuids': strArray, // iBeacon设备广播的 uuids
      success: function(res){
        // res.errMsg str,调用结果
      },
      fail: function(){ },
      complete: function(){ },
    })
    停止搜索附近的iBeacon设备 '1.2.0'
    wx.stopBeaconDiscovery({
      success: function(res){
        // res.errMsg  str,调用结果
      },
      fail: function(){ },
      complete: function(){ },
    })
    获取所有已搜索到的iBeacon设备 '1.2.0'
    wx.getBeacons({
      success: function(res){
        // res.beacons  objArr,iBeacon设备列表
          // iBeacon.uuid      str,iBeacon设备广播的uuid
          // iBeacon.major     str,iBeacon设备的主id
          // iBeacon.minor     str,iBeacon设备的次 id
          // iBeacon.proximity num,表示设备距离的枚举值
          // iBeacon.accuracy  num,iBeacon设备的距离
          // iBeacon.rssi      num,表示设备的信号强度
        // res.errMsg   str,调用结果
      },
      fail: function(){ },
      complete: function(){ },
    })
    监听iBeacon设备的更新事件 '1.2.0'
    wx.onBeaconUpdate({
      'beacons':[ // 当前搜寻到的所有iBeacon设备列表
        {
          'uuid':'',  // str,iBeacon设备广播的uuid
          'major':'', // str,iBeacon设备的主id
          'minor':'', // str,iBeacon设备的次id
          'proximity':'', // num,表示设备距离的枚举值
          'accuracy':'',  // num,iBeacon 设备的距离
          'rssi':'',      // num,表示设备的信号强度
        },
        ...
      ] 
    })
    监听 iBeacon 服务的状态变化 '1.2.0'
    wx.onBeaconServiceChange(f(res))
      res = {
        'available': bol,   // 服务目前是否可用
        'discovering': bol, // 目前是否处于搜索状态
      }
    错误码列表
      0     ok                            正常
      11000 unsupport                     系统或设备不支持
      11001 bluetooth service unavailable 蓝牙服务不可用
      11002 location service unavailable  位置服务不可用
      11003 already start                 已经开始搜索    
    ◆屏幕亮度 
    设置屏幕亮度 '1.2.0+'
    wx.setScreenBrightness({
      value: '', // num,屏幕亮度值,范围 0~1,0 最暗,1 最亮
      cfoo,
    })   
    获取屏幕亮度 '1.2.0+'
      PS: 若安卓系统设置中开启了自动调节亮度功能,则屏幕亮度会根据光线自动调整,
        该接口仅能获取自动调节亮度之前的值,而非实时的亮度值。  
    wx.getScreenBrightness({
      success: function(res){
        // res.value  num,屏幕亮度值,范围 0~1,0 最暗,1 最亮
      },
      fail: function(){ },
      complete: function(){ },
    })   
    ◆用户截屏事件 
    监听用户主动截屏事件,用户使用系统截屏按键截屏时触发此事件 '1.4.0'
    wx.onUserCaptureScreen(foo)
    ◆震动 
    使手机发生较长时间的振动'400ms'  '1.2.0'
    wx.vibrateLong({
      cfoo,
    })   
    使手机发生较短时间的振动'15ms'  '1.2.0'
      PS: 仅在 iPhone7/iPhone7Plus 及 Android 机型生效
    wx.vibrateShort({
      cfoo,
    })  
    ◆手机联系人 
    调用后,用户可以选择将该表单以“新增联系人”或“添加到已有联系人”的方式,
    写入手机系统通讯录,完成手机通讯录联系人和联系方式的增加。 '1.2.0'
    wx.addPhoneContact({
      'firstName': "",   // str,名字,必选 
      'mobilePhoneNumber': "", // str,手机号
      'photoFilePath': "",     // str,头像本地文件路径
      'nickName': "",          // str,昵称
      'lastName': "",          // str,姓氏
      'middleName': "",        // str,中间名
      'remark': "",            // str,备注
      'weChatNumber': "",      // str,微信号
      'addressCountry': "",    // str,联系地址国家
      'addressState': "",      // str,联系地址省份
      'addressCity': "",       // str,联系地址城市
      'addressStreet': "",     // str,联系地址街道
      'addressPostalCode': "", // str,联系地址邮政编码
      'organization': "",      // str,公司
      'title': "",             // str,职位
      'workFaxNumber': "",     // str,工作传真
      'workPhoneNumber': "",   // str,工作电话
      'hostNumber': "",        // str,公司电话
      'email': "",             // str,电子邮件
      'url': "",               // str,网站
      'workAddressCountry': "", // str,工作地址国家
      'workAddressState': "",  // str,工作地址省份
      'workAddressCity': "",   // str,工作地址城市
      'workAddressStreet': "", // str,工作地址街道
      'workAddressPostalCode': "", // str,工作地址邮政编码
      'homeFaxNumber': "",     // str,住宅传真
      'homePhoneNumber': "",   // str,住宅电话
      'homeAddressCountry': "", // str,住宅地址国家
      'homeAddressState': "",  // str,住宅地址省份
      'homeAddressCity': "",   // str,住宅地址城市
      'homeAddressStreet': "", // str,住宅地址街道
      'homeAddressPostalCode': "", // str,住宅地址邮政编码
      success: function(res){
        // res.errMsg  
          // success ok             添加成功
          // fail    fail cancel    用户取消操作
          // fail    fail ${detail} 调用失败,detail 加上详细信息    
      },
      fail: function(){ },
      complete: function(){ },
    })
  界面 
    ◆交互反馈  
    'showLoading'和'showToast'同时只能显示一个,使用'hideLoading'/'hideToast'都可以关闭提示框 
    显示loading提示框, 需主动调用wx.hideLoading()才能关闭提示框  '1.1.0'
    wx.showLoading({
      'title': str, // 必选,提示的内容
      'mask': bol,  // 是否显示透明蒙层,防止触摸穿透,默认false
      cfoo,
    })
    隐藏loading提示框 '1.1.0'
    wx.hideLoading()
    显示消息提示框 
    wx.showToast({
      'title': '' ,   //提示的内容,必选   
      'icon': 'success', //  图标,有效值 "success", "loading"  
      'image': './',     // 自定义图标的本地路径,优先级高于'icon'  ['1.1.0+']
      'duration': 1500,  // 提示的延迟时间,单位毫秒,默认：1500  
      'mask': false,     // 是否显示透明蒙层,防止触摸穿透,默认：false  
      cfoo,
    }) 
    隐藏消息提示框
    wx.hideToast()
    ​显示模态弹窗 
      Android'6.3.30',返回的'confirm'一直为'true' 
      iOS点击蒙层不会关闭模态弹窗,所以尽量避免使用“取消”分支中实现业务逻辑   
    wx.showModal({
      'title': str,   // 必选,提示的标题
      'content': str, // 必选,提示的内容
      'showCancel': bol,     // 是否显示取消按钮,默认为 true
      'cancelText': str,     // 取消按钮的文字,默认为"取消",最多 4 个字符
      'cancelColor': "#ccc", // 取消按钮的文字颜色,默认为"#000000"
      'confirmText': str,    // 确定按钮的文字,默认为"确定",最多 4 个字符
      'confirmColor': "#fff",// 确定按钮的文字颜色,默认为"#3CC51F"
      success: function(res){
        // res.confirm bol,用户是否点击了确定按钮 
        // res.cancel  bol,用户是否点击了取消
          // 用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭 '1.1.0'
      },
      fail: function(){ },
      complete: function(){ },
    })
    ​显示操作菜单
      PS: 点击取消或蒙层时,回调 fail, errMsg 为 "showActionSheet:fail cancel"；
    wx.showActionSheet({
      'itemList': strArr, // 必选,按钮的文字数组,数组长度最大为6个
      'itemColor': '#ccc',  // 按钮的文字颜色,默认为"#000000"
      success: function(res){
        // res.tapIndex num,用户点击的按钮,从上到下的顺序,从0开始
      },
      fail: function(){ },
      complete: function(){ },
    })
    ◆设置导航条 
    动态设置当前页面的标题
    wx.setNavigationBarTitle({
      'title': str, // 必选,页面标题
      cfoo,
    })
    在当前页面显示导航条加载动画 
    wx.showNavigationBarLoading()
    隐藏导航条加载动画 
    wx.hideNavigationBarLoading() 
    设置导航条颜色 '1.4.0'
    wx.setNavigationBarColor({
      'frontColor': str, // 必选,前景颜色值,包括按钮、标题、状态栏的颜色,仅支持 #ffffff 和 #000000
      'backgroundColor': // 必选,背景颜色值,有效值为十六进制颜色
      'animation': {     // 动画效果
        'duration': num, // 动画变化时间,默认0,单位：毫秒
        'timingFunc': 'linear', // 动画变化方式,  
          // 'linear'    动画从头到尾的速度是相同的,默认值   
          // 'easeIn'    动画以低速开 
          // 'easeOut'   动画以低速结束 
          // 'easeInOut' 动画以低速开始和结束 
      },     
      cfoo,
    })
    ◆设置置顶信息 
    动态设置置顶栏文字内容 '1.4.3'
      只有当前小程序被置顶时能生效,如果当前小程序没有被置顶,也能调用成功,
      但是不会立即生效,只有在用户将这个小程序置顶后才换上设置的文字内容。
      注意：调用成功后,需间隔 5s 才能再次调用此接口,
      如果在 5s 内再次调用此接口,会回调 fail,errMsg："setTopBarText: fail invoke too frequently"
    wx.setTopBarText({
      'text': str, // 置顶栏文字内容
      cfoo,
    })
    ◆导航 
    保留当前页面,跳转到应用内的某个页面  
      使用wx.navigateBack()可以返回到原页面 
      为了不让用户在使用小程序时造成困扰,规定页面路径只能是五层,请尽量避免多层级的交互方式 
      以查询字符串的形式进行页面间的传递数据 
        wx:navigateTo({
          url:"../logs/logs?id=10"
        })
        然后通过B中 onLoad(options) 中取出
    wx.navigateTo({
      'url': str, // 需要跳转的非tabBar的页面的路径,路径后可以带参数  
      cfoo,
    })
    关闭当前页面,跳转到应用内的某个页面 
    wx.redirectTo({
      'url': str, // 需跳转的非tabBar的页面的路径
      cfoo,
    })
    跳转到tabBar页面,并关闭其他所有非tabBar页面 
    wx.switchTab({
      'url': str, // 需跳转的tabBar页面的路径,路径后不能带参数
    })
    关闭所有页面,打开到应用内的某个页面[可打开任意页]  '1.1.0'
    wx.reLaunch({
      'url': str, // 需要跳转的应用内页面路径,如果跳转的页面路径是tabBar页面则不能带参数 
      cfoo,
    })
    关闭当前页面,返回上一页面或多级页面 
      可通过 getCurrentPages()) 获取当前的页面栈,决定需要返回几层。
    wx.navigateBack({
      'delta': num, // 返回的页面数,如果 delta 大于现有页面数,则返回到首页,默认为'1'
    })
    ◆动画 
    创建一个动画实例animation 
      调用实例的方法来描述动画。最后通过动画实例的'export'方法导出动画数据传递给组件的animation属性。
      'export'方法每次调用后会清掉之前的动画操作
    var animation = wx.createAnimation({
      'duration': num, // 动画持续时间,单位ms,默认'400'
      'timingFunction': 'linear', // 定义动画的效果
        // 'linear' 动画从头到尾的速度是相同的,默认值 
        // 'ease'        动画以低速开始,然后加快,在结束前变慢
        // 'ease-in'     动画以低速开始
        // 'ease-in-out' 动画以低速开始和结束
        // 'ease-out'    动画以低速结束
        // 'step-start'  动画第一帧就跳至结束状态直到结束
        // 'step-end'    动画一直保持开始状态,最后一帧跳到结束状态
      'delay': num, // 动画延迟时间,单位 ms,默认'0' 
      'transformOrigin': str, // 设置transform-origin,默认"50% 50% 0" 
    })
    animation 动画实例可以调用以下方法来描述动画,调用结束后会返回自身,支持链式调用的写法 
      ★样式
      animation.opacity(num)  // 透明度,参数范围 0~1
      animation.backgroundColor(str) // 颜色值
      animation.width(num/str)  // 长度值,如果传入num则默认使用px,可传入其他自定义单位的长度值
      animation.height(num/str) // 长度值,如果传入num则默认使用px,可传入其他自定义单位的长度值
      animation.top(num/str)    // 长度值,如果传入num则默认使用px,可传入其他自定义单位的长度值
      animation.left(num/str)   // 长度值,如果传入num则默认使用px,可传入其他自定义单位的长度值
      animation.bottom(num/str) // 长度值,如果传入num则默认使用px,可传入其他自定义单位的长度值
      animation.right(num/str)  // 长度值,如果传入num则默认使用px,可传入其他自定义单位的长度值
      ★旋转
      animation.rotate(XXdeg)  // 范围-180~180,从原点顺时针旋转一个deg角度
      animation.rotateX(XXdeg) // 范围-180~180,在X轴旋转一个deg角度
      animation.rotateY(XXdeg) // 范围-180~180,在Y轴旋转一个deg角度
      animation.rotateZ(XXdeg) // 范围-180~180,在Z轴旋转一个deg角度
      animation.rotate3d(x,y,z,XXdeg) // 同transform-function rotate3d
      ★缩放 
      animation.scale(x[,y]) // 一参数表示X轴、Y轴同时缩放x倍；两参数表示X轴缩放x倍,Y轴缩放y倍 
      animation.scaleX(num)  // 在X轴缩放sx倍数
      animation.scaleY(num)  // 在Y轴缩放sy倍数
      animation.scaleZ(num)  // 在Z轴缩放sy倍数
      animation.scale3d(x,y,z) // 在X轴缩放sx倍数,在Y轴缩放sy倍数,在Z轴缩放sz倍数
      ★偏移
      animation.translate(x[,y]) // 一参数表示在X轴偏移x,两参数表示在X轴偏移x,Y轴偏移y,单位px 
      animation.translateX(num)  // 在X轴偏移num,单位px
      animation.translateY(num)  // 在Y轴偏移num,单位px
      animation.translateZ(num)  // 在Z轴偏移num,单位px
      animation.translate3d(x,y,z) // 在X轴偏移x,在Y轴偏移y,在Z轴偏移z,单位px
      ★倾斜 
      animation.skew(x,[y])  
        // 一参数,Y轴坐标不变,X轴坐标延顺时针倾斜x度；两个参数时,分别在X轴倾斜x度,在Y轴倾斜y度
        // 参数范围-180~180；
      animation.skewX(num) // 参数范围-180~180；Y轴坐标不变,X轴坐标延顺时针倾斜num度
      animation.skewY(num) // 参数范围-180~180；X轴坐标不变,Y轴坐标延顺时针倾斜num度
      ★矩阵变形：
      animation.matrix(a,b,c,d,tx,ty) // 同transform-function matrix
      animation.matrix3d()  // 同transform-function matrix3d
    动画队列 
      调用动画操作方法后要调用.step()来表示一组动画完成,可以在一组动画中调用任意多个动画方法,
      一组动画中的所有动画会同时开始,一组动画完成后才会进行下一组动画。
      .step()可以传入一个跟wx.createAnimation()一样的配置参数用于指定当前组动画的配置 
      iOS/Android'6.3.30'通过.step()分隔动画,只有第一步动画能生效 ;
      Example: 
      <view animation="{{animationData}}" style="background:red;height:100rpx;width:100rpx"></view>
      Page({
        data: {
          animationData: {}
        },
        onShow: function(){
          var animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease',
          })
          
          this.animation = animation
          
          animation.scale(2,2).rotate(45).step()
          
          this.setData({
            animationData:animation.export()
          })
          
          setTimeout(function() {
            animation.translate(30).step()
            this.setData({
              animationData:animation.export()
            })
          }.bind(this), 1000)
        },
        rotateAndScale: function () {
          // 旋转同时放大
          this.animation.rotate(45).scale(2, 2).step()
          this.setData({
            animationData: this.animation.export()
          })
        },
        rotateThenScale: function () {
          // 先旋转后放大
          this.animation.rotate(45).step()
          this.animation.scale(2, 2).step()
          this.setData({
            animationData: this.animation.export()
          })
        },
        rotateAndScaleThenTranslate: function () {
          // 先旋转同时放大,然后平移
          this.animation.rotate(45).scale(2, 2).step()
          this.animation.translate(100, 100).step({ duration: 1000 })
          this.setData({
            animationData: this.animation.export()
          })
        }
      })
    ◆位置 
    将页面滚动到目标位置 '1.4.0'
    wx.pageScrollTo({
      'scrollTop': num, // 滚动到页面的目标位置,单位px 
    })
    ◆绘图 
    ◆下拉刷新 
    开始下拉刷新,调用后触发下拉刷新动画,效果与用户手动下拉刷新一致 '1.5.0'
    wx.startPullDownRefresh({
      cfoo,
    })
    停止当前页面下拉刷新 
    wx.stopPullDownRefresh()
  WXML节点信息 
    返回一个'SelectorQuery'对象实例 '1.4.0'
    var sq = wx.createSelectorQuery()
    'selectorQuery'对象的方法 
      匹配第一个对应节点,返回一NodesRef对象实例,可以用于获取节点信息 
      var nr = sq.select(selector)    
      匹配所有对应节点,返回一个NodesRef对象实例
      var nr = sq.selectAll(selector) 
      选择显示区域,用于获取显示区域的尺寸、滚动位置等信息,返回一个NodesRef对象实例
      var nr = sq.selectViewport()   
      执行所有的请求,请求结果按请求次序构成数组,在callback的第一个参数中返回  
      sq.exec([foo])        
    selector类似于CSS的选择器,但仅支持下列语法 
      ID选择器：                    #the-id
      class选择器,可以连续指定多个： .a-class.another-class
      子元素选择器：                .the-parent > #the-child.a-class
      多选择器的并集：              #a-node, .some-other-nodes
    'NodesRef'
      添加节点的布局位置的查询请求,相对于显示区域,以像素为单位。
        其功能类似于DOM的'getBoundingClientRect'。返回值是nodesRef对应的selectorQuery。
        返回的节点信息中,每个节点的位置用left、right、top、bottom、width、height字段描述。
        如果提供了callback回调函数,在执行selectQuery的exec方法后,节点信息会在callback中返回。
      nr.boundingClientRect([f(rect)]) 
        rect.id      // 节点的ID
        rect.dataset // 节点的dataset
        rect.left    // 节点的左边界坐标
        rect.right   // 节点的右边界坐标
        rect.top     // 节点的上边界坐标
        rect.bottom  // 节点的下边界坐标
        rect.width   // 节点的宽度
        rect.height  // 节点的高度
      添加节点的滚动位置查询请求,以像素为单位。
        节点必须是scroll-view或者viewport。返回值是nodesRef对应的selectorQuery。
        返回的节点信息中,每个节点的滚动位置用scrollLeft、scrollHeight字段描述。
        如果提供了callback回调函数,在执行selectQuery的exec方法后,节点信息会在callback中返回。
      nr.scrollOffset([f(res)])
        res.id      // 节点的ID
        res.dataset // 节点的dataset
        res.scrollLeft // 节点的水平滚动位置
        res.scrollTop  // 节点的竖直滚动位置
      获取节点的相关信息,需要获取的字段在fields中指定。返回值是nodesRef对应的selectorQuery。
      nr.fields(fields,[f(res)])
        fields = {
          'id': bol,      // 是否返回节点id
          'dataset': bol, // 是否返回节点dataset
          'rect': bol,    // 是否返回节点布局位置（left right top bottom）
          'size': bol,    // 是否返回节点尺寸（width height）
          'scrollOffset': bol, // 是否返回节点的 scrollLeft scrollTop 
            // 节点必须是scroll-view或者viewport
          'properties': ['scrollX', 'scrollY'], // 指定属性名列表,返回节点对应属性名的当前属性值
            // 只能获得组件文档中标注的常规属性值, id class style 和事件绑定的属性值不可获取 
        }
        res.dataset    // 节点的dataset
        res.width      // 节点的宽度
        res.height     // 节点的高度
        res.scrollLeft // 节点的水平滚动位置
        res.scrollTop  // 节点的竖直滚动位置
        res.scrollX    // 节点 scroll-x 属性的当前值
        res.scrollY    // 节点 scroll-x 属性的当前值
  第三方平台 
    获取第三方平台自定义的数据字段 '1.1.0'
      wx.getExtConfig 暂时无法通过 wx.canIUse 判断是否兼容,
      开发者需要自行判断 wx.getExtConfig 是否存在来兼容
    wx.getExtConfig({
      success: function(res){
        // res.errMsg String 调用结果
        // res.extConfig Object 第三方平台自定义的数据
      },
      fail: function(){ },
      complete: function(){ },
    })
    获取第三方平台自定义的数据字段的同步接口 '1.1.0'
      wx.getExtConfigSync 暂时无法通过 wx.canIUse 判断是否兼容,
      开发者需要自行判断 wx.getExtConfigSync 是否存在来兼容
    var extConfig = wx.getExtConfigSync()
      extConfig obj,第三方平台自定义的数据
  开放接口 
    'UnionID'机制说明 
      如果开发者拥有多个移动应用、网站应用、和公众帐号（包括小程序）,
      可通过unionid来区分用户的唯一性,
      因为只要是同一个微信开放平台帐号下的移动应用、网站应用和公众帐号（包括小程序）,
      用户的unionid是唯一的。
      换句话说,同一用户,对同一个微信开放平台下的不同应用,unionid是相同的。
      同一个微信开放平台下的相同主体的App、公众号、小程序,
      如果用户已经关注公众号,或者曾经登录过App或公众号,
      则用户打开小程序时,开发者可以直接通过wx.login()获取到该用户UnionID,无须用户再次授权。
    ◆登录 
      用户登录态拥有一定的时效性。用户越久未使用小程序,用户登录态越有可能失效。
      反之如果用户一直在使用小程序,则用户登录态一直保持有效。
      具体时效逻辑由微信维护,对开发者透明。
      开发者只需要调用wx.checkSession()接口检测当前用户登录态是否有效。
      登录态过期后开发者可以再调用wx.login()获取新的用户登录态。
    调用接口获取登录凭证'code' 
      进而换取用户登录态信息,包括用户的唯一标识'openid' 及本次登录的会话密钥'session_key'。
      用户数据的加解密通讯需要依赖会话密钥完成。
    wx.login({
      success: function(res){
        // res.errMsg String 调用结果
        // res.code String 用户允许登录后,回调内容会带上 code（有效期五分钟）,
          // 需将res.code发送到后台,换取 openId, sessionKey, unionId
      },
      fail: function(){ },
      complete: function(){ },
    })
    检测当前用户登录态是否有效 
    wx.checkSession({
      success: function(){
        //session 未过期,并且在本生命周期一直有效
      },
      fail: function(){
        //登录态过期
        wx.login() //重新登录
        ....
      },
      complete: function(){
      },
    })
    ◆授权 
    向用户发起授权 '1.2.0'
      部分接口需要获得同意后才能调用,如果用户未授权过,会弹窗询问用户,用户点击同意后方可调用接口。
      如果用户点了拒绝,则短期内调用不会出现弹窗,而是直接进入 fail 回调。
      用户可以在小程序设置界面中修改对该小程序的授权信息。
      本接口用于提前向用户发起授权,调用后会立刻弹窗询问用户是否同意小程序使用某项功能或获取用户的某些数据,
      但不会实际调用接口。如果用户之前已经同意,则不会出现弹窗,直接返回成功。
    wx.authorize({
      'scope': str, // 需要获取权限的scope 
        // 'scope.userInfo'          用户信息
          // 对应接口: wx.getUserInfo 
        // 'scope.userLocation'      地理位置
          // 对应接口: wx.getLocation, wx.chooseLocation 
        // 'scope.address'           通讯地址
          // 对应接口: wx.chooseAddress 
        // 'scope.record'            录音功能
          // 对应接口: wx.startRecord 
        // 'scope.writePhotosAlbum' 保存到相册    
          // 对应接口: wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum 
      cfoo,
    })
    ◆用户信息 
    获取用户信息 
      当 withCredentials 为 true 时,要求此前有调用过 wx.login 且登录态尚未过期,
      此时返回的数据会包含 encryptedData, iv 等敏感信息；
      当 withCredentials 为 false 时,不要求有登录态,
      返回的数据不包含 encryptedData, iv 等敏感信息。
    wx.getUserInfo({
      'withCredentials': bol, // 是否带上登录态信息,默认'false' '1.1.0'
      'lang': 'en',           // 指定返回用户信息的语言  '1.4.0'
        // 'en'    英文,默认值 
        // 'zh_CN' 简体中文
        // 'zh_TW' 繁体中文
      success: function(res){
        // res.userInfo   用户信息对象,不包含openid等敏感信息
          // res.userInfo.nickName
          // res.userInfo.avatarUrl
          // res.userInfo.gender       性别 0：未知、1：男、2：女
          // res.userInfo.province
          // res.userInfo.city
          // res.userInfo.country
        // res.rawData    不包括敏感信息的原始数据字符串,用于计算签名。
        // res.signature      使用sha1(rawData+sessionkey)得到字符串,用于校验用户信息
        // res.encryptedData  包括敏感数据在内的完整用户信息的加密数据, 解密后为json结构 
        // res.iv             加密算法的初始向量
      },
      fail: function(){ },
      complete: function(){ },
    })
    发起微信支付 
      '6.5.2'及之前版本中,用户取消支付不会触发 fail 回调,只会触发 complete 回调,
      回调 errMsg 为 'requestPayment:cancel'
    wx.requestPayment({
      'timeStamp': str,  // 必选, 时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间
      'nonceStr': str,   // 必选, 随机字符串,长度为32个字符以下。
      'package': str,    // 必选, 统一下单接口返回的 prepay_id 参数值,提交格式如：prepay_id=*
      'signType': str,   // 必选, 签名算法,暂支持 MD5
      'paySign': str,    // 必选, 签名,具体签名方案参见小程序支付接口文档;
      cfoo,
    })
    模版消息 
      微信'6.5.2'及以上版本支持模板功能。低于该版本将无法收到模板消息。    
      基于微信的通知渠道,为开发者提供了可高效触达用户的模板消息能力,以实现服务的闭环并提供更佳的体验
      模板推送位置：服务通知
      模板下发条件：用户本人在微信体系内与页面有交互行为后触发,详见下发条件说明
      模板跳转能力：点击查看详情仅能跳转下发模板的该帐号的各个页面
      使用说明 
        步骤一：获取模板ID
          有两个方法可以获取模版ID
          通过模版消息管理接口获取模版ID（详见模版消息管理）
          在微信公众平台手动配置获取模版ID
        步骤二：页面的 <form/> 组件,属性report-submit为true时,可以声明为需发模板消息,
          此时点击按钮提交表单可以获取formId,用于发送模板消息。
          或者当用户完成支付行为,可以获取prepay_id用于发送模板消息。
        步骤三：调用接口下发模板消息（详见发送模版消息）
      模版消息管理
        1. 获取小程序模板库标题列表 
          接口地址
          https://api.weixin.qq.com/cgi-bin/wxopen/template/library/list?access_token=ACCESS_TOKEN
          HTTP请求方式： POST
          请求参数说明：
          参数        必选   说明
          access_token 是  接口调用凭证
          offset       是  offset和count用于分页,表示从offset开始,拉取count条记录
            offset从0开始,count最大为20。
          count        是  offset和count用于分页,表示从offset开始,拉取count条记录
            offset从0开始,count最大为20。
          返回数据说明：
          在调用模板消息接口后,会返回JSON数据 
          {
            "errcode":0,
            "errmsg":"ok",
            "list":[
              {"id":"AT0002","title":"购买成功通知"},
              {"id":"AT0003","title":"购买失败通知"},
              {"id":"AT0004","title":"交易提醒"},
              {"id":"AT0005","title":"付款成功通知"},
              {"id":"AT0006","title":"付款失败通知"}
              // id    模板标题id（获取模板标题下的关键词库时需要）
              // title 模板标题内容
            ],
            "total_count":599 
            // total_count 模板库标题总数
          }
        2. 获取模板库某个模板标题下关键词库 
          接口地址
          https://api.weixin.qq.com/cgi-bin/wxopen/template/library/get?access_token=ACCESS_TOKEN
          HTTP请求方式： POST
          参数 必选 说明
          access_token 是 接口调用凭证
          POST参数说明：
          id 是 模板标题id,可通过接口获取,也可登录小程序后台查看获取
          返回码说明： 在调用模板消息接口后,会返回JSON数据包。
          {
            "errcode": 0,
            "errmsg": "ok",
            "id": "AT0002",
            "title": "购买成功通知",
            "keyword_list": [
              {
                "keyword_id": 3, // 关键词id,添加模板时需要
                "name": "购买地点", // 关键词内容
                "example": "TIT造舰厂" // 关键词内容对应的示例
              },
              {
                "keyword_id": 4,
                "name": "购买时间",
                "example": "2016年6月6日"
              },
              {
                "keyword_id": 5,
                "name": "物品名称",
                "example": "咖啡"
              }
            ]
          }
        3. 组合模板并添加至帐号下的个人模板库 
          接口地址 https://api.weixin.qq.com/cgi-bin/wxopen/template/add?access_token=ACCESS_TOKEN
          HTTP请求方式： POST
          POST参数说明：
          access_token    必选,接口调用凭证
          id              必选,模板标题id,可通过接口获取,也可登录小程序后台查看获取
          keyword_id_list 必选,开发者自行组合好的模板关键词列表,关键词顺序可以自由搭配
            例如[3,5,4]或[4,5,3],最多支持10个关键词组合 
          返回码说明： 在调用模板消息接口后,会返回JSON数据包。
          {
            "errcode": 0,
            "errmsg": "ok",
            "template_id": "wDYzYZVxobJivW9oMpSCpuvACOfJXQIoKUm0PY397Tc"
            // 添加至帐号下的模板id,发送小程序模板消息时所需
          }
        4. 获取帐号下已存在的模板列表
          接口地址       
          https://api.weixin.qq.com/cgi-bin/wxopen/template/list?access_token=ACCESS_TOKEN
          HTTP请求方式： POST
          POST参数说明：
          access_token 必选,接口调用凭证
          offset       必选,offset和count用于分页,表示从offset开始,拉取count条记录,
            offset从0开始,count最大为20。最后一页的list长度可能小于请求的count
          count        必选,offset和count用于分页,表示从offset开始,拉取count条记录,
            offset从0开始,count最大为20。最后一页的list长度可能小于请求的count
          返回码说明： 在调用模板消息接口后,会返回JSON数据包。
          {
            "errcode": 0,
            "errmsg": "ok",
            "list": [ // 帐号下的模板列表
              {
                "template_id": "wDYzYZVxobJivW9oMpSCpuvACOfJXQIoKUm0PY397Tc",
                //  添加至帐号下的模板id,发送小程序模板消息时所需
                "title": "购买成功通知",
                // title 模板标题
                "content": "购买地点{{keyword1.DATA}}\n购买时间{{keyword2.DATA}}\n物品名称{{keyword3.DATA}}\n",
                // content 模板内容
                "example": "购买地点：TIT造舰厂\n购买时间：2016年6月6日\n物品名称：咖啡\n"
                // example 模板内容示例
              }
            ]
          }
        5. 删除帐号下的某个模板
          接口地址 https://api.weixin.qq.com/cgi-bin/wxopen/template/del?access_token=ACCESS_TOKEN
          HTTP请求方式： POST
          POST参数说明：
          access_token 必选,接口调用凭证
          template_id  必选,要删除的模板id
          返回码说明： 在调用模板消息接口后,会返回JSON数据包。
          {
            "errcode": 0,
            "errmsg": "ok"
          }
      发送模版消息 
        获取 access_token
          access_token 是全局唯一接口调用凭据,开发者调用各接口时都需使用 access_token,请妥善保存
          access_token 的存储至少要保留512个字符空间。
          access_token 的有效期目前为2个小时,需定时刷新,重复获取将导致上次获取的 access_token 失效。
          公众平台的 API 调用所需的 access_token 的使用及生成方式说明：
            为了保密 appsecrect,第三方需要一个 access_token 获取和刷新的中控服务器。而其他业务逻辑服务器所使用的 access_token 均来自于该中控服务器,不应该各自去刷新,否则会造成 access_token 覆盖而影响业务；
            目前 access_token 的有效期通过返回的 expires_in 来传达,目前是7200秒之内的值。中控服务器需要根据这个有效时间提前去刷新新 access_token。在刷新过程中,中控服务器对外输出的依然是老 access_token,此时公众平台后台会保证在刷新短时间内,新老 access_token 都可用,这保证了第三方业务的平滑过渡；
            access_token 的有效时间可能会在未来有调整,所以中控服务器不仅需要内部定时主动刷新,还需要提供被动刷新 access_token 的接口,这样便于业务服务器在 API 调用获知 access_token 已超时的情况下,可以触发 access_token 的刷新流程。
            开发者可以使用 AppID 和 AppSecret 调用本接口来获取 access_token。AppID 和 AppSecret 可登录微信公众平台官网-设置-开发设置中获得（需要已经绑定成为开发者,且帐号没有异常状态）。AppSecret 生成后请自行保存,因为在公众平台每次生成查看都会导致 AppSecret 被重置。注意调用所有微信接口时均需使用 https 协议。如果第三方不使用中控服务器,而是选择各个业务逻辑点各自去刷新 access_token,那么就可能会产生冲突,导致服务不稳定。
              接口地址：
              https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
              HTTP请求方式: GET
              参数说明 :               
              参数 必选 说明
              grant_type 是 获取 access_token 填写 client_credential
              appid 是 第三方用户唯一凭证
              secret 是 第三方用户唯一凭证密钥,即appsecret
              返回参数说明： 正常情况下,微信会返回下述 JSON 数据包给开发者：
              {"access_token": "ACCESS_TOKEN", "expires_in": 7200}
              参数 说明
              access_token 获取到的凭证
              expires_in 凭证有效时间,单位：秒
              错误时微信会返回错误码等信息,JSON 数据包示例如下（该示例为 AppID 无效错误）:
              {"errcode": 40013, "errmsg": "invalid appid"}
        发送模板消息
          接口地址：
          https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=ACCESS_TOKEN
          (ACCESS_TOKEN 需换成上文获取到的 access_token)
          HTTP请求方式： POST
          POST参数说明：
          参数 必选 说明
          touser 是 接收者（用户）的 openid
          template_id 是 所需下发的模板消息的id
          page 否 点击模板卡片后的跳转页面,仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转。
          form_id 是 表单提交场景下,为 submit 事件带上的 formId；支付场景下,为本次支付的 prepay_id
          data 是 模板内容,不填则下发空模板
          color 否 模板内容字体的颜色,不填默认黑色
          emphasis_keyword 否 模板需要放大的关键词,不填则默认无放大
          示例：
          {
            "touser": "OPENID",  
            "template_id": "TEMPLATE_ID", 
            "page": "index",          
            "form_id": "FORMID",         
            "data": {
              "keyword1": {
                "value": "339208499", 
                "color": "#173177"
              }, 
              "keyword2": {
                "value": "2015年01月05日 12:30", 
                "color": "#173177"
              }, 
              "keyword3": {
                "value": "粤海喜来登酒店", 
                "color": "#173177"
              } , 
              "keyword4": {
                "value": "广州市天河区天河路208号", 
                "color": "#173177"
              } 
            },
            "emphasis_keyword": "keyword1.DATA" 
          }
          返回码说明： 在调用模板消息接口后,会返回JSON数据包。
          正常时的返回JSON数据包示例：
          {
            "errcode": 0,
            "errmsg": "ok"
          }
          错误时会返回错误码信息,说明如下：
          返回码 说明
          40037 template_id不正确
          41028 form_id不正确,或者过期
          41029 form_id已被使用
          41030 page不正确
          45009 接口调用超过限额（目前默认每个帐号日调用限额为100万）
      下发条件说明 
        支付
          当用户在小程序内完成过支付行为,可允许开发者向用户在7天内推送有限条数的模板消息
          一次支付可下发3条,多次支付下发条数独立,互相不影响 
        提交表单
          当用户在小程序内发生过提交表单行为且该表单声明为要发模板消息的,
          开发者需要向用户提供服务时,可允许开发者向用户在7天内推送有限条数的模板消息
          一次提交表单可下发1条,多次提交下发条数独立,相互不影响 
      审核说明 
        1. 标题
          1.1 标题不能存在相同
          1.2 标题意思不能存在过度相似
          1.3 标题必须以“提醒”或“通知”结尾
          1.4 标题不能带特殊符号、个性化字词等没有行业通用性的内容
          1.5 标题必须能体现具体服务场景
          1.6 标题不能涉及营销相关内容,包括不限于：
          消费优惠类、购物返利类、商品更新类、优惠券类、代金券类、红包类、会员卡类、积分类、活动类等营销倾向通知
        2. 关键词
        2.1 同一标题下,关键词不能存在相同
        2.2 同一标题下,关键词不能存在过度相似
        2.3 关键词不能带特殊符号、个性化字词等没有行业通用性的内容
        2.4 关键词内容示例必须与关键词对应匹配
        2.5 关键词不能太过宽泛,需要具有限制性,例如：“内容”这个就太宽泛,不能审核通过
      违规说明
        除不能违反运营规范外,还不能违反以下规则,包括但不限于：
        不允许恶意诱导用户进行触发操作,以达到可向用户下发模板目的
        不允许恶意骚扰,下发对用户造成骚扰的模板
        不允许恶意营销,下发营销目的模板
    客服消息 
    转发 
      onShareAppMessage(options)
      在 Page 中定义 onShareAppMessage 函数,设置该页面的转发信息。
      
      只有定义了此事件处理函数,右上角菜单才会显示 “转发” 按钮
      用户点击转发按钮的时候会调用
      此事件需要 return 一个 Object,用于自定义转发内容
      options 参数说明
      
      参数  类型  说明  最低版本
      from  String  转发事件来源。button：页面内转发按钮；menu：右上角转发菜单  1.2.4
      target  Object  如果 from 值是 button,则 target 是触发这次转发事件的 button,否则为 undefined  1.2.4
      自定义转发字段
      
      字段  说明  默认值  最低版本
      title  转发标题  当前小程序名称  
      path  转发路径  当前页面 path ,必须是以 / 开头的完整路径  
      imageUrl  自定义图片路径,可以是本地文件路径、代码包文件路径或者网络图片路径,支持PNG及JPG,不传入 imageUrl 则使用默认截图。iOS 显示图片长宽比是 5:4,Android 显示图片长宽比是 215:168。高度超出部分会从底部裁剪。推荐使用 Android 图片长宽比,可保证图片在两个平台都完整显示,其中 iOS 底部会出现一小段白色    1.5.0
      success  转发成功的回调函数    1.1.0
      fail  转发失败的回调函数    1.1.0
      complete  转发结束的回调函数（转发成功、失败都会执行    1.1.0
      回调结果：
      
      回调类型  errMsg  说明
      success  shareAppMessage:ok  转发成功
      fail  shareAppMessage:fail cancel  用户取消转发
      fail  shareAppMessage:fail (detail message)  转发失败,其中 detail message 为详细失败信息
      success回调参数说明：
      
      参数  类型  说明  最低版本
      shareTickets  StringArray  shareTicket 数组,每一项是一个 shareTicket ,对应一个转发对象  1.1.0
      示例代码：
      
      Page({
        onShareAppMessage: function (res) {
          if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
          }
          return {
            title: '自定义转发标题',
            path: '/page/user?id=123',
            success: function(res) {
              // 转发成功
            },
            fail: function(res) {
              // 转发失败
            }
          }
        }
      })
      wx.showShareMenu(OBJECT)
      基础库 1.1.0 开始支持,低版本需做兼容处理
      
      显示当前页面的转发按钮
      
      OBJECT参数说明：
      
      参数  类型  必选  说明
      withShareTicket  Boolean  否  是否使用带 shareTicket 的转发详情
      success  Function  否  接口调用成功的回调函数
      fail  Function  否  接口调用失败的回调函数
      complete  Function  否  接口调用结束的回调函数（调用成功、失败都会执行）
      示例代码：
      
      wx.showShareMenu({
        withShareTicket: true
      })
      wx.hideShareMenu(OBJECT)
      基础库 1.1.0 开始支持,低版本需做兼容处理
      
      隐藏转发按钮
      
      OBJECT参数说明：
      
      参数  类型  必选  说明
      success  Function  否  接口调用成功的回调函数
      fail  Function  否  接口调用失败的回调函数
      complete  Function  否  接口调用结束的回调函数（调用成功、失败都会执行）
      示例代码：
      
      wx.hideShareMenu()
      wx.updateShareMenu(OBJECT)
      基础库 1.2.0 开始支持,低版本需做兼容处理
      
      更新转发属性
      
      OBJECT参数说明：
      
      参数  类型  必选  说明
      withShareTicket  Boolean  否  是否使用带 shareTicket 的转发详情
      success  Function  否  接口调用成功的回调函数
      fail  Function  否  接口调用失败的回调函数
      complete  Function  否  接口调用结束的回调函数（调用成功、失败都会执行）
      示例代码：
      
      wx.updateShareMenu({
        withShareTicket: true,
        success() {
        }
      })
      wx.getShareInfo(OBJECT)
      基础库 1.1.0 开始支持,低版本需做兼容处理
      
      获取转发详细信息
      
      OBJECT参数说明：
      
      参数  类型  必选  说明
      shareTicket  String  是  shareTicket
      success  Function  否  接口调用成功的回调函数
      fail  Function  否  接口调用失败的回调函数
      complete  Function  否  接口调用结束的回调函数（调用成功、失败都会执行）
      CALLBACK 参数说明：
      
      参数  类型  说明
      errMsg  String  错误信息
      encryptedData  String  包括敏感数据在内的完整转发信息的加密数据,详细见加密数据解密算法
      iv  String  加密算法的初始向量,详细见加密数据解密算法
      encryptedData 解密后为一个 JSON 结构,包含字段如下：
      
      字段  说明
      openGId  群对当前小程序的唯一 ID
      Tip: 如需要展示群名称,可以使用开放数据组件
      
      获取更多转发信息
      通常开发者希望转发出去的小程序被二次打开的时候能够获取到一些信息,例如群的标识。现在通过调用 wx.showShareMenu 并且设置 withShareTicket 为 true ,当用户将小程序转发到任一群聊之后,可以获取到此次转发的 shareTicket,此转发卡片在群聊中被其他用户打开时,可以在 App.onLaunch() 或 App.onShow 获取到另一个 shareTicket。这两步获取到的 shareTicket 均可通过 wx.getShareInfo() 接口可以获取到相同的转发信息。
      
      页面内发起转发
      基础库 1.2.0 开始支持,低版本需做兼容处理
      
      通过给 button 组件设置属性 open-type="share",可以在用户点击按钮后触发 Page.onShareAppMessage() 事件,如果当前页面没有定义此事件,则点击后无效果。相关组件：button
      
      使用指引
      转发按钮,旨在帮助用户更流畅地与好友分享内容和服务。转发,应是用户自发的行为,且在需要时触手可及。开发者在使用时若遵从以下指引,会得到更佳的用户体验。
      
      含义清晰：明确、一目了然的图形按钮,将为用户减少理解的时间。在我们的资源下载中心,你可以找到这样的按钮素材并直接使用。或者你可以根据自己业务的设计风格,灵活设计含义清晰的按钮的样式。当然,你也可以直接使用带文案的按钮,“转发给好友”,它也足够明确。
      方便点击：按钮点击热区不宜过小,亦不宜过大。同时,转发按钮与其他按钮一样,热区也不宜过密,以免用户误操作。
      按需出现：并非所有页面都适合放置转发按钮,涉及用户隐私的非公开内容,或可能打断用户完成当前操作体验的场景,该功能并不推荐使用。同时,由于转发过程中,我们将截取用户屏幕图像作为配图,因此,需要注意帮助用户屏蔽个人信息。
      尊重意愿：理所当然,并非所有的用户,都喜欢与朋友分享你的小程序。因此,它不应该成为一个诱导或强制行为,如转发后才能解锁某项功能等。请注意,这类做法不仅不被推荐,还可能违反我们的《运营规范》,我们强烈建议你在使用前阅读这部分内容。
      以上,我们陈列了最重要的几点,如果你有时间,可以完整浏览《设计指南》,相信会有更多的收获。
      
      Bug & Tip
      tip: 不自定义转发图片的情况下,默认会取当前页面,从顶部开始,高度为 80% 屏幕宽度的图像作为转发图片。
      tip: 转发的调试支持请查看 普通转发的调试支持 和 带 shareTicket 的转发
      tip: 只有转发到群聊中打开才可以获取到 shareTickets 返回值,单聊没有 shareTickets
      tip: shareTicket 仅在当前小程序生命周期内有效
      tip: 由于策略变动,小程序群相关能力进行调整,开发者可先使用wx.getShareInfo接口中的群ID进行功能开发。    
    二维码 
      获取二维码
      通过后台接口可以获取小程序任意页面的二维码,扫描该二维码可以直接进入小程序对应的页面。目前微信支持两种二维码,小程序码（左）,小程序二维码（右）,如下所示：
      
      
      
      获取小程序码
      我们推荐生成并使用小程序码,它具有更好的辨识度。目前有两个接口可以生成小程序码,开发者可以根据自己的需要选择合适的接口。
      
      接口A: 适用于需要的码数量较少的业务场景 接口地址：
      
      https://api.weixin.qq.com/wxa/getwxacode?access_token=ACCESS_TOKEN
      获取 access_token 详见文档
      
      POST 参数说明
      
      参数  类型  默认值  说明
      path  String    不能为空,最大长度 128 字节
      width  Int  430  二维码的宽度
      auto_color  Bool  false  自动配置线条颜色,如果颜色依然是黑色,则说明不建议配置主色调
      line_color  Object  {"r":"0","g":"0","b":"0"}  auth_color 为 false 时生效,使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"}
      注意：通过该接口生成的小程序码,永久有效,数量限制见文末说明,请谨慎使用。用户扫描该码进入小程序后,将直接进入 path 对应的页面。
      
      接口B：适用于需要的码数量极多,或仅临时使用的业务场景
      
      接口地址：
      
      https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=ACCESS_TOKEN
      获取 access_token 详见文档
      
      POST 参数说明
      
      参数  类型  默认值  说明
      scene  String    最大32个可见字符,只支持数字,大小写英文以及部分特殊字符："!#$&'()*+,/:;=?@-._~",其它字符请自行编码为合法字符（因不支持%,中文无法使用 urlencode 处理,请使用其他编码方式）
      page  String    必须是已经发布的小程序页面,例如 "pages/index/index" ,根路径前不要填加'/',不能携带参数（参数请放在scene字段里）,如果不填写这个字段,默认跳主页面
      width  Int  430  二维码的宽度
      auto_color  Bool  false  自动配置线条颜色,如果颜色依然是黑色,则说明不建议配置主色调
      line_color  Object  {"r":"0","g":"0","b":"0"}  auto_color 为 false 时生效,使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"}
      注意：通过该接口生成的小程序码,永久有效,数量暂无限制。用户扫描该码进入小程序后,开发者需在对应页面获取的码中 scene 字段的值,再做处理逻辑。使用如下代码可以获取到二维码中的 scene 字段的值。调试阶段可以使用开发工具的条件编译自定义参数 scene=xxxx 进行模拟,开发工具模拟时的 scene 的参数值需要进行 urlencode
      
      // 这是首页的 js
      Page({
        onLoad: function(options) {
          // options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
          var scene = decodeURIComponent(options.scene)
        }
      })
      获取小程序二维码
      接口C：适用于需要的码数量较少的业务场景
      
      接口地址：
      
      https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=ACCESS_TOKEN
      获取 access_token 详见文档
      
      POST 参数说明
      
      参数  类型  默认值  说明
      path  String    不能为空,最大长度 128 字节
      width  Int  430  二维码的宽度
      注意：通过该接口生成的小程序二维码,永久有效,数量限制见文末说明,请谨慎使用。用户扫描该码进入小程序后,将直接进入 path 对应的页面。
      
      示例：
      
      {"path": "pages/index?query=1", "width": 430}
      注：pages/index 需要在 app.json 的 pages 中定义
      
      Bug & Tip
      tip：通过该接口,仅能生成已发布的小程序的二维码。
      tip：可以在开发者工具预览时生成开发版的带参二维码。
      tip：接口A加上接口C,总共生成的码数量限制为100,000,请谨慎调用。
      tip: POST 参数需要转成 json 字符串,不支持 form 表单提交。
      tip: auto_color line_color 参数仅对小程序码生效。    
    收货地址 
      wx.chooseAddress(OBJECT)
      基础库 1.1.0 开始支持,低版本需做兼容处理
      
      调起用户编辑收货地址原生界面,并在编辑完成后返回用户选择的地址。
      
      OBJECT参数说明：
      
      参数  类型  必选  说明
      success  Function  否  返回用户选择的收货地址信息
      fail  Function  否  接口调用失败的回调函数
      complete  Function  否  接口调用结束的回调函数（调用成功、失败都会执行）
      success返回参数说明：
      
      参数  类型  说明
      errMsg  String  调用结果
      userName  String  收货人姓名
      postalCode  String  邮编
      provinceName  String  国标收货地址第一级地址
      cityName  String  国标收货地址第二级地址
      countyName  String  国标收货地址第三级地址
      detailInfo  String  详细收货地址信息
      nationalCode  String  收货地址国家码
      telNumber  String  收货人手机号码
      示例代码：
      
      wx.chooseAddress({
        success: function (res) {
          console.log(res.userName)
          console.log(res.postalCode)
          console.log(res.provinceName)
          console.log(res.cityName)
          console.log(res.countyName)
          console.log(res.detailInfo)
          console.log(res.nationalCode)
          console.log(res.telNumber)
        }
      })
      Bug & Tip
      tip: wx.chooseAddress 接口需要用户授权,请兼容用户拒绝授权的场景。    
    卡券 
      wx.addCard(OBJECT)
      基础库 1.1.0 开始支持,低版本需做兼容处理
      
      批量添加卡券。
      
      Object参数说明：
      
      参数  类型  必选  说明
      cardList  ObjectArray  是  需要添加的卡券列表,列表内对象说明请参见请求对象说明
      success  Function  否  接口调用成功的回调函数
      fail  Function  否  接口调用失败的回调函数
      complete  Function  否  接口调用结束的回调函数（调用成功、失败都会执行）
      请求对象说明
      参数  类型  说明
      cardId  String  卡券 Id
      cardExt  String  卡券的扩展参数
      cardExt 说明
      
      参数  类型  必选  是否参与签名  说明
      code  String  否  是  用户领取的 code,仅自定义 code 模式的卡券须填写,非自定义 code 模式卡券不可填写,详情
      openid  String  否  是  指定领取者的openid,只有该用户能领取。 bind_openid 字段为 true 的卡券必须填写,bind_openid 字段为 false 不可填写。
      timestamp  Number  是  是  时间戳,东八区时间,UTC+8,单位为秒
      nonce_str  String  否  是  随机字符串,由开发者设置传入,加强安全性（若不填写可能被重放请求）。随机字符串,不长于 32 位。推荐使用大小写字母和数字,不同添加请求的 nonce_str 须动态生成,若重复将会导致领取失败。
      fixed_begintimestamp  Number  否  否  卡券在第三方系统的实际领取时间,为东八区时间戳（UTC+8,精确到秒）。当卡券的有效期类为 DATE_TYPE_FIX_TERM 时专用,标识卡券的实际生效时间,用于解决商户系统内起始时间和领取微信卡券时间不同步的问题。
      outer_str  String  否  否  领取渠道参数,用于标识本次领取的渠道值。
      signature  String  是  -  签名,商户将接口列表中的参数按照指定方式进行签名,签名方式使用 SHA1,具体签名方案参见：卡券签名
      注：cardExt 需进行 JSON 序列化为字符串传入
      
      回调结果：
      
      回调类型  errMsg  说明
      success  addCard:ok  添加卡券成功
      fail  addCard:fail cancel  用户取消添加卡券
      fail  addCard:fail (detail message)  添加卡券失败,其中 detail message 为后台返回的详细失败原因
      success返回参数：
      
      参数  类型  说明
      cardList  ObjectArray  卡券添加结果列表,列表内对象说明请详见返回对象说明
      返回对象说明
      参数  类型  说明
      code  String  加密 code,为用户领取到卡券的code加密后的字符串,解密请参照：code 解码接口
      cardId  String  用户领取到卡券的Id
      cardExt  String  用户领取到卡券的扩展参数,与调用时传入的参数相同
      isSuccess  Boolean  是否成功
      示例代码：
      
      wx.addCard({
        cardList: [
          {
            cardId: '',
            cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
          }, {
            cardId: '',
            cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
          }
        ],
        success: function(res) {
          console.log(res.cardList) // 卡券添加结果
        }
      })
      wx.openCard(OBJECT)
      基础库 1.1.0 开始支持,低版本需做兼容处理
      
      查看微信卡包中的卡券。
      
      Object参数说明：
      
      参数  类型  必选  说明
      cardList  ObjectArray  是  需要打开的卡券列表,列表内参数详见openCard 请求对象说明
      success  Function  否  接口调用成功的回调函数
      fail  Function  否  接口调用失败的回调函数
      complete  Function  否  接口调用结束的回调函数（调用成功、失败都会执行）
      openCard 请求对象说明
      参数  类型  说明
      cardId  String  需要打开的卡券 Id
      code  String  由 addCard 的返回对象中的加密 code 通过解密后得到,解密请参照：code 解码接口
      示例代码：
      
      wx.openCard({
        cardList: [
          {
            cardId: '',
            code: ''
          }, {
            cardId: '',
            code: ''
          }
        ],
        success: function(res) {
        }
      })
      Tip
      tip: 目前只有认证小程序才能使用卡券接口,可参考指引进行认证。
      tip: 了解更多信息,请查看微信卡券接口文档    
    设置 
      wx.openSetting(OBJECT)
      基础库 1.1.0 开始支持,低版本需做兼容处理
      
      调起客户端小程序设置界面,返回用户设置的操作结果
      
      Object 参数说明：
      
      参数  类型  必选  说明
      success  Function  否  接口调用成功的回调函数,返回内容详见返回参数说明。
      fail  Function  否  接口调用失败的回调函数
      complete  Function  否  接口调用结束的回调函数（调用成功、失败都会执行）
      success返回参数说明：
      
      参数  类型  说明
      authSetting  Object  用户授权结果,其中 key 为 scope 值,value 为 Bool 值,表示用户是否允许授权,详见 scope 列表
      示例代码：
      
      wx.openSetting({
        success: (res) => {
          /*
           * res.authSetting = {
           *   "scope.userInfo": true,
           *   "scope.userLocation": true
           * }
           */
        }
      })
      wx.getSetting(OBJECT)
      基础库 1.2.0 开始支持,低版本需做兼容处理
      
      获取用户的当前设置
      
      Object 参数说明：
      
      参数  类型  必选  说明
      success  Function  否  接口调用成功的回调函数,返回内容详见返回参数说明。
      fail  Function  否  接口调用失败的回调函数
      complete  Function  否  接口调用结束的回调函数（调用成功、失败都会执行）
      success返回参数说明：
      
      参数  类型  说明
      authSetting  Object  用户授权结果,其中 key 为 scope 值,value 为 Bool 值,表示用户是否允许授权,详见 scope 列表
      示例代码：
      
      wx.getSetting({
        success: (res) => {
          /*
           * res.authSetting = {
           *   "scope.userInfo": true,
           *   "scope.userLocation": true
           * }
           */
        }
      })    
    微信运动
    打开小程序 
    获取发票抬头 
    生物认证 
  数据 
  扩展接口 
    将ArrayBuffer数据转成Base64字符串 '1.1.0' 
    wx.arrayBufferToBase64(arrayBuffer)
      const arrayBuffer = new Uint8Array([11, 22, 33])
      const base64 = wx.arrayBufferToBase64(arrayBuffer)
    将Base64字符串转成ArrayBuffer数据 '1.1.0'
    wx.base64ToArrayBuffer(base64)
      const base64 = 'CxYh'
      const arrayBuffer = wx.base64ToArrayBuffer(base64)  
  调试接口 
    设置是否打开调试开关,此开关对正式版也能生效。 '1.4.0'
    wx.setEnableDebug({
      'enableDebug': bol, // 是否打开调试
      cfoo,
    })
  todo : ----------------------------------------------------------------------
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
配合组件使用的API 
  获取微信用户绑定的手机号,需先调用login接口 
    PS: 因为需要用户主动触发才能发起获取手机号接口,所以该功能不由 API 来调用,
      需用 <button> 组件的点击来触发。
      目前该接口针对非个人开发者,且完成了认证的小程序开放。
      需谨慎使用,若用户举报较多或被发现在不必要场景下使用,微信有权永久回收该小程序的该接口权限。
    使用方法:
    需要将<button>组件'open-type'的值设置为'getPhoneNumber',
    当用户点击并同意之后,可以通过'bindgetphonenumber'事件回调获取到微信服务器返回的加密数据, 
    然后在第三方服务端结合 session_key 以及 app_id 进行解密获取手机号
    例子
    <button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber"> </button>
    Page({ 
      getPhoneNumber: function(e) { 
        // e.detail.errMsg
        // e.detail.iv  加密算法的初始向量 
        // e.detail.encryptedData  包括敏感数据在内的完整用户信息的加密数据 
          // 解密后为以下json结构 
          // {
          //   "phoneNumber": "13580006666",      用户绑定的手机号,国外手机号会有区号 
          //   "purePhoneNumber": "13580006666",  没有区号的手机号 
          //   "countryCode": "86",               区号
          //   "watermark": {
          //     "appid":"APPID",
          //     "timestamp":TIMESTAMP
          //   }
          // }
      } 
    })
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


