var p1 = new Promise(function(resolve, reject){
    var num = Math.random();
    if (num < .5){
        resolve(num);
    } else {
        reject(num);
    }
});

p1.then(function(result){
    console.log("Success:",result);
}).catch(function(error){
    console.log("Failure:",error);
});

// Example

var promise = new Promise(function(resolve, reject){
    setTimeout(function(){
        var randomInt = Math.floor(Math.random()*10);
        resolve(randomInt);
    }, 5000);
});

promise.then(function(result){
    console.log("After waiting for so long here is your int: " + result);
}).catch(function(error){
    console.log(error);
});