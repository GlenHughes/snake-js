export default class Canvas {
    constructor(snakeWidth, snakeHeight) {
        this.element = document.getElementById('game-canvas');
        this.context = this.element.getContext('2d');
        this.width = this.element.width;
        this.height = this.element.height;
        this.snakeWidth = snakeWidth;
        this.snakeHeight = snakeHeight;
    }
}