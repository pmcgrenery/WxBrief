// -------------------------- Custom Code --------------------------

//Check the current frame time and output the time in UTC format
function setFrameTime(frame) {
    let dateObj = new Date(frame.time * 1000);
    let utcString = dateObj.toUTCString();
    let frameTime = utcString.slice(17, 22);

    document.getElementById("timestamp").innerHTML = `${frameTime} UTC`
}

// Toggler to change the play/pause icon
$("#play-toggle").click(function () {
    $(".playPause").toggle();
})

$("#sat").click(function () {
    $("#radar").removeClass("selected-left");
    $("#sat").addClass("selected-right");
});

$("#radar").click(function () {
    $("#sat").removeClass("selected-right");
    $("#radar").addClass("selected-left");
});

let airport = JSON.parse(sessionStorage.getItem('selectedAirport'));
var lat = airport.lat;
var long = airport.long;

var map = L.map('mapid', {
    center: [lat, long],
    zoom: 6,
    // Allow infinite zoom levels
    zoomSnap: 0,
    // Zoom button detents
    zoomDelta: 0.5,
    //Zoom scroll speed
    wheelPxPerZoomLevel: 80,
    //Disable single finger drag
    dragging: !L.Browser.mobile,
    dragging: !L.Browser.mobileWebkit,
    tap: !L.Browser.mobile,
    tap: !L.Browser.mobileWebkit
});

//Openstreet Map Layer (Alternative to Mapbox)
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
// }).addTo(map);

// Mapbox Baselayer map
L.tileLayer.provider('MapBox', {
    id: 'mapbox/light-v10',
    accessToken: 'pk.eyJ1IjoicG1jZ3JlbmVyeSIsImEiOiJja25xYjlvMDgwYjc0MnBwZnFodXh1MHZ5In0.jv-gMrjni4BjjZ_vh-p5PQ'
}).addTo(map);

//Radar Coverage Mask Layer with opacity adjusted
L.tileLayer('https://tilecache.rainviewer.com/v2/coverage/0/256/{z}/{x}/{y}/0/0_0.png').setOpacity(0.2).addTo(map);

//Marker over airport
L.marker([lat, long]).addTo(map)
    .bindPopup(`${airport.icao}`)

// ---------- Code below here from Rainviewer API Documentation ----------
// https://www.rainviewer.com/api/weather-maps-api.html

/**
 * RainViewer radar animation part
 * @type {number[]}
 */
var apiData = {};
var mapFrames = [];
var lastPastFramePosition = -1;
var radarLayers = [];
var optionKind = 'radar'; // can be 'radar' or 'satellite'
var optionTileSize = 512; // can be 256 or 512.
var optionColorScheme = 7; // from 0 to 8. See https://rainviewer.com/api/color-schemes.html
var optionSmoothData = 1; // 0 - not smooth, 1 - smooth
var optionSnowColors = 1; // 0 - do not show snow colors, 1 - show snow colors
var animationPosition = 0;
var animationTimer = false;

/**
 * Load all the available maps frames from RainViewer API
 */
var apiRequest = new XMLHttpRequest();
apiRequest.open("GET", "https://api.rainviewer.com/public/weather-maps.json", true);
apiRequest.onload = function (e) {
    // store the API response for re-use purposes in memory
    apiData = JSON.parse(apiRequest.response);
    initialize(apiData, optionKind);
};
apiRequest.send();

/**
 * Initialize internal data from the API response and options
 */
function initialize(api, kind) {
    // remove all already added tiled layers
    for (var i in radarLayers) {
        map.removeLayer(radarLayers[i]);
    }
    mapFrames = [];
    radarLayers = [];
    animationPosition = 0;

    if (!api) {
        return;
    }
    if (kind == 'satellite' && api.satellite && api.satellite.infrared) {
        mapFrames = api.satellite.infrared;

        lastPastFramePosition = api.satellite.infrared.length - 1;
        showFrame(lastPastFramePosition);
    } else if (api.radar && api.radar.past) {
        mapFrames = api.radar.past;

        // show the last "past" frame
        lastPastFramePosition = api.radar.past.length - 1;

        showFrame(lastPastFramePosition);
    }
}

/**
 * Animation functions
 * @param path - Path to the XYZ tile
 */
function addLayer(frame) {
    if (!radarLayers[frame.path]) {
        var colorScheme = optionKind == 'satellite' ? 0 : optionColorScheme;
        var smooth = optionKind == 'satellite' ? 0 : optionSmoothData;
        var snow = optionKind == 'satellite' ? 0 : optionSnowColors;

        radarLayers[frame.path] = new L.TileLayer(apiData.host + frame.path + '/' + optionTileSize +
            '/{z}/{x}/{y}/' + colorScheme + '/' + smooth + '_' + snow + '.png', {
                tileSize: 256,
                opacity: 0.001,
                zIndex: frame.time
            });
    }
    if (!map.hasLayer(radarLayers[frame.path])) {
        map.addLayer(radarLayers[frame.path]);
    }
}

/**
 * Display particular frame of animation for the @position
 * If preloadOnly parameter is set to true, the frame layer only adds for the tiles preloading purpose
 * @param position
 * @param preloadOnly
 */
function changeRadarPosition(position, preloadOnly) {
    while (position >= mapFrames.length) {
        position -= mapFrames.length;
    }
    while (position < 0) {
        position += mapFrames.length;
    }

    var currentFrame = mapFrames[animationPosition];
    var nextFrame = mapFrames[position];

    addLayer(nextFrame);

    if (preloadOnly) {
        return;
    }

    animationPosition = position;

    if (radarLayers[currentFrame.path]) {
        radarLayers[currentFrame.path].setOpacity(0);
    }
    radarLayers[nextFrame.path].setOpacity(0.6);

    setFrameTime(nextFrame)
}

/**
 * Check avialability and show particular frame position from the timestamps list
 */
function showFrame(nextPosition) {
    var preloadingDirection = nextPosition - animationPosition > 0 ? 1 : -1;

    changeRadarPosition(nextPosition);

    // preload next next frame (typically, +1 frame)
    // if don't do that, the animation will be blinking at the first loop
    changeRadarPosition(nextPosition + preloadingDirection, true);
}

/**
 * Stop the animation
 * Check if the animation timeout is set and clear it.
 */
function stop() {
    if (animationTimer) {
        clearTimeout(animationTimer);
        animationTimer = false;
        return true;
    }
    return false;
}

function play() {
    showFrame(animationPosition + 1);

    // Main animation driver. Run this function every 200ms ms
    animationTimer = setTimeout(play, 200);
}

function playStop() {
    if (!stop()) {
        play();
    }
}

/**
 * Radar/Satellite Option
 */
function setKind(kind) {
    optionKind = kind;
    initialize(apiData, optionKind);
}

// TO DO ->
//          Add sigmets and sever weather??