mpvue'Vue.js in mini program',使用VueJS开发小程序的前端框架 
  PS: 框架基于 Vue.js 核心,mpvue 修改了 Vue.js 的 runtime 和 compiler 实现, 
    使其可以运行在小程序环境中,从而为小程序开发引入了整套 Vue.js 开发体验
  Feature: 
    组件化,提高代码复用性 
    vuex集中数据管理,方便构建复杂应用
    Webpack构建  
    支持使用 npm 外部依赖
    H5代码转换编译成小程序目标代码的能力,HTML标签+小程序标签 
操作步骤 
  PS: 快速创建和启动一个带热重载、保存时静态检查、内置代码构建功能的小程序项目 
  $ npm i -g vue-cli                             // 全局安装vue-cli
  $ vue init mpvue/mpvue-quickstart <my-project> // 使用vue-cli创建mpvue项目 
  $ cd my-project                                // 进入目录 
  $ npm i                                        // 安装依赖 
  $ npm run dev                                  // 运行项目  
    新增的页面需要重新 npm run dev 来进行编译 
项目的目录结构 
  PS: 当源码有改变时项目会自动编译
  build 
  config 
  dist              // 小程序相关代码
  node_modules 
  src 
    app.vue 
    main.js 
  static 
  .babelrc 
  indexl.html 
  package.json 
  README.md 
微信开发者工具中配置 
  项目目录 
    创建的项目目录[非dist目录] 
  appID   
    自己小程序的appID或选体验“小程序”[只影响是否可以真机调试]  
配套设施  
  PS: mpvue作为小程序版本的VueJS,在框架SDK外,完整的技术体系还包括如下设施 
  mpvue-loader: 提供webpack版本的加载器
  mpvue-webpack-target: webpack构建目标
  postcss-mpvue-wxss: 样式代码转换预处理工具 
  px2rpx-loader: 样式转化插件 
其他细节: 
  mpvue-template-compiler 提供了将 vue 的模板语法转换到小程序的 wxml 语法的能力 
  生命周期: 
    小程序 onReady 后,再去触发 vue mounted 生命周期  
    mpvue 还兼容了小程序生命周期
      PS: 这部分生命周期钩子的来源于微信小程序的 Page, 除特殊情况外,不建议使用小程序的生命周期钩子。
      app 部分：
        onLaunch,初始化
        onShow,当小程序启动,或从后台进入前台显示
        onHide,当小程序从前台进入后台
      page 部分：
        onLoad,监听页面加载
        onShow,监听页面显示
        onReady,监听页面初次渲染完成
        onHide,监听页面隐藏
        onUnload,监听页面卸载
        onPullDownRefresh,监听用户下拉动作
        onReachBottom,页面上拉触底事件的处理函数
        onShareAppMessage,用户点击右上角分享
        onPageScroll,页面滚动
        onTabItemTap, 当前是 tab 页时,点击 tab 时触发 （mpvue 0.0.16 支持）
      用法示例：
        new Vue({
          data: {
            a: 1
          },
          created () {
            // `this` 指向 vm 实例
            console.log('a is: ' + this.a)
          },
          onShow () {
            // `this` 指向 vm 实例
            console.log('a is: ' + this.a, '小程序触发的 onshow')
          }
        })
  路由: 
    微信小程序的页面的 query 参数是通过 onLoad 获取的,
    mpvue 对此进行了优化,直接通过 this.$root.$mp.query 获取相应的参数数据,
    其调用需要在 onLoad 生命周期触发之后使用,比如 onShow 等
  模版语法: 
    v-html 不可用 
    模版语法不支持部分复杂的JS表达式
      目前可用的有: + - * % ?: ! == === > < [] .,剩下的还待完善
      
      <!-- 这种就不支持,建议写 computed -->
      <p>{{ message.split('').reverse().join('') }}</p>
      
      <!-- 但写在 @event 里面的表达式是都支持的,因为这部分的计算放在了 vdom 里面 -->
      <ul>
        <li v-for="item in list" @click="clickHandle(item, index, $event)">
          {{ item.value }}
        </li>
      </ul>
    不支持过滤器 
  
  
  
  
  
  
  
  
  