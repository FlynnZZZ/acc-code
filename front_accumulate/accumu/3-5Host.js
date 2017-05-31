基础规范、说明、约定 
  ./filename   表示当前文件夹中的某个文件
  ../filename  表示上一层文件夹中的某个文件

  URI : 统一资源标识符(Uniform Resource Identifier)
    一个用于标识某一互联网资源名称的字符串
    该种标识允许用户对任何（包括本地和互联网的）资源通过特定的协议进行交互操作
    URI由包括确定语法和相关协议的方案所定义。
    Web上可用的每种资源(HTML文档、图像、视频片段、程序等)由一个通用资源标识符进行定位
  URL : 统一资源定位符(Uniform Resource Locator)
    从互联网上得到的资源的位置和访问方法的一种简洁的表示,是互联网上标准资源的地址
    互联网上的每个文件都有一个唯一的URL,它包含的信息指出文件的位置以及浏览器应该怎么处理它
    使用ASCII代码的一部分来表示互联网的地址,
    一般统一资源定位符的开始标志着一个计算机网络所使用的网络协议。
  URN : 统一资源名称 (Uniform Resource Name)
    标识一个实体的标识符
  URI URL URN 的区别
    URN 与地址无关。
    URL 和 URN 都是 URI 的子集
--------------------------------------------------------------------------------
操作系统 
--------------------------------------------------------------------------------
浏览器 
  URL中的参数 lastreporttime
    在URL末尾增加一个 lastreporttime 参数,表示只会加载该参数时间之后的报告.
    e.g.
    'http://gumball.wickedlysmart.com/?lastreporttime=1302212903099'
    指定的时间为一串数字,单位为毫秒.
--------------------------------------------------------------------------------
移动端 
微信开发介绍 
  就是手机浏览器,只不过多了一些与微信的API对接的事情,微信也提供了很多jssdk,
  如果不想跟微信发生关系,就是一个手机网页
  正常是嵌入H5就可以了,需要微信登录、微信支付之类的功能,可以通过微信API进一步开发。
说明 
  微信 6.1 版本以后,会自带QQ浏览器的X5内核,即使你没有安装QQ浏览器。  [?]
  webkit内核中的一些私有的meta标签,这些meta标签在开发webapp时起到非常重要的作用
    <meta content=”width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;” name=”viewport” /> 
    第一个meta标签表示：强制让文档的宽度与设备的宽度保持1:1,
    并且文档最大的宽度比例是1.0,且不允许用户点击屏幕放大浏览；

    <meta content=”yes” name=”apple-mobile-web-app-capable” /> 
    第二个meta标签是iphone设备中的safari私有meta标签,它表示：允许全屏模式浏览；

    <meta content=”black” name=”apple-mobile-web-app-status-bar-style” /> 
    第三个meta标签也是iphone的私有标签,它指定的iphone中safari顶端的状态条的样式；

    <meta content=”telephone=no” name=”format-detection” /> 
    第四个meta标签表示：告诉设备忽略将页面中的数字识别为电话号码。


    去除Android平台中对邮箱地址的识别
    看 过iOS webapp API的同学都知道iOS提供了一个meta标签:用于禁用iOS对页面中电话号码的自动识别。在iOS中是不自动识别邮件 地 址的,但在Android平台,它会自动检测邮件地址,当用户touch到这个邮件地址时,Android会弹出一个框提示用户发送邮件,如果你不 想 Android自动识别页面中的邮件地址,你不妨加上这样一句meta标签在head 中 1 <meta content=”email=no” name=”format-detection” />



    例子1：<a href="tel:400-4000-0000" >XXX</a>
    这个a标签里的href调用的是手机号码。当点击这个a标签的时候则弹出是否拨打该号码的提示。
    在手机浏览器中使用是没有任何问题的,
    但在微信中,在安卓系统手机,微信 5.0.1 以上版本时该标签就失效了。（最新的微信版本是否解决了这个问题目前还不清楚）。这种情况下,将：
    <a href="tel:400-4000-0000" >XXX</a>改为
    <a link="tel:400-4000-0000" >
    则可以解决部分安卓机型,（但不是全部的）,有些机型依然不行。
    这个和微信客户端有关。目前没有找到满意的解决办法。
WeUI：专为开发微信HTML5应用的开源Web UI组件库
  PS：WeUI是一套同微信原生视觉体验一致的基础样式库,
    为微信Web开发量身设计,可以令用户的使用感知更加统一。
    包含button、cell、dialog、toast、article、icon等各式元素。
  说明篇
    使用 dist/style 文件中的 weui.css 和 weui.min.css 两个文件
  起始
    需要在body标签中加入ontouchstart ,如: <body ontouchstart>
微信开发者工具: 用于在手机上调试页面
  使用方法及原理
  将电脑和手机处于同一局域网「可通过Wi-Fi或USB连接」
  切换到开发者工具的调试页根据手机系统「ios或android」进行相应的选择普通调试
  选择代理的ip 「一般Wi-Fi以 168 开头」
  将需要调试的网页的地址「不可使用file协议,即需要开启本地服务器」发送到微信上,
  在微信上打开从电脑上发来的链接即可看到调试页的效果了
微信JS-SDK 
  PS：微信JS-SDK是微信公众平台面向网页开发者提供的基于微信内的网页开发工具包。
    通过微信JS-SDK,网页开发者可使用拍照、选图、语音、位置等手机系统的能力,
    同时可以直接使用微信分享、扫一扫、卡券、支付等微信特有的能力。
  ?
    所有使用微信JS SDK的网站,都必须实名到微信认证、缴费。它采取了类似Apple App Store的策略,由系统运营方来保障用户的安全。
    所有能使用微信增强能力的网页都是经过认证权限的
  JSSDK使用步骤
    步骤一：绑定域名
      先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
      如果你使用了支付类接口,请确保支付目录在该安全域名下,否则将无法完成支付。
      备注：登录后可在“开发者中心”查看对应的接口权限。
    步骤二：引入JS文件
      在需要调用JS接口的页面引入如下JS文件
        http://res.wx.qq.com/open/js/jweixin-1.0.0.js
      使用https协议,务必引入 https://res.wx.qq.com/open/js/jweixin-1.0.0.js ,
        否则将无法在iOS9.0以上系统中成功使用JSSDK
      如需使用摇一摇周边功能,请引入 jweixin-1.1.0.js
      备注：支持使用 AMD/CMD 标准模块加载方法加载
    步骤三：通过config接口注入权限验证配置
      所有需要使用JS-SDK的页面必须先注入配置信息,否则将无法调用,
      同一个url仅需调用一次,对于变化url的SPA的web app可在每次url变化时进行调用,
      目前Android微信客户端不支持 pushState 的H5新特性,
      所以使用pushState来实现web app的页面会导致签名失败,此问题会在Android6.2中修复）。
      wx.config({
        debug: true, 
        // 开启调试模式,调用的所有api的返回值会在客户端alert出来,
        // 若要查看传入的参数,可以在pc端打开,参数信息会通过log打出,仅在pc端时才会打印。
        appId: '',    // 必填,公众号的唯一标识
        timestamp: ,  // 必填,生成签名的时间戳
        nonceStr: '', // 必填,生成签名的随机串
        signature: '',// 必填,签名,见附录1
        jsApiList: [] // 必填,需要使用的JS接口列表,所有JS接口列表见附录2
      });
    步骤四：通过ready接口处理成功验证
      wx.ready(function(){
        // config信息验证后会执行ready方法,所有接口调用都必须在config接口获得结果之后,
        // config是一个客户端的异步操作,所以如果需要在页面加载时就调用相关接口,则须把相关接口放在ready函数中调用来确保正确执行。
        // 对于用户触发时才调用的接口,则可以直接调用,不需要放在ready函数中。
      });
    步骤五：通过error接口处理失败验证
      wx.error(function(res){
        // config信息验证失败会执行error函数,如签名过期导致验证失败,
        // 具体错误信息可以打开config的debug模式查看,
        // 也可以在返回的res参数中查看,对于SPA可以在这里更新签名。
      });    
  接口调用说明
    PS：所有接口通过wx对象(也可使用jWeixin对象)来调用,参数是一个对象,
    除了每个接口本身需要传的参数之外,还有以下通用参数：
      success  接口调用成功时执行的回调函数。
      fail     接口调用失败时执行的回调函数。
      complete 接口调用完成时执行的回调函数,无论成功或失败都会执行。
      cancel   用户点击取消时的回调函数,仅部分有用户取消操作的api才会用到。
      trigger  监听Menu中的按钮点击时触发的方法,该方法仅支持Menu中的相关接口。
        不要尝试在trigger中使用ajax异步请求修改本次分享的内容,
        因为客户端分享操作是一个同步操作,这时候使用ajax的回包会还没有返回。
      以上几个函数都带有一个参数,类型为对象,
      其中除了每个接口本身返回的数据之外,还有一个通用属性errMsg,其值格式如下：
      调用成功时："xxx:ok" ,其中xxx为调用的接口名
      用户取消时："xxx:cancel",其中xxx为调用的接口名
      调用失败时：其值为具体错误信息    
  基础接口
    判断当前客户端版本是否支持指定JS接口
    wx.checkJsApi({
      jsApiList: ['chooseImage'], // 需要检测的JS接口列表,所有JS接口列表见附录2,
      success: function(res) {
        // 以键值对的形式返回,可用的api值true,不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
      }
    });
    备注：checkJsApi接口是客户端6.0.2新引入的一个预留接口,第一期开放的接口均可不使用checkJsApi来检测。
  分享接口
    请注意不要有诱导分享等违规行为,对于诱导分享行为将永久回收公众号接口权限,详细规则请查看：朋友圈管理常见问题 。
    获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
    wx.onMenuShareTimeline({
        title: '', // 分享标题
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        success: function () { 
            // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    });
    获取“分享给朋友”按钮点击状态及自定义分享内容接口
      wx.onMenuShareAppMessage({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        type: '', // 分享类型,music、video或link,不填默认为link
        dataUrl: '', // 如果type是music或video,则要提供数据链接,默认为空
        success: function () { 
          // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
          // 用户取消分享后执行的回调函数
        }
      });
    获取“分享到QQ”按钮点击状态及自定义分享内容接口
      wx.onMenuShareQQ({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        success: function () { 
          // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
          // 用户取消分享后执行的回调函数
        }
      });
    获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
      wx.onMenuShareWeibo({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        success: function () { 
          // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
          // 用户取消分享后执行的回调函数
        }
      });
    获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
      wx.onMenuShareQZone({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        success: function () { 
          // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
          // 用户取消分享后执行的回调函数
        }
      });
  图像接口
    拍照或从手机相册中选图接口
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图,默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机,默认二者都有
        success: function (res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表,localId可以作为img标签的src属性显示图片
        }
      });
    预览图片接口
      wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: [] // 需要预览的图片http链接列表
      });
    上传图片接口
      wx.uploadImage({
          localId: '', // 需要上传的图片的本地ID,由chooseImage接口获得
          isShowProgressTiPS： 1, // 默认为1,显示进度提示
          success: function (res) {
              var serverId = res.serverId; // 返回图片的服务器端ID
          }
      });
      备注：上传图片有效期3天,可用微信多媒体接口下载图片到自己的服务器,此处获得的 serverId 即 media_id,参考文档 ../12/58bfcfabbd501c7cd77c19bd9cfa8354.html 目前多媒体文件下载接口的频率限制为10000次/天,如需要调高频率,请邮件weixin-open@qq.com,邮件主题为【申请多媒体接口调用量】,请对你的项目进行简单描述,附上产品体验链接,并对用户量和使用量进行说明。
    下载图片接口
      wx.downloadImage({
          serverId: '', // 需要下载的图片的服务器端ID,由uploadImage接口获得
          isShowProgressTiPS： 1, // 默认为1,显示进度提示
          success: function (res) {
              var localId = res.localId; // 返回图片下载后的本地ID
          }
      });
  音频接口
    开始录音接口 
      wx.startRecord();
    停止录音接口   
      wx.stopRecord({
          success: function (res) {
              var localId = res.localId;
          }
      });
    监听录音自动停止接口
      wx.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
        complete: function (res) {
          var localId = res.localId; 
        }
      });
    播放语音接口
      wx.playVoice({
          localId: '' // 需要播放的音频的本地ID,由stopRecord接口获得
      });
    暂停播放接口
      wx.pauseVoice({
          localId: '' // 需要暂停的音频的本地ID,由stopRecord接口获得
      });
    停止播放接口
      wx.stopVoice({
          localId: '' // 需要停止的音频的本地ID,由stopRecord接口获得
      });
    监听语音播放完毕接口
      wx.onVoicePlayEnd({
          success: function (res) {
              var localId = res.localId; // 返回音频的本地ID
          }
      });
    上传语音接口
      wx.uploadVoice({
          localId: '', // 需要上传的音频的本地ID,由stopRecord接口获得
          isShowProgressTiPS： 1, // 默认为1,显示进度提示
              success: function (res) {
              var serverId = res.serverId; // 返回音频的服务器端ID
          }
      });
      备注：上传语音有效期3天,可用微信多媒体接口下载语音到自己的服务器,此处获得的 serverId 即 media_id,参考文档 ../12/58bfcfabbd501c7cd77c19bd9cfa8354.html 目前多媒体文件下载接口的频率限制为10000次/天,如需要调高频率,请邮件weixin-open@qq.com,邮件主题为【申请多媒体接口调用量】,请对你的项目进行简单描述,附上产品体验链接,并对用户量和使用量进行说明。
    下载语音接口
      wx.downloadVoice({
          serverId: '', // 需要下载的音频的服务器端ID,由uploadVoice接口获得
          isShowProgressTiPS： 1, // 默认为1,显示进度提示
          success: function (res) {
              var localId = res.localId; // 返回音频的本地ID
          }
      });
  识别音频并返回识别结果接口
    wx.translateVoice({
       localId: '', // 需要识别的音频的本地Id,由录音相关接口获得
        isShowProgressTiPS： 1, // 默认为1,显示进度提示
        success: function (res) {
            alert(res.translateResult); // 语音识别的结果
        }
    });
  获取网络状态接口
    wx.getNetworkType({
        success: function (res) {
            var networkType = res.networkType; // 返回网络类型2g,3g,4g,wifi
        }
    });
  地理位置
    使用微信内置地图查看位置接口
      wx.openLocation({
        latitude: 0, // 纬度,浮点数,范围为90 ~ -90
        longitude: 0, // 经度,浮点数,范围为180 ~ -180。
        name: '', // 位置名
        address: '', // 地址详情说明
        scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
    });
    获取地理位置接口
      wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标,如果要返回直接给openLocation用的火星坐标,可传入'gcj02'
          success: function (res) {
              var latitude = res.latitude; // 纬度,浮点数,范围为90 ~ -90
              var longitude = res.longitude; // 经度,浮点数,范围为180 ~ -180。
              var speed = res.speed; // 速度,以米/每秒计
              var accuracy = res.accuracy; // 位置精度
          }
      });
    摇一摇周边
      开启查找周边ibeacon设备接口
      wx.startSearchBeacons({
        ticket:"",  //摇周边的业务ticket, 系统自动添加在摇出来的页面链接后面
        complete:function(argv){
          //开启查找完成后的回调函数
        }
      });
      备注：上述摇一摇周边接口使用注意事项及更多返回结果说明,请参考：摇一摇周边获取设备信息
    备注：如需接入摇一摇周边功能,请参考：申请开通摇一摇周边
    关闭查找周边ibeacon设备接口
      wx.stopSearchBeacons({
        complete:function(res){
          //关闭查找完成后的回调函数
        }
      });
    监听周边ibeacon设备接口
      wx.onSearchBeacons({
        complete:function(argv){
          //回调函数,可以数组形式取得该商家注册的在周边的相关设备列表
        }
      });
  界面操作
    隐藏右上角菜单接口
      wx.hideOptionMenu();
    显示右上角菜单接口
      wx.showOptionMenu();
    关闭当前网页窗口接口
      wx.closeWindow();
    批量隐藏功能按钮接口
      wx.hideMenuItems({
          menuList: [] // 要隐藏的菜单项,只能隐藏“传播类”和“保护类”按钮,所有menu项见附录3
      });
    批量显示功能按钮接口
      wx.showMenuItems({
          menuList: [] // 要显示的菜单项,所有menu项见附录3
      });
    隐藏所有非基础按钮接口
      wx.hideAllNonBaseMenuItem();
      // “基本类”按钮详见附录3
    显示所有功能按钮接口
      wx.showAllNonBaseMenuItem();
    微信扫一扫
      调起微信扫一扫接口
      wx.scanQRCode({
        needResult: 0, // 默认为0,扫描结果由微信处理,1则直接返回扫描结果,
        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码,默认二者都有
        success: function (res) {
          var result = res.resultStr; // 当needResult 为 1 时,扫码返回的结果
        }
      });    
  跳转微信商品页接口
    wx.openProductSpecificView({
      productId: '', // 商品id
      viewType: '' // 0.默认值,普通商品详情页1.扫一扫商品详情页2.小店商品详情页
    });    
  微信卡券
    微信卡券接口中使用的签名凭证api_ticket,与步骤三中config使用的签名凭证jsapi_ticket不同,开发者在调用微信卡券JS-SDK的过程中需依次完成两次不同的签名,并确保凭证的缓存。
    获取api_ticket
      api_ticket 是用于调用微信卡券JS API的临时票据,有效期为7200 秒,通过access_token 来获取。
    开发者注意事项：
      1.此用于卡券接口签名的api_ticket与步骤三中通过config接口注入权限验证配置使用的jsapi_ticket不同。
      2.由于获取api_ticket 的api 调用次数非常有限,频繁刷新api_ticket 会导致api调用受限,影响自身业务,开发者需在自己的服务存储与更新api_ticket。
    接口调用请求说明
      http请求方式: GET
      https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=wx_card
    参数说明
      参数	是否必须	说明
      access_token	是	调用接口凭证
      返回数据
    数据示例：
      {
        "errcode":0,
        "errmsg":"ok",
        "ticket":"bxLdikRXVbTPdHSM05e5u5sUoXNKdvsdshFKA",
        "expires_in":7200
      }
      参数名	描述
      errcode	错误码
      errmsg	错误信息
      ticket	api_ticket,卡券接口中签名所需凭证
      expires_in	有效时间    
    拉取适用卡券列表并获取用户选择信息
      wx.chooseCard({
        shopId: '', // 门店Id
        cardType: '', // 卡券类型
        cardId: '', // 卡券Id
        timestamp: 0, // 卡券签名时间戳
        nonceStr: '', // 卡券签名随机串
        signType: '', // 签名方式,默认'SHA1'
        cardSign: '', // 卡券签名
        success: function (res) {
          var cardList= res.cardList; // 用户选中的卡券列表信息
        }
      });
      参数名	必填	类型	示例值	描述
      shopId	否	string(24)	1234	门店ID。shopID用于筛选出拉起带有指定location_list(shopID)的卡券列表,非必填。
      cardType	否	string(24)	GROUPON	卡券类型,用于拉起指定卡券类型的卡券列表。当cardType为空时,默认拉起所有卡券的列表,非必填。
      cardId	否	string(32)	p1Pj9jr90_SQRaVqYI239Ka1erk	卡券ID,用于拉起指定cardId的卡券列表,当cardId为空时,默认拉起所有卡券的列表,非必填。
      timestamp	是	string(32)	14300000000	时间戳。
      nonceStr	是	string(32)	sduhi123	随机字符串。
      signType	是	string(32)	SHA1	签名方式,目前仅支持SHA1
      cardSign	是	string(64)	abcsdijcous123	签名。
      cardSign详见附录4。开发者特别注意：签名错误会导致拉取卡券列表异常为空,请仔细检查参与签名的参数有效性。
      
      特别提醒
      拉取列表仅与用户本地卡券有关,拉起列表异常为空的情况通常有三种：签名错误、时间戳无效、筛选机制有误。请开发者依次排查定位原因。    
    批量添加卡券接口
      wx.addCard({
          cardList: [{
              cardId: '',
              cardExt: ''
          }], // 需要添加的卡券列表
          success: function (res) {
              var cardList = res.cardList; // 添加的卡券列表信息
          }
      });
      cardExt详见附录4,值得注意的是,这里的card_ext参数必须与参与签名的参数一致,格式为字符串而不是Object,否则会报签名错误。    
    查看微信卡包中的卡券接口
      wx.openCard({
          cardList: [{
              cardId: '',
              code: ''
          }]// 需要打开的卡券列表
      });
    核销后再次赠送卡券接口
      wx.consumeAndShareCard({
          cardId: '',
          code: ''
      });
      参数说明：
      
      参数	说明
      cardId	上一步核销的card_id,若传入错误的card_id会报错
      code	上一步核销的code,若传入错误的code会报错
      注意：
      
      该接口只支持微信6.3.6以上版本的客户端,开发者在调用时需要注意两点：
      
      1.需要引入1.1.0版本的js文件： https://res.wx.qq.com/open/js/jweixin-1.1.0.js
      
      2.需要判断用户客户端版本号,做出容错处理,详情点击：判断当前客户端版本是否支持指定JS接口
    发起一个微信支付请求
      wx.chooseWXPay({
          timestamp: 0, // 支付签名时间戳,注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: '', // 支付签名随机串,不长于 32 位
          package: '', // 统一支付接口返回的prepay_id参数值,提交格式如：prepay_id=***）
          signType: '', // 签名方式,默认为'SHA1',使用新版支付需传入'MD5'
          paySign: '', // 支付签名
          success: function (res) {
              // 支付成功后的回调函数
          }
      });
      备注：prepay_id 通过微信支付统一下单接口拿到,paySign 采用统一的微信支付 Sign 签名生成方法,注意这里 appId 也要参与签名,appId 与 config 中传入的 appId 一致,即最后参与签名的参数有appId, timeStamp, nonceStr, package, signType。
      请注意该接口只能在你配置的支付目录下调用,同时需确保支付目录在JS接口安全域名下。
      微信支付开发文档：https://pay.weixin.qq.com/wiki/doc/api/index.html
遇到的问题 
  ios 
    滑动当前div使其他div产生滚动效果
ios 
  iOS 10.3+ 可通过给 input[type='file'] 的标签里指定 capture="user" 来调用手机前置摄像头
android
---------------------------------------------------------------------------todo
nginx配置步骤及说明
  nginx介绍:
    Nginx ("engine x") 是一个高性能的HTTP和反向代理服务器，也是一个IMAP/POP3/SMTP服务器。Nginx是由Igor Sysoev为俄罗斯访问量第二的Rambler.ru站点开发的，第一个公开版本0.1.0发布于2004年10月4日。其将源代码以类BSD许可证的形式发布，因它的稳定性、丰富的功能集、示例配置文件和低系统资源的消耗而闻名。2011年6月1日，nginx 1.0.4发布。Nginx是一款轻量级的Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，并在一个BSD-like 协议下发行。由俄罗斯的程序设计师Igor Sysoev所开发，供俄国大型的入口网站及搜索引擎Rambler（俄文：Рамблер）使用。其特点是占有内存少，并发能力强，事实上nginx的并发能力确实在同类型的网页服务器中表现较好.
                                          -----摘自百度百科
  nginx安装
    nginx下载:
      官网网址:http://nginx.org/
      点击 2014(以2004版本为例进行说明,后续不再赘述) ;
      然后选择 2014-12-23日更新的nginx-1.7.9版本 ;
      选择稳定版 Stable version 下的第三个 nginx/Windows-1.10.1 进行下载.
    安装
      将下载的压缩包解压到你想安装的位置,然后打开文件夹找到nginx.exe双击; 
        PS:有个黑色弹框一闪而过,说明它启动；
      打开浏览器,地址栏输入 localhost ,出现 Welcome to nginx! 表示安装成功;
    测试
      配置说明
        Nginx的配置文件是conf文件下的nginx.conf，其实配置文件可以默认不修改,你通过浏览器输入localhost后出现的页面即为html文件夹下的index.html.所以你可以将你想要检测的文件放到HTML文件夹中，并将原本的index.html文件给删了，这个时候打开网页输入localhost，使用ctrl+F5清下浏览器缓存即出现你产品中的index.html(产品的首页都会命名为index.html）页面，然后在进行一系列测试.
        配置修改
          前面说到配置可以不修改，但在实际测试过程中，一般不大可能会将产品往nginx里的html文件夹中塞，这个时候咱们就得改下配置了；
          打开nginx文件夹下的conf文件夹，里面有个nginx.conf文件，用阅读工具如记事本之类打开它；举个栗子：
            默认网站根目录为/usr/local/nginx/html，要将它改成/homw/www
            用文本编辑软件打开nginx.conf
            将其中的
            location / {
            root html;
            index index.php index.html index.htm;
            }
            改为
            location / {
            root /home/www;
            index index.php index.html index.htm;
            }
            然后再将
            location ~ \.php$ {
            root html;
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
            }
            改为
            location ~ \.php$ {
            root /home/www;
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
            }
            然后重启nginx

  PS:若安装出现问题很可能是你的软件目录下有中文，建议大家养成一个好习惯，所有的软件安装目录都用英文，哪怕是拼音也行，因为毕竟从系统到软件，大多是国外的，中文路径容易出问题。
  “默认网站根目录为/usr/local/nginx/html，要将它改成/home/www”，这句话的意思就是，把默认路径从nginx/html改成你自己放置代码的路径，这里的home/www只是举的一个相对路径的栗子，大家也可以改成绝对路径，我个人是不习惯把软件跟文件放一起的，我们先来看下原配置文件
          server {
          listen 80;
          server_name localhost;
          #charset koi8-r;
          #access_log logs/host.access.log main;
          location / {
          root html;
          index index.html index.htm;
          }
          #error_page 404 /404.html;
          # redirect server error pages to the static page /50x.html
          #
          error_page 500 502 503 504 /50x.html;
          location = /50x.html {
          root html;
          }
          # proxy the PHP scripts to Apache listening on 127.0.0.1:80
          #
          #location ~ \.php$ {
          # proxy_pass http://127.0.0.1;
          #}
          # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
          #
          #location ~ \.php$ {
          # root html;
          # fastcgi_pass 127.0.0.1:9000;
          # fastcgi_index index.php;
          # fastcgi_param SCRIPT_FILENAME /scripts$fastcgi_script_name;
          # include fastcgi_params;
          #}
          “下面我们仔细来分析一下：
          listen：表示当前的代理服务器监听的端口，默认的是监听80端口。注意，如果我们配置了多个server，这个listen要配置不一样，不然就不能确定转到哪里去了。
          server_name：表示监听到之后需要转到哪里去，这时我们直接转到本地，这时是直接到nginx文件夹内。
          location：表示匹配的路径，这时配置了/表示所有请求都被匹配到这里
          root：里面配置了root，表示当匹配这个请求的路径时，将会在这个文件夹内寻找相应的文件，这里对我们之后的静态文件伺服很有用。
          index：当没有指定主页时，默认会选择这个指定的文件，它可以有多个，并按顺序来加载，如果第一个不存在，则找第二个，依此类推。
          下面的error_page是代表错误的页面，这里我们暂时不用，先不管它 ”
          （上面这段分析文字，引用自 tomcat结合nginx使用小结）

          接下来的任务就很明确了，把listen 80下面的两个 root html中的路径，改成我们自己放代码的文件夹，例如在E盘下面新建一个home的文件夹，再在目录下新建一个www的文件夹，那么路径就是：E:\home\www，把task1.html放进去，然后修改配置

          server {
          listen 80;
          server_name localhost;

          #charset koi8-r;

          #access_log logs/host.access.log main;

          location / {
          root E:\home\www;
          index index.html index.htm;
          }

          #error_page 404 /404.html;

          # redirect server error pages to the static page /50x.html
          #
          error_page 500 502 503 504 /50x.html;
          location = /50x.html {
          root html;
          }

          # proxy the PHP scripts to Apache listening on 127.0.0.1:80
          #
          #location ~ \.php$ {
          # proxy_pass http://127.0.0.1;
          #}

          # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
          #
          #location ~ \.php$ {
          # root E:\home\www;
          # fastcgi_pass 127.0.0.1:9000;
          # fastcgi_index index.php;
          # fastcgi_param SCRIPT_FILENAME /scripts$fastcgi_script_name;
          # include fastcgi_params;
          #}

          只改上面两处红字（知乎不能改变文字颜色？那就加粗好了）的地方就可以了，然后用任务管理器 （ctrl+alt+delete）关闭nginx进程，可能有好几个，全都关掉，然后重新打开nginx，浏览器输入http://localhost/task1.html，就可以正常访问了，如果还是访问不了的话，在localhost上加上端口：80试试~
          （其实我理解的是，只要路径正确就行，但是我换了其他的文件夹名字，例如E:\wy\task，E:\task等，都失败了，提示404错误，不知道是不是我访问的姿势不对，我试了一个多小时都不行...ORZ）

          另外，@19 师弟：手机访问我研究出来了，不需要电脑共享文件
          首先，电脑和手机连接上同一个wifi
          然后查看电脑ip:win+R→cmd→ipconfig→回车, 找到无限局域网适配器wlan中的ip地址，例如我的是192.168.0.119
          然后手机浏览器中输入192.168.01.119/task1.html 就可以看到自己的代码啦~

          PS：手机访问还有另外两个方法
          1、代码上传至服务器，直接用ip访问
          2、谷歌浏览器的F12调试中，左上角有个手机的图标，点那个就可以模拟移动设备访问，有很多不同尺寸的手机，苹果、三星、洛基亚之类的，木有小米 0.0


          感想：
          1、感谢@19 师弟的耐心指导，没想到12点了还在，下次有人问你这个问题，把这篇日报给他看就行啦~
          2、我在夜猫子的路上一去不复返了..orz


          2016.03.05 更新
          在群里看到老大帮师弟解答问题，顺便也解了我先前的疑惑
          为什么用E:\wy\task，E:\task等路径都显示错误，都是转义字符的锅


          所有的转义字符和所对应的意义：
          转义字符
          意义
          ASCII码值（十进制）
          \a
          响铃(BEL)
          007
          \b
          退格(BS) ，将当前位置移到前一列
          008
          \f
          换页(FF)，将当前位置移到下页开头
          012
          \n
          换行(LF) ，将当前位置移到下一行开头
          010
          \r
          回车(CR) ，将当前位置移到本行开头
          013
          \t
          水平制表(HT) （跳到下一个TAB位置）
          009
          \v
          垂直制表(VT)
          011
          \\
          代表一个反斜线字符''\'
          092
          \'
          代表一个单引号（撇号）字符
          039
          \"
          代表一个双引号字符
          034
          \?
          　　代表一个问号
          　　063
          \0
          空字符(NULL)
          000
          \ddd
          1到3位八进制数所代表的任意字符
          三位八进制
          \xhh
          1到2位十六进制所代表的任意字符
          二位十六进制
          注意：区分，斜杠："/" 与 反斜杠："\" ,此处不可互换
          来源： 转义字符_百度百科
          先前我路径中的\t被自动转换成制表符了，所以读取不了目录，换成mytask就行了
          另外，也明白了看错误日志的重要性
          nginx路径下的\logs\error.log就是错误日志，复制里面的内容去百度就行
          其他很多软件应该也是类似原理
          再次感谢老大~

          PS:
          1、先前我口中的@19 师弟，原来是首席大师兄，失敬，失敬
          2、@苏哈哈 师兄补充的一条：#号是注释符号

























































