const canvas=document.getElementById("canvas");

const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;



let particles=[];
let flowers=[];



// sparkles

class Particle{

constructor(){

this.x=Math.random()*canvas.width;

this.y=Math.random()*canvas.height;

this.size=Math.random()*2;

this.speed=Math.random()*0.5;

}



update(){

this.y-=this.speed;

if(this.y<0){

this.y=canvas.height;

this.x=Math.random()*canvas.width;

}

}



draw(){

ctx.fillStyle="#00BFFF";

ctx.shadowColor="#00BFFF";

ctx.shadowBlur=10;

ctx.beginPath();

ctx.arc(this.x,this.y,this.size,0,6.28);

ctx.fill();

}

}



// flower petal

class Flower{

constructor(x,y){

this.x=x;

this.y=y;

this.size=0;

this.maxSize=20;

this.angle=Math.random()*6.28;

}



update(){

if(this.size<this.maxSize)

this.size+=0.3;

}



draw(){

ctx.save();

ctx.translate(this.x,this.y);

ctx.rotate(this.angle);



ctx.fillStyle="#00BFFF";

ctx.shadowColor="#00BFFF";

ctx.shadowBlur=20;



for(let i=0;i<6;i++){

ctx.beginPath();

ctx.moveTo(0,0);

ctx.quadraticCurveTo(

this.size/2,

-this.size/2,

0,

-this.size

);

ctx.quadraticCurveTo(

-this.size/2,

-this.size/2,

0,

0

);

ctx.fill();

ctx.rotate(6.28/6);

}



ctx.restore();

}

}



// heart shape math

function createHeart(){

let centerX=canvas.width/2;

let centerY=canvas.height/2;



for(let t=0;t<6.28;t+=0.1){

let x=16*Math.pow(Math.sin(t),3);

let y=-(

13*Math.cos(t)

-5*Math.cos(2*t)

-2*Math.cos(3*t)

-Math.cos(4*t)

);



flowers.push(

new Flower(

centerX+x*20,

centerY+y*20

)

);

}

}



// create sparkles

for(let i=0;i<200;i++)

particles.push(new Particle());



createHeart();




// animation

function animate(){

ctx.fillStyle="rgba(0,0,0,0.2)";

ctx.fillRect(0,0,canvas.width,canvas.height);



particles.forEach(p=>{

p.update();

p.draw();

});



flowers.forEach(f=>{

f.update();

f.draw();

});



requestAnimationFrame(animate);

}



animate();
