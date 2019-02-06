window.addEventListener("keydown", moveSnake, false);
var game_over = false;
var snake = new Array(4);
var snakeLen = 4;
var dir = "right";
var food = "";
var level = new Array();
var total_height = 640;
var total_width = 640;
var lvl_width = 20;
var lvl_height = 20;
var speed = 20;

snakeHeadImage = new Image();
snakeHeadImage.src = "resources/head.png";
snakeBodyImage = new Image();
snakeBodyImage.src = "resources/body.png";
snakeTailImage = new Image();
snakeTailImage.src = "resources/tail.png";

//food
foodImage = new Image();
foodImage.src = "resources/food.png";

create_snake();
create_food();

for(i = 0; i < lvl_width; i++)
{
	level[i] = new Array(lvl_height);
	for(var ii = 0; ii < lvl_height; ii++)
	{
		level[i][ii] = -1;
	}
}

window.requestAnimFrame = (function(callback) 
{
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) 
	{
		window.setTimeout(callback, 1000);
	};
})();


var the_date = new Date();
var test1 = the_date.getTime();
var stamp = the_date.getTime() + 250;

function animate() 
{
	the_date = new Date();
	test1 = the_date.getTime();
	if(stamp <= test1)
	{
		move_snake();
		the_date = new Date();
		stamp = the_date.getTime() + 250;
	}
	if(game_over == false)
	{
		// clear
		context.clearRect(0, 0, canvas.width, canvas.height);
		displayText("Score: " + (snakeLen - 4));
		display();
	}
	else
	{
		displayText("Game Over homie");
	}
	//context.drawImage(aniblock, aniblock_x, aniblock_y); 

	// request new frame
	requestAnimFrame(function()
	{
	  animate();
	});
} 

function displayText(what)
{
	context.font = "30px Arial";
	context.fillText(what, 50, 50);
}

function checkSnakeCollide()
{
	if( snake[0].xx == food.xx && snake[0].yy == food.yy )
	{
		create_food();
		return true;
	}
	else
	{
		//if head moving right
		if(dir == "right")
		{
			if(snake[0].xx > lvl_width - 1)
			{
				game_over = true;
			}
		}
		else if(dir == "left")
		{
			if(snake[0].xx < 0)
			{
				game_over = true;
			}
		}
		else if(dir == "up")
		{
			if(snake[0].yy <= -1)
			{
				game_over = true;
			}
		}
		else if(dir = "down")
		{
			if(snake[0].yy >= lvl_height)
			{
				game_over = true;
			}
		}
		
		for(i = 2; i < snakeLen; i++)
		{
			if( (snake[0].xx == snake[i].xx) && (snake[0].yy == snake[i].yy) )
			{
				game_over = true;
				break;
			}
		}
		
		return false;
	}
}

setTimeout(function() {
animate();
}, 1000);

function moveSnake(e) 
{
    switch(e.keyCode) 
	{
        case 37:
			if(dir != "right")
			{
				dir = "left";
			}
            break;
		case 38:
			if(dir != "down")
			{
				dir = "up";
			}
			break;
        case 39:
			if(dir != "left")
			{
				dir = "right"; 
			}			
			break;
        case 40:
			if(dir != "up")
			{
				dir = "down";
			}
            break;  
    }   
}

function checkAllowMove(x, y)
{
	if(x < 32)
	{
		var x_index = 0;
	}
	else
	{
		var x_index = Math.round(x / 32);
	}
	
	if(y < 32)
	{
		var y_index = 19;
	}
	else
	{
		var y_index = (total_height / 32) - Math.round(y / 32);
	}
	
	if(level[x_index][y_index] == -1)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function create_food()
{
	var x = 0;
	var y = 0;
	var recreate = false;
	do
	{
		recreate = false;
		x =  Math.floor((Math.random() * (lvl_width-1)));
		y =  Math.floor((Math.random() * (lvl_height-1)));
		
		for(i = 0; i < snakeLen; i++)
		{
			if( (snake[i].xx == x) && (snake[i].yy == y) )
			{
				recreate = true;
				break;
			}
		}
	}while(recreate == true);
	food = {xx: x, yy: y};
}

function create_snake()
{
	//var x =  Math.floor((Math.random() * (lvl_width-1)));
	//var y =  Math.floor((Math.random() * (lvl_height-1)));
	snake[0] = {xx: 4, yy: 1};
	snake[1] = {xx: 3, yy: 1};
	snake[2] = {xx: 2, yy: 1};
	snake[3] = {xx: 1, yy: 1};
	dir = "right";
}

function move_snake()
{
	var temp_x = 0;
	var temp_y = 0;
	var temp_xx = 0;
	var temp_yy = 0;
	var swap = true;

	//move snake forward
	for(var ii = 0; ii < snakeLen; ii++)
	{		
		if(ii == 0)
		{
			temp_x = snake[ii].xx;
			temp_y = snake[ii].yy;

			//if head moving right
			if(dir == "right")
			{
				snake[0] = {xx: (snake[0].xx + 1), yy: snake[0].yy};
			}
			else if(dir == "left")
			{
				snake[0] = {xx: (snake[0].xx - 1), yy: snake[0].yy};
			}
			else if(dir == "up")
			{
				snake[0] = {xx: snake[0].xx, yy: (snake[0].yy - 1)};
			}
			else if(dir = "down")
			{
				snake[0] = {xx: snake[0].xx, yy: (snake[0].yy + 1)};
			}
			
			if(checkSnakeCollide())
			{
				snake.push({xx: snake[(snake.length-1)].xx, yy: snake[(snake.length-1)].yy});
				snakeLen++;
			}
		}
		else
		{
			if(swap == true)
			{
				temp_xx = snake[ii].xx;
				temp_yy = snake[ii].yy;
				snake[ii] = {xx: temp_x, yy: temp_y};

				swap = false;
			}
			else
			{
				temp_x = snake[ii].xx;
				temp_y = snake[ii].yy;
				snake[ii] = {xx: temp_xx, yy: temp_yy};
				swap = true;
			}
		}
	}

}

function display()
{
	
	for(var i = 0; i < snakeLen; i++)
	{
		if(i == 0)
		{
			switch (dir)
			{
				case "left":
					context.drawImage(snakeHeadImage, (snake[i].xx * 32), (snake[i].yy * 32) ); 
					break;
				case "right":
					drawRotatedImage(snakeHeadImage,(snake[i].xx * 32), (snake[i].yy * 32), 180);
					break;
				case "up":
					drawRotatedImage(snakeHeadImage,(snake[i].xx * 32), (snake[i].yy * 32), 90);
					break;
				case "down":
					drawRotatedImage(snakeHeadImage,(snake[i].xx * 32), (snake[i].yy * 32), 270);
					break;
			}
		}
		else if(i == (snakeLen - 1) )
		{
			//following left
			if(snake[i].xx > snake[i-1].xx)
			{
				context.drawImage(snakeTailImage, (snake[i].xx * 32), (snake[i].yy * 32) ); 
			}
			//following right
			else if(snake[i].xx < snake[i-1].xx)
			{
				drawRotatedImage(snakeTailImage,(snake[i].xx * 32), (snake[i].yy * 32), 180);
			}
			//following up
			else if(snake[i].yy > snake[i-1].yy)
			{
				drawRotatedImage(snakeTailImage,(snake[i].xx * 32), (snake[i].yy * 32), 90);
			}
			//following down
			else if(snake[i].yy < snake[i-1].yy)
			{
				drawRotatedImage(snakeTailImage,(snake[i].xx * 32), (snake[i].yy * 32), 270);
			}
		}
		else
		{
			context.drawImage(snakeBodyImage, (snake[i].xx * 32), (snake[i].yy * 32) ); 
		}

	}
	
	context.drawImage(foodImage, (food.xx * 32), (food.yy * 32) ); 

}

function drawRotatedImage(image, x, y, angle) 
{ 
	var TO_RADIANS = Math.PI/180; 

	// save the current co-ordinate system 
	// before we screw with it
	context.save(); 
 
	// move to the middle of where we want to draw our image
	context.translate(x, y);
 
	// rotate around that point, converting our 
	// angle from degrees to radians 
	context.rotate(angle * TO_RADIANS);
 
	// draw it up and to the left by half the width
	// and height of the image 
	context.drawImage(image, -(image.width/2), -(image.height/2));
 
	// and restore the co-ords to how they were when we began
	context.restore(); 
}