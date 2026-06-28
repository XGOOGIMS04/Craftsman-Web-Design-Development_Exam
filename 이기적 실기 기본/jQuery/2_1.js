$(function(){
    $("*").css("color", "red"); // 전체 선택자
    $("p").css("text-decoration", "underLine"); // 태그 선택자
    $(".point").css("background", "yellow"); // class 선택자
    $("#title").css("color", "green"); // id 선택자
    $("p, button").css("font-size", "22px"); // 다중 선택자
})