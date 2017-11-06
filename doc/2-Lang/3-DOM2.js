◆专题 
'canvas'画布  [HTML5][IE9+] 
  ctx = canvas.getContext("2d")  CanvasRenderingContext2D,获取canvas的'2d'上下文对象 
    PS: 使用上下文的属性和方法来操作画布,是画布的核心对象 
      目前只支持2D绘图,将来可能还会有其他上下文类型 
      设置样式等应写在绘制图形之前,否则样式会渲染不上 
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
  CanvasRenderingContext2D 
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
WebGL [JS高程 465 页]
  WebGLRenderingContext
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
 
