export default class mouse extends Laya.Script {
    constructor() { 
        super(); 
        /** @prop {name:mouse_type, tips:"老鼠类型", type:Int, default:1}*/
        this.mouse_type = 1;
    }
    
    onEnable() {
    }

    onDisable() {
    }

    onStart() {
        this.show_mouse(this.mouse_type);
    }

    show_mouse(type) {
        this.mouse_type = type;
        this.owner.skin = "res/mouse_normal_"+this.mouse_type+".png";

        // 动画来显示
        this.owner.scaleX = 0;
        this.owner.scaleY = 0;
        // scale:0 -> scale:1 delay:1000 -> scale:0
        this.time_line = Laya.TimeLine.to(this.owner,{scaleX:1,scaleY:1},300);
        this.time_line.to(this.owner,{scaleX:0,scaleY:0},300,null,1000);
        this.time_line.on(Laya.Event.COMPLETE,this,function(){
            console.log("remove mouse",this.owmer.mouse_type,this.owmer.skin);
            this.owner.removeSelf();
        });
        this.time_line.play(0,false);
    }
}