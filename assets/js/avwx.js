const tokenCode = "xxt-4d_jaDNW_tkNo2wX8q6cXUfWZ2asMCsmwYlr7Gw";

// API Info:
// https://avwx.rest/#
// Error code 429 if you hit call limit.
// Limit is 4000 calls per day. Resets at 0000Z.

//When document is ready getAirport Weather (AND RUNWAYS??????????????)
$("document").ready(function () {
    //Load the selected airport from local storage
    let airport = JSON.parse(localStorage.getItem('selectedAirport'));
    let icao = airport.icao;
    let apName = airport.name;
    let iata = airport.iata;
    //Set the name of the airport at top of the page
    $("#icao-header").html(`${icao} - ${iata}`);
    $("#name-header").html(apName);

    getAirportMETAR(icao);
    getAirportTAF(icao);
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
            console.log(body);
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
            console.log(body);
            //Call setMetar function
            setTAF(status, body);
        }
    };
    request.send();
};

function setTAF(status, taf) {
    $("#taf").html(taf.raw);
}

// TO DO ->
//          Add code to check for other response codes eg. 429 (Hit call limit)