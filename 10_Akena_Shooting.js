class missile{
    constructor(missile_start_x,missile_start_y){        
        //미사일 시작 좌표
        this.x = missile_start_x;
        this.y = missile_start_y;
        //미사일 속도
        this.speed = rand(3,5);
        //맵의 끝에 있는지 확인
        this.missile_end = false;
        //이미지 변환을 위한 프레임
        this.frame = 0;
        this.maxFrame = 2;
        //이미지 변환시 속도 조절
        this.missile_move_init = 0
        this.missile_move_interval = 30;
    }

    update(){
        this.y = this.y + this.speed;
        //맵의 높이 기준 끝까지 이동하면 벽을 통과 하였으므로 flase -> true로 변환
        if(this.y > Graphics.height){
            this.missile_end = true;
        }
        
        //초기값이 1씩 증가하면서 interval 이상이 되면 해당 if문 실행
        if(this.missile_move_init>this.missile_move_interval){
            //최대 프레임보다 커질 경우 0으로 초기화 아닐 경우 +1
            if(this.frame>=this.maxFrame){
                this.frame = 0;
            }else{
                this.frame++;
            }
            this.missile_move_init = 0;
        }else{
            this.missile_move_init++;
        }
        //3개의 이미지가 +1씩 증가하는 처리    
    }
}
//강의에서는 가로 세로 사이즈를 cell로 고정
let cell = 48;
//미사일이 출현하는 빈도를 위한 변수
let missile_interval = 15;
let missile_inittime = 0;
//미사일을 담아줄 배열을 선언(각각의 미사일은 객체)
var arr_missile = [];
//미사일 이미지 경로(단 크기는 144*48)
var missile_src = Bitmap.load('img/characters/Fire.png');
//var missile_src = Bitmap.load('img/characters/Fire_test.png');

//맵 초기화
const sms = Scene_Map.prototype.start;
Scene_Map.prototype.start = function(){
    sms.call(this);

    arr_missile = [];

    this.rect = new Sprite();
    //알만툴에서 설정한 맵 크기
    this.rect.bitmap = new Bitmap(Graphics.width,Graphics.height);
    this.addChild(this.rect);

    //객체의 위치 설정
    this.obj_start = (Graphics.width - ($dataMap.width * cell))/2
    this.obj_end = (Graphics.width - ($dataMap.width * cell))/2 + ($dataMap.width * cell) - cell
}

//맵 업데이트 될때
const smu = Scene_Map.prototype.update;
Scene_Map.prototype.update = function(){
    smu.call(this);

    this.rect.bitmap.clear();
    this.draws_missile();
}

Scene_Map.prototype.draws_missile = function(){
    //객체가 배열에 정상적으로 추가되고 삭제 되는지 확인
    console.log(arr_missile);
    //객체를 그려주는데 초기값보다 +1씩 해주면 interval보다 커지면 하나씩 추가
    missile_inittime = missile_inittime + 1;
    if(missile_inittime > missile_interval){
        arr_missile.push(new missile(random_range_cell(this.obj_start,this.obj_end),0));
        missile_inittime = 0;
    }
    
    //객체의 길이만큼 순환하면서 
    for(i=0;i<arr_missile.length;i++){
        //this.rect.bitmap.fillRect(arr_missile[i].x,arr_missile[i].y, cell,cell,"red");
        //blt를 이용하여 그려줌
        this.rect.bitmap.blt(missile_src, arr_missile[i].frame * cell, 0, cell, cell, arr_missile[i].x, arr_missile[i].y, cell, cell);

        //캐릭터와 충돌이 발생할 경우 처리 단 캐릭터의 좌표는 0,0부터 시작하기 떄문에 x와 y에 +1씩 더해서 계산
        if(parseInt(arr_missile[i].x/cell) == $gamePlayer._x+1 && parseInt(arr_missile[i].y/cell) == $gamePlayer._y+1){                
            console.log("충돌 이벤트 발생!!:"+parseInt(arr_missile[i].x/cell),parseInt(arr_missile[i].y/cell));
            //SceneManager.goto(Scene_Gameover);
        }
    }
        [...arr_missile].forEach(Object => Object.update());
        //배열의 객체들을 검사하면서 missile_end 값이 true면 제거
        arr_missile = arr_missile.filter(Object => !Object.missile_end);    
}

//랜덤 함수 최소값과 최대값을 넣어 호출하면 해당 값 사이에서 하나의 수를 랜덤으로 반환
function rand(min,max){
    return Math.floor(Math.random() *(max-min+1)) + min;
}

//플러그인에서 만들어준 미사일의 경우 알만툴처럼 cell좌표 이동이 안되므로
//알만툴에 맞춰줄 수 있도록 세팅해주는 함수
function random_range_cell(min,max){
    let padding = (Graphics.width - ($dataMap.width * cell))/2 - Math.floor(((Graphics.width - ($dataMap.width * cell))/2)/cell)*cell;
    //console.log(padding);
    let random_pos = Math.floor((Math.random()*(max-min+1))+ min);
    let cell_pos = Math.floor((random_pos-padding)/cell);
    let pos = cell_pos * cell + padding;
    return pos;
}