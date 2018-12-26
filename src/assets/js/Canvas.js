export default class Canvas {
    constructor(canvasWidth, canvasHeight, snakeWidth, snakeHeight) {
        this.element = document.getElementById('game-canvas');
        this.element.width = this.width = canvasWidth;
        this.element.height = this.height = canvasHeight;
        this.context = this.element.getContext('2d');
        this.snakeWidth = snakeWidth;
        this.snakeHeight = snakeHeight;
    }

    clear() {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
    }
}