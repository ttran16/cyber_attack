PhaserGame.HighScore = function (game) {};

//TODO:  Combine this file with level success
PhaserGame.HighScore.prototype = {
    
    preload: function () {
        // LOAD XML
		this.load.image('BG-HighScore','assets/GFX/BG-HighScore.jpg');
		
		this.timer = 0;
    },
	create:function()
	{
        HighScore = this.add.image(0, 0, 'BG-HighScore');
        HighScore.inputEnabled = true;
        HighScore.events.onInputDown.addOnce(this.endGame,this);
		

		this.style = { font: "32px Michroma", fill: "#ffffff", wordWrap: false, wordWrapWidth: HighScore.width, align: "center" };

		title = this.game.add.text(0, 0, "HIGH SCORE", this.style);
		title.anchor.set(0.5);
			
		title.x = Math.floor(HighScore.x + HighScore.width / 2);
		title.y = 100;

		if((this.game.Functions.highScore)&&(this.game.Functions.highScore.length >0))
		{
			this.displayHighScore();
			
		}
		else
		{
			var error='Could not load high score from the Server.  \nPlease make sure you are connected to the Internet.';
			errorText = this.game.add.text(btn_new.x, btn_new.y, error, { font: "15pt Michroma", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 0,textAlign:"center" });
			errorText.anchor.setTo(0.50, 0.00);
			errorText.x = Math.floor(HighScore.x + HighScore.width / 2);
			errorText.y = 150;
		}
		
	},
    
    displayHighScore: function () {
		




		if(this.game.returnState.length==0)
		{
			//display current score only if there is no return state.
			var time = this.game.Functions.formatTime(this.game.timetracker/1000);
			this.mytime = this.game.add.text(0, 0, ' YOUR TIME: ' + time, this.style);
			this.mytime.anchor.set(0.5,0.5);
			this.mytime.fontSize='20px';
			this.mytime.x = Math.floor(HighScore.x + HighScore.width / 2);
			this.mytime.y = 150;
			this.mytime.alpha=0;
			this.texttween = this.game.add.tween(this.mytime).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
			
			this.texttween.repeat(1000,1000);
		}
		
        var scores = this.game.Functions.highScore;
		for(var i=0; i< Math.min(10,scores.length); i++)
		{


            var score = scores[i];
            
            // QUESTION DIFFICULTY LEVEL
            var name = score['name'];

            var time = score['time'];

			time = this.game.Functions.formatTime(time/1000);
			
			var y =200 + (40 * i);

			var txtname = this.game.add.text(0, 0, name, this.style);
			txtname.anchor.set(0.0,0.5);
			txtname.fontSize='20px';
			txtname.x = Math.floor(HighScore.x + HighScore.width / 2) - 100;
			txtname.y = y;

			var txttime = this.game.add.text(0, 0, time, this.style);
			txttime.anchor.set(1.0,0.5);
			txttime.fontSize='20px';
			txttime.x = Math.floor(HighScore.x + HighScore.width / 2) + 100;
			txttime.y = y;

		}

		footer = this.game.add.text(0, 0, "Click/Tap to Continue", this.style);
		footer.fontSize='16px';
		footer.anchor.set(0.5);
			
		footer.x = Math.floor(HighScore.x + HighScore.width / 2);
		footer.y = 650;

		
        

    },
	update:function()
	{
		   
	},
    voiceStopped: function(){
		this.game.music.volume=1;
	},
    
    endGame: function () {
		if(this.game.returnState.length)
			this.game.state.start(this.game.returnState,true,false);
		else
			this.game.state.start('EndGame',true,false);
    }
    
}

