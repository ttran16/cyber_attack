PhaserGame.LevelIntro = function (game) {};


PhaserGame.LevelIntro.prototype = {
    
    preload: function () {
		this.load.image('BG-LevelIntro','assets/GFX/Level' + this.game.SETUP_GameLevel + '-Intro.jpg');
		
    },
    
    create: function () {
        
        // Set the Background Images
        levelIntroScreen = this.add.sprite(0, 0, 'BG-LevelIntro');
		
		
		levelIntroScreen.width=this.game.width;
		levelIntroScreen.height=this.game.height;
		
        levelIntroScreen.inputEnabled = true;
        levelIntroScreen.events.onInputDown.addOnce(this.levelPlay,this);
        this.game.Director.say('level' + this.game.SETUP_GameLevel + 'scenario',1,this.voiceStopped);
		
        
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
    voiceStopped: function(){
		this.game.music.volume=1;
	},
    
    levelPlay: function () {
		this.game.music.destroy();
		this.game.Director.stopTalking();
		this.game.Director.say('start',1);
        this.game.state.start('LevelPlay');
    }
    
}
