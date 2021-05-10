// Select Airport Click Event Listener
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