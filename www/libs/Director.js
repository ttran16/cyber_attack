Director = function (game) {
	console.log('Director Initialized');
	this.game=game;
};


Director.prototype = {
    
	Init: function () {
        
        
        this.game.load.audio('DIRECTOR-instructions','assets/VOICE/Instructions.mp3');
        
		//correct
        this.game.load.audio('DIRECTOR-correct0','assets/VOICE/Correct-NiceMove.mp3');
        this.game.load.audio('DIRECTOR-correct1','assets/VOICE/Correct-YouveGotThis.mp3');
        this.game.load.audio('DIRECTOR-correct2','assets/VOICE/Correct-KeepItUpYoureDoingGreat.mp3');
        this.game.load.audio('DIRECTOR-correct3','assets/VOICE/Correct-SomeoneHasSomeSkills.mp3');
        this.game.load.audio('DIRECTOR-correct4','assets/VOICE/Correct-VeryImpressive.mp3');
        this.game.load.audio('DIRECTOR-correct5','assets/VOICE/Correct-WayToGo.mp3');
        this.game.load.audio('DIRECTOR-correct6','assets/VOICE/Correct-YoureDoingGreat.mp3');
        
		//incorrect
        this.game.load.audio('DIRECTOR-incorrect0','assets/VOICE/Incorrect-ComeOnFocus.mp3');
        this.game.load.audio('DIRECTOR-incorrect1','assets/VOICE/Incorrect-DigDeepLetsGo.mp3');
        this.game.load.audio('DIRECTOR-incorrect2','assets/VOICE/Incorrect-StopThemNow.mp3');
        this.game.load.audio('DIRECTOR-incorrect3','assets/VOICE/Incorrect-WatchIt.mp3');
        this.game.load.audio('DIRECTOR-incorrect4','assets/VOICE/Incorrect-WeCantLoseThis.mp3');
        this.game.load.audio('DIRECTOR-incorrect5','assets/VOICE/Incorrect-You Awake in There.mp3');
        this.game.load.audio('DIRECTOR-incorrect6','assets/VOICE/Incorrect-YouNeedtoPickUpthePace.mp3');
		
		//start
		this.game.load.audio('DIRECTOR-start0','assets/VOICE/Start-LetsGetStarted.mp3');       
		this.game.load.audio('DIRECTOR-start1','assets/VOICE/Start-LetsGetToWork.mp3');
		this.game.load.audio('DIRECTOR-start2','assets/VOICE/Start-TakeOutThoseTowers.mp3');
		this.game.load.audio('DIRECTOR-start3','assets/VOICE/Start-YouCanDoThis.mp3');
        
		
		//level1
		this.game.load.audio('DIRECTOR-level1failure','assets/VOICE/LEVEL1FAILURE.mp3');
        this.game.load.audio('DIRECTOR-level1scenario','assets/VOICE/LEVEL1SCENARIO.mp3');
        this.game.load.audio('DIRECTOR-level1success','assets/VOICE/LEVEL1SUCCESS.mp3');
        
		
		//level2
		this.game.load.audio('DIRECTOR-level2failure','assets/VOICE/LEVEL2FAILURE.mp3');
        this.game.load.audio('DIRECTOR-level2scenario','assets/VOICE/LEVEL2SCENARIO.mp3');
        this.game.load.audio('DIRECTOR-level2success','assets/VOICE/LEVEL2SUCCESS.mp3');
        
		
		//level3
		this.game.load.audio('DIRECTOR-level3failure','assets/VOICE/LEVEL3FAILURE.mp3');
        this.game.load.audio('DIRECTOR-level3scenario','assets/VOICE/LEVEL3SCENARIO.mp3');
        this.game.load.audio('DIRECTOR-level3success','assets/VOICE/LEVEL3SUCCESS.mp3');
        
		
		
		//level4
		this.game.load.audio('DIRECTOR-level4failure','assets/VOICE/LEVEL4FAILURE.mp3');
        this.game.load.audio('DIRECTOR-level4scenario','assets/VOICE/LEVEL4SCENARIO.mp3');
        this.game.load.audio('DIRECTOR-level4success','assets/VOICE/LEVEL4SUCCESS.mp3');
        
		//bonus
		
		this.game.load.audio('DIRECTOR-bonusnicejob','assets/VOICE/Bonus-NiceJob.mp3');
        this.game.load.audio('DIRECTOR-bonus5050','assets/VOICE/Bonus-5050.mp3');
        
		this.game.load.audio('DIRECTOR-bonusattack','assets/VOICE/Bonus-Attack.mp3');
        
		this.game.load.audio('DIRECTOR-bonuspowerup','assets/VOICE/Bonus-PowerUp.mp3');
        
		
        narration = null;
        this['queue'] = [];
	},
	
	say:function(whattosay,volume,callback)
	{

		//if there is something to say, clear everything
		this.stopTalking();
		this.enqueue(whattosay,volume);
		this.startTalking(callback);
		
		
		
	},
	startTalking:function(callback)
	{
		this.callback=callback;
		var myvoice=this['queue'].shift();

		narration = this.game.add.audio(myvoice['sound'],myvoice['volume']);
		
		narration.play();
		
		narration.onStop.add(this.processqueue, this);
	},
	
	processqueue: function()
	{
		if(this['queue'].length>0)
		{
			this.startTalking();
		}
		else if (typeof this.callback === 'function') { 
			this.callback();
		}
		
	},
	enqueue: function(whattosay,volume)
	{
	
		var myvoice = {};
		myvoice['volume'] = volume;
		
		switch(whattosay)
		{
			
			case 'correct':
			{
				var index = Math.floor(Math.random() * 7);
				myvoice['sound'] = 'DIRECTOR-correct' + index;
				
				//read instructions
				break;
			}
			case 'incorrect':
			{
				var index = Math.floor(Math.random() * 7);
				myvoice['sound'] = 'DIRECTOR-incorrect' + index;
				
				//read instructions
				break;
			}
			case 'start':
			{
				var index = Math.floor(Math.random() * 4);
				myvoice['sound'] = 'DIRECTOR-start' + index;
				
				//read instructions
				break;
			}
			default:
			{
				
				var index = Math.floor(Math.random() * 2);
				myvoice['sound'] = 'DIRECTOR-' + whattosay;
				
				//read instructions
				break;
				
			}
		}
		console.log(myvoice);
		this['queue'].push(myvoice);
	},
	emptyqueue: function()
	{
		this['queue']=[];
	},
	stopTalking:function()
	{
		this.emptyqueue();
		try
		{
			narration.stop();
			
		}
		catch(e)
		{
			//ignore
		}
		
	}
};

