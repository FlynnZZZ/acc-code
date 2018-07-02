API 
  PS: 
界面 
  wx.setNavigationBarTitle({ // 动态设置当前页面标题 
    title: str // 必选,页面标题文字 
    ,success: function(){    // 可选,调用成功的回调 
      // 
    }
    ,fail: function(){ }     // 可选,调用失败的回调 
    ,complete: function(){ } // 可选,调用结束的回调 
  })
  wx.pageScrollTo({ // 将页面滚动到目标位置 '1.4.0' 
    scrollTop: <num>, // 滚动到页面的目标位置,单位: px 
  })
  wx.startPullDownRefresh({ // 开始下拉刷新 '1.5.0+' 
    PS: 调用后触发下拉刷新动画,效果与用户手动下拉刷新一致 
    success: function(){  // 可选,调用成功的回调 
      // 
    }
    ,fail: function(){     // 可选,调用失败的回调 
      // 
    }
    ,complete: function(){ // 可选,调用结束的回调 
      // 
    }
  })
  wx.stopPullDownRefresh()  // 停止当前页面下拉刷新 
    PS: 可停止手动/.startPullDownRefresh 的下拉刷新 
  wx.setTopBarText({ // 动态设置置顶栏文字内容 '1.4.3'
    PS: 只有当前小程序被置顶时能生效,如果当前小程序没有被置顶,也能调用成功,
      但是不会立即生效,只有在用户将这个小程序置顶后才换上设置的文字内容。
      注意:调用成功后,需间隔 5s 才能再次调用此接口,
      如果在 5s 内再次调用此接口,会回调 fail,errMsg:"setTopBarText: fail invoke too frequently"
    text: str // 置顶栏文字内容
    ,cfoo
  })
  设置tabBar 
    wx.setTabBarBadge({  // 为tabBar某一项的右上角添加文本 '1.9.0+'
      index: <num>  // 必填,tabBar的哪一项,从左边算起
      ,text: <str>  // 必填,显示的文本,超过 3 个字符则显示成“…”
      ,success: function(){ // 调用成功的回调 
        // 
      }  
      ,fail: function(){    // 调用失败的回调
        // 
      }
      ,complete: function(){// 调用结束的回调
        // 
      }  
    })
    wx.removeTabBarBadge({ // 移除 tabBar 某一项右上角的文本 '1.9.0+'
      index: <num>  // 必选,tabBar的哪一项,从左边算起
      ,success: function(){ // 调用成功的回调 
        // 
      }  
      ,fail: function(){    // 调用失败的回调
        // 
      }
      ,complete: function(){// 调用结束的回调
        // 
      }  
    })
    wx.showTabBarRedDot({  // 显示 tabBar 某一项的右上角的红点 '1.9.0+'
      index: <num> // 必选,tabBar的哪一项,从左边算起
      ,success: function(){ // 调用成功的回调 
        // 
      }  
      ,fail: function(){    // 调用失败的回调
        // 
      }
      ,complete: function(){// 调用结束的回调
        // 
      }  
    })
    wx.hideTabBarRedDot({  // 隐藏 tabBar 某一项的右上角的红点 '1.9.0+'
      index: <num> // 必选,tabBar的哪一项,从左边算起
      ,success: function(){ // 调用成功的回调 
        // 
      }  
      ,fail: function(){    // 调用失败的回调
        // 
      }
      ,complete: function(){// 调用结束的回调
        // 
      }  
    })
    wx.setTabBarStyle({  // 动态设置 tabBar 的整体样式 '1.9.0+' 
      color: <HexColor>  // tab 上的文字默认颜色
      ,selectedColor: <HexColor>  // tab 上的文字选中时的颜色
      ,backgroundColor: <HexColor> //  tab 的背景色
      ,borderStyle: <kw> // tabbar上边框的颜色 
        'black'
        'white'
      ,success: function(){ // 调用成功的回调 
        // 
      }  
      ,fail: function(){    // 调用失败的回调
        // 
      }
      ,complete: function(){// 调用结束的回调
        // 
      }  
    }) 
    wx.setTabBarItem({   // 动态设置tabBar某一项的内容 '1.9.0+'
      index: <num>  // 必选,tabBar的哪一项,从左边算起
      ,text: <str>  // tab 上按钮文字
      ,iconPath: <str>  // 图片路径 
        icon 大小限制为40kb,建议尺寸为 81px * 81px,
        当 postion 为 top 时,此参数无效,不支持网络图片
      ,selectedIconPath: <str>  // 选中时的图片路径 
        icon 大小限制为40kb,建议尺寸为 81px * 81px ,
        当 postion 为 top 时,此参数无效
      ,success: function(){ // 调用成功的回调 
        // 
      }  
      ,fail: function(){    // 调用失败的回调
        // 
      }
      ,complete: function(){// 调用结束的回调
        // 
      }  
    })
    wx.showTabBar({  // 显示 tabBar '1.9.0+'
      animation: <bol>  // 是否需要动画效果,默认:false 
      ,success: function(){ // 调用成功的回调 
        // 
      }  
      ,fail: function(){    // 调用失败的回调
        // 
      }
      ,complete: function(){// 调用结束的回调
        // 
      }  
    }) 
      PS: 前提是该页面具有tabBar, 否则不生效 
    wx.hideTabBar({  // 隐藏 tabBar '1.9.0+'
      animation: <bol>  // 是否需要动画效果,默认:false 
      ,success: function(){ // 调用成功的回调 
        // 
      }  
      ,fail: function(){    // 调用失败的回调
        // 
      }
      ,complete: function(){// 调用结束的回调
        // 
      }  
    })
  交互反馈 
    PS: 'showLoading'和'showToast'同时只能显示一个,
      使用'hideLoading'/'hideToast'都可以关闭提示框 
    wx.showLoading({  // 显示loading提示框 '1.1.0+'
      PS: 需主动调用 wx.hideLoading() 才能关闭提示框  
      title: <str>  // 必选,提示的内容
      ,mask: <bol>  // 是否显示透明蒙层,防止触摸穿透,默认:false
      ,cfoo
    })
    wx.hideLoading()  // 隐藏loading提示框 '1.1.0+'
    wx.showToast({ // 显示消息提示框 
      title: '提示的内容'  // 必选    
      ,icon: <kw>      // 显示的图标 
        "success"
        "loading"  
      ,image: '<path>' // 自定义图标的本地路径,优先级高于'icon'  '1.1.0+'
      ,duration: <num> // 提示的延迟时间,单位:ms,默认:1500  
      ,mask: <bol>     // 是否显示透明蒙层,防止触摸穿透,默认:false  
      ,cfoo
    }) 
    wx.hideToast() // 隐藏消息提示框
    wx.showModal({  // ​显示模态弹窗 
      PS: iOS点击蒙层不会关闭模态弹窗,所以尽量避免使用“取消”分支中实现业务逻辑   
      title: <str>    // 必选,提示的标题
      ,content: <str> // 必选,提示的内容
      ,showCancel: <bol>     // 是否显示取消按钮,默认:true
      ,cancelText: <str>     // 取消按钮的文字,默认:"取消",最多 4 个字符
      ,cancelColor: "#ccc" // 取消按钮的文字颜色,默认:"#000000"
      ,confirmText: str    // 确定按钮的文字,默认:"确定",最多 4 个字符
      ,confirmColor: "#fff"// 确定按钮的文字颜色,默认:"#3CC51F"
      ,success: function(res){
        res 
          .confirm bol,用户是否点击了确定按钮 
            Android'6.3.30',返回的'confirm'一直为'true' 
          .cancel  bol,用户是否点击了取消
            用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭 '1.1.0'
      }
      ,fail: function(){ }
      ,complete: function(){ }
    })
    wx.showActionSheet({ // ​显示操作菜单 
      itemList: [   // 必选,按钮的文字数组,数组长度最大为6个
        // 
      ]
      ,itemColor: '#ccc'  // 按钮的文字颜色,默认:"#000000"
      ,success: function(res){
        res 
          .tapIndex num,用户点击的按钮,从上到下的顺序,从0开始
      }
      ,fail: function(){  // 点击取消/蒙层时回调  
        errMsg 为 "showActionSheet:fail cancel"；
      }
      ,complete: function(){ }
    })
  设置导航条 
    wx.showNavigationBarLoading() // 在当前页面显示导航条加载动画 
    wx.hideNavigationBarLoading() // 隐藏导航条加载动画 
    wx.setNavigationBarColor({ // 设置导航条颜色 '1.4.0+'
      frontColor: <kw>  // 必选,前景颜色值,包括按钮/标题/状态栏的颜色
        '#ffffff' 
        '#000000'
      ,backgroundColor: <HexColor> // 必选,背景颜色值 
      ,animation: {     // 动画效果 
        duration: <num>    // 动画变化时间,单位:ms,默认:0
        ,timingFunc: <kw>, // 动画变化方式  
          'linear'    动画从头到尾的速度是相同的,默认值   
          'easeIn'    动画以低速开 
          'easeOut'   动画以低速结束 
          'easeInOut' 动画以低速开始和结束 
      }
      ,cfoo
    })
  导航 
    PS: 导航的地址都为相对地址, 不可为外链 
    wx.navigateTo({ // 保留当前页面,跳转到应用内的某个页面  
      PS: 为了不让用户在使用小程序时造成困扰,规定页面路径只能是五层,请尽量避免多层级的交互方式 
      url: str // 需要跳转的非tabBar的页面的路径,路径后可以带参数  
      ,cfoo 
    })
    wx.redirectTo({ // 关闭当前页面,跳转到应用内的某个页面 
      url: str // 需跳转的非tabBar的页面的路径
      ,cfoo 
    })
    wx.switchTab({  // 跳转到tabBar页面,并关闭其他所有非tabBar页面 
      url: str // 需跳转的tabBar页面的路径,路径后不能带参数
    })
    wx.reLaunch({   // 关闭所有页面,打开到应用内的某个页面[可打开任意页]  '1.1.0'
      url: str // 需要跳转的应用内页面路径,如果跳转的页面路径是tabBar页面则不能带参数 
      cfoo
    })
    wx.navigateBack({ // 关闭当前页面,返回上一页面或多级页面 
      PS: 可通过 getCurrentPages()) 获取当前的页面栈,决定需要返回几层。
      delta: <num> // 返回的页面数,默认: 1 
        如果 delta 大于现有页面数,则返回到首页
    })
  动画 
    wx.createAnimation({ // 创建一动画实例 animationInstance 
      PS: 调用实例的方法来描述动画,
        最后通过动画实例的'export'方法导出动画数据传递给组件的animation属性。
        'export'方法每次调用后会清掉之前的动画操作
      duration: <num>       // 动画持续时间,单位:ms,默认:400 
      ,timingFunction: <kw> // 定义动画的效果 
        'linear' 动画从头到尾的速度是相同的,默认值 
        'ease'        动画以低速开始,然后加快,在结束前变慢
        'ease-in'     动画以低速开始
        'ease-in-out' 动画以低速开始和结束
        'ease-out'    动画以低速结束
        'step-start'  动画第一帧就跳至结束状态直到结束
        'step-end'    动画一直保持开始状态,最后一帧跳到结束状态
      ,delay: <num>         // 动画延迟时间,单位:ms,默认:0 
      ,transformOrigin: str // 设置transform-origin,默认:"50% 50% 0" 
    })
    animationInstance 动画实例可调用以下方法来描述动画 
      PS: 调用结束后会返回自身,支持链式调用的写法 
      ★样式
      .opacity(num)  // 透明度,参数范围 0~1
      .backgroundColor(str) // 颜色值
      .width(num/str)  // 长度值,如果传入num则默认使用px,可传入其他自定义单位的长度值
      .height(num/str) // 长度值,如果传入num则默认使用px,可传入其他自定义单位的长度值
      .top(num/str)    // 长度值,如果传入num则默认使用px,可传入其他自定义单位的长度值
      .left(num/str)   // 长度值,如果传入num则默认使用px,可传入其他自定义单位的长度值
      .bottom(num/str) // 长度值,如果传入num则默认使用px,可传入其他自定义单位的长度值
      .right(num/str)  // 长度值,如果传入num则默认使用px,可传入其他自定义单位的长度值
      ★旋转
      .rotate(XXdeg)  // 范围-180~180,从原点顺时针旋转一个deg角度
      .rotateX(XXdeg) // 范围-180~180,在X轴旋转一个deg角度
      .rotateY(XXdeg) // 范围-180~180,在Y轴旋转一个deg角度
      .rotateZ(XXdeg) // 范围-180~180,在Z轴旋转一个deg角度
      .rotate3d(x,y,z,XXdeg) // 同transform-function rotate3d
      ★缩放 
      .scale(x[,y]) // 一参数表示X轴、Y轴同时缩放x倍；两参数表示X轴缩放x倍,Y轴缩放y倍 
      .scaleX(num)  // 在X轴缩放sx倍数
      .scaleY(num)  // 在Y轴缩放sy倍数
      .scaleZ(num)  // 在Z轴缩放sy倍数
      .scale3d(x,y,z) // 在X轴缩放sx倍数,在Y轴缩放sy倍数,在Z轴缩放sz倍数
      ★偏移
      .translate(x ,y?) // 一参数表示在X轴偏移x,两参数表示在X轴偏移x,Y轴偏移y,单位px 
      .translateX(num)  // 在X轴偏移num,单位px
      .translateY(num)  // 在Y轴偏移num,单位px
      .translateZ(num)  // 在Z轴偏移num,单位px
      .translate3d(x,y,z) // 在X轴偏移x,在Y轴偏移y,在Z轴偏移z,单位px
      ★倾斜 
      .skew(x ,y?)  
        // 一参数,Y轴坐标不变,X轴坐标延顺时针倾斜x度；两个参数时,分别在X轴倾斜x度,在Y轴倾斜y度
        // 参数范围-180~180；
      .skewX(num) // 参数范围-180~180；Y轴坐标不变,X轴坐标延顺时针倾斜num度
      .skewY(num) // 参数范围-180~180；X轴坐标不变,Y轴坐标延顺时针倾斜num度
      ★矩阵变形:
      .matrix(a,b,c,d,tx,ty) // 同transform-function matrix
      .matrix3d()  // 同transform-function matrix3d
    动画队列 
      调用动画操作方法后要调用.step()来表示一组动画完成,可以在一组动画中调用任意多个动画方法,
      一组动画中的所有动画会同时开始,一组动画完成后才会进行下一组动画。
      .step()可以传入一个跟 wx.createAnimation() 一样的配置参数用于指定当前组动画的配置 
      iOS/Android'6.3.30'通过.step()分隔动画,只有第一步动画能生效 ;
      Example: 
        <view animation="{{animationData}}" 
        style="background:red;height:100rpx;width:100rpx"></view>
        Page({
          data: {
            animationData: {}
          }
          ,onShow: function(){
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
          }
          ,rotateAndScale: function () {
            // 旋转同时放大
            this.animation.rotate(45).scale(2, 2).step()
            this.setData({
              animationData: this.animation.export()
            })
          }
          ,rotateThenScale: function () {
            // 先旋转后放大
            this.animation.rotate(45).step()
            this.animation.scale(2, 2).step()
            this.setData({
              animationData: this.animation.export()
            })
          }
          ,rotateAndScaleThenTranslate: function () {
            // 先旋转同时放大,然后平移
            this.animation.rotate(45).scale(2, 2).step()
            this.animation.translate(100, 100).step({ duration: 1000 })
            this.setData({
              animationData: this.animation.export()
            })
          }
        })
  WXML节点信息 
    wx.createSelectorQuery() // 返回 SelectorQuery 实例 '1.4.0+' 
    selectorQuery SelectorQuery对象  
      .in(组件对象) // 将选择器的选取范围更改为自定义组件component内 '1.6.0+'
        初始时,选择器仅选取页面范围的节点,不会选取任何自定义组件中的节点 
        Example: 
          Component({
            queryMultipleNodes: function(){
              var query = wx.createSelectorQuery().in(this)
              query.select('#the-id').boundingClientRect(function(res){
                res.top // 这个组件内 #the-id 节点的上边界坐标
              }).exec()
            }
          })
      .select(selector)    // 当前页面下首个匹配的节点,返回 NodesRef 实例 
      .selectAll(selector) // 当前页面下所有匹配的节点,返回 NodesRef 实例 
      'selector'类似于CSS的选择器,但仅支持下列语法 
        ID选择器:  #the-id 
        class选择器,可连续指定多个:  .a-class.another-class 
        子元素选择器:  .the-parent > #the-child.a-class 
        后代选择器:  .the-ancestor .the-descendant 
        跨自定义组件的后代选择器:  .the-ancestor >>> .the-descendant
        多选择器的并集:  #a-node, .some-other-nodes 
      .selectViewport() // 选择显示区域,返回 NodesRef 实例 
        PS: 用于获取显示区域的尺寸、滚动位置等信息
      .exec(function(res){ // 执行所有请求,请求结果按请求次序构成数组在回调的第一个参数中返回  
        // 
      }?)  
    nodesRef  NodesRef对象 
      .boundingClientRect(function(rect){ // 添加节点的布局位置的查询请求
        PS: 相对于显示区域,单位:px; 其功能类似于DOM的'getBoundingClientRect' 
        Arguments: rect 
          若提供了回调函数,在执行selectQuery的exec方法后,节点信息会在回调中返回 
          .id      // 节点的ID
          .dataset // 节点的dataset
          .left    // 节点的左边界坐标
          .right   // 节点的右边界坐标
          .top     // 节点的上边界坐标
          .bottom  // 节点的下边界坐标
          .width   // 节点的宽度
          .height  // 节点的高度
        Example: 
          Page({
            getRect: function(){
              wx.createSelectorQuery()
              .select('#the-id')
              .boundingClientRect(function(rect){
                rect.id      // 节点的ID
                rect.dataset // 节点的dataset
                rect.left    // 节点的左边界坐标
                rect.right   // 节点的右边界坐标
                rect.top     // 节点的上边界坐标
                rect.bottom  // 节点的下边界坐标
                rect.width   // 节点的宽度
                rect.height  // 节点的高度
              }).exec()
            },
            getAllRects: function(){
              wx.createSelectorQuery()
              .selectAll('.a-class')
              .boundingClientRect(function(rects){
                rects.forEach(function(rect){
                  rect.id      // 节点的ID
                  rect.dataset // 节点的dataset
                  rect.left    // 节点的左边界坐标
                  rect.right   // 节点的右边界坐标
                  rect.top     // 节点的上边界坐标
                  rect.bottom  // 节点的下边界坐标
                  rect.width   // 节点的宽度
                  rect.height  // 节点的高度
                })
              }).exec()
            }
          })
      }?) 
        Return: nodesRef对应的 selectorQuery 
          返回的节点信息中,每个节点的位置用 left、right、top、bottom、width、height 字段描述。
      .scrollOffset(function(res){ // 添加节点的滚动位置查询请求,单位:px 
        PS: 节点必须是 scroll-view/viewport,
        返回: nodesRef对应的selectorQuery 
          返回的节点信息中,每个节点的滚动位置用 scrollLeft、scrollHeight 字段描述。
          如果提供了callback回调函数,在执行selectQuery的exec方法后,节点信息会在callback中返回。
        res 
          .id      // 节点的ID
          .dataset // 节点的dataset
          .scrollLeft // 节点的水平滚动位置
          .scrollTop  // 节点的竖直滚动位置
        Example: 
          Page({
            getScrollOffset: function(){
              wx.createSelectorQuery()
              .selectViewport()
              .scrollOffset(function(res){
                res.id      // 节点的ID
                res.dataset // 节点的dataset
                res.scrollLeft // 节点的水平滚动位置
                res.scrollTop  // 节点的竖直滚动位置
              }).exec()
            }
          })
      }?)
      .fields({    // 获取节点的相关信息 
        // 需要获取的字段在该对象中指定
        id: bol       // 是否返回节点id
        ,dataset: bol // 是否返回节点dataset
        ,rect: bol    // 是否返回节点布局位置[left/right/top/bottom]
        ,size: bol    // 是否返回节点尺寸[width/height]
        ,scrollOffset: bol // 是否返回节点的 scrollLeft/scrollTop 
          节点必须是scroll-view/viewport
        ,properties: ['xxx'] // 指定属性名列表,返回节点对应属性名的当前属性值
          只能获得组件文档中标注的常规属性值, id class style 和事件绑定的属性值不可获取 
      }
      ,function(res){
        res 
          .dataset    // 节点的dataset 
          .width      // 节点的宽度 
          .height     // 节点的高度 
          .scrollLeft // 节点的水平滚动位置 
          .scrollTop  // 节点的竖直滚动位置 
          .scrollX    // 节点 scroll-x 属性的当前值 
          .scrollY    // 节点 scroll-x 属性的当前值 
      }?)
        返回: nodesRef 对应的 selectorQuery 
        Example: 
          Page({
            getFields: function(){
              wx.createSelectorQuery()
              .select('#the-id')
              .fields({
                dataset: true,
                size: true,
                scrollOffset: true,
                properties: ['scrollX', 'scrollY']
              }
              ,function(res){
                res.dataset    // 节点的dataset
                res.width      // 节点的宽度
                res.height     // 节点的高度
                res.scrollLeft // 节点的水平滚动位置
                res.scrollTop  // 节点的竖直滚动位置
                res.scrollX    // 节点 scroll-x 属性的当前值
                res.scrollY    // 节点 scroll-y 属性的当前值
              }).exec()
            }
          })
    Example: 
      Page({
        queryMultipleNodes: function(){
          var query = wx.createSelectorQuery()
          query.select('#the-id').boundingClientRect()
          query.selectViewport().scrollOffset()
          query.exec(function(res){
            res[0].top       // #the-id节点的上边界坐标
            res[1].scrollTop // 显示区域的竖直滚动位置
          })
        }
      })
  WXML节点布局相交状态 
    PS: 可用于监听两个或多个组件节点在布局位置上的相交状态
      可用于推断某些节点是否可以被用户看见、有多大比例可以被用户看见 
    主要概念: 
      参照节点: 监听的参照节点,取它的布局区域作为参照区域
        如果有多个参照节点,则会取它们布局区域的 交集 作为参照区域。
        页面显示区域也可作为参照区域之一。
      目标节点: 监听的目标,默认只能是一个节点 
        使用 selectAll 选项时,可以同时监听多个节点 
      相交区域: 目标节点的布局区域与参照区域的相交区域。
      相交比例: 相交区域占参照区域的比例。
      阈值: 相交比例如果达到阈值,则会触发监听器的回调函数。阈值可以有多个。
    Example: 
      在目标节点'.target-class'每次进入或离开页面显示区域时,触发回调函数。
      Page({
        onLoad: function(){
          wx.createIntersectionObserver()
          .relativeToViewport()
          .observe('.target-class', (res) => {
            res.id // 目标节点 id
            res.dataset // 目标节点 dataset
            res.intersectionRatio // 相交区域占目标节点的布局区域的比例
            res.intersectionRect // 相交区域
            res.intersectionRect.left // 相交区域的左边界坐标
            res.intersectionRect.top // 相交区域的上边界坐标
            res.intersectionRect.width // 相交区域的宽度
            res.intersectionRect.height // 相交区域的高度
          })
        }
      })
      
      目标节点'.target-class'与参照节点'.relative-class'在页面显示区域内相交或相离,
      且相交或相离程度达到目标节点布局区域的20%和50%时,触发回调函数。
      Page({
        onLoad: function(){
          wx.createIntersectionObserver(this, {
            thresholds: [0.2, 0.5]
          })
          .relativeTo('.relative-class')
          .relativeToViewport()
          .observe('.target-class', (res) => {
            res.intersectionRatio // 相交区域占目标节点的布局区域的比例
            res.intersectionRect // 相交区域
            res.intersectionRect.left // 相交区域的左边界坐标
            res.intersectionRect.top // 相交区域的上边界坐标
            res.intersectionRect.width // 相交区域的宽度
            res.intersectionRect.height // 相交区域的高度
          })
        }
      })
    wx.createIntersectionObserver(this? ,{  // 返回创建的 IntersectionObserver 对象实例 '1.9.3+'
      thresholds: [<num> ,..]  // 包含所有阈值的数值数组,默认: [0]   
      ,initialRatio: <num>     // 初始的相交比例,默认:0 
        如果调用时检测到的相交比例与这个值不相等且达到阈值,则会触发一次监听器的回调函数 
      ,selectAll: <bol>  // 是否同时观测多个目标节点  '2.0.0+'
        如果设为 true , observe 的 targetSelector 将选中多个节点 
        同时选中过多节点将影响渲染性能 
    }?) 
      在自定义组件中,可以使用 this.createIntersectionObserver([options]) 来代替
    intersectionObserver 
      .relativeTo(selector, { // 使用选择器指定一个节点,作为参照区域之一
        // 用来扩展/收缩参照节点布局区域的边界
        left: <num>
        ,right: <num> 
        ,top: <num> 
        ,bottom: <num> 
      }?) 
      .relativeToViewport({   // 指定页面显示区域作为参照区域之一 
        PS: 与页面显示区域的相交区域并不准确代表用户可见的区域,
          因为参与计算的区域是“布局区域”,布局区域可能会在绘制时被其他节点裁剪隐藏,
          如遇祖先节点中 overflow 样式为 hidden 的节点, 或遮盖 如遇 fixed 定位的节点 
        // 用来扩展/收缩参照节点布局区域的边界
        left: <num>
        ,right: <num> 
        ,top: <num> 
        ,bottom: <num> 
      }?) 
      .observe(targetSelector ,function(result){ // 指定目标节点并开始监听相交状态变化情况
        result 
          .intersectionRatio  num,相交比例
          .intersectionRect  obj,相交区域的边界
            .left 
            .right 
            .top 
            .bottom 
          .boundingClientRect  obj,目标节点布局区域的边界
            .left
            .right
            .top
            .bottom 
          .relativeRect  obj,参照区域的边界
            .left
            .right
            .top
            .bottom 
          .time  num,相交检测时的时间戳
      }) 
      .disconnect() // 停止监听,回调函数将不再触发。
      Example: 
        目标节点'.target-class'进入显示区域以下 '100px' 时,就会触发回调函数。
        Page({
          onLoad: function(){
            wx.createIntersectionObserver()
            .relativeToViewport({bottom: 100})
            .observe('.target-class', (res) => {
              res.intersectionRatio // 相交区域占目标节点的布局区域的比例
              res.intersectionRect // 相交区域
              res.intersectionRect.left // 相交区域的左边界坐标
              res.intersectionRect.top // 相交区域的上边界坐标
              res.intersectionRect.width // 相交区域的宽度
              res.intersectionRect.height // 相交区域的高度
            })
          }
        })
Canvas绘图 
  PS: 所有在 <canvas/> 中的画图必须用JS完成 
  Canvas坐标系
    canvas是在一个二维的网格当中
    左上角的坐标为(0 ,0)  
    右下角的坐标为(width ,height)
  const cvsCtx = wx.createCanvasContext(<canvas-id的值>) // 创建Canvas绘图上下文
  cvsCtx Canvas绘图上下文 
    .setFillStyle(<color>)          填充颜色 
    .fillRect(x ,y ,width ,height)  绘制矩形 
      x       num,x坐标值 
      y       num,y坐标值 
      width   num,宽度 
      height  num,高度 
    .draw()                         绘图 
    ◆渐变 
网络 
  PS: 最大并发数为'10'; 默认超时时间和最大超时时间都是60s 
    网络请求的'referer'是不可以设置的,
    格式固定为'https://servicewechat.com/{appid}/{version}/page-frame.html',
    其中{appid}为小程序的'appid'{version}为小程序的版本号,版本号0表示为开发版。
    小程序进入后台运行后[非置顶聊天],如果5s内网络请求没有结束,会回调错误信息"fail interrupted"；
    在回到前台之前,网络请求接口调用都会无法调用。
  wx.request({      // 发起http请求,返回 requestTask  
    method: <kw> // 需采用大写形式,默认:GET 
      GET
      POST
      OPTIONS
      HEAD
      PUT
      DELETE
      TRACE
      CONNECT
    ,url: 'url'  // url中不能有端口号 
    ,header: {   // 设置请求头 
      'content-type': 'application/json' // 请求的数据格式 
        'application/json' 默认值,会对数据进行 JSON 序列化
        'application/x-www-form-urlencoded'  会将数据转换成 query string 
      ,'Accept': 'application/json'
      ,...
    }
    ,data: {     // 请求的参数可以采用'xxx=xxx&xxx=xxx'的形式或{key:val}形式 
      key: val
      ,..
    }
    ,dataType: 'json' // 可选,响应的数据类型,默认:'json' 
      // 如果设置了 dataType 为 json,则会尝试对响应的数据做一次 JSON.parse
    ,success: function(back){
      back 
        .data       str/obj,开发者服务器返回的数据
        .statusCode num,开发者服务器返回的 HTTP 状态码
        .header     obj,开发者服务器返回的 HTTP Response Header
    }
    ,fail: function(err){
      // 
    }
    ,complete: function(arg){
      // 
    }
  })    
    .abort()  中断请求任务 '1.4.0+'
  wx.uploadFile({   // 上传文件,将本地资源上传到服务器,返回 uploadTask  
    PS: 如通过 wx.chooseImage 等接口获取到一个本地资源的临时文件路径后,
      可通过此接口将本地资源上传到指定服务器。
      客户端发起一个 HTTPS POST 请求,其中 content-type 为 multipart/form-data 。
    url: 'xx'        // 上传地址url
    ,filePath: 'xx'  // 要上传文件资源的路径
    ,name: ''    // 文件对应的 key , 服务器端通过这个key可以获取到文件二进制内容
    ,header: {   // 请求 Header  
      // 
    }
    ,formData: { // 请求中其他额外的 form data
      // 
    } 
    ,success: function(res){ // 接口调用成功的回调函数 
      res
        .data       开发者服务器返回的数据
        .statusCode HTTP状态码
    }
    ,fail: function(){   // 接口调用失败的回调函数 
      // 
    }
    ,complete :function(){ // 调用成功、失败都会执行 
      // 
    }
  })    
    .onProgressUpdate(function(response){ // 监听上传进度变化 '1.4.0+' 
      response
        .progress       num,上传进度百分比
        .totalBytesSent num,已经上传的数据长度,单位 Bytes
        .totalBytesExpectedToSend num,预期需要上传的数据总长度,单位 Bytes 
    })  
    .abort()  中断上传任务 '1.4.0+' 
  wx.downloadFile({ // 下载文件资源到本地,返回 downloadTask 
    PS: 客户端直接发起一个 HTTP GET 请求,返回文件的本地临时路径 
    url: ''
    ,header: {
      // 
    }
    ,success: function(res){
      res 
        .tempFilePath   文件的临时路径 
          文件的临时路径,在小程序本次启动期间可以正常使用,
          如需持久保存,需在主动调用 wx.saveFile,在小程序下次启动时才能访问得到
    }
    ,fail: function(){
      // 
    }
    ,complete: function(){ }
  })  
    .onProgressUpdate(function(response){ // 监听下载进度变化 '1.4.0+'
      response
        .progress           下载进度百分比
        .totalBytesWritten  已经下载的数据长度,单位 Bytes
        .totalBytesExpectedToWrite 预期需要下载的数据总长度,单位 Bytes
    })  
    .abort()  中断下载任务 '1.4.0+'
  wx.connectSocket({// 创建WebSocket连接 
    PS: 一个微信小程序同时只能有一个WebSocket连接,否则后续再创建会导致之前的连接关闭;
    url: '' // 必须是wss协议 
    ,data: {
      // 
    }
    ,header: {
      // 
    }
    ,method: 'GET' // 默认是GET
      // 有效值: OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 
    ,protocols: [] //  strArray 否 子协议数组 1.4.0
    ,success: function(){
      // 
    }
    ,fail: function(){
      // 
    }
    ,complete: function(){
      // 
    }
  })     
  wx.onSocketOpen(foo(res))    监听WebSocket打开 
  wx.sendSocketMessage({  // 发送WebSocket消息
    PS: 需要先 wx.connectSocket,并在 wx.onSocketOpen 回调之后才能发送
    data: {} //  str/ArrayBuffer,需要发送的内容
    ,success: function(){
      // 
    }
    ,fail: function(){
      // 
    }
    ,complete: function(){
      // 
    }
  }) 
  wx.onSocketMessage(foo(res)) 接收WebSocket消息
    res.data    str/ArrayBuffer,服务器返回的消息 
  wx.closeSocket({ // 关闭WebSocket连接 
    PS: 当连接打开后再调用 wx.closeSocket 才能关闭连接,否则不起作用 
    code: num  // 可选,表示关闭连接的状态号,表示连接被关闭的原因。
      // 默认的取值是1000 （表示正常连接关闭） 1.4.0
    ,reason: '' // 可选,表示连接被关闭的原因
      // 这个字符串必须是不长于123字节的UTF-8 文本（不是字符） 1.4.0
    ,success: function(){
      // 
    }
    ,fail: function(){
      // 
    }
    ,complete: function(){
      // 
    }
  })       
  wx.onSocketError(foo(res))   监听WebSocket错误
  wx.onSocketClose    监听WebSocket关闭
媒体 
  ◆图片 
  wx.chooseImage({  // 从本地相册选择图片/使用相机拍照 
    count: <num> // 最多可以选择的图片张数,默认: 9
    ,sizeType: [   // 图片质量,默认: original,compressed 二者都有
      'original'     // 原图
      ,'compressed'  // 压缩图 
    ]
    ,sourceType: [ // 图片来源,默认: album,camera二者都有
      'album'   // 从相册选图 
      ,'camera' // 使用相机 
    ]
    ,success : function(res){ 
      res 
        .tempFilePaths  图片的本地文件路径列表 
        .tempFiles  图片的本地文件列表,每一项是一个File对象 '1.2.0'
          [
            {
              'path' : '', 本地文件路径
              'size' : '', 本地文件大小,单位:B
            }
            ,..
          ]
    }
    ,fail: function(){
      // 
    }
    ,complete: function(){
      // 
    }
  })   
  wx.previewImage({ // 预览图片 
    urls: []     // 需要预览的图片链接列表
    ,current: '' // 当前显示图片的链接,不填则默认为 urls 的第一张
    ,cfoo 
  })  
  wx.getImageInfo({ // 获取图片信息 
    src: '' // 图片的路径,可为 相对路径/临时文件路径/存储文件路径/网络图片路径 
    ,success: function(res){
      res 
        .width   num,图片宽度,单位px
        .height  num,图片高度,单位px
        .path    返回图片的本地路径 
    }
    ,fail: function(){ }
    ,complete: function(){ }
  })  
  wx.saveImageToPhotosAlbum({ // 保存图片到系统相册 '1.2.0+'
    PS: 需要用户授权 scope.writePhotosAlbum,详见 用户授权 
    filePath: '' // 图片文件路径,可为:临时文件路径/永久文件路径,不支持网络图片路径
    ,success: function(res){
      res 
        .errMsg 调用结果
    }
    ,fail: function(){ }
    ,complete: function(){ }
  }) 
  ◆录音 
  wx.startRecord({ // 开始录音,返回: 录音文件的临时文件路径 
    PS: 接口需要用户授权; 当用户离开小程序时,此接口无法调用 
      当主动调用 wx.stopRecord,或者录音超过1分钟时自动结束录音
    success: function(res){
      res
        .tempFilePath  录音文件的临时路径
          需持久保存,需在主动调用 wx.saveFile
    }
    ,fail: function(){
      // 
    }
    ,complete: function(){
      // 
    }
  }) 
  wx.stopRecord()  ​ 主动调用停止录音
  ◆音频播放控制 
  wx.playVoice({   // 开始播放语音 
    PS: 同时只允许一个语音文件正在播放,否则中断前一个语音播放 
    filePath: 'path' // 必选,需要播放的语音文件的文件路径 
    ,cfoo 
  })  
  wx.pauseVoice()   暂停正在播放的语音 
    PS: 再次调用wx.playVoice()播放同一个文件时,会从暂停处开始播放。
      如果想从头开始播放,需要先调用 wx.stopVoice。    
  wx.stopVoice()    结束播放语音 
  ◆音乐播放控制 
    PS: 对于微信客户端来说,只能同时有一个后台音乐在播放。
    当用户离开小程序后,音乐将暂停播放；
    当用户点击“显示在聊天顶部”时,音乐不会暂停播放；
    当用户在其他小程序占用了音乐播放器,原有小程序内的音乐将停止播放。
  wx.playBackgroundAudio({ // 使用后台播放器播放音乐 
    dataUrl: ''  // 必选,音乐链接,目前支持格式'm4a'/'aac'/'mp3'/'wav' 
    ,title: ''   // 音乐标题
    ,coverImgUrl: '' //  封面URL
    ,cfoo 
  }) 
  wx.getBackgroundAudioPlayerState({ // 获取后台音乐播放状态 
    success : function(res){ 
      res
        .status  num,播放状态 
          0:暂停中 
          1:播放中
          2:没有音乐在播放
        // 以下信息,只有在当前有音乐播放时返回 
        .duration  选定音频的长度,单位:s 
        .currentPosition  选定音频的播放位置,单位:s 
        .downloadPercent  整数,音频的下载进度,[80 代表 80%] 
        .dataUrl  歌曲数据链接     
    }
    ,fail: function(){
      // 
    }
    ,complete:function(){
      // 
    }
  }) 
  wx.pauseBackgroundAudio()  暂停播放音乐  
  wx.seekBackgroundAudio({  // 控制音乐播放进度 
    PS: iOS'6.3.30',wx.seekBackgroundAudio()会有短暂延迟
    position: num // 音乐位置,单位s,必选 
    ,cfoo
  }) 
  wx.stopBackgroundAudio()   停止播放音乐     
  wx.onBackgroundAudioPlay(function(){  // 监听音乐播放  
      //  
  })  
  wx.onBackgroundAudioPause(function(){ // 监听音乐暂停 
    // 
  }) 
  wx.onBackgroundAudioStop(function(){  // 监听音乐停止      
    // 
  })  
  ◆背景音频播放管理 
  wx.getBackgroundAudioManager() 获取全局唯一的背景音频管理器 backgroundAudioManager '1.2.0+' 
    .duration  // num,当前音频长度,单位s 
      // 有在当前有合法的src时返回
    .currentTime // num,当前音频的播放位置,单位s 
      // 有在当前有合法的src时返回
    .paused    // 当前是是否暂停或停止状态,true表示暂停或停止,false 表示正在播放 
    .src  // 音频的数据源,默认为空字符串,
      // 当设置了新的 src 时,会自动开始播放 ,目前支持的格式有 m4a, aac, mp3, wav  否
    .buffered  // num,音频缓冲的时间点,仅保证当前播放时间点到此时间点内容已缓冲 
    .startTime   // num,读写,音频开始播放的位置,单位s
    .title       // 读写,音频标题,用于做原生音频播放器音频标题 
      // 原生音频播放器中的分享功能,分享出去的卡片标题,也将使用该值 
    .epname      // 读写,专辑名 
      // 原生音频播放器中的分享功能,分享出去的卡片简介,也将使用该值。  否
    .singer      // 读写,歌手名 
      // 原生音频播放器中的分享功能,分享出去的卡片简介,也将使用该值 
    .coverImgUrl // 读写,封面图url,用于做原生音频播放器背景图 
      // 原生音频播放器中的分享功能,分享出去的卡片配图及背景也将使用该图 
    .webUrl      // 读写,页面链接 
      // 原生音频播放器中的分享功能,分享出去的卡片简介,也将使用该值 
    .play()    // 播放
    .pause()   // 暂停
    .stop()    // 停止
    .seek(num) // 跳转到指定位置,单位 s
    .onCanplay(foo)    // 背景音频进入可以播放状态,但不保证后面可以流畅播放
    .onPlay(foo)       // 背景音频播放事件 
    .onPause(foo)      // 背景音频暂停事件 
    .onStop(foo)       // 背景音频停止事件 
    .onEnded(foo)      // 背景音频自然播放结束事件 
    .onTimeUpdate(foo) // 背景音频播放进度更新事件 
    .onPrev(foo)       // 用户在系统音乐播放面板点击上一曲事件（iOS only）
    .onNext(foo)       // 用户在系统音乐播放面板点击下一曲事件（iOS only）
    .onError(foo)      // 背景音频播放错误事件
      errCode说明
      10001  系统错误
      10002  网络错误
      10003  文件错误
      10004  格式错误
      -1     未知错误  
    .onWaiting(foo)    // 音频加载中事件,当音频因为数据不足,需要停下来加载时会触发
  ◆音频组件控制 
  wx.createAudioContext(audioId) 创建并返回audio上下文 audioContext 对象
    PS: 通过'audioId'跟一个<audio/>组件绑定,通过它可以操作对应的<audio/>组件 
    .setSrc('') // 设置音频的地址
    .play()     // 播放
    .pause()    // 暂停
    .seek(num)  // 跳转到指定位置,单位 s      
  ◆视频 
  wx.chooseVideo({ // 拍摄视频/从相册中选视频,返回视频临时文件路径 
    PS: 文件的临时路径,在小程序本次启动期间可以正常使用,
      如需持久保存,需在主动调用 wx.saveFile,在小程序下次启动时才能访问得到。
    sourceType: []  // 选择/拍摄视频,默认: ['album','camera'] 
      'album'   从相册选视频
      'camera'  使用相机拍摄
    ,maxDuration: 60 // 视频最长拍摄时间,单位:s,最长支持'60'秒
    ,camera: 'back'  // 默认调起的为前置还是后置摄像头 
      // 在部分Android手机下由于系统ROM不支持无法生效   
      'back'   后置,默认值
      'front'  前置
    ,success: function(res){
      res 
        .tempFilePath 选定视频的临时文件路径
        .duration     选定视频的时间长度
        .size    选定视频的数据量大小
        .height  返回选定视频的长
        .width   返回选定视频的宽
    }
    ,fail: function(){ }
    ,complete: function(){ }
  }) 
  wx.saveVideoToPhotosAlbum({ // 保存视频到系统相册 '1.2.0+' 
    PS: 需要用户授权 scope.writePhotosAlbum,详见 用户授权 
    filePath: <path> // 视频文件路径,可以是临时文件路径也可以是永久文件路径
    ,success: function(res){
      res 
        .errMsg  // 调用结果
    }
    ,fail: function(){ }
    ,complete: function(){ }
  }) 
  ◆视频组件控制 
  const videoCtx = wx.createVideoContext(<视频id的值>)  创建video上下文对象 
  videoCtx  用于操作video组件 
    .play()  // 播放  
    .pause() // 暂停  
    .seek(num) // 跳转到指定位置,单位:s  
    .sendDanmu({text:'',color:''})  // 发送弹幕   
    .playbackRate(KW)   // 设置倍速播放  '1.4.0+'
      0.5   
      0.8
      1.0
      1.25
      1.5 
    .requestFullScreen() // 进入全屏  '1.4.0'
    .exitFullScreen()    // 退出全屏  '1.4.0'
文件 
  wx.saveFile({ // 保存文件到本地 
    PS: 本地文件存储的大小限制为10M 
    tempFilePath:'' // 要保存的文件的临时路径 
    ,success: function(res){
      res
        .savedFilePath  文件的保存路径 
    }
    ,fail:function(){ 
      // 
    }
    ,complete:function(){ 
      // 
    }
  })  
  wx.getSavedFileList({ // 获取本地已保存的文件列表 
    success: function(res){
      res
        .errMsg   接口调用结果 
        .fileList 文件列表 
          fileItem.filePath   // 文件的本地路径
          fileItem.createTime // 文件的保存时的时间戳,从1970/01/01 08:00:00 到当前时间的秒数
          fileItem.size       // 文件大小,单位B
    }
    ,fail:function(){}
    ,complete:function(){}
  })  
  wx.getSavedFileInfo({ // 获取本地文件的文件信息
    PS: 此接口只能用于获取已保存到本地的文件 [使用wx.getFileInfo()接口获取临时文件信息] 
    filePath:''  // 文件路径
    ,success:function(res){
      res.errMsg  // 接口调用结果
      res.size    // num,文件大小,单位B
      res.createTime // 文件的保存时的时间戳,从1970/01/01 08:00:00 到当前时间的秒数
    }
    ,fail:function(){ }
    ,complete:function(){ }
  }) 
  wx.removeSavedFile({  // 删除本地存储的文件 
    filePath:'' // 需要删除的文件路径
    ,cfoo
  })  
  wx.openDocument({     // 新开页面打开文档
    PS: 支持格式 'doc'/'xls'/'ppt'/'pdf'/'docx'/'xlsx'/'pptx'
    filePath:''  // 文件路径,可通过downFile 得  
    ,fileType:'' // 文件类型,指定文件类型打开文件,可选 
      'doc'
      'xls'
      'ppt'
      'pdf'
      'docx'
      'xlsx'
      'pptx'  
    ,cfoo 
  }) 
数据缓存 
  PS: 每个微信小程序都可有自己的本地缓存 
    同一个微信用户,同一个小程序 storage 上限为 10MB,超过后再写入会触发fail回调  
    localStorage 以用户维度隔离,同一台设备上,A 用户无法读取到 B 用户的数据。
    localStorage 是永久存储的,但不建议将关键信息全部存在localStorage,以防用户换设备的情况。
  wx.setStorage({              // 将数据存储在本地缓存中指定的key中
    PS: 会覆盖掉原来该key对应的内容,这是一个异步接口 
    key: <str>   // 本地缓存中的指定的 key
    ,data: <any> // 需要存储的内容
    ,cfoo 
  })  
  wx.setStorageSync(key,data)  // 将data存储在本地缓存中指定的key中
    PS: 会覆盖掉原来该 key 对应的内容,这是一个同步接口 
    key  str,本地缓存中的指定的key  
    data any,需要存储的内容 
  wx.getStorage({        // 从本地缓存中异步获取指定key对应的内容 
    key:'' // 本地缓存中的指定的key 
    ,success: function(res){
      res.data   key对应的内容
    }
    ,fail: function(){ }
    ,complete: function(){ }
  }) 
  wx.getStorageSync(key) // 从本地缓存中同步获取指定key对应的内容 
    key   本地缓存中的指定的key 
  wx.getStorageInfo({     // 异步获取当前storage的相关信息
    success:function(res){
      res
        .keys         当前storage中所有的key
        .currentSize  当前占用的空间大小, 单位kb
        .limitSize    限制的空间大小,单位kb
    }
    ,fail:function(){ }
    ,complete:function(){ }
  })  
  wx.getStorageInfoSync() // 同步获取当前storage的相关信息 
  wx.removeStorage({        // 从本地缓存中异步移除指定key 
    key:'' // 本地缓存中的指定的key 
    ,cfoo
  })      
  wx.removeStorageSync(key) // 从本地缓存中同步移除指定key 
    key   本地缓存中的指定的key 
  wx.clearStorage()     // 清理本地数据缓存[异步]
  wx.clearStorageSync() // 同步清理本地数据缓存 
位置 
  wx.getLocation({    // 获取当前地理位置信息 
    success: function(res){  // 必选,成功的回调 
      res
        .latitude  纬度,浮点数,范围为-90~90,负数表示南纬 
        .longitude 经度,浮点数,范围为-180~180,负数表示西经 
        .speed     速度,浮点数,单位: m/s 
        .accuracy  位置的精确度  
        .altitude  高度,单位: m 1.2.0 
        .verticalAccuracy 垂直精度,单位 m（Android 无法获取,返回 0） 1.2.0
        .horizontalAccuracy 水平精度,单位 m 1.2.0
    } 
    ,type: <kw>      // 可选,指定返回坐标的类型 
      // iOS 6.3.30 type 参数不生效,只会返回 wgs84 类型的坐标信息 
      'wgs84'   默认值,gps坐标 
      'gcj02'   可用于 wx.openLocation 的坐标 
    ,altitude: bol   // 可选,是否获取高度信息,默认: false '1.6.0+'
      由于获取高度需要较高精确度,会减慢接口返回速度 
    ,fail: function(){     // 可选,失败的回调 
      // 
    }
    ,complete: function(){ // 可选,请求结束的回调 
      // 
    } 
  }) 
    PS: 当用户离开小程序后,此接口无法调用；当用户点击“显示在聊天顶部”时,此接口可继续调用。
      wx.getLocation()、wx.chooseLocation() 接口需要用户授权,请兼容用户拒绝授权的场景。      
  wx.chooseLocation({ // 打开地图选择位置 
    success: function(res){
      res 
        .name      // 位置名称
        .address   // 详细地址
        .latitude  // 纬度,浮点数,范围为-90~90,负数表示南纬
        .longitude // 经度,浮点数,范围为-180~180,负数表示西经
    }
    ,fail:function(){ }
    ,complete:function(){ }
    ,cancel:function(){ }
  })   
  wx.openLocation({  // ​使用微信内置地图查看位置 
    latitude: <float>   // 纬度,范围为-90~90,负数表示南纬
    ,longitude: <float> // 经度,范围为-180~180,负数表示西经
    ,scale: <int>     // 缩放比例,范围5~18,默认为18
    ,name: <str>      // 位置名
    ,address: <str>   // 地址的详细说明
    ,cfoo
  }) 
  wx.createMapContext(mapId) 地图组件控制,创建并返回map上下文'mapContext'对象 
    PS: mapContext通过mapId跟一个<map/>组件绑定,通过它可以操作对应的<map/>组件
    .getCenterLocation({ // 获取当前地图中心的经纬度
      返回的是gcj02坐标系,可用于 wx.openLocation
      success:function(res){
        res 
          .longitude 经度 
          .latitude  纬度 
      }
      ,fail:function(){ }
      ,complete:function(){ }
    })     
    .moveToLocation()  // 将地图中心移动到当前定位点,需要配合map组件的show-location使用  
    .translateMarker({  // 平移marker,带动画  '1.2.0+'
      markerId: num // 指定marker
      ,destination: obj // 指定marker移动到的目标点
      ,autoRotate: bol // 移动过程中是否自动旋转marker
      ,rotate: num // marker的旋转角度
      ,duration: num // 动画持续时长,默认值1000ms,平移与旋转分别计算
      ,animationEnd: function(){ } // 动画结束回调函数
      ,fail: function(){ } // 接口调用失败的回调函数
    })   
    .includePoints({    // 缩放视野展示所有经纬度  '1.2.0'
      points: arr  // 要显示在可视区域内的坐标点列表,[{latitude, longitude}]
      ,padding: arr // 坐标点形成的矩形边缘到地图边缘的距离,单位像素
      // 格式为[上,右,下,左],安卓上只能识别数组第一项,上下左右的padding一致。
      // 开发者工具暂不支持padding参数。
    })  
    .getRegion({    // 获取当前地图的视野范围  '1.4.0'
      success: function(res){
        res
          .southwest  西南角的经纬度  
          .northeast  东北角的经纬度 
      }
      ,fail: function(){ }
      ,complete: function(){ }
    })    
    .getScale({   // 获取当前地图的缩放级别  '1.4.0'
      cfoo,
    })   
设备 
  wx.makePhoneCall({ // 拨打电话 
    phoneNumber: '' // 需要拨打的电话号码
    ,cfoo
  }) 
  wx.addPhoneContact({ // 添加手机通讯录联系人  '1.2.0+' 
    PS: 调用后,用户可以选择将该表单以“新增联系人”或“添加到已有联系人”的方式,
      写入手机系统通讯录,完成手机通讯录联系人和联系方式的增加。
    firstName: str   // 必选,名字 
    ,mobilePhoneNumber: str // 手机号
    ,photoFilePath: str     // 头像,本地文件路径
    ,nickName: str          // 昵称
    ,lastName: str          // 姓氏
    ,middleName: str        // 中间名
    ,remark: str            // 备注
    ,weChatNumber: str      // 微信号
    ,addressCountry: str    // 联系地址国家
    ,addressState: str      // 联系地址省份
    ,addressCity: str       // 联系地址城市
    ,addressStreet: str     // 联系地址街道
    ,addressPostalCode: str // 联系地址邮政编码
    ,email: str             // 电子邮件
    ,url: str               // 网站
    ,organization: str          // 公司
    ,title: str                 // 职位
    ,hostNumber: str            // 公司电话
    ,workFaxNumber: str         // 工作传真
    ,workPhoneNumber: str       // 工作电话
    ,workAddressCountry: str    // 工作地址国家
    ,workAddressState: str      // 工作地址省份
    ,workAddressCity: str       // 工作地址城市
    ,workAddressStreet: str     // 工作地址街道
    ,workAddressPostalCode: str // 工作地址邮政编码
    ,homeFaxNumber: str          // 住宅传真
    ,homePhoneNumber: str        // 住宅电话
    ,homeAddressCountry: str     // 住宅地址国家
    ,homeAddressState: str       // 住宅地址省份
    ,homeAddressCity: str        // 住宅地址城市
    ,homeAddressStreet: str      // 住宅地址街道
    ,homeAddressPostalCode: str  // 住宅地址邮政编码
    ,success: function(res){
      res
        .errMsg  
          success ok             添加成功
          fail    fail cancel    用户取消操作
          fail    fail ${detail} 调用失败,detail 加上详细信息    
    }
    ,fail: function(){ }
    ,complete: function(){ }
  })
  wx.scanCode({ // 调起客户端扫码界面,扫码成功后返回对应的结果 
    onlyFromCamera: false  // 是否只能从相机扫码,不允许从相册选择图片  '1.2.0'
    ,success: function(res){
      res 
        .result   所扫码的内容
        .scanType 所扫码的类型
        .charSet  所扫码的字符集
        .path  当所扫的码为当前小程序的合法二维码时,会返回此字段,内容为二维码携带的path
    }
    ,fail: function(){ }
    ,complete: function(){ }
  })  
  wx.setClipboardData({ // 设置系统剪贴板的内容 '1.1.0+'
    data: str  // 需要设置的内容 
    ,cfoo 
  })  
  wx.getClipboardData({ // 获取系统剪贴板内容 '1.1.0+'
    success: function(res){
      res 
        .data   剪贴板的内容
    }
    ,fail: function(){ }
    ,complete: function(){ }
  })  
  wx.vibrateLong({ // 使手机发生较长时间的振动'400ms'  '1.2.0'
    cfoo 
  })   
  wx.vibrateShort({ // 使手机发生较短时间的振动'15ms'  '1.2.0'
    PS: 仅在 iPhone7/iPhone7Plus 及 Android 机型生效
    cfoo
  })  
  wx.setScreenBrightness({ // 设置屏幕亮度 '1.2.0+'
    value: <float> // 屏幕亮度值,范围: 0~1,0 最暗,1 最亮
    ,cfoo 
  })   
  wx.getScreenBrightness({ // 获取屏幕亮度 '1.2.0+'
    PS: 若安卓系统设置中开启了自动调节亮度功能,则屏幕亮度会根据光线自动调整,
      该接口仅能获取自动调节亮度之前的值,而非实时的亮度值。  
    success: function(res){
      res 
        .value  num,屏幕亮度值,范围 0~1,0 最暗,1 最亮
    }
    ,fail: function(){ }
    ,complete: function(){ }
  })   
  wx.onUserCaptureScreen(function(){ // 监听用户主动截屏事件 '1.4.0'
    用户使用系统截屏按键截屏时触发事件
  })
  ◆系统信息 
  wx.getSystemInfo({ // 获取系统信息 
    success: function(res){
      res 
        .brand        手机品牌  1.5.0
        .model        手机型号  
        .pixelRatio   设备像素比  
        .screenWidth   屏幕宽度  1.1.0
        .screenHeight  屏幕高度  1.1.0
        .windowWidth   可使用窗口宽度  
        .windowHeight  可使用窗口高度  
        .language   微信设置的语言  
        .version    微信版本号  
        .system     操作系统版本  
        .platform   客户端平台  
        .fontSizeSetting 用户字体大小设置。单位px  1.5.0 
          以“我-设置-通用-字体大小”中的设置为准
        .SDKVersion   客户端基础库版本  1.1.0
    }
    ,fail: function(){ }
    ,complete: function(){ }
  })  
  wx.getSystemInfoSync() // 获取系统信息同步接口
    .brand  手机品牌  '1.5.0' 
    .model  手机型号  
    .pixelRatio  设备像素比  
    .screenWidth  屏幕宽度  '1.1.0' 
    .screenHeight  屏幕高度  '1.1.0' 
    .windowWidth  可使用窗口宽度  
    .windowHeight  可使用窗口高度  
    .language  微信设置的语言  
    .version  微信版本号  
    .system  操作系统版本  
    .platform  客户端平台  
    .fontSizeSetting  用户字体大小设置,单位:px  '1.5.0' 
      以“我-设置-通用-字体大小”中的设置为准 
    .SDKVersion  客户端基础库版本  '1.1.0' 
  wx.canIUse(str)  判断小程序的API,回调,参数,组件等是否在当前版本可用 
    参数形式: <API>.<method>.<param>.<options> 或 <component>.<attribute>.<option> 
      API       代表API名字 
      method    代表调用方式,有效值为return, success, object, callback 
      param     代表参数或者返回值 
      options   代表参数的可选值 
      component 代表组件名字 
      attribute 代表组件属性 
      option    代表组件属性的可选值  
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
  wx.getNetworkType({ // 获取网络类型  
    success: function(res){
      res 
        .networkType  网络类型
    }
    ,fail: function(){ }
    ,complete: function(){ }
  })  
  wx.onNetworkStatusChange(function(res){ // 监听网络状态变化 '1.1.0+'
    res 
      .isConnected  bol,当前是否有网络连接
      .networkType  网络类型 
        'wifi'  wifi网络
        '2g'    2g网络
        '3g'    3g网络
        '4g'    4g网络
        'none'  无网络
        'unknown'  Android下不常见的网络类型
  })  
  ◆加速度计 
  wx.onAccelerometerChange(function(res){ // 监听加速度数据,频率'5次/秒' 
    res 
      .x  num,X轴
      .y  num,Y轴
      .z  num,Z轴
  }) 
    PS: 接口调用后会自动开始监听,可使用 wx.stopAccelerometer 停止监听。
  wx.startAccelerometer({ // 开始监听加速度数据 '1.1.0'
    cfoo
  })      
  wx.stopAccelerometer({ // 停止监听加速度数据 '1.1.0'
    cfoo 
  })  
  ◆罗盘 
  wx.onCompassChange(function(res){ // 监听罗盘数据,频率'5次/秒'
    res 
      .direction  num,面对的方向度数 
  })  
    PS: 接口调用后会自动开始监听,可使用 wx.stopCompass() 停止监听 
  wx.startCompass({ // 开始监听罗盘数据 '1.1.0'
    cfoo
  })  
  wx.stopCompass({ // 停止监听罗盘数据 '1.1.0+'
    cfoo
  })    
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
      wx.getBluetoothAdapterState({ // 获取本机蓝牙适配器状态 '1.1.0+'
        success: function(res){
          res 
            .errMsg       成功:ok,错误:详细信息 
            .discovering  是否正在搜索设备 
            .available    蓝牙适配器是否可用 
        }
        ,fail: function(){ }
        ,complete: function(){ }
      }) 
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
            // res.errMsg         成功:ok,错误:详细信息 
            // res.isDiscovering  当前蓝牙适配器是否处于搜索状态 
          },
          fail: function(){ },
          complete: function(){ },
        }
        Example:
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
                // 注意:vConsole 无法打印出 ArrayBuffer 类型数据 
            // res.errMsg  string  成功:ok,错误:详细信息
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
            注意:vConsole 无法打印出 ArrayBuffer 类型数据 
      wx.getConnectedBluetoothDevices({})  根据uuid获取处于已连接状态的设备 '1.1.0+'
        {
          'services': arr, // 蓝牙设备主 service 的 uuid 列表
          success: function(res){
            // res.devices  Array  搜索到的设备列表
              // device对象 蓝牙设备信息
              // device.name  string  蓝牙设备名称,某些设备可能没有
              // device.deviceId  string  用于区分设备的 id
            // res.errMsg   string 成功:ok,错误:详细信息
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
            res.errMsg  //  成功:ok,错误:详细信息
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
            res.errMsg  // 成功:ok,错误:详细信息
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
            // res.errMsg  string  成功:ok,错误:详细信息
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
            // res.errMsg  string  成功:ok,错误:详细信息
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
                // 注意:vConsole 无法打印出 ArrayBuffer 类型数据 
            // res.errMsg         str,成功:ok,错误:详细信息 
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
        res.value  ArrayBuffer  特征值最新的值（注意:vConsole 无法打印出 ArrayBuffer 类型数据）
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
    开发者的移动应用、网站应用、和公众帐号[包括小程序],可通过'unionid'来区分用户, 
    同一个微信开放平台帐号下的移动应用、网站应用和公众帐号[包括小程序], 用户的'unionid'唯一 
  登录 
    PS: 用户登录态拥有一定的时效性。用户越久未使用小程序,用户登录态越有可能失效。
      反之如果用户一直在使用小程序,则用户登录态一直保持有效。
      具体时效逻辑由微信维护,对开发者透明。
      开发者只需要调用 wx.checkSession() 接口检测当前用户登录态是否有效。
      登录态过期后开发者可以再调用 wx.login() 获取新的用户登录态。
    wx.login({ // 调用接口获取登录凭证'code' 
      进而换取用户登录态信息,包括用户的唯一标识'openid' 及本次登录的会话密钥'session_key'。
      用户数据的加解密通讯需要依赖会话密钥完成 
      success: function(res){
        res 
          .errMsg str,调用结果
          .code   str,用户允许登录后返回,有效期五分钟 
            需将发送到后台,换取 'openId', 'sessionKey', 'unionId' 
      }
      ,fail: function(){ }
      ,complete: function(){ }
    })
      PS: 同一个微信开放平台下的相同主体的App、公众号、小程序,
      如果用户已经关注公众号,或者曾经登录过App或公众号,
      则用户打开小程序时,开发者可以直接通过 wx.login() 获取到该用户UnionID,无须用户再次授权。
    wx.checkSession({ // 检测当前用户登录态是否有效 
      success: function(){
        //session 未过期,并且在本生命周期一直有效
      }
      ,fail: function(){
        //登录态过期
        wx.login() //重新登录
        ....
      }
      ,complete: function(){
        // 
      }
    })
  授权 
    PS: 向用户发起授权 '1.2.0'
      部分接口需要获得同意后才能调用,如果用户未授权过,会弹窗询问用户,用户点击同意后方可调用接口。
      如果用户点了拒绝,则短期内调用不会出现弹窗,而是直接进入'fail'回调。
      用户可以在小程序设置界面中修改对该小程序的授权信息。
      本接口用于提前向用户发起授权,调用后会立刻弹窗询问用户是否同意小程序使用某项功能或获取用户的某些数据,
      但不会实际调用接口。如果用户之前已经同意,则不会出现弹窗,直接返回成功。
    wx.authorize({
      scope: KW // 需要获取权限的scope 
        'scope.userInfo'          用户信息 
          对应接口: wx.getUserInfo 
        'scope.userLocation'      地理位置 
          对应接口: wx.getLocation, wx.chooseLocation 
        'scope.address'           通讯地址 
          对应接口: wx.chooseAddress 
        'scope.record'            录音功能 
          对应接口: wx.startRecord 
        'scope.writePhotosAlbum' 保存到相册 
          对应接口: wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum 
      ,success: function(){    // 可选,调用成功的回调 
        // 
      }
      ,fail: function(){ }     // 可选,调用失败的回调 
      ,complete: function(){ } // 可选,调用结束的回调 
    })
  wx.getUserInfo({ // 获取用户信息 
    withCredentials: bol  // 是否带上登录态信息,默认:false  '1.1.0+' 
      当 withCredentials 为 true 时,要求此前有调用过 wx.login 且登录态尚未过期,
      此时返回的数据会包含 'encryptedData', 'iv' 等敏感信息 
      当 withCredentials 为 false 时,不要求有登录态,
      返回的数据不包含 'encryptedData', 'iv' 等敏感信息。
    ,lang: KW             // 指定返回用户信息的语言  '1.4.0' 
      'en'    英文,默认值 
      'zh_CN' 简体中文
      'zh_TW' 繁体中文
    ,success: function(res){
      res 
        .userInfo   用户信息对象,不包含'openid'等敏感信息 
          .nickName
          .avatarUrl
          .gender       性别,0:未知;1:男;2:女
          .province
          .city
          .country
        .rawData    不包括敏感信息的原始数据字符串,用于计算签名。
        .signature      使用sha1(rawData+sessionkey)得到字符串,用于校验用户信息
        .encryptedData  包括敏感数据在内的完整用户信息的加密数据, 解密后为json结构 
        .iv             加密算法的初始向量
    }
    ,fail: function(){ }
    ,complete: function(){ }
  })
  wx.requestPayment({  // 发起微信支付 
    ,timeStamp: str  // 必选,时间戳[1970年1月1日00:00:00至今的秒数] 
    ,nonceStr: str   // 必选,随机字符串,长度为32个字符以下 
    ,package: str    // 必选,统一下单接口返回的 prepay_id 参数值,提交格式如:prepay_id=*
    ,signType: KW    // 必选,签名算法,暂支持 MD5
    ,paySign: str    // 必选,签名,具体签名方案参见小程序支付接口文档;
    ,success: function(){    // 可选,调用成功的回调 
      // 
    }
    ,fail: function(){ }     // 可选,调用失败的回调 
    ,complete: function(){ } // 可选,调用结束的回调 
  })
    PS: '6.5.2-'用户取消支付不会触发'fail'回调,只会触发'complete'回调, 
      回调 errMsg 为 'requestPayment:cancel'
  wx.chooseAddress({ // 调起用户编辑收货地址原生界面,并在编辑完成后返回用户选择的地址。 '1.1.0+'
    success: function(res){    // 可选,返回用户选择的收货地址信息 
      res 
        .errMsg  str,调用结果
        .userName  str,收货人姓名
        .postalCode  str,邮编
        .provinceName  str,国标收货地址第一级地址
        .cityName  str,国标收货地址第二级地址
        .countyName  str,国标收货地址第三级地址
        .detailInfo  str,详细收货地址信息
        .nationalCode  str,收货地址国家码
        .telNumber  str,收货人手机号码
    }
    ,fail: function(){ }     // 可选,调用失败的回调 
    ,complete: function(){ } // 可选,调用结束的回调 
  })
    PS: 接口需要用户授权,请兼容用户拒绝授权的场景。    
  模版消息 '6.5.2+' 
    基于微信的通知渠道; 
    模板推送位置:服务通知
    模板下发条件: 用户本人在微信体系内与页面有交互行为后触发,详见下发条件说明
    模板跳转能力: 点击查看详情仅能跳转下发模板的该帐号的各个页面
    使用说明 
      步骤一:获取模板ID
        有两个方法可以获取模版ID
        通过模版消息管理接口获取模版ID（详见模版消息管理）
        在微信公众平台手动配置获取模版ID
      步骤二:页面的 <form/> 组件,属性report-submit为true时,可以声明为需发模板消息,
        此时点击按钮提交表单可以获取formId,用于发送模板消息。
        或者当用户完成支付行为,可以获取prepay_id用于发送模板消息。
      步骤三:调用接口下发模板消息（详见发送模版消息）
    模版消息管理
      1. 获取小程序模板库标题列表 
        接口地址
        https://api.weixin.qq.com/cgi-bin/wxopen/template/library/list?access_token=ACCESS_TOKEN
        HTTP请求方式: POST
        请求参数说明:
        参数        必选   说明
        access_token 是  接口调用凭证
        offset       是  offset和count用于分页,表示从offset开始,拉取count条记录
          offset从0开始,count最大为20。
        count        是  offset和count用于分页,表示从offset开始,拉取count条记录
          offset从0开始,count最大为20。
        返回数据说明:
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
        HTTP请求方式: POST
        参数 必选 说明
        access_token 是 接口调用凭证
        POST参数说明:
        id 是 模板标题id,可通过接口获取,也可登录小程序后台查看获取
        返回码说明: 在调用模板消息接口后,会返回JSON数据包。
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
        HTTP请求方式: POST
        POST参数说明:
        access_token    必选,接口调用凭证
        id              必选,模板标题id,可通过接口获取,也可登录小程序后台查看获取
        keyword_id_list 必选,开发者自行组合好的模板关键词列表,关键词顺序可以自由搭配
          例如[3,5,4]或[4,5,3],最多支持10个关键词组合 
        返回码说明: 在调用模板消息接口后,会返回JSON数据包。
        {
          "errcode": 0,
          "errmsg": "ok",
          "template_id": "wDYzYZVxobJivW9oMpSCpuvACOfJXQIoKUm0PY397Tc"
          // 添加至帐号下的模板id,发送小程序模板消息时所需
        }
      4. 获取帐号下已存在的模板列表
        接口地址       
        https://api.weixin.qq.com/cgi-bin/wxopen/template/list?access_token=ACCESS_TOKEN
        HTTP请求方式: POST
        POST参数说明:
        access_token 必选,接口调用凭证
        offset       必选,offset和count用于分页,表示从offset开始,拉取count条记录,
          offset从0开始,count最大为20。最后一页的list长度可能小于请求的count
        count        必选,offset和count用于分页,表示从offset开始,拉取count条记录,
          offset从0开始,count最大为20。最后一页的list长度可能小于请求的count
        返回码说明: 在调用模板消息接口后,会返回JSON数据包。
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
              "example": "购买地点:TIT造舰厂\n购买时间:2016年6月6日\n物品名称:咖啡\n"
              // example 模板内容示例
            }
          ]
        }
      5. 删除帐号下的某个模板
        接口地址 https://api.weixin.qq.com/cgi-bin/wxopen/template/del?access_token=ACCESS_TOKEN
        HTTP请求方式: POST
        POST参数说明:
        access_token 必选,接口调用凭证
        template_id  必选,要删除的模板id
        返回码说明: 在调用模板消息接口后,会返回JSON数据包。
        {
          "errcode": 0,
          "errmsg": "ok"
        }
    发送模版消息 
      获取 access_token 
        access_token 是全局唯一接口调用凭据,开发者调用各接口时都需使用 access_token,请妥善保存
        access_token 的存储至少要保留512个字符空间。
        access_token 的有效期目前为2个小时,需定时刷新,重复获取将导致上次获取的 access_token 失效。
        公众平台的 API 调用所需的 access_token 的使用及生成方式说明:
          为了保密 appsecrect,第三方需要一个 access_token 获取和刷新的中控服务器。而其他业务逻辑服务器所使用的 access_token 均来自于该中控服务器,不应该各自去刷新,否则会造成 access_token 覆盖而影响业务；
          目前 access_token 的有效期通过返回的 expires_in 来传达,目前是7200秒之内的值。中控服务器需要根据这个有效时间提前去刷新新 access_token。在刷新过程中,中控服务器对外输出的依然是老 access_token,此时公众平台后台会保证在刷新短时间内,新老 access_token 都可用,这保证了第三方业务的平滑过渡；
          access_token 的有效时间可能会在未来有调整,所以中控服务器不仅需要内部定时主动刷新,还需要提供被动刷新 access_token 的接口,这样便于业务服务器在 API 调用获知 access_token 已超时的情况下,可以触发 access_token 的刷新流程。
          开发者可以使用 AppID 和 AppSecret 调用本接口来获取 access_token。AppID 和 AppSecret 可登录微信公众平台官网-设置-开发设置中获得（需要已经绑定成为开发者,且帐号没有异常状态）。AppSecret 生成后请自行保存,因为在公众平台每次生成查看都会导致 AppSecret 被重置。注意调用所有微信接口时均需使用 https 协议。如果第三方不使用中控服务器,而是选择各个业务逻辑点各自去刷新 access_token,那么就可能会产生冲突,导致服务不稳定。
            接口地址:
            https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
            HTTP请求方式: GET
            参数说明 :               
            参数 必选 说明
            grant_type 是 获取 access_token 填写 client_credential
            appid 是 第三方用户唯一凭证
            secret 是 第三方用户唯一凭证密钥,即appsecret
            返回参数说明: 正常情况下,微信会返回下述 JSON 数据包给开发者:
            {"access_token": "ACCESS_TOKEN", "expires_in": 7200}
            参数 说明
            access_token 获取到的凭证
            expires_in 凭证有效时间,单位:秒
            错误时微信会返回错误码等信息,JSON 数据包示例如下（该示例为 AppID 无效错误）:
            {"errcode": 40013, "errmsg": "invalid appid"}
      发送模板消息
        接口地址:
        https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=ACCESS_TOKEN
        (ACCESS_TOKEN 需换成上文获取到的 access_token)
        HTTP请求方式: POST
        POST参数说明:
        参数 必选 说明
        touser 是 接收者（用户）的 openid
        template_id 是 所需下发的模板消息的id
        page 否 点击模板卡片后的跳转页面,仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转。
        form_id 是 表单提交场景下,为 submit 事件带上的 formId；支付场景下,为本次支付的 prepay_id
        data 是 模板内容,不填则下发空模板
        color 否 模板内容字体的颜色,不填默认黑色
        emphasis_keyword 否 模板需要放大的关键词,不填则默认无放大
        示例:
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
        返回码说明: 在调用模板消息接口后,会返回JSON数据包。
        正常时的返回JSON数据包示例:
        {
          "errcode": 0,
          "errmsg": "ok"
        }
        错误时会返回错误码信息,说明如下:
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
        1.6 标题不能涉及营销相关内容,包括不限于:
        消费优惠类、购物返利类、商品更新类、优惠券类、代金券类、红包类、会员卡类、积分类、活动类等营销倾向通知
      2. 关键词
      2.1 同一标题下,关键词不能存在相同
      2.2 同一标题下,关键词不能存在过度相似
      2.3 关键词不能带特殊符号、个性化字词等没有行业通用性的内容
      2.4 关键词内容示例必须与关键词对应匹配
      2.5 关键词不能太过宽泛,需要具有限制性,例如:“内容”这个就太宽泛,不能审核通过
    违规说明
      除不能违反运营规范外,还不能违反以下规则,包括但不限于:
      不允许恶意诱导用户进行触发操作,以达到可向用户下发模板目的
      不允许恶意骚扰,下发对用户造成骚扰的模板
      不允许恶意营销,下发营销目的模板
  客服消息 
  转发 
    页面内发起转发 '1.2.0+'
      通过给 button 组件设置属性 open-type="share",
      可在用户点击按钮后触发页面的 onShareAppMessage() 事件,
      如果当前页面没有定义此事件,则点击后无效果.
    wx.showShareMenu({  // 显示当前页面的转发按钮 '1.1.0+' 
      withShareTicket: bol // 是否使用带 shareTicket 的转发 
      ,success: function(){    // 可选,调用成功的回调 
        // 
      }
      ,fail: function(){ }     // 可选,调用失败的回调 
      ,complete: function(){ } // 可选,调用结束的回调 
    }) 
    wx.hideShareMenu({  // 隐藏转发按钮 '1.1.0+'
      success: function(){    // 可选,调用成功的回调 
        // 
      }
      ,fail: function(){ }     // 可选,调用失败的回调 
      ,complete: function(){ } // 可选,调用结束的回调 
    })
    wx.updateShareMenu({  // 更新转发属性 '1.2.0+'
      withShareTicket: bol  // 是否使用带 shareTicket 的转发 
      ,success: function(){    // 可选,调用成功的回调 
        // 
      }
      ,fail: function(){ }     // 可选,调用失败的回调 
      ,complete: function(){ } // 可选,调用结束的回调 
    })
    wx.getShareInfo({   // 获取转发详细信息 '1.1.0+'
      shareTicket: str // 必填,shareTicket 
      ,success: function(res){    // 可选,调用成功的回调 
        res 
          .errMsg  str,错误信息
          .encryptedData  str,包括敏感数据在内的完整转发信息的加密数据
            详细见加密数据解密算法
            解密后为一 JSON 结构,包含字段如下: 
            .openGId   群对当前小程序的唯一 ID 
          .iv             str,加密算法的初始向量 
            详细见加密数据解密算法 
      }
      ,fail: function(){ }     // 可选,调用失败的回调 
      ,complete: function(){ } // 可选,调用结束的回调 
    })
    获取更多转发信息 
      通常开发者希望转发出去的小程序被二次打开的时候能够获取到一些信息,例如群的标识。
      现在通过调用 wx.showShareMenu 并且设置 withShareTicket 为 true ,
      当用户将小程序转发到任一群聊之后,可以获取到此次转发的 shareTicket,
      此转发卡片在群聊中被其他用户打开时,可以在 App.onLaunch() 或 App.onShow 
      获取到另一个 shareTicket。
      这两步获取到的 shareTicket 均可通过 wx.getShareInfo() 接口可以获取到相同的转发信息。
      只有转发到群聊中打开才可以获取到 shareTickets 返回值,单聊没有 shareTickets
      shareTicket 仅在当前小程序生命周期内有效
      由于策略变动,小程序群相关能力进行调整,开发者可先使用 wx.getShareInfo 接口中的群ID进行功能开发。    
  小程序码&小程序二维码 
    PS: 通过后台接口可以获取小程序任意页面的二维码,扫描该二维码可以直接进入小程序对应的页面
      推荐生成并使用小程序码,它具有更好的辨识度。
      接口A加上接口C,总共生成的码数量限制为100,000,请谨慎调用 
      POST参数需要转成 json 字符串,不支持 form 表单提交。
      auto_color line_color 参数仅对小程序码生效   
    小程序码获取接口A: 适用于需要的码数量较少的业务场景 
      PS: 通过该接口生成的小程序码,永久有效,数量限制见文末说明,请谨慎使用。
        用户扫描该码进入小程序后,将直接进入 path 对应的页面。
      接口地址: 'https://api.weixin.qq.com/wxa/getwxacode?access_token=ACCESS_TOKEN' 
        获取 access_token 详见文档
      POST参数&说明: { 
        path: str   // 不能为空,最大长度 128 字节
        ,width: int  // 二维码的宽度,默认: 430 
        ,auto_color: bol // 自动配置线条颜色,默认:false 
          如果颜色依然是黑色,则说明不建议配置主色调
        ,line_color: {r:"xxx" ,g:"xxx" ,b:"xxx"}  // 使用 rgb 设置颜色
          auth_color 为 false 时生效
      }
    小程序码获取接口B: 适用于需要的码数量极多,或仅临时使用的业务场景 
      PS: 通过该接口生成的小程序码,永久有效,数量暂无限制。
        用户扫描该码进入小程序后,开发者需在对应页面获取的码中 scene 字段的值,再做处理逻辑。
        使用如下代码可以获取到二维码中的 scene 字段的值。
        调试阶段可以使用开发工具的条件编译自定义参数 scene=xxxx 进行模拟,
        开发工具模拟时的 scene 的参数值需要进行 urlencode
      接口地址: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=ACCESS_TOKEN'
        获取 access_token 详见文档
      POST参数&说明: {
        scene: str 
          最大32个可见字符,只支持数字,大小写英文以及部分特殊字符:"!#$&'()*+,/:;=?@-._~",
          其它字符请自行编码为合法字符
          因不支持%,中文无法使用 urlencode 处理,请使用其他编码方式 
        ,page: 'path'  // 必须是已经发布的小程序页面,默认: 主页面 
          例如 "pages/index/index" ,根路径前不要填加'/',
          不能携带参数,参数请放在scene字段里 
        ,width: int    // 二维码的宽度,默认: 430 
        ,auto_color: bol // 自动配置线条颜色,默认: false  
          如果颜色依然是黑色,则说明不建议配置主色调
        ,line_color: {r:"xxx",g:"xxx",b:"xxx"} // 使用 rgb 设置颜色
          auto_color 为 false 时生效 
      }
      Example: 
        Page({
          onLoad: function(options) {
            // options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
            var scene = decodeURIComponent(options.scene)
          }
        })
    小程序二维码获取接口C:适用于需要的码数量较少的业务场景 
      PS: 通过该接口生成的小程序二维码,永久有效,数量限制见文末说明,请谨慎使用 
        用户扫描该码进入小程序后,将直接进入 path 对应的页面。
      接口地址: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=ACCESS_TOKEN'
        获取 access_token 详见文档 
      POST参数&说明: {
        path: str  // 不能为空,最大长度 128 字节
        ,width: int // 二维码的宽度,默认: 430 
      }
  卡券 
    wx.addCard(OBJECT)
    基础库 1.1.0 开始支持,低版本需做兼容处理
    
    批量添加卡券。
    
    Object参数说明:
    
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
    signature  String  是  -  签名,商户将接口列表中的参数按照指定方式进行签名,签名方式使用 SHA1,具体签名方案参见:卡券签名
    注:cardExt 需进行 JSON 序列化为字符串传入
    
    回调结果:
    
    回调类型  errMsg  说明
    success  addCard:ok  添加卡券成功
    fail  addCard:fail cancel  用户取消添加卡券
    fail  addCard:fail (detail message)  添加卡券失败,其中 detail message 为后台返回的详细失败原因
    success返回参数:
    
    参数  类型  说明
    cardList  ObjectArray  卡券添加结果列表,列表内对象说明请详见返回对象说明
    返回对象说明
    参数  类型  说明
    code  String  加密 code,为用户领取到卡券的code加密后的字符串,解密请参照:code 解码接口
    cardId  String  用户领取到卡券的Id
    cardExt  String  用户领取到卡券的扩展参数,与调用时传入的参数相同
    isSuccess  Boolean  是否成功
    示例代码:
    
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
    
    Object参数说明:
    
    参数  类型  必选  说明
    cardList  ObjectArray  是  需要打开的卡券列表,列表内参数详见openCard 请求对象说明
    success  Function  否  接口调用成功的回调函数
    fail  Function  否  接口调用失败的回调函数
    complete  Function  否  接口调用结束的回调函数（调用成功、失败都会执行）
    openCard 请求对象说明
    参数  类型  说明
    cardId  String  需要打开的卡券 Id
    code  String  由 addCard 的返回对象中的加密 code 通过解密后得到,解密请参照:code 解码接口
    示例代码:
    
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
    wx.openSetting({ // 调起客户端小程序设置界面,返回用户设置的操作结果 '1.1.0'    
      success: function(res){ 
        res 
          .authSetting  obj.用户授权结果
            其中 key 为 scope 值,value 为 Bool 值,表示用户是否允许授权,详见 scope 列表
      }
      ,fail: function(){ }
      ,complete: function(){ }
    })
    wx.getSetting({ // 获取用户的当前设置 '1.2.0'    
      success: function(res){ 
        res 
          .authSetting  obj.用户授权结果
            其中 key 为 scope 值,value 为 Bool 值,表示用户是否允许授权,详见 scope 列表
      }
      ,fail: function(){ }
      ,complete: function(){ }
    })
      Example: 
        wx.getSetting({      
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
  微信运动
  打开小程序 
  获取发票抬头 
  生物认证 
数据 
扩展接口 
  wx.arrayBufferToBase64(arrayBuffer) // 将ArrayBuffer转成Base64字符串 '1.1.0+' 
    const arrayBuffer = new Uint8Array([11, 22, 33])
    const base64 = wx.arrayBufferToBase64(arrayBuffer)
  wx.base64ToArrayBuffer(base64)      // 将Base64字符串转成ArrayBuffer '1.1.0+'
    const base64 = 'CxYh'
    const arrayBuffer = wx.base64ToArrayBuffer(base64)  
调试接口 
  wx.setEnableDebug({ // 设置是否打开调试开关,此开关对正式版也能生效 '1.4.0+' 
    enableDebug: <bol> // 是否打开调试
    ,success: function(){    // 可选,调用成功的回调 
      // 
    }
    ,fail: function(){ }     // 可选,调用失败的回调 
    ,complete: function(){ } // 可选,调用结束的回调 
  })
--------------------------------------------------------------------------------


















