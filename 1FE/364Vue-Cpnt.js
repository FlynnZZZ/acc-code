Vue.component()  全局组件  
  PS: 需插入的Vue实例前定义,才会渲染出该组件 
    否则要触发该实例的任意一组件渲染,如通过'v-if' 
  Vue.component(  // 全局组件定义   
    'cpnt-name'   // 组件名称,推荐使用小写,且包含一个短杠  
    ,{ // 配置对象,类似于Vue实例的配置项   
      data: function(){  // 组件数据,必须为一函数 
        PS: 函数返回值可避免多次使用一组件时数据的共享  
        return { }; 
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
      ,name: 'aoo'       // 命名组件,用于递归调用 
      ,... 
    }
  )  
  Vue.component("cpnt-name",function(rs,rj){  // 异步全局组件 
    rs({}) // 可在适当的时候进行 
  });
  组件元素可能的限制及解决 
    <ul>,<ol>,<table>,<select>等子标签有类型限制 
    在其内部使用组件时可能会导致问题 
    使用'is'属性解决: 如 <table> <tr is="my-row"></tr> </table>
    Example: 
      <table> <my-row>...</my-row> </table>
      自定义组件 <my-row> 被认为是无效的内容,在渲染的时会导致错误 
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
'.vue'           单文件组件 
  PS: 一个'.vue'文件就是一个组件,将'HTML''CSS''JS'组装起来,方便开发、复用和维护; 
    组件的通信方式同样使用'props'和'event' 
    单文件组件的写法需要编译工具才能最终在浏览器端工作; 
  Example: 
    <template>
    <section class="my-component">
      <h2>Hello from {{ msg }}</h2>
      <other-component></other-component>
    </section>
    </template>
    <script>
      // 遵循 ES6 模块格式 加载组件
      import otherComponent from './other-component';
      // 导出组件定义
      export default {
        data: function () {
          return {
            msg: 'vue-loader'
          }
        },
        components: {
          'other-component1': otherComponent 
          ,'other-component': () => import('./other-component')  // 异步组件,按需加载 
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
    <style >
      // 可存在多个style,会同时起作用 
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
components: {    // vue实例中注册引入 
  PS: 仅能在该实例/组件的作用域中使用 
  'cpnt-name': cpt 
    cpt 可为:   
    import xx from "./cpt.js";  // 模块化引入的组件
    Vue.component(cpt,{})       // 定义的全局组件 
    {                           // 通过对象来配置的组件 
      template: '<div>A custom component! {{aoo}}</div>',
    }
    () => import('xxx.vue')     // 配合Webpack使用的异步组件 
  // ..
}, 
<cpnt-xxx></cpnt-xxx>组件标签: 在父父组件中使用时
  PS: 用于确定引入的位置及通信的定义  
    组件标签推荐使用双标记,否则可能存在bug  
  组件上用class时,将被添加到根元素上面,元素上已经存在的类不会被覆盖 
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
        <div :is="changeFlag"> </div>
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
父组件内直接定义子组件根节点的属性 
  PS: 可直接传入组件,而不需要定义相应的'prop' 
    一般的,传递给组件的值会覆盖组件本身设定的值,
    但'class'和'style'这两个特性的值都会做合并'merge'操作 
  Example: 
    <cpt-aoo style="color:red;"></cpt-aoo> // 在子组件中会直接生效 
'Props'&'Event'组件通信 
  PS: 组件实例的作用域是孤立的,不能在子组件的模板内直接引用父组件的数据 
  'props down'父组件向子组件通信 
    父组件中,子组件标签上设置属性,子组件内声明使用  
      当父组件赋给属性的值,子组件内可获取到 
      当动态绑定属性时,子组件内也会实时响应 
    动态绑定: 使用'v-bind' 
      单个属性动态绑定:  :attr1="dataVal1"
      同时动态绑定多个属性: v-bind="dataVal2"
        Example: 
          data: function(){     // 父组件中的数据
            return {
              dataVal2: {
                key1: 'abc',
                key2: 123
              }
            };
          }
          <cpt-child v-bind="dataVal2"></cpt-child>
          将等价于：
          <cpt-child v-bind:key1="dataVal2.key1" v-bind:key2="dataVal2.key2" ></cpt-child>
    单向数据流 
      PS: 而在子组件内部改变prop,Vue会在控制台给出警告; 
        在js中对象和数组是引用类型,指向同一个内存空间,
        若prop是一对象或数组,在子组件内部改变它会影响父组件的状态;
      子组件无修改&同步数据: 直接使用'props'中的数据 
      子组件无修改&异步数据: 定义'computed'属性,处理prop值并返回 
        不可进行覆盖操作,需定义set ?  
        props: ['parentData'],
        computed: {
          childData: function () {
            return this.parentData 
          }
        }
      子组件有修改&同步数据: 定义'data'属性,用prop值初始化 
        PS: 修改'data'属性时[而非覆盖],仍会改变父组件内用于传递的数据,此做法仅仅是为了避免警告 ?  
        此情况下,子组件数据对父组件数据的响应情况   
          当父组件数据变化时[覆盖变化],后续子组件不响应['watch'prop值会响应]  
          ,当父组件数据修改时,后续子组件仍响应[引用传递] 
        props: ['parentData'],
        data: function () {
          return { 
            aoo: this.parentData 
          }
        }
      子组件有修改&异步数据: 定义'data'属性,且'watch'异步数据到'data'中 
        父组件中修改[而非覆盖]异步数据时,'watch'不会触发
          1 覆盖代替修改 
          2 深度'watch'或'watch'具体修改的项 
        方法二: 
    动态传递一对象,子组件中直接使用,父组件修改/覆盖对象,子组件中实时响应  
  'events up'子组件向父组件通信 
    父组件中,子组件标签上绑定自定义事件并指定回调函数, 
    子组件内通过'$emit'触发该事件并传递数据,
    父组件中的回调函数会执行并获取到该数据  
    childVm.$emit('event-name',data) 触发事件并传递数据'data'
  通过'ref'获取子组件数据[见'子组件索引'] 
  :<props>.sync,父子组件双向通信,共同维持一份数据 
    :<propname>.sync="<parentVal>"  父组件内向子组件传递值'parentVal' 
    <childVm>.$emit('update:<propname>',<finaData>) 子组件通过事件触发改变'parentVal'
    父组件及子组件内'parentVal'的值都改变成'finaData' 
    从而避免了对属性赋值导致的错误警告 
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
      bus.$emit('custom-event',data);          // A组件中触发事件
      bus.$on('custom-event',function (data) { // B组件中监听事件
        // ...
      })
    复杂情况下,使用专门的状态管理模式Vuex 
  Accu: 
    组件动态绑定引用类型进行双向通信 [SlSt] 
      当传递的属性值为一引用类型时[如对象]
      ,由于JS的引用类型值特性--按引用传递  
      ,子组件中修改[而非覆盖]'props'时会改变父组件中的值 
      ,同样的在父组件中修改传入的值也会改变子组件中的'props'
      ,从而达到'双向通信',维持共同的一份数据 
'Slot'父子组件模版通信 
  PS: 父组件中'slot'的值和子组件中'name'的值进行匹配,相等则替换; 
    可以有一个匿名slot,为默认slot,作为找不到匹配的内容片段的备用插槽
    若无默认的<slot>,找不到匹配的内容片段将被抛弃 
  内容分发,父组件定制子组件DOM内容 
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
    父组件中,定义HTML标签放置在子组件标签的内部: <tag slot="xxx"></tag> 
      <div id="parent">
        <cpt-child>
          <p>这是一些初始内容</p>
          <p>这是更多的初始内容</p>
        </cpt-child>
      </div>
      可用'slot'属性具名 
    子组件中,通过<slot>标签指定替换的位置及默认内容: <slot name="xxx"> 
      <template id='child'>
        <div>
          <slot> 当没有要分发的内容时会显示 </slot>
          // <slot>内的任何内容都被视为备用内容,没有要替换的内容时会显示备用内容 
          // 子组件模板需至少有一个<slot>插口,否则父组件的内容将会被丢弃  
        </div>
      </template>
      可用'name'属性具名 
  编译作用域、组件作用域 
    父组件模板的内容在父组件作用域内编译;
    子组件模板的内容在子组件作用域内编译; 
    分发内容是在父作用域内编译 
  作用域插槽,子组件提供父组件中分发内容的数据  ['2.1.0+'] 
    PS: 作用域插槽也可以是具名的['slot'属性] 
    子组件,key、val的形式提供数据: <slot ‹key›="val"> 
    父组件,scope指定数据对象: <template scope="‹objName›"><template> 
      在父组件的模版中,<objName>.<key> 表示 val 的值 
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
  slot-scope=""  作用域插槽  
组件间引用 
  ref="aoo"&vm.$refs.aoo,子组件索引 
    PS: 使用'ref'属性为子组件指定索引ID,便于在父组件中直接访问子组件; 
    Feature: 
      $refs 只在组件渲染完成后才填充 
        需在父组件'mounted'后才能获取到数据
        所以避免在父组件的模板或计算属性中使用
      $refs 是非响应式的,避免在computed中使用  
        仅仅作为一个直接访问子组件的应急方案 
      当 ref 和 v-for 一起使用时,ref 是一个数组或对象,包含相应的子组件  
    Example: 
      <div id="parent">
        <cpt-aoo ref="aaa"></cpt-aoo>
      </div>
      var parent = new Vue({ el: '#parent' })
      var child = parent.$refs.aaa // 访问子组件
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
异步组件,加载完毕后执行某些操作,如何监控何时加载完毕 ? 
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
---------------------------------------------------------------------以下待整理  


   provide/inject  依赖注入 


