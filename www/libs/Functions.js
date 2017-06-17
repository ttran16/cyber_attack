Functions = function (game) {
	console.log('Functions Initialized');
	this.game=game;
};


Functions.prototype = {
    
	formatTime: function (time) {
		var minute = 0;
		var second = 0;

		minute = this.getFormatedMinutes(time);
		
		second = this.getFormatedSeconds(time);

		returnValue =  minute + ":" + second;
		return returnValue;
	},
	getFormatedSeconds:function(time)
	{
		if(isNaN(time))
		{
			second = "00";
		}
		else
		{
			second = Math.floor(time % (60));
			if(second < 10) second = "0" + second;
		}
		return second;
		
	},
	getFormatedMinutes:function(time)
	{		
		if(isNaN(time))
		{
			minute = "00";
		}
		else
		{

			minute = Math.floor(time / (60));
			if(minute < 10) minute = "0" + minute;
		
		}
		return minute;
		
	},
	saveHighScore: function(name,time)
	{
		
		
		var savetarget;
		savetarget = this.game.game_config.highscore.set;
		if((savetarget) && (savetarget !=''))
		{
			this.game.load.onLoadComplete.addOnce(this.loadHighScore, this);
			savetarget = savetarget.replace('%%NAME%%',name);
			savetarget = savetarget.replace('%%TIME%%',time);
			this.game.load.text('DATA-highscoresave', savetarget);
			this.game.load.start();
		}
		
	},
	loadHighScore: function()
	{
		if(this.game.game_config.highscore.show)
		var loadtarget;
		loadtarget = this.game.game_config.highscore.get;
		console.log(this.game.game_config.highscore.get);
		console.log(loadtarget);
		console.log('loadtarget is ' + loadtarget);

		if((loadtarget) && (loadtarget !=''))
		{
			
			loadtarget = loadtarget.replace('%%RND%%',Math.random());
		}
		else if((loadtarget=='local')&&(!this.highScore)){
			console.log('getting default scores');
			loadtarget='data/highscore-default.txt';
		}
		if(loadtarget)
		{
			this.game.load.onLoadComplete.addOnce(this.loadComplete, this);

			this.game.load.text('DATA-highscore', loadtarget);
			
			this.game.load.start();
		}
		else
		{
			console.log('no score to get, disabling');
		}	
		
		
	},
	
	loadComplete: function() {
		var raw = this.game.cache.getText('DATA-highscore');
		if(raw)
		{
			var lines = raw.split("\n");
			var score_array = [];
			for(var i=0; i< lines.length; i++)
			{
				var score = lines[i].split("|");
				if(score.length > 1)
				{
					
					var myobj = {};
					myobj['name'] = score[0];
					myobj['time'] = score[1];
					score_array.push(myobj);
				}
			}
			this.highScore = score_array;
		}
	}
	
};

