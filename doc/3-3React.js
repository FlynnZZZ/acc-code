React 
介绍 
  起源于Facebook,于13年5月开源
  使用jsx语言和一整套完整的工具链[工具集合」
  非完整的MVC、MVVM框架 
使用 
  npm install -g  create-react-app       安装React 
  create-react-ap helloworld[项目名称」  创建React项目并初始化\
  cd helloworld
  npm start   [npm run start的缩写」 
'JavaScript and XML'JSX 
  Example: 
    <div id="container"> </div>
    <script type="text/jsx">
      var Hello = React.createClass({
        render : function(){
          return <div>Hello {this.props.name}</div>;
        },
      })
      React.render(<Hello name="World" />,document.getElementById('container'));
    </script>
    渲染为 : Hello World 
var Cmpnt = React.createClass(params);  创建组件类'Cmpnt' 
  params   配置参数 
    {
      getInitialState : function(){
        return { } 
      },
      componentWillMount : function(){
      },
      render : function(){     // 必须具备的 
        return (   // 最外层只能是一个标签 
          <div >  
            <button onClick={this.clickFoo}> 点击 </button>
            <div ref="aoo">测试点击</div>   
            // 通过 this.refs.aoo 获取到该组件节点
            // 通过 React.findDOMNode(this.refs.aoo) 获取到DOM节点 
          </div>;  
        )
      },
      componentDidMount : function(){
      },
      clickFoo : function(e){ // e 为React封装的 event对象,具有原生event对象的属性方法 
        console.log('click');
      },
    }
  ◆函数体中的方法 
  this.setState(val)    改变'getInitialState'的返回值 
  this.props.xx         组件渲染'ReactDOM.render'时,标签中定义的属性值 
React.render(tags,elem);    将组件渲染到HTML中  
  tags    将插入DOM中的HTML模版,最外层必须只有一个标签  
    可为原生HTML标签片段: <div></div>
    可为自定义的组件: <Cmpnt />
  elem    DOM元素对象,插入到的DOM节点  
ReactDOM.render(tags,elem)  将组件渲染到HTML中  
◆在HTML中的操作
{val}            在HTML中进行插值 
className="aoo"  定义class 
  PS: class为JS的关键字,使用'className'来代替'class' 
style={obj}      使用对象的形式定义行内样式 
  var obj = {fontSize:"18px"};
  <div style={obj}></div>
  相当于
  <div style={{fontSize:"18px"}}></div>
this.state   'getInitialState'的返回值 
'components Lifecycle'组件声明周期 
  ◆Mounting 
  'getInitialState'    
  'componentWillMount' 初始化渲染前  
  'componentDidMount'  初始化渲染后 
  ◆Updating 
  'componentWillReceiveProps' 组件首次接收'props'时调用
  'shouldComponentUpdate' 
  'componentWillUpdate'       渲染更新前
  'componentDidUpdate'        渲染更新后 
  ◆Unmounting 
  'componentWillUnmount'      
react-native 
  环境搭建
    安装react-native命令行工具 
      npm install -g react-native-cli  安装 
      react-native --help  查看支持的命令 
    安装安卓开发工具android studio 
    react-native init <项目名称>  初始化项目
---------------------------------------------------------------------以下待整理 
