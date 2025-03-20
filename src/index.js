function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;

  let city = searchInputElement.value;
  let apiKey = "0fcte29ba005o3984f3f24530ff18441";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let country = response.data.country;
  let description = response.data.condition.description;
  let humidity =
    response.data.humidity !== undefined ? response.data.humidity : "TBD 🪶";
  let wind = Math.round(response.data.wind.speed);
  let weatherIcon = response.data.condition.icon_url;

  document.querySelector("#current-city").innerHTML = `${city}, ${country}`;
  document.querySelector(
    "#current-temperature-value"
  ).innerHTML = `${temperature}`;
  document.querySelector("#current-temperature-unit").innerHTML = `°C`;
  document
    .querySelector("#current-temperature-icon")
    .setAttribute("src", weatherIcon);
  document.querySelector("#current-date").innerHTML = formatDate(new Date());

  document.querySelector(
    "#current-details"
  ).innerHTML = `${description} <br /> Humidity: <strong>${humidity}%</strong>, Wind: <strong>${wind} km/h</strong>`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);
