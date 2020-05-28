	

	//GAME LOOP important !!!!
	function load_images(){
		
		virus = new Image;
		virus.src = "VIRUS.png";

		playerimage = new Image;
		playerimage.src = "mario1.png";
	
		coinimage = new Image;
		coinimage.src = "coin2.png";

	}

	function init(){

	//dom tree trav,to find element
	canvas = document.getElementById("mycanvas");
	console.log(canvas);

	W = 1700
	H = 500
	console.width = W
	console.height = H

	//canvas things
	pen = canvas.getContext('2d');
	console.log(pen);

	//scores
	score = 0
	game_over = false;

	//draw boxes
	v1 = {
		x: 150,
		y: 10,
		w: 24,
		h: 24,
		speed: 11,
	};
	v2 = {
		x: 220,
		y: 20,
		w: 24,
		h: 24,
		speed: 9,
	};
	v3 = {
		x: 80,
		y: 30,
		w: 24,
		h: 24,
		speed: 12,
	};

	enemy_list = [v1,v2,v3];

	player = {
		x: 10,
		y: 60,
		w: 50,
		h: 50,
		speed: 17,
		moving: "false",
	}

	coin = {
		x: 278,
		y: 70,
		w: 20,
		h: 22,
		//speed: 17,
		//moving: "false",
	}

	//Event Listener
	canvas.addEventListener('mousedown',function(){

		console.log("mouse pressed");
		player.moving = true;
	});

	canvas.addEventListener('mouseup',function(){

		console.log("mouse removed");
		player.moving = false;
	});

	}

	function draw(){
	
	//Clear the screen
	pen.clearRect(0,0,W,H);
    //bring box to screen
	pen.fillStyle = "red";

	//draw player
	pen.drawImage(playerimage,player.x,player.y,player.w,player.h);

	//draw coin
	pen.drawImage(coinimage,coin.x,coin.y,coin.w,coin.h);
	
	for(let i=0;i<enemy_list.length;i++){
	
		pen.drawImage(virus,enemy_list[i].x,enemy_list[i].y,enemy_list[i].w,enemy_list[i].h);
	}

	pen.fillStyle = "white";
	pen.fillText("Score " + score, 10, 10);
	
   }

   function find_collision(b1,b2){

	if(Math.abs(b1.x - b2.x)<= b1.h && Math.abs(b1.y - b2.y)<= b1.y){
		return true;
	}

	return false;
   }

   function update(){

	//collision with corona
	for(let i=0;i<enemy_list.length;i++){

		if( find_collision(enemy_list[i], player)){
			score -= 15;
			if(score < 0){
				game_over = true;
				alert("Game Over ");
			}
		}
	}

	//moving player
	if(player.moving == true){
		player.x += player.speed;
		score += 20;
	}

	if( find_collision(coin,player)){

		game_over = true;
		draw();
		alert("your score " +score);
	}
	
	for(let i=0;i<enemy_list.length;i++){

		enemy_list[i].y += enemy_list[i].speed;

		if(enemy_list[i].y > 120 || enemy_list[i].y < 0){
			enemy_list[i].speed *= -1;
		}
		
	}
	
   }

   function GameLoop(){

//	console.log("In Game Loop");
	if( game_over == true){
		clearInterval(f);
	}

	draw();
	update();
   }

   //game start
   load_images();
   init();
   //keep calling gameloop
   var f = setInterval(GameLoop,100);
 
//  setInterval(GameLoop,100);

	