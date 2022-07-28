
class GameplayService {
    constructor() {
        this.canvas_Game = null;
        this.canvas_Infos = null;
        this.weaponsManager = null;
        this.wavesManager = null;
        this.scrollingBackground = null;
        this.player = null;

    }

    setCanvas_Game(pCanvas_Game) {
        this.canvas_Game = pCanvas_Game;
    }
    setCanvas_Infos(pCanvas_Infos) {
        this.canvas_Infos = pCanvas_Infos;
    }
    setWeaponsManager(pWeaponsManager) {
        this.weaponsManager = pWeaponsManager;
    }

    setWavesManager(pWaveManager) {
        this.wavesManager = pWaveManager;
    }
    setScrollingBackground(pScrollingBackground) {
        this.scrollingBackground = pScrollingBackground;
    }

    setPlayer(pPlayer) {
        this.player = pPlayer;
    }
}

class GameScene extends Scene {
    constructor() {
        super();
        this.keyboard = null;
        this.imageLoader = null;
        this.imgBackground = null;
        this.gameMenu = false;
        this.score = 0;

        // SONS 
        this.sndArrow = new Audio("Sounds/flèche.mp3");
        this.sndHurt = new Audio("Sounds/Aie.mp3")
        this.sndHurt2 = new Audio("Sounds/douleur.mp3")

        this.musicGame = new Audio("Sounds/Guifrog-BeyondTheWarriors.mp3")

        this.musicGame.volume = 0.01;
        this.sndArrow.volume = 0.05;
        this.sndHurt.volume = 0.05;
        this.sndHurt2.volume = 0.05;

        if (gameReady == true) {
            currentScene = gameScene
            this.musicGame.play();
        }

        this.CinderParticlesEmitter = new CinderParticlesEmitter(0, 0);
        this.shotSpeed = 1.35;
        this.shotTimer = 0;
        this.timerSound = 0;

        this.gameplayService = new GameplayService();
        this.weaponsManager = new WeaponsManager()
        this.wavesManager = new WavesManager(this.gameplayService);

        this.gameplayService.setCanvas_Game(canvas_Game);
        this.gameplayService.setCanvas_Infos(canvas_Infos);
        this.gameplayService.setWavesManager(this.wavesManager);
        this.gameplayService.setWeaponsManager(this.weaponsManager);
    }

    load(pImageLoader) {

        this.imageLoader = pImageLoader;
        this.imgBackground = this.imageLoader.getImage("images/Hell.png");
        this.background = new ScrollingBackground(this.imgBackground);
        this.background.speed = 3;
        this.player = new Player(5, 250);
        this.gameplayService.setPlayer(this.player);


        // Ennemy
        let imgWizard = imageLoader.getImage("images/Wizard.png");
        spriteWizard = new Sprite(imgWizard);
        spriteWizard.setTileSheet(200, 150);
        spriteWizard.addAnimation("ATTACK", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0.1);
        spriteWizard.addAnimation("DIE", [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 0.1);
        spriteWizard.addAnimation("HURT", [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 0.1);
        spriteWizard.addAnimation("IDLE", [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 0.1);
        spriteWizard.addAnimation("JUMP", [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 0.1);
        spriteWizard.addAnimation("RUN", [50, 51, 52, 53, 54, 55, 56, 57, 58, 59], 0.1);
        spriteWizard.addAnimation("WALK", [60, 61, 62, 63, 64, 65, 66, 67, 68, 69], 0.1);
        spriteWizard.startAnimation("IDLE");

        this.wavesManager.addWave(new EnnemyWave(spriteWizard, 2, 0.5, 200, 940, 100));
        this.wavesManager.addWave(new EnnemyWave(spriteWizard, 2, 0.5, 200 + 4000, 940, 120));
        // this.wavesManager.addWave(new EnnemyWave(spriteWizard, 2, 0.5, 200 + 10500, 940, rnd(0, 800)));
        // this.wavesManager.addWave(new EnnemyWave(spriteWizard, 2, 0.5, 200 + 16500, 940, rnd(0, 800)));

    }

    update(dt) {
        this.background.update(dt);
        this.wavesManager.update(dt, this.background.distance);
        this.CinderParticlesEmitter.x = rnd(1, 200);
        this.CinderParticlesEmitter.y = rnd(1, 100);
        this.CinderParticlesEmitter.addCinder();
        this.CinderParticlesEmitter.update(dt);
        this.weaponsManager.update(dt);
        this.score + 1;

        //GESTION DES TOUCHES
        if (this.keyboard["ArrowDown"] && this.player.y < HEIGHT - (this.player.spritePlayer.tileSize.y - 25)) {
            this.player.y += 2;
            this.player.spritePlayer.startAnimation("WALK");
            if (this.player.spritePlayer.stateAnimation.end == true) {
                this.player.spritePlayer.startAnimation("IDLE");
            }
        }
        if (this.keyboard["ArrowUp"] && this.player.y >= -40) {
            this.player.y -= 2;
            this.player.spritePlayer.startAnimation("WALK");
            if (this.player.spritePlayer.stateAnimation.end == true) {
                this.player.spritePlayer.startAnimation("IDLE");
            }
        }
        if (this.keyboard["ArrowRight"]) {
            this.player.x += 2;
            this.player.spritePlayer.startAnimation("WALK");
            if (this.player.spritePlayer.stateAnimation.end == true) {
                this.player.spritePlayer.startAnimation("IDLE");
            }
        }
        if (this.keyboard["ArrowLeft"] && this.player.x >= -70) {
            this.player.x -= 2;
            this.player.spritePlayer.startAnimation("WALK");
            if (this.player.spritePlayer.stateAnimation.end == true) {
                this.player.spritePlayer.startAnimation("IDLE");
            }
        }
        if (this.keyboard["Space"]) {
            if (this.shotTimer <= 0) {
                let position = this.player.getShotPosition(36);
                this.weaponsManager.shoot(position.x, position.y, this.player.vx, this.player.vy, "PLAYER");
                this.shotTimer = this.shotSpeed;
                if (this.timerSound <= 0) {
                    this.sndArrow.play();
                }
            }
            this.player.spritePlayer.startAnimation("ATTACK");
            if (this.player.spritePlayer.stateAnimation.end == true) {
                this.player.spritePlayer.startAnimation("IDLE");
            }
        }
        // TIMER DE TIR
        if (this.shotTimer > 0) {
            this.shotTimer -= dt;
        }
        this.player.update(dt);

        // SUPPRESION TIRS HORS ECRAN
        for (let index = this.weaponsManager.lstWeapons.length - 1; index >= 0; index--) {
            const weapon = this.weaponsManager.lstWeapons[index];
            weapon.update(dt);
            if (weapon.outOfScreen(WIDTH, HEIGHT)) {
                this.weaponsManager.lstWeapons.splice(index, 1);
                console.log("Suppression d'un projectile hors écran");
            }
            else {
                // CHECK COLLISION SI PROJECTILE TOUCHE 
                let lstEnnemys = this.wavesManager.currentWave.ennemyList;
                for (let indexEnnemy = lstEnnemys.length - 1; indexEnnemy >= 0; indexEnnemy--) {
                    const ennemy = lstEnnemys[indexEnnemy].sprite
                    // CHECK COLLISION ENNEMI
                    if (checkCollision(weapon, ennemy) && weapon.friendly == true) {
                        ennemy.startAnimation("HURT");
                        if (this.timerSound <= 0) {
                            this.sndHurt2.play();
                        }
                        this.weaponsManager.lstWeapons.splice(index, 1)
                        ennemy.life--;
                        this.score++;
                        if (ennemy.life <= 0) {
                            console.log("longueur de la liste avant suppression ennemi", this.wavesManager.wavesList.length)
                            lstEnnemys.splice(indexEnnemy, 1);
                            console.log("Suppression ennemi tué")
                            console.log("longueur de la liste après suppression ennemi", this.wavesManager.wavesList.length)
                            // this.wavesManager.wavesList.splice(index, 1);
                            if (this.wavesManager.currentWave == 0 && lstEnnemys == 0) {
                                this.musicGame.pause();
                                gameWin.load(imageLoader)
                                currentScene = gameWin;
                            }
                        }
                    }

                }
                // CHEK COLLISION PLAYER
                if (checkCollision(weapon, this.player) && weapon.friendly == false) {
                    this.player.spritePlayer.startAnimation("HURT");
                    if (this.player.spritePlayer.stateAnimation.end == true) {
                        this.player.spritePlayer.startAnimation("IDLE");
                    }
                    this.weaponsManager.lstWeapons.splice(index, 1)
                    this.player.life--;
                    this.score--;
                    this.sndHurt.play();
                    if (this.player.life <= 0) {
                        this.musicGame.pause();
                        gameOver.load(imageLoader)
                        currentScene = gameOver;
                    }
                }
            }
        }
    }

    draw(pCtx) {
        pCtx.save();
        this.background.draw(pCtx);
        this.wavesManager.draw(pCtx);
        this.weaponsManager.draw(pCtx);
        this.CinderParticlesEmitter.draw(pCtx);
        this.player.draw(pCtx);


        pCtx.restore();
        pCtx.fillText("Score :" + this.score, 90, 20);
        pCtx.fillText("Player's life :" + this.player.life, 190, 20);

    }

    keypressed(pKey) {

    }
}
