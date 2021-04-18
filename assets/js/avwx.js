const tokenCode = "xxt-4d_jaDNW_tkNo2wX8q6cXUfWZ2asMCsmwYlr7Gw";

/* API Info:
   https://avwx.rest/#
   Limit is 4000 calls per day. Resets at 0000Z.
*/

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
    if (status === 200) {
        $("#metar").html(metar.raw);
    } else if (status === 429) {
        $("#metar").html("You have reached your API call limit, please contact the site administrator");
    } else {
        console.log("METAR Request Status Code:", status);
        $("#metar").html("Sorry, we're unable to obtain METAR data for this station. Please contact the site administrator");
    }
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
    if (status === 200) {
        //Set first TAF line to ICAO, publication time, first line of forecast data
        $("#taf").html(`
        <p>${taf.station} ${taf.time.repr} ${taf.forecast[0].raw}</p>
        `);
        //Set the remainder of the forecast lines
        for (let i = 1; i < taf.forecast.length; ++i) {
            $("#taf").append(`
            <p>${taf.forecast[i].raw}</p>`);
        };
    } else if (status === 429) {
        $("#taf").html("You have reached your API call limit, please contact the site administrator");
    } else {
        console.log("METAR Request Status Code:", status);
        $("#taf").html("Sorry, we're unable to obtain TAF data for this station. Please contact the site administrator");
    }
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
    if (status === 200) {

        let runwaysArray = station.runways;

        // Clear the loading.gif and add table element
        $("#runways").html(`<table id='runways-table'></table>`);

        for (let runway of runwaysArray) {
            //Calculate Runway length in meters
            let lengthM = Math.floor(runway.length_ft * .3048);
            let widthM = Math.floor(runway.width_ft * .3048);
            // Display Runways in table
            $("#runways-table").append(`
            <tr>
                <td> ${runway.ident1} / ${runway.ident2} </td>
                <td> ${lengthM} m x ${widthM} m </td>
            </tr>
            `);


            // Display Airport Elevation
            $("#elevation").html(`Elev ${station.elevation_ft} ft`);
        }
    } else if (status === 429) {
        $("#runways").html("You have reached your API call limit, please contact the site administrator");
    } else {
        console.log("METAR Request Status Code:", status);
        $("#runways").html("Sorry, we're unable to obtain Airport data for this station. Please contact the site administrator");
    }
}

// TO DO ->
//          Move runway info into a table