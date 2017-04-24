PhaserGame.LevelIntro = function (game) {};


PhaserGame.LevelIntro.prototype = {
    
    preload: function () {
		this.load.image('BG-LevelIntro','assets/Level' + this.game.SETUP_GameLevel + '-Intro.jpg');
		/*
        if (this.game.SETUP_GameLevel == 1) {
            this.load.image('BG-LevelIntro','assets/BG-LevelIntro1.jpg');
        } else if (this.game.SETUP_GameLevel == 2) {
            this.load.image('BG-LevelIntro','assets/BG-LevelIntro2.jpg');
        } else if (this.game.SETUP_GameLevel == 3) {
            this.load.image('BG-LevelIntro','assets/BG-LevelIntro3.jpg');
        } else {
            this.load.image('BG-LevelIntro','assets/BG-LevelIntro4.jpg');
        }
		*/
    },
    
    create: function () {
        
        // Set the Background Images
        levelIntroScreen = this.add.sprite(0, 0, 'BG-LevelIntro');
		
		
		levelIntroScreen.width=this.game.width;
		levelIntroScreen.height=this.game.height;
		
        levelIntroScreen.inputEnabled = true;
        levelIntroScreen.events.onInputDown.addOnce(this.levelPlay,this);
        
        
        // Target Name
		/*
        var text = this.add.text(this.world.centerX-430, this.world.centerY-330, "Target: "+this.game.DATA_TargetName, { font: "15pt Courier", fill: "#ffffff", stroke: "#ffffff", strokeThickness: 1, align: "left", wordWrap: true, wordWrapWidth: 460 });
        text.anchor.set(0, 0);
        
        // Target Location
        var text = this.add.text(this.world.centerX-430, this.world.centerY-305, "Location: "+this.game.DATA_TargetLocation, { font: "15pt Courier", fill: "#ffffff", stroke: "#ffffff", strokeThickness: 1, align: "left", wordWrap: true, wordWrapWidth: 460 });
        text.anchor.set(0, 0);
        
        // Level Strategy
        var text = this.add.text(this.world.centerX-430, this.world.centerY-280, "Strategy: "+this.game.DATA_LevelStrategy, { font: "15pt Courier", fill: "#ffffff", stroke: "#ffffff", strokeThickness: 1, align: "left", wordWrap: true, wordWrapWidth: 460 });
        text.anchor.set(0, 0);
        
        
        var text = this.add.text(this.world.centerX-430, this.world.centerY-230, this.game.DATA_LevelDescription, { font: "15pt Courier", fill: "#19cb65", stroke: "#19cb65", strokeThickness: 1, align: "left", wordWrap: true, wordWrapWidth: 460 });
        text.anchor.set(0, 0);
        */
    },
    
    levelPlay: function () {
        this.game.state.start('LevelPlay');
    }
    
}
