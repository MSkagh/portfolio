import { CanvasManager } from './canvasManager.js'

export default class SceneManager {
    static instance = null;
    constructor() {
        if (this.instance) return SceneManager.instance;

        this.scenes = {};
        this.currentScene = null;
        SceneManager.instance = this;
    }

    addScene(name, scene) {
        this.scenes[name] = scene;
    }

    switchToScene(name) {
        this.currentScene = this.scenes[name];
    }

    update() {
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000; // Convert ms to seconds
        this.lastTime = currentTime;
    
        if (this.currentScene) {
            this.currentScene.update(deltaTime); // Pass deltaTime to scene
        }
    }

    draw() {
        if (this.currentScene) {
            this.currentScene.draw(CanvasManager.instance.getCanvas());
        }
    }
}