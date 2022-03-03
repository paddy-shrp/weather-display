function updateClock() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let hoursString = hours < 10 ? "0" + hours : hours;
  let minutesString = minutes < 10 ? "0" + minutes : minutes;

  document.getElementById("clock_hours").innerHTML = hoursString;
  document.getElementById("clock_minutes").innerHTML = minutesString;
}

function setTheme(isDay) {
  if (isDay) document.body.className = "";
  else document.body.className = "dark";
}

window.onload = () => {
  updateForecast();
  updateCurrentWeather();
  updateClock();

  let isDay = isDayFromUnixTimestamp();
  setTheme(isDay);

  setInterval(updateClock, 500);
  setInterval(updateCurrentWeather, 15 * 1000);
  setInterval(updateForecast, 5 * 60 * 1000);
};
