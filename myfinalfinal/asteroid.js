var clickCount = 0;
function clickHandler(evt) {
    clickCount++;
    var str = "ad " + clickCount;
    this.innerText = str;
    matrix[5][5] = 9;
}

var p = document.getElementById("asteroid");
p.addEventListener("click", clickHandler);
console.log(matrix[5][5]);