// Element IDS
// TodayIcon: todayIcon
// Temperature: temperature
// FeelsLikeTemp: fLTemperature
// WindDirIcon: windDirectionIcon
// WindSpeed in MPS: windSpeedInMPS
// Humidity: humidityInPT
// SunSetRiseTime: sunSetRiseTime
const LAT = 48.8512;
const LON = 10.4887;
const API_KEY = "bb842ec98257a4820ace4708cb6f043c";
const API_URL_CURRENT = "https://api.openweathermap.org/data/2.5/weather?lat=_lat&lon=_lon&appid=_key&units=metric";

let currentWeatherAPIURL = API_URL_CURRENT.replace("_key", API_KEY).replace("_lat", LAT).replace("_lon", LON);

const API_URL_ONECALL = "https://api.openweathermap.org/data/2.5/onecall?lat=_lat&lon=_lon&exclude=minutely&appid=_key&units=metric";

let onecallAPIURL = API_URL_ONECALL.replace("_key", API_KEY).replace("_lat", LAT).replace("_lon", LON);

let lastSunRiseTimestamp = 0;
let lastSunSetTimestamp = 0;

function getJSONData(theUrl) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false);
  xmlHttp.send(null);
  data = JSON.parse(xmlHttp.responseText);
  return data;
}

function updateCurrentWeather() {
  let currentData = getJSONData(currentWeatherAPIURL);
  let iconCode = currentData["weather"][0]["id"];
  let temp = currentData["main"]["temp"];
  let flTemp = currentData["main"]["feels_like"];
  let windDeg = currentData["wind"]["deg"];
  let windSpeed = currentData["wind"]["speed"];
  let humidity = currentData["main"]["humidity"];

  updateCurrentWeatherDisplay(iconCode, temp, flTemp, windDeg, windSpeed, humidity);
}

function updateCurrentWeatherDisplay(iconCode, temp, flTemp, windDeg, windSpeed, humidity) {
  document.getElementById("c_icon").className = codeToIconDayNightString(iconCode, isDayFromUnixTimestamp()) + " mainIcon";
  document.getElementById("c_temperature").innerHTML = temp.toFixed(1) + '<i class="wi wi-celsius"></i>';
  document.getElementById("c_wind_direction_icon").className = windDegreeToIconString(windDeg);
  document.getElementById("c_wind_speed").innerHTML = windSpeed.toFixed(1);
  document.getElementById("c_humidity").innerHTML = humidity;
  document.getElementById("c_sun_set_rise_icon").className = getSunSetRiseIcon();
  document.getElementById("c_sun_set_rise_time").innerHTML = unixTimestampToClockTime(getSunSetRiseTime());
}

function updateForecast() {
  let forecastData = getJSONData(onecallAPIURL);
  let dailyForecastData = forecastData["daily"];
  let hourlyForecastData = forecastData["hourly"];
  lastSunRiseTimestamp = dailyForecastData[0]["sunrise"];
  lastSunSetTimestamp = dailyForecastData[0]["sunset"];
  console.log(forecastData);
  updateHourlyForecastDisplay(hourlyForecastData);
  updateDailyForecastDisplay(dailyForecastData);
}

// Topside Hourly Forecast

function updateHourlyForecastDisplay(hourlyForecastData) {
  let hourlyForecastParent = document.getElementById("hourly_forecast_parent");
  let template = document.getElementById("hourly_forecast_box_template");
  hourlyForecastParent.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const hourElement = hourlyForecastData[i];
    let iconCode = hourElement["weather"][0]["id"];
    let isDay = isDayFromUnixTimestamp(hourElement["dt"]);
    let hourTimestamp = hourElement["dt"];
    let hourTemp = hourElement["temp"];
    let rightSideBorder = i == 0 ? false : true;
    hourlyForecastParent.appendChild(createForecastHourDisplay(template, rightSideBorder, iconCode, isDay, hourTimestamp, hourTemp));
  }
}

function createForecastHourDisplay(template, rightSideBorder, iconCode, isDay, hourTimestamp, hourTemp) {
  let clone = template.cloneNode(true);
  for (let i = 0; i < clone.childNodes.length; i++) {
    const element = clone.childNodes[i];
    switch (element.id) {
      case "hourly_forecast_time":
        element.innerHTML = unixTimestampToClockTime(hourTimestamp);
        break;
      case "hourly_forecast_icon":
        element.className = codeToIconDayNightString(iconCode, isDay) + " hourlyForecastIcon";
        break;
      case "hourly_forecast_temperature":
        element.innerHTML = Math.round(hourTemp) + '<i class="wi wi-celsius"></i>';
        break;
    }
  }

  if (rightSideBorder) clone.classList.add("leftSideBorder");

  return clone;
}

// Botside Daily Forecast

function updateDailyForecastDisplay(dailyForecastData) {
  let botside = document.getElementById("bot_side");
  let template = document.getElementById("daily_forecast_box_template");
  botside.innerHTML = "";
  for (let i = 1; i < 7; i++) {
    const dayElement = dailyForecastData[i];
    let iconCode = dayElement["weather"][0]["id"];
    let dayTemp = dayElement["temp"]["day"];
    let minTemp = dayElement["temp"]["min"];
    let maxTemp = dayElement["temp"]["max"];
    let dayTimeStamp = dayElement["dt"];
    botside.appendChild(createForecastDayDisplay(template, iconCode, dayTemp, minTemp, maxTemp, dayTimeStamp));
  }
}

function createForecastDayDisplay(template, iconCode, dayTemp, minTemp, maxTemp, dateTimestamp) {
  let clone = template.cloneNode(true);

  // Code that edits the child nodes with the certain stats
  for (let i = 0; i < clone.childNodes.length; i++) {
    const element = clone.childNodes[i];
    if (element.id == "daily_forecast_icon") {
      element.className = codeToIconString(iconCode) + " dailyForecastIcon";
    } else if (element.id == "daily_forecast_temperature_Display") {
      for (let i = 0; i < element.childNodes.length; i++) {
        const tempDisplayChilds = element.childNodes[i];
        if (tempDisplayChilds.id == "daily_forecast_temperature") {
          tempDisplayChilds.innerHTML = Math.round(dayTemp) + '<i class="wi wi-celsius"></i>';
        } else if (tempDisplayChilds.id == "daily_forecast_min_max_temperature") {
          for (let i = 0; i < tempDisplayChilds.childNodes.length; i++) {
            const minMaxTempDisplay = tempDisplayChilds.childNodes[i];
            if (minMaxTempDisplay.id == "daily_forecast_min_temperature") {
              minMaxTempDisplay.innerHTML = Math.round(minTemp) + '<i class="wi wi-celsius"></i>';
            } else if (minMaxTempDisplay.id == "daily_forecast_max_temperature") {
              minMaxTempDisplay.innerHTML = Math.round(maxTemp) + '<i class="wi wi-celsius"></i>';
            }
          }
        }
      }
    } else if (element.id == "daily_forecast_day_of_week") {
      element.innerHTML = unixTimestampToWeekDay(dateTimestamp);
    }
  }
  return clone;
}
