class Player {
    static instance;
    constructor() {
        if (Player.instance) return Player.instance
        this.size = { width: 20, height: 20 };
        this.originalSize = { width: 20, height: 20 };
        this.color = "Red";
        this.position = { x: 40, y: 550 };
        this.velocity = { x: 0, y: 0 };
        this.center = { x: 0, y: 0 };
        this.jumpCount = 2;
        this.abilities = ["doubleJump"];
        this.updateCenter();
        this.instance = this;
    }

    updateCenter() {
        this.center.x = this.position.x + this.size.width / 2;
        this.center.y = this.position.y + this.size.height / 2;
    }

    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
        this.updateCenter();
    }
    renderHitbox(context) {
        context.strokeStyle = "cyan"; // Different color for clarity
        context.lineWidth = 2;

        context.strokeRect(
            this.center.x - this.size.width / 2,
            this.center.y - this.size.height / 2,
            this.size.width,
            this.size.height
        );
    }

    draw(context) {
        this.drawPlayer(context);
       // this.renderHitbox(context);
    }

    drawPlayer(context) {
        context.fillStyle = this.color; // Set outline color
        context.fillRect(
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height
        );
    }
}
const player = new Player();
export default player