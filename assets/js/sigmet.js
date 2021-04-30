$.when(
    $.getJSON("https://cors-anywhere.herokuapp.com/https://www.aviationweather.gov/cgi-bin/json/IsigmetJSON.php"),
    $.getJSON("https://cors-anywhere.herokuapp.com/https://www.aviationweather.gov/cgi-bin/json/SigmetJSON.php")
).then(
    function (responseOne, responseTwo) {
        let int = responseOne;
        let us = responseTwo;
        console.log("INTL OBJECT:", int);
        console.log("US OBJECT:", us);

        function onEachFeature(feature, layer) {
            var popupContent = feature.properties.rawSigmet
            layer.bindPopup(popupContent);
        }


        L.geoJSON(int, {
            style: function (feature) {
                switch (feature.properties.hazard) {
                    case 'TS':
                        return {
                            "color": "#ff0000", "weight": "5", "opacity": "0.6"
                        };
                    case 'TSGR':
                        return {
                            "color": "#b00000", "weight": "5", "opacity": "0.6"
                        };
                    case 'TURB':
                        return {
                            "color": "#00e308", "weight": "5", "opacity": "0.6"
                        };
                    case 'VA':
                        return {
                            "color": "#b07810", "weight": "5", "opacity": "0.6"
                        };
                    case 'ICE':
                        return {
                            "color": "#00ffff", "weight": "5", "opacity": "0.6"
                        };
                    case 'ICING':
                        return {
                            "color": "#00ffff", "weight": "5", "opacity": "0.6"
                        };
                    case 'SS':
                        return {
                            "color": "#ffa600", "weight": "5", "opacity": "0.6"
                        };
                    case 'MTW':
                        return {
                            "color": "#a8a5a5", "weight": "5", "opacity": "0.6"
                        };
                }
            },
            onEachFeature: onEachFeature,
        }).addTo(map);


        L.geoJSON(us, {
            style: function (feature) {
                switch (feature.properties.hazard) {
                    case 'CONVECTIVE':
                        return {
                            "color": "#ff0000", "weight": "5", "opacity": "0.6"
                        };
                    case 'TURB':
                        return {
                            "color": "#b00000", "weight": "5", "opacity": "0.6"
                        };
                    case 'VA':
                        return {
                            "color": "#b07810", "weight": "5", "opacity": "0.6"
                        };
                    case 'ICE':
                        return {
                            "color": "#00ffff", "weight": "5", "opacity": "0.6"
                        };
                    case 'ICING':
                        return {
                            "color": "#00ffff", "weight": "5", "opacity": "0.6"
                        };
                    case 'MTW':
                        return {
                            "color": "#a8a5a5", "weight": "5", "opacity": "0.6"
                        };
                }
            },
            onEachFeature: onEachFeature,
        }).addTo(map);
    },
    function (errorResponse) {
        if (errorResponse.status === 404) {
            console.log("404", errorResponse);
        } else if (errorResponse.status === 403) {
            console.log("403", errorResponse);
        } else {
            console.log("Unknown", errorResponse);
        }
    }
);