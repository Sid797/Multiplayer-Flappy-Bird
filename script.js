let canvas = document.getElementById('gamescreen');
let ctx = canvas.getContext('2d');
let frames=0;
//background
//image load
let img=new Image();
img.src="sprite.png";
//making cloud appear(Improve this code!!)
let cloud={
    sX:0,
    sY:0,
    w:275,
    h:220,
    x:0,
    y:canvas.height-220,
    draw:function(){

        ctx.drawImage(img,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
        ctx.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+this.w,this.y,this.w,this.h);
        ctx.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+2*this.w,this.y,this.w,this.h);
        ctx.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+3*this.w,this.y,this.w,this.h);
        ctx.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+4*this.w,this.y,this.w,this.h);
        ctx.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+5*this.w,this.y,this.w,this.h);
    }
}

// State object
const state={
    current:0,
    ready:0,
    game:1,
    gameOver:2,
}
// event
canvas.addEventListener("click",function(){
    switch(state.current){
        case state.ready:state.current=state.game;
        break;
        case state.game:bird.move();
        break;
        case state.gameOver:state.current=state.ready;
        pipe.reset();
        score.reset();
        break;
    }
})
// Starting state
const ready={
    sX:0,
    sY:228,
    w:173,
    h:152,
    x:canvas.width/2-(173/2),
    y:200,
    draw:function(){
        if (state.current==state.ready) {        
        ctx.drawImage(img,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
    }}
}

// game over state
const gameOver={
    sX: 175,
    sY: 228,
    w: 225,
    h: 202,
    x: canvas.width / 2 - (202 / 2),
    y: 200,
    draw: function() {
        if (state.current == state.gameOver) {
            ctx.drawImage(img, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
}


// making Ground(Imrpove this code)
let ground={
    sX:276,
    sY:0,
    w:224,
    h:112,
    x:0,
    y:canvas.height-112,
    dx:3,
    draw:function(){
        ctx.drawImage(img,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
        ctx.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+this.w,this.y,this.w,this.h);
        ctx.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+2*this.w,this.y,this.w,this.h);
        ctx.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+3*this.w,this.y,this.w,this.h);
        ctx.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+4*this.w,this.y,this.w,this.h);
        ctx.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+5*this.w,this.y,this.w,this.h);
        ctx.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+6*this.w,this.y,this.w,this.h);
        ctx.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+7*this.w,this.y,this.w,this.h);

    },
    update:function(){
        if (state.current==state.game) {
        this.x=this.x-this.dx;
        // to make the ground loop forever,224/2=112
        if(this.x%112==0){
            this.x=0;
        }
        
    }}
}

// Making the bird
const bird={
    animation:[
        // extractingbird images from the main sprite.png
        {sX:276,sY:112}, //1st bird
        {sX:276,sY:139}, //2nd bird
        {sX:276,sY:164},  //3rd bird
        {sX:276,sY:139}   //2nd bird again
    ],
    x:50,
    y:150,
    w:34,
    h:26,
    frame:0,
    // control the speed of the flapping by increasing or decreasing period
    period:10,
    speed:0,
    gravity:0.20,
    jump:4, 
    radius:13,


    draw:function(){
        // draw the bird
        let bird=this.animation[this.frame];
        ctx.drawImage(img,bird.sX,bird.sY,this.w,this.h,this.x-this.w/2,this.y-this.h/2,this.w,this.h);
    },
    update:function(){
        // to flap the wings
        this.frame+=frames%this.period==0 ? 1:0;
        // to make it reset
        this.frame=this.frame%this.animation.length;
        // !!GRAVITY!!
        if (state.current==state.ready) {
            this.y=150;
        } else {
            this.y=this.y+this.speed;
            this.speed=this.speed+this.gravity;    
        }
        if (this.y+this.h/2 >=canvas.height-ground.h) {
            this.speed=0;  
            this.frame=0;
            state.current=state.gameOver;         
        }
    },
    move:function(){
       this.speed=-this.jump;
    }
}

// PIPE drawing
const pipe={
    position:[],
    top:{
        sX:553,
        sY:0
    },
    bottom:{
        sX:502,
        sY:0
    },
    w:51,
    h:400,
    gap:120,
    maxYPos:-150,
    dx:10,
    draw:function(){
        for (let i = 0; i < this.position.length; i++) {
            let p=this.position[i];
            let topYpos=p.y;
            let bottomYpos=p.y+this.h+this.gap;
            // draw the top pipe
            ctx.drawImage(img,this.top.sX,this.top.sY,this.w,this.h,p.x,topYpos,this.w,this.h);
            // draw the botom pipe
            ctx.drawImage(img,this.bottom.sX,this.bottom.sY,this.w,this.h,p.x,bottomYpos,this.w,this.h);
        }    
    },
    update:function(){
        if (state.current!=state.game) {
            return;
        }
        if(frames%50==0){
            this.position.push({
                x:canvas.width,
                y:this.maxYPos*(Math.random()+1)
             } );
        }
    for (let i = 0; i < this.position.length; i++) {
        let p=this.position[i];
        p.x=p.x-this.dx;
        // for removing the pipers from the array
        if (p.x+this.w<=0) {
            this.position.shift();
            score.value+=1;
            score.bestScore=Math.max(score.value,score.bestScore);
            localStorage.setItem("high",score.bestScore);
        }
        // collision detection
        // for top pipe
        if (bird.x+bird.radius>p.x && bird.x-bird.radius<p.x+this.w && bird.y+bird.radius>p.y&& bird.y-bird.radius<p.y+this.h
           ) {
            state.current=state.gameOver;
        }
        // for bottom pipe
        let topOfBottomPipe=p.y+this.h+this.gap;
        let bottomOfBottomPipe=p.y+this.h+this.gap+this.h;

        if (bird.x+bird.radius>p.x && bird.x+bird.radius<p.x+this.w && bird.y+bird.radius>topOfBottomPipe&&bird.y-bird.radius<bottomOfBottomPipe
 ) {
                state.current=state.gameOver;
        }
    }
    },
    reset:function(){
        this.position=[];
    }

}

// score tracker object
const score={
    bestScore: parseInt(localStorage.getItem("high")) || 0,
    value:0,
    scoreWord:"SCORE:",
    highScore:"HIGH SCORE!!",
    draw:function(){
        ctx.fillStyle = "white";
        ctx.font = "30px teko";
        if (this.value>=this.bestScore && state.current==state.game) {
            ctx.fillText(this.highScore, canvas.width - 200, 70);
        }
        if (state.current == state.game) {
            ctx.fillText(this.value, canvas.width - 40, 40);
            ctx.fillText(this.scoreWord, canvas.width - 150, 40);
        } else if (state.current == state.gameOver) {
            ctx.font = "25px teko";
            ctx.fillText(this.value, canvas.width / 2 + 75, 293);
    
            ctx.font = "25px teko";
            ctx.fillText("" + this.bestScore, canvas.width / 2 + 70, 340);
        }
        
    },
    reset:function(){
        this.value=0;
    }
}

// drwaing the img
function draw(){
    //draw the blue background
    ctx.fillStyle="#70c5ce";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    // draw the cloud
    cloud.draw();

    pipe.draw();

    

    // draw the ground
    ground.draw();
// draw the bird
    bird.draw();
    // draw the game over object
    gameOver.draw();

    score.draw();

    // draw the startin state
    ready.draw();
}

// update function
function update(){
    ground.update();
    bird.update();
    pipe.update();
}
// main function that loops through everything
function loop(){
    draw();
    update();
    frames++;
    requestAnimationFrame(loop);
}
loop();


