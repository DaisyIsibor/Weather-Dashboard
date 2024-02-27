var searchBar = document.querySelector('search');
var citySearch = document.getElementById("city-Search");




//Api Key
var apiKey = '41428fb0a9890c868f611f78c6401a98'


// Function to fetch current weather data for a given city added metric to URL
function getweatherCall(city) {
    var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    return fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            return data;
        })
        .catch(function(error) {
            console.error('Error fetching current weather data:', error);
            throw error;
        });
}

// Function to fetch the 5-day forecast data for a given city
function getForecast(city) {
    var apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    return fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            return data;
        })
        .catch(function(error) {
            console.error('Error fetching forecast data:', error);
            throw error;
        });
}

// Function to display the weather forecast
function showWeather() {
    var city = document.getElementById("cityName").value;
   // this displays the Name of the city, dates and this is displayed per local time and added some styles
    getweatherCall(city)
    .then(function(weatherCallData) {
        var cityName = "<strong style='font-size: 30px;'>" + weatherCallData.name + "</strong>";
        var dateTime = new Date();
        var date = "<strong style='font-size: 26px;'>" + dateTime.toLocaleDateString() + "</strong>";
          // this just displays the time in parentheses and in a format
            var formattedDateTime = "<strong style='font-size: 24px;'>"+  cityName + " (" + date + ")</strong>";

            var weatherIconUrl = "http://openweathermap.org/img/wn/" + weatherCallData.weather[0].icon + ".png";
            var temperatureCelsius = weatherCallData.main.temp.toFixed(2); // Temperature is already in Celsius by adding &unit=metric on url

            // this displayed todays's wather or current weather and weather icon 



            var currentWeatherInfo = "<div class='weather-container'>" + formattedDateTime + ":<br>" + "<img src='" + weatherIconUrl + "' alt='Weather Icon'class='weather-icon'><br>" +
            "Temperature: " + temperatureCelsius + '&deg;C<br>' +
            "Wind: " + weatherCallData.wind.speed + 'm/s<br>' +
            "Humidity: " + weatherCallData.main.humidity + '%<br>' +
            "</div>";

            document.getElementById("todayWeather").innerHTML = currentWeatherInfo;
            return getForecast(city);
        })
        // this is to display 5 day forcast since current day already displayed 
        .then(function(forecastData) {
            var forecastInfo = "" ;//'5-Day Forecast:<br>';
            var currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 1); // Set the date to tomorrow 



            // a loop to add one more date unit it's up to 5 days 
            for (var i = 0; i < 5; i++) {
                var nextDayForecast = forecastData.list[i]; // Get the forecast data for the next day after current date is displayed 


                // condition for next day displays 
                if (nextDayForecast) {
                    var date = currentDate.toLocaleDateString();

                    // This is declared because it is displayed , this is to display the images description of weather img ,link will take you to the imges link on open weather API
                    var weatherIcon = "<img src='http://openweathermap.org/img/wn/" + nextDayForecast.weather[0].icon + ".png'>";
                    var weatherDescription = nextDayForecast.weather[0].description;
                    var temperatureCelsius = nextDayForecast.main.temp.toFixed(2); // Temperature is already in Celsius

                    // displays the humidity
                    var humidity = nextDayForecast.main.humidity;

                    //this displays in below format when shown
                    forecastInfo +=  "<div class='weather-info'><strong>" + date + "</strong>:<br>" +
                        "Weather Condition: " + weatherIcon + " " + weatherDescription + '<br>' +
                        "Temperature: " + temperatureCelsius + "&deg;C<br>" +
                        "Humidity: " + humidity + "%<br><br>";
                }

               currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
            }

            document.getElementById("displays").innerHTML = forecastInfo;

            document.getElementById('forecastTitle').classList.add('forecast-title');
        })
        .catch(function(error) {
            console.error('Error in showWeather:', error);
        });
}

// Event listener to call showWeather function on button click
document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('searchBtn'); 
    button.addEventListener('click', showWeather);
});
