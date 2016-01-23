/**
 * Created by morganowen on 23/01/16.
 */

SelectedColorBlock = function (x, y, amountPerRow,blockSize) {

    this.x = x;
    this.y = y;
    this.perRow = amountPerRow;
    this.blockSize = blockSize;
    this.blocks = [];
};

SelectedColorBlock.prototype.Add = function(tile)
{
    var block = game.add.sprite(tile.x , tile.y, 'tile');
    block.tint = tile.color;
    var newPos = this._getNewPosition();
    var scaleX = (this.blockSize/block.width);
    var scaleY = (this.blockSize/block.height);
    game.add.tween(block).to({x:newPos.x,y:newPos.y}, 1000, Phaser.Easing.Exponential.Out, true);
    game.add.tween(block.scale).to({x: scaleX,y:scaleY}, 1000, Phaser.Easing.Exponential.Out, true);

    this.blocks.push(block);
};

SelectedColorBlock.prototype.RemovePrevious = function(){
    var block = this.blocks.splice(this.blocks.length-1,1);
    console.log(block);
    block[0].destroy();
};

SelectedColorBlock.prototype.Clear = function(){
    this.blocks.forEach(function(block){block.destroy()});
    this.blocks = [];
};

SelectedColorBlock.prototype._getNewPosition =  function(){
        var y = this.y + Math.floor(this.blocks.length/this.perRow) * this.blockSize;
        var x = this.x + (this.blocks.length%this.perRow) * this.blockSize;
        return {'x':x,'y':y};

};