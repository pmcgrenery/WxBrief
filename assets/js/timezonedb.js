/*
https://timezonedb.com/api
API calls are unlimited but limited to 1 request per second
*/
const key = "WP64QMLIIG3M";

$("document").ready(function () {
    setTime();
});

function setTime() {
    //Retrieve selected airport latitude and longitude
    let airport = JSON.parse(sessionStorage.getItem('selectedAirport'));
    let lat = airport.lat;
    let long = airport.long;

    let url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${key}&format=json&by=position&lat=${lat}&lng=${long}`;

    $.ajax(url).done(function (response) {

        let localTimeStamp = Date.now() + (response.gmtOffset * 1000) - 1000;

        let dateObj = new Date(localTimeStamp);
        let localTime = dateObj.toUTCString().slice(17, 22);
        //Set the current local time
        $("#local-time").html(localTime);
        //Set the current UTC time
        let utcTime = new Date().toUTCString().slice(17, 22);
        $("#utc-time").html(utcTime);
        // Pass the current localTimestamp into infinite loop
        timeLoop(localTimeStamp);
    })
};

/*
Increment the original timestamp by 1 second, every second
and update the current and local times every second.
*/
function timeLoop(local) {

    let updatedTimeStamp = local + 1000;
    let updatedDateObj = new Date(updatedTimeStamp);
    let updatedLocalTime = updatedDateObj.toUTCString().slice(17, 22);
    let utcTime = new Date().toUTCString().slice(17, 22);
    displayTime(updatedLocalTime, utcTime);
}
setInterval(setTime, 1000);

function displayTime(local, utc) {
    $("#local-time").html(local);
    $("#utc-time").html(utc);
}

//Notes:-Chose not to present the user any error codes if unable to retrieve a response as this is not critical data.
//      -Using infinite loop to update the time every second rather than calling the api every second. Due to api request
//       limit of 1 request/second this would only allow one user at a time.