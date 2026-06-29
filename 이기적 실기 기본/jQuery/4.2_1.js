$(function(){
    $(".point1").click(function(){ // 클릭이벤트
        $(this).toggleClass("point");
    })
    $(".point2").mouseenter(function(){ // 마우스이벤트
        $(this).addClass("point");
    })
    $(".point2").mouseleave(function(){ // 클릭이벤트
        $(this).removeClass("point");
    })
    $(".point3").hover(function(){ //마우스이벤트 실행문
        $(this).addClass("point");
    }, function(){
        $(this).removeClass("point");
    })
    $(".point4").focusin(function(){ // 포커스가 들어왔을때
        $(this).addClass("point");
    })
    $(".point4").focusout(function(){ // 포커스가 나갔을때
        $(this).removeClass("point");
    })
})