/**
 * Created by morganowen on 23/01/16.
 */
GameTile = function ( x, y) {

    //  We call the Phaser.Sprite passing in the game reference
    Phaser.Sprite.call(this, game, x, y, 'tile');
    this.x = x;
    this.y = y;
    this.anchor.setTo(0.5, 0.5);
    this.orig = {'x': x, 'y': y};
    this.size = 128;
    this.color = Phaser.Color.getRandomColor();
    this.tint = this.color;
    this.selected = false;
    game.add.existing(this);
};

GameTile.prototype = Object.create(Phaser.Sprite.prototype);
GameTile.prototype.constructor = GameTile;

GameTile.prototype.collided = function (x, y) {
    //offset x and y by anchor/sprite origin
    x += this.size/2;
    y += this.size/2;
    var ret = true;
    if (x < this.x || x > this.x + this.size) ret = false;
    if (y < this.y || y > this.y + this.size) ret = false;
    return ret;
};

GameTile.prototype.update = function () {
    if(this.selected){
        this.alpha=0.2;
    }
    else{
        this.alpha = 1;
    }
};



var GameTileColours = [Phaser.Color.getRandomColor(),
    Phaser.Color.getRandomColor(),
    Phaser.Color.getRandomColor(),
    Phaser.Color.getRandomColor()];

