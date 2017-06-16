PhaserGame.MainMenu = function (game) {};


PhaserGame.MainMenu.prototype = {
    
    
    preload: function () {
        //titleScreen = this.add.sprite(0, 0, 'BG-TitleScreen');
        //mainMenuScreen = this.add.image(0, 0, 'BG-MainMenu');
        //mainMenuScreen.alpha = 0;
		
    },
    
    create: function () {
        this.game.returnState='';
		this.buttonCount = 0;
		
		
		
		
        mainMenuVideo = this.game.add.video('BG-MainMenuVideo');
        mainMenuVideo.addToWorld(0, 0, 0, 0, this.game.width/this.game.game_config.main_menu_bg_video.width, this.game.height/this.game.game_config.main_menu_bg_video.height);
        mainMenuVideo.unlock();
		mainMenuVideo.play(true);
		
		this.game.music.resume();
		
        text = this.add.text(this.world.centerX, this.world.centerY-100, 'Select an option:', { font: "20pt Michroma", fill: "#ffffff", stroke: "#cccccc", strokeThickness: 0 });
        text.anchor.set(0.5);
        
        this.game.GROUP_MainMenu = this.add.group();
        this.game.GROUP_MainMenu.add(text);

        // Button - Arcade
		this.addButton('Play Game', this.startArcade);
    
        // Button - Instructions
		this.addButton('Instructions', this.startInstructions);
        
        // Button - High Score
		this.addButton('High Score', this.startHighScore);
		
        // Button - Credits
		this.addButton('Credits', this.startCredit);
		
    
        this.game.GROUP_MainMenu.alpha = 0;
        
        this.game.add.tween(this.game.GROUP_MainMenu).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        
    
        // GlobalGameCounters
        this.game.counter_QuestionsAsked = 0;
        this.game.counter_AnswersCorrect = 0;
        this.game.counter_AnswersIncorrect = 0;
        
        //POWER UPS
        this.game.POWERUP_5050 = 50;
        this.game.POWERUP_Attack = 50;
        this.game.POWERUP_Restore = 1;
        
        
    },
	addButton:function(label, callback)
	{
		if(isNaN(this.buttonCount))
		{
			this.buttonCount = 0;
		}
		
        btn_new = this.add.sprite(this.world.centerX, this.world.centerY + (this.buttonCount * 75), 'BTN-Wide');
        btn_new.anchor.setTo(0.50, 0.50);        
        btn_new.inputEnabled = true;
        btn_new.input.useHandCursor = true;
        btn_newText = this.game.add.text(btn_new.x, btn_new.y, label, { font: "15pt Michroma", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 0 });
        btn_newText.anchor.setTo(0.50, 0.50);
        btn_new.events.onInputDown.addOnce(callback,this);
		
		this.game.GROUP_MainMenu.add(btn_new);
		this.game.GROUP_MainMenu.add(btn_newText);
		
		this.buttonCount++;
	},
    
    startInstructions: function () {
        this.game.state.start('Instructions');
        //this.game.state.start('EndLevels');
    },
    
    startPractice: function () {
        this.game.SETUP_GameStyle = 'Practice';
        this.game.state.start('Practice');
    },
	update: function() {
		this.game.music.volume = 1.0;
	},
	pauseUpdate: function () {
		this.game.music.volume = 0.0;
		this.game.music.pause
    }
    ,
	
    startArcade: function () {
		this.game.timetracker = 0;
        this.game.SETUP_GameLevel = 1;
        this.game.SETUP_GameStyle = 'Arcade';
		mainMenuVideo.destroy();
		this.game.music.destroy();
        this.game.state.start('LevelPreload',true,false);
    },
	startHighScore: function(){
		this.game.returnState='MainMenu';
		this.game.music.pause();
		mainMenuVideo.destroy();
        this.game.state.start('HighScore',true,false);
	},
	startCredit: function() {
		this.game.returnState='MainMenu';
		this.game.music.pause();
		mainMenuVideo.destroy();
        this.game.state.start('EndGame',true,false);
		
	}
    
}
