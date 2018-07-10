◆'Component'内置组件: 可通过组合基础组件进行快速开发 
  PS: 遵守H5的属性使用原则,当布尔值的属性只用写属性名即表示为'true' ? 
  ★视图组件 
  <view>         视图容器 
    hover-stop-propagation='<bol>' 是否阻止节点的祖先节点出现点击态,默认:false  '1.5.0+' ? 
    hover-class="<str>"   指定点击后的样式类 
      "none"   默认值,没有点击态效果 
    hover-start-time="<num>"  点击后多久出现点击态,单位ms,默认: 50  
    hover-stay-time="<num>"   手指松开后点击态保留时间,单位ms,默认: 400
  <swiper>       滑块视图容器/轮播组件 
    PS: 其中只能放置<swiper-item>组件,否则会导致未定义的行为 
    indicator-dots="bol"           是否显示面板指示点,默认:false  
    indicator-color='color'        指示点颜色,默认:rgba(0,0,0,0.3) '1.1.0+' 
    indicator-active-color="color" 当前选中的指示点颜色,默认:#000  '1.1.0+'
    autoplay="bol"  是否自动切换,默认:false   
    interval="num"  自动切换时间间隔,默认:5000 
    circular="bol"    是否采用衔接滑动,默认:false   
    duration="num"    滑动动画时长,默认:500  
    vertical="bol"  是否改为纵向滑动方向,默认:false 
    current="num"      当前所在页面的index,默认:0  
    bind:change="fn"   'current'改变时触发'change'事件 
      event 
        .detail 
          .current 
          .source  // kw,表示导致变更的原因 ['1.4.0+']
            'autoplay' 自动播放导致swiper变化 
            'touch'    用户划动引起swiper变化  
            ''         其他原因 
      若在'bindchange'事件中使用setData改变current值,有可能导致setData被不停地调用,
        因而通常情况下请不要这样使用 
    <swiper-item>  轮播中一帧的页面 
      PS: 仅可放置在<swiper>组件中,宽高自动设置为100%;
        通常以循环的方式加载到页面中 
        通过在每一个的 swiper-item 外面包上一个链接标签,以超链接的方式跳转页面 
      Example: 
        main.wxml
        <view>
          <swiper class="swiper_box" 
          indicator-dots="{{indicatorDots}}" 
          vertical="{{vertical}}" 
          autoplay="{{autoplay}}" 
          interval="{{interval}}" 
          duration="{{duration}}" 
          bind:change="swiperchange">
            <block wx:for="{{images}}">
              <swiper-item>
                <image src="{{item.picurl}}" class="slide-image"/>
              </swiper-item>
            </block>
          </swiper>
        </view>
        main.js
        var app = getApp()    //获取应用实例
        Page({
          data: {
            indicatorDots: true
            ,vertical: true
            ,autoplay: true
            ,interval: 3000
            ,duration: 1000
            ,loadingHidden: false  // loading
          }
          //事件处理函数
          ,swiperchange: function(e) { //  轮播 改变时会触发的 change 事件
          }
          ,onLoad: function() {
            console.log('onLoad')
            var that = this
            //sliderList
            wx.request({
              url: 'http://huanqiuxiaozhen.com/wemall/slider/list',
              method: 'GET',
              data: {},
              header: {
                'Accept': 'application/json'
              },
              success: function(res) {
                that.setData({
                  images: res.data
                })
              }
            })
          }
        })
  <scroll-view>  可滚动视图区域 
    PS: 不可在组件内中使用 textarea/map/canvas/video 组件 
    scroll-x="<bol>"    横向滚动,默认:false 
    scroll-y="<bol>"    纵向滚动,默认:false 
      需设定固定高度,可通过WXSS设置 height  
    scroll-with-animation="<bol>" 在设置滚动条位置时使用动画过渡,默认: false  
    enable-back-to-top="<bol>"   滚动条返回顶部,默认: false 
      iOS点击顶部状态栏,安卓双击标题栏时,只支持竖向;
      当页面存在多个<scroll-veiw>时,全部都返回顶部 
    scroll-left="<num>"    设置横向滚动条位置,单位:px 
      范围:0-(内容宽-视区宽),大于最大值取最大值,小于最小值取最小值  
    scroll-top="<num>"     设置纵向滚动条位置,单位:px 
      范围:0-(内容宽-视区高),大于最大值取最大值,小于最小值取最小值  
    scroll-into-view="<str>"   将元素滚动到可视区,值应为某后代元素的id 
      默认将匹配的元素置于可视区头部 
      优先级高于'scroll-top'
      设置哪个方向可滚动,则在哪个方向滚动到该元素 
    upper-threshold="<num>"   距顶/左部触发'scrolltoupper'事件的距离,单位:px,默认: 50  
    lower-threshold="<num>"   距底/右部触发'scrolltolower'事件的距离,单位:px,默认: 50  
    bind:scrolltoupper="<fn>" 绑定'scrolltoupper'事件 
    bind:scrolltolower="<fn>" 绑定'scrolltolower'事件 
    bind:scroll="<fn>"        滚动时触发 
      event  
        .detail  
          .scrollLeft   // 左滚动的距离 
          .scrollTop    // 上滚动的距离 
          .scrollHeight // 滑动区高度 
          .scrollWidth  // 滑动区宽度 
          .deltaX       // 水平方向滚动的增量 
          .deltaY       // 竖直方向滚动的增量 
    <scroll-view>的滚动会阻止页面回弹,无法触发'onPullDownRefresh' 
      若要使用下拉刷新,请使用页面的滚动[能通过点击顶部状态栏回到页面顶部],而非<scroll-view> 
    Accu:  
      子组件需超出视图范围,否则无法滚动 
      该组件使用 display: flex; 无效  
      竖向滚动时,需固定高度 
      横向滚动时 
        该组件需要使其子元素保持横向排列 
          white-space: nowrap; 
        子组件需要进行横向排列  
          dislay: inline-block; 
  <movable-area> <movable-view>的可移动区域 '1.2.0+' 
    PS: 需设置宽高,否则默认10px; 作为<movable-view>的父元素  
      可同时容纳多个<movable-view>组件 
    scale-area="bol"   默认:false  '1.9.90+'
      当里面的<movable-view>设置为支持双指缩放时,
      设置此值可将缩放手势生效区域修改为整个movable-area  
    <movable-view> 可拖拽滑动的视图容器 '1.2.0+' 
      PS: 宽高默认10px;默认为绝对定位,top和left属性为0px 
        必须作为<movable-area>的子节点使用,否则不能移动 
        当小于<movable-area>时,移动范围是在<movable-area>内；
        当大于<movable-area>时,移动范围为包含<movable-area> 
      x="num/str"    x轴偏移量,改变值会触发动画 
        PS: 如果x的值不在可移动范围内,会自动移动到可移动范围 
      y="num/str"    y轴偏移量,改变值会触发动画 
        PS: 如果y的值不在可移动范围内,会自动移动到可移动范围 
      direction="KW"   可移动的方向 
        'none'  默认
        'all'
        'vertical'
        'horizontal'
      inertia="bol"    是否移动带有惯性,默认:false  
      out-of-bounds="bol"   超过可移动区域后,movable-view是否还可以移动,默认:false 
      damping="num"   阻尼系数,用于控制过界回弹的动画,值越大移动越快,默认:20  
      friction="num"  摩擦系数,用于控制惯性滑动的动画,值越大滑动越快停止,默认:2  
        必须大于0,否则会被设置成默认值
      disabled="bol"  是否禁用,默认:false  '1.9.90+'
      scale="false"      是否支持双指缩放,默认:false  '1.9.90+'
        默认缩放手势生效区域是在movable-view内  
      scale-min="num"    定义缩放倍数最小值,默认:0.5  '1.9.90+'
      scale-max="num"    定义缩放倍数最大值,默认:10  '1.9.90+'
      scale-value="num"  定义缩放倍数,默认:1 '1.9.90+'
        取值范围: 0.5 - 10  
      animation="bol"    是否使用动画,默认:true   '2.1.0+'
      bind:change="fn"   拖动过程中触发的事件  '1.9.90+'
        event 
          .detail 
            .x 
            .y  
            .source   KW,产生移动的原因
              'touch'                拖动
              'touch-out-of-bounds'  超出移动范围
              'out-of-bounds'        超出移动范围后的回弹
              'friction'             惯性 
              ''  
      bind:scale="fn"    缩放过程中触发的事件
        event  
          .detail 
            .x    '2.1.0+'
            .y    '2.1.0+'
            .scale  
  <cover-view>   覆盖在原生组件上的文本视图  '1.4.0+' 
    PS: 可覆盖的原生组件包括<map><video><canvas>,支持嵌套 
      文本建议都套上<cover-view>标签,避免排版错误 
  <cover-image/> 覆盖在原生组件之上的图片视图 '1.4.0+' 
    PS: 可覆盖的原生组件同<cover-view>,避免嵌套在其他组件内 
      支持嵌套在<cover-view>里 
      事件模型遵循冒泡模型,但不会冒泡到原生组件 
      只支持基本的定位、布局、文本样式。不支持设置单边的border、opacity、background-image等。
      建议子节点不要溢出父节点
      暂不支持css动画 
    src  图标路径,支持临时路径,暂不支持base64与网络地址 
  ★基础内容 
  <icon/>   图标 
    type="KW"   icon的类型 
      'success'
      'success_no_circle'
      'info'
      'warn'
      'waiting'
      'cancel'
      'download'
      'search'
      'clear'
    size="num"  icon的大小,单位:px,默认:23 
    color=""    icon的颜色 
  <text>    文本 
    PS: <text>组件内只支持<text>嵌套;除了文本节点以外的其他节点都无法长按选中;
      各个操作系统的空格标准并不一致 
      长按复制功能尚未实现
    selectable="bol"  是否文本可选,默认:false  '1.1.0+' 
    decode="bol"  是否解码,默认:false '1.4.0+' 
      可解析的有 '&nbsp;' '&lt;' '&gt;' '&amp;' '&apos;' '&ensp;' '&emsp;'
    space="KW"   显示连续空格及方式  '1.4.0+' 
      'false' 默认值,不显示连续空格 
      'ensp'  中文字符空格一半大小 
      'emsp'  中文字符空格大小 
      'nbsp'  根据字体设置的空格大小 
  <rich-text>  富文本 '1.4.0+' 
    PS: 组件内屏蔽所有节点的事件 
      如果使用了不受信任的HTML节点,该节点及其所有子节点将会被移除;img 标签仅支持网络图片 
    nodes="arr/str"  节点列表或HTMLStr,默认值:[] 
      PS: 推荐使用arr类型,组件会将str类型转换为arr,因而性能会有所下降 
      现支持两种节点: 
      ★type="node" 元素节点,默认值 
      name      str,标签名,支持部分受信任的HTML节点,必选[大小写不敏感] 
        'img'           alt,src,height,width
        'ol'            start,type
        'table'         width
        'th'            colspan,height,rowspan,width
        'td'            colspan,height,rowspan,width
        'colgroup'      span,width
        'col'           span,width
        'tbody' 
        'tfoot' 
        'thead' 
        'tr' 
        'a' 
        'abbr' 
        'b' 
        'blockquote' 
        'br' 
        'code' 
        'dd' 
        'del' 
        'div' 
        'dl' 
        'dt' 
        'em' 
        'fieldset' 
        'h1' 
        'h2' 
        'h3' 
        'h4' 
        'h5' 
        'h6' 
        'hr' 
        'i' 
        'ins' 
        'label' 
        'legend' 
        'li' 
        'p' 
        'q' 
        'span' 
        'strong' 
        'sub' 
        'sup' 
        'ul'
      attrs     obj,属性 
        PS: 支持部分受信任的属性,如class和style,不支持id属性 
        {
          'class' : '',
          'style' : '',
        }
      children  arr,子节点列表,结构和'nodes'一致 
        [
          {
            
          }
        ]
      ★type="text" 文本节点 
      text      str,文本,必选 
    Example: 
      <rich-text nodes="{{nodes}}" bindtap="tap"></rich-text>
      Page({
        data: {
          nodes: [
            {
              type : 'node',
              name: 'div',
              attrs: {
                class: 'div_class',
                style: 'line-height: 60px; color: red;'
              },
              children: [
                {
                  type: 'text',
                  text: 'Hello&nbsp;World!'
                }
              ]
            }
          ]
        },
        tap() {
          console.log('tap')
        }
      })
    支持默认事件,包括：'tap''touchstart''touchmove''touchcancel''touchend'和'longtap' 
  <progress>   进度条 
    percent="float"    百分比,范围:0-100  
    show-info ="bol"   是否在进度条右侧显示百分比,默认: false 
    stroke-width="num" 进度条线的宽度,单位:px,默认:6 
    color=""           进度条颜色,默认:'#09BB07' 
    activeColor=""     已选择的进度条的颜色
    backgroundColor="" 未选择的进度条的颜色
    active =""         进度条从左往右的动画,默认:false  
  <navigator>  页面链接 
    url="path"    跳转链接 
      相对地址,'./'表示当前页面 
    open-type="KW"     跳转方式 
      'navigate'  对应 wx.navigateTo() 的功能,默认值  
      'redirect'  对应 wx.redirectTo() 的功能 
      'switchTab' 对应 wx.switchTab() 的功能 
        PS: 打开tabBar中对应的页面必须使用该方式
      'reLaunch'  对应 wx.reLaunch() 的功能 ['1.1.0+'] 
      'navigateBack' 对应wx.navigateBack()的功能 ['1.1.0+'] 
    delta="num"   表示回退的层数[当'open-type'为'navigateBack'时有效] 
    hover-class="" 指定点击时的样式类 
      'navigator-hover' 默认值 
        {background-color: rgba(0, 0, 0, 0.1); opacity: 0.7;} 
      "none"      没有点击态效果 
    hover-stop-propagation="bol" 是否阻止本节点的祖先节点出现点击态,默认:false '1.5.0+' 
    hover-start-time="num"   按住后多久出现点击态,单位:ms,默认:50  
    hover-stay-time="num"    手指松开后点击态保留时间,单位:ms,默认:600 
  ★表单组件 
  <form>   表单 
    PS: 当点击<form>内'formType'为'submit'的<button>组件时,会提交表单 
    report-submit  是否返回formId用于发送模板消息 
    bindsubmit   foo,携带form中的数据触发'submit'事件 
      event.detail = {value : {'name': 'value'} , formId: ''} 
    bindreset    foo,表单重置时会触发'reset'事件 
  <input/> 输入框 
    PS: <input>组件是native组件,字体是系统字体,所以无法设置 
      在<input>聚焦期间,避免使用css动画；
    value="str"  input值 
    type="KW"   input类型  
      'text'   文本输入键盘,默认 
      'number' 数字输入键盘
      'idcard' 身份证输入键盘
      'digit'  带小数点的数字键盘
    password="bol"     是否是密码类型,默认:false 
    placeholder="str"  输入框为空时占位符 
      微信版本'6.3.30', placeholder 在聚焦时出现重影问题；
    placeholder-style="str" 指定'placeholder'的样式 
    placeholder-class="str" 指定'placeholder'的样式类 
      "input-placeholder" 默认 
    disabled="bol"   是否禁用,默认:false 
    maxlength="num"  最大输入长度,默认:140  
      设置为 -1 的时候不限制最大长度 
    cursor-spacing="num"  指定光标与键盘的距离,单位:px ,默认:0 
      取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离 
    auto-focus="bol"  自动聚焦,拉起键盘,默认:false  [即将废弃,请直接使用 focus] 
    focus="bol"   是否获取焦点,默认:false 
      微信版本'6.3.30', focus 属性设置无效；
    confirm-type="str"  设置键盘右下角按钮的文字 '1.1.0+' 
      "done"   '完成',默认  
      'send'   '发送' 
      'search' '搜索' 
      'next'   '下一个' 
      'go'     '前往' 
    confirm-hold="bol"  点击键盘右下角按钮时是否保持键盘不收起,默认:false  '1.1.0+' 
    cursor="num"        指定focus时的光标位置 '1.5.0+'  
    bind:input="fn"   当键盘输入时,触发'input'事件
      函数的返回值将替换输入框的内容 
      event.detail = {value, cursor}
    bind:focus="fn"   输入框聚焦时触发 
      event.detail = {value: value} 
    bind:blur="fn"    输入框失去焦点时触发 
      e.detail.value  输入框的值 
    bind:confirm="fn" 点击完成按钮时触发 
      event.detail = {value: value}
  <checkbox-group>  多项选择器,内部由多个<checkbox>组成 
    bindchange foo,选中项发生改变时触发'change'事件
      detail = {value:[选中的checkbox的value的数组]}
  <checkbox/>       多选项目 
    value     值 
    disabled  是否禁用,默认'false' 
    checked   当前是否选中,可用来设置默认选中,默认'false' 
    color     checkbox的颜色 
  <radio-group>  单项选择器,内部由多个<radio/>组成 
    bindchange foo,选中项发生变化时触发'change'事件 
      event.detail = {value: 选中项radio的value}
  <radio>  单选项目 
    value     值 
    checked   当前是否选中,默认'false' 
    disabled  是否禁用,默认'false' 
    color     radio的颜色,同css的color
  <picker>  从底部弹起的滚动选择器 [原生组件] 
    ★共有属性 
      bind:change="fn" value改变时触发'change'事件 
        event.detail = {value: value}
      disabled   是否禁用,默认'false' 
    ★现支持五种选择器: 
    普通选择器[默认值]: mode="selector"  
      range="arr/objArr"    默认: [] 
      range-key="str"  当'range'是objArr时,指定对象中key的值作为选择器显示内容 
      value="num"      表示选择了'range'中的第几个[下标从0开始],默认:0 
    时间选择器: mode='time' 
      value="time"   选中的时间,格式:"hh:mm" 
      start="time"   有效时间范围的开始,格式:"hh:mm" 
      end="time"     有效时间范围的结束,格式:"hh:mm" 
    日期选择器: mode='date' 
      value="time"  选中的日期,格式:"YYYY-MM-DD",默认:0 
      start="time"  有效日期范围的开始,格式:"YYYY-MM-DD" 
      end="time"    有效日期范围的结束,格式:"YYYY-MM-DD" 
      fields="KW"   选择器的粒度 
        'day'   选择器粒度为天,默认值 
        'year'  选择器粒度为年 
        'month' 选择器粒度为月份 
    省市区选择器: mode='region' '1.4.0+' 
      value="str"        选中的省市区,默认:每一列的第一个值 
      custom-item="str"  可为每一列的顶部添加一个自定义的项 '1.5.0+' 
    多列选择器: mode='multiSelector' '1.4.0+' 
      range="arrArr"    二维数组,长度表示多少列,数组的每项表示每列的数据,默认:[]  
        如: [
          ["a","b"]
          ,["c","d"]
        ]
      range-key="str"   指定数组中对象的key值作为选择器显示内容 
      value="numArr"    数组的元素表示选择了range对应项中的第几个,下标从0开始,默认:[] 
      bind:columnchange="fn"  某一列的值改变时触发'columnchange'事件
        event 
          .detail 
            .column   表示改变了第几列,下标从0开始 
            .value    表示变更值的下标 
    Accu: 
      内部放置需其他节点,用于激活picker 
  <slider>  滑动选择器 
    min   最小值,默认'0' 
    max   最大值,默认'100' 
    step  步长,取值必须大于0,并且可被(max-min)整除,默认'1'
    disabled  是否禁用,默认'false'
    value     当前取值,默认'0' 
    color           背景条的颜色[请使用'backgroundColor'],默认'#e9e9e9'
    selected-color  已选择的颜色[请使用'activeColor'],默认'#1aad19'
    activeColor     已选择的颜色,默认'#1aad19' 
    backgroundColor 背景条的颜色,默认'#e9e9e9' 
    show-value      是否显示当前value,默认'false' 
    bindchange    foo,完成一次拖动后触发的事件
      event.detail = {value: value}
  <_switch>  开关选择器 
    PS: switch切换在iOS自带振动反馈,可在系统设置 -> 声音与触感 -> 系统触感反馈中关闭 
    checked="bol"    是否选中,默认:false 
    type="KW"        样式
      'switch'   默认 
      'checkbox'  
    color=""         switch颜色,同css的color
    bind:change="fn" checked改变时触发'change'事件
      event 
        .detail 
          .value  
  <textarea> 多行输入框 
    PS: 微信版本'6.3.30',列表渲染时,新增加的<textarea>在自动聚焦时的位置计算错误 
      <textarea>的blur事件会晚于页面上的tap事件,
      如果需要在<button>的点击事件获取textarea,可以使用form的bindsubmit。
      不建议在多行文本上对用户的输入进行修改,
      所以textarea的bindinput处理函数并不会将返回值反映到textarea上
      textarea组件是由客户端创建的原生组件,它的层级是最高的。
      请勿在scroll-view中使用 textarea 组件。
      css动画对textarea组件无效
    value   输入框的内容 
    placeholder         输入框为空时占位符 
    placeholder-style   指定'placeholder'的样式 
    placeholder-class   指定'placeholder'的样式类 
      'textarea-placeholder'  默认 
    disabled   是否禁用,默认'false' 
    maxlength   最大输入长度,设置为'-1'的时候不限制最大长度,默认'140'  
    auto-focus  自动聚焦,拉起键盘,默认'false' 
    focus       获取焦点,默认'false'  
    auto-height 是否自动增高,设置auto-height时,style.height 不生效,默认'false'  
    fixed      如果textarea是在一个position:fixed的区域,需要显示指定属性fixed为true,默认'false' 
    cursor-spacing   指定光标与键盘的距离,单位px,默认'0' 
      取textarea距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离  
    cursor         num,指定focus时的光标位置 '1.5.0+'
    bindfocus foo,输入框聚焦时触发 
      event.detail = {value: value} 
    bindblur  foo,输入框失去焦点时触发 
      event.detail = {value: value} 
    bindlinechange foo,输入框行数变化时调用 
      event.detail = {height: 0, heightRpx: 0, lineCount: 0} 
    bindinput      foo,当键盘输入时,触发'input'事件 
      event.detail = {value, cursor}, bindinput 处理函数的返回值并不会反映到 textarea 上 
    bindconfirm    foo,点击完成时,触发'confirm'事件 
      event.detail = {value: value}
  <label>    用来改进表单组件的可用性 
    PS: 使用for属性找到对应的id,或者将控件放在该标签下,当点击时,就会触发对应的控件 
      for优先级高于内部控件,内部有多个控件的时候默认触发第一个控件 
      目前可以绑定的控件有：<button/>, <checkbox/>, <radio/>, <'switch'>。
    for   绑定控件的id 
  <button> 按钮 
    size="<kw>"   按钮大小   
      'default'  默认 
      'mini'
    type="<kw>"   按钮样式类型   
      'default'   默认 
      'primary' 
      'warn'
    plain="bol"   按钮是否镂空,背景色透明,默认:false 
    disabled="bol"  是否禁用,默认:false  
    loading="bol"   名称前是否带'loading'图标,默认:false 
    form-type="kw" 点击对表单产生的效果 
      点击分别会触发<form>组件的submit/reset事件 
      'submit' 提交表单
      'reset'  重置表单
    hover-class="kw/str" 指定按钮按下去的样式类   
      'button-hover'   默认值 
        {background-color: rgba(0, 0, 0, 0.1); opacity: 0.7;}
      "none"           无点击态效果 
    hover-stop-propagation="bol"  指定是否阻止本节点的祖先节点出现点击态,默认:false '1.5.0+'
    hover-start-time="20"   按住后多久出现点击态,单位:ms,默认:20  
    hover-stay-time="70"   手指松开后点击态保留时间,单位:ms,默认:70   
    open-type="kw"       微信开放能力 '1.1.0+'  
      "getPhoneNumber" 获取用户手机号,可从'bindgetphonenumber'回调用获取到用户信息,解包方式
      "getUserInfo"    获取用户信息
        从'bindgetuserinfo'事件回调中获取到用户信息   
      'contact'        打开客服会话 
      'share'          触发用户转发 
    session-from       str,会话来源 '1.4.0+' 
    send-message-title str,会话内消息卡片标题,默认为当前标题 '1.5.0+' 
    send-message-path  str,会话内消息卡片点击跳转小程序路径,默认当前分享路径 
    send-message-img   str,会话内消息卡片图片,默认为当前截图 
    show-message-card  显示会话内消息卡片,默认:false  
    bind:getphonenumber="fn" 获取用户手机号回调 '1.2.0+' 
    bind:getuserinfo="fn"    用户点击该按钮时,会返回获取到的用户信息 '1.3.0+' 
      从返回参数的detail中获取到的值同 wx.getUserInfo  
    bind:contact="fn"        客服消息回调 
  ★媒体组件 
  <image/> 图片 
    PS: 默认宽高: 300px,225px
    src="path"   图片资源地址 
    mode="KW"   图片裁剪、缩放的模式 
      mode 有 13 种模式,其中 4 种是缩放模式,9 种是裁剪模式 
      ★缩放 
      'scaleToFill' 拉伸填满image,默认值 
      'aspectFit'   完整显示图片,保持纵横比缩放,图片长边完全显示 
      'aspectFill'  填满image,保持纵横比缩放,图片短边完全显示 
        也就是说,图片通常只在水平或垂直方向是完整的,另一个方向将会发生截取。
      'widthFix'    宽度不变,高度自动变化,保持原图宽高比不变?  
      ★裁剪,不缩放图片  
      'top'          只显示图片的顶部区域
      'bottom'       只显示图片的底部区域
      'center'       只显示图片的中间区域
      'left'         只显示图片的左边区域
      'right'        只显示图片的右边区域
      'top left'     只显示图片的左上边区域
      'top right'    只显示图片的右上边区域
      'bottom left'  只显示图片的左下边区域
      'bottom right' 只显示图片的右下边区域
    lazyload="bol"   是否图片懒加载,默认:false '1.5.0+' 
      PS: 只在<page>与<scroll-view>下生效 
    bind:error="fn" 当错误发生时触发 
      event 
        .detail 
          .errMsg  
    bind:load="fn"  当图片载入完毕时触发  
      event 
        .detail 
          .height 图片高,单位:px 
          .width  图片宽,单位:px
  <audio> 音频 
    id       组件的唯一标识符
    src      要播放音频的资源地址
    loop     是否循环播放,默认'false' 
    controls 是否显示默认控件,默认'true' 
    poster   默认控件上的音频封面的图片资源地址[需'controls'为true] 
    name     默认控件上的音频名字,默认'未知音频'[需'controls'为true] 
    author   默认控件上的作者名字,默认'未知作者'[需'controls'为true] 
    binderror      foo,当发生错误时触发'error'事件 
      detail = {errMsg: MediaError.code}
      MediaError.code
      MEDIA_ERR_ABORTED 获取资源被用户禁止
      MEDIA_ERR_NETWORD 网络错误
      MEDIA_ERR_DECODE 解码错误
      MEDIA_ERR_SRC_NOT_SUPPOERTED 不合适资源
    bindplay       foo,当开始/继续播放时触发'play'事件 
    bindpause      foo,当暂停播放时触发'pause'事件 
    bindtimeupdate foo,当播放进度改变时触发'timeupdate'事件 
      detail = {currentTime, duration}
    bindended      foo,当播放到末尾时触发'ended'事件 
  <video> 视频 [原生组件] 
    PS: video标签认宽度300px、高度225px,设置宽高需要通过wxss设置width和height 
      video 组件是由客户端创建的原生组件,它的层级是最高的,不能通过 z-index 控制层级 ? 
      请勿在scroll-view中使用video组件
      css动画对video组件无效 
    src="path"      视频资源地址 
      不可使用本地资源,否则会出现bug   
    // 播放相关 
    autoplay="bol"  是否自动播放,默认:false 
    loop="bol"      是否循环播放,默认:false '1.4.0+' 
    muted="bol"     是否静音播放,默认:false '1.4.0+' 
    duration="num"     指定视频时长 '1.1.0+' 
    initial-time="num"  指定视频初始播放位置 '1.6.0' 
    // 外观|显示 
    poster="url"     视频封面的图片网络资源地址['controls'需为true]
    objectFit="KW"   当视频大小与video容器大小不一致时,视频的表现形式 
      'contain'  包含,默认值 
      'fill'     填充
      'cover'    覆盖 
    controls="bol"    是否显示默认播放控件[播放/暂停按钮、播放进度、时间],默认:true  
    enable-danmu="bol"  是否展示弹幕,默认:false 
      只在初始化时有效,不能动态变更 
    danmu-btn="bol"     是否显示弹幕按钮,默认:false 
      只在初始化时有效,不能动态变更
    danmu-list="[{text,color,time}]"     弹幕列表 
    direction="kw"  设置全屏时视频的方向,不指定则根据宽高比自动判断 '1.7.0+' 
      0   正常竖向
      90  屏幕逆时针90度 
      -90 屏幕顺时针90度  
    page-gesture="bol"   在非全屏模式下,是否开启亮度与音量调节手势,默认:false '1.6.0+' 
    show-progress="bol"  若不设置,宽度大于240时才会显示,默认:true '1.9.0+' 
    show-fullscreen-btn="bol"   是否显示全屏按钮,默认:true  '1.9.0+' 
    show-play-btn="bol"    是否显示视频底部控制栏的播放按钮,默认:true  '1.9.0+' 
    show-center-play-btn="bol"     是否显示视频中间的播放按钮,默认:true  '1.9.0+' 
    enable-progress-gesture="bol"  是否开启控制进度的手势,默认:true  '1.9.0+' 
    bind:play="fn"       开始/继续播放时触发 
    bind:pause="fn"      暂停播放时触发 
    bind:ended="fn"      播放到末尾时触发 
    bind:timeupdate="fn" 播放进度变化时触发[触发频率约250ms/次]
      event 
        .detail 
          .currentTime  当前播放时间 
    bind:fullscreenchange="fn" 进入/退出全屏是触发 '1.4.0+'
      event  
        .detail  
          .fullScreen  当前全屏状态 
          .direction    
            'vertical'   
            'horizontal' 
    bind:waiting="fn"    视频出现缓冲时触发  '1.7.0+'
    bind:error="fn"      视频播放出错时触发  '1.7.0+'    
    Accu: 
      video组件会和其后面的同级元素产生缝隙 
        演示代码
          <video></video>
          <view style="height:100rpx;background-color:red;"></view>
  <camera> 系统相机[原生组件] '1.6.0+' 
    PS: 同一页面只能插入一个 camera 组件 
      请勿在 scroll-view、swiper、picker-view、movable-view 中使用 camera 组件。
      需要用户授权 scope.camera
    mode="KW"   调用相机的功能    '2.1.0+'
      'normal'    默认值 
      'scanCode'  扫码 
    device-position="KW"  前置/后置摄像头 
      'back'  后置摄像头,默认  
      'front' 前置摄像头 
    flash="KW"   闪光灯状态 
      'auto'  默认 
      'on'    
      'off'   
    scan-area="[x, y, w, h]"   扫码识别区域 '2.1.0+'
      PS: 仅在 mode="scanCode" 时生效 
        目前存在识别区域不准的问题,建议先不指定
      x,y 相对于camera显示区域的左上角; w,h 为区域宽度,单位:px
    bind:stop="fn"   摄像头在非正常终止时触发,如退出后台等情况 
    bind:error="fn"  用户不允许使用摄像头时触发 
    bind:scancode="fn"  成功识别到一维码时触发 '2.1.0+'
      仅在 mode="scanCode" 时生效 
    Example: 
      <!-- camera.wxml -->
      <camera device-position="back" flash="off" binderror="error" ></camera>
      <button type="primary" bindtap="takePhoto">拍照</button>
      <view>预览</view>
      <image mode="widthFix" src="{{src}}"></image>
      // camera.js
      Page({
        takePhoto: function(){
          const ctx = wx.createCameraContext()
          ctx.takePhoto({
            quality: 'high',
            success: (res) => {
              this.setData({
                src: res.tempImagePath
              })
            }
          })
        }
        ,error: function(){
          console.log(e.detail)
        }
      })
  <live-player> 实时音视频播放 
  <canvas> 画布 [原生组件] 
    PS: 由客户端创建的原生组件,它的层级是最高的; 默认宽度300px、高度225px 
      css 动画对 canvas 组件无效 
      请勿在 scroll-view 中使用 canvas 组件 
    canvas-id="<str>"     必选,组件的唯一标识符 
      同一页面中的 canvas-id 不可重复,
      如果使用一个已经出现过的 canvas-id,该 canvas 标签对应的画布将被隐藏并不再正常工作
    disable-scroll="bol" 当在canvas中移动时且有绑定手势事件时,禁止屏幕滚动以及下拉刷新,默认:false  
    bind:touchstart="fn"  手指触摸动作开始
    bind:touchmove="fn"   手指触摸后移动
    bind:touchend="fn"    手指触摸动作结束
    bind:touchcancel="fn" 手指触摸动作被打断,如来电提醒,弹窗
    bind:longtap="fn"     手指长按'500ms'之后触发,触发了长按事件后进行移动不会触发屏幕的滚动
    bind:error="fn"       当发生错误时触发'error'事件
      detail = {errMsg: 'something wrong'}
  <map> 地图 [原生组件] 
    PS: 客户端创建的原生组件,它的层级是最高的
      请勿在 scroll-view 中使用 map 组件。 css 动画对 map 组件无效。
      map 组件使用的经纬度是火星坐标系,调用 wx.getLocation 接口需要指定 type 为 gcj02
      地图组件的经纬度必选, 如果不填经纬度则默认值是北京的经纬度。
    longitude    num,中心经度 
    latitude     num,中心纬度 
    scale    缩放级别,取值范围为'5-18',默认'16'  
    markers  arr,标记点 
    covers   arr,即将移除,请使用markers 
    polyline arr,路线 
    circles  arr,圆 
    controls arr,控件 
    include-points arr,缩放视野以包含所有给定的坐标点 
    show-location bol,显示带有方向的当前定位点 
    bindmarkertap    foo,点击标记点时触发 
    bindcallouttap   foo,点击标记点对应的气泡时触发 '1.2.0+'
    bindcontroltap   foo,点击控件时触发 
    bindregionchange foo,视野发生变化时触发 
    bindtap          foo,点击地图时触发
    markers  标记点用于在地图上显示标记的位置
      属性 说明 类型 必选 备注 最低版本
      id 标记点id Number 否 marker点击事件回调会返回此id 
      latitude 纬度 Number 是 浮点数,范围 -90 ~ 90 
      longitude 经度 Number 是 浮点数,范围 -180 ~ 180 
      title 标注点名 str 否  
      iconPath 显示的图标 str 是 项目目录下的图片路径,支持相对路径写法,以'/'开头则表示相对小程序根目录；也支持临时路径 
      rotate 旋转角度 Number 否 顺时针旋转的角度,范围 0 ~ 360,默认为 0 
      alpha 标注的透明度 Number 否 默认1,无透明 
      width 标注图标宽度 Number 否 默认为图片实际宽度 
      height 标注图标高度 Number 否 默认为图片实际高度 
      callout 自定义标记点上方的气泡窗口 Object 否 {content, color, fontSize, borderRadius, bgColor, padding, boxShadow, display} 1.2.0
      label 为标记点旁边增加标签 Object 否 {color, fontSize, content, x, y},可识别换行符,x,y原点是marker对应的经纬度 1.2.0
      anchor 经纬度在标注图标的锚点,默认底边中点 Object 否 {x, y},x表示横向(0-1),y表示竖向(0-1)。{x: .5, y: 1} 表示底边中点 1.2.0
    marker   上的气泡 callout
    content  文本 str
      color 文本颜色 str
      fontSize 文字大小 Number
      borderRadius callout边框圆角 Number
      bgColor 背景色 str
      padding 文本边缘留白 Number
      display 'BYCLICK':点击显示; 'ALWAYS':常显 str
    polyline 指定一系列坐标点,从数组第一项连线至最后一项
      points 经纬度数组 Array 是 [{latitude: 0, longitude: 0}] 
      color 线的颜色 str 否 8位十六进制表示,后两位表示alpha值,如：#000000AA 
      width 线的宽度 Number 否  
      dottedLine 是否虚线 Boolean 否 默认false 
      arrowLine 带箭头的线 Boolean 否 默认false,开发者工具暂不支持该属性 1.2.0
      borderColor 线的边框颜色 str 否  1.2.0
      borderWidth 线的厚度 Number 否  1.2.0
    circles 在地图上显示圆
      latitude 纬度 Number 是 浮点数,范围 -90 ~ 90
      longitude 经度 Number 是 浮点数,范围 -180 ~ 180
      color 描边的颜色 str 否 8位十六进制表示,后两位表示alpha值,如：#000000AA
      fillColor 填充颜色 str 否 8位十六进制表示,后两位表示alpha值,如：#000000AA
      radius 半径 Number 是 
      strokeWidth 描边的宽度 Number 否
    controls 在地图上显示控件,控件不随着地图移动
      id 控件id Number 否 在控件点击事件回调会返回此id
      position 控件在地图的位置 Object 是 控件相对地图位置
      iconPath 显示的图标 str 是 项目目录下的图片路径,支持相对路径写法,以'/'开头则表示相对小程序根目录；也支持临时路径
      clickable 是否可点击 Boolean 否 默认不可点击
    position 
      left 距离地图的左边界多远 Number 否 默认为0
      top 距离地图的上边界多远 Number 否 默认为0
      width 控件宽度 Number 否 默认为图片宽度
      height 控件高度 Number 否 默认为图片高度
  ★开放能力 
  <web-view> 承载网页的容器 '1.6.4+' // TODO: 
    PS: 会自动铺满整个小程序页面; 个人类型与海外类型的小程序暂不支持使用 
    属性名      类型  默认值  说明
    src="str"   webview指向网页的链接 [需登录小程序管理后台配置域名白名单]
    bindmessage="fn"   网页向小程序 postMessage 时,会在特定时机[小程序后退、组件销毁、分享]触发并收到消息。e.detail = { data }
    示例代码：
    
    <!-- wxml -->
    <!-- 指向微信公众平台首页的web-view -->
    <web-view src="https://mp.weixin.qq.com/"></web-view>
    相关接口 1
    <web-view/>网页中可使用JSSDK 1.3.2提供的接口返回小程序页面。 支持的接口有：
    
    接口名  说明  最低版本
    wx.miniProgram.navigateTo  参数与小程序接口一致  1.6.4
    wx.miniProgram.navigateBack  参数与小程序接口一致  1.6.4
    wx.miniProgram.switchTab  参数与小程序接口一致  1.6.5
    wx.miniProgram.reLaunch  参数与小程序接口一致  1.6.5
    wx.miniProgram.redirectTo  参数与小程序接口一致  1.6.5
    wx.miniProgram.postMessage  向小程序发送消息  1.7.1
    wx.miniProgram.getEnv  获取当前环境  1.7.1
    示例代码：
    
    在开发者工具中预览效果
    
    <!-- html -->
    <script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"></script>
    
    // javascript
    wx.miniProgram.navigateTo({url: '/path/to/page'})
    wx.miniProgram.postMessage({ data: 'foo' })
    wx.miniProgram.postMessage({ data: {foo: 'bar'} })
    wx.miniProgram.getEnv(function(res) { console.log(res.miniprogram) // true })
    相关接口 2
    <web-view/>网页中仅支持以下JSSDK接口：
    
    接口模块  接口说明  具体接口
    判断客户端是否支持js    checkJSApi
    图像接口  拍照或上传  chooseImage
    预览图片  previewImage
    上传图片  uploadImage
    下载图片  downloadImage
    获取本地图片  getLocalImgData
    音频接口  开始录音  startRecord
    停止录音  stopRecord
    监听录音自动停止  onVoiceRecordEnd
    播放语音  playVoice
    暂停播放  pauseVoice
    停止播放  stopVoice
    监听语音播放完毕  onVoicePlayEnd
    上传接口  uploadVoice
    下载接口  downloadVoice
    智能接口  识别音频  translateVoice
    设备信息  获取网络状态  getNetworkType
    地理位置  使用内置地图  getLocation
    获取地理位置  openLocation
    摇一摇周边  开启ibeacon  startSearchBeacons
    关闭ibeacon  stopSearchBeacons
    监听ibeacon  onSearchBeacons
    微信扫一扫  调起微信扫一扫  scanQRCode
    微信卡券  拉取使用卡券列表  chooseCard
    批量添加卡券接口  addCard
    查看微信卡包的卡券  openCard
    长按识别  小程序圆形码  无
    相关接口 3
    用户分享时可获取当前<web-view/>的URL,即在onShareAppMessage回调中返回webViewUrl参数。
    
    示例代码：
    
    Page({
      onShareAppMessage(options) {
        console.log(options.webViewUrl)
      }
    })
    相关接口 4
    在网页内可通过window.__wxjs_environment变量判断是否在小程序环境,建议在WeixinJSBridgeReady回调中使用,也可以使用JSSDK 1.3.2提供的getEnv接口。
    
    示例代码：
    
    // web-view下的页面内
    function ready() {
      console.log(window.__wxjs_environment === 'miniprogram') // true
    }
    if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
      document.addEventListener('WeixinJSBridgeReady', ready, false)
    } else {
      ready()
    }
    
    // 或者
    wx.miniProgram.getEnv(function(res) {
      console.log(res.miniprogram) // true
    })
    Bug & Tip
    网页内iframe的域名也需要配置到域名白名单。
    开发者工具上,可以在 <web-view/> 组件上通过右键 - 调试,打开 <web-view/> 组件的调试。
    每个页面只能有一个<web-view/>,<web-view/>会自动铺满整个页面,并覆盖其他组件。
    <web-view/>网页与小程序之间不支持除JSSDK提供的接口之外的通信。
    在iOS中,若存在JSSDK接口调用无响应的情况,可在<web-view/>的src后面加个#wechat_redirect解决。
  ★其他组件 
  <open-data> 用于展示微信开放的数据 '1.4.0+' 
    type       str,开放数据类型
      'groupName' 拉取群名称[只有当前用户在此群内才能拉取到群名称] ['1.4.0+'] 
    open-gid   str,群id,当 type="groupName" 时生效, 
  <contact-button>  客服会话按钮,点击后会进入客服会话 
    PS: <button>组件通过设置open-type="contact"也可进入客服会话  
    size   按钮大小[有效值'18-27'],单位px,默认'18' 
    type   按钮的样式类型 
      'default-dark'  默认 
      'default-light'
    session-from str,用户从该按钮进入会话时,开发者将收到带上本参数的事件推送 
      本参数可用于区分用户进入客服会话的来源。
  ★原生组件 
    PS: 是由客户端原生参与组件的渲染 
      层级是最高的,不能通过 z-index 控制层级。可使用 cover-view cover-image覆盖在上面。
  <picker-view> 嵌入页面的滚动选择器 [原生组件] 
    PS: 其中只可放置<picker-view-column>组件,其他节点不会显示 
      滚动时在iOS自带振动反馈,可在系统设置 -> 声音与触感 -> 系统触感反馈中关闭
    value=""    arr,数组中的数字依次表示... 
      数字大于 picker-view-column 可选项长度时,选择最后一项 
    indicator-style=""  设置选择器中间选中框的样式 
    indicator-class=""  设置选择器中间选中框的类名 '1.1.0+'  
    mask-style=""       设置蒙层的样式 '1.5.0+' 
    mask-class=""       设置蒙层的类名 '1.5.0+' 
    bind:change="fn"    当滚动选择,value改变时触发'change'事件
      event.detail = {value: value}；
      value为数组,表示 picker-view 内的 picker-view-column 当前选择的是第几项[下标从 0 开始]
    <picker-view-column> 滚动选择项 
      仅可放置于<picker-view>中,其子节点的高度会自动设置成与<picker-view>的选中框的高度一致 
  ★共同属性类型: 所有组件都有的属性 
    id="str"      组件的唯一标示 保持整个页面唯一
    class="str"   组件的样式类   在对应的 WXSS 中定义的样式类
    style="str"   组件的内联样式 可以动态设置的内联样式
    hidden="bol"  组件是否显示   所有组件默认显示
    data-xxx="any"  自定义属性     组件上触发的事件时,会发送给事件处理函数
    bind:xxx/catch:xxx="fn"  组件的事件     详见事件
<template name="templateName"></template> WXML模板 
  PS: 可在模板中定义代码片段,然后在不同的地方调用 
  定义模板: 使用'name'属性定义模板的名字,在<template/>内定义代码片段 
    <template name="msgItem">
      <view>
        <text> {{index}}: {{msg}} </text>
        <text> Time: {{time}} </text>
      </view>
    </template>
  使用模板: 'is'属性声明使用的模板,'data'属性将模板所需要的数据传入 
    <template is="msgItem" data="{{...item}}"/>
    Page({
      data: {
        item: {
          index: 0,
          msg: 'this is a template',
          time: '2016-09-15'
        }
      }
    })
  
    is属性可以使用Mustache语法,在运行时来决定具体需要渲染哪个模板 
    <template name="odd"> 
      <view> odd </view>
    </template>
    <template name="even"> 
      <view> even </view>
    </template>
    <block wx:for="{{[1, 2, 3, 4, 5]}}">
      <template is="{{item % 2 == 0 ? 'even' : 'odd'}}"/>
    </block>
  模板的作用域: 模板拥有自己的作用域,只能使用data传入的数据 
<import src="xxx.wxml"/>使用目标文件定义的<template>模版 
  PS: 不可绑定引入页的JS数据 
    可自定义数据,但不能从引入页JS中绑定数据;
    可绑定事件,在引入后页面的JS中定义响应函数; 
  Example: 
    // tpl-aoo.wxml 中  
    <template name="aoo">
    <view wx:for={{key2}}>{{key1}}</view>
    </template>  
    // boo.wxml 中 
    <import src="./tpl-aoo.wxml"/>       // 引入 
    <template is="aoo" data="{{key1:val1,key2:val2,...}}"></template> // 使用,并传入数据 
  作用域 
    只会import目标文件中定义的template,而不会import目标文件import的template 
    // <!-- A.wxml -->
    <template name="A"> <text> A template </text> </template>
    // <!-- B.wxml -->
    <import src="a.wxml"/>
    <template name="B"> <text> B template </text> </template>
    // <!-- C.wxml -->
    <import src="b.wxml"/>
    <template is="A"/>  // <!-- Error! Can not use tempalte when not import A. -->
    <template is="B"/>
<include src="xxx.wxml"/> 将目标文件除了<template/>的整个代码引入 
  相当于是拷贝到include位置,可绑定引入页的JS数据 
  Example:
    <view> header </view>  // header.wxml  
    <view> footer </view>  // footer.wxml 
    // index.wxml 中 
    <include src="header.wxml"/>
    <view> body </view>
    <include src="footer.wxml"/>
◆指令语法 
  {{val}}      "Mustache"语法,插值 
    适用于'组件文本'/'组件属性' 
    控制class  class="aoo {{boo}}" 
  wx:for="{{arr/obj/str}}"  列表渲染 
    当前下标默认为: 'index';当前项默认为: 'item' 
      <view wx:for="{{items}}">
        {{index}}: {{item:one}}
      </view>
    花括号和引号之间如果有空格,将最终被解析成为字符串 
      <view wx:for="{{[1,2,3]}} "> {{item}} </view>
      // 等同于
      <view wx:for="{{[1,2,3] + ' '}}" > {{item}} </view>
    值为字符串时,将字符串解析成字符串数组 
      <view wx:for="abcde"> {{item}} </view>
      // 等同于
      <view wx:for="{{['a','b','c','d','e']}}"> {{item}} </view>
  wx:for-item="itm"  指定当前项 
  wx:for-index="idx" 指定当前下标 
    <view wx:for="{{items}}" wx:for-item="name"  wx:for-index="id">
      {{id}}: {{name.one}}
    </view>
  <block wx:for="{{arr}}"> </block>  列表块渲染 
  wx:key="_key/*this"    指定列表中项目的唯一标识符 
    PS: 当列表为静态时可不必使用;
      当数据改变触发渲染层重新渲染时,会校正带有key的组件,进行重排而非重建,
      以确保使组件保持自身的状态,并提高列表渲染效率 
    _key   项目中的字段,即表示为'item[key]',该值需是列表中唯一的字符串或数字,且不能动态改变 
    *this 保留关键字,表示'item'本身,这种表示需item是一个唯一的字符串或者数字
  wx:if="{{val}}"    条件渲染 
    PS: wx:if 是惰性的,如果在初始渲染条件为 false,框架什么也不做,在条件第一次变成真的时候才开始局部渲染
  wx:elif="{{val}}"  条件渲染 
  wx:else            条件渲染 
    和 wx:if 必须相邻 
  <block wx:if="{{val}}"> </block>  多组件条件渲染 
    PS: 一次性判断多个组件标签,可用一个<block/>标签将多个组件包装起来,并使用wx:if控制属性 
      <block/>并不是一个组件,它仅仅是一个包装元素,不会在页面中做任何渲染,只接受控制属性。
    <block wx:if="{{true}}">
      <view> view1 </view>
      <view> view2 </view>
    </block>
◆'Event'事件 
  PS: 事件是视图层到逻辑层的通讯方式;可将用户的行为反馈到逻辑层进行处理 
    事件可以绑定在组件上,当达到触发事件,就会执行逻辑层中对应的事件处理函数 
    事件对象可以携带额外信息,如id, dataset, touches。
事件枚举 
  PS: 事件分为冒泡事件和非冒泡事件
  ◆WXML的冒泡事件列表：当一个组件上的事件被触发后,该事件会向父节点传递 
  类型           触发条件
  'touchstart'  手指触摸动作开始
  'touchmove'   手指触摸后移动
  'touchend'    手指触摸动作结束
  'touchcancel' 手指触摸动作被打断,如来电提醒/弹窗
  'tap'         手指触摸后离开
  'longpress'   手指触摸后,超过350ms再离开 ['1.5.0+'] 
    如果指定了事件回调函数并触发了该事件,tap事件将不被触发 
  'longtap'     手指触摸后,超过350ms再离开[推荐使用'longpress'代替] 
  'markertap'   
  'transitionend'      在 WXSS transition/wx.createAnimation 动画结束后触发 
  'animationstart'     在一 WXSS animation 动画开始时触发 
  'animationiteration' 在一 WXSS animation 一次迭代结束时触发 
  'animationend'       在一 WXSS animation 动画完成时触发 
  'touchforcechange'   在支持3DTouch的iPhone设备,重按时触发 [1.9.90+]    
  ◆非冒泡事件：当一个组件上的事件被触发后,该事件不会向父节点传递 
  除上表之外的其他组件自定义事件都是非冒泡事件 
  如<form/>的'submit'事件,<input/>的'input'事件,<scroll-view/>的'scroll'事件
使用方式 
  在结构的标签中指定 eventname="fn", 在组件中绑定一个事件处理函数 
    PS: 通过绑定元素的 data-xxx="" 来传参 
    bind<type>="fn"     
    catch<type>="fn"    会阻止冒泡事件向上冒泡 
      Example: 
        <view bindtap="tapFn"></view>
        <view catchtouchstart="touchstartFn"></view>
    bind:<type>="fn"    '1.5.0+'
    catch:<type>="fn"   会阻止冒泡事件向上冒泡 '1.5.0+'
      <view bind:tap="tapFn"></view>
  Example: 
    点击inner view 会先后触发'handleTap3'和'handleTap2',
    因为tap事件会冒泡到middle view,而middle view阻止了tap事件冒泡,不再向父节点传递,
    点击middle view会触发'handleTap2',点击outter view会触发'handleTap1'。
    <view id="outter" bindtap="handleTap1">
      outer view
      <view id="middle" catchtap="handleTap2">
        middle view
        <view id="inner" bindtap="handleTap3">
          inner view
        </view>
      </view>
    </view>
事件的捕获阶段 
  PS: '1.5.0+'起,触摸类事件支持捕获阶段,捕获阶段位于冒泡阶段前,
    捕获阶段中,事件到达节点的顺序与冒泡阶段恰好相反 
  在捕获阶段监听事件的方式: 
    capture-bind:type="fn" 
    capture-catch:type="fn"  将中断捕获阶段和取消冒泡阶段 
  Example: 
    在下面的代码中,点击 inner view 会先后调用handleTap2、handleTap4、handleTap3、handleTap1。
    <view id="outer" bind:touchstart="handleTap1" capture-bind:touchstart="handleTap2">
      outer view
      <view id="inner" bind:touchstart="handleTap3" capture-bind:touchstart="handleTap4">
        inner view
      </view>
    </view>
    如果将上面代码中的第一个capture-bind改为capture-catch,将只触发handleTap2。
    <view id="outer" bind:touchstart="handleTap1" capture-catch:touchstart="handleTap2">
      outer view
      <view id="inner" bind:touchstart="handleTap3" capture-bind:touchstart="handleTap4">
        inner view
      </view>
    </view>
'evt'事件对象 
  PS: 如无特殊说明,当组件触发事件时,逻辑层绑定该事件的处理函数会收到一个事件对象 
  ◆'BaseEvent'基础事件对象属性列表 
  .type           事件类型
  .timeStamp      页面打开到触发事件所经过的ms数 
  .target         触发事件的源组件,触发事件的组件的一些属性值集合  
    .id        事件源组件的id
    .tagName   当前组件的类型
    .dataset   事件源组件上由data-开头的自定义属性组成的集合 
  .currentTarget  事件绑定的当前组件,当前组件的一些属性值集合  
    .id       当前组件的id
    .tagName  当前组件的类型
    .dataset  当前组件上由data-开头的自定义属性组成的集合
      'data-*'不区分大小写,大写会自动转成小写加'-',如data-element-type
  ◆'CustomEvent'自定义事件对象属性列表[继承 BaseEvent] 
  .detail         额外的信息 
    自定义事件所携带的数据,
    如表单组件的提交事件会携带用户的输入,媒体的错误事件会携带错误信息,
    详见组件定义中各个事件的定义。
    点击事件的detail 带有的 x, y 同 pageX, pageY 代表距离文档左上角的距离。
  ◆'TouchEvent'触摸事件对象属性列表[继承 BaseEvent]：
  .touches         触摸事件,当前停留在屏幕中的触摸点信息的数组  
    PS: 数组每个元素为一个 Touch 对象,表示当前停留在屏幕上的触摸点 
    Touch对象
      .identifier num,触摸点的标识符
      .pageX    num,距离文档左上角的距离 
      .pageY    num,距离文档左上角的距离 
      .clientX  num,距离页面可显示区域[屏幕除去导航条]左上角距离
      .clientY  num,距离页面可显示区域[屏幕除去导航条]左上角距离 
  .changedTouches  触摸事件,当前变化的触摸点信息的数组 
    changedTouches 数据格式同 touches,表示有变化的触摸点,
    如从无变有[touchstart],位置变化[touchmove],从有变无[touchend/touchcancel] 
  ◆特殊事件： 
  <canvas/> 中的触摸事件不可冒泡,故没有 currentTarget 
  canvas 触摸事件中携带的 touches 是'CanvasTouch'数组 
    CanvasTouch对象 
      .identifier num,触摸点的标识符 
      .x       num,距离 Canvas 左上角的距离
      .y       num,距离 Canvas 左上角的距离
◆自定义组件 '1.6.3+' 
  PS: 将页面内的功能模块抽象成自定义组件,以便在不同的页面中重复使用 
    也可将复杂的页面拆分成多个低耦合的模块,有助于代码维护
    自定义组件在使用时与基础组件非常相似 
创建自定义组件 
  PS: 一个文件夹中,由'.json'、'.wxml'、'.wxss'、'.js' 四个文件组成 
  'component.json'配置设定 
    { "component": true    // 声明为自定义组件 
    ,"usingComponents": {  // 引入其他自定义组件 
      "自定义组件的标签名": "对应的自定义组件的相对路径"
      ,...
    }}
  'component.wxml'组件模版 
    <view class="wrapper">
      <view>这里是组件的内部节点</view>
      <slot name="slot1"></slot>
      <slot name="slot2"></slot>
    </view>
    <slot>节点: 用于承载组件引用时提供的子节点 
      默认支持单<slot>,添加多个,需在 Component() 中设置
      多<slot>通过'name'属性来区分 
  'component.wxss'组件样式 
    只对组件wxml内的节点生效 
    选择器的使用选择 
      不应使用 ID选择器/属性选择器/标签名选择器,而改用 class选择器 
      组件和引用组件的页面中使用后代选择器[.a .b]在一些极端情况下会有非预期的表现,请避免使用 
      子元素选择器[.a>.b]只能用于 view 组件与其子节点之间,用于其他组件可能导致非预期的情况 
      ':host'选择器,指定其所在节点的默认样式 [1.7.2+] 
    样式继承 
      继承样式,如 font、color,会从组件外继承到组件内 
      除继承样式外,app.wxss 中的样式、组件所在页面的的样式对自定义组件无效 
    外部样式类 
      组件接受外部传入的样式类
      先在 Component() 中通过'externalClasses'定义段定义若干个外部样式类 [1.9.90+] 
        在同一个节点上使用普通样式类和外部样式类时,两个类的优先级是未定义的,因此最好避免该情况 
    Accu: 
      默认不会引入'app.wxss'全局样式,可手动引入 
  'component.js'组件逻辑层 
    Component({ // 注册组件,提供组件的属性定义/内部数据/自定义方法 
      PS: Component 构造器构造的组件也可以作为页面使用 
        通过 this 访问生成的组件实例 
        生命周期函数无法在组件方法中通过 this 访问到 
      data: {         // 可选,组件的内部数据,和 properties 一同用于组件的模版渲染  
        PS: 'data'中的字段和'properties'中的字段不能冲突,都可在 WXML 中直接使用
          this.data.xx 可同时获取到'data'和'properties'中的字段  
        key: val 
        ,...
      }  
      ,properties: {  // 可选,外界向组件内传入数据 
        PS: 组件的对外属性,是属性名到属性设置的映射表 
          采用驼峰写法的,在 wxml 中,则对应使用连字符写法
          传入的数据,不管是简单数据类型,还是引用类型,都为值复制,即不会影响到父组件 
        <attr1>: {
          type: <KW>  // 必选,值类型 
            null    表示任意类型
            String
            Number
            Boolean
            Object
            Array
          ,value: val // 可选,初始值 
          ,observer: function(newVal ,oldVal){  // 属性值被更改时的响应函数 
            // 
          } 
          ,observer: 'fnName'  // 'fnName'是在'methods'中定义的方法 
        }
        <attr2>: String // 简化的定义方式 
        ,...
      }  
      ,externalClasses: [ // 可选,组件接受的外部样式类 
        // 外部:定义样式cls1,组件标签上注册 cls2="cls1"
        // 组件:externalClasses数组中添加'cls2',视图中使用 cls2 
        'xxx' 
      ] 
      ,methods: {    // 可选,组件的方法 
        PS: 包括事件响应函数和任意的自定义方法 
        fn: function(){}
        ,..
      }  
      ,options: { // 可选,一些组件选项 
        multipleSlots: true // 启用多slot支持,默认只支持单slot 
      }  
      ,relations: {        // 可选,组件间关系定义 
        PS: 使两个组件产生关联,从而相互访问/修改对方的属性
          但不可调用对方的方法 ? 
        './xxx-xx': {  // 需关联的组件的路径作为'key'
          type: <KW>   // 必选,目标组件相对于当前组件的关系 
            'ancestor'   祖先节点 
            'parent'     父节点 
            'child'      子节点  
            'descendant' 子孙节点 
          // 关系生命周期  
          ,linked: function(cpnt){      // 可选,当关系被建立在页面节点树中时触发 
            // 触发时机在组件attached生命周期之后
            // cpnt 关联组件的实例 
          }  
          ,linkChanged: function(cpnt){ // 可选,当关系在页面节点树中发生改变时触发 
            // 触发时机在组件moved生命周期之后
            // cpnt 关联组件的实例 
          }  
          ,unlinked: function(cpnt){    // 当关系脱离页面节点树时触发
            // 触发时机在组件detached生命周期之后
            // cpnt 关联组件的实例 
          }
          ,target: behaviorObj          // 可选 
            若该项被设置,表示关联所有具有该behavior且符合'type'条件的组件,
            关联组件的key不再使用路径表示 
          }
        }
      }
      ,behaviors: [bhv1 ,...]    // 可选,类似于mixins和traits的组件间代码复用机制 
        PS: 每个 behavior 以包含一组属性、数据、生命周期函数和方法,
          组件引用它时,它的属性、数据和方法会被合并到组件中,生命周期函数也会在对应时机被调用。
          每个组件可以引用多个 behavior 
          behavior 也可以引用其他 behavior  
        Behavior() 构造器: 定义behaviors 
          Example: 
          module.exports = Behavior({
            behaviors: []
            ,properties: {
              myBehaviorProperty: {
                type: String
              }
            }
            ,data: {
              myBehaviorData: {}
            }
            ,methods: {
              myBehaviorMethod: function(){}
            }
            ,attached: function(){}
          })
        字段的覆盖和组合规则 
          组件本身的属性/方法优先级高于behavior中的,产生覆盖 
          引用了多个behavior,在定义段中靠后behavior中的属性或/方法覆盖靠前的属性或方法 
          同名的数据字段,若数据是对象类型,会进行对象合并,否则进行相互覆盖 
          生命周期函数不会相互覆盖,而是在对应触发时机被逐个调用。
          如果同一个 behavior 被一个组件多次引用,它定义的生命周期函数只会被执行一次。
        内置behaviors 
          Example: 
            Component({
              behaviors: ['wx://form-field']
                'wx://form-field'代表一个内置 behavior,使该自定义组件有类似于表单控件的行为 
            })
          内置 behavior 往往会为组件添加一些属性 
            在没有特殊说明时,组件可以覆盖这些属性来改变它的 type 或添加 observer 
          'wx://form-field' 使自定义组件有类似于表单控件的行为
            form 组件可以识别这些自定义组件,在 submit 事件中返回组件的字段名及其对应字段值。
            将为它添加以下两个属性
            name    str,在表单中的字段名 [1.6.7+]
            value   在表单中的字段值  [1.6.7+]
      // 生命周期,函数可为函数/methods中定义的方法名 
      ,created: function(){   // 可选,组件实例初始化时 
        // 此时不能调用 setData
      }  
      ,attached: function(){  // 可选,组件实例添加到页面节点树时执行 
        // 
      }  
      ,ready: function(){     // 可选,组件视图渲染完成后执行 
        // 此时可获取节点信息[使用 SelectorQuery] 
      }  
      ,moved: function(){     // 可选,在组件实例被移动到节点树另一个位置时执行 
        // 
      }  
      ,detached: function(){  // 可选,组件实例被从页面节点树移除时执行 
        // 
      }  
    }) 
    组件实例通用的属性/方法 
      .is       str,组件的文件路径
      .id       str,节点id
      .dataset  str,节点dataset
      .data     obj,组件数据,包括内部数据和属性值
      .setData()       // 设置data并执行视图层渲染
      .hasBehavior()   // 检查组件是否具有 behavior 
        // 检查时会递归检查被直接或间接引入的所有behavior 
      .triggerEvent('eventname',detail,config)  // 触发事件 [详见组件通信]   
      .createSelectorQuery()   // 创建一个 SelectorQuery 对象,选择器选取范围为这个组件实例内
      .selectComponent()       // 使用选择器选择组件实例节点,返回匹配到的第一个组件实例对象
      .selectAllComponents()   // 使用选择器选择组件实例节点,返回匹配到的全部组件实例对象组成的数组
      .getRelationNodes(<组件的相对路径>)    // 当前组件关联组件实例的数组[有序] 
        PS: 需相互关联后才能获取到 
        var cpnts = this.getRelationNodes('./xxx-xx')
        var cpntA = cpnts[0];  // 获取到关联的组件A的实例 
        
        // 获取到A组件的数据
        console.log(cpntA.data.name)
        // 调用对方组件的setData()方法来更新对方组件的数据
        cpntA.setData({
          xxx: 'xx'
        })
使用自定义组件 
  PS: 自定义组件和使用自定义组件的页面所在项目根目录名不能以“wx-”为前缀,否则会报错 
  '.json'中进行引用声明 
    { ,...
    ,"usingComponents": {
      // 自定义组件的标签名: 对应的自定义组件文件路径[省略文件的后缀名] 
      "component-tag-name": "path/to/the/custom/component/index"  
        PS: 定义的组件标签名不能有数字,如'cpnt-name1',则报错  
    }}
  '.wxml'中放置组件标签  
    节点名即自定义组件的标签名,节点属性即传递给组件的属性值 
    <slot> 
      单<slot>时,默认将引入标签内放置的节点替换到组件定义时放置的位置 
      多<slot>时,在引入标签内的'slot'属性和定义时的'name'属性对应,从而进行匹配替换 
        Example: 
          // 定义组件 
          <view>
            <slot name="slotflag"></slot>
          </view>
          // 使用组件 
          <cpnt-child>
            <view slot="slotflag"></view>
          </cpnt-child>
组件通信 
  主页面与子组件通信: 组件标签绑定属性向子组件通信,事件触发向父组件通信  
    属性绑定 
      // 子组件内预定义
      properties: {
        attr_val: {  
          type: null 
          ,value: { 
            // 
          }
          ,observer: function(oldVal,newVal){
            // 
          }
        }
      }
      // 父组件中定义  
      <cpnt-child attr_val="{{parentVal}}"></cpnt-child>
    事件触发 
      // 子组件内触发
      this.triggerEvent('event_name',{  // 传递的数据,作为事件的 evt.detail 
        // 
      }
      ,{  // 触发事件的选项 
        bubbles: <bol>       // 事件是否冒泡,默认:false  
        ,capturePhase: <bol> // 事件是否有捕获阶段,默认:false 
        ,composed: <bol>     // 事件是否可穿越组件边界,默认:false  
          false时,事件将只能在引用组件的节点树上触发,不进入其他任何组件内部 
      })
      // 父组件中定义 
      <cpnt-child bind:event_name="responseFn"></cpnt-child>
      {
        responseFn: function(evt){
          console.log(evt);
        }
      }
  层级组件间通信: 通过指定'relations'关联来通信 
    PS: 必须两个组件中都设置'relations',否则不生效  
    // 组件A中
    {
      ,relations: {   
        '../xxx/xx': {  // 关联组件B  
          type: 'ancestor'   
          ,linked: function(cpnt){ }  
          ,linkChanged: function(cpnt){ }  
          ,unlinked: function(cpnt){ }
        }
      }
    }
    this.getRelationNodes('../xxx/xx')[<num>] // 获取到对方组件的实例 
    // 组件B中 
    {
      ,relations: {   
        '../xxx/xx': {  // 关联组件A  
          type: 'ancestor'   
          ,linked: function(cpnt){ }  
          ,linkChanged: function(cpnt){ }  
          ,unlinked: function(cpnt){ }
        }
      }
    }
    this.getRelationNodes('../xxx/xx')[<num>] // 获取到对方组件的实例 
  任意组件间通信: 'relations'&'behaviors' // TODO
    PS: 'relations'将层级组件关联,同一上层组件通过'behaviors'关联到任意两组件 
      一组件通过'behaviors'中定义的方法来获取到另一组件[先获取到上层通过上层获取到另一组件]
抽象节点 
  有时,自定义组件模版中的一些节点,其对应的自定义组件不是由自定义组件本身确定的,
  而是自定义组件的调用者确定的 
  这时可以把这个节点声明为'抽象节点'  




















