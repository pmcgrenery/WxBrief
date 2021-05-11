$('document').ready(function () {
    initialiseMap()
    setVersion(MAP_DEFAULT);
    initialiseRvSettings()
    getRainviewer();
    addMarker();
    initialiseEventListeners();
});

let map, airport, lat, long;

function initialiseMap() {
    airport = JSON.parse(sessionStorage.getItem('selectedAirport'));
    lat = airport.lat;
    long = airport.long;

    //Configure Map
    map = L.map('mapid', {
        center: [lat, long],
        zoom: 6,
        minZoom: 1,
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
        tap: !L.Browser.mobileWebkit,
    });
};

function setVersion(base) {
    // Clear all map layers
    map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });
    // Add the mapbox layer
    L.tileLayer.provider('MapBox', {
        id: base,
        accessToken: KEY.rv
    }).addTo(map);
    // Add the radar coverage mask layer
    L.tileLayer(URL.rvMask).setOpacity(0.4).addTo(map);
    // Add the radar images layer
    initialize(apiData, optionKind);
    // Add the sigmet layer
    getSigmet(base);
    // Hide the map button
    addMarker();
    $(".base-wrapper").hide();
};

function initialiseEventListeners() {
    singleFingerDrag();
    playPauseToggle();
    radarOptionToggle();
    legendToggler();
    mapLayerToggler();
    fullscreenToggler();
};

function playPauseToggle() {
    // Toggler to change the play/pause icon
    $("#play-toggle").click(function () {
        $(".playPause").toggle();
    });
};

function radarOptionToggle() {
    // Radar or Satellite option toggler
    $("#sat").click(function () {
        $("#radar").removeClass("selected-left");
        $("#sat").addClass("selected-right");
    });
    $("#radar").click(function () {
        $("#sat").removeClass("selected-right");
        $("#radar").addClass("selected-left");
    });
};

function legendToggler() {
    // Legend Show Toggler
    $("#legend-control").click(function () {
        $(".legend-wrapper").toggle();
    });
};

function mapLayerToggler() {
    // Base Layer Show Toggler
    $(".base-control").click(function () {
        $(".base-wrapper").toggle();
    });
};

function fullscreenToggler() {
    // Fullscreen Toggler
    let fullscreen = false;

    $("#fullscreen-control").click(function () {
        $("#radar-map-container").toggleClass("fullscreen").toggleClass("radar-container");
        $(".fs-icon").toggle();
        map.invalidateSize();

        if (fullscreen === false) {
            map.dragging.enable();
            fullscreen = true;
        } else if (fullscreen === true) {
            map.dragging.disable();
            if ($(window).width() > 480) {
                map.dragging.enable();
            }
            fullscreen = false;
        }
    });
};

function singleFingerDrag() {
    // Enable single finger dragging on larger devices
    if ($(window).width() > 480) {
        map.dragging.enable();
    };
};

function addMarker() {
    //Marker over airport
    L.marker([lat, long]).addTo(map)
        .bindPopup(`${airport.icao}`);
};

//Check the current frame time and output the time in UTC format
function setFrameTime(frame) {
    let dateObj = new Date(frame.time * 1000);
    let utcString = dateObj.toUTCString();
    let frameTime = utcString.slice(17, 22);
    document.getElementById("timestamp").innerHTML = `${frameTime} UTC`
};

/**
 * Majority of code below this point is from the RAINVIEWER API documentation,
 * the code has been modified slightly to suit the purposes of this site.
 */

let apiData, mapFrames, radarLayers, lastPastFramePosition, optionKind, animationPosition, animationTimer;

function initialiseRvSettings() {
    apiData = {};
    mapFrames = [];
    radarLayers = [];
    lastPastFramePosition = -1;
    optionKind = 'radar'; // can be 'radar' or 'satellite'
    animationPosition = 0;
    animationTimer = false;
}

function getRainviewer() {

    let apiRequest = new XMLHttpRequest();
    apiRequest.open("GET", URL.rv, true);
    apiRequest.onload = function () {
        // store the API response for re-use purposes in memory
        apiData = JSON.parse(apiRequest.response);
        initialize(apiData, optionKind);
    };
    apiRequest.send();
}

/**
 * Initialize internal data from the API response and options
 */
function initialize(api, kind) {
    // remove all already added tiled layers
    for (let i in radarLayers) {
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
        let colorScheme = optionKind == 'satellite' ? 0 : 7;
        let smooth = optionKind == 'satellite' ? 0 : 1;
        let snow = optionKind == 'satellite' ? 0 : 1;

        radarLayers[frame.path] = new L.TileLayer(apiData.host + frame.path + '/' + 512 +
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

    let currentFrame = mapFrames[animationPosition];
    let nextFrame = mapFrames[position];

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
    let preloadingDirection = nextPosition - animationPosition > 0 ? 1 : -1;

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
};