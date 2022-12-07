let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let cellSize = 50;
let snakeCells = [[0,0],[50,0]];


let boardwidth = 1000;
let boardheight =600;
let score=0;

let foodCells=generateRandomCoords();
let direction='right';   //we change direction on basis of this variable
let gameOver=false;       // to game over 


let intervalId=setInterval(function()
{
    update();
    draw();
},100);

document.addEventListener('keydown',function(event)
{
   //console.log(event);
   if(event.key==='ArrowDown'){
    direction='down';
   }else if(event.key==='ArrowUp'){
    direction='up';
   }else if(event.key==='ArrowLeft'){
    direction='left';
   }else{
    direction='right';
   }
})

function update()
{
    let headX = snakeCells[snakeCells.length-1][0];
    let headY = snakeCells[snakeCells.length-1][1];

    // let newheadX = headX + cellSize;
    // let newheadY = headY;
     let newheadX;
     let newheadY;
     if(direction==='right'){
        newheadX=headX+cellSize;
        newheadY=headY;
        if(newheadX===boardwidth){
         gameOver=true;
        }
     }else if(direction==='down'){
        newheadX=headX;
        newheadY=headY+cellSize;
        if(newheadY===boardheight){
         gameOver=true;
        }
     }else if(direction==='up'){
        newheadX=headX;
        newheadY=headY-cellSize;
        if(newheadY<0){
         gameOver=true;
        }
     }else{
        newheadX=headX-cellSize;
        newheadY=headY;
        if(newheadX<0){
         gameOver=true;
        }
     }
     snakeCells.push([newheadX,newheadY]);
     if(newheadX==foodCells[0] && newheadY==foodCells[1]){
      foodCells=generateRandomCoords();
      score+=1;
     }else{
      snakeCells.shift();
     }
}


function draw()
{
   if(gameOver===true){
      clearInterval(intervalId);
      ctx.fillStyle='red';
      ctx.font='50px sans-serif';
      ctx.fillText('Game Over!!',400,200);
      return;
   }
    ctx.clearRect(0,0,boardwidth,boardheight);
    //snake draw 
    for(let i=0;i<snakeCells.length;i++)
    {
      if(i===snakeCells.length-1){
        ctx.fillStyle = 'white';
        ctx.fillRect(snakeCells[i][0],snakeCells[i][1],cellSize,cellSize);
        ctx.strokeStyle='white';
        ctx.strokeRect(snakeCells[i][0],snakeCells[i][1],cellSize,cellSize);
    }else{
      ctx.fillStyle = 'black';
        ctx.fillRect(snakeCells[i][0],snakeCells[i][1],cellSize,cellSize);
        ctx.strokeStyle='white';
        ctx.strokeRect(snakeCells[i][0],snakeCells[i][1],cellSize,cellSize);
    }
   }

    //food draw
   ctx.fillStyle='red';
   ctx.fillRect(foodCells[0],foodCells[1],cellSize,cellSize);

   //score draw
   ctx.font='24px sans-serif';
   ctx.fillStyle='black';
   ctx.fillText(`score:${score}`,10,40);
}

function generateRandomCoords(){
   return[
      Math.round(Math.random()*(boardwidth-cellSize)/cellSize)*cellSize,
      Math.round(Math.random()*(boardheight-cellSize)/cellSize)*cellSize,
   ]
}