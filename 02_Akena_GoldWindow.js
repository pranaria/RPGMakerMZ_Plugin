//=============================================================================
// RPG Maker MZ - 플러그인 기능 테스트
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 윈도우 기능 만들기
 * @author 아케나
 * 
 * @help 02_Akena_GoldWindow_001
 * 
 * 주의 : 아케나 플러그인은 테스트 버전 입니다.
 * 플러그인 윈도우 기능 만들기
 * 버전 : 1.0
 * =============================================================================
 * 01 윈도우 기능 만들기
 * =============================================================================
 * 02 설명 : 골드 윈도우 만들기
 * =============================================================================
 * 03 원본 소스: Window_Base
 * =============================================================================
*/

function Custom_GoldWindow() {
    this.initialize(...arguments);
}

Custom_GoldWindow.prototype = Object.create(Window_Base.prototype);
Custom_GoldWindow.prototype.constructor = Custom_GoldWindow;

Custom_GoldWindow.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this ,rect);
};

Custom_GoldWindow.prototype.update = function(){
    this.contents.clear();
    this.drawIcon(160,0,0);
    this.drawText($gameParty.gold(),65,0);
}


var smstart = Scene_Map.prototype.start;

Scene_Map.prototype.start = function(){
    smstart.apply(this, arguments);    
    var rect = new Rectangle(0, 0, 200, 60)
    var goldWindow = new Custom_GoldWindow(rect);
    this.addChild(goldWindow);
}
