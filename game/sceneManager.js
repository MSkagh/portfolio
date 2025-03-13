import CanvasManager from './canvasManager.js'

export default class SceneManager {
    constructor() {
        this.scenes = {};
        this.currentScene = null;
    }

    addScene(name, scene) {
        this.scenes[name] = scene;
    }

    switchToScene(name) {
        this.currentScene = this.scenes[name];
    }

    update() {
        if (this.currentScene) {
            this.currentScene.update();
        }
    }

    draw() {
        if (this.currentScene) {
            this.currentScene.draw(CanvasManager.canvas);
        }
    }
}