'vue-router'前端路由 
  PS: 'vue-router2.x'只适用于'Vue2.x'版本 
  原理: 将组件'components'映射到路由'routes',然后指定组件的渲染位置 
  术语&概念: 
    路由记录: 路由映射表'routes'数组中成员的副本[包括children数组的成员]
引入安装路由 
  <script>引入 
    在Vue后面加载'vue-router',默认自动安装的
    <script src="/path/to/vue.js"></script>
    <script src="/path/to/vue-router.js"></script>
  npm下载安装  
    $ npm i -S vue-router    // npm下载并写入生产依赖 
    // main.js 中引入、安装    
    import VueRouter from "vue-router"; // 引入 vue-router 
    Vue.use(VueRouter); // 安装路由,<script>引入的默认安装了 
配置使用路由 
  // 组件,可从其他文件'import'进来 
  // const Foo = { template: '<div>foo</div>' }  // 组件配置对象
  // const Bar = { template: '<div>bar</div>' }  
  const routerMap = new VueRouter({  // 配置路由Map  
    // .. 
  }) 
  const app = new Vue({ // 在Vue根实例中注册,从而让整个应用都有路由功能   
    el : '#app'  // 挂载点方式1 
    ,router : routerMap    // 注册 
  }) // .$mount('#app') // 挂载点方式2 
router = new VueRouter({  // 路由实例 
  routes: [ // 路由映射表 
    {   // 一个路由对象,也叫一个路由记录 
      path: str  // 定义地址URL  
        PS: 当同一个路径匹配多个路由时,则先定义的优先级高 
        '/path/:param'  动态路由匹配,配任意的'/path/xx' 
          PS: '/xx'必须存在否则匹配不到 
          动态参数可从 vm.$route.params 中获取 
          响应路由参数的变化 
            当使用路由参数时,在不同参数的动态路由间跳转,组件声明周期钩子不会被调用 
              如从'/user/foo'导航到'user/bar',原来的组件实例会被复用 
              比起销毁再创建,复用则更加高效
            解决复用组件时,响应路由参数的变化
            方式一: 'watch'观察$route对象 
              const User = {
                template: '...',
                watch: {
                  '$route' (to, from) {
                    // 对路由变化作出响应...
                  }
                }
              }
            方式二: beforeRouteUpdate 
              const User = {
                template: '...',
                beforeRouteUpdate (to, from, next) {
                  // react to route changes...
                  // don't forget to call next()
                }
              }
          支持类似正则匹配的高级模式  [moIn 文档] 
            如：可选的动态路径参数、匹配零个或多个、一个或多个,甚至是自定义正则匹配 
            *  任意字符 
              path: '/aoo/*'  // 匹配'/aoo'下的任意路径 
            ?  存在最多一个 
              path: '/aoo/:foo?'  // 可匹配'/aoo'、'/aoo/xxx' 
              path: '/aoo/(foo/)?bar' // 可匹配'/aoo/bar'、'/aoo/foo/bar' 
            \d 数字 
              path: '/aoo/:id(\\d+)'  // ':id'需为纯数字时才会匹配 
      ,name: str        // 可选,命名路由,通过名称来标识路由 
        <router-link to=""> 或 router.push(location) 中指定 
        Example: 
        导航到'/user/123' 
        <router-link :to="{name: 'user',params: {userId: 123}}">User</router-link>
        router.push({name: 'user',params: {userId: 123}})
      // 组件在上一级组件中通过<router-view>指定 
      ,component: cptA  // 可选,展示单组件  
        component: () => import('')  // 懒加载 
      ,components: {    // 可选,具名组件,展示多组件,与component互斥  
        default: cptA
        ,<viewname>: cptB // 命名视图,通过名称来标识视图组件 
          <router-view name="viewname">'name'属性中指定  
        ...
      }
      ,children: [      // 可选,嵌套路由,子路由   
        PS: 被路由加载的组件同样可包含自己的<router-view> 
        {  // 子路由记录 
          path: 'aa',     // 相对于当前路由记录的路径 
            PS: 以'/'开头的路径将从根路径开始  
          component: cptA, // 子路由,在上级路由组件中通过<router-view>指定    
        }
        ,{ path: 'bb', component: cptB }
        // 空字符串,当未匹配到子路由时,使用的子路由 
        ,{ path: '', component: cptX }
        ...
      ]   
      ,redirect: str/obj/foo // 可选,重定向,当前路由最终定位到的路由 
        PS: 如当访问'/a'时,URL将会被替换成'/b',且匹配路由也为'/b' 
        str  具体的路径 
          redirect: '/b'
        obj  通过对象指定一具名的路由 
          redirect: { name: 'foo' } 
        foo  动态返回重定向目标 
          redirect: function(to){  
            // to  目标路由 
            return   ; // 重定向的字符串路径/路径对象
          },
      ,alias: str/strArr     // 可选,别名 
        即该路由视图增加一个对应的路径‹一份视图对应两个路径› 
        '/a'的别名是'/b',即访问'/b'时,URL保持为'/b',但路由匹配为'/a',就像访问'/a' 
      ,props: bol/obj/foo    // 可选,向视图组件传递信息 
        bol  如果props被设置为true,route.params 将会被设置为组件属性 
          const User = {
            props: ['id'],
            template: '<div>User {{ id }}</div>'
          }
          const router = new VueRouter({
            routes: [
              { path: '/user/:id', component: User, props: true }
              
              // 对于包含命名视图的路由,你必须分别为每个命名视图添加props选项：
              {
                path: '/user/:id',
                components: { 
                  default: User, 
                  sidebar: Sidebar 
                },
                props: { 
                  default: true, 
                  sidebar: false 
                }
              }
            ]
          })
        obj  按原样设置为组件属性,当props是静态的时候有用 
          const router = new VueRouter({
            routes: [
              { 
                path: '/promotion/from-newsletter', 
                component: Promotion, 
                props: { newsletterPopup: false } 
              }
            ]
          })
        foo  通过函数返回props的值,可将将静态值与基于路由的值结合 
          const router = new VueRouter({
            routes: [
              { 
                path: '/search', 
                component: SearchUser, 
                props: function(route){
                  return { query: route.query.q };
                }
              }
            ]
          })
          Url: /search?key1=val1 会将 {key1: "val1"} 作为属性传递给SearchUser组件 
      ,meta: any  // 可选,路由元信息  
        {
          requiresAuth: true 
        }
        一个路由匹配到的所有路由记录会暴露为 $route.matched 数组,
        通过遍历 $route.matched 来检查路由记录中的 meta 字段 
        下面例子展示在全局导航钩子中检查 meta 字段：
        router.beforeEach((to, from, next) => {
          if (to.matched.some(record => record.meta.requiresAuth)) {
            // this route requires auth, check if logged in
            // if not, redirect to login page.
            if (!auth.loggedIn()) {
              next({
                path: '/login',
                query: { redirect: to.fullPath }
              })
            } 
            else {
              next()
            }
          } 
          else {
            next() // 确保一定要调用 next()
          }
        })      
      ,caseSensitive: bol;       // 可选,匹配规则是否大小写敏感,默认:false '2.6.0+'
      ,pathToRegexpOptions: obj; // 可选,编译正则的选项 '2.6.0+' 
      ,beforeEnter: (to,from,next) => {  // 可选,路由守卫  
        PS: 通过调用 next() 可控制路由是否导航 
      } 
    }
    ... 
  ]
  ,base: str  // 应用的基路径,默认:"/" 
    若整个单页应用服务在'/app/'下,则应设为"/app/" 
  ,linkActiveClass: str // 全局配置<router-link>的默认激活class类名 
    默认值:"router-link-active"
  ,linkExactActiveClass: str // 全局配置<router-link>精确激活的默认的class '2.5.0+'
    默认:"router-link-exact-active"
  ,mode: kw // 模式 
    'hash'      默认值,使用URL的hash来模拟一个完整的URL 
      利用当hash改变时,页面不会重新加载的特性  
      支持所有浏览器,包括不支持 HTML5 History Api 的浏览器。
    'history'   利用'history.pushState'API来完成URL跳转而无须重新加载页面 
      依赖 HTML5 History API 和服务器配置 
      在服务端增加一个覆盖所有情况的候选资源: 
      如果 URL 匹配不到任何静态资源,则应该返回同一个 index.html 页面,
      这个页面就是你 app 依赖的页面
    "abstract"  支持所有JS运行环境,如NodeJS服务器端 
      若发现无浏览器的 API,路由会自动强制进入这个模式 
  ,fallback: bol // 当浏览器不支持history.pushState控制路由是否回退到hash模式 '2.6.0+'
    默认:true
    IE9中,设置为 false 会使得每个 router-link 导航都触发整页刷新 
    它可用于工作在 IE9 下的服务端渲染应用,因为一个 hash 模式的 URL 并不支持服务端渲染 
  ,scrollBehavior: function(to,from,pos){ // 滚动行为及位置 
    PS: 控制导航路由后的滚动位置,仅在'history'模式下可用 
    to   导航到路由信息对象 
    from 离开的路由信息对象 
    pos  之前路由滚动的位置,不一定存在 
      当且仅当'popstate'导航[通过浏览器的 前进/后退 按钮触发]时才可用 
      格式: { x: num, y: num } 
    return { x: num, y: num } | { selector: str } | {};  // 期望滚动的位置对象 
      若返回一个假的布尔值,或者是一个空对象,则不会发生滚动 
      { x: num, y: num }  到具体位置 
        scrollBehavior (to, from, pos) {
          if (pos) {
            return pos
          } 
          else {
            return { x: 0, y: 0 }
          }
        }
      { selector: str,offset?: { x: num, y: num } }   模拟滚动到锚点的行为 
        offset   '2.6.0+'
        scrollBehavior (to, from, pos) {
          if (to.hash) {
            return {
              selector: to.hash
            }
          }
        }
  }
  ,parseQuery: function(){ // 提供自定义查询字符串的解析函数 '2.4.0+' 
    PS: 用于覆盖默认行为 
  }
  ,stringifyQuery: function(){ // 提供自定义查询字符串的反解析函数 '2.4.0+'
    PS: 用于覆盖默认行为 
  }
})  
◆标签 
<router-view> // 渲染路径匹配到的视图组件 
  PS: 在挂载点范围内都可以 [?] 
  name="str"  // 渲染对应的路由配置中components下的相应组件,默认:"default"  
  配合<transition></transition>进行视图过渡效果 
  配合<keep-alive></keep-alive>进行缓存 
  如果两个结合一起用,要确保在内层使用<keep-alive> 
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
<router-link> // 路由导航: 在页面中指定跳转的链接 
  PS: <router-link>默认会被渲染成一个<a>标签 
  to="str/obj"  // 表示目标路由的链接 
    PS: 当被点击后,内部会立刻把 to 的值传到 router.push()
    str   一个字符串
      "aoo"    // 相当于'./aoo' 
      "/aoo"   // 相对于根目录  
      <router-link to="home">Home</router-link>
      <router-link :to="'home'">Home</router-link>
    obj   描述目标位置的对象‹需在动态绑定状态下使用› 
      {
        path: <str>    // 可选,指定跳转的路径 
          <router-link :to="{ path: 'home' }">Home</router-link>
        ,name: <str>   // 可选,指定命名的路由 
          <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
        ,params: <obj> // 可选, 
        ,query: <obj>  // 可选,带查询参数 
          // <!-- 带查询参数,下面的结果为 /register?plan=private -->
          <router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>
      }
  tag="str"   //指定<router-link>渲染成的标签,默认:'a' 
    其他的如如'div'、'li'等 
  replace="bol"  // 导航后是否留下history记录,默认:false  
    设置replace后,当点击时,会调用 router.replace() 而不是 router.push(),
    导航后不会留下 history 记录 
    <router-link :to="{ path: '/abc'}" replace></router-link>
  append="bol"   // 是否在当前跳转前加上该页路径,默认:false  
    从'/a'导航到一个相对路径'b',若未配置append,则路径为'/b',若配了,则为'/a/b' 
  exact="bol"    // 激活类和路径是否使用精确匹配 
    默认:false,激活使用全包含匹配 
    当为true时,若路径为'/',所有的激活类将被匹配到 
  active-class="str"        // 路径匹配时使用的CSS类名 
    默认: "router-link-active" 
      对应的路由匹配成功,"router-link-active"class将自动添加  
    默认值可通过路由的构造选项 linkActiveClass 来全局配置 
  exact-active-class="str"  // 路径精确匹配时使用的CSS类名 ['2.5.0+'] 
    默认值: "router-link-exact-active"
    默认值可通过路由构造函数选项 linkExactActiveClass 进行全局配置 
  event="str/strArr"  // 声明可用来触发导航的事件,默认:'click' '2.1.0+'
★配合使用的组件 
<transition></transition> 实现过渡动画效果 
<keep-alive></keep-alive> 缓存,加快路由切换速度 
◆API 
vm.$router/new VueRouter() // 路由实例  
  .app   obj,挂载路由的Vue根实例 
  .mode  str,路由使用的模式 
  .currentRoute  Route,当前路由对应的路由信息对象 
  .getMatchedComponents(location?)    // 返回目标位置或当前路由匹配的组件数组 
    是数组的定义/构造类,不是实例,
    通常在服务端渲染的数据预加载时时候。
  .resolve(location,current?,append?) // 解析目标位置,返回对象形式的信息  '2.1.0+'
    PS: 解析目标位置[格式同<router-link>的'to'] 
    current 当前默认的路由 
    append  允许在 current 路由上附加路径,如同 router-link 
    返回包含如下属性的对象： {
      location: Location;
      route: Route;
      href: string;
    }
  .addRoutes(routes)  // 动态添加更多的路由规则 '2.2.0+' 
    参数必须是一个符合 routes 选项要求的数组。
  .onReady(callback,errorCallback?)  //  '2.2.0+'
    此方法通常用于等待异步的导航钩子完成,比如在进行服务端渲染的时候。
    该方法把一个回调排队,在路由完成初始导航时调用,
    这意味着它可以解析所有的异步进入钩子和路由初始化相关联的异步组件。
    这可以有效确保服务端渲染时服务端和客户端输出的一致。
    第二个参数 errorCallback 只在 2.4+ 支持。
    它会在初始化路由解析运行出错 (比如解析一个异步组件失败) 时被调用。
  .onError(callback) // 路由导航过程中出错时被调用 '2.4.0+'
    被调用的错误必须是下列情形中的一种：
    错误在一个路由守卫函数中被同步抛出；
    错误在一个路由守卫函数中通过调用 next(err) 的方式异步捕获并处理；
    渲染一个路由的过程中,需要尝试解析一个异步组件时发生错误。
  ★编程式的导航: 对应<router-link>的导航方式,通过JS代码来实现 
    PS: vue-router的导航方法'push''replace''go'效仿 window.history API 
      但其在各类路由模式 history、 hash 和 abstract 下表现一致
      window.history.pushState、 
      window.history.replaceState 
      window.history.go
  .push(location,onComplete?,onAbort?)    跳转,向history栈添加新记录 
    PS: 浏览器后退按钮,则回到之前的URL 
      相当于<router-link :to="">,当点击<router-link>时,这个方法会在内部调用 
    location    str/obj,路径 
      str,跳转字符串路径 
      obj,描述地址的对象 
        {
          path: ''
          ,query: {
            k1: val1
            ,...
          }
          ,..
        }
        同时使用'path'和'params','params'不生效 
          同样的规则也适用于 <router-link> 组件的 to 属性 
          // 这里的 params 不生效
          router.push({ path: '/user', params: { userId: 123 }}) 
          方法一: 提供路由的'name'来代替使用'path' 
            router.push({ name: 'user', params: { userId:123 }}) 
          方法二: 提供完整的带有参数的'path'  
            router.push({ path: `/user/${userId}` }) // -> /user/123
    onComplete = function(){ // 可选,导航成功完成触发 ' 2.2.0+' 
      PS: 所有的异步钩子被解析之后触发 
    }
    onAbort = function(){    // 可选,导航终止时触发 ' 2.2.0+' 
      PS: 导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由触发  
    }
  .replace(location,onComplete?,onAbort?) 跳转,删除当前页记录,向history栈添加新记录 
    PS: 相当于 <router-link :to="" replace> 
  .go(<num>)   在history记录中向前多少步 
    PS: 类似 window.history.go(num) 
    num  整数,可为负数  
    当history记录不够用时,则不会操作 
      routerMap.go(-100) 
      routerMap.go(100)  
    Example:
      routerMap.go(1)    // 在浏览器记录中前进一步,等同于 history.forward()
      routerMap.go(-1)   // 后退一步记录,等同于 history.back()
      routerMap.go(3)    // 前进 3 步记录
  .back()      后退 
  .forward()   动态的导航到一个新url 
  ★全局守卫/钩子 
  .beforeEach(function(to,from,next){  // 全局导航前置守卫 
    PS: 路由跳转时,调用全局前置守卫,在所有守卫 resolve 完前,路由导航一直处于等待中 
    to     obj,即将要进入的目标 
    from   obj,当前导航正要离开的路由 
    next   foo,需调用该方法来'resolve'该钩子,执行效果依赖'next'方法的调用参数 
      确保要调用'next'方法,否则钩子就不会被'resolved' 
      next()  进行管道中的下一个钩子
        如果全部钩子执行完了,则导航的状态就是'confirmed'确认的 
      next(false)  中断当前的导航
        如果浏览器的URL改变了[可能是用户手动或者浏览器后退按钮],
        那么URL地址会重置到'from'路由对应的地址 
      next('/') / next({ path: '/' }) 跳转到一个不同的地址 
        当前的导航被中断,然后进行一个新的导航 
      next(error)  '2.4.0+' 
        若参数为一 Error 实例,则导航会被终止
        且该错误会被传递给 router.onError() 注册过的回调 
    参数或查询的改变并不会触发导航守卫,需使用'beforeRouteUpdate'或watch $route 
  }) 
  .beforeResolve(function(to,from,next){  // 全局导航解析守卫 '2.5.0+' 
    PS: 导航被确认前,所有组件内守卫和异步路由组件被解析后调用 
      此时异步组件已经加载完成  
  })
  .afterEach(function(to,from){  // 全局后置钩子 
    // 不会接受 next 函数也不会改变导航本身 
  }) 
vm.$route                  // 路由记录 
  PS: 不可变的'immutable',每次成功的导航后都会产生一个新的对象 
  .name      str,当前路由的名称,如果有的话    
  .fullPath  str,完成解析后的URL,包含查询参数和hash的完整路径 
  .path      str,对应当前路由的路径,总是解析为绝对路径,如 "/foo/bar" 
  .hash      str,当前路由的hash值[包括"#"],若无hash值,则为空字符串 
  .params   obj,动态路由匹配的参数信息对象,如果无路由参数,则为空对象  
    包含了'动态片段'和'全匹配片段', 
    在HTML中可直接使用 {{$route.params.xx}} 来取匹配到的地址参数 
    在一个路由中设置多段路径参数 
      模式              匹配路径         $route.params
      '/a/:aoo'         '/a/bar'        { aoo: 'bar' }
      '/a/:aoo/b/:boo'  '/a/bar/b/123'  { aoo: 'bar', boo: 123 }
  .query    obj,查询参数信息对象,若无查询参数,则为空对象 
  .matched  arr,包含当前路由记录及其所有上级嵌套路径的路由记录 
    PS: 路由记录就是 routes 配置数组中的对象副本,还有在 children 数组 
    Member:路由记录对象 ===  {
      parent: {            // 当前路由记录的上级路由记录,格式同当前路由记录  
        parent: {}||undefined 
        ,path: ''
        ,...
      }          
      ,path: "/my/account"  // 路径
      ,regex: /^\/my\/account(?:\/(?=$))?$/i // 当前路径的正则表示 
      ,name: undefined     // 路由名称 
      ,components: <obj>   // 组件
      ,meta: {}            // 路由元信息        
      ,beforeEnter: undefined
      ,instances: <obj>
      ,matchAs: undefined
      ,props: {}
      ,redirect: undefined
    }
  .meta     obj,
★路由组件新增配置: 在路由配置中引入的组件才有 
,beforeRouteEnter: function(to,from,next){ // 路由被确认前调用  
  该回调中不能访问 this,因为回调在导航确认前被调用 
  可通过传一个回调给 next来访问组件实例 
    在导航被确认的时候执行回调,并且把组件实例作为回调方法的参数。
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
      })
    }
} 
,beforeRouteLeave: function (to,from,next) {  // 离开路由时调用 
  PS: 通常用于禁止用户在还未保存修改前突然离开  
  可访问组件实例 `this`
}
// 当前路由改变且该组件被复用时调用 '2.2+'  
,beforeRouteUpdate: function (to,from,next) { 
  PS: 可以访问组件实例`this`
  适用场景: 
    动态参数路径 
      如/foo/1 跳转到 /foo/2 时 
    查询字符串变化 
      如 /prod?id=1 跳转到 /prod?id=2 时 
}
◆路由懒加载 
  PS: 把不同路由对应的组件分割成不同的代码块,当路由被访问的时候才加载对应组件 
    结合Vue的'异步组件'和Webpack的'code splitting feature'实现路由组件的懒加载 
  定义一个能够被webpack自动代码分割的异步组件
    一: 将异步组件定义为返回一个 Promise 的工厂函数 
      const aoo = () => Promise.resolve({ /*  组件定义对象 */ }) 
    二: 在webpack2中,使用动态import语法来定义代码分块点'split point' 
      import('./aoo.vue') // returns a Promise 
    三: 在路由配置中像往常一样使用 
      在vue-cli的Webpack模版中已满足一、二  
      const aoo = () => import('./aoo.vue') 
    const router = new VueRouter({
      routes: [
        { 
          path: '/foo'
          ,component: aoo 
            或 ,component: () => import('./aoo.vue')  
        }
      ]
    })
  把组件按组分块 
    有时候想把某个路由下的所有组件都打包在同个异步块(chunk)中。
    需要使用命名 chunk,一个特殊的注释语法来提供'chunk name' ['webpack2.4+'] 
    const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
    const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
    const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
    webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中 
  异步组件 ['vue-router2.4.0+'] 
    const AsyncComp = () => ({  
      component: import('./MyComp.vue') // 需加载的组件,应是一 Promise 
      ,loading: LoadingComp // loading 时应当渲染的组件
      ,error: ErrorComp // 出错时渲染的组件
      ,delay: 200 // 渲染 loading 组件前的等待时间,默认200ms 
      ,timeout: 3000 // 最长等待时间 
        // 超出此时间则渲染 error 组件。默认：Infinity
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
--------------------------------------------------------------------------------
'Vuex'状态管理 
引入安装 
  <script>引入 
    在Vue之后引入vuex会进行自动安装 ‹不必使用 Vue.use()› 
    <script src="/path/to/vue.js"></script> 
    <script src="/path/to/vuex.js"></script> 
  npm安装 
    $ npm i -S vuex     // 下载并写入配置    
    // main.js 中引入、安装
    import Vuex from 'vuex'   // 引入vuex 
    Vue.use(Vuex)             // 安装    
使用 
  let store = new Vuex.Store({ // 实例化数据中心store 
  }) 
  new Vue({  // 顶层组件实例 
    el: ''
    ,store: store // 把store实例注入所有的子组件,使用 vm.$store 获取    
  });
store = new Vuex.Store({ // 实例化数据中心'store'  
  state: {  // 状态,用于储存数据  
    stateData1: val1 
    // .. 
  }
  ,mutations: { // 函数集,一般用于直接操作'state'中的数据 
    foo1: function(state,data){  // 不可执行异步操作 
      state  储存数据的state对象 
        vue-cli 中,不可使用 {xxx} 将对象解构  
      data   可选,.commit()传入的数据 
    }
    ,foo2: function(state,data){   
    }
    ...
  }
  ,getters: { // 相当于 store 的计算属性 
    // PS: 相当于'computed',对'state'的处理返回
    getData1: function(state,getters){
      // state   储存数据的state对象 
      // getters 当前getters对象 
      return state.xx;
    }
    // 通过让getter返回一函数,来实现getter传参 
    ,getData2: function({ stateData1, stateData2 }, getters){
      // 传参调用: store.getters.getData2(2)  
      return function(id){
        return state.todos.find(todo => todo.id === id)
      };
    }
    // .. 
  }
  ,actions: {   // 函数集,执行'mutations'中的方法  
    goo: function(context,data){ // 不能直接更改'state',常和后端API交互[异步操作]
      context  实例'store'对象 
        可执行'mutations'中的函数,context.commit('foo',data1) 
        也可通过 context.state 和 context.getters 来获取'state'和'getters' 
      data     可选,.dispatch()传入的数据 
      context.commit(foo,{}) 
      
    }
    ,goo1: function({commit},data){ //  使用参数解构来简化书写  
      commit(foo,{})
    }
    ...
  }
  ,modules: { // 分块管理,见'模块化管理' 
  }
  ,strict: bol // 严格模式,默认:false 
    在严格模式下,无论何时发生了状态变更且不是由 mutation 函数引起的,将会抛出错误。
    这能保证所有的状态变更都能被调试工具跟踪到。
    不要在发布环境下启用严格模式！
    严格模式会深度监测状态树来检测不合规的状态变更,影响性能 
    
    类似于插件,我们可以让构建工具来处理这种情况：
    const store = new Vuex.Store({
      // ...
      strict: process.env.NODE_ENV !== 'production'
    })
})  
◆API 
★组件注入的属性/方法 
vm.$store  // 数据中心对象‹可在所有组件中使用›  
  PS: 组件中: 一般通过'computed'属性来承接 this.$store.state 中的数据   
  .state.xx   // 使用数据 
  .getters.xx // 使用数据 
  .commit('foo',data?)   // 执行'mutations'中的方法 
  .dispatch('goo',data?) // 执行'actions'中的方法 
mapState(obj/arr)   绑定函数,简化'state.xx'的获取  
  import {mapState} from "vuex"; // 引入方法 
  export default {
    // ...
    ,computed: { // 使用方法一: 
      ...mapState({ // 使用对象展开运算符将其成员合并到计算属性中 
        key1: function(state,getters){ // 返回值形式 
          注: 该函数为惰性响应,首次使用到该值时,才会调用该函数 
          return state.xxx;  // 获取state数据 
          // 相当于 this.$store.state.xxx  
        }
        ,key2: (state,getters) => getters.xxx  // 获取getters数据 
          相当于 this.$store.getters.xxx   
        ,key3: 'axx.bxx'  // 字符串形式,获取state数据 
          相当于 this.$store.state.axx.bxx  
      })
      ,aoo: function(){
        return this.xxx;
      }
    }
    ,computed: mapState({ // 使用方法二: 
      // PS: 直接覆盖所有计算属性,不能再添加其他计算属性,否则采用第一种  
    })
    ,computed: mapState([ // 使用方法三: 简写方式 
      // PS: 当键名与state中相同时可使用  
      'aoo'
      ,'boo'
      ,.. 
    ]) 
  }
mapGetters(obj/arr) 绑定函数,简化'getters.xx'的获取 
  import { mapGetters } from 'vuex' // 引入方法 
  export default {
    // ... 
    ,computed: {
      ...mapGetters({
        key1: 'aoo'  // 只有字符串形式,无函数返回值的形式 
      })
    }
  }
mapMutations(arr/obj) 绑定函数,简化'store.commit("xxx",data)'操作 
  import { mapMutations } from 'vuex' // 引入方法 
  export default {
    // ...
    ,methods: {
      ...mapMutations([ 
        'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
        // `mapMutations` 也支持载荷：
        'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
      ])
      ,...mapMutations({ 
        add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      })
    }
  }
mapActions(arr/obj)   绑定函数,简化'store.dispatch("xxx",data)'操作  
  import { mapActions } from 'vuex' 
  export default {
    // ...
    ,methods: {
      ...mapActions([
        'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
        
        // `mapActions` 也支持载荷：
        'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
      ])
      ,...mapActions({
        add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      })
    }
  }
在函数中间接访问vue实例 
  通过'mutations'或'actions'函数将vue实例作为参数传递  
  若保存到'state'中,则整个store‹'mutations'、'getters'、'actions'函数›都可访问到该实例  
◆模块化管理: 每个模块维护一套状态,然后合并到一总数据中心中 
  PS: 默认情况下,模块内的'getter'、'mutation'和'action'都是注册在全局命名空间的 
    namespaced: true,成为命名空间模块,模块具有更高的封装度和复用性 
    所有 'getter'、'mutation'及'action'都会自动根据模块注册的路径调整命名 
  Example: 
    const store = new Vuex.Store({
      modules: {
        account: {
          namespaced: true,
          
          // 模块内容（module assets）
          state: { ... }, // 模块内的状态已经是嵌套的了,使用 `namespaced` 属性不会对其产生影响
          getters: {
            isAdmin () { ... } // -> getters['account/isAdmin']
          },
          mutations: {
            login () { ... } // -> commit('account/login')
          },
          actions: {
            login () { ... } // -> dispatch('account/login')
          },
          
          // 嵌套模块
          modules: {
            // 继承父模块的命名空间
            myPage: {
              state: { ... },
              getters: {
                profile () { ... } // -> getters['account/profile']
              }
            },
            
            // 进一步嵌套命名空间
            posts: {
              namespaced: true,
              
              state: { ... },
              getters: {
                popular () { ... } // -> getters['account/posts/popular']
              }
            }
          }
        }
      }
    })
  Feature: 
    模块化,但模块中'namespaced'为'false'时  
      PS: 'state'进行命名空间区分,'getters'、'mutations'及'actions'则不区分<混合到一起>
      const moduleA = {
        state: {}
        ,mutations: {
          foo: function(state){
            state 模块的局部状态对象 
          }
        }
        ,getters: {
          geter1: function(state,getters,rootState){
            state     模块的局部状态对象 
            getters   模块的局部计算对象 
            rootState 根节点状态对象
          }
        }
        ,actions: {
          goo: function(context){
            context.state      模块的局部状态对象 
            context.rootState  根节点状态对象 
          }
        }
        ,namespaced: bol // 命名空间,默认:false 
      }
      const moduleB = {
        state: {}
        ,mutations: {}
        ,getters: {}
        ,actions: {}
      }
      const store = new Vuex.Store({
        modules : {
          aoo: moduleA
          ,boo: moduleB
        }
        ,mutations: {  // 公用的 mutations 
          // 
        }
        ...
      })
      读取/执行分块中的数据/方法  
      vm.$store.state.aoo.xx       // 有命名空间区分 
      vm.$store.getters.xx         // 混合到了一起 
      $store.commit('foo',data)    // 混合到了一起 
      $store.dispatch('goo',data)  // 混合到了一起 
    模块化,且'namespaced'为'true'时  
      vm.$store.state.aoo.xx           // 有命名空间区分 
      vm.$store.getters['aoo/xx']      // 有命名空间区分 
      $store.commit('aoo/foo',data)    // 有命名空间区分 
      $store.dispatch('aoo/goo',data)  // 有命名空间区分 
    'Global Assets'在命名空间模块内访问全局内容 
      modules: {
        foo: {
          namespaced: true,
          
          // 全局内容'rootState'和'rootGetter'将作为第三、四个参数传入 
          getters: {
            // 在这个模块的 getter 中,`getters` 被局部化了
            // 你可以使用 getter 的第四个参数来调用 `rootGetters`
            someGetter (state, getters, rootState, rootGetters) {
              getters.someOtherGetter // -> 'foo/someOtherGetter'
              rootGetters.someOtherGetter // -> 'someOtherGetter'
            }
            ,someOtherGetter: state => { ... } 
          },
          // 全局内容'rootState'通过第三个参数传入 <?>
          mutations: {
            someMutation (state, data, rootState) { }
            ,someMutation1: state => { ... }
          },
          // 全局内容通过context对象的属性传入  
          actions: {
            // 在这个模块中, dispatch 和 commit 也被局部化了
            // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
            someAction ({ dispatch,commit,state,getters,rootState,rootGetters }) {
              getters.someGetter // -> 'foo/someGetter'
              rootGetters.someGetter // -> 'someGetter'
              
              dispatch('someOtherAction') // -> 'foo/someOtherAction'
              dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'
              
              commit('someMutation') // -> 'foo/someMutation'
              commit('someMutation', null, { root: true }) // -> 'someMutation'
            }
            ,someOtherAction (ctx, payload) { ... }
          }
        }
      }
      全局命名空间内触发'action'或'mutation',使用{root:true}作为'dispatch'或'commit'的第三个参数 
    带命名空间的绑定函数 
      当使用 'mapState', 'mapGetters', 'mapActions' 和 'mapMutations' 来绑定命名空间模块时,
      写起来可能比较繁琐：
        computed: {
          ...mapState({
            a: state => state.some.nested.module.a,
            b: state => state.some.nested.module.b
          })
        },
        methods: {
          ...mapActions([
            'some/nested/module/foo',
            'some/nested/module/bar'
          ])
        }
      简化方法: 
        将模块的空间名称字符串作为第一个参数传递给上述函数,
        这样所有绑定都会自动将该模块作为上下文,
        computed: {
          ...mapState('some/nested/module', {
            a: state => state.a,
            b: state => state.b
          })
        },
        methods: {
          ...mapActions('some/nested/module', [
            'foo',
            'bar'
          ])
        }
      创建基于某个命名空间绑定函数 
        通过使用 createNamespacedHelpers 创建基于某个命名空间绑定函数。
        它返回一个对象,对象里有新的绑定在给定命名空间值上的组件绑定绑定函数：
        import { createNamespacedHelpers } from 'vuex'
        const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')
        export default {
          computed: {
            // 在 `some/nested/module` 中查找
            ...mapState({
              a: state => state.a,
              b: state => state.b
            })
          },
          methods: {
            // 在 `some/nested/module` 中查找
            ...mapActions([
              'foo',
              'bar'
            ])
          }
        }
    模块动态注册 
      在 store 创建之后,你可以使用 store.registerModule 方法注册模块：
      
      // 注册模块 `myModule`
      store.registerModule('myModule', {
        // ...
      })
      // 注册嵌套模块 `nested/myModule`
      store.registerModule(['nested', 'myModule'], {
        // ...
      })
      之后就可以通过 store.state.myModule 和 store.state.nested.myModule 访问模块的状态。
      
      模块动态注册功能使得其他 Vue 插件可以通过在 store 中附加新模块的方式来使用 Vuex 管理状态。
      例如,vuex-router-sync 插件就是通过动态注册模块将 vue-router 和 vuex 结合在一起,实现应用的路由状态管理。
      
      你也可以使用 store.unregisterModule(moduleName) 来动态卸载模块。
      注意,你不能使用此方法卸载静态模块（即创建 store 时声明的模块）。
      
      在注册一个新 module 时,你很有可能想保留过去的 state,例如从一个服务端渲染的应用保留 state。
      你可以通过 preserveState 选项将其归档：
      store.registerModule('a', module, { preserveState: true })。
    模块重用 
      有时我们可能需要创建一个模块的多个实例,例如：
      
      创建多个 store,他们公用同一个模块 (例如当 runInNewContext 选项是 false 或 'once' 时,
      为了在服务端渲染中避免有状态的单例)
      在一个 store 中多次注册同一个模块
      如果我们使用一个纯对象来声明模块的状态,那么这个状态对象会通过引用被共享,
      导致状态对象被修改时 store 或模块间数据互相污染的问题。
      
      实际上这和 Vue 组件内的 data 是同样的问题。
      因此解决办法也是相同的——使用一个函数来声明模块状态（仅 2.3.0+ 支持）：
      
      const MyReusableModule = {
        state () {
          return {
            foo: 'bar'
          }
        },
        // mutation, action 和 getter 等等...
      }
    表单处理 
      当在严格模式中使用 Vuex 时,在属于 Vuex 的 state 上使用 v-model 会比较棘手：
        <input v-model="obj.message">
        假设这里的 obj 是在计算属性中返回的一个属于 Vuex store 的对象,
        在用户输入时,v-model 会试图直接修改 obj.message。
        在严格模式中,由于这个修改不是在 mutation 函数中执行的, 这里会抛出一个错误。
      用“Vuex 的思维”去解决这个问题的方法是：
        给 <input> 中绑定 value,然后侦听 input 或者 change 事件,在事件回调中调用 action:
        <input :value="message" @input="updateMessage">
        // ...
        computed: {
          ...mapState({
            message: state => state.obj.message
          })
        },
        methods: {
          updateMessage (e) {
            this.$store.commit('updateMessage', e.target.value)
          }
        }
        下面是 mutation 函数：
        
        // ...
        mutations: {
          updateMessage (state, message) {
            state.obj.message = message
          }
        }
      双向绑定的计算属性 
        必须承认,这样做比简单地使用“v-model + 局部状态”要啰嗦得多,
        并且也损失了一些 v-model 中很有用的特性。
        另一个方法是使用带有 setter 的双向绑定计算属性：
        <input v-model="message">
        // ...
        computed: {
          message: {
            get () {
              return this.$store.state.obj.message
            },
            set (value) {
              this.$store.commit('updateMessage', value)
            }
          }
        }

