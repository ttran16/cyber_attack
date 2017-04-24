PhaserGame.EndLevels = function (game) {};

//TODO:  Combine this file with level success
PhaserGame.EndLevels.prototype = {
    
    preload: function () {
        // LOAD XML
        //this.load.text('TEXT-LevelDialog', 'data/dialog' + this.game.SETUP_GameLevel + '.js'); 
		
		
		this.load.image('BG-EndLevels','assets/EndLevels.jpg');
        //this.load.image('BG-EndLevels','assets/BG-EndLevels.jpg');
        this.load.audio('SOUND-EndGame','assets/MUSIC-EndGame.mp3');
    },
    
    create: function () {
        levelSuccessScreen = this.add.image(0, 0, 'BG-EndLevels');
        levelSuccessScreen.inputEnabled = true;
        levelSuccessScreen.events.onInputDown.addOnce(this.endGame,this);
        
        music.destroy();
        this.sound.play('SOUND-EndGame', 0.7, false);
        /*
        // PARSE XML
        var xml = this.cache.getText('TEXT-LevelDialog');
        var parser = new DOMParser();
        this.levelDialog = parser.parseFromString(xml, "application/xml"); 
        var x = this.levelDialog.getElementsByTagName("dialog");
        var content = (x[0].getElementsByTagName("levelSuccess")[0].childNodes[0].nodeValue);
        
        var text = this.add.text(this.world.centerX-10, this.world.centerY-332, content, { font: "15pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2, align: "left", wordWrap: true, wordWrapWidth: 460 });
        text.anchor.set(0, 0);
        text.alpha = 0;
        this.game.add.tween(text).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
        */
    },
    
    endGame: function () {
        // this.game.SETUP_GameStyle = 'Arcade';
        this.game.state.start('EndGame',true,false);
    }
    
}
