import { CanvasManager } from './canvasManager.js'
import { worldMap } from './worldMap.js'

export default class SceneManager {
    static instance = null;
    constructor() {
        if (this.instance) return SceneManager.instance;

        this.scenes = {};
        this.currentScene = null;
        this.worldMap = worldMap;
        this.playerWorldPosition = { x: 2, y: 9 }
        SceneManager.instance = this;
    }

    addScene(name, scene) {
        this.scenes[name] = scene;
    }

    switchToScene(name) {
        this.currentScene = this.scenes[name];
    }
    resolveSceneChangeLogic() {
        const player = this.currentScene.player
        const x = player.position.x;
        const y = player.position.y;
        const height = CanvasManager.instance.canvas.height
        const width = CanvasManager.instance.canvas.width

        if (x < player.originalSize.width) this.movePlayer("left")
        if (x > width - player.originalSize.width - 1) this.movePlayer("right")
        if (y < player.originalSize.heigh) this.movePlayer("down")
        if (y > height - player.originalSize.width) this.movePlayer("up")
    }
    update() {
        const currentTime = Date.now();
        const deltaTime = (currentTime - this.lastTime) / 1000; // Convert ms to seconds
        this.lastTime = currentTime;

        if (this.currentScene) {
            this.resolveSceneChangeLogic()
            this.currentScene.update(deltaTime);
        }
    }

    draw() {
        if (this.currentScene) {
            this.currentScene.draw(CanvasManager.instance.getCanvas());
        }
    }
    movePlayer(direction) {
        let newX = this.playerWorldPosition.x;
        let newY = this.playerWorldPosition.y;

        switch (direction) {
            case "left": newX--; break;
            case "right": newX++; break;
            case "up": newY--; break;
            case "down": newY++; break;
        }

        if (this.worldMap[newY] && this.worldMap[newY][newX]) {
            this.playerWorldPosition.x = newX;
            this.playerWorldPosition.y = newY;
            this.switchToScene(worldMap[newY][newX]);
        }
    }
}