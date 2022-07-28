function rnd(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min;
}

function DrawCircle(pCtx, pX, pY, pR) {
    pCtx.beginPath();
    pCtx.strokeStyle = "red"
    pCtx.arc(pX, pY, pR, 0, 2 * Math.PI);
    pCtx.fillStyle = "yellow";
    pCtx.fill();
    pCtx.stroke();
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

// check collision entre 2 objets
function checkCollision(o1, o2) {
    let margeX = 100;
    let margeY = 30;
    if (o1.x < o2.x + (o2.width - margeX) &&
        o1.x + (o1.width - margeX) > o2.x &&
        o1.y < o2.y + (o2.height - margeY) &&
        (o1.height - margeY) + o1.y > o2.y) {
        return true;
    }
    else return false;
}

function sound(src, volume, loop) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.volume = volume;
    this.sound.loop = loop
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.currentTime = 0;
        this.stop();
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
        this.sound.currentTime = 0;
        this.sound.play().catch(function (e) {
            console.log('There was an error', e);
        });
    }
}

function angle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
}

