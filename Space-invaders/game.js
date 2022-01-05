let canvas;
let ctx;
let buffer;
let flying = false;
let player;
let gravity = 5;
let acc = 5;
let velocity = 0;
let scrollspeed = 0.01;
let timePast = 2/60;
let time = 0;
let clock = 0;
let backx = 0;
let pause = false;
let SpacePressed = false;
let FPS = 60;
let frames = 0;
let NumOfPatterns = 3;
let coins = [];
let realCoins = [];
let coincount = 3;
let patterns = [[[]]];
let MissileSpeed = 10;
let Rockets = [];
let RocketNumber = 5;
let RockerOrder = [1,2,3,4,5];
let RocketClock = 0;





//igra bo bla loopana na 30 seckund, pol se vse vrednosti resetajo;

function GiveRocket(){
	let lastel = RockerOrder[RockerOrder.length-1];
if(RocketClock>= 5)
{

	RockerOrder.pop;
	RocketClock = 0;
	console.log("new rocket");
	return RockerOrder[RockerOrder.length-1];
	
}
else {

	return lastel;
}

}
function refreshValues(){
	let gravity = 5;
	let acc = 5;
	let velocity = 0;
	let scrollspeed = 0.01;
	let timePast = 2/60;
	let time = 0;
	let clock = 0;
	let backx = 0;
	let pause = false;
	let SpacePressed = false;
	let FPS = 60;
	let frames = 0;
	let NumOfPatterns = 3;
	let coins = [];
	let realCoins = [];
	let coincount = 3;
	let patterns = [[[]]];
	let MissileSpeed = 10;
	let Rockets = [];
	let RocketNumber = 5;
	let RockerOrder = [1,2,3,4,5];
	let RocketClock = 0;
	let currentRocket = 0;
	//loadPatterns();
	//loadPatterns(0);
	loadCoins(0);
	MakeRocketOrder();
	loadRockets();
	
	console.log("refresh");
}

function backgroundRefresh(){
	initBackground();
}



class Player {
	constructor(x, y, imageSource){
		this.x = x;
		this.y = y;
		this.ship = new Image();
		this.ship.src = imageSource;
	}
}
class MovingBack {
	constructor(x, y, imageSource){
		this.x = x;
		this.y = y;
		this.back = new Image();
		this.back.src = imageSource;
	}
}
class Coin {
	constructor(x, y, imageSource){
		this.x = x;
		this.y = y;
		this.body = new Image();
		this.body.src  =imageSource;
	}
}
class Rocket {
	constructor(x, y, imageSource){
		this.x = x;
		this.y = y;
		this.body = new Image();
		this.body.src = imageSource;
	}
}

for(let i = 0; i < NumOfPatterns; i++)
patterns[i] = [];

for(let i = 0; i < 3; i++)
for(let j = 0; j < 36; j++)
patterns[i][j] = [];

function loadPatterns(x){
	for(let i = 0;i<36;i++ )
	{
		for(let j = 0; j < 36; j++)
		{
			patterns[x][i][0] = 1;
		}
	}
}

function initBackground(){
	//set backround color of canvas to gray
	ctx.fillStyle = 'silver';
	background1 = new MovingBack(0,0, "4.Background.png");
}

function initElements(){
	//create canvas element
	canvas = document.createElement("canvas");

	//set canvas size
	canvas.width = 1280;
	canvas.height = 720;

	//get context of canvas
	ctx = canvas.getContext("2d");
	buffer = canvas.getContext("2d");

	//append canvas to body
	document.body.appendChild(canvas)
}
function MakeRocketOrder(){
	RockerOrder = RockerOrder.sort(() => Math.random() - 0.5);


}
function drawBackground () {
	//decorate your background
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function playerInput (e)//keydown
{
	//if (e.repeat) return;
	 if (e.keyCode == "32")
	 {
		 SpacePressed = true;
		 
	}
	else if (e.keyCode == "27")
	{
		pause = !pause;
		console.log("esc");
	}
}
function playerInput2(e){//keyup
	if(e.keyCode == "32"){
		SpacePressed = false;
	
		
	}
}
function loadCoins() {
for(let i = 0; i<36;i++)
{
	for(let j = 0; j<36;j++)
	{
		if(patterns[0][i][j])
		{
			let x = new Coin(20 * i + 800, 20 * j, "Coin.png" );
			
			realCoins.push(x);
		}
		else{
			//console.log("not");
		}
	}
}
}
function loadRockets() {
	for(let i = 0; i< RocketNumber; i++)
	{
		let y = Math.floor(Math.random() * 36);
		//console.log("nekaj");
		Rockets.push(new Rocket(0,20 * y, "Rocket.png"));
	}
	
}
function hitBottom(){
	let rockbottom = canvas.height - 40;
	if(player.y >= rockbottom){
		player.y = rockbottom;

		return 1;
	}
	else
	{

		return 0;
	}

}
function hitTop(){
	let top = 0;
	if(player.y <= top){
		player.y = top;
		return 1;
	}
	else {
		return 0;
	}
}

function update(){
	let currentRocket = GiveRocket();
	//console.log(currentRocket+ " dan rocket");
	if(SpacePressed)
	{
		if(!(hitTop() || pause))
		 {
			 player.y -= 5;
	 		flying = true;
		 }
	}
	else if(!SpacePressed)
	{
		if(!pause){
			flying = false;
		}
	}
	if(!hitBottom() && flying == false)
	{
		time += timePast;
		player.y += ( time * velocity);
		velocity = time * acc;
		
	}
	else {
			time = 0;
	}
	backx += scrollspeed;

	updateBackground();
	updateCoin();
	updateRealCoin();
	
	updateRocket(currentRocket);
	
	realCoinCollison(); 
	//CoinCollison();
	//console.log(backx);
}


function realCoinCollison(){
	for(let i = 0; i<realCoins.length; i++){

		if(player.x + 40 >= realCoins[i].x && player.x <= realCoins[i].x+20 )
		{
		
			if(player.y <= realCoins[i].y && player.y + 40 >= realCoins[i].y)
			{
				
				realCoins.splice(i,1);
				
			}
		
		}

	}
}

function drawPlayer () {
	//draw player spaceship at current location
	buffer.drawImage(player.ship, player.x-20, player.y, 40, 40)
}


function drawBackground1 (){
	buffer.drawImage(background1.back, 0 + background1.x,0, 1280  , 720 ,  0 , 0 , 1280, 720);
}
function drawCoins() {
	for(let i = 0; i<coincount; i++)
	buffer.drawImage(coins[i].body, coins[i].x, coins[i].y, 20, 20);
}
function drawRealCoins(){
	
		
	for(let i = 0; i < realCoins.length; i++){
		
		buffer.drawImage(realCoins[i].body, realCoins[i].x, realCoins[i].y, 20, 20);
		
		
	}

}
function updateBackground() {
	background1.x += backx;
}
function updateCoin() {
	//for(let i = 0; i < coincount; i++)
	//coins[i].x -= backx;
}
function updateRealCoin() {
	for(let i = 0; i < realCoins.length; i++){
		realCoins[i].x -= backx;
	}
}
function updateRocket(i) {

	Rockets[i-1].x += MissileSpeed;
}
function drawRockets(i) {
	
		buffer.drawImage(Rockets[i-1].body, Rockets[i-1].x, Rockets[i-1].y, 80, 40);
		
	
}
function updateClock(){
	clock += 1/60;
	RocketClock += 1/60;
}

function draw () {

	frames++;
	//console.log(frames);
	  if(!pause)
	  {
		  update();
	  }
	  let x = Math.floor(Math.random() * RocketNumber);
	  drawBackground();
	  drawBackground1();
	  //drawCoins();
	  drawRealCoins();
	  drawPlayer();
	  console.log(currentRocket);
	  drawRockets(currentRocket);
	  //drawEnemies();
	  updateClock();
	 
	  if(background1.x>=3840-1280){
		  backgroundRefresh();
	  }
	  if(clock>=10)
	  {
		  refreshValues();
		  clock = 0;
	  }
	  window.requestAnimationFrame(draw);
	 

}

function init () {
	document.addEventListener('keydown', playerInput);
	document.addEventListener('keyup', playerInput2);
	initElements();
	initBackground();
	player = new Player(canvas.width/2, canvas.height-40, "ship.png");//"https://cdn.onlinewebfonts.com/svg/img_3969.png");
	
	/*
	for(let i = 0; i < coincount; i++)
	coins[i] = new Coin(800 + i*200, 200, "Coin.png" );
	*///start game
	MakeRocketOrder();

	currentRocket = RockerOrder[RockerOrder.length-1];

	loadPatterns(0);
	loadCoins(0);
	
	loadRockets();
	draw();
	
	
	
}
