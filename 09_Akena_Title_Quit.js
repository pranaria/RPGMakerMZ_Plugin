//rmmz_windows.js 6384 Line
Window_TitleCommand.prototype.makeCommandList = function() {
    const continueEnabled = this.isContinueEnabled();
    this.addCommand(TextManager.newGame, "newGame");
    this.addCommand(TextManager.continue_, "continue", continueEnabled);
    this.addCommand(TextManager.options, "options");
    this.addCommand("종료", "Quit");
    //this.addCommand("추가메뉴", "AddMenu01"); //개발중
};

//rmmz_scenes.js 464 Line
Scene_Title.prototype.createCommandWindow = function() {
    const background = $dataSystem.titleCommandWindow.background;
    const rect = this.commandWindowRect();
    this._commandWindow = new Window_TitleCommand(rect);
    this._commandWindow.setBackgroundType(background);
    this._commandWindow.setHandler("newGame", this.commandNewGame.bind(this));
    this._commandWindow.setHandler("continue", this.commandContinue.bind(this));
    this._commandWindow.setHandler("options", this.commandOptions.bind(this));
    this._commandWindow.setHandler("Quit", this.commandQuit.bind(this));
    //this._commandWindow.setHandler("AddMenu01", this.commandAddMenu01.bind(this)); //개발중
    this.addWindow(this._commandWindow);
};

//rmmz_scenes.js 485 Line
Scene_Title.prototype.commandWindowRect = function() {
    const offsetX = $dataSystem.titleCommandWindow.offsetX;
    const offsetY = $dataSystem.titleCommandWindow.offsetY;
    const ww = this.mainCommandWidth();
    const wh = this.calcWindowHeight(4, true);
    const wx = (Graphics.boxWidth - ww) / 2 + offsetX;
    const wy = Graphics.boxHeight - wh - 96 + offsetY;
    return new Rectangle(wx, wy, ww, wh);
};

//Quit 메뉴 추가
Scene_Title.prototype.commandQuit = function() {
    SceneManager.exit();
};

/*
1. 추가 메뉴 선택시 Title Menu 비활성화 이슈
2. 추가 메뉴 선택 후 ESC키로 Title 화면으로 돌아오는 기능 필요
3. 추가 메뉴는 단순한 윈도우 혹은 그림 표시 정도로 1차 구현
    (현재 SelectWindow 100% 이해 안됨)
*/

//추가 메뉴 개발중 현재 미구현
Scene_Title.prototype.commandAddMenu01 = function() {
    alert("테스트");
    this.fadeOutAll();
    SceneManager.goto(Scene_Title);
    Window_TitleCommand.initCommandPosition();
};




