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
		
	}
	
	
};

