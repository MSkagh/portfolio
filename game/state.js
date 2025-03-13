import CanvasManager from './canvasManager.js'


export class State {
    constructor() {
        this.canvas = CanvasManager.getCanvas()
        this.context = CanvasManager.getContext()
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
