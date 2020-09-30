/* =======================================
   weather.js : 
     - User's current location
     - Query current weather features 
       using the Open Weather Map API
   ======================================= */

//Define Variables
var apiKey1 = "ecc6ea6df0f6575783a80a7b389d9b67";
var queryUrlWeather = "";
var searchInput = "";

// Get the user's location 
$.get("http://ipinfo.io", function (response1) {
    
    queryUrlWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + response1.city + '&appid=' + apiKey1 + '&units=imperial';

    updateCurrentWeather();
}, "jsonp");

// Query and update the weather information
function updateCurrentWeather() {

    // Perform an AJAX request for the current weather, and display 
    // the city name, Date, the weather condtion icon and the tempreture
    $.ajax({
        url: queryUrlWeather,
        method: "GET"
    })
        .then(function (response) {

            var currentWeather = $("#currentWeather");
            currentWeather.empty(); // Clear the Weather area
            console.log(response);
            currentWeather.append('<P id="currentCity" style="float: left; font-weight: bold; padding-top: 15px;">' + response.name + ' (' + moment().format('l') + ')' + '</P><img src="https://openweathermap.org/img/w/' + response.weather[0].icon + '.png" style="float: left; margin-top: 5px; margin-left: 10px;">');
            currentWeather.append('<p id="currentTemp" style="float: left; font-weight: bold; padding-top: 15px;">Temprature: ' + response.main.temp + '</p>');

        });
}















