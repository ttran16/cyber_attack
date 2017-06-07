PhaserGame.LevelFailure = function (game) {};


PhaserGame.LevelFailure.prototype = {
    
    preload: function () {
        // LOAD XML
        //this.load.text('TEXT-LevelDialog', 'data/dialog' + this.game.SETUP_GameLevel + '.js'); 
		this.load.image('BG-LevelFailure','assets/GFX/Level' + this.game.SETUP_GameLevel + '-Fail.jpg');
		
    },
    
    create: function () {
        levelFailureScreen = this.add.sprite(0, 0, 'BG-LevelFailure');
		
		levelFailureScreen.width=this.game.width;
		levelFailureScreen.height=this.game.height;
		
		
        levelFailureScreen.alpha = 0;
        this.game.add.tween(levelFailureScreen).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
        levelFailureScreen.inputEnabled = true;
        levelFailureScreen.events.onInputDown.addOnce(this.replayLevel,this);
        
        this.game.music.destroy();
		
		this.game.Director.say('level' + this.game.SETUP_GameLevel + 'failure',1);
		
		/*
        // PARSE XML
        var xml = this.cache.getText('TEXT-LevelDialog');
        var parser = new DOMParser();
        this.levelDialog = parser.parseFromString(xml, "application/xml"); 
        var x = this.levelDialog.getElementsByTagName("dialog");
        var content = (x[0].getElementsByTagName("levelFailure")[0].childNodes[0].nodeValue);
        
        var text = this.add.text(this.world.centerX-10, this.world.centerY-320, content, { font: "15pt Courier", fill: "#eeeeee", stroke: "#eeeeee", strokeThickness: 1, align: "left", wordWrap: true, wordWrapWidth: 460 });
        text.anchor.set(0, 0);
        text.alpha = 0;
        this.game.add.tween(text).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
		*/
    },
    
    replayLevel: function () {
		this.game.Director.stopTalking();
        this.game.state.start('LevelPreload',true,false);
    }
    
}
