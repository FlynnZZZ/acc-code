◆Mobile移动端 
  IOS移动设备上,长按<a>标签,会弹出浏览器的原生菜单 
    在JS中设置取消的方法
    document.documentElement.style.webkitTouchCallout = 'none';
    代码为全局设置,若只针对某一块元素,则将其写在对应的块中;
WeiXin 微信 
  不支持的功能 
    模板字符串  ios中支持,android中不支持[20170124]
    可使用 window.open() 来打开新窗口,但都在当前窗口中打开,不支持 window.opener 来传递信息
    不支持进行跳转到上一步url中带有参数的url地址  [?]
      比如:一个查询列表页的url是: http://someweb?city=beijing
      当从这个页面跳到第二个页面比如详细页, 在详细页再执行返回上一页如: 
      location.href=document.referrer的时候   
      跳回的url就不再是 http://someweb?city=beijing   所以页面可能会死掉
      解决:微信开发中 不要用 带url参数的地址,都用/ ../ ,
      把上面的 http://someweb?city=beijing   换成   http://someweb/beijing   这种即可
  event 事件 
    禁止下滑显示网址 
      $(document).on('touchmove',function(e){
        e.preventDefault();
      })
--------------------------------------------------------------------------------
'Web Components'组件化 
  'Custom Elements'自定义HTML元素,包括特定的组成、样式和行为
    支持该标准的浏览器会提供一系列 API 给开发者用于创建自定义的元素,或者扩展现有元素
    document.registerElement('x-aoo', {      // 注册标签
      prototype: Object.create(HTMLElement.prototype, {
        createdCallback: { 
          value: function() {
            //  ...
          } 
        },
        // ...     
      }) 
    })
    x-aoo  标签类型[名字]需使用 - 连接
    不能是以下这些:
    annotation-xml、color-profile、font-face、font-face-src、
    font-face-uri、font-face-format、font-face-name、missing-glyph
    第二个参数是标签相关的配置,提供一个 prototype(以 HTMLElement 的原型为基础创建的对象)
      Example:
        在 HTML 中去使用自定义的标签:
        <div> <x-foo></x-foo> </div>
  HTML Imports
  HTML Templates
  Shadow DOM     隔离组件间代码的冲突和影响
  生命周期和回调: 
    Web Components 标准提供一系列控制自定义元素的方法
    一个自定义元素会经历以下生命周期:
      注册前创建
      注册自定义元素定义
      在注册后创建元素实例
      元素**到 document 中
      元素从 document 中移除
    ◆回调: 
      PS:元素的属性变化时
        在注册新的自定义元素时指定对应的生命周期回调,为自定义元素添加各种自定义的行为
        生命周期回调包括(括号中为 Custom Elements 2016.07.21 新标准):
    createdCallback(constructor in class)  自定义元素注册后,在实例化之后会调用
      (多用于做元素的初始化:如**子元素,绑定事件等)
    attachedCallback(connectedCallback)    元素**到 document 时触发
    detachedCallback(disconnectedCallback) 元素从 document 中移除时触发
      (用于做类似 destroy 之类的事情)
    attributeChangedCallback               元素属性变化时触发
      (可以用于从外到内的通信:外部通过修改元素的属性来让内部获取相关的数据并且执行对应的操作)
      这个回调在不同情况下有对应不同的参数:
      设置属性时,参数列表是:属性名称,null,值,命名空间
      修改属性时,参数列表是:属性名称,旧值,新值,命名空间
      删除属性时,参数列表是:属性名称,旧值,null,命名空间
    adoptedCallback:              使用 document.adoptNode(node) 时触发
    Example: 
      创建一个自定义的 button-hello 按钮,点击时会 alert('hello world'):
      document.registerElement('button-hello', {
        prototype: Object.create(HTMLButtonElement.prototype, {
          createdCallback: {
            value: function createdCallback() {
              this.innerHTML = '<button>hello world</button>'
              this.addEventListener('click', () => { alert('hello world') })
            }
          }
        })
      })
      注:上述代码执行之后才能使用 <button-hello></button-hello>
  扩展原有元素: 
    Web Components 标准提供了一种扩展现有标签的方式
    class ButtonHelloElement extends HTMLButtonElement {
      constructor() {
        super() ,
        this.addEventListener('click', () => {
          alert('hello world') 
        }) 
      } 
    } 
    customElements.define('button-hello', ButtonHelloElement, {
      extends: 'button' 
    })
    使用 is 属性来声明一个扩展的类型
    Web Components 标准中:createElement 和 createElementNS 支持元素扩展:
      const hello = document.createElement('button', 'button-hello')


