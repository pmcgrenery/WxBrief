var airports = [];

// DEFAULT AIRPORTS FOR FIRST TIME USER
var defaultAirports = [{
        "icao": "EIDW",
        "iata": "DUB",
        "name": "Dublin Airport",
        "lat": 53.42645,
        "long": -6.24991
    },
    {
        "icao": "KJFK",
        "iata": "JFK",
        "name": "John F. Kennedy International Airport",
        "lat": 40.64131,
        "long": -73.77814
    },
    {
        "icao": "EINN",
        "iata": "SNN",
        "name": "Shannon Airport",
        "lat": 52.699657,
        "long": -8.914691
    },
    {
        "icao": "BIKF",
        "iata": "KEF",
        "name": "Keflavík International Airport",
        "lat": 63.978603,
        "long": -22.635036
    },
    {
        "icao": "CYYR",
        "iata": "YYR",
        "name": "CFB Goose Bay",
        "lat": 53.305252,
        "long": -60.4088
    }
];

// https://stackoverflow.com/questions/14644558/call-javascript-function-after-script-is-loaded/42556752
function loadStoredAirports() {

    //-------------------------------clear storage trigger------------------------------
    // localStorage.clear();

    let loadedAirports = JSON.parse(localStorage.getItem('airports'));

    //Check if loadedAirports array is null
    if (loadedAirports === null) {
        airports = defaultAirports;
        //Set the first time users airports in local storage to the default airports
        localStorage.setItem('airports', JSON.stringify(airports));
        console.log('Welcome to WxBrief, here are some airports to get you started:', airports);

    } else if (loadedAirports.length > 0) {
        airports = loadedAirports;
        console.log('Your Stored Airports:', airports);
    }

    displayAirports(airports);
};

function storeNewAirport(newApObject) {
    //Add the airport to the airports array
    airports.push(newApObject);
    //Add the updated airports array to local storage
    localStorage.setItem('airports', JSON.stringify(airports));
    //Display new array in the console
    console.log('New airport array', JSON.parse(localStorage.getItem('airports')))
    displayAirports(airports);
};

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

        $("#warning").html("");

        //Display warnings to user for incorrect inputs
        if (icao.length !== 4) {
            $("#warning").html("Please enter a 4 digit ICAO code");
            return;
        } else if (response.error) {
            //If an error is returned
            $("#warning").html("Airport does not exist, please try again");
            return;
        };

        let newAirport = {
            icao: response.icao,
            iata: response.iata,
            name: response.name,
            lat: response.latitude,
            long: response.longitude
        };

        //Send the newAirport Object to storeNewAirport function
        storeNewAirport(newAirport);

        // Close Modal after successful airport entry and clear the input
        $("#airportInput").val("");
        $("#addAirport").modal('hide');
    });
};

function displayAirports(apArray) {
    //Clear any HTML that is there currently
    $("#airports").html('');

    // Loop across the airports array and present the airports to the user
    for (let airport of apArray) {
        let apDetails = `
            <div class="airport-selector bg-green">
                 <span>${airport.icao} -</span><span> ${airport.iata}</span>
                 <p>${airport.name}</p>
             </div>
        `;
        //Append the div to the DOM
        $("#airports").append(apDetails);
    }

};

//TODO ->   Add event listener to accept the enter button as pressing the add airport button
//          Prevent duplicates being added to the list
//          Function to remove an airport from the array