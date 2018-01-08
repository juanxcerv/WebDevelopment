function counter(){
    var count = 0;
    return function(){
        return ++count;
    }
}
//no one has access to the variable count from global since its
//defines inside of counter
var c = counter();
c(); //1
c(); //2
c(); //3

function classRoom(){
    var instructors = ["Colt", "Elie"];
    return {
        getInstructors: function(){
            return instructors;
        },
        addInstructor: function(instructor){
            instructors.push(instructor);
            return instructors;
        }
    };
}

course1 = classRoom();
course1.getInstructors(); //[Ellie, Colt]
course1.addInstructor("Ian"); //[Ellie, Colt Ian]
course1.getInstructors(); //[Ellie, Colt Ian]

course2 = classRoom();
course2.getInstructors(); //[Ellie, Colt]