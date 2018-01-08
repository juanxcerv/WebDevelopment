var age = prompt("Age?");

var days = age*365;

alert("you are this many days old: " + days)

var answer = prompt("are we there yet?");
while (answer.indexOf("yes") === -1) {
    var answer = prompt("are we there yet?");
}
alert("we there");

// function declaration
function doSomething(){
    return "Hello"
}

// function expression
var said = function() {
    return "Hello"
}

function capitalize(s){
    if (typeof s === "number"){
        return "not a string";
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
}

var cap = capitalize("paris");
alert(cap);

// turns - to _ and vice versa if included in the string 
// example : hello-world -> hello_world
function kebab(s) {
    // replace method str.replace(str1, str2) replaces all instances of str1 with str2 in str
    var charArray = s.split("");
    for(var i = 0; i < s.length; i++) {
        if (charArray[i] == "-") {
            charArray[i] = "_";
        } else if((charArray[i] == "_")) {
            charArray[i] = "-";
        }
    }
    return charArray.join("");
}

var phrase = "goodbye!";

function innerScopePhrase(){
    // phrase is changed only within this scope, remains the same outside, to update outside take out var
    var phrase = "hello";
    console.log(phrase);
}

//stack push and pop
//queue unshift(add) and shift(remove)
//arr.indexOf(var) returns the index it finds first occurence of it at or -1 if not found
//arr.slice(start, end) returns a subarray non inclusive at the end non destructive if called on new array var

//foreach does something to each element can pass a function along as well: arr.forEach(function(arr_element))
//mostly used with anonymous functions aka inline functions created inside of parameter to forEach
//but if using an already defined function just pass in the function as a parameter
// [1,2,3].forEach(function(el, i, arr) {
//     console.log(el, i, arr);
//   });
// function logNums(el, i, arr) {
//     console.log(el, i, arr);
//   }
   
//   [1,2,3].forEach(logNums);
var todos = []
todos.forEach(function(todo, i){
    console.log(i + ": " + todo);
});
//splice(index, how many elements to delete starting at index)

//adds a function to the array propertys can now use as arr.myForEach(func)
Array.prototype.myForEach = function(func){
    for(var i = 0; i < this.length; i++){
        func(this[i]);
    }
}

// objects
var me = {
    name: 'Juan',
    city: 'Berkeley',
    occupation: 'student'
};

console.log(me['name'])
// or
console.log(me.name)

//can initialze as the following
var person = new Object();
person.name = "Juan";
person.city = "Berkeley";
person["occupation"] = "student";

var movies = [
    {
        title: "Inception",
        hasWatched: true,
        rating: 5
    },
    {
        title: "Interstellar",
        hasWatched: true,
        rating: 5
    },
    {
        title: "Les miserables",
        hasWatched: false,
        rating: 4.5
    }
    ];

movies.forEach(function(movie){
    var result = "You have ";
    if (movie.hasWatched){
        result += "watched "
    } else{
        result += "not watched "
    }
    result += "\"" + movie.title + "\" -";
    result += movie.rating + " stars";
    console.log(result);
})

var cat = {};
cat.speak = function(){
    console.log("Meow");
}

var dog = {}
dog.speak = function(){
    console.log("Woof!");
}

// "this" example

var comments = {};
comments.data = ["nice job!", "ew", "well done :)"];

comments.print = function(){
    this.data.forEach(function(el){
        console.log(el);
    });
};