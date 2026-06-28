$(function(){
    $(".last").css("color", "red");

    $("h1").click(function(){
        $(this).addClass("point"); // addClass 속성_class 추가
    })

    $(".point").click(function(){
        $(this).removeClass("point"); // removeClass 속성_class제거
    })

    $(".box").prepend("앞쪽입니다"); // box 앞쪽에 생성
    $(".box").append("뒤쪽입니다"); // box 뒤쪽에 생성

    let i; // 변수 생성
    $("li").click(function(){ // li요소 클릭 시
        i = $(this).index(); // i변수에 클릭한 li의 index번호 할당
        $(".txt").text(i); // .txt에 i의 값 콘텐츠 설정
    })
})