class Scene {
    constructor() {
    }
    load() {
    }

    update(dt) {

    }
    draw(pCtx) {

    }

    keypressed(pKey) {

    }
}
class SceneMenu extends Scene {
    constructor() {
        super();
        this.imgMenu = null;
        this.timerTxt = 0.5;
        this.timerTxt2 = 1;

    }
    load() {
        this.imgMenu = imageLoader.getImage("images/menuImg.jpg");
    }

    update(dt) {
        this.timerTxt -= dt;
        this.timerTxt2 -= dt;
    }
    draw(pCtx) {
        pCtx.drawImage(this.imgMenu, 0, 0);
        pCtx.font = "normal 20px Serif";
        pCtx.fillStyle = "rgb(231, 62, 1)";
        if (this.timerTxt <= 0) {
            pCtx.fillText("WELCOME TO HELL !", 270, HEIGHT / 2 - 50);
        }

        if (this.timerTxt2 <= 0) {
            pCtx.fillText("PRESS ENTER  FOR PLAY!", 260, HEIGHT / 2);
        }
    }

    keypressed(pKey) {
        if (pKey == "Enter") {
            gameScene.load(imageLoader)
            currentScene = gameScene;
        }
    }
}

class SceneGameOver extends Scene {
    constructor() {
        super();
        this.imgEnd = null;

    }
    load(imageLoader) {
        this.imgEnd = imageLoader.getImage("images/endImg.jpg");
    }

    update(dt) {
        super.update(dt);
    }

    draw(pCtx) {
        pCtx.drawImage(this.imgEnd, 0, 0);
        pCtx.font = "normal 20px Serif";
        pCtx.fillText("YOU ARE DEAD", 300, 150);
    }
    keypressed(pKey) {
        if (pKey == "Enter") {
            gameScene.load(imageLoader)
            currentScene = sceneMenu;
            startGame();
        }
    }
}

class SceneGameWin extends Scene {
    constructor() {
        super();
        this.imgEnd = null;

    }
    load(imageLoader) {
        this.imgEnd = imageLoader.getImage("images/endImg.jpg");
    }

    update(dt) {
        super.update(dt);
    }

    draw(pCtx) {
        pCtx.drawImage(this.imgEnd, 0, 0);
        pCtx.font = "normal 20px Serif";
        pCtx.fillText("VICTORY", 300, 150);
    }
    keypressed(pKey) {
        if (pKey == "Enter") {
            gameScene.load(imageLoader)
            currentScene = sceneMenu;
            startGame();
        }
    }
}