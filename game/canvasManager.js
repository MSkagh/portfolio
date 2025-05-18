export class CanvasManager {
    static instance = null;

    constructor() {
        if (CanvasManager.instance) {
            return CanvasManager.instance;
        }
        this.canvas = document.getElementById('game__canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 608;
        CanvasManager.instance = this;

    }
    changeBackgroundColor(color) {
        this.context.fillStyle = color; // Set background color
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height); // Fill entire canvas
    }

    getCanvas() {
        return this.canvas;
    }

    getContext() {
        return this.context;
    }
}
