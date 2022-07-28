class Player {
    constructor(Px, Py) {
        let imagePlayer = imageLoader.getImage("images/Archer.png");
        this.spritePlayer = new Sprite(imagePlayer, Px, Py);
        this.spritePlayer.setTileSheet(200, 150);
        this.spritePlayer.addAnimation("ATTACK", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0.1, false);
        this.spritePlayer.addAnimation("DIE", [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 0.1, false);
        this.spritePlayer.addAnimation("HURT", [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 0.1, false);
        this.spritePlayer.addAnimation("IDLE", [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 0.1, false);
        this.spritePlayer.addAnimation("WALK", [60, 61, 62, 63, 64, 65, 66, 67, 68, 69], 0.1, false);
        this.spritePlayer.startAnimation("IDLE");

        this.width = this.spritePlayer.tileSize.x;
        this.height = this.spritePlayer.tileSize.y;

        this.x = this.spritePlayer.x;
        this.y = this.spritePlayer.y;
        this.vx = 0;
        this.vy = 1;
        this.life = 30;
    }

    // Positionne la flèche au centre de l'arc 
    getShotPosition(pWeaponHeight) {
        let margeX = 15;
        let margeY = 23;
        let position = { x: 0, y: 0 };
        let midPlayer = this.y + (this.spritePlayer.tileSize.y / 2) + margeX;
        position.x = this.x + (this.spritePlayer.tileSize.x / 2) + margeY;
        position.y = midPlayer - (pWeaponHeight / 2)
        return position;
    }

    update(dt) {
        this.spritePlayer.x = this.x;
        this.spritePlayer.y = this.y;
        this.spritePlayer.update(dt);
    }

    draw(pCtx) {
        this.spritePlayer.draw(pCtx);
    }
}