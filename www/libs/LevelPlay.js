PhaserGame.LevelPlay = function (game) {
	this.Questions = new Questions(this);
	this.Hubs = new Hubs(this);
}
PhaserGame.LevelPlay.prototype = {
        
    preload: function () {},
    
    
    create: function () {
        // Begin Level Music
		
		
        this.game.music.destroy();      
        this.game.music = this.add.audio('MUSIC-Level1');
        this.game.music.volume = .5;
        this.game.music.play();
        
        // Setup Sound EFX
        soundSelect = this.add.audio('SOUND-Select');
        soundMissile = this.add.audio('SOUND-Missile');
        soundMissileHit = this.add.audio('SOUND-MissileHit');
        
		
		

        // SET THE GAME STATES
        this.game.PAUSED = false;
        this.game.STATE = 'PLAY';
        this.game.DAMAGESTATE = false;
        
        this.buildWorld();
        this.buildGroup_UI();
		this.Hubs.Init();
        this.Questions.Init();
        this.buildGroup_Bonus();

		this.game.ticking=false;
		this.flashtimer = 0;
        
        // START THE PHYSICS ENGINE
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // SET THE FIRST MISSILE TO FIRE in 5 SECONDS
        this.game.DATA_MissileFire_Timer = this.game.time.now + 5000;
        
        // SET THE TIMER FOR ASSIST PROMPT
        this.game.DATA_AssistPrompt_Timer = this.game.time.now + 10000;
        this.game.assistPromptState = true;
        this.game.assistPromptToggle = true;
        
        // SET QUESTION LEVEL
        this.game.QuestionLevel = 1;
        
        // Set Correct Answer to 0
        this.game.CurrentCorrectAnswer = 0;
        
        // Set Current Question - Used for Debug
        this.game.CurrentQuestion = 0;
        
        // SET ANSWERSCORRECT CORRECT - USED TO MAINTAIN DIFFICULTY LEVEL
        this.game.AnswersCorrect = 0;
        
        // SET HUB DESTROYED - FOR POWER UP POSSIBILITIES
        this.game.HubDestroyed0 = 0;
        this.game.HubDestroyed1 = 0;
        this.game.HubDestroyed2 = 0;
        this.game.PowerUpChances = 0;
    },
    
    
    buildWorld: function () {
        // Add background & level map
        this.game.SCREEN_LevelBackground = this.game.add.sprite(0, 0, 'BG-Level');

		
		
		this.game.SCREEN_LevelBackground.width=this.game.width;
		this.game.SCREEN_LevelBackground.height=this.game.height;
		
        this.game.SCREEN_LevelMap = this.game.add.sprite(34, 59, 'LEVEL-Map');
		
		
		
		this.game.SCREEN_LevelMap.width=this.game.width/1024 * 960;
		this.game.SCREEN_LevelMap.height=this.game.height/768 * 640;
		
		
        var text = this.add.text(32, 20, this.game.DATA_TargetLocation , { font: "15pt Michroma", fill: "#555555", align: "left", wordWrap: true, wordWrapWidth: 460 });
        text.anchor.set(0, 0);
        var text = this.add.text(this.world.width-32, 20, this.game.DATA_LevelStrategy , { font: "15pt Michroma", fill: "#555555", align: "left", wordWrap: true, wordWrapWidth: 460 });
        text.anchor.set(1, 0);
    },
    
    
    // UI GROUP
    buildGroup_UI: function () {
        // ADD UI BUTTONS AND ACTIONS
		this.game.TIMER_BG = this.game.add.sprite(this.game.width/2, 745, 'TIMER-BG');
		this.game.TIMER_BG.anchor.set(0.5, 0.5);
		
		this.timerTextMinutes = this.add.text(this.game.width/2 - 10, 745, '00' , { font: "20pt Droid", fill: "#00ff00", align: "left", wordWrap: true, wordWrapWidth: 460 });
        this.timerTextMinutes.anchor.set(1, 0.5);
		
		this.timerTextSeparator = this.add.text(this.game.width/2, 745, ':' , { font: "20pt Droid", fill: "#00ff00", align: "left", wordWrap: true, wordWrapWidth: 460 });
        this.timerTextSeparator.anchor.set(0.5, 0.5);
		
		this.timerTextSeconds = this.add.text(this.game.width/2 + 10, 745, '00' , { font: "20pt Droid", fill: "#00ff00", align: "left", wordWrap: true, wordWrapWidth: 460 });
        this.timerTextSeconds.anchor.set(0, 0.5);
		
	
        this.game.ICON_Restore = this.game.add.sprite(950, 718, 'ICON-Restore-Off');
        this.game.ICON_Restore.inputEnabled = true;
		this.ICON_Restore = this.add.text(950+50, 718, this.game.POWERUP_Restore , { font: "10pt Droid", fill: "#ffffff", backgroundColor:"#000000", align: "left", wordWrap: false});
        this.ICON_Restore.anchor.set(1, 0);	
                
        this.game.ICON_Attack = this.game.add.sprite(900, 718, 'ICON-Attack-Off');
        this.game.ICON_Attack.inputEnabled = true;
		this.ICON_Attack = this.add.text(900+50, 718, this.game.POWERUP_Restore , { font: "10pt Droid", fill: "#ffffff", backgroundColor:"#000000", align: "left", wordWrap: false});
        this.ICON_Attack.anchor.set(1, 0);	
        
        this.game.ICON_5050 = this.game.add.sprite(850, 718, 'ICON-5050-Off');
        this.game.ICON_5050.inputEnabled = true;
		this.ICON_5050 = this.add.text(850+50, 718, this.game.POWERUP_Restore , { font: "10pt Droid", fill: "#ffffff", backgroundColor:"#000000", align: "left", wordWrap: false});
        this.ICON_5050.anchor.set(1, 0);	
        
        this.game.ICON_Help = this.game.add.sprite(25, -718, 'ICON-Help');
        this.game.ICON_Help.inputEnabled = true;
        
        this.game.ICON_Debug = this.game.add.sprite(75, -718, 'ICON-Debug');
        this.game.ICON_Debug.inputEnabled = true;
        
        this.game.ICON_Exit = this.game.add.sprite(this.game.width/2, 0, 'ICON-Exit');
		this.game.ICON_Exit.anchor.set(0.5, 0);	
        this.game.ICON_Exit.inputEnabled = true;
        this.game.ICON_Exit.input.useHandCursor = true;
		
        this.refresh_UI();
        this.activate_UI();
    },
    
    
    refresh_UI: function () {    
        
		

        // 5050 AVAILABLE DURING QUESTION
        if (this.game.POWERUP_5050 >= 1 && this.game.STATE == 'QUESTION'){
            this.game.ICON_5050.loadTexture('ICON-5050-On',0);
            this.game.ICON_5050.input.enabled = true;
            this.game.ICON_5050.input.useHandCursor = true;
        } else {
            this.game.ICON_5050.loadTexture('ICON-5050-Off',0);
            this.game.ICON_5050.input.enabled = false;
            this.game.ICON_5050.input.useHandCursor = false;
        }
        this.ICON_5050.setText(this.game.POWERUP_5050);
        
        // RESTORE AVAILABLE DURING GAMEPLAY
        if (this.game.POWERUP_Restore >= 1 && this.game.STATE == 'PLAY'){
            this.game.ICON_Restore.loadTexture('ICON-Restore-On',0);
            this.game.ICON_Restore.input.enabled = true;
            this.game.ICON_Restore.input.useHandCursor = true;
        } else {
            this.game.ICON_Restore.loadTexture('ICON-Restore-Off',0);
            this.game.ICON_Restore.input.enabled = false;
            this.game.ICON_Restore.input.useHandCursor = false;
        }
        this.ICON_Restore.setText(this.game.POWERUP_Restore);
		
        // ATTACK AVAILABLE DURING GAMEPLAY
        if (this.game.POWERUP_Attack >= 1 && this.game.STATE == 'PLAY'){
            this.game.ICON_Attack.loadTexture('ICON-Attack-On',0);
            this.game.ICON_Attack.input.enabled = true;
            this.game.ICON_Attack.input.useHandCursor = true;
        } else {
            this.game.ICON_Attack.loadTexture('ICON-Attack-Off',0);
            this.game.ICON_Attack.input.enabled = false;
            this.game.ICON_Attack.input.useHandCursor = false;
        }
        this.ICON_Attack.setText(this.game.POWERUP_Attack);
        
        
        // HELP IS ALWAYS AVAILABLE
        this.game.ICON_Help.input.useHandCursor = true;
        
        // DEBUG IS ALWAYS AVAILABLE
        this.game.ICON_Debug.input.useHandCursor = true;
        
    },
     
    activate_UI: function () {
        // UI Actions - Mouse Down
        this.game.ICON_Exit.events.onInputDown.add( function() { this.exitToMenu(); }, this );
        this.game.ICON_Restore.events.onInputDown.add( function() { this.powerUp_Restore(); }, this );
        this.game.ICON_Attack.events.onInputDown.add( function() { this.powerUp_Attack(); }, this );
        this.game.ICON_5050.events.onInputDown.add( function() { this.powerUp_5050(); }, this );
        this.game.ICON_Help.events.onInputDown.add( function() { this.powerUp_Help(); }, this );
        this.game.ICON_Debug.events.onInputDown.add( function() { this.powerUp_Debug(); }, this );
        
    },
    
     //BONUS GROUP
    buildGroup_Bonus: function () {
        
        // BONUS SCREEN OVERLAY
        this.game.SPRITE_BonusOverlay = this.add.sprite(514, 379, 'BG-QOverlay');
        this.game.SPRITE_BonusOverlay.anchor.setTo(0.50, 0.50);
        this.game.SPRITE_BonusOverlay.inputEnabled = false;
        this.game.SPRITE_BonusOverlay.events.onInputDown.add( function() { this.powerUp_FadeOut(); }, this );
        
        // BONUS POPUP 
        this.game.SPRITE_BonusPopup = this.add.sprite(this.game.SPRITE_BonusOverlay.x, this.game.SPRITE_BonusOverlay.y, 'nullImage');
        this.game.SPRITE_BonusPopup.anchor.setTo(0.50, 0.50);
        this.game.SPRITE_BonusPopup.inputEnabled = false;
        this.game.SPRITE_BonusPopup.events.onInputDown.add( function() { this.powerUp_FadeOut(); }, this );
        
        // BONUS GROUP
        this.game.GROUP_Bonus = this.add.group();
        this.game.GROUP_Bonus.add(this.game.SPRITE_BonusOverlay);
        this.game.GROUP_Bonus.add(this.game.SPRITE_BonusPopup);
        this.game.GROUP_Bonus.alpha = 0;
        
    },
    
    
    // LEVEL SUCCESS
    levelSuccess: function () {
		this.game.ticking=false;
        // SET TIMER FOR NEXT MISSILE TO NOW + 999999
        this.game.DATA_MissileFire_Timer = this.game.time.now + 999999;
        
        // CHANGE GAME STATE
        if (this.game.SETUP_GameLevel == 4) {
            this.game.state.start('EndLevels');
        } else {
            this.game.state.start('LevelSuccess');
        };
        
    },
    
    // LEVEL FAILED
    levelFailure: function () {
		
		this.game.ticking=false;
        // SET TIMER FOR NEXT MISSILE TO NOW + 999999
        this.game.DATA_MissileFire_Timer = this.game.time.now + 999999;
        
        // CHANGE GAME STATE
        this.game.state.start('LevelFailure');
        
    },
    
    
    powerUpChance: function () {
		
		//TODO: refactor this.  Not sure what this does
        this.game.PowerUpChances++;
        var x = this.game.rnd.integerInRange(1, 3);
        var y = this.game.rnd.integerInRange(1, 3);
        if (this.game.PowerUpChances <= 1) {
            if (x == x ) {
                this.powerUpEarned('Random');
				return true;
            }
        }
    },
    
    powerUpEarned: function (type) {
        // PAUSE GAME STATE
		this.game.ticking=false;
        this.game.PAUSED = true;
        this.game.STATE = 'POWERUP';
        
        // INPUT ENABLED
        this.game.SPRITE_BonusOverlay.inputEnabled = true;
        this.game.SPRITE_BonusPopup.inputEnabled = true;
        
        if (type == 'Random') {
            var x = this.game.rnd.integerInRange(1, 3);
            this.game.BonusEarnedDisplay = x;
            if (x == 1) { var bonus = '5050' };
            if (x == 2) { var bonus = 'Restore' };
            if (x == 3) { var bonus = 'Attack' };
        }else{
            var bonus = type;
        };
        
        if (bonus == '5050') {
			this.game.Director.stopTalking();
			this.game.Director.enqueue('EarnedPowerUp');	
			this.game.Director.enqueue('bonusnicejob');			
			this.game.Director.enqueue('bonus5050');
			this.game.Director.startTalking();
			
            this.game.SPRITE_BonusPopup.loadTexture("BONUS-5050");
            this.game.POWERUP_5050++;
        };
        if (bonus == 'Attack') {
			this.game.Director.stopTalking();
			this.game.Director.enqueue('EarnedPowerUp');
			this.game.Director.enqueue('bonusnicejob');			
			this.game.Director.enqueue('bonusattack');
			this.game.Director.startTalking();
			
            this.game.SPRITE_BonusPopup.loadTexture("BONUS-Attack");
            this.game.POWERUP_Attack++;
        };
        if (bonus == 'Restore') {
			this.game.Director.stopTalking();
			this.game.Director.enqueue('EarnedPowerUp');
			this.game.Director.enqueue('bonusnicejob');			
			this.game.Director.enqueue('bonuspowerup');
			this.game.Director.startTalking();
			
            this.game.SPRITE_BonusPopup.loadTexture("BONUS-Restore");
            this.game.POWERUP_Restore++;
        };
        
        // SHOW POPUP THEN FADE OUT
        this.game.GROUP_Bonus.alpha=1;
        // this.game.time.events.add(3000,this.powerUp_FadeOut, this);
        
        
    },
    
    powerUp_FadeOut: function () {
        // INPUT ENABLED
        this.game.SPRITE_BonusOverlay.inputEnabled = false;
        this.game.SPRITE_BonusPopup.inputEnabled = false;
        
		this.game.Director.stopTalking(this.Hubs.hubAlive<=0);
		
        // RETURN TO PLAY
        this.game.add.tween(this.game.GROUP_Bonus).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.game.PAUSED = false;
		this.game.ticking=true;
        this.game.STATE = 'PLAY';
        this.refresh_UI();
    },
    
    powerUp_Attack: function () {
        // TAKE THE HIGHEST POWER ATTACK HUB OFFLINE
		if(this.Hubs.hubAlive>0)
		{  //only run this if there is a hub that is alive
			var atkhubIndex = this.Hubs.strongestHub();
			this.game.Director.say('AttackHubPowerDown',1);
			this.game.AttackHubs[atkhubIndex].damage = 0;
			this.Hubs.setDamage(atkhubIndex,0);
			
			// EXPLOSION ON ATTACKING HUB
			
			var atkhub = this.game.AttackHubs[atkhubIndex];
			
			this.game.GROUP_Explosion.alpha = 1;
			this.game.SPRITE_Explosion.reset(atkhub.x, atkhub.y);
			this.game.SPRITE_Explosion.animations.play('Explode', 15, false);
			this.game.add.tween(this.game.GROUP_Explosion).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
			
			
			this.game.POWERUP_Attack--;
			this.refresh_UI();
        }
		
    },
    
    powerUp_Restore: function () {
        var restoreAmount = 10;
        
        if (this.game.DATA_PlayerHub_CurDamage < 10) {
            restoreAmount = this.game.DATA_PlayerHub_CurDamage;
        };
        
        // SEND DAMAGE (SEE PLAYERDAMAGE)
        this.Hubs.playerDamage('Down', restoreAmount);
        
        
		this.game.Director.say('PowerUp',1);
		
        // PLAY HUBREPAIR ANIMATION
        this.game.GROUP_HubRepair.alpha = 1;
        this.game.SPRITE_HubRepair.reset(this.game.SPRITE_PlayerHub.x, this.game.SPRITE_PlayerHub.y);
        this.game.SPRITE_HubRepair.animations.play('Repair', 15, true);
        this.game.add.tween(this.game.GROUP_HubRepair).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        
        this.game.POWERUP_Restore--;
        this.refresh_UI ();
    },
    
    powerUp_5050: function () {
        // HIDE TWO FALSE ANSWERS
		//TODO: refactor this fucntion
        
        var removeAnswer1 = this.game.CurrentCorrectAnswer;
        var removeAnswer2 = this.game.CurrentCorrectAnswer;
        
        do {
            removeAnswer1 = this.game.rnd.integerInRange(1, 4);
        }
        while (removeAnswer1 == this.game.CurrentCorrectAnswer);
        
        do {
            removeAnswer2 = this.game.rnd.integerInRange(1, 4);
        }
        while (removeAnswer2 == this.game.CurrentCorrectAnswer || removeAnswer2 == removeAnswer1);
        
        
        if (removeAnswer1 == 1 || removeAnswer2 == 1) {
            this.game.GROUP_Answer1.alpha = 0.2;
            this.game.SPRITE_Answer1_ButtonLarge.inputEnabled = false;
        }
        if (removeAnswer1 == 2 || removeAnswer2 == 2) {
            this.game.GROUP_Answer2.alpha = 0.2;
            this.game.SPRITE_Answer2_ButtonLarge.inputEnabled = false;
        }
        if (removeAnswer1 == 3 || removeAnswer2 == 3) {
            this.game.GROUP_Answer3.alpha = 0.2;
            this.game.SPRITE_Answer3_ButtonLarge.inputEnabled = false;
        }
        if (removeAnswer1 == 4 || removeAnswer2 == 4) {
            this.game.GROUP_Answer4.alpha = 0.2;
            this.game.SPRITE_Answer4_ButtonLarge.inputEnabled = false;
        };        
        
        
		this.game.Director.say('5050',1);
        
        this.game.POWERUP_5050--;
        this.refresh_UI ();
    },
    
    powerUp_Help: function () {
        // this.game.GROUP_Answer3.alpha = 0.5;
    },
    
    powerUp_Debug: function () {
        this.powerUp_Restore();
        this.powerUp_Restore();
        this.Hubs.setDamage(0,3);
        this.Hubs.setDamage(1,3);
        this.Hubs.setDamage(2,3);
        this.Hubs.setDamage(3,3);
		/*
        this.game.SPRITE_AttackHub0.alpha = 1;
        this.game.SPRITE_AttackHub1.alpha = 1;
        this.game.SPRITE_AttackHub2.alpha = 1;
        this.game.SPRITE_AttackHub3.alpha = 1;
        this.game.SPRITE_AttackHub0_Damage =3;
        this.game.SPRITE_AttackHub1_Damage =3;
        this.game.SPRITE_AttackHub2_Damage =3;
        this.game.SPRITE_AttackHub3_Damage =3;
        this.game.HubDestroyed0 = 0;
        this.game.HubDestroyed1 = 0;
        this.game.HubDestroyed2 = 0;
        this.game.HubDestroyed3 = 0;
        */
    },
    
    getRandomAnswer: function () {
        var x = this.game.rnd.integerInRange(1, 4);
        alert(x);
        return x;
    },
    
    assistPrompt: function() {
        this.game.assistPromptLoop = this.game.time.events.loop(500, this.assistPromptToggle, this);
        this.game.AssistPromptText.alpha = 1;
    },
    
    assistPromptToggle: function() {
        if (this.game.assistPromptToggle == true) {
            this.game.AttackHubs[0].Sprite.tint = 0xFFD700;
            this.game.AttackHubs[1].Sprite.tint = 0xFFD700;
            this.game.AttackHubs[2].Sprite.tint = 0xFFD700;
            this.game.AttackHubs[3].Sprite.tint = 0xFFD700;
            this.game.GROUP_AttackHubHighlights.alpha = 1;
            this.game.assistPromptToggle = false;
        }else{
            this.game.AttackHubs[0].Sprite.tint = 0xffffff;
            this.game.AttackHubs[1].Sprite.tint = 0xffffff;
            this.game.AttackHubs[2].Sprite.tint = 0xffffff;
            this.game.AttackHubs[3].Sprite.tint = 0xffffff;
            this.game.GROUP_AttackHubHighlights.alpha = 0;
            this.game.assistPromptToggle = true;
        }
    },
    
    assistPromptStop: function() {
        this.game.time.events.remove(this.game.assistPromptLoop);
        this.game.time.events.remove(this.game.DATA_AssistPrompt_Timer);
        this.game.assistPromptState = false;
        this.game.assistPromptToggle = false;
        this.assistPromptToggle();
        this.game.AssistPromptText.alpha = 0;
        
        // START DAMAGESTATE
        this.game.DAMAGESTATE = true;
    },
        
    update: function () {
		if(this.game.ticking==true)
		{
			
			if(isNaN(this.game.timetracker))
			{
				console.log('timetracker was undefined');
				this.game.timetracker=0;
			}
			this.game.timetracker+=this.game.time.elapsedMS;
			
			this.timerTextSeconds.visible=true;
			this.timerTextMinutes.visible=true;
			this.timerTextSeconds.setText(this.game.Functions.getFormatedSeconds(this.game.timetracker /1000));
			this.timerTextMinutes.setText(this.game.Functions.getFormatedMinutes(this.game.timetracker /1000));
	
		}
		else
		{
				
			this.flashtimer += this.game.time.elapsed; //this is in ms, not seconds.    
			if ( this.flashtimer >= 1000 )    
			{        
				this.flashtimer -= 1000;        
				this.timerTextSeconds.visible = !this.timerTextSeconds.visible;    
				this.timerTextMinutes.visible = !this.timerTextMinutes.visible;    
				
			}
			
		}

		this.timerTextSeconds.setText(this.game.Functions.getFormatedSeconds(this.game.timetracker /1000));
		this.timerTextMinutes.setText(this.game.Functions.getFormatedMinutes(this.game.timetracker /1000));
		
        // MONITOR THE MISSILEFIRE TIMER AND FIRE IF EXCEEDED
        if ((this.game.PAUSED == false)&&((this.Hubs.hubAlive>0))){
            if (this.game.time.now > this.game.DATA_MissileFire_Timer) {            
                this.Hubs.fireMissile();
                // debug = this.game.debug.text("FIRE!", 1, 10);
            } else {
                // debug = this.game.debug.text(this.enemyMissileTimer, 1, 10);
            }
        }
        
        // MONITOR THE ASSIT PROMPT TIMER AND ASSIST IF EXCEEDED
        if (this.game.time.now > this.game.DATA_AssistPrompt_Timer) {            
            // Assist
            if (this.game.assistPromptState == true) {
                this.assistPrompt();
                this.game.assistPromptState = false;
                //STOP TIMER
            }
            
        } else {
            // No Assist
        }
        
        this.Questions.update();
        this.Hubs.update();
    },
	
    render: function () {
    },
	exitToMenu:function(){
		this.game.music.stop();
		this.game.Director.stopTalking();
		this.game.state.start('MainMenu',true,false);
		
	}
    
};
