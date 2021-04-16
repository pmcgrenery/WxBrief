const tokenCode = "xxt-4d_jaDNW_tkNo2wX8q6cXUfWZ2asMCsmwYlr7Gw";

// API Info:
// https://avwx.rest/#
// Error code 429 if you hit call limit.
// Limit is 4000 calls per day. Resets at 0000Z.

//When document is ready getAirport Weather (AND RUNWAYS??????????????)
$("document").ready(function () {
    getAirportMetar();
});

function getAirportMetar() {
    //Code modified from AVWX Documentation
    //https://avwx.docs.apiary.io/#reference/0/station

    //Load the selected airport from local storage
    let airport = JSON.parse(localStorage.getItem('selectedAirport'));
    let icao = airport.icao;

    let request = new XMLHttpRequest();
    request.open('GET', `https://avwx.rest/api/metar/${icao}?format=json`);
    request.setRequestHeader('Authorization', tokenCode);
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
            let status = this.status;
            let body = this.body;
        }
    };
    request.send();
    //Call function to set the METAR
    // setWxRawData();
};