/* Soohyun 2022 PortFolio JS */
$(function () {
    mouse();
    parallax();
    projectDetail();
})

$(window).on('load', function () {
    var $innerHeight = $(window).innerHeight();

    $('.container').delay(1500).fadeIn('slow');
    $('body').css('height', $innerHeight);
});

function mouse() {

    $(window).mousemove(function (e) {
        var x = e.clientX;
        var y = e.clientY;
        $('.cursor').css('left', x + 'px');
        $('.cursor').css('top', y + 'px');
    })

    $('.header .menu, .arrow>button, .project .list, .i_move').mouseover(function () {
        $('.cursor').addClass('active');
    });

    $('.header .menu, .arrow>button, .project .list, .i_move').mouseleave(function () {
        $('.cursor').removeClass('active');
    });
}

function parallax() {
    var numPage = $('section').length;
    var pageNow = 0;
    var pagePrev = 0;
    var pageNext = 0;
    var direction = 0;
    var isWheelBlocked = false;
    var timerId = '';
    var effectTimerId = '';

    $('section').each(function (i) {
        $(this).css({ 'top': (i * 100) + '%' });
        $(this).prepend('<a href="#" class="hidden start">' + (i + 1) + '번 페이지 시작</a>').append('<a href="#" class="hidden end">' + (i + 1) + '번 페이지 끝</a>');
    });
    showPage(1);

    //header
    $('.header .menu_bx .menu').on('click', function () {
        var index = $('.header .menu_bx .menu').index($(this));
        showPage(index + 1);
    });

    //right arrow
    $('.arrow .prev').on('click', function () {
        if (pageNow === 1) { //첫 페이지에서 실행 x
            return false;
        } else {
            showPage(pagePrev);
        }
    });
    $('.arrow .next').on('click', function () {
        if (pageNow === numPage) { //마지막 페이지에서 실행 x
            return false;
        } else {
            showPage(pageNext);
        }
    });

    //mousewheel event (PC)
    $(window).on('mousewheel DOMMouseScroll', function (e) {
        clearTimeout(timerId);
        timerId = setTimeout(function () { isWheelBlocked = false }, 300);
        if (isWheelBlocked === true) return false;
        isWheelBlocked = true;
        //정규화
        if (e.originalEvent.wheelDelta === undefined) { //FF
            direction = e.originalEvent.detail / 3;
        } else { //표준
            direction = e.originalEvent.wheelDelta / -120;
        }
        if (direction > 0) { //mousewheel down 
            if (pageNow === numPage) {
                return false;
            } else {
                showPage(pageNext);
            }
        } else { //mousewheel up
            if (pageNow === 1) {
                return false;
            } else {
                showPage(pagePrev);
            }
        }
    });

    function showPage(n) {
        clearTimeout(effectTimerId);
        if (pageNow === 0) {
            $('.bg_wrap').css({ 'transition': 'none' });
            $('.header .menu, .arrow, .scroll').addClass('dark');
            $('.container').removeClass('change');
            $('.profile .txt_bx').addClass('bg_show');
        } else {
            $('.bg_wrap').css({ 'transition': 'top 0.7s ease-in-out' });
            $('.header .menu, .arrow, .scroll').removeClass('dark');
            $('.container').addClass('change');
            $('.profile .txt_bx').removeClass('bg_show');
        }

        if (n === 1) {
            $('.header .menu, .arrow, .scroll').addClass('dark');
            $('.container').removeClass('change');
            $('.profile .txt_bx').addClass('bg_show');
        } else {
            $('.header .menu, .arrow, .scroll').removeClass('dark');
            $('.container').addClass('change');
            $('.profile .txt_bx').removeClass('bg_show');
        }

        if (n === numPage) {
            $('.scroll').css('opacity', '0');
        } else {
            $('.scroll').css('opacity', '1');
        }

        $('.bg_wrap').css({ 'top': -((n - 1) * 100) + '%' });
        $('.header .menu_bx .menu').removeClass('on');
        $('.header .menu_bx .menu:eq(' + (n - 1) + ')').addClass('on');

        pageNow = n;
        pagePrev = (n - 1) < 1 ? 1 : n - 1;
        pageNext = (n + 1) > numPage ? numPage : n + 1;
    }
}

//project list click event
function projectDetail() {
    $('.project .right_bx .list').on('click', function () {
        $('.project .right_bx').addClass('right');
        $('.project .left_bx').fadeIn(2300);

        var $index = $(this).index();

        $(this).addClass('on');
        $('.project .right_bx .list').not(this).removeClass('on');
        $('.project .left_bx .view').removeClass('on');
        $('.project .left_bx .view').eq($index).addClass('on');
    })
}
