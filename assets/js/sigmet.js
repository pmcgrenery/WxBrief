// https://stackoverflow.com/questions/28359730/google-place-api-no-access-control-allow-origin-header-is-present-on-the-req/40009466
// Code from this post used to overcome access-control-allow-origin issues

$.ajax({
    url: "https://www.aviationweather.gov/cgi-bin/json/IsigmetJSON.php",
    type: "GET",
    dataType: 'jsonp',
    // cache: false,
    success: function (int) {
        console.log(int);
        //Plot the geoJSON features on the map and style them for different types.
        L.geoJSON(int, {
            style: function (feature) {
                switch (feature.properties.hazard) {
                    case 'TS':
                        return {
                            "color": "#ff0000", "weight": "2", "opacity": "0.6", "z-index": "99999"
                        };
                    case 'TSGR':
                        return {
                            "color": "#b00000", "weight": "2", "opacity": "0.6", "z-index": "99999"
                        };
                    case 'TURB':
                        return {
                            "color": "#00e308", "weight": "2", "opacity": "0.6", "z-index": "99999"
                        };
                    case 'VA':
                        return {
                            "color": "#b07810", "weight": "2", "opacity": "0.6", "z-index": "99999"
                        };
                    case 'ICE':
                        return {
                            "color": "#00ffff", "weight": "2", "opacity": "0.6", "z-index": "99999"
                        };
                    case 'ICING':
                        return {
                            "color": "#00ffff", "weight": "2", "opacity": "0.6", "z-index": "99999"
                        };
                    case 'SS':
                        return {
                            "color": "#ffa600", "weight": "2", "opacity": "0.6", "z-index": "99999"
                        };
                    case 'MTW':
                        return {
                            "color": "#a8a5a5", "weight": "2", "opacity": "0.6", "z-index": "99999"
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
            L.marker(layer.getBounds().getCenter(), {
                icon: L.divIcon({
                    className: 'label',
                    html: feature.properties.hazard,
                })
            }).addTo(map);
        }
    },
    error: function (response) {
        console.log("Unable to retrieve SIGMET. Error details:", response);
        alert("Error: " + errorThrown);
    }
});

$.ajax({
    url: "https://www.aviationweather.gov/cgi-bin/json/SigmetJSON.php",
    type: "GET",
    dataType: 'jsonp',
    cache: false,
    success: function (us) {
        console.log(us)

        L.geoJSON(us, {
            style: function (feature) {
                switch (feature.properties.hazard) {
                    case 'CONVECTIVE':
                        return {
                            "color": "#ff0000", "weight": "5", "opacity": "0.6", "z-index": "99999"
                        };
                    case 'TURB':
                        return {
                            "color": "#b00000", "weight": "5", "opacity": "0.6", "z-index": "99999"
                        };
                    case 'VA':
                        return {
                            "color": "#b07810", "weight": "5", "opacity": "0.6", "z-index": "99999"
                        };
                    case 'ICE':
                        return {
                            "color": "#00ffff", "weight": "5", "opacity": "0.6", "z-index": "99999"
                        };
                    case 'ICING':
                        return {
                            "color": "#00ffff", "weight": "5", "opacity": "0.6", "z-index": "99999"
                        };
                    case 'MTW':
                        return {
                            "color": "#a8a5a5", "weight": "5", "opacity": "0.6", "z-index": "99999"
                        };
                }
            },
            onEachFeature: onEachFeature,
        }).addTo(map);

        function onEachFeature(feature, layer) {
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
            L.marker(layer.getBounds().getCenter(), {
                icon: L.divIcon({
                    className: 'label',
                    html: type,
                })
            }).addTo(map);
        }
    },
    error: function (response) {
        console.log("Unable to retrieve SIGMET. Error details:", response);
        alert("Error: " + errorThrown);
    }
});