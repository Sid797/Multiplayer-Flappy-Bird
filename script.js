let canvas = document.getElementById('gamescreen');
let ctx = canvas.getContext('2d');
let frames=0;
//background
//image load
let img=new Image();
img.src="sprite.png";
//making cloud appear(IMprove this code!!)
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
        this.x=this.x-this.dx;
        // to make the ground loop forever,224/2=112
        if(this.x%112==0){
            this.x=0;
        }
    }
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
    period:5,

    draw:function(){
        // draw the bird
        let bird=this.animation[this.frame];
        ctx.drawImage(img,bird.sX,bird.sY,this.w,this.h,this.x,this.y,this.w,this.h);
    },update:function(){
        // to flap the wings
        this.frame+=frames%this.period==0 ? 1:0;
        this.frame=this.frame%this.animation.length;

    }
}

// drwaing the img
function draw(){
    //draw the blue background
    ctx.fillStyle="#70c5ce";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    // draw the cloud
    cloud.draw();
    // draw the ground
    ground.draw();
// draw the bird
    bird.draw();
}
// update function
function update(){
    ground.update();
    bird.update();
}
// main function that loops through everything
function loop(){
    draw();
    update();
    frames++;
    requestAnimationFrame(loop);
}
loop();




