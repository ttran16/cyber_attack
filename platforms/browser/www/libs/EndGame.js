PhaserGame.EndGame = function (game) {};


PhaserGame.EndGame.prototype = {
    
    preload: function () {
        // LOAD XML
        //this.load.text('TEXT-LevelDialog', 'data/dialog' + this.game.SETUP_GameLevel + '.js'); 
        
        this.game.load.text('Credits', 'data/EndCredits.txt');
        this.game.load.image('BG-EndGame','assets/BG-EndGame.jpg');
        this.game.load.image('IMG-CoastlineLogo','assets/IMG-CoastlineLogo.png');
    },
    
    create: function () {
        endGameScreen = this.add.image(0, 0, 'BG-EndGame');
        endGameScreen.inputEnabled = true;
        endGameScreen.events.onInputDown.addOnce(this.endGame,this);
        
        coastlineLogo = this.add.image(this.world.centerX, this.world.centerY-200, 'IMG-CoastlineLogo');
        coastlineLogo.anchor.set(0.5, 0.5);
        coastlineLogo.alpha = 0;
        
        var credits = this.game.cache.getText('Credits');
        
        var text = this.add.text(this.world.centerX, this.world.centerY+360, credits, { font: "25pt Michroma", fill: "#ffffff", stroke: "#000000", strokeThickness: 2, align: "center", wordWrap: true, wordWrapWidth: 800 });
        text.setShadow(3, 3, 'rgba(0,0,0,1)', 7);
        text.anchor.set(0.5, 0);
        
        // Scroll Credits for 60 Seconds
        this.game.add.tween(text.anchor).to( { x: 0.5, y:1 }, 60000, Phaser.Easing.Linear.None, true, 0, 0, false);
        
        // Fade Out Background after 61 seconds
        this.game.time.events.add(61000, this.fadeBackground, this);
        
        
        // Fade In Coastline Logo after 62 seconds
        this.game.time.events.add(62000, this.showCoastlineLogo, this);
        
        
        
    },
    
    showCoastlineLogo: function() {
        this.game.add.tween(coastlineLogo).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
    },
    
    fadeBackground: function() {
        this.game.add.tween(endGameScreen).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
    },
    
    endGame: function () {
        this.game.destroy();
    }
    
}
