originJS[SlSt] 
  功能: 轻量、简洁、功能--多模块化自由组合、待续... 
  简写符号: 
    pa   parents
    pu   public
    el   elements
    me   method
    da   data
    op   operation
    ms   message
  思想 
    通过JS管控HTML元素 
      var o1 = new Org( {
        el : '#app',
        da : {
          
        },
        me : {
          
        },
        ms : {
          o2 : {data:value},
        },
        op   : {
          '#app-btn1' : me.foo1,
          '#app-btn1' : {
            'click' : me.foo1
          },
          '#app-btn1' : [
            { 'click' : me.foo1 },
            { 'hover,mouseout' : me.foo2 },
            { 'hover' : {  
              is  : me.foo2 ,
              aoo : foo 
            }  
            },
          ],
          '#app-btn2' : function(data){
            console.log(data);
            me.foo2(data)
          },
        }
      } )
    组件化的实现 
      将 HTML、CSS、JS 代码,统一放置在一 xx.html 文件中,作为一个'组件'
      通过ajax方式获取'组件'并插入到'对象HTML'中
      在'对象HTML'中,通过标签 <cpt-xxx></cpt-xxx> 的方式来确定'组件'的插入位置 
        内部实现, $('cpt-xxx').after(data).remove();
    组件间通信 
      通过自定义事件的方式来实现 
      Jelem.trigger("eName" [,arr]);     触发事件及传递数据 
      Jelem.on(str,function(e,arg1,arg2,..){ }) 监听事件及接收数据 
      将事件的监听触发绑定在需互相传递数据组件的共同父元素上,
      事件需先监听后触发才能保证无信息遗漏,
      因为根据组件的加载,他们的共同父元素在他们加载之前是存在的,不会导致无法获取到DOM的情况, 
      一般可将事件绑定到'body'元素上,
      假设 A B 组件 ,其加载的时间不同,若 A 先加载,B 后加载,
        A 在 B 加载后发送消息 
        ...
      
      封装监听触发,实现相互通信 
        原理:
          触发一个事件'e'时,同时监听[一次性]事件'_e_',
          响应一个事件'e'时,同时触发事件'_e_';
          注意:请始终保持先监听再触发的顺序 
          $.fn.extend({
            io : function(ename,foo){
              var that = this;
              this.on(ename,function(e,data){
                var outData = foo(e,data);
                // console.log(data,'收到的数据');
                var event = '__'+ename+'__';
                var arr = [];
                arr.push(outData);
                that.trigger(event,arr);
              });
            },
            oi : function(ename,outData,foo){
              var that = this;
              var event = '__'+ename+'__';
              this.one(event,function(e,data){
                foo(e,data);
                // console.log(data,'触发后回来的数据');
              })
              var arr = [];
              arr.push(outData);
              that.trigger(ename,arr);
            },
          });
          
          // agreed 为双方约定的通信名称 
          var elem = $('.aoo');
          
          // 监听事件['agreed'],然后发送 数据
          elem.io('agreed',function(e,data){
            // console.log(data,'接收到的信息');
            if (data == 1) {
              return 10;
            }
            else if (data == 2) {
              return 20
            }
            else {
              return 'no suitable data'
            }
          });
          // 发送 请求数据 后,等待回应
          elem.oi('agreed','1',function(e,data){
            console.log(data,'等待的回应');
          });
        效果:利用发送信息的方式来获取信息 
          可自定义规则,向未来元素发送信息 
            预定义发送数据,等待未来元素的触发 
            
      出现的'时间前''时间后' + 信息的'发送者''接受者' 
      
      1. 广播模式 
        PS:信息发送者主动 
          将信息同时放置于body的data中和通过事件来发送 
          接收时通过两个渠道来获取,从而保证获取到数据不受组件的加载的先后顺序影响 
        function put (ename,data,elem){ 
          var el = elem || $('body');
          el.data(ename,data);
          el.trigger(ename,[data]);
        }
        function get (ename,foo,elem){ 
          var el = elem || $('body');
          var data1 = el.data(ename);
          if (data1) { // 当接受者为后出现时 
            foo(data1);
          }
          else { // 当接受者为先出现时 
            el.on(ename,function(e,data2){ 
              foo(data2) 
            })
          }
          if (!$._data(el[0],'events')[ename]) { // 如果事件不存在则绑定 
            el.on(ename,function(e,data2){ 
              foo(data2) 
            })
          }
        }
        // ename  不可使用大小写、不可使用'_'连接,最好全部为小写字母 
        // 使用
        var foo = function(data){ 
          console.log(data);
        }
        put('test',{'a','11111'});
        get('test',function(data){ 
          console.log(data);
        })
      2. 请求模式 
        信息接受者主动
        prev to next 
        next to prev 
        接受者不断的发送请求,接收到响应后停止
        请求的参数为信息发出者预先定义好的参数 
    将公用资源初次加载存放到客户端,之后在缓存中去取 
      如公用的库 jQuery,Vue,自定义的工具 等等 
      1. 使用 localStorage 存储 
      2. 
---------------------------------------------------------------------以下待整理 
