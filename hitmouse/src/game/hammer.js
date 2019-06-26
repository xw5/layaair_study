export default class hammer extends Laya.Script {

    constructor() { 
        super(); 
        this.time_line = null;
    }
    
    onEnable() {
    }

    onDisable() {
    }

    onStart() {
        this.play_hammer_anim();
    }

    play_hammer_anim() {
        var time = 100;
        this.owner.alpha = 1;
        this.owner.rotation = 0;

        this.time_line = Laya.TimeLine.to(this.owner,{rotation:9}, time, null, 1000);
        this.time_line.to(this.owner,{rotation:-9}, time * 2);
        this.time_line.to(this.owner,{rotation:0}, time);
        this.time_line.to(this.owner,{alpha:0}, time);
        this.time_line.play(0, false);
    }
}