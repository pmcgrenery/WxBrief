$('document').ready(function () {
    configureMap();
    setVersion(MAP_DEFAULT);
    initialiseRvSettings();
    getRainviewer();
    addMarker();
    initialiseEventListeners();
});

function initialiseEventListeners() {
    singleFingerDrag();
    playPauseToggle();
    radarOptionToggle();
    legendToggler();
    mapLayerToggler();
    fullscreenToggler();
};

let map, airport, lat, long;

/**
 * Creates Leaflet map and configures its control options
 */
function configureMap() {
    airport = JSON.parse(sessionStorage.getItem('selectedAirport'));
    lat = airport.lat;
    long = airport.long;

    map = L.map('mapid', {
        center: [lat, long],
        zoom: 7.5,
        minZoom: 1,
        maxBounds: [
            [90, -180],
            [-90, 180]
        ],
        maxBoundsViscosity: 1,
        zoomSnap: 0,
        zoomDelta: 0.5,
        wheelPxPerZoomLevel: 80,
        dragging: !L.Browser.mobile,
        dragging: !L.Browser.mobileWebkit,
        tap: !L.Browser.mobile,
        tap: !L.Browser.mobileWebkit,
    });
};

/**
 * Clears all existing map layers then adds 
 * baselayer, radar, radar mask and sigmets layers
 * @param {string} base - The base layer of the Mapbox tiles
 * @example
 *  setVersion(mapbox/light-v10)
 */
function setVersion(base) {
    map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });
    L.tileLayer.provider('MapBox', {
        id: base,
        accessToken: KEY.rv
    }).addTo(map);
    L.tileLayer(URL.rvMask).setOpacity(0.4).addTo(map);
    initialize(apiData, optionKind);
    getSigmet(base);
    addMarker();
    $(".base-wrapper").hide();
};

/**
 * Displays the frame time in the radar controls
 * @param {Object} frame - Object containing timestamp of current radar frame
 */
function setFrameTime(frame) {
    let dateObj = new Date(frame.time * 1000);
    let utcString = dateObj.toUTCString();
    let frameTime = utcString.slice(17, 22);
    document.getElementById("timestamp").innerHTML = `${frameTime} UTC`
};

/**
 * Toggles the play/pause icon on the radar controls when clicked
 */
function playPauseToggle() {
    $("#play-toggle").click(function () {
        $(".playPause").toggle();
    });
};

/**
 * Animates the radar/satellite option toggler when clicked
 */
function radarOptionToggle() {
    $("#sat").click(function () {
        $("#radar").removeClass("selected-left");
        $("#sat").addClass("selected-right");
    });
    $("#radar").click(function () {
        $("#sat").removeClass("selected-right");
        $("#radar").addClass("selected-left");
    });
};

/**
 * Toggles the legend display when clicked
 */
function legendToggler() {
    $("#legend-control").click(function () {
        $(".legend-wrapper").toggle();
    });
};

/**
 * Toggles the base layer options display when layers icon is clicked
 */
function mapLayerToggler() {
    $(".base-control").click(function () {
        $(".base-wrapper").toggle();
    });
};

/**
 * Toggles the radar window to fullscreen when the fullscreen 
 * icon is clicked and enables single finger dragging when in fullscreen
 */
function fullscreenToggler() {
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

/**
 * Enables single finger dragging on screen sizes >480px
 */
function singleFingerDrag() {
    if ($(window).width() > 480) {
        map.dragging.enable();
    };
};

function addMarker() {
    //Marker over airport
    L.marker([lat, long]).addTo(map)
        .bindPopup(`${airport.icao}`);
};

/**
 * Code below this point is from the RAINVIEWER API documentation,
 * the code has been modified slightly to suit the purposes of this site.
 */

let apiData, mapFrames, radarLayers, lastPastFramePosition, optionKind, animationPosition, animationTimer;

function initialiseRvSettings() {
    apiData = {};
    mapFrames = [];
    radarLayers = [];
    lastPastFramePosition = -1;
    optionKind = 'radar';
    animationPosition = 0;
    animationTimer = false;
}

function getRainviewer() {
    let apiRequest = new XMLHttpRequest();
    apiRequest.open("GET", URL.rv, true);
    apiRequest.onload = function () {
        apiData = JSON.parse(apiRequest.response);
        initialize(apiData, optionKind);
    };
    apiRequest.send();
}

/**
 * Initialize internal data from the API response and options
 */
function initialize(api, kind) {
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