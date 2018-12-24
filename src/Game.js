import Canvas from './assets/js/Canvas';
import Score from './assets/js/Score';
import Snake from './assets/js/Snake';

import './assets/css/game-styles.css';

export default class SnakeJS {
    constructor() {
        console.log('snake game has been loaded');
        this.container = document.getElementById('game-container');
        this.snakeWidth = 10;
        this.snakeHeight = 10;
        this.snake = [];
        this.canvas = new Canvas(this.snakeWidth, this.snakeHeight);

        // set default direction
        this.direction = 'right';
        // allow user to change direction with keys
        document.addEventListener('keydown', event => {
            this.setDirection(event.keyCode);
        });
        // this.score = new Score(container);
        // this.snake = new Snake(container);

        const length = 5;

        for (let i = 0; i < length - 1; i++) {
            this.snake.push({
                x: i,
                y: 0,
            })
        }

        setInterval(this.draw.bind(this), 60);
    }

    draw() {
        this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.snake.forEach((position, index) => {
            const { x, y } = position;
            this.drawSnake(x, y);
        });
        
        // current snake head
        let { x, y } = this.snake[0];
        this.snake.pop();
        if (this.direction === 'left') {
            x--;
        } else if (this.direction === 'up') {
            y--;
        } else if (this.direction === 'right') {
            x++;
        } else if (this.direction === 'down') {
            y++;
        }

        this.snake.unshift({
            x,
            y,
        });
    }

    drawSnake(x, y) {
        this.canvas.context.fillStyle = '#fff';
        this.canvas.context.fillRect(
            x * this.snakeWidth, 
            y * this.snakeHeight, 
            this.snakeWidth, 
            this.snakeHeight
        );
        this.canvas.context.fillStyle = '#000';
        this.canvas.context.strokeRect(
            x * this.snakeWidth, 
            y * this.snakeHeight, 
            this.snakeWidth,
            this.snakeHeight
        );

    }

    setDirection(keyCode) {
        switch(keyCode) {
            case 37: //left
                if (this.direction !== 'right') {
                    this.direction = 'left';
                }
                break;
            case 38: // up
                if (this.direction !== 'down') {
                    this.direction = 'up';
                }
                break;
            case 39: // right
                if (this.direction !== 'left') {
                    this.direction = 'right';
                }
                break;
            case 40: // down
                if (this.direction !== 'up') {
                    this.direction = 'down';
                }
                break;   
        }  
    }
}

const snake = new SnakeJS();
