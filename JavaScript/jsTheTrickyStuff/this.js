// "use strict" allows developers to avoid creating global variables using this inside of other scopes
var person = {
    firstName: "Juan",
    sayHi: function(){
        return "Hi" + this.firstName; // Hi Juan
    },
    determineContext: function(){
        return this === person; //true
    }, 
    dog: {
        sayHello: function(){
            return "Hello" + this.firstName; // Hello undefined
        },
        determineContext: function(){
            return this === person; // false
        }
    }
}

//Explicit Binding: call, apply, bind

//********* Using Call ***********
var juan = {
    firstName: "Juan",
    sayHi: function(){
        return "Hi" + this.firstName;
    }
};

var steph = {
    firstName: "Stephanie"
};
//want to use the sayHi function inside of juan
juan.sayHi.call(steph); // Hi stephanie

//********* Using Apply ***********
var juan = {
    firstName: "Juan",
    sayHi: function(){
        return "Hi" + this.firstName;
    },
    addNumbers: function(a,b,c,d){
        return this.firstName + " just calculated " + (a+b+c+d);
    }
};

var steph = {
    firstName: "Stephanie"
};
//want to use the addNumbers function inside of juan
juan.addNumbers.apply(steph, [1,2,3,4]); //Stephanie just calculated 10

//********* Using Bind ***********
//dont want to invoke the function right away
var stephCalc = juan.addNumbers(steph, 1);
stephCalc(2,3,4); // Stephanie just calculated 10

//new example
var juan = {
    firstName: "Juan",
    sayHi: function(){
        setTimeout(function(){
            //'this' will refer to the global because of the time
            console.log("Hi" + this.firstName);
        }, 1000);
    }
}
//THE FIX
var juan = {
    firstName: "Juan",
    sayHi: function(){
        setTimeout(function(){
            //'this' will refer to the global because of the time
            console.log("Hi" + this.firstName);
        }.bind(this), 1000);
    }
}