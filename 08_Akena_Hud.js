/* 스크립트 및 원본 함수 정의
    //drawText (text, x, y, maxWidth, lineHeight, align)
    //hp
    //$gameParty.members()[0]._hp //현재 HP
    //$gameParty.members()[0].mhp //최대 HP

    //mp
    //$gameParty.members()[0]._mp //현재 MP
    //$gameParty.members()[0].mmp //최대 MP

    //level
    //$gameParty.members()[0]._level // 레벨

    //exp
    //$gameParty.members()[0]._exp[1]   //현재 경험치
    //$gameParty.members()[0].nextLevelExp()  // 총 경험치
*/

var image_width = 144/2;
var image_height = 144/2;
var stats_bar_padding_x = 10;
var stats_bar_padding_y = 10;

var stats_bar_offset_x = 0;
var stats_bar_offset_y = -40;


var max_stats_bar = 300;

const sms = Scene_Map.prototype.start;
Scene_Map.prototype.start = function(){
    sms.call(this);

    //stats bar
    this.stats_bar = new Sprite();
    this.stats_bar.bitmap = new Bitmap(1024,768);
    this.addChild(this.stats_bar);

    this.draws_actor_face();

}

Scene_Map.prototype.draws_actor_face = function(){

    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;

    this.arr_actor_face = [];
    
    this.arr_size_x = 
    [
        width-width+stats_bar_padding_x,
        width/2-image_width+stats_bar_padding_x,
        width-width+stats_bar_padding_x,
        width/2-image_width+stats_bar_padding_x
    ];
    this.arr_size_y = 
    [
        height-height+stats_bar_padding_y,
        height-height+stats_bar_padding_y,
        height-image_height-stats_bar_padding_y+stats_bar_offset_y,
        height-image_height-stats_bar_padding_y+stats_bar_offset_y
    ]

    for(let i = 0; i<$gameParty.members().length; i++){
        this.arr_actor_face.push(new Sprite(ImageManager.load_face_Picture($gameParty.members()[i]._name)))
        
        this.arr_actor_face[i].move(this.arr_size_x[i],this.arr_size_y[i]);
        this.arr_actor_face[i].scale.x = 0.5;
        this.arr_actor_face[i].scale.y = 0.5;
        this.addChild(this.arr_actor_face[i]);        
    }
}

ImageManager.load_face_Picture = function(filename) {
    return this.loadBitmap("img/faces/Actor_hud/", filename);
};

const smu = Scene_Map.prototype.update;
Scene_Map.prototype.update = function(){
    smu.call(this);

    this.stats_bar.bitmap.clear();
    this.draws_stats();
}

Scene_Map.prototype.draws_stats = function(){

    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;

    var stats_rect_x = 
    [
        image_width+(stats_bar_padding_x*2), 
        (width/2)+(stats_bar_padding_x*2), 
        image_width+(stats_bar_padding_x*2),
        (width/2)+(stats_bar_padding_x*2)
    ];
    var stats_rect_y = 
    [
        stats_bar_padding_y,
        stats_bar_padding_y,
        height- image_width - stats_bar_padding_y+stats_bar_offset_y,
        height- image_width- stats_bar_padding_y+stats_bar_offset_y
    ];

    var Lv_show_text_x =
    [
        stats_bar_padding_x,
        (width/2)- image_width+stats_bar_padding_x,
        stats_bar_padding_x,
        (width/2)- image_width+stats_bar_padding_x
    ];
    var Lv_show_text_y =
    [
        image_height + (stats_bar_padding_y*2),
        image_height + (stats_bar_padding_y*2), 
        height + stats_bar_offset_y,
        height + stats_bar_offset_y
    ]
    
    //this.stats_bar.bitmap.textColor ="Red";
    
    for(let i = 0; i<$gameParty.members().length; i++){
        var current_hp_gauge = parseInt(max_stats_bar * $gameParty.members()[i]._hp / $gameParty.members()[i].mhp);
        var current_mp_gauge = parseInt(max_stats_bar * $gameParty.members()[i]._mp / $gameParty.members()[i].mmp);
        var current_exp_gauge = parseInt(max_stats_bar * $gameParty.members()[0]._exp[1] / $gameParty.members()[0].nextLevelExp());

        this.stats_bar.bitmap.strokeRect(stats_rect_x[i], stats_rect_y[i], max_stats_bar, 28, "white");
        this.stats_bar.bitmap.fillRect(stats_rect_x[i], stats_rect_y[i], current_hp_gauge, 28, "red");
        this.stats_bar.bitmap.drawText("HP :   " + $gameParty.members()[i]._hp + "/" + $gameParty.members()[i].mhp, stats_rect_x[i], stats_rect_y[i], max_stats_bar, 28, "center");
        
        this.stats_bar.bitmap.strokeRect(stats_rect_x[i], stats_rect_y[i]+40, max_stats_bar, 28, "white");
        this.stats_bar.bitmap.fillRect(stats_rect_x[i], stats_rect_y[i]+40, current_mp_gauge, 28, "blue");
        this.stats_bar.bitmap.drawText("MP :   " + $gameParty.members()[i]._mp + "/" + $gameParty.members()[i].mmp, stats_rect_x[i], stats_rect_y[i]+40, max_stats_bar, 28, "center");

        this.stats_bar.bitmap.strokeRect(stats_rect_x[i], stats_rect_y[i]+80, max_stats_bar, 28, "white");
        this.stats_bar.bitmap.fillRect(stats_rect_x[i], stats_rect_y[i]+80, current_exp_gauge, 28, "rgba(255, 255, 153, 1)");
        this.stats_bar.bitmap.drawText("EXP :   " + Number(Object.values($gameParty.members()[i]._exp).join()) + "/" + $gameParty.members()[i].nextLevelExp(), stats_rect_x[i], stats_rect_y[i]+80, max_stats_bar, 28, "center");
        
        this.stats_bar.bitmap.drawText("LV", Lv_show_text_x[i],  Lv_show_text_y[i], max_stats_bar, 28, "left");
        this.stats_bar.bitmap.drawText($gameParty.members()[i]._level, Lv_show_text_x[i]+40, Lv_show_text_y[i], max_stats_bar, 28, "left");

    }

}

/*
Window_Base.prototype.changeTextColor = function(color) {
    this.contents.textColor = color;
};
*/