let imageLoader = new ImageLoader();
let gameReady = false;
let sceneMenu = new SceneMenu();
let gameScene = new GameScene();
let gameWin = new SceneGameWin();
let gameOver = new SceneGameOver();

let currentScene = sceneMenu;

let spritePlayer;
let spriteWizard;

let Keyboard = [];

function toucheEnfoncee(t) {
    t.preventDefault();
    if (Keyboard[t.code] == false || Keyboard[t.code] == null) {
        currentScene.keypressed(t.code);
    }
    Keyboard[t.code] = true;
}

function toucheRelachee(t) {
    t.preventDefault();
    Keyboard[t.code] = false;
}

function load() {
    document.addEventListener("keydown", toucheEnfoncee, false);
    document.addEventListener("keyup", toucheRelachee, false);

    // Sprites
    imageLoader.add("images/Archer.png");
    imageLoader.add("images/Wizard.png");

    // Background
    imageLoader.add("images/Hell.png");
    // Images Scenes
    imageLoader.add("images/menuImg.jpg");
    imageLoader.add("images/endImg.jpg");

    // Armes
    imageLoader.add("images/Arrow.png");
    imageLoader.add("images/Sword.png");
    imageLoader.add("images/Boll.png");

    imageLoader.start(startGame);
}

function startGame() {

    console.log("Start Game");

    lstSprites = [];

    currentScene.load(imageLoader);

    gameReady = true;

}

function update(dt) {

    if (!gameReady) {
        return;
    }

    // SCENE DE JEU
    currentScene.keyboard = Keyboard;
    currentScene.update(dt);
}

function draw(pCtx) {

    if (!gameReady) {
        let ratio = imageLoader.getLoadedRatio();
        pCtx.fillStyle = "rgb(255,255,255)";
        pCtx.fillRect(1, 1, 400, 100);
        pCtx.fillStyle = "rgb(0,255,0)";
        pCtx.fillRect(1, 1, 400 * ratio, 100);

        return;
    }

    currentScene.draw(pCtx);
};
