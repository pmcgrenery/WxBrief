const tokenCode = "xxt-4d_jaDNW_tkNo2wX8q6cXUfWZ2asMCsmwYlr7Gw";

// API Info:
// https://avwx.rest/#
// Error code 429 if you hit call limit.
// Limit is 4000 calls per day. Resets at 0000Z.

//When document is ready getAirport Weather (AND RUNWAYS??????????????)
$("document").ready(function () {
    //Load the selected airport from local storage
    let airport = JSON.parse(sessionStorage.getItem('selectedAirport'));
    let icao = airport.icao;
    let apName = airport.name;
    let iata = airport.iata;
    //Set the name of the airport at top of the page
    $("#icao-header").html(`${icao} - ${iata}`);
    $("#name-header").html(apName);

    getAirportMETAR(icao);
    getAirportTAF(icao);
    getAirportInfo(icao);
});

function getAirportMETAR(icaoCode) {
    //Code modified from AVWX Documentation
    //https://avwx.docs.apiary.io/#reference/0/metar/get-metar-report

    let request = new XMLHttpRequest();
    request.open('GET', `https://avwx.rest/api/metar/${icaoCode}?format=json`);
    request.setRequestHeader('Authorization', tokenCode);
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            let status = JSON.parse(this.status);
            let body = JSON.parse(this.responseText);
            console.log("METAR Object:", body);
            //Call setMetar function
            setMetar(status, body);
        }
    };
    request.send();
};

function setMetar(status, metar) {
    $("#metar").html(metar.raw);
}

function getAirportTAF(icao) {
    //Code modified from AVWX Documentation
    //https://avwx.docs.apiary.io/#reference/0/taf/get-taf-report

    let request = new XMLHttpRequest();
    request.open('GET', `https://avwx.rest/api/taf/${icao}?format=json`);
    request.setRequestHeader('Authorization', tokenCode);
    request.onreadystatechange = function () {
        if (this.readyState === 4) {

            let status = JSON.parse(this.status);
            let body = JSON.parse(this.responseText);
            console.log("TAF Object:", body);
            //Call setMetar function
            setTAF(status, body);
        }
    };
    request.send();
};

function setTAF(status, taf) {
    //Loop across the forecast array

    $("#taf").html(`
    <p>${taf.station} ${taf.time.repr} ${taf.forecast[0].raw}</p>
    `);
    for (let i = 1; i < taf.forecast.length; ++i) {
        $("#taf").append(`
        <p>${taf.forecast[i].raw}</p>`);
    };
    // for (let line of taf.forecast) {
    //     $("#taf").append(`
    //     <p>${line.raw}</p>`);
    // };
}

function getAirportInfo(icao) {
    //Code modified from AVWX Documentation
    //https://avwx.docs.apiary.io/#reference/0/taf/get-taf-report

    let request = new XMLHttpRequest();
    request.open('GET', `https://avwx.rest/api/station/${icao}?format=json`);
    request.setRequestHeader('Authorization', tokenCode);
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            let status = JSON.parse(this.status);
            let body = JSON.parse(this.responseText);
            console.log("Airport Info Object:", body);
            //Call setMetar function
            setInfo(status, body);
        }
    };
    request.send();
};

function setInfo(status, station) {
    let runwaysArray = station.runways;
    $("#runways").html("");
    for (let runway of runwaysArray) {
        //Calculate Runway length in meters
        let lengthM = Math.floor(runway.length_ft * .3048);
        let widthM = Math.floor(runway.width_ft * .3048);
        // Display Runways
        $("#runways").append(`<p>${runway.ident1} / ${runway.ident2} - ${lengthM} m x ${widthM} m</p>`);
        // Display Airport Elevation
        $("#elevation").html(`${station.elevation_ft} ft`);
        //
    }

}

// TO DO ->
//          Add code to check for other response codes eg. 429 (Hit call limit)