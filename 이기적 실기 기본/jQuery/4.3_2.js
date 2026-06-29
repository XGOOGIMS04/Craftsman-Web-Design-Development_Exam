$(function(){
    $(".box1").animate({"left" : "600px"}, 1000)
    $(".box2").animate({"left" : "600px"}, 1000, function(){
        $(".box2").animate({"left" : "0px"}, 1000);
    })
})