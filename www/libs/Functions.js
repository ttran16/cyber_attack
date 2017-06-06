Functions = function (game) {
	console.log('Director Initialized');
	console.log(game);
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
	getFormatedSeconds(time)
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
	getFormatedMinutes(time)
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
		
	}
	
	
};

