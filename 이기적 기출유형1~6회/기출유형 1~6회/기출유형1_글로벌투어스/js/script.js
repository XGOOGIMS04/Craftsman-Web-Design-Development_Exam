$(function(){
    // 메뉴
    $("nav > ul > li").mouseover(function(){
        $(this).children(".sub").stop().slideDown();
    })
    $("nav > ul > li").mouseout(function () {
        $(".sub").stop().slideUp();
    })

    // 슬라이드
    let i = 0;
    function slide(){
        if(i < 2){  // 계속 증감하는것을 방지, 세번째 다음 첫번째가 보이도옥
            i++;
        }
        else {
            i = 0;
        }
        $(".slide ul").animate({ marginLeft: -1200 * i }, 1000); // 옆으로 이동
    }
    setInterval(slide, 3000); // 반복적 호출

    // 팝업
    $(".pop").click(function(){
        $(".popup").show();
        return false;
    })
    $(".close button").click(function(){
        $(".popup").hide();
    })
})