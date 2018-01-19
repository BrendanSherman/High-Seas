/*
**UNUSED**
*/

function UI(tutorial) { //when created loads the UI
        var bar = game.add.sprite(0, 8 * (windowHeight / 10), 'bottomBar');
        bar.scale.setTo(6.4, 2);
        bar.fixedToCamera = true;

        if(tutorial){ //adds tutorial-specific buttons
            tutorialMessage = game.add.text(windowWidth / 2, bar.y + 20, "", // draw the tutorial text
                fontSmall);
            tutorialMessage.anchor.setTo(.5, .5); // origin point
            tutorialMessage.fixedToCamera = true;

            var continueButton = game.add.button(5 * windowWidth/10, bar.y + 35, 'button1', continueTutorial, this); //play button
            continuetext = game.add.text(5*windowWidth/10, bar.y+35, 'Continue', fontMed); // button text
            continuetext.fixedToCamera = true;
            continueButton.fixedToCamera = true;

            var skipButton = game.add.button(2*windowWidth/10, bar.y+35, 'button1', skipTutorial, this);
            skiptext = game.add.text(2*windowWidth / 10, bar.y+35, 'Skip', fontMed);
            skiptext.fixedToCamera = true;
            skipButton.fixedToCamera = true;
        }
}

