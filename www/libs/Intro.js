PhaserGame.Intro = function (game) {
};


PhaserGame.Intro.prototype = {
    
    create: function () {

	
        //music = this.add.audio('MUSIC-Intro');
		
        titleVideo = this.game.add.video('BG-TitleVideo');
        titleVideo.addToWorld(0, 0, 0, 0, this.game.width/this.game.game_config.intro_video.width, this.game.height/this.game.game_config.intro_video.height);
		titleVideo.setTouchLock(false);
		titleVideo.play();
		titleVideo.setTouchLock(false);
        //this.game['mainMenuVideo'] = this.game.add.video('BG-MainMenuVideo');
	
	
		//console.log("created");
		//mainMenuScreen = this.add.sprite(0, 0, 'BG-MainMenu');
		//mainMenuScreen.width=this.game.width;
		//mainMenuScreen.height=this.game.height;        
        //mainMenuScreen.inputEnabled = true;
        //mainMenuScreen.input.useHandCursor = true;
        //mainMenuScreen.events.onInputDown.addOnce(this.begin,this);
		
		
    },
    begin: function(){
		console.log("clicked");
		mainMenuScreen.alpha=0;
        //this.startBG;
        this.index = 0;
        this.textTimer;
        this.text;
        this.line= '';
        this.text2;
        this.textLine =" ";
        this.content = [
            ".",
            " ",
            "Coastline Community College presents ",
            "a CoastTraining production ",
            "in association with\nOrange County Career Pathways Project ",
            "   "
        ];
        
        //endBG = this.game.add.sprite(0, 0, 'BG-TitleScreen2');
        //endBG.inputEnabled = true;
        //endBG.events.onInputDown.addOnce(this.startGame,this);
        
        //startBG = this.game.add.sprite(0, 0, 'BG-TitleScreen');
        //startBG.inputEnabled = true;
        //startBG.events.onInputDown.addOnce(this.startGame,this);
        
        music.play(true,1);
                
        titleVideo.play();        
        titleScreen = this.add.sprite(0, 0, 'BG-MainMenu');
		

		titleScreen.width=this.game.width;
		titleScreen.height=this.game.height;
		
        titleScreen.alpha = 0;
        titleScreen.inputEnabled = true;
        titleScreen.events.onInputDown.addOnce(this.startGame,this);
        
        blackScreen = this.game.add.sprite(0, 0, 'BG-Black');
        
		blackScreen.width=this.game.width;
		blackScreen.height=this.game.height;
		
		
        this.text = this.game.add.text(32, 600, 'aaaaaaa', { font: "25pt Michroma", fill: "#ffffff", stroke: "#000000", strokeThickness: 1 });
        this.text.setShadow(3, 3, 'rgba(0,0,0,1)', 7);
        this.nextLine();
        
        this.game.add.tween(blackScreen).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, true, 0, 0, false);
        
        
        this.game.time.events.add(23000, this.startGame, this);
		
	},
    updateLine: function () {
        if (line.length < this.content[this.index].length) {
            line = this.content[this.index].substr(0, line.length + 1);
            this.text.setText(line); 
            
        } else {
            //  Wait 2 seconds then start a new line
            this.game.time.events.add( Phaser.Timer.SECOND * 2, this.nextLine, this);
            
        }

    },
	update: function() {
		console.log('touchlock: ' + titleVideo.touchLock);
	},

    nextLine: function () {
        this.index++; 
        if (this.index < this.content.length) {
            line = '';
            this.game.time.events.repeat(80, this.content[this.index].length + 1, this.updateLine, this);
        } else {
            this.game.add.tween(titleScreen).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
            this.game.add.tween(this.text).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            
        };

    },
    
	pauseUpdate: function () {
		music.volume = 0.0;
    },
    
    startGame: function(pointer) {
		titleVideo.destroy();
        this.game.state.start('MainMenu');
    }
};

