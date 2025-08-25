import { State } from "./state.js";
import SceneManager from "./sceneManager.js";
import {load_r_10_3, load_r_10_2, load_r_10_4} from './scenes.js'
import { StateManager } from "./stateManager.js";

export class TitleState extends State {
    constructor() {
        super()
    }
    
    // Initialize title state-specific data
    enter() {
    }
    
    // Handle input and update title state-specific logic
    update() {
        if (this.input.isKeyPressed("Enter")) StateManager.instance.changeState("game");
    }

    draw() {
        this.context.fillStyle = 'green';
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
        this.sceneManager.addScene('r_10_2', load_r_10_2())
        this.sceneManager.addScene('r_10_3', load_r_10_3())
        this.sceneManager.addScene('r_10_4', load_r_10_4())
        this.sceneManager.switchToScene('r_10_3');

    }
    enter() {
        // Initialize game state-specific data
    }

    update() {
        // Update game state-specific logic
        if (this.input.isKeyPressed("Tab")) StateManager.instance.changeState("pause");
        this.sceneManager.update()

    }

    draw() {
        this.sceneManager.draw()
        this.context.fillStyle = 'white';
        this.context.font = '24px Comic Sans';
        this.context.fillText('arrow keys to move, tab to pause', this.canvas.width/4, this.canvas.height/4);
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
        if (this.input.isKeyPressed("Tab")) StateManager.instance.changeState("game");

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