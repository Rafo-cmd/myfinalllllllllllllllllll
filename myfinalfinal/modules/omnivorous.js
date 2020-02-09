var LiveForm = require("./LiveForm.js");
var random = require("./random.js");




module.exports = class Hunter extends LiveForm {
    constructor(x, y) {
        super(x, y);
    }
    getNewDirections() {
        return super.getNewDirections();
    }
    eat() {
        //utel
        this.getNewDirections();
        var allCells = this.directions;
        var allcells = random(allCells);
        if (allcells) {
            var x = allcells[0];
            var y = allcells[1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                matrix[this.y][this.x] = 0;
                matrix[y][x] = 6;
                this.y = y;
                this.x = x;
                for (var i in carrots) {
                    if (carrots[i].x == x && carrots[i].y == y) {
                        carrots.splice(i, 1)
                        break;
                    }
                }
                for (var i in rabbits) {
                    if (rabbits[i].x == x && rabbits[i].y == y) {
                        rabbits.splice(i, 1)
                        break;
                    }
                }
                for (var i in predators) {
                    if (predators[i].x == x && predators[i].y == y) {
                        predators.splice(i, 1)
                        break;
                    }
                }
                for (var i in farmers) {
                    if (farmers[i].x == x && farmers[i].y == y) {
                        farmers.splice(i, 1)
                        break;
                    }
                }
                for (var i in hunters) {
                    if (hunters[i].x == x && hunters[i].y == y) {
                        hunters.splice(i, 1)
                        break;
                    }
                }
            }
        }
    }
}