//=============================================================================
// RPG Maker MZ - 플러그인 기능 테스트
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 윈도우 기능 만들기
 * @author 아케나
 * 
 * @help 03_Akena_Window_control
 * 
 * 주의 : 아케나 플러그인은 테스트 버전 입니다.
 * 플러그인 윈도우 기능 만들기
 * 버전 : 1.0
 * =============================================================================
 * 01 윈도우 기능 만들기
 * =============================================================================
 * 02 설명 : 특정 키를 입력받아 윈도우 컨트롤 하기
 * =============================================================================
 * 03 원본 소스:
 * =============================================================================
*/

//Custom_GoldWindow : 골드 윈도우를 만들겠다
function Custom_GoldWindow() {
    this.initialize(...arguments);
}

//알만툴 기본 기능인 Window_Base로 부터 시작
Custom_GoldWindow.prototype = Object.create(Window_Base.prototype);
Custom_GoldWindow.prototype.constructor = Custom_GoldWindow;

//Custom_GoldWindow 초기화
Custom_GoldWindow.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this ,rect);
};

//Custom_GoldWindow 업데이트
Custom_GoldWindow.prototype.update = function(){
    this.contents.clear();
    this.drawIcon(160,0,0);
    this.drawText($gameParty.gold(),65,0);
}

var sm_cdo = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
    sm_cdo.apply(this, arguments);
    const rect = this.rectGoldWindow();
    this._goldWindow = new Custom_GoldWindow(rect);
    this.addChild(this._goldWindow);
    this._goldWindow.visible = false;
    this._isGoldShowing = false;
};

//rectGoldWindow
Scene_Map.prototype.rectGoldWindow = function(){
    const wx = 0;
    const wy = 0;
    const ww = 200;
    const wh = 60;
    return new Rectangle(wx, wy, ww, wh);
}

//p를 누를때마다 활성화 비활성화

Input.keyMapper['80'] = "p";
var smupdate = Scene_Map.prototype.update;
Scene_Map.prototype.update = function(){
    smupdate.apply(this, arguments);
     
    if (Input.isTriggered('p')){
        this._isGoldShowing = !this._isGoldShowing;
        this._goldWindow.visible = this._isGoldShowing;
    }    
}
