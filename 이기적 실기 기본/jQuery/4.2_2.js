$(function(){
    // mouseenter 이벤트
    $("#box1").mouseenter(function(){
        $(this).css("background-color", "yellow");
        console.log("mouseenter");
    })

    // mouseover 이벤트
    $("#box2").mouseover(function(){
        $(this).css("background-color", "green");
        console.log("mouseover");
    })
})