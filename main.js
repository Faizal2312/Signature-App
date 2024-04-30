let myCanvas = document.getElementById("myCanvas");
// myCanvas.width = window.innerWidth-250;
// myCanvas.height = 280;
let ctx = myCanvas.getContext('2d');
let canvasColor = document.getElementById("canvasColor");
let line_width = '2';
let width = document.getElementById('width');
let penColor = document.getElementById("penColor");
// console.log(penColor);
// console.log(width.value);
ctx.fillStyle='white';
ctx.fillRect(0,0,500,250);


let line_color = "black";
penColor.addEventListener('change',(e)=>{
    line_color = e.target.value;
    console.log(e.target.value);
    

})

width.addEventListener('change',(e)=>{
    line_width = e.target.value;
    console.log(e.target.value);
})    

canvasColor.addEventListener('change',(e)=>{
    // console.log(e.target.value);
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,500,250);
})

myCanvas.addEventListener("mousedown",start,false);
myCanvas.addEventListener("touchstart",start,false);
myCanvas.addEventListener("touchmove",draw,false);

myCanvas.addEventListener("mousemove",draw,false);
myCanvas.addEventListener('touchend',stop,false);
myCanvas.addEventListener('mouseup',stop,false);
myCanvas.addEventListener("mouseout",stop,false);

let isDrawing = false;

function start(event){
    isDrawing = true;
    // console.log(event.offsetX);
    // console.log(event.offsetY); 
    ctx.beginPath();
    ctx.moveTo(event.offsetX,event.offsetY);

    
}


function draw(event){
    if(isDrawing)
   { ctx.lineTo(event.offsetX,event.offsetY);
    ctx.strokeStyle = line_color;
        ctx.lineWidth = line_width;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
                ctx.stroke();}

}

function stop(event){
    if(isDrawing){
        ctx.stroke();
        ctx.closePath();
        isDrawing = false;
    }
}


let clear = document.getElementById("clear");
clear.addEventListener("click",(e)=>{
    ctx.fillStyle = 'white';
    ctx.clearRect(0,0,500,250);
    ctx.fillRect(0,0,500,250);
})

let save = document.getElementById('save');
save.addEventListener('click',(e)=>{
    localStorage.setItem('canvasContents',myCanvas.toDataURL());
    let link = document.createElement('a');
    link.download = 'my-Sign.png';
    link.href = myCanvas.toDataURL();
    link.click();
})

let retrieve = document.getElementById('retrieve');
retrieve.addEventListener('click',()=>{
    let saved = localStorage.getItem('canvasContents');
    let img = new Image();
    img.src = saved;
    ctx.drawImage(img,0,0);
})