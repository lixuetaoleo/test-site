// 设定画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const para = document.querySelector('p');
// 设定画布长宽
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数
function random(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

// 生成随机颜色的函数
function randomColor() {
	return 'rgb(' +
		random(0, 255) + ', ' +
		random(0, 255) + ', ' +
		random(0, 255) + ')';
}
// Shape "基类"
function Shape(x, y, velX, velY, exists) {
	this.x = x;
	this.y = y;
	this.velX = velX; //vel means velocity
	this.velY = velY;
	this.exists = exists;
}
// 小球模型
function Ball(x, y, velX, velY, color, size, exists) {
	Shape.call(this, x, y, velX, velY, exists);
	this.color = color;
	this.size = size;
}
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function () {
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	ctx.fill();
}

Ball.prototype.update = function () {
	if (this.x + this.size >= width)
		this.velX = -this.velX;
	if ((this.x - this.size) <= 0) {
		this.velX = -(this.velX);
	}

	if ((this.y + this.size) >= height) {
		this.velY = -(this.velY);
	}

	if ((this.y - this.size) <= 0) {
		this.velY = -(this.velY);
	}

	this.x += this.velX;
	this.y += this.velY;
}

Ball.prototype.collisionDetect = function () {
	for (var j = 0; j < balls.length; ++j) {
		if (!(this === balls[j])) {
			var dx = this.x - balls[j].x;
			var dy = this.y - balls[j].y;
			var distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < this.size + balls[j].size)
				balls[j].color = this.color = randomColor();
		}

	}
}

function evilCircle(x, y, exists) {
	Shape.call(this, x, y, 20, 20, exists);
	this.velX = 7;
	this.velY = 7;
	this.color = "white";
	this.size = 10;
	this.setControls();
}
evilCircle.prototype = Object.create(Shape.prototype);
evilCircle.prototype.constructor = evilCircle;

evilCircle.prototype.draw = function () {
	ctx.beginPath();
	ctx.strokeStyle = this.color;
	ctx.lineWidth = 3;
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	ctx.stroke();
}

evilCircle.prototype.checkBounds = function () {
	if ((this.x + this.size) >= width) {
		this.x -= this.size;
	}

	if ((this.x - this.size) <= 0) {
		this.x += this.size;
	}

	if ((this.y + this.size) >= height) {
		this.y -= this.size;
	}

	if ((this.y - this.size) <= 0) {
		this.y += this.size;
	}
}

evilCircle.prototype.setControls = function () {
	window.onkeydown = e => {
		switch (e.key) {
			case 'a':
			case 'A':
			case 'ArrowLeft':
				this.x -= this.velX;
				break;
			case 'd':
			case 'D':
			case 'ArrowRight':
				this.x += this.velX;
				break;
			case 'w':
			case 'W':
			case 'ArrowUp':
				this.y -= this.velY;
				break;
			case 's':
			case 'S':
			case 'ArrowDown':
				this.y += this.velY;
				break;
		}
	};
}
evilCircle.prototype.collisionDetect = function () {
	for (let j = 0; j < balls.length; j++) {
		if (balls[j].exists) {
			const dx = this.x - balls[j].x;
			const dy = this.y - balls[j].y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < this.size + balls[j].size) {
				balls[j].exists = false;
				count--;
				para.textContent = '还剩 ' + count + ' 个球';
			}
		}
	}
}
var balls = [];

const evilBall = new evilCircle(random(0, width), random(0, height), true);

let count = 0;

loop();

function loop() {
	ctx.fillStyle = 'rgba(0,0,0,0.25)';
	ctx.fillRect(0, 0, width, height);
	while (balls.length < 25) {
		var ball = new Ball(
			random(0, width),
			random(0, height),
			random(-7, 7),
			random(-7, 7),
			randomColor(),
			random(10, 20),
			true
		);
		balls.push(ball);
		++count;
	}
	for (var i = 0; i < balls.length; ++i) {
		if (balls[i].exists) {
			balls[i].draw();
			balls[i].update();
			balls[i].collisionDetect();
		}

	}
	evilBall.draw();
	evilBall.checkBounds();
	evilBall.collisionDetect();
	requestAnimationFrame(loop);
}
