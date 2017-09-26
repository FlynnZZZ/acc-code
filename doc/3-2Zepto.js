介绍 
  一轻量级的针对现代高级浏览器的JS库,与jQuery有着类似的api,主要针对移动端  
模块 
  ★默认模块 
  Zepto Core: 核心模块     
  Event: 通过on()& off()处理事件 
  Ajax: XMLHttpRequest 和 JSONP 实用功能     
  Form: 序列化 & 提交web表单     
  IE: 增加支持桌面的IE10+和Windows Phone 8       
  ★其他模块 
  Detect: 提供 $.os 和 $.browser 消息   
  fx: animate() 方法
  fx_methods:  以动画形式的 show, hide, toggle, 和 fade*()方法
  data:    一个全面的 data()方法, 能够在内存中存储任意对象。
  callbacks:  为"deferred"模块提供 $.Callbacks。
  deferred:   提供 $.Deferredpromises API. 依赖"callbacks" 模块. 
    当包含这个模块时候, $.ajax() 支持promise接口链式的回调。
  touch:    在触摸设备上触发tap– 和 swipe– 相关事件 
    适用于所有的touch(iOS, Android)和pointer事件(Windows Phone)。
  gesture:  在触摸设备上触发 pinch 手势事件。
  stack:   提供 andSelf& end()链式调用方法
  ios3:    String.prototype.trim 和 Array.prototype.reduce 方法 (如果他们不存在) ，以兼容 iOS 3.x.
  selector:  实验性的支持 jQuery CSS 表达式 实用功能，比如 $('div:first')和 el.is(':visible')。
  assets:  实验性支持从DOM中移除image元素后清理iOS的内存。
  
  
  
  