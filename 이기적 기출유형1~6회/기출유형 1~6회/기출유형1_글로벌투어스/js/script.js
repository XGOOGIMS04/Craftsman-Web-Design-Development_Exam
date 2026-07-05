$(function(){
    // 메뉴
    $("nav > ul > li").mouseover(function(){
        $(this).children(".sub").stop().slideDown();
    })
    $("nav > ul > li").mouseout(function () {
        $(".sub").stop().slideUp();
    });
})