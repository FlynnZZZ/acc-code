swiper 
配置参数 
  'Basic'基础选项 
    initialSlide num,设定页面加载完成时,第几张图片先显示出来 
      0 表示第1张,默认值   
      1 表示第2张
      以此类推
    direction——设置slide的滑动方向

      horizontal   水平  默认
      vertical     垂直
    speed——滑动速度,即slide滑动开始到结束所用的时间（从左到右所用的时间）
      取值举例:500      单位为 ms
    autoplay——自动切换的时间间隔,不设定该参数,slide不会自动切换
      取值举例：2000 单位 ms
    autoplayDisableOnInteraction——用户操作swiper之后是否禁止autoplay
      ture  停止   默认
      false  不会停止,但是会重新启动autoplay
    autoplay
      如果设置为ture,当切换到最后一个slide时停止自动切换（loop模式下无效）
      false  继续切换  默认值
    grabCursor
      ture  鼠标覆盖Swriper时指针会变成手掌状,拖动时指针会变成抓手形状（根据浏览器有所不同）
      false  默认值
    autoHeight——自动高度
      ture  wrapper和container会随着当前slider的高度而发生变化
      false  默认值
    nested
      用于嵌套相同方向的swiper时,当切换到子swiper时停止父swiper的切换。
      请将子swiper的nested设置为ture
      由于需要在slideChangeEnd时判断作用块,因此快速滑动时这个选项无效
  'free Mode'free模式/抵抗反弹 
    freeMode: <bol>   free模式 
      false  默认:普通模式,slide滑动时只滑动一格,并自动贴合wrapper
      ture   free模式,slide会根据惯性滑动且不会自动贴合
    freeModeMomentum  free模式动量 
      false  关闭动量,释放slide之后立即停止不会滑动
      ture   默认值
    freeModeMomentumRatio——free模式动量值（移动惯量）
      值为number类型,当设置的值越大,释放slide时滑动的距离越大。
    freeModeMomentumBounce——动量反弹。
      false  禁用free模式下的动量反弹,slide通过惯性滑动到边缘时,无反弹效果
      ture   默认值,有反弹效果
    freeModeMomentumBounceRatio——动量反弹的动量值
      值越大,产生的边界反弹效果越明显,反弹距离越大。
    freeModeSticky: <bol>  freeMode模式下是否自动贴合
      false 默认值,不自动贴合 
      ture  freeMode模式也能自动贴合
  'slides grid'网格分布 
    centeredSlides
      ture   活动快居中
      false  活动块居左,默认值
    slidesPreView
      设置slider容器能够同时显示的slides数量（carousel模式）
      可以设置为number或者  auto
      auto  ——  根据slides的宽度来设定数量
      loop模式下,如果设置为auto,还需设置另外一个参数 loopedSlides
    slidesPerGroup
      在carousel mode下定义slides的数量多少为一组。
    slideBetween
      设置slide之间的距离（单位 px）
    slidesPerColumn
      多行布局里面没列的slide数量
    slidesPerColumnFill
      多行布局中以什么形式填充：
      'column'(列)
      1     3     5 
      2     4     6
      'row'(行)
      1     2     3   
      4     5     6
    slidesOffsetBefore
      设置slide与左边框预设偏移量（单位 px）
      类型  number   举例： 100
    slidesOffsetAfter
      设置slide与右边框的预设偏移量（单位 px）
  'Effects'切换效果 
    effect——slide的切换效果
      "slide"——位移切换（默认）
      "fade"——淡入
      "cube"——方块
      "coverflow"——3d流
      "flip"——3d翻转
    fade——fade效果参数。可选参数：crossFade(3.03启用)
      false(默认)——关闭淡出。过渡时,源slide透明度为1（不淡出）,过度中的slide透明度从0->1（淡入）,其他slide透明度为0。
      ture(可选值)——开启淡出。过渡时,源slide透明度从1->0(淡出),过渡中的slide透明度从0->1（淡入）,其他slide透明度为0。
      举例：
      effect:'fade',
      fade:{
        crossFade:false
      }
    cube——效果参数,可选值：
      slideShadows——开启slide阴影。默认ture。
      shadow——开启投影。默认ture。
      shadowOffset——投影距离。默认20,单位px。
      shadowScale投影缩放比例。默认0.94
    
      举例：
      effect : 'cube',
      cube: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 100,
        shadowScale: 0.6
      }
    coverflow——cover flow是类似于苹果将多首歌曲的封面以3D界面的形式显示出来的方式。
      coverflow效果参数,可选值：
      rotate：slide做3d旋转时Y轴的旋转角度。默认50。
      stretch：每个slide之间的拉伸值,越大slide靠得越紧。 默认0。
      depth：slide的位置深度。值越大z轴距离越远,看起来越小。 默认100。
      modifier：depth和rotate和stretch的倍率,相当于depth*modifier、rotate*modifier、stretch*modifier,值越大这三个参数的效果越明显。默认1。
      slideShadows：开启slide阴影。默认 true。
    flip——共有两个参数可设置：
    slideShadows：slides的阴影。默认true。
    limitRotation：限制最大旋转角度为180度,默认true。
  'Clicks'点击 
    preventClicks
      true（默认）——当swiping时组织意外的链接点击。
      false
    preventClicksPropagation——阻止click冒泡,拖动Swiper时组织click事件。
      true(默认)    false
    slideToClickedSlide
      true——swiping时点击slide会过度到这个slide
      false（默认）
  'Touches'触发条件 
    touchRatio——触摸距离与slide滑动距离的比率
      类型：number  默认：1  举例：0.5
      应用实例：利用tuchRatio制作与拖动方向相反的swiper——通过负数
    simulateTouch
      true（默认）——swiper接受鼠标点击、拖动。
      false
    onlyExternal
      true——slide无法拖动,只能使用扩展API函数,例如slideNext()或slidePrev()或slideTo()等改变slides滑动
      false（默认）
    followFinger
      true（默认）
      false——拖动slide时它不会动,当释放slide才会切换
    shortSwopes
      true（默认）
      false——惊醒快速短距离的拖动无法触发swiper
    longSwipesRatio——进行longSwipes时触发swiper所需要的最小拖动距离比例,即定义longSwipes距离比例。
      值越大swiper所需距离越大。最大值0.5
    threshold——拖动的临界值（单位为px）,如果触摸距离小于该值滑块不会被拖动。
    touchAngle——允许触发拖动的角度值。默认45度,即使触摸方向不是完全水平也能拖动slide。
    longSwipes
      true（默认）
      false——进行长时间长距离的拖动无法触发Swiper。
    longSwipesMs——定义longSwipes的时间（单位ms）,超过则属于longSwipes。
    touchMoveStopPropagation
      true（默认）——阻止touchmove冒泡事件。
      false
    resistance——边缘抵抗。
      当swiper已经处于第一个或最后一个slide时,继续拖动Swiper会离开边界,释放后弹回。
      边缘抵抗就是拖离边界时的抵抗力。
      false——禁用,将slide拖离边缘时完全没有抗力。
      true（默认）,将slide脱离边缘时有抗力,可以通过resistanceRatio设定抵抗力大小。
    resistanceRatio——抵抗率。边缘抵抗力的大小比例。值越小抵抗越大越难将slide拖离边缘,0时完全无法拖离。
      默认0.85
      举例：0.7   0.9   0
    iOSEdgeSwipeDetection
      true——开启IOS的UIWebView环境下的边缘探测。如果拖动是从屏幕边缘开始则不触发swiper。
      false（默认）
    iOSEdgeSwipeThreshold——IOS的UIWebView环境下的边缘探测距离。如果拖动小于边缘探测距离则不触发swiper。
      类型：number    默认：20      举例：50
--------------------------------------------------------------------------------
vue-awesome-swiper 
  基于Swiper、适用于Vue的轮播组件,支持服务端渲染和单页应用 
引入 
  CDN 
    <link rel="stylesheet" href="path/to/swiper/dist/css/swiper.css"/>
    <script type="text/javascript" src="path/to/swiper.js"></script>
    <script type="text/javascript" src="path/to/vue.min.js"></script>
    <script type="text/javascript" src="path/to/dist/vue-awesome-swiper.js"></script>
    <script type="text/javascript">
    Vue.use(window.VueAwesomeSwiper)
    </script> 
  NPM 
    $ npm i vue-awesome-swiper --save 
使用 
  // <swiper-wrap :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
  //   <!-- slides -->
  //   <swiper-slide>I'm Slide 1</swiper-slide>
  //   <swiper-slide>I'm Slide 2</swiper-slide>
  //   <swiper-slide>I'm Slide 3</swiper-slide>
  //   <swiper-slide>I'm Slide 4</swiper-slide>
  //   <swiper-slide>I'm Slide 5</swiper-slide>
  //   <swiper-slide>I'm Slide 6</swiper-slide>
  //   <swiper-slide>I'm Slide 7</swiper-slide>
  //   <!-- Optional controls -->
  //   <div class="swiper-pagination"  slot="pagination"></div>
  //   <div class="swiper-button-prev" slot="button-prev"></div>
  //   <div class="swiper-button-next" slot="button-next"></div>
  //   <div class="swiper-scrollbar"   slot="scrollbar"></div>
  // </swiper-wrap>
  import 'swiper/dist/css/swiper.min.css' // require styles
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    data() {
      return {
        swiperOption: {
          // 所有的参数同 swiper 官方 api 参数
          speed: 300
          ,freeMode : true 
          ,freeModeSticky: true
          ,freeModeMomentumRatio: 0.3 
          // ,freeModeMomentumVelocityRatio: 2 
        }
      }
    }
    ,computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    }
    ,components: {
      'swiper-wrap': swiper           // 
      ,'swiper-slide': swiperSlide    // 
    }
    ,mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log('this is current swiper instance object', this.swiper)
      // this.swiper.slideTo(3, 1000, false)
    }
  }
--------------------------------------------------------------------------------




