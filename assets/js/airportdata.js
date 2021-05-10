$('document').ready(function () {
    loadStoredAirports();
    initialiseEventHandlers();
});

function initialiseEventHandlers() {
    clickEditAirports();
    clickDeleteAirport();
    pressEsc();
    pressEnter();
    focusModal();
    pressEnterAddAirport();
};

function loadStoredAirports() {

    let loadedAirports = JSON.parse(localStorage.getItem('airports'));
    // localStorage.clear();

    //Check if loadedAirports exists in localStorage
    if (loadedAirports === null) {
        //Set the first time user's airports in local storage to the default airports
        localStorage.setItem('airports', JSON.stringify(DEFAULT_AIRPORTS));
        displayAirports(DEFAULT_AIRPORTS);
        $("#welcomeModal").modal("show");
    } else if (loadedAirports !== null) {
        displayAirports(loadedAirports);
    }
};

function clearModal() {
    $("#warning").html("");
    $("#airportInput").val("");
};

function displayAirports(apArray) {
    //Clear any HTML that is there currently
    $("#airports").html('');

    // Loop across the airports array and present the airports to the user
    for (let airport of apArray) {
        let apDetails = `
            <div class="airport-selector">
                <div class="airport-text">
                    <span>${airport.icao} -</span>
                    <span> ${airport.iata}</span>
                    <p>${airport.name}</p>
                </div>
                 <div class="delete-container">
                    <div class="delete">
                        <i class="fas fa-trash" aria-hidden="true" aria-label="Delete this airport"></i>
                        <div class="sr-only">Delete</div>
                    </div>
                 </div>
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
        "url": URL.apInfo + icao,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": KEY.apInfo,
            "x-rapidapi-host": HOST.apInfo
        }
    };

    $.ajax(settings).done(function (response) {
        checkInput(response, icao);
    }).fail(function (response) {
        $("#warning").html("Unable to retrieve airport, please contact the site admin");
        console.log(response);
        $("#airportInput").val("");
    });
};

function checkInput(response, icao) {
    let airports = JSON.parse(localStorage.getItem('airports'));
    if (icao.length !== 4) {
        displayWarning("notFour");
        return;
    } else if (response.error) {
        displayWarning("notExist");
        return;
    } else if (airports.some(e => e.icao === response.icao)) {
        displayWarning("inList", response);
        return;
    } else {
        storeNewAirport(response);
        airportAdded();
    }
}

function displayWarning(warning, response) {
    if (warning == "notFour") {
        $("#warning").html("Please enter a 4 digit ICAO code");
        $("#airportInput").val("");
    } else if (warning == "notExist") {
        $("#warning").html("Airport does not exist, please try again");
        $("#airportInput").val("");
    } else if (warning == "inList") {
        $("#airportInput").val("");
        $("#warning").html(`<p>${response.icao} is already in your list of airports</p>`);
    };
};

function storeNewAirport(response) {
    let newAirport = {
        icao: response.icao,
        iata: response.iata,
        name: response.name,
        lat: response.latitude,
        long: response.longitude
    };
    let airports = JSON.parse(localStorage.getItem('airports'));
    //Add the airport to the airports array
    airports.push(newAirport);
    //Update airports array in local storage
    localStorage.setItem('airports', JSON.stringify(airports));
    displayAirports(airports);
};

function airportAdded() {
    // Clear the input and display warning
    $("#airportInput").val("");
    $("#warning").html("");
    // Close Modal after successful airport entry and clear the input
    $("#addAirport").modal('hide');
    // Scroll to the bottom of the page
    $("html, body").animate({
        scrollTop: $(document).height()
    }, 100);
};

//Clear airports and clear the locally stored list
function clearAirports() {
    airports = [];
    localStorage.setItem('airports', JSON.stringify(airports));
    displayAirports(airports);
    $("#clearAirports").modal('hide');
    $("#back-btn").toggle(20);
    $("#clr-airports").toggle(20);
};

// Delete airport and locally store the updated airports array
function deleteAirport(index) {
    airports.splice(index, 1);
    localStorage.setItem('airports', JSON.stringify(airports));
    displayAirports(airports);
};

/*
----------------Event Listeners----------------
*/

function pressEnterAddAirport() {
    // When airportInput is in focus and press Enter -> 
    $('#airportInput').on("keydown", function (event) {
        if (event.key == "Enter") {
            event.preventDefault();
            fetchAirportInfo();
        }
    });

}

function pressEnter() {
    // When Enter is pressed anywhere on the document
    $(document).on("keydown", function (event) {
        if (event.key == 'Enter') {
            // Prevent the Clear airport modal opening
            event.preventDefault();
            // Show the add airport modal
            $("#addAirport").modal("show");
        };
    });
}


function pressEsc() {
    // When Escape is pressed anywhere on the document
    $(document).on('keydown', function (event) {
        if (event.key == "Escape") {
            $("#airportInput").val("");
            $("#warning").html("");
            $("#addAirport").modal('hide');
        }
    });
}


function clickDeleteAirport() {
    // When click delete slide the div out of view and close the edit controls
    $("#airports").on("click", ".delete-container", function () {
        console.log("Deleting")
        let parentIndex = $(this).parent().index()
        $(this).parent().slideUp(400);
        setTimeout(function () {
            deleteAirport(parentIndex)
        }, 400);
        $("#back-btn").toggle(20);
        $("#clr-airports").toggle(20);
    })
}


function clickEditAirports() {
    $("#edit-airports").on("click", function () {
        $(".delete-container").fadeToggle(100);
        $("#back-btn").toggle(20);
        $("#clr-airports").toggle(20);
    });
};

function focusModal() {
    // Autofocus on the modal when opened
    // Code from https://stackoverflow.com/questions/14940423/autofocus-input-in-twitter-bootstrap-modal
    $('.modal').on('shown.bs.modal', function () {
        $(this).find('[autofocus]').focus();
    });
}