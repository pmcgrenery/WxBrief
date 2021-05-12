$(document).ready(function () {
    scrollOpaqueHeader();
    burgerAnimation();
    menuSlide();
    setMargins();
    buttonClick();
    selectAirport();
});

function scrollOpaqueHeader() {
    // Opaque header background on scroll
    $(window).on("scroll", function () {
        if ($(window).scrollTop() > 50) {
            $(".transparent-header").addClass("active");
        } else {
            //remove the background property so it comes transparent again (defined in your css)
            $(".transparent-header").removeClass("active");
        }
    });
}

function burgerAnimation() {
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
}

function menuSlide() {
    // Menu slide toggle
    // Modified from: https: //codepen.io/gvissing/pen/oxBJEz
    $("#burger").click(function () {
        $(".nav-menu").animate({
            width: "toggle"
        }, 175);

        $(".nav-item").fadeToggle(675);

        $(".hr-menu").fadeToggle(675);

    });
}

function setMargins() {
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
        $("#contact-us").css("margin-top", `${(hh + 16)}px`);
        if ($(window).width() > 990) {
            // On larger screens show fold on bottom 30% of screen
            $("#landing-card").css("height", `${(wh-hh)-(wh*.3)}px`);
        } else {
            // On smaller screens only show fold on bottom 10%
            $("#landing-card").css("height", `${(wh-hh)-(wh*.10)}px`);
        };

        if ($(window).width() > 350) {
            $("#get-briefed").addClass("btn-lg");
        } else {
            $("#get-briefed").removeClass("btn-lg");
        };

    }
}

function buttonClick() {
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
}

function selectAirport() {
    $("#airports").on("click", ".airport-text", function () {
        let airports = JSON.parse(localStorage.getItem('airports'));
        // Find the index of the selected airport
        let airportIndex = $(this).parent().index();
        // Get the airport object for the selected airport
        let selectedAirport = airports[airportIndex];

        //Make the button shrink then grow
        $(this).parent().addClass("shrink");
        $(this).delay(50).queue(function () {
            $(this).parent().addClass("grow");
        });

        // Put the airport into local storage to be accessed in other js files
        sessionStorage.setItem('selectedAirport', JSON.stringify(selectedAirport));
        // Open the wxreport.html page
        setTimeout(function () {
            window.location.href = "wxreport.html"
        }, 100)

    });
}