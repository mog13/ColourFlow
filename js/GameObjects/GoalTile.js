/**
 * Created by morganowen on 23/01/16.
 */
/**
 * Created by morganowen on 23/01/16.
 */
GoalTile = function (x, y) {

    Phaser.Sprite.call(this, game, x, y, 'tile');
    this.x = x;
    this.y = y;
    this.anchor.setTo(0.5, 0.5);
    this.size = 128;
    this.color = Phaser.Color.getRandomColor();
    this.tint = this.color;
    game.add.existing(this);

    this.pulse1 = game.add.tween(this.scale).to({x: 1.15, y: 1.15}, 100, Phaser.Easing.Linear.InOut, false);
    this.pulse2 = game.add.tween(this.scale).to({x: 1, y: 1}, 100, Phaser.Easing.Linear.InOut, false);
    this.pulse1.chain(this.pulse2);

    this.cycleTimeout = 10;

};

GoalTile.prototype = Object.create(Phaser.Sprite.prototype);
GoalTile.prototype.constructor = PreviewTile;

GoalTile.prototype.UpdateColor = function () {
    this.pulse1.start();
        //if we're going to cycle again we don't care what color we set
        if(this.cycleTimeout < 300){
            this.cycleTimeout *= 1.2;
            this.tint = Phaser.Color.getRandomColor();
            var me = this;
            setTimeout(function(){me.UpdateColor()},this.cycleTimeout)
        }
        else{
            this.tint = this.color;
        }

};

GoalTile.prototype.GenNewColor = function () {
    this.color = Phaser.Color.getRandomColor();
    this.cycleTimeout = 100;
    this.UpdateColor();
};
