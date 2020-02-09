var LiveForm = require("./LiveForm.js");
var random = require("./random.js");




module.exports = class Hunter extends LiveForm {
    constructor(x, y) {
        super(x, y);
    }
    getNewDirections() {
        return super.getNewDirections();
    }
    chooseCells(character) {
        this.getNewDirections();
        return super.chooseCell(character);
    }
    move() {
        //move
        this.getNewDirections();
        return super.move(5);
    }
    hunt() {
        //utel
        var predatorsCells = this.chooseCells(3);
        var predator = random(predatorsCells);
        if (predator) {
            var x = predator[0];
            var y = predator[1];
            matrix[this.y][this.x] = 0;
            matrix[y][x] = 5;
            this.y = y;
            this.x = x;
            for (var i in predators) {
                if (predators[i].x == x && predators[i].y == y) {
                    predators.splice(i, 1)
                    break;
                }
            }
        }else{
            this.move()
        }
        //inchpes veracnel hunternerin erb verjanum en gazannery   
    }
}