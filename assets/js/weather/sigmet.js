/**
 * Makes 2 AJAX calls to Aviationweather for US and International SIGMETs
 * @param {string} base - The base layer of the Mapbox tiles
 */
function getSigmet(base) {
    $.ajax({
        url: APIURL.intlSigmet,
        type: "GET",
        dataType: 'jsonp',
        success: function (int) {
            displayIntData(int, base);
        },
        error: function (response) {
            console.log("Unable to retrieve International SIGMETs. Error details:", response);
        }
    });
    $.ajax({
        url: APIURL.usSigmet,
        type: "GET",
        dataType: 'jsonp',
        success: function (us) {
            displayUSData(us, base);
        },
        error: function (response) {
            console.log("Unable to retrieve US SIGMETs. Error details:", response);
        }
    });
}

/**
 * Displays all geoJSON polygons on the map and styles them depending
 * on the hazard type
 * @param {Object} int - GeoJSON object containing all international SIGMETs
 * @param {string} base - The base layer of the Mapbox tiles
 */
function displayIntData(int, base) {
    L.geoJSON(int, {
        style: function (feature) {
            switch (feature.properties.hazard) {
                case 'TS':
                    return {
                        "color": "#ff0000", "opacity": "0.6", "z-index": "99999"
                    };
                case 'TSGR':
                    return {
                        "color": "#b00000", "opacity": "0.6", "z-index": "99999"
                    };
                case 'TURB':
                    return {
                        "color": "#00e308", "opacity": "0.6", "z-index": "99999"
                    };
                case 'VA':
                    return {
                        "color": "#b07810", "opacity": "0.6", "z-index": "99999"
                    };
                case 'ICE':
                    return {
                        "color": "#00ffff", "opacity": "0.6", "z-index": "99999"
                    };
                case 'ICING':
                    return {
                        "color": "#00ffff", "opacity": "0.6", "z-index": "99999"
                    };
                case 'SS':
                    return {
                        "color": "#ffa600", "opacity": "0.6", "z-index": "99999"
                    };
                case 'MTW':
                    return {
                        "color": "#a8a5a5", "opacity": "0.6", "z-index": "99999"
                    };
            }
        },
        onEachFeature: onEachFeature,
    }).addTo(map);

    /**
     * Applies a popup containing SIGMET details and a
     * tooltip to name the polygon
     * @param {Object} feature 
     * @param {Object} layer 
     */
    function onEachFeature(feature, layer) {
        var popupContent = feature.properties.rawSigmet;
        layer.bindPopup(popupContent);
        if (base === 'mapbox/light-v10') {
            let label = feature.properties.hazard;
            layer.bindTooltip(label, {
                direction: "center",
                permanent: true,
                className: 'label-black'
            });
        } else {
            let label = feature.properties.hazard;
            layer.bindTooltip(label, {
                direction: "center",
                permanent: true,
                className: 'label'
            });
        }
    }
}

/**
 * Displays all geoJSON polygons on the map and styles them depending
 * on the hazard type
 * @param {Object} us - GeoJSON object containing all international SIGMETs
 * @param {string} base - The base layer of the Mapbox tiles
 */
function displayUSData(us, base) {
    L.geoJSON(us, {
        style: function (feature) {
            switch (feature.properties.hazard) {
                case 'CONVECTIVE':
                    return {
                        "color": "#ff0000", "opacity": "0.6", "z-index": "99999"
                    };
                case 'TURB':
                    return {
                        "color": "#b00000", "opacity": "0.6", "z-index": "99999"
                    };
                case 'VA':
                    return {
                        "color": "#b07810", "opacity": "0.6", "z-index": "99999"
                    };
                case 'ICE':
                    return {
                        "color": "#00ffff", "opacity": "0.6", "z-index": "99999"
                    };
                case 'ICING':
                    return {
                        "color": "#00ffff", "opacity": "0.6", "z-index": "99999"
                    };
                case 'MTW':
                    return {
                        "color": "#a8a5a5", "opacity": "0.6", "z-index": "99999"
                    };
            }
        },
        onEachFeature: label,
    }).addTo(map);

    /**
     * Applies a popup containing SIGMET details and a
     * tooltip to name the polygon
     * @param {Object} feature 
     * @param {Object} layer 
     */
    function label(feature, layer) {
        var popupContent = feature.properties.rawAirSigmet;
        layer.bindPopup(popupContent);
        let type = feature.properties.hazard;
        if (type == "CONVECTIVE") {
            type = "CONV";
        } else if (type == "ICING") {
            type = "ICE";
        }
        if (base === 'mapbox/light-v10') {
            layer.bindTooltip(type, {
                direction: "center",
                permanent: true,
                className: 'label-black'
            });
        } else {
            layer.bindTooltip(type, {
                direction: "center",
                permanent: true,
                className: "label"
            });
        }
    }
}