
var p1s = 0;
var p2s = 0;
var gameOver = false;
var p1button = document.querySelector("#p1");
var p2button = document.querySelector("#p2");
var p1display = document.querySelector("#p1score");
var p2display = document.querySelector("#p2score");
var maxgamesdisplay = document.querySelector("#numgames");
var inputmaxgames = document.querySelector("input");

document.querySelector("#reset").addEventListener("click", function(){
    reset();
});

function reset(){
    p1s = 0;
    p2s = 0;
    gameOver = false
    p1display.style.color = "black";
    p2display.style.color = "black";
    p1display.textContent = p1s;
    p2display.textContent = p2s;
}
p1button.addEventListener("click", function(){

    if (!gameOver) {
        p1s = p1s + 1;
        if (p1s === Number(maxgamesdisplay.textContent)) {
            gameOver= true;
            p1display.style.color = "green";
            p2display.style.color = "red";
        }
        p1display.textContent = p1s;
    }
});

p2button.addEventListener("click", function(){
    if (!gameOver) {
        p2s = p2s + 1;
        if (p2s === Number(maxgamesdisplay.textContent)) {
            gameOver= true;
            p2display.style.color = "green";
            p1display.style.color = "red";
        }
        p2display.textContent = p2s;
    }
});

inputmaxgames.addEventListener("change", function(){
    maxgamesdisplay.textContent = this.value;
    reset();
});