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
		this.rowspacing = 45; //spacing between score rows 
		
        HighScore = this.add.image(0, 0, 'BG-HighScore');
        HighScore.inputEnabled = true;
		

		this.style = { font: "48px Droid", fill: "#ffffff", wordWrap: false, wordWrapWidth: HighScore.width, align: "center" };

		title = this.game.add.text(0, 0, "HIGH SCORE", this.style);
		title.font='Michroma';
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
		
		var displayScore = false;



		if(this.game.returnState.length==0)
		{
			//display current score only if there is no return state.
			
			displayScore = true;
			
		}
		else
		{
			this.game.timetracker=0;
			displayScore = false;
			
		
		}
	
		this.game.Group_myScore = this.add.group();
		this.game.Group_myScore.alpha=0;

		this.texttween = this.game.add.tween(this.game.Group_myScore).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
		
		this.texttween.repeat(1000,1000);
		
        var scores = this.game.Functions.highScore;
		var offset= 0 ; //this is used to shift the scores down if there is a new high score.
		for(var i=0; i< Math.min(10-offset,scores.length); i++)
		{
			

			
            var score = scores[i];
            
            // QUESTION DIFFICULTY LEVEL
            var name = score['name'];
			console.log(name);
            var time = score['time'];
			var y =150 + (this.rowspacing * (i + offset));
			
			
			if((displayScore)&&(time > this.game.timetracker))
			{
				//if displaying score and the user's current time is less than the score's time.
				
				
				this.myscoreobj = {};
				this.myscoreobj['name'] = '';
				this.myscoreobj['time'] = this.game.timetracker;
				this.myscoreobj['index'] = i;
					
				var txt = this.game.add.text(0, 0, i + 1 + offset + '. ', this.style);
				txt.anchor.set(1.0,0);
				txt.fill = '#00ff00';
				txt.fontSize='30px';
				txt.x = Math.floor(HighScore.x + HighScore.width / 2) -100;
				txt.y = y;
				
				
				displayScore=false;
				this.nameInput = this.game.add.inputField(Math.floor(HighScore.x + HighScore.width / 2) - 100, y, {
					font: '30px Droid',
					fill: '#00ff00',
					cursorColor: '#00ff00',
					backgroundColor: 'transparent',
					borderColor: 'transparent',
					fontWeight: 'bold',
					width: 100,
					padding: 0,
					height:30,
					max:3
				});
				
				this.nameInput.alpha=1;
				this.nameInput.startFocus();
				
					
				var txt = this.game.add.text(0, 0, this.game.Functions.formatTime(this.game.timetracker/1000), this.style);
				txt.anchor.set(1.0,0);
				txt.fill = '#00ff00';
				txt.fontSize='30px';
				txt.x = Math.floor(HighScore.x + HighScore.width / 2) + 100;
				txt.y = y;

				
				
				this.game.Group_myScore.add(txt);
				
				
				txt = this.game.add.text(0, 0, ' - YOUR SCORE', this.style);
				txt.anchor.set(0,0);
				txt.fill = '#00ff00';
				txt.fontSize='30px';
				txt.x = Math.floor(HighScore.x + HighScore.width / 2) + 100;
				txt.y = y;

				this.game.Group_myScore.add(txt);
				
				
				
				
				offset++;
				y =150 + (this.rowspacing * (i + offset));
				
			}
			
			
					
			var txt = this.game.add.text(0, 0, i + 1 + offset + '. ', this.style);
			txt.anchor.set(1.0,0);
			txt.fill = '#ffffff';
			txt.fontSize='30px';
			txt.x = Math.floor(HighScore.x + HighScore.width / 2) -100;
			txt.y = y;
			
			time = this.game.Functions.formatTime(time/1000);
			
			

			var txtname = this.game.add.text(0, 0, name, this.style);
			txtname.anchor.set(0.0,0);
			txtname.fontSize='30px';
			txtname.x = Math.floor(HighScore.x + HighScore.width / 2) - 100;
			txtname.y = y;

			var txttime = this.game.add.text(0, 0, time, this.style);
			txttime.anchor.set(1.0,0);
			txttime.fontSize='30px';
			txttime.x = Math.floor(HighScore.x + HighScore.width / 2) + 100;
			txttime.y = y;

		}
		
		
		if(displayScore && this.game.timetracker>0)
		{
			//if not high score, then display time at the bottom
			var txt = this.game.add.text(0, 0, ' YOUR TIME: ' + this.game.Functions.formatTime(this.game.timetracker/1000), this.style);
			txt.anchor.set(0.5,0.5);
			txt.fontSize='30px';
			txt.x = Math.floor(HighScore.x + HighScore.width / 2);
			txt.y = 650;
				
			this.game.Group_myScore.add(txt);
			
			
			
		}
		
		
        

    },
	update:function()
	{
		if(this.nameInput)
		{
			this.nameInput.update();
			if(this.nameInput.value != this.nameInputValue)
			{
				this.nameInputValue = this.nameInput.value.toUpperCase();
				this.nameInput.setText(this.nameInputValue);
				this.nameInput.startFocus();
			}


			if(this.nameInput.alpha>0)
			{
			
				
				if(this.nameInputValue.length >=3)
				{
					if(this.myscoreobj && this.game.Functions.highScore)
					{
						this.myscoreobj['name'] = this.nameInputValue;
						this.game.Functions.highScore.splice(this.myscoreobj['index'],0,this.myscoreobj);
						
					}
					
					this.nameInput.alpha=0;
					this.game.Functions.saveHighScore(this.nameInputValue,this.game.timetracker);
					
					var txt = this.game.add.text(0, 0, this.nameInputValue, this.style);
					txt.anchor.set(0,0);
					txt.fill = '#00ff00';
					txt.fontSize='30px';
					txt.x = this.nameInput.x;
					txt.y = this.nameInput.y;

					this.game.Group_myScore.add(txt);
				}
			}
			else
			{
						
				this.showFooter();
				
			}
			
			   
		}
		else
		{
				
			this.showFooter();
		}
	},
	showFooter: function(){
		
		HighScore.events.onInputDown.addOnce(this.endGame,this);
			
		footer = this.game.add.text(0, 0, "Tap to Continue", this.style);
		footer.font = 'Michroma';
		footer.fontSize='16px';
		footer.anchor.set(0.5);
			
		footer.x = Math.floor(HighScore.x + HighScore.width / 2);
		footer.y = 650;

	},
    voiceStopped: function(){
		this.game.music.volume=1;
	},
    
    endGame: function () {
		this.nameInput = null;
		this.nameInputValue = '';
		if(this.game.returnState.length)
			this.game.state.start(this.game.returnState,true,false);
		else
			this.game.state.start('EndGame',true,false);
    }
    
}

