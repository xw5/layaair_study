var game_config = require("./game_config");
import mouse from './mouse';
import hammer from './hammer';
import score_show from './score_show';

export default class game_mgr extends Laya.Script {
    /** @prop {name:mouse_prefab, tips:"老鼠预置体", type:Prefab, default:null}*/
    /** @prop {name:mouse_root, tips:"老鼠根节点", type:Node, default:null}*/
    /** @prop {name:hammer, tips:"锤子对象", type:Node, default:null}*/
    /** @prop {name:score_prefab, tips:"得分预置体", type:Prefab, default:null}*/
    /** @prop {name:score_root, tips:"得分对象", type:Node, default:null}*/
    
    constructor() { 
        super(); 
        this.is_start = false;
        this.mouse_prefab = null;
        this.mouse_root = null;
        this.hammer = null;
        this.hammer_com = null;
    }
    
    onEnable() {
    }

    onDisable() {
    }

    onStart() {
        this.game_start();
    }

    // 游戏开始
    game_start() {
        this.is_start = true;
        this.hammer_com = this.hammer.getComponent(hammer);
        this.gen_one_mouse();
    }

    // 随机一个地鼠
    gen_one_mouse() {
        var mouse_type = Math.random() < 0.5 ? 1 : 2;
        var m = this.mouse_prefab.create();
        this.mouse_root.addChild(m);

        // mouse在哪？
        
        // hole_index;
        var hole_index = Math.floor(Math.random() * 9);
        m.x = game_config.mouse_pos[hole_index].x;
        m.y = game_config.mouse_pos[hole_index].y;
        m.getComponent(mouse).show_mouse(this, mouse_type, hole_index);

        var time = 1.5 + Math.random();
        Laya.timer.once(time * 1000, this, this.gen_one_mouse);
    }

    on_mouse_hit(type, index) {
        this.hammer.x = game_config.hammer_pos[index].x;
        this.hammer.y = game_config.hammer_pos[index].y;
        this.hammer_com.play_hammer_anim();

        var score = this.score_prefab.create();
        this.score_root.addChild(score);
        score.x = game_config.score_pos[index].x;
        score.y = game_config.score_pos[index].y;
        score.getComponent(score_show).showScore(index === 1);
    }
}