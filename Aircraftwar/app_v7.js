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
				bulletList = new BulletList();
				enemyList = new EnemyList();
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
	this.width = imgs[0].width;
	this.height = imgs[0].height;
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
		///边移动，边发射子弹
		if(this.counter%5===0){ //此处的5指定每两发子弹的间隔,越小则发射的越快
			this.fire();
		}
	}
	//发射子弹
	this.fire = function(){
		var b = new Bullet(imgBullet1);
		bulletList.add( b );
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

/////////V5版新增内容///////////
//子弹对象的构造方法
function Bullet(img){
	//子弹对象的初始坐标
	this.x = hero.x + (imgsHero[0].width/2-img.width/2);
	this.y = hero.y - img.height;
	this.width = img.width;
	this.height = img.height;
	this.removable = false;  //当前子弹能否被删除了

	this.draw = function(){
		/*console.log('bullet.draw');
		console.log(img);
		console.log(this.x + '-'+this.y);*/
		ctx.drawImage(img,this.x,this.y);
	}
	this.move = function(){
		this.y -= 10;	//此处的10指定子弹的移动速度，可以设置为全局变量
		//若飞出画布上边界、或打中敌机，子弹可以消失
		if(this.y <= -img.height){
			this.removable = true;
		}
	}
}
//子弹列表对象，其中保存着当前的所有子弹
var bulletList;
function BulletList(){
	this.arr = [];	//画布上所有的子弹对象
	this.add = function(bullet){  //添加子弹
		this.arr.push(bullet);
	}
	this.remove = function(i){	//删除子弹
		this.arr.splice(i, 1);
	}
	this.draw = function(){	//绘制每一个子弹
		//console.log('bulletList.draw...'+this.arr.length);
		for(var i in this.arr){
			this.arr[i].draw();
		}
	}
	this.move = function(){
		for(var i in this.arr){
			this.arr[i].move(); //让每个子弹都移动
			if(this.arr[i].removable){
				this.remove(i);
			}
		}
	}
}

/////////V6版本新增加内容/////////
//小号敌机
function Enemy1(imgs){
	this.x = Math.random()*(canvasWidth-imgs[0].width);
	this.y = -imgs[0].height;
	this.width = imgs[0].width;
	this.height = imgs[0].height;
	this.index = 0; //当前绘制的图片在数组中的下标
	this.speed = 7;  //小敌机每42ms移动的距离——即飞行速度
	this.removable = false; //可以删除了吗
	this.blood = 1;  //小敌机只有1格血
	this.crashed = false;   //是否被撞毁
	this.draw = function(){
		ctx.drawImage(imgs[this.index],this.x,this.y);
	}
	this.counter = 0;
	this.move = function(){
		this.counter++;
		this.y+=this.speed;
		this.checkHit(); //碰撞检查
		//若飞出下边界或炸毁了，则可以删除了
		if(this.crashed && this.counter%2===0){
			if(this.index===0)this.index=1;
			else if(this.index<imgs.length-1)this.index++;
			else this.removable = true;
		}
		if(this.y>=canvasHeight){ //飞出下边界
			this.removable = true;
		}
	}
	////碰撞检验////
	/*
	碰撞的四个条件：
		obj1.x + obj1.width >= obj2.x
		obj2.x + obj2.width >= obj1.x
		obj1.y + obj1.height >= obj2.y
		obj2.y + obj2.height >= obj1.y
	*/
	this.checkHit = function(){
		//每个敌机必须和我方的每个子弹/英雄进行碰撞检验
		for(var i in bulletList.arr){
			var b = bulletList.arr[i];
			/*console.log('1'+this.x+'-'+this.y);
			console.log('2'+this.width+'-'+this.height);
			console.log('3'+b.x+'-'+b.y);
			console.log('4'+b.width+'-'+b.height);*/
			if( (this.x+this.width>=b.x)
				&&(b.x+b.width>=this.x)
				&&(this.y+this.height>=b.y)
				&&(b.y+b.height>=this.y) ){
				this.blood--;
				if(this.blood<=0){ //没有血格了，开始撞毁进程
					this.crashed = true;
				}
				b.removable = true;
			}
		}
	}
}
//中号敌机
function Enemy2(imgs){
	this.x = Math.random()*(canvasWidth-imgs[0].width);
	this.y = -imgs[0].height;
	this.width = imgs[0].width;
	this.height = imgs[0].height;
	this.index = 0; //当前绘制的图片在数组中的下标
	this.speed = 4;  //中号敌机每42ms移动的距离——即飞行速度
	this.removable = false; //可以删除了吗
	this.blood = 3;  //中号敌机有3格血
	this.crashed = false;
	this.draw = function(){
		ctx.drawImage(imgs[this.index],this.x,this.y);
	}
	this.counter = 0;
	this.move = function(){
		this.counter++;
		this.y+=this.speed;
		this.checkHit(); //碰撞检查
		//若飞出下边界或炸毁了，则可以删除了
		if(this.crashed && this.counter%2===0){
			if(this.index===0)this.index=1;
			else if(this.index<imgs.length-1)this.index++;
			else this.removable = true;
		}
		if(this.y>=canvasHeight){ //飞出下边界
			this.removable = true;
		}
	}
	this.checkHit = function(){
		//每个敌机必须和我方的每个子弹/英雄进行碰撞检验
		for(var i in bulletList.arr){
			var b = bulletList.arr[i];
			if( (this.x+this.width>=b.x)
				&&(b.x+b.width>=this.x)
				&&(this.y+this.height>=b.y)
				&&(b.y+b.height>=this.y) ){
				this.blood--;
				if(this.blood<=0){ //没有血格了，开始撞毁进程
					this.crashed = true;
				}
				b.removable = true;
			}
		}
	}
}
//大号敌机
function Enemy3(imgs){
	this.x = Math.random()*(canvasWidth-imgs[0].width);
	this.y = -imgs[0].height;
	this.width = imgs[0].width;
	this.height = imgs[0].height;
	this.index = 0; //当前绘制的图片在数组中的下标
	this.speed = 2;  //大号敌机每42ms移动的距离——即飞行速度
	this.removable = false; //可以删除了吗
	this.blood = 7;  //大敌机有7格血
	this.crashed = false;
	this.draw = function(){
		ctx.drawImage(imgs[this.index],this.x,this.y);
	}
	this.counter = 0; //move()函数被调用的次数
	this.move = function(){
		this.counter++;
		this.y+=this.speed;
		this.checkHit(); //碰撞检验
		if(this.counter%2===0){
			if(!this.crashed){ //未开始撞毁，只在0和1间切换
				if(this.index===0)
					this.index=1;
				else if(this.index===1)
					this.index=0;
			}else { //开始撞毁程序，3-4-5-6-7-removable
				if(this.index===0||this.index===1)
					this.index=3;
				else if(this.index<imgs.length-1)
					this.index++;
				else 
					this.removable = true;
			}
		}
		
		//若飞出下边界或炸毁了，则可以删除了
		if(this.y>=canvasHeight){ //飞出下边界
			this.removable = true;
		}
	}
	this.checkHit = function(){
		//每个敌机必须和我方的每个子弹/英雄进行碰撞检验
		for(var i in bulletList.arr){
			var b = bulletList.arr[i];
			if( (this.x+this.width>=b.x)
				&&(b.x+b.width>=this.x)
				&&(this.y+this.height>=b.y)
				&&(b.y+b.height>=this.y) ){
				this.blood--;
				if(this.blood<=0){ //没有血格了，开始撞毁进程
					this.crashed = true;
				}
				b.removable = true;
			}
		}
	}
}
//所有敌机组成的列表
var enemyList;
function EnemyList(){
	this.arr = []; //保存所有的敌机
	this.add = function(enemy){ //增加新敌机
		this.arr.push(enemy);
	}
	this.remove = function(i){ //删除指定的敌机
		this.arr.splice(i,1);
	}
	this.draw = function(){  //绘制所有的敌机
		for(var i in this.arr){
			this.arr[i].draw();
		}
	}
	this.move = function(){  //让所有的敌机移动
		this.generate(); //生成新的敌人
		for(var i in this.arr){
			var e = this.arr[i];
			e.move();
			if(e.removable){
				this.remove(i);
			}
		}
	}
	//随机生成一个敌机
	this.generate = function(){
		/*敌机生成的要求：
		*何时生成敌机是随机的，不是定时或者连续的
		*小号敌机的概率最大，中号其次，大号最少
		*思路：0~199随机数  小号0/1/2/3/4/5  中号6/7/8  大号9  其它值不生成敌机
		*进一步扩展：可以将6/9/10设置为变量，以增加游戏难度
		*/
		var num = Math.floor( Math.random()*200 );
		if(num<6){
			this.add( new Enemy1(imgsEnemy1) );
		}else if(num<9){
			this.add( new Enemy2(imgsEnemy2) );
		}else if(num<10){
			this.add( new Enemy3(imgsEnemy3) );
		}
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
				bulletList.draw();
				bulletList.move();
				enemyList.draw();
				enemyList.move();
				break;
			case PHASE_PAUSE:
				break;
			case PHASE_GAMEOVER:
				break;
		}
	}, 42); //每一秒动24次
}