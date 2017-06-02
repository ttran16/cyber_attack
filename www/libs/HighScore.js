PhaserGame.HighScore = function (game) {};

//TODO:  Combine this file with level success
PhaserGame.HighScore.prototype = {
    
    preload: function () {
        // LOAD XML
        //this.load.text('TEXT-LevelDialog', 'data/dialog' + this.game.SETUP_GameLevel + '.js'); 
		
		this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		this.load.image('BG-HighScore','assets/GFX/BG-HighScore.jpg');
    },
    
    create: function () {
        HighScore = this.add.image(0, 0, 'BG-HighScore');
        HighScore.inputEnabled = true;
        HighScore.events.onInputDown.addOnce(this.endGame,this);

		
		

		var style = { font: "32px Audiowide", fill: "#ffffff", wordWrap: true, wordWrapWidth: HighScore.width, align: "center" };

		title = this.game.add.text(0, 0, "HIGH SCORE", style);
		title.anchor.set(0.5);
			
		title.x = Math.floor(HighScore.x + HighScore.width / 2);
		title.y = 100;

		for(var i=0; i<10; i++)
		{
			text = this.game.add.text(0, 0, i +1 + '. ZZZ               00:00', style);
			text.anchor.set(0.5);
			text.fontSize='20px';
			text.x = Math.floor(HighScore.x + HighScore.width / 2);
			text.y = 150 + (50 * i);
		}

		footer = this.game.add.text(0, 0, "Click to Continue", style);
		footer.fontSize='16px';
		footer.anchor.set(0.5);
			
		footer.x = Math.floor(HighScore.x + HighScore.width / 2);
		footer.y = 650;

		
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
    voiceStopped: function(){
		music.volume=1;
	},
    
    endGame: function () {
        // this.game.SETUP_GameStyle = 'Arcade';
        this.game.state.start('EndGame',true,false);
    }
    
}
