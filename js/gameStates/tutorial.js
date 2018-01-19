/*
UNUSED
 */


var tutorialProgress = 0;
var playerShip;
var beachAmbience
var enemy1;

var tutState = {
    render: function(){
        game.renderer.renderSession.roundPixels = true; //stop jitter
    },

    create: function () {
        game.world.setBounds(0, 0, 1280, 1280); //set world side

        // draw water on entire board
        for (i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                game.add.sprite(128 * i, 128 * j, 'water');
            }
        }


        playerShip = new playerBoat(game.world.centerX, game.world.centerY, 'left', 'playerShip1', 10);
        enemy1 = new enemyBoat(game.world.centerX + 50, game.world.centerY + 50, 'left', 'enemyShip1', 0, playerShip, 10);

        game.camera.follow(playerShip, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        beachAmbience = game.add.audio('beachambience'); //adds theme
        game.sound.setDecodedCallback(beachAmbience, function(){beachAmbience.play("", .3, true)},this);
    },

    update: function () {
        if (tutorialProgress < tutorialText.length) {
            tutorialMessage.text = tutorialText[tutorialProgress];
        }
    }
};

function continueTutorial() { // on "OK" button clicked
    if (tutorialProgress < tutorialText.length) {
        switch (tutorialProgress) {
            default: // continue to the next step when user clicks the button.
                tutorialProgress++;
                break;
            // case 2: //wait for key press
        }
    }
    else {

        game.state.start('menu');
    }
}

function skipTutorial() {
    tutorialProgress = tutorialText.length;
    beachAmbience.destroy();
}

