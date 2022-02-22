//=============================================================================
// RPG Maker MZ - 플러그인 기능 테스트
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Title Skip
 * @author 아케나

 * @help 05_Akena_Title_Skip_001.js
 * 
 * 주의 : 아케나 플러그인은 테스트 버전 입니다.
 * 플러그인 AKena_Title Skip
 * 버전 : 1.2
 * =============================================================================
 * 01 타이틀 스킵
 * =============================================================================
 * 02 설명
 * 게임 시작시 타이틀 스킵
 * =============================================================================
 * 03 원본 소스: rmmz_windows.js
 *  0321 Line : Scene_Boot.prototype.start = function() // 게임이 시작 되는 시점
 *  0337 Line : Scene_Boot.prototype.startNormalGame = function() // 일반게임 시작
 *  2405 Line : Scene_GameEnd.prototype.commandToTitle = function() //메뉴에서 게임 종료
 *  3577 Line : Scene_Gameover.prototype.gotoTitle = function() //플레이 중 게임 종료
 * =============================================================================
 * 04 업데이트
 * 1.0 : 타이틀 스킵 플러그인
 * 1.1 : 메뉴에서 게임 종료시 타이틀 대신 게임 종료될 수 있도록 처리
 * 1.2 : 게임 플레이중 어떠한 이유로 게임오버가 될 경우 타이틀 대신 게임 종료가 될 수 있도록 처리 //2021-10
 * =============================================================================
*/
(function() {
    Scene_Boot.prototype.startNormalGame = function() {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        //SceneManager.goto(Scene_Title);
        SceneManager.goto(Scene_Map);
        //Window_TitleCommand.initCommandPosition();
    };

    //Ver 1.1
    Scene_GameEnd.prototype.commandToTitle = function() {
        this.fadeOutAll();
        SceneManager.exit();
        
    };
    
    //Ver 1.2
    Scene_Gameover.prototype.gotoTitle = function() {        
        SceneManager.exit();
    };
    
})();