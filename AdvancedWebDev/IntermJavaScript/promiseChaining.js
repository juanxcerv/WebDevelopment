var promise = new Promise(function(resolve, reject){
    setTimeout(function(){
        var randomInt = Math.floor(Math.random()*10);
        resolve(randomInt);
    }, 500);
});

promise.then(function(data){
    console.log("Random int passed to resolve: " + data);
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            var anotherRandomInt = Math.floor(Math.random()*10);
            resolve(anotherRandomInt);
        },3000);
    });
}).then(function(data){
    console.log("second random int passed to resolve: " + data);
});

