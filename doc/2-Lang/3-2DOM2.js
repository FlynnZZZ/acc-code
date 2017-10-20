◆专题 
'audio'&'video' [详见 JavaScript高级程序设计 486 页][HTML5] 
  元素对象的标签属性'attribute'&对象属性'property'&方法'methods'
    ★共有 
      ▼标签属性 
        all.src            读写路径,推荐使用子元素<source>实现 
        all.loop           读写是否应在结束时再次播放
        bol = all.autoplay       读写自动播放状态
        bol = all.controls       读写是否应该显示操作控件 
      ▼对象属性 
        bol = all.paused         读写是否暂停播放 
        num = all.currentTime    读写当前播放时长,单位:秒 
        num = all.duration       读写时长,单位:秒 
          在加载完音频/视频前,获取不到,返回NaN,往往需要和canplay事件配合使用
        num = all.playbackRate   读写播放速度,'1.0'为正常速度
        num = all.volume         读写音量,范围'0-1'
        all.muted                读写是否关闭声音
        all.defaultPlaybackRate  读写默认播放速度 
        video.mediaGroup         读写所属的组合,用于连接多个视频/音频元素 
        all.ended          返回播放是否已结束
        all.error          返回错误状态的'mediaError'对象 
          video.error.code 错误码
        all.networkState   返回当前网络状态 
        video.buffered     返回已缓冲部分的'TimeTanges'对象 
        video.controller   返回当前媒体控制器的'MediaController'对象 
        video.crossorigin  若文件不是在同域,则crossorigin会被用来进行指示 
          适用于所有多媒体标签'video''audio''img',
          目的是处理cross-origin资源共享'CORS'的回放问题
      ▼对象方法
        all.play()         播放
        all.pause()        暂停
        all.load()         重新载入音频
        all.canPlayType()  确定浏览器可播放一媒体格式的可能性
          返回值为:空字符串,"maybe"或"probably"
            若浏览器无法播放该格式,返回空字符串""
            若浏览器认为有可能播放该格式,返回"maybe"
            若浏览器认为能够播放改格式,返回"probably"
          Example:
            video.canPlayType("video/ogg")
            只传入一个短形式的格式,只可能得到""或"maybe"
            video.canPlayType('video/ogg; codecs="theora,vorbis"')
            若传入带编解码的具体类型,就可能达到到""、"maybe"或"probably"作为答案
    ★独有 
      ▼标签属性 
        video.poster         读写视频预览图    
        video.preload        读写预加载状态  
          auto 
          metadata 
          none 
      ▼对象属性
        video.currentSrc   返回当前视频的URL
        video.played       返回视频已播放部分的'TimeRanges'对象 
        video.readyState   返回视频当前的就绪状态 
        video.seekable     返回表示视频可寻址部分的'TimeRanges'对象 
        video.seeking      返回用户是否正在视频中进行查找 
        video.startOffsetTime  返回表示当前时间偏移的'Date'对象 
        video.textTracks       返回表示可用文本轨道的'TextTrackList'对象 
        video.videoTracks      返回表示可用视频轨道的'VideoTrackList'对象 
        video.videoWidth   返回当前视频本来的宽,单位:px          
        video.videoHeight  返回当前视频本来的高,单位:px 
    
      audio.fastSeek()     在音频播放器中指定播放时间
      audio.canPlayType()  检查浏览器是否能够播放指定的音频类型
      audio.addTextTrack() 向音频添加新的文本轨道
      audio.requestFullscreen() 全屏
      audio.exltFullscreen()    退出全屏
      audio.autoplay       读写自动播放状态
      audio.defaultMuted   读写音频默认是否静音
      audio.currentSrc     返回当前音频的 URL
    readState
    seeking
  事件 
    ★共有事件
    abort           视频加载放弃时 
    canplay         当视频缓冲完毕可以播放时触发 
    canplaythrough  当浏览器可在不因缓冲而停顿的情况下进行播放时 
    ended           当媒介已抵达结尾时
    error
    play
    playing         当媒介数据正在播放时运行脚本
    pause           当媒介数据暂停时运行脚本
    progress
    ratechange 
    seeked
    seeking
    vstalled
    durationchange 当视频的时长已更改时 
    emptied        当目前的播放列表为空时 
    loadstart
    loadeddata
    loadedmetadata
    suspend
    timeupdate      音频/视频(audio/video)的播放位置发生改变时触发
      若视频在播放时,位置一直在改变,则每秒触发一次
      具体触发情况:
        播放音频/视频(audio/video)时
        移动音频/视频(audio/video)播放位置时
    volumechange
    waiting
    ★独有事件 
  Remarks:
    直接改变音频的src,会立即切换播放;但改变其<source>需要重新加载才会切换播放.
'canvas'画布  [HTML5][IE9+][详参 JavaScript高级程序设计 445 页] 
  PS: 通过'width'和'height'两个标签属性设定尺寸,默认为宽度300px和高度150px;
    若CSS的尺寸与初始画布的比例不一致,会导致画布的内容进行相应的缩放;
    通过canvas,JS可以对图像进行像素级的操作, 
    可以直接处理图像的二进制原始数据,为图像的签名技术提供了支持 
    canvas提供了常用的图像格式转换功能,可使用JS更改图像的编码方式 
  浏览器不允许处理跨域图像  
    可使用CORS进行跨域处理;
    为了阻止欺骗,浏览器会追踪 image data,
    当把跟canvas域不同的图片放到canvas上,canvas就成为'tainted'被污染的,
    浏览器就不让你操作该canvas的任何像素,
    对于阻止多种类型的XSS/CSRF攻击[两种典型的跨站攻击]是非常有用的;
    没有服务器环境[比如本地的html网页,操作本地的一张图片],
    会报"Unable to get image data ... has been tainted by cross-origin data"错误 
    本地网页的域为'file://,如:file:///home/summer/Desktop/test.html',
    本地图片不是以'file://'开头的,如 'c:\tmp\test.png'
  检测浏览器是否支持画布: 检测'canvas.getContext'方法是否存在 
    if(canvas.getContext) {
    }
    else {
    }
  canvas = document.querySelector('canvas')  获取到canvas 
    cvs.toDataURL(type,quality); 返回包含图片的 data URI[需将图片预先放入canvas]
      PS:若画布的高度或宽度是0,那么会返回字符串“data:,”;
      type     可选,返回的图片类型,默认为 PNG
        图片的分辨率为96dpi;
        若传入非“image/png”,但返回的以“data:image/png”开头,则传入类型是不支持的;
        Chrome支持“image/webp”类型。
      quality  可选,设置得到图片的质量
        在指定图片格式为 image/jpeg 或 image/webp的情况下,
        可以从 0 到 1 的区间内选择图片的质量。
        若超出取值范围,将会使用默认值 0.92。其他参数会被忽略。
  ctx = canvas.getContext("2d");   获取canvas的'2d'上下文对象 
    PS: 使用上下文的属性和方法来操作画布,是画布的核心对象
      目前只支持2D绘图,将来可能还会有其他上下文类型 
      设置样式等应写在绘制图形之前,否则样式会渲染不上 
    画布坐标: canvas左上角为原点坐标: 0,0,所有元素的位置都相对于原点定位 
    ★绘制矩形: 不同于SVG,canvas只支持一种原生的图形绘制:矩形 
      不同于路径函数pathFunction,所有其他的图形的绘制都至少需要生成一条路径,
      这三个函数绘制之后会马上显现在canvas上,即时生效.
    ctx.fillRect(x,y,w,h)    绘制填充的矩形 
      x,y   坐标位置,单位px 
      w,h   宽高尺寸,单位px 
    ctx.strokeRect(x,y,w,h)  绘制矩形边框 
    ctx.clearRect(x,y,w,h)   清除一矩形区域,让清除部分完全透明  
    ★绘制路径 
      使用路径绘制图形的步骤:  
        创建路径起始点-绘制出路径-封闭路径-通过描边或填充路径区域来渲染图形 
      ctx.beginPath()  开始路径,之后图形绘制命令被指向到路径上生成路径 
      ctx.closePath()  闭合路径,之后图形绘制命令又重新指向到上下文中 
        闭合路径不是必需的,可通过当前点到开始点的直线来闭合图形,
        若图形是已经闭合了的,即当前点为开始点,该函数什么也不做.
        当调用fill()函数时,所有没有闭合的形状都会自动闭合,也不需要'closePath' 
        但是调用stroke()时不会自动闭合.
      ctx.moveTo(x,y)  移动笔触 
        PS: 该函数实际上并不能画出任何东西.
          当canvas初始化或者'beginPath'调用后,通常使用'moveTo'设置起点 
          也能够使用'moveTo'绘制一些不连续的路径 
      ctx.lineTo(x, y)  绘制一条从当前位置到指定x以及y位置的直线;
        该方法有两个参数:x以及y ,代表坐标系中直线结束的点.
        开始点和之前的绘制路径有关,之前路径的结束点就是接下来的开始点,
        开始点也可以通过moveTo()函数改变.
      ctx.rect(x,y,width,height)  将一个矩形路径增加到当前路径上
        绘制一个左上角坐标为(x,y),宽高为width以及height的矩形.
        当该方法执行的时候,moveTo()方法自动设置坐标参数(0,0) .
        也就是说,当前笔触自动重置会默认坐标. ?
      ctx.arc(x,y,radius,startAngle,endAngle,anticlockwise)  绘制圆弧
        画一个以 x,y 为圆心的以radius为半径的圆弧,从startAngle开始到endAngle结束,
        按照anticlockwise给定的方向[默认为顺时针]来生成.
         x,y为绘制圆弧所在圆上的圆心坐标.
         radius为半径.
         startAngle以及endAngle参数用弧度定义了开始以及结束的弧度.
           角度与弧度的js表达式:radians=(Math.PI/180)*degrees.
         这些都是以x轴为基准.
         参数anticlockwise 为一个布尔值.为true时,是逆时针方向,否则顺时针方向.
      ctx.arcTo(x1,y1,x2,y2,radius) 
        根据给定的控制点和半径画一段圆弧,再以直线连接两个控制点.
      ▼贝塞尔bezier以及二次贝塞尔
        一次以及二次贝塞尔曲线都十分有用,一般用来绘制复杂有规律的图形.
        Example:
          使用贝赛尔曲线绘制对话气泡
            var ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(75,25);
            ctx.quadraticCurveTo(25,25,25,62.5);
            ctx.quadraticCurveTo(25,100,50,100);
            ctx.quadraticCurveTo(50,120,30,125);
            ctx.quadraticCurveTo(60,120,65,100);
            ctx.quadraticCurveTo(125,100,125,62.5);
            ctx.quadraticCurveTo(125,25,75,25);
            ctx.stroke();
          使用贝赛尔曲线绘制心形
            var ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(75,40);
            ctx.bezierCurveTo(75,37,70,25,50,25);
            ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
            ctx.bezierCurveTo(20,80,40,102,75,120);
            ctx.bezierCurveTo(110,102,130,80,130,62.5);
            ctx.bezierCurveTo(130,62.5,130,25,100,25);
            ctx.bezierCurveTo(85,25,75,37,75,40);
            ctx.fill();
      ctx.quadraticCurveTo(cp1x, cp1y, x, y) 绘制贝塞尔曲线
          cp1x,cp1y为控制点坐标,x,y为结束点坐标
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) 绘制二次贝塞尔曲线
          cp1x,cp1y为控制点一坐标,cp2x,cp2y为控制点二坐标,x,y为结束点坐标
    ★样式 
      ◆颜色: 默认情况下,线条和填充颜色都是黑色'#000' 
        通过设置'strokeStyle'或'fillStyle'的值,为新绘制的图形设定颜色 
        若要给每个图形上不同的颜色,需重设'fillStyle'或'strokeStyle'的值 
      ctx.fillStyle='color'    设置填充颜色 
        可使用颜色名、十六进制或RGB、rgba来设置
      ctx.strokeStyle='color'  设置线条颜色  
        可使用颜色名、十六进制或RGB、rgba来设置
      ctx.globalAlpha=num    设置全局透明度
        PS: 该属性影响到canvas里所有图形的透明度,
          globalAlpha 属性在需要绘制大量拥有相同透明度的图形时候相当高效.
          也可设置一个半透明颜色作为轮廓或填充的样式 
        num 有效的值范围: 0.0-1.0,默认'1.0'完全不透明 
      ◆线型
      ctx.lineWidth = value; 设置线条宽度,属性值必须为正数,默认值是 1.0
        线宽是指给定路径的中心到两边的粗细.
        换句话说就是在路径的两边各绘制线宽的一半.
        因为画布的坐标并不和像素直接对应,当需要获得精确的水平或垂直线的时候要特别注意.
      ctx.lineCap = type;    设置线条端点的样式
        butt     默认值
        round    端点处加上了半径为一半线宽的半圆
        square   端点处加上了等宽且高度为一半线宽的方块
      ctx.lineJoin = type;   设定线条与线条间接合处(如折弯的拐角)的样式
        miter  尖叫,默认值
        round  圆角
        bevel  平角
      ctx.miterLimit = value; 限制当两条线相交时交接处最大长度
        所谓交接处长度(斜接长度)是指线条交接处内角顶点到外角顶点的长度
      ctx.setLineDash(segments); 设置当前虚线样式
        接受一个数组,来指定线段与间隙的交替
        Example:
          创建一个行军蚁的效果
          var ctx = document.getElementById('canvas').getContext('2d');
          var offset = 0;
          function draw() {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            ctx.setLineDash([4, 2]);
            ctx.lineDashOffset = -offset;
            ctx.strokeRect(10,10, 100, 100);
          }
          function march() {
            offset++;
            if (offset > 16) {
              offset = 0;
            }
            draw();
            setTimeout(march, 20);
          }
          march();
      ctx.getLineDash(); 返回一个包含当前虚线样式,长度为非负偶数的数组
      ctx.lineDashOffset = value; 设置虚线样式的起始偏移量
      ◆渐变
      ctx.createLinearGradient(x1, y1, x2, y2)
        接受 4 个参数,表示渐变的起点 (x1,y1) 与终点 (x2,y2).
      ctx.createRadialGradient(x1, y1, r1, x2, y2, r2)
        接受 6 个参数,前三个定义一个以 (x1,y1) 为原点,半径为 r1 的圆,
        后三个参数则定义另一个以 (x2,y2) 为原点,半径为 r2 的圆.
        Example:
          var lineargradient = ctx.createLinearGradient(0,0,150,150);
          var radialgradient = ctx.createRadialGradient(75,75,0,75,75,100);
      gradient.addColorStop(position, color)
        创建出 canvasGradient 对象后,我们就可以用 addColorStop 方法给它上色了.
        接受 2 个参数,position 参数必须是一个 0.0 与 1.0 之间的数值,
        表示渐变中颜色所在的相对位置.例如,0.5 表示颜色会出现在正中间.
        color 参数必须是一个有效的 CSS 颜色值(如 #FFF, rgba(0,0,0,1),等等).
        可以根据需要添加任意多个色标(color stops).
        Example:
          线性黑白渐变
            var lineargradient = ctx.createLinearGradient(0,0,150,150);
            lineargradient.addColorStop(0,'white');
            lineargradient.addColorStop(1,'black');
          strokeStyle 和 fillStyle 属性都可以接受 canvasGradient 对象
            var ctx = document.getElementById('canvas').getContext('2d');
            // Create gradients
            var lingrad1 = ctx.createLinearGradient(0,0,0,150);
            lingrad1.addColorStop(0, '#00ABEB');
            lingrad1.addColorStop(0.5, '#fff');
            //lingrad.addColorStop(0.5, '#26C000');
            //lingrad.addColorStop(1, '#fff');
            var lingrad2 = ctx.createLinearGradient(0,50,0,95);
            lingrad2.addColorStop(0.5, '#000');
            lingrad2.addColorStop(1, 'rgba(0,0,0,0)');
            // assign gradients to fill and stroke styles
            ctx.fillStyle = lingrad1;
            ctx.strokeStyle = lingrad2;
            // draw shapes
            ctx.fillRect(10,10,130,130);
            ctx.strokeRect(50,50,50,50);
          径向渐变
            var ctx = document.getElementById('canvas').getContext('2d');
            // 创建渐变
            var radgrad = ctx.createRadialGradient(45,45,10,52,50,30);
            radgrad.addColorStop(0, '#A7D30C');
            radgrad.addColorStop(0.9, '#019F62');
            radgrad.addColorStop(1, 'rgba(1,159,98,0)');
            var radgrad2 = ctx.createRadialGradient(105,105,20,112,120,50);
            radgrad2.addColorStop(0, '#FF5F98');
            radgrad2.addColorStop(0.75, '#FF0188');
            radgrad2.addColorStop(1, 'rgba(255,1,136,0)');
            var radgrad3 = ctx.createRadialGradient(95,15,15,102,20,40);
            radgrad3.addColorStop(0, '#00C9FF');
            radgrad3.addColorStop(0.8, '#00B5E2');
            radgrad3.addColorStop(1, 'rgba(0,201,255,0)');
            var radgrad4 = ctx.createRadialGradient(0,150,50,0,140,90);
            radgrad4.addColorStop(0, '#F4F201');
            radgrad4.addColorStop(0.8, '#E4C700');
            radgrad4.addColorStop(1, 'rgba(228,199,0,0)');
            // 画图形
            ctx.fillStyle = radgrad4;
            ctx.fillRect(0,0,150,150);
            ctx.fillStyle = radgrad3;
            ctx.fillRect(0,0,150,150);
            ctx.fillStyle = radgrad2;
            ctx.fillRect(0,0,150,150);
            ctx.fillStyle = radgrad;
            ctx.fillRect(0,0,150,150);
      ◆图案
      ctx.createPattern(image, type)
        PS:用 canvas 对象作为 Image 参数在 Firefox 1.5 (Gecko 1.8) 中是无效的.
          图案跟渐变类似,创建出一个pattern之后,赋给fillStyle或strokeStyle即可
        Image 可以是一个 Image 对象的引用,或者另一个 canvas 对象.
        Type 必须是下面的字符串值之一:repeat,repeat-x,repeat-y 和 no-repeat.
        Example:
          var ctx = document.getElementById('canvas').getContext('2d');
          var img = new Image();
          img.src = 'images/wallpaper.png';
          img.onload = function(){
            // 创建图案
            var ptrn = ctx.createPattern(img,'repeat');
            ctx.fillStyle = ptrn;
            ctx.fillRect(0,0,150,150);
          }
      ◆阴影
        PS:shadowOffsetX,shadowOffsetY 不受变换矩阵所影响.
          负值表示阴影会往上或左延伸,正值则表示会往下或右延伸,它们默认都为 0.
      shadowOffsetX = float 用来设定阴影在X轴的延伸距离
      shadowOffsetY = float 用来设定阴影在Y轴的延伸距离
      shadowBlur = float 用于设定阴影的模糊程度
        其数值并不跟像素数量挂钩,也不受变换矩阵的影响,默认为 0.
      shadowColor = color 用于设定阴影颜色效果
        shadowColor 是标准的 CSS 颜色值,默认是全透明的黑色.
      Example:
        文字阴影
          var ctx = document.getElementById('canvas').getContext('2d');
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;
          ctx.shadowBlur = 2;
          ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
          ctx.font = "20px Times New Roman";
          ctx.fillStyle = "Black";
          ctx.fillText("Sample String", 5, 30);
      ★渲染路径
      ctx.stroke();    通过线条来绘制图形轮廓  [无参数]
      ctx.fill();      通过填充路径的内容区域生成实心的图形
        PS:当我们用到 fill(或者 clip和isPointinPath )你可以选择一个填充规则,
          该填充规则根据某处在路径的外面或者里面来决定该处是否被填充,
          这对于自己与自己路径相交或者路径被嵌套的时候是有用的.
        两个可能的值:
           "nonzero"    non-zero winding rule, 默认值.
           "evenodd"    even-odd winding rule.
        Example:
          var ctx = document.getElementById('canvas').getContext('2d');
          ctx.beginPath();
          ctx.arc(50, 50, 30, 0, Math.PI*2, true);
          ctx.arc(50, 50, 15, 0, Math.PI*2, true);
          ctx.fill("evenodd");
    ★绘制文本 
      ctx.fillText(text, x, y [, maxWidth]); 在指定的(x,y)位置填充指定的文本
        绘制的最大宽度是可选的
      ctx.strokeText(text, x, y [, maxWidth]); 在指定的(x,y)位置绘制文本边框
        绘制的最大宽度是可选的
      ctx.strokeText(str,x,y,maxwidth); 边框文字 
      ctx.font        取/设字体
        使用和css中相同格式
        Example: :
        ctx.font = "italic bold 1.5em Times,serif"
      ctx.fillText(str,x,y,maxwidth); 填充文字
        str      为需要显示的字符串
        x,y      绘制的起点坐标
          以文字的左下角为参考,当x,y都为0时在画布中看不到文字
        maxwidth 文本的最大宽度,可选参数
          当字符串过多导致宽度超过maxwidth,会响应的缩放以适应.
      ctx.textAlign   置文字水平对齐方式
        PS:在从左到右的语言中,start和end 与 left和right含义相同,比如英语
          但在从右到左的语言(如希伯来语)中,则正好相反
        可设置的值为:start、end、left、right和center
        Example: :
        ctx.textAlign ="left"
      ctx.textBaseline 基线,取/设字体的垂直对齐方式
        bottom
        middle
        alphabetic  (默认值)
        ideographic
        hanging
        top
        Example: :
        ctx.textBaseline = "middle"
      Example: 
        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.font = "48px serif";
        ctx.fillText("Hello world", 10, 50);

        文本用当前的边框样式被绘制:
        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.font = "48px serif";
        ctx.strokeText("Hello world", 10, 50);
      ★文本样式
      ctx.font = value  当前我们用来绘制文本的样式.
        和 CSS font 属性相同的语法. 默认的字体是 '10px sans-serif'
      ctx.textAlign = value 文本对齐选项.
        可选的值包括:start, end, left, right or center. 默认值是 start.
      ctx.textBaseline = value 基线对齐选项
        可选的值包括:top, hanging, middle, alphabetic, ideographic, bottom.
        默认值是 alphabetic.
      ctx.direction = value 文本方向.
        可能的值包括:ltr, rtl, inherit.默认值是 inherit.
      Example:
        ctx.font = "48px serif";
        ctx.textBaseline = "hanging";
        ctx.strokeText("Hello world", 0, 100);
      ctx.measureText() 文本测量
        将返回一个 TextMetrics对象的宽度、所在像素,这些体现文本特性的属性.
        Example:
          var ctx = document.getElementById('canvas').getContext('2d');
          var text = ctx.measureText("foo"); // TextMetrics object
          text.width; // 16;
    ★绘制图像 
      PS: 可以用于动态的图像合成或者作为图形的背景,以及游戏界面(Sprites)等等.
        浏览器支持的任意格式的外部图片都可以使用,比如PNG、GIF或者JPEG.
        你甚至可以将同一个页面中其他canvas元素生成的图片作为图片源.
      引入图像到canvas里需要以下两步基本操作:
        获得一个指向HTMLImageElement的对象或者另一个canvas元素的引用作为源,
          也可以通过提供一个URL的方式来使用图片
        使用 drawImage() 函数将图片绘制到画布上
      获得需要绘制的图片
        canvas的API可以使用下面这些类型中的一种作为图片的源:
          HTMLImageElement 这些图片是由Image()函数构造出来的,或者任何的<img>元素
          HTMLVideoElement 用一个HTML的 <video>元素作为你的图片源,
            可以从视频中抓取当前帧作为一个图像
          HTMLCanvasElement 可以使用另一个 <canvas> 元素作为你的图片源.
          ImageBitmap  它可以从上述的所有源以及其它几种源中生成.
            这是一个高性能的位图,可以低延迟地绘制,
          这些源统一由 CanvasImageSource类型来引用.
        使用相同页面内的图片
          我们可以通过下列方法的一种来获得与canvas相同页面内的图片的引用:
          document.images集合
          document.getElementById() 等方法
        使用其它域名下的图片
          在 HTMLImageElement上使用crossOrigin属性,你可以请求加载其它域名上的图片.
          若图片的服务器允许跨域访问这个图片,那么你可以使用这个图片而不污染canvas,
          否则,使用这个图片将会污染canvas.
        使用其它 canvas 元素
          和引用页面内的图片类似地,用 document.getElementsByTagName 或
          document.getElementById 方法来获取其它 canvas 元素.
          但你引入的应该是已经准备好的 canvas.
          一个常用的应用就是将第二个canvas作为另一个大的 canvas 的缩略图.
        由零开始创建图像
          或者我们可以用脚本创建一个新的 HTMLImageElement 对象.
          要实现这个方法,我们可以使用很方便的Image()构造函数.
            var img = new Image();   // 创建一个<img>元素
            img.src = 'myImage.png'; // 设置图片源地址
            当脚本执行后,图片开始装载.
            若调用 drawImage 时,图片没装载完,那什么都不会发生,
            (在一些旧的浏览器中可能会抛出异常).
            因此你应该用load时间来保证不会在加载完毕之前使用这个图片:
            var img = new Image();   // 创建img元素
            img.onload = function(){
              // 执行drawImage语句
            }
            img.src = 'myImage.png'; // 设置图片源地址
            若你只用到一张图片的话,这已经够了.
            但一旦需要不止一张图片,那就需要更加复杂的处理方法,
            但图片预装载策略超出本教程的范围,感兴趣的话可以参考JavaScript Image Preloader.
        通过 data: url 方式嵌入图像
          我们还可以通过 data:url 方式来引用图像.
          Data urls 允许用一串 Base64 编码的字符串的方式来定义一个图片.
          Example:
            img.src = 'data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw==';
            其优点就是图片内容即时可用,无须再到服务器兜一圈.
            (还有一个优点是,可以将 CSS,JavaScript,HTML 和 图片全部封装在一起,迁移起来十分方便.)
            缺点就是图像没法缓存,图片大的话内嵌的 url 数据会相当的长:
        使用视频帧
          你还可以使用<video> 中的视频帧(即便视频是不可见的).
          Example:
            例如,若你有一个ID为“myvideo”的<video> 元素,你可以这样做:
            var canvas = document.getElementById('canvas');
            if (canvas.getContext) {
              var ctx = canvas.getContext('2d');
              return document.getElementById('myvideo');
            }
            它将为这个视频返回HTMLVideoElement对象,正如我们前面提到的,它可以作为我们的Canvas图片源.
      绘制图片
        一旦获得了源图对象,我们就可以使用 drawImage 方法将它渲染到 canvas 里.
        ctx.drawImage(image, x, y)
          其中 image 是 image 或者 canvas 对象,
          x 和 y 是其在目标 canvas 里的起始坐标.
          SVG图像必须在 <svg> 根指定元素的宽度和高度.
          Example:
            var ctx = document.getElementById('canvas').getContext('2d');
            var img = new Image();
            img.src = 'images/backdrop.png';
            img.onload = function(){
              ctx.drawImage(img,0,0);
              ctx.beginPath();
              ctx.moveTo(30,96);
              ctx.lineTo(70,66);
              ctx.lineTo(103,76);
              ctx.lineTo(170,15);
              ctx.stroke();
            }
        ctx.drawImage(image,x,y,width,height) 增加缩放
          PS:注意:图像可能会因为大幅度的缩放而变得起杂点或者模糊.
            若您的图像里面有文字,那么最好还是不要进行缩放,
            因为那样处理之后很可能图像里的文字就会变得无法辨认了.
          drawImage 方法的又一变种是增加了两个用于控制图像在 canvas 中缩放的参数.
          这个方法多了2个参数:width 和 height,
          这两个参数用来控制 当像canvas画入时应该缩放的大小
          Example:
            图像大小被缩放至 50*38 px
            var ctx = document.getElementById('canvas').getContext('2d');
            var img = new Image();
            img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
            img.onload = function(){
              ctx.drawImage(img,50,38,50,38);
            };
        drawImage(image,sx,sy,sWidth,sHeight,dx,dy,dWidth,dHeight) 增加切片
          PS:切片是个做图像合成的强大工具.
            假设有一张包含了所有元素的图像,那么你可以用这个方法来合成一个完整图像.
            drawImage 方法的第三个也是最后一个变种有8个新参数,用于控制做切片显示的.
          第一个参数和其它的是相同的,都是一个图像或者另一个 canvas 的引用.
          前4个是定义图像源的切片位置和大小,后4个则是定义切片后目标显示位置和大小.
          Example:
            相册
              24-bit PNG 图像带有一个完整的 8-bit alpha 通道,与 GIF 和 8-bit PNG 不同,
              可以将它放成背景而不必担心底色的问题.
              var canvas = document.getElementById('canvas');
              var ctx = canvas.getContext('2d');
              // Draw slice
              ctx.drawImage(document.getElementById('source'),
                            33,71,104,124,21,20,87,104);
              // Draw frame
              ctx.drawImage(document.getElementById('frame'),0,0);
            画廊
              for (i=0;i<document.images.length;i++){
                // Don't add a canvas for the frame image
                if (document.images[i].getAttribute('id')!='frame'){
                  // Create canvas element
                  canvas = document.createElement('CANVAS');
                  canvas.setAttribute('width',132);
                  canvas.setAttribute('height',150);
                  // Insert before the image
                  document.images[i].parentNode.insertBefore(canvas,document.images[i]);
                  ctx = canvas.getContext('2d');
                  // Draw image to canvas
                  ctx.drawImage(document.images[i],15,20);
                  // Add frame
                  ctx.drawImage(document.getElementById('frame'),0,0);
                }
              }
    Path2D 对象 用来缓存或记录绘画命令,这样就能快速地回顾路径
      PS:为了简化代码和提高性能,Path2D对象已可以在较新版本的浏览器中使用
        所有的路径方法比如 moveTo, rect, arc 或 quadraticCurveTo等,都可以在Path2D中使用
      ★创建 Path2D
        Path2D()会返回一个新初始化的Path2D对象,
        可能将某一个路径作为变量——创建一个它的副本,
        或者将一个包含SVG path数据的字符串作为变量.
      var pathd = new Path2D();     // 空的Path对象
      var pathd = new Path2D(path); // 克隆Path对象
      var pathd = new Path2D(d);    // 从SVG建立Path对象
      pathd.addPath(path [, transform])​
        Path2D API 添加了 addPath作为将path结合起来的方法.
        当你想要从几个元素中来创建对象时,这将会很实用.比如:
        添加了一条路径到当前路径(可能添加了一个变换矩阵).
      Example:
        在这个例子中,我们创造了一个矩形和一个圆.
        它们都被存为Path2D对象,后面再派上用场.
        随着新的Path2D API产生,几种方法也相应地被更新来使用Path2D对象而不是当前路径.
        在这里,带路径参数的stroke和fill可以把对象画在画布上.
        var ctx = canvas.getContext('2d');
        var rectangle = new Path2D();
        rectangle.rect(10, 10, 50, 50);
        var circle = new Path2D();
        circle.moveTo(125, 35);
        circle.arc(100, 35, 25, 0, 2 * Math.PI);
        ctx.stroke(rectangle);
        ctx.fill(circle);
      使用 SVG paths
        新的Path2D API有另一个强大的特点,就是使用SVG path data来初始化canvas上的路径.
        这将使你获取路径时可以以SVG或canvas的方式来重用它们.
        Example:
          这条路径将先移动到点 (M10 10) 然后再水平移动80个单位 (h 80),
          然后下移80个单位 (v 80),接着左移80个单位 (h -80),再回到起点处 (z).
          var p = new Path2D("M10 10 h 80 v 80 h -80 Z");
    ★    
      ctx.globalCompositeOperation  取/设显示层次
        PS:在新图像产生前进行定义
        source-over 默认,新图像在原内容上显示,产生覆盖效果
        source-in   新图形会仅仅出现与原有内容重叠的部分.其它都变成透明
        source-atop 新图形中与原有内容重叠的部分会被绘制,并覆盖于原有内容之上.
        source-out  只有新图形中与原有内容不重叠的部分会被绘制出来
        destination-over 会在原有内容之上绘制新图形
        destination-atop 原有内容中与新内容重叠的部分会被保留,并会在原有内容之下绘制新图形
        destination-in  原有内容中与新图形重叠的部分会被保留,其它区域都变成透明的.
        destination-out 原有内容中与新图形不重叠的部分会被保留.
        lighter 两图形中重叠部分作加色处理.
        copy   只有新图形会被保留,其它都被清除掉
        xor    重叠的部分会变成透明.
        darker 两图形中重叠的部分作减色处理
        Example: :
        ctx.globalCompositeOperation ="source-over"
    ★路径相关: 在描出路径之前,路径是不可见的
      在绘制多个图形时,应该在绘制一个图形之前开绘制路径,
      定制完成后关闭绘制路径并绘制定制好的图形.

      ctx.lineWidth    设置直线的宽度
      ctx.lineCap  设置线的端点样式
        butt   默认,边缘是平的,与当前线条垂直
        round  边缘是半圆,该半圆的直径是当前线条的长度;
        square 边缘是长方形,该长方形的长是当前线条的宽度,宽是当前线条宽度的一半;
      ctx.lineTo(x,y); 从当前位置画直线到
        参数x,y为数值,表示x,y的坐标
      ctx.arc(x,y,radius,startAngle,endAngle,direction); 绘制圆形路径
        x,y为坐标  指定圆心位置
        radius     圆半径
        startAngle 起始角度,起始点与圆心的连线和x轴正方向间的角度
          角度单位为弧度
          x轴正方向为水平向右
          角度可为负即逆时针旋转的角度.
        endAngle   终点角度,
        direction  逆/顺时针旋转.true为逆时针,false为顺时针.
      ctx.closePath(); 闭合路径
    ★图片绘制
      Example:
      var ctx = document.getElementById("mycanvas").getContext("2d");
      var img=document.getElementById("myImg");
      ctx.beginPath();
      ctx.drawImage(img,x,y);
      ctx.closePath();
      ctx.drawImage(图片/画布/视频(元素)对象,x,y,width,height); 放置图片
        三参数:1 需要绘制的图片对象, 2 3 图片坐标；
        五个参数:1 需要绘制的图片对象, 2 3 图片坐标, 4 5 图片宽高；
        九个参数:1 需要绘制的图片对象, 2 3 绘制图片的横纵向切割点,
          4 5 切割宽度, 6 7 切割好的图片坐标, 8 9 切割好的图片宽高
        关于第一个参数
          得到图片对象的方法:
            可通过DOM获取 document.getElementById()
            创建一个image对象 var img =new Image();img.src="XX"
          为视频元素时,可将视频画面放在画布中
        Remarks:
          图片并不总会立即加载,所以在加入图片之前要确保图片已经完全加载,一般如下处理
            图片对象.onload =function(){
              context.drawImage(图片对象,x,y,width,height);
            }
      ctx.getImageData(x,y,width,height); 获取图片
      ctx.putImageData
      ctx.save();    保存状态
        保存之前context的状态,如fillStyle、strokeStyle、lineWidth等
      ctx.restore(); 恢复之前保存的状态
      ctx.translate(x,y);   画布平移
        Example: :
        context.translate(20,50)
        分别向x,y方向移动20,50(单位为像素)
      ctx.rotate(弧度值);   画布旋转
    ★绘制阴影
      ctx.shadowOffsetX=num; 横向偏移量
      ctx.shadowOffsetY=num; 纵向偏移量
      ctx.shadowColor   阴影颜色
      ctx.shadowBlur=num; 模糊等级
    ★绘制渐变
      Example:
      ctx.beginPath();
      var color=ctx.createLinearGradient(500,500,500,0);
      color.addcolorStop(0.3,"orange");
      color.addcolorStop(0.5,"yellow");
      color.addcolorStop(1,"gray");
      ctx.fillStyle=color;
      ctx.fillRect(0,0,1200,500);
      ctx.closePath();
      var color=ctx.createLinearGradient(x1,y1,x2,y2); 定义线性渐变
        x1,y1  渐变开始的坐标
        x2,y2  渐变结束的坐标
      var color=ctx.createLinearGradient(x1,y1,x2,y2); 定义圆形渐变
      color.addColorStop(小数值,颜色);  添加渐变色
        Example:
        color.addColorStop(0.3,"orange");
        color.addColorStop(0.5,"yellow");
    Example:
      使用 translate rotate save restore 绘制图案
        <canvas id="canvas" width="400" height="400"></canvas>

        var canvas =document.getElementById("canvas");
        var context =canvas.getContext("2d");
        var degrees =36;
        context.save();
        // 保存上下文状态,以便在工作完成之后能恢复到正常位置
        context.translate(200,200);
        context.fillStyle ="rgba(50,50,50,0.5)";
        for(var i=0; i<360/degrees;i++){
          context.fillRect(0,0,100,100);
          context.rotate(degrees*Math.PI/180);
        }
        context.restore();
其他标签脚本 
  <a href="#"></a> 超链接
    URL 协议
      URL 支持 javascript: 协议,调用URL时会执行对应的JS代码
      Example: <a href="Javascript:console.log(111);">11111111</a>
      浏览器地址栏也支持 javascript: 协议
      Example: 将 javascript:console.log(111) 放入地址栏,回车执行
      若JS代码返回的为字符串,则浏览器会在页面中显示出该字符串
        Chrome: 清空当前页面,显示出返回的字符串
        <a href="Javascript:'aaa'" target="_blank">11111111</a>  
        javascript:"aaa"   // 在浏览器地址栏中键入
  <script src="" charset="utf-8"></script>  脚本引入 
'Web Workers'工作线程[HTML5]
  JavaScript是单线程,一次只能做一件事.
  HTML5 可使JS创建多个Web工作线程.
  通过 window["Worker"] 来查看是否支持Web工作线程.
  工作线程对象(在主JS中)
    工作线程由一个单独的JavaScript文件定义
    无法访问主浏览器代码能够访问的很多数据
    创建一个工作线程对象
      通过一JS文件创建一个工作线程对象.
      var worker =new Worker("worker.js")
      可以通过一个JS文件创建多个对象,也可通过不同的JS文件创建其他的对象
      worker.js 表示一个JS文件的路径,且该JS文件不需引入到HTML中.
    属性
      onmessage  定义从 工作线程JS 传来的消息的处理程序
        为该属性定义一个处理函数,收到一个消息就会调用这个处理函数
        处理函数的参数的data属性即为 工作线程发回的消息
        event.data   表示 工作线程JS 发送的消息
        event.target 表示发出消息的这个工作线程
        Example:
          worker.onmessage =function(event){
            var message =event.data;
          }
      onerror    处理工作线程中的错误
        worker.onerror =function(error){
          console.log("There was an error in" + error.filename + "at line number" + error.lineno + ":" + error.message);
        }
    方法
      postMessage  发送消息给工作线程
        worker.postMessage()
        参数可可以是:字符串、数组、对象等(但不能发送函数)
      terminate    终止工作线程
      worker.terminate() 若工作线程在运行,则会使其异常停止,且无法再启用,只能再新建
  定义工作线程JS文件
    使用一个onmessage定义一个 接到消息后进行 处理的程序
      Example: onmessage = PP;
        function PP(event){
          // 若主程序发来"ping",则工作线程JS 回复"pong"
          if(event.data =="ping"){
            postMessage("pong")
          }
        }
    importScripts 函数
      使用 importScripts 可向工作线程JS文件中导入一个或多个JS文件
      importScripts("http://big.com/a.js","https://www.baidu.com/b.js")
      多个JS间使用逗号分割.
      也可使用 importScripts 建立JSONP请求
        Example:
          function makeServerRequest(){
            importScripts("http://SomeServer.com?callback=handleRequest");
            function handleRequest(response){
              postMessage(response);
            }
          }
          makeServerRequest();
    close         停止工作
      close() 让工作线程停止工作.
  Example: 工作线程JS 接收命令执行操作 并返回
     (谷歌浏览器报错,其他浏览器可以使用)
      manager.js 文件中(需要链接到HTML文件中)
        window.onload =function(){
          var worker =new Worker("worker.js");
          worker.postMesage("ping");
          worker.onmessage =function(event){
            var message ="工作线程JS返回的消息:"+event.data;
            alert(message);
          }
        }
      worker.js 文件中(不需引入HTML文件中)
        onmessage =function(event){
          if(event.data == "ping"){
            postMessage("pong")
          }
        }
