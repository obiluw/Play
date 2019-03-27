var tetris={
  OFFSET:15,//保存容器的内边距
  CSIZE:26,//保存每个格子的宽高
  shape:null,//保存正在下落的主角图形
  nextShape:null,//保存备胎图形
  interval:1000,//保存图形下落的速度
  timer:null,//保存当前动画的序号
  wall:null,//保存所有已经停止下落的方块的二位数组
  RN:20,//总行数
  CN:10,//总列数
  lines:0,//保存消除的总行数
  score:0,//保存当前得分
  SCORES:[0,10,50,120,200],
        //0  1  2  3   4
  state:1,//保存当前游戏状态
  RUNNING:1,//运行中
  PAUSE:2,//暂停
  GAMEOVER:0,//结束

  LN:10,//每10行一级
  LNINTERVAL:100,//每升一级，interva减100毫秒
  MIN:100,//interval最小的毫秒数
  level:1,//保存当前游戏的等级

  start:function(){
    this.interval=1000;
    this.level=1;
    this.state=this.RUNNING;//初始化游戏状态为运行中
    this.lines=0;
    this.score=0;
    this.wall=[];//将wall初始化为空数组
    //r从0开始，到<RN结束，每次增1
    for(var r=0;r<this.RN;r++){
      //设置wall中r位置的行为CN个元素的空数组
      this.wall[r]=new Array(this.CN);
    }
    //随机生成主角图形，保存在shape中
    this.shape=this.randomShape();
    //随机生成备胎图形，保存在nextShape中
    this.nextShape=this.randomShape();
    this.paint();//调用paintShape绘制主角图形
    //启动周期性定时器,设置任务函数为moveDown，提前绑定this,时间间隔为interval
    this.timer=setInterval(
      this.moveDown.bind(this),this.interval);
    var me=this;//留住this
    //为当前页面绑定键盘按下事件
    document.onkeydown=function(e){
      switch(e.keyCode){//判断键盘号
        case 37: 
          //如果游戏状态为RUNNING
          if(me.state==me.RUNNING){
            me.moveLeft();//如果是37: 左移
          }
          break;
        case 39: 
          //如果游戏状态为RUNNING
          if(me.state==me.RUNNING){
            me.moveRight();//如果是39: 右移
          }
          break;
        case 40: 
          //如果游戏状态为RUNNING
          if(me.state==me.RUNNING){
            me.moveDown();//如果是40: 下落
          }
          break;
        case 38: 
          //如果游戏状态为RUNNING
          if(me.state==me.RUNNING){
            me.rotateR();//如果是38: 右转
          }
          break;
        case 90: 
          //如果游戏状态为RUNNING
          if(me.state==me.RUNNING){
            me.rotateL();//如果是90: 左转
          }
          break;
        case 83: 
          //如果当前游戏的状态为GAMEOVER
          if(me.state==me.GAMEOVER){
            me.start();//如果是83: 启动
          }
          break;
        case 80://暂停
          //如果当前游戏的状态为RUNNING
          if(me.state==me.RUNNING){
            me.pause();
          }
          break;
        case 67://继续
          //如果当前游戏的状态为PAUSE
          if(me.state==me.PAUSE){
            me.myContinue();
          }
          break;
        case 81://退出
          //如果状态不是GAMEOVER
          if(me.state!=me.GAMEOVER){
            me.quit();
          }
          break;
        case 32://一落到底
          if(me.state==me.RUNNING){//如果状态为RUNNING
            me.hardDrop();
          }
      }
    }
  },
  hardDrop:function(){//一落到底
    while(this.canDown()){
      this.shape.moveDown();
    }
    this.paint();
  },
  myContinue:function(){
    this.state=this.RUNNING;
    this.paint();
  },
  pause:function(){
    this.state=this.PAUSE;
    this.paint();
  },
  canRotate:function(){//检查能否旋转
    //遍历当前图形中每个cell
    for(var i=0;i<this.shape.cells.length;i++){
      //将当前图形临时保存在变量cell中
      var cell=this.shape.cells[i];
      //如果cell的r>19或cell.r<0或cell.c<0或cell.c>9
        //或在wall中和c相同位置不为空
      if(cell.r<0||cell.r>19||cell.c<0||cell.c>9
          ||this.wall[cell.r][cell.c]!==undefined){
        return false;//就返回false
      }
    }//(遍历结束)
    return true;//就返回true
  },
  rotateR:function(){//专门负责右转一次
    this.shape.rotateR();//调用主角图形的rotateR方法
    //如果不能旋转，就让shape，再左转回来，
    //否则,//重绘一切
    !this.canRotate()?this.shape.rotateL():this.paint();
  },
  rotateL:function(){//专门负责左转一次
    this.shape.rotateL();//调用主角图形的rotateL方法
    //如果不能旋转，就让shape，在右转回来
    //否则//重绘一切
    !this.canRotate()?this.shape.rotateR():this.paint();
  },
  canLeft:function(){
    //遍历shape中每个cell
    for(var i=0;i<this.shape.cells.length;i++){
      //将当前cell保存在变量cell中
      var cell=this.shape.cells[i];
      if(cell.c==0
        ||this.wall[cell.r][cell.c-1]!==undefined){
        return false;
      }
    }
    return true;
  },
  moveLeft:function(){//专门负责左移一次
    if(this.canLeft()){//如果可以左移
      this.shape.moveLeft();//让shape左移一次
      this.paint();//重绘一切
    }
  },
  canRight:function(){
    //遍历shape中每个cell
    for(var i=0;i<this.shape.cells.length;i++){
      //将当前cell保存在变量cell中
      var cell=this.shape.cells[i];
      if(cell.c==this.CN-1
        ||this.wall[cell.r][cell.c+1]!==undefined){
        return false;
      }
    }
    return true;
  },
  moveRight:function(){//专门负责右移一次
    if(this.canRight()){//如果可以右移
      this.shape.moveRight();//让shape右移一次
      this.paint();//重绘一切
    }
  },
  canDown:function(){//专门用于检测能否下落
    //遍历shape中每个cell
    for(var i=0;i<this.shape.cells.length;i++){
      //将当前cell临时存储在变量cell中
      var cell=this.shape.cells[i];
      if(cell.r==19//如果cell的r已经等于19
        ||this.wall[cell.r+1][cell.c]!==undefined){
        //或wall中cell的下方位置不等于undefined
        return false;//返回false
      }
    }//(遍历结束)
    return true;//返回true
  },
  quit:function(){
    this.state=this.GAMEOVER;//修改游戏状态为GAMEOVER
    clearInterval(this.timer);//停止定时器
    this.timer=null;
    this.paint();
  },
  moveDown:function(){//负责将图形下落一次
    if(this.state==this.RUNNING){//如果游戏正在运行中
      if(this.canDown()){//如果可以下落
        this.shape.moveDown();//调用shape的moveDown方法
      }else{//否则(不能下落)
        //调用landIntoWall，将shape放入墙中
        this.landIntoWall();
        //调动deleteRows判断并删除满格行
        var ln=this.deleteRows();
        this.lines+=ln;//将ln累加到lines中
        this.score+=this.SCORES[ln];
        //如果lines>level*LN
        if(this.lines>this.level*this.LN){
          this.level++;//level+1
          if(this.interval>this.MIN){//如果interval>MIN
            //将interval-LNINTERVAL
            this.interval-=this.LNINTERVAL;
            clearInterval(this.timer);//停止定时器
            this.timer=setInterval(//重新启动定时器
              this.moveDown.bind(this),this.interval);
          }
        }
        if(this.isGameOver()){//如果游戏结束
          this.quit();
        }else{//否则
          this.shape=this.nextShape;//备胎转正
          this.nextShape=this.randomShape();//生成新的备胎
        }
      }
      this.paint();//调用paintShape，绘制主角图形
    }
  },
  paintState:function(){//专门根据游戏状态显示图片
    //如果当前游戏状态为PAUSE
    if(this.state==this.PAUSE){
      //创建一个新Image对象，保存在变量img中
      var img=new Image();
      img.src="img/pause.png";//设置img的src为pause.png
      pg.appendChild(img);//将img追加到pg下
    }else if(this.state==this.GAMEOVER){
      //否则，如果当前游戏状态为GAMEOVER
      //创建一个新Image对象，保存在变量img中
      var img=new Image();
      //设置img的src为game-over.png
      img.src="img/game-over.png";
      pg.appendChild(img);//将img追加到pg下
    }
  },
  isGameOver:function(){
    //遍历备胎图形中的每个cell
    for(var i=0;i<this.nextShape.cells.length;i++){
      var cell=this.nextShape.cells[i];
      //如果wall中cell相同位置有格
      if(this.wall[cell.r][cell.c]!==undefined){
        return true;//返回true
      }
    }//(遍历结束)返回false
    return false;
  },
  paintNext:function(){//专门绘制备胎图形
    //创建文档片段，保存在变量frag中
    var frag=document.createDocumentFragment();
    //遍历nextShape的cells数组中的每个cell对象
    for(var i=0;i<this.nextShape.cells.length;i++){
      //将当前格子，保存在变量cell中
      var cell=this.nextShape.cells[i];
      //创建一个新Image对象，保存在变量img中
      var img=new Image();
      img.src=cell.src;//设置img的src为cell的src
      //设置img的top为OFFSET+cell的r*CSIZE
      img.style.top=
        this.OFFSET+(cell.r+1)*this.CSIZE+"px";
      //设置img的left为OFFSET+cell的c*CSIZE
      img.style.left=
        this.OFFSET+(cell.c+10)*this.CSIZE+"px";
      frag.appendChild(img);//将img追加到frag中
    }//(遍历结束)
    pg.appendChild(frag)//将frag追加到id为pg的元素下
  },
  paintScore:function(){//将lines和score填充到span
    //设置id为lines的元素的内容为lines属性
    lines.innerHTML=this.lines;
    //设置id为score的元素的内容为score属性
    score.innerHTML=this.score;
    //设置id为level的元素的内容为level属性
    level.innerHTML=this.level;
  },
  deleteRows:function(){//遍历所有行，检查能否消除
    //自底向上遍历wall中每一行，同时声明变量ln=0
    for(var r=this.RN-1,ln=0;
        r>=0&&this.wall[r].join("")!="";
        r--){
      if(this.isFull(r)){//如果当前行是满格
        this.deleteRow(r);//调用deleteRow，删除当前行
        r++;//r留在原地
        ln++;//ln+1
        if(ln==4){break}//如果ln等于4了，就退出循环
      }
    }
    return ln;//返回ln
  },
  deleteRow:function(delr){//删除第delr行
    //r从delr开始，到>0结束，每次r-1
    for(var r=delr;r>0;r--){
      //将wall中r-1行赋值给wall中r行
      this.wall[r]=this.wall[r-1];
      //创建一个CN个元素的空数组赋值给wall中r-1行
      this.wall[r-1]=new Array(this.CN);
      for(var i=0;i<this.CN;i++){//遍历wall中r行的每个格
        //将当前格保存在cell中
        var cell=this.wall[r][i];
        //如果cell有效，就将cell的r+1
        cell!==undefined&&cell.r++;
      }
      //如果wall中r-2行是空行，就退出循环
      if(this.wall[r-2].join("")==""){break;}
    }
  },
  isFull:function(r){//专门判断第r行是否满格
    //返回 wall中r行转为字符串后，用search查找是否包含reg，与-1比较的结果
    return String(this.wall[r]).search(/^,|,,|,$/)==-1
  },
  randomShape:function(){//专门随机创建一个图形
    //在0~2之间生成随机数，保存在变量r中
    var r=parseInt(Math.random()*3);
    switch(r){//判断r
      //如果是0：返回一个新的O类型的图形对象
      case 0: return new O(); 
      //如果是1：返回一个新的I类型的图形对象
      case 1: return new I();
      //如果是2：返回一个新的T类型的图形对象
      case 2: return new T();
    }
  },
  landIntoWall:function(){//专门负责将主角放入wall中
    //遍历shape中每个cell
    for(var i=0;i<this.shape.cells.length;i++){
      //将当前cell临时存储在变量cell中
      var cell=this.shape.cells[i];
      //将当前cell赋值给wall中相同位置
      this.wall[cell.r][cell.c]=cell;
    }
  },
  paintWall:function(){//专门绘制墙中所有方块
    //创建文档片段frag
    var frag=document.createDocumentFragment();
    //自底向上遍历wall中每行
    for(var r=this.RN-1;
        r>=0&&this.wall[r].join("")!="";
        r--){
      for(var c=0;c<this.CN;c++){//遍历wall中r行每个格
        //将当前格子，保存在变量cell中
        var cell=this.wall[r][c];
        if(cell){//如果cell有效
          //创建一个新Image对象，保存在变量img中
          var img=new Image();
          img.src=cell.src;//设置img的src为cell的src
          //设置img的top为OFFSET+cell的r*CSIZE
          img.style.top=this.OFFSET+cell.r*this.CSIZE+"px";
          //设置img的left为OFFSET+cell的c*CSIZE
          img.style.left=this.OFFSET+cell.c*this.CSIZE+"px";
          frag.appendChild(img);//将img追加到frag中
        }
      }
    }//(遍历结束)
    pg.appendChild(frag);//将frag追加到pg中
  },
  paint:function(){//重绘一切
    var reg=/<img[^>]*>/g
    //用reg删除pg的内容中的所有img,结果再保存回pg的内容中
    pg.innerHTML=pg.innerHTML.replace(reg,"");
    this.paintShape();//绘制主角
    this.paintNext();//绘制备胎
    this.paintWall();//绘制墙
    this.paintScore();//绘制分数
    this.paintState();//绘制状态图片
  },
  paintShape:function(){//专门绘制主角图形
    //创建文档片段，保存在变量frag中
    var frag=document.createDocumentFragment();
    //遍历shape的cells数组中的每个cell对象
    for(var i=0;i<this.shape.cells.length;i++){
      //将当前格子，保存在变量cell中
      var cell=this.shape.cells[i];
      //创建一个新Image对象，保存在变量img中
      var img=new Image();
      img.src=cell.src;//设置img的src为cell的src
      //设置img的top为OFFSET+cell的r*CSIZE
      img.style.top=this.OFFSET+cell.r*this.CSIZE+"px";
      //设置img的left为OFFSET+cell的c*CSIZE
      img.style.left=this.OFFSET+cell.c*this.CSIZE+"px";
      frag.appendChild(img);//将img追加到frag中
    }//(遍历结束)
    pg.appendChild(frag)//将frag追加到id为pg的元素下
  }
}
window.onload=function(){tetris.start();}