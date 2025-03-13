import { StateMachine } from "./game/stateMachine.js"
import { TitleState, GameState, PauseState } from "./game/states.js"


const dialog = document.getElementById('game__dialog')
const canvas = document.getElementById('game__canvas')
const context = canvas.getContext('2d')
const width = 800
const height = 600
canvas.width = width
canvas.height = height



const stateMachine = new StateMachine();
stateMachine.addState('title', new TitleState());
stateMachine.addState('game', new GameState());
stateMachine.addState('pause', new PauseState());
stateMachine.currentState === null ? stateMachine.changeState('title') : stateMachine.changeState(stateMachine.currentState);

const startGame = () => {
    loop()
}

const loop = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    stateMachine.update();
    stateMachine.draw();
    // Request animation frame to keep from blocking the code
    requestAnimationFrame(loop)
}


document.getElementById('show-game-button').addEventListener('click', () => {
    dialog.showModal()
    startGame()
    document.addEventListener('keydown', customKeydownHandler)
})
document.getElementById('hide-game-button').addEventListener('click', () => {
    dialog.close()
    document.removeEventListener('keydown', customKeydownHandler)
})



const customKeydownHandler = (event) => {
    const state = stateMachine.currentState
    if (['Enter', 'Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'Tab'].includes(event.key)) {
        event.preventDefault();
    }
    if (event.key === 'Enter') {
        if (state instanceof TitleState) {
            stateMachine.changeState('game');
        } 
    } else if (event.key === 'Tab') {
        if (state instanceof PauseState) stateMachine.changeState('game')
        if (state instanceof GameState) stateMachine.changeState('pause')
    }
}