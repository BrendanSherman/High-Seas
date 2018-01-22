var theme;
var background;


var menuState = {
    create:function(){
        theme = game.add.audio('theme'); //adds theme
        theme.addMarker('chorus', 36.5, 243, 1, true); //adds the chorus of the theme as a marker
         //plays the marker

        game.sound.setDecodedCallback(theme, startMusic, this); //Event for audio decoding

        background = game.add.sprite(0, 0, 'menuImage'); //scale and draw bg
        background.scale.setTo(windowWidth/background.width, windowHeight/background.height);

        game.add.button(10, 9 * (game.world.height /10), 'button1', startGame, this);
        game.add.text(75, 9 * (game.world.height/10), 'Play!', fontMed);

        game.add.text(game.world.width/14, game.world.height/69, 'Welcome to HighSeas.io!', fontLarge);
        game.add.text(game.world.width/14, 8 * game.world.height/69, 'A very fun game yes', fontMed);

    },

    update:function(){

    }
};

function startGame() { //On PLAY clicked
    game.state.start('sailing');
    theme.destroy();
}


function startMusic(){ //play theme
    theme.fadeIn(3000, true, 'chorus');
}
