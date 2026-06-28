$(function(){
    $(".list > li:first-child").css("text-decoration", "underline"); // .list 자식 li중 첫번째요소 선택
    $(".list > li").first().css("background", "yellow"); // list 자식 li중 첫번째 요소 선택
    $(".list > li:last-child").css("text-decoration", "underline"); // .list 자식 li중 마지막요소 선택
    $(".list > li").last().css("background", "green"); // .list 자식 li중 마지막요소 선택
    $(".list2 li").eq(0).css("color", "red"); // .list2 li의 인덱스 번호가 0 인 요소 선택
    $(".list").find(".sub").css("color", "blue"); // .list 자손 중 ".sub" 선택

    $("li").click(function(){ // li 요소 클릭시
        $(this).css("font-weight", "bold"); // 클릭한 요소(this)
    })
})