$(document).ready(function () {
    checkConfigLoad();
});

/**
 * Checks that config.js file has loaded correctly
 */
function checkConfigLoad() {
    if (typeof LOADED !== 'undefined') {
        getWeather();
    } else if (typeof LOADED === 'undefined') {
        $("#configNotLoadedModal").modal("show");
    }
}

function getWeather() {
    let airport = JSON.parse(localStorage.getItem('selectedAirport'));

    setHeader(airport);
    getAirportMETAR(airport.icao);
    getAirportTAF(airport.icao);
    getAirportInfo(airport.icao);
}
/**
 * Sets the airport name in the header
 * @param {Object} airport - Selected Airport Object
 */
function setHeader(airport) {
    $("#icao-header").html(`${airport.icao} - ${airport.iata}`);
    $("#name-header").html(airport.name);
}

/**
 * Gets the METAR for requested airport from AVWX API
 * @param {string} icaoCode - The ICAO code of the airport
 */
function getAirportMETAR(icaoCode) {
    let request = new XMLHttpRequest();
    request.open('GET', APIURL.avwxMetar + icaoCode + FORMAT.avwx);
    request.setRequestHeader('Authorization', KEY.avwx);
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            checkMetarResponse(this);
        }
    };
    request.send();
}

/**
 * Checks the response status of the METAR API request
 * @param {Object} response - METAR object for airport
 */
function checkMetarResponse(response) {
    let status = JSON.parse(response.status);
    if (status === 200) {
        let metar = JSON.parse(response.responseText);
        displayMetarResponse(metar.raw);
    } else if (status === 429) {
        displayMetarResponse(LIMIT_REACHED);
    } else if (status === 204) {
        displayMetarResponse(NO_METAR);
    } else {
        displayMetarResponse(UNABLE);
    }
}

/**
 * Displays the METAR or failure message on screen
 * @param {Object} response - METAR / failure message for airport
 */
function displayMetarResponse(response) {
    $("#metar").html(response);
}

/**
 * Gets the TAF for requested airport from AVWX API
 * @param {string} icao - The ICAO code of the airport
 */
function getAirportTAF(icao) {
    let request = new XMLHttpRequest();
    request.open('GET', APIURL.avwxTAF + icao + FORMAT.avwx);
    request.setRequestHeader('Authorization', KEY.avwx);
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            checkTafResponse(this);
        }
    };
    request.send();
}

/**
 * Checks the response status of the TAF API request
 * @param {Object} response - TAF object for airport
 */
function checkTafResponse(response) {
    let status = JSON.parse(response.status);
    if (status === 200) {
        let taf = JSON.parse(response.responseText);
        displayTafData(taf);
    } else if (status === 429) {
        displayTafFail(LIMIT_REACHED);
    } else if (status === 204) {
        displayTafFail(NO_TAF);
    } else {
        displayTafFail(UNABLE);
    }
}

/**
 * Displays the TAF on screen
 * @param {Object} taf - TAF object for airport
 */
function displayTafData(taf) {
    $("#taf").html(`
        <p>${taf.station} ${taf.time.repr} ${taf.forecast[0].raw}</p>
        `);
    for (let i = 1; i < taf.forecast.length; ++i) {
        $("#taf").append(`
            <p>${taf.forecast[i].raw}</p>`);
    }
}

/**
 * Displays TAF failure message to user
 * @param {string} response - Failure message to display
 */
function displayTafFail(response) {
    $("#taf").html(response);
}

/**
 * Gets the Airport Info for requested airport from AVWX API
 * @param {string} icao - The ICAO code of the airport
 */
function getAirportInfo(icao) {
    let request = new XMLHttpRequest();
    request.open('GET', APIURL.avwxInfo + icao + FORMAT.avwx);
    request.setRequestHeader('Authorization', KEY.avwx);
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            checkApInfoResponse(this);
        }
    };
    request.send();
}

/**
 * Checks the response status of the Airport Info API request
 * @param {Object} response - Airport Info object for airport
 */
function checkApInfoResponse(response) {
    let status = JSON.parse(response.status);
    if (status === 200) {
        let taf = JSON.parse(response.responseText);
        displayApInfo(taf);
    } else if (status === 429) {
        displayApInfoFail(LIMIT_REACHED);
    } else if (status === 204) {
        displayApInfoFail(NO_DATA);
    } else {
        displayApInfoFail(UNABLE);
    }
}

/**
 * Displays runway details and airport elevation on screen
 * @param {Object} station - Airport details Object
 */
function displayApInfo(station) {
    let runwaysArray = station.runways;
    $("#runways").html(`<table id='runways-table'></table>`);
    for (let runway of runwaysArray) {
        let lengthM = Math.floor(runway.length_ft * 0.3048);
        let widthM = Math.floor(runway.width_ft * 0.3048);
        $("#runways-table").append(`
            <tr>
                <td>${runway.ident1}</td>
                <td>${lengthM} m x ${widthM} m</td>
                <td>${runway.ident2}</td>
            </tr>
            `);
        $("#elevation").html(`Elev ${station.elevation_ft} ft`);
    }
}

/**
 * Displays Airport INFO failure message to user
 * @param {string} response - Failure message to display
 */
function displayApInfoFail(response) {
    $("#runways").html(response);
}