export default class InputManager {
    static instance = null;

    constructor() {
        //SINGLETON
        if (InputManager.instance) {
            return InputManager.instance; // Return existing instance if already created
        }
        InputManager.instance = this;

        
        this.keys = {};
        this.justPressed = {}; // Tracks keys that were JUST pressed

        window.addEventListener("keydown", (event) => {
            if (!this.keys[event.key]) { // Register justPressed only once per keydown
                this.justPressed[event.key] = true;
            }
            this.keys[event.key] = true;
            event.preventDefault();
        });

        window.addEventListener("keyup", (event) => {
            this.keys[event.key] = false;
            this.justPressed[event.key] = false; // Reset justPressed when key is released
            event.preventDefault();
        });
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