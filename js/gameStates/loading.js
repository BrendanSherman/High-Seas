//displays loading screen, boots and loads assets
var loadingText;
var loadingTimer;
var state = 0;
var states = ["Loading", "Loading.", "Loading..", "Loading..."];

var loadingState = {
    preload: function(){
        game.physics.startSystem(Phaser.Physics.P2JS); //boot physics

        //Initialize keys
        wasd = {
            up:         game.input.keyboard.addKey(Phaser.Keyboard.W),
            left:       game.input.keyboard.addKey(Phaser.Keyboard.A),
            down:       game.input.keyboard.addKey(Phaser.Keyboard.S),
            right:      game.input.keyboard.addKey(Phaser.Keyboard.D),
            spaceKey:   game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        };
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.W,Phaser.Keyboard.A,Phaser.Keyboard.S,Phaser.Keyboard.D,Phaser.Keyboard.SPACEBAR]);



        //load images
        game.load.image('enemyShip1', 'resources/images/PNG/Ships/ship_3.png');
        game.load.image('playerShip1', 'resources/images/PNG/Ships/ship_2.png');
        game.load.image('cannonball', 'resources/images/PNG/Ship parts/cannonBall.png');
        game.load.image('water', 'resources/images/PNG/Tiles/tile_73.png');
        game.load.image('menuImage', 'resources/images/PNG/statics/menuImage.png');
        game.load.image('bottomBar', 'resources/images/ui/PNG/grey_panel.png');
        game.load.image('button1', 'resources/images/ui/PNG/red_button02.png');
        game.load.image('health', 'resources/images/PNG/statics/healthBar.png');

        //load spritesheets TODO
        game.load.spritesheet('pirate', 'resources/images/PNG/People/pirateSheet.png', 0, 0);

        //load sounds
        game.load.audio('theme', 'resources/sounds/theme.wav');
        game.load.audio('beachambience', 'resources/sounds/beachambience.mp3');
        game.load.audio('cannon', 'resources/sounds/cannon.mp3');
    },

    create: function(){
        loadingText = game.add.text(game.world.width/4, game.world.height/2, states[state], fontLarge);

        loadingTimer = game.time.create(false);
        loadingTimer.add(1500, function(){game.state.start('menu');}, this);
        loadingTimer.start();

        cannonSound = game.add.audio('cannon');

        game.time.events.loop(350, stateChange, this); //loading screen loop, calls statechange
    }
};

function stateChange(){ //changes the state of the loading screen text.
    state = (state+1)%4;
    loadingText.text = states[state]; // silly boy just do what we learned
}

