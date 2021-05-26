$(document).ready(function () {
    checkConfigLoaded();
});

/**
 * Checks that config.js file has loaded correctly
 */
function checkConfigLoaded() {
    if (typeof LOADED !== 'undefined') {
        loadStoredAirports();
        initialiseEventListeners();
    } else if (typeof LOADED === 'undefined') {
        $("#configNotLoadedModal").modal("show");
    }
}

function initialiseEventListeners() {
    clickEditAirports();
    clickDeleteAirport();
    pressEsc();
    pressEnter();
    focusModal();
    pressEnterAddAirport();
}

/**
 * Loads stored airports from device local storage
 */
function loadStoredAirports() {
    let loadedAirports = JSON.parse(localStorage.getItem('airports'));
    checkloadedAirports(loadedAirports);
}

/**
 * Checks if "airports" exists in local storage or not
 * @param {Object[]} airports - Array of users stored airports 
 */
function checkloadedAirports(airports) {
    // localStorage.clear();
    if (airports === null) {
        localStorage.setItem('airports', JSON.stringify(DEFAULT_AIRPORTS));
        displayAirports(DEFAULT_AIRPORTS);
        $("#welcomeModal").modal("show");
    } else if (airports !== null) {
        displayAirports(airports);
    }
}

/**
 * Clears warnings and input field on the add airport modal
 */
function clearModal() {
    $("#warning").html("");
    $("#airportInput").val("");
}

/**
 * Displays the array of airports on screen
 * @param {Object[]} apArray - Array of users airports
 */
function displayAirports(apArray) {
    $("#airports").html('');
    for (let airport of apArray) {
        let apDetails = `
            <div class="airport-selector">
                <div class="airport-text">
                    <span>${airport.icao} -</span>
                    <span> ${airport.iata}</span>
                    <p>${airport.name}</p>
                </div>
                ${DELETE_CONTAINER}
             </div>
        `;
        $("#airports").append(apDetails);
    }
}

/**
 * Makes the AJAX call to get the RapidApi Airport-Info API
 */
function getAirportInfo() {
    let icao = $('#airportInput').val();
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": APIURL.apInfo + icao,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": KEY.apInfo,
            "x-rapidapi-host": HOST.apInfo
        }
    };
    $.ajax(settings).done(function (response) {
        checkInput(response, icao);
    }).fail(function (response) {
        $("#warning").html(WARNING.unable);
        console.log(response);
        $("#airportInput").val("");
    });
}

/**
 * Checks response for error responses from API call and also checks the
 * inputted airport code.
 * @param {Object} response - API response Object from Airport Info
 * @param {string} icao - The ICAO code of the requested airport
 */
function checkInput(response, icao) {
    let airports = JSON.parse(localStorage.getItem('airports'));
    if (icao.length !== 4) {
        displayWarning("notFour");
    } else if (response.error) {
        displayWarning("notExist");
    } else if (airports.some(e => e.icao === response.icao)) {
        displayWarning("inList", response);
    } else {
        storeNewAirport(response);
        airportAdded();
    }
}

/**
 * Displays warnings to user for incorrect inputs when adding an airport
 * @param {string} warning - Type of warning to present
 * @param {Object} response - API response Object from Airport Info
 */
function displayWarning(warning, response) {
    if (warning == "notFour") {
        $("#warning").html(WARNING.four);
        $("#airportInput").val("");
    } else if (warning == "notExist") {
        $("#warning").html(WARNING.noex);
        $("#airportInput").val("");
    } else if (warning == "inList") {
        $("#airportInput").val("");
        $("#warning").html(response.icao + WARNING.already);
    }
}

/**
 * Places the new airport in local storage and adds it to the list on screen
 * @param {Object} response - API response Object from Airport Info
 */
function storeNewAirport(response) {
    let newAirport = {
        icao: response.icao,
        iata: response.iata,
        name: response.name,
        lat: response.latitude,
        long: response.longitude
    };
    let airports = JSON.parse(localStorage.getItem('airports'));
    airports.push(newAirport);
    localStorage.setItem('airports', JSON.stringify(airports));
    displayAirports(airports);
}

/**
 * Closes modal and scrolls to bottom of page
 */
function airportAdded() {
    clearModal();
    $("#addAirport").modal('hide');
    $("html, body").animate({
        scrollTop: $(document).height()
    }, 100);
}

/**
 * Clears all airports from the list and returns controls back to normal
 */
function clearAirports() {
    let airports = [];
    localStorage.setItem('airports', JSON.stringify(airports));
    displayAirports(airports);
    $("#clearAirports").modal('hide');
    $("#back-btn").toggle(20);
    $("#clr-airports").toggle(20);
}

/**
 * Deletes the selected airport form the list
 * @param {number} index - Index of the airport to be deleted
 */
function deleteAirport(index) {
    let airports = JSON.parse(localStorage.getItem('airports'));
    airports.splice(index, 1);
    localStorage.setItem('airports', JSON.stringify(airports));
    displayAirports(airports);
}

/**
 * Listens for Enter being pressed while the airport input
 * is in focus
 */
function pressEnterAddAirport() {
    $('#airportInput').on("keydown", function (event) {
        if (event.key == "Enter") {
            event.preventDefault();
            getAirportInfo();
        }
    });
}

/**
 * Listens for Enter being pressed while anywhere in the document
 * and opens up the add airport modal
 */
function pressEnter() {
    $(document).on("keydown", function (event) {
        if (event.key == 'Enter') {
            event.preventDefault();
            $("#addAirport").modal("show");
        }
    });
}

/**
 * Listens for Esc being pressed anywhere on screen 
 * and closes addAirport modal
 */
function pressEsc() {
    $(document).on('keydown', function (event) {
        if (event.key == "Escape") {
            clearModal();
            $("#addAirport").modal('hide');
        }
    });
}

/**
 * Listens out for click on delete airport. Onclick the selected airport
 * slides up out of view and the controls are returned to normal
 */
function clickDeleteAirport() {
    $("#airports").on("click", ".delete-container", function () {
        let parentIndex = $(this).parent().index();
        $(this).parent().slideUp(250);
        setTimeout(function () {
            deleteAirport(parentIndex);
        }, 250);
        $(".delete-container").fadeToggle(25);
        $("#back-btn").toggle(20);
        $("#clr-airports").toggle(20);
    });
}

/**
 * Listens out for click on the edit icon and displays the 
 * editing controls
 */
function clickEditAirports() {
    $("#edit-airports").on("click", function () {
        $(".delete-container").fadeToggle(25);
        $("#back-btn").toggle(20);
        $("#clr-airports").toggle(20);
    });
}

/**
 * Listens for when the add airport modal is displayed, then puts
 * the input field in focus.
 */
function focusModal() {
    $('.modal').on('shown.bs.modal', function () {
        $(this).find('[autofocus]').focus();
    });
}