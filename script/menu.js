
document.addEventListener("DOMContentLoaded", function () {

})

//touch and scrool pages
document.addEventListener('wheel', ProjectScreen);
document.addEventListener('touchstart',handleTouchStart);
document.addEventListener('touchend',handleTouchEnd);

let direction='down'
const touch={
    startX:0,
    startY:0,
    dx:0,
    dy:0,
}
function handleTouchStart(e){
    const t=e.changedTouches[0];
    touch.startX=t.pageX
    touch.startY=t.pageY
}

function handleTouchEnd(e){
    const t = e.changedTouches[0];
    touch.dx=t.pageX-touch.startX;
    touch.dy=t.pageY-touch.startY;
    if (touch.dy>10) direction='up'
    if (touch.dy<-10) direction='down'
    handleDirection()
}

function handleDirection(){
    if (direction==='down'){
        console.log("down")
    }
    if (direction==='up'){
        console.log("up")
    }
}

function ProjectScreen(e){
    if (e.deltaY > 0) {
        gsap.to(".projectScreen", { opacity: 0, duration: 1 });
    } else {
        gsap.to(".projectScreen", { opacity: 1, duration: 1 });
    }
}
