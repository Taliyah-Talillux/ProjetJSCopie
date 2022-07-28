class CinderParticle {
    constructor(pX, pY) {
        this.x = pX;
        this.y = pY;
        this.Width = WIDTH;
        this.life = 2000 / 10;
        var angle = Math.random() * (2 * Math.PI);
        this.vx = (rnd(10, 200) / 100) * Math.sin(angle);
        this.vy = (rnd(10, 200) / 100) * Math.cos(angle);
        this.radius = rnd(1, 3); // taille particules

    }

    update(dt) {
        this.x += this.vx;
        this.y += this.vy;
        this.vx /= 0.99;
        this.vy *= 0.99;
        this.vy += 0.01;
        this.life -= dt;
    }

    draw(pCtx) {
        DrawCircle(pCtx, this.x, this.y, this.radius);
    }
}

class CinderParticlesEmitter {
    constructor(pX, pY) {
        this.lstCinder = [];
        this.x = pX;
        this.y = pY;
    }

    addCinder() {
        var cinder = new CinderParticle(this.x + rnd(-5, WIDTH), this.y + rnd(-5, HEIGHT));
        this.lstCinder.push(cinder);
    }

    update(dt) {
        for (var index = this.lstCinder.length - 1; index >= 0; index--) {
            var cinder = this.lstCinder[index];
            cinder.update(dt);
            if (cinder.life <= 0) {
                this.lstCinder.splice(index, 1);
            }
        }
    }

    draw(pCtx) {
        this.lstCinder.forEach(cinder => {
            cinder.draw(pCtx);
        });
    }
}