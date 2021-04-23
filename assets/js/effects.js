$(window).on("scroll", function () {
    if ($(window).scrollTop() > 50) {
        $(".fixed-top").addClass("active");
    } else {
        //remove the background property so it comes transparent again (defined in your css)
        $(".fixed-top").removeClass("active");
    }
});

let menuOpen = false;

$("#burger").click(function () {
    console.log(menuOpen);
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