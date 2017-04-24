PhaserGame.LevelPreload = function (game) {
    this.background = null;
	this.preloadBar = null;

	this.ready = false;
};


PhaserGame.LevelPreload.prototype = {
    
    preload: function () {
        //	These are the assets we loaded in Boot.js
		//	A nice background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		
		this.background.width=this.game.width;
		this.background.height=this.game.height;
		
        this.foreground = this.add.sprite(512, 384, 'preloaderForeground');
		
        this.foreground.anchor.setTo(0.5, 0.5);
        this.preloadBar = this.add.sprite(512, 410, 'preloaderProgress');
        this.preloadBar.anchor.setTo(0.5, 0.5);
        
        //	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);
        
        
        //Load Level Background
        this.load.image('BG-Level','assets/BG-Level.jpg');
                
        //Load Level Map
        this.load.image('LEVEL-Map','assets/LEVEL-Map' + this.game.SETUP_GameLevel + '.jpg');
        
        //Load Player Hubs
        this.load.image('SPRITE-DefenseHub-Bank','assets/SPRITE-DefenseHub-Bank.png');
        this.load.image('SPRITE-DefenseHub-PowerPlant','assets/SPRITE-DefenseHub-PowerPlant.png');
        this.load.image('SPRITE-DefenseHub-OilPlatform','assets/SPRITE-DefenseHub-OilPlatform.png');
        this.load.image('SPRITE-DefenseHub-Casino','assets/SPRITE-DefenseHub-Casino.png');
        
        //Load Collision Point
        this.load.image('SPRITE-CollisionPoint','assets/SPRITE-CollisionPoint.png');
        
        //Load Damage Meter Images
		//TODO:  optimize this
        this.load.image('ICON-DamageMeter-0','assets/ICON-Dmg0.png');
        this.load.image('ICON-DamageMeter-1','assets/ICON-Dmg1.png');
        this.load.image('ICON-DamageMeter-2','assets/ICON-Dmg2.png');
        this.load.image('ICON-DamageMeter-3','assets/ICON-Dmg3.png');
        this.load.image('ICON-DamageMeter-4','assets/ICON-Dmg4.png');
        this.load.image('ICON-DamageMeter-5','assets/ICON-Dmg5.png');
        this.load.image('ICON-DamageMeter-6','assets/ICON-Dmg6.png');
        this.load.image('ICON-DamageMeter-7','assets/ICON-Dmg7.png');
        this.load.image('ICON-DamageMeter-8','assets/ICON-Dmg8.png');
        this.load.image('ICON-DamageMeter-9','assets/ICON-Dmg9.png');
        this.load.image('ICON-DamageMeter-10','assets/ICON-Dmg10.png');
        this.load.image('ICON-DamageMeter-11','assets/ICON-Dmg11.png');
        this.load.image('ICON-DamageMeter-12','assets/ICON-Dmg12.png');
        this.load.image('ICON-DamageMeter-13','assets/ICON-Dmg13.png');
        this.load.image('ICON-DamageMeter-14','assets/ICON-Dmg14.png');
        this.load.image('ICON-DamageMeter-15','assets/ICON-Dmg15.png');
        this.load.image('ICON-DamageMeter-16','assets/ICON-Dmg16.png');
        this.load.image('ICON-DamageMeter-17','assets/ICON-Dmg17.png');
        this.load.image('ICON-DamageMeter-18','assets/ICON-Dmg18.png');
        this.load.image('ICON-DamageMeter-19','assets/ICON-Dmg19.png');
                
        //Load Attack Hubs
		//TODO:  optimize this
        this.load.image('SPRITE-AttackHub0','assets/SPRITE-AttackHub0.png');
        this.load.image('SPRITE-AttackHub1','assets/SPRITE-AttackHub1.png');
        this.load.image('SPRITE-AttackHub2','assets/SPRITE-AttackHub2.png');
        this.load.image('SPRITE-AttackHub3','assets/SPRITE-AttackHub3.png');
        
        this.load.image('SPRITE-AttackHub-Highlight','assets/SPRITE-AttackHub-Highlight.png');
                
        //Load Missile Sprites
        this.load.image('SPRITE-Missile','assets/SPRITE-Missile.png');
        this.load.image('SPRITE-MissileTrail','assets/SPRITE-MissileTrail.png');
        this.load.image('SPRITE-Shockwave','assets/SPRITE-Shockwave.png');
        
        //Load Icons
        this.load.image('ICON-5050-On','assets/ICON-50-50-On.png');
        this.load.image('ICON-5050-Off','assets/ICON-50-50-Off.png');
        this.load.image('ICON-Attack-On','assets/ICON-Attack-On.png');
        this.load.image('ICON-Attack-Off','assets/ICON-Attack-Off.png');
        this.load.image('ICON-Restore-On','assets/ICON-PowerUp-On.png');
        this.load.image('ICON-Restore-Off','assets/ICON-PowerUp-Off.png');
        this.load.image('ICON-Help','assets/ICON-Help.png');
        this.load.image('ICON-Debug','assets/ICON-Debug-On.png');
        
        //Load Bonus Related Images
        this.load.image('BONUS-5050','assets/BONUS-5050.jpg');
        this.load.image('BONUS-Attack','assets/BONUS-Attack.jpg');
        this.load.image('BONUS-Restore','assets/BONUS-Restore.jpg');
        
        //LOAD EXPLOSION SPRITE
        this.load.spritesheet('SPRITE-Explosion', 'assets/SPRITE-Explosion.png', 128, 128, 10);
        
        //LOAD REPAIR SPRITE
        this.load.spritesheet('SPRITE-HubRepair', 'assets/SPRITE-HubRepair.png', 111, 111, 10);
        
        //Load Level XML
        this.load.text('TEXT-LevelSetup', 'data/setup' + this.game.SETUP_GameLevel + '.js');
        this.load.text('TEXT-LevelDialog', 'data/dialog' + this.game.SETUP_GameLevel + '.js');
                
        //Load Question Related Images
        this.load.image('BG-QOverlay','assets/BG-QOverlay.png');
        this.load.image('SPRITE-AnswerButtonLarge','assets/SPRITE-AnswerButtonLarge.png');
        
        //Load Null Image - For Questions/Answer Placement
        this.load.image('nullImage','assets/null.jpg');
        
        //Load Questions XML and Images
        this.questionsLoad();
        
        //Load Audio
        this.load.audio('SOUND-Missile','assets/SOUND-Missile.mp3');
        this.load.audio('SOUND-MissileHit','assets/SOUND-MissileHit.mp3');
        this.load.audio('SOUND-Correct','assets/SOUND-Correct.mp3');
        this.load.audio('SOUND-Incorrect','assets/SOUND-Incorrect.mp3');
        this.load.audio('SOUND-AttackHubPowerUp','assets/SOUND-AttackHubPowerUp.mp3');
        this.load.audio('SOUND-AttackHubPowerDown','assets/SOUND-AttackHubPowerDown.mp3');
        this.load.audio('SOUND-AttackHubHit','assets/SOUND-AttackHubHit.mp3');
        this.load.audio('SOUND-PowerUp','assets/SOUND-PowerUp.mp3');
        this.load.audio('SOUND-EarnedPowerUp','assets/SOUND-EarnedPowerUp.mp3');
        this.load.audio('SOUND-5050','assets/SOUND-5050.mp3');
        this.load.audio('MUSIC-Level1','assets/MUSIC-Level1.mp3');
        this.load.audio('MUSIC-LevelIntro','assets/MUSIC-LevelIntro.mp3');
    },
    
    
    create: function () {
        
        //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
        
        // Play Music
        music.destroy();
        music = this.add.audio('MUSIC-LevelIntro',0.8,true);
        music.volume = .8;
        music.play();
        
        
        // PARSE Setup XML
        var xml = this.cache.getText('TEXT-LevelSetup');
        var parser = new DOMParser();
        this.game.SETUP_Level = parser.parseFromString(xml, "application/xml"); 
        
        // PLAYER HUB Setup
        var node = this.game.SETUP_Level.getElementsByTagName("setup");
        this.game.SPRITE_PlayerHub_Image = (node[0].getElementsByTagName("playerHubImage")[0].childNodes[0].nodeValue);    
        this.game.SPRITE_PlayerHub_X = (node[0].getElementsByTagName("playerHubX")[0].childNodes[0].nodeValue);
        this.game.SPRITE_PlayerHub_Y = (node[0].getElementsByTagName("playerHubY")[0].childNodes[0].nodeValue);
            
        // ATTACK HUBS Setup
        this.game.DATA_AttackHubCount = 0;
        //this.game.GROUP_AttackHubs = this.add.group();
        var node = this.game.SETUP_Level.getElementsByTagName("hubLocation");
		
		this.game.AttackHubs=new Array();
        for (var i = 0; i < node.length; i++) {
			
            var X = (node[i].getElementsByTagName("x")[0].childNodes[0].nodeValue);
            var Y = (node[i].getElementsByTagName("y")[0].childNodes[0].nodeValue);
            var dmg = (node[i].getElementsByTagName("dmg")[0].childNodes[0].nodeValue);

			
			//declare hub
			var AttackHub = {};
            AttackHub['x'] = X;
			AttackHub['y'] = Y;
			AttackHub['index'] = i;
			AttackHub['damage'] = dmg;
			AttackHub['max_damage'] = 3;//this depends on the pregenerated graphics
			//add to array
			this.game.AttackHubs.push(AttackHub);
            //this.game.DATA_AttackHubCount++;
			
        }
        
                
        // ATTACK HUB RATE-OF-FIRE
        var node = this.game.SETUP_Level.getElementsByTagName("setup");
        this.game.DATA_MissileFire_IntLow = (node[0].getElementsByTagName("missileRateLow")[0].childNodes[0].nodeValue);
        this.game.DATA_MissileFire_IntHigh = (node[0].getElementsByTagName("missileRateHigh")[0].childNodes[0].nodeValue);
        
        
        // DAMAGE PER MISSILE HIT
        this.game.DATA_MissileFire_Damage = (node[0].getElementsByTagName("missileDamage")[0].childNodes[0].nodeValue);
        
        
        // PARSE Dialog XML
        var xml = this.cache.getText('TEXT-LevelDialog');
        var parser = new DOMParser();
        this.game.SETUP_Dialog = parser.parseFromString(xml, "application/xml"); 
        var x = this.game.SETUP_Dialog.getElementsByTagName("dialog");
        this.game.DATA_TargetName = (x[0].getElementsByTagName("targetName")[0].childNodes[0].nodeValue);
        this.game.DATA_TargetLocation = (x[0].getElementsByTagName("targetLocation")[0].childNodes[0].nodeValue);
        this.game.DATA_LevelStrategy = (x[0].getElementsByTagName("levelStrategy")[0].childNodes[0].nodeValue);
        this.game.DATA_LevelDescription = (x[0].getElementsByTagName("description")[0].childNodes[0].nodeValue);
            
    },
    
    questionsLoad: function () {
        
        // Preload Question images
        var xml = this.cache.getText('TEXT-LevelQuestions' + this.game.SETUP_GameLevel);
        var parser = new DOMParser();
        this.game.SETUP_Questions = parser.parseFromString(xml, "application/xml");
        
        // Question images
        this.game.SETUP_Questions_NumberOfQuestions = 0;
        var Questions = this.game.SETUP_Questions.getElementsByTagName("questionSet");
        for ( var i = 0; i < Questions.length ; i++ )
        {
            this.game.SETUP_Questions_NumberOfQuestions++;
            var x = this.game.SETUP_Questions.getElementsByTagName("questionSet");
            var y = i;
            
            var QQ = (x[y].getElementsByTagName("question")[0].childNodes[0].nodeValue);
            var A1 = (x[y].getElementsByTagName("a1")[0].childNodes[0].nodeValue);
            var A2 = (x[y].getElementsByTagName("a2")[0].childNodes[0].nodeValue);
            var A3 = (x[y].getElementsByTagName("a3")[0].childNodes[0].nodeValue);
            var A4 = (x[y].getElementsByTagName("a4")[0].childNodes[0].nodeValue);
            
            this.load.image(QQ,'eqimages/' + this.game.SETUP_GameLevel + '/' + QQ + '.png');
            this.load.image(A1,'eqimages/' + this.game.SETUP_GameLevel + '/' + A1 + '.png');
            this.load.image(A2,'eqimages/' + this.game.SETUP_GameLevel + '/' + A2 + '.png');
            this.load.image(A3,'eqimages/' + this.game.SETUP_GameLevel + '/' + A3 + '.png');
            this.load.image(A4,'eqimages/' + this.game.SETUP_GameLevel + '/' + A4 + '.png');
        }
    
    },
    
    update: function () {
        //checking whether the music is ready to be played before proceeding to the Level Intro.
        if (this.cache.isSoundDecoded('MUSIC-LevelIntro'))
        {
            this.ready = true;
            this.state.start('LevelIntro');
        }
    }    
    
}
    
    