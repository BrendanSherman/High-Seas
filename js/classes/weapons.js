const BULLETSCALE = 0.3;


var angleBetween = function(x,y, x2,y2) {
    return Math.atan2(y-y2, x-x2) * 180 / Math.PI - 180;
};

var getCursorPos = function() {
    return {x:game.input.mousePointer.x + game.camera.x, y:game.input.mousePointer.y + game.camera.y};
};


var Cannonball = function(key) {
    Phaser.Sprite.call(this, game, 0, 0, key);
    this.anchor.set(0.5, 0.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;
    this.scaleSpeed = 0;
};

Cannonball.prototype = Object.create(Phaser.Sprite.prototype);
Cannonball.prototype.constructor = Cannonball;

Cannonball.prototype.fire = function(x,y, angle, speed) {
    this.reset(x,y);
    this.scale.set(BULLETSCALE);
    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
    this.angle = angle;
};

Cannonball.prototype.update = function() {
    if (this.scaleSpeed > 0) {
        this.scale.x += this.scaleSpeed;
        this.scale.y += this.scaleSpeed;
    }
};

var Cannon = function(source) {
    Phaser.Group.call(this, game, game.world, 'Default', false, true, Phaser.Physics.ARCADE);
    this.bulletSpeed = 350;
    this.fireRate = 200;
    this.ready = true;
    this.source = source;

    for (var i=0; i<100; i++) {
        this.add(new Cannonball('cannonball'), true);
    }
    return this;
};

Cannon.prototype = Object.create(Phaser.Group.prototype);
Cannon.prototype.constructor = Cannon;

Cannon.prototype.fire = function(angle) {
    if (this.game.time.time < this.nextFire) { return; }

    var x = this.source.body.x + 30;
    var y = this.source.body.y + 30;


    this.getFirstExists(false).fire(x, y, angle, this.bulletSpeed); // TODO: CHECK IF HIT LIMIT
    this.ready = false;
    game.time.events.add(this.fireRate, function(){this.ready = true}, this);

};


Mortarball = function(key) {
    Phaser.Sprite.call(this, game, 0, 0, key);
    this.anchor.set(0.5, 0.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;
};

Mortarball.prototype = Object.create(Phaser.Sprite.prototype);
Mortarball.prototype.constructor = Mortarball;

// TODO: CLEAN THIS GARBAGE UP
Mortarball.prototype.fire = function(x,y, destx, desty, v0) {
    this.reset(x,y);
    this.scale.set(BULLETSCALE);
    this.angle = angleBetween(x,y, destx,desty);
    this.v0 = v0;
    this.t0 = game.time.now;
    let dist = ((x-destx)**2 + (y-desty)**2)**0.5;
    let a0 = Math.asin(9.86*dist/(v0**2))/2;
    this.cosa0 = Math.cos(a0);
    this.sina0 = Math.sin(a0);

    this.game.physics.arcade.velocityFromAngle(this.angle, v0*this.cosa0, this.body.velocity);
    game.time.events.add(1000 * dist/(v0*this.cosa0), this.kill, this);
};

Mortarball.prototype.update = function() {
    if (this.exists) {
        let t = (game.time.now - this.t0)/1000;
        let h =  this.v0*t*this.sina0 - (9.86*(t**2))/2; //sad face
        this.scale.x = this.scale.y = (h/3+1)*BULLETSCALE;
    }

};


Mortar = function(source) {
    Phaser.Group.call(this, game, game.world, 'Default', false, true, Phaser.Physics.ARCADE);
    this.bulletSpeed = 100;
    this.fireRate = 5000; // for now
    this.ready = true;
    this.source = source;

    for (var i=0; i<10; i++) {
        this.add(new Mortarball('cannonball'), true);
    }
    return this;
};

Mortar.prototype = Object.create(Phaser.Group.prototype);
Mortar.prototype.constructor = Mortar;

Mortar.prototype.fire = function(destx,desty) {
    if (this.game.time.time < this.nextFire) { return; }

    var x = this.source.body.x + 30;
    var y = this.source.body.y + 30;

    this.getFirstExists(false).fire(x, y, destx, desty, this.bulletSpeed); // TODO: CHECK IF HIT LIMIT
    this.ready = false;
    game.time.events.add(this.fireRate, function(){this.ready = true}, this);

};
