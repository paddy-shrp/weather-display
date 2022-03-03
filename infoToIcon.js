const WEEKDAYS = ["SO", "MO", "DI", "MI", "DO", "FR", "SA"];

function unixTimestampToWeekDay(unixTimestamp) {
  let date = new Date(unixTimestamp * 1000);
  return WEEKDAYS[date.getDay()];
}

function unixTimestampToClockTime(unixTimestamp) {
  let date = new Date(unixTimestamp * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let hoursString = hours < 10 ? "0" + hours : hours;
  let minutesString = minutes < 10 ? "0" + minutes : minutes;
  return hoursString + ":" + minutesString;
}

function isDayFromUnixTimestamp(timestamp) {
  if (timestamp == 0) timestamp = new Date().getTime();
  return timestamp > lastSunRiseTimestamp && timestamp < lastSunSetTimestamp;
}

function windDegreeToIconString(deg) {
  return "wi wi-wind towards-" + deg + "-deg";
}

function codeToIconString(code) {
  let string = "wi wi-owm-" + code;
  return string;
}

function codeToIconDayNightString(code, isDay) {
  let string = "wi wi-owm-";
  if (isDay) string += "day-";
  else string += "night-";
  string += code;
  return string;
}
