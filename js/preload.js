var Preload = function(game){};

Preload.prototype = {

	init: function (){

		var me = this;

		var style = {
			font: "32px Arial",
			fill: "#ffffff",
			align: "center"
		};

		this.text = this.add.text(me.game.world.centerX, me.game.world.centerY, "Loading: 0%", style);
		this.text.anchor.x = 0.5;
	},

	preload: function(){
		this.game.load.image('tile','assets/tile.png');
	},

	fileLoaded: function(progress){
		this.text.text = "Loading: " + progress + "%";
	},

	create: function(){
		this.game.state.start("Main");
	}

};