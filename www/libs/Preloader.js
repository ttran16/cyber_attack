
PhaserGame.Preloader = function (game) {
    this.loadingImage = null;
	
	game.Director = new Director(game);
    this.ready = false;
	
	game.Functions = new Functions(game);
	
};


PhaserGame.Preloader.prototype = {

	preload: function () {
        
		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.game.Director.Init();
		this.load.video('BG-TitleVideo','assets/VIDEO/Intro.mp4');
        this.load.image('BG-Black','assets/GFX/BG-Black.jpg');
        
		this.load.video('BG-MainMenuVideo','assets/VIDEO/Main.mp4');
        this.load.image('BG-MainMenu','assets/GFX/BG-MainMenu.jpg');
        this.load.image('BTN-Wide','assets/GFX/BTN-Wide.png');
        
        this.load.audio('MUSIC-Intro','assets/MUSIC/MUSIC-Intro.mp3');
        
        this.load.audio('VOICE-Instructions','assets/VOICE/Instructions.mp3');
        
        this.load.audio('SOUND-Click','assets/SFX/SOUND-click.mp3');
        this.load.audio('SOUND-Select','assets/SFX/SOUND-select.mp3');
        
        this.load.text('TEXT-LevelQuestions1', 'data/questions1.xml');
        this.load.text('TEXT-LevelQuestions2', 'data/questions2.xml');
        this.load.text('TEXT-LevelQuestions3', 'data/questions3.xml');
        this.load.text('TEXT-LevelQuestions4', 'data/questions4.xml');
        
	},

	create: function () {
        // Stay Black        
	},
    
    loadComplete: function () {
        this.ready = true;
		this.state.start('Intro');  
    },

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('MUSIC-Intro') && this.ready == false)
		{
			// Give it one more second
            this.game.time.events.add(500, this.loadComplete, this);
		}

	}

};