var ship; //group to hold all sprites associated with the playerboat
playerBoat = function(x,y,dir, sprite, health){
    Phaser.Sprite.call(this, game, x, y, sprite); //constructs a sprite
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.set(0.5, 0.5);
    this.scale.y = -1;
    game.add.existing(this);

    this.healthBar = game.add.sprite(this.x-64, this.y - 100, 'health');


    ship = game.add.group(); //Ship and health bar group
    ship.add(this);
    ship.add(this.healthBar);

    this.body.maxVelocity.setTo(200, 200);
    this.body.drag.set(0.2); //don't glide
    this.body.collideWorldBounds = true; //can't leave world

    this.health = health;
    this.speed = 0;
    this.cannon = new Cannon(this);
    this.mortar = new Mortar(this);
};


playerBoat.prototype = Object.create(Phaser.Sprite.prototype);
playerBoat.prototype.constructor = playerBoat;

playerBoat.prototype.update = function () {
    if(wasd.up.isDown && this.speed < 4)
        this.speed += .1;
    else
        this.speed -=.25;

    if(this.speed > 0){
        var directionX =  Math.cos(this.rotation-RADIANQUARTER);
        var directionY = Math.sin(this.rotation-RADIANQUARTER);

        ship.x += directionX * this.speed;
        ship.y += directionY * this.speed;
    }
    else
        this.speed=0;


    if(wasd.left.isDown && this.speed > 0){
        this.angle -= 1.5;
        this.speed-= .1;
    }

    else if(wasd.right.isDown && this.speed > 0){
        this.angle += 1.5;
        this.speed-=.1;
    }


    if (game.input.mousePointer.isDown) {
        var spritex = this.body.x - game.camera.x;
        var spritey = this.body.y - game.camera.y;

        if(this.cannon.ready && game.input.mousePointer.y < (8 * (windowHeight / 10))) {
            cannonSound.play();
            //fire cannon towards cursor
            this.cannon.fire(Math.atan2(spritey - game.input.mousePointer.y, spritex - game.input.mousePointer.x) * 180 / Math.PI - 180);
        }
    }

    if (wasd.spaceKey.isDown) { //fire mortar
        if(this.mortar.ready && game.input.mousePointer.y < (8 * (windowHeight / 10))) {
            this.mortar.fire(game.input.mousePointer.x + game.camera.x, game.input.mousePointer.y + game.camera.y);
        }
    }

    if(this.health == 0)
        this.die();

    this.healthBar.scale.setTo(this.health/10, 1);

    this.healthBar.position.x=this.x-64;
    this.healthBar.position.y=this.y-100;


};

playerBoat.prototype.die = function () {
    game.state.start('menu');
};


