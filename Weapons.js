class Weapons extends Sprite {
    constructor(pX, pY, pVx, pVy, pType) {
        let img;
        switch (pType) {
            case "PLAYER":
                img = imageLoader.getImage("images/Arrow.png");
                super(img, pX, pY); // appel le constructor de la class Sprite
                this.setTileSheet(36, 12);
                this.currentFrame = 0;
                this.friendly = true;
                break;

            case "WIZARD":
                img = imageLoader.getImage("images/Boll.png");
                super(img, pX, pY);
                this.setTileSheet(20, 20);
                this.addAnimation("SHOT", [0, 1], 0.1);
                this.addAnimation("END", [2], 0, 1);
                this.startAnimation("SHOT");
                this.friendly = false;
                break;

            default:
                console.log("Weapons : constructor => Pas de type d'armes")
                break;
        }
        // Type
        this.type = pType;
        // Mouvement
        this.vx = pVx;
        this.vy = pVy;
    }

    // Projectile hors de l'écran selon une vitesse donnée
    outOfScreen(pWidth, pHeight) {
        if (this.x + this.tileSize.x < 0 || this.y + this.tileSize.y < 0 || this.x > pWidth || this.y > pHeight) {
            return true;
        }
        else {
            return false;
        }
    }

    update(dt) {
        super.update(dt);
        this.x += this.vx;
        this.y += this.vy;
    }
}

class WeaponsManager {
    constructor() {
        this.lstWeapons = [];

    }
    clear() {
        this.lstWeapons = [];
    }

    shoot(pX, pY, pAngle, pSpeed, pType) {
        let vx, vy;
        vx = pSpeed * Math.cos(pAngle);
        vy = pSpeed * Math.sin(pAngle);
        let weapon = new Weapons(pX, pY, vx, vy, pType);
        this.lstWeapons.push(weapon);
    }

    update(dt) {
        this.lstWeapons.forEach(weapon => {
            weapon.update(dt);
        });
    }

    draw(pCtx) {
        this.lstWeapons.forEach(weapon => {
            weapon.draw(pCtx);
        });
    }
}
