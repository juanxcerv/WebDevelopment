// var styles = {
//     background: "red",
//     color: "white",
//     border: "5px solid green"
// }

// $("h1").css(styles);

//just like textContent
// $('li').text("Hello");

//just like innerHtml
// $('ul').html("<li>I hacked your UL! muahaha </li><li>hi</li>");

$('img').css("width", "150px");
$('img').click(function(){
    $(this).attr("src", "https://pbs.twimg.com/media/CVYzrh-WwAAw2wa.jpg");
    // $('input').attr("type", "color");
});
//reset inputs
// $('input').val("");
 
//last() for last and first-of-type for first

// $('h1').addClass('done');
// $('h1').removeClass('done');

// $('li').toggleClass('wrong');

// $('input').keypress(function(event){
//     if (event.which === 13) {
//         alert("you hit enter");
//     }
// });

//on is like addEventListener and will be the most used

$('h1').on("click", function(){
    $(this).css("color", "purple");
});

$('img').on("mouseenter", function(){
    $(this).css("border", "5px solid yellow");
});
$('img').on("mouseleave", function(){
    $(this).css("border", "none");
});

$('button').on("click" , function(){
    $('img').fadeOut(1500, function(){
        $('img').fadeIn(1000, function(){
            $('img').slideUp(1000, function(){
                $(this).remove();
            });
        });
    });
}); 