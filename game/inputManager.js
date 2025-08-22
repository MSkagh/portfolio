export default class InputManager {
    static instance = null;

    constructor() {
        //SINGLETON
        if (InputManager.instance) {
            return InputManager.instance; // Return existing instance if already created
        }
        this.addEventListeners = () => {
            window.addEventListener("keydown", this.keyDownHandler);
            window.addEventListener("keyup", this.keyUpHandler);
        }

        this.removeEventListeners = () => {
            window.removeEventListener("keydown", this.keyDownHandler);
            window.removeEventListener("keyup", this.keyUpHandler);
        }
        InputManager.instance = this;

        this.keys = {};
        this.justPressed = {}; // Tracks keys that were JUST pressed

    }

    keyDownHandler = (event) => {
        if (!this.keys[event.key]) { // Register justPressed only once per keydown
            this.justPressed[event.key] = true;
        }
        this.keys[event.key] = true;
        event.preventDefault();
    }

    keyUpHandler = (event) => {
        this.keys[event.key] = false;
        this.justPressed[event.key] = false; // Reset justPressed when key is released
        event.preventDefault();
    }

    // Continuous input check (key is being held)
    isKeyHeld(key) {
        return !!this.keys[key];
    }

    // Single-frame input check (key was just pressed)
    isKeyPressed(key) {
        const pressed = this.justPressed[key];
        this.justPressed[key] = false; // Reset after checking
        return pressed;
    }
}