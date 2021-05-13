const DEFAULT_AIRPORTS = [{
        "icao": "EIDW",
        "iata": "DUB",
        "name": "Dublin Airport",
        "lat": 53.42645,
        "long": -6.24991
    },
    {
        "icao": "KJFK",
        "iata": "JFK",
        "name": "John F. Kennedy International Airport",
        "lat": 40.64131,
        "long": -73.77814
    },
    {
        "icao": "EINN",
        "iata": "SNN",
        "name": "Shannon Airport",
        "lat": 52.699657,
        "long": -8.914691
    },
    {
        "icao": "BIKF",
        "iata": "KEF",
        "name": "Keflavík International Airport",
        "lat": 63.978603,
        "long": -22.635036
    },
    {
        "icao": "CYYR",
        "iata": "YYR",
        "name": "CFB Goose Bay",
        "lat": 53.305252,
        "long": -60.4088
    }
];

const URL = {
    "apInfo": "https://airport-info.p.rapidapi.com/airport?icao=",
    "avwxMetar": "https://avwx.rest/api/metar/",
    "avwxTAF": "https://avwx.rest/api/taf/",
    "avwxInfo": "https://avwx.rest/api/station/",
    "rv": "https://api.rainviewer.com/public/weather-maps.json",
    "rvMask": "https://tilecache.rainviewer.com/v2/coverage/0/512/{z}/{x}/{y}/0/0_0.png",
    "tz": "https://api.timezonedb.com/v2.1/get-time-zone?key="
}

const KEY = {
    "apInfo": "38d4bdbef5msh1ba875b702e5c63p1d66b7jsn741235df0bf8",
    "avwx": "xxt-4d_jaDNW_tkNo2wX8q6cXUfWZ2asMCsmwYlr7Gw",
    "rv": "pk.eyJ1IjoicG1jZ3JlbmVyeSIsImEiOiJja25xYjlvMDgwYjc0MnBwZnFodXh1MHZ5In0.jv-gMrjni4BjjZ_vh-p5PQ",
    "emailjs": "user_s4AHNLxcCCPhwyB5E6t3Z",
    "tz": "WP64QMLIIG3M"
}

const HOST = {
    "apInfo": "airport-info.p.rapidapi.com",
}

const FORMAT = {
    "avwx": "?format=json",
    "tz": "&format=json&by=position&lat="
}

const LIMIT_REACHED = "You have reached your API call limit, please contact the site administrator";

const NO_METAR = "No METAR available for this airport";
const NO_TAF = "No TAF available for this airport";
const NO_DATA = "No data available for this airport"

const UNABLE = "Unable to obtain data for this station. Please contact the site administrator";

const MAP_DEFAULT = "mapbox/dark-v10";