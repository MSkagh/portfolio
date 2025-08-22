import { StateManager } from "./game/stateManager.js"
import { TitleState, GameState, PauseState } from "./game/states.js"
import InputManager from "./game/inputManager.js";
import { CanvasManager } from "./game/canvasManager.js";


const dialog = document.getElementById('game__dialog')

let inputManager = new InputManager();
let isGameControlsActive = false;
let stateManager = null;

const canvasManager = new CanvasManager();

const startGame = () => {
    if (!stateManager) {
        stateManager = new StateManager();; // Initialize only when needed
    }
    if (!isGameControlsActive) {
        inputManager.addEventListeners();
        isGameControlsActive = true;
    }
    stateManager.addState('title', new TitleState());
    stateManager.addState('game', new GameState());
    stateManager.addState('pause', new PauseState());
    stateManager.currentState === null ? stateManager.changeState('title') : stateManager.changeState(stateManager.currentState);


    loop()
}

const loop = () => {
    canvasManager.context.clearRect(0, 0, canvasManager.canvas.width, canvasManager.canvas.height);
    canvasManager.changeBackgroundColor("black")
    stateManager.update();
    stateManager.draw();

    // Request animation frame to keep from blocking the code
    requestAnimationFrame(loop)
}


document.getElementById('show-game-button').addEventListener('click', () => {
    dialog.showModal()
    startGame()
})
document.getElementById('hide-game-button').addEventListener('click', () => {
    stateManager.changeState('title')
    inputManager.removeEventListeners();
    isGameControlsActive = false;
    dialog.close()
})