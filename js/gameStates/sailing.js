var playerShip;
var sailState = {

    create: function() {
        // create water

        game.renderer.renderSession.roundPixels = true; //stop jittering
        game.world.setBounds(0, 0, 1280, 1280); //set world side
        game.camera.roundPx = true;

        for (var i = 0; i < 30; i++) {
            for (var j = 0; j < 60; j++) {
                game.add.sprite(128 * i, 128 * j, 'water');
            }
        }

        playerShip = new playerBoat(game.world.centerX, game.world.centerY, 'left', 'playerShip1', 10);
        game.camera.follow(playerShip, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);



        var beachAmbience = game.add.audio('beachambience'); //adds theme
        game.sound.setDecodedCallback(beachAmbience, function(){beachAmbience.play("", .3, true)},this);

    },

    update: function() {

    }
};