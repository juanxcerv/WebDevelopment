var colors = generateColors(6);
var pickedcolor = pickColor();
var squares = document.querySelectorAll(".square");
var colorD = document.getElementById("colorDisplay");
var message = document.querySelector("#message");
var header = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
colorD.textContent = pickedcolor;
var howMany = 6;
function toggled(){
    if (this == easyBtn){
        easyBtn.classList.add("selected");
        hardBtn.classList.remove("selected");
        howMany = 3;
        reset();
        for(var i = 3; i < 6; i++) {
            squares[i].style.background = "none";
        }
    } else {
        hardBtn.classList.add("selected");
        easyBtn.classList.remove("selected");
        howMany = 6;
        reset();
    }
}
easyBtn.addEventListener("click", toggled);
hardBtn.addEventListener("click", toggled);

resetButton.addEventListener("click", reset);

function reset(){
    colors = generateColors(howMany);
    pickedcolor = pickColor();
    colorD.textContent = pickedcolor;
    for(var i = 0; i < colors.length; i++) {
        squares[i].style.background = colors[i];
    }
    header.style.background = "steelblue";
    message.textContent = "";
    resetButton.textContent = "Shuffle Colors";
}
for (var i = 0; i < squares.length; i++){
    squares[i].style.backgroundColor = colors[i];
    squares[i].addEventListener("click", function(){
        var clickedColor = this.style.backgroundColor;
        if (clickedColor === pickedcolor){
            message.textContent = "Correct!";
            changeColor(pickedcolor);
            header.style.background = pickedcolor;
            resetButton.textContent = "Play again?";
        } else {
            if (this.style.background !== "none"){
                this.style.backgroundColor = "#232323";
                message.textContent = "Try again";
            }
        }
    });
}

function changeColor(color){
    for (var i = 0; i < colors.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random =  Math.floor(Math.random()*colors.length);
    return colors[random];
}

function generateColors(num){
    //make array
    var gencolors = []
    for(var i = 0; i < num; i++){
        //get random color and push into array
        gencolors.push(randomColor());
    }
    return gencolors
}

function randomColor(){
    //pick a red, green, blue from 0 - 255
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}