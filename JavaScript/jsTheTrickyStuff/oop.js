//constructor functions

function House(bedrooms, bathrooms, numSqft) {
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.numSqft = numSqft;
}

var myHouse = new House(1, 1, 1000);

function Dog(name, age){
    this.name = name;
    this.age = age;
    this.bark = function(){
        console.log(this.name + " just barked!");
    }
}

var panchita = new Dog("panchita", 1);
// panchita.bark();