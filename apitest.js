// 48.826117626772756, 10.488900356204626;
// LAT 48.851219
// LON 10.48868
// Nordlingen
// http://api.weatherapi.com/v1/current.json?key={_key}&q=_place&aqi=no

// http://api.weatherapi.com/v1/forecast.json?key=b366ebbb25634f29b60164959220103&q=Nordlingen&days=1&aqi=yes&alerts=yes

LAT_LON = "48.851219, 10.48868";
PLACE = "Nordlingen";
API_KEY = "b366ebbb25634f29b60164959220103";
API_URL = "http://api.weatherapi.com/v1/current.json?key=_key&q=_place";

let requestURL = API_URL.replace("_key", API_KEY).replace("_place", PLACE);

call();

function httpGet(theUrl) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

function call() {
  weatherData = JSON.parse(httpGet(requestURL));
  console.log(weatherData);
}
