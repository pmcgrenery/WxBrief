$(document).ready(function () {
    scrollOpaqueHeader();
    burgerAnimation();
    menuSlide();
    setMargins();
    buttonClick();
    selectAirport();
    checkAboutUs();
});

/**
 * When scroll down 50 px or more the header becomes opaque
 */
function scrollOpaqueHeader() {
    $(window).on("scroll", function () {
        if ($(window).scrollTop() > 50) {
            $(".transparent-header").addClass("active");
        } else {
            $(".transparent-header").removeClass("active");
        }
    });
}

/**
 * Animates the burger from three lines to an X
 */
function burgerAnimation() {
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
    });
}

/**
 * Slides menu in from the right
 */
function menuSlide() {
    $("#burger").click(function () {
        $(".nav-menu").animate({
            width: "toggle"
        }, 175);
        $(".nav-item").fadeToggle(675);
        $(".hr-menu").fadeToggle(675);
    });
}

/**
 * Every time the screen changes size, the margins are set dynamically 
 * and button size changes
 */
function setMargins() {
    $(window).on("resize", resize);
    resize();

    function resize() {
        let wh = $(window).innerHeight();
        let hh = $("header").height();
        $("#airports").css("margin-top", `${(hh + 16)}px`);
        $(".airport-details").css("margin-top", `${hh + 16}px`);
        $("#landing-card").css("margin-top", `${(1.25 * hh)}px`);
        $("#accordion").css("margin-top", `${(hh + 16)}px`);
        $("#contact-us").css("margin-top", `${(hh + 16)}px`);
        if ($(window).width() > 990) {
            $("#landing-card").css("height", `${(wh-hh)-(wh*0.3)}px`);
        } else {
            $("#landing-card").css("height", `${(wh-hh)-(wh*0.10)}px`);
        }
        if ($(window).width() > 350) {
            $("#get-briefed").addClass("btn-lg");
        } else {
            $("#get-briefed").removeClass("btn-lg");
        }
    }
}

/**
 * Animates the get briefed button press, then after the animation follows the href
 */
function buttonClick() {
    $("#get-briefed").click(function (event) {
        event.preventDefault();
        let href = $(this).attr('href');
        $(this).addClass("shrink");
        $(this).delay(50).queue(function () {
            $(this).addClass("grow");
        });
        setTimeout(function () {
            window.location.href = href;
        }, 100);
    });
}

/**
 * Stores the selected airport in sessionStorage
 * then opens wxreport.html page
 */
function selectAirport() {
    $("#airports").on("click", ".airport-text", function () {
        let airports = JSON.parse(localStorage.getItem('airports'));
        let index = $(this).parent().index();
        let selectedAirport = airports[index];
        localStorage.setItem('selectedAirport', JSON.stringify(selectedAirport));
        setTimeout(function () {
            window.location.href = "wxreport.html";
        }, 100);
        airportButtonAnimation(this);
    });
}

/**
 * Animates the airport selector button
 * @param {Object} thiss - The selected airport element
 */
function airportButtonAnimation(thiss) {
    $(thiss).parent().addClass("shrink");
    $(thiss).delay(50).queue(function () {
        $(thiss).parent().addClass("grow");
    });
}

/**
 * Checks page is aboutus then loads accordian animation
 */
function checkAboutUs() {
    if (window.location.href.indexOf("aboutus") > -1) {
        $("#accordion").accordion({
            heightStyle: "content"
        });
    }
}