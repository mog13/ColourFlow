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
    this.colors = [];
    game.add.existing(this);

    this.pulse1 = game.add.tween(this.scale).to({x: 1.15, y: 1.15}, 100, Phaser.Easing.Linear.InOut, false);
    this.pulse2 = game.add.tween(this.scale).to({x: 1, y: 1}, 100, Phaser.Easing.Linear.InOut, false);
    this.pulse1.chain(this.pulse2);
};

PreviewTile.prototype = Object.create(Phaser.Sprite.prototype);
PreviewTile.prototype.constructor = PreviewTile;


PreviewTile.prototype.blendColor = function(color)
{
    this.colors.push(color);
    var r =0, g =0,b=0;
    this.colors.forEach(function(color){
        r += Phaser.Color.getRed(color);
        g += Phaser.Color.getGreen(color);
        b += Phaser.Color.getBlue(color);
    });

    r/= this.colors.length;
    g/= this.colors.length;
    b/= this.colors.length;

    var newCol = Phaser.Color.getColor(r,g,b);
    this.color= newCol;
    this.tint = this.color;
   this.pulse1.start();

};

PreviewTile.prototype.ClearCols = function(){
    this.colors = [];

};
