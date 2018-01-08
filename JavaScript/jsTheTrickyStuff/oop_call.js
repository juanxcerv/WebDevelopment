function Car(make, model, year){
    this.make = make;
    this.model = model;
    this.year = year;
    this.numWheels = 4;
}

//takes the utility of Car and overrides numWheels
function Motercycle(make, model, year){
    Car.call(this, make, model, year);
    this.numWheels = 2;
}