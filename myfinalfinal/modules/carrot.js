var LiveForm = require("./LiveForm");
var random = require("./random.js");


module.exports = class Carrot extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
    }
    getNewCoordinates() {
        return super.getNewDirections();
    }
    chooseCell(character) {//stugum ev veradardznum e shrjaka vandakneri kerparnery
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    mul() {   //bazmanal
        this.multiply++;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell && this.multiply >= 2) {//2 takty mek bazmanum e
            carrotscount++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 1;
            let carrot = new Carrot(x, y);
            carrots.push(carrot);
            this.multiply = 0;
        }
    }
}