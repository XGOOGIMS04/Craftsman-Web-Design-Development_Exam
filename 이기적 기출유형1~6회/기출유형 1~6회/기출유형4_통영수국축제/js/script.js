$(function(){
    // 메뉴
    $("nav > ul > li").mouseenter(function(){
        $(this).children(".sub").stop().slideDown();
    })
    $("nav > ul > li").mouseleave(function(){
        $(".sub").stop().slideUp();
    })

    // 슬라이드
    let i = 0;
    function slide(){
        if(i < 2){
            i++;
        }
        else {
            i = 0;
        }
        $(".slide ul").animate({ marginLeft: -100 * i + "%" }, 1000);
    }
    setInterval(slide, 3000);

    // 탭메뉴
    let t;

    $(".tabmenu > li").click(function(){
        $(".tabmenu > li").removeClass("on");
        $(this).addClass("on");

        t = $(this).index();
        console.log(t);

        $(".tabcon").hide();
        $(".tabcon").eq(t).show();
        return false;
    });

    // 팝업
    $(".pop").click(function(){
        $(".popup").show();
        return false;
    })
    $(".close button").click(function(){
        $(".popup").hide();
    })
})