PhaserGame.HighScore = function (game) {};

//TODO:  Combine this file with level success
PhaserGame.HighScore.prototype = {
    
    preload: function () {
        // LOAD XML
        //this.load.text('TEXT-LevelDialog', 'data/dialog' + this.game.SETUP_GameLevel + '.js'); 
		
		this.load.image('BG-HighScore','assets/GFX/BG-HighScore.jpg');
		
        this.load.text('DATA-highscore', this.game.game_config.highscore.get);
		
    },
    
    create: function () {
        HighScore = this.add.image(0, 0, 'BG-HighScore');
        HighScore.inputEnabled = true;
        HighScore.events.onInputDown.addOnce(this.endGame,this);

		var style = { font: "32px Audiowide", fill: "#ffffff", wordWrap: false, wordWrapWidth: HighScore.width, align: "center" };

		title = this.game.add.text(0, 0, "HIGH SCORE", style);
		title.anchor.set(0.5);
			
		title.x = Math.floor(HighScore.x + HighScore.width / 2);
		title.y = 100;




        var xml = this.cache.getText('DATA-highscore');
        var parser = new DOMParser();
        var scoreparser = parser.parseFromString(xml, "application/xml"); 
        var x = scoreparser.getElementsByTagName("scores");
        var scores = x[0].getElementsByTagName("score");






		for(var i=0; i< Math.min(10,scores.length); i++)
		{


            var score = scores[i];
            
            // QUESTION DIFFICULTY LEVEL
            var name = (score.getElementsByTagName("name")[0].childNodes[0].nodeValue);
console.log(name);
            var time = (score.getElementsByTagName("time")[0].childNodes[0].nodeValue);
console.log(time);
			time = this.formatTime(time);
			var y =150 + (50 * i);

			var txtname = this.game.add.text(0, 0, name, style);
			txtname.anchor.set(0.0,0.5);
			txtname.fontSize='20px';
			txtname.x = Math.floor(HighScore.x + HighScore.width / 2) - 100;
			txtname.y = y;

			var txttime = this.game.add.text(0, 0, time, style);
			txttime.anchor.set(1.0,0.5);
			txttime.fontSize='20px';
			txttime.x = Math.floor(HighScore.x + HighScore.width / 2) + 100;
			txttime.y = y;

		}

		footer = this.game.add.text(0, 0, "Click/Tap to Continue", style);
		footer.fontSize='16px';
		footer.anchor.set(0.5);
			
		footer.x = Math.floor(HighScore.x + HighScore.width / 2);
		footer.y = 650;

		
        

    },
    voiceStopped: function(){
		music.volume=1;
	},
    
    endGame: function () {
        // this.game.SETUP_GameStyle = 'Arcade';
        this.game.state.start('EndGame',true,false);
    },
	formatTime: function (time) {
		var minute = 0;
		var second = 0;

		minute = Math.floor(time / (60));
		if(minute < 10) minute = "0" + minute;
		
		second = Math.floor(time % (60));
		if(second < 10) second = "0" + second;

		returnValue =  minute + ":" + second;
		return returnValue;
	}
    
}

