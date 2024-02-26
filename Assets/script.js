var searchBar = document.querySelector('search');
var citySearch = document.getElementById("city-Search");




//Api Key
var apiKey = '41428fb0a9890c868f611f78c6401a98'


// create a function for the current weather datat call and fetch weather data for inputed city, note : url has weather 
 function getweatherCall(city){
  
    var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  return fetch(apiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
    console.log(data);
    return data;

    })
    .catch(function(error) {
        console.error('Error fetching current weather data:', error);
        throw error;
    });
}


// function to fetch the data for given city note: url has forcast

function getForecast(city){
    var apiUrl =`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    return fetch(apiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
        return data;

    })
    .catch(function(error) {
        console.error('Error fetching forecast data:', error);
        throw error;
    });

}


//function to display the eather forecast information when city is inputed 

 function showWeather(){
    var city = document.getElementById("cityName").value;

    // this is a function to display the forecast weather for today and this include the name of the city, date, time and other information  to display 
    getweatherCall(city)
        .then(function(weatherCallData) {
            var cityName = "<strong style='font-size: larger;'>" + weatherCallData.name + "</strong>";
            var dateTime = new Date();
            var date = "<strong style='font-size: larger;'>" + dateTime.toLocaleDateString() + "</strong>";
           
            // the br tag is just to display each result stack on each other 

             // (weatherCallData.main.temp  - 273.15) calculates the temperature in Celsius, and .toFixed(2) rounds it to two decimal places.  0 Kelvin (-273.15 degrees Celsius) is absolute zero,  convert Kelvin to Celsius, you subtract 273.15 from the temperature in Kelvin

            var formattedDateTime = cityName + " (" + date + ")";
            var temperatureCelsius = (weatherCallData.main.temp - 273.15).toFixed(2); // Convert temperature to Celsius


           var todayWeatherInfo = "Current Weather for " + formattedDateTime + ":<br>" +// this displays city, date and time in one role 

             "<img src='http://openweathermap.org/img/wn/" + weatherCallData.weather[0].icon + ".png'><br>" +
            // this displays the image instead of the description, the link on the code directs you to the images on open weather API.

            "Temp: " + temperatureCelsius + '&deg;C<br>' + // Display temperature in Celsius

                "Wind: " + weatherCallData.wind.speed + 'm/s<br>' + // this displays the wind speed in meters per seconds

                "Humidity: " + weatherCallData.main.humidity + '%'; // this displays the humidity 

            document.getElementById("todayWeather").innerHTML = todayWeatherInfo;
            return getForecast(city);
        })
        .then(function(forecastData) {
            var forecastInfo = '5-Day Forecast:<br>';
            var currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 1); // Set the date to tomorrow
        
            for (var i = 0; i < 4; i++) {
                var nextDayForecast = forecastData.list[i]; // Get the forecast data for the next day
        
                if (nextDayForecast) {
                    var date = currentDate.toLocaleDateString();
                    var weatherIcon = "<img src='http://openweathermap.org/img/wn/" + nextDayForecast.weather[0].icon + ".png'>";
                    var weatherDescription = nextDayForecast.weather[0].description;

                // (dayForecast.main.temp - 273.15) calculates the temperature in Celsius, and .toFixed(2) rounds it to two decimal places.  0 Kelvin (-273.15 degrees Celsius) is absolute zero,  convert Kelvin to Celsius, you subtract 273.15 from the temperature in Kelvin
                var temperatureCelsius = (nextDayForecast.main.temp - 273.15).toFixed(2);
            var humidity = nextDayForecast.main.humidity;

            forecastInfo += "<strong>" + date + "</strong>:<br>" +
                "Weather Condition: " + weatherIcon + " " + weatherDescription + '<br>' +
                "Temperature: " + temperatureCelsius + "&deg;C<br>" +
                "Humidity: " + humidity + "%<br><br>";
        }

        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    document.getElementById("displays").innerHTML = forecastInfo;
})
.catch(function(error) {
    console.error('Error fetching forecast data:', error);
    document.getElementById("displays").innerHTML = "Error fetching forecast data. Please try again later.";
})

 };

document.addEventListener('DOMContentLoaded', function() {
var button = document.getElementById('searchBtn');
button.addEventListener('click', showWeather);
})
