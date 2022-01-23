//naredi sfx in backround music
//lasarske ovire
//polepšej modele
//scoreboard za metere in coine
//naredi 4 coin pattarne
//lepsi background








let hightscore = 0;
let tempscore = 0;
let bs = 0;
let ll = document.createElement("audio");
ll.src = "laser.wav";
let cc = document.createElement("audio");
let bg = document.createElement("audio");
bg.src = "bg.mp3"
bg.loop = true;
rr = document.createElement("audio");
		rr.src ="mis.wav";
let rh = document.createElement("audio");
rh.src="mishit.wav";
let rez = document.createElement("audio");
rez.src = "rez.wav";
let type = 1;
let TF = 0;
let rev = 0;
let imTimmer = 0;
let hitted = false;
let cointotal = 0;
let meters = 0;
let gameLOOP = 0;
let canvas;
let ctx;
let buffer;
let flying = false;
let player;
let gravity = 5;
let acc = 5;
let velocity = 0;
let scrollspeed = 0.005;
let timePast = 2/60;
let time = 0;
let clock = 0;
let backx = 5;
let pause = false;
let SpacePressed = false;
let FPS = 60;
let frames = 0;
let NumOfPatterns = 3;
let coins = [];
let realCoins = [];
let coincount = 3;
let patterns = [[[]]];
let ex = 0; //je če bo misile na loadan
let worldClock = 0;
let ExMarks = [];
let numberOfRockets = 3;
let ExMarkLoaded = 0;
let currentTime = 0;
let Rockets = [];
let RocketSpeed = 20;
//igra bo bla loopana na 30 seckund, pol se vse vrednosti resetajo;
function Restart(){

	document.querySelector(".lose").style.display="none";
	document.querySelector(".lose100").style.display="none";
	pause = false;
	clearBackround();
	tempscore = 0;
	type = 1;
	TF = 0;
	 cointotal = 0;
	 meters = 0;
	 gameLOOP = 0;
	 rev = 0;
	imtimmer = 0;
	 flying = false;
		hitted = false; 
	 gravity = 5;
	 acc = 5;
	 velocity = 0;
	 scrollspeed = 0.005;
	 timePast = 2/60;
	 time = 0;
	 clock = 0;
	 backx = 5;
	//let pause = false;
	 SpacePressed = false;
	 FPS = 60;
	 frames = 0;
	 NumOfPatterns = 3;
	 coins = [];
	 realCoins = [];
	 coincount = 3;
	 patterns = [[[]]];
	 ex = 0; //je če bo misile na loadan
	 worldClock = 0;
	 ExMarks = [];
	 numberOfRockets = 3;
	 ExMarkLoaded = 0;
	 currentTime = 0;
	 Rockets = [];
	 RocketSpeed = 20;

for(let i = 0; i < NumOfPatterns; i++)
patterns[i] = [];

for(let i = 0; i < 3; i++)
for(let j = 0; j < 36; j++)
patterns[i][j] = [];

for(let mmm = 0; mmm < NumOfPatterns;mmm++)
{
	for(let i = 0; i < 36; i++)
	{
		for(let j = 0; j < 36; j++)
		{
			patterns[mmm][i][j] = 0;
			
		}
	}
}
function ifRandomYes(){
	let x = Math.floor(Math.random() * 180);
	if(x==14){//sm random number
		return 1;
	}
	else return 0;
}

init();
}
function loadPatterns(x){
	
	if(x==1)
	{
		
		for(let i = 0;i<36;i++ )
		{
			for(let j = 0; j < 36; j++)
			{
				if(i > 3 && i < 23)
				{
					if(j > 3 &&j < 23)
					{
						patterns[x][i][j] = 1;
					
					}
					else patterns[x][i][j] = 0;
				}
				else 
				patterns[x][i][j] = 0;
			}
		}
	}
	else if(x==2)
	{
		
		for(let i = 10;i<36;i++ )
		{
			for(let j = 0; j < 36; j++)
			{
				if(j < 33)
				{
					if(j > 12 &&j < 24)
					{
						patterns[x][i][j] = 1;
					
					}
					else patterns[x][i][j] = 0;
				}
				else 
				patterns[x][i][j] = 0;
			}
		}

	
				let bus = 4;
				for(let i = 27; i<36;i++)
					{
	
							for(let j = bus; j < (36-bus); j++)
							{
			
								patterns[x][i][j] = 1;
			
							}
							bus++;
						}
	}	
	else if(x==0)
	{
		
		let burek = 1;
		let devet = 9;
		for(let i = 0; i< 36; i++)
		{
			for(let j = 0; j< 36; j++)
			{
				patterns[x][i][j] = 0;
			}
		}
		for(let j= 18, i = 0;  i< 36; j+= burek, i++)
		{

			if(j == 35 || j == 0) 
			{
				burek *= -1;
				
			}
			patterns[x][i][j] = 1;
		}
		
	}

}
function refreshValues(){
//	 gravity = 5;
//	 acc = 5;
//	 velocity = 0;
//	 scrollspeed = 0.0005;
/*	 timePast = 2/60;
	 time = 0;
	 clock = 0;
	// backx = 0;
//	 pause = false;
//	 SpacePressed = false;
//	 FPS = 60;
	 frames = 0;
	 NumOfPatterns = 3;
	 coins = [];
	 realCoins = [];
	 coincount = 3;
	//let patterns = [[[]]];
	// ExMarks = [];
 numberOfRockets = 3;
 ExMarkLoaded = 0;
 currentTime = 0;
 //Rockets = [];
 RocketSpeed = 20;
	*/
	
	
	
	/*for(let i = 0; i<NumOfPatterns;i++)
	loadPatterns(i); */
	 bs = Math.floor(Math.random() * 3);
	loadCoins(bs);
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
class Exclamationpoint{
	constructor(x, y, imageSource){
		this.x = x;
		this.y = y;
		this.body = new Image();
		this.body.src = imageSource;
	}
	present = 0; 

}
class Rocket {
	constructor(x, y, imageSource){
		this.x = x;
		this.y = y;
		this.body = new Image();
		this.body.src = imageSource;
	}
	present = 0;
}
class Laser {
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
function ifRandomYes(){
	let x = Math.floor(Math.random() * 180);
	if(x==14){//sm random number
		return 1;
	}
	else return 0;
}


function initBackground(){
	//set backround color of canvas to gray
	
	ctx.fillStyle = 'silver';
	background1 = new MovingBack(0,0, "planetTurkey.png");
}
function clearBackround(){
	
	canvas.parentNode.removeChild(canvas)
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
	document.body.appendChild(canvas);
	

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
	
	}
}
function playerInput2(e){//keyup
	if(e.keyCode == "32"){
		SpacePressed = false;
	
		
	}
}
function loadCoins(y) {
	
for(let i = 0; i<36;i++)
{
	for(let j = 0; j<36;j++)
	{
		if(patterns[y][i][j] == 1)
		{
			
			
			realCoins.push(new Coin(20 * i + 800 + 1280, 20 * j, "coin2.png" ));
		}
		
	}
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
//	console.log(realCoins.length);
	bg.play();
	updateTime();
	updateClock();
	updateMeters();
	TenFrames();
	//MetersRan();
	if(hitted)
	imunTimer();
	if(SpacePressed)
	{
		if(!(hitTop() || pause))
		 {
			 player.y -= 8;
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
	if(ExMarkLoaded == 0)//preveri če je že klicaj
	{
		ex = ifRandomYes();
	}
	
	//updateBackground();
	updateCoin();
	updateRealCoin();
	updateRocket(0);
	checkIfRocketEnd(0);
	realCoinCollison(); 
	rocketCollison(0);
	updateLaser();
	laserCollision();
	if(ex == 1 )
	{
		
		//funkcije ki loada klicaj na playerejv y, funkcija ki jo riše, timer za 0.5 sec, 
		 currentTime = worldClock;
		 ExMarkLoaded = 1;
		
		setExMarkY(0);
		ex = 0;
	}
	if(ExMarkLoaded == 1){
		setExMarkY(0);
		
		
		if(worldClock-currentTime >= 3)
		{
			
			setRocket(0);
			ExMarkLoaded = 0;
			ex = 0;
			ExMarks[0].present = 0;
			ExMarks[1].present = 0;
		}
	}
	//CoinCollison();
	MetersRan();
}
function TenFrames(){
if(TF >= 5)
{
	if(type == 1)
	type = 0;
	else
	type = 1;
	TF = 0;
	return 1;
}
else 
{
	TF++;
	return 0;
}
}
function updateTime(){
	worldClock += 1/60;
}
function checkIfRocketEnd(i){
	if(Rockets[i].x >= 1280){
		Rockets[i].present = 0;
		Rockets[i].x = 0;
		Rockets[i].y = 0;
	}
}
function changeRocketSPeed(){
	RocketSpeed += 0.1;
}
function updateRocket(i){
	if(Rockets[i].present == 1)
	Rockets[i].x += RocketSpeed;
}
function setRocket(i){
		Rockets[i].y = ExMarks[i].y;
		Rockets[i].present = 1;
		rr.play();
	
}
function loadExMark(){
	
	
		ExMarks[0] = new Exclamationpoint(0,player.y,"Klicaj1.png");

	ExMarks[1] = new Exclamationpoint(0,player.y,"Klicaj2.png");
	
	
	
}

function loadRockets(i){
	Rockets[i] = new Rocket(0, ExMarks[i].y, "Raketa.png");
	Rockets[i].present = 0;
}
function setExMarkY(i){
	ExMarks[i].y = player.y;
	ExMarks[i].present = 1;
	ExMarks[i+1].y = player.y;
	ExMarks[i+1].present = 1;
}
function drawExMark(i){
	if(ExMarks[i].present == 1)
	{
		
		buffer.drawImage(ExMarks[type].body, ExMarks[type].x, ExMarks[type].y, 40, 40);
		
	}
}
function drawRocket(i){
	if(Rockets[i].present == 1)
	{
		
		buffer.drawImage(Rockets[i].body, Rockets[i].x , Rockets[i].y, 80, 40);
	}
}
function realCoinCollison(){
	for(let i = 0; i<realCoins.length; i++){

		if(player.x + 20 >= realCoins[i].x && player.x <= realCoins[i].x+20 )
		{
		
			if(player.y <= realCoins[i].y && player.y + 40 >= realCoins[i].y)
			{	
				 cc = document.createElement("audio");
				cc.src = "coin.wav";
				cc.play();
				//cc.pause();
				realCoins.splice(i,1);
				cointotal += 1;
			}
		
		}

	}
}
function rocketCollison(i){
	if(Rockets[i].x + 80 >= player.x && Rockets[i].x <= player.x + 40 ){
		if(Rockets[i].y + 40 >= player.y && Rockets[i].y <= player.y + 40){
			
			if(immunity())
			{
				rh.play();
				loseScreen();
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
	
	if(realCoins[realCoins.length-1].x > 0)
	for(let i = 0; i < realCoins.length; i++){
		
		buffer.drawImage(realCoins[i].body, realCoins[i].x, realCoins[i].y, 20, 20);
		
		
	}
	
}
function updateBackground() {
	
	//background1.x += backx;
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

function updateClock(){
	clock += 1/60;
	

}

function draw () {
	if(gameLOOP){


	frames++;
	
	  if(!pause)
	  {
		  update();
	  }
	  else 
	  {
		cc.pause();
		bg.pause();
		rh.pause();
		rr.pause();
		rez.pause();
	  }
	 
	
	  drawBackground();
	  drawBackground1();
	  //drawCoins();
	  drawRealCoins();
	  drawPlayer();
	 drawExMark(0);
	 drawRocket(0);
	 drawLaser();
	  //drawEnemies();
	  
	 
	  if(background1.x>=3840-1280){
		  backgroundRefresh();
	  }
	  if(clock>=20)
	  {
		  refreshValues();
		  
		  clock = 0;
	  }
	  MetersRan();
	  window.requestAnimationFrame(draw);
	 
	}
	
}

function init () {
	
	document.addEventListener('keydown', playerInput);
	document.addEventListener('keyup', playerInput2);
	gameLOOP = 1;
	document.querySelector(".menu").style.display="none";
	
	//Restart();
	//clearBackround();
	initElements();
	initBackground();
	player = new Player(canvas.width/2, canvas.height-40, "ship2.png");//"https://cdn.onlinewebfonts.com/svg/img_3969.png");
	

	

	backgroundRefresh();
	for(let i =0;i < NumOfPatterns;i++)
	{
		loadPatterns(i);
		
	}
	
	let bs = Math.floor(Math.random() * 3);
	loadCoins(bs);
	loadExMark();
	loadRockets(0);
	loadLasers();
	draw();
	
	
	
}
function loadLasers(){
	let x = Math.floor(Math.random() * 5);
	switch(x){
		case 0: y = 0;
			break;
		case 1: y = 240;
			break;
		case 2: y = 360;
			break;
		case 3: y = 480;
			break;
		case 4: y = 600;
			break;
	}
	Laser1 = new Laser(canvas.width, y, "laser2.png");
}

function drawLaser(){
	buffer.drawImage(Laser1.body, Laser1.x, Laser1.y, 24, 240);
}
function updateLaser(){
	if(Laser1.x <= 0)
	{
		loadLasers();
	}
	else{
		Laser1.x -= backx;
	}
}
function laserCollision(){
	if(player.x + 20 >= Laser1.x && Laser1.x +24 >= player.x ){
		if(player.y + 20 >= Laser1.y && Laser1.y + 240 >= player.y)
		{
			if(immunity() )
			{

				
				ll.play();
				loseScreen();
			}
			
		//	gameLOOP = 0;
		}
	}
}
function updateMeters()
{
	meters += backx/100;
}
function MetersRan(){


ctx.font  = 'bold 25px courier new';
ctx.fillStyle = "white";
meters = roundToTwo(meters);
ctx.rect(canvas.width-235, 10, 225, 100);
ctx.fill();
ctx.fillStyle = "black";
ctx.fillText("meters:" + meters, canvas.width-225, 50);
//ctx.fillText(meters, canvas.width-100, 50);
ctx.fillText("coins:"+cointotal, canvas.width-225, 75);
}
function roundToTwo(num) {    
    return +(Math.round(num + "e+1")  + "e-1");
}
function loseScreen(){
	pause = true;
	bg.pause();
	if(cointotal >= 100)
	{
		document.querySelector(".lose100").style.display="block";
	}
	else 
	{
		document.querySelector(".lose").style.display="block";
		gameLOOP = 0;
	}
	tempscore = meters + (coins * 20);
	if(tempscore > hightscore)
	hightscore = tempscore;
	tempscore = roundToTwo(tempscore);
	hightscore = roundToTwo(hightscore);
	document.getElementById("demo").textContent = "Current score: " + tempscore;
	document.getElementById("demo2").textContent = "High score: " + hightscore;
	document.getElementById("demo3").textContent = "Current score: " + tempscore;
	document.getElementById("demo4").textContent = "High score: " + hightscore;
}
function revive(){
	 imTimmer = 0;
	 hitted = true;
	 rev = 1;
	document.querySelector(".lose100").style.display="none";
	pause = false;
	cointotal -= 100;
	rez.play();
}
function immunity(){
	if(imTimmer >= 60) 
	{
		imTimmer = 0;
		rev = 0;
	
		return 1;
	}
	else if(rev == 0 )
	{
		return 1;
	}
	else
	{
		
		return 0;
	}
}
function imunTimer()
{
	imTimmer++;
	if(imTimmer >= 60)
	hitted = false;
}
function hit(){
	hitted = true;
	
}