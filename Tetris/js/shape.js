/*定义格子类型Cell*/
//定义构造函数Cell,只接受2个参数，r，c
function Cell(r,c){
  //为当前对象添加r属性，值为变量r
  //为当前对象添加c属性，值为变量c
  //为当前对象添加src属性，值为""
  this.r=r; this.c=c; this.src="";
}
/*定义旋转状态类型State*/
//定义构造函数state,接收8个参数,r0,c0,r1,c1,r2,c2,r3,c3
function State(r0,c0,r1,c1,r2,c2,r3,c3){
  //为当前对象添加属性rn,cn，值为参数rn,cn
  this.r0=r0; this.c0=c0;
  this.r1=r1; this.c1=c1;
  this.r2=r2; this.c2=c2;
  this.r3=r3; this.c3=c3;
}

/*抽象公共父类型Shape*/
//定义父类型构造函数Shape,定义参数src,cells
function Shape(src,cells,orgi,states){
  //为当前对象添加cells属性，值为变量cells
  this.cells=cells;
  //遍历当前对象的cells中每个cell对象，设置其src属性为当前对象的src属性
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].src=src
  }
  this.orgi=orgi;//为所有图形添加参照格属性
  this.states=states;//为所有图形添加状态数组属性
  //保存所有图形的当前状态序号，创建图形时默认都是0
  this.statei=0;
}
//在Shape类型的原型对象中，添加一个共有属性:IMGS,值为一个对象: {T:"img/T.png",O:"img/O.png"}
Shape.prototype.IMGS={
  T:"img/T.png",
  O:"img/O.png",
  I:"img/I.png",
  J:"img/J.png",
  L:"img/L.png",
  S:"img/S.png",
  Z:"img/Z.png"
}
//在Shape类型的原型对象中，添加共有方法moveDown,moveLeft,moveRight
Shape.prototype.moveDown=function(){
  //遍历当前图形的cells数组中的每个cell
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].r++;//将当前cell的r+1
  }
}
Shape.prototype.moveLeft=function(){
  //遍历当前图形的cells数组中的每个cell
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].c--;//将当前cell的c-1
  }
}
Shape.prototype.moveRight=function(){
  //遍历当前图形的cells数组中的每个cell
  for(var i=0;i<this.cells.length;i++){
    this.cells[i].c++;//将当前cell的c+1
  }
}
//为所有图形添加共有方法: rotateR, rotateL
Shape.prototype.rotateR=function(){
  this.statei++;//将当前对象的statei+1
  //如果statei等于states的个数，就将statei归0
  this.statei==this.states.length&&(this.statei=0);
  this.rotate();//调用rotate方法
}
Shape.prototype.rotate=function(){
  //获得当前对象的states数组中statei位置的状态对象，保存在变量state中
  var state=this.states[this.statei];
  //获得当前对象的cells中orgi位置的cell，保存在变量orgCell中
  var orgCell=this.cells[this.orgi];
  //遍历当前对象中每个cell i: 0,1,2,3
  for(var i=0;i<this.cells.length;i++){
    if(i!=this.orgi){//如果i不等于orgi时
      //将当前格临时保存在变量cell中
      var cell=this.cells[i];
      //设置cell的r=orgCell的r+state中ri属性的值
      cell.r=orgCell.r+state["r"+i];
      //设置cell的c=orgCell的c+state中ci属性的值
      cell.c=orgCell.c+state["c"+i];
    }
  }
}
Shape.prototype.rotateL=function(){
  this.statei--;//将当前对象的statei-1
  //如果statei等于-1时，就将statei重置为states的个数-1
  this.statei==-1&&(this.statei=this.states.length-1);
  this.rotate();//调用rotate
}
/*定义T图形的类型*/
//定义构造函数T，不需要参数
function T(){
  //借用构造函数Shape，传入参数值: this.IMGS.T,[
  Shape.call(this,this.IMGS.T,[
    new Cell(0,3),//实例化第1个cell对象，传入位置0,3,
    new Cell(0,4),//实例化第2个cell对象，传入位置0,4,
    new Cell(0,5),//实例化第3个cell对象，传入位置0,5,
    new Cell(1,4)//实例化第4个cell对象，传入位置1,4,
  ],1,[
    //实例化状态对象，传入:8个数值, 
    new State(0,-1, 0,0,  0,+1,  1,0),
    //实例化状态对象，传入:8个数值
    new State(-1,0, 0,0,  +1,0,  0,-1),
    //实例化状态对象，传入:8个数值
    new State(0,+1, 0,0, 0,-1,  -1,0),
    //实例化状态对象，传入:8个数值
    new State(+1,0, 0,0, -1,0,  0,+1)
  ])
}
//让T类型的原型继承Shape类型的原型
Object.setPrototypeOf(T.prototype,Shape.prototype);

/*定义O图形的类型*/
//定义构造函数O，不需要参数
function O(){
  //借用构造函数Shape，传入参数值: this.IMGS.O,[
  Shape.call(this,this.IMGS.O,[
    new Cell(0,4),//实例化第1个cell对象，传入位置0,4,
    new Cell(0,5),//实例化第2个cell对象，传入位置0,5,
    new Cell(1,4),//实例化第3个cell对象，传入位置1,4,
    new Cell(1,5)//实例化第4个cell对象，传入位置1,5,
  ],0,[new State(0,0, 0,+1, +1,0, +1,+1)]);
}
//让T类型的原型继承Shape类型的原型
Object.setPrototypeOf(O.prototype,Shape.prototype);
/*定义I图形的类型*/
//定义构造函数I，不需要参数
function I(){
  //借用构造函数Shape，传入参数值: this.IMGS.O,[
  Shape.call(this,this.IMGS.I,[
    new Cell(0,3),//实例化第1个cell对象，传入位置0,4,
    new Cell(0,4),//实例化第2个cell对象，传入位置0,5,
    new Cell(0,5),//实例化第3个cell对象，传入位置1,4,
    new Cell(0,6)//实例化第4个cell对象，传入位置1,5,
  ],1,[
    //实例化状态对象，传入:8个数值,
    new State(0,-1, 0,0, 0,+1, 0,+2),
    //实例化状态对象，传入:8个数值,
    new State(-1,0, 0,0, +1,0, +2,0)
  ]);
}
//让T类型的原型继承Shape类型的原型
Object.setPrototypeOf(I.prototype,Shape.prototype);

/*     cells     orgi   states
  S 04 05 13 14   3        2
  Z 03 04 14 15   2        2
  L 03 04 05 13   1        4
  J 03 04 05 15   1        4
*/