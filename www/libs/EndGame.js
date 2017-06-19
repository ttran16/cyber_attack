PhaserGame.EndGame = function (game) {};


PhaserGame.EndGame.prototype = {
    
    preload: function () {
        // LOAD XML
        //this.load.text('TEXT-LevelDialog', 'data/dialog' + this.game.SETUP_GameLevel + '.js'); 
        
    },
    
    create: function () {
		console.log('begin end');
        endGameScreen = this.add.image(0, 0, 'BG-EndGame');
        endGameScreen.inputEnabled = true;
        endGameScreen.events.onInputDown.addOnce(this.endGame,this);
        
        coastlineLogo = this.add.image(this.world.centerX, this.world.centerY, 'IMG-CoastlineLogo');
        coastlineLogo.anchor.set(0.5, 0.5);
        coastlineLogo.alpha = 0;
        
        var credits = this.game.cache.getText('Credits');
        
        this.text = this.add.text(this.world.centerX, this.world.centerY+360, credits, { font: "25pt Michroma", fill: "#ffffff", stroke: "#000000", strokeThickness: 2, align: "center", wordWrap: true, wordWrapWidth: 800 });
        //this.text.setShadow(3, 3, 'rgba(0,0,0,1)', 7);  //causes delay in firefox
        this.text.anchor.set(0.5, 0);
        
        // Scroll Credits for 60 Seconds
        this.game.add.tween(this.text.anchor).to( { x: 0.5, y:1 }, 60000, Phaser.Easing.Linear.None, true, 0, 0, false);
        
        // Fade Out Background after 61 seconds
        this.game.time.events.add(61000, this.fadeBackground, this);
        
        
        // Fade In Coastline Logo after 62 seconds
        this.game.time.events.add(62000, this.showCoastlineLogo, this);
        
        console.log('end end');
        
    },
    
    showCoastlineLogo: function() {
        this.game.add.tween(coastlineLogo).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
    },
    
    fadeBackground: function() {
        this.game.add.tween(endGameScreen).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
		this.game.add.tween(this.text).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
    },
    
    endGame: function () {
		if(this.game.returnState.length)
			this.game.state.start(this.game.returnState,true,false);
		else{
			//this.game.destroy();
			//window.location.reload();
			this.game.music.stop();
			this.game.state.start('MainMenu',true,false);
		}
    }
    
}
