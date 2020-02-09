var LiveForm = require("./LiveForm");
var random = require("./random.js");


module.exports = class Predator extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 150;
    }
    getNewDirections() {
        return super.getNewDirections();
    }
    chooseCells(character) {
        this.getNewDirections();
        return super.chooseCell(character);
    }
    mul() {
        predatorscount++;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            let predator = new Predator(x, y);
            predators.push(predator);
            this.life = this.life / 2;
        }
    }
    eat() {
        let rabbitCells = this.chooseCell(2);
        let rabbit = random(rabbitCells);

        if (rabbit) {

            this.life++;
            let x = rabbit[0];
            let y = rabbit[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            for (let i in rabbits) {
                if (rabbits[i].x == x && rabbits[i].y == y) {
                    rabbits.splice(i, 1)
                    break;
                }
            }
            this.x = x;
            this.y = y;

            if (this.life > 150) {
                this.mul();
            }
        }
        else {
            this.move()
        }
    }
    move() {
        this.life--;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.life < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in predators) {
            if (predators[i].x == this.x && predators[i].y == this.y) {
                predators.splice(i, 1);
                break;
            }
        }
    }
}