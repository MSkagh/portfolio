import CanvasManager from './canvasManager.js'

export default class Scene {
    constructor(tileImageSrc, tileSize, tilemap) {
        this.tileImage = new Image();
        this.tileImage.src = tileImageSrc
        this.tilemap = tilemap
        this.tileSize = tileSize
        this.context = CanvasManager.ctx
    }

    draw() {
        this.#drawTilemap()
    }

    #drawTilemap() {
        for (let y = 0; y < this.tilemap.length; y++) {
            for (let x = 0; x < this.tilemap[y].length; x++) {
                this.#drawTile(x, y, this.tilemap[y][x]);
            }
        }
    }

    #drawTile(x, y, tile) {
        const context = this.context
        const ts = this.tileSize
        let col = this.tileSize
        let row = this.tileSize
        switch (tile) {
            case 0:
                context.drawImage(this.tileImage, col * 0, row * 0, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 1:
                context.drawImage(this.tileImage, col * 1, row * 0, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 2:
                context.drawImage(this.tileImage, col * 2, row * 0, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 3:
                context.drawImage(this.tileImage, col * 3, row * 0, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 4:
                context.drawImage(this.tileImage, col * 4, row * 0, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 5:
                context.drawImage(this.tileImage, col * 5, row * 0, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 6:
                context.drawImage(this.tileImage, col * 6, row * 0, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 7:
                context.drawImage(this.tileImage, col * 7, row * 0, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 8:
                context.drawImage(this.tileImage, col * 8, row * 0, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 9:
                context.drawImage(this.tileImage, col * 9, row * 0, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 10:
                context.drawImage(this.tileImage, col * 0, row * 1, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 11:
                context.drawImage(this.tileImage, col * 1, row * 1, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 12:
                context.drawImage(this.tileImage, col * 2, row * 1, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 13:
                context.drawImage(this.tileImage, col * 3, row * 1, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 14:
                context.drawImage(this.tileImage, col * 4, row * 1, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 15:
                context.drawImage(this.tileImage, col * 5, row * 1, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 16:
                context.drawImage(this.tileImage, col * 6, row * 1, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 17:
                context.drawImage(this.tileImage, col * 7, row * 1, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 18:
                context.drawImage(this.tileImage, col * 8, row * 1, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 19:
                context.drawImage(this.tileImage, col * 9, row * 1, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 20:
                context.drawImage(this.tileImage, col * 0, row * 2, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 21:
                context.drawImage(this.tileImage, col * 1, row * 2, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 22:
                context.drawImage(this.tileImage, col * 2, row * 2, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 23:
                context.drawImage(this.tileImage, col * 3, row * 2, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 24:
                context.drawImage(this.tileImage, col * 4, row * 2, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 25:
                context.drawImage(this.tileImage, col * 5, row * 2, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 26:
                context.drawImage(this.tileImage, col * 6, row * 2, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 27:
                context.drawImage(this.tileImage, col * 7, row * 2, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 28:
                context.drawImage(this.tileImage, col * 8, row * 2, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 29:
                context.drawImage(this.tileImage, col * 9, row * 2, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 30:
                context.drawImage(this.tileImage, col * 0, row * 3, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 31:
                context.drawImage(this.tileImage, col * 1, row * 3, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 32:
                context.drawImage(this.tileImage, col * 2, row * 3, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 33:
                context.drawImage(this.tileImage, col * 3, row * 3, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 34:
                context.drawImage(this.tileImage, col * 4, row * 3, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 35:
                context.drawImage(this.tileImage, col * 5, row * 3, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 36:
                context.drawImage(this.tileImage, col * 6, row * 3, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 37:
                context.drawImage(this.tileImage, col * 7, row * 3, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 38:
                context.drawImage(this.tileImage, col * 8, row * 3, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 39:
                context.drawImage(this.tileImage, col * 9, row * 3, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 40:
                context.drawImage(this.tileImage, col * 0, row * 4, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 41:
                context.drawImage(this.tileImage, col * 1, row * 4, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 42:
                context.drawImage(this.tileImage, col * 2, row * 4, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 43:
                context.drawImage(this.tileImage, col * 3, row * 4, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 44:
                context.drawImage(this.tileImage, col * 4, row * 4, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 45:
                context.drawImage(this.tileImage, col * 5, row * 4, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 46:
                context.drawImage(this.tileImage, col * 6, row * 4, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 47:
                context.drawImage(this.tileImage, col * 7, row * 4, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 48:
                context.drawImage(this.tileImage, col * 8, row * 4, ts, ts, x * ts, y * ts, ts, ts);
                break
            case 49:
                context.drawImage(this.tileImage, col * 9, row * 4, ts, ts, x * ts, y * ts, ts, ts);
                break
        }
    }
}