/**
 * Created by morganowen on 23/01/16.
 */
PreviewTile = function (x,y) {

    Phaser.Sprite.call(this, game, x, y, 'tile');
    this.x = x;
    this.y = y;
    this.anchor.setTo(0.5, 0.5);
    this.size = 128;
    this.color = 0xFFFFFF;
    this.tint = this.color;
    game.add.existing(this);

    this.pulse1 = game.add.tween(this.scale).to({x: 1.15, y: 1.15}, 100, Phaser.Easing.Linear.InOut, false);
    this.pulse2 = game.add.tween(this.scale).to({x: 1, y: 1}, 100, Phaser.Easing.Linear.InOut, false);
    this.pulse1.chain(this.pulse2);
};

PreviewTile.prototype = Object.create(Phaser.Sprite.prototype);
PreviewTile.prototype.constructor = PreviewTile;


PreviewTile.prototype.blendColor = function(color)
{
    var newCol = Phaser.Color.interpolateColor(color,this.color,100,50);
    this.color= newCol;
    this.tint = this.color;
   this.pulse1.start();

};
