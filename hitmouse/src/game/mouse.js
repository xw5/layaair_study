export default class mouse extends Laya.Script {
    constructor() { 
        super(); 
        /** @prop {name:mouse_type, tips:"老鼠类型", type:Int, default:1}*/
        this.mouse_type = 1;
        this.time_line = null;
        this.game_mgr = null;
        this.index = 0;
    }
    
    onEnable() {
    }

    onDisable() {
    }

    show_mouse(mgr, type, hold_index) {
        this.game_mgr = mgr;
        this.index = hold_index;
        this.mouse_type = type;
        this.owner.skin = "res/mouse_normal_"+this.mouse_type+".png";

        // 动画来显示
        this.owner.scaleX = 0;
        this.owner.scaleY = 0;
        // scale:0 -> scale:1 delay:1000 -> scale:0
        this.time_line = Laya.TimeLine.to(this.owner,{scaleX:1,scaleY:1},300);
        this.time_line.to(this.owner,{scaleX:0,scaleY:0},300,null,1000);
        this.time_line.on(Laya.Event.COMPLETE,this,function(){
            this.owner.removeSelf();
        });
        this.time_line.play(0,false);
    }

    onClick() {
        this.play_hit_anim();
        this.game_mgr.on_mouse_hit(this.mouse_type, this.index);
    }

    play_hit_anim() {
        this.owner.skin = "res/mouse_hit_" + this.mouse_type + ".png";
        if (this.time_line) {
            this.time_line.destroy();
            this.time_line = null;
        }
        this.time_line = Laya.TimeLine.to(this.owner, { scaleX: 0, scaleY: 0 }, 300, null, 500);
        this.time_line.on(Laya.Event.COMPLETE, this, function () {
            this.owner.removeSelf();
        });
        this.time_line.play(0, false);
    }
}