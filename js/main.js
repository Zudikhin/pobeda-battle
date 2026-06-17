 $(document).ready(function() {
  "use strict";

    $('.battle').addClass('loaded');

    $(".wrong_modal_close").click(function() {
        $(".back_modal").removeClass("active");
        $(".wrong_modal").removeClass("active");
    });

    $(".back_modal").click(function() {
        $(this).removeClass("active");
        $(".wrong_modal").removeClass("active");
        $(".battle_video-content").empty();
        $("#video-modal").removeClass("active");
    });

    $('.battle_project_mob_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        fade: true,
        prevArrow: $('.battle_project_mob_btns_prev'),
        nextArrow: $('.battle_project_mob_btns_next')
    });

    $('.battle_review_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        variableWidth: true,
        prevArrow: $('.battle_review_arrows_prev'),
        nextArrow: $('.battle_review_arrows_next'),
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    fade: true,
                    variableWidth: false,
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.battle_about_mob').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        fade: true,
        prevArrow: $('.battle_about_mob_btns_prev'),
        nextArrow: $('.battle_about_mob_btns_next')
    });

    if($(window).width() > 768) {
        $('.battle_about_slider_wrapper').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            prevArrow: $('.battle_about_slider_btns_prev'),
            nextArrow: $('.battle_about_slider_btns_next'),
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    $('.slider_wrapper').each(function() {

        const $wrapper = $(this);

        $wrapper.find('.season_slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            prevArrow: $wrapper.find('.slider_wrapper_btns_prev'),
            nextArrow: $wrapper.find('.slider_wrapper_btns_next'),
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        fade: true,
                        variableWidth: false,
                        slidesToShow: 1
                    }
                }
            ]
        });

    });

    function switchSeason(targetId) {

        if (isAnimating) return;
        isAnimating = true;

        const current = $('.slider_wrapper.active');
        const next = $('#' + targetId);

        next.addClass('is-next');

        // прячем новый далеко слева
        gsap.set(next, {
            xPercent: -100
        });

        const tl = gsap.timeline({
            onComplete() {

                current.removeClass('active');

                next
                    .removeClass('is-next')
                    .addClass('active');

                gsap.set(current, {
                    clearProps: 'all'
                });

                gsap.set(next, {
                    clearProps: 'all'
                });

                isAnimating = false;
            }
        });

        if($(window).width() < 480) {

            tl.to(current, {
                xPercent: 100,
                x: 260,
                duration: 1.5,
                ease: 'none'
            });

            tl.to(next, {
                xPercent: 0,
                duration: 1.5,
                ease: 'none'
            });

        } else if($(window).width() > 480 && $(window).width() < 768) {

            tl.to(current, {
                xPercent: 100,
                x: 450,
                duration: 1.5,
                ease: 'none'
            });

            tl.to(next, {
                xPercent: 0,
                duration: 1.5,
                ease: 'none'
            });

        } else {

            tl.to(current, {
                xPercent: 100,
                x: 450,
                duration: 2,
                ease: 'none'
            });

            tl.to(next, {
                xPercent: 0,
                duration: 2,
                ease: 'none'
            });

        }

    }

    let isAnimating = false;


    $('.battle_releases_tabs_item').on('click', function () {

        const targetId = $(this).data('target');

        if ($(this).hasClass('active')) return;

        $('.battle_releases_tabs_item').removeClass('active');
        $(this).addClass('active');

        switchSeason(targetId);
    });


    $(document).on('click', '.video-item', function (e) {
        e.preventDefault();

        let url = $(this).data('video');
        let embedUrl = '';

        // Rutube
        if (url.includes('rutube.ru/video/')) {

            let match = url.match(/\/video\/([a-z0-9]+)/i);

            if (match) {
                embedUrl = 'https://rutube.ru/play/embed/' + match[1] + '/?autoplay=1';
            }
        }

        // VK Video (если хранится iframe ссылка)
        else if (url.includes('video_ext.php')) {
            embedUrl = url + '&autoplay=1';
        }

        if (!embedUrl) {
            return;
        }

        $('#video-modal .battle_video-content').html(
            '<iframe ' +
            'src="' + embedUrl + '" ' +
            'width="100%" ' +
            'height="100%" ' +
            'frameborder="0" ' +
            'allow="autoplay; fullscreen" ' +
            'allowfullscreen>' +
            '</iframe>'
        );

        $(".back_modal").addClass("active");
        $("#video-modal").addClass("active");

    });

    $(".battle_video-wrapper_close").click(function() {
        $(".battle_video-content").empty();
        $("#video-modal").removeClass("active");
        $(".back_modal").removeClass("active");
    });

});
