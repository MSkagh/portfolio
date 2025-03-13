class CanvasManager {
    constructor() {
        if (!CanvasManager.instance) {
            this.canvas = document.getElementById('game__canvas');
            this.ctx = this.canvas.getContext('2d');
            CanvasManager.instance = this;
        }
        return CanvasManager.instance;
    }

    getCanvas() {
        return this.canvas;
    }

    getContext() {
        return this.ctx;
    }
}

const instance = new CanvasManager();
Object.freeze(instance);

export default instance;
