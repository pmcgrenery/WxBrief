// Select Airport Click Event Listener
$("#airports").on("click", ".airport-selector", function () {
    console.log($(this).index());
    // Create a global variable for the index of the selected airport
    var apIndex = $(this).index();
    window.location.href = "wxreport.html";
});