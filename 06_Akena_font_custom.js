//=============================================================================
// RPG Maker MZ - 플러그인 기능 테스트
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 폰트의 색상과 외곽선 변경
 * @author 아케나
 * 
 * @help 00_Akena_study
 * 
 * 주의 : 아케나 플러그인은 테스트 버전 입니다.
*/

/*:
 * @target MZ
 * @plugindesc 윈도우 기능 만들기
 * @author 아케나
 * 
 * @help 06_Akena_font_custom_001
 * 
 * 주의 : 아케나 플러그인은 테스트 버전 입니다.
 * 플러그인 폰트 커스텀
 * 버전 : 1.0
 * =============================================================================
 * 01 플러그인 폰트 커스텀
 * =============================================================================
 * 02 설명 : 폰트의 색상과 테두리를 변경
 * =============================================================================
 * 03 원본 소스: rmmz_windows.js
 * 0115 Line : Window_Base.prototype.resetFontSettings = function() // 폰트 리셋하는 함수
 * 0198 Line : Window_Base.prototype.changeTextColor = function(color) // 폰트 색상
 * 0202 Line : Window_Base.prototype.changeOutlineColor = function(color) // 폰트 외곽선 색상
 * =============================================================================
*/

//폰트 테두리 변경
Window_Base.prototype.resetFontSettings = function() {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.fontSize = $gameSystem.mainFontSize();
    this.resetTextColor();
    this.contents.outlineWidth = 5;
};

//폰트 색상 변경
Window_Base.prototype.changeTextColor = function(color) {
    this.contents.textColor = color;
    this.contents.textColor = "black";
};

//테두리 색상 변경
Window_Base.prototype.changeOutlineColor = function(color) {
    this.contents.outlineColor = color;
    this.contents.outlineColor = "red";
};