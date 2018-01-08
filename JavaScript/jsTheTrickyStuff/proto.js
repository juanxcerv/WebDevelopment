function Person(name){
    this.name = name;
}

var juan = new Person("Juan");
var steph = new Person("Stephanie");

juan.__proto__ === Person.prototype; //true
steph.__proto__ === Person.prototype; //true

Person.prototype.isStudent = true;

juan.isStudent; //true
steph.isStudent; //true