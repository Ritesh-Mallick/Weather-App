const apiKey = "b268e43864484a63e2963da56af07f9a"; // Your API Key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const weatherDescription = document.getElementById("weatherDescription");
const temperature = document.getElementById("temperature");
const minTemp = document.getElementById("minTemp");
const maxTemp = document.getElementById("maxTemp");
const errorMessage = document.getElementById("errorMessage");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    errorMessage.textContent = "Please enter a city name!";
    return;
  }

  fetchWeather(city);
});

function fetchWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        updateUI(data);
        errorMessage.textContent = "";
      } else {
        errorMessage.textContent = "City not found!";
      }
    })
    .catch((error) => {
      errorMessage.textContent = "An error occurred!";
      console.error(error);
    });
}

function updateUI(data) {
  cityName.textContent = data.name;
  weatherDescription.textContent = data.weather[0].description;
  temperature.textContent = `${data.main.temp.toFixed(1)}°C`;
  minTemp.textContent = `Min: ${data.main.temp_min.toFixed(1)}°C`;
  maxTemp.textContent = `Max: ${data.main.temp_max.toFixed(1)}°C`;
}
