$(function(){
    // 메뉴
    $("nav > ul > li").mouseenter(function(){
        $(".sub").stop().slideDown();
    })
    $("nav > ul > li").mouseleave(function(){
        $(".sub").stop().slideUp();
    })

    // 슬라이드
    let i = 0;
    function slide(){
        if(i < 2){
            i++;
        } else {
            i = 0;
        }
        $(".slide ul li").fadeOut();
        $(".slide ul li").eq(i).fadeIn();
    }
    setInterval(slide, 3000);

    //팝업
    $(".pop").click(function(){
        $(".popup").show();
        return false;
    })
    $(".close button").click(function(){
        $(".popup").hide();
    })
})