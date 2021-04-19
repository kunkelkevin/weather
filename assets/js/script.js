var cityEl = document.querySelector(".city-display");
var tempEl = document.querySelector(".temp");
var windEl = document.querySelector(".wind");
var humidityEl = document.querySelector(".humidity");
var uvEl = document.querySelector(".uv");
var iconEl = document.querySelector(".icon");
var forecastEl = document.querySelector(".weather-days");

var currentDisplay = function (data){
    console.log(data);
    cityEl.textContent = data.name + moment().format(" (MM/DD/YYYY)");
    tempEl.innerHTML = data.main.temp + " &deg;F";
    windEl.textContent = data.wind.speed + " MPH";
    humidityEl.textContent = data.main.humidity + "%";
    iconEl.setAttribute("src","http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png");
}

var forecastDisplay = function(data){
    console.log(data);
    uvEl.textContent = data.current.uvi;
    for (var i = 1; i<=5; i++){
    var dayblockEl = document.createElement("section");
    dayblockEl.classList = "col weather-day";
    var dateEl = document.createElement("p");
    dateEl.textContent = moment().add(i,"days").format("MM/DD/YYYY");
    var dailyIconEl = document.createElement("img");
    dailyIconEl.className = "icon";
    dailyIconEl.setAttribute("src","http://openweathermap.org/img/wn/"+data.daily[i].weather[0].icon+"@2x.png");
    var dailyTempEl = document.createElement("p");
    dailyTempEl.innerHTML = "Temp: " + parseInt(data.daily[i].temp.max) + "/" + parseInt(data.daily[i].temp.min) + " &deg;F";
    var dailyWindEl = document.createElement("p");
    dailyWindEl.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
    var dailyHumidityEl = document.createElement("p");
    dailyHumidityEl.textContent = "Humidity: " + data.daily[i].humidity +"%";
    dayblockEl.appendChild(dateEl);
    dayblockEl.appendChild(dailyIconEl);
    dayblockEl.appendChild(dailyTempEl);
    dayblockEl.appendChild(dailyWindEl);
    dayblockEl.appendChild(dailyHumidityEl);
    forecastEl.appendChild(dayblockEl);
}
}

var getWeather = function (){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Austin&units=imperial&appid=1a4b53ff8d8ec9391998ec0c0478d866";
    fetch(apiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                currentDisplay(data);  
              getForecast();
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
}

var getForecast = function(){
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lon=-97.7431&lat=30.2672&units=imperial&appid=1a4b53ff8d8ec9391998ec0c0478d866";
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                forecastDisplay(data);
            });
        } else{
            alert("Error: " + response.statusText);
        }
    })
}

getWeather();