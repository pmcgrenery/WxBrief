$("document").ready(function () {
    let airport = JSON.parse(sessionStorage.getItem('selectedAirport'));
    setHeader(airport);
    getAirportMETAR(airport.icao);
    getAirportTAF(airport.icao);
    getAirportInfo(airport.icao);
});

function setHeader(airport) {
    $("#icao-header").html(`${airport.icao} - ${airport.iata}`);
    $("#name-header").html(airport.name);
};

// ----------------------------------------------------------------------METAR

function getAirportMETAR(icaoCode) {
    let request = new XMLHttpRequest();
    request.open('GET', URL.avwxMetar + icaoCode + FORMAT.avwx);
    request.setRequestHeader('Authorization', KEY.avwx);
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            checkMetarResponse(this);
        }
    };
    request.send();
};

function checkMetarResponse(response) {
    let status = JSON.parse(response.status);
    if (status === 200) {
        let metar = JSON.parse(response.responseText);
        displayMetarResponse(metar.raw)
    } else if (status === 429) {
        displayMetarResponse(LIMIT_REACHED)
    } else if (status === 204) {
        displayMetarResponse(NO_METAR)
    } else {
        console.log("METAR Request Status Code:", status);
        displayMetarResponse(UNABLE)
    }
}

function displayMetarResponse(response) {
    $("#metar").html(response);
};
// ------------------------------------------------------------------------TAF

function getAirportTAF(icao) {
    let request = new XMLHttpRequest();
    request.open('GET', URL.avwxTAF + icao + FORMAT.avwx);
    request.setRequestHeader('Authorization', KEY.avwx);
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            checkTafResponse(this);
        }
    };
    request.send();
};

function checkTafResponse(response) {
    let status = JSON.parse(response.status);
    if (status === 200) {
        let taf = JSON.parse(response.responseText);
        displayTafData(taf)
    } else if (status === 429) {
        displayTafFail(LIMIT_REACHED)
    } else if (status === 204) {
        displayTafFail(NO_TAF)
    } else {
        console.log("TAF Request Status Code:", status);
        displayTafFail(UNABLE);
    };
};

function displayTafData(taf) {
    $("#taf").html(`
        <p>${taf.station} ${taf.time.repr} ${taf.forecast[0].raw}</p>
        `);
    for (let i = 1; i < taf.forecast.length; ++i) {
        $("#taf").append(`
            <p>${taf.forecast[i].raw}</p>`);
    };
};

function displayTafFail(response) {
    $("#taf").html(response);
};

// -----------------------------------------------------------------------DATA

function getAirportInfo(icao) {
    let request = new XMLHttpRequest();
    request.open('GET', URL.avwxInfo + icao + FORMAT.avwx);
    request.setRequestHeader('Authorization', KEY.avwx);
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            checkApInfoResponse(this);
        }
    };
    request.send();
};

function checkApInfoResponse(response) {
    let status = JSON.parse(response.status);
    if (status === 200) {
        let taf = JSON.parse(response.responseText);
        displayApInfo(taf);
    } else if (status === 429) {
        displayApInfoFail(LIMIT_REACHED)
    } else if (status === 204) {
        displayApInfoFail(NO_DATA)
    } else {
        console.log("Airport Info Request Status Code:", status);
        displayApInfoFail(UNABLE);
    };
};

function displayApInfo(station) {
    let runwaysArray = station.runways;
    $("#runways").html(`<table id='runways-table'></table>`);
    for (let runway of runwaysArray) {
        //Calculate Runway length in meters
        let lengthM = Math.floor(runway.length_ft * .3048);
        let widthM = Math.floor(runway.width_ft * .3048);
        // Display Runways in table
        $("#runways-table").append(`
            <tr>
                <td>${runway.ident1}</td>
                <td>${lengthM} m x ${widthM} m</td>
                <td>${runway.ident2}</td>
            </tr>
            `);

        // Display Airport Elevation
        $("#elevation").html(`Elev ${station.elevation_ft} ft`);
    };
};

function displayApInfoFail(response) {
    $("#runways").html(response);
};