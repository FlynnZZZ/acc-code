MiniProgrom,微信小程序 
  依赖于微信平台,使用微信台提供的 View/Event/Component/Container 等构建 
  介于 Web App 和 Native App 之间的一种类型 
说明 
  开发小程序时可以选择有APPID和无APPID两种方式,及其区别 
    有APPID时,只能和指定的域名进行通信,如果没有进行配置,编译时会报错 
      微信公众平台-小程序-设置-开发设置 
      每种最多可设置两个,只能使用 https 的域名,且申请过程需花费一定时间 
    无APPID时,不可进行发布,但可随意进行网络请求,不限制域名 
  小程序的model到view是单向的,view更新时不会更新model 
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
  'Component'组件是视图的基本组成单元 
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
  ◆运行机制 
  冷启动: 用户首次打开或小程序被微信主动销毁后再次打开的情况
    此时小程序需要重新加载启动 
  热启动: 用户已打开过小程序,然后在一定时间内再次打开该小程序
    此时无需重新启动,只需将后台态的小程序切换到前台
  更新机制 
    小程序冷启动时如果发现有新版本,将会异步下载新版本的代码包,
    并同时用客户端本地的包进行启动,即新版本的小程序需要等下一次冷启动才会应用上
    如果需要马上应用最新版本,可以使用 wx.getUpdateManager API 进行处理。
  无重启的概念 
    当小程序进入后台,客户端会维持一段时间的运行状态,超过一定时间后[目前5分钟]会被微信主动销毁
    当短时间内'5s'连续收到两次以上收到系统内存告警,会进行小程序的销毁 
  再次打开逻辑 '1.4.0+' 
    用户打开小程序的预期有以下两类场景：
    A. 打开首页： 场景值有 1001, 1019, 1022, 1023, 1038, 1056
    B. 打开小程序指定的某个页面： 场景值为除 A 以外的其他
    当再次打开一个小程序逻辑如下：
    上一次的场景 当前打开的场景 效果
    A            A            保留原来的状态
    B            A            清空原来的页面栈,打开首页（相当于执行 wx.reLaunch 到首页）
    A/B          B            清空原来的页面栈,打开指定页面（相当于执行 wx.reLaunch 到指定页）
  前台/后台/销毁: 
    当用户点击左上角关闭/按设备Home键离开微信 进入后台 [小程序并未销毁]
    再次启动微信/再次打开小程序 从后台进入前台 
    当小程序进入后台一定时间/系统资源占用过高 小程序被销毁 
  关闭小程序 '1.1.0+' 
    当用户从扫一扫、转发等入口(场景值为1007, 1008, 1011, 1025)进入小程序,
    且没有置顶小程序的情况下退出,小程序会被销毁。
    小程序运行机制在基础库版本 1.4.0 有所改变,该逻辑在新版本已不适用 
  ◆场景值 '1.1.0+' 
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
      "list": [   // 必选,定义tabBar,最少2个,最多5个,按数组的顺序排序  
        { "pagePath": "pages/index/index" // 必选,页面路径,需在pages中先定义 
          指定的页面才会显示 tabBar, 
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
      ,"color": <HexColor>            // 必选,文字默认颜色 
      ,"selectedColor": <HexColor>   // 必选,文字选中时的颜色  
      ,"backgroundColor": <HexColor> // 必选,背景色 
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
        // 可在其他页面直接通过赋值进行修改 
      } 
      // 可添加任意函数或数据,用 this 访问 
      ,fooName: function(){
        console.log(1);
      },    
      ,..
      // 生命周期函数
      ,onLaunch: function(param){   // 监听小程序初始化 
        // 当小程序初始化完成时,全局只触发一次 
        // 此次页面page还没生成  
        param 
          .path     str,打开小程序的路径
          .query    obj,打开小程序的 query 
            ._key 
          .scene    num,打开小程序的场景值
          .shareTicket  str,shareTicket,详见 获取更多转发信息
          .referrerInfo obj,当场景为由从另一个小程序或公众号或App打开时,返回此字段 
            .appId      str,来源小程序或公众号或App的 appId  
              以下场景支持返回 .appId 
              场景值        场景                         appId 信息含义
              1020   公众号 profile 页相关小程序列表   返回来源公众号 appId
              1035   公众号自定义菜单                  返回来源公众号 appId
              1036   App 分享消息卡片                 返回来源应用 appId
              1037   小程序打开小程序                 返回来源小程序 appId
              1038   从另一个小程序返回                返回来源小程序 appId
              1043   公众号模板消息                   返回来源公众号 appId
            .extraData  来源小程序传过来的数据,scene=1037/1038 时支持
      }
      ,onShow: function(param){     // 监听小程序显示 
        // 小程序启动/从后台进入到前台时触发  
        param 同 'onLaunch'的参数 
      }
      ,onHide: function(){           // 监听小程序隐藏 
        // 小程序从前台进入到后台时触发  
        console.log('onHide');
      }
      ,onError: function(err){          // 错误监听函数 
        // 当发生脚本错误/api调用失败时触发 
        console.log(err);
      }
      ,onPageNotFound: function(param){ // 页面不存在监听函数 '1.9.90+' 
        // 当小程序出现要打开的页面不存在的情况时触发 
        // 若无 onPageNotFound 监听,当跳转页面不存在时,将推入微信客户端原生的页面不存在提示页面 
        // 可进行重定向处理,但必须同步处理,异步处理,如 setTimeout,则无效 
        // 若又重定向到另一个不存在的页面,将推入微信客户端原生的页面不存在提示页面,且不在回调 onPageNotFound
        param 
          .path  // str,不存在页面的路径
          .query // obj,打开不存在页面的 query
            .key 
          .isEntryPage // bol,是否本次启动的首个页面
            // 如从分享等入口进来,首个页面是开发者配置的分享页面 
      } 
    })   
    App.prototype.getCurrentPage() 获取当前页面实例 
      不要在'onLaunch'时调用 getCurrentPage(),此时page还没有生成 
  'app.wxss'  可选,公共样式  
  'project.config.json'  开发者工具配置 
  ◆'pages/xxx'页面定义 
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
        PS: 初始化数据将作为页面的第一次渲染
          data 将会以 JSON 的形式由逻辑层传至渲染层,
          所以其数据必须是可以转成 JSON 的格式：字符串,数字,布尔值,对象,数组。
        key1: val1  // 在其他函数中获取该数据 则为 this.data.key1 
        ,...
      }           
      // 添加任意函数或数据,用'this'访问 
      ,<key>: <val>
      ,<fn>: function(){
        // 
      }  
      ,..
      // 页面相关事件处理函数 
      ,onPullDownRefresh: function () {   // 页面下拉时响应 
        // 需在'app.json'或'xxx.json'中开启 'enablePullDownRefresh':true 
      }
      ,onReachBottom: function () {       // 页面上拉触底时响应  
        // 可在'app.json'/'xxx.json'中设置触发距离 onReachBottomDistance 
        // 在触发距离内滑动期间,该事件只会被触发一次 
        console.log('上拉触底');
      }
      ,onPageScroll: function(param){     // 页面滚动时响应 
        param 值: {
          scrollTop: <num>  // 页面在垂直方向已滚动的距离,单位:px 
        }
      }
      ,onShareAppMessage: function(res){  // 页面转发时响应 
        PS: 设置了该回调,页面才会显示'转发'按钮 
        res  
          .from    KW,转发事件来源 
            'button'  页面内转发按钮 
            'menu'    右上角转发菜单 
          .target  obj,当通过按钮转发时,为该按钮,否则为 undefined  '1.2.4+' 
        return { // 返回值用于自定义转发内容 
          title: str         // 可选,转发标题,默认:当前小程序名称 
          ,path: path        // 可选,转发路径,默认:当前页path 
            // 必须是以'/'开头的完整路径 
          ,imageUrl: path    // 可选,图片路径,默认:页面截图 
            默认: 取当前页面,从顶部开始,高度为 80% 屏幕宽度的图像作为转发图片  
            可为: 本地文件路径、代码包文件路径或者网络图片路径,支持PNG及JPG 
            图片长宽比 
              iOS 显示图片长宽比是 5:4,Android 显示图片长宽比是 215:168。
              高度超出部分会从底部裁剪。
              推荐使用 Android 图片长宽比,可保证图片在两个平台都完整显示,
              其中 iOS 底部会出现一小段白色
          ,sucess: function(back){}   // 可选,成功的回调 
          ,fail: function(info){}     // 可选,失败的回调 
          ,complete: function(arg){}  // 可选,最终的回调 
        }
      }
      ,onTabItemTap: function(tab){       // 当前是tab页时,点击tab时触发  
        tab  点击的tab的信息对象 
          .index 
          .pagePath  
          .text   
      } 
      // 生命周期  
      ,onLoad: function(query){   // 页面加载时响应  
        // 一个页面只会调用一次 
        query   打开当前页面所调用的 query 参数 
          ._key 
      }
      ,onShow: function(){        // 页面显示时响应 
        console.log('页面显示');
      }
      ,onReady: function(){       // 页面初次渲染完成时响应 
        一个页面只会调用一次
        代表页面已经准备妥当,可和视图层进行交互 
        对界面的设置如 wx.setNavigationBarTitle 需在 onReady 后设置 
      }
      ,onHide: function(){        // 页面隐藏时响应 
        触发场景枚举: 
          wx.naviagteTo 到其他页面 
          底部 tab 切换 
      }
      ,onUnload: function(){      // 页面卸载时响应 
        触发场景枚举: 
          wx.redirectTo/wx.navigateBack 到其他页面,当前页面会被微信客户端销毁回收 
      }
    })  
    Page.prototype.route      // 获取当前页路径 [基础库1.2.0+] 
    Page.prototype.setData({  // 更新视图层数据[异步],同时改变对应data中的值[同步] 
      PS: 单次设置的数据不能超过1024kB,请尽量避免一次设置过多的数据 
        直接修改 this.data 无效,无法改变页面的状态,还会造成数据不一致 
        不要把data中的任意一项的value设为undefined,否则可能会引起bug 
        每次只设置需要改变的最小单位数据可提高小程序的渲染性能 
      <key>: <val> 
        key  'data'中的属性 
          并不需在'this.data'中预先定义 
          可以非常灵活,以数据路径的形式给出,如 'arr[2].mes,a.b.c.d' 
          也可使用 ES6 的语法: ['abc'+'efg']: val
        val  设置的值 
          // 请不要把 data 中任何一项的 value 设为 undefined 
          // 否则这一项将不被设置并可能遗留一些潜在问题 
      ,.. 
    }
    ,function(){   // 可选,本次setData对界面渲染完毕后调用 '1.5.0+' 
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
      由于小程序的渲染层和逻辑层分别在两个线程中运行,所以setData传递数据实际是一个异步的过程
    所有页面的脚本逻辑都跑在同一个JsCore线程
      ,页面使用setTimeout或者setInterval的定时器,然后跳转到其他页面时,
      这些定时器并没有被清除,需要开发者自己在页面离开的时候进行清理 
  'xxx.wxss'   可选,页面样式表,会对'app.wxss'进行覆盖  
  'xxx.json'   可选,配置本页的窗口表现,用于覆盖'app.json'中的'window'配置  
    只能设置 window 相关的配置项 
    { "disableScroll": <bol> // 只在 page.json 中有效,无法在 app.json 中设置该项 
      false  默认值 
      true   页面整体不能上下滚动
    ,"navigationBarBackgroundColor": "#ffffff"  // 
    ,"navigationBarTextStyle": "black"          
    ,"navigationBarTitleText": "导航栏标题"
    ,"backgroundColor": "#eeeeee"
    ,"backgroundTextStyle": "light"
    ,"enablePullDownRefresh": true  
    ,"onReachBottomDistance": 50 }
  ◆其他目录 
  utils  工具方法 
  cpnts  组件存放 
  imgs   图片存放 
  styles 样式文件  
  ... 
'*.json'JSON配置文件 
  'app.json'             小程序配置,详见'app.json'说明 
  'page.json'            页面配置,详见'xxx.json'说明   
'*.wxml'视图元素用于描述页面的结构,由组件进行展示 
  PS: 'WeiXin Markup language',结合基础组件/事件系统,可构建出页面的结构 
    WXML中动态数据均来自对应Page的data;自动会被一个<page>标签包裹
'*.js'逻辑层'App Service' 
  PS: 每个页面有独立的作用域,并提供模块化能力 
    提供丰富的API,如扫一扫,支付等微信特有能力 
    由于MINA并非运行在浏览器中,所以JS在web中一些能力都无法使用,如'document''window'等
    开发者写的所有代码最终将会打包成一份js,并在小程序启动的时候运行,直到小程序销毁,
    类似ServiceWorker,所以逻辑层也称之为App Service 
  App()   // 见 app.js 
  Page()  // 见 xxx.js 
  getCurrentPages() // 获取当前页面栈的实例 
    // 以数组形式按栈的顺序给出,第一个元素为首页,最后一个元素为当前页面
    // 不要尝试修改页面栈,会导致路由以及页面状态错误 
'*.wxss'视图样式用于描述页面的样式 
  PS: 'WeiXin Style Sheet',具有CSS大部分特性,同时对CSS进行了扩充以及修改  
  尺寸单位 
    PS: 建议：开发微信小程序时设计师可用iPhone6作为视觉稿的标准 
    px:  同CSS 
    vw,vh: 同CSS 
    rpx'responsive pixel': 根据屏幕宽度进行自适应,屏幕宽度等于750rpx 
      如在iPhone6上,屏幕宽度为375px,共有750个物理像素, 
      则'750rpx = 375px = 750物理像素','1rpx = 0.5px = 1物理像素' 
  布局 
    flex布局 
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
  Accu: 
    文本溢出显示为'...'
      // 多行 
      <view class="txt"></view>
      .txt {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:3; // 设置显示的行数 
        overflow: hidden;
        text-overflow:ellipsis;
        word-break: break-all; // 规定自动换行的处理方法
      }
      // 单行 
      <view class="txt"></view>
      .txt {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
      }
'*.wxs'小程序的脚本语言,结合WXML,可构建出页面的结构 
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
分包加载 [1.7.3+] 
  PS: 开发者将小程序划分成不同的子包,构建时打包成不同的分包,用户使用时按需加载  
    对小程序进行分包,可优化首次启动的下载时间,及在多团队共同开发时可更好的解耦协作 
  主包&分包 
    PS: 构建小程序分包项目时,构建会输出一个或多个功能的分包,
      其中每个分包小程序必定含有一个主包 
      在小程序启动时,默认会下载主包并启动主包内页面,
      如果用户需要打开分包内某个页面,客户端会把对应分包下载下来,下载完成后再进行展示 
    主包: 放置默认启动页面/TabBar页面,及一些所有分包都需用到公共资源/JS脚本 
    分包: 是根据开发者的配置进行划分 
    目前小程序主/分包限制: 
      整个小程序所有分包大小不超过4M
      单个分包/主包大小不能超过2M
  使用方法 
    假设支持分包的小程序目录结构如下：
    ├── app.js
    ├── app.json
    ├── app.wxss
    ├── packageA
    │   └── pages
    │       ├── cat
    │       └── dog
    ├── packageB
    │   └── pages
    │       ├── apple
    │       └── banana
    ├── pages
    │   ├── index
    │   └── logs
    └── utils
    开发者通过在 app.json subPackages 字段声明项目分包结构: 
    {
      "pages":[
        "pages/index"
        ,"pages/logs"
      ],
      "subPackages": [
        { "root": "packageA" ,"pages": [
          "pages/cat"
          ,"pages/dog"
        ]}
        ,{ "root": "packageB" ,"pages": [
          "pages/apple"
          ,"pages/banana"
        ]}
      ]
    }
    打包原则
      声明 subPackages 后,将按 subPackages 配置路径进行打包,subPackages 配置路径外的目录将被打包到 app（主包） 中
      app（主包）也可以有自己的 pages（即最外层的 pages 字段）
      subPackage 的根目录不能是另外一个 subPackage 内的子目录
      首页的 TAB 页面必须在 app（主包）内 
    引用原则
      packageA 无法 require packageB JS 文件,但可以 require app、自己 package 内的 JS 文件
      packageA 无法 import packageB 的 template,但可以 require app、自己 package 内的 template
      packageA 无法使用 packageB 的资源,但可以使用 app、自己 package 内的资源
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
  JS兼容性 
    不支持 异步函数 
自我总结 
  '.wxss'中可使用weui中的样式,在CSS中定义即可而不用引入文件 ? 
    <image src="../../image/ing.png" class="animationImg"/>
    .animationImg{
      animation: weuiLoading 1s steps(12, end) infinite;
    }
  当组件的属性为布尔值时,设置无效时 
    采用 ="{{false}}"/="{{true}}"的形式进行尝试  
Question&Idea 
  其他未在tabBar中注册的页面仍有tabBar,如何实现 
    1 自己模拟 
-------------------------------------------------------------------------待整理 


