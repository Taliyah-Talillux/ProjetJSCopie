class Ennemy {
    constructor(pSprite, pGameplayService) {
        this.sprite = pSprite;
        this.gameplayService = pGameplayService;
        this.gameScene = new GameScene(this.gameplayService)
        this.timer = 0;
        this.pendingDelay = 0;
        this.moveSpeed = 1;
        this.started = false;
        this.speed = 1;
    }

    update(dt) {
        this.sprite.update(dt);
    }

    draw(pCtx) {
        this.sprite.draw(pCtx);
    }
}

class EnnemyWave {
    constructor(pSprite, pNumber, pPendingDelay, pStartDistance, pX, pY, pType) {
        this.ennemyList = [];
        this.sprite = pSprite;
        this.startDistance = pStartDistance;
        this.started = false;
        this.number = pNumber;
        this.pendingDelay = pPendingDelay;
        this.x = pX;
        this.y = pY;
        this.type = pType;

    }

    addEnnemy(pEnnemy) {
        this.ennemyList.push(pEnnemy);
    }

    update(dt) {
        for (let i = this.ennemyList.length - 1; i >= 0; i--) {
            let ennemy = this.ennemyList[i];

            if (ennemy.started == false) {
                ennemy.timer += dt;
                if (ennemy.timer >= ennemy.pendingDelay) {
                    console.log("ennemi qui démarre à " + ennemy.timer);
                    ennemy.started = true;
                }
            }

            if (ennemy.started) {
                ennemy.update(dt);
                ennemy.sprite.x -= ennemy.moveSpeed;
                if (ennemy.sprite.x < 0 - ennemy.sprite.tileSize.x) {
                    console.log("suppression ennemi hors écran")
                    this.ennemyList.splice(i, 1);
                }
            }
        }
    }

    draw(pCtx) {
        this.ennemyList.forEach(ennemy => {
            ennemy.draw(pCtx);
        });
    }
}

class WavesManager {
    constructor(pGameplayService) {
        this.gameplayService = pGameplayService;
        this.wavesList = [];
        this.currentWave = null;
    }

    addWave(pWave) {
        this.wavesList.push(pWave);
    }

    stopWave(pWave) {
        console.log("Stoppe la vague précédente");
        let index = this.wavesList.indexOf(pWave);
        if (index != -1) {
            this.wavesList.splice(index, 1);
        }
    }

    startWave(pWave) {
        console.log("Vague démarrée à " + pWave.startDistance);
        pWave.started = true;
        if (this.currentWave != null) {
            this.stopWave(pWave)
        }

        this.currentWave = pWave;

        for (let i = 0; i < pWave.number; i++) {
            console.log("Crée ennemi" + i);


            let spriteEnnemy = new Sprite(pWave.sprite.img);
            Object.assign(spriteEnnemy, pWave.sprite)

            let ennemy;
            ennemy = new Wizard(spriteEnnemy, this.gameplayService);
            ennemy.sprite.x = pWave.x;
            ennemy.sprite.y = pWave.y;
            ennemy.pendingDelay = i * pWave.pendingDelay;
            pWave.addEnnemy(ennemy);
        }
    }


    update(dt, pDistance) {
        // DEMARRAGE DE LA VAGUE
        this.wavesList.forEach(wave => {
            if (pDistance >= wave.startDistance && !wave.started) {
                this.startWave(wave);
            }
        });

        // UPDATE VAGUE EN COURS
        if (this.currentWave != null) {
            this.currentWave.update(dt, this.gameplayService.weaponsManager);
        }
    }

    draw(pCtx) {
        if (this.currentWave != null) {
            this.currentWave.draw(pCtx)
        }
    }
}