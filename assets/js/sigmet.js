// https://stackoverflow.com/questions/28359730/google-place-api-no-access-control-allow-origin-header-is-present-on-the-req/40009466
// Code from this post used to overcome access-control-allow-origin issues

function getSigmet(base) {
    $.ajax({
        url: "https://www.aviationweather.gov/cgi-bin/json/IsigmetJSON.php",
        type: "GET",
        dataType: 'jsonp',
        success: function (int) {
            displayIntData(int, base)
        },
        error: function (response) {
            console.log("Unable to retrieve International SIGMETs. Error details:", response);
            alert("Error: " + errorThrown);
        }
    });

    $.ajax({
        url: "https://www.aviationweather.gov/cgi-bin/json/SigmetJSON.php",
        type: "GET",
        dataType: 'jsonp',
        success: function (us) {
            displayUSData(us, base)
        },
        error: function (response) {
            console.log("Unable to retrieve US SIGMETs. Error details:", response);
            alert("Error: " + errorThrown);
        }
    });
}

function displayIntData(int, base) {
    console.log(int);
    //Plot the geoJSON features on the map and style them for different types.
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

    function onEachFeature(feature, layer) {
        // Add the raw sigmet text to popup
        var popupContent = feature.properties.rawSigmet
        layer.bindPopup(popupContent);
        // Name each polygon as its weather type
        if (base === 'mapbox/light-v10') {
            L.marker(layer.getBounds().getCenter(), {
                icon: L.divIcon({
                    className: 'label-black',
                    html: feature.properties.hazard,
                })
            }).addTo(map);
        } else {
            L.marker(layer.getBounds().getCenter(), {
                icon: L.divIcon({
                    className: "label",
                    html: feature.properties.hazard,
                })
            }).addTo(map);
        }
    }
}


function displayUSData(us, base) {
    console.log(us);

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

    function label(feature, layer) {
        // Add the raw sigmet text to popup
        var popupContent = feature.properties.rawAirSigmet
        layer.bindPopup(popupContent);

        // Name each polygon as its weather type
        let type = feature.properties.hazard;
        if (type == "CONVECTIVE") {
            type = "CONV"
        } else if (type == "ICING") {
            type = "ICE"
        };
        // Name each polygon as its weather type
        if (base === 'mapbox/light-v10') {
            L.marker(layer.getBounds().getCenter(), {
                icon: L.divIcon({
                    className: 'label-black',
                    html: type,
                })
            }).addTo(map);
        } else {
            L.marker(layer.getBounds().getCenter(), {
                icon: L.divIcon({
                    className: "label",
                    html: type,
                })
            }).addTo(map);
        }
    }
}