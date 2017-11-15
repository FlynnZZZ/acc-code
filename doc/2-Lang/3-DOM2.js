◆专题 
★'canvas'画布  [HTML5][IE9+] 
CanvasRenderingContext2D,canvas的'2D'上下文对象 
  PS: 使用上下文的属性和方法来操作画布,是画布的核心对象 
    目前只支持2D绘图,将来可能还会有其他上下文类型 
    设置样式等应写在绘制图形之前,否则样式会渲染不上 
  Feature: 
    画布坐标: canvas左上角为原点坐标: 0,0,所有元素的位置都相对于原点定位 
    图片资源对象: 上下文中使用的图片资源 
      统一由 CanvasImageSource 类型来引用 
      canvas的API可以使用下面这些类型中的一种作为图片的源:
      HTMLImageElement  由 Image() 构造出来,或任何<img>元素
      HTMLVideoElement  用一个HTML的<video>元素作为你的图片源 
        可从视频中抓取当前帧作为一个图像
      HTMLCanvasElement 使用另一个 <canvas> 元素作为图片源 
      ImageBitmap  可从上述的所有源以及其它几种源中生成 
        一个高性能的位图,可低延迟地绘制 
      使用跨域图片: 
        1 若图片的服务器允许跨域访问该图片,则不会污染canvas,否则会污染canvas
        2 设置 img.crossOrigin = 'anonymous'  
  Instance: ctx = canvas.getContext("2d")  
  Proto: 
    ★绘制矩形: canvas只支持一种原生的图形绘制: 矩形[不同于SVG]  
      PS: 矩形是唯一一种可以直接在2D 上下文中绘制的形状
    .strokeRect(x,y,w,h)  绘制左上角为(x,y)、宽w、高h的描边矩形 
    .fillRect(x,y,w,h)    绘制左上角为(x,y)、宽w、高h的填充矩形 
    .clearRect(x,y,w,h)   清空一左上角为(x,y)、宽w、高h的矩形区域 
      清除部分完全透明  
    ★样式控制 
    颜色: 默认情况下,描边和填充颜色都是黑色'#000' 
      通过设置'strokeStyle'或'fillStyle'的值,为新绘制的图形设定颜色 
      若要给每个图形上不同的颜色,需重设'fillStyle'或'strokeStyle'的值 
    .fillStyle='color'    读写,填充颜色 
      PS: 值可为字符串、渐变对象或模式对象
      可使用颜色名、十六进制或RGB、rgba来设置
    .strokeStyle='color'  读写,描边颜色  
      PS: 值可为字符串、渐变对象或模式对象
      可使用颜色名、十六进制或RGB、rgba来设置
    .globalAlpha       num,读写,全局透明度,范围 0.0-1.0  
      PS: 该属性影响到canvas里所有图形的透明度,
        globalAlpha 属性在需要绘制大量拥有相同透明度的图形时候相当高效.
        也可设置一个半透明颜色作为轮廓或填充的样式 
      默认 0,不透明 
    线型
    .lineWidth    num,读写,线宽,默认 1.0 
      PS: 值必须为正数 
        线宽是指给定路径的中心到两边的粗细,即在路径的两边各绘制线宽的一半 
        因为画布的坐标并不和像素直接对应,当需要获得精确的水平或垂直线的时候要特别注意.
    .lineCap   kw,读写,线条端点样式 
      'butt'     默认值,平头 
      'round'    半圆,圆头 
      'square'   宽且高度为一半线宽的方块,方头 
    .lineJoin  kw,读写,线条接合处[如折弯的拐角]的样式 
      'miter'  斜接,默认值
      'round'  圆交 
      'bevel'  斜交 
    .miterLimit=value  限制当两条线相交时交接处最大长度
      所谓交接处长度(斜接长度)是指线条交接处内角顶点到外角顶点的长度
    .setLineDash(segments) 设置当前虚线样式
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
    .getLineDash()         返回一个包含当前虚线样式,长度为非负偶数的数组
    .lineDashOffset=value  设置虚线样式的起始偏移量
    阴影 
    .shadowColor   读写,阴影颜色 
      值为标准的CSS颜色值,默认是全透明的黑色 
    .shadowOffsetX/.shadowOffsetY  num,读写,阴影在X/Y轴的偏移量 
      负值表示阴影会往上或左偏移,默认都为 0 
    .shadowBlur    num,阴影模糊像素值,默认 0,即不模糊  
    渐变 
    .createLinearGradient(x1,y1,x2,y2)       CanvasGradient,创建线性渐变 
      x1,y1  渐变起点 
      x2,y2  渐变终点 
    .createRadialGradient(x1,y1,r1,x2,y2,r2) CanvasGradient,创建径向渐变
      x1,y1,r1   圆1 
      x2,y2,r2   圆2  
    gradient.addColorStop(pos,color)   色标,定义创建的渐变 
      PS: 可根据需要添加多个色标'color stops' 
      pos   num,渐变中颜色所在的相对位置,范围 0.0-1.0
        如,0.5 表示颜色会出现在正中间
      color 参数一个有效的CSS颜色值,如 #FFF,rgba(0,0,0,1) 等 
    .strokeStyle 和 .fillStyle 都可接受 CanvasGradient 对象 
      var ctx = document.getElementById('canvas').getContext('2d');
      var lingrad1 = ctx.createLinearGradient(0,0,0,150);
      lingrad1.addColorStop(0, '#00ABEB');
      lingrad1.addColorStop(0.5, '#fff');
      var lingrad2 = ctx.createLinearGradient(0,50,0,95);
      lingrad2.addColorStop(0.5, '#000');
      lingrad2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = lingrad1;
      ctx.strokeStyle = lingrad2;
      ctx.fillRect(10,10,130,130);
      ctx.strokeRect(50,50,50,50);
    ★图案重复 
    .createPattern(img,type)  创建重复模式 
      PS: 图案跟渐变类似,创建出一个pattern之后,赋给.fillStyle 或.strokeStyle 即可
      img  图片资源对象  
      type 重复类型: 'repeat'、'repeat-x'、'repeat-y'和'no-repeat' 
      Example:
        var img = new Image();
        img.src = 'images/wallpaper.png';
        img.onload = function(){
          var pat = ctx.createPattern(img,'repeat');
          ctx.fillStyle = pat;
          ctx.fillRect(0,0,150,150);
        }
    层次 
    .globalCompositeOperation  kw,读写,显示层次 
      PS: 在新图像产生前进行定义
      'source-over' 默认值,覆盖效果,后绘制图形位于先绘制图像的上方 
      'source-in'   后绘制的图形与先绘制的图形重叠的部分可见,两者其他部分完全透明 
      'source-out'  后绘制的图形与先绘制的图形不重叠的部分可见,先绘制的图形完全透明 
      'source-atop' 新图形中与原有内容重叠的部分会被绘制,并覆盖于原有内容之上.
      'destination-over' 后绘制的图形位于先绘制的图形下方,只有之前透明像素下的部分才可见 
      'destination-atop' 后绘制的图形位于先绘制的图形下方,在两者不重叠的地方,先绘制的 图形会变透明 
      'destination-in'  后绘制的图形位于先绘制的图形下方,两者不重叠的部分完全透明 
      'destination-out' 后绘制的图形擦除与先绘制的图形重叠的部分 
      'lighter' 后绘制的图形与先绘制的图形重叠部分的值相加,使该部分变亮 
      'copy'    后绘制的图形完全替代与之重叠的先绘制图形
      'xor'     后绘制的图形与先绘制的图形重叠的部分执行“异或”操作
      'darker'  两图形中重叠的部分作减色处理 
      Example: :
      ctx.globalCompositeOperation ="source-over"
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
    ★绘制路径 
      使用路径绘制图形的步骤:  
        创建路径起始点-绘制出路径-封闭路径-通过描边或填充路径区域来渲染图形 
    路径控制
    .beginPath()  开始路径  
    .closePath()  闭合路径,后续绘制命令将重新指向上下文 
      闭合路径不是必需的,可通过当前点到开始点的直线来闭合图形,
      若图形是已经闭合了的,即当前点为开始点,该函数什么也不做.
      当调用fill()函数时,所有没有闭合的形状都会自动闭合,也不需要'closePath' 
      但是调用stroke()时不会自动闭合.
    .moveTo(x,y)  移动笔触 
      PS: 该函数实际上并不能画出任何东西.
        当canvas初始化或者'beginPath'调用后,通常使用'moveTo'设置起点 
        也能够使用'moveTo'绘制一些不连续的路径 
    .isPointInStroke(x,y)  bol,点是否位于路径上 
    线条绘制  
    .lineTo(x,y)    绘制上一点到(x,y)的直线 
      x,y   直线结束的坐标点 
      必须具备之前的点,否则不可绘制  [SlPt] 
        开始点也可通过 moveTo() 函数来指定 
    .rect(x,y,w,h)  绘制左上角为(x,y)、宽w、高h的矩形   
    .arc(x,y,r,startAngle,endAngle,bol)  通过'圆心+半径+夹角'绘制圆弧 
      PS: 绘制起点为(x+r,y) 
      x,y    圆心坐标
      r      半径
      startAngle num,起始角,单位弧度 
         PS: 可为负,即反方向 
         转换表达式: radians=(Math.PI/180)*num 
      endAngle   num,结束角,单位弧度 
      bol   是否逆时针方向,默认 false 
    .arcTo(x1,y1,x2,y2,r)  连接上一点到(x2,y2)的弧线 
      PS: 上一点到(x1,y1)的直线作为圆弧起点[即上一点]的控制切线 
        上一点必须存在,否则使用 moveTo() 指定 
      根据给定的控制点和半径画一段圆弧,再以直线连接两个控制点 
    贝塞尔bezier以及二次贝塞尔
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
    .quadraticCurveTo(cp1x, cp1y, x, y) 绘制贝塞尔曲线 
      cp1x,cp1y为控制点坐标,x,y为结束点坐标
    .bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) 绘制二次贝塞尔曲线
        cp1x,cp1y为控制点一坐标,cp2x,cp2y为控制点二坐标,x,y为结束点坐标
    ★渲染路径
    .stroke()    路径描边  
    .fill([kw])  路径填充
      PS: 当我们用到 fill(或者 clip和isPointinPath )你可以选择一个填充规则,
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
    .clip()     创建剪切区 
    ★绘制文本 
      Example: 
      var ctx = document.getElementById('canvas').getContext('2d');
      ctx.font = "48px serif";
      ctx.textBaseline = "hanging";
      ctx.fillText("Hello world", 10, 50);
      或
      ctx.strokeText("Hello world", 10, 50);
    .font         读写,文本样式、大小及字体  
      使用和css中相同格式
      默认字体样式为 '10px sans-serif'
      Example: :
      ctx.font = "italic bold 1.5em Times,serif"
    .textAlign    kw,读写,文本水平对齐方式 
      PS: 在从左到右的语言中,start和end 与 left和right含义相同,比如英语
        但在从右到左的语言中,如希伯来语,则正好相反
      'start'  默认值,起点对齐 
      'end'    终点对齐 
      'left' 
      'right' 
      'center' 
      Example: :
      ctx.textAlign ="left"
    .textBaseline 读写,基线,字体的垂直对齐方式 
      'alphabetic'  默认值,
      'top'
      'middle'
      'bottom'
      'ideographic'
      'hanging'
      Example: :
      ctx.textBaseline = "middle"
    .direction    读写,文本方向 
      'inherit'  默认值 
      'ltr'
      'rtl'
    .measureText(str)  TextMetrics,字符串文本测量 
      PS: 直接返回字符串的信息,不用添加到画布中 
      Example:
      var ctx = document.getElementById('canvas1').getContext('2d');
      var text = ctx.measureText("abc"); // TextMetrics object
      console.log(text.width); // 16.9287109375 
    .fillText(text,x,y[,maxW])    填充以(x,y)为左下角的文本  
      text   str,需绘制的文本 
      x,y    绘制的起点坐标 
        以文字的左下角为参考,当x,y都为0时在画布中看不到文字
      maxW   可选,绘制的最大宽度 
        当字符串过多导致宽度超过maxwidth,会响应的缩放以适应
    .strokeText(text,x,y[,maxW])  描边以(x,y)为左下角的文本 
    ★绘制图像 
      PS: 可用于图像动态合成或图形背景,及游戏界面Sprites等 
      引入图像到canvas里需要以下两步基本操作:
        获得一个指向HTMLImageElement的对象或者另一个canvas元素的引用作为源,
          也可以通过提供一个URL的方式来使用图片
        使用 drawImage() 函数将图片绘制到画布上
    .drawImage(img,x,y[,w,h])  绘制图像 
      img  图片资源对象 
      x,y  绘制图像的起始点坐标,作为图片的左上角
      w,h  宽高,可选,将绘制的图像缩放至指定宽高  
      Example:
        var ctx = document.getElementById('canvas').getContext('2d');
        var img = new Image();
        img.src = 'images/backdrop.png';
        img.onload = function(){
          ctx.drawImage(img,0,0);
        }
    .drawImage(img,sX,sY,sW,sH,dX,dY,dW,dH)  局部展示 
      PS: 用于图像合成的强大工具 
      s<x>  定义图像源的切片位置和大小  
      d<y>  定义切片后目标显示位置和大小
    ★变换 
    .rotate(angle)   顺时针旋转 
    .scale(scaleX,scaleY)  缩放图像 
      x方向乘以scaleX,在y方向乘以scaleY,scaleX、scaleY默认为 1.0 
    .translate(x,y)   变换原点,(0,0)变为(x,y) 
    .transform(m1_1,m1_2,m2_1,m2_2,dx,dy)  直接修改变换矩阵 
      方式是乘以如下矩阵: 
      m1_1  m1_2  dx
      m2_1  m2_2  dy
      0     0     1
    .setTransform(m1_1,m1_2,m2_1,m2_2,dx,dy) 重设变换矩阵 
    ★状态保存与重载 
      PS: 可保存样式设置和变换
    .save()     保存设置 
    .restore()  使用上一个保存的设置 
    ★使用图像数据  
    .getImageData(x,y,w,h)  ImageData,获取图像数据 
      x,y  获取图片的左上角坐标 
      w/h  宽/高 
      ImageData 
        .width  
        .height 
        .data   arr,读写,保存着图像中每一个像素的数据 
          在data数组中,每一个像素用 4 个元素保存,分别表示红、绿、蓝和透明度值 
          数组中每个元素的值都介于 0 到 255 间,包括0和255 
      Example: 彩色转黑白
        var ctx = canvas.getContext("2d");
        var img = document.images[0];
        ctx.drawImage(img,0,0); //绘制原始图像
        var imageData = ctx.getImageData(0,0,img.width,img.height); 
        var data = imageData.data; //取得图像数据
        var len = data.length;
        var red, green, blue, average, alpha;
        for (var i=0,i < len; i+=4){
          red = data[i];
          green = data[i+1];
          blue = data[i+2];
          alpha = data[i+3];
          average = Math.floor((red + green + blue) / 3); //求得rgb 平均值
          //设置颜色值,透明度不变
          data[i] = average;
          data[i+1] = average;
          data[i+2] = average;
        }
        imageData.data = data; //回写图像数据并显示结果
        ctx.putImageData(imageData, 0, 0);
    .putImageData(imageData,x,y)  绘制图像数据 
    ★其他
    .canvas 
    .filter 
    .imageSmoothingEnabled 
    .imageSmoothingQuality 
    .resetTransform()   
    .drawFocusIfNeeded()   
    .isPointInPath()   
    .createImageData()   
    .ellipse()   
CanvasPattern 
CanvasGradient 
★Path2D 对象 用来缓存或记录绘画命令,这样就能快速地回顾路径
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
★WebGL,针对canvas的3D上下文,非W3C标准 [JS高程 464 页] 
  PS: 浏览器中使用的WebGL基于Khronos Group设计的 OpenGL ES 2.0 
WebGLRenderingContext,canvas的'3D'上下文对象 
  PS: 
  Feature: 
    视口内坐标原点为视口的中心点 
  Extend: Object 
  Static: 
    常量 
      .STENCIL_BUFFER_BIT    1024 
      .COLOR_BUFFER_BIT      16384 
      .POINTS          0 
      .LINES           1 
      .LINE_LOOP       2 
      .LINE_STRIP      3 
      .TRIANGLES       4 
      .TRIANGLE_STRIP  5 
      .TRIANGLE_FAN    6 
      .ZERO      0 
      .ONE       1 
      .SRC_COLOR      768 
      .ONE_MINUS_SRC_COLOR      769 
      .SRC_ALPHA      770 
      .ONE_MINUS_SRC_ALPHA      771 
      .DST_ALPHA      772 
      .ONE_MINUS_DST_ALPHA      773 
      .DST_COLOR      774 
      .ONE_MINUS_DST_COLOR      775 
      .SRC_ALPHA_SATURATE      776 
      .FUNC_ADD      32774 
      .BLEND_EQUATION      32777 
      .BLEND_EQUATION_RGB      32777 
      .BLEND_EQUATION_ALPHA      34877 
      .FUNC_SUBTRACT      32778 
      .FUNC_REVERSE_SUBTRACT      32779 
      .BLEND_DST_RGB      32968 
      .BLEND_SRC_RGB      32969 
      .BLEND_DST_ALPHA      32970 
      .BLEND_SRC_ALPHA      32971 
      .CONSTANT_COLOR      32769 
      .ONE_MINUS_CONSTANT_COLOR      32770 
      .CONSTANT_ALPHA      32771 
      .ONE_MINUS_CONSTANT_ALPHA      32772 
      .BLEND_COLOR      32773 
      .ARRAY_BUFFER      34962 
      .ELEMENT_ARRAY_BUFFER      34963 
      .ARRAY_BUFFER_BINDING      34964 
      .ELEMENT_ARRAY_BUFFER_BINDING      34965 
      .STREAM_DRAW      35040 
      .STATIC_DRAW      35044 
      .DYNAMIC_DRAW      35048 
      .BUFFER_SIZE      34660 
      .BUFFER_USAGE      34661 
      .CURRENT_VERTEX_ATTRIB      34342 
      .FRONT      1028 
      .BACK      1029 
      .FRONT_AND_BACK      1032 
      .TEXTURE_2D      3553 
      .CULL_FACE      2884 
      .BLEND      3042 
      .DITHER      3024 
      .STENCIL_TEST      2960 
      .SCISSOR_TEST      3089 
      .POLYGON_OFFSET_FILL      32823 
      .SAMPLE_ALPHA_TO_COVERAGE      32926 
      .SAMPLE_COVERAGE      32928 
      .NO_ERROR      0 
      .INVALID_ENUM      1280 
      .INVALID_VALUE      1281 
      .INVALID_OPERATION      1282 
      .OUT_OF_MEMORY      1285 
      .CW      2304 
      .CCW      2305 
      .LINE_WIDTH      2849 
      .ALIASED_POINT_SIZE_RANGE      33901 
      .ALIASED_LINE_WIDTH_RANGE      33902 
      .CULL_FACE_MODE      2885 
      .FRONT_FACE      2886 
      .STENCIL_CLEAR_VALUE      2961 
      .STENCIL_FUNC      2962 
      .STENCIL_FAIL      2964 
      .STENCIL_PASS_DEPTH_FAIL      2965 
      .STENCIL_PASS_DEPTH_PASS      2966 
      .STENCIL_REF      2967 
      .STENCIL_VALUE_MASK      2963 
      .STENCIL_WRITEMASK      2968 
      .STENCIL_BACK_FUNC      34816 
      .STENCIL_BACK_FAIL      34817 
      .STENCIL_BACK_PASS_DEPTH_FAIL      34818 
      .STENCIL_BACK_PASS_DEPTH_PASS      34819 
      .STENCIL_BACK_REF      36003 
      .STENCIL_BACK_VALUE_MASK      36004 
      .STENCIL_BACK_WRITEMASK      36005 
      .VIEWPORT      2978 
      .SCISSOR_BOX      3088 
      .COLOR_CLEAR_VALUE      3106 
      .COLOR_WRITEMASK      3107 
      .UNPACK_ALIGNMENT      3317 
      .PACK_ALIGNMENT      3333 
      .MAX_TEXTURE_SIZE      3379 
      .MAX_VIEWPORT_DIMS      3386 
      .SUBPIXEL_BITS      3408 
      .RED_BITS      3410 
      .GREEN_BITS      3411 
      .BLUE_BITS      3412 
      .ALPHA_BITS      3413 
      .STENCIL_BITS      3415 
      .POLYGON_OFFSET_UNITS      10752 
      .POLYGON_OFFSET_FACTOR      32824 
      .TEXTURE_BINDING_2D      32873 
      .SAMPLE_BUFFERS      32936 
      .SAMPLES      32937 
      .SAMPLE_COVERAGE_VALUE      32938 
      .SAMPLE_COVERAGE_INVERT      32939 
      .COMPRESSED_TEXTURE_FORMATS      34467 
      .DONT_CARE      4352 
      .FASTEST      4353 
      .NICEST      4354 
      .GENERATE_MIPMAP_HINT      33170 
      .BYTE      5120 
      .UNSIGNED_BYTE      5121 
      .SHORT      5122 
      .UNSIGNED_SHORT      5123 
      .INT      5124 
      .UNSIGNED_INT      5125 
      .FLOAT      5126 
      .ALPHA      6406 
      .RGB      6407 
      .RGBA      6408 
      .LUMINANCE      6409 
      .LUMINANCE_ALPHA      6410 
      .UNSIGNED_SHORT_4_4_4_4      32819 
      .UNSIGNED_SHORT_5_5_5_1      32820 
      .UNSIGNED_SHORT_5_6_5      33635 
      .FRAGMENT_SHADER      35632 
      .VERTEX_SHADER      35633 
      .MAX_VERTEX_ATTRIBS      34921 
      .MAX_VERTEX_UNIFORM_VECTORS      36347 
      .MAX_VARYING_VECTORS      36348 
      .MAX_COMBINED_TEXTURE_IMAGE_UNITS      35661 
      .MAX_VERTEX_TEXTURE_IMAGE_UNITS      35660 
      .MAX_TEXTURE_IMAGE_UNITS      34930 
      .MAX_FRAGMENT_UNIFORM_VECTORS      36349 
      .SHADER_TYPE      35663 
      .DELETE_STATUS      35712 
      .LINK_STATUS      35714 
      .VALIDATE_STATUS      35715 
      .ATTACHED_SHADERS      35717 
      .ACTIVE_UNIFORMS      35718 
      .ACTIVE_ATTRIBUTES      35721 
      .SHADING_LANGUAGE_VERSION      35724 
      .CURRENT_PROGRAM      35725 
      .NEVER      512 
      .LESS      513 
      .EQUAL      514 
      .LEQUAL      515 
      .GREATER      516 
      .NOTEQUAL      517 
      .GEQUAL      518 
      .ALWAYS      519 
      .KEEP      7680 
      .REPLACE      7681 
      .INCR      7682 
      .DECR      7683 
      .INVERT      5386 
      .INCR_WRAP      34055 
      .DECR_WRAP      34056 
      .VENDOR      7936 
      .RENDERER      7937 
      .VERSION      7938 
      .NEAREST      9728 
      .LINEAR      9729 
      .NEAREST_MIPMAP_NEAREST      9984 
      .LINEAR_MIPMAP_NEAREST      9985 
      .NEAREST_MIPMAP_LINEAR      9986 
      .LINEAR_MIPMAP_LINEAR      9987 
      .TEXTURE_MAG_FILTER      10240 
      .TEXTURE_MIN_FILTER      10241 
      .TEXTURE_WRAP_S      10242 
      .TEXTURE_WRAP_T      10243 
      .TEXTURE      5890 
      .TEXTURE_CUBE_MAP      34067 
      .TEXTURE_BINDING_CUBE_MAP      34068 
      .TEXTURE_CUBE_MAP_POSITIVE_X      34069 
      .TEXTURE_CUBE_MAP_NEGATIVE_X      34070 
      .TEXTURE_CUBE_MAP_POSITIVE_Y      34071 
      .TEXTURE_CUBE_MAP_NEGATIVE_Y      34072 
      .TEXTURE_CUBE_MAP_POSITIVE_Z      34073 
      .TEXTURE_CUBE_MAP_NEGATIVE_Z      34074 
      .MAX_CUBE_MAP_TEXTURE_SIZE      34076 
      .TEXTURE0   33984 
      .TEXTURE1   33985 
      .TEXTURE2   33986 
      .TEXTURE3   33987 
      .TEXTURE4   33988 
      .TEXTURE5   33989 
      .TEXTURE6   33990  
      .TEXTURE7   33991  
      .TEXTURE8   33992  
      .TEXTURE9   33993  
      .TEXTURE10  33994  
      .TEXTURE11  33995  
      .TEXTURE12  33996  
      .TEXTURE13  33997  
      .TEXTURE14  33998  
      .TEXTURE15  33999  
      .TEXTURE16  34000  
      .TEXTURE17  34001  
      .TEXTURE18  34002  
      .TEXTURE19  34003  
      .TEXTURE20  34004  
      .TEXTURE21  34005  
      .TEXTURE22  34006  
      .TEXTURE23  34007  
      .TEXTURE24  34008  
      .TEXTURE25  34009  
      .TEXTURE26  34010  
      .TEXTURE27  34011  
      .TEXTURE28  34012  
      .TEXTURE29  34013  
      .TEXTURE30  34014  
      .TEXTURE31  34015  
      .ACTIVE_TEXTURE 34016  
      .REPEAT 10497  
      .CLAMP_TO_EDGE 33071  
      .MIRRORED_REPEAT 33648  
      .FLOAT_VEC2 35664  
      .FLOAT_VEC3 35665  
      .FLOAT_VEC4 35666  
      .INT_VEC2 35667  
      .INT_VEC3 35668  
      .INT_VEC4 35669  
      .BOOL 35670  
      .BOOL_VEC2 35671  
      .BOOL_VEC3 35672  
      .BOOL_VEC4 35673  
      .FLOAT_MAT2 35674  
      .FLOAT_MAT3 35675  
      .FLOAT_MAT4 35676  
      .SAMPLER_2D 35678  
      .SAMPLER_CUBE 35680  
      .VERTEX_ATTRIB_ARRAY_ENABLED 34338  
      .VERTEX_ATTRIB_ARRAY_SIZE 34339  
      .VERTEX_ATTRIB_ARRAY_STRIDE 34340  
      .VERTEX_ATTRIB_ARRAY_TYPE 34341  
      .VERTEX_ATTRIB_ARRAY_NORMALIZED 34922  
      .VERTEX_ATTRIB_ARRAY_POINTER 34373  
      .VERTEX_ATTRIB_ARRAY_BUFFER_BINDING 34975  
      .IMPLEMENTATION_COLOR_READ_TYPE 35738  
      .IMPLEMENTATION_COLOR_READ_FORMAT 35739  
      .COMPILE_STATUS 35713  
      .LOW_FLOAT 36336  
      .MEDIUM_FLOAT 36337  
      .HIGH_FLOAT 36338  
      .LOW_INT 36339  
      .MEDIUM_INT 36340  
      .HIGH_INT 36341  
      .FRAMEBUFFER 36160  
      .RENDERBUFFER 36161  
      .RGBA4 32854  
      .RGB5_A1 32855  
      .RGB565 36194  
      .STENCIL_INDEX8 36168  
      .RENDERBUFFER_WIDTH 36162  
      .RENDERBUFFER_HEIGHT 36163  
      .RENDERBUFFER_INTERNAL_FORMAT 36164  
      .RENDERBUFFER_RED_SIZE 36176  
      .RENDERBUFFER_GREEN_SIZE 36177  
      .RENDERBUFFER_BLUE_SIZE 36178  
      .RENDERBUFFER_ALPHA_SIZE 36179  
      .RENDERBUFFER_DEPTH_SIZE 36180  
      .RENDERBUFFER_STENCIL_SIZE 36181  
      .FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE 36048  
      .FRAMEBUFFER_ATTACHMENT_OBJECT_NAME 36049  
      .FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL 36050  
      .FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE 36051  
      .COLOR_ATTACHMENT0 36064  
      .STENCIL_ATTACHMENT 36128  
      .NONE 0  
      .FRAMEBUFFER_COMPLETE 36053  
      .FRAMEBUFFER_INCOMPLETE_ATTACHMENT 36054  
      .FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT 36055  
      .FRAMEBUFFER_INCOMPLETE_DIMENSIONS 36057  
      .FRAMEBUFFER_UNSUPPORTED 36061  
      .FRAMEBUFFER_BINDING 36006  
      .RENDERBUFFER_BINDING 36007  
      .MAX_RENDERBUFFER_SIZE 34024  
      .INVALID_FRAMEBUFFER_OPERATION 1286  
      .UNPACK_FLIP_Y_WEBGL 37440  
      .UNPACK_PREMULTIPLY_ALPHA_WEBGL 37441  
      .CONTEXT_LOST_WEBGL 37442  
      .UNPACK_COLORSPACE_CONVERSION_WEBGL 37443  
      .BROWSER_DEFAULT_WEBGL 37444  
      .DEPTH_BUFFER_BIT      256 
      .DEPTH_TEST      2929 
      .DEPTH_RANGE      2928 
      .DEPTH_WRITEMASK      2930 
      .DEPTH_CLEAR_VALUE      2931 
      .DEPTH_FUNC      2932 
      .DEPTH_BITS      3414 
      .DEPTH_COMPONENT      6402 
      .DEPTH_COMPONENT16 33189  
      .DEPTH_STENCIL 34041  
      .DEPTH_ATTACHMENT 36096  
      .DEPTH_STENCIL_ATTACHMENT 33306  
  Instance: gl = canvas.getContext('webgl'[,{ 
    // 也可使用'experimental-webgl'  
    // 可选配置 
    alpha: bol // 是否为上下文创建一个Alpha通道缓冲区,默认 true 
    ,depth: bol // 是否可使用16位深缓冲区,默认 true 
    ,stencil: bol // 是否可使用8位模板缓冲区,默认 false 
    ,antialias: bol, // 是否使用默认机制执行抗锯齿操作,默认 true 
    ,premultipliedAlpha: bol // 是否绘图缓冲区有预乘Alpha值,默认 true
    ,preserveDrawingBuffer: bol // 是否在绘图完成后保留绘图缓冲区,默认 false
      // 建议确实有必要的情况下再开启这个值,可能会影响性能 
  }])  
  Proto: 
    常量: 
      .DEPTH_BUFFER_BIT 256  
      .STENCIL_BUFFER_BIT 1024  
      .COLOR_BUFFER_BIT 16384  
      .POINTS 0  
      .LINES 1  
      .LINE_LOOP 2  
      .LINE_STRIP 3  
      .TRIANGLES 4  
      .TRIANGLE_STRIP 5  
      .TRIANGLE_FAN 6  
      .ZERO 0  
      .ONE 1  
      .SRC_COLOR 768  
      .ONE_MINUS_SRC_COLOR 769  
      .SRC_ALPHA 770  
      .ONE_MINUS_SRC_ALPHA 771  
      .DST_ALPHA 772  
      .ONE_MINUS_DST_ALPHA 773  
      .DST_COLOR 774  
      .ONE_MINUS_DST_COLOR 775  
      .SRC_ALPHA_SATURATE 776  
      .FUNC_ADD 32774  
      .BLEND_EQUATION 32777  
      .BLEND_EQUATION_RGB 32777  
      .BLEND_EQUATION_ALPHA 34877  
      .FUNC_SUBTRACT 32778  
      .FUNC_REVERSE_SUBTRACT 32779  
      .BLEND_DST_RGB 32968  
      .BLEND_SRC_RGB 32969  
      .BLEND_DST_ALPHA 32970  
      .BLEND_SRC_ALPHA 32971  
      .CONSTANT_COLOR 32769  
      .ONE_MINUS_CONSTANT_COLOR 32770  
      .CONSTANT_ALPHA 32771  
      .ONE_MINUS_CONSTANT_ALPHA 32772  
      .BLEND_COLOR 32773  
      .ARRAY_BUFFER 34962  
      .ELEMENT_ARRAY_BUFFER 34963  
      .ARRAY_BUFFER_BINDING 34964  
      .ELEMENT_ARRAY_BUFFER_BINDING 34965  
      .STREAM_DRAW 35040  
      .STATIC_DRAW 35044  
      .DYNAMIC_DRAW 35048  
      .BUFFER_SIZE 34660  
      .BUFFER_USAGE 34661  
      .CURRENT_VERTEX_ATTRIB 34342  
      .FRONT 1028  
      .BACK 1029  
      .FRONT_AND_BACK 1032  
      .TEXTURE_2D 3553  
      .CULL_FACE 2884  
      .BLEND 3042  
      .DITHER 3024  
      .STENCIL_TEST 2960  
      .DEPTH_TEST 2929  
      .SCISSOR_TEST 3089  
      .POLYGON_OFFSET_FILL 32823  
      .SAMPLE_ALPHA_TO_COVERAGE 32926  
      .SAMPLE_COVERAGE 32928  
      .NO_ERROR 0  
      .INVALID_ENUM 1280  
      .INVALID_VALUE 1281  
      .INVALID_OPERATION 1282  
      .OUT_OF_MEMORY 1285  
      .CW 2304  
      .CCW 2305  
      .LINE_WIDTH 2849  
      .ALIASED_POINT_SIZE_RANGE 33901  
      .ALIASED_LINE_WIDTH_RANGE 33902  
      .CULL_FACE_MODE 2885  
      .FRONT_FACE 2886  
      .DEPTH_RANGE 2928  
      .DEPTH_WRITEMASK 2930  
      .DEPTH_CLEAR_VALUE 2931  
      .DEPTH_FUNC 2932  
      .STENCIL_CLEAR_VALUE 2961  
      .STENCIL_FUNC 2962  
      .STENCIL_FAIL 2964  
      .STENCIL_PASS_DEPTH_FAIL 2965  
      .STENCIL_PASS_DEPTH_PASS 2966  
      .STENCIL_REF 2967  
      .STENCIL_VALUE_MASK 2963  
      .STENCIL_WRITEMASK 2968  
      .STENCIL_BACK_FUNC 34816  
      .STENCIL_BACK_FAIL 34817  
      .STENCIL_BACK_PASS_DEPTH_FAIL 34818  
      .STENCIL_BACK_PASS_DEPTH_PASS 34819  
      .STENCIL_BACK_REF 36003  
      .STENCIL_BACK_VALUE_MASK 36004  
      .STENCIL_BACK_WRITEMASK 36005  
      .VIEWPORT 2978  
      .SCISSOR_BOX 3088  
      .COLOR_CLEAR_VALUE 3106  
      .COLOR_WRITEMASK 3107  
      .UNPACK_ALIGNMENT 3317  
      .PACK_ALIGNMENT 3333  
      .MAX_TEXTURE_SIZE 3379  
      .MAX_VIEWPORT_DIMS 3386  
      .SUBPIXEL_BITS 3408  
      .RED_BITS 3410  
      .GREEN_BITS 3411  
      .BLUE_BITS 3412  
      .ALPHA_BITS 3413  
      .DEPTH_BITS 3414  
      .STENCIL_BITS 3415  
      .POLYGON_OFFSET_UNITS 10752  
      .POLYGON_OFFSET_FACTOR 32824  
      .TEXTURE_BINDING_2D 32873  
      .SAMPLE_BUFFERS 32936  
      .SAMPLES 32937  
      .SAMPLE_COVERAGE_VALUE 32938  
      .SAMPLE_COVERAGE_INVERT 32939  
      .COMPRESSED_TEXTURE_FORMATS 34467  
      .DONT_CARE 4352  
      .FASTEST 4353  
      .NICEST 4354  
      .GENERATE_MIPMAP_HINT 33170  
      .BYTE 5120  
      .UNSIGNED_BYTE 5121  
      .SHORT 5122  
      .UNSIGNED_SHORT 5123  
      .INT 5124  
      .UNSIGNED_INT 5125  
      .FLOAT 5126  
      .DEPTH_COMPONENT 6402  
      .ALPHA 6406  
      .RGB 6407  
      .RGBA 6408  
      .LUMINANCE 6409  
      .LUMINANCE_ALPHA 6410  
      .UNSIGNED_SHORT_4_4_4_4 32819  
      .UNSIGNED_SHORT_5_5_5_1 32820  
      .UNSIGNED_SHORT_5_6_5 33635  
      .FRAGMENT_SHADER 35632  
      .VERTEX_SHADER 35633  
      .MAX_VERTEX_ATTRIBS 34921  
      .MAX_VERTEX_UNIFORM_VECTORS 36347  
      .MAX_VARYING_VECTORS 36348  
      .MAX_COMBINED_TEXTURE_IMAGE_UNITS 35661  
      .MAX_VERTEX_TEXTURE_IMAGE_UNITS 35660  
      .MAX_TEXTURE_IMAGE_UNITS 34930  
      .MAX_FRAGMENT_UNIFORM_VECTORS 36349  
      .SHADER_TYPE 35663  
      .DELETE_STATUS 35712  
      .LINK_STATUS 35714  
      .VALIDATE_STATUS 35715  
      .ATTACHED_SHADERS 35717  
      .ACTIVE_UNIFORMS 35718  
      .ACTIVE_ATTRIBUTES 35721  
      .SHADING_LANGUAGE_VERSION 35724  
      .CURRENT_PROGRAM   35725  
      .NEVER   512  
      .LESS   513  
      .EQUAL   514  
      .LEQUAL   515  
      .GREATER   516  
      .NOTEQUAL   517  
      .GEQUAL   518  
      .ALWAYS   519  
      .KEEP   7680  
      .REPLACE   7681  
      .INCR   7682  
      .DECR   7683  
      .INVERT   5386  
      .INCR_WRAP   34055  
      .DECR_WRAP   34056  
      .VENDOR   7936  
      .RENDERER   7937  
      .VERSION   7938  
      .NEAREST   9728  
      .LINEAR   9729  
      .NEAREST_MIPMAP_NEAREST   9984  
      .LINEAR_MIPMAP_NEAREST   9985  
      .NEAREST_MIPMAP_LINEAR   9986  
      .LINEAR_MIPMAP_LINEAR   9987  
      .TEXTURE_MAG_FILTER   10240  
      .TEXTURE_MIN_FILTER   10241  
      .TEXTURE_WRAP_S   10242  
      .TEXTURE_WRAP_T   10243  
      .TEXTURE   5890  
      .TEXTURE_CUBE_MAP   34067  
      .TEXTURE_BINDING_CUBE_MAP   34068  
      .TEXTURE_CUBE_MAP_POSITIVE_X   34069  
      .TEXTURE_CUBE_MAP_NEGATIVE_X   34070  
      .TEXTURE_CUBE_MAP_POSITIVE_Y   34071  
      .TEXTURE_CUBE_MAP_NEGATIVE_Y   34072  
      .TEXTURE_CUBE_MAP_POSITIVE_Z   34073  
      .TEXTURE_CUBE_MAP_NEGATIVE_Z   34074  
      .MAX_CUBE_MAP_TEXTURE_SIZE   34076  
      .TEXTURE0   33984  
      .TEXTURE1   33985  
      .TEXTURE2   33986  
      .TEXTURE3   33987  
      .TEXTURE4   33988  
      .TEXTURE5   33989  
      .TEXTURE6   33990  
      .TEXTURE7   33991  
      .TEXTURE8   33992  
      .TEXTURE9   33993  
      .TEXTURE10   33994  
      .TEXTURE11   33995  
      .TEXTURE12   33996  
      .TEXTURE13   33997  
      .TEXTURE14   33998  
      .TEXTURE15   33999  
      .TEXTURE16   34000  
      .TEXTURE17   34001  
      .TEXTURE18   34002  
      .TEXTURE19   34003  
      .TEXTURE20   34004  
      .TEXTURE21   34005  
      .TEXTURE22   34006  
      .TEXTURE23   34007  
      .TEXTURE24   34008  
      .TEXTURE25   34009  
      .TEXTURE26   34010  
      .TEXTURE27   34011  
      .TEXTURE28   34012  
      .TEXTURE29   34013  
      .TEXTURE30   34014  
      .TEXTURE31   34015  
      .ACTIVE_TEXTURE   34016  
      .REPEAT   10497  
      .CLAMP_TO_EDGE   33071  
      .MIRRORED_REPEAT   33648  
      .FLOAT_VEC2   35664  
      .FLOAT_VEC3   35665  
      .FLOAT_VEC4   35666  
      .INT_VEC2   35667  
      .INT_VEC3   35668  
      .INT_VEC4   35669  
      .BOOL   35670  
      .BOOL_VEC2   35671  
      .BOOL_VEC3   35672  
      .BOOL_VEC4   35673  
      .FLOAT_MAT2   35674  
      .FLOAT_MAT3   35675  
      .FLOAT_MAT4   35676  
      .SAMPLER_2D   35678  
      .SAMPLER_CUBE   35680  
      .VERTEX_ATTRIB_ARRAY_ENABLED   34338  
      .VERTEX_ATTRIB_ARRAY_SIZE   34339  
      .VERTEX_ATTRIB_ARRAY_STRIDE   34340  
      .VERTEX_ATTRIB_ARRAY_TYPE   34341  
      .VERTEX_ATTRIB_ARRAY_NORMALIZED   34922  
      .VERTEX_ATTRIB_ARRAY_POINTER   34373  
      .VERTEX_ATTRIB_ARRAY_BUFFER_BINDING   34975  
      .IMPLEMENTATION_COLOR_READ_TYPE   35738  
      .IMPLEMENTATION_COLOR_READ_FORMAT   35739  
      .COMPILE_STATUS   35713  
      .LOW_FLOAT   36336  
      .MEDIUM_FLOAT   36337  
      .HIGH_FLOAT   36338  
      .LOW_INT   36339  
      .MEDIUM_INT   36340  
      .HIGH_INT   36341  
      .FRAMEBUFFER   36160  
      .RENDERBUFFER   36161  
      .RGBA4   32854  
      .RGB5_A1   32855  
      .RGB565   36194  
      .DEPTH_COMPONENT16   33189  
      .STENCIL_INDEX8   36168  
      .DEPTH_STENCIL   34041  
      .RENDERBUFFER_WIDTH   36162  
      .RENDERBUFFER_HEIGHT   36163  
      .RENDERBUFFER_INTERNAL_FORMAT   36164  
      .RENDERBUFFER_RED_SIZE   36176  
      .RENDERBUFFER_GREEN_SIZE   36177  
      .RENDERBUFFER_BLUE_SIZE   36178  
      .RENDERBUFFER_ALPHA_SIZE   36179  
      .RENDERBUFFER_DEPTH_SIZE   36180  
      .RENDERBUFFER_STENCIL_SIZE   36181  
      .FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE   36048  
      .FRAMEBUFFER_ATTACHMENT_OBJECT_NAME   36049  
      .FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL   36050  
      .FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE   36051  
      .COLOR_ATTACHMENT0   36064  
      .DEPTH_ATTACHMENT   36096  
      .STENCIL_ATTACHMENT   36128  
      .DEPTH_STENCIL_ATTACHMENT   33306  
      .NONE   0  
      .FRAMEBUFFER_COMPLETE   36053  
      .FRAMEBUFFER_INCOMPLETE_ATTACHMENT   36054  
      .FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT   36055  
      .FRAMEBUFFER_INCOMPLETE_DIMENSIONS   36057  
      .FRAMEBUFFER_UNSUPPORTED   36061  
      .FRAMEBUFFER_BINDING   36006  
      .RENDERBUFFER_BINDING   36007  
      .MAX_RENDERBUFFER_SIZE   34024  
      .INVALID_FRAMEBUFFER_OPERATION   1286  
      .UNPACK_FLIP_Y_WEBGL   37440  
      .UNPACK_PREMULTIPLY_ALPHA_WEBGL   37441  
      .CONTEXT_LOST_WEBGL   37442  
      .UNPACK_COLORSPACE_CONVERSION_WEBGL   37443  
      .BROWSER_DEFAULT_WEBGL   37444  
    .canvas  
    .drawingBufferWidth  
    .drawingBufferHeight  
    ★配置相关 
      .viewport(x,y,width,height)   定义WebGL的视口,默认为整个canvas区域 
        x,y  相对于canvas左下角的坐标 
        width,height 指定宽高 
    .activeTexture()    
    .attachShader()    
    .bindAttribLocation()    
    .bindBuffer()    
    .bindFramebuffer()    
    .bindRenderbuffer()    
    .bindTexture()    
    .blendColor()    
    .blendEquation()    
    .blendEquationSeparate()    
    .blendFunc()    
    .blendFuncSeparate()    
    .bufferData()    
    .bufferSubData()    
    .checkFramebufferStatus()    
    .clear()    
    .clearColor(red,green,blue,alpha) 清除<canvas>并指定要使用的颜色值 
      PS: 一般来说,都要先清理缓冲区,然后再执行其他绘图操作
      每个参数是一 0-1 间的数值,表示每种分量在最终颜色中的强度
    .clearDepth()    
    .clearStencil()    
    .colorMask()    
    .compileShader()    
    .compressedTexImage2D()    
    .compressedTexSubImage2D()    
    .copyTexImage2D()    
    .copyTexSubImage2D()    
    .createBuffer()    
    .createFramebuffer()    
    .createProgram()    
    .createRenderbuffer()    
    .createShader()    
    .createTexture()    
    .cullFace()    
    .deleteBuffer()    
    .deleteFramebuffer()    
    .deleteProgram()    
    .deleteRenderbuffer()    
    .deleteShader()    
    .deleteTexture()    
    .depthFunc()    
    .depthMask()    
    .depthRange()    
    .detachShader()    
    .disable()    
    .disableVertexAttribArray()    
    .drawArrays()    
    .drawElements()    
    .enable()    
    .enableVertexAttribArray()    
    .finish()    
    .flush()    
    .framebufferRenderbuffer()    
    .framebufferTexture2D()    
    .frontFace()    
    .generateMipmap()    
    .getActiveAttrib()    
    .getActiveUniform()    
    .getAttachedShaders()    
    .getAttribLocation()    
    .getBufferParameter()    
    .getContextAttributes()    
    .getError()    
    .getExtension()    
    .getFramebufferAttachmentParameter()    
    .getParameter()    
    .getProgramParameter()    
    .getProgramInfoLog()    
    .getRenderbufferParameter()    
    .getShaderParameter()    
    .getShaderInfoLog()    
    .getShaderPrecisionFormat()    
    .getShaderSource()    
    .getSupportedExtensions()    
    .getTexParameter()    
    .getUniform()    
    .getUniformLocation()    
    .getVertexAttrib()    
    .getVertexAttribOffset()    
    .hint()    
    .isBuffer()    
    .isContextLost()    
    .isEnabled()    
    .isFramebuffer()    
    .isProgram()    
    .isRenderbuffer()    
    .isShader()    
    .isTexture()    
    .lineWidth()    
    .linkProgram()    
    .pixelStorei()    
    .polygonOffset()    
    .readPixels()    
    .renderbufferStorage()    
    .sampleCoverage()    
    .scissor()    
    .shaderSource()    
    .stencilFunc()    
    .stencilFuncSeparate()    
    .stencilMask()    
    .stencilMaskSeparate()    
    .stencilOp()    
    .stencilOpSeparate()    
    .texParameterf()    
    .texParameteri()    
    .texImage2D()    
    .texSubImage2D()    
    .uniform1f()    
    .uniform1fv()    
    .uniform1i()    
    .uniform1iv()    
    .uniform2f()    
    .uniform2fv()    
    .uniform2i()    
    .uniform2iv()    
    .uniform3f()    
    .uniform3fv()    
    .uniform3i()    
    .uniform3iv()    
    .uniform4f()    
    .uniform4fv()    
    .uniform4i()    
    .uniform4iv()    
    .uniformMatrix2fv()    
    .uniformMatrix3fv()    
    .uniformMatrix4fv()    
    .useProgram()    
    .validateProgram()    
    .vertexAttrib1f()    
    .vertexAttrib1fv()    
    .vertexAttrib2f()    
    .vertexAttrib2fv()    
    .vertexAttrib3f()    
    .vertexAttrib3fv()    
    .vertexAttrib4f()    
    .vertexAttrib4fv()    
    .vertexAttribPointer()    
  Feature: 
    if (gl) { // 兼容性检测 
      // 支持 WebGL 
    }
▼类型化数组'typed arrays',元素被设置为特定类型的值的数组 
  PS: 因JS无法满足需要,WebGL引入的概念
WebGL2RenderingContext 
WebGLVertexArrayObject
WebGLUniformLocation
WebGLTransformFeedback
WebGLTexture
WebGLSync
WebGLShaderPrecisionFormat
WebGLShader
WebGLSampler
WebGLRenderbuffer
WebGLQuery
WebGLProgram
WebGLFramebuffer
WebGLContextEvent
WebGLBuffer
WebGLActiveInfo
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
 
