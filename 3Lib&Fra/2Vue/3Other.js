--------------------------------------------------------------------------------
'vue-resource'HTTP请求封装插件 
  PS: 通过'XMLHttpRequest'或'JSONP'发起请求并处理响应 
引入安装   
  通过<script>引入 
    在vue后引入后引入vue-resource 
    默认安装了 
  通过npm下载引入 
    $ npm i --S vue-resource  // 下载并写入依赖 
    // main.js 中引入、安装   
    import VueResource from 'vue-resource' // 引入 vue-resource 
    Vue.use(VueResource)  // 安装 vue-resource   
API 
  ◆组件注入属性/方法 vm.$http 
    PS: 回调函数中的 this 仍指向Vue实例 
  ★http请求方法 
    请求方法返回值为 Promise 对象,可使用以下方法 
    .then(function(data1 ){ // 成功的回调 
      // data1,response对象,进行了Vue封装 
    }
    ,function(data2 ){ // 失败的回调 
      // data2,response对象,进行了Vue封装 
    })  
    .catch(function(data){
      // 
    })
  vm.$http.get('url',{    // GET请求  
    // 可选,请求的参数 
  })
  vm.$http.post('url',{   // POST请求
    // 可选参数
  })
  vm.$http.delete(url[,options]) 
  vm.$http.put(url[,body][,options]) 
  ...
  vm.$http.jsonp('url',{  // JSONP请求  
    // 可选参数 
  }) 
  vm.$http({  // 通用写法 
    url: 'url'
    ,method: 'GET'
    ,data: { 
      key1: val1 
      ,key2: val2
    }
    ,headers: {"X-Requested-With": "XMLHttpRequest"}
    ,emulateJSON: true
  })
  ★其他方法 
  vm.$http.head(url, [options]) 
  vm.$http.patch(url, [body], [options]) 
  ★response响应对象
    .ok     bol,响应的HTTP状态码在 200-299 该属性为 true,其余为 false
    .status num,响应的HTTP状态码 
    .statusText str,响应的状态文本
    .headers  obj,响应头
    .body       接口响应的数据 
    .bodyText   未经转义的响应数据 
    .headers    相关的头信息 
    .ok         bol,是否请求成功 
    .status     状态码 
    .statusText 状态描述 
    .url        请求的地址  
    .text() str,以字符串形式返回response body
    .json() obj,以JSON对象形式返回response body
    .blob() Blob,以二进制形式返回response body
  ◆Vue.http.xx 
    PS: 和 vm.$http 等价 
    Vue.http.options.xhr = { withCredentials: true } ? 
    Vue.http.options.emulateJSON = true 
    ★Vue.http.options 对象 
    .url     str,请求的URL 
    .method  str,请求的HTTP方法,如'GET','POST'或其他HTTP方法 
    .body    obj,FormData string request body 
    .params  obj,请求的URL参数对象 
    .headers obj,request header 
    .timeout num,请求超时时间,单位ms[0 表示无超时时间] 
    .before    foo,请求发送前的处理函数,类似于jQuery的beforeSend函数
    .progress  foo,ProgressEvent回调处理函数
    .credentials bol,表示跨域请求时是否需要使用凭证
    .emulateHTTP bol,发送PUT,PATCH,DELETE请求时以HTTP POST的方式发送 
      若Web服务器无法处理PUT,PATCH和DELETE这种REST风格的请求,可启用enulateHTTP选项。
      启用该选项后,请求会以普通的POST方法发出,
      并且HTTP头信息的X-HTTP-Method-Override属性会设置为实际的HTTP方法。
      Vue.http.options.emulateHTTP = true;
    .emulateJSON bok,将request body以application/x-www-form-urlencoded content type发送 
      如果Web服务器无法处理编码为application/json的请求,可启用emulateJSON选项。
      启用后,请求会以'application/x-www-form-urlencoded'作为MIME type,就像普通的HTML表单一样 
      Vue.http.options.emulateJSON = true;
--------------------------------------------------------------------------------
'axios'基于Promise的HTTP库,可用在浏览器和NodeJS中 
  PS: 类似'vue-resource'的插件,'vue2.0+'推荐使用axios 
    基于 Promise 的 HTTP 请求客户端,可同时在浏览器和 NodeJS 中使用 
  功能特性 
    在浏览器中发送 XMLHttpRequests 请求
    在NodeJS中发送 http请求
    支持 Promise API
    拦截请求和响应
    转换请求和响应数据
    取消请求
    自动转换 JSON 数据
    客户端支持保护安全免受 CSRF/XSRF 攻击
使用 
  $ npm i -S axios // 安装 axios
  // 入口 main.js 中 
  import axios from 'axios' // 引入axios 
  // 使用全局对象 axios 进行http请求 
  // axios并非vue插件,不能使用Vue.use(),所以只能在每个需要发送请求的组件中即时引入
  // 但可在引入axios后,通过手动修改原型链,来更方便的使用 
  var qs = require('qs'); // 用于序列化请求数据 
  Vue.prototype.$http = axios.create({
    baseURL: 'http://democode.likecto.hkbao.com/'
    ,withCredentials: true  // 携带cookies 
    ,headers: { 
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" // 避免预检请求 
    }
    ,transformRequest: [ // 序列化请求数据 
      function(data){
        return qs.stringify(data)
      }
    ]
  }) 
API 
  ◆请求方法: 
  axios({   // 通用方法 
    baseURL: 'https://some-domain.com/api/' // 将被添加到`url`前面,除非`url`是绝对的 
    ,url: 'url'
    ,params: {  // 与请求一起发送的URL参数 
      // 须是纯对象或URLSearchParams对象
      ID: 12345
    }
    ,paramsSerializer: function(params) { // 序列化`params` 
      return Qs.stringify(params, {arrayFormat: 'brackets'})
    }
    ,data: {    // 作为请求主体发送的数据,仅适用于'PUT','POST'和'PATCH'
      // 当无`transformRequest`选项时,则数据类型需为以下之一: 
      // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
      // - Browser only: FormData, File, Blob
      // - Node only: Stream, Buffer
      key1: val1
      ,key2: val2
    }
    ,transformRequest: [ // 在请求数据发送到服务器之前对其进行更改 
      // 只适用于请求方法'PUT','POST'和'PATCH'
      function (data) { 
        // 数组中的最后一个函数必须返回一个字符串,一个 ArrayBuffer或一个 Stream
        return data;
      }
      ,...
    ]
    ,method: 'post' // 默认get 
    ,headers: { // 自定义 headers
      'X-Requested-With': 'XMLHttpRequest'
    }
    ,timeout: <num> // 请求超时设置,单位:ms  
    ,withCredentials: false // 指示是否跨站点访问控制请求 
    ,transformResponse: [ // 允许在 then / catch之前对响应数据进行更改
      function (data) { 
        return data;
      }
    ]
    ,auth: { // 使用HTTP基本认证,并提供凭据 
      // 将设置一个`Authorization'头,覆盖任何现有的`Authorization'自定义头,使用`headers`设置 
      username: 'janedoe',
      password: 's00pers3cret'
    },
    ,responseType: 'json', // 表示服务器将响应的数据类型 
      'json' 默认, 
      'text'
      'document'
      'blob'
      'arraybuffer'
      'stream'
    ,adapter: function (config) { // 自定义处理请求,返回一个promise并提供一个有效的响应 
      /* ... */
    }
    ,onUploadProgress: function (progressEvent) { // 处理上传的进度事件 
      // 使用本地 progress 事件做任何你想要做的
    }
    ,onDownloadProgress: function (progressEvent) { // 处理下载的进度事件 
      // 
    }
    ,maxContentLength: 2000 // 定义允许的http响应内容的最大大小
    ,xsrfCookieName: 'XSRF-TOKEN' // 用作 xsrf 令牌的值的cookie的名称
    ,xsrfHeaderName: 'X-XSRF-TOKEN' // 携带xsrf令牌值的http头的名称
    ,validateStatus: function (status) { // 定义是否解析或拒绝给定的promise 
      return status >= 200 && status < 300; // default
      // HTTP响应状态码
      // 如果`validateStatus`返回`true`或被设置为`null` promise将被解析;
      // 否则,promise将被拒绝 
    }
    ,maxRedirects: 5 // 定义在node.js中要遵循的重定向的最大数量
      如果设置为0,则不会遵循重定向 
    // 在node.js中分别执行http和https请求时使用的自定义代理 
      // 允许配置类似`keepAlive`的选项, 默认情况下不启用。
    ,httpAgent: new http.Agent({ // node.js中,执行http请求时使用的自定义代理  
      keepAlive: true 
    })
    ,httpsAgent: new https.Agent({ // node.js中,执行https请求时使用的自定义代理  
      keepAlive: true 
    })
    ,proxy: { // 定义代理服务器的主机名和端口
      // 将设置一个`Proxy-Authorization` header,
      // 覆盖任何使用`headers`设置的现有的`Proxy-Authorization` 自定义 headers。
      host: '127.0.0.1',
      port: 9000,
      auth: { // 表示HTTP Basic auth应该用于连接到代理,并提供credentials 
        username: 'mikeymike',
        password: 'rapunz3l'
      }
    }
    ,cancelToken: new CancelToken(function (cancel) { // 指定可用于取消请求的取消令牌
      // 
    })
  })
  axios.request(config)
  axios.get('url',{
    // 可选,配置参数
    params: {  // 查询参数 
      key1: val1
      ..
    } 
  })
  axios.post('url',{
    // 可选,请求参数  
  } ,{  /* 可选,配置 */ })
  axios.delete(url[, config])
  axios.put(url[, data[, config]])
  axios.patch(url[, data[, config]])
  axios.head(url[, config])
  axios.options(url[, config])
  ◆
  axios.all([  // 所有请求完毕  
    axios.get()
    ..
  ])   
  .then(axios.spread(function(acct,perms){
    // 
  }))
  response响应 
    .status      num,
    .statusText  str, 
    .data     obj,
    .headers  obj,
    .config   obj,
    .request  obj, 
  axios.defaults.xx,全局axios默认值 
    .baseURL = 'url';
    .headers.common['Authorization'] = AUTH_TOKEN;
    .headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.interceptors,拦截器,可截取请求或响应在被'then'或'catch'处理之前 
    var tmp = axios.interceptors.request.use(function(config){   //添加请求拦截器
      //在发送请求之前做某事
      return config;
    }
    ,function(error){
      //请求错误时做些事
      return Promise.reject(error);
    });
    var tmp = axios.interceptors.response.use(function(response){ //添加响应拦截器
      //对响应数据做些事
      return response;
    }
    ,function(error){
      //请求错误时做些事
      return Promise.reject(error);
    });
    axios.interceptors.request.eject(tmp) // 删除拦截器 
  处理错误 
    axios.get('/ user / 12345')
    .catch(function(error){
      if(error.response){ //请求已发出,但状态代码落在2xx的范围外  
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } 
      else { // 在设置触发错误的请求时发生了错误 
        console.log('Error',error.message);
      }}
      console.log(error.config);
    });
    可使用'validateStatus'配置选项定义自定义HTTP状态码错误范围 
    axios.get('/ user / 12345',{
      validateStatus：function(status){
        return status < 500; // 仅当状态代码大于或等于500时拒绝
      }}
    })
  使用取消令牌取消请求 
    axios cancel token API基于可取消的promise提议,目前处于阶段1
    可使用 CancelToken.source 工厂创建一个取消令牌,如下所示：
    var CancelToken = axios.CancelToken;
    var source = CancelToken.source();
    
    axios.get('/user/12345', {
      cancelToken: source.token
    })
    .catch(function(thrown) {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      } 
      else {
        // 处理错误
      }
    });

    //取消请求(消息参数是可选的)
    source.cancel('操作被用户取消。');

    还可通过将执行器函数传递给CancelToken构造函数来创建取消令牌：
    var CancelToken = axios.CancelToken;
    var cancel;
    
    axios.get('/ user / 12345',{
      cancelToken：new CancelToken(function executor(c){
        //一个执行器函数接收一个取消函数作为参数
        cancel = c;
      })
    });
    
    // 取消请求
    clear();

    注意：您可以使用相同的取消令牌取消几个请求。
    使用application / x-www-form-urlencoded格式
    默认情况下,axios将JavaScript对象序列化为JSON。 要以应用程序/ x-www-form-urlencoded格式发送数据,您可以使用以下选项之一。
  浏览器 
    在浏览器中,您可以使用 URLSearchParams API,如下所示：
    var params = new URLSearchParams();
    params.append('param1', 'value1');
    params.append('param2', 'value2');
    axios.post('/foo', params);
    请注意,所有浏览器都不支持URLSearchParams,但是有一个 polyfill 可用[确保polyfill全局环境] 
    或可以使用qs库对数据进行编码：
    var qs = require('qs');
    axios.post('/foo', qs.stringify({ 'bar': 123 });
  NodeJS 
    在NOdeJS中,可使用querystring模块,如下所示：
    var querystring = require('querystring');
    axios.post('http://something.com/', querystring.stringify({ foo: 'bar' });
  TypeScript 
    axios包括TypeScript定义。
    import axios from 'axios';
    axios.get('/user?ID=12345');
    axios在很大程度上受到Angular提供的$http服务的启发 
  自定义axios实例 
    var instance = axios.create({   // 使用自定义配置创建axios的新实例 
      baseURL: 'url'
      ,timeout: 1000
      ,headers: {'X-Custom-Header': 'foobar'}
    }) 
    //在实例创建后改变默认值
    instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    // 自定义实例添加拦截器 
    instance.interceptors.request.use(function () {
      // 
    });
--------------------------------------------------------------------------------
'vue-validator'表单验证 
'vue-touch'移动端 

