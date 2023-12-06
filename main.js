// 메인 슬라이드
$(function(){    
    var swiper = new Swiper(".swiper-container.type1", {
        loop:'true',
        slidesPerView: 1,
        speed: 400,
        autoplay : { 
            delay : 4000,
            disableOnInteraction : false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
    });
    var swiper = new Swiper(".swiper-container.prof_bnr", {
        direction: 'vertical',
        loop:'true',
        slidesPerView: 1,
        speed: 400,
        autoplay : { 
            delay : 4000,
            disableOnInteraction : false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
    });
    var swiper = new Swiper(".swiper-container.type2", {
        loop:'true',
        slidesPerView: 1,
        speed: 400,
        autoplay : { 
            delay : 4000,
            disableOnInteraction : false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
    });
    var swiper = new Swiper('.swiper-container.type3', {
        slidesPerView: 4,
        spaceBetween: 20,
        loop:'true',
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        speed: 400,
    });
    var swiper = new Swiper('.swiper-container.mov_bnr', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop:'true',
        speed: 400,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
    });
    var swiper = new Swiper('.swiper-container.book_bnr', {
        slidesPerView: 4,
        spaceBetween: 10,
        speed: 400,
        loop:'true',
        autoplay : { 
            delay : 4000,
            disableOnInteraction : false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
    });
//////////////
})

//핫클립 레이어팝업 : 영상
function fnPlayMovie(vod_code){
    var position_top = $(this).scrollTop()+100;   //레이어 top 위치 23.12.05
    $('#layerPop').css({ top : position_top });
    url_text = encodeURI('https://www.youtube.com/embed/'+vod_code+'?autoplay=1&vq=hd1080&rel=0&start=0');

    if (vod_code == 99){
        $('#layerPop').fadeOut();
        $('#player_youtube').attr('src', '');
    } else {
        $('#layerPop').fadeIn();
        $('#player_youtube').attr('src', url_text);
    }
}
