Config = function () {
	console.log('config init');
	this['aspect'] = 4/3;
	
	this['canvas'] = {};
	/* no longer needed since the stage is now made to scale
	var ww = window.innerWidth;
	var wh = window.innerHeight;
	var w = 0;
	var h = 0;
	if(ww/wh < this.aspect)
	{
		w = ww;
		h = ww / this.aspect
	}
	else
	{
		w = wh * this.aspect;
		h = wh;
	}
	*/
	this['canvas']['width'] = 1024;
	this['canvas']['height'] = 768;
	
	this['intro_video'] = {};
	this['intro_video']['width'] = 512;
	this['intro_video']['height'] = 384;
	
	this['main_menu_bg_video'] = {};
	this['main_menu_bg_video']['width'] = 1024;
	this['main_menu_bg_video']['height'] = 768;
	
	
};
