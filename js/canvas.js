// (function(){
//     let doc = document.querySelector('html');
//     let canvas = document.createElement('canvas')
//     let aniArr = [];
//     init()
//     document.querySelector('body').appendChild(document.createElement('canvas'))
//     doc.addEventListener('mousemove',(e)=>{
//         let posx = e.clientX;
//         let posy = e.clientY;
//     })

    
//     // 重置canvas的长宽
//     function init(){
//         canvas.width = doc.offsetWidth;
//         canvas.height = doc.offsetHeight;
//     }

//     // 增加出现的字母
//     function move(){

//     }
// })()

// 彩色火焰
// function aa(){
// 	var canvas = document.getElementById("myCanvas");
// 	var ctx = canvas.getContext("2d");
	
// 	//Make the canvas occupy the full page
// 	var W = document.querySelector("body").offsetWidth, H = document.querySelector("body").offsetHeight;
// 	canvas.width = W;
// 	canvas.height = H;
	
// 	var particles = [];
// 	var mouse = {};
	
// 	//Lets create some particles now
// 	var particle_count = 50;
// 	for(var i = 0; i < particle_count; i++)
// 	{
// 		particles.push(new particle());
// 	}
	
// 	//finally some mouse tracking
// 	canvas.addEventListener('mousemove', track_mouse, false);
	
// 	function track_mouse(e)
// 	{
// 		//since the canvas = full page the position of the mouse 
// 		//relative to the document will suffice
// 		mouse.x = e.pageX;
// 		mouse.y = e.pageY;
// 	}
	
// 	function particle()
// 	{
// 		//speed, life, location, life, colors
// 		//speed.x range = -2.5 to 2.5 
// 		//speed.y range = -15 to -5 to make it move upwards
// 		//lets change the Y speed to make it look like a flame
// 		this.speed = {x: -2.5+Math.random()*5, y: -15+Math.random()*10};
// 		//location = mouse coordinates
// 		//Now the flame follows the mouse coordinates
// 		if(mouse.x && mouse.y)
// 		{
// 			this.location = {x: mouse.x, y: mouse.y};
// 		}
// 		else
// 		{
// 			this.location = {x: W/2, y: H/2};
// 		}
// 		//radius range = 10-30
// 		this.radius = 10+Math.random()*20;
// 		//life range = 20-30
// 		this.life = 20+Math.random()*10;
// 		this.remaining_life = this.life;
// 		//colors
// 		this.r = Math.round(Math.random()*255);
// 		this.g = Math.round(Math.random()*255);
// 		this.b = Math.round(Math.random()*255);
// 	}
	
// 	function draw()
// 	{
// 		//Painting the canvas black
// 		//Time for lighting magic
// 		//particles are painted with "lighter"
// 		//In the next frame the background is painted normally without blending to the 
// 		//previous frame
// 		ctx.globalCompositeOperation = "source-over";
// 		canvas.width = canvas.width
// 		ctx.globalCompositeOperation = "lighter";
		
// 		for(var i = 0; i < particles.length; i++)
// 		{
// 			var p = particles[i];
// 			ctx.beginPath();
// 			//changing opacity according to the life.
// 			//opacity goes to 0 at the end of life of a particle
// 			p.opacity = Math.round(p.remaining_life/p.life*100)/100
// 			//a gradient instead of white fill
// 			var gradient = ctx.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
// 			gradient.addColorStop(0, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
// 			gradient.addColorStop(0.5, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
// 			gradient.addColorStop(1, "rgba("+p.r+", "+p.g+", "+p.b+", 0)");
// 			ctx.fillStyle = gradient;
// 			ctx.arc(p.location.x, p.location.y, p.radius, Math.PI*2, false);
// 			ctx.fill();
			
// 			//lets move the particles
// 			p.remaining_life--;
// 			p.radius--;
// 			p.location.x += p.speed.x;
// 			p.location.y += p.speed.y;
			
// 			//regenerate particles
// 			if(p.remaining_life < 0 || p.radius < 0)
// 			{
// 				//a brand new particle replacing the dead one
// 				particles[i] = new particle();
// 			}
// 		}
// 	}
	
// 	setInterval(draw, 30);
// }aa();

// 眼睛跟随
var canvas,
	ctx,
	width,
	height,
	mx,
	my,
	mouseIdle,
	mouseIdleTick,
	mouseIdleMax,
	eyes,
	PI,
	TAU;

function Eye(opt) {
	this.x = opt.x;
	this.y = opt.y;
	this.radius = opt.radius;
	this.pupilX = this.x;
	this.pupilY = this.y;
	this.pupilRadius = this.radius / 2;
	this.angle = 0;
	this.magnitude = 0;
	this.magnitudeMax = this.radius - this.pupilRadius;
}

Eye.prototype.step = function() {
	var dx = mx - this.x,
		dy = my - this.y,
		dist = Math.sqrt(dx * dx + dy * dy);
	this.angle = Math.atan2(dy, dx);
	if (mouseIdle) {
		this.magnitude = 0;
	} else {
		this.magnitude = Math.min(Math.abs(dist), this.magnitudeMax);
	}
	this.pupilX += ((this.x + Math.cos(this.angle) * this.magnitude) - this.pupilX) * 0.1;
	this.pupilY += ((this.y + Math.sin(this.angle) * this.magnitude) - this.pupilY) * 0.1;
};

Eye.prototype.draw = function() {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, TAU);
	ctx.fillStyle = '#fbf9e6';
	ctx.fill();
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#444';
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(this.pupilX, this.pupilY, this.pupilRadius, 0, TAU);
	ctx.fillStyle = '#444';
	ctx.fill();
};

function init() {
	canvas = document.querySelector('#myCanvas');
	ctx = canvas.getContext('2d');
	mouseIdleMax = 100;
	PI = Math.PI;
	TAU = PI * 2;
	eyes = [];
	reset();
	loop();
}

function reset() {
	width = 240;
	height = 180;
	canvas.width = width;
	canvas.height = height;
	mx = width / 2;
	my = height / 2;
	mouseIdle = false;
	eyes.length = 0;
	eyes.push(new Eye({
		x: width * 0.3,
		y: height * 0.4,
		radius: 20
	}));
	eyes.push(new Eye({
		x: width * 0.7,
		y: height * 0.4,
		radius: 20
	}));
}

function mousemove(e) {
	mx = e.pageX;
	my = e.pageY;
	mouseIdleTick = mouseIdleMax;
}

function step() {
	var i = eyes.length;
	while (i--) {
		eyes[i].step();
	}

	if (mouseIdleTick > 0) {
		mouseIdleTick--;
		mouseIdle = false;
	} else {
		mouseIdle = true;
	}
}

function draw() {
	ctx.clearRect(0, 0, width, height);
	var i = eyes.length;
	while (i--) {
		eyes[i].draw();
	}

}

function loop() {
	requestAnimationFrame(loop);
	step();
	draw();
}

addEventListener('mousemove', mousemove);

init();