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
        const tileSize = this.tileSize
        switch (tile) {
            case 0:
                context.drawImage(this.tileImage, 0, 0, 32, 32, x * tileSize, y * tileSize, tileSize, tileSize);
                break
            case 1:
                context.drawImage(this.tileImage, 32, 0, 32, 32, x * tileSize, y * tileSize, tileSize, tileSize);
                break
            case 2:
                context.drawImage(this.tileImage, 64, 0, 32, 32, x * tileSize, y * tileSize, tileSize, tileSize);
                break
            case 3:
                context.drawImage(this.tileImage, 96, 0, 32, 32, x * tileSize, y * tileSize, tileSize, tileSize);
                break
            case 4:
                context.drawImage(this.tileImage, 0, 32, 32, 32, x * tileSize, y * tileSize, tileSize, tileSize);
                break
            case 5:
                context.drawImage(this.tileImage, 32, 32, 32, 32, x * tileSize, y * tileSize, tileSize, tileSize);

                break
            case 6:
                context.drawImage(this.tileImage, 64, 32, 32, 32, x * tileSize, y * tileSize, tileSize, tileSize);
                break
            case 7:
                context.drawImage(this.tileImage, 96, 32, 32, 32, x * tileSize, y * tileSize, tileSize, tileSize);

                break
            case 8:
                context.drawImage(this.tileImage, 0, 64, 32, 32, x * tileSize, y * tileSize, tileSize, tileSize);

                break
            case 10:
                context.drawImage(this.tileImage, 32, 64, 32, 32, x * tileSize, y * tileSize, tileSize, tileSize);

                break
            case 11:
                context.drawImage(this.tileImage, 64, 64, 32, 32, x * tileSize, y * tileSize, tileSize, tileSize);

                break
            case 12:
                context.drawImage(this.tileImage, 96, 64, 32, 32, x * tileSize, y * tileSize, tileSize, tileSize);

                break
            case 13:
                context.drawImage(this.tileImage, 0, 96, 32, 32, x * tileSize, y * tileSize, tileSize, tileSize);

                break
            case 14:
                context.drawImage(this.tileImage, 32, 96, 32, 32, x * tileSize, y * tileSize, tileSize, tileSize);

                break
            case 15:
                context.drawImage(this.tileImage, 64, 96, 32, 32, x * tileSize, y * tileSize, tileSize, tileSize);

                break
            case 16:
                context.drawImage(this.tileImage, 96, 96, 32, 32, x * tileSize, y * tileSize, tileSize, tileSize);

                break
            default:

                break
        }
    }
}