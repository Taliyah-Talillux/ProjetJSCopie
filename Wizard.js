class Wizard extends Ennemy {
    constructor(pSprite, pGameplayService) {
        super(pSprite, pGameplayService)
        this.wizardTimer = rnd(5, 10);

        this.sndMagic = new sound("Sounds/magie.mp3", 0.2);
        this.sndHurt = new sound("Sounds/Aie.mp3", 0.5);
        this.sndMagic.sound.volume = 0.02;
        this.sndHurt.sound.volume = 0.02;
    }
    // TIR WIZARD
    magicalShot() {
        if (this.wizardTimer <= 0) {
            let player = this.gameplayService.player;
            let shootAngle = angle(this.sprite.x, this.sprite.y, player.x, player.y);
            let margeX = 50;
            let margeY = 60;
            this.gameplayService.weaponsManager.shoot(this.sprite.x + margeX, this.sprite.y + margeY, shootAngle, this.speed, "WIZARD");
            this.wizardTimer = rnd(1, 6);
            this.sprite.startAnimation("ATTACK");
            this.sndMagic.play();
        }
    }

    update(dt) {
        super.update(dt);
        this.wizardTimer -= dt;
        if (this.started) {
            this.magicalShot();
        }
    }
}