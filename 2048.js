var game={
	data:null,//保存二维数组来保存游戏所有格子的数据
	RN:4,//保存总行数
	CN:4,//保存总列数
  score:0,//保存游戏当前的得分
  state:1,//保存游戏的状态
  GAMEOVER:0,//游戏结束状态
  RUNNING:1,//游戏运行中状态
  CELLSIZE:100,//保存每个格子的宽高
  OFFSET:16,//保存格子之间的间距和距边框的边距
  top:0,//保存最高分

	//对象自己的方法，要使用自己的属性或其他方法，都要用this.
	//每个属性和方法结尾，必须用逗号分隔
  init:function(){//初始化游戏的格子div
    //r从0开始，到<RN结束，同时声明空数组arr
    for(var r=0,arr=[];r<this.RN;r++){
      for(var c=0;c<this.CN;c++){//c从0开始，到<CN结束
        arr.push(""+r+c)//向arr中压入:""+r+c
      }
    }
    //设置id为gridPanel的div的内容为:
    gridPanel.innerHTML='<div id="g'+
      arr.join('" class="grid"></div><div id="g')+
      '" class="grid"></div>';
    //向gridPanel的内容中追加:
    gridPanel.innerHTML+='<div id="c'+
      arr.join('" class="cell"></div><div id="c')+
      '" class="cell"></div>';
    //计算gridPanel的宽度,保存在变量width中:
    var width=
      this.CELLSIZE*this.CN+this.OFFSET*(this.CN+1);
    //设置gridPanel的style的width为width+"px"
    gridPanel.style.width=width+"px";
    //计算gridPanel的高度,保存在变量height中:
    var height=
      this.CELLSIZE*this.RN+this.OFFSET*(this.RN+1)
    //设置gridPanel的style的height为height+"px"
    gridPanel.style.height=height+"px";
  },
	start:function(){//启动游戏
    //读取cookie中的最高分
    if(document.cookie.trim()!=""){
      this.top=parseInt(document.cookie.slice(4));
    }
    this.init();//动态生成单元格div
    this.state=this.RUNNING;//初始化游戏状态为运行中
    this.score=0;//分数清零
		//初始化二维数组
		//创建空数组，保存在当前对象的data属性中
		this.data=[];
		//r从0开始，到<RN结束，每次增1
		for(var r=0;r<this.RN;r++){
			this.data[r]=[];//先向data中压入一个空数组
			//c从0开始，到<CN结束，每次增1
			for(var c=0;c<this.CN;c++){
				this.data[r][c]=0;//向data中r行压入一个0
			}
		}//(遍历结束)
    //生成2个随机数
    this.randomNum();
    this.randomNum();
		this.updateView();
    var me=this;//留住this
    //响应键盘事件
    document.onkeydown=function(e){//this->document
      //e保存了事件发生时的信息
      switch(e.keyCode){//获得按键号
        case 37: me.moveLeft(); break;
        case 38: me.moveUp(); break;
        case 39: me.moveRight(); break;
        case 40: me.moveDown(); break;
      }
    }
	},
  moveUpInCol:function(c){//上移第c列
    //r从0开始，到<RN-1结束，每次增1
    for(var r=0;r<this.RN-1;r++){
      //查找r行c列下方下一个不为0的数的位置，保存在nextr中
      var nextr=this.getDownInCol(r,c);
      if(nextr==-1){break;}//如果没找到，就退出循环
      else if(this.data[r][c]==0){//否则，如果data中r行c列等于0
        //将data中nextr行c列的值替换给r行c列的元素
        this.data[r][c]=this.data[nextr][c];
        this.data[nextr][c]=0;//将data中nextr行c列置为0
        r--;//让r留在原地
      }else if(this.data[r][c]==this.data[nextr][c]){
      //否则，如果data中r行c列等于nextr行c列
        //将data中r行c列的值*2
        this.score+=(this.data[r][c]*=2);
        this.data[nextr][c]=0;//将data中nextr行c列置为0
      }
    }
  },
  //查找r行c列下方下一个不为0的数
  getDownInCol:function(r,c){
    //nextr从r+1开始，nextr到<RN，nextr每次增1
    for(var nextr=r+1;nextr<this.RN;nextr++){
      if(this.data[nextr][c]!=0){//如果nextr行c列的元素不等于0
        return nextr;//返回nextr
      }
    }//(遍历结束)
    return -1;//返回-1
  },
  moveDownInCol:function(c){//下移第c列
    for(var r=this.RN-1;r>0;r--){
      var prevr=this.getUpInCol(r,c);
      if(prevr==-1){break;}
      else if(this.data[r][c]==0){
        this.data[r][c]=this.data[prevr][c];
        this.data[prevr][c]=0;
        r++;
      }else if(this.data[r][c]==this.data[prevr][c]){
        this.score+=(this.data[r][c]*=2);
        this.data[prevr][c]=0;
        //将当前元素的值累加到score上
      }
    }
  },
  getUpInCol:function(r,c){//找r行c列上方不为0的位置
    for(var prevr=r-1;prevr>=0;prevr--){
      if(this.data[prevr][c]!=0){
        return prevr;
      }
    }
    return -1;
  },
  moveRightInRow:function(r){//右移第r行
    for(var c=this.CN-1;c>0;c--){
      var prevc=this.getPrevInRow(r,c);
      if(prevc==-1){break;}
      else if(this.data[r][c]==0){
        this.data[r][c]=this.data[r][prevc];
        this.data[r][prevc]=0;
        c++;
      }else if(this.data[r][c]==this.data[r][prevc]){
        this.score+=(this.data[r][c]*=2);
        this.data[r][prevc]=0;
        //将当前元素的值累加到score上
      }
    }
  },
  //找r行c列左侧前一个不为0的位置
  getPrevInRow:function(r,c){
    for(var prevc=c-1;prevc>=0;prevc--){
      if(this.data[r][prevc]!=0){
        return prevc;
      }
    }
    return -1;
  },
	randomNum:function(){//只负责生成一个随机数
		for(;;){//反复执行
			//在0~RN-1之间随机生成一个行号r
      var r=parseInt(Math.random()*this.RN);
			//在0~CN-1之间随机生成一个列号c
      var c=parseInt(Math.random()*this.CN);
			if(this.data[r][c]==0){//如果data中r行c列为0
				//声明变量n，再生成一个随机数，如果<0.5，就将n赋值为2，否则赋值为4
        //将n保存在data中r行c列的位置
        this.data[r][c]=Math.random()<0.5?2:4;
				break;//退出循环
      }
    }
	},
  updateView:function(){//专门将data中数据更新到页面
    //遍历data中每个元素
    for(var r=0;r<this.RN;r++){
      for(var c=0;c<this.CN;c++){
        //用id找到当前元素对应的前景格，保存在div中
        var div=document.getElementById("c"+r+c);
        if(this.data[r][c]==0){//如果当前元素等于0
          div.innerHTML="";//设置div的内容为""
          div.className="cell";//设置div的class属性为cell
        }else{//否则
          //设置div的内容为当前元素的值
          div.innerHTML=this.data[r][c];
          //设置div的class属性为"cell n"+当前元素值
          div.className="cell n"+this.data[r][c];
        }
      }
    }
    //设置id为score的元素内容为当前对象的score属性
    score.innerHTML=this.score;
    top1.innerHTML=this.top;//显示最高分
    //设置id为finalScore的span内容为当前对象的score
    finalScore.innerHTML=this.score;
    //设置id为gameOver的div的display属性：
      //如果当前游戏的状态为GAMEOVER,就改为"block"
      //否则就改为"none"
    gameOver.style.display=
      this.state==this.GAMEOVER?"block":"none";
  },
  isGameOver:function(){
    for(var r=0;r<this.RN;r++){//遍历data中每个元素
      for(var c=0;c<this.CN;c++){
        //如果当前元素是0，就返回false
        if(this.data[r][c]==0){return false}
        else if(c<this.CN-1
              &&this.data[r][c]==this.data[r][c+1]){
        //否则,如果c<CN-1,且当前值等于右侧值
          return false;//就返回false
        }else if(r<this.RN-1
              &&this.data[r][c]==this.data[r+1][c]){
        //否则,如果r<RN-1,且当前值等于下方值
          return false;//就返回false
        }
      }
    }//(遍历结束)
    return true;//返回true
  },
  move:function(fun){
    //先给数组照相，保存在变量before中
    var before=String(this.data);
    /*window.*/fun();//fun中的this->window
    //再给数组照相，保存在变量after中
    var after=String(this.data);
    if(before!=after){//如果before不等于after时
      this.randomNum();//生成一个随机数
      //如果游戏结束，就设置游戏的状态为GAMEOVER
      if(this.isGameOver()){
        this.state=this.GAMEOVER;
        if(this.score>this.top){
          var date=new Date("2020/01/01");
          document.cookie="top="+this.score
                         +";expires="+date.toGMTString();
        }
      };
      this.updateView();//更新页面
    }
  },
  moveLeft:function(){//左移所有行
    var me=this;//留住this
    this.move(function(){//希望this->game
      for(var r=0;r<me.RN;r++){//r从0开始，到<RN结束，每次增1
        me.moveLeftInRow(r);//调用moveLeftInRow,传入r作为参数
      }//(遍历结束)
    });
  },
  moveRight:function(){//右移所有行
    var me=this;
    this.move(function(){
      for(var r=0;r<me.RN;r++){
        me.moveRightInRow(r);
      }
    });
  },
  moveUp:function(){//上移所有列
    var me=this;
    this.move(function(){
      for(var c=0;c<me.CN;c++){//c从0开始，到<CN结束，每次增1
        me.moveUpInCol(c);//上移第c列
      }
    });
  },
  moveDown:function(){//下移所有列
    var me=this;
    this.move(function(){
      for(var c=0;c<me.CN;c++){//c从0开始，到<CN结束，每次增1
        me.moveDownInCol(c);//上移第c列
      }
    });
  },
  moveLeftInRow:function(r){//负责左移第r行
    //c从0开始，到<CN-1结束，每次增1
    for(var c=0;c<this.CN-1;c++){
      //查找data中r行c列之后下一个不为0的位置，保存在变量nextc中
      var nextc=this.getNextInRow(r,c);
      //如果没找到，就直接退出循环
      if(nextc==-1){break;}
      else if(this.data[r][c]==0){//否则，如果当前元素等于0
        //将data中r行nextc列的值替换给当前元素
        this.data[r][c]=this.data[r][nextc];
        this.data[r][nextc]=0//将data中r行nextc列的值重置为0
        c--;//让c留在原地
      }else if(this.data[r][c]==this.data[r][nextc]){
      //否则，如果当前元素的值等于r行nextc列的元素值
        //将当前元素的值*2
        this.score+=(this.data[r][c]*=2);
        this.data[r][nextc]=0//将data中r行nextc列的值重置为0
        //将当前元素的值累加到score上
      }
    }
  },
  //在r行中找c列后下一个不为0的位置，找到返回下标，没找到返回-1
  getNextInRow:function(r,c){
    //nextc从c+1开始，到<CN结束,每次增1
    for(var nextc=c+1; nextc<this.CN;nextc++){
      //如果data中r行nextc列的值不等于0
      if(this.data[r][nextc]!=0){
        return nextc;//返回nextc
      }
    }//(遍历结束)
    return -1;//返回-1
  },
}
//当页面加载完成后，自动触发
window.onload=function(){
	game.start();
}