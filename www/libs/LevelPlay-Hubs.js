Hubs = function (LP) {
	
	this.LevelPlay = LP;
	
	console.log("Hubs initialized");
	
};

Hubs.prototype = {
    
    Init: function(){
		this.buildGroup_Hub();
        this.buildGroup_Missile();
        this.buildGroup_Shockwave();
        this.buildGroup_Explosion();
        this.buildGroup_HubRepair();
        this.buildGroup_Damage();

		
	},
    update:function(){
		
		
        // Missile Active
        if (this.LevelPlay.game.SPRITE_EnemyMissile_Active) {
            
            
            if (this.LevelPlay.game.time.now > this.LevelPlay.game.SPRITE_MissileTrail_Delay) { 
                // MISSILE TRAIL?
                this.LevelPlay.game.SPRITE_MissileTrail = this.LevelPlay.add.sprite(parseInt(this.LevelPlay.game.SPRITE_EnemyMissile.x), parseInt(this.LevelPlay.game.SPRITE_EnemyMissile.y), 'SPRITE-MissileTrail');
                this.LevelPlay.game.SPRITE_MissileTrail.anchor.setTo(0.50, 0.50);
                this.LevelPlay.game.SPRITE_MissileTrail.rotation = this.LevelPlay.game.physics.arcade.angleBetween(this.LevelPlay.game.DATA_NextAttacker, this.LevelPlay.game.SPRITE_CollisionPoint);
                this.LevelPlay.game.GROUP_MissileTrails.add(this.LevelPlay.game.SPRITE_MissileTrail);
            }
            
        }
        
        
        //  IF MISSILE HITS COLIISION POINT - EXECUTE HUBHIT
        this.LevelPlay.game.physics.arcade.overlap(this.LevelPlay.game.SPRITE_EnemyMissile, this.LevelPlay.game.SPRITE_CollisionPoint, this.hubHit, null, this);
        
	},
    //HUB GROUP
    buildGroup_Hub: function () {
        // PLAYER HUB COLLISION POINT
        this.LevelPlay.game.SPRITE_CollisionPoint = this.LevelPlay.add.sprite(parseInt(this.LevelPlay.game.SPRITE_PlayerHub_X), parseInt(this.LevelPlay.game.SPRITE_PlayerHub_Y), 'SPRITE-CollisionPoint');
        this.LevelPlay.game.SPRITE_CollisionPoint.anchor.setTo(0.5, 0.5);
        this.LevelPlay.game.SPRITE_CollisionPoint.alpha = 0;
        this.LevelPlay.game.physics.enable(this.LevelPlay.game.SPRITE_CollisionPoint, Phaser.Physics.ARCADE);
        
        // PLAYER HUB SPRITE
        this.LevelPlay.game.SPRITE_PlayerHub = this.LevelPlay.add.sprite(this.LevelPlay.game.SPRITE_PlayerHub_X, this.LevelPlay.game.SPRITE_PlayerHub_Y, 'SPRITE-DefenseHub-' + this.LevelPlay.game.SPRITE_PlayerHub_Image);
        this.LevelPlay.game.SPRITE_PlayerHub.anchor.setTo(0.5, 0.5);
        
        this.LevelPlay.game.textY = parseInt(this.LevelPlay.game.SPRITE_PlayerHub_Y) + 50;
        this.LevelPlay.game.HubText = this.LevelPlay.game.add.text(this.LevelPlay.game.SPRITE_PlayerHub_X, this.LevelPlay.game.textY, this.LevelPlay.game.DATA_TargetName);
        this.LevelPlay.game.HubText.anchor.set(0.5);
        this.LevelPlay.game.HubText.align = 'center';

        //	Font style
        this.LevelPlay.game.HubText.font = 'Michroma';
        this.LevelPlay.game.HubText.fontSize = 10;
        this.LevelPlay.game.HubText.fill = '#ffffff';
        this.LevelPlay.game.HubText.setShadow(0, 0, 'rgba(0,0,0,1)', 6);
        
        // ATTACK HUBS
        this.LevelPlay.game.GROUP_AttackHubHighlights = this.LevelPlay.add.group();
        this.LevelPlay.game.GROUP_AttackHubs = this.LevelPlay.add.group();  
		console.log("hub count is" + this.LevelPlay.game.AttackHubs.length);
		this.hubAlive = this.LevelPlay.game.AttackHubs.length;
		
		
		for (var i = 0; i < this.LevelPlay.game.AttackHubs.length; i++) { 
			//load attack hub at full health
			var AttackHubSprite = this.LevelPlay.add.sprite(
					this.LevelPlay.game.AttackHubs[i].x, 
					this.LevelPlay.game.AttackHubs[i].y,
					'SPRITE-AttackHub' + this.LevelPlay.game.AttackHubs[i].damage
				);
				
			AttackHubSprite.anchor.setTo(
				0.5, 
				0.5
			);
				
				
			AttackHubSprite.inputEnabled = true;

			AttackHubSprite.input.useHandCursor =true;
			
			AttackHubSprite['index'] = i;
			AttackHubSprite.events.onInputDown.add( 
				
				this.towerClicked, 
				this 
			);
			
			this.LevelPlay.game.GROUP_AttackHubs.add(AttackHubSprite);
			//load attackhub highlight
			var AttackHubSpriteHightlight = 
				this.LevelPlay.add.sprite(
					this.LevelPlay.game.AttackHubs[i].x, 
					this.LevelPlay.game.AttackHubs[i].y, 
					'SPRITE-AttackHub-Highlight'
				);

			AttackHubSpriteHightlight.anchor.setTo(0.5, 0.5);

			this.LevelPlay.game.GROUP_AttackHubHighlights.add(AttackHubSpriteHightlight);
			this.LevelPlay.game.AttackHubs[i]['Sprite'] = AttackHubSprite;
			this.LevelPlay.game.AttackHubs[i]['SpriteHightlight'] = AttackHubSpriteHightlight;

            
        }
        
        // ATTACK HUBS GROUP
        this.LevelPlay.game.GROUP_AttackHubs.enableBody = true;
        //this.LevelPlay.game.physics.enable(this.LevelPlay.game.GROUP_AttackHubs, Phaser.Physics.ARCADE);
        
        // ATTACK HUB HIGHLIGHTS GROUP
        this.LevelPlay.game.GROUP_AttackHubHighlights.alpha = 0;
        
        // ASSIST PROMPT TEXT
        this.LevelPlay.game.AssistPromptText = this.LevelPlay.game.add.text(this.LevelPlay.game.world.centerX, this.LevelPlay.game.world.centerY, "Click on a tower to begin!");
        this.LevelPlay.game.AssistPromptText.anchor.set(0.5);
        this.LevelPlay.game.AssistPromptText.align = 'center';

        //	Font style
        this.LevelPlay.game.AssistPromptText.font = 'Michroma';
        this.LevelPlay.game.AssistPromptText.fontSize = 30;
        this.LevelPlay.game.AssistPromptText.fill = '#ffffff';
        this.LevelPlay.game.AssistPromptText.setShadow(0, 0, 'rgba(0,0,0,1)', 6);
        this.LevelPlay.game.AssistPromptText.alpha = 0;
    },
    
    
    //MISSILE GROUP
    buildGroup_Missile: function () {
        this.LevelPlay.game.DATA_NextAttacker;
        this.LevelPlay.game.DATA_NextAttacker_Index;
        
        this.LevelPlay.game.SPRITE_EnemyMissile;
        this.LevelPlay.game.SPRITE_EnemyMissile_Active = false;        
        
        // MISSILE SPRITE
        this.LevelPlay.game.SPRITE_EnemyMissile = this.LevelPlay.add.sprite(-100, -100, 'SPRITE-Missile');
        this.LevelPlay.game.SPRITE_EnemyMissile.anchor.setTo(0.50, 0.50);
        this.LevelPlay.game.physics.enable(this.LevelPlay.game.SPRITE_EnemyMissile, Phaser.Physics.ARCADE);
        
        // MISSILE GROUP
        this.LevelPlay.game.GROUP_Missiles = this.LevelPlay.add.group();
        this.LevelPlay.game.GROUP_Missiles.add(this.LevelPlay.game.SPRITE_EnemyMissile);
        this.LevelPlay.game.GROUP_Missiles.alpha = 0;
        
        this.LevelPlay.game.GROUP_MissileTrails = this.LevelPlay.add.group();
    },
        
    
    //SHOCKWAVE GROUP
    buildGroup_Shockwave: function () {        
        // SHOCKWAVE SPRITE
        this.LevelPlay.game.SPRITE_Shockwave = this.LevelPlay.add.sprite(this.LevelPlay.game.SPRITE_PlayerHub_X, this.LevelPlay.game.SPRITE_PlayerHub_Y, 'SPRITE-Shockwave');
        this.LevelPlay.game.SPRITE_Shockwave.anchor.setTo(0.50, 0.50);
        this.LevelPlay.game.SPRITE_Shockwave.width = 1;
        this.LevelPlay.game.SPRITE_Shockwave.height = 1;
        this.LevelPlay.game.SPRITE_Shockwave.alpha = 0;
        
        //SHOCKWAVE GROUP
        this.LevelPlay.game.GROUP_Shockwave = this.LevelPlay.add.group();
        this.LevelPlay.game.GROUP_Shockwave.add(this.LevelPlay.game.SPRITE_PlayerHub);
        this.LevelPlay.game.GROUP_Shockwave.add(this.LevelPlay.game.SPRITE_Shockwave);
        this.LevelPlay.game.GROUP_Shockwave.sort('z');
    },
    
    //EXPLOSION GROUP
    buildGroup_Explosion: function () {
        this.LevelPlay.game.SPRITE_Explosion = this.LevelPlay.add.sprite(-100, -100, 'SPRITE-Explosion');
        this.LevelPlay.game.SPRITE_Explosion.anchor.setTo(0.50, 0.50);
        this.LevelPlay.game.ANIM_Explosion = this.LevelPlay.game.SPRITE_Explosion.animations.add('Explode');
        this.LevelPlay.game.GROUP_Explosion = this.LevelPlay.add.group();
        this.LevelPlay.game.GROUP_Explosion.add(this.LevelPlay.game.SPRITE_Explosion);
        this.LevelPlay.game.GROUP_Explosion.alpha = 0;
    },
    
    //HUBREPAIR GROUP
    buildGroup_HubRepair: function () {
        this.LevelPlay.game.SPRITE_HubRepair = this.LevelPlay.add.sprite(-100, -100, 'SPRITE-HubRepair');
        this.LevelPlay.game.SPRITE_HubRepair.anchor.setTo(0.50, 0.50);
        this.LevelPlay.game.SPRITE_HubRepair.scale.setTo(.5,.5);
        this.LevelPlay.game.ANIM_HubRepair = this.LevelPlay.game.SPRITE_HubRepair.animations.add('Repair');
        this.LevelPlay.game.GROUP_HubRepair = this.LevelPlay.add.group();
        this.LevelPlay.game.GROUP_HubRepair.add(this.LevelPlay.game.SPRITE_HubRepair);
        this.LevelPlay.game.GROUP_HubRepair.alpha = 0;
    },
    
    //DAMAGE GROUP
    buildGroup_Damage: function () {
        this.LevelPlay.game.DATA_PlayerHub_CurDamage = 0;     // Damage on the playerHub
        this.LevelPlay.game.DATA_PlayerHub_MeterDamage = 0;   // Visual Representation of Damage (Whole Numbers)
        this.LevelPlay.game.DATA_PlayerHub_MaxDamage = 19;    // player hub can take 10 points of Damage (0-19)
        
        // DAMAGE METER SPRITE
        this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter = this.LevelPlay.add.sprite(this.LevelPlay.game.SPRITE_PlayerHub_X, this.LevelPlay.game.SPRITE_PlayerHub_Y-35, 'ICON-DamageMeter-0');
        this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.anchor.setTo(0.50, 0.50);
        this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.alpha = 0.6;
        
        this.LevelPlay.game.GROUP_Damage = this.LevelPlay.add.group();
        this.LevelPlay.game.GROUP_Damage.add(this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter);
    },
    
    
    
        
    fireMissile: function () {
        console.log('firing missle');
		console.log(this);
        // SET NEXT ATTACKING HUB
        // SELECT A HUB AT RANDOM, IF HUB DAMAGE GTE 1, SET AS ATTACKER
        var x = 0;
        while (x == 0) {
            var DATA_NextAttackerIndex = (this.LevelPlay.game.rnd.integerInRange(1, this.LevelPlay.game.AttackHubs.length) - 1);
			y=this.LevelPlay.game.AttackHubs[DATA_NextAttackerIndex].damage;
			
            if (y >= 1) {
				this.LevelPlay.game.DATA_NextAttacker = this.LevelPlay.game.AttackHubs[DATA_NextAttackerIndex];
               x = 1;
            };
        };
        
        // RESTART THE MISSILE TRAILS
        this.restartMissileTrails();
        
        // PLAY MISSLE FIRE SOUND
        //this.LevelPlay.sound.play('SOUND-Missile', 0.5, false);
        soundMissile.play();
        
        // FIRE MISSILE FROM NEXT ATTACKER
        this.LevelPlay.game.SPRITE_EnemyMissile.reset(parseInt(this.LevelPlay.game.DATA_NextAttacker.x), parseInt(this.LevelPlay.game.DATA_NextAttacker.y)-20);
        
        // SET THE MISSILE ACTIVE VARIABLE TO TRUE
        // THIS WILL CAUSE MISSILE TRAILS TO SHOW (SEE UPDATE)
        this.LevelPlay.game.SPRITE_EnemyMissile_Active = true;
        
        // FIRE MISSILE FROM ATTACKING HUB TO COLLISION POINT
        this.LevelPlay.game.physics.arcade.moveToObject(this.LevelPlay.game.SPRITE_EnemyMissile, this.LevelPlay.game.SPRITE_CollisionPoint, 500);
        
        // ROTATE MISSILE TO COLLISION POINT
        this.LevelPlay.game.SPRITE_EnemyMissile.rotation = this.LevelPlay.game.physics.arcade.angleBetween(this.LevelPlay.game.DATA_NextAttacker, this.LevelPlay.game.SPRITE_CollisionPoint);
        
        // SHOW (UNHIDE) THE MISSILE GROUP (ENEMYMISSILE) AND TRAILS
        this.LevelPlay.game.add.tween(this.LevelPlay.game.GROUP_Missiles).to( { alpha: 1 }, 50, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.LevelPlay.game.add.tween(this.LevelPlay.game.GROUP_MissileTrails).to( { alpha: 1 }, 50, Phaser.Easing.Linear.None, true, 0, 0, false);
        
        // PREPARE SHOCKWAVE (MAKE SMALL)
        this.LevelPlay.game.SPRITE_Shockwave.width = 1;
        this.LevelPlay.game.SPRITE_Shockwave.height = 1;
        
        // SET THE MISSILE TIME FOR NEXT MISSILE
        // GET RANDOM NUMBER BETWEEN INTLOW AND INTHIGH
        // ADD RANDOM TO TIME.NOW
        var rt = this.LevelPlay.rnd.integerInRange(parseInt(this.LevelPlay.game.DATA_MissileFire_IntLow),parseInt(this.LevelPlay.game.DATA_MissileFire_IntHigh));
        this.LevelPlay.game.DATA_MissileFire_Timer = this.LevelPlay.game.time.now + (rt*1000);
        
        // SET MISSILETRAIL TIMER TO START IN 50 MS
        this.LevelPlay.game.SPRITE_MissileTrail_Delay = this.LevelPlay.game.time.now + 50;
        
    },
    
    restartMissileTrails: function() {
        this.LevelPlay.game.GROUP_MissileTrails.forEach(function(item) {
        item.kill();
        }, this);
    },
    
    highlightHub: function(VAR) {
        this.LevelPlay.game.AttackHubs.SpriteHightlight.alpha = 1;
    },
    
    hubHit: function () {
		console.log('hubhit');
        // KILL ENEMYMISSILE ON HIT - SHOULD THIS BE A HIDE?
        this.LevelPlay.game.SPRITE_EnemyMissile.kill();
        this.LevelPlay.game.add.tween(this.LevelPlay.game.GROUP_MissileTrails).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        
        // SHOW (UNHIDE) SHOCKWAVE SPRITE
        this.LevelPlay.game.SPRITE_Shockwave.alpha = 1;
        
        // SHOCKWAVE ANIMATION - TWEEN SIZE
        this.LevelPlay.game.add.tween(this.LevelPlay.game.SPRITE_Shockwave).to( { alpha: 0, width:200, height:200 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
                
        // SET ENEMYMISSILE_ACTIVE TO FALSE
        // THIS WILL CAUSE MISSILE TRAILS TO BEGIN TWEEN FADE (SEE UPDATE)
        this.LevelPlay.game.SPRITE_EnemyMissile_Active = false;
        
        // PLAY MISSILE HIT SOUND EFFECT
        //this.LevelPlay.sound.play('SOUND-MissileHit', 0.5, false);
        soundMissileHit.play();
        
        // SEND DAMAGE (SEE PLAYERDAMAGE) IF ASSIST PROMPT IS FALSE
        if (this.LevelPlay.game.DAMAGESTATE == true) {
            this.playerDamage('Up', parseFloat(this.LevelPlay.game.DATA_MissileFire_Damage));
        }
    },
    
    
    playerDamage: function (VAR1, VAR2) {
        // VAR1 = DAMAGE UP OR DOWN
        // VAR2 = THE DAMAGE AMOUNT
        if (VAR1 == 'Down') {
            // CAUSE DAMAGE
            this.LevelPlay.game.DATA_PlayerHub_CurDamage = this.LevelPlay.game.DATA_PlayerHub_CurDamage - VAR2;
        } else {
            //REPAIR DAMAGE
            this.LevelPlay.game.DATA_PlayerHub_CurDamage = this.LevelPlay.game.DATA_PlayerHub_CurDamage + VAR2;
        }
        
        // SET NEW DAMAGE METER VALUE (PLAYER HUB CURRENT DAMAGE * DAMAGE POWER)
        this.LevelPlay.game.DATA_PlayerHub_MeterDamage = Phaser.Math.roundTo(this.LevelPlay.game.DATA_PlayerHub_CurDamage,0);
        
        // IF PLAYER HUB DAMAGE GT PLAYER HUB MAX DAMAGE - GAME OVER 
        if (this.LevelPlay.game.DATA_PlayerHub_CurDamage >= this.LevelPlay.game.DATA_PlayerHub_MaxDamage) {
            this.LevelPlay.levelFailure();
        }
        
        
        // SET DAMAGE METER SPRITE TO NEW VALUE
        switch (this.LevelPlay.game.DATA_PlayerHub_MeterDamage) {
            case 19: this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.loadTexture('ICON-DamageMeter-19'); break;
            case 18: this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.loadTexture('ICON-DamageMeter-18'); break;
            case 17: this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.loadTexture('ICON-DamageMeter-17'); break;
            case 16: this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.loadTexture('ICON-DamageMeter-16'); break;
            case 15: this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.loadTexture('ICON-DamageMeter-15'); break;
            case 14: this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.loadTexture('ICON-DamageMeter-14'); break;
            case 13: this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.loadTexture('ICON-DamageMeter-13'); break;
            case 12: this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.loadTexture('ICON-DamageMeter-12'); break;
            case 11: this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.loadTexture('ICON-DamageMeter-11'); break;
            case 10: this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.loadTexture('ICON-DamageMeter-10'); break;
            case 9: this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.loadTexture('ICON-DamageMeter-9'); break;
            case 8: this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.loadTexture('ICON-DamageMeter-8'); break;
            case 7: this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.loadTexture('ICON-DamageMeter-7'); break;
            case 6: this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.loadTexture('ICON-DamageMeter-6'); break;
            case 5: this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.loadTexture('ICON-DamageMeter-5'); break;
            case 4: this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.loadTexture('ICON-DamageMeter-4'); break;
            case 3: this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.loadTexture('ICON-DamageMeter-3'); break;
            case 2: this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.loadTexture('ICON-DamageMeter-2'); break;
            case 1: this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.loadTexture('ICON-DamageMeter-1'); break;
            case 0: this.LevelPlay.game.SPRITE_PlayerHub_DamageMeter.loadTexture('ICON-DamageMeter-0'); break;
        }
        
    },
    
    
    towerClicked: function (sprite) {
        console.log("activating hub " + sprite.index);
        // CANCEL ASSIST PROMPT
        this.LevelPlay.assistPromptStop();
        this.LevelPlay.game.ticking=true;
        // VAR 1 = THE CLICKED ATTACK HUB
        this.LevelPlay.game.DATA_QuestionHub = sprite.index;
        
        // IF THE CLICKED HUB DAMAGE LT 1 - IGNORE CLICK
		if(this.LevelPlay.game.AttackHubs[this.LevelPlay.game.DATA_QuestionHub].damage < 1)
		{
             return;
        }
        
        // SET THE GAME STATE TO QUESTION
        this.LevelPlay.game.STATE = 'QUESTION';
        this.LevelPlay.refresh_UI();
        
        // HIDE ALL PREVIOUS ANSWER RESPONSES - SHOULD ALREADY BE HIDDEN (VIA TWEEN) BUT JUST IN CASE
        this.LevelPlay.game.SCREEN_CorrectAnswerText.alpha = 0;
        this.LevelPlay.game.SCREEN_CorrectAnswerText2.alpha = 0;
        this.LevelPlay.game.SCREEN_IncorrectAnswerText.alpha = 0;
        this.LevelPlay.game.SCREEN_IncorrectAnswerText2.alpha = 0;
        this.LevelPlay.game.SCREEN_IncorrectAnswerText3.alpha = 0;
                
        
        // XML POSITIONING
        var x = this.LevelPlay.game.SETUP_Questions.getElementsByTagName("questionSet");
        if (this.LevelPlay.game.QuestionLevel == 1){
            y = this.LevelPlay.game.QuestionListLevel1[0];
        } else if (this.LevelPlay.game.QuestionLevel == 2){
            y = this.LevelPlay.game.QuestionListLevel2[0];
        } else {
            y = this.LevelPlay.game.QuestionListLevel3[0];
        }
        this.LevelPlay.game.CurrentQuestion = y;
        
        // Correct Answer
        this.LevelPlay.game.CurrentCorrectAnswer = (x[y].getElementsByTagName("ca")[0].childNodes[0].nodeValue);
        this.LevelPlay.game.CurrentCorrectAnswer = parseInt(this.LevelPlay.game.CurrentCorrectAnswer);
        
        /* REMOVED - ONLY ONE TYPE
        // Button Size, Question & Answer Formats
        var ButtonSize = (x[y].getElementsByTagName("buttonSize")[0].childNodes[0].nodeValue);
        var QuestionFormat = (x[y].getElementsByTagName("qformat")[0].childNodes[0].nodeValue);
        var AanswerFormat = (x[y].getElementsByTagName("aformat")[0].childNodes[0].nodeValue);
        */
        
        // GET QUESTION & ANSWER VALUES FROM QUESTIONS XML
        var QQ = (x[y].getElementsByTagName("question")[0].childNodes[0].nodeValue);
        var A1 = (x[y].getElementsByTagName("a1")[0].childNodes[0].nodeValue);
        var A2 = (x[y].getElementsByTagName("a2")[0].childNodes[0].nodeValue);
        var A3 = (x[y].getElementsByTagName("a3")[0].childNodes[0].nodeValue);
        var A4 = (x[y].getElementsByTagName("a4")[0].childNodes[0].nodeValue);
        
        // SET QUESTION IMAGE THEN SHOW
        this.LevelPlay.game.SPRITE_QuestionImage.loadTexture(QQ);
        this.LevelPlay.game.SPRITE_QuestionImage.alpha = 1;
        this.LevelPlay.game.GROUP_Question.alpha = 1;
        
        
        // ENABLE INPUT (CLICKABLE) ON ANSWER BUTTONS
        var i;
        for (var i = 1; i <= 4; i++) {
			this.LevelPlay.game['SPRITE_Answer' + i + '_ButtonLarge'].inputEnabled = true;
        }
                
        // SET ANSWER IMAGES THEN SHOW
        this.LevelPlay.game.SPRITE_Answer1_ImageLarge.loadTexture(A1);
        this.LevelPlay.game.SPRITE_Answer2_ImageLarge.loadTexture(A2);
        this.LevelPlay.game.SPRITE_Answer3_ImageLarge.loadTexture(A3);
        this.LevelPlay.game.SPRITE_Answer4_ImageLarge.loadTexture(A4);
        
        this.LevelPlay.game.GROUP_Answer1.alpha = 1;
        this.LevelPlay.game.GROUP_Answer2.alpha = 1;
        this.LevelPlay.game.GROUP_Answer3.alpha = 1;
        this.LevelPlay.game.GROUP_Answer4.alpha = 1;
        
        
        // PLAY CLICK (START QUESTION) SOUND
        //this.LevelPlay.sound.play('SOUND-Select', 0.5, false);
        soundSelect.play();
        
    },
    
    
    
    setDamage: function (HUB, DMG) {
        // SET THE DAMAGE TO THE ATTACKING HUB
		this.LevelPlay.game.AttackHubs[HUB].Sprite.loadTexture('SPRITE-AttackHub' + DMG); 
		if(DMG <=0 )
		{
			this.LevelPlay.game.AttackHubs[HUB].Sprite.alpha = .5;
		}
			
		this.LevelPlay.game.AttackHubs[HUB].damage=DMG;
        // ARE ALL HUBS DAMAGE BELOW ZERO?
        this.hubAlive = 0;
		for(var i = 0; i < this.LevelPlay.game.AttackHubs.length; i++)
		{
			if(this.LevelPlay.game.AttackHubs[i].damage > 0)
			{
				this.hubAlive++;
				//break;//don't really need to know exact number, as long as more than 1.
			}
			
		}
		console.log(this.hubAlive);
        if (this.hubAlive <= 0) {
			this.LevelPlay.game.Director.setCallback(this.LevelPlay.levelSuccess);
            //this.LevelPlay.levelSuccess();
        };
    },
	
    weakestHub: function () {
        // Locate most damaged Hub
		var lowest=99999999999;
		var return_index=0;
        for (var i = 0; i < this.LevelPlay.game.AttackHubs.length; i++) {
			if(this.LevelPlay.game.AttackHubs[i].damage <= lowest)
			{
				return_index = i;
				lowest = this.LevelPlay.game.AttackHubs[i].damage;
				
			}
		}
		return return_index;
		
    },
    
    strongestHub: function () {
        // Locate least damaged Hub
		var highest=0;
		var return_index=0;
        for (var i = 0; i < this.LevelPlay.game.AttackHubs.length; i++) {
			if(this.LevelPlay.game.AttackHubs[i].damage >= highest)
			{
				return_index = i;
				highest = this.LevelPlay.game.AttackHubs[i].damage;
				
			}
		}
		return return_index;
    },
    
    
    hubDestroyed: function (hubDestroyedNumber) {//TODO: need to refactor this one
        //this is to prevent powerup on towers that have already been destroyed.
        if (hubDestroyedNumber == 0 && this.LevelPlay.game.HubDestroyed0 == 0) {
            this.LevelPlay.game.HubDestroyed0 = 1;
            return this.LevelPlay.powerUpChance();
        }
        
        if (hubDestroyedNumber == 1 && this.LevelPlay.game.HubDestroyed1 == 0) {
            this.LevelPlay.game.HubDestroyed1 = 1;
            return this.LevelPlay.powerUpChance();
        }
        
        if (hubDestroyedNumber == 2 && this.LevelPlay.game.HubDestroyed2 == 0) {
            this.LevelPlay.game.HubDestroyed2 = 1;
            return this.LevelPlay.powerUpChance();
        }
        
        if (hubDestroyedNumber == 3 && this.LevelPlay.game.HubDestroyed3 == 0) {
            this.LevelPlay.game.HubDestroyed3 = 1;
            return this.LevelPlay.powerUpChance();
        }
    }
    
};
