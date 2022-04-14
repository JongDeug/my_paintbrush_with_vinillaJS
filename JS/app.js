const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext('2d');

let painting;
let filling;

function setDefaultCanvas(){
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2.5;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    painting = false;
    filling = false;
}

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function setColor(){
    const canvasColor = document.querySelectorAll("#jsColors .color");
    if(canvasColor){
        canvasColor.forEach(element => {
            element.addEventListener("click", superEventHandler.clickColorHandler);
        })
    }else{
        console.log("error");
    }
}

function setLineWidth(){
    const range = document.querySelector("#jsRange");
    if(range){
        range.addEventListener("input", superEventHandler.inputRangeHandler);
    }else{
        console.log("error");
    }
}

function setMode(){
    const mode = document.querySelector("#jsMode");
    if(mode){
        mode.addEventListener("click", superEventHandler.clickModeHandler);
    }
}

function saveImg(){
    const save = document.querySelector("#jsSave");
    if(save){
        save.addEventListener("click", superEventHandler.clickSaveHandler);
    }
}

const superEventHandler = {
    // canvas mouse move
    mousemoveOnCanvasHandler : function(e){
        const x = e.offsetX;
        const y = e.offsetY;

        // if you aren't painting 
        if(!painting){
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
        else if(!filling){
            ctx.lineTo(x, y);
            ctx.stroke(); // draw
        }
    },
    // canvas mouse leave
    mouseleaveOnCanvasHandler : function(e){
        stopPainting(); // stop
    },
    // canvas mouse down
    mousedownOnCanvasHandler : function(e){
        startPainting(); // start
        if(filling){ctx.fillRect(0,0, canvas.width, canvas.height);} // fill color on the canvas
    },
    // canvas mouse up
    mouseupOnCanvasHandler : function(e){
        stopPainting(); // stop
    },
    // canvas mouse right click
    contextmenuOnCanvasHandler : function(e){
        e.preventDefault();
    },
    

    // click color
    clickColorHandler : function(e){
        const color = e.target.style.backgroundColor;
        ctx.strokeStyle = color; // set #jsColors
        ctx.fillStyle = color;
    },
    // set range for line width 
    inputRangeHandler : function(e){
        ctx.lineWidth = e.target.value; //set line width
    },
    // set mode(fill or paint)
    clickModeHandler : function(e){
        if(filling === false){
            filling = true;
            e.target.innerText = "paint";
            console.log(filling);
        }else{
            filling = false;
            e.target.innerText = "fill";
            console.log(filling);
        }
    },
    // save img
    clickSaveHandler : function(e){
        const a = document.createElement("a");
        a.href = canvas.toDataURL();
        a.download = "image/png";
        a.click();
    }
};

canvas.addEventListener("mousemove", superEventHandler.mousemoveOnCanvasHandler);
canvas.addEventListener("mouseleave", superEventHandler.mouseleaveOnCanvasHandler);
canvas.addEventListener("mousedown", superEventHandler.mousedownOnCanvasHandler);
canvas.addEventListener("mouseup", superEventHandler.mouseupOnCanvasHandler);
canvas.addEventListener("contextmenu", superEventHandler.contextmenuOnCanvasHandler);
setDefaultCanvas();
setColor();
setLineWidth();
setMode();
saveImg();