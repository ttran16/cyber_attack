Questions = function (LP) {
	this.LevelPlay = LP;
	console.log("data initialized");
};

Questions.prototype = {
    
	
	
    //QUESTION GROUP
    Init: function () {
        // BUILD QUESTION LISTS BY LEVEL
        this.LevelPlay.game.QuestionListLevel1 = [];
        this.LevelPlay.game.QuestionListLevel2 = [];
        this.LevelPlay.game.QuestionListLevel3 = [];
        
        var Questions = this.LevelPlay.game.SETUP_Questions.getElementsByTagName("questionSet");
        for ( var i = 0; i < Questions.length ; i++ )
        {
            this.LevelPlay.game.SETUP_Questions_NumberOfQuestions++;
            var x = this.LevelPlay.game.SETUP_Questions.getElementsByTagName("questionSet");
            var y = i;
            
            // QUESTION DIFFICULTY LEVEL
            var QL = (x[y].getElementsByTagName("qlevel")[0].childNodes[0].nodeValue);
            
            if (QL == 1){
                this.LevelPlay.game.QuestionListLevel1.push(i);
            }else if (QL == 2){
                this.LevelPlay.game.QuestionListLevel2.push(i);
            }else{
                this.LevelPlay.game.QuestionListLevel3.push(i);   
            }
        }
        
        this.LevelPlay.game.QuestionListLevel1 = this.shuffleQuestions(this.LevelPlay.game.QuestionListLevel1);
        this.LevelPlay.game.QuestionListLevel2 = this.shuffleQuestions(this.LevelPlay.game.QuestionListLevel2);
        this.LevelPlay.game.QuestionListLevel3 = this.shuffleQuestions(this.LevelPlay.game.QuestionListLevel3);
        
        
        // QUESTION SCREEN OVERLAY
        this.LevelPlay.game.SPRITE_QuestionOverlay = this.LevelPlay.add.sprite(514, 379, 'BG-QOverlay');
        this.LevelPlay.game.SPRITE_QuestionOverlay.anchor.setTo(0.50, 0.50);
        
        // QUESTION IMAGE
        this.LevelPlay.game.SPRITE_QuestionImage = this.LevelPlay.add.sprite(this.LevelPlay.game.SPRITE_QuestionOverlay.x, this.LevelPlay.game.SPRITE_QuestionOverlay.y+50, 'nullImage');
        this.LevelPlay.game.SPRITE_QuestionImage.anchor.setTo(0.50, 1);
        
        // QUESTION GROUP
        this.LevelPlay.game.GROUP_Question = this.LevelPlay.add.group();
        this.LevelPlay.game.GROUP_Question.add(this.LevelPlay.game.SPRITE_QuestionOverlay);
        this.LevelPlay.game.GROUP_Question.add(this.LevelPlay.game.SPRITE_QuestionImage);
        this.LevelPlay.game.GROUP_Question.alpha = 0;        
        
        
        
        
        
        // LOAD ANSWER BUTTONS
        this.LevelPlay.game.SPRITE_Answer1_ButtonLarge = this.LevelPlay.add.sprite(this.LevelPlay.game.SPRITE_QuestionOverlay.x - 236, this.LevelPlay.game.SPRITE_QuestionOverlay.y + 150, 'SPRITE-AnswerButtonLarge');
        this.LevelPlay.game.SPRITE_Answer2_ButtonLarge = this.LevelPlay.add.sprite(this.LevelPlay.game.SPRITE_QuestionOverlay.x - 236, this.LevelPlay.game.SPRITE_QuestionOverlay.y + 250, 'SPRITE-AnswerButtonLarge');
        this.LevelPlay.game.SPRITE_Answer3_ButtonLarge = this.LevelPlay.add.sprite(this.LevelPlay.game.SPRITE_QuestionOverlay.x + 236, this.LevelPlay.game.SPRITE_QuestionOverlay.y + 150, 'SPRITE-AnswerButtonLarge');        
        this.LevelPlay.game.SPRITE_Answer4_ButtonLarge = this.LevelPlay.add.sprite(this.LevelPlay.game.SPRITE_QuestionOverlay.x + 236, this.LevelPlay.game.SPRITE_QuestionOverlay.y + 250, 'SPRITE-AnswerButtonLarge');
        
        this.LevelPlay.game.SPRITE_Answer1_ButtonLarge.anchor.setTo(0.50, 0.50);
        this.LevelPlay.game.SPRITE_Answer2_ButtonLarge.anchor.setTo(0.50, 0.50);
        this.LevelPlay.game.SPRITE_Answer3_ButtonLarge.anchor.setTo(0.50, 0.50);
        this.LevelPlay.game.SPRITE_Answer4_ButtonLarge.anchor.setTo(0.50, 0.50);
        
        this.LevelPlay.game.SPRITE_Answer1_ButtonLarge.inputEnabled = false;
        this.LevelPlay.game.SPRITE_Answer2_ButtonLarge.inputEnabled = false;
        this.LevelPlay.game.SPRITE_Answer3_ButtonLarge.inputEnabled = false;
        this.LevelPlay.game.SPRITE_Answer4_ButtonLarge.inputEnabled = false;
                
        this.LevelPlay.game.SPRITE_Answer1_ButtonLarge.events.onInputDown.add( function() { this.submitAnswer(this.LevelPlay.game.DATA_QuestionHub,1); }, this );
        this.LevelPlay.game.SPRITE_Answer2_ButtonLarge.events.onInputDown.add( function() { this.submitAnswer(this.LevelPlay.game.DATA_QuestionHub,2); }, this );
        this.LevelPlay.game.SPRITE_Answer3_ButtonLarge.events.onInputDown.add( function() { this.submitAnswer(this.LevelPlay.game.DATA_QuestionHub,3); }, this );
        this.LevelPlay.game.SPRITE_Answer4_ButtonLarge.events.onInputDown.add( function() { this.submitAnswer(this.LevelPlay.game.DATA_QuestionHub,4); }, this );
        
        // LOAD ANSWER IMAGES (NULL)
        this.LevelPlay.game.SPRITE_Answer1_ImageLarge = this.LevelPlay.add.sprite((this.LevelPlay.game.SPRITE_Answer1_ButtonLarge.x), (this.LevelPlay.game.SPRITE_Answer1_ButtonLarge.y), 'nullImage');
        this.LevelPlay.game.SPRITE_Answer2_ImageLarge = this.LevelPlay.add.sprite((this.LevelPlay.game.SPRITE_Answer2_ButtonLarge.x), (this.LevelPlay.game.SPRITE_Answer2_ButtonLarge.y), 'nullImage');
        this.LevelPlay.game.SPRITE_Answer3_ImageLarge = this.LevelPlay.add.sprite((this.LevelPlay.game.SPRITE_Answer3_ButtonLarge.x), (this.LevelPlay.game.SPRITE_Answer3_ButtonLarge.y), 'nullImage');
        this.LevelPlay.game.SPRITE_Answer4_ImageLarge = this.LevelPlay.add.sprite((this.LevelPlay.game.SPRITE_Answer4_ButtonLarge.x), (this.LevelPlay.game.SPRITE_Answer4_ButtonLarge.y), 'nullImage');
        
        this.LevelPlay.game.SPRITE_Answer1_ImageLarge.anchor.setTo(0.50, 0.50);
        this.LevelPlay.game.SPRITE_Answer2_ImageLarge.anchor.setTo(0.50, 0.50);
        this.LevelPlay.game.SPRITE_Answer3_ImageLarge.anchor.setTo(0.50, 0.50);
        this.LevelPlay.game.SPRITE_Answer4_ImageLarge.anchor.setTo(0.50, 0.50);
        
        // CREATE ANSWER GROUPS
        this.LevelPlay.game.GROUP_Answer1 = this.LevelPlay.add.group();
        this.LevelPlay.game.GROUP_Answer2 = this.LevelPlay.add.group();
        this.LevelPlay.game.GROUP_Answer3 = this.LevelPlay.add.group();
        this.LevelPlay.game.GROUP_Answer4 = this.LevelPlay.add.group();
        
        this.LevelPlay.game.GROUP_Answer1.alpha = 0;
        this.LevelPlay.game.GROUP_Answer2.alpha = 0;
        this.LevelPlay.game.GROUP_Answer3.alpha = 0;
        this.LevelPlay.game.GROUP_Answer4.alpha = 0;
        
        this.LevelPlay.game.GROUP_Answer1.add(this.LevelPlay.game.SPRITE_Answer1_ButtonLarge);
        this.LevelPlay.game.GROUP_Answer1.add(this.LevelPlay.game.SPRITE_Answer1_ImageLarge);
        this.LevelPlay.game.GROUP_Answer2.add(this.LevelPlay.game.SPRITE_Answer2_ButtonLarge);
        this.LevelPlay.game.GROUP_Answer2.add(this.LevelPlay.game.SPRITE_Answer2_ImageLarge);
        this.LevelPlay.game.GROUP_Answer3.add(this.LevelPlay.game.SPRITE_Answer3_ButtonLarge);
        this.LevelPlay.game.GROUP_Answer3.add(this.LevelPlay.game.SPRITE_Answer3_ImageLarge);
        this.LevelPlay.game.GROUP_Answer4.add(this.LevelPlay.game.SPRITE_Answer4_ButtonLarge);
        this.LevelPlay.game.GROUP_Answer4.add(this.LevelPlay.game.SPRITE_Answer4_ImageLarge);
                
        
        
        // ANSWER RESPONSE GROUP - CORRECT & INCORRECT
        this.LevelPlay.game.SPRITE_AnswerOverlay = this.LevelPlay.add.sprite(514, 379, 'BG-QOverlay');
        this.LevelPlay.game.SCREEN_CorrectAnswerText = this.LevelPlay.game.add.text(this.LevelPlay.game.SPRITE_AnswerOverlay.x, this.LevelPlay.game.SPRITE_AnswerOverlay.y+50, 'CORRECT! \n You have damaged the attacking site.', { font: "20pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2,  align: "center" });
        this.LevelPlay.game.SCREEN_CorrectAnswerText2 = this.LevelPlay.game.add.text(this.LevelPlay.game.SPRITE_AnswerOverlay.x, this.LevelPlay.game.SPRITE_AnswerOverlay.y+50, 'CORRECT! \n You have taken the attacking\n site offline.', { font: "20pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2,  align: "center" });
        
        this.LevelPlay.game.SCREEN_IncorrectAnswerText = this.LevelPlay.game.add.text(this.LevelPlay.game.SPRITE_AnswerOverlay.x, this.LevelPlay.game.SPRITE_AnswerOverlay.y+50, 'INCORRECT! \n An attacking site has been repaired.', { font: "20pt Courier", fill: "#e20000", stroke: "#b90000", strokeThickness: 2, align: "center" });
        this.LevelPlay.game.SCREEN_IncorrectAnswerText2 = this.LevelPlay.game.add.text(this.LevelPlay.game.SPRITE_AnswerOverlay.x, this.LevelPlay.game.SPRITE_AnswerOverlay.y+50, 'INCORRECT! \n A previously offline site\n has been restored.', { font: "20pt Courier", fill: "#e20000", stroke: "#b90000", strokeThickness: 2, align: "center" });
        this.LevelPlay.game.SCREEN_IncorrectAnswerText3 = this.LevelPlay.game.add.text(this.LevelPlay.game.SPRITE_AnswerOverlay.x, this.LevelPlay.game.SPRITE_AnswerOverlay.y+50, 'INCORRECT! \n All attacking sites are full stregth.', { font: "20pt Courier", fill: "#e20000", stroke: "#b90000", strokeThickness: 2, align: "center" });
        
        this.LevelPlay.game.SPRITE_AnswerOverlay.anchor.setTo(0.50, 0.50);
        this.LevelPlay.game.SCREEN_CorrectAnswerText.anchor.setTo(0.50, 0.50);
        this.LevelPlay.game.SCREEN_CorrectAnswerText2.anchor.setTo(0.50, 0.50);
        this.LevelPlay.game.SCREEN_IncorrectAnswerText.anchor.setTo(0.50, 0.50);
        this.LevelPlay.game.SCREEN_IncorrectAnswerText2.anchor.setTo(0.50, 0.50);
        this.LevelPlay.game.SCREEN_IncorrectAnswerText3.anchor.setTo(0.50, 0.50);
        
        this.LevelPlay.game.GROUP_AnswerResponse = this.LevelPlay.add.group();
        this.LevelPlay.game.GROUP_AnswerResponse.add(this.LevelPlay.game.SPRITE_AnswerOverlay);
        this.LevelPlay.game.GROUP_AnswerResponse.add(this.LevelPlay.game.SCREEN_CorrectAnswerText);
        this.LevelPlay.game.GROUP_AnswerResponse.add(this.LevelPlay.game.SCREEN_CorrectAnswerText2);
        this.LevelPlay.game.GROUP_AnswerResponse.add(this.LevelPlay.game.SCREEN_IncorrectAnswerText);
        this.LevelPlay.game.GROUP_AnswerResponse.add(this.LevelPlay.game.SCREEN_IncorrectAnswerText2);
        this.LevelPlay.game.GROUP_AnswerResponse.add(this.LevelPlay.game.SCREEN_IncorrectAnswerText3);
        this.LevelPlay.game.GROUP_AnswerResponse.alpha = 0;
    },
	update:function(){},
    
    shuffleQuestions:function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
        
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }        
        return array;
    },
    
    
    submitAnswer: function (hubNumber, answer) {        
        // hubNumber = ATTACK HUB CLICKED
        // answer = SUBMITTED ANSWER
        
        // GET CORRECT ANSWER
        //var x = this.LevelPlay.game.SETUP_Questions.getElementsByTagName("questionSet");
        //var y = this.LevelPlay.game.DATA_QuestionIndex;
        //var CorrectAnswer = (x[y].getElementsByTagName("ca")[0].childNodes[0].nodeValue);
        
        // SET THE GAME STATE TO PLAY
        this.LevelPlay.game.STATE = 'PLAY';
        this.LevelPlay.refresh_UI();
        
        // HIDE ALL QUESTIONS, ANSWERS & BUTTONS
        this.LevelPlay.game.GROUP_Question.alpha = 0;
        this.LevelPlay.game.GROUP_Answer1.alpha = 0;
        this.LevelPlay.game.GROUP_Answer2.alpha = 0;
        this.LevelPlay.game.GROUP_Answer3.alpha = 0;
        this.LevelPlay.game.GROUP_Answer4.alpha = 0;
        
        // DEACTIVATE ALL ANSWER BUTTONS TO PREVENT CLICK
        this.LevelPlay.game.SPRITE_Answer1_ButtonLarge.inputEnabled = false;
        this.LevelPlay.game.SPRITE_Answer2_ButtonLarge.inputEnabled = false;
        this.LevelPlay.game.SPRITE_Answer3_ButtonLarge.inputEnabled = false;
        this.LevelPlay.game.SPRITE_Answer4_ButtonLarge.inputEnabled = false;
        
        
        // IS ANSWER CORRECT OR INCORRECT
        if (answer == this.LevelPlay.game.CurrentCorrectAnswer) {
            
            
            // EXPLOSION ON ATTACKING HUB
			console.log(this.LevelPlay.game);
			var atkhub = this.LevelPlay.game.AttackHubs[this.LevelPlay.game.DATA_QuestionHub];
			this.LevelPlay.game.GROUP_Explosion.alpha = 1;
            this.LevelPlay.game.SPRITE_Explosion.reset(atkhub.x, atkhub.y);
            this.LevelPlay.game.SPRITE_Explosion.animations.play('Explode', 15, false);
            this.LevelPlay.game.add.tween(this.LevelPlay.game.GROUP_Explosion).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            
            
            // DAMAGE LOWERED (DAMAGED) TO ATTACK HUB
			//this.LevelPlay.game.AttackHubs[this.LevelPlay.game.DATA_QuestionHub].damage--;
			this.LevelPlay.Hubs.setDamage(this.LevelPlay.game.DATA_QuestionHub,this.LevelPlay.game.AttackHubs[this.LevelPlay.game.DATA_QuestionHub].damage-1);
			var bonus=false;
			var hubhealth = this.LevelPlay.game.AttackHubs[this.LevelPlay.game.DATA_QuestionHub].damage;
			if (hubhealth == 0) {
                // IF DAMAGE IS ZERO - HUB POWERED DOWN
                // SHOW "POWERED DOWN" ANSWER RESPONSE
                this.LevelPlay.game.SCREEN_CorrectAnswerText2.alpha = 1;
                // PLAY "POWERED DOWN" SOUND
                //this.LevelPlay.sound.play('SOUND-AttackHubPowerDown', 0.5, false);
                //soundAttackHubPowerDown.play();
				
				this.LevelPlay.game.Director.say('AttackHubPowerDown',1);
                // HUB DESTROYED
                bonus=this.LevelPlay.Hubs.hubDestroyed(hubNumber);
            } else {
                // HUB DAMAGED BUT STILL ACTIVE
                // SHOW "CORRECT ANSWER" RESPONSE
                this.LevelPlay.game.SCREEN_CorrectAnswerText.alpha = 1;
                //this.LevelPlay.sound.play('SOUND-AttackHubHit', 0.5, false);
                //soundAttackHubHit.play();
				this.LevelPlay.game.Director.say('AttackHubHit',1);
            }
			
            if((!bonus)&&(this.LevelPlay.Hubs.hubAlive>0))
			this.LevelPlay.game.Director.enqueue('correct',1);
		
			
            // FADE OUT ANSWER RESPONSES
            this.LevelPlay.game.add.tween(this.LevelPlay.game.GROUP_AnswerResponse).to( { alpha: 0 }, 2250, Phaser.Easing.Linear.None, true, 0, 0, false);
                                    
            // SEND DAMAGE TO THE HUB (SEE SETDAMAGE)
            this.LevelPlay.Hubs.setDamage(this.LevelPlay.game.DATA_QuestionHub, hubhealth);
            
            
            // REMOVE QUESTION FROM QUESTIONLIST
            if (this.LevelPlay.game.QuestionLevel == 1) {
                this.LevelPlay.game.QuestionListLevel1.shift();
                this.LevelPlay.game.AnswersCorrect++;
            } else if (this.LevelPlay.game.QuestionLevel == 2) {
                this.LevelPlay.game.QuestionListLevel2.shift();
                this.LevelPlay.game.AnswersCorrect++;
            } else {
                this.LevelPlay.game.QuestionListLevel3.shift();
                this.LevelPlay.game.AnswersCorrect++;
            }
            
            // UP THE QUESTION DIFFICULTY?
            if (this.LevelPlay.game.AnswersCorrect == 3) {
                if (this.LevelPlay.game.QuestionLevel < 3) {
                    this.LevelPlay.game.QuestionLevel++;
                    this.LevelPlay.game.AnswersCorrect = 0;
                } else {
                    this.LevelPlay.game.AnswersCorrect = 0;
                }
            }
            
        
        } else {
            
            // PLAY INCORRECT ANSWER SOUND EFFECT
            //this.LevelPlay.sound.play('SOUND-Incorrect', 0.5, false);
			//this.LevelPlay.game.Director.say('incorrect',1);
			
			this.LevelPlay.game.Director.enqueue('wrong',1);
			this.LevelPlay.game.Director.enqueue('incorrect',1);
			this.LevelPlay.game.Director.startTalking();
			
            var hubRepaired = -1;
            var hubRestored = -1;   
            //soundIncorrect.play();
			var RepairHub;
			//repair weakest hub
			var repair_index = this.LevelPlay.Hubs.weakestHub();
			if(this.LevelPlay.game.AttackHubs[repair_index].damage < this.LevelPlay.game.AttackHubs[repair_index].max_damage)
			{
				if(this.LevelPlay.game.AttackHubs[repair_index].damage <=0)
				{
					hubRestored = repair_index;
					
				}
				else
				{
					hubRepaired = repair_index;
				}
				this.LevelPlay.Hubs.setDamage(repair_index, parseInt(this.LevelPlay.game.AttackHubs[repair_index].damage) + 1);
				this.LevelPlay.game.AttackHubs[repair_index].Sprite.alpha = 1;
				RepairHub = this.LevelPlay.game.AttackHubs[repair_index];
				
				console.log("repairing " + repair_index);
			}
			else
			{
				console.log('nothing to repair');
				
			}
            
            // HIDE ALL ANSWER RESPONSES
            this.LevelPlay.game.GROUP_AnswerResponse.alpha = 1;
            this.LevelPlay.game.SCREEN_CorrectAnswerText.alpha = 0;
            this.LevelPlay.game.SCREEN_CorrectAnswerText2.alpha = 0;
            this.LevelPlay.game.SCREEN_IncorrectAnswerText.alpha = 0;
            this.LevelPlay.game.SCREEN_IncorrectAnswerText2.alpha = 0;
            
			
			
            // SHOW APPROPRIATE "REPAIR" MESSAGE
            if (hubRestored >= 0 ) {
                // SHOW "RESTORED" MESSAGE
                this.LevelPlay.game.SCREEN_IncorrectAnswerText2.alpha = 1;
                
                // PLAY POWERUP SOUND
                //this.LevelPlay.sound.play('SOUND-AttackHubPowerUp', 0.5, false);
                //soundAttackHubPowerUp.play();
                
                // PLAY HUBREPAIR ANIMATION
                this.LevelPlay.game.GROUP_HubRepair.alpha = 1;
                this.LevelPlay.game.SPRITE_HubRepair.reset(RepairHub.x, RepairHub.y);
                this.LevelPlay.game.SPRITE_HubRepair.animations.play('Repair', 15, true);
                this.LevelPlay.game.add.tween(this.LevelPlay.game.GROUP_HubRepair).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                
            } else if (hubRepaired >= 0) {
                // SHOW "REPAIRED" MESSAGE
                this.LevelPlay.game.SCREEN_IncorrectAnswerText.alpha = 1;
                
                // PLAY HUBREPAIR ANIMATION
                this.LevelPlay.game.GROUP_HubRepair.alpha = 1;
                this.LevelPlay.game.SPRITE_HubRepair.reset(RepairHub.x, RepairHub.y);
                this.LevelPlay.game.SPRITE_HubRepair.animations.play('Repair', 15, true);
                this.LevelPlay.game.add.tween(this.LevelPlay.game.GROUP_HubRepair).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                
            } else {
                // SHOW INCORRECT ANSWER MESSAGE - NO REAPIRS
                this.LevelPlay.game.SCREEN_IncorrectAnswerText3.alpha = 1;
            }
            
            // FADE OUT ANSWER RESPONSE MESSAGES 
            this.LevelPlay.game.add.tween(this.LevelPlay.game.GROUP_AnswerResponse).to( { alpha: 0 }, 2250, Phaser.Easing.Linear.None, true, 0, 0, false);
            
            // PLACE MISSED QUESTION AT END OF QUESTIONLIST
            if (this.LevelPlay.game.QuestionLevel == 1) {
                x = this.LevelPlay.game.QuestionListLevel1[0];
                this.LevelPlay.game.QuestionListLevel1.shift();
                this.LevelPlay.game.QuestionListLevel1.push(x);
                this.LevelPlay.game.AnswersCorrect = 0;
            } else if (this.LevelPlay.game.QuestionLevel == 2) {
                x = this.LevelPlay.game.QuestionListLevel2[0];
                this.LevelPlay.game.QuestionListLevel2.shift();
                this.LevelPlay.game.QuestionListLevel2.push(x);
                this.LevelPlay.game.QuestionLevel = 1;
                this.LevelPlay.game.AnswersCorrect = 0;                
            } else {
                x = this.LevelPlay.game.QuestionListLevel3[0];
                this.LevelPlay.game.QuestionListLevel3.shift();
                this.LevelPlay.game.QuestionListLevel3.push(x);
                this.LevelPlay.game.QuestionLevel = 2;
                this.LevelPlay.game.AnswersCorrect = 0; 
            }
            
        }
        
        // ADVANCE THE QUESTION INDEX
        // THIS SHOULD EVENTUALLY BE MADE INTO A FUNCTION SO RANDOM QUESTIONS WILL BE SELECTED
        // this.LevelPlay.game.DATA_QuestionIndex ++;
        
        // VERIFY NEXT QUESTION IN LIST IS VALIDATED OR IF EMPTY
        this.questionValidation();
        
    },
    
    
    questionValidation: function() {
        
        // DO WE HAVE ANY QUESTIONS LEFT?
        if (this.LevelPlay.game.QuestionListLevel1.length == 0 && this.LevelPlay.game.QuestionListLevel2.length == 0 && this.game.QuestionListLevel3.length == 0) {
            this.LevelPlay.game.state.start('LevelFailure');   
        }
        
        // FORCE LEVEL 3 QUESTIONS WHEN ONLY 1 HUB REMAINS
        var hubsRemaining = 0;
        for (var i = 0; i <= 3; i++) {
			y = this.LevelPlay.game.AttackHubs[i].damage;
            
            if (y >= 1) {
                hubsRemaining++;
            };
        };
        if (hubsRemaining ==1) {
             this.LevelPlay.game.QuestionLevel = 3;  
        }
        
        // COMPENSATE FOR NO QUESTIONS LEFT IN QUESTION LEVEL 1
        if (this.LevelPlay.game.QuestionLevel == 1 && this.LevelPlay.game.QuestionListLevel1.length == 0) {
            this.LevelPlay.game.QuestionLevel = 2;
        }
        
        // COMPENSATE FOR NO QUESTIONS LEFT IN QUESTION LEVEL 2
        if (this.LevelPlay.game.QuestionLevel == 2 && this.LevelPlay.game.QuestionListLevel2.length == 0) {
            this.LevelPlay.game.QuestionLevel = 3;
        }
        
        // COMPENSATE FOR NO QUESTIONS LEFT IN QUESTION LEVEL 3
        if (this.LevelPlay.game.QuestionLevel == 3 && this.LevelPlay.game.QuestionListLevel3.length == 0) {
            if (this.LevelPlay.game.QuestionListLevel2.length >= 1) {
                this.LevelPlay.game.QuestionLevel = 2;
            } else {
                this.LevelPlay.game.QuestionLevel = 1;
            }
        }
    }
    
	
};
