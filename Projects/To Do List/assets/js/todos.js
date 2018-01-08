// var crossOut = {
//     "textDecoration": "line-through",
//     "color": "gray"
// }
// var uncross = {
//     "textDecoration": "none",
//     "color": "black"
// }
//Check off Specific todos marking completion
$('ul').on("click", "li", function(){
    $(this).toggleClass("completed");
    // ($(this).css("color") === "rgb(128, 128, 128)") ? $(this).css(uncross) : $(this).css(crossOut);
});

//Delete todos as user sees fit
$('ul').on("click", "span", function(event){
    $(this).parent().fadeOut(750, function(){
        $(this).remove();
    });
    event.stopPropagation();
});


$("input[type='text']").on("keypress", function(event){
    if(event.which === 13){
        //grab new todo from user input
        var inputval = $(this).val();
        $(this).val("");
        //create new li and add to ul
        $('ul').append("<li><span><i class='fa fa-trash' aria-hidden='true'></i></span> " + inputval + "</li>");
    }
});

$(".fa-plus").on("click", function(){
    $("input[type='text']").fadeToggle();
});