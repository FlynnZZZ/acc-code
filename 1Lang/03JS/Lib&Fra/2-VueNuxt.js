介绍: 
  VueJS的通用框架,用来作SSR[服务器端渲染] 
  预设了利用VueJS开发服务端渲染的应用所需要的各种配置 
  集成了以下组件/框架 
    Vue2 
    Vue-Router 
    Vue-Meta 
    Vuex[当配置了 Vuex 状态树配置项 时才会引入] 
使用: 
  $ npm install vue-cli -g 
  ◆新手模版 
  $ vue init nuxt-community/starter-template <project-name> 
  $ cd <project-name>
  $ npm i 
  // $ vue init nuxt/starter // 使用模版初始化NuxtJS项目 
  $ npm run dev // 启动服务 
  ◆从头开始新建项目 
  $ npm init       // 初始化项目,创建 package.json 
    在"scripts"中添加指令:  "dev": "nuxt" 
  $ npm i -S nuxt  // 安装nuxt 
  $ mkdir pages    // 创建 pages 目录
    在pages中创建'.vue'文件 
    NuxtJS会依据pages目录中的所有'.vue'文件生成应用的路由配置  
  $ npm run dev    // 启动项目 
  ◆静态化 
  $ nuxt generate // 静态化  
    Example: 
      -| pages/
      ----| about.vue
      ----| index.vue
      // 静态化后变成：
      -| dist/
      ----| about/
      ------| index.html
      ----| index.html
目录结构: 
  assets                // 存放未编译的静态资源,如LESS、SASS或JS 
    默认Nuxt使用'vue-loader'、'file-loader'及'url-loader'Webpack加载器来处理文件的加载和引用 
    对于不需要通过Webpack处理的静态资源文件,可放置在'static'目录中 
  static                // 存放静态资源文件,比如图片 
    此类文件不会被NuxtJS调用Webpack进行构建编译处理
    ,Nuxt服务器启动时,该目录下的文件会映射至应用的根路径'/'下
    ,直接使用'/xxx.png'来访问 
    ,目录名为NuxtJS保留,不可更改 
  components            // 存放编写的Vue组件,比如滚动组件,日历组件,分页组件 
    NuxtJS不会扩展增强该目录下的组件,即这些组件不会像页面组件那样有'asyncData'方法 
  layouts               // 布局目录,用于组织应用的布局组件 
    该目录名为NuxtJS保留,不可更改 
  middleware            // 存放应用的中间件 
  pages                 // 存放页面 
    用于组织应用的路由及视图
    NuxtJS读取该目录下所有的'.vue'文件并自动生成对应的路由配置 
    该目录名为NuxtJS保留,不可更改 
  plugins               // JS插件存放 
    需要在根VueJS应用实例化之前需要运行的JS插件 
  store                 // 用于组织应用的Vuex 状态管理 
    NuxtJS框架集成了 Vuex 状态树 的相关功能配置,
    在 store 目录下创建一个 index.js 文件可激活这些配置,
    该目录名为NuxtJS保留,不可更改 
  nuxt.config.js        // 用于组织NuxtJS应用的个性化配置 
    NuxtJS的默认配置涵盖了大部分使用情形,可通过该文件来覆盖默认的配置
    文件名为NuxtJS保留,不可更改 
    build 
      在自动生成的 vendor.bundle.js 文件中添加一些模块,
      以减少应用 bundle 的体积。
      如果应用依赖第三方模块,这个配置项是十分实用的 
    cache      开启组件缓存策略以提升渲染性能
    css        用于定义应用的全局[所有页面均需引用的]样式文件、模块或第三方库 
    dev        配置 NuxtJS 应用是开发还是生产模式 
    env        定义应用客户端和服务端的环境变量 
    generate   定义每个动态路由的参数
      NuxtJS 依据这些路由配置生成对应目录结构的静态文件 
    head       配置应用默认的meta标签 
    loading    个性化定制 NuxtJS 使用的加载组件 
    plugins    配置那些需要在根vue.js应用 实例化之前需要运行的 Javascript 插件 
    rootDir    配置 NuxtJS 应用的根目录 
    router     覆盖 NuxtJS 默认的 vue-router 配置 
    srcDir     配置应用的源码目录路径 
    transition 个性化配置应用过渡效果属性的默认值 
  .nuxt                 // Nuxt自动生成,临时的用于编辑的文件,build
  .editorconfig         // 开发工具格式配置
  .eslintrc.js          // ESLint的配置文件,用于检查代码格式
  .gitignore            // 配置git不上传的文件
  package-lock.json     // npm自动生成,用于帮助package的统一性设置的,yarn也有相同的操作
  package.json          // npm包管理配置文件
  ◆其他说明
  '~'表示根目录'/' 
    Example: const store = require('~store')	// 导入 vuex 状态树实例
路由 
  NuxtJS 依据 pages 目录结构自动生成 vue-router 模块的路由配置 
  基础路由 
    假设 pages 的目录结构如下：
    pages/
    --| user/
    -----| index.vue
    -----| one.vue
    --| index.vue
    那么，NuxtJS 自动生成的路由配置如下：
    router: {
      routes: [
        {
          name: 'index',
          path: '/',
          component: 'pages/index.vue'
        },
        {
          name: 'user',
          path: '/user',
          component: 'pages/user/index.vue'
        },
        {
          name: 'user-one',
          path: '/user/one',
          component: 'pages/user/one.vue'
        }
      ]
    }
  动态路由 
    在 NuxtJS 里面定义带参数的动态路由，需要创建对应的以下划线作为前缀的 Vue 文件 或 目录。
    以下目录结构：
    
    pages/
    --| _slug/
    -----| comments.vue
    -----| index.vue
    --| users/
    -----| _id.vue
    --| index.vue
    NuxtJS 生成对应的路由配置表为：
    
    router: {
      routes: [
        {
          name: 'index',
          path: '/',
          component: 'pages/index.vue'
        },
        {
          name: 'users-id',
          path: '/users/:id?',
          component: 'pages/users/_id.vue'
        },
        {
          name: 'slug',
          path: '/:slug',
          component: 'pages/_slug/index.vue'
        },
        {
          name: 'slug-comments',
          path: '/:slug/comments',
          component: 'pages/_slug/comments.vue'
        }
      ]
    }
    你会发现名称为 users-id 的路由路径带有 :id? 参数，表示该路由是可选的。如果你想将它设置为必选的路由，需要在 users/_id 目录内创建一个 index.vue 文件。
  路由参数校验 
    NuxtJS 可以让你在动态路由组件中定义参数校验方法。
    
    举个例子： pages/users/_id.vue
    
    export default {
      validate ({ params }) {
        // Must be a number
        return /^\d+$/.test(params.id)
      }
    }
    如果校验方法返回的值不为 true， NuxtJS 将自动加载显示 404 错误页面。
  嵌套路由 
    你可以通过 vue-router 的子路由创建 NuxtJS 应用的嵌套路由。
    
    创建内嵌子路由，你需要添加一个 Vue 文件，同时添加一个与该文件同名的目录用来存放子视图组件。
    
    别忘了在父级 Vue 文件内增加 <nuxt-child/> 用于显示子视图内容。
    
    假设文件结构如：
    
    pages/
    --| users/
    -----| _id.vue
    -----| index.vue
    --| users.vue
    NuxtJS 自动生成的路由配置如下：
    
    router: {
      routes: [
        {
          path: '/users',
          component: 'pages/users.vue',
          children: [
            {
              path: '',
              component: 'pages/users/index.vue',
              name: 'users'
            },
            {
              path: ':id',
              component: 'pages/users/_id.vue',
              name: 'users-id'
            }
          ]
        }
      ]
    }
  动态嵌套路由 
    这个应用场景比较少见，但是 NuxtJS 仍然支持：在动态路由下配置动态子路由。
    
    假设文件结构如下：
    
    pages/
    --| _category/
    -----| _subCategory/
    --------| _id.vue
    --------| index.vue
    -----| _subCategory.vue
    -----| index.vue
    --| _category.vue
    --| index.vue
    NuxtJS 自动生成的路由配置如下：
    
    router: {
      routes: [
        {
          path: '/',
          component: 'pages/index.vue',
          name: 'index'
        },
        {
          path: '/:category',
          component: 'pages/_category.vue',
          children: [
            {
              path: '',
              component: 'pages/_category/index.vue',
              name: 'category'
            },
            {
              path: ':subCategory',
              component: 'pages/_category/_subCategory.vue',
              children: [
                {
                  path: '',
                  component: 'pages/_category/_subCategory/index.vue',
                  name: 'category-subCategory'
                },
                {
                  path: ':id',
                  component: 'pages/_category/_subCategory/_id.vue',
                  name: 'category-subCategory-id'
                }
              ]
            }
          ]
        }
      ]
    }
  过渡动效 
    NuxtJS 使用 Vue.js 的<transition>组件来实现路由切换时的过渡动效。
    
    全局过渡动效设置
    NuxtJS 默认使用的过渡效果名称为 page
    
    如果想让每一个页面的切换都有淡出 (fade) 效果，我们需要创建一个所有路由共用的 CSS 文件。所以我们可以在 assets/ 目录下创建这个文件：
    
    在全局样式文件 assets/main.css 里添加一下样式：
    
    .page-enter-active, .page-leave-active {
      transition: opacity .5s;
    }
    .page-enter, .page-leave-active {
      opacity: 0;
    }
    然后添加到 nuxt.config.js 文件中：
    
    module.exports = {
      css: [
        'assets/main.css'
      ]
    }
    关于过渡效果 transition 属性配置的更多信息可参看 页面过渡效果API。
  页面过渡动效设置 
    如果想给某个页面自定义过渡特效的话，只要在该页面组件中配置 transition 字段即可：
    
    在全局样式 assets/main.css 中添加一下内容：
    
    .test-enter-active, .test-leave-active {
      transition: opacity .5s;
    }
    .test-enter, .test-leave-active {
      opacity: 0;
    }
    然后我们将页面组件中的 transition 属性的值设置为 test 即可：
    
    export default {
      transition: 'test'
    }
    关于过渡效果 transition 属性配置的更多信息可参看 页面过渡效果API。
  中间件 
    中间件允许您定义一个自定义函数运行在一个页面或一组页面渲染之前。
    
    每一个中间件应放置在 middleware/ 目录。文件名的名称将成为中间件名称(middleware/auth.js将成为 auth 中间件)。
    
    一个中间件接收 context 作为第一个参数：
    
    export default function (context) {
      context.userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent
    }
    中间件执行流程顺序：
    
    nuxt.config.js
    匹配布局
    匹配页面
    中间件可以异步执行,只需要返回一个 Promise 或使用第2个 callback 作为第一个参数：
    
    middleware/stats.js
    
    import axios from 'axios'
    
    export default function ({ route }) {
      return axios.post('http://my-stats-api.com', {
        url: route.fullPath
      })
    }
    然后在你的 nuxt.config.js 、 layouts 或者 pages 中使用中间件:
    
    nuxt.config.js
    
    module.exports = {
      router: {
        middleware: 'stats'
      }  
    }
    stats 中间件将在每个路由改变时被调用。
    
    如果你想看到一个使用中间件的真实例子，请参阅在 GitHub 上的example-auth0。
流程: 一个完整的服务器请求到渲染的流程  
  (1) Incoming Request                ↓   
  (2) nuxtServerlint                  ↓ 
    Store action          
  (3) middleware                      ↓ 
    1 nuxt.config.js
    2 matching layout 
    3 mathcing page & childre 
  (4) validate()                      ↓ 
    Pages & children  
  (5) asyncData() & fetch()           ↓ 
    Pages & children  
  (6) Render                          ↓ 
  (7) Navigate                        ↓ 
    <nuxt-link>
  (3) 返回到第三步 
















