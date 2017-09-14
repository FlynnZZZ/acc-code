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
静态属性/方法 
  Vue.config.devtools = bol  读写,是否允许'vue-devtools'检查代码 
    开发版本默认为 true,生产版本默认为 false,设为 true 可启用检查
    务必在加载Vue之后,立即同步设置
  var VueExt = Vue.extend(params); 扩展Vue构造器,用预定义选项创建可复用的组件构造器 
    PS: 所有的Vue组件其实都是被扩展的Vue实例 
      在多数情况下建议将组件构造器注册为一个自定义元素,然后声明式地用在模板中
    var vm = new VueExt(params); 
  Vue.set(obj,key,val)  显式更新数据[确保视图会更新],若为新数据则加入监控 
  Vue.component(tagname,options);  注册全局组件[详见组件] 
  Vue.use() 使用vue插件 
vm = new Vue(params)  创建Vue实例[ViewModel,简称vm] 
  PS: 模板语法声明式的将数据渲染进DOM系统; 
    VueJS应用都是通过构造函数Vue创建一个Vue的根实例启动的;
    所有的VueJS组件其实都是被扩展的Vue实例;
    在params中的方法中'this'表示的即为'vm';
    参数包括数据、模板、挂载元素、方法、生命周期钩子等选项 
  {
    'el': selector, // 指定Vue接管的DOM区域,当选择器指向多个标签时,只接管第一个 
      // 不能在<body>元素上使用id,对<body>进行接管 
    'data': {},     // 用于渲染、交互的数据 
      PS:Vue实例默认代理其'data'对象,使用 this 表示'data'对象;
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
      双向数据绑定 
        view层为 HTML DOM, model层为 vue实例,
        vuejs[使用v-model这个指令]完成中间的底层逻辑,实现绑定的效果, 
        改变其中的任何一层,另外一层都会改变 
        Example:
          HTML
          <div id="test">
            <p>{{ message }}</p>
            <input v-model="message">
          </div>
          JS
          new Vue({
            el: '#test',
            data: { 
              message: '菜鸟教程!', 
            }
          });
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
      ['attr1','attr2',..] 
      {
        attr1 : Number, // 表示只接收数值
        attr2 : [Number,String], // 接收数值和字符串
        attr3 : {
          type : Array , // 接收的类型为数组 
          default : [], // 初始值为空 
        }
      }
    'computed': {}   // 依赖于其他数据的数据  
      PS:相当于经过处理的data数据,根据其依赖的data数据变化而变化 [SlPt]
      {
        val : function(){  // 不能传参 ? 
          return xx;
        }
      }
      setter 
        PS:计算属性默认只有 getter,需要时也可提供 setter;
          默认computed的属性根据其依赖自动执行获取,设置setter可自定义进行执行
        // ...
        computed: {
          fullName: {
            get: function () {  // getter
              return this.firstName + ' ' + this.lastName 
            },
            set: function (newValue) {   // setter
              var names = newValue.split(' ')
              this.firstName = names[0]
              this.lastName = names[names.length - 1]
            }
          },
        }
        // ...
        运行 vm.fullName = 'John Doe' 时,setter会被调用,
        vm.firstName 和 vm.lastName 也会被对应更新 
      Example:
        获取经过处理的数据副本[而非改变原数据] 
          <li v-for="n in evenNumbers">{{ n }}</li>
          data: {
            numbers: [ 1,2,3,4,5 ]
          },
          computed: {
            evenNumbers: function () {
              return this.numbers.filter(function (number) {
                return number % 2 === 0
              })
            }
          }
    'watch'      // 监听数据的变化 
      Example:
        var vm = new Vue({
          data: {
            a: 1,
            b: 2,
            c: 3
          },
          watch: {
            // 当值'a'变化时,执行函数 
            a: function (val, oldVal) {
              console.log('new: %s, old: %s', val, oldVal)
            },
            b: 'someMethod',   // 方法名
            c: {
              handler: function (val, oldVal) { /* ... */ },
              deep: true // 深度 watcher
            }
          }
        })
        vm.a = 2 // -> new: 2, old: 1
      todo 
        当想要在数据变化响应时,执行异步操作或开销较大的操作,很有用的
        <div id="watch-example">
          <p> 
            Ask a yes/no question:
            <input v-model="question">
          </p>
          <p>{{ answer }}</p>
        </div>
        <script src="https://unpkg.com/axios@0.12.0/dist/axios.min.js"></script>
        <script src="https://unpkg.com/lodash@4.13.1/lodash.min.js"></script>
        <script>
        var watchExampleVM = new Vue({
          el: '#watch-example',
          data: {
            question: '',
            answer: 'I cannot give you an answer until you ask a question!'
          },
          watch: {
            // 若 question 发生改变,这个函数就会运行
            question: function (newQuestion) {
              this.answer = 'Waiting for you to stop typing...'
              this.getAnswer()
            }
          },
          methods: {
            // _.debounce 是一个通过 lodash 限制操作频率的函数
            // 在这个例子中,我们希望限制访问yesno.wtf/api的频率
            // ajax请求直到用户输入完毕才会发出
            // 学习更多关于 _.debounce function (and its cousin
            // _.throttle),参考: https://lodash.com/docs#debounce
            getAnswer: _.debounce(
              function () {
                var vm = this
                if (this.question.indexOf('?') === -1) {
                  vm.answer = 'Questions usually contain a question mark. ;-)'
                  return
                }
                vm.answer = 'Thinking...'
                axios.get('https://yesno.wtf/api')
                .then(function (response) {
                  vm.answer = _.capitalize(response.data.answer)
                })
                .catch(function (error) {
                  vm.answer = 'Error! Could not reach the API. ' + error
                })
              },
              // 这是我们为用户停止输入等待的毫秒数
              500
            )
          }
        })
        </script>
        结果:
        Ask a yes/no question: are you ok?
        Yes
        该示例中,使用 watch 选项执行异步操作[访问一个 API],
        限制执行该操作的频率,并在得到最终结果前,设置中间状态
        这是计算属性无法做到的
        除了 watch 选项之外,还可以使用 vm.$watch API 命令
    'methods'    // 执行的方法 
      使用method方法返回数据 
          <li v-for="n in even(numbers)">{{ n }}</li>
          data: {
            numbers: [ 1,2,3,4,5 ]
          },
          methods: {
            even: function (numbers) {
              return numbers.filter(function (number) {
                return number % 2 === 0
              });
            }
          }
    'components': {}, // 注册组件[组件需注册后才可使用]  
      PS: HTML中组件标签不区分大小写,须将驼峰写法转换成'-'连接的方式 
      {
        'cpt-name1' : {
          template : HTMLStr,
          components : { // 组件的子组件,可以一直嵌套使用  
            
          },
        },
        ...
      }
    'filters'    // 定义过滤器 
      val  包含过滤器函数的对象
        {
          ftFoo1 : function(val){
            // 
          }
        }
    'directives' // 自定义指令 
    'mounted'    // 模型渲染后 
      使用 mounted 并不能保证钩子函数中的 this.$el 在 document 中
      为此还应该引入 Vue.nextTick/vm.$nextTick例如:
      mounted: function () {
        this.$nextTick(function () {
          // 代码保证 this.$el 在 document 中
        })
      }
    'template' : HTMLStr,  // 定义实例的HTML内容[原内容被替换] 
    render: function(h){   // 将组件渲染到DOM,相当于'template'的作用  
      h(cpt)
    },
  }
实例属性/方法/事件 
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
  vm.$set(obj,key,val)   效果同Vue.set()  
  vm.$on('eventName',foo)     监听事件
  vm.$emit('event-name',data) 触发事件
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
'Lifecycle hooks'生命周期钩子 
  PS:钩子:某个阶段开始或者结束之前、之后等过程中被触发的函数,
    每个Vue实例在被创建之前都要经过一系列的初始化过程, 
    如实例需要配置数据观测[data observer]、编译模版、挂载实例到 DOM,
    然后在数据变化时更新 DOM,
    在这个过程中,实例也会调用一些 生命周期钩子,提供了执行自定义逻辑的机会,
    组件的自定义逻辑可以分布在这些钩子中[Vue无'控制器'的概念];
    钩子的 this 指向调用它的 Vue 实例;
  'beforeCreate'  实例刚创建 
  'created'       实例创建完毕 
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
  PS:Vue2.x 中,过滤器只能在'插值'和'v-bind'表达式[从' 2.1.0'开始支持]中使用 
    类似Linux中的管道,vuejs也使用的是'|'; 
    因为过滤器设计目的就是用于文本转换
    为了在其他指令中实现更复杂的数据变换,应该使用计算属性
    过滤器函数总接受"|"左边的值作为第一个参数
  插值及指令中使用 
    添加在JS表达式的尾部,由“管道”符指示 
    插值中使用
    {{ message | ftFoo }}
    v-bind 中使用
    <div v-bind:id="rawId | ftFoo"></div>
    传入额外的参数
    {{ message | ftFoo(arg1,arg2,..) }}
  过滤器传参 
    过滤器是JS函数,因此可以接受参数
    {{ message | filterA('arg1',arg2) }}
    字符串'arg1'将传给过滤器作为第二个参数,
    arg2 表达式的值将被求值然后传给过滤器作为第三个参数 
  Vue.filter('ftName',foo); 自定义内建过滤器[全局过滤器,可在所有实例中使用] 
    foo  传入参数 val[,arg1,arg2,..] 
      val 表示'|'左边的值,
      arg 可选,表示使用时传入的额外参数 
    Example:
      定义一个全局的 reverse 过滤器
      Vue.filter('reverse',function (value) {
        return value.split('').reverse().join('')
      })
  过滤器串联 
    {{ message | filterA | filterB }}
'Directives'指令: model和view的交互 
  PS:将vm和 HTML DOM 进行关联,做为HTML标签的属性,让Vue对 DOM 元素做各种处理,
    职责为当其表达式的值改变时相应地将某些行为应用到 DOM 上;
  ◆数据渲染 
  v-text   纯文本 
  v-html   HTML文本 
  v-model  表单元素读写值 
    PS:常见的表单如 input,checkbox,radio,select[select的option不支持],
    Example:
      动态展示输入
      <div id="test">
        <p>{{ message }}</p>
        <input v-model="message">
      </div>
      var vm = new Vue({
        el: '#test',
        data: {
          message: 'Hello Vue!'
        }
      })    
    单个checkbox复选框,值为 false/true 
      <section id="checkbox">
        <label>
          <input type="checkbox" value="获取不到" v-model="checked">
          {{ checked }}
        </label>
      </section>
      var vm = new Vue({
        el : '#checkbox',
        data : {
          checked : true,
        },
      });
      默认选中,通过点击切换,显示'true'或'false'
    多个checkbox复选框绑定到同一个数组时 
      显示选取的人名列表 
      <section id="a" class="">
        <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="checkedNames">
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
        <label for="mike">Mike</label>
        <br>
        <span>Checked names: {{ checkedNames }}</span>
      </section>
      new Vue({
        el: '#a',
        data: {
          checkedNames: []
        }
      });
    radio单选按钮,获取value值 
      显示选中的值 
      <section id="a" >
        <input type="radio" id="one" value="One" v-model="picked">
        <label for="one">One</label>
        <br>
        <input type="radio" id="two" value="Two" v-model="picked">
        <label for="two">Two</label>
        <br>
        <span>Picked: {{ picked }}</span>
      </section>
      new Vue({
        el : '#a',
        data : {
          picked : '',
        },
      });
    select列表 
      <select  v-model='key'>
        <option value="">{{val}}</option>
        // 当存在 value="xx" 时 , v-model 的值为 "xx",否则为val
        // 当 key 的值没有和 option 中 value 属性的值相等时,select无法显示出值
      </select>
      单选列表 
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
              // 当选项中没有被赋予的值存在时,会被默认重置为undefined
            },1000);
          },
        });
      多选列表,绑定到一个数组 
        <div id="slct">
          <select v-model="selected" multiple>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
          <div>Selected: {{ selected }}</div>
        </div>
      动态切换表单值,可用'v-bind'实现[且这个属性的值可以不是字符串]
        复选框切换选中 
          <section id="a" class="">
            <input type="checkbox" v-model="toggle" v-bind:true-value="a" v-bind:false-value="b" >
          </section>
          var vm = new Vue({
            el : '#a',
            data : {
              toggle : '1',
              a : '1',
              b : '2',
            },
          });
          setTimeout(function(){
            vm.toggle = '2';
          },2000);
          // 当选中时
          vm.toggle === vm.a
          // 当没有选中时
          vm.toggle === vm.b
        单选按钮切换选中  
          <section id="a" class="">
            <input type="radio" v-model="pick" v-bind:value="a">
          </section>
          var vm = new Vue({
            el : '#a',
            data : {
              pick : '1',
              a : '1',
            },
          });
          setTimeout(function(){
            vm.a = '2';
          },2000);
          // 当选中时
          vm.pick === vm.a
        选择列表设置 
          <select v-model="selected">
              // <!-- 内联对象字面量 -->
            <option v-bind:value="{ number: 123 }">123</option>
          </select>
          // 当选中时
          typeof vm.selected // -> 'object'
          vm.selected.number // -> 123
          
          切换选中 
          <section id="a" class="">
            <select v-model="slctVal">
              <option v-for="item1 in items" :value="item1.val">{{item1.show}}</option>
            </select>
          </section>
          var vm = new Vue({
            el : '#a',
            data : {
              slctVal : '1',
              items : [
                {val:1,show:'a'},
                {val:2,show:'b'},
                {val:3,show:'c'},
                {val:4,show:'d'},
              ],
            },
          });
          setTimeout(function(){
            vm.slctVal = 2;
          },2000);
  v-for="(item,key,idx) in list"   渲染循环列表 
    item  自定义的占位符placeholder,表示集合'list'中的一项,便于后续使用 
    key   可选,表示集合'list'中一项的键,数组则为下标 
    idx   当遍历对象时可用,表示对象的第几个元素 
      按 Object.keys()的结果遍历对象,但不能保证结果在不同JS引擎下一致
    list  迭代的集合,可为arr/obj/num 
      为num时,表示迭代num次,'item'表示每一次的数字 
    <template v-for="item in list"> 渲染多元素
      PS: 最终在DOM中不存在<template>标签,仅用于包裹元素  
    'props'传递数据 
      不能自动传递数据到组件里,因为组件有自己独立的作用域,传递迭代数据到组件里需用'props'
      <div id="todo-list-example">
        <input v-model="newTodoText" v-on:keyup.enter="addNewTodo" 
        placeholder="Add a todo" >
        <ul>
          <li is="todo-item" v-for="(todo,index) in todos" v-bind:title="todo"
          v-on:remove="todos.splice(index,1)" ></li>
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
    'key'标识渲染元素复用 
      当VueJS用 v-for 正在更新已渲染过的元素列表时,
      它默认用 “就地复用” 策略若数据项的顺序被改变,
      Vue将不是移动 DOM 元素来匹配数据项的顺序,
      而是简单复用此处每个元素,
      并且确保它在特定索引下显示已被渲染过的每个元素这个类似 Vue1.x 的 track-by="$index" 
      这个默认的模式是有效的,但是只适用于不依赖子组件状态或临时 DOM 状态[例如:表单输入值]的列表渲染输出
      为了给 Vue 一个提示,以便它能跟踪每个节点的身份,从而重用和重新排序现有元素,
      你需要为每项提供一个唯一 key 
      属性理想的 key 值是每项都有唯一 id这个特殊的属性相当于 Vue1.x 的 track-by ,
      但它的工作方式类似于一个属性,所以你需要用 v-bind 来绑定动态值 
      <div v-for="item in list" :key="item.id">
        <!-- 内容 -->
      </div>
      建议尽可能使用 v-for 来提供 key ,除非迭代 DOM 内容足够简单,
      或者你是故意要依赖于默认行为来获得性能提升
      因为它是 Vue 识别节点的一个通用机制,key 并不特别与 v-for 关联,
      key 还具有其他用途,我们将在后面的指南中看到其他用途
    可用'of'替代'in'作为分隔符 
      <div v-for="item of list"></div>
  v-once  一次性插值[配合插值使用] 
    当数据改变时,插值处的内容不会更新
    <span v-once>This will never change: {{ msg }}</span>
  ◆显示控制 
  v-if      条件渲染 
    Example:
      <div id="test">
        <p v-if="seen">现在你看到我了</p>
      </div>
      var vm = new Vue({
        el: '#test',
        data: {
          seen: true
        }
      })
      在控制台设置 app3.seen = false 隐藏
    <template>中使用'v-if'控制组件的渲染 
      <template v-if="ok">
        <h1>Title</h1>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </template>
    'key'管理元素是否被复用 
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
          methods : {
          },
          directives : {
          },
          mounted : function (){
          },
        });
        setTimeout(function(){
          vm.loginType = '1'
        },5000);
        两个模版由于使用了相同的元素,<input>会被复用,仅仅是替换了他们的'placeholder'
        初始在表单中输入值,当切换渲染后表单中存在之前的输入 
      Vue可通过添加属性'key'来控制是否复用元素[key 必须带有唯一的值]
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
          methods : {
          },
          directives : {
          },
          mounted : function (){
          },
        });
        setTimeout(function(){
          vm.loginType = '1'
        },5000);
        初始在表单输入的值,在5s后消失[input元素被重新渲染了]
        当两个'key'值相同时,相当与没有'key'时的默认情况 
        注意, <label> 元素仍然会被高效地复用,因为它们没有添加 key 属性。
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
  v-show    作用与v-if类似 
    PS:'v-show'的元素会始终渲染并保持在DOM中[使用 display:none]
      v-show不支持<template>标签
      一般,'v-if'有更高的切换消耗而'v-show'有更高的初始渲染消耗,
      因此若需要频繁切换使用'v-show'较好,若在运行时条件不大可能改变则使用'v-if'较好 
  ◆事件绑定 
  v-on:ename="foo" 事件处理与绑定[简写'@e_name'] [事件名不区分大小写] 
    PS:当一个ViewModel被销毁时,所有的事件处理器都会自动被删除,无须自己清理 
    foo  当触发事件时执行'foo',可为函数[可带参数]、单条语句或空 
      回调函数传参 
        当为函数且未自定义传参时,则默认传入经过vue包装过的event事件对象'e' 
          若有自定义传参,则默认参数被取消
          e.srcElement 表示响应事件的元素 [可用来进行DOM操作[SlPt]]
          e.currentTarget 表示绑定事件的元素 
        'foo($event)' '$event'表示原生DOM事件对象 
          <button v-on:click="warn('11111',$event)">Submit</button>
          methods: {
            warn: function (message,event) {
              if (event){
                event.preventDefault()  // 可以访问原生事件对象
              } 
              alert(message)
            }
          }
        自定义传参 
          除了直接绑定到一个方法,也可以用内联JS语句
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
  'Modifiers'修饰符  让指令以特殊方式绑定[主要用于'v-on'、'v-model'] 
    PS:修饰符是以点号'.'指明的特殊后缀;指令可以串联;
    事件修饰符 
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
      .once    '2.1.4'新增 
        <!-- 事件只会执行一次 -->
        <a v-on:click.once="doThis"></a>
    按键修饰符   在监听键盘事件时,监测键值 
      记住所有的keyCode比较困难,所以Vue为最常用的按键提供了别名 
        <!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
        <input v-on:keyup.13="submit">
        <input v-on:keyup.enter="submit">
      config.keyCodes 全局对象自定义按键修饰符别名 
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
      .enter   Enter键,'.13'等价于'.enter'
      .tab
      .delete  '删除'和'退格'键
      .esc     
      .space   
      .up
      .down
      .left
      .right
      .ctrl   '2.1.0'新增
      .alt    '2.1.0'新增
      .shift  '2.1.0'新增
      .meta   '2.1.0'新增
    鼠标按键修饰符['2.1.0 新增'] 
      .left
      .right
      .middle
    其他修饰符 
      .native  修饰v-on,监听原生事件 
        Example:<my-component v-on:click.native="doTheThing"></my-component>
      .sync    对子组件props双向绑定 [Vue 2.0 中移除,Vue 2.3 加入] 
        Vue1.x  中 .sync 对子组件props双向绑定
          当一个子组件改变了一个 prop 的值时,这个变化也会同步到父组件中所绑定的值
          这很方便,但也会导致问题,因为它破坏了『单向数据流』的假设,会带来高的维护成本
        Vue 2.3 加入,作为一个编译时的语法糖 
          只是让子组件改变父组件状态的代码更容易被区分
          会被扩展为一个自动更新父组件属性的 v-on 侦听器
          <comp :foo.sync="bar"></comp>
          会被扩展为:
          <comp :foo="bar" @update:foo="val => bar = val"></comp>
          当子组件需要更新 foo 的值时,它需要显式地触发一个更新事件:
          this.$emit('update:foo',newValue)
    v-model的修饰符 
      .lazy   从input事件转变为在change事件中同步  
        // <!-- 在 "change" 而不是 "input" 事件中更新 -->
        <input v-model.lazy="msg" >
      .number 自动将用户的输入值转为'Number'类型[若转换结果为'NaN'则返回原值] 
        <input v-model.number="age" type="number">
        这通常很有用,因为在 type="number" 时 HTML 中输入的值也总是会返回字符串类型
      .trim   自动过滤用户输入的首尾空格 
        <input v-model.trim="msg">
  指令的值'val'可为单条语句 
    <div id="example-1"> 
      <button v-on:click="counter += 1">增加 1</button>
      <p>这个按钮被点击了 {{ counter }} 次</p>
    </div> 
    var example1 = new Vue({
      el: '#example-1',
      data: {
        counter: 0
      }
    })
    
    <section id="example" class="">
      <span v-if="a?true:false">111111111111111</span>
    </section>
    data : {
      a : fasle,
    }
  ◆自定义指令 
  v-drctname:drctArg.mdf1.mdf2='drctVal' 自定义指令,在HTML中指定 [不区分大小写] 
    PS:用于对纯DOM元素进行底层操作 
    'drctname'  指令名称 
    'drctArg'   指令的参数,可选 
    'mdf'       指令的修改器,可选 
    'drctVal'   指令的值,可选 
      指令值为对象字面量 
        指令函数能够接受所有合法类型的JS表达式 
        <div v-demo="{ color: 'white', text: 'hello!' }"></div>
        Vue.directive('demo', function (el, binding) {
          console.log(binding.value.color) // => "white"
          console.log(binding.value.text)  // => "hello!"
        })    
    Vue.directive('name',params) // 定义全局指令 
      name    指令名称 
      params  配置对象或函数 { hookName : function(){ }, }
        简写为函数: 在'bind'和'update'钩子上做重复动作,而不关心其它的钩子函数 
          Vue.directive('color-swatch', function (el, binding) {
            el.style.backgroundColor = binding.value
          })
    directives : {               // 注册局部指令  
      focus: {
        // 指令的定义--- 
      }
    },               
    Example:
      <div class="aaa"> <input v-focus > </div>
      Vue.directive('focus', {
        inserted: function (el) {
          el.focus();
          console.log(11111);
        }
      });
      new Vue({
        el : '.aaa',
      });
    ★hookName : function(el,binding,vnode,oldVnode){ }, 指令定义[钩子]函数 
      ◆hookName 钩子函数
      bind     指令第一次绑定到元素时调用[只调用一次] 
        用这个钩子函数可以定义一个在绑定时执行一次的初始化动作
      inserted 被绑定元素插入父节点时调用[父节点存在即可调用,不必存在于'document'中] 
      update   被绑定元素所在的模板更新时调用[DOM渲染?],而不论绑定值是否变化? 
        PS: 可比较更新前后的绑定值'binds.value'和'binds.oldValue',忽略不必要的模板更新  
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
      componentUpdated  被绑定元素所在模板完成一次更新周期时调用 
      unbind   指令与元素解绑时调用[只调用一次]
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
  ◆属性控制 
  v-bind:attrName="arg"  属性赋值[简写':attrName'] 
    PS:在v-bind 用于'class'和'style'时,VueJS专门增强了它 
      表达式的结果类型除了字符串之外,还可以是对象或数组
    arg 可为str,arr,obj
      str,表示属性attrName的值为str 
        <div id="app-2">
          <span v-bind:title="message">
          // 简写为 <span :title="message">
            鼠标悬停几秒钟查看此处动态绑定的提示信息！
          </span>
        </div>
        var app2 = new Vue({
          el: '#app-2',
          data: {
            message: '页面加载于 ' + new Date()
          }
        }); 
        // app2.message = '新消息';
        // 可通过更改 app2.message 的值来改变显示
      arr,表示该class的值为该数组中的多个 
        Example:
          <div v-bind:class="[activeClass,errorClass]">
          data: {
            activeClass: 'active',
            errorClass: 'text-danger'
          }
          渲染为:
          <div class="active text-danger"></div>
        使用三元表达式,根据条件切换列表中的class  
          <div v-bind:class="[isActive ? activeClass : '',errorClass]">
          此例始终添加 errorClass ,但是只有在 isActive 是 true 时添加 activeClass 
        可在数组语法中使用对象语法 
          <div v-bind:class="[{ active: isActive },errorClass]"> 
      obj,key为属性名,val可为属性的值、函数判断或简单表达式  
        动态地切换class 
          <div v-bind:class="{ active: isActive }"></div>
          class active 存在与否将取决于数据属性 isActive 是否为真值
        与普通的class属性共存 
          <div class="static" :class="{ active: isActive,'text-danger': hasError }">
          </div>
          data: {
            isActive: true,
            hasError: false
          }
          渲染为:
          <div class="static active"></div>
        可直接绑定数据属性里的对象 
          <div id="test" v-bind:class="dataKeyObj"></div>
          new Vue({
            el : '#test',
            data: {
              dataKeyObj: {
                active: true,
                'text-danger': false
              }
            }
          });
          渲染为
          <div id="test" class="active"></div>
        可为计算属性的方法[返回的对象] 
          <div v-bind:class="comptFoo"></div>
          data: {
            isActive: true,
            error: null
          },
          computed: {
            comptFoo: function () {
              return {
                active: this.isActive && !this.error,
                'text-danger': this.error && this.error.type === 'fatal',
              }
            }
          }      
    v-bind:class=arg  'class'类样式
      对象语法 
        动态地切换 class 
          <div v-bind:class="{ active: isActive }"></div>
          上面的语法表示 classactive 的更新将取决于数据属性 isActive 是否为真值 
        可以在对象中传入更多属性用来动态切换多个class 
        此外,v-bind:class指令可以与普通的class属性共存如下模板:
          <div class="static"
            v-bind:class="{ active: isActive,'text-danger': hasError }">
          </div>
          如下 data:
          data: {
            isActive: true,
            hasError: false
          }
          渲染为:
          <div class="static active"></div>
        当 isActive 或者 hasError 变化时,class列表将相应地更新
        若 hasError 的值为 true ,class列表将变为 "static active text-danger"
        可以直接绑定数据里的一个对象 
          <div v-bind:class="classObject"></div>
          data: {
            classObject: {
              active: true,
              'text-danger': false
            }
          }
          渲染的结果和上面一样我们也可以在这里绑定返回对象的计算属性这是一个常用且强大的模式:
          <div v-bind:class="classObject"></div>
          data: {
            isActive: true,
            error: null
          },
          computed: {
            classObject: function () {
              return {
                active: this.isActive && !this.error,
                'text-danger': this.error && this.error.type === 'fatal',
              }
            }
          }
      数组语法 
        我们可以把一个数组传给 v-bind:class ,以应用一个 class 列表:
        <div v-bind:class="[activeClass,errorClass]">
        data: {
          activeClass: 'active',
          errorClass: 'text-danger'
        }
        渲染为:
        <div class="active text-danger"></div>
        若你也想根据条件切换列表中的 class ,可以用三元表达式:
        <div v-bind:class="[isActive ? activeClass : '',errorClass]">
        此例始终添加 errorClass ,但是只有在 isActive 是 true 时添加 activeClass 
        不过,当有多个条件 class 时这样写有些繁琐可以在数组语法中使用对象语法:
        <div v-bind:class="[{ active: isActive },errorClass]">
      用在组件上 
        在定制的组件上用到class属性的时,这些类将被添加到根元素上面,这个元素上已经存在的类不会被覆盖
        例如,若你声明了这个组件:
        Vue.component('my-component',{
          template: '<p class="foo bar">Hi</p>'
        })
        然后在使用它的时候添加一些 class:
        <my-component class="baz boo"></my-component>
        HTML 最终将被渲染成为:
        <p class="foo bar baz boo">Hi</p>
        同样的适用于绑定 HTML class :
        <my-component v-bind:class="{ active: isActive }"></my-component>
        当 isActive 为 true 的时候,HTML 将被渲染成为:
        <p class="foo bar active"></p>
    v-bind:style=arg  'style'内联样式 
      对象语法
        v-bind:style 的对象语法十分直观,非常像CSS的
        须将短横分隔命名[kebab-case]改为驼峰式[camelCase] 
        <div v-bind:style="{ color: activeColor,fontSize: fontSize + 'px' }"></div>
        data: {
          activeColor: 'red',
          fontSize: 30
        }
        直接绑定到一个样式对象通常更好,让模板更清晰:
        <div v-bind:style="styleObject"></div>
        data: {
          styleObject: {
            color: 'red',
            fontSize: '13px'
          }
        }
        同样的,对象语法常常结合返回对象的计算属性使用
      数组语法
        v-bind:style 的数组语法可以将多个样式对象应用到一个元素上:
        <div v-bind:style="[baseStyles,overridingStyles]">
      自动添加前缀
        当 v-bind:style 使用需要特定前缀的CSS属性时,如 transform ,VueJS 会自动侦测并添加相应的前缀
    v-bind:key=arg  标识DOM节点 
'Component'组件 
  PS:Vue的重要概念,提供了一种抽象,用独立可复用的小组件来构建大型应用; 
    几乎任意类型的应用的界面都可以抽象为一个组件树;
    在一个大型应用中,为了使得开发过程可控,有必要将应用整体分割成一个个的组件.
    Vuejs组件类似于自定义元素,提供了原生自定义元素所不具备的一些重要功能,
    比如组件间的数据流,自定义事件系统,以及动态的、带特效的组件替换;
    在Vue里,一个组件本质上是一个拥有预定义选项的一个Vue实例;
    扩展 HTML 元素,封装可重用的代码,
    在较高层面上,组件是自定义元素,VueJS 的编译器为它添加特殊功能;
  Vue.component(tagname,options)  // 注册全局组件  
    tagname 组件的名称 
      对于自定义标签名,Vue不强制要求遵循W3C规则[小写,并且包含一个短杠],
      但尽管遵循这个规则比较好
    options 
      ◆配置对象
        PS: 相当于new Vue(options)的options  
      template: HTMLStr,   组件的HTML代码
      props: options ,     可选,自定义属性 
        options 可为 字符串集合数strArr组或对象obj
          strArr  ['attr1','att2',...]
        this.todo 获取到值 
      data: function(){ return obj; } 可选,组件的数据存放,但必须为一函数 
        PS:通过Vue构造器传入的各种选项大多数都可以在组件里用,
          data 是一个例外,它必须是函数
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
      computer : {}
      methods  : {}
      name : '',        // 命名组件 [Self] 
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
  'components': {},  vue实例中局部注册[仅能在该实例/组件的作用域中使用]  
    new Vue({
      ...
      components: {
        'my-component': { // 将只在该模板可用 
          template: '<div>A custom component! {{aoo}}</div>'
        },
      }
    })
    这种封装也适用于其它可注册的 Vue 功能,如指令
  在父实例的模块中使用,在HTML中指定位置 
    以自定义元素<my-component></my-component>的形式使用
    要确保在初始化根实例之前注册了组件
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
    // 渲染为:
    <div id="example">
      <div>A custom component!</div>
    </div>
    A custom component!
  组件元素可能的限制 
    像这些元素 <ul> ,<ol>,<table> ,<select> 限制了能被它包裹的元素,
    而一些像 <option> 这样的元素只能出现在某些其它元素内部
    在自定义组件中使用这些受限制的元素时会导致一些问题,例如:
      <table>
        <my-row>...</my-row>
      </table>
      自定义组件 <my-row> 被认为是无效的内容,因此在渲染的时候会导致错误
      变通的方案是使用特殊的 is 属性:
      <table>
        <tr is="my-row"></tr>
      </table>
    若使用来自以下来源之一的字符串模板,这些限制将不适用:
      <script type="text/x-template">
      JavaScript内联模版字符串
      .vue 组件
  组件通信 
    父组件向子组件通信: 设置标签属性通信 
      PS: 属性名不区分大小写 
      子组件VM中注册'props'属性[进行监听],父组件中添加属性进行赋值 
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
      'v-bind'动态属性 
        PS:每当父组件的数据变化时,该变化也会传导给子组件 
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
      'props'单向数据流 
        PS:当父组件的属性变化时,将传导给子组件,但是不会反过来, 
          这是为了防止子组件无意修改了父组件的状态;
          每当父组件更新时,子组件的所有 prop 都会更新为最新值,
          这意味着不应该在子组件内部改变 prop 否则,Vue 会在控制台给出警告;
          在js中对象和数组是引用类型,指向同一个内存空间,
          若 prop 是一个对象或数组,在子组件内部改变它会影响父组件的状态;
      Prop验证 : 可为组件的props指定验证规格  
        要指定验证规格,改用对象的形式;若传入的数据不符合规格,Vue 会发出警告
        Vue.component('example',{
          props: {
            // 基础类型检测 （`null` 意思是任何类型都可以）
            propA: Number,
            // 多种类型
            propB: [String,Number],
            // 必传且是字符串
            propC: {
              type: String,
              required: true
            },
            // 数字,有默认值
            propD: {
              type: Number,
              default: 100
            },
            // 数组／对象的默认值应当由一个工厂函数返回
            propE: {
              type: Object,
              default: function () {
                return { message: 'hello' }
              }
            },
            // 自定义验证函数
            propF: {
              validator: function (value) {
                return value > 10
              }
            }
          }
        })
        type 类型
          type 也可以是一个自定义构造器函数,使用 instanceof 检测
          当 prop 验证失败,Vue会在抛出警告[若使用的是开发版本]
          String
          Number
          Boolean
          Function
          Object
          Array
      通过自定义事件的监听和触发来达到同样的效果[SlPt] 
    子组件向父组件通信: 触发实例事件通信 
      父组件上的绑定自定义事件,子组件'$emit'触发绑定的事件 
      当子组件触发事件时,父组件中事件的回调函数被执行 
      PS:vm.$on('eventName',foo) 监听事件,vm.$emit('event-name',data) 触发事件 
        父组件在使用子组件的地方直接用v-on来监听子组件触发的事件
      Example:
        <div id="parent">
          <p>{{ total }}</p>
          <cpt-child v-on:parent_event_name="incrementTotal"></cpt-child>
          <cpt-child v-on:parent_event_name="incrementTotal"></cpt-child>
        </div>
        Vue.component('cpt-child',{
          template: '<button v-on:click="childFoo">{{ counter }}</button>',
          data: function () {
            return {
              counter: 0,
              moreData: '来自子组件的消息',
            }
          },
          methods: {
            childFoo: function () {
              this.counter += 1
              this.$emit('parent_event_name',this.moreData)
            }
          },
        })
        new Vue({
          el: '#parent',
          data: {
            total: 0
          },
          methods: {
            incrementTotal: function (moreData) {
              this.total += 1
              console.log(moreData);
            }
          }
        })
      Exp: 
        用于触发父元素的事件名不可采用驼峰命名法,建议使用全小写[SlPt]
    非父子组件通信 
      简单场景下,使用一个的 Vue 实例作为中央事件总线 
        var transfer = new Vue();
        transfer.$emit('custom-event',data); // 触发事件
        transfer.$on('custom-event',function (data) { // 监听事件
          // ...
        })
      复杂情况下,使用专门的状态管理模式Vuex 
  'slot'插槽 : 父组件定制子组件的内容 
    PS:除非子组件模板包含至少一个<slot>插口,否则父组件的内容将会被丢弃; 
      父组件在子组件标签内定义的内容将换掉子组件内定义的没有属性的slot标签本身;
      在<slot>标签中的任何内容都被视为备用内容,没有要替换的内容时才显示备用内容;
    父组件中: 在引入的子组件标签内定制HTML片段[用'slot'属性来标识] 
    子组件中: 通过<slot>标签指定替换的位置及默认内容[用'name'属性标识] 
    编译作用域、组件作用域 
      父组件模板的内容在父组件作用域内编译;子组件模板的内容在子组件作用域内编译; 
      分发内容是在父作用域内编译
    <slot> 插口 
      Example:
      // 子组件
      <div>
        <h2>子组件</h2>
        <slot> 当没有要分发的内容时会显示 </slot>
      </div>
      // 父组件模版
      <div>
        <h1>父组件</h1>
        <cpt-child>
          <p>这是一些初始内容</p>
          <p>这是更多的初始内容</p>
        </cpt-child>
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
    具名Slot,<slot name=""> : 使用'name'属性配置分发的内容 
      PS: 子组件中'name'的值和父组件中'slot'的值进行匹配,相等则将子组件的<slot>替换; 
        可以有一个匿名slot,为默认slot,作为找不到匹配的内容片段的备用插槽
        若没有默认的slot,这些找不到匹配的内容片段将被抛弃;
      Example:
        // 子组件
        <div class="container">
          <header> 
            <slot name="header"></slot> 
          </header>
          <main>   
            <slot></slot>               
          </main>
          <footer> 
            <slot name="footer"></slot> 
          </footer>
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
    <template scope="aoo" slot="boo"> 作用域插槽 ['2.1.0+'] 
      在父组件中,通过'scope'属性获取子组件'props'传递的数据 
      作用域插槽也可以是具名的['slot'属性]; 
      Example:
        // 子组件中 
        <div class="child"> 
          <slot text="hello from child"></slot>
        </div>
        // 父组件中 
        <child>
          <template scope="props">
            <span>hello from parent</span>
            <span>{{ props.text }}</span>
          </template>
        </child>
        // 渲染结果为: 
        <div class="child"> 
          <span>hello from parent</span>
          <span>hello from child</span>
        </div>
        
        自定义子组件的列表渲染 
        // 子组件 
        <ul>
          <slot name="item" v-for="item in list" :text="item.text">
            <!-- 这里写入备用内容 -->
          </slot>
        </ul>        
        // 父组件 
        <my-awesome-list :items="items">
          <template slot="item" scope="props">
            <li class="my-fancy-item">{{ props.text }}</li>
          </template>
        </my-awesome-list>
  编写可复用组件 
    PS:Vue 组件的 API 来自三部分 - props,events 和 slots;
      Props  允许外部环境传递数据给组件
      Events 允许组件触发外部环境的副作用
      Slots  允许外部环境将额外的内容组合在组件中
  <component :is="aoo"> 动态组件 
    通过<component>引入[也可通过其他标签,如<p> ?]; :is="aoo"动态切换[is="aoo"直接指定]
    Example:
      <div id="parent">
        <button type="button" name="button" @click='changeFoo' >switchBtn</button>
        <div v-bind:is="changeFlag">
          // <!-- 组件在 vm.changeFlag 变化时改变！ -->
        </div>
      </div>
      var vm = new Vue({
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
  子组件索引 
    PS:使用ref为子组件指定一个索引 ID,便于JS直接访问子组件;
      当 ref 和 v-for 一起使用时,ref 是一个数组或对象,包含相应的子组件
      $refs 只在组件渲染完成后才填充,并且它是非响应式的,
      仅仅作为一个直接访问子组件的应急方案——应当避免在模版或计算属性中使用 $refs 
    Example:
      <div id="parent">
        <user-profile ref="profile"></user-profile>
      </div>
      var parent = new Vue({ el: '#parent' })
      // 访问子组件
      var child = parent.$refs.profile
  异步组件 
    PS: Vuejs允许将组件定义为一个工厂函数,动态地解析组件的定义
      只在组件需要渲染时触发工厂函数,并且把结果缓存起来,用于后面的再次渲染
    Vue.component('async-example',function (resolve,reject) {
      setTimeout(function () {
        // Pass the component definition to the resolve callback
        resolve({
          template: '<div>I am async!</div>'
        })
      },1000)
      // 工厂函数接收一个 resolve 回调,在收到从服务器下载的组件定义时调用
      // 也可以调用 reject(reason) 指示加载失败
      // 这里 setTimeout 只是为了演示怎么获取组件完全由你决定
    })
    使用Webpack的代码分割功能 
      Vue.component('async-webpack-example', function (resolve) {
        // 这个特殊的 require 语法告诉 webpack
        // 自动将编译后的代码分割成不同的块，
        // 这些块将通过 Ajax 请求自动下载。
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
  递归组件 
    当有name选项时,组件在其模板内可递归调用自己 
    使用 Vue.component 全局注册组件,其全局的ID使用其name选项值,被自动设置;
    若不谨慎,递归组件可能导致死循环 
      name: 'stack-overflow',
      template: '<div><stack-overflow></stack-overflow></div>'
      导致错误 “max stack size exceeded” ,
      要确保递归调用有终止条件[如递归调用时使用 v-if 最终返回 false] 
  组件间的循环引用'Circular References Between Components' 
    Example:构建一文件目录树
    tree-folder 组件
    <p>
      <span>{{ folder.name }}</span>
      <tree-folder-contents :children="folder.children"/>
    </p>
    tree-folder-contents 组件
    <ul>
      <li v-for="child in children">
        <tree-folder v-if="child.children" :folder="child"/>
        <span v-else>{{ child.name }}</span>
      </li>
    </ul>
    当你仔细看时,会发现在渲染树上这两个组件同时为对方的父节点和子节点–这点是矛盾的
    当使用 Vue.component 将这两个组件注册为全局组件的时候,框架会自动为你解决这个矛盾;
    然而,若使用诸如Webpack或者Browserify之类的模块化管理工具来requiring/importing组件的话,就会报错了:
    Failed to mount component: template or render function not defined.
    为了解释为什么会报错,简单的将上面两个组件称为 A 和 B ,
    模块系统看到它需要 A ,但是首先 A 需要 B ,
    但是 B 需要 A,而 A 需要 B,陷入了一个无限循环,因此不知道到底应该先解决哪个
    要解决这个问题,我们需要在其中一个组件中（比如 A ）告诉模块化管理系统,
    “A 虽然需要 B ,但是不需要优先导入 B”
    在我们的例子中,我们选择在tree-folder 组件中来告诉模块化管理系统循环引用的组件间的处理优先级,
    我们知道引起矛盾的子组件是tree-folder-contents,
    所以我们在beforeCreate 生命周期钩子中去注册它:
    beforeCreate: function () {
      this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue')
    }
    问题解决了
  <template>标签书写组件HTML    
    PS: 当组件中内容过多,在JS中书写组件模版太过繁琐,可通过<template>在HTML中书写 
      浏览器默认不去解析里面的内容;<template>不能用在<table>内; 
    定义组件时,通过id选择器来指定在HTML中书写的模版 
      <body>
        // <!-- 使用 template 并且添加选择器(只能使用id)-->
        <template id="myTemp">
          <h2>This is Template </h2>
          <p>add ...</p>
        </template>
        <div id="app">
          <my-component></my-component>
          <my-component></my-component>
        </div>
      </body>
      <script>
        Vue.component("my-component", {
          template:"#myTemp" //对应上面定义的template标签中的选择器
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
        </div>\
      '
    })    
  内联模版 
    若子组件有 inline-template 特性,组件将把它的内容当作它的模板,
    而不是把它当作分发内容,让模板更灵活
    <my-component inline-template>
      <div>
        <p>These are compiled as the component's own template.</p>
        <p>Not parent's transclusion content.</p>
      </div>
    </my-component>
    但是 inline-template 让模板的作用域难以理解
    最佳实践是使用 template 选项在组件内定义模板或者在 .vue 文件中使用 template 元素
  X-Templates 
    另一种定义模版的方式是在 JavaScript 标签里使用 text/x-template 类型,并且指定一个id
    <script type="text/x-template" id="hello-world-template">
      <p>Hello hello hello</p>
    </script>
    Vue.component('hello-world',{
      template: '#hello-world-template'
    })
    这在有很多模版或者小的应用中有用,否则应该避免使用,
    因为它将模版和组件的其他定义隔离了
'.vue'单文件组件[详见'vue-cli'] 
过渡效果 
  Vue在插入、更新或者移除DOM时,有多种不同方式的应用过渡效果 
    在CSS过渡和动画中自动应用'class' 
    在过渡钩子函数中使用js直接操作DOM 
    配合使用第三方CSS动画库,如 Animate.css 
    配合使用第三方js动画库,如 Velocity.js 
  <transition name='xx'> 过渡封装组件 : 将需要过渡的标签放置于<transition>内 
    原理 
      当插入或删除包含在<transition>组件中的元素时,Vue 将会做以下处理:
      自动嗅探目标元素是否应用了CSS过渡或动画,
      若是,在恰当的时机添加/删除CSS类名。
      若过渡组件提供了JS钩子函数,这些钩子函数将在恰当的时机被调用。
      若没有找到JS钩子并且也没有检测到CSS过渡/动画,
      DOM操作[插入/删除]在下一帧中立即执行。
      [注意:此指浏览器逐帧动画机制,和Vue的 nextTick 概念不同]
    'mode'属性 : 多组件切换时的模式 
      'in-out'   默认值,新组件先添加进来,旧组件然后删除 
      'out-in'   旧组件先去除,新组件再添加进来  
    ◆CSS过渡动画 
    PS:可给任何元素和组件添加'entering'/'leaving'过渡 
      适用于: 条件渲染'v-if'、条件显示'v-show'、动态组件、组件根节点 
    用于过渡控制的类名 
      'v-xx'为类名的默认名称,可对所有无'name'属性的<transition>组件起作用,
      使用<transition name="a-b">,'name'属性可重置前缀,如'v-enter'替换为'a-b-enter'
      有6个CSS类名在'enter'/'leave'的过渡中切换
      'v-enter'         进入过渡的开始状态 
        在元素被插入时生效,在下一个帧移除 
      'v-enter-active'  过渡的过程 
        在元素整个过渡过程中作用,在元素被插入时生效,
        在 transition/animation 完成之后移除。 
        这个类可以被用来定义过渡的过程时间,延迟和曲线函数。
      'v-enter-to'      进入过渡的结束状态['2.1.8+'] 
        在元素被插入一帧后生效[于此同时 v-enter 被删除],
        在 transition/animation 完成之后移除。
      'v-leave'         离开过渡的开始状态 
        在离开过渡被触发时生效,在下一个帧移除。
      'v-leave-active'  离开过渡的过程 
        在元素整个过渡过程中作用,在离开过渡被触发后立即生效,
        在 transition/animation 完成之后移除。 
        这个类可以被用来定义过渡的过程时间,延迟和曲线函数。
      'v-leave-to'      离开过渡的结束状态['2.1.8+'] 
        在离开过渡被触发一帧后生效[于此同时 v-leave 被删除],
        在 transition/animation 完成之后移除。      
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
      CSS动画用法同CSS过渡,
      区别是在动画中'v-enter'类名在节点插入DOM后不会立即删除,
      而是在'animationend'事件触发时删除
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
      自定义过渡类名 
        可通过以下特性来自定义过渡类名:
        enter-class
        enter-active-class
        leave-class
        leave-active-class
        他们的优先级高于普通的类名,对于Vue的过渡系统和其他第三方CSS动画库,
        如 Animate.css 结合使用十分有用。
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
    ◆JS过渡动画 
      PS:Vue为了知道过渡的完成,必须设置相应的事件监听器 
        它可以是 transitionend 或 animationend ,这取决于给元素应用的CSS规则 
        若你使用其中任何一种,Vue 能自动识别类型并设置监听。
        但是,在一些场景中,你需要给同一个元素同时设置两种过渡动效,
        比如 animation 很快的被触发并完成了,而 transition 效果还没结束。
        在这种情况中,需要使用 type 特性并设置 animation 或 transition 来明确声明你需要 Vue 监听的类型。
    JS钩子 
      before-enter 
      enter 
      after-enter 
      enter-cancelled 
      before-leave 
      after-leave 
      leave-cancelled 
    操作流程 
      <transition>标签中绑定JS钩子事件 
      <transition 
        @:before-enter="beforeEnter"
        @:enter="enter"
        @:after-enter="afterEnter"
        @:enter-cancelled="enterCancelled"
        @:before-leave="beforeLeave"
        @:leave="leave"
        @:after-leave="afterLeave"
        @:leave-cancelled="leaveCancelled" 
        :css="false"> 
        // <!-- 添加  v-bind:css="false" 避免CSS过渡的影响-->
        // <!-- ... -->
      </transition>
      // ...
      methods: {
        // 回调的参数 el 表示的为<transition>标签内的DOM元素 
        beforeEnter: function (el) {
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
      当只用JS过渡的时候,在 enter 和 leave 中,回调函数 done 是必须的 
      否则,它们会被同步调用,过渡会立即完成 
      推荐对于仅使用JS过渡的元素添加 v-bind:css="false",Vue会跳过CSS的检测 
      这也可以避免过渡过程中 CSS 的影响 
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
        el: '#demo',
        data: {
          show: true,
        },
        methods : {
          beforeEnter : function(el){
            $(el).css({
              left : '-100px',
              opacity : 0
            })
          },
          enter : function(el,done){
            $(el).animate({
              left : '200px',
              opacity : 1
            }, {
              duration : 1500,
              complete : done
            })
          },
          leave : function(el,done){
            $(el).animate({
              left : '500px',
              opacity : 1
            }, {
              duration : 1500,
              complete : done
            })
          },
        },
      })
◆Vue插件 
'vue-resource'http请求封装插件 
  PS:作为vue插件的形式存在,通过'XMLHttpRequest'或'JSONP'发起请求并处理响应 
  使用步骤 
    npm i vue-resource --save // 安装'vue-resource'并将依赖保存到'package.json' 
    import VueResource from 'vue-resource' // 引入'vue-resource' 
    Vue.use(VueResource)  // 声明使用 
    vm.$http.get()  // 使用 
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
  PS:'vue-router2.x'只适用于'Vue2.x'版本,
    web开发中,'route'指根据url分配到对应的处理程序;根据不同的地址来显示不同的页面 
  引入'Vue-router'
    ◆script引入 
    在Vue后面加载'vue-router',它会自动安装的
    <script src="/path/to/vue.js"></script>
    <script src="/path/to/vue-router.js"></script>
    ◆npm安装引入 
    npm i vue-router --save     安装 
    // 引入使用
    import Vue from "vue";
    import VueRouter from "vue-router"; // 引入 
    Vue.use(VueRouter); // 安装 [全局的<script>标签,则默认安装了] 
    var router = new VueRouter(options); // 根据路由配置,实例化路由  
    new Vue({})    // Vue实例中注册 
  使用步骤 
    ◆定义[路由]组件[可以从其他文件'import'进来] 
    const Foo = { template: '<div>foo</div>' }  // 组件配置对象
    const Bar = { template: '<div>bar</div>' }  
    ◆创建router实例: 配置路由,创建映射 
    const router = new VueRouter({ 
      // mode : 'history', // 采用'history'模式 
      'routes' : [ // 映射表 
        { 
          path : '/boo', // 定义地址URL  
          components : {  // 展示的组件 
            viewName1 : cptA, // 命名视图,可在<router-view>的name中指定  
            viewName2 : cptB,
          },
          // component : cptC, // 当只有一个组件时可直接使用组件名  
          name : 'coo',  // 命名路由,可在<router-link>的name中指定  
          children : [   // 路由嵌套 
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
        // 每个路由映射一个组件
      ]
    }) 
    ◆Vue实例中注册 
    const app = new Vue({ 
      el : '#app',
      router : router,    // 注册方式1 
    }) // .$mount('#app') // 注册方式2 
  <router-view>    指定组件的渲染位置 
    name="xx"    标识视图,实现一路由对应多视图 
      PS: 一个路由展示多个视图,可在界面中拥有多个单独命名的视图 
        若未设置名字,则默认为default,一个路由只有一个默认视图  
      Example: 一个视图使用一个组件渲染,因此对于同一个路由,多个视图就需要多个组件
      <router-view ></router-view>
      <router-view name="a"></router-view>
      <router-view name="b"></router-view>
      const router = new VueRouter({
        routes: [
          {
            path: '/',
            components: {
              default: Foo,
              a: Bar,
              b: Baz
            }
          }
        ]
      })
  <router-link >xxx</router-link>  路由连接 : 用于在页面点击跳转 
    PS:<router-link>默认会被渲染成一个<a>标签 
    to="path"   指定链接地址 
      to="/aoo"      // 到根路径下的aoo 
      to="aoo"       // 相当于'./aoo' 
      :to="'aoo'"   // 动态绑定
      :to={         // 传入对象 
        name: 'aoo', // 具名路由   
        path: 'aoo', 
        param : {
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
      当使用路由参数时,例如从 /user/foo 导航到 user/bar,原来的组件实例会被复用。
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
      vue-router的导航方法'push''replace''go'是效仿 window.history API的 
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
    router.beforeEach()  
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
      配置路由
        在 main.js 里
        
        
        
        
        
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
  npm i vuex --save    安装
  import Vuex from 'vuex'   引入vuex
  import Vue form 'vue'     引入vue
  Vue.use(Vuex)             使用声明  
  let store = new Vuex.store({ // 实例化数据中心'store' 
    state : {  // 状态,用于储存数据 
      'key' : val,
    },
    getters : { // 相当于'computed',对'state'的处理返回 
      val : function(state){
        return state.xx;
      },
    },
    actions : { // 函数集合,一般是异步的,常和后端API交互、执行'mutations'中的函数  
      // 用于执行'mutations',通过'mutations'更改'state',而不能直接更改'state' 
      foo : function(context,data){
        // 'context'一般用来执行'mutations'中的函数,data为 dispatch()传入的数据 
        // context.commit('goo',data1) 
      },
    },
    mutations : { // 函数集合,不可异步执行,一般用于直接操作'state'中的数据 
      goo : function(state,data){ // 默认传入 (state,data) 参数 
        // state 即为储存数据的对象,data为 commit()传入的数据 
      },
    },
  })
  new Vue({
    el : '',
    data : {},
    store : store, // 在顶层组件中注册,子组件中使用 vm.$store 进行操作   
  });
  子组件中 
    this.$store  事件对象 
    this.$store.state.xx   使用数据 
    this.$store.getters.xx 使用数据 
    thi.$store.dispatch('goo',data) 执行'actions'中的方法 
    thi.$store.commit('foo',data)   执行'mutations'中的方法 
  采用模块的状态管理 : 每个模块维护不同的状态,然后合并到一个总数据中心中 
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
        a: moduleA,
        b: moduleB,
      }
    })
    // store.state.a  获取状态值 
    // store.state.b  获取状态值 
'vue-validator'表单验证 
'vue-touch'移动端 
suggestion: 
  建议'computed'功能内的函数也可以传参 
---------------------------------------------------------------------以下待整理  

