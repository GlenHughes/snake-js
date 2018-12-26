import Canvas from './assets/js/Canvas';
import Score from './assets/js/Score';
import Snake from './assets/js/Snake';

import './assets/css/game-styles.css';

export default class SnakeJS {
    constructor() {
        console.log('snake game has been loaded');
        this.container = document.getElementById('game-container');
        this.gameOverContainer = this.container.querySelector('#game-over');
        this.gameScoreContainer = this.container.querySelector('#game-score');
        this.snakeWidth = 10;
        this.snakeHeight = 10;
        this.snake = [];
        this.canvas = new Canvas(
            400,
            400,
            this.snakeWidth, 
            this.snakeHeight
        );
        this.startGame();

        // allow user to change direction with keys
        document.addEventListener('keydown', event => {
            this.setDirection(event.keyCode);
        });
        // allow restart of game
        this.gameOverContainer.querySelector('button').addEventListener('click', event => {
            this.startGame();
        });
        // this.score = new Score(container);
        // this.snake = new Snake(container);

        setInterval(() => {
            if (this.running) {
                this.draw();
            }
        }, 60);
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
        if (x < 0 || y < 0 || x >= this.canvas.width / this.snakeWidth || y >= this.canvas.height / this.snakeHeight) {
            const newHeadPosition = this.flipHead(x, y);
            x = newHeadPosition.x;
            y = newHeadPosition.y;
        }

        // hit self
        if (this.frames > this.snake.length) {
            if (this.checkCollision(x, y)) {
                this.gameOver();
            }
        }

        // eats the food
        if (x === this.food.x && y === this.food.y) {
            this.food = this.foodPosition();
            this.setScore();
        } else {
            this.snake.pop();
        }

        // set snake to next location
        this.snake.unshift({
            x,
            y,
        });

        this.frames++;
    }

    flipHead(x, y) {
        const realX = x > 0 ? x * 10 : 0;
        const realY = y > 0 ? y * 10 : 0;
        let newHeadLocation;
        
        if (realX >= this.canvas.width) {
            newHeadLocation = {
                x: 0,
                y,
            }
        } else if(realX <= 0) {
            newHeadLocation = {
                x: this.canvas.width / this.snakeWidth,
                y,
            }
        } else if (realY >= this.canvas.height) {
            newHeadLocation = {
                x,
                y: 0,
            }
        } else if (realY <= 0) {
            newHeadLocation = {
                x,
                y: this.canvas.height / this.snakeHeight,
            }
        }

        return newHeadLocation;
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

    setScore(point) {
        this.score = point === 0 ? 0 : this.score + 1;
        this.gameScoreContainer.textContent = this.score;
    }

    startGame() {
        console.log('Start game');
        this.running = true;
        this.frames = 0;
        this.setScore(0);
        this.snake = [];
        this.direction = 'right';
        const snakeLength = 7;
        for (let i = 0; i < snakeLength - 1; i++) {
            this.snake.push({
                x: i,
                y: 0,
            })
        }

        this.food = this.foodPosition();
        this.gameOverContainer.style.display = 'none';
    }

    gameOver() {
        console.log('Game over!');
        this.running = false;
        this.frames = 0;
        this.gameOverContainer.querySelector('span').textContent = this.score;
        this.setScore(0);
        this.gameOverContainer.style.display = 'block';
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
            x: Math.round(Math.random() * (this.canvas.width / this.snakeWidth - 1)),
            y: Math.round(Math.random() * (this.canvas.height / this.snakeHeight - 1)),
        }
    }
}

const snake = new SnakeJS();
