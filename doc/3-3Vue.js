VueJS,数据驱动,组件化开发模式,渐进式前端类MVVM框架 
  介绍
    支持IE9+[使用了ES5特性];非压缩版有错误提示和警告,而压缩版则没有;
    API设计受AngularJS、KnockoutJS、RactiveJS和RivetsJS影响;
    Vue没有完全遵循MVVM格式,但受其启发;
  说明 
    标签属性、标签名不区分大小写,需将'camelCased'驼峰转换为'kebab-case'短横线隔开式  
安装|启动 
  <script>标签引入: 'Vue'被注册为一个全局变量
    异步组件 
      在不使用脚手架的情况下将一个个组件分别独立成一个个html文件,
      再去引用注册它们,也是可以实现的,但一般不推荐这样做
      vue.js 可以将异步组件定义为一个工厂函数
      Example: 
        // head.html 
        <div> 这是头部  </div>
        // index.html 中异步引入 head.html 作为组件
        <div id="app1">
          <head-com></head-com>
        </div>
        Vue.component('head-com', function (resolve, reject) {
          $.get("./head.html").then(function (res) {
            resolve({
              template: res
            })
          });
        });
        var app1 = new Vue({
          el: '#app1'
        });
  'vue-cli'Vue脚手架 [见'bTools']
View&Model 
  e.g.：
    View
    <div id="app"> awesome {{name}}</div>
    Model 
    var myData = {
      name: 'Vue.js'
    }
    ViewModel : 创建一个Vue实例,连接上面的view和model 
    new Vue({
      el: '#app',
      data: myData
    });
    渲染结果: awesome Vue.js    
  'View'视图  Vue实例管理的DOM节点 
    当一Vue实例被创建时,它会递归遍历根元素的所有子节点,同时完成必要的数据绑定,
    当视图被编译后,它就会自动响应数据的变化,
    使用VueJS时,除了自定义指令,几乎不必直接接触 DOM,
    当数据发生变化时,视图将会自动触发更新,
    这些更新的粒度精确到一个文字节点,
    同时为了更好的性能,这些更新是批量异步执行的;
  'Model'模型 一个轻微改动过的原生JS对象 
    VueJS中的模型就是普通的JS对象——也可以称为数据对象 
    一旦某对象被作为Vue实例中的数据,它就成为一个 “反应式” 的对象了
    可操作它们的属性,同时正在观察它的 Vue 实例也会收到提示
    VueJS把数据对象的属性都转换成了ES5中的 getter/setters,
    以此达到无缝的数据观察效果:无需脏值检查,也不需要刻意给 Vue 任何更新视图的信号
    每当数据变化时,视图都会在下一帧自动更新
    Vue实例代理了它们观察到的数据对象的所有属性
    所以一旦一个对象 { a: 1 } 被观察,那么 vm.$data.a 和 vm.a 将会返回相同的值,
    而设置 vm.a = 2 则也会修改 vm.$data
    数据对象是被就地转化的,所以根据引用修改数据和修改 vm.$data 具有相同的效果
    这也意味着多个 Vue 实例可以观察同一份数据
    在较大型的应用程序中,我们也推荐将 Vue 实例作为纯粹的视图看待,
    同时把数据处理逻辑放在更独立的外部数据层 
    一旦数据被观察,VueJS 就不会再侦测到新加入或删除的属性了
    作为弥补,我们会为被观察的对象增加'$add','$set' 和'$delete'方法 
'Vue.xx'静态属性/方法 
  Vue.config  Vue的全局配置对象,可在启动应用前修改配置  
    Vue.config.devtools = bol  是否允许'vue-devtools'检查代码 
      开发版本默认为 true,生产版本默认为 false 
    Vue.config.silent = bol    是否取消Vue所有的日志与警告 
    Vue.config.optionMergeStrategies  自定义合并策略选项 [详参'Mixins']
    Vue.config.keyCodes     自定义键位别名 [详见'Modifiers'] 
    Vue.config.productionTip  设置为'false'以阻止vue在启动时生成生产提示 ['2.2.0+'] 
  Vue1 = Vue.extend(params) 扩展Vue构造器,用预定义选项创建可复用的组件构造器 
    PS: 所有的Vue组件都是被扩展的Vue实例 
      在多数情况下建议将组件构造器注册为一个自定义元素,然后声明式地用在模板中 
      data 在 Vue.extend() 中它必须是函数 
    var vm = new Vue1(params); 
  Vue.nextTick([foo,context])  在下次DOM更新循环结束之后执行延迟回调 [详见'vm.xx']
    在修改数据之后立即使用这个方法,获取更新后的DOM 
    如果没有提供回调且支持promise 的环境中返回promise ['2.1.0+']
  Vue.set(obj,key,val)  显式更新数据[确保视图更新]  
    若为新数据则加入监控,返回设置的值  
    对象不能是Vue实例,或者Vue实例的根数据对象 
  Vue.delete(obj/arr,key/idx)  删除对象的属性
    若对象是响应式的,确保删除能触发更新视图
    仅在'2.2.0+'版本中支持 Array + index 用法 
    目标对象不能是一个Vue实例或Vue实例的根数据对象 
  Vue.component(tagname,options);  注册全局组件[详见组件] 
  Vue.use(obj/foo)  安装VueJS插件 
    如果插件是一个对象,必须提供install方法。
    如果插件是一个函数,它会被作为install方法,并作为Vue的参数调用 
    当install方法被同一个插件多次调用,插件将只会被安装一次
  Vue.compile(str)  在'render'函数中编译模板字符串,只在独立构建时有效
    var res = Vue.compile('<div><span>{{ msg }}</span></div>')
    new Vue({
      data: {
        msg: 'hello'
      },
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    
vm = new Vue(params)  创建Vue实例[ViewModel,简称vm] 
  PS: 模板语法声明式的将数据渲染进DOM系统; 
    VueJS应用都是通过构造函数Vue创建一个Vue的根实例启动的;
    所有的VueJS组件其实都是被扩展的Vue实例;
    在params中的方法中'this'表示的即为'vm';
    参数包括数据、模板、挂载元素、方法、生命周期钩子等选项 
  {  // 实例选项: params 
    'el': selector, // 挂载点,指定Vue接管的DOM区域 
      // 当选择器指向多个标签时,只接管第一个 
      // 不能在<body>元素上使用id,对<body>进行接管 
    'template': HTMLStr,  // 模版,定义实例的HTML[接管区域被替代,包括挂载的标签] 
    'data': {},     // 数据,用于渲染、交互的数据 
      PS: Vue实例默认代理其'data'对象,使用'this'表示,
        其优先级高于其他,即'this.xx'优先在'data'中寻找 
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
      不能改变data变量,因为这样完全破坏了data与vm的引用关系 
        var userInfo = {name:'aaa',age:20}
        var vm = new Vue({
          …… 
          data : userInfo,
        });
        userInfo.age = 15; // DOM渲染成15
        vm.age = 16; // DOM渲染成16
        userInfo = {name:'bbb',age:22}; // 引用关系被破坏,DOM不会重新渲染
        userInfo.age = 25; // 引用关系被破坏,DOM不会重新渲染
        vm.age = 23; // DOM被渲染成23
    'props': arr/obj,  // 注册标签属性,用于接收父组件的数据[大小写不敏感] 
      PS:在父组件中添加注册的attr,通过属性值来向子组件传递信息 
      ['prop0',..] 
      {
        prop0: Number,          // 只接收数值类型,否则报错 
        prop0: [Number,String], // 接收数值和字符串 
        prop0: {
          type : Array , // 接收的类型为数组 
          default : [],  // 设定初始值 
        }
      }
    'computed': {      // 依赖于其他数据而返回的数据  
      // PS: 相当于经过处理的data数据,根据其依赖的data数据变化而变化 [SlPt]
      computedVal: function(){  // 不能传参,computedVal为函数返回值   
        return val;
      },
      computedVal: {  // 默认只有 get,也可提供 set 
        get: function () {     // getter,computedVal为函数返回值  
          return xx; 
        },
        set: function (val) {  // setter,当设置 computedVal = newValue 时,被调用  
        }
      },
    },  
    'watch': {       // 监听数据的变化  
      val0: function(val,oldVal){ // 方式一 
      },
      val0: 'someMethod',         // 方式二 
      val0: {                     // 方式三 
        handler: function (val, oldVal) { },
        deep: true // 深度 watch 
      }
    },      
    'methods': {     // 定义的方法  
      foo1: function(){
      }
    },
    'components': {  // 注册组件[组件需注册后才可使用]  
      // HTML中组件标签不区分大小写,须将驼峰写法转换成'-'连接的方式 
      'cpt-name1' : cpt, 
        cpt 可为:   
        import xx from "./cpt.js";  // 模块化引入的组件
        Vue.component(cpt,{})       // 定义的全局组件 
        {                           // 通过对象来配置的组件 
          template:'',
        }
      ...
    }, 
    'filters': {     // 定义过滤器  
      foo1 : function(val){
        // 
      }
    },    
    'directives' // 自定义指令 
    'mounted': foo,    // 模型渲染后 
      使用'mounted'并不能保证钩子函数中的'this.$el'在'document'中
      为此还应该引入'Vue.nextTick'/'vm.$nextTick'例如:
      mounted: function () {
        this.$nextTick(function () {
          // 保证 this.$el 在 DOM 中
        })
      }
    render: function(createElem){   // 渲染函数,相当于'template'的作用  
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
            // 事件监听器基于 `on`, 所以不再支持如 `v-on:keyup.enter` 修饰器,需要手动匹配 keyCode 
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
              default: props => createElement('span', props.text)
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
            createElement('h1', '一则头条'),
            createElement(MyComponent, {
              props: {
                someProp: 'foobar'
              }
            })
          ]
      )
    },
  }
'vm.xx'实例属性/方法/事件 
  ◆vm.$xx [带有前缀$的]实例方法/属性 
    PS:在配置对象中使用'this'代替'vm' 
    Example:
      var obj = { a: 1 };
      var vm = new Vue({
        el: '#test',
        data: obj,
      });
      vm.$data === obj;  // true
      vm.$el === document.getElementById('test'); // true
  vm.$options 创建vm实例的配置对象 
  vm.$el      实例接管的DOM对象 
  vm.$data    实例的data 
  vm.$watch('key',f(newVal,oldVal))  监控元素改变的方法 
    key data对象中的属性 
    Example:
      vm.$watch('a', function (newVal, oldVal) {
          // 回调将在`vm.a`值改变后调用 
      })
    不要在实例属性或者回调函数中使用箭头函数 
      如 vm.$watch('a',newVal => this.myMethod())
      因为箭头函数绑定父上下文,this 不是Vue实例,
  vm.$set(obj,key,val)   效果同Vue.set() [详见'Vue.xx'] 
  vm.$on('event-name',foo)     监听事件,触发回调 
  vm.$emit('event-name',data)  触发事件,传递数据 
  vm.$nextTick(foo)        DOM更新后立即调用 
    Vue.component('example', {
      template: '<span>{{ message }}</span>',
      data: function () {
        return {
          message: '没有更新'
        }
      },
      methods: {
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
'Model'更新及监控 
  'mutation_method'变异方法 会改变调用该方法的原数据的方法 
    push()  pop() shift() unshift() splice() sort() reverse()
  'non-mutating_method'非变异方法 : 不会改变原始数组,但总是返回一个新数组
    如: filter(),concat(),slice()  
  重塑数组 : 当使用非变异方法时,可以用新数组替换旧数组
    example1.items = example1.items.filter(function (item) {
      return item.message.match(/Foo/)
    })
    你可能认为这将导致Vue丢弃现有DOM并重新渲染整个列表
    但事实并非如此,Vue实现了一些智能启发式方法来最大化DOM元素重用,
    所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作
  由于JS的限制,Vue不能检测以下变动的数据 
    当[函数内仅有]数组通过索引index直接设置某一项时
      如: vm.items[num] = newValue ,虽然model中数据已经改变,当视图无渲染 
      可使用以下方式将达到效果触发状态更新
      ◆Vue.set
      Vue.set(arr,index,newVal)
      this.$set(this.arr,index,newVal)  // vm的实例方法,也是全局Vue.set方法的别名
      ◆Array.prototype.splice
      arr.splice(indx,1,newVal)
      ◆同时在当前函数内改变会引起视图变化的操作 
        <div class="slct" >
          <div v-for="item1 in items">{{item1}}</div>
          <div v-for="i in items1" style="display:none;" >{{i.a}}</div>
          <button type="button" @click="changeItems">click</button>
        </div>
        var vm = new Vue({
          el : '.slct',
          data : {
            items :[ 1, 2, 3, 4, 5 ],
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

    当你修改数组的长度时,如: vm.items.length = newLength 
      使用 splice 替代直接长度的修改
      example1.items.splice(newLength)
  vm实例创建后新增的数据不能被监控到 
    受现代js的限制[以及废弃 Object.observe],Vue不能检测到对象属性的添加或删除。
    由于Vue会在初始化实例时对属性执行getter/setter转化过程,
    所以属性必须在 data 对象上存在才能让 Vue 转换它,这样才能让它是响应的。
    Example::
      var vm = new Vue({
        data:{
          a:1
        }
      })
      // `vm.a` 是响应的
      vm.b = 2
      // `vm.b` 是非响应的
    ◆决解办法:
    预选定义一个值 
    Vue.set(object, key, value);  将响应属性添加到嵌套的对象
      Vue不允许在已经创建的实例上动态添加新的根级响应式属性[root-level reactive property]
      但可使用 Vue.set 来添加 
      Example: Vue.set(vm.someObject, 'b', 2)
    vm.$set 实例方法[全局 Vue.set 方法的别名] 
      this.$set(this.someObject,'b',2)
    创建一个新的对象,让其包含原对象的属性和新的属性
      有时向已有对象上添加一些属性,例如使用 Object.assign() 或 _.extend() 方法来添加属性。
      但是,添加到对象上的新属性不会触发更新。
      this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
      // 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
  异步更新队列 
    当Vue观察到数据变化,将开启一个队列,并缓冲在同一事件循环中发生的所有数据改变。
    若同一个'watcher'被多次触发,只会一次推入到队列中。
    这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。
    然后,在下一个的事件循环“tick”中,Vue 刷新队列并执行实际[已去重的]工作。
    Vue 在内部尝试对异步队列使用原生的 Promise.then 和 MutationObserver,
    若执行环境不支持,会采用 setTimeout(fn, 0) 代替。
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
      Vue.component('example', {
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
'Lifecycle hooks'生命周期钩子: 实例的生命周期 
  PS: 钩子:某个阶段开始或者结束前、后等过程中被触发的函数;  
    组件的自定义逻辑可以分布在这些钩子中[Vue无'控制器'概念];
    钩子的'this'指向调用它的Vue实例; 
  'beforeCreate'  实例刚创建 
    设置'data'中的数据无效 
  'created'       实例创建完毕 
    可设置'data'中的数据 
  'beforeMount'   DOM渲染前
  'mounted'       DOM渲染完毕 [替换'1.x'版本的'ready'] 
  'beforeUpdate'  更新前 
  'updated'       数据模型更新 
  'activated'     组件被激活时 
  'deactivated'   组件被移除时 
  'beforeDestroy' 销毁前 
  'destroyed'     销毁观察、组件及事件 
'Mustache'插值 
  PS: 基于HTML的模版语法,声明式地将DOM绑定至底层Vue实例的数据;
    在底层的实现上,Vue 将模板编译成虚拟 DOM 渲染函数;
    结合响应系统,应用状态改变时,Vue以最小代价重新渲染组件并应用到DOM操作上;
    也可不用模板,直接写渲染[render]函数,使用可选的 JSX 语法;  
    不能在HTML属性中使用[应使用 v-bind 指令];
  {{key}}  数据属性插值[params.data.key]
    PS:{{value}}的形式可取到value的值,并与value进行绑定,
      绑定的数据对象上的属性发生了改变,插值处的内容都会更新,
      双大括号会将数据解释为纯文本,而非 HTML 
  {{表达式}} 配合JS表达式使用 
    PS:Vuejs提供了完全的JS表达式支持; 
      模板表达式都被放在沙盒中,只能访问全局变量的一个白名单,如 Math 和 Date,
      不应该在模板表达式中试图访问用户定义的全局变量; 
    Example:
      {{ number + 1 }}
      {{ ok ? 'YES' : 'NO' }}
      {{ message.split('').reverse().join('') }}
      <div v-bind:id="'list-' + id"></div>
      这些表达式会在所属 Vue 实例的数据作用域下作为JS被解析
    每个绑定都只能包含单个表达式
      下面的例子不会生效
      // <!-- 这是语句,不是表达式 -->
      {{ var a = 1 }}
      // <!-- 流控制也不会生效,请使用三元表达式 -->
      {{ if (ok) { return message } }}
  {{foo}}  计算属性插值[params.computed.foo]
    PS:像绑定普通属性一样在模板中绑定计算属性 
  {{foo(arg)}} 方法调用插值[params.methods.foo]
    PS:计算属性是基于它的依赖缓存,只有在其的相关依赖发生改变时才会重新取值;
      若依赖未改变,多次访问计算属性会立即返回之前的计算结果[有缓存];
      而每当重新渲染的时候,method 调用总会执行函数[无缓存];
    Example:
      通过调用method来达到同样的效果
      <p>Reversed message: "{{ reverseMessage() }}"</p>
      methods: {
        reverseMessage: function () {
          return this.message.split('').reverse().join('')
        }
      }
      
      如下计算属性将不会更新,因为 Date.now() 不是响应式依赖
      computed: {
        now: function () {
          return Date.now()
        }
      }
  Mustache 和 v-text 的区别: 在刷新的瞬间会显示出'{{}}'
'Filters'过滤器 
  PS: 过滤器只能在'Mustache'和'v-bind'表达式['2.1.0+']中使用 
    类似Linux中的管道,vuejs也使用的是'|'; 
    因为过滤器设计目的就是用于文本转换
    为了在其他指令中实现更复杂的数据变换,应该使用计算属性
    过滤器函数总接受"|"左边的值作为第一个参数
  Vue.filter('ftName',foo(val[,arg1,..])); 全局过滤器 [可在所有实例中使用] 
    val 表示'|'左边的值,
    arg 可选,表示使用时传入的额外参数 
    Example: 
      定义一个全局的 reverse 过滤器
      Vue.filter('reverse',function (value) {
        return value.split('').reverse().join('')
      })
  '|'管道符配合使用:  
    'Mustache'中使用: 添加在JS表达式的尾部,由管道符"|"指示 
    {{ message | flt }}
    'v-bind'中使用
    <div v-bind:id="rawId | flt"></div>
    过滤器是JS函数,因此可接收参数 
    {{ message | flt(arg1,arg2,..) }}
    // arg1作为第二个参数,arg2作为第三个参数 
  过滤器串联 
    {{ message | filterA | filterB }}
'Directives'指令: model和view的交互 
  PS:将vm和 HTML DOM 进行关联,做为HTML标签的属性,让Vue对 DOM 元素做各种处理,
    职责为当其表达式的值改变时相应地将某些行为应用到 DOM 上;
  v-text="str"   纯文本 
  v-html="str"   HTML文本 
  v-model="str"  双向绑定表单值 
    PS: 
    常见的表单: 
      'input[type="text"]'            
      'input[type="checkbox"]'        
      'input[type="radio"]'           
      <select>[select的option不支持]   
      <textarea>                      
    绑定单个'checkbox'复选框,获取值为'false'/'true' 
      <section id="checkbox">
        <input type="checkbox" value="获取到的不是改值" v-model="checked">
        {{ checked }}
      </section>
      data : {
        checked : true,
      },
      默认选中,通过点击切换,显示'true'或'false'
    绑定单个'checkbox'复选框并添加'ture-value'及'false-value'属性时,属性值和选中双向绑定 
      <section id="a">
        <input type="checkbox" v-model="val" :true-value="val1" :false-value="val2" >
        <br>
        {{val}}
      </section>
      var vm = new Vue({
        el : '#a',
        data : {
          val : '',
          val1 : '选中',
          val2 : '未选中',
        },
      });
      setTimeout(function(){
        vm.val = '选中';
      },2000);
    同时绑定多个'checkbox'复选框到同一个数组时,会将选中项的'value'存入数组中  
      <section id="a">
        <input type="checkbox" value="Jack" v-model="checkedNames">
        <input type="checkbox" value="John" v-model="checkedNames">
        <input type="checkbox" value="Mike" v-model="checkedNames">
        <div>Checked names: {{ checkedNames }}</div>
      </section>
      data: {
        checkedNames: []
      }
    绑定'radio'单选按钮,获取'value'值  
      <section id="a" >
        <input type="radio" value="One" v-model="picked">
        <input type="radio" value="Two" v-model="picked">
        <div>Picked: {{ picked }}</div>
        <input type="radio" value="1111" v-model="pick">
        <div>Picked: {{ pick }}</div>
      </section>
      data : {
        picked : '',
        pick : '22',
      },
    绑定<select>单选列表,获取到被选中项的'value'值  
      Example: 
        <select  v-model='key'>
          <option value="">{{val}}</option>
          // 当存在 value="xx" 时 , v-model 的值为 "xx",否则为val
          // 当 key 的值没有和 option 中 value 属性的值相等时,select无法显示出值
        </select>
      当选项中不存在被赋予的值时,会被默认重置为undefined
        <div id="slct">
          <select  v-model="slctVal">
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
          <span>Selected: {{ slctVal }}</span>
        </div>
        new Vue({
          el : '#slct',
          data : {
            slctVal : '1',
          },
          mounted : function(){
            var that = this;
            setTimeout(function(){
              that.slctVal = '11';
            },1000);
          },
        });
    绑定<select>多选列表,获取到选中项'value'组成的数组 
      <div id="slct">
        <select v-model="selected" multiple>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        <div>Selected: {{ selected }}</div>
      </div>
    表单值为对象 
      <select v-model="selected"> 
        // <!-- 内联对象字面量 --> 
        <option v-bind:value="{ number: 123 }">123</option> 
      </select> 
      // 当选中时 
      typeof vm.selected // -> 'object'
      vm.selected.number // -> 123
  v-for="(item,key,idx) in list"   循环渲染  
    item  自定义的占位符placeholder,表示集合'list'中的一项,便于后续使用 
    key   可选,表示集合'list'中一项的键,数组则为下标 
    idx   可选,当遍历对象时可用,表示对象的第几个元素 
      按 Object.keys()的结果遍历对象,在不同JS引擎下结果可能不一致 
    list  迭代的集合,可为arr/obj/num 
      为num时,表示迭代num次,'item'表示每一次的数字 
    <template v-for="item in list">   渲染多元素
      PS: 最终在DOM中不存在<template>标签,仅用于包裹元素  
    循环渲染组件 ['2.2.0+'在组件中使用v-for'key'是必须的] 
      不能自动传递数据到组件里,因为组件有自己独立的作用域,传递迭代数据到组件里需用'props'
      <div id="todo-list-example">
        <input v-model="newTodoText" v-on:keyup.enter="addNewTodo" 
        placeholder="Add a todo" >
        <ul>
          <li is="todo-item" v-for="(todo,index) in todos" v-bind:title="todo" v-on:remove="todos.splice(index,1)"></li>
        </ul>
      </div>
      Vue.component('todo-item',{
        template: ' <li> {{ title }}\
          <button v-on:click="$emit(\'remove\')">X</button>\
        </li> ',
        props: ['title'],
      });
      new Vue({
        el: '#todo-list-example',
        data: {
          newTodoText: '',
          todos: [
            'Do the dishes',
            'Take out the trash',
            'Mow the lawn'
          ]
        },
        methods: {
          addNewTodo: function () {
            this.todos.push(this.newTodoText);
            this.newTodoText = '';
          }
        }
      });
    'key'标识渲染元素是否复用 
      其工作方式类似属性,用'v-bind'来动态绑定,'key'并不特别与'v-for'关联  
      <div v-for="item in list" :key="item.id"> </div>
    可用'of'替代'in'作为分隔符 
      <div v-for="item of list"></div>
  v-if="bol"    条件渲染 
    <template>中使用'v-if'控制组件的渲染 
      <template v-if="ok">
        <h1>Title</h1>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </template>
  v-else-if="drctVal" 条件渲染 ['2.1.0'+] 
    v-else-if 必须跟在 v-if 或者 v-else-if之后
      <div v-if="type === 'A'"> A </div>
      <div v-else-if="type === 'B'"> B </div>
      <div v-else-if="type === 'C'"> C </div>
      <div v-else> Not A/B/C </div>
  v-else              条件渲染 
    PS:v-if用于条件判断,和v-else是一对
    'v-else'必须紧跟在'v-if'或者'v-else-if'的后面,否则它不能被识别
      <h1 v-if="ok">Yes</h1>
      <h1 v-else>No</h1>
  v-show="bol"  作用与v-if类似 
    PS:'v-show'的元素会始终渲染并保持在DOM中[使用 display:none]
      v-show不支持<template>标签
      一般,'v-if'有更高的切换消耗而'v-show'有更高的初始渲染消耗,
      因此若需要频繁切换使用'v-show'较好,若在运行时条件不大可能改变则使用'v-if'较好 
  v-bind:attrname="str/arr/obj"  属性赋值[简写':attrname'] 
    PS: 在用于'class'和'style'时,VueJS专门增强了它 
      表达式的结果类型除了字符串之外,还可以是对象或数组
    str  表示属性值为str 
      <div id="app-2" :title="message">
        鼠标悬停几秒钟查看此处动态绑定的提示信息！
      </div>
      var app2 = new Vue({
        el: '#app-2',
        data: {
          message: '页面加载于 ' + new Date()
        }
      }); 
      // app2.message = '新消息';
      // 可通过更改 app2.message 的值来改变显示
    obj  key为属性名,val可为属性的值、函数判断或简单表达式 
      Example: 
        <div v-bind:class="{ active: isActive }"></div>
        'active'存在与否将取决于'isActive'是否为真 
      与普通的class属性共存 
        <div class="static" :class="{ c1: bol1,c2: bol2 }">
        </div>
        data: {
          bol1: true,
          bol2: false
        }
        渲染为: <div class="static active"></div>
      可直接绑定数据属性里的对象 
        <div id="test" v-bind:class="cls"></div>
        data: {
          cls: {
            c1: true,
            c2: false
          }
        }
    arr  表示该class的值为该数组中的多个 
      Example: 
      <div v-bind:class="[activeClass,errorClass]">
      data: {
        activeClass: 'active',
        errorClass: 'text-danger'
      }
      也可在数组语法中使用对象语法 
      <div v-bind:class="[{ active: isActive },errorClass]"> 
    :class="str/obj/arr"  'class'类样式 
      标签之前的class不会被覆盖 
      用在组件上 
        在组件上用到class属性时,将被添加到根元素上面,元素上已经存在的类不会被覆盖 
        Vue.component('my-component',{
          template: '<p class="foo bar">Hi</p>'
        });
        // 使用 
        <my-component class="baz boo"></my-component>
        // 将被渲染成为 
        <p class="foo bar baz boo">Hi</p>
        // 同样的适用于动态绑定 
        <my-component :class="{ active: true }"></my-component>
        // 被渲染成为
        <p class="foo bar active"></p>
    :style="str/obj/arr"  'style'内联样式 
      obj  适用于添加多个样式,key为声明属性,val为声明值 
        可用短横分隔命名'kebab-case'或驼峰式'camelCase' 
          <div :style="{'background-color':color1,fontSize:fontSize+'px'}"></div>
          data: {
            color1: 'red',
            fontSize: 30
          }
        可为属性提供一个包含多个值的数组,常用于提供多个带前缀的值 ['2.3.0+']
          会渲染数组中最后一个被浏览器支持的值。
          <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
          如果浏览器支持不带浏览器前缀的 flexbox,那么渲染结果会是 display: flex 
      arr  将多个'样式对象'应用到一个元素上 
        data: {
          styleObj: {  // 样式对象 
            color: 'red',
            fontSize: '13px'
          }
        }
      自动添加前缀: Vue会自动添加相应的前缀 
  v-on:ename="foo/expr" 事件处理与绑定[简写'@ename'] [事件名不区分大小写] 
    PS: 当一个ViewModel被销毁时,所有的事件处理器都会自动被删除,无须自己清理 
    foo    函数,事件触发时执行回调 
      函数未传参时,则默认传入经过vue包装过的event事件对象'e',等价与 foo($event)
        若有自定义传参,则默认参数被取消
      foo($event)   '$event'表示原生DOM事件对象 
        e.currentTarget 表示绑定事件的元素 
        e.srcElement    表示响应事件的元素 [可用来进行DOM操作[SlPt]]
        <button v-on:click="warn('11111',$event)">Submit</button>
        methods: {
          warn: function (message,event) {
            if (event){
              event.preventDefault()  // 可以访问原生事件对象
            } 
            alert(message)
          }
        }
      自定义传参: 除了直接绑定到一个方法,也可以用内联JS语句
        <div id="example-3">
          <button v-on:click="say('hi')">Say hi</button>
          <button v-on:click="say('what')">Say what</button>
        </div>
        new Vue({
          el: '#example-3',
          methods: {
            say: function (message) {
              alert(message)
            }
          }
        })
    expr   单条语句,事件触发时执行语句   
    无回调  
      <form v-on:submit.prevent></form> // 只有修饰符 
    Example: 
      <div id="test">
        <p>{{ message }}</p>
        <button v-on:click="reverseMsg">逆转消息</button>
      </div>
      var app5 = new Vue({
        el: '#test',
        data: {
          message: 'Hello VueJS!'
        },
        methods: {
          reverseMsg: function () {
            this.message = this.message.split('').reverse().join('');
          }
        }
      })    
  'Modifiers'修饰符: 让指令以特殊方式绑定,用于'v-on'、'v-model' 
    PS:修饰符是以点号'.'指明的特殊后缀;指令可以串联;
    通用事件修饰符 
      .prevent 修饰v-on,触发的事件调用 event.preventDefault() 
        <form v-on:submit.prevent="onSubmit"></form>
        // <!-- 提交事件不再重载页面 -->
      .stop    阻止冒泡 
        <a v-on:click.stop="doThis"></a>
        // <!-- 阻止单击事件冒泡 -->
      .capture 事件捕获模式
        <!-- 添加事件侦听器时使用事件捕获模式 -->
        <div v-on:click.capture="doThis">...</div>
      .self    当事件在该元素本身上时触发 
        <!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
        <div v-on:click.self="doThat">...</div>
      .once    一次性触发'2.1.4+' 
        <!-- 事件只会执行一次 -->
        <a v-on:click.once="doThis"></a>
    键鼠事件修饰符: 键盘事件时监测键值,鼠标事件时监测鼠标按键  
      记住所有的keyCode比较困难,所以Vue为最常用的按键提供了别名 
        <!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
        <input v-on:keyup.13="submit">
        <input v-on:keyup.enter="submit">
      Vue.config.keyCodes 全局对象,自定义按键修饰符别名 
        // 可以使用 v-on:keyup.f1
        Vue.config.keyCodes.f1 = 112;  // 单个定义
        Vue.config.keyCodes = {  // 同时定义多个
          v: 86,
          f1: 112,
          mediaPlayPause: 179,
          up: [38, 87]
        }
      同时监听多个按键 
        // <!-- Alt + C -->
        <input @keyup.alt.67="clear">
        // <!-- Ctrl + Click -->
        <div @click.ctrl="doSomething">Do something</div>
      ◆键盘
      .enter   Enter键,'.13'等价于'.enter'
      .tab     
      .delete  '删除'和'退格'键
      .esc     
      .space   
      .up      
      .down    
      .left   
      .right   
      .ctrl   ['2.1.0+']
      .alt    ['2.1.0+']
      .shift  ['2.1.0+']
      .meta   Mac上对应⌘;Windows上对应⊞ ['2.1.0+']
      ◆鼠标事件修饰符  ['2.1.0+'] 
      .left
      .right
      .middle
    其他修饰符 
      .native  修饰v-on,监听原生事件 
        Example:<my-component v-on:click.native="doTheThing"></my-component>
      .sync    对子组件props双向绑定 [详见组件'prop'通信] ['2.0'移除,'2.3'加入] 
    'v-model'修饰符 
      .lazy   从input事件转变为在change事件中同步  
        // <!-- 在 "change" 而不是 "input" 事件中更新 -->
        <input v-model.lazy="msg" >
      .number 自动将用户的输入值转为'Number'类型[若转换结果为'NaN'则返回原值] 
        <input v-model.number="age" type="number">
        这通常很有用,因为在 type="number" 时 HTML 中输入的值也总是会返回字符串类型
      .trim   自动过滤用户输入的首尾空格 
        <input v-model.trim="msg">
  v-once  一次性插值[配合插值使用] 
    当数据改变时,插值处的内容不会更新
    <span v-once>值不会更新: {{ msg }}</span>
  v-cloak   该指令会保持在元素上直到关联实例结束编译 
    和 CSS 规则如 [v-cloak] { display: none } 一起用时,
    可隐藏未编译的'Mustache'标签直到实例准备完毕 
  v-pre   跳过该元素及其子元素的编译过程
    可以用来显示原始'Mustache'标签,跳过大量没有指令的节点会加快编译
'Custom Directives'自定义指令[在HTML中指定,不区分大小写] 
  v-name:arg.mdf1.mdf2="val"   用于对DOM元素进行底层操作 
  'name'  指令名称 
  'arg'   指令的参数,可选 
  'mdf'   指令的修改器,可选  
  'val'   指令的值,可选 
    指令值为对象字面量 
      指令函数能够接受所有合法类型的JS表达式 
      <div v-demo="{ color: 'white', text: 'hello!' }"></div>
      Vue.directive('demo', function (el, binding) {
        console.log(binding.value.color) // => "white"
        console.log(binding.value.text)  // => "hello!"
      })    
  Vue.directive('name',obj/foo) // 定义全局指令 
    name  指令名称 
    Obj   配置对象 
      { 
        hookName : function(){ }
        , ..
      }
    foo   简写为函数: 在'bind'和'update'钩子上做重复动作,而不关心其它的钩子函数 
      Vue.directive('color-swatch', function (el, binding) {
        el.style.backgroundColor = binding.value
      })
  directives: {                // 注册局部指令  
    focus: {
      // 指令的定义--- 
    }
  },               
  Example: 
    <div id="aoo"> <input v-focus > </div>
    Vue.directive('focus', {
      inserted: function (el) {
        el.focus();
        console.log(11111);
      }
    });
    new Vue({
      el : '#aoo',
    });
  ★hookName : function(el,binding,vnode,oldVnode){ }, 指令定义[钩子]函数 
    ◆hookName 钩子函数
    bind     指令初始化,指令第一次绑定到元素时调用,只调用一次 
    inserted 被绑定元素插入父节点时调用[父节点存在即可调用,不必存在于'document'中] 
    update   所在组件的VNode更新时调用 
      指令的值可能发生了改变也可能没有,
      但可通过比较更新前后的值绑定值'binds.value'和'binds.oldValue'来忽略不必要的模板更新 
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
          <button type="button" @click="inputFocus">click</button>
        </div>
        Vue.directive('test1', {
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
            inputFocus : function(){
              this.inputIsFocus = !this.inputIsFocus;
              console.log(this.inputIsFocus);
            },
          },
        })
    componentUpdated  所在组件的VNode及其孩子的VNode全部更新时调用  
    unbind   指令与元素解绑时调用,只调用一次 
    ◆钩子函数的参数 
      除了'el'外,其它参数都应该是只读的,尽量不要修改他们 
      若需要在钩子之间共享数据,建议通过元素的 dataset 来进行
    el       指令所绑定的元素,可以用来直接操作DOM 
      el.focus()   表单获得焦点
      el.select()  表单值被选中
    binding  对象,包含以下属性 
      'name'       指令名,不包括'v-'前缀[即'drct_name']  
      'value'      绑定值[即'drctVal'] 
        例如: v-my-directive="1 + 1", value 的值是 2
      'expression' 绑定值的字符串形式['drctVal'的字符串形式] 
        例如 v-my-directive="1 + 1" , expression 的值是 "1 + 1" 
      'arg'        传给指令的参数[即'drctArg'] 
        例如 v-my-directive:foo, arg 的值是 "foo"
      'modifiers'  一个包含修饰符的对象['mdf'组成的对象] 
        例如: v-my-directive.foo.bar, 
        修饰符对象 modifiers 的值是 { foo: true, bar: true }
      'oldValue'   指令绑定的前一个值,仅在'update'和'componentUpdated'钩子中可用 
        无论值是否改变都可用
    vnode    Vue编译生成的虚拟节点 
    oldVnode 上一个虚拟节点,仅在'update'和'componentUpdated'钩子中可用 
    Example:
      <div id="map" v-drct:arg.a.b="msg"></div>
      Vue.directive('drct', {
        bind: function (el, binds, vnode,oldVnode) {
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
'Mixins'混合: 分发Vue组件中可复用功能的方式 
  与混合对象含有同名选项时 
    同名钩子函数将混合为一个数组,故都将被调用;且混合对象的钩子将在组件自身钩子前调用 
    'methods'、'components'及'directives'等,将被混合为一个对象,冲突时,组件对象优先级高 
  Vue.mixin({..})  全局混合 
    PS: 一旦使用全局混合对象,将会影响到所有之后创建的 Vue 实例 
    Example: 
      Vue.mixin({
        created: function () {
          var myOption = this.$options.myOption // 为自定义的选项 'myOption' 注入一个处理器。
          if (myOption) {
            console.log(myOption)
          }
        }
      })
      new Vue({
        myOption: 'hello!'
      })
      // => "hello!"
  Vue.config.optionMergeStrategies  自定义选项合并策略 
    自定义选项将使用默认策略,即简单地覆盖已有值
    向 Vue.config.optionMergeStrategies 添加一个函数,以自定义逻辑合并
    Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
      // return mergedVal
    }
    对于大多数对象选项,可以使用 methods 的合并策略：
    var strategies = Vue.config.optionMergeStrategies
    strategies.myOption = strategies.methods 
    更多高级的例子可以在 Vuex 的 1.x 混合策略里找到：
    const merge = Vue.config.optionMergeStrategies.computed
    Vue.config.optionMergeStrategies.vuex = function (toVal, fromVal) {
      if (!toVal) return fromVal
      if (!fromVal) return toVal
      return {
        getters: merge(toVal.getters, fromVal.getters),
        state: merge(toVal.state, fromVal.state),
        actions: merge(toVal.actions, fromVal.actions)
      }
    }
'Tag'&'Attr'内置标签及属性
  ◆标签
  <component is="cptname"></component>   // 放置组件 
  <keep-alive ></keep-alive>
  <transition ></transition>
  <slot name="slotName"></slot>         // 插槽  
  <template></template>    HTML5标签 
  ◆属性 
  key="arg"  标识DOM节点 
    管理元素复用 
      Vue尽可能高效的渲染元素,通常会复用已有元素[而不是从头开始渲染]
      <div id="bbb">
        <template v-if="loginType === 'username'">
          <label>Username</label>
          <input placeholder="Enter your username">
        </template>
        <template v-else>
          <label>Email</label>
          <input placeholder="Enter your email address">
        </template>
      </div>
      var vm = new Vue({
        el : '#bbb',
        data : {
          loginType : 'username',
        },
      });
      setTimeout(function(){
        vm.loginType = '1'
      },5000);
      两个模版由于使用了相同的元素,<input>会被复用,仅仅是替换了他们的'placeholder'
      初始在表单中输入值,当切换渲染后表单中存在之前的输入 
      可通过添加属性'key'来控制是否复用元素[key 必须带有唯一的值]
      <div id="bbb">
        <template v-if="loginType === 'username'">
          <label>Username</label>
          <input placeholder="Enter your username" key="input1">
        </template>
        <template v-else>
          <label>Email</label>
          <input placeholder="Enter your email address" key="input2">
        </template>
      </div>
      var vm = new Vue({
        el : '#bbb',
        data : {
          loginType : 'username',
        },
      });
      setTimeout(function(){
        vm.loginType = '1'
      },5000);
      初始在表单输入的值,在5s后消失[input元素被重新渲染了]
      当两个'key'值相同时,相当与没有'key'时的默认情况 
      但<label> 元素仍然会被高效地复用,因为它们没有添加 key 属性。
  is="arg"   指定组件 
'Component'组件 
  PS: 组件的'data'需是一个函数 
    需在插入的Vue实例前定义[否则要触发该实例的任意一组件渲染,如通过'v-if'],才会渲染出该组件 
  Vue.component('cpt-name',options)  // 注册全局组件  
    'cpt-name' 组件名称,推荐使用小写,且包含一个短杠 
    options 
      ◆配置对象,相当于new Vue(options)的options  
      template: HTMLStr,   组件的HTML代码
      props: strArr/obj,   自定义属性 
        strArr  ['attr1','att2',...]
          this.xx 获取到值 
      name: 'aoo',         // 命名组件 [Self] 
      data: function(){ return obj; } 组件的数据存放,但必须为一函数 
        Example: 
          Vue会停止,并在控制台发出警告,在组件中data必须是一个函数 
          Vue.component('my-component',{
            template: '<span>{{ message }}</span>',
            data: {
              message: 'hello'
            }
          })
          使用如下方式来决解该情况:
          <div id="example-2">
            <simple-counter></simple-counter>
            <simple-counter></simple-counter>
            <simple-counter></simple-counter>
          </div>
          var data = { counter: 0 }
          Vue.component('simple-counter',{
            template: '<button v-on:click="counter += 1">{{ counter }}</button>',
            // 技术上 data 的确是一个函数了,因此 Vue 不会警告,
            // 但是我们返回给每个组件的实例的却引用了同一个data对象
            data: function () {
              return data
            }
          })
          new Vue({
            el: '#example-2'
          })
          这三个组件共享了同一个 data ,因此 counter 会影响所有组件！
          通过为每个组件返回全新的 data 对象来取消同步
          data: function () {
            return {
              counter: 0
            }
          }
          现在每个 counter 都有它自己内部的状态了:
      // ...
      ◆f(resolve,reject) 异步组件 
        function(resolve,reject){
          $.get("./head.html").then(function (res) {
            resolve({
              template: res
            })
          });
        }, 
    Example: 
      定义名为<todo-item>的新组件
      Vue.component('todo-item',{
        template: '<li>这是个待办项</li>'
      })
      用其构建另一个组件模板 
      <ol>
        // <!-- 创建一个 todo-item 组件的实例 -->
        <todo-item></todo-item>
      </ol>
      将数据从父作用域传到子组件让我们来修改一下组件的定义,使之能够接受一个属性:
      Vue.component('todo-item',{
        // todo-item 组件现在接受一个
        // "prop",类似于一个自定义属性
        // 这个属性名为 todo
        props: ['todo'],
        template: '<li>{{ todo.text }}</li>'
      })
      使用 v-bind 指令将待办项传到每一个重复的组件中:
      <div id="app-7">
        <ol>
          // <!-- 现在我们为每个todo-item提供待办项对象    -->
          // <!-- 待办项对象是变量,即其内容可以是动态的 -->
          <todo-item v-for="item in groceryList" v-bind:todo="item"></todo-item>
        </ol>
      </div>
      Vue.component('todo-item',{
        props: ['todo'],
        template: '<li>{{ todo.text }}</li>'
      })
      var app7 = new Vue({
        el: '#app-7',
        data: {
          groceryList: [
            { text: '蔬菜' },
            { text: '奶酪' },
            { text: '随便其他什么人吃的东西' }
          ]
        }
      })
  'components': {     // vue实例中局部注册[仅能在该实例/组件的作用域中使用]  
    'cpt-name': {  
      template: '<div>A custom component! {{aoo}}</div>',
      // ..
    },
  }, 
  <cpt-name></cpt-name>    在父组件中指定子组件位置 
    要确保在初始化根实例之前注册了组件 
    Example: 
      <div id="example">
        <cpt-child></cpt-child>
      </div>
      // 注册
      Vue.component('cpt-child',{
        template: '<div>A custom component!</div>'
      })
      // 创建根实例,否则不生效
      new Vue({
        el: '#example'
      })
  <tag is="cptname"></tag> 在父组件中指定子组件位置 
    :is="cptname"属性实现动态组件 
      <div id="parent">
        <button type="button" name="button" @click='changeFoo' >switchBtn</button>
        <div v-bind:is="changeFlag"> </div>
      </div>
      new Vue({
        el: '#parent',
        components: {
          aoo: { 
            template : '<span>aaa</span>'
          },
          boo: { 
            template : '<h1>bbb</h1>'
          },
          coo: { 
            template : '<div>ccc</div>'
          },
        },
        data: {
          changeFlag: 'boo'
        },
        methods : {
          changeFoo : function(){
            if (this.changeFlag == 'aoo') {
              this.changeFlag = 'boo'
            }
            else if (this.changeFlag == 'boo') {
              this.changeFlag = 'coo';
            }
            else {
              this.changeFlag = 'aoo';
            }
            console.log(this.changeFlag);
          }
        },
      });
  <keep-alive> 缓存切换的组件
    把切换出去的组件保留在内存中,保留其状态或避免重新渲染;
    <keep-alive>
      <component :is="currentView">
        <!-- 非活动组件将被缓存！ -->
      </component>
    </keep-alive>
  组件元素可能的限制 
    像这些元素 <ul> ,<ol>,<table> ,<select> 限制了能被它包裹的元素,
    而一些像 <option> 这样的元素只能出现在某些其它元素内部
    在自定义组件中使用这些受限制的元素时会导致一些问题,例如:
      <table>
        <my-row>...</my-row>
      </table>
      自定义组件 <my-row> 被认为是无效的内容,因此在渲染的时候会导致错误
      变通的方案是使用特殊的'is'属性:
      <table>
        <tr is="my-row"></tr>
      </table>
    若使用来自以下来源之一的字符串模板,这些限制将不适用:
      <script type="text/x-template">
      JavaScript内联模版字符串
      .vue 组件
  组件通信 
    'props down'父组件向子组件通信: 父组件中,子组件标签上设置属性 
      PS: 子组件VM中注册'props'属性[进行监听], 
        当父组件赋给属性的值,子组件可获取到 
        组件实例的作用域是孤立的,不能在子组件的模板内直接引用父组件的数据;
      Example:
        Vue.component('cpt-child',{
          // 声明 props
          props: ['message'],
          // 就像 data 一样,prop 可以用在模板内
          // 同样也可以在 vm 实例中像 “this.message” 这样使用
          template: '<span>{{ message }}</span>'
        })
        传入一个普通字符串:
        <cpt-child message="hello!"></cpt-child>
        结果: hello!
      'v-bind'动态属性: 当父组件的数据变化时,子组件中也会更新 
        <div id="parent">
          <input v-model="parentMsg"> <br>
          <cpt-child :my-message="parentMsg"></cpt-child>
        </div>
        Vue.component('cpt-child',{
          // camelCase in JavaScript
          props: ['myMessage'],
          template: '<span>{{ myMessage }}</span>'
        })
        new Vue({
          el: '#parent',
          data:{
            parentMsg : '',
          }
        })
      'props'单向数据流:当父组件的属性变化时,将传导给子组件,但是不会反过来, 
        每当父组件更新时,子组件的所有 prop 都会更新为最新值,
        而在子组件内部改变 prop,Vue 会在控制台给出警告;
        在js中对象和数组是引用类型,指向同一个内存空间,
        若 prop 是一个对象或数组,在子组件内部改变它会影响父组件的状态;
      'Prop验证': 在子组件中定义接收的'props'的规格 
        若传入的数据不符合规格,Vue会发出警告[开发版本] 
        props校验会在组件实例创建前进行,故在 default 或 validator 函数里,
        诸如 data、computed 或 methods 等实例属性还无法使用 
        Vue.component('example',{
          props: {   // 采用对象的形式 
            propA: Number,          // str,单类型检测  
              // null 则表示任何类型都可以
            propB: [String,Number], // arr,可为多种类型 
            propC: {                // obj,详细配置 
              type: String,  // 类型 
                // String
                // Number
                // Boolean
                // Function
                // Object
                // Array
                // Symbol
                // 自定义构造器函数,使用 instanceof 检测 
              validator: function (value) {  // // 自定义验证函数
                return value > 10
              },
              required: true,  // 必须的 
              default: 100,    // 默认值 
              default: function () { // 数组／对象的默认值应当由一个工厂函数返回
                return { 
                  message: 'hello' 
                };
              },
            },
        })
      通过自定义事件的监听和触发来达到同样的效果[SlPt] 
    'events up'子组件向父组件通信: 父组件中,子组件标签上绑定自定义事件  
      子组件内通过'$emit'触发绑定父组件中子组件标签上的事件  
      childVm.$emit('event-name',data) 触发事件,传递数据'data'
      Example: 
        <div id="p">
          <p>{{ total }}</p>
          <cpt-aoo v-on:fromChild="foo"></cpt-aoo>
        </div>
        Vue.component('cpt-aoo', {
          template: '<button v-on:click="clickFoo">{{ counter }}</button>',
          data: function () {
            return {
              counter: 0
            }
          },
          methods: {
            clickFoo: function () {
              this.counter += 1
              this.$emit('fromChild')
            }
          },
        })
        new Vue({
          el: '#p',
          data: {
            total: 0
          },
          methods: {
            foo: function () {
              this.total += 1
            }
          }
        })
    :<propname>.sync="<parentVal>" 父子组件双向通信 
      配合: <childVm>.$emit('update:<propname>',<data>) 改变父组件'<parentVal>'值为<data> 
      <div id="p">
        <div >{{msg}}</div>
        <cpt-aoo :prop1.sync="msg"></cpt-aoo>
      </div>
      Vue.component("cpt-aoo",{
        template : `
          <div>
            <div >{{prop1}}</div> 
            <div @click=cFoo1>click me</div>
          </div> `,
        props : ['prop1'],
        methods : {
          cFoo1: function(){
            this.$emit('update:prop1','bbbb')
          },
        },
      });
      new Vue({
        el : '#p',
        data : {
          msg: 'aaa',
        },
      });
    非父子组件通信: 事件注册与触发/Vuex  
      简单场景下,用一Vue实例作为中央事件总线  
        var bus = new Vue();
        bus.$emit('custom-event',data); // 触发事件
        bus.$on('custom-event',function (data) { // 监听事件
          // ...
        })
      复杂情况下,使用专门的状态管理模式Vuex 
  非'prop'属性: 可以直接传入组件,而不需要定义相应的'prop' 
    PS: 一般的,传递给组件的值会覆盖组件本身设定的值,
      但'class'和'style'这两个特性的值都会做'merge'合并操作 
    Example: 
      <cpt-aoo style="color:red;"></cpt-aoo> // 在子组件中会直接生效 
  'slot' & <slot> 分发内容: 父组件定制子组件内容,父子组件模版通信 
    PS: 子组件模板需有一个<slot>插口,否则父组件的内容将会被丢弃; 
      父组件中子组件标签内定义的内容将换掉子组件内定义的没有属性的<slot>标签本身;
      在<slot>标签中的任何内容都被视为备用内容,没有要替换的内容时才显示备用内容;
    父组件中: 子组件标签内定制HTML片段[可用'slot'属性具名] 
    子组件中: 通过<slot>标签指定替换的位置及默认内容[用'name'属性具名] 
    编译作用域、组件作用域 
      父组件模板的内容在父组件作用域内编译;子组件模板的内容在子组件作用域内编译; 
      分发内容是在父作用域内编译 
    <tag/> & <slot> 插槽  
      Example: 
        // 父组件模版
        <div>
          <h1>父组件</h1>
          <cpt-child>
            <p>这是一些初始内容</p>
            <p>这是更多的初始内容</p>
          </cpt-child>
        </div>
        // 子组件
        <div>
          <h2>子组件</h2>
          <slot> 当没有要分发的内容时会显示 </slot>
        </div>
        // 渲染结果
        <div> 
          <h1>父组件</h1>
          <div>
            <h2>子组件</h2>
            <p>这是一些初始内容</p>
            <p>这是更多的初始内容</p>
          </div>
        </div>
    <tag slot="aoo"></tag> & <slot name="aoo"> 具名插槽 
      PS: 子组件中'name'的值和父组件中'slot'的值进行匹配,相等则将子组件的<slot>替换; 
        可以有一个匿名slot,为默认slot,作为找不到匹配的内容片段的备用插槽
        若没有默认的slot,这些找不到匹配的内容片段将被抛弃;
      Example:
        // 子组件
        <div class="container">
          <header> <slot name="header"></slot> </header>
          <main>   <slot></slot> </main>
          <footer> <slot name="footer"></slot> </footer>
        </div>
        // 父组件模版
        <cpt-child>
          <h1 slot="header">这里可能是一个页面标题</h1>
          <p>主要内容的一个段落</p>
          <p>另一个主要段落</p>
          <p slot="footer">这里有一些联系信息</p>
        </cpt-child>
        // 渲染结果 
        <div class="container">
          <header>
            <h1>这里可能是一个页面标题</h1>
          </header>
          <main>
            <p>主要内容的一个段落</p>
            <p>另一个主要段落</p>
          </main>
          <footer>
            <p>这里有一些联系信息</p>
          </footer>
        </div>
    <template scope="aoo"><template> & <slot boo="val">  作用域插槽['2.1.0+'] 
      从子组件插槽中接收数据来定义子组件插槽的渲染结果 
      在父组件中,通过'scope'属性的值'aoo'来获取对应子组件'boo'属性的值  
      作用域插槽也可以是具名的['slot'属性]; 
      Example: 
        // 父组件中 
        <child>
          <template scope="props">
            <span>hello from parent</span> 
            <span>{{ props.text }}</span>
          </template>
        </child>
        // 子组件中 
        <div class="child"> 
          <slot text="hello from child"></slot>
        </div>
        // 渲染结果为: 
        <div class="child"> 
          <span>hello from parent</span>
          <span>hello from child</span>
        </div>
        
        定义子组件的列表渲染 
        // 父组件 
        <div id="p">
          <cpt-aoo :items="items">
            <template slot="aoo" scope="scp1">
              <li >{{ scp1.id+':'+scp1.text }}</li>
            </template>
          </cpt-aoo>
        </div>
        // 子组件 
        <ul>
          <slot name="aoo" v-for="(item,idx) in list" :text="item" :id="idx">
            // <!-- 这里写入备用内容 -->
          </slot>
        </ul>    
        Vue.component("cpt-aoo",{
          template : `   
            <ul>
              <slot name="coo" v-for="item in items" :text="item"> </slot>
            </ul> `,
          props : ['items'],
        });
        new Vue({
          el: '#p',
          data: {
            items: [
              'aaa',
              'bbb',
              'ccc',
            ]
          },
        });    
  'ref'子组件索引 
    PS: 使用'ref'为子组件指定索引ID,便于JS直接访问子组件;
      当 ref 和 v-for 一起使用时,ref 是一个数组或对象,包含相应的子组件
      $refs 只在组件渲染完成后才填充,并且它是非响应式的,
      仅仅作为一个直接访问子组件的应急方案,应当避免在模版或计算属性中使用 $refs 
    Example:
      <div id="parent">
        <cpt-aoo ref="aaa"></cpt-aoo>
      </div>
      var parent = new Vue({ el: '#parent' })
      var child = parent.$refs.aaa // 访问子组件
  异步组件 
    PS: Vuejs允许将组件定义为一个工厂函数,动态地解析组件的定义 
    只在组件需要渲染时触发工厂函数,并且把结果缓存起来,用于后面的再次渲染 
      可通过 v-if="true"渲染来触发工厂函数 
      当vm中任意一组件渲染都会渲染所有其他子组件 
    Vue.component('async-example',function (resolve,reject) {
      setTimeout(function () { // setTimeout只是为了演示异步获取组件  
        resolve({ // 组件的配置对象 
          template: '<div>I am async! {{msg}}</div>',
          data: {
            msg: 'xx'
          }
        })
        // 也可调用 reject(reason) 指示加载失败  
      },1000)
    })
    使用Webpack的代码分割功能 
      Vue.component('async-webpack-example', function (resolve) {
        // 这个特殊的 require 语法告诉 webpack
        // 自动将编译后的代码分割成不同的块,
        // 这些块将通过 Ajax 请求自动下载 
        require(['./my-async-component'], resolve)
      })
      Webpack2+ES2015 的语法返回一个 Promise resolve 函数：
      Vue.component( 'async-webpack-example',
        () => import('./my-async-component')
      )
      局部注册时也可以直接提供一个返回 Promise 的函数 
      new Vue({
        // ...
        components: {
          'my-component': () => import('./my-async-component')
        }
      })        
    高级异步组件 ['2.3.0+'] 
      Vue.component("xx",() => ({ 
        component: import('./MyComp.vue'), // 需要加载的组件。应当是一个 Promise
        loading: LoadingComp, // loading 时应当渲染的组件
        error: ErrorComp, // 出错时渲染的组件
        delay: 200, // 渲染 loading 组件前的等待时间。默认：200ms。
        timeout: 3000, // 最长等待时间。超出此时间则渲染 error 组件。默认：Infinity
      }));
      当一个异步组件被作为 vue-router 的路由组件使用时,这些高级选项都是无效的,
      因为在路由切换前就会提前加载所需要的异步组件。
      如果要在路由组件中使用上述写法,需要使用 vue-router '2.4.0+'
  'Recursive Components'递归组件: 当有'name'选项时,组件在其模板内可递归调用自己 
    使用 Vue.component 全局注册组件,其全局的ID使用其name选项值,被自动设置;
    若不谨慎,递归组件可能导致死循环 
      name: 'stack-overflow',
      template: '<div><stack-overflow></stack-overflow></div>'
      导致错误 “max stack size exceeded” ,
      要确保递归调用有终止条件[如递归调用时使用 v-if 最终返回 false] 
  'Circular References Between Components'组件间循环引用: 两个组件互为对方的父、子节点 
    使用'Vue.component'注册为全局组件时,框架会自动解决依赖的矛盾 
    使用'Webpack'或'Browserify'等模块化管理工具,requiring/importing时,会报错:
      'Failed to mount component: template or render function not defined.'
      决解办法: 在'beforeCreate'钩子中解决依赖问题 
      beforeCreate: function () {
        this.$options.components.aoo = require('./boo.vue')..default
      }
  <template id="">在HTML中写组件的标签内容    
    PS: 当组件中内容过多,在JS中书写组件模版太过繁琐,可通过<template>在HTML中书写; 
      需定义在Vue实例范围外[浏览器默认不解析其内容],否则会被解析; 
      <template>不能用在<table>内; 
      适用于全局组件和局部组件,且'data'属性需采用函数返回值的形式  
    定义组件时,通过id选择器来指定在HTML中书写的模版 
      <body>
        // <!-- 使用 template 并且添加选择器 [只能使用id] -->
        <template id="myTemp">
          // template 内只能有一个标签,否则只渲染第一个标签,
          // 第一个标签前的非标签内容不会显示,如一段文字等  
          <div>   
            <h2>This is Template </h2>
            <p>{{msg}}</p>
          </div>
        </template>
        <div id="app">
          <my-component></my-component>
          <my-component></my-component>
        </div>
      </body>
      <script>
        Vue.component("my-component", {
          template:"#myTemp", //对应上面定义的template标签中的选择器
          data: function(){
            return {
              msg: 'aaaa'
            };
          }
        })
        new Vue({
          el:"#app"
        });
      </script>
  'v-once'对低开销的静态组件使用  
    当组件中包含大量静态内容时,可使用'v-once'将渲染结果缓存起来
    Vue.component('terms-of-service',{
      template: '\
        <div v-once>\
          <h1>Terms of Service</h1>\
          ... a lot of static content ...\
        </div>'
    })    
  'inline-template'内联模版 
    父组件内,在子组件标签上添加'inline-template'特性,
    子组件标签内的HTML将被作为子组件的模版,而非将其作为分发内容 
    但'inline-template'让模板的作用域难以理解 
    最佳实践是使用 template 选项在组件内定义模板或在'.vue'文件中使用 template 元素
    <my-component inline-template>
      <div>
        <p>These are compiled as the components own template.</p>
        <p>Not parents transclusion content.</p>
      </div>
    </my-component>
  <script type="text/x-template" id="aoo"></script>'X-Templates' 
    在JS标签里使用'text/x-template'类型,且指定一id定义模版 
    在有很多模版或小的应用中有用,否则应该避免使用,因为它将模版和组件的其他定义隔离了 
    <script type="text/x-template" id="aoo">
      <p>Hello hello hello</p>
    </script>
    Vue.component('hello-world',{
      template: '#aoo'
    })
  'v-once' 将包含大量静态内容的组件缓存起来,提高渲染速度  
    Vue.component('cpt-aoo', {
      template: '\
        <div v-once>\
          <h1>Terms of Service</h1>\
          ... a lot of static content ...\
        </div>',
    })
'.vue'单文件组件[详见'vue-cli'] 
'Transition'过渡效果 
  会产生过渡效果的条件: 
    条件渲染 [使用 v-if]
    条件展示 [使用 v-show]
    动态组件 
    组件根节点 
  应用过渡效果的方式: 
    在CSS过渡和动画中自动应用'class' 
    在过渡钩子函数中使用JS操作DOM  
    配合使用第三方CSS动画库,如 Animate.css 
    配合使用第三方js动画库,如 Velocity.js 
  <transition name='xx'>过渡封装组件: 将需过渡的标签块放置于<transition>内 
    原理 
      当插入或删除包含在<transition>组件中的元素时,
      Vue会自动嗅探目标元素是否应用了CSS过渡或动画,
      在恰当的时机添加/删除CSS类名。
      若过渡组件提供了JS钩子函数,这些钩子函数将在恰当的时机被调用。
      若没有找到JS钩子并且也没有检测到CSS过渡/动画,
      DOM操作[插入/删除]在下一帧中立即执行。
  ◆CSS过渡&CSS动画  
    PS: 可给任何元素和组件添加'entering'进入/'leaving'离开的过渡效果 
    用于过渡控制的class类名 
      'v-xx'为类名的默认名称,可对所有无'name'属性的<transition>组件生效,
      使用<transition name="aoo">,'name'属性可重置前缀,如'v-enter'替换为'aoo-enter'
      有6个CSS类名在'enter'&'leave'的过渡中切换 
      'v-enter'    enter的开始状态: 在enter开始时添加,下一帧移除 
      'v-enter-active'  enter的过程: 在enter开始时添加,enter完成后移除 
        在元素整个enter的过渡过程中生效 
        该类可被用来定义过渡的过程时间,延迟和曲线函数 
      'v-enter-to' enter的结束状态: 删除'v-enter'的同时添加,enter完成后移除 ['2.1.8+'] 
      'v-leave'    leave的开始状态: 在leave开始时添加,下一帧移除 
      'v-leave-active'  leave的过程: 在leave开始时添加,leave完成后移除 
        在元素整个leave过程中作用
        这个类可以被用来定义过渡的过程时间,延迟和曲线函数 
      'v-leave-to' leave的结束状态: 删除'v-leave'的同时添加,leave完成后移除 ['2.1.8+'] 
    CSS过渡: 主要使用CSS3的'transition'来实现 
      Example:
        .fade1-enter-active, .fade1-leave-active {
          transition: opacity 0.5s;
        }
        .fade1-enter, .fade1-leave-to {
          opacity: 0
        }
        .fade2-enter-active, .fade2-leave-active {
          transition: all 1s ease-out;
        }
        .fade2-enter {
          transform:translateY(-900px);
          /* 若使用 position 的 top等属性,则不会被 transition 产生过渡效果 */
        }
        .fade2-leave-to {
          transform:translateY(900px);
        }
        <div id="demo">
          <button v-on:click="show=!show"> Toggle </button>
          <transition name="fade1">
            <p v-if="show">Hello</p>
          </transition>
          <transition name="fade2">
            <p v-if="show">Word</p>
          </transition>
        </div>
        new Vue({
          el: '#demo',
          data: {
            show: true
          }
        })
    CSS动画: 主要使用CSS3的'animation'来实现 
      用法类似CSS过渡,
      区别: 在动画中'v-enter'类名在节点插入DOM后不会立即删除, 
      而是在'animationend'事件触发[即动画进入动画结束]时删除 
      Example: 
        p{ background : #aaa; }
        .bounce-enter-active { animation: in 1.5s; }
        .bounce-leave-active { animation: out 1.5s; }
        @keyframes in {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.5);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes out {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.5);
          }
          100% {
            transform: scale(0);
          }
        }
        <div id="example-2">
          <button @click="show = !show">Toggle show</button>
          <transition name="bounce">
            <p v-if="show">Look at me!</p>
          </transition>
        </div>
        new Vue({
          el: '#example-2',
          data: {
            show: true
          }
        })
    自定义过渡/动画类名 
      可通过以下特性来自定义过渡类名:
        PS: 其优先级高于普通的类名,对于Vue的过渡系统和其他第三方CSS动画库结合十分有用
      enter-class=""         
      enter-active-class=""  
      enter-to-class  '2.1.8+' 
      leave-class=""         
      leave-active-class=""  
      leave-to-class '2.1.8+' 
      Example:
        <link href="https://unpkg.com/animate.css@3.5.1/animate.min.css" rel="stylesheet" type="text/css">
        <div id="example-3">
          <button @click="show = !show"> Toggle render </button>
        <transition
        name="custom-classes-transition"
        enter-active-class="animated tada"
        leave-active-class="animated bounceOutRight"
        >
          <p v-if="show">hello</p>
        </transition>
        </div>
        new Vue({
          el: '#example-3',
          data: {
            show: true
          }
        })
  ◆JS过渡&动画 
    PS: 可以是'transitionend'或'animationend'[取决于给元素应用的CSS规则] 
      使用其中任何一种,Vue能自动识别类型并设置监听 
    type="animation/transition" 明确声明需监听的类型 
      在一些场景中,需要给同一个元素同时设置两种过渡动效,
      比如'animation'很快的被触发并完成了,而'transition'效果还没结束 
    JS钩子:  
      'before-enter'     enter之前 
      'enter'            enter过程 
      'after-enter'      enter结束 
      'enter-cancelled'  enter取消 
      'before-leave'     leave之前 
      'leave'            leave过程 
      'after-leave'      leave结束
      'leave-cancelled'  leave取消 
    操作流程: <transition>中绑定JS钩子事件,在vm实例中定义钩子函数执行过渡或动画   
      <transition 
        @:before-enter="beforeEnter"
        @:enter="enter"
        @:after-enter="afterEnter"
        @:enter-cancelled="enterCancelled"
        @:before-leave="beforeLeave"
        @:leave="leave"
        @:after-leave="afterLeave"
        @:leave-cancelled="leaveCancelled" 
        :css="false"> // <!--  :css="false" 避免CSS过渡的影响-->
        // <!-- ... -->
      </transition>
      methods: {
        beforeEnter: function (el) { // el 表示 <transition>元素 
        },
        // 此回调函数是可选项的设置
        // 与 CSS 结合时使用
        enter: function (el, done) {
          // ...
          done() // 表示进入过程结束,必须要调用的 
        },
        afterEnter: function (el) {
        },
        enterCancelled: function (el) {
        },
        beforeLeave: function (el) {
        },
        // 此回调函数是可选项的设置
        // 与 CSS 结合时使用
        leave: function (el, done) {
          // ...
          done() // 表示离开过程结束,必须要调用的 
        },
        afterLeave: function (el) {
        },
        // leaveCancelled 只用于 v-show 中 
        leaveCancelled: function (el) {
        }
      }
      这些钩子函数可以结合 CSS transitions/animations 使用,也可以单独使用 
      当只用JS过渡的时候,在'enter'和'leave'中,回调函数'done'是必须的 
      否则,它们会被同步调用,过渡会立即完成 
      若仅使用JS过渡,则可添加 :css="false",跳过CSS的检测,避免CSS的影响 
    Example: 
      使用jQuery动画 
      .pos{ // 定义预先的位置 
        position: absolute;
        top: 100px;
        left: 200px;
        width: 100px;
        height: 100px;
        background-color: #b9e4e7;
      }
      <div id="demo"> 
        <button v-on:click="show=!show"> Toggle </button>
        <transition 
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
        :css="false"> 
          <div class="pos" v-show="show">123321</div>
        </transition>
      </div>
      new Vue({
        el: '#demo'
        ,data: {
          show: true,
        }
        ,methods : {
          beforeEnter : function(el){
            $(el).css({
              left : '-100px',
              opacity : 0
            })
          }
          ,enter : function(el,done){
            $(el).animate({
              left : '200px',
              opacity : 1
            }
            ,{
              duration : 1500,
              complete : done
            })
          }
          ,leave : function(el,done){
            $(el).animate({
              left : '500px',
              opacity : 1 
            }
            ,{
              duration : 1500,
              complete : done
            })
          },
        }
      })
  :duration="num/{enter:num1,leave:num2}" 定义过渡持续时间[单位ms] ['2.2.0+'] 
    PS: 默认为根元素的第一个'transitionend'或'animationend'事件
    <transition :duration="1000">...</transition>
    // 也可定制进入和移出的持续时间 
    <transition :duration="{ enter: 500, leave: 800 }">...</transition>
  'appear'初始渲染的过渡: 设置节点的在初始渲染的过渡 
    <transition appear>
      <!-- ... -->
    </transition>
    这里默认和进入和离开过渡一样,同样也可以自定义 CSS 类名 
    <transition
      appear
      appear-class="custom-appear-class"
      appear-to-class="custom-appear-to-class" (2.1.8+)
      appear-active-class="custom-appear-active-class" >
      <!-- ... -->
    </transition>
    自定义JS钩子：
    <transition
      appear
      v-on:before-appear="customBeforeAppearHook"
      v-on:appear="customAppearHook"
      v-on:after-appear="customAfterAppearHook"
      v-on:appear-cancelled="customAppearCancelledHook" >
      <!-- ... -->
    </transition>
  mode="in-out/out-in"  多元素切换时的模式 
    PS: 多元素过渡,标签名相同需使用'key'属性来区分; 
    'in-out'   默认值,新元素先添加进来,旧元素然后删除 
    'out-in'   旧元素先去除,新元素再添加进来  
  列表过渡 
◆Vue插件 
'vue-resource'http请求封装插件 
  PS: 通过'XMLHttpRequest'或'JSONP'发起请求并处理响应 
  使用步骤 
    npm i vue-resource --S // 安装并写入依赖 
    import VueResource from 'vue-resource' // 引入'vue-resource' 
    Vue.use(VueResource)  // 安装注册  
    vm.$http.get()  // 在Vue实例中使用 
  ★方法
  vm.$http.get('url'[,obj]).then(f1(data1),f2(data2))  get请求 
    url 请求的地址
    obj 可选,请求的参数
    f1  成功的回调,'data1'进行了Vue封装 
      data1.body       接口响应的数据 
      data1.bodyText   未经转义的响应数据 
      data1.headers    相关的头信息 
      data1.ok         bol,是否请求成功 
      data1.status     状态码 
      data1.statusText 状态描述 
      data1.url        请求的地址  
    f2  失败的回调,'data2'进行了Vue封装,拥有的属性和'data1'相同 
  vm.$http.post('url'[,obj]).then(f1(data1),f2(data2))  post请求 
  vm.$http.jsonp(url [,data] [,options]) jsonp请求 
  设置 
    跨域 
    Vue.http.options.xhr = { withCredentials: true }
    Vue.http.options.emulateJSON = true
'axios'类似'vue-resource'的插件 
'vue-router'前端路由 
  PS: 'vue-router2.x'只适用于'Vue2.x'版本, 
    web开发中,'route'指根据url分配到对应的处理程序;根据不同的地址来显示不同的页面 
  安装'vue-router' 
    script引入 
      在Vue后面加载'vue-router',它会自动安装的
      <script src="/path/to/vue.js"></script>
      <script src="/path/to/vue-router.js"></script>
    npm安装  
      npm i vue-router --S     安装并写入依赖  
      // 引入使用
      import Vue from "vue";
      import VueRouter from "vue-router"; // 引入 
      Vue.use(VueRouter); // 安装路由 [全局的<script>标签,则默认安装了] 
  使用步骤 
    [路由]组件,可从其他文件'import'进来 
    const Foo = { template: '<div>foo</div>' }  // 组件配置对象
    const Bar = { template: '<div>bar</div>' }  
    const router = new VueRouter({  // 路由Map,创建router实例,创建映射 
      // mode : 'history', // 采用'history'模式 
      'routes': [ // 映射表 
        { 
          path : '/boo', // 定义地址URL  
          components : {    // 展示的组件 
            viewName1 : cptA, // 命名视图,可在<router-view>的name中指定  
            viewName2 : cptB,
          },
          component : cptC, // 当只有一个组件时可直接使用组件名  
          name : 'coo',  // 命名路由,可在<router-link>的name中指定  
          children : [   // 路由嵌套,子路由 
            {
              path: 'profile',
              component: UserProfile,
            },
            {
              path: 'posts',
              component: UserPosts,
            }
          ],
          redirect : '/coo', // 重定向  [详见 'redirect']
          alias: '/b',       // 别名    [详见 'alias']
        },
        ...
      ]
    }) 
    const app = new Vue({ // Vue实例中注册  
      el : '#app',
      router : router,    // 注册方式1 
    }) // .$mount('#app') // 注册方式2 
  <router-view name="">   路由视图,指定组件的渲染位置 
    PS: 在挂载点范围内都可以 [?] 
    name="xx"    具名视图,指定视图渲染的组件  
    配合<transition></transition>进行视图过渡效果 
    配合<keep-alive></keep-alive>进行缓存 
  <router-link ></router-link>  路由导航: 在页面中指定跳转的链接 
    PS:<router-link>默认会被渲染成一个<a>标签 
    to="str/obj"   指定链接地址 
      :to="'aoo'"  // 动态绑定
        to="/aoo"     // 到根路径下的aoo 
        to="aoo"      // 相当于'./aoo' 
      to={         // 传入对象 
        name: 'aoo', // 具名路由   
        path: 'aoo', // 跳转路径,与具名路由互斥 
        param : {    // 路由参数 
          key : val,
        },
      }  
    tag='name'  指定<router-link>渲染成的标签,如'div'、'li'等 
    active-class="className"  指定样式 
  'children'嵌套路由,子路由  
    PS: 一个被路由加载的组件同样可包含自己的<router-view>
    Example:
      const User = {
        template: `
        <div class="user">
        <h2>User {{ $route.params.id }}</h2>
        <router-view></router-view>
        </div>
        `
      }
      const router = new VueRouter({
        routes: [
          { 
            path: '/user/:id', 
            component: User, // 需在该组件的HTML中定义<router-view>
            children: [ 
              {
                // 当 /user/:id/profile 匹配成功,
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: 'profile',
                component: UserProfile
              },
              {
                // 当 /user/:id/posts 匹配成功
                // UserPosts 会被渲染在 User 的 <router-view> 中
                path: 'posts',
                component: UserPosts
              }
            ]
          }
        ]
      })  
      基于上面的配置,访问'/user/foo'时,User的出口是不会渲染任何东西,
      因为没有匹配到合适的子路由,若想要渲染点什么,可以提供一个空的子路由: 
      const router = new VueRouter({
        routes: [
          {
            path: '/user/:id', 
            component: User,
            children: [
              // 当 /user/:id 匹配成功,
              // UserHome 会被渲染在 User 的 <router-view> 中
              { path: '', component: UserHome },
              
              // ... 其他子路由 
            ]
          }
        ]
      })
  '/path/:param' 动态路由,配任意的'/path/xx'[类似于于地址中的查询字符串] 
    PS: '/xx'必须存在否则匹配不到? 
    this.$route.params 在组件内获取当前的具体的路径的对象 
      在HTML中可直接使用 {{$route.params.xx}} 来取匹配到的地址参数 
      在一个路由中设置多段路径参数 
        模式             匹配路径       $route.params
        /a/:aoo         /a/bar         { aoo: 'bar' }
        /a/:aoo/b/:boo  /a/bar/b/123   { aoo: 'bar', boo: 123 }
    this.$route.query  [若URL中有查询参数]获取查询参数 
      对于路径 /foo?user=1,则有 $route.query.user == 1,若没有查询参数,则是个空对象 
    this.$route.hash   当前路由的hash值,若无hash,则为空字符串 
    this.$route.path  
    响应路由参数的变化 
      当使用路由参数时,例如从 /user/foo 导航到 user/bar,原来的组件实例会被复用 
      因为两个路由都渲染同个组件,比起销毁再创建,复用则显得更加高效。
      不过,这也意味着组件的生命周期钩子不会再被调用。
      复用组件时,想对路由参数的变化作出响应的话,你可以简单地 watch[监测变化]$route对象 
      const User = {
        template: '...',
        watch: {
          '$route' (to, from) {
            // 对路由变化作出响应...
          }
        }
      }
    当同一个路径匹配多个路由时,则先定义的路由优先级高 
  编程式的导航 
    PS:除了使用<router-link>创建<a>标签来定义导航链接,
      还可以借助router的实例方法,通过编写代码来实现。
      vue-router的导航方法'push''replace''go'是效仿 window.history API 
      window.history.pushState、 
      window.history.replaceState 
      window.history.go
      但其在各类路由模式 history、 hash 和 abstract 下表现一致
    router.push(location)     向history栈添加一个新的记录 
      PS: 当用户点击浏览器后退按钮时,则回到之前的URL 
        当点击<router-link>时,这个方法会在内部调用,
        点击 <router-link :to="..."> 等同于调用 router.push(...) 
      location   字符串路径/描述地址的对象 
        <router-link :to="..."> router.push(...)
      router.push('home') // 字符串
      router.push({ path: 'home' }) // 对象
      router.push({ name: 'user', params: { userId: 123 }}) // 命名的路由
      router.push({ path: 'register', query: { plan: 'private' }})
      // 带查询参数,变成 /register?plan=private
    router.replace(location)  替换掉当前的history记录 
      <router-link :to="..." replace> router.replace(...)
    router.go(n)  在history记录中向前多少步,类似 window.history.go(n) 
      n 一个整数 
      Example:
      router.go(1)    // 在浏览器记录中前进一步,等同于 history.forward()
      router.go(-1)   // 后退一步记录,等同于 history.back()
      router.go(3)    // 前进 3 步记录
      router.go(-100)
      router.go(100) // 若history记录不够用,不操作 
    router.beforeEach(function(to,from,next){ // 每次跳转回调  
      // ...
      next() // 调用next进路由 
    })  
  'name':"xx" 路由配置中命名路由 
    通过名称来标识路由显得更方便,可在创建'Router'实例时,在'routes'配置中设置路由名称 
    const router = new VueRouter({
      routes: [
        {
          path : '/user/:userId',
          name : 'user',
          component : User
        }
      ]
    })
    要链接到一个命名路由,可以给 router-link 的 to 属性传一个对象:
    <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
    这跟代码调用 router.push() 是一回事:
    router.push({ name: 'user', params: { userId: 123 }})
    这两种方式都会把路由导航到 /user/123 路径 
  'redirect'重定向 
    PS: 如当用户访问'/a'时,URL将会被替换成'/b',然后匹配路由为'/b' 
      通过 routes 配置来完成
    const router = new VueRouter({
      routes: [
        { 
          path: '/a', 
          redirect: '/b' 
          // 重定向的目标也可以是一个命名的路由 : 
          // redirect: { name: 'foo' }
          // 甚至是一个方法,动态返回重定向目标:
          // redirect: to => {
          //   // 方法接收 目标路由 作为参数
          //   // return 重定向的 字符串路径/路径对象
          // }
        }
      ]
    })
  'alias'别名: 可自由地将UI结构映射到任意的URL,而不受限于配置的嵌套路由结构 
    若'/a'的别名是'/b',即访问'/b'时,URL保持为'/b',但路由匹配为'/a',就像访问'/a'
    const router = new VueRouter({
      routes: [
        { 
          path: '/a', 
          component: A, 
          alias: '/b' 
        }
      ]
    })
  配合使用的组件 
    <transition></transition> 实现跳转动画 
    <keep-alive></keep-alive> 缓存,加快路由切换速度 
  'history'模式 
    PS: 'vue-router'默认'hash'模式, 
      使用URL的hash来模拟一个完整的URL,当URL改变时,页面不会重新加载
      'history'模式充分利用'history.pushState'API来完成URL跳转而无须重新加载页面;
    const router = new VueRouter({
      mode: 'history',
      routes: [...]
    })
    注: 
      不过这种模式要玩好,还需要后台配置支持。
      因为我们的应用是个单页客户端应用,若后台没有正确的配置,
      当用户在浏览器直接访问 'http://oursite.com/user/id' 就会返回 404,这就不好看了。
      所以呢,你要在服务端增加一个覆盖所有情况的候选资源:
      若 URL 匹配不到任何静态资源,则应该返回同一个 index.html 页面,
      这个页面就是你 app 依赖的页面。
      后端配置例子
        Apache
          <IfModule mod_rewrite.c>
            RewriteEngine On
            RewriteBase /
            RewriteRule ^index\.html$ - [L]
            RewriteCond %{REQUEST_FILENAME} !-f
            RewriteCond %{REQUEST_FILENAME} !-d
            RewriteRule . /index.html [L]
          </IfModule>
        nginx
          location / {
            try_files $uri $uri/ /index.html;
          }
        Node.js (Express)
          https://github.com/bripkens/connect-history-api-fallback
      警告
        给个警告,因为这么做以后,你的服务器就不再返回 404 错误页面,
        因为对于所有路径都会返回 index.html 文件。
        为了避免这种情况,你应该在 Vue 应用里面覆盖所有的路由情况,然后在给出一个 404 页面。
        const router = new VueRouter({
          mode: 'history',
          routes: [
            { path: '*', component: NotFoundComponent }
          ]
        })
        或者,若你是用 Node.js 作后台,可以使用服务端的路由来匹配 URL,
        当没有匹配到路由的时候返回 404,从而实现 fallback。
  异步组件 ['vue-router2.4.0+'] 
    const AsyncComp = () => ({    
      // 需要加载的组件. 应当是一个 Promise
      component: import('./MyComp.vue'),
      // loading 时应当渲染的组件
      loading: LoadingComp,
      // 出错时渲染的组件
      error: ErrorComp,
      // 渲染 loading 组件前的等待时间。默认：200ms.
      delay: 200,
      // 最长等待时间。超出此时间则渲染 error 组件。默认：Infinity
      timeout: 3000
    })
    const routes = [
      { 
        path: '/test', 
        component: (resolve) => require(['./components/test.vue'], resolve) 
      },
      { 
        path: '/index', 
        component: (resolve) => require(['./components/index.vue'], resolve) 
      }
    ];
  todo 
    使用路由搭建单页应用
      
      之前已经通过命令安装了vue-router
      
      npm install vue-router --save
      直接上ES6的语法来进行引入
      import Vue from "vue";
      import VueRouter from "vue-router";
      Vue.use(VueRouter);

      在webpack.config.js加入别名
      
      resolve: {
          alias: {vue: 'vue/dist/vue.js'}
        }
      为什么要加 alias 配置项？其作用可以在文档中有相应的描述:查看图片修改完之后的webpack.config.js是这样子的:
      
      var path = require('path')
      var webpack = require('webpack')
      
      module.exports = {
        entry: './src/main.js',
        output: {
          path: path.resolve(__dirname, './dist'),
          publicPath: '/dist/',
          filename: 'build.js'
        },
        resolveLoader: {
          root: path.join(__dirname, 'node_modules'),
        },
        module: {
          loaders: [
            {
              test: /\.vue$/,
              loader: 'vue'
            },
            {
              test: /\.js$/,
              loader: 'babel',
              exclude: /node_modules/
            },
            {
              test: /\.(png|jpg|gif|svg)$/,
              loader: 'file',
              query: {
                name: '[name].[ext]?[hash]'
              }
            }
          ]
        },
        resolve: {
          alias: {vue: 'vue/dist/vue.js'}
        },
        devServer: {
          historyApiFallback: true,
          noInfo: true
        },
        devtool: '#eval-source-map'
      }
      
      if (process.env.NODE_ENV === 'production') {
        module.exports.devtool = '#source-map'
        // http://vue-loader.vuejs.org/en/workflow/production.html
        module.exports.plugins = (module.exports.plugins || []).concat([
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: '"production"'
            }
          }),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
          })
        ])
      }
      再按之前的方法写一个组件 secondcomponent.vue
      
      <template>
        <div>
          <h1>I am another page</h1>
          <a> written by {{ author }} </a>
          <p> 感谢 <a href="https://github.com/showonne">showonne</a>大神的技术指导</p>
        </div>
      </template>
      
      <script>
      export default {
        data() {
          return {
            author: "微信公众号 jinkey-love",
            articles: [],
          }
        }
        }
      }
      </script>
      
      <style>
      </style>
      这时候修改 main.js,引入并注册 vue-router
      
      import VueRouter from "vue-router";
      Vue.use(VueRouter);
      并且配置路由规则和 app 启动配置项加上 router,旧版的 router.map 方法在vue-router 2.0 已经不能用了修改后的main.js如下:
      
      import Vue from 'vue'
      import App from './App.vue'
      import VueRouter from "vue-router";
      import VueResource from 'vue-resource'
      
      //开启debug模式
      Vue.config.debug = true;
      
      Vue.use(VueRouter);
      Vue.use(VueResource);
      
      // 定义组件, 也可以像教程之前教的方法从别的文件引入
      const First = { template: '<div><h2>我是第 1 个子页面</h2></div>' }
      import secondcomponent from './component/secondcomponent.vue'
      
      // 创建一个路由器实例
      // 并且配置路由规则
      const router = new VueRouter({
        mode: 'history',
        base: __dirname,
        routes: [
          {
            path: '/first',
            component: First
          },
          {
            path: '/second',
            component: secondcomponent
          }
        ]
      })
      
      // 现在我们可以启动应用了！
      // 路由器会创建一个 App 实例,并且挂载到选择符 #app 匹配的元素上
      const app = new Vue({
        router: router,
        render: h => h(App)
      }).$mount('#app')
      这样子改完再打开浏览器看看查看图片点击那两个链接试试,会发现<router-view></router-view>的内容已经展示出来,同时注意浏览器地址已经变更查看图片另外,也可以把 App.vue 的内容写在 main.js 也是可以的不过不建议这么做查看图片
      
      若你使用 vue1.0和0.7版本的 vue-router,请参照下面这个教程, 他整个系列都不错的,当然仅限于 vue1.0 :
      
      http://guowenfh.github.io/2016/03/28/vue-webpack-06-router/
      给页面加点动态数据
      
      这时候的页面都是静态的(数据在写程序的时候已经固定了不能修改),而每个应用基本上都会请求外部数据以动态改变页面内容对应有一个库叫 vue-resource 帮我们解决这个问题使用命令行安装
      
      cnpm install vue-resource --save
      在 main.js 引入并注册 vue-resource:
      
      import VueResource from 'vue-resource'
      Vue.use(VueResource);
      我们在 secondcomponent.vue 上来动态加载数据添加一个列表:
      
      <ul>
            <li v-for="article in articles">
              {{article.title}}
            </li>
          </ul>
      在 data 里面加入数组 articles 并赋值为[]然后在 data 后面加入加入钩子函数 mounted(详细请参照官方文档关于 vue 生命周期的解析),data 和 mount 中间记得记得加逗号
      
      mounted: function() {
          this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
              headers: {
      
              },
              emulateJSON: true
          }).then(function(response) {
            // 这里是处理正确的回调
      
              this.articles = response.data.subjects
              // this.articles = response.data["subjects"] 也可以
      
          }, function(response) {
              // 这里是处理错误的回调
              console.log(response)
          });
        }
      这里使用的是豆瓣的公开 GET 接口,若接口是跨域的 POST 请求,则需要在服务器端配置:
      
      Access-Control-Allow-Origin: *        
'Vuex'状态管理 
  使用 
    npm i vuex --S    安装并写入配置    
    import Vue form 'vue'     引入vue  
    import Vuex from 'vuex'   引入vuex 
    Vue.use(Vuex)             安装     
    let store = new Vuex.store({ // 实例化数据中心'store' 
      state: {  // 状态,用于储存数据 
        stateData0: val,
      },
      getters: { // 相当于'computed',对'state'的处理返回 
        stateData1: function(state){
          return state.xx;
        },
      },
      mutations: { // 函数集合,不可异步执行,一般用于直接操作'state'中的数据 
        foo: function(state,data){  
          // state  储存数据的state对象,
          // data   commit()传入的数据 
        },
      },
      actions: {   // 函数集合,一般是异步的,常和后端API交互、执行'mutations'中的函数  
        // 用于执行'mutations',通过'mutations'更改'state',而不能直接更改'state' 
        goo: function(context,data){
          // context 表示该实例'store',一般用来执行'mutations'中的函数,
            // context.commit('foo',data1) 
          // data    dispatch()传入的数据 
        },
      },
    })
    new Vue({  // 顶层组件实例 
      el: '',
      data: {},
      store: store, // 组件中注册,子组件中使用 vm.$store 进行操作   
    });
    // 子组件中 : 一般通过'computed'属性来承接 this.$store.state 中的数据 
    this.$store  事件对象 
    this.$store.state.xx   使用数据 
    this.$store.getters.xx 使用数据 
    thi.$store.commit('foo',data)   执行'mutations'中的方法 
    thi.$store.dispatch('goo',data) 执行'actions'中的方法 
  采用模块的状态管理: 每个模块维护不同的状态,然后合并到一个总数据中心中 
    const moduleA = {
      state : {},
      getters : {},
      actions : {},
      mutations : {},
    }
    const moduleB = {
      state : {},
      getters : {},
      actions : {},
      mutations : {},
    }
    const store = new Vuex.store({
      modules : {
        aoo: moduleA,
        boo: moduleB,
      }
    })
    // store.state.aoo  获取moduleA中的state 
    // store.state.boo  获取moduleB中的state 
'vue-validator'表单验证 
'vue-touch'移动端 
Question&Suggestion: 
  让 computed 传参 
  如何操作Vue实例的组件选项,如控制组件  
    new Vue({
      // ..
      components: {
        aoo: appCpt, // 控制该组件 
      }
    });
---------------------------------------------------------------------以下待整理  

