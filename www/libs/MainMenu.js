PhaserGame.MainMenu = function (game) {};


PhaserGame.MainMenu.prototype = {
    
    
    preload: function () {
        //titleScreen = this.add.sprite(0, 0, 'BG-TitleScreen');
        //mainMenuScreen = this.add.image(0, 0, 'BG-MainMenu');
        //mainMenuScreen.alpha = 0;
    },
    
    create: function () {
        
        mainMenuVideo = this.game.add.video('BG-MainMenuVideo');
        mainMenuVideo.addToWorld(0, 0, 0, 0, this.game.width/this.game.game_config.main_menu_bg_video.width, this.game.height/this.game.game_config.main_menu_bg_video.height);
        mainMenuVideo.unlock();
        mainMenuVideo.play();
        text = this.add.text(this.world.centerX, this.world.centerY-100, 'Select an option:', { font: "20pt Michroma", fill: "#ffffff", stroke: "#cccccc", strokeThickness: 0 });
        text.anchor.set(0.5);
        
        // Button - Instructions
        btn_instructions = this.add.sprite(this.world.centerX, this.world.centerY, 'BTN-Wide');
        btn_instructions.anchor.setTo(0.50, 0.50);        
        btn_instructions.inputEnabled = true;
        btn_instructions.input.useHandCursor = true;
        btn_instructionsText = this.game.add.text(btn_instructions.x, btn_instructions.y, 'Instructions', { font: "15pt Michroma", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 0 });
        btn_instructionsText.anchor.setTo(0.50, 0.50);
        btn_instructions.events.onInputDown.addOnce(this.startInstructions,this);
        
        // Button - Arcade
        btn_arcade = this.add.sprite(this.world.centerX, this.world.centerY+100, 'BTN-Wide');
        btn_arcade.anchor.setTo(0.50, 0.50);        
        btn_arcade.inputEnabled = true;
        btn_arcade.input.useHandCursor = true;
        btn_arcadeText = this.game.add.text(btn_arcade.x, btn_arcade.y, 'Play Game', { font: "15pt Michroma", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 0 });
        btn_arcadeText.anchor.setTo(0.50, 0.50);
        btn_arcade.events.onInputDown.addOnce(this.startArcade,this);
    
        // GlobalGameCounters
        this.game.counter_QuestionsAsked = 0;
        this.game.counter_AnswersCorrect = 0;
        this.game.counter_AnswersIncorrect = 0;
        
        //POWER UPS
        this.game.POWERUP_5050 = 0;
        this.game.POWERUP_Attack = 0;
        this.game.POWERUP_Restore = 0;
        
        
        this.game.GROUP_MainMenu = this.add.group();
        this.game.GROUP_MainMenu.add(text);
        this.game.GROUP_MainMenu.add(btn_instructions);
        this.game.GROUP_MainMenu.add(btn_instructionsText);
        this.game.GROUP_MainMenu.add(btn_arcade);
        this.game.GROUP_MainMenu.add(btn_arcadeText);
        this.game.GROUP_MainMenu.alpha = 0;
        
        this.game.add.tween(this.game.GROUP_MainMenu).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        
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
		music.volume = 1.0;
	},
	pauseUpdate: function () {
		music.volume = 0.0;
		music.pause
    }
    ,
	
    startArcade: function () {
        this.game.SETUP_GameLevel = 1;
        this.game.SETUP_GameStyle = 'Arcade';
		mainMenuVideo.stop();
        this.game.state.start('LevelPreload',true,false);
    }
    
}
