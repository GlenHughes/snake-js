import Canvas from './assets/js/Canvas';
import Score from './assets/js/Score';
import Snake from './assets/js/Snake';
import Food from './assets/js/Food';

import './assets/css/game-styles.css';

const defaultConfig = {
    gameSpeed: 60, // snake speed in milliseconds
    container: 'game-container',
    gameOver: '#game-over',
    snakeColour: '#fff',
    snakeWidth: 10,
    snakeHeight: 10,
    outlineColour: '#000',
}

export default class SnakeJS {
    constructor(config) {
        console.log('snake game has been loaded');
        this.setConfig(config);
        this.container = document.getElementById(this.config.container);
        this.gameOverEl = this.container.querySelector(this.config.gameOver);
        this.score = new Score();
        this.snake = new Snake(
            this.config.snakeColour, 
            this.config.outlineColour,
            this.config.snakeWidth,
            this.config.snakeHeight,
        );
        this.canvas = new Canvas(
            400,
            400,
            this.snake.width, 
            this.snake.height
        );
        this.food = new Food(this.canvas, this.snake);
        this.snake.init(this.canvas);
        this.startGame();

        // allow user to change direction with keys
        document.addEventListener('keydown', event => {
            this.setDirection(event.keyCode);
        });

        // allow restart of game
        this.gameOverEl.querySelector('button').addEventListener('click', event => {
            this.startGame();
        });

        setInterval(() => {
            if (this.running) {
                this.draw();
            }
        }, this.config.gameSpeed);
    }

    setConfig(config) {
        if (!config) {
            return this.config = defaultConfig;
        }
        this.config = { defaultConfig, ...config };
    }

    draw() {
        this.canvas.clear();

        this.snake.getSquares().forEach(position => {
            const { x, y } = position;
            this.snake.draw(x, y);
        });

        this.food.draw();

        // current snake head
        let { x, y } = this.snake.getHead();
            
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
        if (x < 0 || 
            y < 0 || 
            x >= this.canvas.width / this.snake.width || 
            y >= this.canvas.height / this.snake.width) {
            const newHeadPosition = this.snake.flipHead(x, y, this.canvas.width, this.canvas.height);
            x = newHeadPosition.x;
            y = newHeadPosition.y;
        }

        // hit self
        if (this.frames > this.snake.getLength()) {
            if (this.checkCollision(x, y)) {
                this.gameOver();
            }
        }

        // eats the food
        if (x === this.food.x && y === this.food.y) {
            this.food.position();
            this.food.draw();
            this.score.setScore();
        } else {
            this.snake.removeTail();
        }

        this.snake.forward(x, y);

        this.frames++;
    }

    

    checkCollision(x, y) {
        for (let i = 0; i < this.snake.getLength(); i++) {
            if (x === this.snake.getSquares()[i].x && y === this.snake.getSquares()[i].y) {
                return true;
            }
        }
        return false;
    }

    startGame() {
        console.log('Start game');
        this.running = true;
        this.frames = 0;
        this.score.setScore(0);
        this.snake.reset();
        this.direction = 'right';
        this.snake.rebuild();
        this.food.position();
        this.gameOverEl.style.display = 'none';
    }

    gameOver() {
        console.log('Game over!');
        this.running = false;
        this.frames = 0;
        this.gameOverEl.querySelector('span').textContent = this.score.getScore();
        this.score.setScore(0);
        this.gameOverEl.style.display = 'block';
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
