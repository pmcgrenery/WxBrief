function fetchairportinfo() {
    let icao = $('#airportInput').val();

    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://airport-info.p.rapidapi.com/airport?icao=" + icao,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "38d4bdbef5msh1ba875b702e5c63p1d66b7jsn741235df0bf8",
            "x-rapidapi-host": "airport-info.p.rapidapi.com"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        if (response.error) {
            //If an error is returned
            $("#not-airport").html("Airport does not exist, please try again");

            //TO DO -> 
            // Form input validation...only accept 4 letters
            //1. Present new modal "not an airport"
            //2. CLear the enter airport modal
            //3. When you press close, show the first modal

        };
        var latitude = response.latitude;
        var longitude = response.longitude;
        var icaoCode = response.icao;
        var iataCode = response.iata;
        var airportName = response.name;

        addAirport(iataCode, icaoCode, airportName, response.error);
    });
};

// Function to append the new airport to the list
function addAirport(iata, icao, apName, error) {
    let apDetails = `<div class="airport-selector bg-green">
                        <span>${icao} -</span><span> ${iata}</span>
                        <p>${apName}</p>
                    </div>`
    // If the airport doesn't exist return out of the function
    if (error) {
        return;
    }
    $("#airports").append(apDetails);
};

//TODO -> Add event listener to accept the enter button as pressing the add airport button