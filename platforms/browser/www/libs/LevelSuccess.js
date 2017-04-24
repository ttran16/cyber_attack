PhaserGame.LevelSuccess = function (game) {};


PhaserGame.LevelSuccess.prototype = {
    
    preload: function () {
        // LOAD XML
        //this.load.text('TEXT-LevelDialog', 'data/dialog' + this.game.SETUP_GameLevel + '.js'); 
		
		this.load.image('BG-LevelSuccess','assets/Level' + this.game.SETUP_GameLevel + '-Success.jpg');
		
        //this.load.image('BG-LevelSuccess','assets/BG-LevelSuccess.jpg');
        this.load.audio('SOUND-LevelSuccess','assets/SOUND-LevelSuccess.mp3');
    },
    
    create: function () {
        levelSuccessScreen = this.add.sprite(0, 0, 'BG-LevelSuccess');
        levelSuccessScreen.alpha = 0;
        this.game.add.tween(levelSuccessScreen).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
        levelSuccessScreen.inputEnabled = true;
        levelSuccessScreen.events.onInputDown.addOnce(this.nextLevel,this);
        
        
        music.destroy();
        this.sound.play('SOUND-LevelSuccess', 1, false);
        /*
        // PARSE XML
        var xml = this.cache.getText('TEXT-LevelDialog');
        var parser = new DOMParser();
        this.levelDialog = parser.parseFromString(xml, "application/xml"); 
        var x = this.levelDialog.getElementsByTagName("dialog");
        var content = (x[0].getElementsByTagName("levelSuccess")[0].childNodes[0].nodeValue);
        
        var text = this.add.text(this.world.centerX-10, this.world.centerY-320, content, { font: "15pt Courier", fill: "#eeeeee", stroke: "#eeeeee", strokeThickness: 1, align: "left", wordWrap: true, wordWrapWidth: 460 });
        text.anchor.set(0, 0);
        text.alpha = 0;
        this.game.add.tween(text).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
        */
    },
    
    nextLevel: function () {
        
        this.game.SETUP_GameLevel++;
        
        if (this.game.SETUP_GameLevel == 5) {
            this.game.state.start('Intro');
        } else {
            // this.game.SETUP_GameStyle = 'Arcade';
            this.game.state.start('LevelPreload',true,false);
            
        }
        
    }
    
}
