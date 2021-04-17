// Select Airport Click Event Listener
$("#airports").on("click", ".airport-selector", function () {
    console.log($(this).index());
    // Find the index of the selected airport
    let airportIndex = $(this).index();
    // Get the airport object for the selected airport
    let selectedAirport = airports[airportIndex];
    // Put the airport into local storage to be accessed in other js files
    sessionStorage.setItem('selectedAirport', JSON.stringify(selectedAirport));
    // Open the wxreport.html page
    window.location.href = "wxreport.html"
});