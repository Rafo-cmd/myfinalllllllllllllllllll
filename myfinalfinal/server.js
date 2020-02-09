
//! Requiring modules  --  START
var Carrot = require("./modules/carrot.js");
var Rabbit = require("./modules/rabbit.js");
var Predator = require("./modules/predator.js");
var Farmer = require("./modules/farmer.js");
var Hunter = require("./modules/hunter.js");
var Omnivorous = require("./modules/omnivorous.js");
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
carrots = [];     
rabbits = [];
predators = [];
farmers = [];
hunters = [];
omnivorouses = [];
matrix = [];
weather = "";
day = 0;
carrotscount = 0;
rabbitscount = 0;
predatorscount = 0;
farmerscount = 0;
hunterscount = 0;
omnivorousescount = 0;
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, carrot, rabbit, predator, farmer, hunter, omnivorous) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < carrot; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < rabbit; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < farmer; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < hunter; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < omnivorous; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
}
matrixGenerator(40, 25, 25, 15, 5, 5, 1);
//! Creating MATRIX -- END


    //! SERVER STUFF  --  START
    var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3002);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var rabbit = new Rabbit(x, y);
                rabbits.push(rabbit);
                rabbitscount++;
            } else if (matrix[y][x] == 1) {
                var carrot = new Carrot(x, y);
                carrots.push(carrot);
                carrotscount++;
            } else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predators.push(predator);
                predatorscount++;
            } else if (matrix[y][x] == 4) {
                var farmer = new Farmer(x, y);
                farmers.push(farmer);
                farmerscount++;
            } else if (matrix[y][x] == 5) {
                var hunter = new Hunter(x, y);
                hunters.push(hunter);
                hunterscount++;
            } else if (matrix[y][x] == 6) {
                var omnivorous = new Omnivorous(x, y);
                omnivorouses.push(omnivorous);
                omnivorousescount++;
            }
        }
    }
}
creatingObjects();

carrotreanimaciacount = 0;
rabbitreanimaciacount = 0;



function game() {
    day++;
    if(day >= 0 && day <= 91){
        weather = "winter"
    }else if(day >= 92 && day <= 183){
        weather = "spring"
    }else if(day >= 184 && day <= 275){
        weather = "summer"
    }else if(day >= 276 && day <= 366){
        weather = "autumn"
    }
    if (carrots[0] !== undefined) {
        for (var i in carrots) {
            carrots[i].mul();
        }
    }
    if (rabbits[0] !== undefined) {
        for (var i in rabbits) {
            rabbits[i].eat();
        }
    }
    if (predators[0] !== undefined) {
        for (var i in predators) {
            predators[i].eat();
        }
    }
    if (farmers[0] !== undefined) {
        for (var i in farmers) {
            farmers[i].plant();
        }
    }
    if (hunters[0] !== undefined) {
        for (var i in hunters) {
            hunters[i].hunt();
        }
    }
    if (omnivorouses[0] !== undefined) {
        for (var i in omnivorouses) {
            omnivorouses[i].eat();
        }
    }

    function changecharacter(character,newcharacter){
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == character) {
                    matrix[y][x] = newcharacter;
                    for (var i in carrots) {
                        if (carrots[i].x == x && carrots[i].y == y) {
                            carrots.splice(i, 1)
                            break;
                        }
                    }
                }
            }
        }
    }

    
    if(weather == "winter"){
        changecharacter(1,0);
    }

    if(weather == "spring"){
        if(carrotreanimaciacount <= 25){
            let customX = Math.floor(random(matrix[0].length));
            let customY = Math.floor(random(matrix.length));
            matrix[customY][customX] = 1;
            carrotreanimaciacount++; 
        } 
        if(rabbitreanimaciacount <= 25){
            let customX = Math.floor(random(matrix[0].length));
            let customY = Math.floor(random(matrix.length));
            matrix[customY][customX] = 2;
            rabbitreanimaciacount++; 
        } 
    }
    

    //! Object to send
    let sendData = {
        matrix: matrix,
        countofcarrots: carrotscount,
        countofrabbits: rabbitscount,
        countofpredators: predatorscount,
        countoffarmers: farmerscount,
        countofhunters: hunterscount,
        countofomnivorouses: omnivorousescount,
        weather: weather
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 100)