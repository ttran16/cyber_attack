
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
		
		this.game.Functions.loadHighScore();
		this.game.add.plugin(PhaserInput.Plugin);
		this.load.video('BG-TitleVideo',['assets/VIDEO/Intro.webm','assets/VIDEO/Intro.mp4']);
        this.load.image('BG-Black','assets/GFX/BG-Black.jpg');
        
		
		this.load.video('BG-MainMenuVideo',['assets/VIDEO/Main.webm','assets/VIDEO/Main.mp4']);
        this.load.image('BTN-Wide','assets/GFX/BTN-Wide.png');
        
        this.load.audio('MUSIC-Intro','assets/MUSIC/MUSIC-Intro.mp3');
        
        this.load.audio('VOICE-Instructions','assets/VOICE/Instructions.mp3');
        
        this.load.audio('SOUND-Click','assets/SFX/SOUND-click.mp3');
        this.load.audio('SOUND-Select','assets/SFX/SOUND-select.mp3');
        
        this.load.text('TEXT-LevelQuestions1', 'data/questions1.xml');
        this.load.text('TEXT-LevelQuestions2', 'data/questions2.xml');
        this.load.text('TEXT-LevelQuestions3', 'data/questions3.xml');
        this.load.text('TEXT-LevelQuestions4', 'data/questions4.xml');
		
		
        this.game.load.text('Credits', 'data/EndCredits.txt');
        this.game.load.image('BG-EndGame','assets/GFX/BG-EndGame.jpg');
        this.game.load.image('IMG-CoastlineLogo','assets/GFX/IMG-CoastlineLogo.png');
		
		
        titleScreen = this.add.sprite(0, 0, 'BG-MainMenu');		
		titleScreen.width=this.game.width;
		titleScreen.height=this.game.height;
		
        
        this.prompter = this.add.text(this.world.centerX, this.world.centerY-100, 'LOADING...', { font: "30pt Arial", fill: "#00ff00"});
        this.prompter.anchor.set(0.5);
		this.prompter.setText('LOADING...');
		this.prompter.alpha=0;
		this.texttween = this.game.add.tween(this.prompter).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        
		
		this.texttween.repeat(100,0);
		
        console.log('preload');
	},

	create: function () {
        // Stay Black        
		console.log('preload create');
        
		
        this.titleVideo = this.game.add.video('BG-TitleVideo');
        this.titleVideo.addToWorld(0, 0, 0, 0, this.game.width/this.game.game_config.intro_video.width, this.game.height/this.game.game_config.intro_video.height);

		this.titleVideo.alpha=0;
		
		
        this.mainMenuVideo = this.game.add.video('BG-MainMenuVideo');
        this.mainMenuVideo.addToWorld(0, 0, 0, 0, this.game.width/this.game.game_config.main_menu_bg_video.width, this.game.height/this.game.game_config.main_menu_bg_video.height);
		
		this.mainMenuVideo.alpha=0;
		
        titleScreen = this.add.sprite(0, 0, 'BG-MainMenu');		
		titleScreen.width=this.game.width;
		titleScreen.height=this.game.height;

        this.game.music = this.add.audio('MUSIC-Intro');
        this.game.music.play();
		
		
		
		this.prompter.alpha=0;
		
        this.prompter = this.add.text(this.world.centerX, this.world.centerY-100, '', { font: "30pt Michroma", fill: "#00ff00"});
        this.prompter.anchor.set(0.5);
		
		this.prompter.alpha=0;
		this.texttween = this.game.add.tween(this.prompter).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.texttween.pause();
		this.texttween.repeat(100,0);
		this.shouldbeplaying=true;
	},
    
    loadComplete: function () {this.ready = true;
		this.titleVideo.destroy();
		this.mainMenuVideo.destroy();
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
			if(this.game.music.isPlaying)
			{
				this.texttween.pause();
				this.prompter.alpha=0;
				this.ready=true;
				// Give it one more second
				this.game.time.events.add(500, this.loadComplete, this);
				//this.loadComplete();
			}
			else if(this.shouldbeplaying)
			{
				this.prompter.setText('Tap to Begin');
				this.texttween.resume();
			}
		}

	}

};