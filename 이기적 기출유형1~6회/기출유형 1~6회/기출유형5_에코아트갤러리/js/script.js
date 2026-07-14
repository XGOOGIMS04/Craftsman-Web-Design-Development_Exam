$(function(){
    // 메뉴
    $("nav > ul > li").mouseenter(function(){
        $(this).children(".sub").stop().fadeIn(300);
    })
    $("nav > ul > li").mouseleave(function(){
        $(".sub").stop().fadeOut(300);
    })

    // 팝업창
    $(".pop").click(function(){
        $(".popup").show();
        return false;
    })
    $(".close button").click(function(){
        $(".popup").hide();
    })

    // 슬라이드
    function slide(){
        $(".slide ul").animate({ marginTop: -700 }, 1000, function () {
            $(".slide ul").append($(".slide ul li").first());
            $(".slide ul").css({ marginTop: 0 });
        });
    }
    setInterval(slide, 3000);
})