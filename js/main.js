var Main = function (game) {

};
var seed = Date.now();
var random = new Phaser.RandomDataGenerator([seed]);

var gridManager;

Main.prototype = {
    create: function () {
        this.gridManager = new GridManager(7,7);
        console.log(this.gridManager);
    },


    update: function () {
        this.gridManager.Update();
    },

    gameOver: function () {
        this.game.state.start('GameOver');
    }



}
;