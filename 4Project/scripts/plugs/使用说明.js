clipboard.js  文本复制功能 
使用方式 
  1 通过 script 标签引入 
    clipboard = new ClipboardJS('#btn');
    clipboard.on('success', function(e) {
      console.log('复制成功!' ,e.text);
    });
    clipboard.on('error', function(e) {
      console.log(e);
    });
  2 模块化引入 
    var { ClipboardJS } = require("./clipboard2.0.1.min.js") 
说明: 
  IOS下,复制的按钮必须是 button, 否则复制不了 
--------------------------------------------------------------------------------  
store.js  本地存储localstorage的封装  
说明 
  工作机制
    store.js 优先选择 localStorage 来进行存储,
    在 IE6 和 IE7 下降级使用userData来达到目的,
    没有使用 flash ,不会减慢你的页面加载速度,
    也没有使用 cookies ,不会使你的网络请求变得臃肿。
    依赖 JSON 来序列化数据进行存储。
使用 
  $ npm i store 
    var store = require('store')
  <script src="path/to/my/store.min.js"></script> 
    store 被注入为全局变量  
API 
  store.enabled bol,检测是否可用存储的标识 
    PS: 如在使用Safari的private browsing 模式[无痕浏览模式]的时
      ,localStorage虽然可用,但会抛出错误,
      其他浏览器允许用户临时禁止localStorage的使用时,
      Store.js 会检测这些设置并相应的更改 store.enabled 标识 
    if (!store.enabled) {
      alert(
        `Local storage is not supported by your browser. 
        Please disabled "Private Mode", 
        or upgrade to a modern browser`
      )
      return
    }
    var user = store.get('user')
  store.set(key, val)  // 写入 
    PS: 存储对象,store.js 内部使用了 JSON.stringify 方法
    key  str,索引键 
    val  any,写入值 
  store.get(key)       // 读取 
    PS: 获取存储的对象,store.js 内部使用了 JSON.parse 方法
  store.getAll()       // 读取所有值,以对象形式返回 
  store.remove(key)    // 清除 
  store.clear()        // 清除所有 
  store.clearAll()     // 清除所有 
  store.each(function(value, key) {     // 遍历所有 
    console.log(key, '==', value)
  })
node.js 中使用
  需设置下 global.localStorage 
  global.localStorage = require('localStorage')
  var store = require('./store')
  store.set('foo', 1)
  console.log(store.get('foo'))
      








































