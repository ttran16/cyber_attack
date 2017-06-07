PhaserGame.Instructions = function (game) {};


PhaserGame.Instructions.prototype = {
    
    preload: function () {
        this.load.image('BG-Instructions','assets/GFX/BG-Instructions-Text.jpg');
    },
    
    
    create: function () {
        
        instructionsScreen = this.add.sprite(0, 0, 'BG-Instructions');
		
		instructionsScreen.width=this.game.width;
		instructionsScreen.height=this.game.height;
		this.game.music.volume = 0.1;
		
		
		this.game.Director.say('instructions',1);
        instructionsScreen.inputEnabled = true;
		
        instructionsScreen.events.onInputDown.addOnce(this.startMainMenu,this);
        /*
        instructionsOne = "Okay, listen up, \n\
We've got a hacker out there and it's your job to stop him before he takes over the target locations. \n \
\n\
Look for the radio towers on the map; this is where he's sending data from. Click on the radio towers, and you will be asked a question. Answer correctly and you will damage the towers. Answer incorrectly and the towers will be repaired. It takes at least 3 correct answers to take a tower offline. \n \
\n\
You must take all the towers offline before the target's damage meter is exceeded. \n \
\n\
Good Luck! \n\
(Click to return to the main menu)\
";
        //this.showInstOne();
          */      
    },
    
    
    showInstOne: function () {
        var text = this.add.text(this.world.centerX, this.world.centerY-332, instructionsOne, { font: "15pt Courier", fill: "#ffffff", stroke: "#119f4e", strokeThickness: 2, align: "left", wordWrap: true, wordWrapWidth: 460 });
        text.anchor.set(0, 0);
    },
    
    startMainMenu: function () {
		this.game.Director.stopTalking();
        this.game.state.start('MainMenu');
    }
    
}
