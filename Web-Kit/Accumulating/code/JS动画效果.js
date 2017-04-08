
body {
	background: #000;
}
canvas {
	background: #181818;
	box-shadow: 0 0 0 1px #282828;
	bottom: 0;
	left: 0;
	margin: auto;
	position: absolute;
	right: 0;
	top: 0;
}

var canvas = document.createElement( 'canvas' ),
	ctx = canvas.getContext( '2d' ),
	width = 400
	height = 100,
	loaded = 0,
	loaderSpeed = 0.6,
	loaderWidth = 310,
	loaderHeight = 16,
	loaderX = width / 2 - loaderWidth / 2,
	loaderY = height / 2 - loaderHeight / 2,
	particles = [],
	particleLift = 180,
	particleRate = 4,
	hueStart = 0,
	hueEnd = 120,
	hue = 0,
	gravity = 0.12;
document.body.appendChild( canvas );
canvas.width = width;
canvas.height = height;
ctx.globalCompositeOperation = 'lighter';
function rand( rMi, rMa ) {
	return ~~((Math.random()*(rMa-rMi+1))+rMi);
}
function updateLoader() {
	if( loaded < 100 ) {
		loaded += loaderSpeed;
	} else {
		loaded = 0;
	}
}
function renderLoader() {
	ctx.fillStyle = '#000';
	ctx.fillRect( loaderX, loaderY, loaderWidth, loaderHeight );

	hue = hueStart + ( loaded / 100 ) * ( hueEnd - hueStart );

	var newWidth = ( loaded / 100 ) * loaderWidth;
	ctx.fillStyle = 'hsla(' + hue + ', 100%, 40%, 1)';
	ctx.fillRect( loaderX, loaderY, newWidth, loaderHeight );

	ctx.fillStyle = '#444';
	ctx.fillRect( loaderX, loaderY, newWidth, loaderHeight / 2 );
}
function Particle() {					
	this.x = loaderX + ( ( loaded / 100 ) * loaderWidth ) - rand( 0, 1 );
	this.y = height / 2 + rand( 0, loaderHeight ) - loaderHeight / 2;
	this.vx = ( rand( 0, 4 ) - 2 ) / 100;
	this.vy = ( rand( 0, particleLift ) - particleLift * 2 ) / 100;
	this.width = rand( 1, 4 ) / 2;
	this.height = rand( 1, 4 ) / 2;
	this.hue = hue;
}
Particle.prototype.update = function( i ) {
	this.vx += ( rand( 0, 6 ) - 3 ) / 100; 
	this.vy += gravity;
	this.x += this.vx;
	this.y += this.vy;
	if( this.y > height ) {
		particles.splice( i, 1 );
	}					
};
Particle.prototype.render = function() {
	ctx.fillStyle = 'hsla(' + this.hue + ', 100%, ' + rand( 50, 70 ) + '%, ' + rand( 20, 100 ) / 100 + ')';
	ctx.fillRect( this.x, this.y, this.width, this.height );
};
function createParticles() {
	var i = particleRate;
	while( i-- ) {
		this.particles.push( new Particle() );
	}
}
function updateParticles() {					
	var i = particles.length;						
	while( i-- ) {
		var p = particles[ i ];
		p.update( i );											
	};					
}
function renderParticles() {
	var i = particles.length;						
	while( i-- ) {
		var p = particles[ i ];
		p.render();											
	}			
}
function clearCanvas() {
	ctx.clearRect( 0, 0, width, height );					
}
function loop() {
	requestAnimationFrame( loop );
	clearCanvas();
	createParticles();
	updateLoader();
	updateParticles();
	renderLoader();
	renderParticles();
}
loop();
---------------------------------------------------------------------------

<div class="container">
  <div class="tag"  style="color: rgb(67, 214, 112); font-size: 9px; opacity:0.500541; z-index: 62; left: 399.787px; top: 385.425px;">
  01</div>
  <div class="tag" style="color: rgb(203, 230, 18); font-size: 9px; opacity: 0.570506; z-index: 65; left: 457.514px; top: 262.743px;">
    02</div>
  <div class="tag" style="color: rgb(75, 203, 210); font-size: 10px; opacity: 0.628765; z-index: 69; left: 330.322px; top: 198.194px;">
    03</div>
  <div class="tag" style="color: rgb(76, 218, 15); font-size: 10px; opacity: 0.617156; z-index: 68; left: 212.237px; top: 309.19px;">
    04</div>
  <div class="tag" style="color: rgb(17, 166, 16); font-size: 9px; opacity: 0.579053; z-index: 66; left: 244.583px; top: 467.985px;">
    05</div>
  <div class="tag" style="color: rgb(192, 187, 106); font-size: 9px; opacity: 0.568137; z-index: 65; left: 391.277px; top: 542.129px;">
    06</div>
  <div class="tag" style="color: rgb(103, 66, 96); font-size: 10px; opacity: 0.607116; z-index: 67; left: 538.336px; top: 487.751px;">
    07</div>
  <div class="tag" style="color: rgb(120, 150, 190); font-size: 10px; opacity: 0.684879; z-index: 72; left: 615.403px; top: 345.355px;">
    08</div>
  <div class="tag" style="color: rgb(156, 47, 234); font-size: 11px; opacity: 0.771726; z-index: 78; left: 568.438px; top: 195.243px;">
    09</div>
  <div class="tag" style="color: rgb(248, 184, 139); font-size: 12px; opacity: 0.837583; z-index: 83; left: 431.245px; top: 110.74px;">
    10</div>
  <div class="tag" style="color: rgb(188, 81, 247); font-size: 12px; opacity: 0.864923; z-index: 86; left: 266.927px; top: 128.295px;">
    11</div>
  <div class="tag" style="color: rgb(115, 20, 54); font-size: 12px; opacity: 0.853556; z-index: 85; left: 143.502px; top: 239.381px;">
    12</div>
  <div class="tag" style="color: rgb(18, 232, 220); font-size: 12px; opacity: 0.818122; z-index: 82; left: 93.7093px; top: 400.381px;">
    13</div>
  <div class="tag" style="color: rgb(165, 128, 235); font-size: 11px; opacity: 0.780985; z-index: 79; left: 171.084px; top: 552.592px;">
    14</div>
  <div class="tag" style="color: rgb(91, 155, 25); font-size: 11px; opacity: 0.763765; z-index: 77; left: 309.86px; top: 643.901px;">
    15</div>
  <div class="tag" style="color: rgb(252, 155, 0); font-size: 11px; opacity: 0.78028; z-index: 79; left: 469.051px; top: 645.342px;">
    16</div>
  <div class="tag" style="color: rgb(233, 230, 78); font-size: 12px; opacity: 0.832721; z-index: 83; left: 614.68px; top: 558.595px;">
    17</div>
  <div class="tag" style="color: rgb(225, 148, 223); font-size: 13px; opacity: 0.911698; z-index: 90; left: 674.424px; top: 413.533px;">
    18</div>
  <div class="tag" style="color: rgb(158, 75, 55); font-size: 14px; opacity: 0.999703; z-index: 99; left: 655.73px; top: 257.644px;">
    19</div>
  <div class="tag" style="color: rgb(129, 15, 213); font-size: 16px; opacity: 1.07673; z-index: 110; left: 544.204px; top: 140.43px;">
    20</div>
  <div class="tag" style="color: rgb(213, 174, 36); font-size: 17px; opacity: 1.12638; z-index: 117; left: 367.293px; top: 99.2407px;">
    21</div>
  <div class="tag" style="color: rgb(217, 110, 155); font-size: 18px; opacity: 1.14077; z-index: 120; left: 224.583px; top: 148.645px;">
    22</div>
  <div class="tag" style="color: rgb(55, 66, 96); font-size: 17px; opacity: 1.12294; z-index: 117; left: 116.774px; top: 274.828px;">
    23</div>
  <div class="tag" style="color: rgb(36, 248, 82); font-size: 16px; opacity: 1.08601; z-index: 111; left: 93.4979px; top: 439.115px;">
    24</div>
  <div class="tag" style="color: rgb(108, 101, 134); font-size: 15px; opacity: 1.04942; z-index: 106; left: 148.214px; top: 589.713px;">
    25</div>
  <div class="tag" style="color: rgb(68, 232, 253); font-size: 15px; opacity: 1.03301; z-index: 104; left: 303.544px; top: 678.765px;">
    26</div>
  <div class="tag" style="color: rgb(95, 51, 15); font-size: 15px; opacity: 1.05058; z-index: 106; left: 454.646px; top: 677.5px;">
    27</div>
  <div class="tag" style="color: rgb(83, 240, 134); font-size: 17px; opacity: 1.10496; z-index: 114; left: 602.887px; top: 584.75px;">
    28</div>
  <div class="tag" style="color: rgb(153, 30, 176); font-size: 19px; opacity: 1.18603; z-index: 128; left: 656.586px; top: 434.801px;">
    29</div>
  <div class="tag" style="color: rgb(71, 219, 86); font-size: 22px; opacity: 1.27313; z-index: 148; left: 596.489px; top: 281.423px;">
    30</div>
  <div class="tag" style="color: rgb(160, 102, 7); font-size: 25px; opacity: 1.34167; z-index: 169; left: 472.521px; top: 188.383px;">
    31</div>
  <div class="tag" style="color: rgb(71, 156, 186); font-size: 27px; opacity: 1.37257; z-index: 180; left: 305.876px; top: 195.381px;">
    32</div>
  <div class="tag" style="color: rgb(171, 45, 75); font-size: 26px; opacity: 1.36164; z-index: 176; left: 170.131px; top: 305.376px;">
    33</div>
  <div class="tag" style="color: rgb(66, 219, 212); font-size: 24px; opacity: 1.32472; z-index: 163; left: 165.138px; top: 470.081px;">
    34</div>
  <div class="tag" style="color: rgb(186, 17, 114); font-size: 23px; opacity: 1.29425; z-index: 154; left: 265.659px; top: 600.962px;">
    35</div>
  <div class="tag" style="color: rgb(155, 146, 107); font-size: 23px; opacity: 1.30469; z-index: 157; left: 417.62px; top: 618.306px;">
    36</div>
  <div class="tag" style="color: rgb(153, 158, 148); font-size: 26px; opacity: 1.36859; z-index: 179; left: 538.566px; top: 503.243px;">
    37</div>
  <div class="tag" style="color: rgb(14, 68, 161); font-size: 32px; opacity: 1.45437; z-index: 219; left: 474.961px; top: 352.145px;">
    38</div>
  <div class="tag" style="color: rgb(212, 135, 215); font-size: 36px; opacity: 1.49231; z-index: 244; left: 329.814px; top: 339.147px;">
    39</div>
  <div class="tag" style="color: rgb(173, 190, 32); font-size: 33px; opacity: 1.46099; z-index: 223; left: 308.501px; top: 487.424px;">
    40</div>
</div>

.container {
  width: 800px;
  height: 800px;
  margin: 50px auto;
  position: relative;
  border: 1px solid green;
}
.tag {
  position: absolute;
}
.tag:hover {
    border: 1px solid lime;
}

var tagObj = function(ele, x, y, z) {
  this.ele = ele;
  this.x = x;
  this.y = y;
  this.z = z;
}
tagObj.prototype.move = function(e) {
  var scale = e.fallLength1 / (e.fallLength1 - this.z);
  var alpha = (this.z + e.radius) / (2 * e.radius);
  this.ele.style.fontSize = parseInt(15 * scale) + "px";
  this.ele.style.opacity = alpha + 0.5;
  this.ele.style.filter = `alpha(opacity = ${(alpha + 0.5) * 100})`;
  this.ele.style.zIndex = parseInt(scale * 100);
  this.ele.style.left = this.x + e.innerX - this.ele.offsetWidth/2 + "px";
  this.ele.style.top = this.y + e.innerY - this.ele.offsetHeight/2 + "px";
}

var cloud = function() {
  this.container = document.querySelector(".container");
  this.tags = document.querySelectorAll(".tag");
  this.tagObjs = [];
  this.radius = 300;
  this.fallLength1 = 500;
  this.angleX = Math.PI / 500;
  this.angleY = Math.PI / 500;
  this.innerX = this.container.offsetWidth / 2;
  this.innerY = this.container.offsetHeight / 2;
  this.outerX = this.container.offsetLeft + document.body.scrollLeft;
  this.outerY = this.container.offsetTop + document.body.scrollTop;
}
cloud.prototype.rotateX = function() {
  // 元素在x轴上的移动，也就是更改y坐标
  var cos = Math.cos(this.angleX);
  var sin = Math.sin(this.angleX);
  this.tagObjs.forEach(function(e) {
    var y1 = e.y * cos - e.z * sin;
    var z1 = e.z * cos + e.y * sin;
    e.y = y1;
    e.z = z1;
  })
}
cloud.prototype.rotateY = function() {
  var cos = Math.cos(this.angleY);
  var sin = Math.sin(this.angleY);
  this.tagObjs.forEach(function(e) {
    var x1 = e.x * cos - e.z * sin;
    var z1 = e.z * cos + e.x * sin;
    e.x = x1;
    e.z = z1;
  })
}
cloud.prototype.animate = function() {
  var obj = this;
  console.log(obj);
  console.log(this);
  setInterval(function(){
    obj.rotateX();
    // console.log(this);
    obj.rotateY();
    obj.tagObjs.forEach(function(e){
      e.move(obj);
    })
  }, 30);
}
cloud.prototype.init = function() {
  for(var i = 0; i < this.tags.length; i++) {
    // 为了初始化得更加均匀，像一个球，不随机生成参数，而是与元素序号相关
    var t = ((i + 1) * 2 - 1) / this.tags.length - 1;
    var a = Math.acos(t);
    var b = a * Math.sqrt(this.tags.length * Math.PI);
    // 计算出每个元素的相对生成位置
    var x = this.radius * Math.sin(a) * Math.cos(b);
    var y = this.radius * Math.sin(a) * Math.sin(b);
    var z = this.radius * Math.cos(a);
    this.tags[i].style.color = `
      rgb(${parseInt(Math.random()*255)},
      ${parseInt(Math.random()*255)},
      ${parseInt(Math.random()*255)})`;
    var t = new tagObj(this.tags[i], x, y, z);
    this.tagObjs.push(t);
    t.move(this);
  }
  this.container.addEventListener("mousemove", function(e) {
    var x = e.clientX - this.innerX - this.outerX;
    var y = e.clientY - this.innerY - this.outerY;
    this.angleY = 0.0001 * x;
    this.angleX = 0.0001 * y;
  }.bind(this));
}

var cld = new cloud();
cld.init();
cld.animate();

---------------------------------------------------------------------------




























