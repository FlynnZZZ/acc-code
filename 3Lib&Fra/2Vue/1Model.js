'Model'&'ViewModel'模型及相关 
  'Model',一个轻微改动过的原生JS对象 
    Vue实例代理了它观察到的数据对象的所有属性
    vm.$data.a 等价于 vm.a  
    多个Vue实例可观察同一份数据: 根据引用修改数据和修改 vm.$data 具有相同的效果 
    在较大型的应用程序中,推荐将Vue实例作为纯粹的视图看待,
    同时把数据处理逻辑放在更独立的外部数据层 
  Example: 
    ◆View
    <div id="app"> awesome {{name}}</div>
    ◆Model 
    var myData = {
      name: 'Vue.js'
    }
    new Vue({
      el: '#app'
      ,data: {}
    });
    渲染结果: awesome Vue.js    
  响应原理及不会响应的情况 
    原理: 
      Vue把数据对象的属性都转换成了ES5中的 getter/setters,
      以达到数据观察效果:无需脏值检查,也不需要刻意给Vue更新视图的信号 
      每当数据变化时,视图都会在下一帧自动更新
      一旦数据被观察,VueJS就不会再侦测到新加入或删除的属性了
      作为弥补,为被观察的对象增加'$add','$set' 和'$delete'方法 
    'mutation method'变异方法: 会改变调用该方法的原数据的方法 
      变异方法会使数据得到更新且能保证处于Vue的监控中 
      arr.push()  arr.pop() arr.shift() arr.unshift() 
      arr.splice() arr.sort() arr.reverse()
    'non-mutating method'非变异方法: 不改变原数组,返回一新数组 
      如: arr.filter() arr.concat() arr.slice()  
    Vue无法检测数据变动的情况及决解办法 
      PS: 由于JS的限制,有些操作改变数据后Vue不能检测到数据的变动,而无法触发视图更新 
        原因: 受现代js的限制[以及废弃 Object.observe]等 
      vm实例创建后新增的根级别的响应式属性 
        由于Vue会在初始化实例时对属性执行getter/setter转化过程,
        所以属性必须在 data 对象上存在才能让 Vue 转换它,这样才能让它是响应的 
        在vm实例中预定义一个值,即使为空值,针对根级别的属性  
      对象属性的添加或删除 
        new Vue({
          data: {
            aoo: {
              a: 1
            }
          }
          ,created: function (){
            setTimeout(function(){
              this.aoo.b = 2;
              // b 属性不会被vue监控
            },1000)
          }
        });
        Object.assign 直接改变不生效,需重塑对象解决  
      [当函数内仅有]数组通过索引index直接设置成员时 
        Example: 
        vm.items[num] = newValue ,虽然model中数据已经改变,但视图无渲染 
      修改数组长度时 
        vm.items.length = newLength 
      ◆通用解决办法 
      变异方法 
        arr.splice(indx,1,newVal)
      重塑数组/对象: 用新数组/对象替换旧数组/对象 
        example1.items = example1.items.filter(function (item) {
          return item.message.match(/Foo/)
        })
        Vue实现了一些智能启发式方法来最大化DOM元素重用,
        所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作
      Vue.set/vm.$set 
        Vue.set(arr,index,newVal)
        this.$set(this.arr,index,newVal)  // vm的实例方法,也是全局Vue.set方法的别名
      同时在当前函数内改变会引起视图变化的操作 [self]
        <div class="slct" >
          <div v-for="item1 in items">{{item1}}</div>
          <div v-for="i in items1" style="display:none;" >{{i.a}}</div>
          <button type="button" @click="changeItems">click</button>
        </div>
        var vm = new Vue({
          el : '.slct',
          data : {
            items :[ 1,2,3,4,5 ],
            items1 :[{a:1},{a:2},{a:3},{a:4}],
            n : 1,
          },
          methods : {
            changeItems : function(){
              console.log(this.items);
              this.items[0] = ++this.n;
              // this.items1[0].a = this.n; // 存在以否决定 items 是否会触发更新
            },
          },
        });
    异步更新队列 
      当Vue观察到数据变化,将开启一个队列,并缓冲在同一事件循环中发生的所有数据改变。
      若同一个'watcher'被多次触发,只会一次推入到队列中。
      这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。
      然后,在下一个的事件循环'tick'中,Vue 刷新队列并执行实际[已去重的]工作。
      Vue 在内部尝试对异步队列使用原生的 Promise.then 和 MutationObserver,
      若执行环境不支持,会采用 setTimeout(fn,0) 代替。
      Example:
        当设置 vm.someData = 'new value' ,该组件不会立即重新渲染。
        当刷新队列时,组件会在事件循环队列清空时的下一个“tick”更新。
        多数情况我们不需要关心这个过程,但是若你想在 DOM 状态更新后做点什么,这就可能会有些棘手。
        虽然Vuejs通常鼓励开发人员沿着“数据驱动”的方式思考,避免直接接触 DOM,但是有时我们确实要这么做。
      Vue.nextTick(callback)  在数据变化之后使用使其操作插队[SlPt]
        <div id="example">{{message}}</div>
        var vm = new Vue({
          el: '#example',
          data: {
            message: '123'
          }
        })
        vm.message = 'new message' // 更改数据
        vm.$el.textContent === 'new message' // false
        Vue.nextTick(function () {
          vm.$el.textContent === 'new message' // true
        })
        在组件内使用 vm.$nextTick() 实例方法特别方便,因为它不需要全局 Vue ,
        并且回调函数中的 this 将自动绑定到当前的 Vue 实例上:
        Vue.component('example',{
          template: '<span>{{ message }}</span>',
          data: function () {
            return {
              message: '没有更新'
            }
          },
          methods: {
            updateMessage: function () {
              this.message = '更新完成'
              console.log(this.$el.textContent) // => '没有更新'
              this.$nextTick(function () {
                console.log(this.$el.textContent) // => '更新完成'
              })
            }
          }
        })
Vue.xxx: 静态属性/方法 
  .config  Vue的全局配置对象,可在启动应用前修改配置  
    .devtools  bol,读写,是否允许'vue-devtools'检查代码 
      开发版本默认为 true,生产版本默认为 false 
    .silent    bol,读写,是否取消Vue所有的日志与警告 
    .optionMergeStrategies  自定义合并策略选项 [详参'Mixins']
    .keyCodes     自定义键位别名  
      Vue.config.keyCodes.f1 = 112;  // 单个定义,可使用 @keyup.f1
      Vue.config.keyCodes = {  // 同时定义多个
        v: 86
        ,f1: 112
        ,mediaPlayPause: 179
        ,up: [38,87] 
      }
    .productionTip  设置为'false'以阻止vue在启动时生成生产提示 ['2.2.0+'] 
  .extend(params) Vue,扩展Vue构造器,用预定义选项创建可复用的组件构造器 
    PS: 所有的Vue组件都是被扩展的Vue实例 
      在多数情况下建议将组件构造器注册为一个自定义元素,然后声明式地用在模板中 
      data 在 Vue.extend() 中它必须是函数 
    var vm = new Vue1(params); 
  .nextTick([foo,context])  在下次DOM更新循环结束之后执行延迟回调 [详见'vm.xx']
    在修改数据之后立即使用这个方法,获取更新后的DOM 
    如果没有提供回调且支持promise 的环境中返回promise ['2.1.0+']
  .set(obj,key,val)  显式更新数据[确保视图更新]  
    若为新数据则加入监控,返回设置的值  
    对象不能是Vue实例,或者Vue实例的根数据对象 
  .delete(obj/arr,key/idx)  删除对象的属性
    若对象是响应式的,确保删除能触发更新视图
    仅在'2.2.0+'版本中支持 Array + index 用法 
    目标对象不能是一个Vue实例或Vue实例的根数据对象 
  .component(tagname,options)  注册全局组件[详见组件] 
  .use(obj/foo)  安装VueJS插件 
    如果插件是一个对象,必须提供install方法。
    如果插件是一个函数,它会被作为install方法,并作为Vue的参数调用 
    当install方法被同一个插件多次调用,插件将只会被安装一次
  .compile(str)  在'render'函数中编译模板字符串,只在独立构建时有效 
    var res = Vue.compile('<div><span>{{ msg }}</span></div>')
    new Vue({
      data: {
        msg: 'hello'
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
  .version   str,VueJS版本号 
    console.log(Vue.version); // 2.3.0
'ViewModel'new Vue({   // Vue实例,'ViewModel'简称vm  
  PS: VueJS应用都是通过构造函数Vue创建一个Vue的根实例启动的; 
    所有的VueJS组件其实都是被扩展的Vue实例;
    在实例选项中,方法里的'this'即表示为'vm';
  // 定义&限定 
  name: str                  // 命令组件,只有作为组件选项时起作用 
    允许组件模板递归地调用自身;
    组件在全局用 Vue.component() 注册时,全局 ID 自动作为组件的 name
    指定 name 选项的另一个好处是便于调试。有名字的组件有更友好的警告信息。
    当在有 vue-devtools,未命名组件将显示成 <AnonymousComponent>,这很没有语义。
    通过提供 name 选项,可以获得更有语义信息的组件树。
  ,el: selector/HTMLElement  // 实例挂载元素 
    PS: 不推荐挂载根实例到<html>或<body>上 
      当选择器指向多个元素时,只接管第一个 
    挂载编译 
      该选项在实例化时是有效的,实例将立即进入编译过程,
      否则,需显式调用 vm.$mount() 手动开启编译 
    render函数和template属性不存在时 
      挂载DOM元素的HTML会被提取出来用作模板,
      此时,必须使用 Runtime + Compiler 构建的 Vue 库
  ,parent: vm  // 指定已创建的实例的父实例,建立父子关系 
    子实例可以用 this.$parent 访问父实例,子实例将被推入父实例的 $children 数组中 
    节制地使用 $parent 和 $children 
      主要目的是作为访问组件的应急方法 
      更推荐用 props 和 events 实现父子组件通信
  // 数据&模型  
  ,data: obj/fn     // 数据,用于渲染、交互的数据 
    Feature: 
      实例中默认代理其'data',使用'this'表示 
        其优先级高于其他,即'this.xx'优先在'data'中寻找 
      对象中的键名不可以'_'开头,否则无效
        {
          _key: true // 无效
        }
    Example:
      var obj = { a: 1 };
      var vm = new Vue({
        data: obj
      });
      console.log(vm.a === obj.a); // true
      // 设置属性也会影响到原始数据
      vm.a = 2;
      console.log(obj.a); // 2
      // 修改样式数据也会影响到data对象
      obj.a = 3;
      console.log(vm.a); // 3
      若在实例创建之后添加新的属性到实例上,它不会触发视图更新
    不可覆盖'data',会破坏了'data'与vm的引用关系 
      var myData = { name: 'aaa',age: 20 } 
      var vm = new Vue({ 
        data: myData
        ...
      });
      myData.age = 15; // DOM渲染成15
      vm.age = 16;     // DOM渲染成16
      myData = { name: 'bbb',age: 22 }; // 覆盖导致引用关系被破坏,DOM不会重新渲染 
        Self: 改变了变量到内存中的指向,而vm实例中的'data'仍指向原内存数据 
      myData.age = 25;                 // DOM不会重新渲染
      vm.age = 23; // DOM被渲染成23,
  ,props: arr/obj   // 接收父组件传递的数据[大小写不敏感] 
    PS: 子组件标签上添加属性及其值,并在子组件中的'props'内注册, 
      从而在子组件中获取到从父组件传递的属性值   
      在子组件中使用同'data'中的值类似,
      子组件中改变'props'中的值会影响到父组件中[由于JS对象的按引用传递] 
    ['prop0',..]   // 数组语法,声明接收的数据 
    {              // 对象的形式进行详细定义 
      prop1: Number           // str,指定接收的类型  
        PS: 若接收数据不符合规格,开发版本会发出警告 
        null       表示可为任何类型 
        Boolean   
        Number    
        String   
        Object   
        Array   
        Function  
        Symbol   
        自定义构造器函数,使用 instanceof 检测 
      ,prop2: [String,Number] // arr,可为多种类型 
      ,prop3: {               // obj,详细配置 
        default: 100           // 原始类型 默认值可直接定义  
        default: function () { // 引用类型 默认值需由工厂函数返回  
          // prop会在组件实例创建前校验,故在 default 或 validator 函数里,
          // data、computed 或 methods 等实例属性还无法使用 
          return { 
            message: 'hello' 
          };
        }
        ,type: String     // 类型 
        ,required: bol    // 是否必须 
        ,validator: function (value) {  // 自定义验证函数 
          // 根据返回值来判断传入值是否符合要求,
          // 若为false,开发版会抛出警告 
          return value > 10   
        }
      }
    }
  ,propsData: {     // 模拟传递props,主要用于测试 [只用于new创建的实例中]
    <key>: <val>
    Example: 
      var vm = new Comp({
        el: '#root'
        props: ['msg']
        ,propsData: { // 自己向自己传递props数据  
          msg: 'hello'
        }
      })
  }
  ,computed: {      // 依赖'data'或'props'数据得到的数据 
    计算属性会被混入到Vue实例中,使用方法类似'data'中的数据   
      对计算值进行赋值,无变化,
      若修改引用类型的计算值,[由于JS引用类型按引用传递]会改变值 
        默认的视图不会主动更新 
        当其他数据改变引起视图更新时,或直接在视图中渲染该数据 
        才会在视图中更新该计算值 
      当未显式在视图中渲染计算值,可能会存在计算值回调函数不回调的情况 
        决解办法: 显式的在视图中渲染该计算值,若不需要则可以隐藏 
      依赖于 计算值 的 计算值不会随依赖变化 [SlPt]
    <computedVal>: function(){  // 不能传参 
      return val; // 返回值作为该计算值的值 
    }
    <computedVal>: {  // 默认只有 get,也可提供 set 
      get: function () {      // getter 
        return xx; // 返回值作为该计算值的值 
      }
      ,set: function (val) {  // setter 
        PS: 当设置对该值进行赋值时调用   
        val  any,赋的值 
      }
    },
    Question:
      让计算值传参? 
        方式一: 使用方法来代替 
        方式二: 通过提供 set 来间接实现所需功能 
  } 
  // 方法&操作  
  ,watch: {        // 监听数据的变化  
    <key>: function(newVal,oldVal){ // 方式一 
      newVal  变化后的数据 
      oldVal  变化前的数据 
    },
    <key>: 'someMethod',         // 方式二,为一方法名  
    <key>: {                     // 方式三,使用对象的方式进行配置  
      deep: bol // 是否深度 watch 
        监听对象属性的变化,需使用深度watch,监听数组的变动则不需要 
      ,handler: function (val,oldVal) {
        // 
      }
    }
    'aoo.boo': foo/{} // 方法四,watch对象的成员 
    Question: 
      当对象变化时,如何确定是某一成员变化导致的? 方法四间接实现
  },     
  ,methods: {      // 定义的方法
    PS: methods会被混入到Vue实例中,自己使用'this.xx'调用 
    foo1: function(){
      // 
    }
  },
  ,filters: {      // 定义过滤器,详见过滤器  
    // 
  },   
  ,directives: {   // 定义指令,详见指令 
    // 
  }  
  // 视图 
  ,template: htmlStr,// 模版,会替换挂载元素及其内部元素,除非模板的内容有分发插槽 
    //若Vue选项中有'render'渲染函数,该模板将被忽略 
  ,components: { // 定义组件 
    // 
  }  
  ,render: function(createElem){  // 渲染函数,相当于'template'的作用  
    // 渲染函数接收一个 createElement 方法作为第一个参数用来创建 VNode 
    // 如果组件是一个函数组件,渲染函数还会接收一个额外的 context 参数,为没有实例的函数组件提供上下文信息
    // render 函数若存在,则 Vue 构造函数不会从 template 选项
    // 或通过 el 选项指定的挂载元素中提取出的 HTML 模板编译渲染函数 
    return createElem(
      str/obj/foo // 必填参数 
        str  // 一个 HTML 标签字符串,如'div'
        obj  // 组件选项对象 
        foo  // 一个返回值类型为 String/Object 的函数
      ,obj  // 一个包含模板相关属性的数据对象,可选参数 
        在VNode数据对象中,下列属性名是级别最高的字段。
        该对象也允许你绑定普通的HTML特性,就像DOM属性一样,
        比如'innerHTML',会取代'v-html'指令 
        {
          'class': { // 和`v-bind:class`一样的 API
            foo: true,
            bar: false
          },
          style: { // 和`v-bind:style`一样的 API
            color: 'red',
            fontSize: '14px'
          },
          attrs: { // 正常的 HTML 特性
            id: 'foo'
          },
          props: { // 组件 props
            myProp: 'bar'
          },
          domProps: { // DOM 属性
            innerHTML: 'baz'
          },
          // 事件监听器基于 `on`,所以不再支持如 `v-on:keyup.enter` 修饰器,需要手动匹配 keyCode 
          on: {
            click: this.clickHandler
          },
          // 仅对于组件,用于监听原生事件,而不是组件内部使用 `vm.$emit` 触发的事件 
          nativeOn: {
            click: this.nativeClickHandler
          },
          // 自定义指令。注意事项：不能对绑定的旧值设值
          directives: [
            {
              name: 'my-custom-directive',
              value: '2',
              expression: '1 + 1',
              arg: 'foo',
              modifiers: {
                bar: true
              }
            }
          ],
          // Scoped slots in the form of
          // { name: props => VNode | Array<VNode> }
          scopedSlots: {
            default: props => createElement('span',props.text)
          },
          // 如果组件是其他组件的子组件,需为插槽指定名称
          slot: 'name-of-slot',
          // 其他特殊顶层属性
          key: 'myKey',
          ref: 'myRef'
        }
      ,str/arr // 子节点,可选参数  
        str // 使用字符串来生成'文本节点'
        arr // 子节点'VNodes',由'createElem()'构建而成 
        [
          '先写一些文字',
          createElement('h1','一则头条'),
          createElement(MyComponent,{
            props: {
              someProp: 'foobar'
            }
          })
        ]
    )
  },
  ,renderError: function(h,err){ // 当'render'出错时,提供另外一种渲染输出  ['2.2.0+'] 
    // 只在开发者环境下工作 
    // 其错误将会作为第二个参数传递到 renderError。这个功能配合 hot-reload 非常实用
    // Example: 
    // new Vue({
    //   render (h) {
    //     throw new Error('oops')
    //   },
    //   renderError (h,err) {
    //     return h('pre',{ style: { color: 'red' }},err.stack)
    //   }
    // }).$mount('#app')
  },
  // 'Lifecycle Hooks'生命周期 
  //   钩子:某个阶段开始或者结束前、后等过程中被触发的函数;  
  //   组件的自定义逻辑可以分布在这些钩子中[Vue无'控制器'概念];
  //   钩子的'this'指向调用它的Vue实例; 
  ,beforeCreate: function(){ // 实例刚创建 
    'data'中的数据还未生效  
  },
  ,created: function(){      // 实例创建完毕 
    实例已完成的配置：
      'data observer'数据观测,可设置'data'中的数据 
      属性和方法的运算、
      watch/event事件回调 
    挂载阶段还没开始,$el 属性目前不可见 
  },
  ,beforeMount: function(){    // 模版编译挂载/DOM渲染前 
    在挂载前被调用：相关的 render 函数首次被调用 
    该钩子在服务器端渲染期间不被调用
  },
  ,mounted: function(){        // DOM渲染完毕 
    PS: 替换'1.x'版本的'ready'   
    el被新创建的 vm.$el 替换,并挂载到实例后调用 
    该钩子在服务器端渲染期间不被调用 
    如果 root 实例挂载了一个文档内元素,当 mounted 被调用时 vm.$el 也在文档内 
    this.$nextTick(function () {
      注意 mounted 不会承诺所有的子组件也都一起被挂载。
      如果希望等到整个视图都渲染完毕,可用 vm.$nextTick()  
      Self: 
        使用jQuery此时仍获取不到子组件的DOM元素,
        需在子组件中的mounted内才能获取到子组件中‹包括其他子组件中›的DOM 
    })
  },
  ,beforeUpdate: function(){ // 组件更新前  
    发生在虚拟 DOM 重新渲染和打补丁前 
    可在该钩子中进一步地更改状态,但会触发附加的重渲染过程 
    该钩子在服务器端渲染期间不被调用     
  }
  ,updated: function(){      // 组件更新后 
    当这个钩子被调用时,组件 DOM 已经更新
    由于数据更改导致的虚拟DOM重新渲染和打补丁后会调用该钩子 
    'updated'不会承诺所有的子组件也都一起被重绘。
    若希望等到整个视图都重绘完毕,可以用 vm.$nextTick() 
  },
  ,beforeDestroy: function(){    // 实例销毁前,此时实例仍然可用 
    该钩子在服务器端渲染期间不被调用
  },
  ,destroyed: function(){        // 组件销毁后 
    销毁观察、组件及事件 
    该钩子在服务器端渲染期间不被调用
    调用后,Vue实例指示的所有东西都会解绑,
    所有的事件监听器会被移除,
    所有的子实例也会被销毁 
  },
  ,activated: function(){      // <keep-alive>组件激活时 
    PS: 该钩子在服务器端渲染期间不被调用 
  },
  ,deactivated: function(){    // <keep-alive>组件移除时 
    该钩子在服务器端渲染期间不被调用 
  }
  // 组合选项 
  ,mixins: []       // 混合,详见混合  
    接受一个混合对象的数组,这些混合实例对象可以像正常的实例对象一样包含选项,
    Mixin 钩子按照传入顺序依次调用,并在调用组件自身的钩子之前被调用 
  ,extends: obj/foo // 允许声明扩展另一个组件(可是一个简单的选项对象或构造函数) 
    // 和 mixins 类似,区别在于,组件自身的选项会比要扩展的源组件具有更高的优先级 
    // Example: 
    // var CompA = { ... } 
    // 在没有调用 `Vue.extend` 时候继承 CompA
    // var CompB = {
    //   extends: CompA,
    //   ...
    // }
  'provide'和'inject'主要为高阶插件/组件库提供用例,并不推荐直接用于应用程序代码中 
    // 这对选项需一起使用,以允许一个祖先组件向其所有子孙后代注入一个依赖,不论组件层次有多深,
    // 并在起上下游关系成立的时间里始终生效 
    // provide 和 inject 绑定并不是可响应的。这是刻意为之的。
    // 然而,如果你传入了一个可监听的对象,那么其对象的属性还是可响应的。
  ,provide: obj/foo     '2.2.0+' 
    // 该对象包含可注入其子孙的属性 
    // 参数为一个对象或返回一个对象的函数
  ,inject: arr/obj      '2.2.0+' 
    // 参数为一个字符串数组或一个对象,该对象的 key 代表了本地绑定的名称,
    // value 为其 key 以在可用的注入中搜索。
    Example: 
    var Provider = {
      provide: {
        foo: 'bar'
      },
      // ...
    }
    var Child = {
      inject: ['foo'],
      created () {
        console.log(this.foo) // => "bar"
      }
      // ...
    }
    接下来 2 个例子只工作在 Vue 2.2.1 或更高版本。
    低于这个版本时,注入的值会在 props 和 data 初始化之后得到。
    使用一个注入的值作为一个属性的默认值：
    const Child = {
      inject: ['foo'],
      props: {
        bar: {
          default () {
            return this.foo
          }
        }
      }
    }
    使用一个注入的值作为数据入口：
    const Child = {
      inject: ['foo'],
      data () {
        return {
          bar: this.foo
        }
      }
    }
  // 其他选项 
  ,delimiters: arr   // 改变纯文本插入分隔符 
    // 该选项只在完整构建版本中的浏览器内编译时可用 
    // 默认值：["{{","}}"]
    // Example:  改为 ES6 模板字符串的风格
    // new Vue({
    //   delimiters: ['${','}']
    // })
  ,functional: bol  // 使组件无状态[没有 data]和无实例[没有 this 上下文] 
    // 用一个简单的 render 函数返回虚拟节点使他们更容易渲染 
  ,model: { // 允许一个自定义组件在使用 v-model 时定制 prop 和 event  '2.2.0+'
    // 默认情况下,一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event,
    // 但是一些输入类型比如单选框和复选框按钮可能像使用 value prop 来达到不同的目的。
    // 使用 model 选项可以回避这些情况产生的冲突。
    prop: '',
    event: ''
  } 
  ,inheritAttrs: bol // 默认值:true  '2.4.0+'
    // 默认情况下父作用域的不被认作 props 的特性绑定 (attribute bindings) 
    // 将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上。
    // 当撰写包裹一个目标元素或另一个组件的组件时,这可能不会总是符合预期行为。
    // 通过设置 inheritAttrs 到 false,这些默认行为将会被去掉。
    // 而通过 (同样是 2.4 新增的) 实例属性 $attrs 可以让这些特性生效,
    // 且可以通过 v-bind 显性的绑定到非根元素上。
    // 这个选项不影响 class 和 style 绑定。
  ,comments: bol  // 是否保留且渲染模板中的HTML注释,默认：false  '2.4.0+'
    // 该选项只在完整构建版本中的浏览器内编译时可用。
})  
vm.xxx.实例属性/方法/事件 
  PS: .$xx [带有前缀$的]实例方法/属性,在配置对象中使用'this'代替'vm' 
  实例属性 
  .$options 只读,当前Vue实例的初始化选项 
    Example: 在选项中包含自定义属性时 
    new Vue({
      myOption: 123,
      created: function () {
        console.log(this.$options.myOption) //  123
      }
    })
  .$el      HTMLElement,只读,Vue实例使用的根DOM元素 
  .$data    Vue实例观察的数据对象 
  .$props   当前组件接收到的props对象  '2.2.0+' 
    <child-a v-bind="$props"></child-a> 
    // 通过 $props 将父组件的 props 一起传给子组件 
  ★关系组件实例访问 
    可读写其'data'/'computed'等数据
    可调用其方法 
    ... 
  .$root       只读,当前组件树的根Vue实例,若当前实例无父实例,则是其自己 
  .$parent     只读,父实例[若存在的话]
  .$children   只读,当前实例的直接子组件 
    $children 并不保证顺序,也不是响应式的 
  .$refs.xxx   只读,包含已注册过'ref'的所有子组件的对象 
    Example: 
      vm.$refs.aoo 表示 <cpt-a ref="aoo"> 子组件 
  ★
  .$slots      只读,用来访问被插槽分发的内容 
    每个具名插槽 有其相应的属性 (例如：slot="foo" 中的内容将会在 vm.$slots.foo 中被找到)。
    default 属性包括了所有没有被包含在具名插槽中的节点。 
  .$scopedSlots 只读,用来访问作用域插槽   '2.1.0+' 
    对于包括 默认 slot 在内的每一个插槽,该对象都包含一个返回相应 VNode 的函数。
  .$isServer    只读,当前Vue实例是否运行于服务器的布尔值 
  .$attrs       只读,包含了父作用域中不被认为[且不预期为]'props'的特性绑定 [class 和 style 除外] 
    当一个组件没有声明任何 props 时,这里会包含所有父作用域的绑定 (class 和 style 除外),
    并且可以通过 v-bind="$attrs" 传入内部组件——在创建更高层次的组件时非常有用。
  .$listeners   只读,包含了父作用域中的[不含'.native'修饰器的]v-on事件监听器 
    它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用 
  实例方法
  .$watch( // 监控元素改变的方法 
    'key'                     // data对象中的属性,一个表达式或计算属性函数 
      表达式只接受监督的键路径。对于更复杂的表达式,用一个函数取代。
      // 键路径
      vm.$watch('a.b.c',function (newVal,oldVal) {
        // 做点什么
      })
      // 函数
      vm.$watch(
        function () {
          return this.a + this.b
        },
        function (newVal,oldVal) {
          // 做点什么
        }
      )
    ,function(newVal,oldVal){ // 回调函数 
      newVal   改变后的新值 
      oldVal   改变前的旧值 
    }
    ,{                        // 可选,配置选项 
      deep: bol        // 为了发现对象内部值的变化,可以在选项参数中指定 deep: true 
        vm.$watch('someObject',callback,{
          deep: true
        })
        vm.someObject.nestedValue = 123
      ,immediate: bol  // immediate: true 将立即以表达式的当前值触发回调
        vm.$watch('a',callback,{
          immediate: true
        })
        // 立即以 `a` 的当前值触发回调
    }
  )  
    Output: 一取消观察函数,用来停止触发回调
      var unwatch = vm.$watch('a',cb)
      unwatch() // 取消观察
    Example: 
      vm.$watch('a',function (newVal,oldVal) {
          // 回调将在`vm.a`值改变后调用 
      })
  .$set(obj/arr,key/idx,val) 返回设置的值,效果同Vue.set()  
  .$delete(obj/arr,key/idx)  效果同Vue.delete()  
  .$on('event-name'/arr,foo)     监听事件,触发回调   [数组只在'2.2.0+'中支持] 
    监听当前实例上的自定义事件。事件可以由 vm.$emit() 触发
    回调函数会接收所有传入事件触发函数的额外参数。
    this.$on('hook:beforeDestroy', function () { // 监听生命周期并指定响应  
      // 
    })
  .$once('event-name',foo)  监听事件,但只触发一次,在第一次触发之后移除监听器 
  .$off(['event-name'/arr,foo])   移除自定义事件监听器     [只在'2.2.2+'支持数组]
    如果没有提供参数,则移除所有的事件监听器；
    如果只提供了事件,则移除该事件所有的监听器；
    如果同时提供了事件与回调,则只移除这个回调的监听器。
  .$emit('event-name',data1 ,...?)  触发事件,传递数据 
    附加参数都会传给监听器回调 
  .$mount(elem/selector)    手动编译Vue实例,返回实例自身 
    如果Vue实例在实例化时没有收到'el'选项,则它处于'未挂载'状态,没有关联的DOM元素。
    可以使用 vm.$mount() 手动地挂载一个未挂载的实例。
    如果没有提供挂载点,模板将被渲染为文档之外的的元素,需使用原生 DOM API 把它插入文档中
    var MyComponent = Vue.extend({
      template: '<div>Hello!</div>'
    })
    // 创建并挂载到 #app (会替换 #app)
    new MyComponent().$mount('#app')
    // 同上
    new MyComponent({ el: '#app' })
    // 或者,在文档之外渲染并且随后挂载
    var component = new MyComponent().$mount()
    document.getElementById('app').appendChild(component.$el)
  .$forceUpdate()  迫使Vue实例重新渲染
    仅影响实例本身和插入插槽内容的子组件[而非所有子组件] 
  .$nextTick(function(){ // 将回调延迟到下次DOM更新循环后执行 
    在修改数据之后立即使用它,然后等待 DOM 更新。
    跟全局方法 Vue.nextTick 一样,不同的是回调的 this 自动绑定到调用它的实例上。
    如果没有提供回调且支持Promise的环境中返 Promise  '2.1.0+' 
    Example: 
      Vue.component('example',{
        template: '<span>{{ message }}</span>',
        data: function () { return {
          message: '没有更新'
        }}
        ,methods: {
          updateMessage: function () {
            this.message = '更新完成'
            // 用于Vue采用异步队列来更新DOM,此时DOM还未更新
            console.log(this.$el.textContent) // => '没有更新'
            this.$nextTick(function () {
              console.log(this.$el.textContent) // => '更新完成'
            })
          }
        }
      })
  })  
  .$destroy()      完全销毁一个实例 
    清理它与其它实例的连接,解绑它的全部指令及事件监听器 
    触发 beforeDestroy 和 destroyed 的钩子 
--------------------------------------------------------------------------------
'Filters'过滤器,'Mustache'或'v-bind'中对值进行处理  
  PS: 设计目的是用于文本转换,复杂的数据变换应使用计算属性 
  ◆设定
  Vue.filter('filterFoo1',function (val[,arg1,..]){  // 全局过滤器[可在所有实例中使用] 
    PS: 过滤器函数总接受"|"左边的值作为第一个参数
    val  '|'左边的值 
    arg  可选,表示使用时传入的额外参数 
    return ; // 返回值为过滤器处理后的值 
  }) 
  filters: {   // 在组件配置中定义组件的过滤器 
    filterFoo1: function(val[arg1,..]){
      return ;
    } 
  }
  ◆使用: 在视图中使用'|',"|"右的过滤器对"|"左的值进行处理 
  '|'管道符,类似Linux中的管道  
  'Mustache'中: {{ message | filterFoo }}
  'v-bind'中['2.1.0+']: <div v-bind:id="rawId | filterFoo"></div>
  接收参数: {{ message | filterFoo(arg1,arg2,..) }} 
    arg1作为第二个参数,arg2作为第三个参数,...
  过滤器串联: {{ message | filterA | filterB }}
  Example: 
    Vue.filter('reverse',function (value) {
      return value.split('').reverse().join('')
    })
'Custom Directives'自定义指令[在HTML中指定,不区分大小写] 
  v-name:arg.mdf1.mdf2="val"   用于对DOM元素进行底层操作 
    'name'  指令名称 
    'arg'   可选,指令的参数 
    'mdf'   可选,指令的修改器  
    'val'   可选,指令的值 
      指令值为对象字面量 
        指令函数能够接受所有合法类型的JS表达式 
        <div v-demo="{ color: 'white',text: 'hello!' }"></div>
        Vue.directive('demo',function (el,binding) {
          console.log(binding.value.color) // => "white"
          console.log(binding.value.text)  // => "hello!"
        })    
      可为'data'/'computed'等中的值,会动态的接收到更新
  Vue.directive('name',obj/foo) // 定义全局指令 
    name  指令名称 
    obj   {  // 配置对象 
        <hookName>: function(){  // 指令定义钩子函数
          // 
        }
        ...
      }
    foo   简写为函数: 在'bind'和'update'钩子上做重复动作,而不关心其它的钩子函数 
      Vue.directive('color-swatch',function (el,binding) {
        el.style.backgroundColor = binding.value
      })
  directives: {                 // 注册组件指令  
    focus: {
      // 指令定义钩子函数  
    }
  },              
  Example: 
    <div id="aoo"> <input v-focus > </div>
    Vue.directive('focus',{
      inserted: function (el) {
        el.focus();
        console.log(11111);
      }
    });
    new Vue({
      el : '#aoo',
    });
  ◆<hookName>: foo,指令定义[钩子]函数 
    bind: function(el,binding,vnode){      // 指令初始化 
      // 指令第一次绑定到元素时调用,只调用一次 
    }     
    inserted: function(el,binding,vnode){  // 被绑定元素插入父节点时调用 
      PS: 仅保证父节点存在,但不一定已被插入文档中,父节点存在即可调用,不必存在于'document'中 
      Feature: 
        该钩子函数中,无法检查到绑定值的变化,'update'钩子中才能检测到 
          如在绑定的事件回调中,无法通过绑定值变化来执行不同的逻辑 
    } 
    update: function(el,binding,vnode,oldVnode){ // 所在组件的vnode更新时调用 
      导致vnode更新的一些时机  
        绑定值变化话时<在指令钩子函数中绑定值最好只读> 
        视图中渲染的数据变化时  
        ... 
      指令的值可能发生了改变也可能没有 
        可通过比较更新前后的值绑定值'binding.value'和'binding.oldValue'
        来忽略不必要的模板更新 
      Example:  
        当DOM渲染有更新时
        <div id="demo1" >
          <input type="text"  v-test1>
          <button type="button"  @click="inputFocus">click</button>
          <span>{{inputIsFocus}}</span>
          <!-- // 是否存在span元素直接决定钩子函数是否执行 -->
        </div>
        或改为: 当指令的值有变化时 
        <div id="demo1" >
          <input type="text" v-test1="inputIsFocus">
          <button type="button" @click="inputFocusFn">click</button>
        </div>
        Vue.directive('test1',{
          update : function(el,binds,vn,oVn){
            el.focus();
            console.log(11);
          },
        });
        new Vue({
          el: '#demo1',
          data: {
            inputIsFocus : false,
          },
          methods : {
            inputFocusFn : function(){
              this.inputIsFocus = !this.inputIsFocus;
              console.log(this.inputIsFocus);
            },
          },
        })
    }
    componentUpdated: function(el,binding,vnode,oldVnode){ 
      PS: 所在组件的VNode及其后代VNode全部更新时调用  
    }
    unbind: function(el,binding,vnode){    // 指令与元素解绑时调用,只调用一次 
      // 
    }
    ★钩子函数的参数 
      PS: 除'el'外,其它参数都应只读,需传递数据可使用元素的 dataset 来进行  
    el       指令所绑定的元素,可用于操作DOM 
      el.focus()   表单获得焦点
      el.select()  表单值被选中
    binding  对象,包含以下属性 
      'name'       指令名,不包括'v-'前缀 
      'value'      指令绑定值,即自定义指令等号右边的值 
        例如: v-my-directive="1 + 1",value 的值是 2
      'expression' 指令绑定值的字符串形式 
        例如 v-my-directive="1 + 1" ,expression 的值是 "1 + 1" 
      'arg'        指令参数 
        例如 v-my-directive:foo,arg 的值是 "foo"
      'modifiers'  一个包含该指令所有修饰符的对象 
        Example: 
          例如: v-my-directive.foo.bar,
          修饰符对象 modifiers 的值是 { foo: true,bar: true }
      'oldValue'   指令绑定的前一个值,仅在'update'和'componentUpdated'钩子中可用 
        无论值是否改变都可用
    vnode    Vue编译生成的虚拟节点 
      vnode.context vm,该自定义指令所属的vm实例对象  
    oldVnode 上一个虚拟节点 
      Example:
        <div id="map" v-drct:arg.a.b="msg"></div>
        Vue.directive('drct',{
          bind: function (el,binds,vnode,oldVnode) {
            var s = JSON.stringify
            el.innerHTML = 
              'name: '       + s(binds.name) + '<br>' +
              'value: '      + s(binds.value) + '<br>' +
              'expression: ' + s(binds.expression) + '<br>' +
              'argument: '   + s(binds.arg) + '<br>' +
              'modifiers: '  + s(binds.modifiers) + '<br>' +
              'vnode keys: ' + Object.keys(vnode).join(',') +'<br>'+
              'oldVnode keys: ' + Object.keys(oldVnode).join(',') 
          }
        });
        new Vue({
          el: '#map',
          data: {
            msg: 'thisisamessage',
          }
        });
        显示为:
        name: "drct"
        value: "thisisamessage"
        expression: "msg"
        argument: "arg"
        modifiers: {"a":true,"b":true}
        vnode keys: tag,data,children,text,elm,ns,context,functionalContext,key,componentOptions,componentInstance,parent,raw,isStatic,isRootInsert,isComment,isCloned,isOnce
        oldVnode keys: tag,data,children,text,elm,ns,context,functionalContext,key,componentOptions,componentInstance,parent,raw,isStatic,isRootInsert,isComment,isCloned,isOnce 
  ★Self: 
    自定义指令,实现回调及传参 
      PS: 传递的参数不要对其进行更改<尽量只读>,可能存在bug<有时不会触发变更,即使修改对象> 
      Example: 自定义指令实现点击事件及传参 
        <div v-self-click="{fn: clickFn, arg: argData}"></div>
        new Vue({
          data: {
            argData: 1
          }
          ,methods: {
            clickFn: function(arg){
              console.log(arg);
            }
          }
          ,directives: {
            'self-click': {
              inserted : function(el,binds,vn){
                el.addEventListener("click",function(e){
                  var obj = binds.value 
                  obj.fn(obj.arg)
                })
              }
            }
          }
        });
      传参需通过绑定值为对象的形式来实现,而直接绑定传参函数,会导致函数直接执行了 
        如 v-self-click="clickFn(argData)"  
        默认在vue解析绑定值时,就将函数执行了 
'Mixins'混合,分发Vue组件中可复用功能的方式 
  PS: 混合对象可以包含任意组件选项,
    使用混合时,所有混合对象的选项将被混入该组件本身的选项 
  Vue.mixin({..})   全局混合,会混入之后所有创建的Vue实例 
    Example: 
      Vue.mixin({
        created: function () {
          // 为自定义的选项 'myOption' 注入一个处理器。
          var myOption = this.$options.myOption 
          if (myOption) {
            console.log(myOption)
          }
        }
      })
      new Vue({
        myOption: 'hello!'
      })
      // "hello!"
  mixins: [mix1,..] 组件的混合 
    var myMixin = { // 定义一个混合对象 
      data: function(){ // 需使用函数返回值的形式 
        return {
          
        };
      }
      methods: {
        hello: function () {
          console.log('hello from mixin!')
        }
      }
      ,created: function () {
        this.hello()
      }
    }
    var vm = new Vue({
      el: '#test'
      ,data: {}
      ,methods: {}
      ,mixins: [myMixin]
      ,created: function (){
        var that = this;
      }
    });
  与混合对象含有同名选项时 
    同名钩子函数将混合为一个数组,故都将被调用;
      混合对象的钩子将在组件自身钩子前调用,
      多个混合中的调用顺序为传入数组的顺序   
    值为对象的选项,将被混合为一个对象 
      如'methods'、'components'及'directives'等 
      冲突时,组件对象优先级高 
  Vue.config.optionMergeStrategies  自定义选项合并策略 [todo]
    自定义选项将使用默认策略,即简单地覆盖已有值
    向 Vue.config.optionMergeStrategies 添加一个函数,以自定义逻辑合并
    Vue.config.optionMergeStrategies.myOption = function (toVal,fromVal) {
      // return mergedVal
    }
    对于大多数对象选项,可以使用 methods 的合并策略：
    var strategies = Vue.config.optionMergeStrategies
    strategies.myOption = strategies.methods 
    更多高级的例子可以在 Vuex 的 1.x 混合策略里找到：
    const merge = Vue.config.optionMergeStrategies.computed
    Vue.config.optionMergeStrategies.vuex = function (toVal,fromVal) {
      if (!toVal) return fromVal
      if (!fromVal) return toVal
      return {
        getters: merge(toVal.getters,fromVal.getters),
        state: merge(toVal.state,fromVal.state),
        actions: merge(toVal.actions,fromVal.actions)
      }
    }
--------------------------------------------------------------------------------
