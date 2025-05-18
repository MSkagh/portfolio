import { CanvasManager } from './canvasManager.js'
import InputManager from "./inputManager.js";

export class State {
    constructor() {
        this.canvas = CanvasManager.instance.canvas;
        this.context = CanvasManager.instance.context;
        this.input = new InputManager();
    }
    enter() {
        // Initialize state-specific data
    }

    update() {
        // Update state-specific logic
    }

    draw() {
        // Draw state-specific content
    }

    exit() {
        // Clean up state-specific data
    }
}
