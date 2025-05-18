import { CanvasManager } from './canvasManager.js'
import { PlayerManager } from './playerManager.js'

export default class Scene {
    constructor(tileImageSrc, tileSize, tilemap) {
        this.tileImage = new Image();
        this.tileImage.src = tileImageSrc
        this.tilemapIntMask = this.#parseTileMap(tilemap)
        this.tilemap = tilemap
        this.tileSize = tileSize
        this.context = CanvasManager.instance.context;
        this.playerManager = new PlayerManager();
        this.player = this.playerManager.player
    }

    draw() {
        this.#drawTilemap()
        this.playerManager.draw()
    }
    update(deltaTime) {
        this.playerManager.update(deltaTime);
    }

    isColliding(x, y, width, height) {
        const tileSize = this.tileSize;
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        const checkPoints = [
            { x: x, y: y }, // Top-left
            { x: x + width, y: y }, // Top-right
            { x: x, y: y + height }, // Bottom-left
            { x: x + width, y: y + height }, // Bottom-right
            { x: x + halfWidth, y }, // Top-middle
            { x: x + halfWidth, y: y + height }, // Bottom-middle
            { x: x, y: y + halfHeight }, // Left-middle
            { x: x + width, y: y + halfHeight } // Right-middle
        ];


        return checkPoints.some((point) => {
            const correctionX = point.x > 0 ? -1 : 0; // Shift right detection by 1 pixel
            const correctionY = point.y > 0 ? 0 : -1; // Shift top detection by 1 pixel

            const tileX = Math.floor(point.x / tileSize);
            const tileY = Math.floor(point.y / tileSize);

            // Return true if the tile is out of bounds or not empty
            if (tileY < 0 || tileY >= this.tilemap.length || tileX < 0 || tileX >= this.tilemap[0].length) {
                return true;
            }
            const tile = this.tilemap[tileY][tileX];
            if (tile !== 0) {
                return true;
            }
            return false;
        });
    }

    #drawTilemap() {
        for (let y = 0; y < this.tilemapIntMask.length; y++) {
            for (let x = 0; x < this.tilemapIntMask[y].length; x++) {
                this.#drawTile(x, y, this.tilemapIntMask[y][x]);
            }
        }
    }

    /**
     * Parses a 2d array by checking which adjecent values are 1
     * @returns returns a 2d array of masks representing which surrounding tiles contains a tile
     */
    #parseTileMap(tileMap) {
        const parsed2dArray = []

        const directions = [
            { dx: -1, dy: -1 }, // Top-left
            { dx: -1, dy: 0 },  // Top
            { dx: -1, dy: 1 },  // Top-right
            { dx: 0, dy: -1 },  // Left
            { dx: 0, dy: 1 },   // Right
            { dx: 1, dy: -1 },  // Bottom-left
            { dx: 1, dy: 0 },   // Bottom
            { dx: 1, dy: 1 }    // Bottom-right
        ];

        for (let x = 0; x < tileMap.length; x++) {
            parsed2dArray.push([]);

            for (let y = 0; y < tileMap[x].length; y++) {
                if (tileMap[x][y] === 0) {
                    parsed2dArray[x].push("0")
                    continue
                }
                const intMask = directions.map(({ dx, dy }) =>
                    tileMap[x + dx]?.[y + dy] === 1 ? "1" : "0"
                ).join("");


                parsed2dArray[x].push(intMask)
            }
        }

        return parsed2dArray
    }

    #getCategoryFromIntMask(tile) {
        if (tile === "0") return { category: null, rotation: 0 }
        if (tile === "11111111") return { category: "full", rotation: 0 };

        if (tile === "00000000") return { category: "empty", rotation: 0 };
        if (tile === "00000001") return { category: "empty", rotation: 0 };
        if (tile === "00000100") return { category: "empty", rotation: 0 };
        if (tile === "00100000") return { category: "empty", rotation: 0 };
        if (tile === "10100101") return { category: "empty", rotation: 0 };
        if (tile === "10100100") return { category: "empty", rotation: 0 };
        if (tile === "10100001") return { category: "empty", rotation: 0 };
        if (tile === "10100001") return { category: "empty", rotation: 0 };
        if (tile === "10100001") return { category: "empty", rotation: 0 };
        if (tile === "00000101") return { category: "empty", rotation: 0 };
        if (tile === "00100001") return { category: "empty", rotation: 0 };
        if (tile === "10000100") return { category: "empty", rotation: 0 };
        if (tile === "10100000") return { category: "empty", rotation: 0 };
        if (tile === "10000001") return { category: "empty", rotation: 0 };
        if (tile === "00100100") return { category: "empty", rotation: 0 };
        if (tile === "10000000") return { category: "empty", rotation: 0 };

        // Corners (rotated dynamically)
        if (tile === "01111111") return { category: "corner", rotation: 0 }; // Top-left
        if (tile === "11011111") return { category: "corner", rotation: 90 }; // Top-right
        if (tile === "11111110") return { category: "corner", rotation: 180 }; // Bottom-left
        if (tile === "11111011") return { category: "corner", rotation: 270 }; // Bottom-right

        if (tile === "01011111") return { category: "corners-two", rotation: 0 }; // Top
        if (tile === "11111010") return { category: "corners-two", rotation: 180 }; // Bottom
        if (tile === "01111011") return { category: "corners-two", rotation: 270 }; // Left
        if (tile === "11011110") return { category: "corners-two", rotation: 90 }; // Right

        if (tile === "01111010") return { category: "corners-three", rotation: 180 };
        if (tile === "01011110") return { category: "corners-three", rotation: 0 };
        if (tile === "11011010") return { category: "corners-three", rotation: 90 };
        if (tile === "01011011") return { category: "corners-three", rotation: 270 };


        // Edges (rotated dynamically)
        if (tile === "00011111") return { category: "edge", rotation: 90 }; // Top
        if (tile === "10111111") return { category: "edge", rotation: 90 }; // Top
        if (tile === "10011111") return { category: "edge", rotation: 90 }; // Top
        if (tile === "00111111") return { category: "edge", rotation: 90 }; // Top

        if (tile === "01101011") return { category: "edge", rotation: 0 }; // Left
        if (tile === "11101011") return { category: "edge", rotation: 0 }; // Left
        if (tile === "01101111") return { category: "edge", rotation: 0 }; // Left

        if (tile === "11111000") return { category: "edge", rotation: 270 }; // Bottom
        if (tile === "11111101") return { category: "edge", rotation: 270 }; // Bottom

        if (tile === "11010110") return { category: "edge", rotation: 180 }; // Right
        if (tile === "00111000") return { category: "edge", rotation: 180 }; // Right
        if (tile === "11110110") return { category: "edge", rotation: 180 }; // Right
        if (tile === "11010111") return { category: "edge", rotation: 180 }; // Right


        // Edges with corners (rotated dynamically)
        if (tile === "01001111") return { category: "edge-corner", rotation: 0 }; // Left
        if (tile === "01111000") return { category: "edge-corner", rotation: 270 }; // Bottom

        if (tile === "11011000") return { category: "edge-corner-diagonal", rotation: 270 }; // Bottom
        if (tile === "11011101") return { category: "edge-corner-diagonal", rotation: 270 }; // Bottom
        if (tile === "01010111") return { category: "edge-corner-diagonal", rotation: 180 }; // Right
        if (tile === "01010110") return { category: "edge-corner-diagonal", rotation: 180 }; // Right
        if (tile === "01101110") return { category: "edge-corner-diagonal", rotation: 0 }; // Left
        if (tile === "00011011") return { category: "edge-corner-diagonal", rotation: 90 }; // Top
        if (tile === "10111011") return { category: "edge-corner-diagonal", rotation: 90 }; // Top

        if (tile === "00011010") return { category: "edge-two-corners", rotation: 90 }; // Top
        if (tile === "01011000") return { category: "edge-two-corners", rotation: 270 }; // Bottom
        if (tile === "01010010") return { category: "edge-two-corners", rotation: 180 }; // Right
        if (tile === "01001010") return { category: "edge-two-corners", rotation: 0 }; // Left


        // T-Junctions (rotated dynamically)
        if (tile === "00111100") return { category: "T-junction", rotation: 270 }; // Right-facing


        // Crossroad (no rotation needed)
        if (tile === "01011010") return { category: "crossroad", rotation: 0 };


        // Ends (rotated dynamically)
        if (tile === "01000000") return { category: "end", rotation: 180 }; // Bottom
        if (tile === "11100000") return { category: "end", rotation: 180 }; // Bottom
        if (tile === "01100001") return { category: "end", rotation: 180 };
        if (tile === "01000001") return { category: "end", rotation: 180 };
        if (tile === "01000100") return { category: "end", rotation: 180 };
        if (tile === "01100000") return { category: "end", rotation: 180 };
        if (tile === "11000000") return { category: "end", rotation: 180 };

        if (tile === "00000010") return { category: "end", rotation: 0 }; // Top
        if (tile === "00000011") return { category: "end", rotation: 0 }; // Top
        if (tile === "00000111") return { category: "end", rotation: 0 }; // Top
        if (tile === "00000110") return { category: "end", rotation: 0 }; // Top
        if (tile === "00100011") return { category: "end", rotation: 0 };
        if (tile === "00100010") return { category: "end", rotation: 0 };
        if (tile === "10000010") return { category: "end", rotation: 0 };

        if (tile === "00001000") return { category: "end", rotation: 270 }; // Left
        if (tile === "00001001") return { category: "end", rotation: 270 }; // Left
        if (tile === "00001101") return { category: "end", rotation: 270 }; // Left
        if (tile === "10101000") return { category: "end", rotation: 270 }; // Left
        if (tile === "00101000") return { category: "end", rotation: 270 }; // Left
        if (tile === "00001100") return { category: "end", rotation: 270 }; // Left
        if (tile === "10001000") return { category: "end", rotation: 270 }; // Left
        if (tile === "00101001") return { category: "end", rotation: 270 }; // Left

        if (tile === "00010000") return { category: "end", rotation: 90 }; // Right
        if (tile === "00010100") return { category: "end", rotation: 90 }; // Right
        if (tile === "00010101") return { category: "end", rotation: 90 }; // Right
        if (tile === "10010000") return { category: "end", rotation: 90 }; // Right
        if (tile === "00010001") return { category: "end", rotation: 90 }; // Right
        if (tile === "00110000") return { category: "end", rotation: 90 }; // Right
        if (tile === "10010100") return { category: "end", rotation: 90 }; // Right

        // Corridors (rotated dynamically)

        if (tile === "11100111") return { category: "corridor", rotation: 90 }; // Vertical
        if (tile === "01000111") return { category: "corridor", rotation: 90 }; // Vertical
        if (tile === "11100010") return { category: "corridor", rotation: 90 }; // Vertical
        if (tile === "01100011") return { category: "corridor", rotation: 90 }; // Vertical
        if (tile === "11000110") return { category: "corridor", rotation: 90 }; // Vertical
        if (tile === "01000010") return { category: "corridor", rotation: 90 }; // Vertical
        if (tile === "01000011") return { category: "corridor", rotation: 90 }; // Vertical
        if (tile === "01000110") return { category: "corridor", rotation: 90 }; // Vertical
        if (tile === "01100010") return { category: "corridor", rotation: 90 }; // Vertical
        if (tile === "11000010") return { category: "corridor", rotation: 90 }; // Vertical


        if (tile === "00011000") return { category: "corridor", rotation: 0 }; // Horizontal
        if (tile === "10011100") return { category: "corridor", rotation: 0 }; // Horizontal
        if (tile === "00111001") return { category: "corridor", rotation: 0 }; // Horizontal
        if (tile === "00011101") return { category: "corridor", rotation: 0 }; // Horizontal
        if (tile === "10111101") return { category: "corridor", rotation: 0 }; // Horizontal
        if (tile === "10111000") return { category: "corridor", rotation: 0 }; // Horizontal
        if (tile === "10111001") return { category: "corridor", rotation: 0 }; // Horizontal
        if (tile === "00111101") return { category: "corridor", rotation: 0 }; // Horizontal


        // L-shapes (rotated dynamically)

        if (tile === "00010110") return { category: "L-shape", rotation: 180 }; // Top-right
        if (tile === "10110111") return { category: "L-shape", rotation: 180 }; // Top-right
        if (tile === "00010111") return { category: "L-shape", rotation: 180 }; // Top-right
        if (tile === "10010110") return { category: "L-shape", rotation: 180 }; // Top-right
        if (tile === "10010111") return { category: "L-shape", rotation: 180 }; // Top-right

        if (tile === "00001011") return { category: "L-shape", rotation: 90 }; // Top-left
        if (tile === "10101111") return { category: "L-shape", rotation: 90 }; // Top-left
        if (tile === "10001111") return { category: "L-shape", rotation: 90 }; // Top-left
        if (tile === "10001111") return { category: "L-shape", rotation: 90 }; // Top-left
        if (tile === "00101011") return { category: "L-shape", rotation: 90 }; // Top-left
        if (tile === "00001111") return { category: "L-shape", rotation: 90 }; // Top-left
        if (tile === "00101111") return { category: "L-shape", rotation: 90 }; // Top-left

        if (tile === "11110000") return { category: "L-shape", rotation: 270 }; // Bottom-right
        if (tile === "11010000") return { category: "L-shape", rotation: 270 }; // Bottom-right
        if (tile === "11010100") return { category: "L-shape", rotation: 270 }; // Bottom-right
        if (tile === "11110100") return { category: "L-shape", rotation: 270 }; // Bottom-right

        if (tile === "01101000") return { category: "L-shape", rotation: 0 }; // Bottom-left
        if (tile === "01101001") return { category: "L-shape", rotation: 0 }; // Bottom-left
        if (tile === "11101000") return { category: "L-shape", rotation: 0 }; // Bottom-left
        if (tile === "11101001") return { category: "L-shape", rotation: 0 }; // Bottom-left
        if (tile === "11101100") return { category: "L-shape", rotation: 0 }; // Bottom-left


        if (tile === "00010010") return { category: "L-shape-corner", rotation: 180 }; // Top-right
        if (tile === "10010010") return { category: "L-shape-corner", rotation: 180 }; // Top-right
        if (tile === "00001010") return { category: "L-shape-corner", rotation: 90 }; // Top-left
        if (tile === "00001110") return { category: "L-shape-corner", rotation: 90 }; // Top-left
        if (tile === "01001000") return { category: "L-shape-corner", rotation: 0 }; // Bottom-left
        if (tile === "01001001") return { category: "L-shape-corner", rotation: 0 }; // Bottom-left
        if (tile === "01010000") return { category: "L-shape-corner", rotation: 270 }; // Bottom-right
        if (tile === "01110000") return { category: "L-shape-corner", rotation: 270 }; // Bottom-right



        // Default fallback
        return { category: "full", rotation: 0 };
    }

    #drawImageShorthand(rowNumber, colNumber, x, y, rotation = 0) {
        const context = this.context
        const ts = this.tileSize

        context.save();
        context.translate(x * ts + ts / 2, y * ts + ts / 2);
        context.rotate((rotation * Math.PI) / 180);
        context.translate(-ts / 2, -ts / 2);

        context.drawImage(this.tileImage, colNumber * ts, rowNumber * ts, ts, ts, 0, 0, ts, ts);
        context.restore();

    }


    #drawTile(x, y, tile) {
        const { category, rotation } = this.#getCategoryFromIntMask(tile);
        const mapping = TILE_MAPPING[category];

        if (mapping) {
            const { row, col } = mapping;
            this.#drawImageShorthand(row, col, x, y, rotation);
        }

    }


}

const TILE_MAPPING = {
    "empty": { row: 2, col: 4 },          // No neighbors
    "full": { row: 0, col: 0 },           // Surrounded on all sides
    "corner": { row: 0, col: 1 },         // All corners (rotated dynamically)
    "corners-two": { row: 0, col: 2 },
    "corners-two-diagonal": { row: 0, col: 3 },
    "corners-three": { row: 0, col: 4 },
    "edge": { row: 1, col: 1 },           // All edges (rotated dynamically)
    "edge-corner": { row: 1, col: 2 },
    "edge-corner-diagonal": { row: 1, col: 3 },
    "edge-two-corners": { row: 1, col: 4 }, // Edge with two corners (rotated dynamically)
    "T-junction": { row: 1, col: 4 },     // All T-junctions (rotated dynamically)
    "crossroad": { row: 1, col: 0 },      // Crossroad (no rotation needed)
    "end": { row: 2, col: 3 },            // End tiles (rotated dynamically)
    "corridor": { row: 2, col: 0 },       // Horizontal or vertical corridors
    "L-shape": { row: 2, col: 1 },          // L-shape (rotate dynamically)
    "L-shape-corner": { row: 2, col: 2 }           // L-shape (rotate dynamically)
}