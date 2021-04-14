function fetchairportinfo(event) {
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
            $("#not-airport").html("Airport does not exist, please try again");

            //TO DO -> Clear the input
        };
        var latitude = response.latitude;
        var longitude = response.longitude;
        var iata = response.iata;
        var airportName = response.name;
    });
};