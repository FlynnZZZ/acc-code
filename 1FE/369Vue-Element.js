Element-UI 
  采用 Vue 2.0 作为基础框架实现的组件库,它面向企业级的后台应用 
安装&引入&使用 
  $ npm i element-ui -S  // 
  CDN 
    <link rel="stylesheet" href="./style.css"> // <!-- 引入样式 -->   
    <script src="./script.js"></script>        // <!-- 引入组件库 --> 
引入Element 
  完整引入: 
    // main.js
    import Vue from 'vue';
    import ElementUI from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    import App from './App.vue';
    Vue.use(ElementUI);
    // 完成了 Element 的引入
    new Vue({
      el: '#app',
      render: h => h(App)
    });
    // 样式文件需要单独引入 
  按需引入: 
    借助'babel-plugin-component',可只引入需要的组件,以达到减小项目体积的目的 
    $ npm i babel-plugin-component -D  // 安装 babel-plugin-component：
    修改'.babelrc'  
      {
        "presets": [["es2015", { "modules": false }]]
        ,"plugins": [
          [
            "component"
            ,{ "libraryName": "element-ui", "styleLibraryName": "theme-chalk" }
          ]
        ]
      }
      
    import Vue from 'vue';
    // 只引入部分组件,比如 Button 和 Select 
    import { Button, Select } from 'element-ui';
    import App from './App.vue';
    
    Vue.component(Button.name, Button);
    Vue.component(Select.name, Select);
    /* 或写为
    * Vue.use(Button)
    * Vue.use(Select)
    */
    
    new Vue({
      el: '#app',
      render: h => h(App)
    });
组件枚举: 
  import Vue from 'vue';
  import { 
    Pagination, Dialog, Autocomplete, Dropdown, DropdownMenu,
    DropdownItem, Menu, Submenu, MenuItem, MenuItemGroup, Input,
    InputNumber, Radio, RadioGroup, RadioButton, Checkbox, CheckboxButton,
    CheckboxGroup, Switch, Select, Option, OptionGroup, Button, ButtonGroup,
    Table, TableColumn, DatePicker, TimeSelect, TimePicker,
    Popover, Tooltip, Breadcrumb, BreadcrumbItem, Form, FormItem,
    Tabs, TabPane, Tag, Tree, Alert, Slider, Icon, Row, Col, Upload,
    Progress,
    Badge, Card, Rate, Steps, Step, Carousel, CarouselItem, Collapse,
    CollapseItem, Cascader, ColorPicker, Transfer, Container, Header,
    Aside, Main, Footer, Loading, MessageBox, Message, Notification
  } from 'element-ui';
  
  Vue.use(Pagination);
  Vue.use(Dialog);
  Vue.use(Autocomplete);
  Vue.use(Dropdown);
  Vue.use(DropdownMenu);
  Vue.use(DropdownItem);
  Vue.use(Menu);
  Vue.use(Submenu);
  Vue.use(MenuItem);
  Vue.use(MenuItemGroup);
  Vue.use(Input);
  Vue.use(InputNumber);
  Vue.use(Radio);
  Vue.use(RadioGroup);
  Vue.use(RadioButton);
  Vue.use(Checkbox);
  Vue.use(CheckboxButton);
  Vue.use(CheckboxGroup);
  Vue.use(Switch);
  Vue.use(Select);
  Vue.use(Option);
  Vue.use(OptionGroup);
  Vue.use(Button);
  Vue.use(ButtonGroup);
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(DatePicker);
  Vue.use(TimeSelect);
  Vue.use(TimePicker);
  Vue.use(Popover);
  Vue.use(Tooltip);
  Vue.use(Breadcrumb);
  Vue.use(BreadcrumbItem);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Tabs);
  Vue.use(TabPane);
  Vue.use(Tag);
  Vue.use(Tree);
  Vue.use(Alert);
  Vue.use(Slider);
  Vue.use(Icon);
  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Upload);
  Vue.use(Progress);
  Vue.use(Badge);
  Vue.use(Card);
  Vue.use(Rate);
  Vue.use(Steps);
  Vue.use(Step);
  Vue.use(Carousel);
  Vue.use(CarouselItem);
  Vue.use(Collapse);
  Vue.use(CollapseItem);
  Vue.use(Cascader);
  Vue.use(ColorPicker);
  Vue.use(Container);
  Vue.use(Header);
  Vue.use(Aside);
  Vue.use(Main);
  Vue.use(Footer);
  
  Vue.use(Loading.directive);
  
  Vue.prototype.$loading = Loading.service;
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
  Vue.prototype.$notify = Notification;
  Vue.prototype.$message = Message;






