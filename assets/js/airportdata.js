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

// https://www.geeksforgeeks.org/how-to-run-a-function-when-the-page-is-loaded-in-javascript/
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
    // If the airport entered doesnt exist, prevent null being added to the array
    if ($.isEmptyObject(newApObject)) {
        console.log('the newApObject is empty')
        return;
    } else {
        //Add the airport to the airports array
        airports.push(newApObject);
        //Add the updated airports array to local storage
        localStorage.setItem('airports', JSON.stringify(airports));
        //Display new array in the console
        console.log('New airport array', JSON.parse(localStorage.getItem('airports')))
        displayAirports(airports);
    }
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
        console.log(response);
        if (response.error) {
            //If an error is returned
            $("#not-airport").html("Airport does not exist, please try again");
            return;
            //TO DO -> 
            // Form input validation...only accept 4 letters
            //1. Present new modal "not an airport"
            //2. Clear the enter airport modal
            //3. When you press close, show the first modal

        };

        let newAirport = {
            icao: response.icao,
            iata: response.iata,
            name: response.name,
            lat: response.latitude,
            long: response.longitude
        }
        //Send the newAirport Object to storeNewAirport function
        storeNewAirport(newAirport);
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

//TODO -> Add event listener to accept the enter button as pressing the add airport button