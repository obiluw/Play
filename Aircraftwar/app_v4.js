/**全局变量**/
var canvasWidth = 480;	//画布的宽
var canvasHeight = 650;	//画布的高

var canvas = document.getElementById('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var ctx = canvas.getContext('2d');

const PHASE_DOWNLOAD = 1;	//图片下载阶段
const PHASE_READY = 2;		//就绪阶段
const PHASE_LOADING = 3;	//游戏加载阶段
const PHASE_PLAY = 4;		//游戏进行阶段
const PHASE_PAUSE = 5;		//游戏暂停阶段
const PHASE_GAMEOVER = 6;	//游戏结束阶段

var curPhase = PHASE_DOWNLOAD;  //当前所处的阶段

//游戏所需的所有图片
var imgBackground;		
var imgBullet1;
var imgsEnemy1 = [];	//小号敌机所有图片
var imgsEnemy2 = [];	//中号敌机所有图片
var imgsEnemy3 = [];	//大号敌机所有图片
var imgsGameLoading = [];	//游戏加载中所有图片
var imgGamePauseNor;
var imgsHero = [];		//英雄所有的图片
var imgStart;			//就绪阶段的图片

/***阶段1：下载图片***/
download();	//下载所有的图片
function download(){
	var progress = 0; //下载进度：共有33张，每张的进度权重算3，背景图权重算4，权重和为100
	ctx.font = '80px Helvetica'; //加载进度的字体
	ctx.fillStyle = '#eee';
	function drawProgress(){  //每次加载完一张图片，都会重新绘制当前进度
		ctx.clearRect(0,0,canvasWidth,canvasHeight);//清除画布上已有的内容
		var txt = progress+'%';
		var w = ctx.measureText(txt).width;
		ctx.fillText(txt, canvasWidth/2-w/2, canvasHeight/2+80/2);
		ctx.strokeText(txt,canvasWidth/2-w/2, canvasHeight/2+80/2);
		if(progress>=100){  //所有图片加载完成，开始游戏
			startGame();
		}
	}
	imgBackground = new Image();
	imgBackground.src = 'img/background.png';
	imgBackground.onload = function(){
		progress += 4;
		drawProgress();
	}
	imgBullet1 = new Image();
	imgBullet1.src = 'img/bullet1.png';
	imgBullet1.onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy1[0] = new Image();
	imgsEnemy1[0].src = 'img/enemy1.png';
	imgsEnemy1[0].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy1[1] = new Image();
	imgsEnemy1[1].src = 'img/enemy1_down1.png';
	imgsEnemy1[1].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy1[2] = new Image();
	imgsEnemy1[2].src = 'img/enemy1_down2.png';
	imgsEnemy1[2].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy1[3] = new Image();
	imgsEnemy1[3].src = 'img/enemy1_down3.png';
	imgsEnemy1[3].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy1[4] = new Image();
	imgsEnemy1[4].src = 'img/enemy1_down4.png';
	imgsEnemy1[4].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy2[0] = new Image();
	imgsEnemy2[0].src = 'img/enemy2.png';
	imgsEnemy2[0].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy2[1] = new Image();
	imgsEnemy2[1].src = 'img/enemy2_down1.png';
	imgsEnemy2[1].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy2[2] = new Image();
	imgsEnemy2[2].src = 'img/enemy2_down2.png';
	imgsEnemy2[2].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy2[3] = new Image();
	imgsEnemy2[3].src = 'img/enemy2_down3.png';
	imgsEnemy2[3].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy2[4] = new Image();
	imgsEnemy2[4].src = 'img/enemy2_down4.png';
	imgsEnemy2[4].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[0] = new Image();
	imgsEnemy3[0].src = 'img/enemy3_n1.png';
	imgsEnemy3[0].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[1] = new Image();
	imgsEnemy3[1].src = 'img/enemy3_n2.png';
	imgsEnemy3[1].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[2] = new Image();
	imgsEnemy3[2].src = 'img/enemy3_hit.png';
	imgsEnemy3[2].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[3] = new Image();
	imgsEnemy3[3].src = 'img/enemy3_down1.png';
	imgsEnemy3[3].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[4] = new Image();
	imgsEnemy3[4].src = 'img/enemy3_down2.png';
	imgsEnemy3[4].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[5] = new Image();
	imgsEnemy3[5].src = 'img/enemy3_down3.png';
	imgsEnemy3[5].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[6] = new Image();
	imgsEnemy3[6].src = 'img/enemy3_down4.png';
	imgsEnemy3[6].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[7] = new Image();
	imgsEnemy3[7].src = 'img/enemy3_down5.png';
	imgsEnemy3[7].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[8] = new Image();
	imgsEnemy3[8].src = 'img/enemy3_down6.png';
	imgsEnemy3[8].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsGameLoading[0] = new Image();
	imgsGameLoading[0].src = 'img/game_loading1.png';
	imgsGameLoading[0].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsGameLoading[1] = new Image();
	imgsGameLoading[1].src = 'img/game_loading2.png';
	imgsGameLoading[1].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsGameLoading[2] = new Image();
	imgsGameLoading[2].src = 'img/game_loading3.png';
	imgsGameLoading[2].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsGameLoading[3] = new Image();
	imgsGameLoading[3].src = 'img/game_loading4.png';
	imgsGameLoading[3].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgGamePauseNor = new Image();
	imgGamePauseNor.src = 'img/game_pause_nor.png';
	imgGamePauseNor.onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsHero[0] = new Image();
	imgsHero[0].src = 'img/hero1.png';
	imgsHero[0].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsHero[1] = new Image();
	imgsHero[1].src = 'img/hero2.png';
	imgsHero[1].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsHero[2] = new Image();
	imgsHero[2].src = 'img/hero_blowup_n1.png';
	imgsHero[2].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsHero[3] = new Image();
	imgsHero[3].src = 'img/hero_blowup_n2.png';
	imgsHero[3].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsHero[4] = new Image();
	imgsHero[4].src = 'img/hero_blowup_n3.png';
	imgsHero[4].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsHero[5] = new Image();
	imgsHero[5].src = 'img/hero_blowup_n4.png';
	imgsHero[5].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgStart = new Image();
	imgStart.src = 'img/start.png';
	imgStart.onload = function(){
		progress += 3;
		drawProgress();
	}

}

/***阶段2：就绪***/
var sky;  //天空对象
var logo;  //游戏logo对象
function startGame(){
	curPhase = PHASE_READY;
	sky = new Sky(imgBackground); //创建天空对象
	logo = new Logo(imgStart);
	startEngine();	//启动整个游戏的主引擎——就是定时器

	//当用户点击画布，后进入下一阶段
	canvas.onclick = function(){
		if(curPhase===PHASE_READY){  //从就绪阶段进入加载阶段
			curPhase = PHASE_LOADING;
			loading = new Loading(imgsGameLoading);  //创建loading对象
		}
	}
}
//天空的构造函数——使用两张图片轮换
function Sky(img){
	this.x1 = 0;	//初始时第一张背景图坐标
	this.y1 = 0;
	this.x2 = 0;	//初始时第二张背景图坐标
	this.y2 = -img.height;
	this.draw = function(){  //绘制天空对象
		//每次绘制的背景图都是铺满，会自动覆盖已有的全部内容，无需再调用clearRect()
		ctx.drawImage(img,this.x1,this.y1);
		ctx.drawImage(img,this.x2,this.y2);
	}
	this.move = function(){  //移动天空对象
		this.y1++;	//图片坐标下移
		this.y2++;
		if(this.y1>=canvasHeight){ //第1张背景图移出画布了
			this.y1 = this.y2-img.height;
		}
		if(this.y2>=canvasHeight){ //第2张背景图移出画布了
			this.y2 = this.y1-img.height;
		}
	}
}
//游戏的主LOGO
function Logo(img){
	this.x = canvasWidth/2-img.width/2;
	this.y = canvasHeight/2-img.height/2;
	this.draw = function(){
		ctx.drawImage(img, this.x, this.y);
	}
}

/***阶段3：加载中***/
//var loading = new Loading(imgsGameLoading);
var loading;
function Loading(imgs){
	this.x = 0;
	this.y = canvasHeight - imgs[0].height;
	this.index = 0; //当前要绘制的是数组中图片的下标

	this.draw = function(){
		/*测试性输出各个变量的值
		console.log(imgs);
		console.log('index:%d x:%d y:%d', this.index, this.x, this.y);
		console.log(imgs[0]);
		console.log(imgs[0].height);*/
		ctx.drawImage(imgs[this.index],this.x,this.y);
	}
	this.counter = 0; //记录了move函数的调用次数
	this.move = function(){
		this.counter++; //只有当move函数被调用了n次后才执行真正的移动操作
		if(this.counter%6===0){
			this.index++;  //绘制下一张
			if(this.index>=imgs.length){ //所有图片播放完成，则进入下一阶段
				curPhase = PHASE_PLAY;
				//进入游戏，可以创建我方英雄了
				hero = new Hero(imgsHero);
			}
		}
	}
}

/***阶段4：游戏进行中***/
var hero; //此处不能new
//我方英雄飞机的构造方法
function Hero(imgs){
	//我方飞机初始时出现在屏幕下方中央
	this.x = canvasWidth/2-imgs[0].width/2;
	this.y = canvasHeight-imgs[0].height;
	this.index = 0; //待绘制的是数组中的哪个图片
	this.draw = function(){
		ctx.drawImage(imgs[this.index],this.x,this.y);
	}
	this.counter = 0; //move函数被调用的次数
	this.move = function(){
		this.counter ++;
		if(this.counter%2===0){
			if(this.index===0){
				this.index = 1;
			}else if(this.index===1){
				this.index = 0;
			}
		}
	}
}
//当鼠标在画布上方移动时，修改我方英雄的位置
canvas.onmousemove = function(event){
	if(curPhase===PHASE_PLAY){
		var x = event.offsetX; //鼠标事件相对于画布左上角的偏移量
		var y = event.offsetY;
		hero.x = x - imgsHero[0].width/2;
		hero.y = y - imgsHero[0].height/2;
	}
}




/***阶段5：游戏暂停***/

/***阶段6：游戏结束***/


/***游戏的主引擎——主定时器***/
function startEngine(){
	setInterval(function(){
		sky.draw();
		sky.move();
		switch(curPhase){
			case PHASE_READY:
				logo.draw(); //就绪阶段在绘制了天空的基础上，再绘制LOGO
				break;
			case PHASE_LOADING:
				loading.draw();
				loading.move();
				break;
			case PHASE_PLAY:
				hero.draw();
				hero.move();
				break;
			case PHASE_PAUSE:
				break;
			case PHASE_GAMEOVER:
				break;
		}
	}, 42); //每一秒动24次
}