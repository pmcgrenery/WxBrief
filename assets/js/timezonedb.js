/*
https://timezonedb.com/api
API calls are unlimited but limited to 1 request per second
*/

$("document").ready(function () {
    setTime();
});

function setTime() {
    //Retrieve selected airport latitude and longitude
    let airport = JSON.parse(sessionStorage.getItem('selectedAirport'));
    let lat = airport.lat;
    let long = airport.long;
    let url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${KEY.tz}&format=json&by=position&lat=${lat}&lng=${long}`;

    $.ajax(url).done(function (response) {
        offset = response.gmtOffset;
        timeLoop(offset);
    })
};

// Update the displayed time every second
function timeLoop(offset) {
    let timestamp = Date.now() + (offset * 1000);
    let dateObj = new Date(timestamp);
    let local = dateObj.toUTCString().slice(17, 22);
    let utc = new Date().toUTCString().slice(17, 22);
    $("#local-time").html(`${local} LT`);
    $("#utc-time").html(`${utc} UTC`);
}
setInterval(timeLoop, 1000);

//Notes:-Chose not to present the user any error codes if unable to retrieve a response as this is not critical data.
//      -Using infinite loop to update the time every second rather than calling the api every second. Due to api request
//       limit of 1 request/second this would only allow one user at a time.