// Variable declarations
var cityEl = document.querySelector(".city-display");
var tempEl = document.querySelector(".temp");
var windEl = document.querySelector(".wind");
var humidityEl = document.querySelector(".humidity");
var uvEl = document.querySelector(".uv");
var iconEl = document.querySelector(".icon");
var forecastEl = document.querySelector(".weather-days");
var cityFormEl = document.querySelector("#city-form");
var searchedCitiesEl = document.querySelector("#searched-cities");
var cityNameEl = document.getElementById("city");
var cityList = [];
var initial = false;

// Displays the current weather conditions
var currentDisplay = function (data) {
  console.log(data);
  cityEl.textContent = data.name + moment().format(" (MM/DD/YYYY)");
  tempEl.innerHTML = data.main.temp + " &deg;F";
  windEl.textContent = data.wind.speed + " MPH";
  humidityEl.textContent = data.main.humidity + "%";
  iconEl.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
  );
};

// Displays the current UV Index and changes color based on value
var uvDisplay = function(data){
    var uvIndex = data.current.uvi;
    uvEl.textContent = uvIndex;
    uvEl.classList = "btn-danger";
    if (uvIndex <= 3) {
      uvEl.classList.remove();
      uvEl.classList = "btn btn-success";
    } else if (uvIndex <= 5) {
      uvEl.classList.remove();
      uvEl.classList = "btn btn-warning";
    } else {
      uvEl.classList.remove();
      uvEl.classList = "btn btn-danger";
    }
}

//Displays the next 5 days of weather data
var forecastDisplay = function (data) {
  console.log(data);
  uvDisplay(data);
  forecastEl.textContent = "";
  for (var i = 1; i <= 5; i++) {
    var dayblockEl = document.createElement("section");
    dayblockEl.classList = "col weather-day";
    var dateEl = document.createElement("p");
    dateEl.textContent = moment().add(i, "days").format("MM/DD/YYYY");
    var dailyIconEl = document.createElement("img");
    dailyIconEl.className = "icon";
    dailyIconEl.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" +
        data.daily[i].weather[0].icon +
        "@2x.png"
    );
    var dailyTempEl = document.createElement("p");
    dailyTempEl.innerHTML =
      "Temp: " +
      parseInt(data.daily[i].temp.max) +
      "/" +
      parseInt(data.daily[i].temp.min) +
      " &deg;F";
    var dailyWindEl = document.createElement("p");
    dailyWindEl.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
    var dailyHumidityEl = document.createElement("p");
    dailyHumidityEl.textContent = "Humidity: " + data.daily[i].humidity + "%";
    dayblockEl.appendChild(dateEl);
    dayblockEl.appendChild(dailyIconEl);
    dayblockEl.appendChild(dailyTempEl);
    dayblockEl.appendChild(dailyWindEl);
    dayblockEl.appendChild(dailyHumidityEl);
    forecastEl.appendChild(dayblockEl);
  }
};

// Displays the previously searched list with last searched on top
var searchListDisplay = function(){
    searchedCitiesEl.textContent = "";
    for (var i = cityList.length-1; i>=0; i--){
      var searchItemEl = document.createElement("button");
      searchItemEl.classList = "col-12 btn btn-secondary searched-list"
      searchItemEl.textContent = cityList[i];
      searchItemEl.setAttribute("data-city", cityList[i]);
      searchedCitiesEl.appendChild(searchItemEl);
    }
}

// Adds searched cities to city list with a check to see if city is already in list and caps it at 10
var searchedCities = function(city){
    for (var i = 0; i < cityList.length; i++){
        if (city === cityList[i]){
            cityList.splice(i,1);
        }
    }
    if (cityList.length>= 10){
        cityList.splice(0,1);
    }
  cityList.push(city);
  searchListDisplay();
  localStorage.setItem("cities",JSON.stringify(cityList));
  console.log(cityList);
}

// Pulls data from Open Weather Map and calls all the display functions
var getWeather = function (city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=1a4b53ff8d8ec9391998ec0c0478d866";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
          if (initial){
          searchedCities(data.name);
          };
        currentDisplay(data);
        getForecast(data.coord.lon, data.coord.lat);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

// Pulls data from the onecall endpoint to get 5 day forecast
var getForecast = function (lon, lat) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lon=" +
    lon +
    "&lat=" +
    lat +
    "&units=imperial&appid=1a4b53ff8d8ec9391998ec0c0478d866";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        forecastDisplay(data);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

// Click handler for the city search
var formSubmitHandler = function (event) {
  event.preventDefault();
  var cityName = cityNameEl.value.trim();
  initial = true;
  getWeather(cityName);
  cityNameEl.value = "";
};

// Button click on previously searched.  Displays weather for that city and reorders search list.
var searchListHandler = function (event){
    event.preventDefault();
    var cityName = event.target.getAttribute("data-city");
    console.log(cityName);
    if (cityName){
        getWeather(cityName);
        searchedCities(cityName);
    }
}

// Load cityList array from local storage, display the previously searched list and display weather from last city searched or Austin if no data from local storage.
var loadCities = function (){
    var citiesSearched = localStorage.getItem("cities");
    if (!citiesSearched){
        getWeather("austin");
        return false;
    }
    cityList = JSON.parse(citiesSearched);
    searchListDisplay();
    getWeather(cityList[cityList.length-1]);
}

loadCities();
cityFormEl.addEventListener("submit", formSubmitHandler);
searchedCitiesEl.addEventListener("click", searchListHandler);
