enemyBoat = function(x,y,dir, sprite, thrust, player, health){
    Phaser.Sprite.call(this, game, x, y, sprite); //constructs a sprite

    game.physics.enable(this, Phaser.Physics.P2JS);
    this.body.damping = 0.5; //Stops the ship from gliding too much
    this.anchor.set(0.5, 0.5);
    this.scale.y = -1;
    game.add.existing(this);

    this.healthBar = game.add.sprite(this.x-64, this.y - 100, 'health');

    this.thrust = thrust;
    this.playerShip = player;

    this.health = health;
    this.speed=0;

    this.patrolRange = 10;
    this.patrolStage = 0;
};


enemyBoat.prototype = Object.create(Phaser.Sprite.prototype);
enemyBoat.prototype.constructor = enemyBoat;
enemyBoat.prototype.setParent=function(parent){ this.myParent=parent;};

enemyBoat.prototype.update = function () {

    var ydiff = this.body.y - this.playerShip.body.y;
    var xdiff = this.body.x - this.playerShip.body.x;
    var distance = Math.round(Math.sqrt(xdiff^2 + ydiff^2));
    console.log(distance);


    if(this.inCamera) {
        this.body.angle = (Math.atan2(ydiff, xdiff) * 180 / Math.PI) - STARTANGLE; //subtract 90 because the ships start out looking left
        this.body.thrust(distance*10);

    }

    else{
        if(this.patrolStage===this.patrolRange){
            this.body.angle += 180;
            this.patrolStage--;
        }
        else {
            this.patrolStage++;
        }
        this.body.thrust(100);
    }

    if(this.health == 0)
        this.die();

    this.healthBar.scale.setTo(this.health/10, 1);

    this.healthBar.x=this.x-64;
    this.healthBar.y=this.y-100;

};
