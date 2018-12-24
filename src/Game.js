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
        this.score = 0;

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

        this.food = this.foodPosition();

        setInterval(this.draw.bind(this), 60);
    }

    draw() {
        this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        

        this.snake.forEach((position, index) => {
            const { x, y } = position;
            this.drawSnake(x, y);
        });

        this.drawFood(this.food.x, this.food.y);

        // current snake head
        let { x, y } = this.snake[0];

        if (this.direction === 'left') {
            x--;
        } else if (this.direction === 'up') {
            y--;
        } else if (this.direction === 'right') {
            x++;
        } else if (this.direction === 'down') {
            y++;
        }

        // hit the wall
        if (x < 0 || y < 0 || x >= this.canvas.width / this.snakeWidth || y >= this.canvas.height / this.snakeHeight || this.checkCollision(x, y)) {
            // end game, show score and get ready to start again
            // this.snake = [{
            //     x: 1,
            //     y: 1,
            // }];
            this.scorePoiht(true);
            console.log('Game over');
            // window.location.reload();ß
        }

        // eats the food
        if (x === this.food.x && y === this.food.y) {
            this.food = this.foodPosition();
            this.scorePoiht(1);
        } else {
            this.snake.pop();
        }

        this.snake.unshift({
            x,
            y,
        });
    }

    checkCollision(x, y) {
        for (let i = 0; i < this.snake.length; i++) {
            if (x === this.snake[i].x && y === this.snake[i].y) {
                return true;
            }
        }
        return false;
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

    drawFood(x, y) {
        this.canvas.context.fillStyle = 'yellow';
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

    scorePoiht(reset) {
        this.score = reset === true ? 0 : this.score + 1;
        
        document.getElementById('game-score').textContent = this.score;
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

    foodPosition() {
        return {
            x: Math.round(Math.random() * (this.canvas.width / this.snakeWidth - 1) + 1),
            y: Math.round(Math.random() * (this.canvas.height / this.snakeHeight - 1) + 1),
        }
    }
}

const snake = new SnakeJS();
