$(window).on("scroll", function () {
    if ($(window).scrollTop() > 50) {
        $(".fixed-top").addClass("active");
    } else {
        //remove the background property so it comes transparent again (defined in your css)
        $(".fixed-top").removeClass("active");
    }
});