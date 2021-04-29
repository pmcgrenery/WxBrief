$(document).ready(function () {

    // Opaque header background on scroll
    $(window).on("scroll", function () {
        if ($(window).scrollTop() > 50) {
            $(".transparent-header").addClass("active");
        } else {
            //remove the background property so it comes transparent again (defined in your css)
            $(".transparent-header").removeClass("active");
        }
    });

    // Burger Menu Animation
    let menuOpen = false;

    $("#burger").click(function () {
        if (!menuOpen) {
            $("#line-one").addClass("rotate-top");
            $("#line-two").addClass("slide-out");
            $("#line-three").addClass("rotate-bottom");
            menuOpen = true;
        } else {
            $("#line-one").removeClass("rotate-top");
            $("#line-two").removeClass("slide-out");
            $("#line-three").removeClass("rotate-bottom");
            menuOpen = false;
        }
    })

    // Menu slide toggle
    // Modified from: https: //codepen.io/gvissing/pen/oxBJEz
    $("#burger").click(function () {
        $(".nav-menu").animate({
            width: "toggle"
        }, 175);
    });

    // Run the resize function every time the screen changes size
    $(window).on("resize", resize);
    resize();

    function resize() {
        let wh = $(window).innerHeight();
        let hh = $("header").height();
        $("#airports").css("margin-top", `${(hh + 16)}px`);
        $(".airport-details").css("margin-top", `${hh + 16}px`);
        $("#landing-card").css("margin-top", `${(1.25 * hh)}px`);
        $("#accordion").css("margin-top", `${(hh + 16)}px`);
        if ($(window).width() > 990) {
            // On larger screens show fold on bottom 30% of screen
            $("#landing-card").css("height", `${(wh-hh)-(wh*.3)}px`);
        } else {
            // On smaller screens only show fold on bottom 15%
            $("#landing-card").css("height", `${(wh-hh)-(wh*.15)}px`);
        };

        if ($(window).width() > 350) {
            $("#get-briefed").addClass("btn-lg");
        } else {
            $("#get-briefed").removeClass("btn-lg");
        };

    }

    // Button press animation
    $("#get-briefed").click(function (event) {
        // Stop the link instantly firing
        event.preventDefault();
        let href = $(this).attr('href');

        // Do the animation
        $(this).addClass("shrink");
        $(this).delay(50).queue(function () {
            $(this).addClass("grow")
        });

        // Follow the link
        setTimeout(function () {
            window.location.href = href;
        }, 100)

    });

    //Accordian
    $(function () {
        $("#accordion").accordion({
            heightStyle: "content"
        });
    });
});