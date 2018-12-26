const colours = {
    food: 'yellow',
}

export default class Food {
    constructor(canvas, snake) {
        this.canvas = canvas;
        this.snake = snake;
        this.position();
    }

    draw() {
        this.canvas.context.fillStyle = colours.food;
        this.canvas.context.fillRect(
            this.x * this.snake.width, 
            this.y * this.snake.height, 
            this.snake.width, 
            this.snake.height
        );
        this.canvas.context.fillStyle = '#000';
        this.canvas.context.strokeRect(
            this.x * this.snake.width, 
            this.y * this.snake.height, 
            this.snake.width,
            this.snake.height
        );
    }

    position() {
        this.x = Math.round(Math.random() * (this.canvas.width / this.snake.width - 1));
        this.y = Math.round(Math.random() * (this.canvas.height / this.snake.height - 1));
    }
}