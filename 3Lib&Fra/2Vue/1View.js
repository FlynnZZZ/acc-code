'View'视图: Vue实例管理的DOM节点  
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
--------------------------------------------------------------------------------
'Directives'指令,在视图中指定使用,用于'Model'和'View'的交互 
  PS:     
v-text="str"   插入纯文本  
v-html="str"   插入HTML  
v-for="(val,key,idx) in list"  循环渲染  
  Input: 
    val   any,集合'list'中的成员值 
    key   str/num,可选,集合'list'中成员的键名/下标 
    idx   num,可选,当遍历对象时表示对象的第几个元素 
      按 Object.keys() 的结果遍历对象,在不同JS引擎下结果可能不一致 
    list  arr/obj/num/str/函数返回值,迭代的集合 
      num   表示迭代num次,'item'表示每一次的数字 
  Feature: 
    <template>包裹渲染多元素 
      PS: 最终在DOM中不存在<template>标签,仅用于包裹元素  
      <template v-for="item in list">  
    'key'属性标识元素不复用 
      <div v-for="(item,key) in list" :key="key"> </div>  
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
          <li is="todo_item" v-for="(todo,idx) in todos" :txt="todo"
          @remove="todos.splice(idx,1)"></li>
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
    可用'of'替代'in'作为分隔符 
      <div v-for="item of list"></div>
v-show="bol"    条件显示 
  PS:'v-show'的元素会始终渲染并保持在DOM中[使用 display:none]
  v-show不支持<template>标签
  通常'v-if'有更高的切换消耗,'v-show'有更高的初始渲染消耗 
    若需频繁切换使用'v-show',若初始运行时使用'v-if'
  当条件变化时该指令触发过渡效果 
v-if="bol"      条件渲染 
  PS: 在切换时元素及其数据绑定/组件被销毁并重建 
    当条件变化时该指令触发过渡效果 
  <template v-if="bol"> 包裹控制渲染 
    <template v-if="ok">
      <h1>Title</h1>
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
    </template>
  同时绑定多个'v-if'只有第一个生效,后面的都被忽略 [Self]
    <div v-if='bol1' v-if='bol2'></div>
v-else-if="bol" 条件渲染 '2.1.0+' 
  PS: 须在'v-if'或'v-else-if'后使用 
v-else          条件渲染 
  PS: 须在'v-if'或'v-else-if'后使用 
v-model="str/arr" 双向绑定[表单]数据值 
  PS: 本质上是语法糖,负责监听用户的输入事件以更新数据,并对一些极端场景进行一些特殊处理 
  单个复选框'checkbox' 
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
  多个复选框'checkbox'到一数组,选中项的'value'对应数组成员   
    <section id="checkBoxs">
      <input type="checkbox" value="Jack" v-model="checkedNames">
      <input type="checkbox" value="John" v-model="checkedNames">
      <input type="checkbox" value="Mike" v-model="checkedNames">
      <div>Checked names: {{ checkedNames }}</div>
    </section>
    data: {
      checkedNames: []
    }
  单选按钮'radio',获取'value'值  
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
  单选列表<select>,获取到被选中项的'value'值  
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
  多选列表<select>,获取到选中项'value'组成的数组 
    <div id="slct">
      <select v-model="selected" multiple>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <div>Selected: {{ selected }}</div>
    </div>
  绑定文本域'textarea'  
  组件上使用 
  Feature: 
    当表单值为对象,获取到对应的对象 
      <select v-model="selected"> 
        // <!-- 内联对象字面量 --> 
        <option :value="{ num: 123 }">123</option> 
      </select> 
      // 当选中时 
      typeof vm.selected //  'object'
      vm.selected.num    //  123
    对需使用输入法[如中文、日文、韩文等]的语言,'v-model'不会在输入法组合文字过程中更新 
      如果你也想处理这个过程,请使用 input 事件 
v-bind:attr_name="val"  属性绑定,简写':attr_name' 
  Input: 
    attr_name   参数,绑定的属性名,大小写不敏感 
    val         any,属性绑定的值  
  ◆特殊的属性绑定 
  :class="str/arr/obj"   'class'样式[会和已存在的class进行合并] 
    obj  key:属性名即class样式,val: 布尔值/函数判断/简单表达式 
      key是否存在取决于val是否为真 
      可直接绑定数据属性里的对象 
        <div id="test" :class="classes"></div>
        data: {
          classes: { c1: true,c2: false }
        }
    arr  同时绑定多个class样式  
      Example: 
        <div :class="[activeClass,errorClass]">
        data: {
          activeClass: 'active',
          errorClass: 'text-danger'
        }
      也可在数组语法中使用对象语法  
        <div :class="[{ active: isActive },errorClass]"> 
  :style="arr/obj"       'style'内联样式  
    PS: Vue会自动添加相应样式声明的前缀 
    obj  key:样式声明,val:声明值  
      可用短横分隔命名'kebab-case'或驼峰式'camelCase' 
        <div :style="{'background-color':color1,fontSize:fontSize+'px'}"></div>
        data: {
          color1: 'red',
          fontSize: 30
        }
      声明值可为数组,常用于提供多个带前缀的值 '2.3.0+' 
        会渲染数组中最后一个被浏览器支持的值。
        <div :style="{ display: ['-webkit-box','-ms-flexbox','flex'] }"></div>
        如果浏览器支持不带浏览器前缀的 flexbox,那么渲染结果会是 display: flex 
    arr  同时应用多个样式对象  
v-bind="obj"  无参数绑定到对象,使用对象的'key'作为参数[属性]  
  PS: 该模式下'class'和'style'绑定不支持数组和对象 
  obj   包含"{attr:val}"键值对的对象 
  Example: 
    <div v-bind="{ aoo: 11,boo: 22 }">abc</div> 
    相当于: 
    <div v-bind:aoo="11" v-bind:boo="22">abc</div> 
v-on:evt_name="listener" 事件绑定,简写'@evt_name'  
  PS: 当ViewModel被销毁时,所有事件处理器都会自动被删除,无须自己清理 
  Input: 
    evt_name  事件名,不区分大小写 
    listener  可选,foo/expr,事件的回调 
      foo       函数,事件触发时执行回调 
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
      expr      单条语句,事件触发时执行语句 
      无回调,则相当于执行一空函数   
        <form @submit.prevent></form> // 只有修饰符 
v-on="obj"  对象表示法,同时绑定多个事件  '2.4.0+'  
  PS: 使用对象语法时,不支持任何修饰器 
  obj 为'{事件名:监听器}'键值对的对象 
  Example: 
  <button v-on="{ mousedown: doThis,mouseup: doThat }"></button>
'Modifiers'修饰符,让指令以特殊方式绑定,适用 'v-on'/'v-model'/'v-bind' 
  PS: 修饰符是以点号'.'指明的特殊后缀;指令可以串联;
  通用事件修饰符 
    .prevent 阻止默认行为,调用 event.preventDefault() 
      <form v-on:submit.prevent="onSubmit"></form>
      // <!-- 提交事件不再重载页面 -->
    .stop    阻止冒泡,调用 event.stopPropagation()
    .capture 使用事件捕获模式 
    .self    只当事件是从侦听器绑定的元素本身触发时才触发回调 
    .passive 以 { passive: true } 模式添加侦听器 '2.3.0+' 
      表示不调用 evt.preventDefault()  
    .once    只触发一次回调 '2.1.4+' 
      PS: 还能被用到自定义的组件事件上 
    .native  监听组件根元素的原生事件  
  键鼠事件修饰符: 键盘事件时监测键值,鼠标事件时监测鼠标按键  
    ◆键盘: 'keyCode'或Vue提供的别名 
      PS: Vue.config.keyCodes 全局对象,自定义按键修饰符别名 
      // <!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
      <input @keyup.13="submit">
      <input @keyup.enter="submit">
    .enter   Enter键,'.13'等价于'.enter'
      当为搜索框时<input type="search" >,在微信中 需使用 @keyup.13,@keyup.enter 无效 
    .tab     
    .delete  '删除'和'退格'键
    .esc     
    .space   
    .up      
    .down    
    .left   
    .right   
    ◆系统修饰键 
      和 keyup 事件一起用时,修饰键与常规按键不同 
        事件触发时修饰键必须处于按下状态,即只有在按住 ctrl 的情况下释放其它按键,
        才能触发 keyup.ctrl,而单单释放 ctrl 也不会触发事件,
        否则,请为 ctrl 换用 keyCode：keyup.17 
    .ctrl   '2.1.0+' 
    .alt    '2.1.0+' 
    .shift  '2.1.0+' 
    .meta   Mac上对应⌘;Windows上对应⊞  '2.1.0+' 
    .exact  控制由精确的系统修饰符组合触发的事件 '2.5.0+'  
    ◆'Mouse Event'修饰符  '2.2.0+'  
    .left   
    .right  
    .middle 
    同时监听多个 
      // <!-- Alt + C -->
      <input @keyup.alt.67="clear">
      // <!-- Ctrl + Click -->
      <div @click.ctrl="doSomething">Do something</div>
    自动匹配按键修饰符  '2.5.0+' 
      自定义 .xxx ,在响应函数中会进行自动判断 若 evt.key === 'xxx' 才执行该函数  
        <input @keyup.page-down="onPageDown"> 
        onPageDown: function(evt){
          // 该函数仅当 evt.key === 'PageDown' 才会执行 
        }
      有一些按键[.esc 及所有方向键]在 IE9 中有不同的 key 值,若想支持 IE9,内置别名应该是首选。
  ◆'v-model'修饰符 
  .lazy   从input事件转变为在change事件中同步  
    // <!-- 在 "change" 而不是 "input" 事件中更新 -->
    <input v-model.lazy="msg" >
  .number 自动将用户的输入值转为'Number'类型[若转换结果为'NaN'则返回原值] 
    <input v-model.number="age" type="number">
    这通常很有用,因为在 type="number" 时 HTML 中输入的值也总是会返回字符串类型
  .trim   自动过滤用户输入的首尾空格 
    <input v-model.trim="msg">
  ◆'v-bind'修饰符 
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
--------------------------------------------------------------------------------
'Tag'&'Attr'内置标签及属性 
◆标签 
<template></template>      HTML5标签 
<component is="cptname"></component> 放置组件  
<keep-alive ></keep-alive>           保留组件状态、避免重新渲染 
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
<slot name="slotName"></slot>        插槽  
<transition ></transition>              过渡 
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
<transition-group></transition-group>   过渡 
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
--------------------------------------------------------------------------------
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
:duration="num/{enter:num1,leave:num2}" 定义过渡持续时间[单位ms] '2.2.0+' 
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
--------------------------------------------------------------------------------




