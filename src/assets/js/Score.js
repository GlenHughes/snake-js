export default class Score {
    constructor() {
        this.score = 0;
        this.gameScore = document.getElementById('game-score');
    }

    getScore() {
        return this.score;
    }

    setScore(point) {
        this.score = point === 0 ? 0 : this.score + 1;
        this.gameScore.textContent = this.score;
    }
}