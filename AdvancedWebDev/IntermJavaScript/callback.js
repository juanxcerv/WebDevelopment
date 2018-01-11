var strings = ["my", "forEach", "example"];

var result = "";

strings.forEach(function(str, index, arr){
    if (arr.length - 1 !== index) {
        result += str + " ";
    } else {
        result += str + "!!!";
    }
});
result = "my forEach example!!!"

//making the forEach function

function forEach(array, callback){
    for(var i = 0; i < array.length; i++){
        callback(array[i], i, array);
    }
}
function findIndex(array, callback){
    for(var i = 0; i < array.length; i++){
        if (callback(array[i], i, array)) {
            return i;
        }
    }
    return -1;
}

function upperCaseFirst(word){
    return word[0].toUpperCase() + word.slice(1);
}
//Stack Example
function upperCaseWords(sentence){
    var words = sentence.split(" ");
    words.forEach(function(word, i, arr){
        words[i] = upperCaseFirst(word);
    });
    return words.join(" ");
}

console.log(upperCaseWords("This is a word I learned in spanish class: delicioso"));


function countDown(time){
    var count = setInterval(function(){
        time = time - 1;
        if (time === 0){
            console.log("Ring Ring Ring!!!");
            clearInterval(count);
        } else{
            console.log("Timer: " + time);
        }
    }, 1000);
}

// countDown(6);
function square(n){
    return n*n;
}
setTimeout(function(){
    console.log("This looks it will finish first, but it doesn't!");
}, 0);

console.log(square(2)); //This gets called first