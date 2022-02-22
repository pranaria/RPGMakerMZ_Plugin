//=============================================================================
// RPG Maker MZ - 플러그인 기능 테스트
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 해상도 변경 시 액터 위치 교정
 * @author 아케나
 * 
 * @param Width
 * @type number
 * @decs 전투시 가로
 * @default 816
 
 * @param Height
 * @type number
 * @decs 전투시 세로
 * @default 624
 * 
 * @help 01_Akena_BAP_001.js
 * 
 * 주의 : 아케나 플러그인은 테스트 버전 입니다.
 * 플러그인 AKena_Battle_Actor_Postion
 * 버전 : 1.0
 * =============================================================================
 * 01 해상도 변경 시 액터 위치 교정
 * =============================================================================
 * 02 설명
 * 알만툴 기본 해상도 :  816 * 624 
 * 예제 : 1280 * 720
 * 비례식 계산 : 941 * 323
 * width 와 height 사이즈를 조절
 * =============================================================================
 * 03 원본 소스: sprites.js  Line : 740
 * Sprite_Actor.prototype.setActorHome = function(index) {
 *  this.setHome(600 + index * 32, 280 + index * 48);
 * };
 * =============================================================================
*/

var Parameters = PluginManager.parameters("01_Akena_BAP_001");
var Battle_ScreenWidth = Number(Parameters['Width'] || 816);
var Battle_ScreenHeight = Number(Parameters['Height'] || 624);

Sprite_Actor.prototype.setActorHome = function(index) {    
     this.setHome(Battle_ScreenWidth + index * 32, Battle_ScreenHeight + index * 1.5 * 48);
 };