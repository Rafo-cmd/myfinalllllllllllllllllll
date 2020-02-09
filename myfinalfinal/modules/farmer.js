var LiveForm = require("./LiveForm");
var Carrot = require("./carrot");
var random = require("./random.js");

module.exports = class Farmer extends LiveForm {
    constructor(x, y) {
        super(x, y);
    }
    getNewCoordinates() {
        return super.getNewDirections();
    }
    chooseCells(character) {//stugum ev veradardznum e shrjaka vandakneri kerparnery
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    plant() {
        //sharjvel
        this.getNewCoordinates();
        var emptyCells = this.chooseCells(0);
        var coords = random(emptyCells);
        if (coords) {
            var x = coords[0];
            var y = coords[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 1;
            carrots.push(new Carrot(x, y));
            this.x = x;
            this.y = y;
        }
    }
}