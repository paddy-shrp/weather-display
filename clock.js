function updateClock() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let hoursString = hours < 10 ? "0" + hours : hours;
  let minutesString = minutes < 10 ? "0" + minutes : minutes;

  document.getElementById("clock_hours").innerHTML = hoursString;
  document.getElementById("clock_minutes").innerHTML = minutesString;
}

function updateTheme() {
  if (isDayFromUnixTimestamp()) document.body.className = "";
  else document.body.className = "dark";
}

function reloadPage() {
  window.location.reload();
}

window.onload = () => {
  updateForecastDisplays();
  updateCurrentWeatherDisplay();
  updateClock();
  updateTheme();

  setInterval(updateClock, 500);
  setInterval(updateCurrentWeatherDisplay, 15 * 1000);
  setInterval(updateTheme, 60 * 1000);
  setInterval(updateForecastDisplays, 5 * 60 * 1000);
  setInterval(reloadPage, 60 * 60 * 1000);
};
