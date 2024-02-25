var searchBar = document.querySelector('search');
var citySearch = document.getElementById("city-Search");
var  form = document.getElementById("searchForm");
var searchBtn=document.getElementById("searchBtn");


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
            var dateTime = new Date();
            var date = dateTime.toDateString();
            var time = dateTime.toLocaleTimeString();
            var cityName = weatherCallData.name;

            // the br tag is just to display wach result stack on each other 
            
            var todayWeatherInfo = "Current Weather for " + cityName + ":<br>" +
                "Date: " + date + "<br>" + // this displays the date 
                "Time: " + time + "<br>" + // thus displayes the time
            "Temperature: " + weatherCallData.main.temp + 'K<br>' +// this displays temp in kelvin
            "Weather Condition: <img src='http://openweathermap.org/img/wn/" + weatherCallData.weather[0].icon + ".png'><br>" + // this dsplays the imgae instead of the description the link on the code directs you to the images on open weather.
                "Wind Speed: " + weatherCallData.wind.speed + 'm/s<br>' + // this displays the wind speed in meters per seconds
                "Humidity: " + weatherCallData.main.humidity + '%'; // this displays the himidity 

            document.getElementById("todayWeather").innerHTML = todayWeatherInfo;
            return getForecast(city);
        })
        .then(function(forecastData) {
            console.log(forecastData);
        })
        // this is to help catch error if there is on the console
        .catch(function(error) {
            console.error('Error in showWeather:', error);
        });
}










 document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('searchBtn');
    button.addEventListener('click', showWeather);
});