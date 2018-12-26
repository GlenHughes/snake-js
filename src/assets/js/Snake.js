export default class Snake {
    constructor() {
        this.squares = [];
        this.width = 10;
        this.height = 10;
        this.position = {
            x: 1,
            y: 1,
        }
    }

    getSquares() {
        return this.squares;
    }

    getHead() {
        return this.getSquares()[0];
    }

    getLength() {
        return this.squares.length;
    }

    /**
     * set snake to next location
     * @param {integer} x x position of snake head
     * @param {integer} y y position of snake head 
     */
    forward(x, y) {
        this.squares.unshift({
            x,
            y,
        });
    }

    removeTail(x, y) {
        this.squares.pop(); 
    }

    reset() {
        this.squares = [];
    }

    addSquare(position) {
        this.squares.push(position);
    }

    rebuild() {
        const snakeLength = 7;
        for (let i = 0; i < snakeLength - 1; i++) {
            this.addSquare({
                x: i,
                y: 0,
            });
        }
    }

    flipHead(x, y, canvasWidth, canvasHeight) {
        const realX = x > 0 ? x * 10 : 0;
        const realY = y > 0 ? y * 10 : 0;
        let newHeadLocation;
        
        if (realX >= canvasWidth) {
            newHeadLocation = {
                x: 0,
                y,
            }
        } else if(realX <= 0) {
            newHeadLocation = {
                x: canvasWidth / this.width,
                y,
            }
        } else if (realY >= canvasHeight) {
            newHeadLocation = {
                x,
                y: 0,
            }
        } else if (realY <= 0) {
            newHeadLocation = {
                x,
                y: canvasHeight / this.height,
            }
        }

        return newHeadLocation;
    }
}