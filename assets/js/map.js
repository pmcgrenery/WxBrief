let map;

/**
 * Creates Leaflet map and configures its control options
 */
function configureMap() {
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
};