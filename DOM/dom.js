var body = document.querySelector("body");
var isBlue = false;

setInterval(function(){
    if (isBlue) {
        body.style.background = "white";
    } else {
        body.style.background = "#3498db";
    }
    isBlue = !isBlue;
}, 3000);

// selector methods
// document.getElementById() - a single object
// document.getElementsByClassName() - a list(not arrays) of objects with the class 
// document.getElementsByTagName() - a list of elements that have the same tag ex:"li elements"
// document.querySelector() - returns first element that matches a given CSS-style selector ex: #highlighted, .bolded
// document.querySelectorAll() - returns all elements that match a given CSS-style selector ex .bolded

var tag = document.getElementById("highlighted");
// below is bad practice instead of directly changing the style instead make a css class that can be toggled
// on and off by javascript and then add doing:
tag.classList.toggle("some-class") 
// which adds if not already 
// on and turns off if already on classlist
var tag = document.querySelector("button");
var change = document.querySelector("body");
tag.addEventListener("click", function(){
    change.classList.toggle("toggled");
});

// tag.style.color = "Gray";
// tag.style.border = "1px solid red";
// tag.style.fontSize = "2em";
// tag.style.background = "yellow";
// tag.style.marginTop = "200px";

//tag.textContent - return all the text contained inside an element
// tag.innerHTML - returns and keeps all html tags alongside the content for the element
//both can be used to update text but textcontent ignores tags while innerhtml applied tags

// getAttribute and setAttribute

var link = document.querySelector("a");
link.getAttribute("href");

link.setAttribute("href", "www.google.com");

var picture = document.querySelector("img");
picture.setAttribute("src", "corgi.png");

//element.addEventListener(type/action, function)