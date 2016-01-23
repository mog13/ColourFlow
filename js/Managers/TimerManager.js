/**
 * Created by morganowen on 23/01/16.
 */
TimerManager = function(time,x,y,width, rows)
{
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || game.width;
    this.rows = rows || 5;
    this.time = time || 100;
    this.timerBits = [];

    var bitWidths = this.width/this.time;
    var bitScale = (bitWidths/128) +0.01;

    for(var n=0; n < this.time;n++)
    {

        //each section we make an array for the column
        var timerCol = [];
        for(var r =0; r< this.rows; r++)
        {
            //for each r make a bit and ad it to the column
            var timerBit;
            timerBit = game.add.sprite(this.x + n*bitWidths, this.y+r*bitWidths, 'tile');
            timerBit.scale.x = bitScale;
            timerBit.scale.y = bitScale;

            timerCol.push(timerBit);
        }
        this.timerBits.push(timerCol);
    }
 var me = this;
   this.interval = setInterval(function(){
       me.update();
   },1000);
};

TimerManager.prototype.update = function(){
    if(this.time >=1) {
        this.time -= 1;
        this.timerBits[this.timerBits.length - 1].forEach(function (bit) {
            var tween = game.add.tween(bit).to({alpha: 0.1}, random.integerInRange(400, 1000), Phaser.Easing.Exponential.In, true);
            tween.onComplete.add(function () {
                bit.destroy();
            })
        });
        this.timerBits.splice(this.timerBits.length - 1, 1);
    }
    else{
        clearInterval(this.interval);
    }
};