//=============================================================================
// RPG Maker MZ - 플러그인 기능 테스트
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 택스트 배경 바꾸기
 * @author 아케나

 * @help 04_Akena_TBC_001.js
 * 
 * 주의 : 아케나 플러그인은 테스트 버전 입니다.
 * 플러그인 AKena_TextBox_Custom
 * 버전 : 1.0
 * =============================================================================
 * 01 택스트 배경 바꾸기
 * =============================================================================
 * 02 설명
 * 텍스트 표시 처리시에 원하는 배경으로 커스텀
 * =============================================================================
 * 03 원본 소스: rmmz_windows.js
 *  4648 Line : Window_Message.prototype.startMessage // 대화 시작시 이미지 생성
 *  0159 Line : Window_Base.prototype.close // 대화 종료 후 이미지 삭제
 *  4898 Line : Window_Message.prototype.updateBackground //투명도 조정
 * =============================================================================
*/

Window_Message.prototype.startMessage = function() {
    const text = $gameMessage.allText();
    const textState = this.createTextState(text, 0, 0, 0);
    textState.x = this.newLineX(textState);
    textState.startX = textState.x;
    this._textState = textState;
    this.newPage(this._textState);
    this.updatePlacement();
    this.updateBackground();
    this.open();
    this._nameBoxWindow.start();
    $gameScreen.showPicture(1, '01_testxbox/test', 0, 0, 540,100, 100, 255, 0);
};

Window_Base.prototype.close = function() {
    if (!this.isClosed()) {
        $gameScreen.erasePicture(1);
        this._closing = true;
    }
    this._opening = false;
};

Window_Message.prototype.updateBackground = function() {
    this._background = $gameMessage.background();
    this.setBackgroundType(2);
    
};