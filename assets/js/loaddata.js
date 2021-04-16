// Select Airport Click Event Listener
$("#airports").on("click", ".airport-selector", function () {
    console.log($(this).index());
    var apIndex = $(this).index();
    window.location.href = "wxreport.html";
    console.log(airports[apIndex]);
});