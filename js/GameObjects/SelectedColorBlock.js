/**
 * Created by morganowen on 23/01/16.
 */

SelectedColorBlock = function (x, y, amountPerRow, blockSize) {

    this.x = x;
    this.y = y;
    this.perRow = amountPerRow;
    this.blockSize = blockSize;
    this.blocks = [];
    this.merging = false;
    this.mergingTimer = 300;
};

SelectedColorBlock.prototype.Add = function (tile) {
    var block = game.add.sprite(tile.x, tile.y, 'tile');
    block.tint = tile.color;
    block.color = tile.color;
    block.anchor.setTo(0.5, 0.5);
    var newPos = this._getNewPosition();
    var scaleX = (this.blockSize / block.width);
    var scaleY = (this.blockSize / block.height);
    game.add.tween(block).to({
        x: newPos.x + this.blockSize / 2,
        y: newPos.y
    }, 1000, Phaser.Easing.Exponential.Out, true);
    game.add.tween(block.scale).to({x: scaleX, y: scaleY}, 1000, Phaser.Easing.Exponential.Out, true);

    this.blocks.push(block);
};

SelectedColorBlock.prototype.UpdateMerging = function (mergeTarget) {
    if (this.blocks.length > 0) {
        if (!this.merging) {
            this.merging = true;
            var selBlock = this.blocks[this.blocks.length - 1];
            var tween = game.add.tween(selBlock).to({
                x: mergeTarget.x ,
                y: mergeTarget.y
            }, this.mergingTimer, Phaser.Easing.Exponential.InOut, true);
            if(this.mergingTimer > 30) this.mergingTimer -=30;
            var me = this;
            tween.onComplete.add(function() {
                mergeTarget.blendColor(selBlock.color);
                me.merging = false;
                me.RemovePrevious();
            })

        }
    }
    else{
        this.mergingTimer = 300;
        return -1;
    }

    return 0;
};

SelectedColorBlock.prototype.RemovePrevious = function () {
    var block = this.blocks.splice(this.blocks.length - 1, 1);
    block[0].destroy();
};

SelectedColorBlock.prototype.Clear = function () {
    this.blocks.forEach(function (block) {
        block.destroy()
    });
    this.blocks = [];
};

SelectedColorBlock.prototype._getNewPosition = function () {
    var y = this.y + Math.floor(this.blocks.length / this.perRow) * this.blockSize;
    var x = this.x + (this.blocks.length % this.perRow) * this.blockSize;
    return {'x': x, 'y': y};

};