PhaserGame.Instructions = function (game) {};


PhaserGame.Instructions.prototype = {
    
    preload: function () {
        this.load.image('BG-Instructions','assets/BG-Instructions.jpg');
    },
    
    
    create: function () {
        
        instructionsScreen = this.add.image(0, 0, 'BG-Instructions');
        instructionsScreen.inputEnabled = true;
        instructionsScreen.events.onInputDown.addOnce(this.startMainMenu,this);
        
        instructionsOne = "Ok kid listen up, \n\
We'e got a hacker out there and it's your job to stop him before he takes over the target locations. \n \
\n\
Look for the radio towers on the map, this is where he's sending his data from. Click on the radio towers and you will be asked a question. Answer correctly and you will damage the towers, answer incorrectly and the towers will be repaired. Remember, it takes at least 3 correct answers to take a tower offline. \n \
\n\
You must take all the towers offline before the targets damage meter is exceeded. \n \
\n\
Good Luck! \
";
        this.showInstOne();
                
    },
    
    
    showInstOne: function () {
        var text = this.add.text(this.world.centerX, this.world.centerY-332, instructionsOne, { font: "15pt Courier", fill: "#ffffff", stroke: "#119f4e", strokeThickness: 2, align: "left", wordWrap: true, wordWrapWidth: 460 });
        text.anchor.set(0, 0);
    },
    
    startMainMenu: function () {
        this.game.state.start('MainMenu');
    }
    
}
