import { CanvasManager } from "./canvasManager.js"
import InputManager from "./inputManager.js";
import SceneManager from "./sceneManager.js";
import player from "./player.js";

export class PlayerManager {
    static instance;
    constructor() {
        if (PlayerManager.instance) return PlayerManager.instance
        this.player = player;
        this.input = new InputManager();
        this.context = CanvasManager.instance.context;
        this.sceneManager = SceneManager.instance;
        this.instance = this;
    }
    draw() {
        this.player.draw(this.context);
    }

    update(deltaTime) {
        this.handleMovement(deltaTime);
    }

    handleMovement(deltaTime) {
        this.handleInput(deltaTime); // Process input first

        const totalSteps = Math.ceil(Math.max(Math.abs(this.player.velocity.x), Math.abs(this.player.velocity.y)));

        const stepX = this.player.velocity.x / totalSteps;
        const stepY = this.player.velocity.y / totalSteps;

        for (let i = 0; i < totalSteps; i++) {
            const nextX = this.player.position.x + stepX;
            const nextY = this.player.position.y + stepY;

            const isCollidingX = this.sceneManager.currentScene.isColliding(nextX, this.player.position.y, this.player.size.width, this.player.size.height);
            const isCollidingY = this.sceneManager.currentScene.isColliding(this.player.position.x, nextY, this.player.size.width, this.player.size.height);

            if (!isCollidingX) {
                this.player.setPosition(nextX, this.player.position.y);
            } else {
                //Stop horizontal collision
                this.player.velocity.x = 0;
            }

            if (!isCollidingY) {
                this.player.setPosition(this.player.position.x, nextY);
            } else{
                //reset the jumpCount only when the player is colliding with something on a downward movement.
                if (this.player.velocity.y > 0) this.player.abilities.includes("doubleJump") ? this.player.jumpCount = 2 : this.player.jumpCount = 1;
                
                //Stop vertical collision
                this.player.velocity.y = 0;
            }
        }

        this.player.updateCenter(); // Always refresh center after movement
    }


    handleInput(deltaTime) {

        this.player.velocity.y += 30 * deltaTime; // Apply gravity properly

        if (this.input.isKeyHeld("ArrowLeft")) {
            this.player.velocity.x = -300 * deltaTime;
        } else if (this.input.isKeyHeld("ArrowRight")) {
            this.player.velocity.x = 300 * deltaTime;
        } else {
            this.player.velocity.x = 0; // Stop when no input
        }

        if (this.input.isKeyPressed("ArrowUp") && this.player.jumpCount > 0) {
            this.player.jumpCount -= 1;
            this.player.velocity.y = -600 * deltaTime; // Apply jump force
        }
        

        if (this.input.isKeyHeld("ArrowDown")) {
            if (this.player.size.height === this.player.originalSize.height) {

                const correctionRange = Math.ceil(this.player.originalSize.height / 4);
                for (let i = 0; i < correctionRange; i++) {
                    const nextY = this.player.position.y + 1;
                    if (!this.sceneManager.currentScene.isColliding(this.player.position.x, nextY, this.player.size.width, this.player.size.height)) {
                        this.player.position.y = nextY;
                    } else {
                        break;
                    }
                }

                // Now shrink hitbox after correcting position
                this.player.size.height = this.player.originalSize.height / 2;
            }
        } else {
            if (this.player.size.height !== this.player.originalSize.height) {
                //Ensure player only stands if there's room above
                const nextHeight = this.player.originalSize.height;
                const nextY = this.player.position.y - (nextHeight - this.player.size.height) / 2;

                if (!this.sceneManager.currentScene.isColliding(this.player.position.x, nextY, this.player.size.width, nextHeight)) {
                    this.player.size.height = nextHeight;
                    this.player.position.y = nextY;
                }
            }
        }
        if (!this.input.isKeyHeld("ArrowDown")) {
            const nextHeight = this.player.originalSize.height;
            const nextY = this.player.position.y - (nextHeight - this.player.size.height);

            if (!this.sceneManager.currentScene.isColliding(this.player.position.x, nextY, this.player.size.width, nextHeight)) {
                this.player.size.height = nextHeight;
                this.player.position.y = nextY; // Adjust position properly
            }
        }

    }
};