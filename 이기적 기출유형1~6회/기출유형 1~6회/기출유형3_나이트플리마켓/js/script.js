$(function(){
    // 메뉴
    $("nav > ul > li").mouseover(function(){
        $(this).children(".sub").stop().fadeIn();
    })
    $("nav > ul > li").mouseout(function(){
        $(".sub").stop().fadeOut();
    })

    // 슬라이드
    let i = 0;
    function slide(){
        if(i < 2) {
            i++;
        }
        else {
            i = 0;
        }
        $(".slide ul").animate({ marginTop: -350 * i}, 1000);
    }
    setInterval(slide, 3000);
    
    // 팝업
    $(".pop").click(function(){
        $(".popup").show();
        return false;
    })
    $(".close button").click(function(){
        $(".popup").hide();
    })
})