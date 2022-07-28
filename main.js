let canvas_Game = document.getElementById("canvas_Game");
let ctx = canvas_Game.getContext("2d");

let canvas_Infos = document.getElementById("canvas_Infos");
let ctx2 = canvas_Infos.getContext("2d");
ctx2.fillStyle = "rgb(200,260,0)";
ctx2.font = "normal 12px Serif";
ctx2.fillText("Credits :", 90, 20);
ctx2.fillText("Images :", 5, 50);
ctx2.fillText("Menu image : unkown ", 5, 80);
ctx2.fillText("End image :", 5, 110);
ctx2.fillText("Marco Allasio on Pexels.com", 5, 130);
ctx2.fillText("Background : unknown", 5, 160);
ctx2.fillText("Spritesheet : 2D FANTASY ELF FREE ", 5, 190);
ctx2.fillText("CHARACTER SPRITE on Craftpix.net", 5, 210);
ctx2.fillText("Music Game :", 5, 240);
ctx2.fillText("Guifrog - Beyond The Warrior on Auboutdufil.com", 5, 260);
ctx2.fillText("Sound Player Hurt :", 5, 290);
ctx2.fillText("https://universal-soundbank.com/sounds/11650.mp3", 5, 300);
ctx2.fillText("Sound Wizard Hurt :", 5, 320);
ctx2.fillText("https://universal-soundbank.com/sounds/497.mp3", 5, 330);
ctx2.fillText("Sound Arrow :", 5, 350);
ctx2.fillText("https://universal-soundbank.com/sounds/23183.mp3", 5, 360);
ctx2.fillText("Sound Magic attack :", 5, 380);
ctx2.fillText("https://universal-soundbank.com/sounds/844.mp3", 5, 390);
ctx2.fillText("If you're the owner of any contents ", 40, 420);
ctx2.fillText("and/or don't wish them to be used here, ", 35, 430)
ctx2.fillText("please let me know.", 30, 440);
ctx2.fillText("ENJOY THIS GAME :) ", 50, 480);

let interval;
let fps = 0;

let derniereUpdate = Date.now();

var WIDTH = canvas_Game.width;
canvas_Game.width = WIDTH;
var HEIGHT = canvas_Game.height;
canvas_Game.height = HEIGHT;


function showFPS() {

    ctx.fillText(Math.floor(fps) + " fps", 10, 20);
}

function run() {

    let maintenant = Date.now();
    let dt = (maintenant - derniereUpdate) / 1000;
    fps = 1 / dt;
    derniereUpdate = maintenant;
    update(dt);
    ctx.clearRect(0, 0, canvas_Game.width, canvas_Game.height);
    draw(ctx);
    showFPS();

}

function init() {

    load();
    interval = setInterval(run, 1000 / 60);
}

init();