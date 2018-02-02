VueJS,数据驱动、组件化开发模式的渐进式前端类MVVM框架[IE9+] 
  介绍 
    压缩版无错误提示和警告;
    API设计受AngularJS、KnockoutJS、RactiveJS和RivetsJS影响;
    Vue受MVVM启发,但未完全遵循;
  说明 
    标签属性、标签名、事件名不区分大小写 
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
        Vue.component('head-com',function (resolve,reject) {
          $.get("./head.html").then(function (res) {
            resolve({
              template: res
            })
          });
        });
        var app1 = new Vue({
          el: '#app1'
        });
  'vue-cli'Vue脚手架 
View&Model 
  视图'View',Vue实例管理的DOM节点 
  模型'Model',一个轻微改动过的原生JS对象 
    Vue实例代理了它们观察到的数据对象的所有属性
    vm.$data.a 等价于 vm.a  
    根据引用修改数据和修改 vm.$data 具有相同的效果,即多个Vue实例可观察同一份数据
    在较大型的应用程序中,推荐将Vue实例作为纯粹的视图看待,
    同时把数据处理逻辑放在更独立的外部数据层 
  Example: 
    ◆View
    <div id="app"> awesome {{name}}</div>
    ◆Model 
    var myData = {
      name: 'Vue.js'
    }
    ◆ViewModel: Vue实例,连接view和model 
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
    'mutation method'变异方法,会改变调用该方法的原数据的方法 
      变异方法会使数据得到更新且能保证处于Vue的监控中 
      push()  pop() shift() unshift() splice() sort() reverse()
    'non-mutating method'非变异方法,不改变原数组,返回一新数组 
      如: filter(),concat(),slice()  
    Vue无法检测数据变动的情况及决解办法 
      PS: 由于JS的限制,有些操作改变数据后Vue不能检测到数据的变动,而无法触发视图更新 
        原因: 受现代js的限制[以及废弃 Object.observe]等 
      ◆Vue无法监控数据的情况 
      ★vm实例创建后新增的根级别的响应式属性 
        由于Vue会在初始化实例时对属性执行getter/setter转化过程,
        所以属性必须在 data 对象上存在才能让 Vue 转换它,这样才能让它是响应的 
      ★对象属性的添加或删除 
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
      ★[当函数内仅有]数组通过索引index直接设置成员时 
        Example: 
        vm.items[num] = newValue ,虽然model中数据已经改变,但视图无渲染 
      ★修改数组长度时 
        vm.items.length = newLength 
      ◆解决办法 
      ★在vm实例中预定义一个值,即使为空值,针对根级别的属性  
      ★变异方法 
        arr.splice(indx,1,newVal)
      ★重塑数组/对象: 用新数组/对象替换旧数组/对象 
        example1.items = example1.items.filter(function (item) {
          return item.message.match(/Foo/)
        })
        Vue实现了一些智能启发式方法来最大化DOM元素重用,
        所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作
      ★Vue.set/vm.$set 
        Vue.set(arr,index,newVal)
        this.$set(this.arr,index,newVal)  // vm的实例方法,也是全局Vue.set方法的别名
      ★同时在当前函数内改变会引起视图变化的操作 
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
      然后,在下一个的事件循环“tick”中,Vue 刷新队列并执行实际[已去重的]工作。
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
◆视图相关
'Mustache'插值,声明式的将Model关联到View上  
  PS: 在底层的实现上,Vue 将模板编译成虚拟 DOM 渲染函数;
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
    PS: 像绑定普通属性一样在模板中绑定计算属性 
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
★'Directives'指令,在视图中指定使用,用于'Model'和'View'的交互 
  PS:     
v-text="str"   插入纯文本 
v-html="str"   插入HTML 
v-for="(val,key,idx) in list"   循环渲染  
  val   any,集合'list'中的成员值 
  key   str/num,可选,集合'list'中成员的键名/下标 
  idx   num,可选,当遍历对象时表示对象的第几个元素 
    按 Object.keys()的结果遍历对象,在不同JS引擎下结果可能不一致 
  list  arr/obj/num/str,迭代的集合 
    为num时,表示迭代num次,'item'表示每一次的数字 
  ★使用 
  <template>包裹渲染多元素:  <template v-for="item in list">  
    PS: 最终在DOM中不存在<template>标签,仅用于包裹元素  
  'key'属性标识元素不复用: <div v-for="item in list" :key="item.id"> </div>  
  可循环渲染组件 ['2.2.0+'在组件中使用'v-for','key'是必须的] 
    不能自动传递数据到组件里,因为组件有自己独立的作用域,传递迭代数据到组件里需用'props'
    <template id="cpt1">
      <li> 
        {{ txt }} <button @click="$emit('remove')">X</button> 
      </li> 
    </template>
    <div id="todoList">
      <input v-model="newTodoText" @keyup.enter="addNewTodo">
      <ul>
        <li is="todo_item" v-for="(todo,idx) in todos" :txt="todo" @remove="todos.splice(idx,1)"></li>
      </ul>
    </div>
    Vue.component('todo_item',{
      template: '#cpt1',
      props: ['txt']
    });
    new Vue({
      el: '#todoList',
      data: {
        newTodoText: '',
        todos: [
          'thing1'
          ,'thing2'
          ,'thing3'
        ]
      },
      methods: {
        addNewTodo: function () {
          this.todos.push(this.newTodoText);
          this.newTodoText = '';
        }
      }
    });
  可用'of'替代'in'作为分隔符: <div v-for="item of list"></div>
v-show="bol"    条件显示 
  PS:'v-show'的元素会始终渲染并保持在DOM中[使用 display:none]
  v-show不支持<template>标签
  通常'v-if'有更高的切换消耗,'v-show'有更高的初始渲染消耗 
    若需频繁切换使用'v-show',若初始运行时使用'v-if'
  当条件变化时该指令触发过渡效果 
v-if="bol"      条件渲染 
  在切换时元素及其数据绑定/组件被销毁并重建 
  当条件变化时该指令触发过渡效果 
  可使用<template>包裹控制渲染 
    <template v-if="ok">
      <h1>Title</h1>
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
    </template>
  同时绑定多个'v-if'只有第一个生效,后面的都被忽略 [Self]
    <div v-if='bol1' v-if='bol2'></div>
v-else-if="bol" 条件渲染['2.1.0'+] 
  PS: 须在'v-if'或'v-else-if'后使用 
  Example: 
    <div v-if="type===1"> A </div>
    <div v-else-if="type===2"> B </div>
    <div v-else-if="type===3"> C </div>
    <div v-else> Not 1/2/3 </div>
v-else          条件渲染 
  PS: 须在'v-if'或'v-else-if'后使用 
  Example: 
    <h1 v-if="ok">Yes</h1>
    <h1 v-else>No</h1>
v-model="str/arr" 双向绑定[表单]数据值 
  PS: 
  绑定单个复选框'checkbox'
    默认的,值为 false/true 
      <section id="checkbox">
        <input type="checkbox" value="获取到的不是改值" v-model="checked">
        {{ checked }}
      </section>
      data : {
        checked : true,
      },
      默认选中,通过点击切换,显示'true'或'false'
    添加'ture-value'及'false-value'属性时,值为对应的提供的值  
      <section id="checkBox">
        <input type="checkbox" :true-value="val1" :false-value="val2" v-model="val">
        <div> {{val}} </div>
      </section>
      var vm = new Vue({
        el : '#checkBox',
        data : {
          val1 : '选中'
          ,val2 : '未选中'
          ,val : ''
        },
      });
      setTimeout(function(){
        vm.val = '选中';
      },2000);
  绑定多个复选框'checkbox'到一数组,选中项的'value'对应数组成员   
    <section id="checkBoxs">
      <input type="checkbox" value="Jack" v-model="checkedNames">
      <input type="checkbox" value="John" v-model="checkedNames">
      <input type="checkbox" value="Mike" v-model="checkedNames">
      <div>Checked names: {{ checkedNames }}</div>
    </section>
    data: {
      checkedNames: []
    }
  绑定单选按钮'radio',获取'value'值  
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
  绑定单选列表<select>,获取到被选中项的'value'值  
    Example: 
      <select  v-model='key'>
        <option value="">{{val}}</option>
        // 当存在 value="xx" 时 ,v-model 的值为 "xx",否则为val
        // 当 key 的值没有和 option 中 value 属性的值相等时,select无法显示出值
      </select>
    当选项中不存在被绑定的值时,绑定值会被默认重置为 undefined
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
  绑定多选列表<select>,获取到选中项'value'组成的数组 
    <div id="slct">
      <select v-model="selected" multiple>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <div>Selected: {{ selected }}</div>
    </div>
  绑定其他表单 
    textarea 
    ...
  当表单值为对象,获取到对应的对象 
    <select v-model="selected"> 
      // <!-- 内联对象字面量 --> 
      <option :value="{ num: 123 }">123</option> 
    </select> 
    // 当选中时 
    typeof vm.selected //  'object'
    vm.selected.num    //  123
v-bind:attrname="str/arr/obj"  属性绑定[简写':attrname'] 
  PS:  
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
  obj  参见绑定'class'/'style'
  arr  参见绑定'class'/'style'
  ★'class'和'style'属性,VueJS专门增强了它
  :class="str/obj/arr"  'class'类样式[之前的class不会被覆盖]  
    obj  key为属性名,val为函数判断或简单表达式 
      Example: 
        <div :class="{ active: isActive }"></div>
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
        <div id="test" :class="cls"></div>
        data: {
          cls: {
            c1: true,
            c2: false
          }
        }
    arr  表示该class的值为该数组中的多个 
      Example: 
      <div :class="[activeClass,errorClass]">
      data: {
        activeClass: 'active',
        errorClass: 'text-danger'
      }
      也可在数组语法中使用对象语法 
      <div :class="[{ active: isActive },errorClass]"> 
    在组件上用到class属性时,将被添加到根元素上面,元素上已经存在的类不会被覆盖 
      Vue.component('my-cpt',{
        template: '<p class="foo bar">Hi</p>'
      });
      // 使用 
      <my-cpt class="baz boo"></my-cpt>
      // 将被渲染成为 
      <p class="foo bar baz boo">Hi</p>
      // 同样的适用于动态绑定 
      <my-cpt :class="{ active: true }"></my-cpt>
      // 被渲染成为
      <p class="foo bar active"></p>
  :style="str/obj/arr"  'style'内联样式 
    obj  key为声明属性,val为声明值,适用于添加多个样式  
      可用短横分隔命名'kebab-case'或驼峰式'camelCase' 
        <div :style="{'background-color':color1,fontSize:fontSize+'px'}"></div>
        data: {
          color1: 'red',
          fontSize: 30
        }
      可为属性提供一个包含多个值的数组,常用于提供多个带前缀的值 ['2.3.0+']
        会渲染数组中最后一个被浏览器支持的值。
        <div :style="{ display: ['-webkit-box','-ms-flexbox','flex'] }"></div>
        如果浏览器支持不带浏览器前缀的 flexbox,那么渲染结果会是 display: flex 
    arr  将多个'样式对象'应用到一个元素上 
    Vue会自动添加相应的前缀 
v-bind="obj"  无参数绑定到对象,使用对象的'key'作为参数  
  PS: 该模式下'class'和'style'绑定不支持数组和对象 
  obj   包含"{attr:val}"键值对的对象 
  Example: 
    <div v-bind="{ aoo: 11,boo: 22 }">abc</div> 
    相当于: 
    <div v-bind:aoo="11" v-bind:boo="22">abc</div> 
v-on:ename="foo/expr" 事件绑定[简写'@ename'] [事件名不区分大小写] 
  PS: 当ViewModel被销毁时,所有事件处理器都会自动被删除,无须自己清理 
  foo    函数,事件触发时执行回调 
    函数未传参时,则默认传入经过vue包装过的event事件对象'e',等价 foo($event) 
      若有自定义传参,则默认参数被取消
    foo($event)   '$event'表示原生DOM事件对象 
      e.currentTarget 表示绑定事件的元素 
      e.srcElement    表示响应事件的元素 [可用来进行DOM操作[SlPt]]
      <button @click="warn('11111',$event)">Submit</button>
      methods: {
        warn: function (message,event) {
          if (event){
            event.preventDefault()  // 可以访问原生事件对象
          } 
          alert(message)
        }
      }
    自定义传参 
      <div id="example-3">
        <button @click="say('hi')">Say hi</button>
        <button @click="say('what')">Say what</button>
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
    <form @submit.prevent></form> // 只有修饰符 
  Example: 
    <div id="test">
      <p>{{ message }}</p>
      <button @click="reverseMsg">逆转消息</button>
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
v-on="obj"  对象表示法,同时绑定多个事件  '2.4.0+'  
  PS: 使用对象语法时,不支持任何修饰器 
  obj 为'{事件:监听器}'键值对的对象 
  Example: 
  <button v-on="{ mousedown: doThis,mouseup: doThat }"></button>
'Modifiers'修饰符,让指令以特殊方式绑定,适用'v-on'、'v-model'、'v-bind' 
  PS: 修饰符是以点号'.'指明的特殊后缀;指令可以串联;
  通用事件修饰符 
    .prevent 阻止默认行为,调用 event.preventDefault() 
      <form v-on:submit.prevent="onSubmit"></form>
      // <!-- 提交事件不再重载页面 -->
    .stop    阻止冒泡,调用 event.stopPropagation()
    .capture 使用事件捕获模式 
    .self    只当事件是从侦听器绑定的元素本身触发时才触发回调 
    .once    只触发一次回调 ['2.1.4+'] 
    .native  监听组件根元素的原生事件  
    .passive 以 { passive: true } 模式添加侦听器 ['2.3.0+' ]
  键鼠事件修饰符: 键盘事件时监测键值,鼠标事件时监测鼠标按键  
    同时监听多个 
      // <!-- Alt + C -->
      <input @keyup.alt.67="clear">
      // <!-- Ctrl + Click -->
      <div @click.ctrl="doSomething">Do something</div>
    ◆键盘
    'keyCode'或Vue提供的别名 
      // <!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
      <input @keyup.13="submit">
      <input @keyup.enter="submit">
    Vue.config.keyCodes 全局对象,自定义按键修饰符别名 
      Vue.config.keyCodes.f1 = 112;  // 单个定义,可以使用 @keyup.f1
      Vue.config.keyCodes = {  // 同时定义多个
        v: 86,
        f1: 112,
        mediaPlayPause: 179,
        up: [38,87]
      }
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
    ◆鼠标事件修饰符  ['2.2.0+'] 
    .left
    .right
    .middle
  'v-model'修饰符 
    .lazy   从input事件转变为在change事件中同步  
      // <!-- 在 "change" 而不是 "input" 事件中更新 -->
      <input v-model.lazy="msg" >
    .number 自动将用户的输入值转为'Number'类型[若转换结果为'NaN'则返回原值] 
      <input v-model.number="age" type="number">
      这通常很有用,因为在 type="number" 时 HTML 中输入的值也总是会返回字符串类型
    .trim   自动过滤用户输入的首尾空格 
      <input v-model.trim="msg">
  'v-bind'修饰符 
    .prop   被用于绑定DOM属性'property' 
    .sync   对子组件props双向绑定['2.0'移除,'2.3'加入]  [详见组件'prop'通信] 
      语法糖,会扩展成一个更新父组件绑定值的'v-on'侦听器 
    .camel  将kebab-case特性名转换为camelCase '2.1.0+' 
      将 v-bind 属性名称驼峰化,
      在使用字符串模板或通过 vue-loader/vueify 编译时,无需使用 .camel
      Example:  SVG 的 viewBox 属性：
      <svg :view-box.camel="viewBox"></svg>
v-once   一次性插值[配合插值使用] 
  当数据改变时,插值处的内容不会更新
  <span v-once>值不会更新: {{ msg }}</span>
v-cloak  该指令会保持在元素上直到关联实例结束编译 
  和 CSS 规则如 [v-cloak] { display: none } 一起用时,
  可隐藏未编译的'Mustache'标签直到实例准备完毕 
v-pre    跳过该元素及其子元素的编译  
  可以用来显示原始'Mustache'标签,跳过大量没有指令的节点会加快编译 
'Tag'&'Attr'内置标签及属性 
  ◆标签
  <component is="cptname"></component>   // 放置组件 
  <keep-alive ></keep-alive>  保留组件状态、避免重新渲染 
    PS: 抽象组件,自身不会渲染成DOM元素,也不会出现在父组件链中 
      当组件在<keep-alive>内被切换,
      其'activated'和'deactivated'这两个生命周期钩子函数将会被对应执行。
      在 2.2.0 及其更高版本中,activated和deactivated将会在<keep-alive>树内的所有嵌套组件中触发  
    ★Props：
    include="str/rgep/arr"  只有匹配的组件会被缓存       '2.1.0+'
    exclude="str/rgep/arr"  任何匹配的组件都不会被缓存   '2.1.0+'
    允许组件有条件地缓存,可使用逗号分隔字符串、正则表达式或一个数组来表示 
    匹配首先检查组件自身的 name 选项,
    如果 name 选项不可用,则匹配它的局部注册名称[父组件components选项的键值] 
    匿名组件不能被匹配。
    // <!-- 逗号分隔字符串 -->
    <keep-alive include="a,b">
      <component :is="view"></component>
    </keep-alive>
    // <!-- 正则表达式 (使用 `v-bind`) -->
    <keep-alive :include="/a|b/">
      <component :is="view"></component>
    </keep-alive>
    // <!-- 数组 (使用 `v-bind`) -->
    <keep-alive :include="['a','b']">
      <component :is="view"></component>
    </keep-alive>
    <keep-alive> 缓存切换的组件 
      把切换出去的组件保留在内存中,保留其状态或避免重新渲染;
      <keep-alive>
        <component :is="currentView">
          <!-- 非活动组件将被缓存！ -->
        </component>
      </keep-alive>
  <transition ></transition>   // 过渡 
    ★Props 
    name="str"   用于自动生成 CSS 过渡类名 
      例如：name: 'fade' 将自动拓展为.fade-enter,.fade-enter-active等。默认类名为 "v"
    appear="bol" 是否在初始渲染时使用过渡。默认为 false。
    css="bol"    是否使用 CSS 过渡类。默认为 true 
      果设置为 false,将只通过组件事件触发注册的 JavaScript 钩子。
    type="keywords"   指定过渡事件类型,侦听过渡何时结束 
      默认VueJS将自动检测出持续时间长的为过渡事件类型 
      "transition" 
      "animation"。
    mode="keywords"   控制离开/进入的过渡时间序列 
      默认同时生效 
      "out-in" 
      "in-out" 
    enter-class="str"  
    leave-class="str"
    appear-class="str"
    enter-to-class="str"
    leave-to-class="str"
    appear-to-class="str"
    enter-active-class="str"
    leave-active-class="str"
    appear-active-class="str"
    ★Events  
    before-enter="foo"
    before-leave="foo"
    before-appear="foo"
    enter="foo"
    leave="foo"
    appear="foo"
    after-enter="foo"
    after-leave="foo"
    after-appear="foo"
    enter-cancelled="foo"
    leave-cancelled="foo"    [v-show only]
    appear-cancelled="foo"
  <transition-group></transition-group>  // 过渡 
    <transition-group>元素作为多个元素/组件的过渡效果。
    <transition-group> 渲染一个真实的DOM元素。
    默认渲染 <span>,可以通过 tag 属性配置哪个元素应该被渲染。
    每个 <transition-group> 的子节点必须有独立的'key' ,动画才能正常工作
    <transition-group> 支持通过 CSS transform 过渡移动。
    当一个子节点被更新,从屏幕上的位置发生变化,它将会获取应用 CSS 移动类 ,
    通过 name 属性或配置 move-class 属性自动生成。
    如果 CSS transform 属性是“可过渡”属性,当应用移动类时,
    将会使用 FLIP 技术 使元素流畅地到达动画终点。
    ★Props：
    tag="str"  默认为'span'
    move-class="str"  覆盖移动过渡期间应用的CSS类 
    除了'mode',其他特性和 <transition> 相同。
    ★Events 
    <transition> 相同。
    Example: 
    <transition-group tag="ul" name="slide">
      <li v-for="item in items" :key="item.id">
        {{ item.text }}
      </li>
    </transition-group>
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
  slot="str" 
  ref="str"  给元素或子组件注册引用信息 
    引用信息将会注册在父组件的 $refs 对象上。
    如果在普通的 DOM 元素上使用,引用指向的就是 DOM 元素；
    如果用在子组件上,引用就指向组件实例：
    Example: 
    <p ref="p">hello</p>    //  vm.$refs.p 为DOM节点 
    <cpt-a ref="child"></cpt-a>  // vm.$refs.child 为Vue实例 
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
        .fade1-enter-active,.fade1-leave-active {
          transition: opacity 0.5s;
        }
        .fade1-enter,.fade1-leave-to {
          opacity: 0
        }
        .fade2-enter-active,.fade2-leave-active {
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
        enter: function (el,done) {
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
        leave: function (el,done) {
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
    <transition :duration="{ enter: 500,leave: 800 }">...</transition>
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
◆模型相关 
Vue.xxx,静态属性/方法 
  Vue.config  Vue的全局配置对象,可在启动应用前修改配置  
    Vue.config.devtools = bol  是否允许'vue-devtools'检查代码 
      开发版本默认为 true,生产版本默认为 false 
    Vue.config.silent = bol    是否取消Vue所有的日志与警告 
    Vue.config.optionMergeStrategies  自定义合并策略选项 [详参'Mixins']
    Vue.config.keyCodes     自定义键位别名 [详见'Modifiers'] 
    Vue.config.productionTip  设置为'false'以阻止vue在启动时生成生产提示 ['2.2.0+'] 
  Vue1 = Vue.extend(params) Vue,扩展Vue构造器,用预定义选项创建可复用的组件构造器 
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
  Vue.component(tagname,options)  注册全局组件[详见组件] 
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
  Vue.version   str,VueJS版本号 
    console.log(Vue.version); // 2.3.0
vm = new Vue({   // Vue实例,'ViewModel'简称vm  
  PS: VueJS应用都是通过构造函数Vue创建一个Vue的根实例启动的; 
    所有的VueJS组件其实都是被扩展的Vue实例;
    在实例选项中,方法里的'this'即表示为'vm';
  el: <selector>,// 实例挂载元素 
    PS: 不推荐挂载根实例到<html>或<body>上 
    selector  CSS选择器或 HTMLElement 实例 
      当选择器指向多个元素时,只接管第一个 
    挂载编译 
      该选项在实例化时是有效的,实例将立即进入编译过程,
      否则,需显式调用 vm.$mount() 手动开启编译 
    render函数和template属性不存在时 
      挂载DOM元素的HTML会被提取出来用作模板,
      此时,必须使用 Runtime + Compiler 构建的 Vue 库
  ◆数据选项 
  data: obj,     // 数据,用于渲染、交互的数据 
    实例中默认代理其'data',使用'this'表示 
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
  props: arr/obj,// 接收父组件传递的数据[大小写不敏感] 
    PS: 父组件中的子组件标签上添加属性及对应的值,属性在子组件中的'props'内注册,
      从而在子组件中获取到从父组件传递的属性值   
      在子组件中使用同'data'中的值类似,
      子组件中改变'props'中的值会影响到父组件中[由于JS对象的按引用传递] 
    ['prop0',..]   // 数组中声明接收的数据 
    {   // 对象的形式进行详细定义 
      若接收数据不符合规格,开发版本会发出警告 
      校验在组件实例创建前进行,此时data、computed或methods等属性还无法使用 
      propA: Number,         // str,接收的指定类型  
      propB: [String,Number],// arr,可为多种类型 
        // null 则表示任何类型都可以
      propC: {                // obj,详细配置 
        default: 100          // 原始类型默认值可直接定义  
        default: function () { // 引用类型的默认值需由工厂函数返回 
          return { 
            message: 'hello' 
          };
        }
        ,type: String, // 类型 
          String
          Number
          Boolean
          Function
          Object
          Array
          Symbol
          自定义构造器函数,使用 instanceof 检测 
        ,required: true, // 是否必须 
        ,validator: function (value) {  // 自定义验证函数 
          return value > 10
        }
      }
    }
  propsData: {    // 传递props,主要用于测试 [只用于new创建的实例中]
    <key>: <val>
    Example: 
      var vm = new Comp({
        el: '#root'
        props: ['msg']
        ,propsData: { // 自己向自己传递props数据  
          msg: 'hello'
        }
      })
  },
  computed: {     // 依赖'data'或'props'数据得到的数据 
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
    },
    <computedVal>: {  // 默认只有 get,也可提供 set 
      get: function () {     // getter 
        return xx; // 返回值作为该计算值的值 
      },
      set: function (val) {  // setter 
        // 当设置 computedVal = newValue 时,被调用  
        // 实现改变计算值: 在此处改变 get 的依赖值/返回值  
      }
    },
    Question:
      让计算值传参? 
        方式一: 使用方法来代替 
        方式二: 通过提供 set 来间接实现所需功能 
  }, 
  ◆方法选项 
  watch: {        // 监听数据的变化  
    <key>: function(val,oldVal){ // 方式一 
    },
    <key>: 'someMethod', // 方式二,为一方法名  
    <key>: {       // 方式三,使用对象的方式进行配置  
      deep: true // 深度 watch 
        监听对象属性的变化,需使用深度watch,监听数组的变动则不需要 
      ,handler: function (val,oldVal) {
        // 
      }
    }
    'aoo.boo': foo/{} // 方法四,watch对象的成员 
    Question: 
      当对象变化时,如何确定是某一成员变化导致的? 方法四间接实现
  },     
  methods: {      // 定义的方法
    PS: methods会被混入到Vue实例中,自己使用'this.xx'调用 
    foo1: function(){
      // 
    }
  },
  filters: {      // 定义过滤器,详见过滤器  
    // 
  },   
  directives: {   // 定义指令,详见指令 
    // 
  }  
  ◆视图选项
  template: htmlStr,// 模版,会替换挂载元素及其内部元素,除非模板的内容有分发插槽 
    //若Vue选项中有'render'渲染函数,该模板将被忽略 
  components: { // 定义组件 
    // 
  }  
  render: function(createElem){  // 渲染函数,相当于'template'的作用  
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
  renderError: function(h,err){ // 当'render'出错时,提供另外一种渲染输出  ['2.2.0+'] 
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
  ◆'Lifecycle hooks'生命周期选项
    PS: 钩子:某个阶段开始或者结束前、后等过程中被触发的函数;  
      组件的自定义逻辑可以分布在这些钩子中[Vue无'控制器'概念];
      钩子的'this'指向调用它的Vue实例; 
  beforeCreate: function(){ // 实例刚创建 
    'data'中的数据还未生效  
  },
  created: function(){      // 实例创建完毕 
    实例已完成的配置：
      'data observer'数据观测,可设置'data'中的数据 
      属性和方法的运算、
      watch/event事件回调 
    挂载阶段还没开始,$el 属性目前不可见 
  },
  beforeMount: function(){    // 模版编译挂载/DOM渲染前 
    在挂载前被调用：相关的 render 函数首次被调用 
    该钩子在服务器端渲染期间不被调用
  },
  mounted: function(){        // DOM渲染完毕 
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
  beforeUpdate: function(){ // 组件更新前  
    发生在虚拟 DOM 重新渲染和打补丁前 
    可在该钩子中进一步地更改状态,但会触发附加的重渲染过程 
    该钩子在服务器端渲染期间不被调用     
  }
  updated: function(){      // 组件更新后 
    当这个钩子被调用时,组件 DOM 已经更新
    由于数据更改导致的虚拟DOM重新渲染和打补丁后会调用该钩子 
    'updated'不会承诺所有的子组件也都一起被重绘。
    若希望等到整个视图都重绘完毕,可以用 vm.$nextTick() 
  },
  activated: function(){      // <keep-alive>组件激活时 
    该钩子在服务器端渲染期间不被调用 
  },
  deactivated: function(){    // <keep-alive>组件移除时 
    该钩子在服务器端渲染期间不被调用 
  },
  beforeDestroy: function(){    // 实例销毁前,此时实例仍然可用 
    该钩子在服务器端渲染期间不被调用
  },
  destroyed: function(){        // 组件销毁后 
    销毁观察、组件及事件 
    该钩子在服务器端渲染期间不被调用
    调用后,Vue实例指示的所有东西都会解绑,
    所有的事件监听器会被移除,
    所有的子实例也会被销毁 
  },
  ◆组合选项 
  parent: vm, // 指定已创建的实例之父实例,在两者之间建立父子关系 
    // 子实例可以用 this.$parent 访问父实例,子实例被推入父实例的 $children 数组中 
    // 节制地使用 $parent 和 $children - 它们的主要目的是作为访问组件的应急方法 
    // 更推荐用 props 和 events 实现父子组件通信
  mixins: [], // 混合,详见混合  
    接受一个混合对象的数组,这些混合实例对象可以像正常的实例对象一样包含选项,
    Mixin 钩子按照传入顺序依次调用,并在调用组件自身的钩子之前被调用 
  extends: obj/foo, // 允许声明扩展另一个组件(可是一个简单的选项对象或构造函数) 
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
  provide: obj/foo,     ['2.2.0+'] 
    // 该对象包含可注入其子孙的属性 
    // 参数为一个对象或返回一个对象的函数
  inject: arr/obj,      ['2.2.0+'] 
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
  // ◆其他选项 
  name: str, // 命令组件,只有作为组件选项时起作用 
    允许组件模板递归地调用自身;
    组件在全局用 Vue.component() 注册时,全局 ID 自动作为组件的 name
    指定 name 选项的另一个好处是便于调试。有名字的组件有更友好的警告信息。
    当在有 vue-devtools,未命名组件将显示成 <AnonymousComponent>,这很没有语义。
    通过提供 name 选项,可以获得更有语义信息的组件树。
  delimiters: arr,  // 改变纯文本插入分隔符 
    // 该选项只在完整构建版本中的浏览器内编译时可用 
    // 默认值：["{{","}}"]
    // Example:  改为 ES6 模板字符串的风格
    // new Vue({
    //   delimiters: ['${','}']
    // })
  functional: bol, // 使组件无状态[没有 data]和无实例[没有 this 上下文] 
    // 用一个简单的 render 函数返回虚拟节点使他们更容易渲染 
  model: { // 允许一个自定义组件在使用 v-model 时定制 prop 和 event  '2.2.0+'
    // 默认情况下,一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event,
    // 但是一些输入类型比如单选框和复选框按钮可能像使用 value prop 来达到不同的目的。
    // 使用 model 选项可以回避这些情况产生的冲突。
    prop: '',
    event: ''
  } 
  inheritAttrs: bol,// 默认值:true  '2.4.0+'
    // 默认情况下父作用域的不被认作 props 的特性绑定 (attribute bindings) 
    // 将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上。
    // 当撰写包裹一个目标元素或另一个组件的组件时,这可能不会总是符合预期行为。
    // 通过设置 inheritAttrs 到 false,这些默认行为将会被去掉。
    // 而通过 (同样是 2.4 新增的) 实例属性 $attrs 可以让这些特性生效,
    // 且可以通过 v-bind 显性的绑定到非根元素上。
    // 这个选项不影响 class 和 style 绑定。
  comments: bol, // 是否保留且渲染模板中的HTML注释,默认：false  '2.4.0+'
    // 该选项只在完整构建版本中的浏览器内编译时可用。
})  
vm.xxx.实例属性/方法/事件 
  PS: vm.$xx [带有前缀$的]实例方法/属性,在配置对象中使用'this'代替'vm' 
  ◆实例属性 
  vm.$options 只读,当前Vue实例的初始化选项 
    Example: 在选项中包含自定义属性时 
    new Vue({
      myOption: 123,
      created: function () {
        console.log(this.$options.myOption) //  123
      }
    })
  vm.$el      只读,Vue实例使用的根DOM元素,类型：HTMLElement 
  vm.$data    Vue实例观察的数据对象 
  vm.$props   当前组件接收到的props对象  '2.2.0+' 
    <child-a v-bind="$props"></child-a> 
    // 通过 $props 将父组件的 props 一起传给子组件 
  vm.$nextTick(foo)        DOM更新后立即调用 
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
          // 用于Vue采用异步队列来更新DOM,此时DOM还未更新
          console.log(this.$el.textContent) // => '没有更新'
          this.$nextTick(function () {
            console.log(this.$el.textContent) // => '更新完成'
          })
        }
      }
    })
  vm.$parent     只读,父实例[若存在的话]
  vm.$root       只读,当前组件树的根Vue实例,若当前实例无父实例,则是其自己 
  vm.$children   只读,当前实例的直接子组件 
    $children 并不保证顺序,也不是响应式的 
  vm.$slots      只读,用来访问被插槽分发的内容
    每个具名插槽 有其相应的属性 (例如：slot="foo" 中的内容将会在 vm.$slots.foo 中被找到)。
    default 属性包括了所有没有被包含在具名插槽中的节点。 
  vm.$scopedSlots 只读,用来访问作用域插槽   '2.1.0+' 
    对于包括 默认 slot 在内的每一个插槽,该对象都包含一个返回相应 VNode 的函数。
  vm.$refs        只读,包含已注册过'ref'的所有子组件的对象 
    Example: 
      vm.$refs.aoo 表示 <cpt-a ref="aoo"> 子组件 
  vm.$isServer    只读,当前Vue实例是否运行于服务器的布尔值 
  vm.$attrs       只读,包含了父作用域中不被认为[且不预期为]'props'的特性绑定 [class 和 style 除外] 
    当一个组件没有声明任何 props 时,这里会包含所有父作用域的绑定 (class 和 style 除外),
    并且可以通过 v-bind="$attrs" 传入内部组件——在创建更高层次的组件时非常有用。
  vm.$listeners   只读,包含了父作用域中的[不含'.native'修饰器的]v-on事件监听器 
    它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用 
  ◆实例方法
  vm.$watch('key',f(newVal,oldVal) [,options])  监控元素改变的方法 
    key  data对象中的属性,一个表达式或计算属性函数 
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
    f    回调函数
    options = {
      deep: bol, // 为了发现对象内部值的变化,可以在选项参数中指定 deep: true 
        vm.$watch('someObject',callback,{
          deep: true
        })
        vm.someObject.nestedValue = 123
      immediate: bol  // immediate: true 将立即以表达式的当前值触发回调
        vm.$watch('a',callback,{
          immediate: true
        })
        // 立即以 `a` 的当前值触发回调
    }
    返回一个取消观察函数,用来停止触发回调：
      var unwatch = vm.$watch('a',cb)
      unwatch() // 取消观察
    Example: 
      vm.$watch('a',function (newVal,oldVal) {
          // 回调将在`vm.a`值改变后调用 
      })
  vm.$set(obj/arr,key/idx,val) 返回设置的值,效果同Vue.set()  
  vm.$delete(obj/arr,key/idx)  效果同Vue.delete()  
  vm.$on('event-name'/arr,foo)     监听事件,触发回调   [数组只在'2.2.0+'中支持] 
    监听当前实例上的自定义事件。事件可以由 vm.$emit() 触发
    回调函数会接收所有传入事件触发函数的额外参数。
  vm.$once('event-name',foo)  监听事件,但只触发一次,在第一次触发之后移除监听器 
  vm.$off(['event-name'/arr,foo])   移除自定义事件监听器     [只在'2.2.2+'支持数组]
    如果没有提供参数,则移除所有的事件监听器；
    如果只提供了事件,则移除该事件所有的监听器；
    如果同时提供了事件与回调,则只移除这个回调的监听器。
  vm.$emit('event-name',[data..])  触发事件,传递数据 
    附加参数都会传给监听器回调 
  vm.$mount(elem/selector)    手动编译Vue实例,返回实例自身 
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
  vm.$forceUpdate()  迫使Vue实例重新渲染,仅影响实例本身和插入插槽内容的子组件[而非所有子组件]
  vm.$nextTick([foo])  将回调延迟到下次DOM更新循环后执行。
    在修改数据之后立即使用它,然后等待 DOM 更新。
    跟全局方法 Vue.nextTick 一样,不同的是回调的 this 自动绑定到调用它的实例上。
    如果没有提供回调且支持Promise的环境中返 Promise  '2.1.0+'
  vm.$destroy()      完全销毁一个实例
    清理它与其它实例的连接,解绑它的全部指令及事件监听器 
    触发 beforeDestroy 和 destroyed 的钩子。
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
    } 
    update: function(el,binding,vnode,oldVnode){ // 所在组件的vnode更新时调用 
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
      PS: 除了'el'外,其它参数都应该是只读的,尽量不要修改他们 
        若需要在钩子之间共享数据,建议通过元素的 dataset 来进行
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
'Component'组件 
  PS: 需插入的Vue实例前定义,才会渲染出该组件 
    否则要触发该实例的任意一组件渲染,如通过'v-if' 
  ◆定义 
  Vue.component('c-name',{   // 全局组件  
    'c-name'   组件名称,推荐使用小写,且包含一个短杠 
    配置对象,相当于new Vue(options)的options  
    data: function(){  // 组件数据,必须为一函数 
      PS: 函数返回值可避免多次使用一组件时数据的共享  
      return { 
      }; 
      使用数据共享'特性': 通过函数返回同一份数据 
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
        三个组件共享了同一个 data ,因此 counter 会影响所有组件 
    } 
    name: 'aoo',      // 命名组件,用于递归调用 
  })  
  Vue.component("c-name",function(rs,rj){  // 异步全局组件 
    rs({}) // 可在适当的时候进行 
  });
  'components': {     // vue实例中局部注册 
    PS: 仅能在该实例/组件的作用域中使用 
    'cpt-name1' : cpt,
      cpt 可为:   
      import xx from "./cpt.js";  // 模块化引入的组件
      Vue.component(cpt,{})       // 定义的全局组件 
      {                           // 通过对象来配置的组件 
        template: '<div>A custom component! {{aoo}}</div>',
      }
    // ..
  },
  ◆使用
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
  ◆Feature 
  组件元素可能的限制及解决 
    <ul>,<ol>,<table>,<select>等子标签有类型限制 
    在其内部使用组件时可能会导致问题 
    Example: 
      <table> <my-row>...</my-row> </table>
      自定义组件 <my-row> 被认为是无效的内容,在渲染的时会导致错误 
      使用'is'属性可解决 
      <table> <tr is="my-row"></tr> </table>
    使用以下字符串模板,则无该限制 
      <script type="text/x-template">
      JavaScript内联模版字符串
      .vue 组件
  <template id="xxx">在HTML中写组件的标签内容    
    PS: 当组件中内容过多,在JS中书写组件模版太过繁琐,可通过<template>在HTML中书写; 
      需定义在Vue实例范围外[浏览器默认不解析其内容],否则会被解析; 
      IE中需定义 template{ display: none; } 否则浏览器会解析
      <template>不能用在<table>内; 
      适用于全局组件和局部组件,且'data'属性需采用函数返回值的形式  
    定义组件时,通过id选择器来指定在HTML中书写的模版 
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
      Vue.component("my-component",{
        template:"#myTemp",// 对应上面定义的template标签中的选择器
        data: function(){
          return {
            msg: 'aaaa'
          };
        }
      })
      new Vue({
        el:"#app"
      });
  <script type="text/x-template" id="aoo"></script>'X-Templates' 
    在script标签里使用'text/x-template'类型,且指定一id定义模版 
    在有很多模版或小的应用中有用,否则应避免使用,因为它将模版和组件的其他定义隔离了 
    <script type="text/x-template" id="aoo">
      <p>Hello hello hello</p>
    </script>
    Vue.component('hello-world',{
      template: '#aoo'
    })
  组件通信 
    PS: 组件实例的作用域是孤立的,不能在子组件的模板内直接引用父组件的数据 
    'props down'父组件向子组件通信 
      父组件中,子组件标签上设置属性,子组件内声明使用  
        当父组件赋给属性的值,子组件内可获取到 
        当动态绑定属性时,子组件内也会实时响应 
      'props'单向数据流 
        PS: 而在子组件内部改变prop,Vue会在控制台给出警告; 
          在js中对象和数组是引用类型,指向同一个内存空间,
          若prop是一对象或数组,在子组件内部改变它会影响父组件的状态;
        定义'data'属性,用prop值初始化: 不会动态响应父组件传递的数据  
          props: ['parentData'],
          data: function () {
            return { 
              aoo: this.parentData 
            }
          }
        定义计算属性,处理prop值并返回: 不可进行覆盖操作,需定义set  
          props: ['parentData'],
          computed: {
            normalizedSize: function () {
              return this.parentData.trim().toLowerCase()
            }
          }
        定义'data'属性,用prop值初始化,并监听prop值进行动态响应  
    'events up'子组件向父组件通信 
      父组件中,子组件标签上绑定自定义事件并指定回调函数, 
      子组件内通过'$emit'触发该事件并传递数据,
      父组件中的回调函数会执行并获取到该数据  
      childVm.$emit('event-name',data) 触发事件并传递数据'data'
    <props>.sync,父子组件双向通信,共同维持一份数据 
      :<propname>.sync="<parentVal>"  父组件内向子组件传递值<parentVal> 
      <childVm>.$emit('update:<propname>',<data>) 子组件通过事件触发改变<parentVal>
      父组件及子组件内<parentVal>的值都改变成<data>
      Example: 
        <template id='cpt'>
          <div>
            <div>{{prop1}}</div> 
            <div @click=foo>click</div>
          </div> 
        </template>
        <div id="root">
          <div>{{msg}}</div>
          <cpt-aoo :prop1.sync="msg"></cpt-aoo>
        </div>
        Vue.component("cpt-aoo",{
          template: '#cpt',
          props: ['prop1'],
          methods: {
            foo: function(){
              this.$emit('update:prop1','bbbb')
            },
          },
        });
        new Vue({
          el : '#root',
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
  父组件内直接定义子组件根节点的属性 
    PS: 可直接传入组件,而不需要定义相应的'prop' 
      一般的,传递给组件的值会覆盖组件本身设定的值,
      但'class'和'style'这两个特性的值都会做合并'merge'操作 
    Example: 
      <cpt-aoo style="color:red;"></cpt-aoo> // 在子组件中会直接生效 
  slot="xxx"&<slot name="xxx">,分发内容,父子组件模版通信,父组件定制子组件DOM内容 
    父组件中,定义HTML标签放置在子组件标签的内部 
      <div id="parent">
        <cpt-child>
          <p>这是一些初始内容</p>
          <p>这是更多的初始内容</p>
        </cpt-child>
      </div>
      可用'slot'属性具名 
    子组件中,通过<slot>标签指定替换的位置及默认内容 
      <template id='child'>
        <div>
          <slot> 当没有要分发的内容时会显示 </slot>
          // <slot>内的任何内容都被视为备用内容,没有要替换的内容时会显示备用内容 
          // 子组件模板需至少有一个<slot>插口,否则父组件的内容将会被丢弃  
        </div>
      </template>
      可用'name'属性具名 
    <tag slot="aoo"></tag> & <slot name="aoo"> 具名插槽 
      PS: 子组件中'name'的值和父组件中'slot'的值进行匹配,相等则替换; 
        可以有一个匿名slot,为默认slot,作为找不到匹配的内容片段的备用插槽
        若无默认的<slot>,找不到匹配的内容片段将被抛弃 
      Example:
        // 父组件模版
        <div id="parent">
          <cpt-child>
            <h1 slot="header">111</h1>
            <p>222</p>
            <p>333</p>
            <h2 slot="footer">444</h2>
          </cpt-child>
        </div>
        // 子组件 
        <template id="child">
          <div>
            <header> <slot name="header"></slot> </header>
            <main> <slot></slot> </main>
            <footer> <slot name="footer"></slot> </footer>
          </div>
        </template>
        // 渲染结果 
        <div id="parent">
          <div>
            <header> <h1>这里可能是一个页面标题</h1> </header>
            <main>
              <p>主要内容的一个段落</p>
              <p>另一个主要段落</p>
            </main>
            <footer> <h2>这里有一些联系信息</h2> </footer>
          </div>
        </div>
    编译作用域、组件作用域 
      父组件模板的内容在父组件作用域内编译;子组件模板的内容在子组件作用域内编译; 
      分发内容是在父作用域内编译 
    <template scope="aoo"><template> & <slot boo="val">  作用域插槽['2.1.0+'] 
      PS: 在父组件中,aoo.boo 表示 val 的值 
      子组件定义父组件中分发内容的数据 
      作用域插槽也可以是具名的['slot'属性]; 
      Example: 
        // 父组件中 
        <div id="parent">
          <cpt-child>
            <template scope="aoo">
              <span>hello from parent</span> 
              <span>{{ aoo.boo }}</span>
            </template>
          </cpt-child>
        </div>
        // 子组件中 
        <template id="child">
          <div id="child"> 
            <slot boo="hello from child"></slot>
          </div>
        </template>
        // 渲染结果: 
        <div id="parent">
          <div id="child"> 
            <span>hello from parent</span>
            <span>hello from child</span>
          </div>
        </div>
      定义子组件的列表渲染 
        // 父组件 
        <div id="parent">
          <cpt-child :items="list">
            <template slot="aoo" scope="aoo">
              <li >{{ aoo.id+':'+aoo.text }}</li>
            </template>
          </cpt-child>
        </div>
        // 子组件 
        <template id='cpt-child'> 
          <ul>
            <slot name="aoo" v-for="(item,idx) in items" :text="item" :id="idx">
            </slot>
          </ul>    
        </template>
        Vue.component("cpt-child",{
          template: '#cpt-child',
          props : ['items'],
        });
        new Vue({
          el: '#parent',
          data: {
            list: [
              111
              ,222
              ,333
            ]
          }
        });    
  'inline-template'内联模版 
    父组件内,在子组件标签上添加'inline-template'属性,
    子组件标签内的HTML[只能有一个根节点]将被作为子组件的模版,而非作为分发内容 
    但'inline-template'让模板的作用域难以理解 
    最佳实践是使用 template 选项在组件内定义模板或在'.vue'文件中使用 template 元素 
    Example: 
      <cpt-child inline-template>
        <div>
          <p>These are compiled as the components own template.</p>
          <p>Not parents transclusion content.</p>
        </div>
      </cpt-child>
  'v-once'对低开销的静态组件使用,提高渲染速度 
    当组件中包含大量静态内容时,可使用'v-once'将渲染结果缓存起来 
    <template id="cpt1">
      <div v-once>
        <h1>abc</h1>
        ... // 大量静态内容 
      </div>
    </template>
    Vue.component('cpt-static',{
      template: '#cpt1'
    })    
  ref="aoo"&vm.$refs.aoo,子组件索引 
    PS: 使用'ref'属性为子组件指定索引ID,便于在父组件中直接访问子组件;
      仅仅作为一个直接访问子组件的应急方案,应当避免在模版或计算属性中使用 $refs 
      $refs 只在组件渲染完成后才填充,并且它是非响应式的,
      当 ref 和 v-for 一起使用时,ref 是一个数组或对象,包含相应的子组件
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
    Vue.component('async-cpt',function (resolve,reject) {
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
      Vue.component('async-webpack-example',function (resolve) {
        // 这个特殊的 require 语法告诉 webpack
        // 自动将编译后的代码分割成不同的块,
        // 这些块将通过 Ajax 请求自动下载 
        require(['./my-async-component'],resolve)
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
        component: import('./MyComp.vue'),// 需要加载的组件。应当是一个 Promise
        loading: LoadingComp,// loading 时应当渲染的组件
        error: ErrorComp,// 出错时渲染的组件
        delay: 200,// 渲染 loading 组件前的等待时间。默认：200ms。
        timeout: 3000,// 最长等待时间。超出此时间则渲染 error 组件。默认：Infinity
      }));
      当一个异步组件被作为 vue-router 的路由组件使用时,这些高级选项都是无效的,
      因为在路由切换前就会提前加载所需要的异步组件。
      如果要在路由组件中使用上述写法,需要使用 vue-router '2.4.0+'
  'Recursive Components'递归组件: 当有'name'选项时,组件在其模板内可递归调用自己 
    使用 Vue.component() 全局注册组件,其全局的ID使用其name选项值,被自动设置;
    若不谨慎,递归组件可能导致死循环 
      name: 'stack-overflow',
      template: '<div><stack-overflow></stack-overflow></div>'
      导致错误 “max stack size exceeded” ,
      要确保递归调用有终止条件[如递归调用时使用 v-if 最终返回 false] 
  'Circular References Between Components'组件间循环引用: 两个组件互为对方的父、子节点 
    使用 Vue.component() 注册为全局组件时,框架会自动解决依赖的矛盾 
    使用'Webpack'或'Browserify'等模块化管理工具,requiring/importing时,会报错:
      'Failed to mount component: template or render function not defined.'
      决解办法: 在'beforeCreate'钩子中解决依赖问题 
      beforeCreate: function () {
        this.$options.components.aoo = require('./boo.vue').default
      }
'.vue'单文件组件 
  PS: 一个'.vue'文件就是一个组件,将'HTML''CSS''JS'组装起来,方便开发、复用和维护;
    组件的通信方式同样使用'props'和'event' 
    单文件组件的写法需要编译工具才能最终在浏览器端工作;
  Example: 
    <template>
      <div class="my-component">
        <h2>Hello from {{ msg }}</h2>
        <other-component></other-component>
      </div>
    </template>
    <script>
      // 遵循 ES6 模块格式
      import otherComponent from './other-component';
      // 导出组件定义
      export default {
        data: function () {
          return {
            msg: 'vue-loader'
          }
        },
        components: {
          'other-component': otherComponent
        }
      }
      
      // CommonJS 模块格式
      // var otherComponent = require('./other-component');
      // 导出组件定义
      // module.exports = {
      //   data: function () {
      //     return {
      //       msg: 'vue-loader'
      //     }
      //   },
      //   components: {
      //     'other-component': otherComponent
      //   }
      // }
    </script>
    <style scoped>
      // scoped 可选,保证组件内的CSS只对该组件起作用
      ...
    </style>
  lang="" 使用预处理器 
    在'.vue'文件中使用其他预处理器[需安装对应的loader] 
    当使用 lang="less" 即使用Less,需安装如下依赖
    npm i -g css-loader less less-loader --save-dev
    <template lang="jade">
      div.my-component
      h2 Hello from {{msg}}
    </template>
    <script lang="babel">
      // 利用 Babel 编译 ES2015
      export default {
        data () {
          return {
            msg: 'Hello from Babel!'
          }
        }
      }
    </script>
    <style lang="less">
      .my-component{
        background-color : bule;
        .child{
          background-color:green;
        }
      }
    </style>
  Q&A 
    如何仅在组件及其子组件中共享样式 
      添加'scoped'属性,避免污染其他组件的样式 
      将共享的样式单独放到一'.less'中,然后在样式部分导入 
Question&Suggestion: 
  如何操作Vue实例的组件选项,如控制组件  
    new Vue({
      // ..
      components: {
        aoo: appCpt,// 控制该组件 
      }
    });
  在父组件中访问子组件的状态 
    如在父组件中获取子组件的data、computed等选项中的数据,实时响应的获取
    解决方法一: 
      父组件中定义ref,通过$refs获取到子组件实例 
      问题: 父组件访问子组件的应急方案<详见官方文档> 
  父组件中定义子组件样式或调整子组件样式 
    决解方法一: 给子组件添加CSS类来控制,如 class="spec-num" 
      在父组件或子组件中定义该CSS类的样式 
自我总结: 
  在Vue实例中,所有能通过 this.xx 访问的值,都可在插值中使用 {{xx}}
--------------------------------------------------------------------------------
组件懒加载 
  PS: 也叫延迟加载,即在需要的时候进行加载,随用随载 
    仅首次加载,加载后会缓存,供后续使用 
    异步加载的组件将会比页面中其他元素滞后出现,页面会有瞬间闪跳影响 
  与webpack配合实现组件懒加载 
    在webpack配置文件中的'output'路径配置'chunkFilename'属性 
      output: {
        path: resolve(__dirname,'dist'),
        filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
        publicPath: options.dev ? '/assets/' : publicPath,
        // chunkFilename路径将会作为组件懒加载的路径,vue-cli的Webpack模版已默认配置  
        chunkFilename: 'chunk[id].js?[chunkhash]' 
      }
    配合webpack支持的异步加载方法 
      resolve => require([url],resolve)  // 支持性好
      () => import(url)   // webpack2推荐使用
        属于ES7,需配合babel的'syntax-dynamic-import'插件使用 [vue-cli的Webpack模版中已默认安装]
        // 安装插件 
        $ npm i -D babel-core babel-loader babel-plugin-syntax-dynamic-import babel-preset-es2015
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [['es2015',{modules: false}]],
            plugins: ['syntax-dynamic-import']
          }
        }]
      () => system.import(url)       // 已废除,不推荐使用
    具体实例中实现懒加载 
      路由中配置异步组件 
        export default new Router({
          routes: [
            {
              path: '/my'
              ,name: 'my'
              ,component:  resolve => require(['../page/my/my.vue'],resolve) // 懒加载
            },
          ]
        })
      实例中配置异步组件 
        components: {
          // 懒加载
          historyTab: resolve => {require(['../../component/historyTab/historyTab.vue'],resolve)},
          //historyTab: () => import('../../component/historyTab/historyTab.vue')
        },
      全局注册异步组件 
        Vue.component('mideaHeader',() => import(url)) 
---------------------------------------------------------------------以下待整理  
异步组件,加载完毕后执行某些操作,如何监控何时加载完毕 ? 


