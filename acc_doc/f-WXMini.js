微信小程序 
说明
  文件夹pages下的脚本以及样式继承最外面的'app.js'和'app.wxcss' 
工程目录及文件 
  每个文件下基本可以分为：'.js''.wxml''.wxss''.json'等文件组成 
    '.js'   描述页面的逻辑信息 
    '.wxml' 描述页面的布局信息 
    '.wxss' 描述页面的布局的样式信息 
  项目总体配置信息：'app.js''app.json''app.wxss' 三个文件组成 
    'app.json': 描述整个工程的页面信息[由"pages"描述]
      "window"主要描述该项目整体背景,导航栏等样式
      如果某个文件夹中某个'.json'文件中有相同的描述,则会覆盖"window"中描述的信息 
    'app.wxss': 主要描述该项目整体的样式 
    'app.js': 主要描述该项目入口逻辑,主要描述一些用户登录后的信息 
微信Web开发者工具使用 
  快速创建文件[包括'.js''.json''.wxml''.wxss']
    在'app.json'中的'pages'中新增元素即可[注意最后一个不可有',']
      即使在'app.json'中删除了'pages'的元素,新增加的文件也不会被删除 
配置'.JSON'文件 
  PS: 在指定页面的'.JSON'中配置则影响该页面,在'app.json'中配置影响所有页面[继承关系] 
  "enablePullDownRefresh": true    下拉刷新 
    onPullDownRefresh: function () {  // 下拉刷新回调接口
    },
  "enablePullDownRefresh": true    上拉加载 
    onReachBottom: function () {  // 下拉回调 
    },
wx 
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
HTML组件指令
  wx:for="{{arr}}"   循环渲染 
    当前下标默认为: 'index';当前项默认为: 'item' 
      <view wx:for="{{items}}">
        {{index}}: {{item:one}}
      </view>
    wx:for-item="placeholder"  指定当前项 
    wx:for-index="placeholder" 指定当前下标 
      <view wx:for="{{items}}" wx:for-item="name"  wx:for-index="id">
        {{id}}: {{name.one}}
      </view>



-------------------------------------------------------------------------待整理 

