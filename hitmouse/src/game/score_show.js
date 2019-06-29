export default class score_show extends Laya.Script {

    constructor() { 
        super(); 
    }
    
    onEnable() {
    }

    onDisable() {
    }

    onStart() {
        this.showScore(false);
    }

    /**
     * @param is_dsc 是否是减分
     */
    showScore(is_dsc) {
        if (is_dsc) {
            this.owner.skin = "res/score_1.png";
        } else {
            this.owner.skin = "res/score_2.png";
        }
        //Laya.Tween.to(this.owner,{y:this.owner.y - 80}, 300, Laya.Ease.backInOut)
        var time_line = Laya.TimeLine.to(this.owner,{y:this.owner.y - 160},300,Laya.Ease.backOut);
        time_line.to(this.owner,{alpha:0},200,null,600);
        time_line.play(0, false);
        time_line.on(Laya.Event.COMPLETE,this,function() {
            this.owner.removeSelf();
        });
    }
}