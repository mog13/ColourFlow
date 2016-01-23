/**
 * Created by morganowen on 23/01/16.
 */
function GridManager(width, height) {
    this.width = width;
    this.height = height;
    this.margin = 1;
    this.TILESIZE = 128;

    this.tiles = [];
    this.selectedTiles = [];
    this.orig = {
        x: (game.width / 2) - (width * this.TILESIZE) / 2 + this.TILESIZE / 2
        , y: this.TILESIZE / 2
    };


    this.states = {
        SELECTING: 0,
        CLEARING: 1,
        IDLE: 2
    };

    this.currentState = this.states.IDLE;

    var SizeEnum = {
        SMALL: 1,
        MEDIUM: 2,
        LARGE: 3,
    };

    //Add the tiles
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            this.tiles.push(new GameTile(this.orig.x + (x * ( this.TILESIZE + this.margin)), this.orig.y + (y * (this.TILESIZE + this.margin))));
        }
    }

    this.mouseDown = false;

    game.input.onDown.add(function () {
        this.mouseDown = true;
    }, this);
    game.input.onUp.add(function () {
        this.mouseDown = false;
    }, this);

    console.log(game);
};

GridManager.prototype.Update = function () {

    switch (this.currentState) {
        case(this.states.IDLE):
            if (this.mouseDown) {
                this.currentState = this.states.SELECTING;
            }
            break;
        case(this.states.SELECTING):
            this.UpdateWhenSelecting();
            break;
        case(this.states.CLEARING):
            this.tiles.forEach(function (tile) {
                tile.selected = false;
            });
            this.selectedTiles = [];
            this.currentState = this.states.IDLE;
            break;
    }
    ;

};

GridManager.prototype.UpdateWhenSelecting = function () {
    if (!this.mouseDown) {
        this.currentState = this.states.CLEARING;
    }
    var grid = this;
    this.tiles.forEach(function (tile) {

        if (tile.collided(game.input.x, game.input.y)) {
            //only highlight if near enough or if no selections yet
            if (grid.selectedTiles.length === 0 || grid.DistanceFromPreviousTile(tile, grid.selectedTiles[grid.selectedTiles.length-1]) <= grid.TILESIZE*1.2) {
               if(!tile.selected) {
                   tile.selected = true;
                   grid.selectedTiles.push(tile);
               }
            }
        }
    });
};

GridManager.prototype.DistanceFromPreviousTile = function (tile1, tile2) {
    if(tile2 === undefined) return 0;
    var dx = tile1.x - tile2.x;
    var dy = tile1.y - tile2.y;
    return Math.sqrt((dx * dx) + (dy * dy));
};