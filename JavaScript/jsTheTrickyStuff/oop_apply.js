function Car(make, model, year){
    this.make = make;
    this.model = model;
    this.year = year;
    this.numWheels = 4;
}

//takes the utility of Car and overrides numWheels
function Motercycle(make, model, year){
    //arguments array for make, model, year
    Car.apply(this, arguments);
    this.numWheels = 2;
}