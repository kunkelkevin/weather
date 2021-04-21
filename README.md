# Weather Assistant

Website that displays the current weather conditions and a five day forecast of selected cities using the Open Weather API.  

Local Storage is used to store the last 10 cities that were searched with logic in place to remove any duplicate searches.  When a new city is submitted or a previously searched city is clicked, the previously searched list will update and the weather is displayed for that city.

On the initial load, the last searched city found in Local Storage will be displayed.  If no data is in local storage, it will default to show the weather for Austin.

The UV Index value has logic to dispaly as green if it is in the favorible range (0-3), yellow if moderate (3-5) and red if severe (>5).

The website is [https://kunkelkevin.github.io/weather/](https://kunkelkevin.github.io/weather/)

Screenshot of weather display with full list of previously searched cities:
![Weather Screenshot](/assets/img/screenshot-weather.png "Weather display")
