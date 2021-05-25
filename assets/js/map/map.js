$(document).ready(function () {
    checkConfigLoaded();
    initialiseEventListeners();
});

/**
 * Checks that config.js file has loaded correctly
 */
function checkConfigLoaded() {
    if (typeof LOADED !== 'undefined') {
        checkHref();
    } else if (typeof LOADED === 'undefined') {
        $("#configNotLoadedModal").modal("show");
    }
}

/**
 * Checks the current page file name
 */
function checkHref() {
    if (window.location.href.indexOf("wxreport") > -1) {
        mapWxReport();
        setVersion(MAP_DEFAULT, "wxreport.html");

    } else {
        mapIndex();
        checkIfLocationAllowed();
        setVersion(MAP_DEFAULT);
    }
}

function initialiseEventListeners() {
    singleFingerDrag();
    playPauseToggle();
    radarOptionToggle();
    legendToggler();
    mapLayerToggler();
    fullscreenToggler();
}

let map;

/**
 * Creates Leaflet map and tailors option to index page
 */
function mapIndex() {

    map = L.map('mapid', {
        center: [0, 0],
        zoom: 1.5,
        minZoom: 1,
        maxBounds: [
            [90, -180],
            [-90, 180]
        ],
        maxBoundsViscosity: 1,
        zoomSnap: 0,
        zoomDelta: 0.75,
        wheelPxPerZoomLevel: 80,
        dragging: !L.Browser.mobile,
        dragging: !L.Browser.mobileWebkit,
        tap: !L.Browser.mobile,
        tap: !L.Browser.mobileWebkit,
    });

}

/**
 * Creates Leaflet map and tailors option to Wxreport page
 */
function mapWxReport() {

    if (map != undefined) {
        map.remove();
    }
    let airport = JSON.parse(localStorage.getItem('selectedAirport'));
    let lat = airport.lat;
    let long = airport.long;

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
}

/**
 * Clears all existing map layers then adds 
 * baselayer, radar, radar mask and sigmets layers
 * @param {string} base - The base layer of the Mapbox tiles
 * @param {string} page - The current html page
 * @example
 *  setVersion(mapbox/light-v10, wxreport.html)
 */
function setVersion(base, page) {
    map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });
    L.tileLayer.provider('MapBox', {
        id: base,
        accessToken: KEY.mapbox
    }).addTo(map);
    L.tileLayer(URL.rvMask).setOpacity(0.4).addTo(map);
    initialize(apiData, optionKind);
    getSigmet(base);
    $(".base-wrapper").hide();
    if (page === "wxreport.html") {
        addMarker();
    }
}

/**
 * Displays the frame time in the radar controls
 * @param {Object} frame - Object containing timestamp of current radar frame
 */
function setFrameTime(frame) {
    let dateObj = new Date(frame.time * 1000);
    let utcString = dateObj.toUTCString();
    let frameTime = utcString.slice(17, 22);
    document.getElementById("timestamp").innerHTML = `${frameTime} UTC`;
}

/**
 * Adds a marker over the airport
 */
function addMarker() {
    //Marker over airport
    let airport = JSON.parse(localStorage.getItem('selectedAirport'));
    let lat = airport.lat;
    let long = airport.long;
    L.marker([lat, long]).addTo(map)
        .bindPopup(`${airport.icao}`);
}

/**
 * Checks if the user has previously allowed/disallowed location data
 */
function checkIfLocationAllowed() {
    let locationAllowed = localStorage.getItem('WxBriefLocationAllowed');
    if (locationAllowed === null) {
        $("#geolocate").modal("show");
    } else if (locationAllowed === "true") {
        getLocation();
    } else if (locationAllowed === "false") {
        showEurope();
        $("#geolocate").modal("hide");
    }
}

/**
 * Stores a variable to record that location data 
 * allowed and closes modal
 */
function allowLocation() {
    let locationAllowed = "true";
    localStorage.setItem('WxBriefLocationAllowed', locationAllowed);
    getLocation();
    $("#geolocate").modal("hide");
}

/**
 * Stores a variable to record that location data
 * is not allowed
 */
function disallowLocation() {
    let locationAllowed = "false";
    localStorage.setItem('WxBriefLocationAllowed', locationAllowed);
    showEurope();
}

/**
 * Flys down to display Europe in the radar window
 */
function showEurope() {
    let corner1 = L.latLng(60, 13),
        corner2 = L.latLng(35, -19),
        bounds = L.latLngBounds(corner1, corner2);
    map.flyToBounds(bounds);
}

/**
 * Uses the geolocation API to get the users current location
 */
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showPositionError);
    } else {
        console.log("Geolocation is not supported by this browser.");
        showEurope();
    }
}

/**
 * After 0.5sec, flys down to the users current location over 3 seconds
 * @param {Object} position - GeoLocationPosition
 */
function showPosition(position) {
    setTimeout(function () {
        map.flyTo([position.coords.latitude, position.coords.longitude], 7.5, {
            animate: true,
            duration: 3
        });
    }, 500);
}

/**
 * Handles geolocation errors by defaulting to showEurope
 * @param {Object} error 
 */
function showPositionError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            showEurope();
            break;
        case error.POSITION_UNAVAILABLE:
            showEurope();
            break;
        case error.TIMEOUT:
            showEurope();
            break;
        case error.UNKNOWN_ERROR:
            showEurope();
            break;
    }
}

/**
 * Toggles the play/pause icon on the radar controls when clicked
 */
function playPauseToggle() {
    $("#play-toggle").click(function () {
        $(".playPause").toggle();
    });

    $("#last-frame").click(function () {
        $(".fa-play").show();
        $(".fa-pause").hide();
    });

    $("#next-frame").click(function () {
        $(".fa-play").show();
        $(".fa-pause").hide();
    });
}

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
}

/**
 * Toggles the legend display when clicked
 */
function legendToggler() {
    $("#legend-control").click(function () {
        $(".legend-wrapper").toggle();
    });
}

/**
 * Toggles the base layer options display when layers icon is clicked
 */
function mapLayerToggler() {
    $(".base-control").click(function () {
        $(".base-wrapper").toggle();
    });
}

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
}

/**
 * Enables single finger dragging on screen sizes >480px
 */
function singleFingerDrag() {
    if ($(window).width() > 480) {
        map.dragging.enable();
    }
}