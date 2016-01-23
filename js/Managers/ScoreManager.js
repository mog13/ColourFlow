/**
 * Created by morganowen on 23/01/16.
 */
function ScoreManager(x,y){
    this.x = x || game.world.centerX ;
    this.y = y ||  50;

    this.score = 0;
    this.scoreBuffer = 0;

    this.scoreFont = "100px Arial";
    //Create the score label
    this.scoreLabel = game.add.text(this.x, this.y, "0", {font: this.scoreFont, fill: "#ffffff", stroke: "#535353", strokeThickness: 15});
    this.scoreLabel.anchor.setTo(0.5, 0);
    this.scoreLabel.align = 'center';

    //Create a tween to grow / shrink the score label
    this.scoreLabelTween = game.add.tween(this.scoreLabel.scale).to({ x: 1.5, y: 1.5}, 50, Phaser.Easing.Linear.In).to({ x: 1, y: 1}, 50, Phaser.Easing.Linear.In);
}

ScoreManager.prototype.Update = function() {
  if(this.scoreBuffer >0){
      this.deltaScore = Math.ceil(this.scoreBuffer/5);
      this.scoreBuffer -= this.deltaScore;
      this.score += this.deltaScore;
      this.scoreLabel.text = this.score;
  }
};

ScoreManager.prototype.AddScore = function(x,y,amount){
    var floatingScore = game.add.text(x, y, amount, {font: this.scoreFont, fill: "#ffffff", stroke: "#535353", strokeThickness: 15});
    floatingScore.anchor.setTo(0.5, 0);
    floatingScore.align = 'center';
    floatingScore.alpha = 1;
    game.add.tween(floatingScore).to({alpha:0.2},950,Phaser.Easing.Exponential.In, true);
    var tween = game.add.tween(floatingScore).to({
        x: this.x ,
        y: this.y
    }, 1000, Phaser.Easing.Exponential.InOut, true);
    var me = this;
    tween.onComplete.add(function() {
        //me.scoreLabelTween.start();
        me.scoreBuffer += amount;
        floatingScore.destroy();
    })
};