$(document).ready(function () {
    setTime();
});

/**
 * Gets the UTC offset at the given lat & long
 */
function setTime() {
    let airport = JSON.parse(localStorage.getItem('selectedAirport'));
    let lat = airport.lat;
    let long = airport.long;
    let url = URL.tz + KEY.tz + FORMAT.tz + lat + "&lng=" + long;
    $.ajax(url).done(function (response) {
        offset = response.gmtOffset;
        displayTimes(offset);
    });
};

/**
 * Displays UTC & local times by looping infinitely and 
 * updating the displayed times once every second
 * @param {number} offset - Number respresenting the UTC offset
 */
function displayTimes(offset) {
    let os = offset;
    timeLoop();

    function timeLoop() {
        let timestamp = Date.now() + (os * 1000);
        let dateObj = new Date(timestamp);
        let local = dateObj.toUTCString().slice(17, 22);
        let utc = new Date().toUTCString().slice(17, 22);
        $("#local-time").html(`${local} LT`);
        $("#utc-time").html(`${utc} UTC`);
    };
    setInterval(timeLoop, 1000);
};