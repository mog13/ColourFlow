var Main = function (game) {

};
var seed = Date.now();
var random = new Phaser.RandomDataGenerator([seed]);

Main.prototype = {

    create: function () {

    },


    update: function () {

    },

    gameOver: function () {
        this.game.state.start('GameOver');
    }



}
;