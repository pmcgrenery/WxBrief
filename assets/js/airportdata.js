var airports = [];

//When the document is ready, load the airports
$('document').ready(function () {
    loadStoredAirports();
});

// Autofocus on the modal when opened
// Code from https://stackoverflow.com/questions/14940423/autofocus-input-in-twitter-bootstrap-modal
$('.modal').on('shown.bs.modal', function () {
    $(this).find('[autofocus]').focus();
});

function clearModal() {
    $("#warning").html("");
    $("#airportInput").val("");
};

// https://stackoverflow.com/questions/14644558/call-javascript-function-after-script-is-loaded/42556752
function loadStoredAirports() {

    //-------------------------------clear storage trigger------------------------------
    // localStorage.clear();

    let loadedAirports = JSON.parse(localStorage.getItem('airports'));

    //Check if loadedAirports array is null
    if (loadedAirports === null) {
        airports = defaultAirports;
        //Set the first time user's airports in local storage to the default airports
        localStorage.setItem('airports', JSON.stringify(airports));
        console.log('Welcome to WxBrief, here are some airports to get you started:', airports);

    } else if (loadedAirports.length > 0) {
        airports = loadedAirports;
        console.log('Your Stored Airports:', airports);
    }

    displayAirports(airports);
};

function displayAirports(apArray) {
    //Clear any HTML that is there currently
    $("#airports").html('');

    // Loop across the airports array and present the airports to the user
    for (let airport of apArray) {
        let apDetails = `
            <div class="airport-selector">
                 <span>${airport.icao} -</span><span> ${airport.iata}</span>
                 <p>${airport.name}</p>
             </div>
        `;
        //Append the div to the DOM
        $("#airports").append(apDetails);
    }

};

function fetchAirportInfo() {
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

        //This function modified from:
        //https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e
        if (airports.some(e => e.icao === newAirport.icao)) {
            // Reset the input and display warning
            $("#airportInput").val("");
            $("#warning").html(`<p>${newAirport.icao} is already in your list of airports</p>`);
        } else {
            //Store the new airport
            storeNewAirport(newAirport);
            // Clear the input and display warning
            $("#airportInput").val("");
            $("#warning").html("");
            // Close Modal after successful airport entry and clear the input
            $("#addAirport").modal('hide');
        }
    });
};

function storeNewAirport(newApObject) {
    //Add the airport to the airports array
    airports.push(newApObject);
    //Update airports array in local storage
    localStorage.setItem('airports', JSON.stringify(airports));
    //Display new array in the console
    console.log('New airport array', JSON.parse(localStorage.getItem('airports')))
    displayAirports(airports);
};

/*
Event Listeners
*/

// When airportInput is in focus and press Enter -> 
$('#airportInput').on("keydown", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        fetchAirportInfo();
    }
});

// When Enter is pressed anywhere on the document
$(document).on("keydown", function (event) {
    if (event.key == 'Enter') {
        $("#addAirport").modal('show');
    };
});

// When Escape is pressed anywhere on the document
$(document).on('keydown', function (event) {
    if (event.key == "Escape") {
        $("#airportInput").val("");
        $("#warning").html("");
        $("#addAirport").modal('hide');
    }
});

//TODO ->   
//          Function to remove an airport from the array
//          Add message to new users to show them that the airports shown are just a sample list of airports