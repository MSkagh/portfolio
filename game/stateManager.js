export class StateManager {
    static instance = null;

    constructor() {
        if (StateManager.instance) {
            return StateManager.instance;
        }

        StateManager.instance = this;
        this.states = {};
        this.currentState = null;
    }


    addState(name, state) {
        this.states[name] = state;
    }

    changeState(name) {
        if (this.states[name]) {
            if (this.currentState && this.currentState.exit) {
                this.currentState.exit();
            }
            this.currentState = this.states[name];
            if (this.currentState.enter) {
                this.currentState.enter();
            }
        }
    }

    update() {
        if (this.currentState && this.currentState.update) {
            this.currentState.update();
        }
    }

    draw(context) {
        if (this.currentState && this.currentState.draw) {
            this.currentState.draw(context);
        }
    }
}
