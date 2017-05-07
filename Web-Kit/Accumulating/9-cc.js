Cocos Creator 
介绍 
  一个完整的游戏开发解决方案,包括了 cocos2d-x 引擎的 JavaScript 实现,
  以及更快速开发游戏所需要的各种图形界面工具;
  包含游戏引擎、资源管理、场景编辑、游戏预览和发布等游戏开发所需的全套功能,
  并且将所有的功能和工具链都整合在了一个统一的应用程序里;
  目前支持发布游戏到Web、Android和iOS,以及点开即玩原生性能的Cocos Play手机页游平台;
  以数据驱动和组件化作为核心的游戏开发方式
  场景中的内容按照工作流分别呈现在 资源管理器、层级管理器、场景编辑器、属性检查器 四个核心面板中
说明 
  默认单位 
    时间 s,秒
    尺寸 px,像素
  项目结构 
    通过 Dashboard,创建项目之后,有特定的文件夹结构;
    初次创建并打开一个 Cocos Creator 项目后,您的项目文件夹将会包括以下结构：
    ProjectName（项目文件夹）
    ├──assets
    ├──library
    ├──local
    ├──settings
    ├──temp
    └──project.json
    assets,资源文件夹
      assets 将会用来放置您游戏中所有本地资源、脚本和第三方库文件。
      只有在 assets 目录下的内容才能显示在 资源管理器 中。
      assets 中的每个文件在导入项目后都会生成一个相同名字的 .meta 文件,
      用于存储该文件作为资源导入后的信息和与其他资源的关联。
      一些第三方工具生成的工程或设计原文件, 如 Photoshop 的 .psd 文件,
      可以选择放在 assets 外面来管理。
    library,资源库
      library 是将 assets 中的资源导入后生成的,
      在这里文件的结构和资源的格式将被处理成最终游戏发布时需要的形式。
      若您使用版本控制系统管理您的项目,这个文件夹是不需要进入版本控制的。
      当 library 丢失或损坏的时候,只要删除整个 library 文件夹再打开项目,就会重新生成资源库。
    local,本地设置
      local 文件夹中包含该项目的本地设置,包括编辑器面板布局,窗口大小,位置等信息。
      您不需要关心这里的内容,只要按照您的习惯设置编辑器布局,这些就会自动保存在这个文件夹。
      一般 local 也不需要进入版本控制。
    settings,项目设置
      settings 里保存项目相关的设置,如 构建发布 菜单里的包名、场景和平台选择等。
      这些设置需要和项目一起进行版本控制。
    project.json
      project.json 文件和 assets 文件夹一起,作为验证 Cocos Creator 项目合法性的标志。
      只有包括了这两个内容的文件夹才能作为 Cocos Creator 项目打开。
      而 project.json 本身目前只用来规定当前使用的引擎类型和插件存储位置,不需要用户关心其内容。
      这个文件也应该纳入版本控制。
  术语
组件化开发 
  PS：脚本以组件的形式添加到节点上
  脚本的一般形式
    cc.Class({
      extends: cc.Component, // 继承至cc.Component
      properties: {     // 定义引用的节点或自定义的属性
        aoo : {         // 节点引用的完整写法
           default: null,      // 节点的默认值
           url: cc.Texture2D,  // 可选,
           serializable: true, // 可选,默认为true 
           visible: true,      // 可选,默认为true
           displayName: 'Foo', // 可选,
           readonly: false,    // 可选,默认为false
          //  ...
        },
        boo : cc.Label, // 表明节点的类别,节点引用的简写方式
        coo : 'hello world', // 自定义属性
        // 当属性为字符串、数值等非引用类型时,可忽略其类型声明
        
      },
      
      onLoad: function () {  // 场景加载后自动执行,一般用于放置初始化代码
        // 函数中this表示..,
        // properties也处于其原型链上,也会去properties上查找属性方法
        var aoo = this.boo.parent; // 获取boo节点的父节点
        this.posAR.string = 'abc'; //  设置文本节点的文本值
      },
      
      update: function (dt) {  // 循环执行,约15ms调用一次
        
      },
    });
API 
  节点相关 
    ◆节点类型
    cc.Label  文本
    cc.Node   节点
    cc.SpriteFrame 图片资源
    ◆节点属性
    ccNode.string  可读写,节点的文本值
    ccNode.parent  节点的父节点
    ◆创建节点
    cc.instantiate(prefa)  返回通过预置资源创建的节点
Cocos2d-js API
--------------------------------------------------------------------------------
菜单栏
工具栏 
  PS：包括了场景编辑工具和预览游戏时的操作按钮,
    最右边显示了远程测试和调试时使用访问地址,以及连接中的设备数。
  矩形变换工具: 鼠标拖动缩放选中的对象
资源管理器 
  PS： 显示了项目资源文件夹「assets」中的所有资源,
    包括项目中所有的资源和脚本文件;为每个资源分配UUID,解决改名和移动时的索引问题;
    项目中只有 assets 目录下的资源才会被 Cocos Creator 导入项目并进行管理;
    图片文件导入后会经过简单的处理成texture类型资源,可将其拖拽到场景或组件属性中使用;
  Scene 游戏场景 
    PS：Scene是开发时组织游戏内容的中心,也是呈现给玩家所有游戏内容的载体。
      一般包括：Sprite、Label、角色及游戏逻辑脚本「以组件形式附加在场景节点上」;
      当运行游戏时,就会载入Scene,载入后就会自动运行所包含组件的游戏脚本,
      实现各种各样开发者设置的逻辑功能;
      除了资源以外,Scene是一切内容创作的基础;
    创建、打开Scene
      在资源管理器中选择目录确定创建的位置;
      点击左上角的加号-Scene,创建Scene
      双击Scene,在场景编辑器和层级编辑器中打开该场景
    Canvas 
      Scene就是以Canvas为基础支持的;
      Canvas可以被称为画布节点或渲染根节点,场景图像都会放在Canvas节点下
  创建添加脚本 
    通常在assets下创建一个script文件夹来存放JS脚本
    脚本名称就是组件的名称,且大小写敏感
    
    编写脚本 
      打开的脚本里已经有了预先设置好的一些代码块,这些代码就是编写一个组件脚本所需的结构。
      具有这样结构的脚本就是 Cocos Creator 中的组件（Component）,
      他们能够挂载到场景中的节点上,提供控制节点的各种功能。
        properties: {
            // 主角跳跃高度
            jumpHeight: 0,
            // 主角跳跃持续时间
            jumpDuration: 0,
            // 最大移动速度
            maxMoveSpeed: 0,
            // 加速度
            accel: 0,
        },
        代码中不需关心这些数值是多少,因为之后会直接在属性检查器中设置这些数值,
    把脚本组件添加到需要控制的节点上 
      在 层级编辑器 中选中对应的节点,然后在 属性检查器 中点击 添加组件 按钮,
      选择 添加用户脚本组件 对应的JS脚本,为节点添加 JS脚本组件。    
  Prefab 预制资源 
    创建及使用Prefab
      将在场景中编辑好节点从 层级管理器 拖到 资源管理器,即创建出了一个预制资源,
      在脚本中引用Prefab后,就可以动态生成节点内容了
    保存预制 
      在场景中修改了预制实例后,在 属性检查器 中直接点击 保存,即可保存对应的预制资源：
    还原预制 
      在场景中修改了预制实例后,在 属性检查器 中直接点击 回退,即可将预制对象还原为资源中的状态：
    自动同步和手动同步
      每个场景中的预制实例都可以选择要自动同步和还是手动同步。
      设为手动同步时,当预制对应的原始资源被修改后,场景中的预制实例不会同步刷新,
      只有在用户手动还原预制时才会刷新。
      设为自动同步时,该预制实例会自动和原始资源保持同步。
      注意,为了保持引擎的精简,自动同步的预制实例有如下限制：
      
      场景中的预制实例仅能修改预制的根节点自身的 name、active、position 和 rotation 属性,
      其它子节点和所有组件都必须和原始资源保持一致,否则编辑器会询问是要撤销修改还是要更新原始资源。
      自动同步的预制中的组件无法引用该预制外的其它对象,否则编辑器会弹出提示。
      自动同步的预制外面的组件只能引用该预制的根节点,无法引用组件和子节点,否则编辑器会弹出提示。
      这些限制都仅影响编辑器操作,运行时不影响。
    将预制还原成普通节点
      从 资源管理器 中删除一个预制资源后,你可以将场景中对应的预制实例还原成普通节点。
      方法是选中预制实例,然后点击菜单 节点 > 还原成普通节点。      
控件库 
  PS：预设控件的仓库库,可以通过拖拽方式添加到场景中,
    并且可以将用户自己的预制资源（prefab）添加到控件库里方便再次使用。
层级管理器 
  PS：层级管理器用树状列表的形式展示场景中的所有节点和他们的层级关系,
    所有在场景编辑器中的内容都可以在层级管理器中找到对应的节点条目,
    可直接将资源管理器中的图像拖动到层级管理器上「节点会自动以贴图资源的文件名来命名」,
    同级后序节点的渲染顺序会在其前节点后「显示在上层」,子节点也永远显示在父节点上层,
    可随时调整节点的层级顺序和关系来控制显示顺序;
场景编辑器 
  PS：场景编辑器是用来展示和编辑场景中可视内容的工作区域。
    所见即所得的场景搭建工作都依靠场景编辑器中的显示来完成。
属性检查器 
  PS：属性检查器是我们查看并编辑当前选中节点和组件属性的工作区域,
    这个面板会以最适合的形式展示和编辑来自脚本定义的属性数据;
    Design Resolution 规定了游戏的设计分辨率
    Fit Height和Fit Width规定了在不同尺寸的屏幕上运行时,将如何缩放节点以适配不同的分辨率
  相关操作 
    为节点添加组件功能: 点击添加组件按钮,从类别中选择相应的组件即可
    快捷操作
      为节点添加脚本组件: 将js文件拖到该面板,即将当前节点和脚本进行绑定
        然后再在面板中指定脚本properties中引入的其他节点或属性
  Node   节点,节点组件 
    Anchor,锚  任何节点的锚点默认在节点的中心,即该节点中心点位置就是该节点的位置
      可通过鼠标或改变Anchor的X、Y值来改变其位置
  Widget 对齐挂件,布局组件,实现多分辨率自适应排版 
    PS：能使当前节点自动对齐到父物体的任意位置,或者约束尺寸,让游戏适配不同分辨率
      对齐挂件的脚本接口请参考Widget API
    Position布局
      默认使用px,可使用百分比﹪
      若左右同时对齐,或者上下同时对齐,那么在相应方向上的尺寸就会被拉伸;
      Top    对齐上边界,用于设定当前节点的上边界和父物体的上边界之间的距离
      Bottom 对齐下边界,用于设定当前节点的下边界和父物体的下边界之间的距离
      Left   对齐左边界,用于设定当前节点的左边界和父物体的左边界之间的距离
      Right  对齐右边界,用于设定当前节点的右边界和父物体的右边界之间的距离
    HorizontalCenter 水平方向居中 
    VerticalCenter   竖直方向居中 
    Target    对齐目标,指定对齐参照的节点,未指定时默认使用父节点
    AlignOnce 默认为true,是否仅在组件初始化时进行一次对齐
      设为 false 时,每帧都会对当前 Widget 组件执行对齐逻辑「对性能有较大损耗！」
      组件所在节点的位置和尺寸属性可能会被限制,不能通过 API 或动画系统自由修改。
      因为通过 Widget 对齐是在每帧的最后阶段进行处理的,
      因此对 Widget 组件中已经设置了对齐的相关属性进行设置,
      最后都会被 Widget 组件本身的更新所重置。
      若需要同时满足对齐策略和可以在运行时改变位置和尺寸的需要,可以通过以下两种方式实现：
        在初始化时自动完成对齐,然后就可以通过 API 或动画系统对 UI 进行移动变换
        通过调用 Widget 组件的对齐边距 API,包括 top, bottom, left, right,
        直接修改 Widget 所在节点的位置或某一轴向的拉伸。
        这些属性也可以在动画编辑器中添加相应关键帧,保证对齐的同时实现各种丰富的 UI 动画。
  Spirte 精灵,场景图像组件            「Spirte节点所属属性」 
    PS：游戏中最常见的显示图像的方式;
      在面板中添加 Sprite 组件,就可以在场景中显示项目资源中的图片;
      只有图片类型的节点才能添加该组件
    Atlas        显示图片资源「spriteFrame」所属的图集资源 
      若拖拽的 SpriteFrame 资源是包含在一个 Atlas 图集资源中,
      那么 Sprite 的Atlas属性也会被一起设置。
      之后可点击Atlas属性的选择按钮来从该 Atlas 中挑选 SpriteFrame 指定给 Sprite;
    Sprite Frame 渲染Sprite使用的图片资源 
      可从资源管理器中拖拽 Texture 或 SpriteFrame 类型的资源到该属性引用中,
      即可通过Sprite组件显示资源图像;
    Type         渲染模式
      Simple 普通
        按照原始图片资源样子渲染 Sprite,在这个模式下一般不会手动修改节点的尺寸,
        保证场景中显示的图像和美术人员生产的图片比例一致。
      Sliced 九宫格
        图像将被分割成九宫格,并按照一定规则进行缩放以适应可随意设置的尺寸(size)。
        通常用于 UI 元素,或将缩放不影响质量的图片制作成九宫格图来节省游戏资源空间。
        详细信息请阅读使用 Sprite 编辑器制作九宫格图像一节。
      Tiled  平铺
        当 Sprite 的尺寸增大时,图像不会被拉伸,而是会按照原始图片的大小不断重复,
        就像平铺瓦片一样将原始图片铺满整个 Sprite 规定的大小;
      Filled 填充
        PS：根据原点和填充模式的设置,按照一定的方向和比例绘制原始图片的一部分; 
          Type 属性选择填充模式后,会出现一组新的属性可供配置;
          经常用于进度条的动态展示;
        Fill Type  填充类型选择
        HORIZONTAL 横向填充
        VERTICAL   纵向填充
        RADIAL     扇形填充
        Fill Start  填充起始位置的标准化数值「从 0 ~ 1,表示填充总量的百分比」
          选择横向填充时,Fill Start 设为 0,就会从图像最左边开始填充
        Fill Range  填充范围的标准化数值「0 ~ 1 之间」
          设为 1,就会填充最多整个原始图像的范围。
          在 HORIZONTAL 和 VERTICAL 这两种填充类型下,
            Fill Start 设置的数值将影响填充总量,
            若 Fill Start 设为 0.5,那么即使 Fill Range 设为 1.0,
            实际填充的范围也仍然只有 Sprite 总大小的一半。
          而 RADIAL 类型中 Fill Start 只决定开始填充的方向,
            Fill Start 为 0 时,从 x 轴正方向开始填充,
            Fill Range 决定填充总量,值为 1 时将填充整个圆形。
            Fill Range 为正值时逆时针填充,为负值时顺时针填充。
        Fill Center 填充中心点,只有选择了 RADIAL 类型才会出现这个属性
          决定扇形填充时会环绕 Sprite 上的哪个点,坐标系和设置 Anchor 锚点 一样
    Size Mode    指定 Sprite 的尺寸
      Trimmed 会使用原始图片资源裁剪透明像素后的尺寸
      Raw 会使用原始图片未经裁剪的尺寸；
      当手动修改 size 属性后,Size Mode 会被自动设置为 Custom,除非再次指定为前两种尺寸;
    Trimmed Mode 是否渲染原始图像周围的透明像素区域
      详情请参考图像资源的自动剪裁。
    Src Blend Factor 当前图像混合模式
    Dst Blend Factor 背景图像混合模式
      和Src Blend Factor属性共同作用,可以将前景和背景 Sprite 用不同的方式混合渲染,
      效果预览可以参考 glBlendFunc Tool
  Label  文本,文本组件                「Label节点所属属性」 
    PS：用来显示一段文字,文字可以是系统字体,TrueType 字体或者 BMFont 字体和艺术数字;
      Label 还具有排版功能;
    String           文本内容字符串
    Horizontal Align 文本的水平对齐方式 「LEFT,CENTER 和 RIGHT」
    Vertical Align   文本的垂直对齐方式 「TOP,CENTER 和 BOTTOM」
    Font Size        文本字体大小
    Line Height      文本的行高
    Overflow         文本的排版方式
      CLAMP         文字尺寸不会根据 Bounding Box 的大小进行缩放
        Wrap Text 关闭的情况下,按照正常文字排列,超出 Bounding Box 的部分将不会显示。
        Wrap Text 开启的情况下,会试图将本行超出范围的文字换行到下一行。 
        若纵向空间也不够时,也会隐藏无法完整显示的文字。
      SHRINK        文字尺寸会根据 Bounding Box 大小进行自动缩放
        不会自动放大,最大显示 Font Size 规定的尺寸,
        Wrap Text 开启时,当宽度不足时会优先将文字换到下一行, 
        若换行后还无法完整显示,则会将文字进行自动适配 Bounding Box 的大小。 
        若 Wrap Text 关闭时,则直接按照当前文字进行排版, 若超出边界则会进行自动缩放。
      RESIZE_HEIGHT 文本的 Bounding Box 会根据文字排版进行适配
        这个状态下用户无法手动修改文本的高度,文本的高度由内部算法自动计算出来。
    Enable Wrap Text 是否开启文本换行
    Font             指定文本渲染需要的字体文件, 若使用系统字体,则此属性可以为空
      可通过拖拽 TTF 字体文件和 BMFont 字体文件来修改渲染的字体类型;
      若不想继续使用字体文件,可以通过勾选Use System Font来重新启用系统字体
      使用艺术数字字体需要创建艺术数字资源,参考链接中的文档设置好艺术数字资源的属性之后,
      就可以像使用 BMFont 资源一样来使用艺术数字了。
    Use System Font  布尔值,是否使用系统字体
    BMFont 与 UI 合图自动批处理 
      从 Creator 1.4 版本开始, BMFont 支持与 UI 一起合图进行批量渲染。 
      理论上, 若你的游戏 UI 没有使用系统字体或者 TTF 字体,
      并且所有的 UI 图片资源都可以合在一张图上,
      那么 UI 是可以只用一个 Draw Call 来完成的。 
      更多关于 BMFont 与 UI 合图自动批处理的内容,请参考 BMFont 与 UI 合图自动批处理    
  Layout 一种容器组件,容器内子节点布局 「Layout节点所属属性」 
    PS：方便制作列表、翻页等功能
    Type       布局类型 
      NONE       默认值,表示容器不会修改子节点的大小和位置 
        当用户手动摆放子节点时,容器会以能够容纳所有子节点的最小矩形区域作为自身的大小
      HORIZONTAL 水平
      VERTICAL   垂直
      GRID       网格布局
        Cell Size   指定网格容器里面排版元素的大小
        Start Axis  指定网格容器里面元素排版指定的起始方向轴
    ResizeMode 缩放模式 
      NONE      子节点和容器的大小变化互不影响
      CONTAINER 容器变化,容器的大小会随着子节点的大小变化
      CHILDREN  内容变化,子节点大小会随着容器的大小而变化
    Padding边距 
      PaddingLeft   子节点相对于容器左边框的距离 
      PaddingRight  子节点相对于容器右边框的距离 
      PaddingTop    子节点相对于容器上边框的距离 
      PaddingBottom 子节点相对于容器下边框的距离 
    SpacingX  子节点间水平方向上的间距
    SpacingY  子节点间垂直方向上的间距
    Horizontal Direction 子节点水平排列方向 
      当容器为 Grid 类型时,此属性和 Start Axis 属性一起决定 Grid 布局元素的起始水平排列方向。
    Vertical Direction   子节点垂直排列方向 
      当容器为 Grid 类型时,此属性和 Start Axis 属性一起决定 Grid 布局元素的起始垂直排列方向。
  ScrollView  一种带滚动功能的容器     「ScrollView节点所属属性」
    PS：提供在有限的显示区域内浏览更多内容的一种方式;
      通常 ScrollView 会与 Mask组件配合使用,
      同时也可以添加ScrollBar组件来显示浏览内容的位置;
      滚动视图的脚本接口请参考ScrollView API;
      ScrollView 组件必须有指定的 content 节点才能起作用,
      通过指定滚动方向和 content 节点在此方向上的长度来计算滚动时的位置信息,
      Content 节点也可以通过UIWidget设置自动 resize。
    content    节点引用,用来创建 ScrollView 的可滚动内容 
      通常这可能是一个包含一张巨大图片的节点
    Horizontal 开启横向滚动
    Vertical   开启纵向滚动
    Inertia    开启滚动惯性
    Brake      滚动减速系数,范围 0-1 
      1   则立马停止滚动
      0   则会一直滚动到 content 的边界
    Elastic    开启滚动回弹
    Bounce Duration      回弹持续时间,范围 0-10,0 表示立即反弹
    Horizontal ScrollBar 节点引用,水平滚动条,显示content在水平方向上的位置 
    Vertical ScrollBar   节点引用,垂直滚动条,显示 content 在垂直方向上的位置
    Scroll Events        列表类型,默认为空 
      用户添加的每一个事件由节点引用,组件名称和一个响应函数组成
      详情见 'Scrollview 事件' 章节
    Cancel InnerEvents   滚动不触发子节点上的触摸事件
    ScrollView 事件 
      Target    带有脚本组件的节点。
      Component 脚本组件名称。
      Handle    指定一个回调函数,当 ScrollView 的事件发生的时候会调用此函数
      CustomEventData 用户指定任意的字符串作为事件回调的最后一个参数传入。
      Scrollview事件回调有两个参数
        第一个参数是 ScrollView 本身,第二个参数是 ScrollView 的事件类型。
    通常一个 ScrollView 的节点树：
      ScrollView
        view        // 可见区域
          content   // 显示内容,一般比显示区域大
            item    
            item
            ...
        ScrollBar
          bar
    通过脚本代码添加回调 
      方法一 添加的事件回调和使用编辑器添加的事件回调是一样的,通过代码添加, 
        需要首先构造一个 cc.Component.EventHandler 对象,
        然后设置好对应的 target, component, handler 和 customEventData 参数。
        //here is your component file, file name = MyComponent.js 
        cc.Class({
          extends: cc.Component,
          properties: {},
          
          onLoad: function () {
            var scrollViewEventHandler = new cc.Component.EventHandler();
            scrollViewEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
            scrollViewEventHandler.component = "MyComponent";//这个是代码文件名
            scrollViewEventHandler.handler = "callback";
            scrollViewEventHandler.customEventData = "foobar";
            
            var scrollview = node.getComponent(cc.ScrollView);
            scrollview.scrollEvents.push(scrollViewEventHandler);
          },
          
          //注意参数的顺序和类型是固定的
          callback: function (scrollview, eventType, customEventData) {
            //这里 scrollview 是一个 Scrollview 组件对象实例
            //这里的 eventType === cc.ScrollView.EventType enum 里面的值
            //这里的 customEventData 参数就等于你之前设置的 "foobar"
          }
        });
      方法二 通过 scrollview.node.on('scroll-to-top', ...) 的方式来添加
        //假设我们在一个组件的 onLoad 方法里面添加事件处理回调,在 callback 函数中进行事件处理:
        cc.Class({
          extends: cc.Component,
          
          
          properties: {
            scrollview: cc.ScrollView
          },
          
          onLoad: function () {
            this.scrollview.node.on('scroll-to-top', this.callback, this);
          },
          
          callback: function (event) {
            //这里的 event 是一个 EventCustom 对象,你可以通过 event.detail 获取 ScrollView 组件
            var scrollview = event.detail;
            //do whatever you want with scrollview
            //另外,注意这种方式注册的事件,也无法传递 customEventData
          }
        });
        同样的,你也可以注册 'scrolling', 'touch-up' , 'scrolling' 等事件,
        这些事件的回调函数的参数与 'scroll-to-top' 的参数一致。
  ScrollBar   滚动条组件,通过拖动滑块滚动节点  
    PS：与Slider组件类似,但是它主要是用于滚动而 Slider 则用来设置数值。
    Handle    滑动块
      长度/宽度会根据 ScrollView 的 content 的大小和实际显示区域的大小来计算
    Direction 滚动方向
    Enable Auto Hide 开启自动隐藏
      如果开启了,那么在 ScrollBar 显示后的Auto Hide Time时间内会自动消失。
    Auto Hide Time   自动隐藏时间,需配合设置Enable Auto Hide
动画编辑器
--------------------------------------------------------------------------------
UI 系统 
  ◆渲染节点
  Sprite         精灵图,场景图像
  Sprite         单色
  Label          文字节点
  RichText       富文本
  ParticleSystem 粒子
  TiledMap       地图
  ◆UI节点 
  Layout      自动布局
  Buttom      按钮
  Canvas      画布
  ScrollView  滚动视图
  Slider      滑动器
  PageView    页面视图
  ProgressBar 进度条
  Toggle      复选按钮
  ToggleGroup 单选按钮
  EditBox     输入框
  VideoPlayer 播放器
  WebView     网页视图
  
  ScrollView 滚动视图
  Prefab 复用列表内容
--------------------------------------------------------------------------------
构建打包发布
--------------------------------------------------------------------------------
动画 
  动画根节点
序列帧动画
曲线动画
运行时自动播放动画















