import { State } from "./state.js";
import SceneManager from "./sceneManager.js";
import {level1} from './scenes.js'

export class TitleState extends State {
    constructor() {
        super()
    }

    enter() {
        // Initialize title state-specific data
    }

    update() {
        // Handle input and update title state-specific logic
        if (this.run) {
            stateMachine.changeState('game');
        }
    }

    draw() {
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = 'white';
        this.context.font = '48px Comic Sans';
        this.context.fillText('A game-engine in the making.', 100, 200);
        this.context.font = '24px Arial';
        this.context.fillText('Press Enter to Start', 150, 300);
    }
}

export class GameState extends State {
    constructor() {
        super()
        this.sceneManager = new SceneManager();
        this.sceneManager.addScene('level1', level1)
        this.sceneManager.switchToScene('level1');
    }
    enter() {
        // Initialize game state-specific data
    }

    update() {
        // Update game state-specific logic
    }

    draw() {
        this.sceneManager.draw()
    }

    exit() {
        // Clean up game state-specific data
    }
}


export class PauseState extends State {
    constructor() {
        super()
    }
    enter() {
        // Initialize pause state-specific data
    }

    update() {
        // Handle input and update pause state-specific logic
        if (this.unPaused) {
            stateMachine.changeState('game');
        }
    }

    draw() {
        this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = 'white';
        this.context.font = '48px Arial';
        this.context.fillText('Paused', 200, 200);
        this.context.font = '24px Arial';
        this.context.fillText('Press Tab to Resume', 150, 300);
    }
}