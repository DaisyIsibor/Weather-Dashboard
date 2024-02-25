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

   getweatherCall(city)
   .then(function(weatherCallData){
    var todayWeatherInfo= "Current Weather:<br>" +
    "Temperature: " + weatherCallData.main.temp + 'K<br>' + 
    "Weather Condition: " + weatherCallData.weather[0]. description + '<br>' +
    "Wind Speed: "  + weatherCallData.wind.speed + 'm/s<br>' + 
    "Humidity: " + weatherCallData.main.humidity + '%';

    document.getElementById("todayWeather").innerHtml=todayWeatherInfo;
    return getForecast(city);

})

 }

















 document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('searchBtn');
    button.addEventListener('click', showWeather);
});