var PhaserGame = {};

PhaserGame.Boot = function (game) {

};

PhaserGame.Boot.prototype = {

    init: function () {

        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            //  If you have any desktop specific settings, they can go in here
            this.scale.pageAlignHorizontally = true;
        }
        else
        {
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
        }

    },

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('preloaderBackground', 'assets/BG-Default.jpg');
        this.load.image('preloaderForeground', 'assets/BG-Loading.png');
        this.load.image('preloaderProgress', 'assets/BG-Loading-Progress.png');
		
    },

    create: function () {
		
		
		
		//make stage scale with view port
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.minWidth = this.scale.gameWidth;
		this.scale.minHeight = this.scale.gameHeight;
		this.scale.maxWidth = this.scale.gameWidth;
		this.scale.maxHeight = this.scale.gameHeight;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		
		if (!this.game.device.desktop) {
			
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            /*
			this.scale.forceOrientation(true, false);
			this.scale.hasResized.add(this.gameResized, this);
			this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
			this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            */

		}
	
	
	
        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('Preloader');

    },
	scaleStage: function(){
		
		
	},

    gameResized: function (width, height) {
    },

	
    enterIncorrectOrientation: function () {


    },

    leaveIncorrectOrientation: function () {

    }

};