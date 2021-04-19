var cityEl = document.querySelector(".city-display");
var tempEl = document.querySelector(".temp");
var windEl = document.querySelector(".wind");
var humidityEl = document.querySelector(".humidity");
var uvEl = document.querySelector(".uv");
var iconEl = document.querySelector(".icon");

var currentDisplay = function (data){
    console.log(data);
    cityEl.textContent = data.name + moment().format(" (MM/DD/YYYY)");
    tempEl.textContent = data.main.temp;
    windEl.textContent = data.wind.speed;
    humidityEl.textContent = data.main.humidity;
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
                console.log(data);
            });
        } else{
            alert("Error: " + response.statusText);
        }
    })
}

getWeather();