//=============================================================================
// RPG Maker MZ - 플러그인 기능 테스트
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 전투에서 사망하면 자동으로 파티 탈퇴
 * @author 아케나
 * 
 * @help 07_AKena_Party_Control
 * 
 * 주의 : 아케나 플러그인은 테스트 버전 입니다.
*/

/*:
 * @target MZ
 * @plugindesc 사망시 파티 탈퇴
 * @author 아케나
 * 
 * @help 07_AKena_Party_Control
 * 
 * 주의 : 아케나 플러그인은 테스트 버전 입니다.
 * 플러그인 폰트 커스텀
 * 버전 : 1.0
 * =============================================================================
 * 01 플러그인 전투에서 사망하면 자동으로 파티 탈퇴
 * =============================================================================
 * 02 설명 : 전투에서 사망하면 자동으로 파티 탈퇴
 * =============================================================================
 * 03 원본 소스: rmmz_scenes.js
 * 3026 Line : Scene_Battle.prototype.terminate = function() // 전투 종료시 호출하는 함수
 * =============================================================================
*/

Scene_Battle.prototype.terminate = function() {
    Scene_Message.prototype.terminate.call(this);
    $gameParty.onBattleEnd();
    $gameTroop.onBattleEnd();
    AudioManager.stopMe();

    //사망시 파티 탈퇴 기능 추가 시작
    var party_die = [];

    for(var count = 0; $gameParty._actors.length > count; count++){
        if($gameActors.actor($gameParty._actors[count])._hp == 0){
            console.log("HP가 0인 캐릭터" + $gameParty._actors[count]);
            party_die[count] = $gameParty._actors[count];
        }
        else{
            party_die[count] = 0;
        }
    }

    for(var i=0; i<4; i++){
        if(party_die[count] != 0){
            $gameParty.removeActor(party_die[i]);
        }
    }

    //사망시 파티 탈퇴 기능 추가 끝
    
    if (this.shouldAutosave()) {
        this.requestAutosave();
    }
};
